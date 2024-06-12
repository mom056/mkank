"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Estate() {
    const [propertyType, setPropertyType] = useState('');
    const [subPropertyType, setSubPropertyType] = useState('');
    const [contractType, setContractType] = useState('');
    const [area, setArea] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [masterBedrooms, setMasterBedrooms] = useState('');
    const [kitchens, setKitchens] = useState('');
    const [floorNumber, setFloorNumber] = useState('');
    const [constructionYear, setConstructionYear] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [mainPropertyFeature, setMainPropertyFeature] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [mapEmbed, setMapEmbed] = useState('');

    const cities = ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidData = validatePropertyData();
        if (!isValidData) {
            return;
        }
        const userID = localStorage.getItem('userID');
        if (!userID) {
            console.error('User ID is null');
            return;
        }

        const formData = new FormData();
        formData.append('propertyType', propertyType);
        formData.append('subPropertyType', subPropertyType);
        formData.append('contractType', contractType);
        formData.append('area', area);
        formData.append('bedrooms', bedrooms);
        formData.append('bathrooms', bathrooms);
        formData.append('masterBedrooms', masterBedrooms);
        formData.append('kitchens', kitchens);
        formData.append('floorNumber', floorNumber);
        formData.append('constructionYear', constructionYear);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('mainPropertyFeature', mainPropertyFeature);
        formData.append('city', city);
        formData.append('address', address);
        formData.append('userID', userID);
        formData.append('mapEmbed', mapEmbed);

        if (mainImage) {
            formData.append('mainImage', mainImage);
        }

        try {
            const response = await axios.post('https://backend-mrsk.onrender.com/api/estate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            console.log(response);
            window.alert('The property has been published successfully!');
            window.location.href = '/Estate';
        } catch (error) {
            console.error('Failed to upload estate:', error);
        }
    };

    function validatePropertyData() {
        const errors = [];

        if (!propertyType) {
            errors.push('Missing property type');
        }
        if (!contractType) {
            errors.push('Missing contract type');
        }

        if (errors.length > 0) {
            alert('Please fill in all required fields: ' + errors.join(', '));
            return false;
        }
        return true;
    }

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        setMainImage(file);
        console.log(mainImage);
    };

    return (
        <div className="container-xxl py-5" style={{ width: '98%', margin: '100px auto' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <form className="row" onSubmit={handleSubmit}>
                        <div className="col-6 mb-3">
                            <label htmlFor="propertyType" className="form-label">Property Type</label>
                            <select className="form-select" aria-label="Default select example" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                                <option value="" disabled>Property Type</option>
                                <option value="Flat">Flat</option>
                                <option value="Villa">Villa</option>
                                <option value="Home">Home</option>
                                <option value="Office">Office</option>
                                <option value="Shop">Shop</option>
                                <option value="Building">Building</option>
                            </select>
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="subPropertyType" className="form-label">Sub Property Type</label>
                            <select className="form-select" aria-label="Default select example" value={subPropertyType} onChange={(e) => setSubPropertyType(e.target.value)}>
                                <option value="" disabled>Sub Property Type</option>
                                <option value="Residential">Residential</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="contractType" className="form-label">Contract Type</label>
                            <select className="form-select" aria-label="Default select example" value={contractType} onChange={(e) => setContractType(e.target.value)}>
                                <option value="" disabled>Contract Type</option>
                                <option value="Rent">Rent</option>
                                <option value="Sell">Sell</option>
                                <option value="Booking">Booking</option>
                            </select>
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="area" className="form-label">Area</label>
                            <input type="number" className="form-control" id="area" placeholder="Area" value={area} onChange={(e) => setArea(e.target.value)} />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="bedrooms" className="form-label">Number of Bedrooms</label>
                            <input type="number" className="form-control" id="bedrooms" placeholder="Number of Bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="bathrooms" className="form-label">Number of Bathrooms</label>
                            <input type="number" className="form-control" id="bathrooms" placeholder="Number of Bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="masterBedrooms" className="form-label">Number of Master Bedrooms</label>
                            <input type="number" className="form-control" id="masterBedrooms" placeholder="Number of Master Bedrooms" value={masterBedrooms} onChange={(e) => setMasterBedrooms(e.target.value)} />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="kitchens" className="form-label">Number of Kitchens</label>
                            <input type="number" className="form-control" id="kitchens" placeholder="Number of Kitchens" value={kitchens} onChange={(e) => setKitchens(e.target.value)} />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="floorNumber" className="form-label">Floor Number</label>
                            <input type="number" className="form-control" id="floorNumber" placeholder="Floor Number" value={floorNumber} onChange={(e) => setFloorNumber(e.target.value)} />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="constructionYear" className="form-label">Construction Year</label>
                            <input type="date" className="form-control" id="constructionYear" placeholder="Construction Year" value={constructionYear} onChange={(e) => setConstructionYear(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Property Description</label>
                            <textarea className="form-control" id="description" rows="1" placeholder="Property Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="mainPropertyFeature" className="form-label">Main Property Feature</label>
                            <textarea className="form-control" id="mainPropertyFeature" rows="2" placeholder="Main Property Feature" value={mainPropertyFeature} onChange={(e) => setMainPropertyFeature(e.target.value)}></textarea>
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <select className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mapEmbed" className="form-label">Map Embed Code</label>
                            <textarea className="form-control" id="mapEmbed" rows="3" placeholder="Map Embed Code" value={mapEmbed} onChange={(e) => setMapEmbed(e.target.value)}></textarea>
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="address" className="form-label">Address Details</label>
                            <textarea className="form-control" id="address" rows="1" placeholder="Address Details" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="mainImage" className="form-label">Main Property Image</label>
                            <input id="mainImage" name="mainImage" type="file" className="form-control" onChange={handleMainImageChange} />
                        </div>
                        <div className="col-8 mb-3">
                            <button type="submit" className="btn btn-primary">Publish Property</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
