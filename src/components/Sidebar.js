import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faUsers, faEnvelopeOpen, faBoxOpen, faShoppingCart, faClose } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar } from '../store/reducers/sidebarReducer';
import { Tooltip } from 'react-tooltip'


const Sidebar = () => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    const dispatch = useDispatch();
    const location = useLocation();


    const [openMenus, setOpenMenus] = useState({});

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

    // const links = [
    //     { link: "/", text: "Home", icon: faHome },
    //     { link: "/dashboard", text: "Dashboard", icon: faTh },
    // ];


    const toggleMenu = (index) => {
        setOpenMenus((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const yellowSVG = (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="3" stroke="#FFB946" strokeWidth="2" />
        </svg>
    );

    const greenSVG = (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="3" stroke="#2ED47A" stroke-width="2" />
        </svg>
    );

    const sidebarData = [
        {
            title: 'Dashboard',
            link: '/',
            icon: faTh
        },
        {
            title: 'Requests',
            icon: faEnvelopeOpen,
            links: [
                { text: 'Pending', link: '/', icon: yellowSVG },
                { text: 'Confirmed', link: '/', icon: greenSVG }
            ]
        },
        {
            title: 'Users',
            icon: faUsers,
            links: [
                { text: 'Pending', link: '/', icon: yellowSVG },
                { text: 'Confirmed', link: '/', icon: greenSVG }
            ]
        },
        {
            title: 'Boxes',
            icon: faBoxOpen,
            links: [
                { text: 'Pending', link: '/', icon: yellowSVG },
                { text: 'Confirmed', link: '/', icon: greenSVG }
            ]
        },
        {
            title: 'Orders',
            icon: faShoppingCart,
            links: [
                { text: 'Pending', link: '/', icon: yellowSVG },
                { text: 'Confirmed', link: '/', icon: greenSVG }
            ]
        },
    ];

    const renderLink = (link, icon, text, active) => (
        <Link id={`item${text}`} to={link} className={`flex text-textDarkBlue hover:text-bgBlue justify-center ${isOpen ? 'p-3 items-start' : 'p-0 py-5 w-full items-center'} ${active ? 'text-bgBlue' : ''}`}>
            <FontAwesomeIcon icon={icon} className={`${active ? 'text-bgBlue' : 'text-iconGray '}`} />
            {isOpen ? "" : (
                <Tooltip anchorSelect={`#item${text}`} place="top-start">{text}</Tooltip>
            )}
            {isOpen && <span className="ml-3">{text}</span>}
        </Link>
    );

    return (
        <div className={`flex flex-col ${isOpen ? 'w-[256px]' : 'w-[50px]'} bg-white min-h-screen transition-width duration-300 shadow-md border-r-[1px] border-solid border-[#EBEFF2]`}
            style={isOpen && isSmallScreen ? { position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 1000 } : {}}>
            <div className='flex justify-between items-center w-full  p-3 py-5'>
                <div className={`logo ${isOpen ? "text-[24px]" : "text-[18px]"} font-bold  text-bgBlue `}>
                    XO
                </div>
                {isOpen && isSmallScreen ? (
                    <button onClick={() => dispatch(closeSidebar())} className="">
                        <FontAwesomeIcon icon={faClose} className="text-textDarkBlue" />
                    </button>
                ) : ""}
            </div>
            <nav className={`flex-1 p-3 flex flex-col justify-start ${isOpen ? 'items-start' : 'items-center'}`}>
                {/* {links.map((obj, index) => (
                    <Link id={`item${index}`} key={index} to={obj.link} className={`flex items-center text-textDarkBlue justify-start ${isOpen ? 'p-3' : 'p-0 py-5 w-fit'}`}>
                        {isOpen ? "" : (
                            <Tooltip anchorSelect={`#item${index}`} place="top-start">{obj.text}</Tooltip>
                        )}
                        <FontAwesomeIcon icon={obj.icon} className="text-iconGray" />
                        {isOpen && <span className="ml-3">{obj.text}</span>}
                    </Link>
                ))} */}
                {sidebarData.map((menu, index) => (
                    <div key={index} className={`w-full flex justify-start ${isOpen ? 'items-start' : 'items-center'}`}>
                        {menu.links ? (
                            <div className='w-full relative'>
                                <div id={`item${index}`} className={`flex items-center cursor-pointer hover:text-bgBlue ${openMenus[index] ? 'text-bgBlue' : "text-textDarkBlue"} ${location.pathname === menu.title ? 'text-bgBlue' : ''}  justify-start ${isOpen ? 'p-3' : 'p-0 py-5 w-full justify-center'}`} onClick={() => toggleMenu(index)}>
                                    <FontAwesomeIcon icon={menu.icon} className={`${openMenus[index] ? 'text-bgBlue ' : "text-iconGray"}`} />
                                    {isOpen && (
                                        <span className="ml-3">{menu.title}</span>
                                    )}
                                    {isOpen ? "" : (
                                        <Tooltip anchorSelect={`#item${index}`} place="top-start">{menu.title}</Tooltip>
                                    )}
                                </div>
                                {openMenus[index] && (
                                    <div className={`${isOpen ? 'ml-6' : 'ml-0 absolute top-0 left-[38px] rounded-xl bg-white z-[100]'} flex flex-col`}>
                                        {menu.links.map((link, idx) => (
                                            <Link key={idx} to={link.link} className={`flex items-center text-textDarkBlue p-2 hover:text-gray-300 transition-all`}>
                                                <div className="w-full flex justify-start gap-3 items-center">
                                                    <span className="">{link.icon}</span>
                                                    <span className="">{link.text}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            renderLink(menu.link, menu.icon, menu.title, location.pathname === menu.link)
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
