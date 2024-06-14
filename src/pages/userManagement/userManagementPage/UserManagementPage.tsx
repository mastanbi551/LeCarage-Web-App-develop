import React from 'react';
import {
  DynamicDataTable,
  PageHeader,
} from '../../../components';
import './UserManagementPage.scss';

export interface userProps {  
  'CellPhone Number': string,
  'Email Address': string,
  'First Name': string,
  'Prathima': string,
  'Last Name': string,
  'Status': string,
  'User Id': string,
  'User Type': string,
  'Receptionist': string
}
interface UserManagementInterface {
  handleAddUser: () => void;
  columns: { Header: string; accessor: string; }[];
  searchValue: string[],
  onViewHandler: (rowInfo: object) => void;
  onEditHandler: (rowInfo: object) => void;
  onDeleteHandler:  (rowInfo: object) => void;
  users: [];
  filterValues: {mainMenu: string, subMenus: string[]}[];
  errorMessage: string;
  access: string;
  itemsPerPage: number;
  rowsPerPageValueChange: (value: string) => void
}
const UserManagementPage: React.FC<UserManagementInterface> = ({
  handleAddUser,
  columns,
  searchValue,
  onViewHandler,
  onEditHandler,
  onDeleteHandler,
  users,
  filterValues,
  errorMessage,
  access,
  itemsPerPage,
  rowsPerPageValueChange
}) => {
  return (
    <>
      <div className='users-container'>
        <div className='users-container__header-content'>
          <PageHeader
            text='Users'
            name='users-container__header-content__heading'
            isButtonDisable={true}
            buttonName='Add New'
            buttonClassName='users-container__header-content__button greenButton btn btn-success'
            buttonOnclick={handleAddUser}
            access={access}
          />
        </div>

        <div className='users-container__table-content '>
          <div className='users-container__table'>
            <DynamicDataTable
              tableHeading=''
              isSearchIconEnable={true}
              isFilterIconEnable={true}
              columns={columns}
              data={users}
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

export default UserManagementPage;
