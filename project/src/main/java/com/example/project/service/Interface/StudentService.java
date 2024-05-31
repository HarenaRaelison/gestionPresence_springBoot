package com.example.project.service.Interface;

import com.example.project.entity.Student;

import java.util.List;

public interface StudentService {
    Student create(Student newStudent);

    List<Student> read();

    Student update(Long Id, Student student);

    String delete(Long Id);

    List <Student> takeStudentByLevel(Long IdCours);

    Student readById(Long id);
}
