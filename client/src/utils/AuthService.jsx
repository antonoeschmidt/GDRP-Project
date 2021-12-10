function createHeader(_token) {
  var header = { "authorization": `${_token}` };
  return header;
}

module.exports = { createHeader };
