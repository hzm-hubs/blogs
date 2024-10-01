// nodejs 递归遍历文件夹
const fs = require("fs");
const path = require("path");
const source = process.argv[2];
const target = process.argv[3];

function deep(dir, list) {
	const arr = fs.readdirSync(path.join(__dirname, dir));
	arr.forEach((item) => {
		const child = [];
		list.push({ name: item, child });
		const itemPath = path.join(__dirname, dir + "/" + item);
		const isDir = fs.statSync(itemPath).isDirectory();
		if (isDir) {
			const temp = dir + item + "/";
			deep(temp, child);
		} else {
			const filePath = dir + "/" + item;
			const content = fs.readFileSync(itemPath, "utf8");
			console.log(content);

			try {
				const data = fs.appendFileSync(target, content);
				//文件写入成功。
			} catch (err) {
				console.error(err);
			}
		}
	});
}

let list = [];
deep(source, list);
console.log(JSON.stringify(list));
