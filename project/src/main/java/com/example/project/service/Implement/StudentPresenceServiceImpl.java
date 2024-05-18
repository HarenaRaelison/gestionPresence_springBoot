package com.example.project.service.Implement;
import com.example.project.entity.StudentPresence;
import com.example.project.repository.StudentPresenceRepository;
import com.example.project.service.Interface.StudentPresenceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentPresenceServiceImpl implements StudentPresenceService {
    private final StudentPresenceRepository studentPresenceRepository;

    @Override
    public StudentPresence create(StudentPresence presence) {
        return studentPresenceRepository.save(presence);
    }

    @Override
    public List<StudentPresence> read() {
        return studentPresenceRepository.findAll();
    }

    @Override
    public StudentPresence update(Long Id, StudentPresence presence) {
        return studentPresenceRepository.findById(Id)
                .map(
                        p -> {
                            p.setStudent(presence.getStudent());
                            p.setCours(presence.getCours());
                            p.setStatus(presence.getStatus());
                            return studentPresenceRepository.save(p);
                        }
                ).orElseThrow(()->new RuntimeException(""));
    }

    @Override
    public String delete(Long Id) {
        studentPresenceRepository.deleteById(Id);
        return "presence deleted";
    }


}
