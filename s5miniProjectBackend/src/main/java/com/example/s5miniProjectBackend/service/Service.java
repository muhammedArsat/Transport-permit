package com.example.s5miniProjectBackend.service;

import com.example.s5miniProjectBackend.entity.TakalUser;
import com.example.s5miniProjectBackend.entity.UserForm;

import java.util.List;

public interface Service {
    UserForm savedetails(UserForm userForm);
    
    public TakalUser savetakaldetails(TakalUser detail);
    


    List <UserForm>getAllUserDetails();







    UserForm editStatus(Integer id);

    List<UserForm> getPendingList();

    List<UserForm> getApprovedList();

    UserForm passedVehicle(Integer id);

    List<UserForm> getPassedList();

    List<TakalUser> getPendingTakkalUser();

    TakalUser takkalApproved(Integer id);

    long getApprovedCount();
    long countApprovedUserFormsByEmail(String email);

    long countPendingByEmail(String email);

    List<UserForm> getAppliedPermitsByEmail(String email);

    long findTotApplicationByEmail(String email);
}
