import React from "react";

export default function(){
    return (
        <footer className="bg-indigo-700 text-white text-center h-16 flex items-center justify-center">
            &copy; {new Date().getFullYear()} copyright
        </footer>
    );
}