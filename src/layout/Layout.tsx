import React, { useState } from 'react';
import Navigation from '../components/Navigation';

function Layout({ children }: any) {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const marginLeft = open ? '19rem' : '5rem';

  return (
    <div>
      <Navigation open={open} toggleOpen={toggleOpen} />
      <div
        style={{ marginLeft, paddingTop: '4rem' }}
        className="duration-500 text-xl font-semibold"
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
