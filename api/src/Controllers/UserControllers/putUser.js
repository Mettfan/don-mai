const { User } = require("../../db.js");

const putUser = async (req, res, next) => {
  let { editingUser } = req.body;

  try {
    User.update(
      {
        name: editingUser.name,
        email: editingUser.email,
        password: editingUser.password,
        phone: editingUser.phone,
      },
      { where: { id: editingUser.id } }
    ).then((result) => {
      res.status(200).send({ result: result });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.error });
  }
};

module.exports = putUser;
