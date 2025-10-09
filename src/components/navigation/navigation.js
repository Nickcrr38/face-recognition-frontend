import React from 'react';
import './navigation.css';

const Navigation = ({ isSignedIn, onRouteChange }) => {
  return (
    <nav className="navigation">
      {isSignedIn && (
        <button
          className="signout-btn"
          onClick={() => onRouteChange('signout')}
        >
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navigation;







