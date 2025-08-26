import { Outlet} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useRouterScroll from "../hooks/reactrouterscroll";


function MainLayout() {

    useRouterScroll();
    
    return (
        <div className="overflow-x-clip">
            <Header />
            <main className="pt-11 md:pt-14">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
};

export default MainLayout;