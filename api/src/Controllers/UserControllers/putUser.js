const { User } = require("../../db.js");

const putUser = async (req, res, next) => {
  let { editingUser } = req.body;
  const { userId, newStatus } = req.body;
  try {
    if (userId && newStatus) {
    console.log("ENTRO");
      User.update(
        { privileges: newStatus },
        { where: { id: userId } }
      ).then((result) => {
        if (result[0] === 1) {
          // `result[0]` suele indicar el número de filas afectadas
          res.status(200).send({ message: "Privileges updated successfully." });
        } else {
          res.status(404).send({ message: "User not found." });
        }
      });
    } else {
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
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.error });
  }
};

module.exports = putUser;
