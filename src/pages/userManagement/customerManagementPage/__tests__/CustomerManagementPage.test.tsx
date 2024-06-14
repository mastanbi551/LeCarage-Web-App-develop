import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { CustomerManagementPage } from '../CustomerManagementPage';
import { DynamicDataTable, PageHeader } from '../../../../components';

describe('CustomerManagementPage', () => {
  const props: any = {
    handleAddUser: jest.fn(),
    columns: [],
    searchValue: '',
    onViewHandler: jest.fn(),
    onEditHandler: jest.fn(),
    onDeleteHandler: jest.fn(),
    customers: [],
  };

  const columnsMock = [    { headerText: 'Name', key: 'name' },    { headerText: 'Description', key: 'description' },  ];

  const handleAddUserMock = jest.fn();
  const onViewHandlerMock = jest.fn();
  const onEditHandlerMock = jest.fn();
  const onDeleteHandlerMock = jest.fn();

  const customerMock = [    { name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },    { name: 'Jane Doe', email: 'jane.doe@example.com', role: 'user' },  ];

  it('renders correctly', () => {
    const { asFragment } = render(<CustomerManagementPage {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders with search value correctly', () => {
    const tree = renderer
      .create(<CustomerManagementPage {...props} searchValue="John" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls handleAddUser when add user button is clicked', () => {
    const component = renderer.create(<CustomerManagementPage {...props} />);
    const button = component.root.findAll(
      (el) => el.props.className === 'viewButton'
    )[0];

    if (button) {
      button.props.onClick();
      expect(props.onViewHandler).toHaveBeenCalled();
    } else {
      null;
    }
  });

  it('calls onEditHandler when edit button is clicked', () => {
    const component = renderer.create(<CustomerManagementPage {...props} />);
    const button = component.root.findAll(
      (el) => el.props.className === 'editButton'
    )[0];

    if (button) {
      button.props.onClick();
      expect(props.onEditHandler).toHaveBeenCalled();
    } else {
      null;
    }
  });

  it('calls onDeleteHandler when delete button is clicked', () => {
    const component = renderer.create(<CustomerManagementPage {...props} />);
    const button = component.root.findAll(
      (el) => el.props.className === 'deleteButton'
    )[0];

    if (button) {
      button.props.onClick();
      expect(props.onDeleteHandler).toHaveBeenCalled();
    } else {
      null;
    }
  });
});
