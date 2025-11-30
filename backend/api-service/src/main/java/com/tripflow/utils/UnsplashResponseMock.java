package com.tripflow.utils;

import com.tripflow.dto.unsplash.UnsplashResponse;

public class UnsplashResponseMock {
    public static UnsplashResponse getMock() {
        return new UnsplashResponse(
            "person writing on white paper",
            "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?",
            "nguyendhn"
        );
    }
}
