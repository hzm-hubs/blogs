提示 

React Hook "useState" is called in function "knowledgeGalleryList" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word

解决：函数名是否大写

如下
```js
function knowledgeGalleryList({ condition }) {
  let state;
  if (condition) {
    state = useState(initialValue);
  }
  return <div>{state[0]}</div>;
}
```
纠正为
```js
function KnowledgeGalleryList({ condition }) {
  let state;
  if (condition) {
    state = useState(initialValue);
  }
  return <div>{state[0]}</div>;
}
```