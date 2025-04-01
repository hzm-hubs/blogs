在 switch 中 使用 for 循环校验时，for循环中子循环的 break 只能跳出当前 for 循环，要跳出switch还需要添加辅助变量实现，
但这样代码会比较冗余，可以在for循环校验中添加使用throw跳出， 在 switch 条件中使用 try {} catch {} 捕捉 优化代码
```js
  handleValue(data: any, dataTitle: string = '输入参数') {
    for (let i = 0; i < data.length; i++) {
      if (!data[i].paramName) {
        throw `${dataTitle}第${i + 1}项${
          data[i].level > 0 ? '的子项中有' : ''
        }参数名为空, 请填写后提交`;
      }
      if (!data[i].paramDesc) {
        throw `${dataTitle}第${i + 1}项${
          data[i].level > 0 ? '的子项中有' : ''
        }参数描述为空, 请填写后提交`;
      }
      if (data[i].paramFlag && !data[i].defaultValue) {
        throw `${dataTitle}第${i + 1}项${
          data[i].level > 0 ? '的子项中有' : ''
        }默认值为空, 请填写后提交`;
      }
      if (data[i]?.children?.length) {
        this.handleValue(data[i]?.children, dataTitle);
      }
    }
  }

  handleJudge(type) {
    switch (type) {
        case 1:
            try {
                handleValue()
            } catch(e){
                console.log('e',e)
            }
            break
        default:
            break
    }
  }
```