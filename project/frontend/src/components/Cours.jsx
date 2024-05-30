import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cours() {
    const [listCours, setListCours] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/Cours");
                setListCours(res.data);
                console.log(res.data);
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

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                m: 2,
            }}
        >
            {listCours.map((cours, index) => (
                <Paper
                    key={index}
                    elevation={3}
                    sx={{ padding: 2, minWidth: 200 }}
                    onClick={() => handleClick(cours)}  // Use a function to pass course data
                >
                    <Typography variant="h6">{cours.name}</Typography>
                    <Typography variant="body1">
                        Status: {cours.status ? "Completed" : "Pending"}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
}

export default Cours;
