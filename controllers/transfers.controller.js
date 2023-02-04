const Transfers = require('../models/transfers.model');
const Users = require('../models/users.model');

exports.amountTransfers = async (req, res) => {
  const { amount, accountNumber, senderUserId } = req.body;
  const userReceiver = await Users.findOne({
    where: {
      status: true,
      accountNumber: accountNumber,
    },
  });
  
  const receiverUserId = userReceiver.id;
  const userMakeTransfer = await Users.findOne({
    where: {
      status: true,
      id: senderUserId,
    },
  });
  if (amount > userMakeTransfer.amount) {
    return res.status(400).json({
      status: 'error',
      message:
        'The sending account does not have the amount necessary to make the transfer.',
    });
  }
  if (receiverUserId == senderUserId) {
    return res.status(400).json({
      status: 'error',
      message: 'Cannot self-make a transfer',
    });
  }
  const newAmountUserMakeTransfer = userMakeTransfer.amount - amount;
  
  const newAmountUserReceiver = userReceiver.amount + amount;
  
  await userMakeTransfer.update({ amount: newAmountUserMakeTransfer });
  
  await userReceiver.update({ amount: newAmountUserReceiver });
  
  const transferSuccess = await Transfers.create({
    amount,
    senderUserId,
    receiverUserId,
  });
  return res.status(200).json({
    status: 'success',
    message: 'Transfer was done successfully',
    transferSuccess,
  });
};
