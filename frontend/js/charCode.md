在 JavaScript 中，与 编码格式 方法相关的方法主要有以下几个：

1.String.charCodeAt() 

返回字符的 Unicode 编码

```
// 获取字符的Unicode编码（十进制）
'中'.charCodeAt(0);  // 返回 20013

// 获取十六进制表示
'中'.charCodeAt(0).toString(16);  // 返回 "4e2d"
```

2.String.fromCharCode(...codes)

该方法接受一系列 Unicode 码点值作为参数，并将它们转换成对应的字符，返回一个新的字符串。

```
String.fromCharCode(97, 98, 99) // "abc"

String.fromCharCode(20013);  // 返回 "中"

String.fromCharCode(0x4e2d); // 返回 "中" (使用十六进制)
```

3.String.fromCodePoint(...codes)

该方法与 String.fromCharCode 类似，但不同之处在于它可以接受大于 0xFFFF 的码点值（也就是超出 BMP 的码点值），并将其转换成对应的字符，返回一个新的字符串。

```
String.fromCodePoint(0x1F600) //  "😀"
```

4.String.codePointAt(position)

该方法用于获取指定位置处字符的 Unicode 码点值。与 charCodeAt 不同之处在于，codePointAt 可以正确处理大于 0xFFFF 的码点值，而 charCodeAt 则不能。如果指定位置处是一个 BMP 字符，则 codePointAt 返回这个字符的 Unicode 码点值。如果指定位置处是一个代理对的高位部分或低位部分，则 codePointAt 返回代理对的完整码点值。如果指定位置超出了字符串的长度，则 codePointAt 返回 undefined。

```
'😀'.codePointAt(0) // 128512

'中'.codePointAt() // 20013
```

5.String.prototype.normalize(form)

该方法用于将字符串中的字符标准化为指定的Unicode正规形式（Normalization Form）。常见的正规形式有 NFC、NFD、NFKC、NFKD。如果不传递参数，则默认使用 NFC 形式。

```
'à'.normalize('NFD') //  "à"
```