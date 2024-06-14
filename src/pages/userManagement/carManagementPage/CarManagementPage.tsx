import React from 'react';
import {
  DynamicDataTable,
  PageHeader,
} from '../../../components';
import './CarManagementPage.scss';

export interface CarProps { 
  carId: string,
  Color: string,
  Customer: string, 
  Location: string,
  Make: string,
  Model: string,
  'Number Plate': string,
  Stalling: string,
  Status: string,
}
interface CarManagementPageInterface {
  handleAddCar: () => void;
    columns: { Header: string; accessor: string; }[];
    searchValue:  string[],
    onViewHandler: (rowInfo: object) => void;
    onEditHandler: (rowInfo: object) => void;
    onDeleteHandler: (rowInfo: object) => void;
    carsInfo: [];
    errorMessage: string;
    filterValues: {mainMenu: string, subMenus: string[]}[];
    access: string;
    rowsPerPageValueChange: (value: string) => void;  
    itemsPerPage: number
}
export const CarManagementPage: React.FC<CarManagementPageInterface> = ({
  handleAddCar,
  columns,
  searchValue,
  onViewHandler,
  onEditHandler,
  onDeleteHandler,
  carsInfo,
  errorMessage,
  filterValues,
  access,
  rowsPerPageValueChange,
  itemsPerPage
}) => {


  return (
    <>
    
      <div className='cars-container'>
        <div className='cars-container__header-content'>
          <PageHeader
            text='Cars'
            name='cars-container__header-content__heading'
            isButtonDisable={true}
            buttonName='Add New'
            buttonClassName='cars-container__header-content__button greenButton btn btn-success'
            buttonOnclick={handleAddCar}
            access={access}
          />
          
        </div>
        

        <div className='cars-container__table-content '>
          <div className='cars-container__table'>
            <DynamicDataTable
              tableHeading=''
              isSearchIconEnable={true}
              isFilterIconEnable={true}
              columns={columns}
              data={carsInfo}
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
