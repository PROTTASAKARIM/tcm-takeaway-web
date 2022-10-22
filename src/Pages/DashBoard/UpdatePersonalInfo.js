import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const UpdatePersonalInfo = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [customer, setCustomer] = useState('')
    const [user] = useAuthState(auth);

    // const phone = user.phoneNumber;
    // const email = user.email;
    console.log(user?.email)

    // const url = `https://pos-api-v1.herokuapp.com/api/customer/email/${email}`
    const url = ``
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setCustomer(data));
    }, []);

    const onSubmit = data => {



    }

    return (
        <div className='h-auto'>
            <div className='flex h-auto justify-center items-center'>
                <div className="card lg:w-1/2 bg-base-100 shadow-xl sm:w-96">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Enter Your Personal info</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your image url"
                                    className="input input-bordered w-full"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: 'image is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                                </label>

                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    className="input input-bordered w-full"
                                    {...register("userName", {
                                        required: {
                                            value: true,
                                            message: 'Name is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.userName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.userName.message}</span>}
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <textarea
                                    type="text"
                                    placeholder="Enter Your Address"
                                    className="input input-bordered w-full"
                                    {...register("userAddress", {
                                        required: {
                                            value: true,
                                            message: 'Address is Required'
                                        }
                                    })}
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="input input-bordered w-full"
                                    {...register("userEmail", {
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })}
                                />

                                <label className="label">
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Phone No:</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter Your Phone No"
                                    className="input input-bordered w-full"
                                    {...register("userPhone")}
                                />
                            </div>


                            <input className='btn w-full max-w-xs text-white mt-4' type="submit" value="Update" />
                        </form>


                    </div>
                </div>
            </div >
        </div>
    );
};

export default UpdatePersonalInfo;