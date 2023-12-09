const { getCollection, COLLECTIONS } = require("./helpers/getCollection");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  let filters,
    sortArray = ["full_release_date", -1];

  if (body.seriesId) {
    filters = { seriesId: body.seriesId };
  }
  try {
    const cln = await getCollection(COLLECTIONS.streamlinedtitles);
    const result = await cln
      .find(filters)
      .limit(body.limit || 10)
      .skip(body.skip || 0)
      .sort(...sortArray)
      .toArray();
    return result;
  } catch (err) {
    console.log(err);
    throw new Error("Cannot fetch data.");
  }
};
