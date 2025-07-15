// Placeholder for statistics component; you can expand it based on your API response
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText } from '@mui/material';

const UrlStatistics = ({ shortCode }) => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/shorturls/${shortCode}`);
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
        <List>
          <ListItem>
            <ListItemText primary={`Clicks: ${statistics.clicks}`} />
          </ListItem>
          {/* Add more statistics details as needed */}
        </List>
      ) : (
        <p>No statistics available.</p>
      )}
    </Container>
  );
};

export default UrlStatistics;