import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { AccessTypes } from '../../utils/constants/ConstantStrings';
import { SideBarMenuLinks } from '../SideBarMenuLinks';
import '../sidebar/SideBar.scss';

interface SideBarMenuLinksProps {
  path: string
  name: string
  icon?: JSX.Element
}

interface NavProps {
  accessId: number,
  featureAccess: string,
  isParent: boolean,
  label: string,
  parentFeature: string,
  value: number
}


interface Props {
    route: NavProps[];
    showAnimation: object;
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    mainRoute: NavProps
  }

const SidebarMenu : React.FC<Props> =({
    route,
    isOpen,
    setIsOpen,
    mainRoute
})=>{
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);
  
  const menulink = SideBarMenuLinks.filter((menu: SideBarMenuLinksProps) => menu.name === mainRoute.label);
  return (    
    <>
    {
      menulink.length > 0 &&
      <>
      <div className='menu ' onClick={toggleMenu}>
        <div className='menu_item'>
          <div className='icon'>{menulink[0].icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial='hidden'
                animate='show'
                exit='hidden'
                className='link_text'
              >
                {mainRoute.label}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: 0,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleDown />
          </motion.div>
        )}
      </div>{' '}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial='hidden'
            animate='show'
            exit='hidden'
            className='menu_container'
          >
            {route.length > 0 && route.map((subRoute: NavProps, i?: number) => {
              if(subRoute.featureAccess !== AccessTypes.noAccess){
                const submenulink = _.filter(SideBarMenuLinks, {'name': subRoute.label});
                if(submenulink.length > 0){
                  return (              
                    <motion.div 
                    key={i} custom={i}>
                      <NavLink to={submenulink[0].path} className='link'>
                        <motion.div className='link_text'>{subRoute.label}</motion.div>
                      </NavLink>
                    </motion.div>
                  );
                }
              }
             
              
            })}
          </motion.div>
        )}{' '}
      </AnimatePresence>
      </>
    }
      
    </>
  );
};

export default SidebarMenu;