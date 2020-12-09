package com.nghiahd.authenticationtest.config.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import javax.websocket.server.PathParam;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final static String MESSAGE_ENDPOINT = "/message/{username}";


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        webSocketHandlerRegistry.addHandler(getMessageWebSocketHandler(), MESSAGE_ENDPOINT)
                .setAllowedOrigins("*");
    }
    @Bean
    public WebSocketHandler getMessageWebSocketHandler(){
        return new MessageWebSocketHandler();
    }
}
