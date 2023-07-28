const router = require("express").Router();
const { contactIdentify } = require("../controller/identify.controller");

router.get("/identify", (req, res) => res.send("<h1>Hello world</h1>"));
router.post("/identify", contactIdentify);

module.exports = router;
