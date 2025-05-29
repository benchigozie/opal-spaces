import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignUp from "../components/SignUp";

function MainLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
                <SignUp />
            </main>
            <Footer />
        </>
    )
};

export default MainLayout;