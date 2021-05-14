<template>
  <div class="reminders overflow-auto">
    <div
      class="user-select-none text-break border rounded p-1 mx-1 mb-1 mt-1"
      v-for="(reminder, reminderIndex) in currentReminders(day)"
      :key="reminderIndex"
      :style="{ ...reminder.colors }"
      @click="click(reminder)"
    >
      <div>
        <small>
          <strong>
            {{ reminderTime(reminder) }}
          </strong>
        </small>
        <CalendarWeather class="float-end" :city="reminder.city" :dateTime="reminder.dateTime" />
      </div>
      <div>
        <small>
          {{ reminder.text }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { formatTime } from '@/core';

import CalendarWeather from '@/components/CalendarWeather';

export default {
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  components: {
    CalendarWeather
  },
  computed: {
    ...mapGetters(['currentReminders'])
  },
  methods: {
    reminderTime: (reminder) => formatTime(reminder.dateTime),
    click(reminder) {
      this.$emit('click', reminder);
    }
  }
};
</script>

<style scoped>
.reminders {
  max-height: 134px;
}

.reminders::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}

.reminders::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.reminders::-webkit-scrollbar-thumb {
  background: darkgray;
}

.reminders::-webkit-scrollbar-thumb:hover {
  background: darkgray;
}
</style>
