vue2
```css
  ::v-deep .child-class {
    background-color: #000;
  }

  /deep/ .el-input__inner {
        height: 32px;
        line-height: 32px;
        background: #f7f7f7;
        border-radius: 8px;
        border-color: #f7f7f7;
    }
```

vue3中使用:deep
```css
:deep(.child-class) {
    background-color: #000;
}

// slotted
:slotted(.slot-class) {
    background-color: #000;
}

// :global
:global(.my-class) {
    background-color: #000;
}
```