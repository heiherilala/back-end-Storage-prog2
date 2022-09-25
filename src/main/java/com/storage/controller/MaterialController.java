package com.storage.controller;

import com.storage.model.Material;
import com.storage.service.MaterialService;
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
public class MaterialController {
    private MaterialService materialService;

    @GetMapping("/materials")
    public List<Material> getMaterials(@RequestParam int page,
                                     @RequestParam(value = "page_size") int pageSize,
                                     @RequestParam(value = "name",required = false) String name){
        return materialService.getMaterials(page, pageSize, name);
    }

    @GetMapping("/materials/{id}")
    public Material getMaterialById(@PathVariable Long id) throws Exception {
        return materialService.getMaterialById(id);
    }
    @PostMapping("/materials")
    public Material postMaterial(@Valid @RequestBody Material Material){
        return materialService.postMaterial(Material);
    }

    @PutMapping({"/materials/{id}", "/materials"})
    public Material updateMaterialById(@PathVariable Long id, @Valid @RequestBody Material newMaterial) throws Exception {
        return materialService.modifMaterial(id, newMaterial);
    }
}
