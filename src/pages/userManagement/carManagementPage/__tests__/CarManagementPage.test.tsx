import React from 'react';
import { render, screen } from '@testing-library/react';
import { DynamicDataTable, PageHeader } from '../../../../components';
import { CarManagementPage } from '../CarManagementPage';

describe('CarManagementPage', () => {
  const carsInfo = [
    {
      carId: '1',
      Color: 'Blue',
      Customer: 'John Doe',
      Location: 'New York',
      Make: 'Honda',
      Model: 'Civic',
      'Number Plate': 'ABC123',
      Stalling: 'No',
      Status: 'Active',
    },
    // Add more cars as needed for testing
  ];
  const columns = [
    { Header: 'Car ID', accessor: 'carId' },
    { Header: 'Color', accessor: 'Color' },
    // Add more columns as needed for testing
  ];
  const searchValue = ['Honda'];
  const filterValues = [
    { mainMenu: 'Status', subMenus: ['Active', 'Inactive'] },
    // Add more filter values as needed for testing
  ];
  const errorMessage = '';

  const mockHandleAddCar = jest.fn();
  const mockOnViewHandler = jest.fn();
  const mockOnEditHandler = jest.fn();
  const mockOnDeleteHandler = jest.fn();

  it('renders correctly', () => {
    const { container } = render(
      <CarManagementPage
        handleAddCar={mockHandleAddCar}
        columns={columns}
        searchValue={searchValue}
        filterValues={filterValues}
        carsInfo={carsInfo}
        errorMessage={errorMessage}
        onViewHandler={mockOnViewHandler}
        onEditHandler={mockOnEditHandler}
        onDeleteHandler={mockOnDeleteHandler}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should call handleAddCar when Add New button is clicked', () => {
    render(
        <CarManagementPage
        handleAddCar={mockHandleAddCar}
        columns={columns}
        searchValue={searchValue}
        filterValues={filterValues}
        carsInfo={carsInfo}
        errorMessage={errorMessage}
        onViewHandler={mockOnViewHandler}
        onEditHandler={mockOnEditHandler}
        onDeleteHandler={mockOnDeleteHandler}
      />
    );

    const addButton = screen.getByRole('button', { name: 'Add New' });
    addButton.click();

    expect(mockHandleAddCar).toHaveBeenCalled();
  });

});
