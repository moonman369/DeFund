import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { logo, sun } from '../assets';
import { navlinks, linkMap } from '../constants';
import { useStateContext } from '../context';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && 'bg-[#2c2f32]'
    } flex justify-center items-center ${
      !disabled && 'cursor-pointer'
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const { disconnect, address } = useStateContext();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState('dashboard');
  // console.log(pathname);

  useEffect(() => {
    const active = linkMap.get(pathname);
    if (active) setIsActive(active);
  }, [pathname]);

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      {/* <Link to={`${address ? '/campaigns' : '/'}`}>
      </Link> */}

      <Icon
        styles="w-[52px] h-[52px] bg-[#2c2f32]"
        imgUrl={logo}
        handleClick={() => {
          if (!address) {
            NotificationManager.error(
              'Please connect your metamask account first',
              'Wallet Not Connected',
              2000
            );
            return;
          } else {
            navigate('/campaigns');
          }
        }}
      />

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-5">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!address) {
                  NotificationManager.error(
                    'Please connect your metamask account first',
                    'Wallet Not Connected',
                    2000
                  );
                  return;
                }
                if (!link.disabled) {
                  console.log(address);
                  setIsActive(link.name);
                  navigate(link.link);
                  if (link.name === 'logout') {
                    disconnect();
                    navigate('/');
                    setIsActive('home');
                  }
                }
              }}
            />
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
