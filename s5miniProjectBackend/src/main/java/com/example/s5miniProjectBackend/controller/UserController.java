package com.example.s5miniProjectBackend.controller;

import com.example.s5miniProjectBackend.entity.TakalUser;
import com.example.s5miniProjectBackend.entity.UserForm;
import com.example.s5miniProjectBackend.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {


    @Autowired
    public Service service;


/*
*User Normal Form Registration
*
* */
    @PostMapping("/normal-application")
    public String add(@RequestBody UserForm userForm) {
        service.savedetails(userForm);
        return "User Details Added Successfully!!!";
    }





    /*
     *  *************************************************************************************************
     *  **************************************************************************************************
     *  **************************************************************************************************
     *  **************************************************************************************************
     *  **************************************************************************************************
     */




    /*
    User Takkal Form Registration
     */

    @PostMapping("/tatkal-application")
    public String takaladd(@RequestBody TakalUser detail) {
        service.savetakaldetails(detail);
        return "User Details Added Successfully!!!";
    }

    /*
    *  *************************************************************************************************
    *  **************************************************************************************************
    *  **************************************************************************************************
    *  **************************************************************************************************
    *  **************************************************************************************************
     */


    /*
    Dash Board Codings
     */



    /*
    Approved Applications Counts
     */

    @GetMapping("/approvedCount/{email}")
    public ResponseEntity<Long> getApprovedCount(@PathVariable String email) {
        long count = service.countApprovedUserFormsByEmail(email);
        return ResponseEntity.ok(count);
    }



    /*
    Pending Applications Counts
     */
    @GetMapping("/pendingCount/{email}")
    public ResponseEntity<Long> getPendingCount(@PathVariable String email) {
        long count = service.countPendingByEmail(email);
        return ResponseEntity.ok(count);
    }





    /*
    Total Applications Count Which Includes Normal And Takkal
     */
    @GetMapping("/totApplicationCount/{email}")
    public ResponseEntity<Long> getTotApplicationCount(@PathVariable String email) {
        long count = service.findTotApplicationByEmail(email);
        return ResponseEntity.ok(count);
    }






    /*
    Lists of All Applications Which Includes Normal and Takkal
     */
    @GetMapping("/applied-permits/{email}")
    public ResponseEntity<List<UserForm>> getAppliedPermits(@PathVariable String email) {
        List<UserForm> appliedPermits = service.getAppliedPermitsByEmail(email);
        return ResponseEntity.ok(appliedPermits);
    }




    @GetMapping("/approvedcount")
    public long getApprovedCount(){
        return service.getApprovedCount();
    }

}
