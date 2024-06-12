"use client"
import Image from 'next/image';
import Link from 'next/link'; // استيراد مكون Link من Next.js
import { useState, useEffect } from 'react';
import '/app/css/bootstrap.min.css';
import './rent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAreaChart, faBath, faBed, faPersonBooth, faLocationDot, faMobileAlt, faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';

async function getData() {
    const res = await fetch('https://backend-mrsk.onrender.com/api/estate?sort=createdAt:desc');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default function Rent() {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(6);

    useEffect(() => {
        async function fetchData() {
            const data = await getData();
            const filteredData = data.filter(post => post.contractType === 'Rent');
            setPosts(filteredData);
        }
        fetchData();
    }, []);

    const loadMorePosts = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 6);
    };

    return (
        <>
            <div className="tab-content">
                {posts.slice(0, visiblePosts).map((post) => (
                    <div id="tab-1" className="tab-pane fade show p-0 active" key={post._id}>
                        <div className="row g-4">
                            <div className="col-md-9 wow animate__animated animate__fadeInUp" data-wow-delay="0.1s">
                                <div className="property-item rounded overflow-hidden">
                                    <div className="row border-bottom">
                                        <div className="col-md-4">
                                            <div className="position-relative overflow-hidden rounded-top image-realty-filter">
                                                <Link href={`/Property-details?id=${post._id}`}>
                                                    <img className='image' src={`https://backend-mrsk.onrender.com/${post.mainImage}`} width={400} height={200} alt={post.description} />
                                                </Link>
                                                <div className={`bg-${post.contractType === 'Rent' ? 'secondary' : 'primary'} rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3`}>
                                                    {post.contractType}
                                                </div>
                                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                                                    {post.propertyType}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="p-4 pb-0">
                                                <h5 className="text-primary mb-3">${post.price}</h5>
                                                <Link href={`/Property-details?id=${post._id}`}>
                                                    <p className="d-block h5 mb-2">{post.description}</p>
                                                </Link>
                                                <p><FontAwesomeIcon className='icon' icon={faLocationDot} />{post.address}</p>
                                                <div className="row p-2">
                                                    <div className="col-2 flex-fill border-start">
                                                        <p className="">
                                                            <FontAwesomeIcon className='icon' icon={faAreaChart} />{post.area} m²
                                                        </p>
                                                    </div>
                                                    <div className="col-2 flex-fill border-start">
                                                        <p className="">
                                                            <FontAwesomeIcon className='icon' icon={faPersonBooth} />{post.bedrooms} Bed
                                                        </p>
                                                    </div>
                                                    <div className="col-2 flex-fill border-start">
                                                        <p className="">
                                                            <FontAwesomeIcon className='icon' icon={faBath} />{post.bathrooms} Bath
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row py-3 pe-4">
                                        <div className="col-8">
                                            <p>_  Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="col-4">
                                            <button className="btn btn-outline-dark">
                                                <FontAwesomeIcon className='icon' icon={faMobileAlt} />{post.user.phone} Call
                                            </button>
                                            <button className="btn btn-outline-dark" onClick={() => window.open(`https://wa.me/2${post.user.phone}`, '_blank')}>
                                                <FontAwesomeIcon className='icon' icon={faPhoneSquareAlt} />WhatsApp
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                ))}
            </div>
            {visiblePosts < posts.length && (
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={loadMorePosts}>Load More</button>
                </div>
            )}
        </>
    )
}
