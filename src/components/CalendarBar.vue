<template>
  <nav class="navbar navbar-dark row bg-primary rounded-top">
    <div class="container-fluid">
      <div class="navbar-brand user-select-none">
        <strong>
          {{ currentDate }}
          <div class="d-none d-sm-block border-bottom" />
        </strong>
      </div>
      <div class="d-block d-sm-none w-100" />
      <div class="d-flex">
        <div class="btn-group" role="group" aria-label="Month navigation">
          <button
            type="button"
            class="btn btn-outline-light bi bi-caret-left-fill shadow-none"
            title="Previous month"
            @click="previousMonth"
          />
          <button
            type="button"
            class="btn btn-outline-light bi bi-circle-fill shadow-none"
            title="Today"
            @click="today"
          />
          <button
            type="button"
            class="btn btn-outline-light bi bi-caret-right-fill shadow-none"
            title="Next month"
            @click="nextMonth"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['currentDate'])
  },
  methods: {
    ...mapMutations(['previousMonth', 'today', 'nextMonth'])
  },
  created() {
    this.today();
  }
};
</script>
