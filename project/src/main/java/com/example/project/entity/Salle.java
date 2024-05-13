package com.example.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Salle")
public class Salle {

    @Id
    private Long id;
    @Column (name = "etage",nullable = false)
    private int etage;

    public int getEtage() {
        return etage;
    }

    public Salle() {
    }

    public Salle(int etage, boolean status) {
        this.etage = etage;
        this.status = status;
    }

    public void setEtage(int etage) {
        this.etage = etage;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Column (name = "status",nullable = false)
    private boolean status;
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
