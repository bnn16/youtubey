import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { RiSettings4Line } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { FiMessageSquare } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi';
import { AiOutlineQuestion } from 'react-icons/ai';
import { MdAlternateEmail } from 'react-icons/md';
import { useAuth } from '../utils/AuthProvider';

const Navigation = ({ open, toggleOpen }: any) => {
  const { token, onLogout } = useAuth();
  const [isOpen, setOpen] = useState(true);

  const handleSidebarToggle = () => {
    toggleOpen();
  };

  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  let topMenus: any = [];
  let bottomMenus: any = [];

  if (token) {
    topMenus = [
      { name: 'Dashboard', link: '/dashboard', icon: MdOutlineDashboard },
      { name: 'Messages', link: '/messages', icon: FiMessageSquare },
      { name: 'Profile', link: '/profile', icon: AiOutlineUser },
    ];
    bottomMenus = [
      {
        name: 'Settings',
        link: '/settings',
        icon: RiSettings4Line,
        margin: true,
      },
      { name: 'Logout', icon: BiLogOutCircle },
    ];
  } else {
    topMenus = [
      { name: 'Home', link: '/', icon: MdOutlineDashboard },
      { name: 'How it works', link: '/how-it-works', icon: AiOutlineQuestion },
      { name: 'Join Now!', link: '/register', icon: AiOutlineUser },
    ];
    bottomMenus = [
      { name: 'Contact Us', link: '/contact', icon: MdAlternateEmail },
      {
        name: 'Settings',
        link: '/settings',
        icon: RiSettings4Line,
        margin: true,
      },
    ];
  }

  return (
    <section className="flex gap-6 fixed">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          isOpen ? 'w-72' : 'w-16'
        } duration-500 text-gray-100 px-4 flex flex-col`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => {
              setOpen(!isOpen);
              handleSidebarToggle();
            }}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {topMenus?.map((menu: any, i: any) => (
            <Link
              to={menu?.link}
              key={i}
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-red-700 rounded-md mt-2`}
            >
              <div>{React.createElement(menu?.icon, { size: '20' })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 2}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!isOpen &&
                  'opacity-0 translate-x-28 overflow-hidden'}`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${isOpen &&
                  'hidden'} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>

        {/* Section for bottom menus */}
        <div className="mt-auto mb-3">
          {bottomMenus?.map((menu: any, i: any) => (
            <div key={i}>
              {menu.name === 'Logout' ? (
                <button
                  type="button"
                  onClick={onLogout}
                  className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-red-800 rounded-md mt-2`}
                >
                  <div>{React.createElement(menu.icon, { size: '20' })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 2}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${!isOpen &&
                      'opacity-0 translate-x-28 overflow-hidden'}`}
                  >
                    {menu.name}
                  </h2>
                  <h2
                    className={`${isOpen &&
                      'hidden'} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu.name}
                  </h2>
                </button>
              ) : (
                <Link
                  to={menu.link}
                  className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-red
                  -800 rounded-md mt-2`}
                >
                  <div>{React.createElement(menu.icon, { size: '20' })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 2}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${!isOpen &&
                      'opacity-0 translate-x-28 overflow-hidden'}`}
                  >
                    {menu.name}
                  </h2>
                  <h2
                    className={`${isOpen &&
                      'hidden'} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu.name}
                  </h2>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="full-width-section">
        <Link
          to="/"
          className="m-3 text-xl text-gray-900 font-semibold flex w-100% h-5 hover:cursor-pointer z-50"
        >
          <img
            className="w-10 -ml-6 h-10 mx-2 hover:cursor-pointer"
            src="https://media.onlinejobs.ph/employer_logos/615548/70b1fba89cfaa8abe47abbe755e0f11f.png"
            alt="logo"
          />
          <p className="mt-1.5">
            You<span className="text-red-500">Tubey</span>
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Navigation;
