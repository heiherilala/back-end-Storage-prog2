package com.storage.model.validation;

import com.storage.exception.BadRequestException;
import com.storage.model.Use;
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
public class UseValidator implements Consumer<Use> {
    private final Validator validator;

    public void accept(List<Use> uses) {
        uses.forEach(this::accept);
    }

    @Override public void accept(Use use) {
        Set<ConstraintViolation<Use>> violations = validator.validate(use);
        if (!violations.isEmpty()) {
            String constraintMessages = violations
                    .stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(". "));
            throw new BadRequestException(constraintMessages);
        }
    }
}
