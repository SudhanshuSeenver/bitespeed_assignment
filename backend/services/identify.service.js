const Contact = require("../model/contact.model");

async function fetchContacts() {
  const contacts = await Contact.findAll();
  return contacts.map((ct) => ct.dataValues);
}

async function create(email, phoneNumber, linkedPrecedence, linkedId = null) {
  const contact = await Contact.create({
    phoneNumber: phoneNumber,
    linkedPrecedence: linkedPrecedence,
    email: email,
    linkedId: linkedId,
  });

  return contact.dataValues;
}

async function identify(body) {
  const { email, phoneNumber } = body;

  const contact_withBoth = await Contact.findAll({
    where: {
      email: email,
      phoneNumber: phoneNumber,
    },
  });

  if (contact_withBoth.length !== 0) {
    const contactsAll = await fetchContacts();
    const { dataValues } = contact_withBoth[0];
    const secIds = [];
    const emails = [];
    const phNums = [];
    let pId;

    if (dataValues.linkedPrecedence === "primary") {
      pId = dataValues.id;
      emails.push(dataValues.email);
      phNums.push(dataValues.phoneNumber);
      contactsAll.forEach((cts) => {
        if (cts.linkedid === pId) {
          emails.push(cts.email);
          phNums.push(cts.phoneNumber);
          secIds.push(cts.id);
        }
      });
    } else {
      pId = dataValues.linkedId;

      contactsAll.forEach((cts) => {
        if (pId === cts.id) {
          emails.push(cts.email);
          phNums.push(cts.phoneNumber);
        }
        if (cts.linkedId === pId) {
          emails.push(cts.email);
          phNums.push(cts.phoneNumber);
          secIds.push(cts.id);
        }
      });
    }
    const contact = {
      primaryContactId: pId,
      emails: emails,
      phoneNumbers: phNums,
      secondaryContactIds: secIds,
    };
    return contact;
  }

  const contact_withEmail = await Contact.findAll({
    where: {
      email: email,
    },
  });
  const contact_withNumber = await Contact.findAll({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  if (contact_withEmail.length === 0 && contact_withNumber.length === 0) {
    const dataValues = await create(email, phoneNumber, "primary");

    const resContact = {
      primaryContactId: dataValues.id,
      emails: [dataValues.email],
      phoneNumbers: [dataValues.phoneNumber],
      secondaryContactIds: [],
    };
    return resContact;
  }

  // /////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////
  else {
    const secIds = [];
    const emails = [];
    const phNums = [];
    let pId;

    const contactDataValues = [...contact_withEmail, ...contact_withNumber].map(
      (contact) => contact.dataValues
    );

    // console.log(contactDataValues);

    const primaryCts = contactDataValues
      .filter((data) => data.linkedPrecedence === "primary")
      .sort(
        (dt1, dt2) =>
          new Date(dt1.createdAt).getTime() - new Date(dt2.createdAt).getTime()
      );
    // //////////////////////////////
    // ////////////////////////////////

    if (contact_withEmail.length === 0 || contact_withNumber.length === 0) {
      const linkedId = primaryCts[0]
        ? primaryCts[0].id
        : contactDataValues[0].linkedId;
      await create(email, phoneNumber, "secondary", linkedId);
    }
    if (primaryCts.length > 1) {
      pId = primaryCts[0].id;
      // emails.push(primaryCts[0].email);
      //   phNums.push(primaryCts[0].phoneNumber);
      for (let i = 1; i < primaryCts.length; i++) {
        primaryCts[i].linkedPrecedence = "secondary";
        primaryCts[i].linkedId = primaryCts[0].id;
        await Contact.update(
          { linkedPrecedence: "secondary", linkedId: primaryCts[0].id },
          {
            where: {
              id: primaryCts[i].id,
            },
          }
        );
        await Contact.update(
          { linkedId: primaryCts[0].id },
          {
            where: {
              linkedId: primaryCts[i].id,
            },
          }
        );
      }
    }

    const contactsAll = await Contact.findAll();

    if (!pId) {
      pId = contactDataValues[0].linkedId || primaryCts[0].id;
    }

    contactsAll.forEach((cts) => {
      if (pId === cts.id) {
        emails.push(cts.email);
        phNums.push(cts.phoneNumber);
      }
      if (pId === cts.linkedId) {
        emails.push(cts.email);
        phNums.push(cts.phoneNumber);
        secIds.push(cts.id);
      }
    });

    return {
      primaryContactId: pId,
      emails: emails,
      phoneNumbers: phNums,
      secondaryContactIds: secIds,
    };
  }
}

module.exports.identifyServices = { identify, create, fetchContacts };
