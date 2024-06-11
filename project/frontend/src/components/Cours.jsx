import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cours() {
    const [listCours, setListCours] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newCourseName, setNewCourseName] = useState("");
    const [newCourseDate, setNewCourseDate] = useState("");
    const [newCourseDuration, setNewCourseDuration] = useState("");
    const [newCourseHoursIn, setNewCourseHoursIn] = useState("");
    const [newCourseStatus, setNewCourseStatus] = useState(true);
    const [newCourseNiveau, setNewCourseNiveau] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/Cours");
                setListCours(res.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchData();
    }, []);

    const handleClick = (course) => {
        localStorage.setItem('selectedCourse', JSON.stringify(course));
        navigate(`/attendance?id=${course.id}`);
    };

    const handleAddCourse = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/Cours/createCours", {
                name: newCourseName,
                date: newCourseDate,
                duration: newCourseDuration,
                hours_in: newCourseHoursIn,
                status: newCourseStatus,
                niveau: newCourseNiveau,
            });
            const newCourse = res.data;
            setListCours([...listCours, newCourse]);
            setOpenModal(false);
            setNewCourseName("");
            setNewCourseDate("");
            setNewCourseDuration("");
            setNewCourseHoursIn("");
            setNewCourseStatus(true);
            setNewCourseNiveau("");
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                m: 2,
            }}
        >
            <Button variant="contained" onClick={() => setOpenModal(true)}>
                Ajouter un cours
            </Button>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                {listCours.map((cours, index) => (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{ padding: 2, minWidth: 200 }}
                        onClick={() => handleClick(cours)}
                    >
                        <Typography variant="h6">{cours.name}</Typography>
                        <Typography variant="body1">
                            Status: {cours.status ? "Complété" : "En attente"}
                        </Typography>
                    </Paper>
                ))}
            </Box>

            {/* Modal for adding a new course */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Ajouter un nouveau cours</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom du cours"
                        fullWidth
                        value={newCourseName}
                        onChange={(e) => setNewCourseName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={newCourseDate}
                        onChange={(e) => setNewCourseDate(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Durée (en heures)"
                        type="number"
                        fullWidth
                        value={newCourseDuration}
                        onChange={(e) => setNewCourseDuration(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Heure de début"
                        fullWidth
                        value={newCourseHoursIn}
                        onChange={(e) => setNewCourseHoursIn(e.target.value)}
                    />
                    <InputLabel id="status-label">Statut</InputLabel>
                    <Select
                        labelId="status-label"
                        fullWidth
                        value={newCourseStatus}
                        onChange={(e) => setNewCourseStatus(e.target.value)}
                    >
                        <MenuItem value={true}>Complété</MenuItem>
                        <MenuItem value={false}>En attente</MenuItem>
                    </Select>
                    <TextField
                        margin="dense"
                        label="Niveau"
                        fullWidth
                        value={newCourseNiveau}
                        onChange={(e) => setNewCourseNiveau(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Annuler</Button>
                    <Button onClick={handleAddCourse}>Ajouter</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Cours;
