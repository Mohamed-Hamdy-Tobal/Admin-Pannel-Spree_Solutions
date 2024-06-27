import React from 'react';
import Sidebar from '../Sidebar';
import { Outlet } from "react-router-dom"
import Header from '../Header';

const Layout = () => {
    return (
        <div className='app-layout-modern flex flex-auto flex-col'>
            <div className="flex flex-auto min-w-0">
                <Sidebar />
                <div className="flex-auto flex flex-col min-w-0 relative w-full  justify-start items-center bg-[#F5F6F8]">
                    <Header />
                    <main className='w-full '>
                        <div className='page-container min-h-[calc(100vh_-_70px)] relative flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-[50px]'>
                            <div className='container mx-auto h-full'>
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
