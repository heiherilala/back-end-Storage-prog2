package com.storage.controller;

import com.storage.model.Activity;
import com.storage.service.ActivityService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
public class ActivityController {
    private ActivityService activityService;

    @GetMapping("/activitys")
    public List<Activity> getActivitys(@RequestParam int page,
                                     @RequestParam(value = "page_size") int pageSize,
                                     @RequestParam(value = "name",required = false) String name){
        return activityService.getActivitys(page, pageSize, name);
    }

    @GetMapping("/activitys/{id}")
    public Activity getActivityById(@PathVariable Long id) throws Exception {
        return activityService.getActivityById(id);
    }
    @PostMapping("/activitys")
    public Activity postActivity(@Valid @RequestBody Activity Activity){
        return activityService.postActivity(Activity);
    }

    @PutMapping("/activitys/{id}")
    public Activity updateActivityById(@PathVariable Long id, @Valid @RequestBody Activity newActivity) throws Exception {
        return activityService.putUpdateActivityById(id, newActivity);
    }
}
