import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode.react";
import React, { useEffect, useRef, useState } from "react";

function Students() {
  const [studentData, setStudentData] = useState([]);
  const pdfContentRefs = useRef({}); // Référence pour les éléments 'pdf-content'

  const handleQRgenerate = (student) => {
    const pdfContentRef = pdfContentRefs.current[student.id]; // Référence spécifique à l'étudiant

    return (
      <div id={`pdf-content-${student.id}`} ref={(ref) => (pdfContentRefs.current[student.id] = ref)}>
        <table>
          <tbody>
            <tr>
              <td>
                <Typography variant="h4" color="initial">
                  Numéro Id :
                </Typography>
              </td>
              <td>
                <Typography variant="h5" color="initial">
                  {student.id}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="h4" color="initial">
                  Nom :
                </Typography>
              </td>
              <td>
                <Typography variant="h5" color="initial">
                  {student.name}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="h4" color="initial">
                  Prénom :
                </Typography>
              </td>
              <td>
                <Typography variant="h5" color="initial">
                  {student.firstname}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>

        <p>Code QR</p>
        <QRCode value={(student.id).toString()} />
      </div>
    );
  };

  const handleDownloadPDF = (studentId) => {
    const input = pdfContentRefs.current[studentId];
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save(`student-${studentId}-list.pdf`);
      });
    } else {
      console.error(`Ref for 'pdf-content-${studentId}' not found.`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8080/api/student`);
        setStudentData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching all students:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {studentData.map((student) => (
          <Grid item xs={12} md={6} key={student.id}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">student List CE</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">Code QR</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{handleQRgenerate(student)}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="Generate QR Code" onClick={() => handleDownloadPDF(student.id)}>
                        <QrCodeScannerIcon style={{ fontSize: "48px" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Students;
