package com.tripflow.config;

import io.github.cdimascio.dotenv.Dotenv;

/**
 * Singleton configuration class for Dotenv.
 * This class loads environment variables from a .env file using the Dotenv library.
 */
public class DotenvConfig {
    private static DotenvConfig instance;
    private Dotenv dotenv;

    private DotenvConfig() {
        boolean isCI = System.getenv("CI") != null || System.getenv("GITHUB_ACTIONS") != null;
        boolean isProduction = "prod".equals(System.getenv("SPRING_PROFILES_ACTIVE"));
        boolean isDocker = System.getenv("DOCKER_ENV") != null;

        if (isCI || isProduction || isDocker) {
            // Load environment variables from the CI environment
            this.dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .systemProperties()
                .load();
        } else {
            // Load environment variables from the .env file
            this.dotenv = Dotenv.configure().load();
        }
    }

    public static DotenvConfig getInstance() {
        if (instance == null) instance = new DotenvConfig();
        return instance;
    }

    public Dotenv getDotenv() {
        return dotenv;
    }
}
