import React from 'react';
import { render, screen } from '@testing-library/react';
import UserTypeManagementPage from '../UserTypeManagementPage';

describe('UserTypeManagementPage', () => {
  const handleAddUsertypeMock = jest.fn();
  const onViewHandlerMock = jest.fn();
  const onEditHandlerMock = jest.fn();
  const onDeleteHandlerMock = jest.fn();

  const columns = [
    { Header: 'User Type ID', accessor: 'User Type ID' },
    { Header: 'User Type', accessor: 'User Type' },
    { Header: 'Description', accessor: 'Description' },
    { Header: 'Status', accessor: 'Status' },
  ];

  const userTypesInfo = [
    {
      'User Type ID': '1',
      'User Type': 'Admin',
      Description: 'Admin User Type',
      Status: 'Active',
    },
    {
      'User Type ID': '2',
      'User Type': 'User',
      Description: 'User User Type',
      Status: 'Inactive',
    },
  ];

  const searchValue = ['Admin'];
  const filterValues = [{ mainMenu: 'Filter', subMenus: ['Admin'] }];
  const errorMessage = 'Error message';

  it('should match the snapshot', () => {
    const { container } = render(
      <UserTypeManagementPage
        handleAddUsertype={handleAddUsertypeMock}
        columns={columns}
        searchValue={searchValue}
        onViewHandler={onViewHandlerMock}
        onEditHandler={onEditHandlerMock}
        onDeleteHandler={onDeleteHandlerMock}
        userTypesInfo={userTypesInfo}
        filterValues={filterValues}
        errorMessage={errorMessage}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should call handleAddUsertype when Add New button is clicked', () => {
    render(
      <UserTypeManagementPage
        handleAddUsertype={handleAddUsertypeMock}
        columns={columns}
        searchValue={searchValue}
        onViewHandler={onViewHandlerMock}
        onEditHandler={onEditHandlerMock}
        onDeleteHandler={onDeleteHandlerMock}
        userTypesInfo={userTypesInfo}
        filterValues={filterValues}
        errorMessage={errorMessage}
      />
    );

    const addButton = screen.getByRole('button', { name: 'Add New' });
    addButton.click();

    expect(handleAddUsertypeMock).toHaveBeenCalled();
  });

 

});