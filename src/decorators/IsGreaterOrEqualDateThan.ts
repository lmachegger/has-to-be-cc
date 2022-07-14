import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isDateString,
} from 'class-validator';

export function IsGreaterOrEqualDateThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isGreaterOrEqualThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: {
        message: `${propertyName} must be greater or equal than ${property}`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          if (!isDateString(value) || !isDateString(relatedValue)) {
            return false;
          }

          const date = new Date(value);
          const relatedDate = new Date(relatedValue);

          return date >= relatedDate;
        },
      },
    });
  };
}
