package com.storage.repository;

import com.storage.model.Store;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store,Long> {
    List<Store> findByNameIgnoreCase(String name, Pageable pageable);
    Optional<Store> findStoreByNameIgnoreCase(String name);

}
