const identifyServices =
  require("../services/identify.service").identifyServices;

async function contactIdentify(req, res) {
  try {
    console.log("hello");
    const data = await identifyServices.identify(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { contactIdentify };
