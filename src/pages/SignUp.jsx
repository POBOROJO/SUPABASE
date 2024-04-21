import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const supabase = createClient(
        import.meta.env.VITE_SUPABASE_PROJECT_URL,
        import.meta.env.VITE_SUPABASE_API_KEY,
    );

    const navigate = useNavigate();

    const handleSignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            // options: {
            //     emailRedirectTo: "http://localhost:5173/",
            // },
        });

        if (error) {
            console.log(error);
            alert(error.message);
            return;
        }

        if (data) {
            console.log(data);
            navigate("/");
        }

        // console.log(data);
        // setIsVerificationSent(true);
        setEmail("");
        setPassword("");
    };

    return (
        <div className=" col-[2/-2] grid place-items-center">
            <h1>Sign Up</h1>
            <p>Sign Up with your email and password</p>
            <form>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <br />
                <button type="button" onClick={() => handleSignUp()}>
                    Sign Up
                </button>
            </form>
            {isVerificationSent && (
                <p className="text-green-500">Verification email sent</p>
            )}
        </div>
    );
};

export default SignUp;
