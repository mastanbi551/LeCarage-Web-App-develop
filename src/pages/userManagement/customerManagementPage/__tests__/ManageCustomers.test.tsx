import React from 'react';
import { render } from '@testing-library/react';
import { ManageCustomers } from '../manageCustomers/ManageCustomers';

describe('ManageCustomers component', () => {
  const mockProps = {
    backButtonHandler: jest.fn(),
    statusDropDownData: [{ label: 'Active', value: 'active' }],
    isDisable: false,
    isEditable: true,
    handleUserDetailsCollapse: jest.fn(),
    handleCarsDetailsCollapse: jest.fn(),
    handlePaymentDetailsCollapse: jest.fn(),
    userDetailsCollapse: false,
    carsDetailsCollapse: false,
    paymentDetailsCollapse: false,
    saveUpdateButtonHandler: jest.fn(),
    passwordType: 'password',
    handlePasswordTypeChange: jest.fn(),
    customerData: {
      uId: '1',
      profile: {
        email: 'test@example.com',
        phoneNumber: '1234567890',
        password: 'test123',
        firstName: 'Test',
        lastName: 'User',
        statusId: 'active',
      },
      address: [
        {
          addressLineOne: '123 Main St',
          streetName: 'Main St',
          houseNumber: '123',
          postalCode: '12345',
          cityName: 'Anytown',
        },
      ],
      carDetails: [
        {
          carId: '1',
        },
      ],
    },
    isCreate: false,
    handleModalClose: jest.fn(),
    handleModalOpen: jest.fn(),
    modalShow: false,
    unlinkedCars: [],
    linkedCars: [],
    checkedCars: [],
    handleCheckedCars: jest.fn(),
    handleEditPageCheckedCars: jest.fn(),
    handleSave: jest.fn(),
    handleReset: jest.fn(),
    tempEditCheckedCars: [],
    editCheckedCars: [],
  };

  it('should render correctly', () => {
    const { container } = render(<ManageCustomers {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
