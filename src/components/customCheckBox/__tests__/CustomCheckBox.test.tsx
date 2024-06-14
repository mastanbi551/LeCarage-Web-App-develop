/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CustomCheckBox } from '../CustomCheckBox';

describe('CheckBox component', () => {
  it('should render the component', () => {
    const { getByTestId } = render(<CustomCheckBox onClick={() => { }} name="test" checkBoxText="test text" />);
    const checkbox = getByTestId('my-checkbox');
    const checkboxText = getByTestId('my-div');
    expect(checkbox).toBeInTheDocument();
    expect(checkboxText).toBeInTheDocument();
    expect(checkboxText.textContent).toBe('test text');
  });
});
