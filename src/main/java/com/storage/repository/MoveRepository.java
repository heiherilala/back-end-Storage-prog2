package com.storage.repository;

import com.storage.model.Move;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoveRepository extends JpaRepository<Move, Long> {
    List<Move> findAllByStoredTake_IdStored(long reference);
    List<Move> findAllByStoredGive_IdStored(long reference);

    List<Move> findAll();
}
