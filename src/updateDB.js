const { join } = require("path");
const DBExecuter = require(join(SRC, "DBExecuter.js"));

module.exports = async function (vote) {
  let sql;
  let comboVotes;
  if (Math.abs(vote.Userstats.LastVoteTimestamp - vote.timestamp) > 86400) {
    vote.Userstats.ComboVotes + 1;
    Userstats[vote.user].ComboVotes = Userstats[vote.user].ComboVotes + 1;
    comboVotes = Userstats[vote.user].ComboVotes;
  }

  console.info({ 1: Userstats[vote.user].ComboVotes, 2: comboVotes });

  if (vote.Userstats.existed) {
    sql = `UPDATE userstats SET lastvotetimestamp = ${vote.timestamp}, totalvotes = ${vote.Userstats.TotalVotes + 1}, combovotes = ${comboVotes} WHERE id = ${vote.user}`;
  } else {
    sql = `INSERT INTO userstats (id, lastvotetimestamp, totalvotes, combovotes) VALUES (${vote.user}, ${vote.timestamp}, 1, 1)`;
  }
  console.info(sql);
  await DBExecuter({ sql });

  Userstats[vote.user].LastVoteTimestamp = vote.timestamp;
  Userstats[vote.user].TotalVotes = +1;
};
