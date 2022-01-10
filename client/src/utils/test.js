// const { privateKeys, publicKeys } = require("./keys.js")
// const crypto = require("crypto");

// const account = "0x0112D4DC024863944b208B74aB6D20429a7C33a7";
// const data = "my secret data";

// const publicKey = publicKeys[account];
// const privateKey = privateKeys[account];

// const encryptedData = crypto.publicEncrypt(
//     {
//         key: publicKey,
//         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//         oaepHash: "sha256",
//     },
//     Buffer.from(data)
// );
// console.log("encypted data: ", encryptedData.toString("base64"))

// const encr1 = Buffer.from("LPRonn+wHsKGY0ibcupIW+327RMeIr/PfL58epDBEgAs3YdSmL+pPZAnVNc8K/dVB/t6VJlp7O8RrycKzPrI6Cz+zrXunaalhNijTflAW8cN2cPuEI0ngWSa6mKrY38LOknWLiZq2U4gvgH1dCTI8s4PzjDtgr2gFV9oN3blBYs=", 'base64')

// const decryptedData = crypto.privateDecrypt(
// 	{
// 		key: privateKey,
// 		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
// 		oaepHash: "sha256",
// 	},
// 	encr1
// )
// console.log("decrypted data: ", decryptedData.toString())


const { generateKeyPair } = require('crypto');
generateKeyPair('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
}, (err, publicKey, privateKey) => {
    console.log(publicKey)
    console.log(privateKey)
  // Handle errors and use the generated key pair.
});
