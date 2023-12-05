import Tranfer from '../transfers/transfers.model.js';
import User from './user.model.js';

export class UserService {
  static async create(data) {
    return await User.create(data);
  }

  static async login(data) {
    return await User.findOne({
      where: {
        status: true,
        accountNumber: data.accountNumber,
        password: data.password,
      },
    });
  }

  static async findOneAccount(accountNumber) {
    return await User.findOne({
      where: {
        status: true,
        accountNumber,
      },
    });
  }

  static async updateAmount(user, newAmount) {
    return await user.update({ amount: newAmount });
  }

  static async getHistory(id) {
    return await Tranfer.findAll({
      where: {
        senderUserId: id,
      },
    });
  }
}
