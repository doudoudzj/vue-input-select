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
  v-model="isShowList"
  parameter="{ '0': 'YES', '1': 'NO', '2': 'UNKNOWN' }"
  @change="onChangeFun"
  :empty-value="this.$t('CHOOSE')">
</input-select>
```
Reference variable
```vue
<template>
  <input-select
    v-model="isShowList"
    :parameter="parameter"
    @change="onChangeFun"
    :empty-value="defaultValue">
  </input-select>
</template>
export default {
  data () {
    return {
      parameter: {
        'a': 'YES',
        'b': 'NO',
        'c': 'UNKNOWN'
      },
      isShowList: false,
      defaultValue: 'Select item'
    }
  }
}
```

## Options

| item        | description                       | required |
| ----------- | --------------------------------- | -------- |
| v-model     | true or false to show option list | yes      |
| parameter   | options for select list           | yes      |
| empty-value | the default first select option   | no       |
| @change     | Callback custom variable          | no       |

