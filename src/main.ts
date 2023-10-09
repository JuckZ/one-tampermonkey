import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';
import { createMatchFunction } from './util';

type Button = {
  text: string;
  cb: () => void;
}

const domain = window.top!.location.host;
const origin = window.top!.location.origin;
const topHref = window.top!.location.href
function ProxyGM_getValue(id: string, defaultValue: unknown) {
  return GM_getValue(domain + ':' + id, defaultValue);
}
function ProxyGM_setValue(id: string, value: unknown) {
  return GM_setValue(domain + ':' + id, value);
}
const CookieUtil = {
  get: function (name: string | number | boolean) {
    let cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;
    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
  },
  set: function (name: string | number | boolean, value: string | number | boolean, expires?: Date, path?: string, domain?: string, secure?: string) {
    let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toString();
    }
    if (path) {
      cookieText += '; path=' + path;
    }
    if (domain) {
      cookieText += '; domain=' + domain;
    }
    if (secure) {
      cookieText += '; secure';
    }
    document.cookie = cookieText;
  },

  unset: function (name: string | number | boolean, path: string, domain: string, secure: string) {
    this.set(name, '', new Date(0), path, domain, secure);
  }
};
// TODO 针对不同网站，每个特性都有对应的开关
class MenuItem {
  // 注册后的菜单id
  menuId = '';
  accessKey?: string;
  postRegister = function () { };
  postUnRegister = function () { };
  id: string;
  name: string;
  fun?: Function;
  lifeStage?: 'load' | string;
  reload: any;
  enable: boolean;
  constructor(options: {
    id: string;
    name: string;
    fun?: Function;
    reload?: boolean;
    defaultEnable?: boolean;
    lifeStage?: 'load' | string;
    postRegister?: Function;
    postUnRegister?: any;
    accessKey?: string;
    enable?: boolean;
  }) {
    const { id, name, fun, reload, defaultEnable, lifeStage, postRegister, postUnRegister, accessKey } = options;
    this.id = id;
    this.name = name;
    this.fun = fun;
    this.lifeStage = lifeStage;
    this.accessKey = accessKey;
    if (postRegister) {
      this.postRegister = postRegister.bind(this)
    }
    if (postUnRegister) {
      this.postUnRegister = postUnRegister.bind(this)
    }
    this.reload = reload;
    this.enable = ProxyGM_getValue(id, defaultEnable) as boolean;
  }

  toggle(event: any) {
    this.enable = !this.enable;
    ProxyGM_setValue(this.id, this.enable);
    if (this.reload) {
      GM_notification({
        text: "页面需要重启！点击消息即可重启",
        title: "操作成功",
        onclick: () => window.location.reload()
      });
    } else {
      // 刷新菜单展示效果
      this.unregister()
      this.register()
    }
  }

  register() {
    // ✅❎❌🚫
    const menuId = GM_registerMenuCommand(`${this.name}: ${this.enable ? '✅' : '🚫'}`, this.toggle.bind(this), this.accessKey);
    this.menuId = menuId;
    if (this.enable) {
      // TODO 增加生命周期钩子，不同功能可能需要在界面的不同阶段执行，有的需要在页面加载前，有的需要再页面加载后
      if (this.lifeStage) {
        document.addEventListener(this.lifeStage, (e) => { this.fun! });
      } else {
        this.fun!();
      }
    }
    this.postRegister()
  }


  unregister() {
    GM_unregisterMenuCommand(this.menuId);
    this.postUnRegister()
  }
}

/**
* Stops the event propagation and immediate propagation if possible.
* @param {Event} event - The event object.
*/
function stopEventPropagation(event: Event) {
  event.stopPropagation();
  // If the event supports stopping immediate propagation, do it.
  if (event.stopImmediatePropagation) {
    event.stopImmediatePropagation();
  }
}

/**
* Unrestricts user select and adds event listeners to prevent
* certain default behaviors that may restrict text selection or context menu access.
*/
function unrestrictUserInteractions() {
  document.querySelectorAll("*").forEach(element => {
    if (window.getComputedStyle(element, null).getPropertyValue("user-select") === "none") {
      if (element instanceof HTMLElement) {
        element.style.setProperty("user-select", "text", "important");
      }
    }
  });

  // List of events that we want to stop.
  const eventsToStop = ["copy", "cut", "contextmenu", "selectstart", "mousedown", "mouseup", "mousemove", "keydown", "keypress", "keyup"];

  // Add event listeners to each event in the list to stop its propagation.
  eventsToStop.forEach(eventName => {
    document.documentElement.addEventListener(eventName, stopEventPropagation, { capture: true });
  });
}

function floatingBall() {
  createApp(App).mount(
    (() => {
      const app = document.createElement('div');
      document.body.append(app);
      return app;
    })(),
  );
}

