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
