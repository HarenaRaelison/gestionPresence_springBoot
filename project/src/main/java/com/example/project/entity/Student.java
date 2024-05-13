package com.example.project.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.Date;
import java.util.Set;

@Getter
@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public Student() {

    }
    @OneToMany(mappedBy = "student")
    Set<StudentPresence> studentPresence;


    public void setName(String name) {
        this.name = name;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public void setDateNaiss(Date dateNaiss) {
        this.dateNaiss = dateNaiss;
    }

    public void setNumeroTel(String numeroTel) {
        this.numeroTel = numeroTel;
    }



    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "firstname",nullable = false)
    private String firstname;

    @Column (name = "email",nullable = false)
    private String email;

    @Column (name = "adresse",nullable = false)
    private String adresse;

    @Column (name = "dateNaiss",nullable = false)
    private Date dateNaiss;

    @Column (name = "numeroTel",nullable = false)
    private String numeroTel;

    public void setId(Long id) {
        this.id = id;
    }

}
