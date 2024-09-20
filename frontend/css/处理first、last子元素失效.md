CSS3 - :first-child，:nth-child(1) 失效
```html
<h1>logo</h1>
<article>article1</article>
<article>article2</article>
<article>article3</article>
```
```css
article:first-child {
    color: red;

article:nth-child(1) {
    color: red;
}​
```
原因 使用:first-child伪类时一定要保证前面没有兄弟节点，把h1去掉就可以；或者使用div包住article，然后css：div.article:first-child
    或者使用first-of-type
```css
article:first-of-type {
    color: red;
}​
```
