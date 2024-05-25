package com.example.project.service.Interface;

import com.example.project.entity.Salle;
import com.example.project.entity.Student;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SalleService {
    Salle create(Salle salle);

    List<Salle> read();

    Salle update(Long Id, Salle salle);

    String delete(Long Id);


}
