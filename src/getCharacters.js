const { getCollection, COLLECTIONS } = require("./helpers/getCollection");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const cln = await getCollection(COLLECTIONS.characters);

  const result = await cln.find({ imdb_id: { $in: body.ids} }).toArray();
  return result;
};
