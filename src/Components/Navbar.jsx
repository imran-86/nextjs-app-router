'use client'
import Link from "next/link"
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { useRouter } from "next/navigation";


export default function Navbar(){
  
     const {user,signOutUser} = useContext(AuthContext);
    const router = useRouter();

const handleSignOut = () => {
  signOutUser()
    .then(() => {
      
      document.cookie = 'firebase-token=; path=/; max-age=0; SameSite=Strict';
      router.push('/');
      
      console.log('Successfully signed out');
    })
    .catch(err => {
      console.error('Sign out error:', err);
    });
}
    const links = <>
       
       <Link className="pl-2" href="/">Home</Link>
       <Link  className="pl-2" href="/papers">All Papers</Link>
        <Link  className="pl-2" href="/">About</Link>
        <Link  className="pl-2" href="/add-papers">Add Papers</Link>
        <Link  className="pl-2" href="/manage-papers">Manage Papers</Link>
    </>
    return <div className="">
        <div className="navbar bg-base-100 shadow-sm fixed top-0 z-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
         {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl font-bold text-blue-800">Research <span className=" font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">PaperHub</span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>
  
  <div className="navbar-end flex gap-2 list-none pr-5">
    {
      user?<div>
         {user && (
  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img
        referrerPolicy='no-referrer'
        alt="User Avatar" src={user.photoURL} />
      </div>
    </div>
    
   
    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li><a>Profile</a></li>
      <li><button onClick={handleSignOut}>Logout</button></li>
    </ul>
  </div>
)}
      </div>: <div className="flex gap-4">
        <Link  href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    }
    
  </div>
</div>
    </div>
}