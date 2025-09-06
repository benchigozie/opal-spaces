// src/components/admin/Sidebar.tsx
import { NavLink } from "react-router-dom";
import dashboardImage from '../../assets/images/dashboard.png'
import ordersImage from '../../assets/images/orders.png';
import productImage from '../../assets/images/products.png'
import usersImage from '../../assets/images/users.png';
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", image: dashboardImage },
    { name: "Products", path: "/admin/products", image: productImage },
    { name: "Orders", path: "/admin/orders", image: ordersImage },
    { name: "Users", path: "/admin/users", image: usersImage },
  ];

  const [isBarOpen, setIsbarOpen] = useState<boolean>(window.innerWidth >= 768);
  const { user } = useAuth();
  
  useEffect(() => {
    const handleWidthResize = () => {
      setIsbarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleWidthResize);
    return () => {
      window.removeEventListener("resize", handleWidthResize);
    };
  }, []);

  return (
    <aside className="md:w-64 bg-white shadow-lg  z-10 flex flex-col justify-between">
      <div>
        <div className="p-3 md:p-6 text-xl md:text-2xl flex justify-center font-bold font-Inria text-my-black">{
          isBarOpen ? <div><span>Opal</span><span className="text-light-wood">Spaces</span></div> : <div><span>O</span><span className="text-light-wood">S</span></div>
        }</div>
        <nav className="flex flex-col gap-2 p-1 md:p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-1 md:px-4 py-2 rounded-md hover:bg-gray-200 flex justify-center md:justify-start gap-2 ${isActive ? " font-semibold bg-light-wood" : ""
                }`
              }
            >
              <div className="w-4 md:w-7"><img src={item.image} className="" alt="" /></div>
              <span className={`${isBarOpen ? 'block' : 'hidden'}`}>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className={`flex items-center ${!isBarOpen ? 'justify-center' : ''} border-t-2 border-gray-200`}>
        <div className="p-2 md:p-4">
          <span className="bg-light-wood rounded-full w-8 h-8 md:h-12 md:w-12 text-my-white flex justify-center items-center text-lg md:text-3xl"> {user?.firstName ? user?.firstName[0]?.toUpperCase() : 0}</span>
        </div>
        <div className={`${isBarOpen ? 'block' : 'hidden'}`}>
          <span className="text-sm font-semibold">{user?.firstName} {user?.lastName}</span>
          <div className="text-xs text-gray-500">{user?.role}</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
