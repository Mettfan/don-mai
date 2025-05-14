const { Ticket, Product, User } = require("../../db.js");
const { Op } = require("sequelize");

// Función para determinar el tipo de análisis
const determineAnalysisType = (requestBody) => {
  if (requestBody.ticketType) {
    return "ticket";
  } else if (requestBody.productId) {
    return "product";
  } else if (requestBody.Departamento) {
    return "Departamento";
  } else if (requestBody.brand) {
    return "brand";
  }
  return null;
};

// Función principal de análisis
const performAnalysis = async (req, res) => {
  try {
    const requestBody = req.body;
    const analysisType = determineAnalysisType(requestBody);

    if (!analysisType) {
      return res.status(400).json({ error: "No se pudo determinar el tipo de análisis" });
    }

    let result;
    switch (analysisType) {
      case "ticket":
        result = await analyzeTicketType(requestBody);
        break;
      case "product":
        result = await analyzeProduct(requestBody);
        break;
      case "Departamento":
        result = await analyzeByField(requestBody, "Departamento");
        break;
      case "brand":
        result = await analyzeByField(requestBody, "brand");
        break;
      default:
        return res.status(400).json({ error: "Tipo de análisis no válido" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error en performAnalysis:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Análisis por tipo de ticket
const analyzeTicketType = async (requestBody) => { 
  const { userId, ticketType, start, end } = requestBody;

  try {
    // 1. Preparación y validación de fechas
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Formato de fecha inválido");
    }

    // 2. Consultar al usuario junto con sus tickets en el rango de fechas
    const user = await User.findByPk(userId, {
      include: [{
        model: Ticket,
        where: {
          createdAt: { [Op.between]: [startDate, endDate] },
          client: { [Op.ne]: "Sistema" }
        },
        attributes: ["id", "Total", "description", "createdAt", "user", "client"],
        through: { attributes: [] },
        required: false
      }]
    });

    const tickets = user?.Tickets || [];

    const ticketTypes = new Set(tickets.map(t => t.description?.toLowerCase() || "out"));

    // 3. Filtrar los tickets que correspondan al tipo solicitado en el request
    const filteredTickets = tickets.filter(t => 
      (t.description?.toLowerCase() || "out") === ticketType.toLowerCase()
    );

    const quantity = filteredTickets.length;
    const total = filteredTickets.reduce((sum, t) => sum + (Number(t.Total) || 0), 0);

    // Función para formatear las fechas a un formato deseado (por ejemplo, 'YYYY-MM-DD HH:MM:SSZ')
    const formatDate = (date) => {
      const isoString = new Date(date).toISOString();
      return isoString.replace("T", " ").slice(0, -5) + "Z";
    };

    // 4. Construir el objeto de análisis para cada tipo de ticket encontrado
    const analysis = {};
    ticketTypes.forEach(type => {
      if (type === ticketType.toLowerCase()) {
        analysis[type] = { quantity, total };
      } else {
        analysis[type] = { quantity: 0, total: 0 };
      }
    });

    return {
      analysis: {
        userId,
        ticketType,
        start: formatDate(startDate),
        end: formatDate(endDate),
        quantity,
        total
      }
    };

  } catch (error) {
    console.error("Error en analyzeTicketType:", error);
    // Propagar el error con un mensaje más descriptivo
    throw new Error(`Error al analizar tickets: ${error.message}`);
  }
};


// Análisis por producto
const analyzeProduct = async (requestBody) => {
  const { userId, productId, start, end } = requestBody;
  
  // 1. Extraer tipos de ticket existentes
  const allTicketTypes = new Set();
  const tickets = await Ticket.findAll({
    where: {
      createdAt: { [Op.between]: [new Date(start), new Date(end)] },
      client: { [Op.ne]: "Sistema" }
    },
    raw: true
  });

  // 2. Filtrar y clasificar tickets
  const ticketAnalysis = tickets.reduce((acc, ticket) => {
    try {
      const products = typeof ticket.Productos === 'string' 
        ? JSON.parse(ticket.Productos) 
        : (Array.isArray(ticket.Productos) ? ticket.Productos : []);
      
      // Determinar tipo de ticket
      const ticketType = ticket.description || 'out';
      allTicketTypes.add(ticketType); // Registrar tipo

      if (!acc[ticketType]) {
        acc[ticketType] = { quantity: 0, total: 0 };
      }

      products.forEach(product => {
        if (product.id == productId && product.UserId == userId) {
          const quantity = Number(product.quantity) || 0;
          const price = parseFloat(product['P. Venta'] || 0);
          
          acc[ticketType].quantity += quantity;
          acc[ticketType].total += quantity * price;
        }
      });
    } catch (e) {
      console.error(`Error procesando ticket ${ticket.id}:`, e);
    }
    return acc;
  }, {});

  // 3. Convertir a estructura de respuesta usando Set
  const analysis = {};
  Array.from(allTicketTypes.values()).forEach(type => {
    analysis[type] = ticketAnalysis[type] || { quantity: 0, total: 0 };
  });

  return { 
    analysis: { 
      userId,
      productId,
      ...analysis,
      start,
      end
    }
  };
};

// Función para análisis por campo (departamento o marca)
const analyzeByField = async (requestBody, field) => {
  const { userId, start, end } = requestBody;
  const value = requestBody[field] || requestBody[field.toLowerCase()];
  if (!value) throw new Error(`Valor no definido para el campo: ${field}`);

  // 1. Preparación de fechas
  const startDate = new Date(start);
  const endDate = new Date(end);

  // 2. Buscar productos que coincidan con el campo
  const products = await Product.findAll({
    where: { [field]: value },
    attributes: ['id'],
    raw: true
  });
  const productIds = products.map(p => p.id);
  if (productIds.length === 0) {
    return {
      analysis: {
        userId,
        [field]: value,
        entry: { quantity: 0, total: 0 },
        out: { quantity: 0, total: 0 },
        start,
        end
      }
    };
  }

  // 3. Buscar tickets asociados al usuario en el rango de fechas
  const tickets = await Ticket.findAll({
    where: {
      createdAt: { [Op.between]: [startDate, endDate] },
      client: { [Op.ne]: 'Sistema' }
    },
    include: [{
      model: User,
      where: { id: userId },
      attributes: [] // No necesitamos campos del usuario
    }],
    raw: true
  });

  // 4. Inicialización del análisis para "entry" y "out"
  const analysisResult = { entry: { quantity: 0, total: 0 }, out: { quantity: 0, total: 0 } };

  tickets.forEach(ticket => {
    // Parsear de forma segura la propiedad Productos
    let ticketProducts = [];
    try {
      ticketProducts = typeof ticket.Productos === 'string'
        ? JSON.parse(ticket.Productos)
        : ticket.Productos || [];
    } catch (e) {
      console.error(`Error parseando Productos en ticket ${ticket.id}:`, e);
      ticketProducts = [];
    }

    // Filtrar los productos que estén en los IDs encontrados
    const matchingProducts = ticketProducts.filter(p => p.id && productIds.includes(p.id));

    const ticketType = (ticket.description || '').toLowerCase().includes('entry')
      ? 'entry'
      : 'out';

    // Acumular datos para cada producto coincidente
    matchingProducts.forEach(product => {
      const quantity = Number(product.quantity) || 0;
      const price = parseFloat(product['P. Venta'] || product.price || 0);
      analysisResult[ticketType].quantity += quantity;
      analysisResult[ticketType].total += quantity * price;
    });
  });

  return {
    analysis: {
      userId,
      [field]: value,
      ...analysisResult,
      start,
      end
    }
  };
};

module.exports = performAnalysis;