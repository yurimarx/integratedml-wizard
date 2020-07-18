package com.intersystems.community.integratedml;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class WizardApplication {

	public static void main(String[] args) {
		SpringApplication.run(WizardApplication.class, args);
	}

}
