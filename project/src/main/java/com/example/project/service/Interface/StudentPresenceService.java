package com.example.project.service.Interface;

import com.example.project.entity.Cours;
import com.example.project.entity.StudentPresence;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public interface StudentPresenceService {
    StudentPresence create(StudentPresence presence);

    List<StudentPresence> read();


    StudentPresence update(Long Id, StudentPresence presence);

    String delete(Long Id);


}
