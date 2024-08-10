import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import forgotPasswordIcon from '../assest/forgot_password.gif';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.forgotPassword.url, {
      method: SummaryApi.forgotPassword.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      navigate('/login');
    } else {
      toast.error(data.message);
    }
  };

  return (
    <section id='forgot-password'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={forgotPasswordIcon} alt='forgot password icon' />
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                  required
                />
              </div>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Send
            </button>
          </form>

          <p className='my-5'>
            Remembered your password? <Link to='/login' className='text-red-600 hover:text-red-700 hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
