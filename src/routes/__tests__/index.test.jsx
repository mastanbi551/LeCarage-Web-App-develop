import { render, screen } from '@testing-library/react';
import { index } from '../index';

describe('Index', () => {
  it('renders the SideBar component when authenticated', () => {
    render(<index setAuth={() => {}} isAuthenticated={true} data-testid='sidebar'/>);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('renders the Home component when not authenticated', () => {
    render(<index setAuth={() => {}} isAuthenticated={false} data-testid='home'/>);
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});
