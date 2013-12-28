var config = {};
config.startup = [
];
config.routes = [
	{command:"cp config.js /etc/local/config.js", cwd:"/root/projects/libra", page:"update-config", port:"8080"}
];
module.exports = config;
