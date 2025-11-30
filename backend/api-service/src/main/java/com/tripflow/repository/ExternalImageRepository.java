package com.tripflow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripflow.model.ExternalImage;

public interface ExternalImageRepository extends JpaRepository<ExternalImage, Long> {
    Optional<ExternalImage> findByQuery(String query);
}