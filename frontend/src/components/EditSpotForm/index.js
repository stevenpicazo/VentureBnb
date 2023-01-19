import React from "react";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import * as spotsActions from "../../store/spots";

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
    // const [loaded, setLoading] = useState(false)
    
    const {spotId} = useParams()
    // const spot = useSelector(state => state.spots)
    // console.log('spots from the selector -->', spot) 

    useEffect(() => {
        dispatch(spotsActions.thunkGetSpotById(spotId))
    },[dispatch, spotId])
 
    // if (!loaded) {
    //     return null
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);
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
            // spot.id
            spotId
          )
        ).catch(async (res) => {
            const spotData = await res.json();
            if (spotData && spotData.validationErrors) setValidationErrors(spotData.validationErrors);
          });
      };

    return (
        <div>
        <h2>Edit Listing</h2>

        <form onSubmit={() =>handleSubmit}>
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
                id='address'
                type='text'
                onChange={e => setAddress(e.target.value)}
                value={address}
                required
            />
            </div>
            <div>
            <label htmlFor='city'>City:</label>
            <input
                id='city'
                type='text'
                onChange={e => setCity(e.target.value)}
                value={city}
                required
            />
            </div>
            <div>
            <label htmlFor='state'>State:</label>
            <input
                id='state'
                type='text'
                onChange={e => setState(e.target.value)}
                value={state}
                required
            />
            </div>
            <div>
            <label htmlFor='country'>Country:</label>
            <input
                id='country'
                type='text'
                onChange={e => setCountry(e.target.value)}
                value={country}
                required
            />
            </div>
            <div>
            <label htmlFor='name'>Name of location:</label>
            <input
                id='name'
                type='text'
                onChange={e => setName(e.target.value)}
                value={name}
                required
            />
            </div>
            <div>
            <label htmlFor='description'>Description:</label>
            <input
                id='description'
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                required
            />
            </div>
            <div>
            <label htmlFor='price'>Price:</label>
            <input
                id='price'
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
            <button onClick={(e) => handleSubmit(e) }>Submit</button>
        </form>
        </div>
    );
}

export default EditSpotForm;