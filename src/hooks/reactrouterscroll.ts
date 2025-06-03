import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook to handle smooth scrolling to elements with IDs based on the current URL hash.
 * It scrolls to the element when the component mounts or when the location changes.
 */

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