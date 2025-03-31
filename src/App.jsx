import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; 
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home.jsx";
import Settings from "./pages/Settings.jsx";
import Post from "./pages/Post.jsx";
import "./index.css";
import "./App.css";
import BottomNav from "./components/BottomNav.jsx";


function Layout() {
    const location = useLocation();
    const hideBottomNavRoutes = ["/", "/signup", "/signin"];

    return (
        <>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/home" element={<Home />} />
                <Route path="/post" element={<Post />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
            {!hideBottomNavRoutes.includes(location.pathname) && <BottomNav />}
        </>
    );
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
