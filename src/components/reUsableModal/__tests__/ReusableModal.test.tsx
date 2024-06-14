import React from 'react';
import { render } from '@testing-library/react';
import ReusableModal from '../ReusableModal';

describe('ReusableModal', () => {
  it('renders correctly with header and body', () => {
    const props = {
      isOpen: true,
      toggle: jest.fn(),
      header: 'Test Header',
      children: <p>Test Body</p>,
    };
    const { container } = render(<ReusableModal {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with header, body and footer', () => {
    const props = {
      isOpen: true,
      toggle: jest.fn(),
      header: 'Test Header',
      children: <p>Test Body</p>,
      footer: <button>Test Footer</button>,
    };
    const { container } = render(<ReusableModal {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('does not render footer when it is not provided', () => {
    const props = {
      isOpen: true,
      toggle: jest.fn(),
      header: 'Test Header',
      children: <p>Test Body</p>,
    };
    const { container } = render(<ReusableModal {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
