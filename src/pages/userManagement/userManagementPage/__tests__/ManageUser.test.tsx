import React from 'react';
import { render } from '@testing-library/react';
import { ManageUser } from '../manageUser/ManageUser';

describe('ManageUser component', () => {
  const defaultProps = {
    backButtonHandler: jest.fn(),
    userData: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      photoURL: '',
      uId: '',
      userStatusId: '',
      userTypeId: '',
      password: '',
    },
    statusDropDownData: [],
    userTypesDropDownData: [],
    isDisable: false,
    isEditable: false,
    userDetailsCollapse: false,
    handleUserDetailsCollapse: jest.fn(),
    passwordType: 'password',
    handlePasswordTypeChange: jest.fn(),
    isCreate: true,
    saveOrUpdateButtonHandler: jest.fn(),
  };

  it('should match snapshot', () => {
    const { container } = render(<ManageUser {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
