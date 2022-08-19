require("env-smart").load();
const fs = require("fs");
const nexe = require("nexe");

const node_version = process.env.TARGET.split("-")[2];

nexe.compile({
	targets: [ process.env.TARGET ],
	build: true,
	make: [
		`-j${process.env.CPU_THREADS}`
	],
	temp: "./tmp"
}, (err) => {
	if(err) throw err;

	fs.mkdirSync("./build");
	fs.renameSync(`./tmp/${node_version}/out/Release/node.exe`, `./build/${process.env.TARGET}`);
	fs.rmSync("./tmp", { recursive: true, force: true });
});
