package com.storage.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Store implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idStore;

    @NotBlank(message = "Store name is mandatory")
    @Column(length = 100, unique = true)
    private String name;

    @Column(nullable = false )
    private boolean booleanFull;

    @NotBlank(message = "Store unit is mandatory")
    @Column(length = 100, unique = true)
    private String place;

    private Long actualWeigthKg;

    private Long actualVolumeM3;

    @Column(nullable = false)
    private Long maxWeigthKg;

    @Column(nullable = false)
    private Long maxVolumeM3;
}
