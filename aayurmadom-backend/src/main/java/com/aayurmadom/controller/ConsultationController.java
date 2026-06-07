package com.aayurmadom.controller;

import com.aayurmadom.entity.Consultation;
import com.aayurmadom.repository.ConsultationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    private final ConsultationRepository consultationRepository;

    public ConsultationController(ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }

    @PostMapping
    public Consultation bookConsultation(@RequestBody Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    @GetMapping
    public List<Consultation> getAllConsultations() {
        return consultationRepository.findAll();
    }

    @GetMapping("/user/{email}")
    public List<Consultation> getConsultationsByUser(@PathVariable String email) {
        return consultationRepository.findByUserEmail(email);
    }
    @PutMapping("/{id}/status")
    public Consultation updateConsultationStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation not found"));

        consultation.setStatus(status);

        return consultationRepository.save(consultation);
    }
}