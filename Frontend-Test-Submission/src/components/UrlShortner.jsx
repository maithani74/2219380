import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const UrlShortener = ({ onShortCodeCreated }) => {
  const [url, setUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [shortLink, setShortLink] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8090/shortUrls', {
        url,
        shortCode,
      });

      const link = response.data.shortLink;
      setShortLink(link);

      const code = link.split('/').pop();
      onShortCodeCreated(code); 
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  return (
    <Container>
      <h1>URL Shortener</h1>
      <TextField
        label="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
      />
      <TextField
        label="Custom Shortcode (optional)"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Shorten
      </Button>
      {shortLink && (
        <p>
          Your short link:{' '}
          <a href={shortLink} target="_blank" rel="noopener noreferrer">
            {shortLink}
          </a>
        </p>
      )}
    </Container>
  );
};

export default UrlShortener;
