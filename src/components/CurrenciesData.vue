<template>
  <div class="relative flex min-w-[328px] max-w-[440px] h-[50px] bg-[#F6F7F8] rounded-[6px] border tablet:w-[440px]">
    <div v-if="!isOpenList" class="flex flex-row rounded-md-[5px] w-full">
      <my-input
          class="grow"
          :style="{ color: isLoading ? '#F6F7F8' : '#282828' }"
          :type="type"
          :minValue="minValue"
          :isDisabled="isDisabled"
          :currencyValue="currencyValue"
          :currencyOptions="currencyOptions"
          @updateCurrencyValue="$emit('updateCurrencyValue', $event)"
      />
      <div class="h-8 self-center border-r-[1px] outline-[#E3EBEF]"></div>
      <my-selected-currency
          :currencyOptions="currencyOptions"
          @openList="$emit('openList', $event)"
      ></my-selected-currency>
    </div>
    <my-select-list2
        v-if="isOpenList"
        :options="options"
        :isOpenList="isOpenList"
        @openList="$emit('openList', $event)"
        @selectCurrency="$emit('selectCurrency', $event)"
    >
    </my-select-list2>
  </div>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      required: false
    },
    options: {
      type: Array,
      required: true
    },
    minValue: {
      type: Number,
      required: false
    },
    currencyOptions: {
      type: Object,
      required: false
    },
    currencyValue: {
      type: Number || String,
      required: true
    },
    isOpenList: {
      type: Boolean,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
}
</script>
