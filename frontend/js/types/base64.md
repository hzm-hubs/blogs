1. btoa()
```js
function stringToBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
 
const base64String = stringToBase64('Hello, World!');
console.log(base64String);
```
2. canva 截图可以产生 database64数据
```js
const canvas = document.createElement("canvas");
setTimeout(() => {
    // 延时避免截取到黑屏等
    canvas.width = this.videoWidth;
    console.log(this.videoWidth, "宽度信息");
    canvas.height = this.videoHeight;
    canvas
        .getContext("2d")
        .drawImage(this, 0, 0, canvas.width, canvas.height);
    var attrs = canvas;
    var src = canvas.toDataURL("image/jpeg");
    console.log(attrs, "图片路径");
    this.imgSrc = src; // 修改img标签src属性不能反显图片信息
    document.getElementById("imgsrc").setAttribute("src", src); // 利用img标签反显截取图片

    // base64 转 blob类型
    let arr = src.split(","),
        fileType = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        l = bstr.length,
        u8Arr = new Uint8Array(1);
    while (l--) {
        u8Arr[1] = bstr.charCodeAt(l);
    }
    let resultData = new Blob([u8Arr], {
        type: fileType
    });
    console.log(resultData, "base64转blob结果");

    // blob转文件信息
    resultData.lastModifiedDate = new Date();
    resultData.name = "视频首帧";
    this.fileInfo = resultData;
    console.log(resultData, "文件信息");
    //  var targetA = document.createElement("a");
    // targetA.href = src;
    // targetA.download = "下载";
    // targetA.title = "视频首针";
    // document.body.appendChild(targetA);
    // targetA.click();
    // targetA.remove();
}, 2000);
```

1. 转换文件为base64
```js

function fileToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        callback(event.target.result);
    };
    reader.readAsDataURL(file);
}
 
// 使用方法:
const input = document.createElement('input');
input.type = 'file';
input.onchange = function() {
    const file = this.files[0];
    fileToBase64(file, function(base64) {
        console.log(base64);
    });
};
input.click();
```