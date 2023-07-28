const identifyServices =
  require("../services/identify.service").identifyServices;

async function contactIdentify(req, res) {
  try {
    console.log("hello");
    const data = await identifyServices.identify(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ ErrorMessage: err.message });
  }
}

module.exports = { contactIdentify };
