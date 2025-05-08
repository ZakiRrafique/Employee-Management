import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  CircularProgress,
  Chip
} from '@mui/material';
import { AccountBalanceWallet as PaymentIcon } from '@mui/icons-material';

// Color theme
const theme = {
  deepBlue: '#0a192f',
  lightBlue: '#172a45',
  brightBlue: '#64ffda',
  deepGreen: '#1b4332',
  lightGreen: '#40916c',
  white: '#e6f1ff'
};

// Dummy data
const dummyPayments = [
  {
    id: 1,
    site: 'Corporate Headquarters',
    hours: 40,
    amount: 1200,
    status: 'Paid',
    date: '2023-11-30'
  },
  {
    id: 2,
    site: 'Tech Campus',
    hours: 35,
    amount: 1050,
    status: 'Paid',
    date: '2023-12-15'
  },
  {
    id: 3,
    site: 'Regional Office',
    hours: 42,
    amount: 1260,
    status: 'Pending',
    date: '2023-12-31'
  },
  {
    id: 4,
    site: 'Research Facility',
    hours: 38,
    amount: 1140,
    status: 'Processing',
    date: '2024-01-15'
  }
];

function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/api/employee/payments")
      .then(res => {
        if (res.data && res.data.length > 0) {
          setPayments(res.data);
        } else {
          setPayments(dummyPayments);
          setUsingMockData(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPayments(dummyPayments);
        setUsingMockData(true);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      default:
        return 'primary';
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <CircularProgress style={{ color: theme.brightBlue }} />
      </div>
    );
  }

  return (
    <Paper elevation={3} style={{ 
      backgroundColor: theme.deepBlue, 
      color: theme.white,
      padding: '2rem',
      borderRadius: '10px',
      margin: '1rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <PaymentIcon style={{ fontSize: 40, color: theme.brightBlue, marginRight: '1rem' }} />
        <Typography variant="h4" style={{ color: theme.brightBlue }}>
          My Payments
        </Typography>
      </div>

      {usingMockData && (
        <Chip 
          label="Using sample data" 
          color="warning" 
          size="small" 
          style={{ marginBottom: '1rem' }}
        />
      )}

      <div style={{ 
        height: '2px', 
        backgroundColor: theme.lightGreen, 
        marginBottom: '1.5rem' 
      }} />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: theme.lightBlue }}>
              <TableCell style={{ color: theme.brightBlue, fontWeight: 'bold' }}>Site</TableCell>
              <TableCell style={{ color: theme.brightBlue, fontWeight: 'bold' }}>Hours</TableCell>
              <TableCell style={{ color: theme.brightBlue, fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell style={{ color: theme.brightBlue, fontWeight: 'bold' }}>Status</TableCell>
              <TableCell style={{ color: theme.brightBlue, fontWeight: 'bold' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((pay) => (
              <TableRow 
                key={pay.id} 
                hover 
                style={{ 
                  backgroundColor: theme.lightBlue,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: `0 0 10px ${theme.brightBlue}`
                  }
                }}
              >
                <TableCell style={{ color: theme.white }}>{pay.site}</TableCell>
                <TableCell style={{ color: theme.white }}>{pay.hours}</TableCell>
                <TableCell style={{ color: theme.white, fontWeight: 'bold' }}>£{pay.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip 
                    label={pay.status} 
                    color={getStatusColor(pay.status)}
                    style={{ 
                      fontWeight: 'bold',
                      color: theme.white
                    }}
                  />
                </TableCell>
                <TableCell style={{ color: theme.white }}>
                  {new Date(pay.date).toLocaleDateString('en-GB')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {payments.length === 0 && (
        <Typography 
          variant="body1" 
          align="center" 
          style={{ padding: '2rem', color: theme.white }}
        >
          No payment records found.
        </Typography>
      )}
    </Paper>
  );
}

export default MyPayments;