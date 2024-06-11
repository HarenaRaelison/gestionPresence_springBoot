package com.example.project.controller;

import com.example.project.entity.Cours;
import com.example.project.service.Interface.CoursService;
import lombok.AllArgsConstructor;
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
    @PutMapping("/update/{id}")
    public Cours update(@PathVariable Long id, @RequestBody Cours cours) {
        return coursService.update(id, cours);
    }
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id){
        coursService.delete(id);
        return "finish delete";
    }
}
