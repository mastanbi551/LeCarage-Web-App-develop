import React from 'react';
import { render } from '@testing-library/react';
import { CustomRadioButtonList } from '../CustomRadioButtonsList';

describe('CustomRadioButtonList', () => {
  it('renders correctly', () => {
    const props = {
      name: 'test',
      radioButtonList: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
      handleRadioButtonLClick: jest.fn(),
      values: [],
      feature: { value: 'test', label: 'Test' },
    };
    const { container } = render(<CustomRadioButtonList {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
