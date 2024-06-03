import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import jspdf-autotable
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Attendance() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('id');

  const [data, setData] = useState([]);
  const [scannedResult, setScannedResult] = useState('');
  const [message, setMessage] = useState('');

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

  const handleScan = async (result) => {
    if (result) {
      const id = result[0].rawValue;
      
      console.log('Scanned URL:', id);
      try {
        const res = await axios.put(`http://127.0.0.1:8080/api/student/update/status/${id}`, true, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log('Student status updated:', res.data);
        
        const updatedStudents = data.map(student => student.id === id ? { ...student, status: true } : student);
        setData(updatedStudents);
        setScannedResult(id);
        setMessage('Student status updated successfully!');
      } catch (error) {
        console.error('Error updating student status:', error.response ? error.response.data : error.message);
        setMessage('Error updating student status.');
      }
    } else {
      console.error('No rawValue found in scanned result:', result);
      setMessage('No rawValue found in scanned result.');
    }
  };

  const handleError = (error) => {
    console.error('QR scan error:', error);
    setMessage('QR scan error.');
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text('Student Attendance Report', 10, 10);
    
    const tableColumn = ["Name", "First Name", "Status"];
    const tableRows = [];

    data.forEach(student => {
      const studentData = [
        student.name,
        student.firstname,
        student.status ? 'Present' : 'Absent'
      ];
      tableRows.push(studentData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });
    
    doc.save('attendance_report.pdf');
  };

  const handleSaveAndReset = async (e) => {
    e.preventDefault();

    // Generate the PDF report first
    generatePDFReport();
    
    try {
      // Now, reset all student statuses to false
      const updatedStudents = data.map(student => ({ ...student, status: false }));

      for (const student of updatedStudents) {
        await axios.put(`http://127.0.0.1:8080/api/student/update/status/${student.id}`, false, {
          headers: { 
            'Content-Type': 'application/json',
          }
        });
      }

      setData(updatedStudents);
      setMessage('All student statuses reset to false.');
      
    } catch (error) {
      console.error('Error saving or resetting student statuses:', error);
      setMessage('Error resetting student statuses.');
    }
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
                  <TableCell align="right"><Typography variant="h6">Status</Typography></TableCell>
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
                    <TableCell align="right">
                      <Typography variant="body1">{student.status ? 'Present' : 'Absent'}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleSaveAndReset} sx={{ marginTop: 2 }}>
        Save and Reset Attendance
      </Button>
      {message && (
        <Typography variant="body1" sx={{ marginTop: 2, color: message.includes('Error') ? 'red' : 'green' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default Attendance;
