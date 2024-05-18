package com.example.project.service.Implement;

import com.example.project.entity.Cours;
import com.example.project.repository.CoursRepository;
import com.example.project.service.Interface.CoursService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class CoursServiceImpl implements CoursService {
    private final CoursRepository coursRepository;
    @Override
    public Cours create(Cours cours) {
        return coursRepository.save(cours);
    }

    @Override
    public List<Cours> read() {
        return coursRepository.findAll();
    }

    @Override
    public Cours update(Long Id, Cours cours) {

        return coursRepository.findById(Id)
                .map(p ->
                        {
                    p.setName(cours.getName());
                    p.setDate(cours.getDate());
                    p.setDuration(cours.getDuration());
                    p.setHours_in(cours.getHours_in());
                    p.setHours_out(cours.getHours_out());
                    return coursRepository.save(p);
                }
        ).orElseThrow(()->new RuntimeException("cours is not found"));
    }

    @Override
    public String delete(Long Id) {
        coursRepository.deleteById(Id);
        return "cours Deleted";
    }
}
