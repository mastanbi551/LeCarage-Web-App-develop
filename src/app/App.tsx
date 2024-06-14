import React, {useState, useEffect} from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Index } from '../routes';
import { Store } from '../store/Store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  const isAuthenticatedUser = localStorage.getItem('isAuthenticate');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userJsonData = isAuthenticatedUser && JSON.parse(isAuthenticatedUser);

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  useEffect(() => {
    if(userJsonData && userJsonData.isAuthenticate === true)
      setAuth(true);      
  }, [isAuthenticatedUser]);

  return ( 
    <div className='App'>
      <Provider store={Store}>
      <BrowserRouter>
        <Index setAuth={setAuth} isAuthenticated={isAuthenticated}/>
        <ToastContainer />
      </BrowserRouter>    
      </Provider>  
    </div>
  );
}

export default App;
