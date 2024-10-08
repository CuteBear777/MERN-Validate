import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { apiPost } from "../service";

const Home  = () => {
    const { user, getMe, setUser } = useUserContext();
    const [isloggedin, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const verifyToken = async() => {
        const token = localStorage.getItem('token');
        
        console.log(token);
        const response = await apiPost('/api/users/verifyToken', {token: token});
        if(response.success) {
            setIsLoggedIn(true);
            setUser(response.data as User);
            if(user?.role == "user") navigate(`/modify/:${user._id}`);
            else navigate("/allusers");
        }
        else{
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    if(!isloggedin){
        useEffect(() => {
            verifyToken();
        }, []);
    }
    


    return (
        <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
            {/* Seconde Release Change part! */}
            {user?.role == 'admin' ? 
            (
                <>
                    <Link to='/allusers'><p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">User Management</p></Link>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                         You Logged in Admin Page. You can manage user's information.
                    </p>
                </>
            ):(
                <>
                    <Link to={`/modify/${user?._id}`}><p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Change your information!</p></Link>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                         You Logged in your profile page. You can change your information. 
                    </p>
                </>
            )}

            
          </div>
        </div>
      </div>
    )
}

export default Home;