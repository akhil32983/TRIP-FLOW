package com.tripflow.integration.config;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import com.tripflow.dto.unsplash.UnsplashResponse;
import com.tripflow.service.UnsplashService;

@TestConfiguration
public class UnsplashTestConfig {
    @Bean
    public UnsplashService unsplashService() {
        UnsplashService unsplashService = mock(UnsplashService.class);

        when(unsplashService.getPhoto(any())).thenReturn(new UnsplashResponse(
            "testing alt description",
            "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?",
            "test_user"
        ));

        return unsplashService;
    }
}
