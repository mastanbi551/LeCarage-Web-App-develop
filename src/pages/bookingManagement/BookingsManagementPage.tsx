import React from 'react';
import {
  DynamicDataTable,
  PageHeader,
} from '../../components';
import './bookings/Bookings.scss';


export interface BookingInfo {
  'Car Registration': string,
  Date: string,
  'First Name': string,
  'Last Name': string,
  pkiBookingId: string,
  Service: string,
  Status: string,
  Time: string
}

interface BookingsManagementPageInterface {
  handleAddbooking: () => void,
  columns: { Header: string; accessor: string; }[],
  searchValue: string[],
  onViewHandler: (rowInfo: object) => void;
  onEditHandler: (rowInfo: object) => void;
  onDeleteHandler?: (rowInfo: object) => void;
  bookings: [],
  errorMessage: string,
  filterValues: {mainMenu: string, subMenus: string[]}[];
  access: string;
  rowsPerPageValueChange: (value: string) => void;
  itemsPerPage: number
}

export const BookingsManagementPage: React.FC<BookingsManagementPageInterface> = ({
  handleAddbooking,
  columns,
  searchValue,
  onViewHandler,
  onEditHandler,
  onDeleteHandler,
  bookings,
  errorMessage,
  filterValues,
  access,
  rowsPerPageValueChange,
  itemsPerPage
}) => {
  return (
    <>
      <div className='bookings-container'>
        <div className='bookings-container__header-content'>
          <PageHeader
            text='Bookings'
            name='bookings-container__header-content__heading'
            isButtonDisable={true}
            buttonName='Add Booking'
            buttonClassName='bookings-container__header-content__button greenButton btn btn-success'
            buttonOnclick={handleAddbooking}
            access={access}
          />
        </div>

        <div className='bookings-container__table-content '>
          <div className='bookings-container__table'>
            <DynamicDataTable
              tableHeading=''
              isSearchIconEnable={true}
              isFilterIconEnable={true}
              columns={columns}
              data={bookings}
              searchValue={searchValue}
              filterValues={filterValues}
              onViewHandler={onViewHandler}
              onEditHandler={onEditHandler}
              // onDeleteHandler={onDeleteHandler}
              defaultItemsPerPage={itemsPerPage}
              errorMessage={errorMessage}
              isEditIconEnable={true}
              isDeleteIconEnable={false}
              access={access}
              rowsPerPageValueChange={rowsPerPageValueChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
