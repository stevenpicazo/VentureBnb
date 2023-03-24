import { useEffect, useState } from 'react';
// import { creatThunk } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
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
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [newSpot, setNewSpotId] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);

        const images = [
            { url: previewImage, preview: true },
            { url: image2, preview: false },
            { url: image3, preview: false },
            { url: image4, preview: false },
            { url: image5, preview: false },
        ];

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
                images
            )
        )
            .then(() => {
                closeModal()
                history.push(`/listings`);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValidationErrors(data.errors)
            })
    }


    return (

        <div className="create-container">
            <div className='create-spot-title-container'>
                <i onClick={closeModal} class="fa-solid fa-xmark spot-x"></i>
                <div className="create-spot-title">Venture your home</div>
            </div>
            <div className="create-form-container">
                <form className="create-form" onSubmit={handleSubmit}>
                    <div className="create-label-container">
                        <ul className="ul-errors">
                            {validationErrors.map(error => (
                                <div
                                    className="errors"
                                    key={error}>{error}
                                </div>
                            ))}
                        </ul>

                        <div>
                            <label className="create-label">
                                <input
                                    className='address'
                                    type='text'
                                    onChange={e => setAddress(e.target.value)}
                                    value={address}
                                    placeholder='Address'
                                    required
                                />
                            </label>
                            <div className="border"></div>

                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='city'
                                    type='text'
                                    onChange={e => setCity(e.target.value)}
                                    value={city}
                                    placeholder='City'
                                    required
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='state'
                                    type='text'
                                    onChange={e => setState(e.target.value)}
                                    value={state}
                                    placeholder='State'
                                    required
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='country'
                                    type='text'
                                    onChange={e => setCountry(e.target.value)}
                                    value={country}
                                    placeholder='Country'
                                    required
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='name'
                                    type='text'
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    placeholder='Name of location'
                                    required
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='description'
                                    type='text'
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                    placeholder='Description'
                                    required
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='price'
                                    type='number'
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                    placeholder='Price'
                                    required
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='previewImage'
                                    type="url"
                                    value={previewImage}
                                    onChange={(e) => setPreviewImage(e.target.value)}
                                    placeholder='Preview image url'
                                    required
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='previewImage'
                                    type="url"
                                    value={image2}
                                    onChange={(e) => setImage2(e.target.value)}
                                    placeholder='Image url'
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='previewImage'
                                    type="url"
                                    value={image3}
                                    onChange={(e) => setImage3(e.target.value)}
                                    placeholder='Image url'
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='previewImage'
                                    type="url"
                                    value={image4}
                                    onChange={(e) => setImage4(e.target.value)}
                                    placeholder='Image url'
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                        <div>
                            <label className="create-label">
                                <input
                                    className='previewImage'
                                    type="url"
                                    value={image5}
                                    onChange={(e) => setImage5(e.target.value)}
                                    placeholder='Image url'
                                />
                            </label>
                            <div className="border"></div>
                        </div>
                    </div>
                    <button className='listings-button'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateSpot

