import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../store/reducers/sidebarReducer';

const Header = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.sidebar.isOpen);

    return (
        <div className="w-full bg-white text-white p-4 flex items-center justify-between border-b-[1px] border-solid border-[#EBEFF2]">
            <button onClick={() => dispatch(toggleSidebar())} className="text-textDarkBlue p-2">
                <div className={`w-6 h-0.5 bg-textDarkBlue mb-1 ${isOpen ? 'w-[50%]' : 'w-full'} transition-all`}></div>
                <div className={`w-6 h-0.5 bg-textDarkBlue mb-1`}></div>
                <div className={`w-6 h-0.5 bg-textDarkBlue`}></div>
            </button>
        </div>
    )
}

export default Header
