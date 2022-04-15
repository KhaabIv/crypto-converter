<template>
  <div
      class="flex truncate h-[48px] max-w-[438px] w-80 min-w-[328px] space-x-4 bg-[#F6F7F8] items-center hover:cursor-pointer hover:bg-[#EAF1F7]"
      @click="$emit('selectCurrency', option)"
  >
    <div
        name="img"
        class="h-5 w-3.5 ml-4"
    >
      <img
          class="h-5 w-3.5"
          :src="option.image"
      >
    </div>
    <div name="ticker">
      <p>{{ option.ticker }}</p>
    </div>
    <div class="contents  grow-0">
      <p class="text-[#80A2B6] ml-4 mr-4 truncate ">{{ option.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-currency-item',
  props: {
    option: {
      type: Object,
      required: true
    }
  },
}
</script>
