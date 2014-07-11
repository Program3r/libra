You can put .JSON files here with configs for forever-monitor, more to come later.

FOREVER-MONITOR EXAMPLE
{
    "command":"/root/.nvm/v0.8.19/bin/node",
    "type":"forever",
    "file":"/path/to/server.js",
    "port":3111,
    "max":3,
    "silent":true,
    "options":["-p", "3119", "-l", "0.0.0.0", "-w", "/root"]
}