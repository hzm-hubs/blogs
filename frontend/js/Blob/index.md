```js
// 接口请求时，需要设置responseType为 blob
export async function downFiles(params) {
	return request(`/api/v1/product/${productCode}/instances/downloadFile`, {
		method: "post",
		data: params,
		responseType: "blob",
	});
}

// 使用接口返回的流数据下载
const streamDownload = (data = "", fileName = "", callBack: any = null) => {
	if (!data) {
		return;
	}
	const file = new Blob([data], { type: "application/octet-stream" });

	if (file.size > 0) {
		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(file);
		link.download = fileName;
		// 此写法兼容可火狐浏览器
		document.body.appendChild(link);
		const evt = document.createEvent("MouseEvents");
		evt.initEvent("click", false, false);
		link.dispatchEvent(evt);
		document.body.removeChild(link);
	}
	callBack && callBack();
};

// a标签模拟点击下载链接，由浏览器直接下载 类似 window.open/location.href
const goDownload = (reqUrl = "", callBack: any = null) => {
	if (!reqUrl) {
		return;
	}
	// const file = new Blob([res], { type: "application/octet-stream" });  // 流数据下载
	const link = document.createElement("a");
	link.href = reqUrl;
	link.download = "";
	link.style.display = "none"; // 隐藏虚拟链接
	// 此写法兼容可火狐浏览器
	document.body.appendChild(link);
	const evt = document.createEvent("MouseEvents");
	evt.initEvent("click", false, false);
	link.dispatchEvent(evt);
	document.body.removeChild(link);
	callBack && callBack();
};
```