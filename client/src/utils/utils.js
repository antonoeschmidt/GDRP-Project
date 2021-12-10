function createHeader(_token) {
  let header = { "authorization": `${_token}` };
  return header;
}

module.exports = { createHeader };
