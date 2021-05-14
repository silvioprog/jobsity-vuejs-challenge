<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Reminder</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-2">
            <input v-model="colors.backgroundColor" type="color" class="form-control form-control-color" />
            <input v-model="text" type="text" class="form-control" placeholder="Add title" maxlength="30" />
          </div>
          <div class="d-flex justify-content-between mb-2">
            <CalendarDatePicker v-model="dateTime" type="date" />
            <span class="mx-1" />
            <CalendarDatePicker v-model="dateTime" type="time" />
          </div>
          <select v-model="city" class="form-select">
            <option v-for="city in cities" v-bind:value="city" v-bind:key="city">
              {{ city }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="save" :disabled="!isValid()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/src/modal';

import { CITIES, randomColor, invertColor } from '@/core';

import CalendarDatePicker from '@/components/CalendarDatePicker';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    day: {
      type: Object
    },
    reminder: {
      type: Object
    }
  },
  components: {
    CalendarDatePicker
  },
  data() {
    return {
      modal: null,
      id: null,
      text: null,
      dateTime: null,
      colors: {
        backgroundColor: null,
        color: null
      },
      city: null
    };
  },
  computed: {
    cities: () => CITIES
  },
  methods: {
    show({ type }) {
      this.$emit('show', type === 'shown.bs.modal');
    },
    isValid() {
      return !!this.text && this.text.trim().length > 0;
    },
    getColors(color) {
      return { backgroundColor: color, color: invertColor(color) };
    },
    clear() {
      this.id = null;
      this.text = null;
      this.dateTime = this.day ? this.day.toDate() : new Date();
      this.colors = this.getColors(randomColor());
      this.city = this.cities[0];
    },
    load() {
      this.id = this.reminder.id;
      this.text = this.reminder.text;
      this.dateTime = this.reminder.dateTime;
      this.colors = this.reminder.colors;
      this.city = this.reminder.city;
    },
    save() {
      const payload = {
        day: this.day,
        reminder: {
          id: this.id,
          text: this.text,
          dateTime: this.dateTime,
          colors: this.getColors(this.colors.backgroundColor),
          city: this.city
        }
      };
      this.$emit('save', payload);
      this.clear();
      this.modal.hide();
    }
  },
  mounted() {
    this.modal = new Modal(this.$el);
    this.$el.addEventListener('shown.bs.modal', this.show);
    this.$el.addEventListener('hidden.bs.modal', this.show);
  },
  destroyed() {
    this.modal.dispose();
  },
  watch: {
    visible(value) {
      if (value) {
        if (this.reminder) {
          this.load();
        } else {
          this.clear();
        }
        this.modal.show();
      } else {
        this.modal.hide();
      }
    }
  }
};
</script>
