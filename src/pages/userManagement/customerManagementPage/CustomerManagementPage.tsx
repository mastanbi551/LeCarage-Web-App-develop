import React from 'react';
import {
  DynamicDataTable,
  PageHeader,
} from '../../../components';
import './CustomerManagementPage.scss';

export interface CustomerProps {
  'Email Address': string,
  'First Name': string,
  'Last Name': string,
  'Phone Number': string,
  'Status': string,
  'uId': string
}
interface CustomerManagementPageInterfaceProps {
  handleAddUser: () => void;
  columns: { Header: string; accessor: string; }[];
  searchValue: string[];
  onViewHandler: (rowInfo: object) => void;
  onEditHandler: (rowInfo: object) => void;
  onDeleteHandler: (rowInfo: object) => void;
  customers: [];
  errorMessage: string;
  filterValues: {mainMenu: string, subMenus: string[]}[];
  access: string;
  itemsPerPage: number;
  rowsPerPageValueChange: (value: string) => void
}

export const CustomerManagementPage: React.FC<CustomerManagementPageInterfaceProps> = ({
  handleAddUser,
  columns,
  searchValue,
  onViewHandler,
  onEditHandler,
  onDeleteHandler,
  customers,
  errorMessage,
  filterValues,
  access,
  rowsPerPageValueChange,
  itemsPerPage
}) => {

  return (
    <>
      <div className='customer-container'>
        <div className='customer-container__header-content'>
          <PageHeader
            text='Customers'
            name='customer-container__header-content__heading'
            isButtonDisable={true}
            buttonName='Add New'
            buttonClassName='customer-container__header-content__button greenButton btn btn-success'
            buttonOnclick={handleAddUser}
            data-testid='addCustomer'
            access={access}
          />
        </div>

        <div className='customer-container__table-content '>
          <div className='customer-container__table'>
            <DynamicDataTable
              tableHeading=''
              isSearchIconEnable={true}
              isFilterIconEnable={true}
              columns={columns}
              data={customers}
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
