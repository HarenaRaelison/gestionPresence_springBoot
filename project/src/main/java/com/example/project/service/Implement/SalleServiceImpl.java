package com.example.project.service.Implement;

import com.example.project.entity.Salle;
import com.example.project.repository.SalleRepository;
import com.example.project.service.Interface.SalleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SalleServiceImpl implements SalleService {
    private SalleRepository salleRepository;
    @Override
    public Salle create(Salle salle) {
        return salleRepository.save(salle) ;
    }

    @Override
    public List<Salle> read() {
        return salleRepository.findAll();
    }

    @Override
    public Salle update(Long Id, Salle salle) {
        return salleRepository.findById(Id)
                .map(k->{
                    k.setEtage(salle.getEtage());
                    k.setStatus(salle.setStatus());
                    return salleRepository.save(k);
                }).orElseThrow(()->new RuntimeException("Salle not found"));
    }

    @Override
    public String delete(Long Id) {
        return null;
    }
}
