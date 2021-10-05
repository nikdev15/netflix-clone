import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { selectSubscription } from "../../features/userSlice";
import "./Nav.css"

function Nav() {
    const [show , setShow] = useState(false);
    const history = useHistory();

    const transitionNavBar =() => {
        if(window.scrollY > 100) {
            setShow(true);
        }else{
            setShow(false);
        }
    }

   

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => {
            window.removeEventListener("scroll", transitionNavBar);
        }
    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <div className="nav_contents">
                <img onClick={() => history.push("/")} className="nav_logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt=""/>
                <img onClick={() => history.push("/profile")} className="nav_avatar" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt=""/>
                
            </div>
        </div>
    )
}

export default Nav
