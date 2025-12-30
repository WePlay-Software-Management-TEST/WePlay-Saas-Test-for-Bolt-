import React, { useEffect } from 'react';
import { Header } from 'core/layout/header';
import { MemorizedSidePanel } from 'core/layout/sidepanel';
import { Outlet } from 'react-router';
import { useNavigate, useLocation } from 'react-router-dom';

function Dashboard (): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '' || location.pathname === '/') {
      navigate('/player');
    }
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-start h-screen overflow-y-auto mobile:h-dvh md:h-screen">
          <Header />
          <div className='w-full h-full'>
            <Outlet />
          </div>
        </div>
        <MemorizedSidePanel />
    </div>
  );
};

export default Dashboard;
