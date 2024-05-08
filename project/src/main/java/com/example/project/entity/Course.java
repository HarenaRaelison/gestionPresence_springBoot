package com.example.project.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "course")

public class Course {

    @Id
    @GeneratedValue
    private Long id;

    @Column (name = "name",nullable = false)
    private String name;
     @Column (name = "debut",nullable = false)
     private Date debut;

     @Column(name="fin",nullable = false)
     private Date fin;












    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
