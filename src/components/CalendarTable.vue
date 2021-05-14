<template>
  <div>
    <div class="row" v-for="(row, rowIndex) in currentCalendar" :key="rowIndex">
      <div
        v-for="(col, colIndex) in row"
        class="day col-sm col-xs-1 border border-secondary p-0"
        :data-weekend="col.weekend"
        :data-current="col.current"
        :key="colIndex"
        @click.self="click(col)"
      >
        <div class="title user-select-none sticky-top px-1" @click.self="click(col)">
          <strong :class="{ 'badge rounded bg-primary': col.today }" @click.self="click(col)">{{ col.day }}</strong>
          <button
            v-if="col.reminderIds.length > 0"
            class="btn-close-all btn-close btn-sm border shadow-none float-end mt-1"
            @click="clear(col)"
          />
        </div>
        <CalendarReminders :day="col" @click="click(col, $event)" />
      </div>
      <div class="d-block d-sm-none mt-2" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import CalendarReminders from '@/components/CalendarReminders';

export default {
  components: {
    CalendarReminders
  },
  computed: {
    ...mapState(['reminders']),
    ...mapGetters(['currentCalendar'])
  },
  methods: {
    ...mapMutations(['clearReminders']),
    click(day, reminder) {
      this.$emit('click', day, reminder);
    },
    clear(day) {
      this.clearReminders(day);
    }
  },
  watch: {
    reminders() {
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
.btn-close-all {
  width: 10px;
  height: 10px;
  background-size: 8px;
}

.day {
  min-height: 160px;
  max-height: 160px;
  background-color: #f8f9fa;
  cursor: pointer;
}

.day:hover {
  background-color: #f3f3f3;
}

.day[data-weekend] {
  background-color: lightgrey;
  color: #0d6efd;
}

.day[data-weekend]:hover {
  background-color: #e3e3e3;
}

.day:not([data-current]) {
  color: darkgray;
}

.row:not(:first-child) .day {
  border-top-width: 0 !important;
}

.day:not(:first-child) {
  border-left-width: 0 !important;
}

.title {
  z-index: 1010;
}
</style>
