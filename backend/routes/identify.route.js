const router = require("express").Router();
const { contactIdentify } = require("../controller/identify.controller");
const Contact = require("../model/contact.model");
const identifyServices =
  require("../services/identify.service").identifyServices;

router.get("/identify", async (req, res) => {
  try {
    const data = await identifyServices.fetchContacts();

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ ErrorMessage: err.message });
  }
});
router.post("/identify", contactIdentify);

module.exports = router;
