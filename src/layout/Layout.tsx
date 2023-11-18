import React, { useState } from 'react';
import Navigation from '../components/Navigation';

function Layout({ children }: any) {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const marginLeft = open ? '19rem' : '5rem';
  const paddingLeft = open ? '10rem' : '4rem';

  return (
    <div>
      <Navigation open={open} toggleOpen={toggleOpen} />
      <div
        style={{
          marginLeft,
          paddingLeft,
          paddingTop: '4rem',
          transition: 'all .5s ease',
        }}
        className="duration-500 mx-0 py-6 sm:px-6 lg:px-2 w-9/12	h-screen"
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
