'use client'

import { AuthContext } from "@/Components/Context/AuthContext"
import Link from "next/link"
import { useContext, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast"; // toast import করুন

export default function Register() {
    const { createUser, signInWithGoogle, updateUser } = useContext(AuthContext);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // loading state যোগ করুন

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result);
                toast.success("Google Sign In Successful!");
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
            })
    }

    const handleRegister = (event) => {
        event.preventDefault();
        
        const email = event.target.email.value;
        const pass = event.target.password.value;
        const name = event.target.name.value;
        const photo = event.target.photoUrl.value;
        
        const terms = event.target.terms.checked;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/;
        
        if (!passwordPattern.test(pass)) {
            setError("Password must contain at least one uppercase, one lowercase and 6 characters needed");
            return;
        }
        if (!terms) {
            setError('Please accept our terms and conditions');
            return;
        }
        
        setError("");
        setSuccess(false);
        setLoading(true);

        createUser(email, pass)
            .then((result) => {
                const user = result.user;
                return updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        event.target.reset();
                        toast.success("Successfully Signed Up!");
                        setSuccess(true);
                        setLoading(false);
                    });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.code === 'auth/email-already-in-use') {
                    setError("Email already in use. Please use a different email.");
                } else {
                    setError(err.message);
                }
            });
    }

    const handleTogglePasswordShow = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mt-5">Sign up now!</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Your Name"
                                    required
                                />
                                
                                <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">Photo Url</label>
                                <input
                                    name="photoUrl"
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="https://example.com/photo.jpg"
                                />
                                
                                <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="input input-bordered w-full"
                                    placeholder="example@gmail.com"
                                    required
                                />
                                
                                <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">Password</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        className="input input-bordered w-full pr-10"
                                        placeholder="Password"
                                        required
                                    />
                                    <button
                                        onClick={handleTogglePasswordShow}
                                        className="absolute right-3 top-3 text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                
                                <div className="mt-4">
                                    {/* এখানে class এর পরিবর্তে className ব্যবহার করুন */}
                                    <label className="label cursor-pointer justify-start gap-2 mt-2">
                                        <input 
                                            type="checkbox" 
                                            name="terms"
                                            className="checkbox" 
                                        />
                                        <span className="label-text">Accepts Our Terms and Conditions</span>
                                    </label>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn btn-neutral mt-4 mb-2 w-full"
                                    disabled={loading}
                                >
                                    {loading ? "Signing Up..." : "Sign up"}
                                </button>
                                
                                <p className="text-gray-600 text-center">OR</p>
                                
                                <button 
                                    onClick={handleGoogleSignIn} 
                                    className="mt-2 btn bg-white text-black border-[#e5e5e5] w-full"
                                    type="button"
                                >
                                    <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <g>
                                            <path d="m0 0H512V512H0" fill="#fff"></path>
                                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                        </g>
                                    </svg>
                                    Login with Google
                                </button>
                            </fieldset>
                            
                            {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
                            {success && <p className="text-green-600 mt-2 text-sm">Account Created Successfully</p>}
                        </form>
                        
                        <p className="text-center mt-4">
                            Already have an account? Please
                            <Link className="text-blue-500 underline ml-2" href="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}