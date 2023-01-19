import { useEffect, useState } from 'react';
// import { creatThunk } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotsActions from "../../store/spots";
import './CreateSpot.css'

function CreateSpot() {
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
    const [newSpot, setNewSpotId] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        return dispatch(
          spotsActions.creatThunk(
            {
              address,
              city,
              state,
              country,
              name,
              description,
              price,
            },
            { url: previewImage, preview: true }
          )
        )
          .then(() => {
            history.push(`/listings`);
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.validationErrors) setValidationErrors(data.validationErrors);
          });
      };

    return (
        <div>
        <h2 className='listings-h2'>Create a listing</h2>

        <form className='create-listing-form' onSubmit={handleSubmit}>
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
                placeholder='Address'
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
                placeholder='City'
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
                placeholder='State'
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
                placeholder='Country'
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
                placeholder='Name of location'
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
                placeholder='Description'
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
                placeholder='Price'
                required
            />
            </div>
            <div>
            <label htmlFor='previewImage'>Image URL:</label>
            <input
                className='previewImage'
                type="url"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                placeholder='Preview image url'
                required
            />
            </div>
            <button className='listings-button'>Submit</button>
        </form>
        </div>
    );
}

export default CreateSpot

