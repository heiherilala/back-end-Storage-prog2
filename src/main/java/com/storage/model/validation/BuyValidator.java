package com.storage.model.validation;

import com.storage.exception.BadRequestException;
import com.storage.model.Buy;
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
public class BuyValidator implements Consumer<Buy> {
    private final Validator validator;

    public void accept(List<Buy> buys) {
        buys.forEach(this::accept);
    }

    @Override public void accept(Buy buy) {
        Set<ConstraintViolation<Buy>> violations = validator.validate(buy);
        if (!violations.isEmpty()) {
            String constraintMessages = violations
                    .stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(". "));
            throw new BadRequestException(constraintMessages);
        }
    }
}
