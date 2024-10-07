import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Home  = () => {
    const navigate = useNavigate();
    const { user, getMe, setUser } = useUserContext();

    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     window.localStorage.removeItem('token');
    //     navigate('/login');
    // };

    useEffect(() => {
        (async () => {
            if(!user) {
                const response = await getMe();
                if (response.success) {
                    setUser(response.data as User);
                } else {
                    navigate('/login');
                }
            }
        })()
    }, []);



    return (
        // <div>
        //     {user?.role == 'admin' ? 
        //     (
        //         <div>
        //             <Link to='/allusers'>User Management</Link>
        //         </div>
        //     ):(
        //         <div>
        //             <Link to={`/modify/${user?._id}`}>Modify User</Link>
        //         </div>
        //     )}
        // </div>
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