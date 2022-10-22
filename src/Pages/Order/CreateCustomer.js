import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const CreateCustomer = () => {
    const [user] = useAuthState(auth);

    const customer = {
        name: user.name,
        email: user.email,
        username: user.name,
        password: user.password,
        membership: "",
        address: "",
        type: "",
        point: "",
        phone: user.phone,
        status: "active",


    }

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

    toast('Account Create Successful')
    return (
        <div>

        </div>
    );
};

export default CreateCustomer;