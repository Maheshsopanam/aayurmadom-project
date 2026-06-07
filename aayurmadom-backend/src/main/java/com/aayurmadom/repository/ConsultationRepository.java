package com.aayurmadom.repository;

import com.aayurmadom.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {

    List<Consultation> findByUserEmail(String userEmail);
}