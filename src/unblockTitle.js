const { getCollection, COLLECTIONS } = require("./helpers/getCollection");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const cln = await getCollection(COLLECTIONS.users);

  const result = await cln.findOneAndUpdate(
    { userId: body.userId },
    {
      $pull: {
        blocked: {
          tconst: body.tconst,
        },
      },
    }
  );
  const user = await cln.findOne({ _id: result.value._id });
  return user.blocked;
};
