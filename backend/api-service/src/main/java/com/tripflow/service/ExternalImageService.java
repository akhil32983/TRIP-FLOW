package com.tripflow.service;

import org.springframework.stereotype.Service;

import com.tripflow.dto.unsplash.UnsplashResponse;
import com.tripflow.mappers.ExternalImageMapper;
import com.tripflow.model.ExternalImage;
import com.tripflow.repository.ExternalImageRepository;

@Service
public class ExternalImageService {
    private final ExternalImageRepository externalImageRepository;
    private final ExternalImageMapper externalImageMapper;
    private final UnsplashService unsplashService;

    public ExternalImageService(
        ExternalImageRepository externalImageRepository, ExternalImageMapper externalImageMapper,
        UnsplashService unsplashService
    ) {
        this.externalImageRepository = externalImageRepository;
        this.externalImageMapper = externalImageMapper;
        this.unsplashService = unsplashService;
    }

    /**
     * Get an existing ExternalImage by query or create a new one if it doesn't exist
     * 
     * @param query The search query for the image
     * 
     * @return The existing or newly created ExternalImage
     */
    public ExternalImage getOrCreateImageByQuery(String query) {
        ExternalImage existingImage = this.findByQuery(query);
        if (existingImage != null) {
            return existingImage;
        }

        UnsplashResponse unsplashResponse = this.unsplashService.getPhoto(query);
        
        ExternalImage newImage = this.externalImageMapper.toExternalImage(unsplashResponse, query);
        return this.externalImageRepository.save(newImage);
    }

    /**
     * Find an ExternalImage by its query
     * 
     * @param query The search query associated with the image
     * 
     * @return The ExternalImage if found, otherwise null
     */
    private ExternalImage findByQuery(String query) {
        return this.externalImageRepository.findByQuery(query).orElse(null);
    }
}
