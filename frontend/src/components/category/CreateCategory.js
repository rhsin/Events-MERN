import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url_category } from '../constants'; 

function CreateCategory(props) {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: ''
  });

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(url_category, category)
      .then(res => {
        console.log(category);
        setCategory({
          name: ''
        });
        navigate('/');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <div className='CreateCategory'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn float-left'>
              Show Category List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Category</h1>
            <p className='lead text-center'>Create New Category</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  placeholder='Name of the category'
                  name='name'
                  className='form-control'
                  value={category.name}
                  onChange={onChange}
                />
              </div>
              <input
                type='submit'
                className='btn btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;