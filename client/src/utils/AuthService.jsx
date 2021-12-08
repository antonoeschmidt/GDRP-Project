function createHeader(_token) {
  var header = { "Authorization-token": `{_token}` };
  return header;
}

module.exports = { createHeader };
