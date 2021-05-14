<template>
  <div class="d-none d-lg-flex row text-white text-center bg-primary">
    <div class="col user-select-none p-1" v-for="day in weekdays" :key="day">
      <strong>
        {{ day }}
      </strong>
    </div>
  </div>
</template>

<script>
import { WEEKDAYS } from '@/core';

export default {
  computed: {
    weekdays: () => WEEKDAYS
  }
};
</script>
