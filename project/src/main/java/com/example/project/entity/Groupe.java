package com.example.project.entity;

import jakarta.persistence.*;
import lombok.extern.apachecommons.CommonsLog;

@Entity
@Table(name = "groupe")
public class Groupe {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",nullable = false)
    private String name;
    @Column(name = "descri",nullable = false)
    private String descri;

    @Column(name = "niveau",nullable = false)
    private String niveau;

    public Groupe() {

    }

    public String getName() {
        return name;
    }

    public Groupe(Long id, String name, String descri, String niveau) {
        this.id = id;
        this.name = name;
        this.descri = descri;
        this.niveau = niveau;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescri() {
        return descri;
    }

    public void setDescri(String descri) {
        this.descri = descri;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
