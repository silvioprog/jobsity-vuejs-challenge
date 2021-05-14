import Vue from 'vue';
import Vuex from 'vuex';

import { today, previousMonth, nextMonth, compareDayToDate, formatMonthYear, calendar } from '@/core';

Vue.use(Vuex);

const updateCalendars = ({ state, getters }) => {
  if (!state.calendars.has(getters.currentDate)) {
    state.calendars.set(getters.currentDate, calendar(state.currentDate));
  }
};

export default new Vuex.Store({
  state: {
    currentDate: today(),
    calendars: new Map(),
    reminders: []
  },
  getters: {
    currentDate: ({ currentDate }) => formatMonthYear(currentDate),
    currentCalendar: ({ calendars }, { currentDate }) => calendars.get(currentDate),
    currentReminders:
      ({ reminders }) =>
      (day) =>
        reminders
          .filter(({ dateTime }) => compareDayToDate(day, dateTime))
          .sort(({ dateTime: a }, { dateTime: b }) => a - b)
  },
  mutations: {
    today(state) {
      state.currentDate = today();
      updateCalendars(this);
    },
    previousMonth(state) {
      state.currentDate = previousMonth(state.currentDate);
      updateCalendars(this);
    },
    nextMonth(state) {
      state.currentDate = nextMonth(state.currentDate);
      updateCalendars(this);
    },
    saveReminder({ reminders }, { day, reminder }) {
      if (reminder.text.trim().length > 30) {
        throw Error('Title text may contain up to 30 characters');
      }
      let index = reminders.findIndex((currentReminder) => currentReminder.id === reminder.id);
      if (index > -1) {
        reminders.splice(index, 1, reminder);
      } else {
        const id = new Date().getTime();
        day.reminderIds.push(id);
        reminders.push({ ...reminder, id });
      }
    },
    clearReminders({ reminders }, { reminderIds }) {
      reminderIds.forEach((id) => {
        const index = reminders.findIndex((item) => item.id === id);
        if (index > -1) {
          reminders.splice(index, 1);
        }
      });
      reminderIds.splice(0, reminderIds.length);
    }
  }
});
