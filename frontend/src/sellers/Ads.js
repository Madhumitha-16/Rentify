import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import Footer from '../Footer';
import NavbarSeller from './NavbarSeller';
import { Button } from 'antd';

const Ads = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
    const { user } = useContext(UserContext);
    console.log(user)
    const [formValues, setFormValues] = useState({
      user_id: '', 
      title: '',
      description: '',
      street: '',
      city: '',
      area: '',
      state: '',
      price: '',
      bed_count: '',
      room_count: '',
      home_type: 'Apartment', 
      type: 'rent',
      amenities: [],
    });
  
console.log(formValues,user)
const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
 
};

    useEffect(() => {
      if (user && user?.user?.id) {
        setFormValues(prevValues => ({ ...prevValues, user_id: user?.user?.id }));
      }
    }, [user]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      if (checked) {
        setFormValues((prevState) => ({
          ...prevState,
          amenities: [...prevState.amenities, name],
        }));
      } else {
        setFormValues((prevState) => ({
          ...prevState,
          amenities: prevState.amenities.filter((amenity) => amenity !== name),
        }));
      }
    };
  
    
  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);

    for (let key in formValues) {
      if (Array.isArray(formValues[key])) {
        formData.append(key, JSON.stringify(formValues[key]));
      } else {
        formData.append(key, formValues[key]);
      }
    }

    try {
      const response = await axios.post('https://full-stack-virid.vercel.app/add-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
setLoading(false)
      console.log('Note created:', response.data);
    } catch (error) {
        setLoading(false)

      console.error('Error creating note:', error);
    }
  };
  return (
    <>
    <NavbarSeller />
    <div className='header2-img content-post '>
    <h2>Having a new home for rent?</h2>
      <form className="Post-form " onSubmit={handleSave}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Post New AD</h3>
          <div className="form-group ">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control mt-1"
              placeholder="eg. 2BHK Villa"
              value={formValues.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control mt-1"
              placeholder="eg. 2BHK Villa with various facilities"
              value={formValues.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <label >Type</label>
              <br />
              <input
                type="radio"
                className="input-radio "
                value="Rent"
                name="type"
                checked={formValues.type === 'Rent'}
                onChange={handleInputChange}
                required
              /> Rent
              <input
                type="radio"
                className="input-radio ml-3"
                value="Lease"
                name="type"
                checked={formValues.type === 'Lease'}
                onChange={handleInputChange}
                required
              /> Lease
            </div>
            <div className="col-md-6">
              <label>Price</label>
              <input
                type="text"
                name="price"
                className="form-control mt-1"
                placeholder="10000"
                value={formValues.price}
                onChange={handleInputChange}
                required
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label>Home Type</label>
              <select
                className="form-control mt-1"
                name="home_type"
                value={formValues.home_type}
                onChange={handleInputChange}
              >
                <option value="Apartment">Apartment</option>
                <option value="Individual Villa">Individual Villa</option>
                <option value="Shared Room">Shared Room</option>
                <option value="Colony">Colony</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-4">
              <label>No. of Bedrooms</label>
              <input
                type="number"
                name="bed_count"
                className="form-control mt-1"
                placeholder="0"
                value={formValues.bed_count}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label>No. of Rooms</label>
              <input
                type="number"
                name="room_count"
                className="form-control mt-1"
                placeholder="0"
                value={formValues.room_count}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Street</label>
              <input
                type="text"
                name="street"
                className="form-control mt-1"
                placeholder="Street"
                value={formValues.street}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label>Area</label>
              <input
                type="text"
                name="area"
                className="form-control mt-1"
                placeholder="Area"
                value={formValues.area}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="form-control mt-1"
                placeholder="eg. Chennai"
                value={formValues.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label>State</label>
              <input
                type="text"
                name="state"
                className="form-control mt-1"
                placeholder="eg. Tamil Nadu"
                value={formValues.state}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group mt-3 row">
            <label>Amenities</label>
            <div className="form-check col-md-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="water"
                name="Water"
                checked={formValues.amenities.includes('Water')}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="water">
                Water
              </label>
            </div>
            <div className="form-check col-md-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="ac"
                name="AC"
                checked={formValues.amenities.includes('AC')}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="ac">
                AC
              </label>
            </div>
            <div className="form-check col-md-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="furnished"
                name="Furnished"
                checked={formValues.amenities.includes('Furnished')}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="furnished">
                Furnished
              </label>
            </div>
            <div className="form-check col-md-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="lift"
                name="Lift"
                checked={formValues.amenities.includes('Lift')}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="lift">
                Lift
              </label>
            </div>
          </div>
    <div className='row'>
          <div className="mt-3 col-md-4">
  <label htmlFor="file-upload" className="custom-file-upload">
    Choose File
  </label>
  <input
    id="file-upload"
    type="file"
    onChange={handleFileChange}
    className="file-input"
  />
  </div>
   <div className="mt-4  col-md-8">
  {fileName && <p>Selected file: {fileName}</p>}
  </div>
</div>
      
   
          <div className="d-grid gap-2 mt-3 mb-3">
          <Button
        className='btn btn-primary' htmlType='submit'
          type="primary"
          loading={loading}
          onClick={() => setLoading(true)}
        >
          Submit
        </Button>
          </div>
          
        </div>
        
      </form>
      </div> 
    </>
  );
};

export default Ads;
