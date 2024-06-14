import React from 'react';
import { render } from '@testing-library/react';
import { Home } from '../Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
