```
<script setup>
import { ref,toRef,reactive,watch,computed,onMounted,onUnmounted,defineProps,defineEmits} from 'vue'

const variable = ref(0) // variable.value 输出 0

const inputRef = toRef（null）
<input :ref=inputRef />

const tempObject = reactive(
  {
    dice: 0,
    rolls: []
  }
) // tempObject.dice 0


onMounted(() => {
    console.log('onMounted --') 
}) // const pdfjs = await import("pdfjs-dist/build/pdf") 的导入写法可能会影响 onMounted 钩子函数执行

</script>
```