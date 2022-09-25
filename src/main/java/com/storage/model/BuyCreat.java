package com.storage.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class BuyCreat implements Serializable {
    private long quantity;
    private long cost;
    private Shop shop;
    private Material material;
    private Store store;
}
