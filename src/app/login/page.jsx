'use client'

import { AuthContext } from "@/Components/Context/AuthContext"
import Link from "next/link";
import { useContext, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Login(){
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();

  
  const saveTokenToCookie = async (user) => {
    try {
      const token = await user.getIdToken();
    
      document.cookie = `firebase-token=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;
      return true;
    } catch (err) {
      console.error("Token save error:", err);
      return false;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      // console.log(result);
       const searchParams = new URLSearchParams(window.location.search);
    const redirectUrl = searchParams.get('redirect');
      await saveTokenToCookie(result.user);
      router.push(redirectUrl || '/');
    } catch (error) {
      console.log(error);
      setError("Google sign in failed");
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;

    try {
      const result = await signInUser(email, pass);
      
      await saveTokenToCookie(result.user);
       const searchParams = new URLSearchParams(window.location.search);
    const redirectUrl = searchParams.get('redirect');
      
      e.target.reset();
      
      router.push(redirectUrl || '/');
      
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return <div className="hero bg-base-200 min-h-screen ">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left"></div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleLogIn}>
            <fieldset className="fieldset">
              <h1 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">Login now!</h1>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="example@gmail.com"
                required
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                  required
                />
                <button
                  onClick={handleTogglePasswordShow}
                  className="btn btn-xs absolute top-2 right-4"
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
              </div>
              <div>
                <Link className="link link-hover text-gray-600" href='/'>
                  Forgot password?
                </Link>
              </div>
              <button className="btn btn-neutral mt-4 mb-2">Login</button>
              <p className="text-center text-gray-600">OR</p>
              <button onClick={handleGoogleSignIn} className="mt-2 btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
              </button>
            </fieldset>
          </form>
          {error ? <p className="text-red-700">{error}</p> : ""}
          <p>
            New to our Website? Please
            <Link className="text-blue-500 underline ml-2" href="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
}