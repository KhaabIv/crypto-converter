<template>
  <button
      class="w-full h-full rounded-md text-[#FFFFFF] bg-[#11B3FE] hover:bg-[#0095E0] disabled:cursor-not-allowed"
      :disabled="isDisabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',
  props: {
    isDisabled: {
      type: Boolean,
      required: false
    }
  }
}
</script>
