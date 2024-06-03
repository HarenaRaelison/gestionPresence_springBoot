import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode.react";
import React, { useEffect, useRef, useState } from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Students() {
  const [studentData, setStudentData] = useState([]);
  const pdfContentRefs = useRef({}); // Référence pour les éléments 'pdf-content'
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setNiveau(event.target.value);
  };
  const [Niveau, setNiveau] = React.useState("");

  const handleQRgenerate = (student) => {
    const pdfContentRef = pdfContentRefs.current[student.id]; // Référence spécifique à l'étudiant

    return (
      <div
        id={`pdf-content-${student.id}`}
        ref={(ref) => (pdfContentRefs.current[student.id] = ref)}
      >
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
        <QRCode value={student.id.toString()} />
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
        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Student
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="add an Student"
          >
            <DialogTitle>{"Add a Student"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Please complete all forms.
              </DialogContentText>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Name"
                    variant="filled"
                    fullWidth
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Firstname"
                    variant="filled"
                    fullWidth
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Adresse"
                    variant="filled"
                    fullWidth
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="demo-simple-select-label">Niveau</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Niveau}
                    label="Niveau"
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                  >
                    <MenuItem value={"L1"}>L1</MenuItem>
                    <MenuItem value={"L2"}>L2</MenuItem>
                    <MenuItem value={"L3"}>L3</MenuItem>
                    <MenuItem value={"M1"}>M1</MenuItem>
                    <MenuItem value={"M2"}>M2</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    fullWidth
                    margin="dense"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Add
              </Button>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        {studentData.map((student) => (
          <Grid item xs={12} md={6} key={student.id}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Student List CE</Typography>
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
                      <IconButton
                        aria-label="Generate QR Code"
                        onClick={() => handleDownloadPDF(student.id)}
                      >
                        <QrCodeScannerIcon
                          style={{ width: "48px", height: "48px" }}
                        />
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
