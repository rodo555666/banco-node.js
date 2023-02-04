const Users = require('../models/users.model');

exports.signupUser = async (req, res) => {
  try {
    
    const { name, password } = req.body;
    const accountNumber = Math.round(Math.random() * 999999);

    const amount = 1000;
    
    const users = await Users.create({
      name: name.toLowerCase(),
      password,
      amount,
      accountNumber,
    });
    
    return res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { password, accountNumber } = req.body;
    const users = await Users.findOne({
      where: {
        status: true,
        password,
        accountNumber,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Users was found successfully',
      users,
    });
  } catch (error) {
    
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.historyUser = (req, res) => {
  res.json({
    status: 'success',
    message: 'Method HistoryUser Was Called',
  });
};
