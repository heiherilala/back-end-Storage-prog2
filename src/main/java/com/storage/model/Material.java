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
public class Material implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMaterial;

    @NotBlank(message = "Material name is mandatory")
    @Column(length = 100, unique = true)
    private String name;

    @Column(nullable = false)
    private Long volumeM3Unit;

    @Column(nullable = false)
    private Long weightKgUnit;

    private String description;

    @NotBlank(message = "Material unit is mandatory")
    @Column(length = 100, unique = true)
    private String unit;

    @Column(nullable = false)
    private Long limitMax;

    @Column(nullable = false)
    private Long limitMin;
}
