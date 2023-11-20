###  select组件结合后端做下拉加载(antd版本3.x)

背景：因为全量查询有上千条数据，多个用户一次性获取服务器压力较大，所以采用兼容可模糊查询的下拉加载。参考select组件的 onSearch（文本框值变化时回调）  onPopupScroll（下拉列表滚动时的回调）、onChange（选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数）

目标：使用 onSearch 事件触发远程搜索，onPopupScroll 事件触发页码递增查询，通过JS方法处理搜索结果返回

#### 1.编写select组件

showSearch 筛选框支持可出入

value 接受绑定值

notFoundContent 没有发现内容的展示样式

placeholder 无输入值的站位符

allowClear 可一键清空

loading 加载状态开发

filterOption 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false，默认true


```
    this.state = {
        instanceId: '', //  选中的id
        instanceName: "", // 选中的id对应文案
        featchName: '' , // 检索关键值
        instanceList： '', // 搜索结果
        instanceFetching: false // 加载状态
    }

    // render中
    <Select
        showSearch
        value={instanceName}
        notFoundContent={
            instanceFetching ? <Spin size="small" /> : null
        }
        placeholder="可模糊搜索"
        allowClear={true}
        loading={instanceFetching}
        filterOption={false}
        onSearch={(e) => {
            this.setState(
                {
                    featchName: e,
                    instanceList: [],
                },
                this.fetchAllInstance
            );
        }}
        onPopupScroll={(e) => {
            this.handleScroll(e);
        }}
        onChange={(value) => {
            let instanceInfo = value?.split("_&_");
            this.setState({
                modalInfo: {
                    ...modalInfo,
                    instanceId: instanceInfo?.[0] || "",
                    instanceName: instanceInfo?.[1] || "",
                },
            });
        }}
    >
        {this.renderOption()}
    </Select>

    // 获取实例 引用lodash中的debounce防抖
    fetchAllInstance = debounce((type = "reset") => {
        this.setState({
            instanceFetching: true,
        });
        const { instanceParam, featchName, instanceList } = this.state;
        const { dispatch } = this.props;

        let tempPage = {
            ...instanceParam,
        };

        if (type === "reset") {
            tempPage.pageIndex = 1;
        } else {
            tempPage.pageIndex += 1;
        }

        // dispatch 加载请求
        dispatch({
            type: "speed/getAllInstance",
            payload: {
                pageIndex: tempPage.pageIndex,
                pageSize: tempPage.pageSize,
                instanceName: featchName,
            },
            callback: (res) => {
                if (!res.success) {
                    if (res.message === "iam访问未授权") {
                        ModalError(res);
                    } else {
                        notification.error({
                            message: res.message,
                        });
                    }
                }
                let list = res?.data?.instanceNameDTOS || [];

                if (type === "load") {
                    list = instanceList.concat(list);
                }

                this.setState({
                    instanceList: list,
                    instanceParam: {
                        ...tempPage,
                        totalCount: res?.data?.totalCount || 0,
                    },
                    instanceFetching: false,
                });
            },
        });
    }, 600);


    // renderOption 渲染内容
    renderOption = () => {
        const { instanceList, instanceFetching } = this.state;
        return instanceList
            .map((item) => (
                <Option
                    value={`${item.instanceId}_&_${item.instanceName}`}
                    key={item.instanceId}
                >
                    {item.instanceName}
                </Option>
            ))
            .concat(
                <Option className={Styles.last__option} key="instanceFetching">
                    加载完成
                    <Spin size="small" spinning={instanceFetching}></Spin>
                </Option>
            );
        // 加载样式有点问题 先注释不使用
    };
```

PS: 添加加载完成展示项，需要把filterOption设置到false，它会根据输入值过滤一遍选择项
