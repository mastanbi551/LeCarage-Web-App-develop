import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from '../../../store/Store';
import { SideBar } from '../SideBar';

describe('SideBar', () => {
  it('should match snapshot', () => {
    const isAuthenticated = true;
    const setAuth = jest.fn();
    const children = <div>Test</div>;
    const component = render(
        <Provider store={Store}>
      <BrowserRouter>
        <SideBar isAuthenticated={isAuthenticated} setAuth={setAuth}>
          {children}
        </SideBar>
      </BrowserRouter></Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
