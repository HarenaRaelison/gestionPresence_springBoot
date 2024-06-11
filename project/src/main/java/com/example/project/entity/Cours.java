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
@NoArgsConstructor
@Table(name = "cours")
public class Cours {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "date")
    private Date date;

    @Column(name = "duration")
    private int duration;

    @Column(name = "hours_in")
    private String hours_in;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getHours_in() {
        return hours_in;
    }

    public void setHours_in(String hours_in) {
        this.hours_in = hours_in;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public Set<StudentPresence> getStudentPresences() {
        return studentPresences;
    }

    public void setStudentPresences(Set<StudentPresence> studentPresences) {
        this.studentPresences = studentPresences;
    }

    @Column(name = "status")
    private Boolean status;

    @Column(name = "niveau")
    private String niveau;

    @OneToMany(mappedBy = "cours")
    Set<StudentPresence> studentPresences;

    // Getters and setters omitted for brevity
}
