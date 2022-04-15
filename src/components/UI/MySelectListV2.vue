<template>
  <div class="absolute top-[-1px] left-[-1px] right-[-1px] box-content z-10 min-w-[328px] w-full max-w-[440px] mr-4 border rounded-[6px] bg-[#C1D9E5]">
    <div class="bg-[#C1D9E5] rounded-[5px]">
      <div class="flex flex-row w-full justify-between bg-[#F6F7F8] rounded-t-[5px] border-b border-[#E3EBEF]">
        <input
            class="h-12 grow w-full bg-[#F6F7F8] ml-4 focus:outline-none"
            name="search"
            type="text"
            ref="inputCurrency"
            placeholder="Search"
            v-model="searchValue"
            @input="searchCurrency"
        />
        <div class="self-center h-[16px] w-[16px] mr-4">
          <my-cross
              class="m-[2px] hover:cursor-pointer"
              @click="clearModalValue"
          ></my-cross>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col overflow-y-auto overflow-x-hidden max-h-[250px] rounded-b-[5px] bg-[#F6F7F8]"
         name="list">
      <div v-for="option in currentCurrencyArray" name="elem">
        <my-currency-item
            :option="option"
            @selectCurrency="$emit('selectCurrency', $event)"
        ></my-currency-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-select-list2',
  data() {
    return {
      currentCurrencyArray: this.options,
      searchValue: ''
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    isOpenList: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    isOpenList(newValue) {
      if (newValue) {
        this.init()
      } else {
        if (this.options.filter(o => o.ticker === this.$refs.inputCurrency.value).length === 0) {
          this.clearModalValue()
        }
      }
    },
  },
  methods: {
    init() {
      this.currentCurrencyArray = this.options
    },

    clearModalValue() {
      this.init()
      this.searchValue = ''
    },

    searchCurrency(event) {
      let currentText
      if (event.target.value.length !== 0) {
        currentText = event.target.value.toUpperCase()
        this.currentCurrencyArray = this.options.filter(o => o.ticker.slice(0, event.target.value.length) === currentText)
      } else {
        this.init()
      }
      if (this.currentCurrencyArray.length === 0) {
        this.init()
      }
    },
  },
  mounted() {
    this.init()
  }
}
</script>
