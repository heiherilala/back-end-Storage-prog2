package com.storage.repository;

import com.storage.model.Shop;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShopRepository extends JpaRepository<Shop,Long> {
    List<Shop> findByNameIgnoreCase(String name, Pageable pageable);
    Optional<Shop> findShopByNameIgnoreCase(String name);

}
