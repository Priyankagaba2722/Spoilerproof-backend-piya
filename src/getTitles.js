const { getCollection, COLLECTIONS } = require("./helpers/getCollection");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  let filters,
    sortArray = ["full_release_date", -1];
  if (body.preset) {
    const dateOperator = body.preset === "upcoming" ? "$gt" : "$lte";
    filters = { full_release_date: { [dateOperator]: new Date() } };
    if (body.preset === "upcoming") sortArray = ["full_release_date", 1];
  }
  if (body.searchTerm) {
    filters = { primaryTitle: { $regex: body.searchTerm, $options: "i" } };
  }
  if (body.titleType) {
    const exp = {
      titleType:
        body.titleType === "tvMovie"
          ? { $nin: ["movie", "videoGame"] }
          : body.titleType,
    };
    if (!filters) filters = {};
    filters = { ...filters, ...exp };
  }
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
