package com.storage.service;

import com.storage.exception.BadRequestException;
import com.storage.exception.ResourceNotFoundException;
import com.storage.model.Material;
import com.storage.model.validation.MaterialValidator;
import com.storage.repository.MaterialRepository;
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
public class MaterialService {
    private MaterialRepository materialRepository;
    MaterialValidator materialValidator;


    //GET MAPPING
    public List<Material> getMaterials(int page, int pageSize, String name) {
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
            return materialRepository.findAll(withoutName).toList();
        }
        return materialRepository.findByNameIgnoreCase(name, pageable);
    }

    //GET MAPPING BY ID
    public Material getMaterialById(Long id) {
        Material material = materialRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Material with id "+id+" does not exist"));
        return material;
    }

    //POST MAPPING
    @Transactional
    public Material postMaterial(Material material) {
        materialValidator.accept(material);
        Optional<Material> materialByName = materialRepository.findMaterialByNameIgnoreCase(material.getName());
        if (materialByName.isPresent()){
            throw new BadRequestException("Material is already existed");
        }
        materialRepository.save(material);
        return material;
    }

    //PUT MAPPING
    @Transactional
    public Material putUpdateMaterialById(Long id, Material newMaterial) {
        materialValidator.accept(newMaterial);
        Material material = materialRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Worker with id "+id+" does not exists"));
        // Test sans !=null et .length>0
        if(!Objects.equals(newMaterial.getName(),material.getName())){
            material.setName(newMaterial.getName());
        }
        if(!Objects.equals(newMaterial.getDescription(),material.getDescription())){
            material.setDescription(newMaterial.getDescription());
        }
        if(!Objects.equals(newMaterial.getLimitMax(),material.getLimitMax())){
            material.setLimitMax(newMaterial.getLimitMax());
        }
        if(!Objects.equals(newMaterial.getLimitMin(),material.getLimitMin())){
            material.setLimitMin(newMaterial.getLimitMin());
        }
        if(!Objects.equals(newMaterial.getUnit(),material.getUnit())){
            material.setUnit(newMaterial.getUnit());
        }
        if(!Objects.equals(newMaterial.getVolumeM3Unit(),material.getVolumeM3Unit())){
            material.setVolumeM3Unit(newMaterial.getVolumeM3Unit());
        }
        if(!Objects.equals(newMaterial.getWeightKgUnit(),material.getWeightKgUnit())){
            material.setWeightKgUnit(newMaterial.getWeightKgUnit());
        }

        return material;
    }

    @Transactional
    public Material modifMaterial(Long id, Material newMaterial){
        if (id == null) {
            return postMaterial(newMaterial);
        }else {
            return putUpdateMaterialById(id, newMaterial);
        }
    }
}
