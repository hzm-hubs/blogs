### class 写法

```
    import React, { PureComponent, Fragment } from "react";

    export default class demoInfo extend PureComponent {
        constructor (props) {
            super(props)

            this.state = {
                count: 1,
                name: 'xiaohuang'
            }
        }

        // 组件初始化
        componentDidMount() {
            console.log("page init___")
        }

        // 变量改变触发 preProps 包含 props里的变量， preState则包含this.state变量变化，在这里做监听处理
        componentDidUpdate(preProps,preState) {
            
        }

        const callBack = () => {
            console.log('执行回调')
        }

        // 渲染函数
        render() {
            const {name,count} = this.state
            <>
                <div>
                    <div>{name}: {count}</div>
                    <button onClick=(e=>{
                        this.setState({
                            count: count + 1
                        },() => {
                            // setState是异步处理，可以接受一个回调函数
                            this.callBack()
                        })
                    })>添加</button>
                </div>
            </>
        }

        // 组件销毁
        componentDidUnMount() {

        }
    }
```