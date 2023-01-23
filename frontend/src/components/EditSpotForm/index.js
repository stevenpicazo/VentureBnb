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
    // const [previewImage, setPreviewImage] = useState('')
    // const [newSpotId, setNewSpotId] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [loaded, setLoading] = useState(false)
    // const spotById = useSelector(state => state.CurrentUsersSpots)
    // const spot = useSelector(state => state.spots[spotId])
    // const spot = useSelector(state => state.spots)
    // console.log('spots from the selector -->', spot)
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(spotsActions.thunkGetSpotById(spotId))
    }, [dispatch, spotId])

    // if (!loaded) {
    //     return null
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        setValidationErrors([])
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
                    //   previewImage
                },
                spotId
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
        <div className="form-container">

            <form className="edit-spot-form" onSubmit={handleSubmit}>
                <h2 className="edit-h2">Edit Listing</h2>
                <ul className="errors">

                    {validationErrors.map(error => (
                        <div
                            className="errors"
                            key={error}>{error}
                        </div>
                    ))}

                </ul>
                <div>
                    <label htmlFor='address'></label>
                    <input
                        className='address'
                        type='text'
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                        placeholder='Address'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='city'></label>
                    <input
                        className='city'
                        type='text'
                        onChange={e => setCity(e.target.value)}
                        value={city}
                        placeholder='City'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='state'></label>
                    <input
                        className='state'
                        type='text'
                        onChange={e => setState(e.target.value)}
                        value={state}
                        placeholder='State'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='country'></label>
                    <input
                        className='country'
                        type='text'
                        onChange={e => setCountry(e.target.value)}
                        value={country}
                        placeholder='Country'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='name'></label>
                    <input
                        className='name'
                        type='text'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder='Name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='description'></label>
                    <input
                        className='description'
                        type='text'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        placeholder='Description'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='price'></label>
                    <input
                        className='price'
                        type='number'
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        placeholder='Price'
                        required
                    />
                </div>
                {/* <div>
            <label htmlFor='previewImage'>Image URL:</label>
            <input
                type="url"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                required
            />
            </div> */}
                <button className='listings-button'
                >Submit</button>
            </form>
        </div>
    );
}

export default EditSpotForm;