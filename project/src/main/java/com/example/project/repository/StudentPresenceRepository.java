package com.example.project.repository;

import com.example.project.entity.StudentPresence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentPresenceRepository extends JpaRepository <StudentPresence,Long> {

}
