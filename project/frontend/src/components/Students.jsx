import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"; // Import du composant Icon
import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
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
  const [studentName, setStudentName] = useState("");
  const [studentFirstname, setStudentFirstname] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [niveau, setNiveau] = useState("");
  const [studentnumeroTel, setStudentnumeroTel] = useState("");
  const [studentdateNaiss, setStudentdateNaiss] = useState("");
  const [studentStatus, setStudentStatus] = useState(true); // true for active, false for inactive
  const [selectedNiveau, setSelectedNiveau] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateStudent = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/student/create", {
        name: studentName,
        firstname: studentFirstname,
        address: studentAddress,
        email: studentEmail,
        niveau: niveau,
        numeroTel: studentnumeroTel,
        dateNaiss: studentdateNaiss,
        status: studentStatus,
      });
      const newStudent = res.data;
      setStudentData([...studentData, newStudent]);
      setOpen(false);
      // Rafraîchir la liste des étudiants après l'ajout
      fetchData();
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/student");
      const sortedData = res.data.sort((a, b) => a.niveau.localeCompare(b.niveau));
      setStudentData(sortedData);
    } catch (error) {
      console.error("Error fetching all students:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Appel uniquement au chargement initial

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

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputLabel id="select-niveau-label">Filter by Niveau</InputLabel>
          <Select
            labelId="select-niveau-label"
            id="select-niveau"
            value={selectedNiveau}
            onChange={(e) => setSelectedNiveau(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="L1">L1</MenuItem>
            <MenuItem value="L2">L2</MenuItem>
            <MenuItem value="L3">L3</MenuItem>
            <MenuItem value="M1">M1</MenuItem>
            <MenuItem value="M2">M2</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent={isMobile ? "center" : "flex-end"}>
          <Button variant="contained" color="primary" sx={{marginRight:"600px"}} onClick={handleClickOpen}>
            Add Student
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {studentData
          .filter((student) => selectedNiveau === "" || student.niveau === selectedNiveau)
          .map((student, index) => (
            <Grid item xs={12} md={6} key={student.id}>
              {index === 0 || studentData[index - 1].niveau !== student.niveau ? (
                <Typography variant="h4">Niveau {student.niveau}</Typography>
              ) : null}
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
                          <QrCodeScannerIcon style={{ width: "48px", height: "48px" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ))}
      </Grid>

      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new student.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                fullWidth
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Firstname"
                fullWidth
                value={studentFirstname}
                onChange={(e) => setStudentFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                value={studentAddress}
                onChange={(e) => setStudentAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="niveau-label">Niveau</InputLabel>
              <Select
                labelId="niveau-label"
                id="niveau-select"
                fullWidth
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
              >
                <MenuItem value="L1">L1</MenuItem>
                <MenuItem value="L2">L2</MenuItem>
                <MenuItem value="L3">L3</MenuItem>
                <MenuItem value="M1">M1</MenuItem>
                <MenuItem value="M2">M2</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Phone Number"
                fullWidth
                value={studentnumeroTel}
                onChange={(e) => setStudentnumeroTel(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Date of Birth"
                type="date"
                fullWidth
                value={studentdateNaiss}
                onChange={(e) => setStudentdateNaiss(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateStudent} color="primary">
            Add Student
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Students;
