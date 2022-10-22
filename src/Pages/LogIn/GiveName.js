import axios from 'axios';
import React from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const GiveName = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const customer = {
        name: user.name,
        email: "rahat@gmail.com",
        username: "01794747287",
        password: "demo",
        membership: "demo",
        address: "demo",
        type: "demo",
        point: 0,
        phone: user.phone,
        status: "active",


    }
    const createCustomer = () => {
        const url = `http://pos-api-v1.herokuapp.com/api/customer`;

        axios
            .post(url, JSON.stringify(customer))
            .then((data) => {
                if (data.status) {
                    toast.success('customer created Successfully', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })

                }
                else {
                    toast.error('Failed to create customer. Please Give Correct Information', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            });


    }

    const onSubmit = (data) => {
        updateProfile({ displayName: data.name });

        createCustomer()
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

                        <input className='btn w-full max-w-xs text-white' type="submit" value="Submit" />
                    </form>
                    <div id='phone-sign-in'></div>
                </div>
            </div>
        </div>
    );
};

export default GiveName;