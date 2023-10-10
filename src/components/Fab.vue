<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ fabIcon: string }>();

</script>

<template>
  <div class="fab-wrapper">
    <p class="fab-button">
      <slot name="icon" />
    </p>
    <ul class="fab-item-list">
      <li class="fab-item">
        <slot name="option1" />
      </li>
      <li class="fab-item">
        <slot name="option2" />
      </li>
      <li class="fab-item">
        <slot name="option3" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.fab-wrapper {
  z-index: 99999!important;
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 5;
  display: flex;
  flex-direction: center;
  align-items: center;
}

.fab-wrapper:hover .fab-item-list {
  bottom: 70px;
  opacity: 1;
  transition: 0.5s ease-in;
}

.fab-button {
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease-in-out;
}

.fab-button:hover {
  transform: scale(1.25);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

.fab-button p {
  font-size: 30px;
  color: #ffffff;
  text-align: center;
  line-height: 70px;
}

.fab-item-list {
  opacity: 0;
  width: 100%;
  position: absolute;
  padding: 0px;
  list-style: none;
  bottom: 0px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  transition: all 0.1s ease-in-out;
}

.fab-item {
  background: #0D9DDB;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease-in-out;
}

.fab-item:hover {
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
}
</style>
