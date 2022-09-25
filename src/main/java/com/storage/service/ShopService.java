package com.storage.service;

import com.storage.exception.BadRequestException;
import com.storage.exception.ResourceNotFoundException;
import com.storage.model.Shop;
import com.storage.model.validation.ShopValidator;
import com.storage.repository.ShopRepository;
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
public class ShopService {
    private ShopRepository shopRepository;
    ShopValidator shopValidator;


    //GET MAPPING
    public List<Shop> getShops(int page, int pageSize, String name) {
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
            return shopRepository.findAll(withoutName).toList();
        }
        return shopRepository.findByNameIgnoreCase(name, pageable);
    }

    //GET MAPPING BY ID
    public Shop getShopById(Long id) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Shop with id "+id+" does not exist"));
        return shop;
    }

    //POST MAPPING
    @Transactional
    public Shop postShop(Shop shop) {
        shopValidator.accept(shop);
        Optional<Shop> shopByName = shopRepository.findShopByNameIgnoreCase(shop.getName());
        if (shopByName.isPresent()){
            throw new BadRequestException("Shop is already existed");
        }
        shopRepository.save(shop);
        return shop;
    }

    //PUT MAPPING
    @Transactional
    public Shop putUpdateShopById(Long id, Shop newShop) {
        shopValidator.accept(newShop);
        Shop shop = shopRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Worker with id "+id+" does not exists"));
        // Test sans !=null et .length>0
        if((!Objects.equals(newShop.getName(),shop.getName()))){
            shop.setName(newShop.getName());
        }
        if((!Objects.equals(newShop.getDescription(),shop.getDescription()))){
            shop.setDescription(newShop.getDescription());
        }
        if((!Objects.equals(newShop.getPlace(),shop.getPlace()))){
            shop.setPlace(newShop.getPlace());
        }
        return shop;
    }
}
