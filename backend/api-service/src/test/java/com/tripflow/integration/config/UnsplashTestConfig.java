package com.tripflow.integration.config;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import com.tripflow.service.UnsplashService;
import com.tripflow.utils.UnsplashResponseMock;

@TestConfiguration
public class UnsplashTestConfig {
    @Bean
    public UnsplashService unsplashService() {
        UnsplashService unsplashService = mock(UnsplashService.class);

        when(unsplashService.getPhoto(any())).thenReturn(UnsplashResponseMock.getMock());

        return unsplashService;
    }
}
