package com.tripflow.unit;

import static org.mockito.Mockito.*;

import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import com.tripflow.email.application.SendEmailUseCase;
import com.tripflow.kafka.messages.EmailType;
import com.tripflow.service.EmailHandlerService;
import com.tripflow.utils.EmailUtils;

@Tag("unit")
public class EmailHandlerServiceTest {

    private SendEmailUseCase sendEmailUseCase;
    private EmailHandlerService emailHandlerService;

    @BeforeEach
    public void setUp() {
        this.sendEmailUseCase = mock(SendEmailUseCase.class);
        this.emailHandlerService = new EmailHandlerService(sendEmailUseCase);
    }

    @Test
    @DisplayName("EmailHandlerService should handle email sending")
    public void testHandleEmail() {
        // Arrange
        String to = "test@example.com";
        EmailType type = EmailType.VERIFICATION;
        Map<String, String> variables = Map.of("code", "123456");
        com.tripflow.kafka.messages.EmailMessage kafkaMessage = 
            new com.tripflow.kafka.messages.EmailMessage(to, type, variables);

        String expectedSubject = "Verificación de Cuenta TripFlow";
        String expectedBody = "<html>Body</html>";

        // We mock static methods of EmailUtils to avoid file reading issues and isolate logic
        try (MockedStatic<EmailUtils> mockedEmailUtils = mockStatic(EmailUtils.class)) {
            mockedEmailUtils.when(() -> EmailUtils.getEmailSubject(type))
                .thenReturn(expectedSubject);
            mockedEmailUtils.when(() -> EmailUtils.generateEmailBody(type, variables))
                .thenReturn(expectedBody);

            // Act
            emailHandlerService.handleEmail(kafkaMessage);

            // Assert
            verify(sendEmailUseCase).execute(argThat(emailMessage -> 
                emailMessage.to().equals(to) &&
                emailMessage.subject().equals(expectedSubject) &&
                emailMessage.body().equals(expectedBody)
            ));
        }
    }
}
