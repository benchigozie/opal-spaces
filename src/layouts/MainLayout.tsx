import { Outlet} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignUp from "../components/SignUp";
import useRouterScroll from "../hooks/reactrouterscroll";


function MainLayout() {

    useRouterScroll();
    
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