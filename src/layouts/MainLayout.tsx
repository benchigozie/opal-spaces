import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignUp from "../components/SignUp";

function MainLayout() {
    return (
        <div className="overflow-x-clip">
            <Header />
            <main className="">
                <Outlet />
                <SignUp />
            </main>
            <Footer />
        </div>
    )
};

export default MainLayout;