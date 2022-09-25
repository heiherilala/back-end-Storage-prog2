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
public class UseCreat implements Serializable {

    private long quantity;
    private Activity activity;
    private Material material;
    private Store store;
}
