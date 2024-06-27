import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../store/reducers/sidebarReducer';

const Header = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.sidebar.isOpen);

    return (
        <div className="w-full bg-white text-white p-4 flex items-center justify-between border-b-[1px] border-solid border-[#EBEFF2]">
            <div className='flex justify-start items-center gap-3'>
                <button onClick={() => dispatch(toggleSidebar())} className="text-textDarkBlue p-2">
                    <div className={`w-6 h-0.5 bg-textDarkBlue mb-1 ${isOpen ? 'w-[50%]' : 'w-full'} transition-all`}></div>
                    <div className={`w-6 h-0.5 bg-textDarkBlue mb-1`}></div>
                    <div className={`w-6 h-0.5 bg-textDarkBlue`}></div>
                </button>

                <form>
                    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search for a contact</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-iconGray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="search" class="block w-full px-4 py-2 ps-10 text-sm text-gray-900 focus:border-none focus:outline-none dark:placeholder-gray-400 dark:text-white " placeholder="Search for a contact" required />
                    </div>
                </form>

            </div>
            <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 18.2071V18.5H4.5V18.2071L6.35355 16.3536L6.5 16.2071V16V11C6.5 8.09437 8.02219 5.78092 10.6153 5.16653L11 5.07538V4.68V4C11 3.44614 11.4461 3 12 3C12.5539 3 13 3.44614 13 4V4.68V5.07506L13.3843 5.16644C15.9681 5.78076 17.5 8.10482 17.5 11V16V16.2071L17.6464 16.3536L19.5 18.2071ZM13.4135 20.5C13.2061 21.0806 12.6488 21.5 12 21.5C11.3443 21.5 10.7907 21.0813 10.5854 20.5H13.4135Z" fill="white" stroke="#C2CFE0" />
                    <circle cx="17" cy="6" r="4.5" fill="#F7685B" stroke="white" />
                </svg>
            </span>
        </div>
    )
}

export default Header
