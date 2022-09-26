import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartIcon, BeakerIcon } from '@heroicons/react/24/solid';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { getStoredCart, updateCart } from '../../hooks/localStorageCart3';
import { useState } from 'react';
import { CountContext } from '../../App';

const Navbar = ({ nav }) => {
    const [user] = useAuthState(auth);

    console.log(user?.displayName)
    const logout = () => {
        signOut(auth);

    };


    const [cartCount, setCartCount] = useContext(CountContext)

    const getLocalData = getStoredCart();
    setCartCount(getLocalData.length)
    const navigateToViewCart = () => {
        // navigate('/viewcart')

        // console.log(openDrawer)

    }


    return (
        <div className="navbar bg-base-100 bg-white font-sans">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {/* <li className='font-semibold'><Link to='/allproducts'>All Items</Link></li> */}
                        {/* <li className='font-semibold'><Link to='/aboutus'>About us</Link></li> */}
                        {/* <li className='font-semibold'><Link to='/dashboard'>DashBoard</Link></li> */}
                        <li tabIndex={0}>
                            <Link to='/dashboard' className="justify-between">
                                DashBoard
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                            </Link>
                            <ul className="p-2 bg-white">
                                <li><Link to='/dashboard'>Personal Info</Link></li>
                                <li><Link to='/dashboard/updatepersonalinfo'>Update Personal Info</Link></li>
                                <li><Link to='/dashboard/perivousorders'>Previous Order</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">
                    <img className='h-full' src='https://i.ibb.co/Jk63Ptg/logo.png' alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {/* <li className='font-semibold'><Link to='/allproducts'>All Items</Link></li> */}
                    {/* <li className='font-semibold'><Link to='/aboutus'>About us</Link></li> */}
                    {/* <li className='font-semibold'><Link to='/dashboard'>DashBoard</Link></li> */}
                </ul>
            </div>
            <div className="navbar-end">
                {/* <div>
                    <ShoppingCartIcon onClick={() => navigateToViewCart()} className="h-6 w-6 text-black hover:cursor-pointer"
                    ></ShoppingCartIcon>
                    <div className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">5</div>
                </div> */}
                {
                    user ?
                        <>

                            <div className="dropdown px-6">
                                <label tabIndex={0}>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg> */}
                                    {user?.displayName}
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box">
                                    <li className="btn btn-ghost" onClick={logout}> Logout</li>
                                    <li tabIndex={0}>
                                        <Link to='/dashboard' className="justify-between">
                                            DashBoard
                                            {/* <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg> */}
                                        </Link>
                                    </li>
                                </ul>
                            </div>


                            {/* <button className="btn btn-ghost" onClick={logout} >{user?.displayName}</button> */}
                        </>

                        : <Link to='/login'><p className='px-4 font-semibold'>Log In</p></Link>
                }
                <span class="relative inline-block pr-6 pl-2">
                    <label htmlFor="my-drawer-4" className="drawer-button">
                        <ShoppingCartIcon onClick={() => navigateToViewCart()} className="h-6 w-6 text-black hover:cursor-pointer"
                        ></ShoppingCartIcon>
                    </label>

                    <span class="absolute top-0 right-5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cartCount}</span>
                </span>



            </div>
        </div >
    );
};

export default Navbar;