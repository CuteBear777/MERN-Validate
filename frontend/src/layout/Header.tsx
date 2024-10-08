import { Link , useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

import{
    ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import React from "react";

export default function Header() {
    const {user, setUser} = useUserContext();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        window.localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return(
        <header className="bg-indigo-700 shadow-sm shadow-slate-300">
            <div className="container px-5 md:px-10 xl:px-14 mx-auto">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-3xl font-bold text-white">
                        <Link to='/'> Hello EveryBody! </Link>
                    </h1>
                    <div className="flex">
                        {user ? (
                            <>
                                <p>{user.username}</p>
                                <span className="cursor-pointer ml-2" onClick={handleClick}>
                                    <ArrowLeftStartOnRectangleIcon className="size-6" />
                                </span>
                            </>
                        ):(
                            <>
                            <Link to = "/login" className="btn">
                                Login
                            </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
