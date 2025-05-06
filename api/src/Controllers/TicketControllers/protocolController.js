const { Ticket } = require("../../db.js");

const ProtocolController = async (req, res) => {
  const { ticketId, blueprintId, incompleted } = req.body;

  try {
    // Obtener ticket y blueprint
    const [ticket, blueprint] = await Promise.all([
      Ticket.findByPk(ticketId),
      Ticket.findByPk(blueprintId),
    ]);

    // Verificar si el ticket y la plantilla existen
    if (!ticket || !blueprint) {
      return res
        .status(404)
        .json({ error: "Ticket o plantilla no encontrados" });
    }

    // Verificar si la plantilla es válida
    if (blueprint.description !== "bp") {
      return res.status(400).json({ error: "La plantilla no es válida" });
    }

    // Verificar si el ticket ya está marcado como incompleto
    if (ticket.status.includes("incompleted")) {
      return res.status(200).json({
        message: "Este paso ya fue marcado como incompleto. No se puede modificar.",
        updatedTicket: ticket,
      });
    }

    const blueprintSteps = blueprint.Productos || [];
    const currentStepCode = ticket.description;

    // Verificar si el ticket tiene un paso de la plantilla
    const currentIndex = blueprintSteps.findIndex(
      (step) => step.Código === currentStepCode
    );

    const nextStep = blueprintSteps[currentIndex + 1];

    if (nextStep) {
      // Si el ticket no está incompleto, se actualiza el paso
      if (incompleted) {
        const stepToUse = nextStep || blueprintSteps[blueprintSteps.length - 1];
        ticket.status = `Task ${stepToUse.Producto} incompleted`;
        await ticket.save();
        return res.status(200).json({
          message: "Ticket marcado como incompleto",
          updatedTicket: ticket,
        });
      }
      ticket.description = nextStep.Código;
      ticket.status = `Task ${nextStep.Producto}`;
      await ticket.save();

      return res.status(200).json({
        message: `Paso "${nextStep.Producto}" añadido al ticket.`,
        updatedTicket: ticket,
      });
    } else {
      // Ya completó todos los pasos
      const lastStep = blueprintSteps[blueprintSteps.length - 1];
      ticket.status = `Task ${lastStep.Producto} completed`;
      await ticket.save();

      return res.status(200).json({
        message: `Ticket completo. Estado actualizado a: "Task ${lastStep.Producto} completed".`,
        updatedTicket: ticket,
      });
    }
  } catch (err) {
    console.error("Error en ProtocolController:", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = ProtocolController;
