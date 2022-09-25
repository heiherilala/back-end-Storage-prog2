package com.storage.controller;

import com.storage.model.Buy;
import com.storage.model.Use;
import com.storage.model.UseCreat;
import com.storage.service.UseService;
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
public class UseController {
    private UseService useService;

    @GetMapping("/uses")
    public List<Use> getUses(@RequestParam int page,
                             @RequestParam(value = "page_size") int pageSize){
        return useService.getUses(page, pageSize);
    }

    @GetMapping("/uses/{id}")
    public Use getWorkerById(@PathVariable Long id) throws Exception {
        return useService.getUsesById(id);
    }

    @PostMapping("/uses")
    public Use addUse(@Valid @RequestBody Use use){
        return useService.postUse(use);
    }
    @PostMapping("/uses/by-material")
    public Use addUseToMaterial(@RequestBody UseCreat useCreat){
        return useService.postUseByMaterial(useCreat);
    }
}
