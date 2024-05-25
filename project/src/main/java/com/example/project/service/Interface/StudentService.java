package com.example.project.service.Interface;

import com.example.project.entity.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    Student create(Student newStudent);

    List<Student> read();

    Student update(Long Id, Student student);

    String delete(Long Id);

    List <Student> takeStudentByLevel();
}
