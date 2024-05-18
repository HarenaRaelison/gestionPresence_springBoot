package com.example.project.controller;

import com.example.project.entity.Student;
import com.example.project.service.Interface.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/Student")
public class StudentController {
    private final StudentService studentService;
    @PostMapping("/create")
    public Student create(@RequestBody Student student){
       return studentService.create(student);
    }
    @GetMapping
    public List<Student> read(){
        return studentService.read();
    }
    @PutMapping("update/{id}")
    public Student update(@PathVariable Long id,@RequestBody Student student){
        return studentService.update(id,student);
    }
    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable Long id){
        studentService.delete(id);
        return "";
    }


}
