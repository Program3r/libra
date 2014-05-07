var config = require("../../config.js");
var process = require('child_process');
for (i = 0; i < config.startup.length; i++) {
    process.exec(config.startup[i].command);
}