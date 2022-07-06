const { join } = require("path");
const DBExecuter = require(join(SRC, "DBExecuter.js"));

async function loadUsers() {
  let sql = "SELECT * FROM userstats";
  let rows = await DBExecuter({ sql });
  for (row of rows) {
    Userstats[parseInt(row.id)] = {
      id: parseInt(row.id),
      LastVoteTimestamp: parseInt(row.lastvotetimestamp),
      TotalVotes: parseInt(row.totalvotes),
      ComboVotes: parseInt(row.combovotes)
    };
  }
}

module.exports = loadUsers;
