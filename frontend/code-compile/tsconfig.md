# tsconfig.json 

是用于配置 TypeScript 项目的根目录下的一个配置文件。它主要用于指定 TypeScript 编译器的选项和编译配置。

## 常见的 tsconfig.json 配置选项

- compilerOptions: 用于指定编译器的选项，例如目标版本、模块解析方式、输出路径等。
  
- include: 指定要包含在项目中的文件或文件夹。可以使用通配符（如*）来匹配多个文件。
  
- exclude: 指定在项目中排除的文件或文件夹。同样可以使用通配符进行匹配。
  
- extends: 可以继承其他配置文件，这样可以减少重复配置。值可以是预设（如"path/to/preset"）或其他配置文件。
  
- files: 指定项目中直接包含的文件列表。格式为字符串数组。
  
- compilerOptions.baseUrl: 设置基本路径，用于与绝对模块导入解析相关。
  
- compilerOptions.paths: 配置模块引用的别名路径映射。
  
- compilerOptions.strict: 启用严格的 TypeScript 检查规则。
  
## 注意项
需要注意的是，tsconfig.json 是 TypeScript 项目的核心配置文件。通过配置它，可以控制编译器的行为、代码检查和输出结果。可以根据项目需求进行相应的调整。

你可以根据自己的项目结构和编译器要求，根据文档指南配置 tsconfig.json 文件。根据项目需要，可以设置目标版本、模块解析方式、输出路径等编译器选项，并指定要包含或排除的文件。

总结起来，tsconfig.json 是用于配置 TypeScript 项目的配置文件。它包含一些常见的配置选项，用于指定编译器选项、包含的文件列表、排除的文件列表等。通过配置 tsconfig.json，你可以使用 TypeScript 编译器的功能，并根据项目需求进行相应的调整。