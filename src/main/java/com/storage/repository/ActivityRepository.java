package com.storage.repository;

import com.storage.model.Activity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityRepository extends JpaRepository<Activity,Long> {
    List<Activity> findByNameIgnoreCase(String name, Pageable pageable);
    Optional<Activity> findActivityByNameIgnoreCase(String name);

}
