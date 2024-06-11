import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import './css/Attendance.css'; // Import the CSS file

function Attendance() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('id');

  const [data, setData] = useState([]);
  const [scannedResult, setScannedResult] = useState('');
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/api/student/take/niveau/${courseId}`);
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
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
        setScannedResult(id);
        setMessage('Student status updated successfully!');
        
        // Fetch the updated data
        fetchData();
        
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
      await axios.delete(`http://127.0.0.1:8080/api/Cours/delete/${courseId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      // Now, reset all student statuses to false
      const updatedStudents = data.map(student => ({ ...student, status: false }));

      for (const student of updatedStudents) {
        await axios.put(`http://127.0.0.1:8080/api/student/update/status/${student.id}`, false, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
      }
      fetchData()
      setData(updatedStudents);
      setMessage('All student statuses reset to false.');

    } catch (error) {
      console.error('Error saving or resetting student statuses:', error);
      setMessage('Error resetting student statuses.');
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Typography variant="h3" gutterBottom sx={{ color: '#333', fontWeight: 'bold', marginBottom: 4 }}>
        Student Attendance
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ color: '#555' }}>
            Scan QR Code
          </Typography>
          <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
            <Scanner
              onScan={(result) => {
                if (result) handleScan(result);
              }}
              onError={handleError}
              className="qr-scanner" // Apply the CSS class
            />
            {scannedResult && (
              <Typography variant="body1" sx={{ marginTop: 2, color: '#333' }}>
                Scanned Result: {scannedResult}
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ color: '#555' }}>
            Student List
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Name</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Firstname</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Niveau</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Adresse</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Date Naiss</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Numero Tel</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Status</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((student) => (
                  <TableRow
                    key={student.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: student.status ? '#1fa270' : '#c8493d',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" sx={{ color: '#fff' }}>{student.name}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ color: '#fff' }}>{student.firstname}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ color: '#fff' }}>{student.niveau}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ color: '#fff' }}>{student.adresse}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ color: '#fff' }}>{student.dateNaiss}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ color: '#fff' }}>{student.numeroTel}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ color: '#fff' }}>{student.status ? 'Present' : 'Absent'}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={handleSaveAndReset}
        sx={{
          marginTop: 4,
          padding: '12px 24px',
          backgroundColor: '#1976d2',
          color: '#fff',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#115293' }
        }}
      >
        Save and Reset Attendance
      </Button>
      {message && (
        <Typography
          variant="body1"
          sx={{
            marginTop: 2,
            color: message.includes('Error') ? 'red' : 'green',
            fontWeight: 'bold'
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default Attendance;
