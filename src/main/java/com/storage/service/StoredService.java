package com.storage.service;

import com.storage.exception.BadRequestException;
import com.storage.exception.ResourceNotFoundException;

import com.storage.model.Material;
import com.storage.model.Shop;
import com.storage.model.Store;
import com.storage.model.Stored;
import com.storage.model.validation.MaterialValidator;
import com.storage.model.validation.ShopValidator;
import com.storage.model.validation.StoreValidator;
import com.storage.model.validation.StoredValidator;
import com.storage.repository.MaterialRepository;
import com.storage.repository.ShopRepository;
import com.storage.repository.StoreRepository;
import com.storage.repository.StoredRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StoredService {
    StoredRepository storedRepository;
    StoredValidator storedValidator;
    MaterialRepository materialRepository;
    StoreRepository storeRepository;
    StoreValidator storeValidator;

    MaterialValidator materialValidator;

    public List<Stored> getStoreds(int page, int pageSize) {
        if(page<1){
            throw new BadRequestException("page must be >=1");
        }
        if(pageSize>200){
            throw new BadRequestException("page size too large, must be <=200");
        }
        Pageable pageable = PageRequest.of(page - 1,pageSize);
        return storedRepository.findAll(pageable).toList();
    }

    public Stored getStoredsById(Long id) {
        Stored stored = storedRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Worker with id "+id+" does not exists"));
        return stored;
    }

    public List<Stored> getStoredByIdStore(Long idStore){
        List<Stored> storeds = storedRepository.findAllByStore_IdStore(idStore);
        return storeds;
    }

    public List<Stored> getStoredByIdMaterial(Long idMaterial){
        List<Stored> storeds = storedRepository.findAllByMaterial_IdMaterial(idMaterial);
        return storeds;
    }

    public List<Stored> getStoredByIdMaterialaAndStore(Long idMaterial, Long idStore){
        List<Stored> storeds = storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(idMaterial, idStore);
        return storeds;
    }

    //POST MAPPING
    @Transactional
    public Stored postStored(Stored stored) {
        storedValidator.accept(stored);
        Store storeById = storeRepository.findById(stored.getStore().getIdStore())
                .orElseThrow(()-> new BadRequestException("Shop whith id "+stored.getStore().getIdStore()+" does'nt existed"));
        Material materialById = materialRepository.findById(stored.getMaterial().getIdMaterial())
                .orElseThrow(()-> new BadRequestException("Material whith id "+stored.getMaterial().getIdMaterial()+" doesn't existed"));
        List<Stored> listStored = storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(stored.getMaterial().getIdMaterial(),stored.getStore().getIdStore());
        if (listStored.size() > 0) {
            Stored newStore = stored;
            if (stored.getQuantity() != null) {
                newStore.setQuantity(newStore.getQuantity()+stored.getQuantity());
            }
            return newStore;
        }

        stored.setStore(storeById);
        stored.setMaterial(materialById);
        stored.setQuantity(0L);
        storedRepository.save(stored);
        return stored;
    }

    //Put MAPPING
    @Transactional
    public Stored putStored(Long id, Stored stored) {
        storedValidator.accept(stored);
        Stored actualStored = storedRepository.findById(id)
                .orElseThrow(()-> new BadRequestException("Stored with id "+id+" does not exists"));
        Store storeById = storeRepository.findById(stored.getStore().getIdStore())
                .orElseThrow(()-> new BadRequestException("Shop doesn't existed"));
        Material materialById = materialRepository.findById(stored.getMaterial().getIdMaterial())
                .orElseThrow(()-> new BadRequestException("Material doesn't existed"));
        List<Stored> listStored = storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(stored.getMaterial().getIdMaterial(),stored.getStore().getIdStore());
        if (listStored.size() > 0) {
            throw  new BadRequestException("Thet Store id alredy exists");
        }
        actualStored.setStore(stored.getStore());
        actualStored.setMaterial(stored.getMaterial());
        storedRepository.save(actualStored);
        return actualStored;
    }

}
