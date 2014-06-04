var config = {};

config.startup = [
	{command:"/.nvm/v0.6.19/bin/node /root/local/cloud9/bin/cloud9.sh -l 0.0.0.0 -p 3131 -w /root/projects", cwd:"/root/local/cloud9/bin", port:"3131"}
];
module.exports = config;
