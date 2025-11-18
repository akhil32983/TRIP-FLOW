package com.tripflow.websocket;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.messaging.support.ChannelInterceptor;

@Component
public class StompAuthChannelInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String username = (String) accessor.getSessionAttributes().get("username");
            if (username != null) {
                accessor.setUser(new UsernamePasswordAuthenticationToken(username, null, null));
            } else {
                throw new IllegalArgumentException("No valid JWT found in cookie");
            }
        }

        return message;
    }
}
