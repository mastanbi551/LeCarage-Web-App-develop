import React from 'react';
import { render } from '@testing-library/react';
import { SearchableDropdown } from '../SearchableDropdown';

describe('SearchableDropdown', () => {
  test('renders correctly', () => {
    const props = {
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
      labelName: 'Dropdown',
      handleChange: jest.fn(),
      handleSelectChange: jest.fn(),
      handleBlur: jest.fn(),
      error: undefined,
      touched: undefined,
      name: 'dropdown',
      isDisable: false,
      defaultValue: 'option2',
      onFocus: jest.fn(),
    };

    const { container } = render(<SearchableDropdown {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
