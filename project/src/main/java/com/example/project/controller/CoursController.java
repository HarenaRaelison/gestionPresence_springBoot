package com.example.project.controller;

import com.example.project.entity.Cours;
import com.example.project.service.Interface.CoursService;
import lombok.AllArgsConstructor;
import org.hibernate.validator.internal.constraintvalidators.bv.money.NegativeOrZeroValidatorForMonetaryAmount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/Cours")
@CrossOrigin(origins = "http://localhost:5173")
public class CoursController {
    private final CoursService coursService;
    @PostMapping("/createCours")
    public Cours create(@RequestBody Cours cours){
    return coursService.create(cours);
    }

    @GetMapping()
    public List<Cours> read(){
        return coursService.read();
    }
}
