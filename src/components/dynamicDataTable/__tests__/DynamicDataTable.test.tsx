import React from 'react';
import { render, screen } from '@testing-library/react';
import { DynamicDataTable } from '../DynamicDataTable';

describe('DynamicDataTable', () => {
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
  ];
  const data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 40 },
  ];

  it('should render table heading', () => {
    const tableHeading = 'Test Table';
    render(
      <DynamicDataTable
        tableHeading={tableHeading}
        isSearchIconEnable={true}
        isFilterIconEnable={true}
        columns={columns}
        data={data}
        defaultItemsPerPage={5}
      />
    );
    expect(screen.getByText(tableHeading)).toBeInTheDocument();
  });

  it('should render table with data', () => {
    render(
      <DynamicDataTable
        tableHeading="Test Table"
        isSearchIconEnable={true}
        isFilterIconEnable={true}
        columns={columns}
        data={data}
        defaultItemsPerPage={5}
      />
    );
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(
      <DynamicDataTable
        tableHeading="Test Table"
        isSearchIconEnable={true}
        isFilterIconEnable={true}
        columns={columns}
        data={data}
        defaultItemsPerPage={5}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
