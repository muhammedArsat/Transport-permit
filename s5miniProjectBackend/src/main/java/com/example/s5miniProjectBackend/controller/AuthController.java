package com.example.s5miniProjectBackend.controller;


import com.example.s5miniProjectBackend.dto.ReqRes;
import com.example.s5miniProjectBackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {


    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ReqRes> signup(@RequestBody ReqRes signuprequest){
        return ResponseEntity.ok(authService.signUp(signuprequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<ReqRes> signin(@RequestBody ReqRes signInRequest){
        return  ResponseEntity.ok(authService.signIn(signInRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes refreshToekenRequest){
        return  ResponseEntity.ok(authService.refreshToken(refreshToekenRequest));
    }
}
