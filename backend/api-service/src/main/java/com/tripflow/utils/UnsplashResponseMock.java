package com.tripflow.utils;

import com.tripflow.dto.unsplash.UnsplashResponse;

public class UnsplashResponseMock {
    public static UnsplashResponse getMock() {
        return new UnsplashResponse(
            "asphalt road between trees\"",
            "https://images.unsplash.com/photo-1471958680802-1345a694ba6d?q=80&w=1080",
            "foxxmd"
        );
    }
}
