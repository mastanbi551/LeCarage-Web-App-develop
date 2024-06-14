import React from 'react';
import renderer from 'react-test-renderer';
import { ManageUserTypes } from '../manageUserTypes/ManageUserTypes';

describe('ManageUserTypes component', () => {
  const mockBackButtonHandler = jest.fn();
  const mockSaveOrUpdateButtonHandler = jest.fn();
  const mockHandleReset = jest.fn();

  const props = {
    backButtonHandler: mockBackButtonHandler,
    userTypeData: {
      userTypeId: '1',
      userType: 'Admin',
      description: 'Administrator',
      statusId: '1',
      features: [
        {
          featureId: '1',
          accessId: '1',
        },
      ],
    },
    statusDropDownData: [
      {
        label: 'Active',
        value: '1',
      },
    ],
    isDisable: true,
    featuresList: [
      {
        label: 'Feature 1',
        value: '1',
      },
    ],
    featureAccessList: [
      {
        label: 'Access 1',
        value: '1',
      },
    ],
    isEditable: true,
    isCreate: false,
    handleRadioButtonClick: jest.fn(),
    saveOrUpdateButtonHandler: mockSaveOrUpdateButtonHandler,
    selectedFeatureAccessList: [
      {
        accessId: '1',
        featureId: '1',
      },
    ],
    handleReset: mockHandleReset,
  };

  it('renders correctly', () => {
    const tree = renderer.create(<ManageUserTypes {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
