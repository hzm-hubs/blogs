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
```