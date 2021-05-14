import Vue from 'vue';
import store from '@/store';

const app = new Vue({ store });

describe('Jobsity challenge tests', () => {
  it('Add a new reminder', () => {
    expect(app.$store.state.reminders.length).toEqual(0);
    const reminder = {
      text: 'My reminder',
      dateTime: new Date(),
      city: 'New York, US'
    };
    app.$store.commit('saveReminder', reminder);
    const reminderTest = app.$store.state.reminders[0];
    expect(reminderTest.text).toEqual(reminder.text);
    expect(reminderTest.dateTime).toEqual(reminder.dateTime);
    expect(reminderTest.city).toEqual(reminder.city);
  });

  it('Add a new reminder max 30 chars', () => {
    const reminder = {
      text: 'A very large text to the reminder',
      dateTime: new Date(),
      city: 'New York, US'
    };
    expect(() => {
      app.$store.commit('saveReminder', reminder);
    }).toThrow('Title text may contain up to 30 characters');
  });
});
