import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
    const { getAllUsers, deleteUser } = useUserContext();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        const response = await getAllUsers();
        
        if(response.success) setUsers(response.data);
    };

    
    useEffect(() => {
        fetchUsers();
    }, [getAllUsers]);


    const delUser = async (userId: string) => {

        const response = await deleteUser(userId);

        fetchUsers();
    }

    

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <ul role="list" className="divide-y divide-gray-100">
                {users.map((user: any, index: number) => (
                    <li key={index} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-lg font-semibold leading-6 text-gray-900">{user.name}</p>
                                <p className="text-lg truncate leading-5 text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <button onClick={() => delUser(user?._id)} className="h-12 w-12 flex-none rounded-full bg-gray-700">Del</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/')} className="h-12 w-52 flex-none rounded-md bg-blue-600 ">Back</button>
        </div>
    );
};

export default UserManagement;