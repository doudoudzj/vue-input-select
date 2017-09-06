# Input Select

> A input select Vue component. Compatible with Vue >= 2.2.x

## Install

copy the file vue-input-select.vue to your project folder src/

in the file src/main.js, type in below code

``` vue
Vue.component('input-select', require('./vue-input-select.vue'))
```

## Usage

Variable in tag
```vue
<input-select
  v-model="valueSelected" @change="onChangeFun" :empty-value="this.$t('CHOOSE')"
  parameter="[
  {value: '0', name: 'YES'},
  {value: '1', name: 'NO'},
  {value: '2', name: 'UNKNOWN'}]">
</input-select>
```
Reference variable
```vue
<template>
  <input-select v-model="valueSelected"
    @change="onChangeFun"
    :parameter="parameter"
    :empty-value="defaultValue">
  </input-select>
</template>
export default {
  data () {
    return {
      parameter: [
        {value: 'a', name: 'YES'},
        {value: 'b', name: 'NO'},
        {value: 'c', name: 'UNKNOWN'}
      ],
      valueSelected: 'c',
      defaultValue: 'Select item'
    }
  }
}
```

## Option

| item        | description                     | required | type     |
| ----------- | ------------------------------- | -------- | -------- |
| v-model     | the value selected              | yes      | String   |
| parameter   | options for select list         | yes      | Array    |
| empty-value | the default first select option | no       | String   |
| @change     | custom callback variable        | no       | Function |

