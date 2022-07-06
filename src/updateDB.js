const { join } = require("path");
const DBExecuter = require(join(SRC, "DBExecuter.js"));

module.exports = async function (vote) {
  let sql;
  let comboVotes = vote.Userstats.ComboVotes;

  if (vote.Userstats.existed) {
    sql = `UPDATE userstats SET lastvotetimestamp = ${vote.timestamp}, totalvotes = ${vote.Userstats.TotalVotes + 1}, combovotes = ${comboVotes} WHERE id = ${vote.user}`;
  } else {
    sql = `INSERT INTO userstats (id, lastvotetimestamp, totalvotes, combovotes) VALUES (${vote.user}, ${vote.timestamp}, 1, 1)`;
  }

  await DBExecuter({ sql });
  Userstats[vote.user].existed = true;

  Userstats[vote.user].LastVoteTimestamp = vote.timestamp;
  Userstats[vote.user].TotalVotes += 1;
};
