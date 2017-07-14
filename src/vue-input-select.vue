<template>
  <div :class="innerContainerClass" :style="{'width': width + 'px'}" @click="isShow=!isShow">
    <input readonly :class="[innerInputClass, {'active': isShow}]" :value="currName"></input>
    <i :class="['vue-input-select-triangle', {'active': isShow}]"></i>
    <ul :class="innerListClass" v-show="isShow">
      <li v-for="(item, key) in parameter" :class="[innerItemClass, {'selected': currValue === key }]" @click="setValue(key)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'vue-input-select',
  data () {
    return {
      isShow: false,
      currValue: '',
      currName: '',
      innerContainerClass: 'vue-input-select',
      innerInputClass: 'vue-input-select-input',
      innerListClass: 'vue-input-select-list',
      innerItemClass: 'vue-input-select-item'
    }
  },
  model: {
    prop: 'modelValue' // 导入外部绑定的v-model数据
  },
  props: {
    containerClass: {
      type: String,
      default: 'vue-input-select' // 容器 css class
    },
    inputClass: {
      type: String,
      default: 'vue-input-select-input' // 输入框 css class
    },
    listClass: {
      type: String,
      default: 'vue-input-select-list' // 下拉容器 css class
    },
    itemClass: {
      type: String,
      default: 'vue-input-select-item' // 下拉 css class
    },
    width: {
      type: String,
      default: '210' // 默认宽度
    },
    parameter: {
      type: Object,
      default: {} // 下拉数据，{ key: value, key2: value2 }
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initDom()
    this.setValue(this.modelValue)
  },
  watch: {
    modelValue (val) {
      this.setValue(val) // 外部model绑定的数据变化时，更新本地数据
    },
    currValue (val) {
      this.$emit('input', val) // 本地数据变化时，更新外部model绑定的数据
    }
  },
  methods: {
    setValue (x) {
      this.currValue = x
      this.currName = this.parameter[x]
    },
    initDom () {
      this.innerContainerClass = this.containerClass !== this.innerContainerClass ? (this.innerContainerClass + ' ' + this.containerClass) : this.innerContainerClass
      this.innerInputClass = this.inputClass !== this.innerInputClass ? (this.innerInputClass + ' ' + this.inputClass) : this.innerInputClass
      this.innerListClass = this.listClass !== this.innerListClass ? (this.innerListClass + ' ' + this.listClass) : this.innerListClass
      this.innerItemClass = this.itemClass !== this.innerItemClass ? (this.innerItemClass + ' ' + this.itemClass) : this.innerItemClass
      document.addEventListener('click', this.loadBind, true)
      document.addEventListener('contextmenu', this.loadBind, true)
      document.addEventListener('keydown', this.loadBindKey, false)
    },
    loadBind (e) {
      if (this.isShow && !this.$el.contains(e.target)) {
        this.isShow = false
      }
    },
    loadBindKey (e) {
      if (this.isShow && e.key === 'Escape') {
        this.isShow = false
      }
    }
  },
  beforeDestroy () {
    document.removeEventListener('click', this.loadBind, true)
    document.removeEventListener('contextmenu', this.loadBind, true)
    document.removeEventListener('keydown', this.loadBindKey, false)
  }
}
</script>

<style>
  .vue-input-select {
    position: relative;
    display: inline-block;
  }
  .vue-input-select * {
    box-sizing: border-box;
    cursor: default;
  }
  .vue-input-select:hover .vue-input-select-list {
    border-color: #3A82FF;
  }
  .vue-input-select-input {
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: #dcdcdc;
    border-radius: 2px;
    padding-left: 5px;
    padding-right: 5px;
    outline: none;
    transition: all 0.3s ease-in-out;
    display: inline-block;
    font-family: -apple-system, Roboto-Regular, SourceHanSansCN-Regular;
    font-size: 13px;
    color: #000;
    letter-spacing: 0;
  }
  .vue-input-select-input.active {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .vue-input-select-triangle {
    width: 0;
    height: 0;
    background-image: none;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid #778291;
    position: absolute;
    right: 5px;
    top: 50%;
    margin-top: -3px;
  }
  .vue-input-select-list {
    width: 100%;
    position: absolute;
    background-color: #fff;
    border-color: #dcdcdc;
    border-style: solid;
    border-width: 0 1px 1px 1px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-shadow: 0 0 6px #ccc;
  }
  .vue-input-select-item {
    height: 28px;
    line-height: 28px;
    padding: 0 5px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .vue-input-select-item.selected {
    background-color: #dcdcdc;
  }
  .vue-input-select-item:hover, .vue-input-select-item.selected:hover {
    background-color: #5392ff;
    color: #fff;
  }
</style>