# Input Select

> A input select Vue component. Compatible with Vue >= 2.2.x

## Install

copy the file vue-input-select.vue to your project folder src/

in the file src/main.js, type in below code

``` vue
Vue.component('input-select', require('./vue-input-select.vue'))
```

## Usage

```vue
<input-select v-model="is" :parameter="{ '0': '是', '1': '不是', '2': '不知道' }" @change="onChangeFun"></input-select>
```

