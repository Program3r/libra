var config = {};                                                                                                                                                                                                                                                                                                                                                                  
config.startup = [
	{command:"/root/local/cloud9/bin/cloud9.sh -l 0.0.0.0 -p 3131 -w /root", cwd:"/root/local/cloud9/bin", page:"cloud9", port:"3131"},
	{command:"mrt --production --settings settings.json", cwd:"/root/broadcaster2", page:"broadcaster", port:"3000"}
];
module.exports = config;
