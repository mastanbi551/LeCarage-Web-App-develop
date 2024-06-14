import React from 'react';
import renderer from 'react-test-renderer';
import { Dashboard } from '../Dashboard';

describe('Dashboard component', () => {
  it('renders the Loader when loading is true', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the Dashboard content when loading is false', () => {
    const tree = renderer.create(<Dashboard />);

    setTimeout(() => {
      expect(tree.toJSON()).toMatchSnapshot();
    }, 2000);
  });
});
