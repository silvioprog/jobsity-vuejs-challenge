<template>
  <date-picker
    v-bind="$attrs"
    v-on="$listeners"
    input-class="form-control"
    :format="type === 'time' ? 'h:mm A' : ''"
    :use12h="type === 'time'"
    :type="type"
    :show-second="false"
    :clearable="false"
  >
    <i v-if="type === 'time'" slot="icon-calendar" class="bi bi-clock" />
  </date-picker>
</template>

<script>
import DatePicker from 'vue2-datepicker';

export default {
  props: {
    type: {
      type: String,
      default: 'date'
    }
  },
  components: {
    DatePicker
  }
};
</script>
