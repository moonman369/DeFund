import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks, linkMap } from '../constants';
import { useStateContext } from '../context';
import { ConnectWallet } from '@thirdweb-dev/react';
import { NotificationManager } from 'react-notifications';

const Navbar = () => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState('dashboard');
  const [id, setId] = useState('');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address, disconnect } = useStateContext();

  const handleSubmit = () => {
    if (address) {
      if (id === '') return;
      navigate(`/search-results/${id}`, {
        state: { queryId: id },
      });
      searchRef.current.value = '';
      setId('');
    } else {
      searchRef.current.value = '';
      NotificationManager.error(
        'Please connect your metamask account first',
        'Wallet Not Connected',
        2000
      );
      return;
    }
  };

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  useEffect(() => {
    // console.log(pathname);
    const active = linkMap.get(pathname);
    if (active) setIsActive(active);
  }, [pathname]);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search for campaigns by id"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          onChange={(e) => {
            setId(e.target.value);
          }}
          onKeyUp={handleEnterPress}
        />

        <button onClick={handleSubmit}>
          <div className="w-[72px] h-full rounded-[20px] bg-gradient-to-r from-[#1d64c0] to-[#1dc071] flex justify-center items-center cursor-pointer">
            <img
              src={search}
              alt="search"
              className="w-[15px] h-[15px] object-contain"
            />
          </div>
        </button>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        {address ? (
          <div className="flex">
            <CustomButton
              btnType="button"
              title={'Create a campaign'}
              styles={'bg-gradient-to-r from-[#1d64c0] to-[#1dc071] mr-3'}
              handleClick={() => {
                navigate('create-campaign');
              }}
            />
            <ConnectWallet className="font-epilogue font-semibold test-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]" />
          </div>
        ) : (
          <div>
            <CustomButton
              btnType="button"
              title={'Connect'}
              styles={'bg-gradient-to-r from-[#8c6dfd] to-[#d47c34]'}
              handleClick={() => {
                connect();
              }}
            />
          </div>
        )}

        {/* <Link to="/profile">
          
        </Link> */}

        <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={thirdweb}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
            onClick={() => {
              if (!address) {
                NotificationManager.error(
                  'Please connect your metamask account first',
                  'Wallet Not Connected',
                  2000
                );
                return;
              } else {
                navigate('/profile');
              }
            }}
          />
        </div>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
            onClick={() => {
              if (!address) {
                NotificationManager.error(
                  'Please connect your metamask account first',
                  'Wallet Not Connected',
                  2000
                );
                return;
              } else {
                navigate('/campaigns');
                setToggleDrawer(false);
              }
            }}
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer(!toggleDrawer)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 rounded-[10px] ${
            !toggleDrawer ? '-translate-y-[120%]' : 'translate-y-0'
          } transition-all duration-700`}
        >
          <ul className="mb-5">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 mb-5 ${
                  isActive === link.name && 'bg-[#3a3a43]'
                }`}
                onClick={() => {
                  if (address) {
                    if (!link.disabled) {
                      setIsActive(link.name);
                      setToggleDrawer(false);
                    }
                    if (link.name === 'logout') {
                      disconnect();
                      navigate('/');
                      setIsActive('home');
                      return;
                    }
                    navigate(link.link);
                  } else {
                    NotificationManager.error(
                      'Please connect your metamask account first',
                      'Wallet Not Connected',
                      2000
                    );
                    return;
                  }
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? 'grayscale-0' : 'grayscale'
                  } ${link.disabled && 'fill-current text-[#58585a]'}`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? 'text-[#1dc071]' : 'text-[#9a9ba5]'
                  } ${!link.disabled ? 'cursor-pointer' : 'text-[#58585a]'}`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mx-4">
            {address ? (
              <div className="flex flex-col">
                <ConnectWallet
                  className="font-epilogue font-semibold test-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]"
                  my-3
                />
                <CustomButton
                  btnType="button"
                  title={'Create a campaign'}
                  styles={'bg-gradient-to-r from-[#1d64c0] to-[#1dc071] my-3'}
                  handleClick={() => {
                    setToggleDrawer(false);
                    navigate('create-campaign');
                  }}
                />
              </div>
            ) : (
              <div>
                <CustomButton
                  btnType="button"
                  title={'Connect'}
                  styles={'bg-gradient-to-r from-[#8c6dfd] to-[#d47c34]'}
                  handleClick={() => {
                    connect();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
