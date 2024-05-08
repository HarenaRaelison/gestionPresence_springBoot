package com.example.project.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "student")
public class Student{
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY )
    private Long id;
    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "username",nullable = false)
    private String username;

    @Column(name = "dateBirth",nullable = false)
    private Date dateBirth;

    @Column(name = "adresse",nullable = false)
    private String adresse;

    @Column(name = "email",nullable = false)
    private String email;

    @Column(name = "callNum",nullable = false)
    private String callNum ;

    public Student(Long id, String name, String username, Date dateBirth, String adresse, String email, String callNum) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.dateBirth = dateBirth;
        this.adresse = adresse;
        this.email = email;
        this.callNum = callNum;
    }

    public Student() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getDateBirth() {
        return dateBirth;
    }

    public void setDateBirth(Date dateBirth) {
        this.dateBirth = dateBirth;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCallNum() {
        return callNum;
    }

    public void setCallNum(String callNum) {
        this.callNum = callNum;
    }
}
