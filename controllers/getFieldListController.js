const tenderFields = [
    "tender_id",
    "tender_regNumber",
    "tender_publishDate",
    "tender_endDate",
    "tender_name",
    "tender_typeName",
    "tender_status",
    "tender_lotCustomerShortName",
    "tender_lotCustomerFullName",
    "tender_lotCustomerInn",
    "tender_lotCustomerKpp",
    "tender_lotCustomerOgrn",
    "tender_beginPrice",
    "tender_region",
    "tender_sourceLink",
    "tender_lotCategories",
    "tender_lotDeliveryPlacesText",
    "tender_lotDeliveryTerm",
    "tender_lotPreferences",
    "tender_jointBidding",
    "tender_lotDeliveryKladrCodes",
    "tender_lotCustomerContacts",
    "tender_summingUpDate",
    "tender_lotProductName",
    "tender_sysPublishDate",
    "tender_sysUpdateDate",
    "tender_isCompleted",
    "tender_cancelReason",
    "tender_tag",
    "tender_lotRequirements"
  ];
  
  const customerFields = [
    "customer_id",
    "shortName",
    "fullName",
    "inn",
    "ogrn",
    "address",
    "okato",
    "contacts"
  ];

  const eventFields = [
    "name",
    "date"
  ];


  
  exports.getFieldList = (req, res) => {
    const { format, entity } = req.query;
  
    let fields;
    if (entity === 'tender') {
      fields = tenderFields;
    } else if (entity === 'customer') {
      fields = customerFields;
    } else if (entity === 'event') {
      fields = eventFields;
    } else {
      return res.status(400).json({ error: 'Invalid entity type' });
    }
  
    if (format === 'xml') {
      let xmlResponse = '<?xml version="1.0" encoding="UTF-8"?><fields>';
      fields.forEach(field => {
        xmlResponse += `<field>${field}</field>`;
      });
      xmlResponse += '</fields>';
      res.set('Content-Type', 'application/xml');
      return res.send(xmlResponse);
    } else {
      return res.json({ fields });
    }
  };
  