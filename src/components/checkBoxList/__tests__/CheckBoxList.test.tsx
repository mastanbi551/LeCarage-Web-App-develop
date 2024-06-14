import React from 'react';
import { render } from '@testing-library/react';
import { CheckBoxList } from '../CheckBoxList';

describe('CheckBoxList', () => {
  it('should match snapshot', () => {
    const checkBoxListItems = [
      { value: '1', label: 'Option 1', checked: true },
      { value: '2', label: 'Option 2', checked: false },
      { value: '3', label: 'Option 3', checked: true },
    ];

    const { container } = render(
      <CheckBoxList
        name="test-checkbox-list"
        onClick={jest.fn()}
        checkBoxListItems={checkBoxListItems}
        isDisable={false}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
