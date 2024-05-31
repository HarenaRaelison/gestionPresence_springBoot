import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import cheerio from 'cheerio';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button'

function Attendance() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('id');

  const [data, setData] = useState([]);
  const [scannedResult, setScannedResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8080/api/student/take/niveau/${courseId}`);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchData();
  }, [courseId]);

  const transformUrl = (url) => {
    console.log('Original URL:', url); // Add this line for debugging
    const id = url.split('/')[3]
    return `https://me-qr.com/text/${id}`;

  };

  const handleScan = async (result) => {
    if (result && result[0].rawValue) {
      const scannedUrl = transformUrl(result[0].rawValue);
      setScannedResult(scannedUrl);
      console.log('Scanned URL:', scannedUrl);
      try {
        const pageResponse = await axios.get(scannedUrl);
        const $ = cheerio.load(pageResponse.data);
        
        const id = $('body').text().trim().split("\n")[0];
        console.log('Extracted ID:', id);
  
        const res = await axios.put(`http://127.0.0.1:8080/api/student/update/status/${id}`, true, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log('Student status updated:', res.data);
        
        const updatedStudents = data.map(student => student.id === id ? { ...student, status: true } : student);
        setData(updatedStudents);
      } catch (error) {
        console.error('Error fetching or parsing the page:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('No rawValue found in scanned result:', result);
    }
  };

  const handleError = (error) => {
    console.error('QR scan error:', error);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Student Attendance</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Scan QR Code</Typography>
          <Paper sx={{ padding: 2 }}>
            <Scanner
              onScan={(result) => {
                if (result) handleScan(result);
              }}
              onError={handleError}
              style={{ width: '100%' }}
            />
            {scannedResult && (
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Scanned Result: {scannedResult}
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Student List</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="h6">Name</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6">Firstname</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6">Niveau</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6">Adresse</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6">Date Naiss</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6">Numero Tel</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((student) => (
                  <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1">{student.name}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">{student.firstname}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">{student.niveau}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">{student.adresse}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">{student.dateNaiss}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">{student.numeroTel}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Button variant="contained"></Button>

    </Box>
  );
}

export default Attendance;
