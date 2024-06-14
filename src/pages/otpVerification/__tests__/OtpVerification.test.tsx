import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { OtpVerification } from '../../otpVerification/OtpVerification';

describe('OtpVerification component', () => {
  const handleOnSubmit = jest.fn();

  it('matches the snapshot', () => {
    const { container } = render(<OtpVerification handleOnSubmit={handleOnSubmit} />);
    expect(container).toMatchSnapshot();
  });

  it('submits the form with the entered OTP', () => {
    const { getByTestId } = render(<OtpVerification handleOnSubmit={handleOnSubmit} />);
    const otpInput = getByTestId('otp-input');
    const submitButton = getByTestId('submit-button');
  
    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);
  
   
    expect(handleOnSubmit).toHaveBeenCalled;
  });
  
});
