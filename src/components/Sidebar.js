import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTh, faClose } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar } from '../store/reducers/sidebarReducer';
import { Tooltip } from 'react-tooltip'


const Sidebar = () => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            const smallScreen = window.innerWidth < 768;
            setIsSmallScreen(smallScreen);
        };

        // Initial check on mount
        handleResize();

        // Listen to resize events
        window.addEventListener('resize', handleResize);

        // Clean up the listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const links = [
        { link: "/", text: "Home", icon: faHome },
        { link: "/dashboard", text: "Dashboard", icon: faTh },
    ];

    console.log("isOpen && isSmallScreen", isOpen && isSmallScreen)
    console.log("isOpen ", isOpen)
    console.log(" isSmallScreen", isSmallScreen)

    return (
        <div className={`flex flex-col ${isOpen ? 'w-[256px]' : 'w-[50px]'} bg-white min-h-screen transition-width duration-300 shadow-md`}
            style={isOpen && isSmallScreen ? { position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 1000 } : {}}>
            <div className='flex justify-between items-center w-full  p-3'>
                <div className='logo font-bold text-[24px] text-bgBlue'>
                    XO
                </div>
                {isOpen && isSmallScreen ? (
                    <button onClick={() => dispatch(closeSidebar())} className="">
                        <FontAwesomeIcon icon={faClose} className="text-textDarkBlue" />
                    </button>
                ) : ""}
            </div>
            <nav className={`mt-5 flex-1 p-3 flex flex-col justify-start ${isOpen ? 'items-start' : 'items-center'}`}>
                {links.map((obj, index) => (
                    <Link id={`item${index}`} key={index} to={obj.link} className={`flex items-center text-textDarkBlue justify-start ${isOpen ? 'p-3' : 'p-0 py-5 w-fit'}`}>
                        {isOpen ? "" : (
                            <Tooltip anchorSelect={`#item${index}`} place="top-start">{obj.text}</Tooltip>
                        )}
                        <FontAwesomeIcon icon={obj.icon} className="text-iconGray" />
                        {isOpen && <span className="ml-3">{obj.text}</span>}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
