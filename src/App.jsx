import React, { useState, useEffect } from 'react';
import Root from './assets/pages/Root';
import { ReactTyped } from 'react-typed';
import Contexts from './Contexts/Contexts';
import './App.css';

const LARGE_SCREEN_BREAKPOINT = 250;

const App = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= LARGE_SCREEN_BREAKPOINT);

  useEffect(() => {
    // Define a function to check the screen width
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= LARGE_SCREEN_BREAKPOINT);
    };

    // Add an event listener to update screen size on window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app-container">
      {isLargeScreen ? (
        <Contexts>
          <Root />
        </Contexts>
      ) : (
        <div className="message-container h-dvh flex justify-center items-center text-xl">
          <ReactTyped
            strings={['Please switch to a larger screen to view this content.', 'Small screens are not supported.']}
            typeSpeed={50}
          />
        </div>
      )}
    </div>
  );
};

export default App;
