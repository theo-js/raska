import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function exceptionFactory(errors: ValidationError[]) {
  const formattedErrors = errors.reduce(
    (acc, error) => {
      const field = error.property;

      acc[field] = Object.values(error.constraints ?? {});

      return acc;
    },
    {} as Record<string, string[]>,
  );

  return new BadRequestException({
    message: 'Validation failed',
    errors: formattedErrors,
  });
}
