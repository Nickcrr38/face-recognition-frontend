import React, { useState } from 'react';
import Navigation from './components/navigation/navigation';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';
import Logo from './components/logo/Logo';
import ImageUploadForm from './components/imagelinkform/ImageUploadForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import ParticlesBg from './components/particlesbg/particlesbg';
import './App.css'; 

function App() {
  const [imageSrc, setImageSrc] = useState(''); // Base64
  const [boxes, setBoxes] = useState([]);
  const [status, setStatus] = useState('');
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({ name: 'Guest', entries: 0 });

  const backend = process.env.REACT_APP_BACKEND_URL;

  // Load user data
  const loadUser = (data) => setUser(data);

  // Handle file upload
  const onFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);

      // Increment entries locally
      setUser((prev) => ({ ...prev, entries: prev.entries + 1 }));

      // Optional: also update backend
      fetch(`${backend}/image`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id }),
      })
        .then(res => res.json())
        .then(updatedUser => {
          if (updatedUser.id) setUser(updatedUser);
        })
        .catch(console.error);
    };
    reader.readAsDataURL(file);

    // Clear previous boxes
    setBoxes([]);
  };

  // Route change
  const onRouteChange = (newRoute) => {
    if (newRoute === 'signout') {
      setIsSignedIn(false);
      setUser({ name: 'Guest', entries: 0 });
      setImageSrc('');
      setBoxes([]);
      setStatus('');
    } else if (newRoute === 'home') {
      setIsSignedIn(true);
    }
    setRoute(newRoute);
  };

  return (
    <div className="App">
      <ParticlesBg />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      <Logo />

      {route === 'home' ? (
        <div className="home-container">
          <Rank name={user.name} entries={user.entries} />
          <ImageUploadForm onFileUpload={onFileUpload} />
          <p className="status">{status}</p>
          <FaceRecognition
            imageSrc={imageSrc}
            boxes={boxes}
            setBoxes={setBoxes}
            setStatus={setStatus}
          />
        </div>
      ) : route === 'signin' ? (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} backend={backend} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} backend={backend} />
      )}
    </div>
  );
}

export default App;
