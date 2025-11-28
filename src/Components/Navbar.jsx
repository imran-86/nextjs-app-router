'use client'
import Link from "next/link"
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';

export default function Navbar(){
  
     const {user,signOutUser} = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();

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

    const navItems = [
        { href: '/', label: 'Home', icon: '🏠' },
        { href: '/papers', label: 'Papers', icon: '📚' },
        { href: '/about', label: 'About', icon: 'ℹ️' },
    ];

    const userNavItems = [
        { href: '/add-papers', label: 'Add Paper', icon: '➕' },
        { href: '/manage-papers', label: 'My Papers', icon: '📋' },
    ];

    const mobileLinks = <>
        <Link href="/">Home</Link>
        <Link href="/papers">All Papers</Link>
        <Link href="/about">About</Link>
        {user && (
            <>
                <Link href="/add-papers">Add Papers</Link>
                <Link href="/manage-papers">Manage Papers</Link>
            </>
        )}
    </>

    return (
        <div className="navbar bg-base-100  fixed top-0 z-10 bg-white shadow-sm">
           
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {mobileLinks}
                    </ul>
                </div>
                
                
                <Link href="/" className="btn btn-ghost text-xl font-bold">
                    Research <span className="text-primary">PaperHub</span>
                </Link>
            </div>

           
            <div className="navbar-center hidden lg:flex">
                <div className="flex space-x-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex flex-col items-center px-4 py-2 relative
                                transition-all duration-200 group
                                ${pathname === item.href ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}
                            `}
                        >
                           
                            <span className="text-lg mb-1">{item.icon}</span>
                            
                          
                            <span className="text-sm font-medium">{item.label}</span>
                            
                            
                            <div
                                className={`
                                    absolute bottom-0 left-2 right-2 h-0.5 rounded-full
                                    transition-all duration-200
                                    ${pathname === item.href 
                                        ? 'bg-primary scale-100' 
                                        : 'bg-transparent group-hover:bg-gray-300 scale-0 group-hover:scale-100'
                                    }
                                `}
                            ></div>
                        </Link>
                    ))}
                    
                   
                    {user && userNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex flex-col items-center px-4 py-2 relative
                                transition-all duration-200 group
                                ${pathname === item.href ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}
                            `}
                        >
                            
                            <span className="text-lg mb-1">{item.icon}</span>
                            
                           
                            <span className="text-sm font-medium">{item.label}</span>
                            
                           
                            <div
                                className={`
                                    absolute bottom-0 left-2 right-2 h-0.5 rounded-full
                                    transition-all duration-200
                                    ${pathname === item.href 
                                        ? 'bg-primary scale-100' 
                                        : 'bg-transparent group-hover:bg-gray-300 scale-0 group-hover:scale-100'
                                    }
                                `}
                            ></div>
                        </Link>
                    ))}
                </div>
            </div>

            
            <div className="navbar-end flex gap-2 pr-5">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    referrerPolicy='no-referrer'
                                    alt="User Avatar" 
                                    src={user.photoURL} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li className="p-2 border-b">
                                <div className="text-sm text-gray-600">
                                   
                                    <span className="font-semibold">{user.email}</span>
                                </div>
                            </li>
                            {userNavItems.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="flex items-center gap-2 py-2">
                                        <span>{item.icon}</span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li className="border-t mt-2">
                                <button 
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 py-2 text-red-600 hover:text-red-700 w-full text-left"
                                >
                                    <span>🚪</span>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-4 items-center">
                        <Link 
                            href="/login" 
                            className="btn btn-ghost btn-sm text-gray-600 hover:text-gray-900"
                        >
                            Login
                        </Link>
                        <Link 
                            href="/register" 
                            className="btn btn-primary btn-sm text-white"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}