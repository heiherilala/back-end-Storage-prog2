package com.storage.repository;

import com.storage.model.Stored;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoredRepository extends JpaRepository<Stored, Long> {
    List<Stored> findAllByStore_IdStore(long reference);
    List<Stored> findAllByMaterial_IdMaterial(long reference);

    List<Stored> findAllByMaterial_IdMaterialAndStore_IdStore(long referenceMaterial, long referenceStore);

    List<Stored> findAll();
}
