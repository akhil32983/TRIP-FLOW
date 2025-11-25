package com.tripflow.controller.v1;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tripflow.dto.shared.PaginatedDTO;
import com.tripflow.dto.user.PublicUserDTO;
import com.tripflow.dto.user.UpdateUserRequest;
import com.tripflow.service.UserService;

import java.net.URI;

import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/users")
public class RestUserController {
    private final UserService userService;

    public RestUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<PaginatedDTO<PublicUserDTO>> getAllUsers(
        @PageableDefault(page = 0, size = 10) Pageable pageable
    ) {
        try {
            PaginatedDTO<PublicUserDTO> users = this.userService.getAllUsers(pageable);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<PublicUserDTO> getUserByUsername(@PathVariable String username) {
        try {
            PublicUserDTO user = this.userService.getPublicUserByUsername(username);
            return ResponseEntity.ok(user);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{username}")
    public ResponseEntity<PublicUserDTO> updateUser(
        @PathVariable String username, @RequestBody UpdateUserRequest request
    ) {
        try {
            PublicUserDTO user = this.userService.updateUser(username, request);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
            return ResponseEntity.ok().location(location).body(user);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        try {
            this.userService.deleteUser(username);
            return ResponseEntity.noContent().build();
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{username}/avatar")
    public ResponseEntity<PublicUserDTO> uploadAvatar(
        @PathVariable String username, @RequestParam MultipartFile avatar
    ) {
        try {
            PublicUserDTO user = this.userService.uploadAvatar(username, avatar);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
            return ResponseEntity.ok().location(location).body(user);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{username}/avatar")
    public ResponseEntity<Resource> getAvatar(@PathVariable String username) {
        try {
            Resource resource = this.userService.getAvatar(username);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
