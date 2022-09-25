package com.storage.model.validation;

import com.storage.exception.BadRequestException;
import com.storage.model.Activity;
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
public class ActivityValidator implements Consumer<Activity> {
    private final Validator validator;

    public void accept(List<Activity> activitys) {
        activitys.forEach(this::accept);
    }

    @Override public void accept(Activity activity) {
        Set<ConstraintViolation<Activity>> violations = validator.validate(activity);
        if (!violations.isEmpty()) {
            String constraintMessages = violations
                    .stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(". "));
            throw new BadRequestException(constraintMessages);
        }
    }
}