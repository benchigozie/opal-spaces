import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import logo from "../assets/images/logo.png";

function SignForms() {

    const [formType, setFormType] = useState<'login' | 'register'>('login');
    return (
        <div className="w-full min-h-screen bg-my-white flex items-center justify-center font-Inter text-my-brown">
            <div className="w-full px-8 md:max-w-[600px] flex flex-col gap-8 bg-white rounded-2xl shadow-lg py-8 md:px-12">
                <div className="w-full flex justify-center">
                    <img src={logo} alt="" className="w-16 md:w-20"/>
                </div>
                <div className="grid grid-cols-2 cursor-pointer">
                    <button className={`w-full py-3 md:py-4 ${ formType === 'login' ? 'bg-light-wood text-my-white' : 'bg-my-white text-my-brown' } cursor-pointer`} onClick={() => setFormType('login')}>
                        <h1 className="text-center">SignIn</h1>
                    </button>
                    <button className={`w-full py-3 md:py-4 ${ formType === 'register' ? 'bg-light-wood text-my-white' : 'bg-my-white text-my-brown' } cursor-pointer`} onClick={() => setFormType('register')}>
                        <p className="text-center">Create Account</p>
                    </button>
                </div>
                <div>
                    <p className="text-center text-my-brown">{formType === 'login' ? 'sign in to your Opal Spaces account' : 'Join Opal Spaces and transform your interior!'} </p>
                </div>
                <div className="w-full">
                    {
                        formType === 'login' ? <Login /> : <SignUp />
                    }
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-2 items-center justify-center">
                        <hr className="border-light-wood" />
                        <p className="text-center">Or sign in with</p>
                        <hr className="border-light-wood" />
                    </div>
                    <div>
                        <button>Google</button><button>Facebook</button>
                    </div>
                </div>
                <div></div>
            </div>
        </div>

    )
}

export default SignForms