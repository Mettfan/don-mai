const { User } = require("../../db.js");
const bcrypt = require("bcrypt");

const putUser = async (req, res, next) => {
  const { editingUser, userId, newStatus } = req.body;
console.log(editingUser, userId, newStatus, "?????????");
  try {
    if (userId && newStatus) {
      const result = await User.update(
        { privileges: newStatus },
        { where: { id: userId } }
      );

      if (result[0] === 1) {
        const updatedUser = await User.findOne({ where: { id: userId } });
        res.status(200).send(updatedUser);
      } else {
        res.status(404).send({ message: "User not found." });
      }
    } else {
      const user = await User.findOne({ where: { id: editingUser.id } });

      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      const updates = {};

      if (editingUser.name && editingUser.name !== user.name) {
        updates.name = editingUser.name;
      }
      if (editingUser.email && editingUser.email !== user.email) {
        updates.email = editingUser.email;
      }
      if (editingUser.phone && editingUser.phone !== user.phone) {
        updates.phone = editingUser.phone;
      }
      if (
        typeof editingUser.disabled !== "undefined" &&
        editingUser.disabled !== user.disabled
      ) {
        updates.disabled = editingUser.disabled;
      }
      if (editingUser.age && editingUser.age !== user.age) {
        updates.age = editingUser.age;
      }
      if (
        editingUser.privileges &&
        editingUser.privileges !== user.privileges
      ) {
        updates.privileges = editingUser.privileges;
      }

      if (editingUser.newPassword) {
        const isPasswordSame = await bcrypt.compare(editingUser.newPassword, user.password);
        if (!isPasswordSame) {
          updates.password = await bcrypt.hash(editingUser.newPassword, 10);
        }
      }

      if (Object.keys(updates).length === 0) {
        return res.status(200).send(user);
      }

      const result = await User.update(updates, {
        where: { id: editingUser.id },
      });

      if (result[0] === 1) {
        const updatedUser = await User.findOne({ where: { id: editingUser.id } });
        res.status(200).send(updatedUser);
      } else {
        res.status(404).send({ message: "User not found." });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = putUser;
