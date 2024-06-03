package com.example.project.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    @Column(name = "firstname",nullable = false)
    private String firstname;

    @Column (name = "email",nullable = false)
    private String email;

    @Column (name = "niveau",nullable = false)
    private String niveau;

    @Column (name = "adresse",nullable = false)
    private String adresse;

    @Column (name = "dateNaiss",nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dateNaiss;

    @Column (name = "numeroTel",nullable = false)
    private String numeroTel;
    @Column (name = "status",nullable = false)
    private Boolean status;


    public Boolean getStatus() {
        return status;
    }



    public void setStatus(Boolean status) {
        this.status = status;
    }
}
