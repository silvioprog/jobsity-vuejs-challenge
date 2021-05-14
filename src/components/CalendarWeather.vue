<template>
  <img v-if="icon" :src="formatIconUrl(icon)" :alt="description" :width="width" :height="height" />
</template>

<script>
import { is16CurrentDays, fetchWeather, formatIconUrl } from '@/core';

export default {
  props: {
    dateTime: {
      type: Date,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 30
    },
    height: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      icon: null,
      description: null
    };
  },
  methods: {
    formatIconUrl
  },
  async mounted() {
    if (is16CurrentDays(this.dateTime)) {
      const info = await fetchWeather(this.city, this.dateTime);
      this.icon = info.icon;
      this.description = info.description;
    }
  }
};
</script>
