package com.example.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Getter
@Entity
@Builder
@AllArgsConstructor

@Table(name = "cours")
public class Cours {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column (name = "name")
    private String name;

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Cours() {

    }
    @OneToMany(mappedBy = "cours")
    Set<StudentPresence> studentPresences;

    public void setName(String name) {
        this.name = name;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setHours_in(String hours_in) {
        this.hours_in = hours_in;
    }



    @Column (name ="date",nullable = false)
    private Date date;

    public Cours(String name, Date date, int duration, String hours_in) {
        this.name = name;
        this.date = date;
        this.duration = duration;
        this.hours_in = hours_in;

    }

    @Column (name = "duration",nullable = false)
    private int duration;

    @Column (name = "hours_in",nullable = false)
    private String hours_in;

    @Column(name = "status",nullable = false)
    private Boolean status;



    @Column(name = "niveau",nullable = false)
    private  String niveau;

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
