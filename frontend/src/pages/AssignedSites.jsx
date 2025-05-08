import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  CircularProgress,
  Avatar,
  Chip
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

// Color theme
const theme = {
  deepBlue: '#0a192f',
  lightBlue: '#172a45',
  brightBlue: '#64ffda',
  deepGreen: '#1b4332',
  lightGreen: '#40916c',
  white: '#e6f1ff'
};

// Mock data
const mockAssignments = [
  {
    id: 1,
    name: 'Corporate Headquarters',
    location: '123 Business Ave, New York, NY',
    date: '2023-12-15'
  },
  {
    id: 2,
    name: 'Tech Campus',
    location: '456 Innovation Blvd, San Francisco, CA',
    date: '2023-12-18'
  },
  {
    id: 3,
    name: 'Regional Office',
    location: '789 Commerce St, Chicago, IL',
    date: '2023-12-20'
  },
  {
    id: 4,
    name: 'Research Facility',
    location: '321 Science Park, Boston, MA',
    date: '2023-12-22'
  }
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.deepBlue,
  color: theme.white,
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  maxWidth: '800px',
  margin: '2rem auto'
}));

const SiteListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.lightBlue,
  margin: '0.5rem 0',
  borderRadius: '8px',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: `0 0 10px ${theme.brightBlue}`
  }
}));

function AssignedSites() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/api/employee/sites")
      .then(res => {
        if (res.data && res.data.length > 0) {
          setAssignments(res.data);
        } else {
          // If API returns empty array, use mock data
          setAssignments(mockAssignments);
          setUsingMockData(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        // If API fails, use mock data
        setAssignments(mockAssignments);
        setUsingMockData(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress sx={{ color: theme.brightBlue }} />
      </Box>
    );
  }

  return (
    <StyledPaper>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AssignmentIcon sx={{ fontSize: 40, color: theme.brightBlue, mr: 2 }} />
        <Typography variant="h4" component="h2" sx={{ color: theme.brightBlue }}>
          Your Assigned Sites
        </Typography>
      </Box>
      
      {usingMockData && (
        <Chip 
          label="Using sample data" 
          color="warning" 
          sx={{ mb: 2 }} 
          size="small"
        />
      )}
      
      <Divider sx={{ bgcolor: theme.lightGreen, mb: 3 }} />
      
      {assignments.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ py: 4 }}>
          No sites currently assigned to you.
        </Typography>
      ) : (
        <List>
          {assignments.map((site) => (
            <SiteListItem key={site.id}>
              <Avatar sx={{ bgcolor: theme.deepGreen, mr: 2 }}>
                {site.name.charAt(0).toUpperCase()}
              </Avatar>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{ color: theme.brightBlue }}>
                    {site.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <LocationIcon sx={{ fontSize: 16, color: theme.lightGreen, mr: 1 }} />
                      <Typography variant="body2" component="span" sx={{ color: theme.white }}>
                        {site.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <CalendarIcon sx={{ fontSize: 16, color: theme.lightGreen, mr: 1 }} />
                      <Typography variant="body2" component="span" sx={{ color: theme.white }}>
                        {new Date(site.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                  </>
                }
              />
              <Chip 
                label={`Assignment #${site.id}`} 
                sx={{ 
                  backgroundColor: theme.deepGreen, 
                  color: theme.white,
                  fontWeight: 'bold'
                }} 
              />
            </SiteListItem>
          ))}
        </List>
      )}
    </StyledPaper>
  );
}

export default AssignedSites;