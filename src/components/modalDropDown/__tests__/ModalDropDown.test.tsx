import React from 'react';
import { ModalDropDown } from '../ModalDropDown';
import { render, fireEvent } from '@testing-library/react';

describe('ModalDropDown component', () => {
  const profileInfo = [
    {
      userType: 'Admin',
      warehouseLocation: 'Toronto'
    },
    {
      userType: 'User',
      warehouseLocation: 'Toronto'
    },
    {
      userType: 'Manager',
      warehouseLocation: 'Vancouver'
    }
  ];
  const warehousesInfo = ['Toronto', 'Vancouver'];

  it('should render correctly', () => {
    const { container } = render(
      <ModalDropDown
        showModal={true}
        onModalToggle={jest.fn()}
        profileInfo={profileInfo}
        warehousesInfo={warehousesInfo}
        handleUserProfile={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onModalToggle when close button is clicked', () => {
    const onModalToggle = jest.fn();
    const { getByText } = render(
      <ModalDropDown
        showModal={true}
        onModalToggle={onModalToggle}
        profileInfo={profileInfo}
        warehousesInfo={warehousesInfo}
        handleUserProfile={jest.fn()}
      />
    );
    fireEvent.click(getByText('Close'));
    expect(onModalToggle).toHaveBeenCalled();
  });
});
