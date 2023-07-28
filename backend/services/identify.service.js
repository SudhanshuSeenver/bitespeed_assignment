const Contact = require("../model/contact.model");

function responceBody() {}

async function create(email, phoneNumber) {
  const contact = await Contact.create({
    phoneNumber: phoneNumber,
    linkedPrecedence: "primary",
    email: email,
  });
  console.log("11111 -<", contact);
  return contact.dataValues;
}
async function update() {}
async function identify(body) {
  const { email, phoneNumber } = body;
  //   const contact_withBoth = await Contact.findAll({
  //     where: {
  //       email: email,
  //       phoneNumber: phoneNumber,
  //     },
  //   });

  //   if (contact_withBoth.length !== 0) {
  //     const { dataValues } = contact_withBoth;
  //     const contact = {
  //       primaryContactId: dataValues.id,
  //       emails: [dataValues.email],
  //       phoneNumbers: [dataValues.phoneNumber],
  //       secondaryContactIds: [],
  //     };
  //     return contact;
  //   }
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
    // const contact = await Contact.create({
    //   phoneNumber: phoneNumber,
    //   linkPrecedence: "primary",
    //   email: email,
    // });

    // const { dataValues } = contact;
    const dataValues = await create(email, phoneNumber);

    const resContact = {
      primaryContactId: dataValues.id,
      emails: [dataValues.email],
      phoneNumbers: [dataValues.phoneNumber],
      secondaryContactIds: [],
    };
    return resContact;

    //   return
  }

  //   if (contact_withEmail.length !== 0 && contact_withNumber.length !== 0) {
  //     const contactDataValues = [contact_withEmail, ...contact_withNumber].map(
  //       (contact) => contact.dataValues
  //     );
  //     const primaryCts = contactDataValues
  //       .filter((data) => data.linkPrecedence === "primary")
  //       .sort(
  //         (dt1, dt2) =>
  //           new Date(dt1.createdAt).getTime() - new Data(dt2.createdAt).getTime()
  //       );
  //   }

  //   if (primaryCts.length === 1) {
  //     const secIds = [];
  //     const emails = [];
  //     const phNums = [];
  //     let pId;
  //     contactDataValues.forEach((data) => {
  //       emails.push(data.email);
  //       phNums.push(data.phoneNumber);
  //       if (data.linkPrecedence === "primary") pId = data.id;
  //       else secIds.push(data.id);
  //     });
  //   }
}

module.exports.identifyServices = { identify, create };
