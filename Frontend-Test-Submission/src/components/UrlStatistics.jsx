import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from '@mui/material';

const UrlStatistics = ({ shortCode }) => {
  const [statistics, setStatistics] = useState(null);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/shorturls/${shortCode}/stats`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  useEffect(() => {
    if (shortCode) fetchStatistics();
  }, [shortCode]);

  return (
    <Container style={{ marginTop: '30px' }}>
      <h2>URL Statistics</h2>
      <Button variant="outlined" onClick={fetchStatistics}>🔄 Refresh</Button>
      {statistics ? (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Original URL:</strong> {statistics.originalUrl}</p>
          <p><strong>Click Count:</strong> {statistics.clickCount}</p>

          <h4>Click History:</h4>
          {statistics.clickHistory.length > 0 ? (
            <ul>
              {statistics.clickHistory.map((entry, index) => (
                <li key={index}>
                  <strong>Clicked at:</strong> {new Date(entry.timestamp).toLocaleString()}<br />
                  <strong>Referrer:</strong> {entry.referrer}
                </li>
              ))}
            </ul>
          ) : (
            <p>No click history yet.</p>
          )}
        </div>
      ) : (
        <p>No statistics available.</p>
      )}
    </Container>
  );
};

export default UrlStatistics;
