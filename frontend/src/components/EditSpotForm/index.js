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
    const spot = useSelector(state => state.spots)
    // console.log('spots from the selector -->', spot)
    const {spotId} = useParams()

    useEffect(() => {
        dispatch(spotsActions.thunkGetSpotById(spotId))
    },[dispatch, spotId])
 
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
            const spotData = await res.json();
            if (spotData && spotData.validationErrors) setValidationErrors(spotData.validationErrors);
          })
        //   .then(()=> {
        //     setAddress('')
        //     setCity('')
        //     setState('')
        //     setCountry('')
        //     setName('')
        //     setDescription('')
        //     setPrice(e)
        //   })
      }

    return (
        <div className="form-container">

        <form className="edit-spot-form" onSubmit={handleSubmit}>
        <h2 className="edit-h2">Edit Listing</h2>
            <ul className="errors">
            {hasSubmitted && validationErrors.length && (
                <ul className="errors">
                    {validationErrors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
            </ul>
            <div>
            <label htmlFor='address'>Address:</label>
            <input
                className='address'
                type='text'
                onChange={e => setAddress(e.target.value)}
                value={address}
                required
            />
            </div>
            <div>
            <label htmlFor='city'>City:</label>
            <input
                className='city'
                type='text'
                onChange={e => setCity(e.target.value)}
                value={city}
                required
            />
            </div>
            <div>
            <label htmlFor='state'>State:</label>
            <input
                className='state'
                type='text'
                onChange={e => setState(e.target.value)}
                value={state}
                required
            />
            </div>
            <div>
            <label htmlFor='country'>Country:</label>
            <input
                className='country'
                type='text'
                onChange={e => setCountry(e.target.value)}
                value={country}
                required
            />
            </div>
            <div>
            <label htmlFor='name'>Name of location:</label>
            <input
                className='name'
                type='text'
                onChange={e => setName(e.target.value)}
                value={name}
                required
            />
            </div>
            <div>
            <label htmlFor='description'>Description:</label>
            <input
                className='description'
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                required
            />
            </div>
            <div>
            <label htmlFor='price'>Price:</label>
            <input
                className='price'
                type='number'
                onChange={e => setPrice(e.target.value)}
                value={price}
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
            <button className='listings-button' onClick={(e) => handleSubmit(e) }>Submit</button>
        </form>
        </div>
    );
}

export default EditSpotForm;