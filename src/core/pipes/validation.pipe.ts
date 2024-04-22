import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from './validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
    const obj = plainToClass(metatype, value);

    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        return `field: ${err.property} (${err.value}) - ${Object.values(err.constraints).join(', ')}`;
      });
      throw new ValidationException({ message: messages[0] });
    }

    return value;
  }
}
