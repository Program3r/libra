var config = {};
config.startup = [
	{command:"/root/local/cloud9/bin/cloud9.sh -l 0.0.0.0 -p 3333 -w /root", cwd:"/root/local/cloud9/bin", page:"cloud9", port:"3333", startup:true},
	{command:"git fetch --all & git reset --hard origin/master", cwd:"/root/local/libra", page:"update-libra", port:"8080"},
	{command:"cp config.js /etc/local/config.js", cwd:process.cwd, page:"update-config", port:"8000"}
];
module.exports = config;
