// ==UserScript==
// @name        OneMonkey
// @namespace   npm/vite-plugin-monkey
// @version     0.0.0
// @author      monkey
// @license     MIT
// @icon        https://avatars.githubusercontent.com/u/35656100
// @icon64      https://avatars.githubusercontent.com/u/35656100
// @homepage    https://github.com/juckz/one-tampermonkey
// @supportURL  https://github.com/JuckZ/one-tampermonkey/issues/new
// @match       *://*/*
// @require     https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_notification
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_unregisterMenuCommand
// @grant       GM_xmlhttpRequest
// @run-at      document-body
// @noframes
// ==/UserScript==

(e=>{const t=document.createElement("style");t.dataset.source="vite-plugin-monkey",t.textContent=e,document.head.append(t)})(" .fab-wrapper[data-v-c620873a]{z-index:99999!important;position:fixed;right:50px;bottom:50px;z-index:5;display:flex;flex-direction:center;align-items:center}.fab-wrapper:hover .fab-item-list[data-v-c620873a]{bottom:70px;opacity:1;transition:.5s ease-in}.fab-button[data-v-c620873a]{width:70px;height:70px;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:50%;box-shadow:0 4px 10px #0000004d;transition:all .1s ease-in-out}.fab-button[data-v-c620873a]:hover{transform:scale(1.25);box-shadow:0 4px 15px #0000004d}.fab-button p[data-v-c620873a]{font-size:30px;color:#fff;text-align:center;line-height:70px}.fab-item-list[data-v-c620873a]{opacity:0;width:100%;position:absolute;padding:0;list-style:none;bottom:0;margin-bottom:12px;display:flex;flex-direction:column-reverse;justify-content:center;align-items:center;transition:all .1s ease-in-out}.fab-item[data-v-c620873a]{background:#0D9DDB;width:50px;height:50px;border-radius:50%;text-align:center;color:#fff;margin-bottom:12px;display:flex;flex-direction:column;justify-content:center;align-self:center;box-shadow:0 2px 5px #0000004d;transition:all .1s ease-in-out}.fab-item[data-v-c620873a]:hover{box-shadow:0 4px 15px #0000004d;transform:scale(1.05)}#fab-component[data-v-69fb2012]{cursor:pointer}.btn-icon[data-v-69fb2012]{width:70px;height:70px;border-radius:50%} ");

