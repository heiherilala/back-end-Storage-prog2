package com.storage.controller;

import com.storage.model.Store;
import com.storage.service.StoreService;
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
public class StoreController {
    private StoreService storeService;

    @GetMapping("/stores")
    public List<Store> getStores(@RequestParam int page,
                                     @RequestParam(value = "page_size") int pageSize,
                                     @RequestParam(value = "name",required = false) String name){
        return storeService.getStores(page, pageSize, name);
    }

    @GetMapping("/stores/{id}")
    public Store getStoreById(@PathVariable Long id) throws Exception {
        return storeService.getStoreById(id);
    }

    @PostMapping("/stores")
    public Store postStore(@Valid @RequestBody Store Store){
        return storeService.postStore(Store);
    }

    @PutMapping("/stores/{id}")
    public Store updateStoreById(@PathVariable Long id, @Valid @RequestBody Store newStore) throws Exception {
        return storeService.putUpdateStoreById(id, newStore);
    }
}
