import React from 'react';
import { render } from '@testing-library/react';
import { ResetPassword } from '../../resetPassword/ResetPassword';

describe('ResetPassword', () => {
  const handleOnSubmit = jest.fn();
  const handleViewPassword = jest.fn();
  const handleViewConfirmPassword = jest.fn();
  const newPassword = '';
  const confirmPassword = '';

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <ResetPassword
        handleOnSubmit={handleOnSubmit}
        handleViewPassword={handleViewPassword}
        handleViewConfirmPassword={handleViewConfirmPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
      />
    );
    
    expect(asFragment()).toMatchSnapshot();
  });
});
