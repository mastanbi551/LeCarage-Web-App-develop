import React from 'react';
import { render, screen } from '@testing-library/react';
import UserManagementPage from '../UserManagementPage';

describe('UserManagementPage', () => {
  const handleAddUserMock = jest.fn();
  const onViewHandlerMock = jest.fn();
  const onEditHandlerMock = jest.fn();
  const onDeleteHandlerMock = jest.fn();


  const columns = [
    
    { Header: 'User Type', accessor: 'User Type' },
    { Header: 'First Name', accessor: 'First Names' },
    { Header: 'Last Name', accessor: 'Last Name' },
    { Header: 'Email Address', accessor: 'Email Address' },
    { Header: 'CellPhone Number', accessor: 'CellPhone Number' },
    { Header: 'Status', accessor: 'Status' },
  ];

  const users = [
    {
      'CellPhone Number': '1234567890',
      'Email Address': 'testnew@example.com',
      'First Name': 'Doe',
      'Last Name': 'John',
      'Status': 'Active',
      'User Id': 'doejohn123',
      'User Type': 'Regular',
      'Receptionist': 'Yes',
      'Prathima':'prat'
    },
    {
      'CellPhone Number': '123-456-7890',
      'Email Address': 'test@example.com',
      'First Name': 'John',
      'Last Name': 'Doe',
      'Status': 'Inactive',
      'User Id': 'johndoe123',
      'User Type': 'Regular',
      'Receptionist': 'Yes',
      'Prathima':'Pti'
    }
  ];

  const searchValue = ['Admin'];
  const filterValues = [{ mainMenu: 'Filter', subMenus: ['Admin'] }];
  const errorMessage = 'Error message';

  it('should match the snapshot', () => {
    const { container } = render(
      <UserManagementPage
        handleAddUser={handleAddUserMock}
        columns={columns}
        searchValue={searchValue}
        onViewHandler={onViewHandlerMock}
        onEditHandler={onEditHandlerMock}
        onDeleteHandler={onDeleteHandlerMock}
        users={users}
        filterValues={filterValues}
        errorMessage={errorMessage}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should call handleAddUsertype when Add New button is clicked', () => {
    render(
      <UserManagementPage
        handleAddUser={handleAddUserMock}
        columns={columns}
        searchValue={searchValue}
        onViewHandler={onViewHandlerMock}
        onEditHandler={onEditHandlerMock}
        onDeleteHandler={onDeleteHandlerMock}
        users={users}
        filterValues={filterValues}
        errorMessage={errorMessage}
      />
    );

    const addButton = screen.getByRole('button', { name: 'Add New' });
    addButton.click();

    expect(handleAddUserMock).toHaveBeenCalled();
  });

 

});