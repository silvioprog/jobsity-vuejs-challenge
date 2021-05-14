<template>
  <div class="my-xl-2">
    <div class="sticky-top">
      <CalendarBar @click="click" />
      <CalendarDays />
    </div>
    <CalendarTable @click="click" />
    <CalendarModal
      :visible="modalVisible"
      :day="modalDay"
      :reminder="modalReminder"
      @show="modalShow"
      @save="modalSave"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import CalendarBar from '@/components/CalendarBar.vue';
import CalendarDays from '@/components/CalendarDays.vue';
import CalendarTable from '@/components/CalendarTable.vue';
import CalendarModal from '@/components/CalendarModal';

export default {
  name: 'Calendar',
  components: {
    CalendarBar,
    CalendarDays,
    CalendarTable,
    CalendarModal
  },
  data() {
    return {
      modalVisible: false,
      modalDay: null,
      modalReminder: null
    };
  },
  methods: {
    ...mapMutations(['saveReminder']),
    click(day, reminder) {
      this.modalDay = day;
      this.modalReminder = reminder;
      this.modalVisible = true;
    },
    modalShow(shown) {
      this.modalVisible = shown;
    },
    modalSave(payload) {
      this.saveReminder(payload);
    }
  }
};
</script>
