<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
// 悬浮球
function floatingBall() {
  // TODO 点击的菜单都修改颜色
  function closeNotify() {
    // 默认点击我已阅读
    let checker = setInterval(() => {
      const notificationEle = document.querySelector("#agreementshow > div > div.el-dialog__body > div > div.buttonbottom > button")
      if (notificationEle && notificationEle.checkVisibility()) {
        if (notificationEle instanceof HTMLElement) {
          notificationEle.click()
        }
        clearInterval(checker)
      };
    }, 200);
  }
  closeNotify();
  let recorder = {
    clickHistory: [] as string[],
    cb: (event: MouseEvent) => {
      const selector = getSelector(event.target);
      if (selector) {
        recorder.clickHistory.push(selector);
      }
    }
  };
  let isSetting = false;

  function setting() {
    if (isSetting) {
      alert('已经处于设置状态');
      return;
    }
    window.addEventListener('click', recorder.cb)
    isSetting = true;
  }

  class FloatingBall {
    instance;
    cssText = "";
    btns: Button[];
    transitionTime = 500;
    justClicked = false;
    constructor(btns: Button[]) {
      this.btns = btns;
      this.instance = document.createElement('div');
      this.instance.style.cssText = `
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: black;
              width: 50px;
              height: 50px;
              background: rgba(0,0,200, 0.4);
              border-radius: 50%;
              position: fixed;
              z-index: 999999;
              bottom: 10px;
              cursor: pointer;
              overflow: hidden;
              transition: ${(this.transitionTime / 1000) + 's'};
              user-select: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
           `;
      this.btns.forEach((btnItem) => {
        const button = document.createElement('div');
        button.innerText = btnItem.text;
        button.style.cssText = `
                  height: 33%;
                `;

        button.onmouseenter = function () {
          button.style.color = 'red';
          button.style.fontSize = 'larger'
          button.style.fontWeight = 'bolder'
        };

        button.onmouseleave = function () {
          button.style.color = 'black';
          button.style.fontSize = ''
          button.style.fontWeight = ''
        };

        button.onclick = (event) => {
          event.stopPropagation();
          if (btnItem.hasOwnProperty("cb")) {
            btnItem.cb.call(this);
          }
        };
        this.getInstance().appendChild(button);
      });

      this.getInstance().onmouseover = () => {
        if (!this.justClicked) {
          this.show();
        }
      }
      this.show();
    }

    getInstance() {
      return this.instance;
    }
    show() {
      this.getInstance().style.right = '10px';
    }
    hide() {
      this.justClicked = true;
      this.getInstance().style.right = '-40px';
      let timer = setTimeout(() => {
        this.justClicked = false;
        clearTimeout(timer);
      }, this.transitionTime);
    }
    mount(el?: HTMLElement) {
      (el || document.body).appendChild(this.getInstance());
    }
  }

  function save() {
    this.hide();
    if (!isSetting) {
      alert('没有正在进行的设置操作');
      return;
    }
    const clickHistory = JSON.stringify(recorder.clickHistory);
    localStorage.setItem('_clickHistory', clickHistory)
    window.removeEventListener('click', recorder.cb)
    floatingBall.hide()
    isSetting = false;
  }
  function goto() {
    this.hide();
    const clickHistory = localStorage.getItem('_clickHistory')
    if (!clickHistory) {
      alert('没有初始化设置！')
      return
    }
    const menu = document.querySelector('#admin-side')
    if (menu && menu.checkVisibility()) {
    } else {
      // 弹出菜单后再点击
      const btn = document.querySelector('#admin-login-box2')
      if (btn && btn instanceof HTMLElement) {
        btn.click()
      }
    }
    const historyArr: string[] = JSON.parse(clickHistory)
    historyArr.forEach(selector => {
      const ele = document.querySelector(selector)
      if (ele && ele instanceof HTMLElement) {
        ele.click()
      }
    })
  }
  const buttons: Button[] = [
    {
      text: '设置',
      cb: setting
    },
    {
      text: '跳转',
      cb: goto
    },
    {
      text: '保存',
      cb: save
    }
  ];
}
</script>

<template>
  <div class="card">
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
