import React from 'react';
import Sidebar from '../Sidebar';
import { Outlet } from "react-router-dom"
import Header from '../Header';

const Layout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col justify-start items-center bg-[#F5F6F8]">
                <Header/>
                <main className='w-full flex-1'>
                    <div className='page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6'>
                        <div className='container mx-auto h-full'>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
