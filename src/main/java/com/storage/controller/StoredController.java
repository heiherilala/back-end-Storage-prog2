package com.storage.controller;

import com.storage.model.Store;
import com.storage.model.Stored;
import com.storage.service.StoredService;
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
public class StoredController {
    private StoredService storedService;

    @GetMapping("/storeds")
    public List<Stored> getStoreds(@RequestParam int page,
                                     @RequestParam(value = "page_size") int pageSize){
        return storedService.getStoreds(page, pageSize);
    }
    @GetMapping("/storeds/{id}")
    public Stored getWorkerById(@PathVariable Long id) throws Exception {
        return storedService.getStoredsById(id);
    }

    @PostMapping("/storeds")
    public Stored addStored(@Valid @RequestBody Stored stored){
        return storedService.postStored(stored);
    }

    @PutMapping("/storeds/{id}")
    public Stored updateStored(@PathVariable Long id , @Valid @RequestBody Stored stored){
        return storedService.postStored(stored);
    }
}
