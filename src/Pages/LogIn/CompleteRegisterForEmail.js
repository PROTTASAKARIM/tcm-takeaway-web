import { linkWithCredential, linkWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import React, { useState } from 'react';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const CompleteRegisterForEmail = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
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



    const onSubmit = async data => {


        generateRecapture();
        console.log(data)
        const phoneNumberWithCode = "+880" + data.phoneNumber
        await updateProfile({ displayName: data.name, phoneNumber: phoneNumberWithCode, photoURL: "photo url dite hobe na" });
        const appVerifier = window.recaptchaVerifier;


        const credential = PhoneAuthProvider.credential(data.phoneNumber, appVerifier);
        setOtpField(true)
        // const appVerifier = window.recaptchaVerifier;
        return linkWithPhoneNumber(auth.currentUser, credential)
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
                navigate('/completeInfo')
                toast('Account Creation is Successful')
                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
            });
        }
        navigate('/')
    }
    return (
        <div className='flex lg:h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Complete Your Information</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs text-black"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'name is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Your Phone</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Your Phone Number"
                                className="input input-bordered w-full max-w-xs text-black"
                                {...register("phoneNumber", {
                                    required: {
                                        value: true,
                                        message: 'Phone no is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.phoneNumber?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phoneNumber.message}</span>}
                            </label>
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

                        <input className='btn w-full max-w-xs text-white' type="submit" value="Submit" />
                    </form>
                    <div id='phone-sign-in'></div>
                </div>
            </div>
        </div>
    );
};

export default CompleteRegisterForEmail;