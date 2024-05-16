package com.example.project.service;

import com.example.project.entity.Cours;
import com.example.project.entity.StudentPresence;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StudentPresenceService {
    StudentService create(StudentService presence);

    List<StudentPresence> read();


    Cours update(Long Id, StudentPresence presence);

    String delete(Long Id);
    List <StudentPresence> readByCours(StudentPresence presence,Long Id);


}
