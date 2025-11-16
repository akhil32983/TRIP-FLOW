package com.tripflow.unit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tripflow.dto.user.PublicUserDTO;
import com.tripflow.dto.user.RegisterUserRequest;
import com.tripflow.dto.user.UserMapper;
import com.tripflow.model.User;
import com.tripflow.model.types.UserType;
import com.tripflow.repository.UserRepository;
import com.tripflow.service.UserService;

@Tag("unit")
public class UserServiceTest {
    private UserRepository userRepository;
    private UserMapper userMapper;
    private PasswordEncoder passwordEncoder;
    private UserService userService;

    @BeforeEach
    public void setUp() {
        this.userRepository = mock(UserRepository.class);
        this.userMapper = mock(UserMapper.class);
        this.passwordEncoder = mock(PasswordEncoder.class);

        this.userService = new UserService(userRepository, userMapper, passwordEncoder);
    }

    @Test
    @DisplayName("UserService should get public user by username")
    public void testGetPublicUserByUsername() {
        User user = new User();
        user.setUsername("testuser");

        PublicUserDTO publicUserDTO = mock(PublicUserDTO.class);

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(userMapper.toPublicUserDTO(user)).thenReturn(publicUserDTO);

        PublicUserDTO result = userService.getPublicUserByUsername("testuser");

        assertNotNull(result);
        assertEquals(publicUserDTO, result);
        verify(userRepository).findByUsername("testuser");
        verify(userMapper).toPublicUserDTO(user);
    }

    @Test
    @DisplayName("UserService should throw UsernameNotFoundException when user not found")
    public void testGetPublicUserByUsernameNotFound() {
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () ->
            userService.getPublicUserByUsername("nonexistent")
        );
    }

    @Test
    @DisplayName("UserService should register new user")
    public void testRegisterUser() {
        RegisterUserRequest request = new RegisterUserRequest("newuser", "password123", "password123");

        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashedPassword");

        User user = new User();
        user.setUsername("newuser");

        PublicUserDTO publicUserDTO = mock(PublicUserDTO.class);

        when(userMapper.toDomain(request, "hashedPassword", UserType.USER)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toPublicUserDTO(user)).thenReturn(publicUserDTO);

        PublicUserDTO result = userService.registerUser(request);

        assertNotNull(result);
        assertEquals(publicUserDTO, result);
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(user);
    }

    @Test
    @DisplayName("UserService should throw exception when username already exists")
    public void testRegisterUserAlreadyExists() {
        RegisterUserRequest request = new RegisterUserRequest("existinguser", "password123", "password123");

        when(userRepository.existsByUsername("existinguser")).thenReturn(true);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
            userService.registerUser(request)
        );
        assertEquals("User already exists with username", ex.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("UserService should get authenticated user")
    public void testGetAuthenticatedUser() {
        User user = new User();
        user.setUsername("authenticateduser");

        Authentication auth = new UsernamePasswordAuthenticationToken("authenticateduser", null);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(auth);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByUsername("authenticateduser")).thenReturn(Optional.of(user));

        User result = userService.getAuthenticatedUser();

        assertNotNull(result);
        assertEquals("authenticateduser", result.getUsername());
    }

    @Test
    @DisplayName("UserService should return null when no user is authenticated")
    public void testGetAuthenticatedUserNotAuthenticated() {
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(null);
        SecurityContextHolder.setContext(securityContext);

        User result = userService.getAuthenticatedUser();

        assertNull(result);
    }

    @Test
    @DisplayName("UserService should return null for anonymous authentication")
    public void testGetAuthenticatedUserAnonymous() {
        Authentication auth = mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(auth);
        SecurityContextHolder.setContext(securityContext);

        User result = userService.getAuthenticatedUser();

        assertNull(result);
    }

    @Test
    @DisplayName("UserService should hash password when registering user")
    public void testRegisterUserPasswordHashing() {
        RegisterUserRequest request = new RegisterUserRequest("testuser", "plainPassword", "plainPassword");

        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(passwordEncoder.encode("plainPassword")).thenReturn("$2a$10$hashedPassword");

        User user = new User();
        PublicUserDTO publicUserDTO = mock(PublicUserDTO.class);

        when(userMapper.toDomain(eq(request), eq("$2a$10$hashedPassword"), eq(UserType.USER))).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toPublicUserDTO(user)).thenReturn(publicUserDTO);

        userService.registerUser(request);

        verify(passwordEncoder).encode("plainPassword");
        verify(userMapper).toDomain(request, "$2a$10$hashedPassword", UserType.USER);
    }
}