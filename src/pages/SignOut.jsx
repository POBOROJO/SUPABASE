import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SignOut = () => {
    const [currentUser, setCurrentUser] = useState("");
    const supabase = createClient(
        import.meta.env.VITE_SUPABASE_PROJECT_URL,
        import.meta.env.VITE_SUPABASE_API_KEY,
    );

    const getCurrentUser = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            console.log(user);
            setCurrentUser(user?.email);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
            return;
        }
        setCurrentUser("");
    };
    return (
        <div className="col-[2/-2] grid place-items-center">
            <p>{currentUser}</p>
            <h1>Sign Out</h1>
            <p>Sign out of your account</p>
            <button onClick={getCurrentUser}>Get Current User</button>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default SignOut;
