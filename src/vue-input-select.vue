<template>
  <div :class="innerContainerClass" @click="isShow=!isShow">
    <input readonly :class="[innerInputClass, {'active': isShow}]" :value="currName"></input>
    <i :class="['vue-input-select-triangle', {'active': isShow}]"></i>
    <div :class="innerListClass" v-show="isShow" ref="itemlist" :style="listHeightStyle">
      <div @click="setValue(item.value)" v-for="(item, index) of currParameter"
      :class="[innerItemClass, {'selected': currValue === item.value.toString() }]">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vue-input-select',
  data () {
    return {
      isShow: false,
      currValue: '', // 最终传的值
      currName: '',
      currParameter: [{value: '', name: ''}],
      innerContainerClass: 'vue-input-select',
      innerInputClass: 'vue-input-select-input',
      innerListClass: 'vue-input-select-list',
      innerItemClass: 'vue-input-select-item',
      listHeightStyle: {}
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
    emptyValue: {
      type: String,
      default: ''
    },
    parameter: {
      type: Array,
      default: [], // 下拉数据，{ key: value, key2: value2 }
      required: true
    },
    modelValue: {
      required: true
    }
  },
  created () {
    this.updateList(this.emptyValue, this.parameter)
    this.setValue(this.modelValue)
  },
  mounted () {
    this.initDom()
    this.setName(this.modelValue)
  },
  computed: {
    list: function () {
      return this.$refs.itemlist
    }
  },
  watch: {
    modelValue (val) {
      this.setValue(val)
      this.setName(val)
    },
    parameter (val) {
      this.updateList(this.emptyValue, val)
    },
    currValue: {
      handler (val, oldVal) {
        this.setName(val)
        this.$emit('input', val) // 本地数据变化时，更新外部model绑定的数据
        if (String(val) === String(oldVal) || String(oldVal) === '' || String(val) === String(this.modelValue)) {
          return
        }
        if (val !== oldVal) {
          this.$emit('change', val) // 本地数据变化时，同时触发onchange事件
        }
      },
      deep: true
    },
    emptyValue (val) {
      this.updateList(val, this.parameter)
    },
    isShow (val) {
      if (val) {
        this.$nextTick(function () {
          this.updateListSize()
        })
      } else {
        this.listHeightStyle = {}
      }
    }
  },
  methods: {
    updateList (defaultEmptyValue, parameter) {
      if (defaultEmptyValue && defaultEmptyValue !== '') {
        this.currParameter = [{ value: '', name: defaultEmptyValue }]
        if (parameter) {
          for (let item of parameter) {
            this.currParameter.push(item)
          }
        }
      } else {
        this.currParameter = parameter
      }
      this.setValue(this.currValue)
      this.setName(this.currValue)
      this.$forceUpdate()
    },
    updateListSize () {
      let options = this.$refs.itemlist
      let bottom = options.getBoundingClientRect().bottom
      let right = options.getBoundingClientRect().right
      let h = document.documentElement.clientHeight
      let w = document.documentElement.clientWidth
      if (bottom - h <= 0 && right - w <= 0) {
        this.listHeightStyle = {}
        return
      }
      if (bottom - h > 0) {
        let hh = h - options.getBoundingClientRect().top
        this.listHeightStyle = {
          'overflow': 'auto',
          'height': hh + 'px'
        }
      }
      if (right - w > 0) {
        let ww = w - options.getBoundingClientRect().left
        let ss = {
          'overflow': 'auto',
          'width': ww + 'px'
        }
        let old = this.listHeightStyle
        Object.assign(old, ss)
        this.listHeightStyle = old
      }
    },
    setValue (x) {
      this.currValue = x.toString()
    },
    setName (x) {
      let that = this
      this.currParameter.map(function (item) {
        if (String(item.value) === String(x)) {
          that.currName = item.name
        }
      })
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
    font-size: 13px;
    font-family: -apple-system, sans-serif, serif;
    color: #000;
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
    padding-right: 15px;
    outline: none;
    transition: all 0.3s ease-in-out;
    display: inline-block;
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
    min-width: 100%;
    position: absolute;
    background-color: #fff;
    border-color: #dcdcdc;
    border-style: solid;
    border-width: 1px;
    border-top: 0;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-shadow: 0 0 6px #ccc;
    z-index: 1;
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
  .vue-input-select-item:hover,
  .vue-input-select-item.selected:hover {
    background-color: #5392ff;
    color: #fff;
  }
  .vue-input-select-list::-webkit-scrollbar {
    width: 16px;
    height: 14px;
    background: transparent;
  }
  .vue-input-select-list::-webkit-scrollbar-track {
    border-radius: 999px;
    border: 5px solid transparent;
  }
  .vue-input-select-list::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .2);
    border-radius: 999px;
    border: 5px solid transparent;
    min-height: 20px;
    background-clip: content-box;
  }
  .vue-input-select-list::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 139, 139, 0.73);
  }
  .vue-input-select-list::-webkit-scrollbar-thumb:active {
    background-color: rgb(139, 139, 139);
  }
  .vue-input-select-list::-webkit-scrollbar-corner {
    background-color: rgba(139, 139, 139, 0.73);
  }
</style>
