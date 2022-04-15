<template>
  <input
      v-model.number="currencyValue"
      :type="type"
      :readonly="isDisabled"
      :min="minValue"
      class="min-w-[177px] max-w-[290px] h-full bg-[#F6F7F8] text-sm indent-4 lining-nums rounded-l-[6px] focus:outline-none"
      @input="updateInput"
  />
</template>

<script>
export default {
  name: 'my-input',
  props: {
    currencyOptions: {
      type: Object,
      required: true
    },
    isDisabled: {
      type: Boolean,
      required: true
    },
    currencyValue: {
      type: Number || String,
      required: true
    },
    minValue: {
      type: Number,
      required: false
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('updateCurrencyValue', event.target.value)
    }
  }
}
</script>