// 破解网站限制
async function unlockWeb() {
  let css = `
        * {
            user-select: auto!important;
          }
        `;
  GM_addStyle(css);
  //$("pre,code").css("user-select","auto!important");
  unrestrictUserInteractions();
  if (window.location.href.indexOf("doc.iocoder.cn") >= 0) {
    let cookieKey = "88974ed8-6aff-48ab-a7d1-4af5ffea88bb";
    console.log(CookieUtil.get("username"), CookieUtil.get(cookieKey))
    if (CookieUtil.get(cookieKey)) return;
    const mainHTML = document.documentElement.innerHTML;
    // 获取app.js，该文件名称中间有hash，随时可能有变化，因此需要从mainHTML中获取 href="/assets/js/app.22766e4b.js"，下面.*?中的问号很重要，用于表示非贪婪的匹配
    let regex = /\/assets\/js\/app\.(.*?)\.js/;
    // 由于同源策略，虽然脚本已经在html中load，但是不能直接访问其内容，需要fetch下来访问
    if (mainHTML.match(regex) !== null) {
      let appJsUrl = `${origin}${mainHTML.match(regex)![0]}`;
      // 下面.*?中的问号很重要，用于表示非贪婪的匹配
      // regex = /\(Cookies\.get\(l\) ?\|\| ?""\)\.indexOf\("(.*?)"\) ?>= ?0/;
      regex = /^var\s+c\s*=\s*"88974ed8-6aff-48ab-a7d1-4af5ffea88bb".*?\s*u\s*=\s*"([^"]+)"/;
      console.log(appJsUrl, cookieKey)
      fetch(appJsUrl).then(res => res.text()).then(text => {
        console.log(text.match(regex))
        // text.match(regex)[1]
        CookieUtil.set(cookieKey, 'kele');
      });
    }
  }
}

function disableBaiduAnalytics() {
  // 百度统计
  (window as any)._hmt = null;
}
function disableGoogleAnalytics() {
  (window as any).GoogleAnalyticsObject = null;
  (window as any).ga = null;
}
function disableSensorsAnalytics() {
  (window as any).sensorsDataAnalytic201505 = null;
  (window as any).sa = null;
}
/**
 * 禁止用户数据采集(未验证效果)
 */
function disableDataCollection() {
  disableBaiduAnalytics()
  disableGoogleAnalytics()
  disableSensorsAnalytics()
}

