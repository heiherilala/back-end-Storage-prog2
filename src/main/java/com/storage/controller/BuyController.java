package com.storage.controller;

import com.storage.model.*;
import com.storage.service.BuyService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
public class BuyController {
    private BuyService buyService;

    @GetMapping("/buys")
    public List<Buy> getBuys(@RequestParam int page,
                             @RequestParam(value = "page_size") int pageSize){
        return buyService.getBuys(page, pageSize);
    }

    @GetMapping("/buys/{id}")
    public Buy getBuy(@PathVariable Long id) throws Exception {
        return buyService.getBuysById(id);
    }

    @PostMapping("/buys")
    public Buy addBuy(@Valid @RequestBody Buy byu){
        return buyService.postBuy(byu);
    }

    @PostMapping("/buys/by-material")
    public Buy addMoveByStore(@Valid @RequestBody BuyCreat buyCreat){
        return buyService.postBuyByToterial(buyCreat);
    }
}
