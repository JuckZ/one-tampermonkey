<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getSelector } from '../util';
import Fab from './Fab.vue';

const count = ref(0);
let isSetting = ref(false);
let historyArr: string[] = [];
let clickHistory: string[] =[];

function handleClick (event: MouseEvent) {
  (event.target as HTMLElement).style.color = 'red!important';
  const selector = getSelector(event.target);
  if (selector) {
    clickHistory.push(selector);
  }
}

function setting() {
  window.addEventListener('click', handleClick);
  isSetting.value = true;
}

function goto() {
  if(historyArr.length === 0) {
    alert('没有历史记录，请先进行【设置】操作');
    return;
  }
  const menu = document.querySelector('#admin-side');
  if (!menu || !menu.checkVisibility()) {
    // 弹出菜单后再点击
    const btn = document.querySelector('#admin-login-box2');
    if (btn && btn instanceof HTMLElement) {
      btn.click();
    }
  }
  historyArr.forEach((selector) => {
    const ele = document.querySelector(selector);
    if (ele && ele instanceof HTMLElement) {
      ele.click();
    }
  });
}

function save() {
  if (!isSetting.value) {
    alert('没有正在进行的设置操作');
    return;
  }
  const clickHistoryStr = JSON.stringify(clickHistory);
  historyArr = clickHistory;
  localStorage.setItem('_clickHistory', clickHistoryStr);
  window.removeEventListener('click', handleClick);
  isSetting.value = false;
}

/**
 * 默认点击我已阅读
 */
function closeNotify() {
  let checker = setInterval(() => {
    const notificationEle = document.querySelector(
      '#agreementshow > div > div.el-dialog__body > div > div.buttonbottom > button',
    );
    if (notificationEle && notificationEle.checkVisibility()) {
      if (notificationEle instanceof HTMLElement) {
        notificationEle.click();
      }
      clearInterval(checker);
    }
  }, 200);
}

onMounted(() => {
  closeNotify();
  const clickHistory = localStorage.getItem('_clickHistory') || '[]';
  historyArr = JSON.parse(clickHistory);
});

</script>

<template>
  <div id="fab-component">
    <fab> 
      <template #icon>
        <span class="fab">
          <img
            class="btn-icon"
            src="https://avatars.githubusercontent.com/u/35656100"
          >
        </span>
      </template>
      <template #option1>
        <span
          class="fab"
          @click="setting"
        >设置{{ isSetting ? '中' : '' }}</span>
      </template> 
      <template #option2>
        <span
          class="fab"
          @click="goto"
        >跳转</span>
      </template> 
      <template #option3>
        <span
          class="fab"
          @click="save"
        >保存</span>
      </template> 
    </fab>
  </div>
</template>

<style scoped>
#fab-component {
  cursor: pointer;
}
.btn-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
</style>
