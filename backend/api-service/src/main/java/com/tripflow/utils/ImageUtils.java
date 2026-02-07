package com.tripflow.utils;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public class ImageUtils {

    /**
     * Convert a MultipartFile to a byte array.
     * 
     * @param file the MultipartFile to convert
     * @return the byte array representation of the file
     * @throws IOException if an error occurs during conversion
     */
    public static byte[] toByteArray(MultipartFile file) throws IOException {
        return file.getBytes();
    }

    /**
     * Convert a byte array to a Resource.
     * 
     * @param bytes the byte array to convert
     * @return the Resource representation of the byte array
     */
    public static Resource toResource(byte[] bytes) {
        return new InputStreamResource(new ByteArrayInputStream(bytes));
    }
}
