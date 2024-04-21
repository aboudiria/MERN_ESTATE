import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };
 console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('api/auth/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in'); // Use navigate function to navigate to sign-in page
      console.log(data);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='username'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type='submit'
          className='bg-slate-700 text-white rounded-lg p-4 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'loading....' : 'Sign Up'}
        </button>
      </form>

      {error && (
        <div className='mt-4 text-red-500'>
          {error}
        </div>
      )}

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in' className='text-blue-800'>Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
