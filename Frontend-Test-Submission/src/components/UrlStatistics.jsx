import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';

const UrlStatistics = ({ shortCode }) => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/shorturls/${shortCode}/stats`);
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    if (shortCode) fetchStatistics();
  }, [shortCode]);

  return (
    <Container>
      <h2>URL Statistics</h2>
      {statistics ? (
        <div>
          <p>Original URL: {statistics.originalUrl}</p>
          <p>Click Count: {statistics.clickCount}</p>
          <ul>
            {statistics.clickHistory.map((entry, index) => (
              <li key={index}>
                Clicked at: {new Date(entry.timestamp).toLocaleString()} - Referrer: {entry.referrer}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No statistics available.</p>
      )}
    </Container>
  );
};

export default UrlStatistics;