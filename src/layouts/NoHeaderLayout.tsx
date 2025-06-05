import { Outlet } from "react-router-dom";
import useRouterScroll from "../hooks/reactrouterscroll";

function NoHeaderLayout() {

    useRouterScroll();

    return (
        <div className="min-h-screen">
            <Outlet />
        </div>
    );
}

export default NoHeaderLayout;