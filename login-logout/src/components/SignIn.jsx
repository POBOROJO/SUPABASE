import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaGithub, FaTwitter, FaRegEnvelope} from 'react-icons/fa';
import {MdLockOutline} from 'react-icons/md';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col justify-center items-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-blue-500">Dev</span>
              <span className="text-black">Net</span>
            </div>

            <div className="py-10">
              <h2 className="text-3xl font-bold text-blue-500 mb-2">
                Sign in to Account
              </h2>

              <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>

              <div className="flex justify-center my-2">
                <a
                  href="#"
                  className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-gray-200"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-gray-200"
                >
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-gray-200"
                >
                  <FaGoogle className="text-sm" />
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-gray-200"
                >
                  <FaGithub className="text-sm" />
                </a>
              </div>
              <p className="text-gray-400 my-3">or use your email account</p>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-xl">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="flex w-64 mt-4">
                  <label className="flex items-center text-xs text-gray-600 ">
                    <input type="checkbox" name="remember" className="mr-2" />
                    Remember Me
                  </label>
                  <a href="#" className="text-xs ml-auto text-blue-600">
                    Forgot Password ?
                  </a>
                </div>
                <a
                  href="#"
                  className="border-2 border-blue-500 border-solid text-blue-500 rounded-full px-14 py-2 m-10 inline-block font-bold hover:text-blue-500 hover:bg-white"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>

          <div className="w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hi, there!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Fill up the below information and start exploring.
            </p>
            <Link to="/signup">
              <p
                
                className="border-2 border-white border-solid text-white rounded-full px-12 py-2 inline-block font-bold hover:text-blue-500 hover:bg-white"
              >
                Sign Up
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignIn
