import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const RegisterNewUpdated = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [otpField, setOtpField] = useState(false);
    const [otp, setOtp] = useState("")

    const generateRecapture = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('phone-sign-in', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.

            }
        }, auth);
    }

    const signInWithPhone = (data) => {
        generateRecapture();
        const phoneNumber = "+88" + data.phone;
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
                console.log(confirmationResult)
            }).catch((error) => {
                // Error; SMS not sent
                // ...
            });

    }

    const varifyOTP = (e) => {
        console.log(e)
        let otpValue = e?.target.value;
        console.log(otpValue)
        setOtp(otpValue)
        if (otpValue?.length === 6) {
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otpValue).then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log(user)
                toast.success('Account Creation is Successful')
                navigate('/giveUserName')

                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
                toast.error('Something is wrong. Please Try Again')
            });
        }
    }
    const onSubmit = async data => {
        console.log(data)
        const isNumber = /^\d/.test(data?.phone);
        if (isNumber) {
            callingSignInWithPhoneNumber(data)
        } else {
            alert('Please give valid phone number. Example :01710000000')
        }

    }
    const callingSignInWithPhoneNumber = (data) => {
        signInWithPhone(data)
        setOtpField(true)
    }

    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Phone Number"
                                    className="input input-bordered w-full max-w-xs text-black"
                                    {...register("phone", {
                                        required: {
                                            value: true,
                                            message: 'Phone Number is Required'
                                        },
                                    })}
                                />

                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full max-w-xs text-black"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>
                            {
                                otpField && <>
                                    <label className="label">
                                        <span className="label-text">OTP</span>
                                    </label>
                                    <input type="number" className="input input-bordered w-full max-w-xs text-black mb-4" onChange={varifyOTP} />
                                </>
                            }


                            <input className='btn w-full max-w-xs text-white' type="submit" value="Sign Up" />
                        </form>

                        <div className="divider">OR</div>

                        <p><small>Already have an account? <Link className='text-accent' to="/login">Please login</Link></small></p>



                    </div>
                    <div id='phone-sign-in'></div>
                </div>
            </div >
        </div>
    );
};

export default RegisterNewUpdated;