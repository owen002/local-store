var localstore = require("../src/index.js")

localstore.sessionSet("test",{"testkey":"testval"},0.5)


console.log(localstore.sessionGet("test"))