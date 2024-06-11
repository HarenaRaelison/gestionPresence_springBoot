package com.example.project.service.Interface;

import com.example.project.entity.Cours;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CoursService {
    Cours create(Cours cours);

    List<Cours> read();

    Cours update(Long Id, Cours cours);


    String delete(Long Id);
}
