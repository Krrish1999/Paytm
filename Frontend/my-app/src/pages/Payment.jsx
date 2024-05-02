import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';       // Assuming you have a LoadingAnimation component
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import { blue, green } from '@mui/material/colors';
function Payment() {
  const [paymentStatus, setPaymentStatus] = useState('initial');

  const handlePaymentSubmit = () => {
    setPaymentStatus('loading');

    // Simulate payment process
    setTimeout(() => {
      setPaymentStatus('done');
    }, 3000); // Wait for 2 seconds to simulate payment processing
  };

  return (
    
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className='flex justify-center items-center'>
            <div className="rounded-lg bg-white w-max justify-center text-center p-2 h-max px-4">
                <div  className='flex flex-col justify-center'>
                {paymentStatus === 'initial' && (
                    <div>
                        <div className='m-9'>
                            <h2 className='font-weight:700  text-lg'>Please confirm your payment</h2>
                        </div>
                        <div >
                            <h2 className='font-semibold text-lg'>100</h2>
                        </div>
                        <div className='m-9 shadow-lg bg-blue-600 rounded-md'>
                            <button  className='text-white p-2' onClick={handlePaymentSubmit}>Send</button>
                        </div>
                    
                    </div>
                )}
                {paymentStatus === 'loading' && (
                    <div>
                    <h2>Processing payment...</h2>
                    <CircularProgress/>{/* Render the LoadingAnimation component */}
                    </div>
                )}
                {paymentStatus === 'done' && (
                    <div>
                        <div className='m-8'>
                            <ThumbUpRoundedIcon  style={{ fontSize: 60, color:green[400]}}  />
                        </div>
                        <div className='m-8'>
                            <h2 className='text-lg text-blue-500 font-weight: 500;'>Payment Done</h2>
                        </div>
                        {/* Render the success icon */}
                        <div className='p-2 m-3'>
                            <p className='text-lg font-weight:700'>Thank you for your purchase!</p>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Payment;