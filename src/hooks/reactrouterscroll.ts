import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function useRouterScroll() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                const el = document.getElementById(location.hash.slice(1));
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }, 0);


        } else {
            window.scrollTo({ top: 0 });
        }
    }, [location]);

}

export default useRouterScroll;