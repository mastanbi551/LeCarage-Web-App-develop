import React from 'react';
import {  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import './CustomFilter.scss';

interface CustomFilterInterface {
    filterValues: {mainMenu: string, subMenus: string[]}[];
    classname?: string;
    handleFilterItemClick: (role: string) => void;
}

export const CustomFilter: React.FC<CustomFilterInterface> = ({
    filterValues,
    handleFilterItemClick
}) => {
    return (
        filterValues && filterValues.length > 0 ?        
          <UncontrolledDropdown direction='down' className='custom-Filter-dropdown btn-light' >
            <DropdownToggle className='hovereffct' caret style={{marginTop:'-5px'}}>
              <span>Filter</span>
            </DropdownToggle>
            <DropdownMenu  className='filterSwitchDropdown dropwidth filterdropdown'>
              {filterValues.map((location: {mainMenu: string, subMenus: string[]}) => (
                <UncontrolledDropdown key={location.mainMenu} direction='start' className='margntop'>
                  <DropdownToggle caret  className='dropdownToggle'>
                    <span
                      style={{
                        width: '100%',
                        marginRight: '5px',
                        padding:'8px',
                      }}
                    >
                      {location.mainMenu}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className='subFilterSwitchDropdown filterdrop'>
                    {location && location.subMenus.map((role: string) => {
                        return (
                          <DropdownItem
                            key={role}
                            onClick={(e)=>handleFilterItemClick(role)}
                            className="dropdownitem"
                            style={{
                              display: 'flex',
                              justifyContent: 'start',
                            }}
                            defaultValue={role}
                          >
                            <span>{role}</span>
                          </DropdownItem>
                        );
                      })}
                  </DropdownMenu>
                </UncontrolledDropdown>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        :
          <div>No records Found</div>
    );
};