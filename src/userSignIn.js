const { getCollection, COLLECTIONS } = require("./helpers/getCollection");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const cln = await getCollection(COLLECTIONS.users);

  const result = await cln.findOneAndUpdate(
    { userId: body.userId },
    { $set: { userId: body.userId, name: body.name, email: body.email }},
    { upsert: true }
  );
  const user = await cln.findOne({ _id: result.lastErrorObject.upserted || result.value._id });
  return user
};
