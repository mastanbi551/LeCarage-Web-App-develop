import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BookingsManagementPage } from '../BookingsManagementPage';

describe('BookingsManagementPage', () => {
  const handleAddBooking = jest.fn();
  const onViewHandler = jest.fn();
  const onEditHandler = jest.fn();
  const onDeleteHandler = jest.fn();
  const columns = [
    { Header: 'Column 1', accessor: 'column1' },
    { Header: 'Column 2', accessor: 'column2' },
  ];
  const bookings = [
    { column1: 'Value 1', column2: 'Value 2' },
    { column1: 'Value 3', column2: 'Value 4' },
  ];

  
it('renders the component', () => {
  render(
    <BookingsManagementPage
      handleAddbooking={handleAddBooking}
      columns={columns}
      searchValue={[]}
      onViewHandler={onViewHandler}
      onEditHandler={onEditHandler}
      onDeleteHandler={onDeleteHandler}
      bookings={bookings}
      errorMessage=""
      filterValues={[]}
      access=""
      rowsPerPageValueChange={() => {}}
      itemsPerPage={10}
    />
  );

  // Assert that the component is rendered without errors
  // You can add more specific assertions based on your requirements
  expect(screen.getByText('Bookings')).toBeInTheDocument();
  expect(screen.getByText('Add Booking')).toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();
});

  it('calls handleAddbooking when the "Add Booking" button is clicked', () => {
    render(
      <BookingsManagementPage
        handleAddbooking={handleAddBooking}
        columns={columns}
        searchValue={[]}
        onViewHandler={onViewHandler}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
        bookings={bookings}
        errorMessage=""
        filterValues={[]}
        access=""
        rowsPerPageValueChange={() => {}}
        itemsPerPage={10}
      />
    );

    // Simulate a click on the "Add Booking" button
    fireEvent.click(screen.getByText('Add Booking'));

    // Assert that the handleAddbooking function is called
    expect(handleAddBooking).toHaveBeenCalled();
  });

  // Add more test cases as needed for other interactions and behaviors
});
