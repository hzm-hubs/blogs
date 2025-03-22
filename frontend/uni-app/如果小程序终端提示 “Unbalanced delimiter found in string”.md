如果小程序终端提示 “Unbalanced delimiter found in string”，请检查
 
ifdef 与 endif 是否成对
```
//  #ifdef
…………
//  #endif
```
以  #ifdef 开始 就必须以 #endif 结尾才能正常编译