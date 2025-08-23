import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminLayout = () => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/signin" />;
    
    if (user.role !== "ADMIN" ) return <Navigate to="/signin" />;

    return (
        <div className="flex min-h-screen font-Inter text-my-gray divide-light-wood/60 divide-x-1">
            <Sidebar />
            <main className="flex-1 bg-light-wood/20 p-3 md:p-6 text-gray-600">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;