package com.example.project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "presenceStudent")
public class StudentPresence {

    @Id
    @GeneratedValue
    private Long id;

    public StudentPresence(Student student, Cours cours) {
        this.student = student;
        this.cours = cours;
    }

    public StudentPresence() {

    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Cours getCours() {
        return cours;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }

    @ManyToOne
    @JoinColumn(name = "Student_id")
    Student student;

    @ManyToOne
    @JoinColumn(name = "Cours_id")
    Cours cours;
    @Column (name = "status",nullable = false)
    private Boolean status;


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
