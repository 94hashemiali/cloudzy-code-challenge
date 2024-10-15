<script setup>
import {computed} from "vue";
import {useAlertStore} from "@/store/alert.module";

const alertStore = useAlertStore();
const alerts = computed(() => {
  return alertStore.reverseAlerts;
});
</script>

<template>
  <TransitionGroup name="alerts" id="alerts-container" tag="div">
    <div
        v-for="[key, alert] in alerts"
        :key="key"
        class="alert"
        :class="() => {alert.closable ? 'alert-dismissible' : ''; alert.color ? `alert-${alert.color}`: ''}">
      {{ alert.message }}
      <button v-if="alert.closable" type="button" class="btn btn-close" aria-label="Close">

      </button>
    </div>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
#alerts-container {
  position: fixed;
  top: calc(28px + .75rem);
  left: calc(24px + .75rem);
  display: flex;
  flex-direction: column;
  z-index: 1100;
}

.alerts-move,
.alerts-enter-active,
.alerts-leave-active {
  transition: all 0.5s ease;
}

.alerts-enter-from,
.alerts-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>