vue中 class 简写状态
```css
  &-value {
    padding: 4px 8px;
    font-weight: 400;
    font-size: 14px;
    color: #797c80;
    line-height: 22px;
    text-align: left;
    box-sizing: border-box;

    &.disabled {
      border: 1px solid #fff;
      background: transparent;
      cursor: auto !important;
    }
  }
```
在 template 中使用
```
<a-textarea
    ref="inputRef"
    v-model:value="inputValue"
    class="edit-item-value"
    :class="{ disabled: showToggle }"
    :disabled="showToggle"
    auto-size
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
/>
```