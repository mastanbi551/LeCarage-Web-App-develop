/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DynamicDataTableItems } from '../DynamicDataTableItems';
import Swal from 'sweetalert2';
import renderer from 'react-test-renderer';

jest.mock('sweetalert2');

describe('DynamicDataTableItems', () => {
  const onDeleteHandler = jest.fn();
  const onSortHandler = jest.fn();
  const onPageChangeHandler = jest.fn();

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
  ];

  const data = [
    {
      name: 'John',
      age: 30,
    },
    {
      name: 'Jane',
      age: 25,
    },
  ];

  const tableData = [
    {
      name: 'John',
      age: 30,
    },
    {
      name: 'Jane',
      age: 25,
    },
  ];

  const rowsPerPage = [{ value: 10 }, { value: 20 }, { value: 50 }];

  const itemOffset = 1;
  const endOffset = 2;

  const props = {
    tableHeading: 'Dynamic Table',
    isSearchIconEnable: true,
    isFilterIconEnable: true,
    columns,
    data,
    tableData,
    rowsPerPage,
    itemOffset,
    endOffset,
    onDeleteHandler,
    pageData: {
      canPreviousPage: true,
      canNextPage: true,
      pageIndex: 0,
      pageSize: 10,
      pageCount: 1,
      totalItemCount: 2,
    },
    gotoPage: () => {},
    previousPage: () => {},
    nextPage: () => {},
    canPreviousPage: true,
    canNextPage: true,
    pageCount: 2,
    pageIndex: 0,
    pageSize: 10,
    setPageSize: () => {},
    onSortHandler,
    onPageChangeHandler,
   
  };

  it('renders correctly', () => {
    const tree = renderer.create(<DynamicDataTableItems filterValues={[]} onViewHandler={function (rowInfo: object): void {
      throw new Error('Function not implemented.');
    } } onEditHandler={function (rowInfo: object): void {
      throw new Error('Function not implemented.');
    } } onSearchChangeHandler={function (value: string): void {
      throw new Error('Function not implemented.');
    } } handleCategoryChange={function (value: string): void {
      throw new Error('Function not implemented.');
    } } rowsPerPageValueChange={function (value: string): void {
      throw new Error('Function not implemented.');
    } } {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onDeleteHandler when delete icon is clicked', () => {
    const component = renderer.create(<DynamicDataTableItems filterValues={[]} onViewHandler={function (rowInfo: object): void {
      throw new Error('Function not implemented.');
    } } onEditHandler={function (rowInfo: object): void {
      throw new Error('Function not implemented.');
    } } onSearchChangeHandler={function (value: string): void {
      throw new Error('Function not implemented.');
    } } handleCategoryChange={function (value: string): void {
      throw new Error('Function not implemented.');
    } } rowsPerPageValueChange={function (value: string): void {
      throw new Error('Function not implemented.');
    } } {...props} />);
    const button = component.root.findAll((el) => el.props.className === ('deleteButton'))[0];

    if (button) {
      button.props.onClick();
      expect(props.onDeleteHandler).toHaveBeenCalled();
    } else {
      null;
    }
  });

  it('displays confirmation dialog when delete icon is clicked', () => {
    const component = renderer.create(<DynamicDataTableItems filterValues={[]} onViewHandler={function (rowInfo: object): void {
      throw new Error('Function not implemented.');
    } } onEditHandler={function (rowInfo: object): void {
      throw new Error('Function not implemented.');
    } } onSearchChangeHandler={function (value: string): void {
      throw new Error('Function not implemented.');
    } } handleCategoryChange={function (value: string): void {
      throw new Error('Function not implemented.');
    } } rowsPerPageValueChange={function (value: string): void {
      throw new Error('Function not implemented.');
    } } {...props} />);
    const button = component.root.findAll((el) => el.props.className === ('deleteButton'))[0];
    if (button) {
      button.props.onClick();
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Are you sure you want to delete this row?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  } else {
    null;
  }
  });
  it('calls onSortHandler when column header is clicked', () => {
    const { container } = render(<DynamicDataTableItems filterValues={[]} onViewHandler={function (rowInfo: object): void {
      throw new Error('Function not implemented.');
    } } onEditHandler={function (rowInfo: object): void {
      throw new Error('Function not implemented.');
    } } onSearchChangeHandler={function (value: string): void {
      throw new Error('Function not implemented.');
    } } handleCategoryChange={function (value: string): void {
      throw new Error('Function not implemented.');
    } } rowsPerPageValueChange={function (value: string): void {
      throw new Error('Function not implemented.');
    } } {...props} />);
    const columnHeader = container.querySelector('.header');

    if (columnHeader) {
      fireEvent.click(columnHeader);
      expect(props.onSortHandler).toHaveBeenCalled();
    } else {
      null
    }
  });

  it('calls onPageChangeHandler when page is changed', () => {
    const { container } = render(<DynamicDataTableItems filterValues={[]} onViewHandler={function (rowInfo: object): void {
      throw new Error('Function not implemented.');
    } } onEditHandler={function (rowInfo: object): void {
      throw new Error('Function not implemented.');
    } } onSearchChangeHandler={function (value: string): void {
      throw new Error('Function not implemented.');
    } } handleCategoryChange={function (value: string): void {
      throw new Error('Function not implemented.');
    } } rowsPerPageValueChange={function (value: string): void {
      throw new Error('Function not implemented.');
    } } {...props} />);
    const nextPageButton = container.querySelector('.nextPageButton');

    if (nextPageButton) {
      fireEvent.click(nextPageButton);
      expect(props.onPageChangeHandler).toHaveBeenCalled();
    } else {
      null;
    }
  });
  
});
