package com.tripflow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI tripFlowOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("TripFlow API")
                .description("API documentation for TripFlow, the travel planning application.")
                .version("v1.0.0")
            )
            .addSecurityItem(new SecurityRequirement().addList("auth_token"))
            .components(new Components()
                .addSecuritySchemes("auth_token",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.APIKEY)
                        .in(SecurityScheme.In.COOKIE)
                        .name("auth_token")
                )
            );
    }
}
