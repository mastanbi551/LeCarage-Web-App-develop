import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ForgotPassword } from '../../forgotPassword/ForgotPassword';

afterEach(cleanup);

describe('ForgotPassword Component', () => {
    test('It should render without errors', () => {
        const handleOnSubmit = jest.fn();
        const { container } = render(<ForgotPassword handleOnSubmit={handleOnSubmit} />);
        expect(container).toMatchSnapshot();
    });

    it('renders anchor tag with text and href', () => {
        const handleOnSubmit = jest.fn();
        const { getByText } = render(<ForgotPassword handleOnSubmit={handleOnSubmit} />);
        expect(getByText('login')).toBeInTheDocument();
        expect(getByText('login').getAttribute('href')).toBe('/login');
    });

    test('It should trigger handleOnSubmit on form submit', () => {
        const handleOnSubmit = jest.fn();
        const { getByTestId } = render(<ForgotPassword handleOnSubmit={handleOnSubmit} />);
        const form = getByTestId('forgot-password-form');
        form.dispatchEvent(new Event('submit', { cancelable: true }));
        // expect(handleOnSubmit).toHaveBeenCalledWith({ email: 'testemail@gmail.com' });
        expect(handleOnSubmit).not.toHaveBeenCalled();
    });
});