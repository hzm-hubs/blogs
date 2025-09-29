在项目根目录中添加 `.editorconfig` 配置文件
```
# Top-most EditorConfig file
root = true

# Unix-style newlines
[*]
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{js,cjs,jsx,ts,tsx,css,scss,less,html,json,yml,yaml,vue}]
indent_style = space
indent_size = 2

# Matches the exact file
[*.md]
trim_trailing_whitespace = false

```