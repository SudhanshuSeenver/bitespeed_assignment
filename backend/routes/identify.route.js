const router = require("express").Router();
const { contactIdentify } = require("../controller/identify.controller");
const Contact = require("../model/contact.model");
const identifyServices =
  require("../services/identify.service").identifyServices;

router.get("/identify", async (req, res) => {
  try {
    console.log("hello");
    // const data = await identifyServices.create(req.body);
    // res.status(200).json(data);
    const data = await Contact.findAll({
      where: {
        email: "Helasdlo@world.com",
      },
    });
    console.log("data===<", data[0].dataValues, "<=====");
    res.status(200).send("sd");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/identify", contactIdentify);

module.exports = router;
