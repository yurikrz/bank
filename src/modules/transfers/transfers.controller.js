import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { UserService } from '../users/user.service.js';
import { validateTransfer } from './transfers.schema.js';
import { TranferService } from './transfers.service.js';

export const makeTransfer = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateTransfer(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const receiverUserPromise = UserService.findOneAccount(
    userData.receiverAccountNumber
  );
  const senderUserPromise = UserService.findOneAccount(
    userData.senderAccountNumber
  );

  const [receiverUser, senderUser] = await Promise.all([
    receiverUserPromise,
    senderUserPromise,
  ]);

  if (!receiverUser) {
    return next(new AppError(`Receiver account does not exit!.`, 404));
  }

  if (!senderUser) {
    return next(new AppError(`Sender account does not exit!.`, 404));
  }

  if (userData.amount > senderUser.amount) {
    return next(new AppError(`Insufficient balance!.`, 404));
  }

  const newReceiverBalance = receiverUser.amount + userData.amount;
  const newSenderBalance = senderUser.amount - userData.amount;

  const updateReceiverUserPromise = UserService.updateAmount(
    receiverUser,
    newReceiverBalance
  );

  const updateSenderUserPromise = UserService.updateAmount(
    senderUser,
    newSenderBalance
  );

  const transferPromise = TranferService.createRecordTransfer(
    userData.amount,
    senderUser.id,
    receiverUser.id
  );

  await Promise.all([
    updateReceiverUserPromise,
    updateSenderUserPromise,
    transferPromise,
  ]);

  return res.status(201).json({ message: 'Transfer OK' });
});
