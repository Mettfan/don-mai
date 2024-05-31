const { User, Ticket } = require("../../db.js");

const getUserTickets = async (req, res, next) => {
  let { userId } = req.query;

  try {
    const user = await User.findByPk(userId, {
      include: [{
        model: Ticket,
        through: { attributes: [] } // This removes the extra attributes from the join table
      }]
    });

    if (user) {
      // Send back the user's tickets
      res.send({ tickets: user.Tickets });
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getUserTickets;