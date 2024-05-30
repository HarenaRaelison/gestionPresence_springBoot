package com.example.project.repository;

import com.example.project.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository  extends JpaRepository <Student,Long>{
    List<Student> findByNiveau(String niveau);
}
