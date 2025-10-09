# jsconfig.json 

是用于配置 JavaScript 项目的根目录下的一个配置文件。它主要用于指定 JavaScript 项目的选项和编译器配置。

## 常见的 jsconfig.json 配置选项

- compilerOptions: 用于指定编译器的选项，例如目标版本、模块解析方式等。
  
- include: 指定要包含在项目中的文件或文件夹。可以使用通配符（如*）来匹配多个文件。
  
- exclude: 指定在项目中排除的文件或文件夹。同样可以使用通配符进行匹配。
  
- extends: 可以继承其他配置文件，这样可以减少重复配置。值可以是预设（如"path/to/preset"）或其他配置文件。
  
- files: 指定项目中直接包含的文件列表。格式为字符串数组。
  
- typeAcquisition: 设置项目中是否需要自动获取类型声明文件，如第三方库
  
  
## 注意项

jsconfig.json 只适用于使用了 ECMAScript 6 或更高版本的 JavaScript 项目。如果你的项目使用了 CommonJS 或 AMD 模块规范，或者使用了其他构建工具（例如Webpack或Rollup），则可能需要使用相应的配置文件进行配置。

jsconfig.json 的配置可以根据项目需求进行相应的调整。你可以根据自己的项目结构和编译器要求，配置选项来指定编译器的行为和功能。

总结起来，jsconfig.json 是用于配置 JavaScript 项目的配置文件。它包含一些常见的配置选项，用于指定编译器选项、包含的文件列表、排除的文件列表等。通过配置 jsconfig.json，你可以使用编译器的功能，并根据项目需求进行相应的调整。

// 基础配置实例
```json
{
    "compilerOptions": {
        // 编译目标
        "target": "es2020",
        "lib": ["es2020", "dom", "dom.iterable"],
        // 模块系统
        "module": "esnext",
        "moduleResolution": "node",
        "esModuleInterop": true,
        // 路径映射
        "baseUrl": "./",
        "paths": {
            "@/*": ["src/*"]
        },
        // 类型检查
        "allowJs": true,
        "checkJs": false,
        "strict": false,
        "skipLibCheck": true,
        "jsx": "preserve"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist", "**/*.test.js"]
}
```