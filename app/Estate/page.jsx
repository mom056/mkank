"use client";
import './home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAreaChart, faBath, faBed, faLocationDot, faTrash } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function Estate() {
    const [userEstates, setUserEstates] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const userId = localStorage.getItem('userID');
            if (userId) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUserEstates = async () => {
                try {
                    const userId = localStorage.getItem('userID');
                    const response = await axios.get(`https://backend-mrsk.onrender.com/api/estate/user/${userId}`);
                    setUserEstates(response.data);
                } catch (error) {
                    console.error('Failed to fetch user estates:', error);
                }
            };

            fetchUserEstates();
        }
    }, [isLoggedIn]);

    const deleteEstate = async (estateId) => {
        try {
            await axios.delete(`https://backend-mrsk.onrender.com/api/estate/${estateId}`);
            setUserEstates(userEstates.filter(estate => estate._id !== estateId));
        } catch (error) {
            console.error('Failed to delete estate:', error);
        }
    };

    const confirmDelete = (estateId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this estate?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteEstate(estateId)
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    return (
        <div className="container my-5">
            {isLoggedIn ? (
                <>
                    {userEstates.length > 0 ? (
                        <>
                            <div className="row">
                                {userEstates.map((estate, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                                        <div className="card h-100 position-relative">
                                            <img src={`https://backend-mrsk.onrender.com/${estate.mainImage}`} className="card-img-top" alt={estate.description} />
                                            <button
                                                className="btn btn-danger position-absolute top-0 end-0 m-2"
                                                onClick={() => confirmDelete(estate._id)}
                                                style={{ zIndex: 10 }}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <div className="card-body">
                                                <h5 className="card-title">{estate.propertyType}</h5>
                                                <p className="card-text">{estate.description}</p>
                                                <div className="d-flex justify-content-between">
                                                    <span><FontAwesomeIcon icon={faAreaChart} /> {estate.area} m²</span>
                                                    <span><FontAwesomeIcon icon={faBed} /> {estate.bedrooms} Beds</span>
                                                    <span><FontAwesomeIcon icon={faBath} /> {estate.bathrooms} Baths</span>
                                                </div>
                                                <p className="mt-3"><FontAwesomeIcon icon={faLocationDot} /> {estate.address}</p>
                                                <Link href={`/Property-details?id=${estate._id}`}>
                                                    <p className="btn btn-primary">View Details</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <Link href="addEstate">
                                    <button className="btn btn-primary">Add Real Estate</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <p>No estates found. <Link href="addEstate">Publish your first estate now!</Link></p>
                    )}
                </>
            ) : (
                <p>Please login to view your estates.</p>
            )}
        </div>
    );
}
