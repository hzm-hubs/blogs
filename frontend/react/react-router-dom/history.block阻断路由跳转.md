## history.block 的基本用法

history.block 接收一个函数作为参数，该函数可以返回以下值：

1. 字符串：显示一个浏览器默认的确认对话框，内容为该字符串。

2. false：阻止路由跳转。

3. true：允许路由跳转。

示例代码
```jsx
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function MyComponent() {
  const history = useHistory();

  useEffect(() => {
    // 设置路由跳转拦截
    const unblock = history.block((location, action) => {
      // 显示确认对话框
      return '您有未保存的更改，确定要离开吗？';
    });

    // 清理函数，组件卸载时取消拦截
    return () => {
      unblock();
    };
  }, [history]);

  return <div>My Component</div>;
}
```
说明

history.block 返回一个函数（unblock），调用该函数可以取消拦截。

在组件卸载时，务必调用 unblock 以避免内存泄漏。

## 自定义拦截逻辑

除了显示默认的确认对话框，你还可以自定义拦截逻辑。例如，根据条件决定是否阻止跳转。

示例代码
```jsx
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function MyComponent() {
  const history = useHistory();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);

  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (hasUnsavedChanges) {
        // 自定义逻辑
        const confirmLeave = window.confirm('您有未保存的更改，确定要离开吗？');
        return confirmLeave; // 如果用户确认离开，返回 true；否则返回 false
      }
      return true; // 如果没有未保存的更改，允许跳转
    });

    return () => {
      unblock();
    };
  }, [history, hasUnsavedChanges]);

  return (
    <div>
      <button onClick={() => setHasUnsavedChanges(false)}>保存更改</button>
      <button onClick={() => history.push('/another-page')}>跳转到其他页面</button>
    </div>
  );
}
```
说明

通过 hasUnsavedChanges 状态判断是否有未保存的更改。

如果用户确认离开，返回 true 允许跳转；否则返回 false 阻止跳转。

## 自定义拦截时 history.block 的参数

history.block 的回调函数接收两个参数：

location：目标路由的位置对象，包含 pathname、search、hash 等信息。

action：路由跳转的类型，可能是 PUSH、POP 或 REPLACE。

示例
```javascript
history.block((location, action) => {
  console.log('跳转目标:', location.pathname);
  console.log('跳转类型:', action);
  return true;
});
```

注意事项

清理拦截器：在组件卸载时，务必调用 unblock 取消拦截，否则可能会导致内存泄漏或意外行为。

用户体验：频繁使用 history.block 可能会影响用户体验，建议仅在必要时使用（例如表单未保存时）。

兼容性：history.block 依赖于 history 对象，确保使用的 react-router-dom 版本支持该功能。

自测

```js
  const [isEdit,setIsEdit] = useState(false)
  const [nextUrl,setNextUrl] = useState('')
  useEffect(() => {
    const unblock = history.block(({ location }: any) => {
      if (isEdit) {
        // 未保存跳转需要拦截
        setNextUrl(location.pathname); // 保存跳转记录
        setVisible(true); // 自定义的拦截弹窗
      } else {
        // 正常跳转
        unblock();
        history.push(location.pathname); 
      }
    });

    return () => {
      unblock();
    };
  }, [history, isEdit]);

  // 弹窗操作方法
    const footer = (
    <div className="modal-footer">
      <div className="footer-btns">
        <Button
          className="cancel-btn"
          onClick={() => {
            setIsEdit(false); // 设置为false
            setTimeout(() => {
               history.push(nextUrl) // 再次执行跳转
            }, 100); // 延迟避免isEdit数据没更新
          }}
        >
          不保存
        </Button>
        <Button
          className="cancel-btn"
          onClick={() => {
            setVisible(false);
          }}
        >
          取消
        </Button>
        <Button
          theme="solid"
          type="primary"
          onClick={() => {
            if (isEdit) {
                doUpdate(data, () => {
                    setIsEdit(false);
                    setTimeout(() => {
                        history.push(nextUrl)
                    }, 100);
                });
            } else {
                doUpdate(data); // 更新方法
            }
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
```

也可以不使用延时器，通过 useEffect 副作用出发跳转

```js
  const [isEdit,setIsEdit] = useState(false)
  const [nextUrl,setNextUrl] = useState('')

  useEffect(() => {
    if (!isEdit && nextUrl) {
      history.push(nextUrl);
    }
  }, [isEdit]);

  useEffect(() => {
    const unblock = history.block(({ location }: any) => {
      if (isEdit) {
        // 自定义逻辑
        setNextUrl(location.pathname);
        setVisible(true);
      } else {
        unblock();
        history.push(location.pathname);
      }
    });

    return () => {
      unblock();
    };
  }, [history, isEdit]);

  // 弹窗操作方法
    const footer = (
    <div className="modal-footer">
      <div className="footer-btns">
        <Button
          className="cancel-btn"
          onClick={() => {
            setIsEdit(false); // 设置为false
          }}
        >
          不保存
        </Button>
        <Button
          className="cancel-btn"
          onClick={() => {
            setVisible(false);
          }}
        >
          取消
        </Button>
        <Button
          theme="solid"
          type="primary"
          onClick={() => {
            if (isEdit) {
                doUpdate(data, () => {
                    setIsEdit(false);
                });
            } else {
              doUpdate(data); // 更新方法
            }
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
```

## history.replace(path) 👉 替换 当前历史记录，不会触发 history.block()，因为它没有真正改变历史记录的长度。

1. 手动封装 history.replace

```jsx
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
let isBlocked = false;

const blockNavigation = (message) => {
    isBlocked = true;
    history.block(message);
};

const customReplace = (path) => {
    if (isBlocked) {
        const confirmLeave = window.confirm("你确定要离开当前页面吗？");
        if (!confirmLeave) return;
    }
    history.replace(path);
};

// 让 `history.replace` 变成可拦截的
history.customReplace = customReplace;

export { history, blockNavigation };
```
使用
```jsx
import { history, blockNavigation } from "./history";

blockNavigation("确定要离开吗？");

// 调用 customReplace，而不是 history.replace
history.customReplace("/new-page");

```
2. 在 useEffect 监听 URL 变化

如果你使用的是 react-router-dom v6（不再暴露 history.block()），可以用 useEffect 监听 location 变化：

```jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useBlockNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unblock = () => {
            const confirmLeave = window.confirm("确定要离开当前页面吗？");
            return confirmLeave;
        };

        const handleBeforeUnload = (event) => {
            if (!unblock()) {
                event.preventDefault();
                event.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [location]);
};

export default useBlockNavigation;

```
在组件中使用：

```jsx
import useBlockNavigation from "./useBlockNavigation";

const MyComponent = () => {
    useBlockNavigation();
    return <div>页面内容</div>;
};

```

这个方法适用于 react-router-dom v6，但只会在 用户刷新或关闭页面 时生效。

## 总结
- history.block 是 react-router-dom 提供的一个强大功能，用于拦截路由跳转并执行自定义逻辑。通过合理使用，可以有效防止用户意外离开页面或丢失未保存的数据。

- history.push(path) 👉 添加 一个新记录到 history 栈，可以被 history.block() 拦截。

- history.replace(path) 👉 替换 当前历史记录，不会触发 history.block()，因为它没有真正改变历史记录的长度。