(function (vue) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  function createMatchFunction(patterns) {
    const regexes = patterns.map((pattern) => {
      let regexString = pattern.replace(/([.+^${}()|[\]\\])/g, "\\$1").replace(/\*/g, "[^/]*").replace(/\\\*\\\./g, "(?:[^.]+\\.)*");
      return new RegExp("^" + regexString + "$");
    });
    return (url) => regexes.some((regex) => regex.test(url));
  }
  function getSelector(el) {
    if (el === null)
      return;
    var names = [];
    while (el && "parentNode" in el) {
      if (el instanceof Element) {
        if (el.id) {
          names.unshift("#" + el.id);
          break;
        } else {
          if (el === el.ownerDocument.documentElement)
            names.unshift(el.tagName);
          else {
            for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++)
              ;
            names.unshift(el.tagName + ":nth-child(" + c + ")");
          }
          el = el.parentNode;
        }
      }
    }
    return names.join(" > ");
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1 = {};
  const _hoisted_1$1 = { class: "fab-wrapper" };
  const _hoisted_2$1 = { class: "fab-button" };
  const _hoisted_3 = { class: "fab-item-list" };
  const _hoisted_4 = { class: "fab-item" };
  const _hoisted_5 = { class: "fab-item" };
  const _hoisted_6 = { class: "fab-item" };
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
      vue.createElementVNode("p", _hoisted_2$1, [
        vue.renderSlot(_ctx.$slots, "icon", {}, void 0, true)
      ]),
      vue.createElementVNode("ul", _hoisted_3, [
        vue.createElementVNode("li", _hoisted_4, [
          vue.renderSlot(_ctx.$slots, "option1", {}, void 0, true)
        ]),
        vue.createElementVNode("li", _hoisted_5, [
          vue.renderSlot(_ctx.$slots, "option2", {}, void 0, true)
        ]),
        vue.createElementVNode("li", _hoisted_6, [
          vue.renderSlot(_ctx.$slots, "option3", {}, void 0, true)
        ])
      ])
    ]);
  }
  const FabComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-c620873a"]]);
  const _withScopeId = (n) => (vue.pushScopeId("data-v-69fb2012"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = { id: "fab-component" };
  const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", { class: "fab" }, [
    /* @__PURE__ */ vue.createElementVNode("img", {
      class: "btn-icon",
      src: "https://avatars.githubusercontent.com/u/35656100"
    })
  ], -1));
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "FloatingBall",
    setup(__props) {
      vue.ref(0);
      let isSetting = vue.ref(false);
      let historyArr = [];
      let clickHistory = [];
      function handleClick(event) {
        event.target.style.color = "red!important";
        const selector = getSelector(event.target);
        if (selector) {
          clickHistory.push(selector);
        }
      }
      function setting() {
        window.addEventListener("click", handleClick);
        isSetting.value = true;
      }
      function goto() {
        if (historyArr.length === 0) {
          alert("没有历史记录，请先进行【设置】操作");
          return;
        }
        const menu = document.querySelector("#admin-side");
        if (!menu || !menu.checkVisibility()) {
          const btn = document.querySelector("#admin-login-box2");
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
          alert("没有正在进行的设置操作");
          return;
        }
        const clickHistoryStr = JSON.stringify(clickHistory);
        historyArr = clickHistory;
        localStorage.setItem("_clickHistory", clickHistoryStr);
        window.removeEventListener("click", handleClick);
        isSetting.value = false;
      }
      function closeNotify() {
        let checker = setInterval(() => {
          const notificationEle = document.querySelector(
            "#agreementshow > div > div.el-dialog__body > div > div.buttonbottom > button"
          );
          if (notificationEle && notificationEle.checkVisibility()) {
            if (notificationEle instanceof HTMLElement) {
              notificationEle.click();
            }
            clearInterval(checker);
          }
        }, 200);
      }
      vue.onMounted(() => {
        closeNotify();
        const clickHistory2 = localStorage.getItem("_clickHistory") || "[]";
        historyArr = JSON.parse(clickHistory2);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          vue.createVNode(FabComponent, null, {
            icon: vue.withCtx(() => [
              _hoisted_2
            ]),
            option1: vue.withCtx(() => [
              vue.createElementVNode("span", {
                class: "fab",
                onClick: setting
              }, "设置" + vue.toDisplayString(vue.unref(isSetting) ? "中" : ""), 1)
            ]),
            option2: vue.withCtx(() => [
              vue.createElementVNode("span", {
                class: "fab",
                onClick: goto
              }, "跳转")
            ]),
            option3: vue.withCtx(() => [
              vue.createElementVNode("span", {
                class: "fab",
                onClick: save
              }, "保存")
            ]),
            _: 1
          })
        ]);
      };
    }
  });
  const FloatingBall = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-69fb2012"]]);
  var _GM_addStyle = /* @__PURE__ */ (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_notification = /* @__PURE__ */ (() => typeof GM_notification != "undefined" ? GM_notification : void 0)();
  var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  const domain = window.top.location.host;
  const origin = window.top.location.origin;
  const topHref = window.top.location.href;
  function ProxyGM_getValue(id, defaultValue) {
    return _GM_getValue(domain + ":" + id, defaultValue);
  }
  function ProxyGM_setValue(id, value) {
    return _GM_setValue(domain + ":" + id, value);
  }
  const CookieUtil = {
    get: function(name) {
      const cookieName = encodeURIComponent(name) + "=";
      let cookieValue = null;
      const cookieStart = document.cookie.indexOf(cookieName);
      if (cookieStart > -1) {
        let cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
      }
      return cookieValue;
    },
    set: function(name, value, expires, path, domain2, secure) {
      let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      if (expires instanceof Date) {
        cookieText += "; expires=" + expires.toString();
      }
      if (path) {
        cookieText += "; path=" + path;
      }
      if (domain2) {
        cookieText += "; domain=" + domain2;
      }
      if (secure) {
        cookieText += "; secure";
      }
      document.cookie = cookieText;
    },
    unset: function(name, path, domain2, secure) {
      this.set(name, "", /* @__PURE__ */ new Date(0), path, domain2, secure);
    }
  };
  class MenuItem {
    constructor(options) {
      // 注册后的菜单id
      __publicField(this, "menuId", "");
      __publicField(this, "accessKey");
      __publicField(this, "postRegister", function() {
      });
      __publicField(this, "postUnRegister", function() {
      });
      __publicField(this, "id");
      __publicField(this, "name");
      __publicField(this, "fun");
      __publicField(this, "lifeStage");
      __publicField(this, "reload");
      __publicField(this, "enable");
      const { id, name, fun, reload, defaultEnable, lifeStage, postRegister, postUnRegister, accessKey } = options;
      this.id = id;
      this.name = name;
      this.fun = fun;
      this.lifeStage = lifeStage;
      this.accessKey = accessKey;
      if (postRegister) {
        this.postRegister = postRegister.bind(this);
      }
      if (postUnRegister) {
        this.postUnRegister = postUnRegister.bind(this);
      }
      this.reload = reload;
      this.enable = ProxyGM_getValue(id, defaultEnable);
    }
    toggle(event) {
      this.enable = !this.enable;
      ProxyGM_setValue(this.id, this.enable);
      if (this.reload) {
        _GM_notification({
          text: "页面需要重启！点击消息即可重启",
          title: "操作成功",
          onclick: () => window.location.reload()
        });
      } else {
        this.unregister();
        this.register();
      }
    }
    register() {
      const menuId = _GM_registerMenuCommand(`${this.name}: ${this.enable ? "✅" : "🚫"}`, this.toggle.bind(this), this.accessKey);
      this.menuId = menuId;
      if (this.enable) {
        if (this.lifeStage) {
          document.addEventListener(this.lifeStage, (e) => {
            this.fun;
          });
        } else {
          this.fun();
        }
      }
      this.postRegister();
    }
    unregister() {
      _GM_unregisterMenuCommand(this.menuId);
      this.postUnRegister();
    }
  }
  function stopEventPropagation(event) {
    event.stopPropagation();
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    }
  }
  function unrestrictUserInteractions() {
    document.querySelectorAll("*").forEach((element) => {
      if (window.getComputedStyle(element, null).getPropertyValue("user-select") === "none") {
        if (element instanceof HTMLElement) {
          element.style.setProperty("user-select", "text", "important");
        }
      }
    });
    const eventsToStop = ["copy", "cut", "contextmenu", "selectstart", "mousedown", "mouseup", "mousemove", "keydown", "keypress", "keyup"];
    eventsToStop.forEach((eventName) => {
      document.documentElement.addEventListener(eventName, stopEventPropagation, { capture: true });
    });
  }
  function floatingBall() {
    vue.createApp(FloatingBall).mount(
      (() => {
        const app = document.createElement("div");
        document.body.append(app);
        return app;
      })()
    );
  }
  async function unlockWeb() {
    const css = `
        * {
            user-select: auto!important;
          }
        `;
    _GM_addStyle(css);
    unrestrictUserInteractions();
    if (window.location.href.indexOf("doc.iocoder.cn") >= 0) {
      const cookieKey = "88974ed8-6aff-48ab-a7d1-4af5ffea88bb";
      console.log(CookieUtil.get("username"), CookieUtil.get(cookieKey));
      if (CookieUtil.get(cookieKey))
        return;
      const mainHTML = document.documentElement.innerHTML;
      let regex = /\/assets\/js\/app\.(.*?)\.js/;
      if (mainHTML.match(regex) !== null) {
        const appJsUrl = `${origin}${mainHTML.match(regex)[0]}`;
        regex = /^var\s+c\s*=\s*"88974ed8-6aff-48ab-a7d1-4af5ffea88bb".*?\s*u\s*=\s*"([^"]+)"/;
        console.log(appJsUrl, cookieKey);
        fetch(appJsUrl).then((res) => res.text()).then((text) => {
          console.log(text.match(regex));
          CookieUtil.set(cookieKey, "kele");
        });
      }
    }
  }
  function disableBaiduAnalytics() {
    window._hmt = null;
  }
  function disableGoogleAnalytics() {
    window.GoogleAnalyticsObject = null;
    window.ga = null;
  }
  function disableSensorsAnalytics() {
    window.sensorsDataAnalytic201505 = null;
    window.sa = null;
  }
  function disableDataCollection() {
    disableBaiduAnalytics();
    disableGoogleAnalytics();
    disableSensorsAnalytics();
  }
  function unwrapHTMLComments() {
    const matchURL = createMatchFunction([
      "http://171.223.209.166:81/biz/index*",
      "http://10.158.5.177:81/biz/index*",
      "http://171.223.209.166:9099/cdxtReport/ReportServer*",
      "http://10.158.5.44:18080/cdxtReport/ReportServer*"
    ]);
    if (!matchURL(topHref))
      return;
    if (window.top !== window.self)
      return;
    window._win = window;
    const _win = window._win;
    function showTable() {
      setTimeout(function() {
        if (/ReportServer/i.test(window.location.pathname)) {
          const iframeA = document.getElementById("div_员工任务负载情况");
          if (!iframeA || !(iframeA instanceof HTMLIFrameElement)) {
            return;
          }
          const docA = iframeA.contentDocument || iframeA.contentWindow.document;
          _win.btn = docA.getElementById("fr-btn-BUTTON0_C");
          _win.btn.onclick = showTable;
          const iframeB = docA.getElementById("LEFT");
          if (!iframeB || !(iframeB instanceof HTMLIFrameElement)) {
            return;
          }
          const docB = iframeB.contentDocument || iframeB.contentWindow.document;
          _win.docB = docB;
          docB.querySelectorAll('td[col="8"],td[cv*="预计"]').forEach(function(ele) {
            if (ele instanceof HTMLElement) {
              ele.style.display = "";
              ele.style.fontWeight = "bold";
              ele.style.fontStyle = "italic";
            }
          });
          return;
        }
      }, 2e3);
    }
    setTimeout(showTable, 3e3);
    if (!/biz\/index\.php$/i.test(window.location.pathname)) {
      return;
    }
    function showCommentedElements(element) {
      for (let i = 0; i < element.childNodes.length; i++) {
        const node = element.childNodes[i];
        if (node.nodeType === Node.COMMENT_NODE) {
          const regex = /<(td|tr|th)[^>]*>[\s\S]*<\/(td|tr|th)>/g;
          const match = regex.exec(node.nodeValue);
          if (match !== null) {
            const div = document.createElement(match[1]);
            div.innerHTML = match[0];
            div.style.color = "blue";
            div.firstChild;
            element.replaceChild(div, node);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          showCommentedElements(node);
        }
      }
    }
    showCommentedElements(document.body);
  }
  function togglePassword() {
    const passwordFields = document.querySelectorAll("input[type='password']");
    passwordFields.forEach(function(field) {
      let clickCount = 0;
      if (field instanceof HTMLInputElement) {
        field.addEventListener("click", function() {
          clickCount++;
          if (clickCount >= 3) {
            field.type = "text";
            clickCount = 0;
          }
          setTimeout(function() {
            clickCount = 0;
          }, 500);
        });
        field.addEventListener("mouseleave", function() {
          field.type = "password";
        });
      }
    });
  }
  function spacingjs() {
    _GM_xmlhttpRequest({
      method: "GET",
      url: "https://unpkg.com/spacingjs",
      onload: function(response) {
        eval(response.responseText);
      },
      onerror: function(error) {
        console.error("Request failed:", error);
      }
    });
  }
  function freeEdit() {
  }
  function searchEverywhere() {
    var _a;
    const str = ((_a = document.getSelection()) == null ? void 0 : _a.toString) || "";
    _GM_openInTab(`https://www.npmjs.com/search?q=${str}`, { active: true });
  }
  function toggleNightMode() {
    var _a;
    const documentObj = window.document;
    const css = "html { opacity: 0.7 !important; background: black !important; } body { background: white !important; }";
    const styleTags = documentObj.getElementsByTagName("style");
    for (let i = 0, currentStyleTag; currentStyleTag = styleTags[i]; i++) {
      if (currentStyleTag.innerHTML == css) {
        (_a = currentStyleTag.parentNode) == null ? void 0 : _a.removeChild(currentStyleTag);
        return;
      }
    }
    const headTags = documentObj.getElementsByTagName("head");
    if (headTags.length) {
      const newNode = documentObj.createElement("style");
      newNode.type = "text/css";
      newNode.appendChild(documentObj.createTextNode(css));
      headTags[0].appendChild(newNode);
    }
    for (let i = 0, frame; frame = window.frames[i]; i++) {
      try {
        arguments.callee(frame);
      } catch (e) {
        console.error(e);
      }
    }
  }
  const menus = [];
  menus.push(new MenuItem({ id: "unlockWeb", name: "破解网页限制", fun: unlockWeb, reload: true, defaultEnable: false }));
  menus.push(new MenuItem({ id: "floatingBall", name: "悬浮球", fun: floatingBall, reload: false, defaultEnable: false }));
  menus.push(new MenuItem({ id: "disableDataCollection", name: "禁止用户数据采集", fun: disableDataCollection, reload: false, defaultEnable: true }));
  menus.push(new MenuItem({ id: "unwrapHTMLComments", name: "展示隐藏内容", fun: unwrapHTMLComments, reload: true, defaultEnable: false }));
  menus.push(new MenuItem({ id: "togglePassword", name: "密码查看", fun: togglePassword, reload: false, defaultEnable: true, lifeStage: "load" }));
  menus.push(new MenuItem({ id: "spacingjs", name: "元素间距标注", fun: spacingjs, reload: false, defaultEnable: false }));
  menus.push(new MenuItem({
    id: "freeEdit",
    name: "网页自由编辑",
    fun: freeEdit,
    reload: false,
    defaultEnable: document.body.getAttribute("contenteditable") === "true",
    accessKey: "s",
    postRegister() {
      document.body.setAttribute("contenteditable", this.enable + "");
    },
    postUnRegister() {
      document.body.setAttribute("contenteditable", this.enable + "");
    }
  }));
  menus.push(new MenuItem({ id: "searchEverywhere", name: "快捷搜索", fun: searchEverywhere, reload: false, defaultEnable: false }));
  menus.push(new MenuItem({ id: "toggleNightMode", name: "夜间模式", fun: toggleNightMode, reload: false, defaultEnable: false }));
  menus.forEach((menu) => {
    menu.register();
  });

})(Vue);
