import { NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from './SideBarMenu';
import '../sidebar/SideBar.scss';
import {
  ImagesPath,
} from '../../utils/constants';
import { Header } from '../header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import {
  SideBarMenuLinks,
  DefaultMenu,
} from '../SideBarMenuLinks';
import { onApiCall, setRoutes } from './sidebarState/SidebarSlice';
import _ from 'lodash';
import { AccessTypes, responseStatus } from '../../utils/constants/ConstantStrings';
import { Details } from './sidebarState/SidebarStateInterface';

interface SideBarMenuLinksProps {
  path: string;
  name: string;
  icon?: JSX.Element;
}
interface NavProps {
  accessId: number;
  featureAccess: string;
  isParent: boolean;
  label: string;
  parentFeature: string;
  value: number;
}
interface RoutesProps {
  mainNavMenus: NavProps[];
  subNavMenus: {
    string: NavProps[];
  }[];
}
interface IProps {
  children: React.ReactElement;
  isAuthenticated: boolean;
  setAuth: (user: boolean) => void;
}
export const SideBar: React.FC<IProps> = ({
  children,
  isAuthenticated,
  setAuth,
}) => {
  const dispatch = useAppDispatch();
  const { responseData, isLoading } = useAppSelector(
    (state) => state.sidebarReducer
  );

  const [dynamicRoutes, setDynamicRoutes] = useState<Details[]>([]);

  const { userRole, defaultDetails } = useAppSelector(
    (state) => state.headerReducer
  );

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const getDashboardMenusBasedOnUserType = async () => {
    if (defaultDetails && defaultDetails.userTypeValue !== '') {
      const apiparams = {
        userTypeId: defaultDetails ? defaultDetails.userTypeValue : '',
      };
      dispatch(onApiCall(apiparams));
    }
  };

  useEffect(() => {
    if (isLoading === true)
      if (responseData.status === responseStatus.success) {
        setDynamicRoutes(responseData.details);
        dispatch(setRoutes(responseData.details[0].subNavMenus));
      }
  }, [isLoading, responseData]);

  useEffect(() => {
    if (defaultDetails) getDashboardMenusBasedOnUserType();
  }, [userRole, defaultDetails]);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Header setAuth={setAuth} />
      <div
        className='main-container'
        style={isAuthenticated ? { display: 'flex' } : { display: 'none' }}
      >
        <motion.div
          animate={{
            width: isOpen ? '272px' : '70px',
            transition: {
              duration: 0.5,
              // type: 'spring',
              // damping: 10,
            },
            position: 'absolute',
            top: '0px',
          }}
          className='sidebar fixed'
        >
          <div
            className='top_section'
            style={{ padding: isOpen ? '10px' : '23px' }}
          >
            <AnimatePresence>
              {isOpen && (
                <a href='/'>               
                 <motion.img
                  initial='hidden'
                  animate='show'
                  exit='hidden'
                  className='logo'
                  src={ImagesPath.lecaragelogo}
                  alt='Le Carage'                 
                  
                ></motion.img></a>
              )}
            </AnimatePresence>

            <div className='bars'>
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className='routes'>
            {userRole !== '' ? (
              dynamicRoutes.length > 0 &&
              dynamicRoutes.map((route: RoutesProps, index?: number) => {
                const mainMenus = _.get(route, 'mainNavMenus');
                return (
                  mainMenus.length > 0 &&
                  mainMenus.map((mainMenu: NavProps, index: number) => {
                    if(mainMenu.featureAccess !== AccessTypes.noAccess || mainMenu.label === 'Dashboard') {
                    
                    const menulink = SideBarMenuLinks.filter(
                      (menu: SideBarMenuLinksProps) =>
                        menu.name === mainMenu.label
                    );

                    const subMenus = _.get(
                      route && route.subNavMenus,
                      mainMenu.label
                    );

                    if (subMenus) {
                      return (
                        <SidebarMenu
                          setIsOpen={setIsOpen}
                          route={subMenus}
                          mainRoute={mainMenu}
                          showAnimation={showAnimation}
                          isOpen={isOpen}
                          key={index}
                        />
                      );
                    }
                    return (
                      <NavLink
                        to={menulink[0].path}
                        key={index}
                        className='link'
                        style={({ isActive }) =>
                          isActive
                            ? {
                                background: '#275820',
                              }
                            : {}
                        }
                      >
                        <div className='icon'>{menulink[0].icon}</div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              variants={showAnimation}
                              initial='hidden'
                              animate='show'
                              exit='hidden'
                              className='link_text'
                            >
                              {mainMenu.label}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    );
                  }
                  })
                );
              })
            ) : (
              <NavLink
                to={DefaultMenu[0].path}
                className='link'
                style={({ isActive }) =>
                  isActive
                    ? {
                        background: '#275820',
                      }
                    : {}
                }
              >
                <div className='icon'>{DefaultMenu[0].icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial='hidden'
                      animate='show'
                      exit='hidden'
                      className='link_text'
                    >
                      {DefaultMenu[0].name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            )}
          </section>
        </motion.div>

        <main style={{ paddingLeft: isOpen ? '272px' : '70px' }}>
          {children}
        </main>
      </div>
    </>
  );
};
