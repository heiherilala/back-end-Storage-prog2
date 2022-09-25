package com.storage.model.validation;

import com.storage.exception.BadRequestException;
import com.storage.model.Store;
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
public class StoreValidator implements Consumer<Store> {
    private final Validator validator;

    public void accept(List<Store> stores) {
        stores.forEach(this::accept);
    }

    @Override public void accept(Store store) {
        Set<ConstraintViolation<Store>> violations = validator.validate(store);
        if (!violations.isEmpty()) {
            String constraintMessages = violations
                    .stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(". "));
            throw new BadRequestException(constraintMessages);
        }
    }
}