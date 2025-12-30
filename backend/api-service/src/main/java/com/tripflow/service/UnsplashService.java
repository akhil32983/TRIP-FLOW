package com.tripflow.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tripflow.dto.unsplash.UnsplashResponse;
import com.tripflow.utils.UnsplashResponseMock;

import java.text.Normalizer;
import java.util.List;
import java.util.Map;

@Service
public class UnsplashService {
    private static final String UNSPLASH_API_BASE_URL = "https://api.unsplash.com";
    private static final String SEARCH_PHOTOS_ENDPOINT = "/search/photos";
    
    @Value("${unsplash.api.key}")
    private String apiKey;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;
    
    private final RestTemplate restTemplate;
    
    public UnsplashService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    /**
     * Get a single photo from Unsplash by query
     * @param query Search query (e.g., "office", "nature", etc.)
     * 
     * @return UnsplashResponse containing a single photo with simplified data
     * @throws IllegalArgumentException if query is null or empty
     * @throws RuntimeException if no photos are found or API call fails
     */
    public UnsplashResponse getPhoto(String query) {
        if (query == null || query.trim().isEmpty()) {
            throw new IllegalArgumentException("Query cannot be null or empty");
        }

        if ("dev".equals(this.activeProfile)) {
            return UnsplashResponseMock.getMock();
        }

        query = Normalizer
            .normalize(query, Normalizer.Form.NFD)
            .replaceAll("\\p{M}", "");
        
        String url = UriComponentsBuilder
            .fromUriString(UNSPLASH_API_BASE_URL + SEARCH_PHOTOS_ENDPOINT)
            .queryParam("query", query)
            .queryParam("page", 1)
            .queryParam("per_page", 1)
            .queryParam("client_id", apiKey)
            .toUriString();
        
        UnsplashSearchResponse searchResponse = restTemplate.getForObject(url, UnsplashSearchResponse.class);
        
        if (searchResponse == null || searchResponse.results == null || searchResponse.results.isEmpty()) {
            throw new RuntimeException("No photos found for query: " + query);
        }
        
        UnsplashPhotoInternal photo = searchResponse.results.get(0);
        
        // Map to simplified response
        return new UnsplashResponse(
            photo.altDescription,
            photo.urls.get("regular"),
            photo.user.username
        );
    }
    
    // Internal record classes for deserialization
    
    private static record UnsplashSearchResponse(
        List<UnsplashPhotoInternal> results
    ) {}
    
    private static record UnsplashPhotoInternal(
        String id,
        @JsonProperty("alt_description") String altDescription,
        Map<String, String> urls,
        UnsplashUserInternal user
    ) {}

    private static record UnsplashUserInternal(
        String username
    ) {}
}