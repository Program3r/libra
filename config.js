var config = {};
config.startup = [
	{command:"/root/local/cloud9/bin/cloud9.sh -l 0.0.0.0 -p 3333 -w /root", cwd:"/root/local/cloud9/bin", page:"cloud9", port:"3333"}
];
module.exports = config;
