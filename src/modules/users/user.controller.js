import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateUser } from './user.schema.js';
import { UserService } from './user.service.js';

export const signup = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const accountNumber = Math.floor(Math.random() * 90000) + 100000;
  const user = await UserService.create({ ...userData, accountNumber });
  return res.status(201).json(user);
});

export const login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;
  const user = await UserService.login({ accountNumber, password });

  if (!user) {
    return next(new AppError(`Account Number or password not valid!.`, 404));
  }

  return res.status(200).json({
    message: 'You are logged',
    data: user,
  });
});

export const getHistory = catchAsync(async (req, res, next) => {
  const transferHistory = await UserService.getHistory(req.params.id);

  if (!transferHistory || transferHistory.length === 0) {
    return next(new AppError(`User with id ${req.params.id} not found!.`, 404));
  }

  return res.status(200).json(transferHistory);
});
