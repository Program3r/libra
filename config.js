var config = {}                                                                                                                                                                               

                                                                                                                                                                                              

config.startup= [
	{command:"/root/local/cloud9/bin/cloud9.sh -l 0.0.0.0 -p 3131 -w /root", cwd:"/root/local/cloud9/bin"},
	{command:"cd /root/broadcaster2 && meteor --production", cwd:"/root/broadcaster2"}
];                                                                

                                                                                                                                                                                              

module.exports = config;
