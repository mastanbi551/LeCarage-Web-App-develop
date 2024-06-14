import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className='not-found-container'>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);
