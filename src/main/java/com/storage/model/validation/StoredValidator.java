package com.storage.model.validation;

import com.storage.exception.BadRequestException;
import com.storage.model.Stored;
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
public class StoredValidator implements Consumer<Stored> {
    private final Validator validator;

    public void accept(List<Stored> storeds) {
        storeds.forEach(this::accept);
    }

    @Override public void accept(Stored stored) {
        Set<ConstraintViolation<Stored>> violations = validator.validate(stored);
        if (!violations.isEmpty()) {
            String constraintMessages = violations
                    .stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(". "));
            throw new BadRequestException(constraintMessages);
        }
    }
}
