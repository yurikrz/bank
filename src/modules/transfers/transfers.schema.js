import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const transferSchema = z.object({
  amount: z
    .number({
      invalid_type_error: 'Amount must be a number',
      required_error: 'Amount is required',
    })
    .min(1, { message: 'Amount must be equal or greathe than 1' }),
  senderAccountNumber: z
    .string({
      invalid_type_error: 'Sender Account Number must be a string',
      required_error: 'Sender Account Number is required',
    })
    .min(6, { message: 'Sender Account Number must has 6 digits' })
    .max(6, { message: 'Sender Account Number must has 6 digits' }),
  receiverAccountNumber: z
    .string({
      invalid_type_error: 'Receiver Account Number must be a string',
      required_error: 'Receiver Account Number is required',
    })
    .min(6, { message: 'Receiver Account Number must has 6 digits' })
    .max(6, { message: 'Receiver Account Number must has 6 digits' }),
});

export const validateTransfer = (data) => {
  const result = transferSchema.safeParse(data);
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
