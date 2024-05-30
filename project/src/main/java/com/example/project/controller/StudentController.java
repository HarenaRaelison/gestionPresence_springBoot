package com.example.project.controller;

import com.example.project.entity.Student;
import com.example.project.service.Interface.StudentService;
import com.example.project.util.QRCodeGenerator;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/create")
    public Student create(@RequestBody Student student) {
        Student createdStudent = studentService.create(student);
        try {
            QRCodeGenerator.generateQRCodeImage(createdStudent.getId().toString());
        } catch (IOException | com.google.zxing.WriterException e) {
            e.printStackTrace();
            // Handle the exception appropriately, e.g., log it, return an error response, etc.
        }
        return createdStudent;
    }

    @GetMapping
    public List<Student> read() {
        return studentService.read();
    }

    @PutMapping("/update/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student student) {
        return studentService.update(id, student);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        studentService.delete(id);
        return "Student deleted successfully";
    }

    @GetMapping("/take/niveau/{id}")
    public List<Student> takeStudentByLevel(@PathVariable Long id) {
        return studentService.takeStudentByLevel(id);
    }
}
