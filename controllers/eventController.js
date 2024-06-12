const Tender = require('../models/Tender');
const Event = require('../models/Event');

// Метод для получения событий тендера
exports.getTenderEvents = async (req, res) => {
  try {
    const tender = await Tender.findByPk(req.params.id, {
      include: {
        model: Event,
        as: 'events'
      }
    });

    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }
    const { format } = req.query;

    if (format === 'xml') {
      let xmlResponse = '<?xml version="1.0" encoding="UTF-8"?><tenderEvents>';
      tender.events.forEach(event => {
        xmlResponse += `<event><name>${event.name}</name><date>${event.date}</date></event>`;
      });
      xmlResponse += '</tenderEvents>';
      res.set('Content-Type', 'application/xml');
      return res.send(xmlResponse);
    } else {
    res.json({
      Id: tender.id,
      createDate: tender.createdAt,
      lastUpdateDate: tender.updatedAt,
      events: tender.events.map(event => ({
        name: event.name,
        date: event.date
      }))
    });
  }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Метод для добавления события тендеру
exports.addTenderEvent = async (req, res) => {
  const { name, date } = req.body;
  const tenderId = req.params.id;

  try {
    const tender = await Tender.findByPk(tenderId);

    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }

    const newEvent = await Event.create({
      name,
      date,
      TenderId: tenderId
    });
    const { format } = req.query;

    if (format === 'xml') {
      const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
        <event>
          <id>${newEvent.id}</id>
          <name>${newEvent.name}</name>
          <date>${newEvent.date}</date>
          <TenderId>${newEvent.TenderId}</TenderId>
        </event>`;
      res.set('Content-Type', 'application/xml');
      return res.send(xmlResponse);
    } else {
      res.status(201).json(newEvent);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

