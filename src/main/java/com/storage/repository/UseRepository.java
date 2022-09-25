package com.storage.repository;

import com.storage.model.Use;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UseRepository extends JpaRepository<Use, Long> {
    List<Use> findAllByStored_IdStored(long reference);
    List<Use> findAllByActivity_IdActivity(long reference);

    List<Use> findAll();
}
