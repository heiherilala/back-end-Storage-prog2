package com.storage.repository;

import com.storage.model.Material;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRepository extends JpaRepository<Material,Long> {
    List<Material> findByNameIgnoreCase(String name, Pageable pageable);
    Optional<Material> findMaterialByNameIgnoreCase(String name);

}
