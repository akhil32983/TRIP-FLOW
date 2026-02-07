package com.tripflow.unit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.tripflow.dto.ai.AIUsageDTO;
import com.tripflow.mappers.AIMapper;
import com.tripflow.model.AIUsage;
import com.tripflow.model.User;
import com.tripflow.model.types.PlanType;
import com.tripflow.repository.AIUsageRepository;
import com.tripflow.service.ai.AIUsageService;

@Tag("unit")
public class AIUsageServiceTest {

    private AIUsageRepository aiUsageRepository;
    private AIMapper aiMapper;
    private AIUsageService aiUsageService;

    private User testUser;
    private AIUsageDTO mockDTO;

    @BeforeEach
    public void setUp() {
        this.aiUsageRepository = mock(AIUsageRepository.class);
        this.aiMapper = mock(AIMapper.class);

        this.aiUsageService = new AIUsageService(aiUsageRepository, aiMapper);

        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testUser");
        testUser.setPlan(PlanType.FREE);
        testUser.setProcessingAI(false);

        mockDTO = new AIUsageDTO(1, 4, 5, LocalDate.now());
    }

    @Test
    @DisplayName("AIUsageService should create new usage record if none exists on recordUsage")
    public void testRecordUsageNew() {
        when(aiUsageRepository.findByUserAndDate(eq(testUser), any(LocalDate.class)))
            .thenReturn(Optional.empty());
        
        when(aiUsageRepository.save(any(AIUsage.class))).thenAnswer(invocation -> {
            AIUsage saved = invocation.getArgument(0);
            assertEquals(1, saved.getUsage()); // Should start at 1
            return saved;
        });
        
        when(aiMapper.toDTO(any(AIUsage.class))).thenReturn(mockDTO);

        AIUsageDTO result = aiUsageService.recordUsage(testUser);

        assertNotNull(result);
        verify(aiUsageRepository).save(any(AIUsage.class));
    }

    @Test
    @DisplayName("AIUsageService should increment existing usage record on recordUsage")
    public void testRecordUsageExisting() {
        AIUsage existingUsage = new AIUsage(testUser, LocalDate.now(), 2);
        
        when(aiUsageRepository.findByUserAndDate(eq(testUser), any(LocalDate.class)))
            .thenReturn(Optional.of(existingUsage));
        
        when(aiUsageRepository.save(any(AIUsage.class))).thenAnswer(invocation -> {
            AIUsage saved = invocation.getArgument(0);
            return saved;
        });

        when(aiMapper.toDTO(any(AIUsage.class))).thenReturn(mockDTO);

        aiUsageService.recordUsage(testUser);

        assertEquals(3, existingUsage.getUsage()); // 2 + 1
        verify(aiUsageRepository).save(existingUsage);
    }

    @Test
    @DisplayName("AIUsageService should create new usage record with 0 if none exists on reduceUsage")
    public void testReduceUsageNew() {
        when(aiUsageRepository.findByUserAndDate(eq(testUser), any(LocalDate.class)))
            .thenReturn(Optional.empty());

        when(aiUsageRepository.save(any(AIUsage.class))).thenAnswer(invocation -> {
            AIUsage saved = invocation.getArgument(0);
            assertEquals(0, saved.getUsage());
            return saved;
        });

        when(aiMapper.toDTO(any(AIUsage.class))).thenReturn(mockDTO);

        aiUsageService.reduceUsage(testUser);

        verify(aiUsageRepository).save(any(AIUsage.class));
    }

    @Test
    @DisplayName("AIUsageService should decrement existing usage record on reduceUsage")
    public void testReduceUsageExisting() {
        AIUsage existingUsage = new AIUsage(testUser, LocalDate.now(), 2);
        
        when(aiUsageRepository.findByUserAndDate(eq(testUser), any(LocalDate.class)))
            .thenReturn(Optional.of(existingUsage));
            
        when(aiUsageRepository.save(any(AIUsage.class))).thenReturn(existingUsage);
        when(aiMapper.toDTO(any(AIUsage.class))).thenReturn(mockDTO);

        aiUsageService.reduceUsage(testUser);

        assertEquals(1, existingUsage.getUsage()); // 2 - 1
        verify(aiUsageRepository).save(existingUsage);
    }

    @Test
    @DisplayName("AIUsageService should returns false for canUseAI if user is processing")
    public void testCanUseAIProcessing() {
        testUser.setProcessingAI(true);
        assertFalse(aiUsageService.canUseAI(testUser));
    }

    @Test
    @DisplayName("AIUsageService should return true for canUseAI if user is PREMIUM")
    public void testCanUseAIPremium() {
        testUser.setPlan(PlanType.PREMIUM);
        assertTrue(aiUsageService.canUseAI(testUser));
    }

    @Test
    @DisplayName("AIUsageService should return true for canUseAI if usage not present")
    public void testCanUseAINoUsage() {
        testUser.setPlan(PlanType.FREE);
        // Assuming FREE limit is > 0
        
        when(aiUsageRepository.findByUserAndDate(eq(testUser), any(LocalDate.class)))
            .thenReturn(Optional.empty());

        assertTrue(aiUsageService.canUseAI(testUser));
    }

    @Test
    @DisplayName("AIUsageService should return true for canUseAI if usage < limit")
    public void testCanUseAIUnderLimit() {
        testUser.setPlan(PlanType.FREE);
        // Assuming FREE limit > 1
        
        AIUsage existingUsage = new AIUsage(testUser, LocalDate.now(), 0);
        
        when(aiUsageRepository.findByUserAndDate(eq(testUser), any(LocalDate.class)))
            .thenReturn(Optional.of(existingUsage));

        assertTrue(aiUsageService.canUseAI(testUser));
    }

    @Test
    @DisplayName("AIUsageService should return false for canUseAI if usage >= limit")
    public void testCanUseAIOverLimit() {
        testUser.setPlan(PlanType.FREE);
        int limit = PlanType.FREE.getDailyLimit();
        
        AIUsage existingUsage = new AIUsage(testUser, LocalDate.now(), limit);
        
        when(aiUsageRepository.findByUserAndDate(eq(testUser), any(LocalDate.class)))
            .thenReturn(Optional.of(existingUsage));

        assertFalse(aiUsageService.canUseAI(testUser));
    }

    @Test
    @DisplayName("AIUsageService should return correct daily limit from plan")
    public void testGetDailyLimit() {
        testUser.setPlan(PlanType.FREE);
        assertEquals(PlanType.FREE.getDailyLimit(), aiUsageService.getDailyLimit(testUser));
    }

    @Test
    @DisplayName("AIUsageService should return full limit as remaining if no usage recorded")
    public void testGetRemainingRequestsNoUsage() {
        testUser.setPlan(PlanType.FREE);
        int limit = PlanType.FREE.getDailyLimit();

        when(aiUsageRepository.findByUserAndDate(eq(testUser), any(LocalDate.class)))
            .thenReturn(Optional.empty());

        assertEquals(limit, aiUsageService.getRemainingRequests(testUser));
    }

    @Test
    @DisplayName("AIUsageService should return calculated remaining requests if usage exists")
    public void testGetRemainingRequestsWithUsage() {
        testUser.setPlan(PlanType.FREE);
        int limit = PlanType.FREE.getDailyLimit();
        int used = 1;
        
        AIUsage existingUsage = new AIUsage(testUser, LocalDate.now(), used);

        when(aiUsageRepository.findByUserAndDate(eq(testUser), any(LocalDate.class)))
            .thenReturn(Optional.of(existingUsage));

        assertEquals(limit - used, aiUsageService.getRemainingRequests(testUser));
    }
}
