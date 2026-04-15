var kl=Object.defineProperty;var O=(t,e)=>()=>(t&&(e=t(t=0)),e);var le=(t,e)=>{for(var s in e)kl(t,s,{get:e[s],enumerable:!0})};function Rn(){let t=_;return t._getStorage(),t._storage}function On(){return _.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Dn(t){_.set("settings",t)}var mt,_,Q,$n,ys,Re=O(()=>{mt=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespaceKey]||(s.extensionSettings[this.namespaceKey]={}),this._storage={_target:s.extensionSettings[this.namespaceKey],getItem:o=>{let r=s.extensionSettings[this.namespaceKey][o];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(o,r)=>{s.extensionSettings[this.namespaceKey][o]=r,this._saveSettings(s)},removeItem:o=>{delete s.extensionSettings[this.namespaceKey][o],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespaceKey}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(o){console.error(`[${this.namespaceKey}] localStorage\u5199\u5165\u5931\u8D25:`,o)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let o=`${this.namespaceKey}:${e}`;if(this._cache.has(o))return this._cache.get(o);let r=this._getStorage(),n=this._getFullKey(e),a=r.getItem(n);if(a===null)return s;try{let i=JSON.parse(a);return this._cache.set(o,i),i}catch{return a}}set(e,s){let o=this._getStorage(),r=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,s);try{o.setItem(r,JSON.stringify(s))}catch(a){console.error(`[${this.namespaceKey}] \u5B58\u50A8\u5931\u8D25:`,a)}}remove(e){let s=this._getStorage(),o=this._getFullKey(e),r=`${this.namespaceKey}:${e}`;this._cache.delete(r),s.removeItem(o)}has(e){let s=this._getStorage(),o=this._getFullKey(e);return s.getItem(o)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let o=s.SillyTavern.getContext();o?.extensionSettings?.[this.namespaceKey]&&(o.extensionSettings[this.namespaceKey]={},this._saveSettings(o))}}else{let s=`${this.namespaceKey}_`,o=[];for(let r=0;r<localStorage.length;r++){let n=localStorage.key(r);n&&n.startsWith(s)&&o.push(n)}o.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let s={};return e.forEach(o=>{s[o]=this.get(o)}),s}setMultiple(e){Object.entries(e).forEach(([s,o])=>{this.set(s,o)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let o=typeof window.parent<"u"?window.parent:window;if(o.SillyTavern?.getContext){let n=o.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([a,i])=>{s[a]=typeof i=="string"?JSON.parse(i):i})}}else{let o=`${this.namespaceKey}_`;for(let r=0;r<localStorage.length;r++){let n=localStorage.key(r);if(n&&n.startsWith(o)){let a=n.slice(o.length);try{s[a]=JSON.parse(localStorage.getItem(n))}catch{s[a]=localStorage.getItem(n)}}}}return s}},_=new mt("youyou_toolkit"),Q=new mt("youyou_toolkit:tools"),$n=new mt("youyou_toolkit:presets"),ys=new mt("youyou_toolkit:windows")});var pr={};le(pr,{DEFAULT_API_PRESETS:()=>Cl,DEFAULT_SETTINGS:()=>Il,STORAGE_KEYS:()=>gs,StorageService:()=>mt,deepMerge:()=>Ln,getCurrentPresetName:()=>Rl,getStorage:()=>Rn,loadApiPresets:()=>Pl,loadSettings:()=>On,presetStorage:()=>$n,saveApiPresets:()=>$l,saveSettings:()=>Dn,setCurrentPresetName:()=>Ol,storage:()=>_,toolStorage:()=>Q,windowStorage:()=>ys});function Pl(){return _.get(gs.API_PRESETS)||[]}function $l(t){_.set(gs.API_PRESETS,t)}function Rl(){return _.get(gs.CURRENT_PRESET)||""}function Ol(t){_.set(gs.CURRENT_PRESET,t||"")}function Ln(t,e){let s=r=>r&&typeof r=="object"&&!Array.isArray(r),o={...t};return s(t)&&s(e)&&Object.keys(e).forEach(r=>{s(e[r])?r in t?o[r]=Ln(t[r],e[r]):Object.assign(o,{[r]:e[r]}):Object.assign(o,{[r]:e[r]})}),o}var gs,Il,Cl,yr=O(()=>{Re();Re();gs={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},Il={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Cl=[]});var k,gr,P,me=O(()=>{k={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},gr=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,o={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=o;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:s,priority:r};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let o=this.listeners.get(e);if(o){for(let r of o)if(r.callback===s){o.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let o=this.listeners.get(e);if(!o||o.size===0)return;let r=Array.from(o).sort((n,a)=>a.priority-n.priority);for(let{callback:n}of r)try{n(s)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,s){let o=r=>{this.off(e,o),s(r)};return this.on(e,o)}wait(e,s=0){return new Promise((o,r)=>{let n=null,a=this.once(e,i=>{n&&clearTimeout(n),o(i)});s>0&&(n=setTimeout(()=>{a(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},P=new gr});function b(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function x(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let o=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(o.toastr){o.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Dl(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function be(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:o=3500,sticky:r=!1,noticeId:n=""}=s,a=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!a?.body){x(t,e,o);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
      position: fixed;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: min(560px, calc(100vw - 24px));
      z-index: 100000;
      pointer-events: none;
    `,a.body.appendChild(c)),!a.getElementById(l)){let w=a.createElement("style");w.id=l,w.textContent=`
      .yyt-top-notice {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: rgba(255, 255, 255, 0.95);
        background: rgba(11, 15, 21, 0.92);
        box-shadow: 0 10px 32px rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        pointer-events: auto;
        animation: yyt-top-notice-in 0.18s ease-out;
      }

      .yyt-top-notice__icon {
        width: 24px;
        height: 24px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 700;
      }

      .yyt-top-notice__content {
        flex: 1;
        min-width: 0;
        font-size: 13px;
        line-height: 1.5;
        word-break: break-word;
      }

      .yyt-top-notice__close {
        border: none;
        background: transparent;
        color: rgba(255, 255, 255, 0.72);
        cursor: pointer;
        width: 24px;
        height: 24px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s ease, color 0.15s ease;
      }

      .yyt-top-notice__close:hover {
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.95);
      }

      .yyt-top-notice--success {
        border-color: rgba(74, 222, 128, 0.35);
      }

      .yyt-top-notice--success .yyt-top-notice__icon {
        background: rgba(74, 222, 128, 0.18);
        color: #4ade80;
      }

      .yyt-top-notice--error {
        border-color: rgba(248, 113, 113, 0.38);
      }

      .yyt-top-notice--error .yyt-top-notice__icon {
        background: rgba(248, 113, 113, 0.18);
        color: #f87171;
      }

      .yyt-top-notice--warning {
        border-color: rgba(251, 191, 36, 0.38);
      }

      .yyt-top-notice--warning .yyt-top-notice__icon {
        background: rgba(251, 191, 36, 0.18);
        color: #fbbf24;
      }

      .yyt-top-notice--info {
        border-color: rgba(123, 183, 255, 0.38);
      }

      .yyt-top-notice--info .yyt-top-notice__icon {
        background: rgba(123, 183, 255, 0.18);
        color: #7bb7ff;
      }

      @keyframes yyt-top-notice-in {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes yyt-top-notice-out {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-8px);
        }
      }
    `,a.head.appendChild(w)}if(n){let w=c.querySelector(`[data-notice-id="${n}"]`);w&&w.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(u.dataset.noticeId=n);let m=a.createElement("span");m.className="yyt-top-notice__icon",m.textContent=d[t]||d.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let f=a.createElement("button");f.className="yyt-top-notice__close",f.type="button",f.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),f.textContent="\xD7";let v=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};f.addEventListener("click",v),u.appendChild(m),u.appendChild(p),u.appendChild(f),c.appendChild(u),r||setTimeout(v,o)}function Dl(t,e,s){let o=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!o)return;let r=o.getElementById("yyt-fallback-toast");r&&r.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=n[t]||n.info,i=o.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${a.bg};
    color: #0b0f15;
    border-radius: 8px;
    border: 2px solid ${a.border};
    font-size: 14px;
    font-weight: 500;
    z-index: 99999;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: yyt-toast-in 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  `,i.textContent=e,!o.getElementById("yyt-toast-styles")){let l=o.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,o.head.appendChild(l)}o.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},s)}function $(){if(At)return At;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return At=window.parent.jQuery,At}catch{}return window.jQuery&&(At=window.jQuery),At}function Ll(){At=null}function D(t){return t&&t.length>0}function bt(t,e=y){if(!$()||!D(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let o=t.find(`#${e}-model`).val()?.trim()||"",r=t.find(`#${e}-model-select`);return r.is(":visible")&&(o=r.val()||o),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:o,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Et(t,e,s=y){if(!$()||!D(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",r);let a=t.find(`#${s}-custom-api-fields`);r?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Mt(t){let{id:e,title:s,body:o,width:r="380px",wide:n=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${n?"yyt-dialog-wide":""} ${a}" style="${r!=="380px"?`width: ${r};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body ${i}" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${o}
        </div>
        <div class="yyt-dialog-footer ${l}">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function kt(t,e,s={}){if(!$())return()=>{};let r=t.find(`#${e}-overlay`),n=()=>{r.remove(),s.onClose&&s.onClose()};return r.find(`#${e}-close, #${e}-cancel`).on("click",n),r.on("click",function(a){a.target===this&&n()}),r.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(n)}),n}function it(t,e){let s=new Blob([t],{type:"application/json"}),o=URL.createObjectURL(s),r=document.createElement("a");r.href=o,r.download=e,r.click(),URL.revokeObjectURL(o)}function lt(t){return new Promise((e,s)=>{let o=new FileReader;o.onload=r=>e(r.target.result),o.onerror=r=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),o.readAsText(t)})}var y,At,ke=O(()=>{y="youyou_toolkit";At=null});var fs,Z,fr=O(()=>{me();ke();fs=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,P.emit(k.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,o={}){let r=$();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let a;if(typeof s=="string"?a=r(s):s&&s.jquery?a=s:s&&(a=r(s)),!D(a)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}if(this.destroyInstance(e),typeof n.renderTo=="function")n.renderTo(a,{...o,dependencies:this.dependencies});else{let i=n.render({...o,dependencies:this.dependencies});a.html(i),n.bindEvents(a,this.dependencies)}this.activeInstances.set(e,{container:a,component:n,props:o}),P.emit(k.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,P.emit(k.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,P.emit(k.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,o)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let o=e.createElement("style");o.id=s,o.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(o)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){P.on(k.PRESET_UPDATED,()=>{}),P.on(k.TOOL_UPDATED,()=>{})}},Z=new fs});var jn={};le(jn,{API_STATUS:()=>Wl,fetchAvailableModels:()=>vr,getApiConfig:()=>ht,getEffectiveApiConfig:()=>ms,hasEffectiveApiPreset:()=>bs,sendApiRequest:()=>hs,sendWithPreset:()=>hr,testApiConnection:()=>Vl,updateApiConfig:()=>Vt,validateApiConfig:()=>Jt});function Ul(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function br(){return _.get(Nn,Ul())}function zl(t){_.set(Nn,t)}function Bn(){return _.get(Nl,[])}function jl(){return _.get(Bl,"")}function mr(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function Un(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let o=null;try{o=new URL(s)}catch{return s}let r=o.pathname.replace(/\/+$/,""),n=r;return e==="chat_completions"?!/\/chat\/completions$/i.test(r)&&!/\/completions$/i.test(r)&&(n=`${r||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(r)?n=r.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(r)?n=r.replace(/\/completions$/i,"/models"):/\/models$/i.test(r)||(n=`${r||""}/models`)),o.pathname=n.replace(/\/+/g,"/"),o.toString()}function Fl(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function ht(){return br().apiConfig||{}}function Vt(t){let e=br();e.apiConfig={...e.apiConfig,...t},zl(e)}function Jt(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function ms(t=""){let e=br(),s=t||jl()||"";if(s){let r=Bn().find(n=>n.name===s);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return e.apiConfig||{}}function bs(t=""){return t?Bn().some(s=>s?.name===t):!1}async function hr(t,e,s={},o=null){let r=ms(t);return await hs(e,{...s,apiConfig:r},o)}function zn(t,e={}){let s=e.apiConfig||ht();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function xr(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function hs(t,e={},s=null){let o=e.apiConfig||ht(),r=o.useMainApi,n=Jt(o);if(!n.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return r?await Kl(t,e,s):await Hl(t,o,e,s)}async function Kl(t,e,s){let o=typeof window.parent<"u"?window.parent:window;if(!o.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function Hl(t,e,s,o){let r=typeof window.parent<"u"?window.parent:window;if(r.TavernHelper?.generateRaw)try{return await Yl(t,e,s,o,r)}catch(n){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(r.SillyTavern?.getRequestHeaders)try{return await ql(t,e,s,o,r)}catch(n){if(!n?.allowDirectFallback)throw n}return await Gl(t,e,s,o)}async function Yl(t,e,s,o,r){if(o?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:Fl(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof n=="string"?n.trim():xr(n)}async function ql(t,e,s,o,r){let n=String(e.url||"").trim(),a={...zn(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof r.SillyTavern?.getRequestHeaders=="function"?r.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:o})}catch(u){throw u?.name==="AbortError"?u:mr(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw mr(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let m=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw mr(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${m||"(\u7A7A\u54CD\u5E94)"}`)}return xr(d)}async function Gl(t,e,s,o){let r=zn(t,{apiConfig:e,...s}),n=Un(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(n,{method:"POST",headers:a,body:JSON.stringify(r),signal:o}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return xr(c)}async function Vl(t=null){let e=t||ht(),s=Date.now();try{await hs([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let r=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(o){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${o.message}`,latency:Date.now()-s}}}async function vr(t=null){let e=t||ht();return e.useMainApi?await Jl():await Xl(e)}async function Jl(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Xl(t){if(!t.url||!t.apiKey)return[];try{let e=Un(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let o=await s.json();return o.data&&Array.isArray(o.data)?o.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var Nn,Nl,Bl,Wl,xs=O(()=>{Re();Nn="settings",Nl="api_presets",Bl="current_preset";Wl={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Hn={};le(Hn,{createPreset:()=>eo,createPresetFromCurrentConfig:()=>oc,deletePreset:()=>to,duplicatePreset:()=>sc,exportPresets:()=>Ar,generateUniquePresetName:()=>Mr,getActiveConfig:()=>_r,getActivePresetName:()=>so,getAllPresets:()=>xt,getPreset:()=>Ct,getPresetNames:()=>ec,getStarredPresets:()=>Sr,importPresets:()=>Er,presetExists:()=>vs,renamePreset:()=>tc,switchToPreset:()=>Pt,togglePresetStar:()=>Tr,updatePreset:()=>wr,validatePreset:()=>rc});function Zl(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Kn(){return _.get(Ql,Zl())}function Se(){return _.get(Wn,[])}function It(t){_.set(Wn,t)}function Zs(){return _.get(Fn,"")}function Qs(t){_.set(Fn,t||"")}function xt(){return Se()}function ec(){return Se().map(e=>e.name)}function Ct(t){return!t||typeof t!="string"?null:Se().find(s=>s.name===t)||null}function vs(t){return!t||typeof t!="string"?!1:Se().some(s=>s.name===t)}function eo(t){let{name:e,description:s,apiConfig:o}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(vs(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={name:r,description:s||"",apiConfig:{url:o?.url||"",apiKey:o?.apiKey||"",model:o?.model||"",useMainApi:o?.useMainApi??!0,max_tokens:o?.max_tokens||4096,temperature:o?.temperature??.7,top_p:o?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=Se();return a.push(n),It(a),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:n}}function wr(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Se(),o=s.findIndex(a=>a.name===t);if(o===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=s[o],n={...r,...e,name:r.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...r.apiConfig,...e.apiConfig}),s[o]=n,It(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function to(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Se(),s=e.findIndex(o=>o.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),It(e),Zs()===t&&Qs(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function tc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!vs(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(vs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o=Se(),r=o.find(n=>n.name===t);return r&&(r.name=s,r.updatedAt=Date.now(),It(o),Zs()===t&&Qs(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function sc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),o=Ct(t);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(vs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(o)),name:s,createdAt:Date.now(),updatedAt:Date.now()},n=Se();return n.push(r),It(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:r}}function Tr(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Se(),s=e.find(o=>o.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),It(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Sr(){return Se().filter(e=>e.starred===!0)}function Pt(t){if(!t)return Qs(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Ct(t);return e?(Qs(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function so(){return Zs()}function _r(){let t=Zs();if(t){let s=Ct(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:Kn().apiConfig||{}}}function Ar(t=null){if(t){let s=Ct(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=Se();return JSON.stringify(e,null,2)}function Er(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(s)?s:[s];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=Se(),n=0;for(let a of o){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=r.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),r[i]=a,n++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),r.push(a),n++)}return n>0&&It(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function oc(t,e=""){let s=Kn();return eo({name:t,description:e,apiConfig:s.apiConfig})}function rc(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Mr(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=Se(),s=new Set(e.map(r=>r.name));if(!s.has(t))return t;let o=1;for(;s.has(`${t} (${o})`);)o++;return`${t} (${o})`}var Ql,Wn,Fn,ws=O(()=>{Re();Ql="settings",Wn="api_presets",Fn="current_preset"});function oo(t){return String(t||"").trim()}var Qe,je,kr=O(()=>{me();ke();xs();ws();Qe=null;je={id:"apiPresetPanel",render(t){let e=_r(),s=e?.apiConfig||ht(),o=oo(e?.presetName||so()),r=xt(),i=Sr().slice(0,8),l=i.length>0?i.map(u=>this._renderPresetItem(u)).join(""):"",c=Qe===null?o||"":oo(Qe),d=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
      <div class="yyt-api-manager">
        <div class="yyt-panel">
          <!-- \u9884\u8BBE\u9009\u62E9\u533A -->
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-bookmark"></i>
              <span>\u9884\u8BBE\u9009\u62E9</span>
            </div>
            
            <div class="yyt-preset-selector">
              <!-- \u81EA\u5B9A\u4E49\u4E0B\u62C9\u6846 -->
              <div class="yyt-custom-select" id="${y}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${b(c)}">${b(d)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${c?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${r.length>0?r.map(u=>this._renderSelectOption(u,c)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${y}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
                <i class="fa-solid fa-download"></i> \u52A0\u8F7D
              </button>
            </div>
            
            ${l?`
            <div class="yyt-preset-list-compact">
              ${l}
            </div>
            `:""}
          </div>
          
          <!-- API\u914D\u7F6E\u533A -->
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-sliders"></i>
              <span>API\u914D\u7F6E</span>
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${y}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${y}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${y}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${y}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${y}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${y}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${b(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${b(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${b(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
          </div>
        </div>
        <div class="yyt-preset-actions">
          <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="load" title="\u52A0\u8F7D\u914D\u7F6E">
            <i class="fa-solid fa-download"></i>
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger" data-action="delete" title="\u5220\u9664">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `},_renderSelectOption(t,e){let s=t.starred===!0,o=s?"yyt-option-star yyt-starred":"yyt-option-star",r=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${b(t.name)}">
        <button class="${o}" data-preset="${b(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${r}</button>
        <span class="yyt-option-text">${b(t.name)}</span>
      </div>
    `},_renderApiConfigForm(t){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${y}-use-main-api" ${t.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${y}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${y}-api-url" 
                   value="${b(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${y}-api-key" 
                     value="${b(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${y}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${y}-model" 
                     value="${b(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${y}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${y}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${y}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${y}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${y}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=$();!s||!D(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${y}-preset-dropdown`),o=s.find(".yyt-select-trigger"),r=s.find(".yyt-select-value"),n=()=>{let a=String(r.data("value")||"").trim();if(!a){Qe="",Pt(""),Et(t,ht(),y),t.find(".yyt-preset-item").removeClass("yyt-loaded"),x("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=Ct(a);if(!i){x("error",`\u9884\u8BBE "${a}" \u4E0D\u5B58\u5728`);return}Qe=a,Pt(a),Et(t,i.apiConfig,y),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),x("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${a}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};o.on("click",function(a){a.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",a=>{if(e(a.target).hasClass("yyt-option-star"))return;let i=e(a.currentTarget),l=i.data("value"),c=i.find(".yyt-option-text").text();Qe=String(l||"").trim(),r.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),i.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${y}-load-preset`).on("click",()=>{n()}),s.find(".yyt-option-star").on("click",a=>{a.preventDefault(),a.stopPropagation();let i=e(a.currentTarget).data("preset");if(!i)return;let l=Tr(i);if(l.success){x("success",l.message);let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else x("error",l.message)}),e(document).on("click.yyt-dropdown",a=>{e(a.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let r=e(s.currentTarget).data("preset-name"),n=e(s.target).closest("[data-action]").data("action");if(n)switch(s.stopPropagation(),n){case"load":t.find(".yyt-select-value").text(r).data("value",r),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${r.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${y}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let a=to(r);if(x(a.success?"info":"error",a.message),a.success){oo(Qe)===r&&(Qe=null);let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${y}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),o=t.find(`#${y}-custom-api-fields`);s?o.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):o.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${y}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${y}-api-key`),o=s.attr("type");s.attr("type",o==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${y}-load-models`).on("click",async()=>{let s=t.find(`#${y}-load-models`),o=t.find(`#${y}-model`),r=t.find(`#${y}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=bt(t,y),a=await vr(n);if(a.length>0){r.empty(),a.forEach(l=>{r.append(`<option value="${b(l)}">${b(l)}</option>`)}),o.hide(),r.show();let i=o.val();i&&a.includes(i)&&r.val(i),r.off("change").on("change",function(){o.val(e(this).val())}),x("success",`\u5DF2\u52A0\u8F7D ${a.length} \u4E2A\u6A21\u578B`)}else x("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(n){x("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${y}-model`).on("focus",function(){let s=t.find(`#${y}-model-select`);e(this).show(),s.hide()}),t.find(`#${y}-save-api-config`).on("click",()=>{let s=bt(t,y),o=oo(so()),r=Jt(s);if(!r.valid&&!s.useMainApi){x("error",r.errors.join(", "));return}if(o){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${o}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){Vt(s),Pt(""),Qe="",x("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a);return}Vt(s);let n=wr(o,{apiConfig:s});if(n.success){Qe=o,x("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${o}"`),Pt(o),P.emit(k.PRESET_UPDATED,{name:o});let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}else x("error",n.message);return}Vt(s),x("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${y}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Pt(""),Qe="",Vt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),x("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${y}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${y}-export-presets`).on("click",()=>{try{let s=Ar();it(s,`youyou_toolkit_presets_${Date.now()}.json`),x("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){x("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${y}-import-presets`).on("click",()=>{t.find(`#${y}-import-file`).click()}),t.find(`#${y}-import-file`).on("change",async s=>{let o=s.target.files[0];if(o){try{let r=await lt(o),n=Er(r,{overwrite:!0});if(x(n.success?"success":"error",n.message),n.imported>0){let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}catch(r){x("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let o=xt().map(d=>d.name),r=Mr("\u65B0\u9884\u8BBE"),n=`
      <div class="yyt-dialog-overlay" id="${y}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${y}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${y}-dialog-preset-name" 
                     value="${b(r)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${y}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${y}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${y}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e(`#${y}-dialog-overlay`).remove(),t.append(n);let a=e(`#${y}-dialog-overlay`),i=e(`#${y}-dialog-preset-name`),l=e(`#${y}-dialog-preset-desc`);i.focus().select();let c=()=>a.remove();a.find(`#${y}-dialog-close, #${y}-dialog-cancel`).on("click",c),a.on("click",function(d){d.target===this&&c()}),a.find(`#${y}-dialog-save`).on("click",()=>{let d=i.val().trim(),u=l.val().trim();if(!d){x("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),i.focus();return}if(o.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;to(d)}let m=bt(t,y),p=eo({name:d,description:u,apiConfig:m});if(p.success){x("success",p.message),c(),P.emit(k.PRESET_CREATED,{preset:p.preset});let f=t.closest(".yyt-api-manager").parent();f.length&&this.renderTo(f)}else x("error",p.message)}),i.on("keypress",function(d){d.which===13&&a.find(`#${y}-dialog-save`).click()})},destroy(t){let e=$();!e||!D(t)||(t.off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
      .yyt-api-manager {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .yyt-form-row-2col > .yyt-form-group {
        flex: 1;
      }

      .yyt-input-group {
        display: flex;
        gap: 8px;
      }

      .yyt-input-group .yyt-input {
        flex: 1;
      }

      .yyt-model-row {
        display: flex;
        gap: 8px;
        align-items: stretch;
      }

      .yyt-model-input,
      .yyt-model-select {
        flex: 1;
        min-width: 0;
      }

      .yyt-model-btn {
        flex-shrink: 0;
        min-width: 40px;
      }

      .yyt-model-btn i {
        color: var(--yyt-accent);
      }

      .yyt-option-star.yyt-placeholder {
        visibility: hidden;
      }

      .yyt-option-star.yyt-starred:hover {
        color: #fcd34d;
        background: rgba(251, 191, 36, 0.18);
        border-color: rgba(251, 191, 36, 0.26);
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var oa={};le(oa,{MESSAGE_MACROS:()=>sa,addTagRule:()=>Xt,createRuleTemplate:()=>Xn,default:()=>ic,deleteRulePreset:()=>ea,deleteRuleTemplate:()=>Zn,deleteTagRule:()=>Ts,escapeRegex:()=>$t,exportRulesConfig:()=>po,extractComplexTag:()=>qn,extractCurlyBraceTag:()=>Rr,extractHtmlFormatTag:()=>Gn,extractSimpleTag:()=>$r,extractTagContent:()=>Rt,generateTagSuggestions:()=>ao,getAllRulePresets:()=>co,getAllRuleTemplates:()=>Vn,getContentBlacklist:()=>Ot,getRuleTemplate:()=>Jn,getTagRules:()=>ct,importRulesConfig:()=>yo,isValidTagName:()=>Pr,loadRulePreset:()=>uo,saveRulesAsPreset:()=>lo,scanTextForTags:()=>no,setContentBlacklist:()=>Ss,setTagRules:()=>io,shouldSkipContent:()=>Cr,testRegex:()=>ta,updateRuleTemplate:()=>Qn,updateTagRule:()=>Qt});function nc(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Ir],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Ie(){return _.get(Yn,nc())}function Ze(t){_.set(Yn,t)}function ro(){let t=Ie();return he=t.ruleTemplates||[...Ir],te=t.tagRules||[],_e=t.contentBlacklist||[],{ruleTemplates:he,tagRules:te,contentBlacklist:_e}}function $t(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Cr(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(o=>{let r=o.trim().toLowerCase();return r&&s.includes(r)})}function Pr(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!ac.includes(t.toLowerCase())}function $r(t,e){if(!t||!e)return[];let s=[],o=$t(e),r=new RegExp(`<${o}>([\\s\\S]*?)<\\/${o}>`,"gi");[...t.matchAll(r)].forEach(l=>{l[1]&&s.push(l[1].trim())});let a=(t.match(new RegExp(`<${o}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return a>i&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function Rr(t,e){if(!t||!e)return[];let s=[],o=$t(e),r=new RegExp(`\\{${o}\\|`,"gi"),n;for(;(n=r.exec(t))!==null;){let a=n.index,i=a+n[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&s.push(d.trim())}r.lastIndex=a+1}return s}function qn(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let o=s[0].trim(),r=s[1].trim(),n=r.match(/<\/(\w+)>/);if(!n)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let a=n[1],i=new RegExp(`${$t(o)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Gn(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let o=s[1],r=[],n=new RegExp(`<${o}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${o}>`,"gi");[...t.matchAll(n)].forEach(c=>{c[1]&&r.push(c[1].trim())});let i=(t.match(new RegExp(`<${o}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return i>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${o}> \u6807\u7B7E`),r}function Rt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let o=e.filter(d=>d.type==="exclude"&&d.enabled),r=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),n=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of o)try{let u=new RegExp(`<${$t(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${$t(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(r.length>0)for(let d of r){let u=[];try{if(d.type==="include")u.push(...$r(a,d.value)),u.push(...Rr(a,d.value));else if(d.type==="regex_include"){let m=new RegExp(d.value,"gi");[...a.matchAll(m)].forEach(f=>{f[1]&&u.push(f[1])})}}catch(m){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:m})}u.forEach(m=>i.push(m.trim()))}else i.push(a);let l=[];for(let d of i){for(let u of n)try{let m=new RegExp(u.value,"gi");d=d.replace(m,"")}catch(m){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:m})}Cr(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function no(t,e={}){let s=performance.now(),{chunkSize:o=5e4,maxTags:r=100,timeoutMs:n=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=o){let m=t.slice(u,Math.min(u+o,t.length));if(c++,l+=m.length,performance.now()-s>n){console.warn(`[YouYouToolkit] Tag scanning timed out after ${n}ms`);break}let p;for(;(p=i.exec(m))!==null&&a.size<r;){let f=(p[1]||p[2]).toLowerCase();Pr(f)&&a.add(f)}if(a.size>=r)break;c%5===0&&await new Promise(f=>setTimeout(f,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function ao(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Vn(){return he.length===0&&ro(),he}function Jn(t){return he.find(e=>e.id===t)}function Xn(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return he.push(e),Or(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Qn(t,e){let s=he.findIndex(o=>o.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(he[s]={...he[s],...e,updatedAt:new Date().toISOString()},Or(),{success:!0,template:he[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Zn(t){let e=he.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(he.splice(e,1),Or(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Or(){let t=Ie();t.ruleTemplates=he,Ze(t)}function ct(){return te||ro(),te}function io(t){te=t||[];let e=Ie();e.tagRules=te,Ze(e)}function Xt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};te.push(e);let s=Ie();return s.tagRules=te,Ze(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Qt(t,e){if(t<0||t>=te.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};te[t]={...te[t],...e};let s=Ie();return s.tagRules=te,Ze(s),{success:!0,rule:te[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Ts(t){if(t<0||t>=te.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};te.splice(t,1);let e=Ie();return e.tagRules=te,Ze(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Ot(){return _e||ro(),_e}function Ss(t){_e=t||[];let e=Ie();e.contentBlacklist=_e,Ze(e)}function lo(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Ie();s.tagRulePresets||(s.tagRulePresets={});let o=`preset-${Date.now()}`;return s.tagRulePresets[o]={id:o,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(te)),blacklist:JSON.parse(JSON.stringify(_e)),createdAt:new Date().toISOString()},Ze(s),{success:!0,preset:s.tagRulePresets[o],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function co(){let e=Ie().tagRulePresets||{};return Object.values(e)}function uo(t){let e=Ie(),o=(e.tagRulePresets||{})[t];return o?(te=JSON.parse(JSON.stringify(o.rules||[])),_e=JSON.parse(JSON.stringify(o.blacklist||[])),e.tagRules=te,e.contentBlacklist=_e,Ze(e),{success:!0,preset:o,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function ea(t){let e=Ie(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,Ze(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function po(){return JSON.stringify({tagRules:te,contentBlacklist:_e,ruleTemplates:he,tagRulePresets:Ie().tagRulePresets||{}},null,2)}function yo(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)te=s.tagRules||[],_e=s.contentBlacklist||[],he=s.ruleTemplates||Ir;else if(s.tagRules&&te.push(...s.tagRules),s.contentBlacklist){let r=new Set(_e.map(n=>n.toLowerCase()));s.contentBlacklist.forEach(n=>{r.has(n.toLowerCase())||_e.push(n)})}let o=Ie();return o.tagRules=te,o.contentBlacklist=_e,o.ruleTemplates=he,s.tagRulePresets&&(o.tagRulePresets={...o.tagRulePresets||{},...s.tagRulePresets}),Ze(o),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function ta(t,e,s="g",o=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(t,s),n=[];if(s.includes("g")){let a;for(;(a=r.exec(e))!==null;)a.length>1?n.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[o]||a[1]||a[0]}):n.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=r.exec(e);a&&n.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[o]||a[1]:a[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(a=>a.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var Yn,ac,Ir,he,te,_e,sa,ic,go=O(()=>{Re();Yn="settings";ac=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Ir=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],he=[],te=[],_e=[];sa={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};ro();ic={extractTagContent:Rt,extractSimpleTag:$r,extractCurlyBraceTag:Rr,extractComplexTag:qn,extractHtmlFormatTag:Gn,escapeRegex:$t,shouldSkipContent:Cr,isValidTagName:Pr,scanTextForTags:no,generateTagSuggestions:ao,getAllRuleTemplates:Vn,getRuleTemplate:Jn,createRuleTemplate:Xn,updateRuleTemplate:Qn,deleteRuleTemplate:Zn,getTagRules:ct,setTagRules:io,addTagRule:Xt,updateTagRule:Qt,deleteTagRule:Ts,getContentBlacklist:Ot,setContentBlacklist:Ss,saveRulesAsPreset:lo,getAllRulePresets:co,loadRulePreset:uo,deleteRulePreset:ea,exportRulesConfig:po,importRulesConfig:yo,testRegex:ta,MESSAGE_MACROS:sa}});var We,Dr=O(()=>{me();ke();go();We={id:"regexExtractPanel",render(t){let e=ct(),s=Ot(),o=co();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${y}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
            </button>
          </div>
          
          ${this._renderRulesEditor(e,s,o)}
        </div>
        
        <!-- \u6D4B\u8BD5\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-flask"></i>
            <span>\u6D4B\u8BD5\u63D0\u53D6</span>
          </div>
          
          ${this._renderTestSection()}
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${y}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${y}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${y}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${y}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${y}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${y}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${y}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(t,e,s){let o=t.length>0?t.map((n,a)=>this._renderRuleItem(n,a)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=s.length>0?s.map(n=>`<option value="${n.id}">${b(n.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${r?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${y}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${r}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${y}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${y}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${y}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${o}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${y}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${y}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${y}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${y}-content-blacklist" 
                 value="${b(e.join(", "))}" 
                 placeholder="\u5173\u952E\u8BCD1, \u5173\u952E\u8BCD2, ...">
        </div>
      </div>
    `},_renderRuleItem(t,e){return`
      <div class="yyt-rule-item" data-rule-index="${e}">
        <select class="yyt-select yyt-rule-type" style="flex: 2; min-width: 100px;">
          <option value="include" ${t.type==="include"?"selected":""}>\u5305\u542B</option>
          <option value="regex_include" ${t.type==="regex_include"?"selected":""}>\u6B63\u5219\u5305\u542B</option>
          <option value="exclude" ${t.type==="exclude"?"selected":""}>\u6392\u9664</option>
          <option value="regex_exclude" ${t.type==="regex_exclude"?"selected":""}>\u6B63\u5219\u6392\u9664</option>
        </select>
        <input type="text" class="yyt-input yyt-rule-value" style="flex: 5;" 
               placeholder="\u6807\u7B7E\u540D\u6216\u6B63\u5219\u8868\u8FBE\u5F0F" 
               value="${b(t.value||"")}">
        <label class="yyt-checkbox-label yyt-rule-enabled-label">
          <input type="checkbox" class="yyt-rule-enabled" ${t.enabled?"checked":""}>
          <span>\u542F\u7528</span>
        </label>
        <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-rule-delete" title="\u5220\u9664\u89C4\u5219">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `},_renderTestSection(){return`
      <div class="yyt-test-section">
        <div class="yyt-form-group">
          <label>\u6D4B\u8BD5\u6587\u672C</label>
          <textarea class="yyt-textarea" id="${y}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${y}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${y}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${y}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${y}-test-result"></div>
        </div>
      </div>
    `},bindEvents(t,e){let s=$();!s||!D(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val();Qt(o,{type:r}),x("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val().trim();Qt(o,{value:r})}),t.find(".yyt-rule-enabled").on("change",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).is(":checked");Qt(o,{enabled:r}),x("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let o=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ts(o),this.renderTo(t),x("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let r=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ts(r),this.renderTo(t),x("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${y}-add-rule`).on("click",()=>{Xt({type:"include",value:"",enabled:!0}),this.renderTo(t),x("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${y}-scan-tags`).on("click",async()=>{let s=t.find(`#${y}-scan-tags`),o=t.find(`#${y}-test-input`).val();if(!o||!o.trim()){x("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await no(o,{maxTags:50,timeoutMs:3e3}),{suggestions:n,stats:a}=ao(r,25);if(n.length===0){x("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${y}-tag-suggestions-container`).hide();return}let i=t.find(`#${y}-tag-list`);t.find(`#${y}-tag-scan-stats`).text(`${a.finalCount}/${a.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),i.empty(),n.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${b(c)}</button>`);d.on("click",()=>{if(ct().some(p=>p.type==="include"&&p.value===c)){x("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Xt({type:"include",value:c,enabled:!0}),this.renderTo(t),x("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),i.append(d)}),t.find(`#${y}-tag-suggestions-container`).show(),x("success",`\u53D1\u73B0 ${n.length} \u4E2A\u6807\u7B7E`)}catch(r){x("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${y}-add-exclude-cot`).on("click",()=>{let s=ct(),o="<!--[\\s\\S]*?-->";if(s.some(n=>n.type==="regex_exclude"&&n.value===o)){x("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Xt({type:"regex_exclude",value:o,enabled:!0}),this.renderTo(t),x("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${y}-content-blacklist`).on("change",function(){let o=e(this).val().split(",").map(r=>r.trim()).filter(r=>r);Ss(o),x("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${o.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${y}-show-examples`).on("click",()=>{alert(`
\u89C4\u5219\u7C7B\u578B\u8BF4\u660E:

1. \u3010\u5305\u542B\u3011include
   - \u7B80\u5355\u6807\u7B7E\u540D\u63D0\u53D6
   - \u540C\u65F6\u5339\u914D <tag>\u5185\u5BB9</tag> \u548C {tag|\u5185\u5BB9}
   - \u793A\u4F8B\u503C: content, thinking, story

2. \u3010\u6B63\u5219\u5305\u542B\u3011regex_include
   - \u4F7F\u7528\u6B63\u5219\u8868\u8FBE\u5F0F\u63D0\u53D6
   - \u5FC5\u987B\u5305\u542B\u6355\u83B7\u7EC4 ()
   - \u7CFB\u7EDF\u63D0\u53D6\u7B2C\u4E00\u4E2A\u6355\u83B7\u7EC4\u7684\u5185\u5BB9
   - \u793A\u4F8B: <details[^>]*>([\\s\\S]*?)</details>

3. \u3010\u6392\u9664\u3011exclude
   - \u5757\u7EA7\u6392\u9664\uFF0C\u79FB\u9664\u6574\u4E2A\u6807\u7B7E\u5757
   - \u5728\u63D0\u53D6\u4E4B\u524D\u6267\u884C
   - \u793A\u4F8B\u503C: thinking, analysis

4. \u3010\u6B63\u5219\u6392\u9664\u3011regex_exclude
   - \u5BF9\u5DF2\u63D0\u53D6\u7684\u5185\u5BB9\u8FDB\u884C\u6E05\u7406
   - \u79FB\u9664\u5339\u914D\u7684\u5185\u5BB9
   - \u793A\u4F8B:<!--[\\s\\S]*?--> (\u79FB\u9664HTML\u6CE8\u91CA)

\u5904\u7406\u987A\u5E8F:
Phase 1: \u6267\u884C\u3010\u6392\u9664\u3011\u89C4\u5219\uFF0C\u79FB\u9664\u4E0D\u9700\u8981\u7684\u6807\u7B7E\u5757
Phase 2: \u6267\u884C\u3010\u5305\u542B\u3011\u548C\u3010\u6B63\u5219\u5305\u542B\u3011\u89C4\u5219\uFF0C\u63D0\u53D6\u5185\u5BB9
Phase 3: \u6267\u884C\u3010\u6B63\u5219\u6392\u9664\u3011\u89C4\u5219\uFF0C\u6E05\u7406\u63D0\u53D6\u7684\u5185\u5BB9
Phase 4: \u5E94\u7528\u9ED1\u540D\u5355\u8FC7\u6EE4

\u5E38\u7528\u89C4\u5219\u793A\u4F8B:
\u2022 \u6392\u9664\u601D\u8003\u8FC7\u7A0B: \u7C7B\u578B=\u6392\u9664, \u503C=thinking
\u2022 \u63D0\u53D6\u5185\u5BB9\u6807\u7B7E: \u7C7B\u578B=\u5305\u542B, \u503C=content
\u2022 \u6392\u9664HTML\u6CE8\u91CA: \u7C7B\u578B=\u6B63\u5219\u6392\u9664, \u503C=<!--[\\s\\S]*?-->
\u2022 \u63D0\u53D6\u82B1\u62EC\u53F7\u5185\u5BB9: \u7C7B\u578B=\u5305\u542B, \u503C=story
      `)})},_bindPresetEvents(t,e){t.find(`#${y}-load-rule-preset`).on("click",()=>{let s=t.find(`#${y}-rule-preset-select`).val();if(!s){x("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let o=uo(s);o.success?(this.renderTo(t),x("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${o.preset.name}`),P.emit(k.REGEX_PRESET_LOADED,{preset:o.preset})):x("error",o.message)}),t.find(`#${y}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let o=lo(s.trim());o.success?(this.renderTo(t),x("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):x("error",o.message)})},_bindTestEvents(t,e){t.find(`#${y}-test-extract`).on("click",()=>{let s=t.find(`#${y}-test-input`).val();if(!s||!s.trim()){x("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let o=ct(),r=Ot(),n=Rt(s,o,r),a=t.find(`#${y}-test-result-container`),i=t.find(`#${y}-test-result`);a.show(),!n||!n.trim()?(i.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),x("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(i.html(`<pre class="yyt-code-block">${b(n)}</pre>`),x("success","\u63D0\u53D6\u5B8C\u6210"),P.emit(k.REGEX_EXTRACTED,{result:n}))}),t.find(`#${y}-test-clear`).on("click",()=>{t.find(`#${y}-test-input`).val(""),t.find(`#${y}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${y}-import-rules`).on("click",()=>{t.find(`#${y}-import-rules-file`).click()}),t.find(`#${y}-import-rules-file`).on("change",async s=>{let o=s.target.files[0];if(o){try{let r=await lt(o),n=yo(r,{overwrite:!0});n.success?(this.renderTo(t),x("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):x("error",n.message)}catch(r){x("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find(`#${y}-export-rules`).on("click",()=>{try{let s=po();it(s,`youyou_toolkit_rules_${Date.now()}.json`),x("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){x("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${y}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(io([]),Ss([]),this.renderTo(t),x("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!$()||!D(t)||t.off()},getStyles(){return`
      /* \u6B63\u5219\u63D0\u53D6\u9762\u677F\u6837\u5F0F */
      .yyt-regex-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      /* \u89C4\u5219\u7F16\u8F91\u5668\u6837\u5F0F */
      .yyt-tag-rules-editor {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .yyt-rules-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 250px;
        overflow-y: auto;
        padding-right: 4px;
      }
      
      .yyt-rule-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 13px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.025) 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 20px rgba(0, 0, 0, 0.1);
      }

      .yyt-rule-item:hover {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%);
        border-color: rgba(255, 255, 255, 0.18);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 24px rgba(0, 0, 0, 0.12);
      }

      .yyt-rule-enabled-label {
        flex-shrink: 0;
        white-space: nowrap;
      }

      /* \u6807\u7B7E\u5EFA\u8BAE\u533A\u57DF */
      .yyt-tag-suggestions {
        margin-top: 12px;
        padding: 14px;
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.03) 100%);
        border: 1px solid rgba(74, 222, 128, 0.24);
        border-radius: 16px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 12px 22px rgba(0, 0, 0, 0.08);
      }

      .yyt-tag-suggestions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        font-size: 12px;
        font-weight: 700;
        color: var(--yyt-text-secondary);
      }

      .yyt-tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .yyt-tag-list .yyt-btn {
        cursor: pointer;
      }

      .yyt-tag-list .yyt-btn:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.24) 0%, rgba(123, 183, 255, 0.11) 100%);
        border-color: rgba(123, 183, 255, 0.4);
      }
      
      /* \u6D4B\u8BD5\u533A\u57DF */
      .yyt-test-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .yyt-test-result {
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        padding: 14px;
        max-height: 300px;
        overflow-y: auto;
      }
      
      .yyt-code-block {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
        padding: 10px;
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 11px;
        color: var(--yyt-success);
        white-space: pre-wrap;
        word-break: break-all;
        margin: 8px 0 0 0;
        max-height: 200px;
        overflow-y: auto;
      }
      
      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 11px;
      }
      
      .yyt-result-empty {
        text-align: center;
        color: var(--yyt-text-muted);
        padding: 20px;
      }
      
      .yyt-empty-state-small {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
        color: var(--yyt-text-muted);
        gap: 8px;
      }
      
      .yyt-empty-state-small i {
        font-size: 24px;
        opacity: 0.4;
      }
      
      .yyt-empty-state-small span {
        font-size: 12px;
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var ua={};le(ua,{createDefaultToolDefinition:()=>Dt,default:()=>uc,deleteTool:()=>bo,deleteToolPreset:()=>la,exportTools:()=>vo,getAllTools:()=>vt,getCurrentToolPreset:()=>ca,getTool:()=>Zt,getToolPresets:()=>ho,importTools:()=>wo,normalizeToolDefinitionToRuntimeConfig:()=>As,resetTools:()=>To,saveTool:()=>mo,saveToolPreset:()=>ia,setCurrentToolPreset:()=>da,setToolEnabled:()=>xo});function lc(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,s])=>[e,Dt({...s||{},id:e})]))}function _s(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Lr(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function ra(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>=0?s:e}function na(t={}){return{enabled:t?.enabled===!0,settleMs:ra(t?.settleMs,1200),cooldownMs:ra(t?.cooldownMs,5e3)}}function aa(t={}){return{enabled:t?.enabled===!0,selected:_s(t?.selected)}}function cc(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function dc(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let o=cc(e?.config?.messages||[]);return o||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Dt(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...Oe,...t,id:t?.id||Oe.id,icon:t?.icon||Oe.icon,order:Number.isFinite(t?.order)?t.order:Oe.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Oe.promptTemplate,extractTags:_s(t?.extractTags),config:{execution:{...Oe.config.execution,...s.execution||{},timeout:Lr(s?.execution?.timeout,Oe.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||Oe.config.execution.retries)},api:{...Oe.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...Oe.config.context,...s.context||{},depth:Lr(s?.context?.depth,Oe.config.context.depth),includeTags:_s(s?.context?.includeTags),excludeTags:_s(s?.context?.excludeTags)},automation:na(s?.automation),worldbooks:aa(s?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Oe.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function As(t,e={},s={}){let o=Dt({...e,id:t||e?.id||""}),r=_s(o?.extractTags?.length?o.extractTags:o?.config?.context?.includeTags),n=String(e?.output?.apiPreset||o?.config?.api?.preset||"").trim(),a=dc(t,o),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:o.id||t,name:o.name||t,icon:o.icon||"fa-screwdriver-wrench",description:o.description||"",enabled:o.enabled!==!1,order:Number.isFinite(o.order)?o.order:100,bypass:{enabled:o?.config?.api?.useBypass===!0&&!!o?.config?.api?.bypassPreset,presetId:o?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:n,overwrite:!0,enabled:!0},automation:na(o?.config?.automation),worldbooks:aa(o?.config?.worldbooks),extraction:{enabled:!0,maxMessages:Lr(o?.config?.context?.depth,5),selectors:r},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:r,isCustom:!0,category:o.category||"utility",metadata:{...o.metadata||{}}}}function vt(){let t=Q.get(ne.TOOLS),e=lc(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&Q.set(ne.TOOLS,e),{...fo,...e}}function Zt(t){return vt()[t]||null}function mo(t,e){if(!t||!e)return!1;let s=Q.get(ne.TOOLS)||{},o=!s[t]&&!fo[t],r=Dt({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=r,Q.set(ne.TOOLS,s),P.emit(o?k.TOOL_REGISTERED:k.TOOL_UPDATED,{toolId:t,tool:r}),!0}function bo(t){let e=Q.get(ne.TOOLS)||{};return!e[t]&&!fo[t]||fo[t]?!1:(delete e[t],Q.set(ne.TOOLS,e),P.emit(k.TOOL_UNREGISTERED,{toolId:t}),!0)}function ho(){return Q.get(ne.PRESETS)||{}}function ia(t,e){if(!t||!e)return!1;let s=ho(),o=!s[t];return s[t]={...e,name:t,updatedAt:new Date().toISOString()},Q.set(ne.PRESETS,s),P.emit(o?k.PRESET_CREATED:k.PRESET_UPDATED,{type:"tool",presetName:t,preset:s[t]}),!0}function la(t){let e=ho();return e[t]?(delete e[t],Q.set(ne.PRESETS,e),P.emit(k.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function ca(){return Q.get(ne.CURRENT_PRESET)||""}function da(t){return Q.set(ne.CURRENT_PRESET,t||""),P.emit(k.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function xo(t,e){let s=Zt(t);if(!s)return!1;let o=Q.get(ne.TOOLS)||{};return o[t]=Dt({...s,id:t,enabled:e,metadata:{...s?.metadata||{},createdAt:s?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),Q.set(ne.TOOLS,o),P.emit(e?k.TOOL_ENABLED:k.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function vo(){let t=Q.get(ne.TOOLS)||{},e=Q.get(ne.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function wo(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,o=JSON.parse(t);if(!o||typeof o!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=s?{}:Q.get(ne.TOOLS)||{},n=s?{}:Q.get(ne.PRESETS)||{},a=0,i=0;if(o.tools&&typeof o.tools=="object"){for(let[l,c]of Object.entries(o.tools))!c||typeof c!="object"||(r[l]=Dt({...c,id:l}),a+=1);Q.set(ne.TOOLS,r)}if(o.presets&&typeof o.presets=="object"){for(let[l,c]of Object.entries(o.presets))!c||typeof c!="object"||(n[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);Q.set(ne.PRESETS,n)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function To(){Q.remove(ne.TOOLS),Q.remove(ne.PRESETS),Q.remove(ne.CURRENT_PRESET)}var Oe,fo,ne,uc,So=O(()=>{Re();me();Oe={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},fo={},ne={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};uc={getAllTools:vt,getTool:Zt,saveTool:mo,deleteTool:bo,setToolEnabled:xo,exportTools:vo,importTools:wo,resetTools:To,getToolPresets:ho,saveToolPreset:ia,deleteToolPreset:la,getCurrentToolPreset:ca,setCurrentToolPreset:da,createDefaultToolDefinition:Dt,normalizeToolDefinitionToRuntimeConfig:As}});var Ca={};le(Ca,{TOOL_CATEGORIES:()=>pa,TOOL_REGISTRY:()=>es,appendToolRuntimeHistory:()=>_a,clearToolApiPreset:()=>wa,default:()=>xc,ensureToolRuntimeConfig:()=>_o,getAllDefaultToolConfigs:()=>Ea,getAllToolApiBindings:()=>Ta,getAllToolFullConfigs:()=>Cs,getEnabledTools:()=>Ma,getToolApiPreset:()=>jr,getToolBaseConfig:()=>ts,getToolConfig:()=>ks,getToolFullConfig:()=>X,getToolList:()=>ba,getToolSubTabs:()=>ha,getToolWindowState:()=>Ia,hasTool:()=>zr,onPresetDeleted:()=>Sa,patchToolRuntime:()=>Is,registerTool:()=>fa,resetToolConfig:()=>Aa,resetToolRegistry:()=>xa,saveToolConfig:()=>Le,saveToolWindowState:()=>ka,setToolApiPreset:()=>va,setToolApiPresetConfig:()=>mc,setToolBypassConfig:()=>bc,setToolOutputMode:()=>fc,setToolPromptTemplate:()=>hc,unregisterTool:()=>ma,updateToolRuntime:()=>Wr});function Es(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function pc(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function ya(){let t=vt()||{};return Object.entries(t).filter(([e])=>!Ms[e]).map(([e,s])=>[e,s||{}])}function Nr(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function ga(){let t=Array.isArray(es.tools?.subTabs)?es.tools.subTabs.map((s,o)=>({...s,order:Number.isFinite(s?.order)?s.order:o,toolKind:Nr(s),toolGroupLabel:Nr(s)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=ya().map(([s,o],r)=>{let n=As(s,o),a=Nr(n);return{id:s,name:n.name||s,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+r,isCustom:!0,description:n.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((s,o)=>(s.order??0)-(o.order??0))}function yc(t,e={}){let s=As(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:Es(s.runtime)}}function Ur(t){let e=Ms[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:Es(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let o=(vt()||{})[t]||null;return o?yc(t,o):ks(t)}function ts(t){let e=Ur(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function gc(t,e={},s=""){if(!t)return null;let o={...t,...e,id:t.id||e.id};o.output={...t.output||{},...e.output||{}},o.automation={enabled:t?.automation?.enabled===!0||e?.automation?.enabled===!0,settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},o.bypass={...t.bypass||{},...e.bypass||{}},o.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},o.runtime=Es({...t.runtime||{},...e.runtime||{}}),o.extraction={...t.extraction||{},...e.extraction||{}},o.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let r=e?.output?.apiPreset||e?.apiPreset||o.output?.apiPreset||o.apiPreset||s||"";return o.output={...o.output||{},apiPreset:r},o.apiPreset=r,(!Array.isArray(o.extraction.selectors)||o.extraction.selectors.length===0)&&Array.isArray(o.extractTags)&&o.extractTags.length>0&&(o.extraction.selectors=[...o.extractTags]),(!Array.isArray(o.extractTags)||o.extractTags.length===0)&&(o.extractTags=Array.isArray(o.extraction.selectors)?[...o.extraction.selectors]:[]),t.isCustom?o.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?o.enabled=e.enabled:o.enabled=t.enabled!==!1,o}function fa(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let o of s)if(!e[o])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${o}`),!1;return et[t]={id:t,...e,order:e.order??Object.keys(et).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function ma(t){return et[t]?(delete et[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function ba(t=!0){let e=Object.values(et).map(s=>s.id==="tools"?{...s,subTabs:ga()}:s);return t?e.sort((s,o)=>(s.order??0)-(o.order??0)):e}function ks(t){return t==="tools"&&et[t]?{...et[t],subTabs:ga()}:et[t]||null}function zr(t){return!!et[t]}function ha(t){let e=ks(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function xa(){et={...es},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function va(t,e){if(!zr(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=_.get(De)||{};return s[t]=e||"",_.set(De,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function jr(t){return(_.get(De)||{})[t]||""}function wa(t){let e=_.get(De)||{};delete e[t],_.set(De,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Ta(){return _.get(De)||{}}function Sa(t){let e=_.get(De)||{},s=!1;for(let o in e)e[o]===t&&(e[o]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${o}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&_.set(De,e)}function X(t){let e=Ur(t);if(!e)return ks(t);let o=(_.get(Lt)||{})[t]||{},r=jr(t);return gc({...e,id:t},o,r)}function _o(t){if(!t)return!1;let e=Ur(t);if(!e)return!1;let s=_.get(Lt)||{};if(s[t])return!0;let o={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};s[t]=o,_.set(Lt,s);let r=_.get(De)||{};return r[t]=o.output?.apiPreset||o.apiPreset||"",_.set(De,r),P.emit(k.TOOL_UPDATED,{toolId:t,config:o}),!0}function Le(t,e,s={}){if(!t||!X(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:o=!0}=s,r=_.get(Lt)||{},n=_.get(De)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return r[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){r[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){r[t][l]=a;return}r[t][l]=e[l]}}),r[t].apiPreset===void 0&&(r[t].apiPreset=a),!r[t].output&&e.output!==void 0&&(r[t].output={...e.output||{},apiPreset:a}),_.set(Lt,r),n[t]=a,_.set(De,n),o&&P.emit(k.TOOL_UPDATED,{toolId:t,config:r[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function fc(t,e){let s=X(t);return s?Le(t,{...s,output:{...s.output,mode:e}}):!1}function mc(t,e){let s=X(t);return s?Le(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function bc(t,e){let s=X(t);return s?Le(t,{...s,bypass:{...s.bypass,...e}}):!1}function hc(t,e){let s=X(t);return s?Le(t,{...s,promptTemplate:e}):!1}function Is(t,e,s={}){let o=X(t);if(!o)return!1;let{touchLastRunAt:r=!1,emitEvent:n=!1}=s,a=Es({...o.runtime||{},...e||{}});return r&&(a.lastRunAt=Date.now()),Le(t,{...o,runtime:a},{emitEvent:n})}function _a(t,e,s={},o={}){let r=X(t);if(!r)return!1;let{limit:n=10,emitEvent:a=!1}=o,i=Es(r.runtime||{}),l="recentWritebackHistory",c={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return i[l]=pc([...Array.isArray(i[l])?i[l]:[],c],n),c?.traceId&&(i.lastTraceId=c.traceId),Le(t,{...r,runtime:i},{emitEvent:a})}function Wr(t,e){return Is(t,e,{touchLastRunAt:!0,emitEvent:!0})}function Aa(t){if(!t||!Ms[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=_.get(Lt)||{};return delete e[t],_.set(Lt,e),P.emit(k.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Ea(){return{...Ms}}function Cs(){let t=new Set([...Object.keys(Ms),...ya().map(([e])=>e)]);return Array.from(t).map(e=>X(e)).filter(Boolean)}function Ma(){return Cs().filter(t=>t&&t.enabled)}function ka(t,e){let s=_.get(Br)||{};s[t]={...e,updatedAt:Date.now()},_.set(Br,s)}function Ia(t){return(_.get(Br)||{})[t]||null}var Lt,De,Br,Ms,es,pa,et,xc,wt=O(()=>{Re();me();So();Lt="tool_configs",De="tool_api_bindings",Br="tool_window_states";Ms={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<boo_FM>
<pg>\u9875\u7801</pg>
<time>\u65F6\u95F4</time>
<scene>\u573A\u666F</scene>
<plot>\u5267\u60C5\u6982\u8981</plot>
<event>\u4E8B\u4EF6\u63CF\u8FF0</event>
<defined>\u5DF2\u5B9A\u4E49\u5143\u7D20</defined>
<status>\u72B6\u6001</status>
<seeds>\u4F0F\u7B14</seeds>
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["boo_FM"]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["status_block"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]},youyouReview:{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",description:"\u5728\u56DE\u590D\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50",enabled:!0,order:5,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["youyou"]},promptTemplate:`\u8BF7\u57FA\u4E8E\u4EE5\u4E0B\u6700\u65B0\u5267\u60C5\u56DE\u590D\uFF0C\u751F\u6210\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u3002

\u786C\u6027\u8981\u6C42\uFF1A
1. \u53EA\u8F93\u51FA\u4E00\u4E2A <youyou>...</youyou> \u5757\uFF0C\u4E0D\u8981\u8F93\u51FA\u5176\u5B83\u8BF4\u660E\u3002
2. <youyou> \u5185\u5148\u5199\u4E00\u6574\u6BB5\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u6B63\u6587\uFF0C\u6B63\u6587\u4E0D\u6362\u884C\uFF0C\u5FC5\u987B\u4F7F\u7528\u5C0F\u5E7D\u7B2C\u4E00\u4EBA\u79F0\u53E3\u543B\uFF0C\u5E26\u4E00\u70B9\u81EA\u5938\u3001\u5410\u69FD\u3001\u7280\u5229\u70B9\u8BC4\u7684\u4E2A\u6027\u3002
3. \u70B9\u8BC4\u5185\u5BB9\u5FC5\u987B\u8986\u76D6\uFF1A\u672C\u6B21\u521B\u4F5C\u4EAE\u70B9\u4E0E\u7EDD\u5999\u4E4B\u5904\u3001\u5267\u60C5\u63A8\u8FDB\u60C5\u51B5\u3001\u4F0F\u7B14\u57CB\u8BBE\u3001\u540E\u7EED\u6CE8\u610F\u4E8B\u9879\u3002
4. \u7ED3\u5C3E\u5355\u72EC\u8FFD\u52A0\u4E00\u4E2A <gouzi>...</gouzi>\uFF0C\u7528\u4E8E\u7559\u4E0B\u5267\u60C5\u94A9\u5B50\u3002
5. <gouzi> \u5FC5\u987B\u653E\u5728 <youyou> \u5185\u90E8\uFF0C\u5E76\u4E14\u5355\u72EC\u6210\u6BB5\uFF0C\u4F46\u6574\u4F53\u4ECD\u53EA\u8FD4\u56DE\u4E00\u4E2A <youyou> \u5757\u3002

\u8F93\u51FA\u6A21\u677F\uFF1A
<youyou>
\u8FD9\u91CC\u662F\u4E00\u6574\u6BB5\u4E0D\u6362\u884C\u70B9\u8BC4\u6B63\u6587
<gouzi>\u8FD9\u91CC\u5199\u5267\u60C5\u94A9\u5B50</gouzi>
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},es={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7}},pa={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},et={...es};xc={TOOL_REGISTRY:es,TOOL_CATEGORIES:pa,registerTool:fa,unregisterTool:ma,getToolList:ba,getToolConfig:ks,hasTool:zr,getToolSubTabs:ha,resetToolRegistry:xa,setToolApiPreset:va,getToolApiPreset:jr,clearToolApiPreset:wa,getAllToolApiBindings:Ta,onPresetDeleted:Sa,saveToolWindowState:ka,getToolWindowState:Ia,getToolBaseConfig:ts,ensureToolRuntimeConfig:_o,getToolFullConfig:X,patchToolRuntime:Is,appendToolRuntimeHistory:_a,saveToolConfig:Le,resetToolConfig:Aa,getAllDefaultToolConfigs:Ea,getAllToolFullConfigs:Cs,getEnabledTools:Ma}});var Fe,Fr=O(()=>{ke();So();wt();Fe={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){x("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=vt(),s=Object.entries(e),o=s.filter(([,r])=>r?.enabled!==!1).length;return`
      <div class="yyt-tool-manager">
        <div class="yyt-tool-manage-hero yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            <span>\u5DE5\u5177\u5DE5\u4F5C\u533A</span>
          </div>
          <div class="yyt-tool-manage-hero-grid">
            <div class="yyt-tool-manage-copy">
              <div class="yyt-tool-manage-lead">\u5728\u8FD9\u91CC\u96C6\u4E2D\u521B\u5EFA\u3001\u6574\u7406\u548C\u7EF4\u62A4\u81EA\u5B9A\u4E49\u5DE5\u5177\u3002</div>
              <div class="yyt-tool-manage-hint">
                \u65B0\u5EFA\u5DE5\u5177\u540E\u4F1A\u81EA\u52A8\u51FA\u73B0\u5728\u4E0A\u65B9\u201C\u5DE5\u5177\u201D\u9875\u7B7E\u91CC\uFF0C\u53EF\u7EE7\u7EED\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\uFF0C\u5E76\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002
              </div>
            </div>
            <div class="yyt-tool-manage-stats">
              <div class="yyt-tool-manage-stat">
                <span class="yyt-tool-manage-stat-label">\u5DE5\u5177\u603B\u6570</span>
                <strong class="yyt-tool-manage-stat-value">${s.length}</strong>
              </div>
              <div class="yyt-tool-manage-stat">
                <span class="yyt-tool-manage-stat-label">\u5DF2\u542F\u7528</span>
                <strong class="yyt-tool-manage-stat-value">${o}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- \u5DE5\u5177\u5217\u8868 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-tools"></i>
            <span>\u5DE5\u5177\u5217\u8868</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-add-tool" style="margin-left: auto;">
              <i class="fa-solid fa-plus"></i> \u65B0\u5EFA\u5DE5\u5177
            </button>
          </div>
          <div class="yyt-tool-list">
            ${this._renderToolList(e)}
          </div>
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-import-tools">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="yyt-export-tools">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="yyt-import-tools-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-reset-tools">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
      </div>
    `},_renderToolList(t){let e=Object.entries(t);return e.length?e.map(([s,o])=>`
      <div class="yyt-tool-item ${o.enabled?"yyt-enabled":"yyt-disabled"}" data-tool-id="${s}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${b(o.name)}</span>
            <span class="yyt-tool-category">${b(o.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${o.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${b(o.description)}</div>
        <div class="yyt-tool-actions">
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="config">
            <i class="fa-solid fa-sliders"></i> \u914D\u7F6E
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="edit">
            <i class="fa-solid fa-pen"></i> \u7F16\u8F91
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-danger" data-action="delete">
            <i class="fa-solid fa-trash"></i> \u5220\u9664
          </button>
        </div>
      </div>
    `).join(""):`
        <div class="yyt-empty-state-small">
          <i class="fa-solid fa-toolbox"></i>
          <span>\u8FD8\u6CA1\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2\u201C\u65B0\u5EFA\u5DE5\u5177\u201D\u5F00\u59CB\u521B\u5EFA</span>
        </div>
      `},bindEvents(t,e){let s=$();!s||!D(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let o=e(s.currentTarget).closest(".yyt-tool-item"),r=o.data("tool-id"),n=e(s.currentTarget).is(":checked");xo(r,n),o.toggleClass("yyt-enabled",n).toggleClass("yyt-disabled",!n),x("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let o=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(o)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let o=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,o)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let o=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),r=Zt(o);if(!o||!r||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${r.name}\u201D\u5417\uFF1F`))return;if(!bo(o)){x("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),x("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let o=s.target.files[0];if(o){try{let r=await lt(o),n=wo(r,{overwrite:!1});x(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(r){x("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=vo();it(s,`youyou_toolkit_tools_${Date.now()}.json`),x("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){x("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(To(),this.renderTo(t),x("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let o=s?Zt(s):null,r=!!o,n=`
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${r?"\u7F16\u8F91\u5DE5\u5177":"\u65B0\u5EFA\u5DE5\u5177"}</span>
            <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5DE5\u5177\u540D\u79F0</label>
                <input type="text" class="yyt-input" id="yyt-tool-name" 
                       value="${o?b(o.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5206\u7C7B</label>
                <select class="yyt-select" id="yyt-tool-category">
                  <option value="api" ${o?.category==="api"?"selected":""}>API</option>
                  <option value="prompt" ${o?.category==="prompt"?"selected":""}>Prompt</option>
                  <option value="utility" ${o?.category==="utility"?"selected":""}>Utility</option>
                </select>
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0</label>
              <input type="text" class="yyt-input" id="yyt-tool-desc" 
                     value="${o?b(o.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u8D85\u65F6\u65F6\u95F4(ms)</label>
                <input type="number" class="yyt-input" id="yyt-tool-timeout" 
                       value="${o?.config?.execution?.timeout||6e4}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u91CD\u8BD5\u6B21\u6570</label>
                <input type="number" class="yyt-input" id="yyt-tool-retries" 
                       value="${o?.config?.execution?.retries||3}">
              </div>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(n);let a=e("#yyt-tool-dialog-overlay"),i=()=>a.remove();a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",i),a.on("click",function(l){l.target===this&&i()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),u=parseInt(e("#yyt-tool-timeout").val())||6e4,m=parseInt(e("#yyt-tool-retries").val())||3;if(!l){x("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let p=s||`tool_${Date.now()}`;if(!mo(p,{name:l,category:c,description:d,promptTemplate:o?.promptTemplate||"",extractTags:Array.isArray(o?.extractTags)?o.extractTags:[],config:{execution:{timeout:u,retries:m},api:o?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(o?.config?.messages)?o.config.messages:[],context:{depth:o?.config?.context?.depth||3,includeTags:Array.isArray(o?.config?.context?.includeTags)?o.config.context.includeTags:[],excludeTags:Array.isArray(o?.config?.context?.excludeTags)?o.config.context.excludeTags:[]},worldbooks:{enabled:o?.config?.worldbooks?.enabled===!0,selected:Array.isArray(o?.config?.worldbooks?.selected)?o.config.worldbooks.selected:[]}},enabled:o?.enabled!==!1})){x("error",r?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}_o(p),i(),this.renderTo(t),x("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),r||this._openToolConfig(p)})},destroy(t){!$()||!D(t)||t.off()},getStyles(){return`
      /* \u5DE5\u5177\u7BA1\u7406\u9762\u677F\u6837\u5F0F */
      .yyt-tool-manager {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-height: 100%;
      }

      .yyt-tool-manage-hero {
        position: relative;
        overflow: hidden;
        gap: 16px;
        border-radius: 26px;
        background:
          radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.16), transparent 62%),
          linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%);
      }

      .yyt-tool-manage-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 16px;
        align-items: stretch;
      }

      .yyt-tool-manage-copy {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .yyt-tool-manage-lead {
        font-size: 24px;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.2px;
        color: var(--yyt-text);
      }

      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-height: 0;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-tool-manage-hint {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.75;
        max-width: 64ch;
      }

      .yyt-tool-manage-stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(150px, 1fr));
        gap: 12px;
      }

      .yyt-tool-manage-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding: 16px;
        border-radius: 20px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%),
          rgba(5, 10, 18, 0.18);
        border: 1px solid rgba(255, 255, 255, 0.12);
        min-width: 150px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      }

      .yyt-tool-manage-stat-label {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.58);
        text-transform: uppercase;
        letter-spacing: 0.48px;
      }

      .yyt-tool-manage-stat-value {
        font-size: 28px;
        font-weight: 900;
        color: var(--yyt-text);
        line-height: 1;
      }

      .yyt-tool-item {
        position: relative;
        overflow: hidden;
        padding: 18px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
          rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 22px;
        transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 32px rgba(0, 0, 0, 0.12);
      }

      .yyt-tool-item::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(255, 255, 255, 0.05) 0%, transparent 40%, transparent 70%, rgba(255, 255, 255, 0.02) 100%);
        pointer-events: none;
      }

      .yyt-tool-item:hover {
        border-color: rgba(123, 183, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 36px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(123, 183, 255, 0.06);
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%),
          rgba(255, 255, 255, 0.012);
      }

      .yyt-tool-item.yyt-disabled {
        opacity: 0.6;
        filter: saturate(0.8);
      }

      .yyt-tool-item.yyt-enabled {
        border-color: rgba(74, 222, 128, 0.16);
      }

      .yyt-tool-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
        gap: 14px;
      }

      .yyt-tool-info {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex-wrap: wrap;
      }

      .yyt-tool-name {
        font-weight: 900;
        font-size: 17px;
        color: var(--yyt-text);
      }

      .yyt-tool-category {
        font-size: 10px;
        padding: 5px 10px;
        background: rgba(123, 183, 255, 0.14);
        border-radius: 999px;
        color: var(--yyt-accent-strong);
        border: 1px solid rgba(123, 183, 255, 0.2);
        text-transform: uppercase;
        letter-spacing: 0.45px;
        font-weight: 800;
      }

      .yyt-tool-desc {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.74);
        margin-bottom: 16px;
        line-height: 1.75;
      }

      .yyt-tool-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .yyt-tool-actions .yyt-btn-secondary {
        background: rgba(255, 255, 255, 0.07);
      }

      .yyt-tool-actions .yyt-btn-danger {
        margin-left: auto;
      }

      .yyt-tool-controls {
        flex-shrink: 0;
        padding-top: 2px;
      }

      .yyt-dialog-wide {
        width: 480px;
      }

      @media screen and (max-width: 768px) {
        .yyt-tool-manage-hero-grid {
          grid-template-columns: 1fr;
        }

        .yyt-tool-manage-stats {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .yyt-tool-header {
          align-items: flex-start;
          flex-direction: column;
        }
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});function ss(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Ao(){return ss()?.SillyTavern||null}function J(t){return t==null?"":String(t).trim()}function vc(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s.trim();return""}function wc(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function Pa(t=""){let e=String(t||"").trim();if(!e)return"empty";let s=0;for(let o=0;o<e.length;o+=1)s=(s<<5)-s+e.charCodeAt(o),s|=0;return`fp_${Math.abs(s).toString(36)}`}function $a(t={}){let e=J(t.chatId)||"chat_default",s=J(t.messageId)||"latest";return`${e}::${s}`}function Ra(t={}){let e=$a(t),s=J(t.effectiveSwipeId)||"swipe:current",o=J(t.assistantContentFingerprint)||"empty";return`${e}::${s}::${o}`}function Tc(t={}){let e=Ra(t),s=J(t.eventType)||"MANUAL",o=J(t.traceId)||Oa("manual");return`${e}::${s}::${o}`}function Oa(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Da(){let t=Ao();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function La(t=[]){let e=[],s=null,o=null;return t.forEach((r,n)=>{let a=wc(r),i=vc(r);if(!i)return;let l=J(r?.messageId??r?.message_id??r?.id??r?.mid??r?.mesid??r?.chat_index??n),c=J(r?.swipe_id??r?.swipeId??r?.swipe??""),d={role:a,content:i,sourceId:l,swipeId:c,raw:r,index:n};e.push(d),a==="user"&&(s=d),a==="assistant"&&(o=d)}),{messages:e,lastUserMessage:s,lastAiMessage:o}}function Sc(t,e,s){return J(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??s?.id??"chat_default")||"chat_default"}async function Kr(){let t=Ao();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let o=s[e];return{id:e,name:o?.name||"",description:o?.description||"",personality:o?.personality||"",scenario:o?.scenario||"",firstMes:o?.first_mes||"",mesExample:o?.mes_example||""}}}catch(e){console.error("[YouYouToolkit:ExecutionContext] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function _c(t="",e=null){let s=String(t||""),o=e?.YouYouToolkit_toolOutputs;return o&&typeof o=="object"&&Object.values(o).forEach(r=>{let n=String(r?.blockText||r?.content||"").trim();n&&s.includes(n)&&(s=s.replace(n,"").trimEnd())}),s.trim()}function Ac(t,e={}){let s=Array.isArray(t?.messages)?t.messages:[],o=J(e.messageId),r=J(e.swipeId);if(!o)return t?.lastAiMessage||null;let n=s.filter(i=>i.role==="assistant"),a=n.find(i=>i.sourceId!==o?!1:r?J(i.swipeId)===r:!0);return a||n.find(i=>i.sourceId===o)||null}function Na({api:t,stContext:e,character:s,conversation:o,targetAssistantMessage:r,runSource:n="MANUAL"}={}){let a=o?.messages||[],i=o?.lastUserMessage||null,l=J(r?.sourceId)||"",c=J(r?.swipeId)||"swipe:current",d=r?.content||"",u=_c(d,r?.raw||null),m=Pa(d),p=Pa(u),f=Sc(t,e,s),v=Oa(String(n||"manual").toLowerCase()),w=$a({chatId:f,messageId:l}),T=Ra({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:n,traceId:v,chatId:f,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:w,slotRevisionKey:T,slotTransactionId:Tc({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p,eventType:n,traceId:v}),executionKey:T,lastAiMessage:d,assistantContentFingerprint:m,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:r,chatMessages:a,characterCard:s,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function Nt({runSource:t="MANUAL"}={}){let e=Ao(),s=e?.getContext?.()||null,o=await Kr(),r=Da(),n=La(r),a=n?.lastAiMessage||null;return Na({api:e,stContext:s,character:o,conversation:n,targetAssistantMessage:a,runSource:t})}async function Ps({messageId:t,swipeId:e="",runSource:s="AUTO"}={}){let o=Ao(),r=o?.getContext?.()||null,n=await Kr(),a=Da(),i=La(a),l=Ac(i,{messageId:t,swipeId:e});return Na({api:o,stContext:r,character:n,conversation:i,targetAssistantMessage:l,runSource:s})}var os=O(()=>{});function Ba(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return ss()?.TavernHelper||null}function Ec(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return ss()?.SillyTavern||null}function $s(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function Hr(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(s=>{let o=t[s];Array.isArray(o)?e[s]=o.map(r=>typeof r=="string"?r:r&&typeof r=="object"?r.name||r.id||r.title||"[object]":String(r??"")):o&&typeof o=="object"?e[s]="[object]":e[s]=o}),e}return t}function Mc(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let s=[t.comment,t.key,t.keysecondary,t.text].map(o=>String(o||"").trim()).find(Boolean);return s&&s!==e?`## ${s}
${e}`:e}function Rs(){return Array.isArray(Yr)?[...Yr]:[]}function Ua(){return qr?{...qr}:null}async function kc(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return $s([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return console.warn("[ToolWorldbookService] \u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function Ic(t,e){if(t&&typeof t.getLorebooks=="function")try{let s=$s(await Promise.resolve(t.getLorebooks()));if(s.length>0)return s}catch(s){console.warn("[ToolWorldbookService] \u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}if(e&&typeof e.getWorldBooks=="function")try{let s=await Promise.resolve(e.getWorldBooks()),o=$s(Array.isArray(s)?s.map(r=>r?.name??r):[]);if(o.length>0)return o}catch(s){console.warn("[ToolWorldbookService] \u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}return[]}async function za(){let t=Ba(),e=Ec(),s={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!ss()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!ss()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{s.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?Hr(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){s.errors.push(`getLorebooks: ${a?.message||a}`)}try{s.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?Hr(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){s.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{s.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?Hr(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){s.errors.push(`getWorldBooks: ${a?.message||a}`)}let o=await kc(t),r=await Ic(t,e),n=$s([...o,...r]);return s.characterWorldbooks=[...o],s.allWorldbooks=[...r],s.combinedWorldbooks=[...n],qr=s,Yr=n,[...n]}async function ja(t){let e=$s(t?.worldbooks?.selected);if(t?.worldbooks?.enabled!==!0||e.length===0)return"";let s=Ba();if(!s||typeof s.getLorebookEntries!="function")return console.warn("[ToolWorldbookService] TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let o=[];for(let r of e)try{let n=await s.getLorebookEntries(r),i=(Array.isArray(n)?n.filter(l=>l?.enabled!==!1):[]).map(Mc).filter(Boolean).join(`

`);i&&o.push(`[\u4E16\u754C\u4E66\uFF1A${r}]
${i}`)}catch(n){console.warn(`[ToolWorldbookService] \u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${r}`,n)}return o.join(`

`)}var Yr,qr,Gr=O(()=>{os();Yr=[],qr=null});var Wa={};le(Wa,{BypassManager:()=>Eo,DEFAULT_BYPASS_PRESETS:()=>ut,addMessage:()=>zc,buildBypassMessages:()=>Hc,bypassManager:()=>j,createPreset:()=>Rc,default:()=>Yc,deleteMessage:()=>Wc,deletePreset:()=>Dc,duplicatePreset:()=>Lc,exportPresets:()=>Fc,getAllPresets:()=>Pc,getDefaultPresetId:()=>Nc,getEnabledMessages:()=>Uc,getPreset:()=>$c,getPresetList:()=>Jr,importPresets:()=>Kc,setDefaultPresetId:()=>Bc,updateMessage:()=>jc,updatePreset:()=>Oc});var dt,rs,Vr,ut,Cc,Eo,j,Pc,Jr,$c,Rc,Oc,Dc,Lc,Nc,Bc,Uc,zc,jc,Wc,Fc,Kc,Hc,Yc,Os=O(()=>{Re();me();dt="bypass_presets",rs="default_bypass_preset",Vr="current_bypass_preset",ut={},Cc=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),Eo=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=_.get(dt,{});return this._cache={...ut,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,o)=>(o.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:o,description:r,messages:n}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!o||typeof o!="string"||!o.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=s.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:o.trim(),description:r||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),P.emit(k.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...o,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,r),P.emit(k.BYPASS_PRESET_UPDATED,{presetId:e,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${o.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(ut[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=_.get(dt,{});return delete o[e],_.set(dt,o),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),P.emit(k.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,o){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(r)),id:s.trim(),name:o||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),n),P.emit(k.BYPASS_PRESET_CREATED,{presetId:s,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},n=[...o.messages||[],r];return this.updatePreset(e,{messages:n})}updateMessage(e,s,o){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=r.messages||[],a=n.findIndex(l=>l.id===s);if(a===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let i=[...n];return i[a]={...i[a],...o},this.updatePreset(e,{messages:i})}deleteMessage(e,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=o.messages||[],n=r.find(i=>i.id===s);if(!n)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=r.filter(i=>i.id!==s);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(o=>o.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=_.get(rs,null);return e==="undefined"||e==="null"||e===""?(_.remove(rs),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(_.set(rs,e),P.emit(k.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let o=this.getPreset(e);if(!o)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(o,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:o=!1}=s,r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(r)?r:r.presets?r.presets:[r];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let a=_.get(dt,{}),i=0;for(let l of n)!l.id||typeof l.id!="string"||l.name&&(ut[l.id]&&!o||!o&&a[l.id]||(a[l.id]={...l,updatedAt:Date.now()},i++));return i>0&&(_.set(dt,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let o=_.get(dt,{});o[e]=s,_.set(dt,o),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=_.get(dt,{}),s={},o=!1,r=Array.isArray(e)?e.map((n,a)=>[n?.id||n?.name||`legacy_${a}`,n]):Object.entries(e||{});for(let[n,a]of r){let i=this._normalizePreset(n,a,s);if(!i){o=!0;continue}s[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(o=!0)}o&&_.set(dt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,o={}){if(!s||typeof s!="object")return null;let r=typeof s.name=="string"?s.name.trim():"",n=typeof s.id=="string"?s.id.trim():"",a=typeof e=="string"?e.trim():"";if(!r&&a&&a!=="undefined"&&a!=="null"&&(r=a),this._isLegacySamplePreset(r,n)||(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),!n&&r&&r!=="undefined"&&r!=="null"&&(n=this._generatePresetId(r,o)),!r||!n||n==="undefined"||r==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${n}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:n,name:r,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=_.get(rs,null),o=_.get(Vr,null),r=s??o;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!e[r]&&(r=Object.values(e).find(a=>a.name===r)?.id||null),r?_.set(rs,r):_.remove(rs),_.has(Vr)&&_.remove(Vr)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Cc.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let o=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=o,n=1;for(;s[r];)r=`${o}_${n++}`;return r}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},j=new Eo,Pc=()=>j.getAllPresets(),Jr=()=>j.getPresetList(),$c=t=>j.getPreset(t),Rc=t=>j.createPreset(t),Oc=(t,e)=>j.updatePreset(t,e),Dc=t=>j.deletePreset(t),Lc=(t,e,s)=>j.duplicatePreset(t,e,s),Nc=()=>j.getDefaultPresetId(),Bc=t=>j.setDefaultPresetId(t),Uc=t=>j.getEnabledMessages(t),zc=(t,e)=>j.addMessage(t,e),jc=(t,e,s)=>j.updateMessage(t,e,s),Wc=(t,e)=>j.deleteMessage(t,e),Fc=t=>j.exportPresets(t),Kc=(t,e)=>j.importPresets(t,e),Hc=t=>j.buildBypassMessages(t),Yc=j});var Fa={};le(Fa,{DEFAULT_SETTINGS:()=>Ds,SettingsService:()=>Mo,default:()=>qc,settingsService:()=>Ce});var Ds,Xr,Mo,Ce,qc,Ls=O(()=>{Re();me();Ds={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},Xr="settings_v2",Mo=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=_.get(Xr,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),_.set(Xr,this._cache),P.emit(k.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),o=this._deepMerge(s,e);this.saveSettings(o)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Ds)),_.set(Xr,this._cache),P.emit(k.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let o=this.getSettings(),r=e.split("."),n=o;for(let a of r)if(n&&typeof n=="object"&&a in n)n=n[a];else return s;return n}set(e,s){let o=JSON.parse(JSON.stringify(this.getSettings())),r=e.split("."),n=o;for(let a=0;a<r.length-1;a+=1){let i=r[a];i in n||(n[i]={}),n=n[i]}n[r[r.length-1]]=s,this.saveSettings(o)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Ds)),e)}_deepMerge(e,s){let o={...e};for(let r in s)s[r]&&typeof s[r]=="object"&&!Array.isArray(s[r])?o[r]=this._deepMerge(e[r]||{},s[r]):o[r]=s[r];return o}},Ce=new Mo,qc=Ce});var Ha={};le(Ha,{ContextInjector:()=>Io,DEFAULT_INJECTION_OPTIONS:()=>Ka,WRITEBACK_METHODS:()=>xe,WRITEBACK_RESULT_STATUS:()=>ko,contextInjector:()=>Pe,default:()=>Zc});function Ns(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Gc(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Vc(t){try{return t?.SillyTavern?.getContext?.()||null}catch{return null}}function Jc(){let t=Gc(),e=t?.SillyTavern||null,s=Vc(t),o=e?.eventSource||t?.eventSource||s?.eventSource||null,r=e?.eventTypes||e?.event_types||s?.eventTypes||s?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:s,eventSource:o,eventTypes:r,source:e?.eventSource?"SillyTavern.eventSource":t?.eventSource?"topWindow.eventSource":s?.eventSource?"SillyTavern.getContext().eventSource":"unavailable"}}function tt(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}var Ae,ns,Ka,ko,xe,Xc,Qc,Io,Pe,Zc,Bt=O(()=>{me();Ae="YouYouToolkit_toolOutputs",ns="YouYouToolkit_injectedContext",Ka={overwrite:!0,enabled:!0};ko={SUCCESS:"success",FAILED:"failed"},xe={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Xc=60,Qc=3;Io=class{constructor(){this.debugMode=!1}async inject(e,s,o={}){return(await this.injectDetailed(e,s,o)).success}async injectDetailed(e,s,o={}){let r={...Ka,...o},n=this._createWritebackResult(e,r);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!Ns(r.sourceMessageId))return this._log("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;let a=n.chatId,i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,options:r};P.emit(k.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",traceId:r.traceId||"",sessionKey:r.sessionKey||"",options:r});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,r,n);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,e);if(o<0)return"";let r=s[o]||{},n=r[ns];if(typeof n=="string"&&n.trim())return n.trim();let a=r[Ae];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let r=(e[s]||{})[Ae];return r&&typeof r=="object"?r:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:o}=this._getChatRuntime(),r=this._findAssistantMessageIndex(o,null);return r<0?null:o[r]?.[Ae]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:o,context:r,chat:n}=this._getChatRuntime(),a=this._findAssistantMessageIndex(n,null);if(a<0)return!1;let i=n[a],l=i?.[Ae];if(!l||!l[s])return!1;delete l[s],i[Ae]=l,i[ns]=this._buildMessageInjectedContext(l);let c=r?.saveChat||o?.saveChat||null;return typeof c=="function"&&await c.call(r||o),P.emit(k.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(o){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",o),!1}}async clearAllContext(e){try{let{api:s,context:o,chat:r}=this._getChatRuntime(),n=this._findAssistantMessageIndex(r,null);if(n<0)return!1;let a=r[n];delete a[Ae],delete a[ns];let i=o?.saveChat||s?.saveChat||null;return typeof i=="function"&&await i.call(o||s),P.emit(k.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),o=Object.entries(s).map(([r,n])=>({toolId:r,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:o,totalCount:o.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,o=s?.getContext?.()||null,r=Array.isArray(o?.chat)?o.chat:[],n=Array.isArray(s?.chat)?s.chat:[],a=r.length?r:n;return{topWindow:e,api:s,context:o,chat:a,contextChat:r,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let o=xe.SET_CHAT_MESSAGE;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,effectiveSwipeId:s.effectiveSwipeId||s.sourceSwipeId||null,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:xe.NONE,commit:{preferredMethod:o,attemptedMethods:[],appliedMethod:xe.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:ko.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,o,r,n,a=null){let i=e?.contextChat?.[o]||e?.apiChat?.[o]||s?.[o]||a||null,l=this._getWritableMessageField(i).text||"",c=i?.[Ae]?.[r],d=n?l.includes(n):!0,u=!!(c&&String(c.content||"").trim()===n);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,o,r,n,a=null){let i=1,l=this._collectWritebackVerification(e,s,o,r,n,a);for(let c=0;c<Qc;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(Xc),i+=1,l=this._collectWritebackVerification(e,s,o,r,n,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,s,o,r={},n=null){let a=n||this._createWritebackResult("",r),{api:i,context:l}=e||{},c=l?.setChatMessages||i?.setChatMessages||e?.topWindow?.setChatMessages||null,d=l?.setChatMessage||i?.setChatMessage||e?.topWindow?.setChatMessage||null,u=r.replaceFullMessage!==!0;a.commit.preferredMethod=typeof d=="function"?xe.SET_CHAT_MESSAGE:typeof c=="function"?xe.SET_CHAT_MESSAGES:xe.LOCAL_ONLY;let m=!1;if(typeof d=="function"){tt(a.commit.attemptedMethods,xe.SET_CHAT_MESSAGE);try{await d.call(l||i||e?.topWindow,{message:o,mes:o,content:o,text:o},s,{swipe_id:Ns(r.sourceSwipeId||r.effectiveSwipeId)||"current",refresh:"display_and_render_current"}),a.steps.hostSetChatMessage=!0,a.hostUpdateMethod=xe.SET_CHAT_MESSAGE,a.hostCommitApplied=!0,a.commit.appliedMethod=xe.SET_CHAT_MESSAGE,a.commit.hostCommitApplied=!0,m=!0}catch(p){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",p),a.errors.push(`setChatMessage: ${p?.message||String(p)}`)}}if(!m&&typeof c=="function"){tt(a.commit.attemptedMethods,xe.SET_CHAT_MESSAGES);try{await c.call(l||i||e?.topWindow,[{message_id:Ns(r.sourceMessageId)||s,chat_index:s,message:o,mes:o,content:o,text:o}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=xe.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=xe.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,a.commit.fallbackUsed=!0,m=!0}catch(p){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",p),a.errors.push(`setChatMessages: ${p?.message||String(p)}`)}}if(m&&(a.refreshRequested=!0,tt(a.refresh.requestMethods,a.hostUpdateMethod)),u&&typeof c=="function"){tt(a.commit.attemptedMethods,"setChatMessages_refresh_assist");try{await c.call(l||i||e?.topWindow,[{message_id:Ns(r.sourceMessageId)||s,chat_index:s,message:o,mes:o,content:o,text:o}],{refresh:"affected"}),a.refreshRequested=!0,tt(a.refresh.requestMethods,"setChatMessages_refresh_assist")}catch(p){this._log("append \u5199\u56DE\u8865\u5145\u5237\u65B0\u5931\u8D25",p),a.errors.push(`setChatMessages_refresh_assist: ${p?.message||String(p)}`)}}return m||(tt(a.commit.attemptedMethods,xe.LOCAL_ONLY),a.commit.appliedMethod=xe.LOCAL_ONLY,a.commit.fallbackUsed=a.commit.preferredMethod!==xe.LOCAL_ONLY,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let o=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return o?.[1]?o[1]:"plain_text"}_stripExactStoredBlock(e,s,o=""){let r=String(e||""),n=String(s||"").trim(),a=String(o||"").trim();return n?r.includes(n)?a?{text:r.replace(n,a).trimEnd(),removed:!0,replaced:!0}:{text:r.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:r,removed:!1,replaced:!1}:{text:r,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,s,o){let{contextChat:r,apiChat:n}=e||{},a=i=>{!Array.isArray(i)||s<0||s>=i.length||i[s]!==o&&(i[s]={...i[s]||{},...o})};a(r),a(n)}_notifyMessageUpdated(e,s){try{let o=Jc(),r=o?.topWindow||e?.topWindow,n=o?.eventSource||null,a=o?.eventTypes||{},i=a.MESSAGE_UPDATED||a.message_updated||"MESSAGE_UPDATED";return n&&typeof n.emit=="function"?(n.emit(i,s),typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(()=>{n.emit(i,s)}):typeof r?.setTimeout=="function"&&r.setTimeout(()=>{n.emit(i,s)},30),{emitted:!0,source:o?.source||"unavailable",eventName:i}):{emitted:!1,source:o?.source||"unavailable",eventName:i}}catch(o){return this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",o),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let o=Array.isArray(e)?e:[];if(!o.length)return-1;let r=s!=null&&s!=="",n=(a,i)=>{if(!this._isAssistantMessage(a)||s==null||s==="")return!1;let l=String(s).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let a=o.length-1;a>=0;a-=1)if(n(o[a],a))return a;if(r)return-1;for(let a=o.length-1;a>=0;a-=1)if(this._isAssistantMessage(o[a]))return a;return-1}_buildMessageInjectedContext(e){let o=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,a])=>(n?.updatedAt||0)-(a?.updatedAt||0));if(!o.length)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,a]of o)r.push(`[${n}]`),r.push(a?.content||""),r.push("");return r.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let o of s)if(typeof e?.[o]=="string")return{key:o,text:e[o]};return{key:"mes",text:""}}_applyMessageText(e,s,o={}){let r=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],a=!1;if(n.forEach(i=>{typeof r[i]=="string"&&(r[i]=s,a=!0)}),a||(r.mes=s,r.message=s),Array.isArray(r.swipes)){let i=Number.parseInt(Ns(o?.sourceSwipeId||o?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(r.swipe_id)?r.swipe_id:Number.isInteger(r.swipeId)?r.swipeId:0;l>=0&&l<r.swipes.length&&(r.swipes[l]=s,r.swipe_id=l,r.swipeId=l)}return r}_stripExistingToolOutput(e,s=[]){let o=String(e||"");return(Array.isArray(s)?s:[]).forEach(n=>{let a=String(n||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");o=o.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",a,d)}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");o=o.replace(l,""),o=o.replace(c,"")}),o.trimEnd()}_stripPreviousStoredToolContent(e,s){let o=String(e||""),r=String(s||"").trim();return r?o.replace(r,"").trimEnd():o.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,s,o={},r=null){let n=r||this._createWritebackResult(e,o);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let c=this._findAssistantMessageIndex(l,o.sourceMessageId);if(c<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;n.messageIndex=c,n.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:m}=this._getWritableMessageField(d);n.textField=u;let p=d[Ae]&&typeof d[Ae]=="object"?d[Ae]:{},f=p?.[e]||{},v=f?.content||"",w=f?.blockText||v||"",T=Object.entries(p).filter(([Te])=>Te!==e).map(([,Te])=>Te||{}),I=String(s.content||"").trim(),E=o.replaceFullMessage===!0,K=E?"full_message":this._inferBlockType(I),q={toolId:e,messageId:o.sourceMessageId||d?.message_id||d?.messageId||c,blockType:K,insertedAt:s.updatedAt,replaceable:o.overwrite!==!1};n.blockIdentity=q;let ae=o.overwrite===!1||E?{text:String(m||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(m,w,I),M=ae.text,B="";!E&&o.overwrite!==!1&&w&&!ae.removed&&(B="previous_block_not_found");let U=o.overwrite===!1||ae.replaced||E?M:this._stripExistingToolOutput(M,o.extractionSelectors),L=U!==M;M=U;let re=o.overwrite===!1||ae.replaced||E?M:this._stripPreviousStoredToolContent(M,v),G=re!==M;M=re,n.replacedExistingBlock=E||ae.removed||L||G;let pe=o.overwrite===!1?String(m||""):M,we=E?I:ae.replaced?M.trim():[pe.trimEnd(),I].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!I;let V=T.every(Te=>{if(Te?.blockType==="full_message")return!0;let St=String(Te?.blockText||Te?.content||"").trim();return St?we.includes(St):!0});n.preservedOtherToolBlocks=V,V?B&&(n.conflictDetected=!0,n.conflictReason=B):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let ze={...p,[e]:{toolId:e,content:I,blockText:I,blockType:K,blockIdentity:q,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};d[u]=we,this._applyMessageText(d,we,o),d[Ae]=ze,d[ns]=this._buildMessageInjectedContext(ze),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,c,d),n.steps.runtimeSynced=!0,await this._requestAssistantMessageRefresh(a,c,we,o,n);let yt=i?.saveChat||a?.api?.saveChat||null,nt=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof nt=="function"&&(nt.call(i||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,tt(n.refresh.requestMethods,"saveChatDebounced")),typeof yt=="function"&&(await yt.call(i||api),n.steps.saveChat=!0,n.refreshRequested=!0,tt(n.refresh.requestMethods,"saveChat"));let Ee=this._notifyMessageUpdated(a,c);n.steps.notifiedMessageUpdated=Ee?.emitted===!0,n.refresh.eventSource=Ee?.source||"",n.refresh.eventName=Ee?.eventName||"",Ee?.error&&n.errors.push(`MESSAGE_UPDATED: ${Ee.error}`);let de=String(s.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,tt(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,tt(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let ee=await this._confirmRefresh(a,l,c,e,de,d);return n.verification.textIncludesContent=ee.textIncludesContent,n.verification.mirrorStored=ee.mirrorStored,n.verification.refreshConfirmed=ee.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(ee.confirmChecks)||0,n.refresh.confirmedBy=ee.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?ko.SUCCESS:ko.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),n}catch(a){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",a),n.error=a?.message||String(a),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let s=this._getChatRuntime(),{chat:o}=s,r=this._findAssistantMessageIndex(o,e);if(r<0)return null;let n=o[r]||null,a=this._getWritableMessageField(n).text||"",i=n?.[Ae]&&typeof n[Ae]=="object"?n[Ae]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:r,message:n,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof n?.[ns]=="string"?n[ns]:this._buildMessageInjectedContext(i)}}catch(s){return this._log("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",s),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),r=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(r)return r;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},Pe=new Io,Zc=Pe});var qa={};le(qa,{BUILTIN_VARIABLES:()=>Ya,VariableResolver:()=>Co,default:()=>ed,variableResolver:()=>Ne});var Ya,Co,Ne,ed,Bs=O(()=>{me();Ya={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Co=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let o=e;return o=this._resolveBuiltinVariables(o,s),o=this._resolveCustomVariables(o,s),o=this._resolveRegexVariables(o,s),o}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>this.resolveObject(r,s));let o={};for(let[r,n]of Object.entries(e))typeof n=="string"?o[r]=this.resolveTemplate(n,s):typeof n=="object"&&n!==null?o[r]=this.resolveObject(n,s):o[r]=n;return o}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(Ya))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,o]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof o=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},o={};for(let r of this.getAvailableVariables())o[r.category]||(o[r.category]=[]),o[r.category].push(r);for(let[r,n]of Object.entries(s))if(o[r]&&o[r].length>0){e.push(`\u3010${n}\u3011`);for(let a of o[r])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let o=e;return o=o.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),o=o.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),o=o.replace(/\{\{chatHistory\}\}/gi,()=>{let r=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(r)}),o=o.replace(/\{\{characterCard\}\}/gi,()=>{let r=s.characterCard||s.raw?.characterCard;return r?this._formatCharacterCard(r):""}),o=o.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),o=o.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),o=o.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),o=o.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),o=o.replace(/\{\{toolWorldbookContent\}\}/gi,s.toolWorldbookContent||s.raw?.toolWorldbookContent||""),o=o.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),o=o.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),o=o.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),o=o.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),o=o.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),o=o.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),o}_resolveCustomVariables(e,s){let o=e;for(let[r,n]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof n=="function"?o=o.replace(a,()=>{try{return n(s)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,i),""}}):o=o.replace(a,String(n))}return o}_resolveRegexVariables(e,s){let o=e;for(let[r,n]of this.variableHandlers){let a=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");o=o.replace(a,(i,l)=>{try{return n(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${l}:`,c),""}})}return o}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let o=s.role||"unknown",r=s.content||s.mes||"";return`[${o}]: ${r}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},Ne=new Co,ed=Ne});var Va={};le(Va,{DEFAULT_PROMPT_TEMPLATE:()=>Ga,ToolPromptService:()=>Po,default:()=>td,toolPromptService:()=>Ut});var Ga,Po,Ut,td,$o=O(()=>{me();Os();Bs();Gr();Ga="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Po=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,s={}){let o=this._getPromptTemplate(e),r=String(s?.toolWorldbookContent||s?.input?.toolWorldbookContent||await ja(e)).trim(),n=Ne.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolWorldbookContent:r}),a=Ne.resolveTemplate(o,n).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return Ne.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:r})}async buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let o=[],r=await this._buildVariableContext(e,s),n=this._getBypassMessages(e);if(n&&n.length>0)for(let i of n)i.enabled!==!1&&o.push({role:this._normalizeRole(i.role),content:Ne.resolveTemplate(i.content||"",r)});let a=this._buildUserContent(this._getPromptTemplate(e),r);return a&&o.push({role:"user",content:a}),this._log(`\u6784\u5EFA\u6D88\u606F: ${o.length} \u6761`),o}async buildPromptText(e,s){return(await this._buildVariableContext(e,s)).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Ga}_getBypassMessages(e){return e.bypass?.enabled?j.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":Ne.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},Ut=new Po,td=Ut});var Ja={};le(Ja,{LEGACY_OUTPUT_MODES:()=>sd,OUTPUT_MODES:()=>Be,TOOL_FAILURE_STAGES:()=>ue,TOOL_RUNTIME_STATUS:()=>od,TOOL_WRITEBACK_STATUS:()=>ie,ToolOutputService:()=>Oo,default:()=>rd,toolOutputService:()=>st});function Ro(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var Be,sd,od,ue,ie,Oo,st,rd,Do=O(()=>{me();Ls();Bt();$o();go();xs();Be={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},sd={inline:"follow_ai"},od={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},ue={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ie={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Oo=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Be.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===Be.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let o=Date.now(),r=e.id,n=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",i=s?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=ie.NOT_APPLICABLE,m=null,p=[],f="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),P.emit(k.TOOL_EXECUTION_STARTED,{toolId:r,traceId:n,sessionKey:a,mode:Be.POST_RESPONSE_API});try{if(d=ue.BUILD_MESSAGES,p=await this._buildToolMessages(e,s),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let v=await this._getRequestTimeout();d=ue.SEND_API_REQUEST;let w=await this._sendApiRequest(c,p,{timeoutMs:v,signal:s.signal});if(d=ue.EXTRACT_OUTPUT,f=this._extractOutputContent(w,e),f){if(d=ue.INJECT_CONTEXT,m=await Pe.injectDetailed(r,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:a}),!m?.success)throw u=ie.FAILED,new Error(m?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ie.SUCCESS}else u=ie.SKIPPED_EMPTY_OUTPUT;d="";let T=Date.now()-o;return P.emit(k.TOOL_EXECUTED,{toolId:r,traceId:n,sessionKey:a,success:!0,duration:T,mode:Be.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${T}ms`),{success:!0,toolId:r,output:f,duration:T,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:m,phases:Ro(p,f,m)}}}catch(v){let w=Date.now()-o,T=d||ue.UNKNOWN,I=u||ie.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,v),P.emit(k.TOOL_EXECUTION_FAILED,{toolId:r,traceId:n,sessionKey:a,error:v.message||String(v),duration:w}),{success:!1,toolId:r,error:v.message||String(v),duration:w,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:I,failureStage:T,writebackDetails:m,phases:Ro(p,f,m)}}}}async runToolFollowAiManual(e,s){let o=Date.now(),r=e.id,n=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",i=s?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=ie.NOT_APPLICABLE,m=null,p=[],f="";P.emit(k.TOOL_EXECUTION_STARTED,{toolId:r,traceId:n,sessionKey:a,mode:Be.FOLLOW_AI});try{if(d=ue.BUILD_MESSAGES,p=await this._buildToolMessages(e,s),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let v=await this._getRequestTimeout();d=ue.SEND_API_REQUEST;let w=await this._sendApiRequest(l,p,{timeoutMs:v,signal:s.signal});if(d=ue.EXTRACT_OUTPUT,f=this._extractOutputContent(w,e),f){if(d=ue.INJECT_CONTEXT,m=await Pe.injectDetailed(r,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:c,traceId:n,sessionKey:a}),!m?.success)throw u=ie.FAILED,new Error(m?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ie.SUCCESS}else u=ie.SKIPPED_EMPTY_OUTPUT;d="";let T=Date.now()-o;return P.emit(k.TOOL_EXECUTED,{toolId:r,traceId:n,sessionKey:a,success:!0,duration:T,mode:Be.FOLLOW_AI}),{success:!0,toolId:r,output:f,duration:T,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:m,phases:Ro(p,f,m)}}}catch(v){let w=Date.now()-o,T=d||ue.UNKNOWN,I=u||ie.NOT_APPLICABLE;return P.emit(k.TOOL_EXECUTION_FAILED,{toolId:r,traceId:n,sessionKey:a,error:v.message||String(v),duration:w,mode:Be.FOLLOW_AI}),{success:!1,toolId:r,error:v.message||String(v),duration:w,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:I,failureStage:T,writebackDetails:m,phases:Ro(p,f,m)}}}}async runToolInline(e,s){return this.runToolFollowAiManual(e,s)}async previewExtraction(e,s){return{success:!0,...this.getExtractionSnapshot(e,s)}}getExtractionSnapshot(e,s){let o=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(o,"rawText"),n=this._joinMessageBlocks(o,"filteredText"),a=this._joinMessageBlocks(o,"extractedText",{skipEmpty:!0}),i=(Array.isArray(o)?o:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(o)&&o.length>0?o[o.length-1]:null;return{sourceText:r,filteredSourceText:n,extractedText:a,extractedRawText:i,messageEntries:o,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let o=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(o,"rawText"),n=this._joinMessageBlocks(o,"filteredText"),a=this._joinMessageBlocks(o,"extractedText",{skipEmpty:!0}),i={...s,rawRecentMessagesText:r,recentMessagesText:n,extractedContent:a,toolContentMacro:this._buildToolContentMacro(o),toolName:e.name,toolId:e.id};return Ut.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,o={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:n}=o,a=null;if(e){if(!bs(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=ms(e)}else a=ms();let i=Jt(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:r,apiConfig:a},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ce.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let o=typeof e=="string"?e:String(e||""),r=this._getExtractionSelectors(s);if(!r.length)return o.trim();let n=[];for(let a of r){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...o.matchAll(d)].forEach(m=>{let p=String(m?.[0]||"").trim();p&&n.push(p)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(o.match(c)||[]).forEach(u=>{let m=String(u||"").trim();m&&n.push(m)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return n.length>0?n.join(`

`).trim():o.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(o=>String(o||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(o=>String(o||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,o={}){let r=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(s),{strict:a=!1}=o;if(!n.length)return r.trim();let i=n.map((c,d)=>{let u=String(c||"").trim(),m=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:m?"regex_include":"include",value:m?u.slice(6).trim():u,enabled:!0}}).filter(c=>c.value),l=Rt(r,i,[]);return a?(l||"").trim():l||r.trim()}_extractToolContent(e,s){let o=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(o,e,{strict:!0}):o.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let o=ct()||[],r=Ot()||[];return!Array.isArray(o)||o.length===0?s.trim():Rt(s,o,r)||s.trim()}catch(o){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",o),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let o of s)if(typeof o=="string"&&o.trim())return o.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(o=>o.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let o=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),r=Array.isArray(s?.chatMessages)?s.chatMessages:[],n=[];for(let i=r.length-1;i>=0&&n.length<o;i-=1){let l=r[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&n.unshift({text:u,message:l,chatIndex:i})}if(n.length>0)return n;let a=s?.lastAiMessage||s?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((r,n)=>{let a=r.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...r,order:n+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,s,o={}){let r=Array.isArray(e)?e:[],{skipEmpty:n=!1}=o;return r.map(i=>{let l=String(i?.[s]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(r=>{let n=`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(r?.filteredText||"").trim()||"(\u7A7A)",i=String(r?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Ce.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},st=new Oo,rd=st});function Qa(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[s,o])=>(e[s]=o===!0,e),{})}function id(t,e={}){let s=e?.direction==="unescape"?"unescape":"escape",o=Qa(e?.options);return nd.reduce((r,n)=>o[n.key]!==!0?r:s==="unescape"?r.replace(n.escaped,n.unescaped):r.replace(n.plain,n.replacement),String(t||""))}function ld(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let o=Qa(e?.options);return ad.reduce((r,n)=>o[n.key]!==!0?r:r.replace(n.from,n.to),String(t||""))}function Za(t,e){let s=t?.processor||{},o=s?.type||"",r=String(e||"");switch(o){case Xa.ESCAPE_TRANSFORM:return id(r,s);case Xa.PUNCTUATION_TRANSFORM:return ld(r,s);default:return r}}var nd,ad,Xa,ei=O(()=>{nd=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],ad=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Xa={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var No={};le(No,{abortAllTasks:()=>yd,abortTask:()=>pd,buildToolMessages:()=>oi,clearExecutionHistory:()=>hd,createExecutionContext:()=>Td,createResult:()=>Lo,enhanceMessagesWithBypass:()=>Sd,executeBatch:()=>ud,executeTool:()=>si,executeToolWithConfig:()=>ri,executeToolsBatch:()=>Ed,executorState:()=>se,extractFailed:()=>wd,extractSuccessful:()=>vd,generateTaskId:()=>zt,getExecutionHistory:()=>bd,getExecutorStatus:()=>md,getScheduler:()=>as,mergeResults:()=>xd,pauseExecutor:()=>gd,resumeExecutor:()=>fd,setMaxConcurrent:()=>dd});function Lo(t,e,s,o,r,n,a=0){return{success:s,taskId:t,toolId:e,data:o,error:r,duration:n,retries:a,timestamp:Date.now(),metadata:{}}}function zt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function cd(t,e={}){return{id:zt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function as(){return Us||(Us=new Qr(se.maxConcurrent)),Us}function dd(t){se.maxConcurrent=Math.max(1,Math.min(10,t)),Us&&(Us.maxConcurrent=se.maxConcurrent)}async function si(t,e={},s){let o=as(),r=cd(t,e);for(;se.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await o.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return ti(n),n}catch(n){let a=Lo(r.id,t,!1,null,n,Date.now()-r.createdAt,r.retries);return ti(a),a}}async function ud(t,e={}){let{failFast:s=!1,concurrency:o=se.maxConcurrent}=e,r=[],n=as(),a=n.maxConcurrent;n.maxConcurrent=o;try{let i=t.map(({toolId:l,options:c,executor:d})=>si(l,c,d));if(s)for(let l of i){let c=await l;if(r.push(c),!c.success){n.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?r.push(c.value):r.push(Lo(zt(),"unknown",!1,null,c.reason,0,0))}}finally{n.maxConcurrent=a}return r}function pd(t){return as().abort(t)}function yd(){as().abortAll(),se.executionQueue=[]}function gd(){se.isPaused=!0}function fd(){se.isPaused=!1}function md(){return{...as().getStatus(),isPaused:se.isPaused,activeControllers:se.activeControllers.size,historyCount:se.executionHistory.length}}function ti(t){se.executionHistory.push(t),se.executionHistory.length>100&&se.executionHistory.shift()}function bd(t={}){let e=[...se.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function hd(){se.executionHistory=[]}function xd(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function vd(t){return t.filter(e=>e.success).map(e=>e.data)}function wd(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Td(t={}){return{taskId:zt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function Sd(t,e){return!e||e.length===0?t:[...e,...t]}function _d(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function oi(t,e){let s=[],o=t.promptTemplate||"",r={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,a]of Object.entries(r))o=o.replace(new RegExp(_d(n),"g"),a);return s.push({role:"USER",content:o}),s}async function ri(t,e,s={}){let o=X(t);if(!o)return{success:!1,taskId:zt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!o.enabled)return{success:!1,taskId:zt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),n=zt();try{P.emit(k.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let a=oi(o,e);if(typeof s.callApi=="function"){let i=o.output?.apiPreset||o.apiPreset||"",l=i?{preset:i}:null,c=await s.callApi(a,l,s.signal),d=c;o.outputMode==="separate"&&o.extractTags?.length>0&&(d=Ad(c,o.extractTags));let u={success:!0,taskId:n,toolId:t,data:d,duration:Date.now()-r};return P.emit(k.TOOL_EXECUTED,{toolId:t,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:t,data:{messages:a,config:{apiPreset:o.output?.apiPreset||o.apiPreset||"",outputMode:o.outputMode,extractTags:o.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(a){let i={success:!1,taskId:n,toolId:t,error:a.message||String(a),duration:Date.now()-r};return P.emit(k.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:a}),i}}function Ad(t,e){let s={};for(let o of e){let r=new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"gi"),n=t.match(r);n&&(s[o]=n.map(a=>{let i=a.match(new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"i"));return i?i[1].trim():""}))}return s}async function Ed(t,e,s={}){let o=[];for(let r of t){let n=X(r);if(n&&n.enabled){let a=await ri(r,e,s);o.push(a)}}return o}var se,Qr,Us,Bo=O(()=>{wt();me();se={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Qr=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((o,r)=>{this.queue.push({executor:e,task:s,resolve:o,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:o,resolve:r,reject:n}=e,a=new AbortController;o.abortController=a,o.status="running",o.startedAt=Date.now(),this.running.set(o.id,o),se.activeControllers.set(o.id,a),this.executeTask(s,o,a.signal).then(i=>{o.status="completed",o.completedAt=Date.now(),r(i)}).catch(i=>{o.status=i.name==="AbortError"?"aborted":"failed",o.completedAt=Date.now(),n(i)}).finally(()=>{this.running.delete(o.id),se.activeControllers.delete(o.id),se.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,o){let r=Date.now(),n=null;for(let a=0;a<=s.maxRetries;a++){if(o.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(o);return Lo(s.id,s.toolId,!0,i,null,Date.now()-r,a)}catch(i){if(n=i,i.name==="AbortError")throw i;a<s.maxRetries&&(await this.delay(1e3*(a+1)),s.retries=a+1)}}throw n}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=se.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of se.activeControllers.values())e.abort();se.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Us=null});async function Md(){return Zr||(Zr=Promise.resolve().then(()=>(Bo(),No))),Zr}async function kd(t,e,s){return s&&t.output?.mode===Be.POST_RESPONSE_API?st.runToolPostResponse(t,e):s&&t.output?.mode===Be.FOLLOW_AI?st.runToolFollowAiManual(t,e):(await Md()).executeToolWithConfig(t.id,e)}function Id(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?jt.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Be.POST_RESPONSE_API?jt.MANUAL_POST_RESPONSE_API:jt.MANUAL_COMPATIBILITY:jt.MANUAL_POST_RESPONSE_API}function Uo(t,e){try{Wr(t,e)}catch(s){console.warn("[ManualTool] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}function Cd(t,e,s){let o=String(t||""),r=String(e||"").trim(),n=String(s||"").trim();return!o.trim()||!r?{nextMessageText:"",replaced:!1}:o.includes(r)?{nextMessageText:o.replace(r,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function Pd(t,e){let s=st.getExtractionSnapshot(t,e),o=s?.primaryEntry||null,r=String(o?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(o?.extractedText||s?.extractedRawText||s?.extractedText||"").trim(),a=Array.isArray(s?.selectors)?s.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!r)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:ie.NOT_APPLICABLE,failureStage:ue.EXTRACT_OUTPUT,extraction:s}};let c=String(Za(t,n)||"").trim(),d=Cd(r,n,c),u=d.replaced?d.nextMessageText:c,m=null,p=ie.NOT_APPLICABLE;if(u){if(m=await Pe.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l}),!m?.success)return{success:!1,error:m?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:ie.FAILED,failureStage:ue.INJECT_CONTEXT,writebackDetails:m,extraction:s}};p=ie.SUCCESS}else p=ie.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:m,extraction:s}}}async function $d(t,e){let s=Date.now(),o=t.id,r=`yyt-tool-run-${o}`,n=Id(t,e),a=e?.executionKey||"";Uo(o,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),be("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:r});try{let i=n===jt.MANUAL_LOCAL_TRANSFORM?await Pd(t,e):await kd(t,e,!0),l=Date.now()-s;if(i?.success){let m=X(o),p=i?.meta?.writebackDetails||{};return Uo(o,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(m?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||ie.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),x("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),be("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:r}),{success:!0,duration:l,result:i}}let c=X(o),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return Uo(o,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||ie.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(n===jt.MANUAL_COMPATIBILITY?ue.COMPATIBILITY_EXECUTE:ue.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),x("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),be("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:r}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-s,c=X(o),d=i?.message||String(i);throw Uo(o,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:ie.NOT_APPLICABLE,lastFailureStage:n===jt.MANUAL_COMPATIBILITY?ue.COMPATIBILITY_EXECUTE:ue.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),x("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),be("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:r}),i}}async function zo(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=X(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Is(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:ie.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),be("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await Nt({runSource:"MANUAL"});return $d(e,s)}async function jo(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=X(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await Nt({runSource:"MANUAL_PREVIEW"});return st.previewExtraction(e,s)}var jt,Zr,en=O(()=>{wt();Do();os();Bt();ei();ke();jt={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},Zr=null});var ni={};le(ni,{TOOL_CONFIG_PANEL_STYLES:()=>is,createToolConfigPanel:()=>Tt,default:()=>Rd});function Tt(t){let{id:e,toolId:s,postResponseHint:o,extractionPlaceholder:r,previewDialogId:n,previewTitle:a="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",toolKindLabel:i="AI \u5DE5\u5177"}=t;return{id:e,toolId:s,render(){let l=X(this.toolId);if(!l)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let c=this._getApiPresets(),d=l.output?.apiPreset||l.apiPreset||"",u=this._getBypassPresets(),m=l.output?.mode||"follow_ai",p=l.bypass?.enabled||!1,f=l.bypass?.presetId||"",v=l.runtime?.lastStatus||"idle",w=l.runtime?.lastRunAt?new Date(l.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",T=l.runtime?.lastError||"",I=l.extraction||{},E=l.automation||{},K=l.worldbooks||{},q=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:Array.isArray(K.selected)?K.selected:[],ae=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],M=String(this.worldbookFilter||"").trim().toLowerCase(),B=M?ae.filter(V=>String(V||"").toLowerCase().includes(M)):ae,U=q.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":q.length<=2?q.join("\u3001"):`\u5DF2\u9009 ${q.length} \u9879\uFF1A${q.slice(0,2).join("\u3001")} \u7B49`,L=Array.isArray(I.selectors)?I.selectors.join(`
`):"",re=m==="post_response_api"?o:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",G=m==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",pe=m==="post_response_api",we=d||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${b(l.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${b(l.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${b(G)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${b(we)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${b(v)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${y}-tool-save-top">
                  <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
                </button>
              </div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>\u8F93\u51FA\u6A21\u5F0F</span>
            </div>
            <div class="yyt-form-group">
              <label>\u8F93\u51FA\u6A21\u5F0F</label>
              <select class="yyt-select" id="${y}-tool-output-mode">
                <option value="follow_ai" ${m==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${m==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${re}${pe?" \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u4ECD\u9700\u5728\u5168\u5C40\u8BBE\u7F6E\u4E2D\u5F00\u542F\u81EA\u52A8\u5316\u3002":""}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${y}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${c.map(V=>`
                  <option value="${b(V.name)}" ${V.name===d?"selected":""}>
                    ${b(V.name)}
                  </option>
                `).join("")}
              </select>
              <div class="yyt-tool-compact-hint">\u4EC5\u5728\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u4E0B\u751F\u6548\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shield-halved"></i>
              <span>\u7834\u9650\u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${y}-tool-bypass-enabled" ${p?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${p?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${y}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${u.map(V=>`
                  <option value="${b(V.id)}" ${V.id===f?"selected":""}>
                    ${b(V.name)}${V.isDefault?" [\u9ED8\u8BA4]":""}
                  </option>
                `).join("")}
              </select>
            </div>
          </div>


          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-book-open"></i>
              <span>\u4E16\u754C\u4E66\u6CE8\u5165</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${y}-tool-worldbooks-enabled" ${K.enabled?"checked":""}>
                <span>\u542F\u7528\u4E16\u754C\u4E66\u6CE8\u5165</span>
              </label>
            </div>
            <div class="yyt-form-group">
              <label>\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66\uFF08\u53EF\u591A\u9009\uFF09</label>
              <div class="yyt-worldbook-select" id="${y}-tool-worldbook-select">
                <div class="yyt-worldbook-summary">${b(U)}</div>
                <div class="yyt-worldbook-dropdown" id="${y}-tool-worldbook-dropdown">
                  <input type="text" class="yyt-input yyt-worldbook-search" id="${y}-tool-worldbook-search" placeholder="\u641C\u7D22\u4E16\u754C\u4E66..." value="${b(this.worldbookFilter||"")}">
                  <div class="yyt-worldbook-list" id="${y}-tool-worldbooks">
                    ${ae.length>0?B.length>0?B.map(V=>`
                      <div class="yyt-worldbook-item">
                        <label class="yyt-checkbox-label">
                          <input type="checkbox" data-worldbook-name="${b(V)}" ${q.includes(V)?"checked":""}>
                          <span>${b(V)}</span>
                        </label>
                      </div>
                    `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>':`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`}
                  </div>
                  ${this.worldbookLoadState!=="ready"?`
                    <details class="yyt-worldbook-diagnostics">
                      <summary>\u67E5\u770B\u4E16\u754C\u4E66\u8BCA\u65AD</summary>
                      <pre class="yyt-preview-box yyt-preview-pre">${b(JSON.stringify(Ua()||{state:this.worldbookLoadState||"idle",message:"\u5C1A\u672A\u751F\u6210\u8BCA\u65AD\u4FE1\u606F"},null,2))}</pre>
                    </details>
                  `:""}
                </div>
              </div>
              <div class="yyt-tool-compact-hint">\u53EA\u6709\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\uFF0C\u6240\u9009\u4E16\u754C\u4E66\u5185\u5BB9\u624D\u4F1A\u6CE8\u5165\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-filter"></i>
              <span>\u63D0\u53D6\u914D\u7F6E</span>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570</label>
                <input type="number" class="yyt-input" id="${y}-tool-max-messages" min="1" max="50" value="${Number(I.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${y}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${b(r)}">${b(L)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-bolt"></i>
              <span>\u81EA\u52A8\u89E6\u53D1</span>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${y}-tool-automation-settle-ms" min="0" max="10000" step="100" value="${Number(E.settleMs)||1200}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u51B7\u5374\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${y}-tool-automation-cooldown-ms" min="0" max="60000" step="100" value="${Number(E.cooldownMs)||5e3}">
              </div>
            </div>
            <div class="yyt-tool-compact-hint">\u4E0D\u518D\u5355\u72EC\u914D\u7F6E\u5DE5\u5177\u7EA7\u5F00\u5173\u3002\u53EA\u8981\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\uFF0C\u5E76\u4E14\u5168\u5C40\u81EA\u52A8\u5316\u5F00\u542F\uFF0C\u5C31\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${y}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${y}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${b(l.promptTemplate||"")}</textarea>
              <div class="yyt-tool-compact-hint">\u8FD9\u91CC\u76F4\u63A5\u586B\u5199\u53D1\u9001\u7ED9\u989D\u5916\u89E3\u6790\u6A21\u578B\u7684\u5B8C\u6574\u6A21\u677F\uFF1B\u53EF\u5728\u6B63\u6587\u4E2D\u663E\u5F0F\u4F7F\u7528 <code>{{toolContentMacro}}</code>\u3001<code>{{toolWorldbookContent}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{userMessage}}</code> \u7B49\u5B8F\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-hand-pointer"></i>
              <span>\u624B\u52A8\u64CD\u4F5C\u533A</span>
            </div>
            <div class="yyt-tool-manual-area">
              <div class="yyt-tool-runtime-card">
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u5F53\u524D\u72B6\u6001</span>
                  <span class="yyt-tool-runtime-badge yyt-status-${b(v)}">${b(v)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${b(w)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${l.runtime?.successCount||0} / ${l.runtime?.errorCount||0}</span>
                </div>
                ${T?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${b(T)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${y}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${y}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${y}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86\u7834\u9650\u8BCD\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{toolWorldbookContent}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>
        </div>
      `},_getApiPresets(){try{return xt()||[]}catch{return[]}},_getBypassPresets(){try{return Jr()||[]}catch{return[]}},async _loadWorldbooks(){this.worldbookLoadState="loading";for(let d=0;d<10;d+=1){try{let u=await za();if(Array.isArray(u)&&u.length>0)return this.availableWorldbooks=u,this.worldbookLoadState="ready",this.availableWorldbooks}catch{this.availableWorldbooks=Rs()}d<9&&await new Promise(u=>setTimeout(u,400))}return this.availableWorldbooks=Rs(),this.worldbookLoadState="empty",this.availableWorldbooks},_getFormData(l){let c=$(),d=X(this.toolId)||{};if(!c||!D(l))return d;let u=l.find(`#${y}-tool-output-mode`).val()||"follow_ai",m=l.find(`#${y}-tool-bypass-enabled`).is(":checked"),p=u==="post_response_api",f=(l.find(`#${y}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(w=>w.trim()).filter(Boolean),v=l.find("[data-worldbook-name]:checked").map((w,T)=>String(c(T).data("worldbook-name")||"").trim()).get().filter(Boolean);return{enabled:d?.enabled!==!1,promptTemplate:l.find(`#${y}-tool-prompt-template`).val()||"",apiPreset:l.find(`#${y}-tool-api-preset`).val()||"",extractTags:f,output:{mode:u,apiPreset:l.find(`#${y}-tool-api-preset`).val()||"",overwrite:!0,enabled:p},automation:{enabled:p,settleMs:Math.max(0,parseInt(l.find(`#${y}-tool-automation-settle-ms`).val(),10)||1200),cooldownMs:Math.max(0,parseInt(l.find(`#${y}-tool-automation-cooldown-ms`).val(),10)||5e3)},bypass:{enabled:m,presetId:m&&l.find(`#${y}-tool-bypass-preset`).val()||""},worldbooks:{enabled:l.find(`#${y}-tool-worldbooks-enabled`).is(":checked"),selected:v},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(l.find(`#${y}-tool-max-messages`).val(),10)||5),selectors:f}}},_showExtractionPreview(l,c){if(!$())return;let u=`${y}-${n}`,m=Array.isArray(c.messageEntries)?c.messageEntries:[],p=m.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${m.map((f,v)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${v===m.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${m.length-v} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(f.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(f.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(f.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";l.append(Mt({id:u,title:a,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${b((c.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(c.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(c.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(c.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${p}
        `})),kt(l,u,{onSave:f=>f()}),l.find(`#${u}-save`).text("\u5173\u95ED"),l.find(`#${u}-cancel`).remove()},bindEvents(l){let c=$();if(!c||!D(l))return;let d=this,u=()=>l.find("[data-worldbook-name]:checked").map((f,v)=>String(c(v).data("worldbook-name")||"").trim()).get().filter(Boolean),m=()=>{let f=u(),v=f.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":f.length<=2?f.join("\u3001"):`\u5DF2\u9009 ${f.length} \u9879\uFF1A${f.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(v)},p=()=>{let f=String(this.worldbookFilter||"").trim().toLowerCase(),v=l.find(`#${y}-tool-worldbooks`),w=v.find(".yyt-worldbook-item"),T=0;w.each((I,E)=>{let K=c(E),q=String(K.find("[data-worldbook-name]").data("worldbook-name")||"").toLowerCase(),ae=!f||q.includes(f);K.toggleClass("yyt-hidden",!ae),ae&&(T+=1)}),v.find(".yyt-worldbook-search-empty").remove(),w.length>0&&T===0&&v.append('<div class="yyt-tool-compact-hint yyt-worldbook-empty yyt-worldbook-search-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>')};l.off(".yytToolPanel"),l.on("input.yytToolPanel",`#${y}-tool-worldbook-search`,f=>{this.worldbookFilter=String(c(f.currentTarget).val()||""),p()}),p(),l.on("change.yytToolPanel","[data-worldbook-name]",()=>{this.draftSelectedWorldbooks=u(),m()}),l.on("change.yytToolPanel",`#${y}-tool-output-mode`,()=>{let v=(l.find(`#${y}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?`${o} \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u8BB0\u5F97\u540C\u65F6\u5F00\u542F\u5168\u5C40\u81EA\u52A8\u5316\u3002`:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";l.find(".yyt-tool-mode-hint").text(v)}),l.on("change.yytToolPanel",`#${y}-tool-bypass-enabled`,f=>{let v=c(f.currentTarget).is(":checked");l.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!v)}),l.on("click.yytToolPanel",`#${y}-tool-save, #${y}-tool-save-top`,()=>{d._saveConfig(l,{silent:!1})}),l.on("click.yytToolPanel",`#${y}-tool-reset-template`,()=>{let f=ts(d.toolId);f?.promptTemplate&&(l.find(`#${y}-tool-prompt-template`).val(f.promptTemplate),x("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),l.on("click.yytToolPanel",`#${y}-tool-run-manual`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let v=await zo(d.toolId);!v?.success&&v?.error&&be("warning",v.error,{duration:3200,noticeId:`yyt-tool-run-${d.toolId}`})}catch(v){x("error",v?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{d.renderTo(l)}}),l.on("click.yytToolPanel",`#${y}-tool-preview-extraction`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let v=await jo(d.toolId);if(!v?.success){x("error",v?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}d._showExtractionPreview(l,v)}catch(v){x("error",v?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}})},_saveConfig(l,c={}){let d=this._getFormData(l),{silent:u=!1}=c,m=Le(this.toolId,d);return m&&(this.draftSelectedWorldbooks=Array.isArray(d.worldbooks?.selected)?[...d.worldbooks.selected]:[]),m?u||x("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):x("error","\u4FDD\u5B58\u5931\u8D25"),m},destroy(l){!$()||!D(l)||l.off(".yytToolPanel")},getStyles(){return is},renderTo(l){if(!$()||!D(l))return;if(this.worldbookFilter=this.worldbookFilter||"",!Array.isArray(this.draftSelectedWorldbooks)){let u=X(this.toolId);this.draftSelectedWorldbooks=Array.isArray(u?.worldbooks?.selected)?[...u.worldbooks.selected]:[]}let d=Rs();Array.isArray(d)&&d.length>0?(this.availableWorldbooks=d,this.worldbookLoadState="ready"):this.worldbookLoadState="loading",l.html(this.render({})),this.bindEvents(l,{}),this.worldbookLoadState==="loading"&&Promise.resolve(this._loadWorldbooks()).catch(()=>(this.worldbookLoadState="empty",Rs())).then(u=>{D(l)&&(this.availableWorldbooks=Array.isArray(u)?u:[],this._updateWorldbookList(l))})},_updateWorldbookList(l){if(!$()||!D(l))return;let d=String(this.worldbookFilter||"").trim().toLowerCase(),u=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],m=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:[],p=d?u.filter(w=>String(w||"").toLowerCase().includes(d)):u,f=l.find(`#${y}-tool-worldbooks`);if(!f.length)return;if(u.length===0){f.html(`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`);return}f.html(p.length>0?p.map(w=>`
        <div class="yyt-worldbook-item">
          <label class="yyt-checkbox-label">
            <input type="checkbox" data-worldbook-name="${b(w)}" ${m.includes(w)?"checked":""}>
            <span>${b(w)}</span>
          </label>
        </div>
      `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>');let v=m.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":m.length<=2?m.join("\u3001"):`\u5DF2\u9009 ${m.length} \u9879\uFF1A${m.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(v)}}}var is,Rd,Wt=O(()=>{ke();wt();Gr();ws();Os();en();is=`
  .yyt-tool-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .yyt-tool-panel-hero {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 16px;
    align-items: stretch;
    padding: 18px 20px;
    border-radius: 26px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
      radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.18), transparent 62%),
      linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.025) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 36px rgba(0, 0, 0, 0.16);
  }

  .yyt-tool-panel-hero-copy {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
  }

  .yyt-tool-panel-hero-title {
    font-size: 24px;
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -0.2px;
    color: var(--yyt-text);
  }

  .yyt-tool-panel-hero-desc {
    font-size: 13px;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.8);
    max-width: 64ch;
  }

  .yyt-tool-panel-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .yyt-tool-panel-hero-actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-left: 4px;
  }

  .yyt-tool-save-top {
    white-space: nowrap;
  }

  .yyt-tool-hero-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    border: 1px solid rgba(255, 255, 255, 0.1);
    letter-spacing: 0.38px;
    color: var(--yyt-text);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .yyt-tool-compact-hint {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.74);
    line-height: 1.7;
  }

  .yyt-hidden {
    display: none !important;
  }

  .yyt-code-textarea {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.7;
    tab-size: 2;
    color: var(--yyt-text);
    caret-color: var(--yyt-accent-strong);
    background:
      linear-gradient(180deg, rgba(7, 11, 18, 0.9) 0%, rgba(9, 13, 18, 0.72) 100%),
      rgba(3, 7, 12, 0.3);
    border-color: rgba(255, 255, 255, 0.12);
    resize: vertical;
    min-height: 180px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 22px rgba(0, 0, 0, 0.18);
  }

  .yyt-code-textarea-small {
    min-height: 108px;
  }

  .yyt-select-multiple {
    min-height: 120px;
  }

  .yyt-worldbook-select {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(12, 16, 24, 0.42);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 12px 28px rgba(0, 0, 0, 0.14);
  }

  .yyt-worldbook-summary {
    font-size: 13px;
    color: var(--yyt-text);
    line-height: 1.7;
    font-weight: 800;
  }

  .yyt-worldbook-dropdown {
    position: static;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: none;
    overflow: visible;
    opacity: 1;
    border: none;
    box-shadow: none;
    background: transparent;
  }

  .yyt-worldbook-search {
    width: 100%;
  }

  .yyt-worldbook-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 260px;
    overflow: auto;
    padding-right: 2px;
  }

  .yyt-worldbook-item {
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.06);
    transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease;
  }

  .yyt-worldbook-item:hover {
    border-color: rgba(123, 183, 255, 0.22);
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }

  .yyt-worldbook-empty {
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.035);
  }

  .yyt-code-textarea:focus {
    border-color: var(--yyt-accent);
    box-shadow: var(--yyt-focus-ring), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .yyt-title-actions {
    margin-left: auto;
  }

  .yyt-tool-manual-area {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(240px, 0.75fr);
    gap: 14px;
    align-items: start;
  }

  .yyt-tool-runtime-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 18px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(255, 255, 255, 0.01);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 22px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 30px rgba(0, 0, 0, 0.12);
  }

  .yyt-tool-runtime-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .yyt-tool-runtime-line:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .yyt-tool-runtime-label {
    color: rgba(255, 255, 255, 0.56);
    flex-shrink: 0;
    font-weight: 800;
    letter-spacing: 0.2px;
  }

  .yyt-tool-runtime-value {
    color: var(--yyt-text);
    text-align: right;
    word-break: break-word;
  }

  .yyt-tool-runtime-badge {
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.45px;
  }

  .yyt-status-idle {
    color: var(--yyt-text);
    background: rgba(255, 255, 255, 0.08);
  }

  .yyt-status-running {
    color: var(--yyt-accent-strong);
    background: rgba(123, 183, 255, 0.18);
  }

  .yyt-status-success {
    color: var(--yyt-success);
    background: rgba(74, 222, 128, 0.18);
  }

  .yyt-status-error {
    color: var(--yyt-error);
    background: rgba(255, 107, 107, 0.18);
  }

  .yyt-tool-runtime-error .yyt-tool-runtime-value {
    color: var(--yyt-error);
  }

  .yyt-tool-manual-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    padding: 18px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(255, 255, 255, 0.01);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 30px rgba(0, 0, 0, 0.12);
  }

  .yyt-preview-box {
    padding: 10px 12px;
    border-radius: var(--yyt-radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(0, 0, 0, 0.2);
    color: var(--yyt-text);
    font-size: 12px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .yyt-preview-pre {
    max-height: 220px;
    overflow: auto;
    margin: 0;
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  }

  .yyt-preview-message-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-preview-message-item {
    padding: 12px;
    border-radius: var(--yyt-radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-preview-message-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--yyt-accent);
  }

  .yyt-tool-macro-hint {
    font-size: 12px;
    color: var(--yyt-text-muted);
    line-height: 1.7;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px dashed rgba(123, 183, 255, 0.25);
    background: rgba(123, 183, 255, 0.06);
  }

  .yyt-tool-macro-hint code {
    color: var(--yyt-accent);
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  }

  .yyt-error {
    padding: 20px;
    text-align: center;
    color: var(--yyt-error);
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    border-radius: var(--yyt-radius-sm);
  }

  .yyt-panel-footer-end {
    justify-content: flex-end;
  }

  .yyt-tool-debug-panel {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.02);
  }

  .yyt-tool-debug-summary {
    cursor: pointer;
    list-style: none;
    font-size: 12px;
    font-weight: 700;
    color: var(--yyt-text-secondary);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .yyt-tool-debug-summary::-webkit-details-marker {
    display: none;
  }

  .yyt-tool-debug-summary::before {
    content: '\u25B8';
    color: var(--yyt-accent);
    transition: transform 0.18s ease;
  }

  .yyt-tool-debug-panel[open] .yyt-tool-debug-summary::before {
    transform: rotate(90deg);
  }

  .yyt-tool-debug-content {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .yyt-tool-debug-history {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 6px;
  }

  .yyt-tool-debug-history-title {
    font-size: 11px;
    font-weight: 700;
    color: var(--yyt-text-secondary);
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .yyt-tool-debug-history-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .yyt-tool-debug-history-item {
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .yyt-tool-debug-history-meta {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    font-size: 11px;
    color: var(--yyt-text-secondary);
  }

  .yyt-tool-debug-history-main {
    font-size: 12px;
    color: var(--yyt-text);
    line-height: 1.6;
    word-break: break-word;
  }

  .yyt-tool-debug-history-empty {
    font-size: 12px;
    color: var(--yyt-text-muted);
  }

  .yyt-tool-debug-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-end;
  }

  .yyt-tool-debug-chip-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .yyt-tool-debug-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: var(--yyt-text-secondary);
  }

  .yyt-tool-debug-chip-warning {
    color: var(--yyt-warning, #fbbf24);
    background: rgba(251, 191, 36, 0.12);
    border-color: rgba(251, 191, 36, 0.28);
  }

  .yyt-tool-debug-chip-ok {
    color: var(--yyt-success);
    background: rgba(74, 222, 128, 0.12);
    border-color: rgba(74, 222, 128, 0.28);
  }

  .yyt-tool-debug-content .yyt-tool-runtime-line {
    padding-top: 0;
  }

  @media screen and (max-width: 768px) {
    .yyt-tool-panel-hero {
      grid-template-columns: 1fr;
    }

    .yyt-tool-panel-hero-tags {
      justify-content: flex-start;
    }

    .yyt-tool-manual-area {
      grid-template-columns: 1fr;
    }

    .yyt-tool-manual-actions {
      min-width: 0;
    }
  }
`;Rd=Tt});var Ke,tn=O(()=>{Wt();Ke=Tt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var He,sn=O(()=>{Wt();He=Tt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var Ye,on=O(()=>{Wt();Ye=Tt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});function ai(t=[],e={}){return t.map(s=>({...s,checked:e?.[s.key]===!0}))}function Wo(t){let{id:e,toolId:s,previewDialogId:o,previewTitle:r="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:a=[],heroHint:i="",extractionPlaceholder:l=""}=t;return{id:e,toolId:s,render(){let c=X(this.toolId);if(!c)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let d=c.processor||{},u=c.extraction||{},m=c.runtime?.lastStatus||"idle",p=c.runtime?.lastRunAt?new Date(c.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",f=c.runtime?.lastError||"",v=Array.isArray(u.selectors)?u.selectors.join(`
`):"",w=c.output?.overwrite!==!1,T=ai(n,{[d.direction||n[0]?.key||""]:!0}),I=ai(a,d.options||{});return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${b(c.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${b(c.description||"")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u672C\u5730\u811A\u672C\u5904\u7406</span>
              <span class="yyt-tool-hero-chip">\u5199\u56DE ${w?"\u8986\u76D6":"\u8FFD\u52A0"}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${b(m)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${y}-tool-save-top">
                  <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
                </button>
              </div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-toggle-on"></i>
              <span>\u542F\u7528\u72B6\u6001</span>
            </div>
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${y}-tool-enabled" ${c.enabled!==!1?"checked":""}>
              <span>\u542F\u7528\u8BE5\u5DE5\u5177</span>
            </label>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-filter"></i>
              <span>\u63D0\u53D6\u914D\u7F6E</span>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570</label>
                <input type="number" class="yyt-input" id="${y}-tool-max-messages" min="1" max="50" value="${Number(u.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${y}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${b(l)}">${b(v)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u5B9A\u4F4D\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u5B9A\u4F4D\u3002\u624B\u52A8\u6267\u884C\u4F1A\u57FA\u4E8E\u6700\u65B0 AI \u6D88\u606F\u5168\u6587\u539F\u4F4D\u66FF\u6362\uFF0C\u5C3D\u91CF\u4FDD\u7559\u5916\u5C42\u6807\u7B7E\u548C\u5176\u4F59\u539F\u6587\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shuffle"></i>
              <span>\u6267\u884C\u79CD\u7C7B</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              ${T.map(E=>`
                <label class="yyt-local-choice-card">
                  <div class="yyt-checkbox-label">
                    <input type="radio" name="${y}-processor-direction-${this.toolId}" value="${b(E.key)}" ${E.checked?"checked":""}>
                    <span>${b(E.label)}</span>
                  </div>
                  <div class="yyt-local-choice-desc">${b(E.description||"")}</div>
                </label>
              `).join("")}
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-list-check"></i>
              <span>\u5904\u7406\u9879</span>
            </div>
            <div class="yyt-local-option-grid">
              ${I.map(E=>`
                <div class="yyt-local-option-card">
                  <label class="yyt-checkbox-label">
                    <span>${b(E.label)}</span>
                    <input type="checkbox" data-option-key="${b(E.key)}" ${E.checked?"checked":""}>
                  </label>
                  <div class="yyt-tool-compact-hint">${b(E.description||"")}</div>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-pen-to-square"></i>
              <span>\u5199\u56DE\u65B9\u5F0F</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${y}-output-mode-${this.toolId}" value="replace" ${w?"checked":""}>
                  <span>\u8986\u76D6\u539F\u5DE5\u5177\u5757</span>
                </div>
                <div class="yyt-local-choice-desc">\u4F18\u5148\u66FF\u6362\u8BE5\u5DE5\u5177\u6B64\u524D\u5199\u5165\u7684\u5185\u5BB9\u3002</div>
              </label>
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${y}-output-mode-${this.toolId}" value="append" ${w?"":"checked"}>
                  <span>\u8FFD\u52A0\u5230\u672B\u5C3E</span>
                </div>
                <div class="yyt-local-choice-desc">\u4FDD\u7559\u539F\u6587\uFF0C\u5E76\u628A\u5904\u7406\u7ED3\u679C\u9644\u52A0\u5230\u5F53\u524D\u6D88\u606F\u672B\u5C3E\u3002</div>
              </label>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-hand-pointer"></i>
              <span>\u624B\u52A8\u64CD\u4F5C\u533A</span>
            </div>
            <div class="yyt-tool-manual-area">
              <div class="yyt-tool-runtime-card">
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u5F53\u524D\u72B6\u6001</span>
                  <span class="yyt-tool-runtime-badge yyt-status-${b(m)}">${b(m)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${b(p)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${c.runtime?.successCount||0} / ${c.runtime?.errorCount||0}</span>
                </div>
                ${f?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${b(f)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${y}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${y}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">${b(i||"\u4FDD\u5B58\u540E\u53EF\u76F4\u63A5\u5BF9\u6700\u8FD1 AI \u6D88\u606F\u505A\u672C\u5730\u6587\u672C\u5904\u7406\u3002")}</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${y}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      `},_getFormData(c){let d=$(),u=X(this.toolId)||{};if(!d||!D(c))return u;let m=(c.find(`#${y}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(w=>w.trim()).filter(Boolean),p=c.find(`input[name="${y}-processor-direction-${this.toolId}"]:checked`).val()||n[0]?.key||"",f=c.find(`input[name="${y}-output-mode-${this.toolId}"]:checked`).val()||"replace",v={};return c.find("[data-option-key]").each((w,T)=>{let I=d(T);v[I.data("option-key")]=I.is(":checked")}),{enabled:c.find(`#${y}-tool-enabled`).is(":checked"),extractTags:m,output:{...u.output||{},mode:"local_transform",overwrite:f!=="append",enabled:!0},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(c.find(`#${y}-tool-max-messages`).val(),10)||5),selectors:m},processor:{...u.processor||{},direction:p,options:v},runtime:{...u.runtime||{}}}},_showExtractionPreview(c,d){if(!$())return;let m=`${y}-${o}`,p=Array.isArray(d.messageEntries)?d.messageEntries:[],f=p.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${p.map((v,w)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${w===p.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${p.length-w} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(v.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(v.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(v.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";c.append(Mt({id:m,title:r,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${b((d.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(d.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(d.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(d.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${f}
        `})),kt(c,m,{onSave:v=>v()}),c.find(`#${m}-save`).text("\u5173\u95ED"),c.find(`#${m}-cancel`).remove()},bindEvents(c){if(!$()||!D(c))return;let u=this;c.off(".yytLocalToolPanel"),c.on("click.yytLocalToolPanel",`#${y}-tool-save, #${y}-tool-save-top`,()=>{u._saveConfig(c,{silent:!1})}),c.on("click.yytLocalToolPanel",`#${y}-tool-run-manual`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let p=await zo(u.toolId);!p?.success&&p?.error&&be("warning",p.error,{duration:3200,noticeId:`yyt-tool-run-${u.toolId}`})}catch(p){x("error",p?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{u.renderTo(c)}}),c.on("click.yytLocalToolPanel",`#${y}-tool-preview-extraction`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let p=await jo(u.toolId);if(!p?.success){x("error",p?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}u._showExtractionPreview(c,p)}catch(p){x("error",p?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),c.on("click.yytLocalToolPanel",`#${y}-tool-reset-template`,()=>{let m=ts(u.toolId);m?.promptTemplate&&(c.find(`#${y}-tool-prompt-template`).val(m.promptTemplate),x("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))})},_saveConfig(c,d={}){let u=this._getFormData(c),{silent:m=!1}=d,p=Le(this.toolId,u);return p?m||x("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):x("error","\u4FDD\u5B58\u5931\u8D25"),p},destroy(c){!$()||!D(c)||c.off(".yytLocalToolPanel")},getStyles(){return Od},renderTo(c){c.html(this.render({})),this.bindEvents(c,{})}}}var Od,rn=O(()=>{ke();wt();en();Wt();Od=`${is}
  .yyt-local-option-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 10px;
  }

  .yyt-local-option-card {
    padding: 12px 13px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.025) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  }

  .yyt-local-option-card:hover {
    border-color: rgba(255, 255, 255, 0.18);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 24px rgba(0, 0, 0, 0.12);
  }

  .yyt-local-option-card .yyt-checkbox-label {
    justify-content: space-between;
  }

  .yyt-local-output-mode-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
  }

  .yyt-local-choice-card {
    padding: 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.025) 100%);
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  }

  .yyt-local-choice-card:hover {
    border-color: rgba(255, 255, 255, 0.18);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 24px rgba(0, 0, 0, 0.12);
  }

  .yyt-local-choice-card .yyt-checkbox-label {
    align-items: flex-start;
  }

  .yyt-local-choice-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--yyt-text);
  }

  .yyt-local-choice-desc {
    font-size: 12px;
    line-height: 1.6;
    color: var(--yyt-text-secondary);
  }
`});var qe,nn=O(()=>{rn();qe=Wo({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]})});var Ge,an=O(()=>{rn();Ge=Wo({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]})});var Ft,ln=O(()=>{me();Os();ke();Ft={id:"bypassPanel",render(t){let e=j.getPresetList(),s=j.getDefaultPresetId();return`
      <div class="yyt-bypass-panel">
        <!-- \u5DE6\u4FA7\u9884\u8BBE\u5217\u8868 -->
        <div class="yyt-bypass-sidebar">
          <div class="yyt-bypass-sidebar-header">
            <span class="yyt-bypass-sidebar-title">\u7834\u9650\u8BCD\u9884\u8BBE</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="yyt-bypass-add">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="yyt-bypass-preset-list">
            ${e.map(o=>this._renderPresetItem(o,o.id===s)).join("")}
          </div>
          <div class="yyt-bypass-sidebar-footer">
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-import" title="\u5BFC\u5165">
              <i class="fa-solid fa-file-import"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-export" title="\u5BFC\u51FA\u5168\u90E8">
              <i class="fa-solid fa-file-export"></i>
            </button>
            <input type="file" id="yyt-bypass-import-file" accept=".json" style="display:none">
          </div>
        </div>
        
        <!-- \u53F3\u4FA7\u7F16\u8F91\u533A -->
        <div class="yyt-bypass-editor" id="yyt-bypass-editor">
          <div class="yyt-bypass-empty">
            <i class="fa-solid fa-shield-halved"></i>
            <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t,e){let s=ut&&ut[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${b(t.name)}</span>
          <span class="yyt-bypass-preset-count">${t.messages?.length||0} \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-bypass-preset-actions">
          ${e?'<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>':""}
          ${s?"":`
            <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-quick-delete" title="\u5220\u9664\u9884\u8BBE" data-preset-id="${t.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          `}
        </div>
      </div>
    `},_renderEditor(t){if(!t)return`
        <div class="yyt-bypass-empty">
          <i class="fa-solid fa-shield-halved"></i>
          <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
        </div>
      `;let e=j.getDefaultPresetId()===t.id,s=ut&&ut[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${b(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-bypass-editor-actions">
            ${s?"":`
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-duplicate" title="\u590D\u5236">
                <i class="fa-solid fa-copy"></i>
              </button>
              <button class="yyt-btn yyt-btn-small yyt-btn-danger" id="yyt-bypass-delete" title="\u5220\u9664">
                <i class="fa-solid fa-trash"></i>
              </button>
            `}
            <button class="yyt-btn yyt-btn-small ${e?"yyt-btn-primary":"yyt-btn-secondary"}" 
                    id="yyt-bypass-set-default" title="\u8BBE\u4E3A\u9ED8\u8BA4">
              <i class="fa-solid fa-star"></i>
            </button>
          </div>
        </div>
        
        <div class="yyt-bypass-editor-desc">
          <input type="text" class="yyt-input" id="yyt-bypass-description" 
                 value="${b(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(t.messages||[]).map(o=>this._renderMessageItem(o)).join("")}
        </div>
        
        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
    `},_renderMessageItem(t){let e={SYSTEM:"fa-server",USER:"fa-user",assistant:"fa-robot"};return`
      <div class="yyt-bypass-message ${t.enabled===!1?"yyt-disabled":""}" data-message-id="${t.id}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${e[t.role]||"fa-comment"}"></i>
            <select class="yyt-select yyt-bypass-role-select">
              <option value="SYSTEM" ${t.role==="SYSTEM"?"selected":""}>SYSTEM</option>
              <option value="USER" ${t.role==="USER"?"selected":""}>USER</option>
              <option value="assistant" ${t.role==="assistant"?"selected":""}>assistant</option>
            </select>
          </div>
          <div class="yyt-bypass-message-controls">
            <label class="yyt-toggle yyt-small">
              <input type="checkbox" class="yyt-bypass-message-enabled" ${t.enabled!==!1?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
            ${t.deletable!==!1?`
              <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-delete-message" title="\u5220\u9664">
                <i class="fa-solid fa-times"></i>
              </button>
            `:""}
          </div>
        </div>
        <textarea class="yyt-textarea yyt-bypass-message-content" rows="3" 
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${b(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=$();!s||!D(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let o=e(s.currentTarget).data("presetId");this._selectPreset(t,e,o)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let o=e(s.currentTarget).data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=j.deletePreset(o);r.success?(t.find(".yyt-bypass-editor-content").data("presetId")===o&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),x("success","\u9884\u8BBE\u5DF2\u5220\u9664")):x("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let o=e(s.currentTarget).closest(".yyt-bypass-message"),r=o.data("messageId");o.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let o=s.target.files[0];if(o){try{let r=await lt(o),n=j.importPresets(r);x(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(r){x("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=j.exportPresets();it(s,`bypass_presets_${Date.now()}.json`),x("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){x("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let o=j.getPreset(s);o&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(o)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,o=j.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});o.success?(this.renderTo(t),this._selectPreset(t,e,s),x("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):x("error",o?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),o=s.data("presetId");if(!o)return;let r=s.find(".yyt-bypass-name-input").val().trim(),n=s.find("#yyt-bypass-description").val().trim();if(!r){x("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let a=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let i=j.updatePreset(o,{name:r,description:n,messages:a});i.success?(x("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):x("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let o=t.find(".yyt-bypass-editor-content").data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=j.deletePreset(o);r.success?(this.renderTo(t),x("success","\u9884\u8BBE\u5DF2\u5220\u9664")):x("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let o=t.find(".yyt-bypass-editor-content").data("presetId");if(!o)return;let r=`bypass_${Date.now()}`,n=j.duplicatePreset(o,r);n.success?(this.renderTo(t),this._selectPreset(t,e,r),x("success","\u9884\u8BBE\u5DF2\u590D\u5236")):x("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let o=t.find(".yyt-bypass-editor-content").data("presetId");o&&(j.setDefaultPresetId(o),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),x("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(o))},_refreshPresetList(t,e){let s=j.getPresetList(),o=j.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(r=>this._renderPresetItem(r,r.id===o)).join(""))},destroy(t){!$()||!D(t)||t.off()},getStyles(){return`
      /* \u7834\u9650\u8BCD\u9762\u677F\u6837\u5F0F */
      .yyt-bypass-panel {
        display: flex;
        height: 100%;
        gap: 16px;
      }
      
      .yyt-bypass-sidebar {
        width: 220px;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 12px;
        flex-shrink: 0;
      }
      
      .yyt-bypass-sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-sidebar-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-preset-list {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
      }
      
      .yyt-bypass-preset-item {
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      
      .yyt-bypass-preset-item:hover {
        background: rgba(255, 255, 255, 0.04);
      }
      
      .yyt-bypass-preset-item.yyt-active {
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-bypass-preset-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        min-width: 0;
      }
      
      .yyt-bypass-preset-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
        opacity: 0.5;
        transition: opacity 0.2s ease;
      }
      
      .yyt-bypass-preset-item:hover .yyt-bypass-preset-actions {
        opacity: 1;
      }
      
      .yyt-bypass-quick-delete {
        padding: 4px 8px !important;
        font-size: 10px !important;
      }
      
      .yyt-bypass-preset-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-preset-count {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }
      
      .yyt-bypass-default-badge {
        font-size: 10px;
        padding: 2px 6px;
        background: rgba(123, 183, 255, 0.15);
        color: var(--yyt-accent);
        border-radius: 4px;
        margin-top: 4px;
        display: inline-block;
      }
      
      .yyt-bypass-sidebar-footer {
        display: flex;
        gap: 8px;
        padding: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-sidebar-footer .yyt-btn {
        flex: 1;
      }
      
      .yyt-bypass-editor {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 12px;
        overflow: hidden;
      }
      
      .yyt-bypass-empty {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--yyt-text-muted);
      }
      
      .yyt-bypass-empty i {
        font-size: 48px;
        margin-bottom: 16px;
        opacity: 0.3;
      }
      
      .yyt-bypass-editor-content {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .yyt-bypass-editor-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-editor-title {
        flex: 1;
        margin-right: 16px;
      }
      
      .yyt-bypass-name-input {
        font-size: 15px;
        font-weight: 600;
        background: transparent;
        border: none;
        padding: 8px 0;
      }
      
      .yyt-bypass-name-input:focus {
        border-bottom: 1px solid var(--yyt-accent);
      }
      
      .yyt-bypass-editor-actions {
        display: flex;
        gap: 8px;
      }
      
      .yyt-bypass-editor-desc {
        padding: 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-messages-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .yyt-bypass-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .yyt-bypass-message {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 14px;
      }
      
      .yyt-bypass-message.yyt-disabled {
        opacity: 0.5;
      }
      
      .yyt-bypass-message-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      
      .yyt-bypass-message-role {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-bypass-message-role i {
        color: var(--yyt-accent);
      }
      
      .yyt-bypass-role-select {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        padding: 4px 8px;
        font-size: 12px;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-message-controls {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-bypass-message-content {
        min-height: 80px;
      }
      
      .yyt-bypass-editor-footer {
        padding: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        justify-content: flex-end;
      }
      
      .yyt-toggle.yyt-small {
        transform: scale(0.8);
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var ui={};le(ui,{SettingsPanel:()=>pt,applyTheme:()=>di,applyUiPreferences:()=>cn,default:()=>Ld});function ls({id:t,checked:e=!1,title:s="",hint:o=""}){return`
    <div class="yyt-toggle-row">
      <div class="yyt-toggle-label">
        <span>${s}</span>
        ${o?`<span class="yyt-toggle-hint">${o}</span>`:""}
      </div>
      <label class="yyt-toggle">
        <input type="checkbox" id="${t}" ${e?"checked":""}>
        <span class="yyt-toggle-slider"></span>
      </label>
    </div>
  `}function li(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function zs(){return li()?.document||document}function ci(t=zs()){return t?.documentElement||document.documentElement}function di(t,e=zs()){let s=ci(e),o={...Dd,...ii[t]||ii["dark-blue"]};Object.entries(o).forEach(([r,n])=>{s.style.setProperty(r,n)}),s.setAttribute("data-yyt-theme",t)}function cn(t={},e=zs()){let s=ci(e),{theme:o="dark-blue",compactMode:r=!1,animationEnabled:n=!0}=t||{};di(o,e),s.classList.toggle("yyt-compact-mode",!!r),s.classList.toggle("yyt-no-animation",!n)}var Dd,ii,pt,Ld,Fo=O(()=>{me();Ls();Bs();ke();Dd={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-2":"rgba(255, 255, 255, 0.05)","--yyt-surface-3":"rgba(255, 255, 255, 0.075)","--yyt-surface-hover":"rgba(255, 255, 255, 0.08)","--yyt-surface-active":"rgba(255, 255, 255, 0.11)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-soft":"rgba(255, 255, 255, 0.05)","--yyt-border-strong":"rgba(255, 255, 255, 0.16)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.72)","--yyt-text-muted":"rgba(255, 255, 255, 0.5)","--yyt-focus-ring":"0 0 0 3px rgba(123, 183, 255, 0.18)","--yyt-on-accent":"#0b0f15"},ii={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.72)","--yyt-text-muted":"rgba(15, 23, 42, 0.52)","--yyt-surface":"rgba(255, 255, 255, 0.66)","--yyt-surface-2":"rgba(255, 255, 255, 0.86)","--yyt-surface-3":"rgba(255, 255, 255, 0.94)","--yyt-surface-hover":"rgba(255, 255, 255, 0.92)","--yyt-surface-active":"rgba(255, 255, 255, 0.98)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.05)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 3px rgba(59, 130, 246, 0.14)","--yyt-on-accent":"#0f172a"}};pt={id:"settingsPanel",render(){let t=Ce.getSettings(),e=t.debug?.enableDebugLog===!0,s=t.automation?.enabled===!0,o=this._getAutomationRuntime();return`
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">\u5168\u5C40\u504F\u597D\u4E0E\u8FD0\u884C\u7B56\u7565</div>
            <div class="yyt-settings-hero-desc">\u7EDF\u4E00\u7BA1\u7406\u6267\u884C\u5668\u3001\u81EA\u52A8\u5316\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u8BBE\u7F6E\uFF0C\u8BA9\u5DE5\u5177\u94FE\u884C\u4E3A\u4E0E\u754C\u9762\u4F53\u9A8C\u4FDD\u6301\u4E00\u81F4\u3002</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${s?"is-on":"is-off"}">\u81EA\u52A8\u5316 ${s?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip ${e?"is-on":"is-off"}">\u8C03\u8BD5 ${e?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip is-neutral">\u4E3B\u9898 ${t.ui?.theme||"dark-blue"}</span>
          </div>
        </div>

        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> \u6267\u884C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="automation">
            <i class="fa-solid fa-bolt"></i> \u81EA\u52A8\u5316
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> \u8C03\u8BD5
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> \u5916\u89C2
          </button>
        </div>

        <div class="yyt-settings-content">
          ${this._renderExecutorTab(t.executor)}
          ${this._renderAutomationTab(t.automation,o)}
          ${this._renderDebugTab(t.debug)}
          ${this._renderUiTab(t.ui)}
        </div>

        <div class="yyt-settings-footer">
          <button class="yyt-btn yyt-btn-secondary" id="yyt-settings-reset">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u4E3A\u9ED8\u8BA4
          </button>
          <button class="yyt-btn yyt-btn-primary" id="yyt-settings-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u8BBE\u7F6E
          </button>
        </div>
      </div>
    `},_renderExecutorTab(t){return`
      <div class="yyt-settings-tab-content yyt-active" data-tab="executor">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5E76\u53D1\u63A7\u5236</div>
          <div class="yyt-form-group">
            <label>\u6700\u5927\u5E76\u53D1\u6570</label>
            <div class="yyt-form-hint">\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650</div>
            <input type="number" class="yyt-input" id="yyt-setting-maxConcurrent"
                   value="${t.maxConcurrent}" min="1" max="10">
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u91CD\u8BD5\u7B56\u7565</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6700\u5927\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-setting-maxRetries"
                     value="${t.maxRetries}" min="0" max="10">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u95F4\u9694 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-retryDelayMs"
                     value="${t.retryDelayMs}" min="1000" max="60000" step="1000">
            </div>
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u8D85\u65F6\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u5355\u4E2A\u8BF7\u6C42\u7684\u8D85\u65F6\u65F6\u95F4\uFF0C\u8D85\u8FC7\u5C06\u81EA\u52A8\u4E2D\u65AD</div>
            <input type="number" class="yyt-input" id="yyt-setting-requestTimeoutMs"
                   value="${t.requestTimeoutMs}" min="10000" max="300000" step="10000">
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u961F\u5217\u7B56\u7565</div>
          <div class="yyt-form-group">
            <label>\u961F\u5217\u5904\u7406\u65B9\u5F0F</label>
            <select class="yyt-select" id="yyt-setting-queueStrategy">
              <option value="fifo" ${t.queueStrategy==="fifo"?"selected":""}>FIFO (\u5148\u8FDB\u5148\u51FA)</option>
              <option value="lifo" ${t.queueStrategy==="lifo"?"selected":""}>LIFO (\u540E\u8FDB\u5148\u51FA)</option>
              <option value="priority" ${t.queueStrategy==="priority"?"selected":""}>\u4F18\u5148\u7EA7\u6392\u5E8F</option>
            </select>
          </div>
        </div>
      </div>
    `},_renderAutomationTab(t={},e=null){let s=t.enabled===!0,o=Array.isArray(e?.recentTransactions)?e.recentTransactions.slice().reverse():[],r=e?.hostBinding||{},n=Array.isArray(r.eventBindings)&&r.eventBindings.length>0?r.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",a=o.length>0?o.map(i=>{let l=i?.results?.[0]?.meta?.writebackDetails?.refresh||{},c=Array.isArray(l?.requestMethods)?l.requestMethods.join(" / "):"",d=l?.eventSource||l?.eventName||c||l?.confirmedBy;return`
          <div class="yyt-settings-runtime-item">
            <div class="yyt-settings-runtime-meta">
              <span>${i?.sourceEvent||"UNKNOWN_EVENT"}</span>
              <span>${i?.phase||"unknown"}</span>
              <span>${i?.messageId||"no_message_id"}</span>
            </div>
            <div class="yyt-settings-runtime-main">${i?.verdict||i?.error||i?.generationKey||"\u65E0\u989D\u5916\u4FE1\u606F"}</div>
            ${d?`<div class="yyt-form-hint">\u5237\u65B0\uFF1A<code>${l?.eventSource||"unavailable"}</code> / <code>${l?.eventName||"MESSAGE_UPDATED"}</code>\uFF1B\u8BF7\u6C42\uFF1A<code>${c||"none"}</code>\uFF1B\u786E\u8BA4\uFF1A<code>${l?.confirmed?l?.confirmedBy||"success":"pending_or_failed"}</code>\uFF1B\u68C0\u67E5\uFF1A<code>${l?.confirmChecks||0}</code></div>`:""}
          </div>
        `}).join(""):'<div class="yyt-form-hint">\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002</div>';return`
      <div class="yyt-settings-tab-content" data-tab="automation">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u81EA\u52A8\u89E6\u53D1\u603B\u5F00\u5173</div>
          <div class="yyt-form-group">
            ${ls({id:"yyt-setting-automationEnabled",checked:t.enabled,title:"\u542F\u7528\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1",hint:"\u8FD9\u91CC\u53EA\u4FDD\u7559\u4E00\u4E2A\u5168\u5C40\u5F00\u5173\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u5904\u4E8E\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u7684\u5DE5\u5177\u90FD\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\u3002"})}
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationSettleMs"
                     value="${t.settleMs||1200}" min="0" max="10000" step="100">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationCooldownMs"
                     value="${t.cooldownMs||5e3}" min="0" max="60000" step="100">
            </div>
          </div>
          <div class="yyt-form-hint">\u5F53\u524D\u72B6\u6001\uFF1A${s?"\u5DF2\u542F\u7528":"\u672A\u542F\u7528"}\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u5DE5\u5177\u90FD\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u81EA\u52A8\u5316\u8BCA\u65AD</div>
          <div class="yyt-settings-runtime-grid">
            <div class="yyt-settings-runtime-chip ${e?.enabled?"is-on":"is-off"}">\u670D\u52A1 ${e?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528"}</div>
            <div class="yyt-settings-runtime-chip ${r.initialized?"is-on":"is-off"}">\u76D1\u542C ${r.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A"}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u5F85\u5904\u7406 ${e?.pendingTimerCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u6392\u961F\u69FD\u4F4D ${e?.queuedSlotCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u4E8B\u52A1 ${o.length}</div>
          </div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u6E90\uFF1A<code>${r.source||"unavailable"}</code>\uFF1B\u6700\u8FD1\u521D\u59CB\u5316\uFF1A<code>${r.lastInitResult||"idle"}</code>\uFF1B\u5C1D\u8BD5\u6B21\u6570\uFF1A<code>${r.initAttempts||0}</code>\u3002</div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u7ED1\u5B9A\uFF1A<code>${n}</code></div>
          ${r.lastError?`<div class="yyt-form-hint">\u6700\u8FD1\u9519\u8BEF\uFF1A<code>${r.lastError}</code></div>`:""}
          ${r.retryScheduled?`<div class="yyt-form-hint">\u5DF2\u5B89\u6392\u91CD\u8BD5\uFF1A<code>${r.retryDelayMs||0}ms</code></div>`:""}
          <div class="yyt-form-hint">\u82E5\u81EA\u52A8\u89E6\u53D1\u5931\u8D25\uFF0C\u4F18\u5148\u770B\u6700\u8FD1\u4E8B\u52A1\u7684 verdict\uFF0C\u4F8B\u5982 <code>automation_disabled</code>\u3001<code>no_auto_tools</code>\u3001<code>assistant_message_not_found</code>\u3002</div>
          <div class="yyt-settings-runtime-list">${a}</div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            ${ls({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F"})}
          </div>

          <div class="yyt-form-group">
            ${ls({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${ls({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
          </div>
        </div>
      </div>
    `},_renderUiTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="ui">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5916\u89C2\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u4E3B\u9898</label>
            <select class="yyt-select" id="yyt-setting-theme">
              <option value="dark-blue" ${t.theme==="dark-blue"?"selected":""}>\u6DF1\u84DD</option>
              <option value="dark-purple" ${t.theme==="dark-purple"?"selected":""}>\u6DF1\u7D2B</option>
              <option value="dark-green" ${t.theme==="dark-green"?"selected":""}>\u6DF1\u7EFF</option>
              <option value="light" ${t.theme==="light"?"selected":""}>\u6D45\u8272</option>
            </select>
          </div>

          <div class="yyt-form-group">
            ${ls({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${ls({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u6A21\u677F\u5B8F\u8BF4\u660E</div>
          <div class="yyt-form-hint">\u5DE5\u5177\u6A21\u677F\u91CC\u53EF\u76F4\u63A5\u4F7F\u7528\u4E0B\u9762\u8FD9\u4E9B\u5B8F\u3002\u4E16\u754C\u4E66\u5185\u5BB9\u53EA\u6709\u5728\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\u624D\u4F1A\u6CE8\u5165\u3002</div>
          <div class="yyt-settings-macro-list">
            ${this._renderMacroList()}
          </div>
        </div>
      </div>
    `},_renderMacroList(){return Ne.getAvailableVariables().map(t=>`
        <div class="yyt-settings-macro-item">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=$();if(!e||!D(t))return;let s=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let r=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${r}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{s._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ce.resetSettings(),cn(Ds.ui,zs()),s.renderTo(t),x("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))})},_saveSettings(t){let e={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{enabled:t.find("#yyt-setting-automationEnabled").is(":checked"),settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Ce.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ce.saveSettings(e),cn(e.ui,zs()),x("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return li()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!$()||!D(t)||t.off(".yytSettings")},getStyles(){return`
      /* \u8BBE\u7F6E\u9762\u677F\u6837\u5F0F */
      .yyt-settings-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 14px;
      }

      .yyt-settings-hero {
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 18px 20px;
        border-radius: 26px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background:
          radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.16), transparent 62%),
          linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.025) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 36px rgba(0, 0, 0, 0.16);
      }

      .yyt-settings-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }

      .yyt-settings-hero-title {
        font-size: 26px;
        font-weight: 900;
        line-height: 1.05;
        letter-spacing: -0.3px;
        color: var(--yyt-text);
      }

      .yyt-settings-hero-desc {
        font-size: 13px;
        line-height: 1.75;
        color: rgba(255, 255, 255, 0.8);
        max-width: 62ch;
      }

      .yyt-settings-hero-status {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-end;
      }

      .yyt-settings-status-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 800;
        border: 1px solid rgba(255, 255, 255, 0.12);
        letter-spacing: 0.4px;
        color: var(--yyt-text);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .yyt-settings-status-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.32);
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.16) 0%, rgba(74, 222, 128, 0.07) 100%);
      }

      .yyt-settings-status-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.32);
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.16) 0%, rgba(248, 113, 113, 0.07) 100%);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-tabs {
        display: flex;
        gap: 8px;
        padding: 7px;
        border-radius: 22px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.055) 0%, rgba(255, 255, 255, 0.025) 100%);
        border: 1px solid rgba(255, 255, 255, 0.09);
        width: fit-content;
        max-width: 100%;
        flex-wrap: wrap;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 20px rgba(0, 0, 0, 0.1);
      }

      .yyt-settings-tab {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border-radius: 15px;
        border: 1px solid transparent;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%);
        color: var(--yyt-text-secondary);
        cursor: pointer;
        transition: all 0.18s ease;
        font-weight: 800;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
      }

      .yyt-settings-tab:hover {
        color: var(--yyt-text);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
        border-color: rgba(255, 255, 255, 0.1);
      }

      .yyt-settings-tab.yyt-active {
        color: var(--yyt-on-accent);
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
        border-color: transparent;
        box-shadow: 0 14px 30px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.24);
      }

      .yyt-settings-content {
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-settings-tab-content {
        display: none;
        flex-direction: column;
        gap: 14px;
      }

      .yyt-settings-tab-content.yyt-active {
        display: flex;
      }

      .yyt-settings-section {
        position: relative;
        overflow: hidden;
        padding: 18px;
        border-radius: 22px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
          rgba(255, 255, 255, 0.01);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 32px rgba(0, 0, 0, 0.12);
      }

      .yyt-settings-section-title {
        font-size: 16px;
        font-weight: 900;
        color: var(--yyt-text);
        margin-bottom: 14px;
      }

      .yyt-settings-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 2px;
      }

      .yyt-settings-macro-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 12px;
      }

      .yyt-settings-macro-item {
        display: grid;
        grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
        gap: 14px;
        align-items: start;
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
      }

      .yyt-settings-macro-item code {
        color: var(--yyt-accent-strong);
        word-break: break-word;
        font-weight: 800;
      }

      .yyt-settings-macro-item span {
        color: rgba(255, 255, 255, 0.8);
        font-size: 12px;
        line-height: 1.7;
      }

      .yyt-settings-runtime-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 14px;
      }

      .yyt-settings-runtime-chip {
        display: inline-flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 800;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.035) 100%);
        color: var(--yyt-text);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
      }

      .yyt-settings-runtime-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.35);
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.16) 0%, rgba(74, 222, 128, 0.07) 100%);
      }

      .yyt-settings-runtime-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.35);
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.16) 0%, rgba(248, 113, 113, 0.07) 100%);
      }

      .yyt-settings-runtime-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-runtime-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 14px;
      }

      .yyt-settings-runtime-item {
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .yyt-settings-runtime-meta {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.72);
      }

      .yyt-settings-runtime-main {
        font-size: 12px;
        color: var(--yyt-text);
        line-height: 1.7;
        word-break: break-word;
      }
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},Ld=pt});function oe(t){return t==null?"":String(t).trim()}function ve(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function cs(t={}){return{chatId:oe(t.chatId),sourceMessageId:oe(t.sourceMessageId||t.messageId),sourceSwipeId:oe(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:oe(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:oe(t.slotBindingKey),slotRevisionKey:oe(t.slotRevisionKey),slotTransactionId:oe(t.slotTransactionId),traceId:oe(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function dn(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:oe(t.runSource)||ot.MANUAL,traceId:oe(t.traceId),chatId:oe(t.chatId),sourceMessageId:oe(t.sourceMessageId||t.messageId),sourceSwipeId:oe(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:oe(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:oe(t.slotBindingKey),slotRevisionKey:oe(t.slotRevisionKey),slotTransactionId:oe(t.slotTransactionId),assistantContentFingerprint:oe(t.assistantContentFingerprint),assistantBaseFingerprint:oe(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function Ws(t){return!t||typeof t!="object"?null:{slotBindingKey:oe(t.slotBindingKey),slotRevisionKey:oe(t.slotRevisionKey),sourceMessageId:oe(t.sourceMessageId),sourceSwipeId:oe(t.sourceSwipeId),tables:Array.isArray(t.tables)?ve(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?ve(t.meta):{}}}function Ho(t={},e={}){let s=dn(t);return{slotBindingKey:s.slotBindingKey,slotRevisionKey:s.slotRevisionKey,sourceMessageId:s.sourceMessageId,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId,tables:Array.isArray(e.tables)?ve(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:e.meta&&typeof e.meta=="object"?ve(e.meta):{}}}function Yo(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?cs(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?cs(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}var Ko,ds,ot,js,us=O(()=>{Ko="YouYouToolkit_tableState",ds="YouYouToolkit_tableBindings",ot=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),js=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",TEMPLATE:"template",EMPTY:"empty"})});function ce(t,e=""){return t==null?e:String(t).trim()||e}function Bd(t,e=!1){return t==null?e:t===!0}function Ud(t){return Array.isArray(t)?ve(t):[]}function pi(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function zd(t,e="col"){return ce(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function gi(t,e=new Set){let s=zd(t,"col"),o=s,r=2;for(;e.has(o);)o=`${s}_${r}`,r+=1;return e.add(o),o}function jd(t=[]){let e=[],s=0;return t.forEach(o=>{let r=o&&typeof o=="object"?o:{},n=r.cells&&typeof r.cells=="object"&&!Array.isArray(r.cells)?r.cells:null,a=Array.isArray(r.cells)?r.cells:Array.isArray(r.values)?r.values:null;n&&Object.keys(n).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>s&&(s=a.length)}),e.length>0?e.map(o=>({key:o,title:String(o)})):s>0?Array.from({length:s},(o,r)=>({key:`col_${r+1}`,title:`\u5217${r+1}`})):[]}function Wd(t={},e=0,s=new Set){let o=t&&typeof t=="object"?t:{},r=ce(o.title||o.name||o.label,`\u5217${e+1}`),n=ce(o.key||o.id,""),a=gi(n||r||`col_${e+1}`,s),i=[n,ce(o.title,""),ce(o.name,""),ce(o.label,"")].filter(Boolean);return{key:a,title:r,sourceKeys:i}}function Fd(t={},e={},s=0){let o=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,r=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(o){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of n)if(o[a]!==void 0)return pi(o[a])}return r&&r[s]!==void 0?pi(r[s]):""}function Kd(t={},e=[],s=0){let o=t&&typeof t=="object"?t:{},r={};return e.forEach((n,a)=>{r[n.key]=Fd(o,n,a)}),{name:ce(o.name||o.title||o.label,`\u884C${s+1}`),cells:r}}function fi(t={},e=0){let s=t&&typeof t=="object"?t:{},o=new Set,n=(Array.isArray(s.columns)&&s.columns.length>0?s.columns:jd(Array.isArray(s.rows)?s.rows:[])).map((i,l)=>Wd(i,l,o)),a=Array.isArray(s.rows)?s.rows.map((i,l)=>Kd(i,n,l)):[];return{name:ce(s.name||s.title,`\u8868${e+1}`),note:ce(s.note||s.description,""),columns:n.map(i=>({key:i.key,title:i.title})),rows:a}}function mi(t={}){let e=t&&typeof t=="object"?t:{};return{lastStatus:ce(e.lastStatus,Fs.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:ce(e.lastError,""),successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:ce(e.lastSourceMessageId,""),lastSlotRevisionKey:ce(e.lastSlotRevisionKey,""),lastLoadMode:ce(e.lastLoadMode,""),lastMirrorApplied:e.lastMirrorApplied===!0}}function yn(t=1,e=[]){let s=new Set((Array.isArray(e)?e:[]).map(r=>ce(r?.key,"")).filter(Boolean));return{key:gi(`col_${t}`,s),title:`\u5217${t}`}}function Hd(t=[],e=1){let s={};return(Array.isArray(t)?t:[]).forEach(o=>{let r=ce(o?.key,"");r&&(s[r]="")}),{name:`\u884C${e}`,cells:s}}function gn(t=1){let e=yn(1);return{name:`\u8868${t}`,note:"",columns:[e],rows:[Hd([e],1)]}}function Yd(){return{tables:[]}}function bi(t=[]){return!Array.isArray(t)||t.length===0?Yd():{tables:t.map((e,s)=>fi(e,s))}}function fn(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((o,r)=>fi(o,r))}function mn(t={}){let e=[];(!t||typeof t!="object")&&e.push("\u8868\u5B9A\u4E49\u8349\u7A3F\u65E0\u6548\u3002"),t&&t.tables!==void 0&&!Array.isArray(t.tables)&&e.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u5305\u542B tables \u6570\u7EC4\u3002");let s=[];if(e.length===0)try{s=fn(t)}catch(o){e.push(o?.message||"\u8868\u5B9A\u4E49\u7F16\u8BD1\u5931\u8D25\u3002")}return{valid:e.length===0,errors:e,tables:s}}function hi(){return{tables:[],promptTemplate:yi,apiPreset:"",mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",runtime:mi()}}function Ve(t={}){let e=hi(),s=t&&typeof t=="object"?t:{};return{tables:Ud(s.tables),promptTemplate:ce(s.promptTemplate,e.promptTemplate),apiPreset:ce(s.apiPreset,""),mirrorToMessage:Bd(s.mirrorToMessage,e.mirrorToMessage),mirrorTag:ce(s.mirrorTag,e.mirrorTag),runtime:mi({...e.runtime,...s.runtime||{}})}}function bn(t={}){let e=Ve(t),s=[];return Array.isArray(e.tables)||s.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||s.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||s.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:s.length===0,errors:s,config:e}}function Kt(){let t=un.get(pn,hi());return Ve(t)}function xi(t={}){let e=Kt(),s=Ve({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),o=bn(s);return o.valid?(un.set(pn,o.config),{success:!0,config:o.config}):{success:!1,error:o.errors.join(`
`),errors:o.errors,config:o.config}}function qo(t={}){let e=Kt(),s=Ve({...e,runtime:{...e.runtime,...t||{}}});return un.set(pn,s),s.runtime}function qd(t={}){let e=Ve(t);return`${ce(e.promptTemplate,yi)}

${Nd}`.trim()}function vi(t={}){return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:qd(t),bypass:{enabled:!1}}}function wi({apiPresets:t=[]}={}){let e=[{value:"",label:"\u5F53\u524D API \u914D\u7F6E"},...t.map(s=>({value:String(s?.name||""),label:String(s?.name||"")})).filter(s=>s.value)];return[{name:"tables",type:"tableDefinitions",label:"\u8868\u5B9A\u4E49",description:"\u901A\u8FC7\u7ED3\u6784\u5316\u7F16\u8F91\u5668\u7EF4\u62A4 tables\u3002\u9996\u6B21\u6267\u884C\u6216\u5F53\u524D\u6D88\u606F\u5C1A\u65E0\u7ED1\u5B9A state \u65F6\uFF0C\u4F1A\u4EE5\u7F16\u8BD1\u540E\u7684 tables \u4F5C\u4E3A merge base\u3002",emptyValue:[]},{name:"promptTemplate",type:"textarea",label:"\u586B\u8868 Prompt",rows:12,description:"\u53EF\u4F7F\u7528 {{lastUserMessage}}\u3001{{lastAiMessage}}\u3001{{chatHistory}}\u3001{{toolContentMacro}} \u7B49\u53D8\u91CF\u3002\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u8FFD\u52A0 JSON \u8F93\u51FA\u7EA6\u675F\u3002"},{name:"apiPreset",type:"select",label:"API \u9884\u8BBE",description:"\u4E3A\u7A7A\u65F6\u4F7F\u7528\u5F53\u524D\u5168\u5C40 API \u914D\u7F6E\u3002",options:e},{name:"mirrorToMessage",type:"checkbox",label:"\u955C\u50CF\u5199\u56DE\u6B63\u6587",description:"\u628A\u5F53\u524D tables \u7684 JSON \u9884\u89C8\u955C\u50CF\u5230\u76EE\u6807 assistant \u6D88\u606F\u6B63\u6587\u4E2D\u3002"}]}var un,pn,Fs,yi,Nd,Ks=O(()=>{Re();us();un=_.namespace("tableWorkbench"),pn="config",Fs=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"}),yi=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u66F4\u65B0\u7ED3\u6784\u5316 tables \u6570\u636E\u3002

\u8981\u6C42\uFF1A
1. \u53EA\u4F9D\u636E\u5F53\u524D\u5BF9\u8BDD\u5185\u5BB9\u66F4\u65B0\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002
2. \u4FDD\u6301\u539F\u6709\u8868\u7ED3\u6784\uFF1B\u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\u3002
3. \u5982\u679C\u67D0\u5B57\u6BB5\u9700\u8981\u6E05\u7A7A\uFF0C\u8BF7\u663E\u5F0F\u8F93\u51FA\u7A7A\u5B57\u7B26\u4E32\u3001\u7A7A\u6570\u7EC4\u6216 null\u3002
4. \u4F18\u5148\u53C2\u8003\u5F53\u524D assistant \u56DE\u590D\uFF1A{{lastAiMessage}}
5. \u5F53\u524D\u8868\u683C\u57FA\u5E95 JSON\uFF1A
{{toolContentMacro}}`,Nd=`\u8F93\u51FA\u8981\u6C42\uFF1A
- \u53EA\u8FD4\u56DE JSON
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown
- JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}`});function Ti(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Gd(t,e){if(t.type==="json"){let s=e===void 0?t.emptyValue:e;if(typeof s=="string")return s;try{return JSON.stringify(s??null,null,2)}catch{return String(s??"")}}return String(e??"")}function Vd(t=[],e=""){return t.map(s=>{let o=String(s?.value??""),r=String(s?.label??o),n=o===String(e??"")?"selected":"";return`<option value="${b(o)}" ${n}>${b(r)}</option>`}).join("")}function Jd(t={},e={},s=0){let o=t&&typeof t=="object"?t.cells:null;if(Array.isArray(o))return String(o[s]??"");if(o&&typeof o=="object"){if(o[e.key]!==void 0)return String(o[e.key]??"");if(o[e.title]!==void 0)return String(o[e.title]??"")}return""}function _i(t={}){return bi(fn(t))}function Xd(t={},e={},s=0,o=0){let r=Array.isArray(t.columns)?t.columns:[];return`
    <tr data-table-editor-row="${o}">
      <td>
        <input type="text" class="yyt-input" data-table-editor-row-name value="${b(String(e?.name||""))}" placeholder="\u884C\u540D">
      </td>
      ${r.map((n,a)=>`
        <td>
          <textarea class="yyt-textarea yyt-code-textarea-small"
                    data-table-editor-cell
                    data-column-index="${a}"
                    rows="2"
                    placeholder="${b(n.title||n.key||`\u5217${a+1}`)}">${b(Jd(e,n,a))}</textarea>
        </td>
      `).join("")}
      <td>
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-row" data-table-index="${s}" data-row-index="${o}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `}function Ai(t={},e=0,s={}){let o=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[],n=String(t?.name||"").trim(),a=String(t?.note||"").trim(),l=s.showDeleteTable!==!1?`
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-table" data-table-index="${e}">
          <i class="fa-solid fa-trash"></i> \u5220\u9664\u8868\u683C
        </button>
      `:"",c=[`\u8868\u683C ${e+1}`,`${o.length} \u5217`,`${r.length} \u884C`];return a&&c.push("\u5DF2\u586B\u5199\u8BF4\u660E"),`
    <div class="yyt-table-editor-card" data-table-editor-table="${e}">
      <div class="yyt-table-editor-card-head">
        <div>
          <div class="yyt-table-editor-card-title">${b(n||`\u8868\u683C ${e+1}`)}</div>
          <div class="yyt-table-editor-card-subtitle">${b(c.join(" \xB7 "))}</div>
        </div>
        ${l}
      </div>

      <div class="yyt-table-editor-meta">
        <div class="yyt-table-editor-input-group">
          <span>\u8868\u683C\u540D</span>
          <input type="text" class="yyt-input" data-table-editor-table-name value="${b(String(t?.name||""))}" placeholder="\u4F8B\u5982\uFF1A\u89D2\u8272\u72B6\u6001\u8868">
        </div>
        <div class="yyt-table-editor-input-group">
          <span>\u8868\u683C\u8BF4\u660E</span>
          <textarea class="yyt-textarea yyt-code-textarea-small" data-table-editor-table-note rows="2" placeholder="\u7ED9\u6A21\u578B\u89E3\u91CA\u6B64\u8868\u7684\u4F5C\u7528">${b(String(t?.note||""))}</textarea>
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <div>
            <div class="yyt-table-editor-section-title">\u5217\u5B9A\u4E49</div>
            <div class="yyt-table-editor-section-desc">\u5148\u58F0\u660E\u6BCF\u4E00\u5217\u7684\u663E\u793A\u6807\u9898\u4E0E\u5B57\u6BB5 key\uFF0C\u8FD0\u884C\u65F6\u4F1A\u6309\u8FD9\u91CC\u7684\u7ED3\u6784\u5199\u5165\u8868\u683C\u72B6\u6001\u3002</div>
          </div>
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-column" data-table-index="${e}">
            <i class="fa-solid fa-plus"></i> \u65B0\u589E\u5217
          </button>
        </div>
        <div class="yyt-table-editor-columns">
          ${o.length?o.map((d,u)=>`
            <div class="yyt-table-editor-column" data-table-editor-column="${u}">
              <div class="yyt-table-editor-input-group">
                <span>\u5217\u6807\u9898</span>
                <input type="text" class="yyt-input" data-table-editor-column-title value="${b(String(d?.title||""))}" placeholder="\u4F8B\u5982\uFF1A\u5C5E\u6027">
              </div>
              <div class="yyt-table-editor-input-group">
                <span>\u5B57\u6BB5 key</span>
                <input type="text" class="yyt-input" data-table-editor-column-key value="${b(String(d?.key||""))}" placeholder="attribute_name">
              </div>
              <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-column" data-table-index="${e}" data-column-index="${u}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          `).join(""):'<div class="yyt-table-editor-empty"><div class="yyt-table-editor-section-title">\u5F53\u524D\u6CA1\u6709\u5217\u5B9A\u4E49</div><div class="yyt-table-editor-muted">\u5148\u65B0\u589E\u4E00\u5217\uFF0C\u518D\u7EE7\u7EED\u586B\u5199\u884C\u5185\u5BB9\u3002</div></div>'}
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <div>
            <div class="yyt-table-editor-section-title">\u884C\u5185\u5BB9</div>
            <div class="yyt-table-editor-section-desc">\u6BCF\u4E00\u884C\u5BF9\u5E94\u4E00\u7EC4\u5B57\u6BB5\u503C\uFF0C\u5355\u5143\u683C\u5185\u5BB9\u4F1A\u6309\u5217\u987A\u5E8F\u6620\u5C04\u5230\u5F53\u524D\u8868\u5B9A\u4E49\u3002</div>
          </div>
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-row" data-table-index="${e}">
            <i class="fa-solid fa-plus"></i> \u65B0\u589E\u884C
          </button>
        </div>
        <div class="yyt-table-editor-grid-wrap">
          <table class="yyt-table-editor-grid">
            <thead>
              <tr>
                <th>\u884C\u540D</th>
                ${o.map((d,u)=>`<th>${b(d?.title||d?.key||`\u5217${u+1}`)}</th>`).join("")}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${r.length?r.map((d,u)=>Xd(t,d,e,u)).join(""):`
                <tr>
                  <td colspan="${Math.max(o.length+2,2)}">
                    <div class="yyt-table-editor-empty">
                      <div class="yyt-table-editor-section-title">\u5F53\u524D\u6CA1\u6709\u884C\u5185\u5BB9</div>
                      <div class="yyt-table-editor-muted">\u53EF\u5148\u65B0\u589E\u4E00\u884C\uFF0C\u518D\u9010\u5217\u8865\u9F50\u5355\u5143\u683C\u6570\u636E\u3002</div>
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function Qd(t={},e=0,s={}){let o=Array.isArray(t?.columns)?t.columns:[],r=Array.isArray(t?.rows)?t.rows:[],n=s.mode==="create"?"create":"edit";return`
    <div class="yyt-table-editor yyt-table-editor-shell yyt-table-editor-shell-compact" data-table-dialog-root>
      <div class="yyt-table-editor-banner">
        <div class="yyt-table-editor-banner-copy">
          <div class="yyt-table-editor-banner-title">${n==="create"?"\u65B0\u589E\u8868\u683C":"\u7F16\u8F91\u5355\u5F20\u8868\u683C"}</div>
          <div class="yyt-table-editor-muted">${n==="create"?"\u5148\u5B8C\u6210\u8FD9\u5F20\u8868\u7684\u7ED3\u6784\u4E0E\u5185\u5BB9\uFF0C\u518D\u4FDD\u5B58\u56DE\u8868\u5B9A\u4E49\u5217\u8868\u3002\u521B\u5EFA\u5B8C\u6210\u540E\u53EF\u7EE7\u7EED\u8FFD\u52A0\u5176\u5B83\u8868\u3002":"\u5148\u5B8C\u6210\u5355\u5F20\u8868\u7684\u7ED3\u6784\u4E0E\u5185\u5BB9\uFF0C\u518D\u4FDD\u5B58\u56DE\u8868\u5B9A\u4E49\u5217\u8868\u3002\u8FD9\u91CC\u4E0D\u4F1A\u76F4\u63A5\u6539\u52A8\u5176\u5B83\u8868\u3002"}</div>
        </div>
        <div class="yyt-table-editor-banner-meta">
          <span class="yyt-table-editor-chip">${n==="create"?"\u521B\u5EFA\u6A21\u5F0F":"\u5355\u8868\u7F16\u8F91"}</span>
          <span class="yyt-table-editor-chip">${o.length} \u5217</span>
          <span class="yyt-table-editor-chip">${r.length} \u884C</span>
        </div>
      </div>
      ${Ai(t,e,{showDeleteTable:!1})}
    </div>
  `}function Ei(t={}){let e=Array.isArray(t?.tables)?t.tables:[],s=e.reduce((r,n)=>r+(Array.isArray(n?.columns)?n.columns.length:0),0),o=e.reduce((r,n)=>r+(Array.isArray(n?.rows)?n.rows.length:0),0);return`
    <div class="yyt-table-editor-shell">
      <div class="yyt-table-editor-banner">
        <div class="yyt-table-editor-banner-copy">
          <div class="yyt-table-editor-banner-title">\u8868\u5B9A\u4E49\u7F16\u8F91\u5668</div>
          <div class="yyt-table-editor-muted">\u7ED3\u6784\u5316\u7EF4\u62A4 tables \u8349\u7A3F\u3002\u4FDD\u5B58\u6216\u6267\u884C\u65F6\u4F1A\u81EA\u52A8\u7F16\u8BD1\u4E3A runtime tables\uFF0C\u65E0\u9700\u624B\u5199 JSON\u3002</div>
        </div>
        <div class="yyt-table-editor-banner-meta">
          <span class="yyt-table-editor-chip">${e.length} \u5F20\u8868</span>
          <span class="yyt-table-editor-chip">${s} \u5217</span>
          <span class="yyt-table-editor-chip">${o} \u884C</span>
        </div>
      </div>
      <div class="yyt-table-editor-toolbar">
        <div class="yyt-table-editor-muted">\u5EFA\u8BAE\u5148\u8865\u9F50\u8868\u683C\u540D\u4E0E\u5217\u5B9A\u4E49\uFF0C\u518D\u5F55\u5165\u884C\u5185\u5BB9\uFF0C\u907F\u514D\u540E\u7EED\u9891\u7E41\u8C03\u6574\u5217\u7ED3\u6784\u3002</div>
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-primary" data-table-editor-action="add-table">
          <i class="fa-solid fa-plus"></i> \u65B0\u589E\u8868\u683C
        </button>
      </div>
      <div class="yyt-table-editor-stack">
        ${e.length?e.map((r,n)=>Ai(r,n)).join(""):`
          <div class="yyt-table-editor-empty">
            <div class="yyt-table-editor-section-title">\u8FD8\u6CA1\u6709\u8868\u5B9A\u4E49</div>
            <div class="yyt-table-editor-muted">\u70B9\u51FB\u53F3\u4FA7\u201C\u65B0\u589E\u8868\u683C\u201D\u5F00\u59CB\u914D\u7F6E\u8868\u540D\u3001\u5217\u7ED3\u6784\u548C\u884C\u5185\u5BB9\u3002</div>
          </div>
        `}
      </div>
    </div>
  `}function Zd(t={},e={}){let s=String(t.name||"").trim(),o=b(t.label||s),r=t.description?`<div class="yyt-table-form-field-desc">${b(t.description)}</div>`:"",n=_i({tables:Array.isArray(e[s])?e[s]:[]});return`
    <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
      <label>${o}</label>
      <div class="yyt-table-editor" data-table-field="${b(s)}" data-field-type="tableDefinitions" data-table-definition-root>
        ${Ei(n)}
      </div>
      ${r}
    </div>
  `}function eu(t,e={},s={}){if(!$()||!D(t))return null;let r=s.mode==="create"?"create":"edit",n=`yyt-table-definition-dialog-${Date.now()}`,a=Mt({id:n,title:r==="create"?"\u65B0\u589E\u8868\u683C":"\u7F16\u8F91\u8868\u683C",body:Qd(e,0,{mode:r}),wide:!0,width:"min(900px, calc(100vw - 32px))",dialogClass:"yyt-table-editor-dialog",bodyClass:"yyt-table-editor-dialog-body",footerClass:"yyt-table-editor-dialog-footer"});return t.append(a),t.find(`#${n}-save`).html(`<i class="fa-solid fa-check"></i> ${r==="create"?"\u6DFB\u52A0\u8868\u683C":"\u4FDD\u5B58\u8868\u683C"}`),t.find(`#${n}-cancel`).html('<i class="fa-solid fa-arrow-left"></i> \u8FD4\u56DE'),t.find(`#${n}-cancel`).before('<div class="yyt-table-editor-dialog-note">\u4FDD\u5B58\u540E\u4F1A\u628A\u5F53\u524D\u8868\u5199\u56DE\u8868\u5B9A\u4E49\u5217\u8868\uFF0C\u4E0D\u4F1A\u76F4\u63A5\u5F71\u54CD\u5176\u5B83\u8868\u3002</div>'),kt(t,n,{onSave:i=>{let l=t.find(`#${n}-overlay [data-table-dialog-root]`),c=mn(Hs(l));if(!c.valid){x("error",c.errors.join(`
`));return}typeof s.onSave=="function"&&s.onSave(c.tables[0]||gn(1)),i()},onClose:()=>{typeof s.onClose=="function"&&s.onClose()}}),n}function tu(t={},e={}){let s=String(t.name||"").trim();if(!s)return"";if(t.type==="tableDefinitions")return Zd(t,e);let o=e[s],r=b(t.label||s),n=t.description?`<div class="yyt-table-form-field-desc">${b(t.description)}</div>`:"",a=Number.isFinite(t.rows)?t.rows:6;return t.type==="checkbox"?`
      <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
        <label class="yyt-table-form-inline-checkbox">
          <input type="checkbox" data-table-field="${b(s)}" data-field-type="checkbox" ${o===!0?"checked":""}>
          <span>${r}</span>
        </label>
        ${n}
      </div>
    `:t.type==="select"?`
      <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
        <label for="yyt-table-field-${b(s)}">${r}</label>
        <select class="yyt-select" id="yyt-table-field-${b(s)}" data-table-field="${b(s)}" data-field-type="select">
          ${Vd(t.options||[],o)}
        </select>
        ${n}
      </div>
    `:`
    <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
      <label for="yyt-table-field-${b(s)}">${r}</label>
      <textarea class="yyt-textarea yyt-code-textarea ${t.type==="json"?"":"yyt-code-textarea-small"}"
                id="yyt-table-field-${b(s)}"
                data-table-field="${b(s)}"
                data-field-type="${b(t.type||"textarea")}"
                rows="${a}">${b(Gd(t,o))}</textarea>
      ${n}
    </div>
  `}function Hs(t){let e=$();return!e||!t?.length?{tables:[]}:{tables:t.find("[data-table-editor-table]").map((o,r)=>{let n=e(r),a=n.find("[data-table-editor-column]").map((l,c)=>{let d=e(c);return{title:String(d.find("[data-table-editor-column-title]").val()||""),key:String(d.find("[data-table-editor-column-key]").val()||"")}}).get(),i=n.find("[data-table-editor-row]").map((l,c)=>{let d=e(c);return{name:String(d.find("[data-table-editor-row-name]").val()||""),cells:d.find("[data-table-editor-cell]").map((u,m)=>String(e(m).val()||"")).get()}}).get();return{name:String(n.find("[data-table-editor-table-name]").val()||""),note:String(n.find("[data-table-editor-table-note]").val()||""),columns:a,rows:i}}).get()}}function su(t=[],e=1){return{name:`\u884C${e}`,cells:Array.from({length:Array.isArray(t)?t.length:0},()=>"")}}function hn(t,e={},s={}){t.html(Ei(_i(s)))}function Mi(t,e=[],s={}){let o=$();if(!o||!D(t))return;let r=Array.isArray(e)?e:[],n=i=>{let l=String(i.attr("data-table-field")||"").trim();return r.find(c=>String(c?.name||"").trim()===l)||{name:l}},a=()=>{typeof s.onChange=="function"&&s.onChange()};t.off(".yytTableForm"),t.on("click.yytTableForm","[data-table-definition-root] [data-table-editor-action]",i=>{i.preventDefault();let l=o(i.currentTarget),c=String(l.attr("data-table-editor-action")||"").trim(),d=l.closest("[data-table-definition-root]");if(!d.length)return;let u=n(d),m=Hs(d),p=Array.isArray(m.tables)?m.tables:[],f=Number.parseInt(l.attr("data-table-index")||"",10),v=Number.parseInt(l.attr("data-column-index")||"",10),w=Number.parseInt(l.attr("data-row-index")||"",10);if(c==="add-table"){eu(t,gn(p.length+1),{mode:"create",onSave:T=>{let I=Hs(d),E=Array.isArray(I.tables)?I.tables:[];E.push(T),hn(d,u,{tables:E}),a()}});return}if(c==="delete-table"&&Number.isInteger(f)&&f>=0&&f<p.length&&p.splice(f,1),c==="add-column"&&Number.isInteger(f)&&f>=0&&f<p.length){let T=p[f]||{},I=Array.isArray(T.columns)?T.columns:[],E=yn(I.length+1,I);T.columns=[...I,{key:E.key,title:E.title}],T.rows=(Array.isArray(T.rows)?T.rows:[]).map((K,q)=>({name:String(K?.name||`\u884C${q+1}`),cells:[...Array.isArray(K?.cells)?K.cells:[],""]}))}if(c==="delete-column"&&Number.isInteger(f)&&f>=0&&f<p.length){let T=p[f]||{},I=Array.isArray(T.columns)?T.columns:[];Number.isInteger(v)&&v>=0&&v<I.length&&(T.columns=I.filter((E,K)=>K!==v),T.rows=(Array.isArray(T.rows)?T.rows:[]).map((E,K)=>{let q=Array.isArray(E?.cells)?[...E.cells]:[];return q.splice(v,1),{name:String(E?.name||`\u884C${K+1}`),cells:q}}))}if(c==="add-row"&&Number.isInteger(f)&&f>=0&&f<p.length){let T=p[f]||{},I=Array.isArray(T.columns)?T.columns:[],E=Array.isArray(T.rows)?T.rows:[];T.rows=[...E,su(I,E.length+1)]}if(c==="delete-row"&&Number.isInteger(f)&&f>=0&&f<p.length){let T=p[f]||{},I=Array.isArray(T.rows)?T.rows:[];Number.isInteger(w)&&w>=0&&w<I.length&&(T.rows=I.filter((E,K)=>K!==w))}hn(d,u,{tables:p}),a()}),t.on("input.yytTableForm","[data-table-definition-root] input, [data-table-definition-root] textarea",()=>{a()}),t.on("change.yytTableForm","[data-table-definition-root] [data-table-editor-column-key], [data-table-definition-root] [data-table-editor-column-title]",i=>{let l=o(i.currentTarget).closest("[data-table-definition-root]");if(!l.length)return;let c=n(l);hn(l,c,Hs(l)),a()})}function ki(t=[],e={}){return`
    <div class="yyt-table-form-grid">
      ${(Array.isArray(t)?t:[]).map(o=>tu(o,e)).join("")}
    </div>
  `}function xn(t,e=[]){let s=Array.isArray(e)?e:[],o={},r=[];return s.forEach(n=>{let a=String(n?.name||"").trim();if(!a)return;let i=t.find(`[data-table-field="${a}"]`);if(!i.length)return;if(n.type==="tableDefinitions"){let c=mn(Hs(i));if(!c.valid){c.errors.forEach(d=>{r.push(`${n.label||a}\uFF1A${d}`)});return}o[a]=Ti(c.tables);return}if(n.type==="checkbox"){o[a]=i.is(":checked");return}let l=String(i.val()||"");if(n.type==="json"){let c=l.trim();if(!c){o[a]=Ti(n.emptyValue);return}try{o[a]=JSON.parse(c)}catch(d){r.push(`${n.label||a} \u4E0D\u662F\u5408\u6CD5 JSON\uFF1A${d?.message||String(d)}`)}return}o[a]=l}),{values:o,errors:r}}var Si,Ii=O(()=>{ke();Ks();Si=`
  .yyt-dialog.yyt-table-editor-dialog {
    border-radius: 24px;
    border-color: rgba(123, 183, 255, 0.18);
    background:
      radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 62%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 28%),
      var(--yyt-bg-base);
    box-shadow: 0 30px 84px rgba(0, 0, 0, 0.6), 0 0 48px rgba(123, 183, 255, 0.08);
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-header {
    padding: 18px 22px;
    border-bottom-color: rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.018) 100%);
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-title {
    font-size: 16px;
    font-weight: 800;
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-body.yyt-table-editor-dialog-body {
    padding: 20px;
    background: rgba(255, 255, 255, 0.01);
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-footer.yyt-table-editor-dialog-footer {
    justify-content: space-between;
    border-top-color: rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.014) 100%);
  }

  .yyt-table-editor-dialog-note {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.62);
    line-height: 1.65;
  }

  .yyt-table-form-grid {
    display: grid;
    gap: 14px;
  }

  .yyt-table-form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .yyt-table-form-field label {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-form-field-desc {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.72);
  }

  .yyt-table-form-field textarea.yyt-textarea,
  .yyt-table-form-field .yyt-input,
  .yyt-table-form-field .yyt-select {
    width: 100%;
  }

  .yyt-table-form-inline-checkbox {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: var(--yyt-text);
    font-weight: 700;
  }

  .yyt-table-form-inline-checkbox input {
    width: 18px;
    height: 18px;
    margin: 0;
    accent-color: var(--yyt-accent);
  }

  .yyt-table-editor {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-table-editor-shell {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 18px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(12, 16, 24, 0.32);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 34px rgba(0, 0, 0, 0.16);
  }

  .yyt-table-editor-shell-compact {
    padding: 16px;
  }

  .yyt-table-editor-banner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid rgba(123, 183, 255, 0.2);
    background: radial-gradient(280px 120px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 70%), rgba(123, 183, 255, 0.05);
  }

  .yyt-table-editor-banner-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .yyt-table-editor-banner-title {
    font-size: 14px;
    font-weight: 900;
    color: var(--yyt-text);
  }

  .yyt-table-editor-banner-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .yyt-table-editor-chip {
    display: inline-flex;
    align-items: center;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.3px;
    color: var(--yyt-text);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.08);
  }

  .yyt-table-editor-toolbar,
  .yyt-table-editor-section-head,
  .yyt-table-editor-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .yyt-table-editor-toolbar {
    align-items: flex-start;
  }

  .yyt-table-editor-muted {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.68);
  }

  .yyt-table-editor-stack {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-table-editor-empty {
    padding: 16px;
    border-radius: 18px;
    border: 1px dashed rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.03);
  }

  .yyt-table-editor-card {
    padding: 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(10, 14, 22, 0.2);
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 36px rgba(0, 0, 0, 0.18);
  }

  .yyt-table-editor-card-title {
    font-size: 14px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-editor-card-subtitle {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .yyt-table-editor-meta {
    display: grid;
    grid-template-columns: minmax(220px, 1fr) minmax(0, 1fr);
    gap: 12px;
  }

  .yyt-table-editor-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
  }

  .yyt-table-editor-section-title {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.82);
  }

  .yyt-table-editor-section-desc {
    font-size: 11px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.56);
  }

  .yyt-table-editor-columns {
    display: grid;
    gap: 10px;
  }

  .yyt-table-editor-column {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(140px, 0.75fr) auto;
    gap: 10px;
    align-items: end;
    padding: 12px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
  }

  .yyt-table-editor-input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .yyt-table-editor-input-group span {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.66);
  }

  .yyt-table-editor-grid-wrap {
    overflow-x: auto;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(8, 12, 18, 0.36);
  }

  .yyt-table-editor-grid {
    width: 100%;
    min-width: 680px;
    border-collapse: collapse;
    background: rgba(8, 12, 18, 0.72);
  }

  .yyt-table-editor-grid th,
  .yyt-table-editor-grid td {
    padding: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: top;
  }

  .yyt-table-editor-grid th {
    text-align: left;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.78);
    background: rgba(255, 255, 255, 0.04);
  }

  .yyt-table-editor-grid td:last-child,
  .yyt-table-editor-grid th:last-child {
    border-right: none;
    width: 60px;
  }

  .yyt-table-editor-grid tr:last-child td {
    border-bottom: none;
  }

  .yyt-table-editor-grid textarea,
  .yyt-table-editor-grid input,
  .yyt-table-editor-column input,
  .yyt-table-editor-meta input,
  .yyt-table-editor-meta textarea {
    width: 100%;
  }

  .yyt-table-editor-grid textarea {
    min-height: 54px;
    resize: vertical;
  }

  @media (max-width: 900px) {
    .yyt-table-editor-meta {
      grid-template-columns: 1fr;
    }

    .yyt-table-editor-column {
      grid-template-columns: 1fr;
    }
  }
`});function ou(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(s=>J(s))}function ru(t=[],e=""){let s=J(e);if(!s||!Array.isArray(t))return-1;for(let o=t.length-1;o>=0;o-=1){let r=t[o];if(ou(r,o).includes(s))return o}return-1}function Go(t={},e={}){let s=J(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!s)return null;let o=dn({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||ot.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:s,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:ru(t?.chatMessages||t?.chatHistory||[],s)});return!o.slotBindingKey||!o.slotRevisionKey?null:o}async function vn({runSource:t=ot.MANUAL}={}){let e=await Nt({runSource:t});return Go(e,{runSource:t})}async function nu({messageId:t,swipeId:e="",runSource:s=ot.AUTO}={}){let o=await Ps({messageId:t,swipeId:e,runSource:s});return Go(o,{runSource:s})}async function Ci(t=null,e={}){let s=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(s);let o=J(e.runSource||s?.runSource)||ot.MANUAL,r=J(e.messageId||s?.sourceMessageId),n=J(e.swipeId||s?.sourceSwipeId||s?.effectiveSwipeId);return e.useMessageTarget===!0||o===ot.AUTO?r?nu({messageId:r,swipeId:n,runSource:o}):null:vn({runSource:o})}function Pi(t,e){let s=t||null,o=e||null;return!s||!o?{valid:!1,reason:"missing_target_snapshot"}:J(s.sourceMessageId)!==J(o.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:J(s.sourceSwipeId||s.effectiveSwipeId)!==J(o.sourceSwipeId||o.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:J(s.slotRevisionKey)!==J(o.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var Vo=O(()=>{os();us()});function rt(t){return t==null?"":String(t).trim()}function au(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function iu(){try{let t=au(),e=t?.SillyTavern||null,s=e?.getContext?.()||null,o=Array.isArray(s?.chat)?s.chat:[],r=Array.isArray(e?.chat)?e.chat:[],n=o.length?o:r;return{topWindow:t,api:e,context:s,chat:n,contextChat:o,apiChat:r}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function lu(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function cu(t=[],e=""){let s=rt(e);if(!Array.isArray(t)||!s)return-1;for(let o=t.length-1;o>=0;o-=1){let r=t[o];if(!lu(r))continue;if([r?.sourceId,r?.message_id,r?.messageId,r?.id,r?.mes_id,r?.mid,r?.mesid,r?.chat_index,r?.index,o].map(a=>rt(a)).includes(s))return o}return-1}function wn(t){let e=iu(),s=cu(e.chat,t?.sourceMessageId);return s<0?{runtime:e,messageIndex:s,message:null}:{runtime:e,messageIndex:s,message:e.chat[s]||null}}function $i(t,e,s){let o=r=>{!Array.isArray(r)||e<0||e>=r.length||(r[e]={...r[e]||{},...s})};o(t?.contextChat),o(t?.apiChat)}async function Ri(t){let e=t?.context||null,s=t?.api||null,o=e?.saveChatDebounced||s?.saveChatDebounced||null,r=e?.saveChat||s?.saveChat||null;typeof o=="function"&&o.call(e||s),typeof r=="function"&&await r.call(e||s)}function du(t){let{message:e}=wn(t);return Ws(e?.[Ko])}function Jo(t,e={}){let s=du(t);return s&&rt(s.slotRevisionKey)===rt(t?.slotRevisionKey)?{loadMode:js.EXACT,mergeBaseOnly:!1,state:s}:s&&rt(s.slotBindingKey)===rt(t?.slotBindingKey)?{loadMode:js.BINDING_FALLBACK,mergeBaseOnly:!0,state:Ws({...s,slotRevisionKey:rt(t?.slotRevisionKey)||s.slotRevisionKey,sourceSwipeId:rt(t?.sourceSwipeId||t?.effectiveSwipeId)||s.sourceSwipeId,meta:{...s.meta||{},mergeBaseOnly:!0,fallbackFromBinding:!0,fallbackFromRevisionKey:rt(s.slotRevisionKey),requestedRevisionKey:rt(t?.slotRevisionKey)}})}:Array.isArray(e.templateTables)?{loadMode:js.TEMPLATE,mergeBaseOnly:!1,state:Ho(t,{tables:ve(e.templateTables),meta:{fromTemplate:!0}})}:{loadMode:js.EMPTY,mergeBaseOnly:!1,state:Ho(t)}}async function Oi(t){let{runtime:e,messageIndex:s,message:o}=wn(t);if(!o||s<0)return{success:!1,error:"target_message_not_found"};let r={...Yo(o[ds]),lastResolvedTarget:cs(t),updatedAt:Date.now()};return o[ds]=r,$i(e,s,o),await Ri(e),{success:!0,bindings:r}}async function Di(t,e,s={}){let o=s.skipFreshValidation===!0?t:await Ci(t,s),r=s.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:Pi(t,o);if(!r.valid)return{success:!1,error:"target_changed_before_commit",validation:r};let n=o||t,{runtime:a,messageIndex:i,message:l}=wn(n);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:r};let c=Ws({...Ho(n),...e,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),d={...Yo(l[ds]),lastResolvedTarget:cs(n),lastCommittedTarget:cs(n),updatedAt:Date.now()};return l[Ko]=c,l[ds]=d,$i(a,i,l),await Ri(a),{success:!0,state:c,bindings:d,validation:r,messageIndex:i,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function Xo(t=null){let e=Pe.getAssistantMessageSnapshot(t);return e?.message?{...e,tableState:Ws(e.message[Ko]),tableBindings:Yo(e.message[ds])}:null}var Qo=O(()=>{Bt();us();Vo()});function Tn(t,e=""){return t==null?e:String(t).trim()||e}function pu(t={}){return{tables:Array.isArray(t?.tables)?ve(t.tables):[]}}function yu(t={},e={}){let s=Tn(e.mirrorTag,"yyt-table-workbench"),o=pu(t);return[`<${s}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(o,null,2),"```",`</${s}>`].join(`
`)}async function Li({targetSnapshot:t,nextTables:e,config:s,loadResult:o=null}={}){let r=Ve(s),n=await Di(t,{tables:Array.isArray(e)?ve(e):[],meta:{lastLoadMode:Tn(o?.loadMode,""),mergeBaseOnly:!1,updatedBy:Tn(t?.runSource,"MANUAL_TABLE")}});if(!n?.success)return{success:!1,error:n?.error||"table_state_commit_failed",commitResult:n,mirrorResult:null,warning:""};let a=null,i="";if(r.mirrorToMessage){let l=yu(n.state,{mirrorTag:r.mirrorTag});a=await Pe.injectDetailed(uu,l,{overwrite:!0,extractionSelectors:[r.mirrorTag],sourceMessageId:n.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId}),a?.success||(i=a?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return{success:!0,state:n.state,bindings:n.bindings,commitResult:n,mirrorResult:a,warning:i}}var uu,Ni=O(()=>{Bt();us();Qo();Ks();uu="tableWorkbenchMirror"});function Je(t,e=""){return t==null?e:String(t).trim()||e}function Bi(t=[],e=8){return!Array.isArray(t)||t.length===0?"":t.slice(Math.max(t.length-e,0)).map(s=>`[${Je(s?.role,"unknown")}] ${String(s?.content||"").trim()}`).filter(Boolean).join(`

`)}function gu(t,e){return{target:{sourceMessageId:Je(t?.sourceMessageId),sourceSwipeId:Je(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:Je(t?.slotBindingKey),slotRevisionKey:Je(t?.slotRevisionKey),slotTransactionId:Je(t?.slotTransactionId)},loadMode:Je(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,tables:Array.isArray(e?.state?.tables)?ve(e.state.tables):[]}}function fu(t=""){let e=String(t||"").trim();if(!e)return[];let s=[],o=c=>{let d=String(c||"").trim();d&&(s.includes(d)||s.push(d))};(e.match(/```(?:json)?\s*([\s\S]*?)```/gi)||[]).forEach(c=>{let d=c.replace(/^```(?:json)?\s*/i,"").replace(/```$/i,"").trim();o(d)}),o(e);let n=e.indexOf("{"),a=e.lastIndexOf("}");n>=0&&a>n&&o(e.slice(n,a+1));let i=e.indexOf("["),l=e.lastIndexOf("]");return i>=0&&l>i&&o(e.slice(i,l+1)),s}function mu(t){if(Array.isArray(t))return t;if(t&&typeof t=="object"){if(Array.isArray(t.tables))return t.tables;if(t.data&&typeof t.data=="object"&&Array.isArray(t.data.tables))return t.data.tables}return null}function bu(t=""){let e=fu(t),s=[];for(let o of e)try{let r=JSON.parse(o),n=mu(r);if(!Array.isArray(n)){s.push("JSON \u4E2D\u7F3A\u5C11 tables \u6570\u7EC4\u3002");continue}return{tables:ve(n),parsed:r}}catch(r){s.push(r?.message||String(r))}throw new Error(s[0]||"\u65E0\u6CD5\u4ECE\u6A21\u578B\u54CD\u5E94\u4E2D\u89E3\u6790 tables JSON\u3002")}async function hu({executionContext:t,targetSnapshot:e,loadResult:s,config:o,assistantSnapshot:r}={}){let n=Ve(o),a=vi(n),i=gu(e,s),l=Array.isArray(r?.tableState?.tables)?ve(r.tableState.tables):[],c={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:Bi(t?.chatHistory||t?.chatMessages||[]),rawRecentMessagesText:Bi(t?.chatHistory||t?.chatMessages||[],20),injectedContext:r?.injectedContext||Pe.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(i,null,2),extractedContent:JSON.stringify(i,null,2),previousToolOutput:JSON.stringify(l,null,2)},d=await Ut.buildToolMessages(a,c),u=await Ut.buildPromptText(a,c);if(!Array.isArray(d)||d.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:a,context:c,requestPayload:i,promptText:u,messages:d}}async function xu(t,e={},s=null){let o=Ve(e),r=Je(o.apiPreset,"");if(r){if(!bs(r))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${r}`);return hr(r,t,{},s)}return hs(t,{},s)}async function Ui(t=null){let e=Ve(t||Kt()),s=bn(e);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors};let o=e.runtime||{},r=Date.now();qo({lastStatus:Fs.RUNNING,lastError:""});try{let n=await Nt({runSource:ot.MANUAL}),a=Go(n,{runSource:ot.MANUAL});if(!a)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");let i=await Oi(a);if(!i?.success)throw new Error(i?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");let l=Xo(a.sourceMessageId),c=Jo(a,{templateTables:e.tables}),d=await hu({executionContext:n,targetSnapshot:a,loadResult:c,config:e,assistantSnapshot:l}),u=await xu(d.messages,e),m=bu(u),p=await Li({targetSnapshot:a,nextTables:m.tables,config:e,loadResult:c});if(!p?.success)throw new Error(p?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let f=Date.now()-r;return qo({lastStatus:Fs.SUCCESS,lastRunAt:Date.now(),lastDurationMs:f,lastError:"",successCount:(Number(o.successCount)||0)+1,errorCount:Number(o.errorCount)||0,lastSourceMessageId:Je(a.sourceMessageId),lastSlotRevisionKey:Je(a.slotRevisionKey),lastLoadMode:Je(c.loadMode),lastMirrorApplied:p?.mirrorResult?.success===!0}),{success:!0,targetSnapshot:a,loadResult:c,request:d,responseText:u,parsed:m,state:p.state,bindings:p.bindings,mirrorResult:p.mirrorResult,warning:p.warning||""}}catch(n){let a=Date.now()-r;return qo({lastStatus:Fs.ERROR,lastRunAt:Date.now(),lastDurationMs:a,lastError:n?.message||String(n),successCount:Number(o.successCount)||0,errorCount:(Number(o.errorCount)||0)+1}),{success:!1,error:n?.message||String(n)}}}var zi=O(()=>{os();Bt();xs();$o();us();Vo();Qo();Ks();Ni()});function er(){return wi({apiPresets:xt()})}function Fi(t){return Number.isFinite(t)&&t>0?new Date(t).toLocaleString():"\u672A\u8BB0\u5F55"}function Zo(t){try{return JSON.stringify(t,null,2)}catch{return String(t??"")}}function Sn(t){if(!$()||!D(t))return;let s=er(),{values:o,errors:r}=xn(t,s),n=t.find("[data-table-workbench-preview]");if(n.length){if(r.length>0){n.text(r.join(`
`));return}n.text(Zo(o.tables||[]))}}function wu(t={}){let e=t.runtime||{},s=Array.isArray(t.tables)?t.tables.length:0,o=t.mirrorToMessage===!0?"\u6B63\u6587\u955C\u50CF\u5F00\u542F":"\u6B63\u6587\u955C\u50CF\u5173\u95ED";return`
    <div class="yyt-tool-panel-hero">
      <div class="yyt-tool-panel-hero-copy">
        <div class="yyt-table-workbench-panel-kicker">Table Workbench</div>
        <div class="yyt-tool-panel-hero-title">\u586B\u8868\u5DE5\u4F5C\u53F0</div>
        <div class="yyt-tool-panel-hero-desc">\u56F4\u7ED5\u5F53\u524D assistant \u76EE\u6807\u5B89\u5168\u5730\u6574\u7406\u8868\u5B9A\u4E49\u3001\u63D0\u793A\u8BCD\u4E0E\u6267\u884C\u8BCA\u65AD\u3002\u6BCF\u6B21\u8FD0\u884C\u90FD\u4F1A\u91CD\u65B0\u89E3\u6790\u76EE\u6807\u6D88\u606F\uFF0C\u5E76\u5E26\u7740 revision \u6821\u9A8C\u5B8C\u6210\u7ED3\u6784\u5316\u5199\u56DE\u3002</div>
      </div>
      <div class="yyt-tool-panel-hero-tags">
        <span class="yyt-tool-hero-chip">${s} \u5F20\u8868</span>
        <span class="yyt-tool-hero-chip">\u624B\u52A8\u6267\u884C</span>
        <span class="yyt-tool-hero-chip">revision-safe</span>
        <span class="yyt-tool-hero-chip">${b(o)}</span>
        <span class="yyt-tool-hero-chip">\u72B6\u6001 ${b(e.lastStatus||"idle")}</span>
        <div class="yyt-tool-panel-hero-actions">
          <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-table-workbench-action="save-top">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
          </button>
        </div>
      </div>
    </div>
  `}function Tu(t={}){let e=t.runtime||{},s=String(e.lastStatus||"idle").toLowerCase(),o=e.lastError?`
    <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
      <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
      <span class="yyt-tool-runtime-value">${b(e.lastError)}</span>
    </div>
  `:"";return`
    <div class="yyt-tool-runtime-card">
      <div class="yyt-table-workbench-panel-copy">
        <div class="yyt-table-workbench-panel-kicker">Runtime</div>
        <div class="yyt-table-workbench-panel-title">\u8FD0\u884C\u6458\u8981</div>
        <div class="yyt-table-workbench-panel-desc">\u8BB0\u5F55\u6700\u8FD1\u4E00\u6B21\u624B\u52A8\u586B\u8868\u7684\u76EE\u6807\u3001revision \u4E0E\u5199\u56DE\u7ED3\u679C\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u5224\u65AD\u662F\u5426\u547D\u4E2D\u6B63\u786E assistant slot\u3002</div>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">\u5F53\u524D\u72B6\u6001</span>
        <span class="yyt-tool-runtime-badge yyt-status-${b(s)}">${b(e.lastStatus||"idle")}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tool-runtime-value">${b(Fi(e.lastRunAt))}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">\u8017\u65F6</span>
        <span class="yyt-tool-runtime-value">${e.lastDurationMs?`${e.lastDurationMs} ms`:"\u672A\u8BB0\u5F55"}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
        <span class="yyt-tool-runtime-value">${Number(e.successCount)||0} / ${Number(e.errorCount)||0}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">\u6700\u8FD1\u76EE\u6807</span>
        <span class="yyt-tool-runtime-value">${b(e.lastSourceMessageId||"\u672A\u8BB0\u5F55")}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">\u6700\u8FD1 revision</span>
        <span class="yyt-tool-runtime-value">${b(e.lastSlotRevisionKey||"\u672A\u8BB0\u5F55")}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">loadMode</span>
        <span class="yyt-tool-runtime-value">${b(e.lastLoadMode||"\u672A\u8BB0\u5F55")}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">\u6B63\u6587\u955C\u50CF</span>
        <span class="yyt-tool-runtime-value">${e.lastMirrorApplied===!0?"\u5DF2\u6267\u884C":"\u672A\u6267\u884C"}</span>
      </div>
      ${o}
    </div>
  `}function Su(t={}){let e=er(),s=Ne.getVariableHelp();return`
    <div class="yyt-tool-panel" data-tool-id="tableWorkbench">
      ${wu(t)}
      <div class="yyt-table-workbench-grid">
        <div class="yyt-table-workbench-stack">
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-sliders"></i>
              <span>\u5DE5\u4F5C\u53F0\u914D\u7F6E</span>
            </div>
            <div class="yyt-table-workbench-panel-copy">
              <div class="yyt-table-workbench-panel-kicker">Setup</div>
              <div class="yyt-table-workbench-panel-title">\u8868\u5B9A\u4E49\u4E0E\u8BF7\u6C42\u6A21\u677F</div>
              <div class="yyt-table-workbench-panel-desc">\u5728\u8FD9\u91CC\u7EF4\u62A4 tables \u8349\u7A3F\u3001promptTemplate \u4E0E\u5199\u56DE\u7B56\u7565\u3002\u4FDD\u5B58\u540E\u624D\u4F1A\u66F4\u65B0\u8FD0\u884C\u65F6\u914D\u7F6E\uFF0C\u5E76\u4F5C\u4E3A\u540E\u7EED\u6267\u884C\u7684 merge base\u3002</div>
            </div>
            ${ki(e,t)}
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-hand-pointer"></i>
              <span>\u624B\u52A8\u6267\u884C</span>
            </div>
            <div class="yyt-tool-manual-area">
              <div class="yyt-tool-runtime-card">
                <div class="yyt-table-workbench-panel-copy">
                  <div class="yyt-table-workbench-panel-kicker">Pipeline</div>
                  <div class="yyt-table-workbench-panel-title">\u6267\u884C\u94FE\u8DEF</div>
                  <div class="yyt-table-workbench-panel-desc">\u6BCF\u6B21\u6267\u884C\u90FD\u4F1A\u91CD\u65B0\u89E3\u6790\u5F53\u524D assistant \u76EE\u6807\uFF0C\u5E76\u5728 commit \u524D\u6821\u9A8C revision\uFF0C\u907F\u514D\u628A tables \u5199\u5230\u65E7 slot \u6216\u65E7 swipe\u3002</div>
                </div>
                <div class="yyt-table-workbench-flow">
                  <span class="yyt-tool-hero-chip">fresh target</span>
                  <span class="yyt-tool-hero-chip">load state/template</span>
                  <span class="yyt-tool-hero-chip">build request</span>
                  <span class="yyt-tool-hero-chip">parse tables</span>
                  <span class="yyt-tool-hero-chip">commit state</span>
                </div>
              </div>
              <div class="yyt-tool-manual-actions">
                <div class="yyt-table-workbench-action-stack">
                  <div class="yyt-table-workbench-action-primary">
                    <div class="yyt-table-workbench-action-title">\u4E3B\u64CD\u4F5C</div>
                    <div class="yyt-table-workbench-action-subtitle">\u786E\u8BA4\u914D\u7F6E\u65E0\u8BEF\u540E\uFF0C\u76F4\u63A5\u5BF9\u5F53\u524D assistant \u76EE\u6807\u6267\u884C\u4E00\u6B21\u5B89\u5168\u5199\u56DE\u3002</div>
                    <button class="yyt-btn yyt-btn-primary" data-table-workbench-action="run">
                      <i class="fa-solid fa-play"></i> \u7ACB\u5373\u624B\u52A8\u586B\u8868
                    </button>
                  </div>
                  <div class="yyt-table-workbench-action-secondary">
                    <button class="yyt-btn yyt-btn-secondary" data-table-workbench-action="save">
                      <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
                    </button>
                    <button class="yyt-btn yyt-btn-secondary" data-table-workbench-action="refresh">
                      <i class="fa-solid fa-rotate"></i> \u5237\u65B0\u76EE\u6807\u8BCA\u65AD
                    </button>
                  </div>
                </div>
                <div class="yyt-table-workbench-action-hint">\u63A8\u8350\u987A\u5E8F\uFF1A\u5148\u4FDD\u5B58\u914D\u7F6E\uFF0C\u518D\u5237\u65B0\u8BCA\u65AD\uFF0C\u6700\u540E\u6267\u884C\u4E00\u6B21\u624B\u52A8\u586B\u8868\uFF0C\u786E\u8BA4 writeback \u547D\u4E2D\u5F53\u524D\u76EE\u6807\u6D88\u606F\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-code"></i>
              <span>\u53EF\u7528\u53D8\u91CF</span>
            </div>
            <div class="yyt-table-workbench-panel-copy">
              <div class="yyt-table-workbench-panel-kicker">Reference</div>
              <div class="yyt-table-workbench-panel-title">\u6A21\u677F\u8F85\u52A9\u901F\u67E5</div>
              <div class="yyt-table-workbench-panel-desc">\u8FD9\u4E9B\u53D8\u91CF\u53EF\u76F4\u63A5\u7528\u4E8E promptTemplate\uFF0C\u5E2E\u52A9\u6A21\u578B\u7ED3\u5408\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5DF2\u6709\u8868\u683C\u72B6\u6001\u751F\u6210\u7ED3\u6784\u5316\u66F4\u65B0\u3002</div>
            </div>
            <pre class="yyt-table-workbench-pre">${b(s)}</pre>
          </div>
        </div>

        <div class="yyt-table-workbench-stack">
          ${Tu(t)}

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-crosshairs"></i>
              <span>\u5F53\u524D\u76EE\u6807\u8BCA\u65AD</span>
            </div>
            <div class="yyt-table-workbench-panel-copy">
              <div class="yyt-table-workbench-panel-kicker">Target</div>
              <div class="yyt-table-workbench-panel-title">\u76EE\u6807\u5B9A\u4F4D</div>
              <div class="yyt-table-workbench-panel-desc">\u663E\u793A\u5F53\u524D assistant message / swipe / slot \u952E\uFF0C\u4FBF\u4E8E\u5728\u6267\u884C\u524D\u786E\u8BA4\u8FD9\u6B21\u5199\u56DE\u4F1A\u843D\u5230\u54EA\u4E00\u4E2A\u4E0A\u4E0B\u6587\u69FD\u4F4D\u3002</div>
            </div>
            <div data-table-workbench-target class="yyt-table-workbench-empty-state">\u6B63\u5728\u8BFB\u53D6\u5F53\u524D assistant \u76EE\u6807...</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>\u5F53\u524D\u52A0\u8F7D\u7ED3\u679C</span>
            </div>
            <div class="yyt-table-workbench-panel-copy">
              <div class="yyt-table-workbench-panel-kicker">State</div>
              <div class="yyt-table-workbench-panel-title">\u72B6\u6001\u6765\u6E90</div>
              <div class="yyt-table-workbench-panel-desc">\u5C55\u793A\u5F53\u524D\u662F\u7EE7\u7EED\u6CBF\u7528 bound state\uFF0C\u8FD8\u662F\u56E0\u4E3A\u76EE\u6807\u5C1A\u65E0\u7ED1\u5B9A\u8BB0\u5F55\u800C\u56DE\u9000\u5230\u6A21\u677F tables\u3002</div>
            </div>
            <div data-table-workbench-load class="yyt-table-workbench-empty-state">\u7B49\u5F85\u8BCA\u65AD\u7ED3\u679C...</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-table"></i>
              <span>tables \u9884\u89C8</span>
            </div>
            <div class="yyt-table-workbench-panel-copy">
              <div class="yyt-table-workbench-panel-kicker">Preview</div>
              <div class="yyt-table-workbench-panel-title">\u5F53\u524D\u7F16\u8BD1\u7ED3\u679C</div>
              <div class="yyt-table-workbench-panel-desc">\u8FD9\u91CC\u5C55\u793A\u5F53\u524D\u5C06\u7528\u4E8E\u6267\u884C\u6216\u56DE\u9000\u7684 tables JSON\uFF0C\u53EF\u5728\u8FD0\u884C\u524D\u5FEB\u901F\u786E\u8BA4\u7ED3\u6784\u3001\u5B57\u6BB5\u548C\u884C\u5185\u5BB9\u3002</div>
            </div>
            <pre class="yyt-table-workbench-pre" data-table-workbench-preview>${b(Zo(t.tables||[]))}</pre>
          </div>
        </div>
      </div>
    </div>
  `}function ji(t=[]){return t.length?`
    <div class="yyt-table-workbench-detail-list">
      ${t.map(e=>`
        <div class="yyt-tool-runtime-line">
          <span class="yyt-tool-runtime-label">${b(e.label||"")}</span>
          <span class="yyt-tool-runtime-value">${b(e.value||"")}</span>
        </div>
      `).join("")}
    </div>
  `:'<div class="yyt-table-workbench-empty-state"><div class="yyt-table-workbench-muted">\u6682\u65E0\u53EF\u663E\u793A\u5185\u5BB9\u3002</div></div>'}async function _u(t){if(!$()||!D(t))return;let s=Kt(),o=t.find("[data-table-workbench-target]"),r=t.find("[data-table-workbench-load]"),n=t.find("[data-table-workbench-preview]");try{let a=await vn();if(!D(t))return;if(!a){o.html('<div class="yyt-table-workbench-muted">\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u3002</div>'),r.html('<div class="yyt-table-workbench-muted">\u5C1A\u672A\u89E3\u6790\u5230\u53EF\u6267\u884C\u76EE\u6807\uFF0C\u56E0\u6B64\u4E0D\u4F1A\u52A0\u8F7D bound state\u3002</div>'),n.text(Zo(s.tables||[]));return}let i=Xo(a.sourceMessageId),l=Jo(a,{templateTables:s.tables}),c=i?.tableBindings||{},d=[{label:"sourceMessageId",value:a.sourceMessageId||"\u672A\u89E3\u6790"},{label:"sourceSwipeId",value:a.sourceSwipeId||a.effectiveSwipeId||"\u672A\u89E3\u6790"},{label:"slotBindingKey",value:a.slotBindingKey||"\u672A\u89E3\u6790"},{label:"slotRevisionKey",value:a.slotRevisionKey||"\u672A\u89E3\u6790"},{label:"slotTransactionId",value:a.slotTransactionId||"\u672A\u89E3\u6790"},{label:"lastResolvedTarget",value:c?.lastResolvedTarget?.slotRevisionKey||"\u672A\u8BB0\u5F55"},{label:"lastCommittedTarget",value:c?.lastCommittedTarget?.slotRevisionKey||"\u672A\u8BB0\u5F55"}],u=[{label:"loadMode",value:l.loadMode||"empty"},{label:"mergeBaseOnly",value:l.mergeBaseOnly===!0?"true":"false"},{label:"tables \u6570\u91CF",value:String(Array.isArray(l.state?.tables)?l.state.tables.length:0)},{label:"state updatedAt",value:Fi(l.state?.updatedAt)}];o.html(ji(d)),r.html(ji(u)),n.text(Zo(l.state?.tables||[]))}catch(a){if(!D(t))return;o.html(`<div class="yyt-table-workbench-muted">${b(a?.message||"\u76EE\u6807\u8BCA\u65AD\u5931\u8D25")}</div>`),r.html('<div class="yyt-table-workbench-muted">\u65E0\u6CD5\u751F\u6210\u52A0\u8F7D\u8BCA\u65AD\u3002</div>')}}function Wi(t,{silent:e=!1}={}){let s=er(),{values:o,errors:r}=xn(t,s);if(Sn(t),r.length>0)return be("warning",r.join(`
`),{duration:4e3,noticeId:"yyt-table-workbench-form-error"}),{success:!1,errors:r};let n=xi(o);return n.success?(e||x("success","\u586B\u8868\u5DE5\u4F5C\u53F0\u914D\u7F6E\u5DF2\u4FDD\u5B58"),n):(x("error",n.error||"\u4FDD\u5B58\u5931\u8D25"),n)}var vu,Ht,_n=O(()=>{ke();Wt();Ii();Bs();ws();Ks();Vo();Qo();zi();vu=`${is}
${Si}
  .yyt-table-workbench-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
    gap: 16px;
  }

  .yyt-table-workbench-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  .yyt-table-workbench-card {
    padding: 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 12px 28px rgba(0, 0, 0, 0.14);
  }

  .yyt-table-workbench-panel-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }

  .yyt-table-workbench-panel-kicker {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(123, 183, 255, 0.2);
    background: rgba(123, 183, 255, 0.08);
    color: var(--yyt-accent-strong);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.38px;
    text-transform: uppercase;
  }

  .yyt-table-workbench-panel-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-panel-desc,
  .yyt-table-workbench-muted {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.68);
  }

  .yyt-table-workbench-flow {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .yyt-table-workbench-flow .yyt-tool-hero-chip {
    background: rgba(255, 255, 255, 0.08);
  }

  .yyt-table-workbench-action-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-workbench-action-primary {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px;
    border-radius: 18px;
    border: 1px solid rgba(123, 183, 255, 0.16);
    background: radial-gradient(280px 120px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 70%), rgba(123, 183, 255, 0.05);
  }

  .yyt-table-workbench-action-title {
    font-size: 12px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-action-subtitle {
    font-size: 11px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.66);
  }

  .yyt-table-workbench-action-secondary {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 4px;
  }

  .yyt-table-workbench-action-hint {
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px dashed rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.72);
  }

  .yyt-table-workbench-detail-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    min-height: 108px;
  }

  .yyt-table-workbench-empty-state {
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px dashed rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.03);
    min-height: 108px;
  }

  .yyt-table-workbench-pre {
    margin: 0;
    padding: 14px;
    border-radius: 16px;
    min-height: 220px;
    max-height: 520px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
    background: rgba(8, 12, 18, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.92);
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
    line-height: 1.7;
  }

  @media (max-width: 1100px) {
    .yyt-table-workbench-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;Ht={id:"tableWorkbenchPanel",render(){return Su(Kt())},bindEvents(t){if(!$()||!D(t))return;let s=this;t.off(".yytTableWorkbench"),t.on("click.yytTableWorkbench",'[data-table-workbench-action="save"], [data-table-workbench-action="save-top"]',()=>{Wi(t,{silent:!1})?.success&&s.renderTo(t)}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="refresh"]',()=>{s.renderTo(t)}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="run"]',async()=>{if(Wi(t,{silent:!0}).success)try{let r=await Ui();r?.success?r.warning?be("warning",`\u586B\u8868\u5DF2\u5B8C\u6210\uFF0C\u4F46\u6B63\u6587\u955C\u50CF\u5931\u8D25\uFF1A${r.warning}`,{duration:4200,noticeId:"yyt-table-workbench-run-result"}):be("success","\u624B\u52A8\u586B\u8868\u5B8C\u6210",{duration:2800,noticeId:"yyt-table-workbench-run-result"}):be("warning",r?.error||"\u624B\u52A8\u586B\u8868\u5931\u8D25",{duration:4e3,noticeId:"yyt-table-workbench-run-result"})}catch(r){x("error",r?.message||"\u624B\u52A8\u586B\u8868\u5931\u8D25")}finally{s.renderTo(t)}})},destroy(t){!$()||!D(t)||t.off(".yytTableWorkbench")},getStyles(){return vu},renderTo(t){!$()||!D(t)||(t.html(this.render({})),Mi(t,er(),{onChange:()=>Sn(t)}),this.bindEvents(t,{}),Sn(t),_u(t))}}});var Zi={};le(Zi,{ApiPresetPanel:()=>je,BypassPanel:()=>Ft,EscapeTransformToolPanel:()=>qe,PunctuationTransformToolPanel:()=>Ge,RegexExtractPanel:()=>We,SCRIPT_ID:()=>y,SettingsPanel:()=>pt,StatusBlockPanel:()=>He,SummaryToolPanel:()=>Ke,TableWorkbenchPanel:()=>Ht,ToolManagePanel:()=>Fe,UIManager:()=>fs,YouyouReviewPanel:()=>Ye,bindDialogEvents:()=>kt,createDialogHtml:()=>Mt,default:()=>Au,downloadJson:()=>it,escapeHtml:()=>b,fillFormWithConfig:()=>Et,getAllStyles:()=>Qi,getFormApiConfig:()=>bt,getJQuery:()=>$,initUI:()=>Ys,isContainerValid:()=>D,readFileContent:()=>lt,registerComponents:()=>ps,renderApiPanel:()=>tr,renderBypassPanel:()=>Vi,renderEscapeTransformToolPanel:()=>qi,renderPunctuationTransformToolPanel:()=>Gi,renderRegexPanel:()=>sr,renderSettingsPanel:()=>Ji,renderStatusBlockPanel:()=>Hi,renderSummaryToolPanel:()=>Ki,renderTableWorkbenchPanel:()=>Xi,renderToolPanel:()=>or,renderYouyouReviewPanel:()=>Yi,resetJQueryCache:()=>Ll,showToast:()=>x,showTopNotice:()=>be,uiManager:()=>Z});function ps(){Z.register(je.id,je),Z.register(We.id,We),Z.register(Fe.id,Fe),Z.register(Ke.id,Ke),Z.register(He.id,He),Z.register(Ye.id,Ye),Z.register(qe.id,qe),Z.register(Ge.id,Ge),Z.register(Ft.id,Ft),Z.register(pt.id,pt),Z.register(Ht.id,Ht),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function Ys(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...o}=t;Z.init(o),ps(),e&&Z.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Xe(t,e,s={}){Z.render(t,e,s)}function tr(t){Xe(je.id,t)}function sr(t){Xe(We.id,t)}function or(t){Xe(Fe.id,t)}function Ki(t){Xe(Ke.id,t)}function Hi(t){Xe(He.id,t)}function Yi(t){Xe(Ye.id,t)}function qi(t){Xe(qe.id,t)}function Gi(t){Xe(Ge.id,t)}function Vi(t){Xe(Ft.id,t)}function Ji(t){Xe(pt.id,t)}function Xi(t){Xe(Ht.id,t)}function Qi(){return Z.getAllStyles()}var Au,An=O(()=>{fr();kr();Dr();Fr();tn();sn();on();nn();an();ln();Fo();_n();ke();fr();kr();Dr();Fr();tn();sn();on();nn();an();ln();Fo();_n();Au={uiManager:Z,ApiPresetPanel:je,RegexExtractPanel:We,ToolManagePanel:Fe,SummaryToolPanel:Ke,StatusBlockPanel:He,YouyouReviewPanel:Ye,EscapeTransformToolPanel:qe,PunctuationTransformToolPanel:Ge,BypassPanel:Ft,SettingsPanel:pt,TableWorkbenchPanel:Ht,registerComponents:ps,initUI:Ys,renderApiPanel:tr,renderRegexPanel:sr,renderToolPanel:or,renderSummaryToolPanel:Ki,renderStatusBlockPanel:Hi,renderYouyouReviewPanel:Yi,renderEscapeTransformToolPanel:qi,renderPunctuationTransformToolPanel:Gi,renderBypassPanel:Vi,renderSettingsPanel:Ji,renderTableWorkbenchPanel:Xi,getAllStyles:Qi}});var ll={};le(ll,{ApiPresetPanel:()=>je,EscapeTransformToolPanel:()=>qe,PunctuationTransformToolPanel:()=>Ge,RegexExtractPanel:()=>We,SCRIPT_ID:()=>y,StatusBlockPanel:()=>He,SummaryToolPanel:()=>Ke,ToolManagePanel:()=>Fe,YouyouReviewPanel:()=>Ye,default:()=>Eu,escapeHtml:()=>b,fillFormWithConfig:()=>Et,getCurrentTab:()=>al,getFormApiConfig:()=>bt,getJQuery:()=>$,getRegexStyles:()=>rl,getStyles:()=>ol,getToolStyles:()=>nl,initUI:()=>Ys,isContainerValid:()=>D,registerComponents:()=>ps,render:()=>el,renderRegex:()=>tl,renderTool:()=>sl,setCurrentTab:()=>il,showToast:()=>x,uiManager:()=>Z});function En(t,e){let s=$();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function el(t){if(qs=En(t,qs),!qs||!qs.length){console.error("[YouYouToolkit] Container not found or invalid");return}tr(qs)}function tl(t){if(Gs=En(t,Gs),!Gs||!Gs.length){console.error("[YouYouToolkit] Regex container not found");return}sr(Gs)}function sl(t){if(Vs=En(t,Vs),!Vs||!Vs.length){console.error("[YouYouToolkit] Tool container not found");return}or(Vs)}function ol(){return je.getStyles()}function rl(){return We.getStyles()}function nl(){return[Fe.getStyles(),Ke.getStyles(),He.getStyles(),Ye.getStyles(),qe.getStyles(),Ge.getStyles()].join(`
`)}function al(){return Z.getCurrentTab()}function il(t){Z.switchTab(t)}var qs,Gs,Vs,Eu,cl=O(()=>{An();qs=null,Gs=null,Vs=null;Eu={render:el,renderRegex:tl,renderTool:sl,getStyles:ol,getRegexStyles:rl,getToolStyles:nl,getCurrentTab:al,setCurrentTab:il,uiManager:Z,ApiPresetPanel:je,RegexExtractPanel:We,ToolManagePanel:Fe,SummaryToolPanel:Ke,StatusBlockPanel:He,YouyouReviewPanel:Ye,EscapeTransformToolPanel:qe,PunctuationTransformToolPanel:Ge,registerComponents:ps,initUI:Ys,SCRIPT_ID:y,escapeHtml:b,showToast:x,getJQuery:$,isContainerValid:D,getFormApiConfig:bt,fillFormWithConfig:Et}});var dl={};le(dl,{DEFAULT_PROMPT_SEGMENTS:()=>rr,PromptEditor:()=>nr,default:()=>Ou,getPromptEditorStyles:()=>Cu,messagesToSegments:()=>Ru,segmentsToMessages:()=>$u,validatePromptSegments:()=>Pu});function Cu(){return`
    /* ============================================================
       \u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6837\u5F0F
       ============================================================ */
    
    .yyt-prompt-editor {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: transparent;
    }
    
    .yyt-prompt-editor-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      flex-shrink: 0;
    }
    
    .yyt-prompt-editor-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .yyt-prompt-editor-title i {
      color: var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-editor-actions {
      display: flex;
      gap: 8px;
    }
    
    .yyt-prompt-segments {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .yyt-prompt-segment {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s ease;
    }
    
    .yyt-prompt-segment:hover {
      border-color: rgba(255, 255, 255, 0.12);
    }
    
    .yyt-prompt-segment.yyt-main-a {
      border-left: 3px solid var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-segment.yyt-main-b {
      border-left: 3px solid #ffb74d;
    }
    
    .yyt-prompt-segment-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.02);
      cursor: pointer;
      user-select: none;
    }
    
    .yyt-prompt-segment-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .yyt-prompt-segment-info > i {
      color: var(--yyt-accent, #7bb7ff);
      font-size: 14px;
    }
    
    .yyt-prompt-segment-title {
      font-weight: 600;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .yyt-prompt-segment-badges {
      display: flex;
      gap: 6px;
      margin-left: 8px;
    }
    
    .yyt-prompt-role-badge,
    .yyt-prompt-slot-badge {
      font-size: 10px;
      padding: 3px 8px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-weight: 500;
    }
    
    .yyt-prompt-role-badge {
      background: rgba(123, 183, 255, 0.1);
      color: var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-slot-badge {
      background: rgba(255, 183, 77, 0.1);
      color: #ffb74d;
    }
    
    .yyt-prompt-segment-controls {
      display: flex;
      gap: 6px;
    }
    
    .yyt-prompt-segment-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    
    .yyt-prompt-segment.yyt-expanded .yyt-prompt-segment-body {
      max-height: 600px;
    }
    
    .yyt-prompt-segment-meta {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    
    .yyt-prompt-segment-meta .yyt-form-row {
      display: flex;
      gap: 12px;
    }
    
    .yyt-prompt-segment-meta .yyt-form-group {
      flex: 1;
    }
    
    .yyt-prompt-segment-meta label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .yyt-prompt-textarea {
      width: 100%;
      min-height: 120px;
      padding: 12px 16px;
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.85);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.6;
      resize: vertical;
    }
    
    .yyt-prompt-textarea:focus {
      outline: none;
    }
    
    .yyt-prompt-textarea::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  `}function Pu(t){let e=[];return Array.isArray(t)?(t.forEach((s,o)=>{s.id||e.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${o+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function $u(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Ru(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...rr]}var Mu,ku,Iu,rr,nr,Ou,ul=O(()=>{Mu="youyou_toolkit_prompt_editor",ku={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Iu={system:"fa-server",ai:"fa-robot",user:"fa-user"},rr=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],nr=class{constructor(e={}){this.containerId=e.containerId||Mu,this.segments=e.segments||[...rr],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...rr],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
      <div class="yyt-prompt-editor" id="${this.containerId}">
        <div class="yyt-prompt-editor-header">
          <div class="yyt-prompt-editor-title">
            <i class="fa-solid fa-file-alt"></i>
            <span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668</span>
          </div>
          <div class="yyt-prompt-editor-actions">
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-add-segment" title="\u6DFB\u52A0\u6BB5\u843D">
              <i class="fa-solid fa-plus"></i> \u6DFB\u52A0
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-import-prompt" title="\u5BFC\u5165">
              <i class="fa-solid fa-file-import"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-export-prompt" title="\u5BFC\u51FA">
              <i class="fa-solid fa-file-export"></i>
            </button>
          </div>
        </div>
        <div class="yyt-prompt-segments">
          ${this.segments.map(s=>this.renderSegment(s)).join("")}
        </div>
      </div>
    `;this.$container.html(e)}renderSegment(e){let s=ku[e.type]||e.type,o=Iu[e.type]||"fa-file",r=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,a=r?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${r?"yyt-main-a":""} ${n?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${a?`border-left: 3px solid ${a};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${o}"></i>
            <span class="yyt-prompt-segment-title">${s}</span>
            <div class="yyt-prompt-segment-badges">
              ${l}
              ${i}
            </div>
          </div>
          <div class="yyt-prompt-segment-controls">
            ${e.deletable!==!1?`
              <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-prompt-delete" title="\u5220\u9664\u6BB5\u843D">
                <i class="fa-solid fa-trash"></i>
              </button>
            `:""}
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-prompt-toggle" title="\u5C55\u5F00/\u6298\u53E0">
              <i class="fa-solid ${e.expanded?"fa-chevron-up":"fa-chevron-down"}"></i>
            </button>
          </div>
        </div>
        <div class="yyt-prompt-segment-body">
          <div class="yyt-prompt-segment-meta">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>Role</label>
                <select class="yyt-select yyt-prompt-role" ${this.editable?"":"disabled"}>
                  <option value="SYSTEM" ${e.role==="SYSTEM"?"selected":""}>SYSTEM</option>
                  <option value="USER" ${e.role==="USER"?"selected":""}>USER</option>
                  <option value="assistant" ${e.role==="assistant"?"selected":""}>assistant</option>
                </select>
              </div>
              ${this.showMainSlot?`
              <div class="yyt-form-group yyt-flex-1">
                <label>Main Slot</label>
                <select class="yyt-select yyt-prompt-main-slot" ${this.editable?"":"disabled"}>
                  <option value="" ${e.mainSlot?"":"selected"}>\u666E\u901A</option>
                  <option value="A" ${e.mainSlot==="A"?"selected":""}>A (\u5EFA\u8BAESystem)</option>
                  <option value="B" ${e.mainSlot==="B"?"selected":""}>B (\u5EFA\u8BAEUser)</option>
                </select>
              </div>
              `:""}
            </div>
          </div>
          <textarea class="yyt-textarea yyt-prompt-textarea" 
                    rows="6" 
                    placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u5185\u5BB9..." 
                    ${this.editable?"":"disabled"}>${this.escapeHtml(e.content||"")}</textarea>
        </div>
      </div>
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:o})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:o})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,o=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};o.id||(o.id=s),this.segments.push(o),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(r=>r.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let o=this.segments.find(r=>r.id===e);o&&(Object.assign(o,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let o=s.target.files[0];if(!o)return;let r=new FileReader;r.onload=n=>{try{let a=JSON.parse(n.target.result);Array.isArray(a)?(this.setSegments(a),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",a)}},r.readAsText(o)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),o=new Blob([s],{type:"application/json"}),r=URL.createObjectURL(o),n=document.createElement("a");n.href=r,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};Ou=nr});var Mn={};le(Mn,{WindowManager:()=>ar,closeWindow:()=>Bu,createWindow:()=>Nu,windowManager:()=>$e});function Lu(){if($e.stylesInjected)return;$e.stylesInjected=!0;let t=`
    /* ============================================================
       YouYou Toolkit - \u72EC\u7ACB\u7A97\u53E3\u7CFB\u7EDF\u6837\u5F0F
       ============================================================ */
    
    .yyt-window-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9999;
      animation: yytWindowFadeIn 0.2s ease-out;
    }
    
    @keyframes yytWindowFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .yyt-window {
      position: fixed;
      display: flex;
      flex-direction: column;
      background:
        radial-gradient(1200px 600px at 10% -10%, var(--yyt-bg-gradient-1, rgba(123, 183, 255, 0.12)), transparent 60%),
        radial-gradient(900px 500px at 100% 0%, var(--yyt-bg-gradient-2, rgba(155, 123, 255, 0.10)), transparent 55%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
        var(--yyt-bg-base, #0b0f15);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 25px 80px rgba(0, 0, 0, 0.65),
        0 0 60px rgba(123, 183, 255, 0.1);
      min-width: 400px;
      min-height: 300px;
      animation: yytWindowSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: rgba(255, 255, 255, 0.92);
    }
    
    @keyframes yytWindowSlideIn {
      from { 
        opacity: 0; 
        transform: scale(0.95) translateY(-20px); 
      }
      to { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }
    
    .yyt-window.maximized {
      top: 10px !important;
      left: 10px !important;
      width: calc(100vw - 20px) !important;
      height: calc(100vh - 20px) !important;
      border-radius: 12px;
    }
    
    /* \u7A84\u5C4F\u6A21\u5F0F */
    @media screen and (max-width: 1100px) {
      .yyt-window.maximized {
        top: 5px !important;
        left: 5px !important;
        width: calc(100vw - 10px) !important;
        height: calc(100vh - 10px) !important;
        border-radius: 8px;
      }
      
      .yyt-window-header {
        padding: 10px 12px;
      }
      
      .yyt-window-controls {
        gap: 6px;
        margin-right: 0;
      }
      
      .yyt-window-btn {
        width: 32px;
        height: 32px;
      }
      
      .yyt-window {
        min-width: 320px;
      }
    }
    
    /* \u8D85\u7A84\u5C4F\u6A21\u5F0F */
    @media screen and (max-width: 768px) {
      .yyt-window {
        min-width: 100vw !important;
        min-height: 100vh !important;
      }
      
      .yyt-window.maximized {
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0;
        border: none;
      }
      
      .yyt-window-header {
        padding: 8px 10px;
        min-height: 44px;
        flex-shrink: 0;
      }
      
      .yyt-window-controls {
        margin-right: 0;
      }
      
      .yyt-window-title {
        font-size: 13px;
      }
      
      .yyt-window-btn {
        width: 36px;
        height: 36px;
        font-size: 16px;
      }
      
      .yyt-window-body {
        max-width: 100vw;
        overflow-x: hidden;
        overflow-y: auto;
        flex: 1 1 0;
        min-height: 0;
      }
    }
    
    .yyt-window-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      cursor: move;
      user-select: none;
      flex-shrink: 0;
    }
    
    .yyt-window-title {
      font-size: 14px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }
    
    .yyt-window-title i {
      color: rgba(123, 183, 255, 0.85);
      flex-shrink: 0;
    }
    
    .yyt-window-title span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .yyt-window-controls {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
      margin-left: 8px;
    }
    
    .yyt-window-btn {
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
    
    .yyt-window-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-window-btn.close:hover {
      background: rgba(255, 107, 107, 0.25);
      color: #ff6b6b;
    }
    
    .yyt-window-body {
      flex: 1 1 0;
      min-height: 0;
      overflow: auto;
      overflow-x: hidden;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
    
    .yyt-window-body > * {
      flex: 1 1 0;
      min-height: 0;
      overflow-y: auto;
      box-sizing: border-box;
    }
    
    /* \u7A97\u53E3\u5927\u5C0F\u8C03\u6574\u624B\u67C4 */
    .yyt-window-resize-handle {
      position: absolute;
      background: transparent;
    }
    
    .yyt-window-resize-handle.se {
      right: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
    }
    
    .yyt-window-resize-handle.se::after {
      content: '';
      position: absolute;
      right: 4px;
      bottom: 4px;
      width: 10px;
      height: 10px;
      border-right: 2px solid rgba(255, 255, 255, 0.25);
      border-bottom: 2px solid rgba(255, 255, 255, 0.25);
    }
    
    .yyt-window-resize-handle.e {
      right: 0;
      top: 40px;
      bottom: 20px;
      width: 6px;
      cursor: e-resize;
    }
    
    .yyt-window-resize-handle.s {
      left: 20px;
      right: 20px;
      bottom: 0;
      height: 6px;
      cursor: s-resize;
    }
    
    .yyt-window-resize-handle.w {
      left: 0;
      top: 40px;
      bottom: 20px;
      width: 6px;
      cursor: w-resize;
    }
    
    .yyt-window-resize-handle.n {
      left: 20px;
      right: 20px;
      top: 0;
      height: 6px;
      cursor: n-resize;
    }
    
    .yyt-window-resize-handle.nw {
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      cursor: nw-resize;
    }
    
    .yyt-window-resize-handle.ne {
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      cursor: ne-resize;
    }
    
    .yyt-window-resize-handle.sw {
      left: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      cursor: sw-resize;
    }
  `,e=document.createElement("style");e.id=Du+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function Nu(t){let{id:e,title:s="\u7A97\u53E3",content:o="",width:r=900,height:n=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:m}=t;Lu();let p=window.jQuery||window.parent?.jQuery;if(!p)return console.error("[WindowManager] jQuery not available"),null;if($e.isOpen(e))return $e.bringToFront(e),$e.getWindow(e);let f=window.innerWidth||1200,v=window.innerHeight||800,w=f<=1100,T=null,I=!1;d&&(T=$e.getState(e),T&&!w&&(I=!0));let E,K;I&&T.width&&T.height?(E=Math.max(400,Math.min(T.width,f-40)),K=Math.max(300,Math.min(T.height,v-40))):(E=Math.max(400,Math.min(r,f-40)),K=Math.max(300,Math.min(n,v-40)));let q=Math.max(20,Math.min((f-E)/2,f-E-20)),ae=Math.max(20,Math.min((v-K)/2,v-K-20)),M=l&&!w,B=`
    <div class="yyt-window" id="${e}" style="left:${q}px; top:${ae}px; width:${E}px; height:${K}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Uu(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${M?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${o}</div>
      ${i?`
        <div class="yyt-window-resize-handle se"></div>
        <div class="yyt-window-resize-handle e"></div>
        <div class="yyt-window-resize-handle s"></div>
        <div class="yyt-window-resize-handle w"></div>
        <div class="yyt-window-resize-handle n"></div>
        <div class="yyt-window-resize-handle nw"></div>
        <div class="yyt-window-resize-handle ne"></div>
        <div class="yyt-window-resize-handle sw"></div>
      `:""}
    </div>
  `,U=null;a&&(U=p(`<div class="yyt-window-overlay" data-for="${e}"></div>`),p(document.body).append(U));let L=p(B);p(document.body).append(L),$e.register(e,L),L.on("mousedown",()=>$e.bringToFront(e));let re=!1,G={left:q,top:ae,width:E,height:K},pe=()=>{G={left:parseInt(L.css("left")),top:parseInt(L.css("top")),width:L.width(),height:L.height()},L.addClass("maximized"),L.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),re=!0},we=()=>{L.removeClass("maximized"),L.css({left:G.left+"px",top:G.top+"px",width:G.width+"px",height:G.height+"px"}),L.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),re=!1};L.find(".yyt-window-btn.maximize").on("click",()=>{re?we():pe()}),(w&&l||I&&T.isMaximized&&l||c&&l)&&pe(),L.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let de={width:re?G.width:L.width(),height:re?G.height:L.height(),isMaximized:re};$e.saveState(e,de)}u&&u(),U&&U.remove(),L.remove(),$e.unregister(e),p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),U&&U.on("click",de=>{de.target,U[0]});let V=!1,ze,yt,nt,Ee;if(L.find(".yyt-window-header").on("mousedown",de=>{p(de.target).closest(".yyt-window-controls").length||re||(V=!0,ze=de.clientX,yt=de.clientY,nt=parseInt(L.css("left")),Ee=parseInt(L.css("top")),p(document.body).css("user-select","none"))}),p(document).on("mousemove.yytWindowDrag"+e,de=>{if(!V)return;let ee=de.clientX-ze,Te=de.clientY-yt;L.css({left:Math.max(0,nt+ee)+"px",top:Math.max(0,Ee+Te)+"px"})}),p(document).on("mouseup.yytWindowDrag"+e,()=>{V&&(V=!1,p(document.body).css("user-select",""))}),i){let de=!1,ee="",Te,St,qt,Gt,g,h;L.find(".yyt-window-resize-handle").on("mousedown",function(S){re||(de=!0,ee="",p(this).hasClass("se")?ee="se":p(this).hasClass("e")?ee="e":p(this).hasClass("s")?ee="s":p(this).hasClass("w")?ee="w":p(this).hasClass("n")?ee="n":p(this).hasClass("nw")?ee="nw":p(this).hasClass("ne")?ee="ne":p(this).hasClass("sw")&&(ee="sw"),Te=S.clientX,St=S.clientY,qt=L.width(),Gt=L.height(),g=parseInt(L.css("left")),h=parseInt(L.css("top")),p(document.body).css("user-select","none"),S.stopPropagation())}),p(document).on("mousemove.yytWindowResize"+e,S=>{if(!de)return;let A=S.clientX-Te,C=S.clientY-St,W=400,F=300,Y=qt,R=Gt,N=g,ye=h;if(ee.includes("e")&&(Y=Math.max(W,qt+A)),ee.includes("s")&&(R=Math.max(F,Gt+C)),ee.includes("w")){let ge=qt-A;ge>=W&&(Y=ge,N=g+A)}if(ee.includes("n")){let ge=Gt-C;ge>=F&&(R=ge,ye=h+C)}L.css({width:Y+"px",height:R+"px",left:N+"px",top:ye+"px"})}),p(document).on("mouseup.yytWindowResize"+e,()=>{de&&(de=!1,p(document.body).css("user-select",""))})}return L.on("remove",()=>{p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),m&&setTimeout(()=>m(L),50),L}function Bu(t){let e=$e.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),$e.unregister(t)}}function Uu(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Du,pl,ar,$e,kn=O(()=>{Re();Du="youyou_toolkit_window_manager",pl="window_states",ar=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let o=this.loadStates();o[e]={...s,updatedAt:Date.now()},ys.set(pl,o)}loadStates(){return ys.get(pl)||{}}getState(e){return this.loadStates()[e]||null}},$e=new ar});var hl={};le(hl,{TX_PHASE:()=>Ue,ToolAutomationService:()=>cr,Transaction:()=>lr,default:()=>Gu,toolAutomationService:()=>bl});function fe(t){return t==null?"":String(t).trim()}function Cn(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function yl(){return Cn()?.SillyTavern||null}function dr(t){try{return t?.getContext?.()||null}catch{return null}}function In(t,e){if(!t)return null;let s=typeof t?.on=="function"||typeof t?.addListener=="function",o=typeof t?.off=="function"||typeof t?.removeListener=="function";return!s||!o?null:{eventSource:t,source:e,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function zu(t){let e=Cn(),s=dr(t);return[In(t?.eventSource,"SillyTavern.eventSource"),In(e?.eventSource,"topWindow.eventSource"),In(s?.eventSource,"SillyTavern.getContext().eventSource")].filter(Boolean)[0]||{eventSource:null,source:"unavailable",capabilities:{on:!1,off:!1,addListener:!1,removeListener:!1}}}function ju(t){let e=dr(t);return t?.eventTypes||e?.eventTypes||Cn()?.event_types||{}}function gl(t){let e=dr(t);return fe(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function fl(t){let e=dr(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function ml(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function Wu(t,e){let s=fe(e);if(!s)return null;let o=fl(t);for(let r=o.length-1;r>=0;r-=1){let n=o[r];if([n?.messageId,n?.message_id,n?.id,n?.mesid,n?.mid,n?.chat_index,r].map(i=>fe(i)).includes(s))return n||null}return null}function Fu(t){let e=fl(t);if(!Array.isArray(e)||e.length===0)return null;let s=e.length-1,o=e[s]||null;if(!ml(o))return null;let r=fe(o?.messageId??o?.message_id??o?.id??o?.mesid??o?.mid??o?.chat_index??s);return r?{messageId:r,swipeId:fe(o?.swipeId??o?.swipe_id??o?.swipe??o?.swipeIndex),message:o}:null}function ir(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function Ku(t){let e=String(t||"");if(e.length===0)return"0";let s=5381,o=Math.min(e.length,2e3);for(let r=0;r<o;r++)s=(s<<5)+s+e.charCodeAt(r)|0;return(s>>>0).toString(36)}function Hu(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}function qu(t){return Yu.has(ir(t))}var Ue,Yu,lr,cr,bl,Gu,xl=O(()=>{Ls();me();wt();Do();os();Ue=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Yu=new Set(["MESSAGE_SWIPED","GENERATION_AFTER_COMMANDS","GENERATION_ENDED"]);lr=class{constructor({chatId:e,messageId:s,swipeId:o,sourceEvent:r,generationKey:n}){this.traceId=Hu(),this.chatId=e||"",this.messageId=s||"",this.swipeId=o||"",this.sourceEvent=r||"",this.generationKey=n||"",this.phase=Ue.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,s={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,s),this}toSnapshot(){return{...this}}},cr=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._completedGenerationKeys=new Map,this._slotQueues=new Map,this._currentChatId="",this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._initRetryTimer=null}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop();let s=yl(),o=e.retryOnFailure!==!1,r=Number.isFinite(e.retryDelayMs)?e.retryDelayMs:1500,n=Number.isFinite(e.attempt)?e.attempt:1;if(this._hostBindingStatus.initAttempts=n,this._hostBindingStatus.lastInitAt=Date.now(),!s)return this._hostBindingStatus={...this._hostBindingStatus,initialized:!1,lastInitResult:"missing_api",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],lastError:"\u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)",retryScheduled:!1,retryDelayMs:0},this._log("\u521D\u59CB\u5316\u5931\u8D25: \u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)"),!1;this._currentChatId=gl(s);let a=zu(s),i=a?.eventSource||null,l=ju(s),c=typeof i?.on=="function"?i.on.bind(i):typeof i?.addListener=="function"?i.addListener.bind(i):null,d=typeof i?.off=="function"?i.off.bind(i):typeof i?.removeListener=="function"?i.removeListener.bind(i):null,u=!!(l&&Object.keys(l).length>0);if(this._hostBindingStatus={...this._hostBindingStatus,source:a?.source||"unavailable",hasEventSource:!!i,hasEventTypes:u,eventBindings:[],lastError:"",retryScheduled:!1,retryDelayMs:0,initialized:!1,lastInitResult:"binding"},!c||!d){let f="\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5";return this._hostBindingStatus={...this._hostBindingStatus,lastInitResult:"missing_event_source",lastError:f},this._log(`\u521D\u59CB\u5316\u5931\u8D25: ${f}`,{source:this._hostBindingStatus.source}),o&&this._scheduleInitRetry(r,n+1),!1}this._log("\u5BBF\u4E3B eventTypes \u6620\u5C04:",JSON.stringify(l,null,2));let m=(f,v)=>{if(!f||typeof v!="function")return;let w=f;c(w,v),this._hostBindingStatus.eventBindings=[...this._hostBindingStatus.eventBindings,`${w} -> ${ir(w)}`],this._stopCallbacks.push(()=>{try{d(w,v)}catch(T){this._log("\u53D6\u6D88\u4E8B\u4EF6\u5931\u8D25",w,T)}}),this._log(`\u5DF2\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${w}" (\u5F52\u4E00\u5316: ${ir(w)})`)},p=(f,...v)=>{let w=ir(f),{messageId:T,swipeId:I}=this._extractIdentitiesFromArgs(v);if(this._log(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${f}" \u2192 "${w}"`,{messageId:T,swipeId:I,argCount:v.length}),!!this._checkEnabled()){if(T){let E=Wu(s,T);if(E&&!ml(E)){this._log(`\u4E8B\u4EF6 "${w}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:T});return}this._scheduleMessageProcessing(T,I,{settleMs:this._getSettleMs(),sourceEvent:w});return}if(qu(w)){let E=Fu(s);E?.messageId?this._scheduleMessageProcessing(E.messageId,E.swipeId,{settleMs:this._getSettleMs(),sourceEvent:w}):this._log(`\u4E8B\u4EF6 "${w}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7 fallback`);return}this._log(`\u4E8B\u4EF6 "${w}" \u65E0 messageId \u4E14\u975E same-slot \u7C7B\u578B\uFF0C\u8DF3\u8FC7`)}};return m(l.MESSAGE_SENT||"message_sent",()=>{this._log("MESSAGE_SENT \u2192 \u91CD\u7F6E extra analysis \u72B6\u6001"),this._isDuringExtraAnalysis=!1,this._pendingTimers.forEach(f=>clearTimeout(f)),this._pendingTimers.clear()}),m(l.MESSAGE_RECEIVED||"message_received",(...f)=>{p(l.MESSAGE_RECEIVED||"message_received",...f)}),m(l.MESSAGE_SWIPED||"message_swiped",(...f)=>{p(l.MESSAGE_SWIPED||"message_swiped",...f)}),m(l.GENERATION_AFTER_COMMANDS||"generation_after_commands",(...f)=>{p(l.GENERATION_AFTER_COMMANDS||"generation_after_commands",...f)}),m(l.GENERATION_ENDED||"generation_ended",(...f)=>{p(l.GENERATION_ENDED||"generation_ended",...f)}),m(l.CHAT_CHANGED||"chat_changed",()=>{this._resetForChatChange()}),m(l.MESSAGE_DELETED||"message_deleted",f=>{this._clearMessageState(fe(f))}),this._stopCallbacks.push(P.on(k.SETTINGS_UPDATED,()=>{let f=this._enabled;this._enabled=this._evaluateEnabled(),f!==this._enabled&&this._log(`\u81EA\u52A8\u5316\u72B6\u6001\u53D8\u66F4: ${f} \u2192 ${this._enabled}`)})),this._enabled=this._evaluateEnabled(),this._enabledCheckedOnce=!1,this._hostBindingStatus={...this._hostBindingStatus,initialized:!0,lastInitResult:"ready",retryScheduled:!1,retryDelayMs:0,lastError:""},this._log("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{enabled:this._enabled,chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(s){this._log("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",s)}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this._initRetryTimer&&(clearTimeout(this._initRetryTimer),this._initRetryTimer=null),this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return this._enabled}getRuntimeSnapshot(){return this._pruneCompletedKeys(),{currentChatId:this._currentChatId,enabled:this._enabled,isDuringExtraAnalysis:this._isDuringExtraAnalysis,isProcessingMessage:this._isProcessingMessage,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,completedGenerationKeyCount:this._completedGenerationKeys.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let s=await Ps({messageId:"",swipeId:"",runSource:"AUTO"}),o=fe(s?.sourceMessageId||s?.messageId);return o?this.processAssistantMessage(o,{force:e.force===!0,swipeId:fe(s?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:s=!1,swipeId:o="",sourceEvent:r="AUTO"}={}){let n=new lr({chatId:this._currentChatId,messageId:e,swipeId:o,sourceEvent:r});try{if(!e)return this._skipTransaction(n,"missing_message_id");if(!this._checkEnabled()&&!s)return this._skipTransaction(n,"automation_disabled");if(this._isDuringExtraAnalysis&&!s&&r!=="MESSAGE_SWIPED"&&!r.includes("GENERATION"))return this._skipTransaction(n,"during_extra_analysis");n.transition(Ue.CONFIRMED);let a=await Ps({messageId:e,swipeId:o,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition(Ue.CONTEXT_BUILT);let c=Ku(l),d=`${fe(a.sourceMessageId)}::${c}`;if(n.generationKey=d,!s&&this._hasCompletedGeneration(d))return this._skipTransaction(n,"duplicate_generation",{generationKey:d});let u=st.filterAutoPostResponseTools(Cs());if(!u.length)return this._skipTransaction(n,"no_auto_tools");let m=`${fe(a.sourceMessageId)}::${fe(a.sourceSwipeId||o)}`;return this._enqueueSlot(m,async()=>{if(this._hasCompletedGeneration(d)&&!s)return this._skipTransaction(n,"duplicate_generation_after_queue",{generationKey:d});this._isProcessingMessage=!0,this._isDuringExtraAnalysis=!0,n.transition(Ue.REQUEST_STARTED);try{let p=[],f=!1;for(let T of u){let I={...a,input:{...a.input||{},lastAiMessage:a.lastAiMessage,assistantBaseText:a.assistantBaseText}},E=await st.runToolPostResponse(T,I);p.push(E),(E?.writebackState||E?.output)&&(f=!0)}n.transition(Ue.REQUEST_FINISHED,{toolResults:p}),f&&(n.transition(Ue.WRITEBACK_STARTED),n.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0}),this._markGenerationCompleted(d);let v=p.every(T=>T?.success!==!1);v&&n.transition(Ue.WRITEBACK_COMMITTED);let w=v?Ue.REFRESH_CONFIRMED:Ue.FAILED;return n.transition(w,{verdict:v?"success":"partial_failure"}),this._recordTransaction(n),{success:v,traceId:n.traceId,generationKey:d,sourceEvent:r,messageId:a.sourceMessageId||e,phase:n.phase,results:p}}finally{this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1}})}catch(a){return n.transition(Ue.FAILED,{error:a?.message||String(a)}),this._recordTransaction(n),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._log("processAssistantMessage \u5F02\u5E38",a),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let s="",o="";for(let r of e)if(r!=null){if(typeof r=="number"&&Number.isFinite(r)&&!s){s=fe(r);continue}if(typeof r=="string"){let n=fe(r);!s&&/^\d+$/.test(n)&&(s=n);continue}typeof r=="object"&&(s||(s=fe(r.messageId??r.message_id??r.id??r.mesid??r.chat_index??r.message?.messageId??r.message?.message_id??r.message?.id??r.message?.mesid??r.message?.chat_index??r.data?.messageId??r.data?.message_id??r.data?.id??r.target?.messageId??r.target?.message_id??r.target?.id)),o||(o=fe(r.swipeId??r.swipe_id??r.swipe??r.swipeIndex??r.currentSwipe??r.message?.swipeId??r.message?.swipe_id??r.message?.swipe??r.data?.swipeId??r.data?.swipe_id??r.data?.swipe??r.target?.swipeId??r.target?.swipe_id??r.target?.swipe)))}return{messageId:s,swipeId:o}}_scheduleMessageProcessing(e,s="",o={}){let r=o.settleMs??this._getSettleMs(),n=`msg::${fe(e)}::${fe(s)}`,a=this._pendingTimers.get(n);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:s,sourceEvent:o.sourceEvent||"AUTO"}).catch(l=>{this._log("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,r));this._pendingTimers.set(n,i),this._log("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:r,sourceEvent:o.sourceEvent})}_scheduleCurrentAssistantProcessing(e={}){let s=e.settleMs??this._getSettleMs(),o=e.sourceEvent||"CURRENT_ASSISTANT_FALLBACK",r=`current::${o}`,n=this._pendingTimers.get(r);n&&clearTimeout(n);let a=setTimeout(()=>{this._pendingTimers.delete(r),this.processCurrentAssistantMessage({sourceEvent:o}).catch(i=>{this._log("\u5F53\u524D assistant \u5904\u7406\u5931\u8D25",i)})},Math.max(0,s));this._pendingTimers.set(r,a),this._log("\u5DF2\u8C03\u5EA6\u5F53\u524D assistant \u5904\u7406",{timerKey:r,settleMs:s,sourceEvent:o})}_hasCompletedGeneration(e){if(!e)return!1;this._pruneCompletedKeys();let s=this._completedGenerationKeys.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_markGenerationCompleted(e){e&&(this._completedGenerationKeys.set(e,Date.now()),this._pruneCompletedKeys())}_pruneCompletedKeys(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,o]of this._completedGenerationKeys)(!Number.isFinite(o)||o<e)&&this._completedGenerationKeys.delete(s)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),this._log(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,s,o={}){return e.transition(Ue.SKIPPED,{verdict:s,...o}),this._recordTransaction(e),{success:!1,skipped:!0,reason:s,traceId:e.traceId,...o}}_enqueueSlot(e,s){let r=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(s).finally(()=>{this._slotQueues.get(e)===r&&this._slotQueues.delete(e)});return this._slotQueues.set(e,r),r}_resetForChatChange(){let e=yl(),s=gl(e);this._log("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:s}),this._currentChatId=s,this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1}_scheduleInitRetry(e,s){this._initRetryTimer&&clearTimeout(this._initRetryTimer),this._hostBindingStatus={...this._hostBindingStatus,retryScheduled:!0,retryDelayMs:e},this._initRetryTimer=setTimeout(()=>{this._initRetryTimer=null,this.init({retryOnFailure:!1,retryDelayMs:e,attempt:s})},Math.max(200,e))}_clearMessageState(e){if(e){for(let[s,o]of this._pendingTimers)(s.includes(`::${e}::`)||s.startsWith(`msg::${e}::`))&&(clearTimeout(o),this._pendingTimers.delete(s));for(let s of this._completedGenerationKeys.keys())s.startsWith(`${e}::`)&&this._completedGenerationKeys.delete(s)}}_evaluateEnabled(){return this._getAutomationSettings().enabled===!0}_checkEnabled(){if(this._enabled)return!0;if(!this._enabledCheckedOnce){this._enabledCheckedOnce=!0;let e=this._getAutomationSettings();this._log("\u26A0 \u81EA\u52A8\u5316\u672A\u542F\u7528\uFF0C\u9996\u6B21\u8BCA\u65AD:",{"automation.enabled":e.enabled,"\u5B8C\u6574 automation \u8BBE\u7F6E":e,\u63D0\u793A:"\u8BF7\u786E\u4FDD settings.automation.enabled === true"})}return!1}_getAutomationSettings(){let e=Ce.getSettings()?.automation||{},s=Number.isFinite(e.settleMs)?e.settleMs:800;return{enabled:e.enabled===!0,settleMs:s,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(1200,s+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}_log(...e){(this.debugMode||Ce.getDebugSettings?.()?.enableDebugLog)&&console.log("[ToolAutomation]",...e)}},bl=new cr,Gu=bl});function vl(t,e={}){let{constants:s,topLevelWindow:o,modules:r}=t,{SCRIPT_ID:n,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=s,c=null,d=!1,u=new Map,m={storageModule:()=>Promise.resolve().then(()=>(yr(),pr)),uiComponentsModule:()=>Promise.resolve().then(()=>(cl(),ll)),promptEditorModule:()=>Promise.resolve().then(()=>(ul(),dl)),toolExecutorModule:()=>Promise.resolve().then(()=>(Bo(),No)),windowManagerModule:()=>Promise.resolve().then(()=>(kn(),Mn))};function p(...M){console.log(`[${n}]`,...M)}function f(...M){console.error(`[${n}]`,...M)}async function v(M){return!M||!m[M]?null:r[M]?r[M]:(u.has(M)||u.set(M,(async()=>{try{let B=await m[M]();return r[M]=B,B}catch(B){throw u.delete(M),B}})()),u.get(M))}async function w(){return c||(c=(async()=>{try{return r.storageModule=await Promise.resolve().then(()=>(yr(),pr)),r.apiConnectionModule=await Promise.resolve().then(()=>(xs(),jn)),r.presetManagerModule=await Promise.resolve().then(()=>(ws(),Hn)),r.uiModule=await Promise.resolve().then(()=>(An(),Zi)),r.regexExtractorModule=await Promise.resolve().then(()=>(go(),oa)),r.toolManagerModule=await Promise.resolve().then(()=>(So(),ua)),r.toolExecutorModule=await Promise.resolve().then(()=>(Bo(),No)),r.windowManagerModule=await Promise.resolve().then(()=>(kn(),Mn)),r.toolRegistryModule=await Promise.resolve().then(()=>(wt(),Ca)),r.settingsServiceModule=await Promise.resolve().then(()=>(Ls(),Fa)),r.bypassManagerModule=await Promise.resolve().then(()=>(Os(),Wa)),r.variableResolverModule=await Promise.resolve().then(()=>(Bs(),qa)),r.contextInjectorModule=await Promise.resolve().then(()=>(Bt(),Ha)),r.toolPromptServiceModule=await Promise.resolve().then(()=>($o(),Va)),r.toolOutputServiceModule=await Promise.resolve().then(()=>(Do(),Ja)),r.toolAutomationServiceModule=await Promise.resolve().then(()=>(xl(),hl)),r.toolOutputServiceModule?.toolOutputService&&r.apiConnectionModule&&r.toolOutputServiceModule.toolOutputService.setApiConnection(r.apiConnectionModule),!0}catch(M){return c=null,console.warn(`[${n}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,M),console.warn(`[${n}] \u5DF2\u52A0\u8F7D\u6A21\u5757:`,Object.keys(r).filter(B=>r[B])),!1}})(),c)}function T(){return`
      /* CSS\u53D8\u91CF */
      :root {
        --yyt-accent: #7bb7ff;
        --yyt-accent-glow: rgba(123, 183, 255, 0.4);
        --yyt-accent-soft: rgba(123, 183, 255, 0.15);
        --yyt-accent-strong: #a5d4ff;
        --yyt-on-accent: #0b0f15;
        --yyt-success: #4ade80;
        --yyt-success-glow: rgba(74, 222, 128, 0.3);
        --yyt-error: #f87171;
        --yyt-danger: var(--yyt-error);
        --yyt-error-glow: rgba(248, 113, 113, 0.3);
        --yyt-warning: #fbbf24;
        --yyt-bg-base: #0b0f15;
        --yyt-bg-gradient-1: rgba(123, 183, 255, 0.12);
        --yyt-bg-gradient-2: rgba(155, 123, 255, 0.10);
        --yyt-surface: rgba(255, 255, 255, 0.03);
        --yyt-surface-2: rgba(255, 255, 255, 0.05);
        --yyt-surface-3: rgba(255, 255, 255, 0.075);
        --yyt-surface-hover: rgba(255, 255, 255, 0.08);
        --yyt-surface-active: rgba(255, 255, 255, 0.11);
        --yyt-border: rgba(255, 255, 255, 0.08);
        --yyt-border-soft: rgba(255, 255, 255, 0.05);
        --yyt-border-strong: rgba(255, 255, 255, 0.16);
        --yyt-text: rgba(255, 255, 255, 0.95);
        --yyt-text-secondary: rgba(255, 255, 255, 0.72);
        --yyt-text-muted: rgba(255, 255, 255, 0.5);
        --yyt-focus-ring: 0 0 0 3px rgba(123, 183, 255, 0.18);
        --yyt-radius: 14px;
        --yyt-radius-sm: 10px;
        --yyt-radius-lg: 18px;
        --yyt-radius-xl: 24px;
        --yyt-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
        --yyt-shadow-soft: 0 10px 28px rgba(0, 0, 0, 0.18);
        --yyt-shadow-glow: 0 0 24px var(--yyt-accent-glow);
        --yyt-shell-sidebar-width: 248px;
        --yyt-shell-topbar-gap: 14px;
        --yyt-shell-gap: 12px;
        --yyt-panel-gap: 16px;
        --yyt-backdrop: rgba(5, 8, 12, 0.72);
      }

      /* \u83DC\u5355\u9879 */
      #${l} { display: flex; align-items: center; }

      #${i} {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 14px; cursor: pointer;
        transition: all 0.2s ease; border-radius: 8px; margin: 2px;
      }

      #${i}:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
      }

      #${i} .fa-fw {
        font-size: 16px; color: var(--yyt-accent);
        filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      }

      #${i} span { font-weight: 500; letter-spacing: 0.3px; }

      /* \u4E3B\u5F39\u7A97\u906E\u7F69 */
      .yyt-popup-overlay {
        position: fixed;
        inset: 0;
        background: var(--yyt-backdrop);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 9999;
      }

      /* \u4E3B\u5F39\u7A97 */
      .yyt-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        width: min(1500px, calc(100vw - 12px));
        max-width: calc(100vw - 12px);
        height: min(1120px, calc(100vh - 12px));
        max-height: calc(100vh - 12px);
        background:
          radial-gradient(1200px 600px at 10% -10%, var(--yyt-bg-gradient-1), transparent 60%),
          radial-gradient(900px 500px at 100% 0%, var(--yyt-bg-gradient-2), transparent 55%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 22%),
          var(--yyt-bg-base);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 22px;
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.05),
          0 28px 84px rgba(0, 0, 0, 0.58),
          0 0 80px rgba(123, 183, 255, 0.1);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
        color: var(--yyt-text);
        z-index: 10000;
      }

      /* \u5F39\u7A97\u5934\u90E8 */
      .yyt-popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 16px 22px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.055) 0%, rgba(255, 255, 255, 0.03) 100%);
        border-bottom: 1px solid var(--yyt-border);
        border-radius: 22px 22px 0 0;
        flex-shrink: 0;
        cursor: grab;
      }

      .yyt-popup-brand {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .yyt-popup-title-row {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }

      .yyt-popup.yyt-popup-dragging .yyt-popup-header {
        cursor: grabbing;
      }

      .yyt-popup-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 15px;
        font-weight: 700;
        color: var(--yyt-text);
        min-width: 0;
      }

      .yyt-popup-title span:last-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .yyt-popup-version {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        color: var(--yyt-accent);
        background: var(--yyt-accent-soft);
        border: 1px solid rgba(123, 183, 255, 0.18);
        flex-shrink: 0;
      }

      .yyt-popup-subtitle {
        font-size: 12px;
        color: var(--yyt-text-muted);
        letter-spacing: 0.3px;
      }

      .yyt-popup-title i {
        color: var(--yyt-accent);
        font-size: 18px;
      }

      .yyt-popup-header-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }

      .yyt-popup-drag-hint {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.03);
        border: 1px dashed rgba(255, 255, 255, 0.12);
      }

      .yyt-popup-drag-hint i {
        color: var(--yyt-accent);
      }

      .yyt-popup-close {
        width: 34px;
        height: 34px;
        border: 1px solid var(--yyt-border);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.04);
        color: var(--yyt-text-secondary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      }

      .yyt-popup-close:hover {
        background: rgba(248, 113, 113, 0.14);
        border-color: rgba(248, 113, 113, 0.2);
        color: #ff6b6b;
      }

      /* \u5F39\u7A97\u4E3B\u4F53 */
      .yyt-popup-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        padding: 18px 20px;
        overflow: hidden;
      }

      .yyt-popup-shell {
        display: flex;
        flex-direction: column;
        min-height: 0;
        flex: 1;
        gap: var(--yyt-shell-gap);
      }

      .yyt-content-frame {
        flex: 1;
        min-height: 0;
        min-width: 0;
        overflow: hidden;
        padding: 5px;
        border-radius: var(--yyt-radius-xl);
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.018) 100%),
          rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      /* \u5F39\u7A97\u5E95\u90E8 */
      .yyt-popup-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 14px 20px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.02) 100%);
        border-top: 1px solid var(--yyt-border);
        border-radius: 0 0 22px 22px;
        flex-shrink: 0;
      }

      .yyt-popup-footer-left,
      .yyt-popup-footer-right {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .yyt-popup-footer-left {
        min-width: 0;
      }

      .yyt-popup-status-cluster {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex-wrap: wrap;
      }

      .yyt-popup-status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-popup-status i {
        color: var(--yyt-accent);
      }

      .yyt-popup-footer-note {
        font-size: 12px;
        line-height: 1.6;
        color: var(--yyt-text-muted);
      }

      /* \u4E3B\u9876\u680F */
      .yyt-shell-topbar {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
        gap: var(--yyt-shell-topbar-gap);
        padding: 18px;
        border-radius: var(--yyt-radius-xl);
        border: 1px solid rgba(255, 255, 255, 0.08);
        background:
          radial-gradient(600px 240px at 0% 0%, rgba(123, 183, 255, 0.14), transparent 65%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }

      .yyt-shell-topbar-main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        min-width: 0;
      }

      .yyt-shell-topbar-side {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .yyt-shell-kicker {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        padding: 5px 10px;
        border-radius: 999px;
        background: rgba(123, 183, 255, 0.12);
        border: 1px solid rgba(123, 183, 255, 0.18);
        color: var(--yyt-accent);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.42px;
        text-transform: uppercase;
      }

      .yyt-shell-heading-row {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .yyt-shell-heading {
        font-size: 22px;
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: 0.2px;
        color: var(--yyt-text);
      }

      .yyt-shell-heading-badge {
        display: inline-flex;
        align-items: center;
        padding: 5px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-shell-overview-text {
        font-size: 12px;
        line-height: 1.65;
        color: var(--yyt-text-secondary);
        max-width: 72ch;
      }

      .yyt-shell-current-card {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
        padding: 14px 16px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.045);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      .yyt-shell-current-label {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.42px;
        text-transform: uppercase;
        color: var(--yyt-text-muted);
      }

      .yyt-shell-current-page {
        font-size: 14px;
        font-weight: 800;
        line-height: 1.35;
        color: var(--yyt-text);
        word-break: break-word;
      }

      .yyt-shell-current-desc {
        font-size: 11px;
        line-height: 1.5;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(78px, 1fr));
        gap: 8px;
        align-self: stretch;
      }

      .yyt-shell-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        min-width: 78px;
        padding: 12px 12px 11px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.035);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-shell-stat-label {
        font-size: 10px;
        color: var(--yyt-text-muted);
        letter-spacing: 0.44px;
        text-transform: uppercase;
      }

      .yyt-shell-stat-value {
        font-size: 19px;
        font-weight: 800;
        line-height: 1;
        color: var(--yyt-text);
      }

      .yyt-shell-workspace {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(210px, var(--yyt-shell-sidebar-width)) minmax(0, 1fr);
        gap: var(--yyt-shell-gap);
      }

      .yyt-shell-sidebar {
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .yyt-shell-sidebar-card {
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow: hidden;
        padding: 14px;
        border-radius: var(--yyt-radius-xl);
        border: 1px solid rgba(255, 255, 255, 0.07);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
      }

      .yyt-shell-sidebar-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .yyt-shell-sidebar-title {
        font-size: 13px;
        font-weight: 800;
        color: var(--yyt-text);
      }

      .yyt-shell-sidebar-hint {
        font-size: 10px;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.44px;
      }

      .yyt-main-nav {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 0;
        margin-bottom: 0;
        background: transparent;
        border: none;
        min-height: 0;
        overflow-y: auto;
      }

      .yyt-main-nav-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 14px 16px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.25s ease;
        color: var(--yyt-text-secondary);
        font-weight: 500;
        font-size: 14px;
      }

      .yyt-main-nav-item:hover {
        color: var(--yyt-text);
        background: var(--yyt-surface-hover);
      }

      .yyt-main-nav-item.active {
        color: var(--yyt-on-accent);
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
      }

      .yyt-main-nav-icon {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
      }

      .yyt-main-nav-copy {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        flex: 1;
      }

      .yyt-main-nav-name {
        font-size: 13px;
        font-weight: 700;
        color: inherit;
      }

      .yyt-main-nav-desc {
        font-size: 11px;
        line-height: 1.45;
        color: inherit;
        opacity: 0.72;
      }

      .yyt-shell-sidebar-note {
        padding: 11px 12px;
        border-radius: 16px;
        border: 1px dashed rgba(123, 183, 255, 0.18);
        background: rgba(123, 183, 255, 0.05);
        color: var(--yyt-text-secondary);
        font-size: 11px;
        line-height: 1.55;
      }

      .yyt-shell-main {
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .yyt-shell-main-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 14px;
        padding: 14px 16px;
        border-radius: var(--yyt-radius-xl);
        border: 1px solid rgba(255, 255, 255, 0.07);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
      }

      .yyt-shell-main-actions {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        gap: 10px;
        flex-wrap: wrap;
        margin-left: auto;
      }

      .yyt-shell-main-heading-block {
        display: flex;
        flex-direction: column;
        gap: 7px;
        min-width: 0;
      }

      .yyt-shell-main-label-row {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .yyt-shell-main-label {
        font-size: 11px;
        font-weight: 800;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .yyt-shell-breadcrumb {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        max-width: 100%;
      }

      .yyt-shell-main-title {
        font-size: 20px;
        font-weight: 800;
        line-height: 1.12;
        color: var(--yyt-text);
      }

      .yyt-shell-main-description {
        font-size: 12px;
        line-height: 1.6;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-main-meta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.5;
      }

      .yyt-shell-main-save-btn {
        white-space: nowrap;
        flex-shrink: 0;
      }

      .yyt-shell-main-meta i {
        color: var(--yyt-accent);
      }

      /* \u6B21\u7EA7\u9876\u680F */
      .yyt-sub-nav {
        display: flex;
        gap: 4px;
        padding: 6px;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 10px;
        margin-bottom: 16px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        flex-shrink: 0;
      }

      .yyt-sub-nav-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--yyt-text-secondary);
        font-weight: 500;
        font-size: 13px;
      }

      .yyt-sub-nav-item:hover {
        color: var(--yyt-text);
        background: rgba(255, 255, 255, 0.05);
      }

      .yyt-sub-nav-item.active {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.1);
      }

      /* \u5185\u5BB9\u533A\u57DF */
      .yyt-content {
        flex: 1;
        min-height: 0;
        min-width: 0;
        overflow: auto;
        padding: 4px;
        border-radius: calc(var(--yyt-radius) + 2px);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.03) 100%);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .yyt-content-inner {
        min-height: 100%;
      }

      /* \u6807\u7B7E\u5185\u5BB9 */
      .yyt-tab-content {
        display: none;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        height: 100%;
      }

      .yyt-tab-content.active {
        display: block;
      }

      /* \u9762\u677F\u6837\u5F0F */
      .yyt-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .yyt-panel-section {
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 18px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, transparent 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius);
      }

      .yyt-section-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        font-size: 14px;
        color: var(--yyt-text);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .yyt-section-title i {
        color: var(--yyt-accent);
        font-size: 16px;
      }

      /* \u6309\u94AE\u6837\u5F0F */
      .yyt-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 38px;
        padding: 10px 16px;
        border: 1px solid var(--yyt-border);
        border-radius: 13px;
        background: linear-gradient(180deg, var(--yyt-surface-3) 0%, var(--yyt-surface) 100%);
        color: var(--yyt-text);
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
        position: relative;
        overflow: hidden;
        box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      .yyt-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.04) 42%, transparent 78%);
        pointer-events: none;
      }

      .yyt-btn:hover {
        transform: translateY(-1px);
        border-color: var(--yyt-border-strong);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }

      .yyt-btn:focus-visible {
        outline: none;
        box-shadow: var(--yyt-focus-ring), 0 14px 28px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }

      .yyt-btn-primary {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
        color: var(--yyt-on-accent);
        border-color: rgba(255, 255, 255, 0.18);
        box-shadow: 0 14px 30px rgba(123, 183, 255, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }

      .yyt-btn-primary:hover {
        box-shadow: 0 18px 34px rgba(123, 183, 255, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.34);
      }

      .yyt-btn-secondary {
        background: linear-gradient(180deg, var(--yyt-surface-active) 0%, var(--yyt-surface-2) 100%);
        color: var(--yyt-text);
        border-color: rgba(255, 255, 255, 0.12);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.07);
      }

      .yyt-btn-secondary:hover {
        background: linear-gradient(180deg, var(--yyt-surface-hover) 0%, var(--yyt-surface-active) 100%);
        border-color: var(--yyt-border-strong);
      }

      .yyt-btn-danger {
        background: linear-gradient(180deg, rgba(248, 113, 113, 0.22) 0%, rgba(248, 113, 113, 0.08) 100%);
        color: var(--yyt-error);
        border: 1px solid rgba(248, 113, 113, 0.34);
        box-shadow: 0 12px 24px rgba(248, 113, 113, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      .yyt-btn-small {
        min-height: 32px;
        padding: 7px 12px;
        font-size: 12px;
        border-radius: 11px;
      }

      /* \u8868\u5355\u6837\u5F0F */
      .yyt-form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .yyt-form-group label {
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-secondary);
      }

      .yyt-form-row {
        display: flex;
        gap: 12px;
      }

      .yyt-flex-1 {
        flex: 1;
      }

      .yyt-input,
      .yyt-select,
      .yyt-textarea {
        min-height: 42px;
        padding: 11px 15px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.028) 100%);
        color: var(--yyt-text);
        font-size: 13px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.08), 0 8px 18px rgba(0, 0, 0, 0.1);
      }

      .yyt-input:focus,
      .yyt-select:focus,
      .yyt-textarea:focus,
      .yyt-input:focus-visible,
      .yyt-select:focus-visible,
      .yyt-textarea:focus-visible {
        outline: none;
        border-color: rgba(123, 183, 255, 0.8);
        background: linear-gradient(180deg, rgba(123, 183, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
        box-shadow: var(--yyt-focus-ring), inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 12px 24px rgba(11, 20, 34, 0.18);
      }

      .yyt-input::placeholder,
      .yyt-textarea::placeholder {
        color: rgba(255, 255, 255, 0.42);
      }

      .yyt-textarea {
        resize: vertical;
        min-height: 112px;
      }

      /* \u9762\u677F\u5E95\u90E8 */
      .yyt-panel-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding-top: 16px;
        margin-top: 4px;
        border-top: 1px solid var(--yyt-border);
      }

      .yyt-footer-left,
      .yyt-footer-right {
        display: flex;
        gap: 8px;
      }

      /* \u7A7A\u72B6\u6001 */
      .yyt-empty-state-small {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
        color: var(--yyt-text-muted);
        gap: 8px;
      }

      .yyt-empty-state-small i {
        font-size: 24px;
        opacity: 0.4;
      }

      .yyt-empty-state-small span {
        font-size: 12px;
      }

      /* \u5B50\u5185\u5BB9\u533A\u57DF */
      .yyt-sub-content {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        height: 100%;
      }

      /* \u5DE5\u5177\u7A97\u53E3\u5BB9\u5668 */
      .yyt-tool-window {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .yyt-compact-mode .yyt-popup-body {
        padding: 12px 16px;
      }

      .yyt-compact-mode .yyt-panel {
        gap: 14px;
      }

      .yyt-compact-mode .yyt-panel-section {
        padding: 14px;
        gap: 10px;
      }

      .yyt-no-animation *,
      .yyt-no-animation *::before,
      .yyt-no-animation *::after {
        animation: none !important;
        transition: none !important;
      }

      /* \u54CD\u5E94\u5F0F */
      @media screen and (max-width: 980px) {
        .yyt-popup {
          width: calc(100vw - 4px);
          max-width: calc(100vw - 4px);
          height: calc(100vh - 4px);
          max-height: calc(100vh - 4px);
        }

        .yyt-shell-topbar {
          grid-template-columns: 1fr;
        }

        .yyt-shell-topbar-side {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, auto);
          align-items: stretch;
        }

        .yyt-shell-stats {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .yyt-popup-header-actions {
          gap: 8px;
        }

        .yyt-popup-drag-hint {
          padding: 6px 10px;
        }
      }

      @media screen and (max-width: 860px) {
        .yyt-shell-workspace {
          grid-template-columns: 1fr;
        }

        .yyt-shell-topbar-side {
          grid-template-columns: 1fr;
        }

        .yyt-main-nav {
          flex-direction: row;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 4px;
        }

        .yyt-main-nav-item {
          min-width: 220px;
        }
      }

      @media screen and (max-height: 860px) {
        .yyt-popup {
          height: calc(100vh - 4px);
          max-height: calc(100vh - 4px);
        }

        .yyt-popup-body {
          padding: 10px 12px;
        }

        .yyt-popup-shell {
          gap: 8px;
        }

        .yyt-shell-topbar,
        .yyt-shell-main-header,
        .yyt-shell-sidebar-card {
          padding: 12px;
        }
      }

      @media screen and (max-width: 768px) {
        .yyt-popup {
          width: 100vw;
          height: 100vh;
          border-radius: 0;
          border: none;
        }

        .yyt-popup-header-actions {
          gap: 6px;
        }

        .yyt-popup-drag-hint {
          display: none;
        }

        .yyt-popup-body {
          padding: 10px 14px;
        }

        .yyt-shell-topbar,
        .yyt-shell-main-header,
        .yyt-shell-sidebar-card {
          padding: 14px;
          border-radius: 16px;
        }

        .yyt-shell-heading {
          font-size: 20px;
        }

        .yyt-shell-main-header {
          flex-direction: column;
          align-items: flex-start;
        }

        .yyt-shell-main-actions {
          width: 100%;
          justify-content: flex-start;
          margin-left: 0;
        }

        .yyt-shell-stats {
          grid-template-columns: 1fr;
        }

        .yyt-shell-topbar-side {
          display: flex;
        }

        .yyt-main-nav {
          flex-direction: column;
          overflow: visible;
        }

        .yyt-main-nav-item {
          min-width: 0;
        }

        .yyt-popup-footer {
          flex-direction: column;
          align-items: stretch;
        }

        .yyt-popup-footer-left,
        .yyt-popup-footer-right {
          width: 100%;
          justify-content: center;
        }

        .yyt-popup-footer-note {
          text-align: center;
        }
      }
    `}async function I(){let M=`${n}-styles`,B=o.document||document;if(B.getElementById(M))return;let U="",L=[];try{L.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{L.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}L.push("./styles/main.css");for(let G of[...new Set(L.filter(Boolean))])try{let pe=await fetch(G);if(pe.ok){U=await pe.text();break}}catch{}U||(p("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),U=T());let re=B.createElement("style");re.id=M,re.textContent=U,(B.head||B.documentElement).appendChild(re),p("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function E(){let M=o.document||document;if(r.uiModule?.getAllStyles){let B=`${n}-ui-styles`;if(!M.getElementById(B)){let U=M.createElement("style");U.id=B,U.textContent=r.uiModule.getAllStyles(),(M.head||M.documentElement).appendChild(U)}}if(r.promptEditorModule&&r.promptEditorModule.getPromptEditorStyles){let B=`${n}-prompt-styles`;if(!M.getElementById(B)){let U=M.createElement("style");U.id=B,U.textContent=r.promptEditorModule.getPromptEditorStyles(),(M.head||M.documentElement).appendChild(U)}}}async function K(){try{let{applyUiPreferences:M}=await Promise.resolve().then(()=>(Fo(),ui));if(r.settingsServiceModule?.settingsService){let B=r.settingsServiceModule.settingsService.getUiSettings();if(B&&B.theme){let U=o.document||document;M(B,U),p(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${B.theme}`)}}}catch(M){p("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",M)}}function q(){let M=o.jQuery||window.jQuery;if(!M){f("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(q,1e3);return}let B=o.document||document,U=M("#extensionsMenu",B);if(!U.length){p("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(q,2e3);return}if(M(`#${l}`,U).length>0){p("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let re=M(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),G=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,pe=M(G);pe.on("click",function(V){V.stopPropagation(),p("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let ze=M("#extensionsMenuButton",B);ze.length&&U.is(":visible")&&ze.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),re.append(pe),U.append(re),p("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function ae(){p(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await I();let M=await w();if(p(M?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&r.uiModule?.initUI)try{r.uiModule.initUI({services:r,autoInjectStyles:!1,targetDocument:o.document||document}),d=!0,p("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(U){console.error(`[${n}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,U)}if(r.uiModule&&(E(),await K()),r.toolAutomationServiceModule?.toolAutomationService){let U=r.toolAutomationServiceModule.toolAutomationService.init();p(U?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let B=o.document||document;B.readyState==="loading"?B.addEventListener("DOMContentLoaded",()=>{setTimeout(q,1e3)}):setTimeout(q,1e3),p("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:w,injectStyles:I,addMenuItem:q,loadLegacyModule:v,init:ae,log:p,logError:f}}function wl(t){let{constants:e,topLevelWindow:s,modules:o,caches:r,uiState:n}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c={cleanup:null},d={cleanups:[]};function u(...g){console.log(`[${a}]`,...g)}function m(...g){console.error(`[${a}]`,...g)}async function p(g){if(o[g])return o[g];let h=t?.services?.loadLegacyModule;if(typeof h!="function")return null;try{return await h(g)}catch(S){return m(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${g}`,S),null}}function f(g){return typeof g!="string"?"":g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function v(){return s.jQuery||window.jQuery}function w(){return s.document||document}function T(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let h=o.toolRegistryModule?.getToolConfig(g);if(!h)return g;if(!h.hasSubTabs)return h.name||g;let S=E(g),A=h.subTabs?.find(C=>C.id===S);return A?.name?`${h.name} / ${A.name}`:h.name||g}function I(g){if(!g)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let h=o.toolRegistryModule?.getToolConfig(g);if(!h)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!h.hasSubTabs)return h.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let S=E(g);return h.subTabs?.find(C=>C.id===S)?.description||h.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function E(g,h=""){let S=o.toolRegistryModule?.getToolConfig(g);if(!S?.hasSubTabs||!Array.isArray(S.subTabs)||S.subTabs.length===0)return"";let A=String(h||n.currentSubTab[g]||"").trim(),W=A&&S.subTabs.some(F=>F?.id===A)?A:S.subTabs[0]?.id||"";return W&&n.currentSubTab[g]!==W&&(n.currentSubTab[g]=W),W}function K(){let g=n.currentPopup;if(!g)return;let h=T(n.currentMainTab),S=I(n.currentMainTab),A=g.querySelector(".yyt-popup-active-label");A&&(A.textContent=`\u5F53\u524D\uFF1A${h}`);let C=g.querySelector(".yyt-shell-breadcrumb");C&&(C.textContent=h);let W=g.querySelector(".yyt-shell-main-title");W&&(W.textContent=h);let F=g.querySelector(".yyt-shell-main-description");F&&(F.textContent=S);let Y=g.querySelector(".yyt-shell-current-page");Y&&(Y.textContent=h);let R=g.querySelector(".yyt-shell-current-desc");R&&(R.textContent=S)}function q(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function ae(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(g=>{typeof g=="function"&&g()}),d.cleanups=[])}function M(g){return!!g?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function B(g){let h=g?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return h?h.scrollHeight>h.clientHeight+2||h.scrollWidth>h.clientWidth+2:!1}function U(g,h){return h?.closest?.(".yyt-scrollable-surface")===g}function L(g,h){if(!g||!h)return null;let S=h.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return S&&g.contains(S)&&(S.scrollHeight>S.clientHeight+2||S.scrollWidth>S.clientWidth+2)?S:[h.closest?.(".yyt-tool-list"),h.closest?.(".yyt-settings-content"),h.closest?.(".yyt-sub-content"),h.closest?.(".yyt-tab-content.active"),g].filter(Boolean).find(C=>C!==g&&!g.contains(C)?!1:C.scrollHeight>C.clientHeight+2||C.scrollWidth>C.clientWidth+2)||g}function re(g){let h=w();if(!g||!h)return;g.classList.add("yyt-scrollable-surface");let S=!1,A=!1,C=0,W=0,F=0,Y=0,R=!1,N=!1,ye=()=>{S=!1,A=!1,g.classList.remove("yyt-scroll-dragging")},ge=z=>{z.button===0&&(M(z.target)||U(g,z.target)&&(R=g.scrollWidth>g.clientWidth+2,N=g.scrollHeight>g.clientHeight+2,!(!R&&!N)&&(z.stopPropagation(),S=!0,A=!1,C=z.clientX,W=z.clientY,F=g.scrollLeft,Y=g.scrollTop)))},_t=z=>{if(!S)return;let at=z.clientX-C,Me=z.clientY-W;!(Math.abs(at)>4||Math.abs(Me)>4)&&!A||(A=!0,g.classList.add("yyt-scroll-dragging"),R&&(g.scrollLeft=F-at),N&&(g.scrollTop=Y-Me),z.preventDefault())},gt=()=>{ye()},ft=z=>{if(z.ctrlKey||B(z.target))return;let at=g.classList.contains("yyt-content");if(!at&&!U(g,z.target))return;let Me=L(g,z.target);!Me||!(Me.scrollHeight>Me.clientHeight+2||Me.scrollWidth>Me.clientWidth+2)||(Math.abs(z.deltaY)>0&&(Me.scrollTop+=z.deltaY),Math.abs(z.deltaX)>0&&(Me.scrollLeft+=z.deltaX),z.preventDefault(),(!at||Me!==g)&&z.stopPropagation())},H=z=>{A&&z.preventDefault()};g.addEventListener("mousedown",ge),g.addEventListener("wheel",ft,{passive:!1}),g.addEventListener("dragstart",H),h.addEventListener("mousemove",_t),h.addEventListener("mouseup",gt),d.cleanups.push(()=>{ye(),g.classList.remove("yyt-scrollable-surface"),g.removeEventListener("mousedown",ge),g.removeEventListener("wheel",ft),g.removeEventListener("dragstart",H),h.removeEventListener("mousemove",_t),h.removeEventListener("mouseup",gt)})}function G(){let g=n.currentPopup;if(!g)return;ae();let h=[...g.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...g.querySelectorAll(".yyt-sub-nav"),...g.querySelectorAll(".yyt-content"),...g.querySelectorAll(".yyt-tab-content.active"),...g.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...g.querySelectorAll(".yyt-settings-content"),...g.querySelectorAll(".yyt-tool-list")];[...new Set(h)].forEach(re)}function pe(){let g=w(),h=n.currentPopup,S=h?.querySelector(".yyt-popup-header");if(!h||!S||!g)return;let A=!1,C=0,W=0,F=0,Y=0,R="",N=()=>({width:s.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),ye=(H,z,at)=>Math.min(Math.max(H,z),at),ge=()=>{A&&(A=!1,h.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=R)},_t=H=>{if(!A||!n.currentPopup)return;let z=H.clientX-C,at=H.clientY-W,{width:Me,height:ur}=N(),_l=h.offsetWidth||0,Al=h.offsetHeight||0,El=Math.max(0,Me-_l),Ml=Math.max(0,ur-Al);h.style.left=`${ye(F+z,0,El)}px`,h.style.top=`${ye(Y+at,0,Ml)}px`,h.style.transform="none",h.style.right="auto",h.style.bottom="auto"},gt=()=>{ge()},ft=H=>{if(H.button!==0||H.target?.closest(".yyt-popup-close"))return;A=!0,C=H.clientX,W=H.clientY;let z=h.getBoundingClientRect();F=z.left,Y=z.top,h.style.left=`${z.left}px`,h.style.top=`${z.top}px`,h.style.transform="none",h.style.right="auto",h.style.bottom="auto",h.classList.add("yyt-popup-dragging"),R=g.body.style.userSelect||"",g.body.style.userSelect="none",H.preventDefault()};S.addEventListener("mousedown",ft),g.addEventListener("mousemove",_t),g.addEventListener("mouseup",gt),c.cleanup=()=>{ge(),S.removeEventListener("mousedown",ft),g.removeEventListener("mousemove",_t),g.removeEventListener("mouseup",gt)}}function we(){q(),ae(),n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),u("\u5F39\u7A97\u5DF2\u5173\u95ED")}function V(g){n.currentMainTab=g;let h=v();if(!h||!n.currentPopup)return;h(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),h(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let S=o.toolRegistryModule?.getToolConfig(g);S?.hasSubTabs?(h(n.currentPopup).find(".yyt-sub-nav").show(),yt(g,S.subTabs)):h(n.currentPopup).find(".yyt-sub-nav").hide(),h(n.currentPopup).find(".yyt-tab-content").removeClass("active"),h(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),nt(g),K(),G()}function ze(g,h){n.currentSubTab[g]=h;let S=v();!S||!n.currentPopup||(S(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),S(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${h}"]`).addClass("active"),Ee(g,h),K(),G())}function yt(g,h){let S=v();if(!S||!n.currentPopup||!h)return;let A=E(g,n.currentSubTab[g]||h[0]?.id),W=(g==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:h.filter(F=>(F?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:h.filter(F=>F?.toolKind==="script")}].filter(F=>F.items.length>0):[{key:"default",title:"",items:h}]).map(F=>{let Y=F.title?`<div class="yyt-sub-nav-group-title">${f(F.title)}</div>`:"",R=F.items.map(N=>`
        <div class="yyt-sub-nav-item ${N.id===A?"active":""}" data-subtab="${N.id}">
          <i class="fa-solid ${N.icon||"fa-file"}"></i>
          <span>${f(N.name||N.id)}</span>
        </div>
      `).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${F.key}">
          ${Y}
          <div class="yyt-sub-nav-group-items">
            ${R}
          </div>
        </div>
      `}).join("");S(n.currentPopup).find(".yyt-sub-nav").html(W),S(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let Y=S(this).data("subtab");ze(g,Y)}),G()}async function nt(g){let h=v();if(!h||!n.currentPopup)return;let S=h(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!S.length)return;let A=o.toolRegistryModule?.getToolConfig(g);switch(g){case"apiPresets":if(o.uiModule?.renderApiPanel)o.uiModule.renderApiPanel(S);else{let C=await p("uiComponentsModule");C?.render&&C.render(S)}break;case"toolManage":if(o.uiModule?.renderToolPanel)o.uiModule.renderToolPanel(S);else{let C=await p("uiComponentsModule");C?.renderTool&&C.renderTool(S)}break;case"regexExtract":if(o.uiModule?.renderRegexPanel)o.uiModule.renderRegexPanel(S);else{let C=await p("uiComponentsModule");C?.renderRegex&&C.renderRegex(S)}break;case"tools":{let C=E(g);A?.hasSubTabs&&C?await Ee(g,C):S.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"tableWorkbench":o.uiModule?.renderTableWorkbenchPanel?o.uiModule.renderTableWorkbenchPanel(S):S.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":o.uiModule?.renderBypassPanel?o.uiModule.renderBypassPanel(S):S.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":o.uiModule?.renderSettingsPanel?o.uiModule.renderSettingsPanel(S):S.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:ee(g,S);break}G()}async function Ee(g,h){let S=v();if(!S||!n.currentPopup)return;let A=S(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!A.length)return;let C=o.toolRegistryModule?.getToolConfig(g);if(C?.hasSubTabs){let F=E(g,h),Y=C.subTabs?.find(N=>N.id===F),R=A.find(".yyt-sub-content");if(R.length||(A.html('<div class="yyt-sub-content"></div>'),R=A.find(".yyt-sub-content")),!Y){R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),G();return}switch(Y.component){case"SummaryToolPanel":if(o.uiModule?.renderSummaryToolPanel)o.uiModule.renderSummaryToolPanel(R);else{let N=await p("uiComponentsModule");N?.SummaryToolPanel?N.SummaryToolPanel.renderTo(R):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(o.uiModule?.renderStatusBlockPanel)o.uiModule.renderStatusBlockPanel(R);else{let N=await p("uiComponentsModule");N?.StatusBlockPanel?N.StatusBlockPanel.renderTo(R):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(o.uiModule?.renderYouyouReviewPanel)o.uiModule.renderYouyouReviewPanel(R);else{let N=await p("uiComponentsModule");N?.YouyouReviewPanel?N.YouyouReviewPanel.renderTo(R):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"EscapeTransformToolPanel":if(o.uiModule?.renderEscapeTransformToolPanel)o.uiModule.renderEscapeTransformToolPanel(R);else{let N=await p("uiComponentsModule");N?.EscapeTransformToolPanel?N.EscapeTransformToolPanel.renderTo(R):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"PunctuationTransformToolPanel":if(o.uiModule?.renderPunctuationTransformToolPanel)o.uiModule.renderPunctuationTransformToolPanel(R);else{let N=await p("uiComponentsModule");N?.PunctuationTransformToolPanel?N.PunctuationTransformToolPanel.renderTo(R):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await de(Y,R);break;default:R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}G();return}let W=A.find(".yyt-sub-content");if(W.length){switch(h){case"config":Te(g,W);break;case"prompts":await St(g,W);break;case"presets":qt(g,W);break;default:W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}G()}}async function de(g,h){if(!(!v()||!h?.length||!g?.id))try{let A=r.dynamicToolPanelCache.get(g.id);if(!A){let W=(await Promise.resolve().then(()=>(Wt(),ni)))?.createToolConfigPanel;if(typeof W!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");A=W({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),r.dynamicToolPanelCache.set(g.id,A)}A.renderTo(h),G()}catch(A){console.error(`[${a}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,A),h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function ee(g,h){if(!v())return;let A=o.toolRegistryModule?.getToolConfig(g);if(!A){h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let C=n.currentSubTab[g]||A.subTabs?.[0]?.id||"config";h.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${C}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Ee(g,C)}function Te(g,h){if(!v())return;let A=o.toolManagerModule?.getTool(g),C=o.presetManagerModule?.getAllPresets()||[],W=o.toolRegistryModule?.getToolApiPreset(g)||"",F=C.map(Y=>`<option value="${f(Y.name)}" ${Y.name===W?"selected":""}>${f(Y.name)}</option>`).join("");h.html(`
      <div class="yyt-panel">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-plug"></i>
            <span>API\u9884\u8BBE\u7ED1\u5B9A</span>
          </div>
          <div class="yyt-form-group">
            <label>\u9009\u62E9API\u9884\u8BBE</label>
            <select class="yyt-select" id="yyt-tool-api-preset">
              <option value="">\u4F7F\u7528\u5F53\u524D\u914D\u7F6E</option>
              ${F}
            </select>
          </div>
          <button class="yyt-btn yyt-btn-primary" id="yyt-save-tool-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u7ED1\u5B9A
          </button>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-cog"></i>
            <span>\u6267\u884C\u914D\u7F6E</span>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u8D85\u65F6\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${A?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${A?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),h.find("#yyt-save-tool-preset").on("click",function(){let R=h.find("#yyt-tool-api-preset").val();o.toolRegistryModule?.setToolApiPreset(g,R);let N=s.toastr;N&&N.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function St(g,h){let S=v(),A=o.promptEditorModule||await p("promptEditorModule");if(!S||!A){h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let W=o.toolManagerModule?.getTool(g)?.config?.messages||[],F=A.messagesToSegments?A.messagesToSegments(W):A.DEFAULT_PROMPT_SEGMENTS,Y=new A.PromptEditor({containerId:`yyt-prompt-editor-${g}`,segments:F,onChange:N=>{let ye=A.segmentsToMessages?A.segmentsToMessages(N):[];u("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ye.length,"\u6761\u6D88\u606F")}});h.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),Y.init(h.find(`#yyt-prompt-editor-${g}`));let R=A.getPromptEditorStyles?A.getPromptEditorStyles():"";if(R){let N="yyt-prompt-editor-styles",ye=s.document||document;if(!ye.getElementById(N)){let ge=ye.createElement("style");ge.id=N,ge.textContent=R,(ye.head||ye.documentElement).appendChild(ge)}}}function qt(g,h){v()&&h.html(`
      <div class="yyt-panel">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-bookmark"></i>
            <span>\u5DE5\u5177\u9884\u8BBE</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" style="margin-left: auto;">
              <i class="fa-solid fa-plus"></i> \u65B0\u5EFA
            </button>
          </div>
          <div class="yyt-empty-state-small">
            <i class="fa-solid fa-bookmark"></i>
            <span>\u6682\u65E0\u4FDD\u5B58\u7684\u9884\u8BBE</span>
          </div>
        </div>
      </div>
    `)}async function Gt(){if(n.currentPopup){u("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=t?.services?.loadModules;typeof g=="function"&&await g();let h=v(),S=w();if(!h){m("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let A=o.toolRegistryModule?.getToolList()||[];if(!A.length){m("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}A.some(H=>H.id===n.currentMainTab)||(n.currentMainTab=A[0].id);let C=o.toolRegistryModule?.getToolConfig("tools"),W=Array.isArray(C?.subTabs)?C.subTabs:[],F=W.filter(H=>H?.isCustom).length,Y=W.filter(H=>!H?.isCustom).length,R=T(n.currentMainTab),N=I(n.currentMainTab);n.currentOverlay=S.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",H=>{H.target===n.currentOverlay&&we()}),S.body.appendChild(n.currentOverlay);let ye=A.map(H=>`
      <div class="yyt-main-nav-item ${H.id===n.currentMainTab?"active":""}" data-tab="${H.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${f(H.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${f(H.name||H.id)}</span>
          <span class="yyt-main-nav-desc">${f(H.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),ge=A.map(H=>`
      <div class="yyt-tab-content ${H.id===n.currentMainTab?"active":""}" data-tab="${H.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),_t=`
      <div class="yyt-popup" id="${l}">
        <div class="yyt-popup-header">
          <div class="yyt-popup-brand">
            <div class="yyt-popup-title-row">
              <div class="yyt-popup-title">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>YouYou \u5DE5\u5177\u7BB1</span>
              </div>
              <span class="yyt-popup-version">v${i}</span>
            </div>
            <div class="yyt-popup-subtitle">\u5DE5\u5177\u7F16\u6392\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u5DE5\u4F5C\u53F0</div>
          </div>
          <div class="yyt-popup-header-actions">
            <div class="yyt-popup-drag-hint">
              <i class="fa-solid fa-grip-lines"></i>
              <span>\u62D6\u52A8\u7A97\u53E3</span>
            </div>
            <button class="yyt-popup-close" title="\u5173\u95ED">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
        </div>

        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-topbar">
              <div class="yyt-shell-topbar-main">
                <div class="yyt-shell-kicker">Workspace</div>
                <div class="yyt-shell-heading-row">
                  <div class="yyt-shell-heading">YouYou \u5DE5\u5177\u5DE5\u4F5C\u53F0</div>
                  <span class="yyt-shell-heading-badge">\u7EDF\u4E00\u5165\u53E3</span>
                </div>
                <div class="yyt-shell-overview-text">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u4E0E\u8C03\u8BD5\u6D41\u7A0B\uFF0C\u5728\u540C\u4E00\u5DE5\u4F5C\u53F0\u91CC\u4FDD\u6301\u66F4\u9AD8\u53EF\u8BFB\u6027\u4E0E\u66F4\u4F4E\u64CD\u4F5C\u566A\u97F3\u3002</div>
              </div>
              <div class="yyt-shell-topbar-side">
                <div class="yyt-shell-current-card">
                  <span class="yyt-shell-current-label">\u805A\u7126\u9875\u9762</span>
                  <strong class="yyt-shell-current-page">${f(R)}</strong>
                  <span class="yyt-shell-current-desc">${f(N)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${A.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${Y}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${F}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${A.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${ye}
                  </div>
                  <div class="yyt-shell-sidebar-note">
                    \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
                  </div>
                </div>
              </aside>

              <section class="yyt-shell-main">
                <div class="yyt-shell-main-header">
                  <div class="yyt-shell-main-heading-block">
                    <div class="yyt-shell-main-label-row">
                      <div class="yyt-shell-main-label">\u5F53\u524D\u9875\u9762</div>
                      <div class="yyt-shell-breadcrumb">${f(R)}</div>
                    </div>
                    <div class="yyt-shell-main-title">${f(R)}</div>
                    <div class="yyt-shell-main-description">${f(N)}</div>
                  </div>
                  <div class="yyt-shell-main-actions">
                    <div class="yyt-shell-main-meta">
                      <i class="fa-solid fa-circle-info"></i>
                      <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
                    </div>
                  </div>
                </div>

                <div class="yyt-sub-nav" style="display: none;">
                  <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
                </div>

                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${ge}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div class="yyt-popup-footer">
          <div class="yyt-popup-footer-left">
            <div class="yyt-popup-status-cluster">
              <div class="yyt-popup-status">
                <i class="fa-solid fa-compass"></i>
                <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${f(R)}</span>
              </div>
              <div class="yyt-popup-footer-note">
                API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
              </div>
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${a}-close-btn">\u5173\u95ED</button>
          </div>
        </div>
      </div>
    `,gt=S.createElement("div");gt.innerHTML=_t,n.currentPopup=gt.firstElementChild,S.body.appendChild(n.currentPopup),h(n.currentPopup).find(".yyt-popup-close").on("click",we),h(n.currentPopup).find(`#${a}-close-btn`).on("click",we),h(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let z=h(this).data("tab");z&&V(z)}),pe(),nt(n.currentMainTab);let ft=o.toolRegistryModule?.getToolConfig(n.currentMainTab);ft?.hasSubTabs&&(h(n.currentPopup).find(".yyt-sub-nav").show(),yt(n.currentMainTab,ft.subTabs)),K(),G(),u("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Gt,closePopup:we,switchMainTab:V,switchSubTab:ze,renderTabContent:nt,renderSubTabContent:Ee}}function Tl(t,e={}){let{constants:s,modules:o}=t,{SCRIPT_ID:r,SCRIPT_VERSION:n}=s,{init:a,loadModules:i,loadLegacyModule:l,addMenuItem:c,popupShell:d}=e;return{version:n,id:r,init:a,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:c,getStorage:()=>o.storageModule,getApiConnection:()=>o.apiConnectionModule,getPresetManager:()=>o.presetManagerModule,getUi:()=>o.uiModule,getUiModule:()=>o.uiModule,getUiComponents:()=>o.uiComponentsModule,getRegexExtractor:()=>o.regexExtractorModule,getToolManager:()=>o.toolManagerModule,getToolExecutor:()=>o.toolExecutorModule,getWindowManager:()=>o.windowManagerModule,getToolRegistry:()=>o.toolRegistryModule,getPromptEditor:()=>o.promptEditorModule,getSettingsService:()=>o.settingsServiceModule,getBypassManager:()=>o.bypassManagerModule,getVariableResolver:()=>o.variableResolverModule,getContextInjector:()=>o.contextInjectorModule,getToolPromptService:()=>o.toolPromptServiceModule,getToolOutputService:()=>o.toolOutputServiceModule,getToolAutomationService:()=>o.toolAutomationServiceModule,async loadLegacyModule(u){return typeof l!="function"?null:l(u)},async getApiConfig(){return await i(),o.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(u){return await i(),o.apiConnectionModule?(o.apiConnectionModule.updateApiConfig(u),!0):!1},async getPresets(){return await i(),o.presetManagerModule?o.presetManagerModule.getAllPresets():[]},async sendApiRequest(u,m){if(await i(),o.apiConnectionModule)return o.apiConnectionModule.sendApiRequest(u,m);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),o.apiConnectionModule?o.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(u,m){return o.toolRegistryModule?.registerTool(u,m)||!1},unregisterTool(u){return o.toolRegistryModule?.unregisterTool(u)||!1},getToolList(){return o.toolRegistryModule?.getToolList()||[]},createWindow(u){return o.windowManagerModule?.createWindow(u)||null},closeWindow(u){o.windowManagerModule?.closeWindow(u)},startAutomation(){return o.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){o.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return o.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},async processCurrentAssistantMessage(u={}){return o.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(u)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var Js="youyou_toolkit",Vu="1.0.33",Ju=`${Js}-menu-item`,Xu=`${Js}-menu-container`,Qu=`${Js}-popup`,Zu=typeof window.parent<"u"?window.parent:window,Xs={constants:{SCRIPT_ID:Js,SCRIPT_VERSION:Vu,MENU_ITEM_ID:Ju,MENU_CONTAINER_ID:Xu,POPUP_ID:Qu},topLevelWindow:Zu,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},Sl=wl(Xs),Yt=vl(Xs,{openPopup:Sl.openPopup});Xs.services.loadModules=Yt.loadModules;Xs.services.loadLegacyModule=Yt.loadLegacyModule;var Pn=Tl(Xs,{init:Yt.init,loadModules:Yt.loadModules,loadLegacyModule:Yt.loadLegacyModule,addMenuItem:Yt.addMenuItem,popupShell:Sl});if(typeof window<"u"&&(window.YouYouToolkit=Pn,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Pn}catch{}var ff=Pn;Yt.init();console.log(`[${Js}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{ff as default};
