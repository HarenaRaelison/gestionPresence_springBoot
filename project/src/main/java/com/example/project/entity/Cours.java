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

    public void setHours_out(String hours_out) {
        this.hours_out = hours_out;
    }

    @Column (name ="date")
    private Date date;

    public Cours(String name, Date date, int duration, String hours_in, String hours_out) {
        this.name = name;
        this.date = date;
        this.duration = duration;
        this.hours_in = hours_in;
        this.hours_out = hours_out;
    }

    @Column (name = "duration")
    private int duration;

    @Column (name = "hours_in")
    private String hours_in;

    @Column (name = "hours_out")
    private String hours_out;








    public void setId(Long id) {
        this.id = id;
    }

}
