const { getCollection, COLLECTIONS } = require("./helpers/getCollection");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const cln = await getCollection(COLLECTIONS.streamlinedtitles);

  const result = await cln.find({ tconst: { $in: body.tconst } }).toArray();
  return result;
};
