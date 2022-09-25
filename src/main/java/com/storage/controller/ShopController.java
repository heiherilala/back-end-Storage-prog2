package com.storage.controller;

import com.storage.model.Shop;
import com.storage.service.ShopService;
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
public class ShopController {
    private ShopService shopService;
    @GetMapping("/shops")
    public List<Shop> getShops(@RequestParam int page,
                               @RequestParam(value = "page_size") int pageSize,
                               @RequestParam(value = "name",required = false) String name){
        return shopService.getShops(page, pageSize, name);
    }
    @GetMapping("/shops/{id}")
    public Shop getShopById(@PathVariable Long id) throws Exception {
        return shopService.getShopById(id);
    }
    @PostMapping("/shops")
    public Shop postShop(@Valid @RequestBody Shop Shop){
        return shopService.postShop(Shop);
    }
    @PutMapping("/shops/{id}")
    public Shop updateShopById(@PathVariable Long id, @Valid @RequestBody Shop newShop) throws Exception {
        return shopService.putUpdateShopById(id, newShop);
    }
}
