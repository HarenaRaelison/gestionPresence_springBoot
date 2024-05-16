package com.example.project.repository;

import com.example.project.entity.Cours;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursRepository extends JpaRepository <Cours,Long>{

}
