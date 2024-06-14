import React from 'react';
import { render } from '@testing-library/react';
import { CustomDropDown } from '../CustomDropDown';

describe('CustomDropDown', () => {
  it('should match snapshot', () => {
    const dropdownList = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];
    const { container } = render(
      <CustomDropDown
        name="dropdown"
        dropdownList={dropdownList}
        labelName="Dropdown List"
        defaultValue="option2"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
