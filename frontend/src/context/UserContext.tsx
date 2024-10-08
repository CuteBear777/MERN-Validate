import React, {createContext, useContext, useState} from 'react';
import { apiGet, apiPost, apiPut, ApiResponse } from '../service'

type Context = {
    user: User | null,
    loginUser: (email: string, password: string) => Promise<ApiResponse>;
    verifyToken: (token: string) => Promise<ApiResponse>;
    registerUser: (email: string, username: string, password: string) => Promise<ApiResponse>;
    modifyUser: (userData: any) => Promise<ApiResponse>;
    getAllUsers: () => Promise<ApiResponse>;
    deleteUser: (userId:string) => Promise<ApiResponse>;
    getMe: () => Promise<ApiResponse>;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<Context>({} as Context);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    const verifyToken = async(token) => {
        return await apiPost('/api/users/verifyToken', token);
    }

    const registerUser = async(email, username, password) => {
        return await apiPost('/api/users/register', {email, username, password});
    }

    const loginUser = async(email, password) => {
        return await apiPost('/api/users/login', {email, password});
    }

    const modifyUser = async(userData: any) => {
        return await apiPost(`/api/users/modify/${userData?.userId}`, userData);
    }

    const deleteUser = async(userId: string) => {
        return await apiPost(`/api/users/delete/${userId}`, "");
    }

    const getAllUsers = async () => {
        return await apiGet("/api/users/allusers");
    }

    const getMe = async () => {
        return await apiGet('/api/users/me');
    }
    return(
        <UserContext.Provider value={{user, verifyToken, registerUser, loginUser, modifyUser, deleteUser, getAllUsers, setUser, getMe}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);