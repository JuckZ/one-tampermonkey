/**
 * 站点匹配方法
 * @param patterns 
 * @returns 
 */
export function createMatchFunction(patterns: string[]) {
  // 将模式转换为正则表达式
  const regexes = patterns.map(pattern => {
    // 替换模式中的特殊字符
    let regexString = pattern
      .replace(/([.+^${}()|[\]\\])/g, '\\$1') // 转义除*外的所有正则表达式特殊字符
      .replace(/\*/g, '[^/]*') // 将*替换为匹配除/之外的任何字符的正则表达式
      .replace(/\\\*\\\./g, '(?:[^.]+\\.)*'); // 将*替换为匹配任何子域的正则表达式
    return new RegExp('^' + regexString + '$');
  });

  // 返回一个函数，它检查一个URL是否匹配任何一个模式
  return (url: string) => regexes.some(regex => regex.test(url));
}

/**
 * 获取元素选择器
 * @param el 
 * @returns 
 */
export function getSelector(el: EventTarget | null) {
  if (el === null) return
  var names = [];
  while (el && 'parentNode' in el) {
    if (el instanceof Element) {
      if (el.id) {
        names.unshift('#' + el.id);
        break;
      } else {
        if (el === el.ownerDocument.documentElement) names.unshift(el.tagName);
        else {
          for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
          names.unshift(el.tagName + ":nth-child(" + c + ")");
        }
        el = el.parentNode;
      }
    }
  }
  return names.join(" > ");
}

function searchExtension() {
  // 如果存在 Trusted Types API，则为其创建一个策略。
  if ((window as any).trustedTypes && (window as any).trustedTypes.createPolicy) {
    (window as any).trustedTypes.createPolicy("default", {
      createHTML: (content: any) => content
    });
  }

  // 定义匹配不同浏览器扩展的正则表达式。
  const chromeRegEx = /^https?:\/\/chrome.google.com\/webstore\/.+?\/([a-z]{32})(?=[\/#?]|$)/;
  const edgeRegEx = /^https?:\/\/microsoftedge.microsoft.com\/addons\/.+?\/([a-z]{32})(?=[\/#?]|$)/;
  const operaRegEx = /^https?:\/\/addons.opera.com\/.*?extensions\/(?:details|download)\/([^\/?#]+)/i;
  const firefoxRegEx = /^https?:\/\/addons.mozilla.org\/.*?addon\/([^\/<>"'?#]+)/;
  const microsoftRegEx = /^https?:\/\/(?:apps|www).microsoft.com\/(?:store|p)\/.+?\/([a-zA-Z\d]{10,})(?=[\/#?]|$)/;

  // 定义重定向的基础URL。
  const baseRedirectURL = "https://www.crxsoso.com/?auto=1&link=";
  // 修改页面中的内容，将特定的链接替换为新的链接。
  document.body.innerHTML = document.body.innerHTML
    .replace(/chrome\.google\.com\/webstore/g, "chrome.crxsoso.com/webstore")
    .replace(/microsoftedge\.microsoft\.com\/addons/g, "microsoftedge.crxsoso.com/addons")
    .replace(/addons\.mozilla\.org/g, "addons.crxsoso.com")
    .replace(/(apps|www)\.microsoft\.com\/store/g, "apps.crxsoso.com/store");

  // 获取当前页面的URL。
  const currentURL = window.location.href;
  // 根据当前页面的URL进行相应的重定向。
  if (chromeRegEx.test(currentURL)) {
    window.open(currentURL.replace("google.com", "crxsoso.com"), '_blank');
  } else if (edgeRegEx.test(currentURL)) {
    window.open(currentURL.replace("microsoft.com", "crxsoso.com"), '_blank');
  } else if (firefoxRegEx.test(currentURL)) {
    window.open(currentURL.replace("mozilla.org", "crxsoso.com"), '_blank');
  } else if (microsoftRegEx.test(currentURL)) {
    window.open(currentURL.replace("microsoft.com", "crxsoso.com"), '_blank');
  } else if (operaRegEx.test(currentURL)) {
    window.open(currentURL.replace(baseRedirectURL + encodeURIComponent(currentURL), "crxsoso.com"), '_blank');
  } else {
    const userInput = window.prompt("您可以通过以下3种方式下载扩展/应用： (v2.2)\n\n1. 可以在 Chrome/Edge/Firefox/Microsoft 商店详情页点本按钮会自动跳转\n2. 可以输入扩展/应用名称，例如：油猴，微信\n3. 可以输入扩展链接，例如：https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo");
    if (userInput) {
      if (chromeRegEx.test(userInput) || edgeRegEx.test(userInput) || operaRegEx.test(userInput) || firefoxRegEx.test(userInput)) {
        window.open(baseRedirectURL + encodeURIComponent(userInput), '_blank');

      } else {
        window.open("https://www.crxsoso.com/search?keyword=" + encodeURIComponent(userInput), '_blank');
      }
    }
  }
}