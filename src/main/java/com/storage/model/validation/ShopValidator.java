package com.storage.model.validation;

import com.storage.exception.BadRequestException;
import com.storage.model.Shop;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ShopValidator implements Consumer<Shop> {
    private final Validator validator;

    public void accept(List<Shop> shops) {
        shops.forEach(this::accept);
    }

    @Override public void accept(Shop shop) {
        Set<ConstraintViolation<Shop>> violations = validator.validate(shop);
        if (!violations.isEmpty()) {
            String constraintMessages = violations
                    .stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(". "));
            throw new BadRequestException(constraintMessages);
        }
    }
}