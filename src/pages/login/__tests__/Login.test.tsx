import React from 'react';
import { render, fireEvent, getByTestId  } from '@testing-library/react';


import { Login } from '../Login';
import { BrowserRouter, Router } from 'react-router-dom';

describe('Login component', () => {

    it('renders the email and password input fields', () => {
        const setAuth = jest.fn();
        const passwordType = 'text';
        const handleOnSubmit = jest.fn();
        const handleInputChange = jest.fn();
        const handleCheckBoxClick = jest.fn();
    
        const { getByTestId } = render(
            <BrowserRouter><Login
            //setAuth={setAuth}
            passwordType={passwordType}
            handleOnSubmit={handleOnSubmit}
            handleInputChange={handleInputChange}
            //handleCheckBoxClick={handleCheckBoxClick}
          /></BrowserRouter>
        );
    
        const emailInput = getByTestId('input-field');
        const passwordInput = getByTestId('password');
    
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
      });
      it('updates the values of email and password when input values are changed', () => {
        const setAuth = jest.fn();
        const passwordType = 'text';
        const handleOnSubmit = jest.fn();
        const handleInputChange = jest.fn();
        const handleCheckBoxClick = jest.fn();
    
        const { getByTestId } = render(
            <BrowserRouter><Login
           // setAuth={setAuth}
            passwordType={passwordType}
            handleOnSubmit={handleOnSubmit}
            handleInputChange={handleInputChange}
           // handleCheckBoxClick={handleCheckBoxClick}
          /></BrowserRouter>
        );
    
        const emailInput = getByTestId('input-field') as HTMLFormElement;
        const passwordInput = getByTestId('password') as HTMLFormElement;
    
        fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
        expect(emailInput.value).toBe('test@email.com');
        expect(passwordInput.value).toBe('password123');
      });
    


  it('matches snapshot', () => {
    const setAuth = jest.fn();
    const passwordType = 'password';
    const handleOnSubmit = jest.fn();
    const handleInputChange = jest.fn();
    const handleCheckBoxClick = jest.fn();
  
    // Render the component and take a snapshot of the output
    const { container } = render(
        <BrowserRouter><Login
        //setAuth={setAuth}
        passwordType={passwordType}
        handleOnSubmit={handleOnSubmit}
        handleInputChange={handleInputChange}
       // handleCheckBoxClick={handleCheckBoxClick}
      /></BrowserRouter>
    );

    // Compare the output with the saved snapshot
    expect(container).toMatchSnapshot();
  });
});
