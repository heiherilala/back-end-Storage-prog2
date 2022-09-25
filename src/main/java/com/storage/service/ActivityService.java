package com.storage.service;

import com.storage.exception.BadRequestException;
import com.storage.exception.ResourceNotFoundException;
import com.storage.model.Activity;
import com.storage.model.validation.ActivityValidator;
import com.storage.repository.ActivityRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.data.domain.Sort.Direction.ASC;

@Service
@AllArgsConstructor
public class ActivityService {
    private ActivityRepository activityRepository;
    ActivityValidator activityValidator;


    //GET MAPPING
    public List<Activity> getActivitys(int page, int pageSize, String name) {
        if(page<1){
            throw new BadRequestException("page must be >=1");
        }
        if(pageSize>200){
            throw new BadRequestException("page size too large, must be <=200");
        }
        Pageable pageable = PageRequest.of(page - 1,pageSize,
                Sort.by(ASC,"name"));
        Pageable withoutName = PageRequest.of(page - 1,pageSize);
        if (name==null){
            return activityRepository.findAll(withoutName).toList();
        }
        return activityRepository.findByNameIgnoreCase(name, pageable);
    }

    //GET MAPPING BY ID
    public Activity getActivityById(Long id) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Activity with id "+id+" does not exist"));
        return activity;
    }

    //POST MAPPING
    @Transactional
    public Activity postActivity(Activity activity) {
        activityValidator.accept(activity);
        Optional<Activity> activityByName = activityRepository.findActivityByNameIgnoreCase(activity.getName());
        if (activityByName.isPresent()){
            throw new BadRequestException("Activity is already existed");
        }
        activityRepository.save(activity);
        return activity;
    }

    //PUT MAPPING
    @Transactional
    public Activity putUpdateActivityById(Long id, Activity newActivity) {
        activityValidator.accept(newActivity);
        Activity activity = activityRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Worker with id "+id+" does not exists"));
        // Test sans !=null et .length>0
        if(!Objects.equals(newActivity.getName(),activity.getName())){
            activity.setName(newActivity.getName());
        }
        if(!Objects.equals(newActivity.getDescription(),activity.getDescription())){
            activity.setDescription(newActivity.getDescription());
        }
        return activity;
    }
}
