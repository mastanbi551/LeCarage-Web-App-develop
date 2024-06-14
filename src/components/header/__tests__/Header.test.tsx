import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Header } from '../Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from '../../../store/Store';

afterEach(cleanup);

const setAuth = jest.fn();

describe('Header component', () => {
  it('Header component should match snapshot', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    const parseJSON = jest.fn().mockReturnValue(user);
    global.JSON.parse = parseJSON;
    const { container } = render(
      <Provider store={Store}>
        <BrowserRouter>
          <Header setAuth={setAuth} />
        </BrowserRouter>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the component and display all elements', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    const parseJSON = jest.fn().mockReturnValue(user);
    global.JSON.parse = parseJSON;
    render(
      <Provider store={Store}>
        <BrowserRouter>
          <Header setAuth={setAuth} />
        </BrowserRouter>
      </Provider>
    );
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
    const notificationIconElement = screen.getByTestId('bsbell');
    expect(notificationIconElement).toBeInTheDocument();
    const dropdownToggleElement = screen.getByText('My Profile');
    expect(dropdownToggleElement).toBeInTheDocument();
    const logoutElement = screen.getByText('LogOut');
    expect(logoutElement).toBeInTheDocument();
  });
});
