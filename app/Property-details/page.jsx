"use client";
import Image from 'next/image';
import './home.css';
import '/app/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAreaChart, faBath, faPersonBooth, faLocationDot, faBed, faCalendarDays, faKitchenSet, faLayerGroup, faUser, faMobileAlt, faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'; 
import { useState, useEffect } from 'react';
import axios from 'axios'; // استيراد axios
import 'animate.css';
import { Fade, Slide } from 'react-awesome-reveal';


export default function PropertyDetails() {
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const id = searchParams.get('id');
                
                const response = await axios.get(`https://backend-mrsk.onrender.com/api/estate/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property data:', error);
            }
        };

        fetchProperty();
    }, []);

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-xxl py-5">
            <div className="containero">
                <div className="row">
                    <div className="col-lg-8 col-md-6 wow animate__animated animate__fadeInUp" data-wow-delay="0.1s">
                        <img src={`https://backend-mrsk.onrender.com/${property.mainImage}`} width={'100%'} height={350} alt="" />
                        <h3 className="title-realty">{property.propertyType}</h3>
                        <h4 className="price-realty">{property.price} $</h4>
                        <div className="col-12">
                            <button className="details-realty ms-3">{property.contractType}</button>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-3 align-items-center align-self-center">
                                <p className="ms-3">Location</p>
                                <p className="mt-2"><FontAwesomeIcon className='icon' icon={faLocationDot}/>{property.city}</p>
                            </div>
                            <div className="col-md-3 align-items-center align-self-center">
                                <p className="ms-3">Area</p>
                                <p className="mt-2"><FontAwesomeIcon className='icon' icon={faAreaChart}/>{property.area}m²</p>
                            </div>
                            <div className="col-md-3 align-items-center align-self-center">
                                <p className="ms-3">Bedrooms</p>
                                <p className="mt-2"><FontAwesomeIcon className='icon' icon={faPersonBooth}/>{property.bedrooms}</p>
                            </div>
                            <div className="col-md-3 align-items-center align-self-center">
                                <p className="ms-3">Bathrooms</p>
                                <p className="mt-2"><FontAwesomeIcon className='icon' icon={faBath}/>{property.bathrooms}</p>
                            </div>
                        </div>
                        <h4 className="my-3">Description</h4>
                        <p className="text-justify">{property.description}</p>
                        <h4 className="mt-4">Facilities</h4>
                        <div className="row facilities">
                            <div className="col-6">
                                <div className="d-flex align-self-stretch align-items-center">
                                    <p className="mt-2 ms-3"><FontAwesomeIcon className='icon' icon={faBed}/>Master Bedrooms</p>
                                    <p className="mt-2">: {property.masterBedrooms}</p>
                                </div>
                                <div className="d-flex align-self-stretch align-items-center">
                                    <p className="mt-2 ms-3"><FontAwesomeIcon className='icon' icon={faCalendarDays}/>Year Built</p>
                                    <p className="mt-2">: {new Date(property.constructionYear).getFullYear()}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-self-stretch align-items-center">
                                    <p className="mt-2 ms-3"><FontAwesomeIcon className='icon' icon={faKitchenSet}/>Kitchens</p>
                                    <p className="mt-2">: {property.kitchens}</p>
                                </div>
                                <div className="d-flex align-self-stretch align-items-center">
                                    <p className="mt-2 ms-3"><FontAwesomeIcon className='icon' icon={faLayerGroup}/>Floor Number</p>
                                    <p className="mt-2">: {property.floorNumber}</p>
                                </div>
                            </div>
                        </div>
                        <h4 className="my-3">Main Features</h4>
                        <p className="text-justify">{property.mainPropertyFeature}</p>
                        <h4 className="my-3">Location</h4>
                        <iframe src={`https://www.google.com/maps/embed?pb=${property.mapEmbed}`} width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <h5 className="my-3">Detailed Address</h5>
                        <p className="mb-4">{property.address}</p>
                    </div>
                    <div className="col-lg-4 wow animate__animated animate__fadeInUp" data-wow-delay="0.3s">
                        <div className="rounded overflow-hidden">
                            <img className="img-fluid mb-3 rounded" src={`https://backend-mrsk.onrender.com/${property.additionalImage1}`} alt="" />
                            <div className="container-overlay">
                                <img className="img-fluid mb-3 rounded" src={`https://backend-mrsk.onrender.com/${property.additionalImage2}`} alt="" />
                                <div className="overlay">
                                    <a href="#" className="icon-overlay" title="Number of pictures">
                                        <i className="fa-solid fa-plus icon-overlay">2</i>
                                    </a>
                                </div>
                            </div>
                            <div className="container border p-4 rounded">
                            <Slide  direction="right" triggerOnce>
                                <div className="row">
                                    <div className="col-3">
                                        <FontAwesomeIcon className='icon-user' icon={faUser}/>
                                    </div>
                                    <div className="col-9"> 
                                        <p>{property.user.username}</p>
                                        <p>Posted on: {new Date(property.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    
                                    <div className="col-12">
                                        <button 
                                            className="text-white p-2 mt-2 border-0 rounded align-items-center w-100" 
                                            style={{ backgroundColor: '#25D366' }}
                                            onClick={() => window.open(`https://wa.me/2${property.user.phone}`, '_blank')}
                                        >
                                           Contact via WhatsApp <FontAwesomeIcon className='icon' icon={faPhoneSquareAlt} />
                                        </button>
                                    </div>
                                </div>
                            </Slide>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
