package com.tripflow.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.tripflow.dto.unsplash.UnsplashResponse;
import com.tripflow.model.ExternalImage;

@Mapper(componentModel = "spring")
public interface ExternalImageMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "query", source = "query")
    @Mapping(target = "altDescription", source = "unsplashResponse.altDescription")
    @Mapping(target = "imageUrl", source = "unsplashResponse.url")
    @Mapping(target = "authorUsername", source = "unsplashResponse.user")
    ExternalImage toExternalImage(UnsplashResponse unsplashResponse, String query);
}
