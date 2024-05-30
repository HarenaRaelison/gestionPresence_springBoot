package com.example.project.service.Implement;

import com.example.project.entity.Cours;
import com.example.project.entity.Student;
import com.example.project.repository.CoursRepository;
import com.example.project.repository.StudentRepository;
import com.example.project.service.Interface.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;
    private final CoursRepository coursRepository;
    @Override
    public Student create(Student newStudent) {
        return studentRepository.save(newStudent);
    }

    @Override
    public List<Student> read() {
        return studentRepository.findAll();
    }

    @Override
    public Student update(Long Id, Student student) {
        return studentRepository.findById(Id)
                .map(p->{
                    p.setName(student.getName());
                    p.setFirstname(student.getFirstname());
                    p.setAdresse(student.getAdresse());
                    p.setNiveau(student.getNiveau());
                    p.setEmail(student.getEmail());
                    p.setStatus(student.getStatus());
                    return studentRepository.save(p);
                        }).orElseThrow(() -> new RuntimeException("student is not found"));

    }

    @Override
    public String delete(Long Id) {
        studentRepository.deleteById(Id);
        return "student deleted";
    }

    @Override
    public List<Student> takeStudentByLevel(Long IdCours) {
        Cours cours = coursRepository.findById(IdCours).orElseThrow(() -> new RuntimeException("Cours not found"));

        // Obtenir le niveau du cours
        String niveau = cours.getNiveau();

        // Trouver les étudiants qui ont le même niveau
        List<Student> students = studentRepository.findByNiveau(niveau);

        return students;
    }



}
