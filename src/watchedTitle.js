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
      $push: {
        watched: {
          tconst: body.tconst,
          titleType: body.titleType,
          primaryTitle: body.primaryTitle,
          poster: body.poster,
          release_date: body.release_date,
        },
      },
    }
  );
  const user = await cln.findOne({ _id: result.value._id })
  return {blocked: user.blocked, watched: user.watched};
};
