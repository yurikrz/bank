import Tranfer from './transfers.model.js';

export class TranferService {
  static async createRecordTransfer(amount, senderUserId, receiverUserId) {
    return await Tranfer.create({
      amount,
      senderUserId,
      receiverUserId,
    });
  }
}
