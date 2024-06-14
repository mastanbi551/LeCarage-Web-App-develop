import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { PageHeader } from '../PageHeader';

describe('PageHeader', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <PageHeader text='Test Header' name='header-name' />
        );

        const header = getByText('Test Header');
        expect(header).toBeInTheDocument();
    });

    it('renders back icon when passed', () => {
        const { getByTestId } = render(
            <PageHeader text='Test Header' name='header-name' backIcon={true} backIconOnClick={() => { }} />
        );

        const backIcon = getByTestId('back-icon');
        expect(backIcon).toBeInTheDocument();
    });

    it('calls back icon onClick function when clicked', () => {
        const mockOnClick = jest.fn();

        const { getByTestId } = render(
            <PageHeader text='Test Header' name='header-name' backIcon={true} backIconOnClick={mockOnClick} />
        );

        const backIcon = screen.getByTestId('back-icon');
        fireEvent.click(backIcon);

        expect(mockOnClick).toHaveBeenCalled();
    });

    it('renders button when passed', () => {
        const { getByText } = render(
            <PageHeader
                text='Test Header'
                name='header-name'
                isButtonDisable={true}
                buttonName='Test Button'
                buttonClassName='test-button'
                buttonOnclick={() => { }}
            />
        );

        const button = getByText('Test Button');
        expect(button).toBeInTheDocument();
    });

    it('calls button onClick function when clicked', () => {
        const mockOnClick = jest.fn();

        const { getByText } = render(
            <PageHeader
                text='Test Header'
                name='header-name'
                isButtonDisable={true}
                buttonName='Test Button'
                buttonClassName='test-button'
                buttonOnclick={mockOnClick}
            />
        );

        const button = getByText('Test Button');
        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalled();
    });
});
