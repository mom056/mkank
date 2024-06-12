"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import 'animate.css';
import './home.css';
import './css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAreaChart, faBath, faPersonBooth, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Fade, Slide } from 'react-awesome-reveal';

async function getData() {
    const res = await fetch('https://backend-mrsk.onrender.com/api/estate?sort=createdAt:desc');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default function Page() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(6);

    useEffect(() => {
        async function fetchData() {
            const data = await getData();
            setPosts(data);
            setFilteredPosts(data);
        }
        fetchData();
    }, []);

    const loadMorePosts = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 6);
    };

    const handleSearch = () => {
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        const propertyType = document.getElementById('propertyTypeSelect').value;
        const subPropertyType = document.getElementById('subPropertyTypeSelect').value;

        const filtered = posts.filter(post => {
            const matchesSearchQuery = post.city.toLowerCase().includes(searchQuery);
            const matchesPropertyType = propertyType ? post.propertyType === propertyType : true;
            const matchesSubPropertyType = subPropertyType ? post.subPropertyType === subPropertyType : true;
            return matchesSearchQuery && matchesPropertyType && matchesSubPropertyType;
        });

        setFilteredPosts(filtered);
        setVisiblePosts(6); // Reset visible posts count
    };

    return (
        <>
            <main>
                <section className="first">
                <Fade cascade triggerOnce>
                    <h1>Search for your property</h1>
                    <div className="container-fluid">
                        <div className="search-form-container">
                            <div className="row g-2">
                                <div className="col-md-10">
                                    <div className="row g-2">
                                        <div className="col-md-4">
                                            <input type="text" id="searchInput" className="form-control border-1 py-3" placeholder="Search for Province . City" />
                                        </div>
                                        <div className="col-md-4">
                                            <select id="propertyTypeSelect" className="form-select border-1 py-3" defaultValue="">
                                                <option value="">Property Type</option>
                                                <option value="Apartment">Apartment</option>
                                                <option value="Villa">Villa</option>
                                                <option value="Home">Home</option>
                                                <option value="Office">Office</option>
                                                <option value="Shop">Shop</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <select id="subPropertyTypeSelect" className="form-select border-1 py-3" defaultValue="">
                                                <option value="">Sub Property Type</option>
                                                <option value="Residential">Residential</option>
                                                <option value="Commercial">Commercial</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-dark border-1 w-100 py-3" onClick={handleSearch}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Fade>
                </section>
                <Slide triggerOnce >
                <h1 className="new">New added properties</h1>
                </Slide>
                <div className="tab-content">
                    <div id="tab-1" className="tab-pane fade show p-0 active">
                        <div className="row g-4">
                            
                            {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                                <div key={index} className="col-lg-4 col-md-6 wow animate__animated animate__fadeInUp" style={{ animationDelay: `${0.1 * index}s` }}>
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <Link href={`/Property-details?id=${post._id}`}>
                                                <img className='image' src={`https://backend-mrsk.onrender.com/${post.mainImage}`} width={600} height={300} alt={post.description} />
                                            </Link>
                                            <div className={`bg-${post.contractType === 'Sell' ? 'primary' : 'secondary'} rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3`}>
                                                {post.contractType}
                                            </div>
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                                                                                               {post.propertyType}
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">${post.price}</h5>
                                            <Link href={`/Property-details?id=${post._id}`}>
                                                <p className="d-block h5 mb-2">{post.description}</p>
                                            </Link>
                                            <p><FontAwesomeIcon className='icon' icon={faLocationDot} />{post.city}</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><FontAwesomeIcon className='icon' icon={faAreaChart} />{post.area} m²</small>
                                            <small className="flex-fill text-center border-end py-2"><FontAwesomeIcon className='icon' icon={faPersonBooth} />{post.bedrooms} Bed</small>
                                            <small className="flex-fill text-center py-2"><FontAwesomeIcon className='icon' icon={faBath} />{post.bathrooms} Bath</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {visiblePosts < filteredPosts.length && (
                            <div className="text-center mt-4">
                                <button className="btn btn-primary" onClick={loadMorePosts}>Load More</button>
                            </div>
                        )}
                    </div>
                    <div className='qr'>
                    <Slide direction="right" triggerOnce>
                        <h1>Scan to download our application</h1>
                        <Image
                            className="img-qr"
                            src={"/photo/Screenshot 2024-06-09 060233.jpg"}
                            width={500}
                            height={500}
                            alt="Logo"
                        />
                        </Slide>
                    </div>
                </div>
            </main>
        </>
    );
}
