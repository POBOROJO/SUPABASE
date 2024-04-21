import { SharedLayout, Home, SignUp, SignOut, SignIn } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signout" element={<SignOut />} />
                    <Route path="/signin" element={<SignIn />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
