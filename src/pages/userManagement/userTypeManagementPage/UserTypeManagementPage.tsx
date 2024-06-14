import React from 'react';
import {
  DynamicDataTable,
  PageHeader,
} from '../../../components';
import { BookingInfo } from '../../bookingManagement/BookingsManagementPage';
import { CarProps } from '../carManagementPage/CarManagementPage';
import { CustomerProps } from '../customerManagementPage/CustomerManagementPage';
import { userProps } from '../userManagementPage/UserManagementPage';
import './UserTypeManagementPage.scss';


export interface UserTypeProps {
  Description: string,
  Status: string,
  'User Type': string,
  'User Type ID': string
}

interface UserTypesInterfaceProps {
  handleAddUsertype: () => void;
  columns: { Header: string; accessor: string; }[];
  searchValue: string[],
  onViewHandler: (rowInfo: object) => void;
  onEditHandler: (rowInfo: object) => void;
  onDeleteHandler: (rowInfo: object) => void;
  userTypesInfo: [];
  filterValues: {mainMenu: string, subMenus: string[]}[];
  errorMessage: string;
  access: string;
  itemsPerPage: number;
  rowsPerPageValueChange: (value: string) => void;
}
const UserTypeManagementPage: React.FC<UserTypesInterfaceProps> = ({
  handleAddUsertype,
  columns,
  searchValue,
  onViewHandler,
  onEditHandler,
  onDeleteHandler,
  userTypesInfo,
  filterValues,
  errorMessage,
  access,
  itemsPerPage,
  rowsPerPageValueChange
}) => {
  return (
    <>
      <div className='user-types'>
        <div className='user-types__header-content'>
          <PageHeader
            text='User Types'
            name='user-types__header-content__heading'
            isButtonDisable={true}
            buttonName='Add New'
            buttonClassName='user-types__header-content__button greenButton btn btn-success'
            buttonOnclick={handleAddUsertype}
            access={access}
          />
        </div>

        <div className='user-types__table-content '>
          <div className='user-types__table'>
            <DynamicDataTable
              tableHeading=''
              isSearchIconEnable={true}
              isFilterIconEnable={true}
              columns={columns}
              data={userTypesInfo}
              searchValue={searchValue}
              filterValues={filterValues}
              onViewHandler={onViewHandler}
              onEditHandler={onEditHandler}
              onDeleteHandler={onDeleteHandler}
              defaultItemsPerPage={itemsPerPage}
              errorMessage={errorMessage}
              isEditIconEnable={true}
              isDeleteIconEnable={true}
              access={access}
              rowsPerPageValueChange={rowsPerPageValueChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTypeManagementPage;