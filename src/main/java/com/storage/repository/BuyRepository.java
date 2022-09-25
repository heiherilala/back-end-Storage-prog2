package com.storage.repository;

import com.storage.model.Buy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyRepository extends JpaRepository<Buy, Long> {
    List<Buy> findAllByStored_IdStored(long reference);
    List<Buy> findAllByShop_IdShop(long reference);

    List<Buy> findAll();
}
