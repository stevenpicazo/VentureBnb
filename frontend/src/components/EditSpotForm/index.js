import React from "react";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import * as spotsActions from "../../store/spots";
import './EditSpot.css'

function EditSpotForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [validationErrors, setValidationErrors] = useState([])
    const { spotId } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(spotsActions.thunkGetSpotById(spotId))
    }, [dispatch, spotId])

    const handleSubmit = (e) => {
        e.preventDefault()
        setValidationErrors([])

        const images = [{ url: previewImage, preview: true }, { url: image2, preview: false }, { url: image3, preview: false }, { url: image4, preview: false }, { url: image5, preview: false },]

        return dispatch(
            spotsActions.editThunk(
                {
                    address,
                    city,
                    state,
                    country,
                    name,
                    description,
                    price,
                },
                spotId,
                // images
            )
        )
            .then(() => {
                history.push(`/spots/${spotId}`);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValidationErrors(data.errors);
            });
    };

    return (
        <div className="edit-container">
            <div className='edit-spot-title-container'>
                <div className="edit-title">Update your listing</div>
            </div>
            <div className="edit-form-container">
                <form className="edit-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Address</label>
                        <input
                            className='form-input'
                            type='text'
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                            placeholder='Address'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">City</label>
                        <input
                            className='form-input'
                            type='text'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            placeholder='City'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">State</label>
                        <input
                            className='form-input'
                            type='text'
                            onChange={e => setState(e.target.value)}
                            value={state}
                            placeholder='State'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Country</label>
                        <input
                            className='form-input'
                            type='text'
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                            placeholder='Country'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Name of location</label>
                        <input
                            className='form-input'
                            type='text'
                            onChange={e => setName(e.target.value)}
                            value={name}
                            placeholder='Name of location'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className='form-textarea'
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            placeholder='Description'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Price</label>
                        <input
                            className='form-input'
                            type='number'
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                            placeholder='Price'
                            required
                        />
                    </div>
                    {/* <div className="form-group">

                        <label className="form-label">Upload images</label>
                        <input
                            className='form-input'
                            type='text'
                            onChange={e => setPreviewImage(e.target.value)}
                            value={previewImage}
                            placeholder='Preview Image URL'
                            required
                        />
                        <input className='form-input' type='text' onChange={e => setImage2(e.target.value)} value={image2} placeholder='Image 2' />
                        <input className='form-input' type='text' onChange={e => setImage3(e.target.value)} value={image3} placeholder='Image 3' />
                        <input className='form-input' type='text' onChange={e => setImage4(e.target.value)} value={image4} placeholder='Image 4' />
                        <input className='form-input' type='text' onChange={e => setImage5(e.target.value)} value={image5} placeholder='Image 5' />
                    </div> */}
                    <div className="form-group-button">
                        <button className='form-button'>Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default EditSpotForm;
