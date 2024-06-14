import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CustomButton } from '../CustomButton';

describe('CustomButton component', () => {
  it('should render the component', () => {
    const { getByText } = render(<CustomButton title="test button" name="test" />);
    const button = getByText('test button');
    expect(button).toBeInTheDocument();
    expect(button.className).toBe('test');
  });

  it('should call buttonOnClick when button is clicked', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <CustomButton title="test button" name="test" buttonOnClick={mockOnClick} />
    );
    const button = getByText('test button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

//   it('should be disabled if isDisable is true', () => {
//     const { getByText } = render(
//       <CustomButton title="test button" name="test" isDisable={true} />
//     );
//     const button = getByText('test button');
//     expect(button.disabled).toBe(true);
//   });

//   it('should not be disabled if isDisable is false', () => {
//     const { getByText } = render(
//       <CustomButton title="test button" name="test" isDisable={false} />
//     );
//     const button = getByText('test button');
//     expect(button.disabled).toBe(false);
//   });
});
