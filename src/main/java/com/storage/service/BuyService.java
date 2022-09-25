package com.storage.service;

import com.storage.exception.BadRequestException;
import com.storage.exception.ResourceNotFoundException;
import com.storage.model.*;
import com.storage.model.validation.BuyValidator;
import com.storage.model.validation.ShopValidator;
import com.storage.model.validation.StoreValidator;
import com.storage.model.validation.StoredValidator;
import com.storage.repository.MaterialRepository;
import com.storage.repository.ShopRepository;
import com.storage.repository.BuyRepository;
import com.storage.repository.StoreRepository;
import com.storage.repository.StoredRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class BuyService {
    BuyRepository buyRepository;
    BuyValidator buyValidator;
    ShopRepository shopRepository;
    StoredRepository storedRepository;
    StoreRepository storeRepository;
    MaterialRepository materialRepository;
    public List<Buy> getBuys(int page, int pageSize) {
        if(page<1){
            throw new BadRequestException("page must be >=1");
        }
        if(pageSize>200){
            throw new BadRequestException("page size too large, must be <=200");
        }
        Pageable pageable = PageRequest.of(page - 1,pageSize);
        return buyRepository.findAll(pageable).toList();
    }

    public Buy getBuysById(Long id) {
        Buy buy = buyRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Buy with id "+id+" does not exists"));
        return buy;
    }

    public List<Buy> getBuyByIdStored(Long idStored){
        List<Buy> buys = buyRepository.findAllByStored_IdStored(idStored);
        return buys;
    }

    public List<Buy> getBuyByIdShop(Long idShop){
        List<Buy> buys = buyRepository.findAllByShop_IdShop(idShop);
        return buys;
    }
    @Transactional
    public Buy postBuy(Buy buy){
        buyValidator.accept(buy);
        Stored stored = storedRepository.findById(buy.getStored().getIdStored())
                .orElseThrow(()->new ResourceNotFoundException("Stored with id "+buy.getStored().getIdStored()+" does not exists"));
        Shop shop = shopRepository.findById(buy.getShop().getIdShop())
                .orElseThrow(()->new ResourceNotFoundException("Shop with id "+buy.getStored().getIdStored()+" does not exists"));
        Store store = stored.getStore();
        if ((store.getMaxWeigthKg()<store.getActualWeigthKg())||(store.getMaxVolumeM3()<store.getActualVolumeM3())) {
            store.setBooleanFull(true);
            throw new ResourceNotFoundException("thit store is full");
        };
        store.setActualWeigthKg(store.getActualWeigthKg()+buy.getQuantity()*stored.getMaterial().getWeightKgUnit());
        store.setActualVolumeM3(store.getActualVolumeM3()+buy.getQuantity()*stored.getMaterial().getVolumeM3Unit());
        stored.setQuantity(stored.getQuantity()+buy.getQuantity());
        if ((store.getMaxWeigthKg()<store.getActualWeigthKg())||(store.getMaxVolumeM3()<store.getActualVolumeM3())) {
            store.setBooleanFull(true);
        };
        buy.setShop(shop);
        buy.setStored(stored);
        buy.setDateBuy(LocalDate.now());
        buyRepository.save(buy);
        return buy;
    }

    @Transactional
    public Buy postBuyByToterial(BuyCreat buyCreat){
        Shop shopById = shopRepository.findById(buyCreat.getShop().getIdShop())
                .orElseThrow(()->new ResourceNotFoundException("Shop with id "+buyCreat.getShop().getIdShop()+" does not exists"));
        Material materialById = materialRepository.findById(buyCreat.getMaterial().getIdMaterial())
                .orElseThrow(()->new ResourceNotFoundException("Material with id "+buyCreat.getMaterial().getIdMaterial()+" does not exists"));
        Store storeById = storeRepository.findById(buyCreat.getStore().getIdStore())
                .orElseThrow(()->new ResourceNotFoundException("Store with id "+buyCreat.getStore().getIdStore()+" does not exists"));
        if (storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(materialById.getIdMaterial(),storeById.getIdStore()).size()<1) {
            Stored newStored = new Stored();
            newStored.setQuantity(0L);
            newStored.setMaterial(materialById);
            newStored.setStore(storeById);
            storedRepository.save(newStored);
        }
        Stored storedTake = storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(materialById.getIdMaterial(),storeById.getIdStore()).get(0);
        Buy newBuy = new Buy();
        newBuy.setQuantity(buyCreat.getQuantity());
        newBuy.setStored(storedTake);
        newBuy.setShop(shopById);
        newBuy.setCost(buyCreat.getCost());
        return postBuy(newBuy);
    }
}
