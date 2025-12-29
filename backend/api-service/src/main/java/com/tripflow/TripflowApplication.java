package com.tripflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TripflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripflowApplication.class, args);
	}

}
