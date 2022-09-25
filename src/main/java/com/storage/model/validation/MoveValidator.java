package com.storage.model.validation;

import com.storage.exception.BadRequestException;
import com.storage.model.Move;
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
public class MoveValidator implements Consumer<Move> {
    private final Validator validator;

    public void accept(List<Move> moves) {
        moves.forEach(this::accept);
    }

    @Override public void accept(Move move) {
        Set<ConstraintViolation<Move>> violations = validator.validate(move);
        if (!violations.isEmpty()) {
            String constraintMessages = violations
                    .stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(". "));
            throw new BadRequestException(constraintMessages);
        }
    }
}
