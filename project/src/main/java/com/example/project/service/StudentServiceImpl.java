package com.example.project.service;

import com.example.project.entity.Student;
import com.example.project.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService{
    private final StudentRepository studentRepository;

    @Override
    public Student create(Student newStudent) {
        return studentRepository.save(newStudent);
    }

    @Override
    public List<Student> read() {
        return studentRepository.findAll();
    }

    @Override
    public Student update(Long Id, Student student) {
        return studentRepository.findById(Id)
                .map(p->{
                    p.setName(student.getName());
                    p.setFirstname(student.getFirstname());
                    p.setAdresse(student.getAdresse());
                    p.setEmail(student.getEmail());

                    return studentRepository.save(p);
                        }).orElseThrow(() -> new RuntimeException("student is not found"));

    }

    @Override
    public String delete(Long Id) {
        studentRepository.deleteById(Id);
        return "student deleted";
    }
}