// 展示隐藏内容
function unwrapHTMLComments() {
  const matchURL = createMatchFunction([
    'http://171.223.209.166:81/biz/index*',
    'http://10.158.5.177:81/biz/index*',
    'http://171.223.209.166:9099/cdxtReport/ReportServer*',
    'http://10.158.5.44:18080/cdxtReport/ReportServer*'
  ]);
  if (!matchURL(topHref)) return
  // 只在顶层执行，不需要在子iframe中执行
  if (window.top !== window.self) return
  (window as any)._win = window
  const _win = (window as any)._win
  function showTable() {
    setTimeout(function () {
      if (/ReportServer/i.test(window.location.pathname)) {
        const iframeA = document.getElementById("div_员工任务负载情况")
        if (!iframeA || !(iframeA instanceof HTMLIFrameElement)) { return }
        const docA = iframeA.contentDocument || iframeA.contentWindow!.document;
        _win.btn = docA.getElementById("fr-btn-BUTTON0_C")
        _win.btn.onclick = showTable
        const iframeB = docA.getElementById("LEFT")
        if (!iframeB || !(iframeB instanceof HTMLIFrameElement)) { return }
        // 获取iframe b的内容文档
        const docB = iframeB.contentDocument || iframeB.contentWindow!.document;
        _win.docB = docB
        docB.querySelectorAll('td[col="8"],td[cv*="预计"]').forEach(function (ele) {
          if (ele instanceof HTMLElement) {
            ele.style.display = ""
            // ele.style.color = "blue"
            ele.style.fontWeight = "bold";
            ele.style.fontStyle = "italic";
          }
        })
        return
      }
    }, 2000)
  }
  setTimeout(showTable, 3000)

  // 判断当前页面是否为 index.html
  if (!/biz\/index\.php$/i.test(window.location.pathname)) {
    return;
  }

  function showCommentedElements(element: HTMLElement) {
    // 遍历所有子节点
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes[i];

      // 如果节点是注释节点
      if (node.nodeType === Node.COMMENT_NODE) {
        let regex = /<(td|tr|th)[^>]*>[\s\S]*<\/(td|tr|th)>/g;
        let match;
        if ((match = regex.exec(node.nodeValue)) !== null) {
          let div = document.createElement(match[1]);
          // 创建一个新的 div 元素，并将注释的内容设置为 div 的 innerHTML
          div.innerHTML = match[0];
          div.style.color = 'blue'
          // TODO 恢复元素上面的class style等属性和绑定的事件
          const realEl = div.firstChild
          element.replaceChild(div, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 如果节点是元素节点，递归处理该节点的子节点
        showCommentedElements(node);
      }
    }
  }

  // 使用方法：
  showCommentedElements(document.body);
}
// 展示/隐藏密码
function togglePassword() {
  const passwordFields = document.querySelectorAll("input[type='password']");
  passwordFields.forEach(function (field) {
    let clickCount = 0;
    if (field instanceof HTMLInputElement) {
      field.addEventListener('click', function () {
        clickCount++;
        if (clickCount >= 3) {
          field.type = 'text';
          clickCount = 0;
        }
        setTimeout(function () {
          clickCount = 0;
        }, 500);
      });
      field.addEventListener('mouseleave', function () {
        field.type = 'password';
      });
    }
  });
}
// 网页元素距离标注
function spacingjs() {
  // 使用GM_xmlhttpRequest可以解决跨域问题
  GM_xmlhttpRequest({
    method: "GET",
    url: "https://unpkg.com/spacingjs",
    onload: function (response) {
      eval(response.responseText);
    },
    onerror: function (error) {
      console.error("Request failed:", error);
    }
  });
}

// 网页自由编辑
function freeEdit() {
  // 逻辑在postRegister和postUnRegister中
}

// 快捷搜索, TODO 执行完后应该关闭此特性
function searchEverywhere() {
  const str = document.getSelection()?.toString || '';
  GM_openInTab(`https://www.npmjs.com/search?q=${str}`, { active: true });
  // GM_openInTab(`https://github.com/search?q=${str}`, { active: true });
}

/**
 * 夜间模式
 * @returns 
 */
function toggleNightMode() {
  const documentObj = window.document
  // 定义要应用的夜间模式CSS
  const css = 'html { opacity: 0.7 !important; background: black !important; } body { background: white !important; }';

  // 检查是否已经存在该样式
  const styleTags = documentObj.getElementsByTagName('style');
  for (let i = 0, currentStyleTag; currentStyleTag = styleTags[i]; i++) {
    if (currentStyleTag.innerHTML == css) {
      currentStyleTag.parentNode?.removeChild(currentStyleTag)
      return;
    }
  }

  // 如果样式不存在，为其创建一个新的样式标签并将其添加到<head>
  var headTags = documentObj.getElementsByTagName('head');
  if (headTags.length) {
    var newNode = documentObj.createElement('style');
    newNode.type = 'text/css';
    newNode.appendChild(documentObj.createTextNode(css));
    headTags[0].appendChild(newNode);
  }

  // 尝试为每个子框架应用夜间模式
  for (let i = 0, frame; frame = window.frames[i]; i++) {
    try {
      arguments.callee(frame);
    } catch (e) { }
  }
}

const menus = [];
menus.push(new MenuItem({ id: 'unlockWeb', name: '破解网页限制', fun: unlockWeb, reload: true, defaultEnable: false }));
menus.push(new MenuItem({ id: 'floatingBall', name: '悬浮球', fun: floatingBall, reload: false, defaultEnable: false }));
menus.push(new MenuItem({ id: 'disableDataCollection', name: '禁止用户数据采集', fun: disableDataCollection, reload: false, defaultEnable: true }));
menus.push(new MenuItem({ id: 'unwrapHTMLComments', name: '展示隐藏内容', fun: unwrapHTMLComments, reload: true, defaultEnable: false }));
menus.push(new MenuItem({ id: 'togglePassword', name: '密码查看', fun: togglePassword, reload: false, defaultEnable: true, lifeStage: 'load' }));
menus.push(new MenuItem({ id: 'spacingjs', name: '元素间距标注', fun: spacingjs, reload: false, defaultEnable: false, }));
menus.push(new MenuItem({
  id: 'freeEdit',
  name: '网页自由编辑',
  fun: freeEdit,
  reload: false,
  defaultEnable: document.body.getAttribute("contenteditable") === "true",
  accessKey: 's',
  postRegister() {
    document.body.setAttribute("contenteditable", this.enable + '')
  },
  postUnRegister() {
    document.body.setAttribute("contenteditable", this.enable + '')
  },
}));
menus.push(new MenuItem({ id: 'searchEverywhere', name: '快捷搜索', fun: searchEverywhere, reload: false, defaultEnable: false, }));
menus.push(new MenuItem({ id: 'toggleNightMode', name: '夜间模式', fun: toggleNightMode, reload: false, defaultEnable: false, }));
menus.forEach(menu => {
  menu.register()
});