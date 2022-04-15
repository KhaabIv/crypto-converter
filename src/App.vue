<template>
  <div
      class="
      w-screen h-screen overflow-hidden
      wideScreen:flex wideScreen:flex-col wideScreen:items-center
      tablet:justify-center tablet:w-[960px] tablet:m-auto"
  >
    <div class="
      flex-col flex justify-start pt-16 pr-12 pb-14 pl-4
      tablet:self-start">
      <div><p class="text-4xl font-normal mb-3.5">Crypto Exchange</p></div>
      <div><p class="text-xl font-medium">Exchange fast and easy</p></div>
    </div>
    <div class="
      flex flex-col min-w-[328px] max-w-[440px] px-[16px]
      wideScreen:w-[960px]
      tablet:flex-row tablet:w-[960px] tablet:max-w-[960px]">
      <div class="relative">
        <currencies-data
            :type="'number'"
            :options="options"
            :minValue="minAmountCurrent"
            :currencyValue="currentValueCurrentCurrency"
            :isOpenList="isOpenListCurrentCurrency"
            :currencyOptions="currentCurrency"
            :isLoading="isLoadingCurrent"
            @openList="openCurrencyList($event, type = 'current')"
            @selectCurrency="selectCurrency($event, type = 'current')"
            @updateCurrencyValue="updateCurrentCurrencyValue"
        />
        <my-loader class="absolute top-[8px] left-[25%]" v-if="isLoadingCurrent"/>
        <div v-if="errorValue"
             class="flex items-center bg-[#F6F7F8] rounded-b-lg border-x border-b justify-center min-w-[328px] max-w-[440px] w-full absolute h-[40px] bottom-[-36px] tablet:w-[440px] tablet:bottom-[-30px]">
          <p class="lining-nums text-center text-[#E03F3F]">Minimum amount {{ minAmountCurrent }}
            {{ currentCurrency.ticker }}</p>
        </div>
      </div>
      <my-swap
          class="self-end mt-4 mb-4 hover:cursor-pointer tablet:m-[16px] tablet:rotate-90"
          @click="swapCurrency"
      ></my-swap>
      <div class="relative">
        <currencies-data
            :type="'string'"
            :errorValue="errorValue"
            :isDisabled="isDisabledInputConvert"
            :options="options"
            :minValue="minAmountConvert"
            :currencyValue="currentValueConvertCurrency"
            :isOpenList="isOpenListConvertCurrency"
            :currencyOptions="convertCurrency"
            :errorValueConvert="errorValue"
            :isLoading="isLoadingConvert"
            @openList="openCurrencyList($event, type = 'convert')"
            @selectCurrency="selectCurrency($event, type = 'convert')"
        />
        <my-loader class="absolute top-[8px] left-[25%]" v-if="isLoadingConvert"/>
      </div>
    </div>
    <div class="
      tablet:flex tablet:items-end tablet:min-w-[928px] tablet:max-w-[960px] tablet:w-full tablet:px-[16px]">
      <div class="
      flex flex-col h-[81px] min-w-[328px] max-w-[723px] mt-12 pl-4 pr-4
      wideScreen:w-[440px] wideScreen:p-0
      tablet:w-full tablet:mr-[32px]">
        <p class="h-[23px] mb-[8px]">Your {{convertCurrency.name}} address</p>
        <input type="text"
               class="w-full h-full border-solid border bg-[#F6F7F8] rounded-md min-w-[328px] max-w-[723px] indent-4 focus:outline-none"/>
      </div>
      <div class="
      w-[328px] h-[50px] mt-12 m-auto
      wideScreen:w-[440px]
      tablet:w-[205px] tablet:m-0">
        <my-button
            :isDisabled="isError"
        >
          Exchange
        </my-button>
        <div v-if="isError" class="flex justify-center mt-[8px]">
          <p class="text-[#E03F3F]">{{ textErrorValue }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CurrenciesData from "./components/CurrenciesData.vue";
import axios from 'axios'

export default {
  components: {CurrenciesData},
  data() {
    return {
      options: [],
      currentCurrency: {
        name: '',
        ticker: '',
        image: '',
      },
      convertCurrency: {
        name: '',
        ticker: '',
        image: '',
      },
      minAmountCurrent: 0,
      minAmountConvert: 0,
      currentValueCurrentCurrency: 0,
      currentValueConvertCurrency: 0,
      textErrorValue: '',
      isDisabledInputConvert: true,
      isError: false,
      isLoadingCurrent: false,
      isLoadingConvert: false,
      isOpenListCurrentCurrency: false,
      isOpenListConvertCurrency: false,
    }
  },
  computed: {
    errorValue() {
     if (+this.currentValueCurrentCurrency < +this.minAmountCurrent) {
       this.isError = true
       this.textErrorValue = 'This pair is disabled now'
       this.currentValueConvertCurrency = '—'
       return true
     } else {
       this.isError = false
     }
    }
  },
  methods: {
    setDefaultCurrency() {
      this.currentCurrency = {
        name: this.options[0].name,
        ticker: this.options[0].ticker,
        image: this.options[0].image
      }
      this.convertCurrency = {
        name: this.options[1].name,
        ticker: this.options[1].ticker,
        image: this.options[1].image
      }
    },

    updateCurrentCurrencyValue(value) {
      this.currentValueCurrentCurrency = value
      if (+this.currentValueCurrentCurrency >= +this.minAmountCurrent) {
        this.getConvertValue()
      }
    },

    openCurrencyList(event, type) {
      if (type === 'current') {
        this.isOpenListConvertCurrency = false
        this.isOpenListCurrentCurrency = event
      } else {
        this.isOpenListCurrentCurrency = false
        this.isOpenListConvertCurrency = event
      }
    },

    setLoadingStatus(type, value) {
      if (type === 'current') {
        this.isLoadingCurrent = value
      } else if (type === 'convert') {
        this.isLoadingConvert = value
      } else {
        this.isLoadingCurrent = value
        this.isLoadingConvert = value
      }
    },

    async selectCurrency(event, type) {
      if (type === 'current') {
        this.currentCurrency = {
          name: event.name,
          ticker: event.ticker,
          image: event.image,
        }
        this.isOpenListCurrentCurrency = false
      } else {
        this.convertCurrency = {
          name: event.name,
          ticker: event.ticker,
          image: event.image,
        }
        this.isOpenListConvertCurrency = false
      }
      await this.getMinimalExchangeAmountCurrentCurrency()
      await this.getConvertValue()
    },

    async swapCurrency() {
      const temporaryCurrentCurrency = {
        name: this.currentCurrency.name,
        ticker: this.currentCurrency.ticker,
        image: this.currentCurrency.image
      }
      this.currentCurrency = {
        name: this.convertCurrency.name,
        ticker: this.convertCurrency.ticker,
        image: this.convertCurrency.image,
      }
      this.convertCurrency = {
        name: temporaryCurrentCurrency.name,
        ticker: temporaryCurrentCurrency.ticker,
        image: temporaryCurrentCurrency.image
      }
      await  this.getMinimalExchangeAmountCurrentCurrency()
      if (+this.currentValueCurrentCurrency < +this.minAmountCurrent) {
        this.currentValueCurrentCurrency = this.minAmountCurrent
      }
      await this.getConvertValue()
    },

    async fetchCurrency() {
      const url = 'https://api.changenow.io/v1/currencies?active=true'
      this.setLoadingStatus('all', true)
      try {
        const currency = await axios.get(url)
        this.options = currency.data.map(c => {
          return c = {
            ticker: c.ticker.toUpperCase(),
            name: c.name,
            image: c.image
          }
        })
        this.setDefaultCurrency()
        await this.getMinimalExchangeAmountCurrentCurrency()
        await this.getConvertValue()
      } catch (e) {
        this.isError = true
        this.textErrorValue = e
      }
    },

    async getMinimalExchangeAmountCurrentCurrency() {
      const url = `https://api.changenow.io/v1/min-amount/${this.currentCurrency.ticker.toLowerCase()}_${this.convertCurrency.ticker.toLowerCase()}?api_key=${import.meta.env.VITE_API_KEY}`
      try {
        const minAmountCurrent = await axios.get(url)
        this.minAmountCurrent = minAmountCurrent.data.minAmount
        this.currentValueCurrentCurrency = this.minAmountCurrent
        this.setLoadingStatus('current', false)
      } catch (e) {
        this.isError = true
        this.textErrorValue = 'This currency is not available'
      }
    },

    async getConvertValue() {
      const url = `https://api.changenow.io/v1/exchange-amount/${this.currentValueCurrentCurrency}/${this.currentCurrency.ticker.toLowerCase()}_${this.convertCurrency.ticker.toLowerCase()}?api_key=${import.meta.env.VITE_API_KEY}`
      if (this.isLoadingConvert !== true) {
        this.setLoadingStatus('convert', true)
      }
      try {
        const convertValue = await axios.get(url)
        this.currentValueConvertCurrency = convertValue.data.estimatedAmount
      } catch (e) {
        this.isError = true
        this.currentValueConvertCurrency = '—'
        this.textErrorValue = 'Currency pair is not available for conversion'
      } finally {
        this.setLoadingStatus('convert', false)
      }
    },

  },
  mounted() {
    this.fetchCurrency()
  }
}
</script>
