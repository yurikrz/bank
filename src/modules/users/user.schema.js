import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const registerSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required',
    })
    .min(3, { message: 'Name is too short' })
    .max(50, { message: 'Name is too long' }),
  password: z
    .string()
    .min(8, { message: 'Password is too short' })
    .max(16, { message: 'Password is too long' }),
});

const loginSchema = z.object({
  accountNumber: z
    .string({
      invalid_type_error: 'Account Number must be a string',
      required_error: 'Account Number is required',
    })
    .min(6, { message: 'Account Number must has 6 digits' })
    .max(6, { message: 'Account Number must has 6 digits' }),
  password: z.string({
    invalid_type_error: 'Password must be a string',
    required_error: 'Password is required',
  }),
});

export const validateUser = (data) => {
  const result = registerSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validateLogin = (data) => {
  const result = loginSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};
