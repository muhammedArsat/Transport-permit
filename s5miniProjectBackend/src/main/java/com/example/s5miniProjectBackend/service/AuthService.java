package com.example.s5miniProjectBackend.service;


import com.example.s5miniProjectBackend.dto.ReqRes;
import com.example.s5miniProjectBackend.entity.OurUsers;
import com.example.s5miniProjectBackend.repository.OurUserRepo;
import com.example.s5miniProjectBackend.service.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private OurUserRepo ourUserRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;
    public ReqRes signUp(ReqRes registrationRequest) {
        ReqRes response = new ReqRes();

        try {
            // Check if a user with the provided email already exists
            Optional<OurUsers> existingUser = ourUserRepo.findByEmail(registrationRequest.getEmail());
            if (existingUser.isPresent()) {
                response.setStatusCode(400); // Bad Request
                response.setMessage("User already registered");
                return response;
            }

            // Proceed with registration if the user does not exist
            OurUsers ourUsers = new OurUsers();
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUsers.setRole(registrationRequest.getRole());
            ourUsers.setPhone(registrationRequest.getPhone());

            OurUsers ourUserResult = ourUserRepo.save(ourUsers);
            if (ourUserResult != null) {
                response.setStatusCode(200);
                response.setMessage("Successfully added");
            }

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("An error occurred during registration");
        }

        return response;
    }


    public ReqRes signIn(ReqRes signInRequest)
    {
        ReqRes response = new ReqRes();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
            var user = ourUserRepo.findByEmail(signInRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);

            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(),user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24hr");
            response.setRole(user.getRole());
            response.setEmail(user.getEmail());
            response.setMessage("Successfully Signed In");

        }catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenRequest)
    {
        ReqRes response = new ReqRes();
        String ourEmail = jwtUtils.extractUsername(refreshTokenRequest.getRefreshToken());
        OurUsers users = ourUserRepo.findByEmail(ourEmail).orElseThrow();
        if(jwtUtils.isTokenValid(refreshTokenRequest.getToken(),users)){
            var jwt = jwtUtils.generateToken(users);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenRequest.getToken());
            response.setExpirationTime("24hr");
            response.setMessage("Successfully  Refreshed");

        }
        response.setStatusCode(500);
        return response;
    }

}
