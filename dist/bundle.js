var n="youyou_toolkit",g="0.1.0",d=`${n}-menu-item`,y=`${n}-menu-container`,$=`${n}-popup`,p=typeof window.parent<"u"?window.parent:window;function o(...e){console.log(`[${n}]`,...e)}function m(...e){console.error(`[${n}]`,...e)}function I(){let e=`${n}-styles`,t=p.document||document;if(t.getElementById(e))return;let i=`
    /* YouYou Toolkit \u6837\u5F0F */
    
    /* \u83DC\u5355\u9879\u6837\u5F0F */
    #${y} {
      display: flex;
      align-items: center;
    }
    
    #${d} {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 12px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    #${d}:hover {
      background-color: var(--hover-bg, rgba(255, 255, 255, 0.1));
    }
    
    #${d} .fa-icon {
      font-size: 16px;
      color: var(--accent-color, #7bb7ff);
    }
    
    /* \u5F39\u7A97\u6837\u5F0F */
    .yyt-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9999;
      animation: yytFadeIn 0.2s ease-out;
    }
    
    @keyframes yytFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .yyt-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%), #0b0f15;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.65);
      min-width: 400px;
      min-height: 300px;
      max-width: 90vw;
      max-height: 90vh;
      z-index: 10000;
      animation: yytSlideIn 0.25s ease-out;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: rgba(255, 255, 255, 0.92);
      display: flex;
      flex-direction: column;
    }
    
    @keyframes yytSlideIn {
      from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    .yyt-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px 16px 0 0;
    }
    
    .yyt-popup-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-popup-title i {
      color: rgba(123, 183, 255, 0.85);
    }
    
    .yyt-popup-close {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    
    .yyt-popup-close:hover {
      background: rgba(255, 107, 107, 0.25);
      color: #ff6b6b;
    }
    
    .yyt-popup-body {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }
    
    .yyt-popup-footer {
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.02);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0 0 16px 16px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    
    .yyt-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s ease;
    }
    
    .yyt-btn-primary {
      background: rgba(123, 183, 255, 0.85);
      color: #0b0f15;
    }
    
    .yyt-btn-primary:hover {
      background: rgba(123, 183, 255, 1);
    }
    
    .yyt-btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.7);
    }
    
    .yyt-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
    }
    
    /* \u6B22\u8FCE\u5185\u5BB9\u6837\u5F0F */
    .yyt-welcome {
      text-align: center;
      padding: 40px 20px;
    }
    
    .yyt-welcome h2 {
      margin: 0 0 20px 0;
      color: rgba(123, 183, 255, 0.85);
    }
    
    .yyt-welcome p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
      margin: 0 0 15px 0;
    }
    
    .yyt-version {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 30px;
    }
  `,s=t.createElement("style");s.id=e,s.textContent=i,(t.head||t.documentElement).appendChild(s),o("\u6837\u5F0F\u5DF2\u6CE8\u5165")}var r=null,a=null;function u(){r&&(r.remove(),r=null),a&&(a.remove(),a=null),o("\u5F39\u7A97\u5DF2\u5173\u95ED")}function x(){if(r){o("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let e=p.jQuery||window.jQuery,t=p.document||document;if(!e){m("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}a=t.createElement("div"),a.className="yyt-popup-overlay",a.addEventListener("click",c=>{c.target===a&&u()}),t.body.appendChild(a);let i=`
    <div class="yyt-popup" id="${$}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
        </div>
        <button class="yyt-popup-close" title="\u5173\u95ED">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      <div class="yyt-popup-body">
        <div class="yyt-welcome">
          <h2>\u{1F6E0}\uFE0F \u6B22\u8FCE\u4F7F\u7528 YouYou \u5DE5\u5177\u7BB1</h2>
          <p>\u8FD9\u662F\u4E00\u4E2A SillyTavern \u5DE5\u5177\u63D2\u4EF6\u6846\u67B6\u3002</p>
          <p>\u4F60\u53EF\u4EE5\u5728\u6B64\u57FA\u7840\u4E4B\u4E0A\u5F00\u53D1\u5404\u79CD\u5B9E\u7528\u5DE5\u5177\u3002</p>
          <p>\u5F53\u524D\u7248\u672C\uFF1A<strong>v${g}</strong></p>
          <div class="yyt-version">
            \u63D2\u4EF6ID: ${n}
          </div>
        </div>
      </div>
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${n}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,s=t.createElement("div");s.innerHTML=i,r=s.firstElementChild,t.body.appendChild(r),e(r).find(".yyt-popup-close").on("click",u),e(r).find(`#${n}-close-btn`).on("click",u),o("\u5F39\u7A97\u5DF2\u6253\u5F00")}function l(){let e=p.jQuery||window.jQuery;if(!e){m("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(l,1e3);return}let t=p.document||document,i=e("#extensionsMenu",t);if(!i.length){o("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(l,2e3);return}if(e(`#${y}`,i).length>0){o("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let c=e(`<div class="extension_container interactable" id="${y}" tabindex="0"></div>`),w=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${d}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,f=e(w);f.on("click",async function(k){k.stopPropagation(),o("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let b=e("#extensionsMenuButton",t);b.length&&i.is(":visible")&&b.trigger("click"),x()}),c.append(f),i.append(c),o("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function v(){o(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${g}`),I();let e=p.document||document;e.readyState==="loading"?e.addEventListener("DOMContentLoaded",()=>{setTimeout(l,1e3)}):setTimeout(l,1e3),o("\u521D\u59CB\u5316\u5B8C\u6210")}var h={version:g,id:n,init:v,openPopup:x,closePopup:u,addMenuItem:l};typeof window<"u"&&(window.YouYouToolkit=h);var E=h;v();o("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{E as default};
