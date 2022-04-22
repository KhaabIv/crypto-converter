<template>
  <div
      class="flex w-[148px] rounded-r-[6px] items-center justify-between bg-[#F6F7F8] hover:cursor-pointer"
      @click.stop="$emit('openList', true)"
  >
    <div class="flex ml-[32px]">
      <div name="img" class="w-[20px] h-[20px]">
        <img :src="currencyOptions.image">
      </div>
      <div name="ticker" class="truncate ml-[12px] h-[23px] max-w-[60px]">
        <p class="truncate text-[16px] h-[23px]">{{ currencyOptions.ticker }}</p>
      </div>
    </div>
    <div class="flex items-center h-[16px] w-[16px] mr-[8px] ">
      <my-vector></my-vector>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-selected-currency',
  data() {
    return {
      image: '',
      ticker: ''
    }
  },
  props: {
    currencyOptions: {
      type: Object,
      required: true
    },
  },
}
</script>
