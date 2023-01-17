import { useEffect, useState } from 'react';
// import { creatThunk } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotsActions from "../../store/spots";

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
    const [newSpotId, setNewSpotId] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        const errors = []
        // if (!address) {
        //     errors.push('Address is required');
        // }
        // if (!city) {
        // errors.push('City is required');
        // }
        // if (!state) {
        // errors.push('State is required');
        // }
        // if (!country) {
        // errors.push('Country is required');
        // }
        // if (!name) {
        // errors.push('Name of location is required');
        // }
        // if (!description) {
        // errors.push('Description is required');
        // }
        // if (!price) {
        // errors.push('Price is required');
        // }
        // if (!Number(price)) {
        // errors.push('Price must be a number');
        // }

        // if (!previewImage) {
        //     errors.push('Image is required');
        // }

        // if (!address || !city || !state || !country || !name 
        //     || !description || !price || !Number(price)) {
        //     errors.push('Please fill out this field');
        // }

        setValidationErrors(errors)
    }, [name, address, city, state, country, name, description, price])

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
          .then((res) => {
            history.push(`/spots/${res.id}`);
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.validationErrors) setValidationErrors(data.validationErrors);
          });
      };

    return (
        <div>
        <h2>Create a listing</h2>
        <h2>Create a listing</h2>
        <h2>Create a listing</h2>

        <form onSubmit={handleSubmit}>
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
            <div>
            <label htmlFor='previewImage'>Image URL:</label>
            <input
                type="url"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                required
            />
            </div>
            <button>Submit</button>
        </form>
        </div>
    );
}

export default CreateSpot

// const [previewImage, setPreviewImage] = useState('')

// if (!previewImage) {
//     errors.push('Image is required');
// }

{/* <div>
<label htmlFor='previewImage'>Image URL:</label>
<input
   type="url"
   value={previewImage}
   onChange={(e) => setPreviewImage(e.target.value)}
   required
   placeholder="www.imageurl.com"
/>
</div> */}