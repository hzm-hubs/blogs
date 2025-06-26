俩种都是Vue3的响应式API，都用于从响应式对象(reactive对象)中创建 ref 引用，创建的 ref 都会保持与源属性的响应式连接

#### toRef

用于为响应式对象(reactive对象)的单个属性创建一个 ref，保持对该属性的响应式连接，常用于处理props某个属性。

语法：
```vue3
const fatherTitle = toRef(props, 'title')
```
当props的title属性变化时，fatherTitle 会自动更新

如果声明方式是:
```vue3
const fatherTitle = toRef(props.title)
```
当props的title属性变化时，fatherTitle不会更新，上述方法实际上是尝试为 prop 的当前值创建 ref，而不是为 prop 本身，结果是一个只包含 prop 初始值的普通 ref，不会响应 prop 的后续变化。与 `ref(props.title)` 无异

注意：设计上 toRef 的类型应该始终与源对象属性的类型一致，所以 toRef 本身确实不直接接受类型参数，但你可以通过几种方式为 toRef 创建的 ref 指定 TypeScript 类型。

1) 自动类型推断 (推荐)
```vue3
import { toRef } from 'vue'

const obj = reactive({ count: 0, name: 'Vue' })
const countRef = toRef(obj, 'count') // 自动推断为 Ref<number>
const nameRef = toRef(obj, 'name')  // 自动推断为 Ref<string>
```

2) 显式类型声明
```
const countRef: Ref<number> = toRef(obj, 'count')
```
3) 使用 toRef 的变体 - toRef<T>
```
function typedToRef<T>(obj: T, key: keyof T): Ref<T[keyof T]> {
  return toRef(obj, key)
}

const countRef = typedToRef(obj, 'count') // Ref<number>
```
4) 使用 computed 作为替代
```
const countRef = computed(() => obj.count) // ComputedRef<number>
```
#### toRefs

作用：将响应式对象(reactive对象)转换为普通对象，但对象的每个属性都是 ref

```vue3
const refsObject = toRefs(reactiveObject)
```

批量转换对象的所有属性，返回的对象每个属性都是 ref，保持与源对象所有属性的响应式连接。

常用于解构响应式对象，并保持关联.

```vue3
const state = reactive({ count: 0, name: 'Vue' })

// 解构使用而不失去响应性
const { count, name } = toRefs(state)
```
