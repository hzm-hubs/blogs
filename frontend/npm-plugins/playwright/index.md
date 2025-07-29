Playwright 是一个现代化的端到端(E2E)测试和浏览器自动化库，由 Microsoft 开发维护。它支持 Chromium、WebKit 和 Firefox 浏览器，并提供了跨平台、跨语言的统一 API。

[官网](https://playwright.dev/docs/intro)

### 主要用途

#### 端到端(E2E)测试

测试完整用户流程

验证关键业务路径

检测跨浏览器兼容性问题

#### UI 自动化

网页数据抓取

自动化重复性网页操作

生成网页截图和 PDF

#### 性能测试

测量页面加载时间

分析网络请求

检测内存泄漏

#### API 测试

拦截和验证网络请求

模拟不同网络条件

#### 无障碍(A11Y)测试

检查页面是否符合无障碍标准

示例
```
const { chromium } = require('playwright');

(async () => {
  // 启动浏览器
  const browser = await chromium.launch();
  // 创建新页面
  const page = await browser.newPage();
  // 导航到网址
  await page.goto('https://example.com');
  // 截图
  await page.screenshot({ path: 'example.png' });
  // 关闭浏览器
  await browser.close();
})();
```