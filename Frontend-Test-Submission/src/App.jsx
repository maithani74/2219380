import React, { useState } from 'react';
import UrlShortener from './components/UrlShortner.jsx';
import UrlStatistics from './components/UrlStatistics.jsx';

function App() {
  const [shortCode, setShortCode] = useState('');

  return (
    <div>
      <UrlShortener onShortCodeCreated={setShortCode} />
      <UrlStatistics shortCode={shortCode} />
    </div>
  );
}

export default App;
