import React from 'react';
import { render } from '@testing-library/react';
import { GooglePlaces } from '../GooglePlaces';

describe('GooglePlaces', () => {
  test('renders correctly', () => {
    const props = {
      place: null,
      setPlace: jest.fn(),
      error: undefined,
      touched: undefined,
      handleOnBlur: jest.fn(),
      label: 'Location',
      defaultValue: null,
      isDisable: false,
      handlePlace: jest.fn(),
      dataTestId: 'google-places-input',
    };

    const { container } = render(<GooglePlaces {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
