<template>
<div>
    <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
        {{tag}}
    </el-tag>
    <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            :suffix-icon="SuffixIcon"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
</div>
</template>

<script setup>
import {ref, reactive, watch, h} from 'vue'
import {ElMessage} from "element-plus";
import {} from '@element-plus/icons-vue'
import enterIcon from './enterIcon.vue'
/*const data = reactive({
  dynamicTags: ['标签一', '标签二', '标签三'],
  inputVisible: false,
  inputValue: ''
})*/
// const dynamicTags = ref([])
const inputVisible = ref(false)
const inputValue = ref('')

const props = defineProps({
    tags: {
        type: Array,
        default: () => []
    }
})
const dynamicTags = ref([...props.tags])
const emits = defineEmits(['update:tags'])
function emitUpdate() {
    emits('update:tags', dynamicTags.value)
}
// 监听 modelValue 变化，保证 tags 同步更新
watch(() => props.tags, (newValue) => {
    dynamicTags.value = newValue
})

function handleClose(tag) {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
    emitUpdate()
}

function showInput() {
    inputVisible.value = true;
}

function handleInputConfirm() {
    if (inputValue.value) {
        if (dynamicTags.value.includes(inputValue.value)) {
            ElMessage({
                message: '该标签已存在',
                type: 'warning',
            });
        } else {
            dynamicTags.value.push(inputValue.value);
            emitUpdate()
        }
    }
    inputVisible.value = false;
    inputValue.value = '';
}

const SuffixIcon = () => h(enterIcon, { iconClass: 'icon-enter' })
</script>

<style lang="stylus" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
