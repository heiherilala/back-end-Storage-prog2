package com.storage.service;

import com.storage.exception.BadRequestException;
import com.storage.exception.ResourceNotFoundException;
import com.storage.model.Store;
import com.storage.model.validation.StoreValidator;
import com.storage.repository.StoreRepository;
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
public class StoreService {
    private StoreRepository storeRepository;
    StoreValidator storeValidator;


    //GET MAPPING
    public List<Store> getStores(int page, int pageSize, String name) {
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
            return storeRepository.findAll(withoutName).toList();
        }
        return storeRepository.findByNameIgnoreCase(name, pageable);
    }

    //GET MAPPING BY ID
    public Store getStoreById(Long id) {
        Store store = storeRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Store with id "+id+" does not exist"));
        return store;
    }

    //POST MAPPING
    @Transactional
    public Store postStore(Store store) {
        storeValidator.accept(store);
        Optional<Store> storeByName = storeRepository.findStoreByNameIgnoreCase(store.getName());
        if (storeByName.isPresent()){
            throw new BadRequestException("Store is already existed");
        }
        Store newStore = store;
        newStore.setActualVolumeM3(0L);
        newStore.setActualWeigthKg(0L);
        newStore.setBooleanFull(false);
        storeRepository.save(newStore);
        return newStore;
    }

    //PUT MAPPING
    @Transactional
    public Store putUpdateStoreById(Long id, Store newStore) {
        storeValidator.accept(newStore);
        Store store = storeRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Worker with id "+id+" does not exists"));
        // Test sans !=null et .length>0
        if(!Objects.equals(newStore.getName(),store.getName())){
            store.setName(newStore.getName());
        }
        if(!Objects.equals(newStore.getPlace(),store.getPlace())){
            store.setPlace(newStore.getPlace());
        }
        if(!Objects.equals(newStore.getMaxVolumeM3(),store.getMaxVolumeM3())){
            store.setMaxVolumeM3(newStore.getMaxVolumeM3());
        }
        if(!Objects.equals(newStore.getMaxWeigthKg(),store.getMaxWeigthKg())){
            store.setMaxWeigthKg(newStore.getMaxWeigthKg());
        }
        return store;
    }
}
