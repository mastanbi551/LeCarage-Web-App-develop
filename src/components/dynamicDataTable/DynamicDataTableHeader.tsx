import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import { Input } from 'reactstrap';
import { CustomFilter } from '../customFilter/CustomFilter';

interface IProps {
  tableHeading?: string | null;
  isSearchIconEnable?: boolean | undefined; //React.ElementType;
  isFilterIconEnable?: boolean | undefined; //React.ElementType
  onSearchChangeHandler: (value: string) => void;
  searchFieldtext: string | undefined;
  filterValues: {mainMenu: string, subMenus: string[]}[];
  handleCategoryChange: (role: string) => void;
  searchInputFieldEnable?: boolean,
  filterDropDownEnable?: boolean
  onSetSearchInputFieldEnable?: () => void,
  onSetFilterDropDownEnable?: () => void
}

export const DynamicDataTableHeader: React.FC<IProps> = ({
  tableHeading,
  isSearchIconEnable,
  isFilterIconEnable,
  onSearchChangeHandler,
  searchFieldtext,
  filterValues,
  handleCategoryChange,
  searchInputFieldEnable,
  filterDropDownEnable,
  onSetSearchInputFieldEnable,
  onSetFilterDropDownEnable
}) => {



  return (
    <div className='table-header'>
      {tableHeading && (
        <h2 className='table-header__heading'>{tableHeading}</h2>
      )}
      <div className='table-header__icons'>
        {searchInputFieldEnable && (

          <Input
            type='text'
            id='search'
            placeholder='search'
            onChange={(e) => onSearchChangeHandler(e.target.value)}
            value={searchFieldtext}
            className='table-header__search-field'
            autoComplete='off'           
          // disabled={searchDisabled}
          />

        )}
        {isSearchIconEnable && (
          <BiSearch
            onClick={onSetSearchInputFieldEnable}
          />
        )}
        {filterDropDownEnable && (
          <CustomFilter 
            filterValues={filterValues}
            handleFilterItemClick={handleCategoryChange}
          />
        )}
        {isFilterIconEnable && (
          <FiFilter
            onClick={onSetFilterDropDownEnable}
          />
        )}
      </div>
    </div>
  );
};
