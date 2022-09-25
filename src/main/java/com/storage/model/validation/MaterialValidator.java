package com.storage.model.validation;

import com.storage.exception.BadRequestException;
import com.storage.model.Material;
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
public class MaterialValidator implements Consumer<Material> {
    private final Validator validator;

    public void accept(List<Material> materials) {
        materials.forEach(this::accept);
    }

    @Override public void accept(Material material) {
        Set<ConstraintViolation<Material>> violations = validator.validate(material);
        if (!violations.isEmpty()) {
            String constraintMessages = violations
                    .stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(". "));
            throw new BadRequestException(constraintMessages);
        }
    }
}