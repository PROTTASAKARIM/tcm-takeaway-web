import React from 'react';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithFacebook, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from 'react';
import axios from 'axios';
import CreateCustomer from '../Order/CreateCustomer';

const RegisterNew = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const [otpField, setOtpField] = useState(false);
    const [otp, setOtp] = useState("")


    // const phoneNumber = '+8801521103263';

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
        const phoneNumber = "+88" + data.address;
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

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, fUser, floading, fError] = useSignInWithFacebook(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const [sendEmailVerification, sending, verror] = useSendEmailVerification(
        auth
    );



    const onSubmit = async data => {
        // const validEmail = await sendEmailVerification();
        // if (validEmail) {
        //     await createUserWithEmailAndPassword(data.email, data.password);
        //     toast('Email is Verified')
        // } else {
        //     toast('Please Enter Valid Email')
        // }

        console.log(data)
        const isNumber = /^\d/.test(data?.address);

        if (isNumber) {
            callingSignInWithPhoneNumber(data)
        } else {
            callingSignInWithEmailAddress(data)
        }


        // await createUserWithEmailAndPassword(data.email, data.password);
        // toast('Account Create Successful')


    }

    const callingSignInWithPhoneNumber = (data) => {
        signInWithPhone(data)
        setOtpField(true)
    }

    const callingSignInWithEmailAddress = async data => {

        const isEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(data.address);
        const email = data.address

        if (isEmail) {
            console.log(data)
            await createUserWithEmailAndPassword(email, data.password)
            // navigate('/completeInfoPhone')

            toast('Account Create Successful')
        }
        else {
            window.alert("Give valid Email Address")
        }


        // console.log(isEmail)

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
                // navigate('/completeInfo')
                toast('Account Creation is Successful')

                { <CreateCustomer></CreateCustomer> }


                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
            });
        }
    }


    if (user || gUser || fUser) {

        //  TODO:: registration successful hole oi user diye pos a ekta customer create korbo. SMS confirmation. Name email, phone , 


        { <CreateCustomer></CreateCustomer> }

        navigate('/')
    }


    let signInError;
    if (error || gError || fError || verror) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }
    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="input input-bordered w-full max-w-xs text-black"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div> */}

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email/Phone Number</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Email/Phone Number"
                                    className="input input-bordered w-full max-w-xs text-black"
                                    {...register("address", {
                                        required: {
                                            value: true,
                                            message: 'Email/Phone is Required'
                                        },
                                        // pattern: {
                                        //     // value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        //     message: 'Provide a valid Email or Phone Number'
                                        // }
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



                        <p><small>Already have an account? <Link className='text-accent' to="/login">Please login</Link></small></p>
                        <div className="divider">OR</div>
                        {signInError}
                        <button
                            onClick={() => signInWithGoogle()}
                            className="btn btn-outline"
                        >Continue with Google</button>
                        {/* <button
                            onClick={() => signInWithPhone()}
                            className="btn btn-outline"
                        >Sign in with phone number</button> */}
                        <button
                            onClick={() => signInWithFacebook()}
                            className="btn btn-outline"
                        >Continue with Facebook</button>
                    </div>
                    <div id='phone-sign-in'></div>
                </div>
            </div >
        </div>
    );
};

export default RegisterNew;