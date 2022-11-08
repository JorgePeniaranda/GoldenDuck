import React from "react";
import './dashboard.scss';
import { FiSettings } from "react-icons/fi";
import Tooltip from '@mui/material/Tooltip';
import { useStateContext } from "./contexts/ContextProvider";
import { Outlet } from 'react-router-dom';
import { Sidebar, Navbar } from './components';

const Dashboard = () => {
    const { activeMenu } = useStateContext();
    
    return (
      <div>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <Tooltip title="Settings" placement="top" arrow>
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: "blue", borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </Tooltip>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg"></div>
          )}
          <div
            className={
              activeMenu ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full' : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'
            }
          >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <Navbar />
              </div>
              <div>
                <Outlet />
              </div>
          </div>
        </div>
      </div>
    );
}

export default Dashboard;