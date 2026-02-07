package com.tripflow.utils;

import java.text.Normalizer.Form;

public class Normalizer {
    private Normalizer() {}

    public static String normalize(String text) {
        return java.text.Normalizer
            .normalize(text, Form.NFD)
            .replaceAll("\\p{M}", "")
            .replaceAll("[^a-zA-Z0-9\\s]", "");
    }
}
