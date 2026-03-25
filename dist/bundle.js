var ka=Object.defineProperty;var q=(t,e)=>()=>(t&&(e=t(t=0)),e);var ge=(t,e)=>{for(var s in e)ka(t,s,{get:e[s],enumerable:!0})};function Ti(){let t=A;return t._getStorage(),t._storage}function Ei(){return A.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function _i(t){A.set("settings",t)}var vt,A,ee,Si,fs,Fe=q(()=>{vt=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:n=>{let o=s.extensionSettings[this.namespace][n];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(n,o)=>{s.extensionSettings[this.namespace][n]=o,this._saveSettings(s)},removeItem:n=>{delete s.extensionSettings[this.namespace][n],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(n){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let n=`${this.namespace}:${e}`;if(this._cache.has(n))return this._cache.get(n);let o=this._getStorage(),i=this._getFullKey(e),a=o.getItem(i);if(a===null)return s;try{let r=JSON.parse(a);return this._cache.set(n,r),r}catch{return a}}set(e,s){let n=this._getStorage(),o=this._getFullKey(e),i=`${this.namespace}:${e}`;this._cache.set(i,s);try{n.setItem(o,JSON.stringify(s))}catch(a){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,a)}}remove(e){let s=this._getStorage(),n=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.delete(o),s.removeItem(n)}has(e){let s=this._getStorage(),n=this._getFullKey(e);return s.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext();n?.extensionSettings?.[this.namespace]&&(n.extensionSettings[this.namespace]={},this._saveSettings(n))}}else{let s=`${this.namespace}_`,n=[];for(let o=0;o<localStorage.length;o++){let i=localStorage.key(o);i&&i.startsWith(s)&&n.push(i)}n.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(n=>{s[n]=this.get(n)}),s}setMultiple(e){Object.entries(e).forEach(([s,n])=>{this.set(s,n)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let i=n.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(i).forEach(([a,r])=>{s[a]=typeof r=="string"?JSON.parse(r):r})}}else{let n=`${this.namespace}_`;for(let o=0;o<localStorage.length;o++){let i=localStorage.key(o);if(i&&i.startsWith(n)){let a=i.slice(n.length);try{s[a]=JSON.parse(localStorage.getItem(i))}catch{s[a]=localStorage.getItem(i)}}}}return s}},A=new vt("youyou_toolkit"),ee=new vt("youyou_toolkit:tools"),Si=new vt("youyou_toolkit:presets"),fs=new vt("youyou_toolkit:windows")});var Jn={};ge(Jn,{DEFAULT_API_PRESETS:()=>Pa,DEFAULT_SETTINGS:()=>Da,STORAGE_KEYS:()=>ms,StorageService:()=>vt,deepMerge:()=>Ai,getCurrentPresetName:()=>Oa,getStorage:()=>Ti,loadApiPresets:()=>$a,loadSettings:()=>Ei,presetStorage:()=>Si,saveApiPresets:()=>Ga,saveSettings:()=>_i,setCurrentPresetName:()=>Na,storage:()=>A,toolStorage:()=>ee,windowStorage:()=>fs});function $a(){return A.get(ms.API_PRESETS)||[]}function Ga(t){A.set(ms.API_PRESETS,t)}function Oa(){return A.get(ms.CURRENT_PRESET)||""}function Na(t){A.set(ms.CURRENT_PRESET,t||"")}function Ai(t,e){let s=o=>o&&typeof o=="object"&&!Array.isArray(o),n={...t};return s(t)&&s(e)&&Object.keys(e).forEach(o=>{s(e[o])?o in t?n[o]=Ai(t[o],e[o]):Object.assign(n,{[o]:e[o]}):Object.assign(n,{[o]:e[o]})}),n}var ms,Da,Pa,Xn=q(()=>{Fe();Fe();ms={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},Da={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Pa=[]});var P,Qn,$,we=q(()=>{P={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Qn=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,n={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let i={callback:s,priority:o};return this.listeners.get(e).add(i),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let n=this.listeners.get(e);if(n){for(let o of n)if(o.callback===s){n.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let n=this.listeners.get(e);if(!n||n.size===0)return;let o=Array.from(n).sort((i,a)=>a.priority-i.priority);for(let{callback:i}of o)try{i(s)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,s){let n=o=>{this.off(e,n),s(o)};return this.on(e,n)}wait(e,s=0){return new Promise((n,o)=>{let i=null,a=this.once(e,r=>{i&&clearTimeout(i),n(r)});s>0&&(i=setTimeout(()=>{a(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},$=new Qn});function _(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function S(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}La(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function Ze(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:o=!1,noticeId:i=""}=s,a=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!a?.body){S(t,e,n);return}let r="yyt-top-notice-container",c="yyt-top-notice-styles",l=a.getElementById(r);if(l||(l=a.createElement("div"),l.id=r,l.style.cssText=`
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
    `,a.body.appendChild(l)),!a.getElementById(c)){let m=a.createElement("style");m.id=c,m.textContent=`
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
    `,a.head.appendChild(m)}if(i){let m=l.querySelector(`[data-notice-id="${i}"]`);m&&m.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,i&&(u.dataset.noticeId=i);let p=a.createElement("span");p.className="yyt-top-notice__icon",p.textContent=d[t]||d.info;let y=a.createElement("div");y.className="yyt-top-notice__content",y.textContent=e;let b=a.createElement("button");b.className="yyt-top-notice__close",b.type="button",b.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),b.textContent="\xD7";let h=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};b.addEventListener("click",h),u.appendChild(p),u.appendChild(y),u.appendChild(b),l.appendChild(u),o||setTimeout(h,n)}function La(t,e,s){let n=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!n)return;let o=n.getElementById("yyt-fallback-toast");o&&o.remove();let i={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=i[t]||i.info,r=n.createElement("div");if(r.id="yyt-fallback-toast",r.style.cssText=`
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
  `,r.textContent=e,!n.getElementById("yyt-toast-styles")){let c=n.createElement("style");c.id="yyt-toast-styles",c.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,n.head.appendChild(c)}n.body.appendChild(r),setTimeout(()=>{r.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{r.remove()},300)},s)}function Q(){if(kt)return kt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return kt=window.parent.jQuery,kt}catch{}return window.jQuery&&(kt=window.jQuery),kt}function Ua(){kt=null}function te(t){return t&&t.length>0}function St(t,e=f){if(!Q()||!te(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(n=o.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Dt(t,e,s=f){if(!Q()||!te(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",o);let a=t.find(`#${s}-custom-api-fields`);o?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Zn(t){let{id:e,title:s,body:n,width:o="380px",wide:i=!1}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${i?"yyt-dialog-wide":""}" style="${o!=="380px"?`width: ${o};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${n}
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function eo(t,e,s={}){if(!Q())return()=>{};let o=t.find(`#${e}-overlay`),i=()=>{o.remove(),s.onClose&&s.onClose()};return o.find(`#${e}-close, #${e}-cancel`).on("click",i),o.on("click",function(a){a.target===this&&i()}),o.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(i)}),i}function ut(t,e){let s=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(s),o=document.createElement("a");o.href=n,o.download=e,o.click(),URL.revokeObjectURL(n)}function pt(t){return new Promise((e,s)=>{let n=new FileReader;n.onload=o=>e(o.target.result),n.onerror=o=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var f,kt,et=q(()=>{f="youyou_toolkit";kt=null});var hs,ue,to=q(()=>{we();et();hs=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,$.emit(P.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,n={}){let o=Q();if(!o){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let i=this.components.get(e);if(!i){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let a;if(typeof s=="string"?a=o(s):s&&s.jquery?a=s:s&&(a=o(s)),!te(a)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let r=i.render({...n,dependencies:this.dependencies});a.html(r),i.bindEvents(a,this.dependencies),this.activeInstances.set(e,{container:a,component:i,props:n}),$.emit(P.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,$.emit(P.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,$.emit(P.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,n)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let n=e.createElement("style");n.id=s,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){$.on(P.PRESET_UPDATED,()=>{}),$.on(P.TOOL_UPDATED,()=>{})}},ue=new hs});var Mi={};ge(Mi,{API_STATUS:()=>ja,fetchAvailableModels:()=>ao,getApiConfig:()=>Tt,getEffectiveApiConfig:()=>bs,hasEffectiveApiPreset:()=>oo,sendApiRequest:()=>ro,sendWithPreset:()=>Wa,testApiConnection:()=>Za,updateApiConfig:()=>Vt,validateApiConfig:()=>qt});function Fa(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function no(){return A.get(wi,Fa())}function Ka(t){A.set(wi,t)}function Ii(){return A.get(Ba,[])}function Ha(){return A.get(za,"")}function so(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function Ri(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let n=null;try{n=new URL(s)}catch{return s}let o=n.pathname.replace(/\/+$/,""),i=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(i=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?i=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?i=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(i=`${o||""}/models`)),n.pathname=i.replace(/\/+/g,"/"),n.toString()}function Ya(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Tt(){return no().apiConfig||{}}function Vt(t){let e=no();e.apiConfig={...e.apiConfig,...t},Ka(e)}function qt(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function bs(t=""){let e=no(),s=t||Ha()||"";if(s){let o=Ii().find(i=>i.name===s);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function oo(t=""){return t?Ii().some(s=>s?.name===t):!1}async function Wa(t,e,s={},n=null){let o=bs(t);return await ro(e,{...s,apiConfig:o},n)}function Ci(t,e={}){let s=e.apiConfig||Tt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function io(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function ro(t,e={},s=null){let n=e.apiConfig||Tt(),o=n.useMainApi,i=qt(n);if(!i.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${i.errors.join(", ")}`);return o?await Va(t,e,s):await qa(t,n,e,s)}async function Va(t,e,s){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function qa(t,e,s,n){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await Ja(t,e,s,n,o)}catch(i){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",i)}if(o.SillyTavern?.getRequestHeaders)try{return await Xa(t,e,s,n,o)}catch(i){if(!i?.allowDirectFallback)throw i}return await Qa(t,e,s,n)}async function Ja(t,e,s,n,o){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let i=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:Ya(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof i=="string"?i.trim():io(i)}async function Xa(t,e,s,n,o){let i=String(e.url||"").trim(),a={...Ci(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:i,proxy_password:"",custom_url:i,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},r={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},c=null;try{c=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:r,body:JSON.stringify(a),signal:n})}catch(u){throw u?.name==="AbortError"?u:so(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let l=await c.text().catch(()=>"");if(!c.ok){let u=[404,405,501,502].includes(c.status);throw so(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${c.status}): ${l||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=l?JSON.parse(l):{}}catch{let p=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw so(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return io(d)}async function Qa(t,e,s,n){let o=Ci(t,{apiConfig:e,...s}),i=Ri(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let r=await fetch(i,{method:"POST",headers:a,body:JSON.stringify(o),signal:n}),c=await r.text().catch(()=>"");if(!r.ok){let d=c||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${r.status}): ${d}`)}let l=null;try{l=c?JSON.parse(c):{}}catch{let u=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return io(l)}async function Za(t=null){let e=t||Tt(),s=Date.now();try{await ro([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-s}}}async function ao(t=null){let e=t||Tt();return e.useMainApi?await el():await tl(e)}async function el(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function tl(t){if(!t.url||!t.apiKey)return[];try{let e=Ri(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let n=await s.json();return n.data&&Array.isArray(n.data)?n.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var wi,Ba,za,ja,js=q(()=>{Fe();wi="settings",Ba="api_presets",za="current_preset";ja={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var $i={};ge($i,{createPreset:()=>Vs,createPresetFromCurrentConfig:()=>al,deletePreset:()=>qs,duplicatePreset:()=>rl,exportPresets:()=>yo,generateUniquePresetName:()=>fo,getActiveConfig:()=>po,getActivePresetName:()=>Js,getAllPresets:()=>Jt,getPreset:()=>$t,getPresetNames:()=>ol,getStarredPresets:()=>uo,importPresets:()=>go,presetExists:()=>xs,renamePreset:()=>il,switchToPreset:()=>Gt,togglePresetStar:()=>co,updatePreset:()=>lo,validatePreset:()=>ll});function nl(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Pi(){return A.get(sl,nl())}function De(){return A.get(ki,[])}function Pt(t){A.set(ki,t)}function Ws(){return A.get(Di,"")}function Ys(t){A.set(Di,t||"")}function Jt(){return De()}function ol(){return De().map(e=>e.name)}function $t(t){return!t||typeof t!="string"?null:De().find(s=>s.name===t)||null}function xs(t){return!t||typeof t!="string"?!1:De().some(s=>s.name===t)}function Vs(t){let{name:e,description:s,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(xs(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let i={name:o,description:s||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=De();return a.push(i),Pt(a),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:i}}function lo(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=De(),n=s.findIndex(a=>a.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=s[n],i={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(i.apiConfig={...o.apiConfig,...e.apiConfig}),s[n]=i,Pt(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:i}}function qs(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=De(),s=e.findIndex(n=>n.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Pt(e),Ws()===t&&Ys(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function il(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!xs(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(xs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n=De(),o=n.find(i=>i.name===t);return o&&(o.name=s,o.updatedAt=Date.now(),Pt(n),Ws()===t&&Ys(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function rl(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),n=$t(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(xs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(n)),name:s,createdAt:Date.now(),updatedAt:Date.now()},i=De();return i.push(o),Pt(i),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:o}}function co(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=De(),s=e.find(n=>n.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Pt(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function uo(){return De().filter(e=>e.starred===!0)}function Gt(t){if(!t)return Ys(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=$t(t);return e?(Ys(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Js(){return Ws()}function po(){let t=Ws();if(t){let s=$t(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:Pi().apiConfig||{}}}function yo(t=null){if(t){let s=$t(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=De();return JSON.stringify(e,null,2)}function go(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(s)?s:[s];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=De(),i=0;for(let a of n){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let r=o.findIndex(c=>c.name===a.name);r>=0?e.overwrite&&(a.updatedAt=Date.now(),o[r]=a,i++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),o.push(a),i++)}return i>0&&Pt(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}function al(t,e=""){let s=Pi();return Vs({name:t,description:e,apiConfig:s.apiConfig})}function ll(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function fo(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=De(),s=new Set(e.map(o=>o.name));if(!s.has(t))return t;let n=1;for(;s.has(`${t} (${n})`);)n++;return`${t} (${n})`}var sl,ki,Di,Xs=q(()=>{Fe();sl="settings",ki="api_presets",Di="current_preset"});function Qs(t){return String(t||"").trim()}var tt,Ke,mo=q(()=>{we();et();js();Xs();tt=null;Ke={id:"apiPresetPanel",render(t){let e=po(),s=e?.apiConfig||Tt(),n=Qs(e?.presetName||Js()),o=Jt(),r=uo().slice(0,8),c=r.length>0?r.map(u=>this._renderPresetItem(u)).join(""):"",l=tt===null?n||"":Qs(tt),d=l||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${f}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${_(l)}">${_(d)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${l?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${o.length>0?o.map(u=>this._renderSelectOption(u,l)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${f}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
                <i class="fa-solid fa-download"></i> \u52A0\u8F7D
              </button>
            </div>
            
            ${c?`
            <div class="yyt-preset-list-compact">
              ${c}
            </div>
            `:""}
          </div>
          
          <!-- API\u914D\u7F6E\u533A -->
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-sliders"></i>
              <span>API\u914D\u7F6E</span>
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${f}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${f}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${f}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${f}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${f}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${f}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${_(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${_(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${_(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(t,e){let s=t.starred===!0,n=s?"yyt-option-star yyt-starred":"yyt-option-star",o=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${_(t.name)}">
        <button class="${n}" data-preset="${_(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${o}</button>
        <span class="yyt-option-text">${_(t.name)}</span>
      </div>
    `},_renderApiConfigForm(t){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${f}-use-main-api" ${t.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${f}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${f}-api-url" 
                   value="${_(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${f}-api-key" 
                     value="${_(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${f}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${f}-model" 
                     value="${_(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${f}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${f}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${f}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${f}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${f}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=Q();!s||!te(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${f}-preset-dropdown`),n=s.find(".yyt-select-trigger"),o=s.find(".yyt-select-value"),i=()=>{let a=String(o.data("value")||"").trim();if(!a){tt="",Gt(""),Dt(t,Tt(),f),t.find(".yyt-preset-item").removeClass("yyt-loaded"),S("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let r=$t(a);if(!r){S("error",`\u9884\u8BBE "${a}" \u4E0D\u5B58\u5728`);return}tt=a,Gt(a),Dt(t,r.apiConfig,f),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),S("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${a}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};n.on("click",function(a){a.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",a=>{if(e(a.target).hasClass("yyt-option-star"))return;let r=e(a.currentTarget),c=r.data("value"),l=r.find(".yyt-option-text").text();tt=String(c||"").trim(),o.text(l).data("value",c),s.find(".yyt-select-option").removeClass("yyt-selected"),r.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${f}-load-preset`).on("click",()=>{i()}),s.find(".yyt-option-star").on("click",a=>{a.preventDefault(),a.stopPropagation();let r=e(a.currentTarget).data("preset");if(!r)return;let c=co(r);if(c.success){S("success",c.message);let l=t.closest(".yyt-api-manager").parent();l.length&&this.renderTo(l)}else S("error",c.message)}),e(document).on("click.yyt-dropdown",a=>{e(a.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let o=e(s.currentTarget).data("preset-name"),i=e(s.target).closest("[data-action]").data("action");if(i)switch(s.stopPropagation(),i){case"load":t.find(".yyt-select-value").text(o).data("value",o),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${o.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${f}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${o}" \u5417\uFF1F`)){let a=qs(o);if(S(a.success?"info":"error",a.message),a.success){Qs(tt)===o&&(tt=null);let r=t.closest(".yyt-api-manager").parent();r.length&&this.renderTo(r)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${f}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),n=t.find(`#${f}-custom-api-fields`);s?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${f}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${f}-api-key`),n=s.attr("type");s.attr("type",n==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${f}-load-models`).on("click",async()=>{let s=t.find(`#${f}-load-models`),n=t.find(`#${f}-model`),o=t.find(`#${f}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let i=St(t,f),a=await ao(i);if(a.length>0){o.empty(),a.forEach(c=>{o.append(`<option value="${_(c)}">${_(c)}</option>`)}),n.hide(),o.show();let r=n.val();r&&a.includes(r)&&o.val(r),o.off("change").on("change",function(){n.val(e(this).val())}),S("success",`\u5DF2\u52A0\u8F7D ${a.length} \u4E2A\u6A21\u578B`)}else S("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(i){S("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${i.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${f}-model`).on("focus",function(){let s=t.find(`#${f}-model-select`);e(this).show(),s.hide()}),t.find(`#${f}-save-api-config`).on("click",()=>{let s=St(t,f),n=Qs(Js()),o=qt(s);if(!o.valid&&!s.useMainApi){S("error",o.errors.join(", "));return}if(n){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${n}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){Vt(s),Gt(""),tt="",S("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a);return}Vt(s);let i=lo(n,{apiConfig:s});if(i.success){tt=n,S("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${n}"`),Gt(n),$.emit(P.PRESET_UPDATED,{name:n});let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}else S("error",i.message);return}Vt(s),S("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${f}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Gt(""),tt="",Vt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),S("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${f}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${f}-export-presets`).on("click",()=>{try{let s=yo();ut(s,`youyou_toolkit_presets_${Date.now()}.json`),S("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){S("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${f}-import-presets`).on("click",()=>{t.find(`#${f}-import-file`).click()}),t.find(`#${f}-import-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let o=await pt(n),i=go(o,{overwrite:!0});if(S(i.success?"success":"error",i.message),i.imported>0){let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}catch(o){S("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let n=Jt().map(d=>d.name),o=fo("\u65B0\u9884\u8BBE"),i=`
      <div class="yyt-dialog-overlay" id="${f}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${f}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${f}-dialog-preset-name" 
                     value="${_(o)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${f}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${f}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${f}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e(`#${f}-dialog-overlay`).remove(),t.append(i);let a=e(`#${f}-dialog-overlay`),r=e(`#${f}-dialog-preset-name`),c=e(`#${f}-dialog-preset-desc`);r.focus().select();let l=()=>a.remove();a.find(`#${f}-dialog-close, #${f}-dialog-cancel`).on("click",l),a.on("click",function(d){d.target===this&&l()}),a.find(`#${f}-dialog-save`).on("click",()=>{let d=r.val().trim(),u=c.val().trim();if(!d){S("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),r.focus();return}if(n.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;qs(d)}let p=St(t,f),y=Vs({name:d,description:u,apiConfig:p});if(y.success){S("success",y.message),l(),$.emit(P.PRESET_CREATED,{preset:y.preset});let b=t.closest(".yyt-api-manager").parent();b.length&&this.renderTo(b)}else S("error",y.message)}),r.on("keypress",function(d){d.which===13&&a.find(`#${f}-dialog-save`).click()})},destroy(t){let e=Q();!e||!te(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
      /* CSS\u53D8\u91CF\u5B9A\u4E49 */
      .yyt-api-manager {
        --yyt-accent: #7bb7ff;
        --yyt-accent-glow: rgba(123, 183, 255, 0.4);
        --yyt-accent-soft: rgba(123, 183, 255, 0.15);
        --yyt-success: #4ade80;
        --yyt-success-glow: rgba(74, 222, 128, 0.3);
        --yyt-error: #f87171;
        --yyt-error-glow: rgba(248, 113, 113, 0.3);
        --yyt-warning: #fbbf24;
        --yyt-surface: rgba(255, 255, 255, 0.03);
        --yyt-surface-hover: rgba(255, 255, 255, 0.06);
        --yyt-surface-active: rgba(255, 255, 255, 0.08);
        --yyt-border: rgba(255, 255, 255, 0.08);
        --yyt-border-strong: rgba(255, 255, 255, 0.15);
        --yyt-text: rgba(255, 255, 255, 0.95);
        --yyt-text-secondary: rgba(255, 255, 255, 0.7);
        --yyt-text-muted: rgba(255, 255, 255, 0.45);
        --yyt-radius: 12px;
        --yyt-radius-sm: 8px;
        --yyt-radius-lg: 16px;
        --yyt-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
        --yyt-shadow-glow: 0 0 20px var(--yyt-accent-glow);
        
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      /* \u9762\u677F */
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
        transition: border-color 0.2s ease;
      }
      
      .yyt-panel-section:hover {
        border-color: var(--yyt-border-strong);
      }
      
      /* \u6807\u9898 */
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
        filter: drop-shadow(0 0 8px var(--yyt-accent-glow));
      }
      
      /* \u9884\u8BBE\u9009\u62E9\u5668 */
      .yyt-preset-selector {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      
      /* \u81EA\u5B9A\u4E49\u4E0B\u62C9\u6846 */
      .yyt-custom-select {
        position: relative;
        flex: 1;
        min-width: 0;
      }
      
      .yyt-select-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
        color: var(--yyt-text);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-select-trigger:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
      }
      
      .yyt-custom-select.yyt-open .yyt-select-trigger {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 3px var(--yyt-accent-soft), inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-select-value {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .yyt-select-arrow {
        color: var(--yyt-text-muted);
        transition: transform 0.2s ease;
        margin-left: 8px;
      }
      
      .yyt-custom-select.yyt-open .yyt-select-arrow {
        transform: rotate(180deg);
      }
      
      .yyt-select-dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        max-height: 0;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(20, 20, 35, 0.98) 0%, rgba(15, 15, 28, 0.98) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        z-index: 1000;
        opacity: 0;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .yyt-custom-select.yyt-open .yyt-select-dropdown {
        max-height: 300px;
        overflow-y: auto;
        opacity: 1;
      }
      
      .yyt-select-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      
      .yyt-select-option:hover {
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-select-option.yyt-selected {
        background: rgba(123, 183, 255, 0.15);
      }
      
      .yyt-option-star {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        color: var(--yyt-text-muted);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }
      
      .yyt-option-star.yyt-placeholder {
        width: 28px;
        visibility: hidden;
      }
      
      .yyt-option-star:hover {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-option-star.yyt-starred {
        color: #fbbf24;
      }
      
      .yyt-option-star.yyt-starred:hover {
        color: #fcd34d;
        background: rgba(251, 191, 36, 0.15);
      }
      
      .yyt-option-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--yyt-text);
        font-size: 13px;
      }
      
      /* \u9884\u8BBE\u5217\u8868 - \u7D27\u51D1\u6837\u5F0F */
      .yyt-preset-list-compact {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 150px;
        overflow-y: auto;
        padding-right: 4px;
      }
      
      .yyt-preset-list-compact::-webkit-scrollbar {
        width: 4px;
      }
      
      .yyt-preset-list-compact::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .yyt-preset-list-compact::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 2px;
      }
      
      /* \u9884\u8BBE\u9879 - \u7D27\u51D1\u6837\u5F0F */
      .yyt-preset-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        transition: all 0.2s ease;
      }
      
      .yyt-preset-item:hover {
        background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
        border-color: rgba(255, 255, 255, 0.12);
      }
      
      .yyt-preset-item.active {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
        border-color: rgba(123, 183, 255, 0.3);
      }
      
      .yyt-preset-item.yyt-loaded {
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.04) 100%);
        border-color: rgba(74, 222, 128, 0.3);
      }
      
      .yyt-preset-info {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .yyt-preset-name {
        font-weight: 500;
        font-size: 13px;
        color: var(--yyt-text);
      }
      
      .yyt-preset-meta {
        display: flex;
        gap: 6px;
      }
      
      .yyt-preset-actions {
        display: flex;
        gap: 4px;
        opacity: 0.5;
        transition: opacity 0.2s ease;
      }
      
      .yyt-preset-item:hover .yyt-preset-actions {
        opacity: 1;
      }
      
      /* \u5FBD\u7AE0 */
      .yyt-badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
      }
      
      .yyt-badge-small {
        padding: 2px 8px;
        font-size: 10px;
        background: linear-gradient(135deg, var(--yyt-accent-soft) 0%, rgba(123, 183, 255, 0.08) 100%);
        color: var(--yyt-accent);
        border: 1px solid rgba(123, 183, 255, 0.2);
      }
      
      /* \u8868\u5355 */
      .yyt-form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .yyt-form-group label {
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-secondary);
        letter-spacing: 0.3px;
      }
      
      .yyt-form-row {
        display: flex;
        gap: 12px;
      }
      
      .yyt-form-row-2col > .yyt-form-group {
        flex: 1;
      }
      
      .yyt-flex-1 {
        flex: 1;
      }
      
      /* Toggle\u5F00\u5173 */
      .yyt-toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        transition: all 0.2s ease;
      }
      
      .yyt-toggle-row:hover {
        background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
        border-color: var(--yyt-border-strong);
      }
      
      .yyt-toggle-label {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      
      .yyt-toggle-label > span:first-child {
        font-weight: 600;
        font-size: 14px;
        color: var(--yyt-text);
      }
      
      .yyt-toggle-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }
      
      .yyt-toggle {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 26px;
        flex-shrink: 0;
      }
      
      .yyt-toggle input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .yyt-toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: 26px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .yyt-toggle-slider::before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      
      .yyt-toggle input:checked + .yyt-toggle-slider {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
        border-color: var(--yyt-accent);
        box-shadow: 0 0 12px var(--yyt-accent-glow);
      }
      
      .yyt-toggle input:checked + .yyt-toggle-slider::before {
        transform: translateX(22px);
      }
      
      .yyt-toggle input:focus + .yyt-toggle-slider {
        box-shadow: 0 0 0 3px var(--yyt-accent-soft);
      }
      
      /* \u8F93\u5165\u6846 */
      .yyt-input,
      .yyt-select,
      .yyt-textarea {
        padding: 10px 14px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
        color: var(--yyt-text);
        font-size: 13px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-select {
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E") !important;
        background-repeat: no-repeat !important;
        background-position: right 12px center !important;
        padding-right: 32px;
        background-color: #1a1a2e !important;
        color: #ffffff !important;
        filter: none !important;
      }
      
      .yyt-select option,
      select.yyt-select option {
        background-color: #1a1a2e !important;
        background: #1a1a2e !important;
        color: #ffffff !important;
        padding: 8px 12px;
        margin: 2px 0;
        border-radius: 4px;
        filter: none !important;
      }
      
      .yyt-input:hover,
      .yyt-select:hover,
      .yyt-textarea:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
      }
      
      .yyt-input:focus,
      .yyt-select:focus,
      .yyt-textarea:focus {
        outline: none;
        border-color: var(--yyt-accent);
        background: linear-gradient(180deg, rgba(123, 183, 255, 0.05) 0%, rgba(123, 183, 255, 0.02) 100%);
        box-shadow: 0 0 0 3px var(--yyt-accent-soft), inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-input,
      .yyt-textarea {
        background-color: #1a1a2e !important;
        color: #ffffff !important;
        filter: none !important;
      }
      
      .yyt-input::placeholder,
      .yyt-textarea::placeholder {
        color: var(--yyt-text-muted);
      }
      
      .yyt-input-group {
        display: flex;
        gap: 8px;
      }
      
      .yyt-input-group .yyt-input {
        flex: 1;
      }
      
      /* \u6A21\u578B\u884C */
      .yyt-model-row {
        display: flex;
        gap: 8px;
        align-items: stretch;
      }
      
      .yyt-model-input {
        flex: 1;
        min-width: 0;
      }
      
      .yyt-model-select {
        flex: 1;
        min-width: 0;
      }
      
      .yyt-model-btn {
        flex-shrink: 0;
        min-width: 40px;
        color: var(--yyt-accent);
        border-color: rgba(123, 183, 255, 0.25);
      }
      
      .yyt-model-btn:hover {
        color: var(--yyt-accent);
      }
      
      .yyt-model-btn i {
        color: var(--yyt-accent);
      }
      
      .yyt-disabled {
        opacity: 0.4;
        pointer-events: none;
        filter: grayscale(0.5);
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
      
      /* \u6309\u94AE */
      .yyt-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 16px;
        border: none;
        border-radius: var(--yyt-radius-sm);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        letter-spacing: 0.2px;
      }
      
      .yyt-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
        pointer-events: none;
      }
      
      .yyt-btn-primary {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
        color: #0b0f15;
        box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }
      
      .yyt-btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      }
      
      .yyt-btn-primary:active {
        transform: translateY(0);
        box-shadow: 0 2px 10px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      }
      
      .yyt-btn-secondary {
        background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
        color: var(--yyt-text);
        border: 1px solid var(--yyt-border);
      }
      
      .yyt-btn-secondary:hover {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, var(--yyt-surface-hover) 100%);
        border-color: var(--yyt-border-strong);
        transform: translateY(-1px);
      }
      
      .yyt-btn-danger {
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(248, 113, 113, 0.05) 100%);
        color: var(--yyt-error);
        border: 1px solid rgba(248, 113, 113, 0.25);
      }
      
      .yyt-btn-danger:hover {
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.25) 0%, rgba(248, 113, 113, 0.1) 100%);
        box-shadow: 0 4px 15px var(--yyt-error-glow);
      }
      
      .yyt-btn-icon {
        padding: 8px;
        min-width: 36px;
      }
      
      .yyt-btn-small {
        padding: 6px 10px;
        font-size: 11px;
      }
      
      .yyt-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
      }
      
      /* \u5BF9\u8BDD\u6846 */
      .yyt-dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: yytFadeIn 0.2s ease-out;
      }
      
      @keyframes yytFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .yyt-dialog {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 30%), #0d1117;
        border: 1px solid var(--yyt-border-strong);
        border-radius: var(--yyt-radius);
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
        width: 380px;
        max-width: 90vw;
        animation: yytSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      @keyframes yytSlideIn {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(-10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      .yyt-dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--yyt-border);
      }
      
      .yyt-dialog-title {
        font-weight: 600;
        font-size: 15px;
        color: var(--yyt-text);
      }
      
      .yyt-dialog-close {
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--yyt-text-muted);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      
      .yyt-dialog-close:hover {
        background: rgba(248, 113, 113, 0.15);
        color: var(--yyt-error);
      }
      
      .yyt-dialog-body {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .yyt-dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 16px 20px;
        border-top: 1px solid var(--yyt-border);
      }
      
      /* \u52A8\u753B */
      @keyframes yytFadeSlideIn {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .yyt-panel-section {
        animation: yytFadeSlideIn 0.25s ease-out backwards;
      }
      
      .yyt-panel-section:nth-child(1) { animation-delay: 0s; }
      .yyt-panel-section:nth-child(2) { animation-delay: 0.05s; }
      .yyt-panel-section:nth-child(3) { animation-delay: 0.1s; }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Yi={};ge(Yi,{MESSAGE_MACROS:()=>ji,addTagRule:()=>Xt,createRuleTemplate:()=>Bi,default:()=>ul,deleteRulePreset:()=>Ki,deleteRuleTemplate:()=>Fi,deleteTagRule:()=>vs,escapeRegex:()=>Ot,exportRulesConfig:()=>an,extractComplexTag:()=>Oi,extractCurlyBraceTag:()=>So,extractHtmlFormatTag:()=>Ni,extractSimpleTag:()=>vo,extractTagContent:()=>Nt,generateTagSuggestions:()=>tn,getAllRulePresets:()=>on,getAllRuleTemplates:()=>Li,getContentBlacklist:()=>Lt,getRuleTemplate:()=>Ui,getTagRules:()=>yt,importRulesConfig:()=>ln,isValidTagName:()=>xo,loadRulePreset:()=>rn,saveRulesAsPreset:()=>nn,scanTextForTags:()=>en,setContentBlacklist:()=>Ss,setTagRules:()=>sn,shouldSkipContent:()=>bo,testRegex:()=>Hi,updateRuleTemplate:()=>zi,updateTagRule:()=>Qt});function cl(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...ho],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Oe(){return A.get(Gi,cl())}function st(t){A.set(Gi,t)}function Zs(){let t=Oe();return Ie=t.ruleTemplates||[...ho],ae=t.tagRules||[],Pe=t.contentBlacklist||[],{ruleTemplates:Ie,tagRules:ae,contentBlacklist:Pe}}function Ot(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function bo(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(n=>{let o=n.trim().toLowerCase();return o&&s.includes(o)})}function xo(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!dl.includes(t.toLowerCase())}function vo(t,e){if(!t||!e)return[];let s=[],n=Ot(e),o=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(c=>{c[1]&&s.push(c[1].trim())});let a=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,r=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>r&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-r} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function So(t,e){if(!t||!e)return[];let s=[],n=Ot(e),o=new RegExp(`\\{${n}\\|`,"gi"),i;for(;(i=o.exec(t))!==null;){let a=i.index,r=a+i[0].length,c=1,l=r;for(;l<t.length&&c>0;)t[l]==="{"?c++:t[l]==="}"&&c--,l++;if(c===0){let d=t.substring(r,l-1);d.trim()&&s.push(d.trim())}o.lastIndex=a+1}return s}function Oi(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=s[0].trim(),o=s[1].trim(),i=o.match(/<\/(\w+)>/);if(!i)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let a=i[1],r=new RegExp(`${Ot(n)}([\\s\\S]*?)<\\/${a}>`,"gi"),c=[];return[...t.matchAll(r)].forEach(d=>{d[1]&&c.push(d[1].trim())}),c}function Ni(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=s[1],o=[],i=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(i)].forEach(l=>{l[1]&&o.push(l[1].trim())});let r=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,c=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return r>c&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${r-c} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),o}function Nt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),i=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of n)try{let u=new RegExp(`<${Ot(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ot(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:u})}let r=[];if(o.length>0)for(let d of o){let u=[];try{if(d.type==="include")u.push(...vo(a,d.value)),u.push(...So(a,d.value));else if(d.type==="regex_include"){let p=new RegExp(d.value,"gi");[...a.matchAll(p)].forEach(b=>{b[1]&&u.push(b[1])})}}catch(p){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:p})}u.forEach(p=>r.push(p.trim()))}else r.push(a);let c=[];for(let d of r){for(let u of i)try{let p=new RegExp(u.value,"gi");d=d.replace(p,"")}catch(p){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:p})}bo(d,s)||c.push(d)}return c.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function en(t,e={}){let s=performance.now(),{chunkSize:n=5e4,maxTags:o=100,timeoutMs:i=5e3}=e,a=new Set,r=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,c=0,l=0;for(let u=0;u<t.length;u+=n){let p=t.slice(u,Math.min(u+n,t.length));if(l++,c+=p.length,performance.now()-s>i){console.warn(`[YouYouToolkit] Tag scanning timed out after ${i}ms`);break}let y;for(;(y=r.exec(p))!==null&&a.size<o;){let b=(y[1]||y[2]).toLowerCase();xo(b)&&a.add(b)}if(a.size>=o)break;l%5===0&&await new Promise(b=>setTimeout(b,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:c,totalChars:t.length,chunkCount:l,tagsFound:a.size}}}function tn(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Li(){return Ie.length===0&&Zs(),Ie}function Ui(t){return Ie.find(e=>e.id===t)}function Bi(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return Ie.push(e),To(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function zi(t,e){let s=Ie.findIndex(n=>n.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Ie[s]={...Ie[s],...e,updatedAt:new Date().toISOString()},To(),{success:!0,template:Ie[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Fi(t){let e=Ie.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Ie.splice(e,1),To(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function To(){let t=Oe();t.ruleTemplates=Ie,st(t)}function yt(){return ae||Zs(),ae}function sn(t){ae=t||[];let e=Oe();e.tagRules=ae,st(e)}function Xt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};ae.push(e);let s=Oe();return s.tagRules=ae,st(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Qt(t,e){if(t<0||t>=ae.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ae[t]={...ae[t],...e};let s=Oe();return s.tagRules=ae,st(s),{success:!0,rule:ae[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function vs(t){if(t<0||t>=ae.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ae.splice(t,1);let e=Oe();return e.tagRules=ae,st(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Lt(){return Pe||Zs(),Pe}function Ss(t){Pe=t||[];let e=Oe();e.contentBlacklist=Pe,st(e)}function nn(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Oe();s.tagRulePresets||(s.tagRulePresets={});let n=`preset-${Date.now()}`;return s.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(ae)),blacklist:JSON.parse(JSON.stringify(Pe)),createdAt:new Date().toISOString()},st(s),{success:!0,preset:s.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function on(){let e=Oe().tagRulePresets||{};return Object.values(e)}function rn(t){let e=Oe(),n=(e.tagRulePresets||{})[t];return n?(ae=JSON.parse(JSON.stringify(n.rules||[])),Pe=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=ae,e.contentBlacklist=Pe,st(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ki(t){let e=Oe(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,st(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function an(){return JSON.stringify({tagRules:ae,contentBlacklist:Pe,ruleTemplates:Ie,tagRulePresets:Oe().tagRulePresets||{}},null,2)}function ln(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)ae=s.tagRules||[],Pe=s.contentBlacklist||[],Ie=s.ruleTemplates||ho;else if(s.tagRules&&ae.push(...s.tagRules),s.contentBlacklist){let o=new Set(Pe.map(i=>i.toLowerCase()));s.contentBlacklist.forEach(i=>{o.has(i.toLowerCase())||Pe.push(i)})}let n=Oe();return n.tagRules=ae,n.contentBlacklist=Pe,n.ruleTemplates=Ie,s.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...s.tagRulePresets}),st(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Hi(t,e,s="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,s),i=[];if(s.includes("g")){let a;for(;(a=o.exec(e))!==null;)a.length>1?i.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[n]||a[1]||a[0]}):i.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=o.exec(e);a&&i.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[n]||a[1]:a[0]})}return{success:!0,matches:i,count:i.length,extracted:i.map(a=>a.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var Gi,dl,ho,Ie,ae,Pe,ji,ul,cn=q(()=>{Fe();Gi="settings";dl=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],ho=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],Ie=[],ae=[],Pe=[];ji={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Zs();ul={extractTagContent:Nt,extractSimpleTag:vo,extractCurlyBraceTag:So,extractComplexTag:Oi,extractHtmlFormatTag:Ni,escapeRegex:Ot,shouldSkipContent:bo,isValidTagName:xo,scanTextForTags:en,generateTagSuggestions:tn,getAllRuleTemplates:Li,getRuleTemplate:Ui,createRuleTemplate:Bi,updateRuleTemplate:zi,deleteRuleTemplate:Fi,getTagRules:yt,setTagRules:sn,addTagRule:Xt,updateTagRule:Qt,deleteTagRule:vs,getContentBlacklist:Lt,setContentBlacklist:Ss,saveRulesAsPreset:nn,getAllRulePresets:on,loadRulePreset:rn,deleteRulePreset:Ki,exportRulesConfig:an,importRulesConfig:ln,testRegex:Hi,MESSAGE_MACROS:ji}});var He,Eo=q(()=>{we();et();cn();He={id:"regexExtractPanel",render(t){let e=yt(),s=Lt(),n=on();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${f}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
            </button>
          </div>
          
          ${this._renderRulesEditor(e,s,n)}
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
            <button class="yyt-btn yyt-btn-secondary" id="${f}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${f}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${f}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${f}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${f}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${f}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${f}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(t,e,s){let n=t.length>0?t.map((i,a)=>this._renderRuleItem(i,a)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',o=s.length>0?s.map(i=>`<option value="${i.id}">${_(i.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${o?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${f}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${o}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${f}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${f}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${f}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${n}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${f}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${f}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${f}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${f}-content-blacklist" 
                 value="${_(e.join(", "))}" 
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
               value="${_(t.value||"")}">
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
          <textarea class="yyt-textarea" id="${f}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${f}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${f}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${f}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${f}-test-result"></div>
        </div>
      </div>
    `},bindEvents(t,e){let s=Q();!s||!te(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val();Qt(n,{type:o}),S("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val().trim();Qt(n,{value:o})}),t.find(".yyt-rule-enabled").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).is(":checked");Qt(n,{enabled:o}),S("info",o?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let n=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(vs(n),this.renderTo(t),S("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let o=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(vs(o),this.renderTo(t),S("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${f}-add-rule`).on("click",()=>{Xt({type:"include",value:"",enabled:!0}),this.renderTo(t),S("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${f}-scan-tags`).on("click",async()=>{let s=t.find(`#${f}-scan-tags`),n=t.find(`#${f}-test-input`).val();if(!n||!n.trim()){S("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=await en(n,{maxTags:50,timeoutMs:3e3}),{suggestions:i,stats:a}=tn(o,25);if(i.length===0){S("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${f}-tag-suggestions-container`).hide();return}let r=t.find(`#${f}-tag-list`);t.find(`#${f}-tag-scan-stats`).text(`${a.finalCount}/${a.totalFound} \u4E2A\u6807\u7B7E, ${o.stats.processingTimeMs}ms`),r.empty(),i.forEach(l=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${_(l)}</button>`);d.on("click",()=>{if(yt().some(y=>y.type==="include"&&y.value===l)){S("warning",`\u89C4\u5219 "\u5305\u542B: ${l}" \u5DF2\u5B58\u5728`);return}Xt({type:"include",value:l,enabled:!0}),this.renderTo(t),S("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${l}"`)}),r.append(d)}),t.find(`#${f}-tag-suggestions-container`).show(),S("success",`\u53D1\u73B0 ${i.length} \u4E2A\u6807\u7B7E`)}catch(o){S("error",`\u626B\u63CF\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${f}-add-exclude-cot`).on("click",()=>{let s=yt(),n="<!--[\\s\\S]*?-->";if(s.some(i=>i.type==="regex_exclude"&&i.value===n)){S("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Xt({type:"regex_exclude",value:n,enabled:!0}),this.renderTo(t),S("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${f}-content-blacklist`).on("change",function(){let n=e(this).val().split(",").map(o=>o.trim()).filter(o=>o);Ss(n),S("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${n.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${f}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.find(`#${f}-load-rule-preset`).on("click",()=>{let s=t.find(`#${f}-rule-preset-select`).val();if(!s){S("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let n=rn(s);n.success?(this.renderTo(t),S("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${n.preset.name}`),$.emit(P.REGEX_PRESET_LOADED,{preset:n.preset})):S("error",n.message)}),t.find(`#${f}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let n=nn(s.trim());n.success?(this.renderTo(t),S("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):S("error",n.message)})},_bindTestEvents(t,e){t.find(`#${f}-test-extract`).on("click",()=>{let s=t.find(`#${f}-test-input`).val();if(!s||!s.trim()){S("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let n=yt(),o=Lt(),i=Nt(s,n,o),a=t.find(`#${f}-test-result-container`),r=t.find(`#${f}-test-result`);a.show(),!i||!i.trim()?(r.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),S("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(r.html(`<pre class="yyt-code-block">${_(i)}</pre>`),S("success","\u63D0\u53D6\u5B8C\u6210"),$.emit(P.REGEX_EXTRACTED,{result:i}))}),t.find(`#${f}-test-clear`).on("click",()=>{t.find(`#${f}-test-input`).val(""),t.find(`#${f}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${f}-import-rules`).on("click",()=>{t.find(`#${f}-import-rules-file`).click()}),t.find(`#${f}-import-rules-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let o=await pt(n),i=ln(o,{overwrite:!0});i.success?(this.renderTo(t),S("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):S("error",i.message)}catch(o){S("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.find(`#${f}-export-rules`).on("click",()=>{try{let s=an();ut(s,`youyou_toolkit_rules_${Date.now()}.json`),S("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){S("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${f}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(sn([]),Ss([]),this.renderTo(t),S("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!Q()||!te(t)||t.find("*").off()},getStyles(){return`
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
        padding: 10px 12px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        transition: all 0.2s ease;
      }
      
      .yyt-rule-item:hover {
        background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
        border-color: rgba(255, 255, 255, 0.12);
      }
      
      .yyt-rule-enabled-label {
        flex-shrink: 0;
        white-space: nowrap;
      }
      
      /* \u6807\u7B7E\u5EFA\u8BAE\u533A\u57DF */
      .yyt-tag-suggestions {
        margin-top: 12px;
        padding: 12px;
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(74, 222, 128, 0.02) 100%);
        border: 1px solid rgba(74, 222, 128, 0.2);
        border-radius: var(--yyt-radius-sm);
      }
      
      .yyt-tag-suggestions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-secondary);
      }
      
      .yyt-tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      
      .yyt-tag-list .yyt-btn {
        cursor: pointer;
      }
      
      .yyt-tag-list .yyt-btn:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.2) 0%, rgba(123, 183, 255, 0.1) 100%);
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
      
      .yyt-checkbox-label {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: var(--yyt-text-secondary);
        cursor: pointer;
      }
      
      .yyt-checkbox-label input {
        width: 14px;
        height: 14px;
        cursor: pointer;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Wi={};ge(Wi,{DEFAULT_TOOL_PRESETS:()=>nt,DEFAULT_TOOL_STRUCTURE:()=>Re,TOOL_STORAGE_KEYS:()=>ie,cloneTool:()=>gl,createDefaultToolDefinition:()=>Ts,deleteTool:()=>Ao,deleteToolPreset:()=>hl,exportTools:()=>Ro,getAllToolPresets:()=>Io,getAllTools:()=>Ut,getCurrentToolPresetId:()=>bl,getTool:()=>es,getToolPreset:()=>fl,importTools:()=>Co,normalizeToolDefinitionToRuntimeConfig:()=>dn,resetTools:()=>Mo,saveTool:()=>un,saveToolPreset:()=>ml,setCurrentToolPreset:()=>xl,setToolEnabled:()=>wo,validateTool:()=>vl});function Zt(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function _o(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function pl(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function yl(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let n=pl(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Ts(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...Re,...t,id:t?.id||Re.id,icon:t?.icon||Re.icon,order:Number.isFinite(t?.order)?t.order:Re.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Re.promptTemplate,extractTags:Zt(t?.extractTags),config:{...Re.config,...s,trigger:{...Re.config.trigger,...s.trigger||{},events:Zt(s?.trigger?.events)},execution:{...Re.config.execution,...s.execution||{},timeout:_o(s?.execution?.timeout,Re.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||Re.config.execution.retries)},api:{...Re.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...Re.config.context,...s.context||{},depth:_o(s?.context?.depth,Re.config.context.depth),includeTags:Zt(s?.context?.includeTags),excludeTags:Zt(s?.context?.excludeTags)}},enabled:t?.enabled!==!1,metadata:{...Re.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function dn(t,e={},s={}){let n=Ts({...e,id:t||e?.id||""}),o=Zt(n?.config?.trigger?.events),i=Zt(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),a=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),r=yl(t,n),c=o[0]||"GENERATION_ENDED",l=o.includes("GENERATION_ENDED"),d=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,trigger:{event:c,enabled:l},bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:d,apiPreset:a,overwrite:!0,enabled:d==="post_response_api"?l:!1},extraction:{enabled:!0,maxMessages:_o(n?.config?.context?.depth,5),selectors:i},promptTemplate:r,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:a,extractTags:i,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function Ut(){let t=ee.get(ie.TOOLS),e=t&&typeof t=="object"?{...nt,...t}:{...nt};return Object.fromEntries(Object.entries(e).map(([s,n])=>[s,Ts({...n||{},id:s})]))}function es(t){return Ut()[t]||null}function un(t,e){if(!t||!e)return!1;let s=ee.get(ie.TOOLS)||{},n=!s[t]&&!nt[t],o=Ts({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=o,ee.set(ie.TOOLS,s),$.emit(n?P.TOOL_REGISTERED:P.TOOL_UPDATED,{toolId:t,tool:o}),!0}function Ao(t){if(nt[t])return!1;let e=ee.get(ie.TOOLS)||{};return e[t]?(delete e[t],ee.set(ie.TOOLS,e),$.emit(P.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function wo(t,e){let s=es(t);if(!s)return!1;let n=ee.get(ie.TOOLS)||{};return n[t]||(n[t]={...s}),n[t].enabled=e,n[t].metadata={...n[t].metadata,updatedAt:new Date().toISOString()},ee.set(ie.TOOLS,n),$.emit(e?P.TOOL_ENABLED:P.TOOL_DISABLED,{toolId:t}),!0}function gl(t,e,s){let n=es(t);if(!n)return!1;let o=JSON.parse(JSON.stringify(n));return o.name=s||`${n.name} (\u526F\u672C)`,o.metadata={...o.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},un(e,o)}function Io(){let t=ee.get(ie.PRESETS);return t&&typeof t=="object"?{...nt,...t}:{...nt}}function fl(t){return Io()[t]||null}function ml(t,e){if(!t||!e)return!1;let s=ee.get(ie.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},ee.set(ie.PRESETS,s),!0}function hl(t){if(nt[t])return!1;let e=ee.get(ie.PRESETS)||{};return e[t]?(delete e[t],ee.set(ie.PRESETS,e),!0):!1}function bl(){return ee.get(ie.CURRENT_PRESET)||null}function xl(t){return Io()[t]?(ee.set(ie.CURRENT_PRESET,t),!0):!1}function Ro(){let t=ee.get(ie.TOOLS)||{},e=ee.get(ie.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Co(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=s?{}:ee.get(ie.TOOLS)||{},i=s?{}:ee.get(ie.PRESETS)||{},a=0,r=0;if(n.tools&&typeof n.tools=="object"){for(let[c,l]of Object.entries(n.tools))nt[c]&&!s||l&&typeof l=="object"&&(o[c]=Ts({...l,id:c}),a++);ee.set(ie.TOOLS,o)}if(n.presets&&typeof n.presets=="object"){for(let[c,l]of Object.entries(n.presets))nt[c]&&!s||l&&typeof l=="object"&&(i[c]=l,r++);ee.set(ie.PRESETS,i)}return{success:!0,toolsImported:a,presetsImported:r,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${r} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Mo(){ee.remove(ie.TOOLS),ee.remove(ie.PRESETS),ee.remove(ie.CURRENT_PRESET)}function vl(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:n,api:o,context:i}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),n&&((typeof n.timeout!="number"||n.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof n.retries!="number"||n.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),i&&typeof i.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var Re,nt,ie,pn=q(()=>{Fe();we();Re={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},nt={},ie={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var dr={};ge(dr,{TOOL_CATEGORIES:()=>Vi,TOOL_REGISTRY:()=>ts,appendToolRuntimeHistory:()=>ws,clearToolApiPreset:()=>nr,default:()=>Rl,ensureToolRuntimeConfig:()=>gn,getAllDefaultToolConfigs:()=>ar,getAllToolApiBindings:()=>or,getAllToolFullConfigs:()=>Oo,getEnabledTools:()=>ns,getToolApiPreset:()=>$o,getToolBaseConfig:()=>yn,getToolConfig:()=>As,getToolFullConfig:()=>de,getToolList:()=>Zi,getToolSubTabs:()=>er,getToolWindowState:()=>cr,hasTool:()=>Po,onPresetDeleted:()=>ir,patchToolRuntime:()=>ss,registerTool:()=>Xi,resetToolConfig:()=>rr,resetToolRegistry:()=>tr,saveToolConfig:()=>it,saveToolWindowState:()=>lr,setToolApiPreset:()=>sr,setToolApiPresetConfig:()=>Al,setToolBypassConfig:()=>wl,setToolOutputMode:()=>_l,setToolPromptTemplate:()=>Il,unregisterTool:()=>Qi,updateToolRuntime:()=>Go});function Es(t={}){let e=Array.isArray(t?.recentTriggerHistory)?t.recentTriggerHistory.filter(Boolean):[],s=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0,lastTriggerAt:0,lastTriggerEvent:"",lastMessageKey:"",lastExecutionKey:"",lastSkipReason:"",lastExecutionPath:"",lastWritebackStatus:"",lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0,lastTraceId:"",...t,recentTriggerHistory:e,recentWritebackHistory:s}}function Sl(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function qi(){let t=Ut()||{};return Object.entries(t).filter(([e])=>!_s[e]).map(([e,s])=>[e,s||{}])}function Ji(){let t=Array.isArray(ts.tools?.subTabs)?[...ts.tools.subTabs]:[],e=qi().map(([s,n],o)=>{let i=dn(s,n);return{id:s,name:i.name||s,icon:i.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(i.order)?i.order:100+o,isCustom:!0,description:i.description||""}});return[...t,...e].sort((s,n)=>(s.order??0)-(n.order??0))}function Tl(t,e={}){let s=dn(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:Es(s.runtime)}}function Do(t){let e=_s[t];if(e)return{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:Es(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=(Ut()||{})[t]||null;return n?Tl(t,n):As(t)}function yn(t){let e=Do(t);return e?{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function El(t,e={},s=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.trigger={...t.trigger||{},...e.trigger||{}},n.output={...t.output||{},...e.output||{}},n.bypass={...t.bypass||{},...e.bypass||{}},n.runtime=Es({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}};let o=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||s||"";return n.output={...n.output||{},apiPreset:o},n.apiPreset=o,(!Array.isArray(n.extraction.selectors)||n.extraction.selectors.length===0)&&Array.isArray(n.extractTags)&&n.extractTags.length>0&&(n.extraction.selectors=[...n.extractTags]),(!Array.isArray(n.extractTags)||n.extractTags.length===0)&&(n.extractTags=Array.isArray(n.extraction.selectors)?[...n.extraction.selectors]:[]),t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function Xi(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let n of s)if(!e[n])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return ot[t]={id:t,...e,order:e.order??Object.keys(ot).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Qi(t){return ot[t]?(delete ot[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Zi(t=!0){let e=Object.values(ot).map(s=>s.id==="tools"?{...s,subTabs:Ji()}:s);return t?e.sort((s,n)=>(s.order??0)-(n.order??0)):e}function As(t){return t==="tools"&&ot[t]?{...ot[t],subTabs:Ji()}:ot[t]||null}function Po(t){return!!ot[t]}function er(t){let e=As(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function tr(){ot={...ts},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function sr(t,e){if(!Po(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=A.get(Be)||{};return s[t]=e||"",A.set(Be,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function $o(t){return(A.get(Be)||{})[t]||""}function nr(t){let e=A.get(Be)||{};delete e[t],A.set(Be,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function or(){return A.get(Be)||{}}function ir(t){let e=A.get(Be)||{},s=!1;for(let n in e)e[n]===t&&(e[n]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&A.set(Be,e)}function de(t){let e=Do(t);if(!e)return As(t);let n=(A.get(Bt)||{})[t]||{},o=$o(t);return El({...e,id:t},n,o)}function gn(t){if(!t)return!1;let e=Do(t);if(!e)return!1;let s=A.get(Bt)||{};if(s[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};s[t]=n,A.set(Bt,s);let o=A.get(Be)||{};return o[t]=n.output?.apiPreset||n.apiPreset||"",A.set(Be,o),$.emit(P.TOOL_UPDATED,{toolId:t,config:n}),!0}function it(t,e,s={}){if(!t||!de(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=s,o=A.get(Bt)||{},i=A.get(Be)||{},a=e?.output?.apiPreset??e?.apiPreset??"",r=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return o[t]={},r.forEach(c=>{if(e[c]!==void 0){if(c==="output"&&e.output){o[t][c]={...e.output,apiPreset:a};return}if(c==="apiPreset"){o[t][c]=a;return}o[t][c]=e[c]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=a),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:a}),A.set(Bt,o),i[t]=a,A.set(Be,i),n&&$.emit(P.TOOL_UPDATED,{toolId:t,config:o[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function _l(t,e){let s=de(t);return s?it(t,{...s,output:{...s.output,mode:e}}):!1}function Al(t,e){let s=de(t);return s?it(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function wl(t,e){let s=de(t);return s?it(t,{...s,bypass:{...s.bypass,...e}}):!1}function Il(t,e){let s=de(t);return s?it(t,{...s,promptTemplate:e}):!1}function ss(t,e,s={}){let n=de(t);if(!n)return!1;let{touchLastRunAt:o=!1,emitEvent:i=!1}=s,a=Es({...n.runtime||{},...e||{}});return o&&(a.lastRunAt=Date.now()),it(t,{...n,runtime:a},{emitEvent:i})}function ws(t,e,s={},n={}){let o=de(t);if(!o)return!1;let{limit:i=10,emitEvent:a=!1}=n,r=Es(o.runtime||{}),c=e==="writeback"?"recentWritebackHistory":"recentTriggerHistory",l={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return r[c]=Sl([...Array.isArray(r[c])?r[c]:[],l],i),l?.traceId&&(r.lastTraceId=l.traceId),it(t,{...o,runtime:r},{emitEvent:a})}function Go(t,e){return ss(t,e,{touchLastRunAt:!0,emitEvent:!0})}function rr(t){if(!t||!_s[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=A.get(Bt)||{};return delete e[t],A.set(Bt,e),$.emit(P.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function ar(){return{..._s}}function Oo(){let t=new Set([...Object.keys(_s),...qi().map(([e])=>e)]);return Array.from(t).map(e=>de(e)).filter(Boolean)}function ns(){return Oo().filter(t=>t&&t.enabled)}function lr(t,e){let s=A.get(ko)||{};s[t]={...e,updatedAt:Date.now()},A.set(ko,s)}function cr(t){return(A.get(ko)||{})[t]||null}var Bt,Be,ko,_s,ts,Vi,ot,Rl,os=q(()=>{Fe();we();pn();Bt="tool_configs",Be="tool_api_bindings",ko="tool_window_states";_s={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["boo_FM"]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["status_block"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]},youyouReview:{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",description:"\u5728\u56DE\u590D\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50",enabled:!0,order:5,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["youyou"]},promptTemplate:`\u8BF7\u57FA\u4E8E\u4EE5\u4E0B\u6700\u65B0\u5267\u60C5\u56DE\u590D\uFF0C\u751F\u6210\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u3002

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},ts={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},Vi={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},ot={...ts};Rl={TOOL_REGISTRY:ts,TOOL_CATEGORIES:Vi,registerTool:Xi,unregisterTool:Qi,getToolList:Zi,getToolConfig:As,hasTool:Po,getToolSubTabs:er,resetToolRegistry:tr,setToolApiPreset:sr,getToolApiPreset:$o,clearToolApiPreset:nr,getAllToolApiBindings:or,onPresetDeleted:ir,saveToolWindowState:lr,getToolWindowState:cr,getToolBaseConfig:yn,ensureToolRuntimeConfig:gn,getToolFullConfig:de,patchToolRuntime:ss,appendToolRuntimeHistory:ws,saveToolConfig:it,resetToolConfig:rr,getAllDefaultToolConfigs:ar,getAllToolFullConfigs:Oo,getEnabledTools:ns}});var je,No=q(()=>{et();pn();os();je={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){S("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=Ut(),s=Object.entries(e),n=s.filter(([,o])=>o?.enabled!==!1).length;return`
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
                <strong class="yyt-tool-manage-stat-value">${n}</strong>
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?e.map(([s,n])=>`
      <div class="yyt-tool-item ${n.enabled?"yyt-enabled":"yyt-disabled"}" data-tool-id="${s}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${_(n.name)}</span>
            <span class="yyt-tool-category">${_(n.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${n.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${_(n.description)}</div>
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
      `},bindEvents(t,e){let s=Q();!s||!te(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item"),o=n.data("tool-id"),i=e(s.currentTarget).is(":checked");wo(o,i),n.toggleClass("yyt-enabled",i).toggleClass("yyt-disabled",!i),S("info",i?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(n)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,n)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),o=es(n);if(!n||!o||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${o.name}\u201D\u5417\uFF1F`))return;if(!Ao(n)){S("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),S("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let o=await pt(n),i=Co(o,{overwrite:!1});S(i.success?"success":"error",i.message),i.success&&this.renderTo(t)}catch(o){S("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=Ro();ut(s,`youyou_toolkit_tools_${Date.now()}.json`),S("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){S("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Mo(),this.renderTo(t),S("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let n=s?es(s):null,o=!!n,i=`
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${o?"\u7F16\u8F91\u5DE5\u5177":"\u65B0\u5EFA\u5DE5\u5177"}</span>
            <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5DE5\u5177\u540D\u79F0</label>
                <input type="text" class="yyt-input" id="yyt-tool-name" 
                       value="${n?_(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5206\u7C7B</label>
                <select class="yyt-select" id="yyt-tool-category">
                  <option value="api" ${n?.category==="api"?"selected":""}>API</option>
                  <option value="prompt" ${n?.category==="prompt"?"selected":""}>Prompt</option>
                  <option value="utility" ${n?.category==="utility"?"selected":""}>Utility</option>
                </select>
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0</label>
              <input type="text" class="yyt-input" id="yyt-tool-desc" 
                     value="${n?_(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u8D85\u65F6\u65F6\u95F4(ms)</label>
                <input type="number" class="yyt-input" id="yyt-tool-timeout" 
                       value="${n?.config?.execution?.timeout||6e4}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u91CD\u8BD5\u6B21\u6570</label>
                <input type="number" class="yyt-input" id="yyt-tool-retries" 
                       value="${n?.config?.execution?.retries||3}">
              </div>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(i);let a=e("#yyt-tool-dialog-overlay"),r=()=>a.remove();a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",r),a.on("click",function(c){c.target===this&&r()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let c=e("#yyt-tool-name").val().trim(),l=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),u=parseInt(e("#yyt-tool-timeout").val())||6e4,p=parseInt(e("#yyt-tool-retries").val())||3;if(!c){S("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let y=s||`tool_${Date.now()}`;if(!un(y,{name:c,category:l,description:d,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{trigger:n?.config?.trigger||{type:"manual",events:[]},execution:{timeout:u,retries:p},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]}},enabled:n?.enabled!==!1})){S("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}gn(y),r(),this.renderTo(t),S("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(y)})},destroy(t){!Q()||!te(t)||t.find("*").off()},getStyles(){return`
      /* \u5DE5\u5177\u7BA1\u7406\u9762\u677F\u6837\u5F0F */
      .yyt-tool-manager {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-height: 100%;
      }

      .yyt-tool-manage-hero {
        gap: 12px;
      }

      .yyt-tool-manage-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
        align-items: stretch;
      }

      .yyt-tool-manage-copy {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .yyt-tool-manage-lead {
        font-size: 16px;
        font-weight: 800;
        line-height: 1.2;
        color: var(--yyt-text);
      }
      
      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-height: 0;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-tool-manage-hint {
        font-size: 12px;
        color: var(--yyt-text-secondary);
        line-height: 1.55;
      }

      .yyt-tool-manage-stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(110px, 1fr));
        gap: 10px;
      }

      .yyt-tool-manage-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        min-width: 110px;
      }

      .yyt-tool-manage-stat-label {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }

      .yyt-tool-manage-stat-value {
        font-size: 18px;
        font-weight: 800;
        color: var(--yyt-text);
        line-height: 1;
      }
      
      .yyt-tool-item {
        padding: 12px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        transition: all 0.2s ease;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }
      
      .yyt-tool-item:hover {
        border-color: rgba(255, 255, 255, 0.16);
        transform: translateY(-1px);
      }
      
      .yyt-tool-item.yyt-disabled {
        opacity: 0.62;
      }
      
      .yyt-tool-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        gap: 12px;
      }
      
      .yyt-tool-info {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex-wrap: wrap;
      }
      
      .yyt-tool-name {
        font-weight: 600;
        font-size: 15px;
        color: var(--yyt-text);
      }
      
      .yyt-tool-category {
        font-size: 11px;
        padding: 4px 8px;
        background: rgba(123, 183, 255, 0.1);
        border-radius: 999px;
        color: var(--yyt-accent);
      }
      
      .yyt-tool-desc {
        font-size: 12px;
        color: var(--yyt-text-muted);
        margin-bottom: 12px;
        line-height: 1.7;
      }

      .yyt-tool-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .yyt-tool-controls {
        flex-shrink: 0;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var ur={};ge(ur,{BypassManager:()=>fn,DEFAULT_BYPASS_PRESETS:()=>ft,addMessage:()=>Ul,buildBypassMessages:()=>Hl,bypassManager:()=>j,createPreset:()=>Dl,default:()=>jl,deleteMessage:()=>zl,deletePreset:()=>$l,duplicatePreset:()=>Gl,exportPresets:()=>Fl,getAllPresets:()=>Ml,getDefaultPresetId:()=>Ol,getEnabledMessages:()=>Ll,getPreset:()=>kl,getPresetList:()=>Uo,importPresets:()=>Kl,setDefaultPresetId:()=>Nl,updateMessage:()=>Bl,updatePreset:()=>Pl});var gt,is,Lo,ft,Cl,fn,j,Ml,Uo,kl,Dl,Pl,$l,Gl,Ol,Nl,Ll,Ul,Bl,zl,Fl,Kl,Hl,jl,Is=q(()=>{Fe();we();gt="bypass_presets",is="default_bypass_preset",Lo="current_bypass_preset",ft={},Cl=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),fn=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=A.get(gt,{});return this._cache={...ft,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,n)=>(n.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:n,description:o,messages:i}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=s.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let r={id:a,name:n.trim(),description:o||"",enabled:!0,messages:i||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,r),$.emit(P.BYPASS_PRESET_CREATED,{presetId:a,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:r}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...n,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,o),$.emit(P.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(ft[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=A.get(gt,{});return delete n[e],A.set(gt,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),$.emit(P.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,n){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let i={...JSON.parse(JSON.stringify(o)),id:s.trim(),name:n||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),i),$.emit(P.BYPASS_PRESET_CREATED,{presetId:s,preset:i}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${i.name}"`,preset:i}}addMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},i=[...n.messages||[],o];return this.updatePreset(e,{messages:i})}updateMessage(e,s,n){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let i=o.messages||[],a=i.findIndex(c=>c.id===s);if(a===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let r=[...i];return r[a]={...r[a],...n},this.updatePreset(e,{messages:r})}deleteMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=n.messages||[],i=o.find(r=>r.id===s);if(!i)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(i.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=o.filter(r=>r.id!==s);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=A.get(is,null);return e==="undefined"||e==="null"||e===""?(A.remove(is),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(A.set(is,e),$.emit(P.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:n=!1}=s,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let i=Array.isArray(o)?o:o.presets?o.presets:[o];if(i.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let a=A.get(gt,{}),r=0;for(let c of i)!c.id||typeof c.id!="string"||c.name&&(ft[c.id]&&!n||!n&&a[c.id]||(a[c.id]={...c,updatedAt:Date.now()},r++));return r>0&&(A.set(gt,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${r} \u4E2A\u9884\u8BBE`,imported:r}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let n=A.get(gt,{});n[e]=s,A.set(gt,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=A.get(gt,{}),s={},n=!1,o=Array.isArray(e)?e.map((i,a)=>[i?.id||i?.name||`legacy_${a}`,i]):Object.entries(e||{});for(let[i,a]of o){let r=this._normalizePreset(i,a,s);if(!r){n=!0;continue}s[r.id]=r,(!e?.[r.id]||e?.[r.id]?.id!==r.id)&&(n=!0)}n&&A.set(gt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,n={}){if(!s||typeof s!="object")return null;let o=typeof s.name=="string"?s.name.trim():"",i=typeof s.id=="string"?s.id.trim():"",a=typeof e=="string"?e.trim():"";if(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),this._isLegacySamplePreset(o,i)||(!i&&a&&a!=="undefined"&&a!=="null"&&(i=a),!i&&o&&o!=="undefined"&&o!=="null"&&(i=this._generatePresetId(o,n)),!o||!i||i==="undefined"||o==="undefined"))return null;let c=Array.isArray(s.messages)?s.messages.filter(l=>l&&typeof l=="object").map((l,d)=>({id:typeof l.id=="string"&&l.id.trim()?l.id.trim():`${i}_msg_${d+1}`,role:l.role||"SYSTEM",content:typeof l.content=="string"?l.content:"",enabled:l.enabled!==!1,deletable:l.deletable!==!1})):[];return{...s,id:i,name:o,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:c,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=A.get(is,null),n=A.get(Lo,null),o=s??n;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(a=>a.name===o)?.id||null),o?A.set(is,o):A.remove(is),A.has(Lo)&&A.remove(Lo)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Cl.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=n,i=1;for(;s[o];)o=`${n}_${i++}`;return o}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},j=new fn,Ml=()=>j.getAllPresets(),Uo=()=>j.getPresetList(),kl=t=>j.getPreset(t),Dl=t=>j.createPreset(t),Pl=(t,e)=>j.updatePreset(t,e),$l=t=>j.deletePreset(t),Gl=(t,e,s)=>j.duplicatePreset(t,e,s),Ol=()=>j.getDefaultPresetId(),Nl=t=>j.setDefaultPresetId(t),Ll=t=>j.getEnabledMessages(t),Ul=(t,e)=>j.addMessage(t,e),Bl=(t,e,s)=>j.updateMessage(t,e,s),zl=(t,e)=>j.deleteMessage(t,e),Fl=t=>j.exportPresets(t),Kl=(t,e)=>j.importPresets(t,e),Hl=t=>j.buildBypassMessages(t),jl=j});var pr={};ge(pr,{DEFAULT_SETTINGS:()=>Rs,SettingsService:()=>mn,default:()=>Yl,settingsService:()=>Ne});var Rs,Bo,mn,Ne,Yl,Cs=q(()=>{Fe();we();Rs={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!1,debounceMs:300,useMessageReceivedFallback:!0,useGenerationAfterCommandsFallback:!0,messageSessionWindowMs:1800,historyRetentionLimit:10},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},Bo="settings_v2",mn=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=A.get(Bo,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),A.set(Bo,this._cache),$.emit(P.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),n=this._deepMerge(s,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Rs)),A.set(Bo,this._cache),$.emit(P.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let n=this.getSettings(),o=e.split("."),i=n;for(let a of o)if(i&&typeof i=="object"&&a in i)i=i[a];else return s;return i}set(e,s){let n=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),i=n;for(let a=0;a<o.length-1;a++){let r=o[a];r in i||(i[r]={}),i=i[r]}i[o[o.length-1]]=s,this.saveSettings(n)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Rs)),e)}_deepMerge(e,s){let n={...e};for(let o in s)s[o]&&typeof s[o]=="object"&&!Array.isArray(s[o])?n[o]=this._deepMerge(e[o]||{},s[o]):n[o]=s[o];return n}},Ne=new mn,Yl=Ne});var gr={};ge(gr,{ContextInjector:()=>xn,DEFAULT_INJECTION_OPTIONS:()=>yr,WRITEBACK_METHODS:()=>be,WRITEBACK_RESULT_STATUS:()=>bn,contextInjector:()=>vn,default:()=>ql});function Et(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}var Ye,hn,yr,bn,be,Wl,Vl,xn,vn,ql,zo=q(()=>{we();Ye="YouYouToolkit_toolOutputs",hn="YouYouToolkit_injectedContext",yr={overwrite:!0,enabled:!0},bn={SUCCESS:"success",FAILED:"failed"},be={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Wl=60,Vl=3;xn=class{constructor(){this.debugMode=!1}async inject(e,s,n={}){return(await this.injectDetailed(e,s,n)).success}async injectDetailed(e,s,n={}){let o={...yr,...n},i=this._createWritebackResult(e,o);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),i.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",i;let a=i.chatId,r={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:n.sourceMessageId||null,options:o};$.emit(P.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:r.content,options:o});let c=await this._insertToolOutputToLatestAssistantMessage(e,r,o,i);return c.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,c),c}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),n=this._findAssistantMessageIndex(s,e);if(n<0)return"";let o=s[n]||{},i=o[hn];if(typeof i=="string"&&i.trim())return i.trim();let a=o[Ye];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let o=(e[s]||{})[Ye];return o&&typeof o=="object"?o:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:n}=this._getChatRuntime(),o=this._findAssistantMessageIndex(n,null);return o<0?null:n[o]?.[Ye]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:n,context:o,chat:i}=this._getChatRuntime(),a=this._findAssistantMessageIndex(i,null);if(a<0)return!1;let r=i[a],c=r?.[Ye];if(!c||!c[s])return!1;delete c[s],r[Ye]=c,r[hn]=this._buildMessageInjectedContext(c);let l=o?.saveChat||n?.saveChat||null;return typeof l=="function"&&await l.call(o||n),$.emit(P.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(n){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",n),!1}}async clearAllContext(e){try{let{api:s,context:n,chat:o}=this._getChatRuntime(),i=this._findAssistantMessageIndex(o,null);if(i<0)return!1;let a=o[i];delete a[Ye],delete a[hn];let r=n?.saveChat||s?.saveChat||null;return typeof r=="function"&&await r.call(n||s),$.emit(P.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),n=Object.entries(s).map(([o,i])=>({toolId:o,updatedAt:i.updatedAt,contentLength:i.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,n=s?.getContext?.()||null,o=Array.isArray(n?.chat)?n.chat:[],i=Array.isArray(s?.chat)?s.chat:[],a=o.length?o:i;return{topWindow:e,api:s,context:n,chat:a,contextChat:o,apiChat:i}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let n=be.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:be.NONE,commit:{preferredMethod:n,attemptedMethods:[],appliedMethod:be.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:bn.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,n,o,i,a=null){let r=e?.contextChat?.[n]||e?.apiChat?.[n]||s?.[n]||a||null,c=this._getWritableMessageField(r).text||"",l=r?.[Ye]?.[o],d=i?c.includes(i):!0,u=!!(l&&String(l.content||"").trim()===i);return{latestMessage:r,latestText:c,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,n,o,i,a=null){let r=1,c=this._collectWritebackVerification(e,s,n,o,i,a);for(let l=0;l<Vl;l+=1){if(c.textIncludesContent&&c.mirrorStored)return{...c,refreshConfirmed:!0,confirmChecks:r,confirmedBy:"text_and_mirror_present"};await this._wait(Wl),r+=1,c=this._collectWritebackVerification(e,s,n,o,i,a)}return{...c,refreshConfirmed:c.textIncludesContent&&c.mirrorStored,confirmChecks:r,confirmedBy:c.textIncludesContent&&c.mirrorStored?"text_and_mirror_present":""}}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let n=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,s){let n=String(e||""),o=String(s||"").trim();return o?n.includes(o)?{text:n.replace(o,"").trimEnd(),removed:!0}:{text:n,removed:!1}:{text:n,removed:!1}}_syncMessageToRuntimeChats(e,s,n){let{contextChat:o,apiChat:i}=e||{},a=r=>{!Array.isArray(r)||s<0||s>=r.length||r[s]!==n&&(r[s]={...r[s]||{},...n})};a(o),a(i)}_notifyMessageUpdated(e,s){try{let{api:n,topWindow:o}=e||{},i=n?.eventSource||null,r=(n?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";i&&typeof i.emit=="function"&&(i.emit(r,s),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{i.emit(r,s)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{i.emit(r,s)},30))}catch(n){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",n)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let o=(i,a)=>{if(!this._isAssistantMessage(i)||s==null||s==="")return!1;let r=String(s).trim();return r?[i.message_id,i.id,i.messageId,i.mes_id,i.swipe_id,a].map(l=>l==null?"":String(l).trim()).includes(r):!1};for(let i=n.length-1;i>=0;i-=1)if(o(n[i],i))return i;for(let i=n.length-1;i>=0;i-=1)if(this._isAssistantMessage(n[i]))return i;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).sort(([,i],[,a])=>(i?.updatedAt||0)-(a?.updatedAt||0));if(!n.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[i,a]of n)o.push(`[${i}]`),o.push(a?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let n of s)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,s){let n=e&&typeof e=="object"?e:{},o=["mes","message","content","text"],i=!1;return o.forEach(a=>{typeof n[a]=="string"&&(n[a]=s,i=!0)}),i||(n.mes=s,n.message=s),n}_stripExistingToolOutput(e,s=[]){let n=String(e||"");return(Array.isArray(s)?s:[]).forEach(i=>{let a=String(i||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");n=n.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",a,d)}return}let r=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(`<${r}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${r}>\\s*`,"gi"),l=new RegExp(`\\{${r}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(c,""),n=n.replace(l,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,s){let n=String(e||""),o=String(s||"").trim();return o?n.replace(o,"").trimEnd():n.trimEnd()}async _insertToolOutputToLatestAssistantMessage(e,s,n={},o=null){let i=o||this._createWritebackResult(e,n);try{let a=this._getChatRuntime(),{api:r,context:c,chat:l}=a;if(!Array.isArray(l)||!l.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),i.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",i;let d=this._findAssistantMessageIndex(l,n.sourceMessageId);if(d<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),i.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",i;i.messageIndex=d,i.steps.foundTargetMessage=!0;let u=l[d],{key:p,text:y}=this._getWritableMessageField(u);i.textField=p;let b=u[Ye]&&typeof u[Ye]=="object"?u[Ye]:{},h=b?.[e]||{},m=h?.content||"",E=h?.blockText||m||"",J=Object.entries(b).filter(([se])=>se!==e).map(([,se])=>se||{}),D=String(s.content||"").trim(),Y=this._inferBlockType(D),k={toolId:e,messageId:n.sourceMessageId||u?.message_id||u?.messageId||d,blockType:Y,insertedAt:s.updatedAt,replaceable:n.overwrite!==!1};i.blockIdentity=k;let G=n.overwrite===!1?{text:String(y||""),removed:!1}:this._stripExactStoredBlock(y,E),R=G.text,O="";n.overwrite!==!1&&E&&!G.removed&&(O="previous_block_not_found");let H=n.overwrite===!1?R:this._stripExistingToolOutput(R,n.extractionSelectors),B=H!==R;R=H;let Z=n.overwrite===!1?R:this._stripPreviousStoredToolContent(R,m),xe=Z!==R;R=Z,i.replacedExistingBlock=G.removed||B||xe;let Se=[(n.overwrite===!1?String(y||""):R).trimEnd(),D].filter(Boolean).join(`

`).trim();i.insertedNewBlock=!!D;let Ue=J.every(se=>{let g=String(se?.blockText||se?.content||"").trim();return g?Se.includes(g):!0});i.preservedOtherToolBlocks=Ue,Ue?O&&(i.conflictDetected=!0,i.conflictReason=O):(i.conflictDetected=!0,i.conflictReason="other_tool_block_removed");let ze={...b,[e]:{toolId:e,content:D,blockText:D,blockType:Y,blockIdentity:k,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};u[p]=Se,this._applyMessageText(u,Se),u[Ye]=ze,u[hn]=this._buildMessageInjectedContext(ze),i.contentCommitted=!0,i.commit.contentCommitted=!0,i.steps.contentCommitted=!0,i.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,d,u),i.steps.runtimeSynced=!0;let Xe=c?.setChatMessages||r?.setChatMessages||a?.topWindow?.setChatMessages||null,$e=c?.setChatMessage||r?.setChatMessage||a?.topWindow?.setChatMessage||null;i.commit.preferredMethod=typeof Xe=="function"?be.SET_CHAT_MESSAGES:typeof $e=="function"?be.SET_CHAT_MESSAGE:be.LOCAL_ONLY;let ct=!1;if(typeof Xe=="function"){Et(i.commit.attemptedMethods,be.SET_CHAT_MESSAGES);try{await Xe.call(c||r||a?.topWindow,[{message_id:d,message:Se,mes:Se,content:Se,text:Se}],{refresh:"affected"}),i.steps.hostSetChatMessages=!0,i.hostUpdateMethod=be.SET_CHAT_MESSAGES,i.hostCommitApplied=!0,i.commit.appliedMethod=be.SET_CHAT_MESSAGES,i.commit.hostCommitApplied=!0,ct=!0}catch(se){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",se),i.errors.push(`setChatMessages: ${se?.message||String(se)}`)}}if(!ct&&typeof $e=="function"){Et(i.commit.attemptedMethods,be.SET_CHAT_MESSAGE);try{await $e.call(c||r||a?.topWindow,{message:Se,mes:Se,content:Se,text:Se},d),i.steps.hostSetChatMessage=!0,i.hostUpdateMethod=be.SET_CHAT_MESSAGE,i.hostCommitApplied=!0,i.commit.appliedMethod=be.SET_CHAT_MESSAGE,i.commit.hostCommitApplied=!0,i.commit.fallbackUsed=i.commit.preferredMethod!==be.SET_CHAT_MESSAGE,ct=!0}catch(se){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",se),i.errors.push(`setChatMessage: ${se?.message||String(se)}`)}}if(ct||(i.hostUpdateMethod=be.LOCAL_ONLY,Et(i.commit.attemptedMethods,be.LOCAL_ONLY),i.commit.appliedMethod=be.LOCAL_ONLY,i.commit.fallbackUsed=i.commit.preferredMethod!==be.LOCAL_ONLY),typeof $e=="function")try{await $e.call(c||r||a?.topWindow,{},d),i.steps.refreshForceSetChatMessage=!0,i.refreshRequested=!0,Et(i.refresh.requestMethods,"setChatMessage(force_refresh)")}catch(se){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",se),i.errors.push(`setChatMessage(refresh): ${se?.message||String(se)}`)}let pe=c?.saveChat||r?.saveChat||null,ye=c?.saveChatDebounced||r?.saveChatDebounced||null;typeof ye=="function"&&(ye.call(c||r),i.steps.saveChatDebounced=!0,i.refreshRequested=!0,Et(i.refresh.requestMethods,"saveChatDebounced")),typeof pe=="function"&&(await pe.call(c||r),i.steps.saveChat=!0,i.refreshRequested=!0,Et(i.refresh.requestMethods,"saveChat")),this._notifyMessageUpdated(a,d),i.steps.notifiedMessageUpdated=!0;let bt=String(s.content||"").trim();(i.steps.hostSetChatMessages||i.steps.hostSetChatMessage)&&(i.refreshRequested=!0,Et(i.refresh.requestMethods,i.hostUpdateMethod)),i.steps.notifiedMessageUpdated&&(i.refreshRequested=!0,Et(i.refresh.requestMethods,"MESSAGE_UPDATED")),i.steps.refreshRequested=i.refreshRequested,i.refresh.requested=i.refreshRequested;let Qe=await this._confirmRefresh(a,l,d,e,bt,u);return i.verification.textIncludesContent=Qe.textIncludesContent,i.verification.mirrorStored=Qe.mirrorStored,i.verification.refreshConfirmed=Qe.refreshConfirmed,i.steps.verifiedAfterWrite=i.verification.textIncludesContent&&i.verification.mirrorStored,i.refreshConfirmed=i.verification.refreshConfirmed&&i.refreshRequested,i.refresh.confirmChecks=Number(Qe.confirmChecks)||0,i.refresh.confirmedBy=Qe.confirmedBy||"",i.refresh.confirmed=i.refreshConfirmed,i.steps.refreshConfirmed=i.refreshConfirmed,i.success=i.steps.localTextApplied&&i.steps.runtimeSynced&&i.steps.verifiedAfterWrite&&i.refreshConfirmed,i.writebackStatus=i.success?bn.SUCCESS:bn.FAILED,!i.success&&!i.error&&(i.error=i.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),i.conflictDetected&&!i.error&&(i.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${i.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587: ${e} -> #${d}`),i}catch(a){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",a),i.error=a?.message||String(a),i.errors.push(i.error),i}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),o=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(o)return o;let i=e.SillyTavern?.this_chid;if(i!=null)return`chat_char_${i}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},vn=new xn,ql=vn});var mr={};ge(mr,{BUILTIN_VARIABLES:()=>fr,VariableResolver:()=>Sn,default:()=>Jl,variableResolver:()=>_t});var fr,Sn,_t,Jl,Fo=q(()=>{we();fr={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Sn=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,s),n=this._resolveCustomVariables(n,s),n=this._resolveRegexVariables(n,s),n}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,s));let n={};for(let[o,i]of Object.entries(e))typeof i=="string"?n[o]=this.resolveTemplate(i,s):typeof i=="object"&&i!==null?n[o]=this.resolveObject(i,s):n[o]=i;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(fr))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,n]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let o of this.getAvailableVariables())n[o.category]||(n[o.category]=[]),n[o.category].push(o);for(let[o,i]of Object.entries(s))if(n[o]&&n[o].length>0){e.push(`\u3010${i}\u3011`);for(let a of n[o])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let o=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(o)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let o=s.characterCard||s.raw?.characterCard;return o?this._formatCharacterCard(o):""}),n=n.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),n=n.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,s){let n=e;for(let[o,i]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof i=="function"?n=n.replace(a,()=>{try{return i(s)}catch(r){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,r),""}}):n=n.replace(a,String(i))}return n}_resolveRegexVariables(e,s){let n=e;for(let[o,i]of this.variableHandlers){let a=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");n=n.replace(a,(r,c)=>{try{return i(c,s)}catch(l){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${c}:`,l),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let n=s.role||"unknown",o=s.content||s.mes||"";return`[${n}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},_t=new Sn,Jl=_t});var br={};ge(br,{DEFAULT_PROMPT_TEMPLATE:()=>hr,ToolPromptService:()=>Tn,default:()=>Xl,toolPromptService:()=>En});var hr,Tn,En,Xl,Ko=q(()=>{we();Is();Fo();hr="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Tn=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let n=this._getPromptTemplate(e),o=_t.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),i=_t.resolveTemplate(n,o).trim(),a=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return _t.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:i,toolContentMacro:a})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],o=this._buildVariableContext(e,s),i=this._getBypassMessages(e);if(i&&i.length>0)for(let r of i)r.enabled!==!1&&n.push({role:this._normalizeRole(r.role),content:_t.resolveTemplate(r.content||"",o)});let a=this._buildUserContent(this._getPromptTemplate(e),o);return a&&n.push({role:"user",content:a}),this._log(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:hr}_getBypassMessages(e){return e.bypass?.enabled?j.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":_t.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},En=new Tn,Xl=En});var vr={};ge(vr,{LEGACY_OUTPUT_MODES:()=>Ql,OUTPUT_MODES:()=>At,TOOL_FAILURE_STAGES:()=>We,TOOL_RUNTIME_STATUS:()=>Zl,TOOL_WRITEBACK_STATUS:()=>ne,ToolOutputService:()=>_n,default:()=>ec,toolOutputService:()=>rs});function xr(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var At,Ql,Zl,We,ne,_n,rs,ec,Ho=q(()=>{we();Cs();zo();Ko();cn();js();At={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Ql={inline:"follow_ai"},Zl={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},We={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ne={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};_n=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===At.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===At.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let n=Date.now(),o=e.id,i=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",r=s?.executionKey||"",c=this._getExtractionSelectors(e),l=e.output?.apiPreset||e.apiPreset||"",d="",u=ne.NOT_APPLICABLE,p=null,y=[],b="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),$.emit(P.TOOL_EXECUTION_STARTED,{toolId:o,traceId:i,sessionKey:a,mode:At.POST_RESPONSE_API});try{if(d=We.BUILD_MESSAGES,y=await this._buildToolMessages(e,s),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${y.length} \u6761\u6D88\u606F`);let h=await this._getRequestTimeout();d=We.SEND_API_REQUEST;let m=await this._sendApiRequest(l,y,{timeoutMs:h,signal:s.signal});if(d=We.EXTRACT_OUTPUT,b=this._extractOutputContent(m,e),b){if(d=We.INJECT_CONTEXT,p=await vn.injectDetailed(o,b,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.messageId||"",extractionSelectors:c,traceId:i,sessionKey:a}),!p?.success)throw u=ne.FAILED,new Error(p?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ne.SUCCESS}else u=ne.SKIPPED_EMPTY_OUTPUT;d="";let E=Date.now()-n;return $.emit(P.TOOL_EXECUTED,{toolId:o,traceId:i,sessionKey:a,success:!0,duration:E,mode:At.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${E}ms`),{success:!0,toolId:o,output:b,duration:E,meta:{traceId:i,sessionKey:a,executionKey:r,generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",messageCount:y.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:p,phases:xr(y,b,p)}}}catch(h){let m=Date.now()-n,E=d||We.UNKNOWN,J=u||ne.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,h),$.emit(P.TOOL_EXECUTION_FAILED,{toolId:o,traceId:i,sessionKey:a,error:h.message||String(h),duration:m}),{success:!1,toolId:o,error:h.message||String(h),duration:m,meta:{traceId:i,sessionKey:a,executionKey:r,generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",messageCount:y.length,selectors:c,apiPreset:l,writebackStatus:J,failureStage:E,writebackDetails:p,phases:xr(y,b,p)}}}}async runToolInline(e,s){let n=Date.now(),o=e.id;try{let i=await this._buildToolMessages(e,s);return{success:!0,toolId:o,messages:i,duration:Date.now()-n}}catch(i){return{success:!1,toolId:o,error:i.message||String(i),duration:Date.now()-n}}}async previewExtraction(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(n,"rawText"),i=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:o,filteredSourceText:i,extractedText:a,messageEntries:n,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(n,"rawText"),i=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),r={...s,rawRecentMessagesText:o,recentMessagesText:i,extractedContent:a,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return En.buildToolMessages(e,r)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:i}=n,a=null;if(e){if(!oo(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=bs(e)}else a=bs();let r=qt(a||{});if(!r.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${r.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:o,apiConfig:a},i);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ne.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let n=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s);if(!o.length)return n.trim();let i=[];for(let a of o){let r=String(a||"").trim();if(!r)continue;if(r.startsWith("regex:")){let l=r.slice(6).trim();if(!l)continue;try{let d=new RegExp(l,"gi");[...n.matchAll(d)].forEach(p=>{let y=String(p?.[0]||"").trim();y&&i.push(y)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:r,error:d})}continue}let c=r.replace(/^<|>$/g,"").trim();if(c)try{let l=new RegExp(`<${c}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${c}>`,"gi");(n.match(l)||[]).forEach(u=>{let p=String(u||"").trim();p&&i.push(p)})}catch(l){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:r,error:l})}}return i.length>0?i.join(`

`).trim():n.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(n=>String(n||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(n=>String(n||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,n={}){let o=typeof e=="string"?e:String(e||""),i=this._getExtractionSelectors(s),{strict:a=!1}=n;if(!i.length)return o.trim();let r=i.map((l,d)=>{let u=String(l||"").trim(),p=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:p?"regex_include":"include",value:p?u.slice(6).trim():u,enabled:!0}}).filter(l=>l.value),c=Nt(o,r,[]);return a?(c||"").trim():c||o.trim()}_extractToolContent(e,s){let n=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let n=yt()||[],o=Lt()||[];return!Array.isArray(n)||n.length===0?s.trim():Nt(s,n,o)||s.trim()}catch(n){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",n),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of s)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(s?.chatMessages)?s.chatMessages:[],i=[];for(let r=o.length-1;r>=0&&i.length<n;r-=1){let c=o[r],l=String(c?.role||"").toLowerCase(),d=l==="assistant"||l==="ai"||!c?.is_user&&!c?.is_system&&!l,u=this._getMessageText(c);d&&u&&i.unshift({text:u,message:c,chatIndex:r})}if(i.length>0)return i;let a=s?.lastAiMessage||s?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((o,i)=>{let a=o.text||"",r=this._applyGlobalContextRules(a),c=this._extractToolContent(e,a);return{...o,order:i+1,rawText:a,filteredText:r,extractedText:c}})}_joinMessageBlocks(e,s,n={}){let o=Array.isArray(e)?e:[],{skipEmpty:i=!1}=n;return o.map(r=>{let c=String(r?.[s]||"").trim();return i&&!c?"":`${`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${c||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let i=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(o?.filteredText||"").trim()||"(\u7A7A)",r=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${i}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${r}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Ne.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},rs=new _n,ec=rs});var wn={};ge(wn,{abortAllTasks:()=>ic,abortTask:()=>oc,buildToolMessages:()=>Er,clearExecutionHistory:()=>dc,createExecutionContext:()=>gc,createResult:()=>An,enhanceMessagesWithBypass:()=>fc,executeBatch:()=>nc,executeTool:()=>Tr,executeToolWithConfig:()=>_r,executeToolsBatch:()=>bc,executorState:()=>le,extractFailed:()=>yc,extractSuccessful:()=>pc,generateTaskId:()=>zt,getExecutionHistory:()=>cc,getExecutorStatus:()=>lc,getScheduler:()=>as,getToolsForEvent:()=>xc,mergeResults:()=>uc,pauseExecutor:()=>rc,resumeExecutor:()=>ac,setMaxConcurrent:()=>sc});function An(t,e,s,n,o,i,a=0){return{success:s,taskId:t,toolId:e,data:n,error:o,duration:i,retries:a,timestamp:Date.now(),metadata:{}}}function zt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function tc(t,e={}){return{id:zt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function as(){return Ms||(Ms=new jo(le.maxConcurrent)),Ms}function sc(t){le.maxConcurrent=Math.max(1,Math.min(10,t)),Ms&&(Ms.maxConcurrent=le.maxConcurrent)}async function Tr(t,e={},s){let n=as(),o=tc(t,e);for(;le.isPaused;)await new Promise(i=>setTimeout(i,100));try{let i=await n.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return Sr(i),i}catch(i){let a=An(o.id,t,!1,null,i,Date.now()-o.createdAt,o.retries);return Sr(a),a}}async function nc(t,e={}){let{failFast:s=!1,concurrency:n=le.maxConcurrent}=e,o=[],i=as(),a=i.maxConcurrent;i.maxConcurrent=n;try{let r=t.map(({toolId:c,options:l,executor:d})=>Tr(c,l,d));if(s)for(let c of r){let l=await c;if(o.push(l),!l.success){i.abortAll();break}}else{let c=await Promise.allSettled(r);for(let l of c)l.status==="fulfilled"?o.push(l.value):o.push(An(zt(),"unknown",!1,null,l.reason,0,0))}}finally{i.maxConcurrent=a}return o}function oc(t){return as().abort(t)}function ic(){as().abortAll(),le.executionQueue=[]}function rc(){le.isPaused=!0}function ac(){le.isPaused=!1}function lc(){return{...as().getStatus(),isPaused:le.isPaused,activeControllers:le.activeControllers.size,historyCount:le.executionHistory.length}}function Sr(t){le.executionHistory.push(t),le.executionHistory.length>100&&le.executionHistory.shift()}function cc(t={}){let e=[...le.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function dc(){le.executionHistory=[]}function uc(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function pc(t){return t.filter(e=>e.success).map(e=>e.data)}function yc(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function gc(t={}){return{taskId:zt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function fc(t,e){return!e||e.length===0?t:[...e,...t]}function mc(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Er(t,e){let s=[],n=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[i,a]of Object.entries(o))n=n.replace(new RegExp(mc(i),"g"),a);return s.push({role:"USER",content:n}),s}async function _r(t,e,s={}){let n=de(t);if(!n)return{success:!1,taskId:zt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:zt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),i=zt();try{$.emit(P.TOOL_EXECUTION_STARTED,{toolId:t,taskId:i,context:e});let a=Er(n,e);if(typeof s.callApi=="function"){let r=n.output?.apiPreset||n.apiPreset||"",c=r?{preset:r}:null,l=await s.callApi(a,c,s.signal),d=l;n.outputMode==="separate"&&n.extractTags?.length>0&&(d=hc(l,n.extractTags));let u={success:!0,taskId:i,toolId:t,data:d,duration:Date.now()-o};return $.emit(P.TOOL_EXECUTED,{toolId:t,taskId:i,result:u}),u}else return{success:!0,taskId:i,toolId:t,data:{messages:a,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(a){let r={success:!1,taskId:i,toolId:t,error:a.message||String(a),duration:Date.now()-o};return $.emit(P.TOOL_EXECUTION_FAILED,{toolId:t,taskId:i,error:a}),r}}function hc(t,e){let s={};for(let n of e){let o=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),i=t.match(o);i&&(s[n]=i.map(a=>{let r=a.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return r?r[1].trim():""}))}return s}async function bc(t,e,s={}){let n=[];for(let o of t){let i=de(o);if(i&&i.enabled){let a=await _r(o,e,s);n.push(a)}}return n}function xc(t){let e=[],s=ns();for(let n of s){let o=n?.trigger?.enabled&&n?.trigger?.event===t,i=Array.isArray(n?.triggerEvents)&&n.triggerEvents.includes(t);n&&n.enabled&&(o||i)&&e.push(n)}return e}var le,jo,Ms,In=q(()=>{os();we();le={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};jo=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((n,o)=>{this.queue.push({executor:e,task:s,resolve:n,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:n,resolve:o,reject:i}=e,a=new AbortController;n.abortController=a,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),le.activeControllers.set(n.id,a),this.executeTask(s,n,a.signal).then(r=>{n.status="completed",n.completedAt=Date.now(),o(r)}).catch(r=>{n.status=r.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),i(r)}).finally(()=>{this.running.delete(n.id),le.activeControllers.delete(n.id),le.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,n){let o=Date.now(),i=null;for(let a=0;a<=s.maxRetries;a++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let r=await e(n);return An(s.id,s.toolId,!0,r,null,Date.now()-o,a)}catch(r){if(i=r,r.name==="AbortError")throw r;a<s.maxRetries&&(await this.delay(1e3*(a+1)),s.retries=a+1)}}throw i}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=le.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of le.activeControllers.values())e.abort();le.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Ms=null});var Xr={};ge(Xr,{AUTO_TRIGGER_SKIP_REASONS:()=>M,EVENT_TYPES:()=>I,TOOL_EXECUTION_PATHS:()=>Ht,checkGate:()=>ti,destroyToolTriggerManager:()=>Td,exportAutoTriggerDiagnostics:()=>zn,exportGenerationTransactionDiagnostics:()=>Ad,getAutoTriggerDiagnostics:()=>Os,getChatContext:()=>si,getCurrentCharacter:()=>ni,getFullContext:()=>id,getGenerationTransactionDiagnostics:()=>_d,getToolTriggerManagerState:()=>Ed,getWorldbookContent:()=>Br,initToolTriggerManager:()=>qr,initTriggerModule:()=>qo,previewToolExtraction:()=>li,registerEventListener:()=>rt,registerTriggerHandler:()=>rd,removeAllListeners:()=>nd,removeAllTriggerHandlers:()=>ld,resetGateState:()=>od,runToolManually:()=>ai,setDebugMode:()=>wd,setTriggerHandlerEnabled:()=>ad,triggerState:()=>x,unregisterEventListener:()=>Vo,updateGateState:()=>It});function jt(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function $n(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function F(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Gn(t){return new Promise(e=>setTimeout(e,t))}function On(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let n of s){if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"&&n.trim())return n.trim()}return e}function Jo(t=[]){return(Array.isArray(t)?t:[]).map((s,n)=>({role:Bn(s),content:$n(s),name:s?.name||"",timestamp:s?.send_date||s?.timestamp||"",isSystem:!!s?.is_system,isUser:!!s?.is_user,sourceId:On(s,n),swipeId:F(s?.swipe_id??s?.swipeId??s?.swipeID),swipeCount:Array.isArray(s?.swipes)&&s.swipes.length>0?s.swipes.length:1,chatIndex:n,originalMessage:s}))}function Nn(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function wc(t,e=null,s={}){let{lockToMessageId:n=!1}=s,o=Jo(t),i=e==null||e===""?null:String(e).trim(),a=null,r=null;for(let c=o.length-1;c>=0;c-=1){let l=o[c],d=F(l.sourceId),u=i&&(d===i||String(l.chatIndex)===i);if(!a&&l.role==="assistant"&&Nn(l.content)&&(!i||!n||u)&&(a=l),!r&&l.role==="user"&&l.content&&(r=l),a&&r)break}return{messages:o,lastUserMessage:r,lastAiMessage:a}}async function Ic(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:n=250,lockToMessageId:o=!1}=t,i={messages:[],lastUserMessage:null,lastAiMessage:null};for(let a=0;a<=s;a+=1){let r=await $s();if(i=wc(r,e,{lockToMessageId:o}),i.lastAiMessage?.content)return i;a<s&&await Gn(n)}return i}function Rc(t="user_trigger_intent"){It({lastUserSendIntentAt:Date.now(),lastUserIntentSource:t||"user_trigger_intent"})}function Cn(){Rc("send_button_or_enter")}function Cc(){let t=jt(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],n=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],o=(i,a,r)=>{i.forEach(c=>{let l=e.querySelector(c);l&&l.addEventListener(a,r,!0)})};return o(s,"click",()=>Cn()),o(s,"pointerup",()=>Cn()),o(s,"touchend",()=>Cn()),o(n,"keydown",i=>{let a=i?.key||"";(a==="Enter"||a==="NumpadEnter")&&!i.shiftKey&&Cn()}),t.__YYT_sendIntentHooksInstalled=!0,z("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function Mc(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function lt(){return jt().SillyTavern||null}function kc(){return jt().TavernHelper||null}function Dc(){let t=lt();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Pc(t=""){return t===I.MESSAGE_RECEIVED||t===I.MESSAGE_SENT||t===I.MESSAGE_UPDATED||t===I.MESSAGE_DELETED}function Xo(t){return!!t&&(typeof t.on=="function"||typeof t.addEventListener=="function")}function $r(t,e,s){if(!t||typeof s!="function")return!1;try{if(typeof t.off=="function")return t.off(e,s),!0;if(typeof t.removeListener=="function")return t.removeListener(e,s),!0;if(typeof t.removeEventListener=="function")return t.removeEventListener(e,s),!0}catch(n){N("warn","\u79FB\u9664\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25",{eventName:e,error:n?.message||String(n)})}return!1}function $c(t,e,s){Xo(t)&&(ce.eventSource=t,ce.eventTypes=e||ce.eventTypes||null,ce.source=s||ce.source||"unknown",N("info","\u7F13\u5B58\u4E8B\u4EF6\u6865\u63A5\u6210\u529F",{source:ce.source,hasOff:typeof t.off=="function",hasRemoveListener:typeof t.removeListener=="function",hasAddEventListener:typeof t.addEventListener=="function"}))}function ks(){let t=jt(),e=t.SillyTavern||null,s=e?.getContext?.()||null,n=[{source:"SillyTavern.eventSource",eventSource:e?.eventSource,eventTypes:e?.eventTypes||e?.event_types||null},{source:"topWindow.eventSource",eventSource:t?.eventSource,eventTypes:t?.event_types||t?.eventTypes||null},{source:"SillyTavern.getContext()",eventSource:s?.eventSource||null,eventTypes:s?.eventTypes||s?.event_types||null},{source:"scriptModule exports",eventSource:ce.scriptModule?.eventSource||null,eventTypes:ce.scriptModule?.event_types||ce.scriptModule?.eventTypes||null}];for(let o of n)if(Xo(o.eventSource))return $c(o.eventSource,o.eventTypes,o.source),o;return{source:"",eventSource:null,eventTypes:null}}async function Gc(){let t=ks();if(t.eventSource)return t;ce.loadingPromise||(ce.loadingPromise=(async()=>{try{let s=vc;ce.scriptModule=await import(s)}catch(s){ce.importError=s,N("warn","\u52A0\u8F7D /script.js \u4E8B\u4EF6\u6865\u63A5\u5931\u8D25",s?.message||String(s))}finally{ce.loadingPromise=null}})()),await ce.loadingPromise;let e=ks();return e.eventSource?e:{source:"",eventSource:null,eventTypes:null}}function Ln(){return ks().eventSource||ce.eventSource||null}function Un(){return ks().eventTypes||ce.eventTypes||I}function z(...t){(x.debugMode||Ne.getDebugSettings()?.enableDebugLog)&&console.log("[YouYouToolkit:Trigger]",...t)}function N(t="info",...e){(typeof console[t]=="function"?console[t]:console.log)("[youyou_trigger]",...e)}function _e(){let t=Ne.getListenerSettings?.()||Ne.getSettings?.()?.listener||{},e=parseInt(t?.debounceMs,10),s=parseInt(t?.messageSessionWindowMs,10),n=parseInt(t?.historyRetentionLimit,10);return{listenGenerationEnded:t?.listenGenerationEnded!==!1,ignoreQuietGeneration:t?.ignoreQuietGeneration!==!1,ignoreAutoTrigger:t?.ignoreAutoTrigger===!0,debounceMs:Number.isFinite(e)?Math.max(0,e):300,useMessageReceivedFallback:t?.useMessageReceivedFallback!==!1,useGenerationAfterCommandsFallback:t?.useGenerationAfterCommandsFallback!==!1,messageSessionWindowMs:Number.isFinite(s)?Math.max(300,s):1800,historyRetentionLimit:Number.isFinite(n)?Math.max(1,Math.min(50,n)):10}}function at(t,e=""){if(t&&typeof t=="object")return F(t?.messageId??t?.id??t?.message_id??t?.mes_id);if(e===I.GENERATION_ENDED){if(typeof t=="number"&&Number.isFinite(t))return String(t);if(typeof t=="string"&&/^\d+$/.test(t.trim()))return t.trim()}return Pc(e)?F(t):""}function Oc(t,e,s){let n=F(s);if(!n)return!1;let o=F(On(t,e));if(o&&o===n)return!0;let i=Number(n);return Number.isInteger(i)&&e===i}async function Nc(t){let e=F(t);if(!e)return null;let s=await $s();for(let n=s.length-1;n>=0;n-=1){let o=s[n];if(Oc(o,n,e))return{message:o,index:n}}return null}async function Lc(t,e={}){let{retries:s=0,retryDelayMs:n=80}=e,o=null;for(let i=0;i<=s;i+=1){if(o=await Nc(t),o)return o;i<s&&await Gn(n)}return null}function Uc(t,e,s){return F(s)?t===I.MESSAGE_RECEIVED||t===I.MESSAGE_UPDATED?!0:!!(e&&typeof e=="object"&&(e?.messageId!==void 0||e?.message_id!==void 0||e?.id!==void 0||e?.mes_id!==void 0)):!1}function Gr(){let t=[x.gateState.lastUserSendIntentAt,x.gateState.lastUserMessageAt].filter(e=>Number(e)>0);return t.length>0?Math.max(...t):0}function Or(t=Date.now()){let e=Gr();return e>0&&t-e<=Pr}function Qo(t="",e=null){return String(t||e?.type||"").trim().toLowerCase()}function Nr(t){let e=String(t||"").trim().toLowerCase();return e?/re\s*-?\s*roll|reroll|重\s*roll/.test(e)?"reroll":/regenerat|\bregen\b|重新生成/.test(e)?"regenerate":/\bswipe\b|swipe[_-]?id/.test(e)?"swipe":/\bquiet\b/.test(e)?"quiet":"":""}function Lr(t="",e=null){let s=typeof t=="string"?t.trim():String(t||"").trim(),n=e??null,o=Qo(t,e);if(e?.swipeId!==void 0||e?.swipe_id!==void 0||e?.swipe===!0||e?.isSwipe===!0)return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:o,generationAction:"swipe",generationActionSource:"params.swipe",explicitGenerationAction:"swipe"};let i=[{source:"type",value:s}];for(let a of Ac){let r=e?.[a];r==null||r===""||i.push({source:`params.${a}`,value:String(r)})}for(let a of i){let r=Nr(a.value);if(r)return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:o,generationAction:r,generationActionSource:a.source,explicitGenerationAction:wr.has(r)?r:""}}return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:o,generationAction:o||"",generationActionSource:o?"normalized_generation_type":"",explicitGenerationAction:wr.has(o)?o:""}}function us(t=""){let e=String(t||"").trim();if(!e)return"";let s=0;for(let n=0;n<e.length;n+=1)s=(s<<5)-s+e.charCodeAt(n),s|=0;return Math.abs(s).toString(36)}function Bc(t,e=null,s=Date.now()){let n=Gr(),o=Lr(t,e);return n>0&&s-n<=Pr?{startedByUserIntent:!0,userIntentDetectedAt:n,userIntentSource:"recent_user_trigger_intent",userIntentDetail:"recent_user_send_or_message"}:o.explicitGenerationAction?{startedByUserIntent:!0,userIntentDetectedAt:s,userIntentSource:`explicit_generation_action:${o.explicitGenerationAction}`,userIntentDetail:`generation_action_${o.explicitGenerationAction}`}:{startedByUserIntent:!1,userIntentDetectedAt:n,userIntentSource:"none",userIntentDetail:"no_recent_user_intent_or_explicit_generation_action"}}function ps(t=Gs()){let e=x.gateState.lastGenerationBaseline;return!e||t&&e.chatId&&e.chatId!==t?null:e}function Zo(t=Date.now()){return Or(t)?!0:!!ps()?.startedByUserIntent}function Ir(t=null){let e=t||ps();return e?x.gateState.lastGenerationDryRun||e.dryRun?{eligible:!1,baseline:e,reason:M.DRY_RUN_GENERATION,detail:"dry_run_generation"}:{eligible:!0,baseline:e,reason:"",detail:""}:{eligible:!1,baseline:null,reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"missing_generation_baseline"}}function ei(t=Date.now()){return Number(x.gateState.uiTransitionGuardUntil)>t}function Rr(t=""){let e=Date.now();It({uiTransitionGuardUntil:e+Ar,lastUiTransitionAt:e,lastUiTransitionSource:t||""}),N("info","\u8FDB\u5165\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B",{source:t||"unknown",guardUntil:e+Ar})}function Cr(t=""){for(let e of T.pendingMessageTimers.values())clearTimeout(e);T.pendingMessageTimers.clear(),t&&N("info","\u5DF2\u6E05\u7406\u5F85\u6267\u884C\u81EA\u52A8\u89E6\u53D1\u5B9A\u65F6\u5668",{reason:t})}function Ur(t=[],e={}){let s=lt(),n=s?.getContext?.()||null,o=Jo(t),i=null;for(let a=o.length-1;a>=0;a-=1){let r=o[a];if(r.role==="assistant"&&Nn(r.content)){i=r;break}}return{traceId:e.traceId||ys("generation"),startedAt:Number(e.startedAt)||Date.now(),capturedAt:Date.now(),chatId:Ds(s,n,null),messageCount:o.length,lastAssistantIndex:i?.chatIndex??-1,lastAssistantMessageId:F(i?.sourceId),lastAssistantContentFingerprint:us(i?.content||""),lastAssistantSwipeId:F(i?.swipeId),lastAssistantSwipeCount:Number.isFinite(i?.swipeCount)?Math.max(0,Number(i.swipeCount)):0,lastAssistantPreview:String(i?.content||"").slice(0,160),dryRun:!!e.dryRun,generationType:e.rawGenerationType||e.type||"",generationParams:e.rawGenerationParams||e.params||null,rawGenerationType:e.rawGenerationType||e.type||"",rawGenerationParams:e.rawGenerationParams||e.params||null,normalizedGenerationType:e.normalizedGenerationType||Qo(e.type,e.params),generationAction:e.generationAction||"",generationActionSource:e.generationActionSource||"",explicitGenerationAction:e.explicitGenerationAction||"",startedByUserIntent:!!e.startedByUserIntent,userIntentDetectedAt:Number(e.userIntentDetectedAt)||0,userIntentSource:e.userIntentSource||"",userIntentDetail:e.userIntentDetail||"",baselineResolved:e.baselineResolved!==void 0?!!e.baselineResolved:!0,baselineResolutionAt:Number(e.baselineResolutionAt)||0,provisional:!!e.provisional,baselineSource:e.baselineSource||""}}async function zc(t={}){let e=await $s();return Ur(e,{...t,baselineResolved:t.baselineResolved!==void 0?t.baselineResolved:!0,baselineResolutionAt:Number(t.baselineResolutionAt)||Date.now(),provisional:t.provisional===!0,baselineSource:t.baselineSource||"captured_chat_snapshot"})}function Fc(t={}){return Ur(Dc(),{...t,baselineResolved:!1,baselineResolutionAt:0,provisional:!0,baselineSource:t.baselineSource||"provisional_immediate_snapshot"})}async function Yo(t={}){let{chatId:e=Gs(),traceId:s="",retries:n=4,retryDelayMs:o=80}=t,i=null;for(let r=0;r<=n;r+=1){i=ps(e);let c=!s||!i?.traceId||i.traceId===s;if(i&&c&&i.baselineResolved!==!1)return i;r<n&&await Gn(o)}return i&&(!s||!i?.traceId||i.traceId===s)?i:null}function Kc(t=Date.now(),e=ps()){if(x.gateState.isGenerating)return!0;if(!e)return!1;let s=Number(x.gateState.lastGenerationAt)||0;return s<=0?!1:t-s<=Tc}function Hc(t=ps()){let e=[t?.explicitGenerationAction,t?.generationAction,x.gateState.lastGenerationAction];for(let s of e){let n=Nr(s)||String(s||"").trim().toLowerCase();if(_c.has(n))return n}return""}function jc(t,e){if(!t||!e)return!1;let s=F(e.lastAssistantMessageId),n=F(t.sourceId),o=!!s&&!!n&&s===n,i=Number.isInteger(e.lastAssistantIndex)&&e.lastAssistantIndex>=0&&t.chatIndex===e.lastAssistantIndex;return o||!s&&i?!0:i}function Yc(t,e){let s=String(e?.lastAssistantContentFingerprint||"").trim(),n=us(t?.content||""),o=F(e?.lastAssistantSwipeId),i=F(t?.swipeId),a=Number.isFinite(e?.lastAssistantSwipeCount)?Math.max(0,Number(e.lastAssistantSwipeCount)):0,r=Number.isFinite(t?.swipeCount)?Math.max(0,Number(t.swipeCount)):0,c=!!s&&!!n&&s!==n,l=!!o&&!!i&&o!==i,d=a>0&&r>0&&a!==r;return{baselineFingerprint:s,messageFingerprint:n,baselineSwipeId:o,currentSwipeId:i,baselineSwipeCount:a,currentSwipeCount:r,fingerprintChanged:c,swipeIdChanged:l,swipeCountChanged:d,observedRevision:c||l||d}}function Wc(t={},e="same_slot_revision"){let s=[];return t.fingerprintChanged&&s.push("content_fingerprint_changed"),t.swipeIdChanged&&s.push("swipe_id_changed"),t.swipeCountChanged&&s.push("swipe_count_changed"),s.length>0?s.join("+"):e}function Wo(t,e,s={}){let{allowSameSlotRevision:n=!1,requireObservedSameSlotRevision:o=!0}=s;if(!t||t.role!=="assistant"||!Nn(t.content))return{allowed:!1,confirmationMode:"none",reason:"invalid_assistant_message",sameSlotRevisionAction:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:"",confirmedAssistantContentFingerprint:"",baselineAssistantSwipeId:"",confirmedAssistantSwipeId:"",baselineAssistantSwipeCount:0,confirmedAssistantSwipeCount:0};if(!e)return{allowed:!0,confirmationMode:"no_baseline",reason:"",sameSlotRevisionAction:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:"",confirmedAssistantContentFingerprint:us(t.content||""),baselineAssistantSwipeId:"",confirmedAssistantSwipeId:F(t.swipeId),baselineAssistantSwipeCount:0,confirmedAssistantSwipeCount:Number.isFinite(t?.swipeCount)?Math.max(0,Number(t.swipeCount)):0};if(Jc(t,e))return{allowed:!0,confirmationMode:"new_message",reason:"",sameSlotRevisionAction:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:String(e.lastAssistantContentFingerprint||"").trim(),confirmedAssistantContentFingerprint:us(t.content||""),baselineAssistantSwipeId:F(e.lastAssistantSwipeId),confirmedAssistantSwipeId:F(t.swipeId),baselineAssistantSwipeCount:Number.isFinite(e.lastAssistantSwipeCount)?Math.max(0,Number(e.lastAssistantSwipeCount)):0,confirmedAssistantSwipeCount:Number.isFinite(t?.swipeCount)?Math.max(0,Number(t.swipeCount)):0};let i=Hc(e),a=jc(t,e),r=Yc(t,e);return!n||!i||!a?{allowed:!1,confirmationMode:"none",reason:a?"same_slot_revision_action_unavailable":"message_before_generation_baseline",sameSlotRevisionAction:i,sameSlotRevisionCandidate:a,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:r.observedRevision,baselineAssistantContentFingerprint:r.baselineFingerprint,confirmedAssistantContentFingerprint:r.messageFingerprint,baselineAssistantSwipeId:r.baselineSwipeId,confirmedAssistantSwipeId:r.currentSwipeId,baselineAssistantSwipeCount:r.baselineSwipeCount,confirmedAssistantSwipeCount:r.currentSwipeCount}:o&&!r.observedRevision?{allowed:!1,confirmationMode:"none",reason:"same_slot_revision_not_observed",sameSlotRevisionAction:i,sameSlotRevisionCandidate:!0,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:r.baselineFingerprint,confirmedAssistantContentFingerprint:r.messageFingerprint,baselineAssistantSwipeId:r.baselineSwipeId,confirmedAssistantSwipeId:r.currentSwipeId,baselineAssistantSwipeCount:r.baselineSwipeCount,confirmedAssistantSwipeCount:r.currentSwipeCount}:{allowed:!0,confirmationMode:"same_slot_revision",reason:"",sameSlotRevisionAction:i,sameSlotRevisionCandidate:!0,sameSlotRevisionConfirmed:!0,sameSlotRevisionSource:Wc(r,o?"same_slot_observed_revision":"same_slot_generation_confirmed"),observedSameSlotRevision:r.observedRevision,baselineAssistantContentFingerprint:r.baselineFingerprint,confirmedAssistantContentFingerprint:r.messageFingerprint,baselineAssistantSwipeId:r.baselineSwipeId,confirmedAssistantSwipeId:r.currentSwipeId,baselineAssistantSwipeCount:r.baselineSwipeCount,confirmedAssistantSwipeCount:r.currentSwipeCount}}function Vc(t){return t?.message?{role:Bn(t.message),content:$n(t.message),chatIndex:t.index,sourceId:F(On(t.message,t.index)),swipeId:F(t.message?.swipe_id??t.message?.swipeId??t.message?.swipeID),swipeCount:Array.isArray(t.message?.swipes)&&t.message.swipes.length>0?t.message.swipes.length:1}:null}async function qc(t,e={}){let s=Date.now(),n=e?.traceId||x.gateState.lastGenerationTraceId||"",o=Vc(t),i=await Yo({traceId:n,retries:4,retryDelayMs:80})||ps(),a=Kc(s,i),r=Wo(o,i,{allowSameSlotRevision:!0,requireObservedSameSlotRevision:!0}),c=!!(o&&i&&r.allowed),l=!n||!i?.traceId||i.traceId===n;if(!o)return{allowed:!1,baseline:i,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"message_received_identity_not_resolved",confirmationMode:"none",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:""};if(!i)return{allowed:!1,baseline:null,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_without_generation_baseline",reason:M.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,detail:"message_received_without_generation_baseline",confirmationMode:"none",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:""};if(i.baselineResolved===!1)return{allowed:!1,baseline:i,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"generation_baseline_pending_resolution",confirmationMode:"none",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:""};if(!l)return{allowed:!1,baseline:i,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_trace_mismatch",reason:M.HISTORICAL_REPLAY_MESSAGE_RECEIVED,detail:"message_received_trace_mismatch",confirmationMode:"none",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:""};if(!x.gateState.isGenerating&&!a)return{allowed:!1,baseline:i,eventBelongsToCurrentGeneration:c,historicalReplayBlocked:!0,historicalReplayReason:"message_received_outside_active_generation",reason:M.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,detail:"message_received_outside_active_generation",confirmationMode:"none",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:""};if(!r.allowed){let d=r.sameSlotRevisionCandidate&&r.reason==="same_slot_revision_not_observed";return{allowed:!1,baseline:i,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!d,historicalReplayReason:d?"":r.sameSlotRevisionCandidate?"message_received_same_slot_without_confirmed_revision":"message_received_before_generation_baseline",reason:d?M.NO_CONFIRMED_ASSISTANT_MESSAGE:M.HISTORICAL_REPLAY_MESSAGE_RECEIVED,detail:d?"same_slot_revision_not_observed_yet":r.sameSlotRevisionCandidate?"message_received_same_slot_without_confirmed_revision":"message_received_before_generation_baseline",confirmationMode:r.confirmationMode,sameSlotRevisionCandidate:r.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:r.sameSlotRevisionSource,sameSlotRevisionAction:r.sameSlotRevisionAction,baselineAssistantContentFingerprint:r.baselineAssistantContentFingerprint,confirmedAssistantContentFingerprint:r.confirmedAssistantContentFingerprint,baselineAssistantSwipeId:r.baselineAssistantSwipeId,confirmedAssistantSwipeId:r.confirmedAssistantSwipeId,baselineAssistantSwipeCount:r.baselineAssistantSwipeCount,confirmedAssistantSwipeCount:r.confirmedAssistantSwipeCount}}return{allowed:!0,baseline:i,eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:"",reason:"",detail:"",messageEntry:o,confirmationMode:r.confirmationMode,sameSlotRevisionCandidate:r.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:r.sameSlotRevisionConfirmed,sameSlotRevisionSource:r.sameSlotRevisionSource,sameSlotRevisionAction:r.sameSlotRevisionAction,baselineAssistantContentFingerprint:r.baselineAssistantContentFingerprint,confirmedAssistantContentFingerprint:r.confirmedAssistantContentFingerprint,baselineAssistantSwipeId:r.baselineAssistantSwipeId,confirmedAssistantSwipeId:r.confirmedAssistantSwipeId,baselineAssistantSwipeCount:r.baselineAssistantSwipeCount,confirmedAssistantSwipeCount:r.confirmedAssistantSwipeCount}}function Jc(t,e){if(!t||t.role!=="assistant"||!Nn(t.content))return!1;if(!e)return!0;if(Number.isInteger(e.lastAssistantIndex)&&e.lastAssistantIndex>=0)return t.chatIndex>e.lastAssistantIndex;let s=Number.isFinite(e.messageCount)?e.messageCount:0;return t.chatIndex>=s}async function Xc(t="",e={}){let{allowSameSlotRevision:s=!1,requireObservedSameSlotRevision:n=!0}=e,o=F(t),i=lt(),a=i?.getContext?.()||null,r=Ds(i,a,null),c=await $s(),l=Jo(c),d=x.gateState.lastGenerationBaseline?.chatId===r?x.gateState.lastGenerationBaseline:null;if(o){let u=l.find(y=>F(y.sourceId)===o||String(y.chatIndex)===o);if(!u)return null;let p=Wo(u,d,{allowSameSlotRevision:s,requireObservedSameSlotRevision:n});return p.allowed?{...u,confirmationMode:p.confirmationMode,sameSlotRevisionCandidate:p.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:p.sameSlotRevisionConfirmed,sameSlotRevisionSource:p.sameSlotRevisionSource,sameSlotRevisionAction:p.sameSlotRevisionAction,baselineAssistantContentFingerprint:p.baselineAssistantContentFingerprint,confirmedAssistantContentFingerprint:p.confirmedAssistantContentFingerprint,baselineAssistantSwipeId:p.baselineAssistantSwipeId,confirmedAssistantSwipeId:p.confirmedAssistantSwipeId,baselineAssistantSwipeCount:p.baselineAssistantSwipeCount,confirmedAssistantSwipeCount:p.confirmedAssistantSwipeCount}:null}if(!d)return null;for(let u=l.length-1;u>=0;u-=1){let p=l[u],y=Wo(p,d,{allowSameSlotRevision:s,requireObservedSameSlotRevision:n});if(y.allowed)return{...p,confirmationMode:y.confirmationMode,sameSlotRevisionCandidate:y.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:y.sameSlotRevisionConfirmed,sameSlotRevisionSource:y.sameSlotRevisionSource,sameSlotRevisionAction:y.sameSlotRevisionAction,baselineAssistantContentFingerprint:y.baselineAssistantContentFingerprint,confirmedAssistantContentFingerprint:y.confirmedAssistantContentFingerprint,baselineAssistantSwipeId:y.baselineAssistantSwipeId,confirmedAssistantSwipeId:y.confirmedAssistantSwipeId,baselineAssistantSwipeCount:y.baselineAssistantSwipeCount,confirmedAssistantSwipeCount:y.confirmedAssistantSwipeCount}}return null}async function Dn(t="",e={}){let{retries:s=0,retryDelayMs:n=250,allowSameSlotRevision:o=!1,requireObservedSameSlotRevision:i=!0}=e,a=null;for(let r=0;r<=s;r+=1){if(a=await Xc(t,{allowSameSlotRevision:o,requireObservedSameSlotRevision:i}),a)return a;r<s&&await Gn(n)}return null}function Rt(){let t=x.gateState.lastGenerationBaseline;return{baselineResolved:t?.baselineResolved??!1,baselineResolutionAt:t?.baselineResolutionAt||0,provisionalBaseline:!!t?.provisional,generationStartedByUserIntent:!!t?.startedByUserIntent,generationUserIntentSource:t?.userIntentSource||"",generationUserIntentDetail:t?.userIntentDetail||"",rawGenerationType:t?.rawGenerationType||x.gateState.lastGenerationType||"",rawGenerationParams:t?.rawGenerationParams??x.gateState.lastGenerationParams??null,normalizedGenerationType:t?.normalizedGenerationType||x.gateState.lastNormalizedGenerationType||"",generationAction:t?.generationAction||x.gateState.lastGenerationAction||"",generationActionSource:t?.generationActionSource||x.gateState.lastGenerationActionSource||"",explicitGenerationAction:t?.explicitGenerationAction||"",baselineAssistantContentFingerprint:t?.lastAssistantContentFingerprint||"",baselineAssistantSwipeId:F(t?.lastAssistantSwipeId),baselineAssistantSwipeCount:Number.isFinite(t?.lastAssistantSwipeCount)?Math.max(0,Number(t.lastAssistantSwipeCount)):0,lastUserIntentSource:x.gateState.lastUserIntentSource||""}}function Qc(){let t=x.gateState.lastGenerationBaseline;return{sessionGenerationTraceId:x.gateState.lastGenerationTraceId||"",sessionGenerationStartedAt:t?.startedAt||0,sessionBaselineResolvedAtCreation:t?.baselineResolved??!1,sessionBaselineResolutionAtCreation:t?.baselineResolutionAt||0,sessionProvisionalBaselineAtCreation:!!t?.provisional,sessionGenerationStartedByUserIntent:!!t?.startedByUserIntent,sessionGenerationUserIntentSource:t?.userIntentSource||"",sessionGenerationUserIntentDetail:t?.userIntentDetail||"",sessionGenerationActionAtCreation:t?.generationAction||x.gateState.lastGenerationAction||"",sessionGenerationActionSourceAtCreation:t?.generationActionSource||x.gateState.lastGenerationActionSource||"",sessionExplicitGenerationActionAtCreation:t?.explicitGenerationAction||"",sessionNormalizedGenerationTypeAtCreation:t?.normalizedGenerationType||x.gateState.lastNormalizedGenerationType||"",sessionRawGenerationTypeAtCreation:t?.rawGenerationType||x.gateState.lastGenerationType||"",sessionLastUserIntentSourceAtCreation:x.gateState.lastUserIntentSource||"",sessionGenerationCapturedAt:Date.now()}}async function Zc(){return Rn||(Rn=Promise.resolve().then(()=>(In(),wn)).catch(t=>{throw Rn=null,t})),Rn}function ed(t={}){let e=Rt();return{stage:"",eventType:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",executionKey:"",messageRole:"",reason:"",skipReasonDetailed:"",confirmedAssistantMessageId:"",confirmationMode:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",scheduledDelayMs:0,candidateToolIds:[],receivedAt:Date.now(),handledAt:0,generationTraceId:x.gateState.lastGenerationTraceId||"",generationDryRun:!!x.gateState.lastGenerationDryRun,generationStartedAt:x.gateState.lastGenerationBaseline?.startedAt||0,uiTransitionGuardActive:ei(),uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:x.gateState.lastUiTransitionSource||"",baselineMessageCount:x.gateState.lastGenerationBaseline?.messageCount||0,baselineAssistantId:x.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",generationBaselineMessageCount:x.gateState.lastGenerationBaseline?.messageCount||0,generationBaselineAssistantId:x.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",confirmationSource:"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",registeredEvents:Array.from(T.listeners.keys()),listenerSettings:_e(),hasRecentUserTriggerIntent:Or(),hasConfirmedUserTriggerIntent:Zo(),...e,...t}}function Ee(t={}){let e=ed(t);return T.lastEventDebugSnapshot=e,z("\u81EA\u52A8\u89E6\u53D1\u4E8B\u4EF6\u5FEB\u7167:",e),e}function td(){let t=_e();return t.listenGenerationEnded===!1?{skip:!0,reason:M.LISTENER_DISABLED,listenerSettings:t}:t.ignoreAutoTrigger&&!Zo()?{skip:!0,reason:M.IGNORED_AUTO_TRIGGER,listenerSettings:t}:{skip:!1,reason:"",listenerSettings:t}}function sd(t={}){let e=Rt();return{triggerEvent:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",executionKey:"",confirmationMode:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",selectedToolIds:[],skipReason:"",skipReasonDetailed:"",lockedAiMessageId:"",confirmedAssistantMessageId:"",confirmationSource:"",eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",generationTraceId:x.gateState.lastGenerationTraceId||"",...e,triggeredAt:Date.now(),...t}}function wt(t={}){let e=sd(t);return T.lastAutoTriggerSnapshot=e,z("\u81EA\u52A8\u89E6\u53D1\u5FEB\u7167:",e),e}function ls(t,e){(Array.isArray(t)?t:[]).forEach(n=>{n?.id&&ss(n.id,{lastTriggerAt:Date.now(),lastExecutionKey:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0,...e},{touchLastRunAt:!1,emitEvent:!1})})}function Ds(t,e,s){let o=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(i=>typeof i=="string"&&i.trim());return o||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function rt(t,e,s={}){if(!t||typeof e!="function")return z("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),N("warn","\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25\uFF1A\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u65E0\u6548",{eventType:t}),()=>{};let{once:n=!1,priority:o=0}=s,i=Ln(),r=Un()[t]||t,c=async(...l)=>{try{if(N("info","\u6536\u5230\u4E8B\u4EF6",t,l[0]??null),s.gateCheck&&!await ti(s.gateCheck)){z(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`),N("warn","\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6",t);return}await e(...l),n&&Vo(t,c)}catch(d){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",d)}};if(x.listeners.has(t)||x.listeners.set(t,new Set),x.listeners.get(t).add(c),i&&typeof i.on=="function")i.on(r,c),z(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),N("info","\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u6E90\u76D1\u542C",{eventType:t,stEventType:r});else if(i&&typeof i.addEventListener=="function")i.addEventListener(r,c),z(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),N("info","\u5DF2\u6CE8\u518C addEventListener \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:r});else{let l=jt();l.addEventListener&&(l.addEventListener(r,c),z(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),N("warn","\u4E8B\u4EF6\u6E90\u4E0D\u53EF\u7528\uFF0C\u56DE\u9000\u4E3A DOM \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:r}))}return()=>Vo(t,c)}function Vo(t,e){let s=x.listeners.get(t);if(s&&s.has(e)){s.delete(e);let n=Ln(),i=Un()[t]||t;if($r(n,i,e))z(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let a=jt();a.removeEventListener&&a.removeEventListener(i,e)}}}function nd(){let t=Ln(),e=Un();for(let[s,n]of x.listeners){let o=e[s]||s;for(let i of n)if(!$r(t,o,i)){let a=jt();a.removeEventListener&&a.removeEventListener(o,i)}}x.listeners.clear(),z("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function ti(t){if(!t)return!0;let e=Date.now(),s=x.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return z("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return z("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return z("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return z("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return z("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(n){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",n),!1}return!0}function It(t){Object.assign(x.gateState,t)}function od(){x.gateState={lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastNormalizedGenerationType:"",lastGenerationAction:"",lastGenerationActionSource:"",lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""}}async function si(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:n=!0,includeSystem:o=!1,format:i="messages"}=t;if(!lt())return z("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let r=await $s(),c=[],l=Math.max(0,r.length-e);for(let d=l;d<r.length;d++){let u=r[d];if(!u)continue;let p=Bn(u);if(!(p==="user"&&!s)&&!(p==="system"&&!o)&&!(p==="assistant"&&!n))if(i==="messages"){let y=$n(u);c.push({role:p,content:y,name:u.name||"",timestamp:u.send_date||u.timestamp,isSystem:!!u.is_system,isUser:!!u.is_user})}else c.push($n(u))}return{messages:c,totalMessages:r.length,startIndex:l,endIndex:r.length-1}}catch(r){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",r),null}}function Bn(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function $s(){let t=kc(),e=lt();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let n=e?.getContext?.()||null,o=Array.isArray(n?.chat)?n.chat:[],i=Array.isArray(e?.chat)?e.chat:[];s=(o.length?o:i).length-1}if(Number.isFinite(s)&&s>=0){let n=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(n)&&n.length>0)return n}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function ni(){let t=lt();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let n=s[e];return{id:e,name:n.name||"",description:n.description||"",personality:n.personality||"",scenario:n.scenario||"",firstMes:n.first_mes||"",mesExample:n.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function Br(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,n=lt();if(!n)return"";try{let i=(n.lorebook||[]).entries||[],a=[],r=0;for(let c of i){if(e&&!c.enabled)continue;let l=c.content||"";l&&r+l.length<=s&&(a.push(l),r+=l.length)}return a.join(`

`)}catch(o){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",o),""}}async function id(t={}){let[e,s,n]=await Promise.all([si(t.chat||{}),ni(),Br(t.worldbook||{})]);return{chat:e,character:s,worldbook:n,timestamp:Date.now()}}function rd(t,e){if(!t||!e)return z("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:n,gateCondition:o,priority:i=0}=e;if(!s||typeof n!="function")return z("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};x.handlers.set(t,{eventType:s,handler:n,gateCondition:o,priority:i,enabled:!0});let a=rt(s,async(...r)=>{let c=x.handlers.get(t);!c||!c.enabled||c.gateCondition&&!await ti(c.gateCondition)||await c.handler(...r)},{priority:i});return z(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{a(),x.handlers.delete(t),z(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function ad(t,e){let s=x.handlers.get(t);s&&(s.enabled=e,z(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function ld(){x.handlers.clear(),z("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function ys(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Ps(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Gs(){let t=lt(),e=t?.getContext?.()||null;return Ds(t,e,null)}function oi(t,e,s="",n=""){let o=t||Gs(),i=F(e),a=String(n||x.gateState.lastGenerationTraceId||"").trim();return`${o}::${i||`event:${s||"unknown"}:latest`}::${a||"trace:unknown"}`}function zr(t={}){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId),n=String(t?.generationTraceId||t?.generation?.traceId||x.gateState.lastGenerationTraceId||"").trim()||"trace:unknown",o=String(t?.assistantContentFingerprint||us(t?.lastAiMessage||t?.input?.lastAiMessage||"")||"").trim()||"content:na";return`${e}::${s}::${n}::${o}`}function cd(t,e,s={}){let n=F(s?.messageId||at(e,t)),o=s?.chatId||Gs(),i=String(s?.generationTraceId||x.gateState.lastGenerationTraceId||"").trim(),a=s?.sessionKey||oi(o,n,t,i),r=Date.now(),c=Rt(),l=Qc();return{sessionKey:a,traceId:s?.traceId||ys("session"),chatId:o,messageId:n,messageKey:s?.messageKey||"",executionKey:s?.executionKey||"",messageRole:s?.messageRole||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:!!s?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!s?.sameSlotRevisionConfirmed,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",isSpeculativeSession:!!s?.isSpeculativeSession,eventBelongsToCurrentGeneration:!!s?.eventBelongsToCurrentGeneration,historicalReplayBlocked:!!s?.historicalReplayBlocked,historicalReplayReason:s?.historicalReplayReason||"",skipReasonDetailed:s?.skipReasonDetailed||"",firstEventType:s?.eventType||t||"",receivedEvents:t?[t]:[],phase:s?.phase||U.RECEIVED,skipReason:s?.skipReason||"",scheduledAt:0,handledAt:0,completedAt:0,candidateToolIds:Array.isArray(s?.candidateToolIds)?[...s.candidateToolIds]:[],executionPathIds:Array.isArray(s?.executionPathIds)?[...s.executionPathIds]:[],sourceMessageLocked:!!n,baselineResolved:s?.baselineResolved??c.baselineResolved,baselineResolutionAt:s?.baselineResolutionAt??c.baselineResolutionAt,provisionalBaseline:s?.provisionalBaseline??c.provisionalBaseline,generationStartedByUserIntent:s?.generationStartedByUserIntent??c.generationStartedByUserIntent,generationUserIntentSource:s?.generationUserIntentSource||c.generationUserIntentSource,generationUserIntentDetail:s?.generationUserIntentDetail||c.generationUserIntentDetail,generationAction:s?.generationAction||c.generationAction,generationActionSource:s?.generationActionSource||c.generationActionSource,explicitGenerationAction:s?.explicitGenerationAction||c.explicitGenerationAction,lastUserIntentSource:s?.lastUserIntentSource||c.lastUserIntentSource,sessionGenerationTraceId:s?.sessionGenerationTraceId||l.sessionGenerationTraceId,sessionGenerationStartedAt:s?.sessionGenerationStartedAt??l.sessionGenerationStartedAt,sessionBaselineResolvedAtCreation:s?.sessionBaselineResolvedAtCreation??l.sessionBaselineResolvedAtCreation,sessionBaselineResolutionAtCreation:s?.sessionBaselineResolutionAtCreation??l.sessionBaselineResolutionAtCreation,sessionProvisionalBaselineAtCreation:s?.sessionProvisionalBaselineAtCreation??l.sessionProvisionalBaselineAtCreation,sessionGenerationStartedByUserIntent:s?.sessionGenerationStartedByUserIntent??l.sessionGenerationStartedByUserIntent,sessionGenerationUserIntentSource:s?.sessionGenerationUserIntentSource||l.sessionGenerationUserIntentSource,sessionGenerationUserIntentDetail:s?.sessionGenerationUserIntentDetail||l.sessionGenerationUserIntentDetail,sessionGenerationActionAtCreation:s?.sessionGenerationActionAtCreation||l.sessionGenerationActionAtCreation,sessionGenerationActionSourceAtCreation:s?.sessionGenerationActionSourceAtCreation||l.sessionGenerationActionSourceAtCreation,sessionExplicitGenerationActionAtCreation:s?.sessionExplicitGenerationActionAtCreation||l.sessionExplicitGenerationActionAtCreation,sessionNormalizedGenerationTypeAtCreation:s?.sessionNormalizedGenerationTypeAtCreation||l.sessionNormalizedGenerationTypeAtCreation,sessionRawGenerationTypeAtCreation:s?.sessionRawGenerationTypeAtCreation||l.sessionRawGenerationTypeAtCreation,sessionLastUserIntentSourceAtCreation:s?.sessionLastUserIntentSourceAtCreation||l.sessionLastUserIntentSourceAtCreation,sessionGenerationCapturedAt:s?.sessionGenerationCapturedAt??l.sessionGenerationCapturedAt,createdAt:r,updatedAt:r}}function dd(t=Date.now()){let{messageSessionWindowMs:e}=_e();for(let[s,n]of T.messageSessions.entries()){let o=n?.completedAt||n?.handledAt||n?.updatedAt||n?.createdAt||0;o>0&&t-o>e&&T.messageSessions.delete(s)}}function ds(t,e,s={}){dd();let n=F(s?.messageId||at(e,t)),o=s?.chatId||Gs(),i=String(s?.generationTraceId||x.gateState.lastGenerationTraceId||"").trim(),a=s?.sessionKey||oi(o,n,t,i),r=T.messageSessions.get(a);return r?(t&&!r.receivedEvents.includes(t)&&r.receivedEvents.push(t),n&&!r.messageId&&(r.messageId=n,r.sourceMessageLocked=!0),s?.messageRole&&(r.messageRole=s.messageRole),s?.executionKey&&(r.executionKey=s.executionKey),s?.confirmedAssistantMessageId&&(r.confirmedAssistantMessageId=s.confirmedAssistantMessageId),s?.confirmationSource&&(r.confirmationSource=s.confirmationSource),s?.confirmationMode&&(r.confirmationMode=s.confirmationMode),s?.sameSlotRevisionCandidate!==void 0&&(r.sameSlotRevisionCandidate=!!s.sameSlotRevisionCandidate),s?.sameSlotRevisionConfirmed!==void 0&&(r.sameSlotRevisionConfirmed=!!s.sameSlotRevisionConfirmed),s?.sameSlotRevisionSource&&(r.sameSlotRevisionSource=s.sameSlotRevisionSource),s?.skipReasonDetailed&&(r.skipReasonDetailed=s.skipReasonDetailed),s?.eventBelongsToCurrentGeneration!==void 0&&(r.eventBelongsToCurrentGeneration=!!s.eventBelongsToCurrentGeneration),s?.historicalReplayBlocked!==void 0&&(r.historicalReplayBlocked=!!s.historicalReplayBlocked),s?.historicalReplayReason&&(r.historicalReplayReason=s.historicalReplayReason),s?.isSpeculativeSession!==void 0&&(r.isSpeculativeSession=!!s.isSpeculativeSession),s?.candidateToolIds&&(r.candidateToolIds=[...s.candidateToolIds]),he(r,{})):(r=cd(t,e,{...s,chatId:o,generationTraceId:i,sessionKey:a,messageId:n}),T.messageSessions.set(a,r),r)}function he(t,e={}){if(!t)return null;let s=Rt();return Object.assign(t,s,e,{updatedAt:Date.now()}),t}function ud(t,e){return!t||!e||t.sessionKey===e||(T.messageSessions.delete(t.sessionKey),t.sessionKey=e,t.updatedAt=Date.now(),T.messageSessions.set(e,t)),t}function fe(t,e={}){if(!t)return null;let{historyRetentionLimit:s}=_e(),n=Rt(),o={id:e?.id||ys("session_hist"),at:e?.at||Date.now(),traceId:t.traceId,sessionKey:t.sessionKey,phase:e?.phase||t.phase,eventType:e?.eventType||t.firstEventType,messageId:e?.messageId||t.messageId,messageKey:e?.messageKey||t.messageKey,executionKey:e?.executionKey||t.executionKey||"",messageRole:e?.messageRole||t.messageRole,confirmedAssistantMessageId:e?.confirmedAssistantMessageId||t.confirmedAssistantMessageId||"",confirmationSource:e?.confirmationSource||t.confirmationSource||"",confirmationMode:e?.confirmationMode||t.confirmationMode||"",sameSlotRevisionCandidate:e?.sameSlotRevisionCandidate??t.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:e?.sameSlotRevisionConfirmed??t.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:e?.sameSlotRevisionSource||t.sameSlotRevisionSource||"",isSpeculativeSession:e?.isSpeculativeSession??t.isSpeculativeSession??!1,eventBelongsToCurrentGeneration:e?.eventBelongsToCurrentGeneration??t.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:e?.historicalReplayBlocked??t.historicalReplayBlocked??!1,historicalReplayReason:e?.historicalReplayReason||t.historicalReplayReason||"",generationTraceId:e?.generationTraceId||x.gateState.lastGenerationTraceId||"",generationStartedAt:e?.generationStartedAt||x.gateState.lastGenerationBaseline?.startedAt||0,generationDryRun:e?.generationDryRun??!!x.gateState.lastGenerationDryRun,baselineResolved:e?.baselineResolved??t.baselineResolved??n.baselineResolved,baselineResolutionAt:e?.baselineResolutionAt??t.baselineResolutionAt??n.baselineResolutionAt,provisionalBaseline:e?.provisionalBaseline??t.provisionalBaseline??n.provisionalBaseline,generationStartedByUserIntent:e?.generationStartedByUserIntent??t.generationStartedByUserIntent??n.generationStartedByUserIntent,generationUserIntentSource:e?.generationUserIntentSource||t.generationUserIntentSource||n.generationUserIntentSource,generationUserIntentDetail:e?.generationUserIntentDetail||t.generationUserIntentDetail||n.generationUserIntentDetail,generationAction:e?.generationAction||t.generationAction||n.generationAction,generationActionSource:e?.generationActionSource||t.generationActionSource||n.generationActionSource,explicitGenerationAction:e?.explicitGenerationAction||t.explicitGenerationAction||n.explicitGenerationAction,lastUserIntentSource:e?.lastUserIntentSource||t.lastUserIntentSource||n.lastUserIntentSource,sessionGenerationTraceId:e?.sessionGenerationTraceId||t.sessionGenerationTraceId||"",sessionGenerationStartedAt:e?.sessionGenerationStartedAt??t.sessionGenerationStartedAt??0,sessionBaselineResolvedAtCreation:e?.sessionBaselineResolvedAtCreation??t.sessionBaselineResolvedAtCreation??!1,sessionBaselineResolutionAtCreation:e?.sessionBaselineResolutionAtCreation??t.sessionBaselineResolutionAtCreation??0,sessionProvisionalBaselineAtCreation:e?.sessionProvisionalBaselineAtCreation??t.sessionProvisionalBaselineAtCreation??!1,sessionGenerationStartedByUserIntent:e?.sessionGenerationStartedByUserIntent??t.sessionGenerationStartedByUserIntent??!1,sessionGenerationUserIntentSource:e?.sessionGenerationUserIntentSource||t.sessionGenerationUserIntentSource||"",sessionGenerationUserIntentDetail:e?.sessionGenerationUserIntentDetail||t.sessionGenerationUserIntentDetail||"",sessionGenerationActionAtCreation:e?.sessionGenerationActionAtCreation||t.sessionGenerationActionAtCreation||"",sessionGenerationActionSourceAtCreation:e?.sessionGenerationActionSourceAtCreation||t.sessionGenerationActionSourceAtCreation||"",sessionExplicitGenerationActionAtCreation:e?.sessionExplicitGenerationActionAtCreation||t.sessionExplicitGenerationActionAtCreation||"",sessionNormalizedGenerationTypeAtCreation:e?.sessionNormalizedGenerationTypeAtCreation||t.sessionNormalizedGenerationTypeAtCreation||"",sessionRawGenerationTypeAtCreation:e?.sessionRawGenerationTypeAtCreation||t.sessionRawGenerationTypeAtCreation||"",sessionLastUserIntentSourceAtCreation:e?.sessionLastUserIntentSourceAtCreation||t.sessionLastUserIntentSourceAtCreation||"",sessionGenerationCapturedAt:e?.sessionGenerationCapturedAt??t.sessionGenerationCapturedAt??Date.now(),skipReason:e?.skipReason||t.skipReason||"",skipReasonDetailed:e?.skipReasonDetailed||t.skipReasonDetailed||"",candidateToolIds:Array.isArray(e?.candidateToolIds)?[...e.candidateToolIds]:[...t.candidateToolIds||[]],executionPathIds:Array.isArray(e?.executionPathIds)?[...e.executionPathIds]:[...t.executionPathIds||[]]};return T.recentSessionHistory=Ps([...T.recentSessionHistory,o],s),o}function Ft(t,e={}){let s=Array.isArray(t)?t:[],{historyRetentionLimit:n}=_e();s.forEach(o=>{o?.id&&ws(o.id,"trigger",e,{limit:n,emitEvent:!1})})}function pd(t,e={}){if(!t)return;let{historyRetentionLimit:s}=_e();ws(t,"writeback",e,{limit:s,emitEvent:!1})}function cs(t){if(!t||typeof t!="object")return t;let e=Fr(t);return{...t,...e,receivedEvents:Array.isArray(t.receivedEvents)?[...t.receivedEvents]:void 0,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:void 0,executionPathIds:Array.isArray(t.executionPathIds)?[...t.executionPathIds]:void 0,driftReasons:Array.isArray(e.driftReasons)?[...e.driftReasons]:[]}}function Ce(t){return String(t||"").trim()}function Fr(t){if(!t||typeof t!="object")return{driftDetected:!1,generationTraceDrifted:!1,generationActionDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};if(!(t.sessionGenerationCapturedAt!==void 0||t.sessionGenerationTraceId!==void 0||t.sessionBaselineResolvedAtCreation!==void 0||t.sessionGenerationStartedByUserIntent!==void 0||t.sessionGenerationUserIntentSource!==void 0||t.sessionGenerationUserIntentDetail!==void 0))return{driftDetected:!1,generationTraceDrifted:!1,generationActionDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};let s=Ce(t.sessionGenerationTraceId),n=Ce(t.generationTraceId),o=Ce(t.sessionGenerationUserIntentSource),i=Ce(t.generationUserIntentSource),a=Ce(t.sessionGenerationUserIntentDetail),r=Ce(t.generationUserIntentDetail),c=Ce(t.sessionGenerationActionAtCreation),l=Ce(t.generationAction),d=Ce(t.sessionGenerationActionSourceAtCreation),u=Ce(t.generationActionSource),p=Ce(t.sessionExplicitGenerationActionAtCreation),y=Ce(t.explicitGenerationAction),b=Ce(t.sessionNormalizedGenerationTypeAtCreation),h=Ce(t.normalizedGenerationType),m=!!s&&!!n&&s!==n,E=(c||l?c!==l:!1)||(d||u?d!==u:!1)||(p||y?p!==y:!1)||(b||h?b!==h:!1),J=!!t.sessionGenerationStartedByUserIntent!=!!t.generationStartedByUserIntent||(o||i?o!==i:!1)||(a||r?a!==r:!1),D=!!t.sessionBaselineResolvedAtCreation!=!!t.baselineResolved,Y=(Number(t.baselineResolutionAt)||0)>(Number(t.sessionBaselineResolutionAtCreation)||0),k=[];return m&&k.push("generation_trace_changed"),E&&k.push("generation_action_changed"),J&&k.push("generation_user_intent_changed"),D&&k.push("baseline_resolved_state_changed"),Y&&k.push("baseline_resolution_advanced"),{driftDetected:k.length>0,generationTraceDrifted:m,generationActionDrifted:E,generationUserIntentDrifted:J,baselineResolvedStateChanged:D,baselineResolutionAdvancedSinceSessionCreation:Y,driftReasons:k}}function Mr(t=[]){return(Array.isArray(t)?t:[]).reduce((e,s)=>{let n=Ce(s?.phase)||"unknown";return e[n]=(e[n]||0)+1,e},{})}function kr(t=[]){let e={entryCount:0,driftDetectedCount:0,generationTraceDriftCount:0,generationActionDriftCount:0,generationUserIntentDriftCount:0,baselineResolvedStateChangedCount:0,baselineResolutionAdvancedCount:0};for(let s of Array.isArray(t)?t:[]){let n=Fr(s);e.entryCount+=1,n.driftDetected&&(e.driftDetectedCount+=1),n.generationTraceDrifted&&(e.generationTraceDriftCount+=1),n.generationActionDrifted&&(e.generationActionDriftCount+=1),n.generationUserIntentDrifted&&(e.generationUserIntentDriftCount+=1),n.baselineResolvedStateChanged&&(e.baselineResolvedStateChangedCount+=1),n.baselineResolutionAdvancedSinceSessionCreation&&(e.baselineResolutionAdvancedCount+=1)}return e}function Kr(){let t=ks(),e=t.eventSource||ce.eventSource||null;return{source:t.source||ce.source||"",ready:Xo(e),hasImportedScriptModule:!!ce.scriptModule,importError:ce.importError?.message||""}}function Hr(){let t=x.gateState.lastGenerationBaseline;return{lastUserSendIntentAt:x.gateState.lastUserSendIntentAt||0,lastUserIntentSource:x.gateState.lastUserIntentSource||"",lastUserMessageId:F(x.gateState.lastUserMessageId),lastUserMessageAt:x.gateState.lastUserMessageAt||0,lastGenerationTraceId:x.gateState.lastGenerationTraceId||"",lastGenerationType:x.gateState.lastGenerationType||"",lastGenerationDryRun:!!x.gateState.lastGenerationDryRun,lastGenerationAt:x.gateState.lastGenerationAt||0,isGenerating:!!x.gateState.isGenerating,uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil||0,lastUiTransitionAt:x.gateState.lastUiTransitionAt||0,lastUiTransitionSource:x.gateState.lastUiTransitionSource||"",baselineMessageCount:t?.messageCount||0,baselineAssistantId:t?.lastAssistantMessageId||"",...Rt()}}function yd(){let{historyRetentionLimit:t}=_e();return Math.max(20,Math.min(200,Number(t||0)*4||40))}function gd(t={}){let e=Rt();return{id:t?.id||ys("timeline"),at:Number(t?.at)||Date.now(),kind:t?.kind||"event",eventType:t?.eventType||"",traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",messageId:F(t?.messageId),executionKey:t?.executionKey||"",phase:t?.phase||"",reason:t?.reason||"",detail:t?.detail||"",confirmationSource:t?.confirmationSource||"",candidateToolIds:Array.isArray(t?.candidateToolIds)?[...t.candidateToolIds]:[],generationTraceId:t?.generationTraceId||x.gateState.lastGenerationTraceId||"",baselineResolved:t?.baselineResolved??e.baselineResolved,generationStartedByUserIntent:t?.generationStartedByUserIntent??e.generationStartedByUserIntent,generationUserIntentSource:t?.generationUserIntentSource||e.generationUserIntentSource,historicalReplayBlocked:t?.historicalReplayBlocked??!1}}function Kt(t={}){let e=gd(t);return T.recentEventTimeline=Ps([...T.recentEventTimeline,e],yd()),e}function jr(t){return!t||typeof t!="object"?t:{...t,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:[]}}function Mn(t=!1,e=[],s=[]){return{flagged:!!t,reasons:[...new Set((Array.isArray(e)?e:[]).filter(Boolean))],relatedSessionKeys:[...new Set((Array.isArray(s)?s:[]).filter(Boolean))]}}function fd(t={}){let e=t?.summary||{},s=[...Array.isArray(t?.activeSessions)?t.activeSessions:[],...Array.isArray(t?.recentSessionHistory)?t.recentSessionHistory:[],t?.lastEventDebugSnapshot,t?.lastAutoTriggerSnapshot].filter(Boolean),n=[],o=[],i=[],a=[],r=[],c=[],l=[],d=[];for(let u of s){let p=String(u?.reason||u?.skipReason||"").trim(),y=String(u?.detail||u?.skipReasonDetailed||"").trim(),b=String(u?.sessionKey||"").trim(),h=String(u?.phase||u?.stage||"").trim(),m=String(u?.confirmationSource||"").trim(),E=String(u?.generationUserIntentSource||"").trim(),J=!!u?.generationStartedByUserIntent;(y==="missing_generation_baseline"||y==="generation_baseline_pending_resolution")&&(n.push(y),o.push(b)),(p===M.HISTORICAL_REPLAY_MESSAGE_RECEIVED||p===M.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION||u?.historicalReplayBlocked)&&(i.push(u?.historicalReplayReason||p||y||"historical_replay_signal_detected"),a.push(b)),p===M.IGNORED_AUTO_TRIGGER&&(J||E.startsWith("explicit_generation_action:"))&&(r.push(`ignored_auto_trigger_with_${E||"user_intent"}`),c.push(b)),e?.listenerSettings?.ignoreAutoTrigger&&!J&&!u?.isSpeculativeSession&&(h===U.COMPLETED||h===U.HANDLING||h===U.DISPATCHING||m==="generation_ended"||m==="message_received"||m==="generation_after_commands")&&(l.push("non_user_intent_generation_reached_execution_path"),d.push(b))}return{a10BaselineRaceSuspicious:Mn(n.length>0,n,o),a11ReplaySuspicious:Mn(i.length>0,i,a),a12UserIntentSuspicious:Mn(r.length>0,r,c),a13AutoTriggerLeakSuspicious:Mn(l.length>0,l,d)}}function md(t,e=""){let s=Date.now();return T.lastDuplicateExecutionKey===(e||t)&&s-T.lastDuplicateMessageAt<Sc?!1:(T.lastDuplicateMessageKey=t,T.lastDuplicateExecutionKey=e||t,T.lastDuplicateMessageAt=s,!0)}function ii(t=Date.now()){for(let[e,s]of T.handledExecutionKeys.entries()){let n=Number(s?.at)||0;(n<=0||t-n>Ec)&&T.handledExecutionKeys.delete(e)}}function hd(t,e=Date.now()){let s=String(t||"").trim();return s?(ii(e),T.handledExecutionKeys.has(s)):!1}function bd(t,e={}){let s=String(t||"").trim();if(!s)return null;let n={executionKey:s,at:Number(e?.at)||Date.now(),messageKey:String(e?.messageKey||"").trim(),messageId:F(e?.messageId),generationTraceId:String(e?.generationTraceId||"").trim(),eventType:String(e?.eventType||"").trim(),sessionKey:String(e?.sessionKey||"").trim()};return T.handledExecutionKeys.set(s,n),ii(n.at),n}function Yr(t=8){return ii(),Ps(Array.from(T.handledExecutionKeys.values()).sort((e,s)=>(Number(e?.at)||0)-(Number(s?.at)||0)),t).map(e=>({...e}))}function mt(t,e,s={}){let n=F(s?.messageId||at(e,t)),o=ds(t,e,{eventType:t,messageId:n,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",skipReasonDetailed:s?.skipReasonDetailed||"speculative_session_only",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),i=s?.reason||M.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,a=s?.skipReasonDetailed||"speculative_session_only";return N("info","\u8BB0\u5F55 speculative session\uFF0C\u672A\u8FDB\u5165\u6267\u884C\u8C03\u5EA6",{eventType:t,traceId:o?.traceId||"",sessionKey:o?.sessionKey||"",messageId:n,reason:i,detail:a}),Ee({stage:"speculative_observed",eventType:t,traceId:o?.traceId||"",sessionKey:o?.sessionKey||"",messageId:n,reason:i,skipReasonDetailed:a,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",isSpeculativeSession:!0,eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",handledAt:Date.now()}),he(o,{phase:U.IGNORED,skipReason:i,skipReasonDetailed:a,confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0,completedAt:Date.now()}),fe(o,{phase:U.IGNORED,eventType:t,messageId:n,skipReason:i,skipReasonDetailed:a,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),o}function Dr(t,e,s=0,n={}){let o=F(n?.confirmedAssistantMessageId||n?.messageId||at(e,t));if(!o)return mt(t,e,{...n,reason:n?.reason||M.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:n?.skipReasonDetailed||"missing_confirmed_message_identity",confirmationSource:n?.confirmationSource||"none"});let i=typeof e=="object"&&e?{...e,messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||e?.confirmationSource||"",confirmationMode:n?.confirmationMode||e?.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??e?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??e?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||e?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??e?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??e?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||e?.historicalReplayReason||""}:{messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||"",confirmationMode:n?.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||""},a=ds(t,i,{...n,eventType:t,messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",confirmationMode:n?.confirmationMode||i.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??i.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??i.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||i.historicalReplayReason||"",isSpeculativeSession:!1}),r=Number.isFinite(s)?Math.max(0,s):_e().debounceMs,c=a?.sessionKey||`message::${o}`,l=T.pendingMessageTimers.get(c);l&&clearTimeout(l),he(a,{phase:U.SCHEDULED,messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",confirmationMode:n?.confirmationMode||i.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??i.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??i.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||i.historicalReplayReason||"",isSpeculativeSession:!1,scheduledAt:Date.now()}),fe(a,{phase:U.SCHEDULED,eventType:t,messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??i.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??i.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||i.historicalReplayReason||"",isSpeculativeSession:!1}),Ee({stage:"scheduled",eventType:t,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",confirmationMode:n?.confirmationMode||i.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:r}),N("info","\u5DF2\u8C03\u5EA6\u786E\u8BA4\u540E\u7684\u81EA\u52A8\u89E6\u53D1",{eventType:t,messageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",delayMs:r});let d=setTimeout(async()=>{T.pendingMessageTimers.delete(c),he(a,{phase:U.DISPATCHING,confirmationSource:n?.confirmationSource||i.confirmationSource||"",confirmationMode:n?.confirmationMode||i.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",confirmedAssistantMessageId:o,isSpeculativeSession:!1}),fe(a,{phase:U.DISPATCHING,eventType:t,messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",confirmationMode:n?.confirmationMode||i.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",isSpeculativeSession:!1}),Ee({stage:"dispatching",eventType:t,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",isSpeculativeSession:!1,confirmationMode:n?.confirmationMode||i.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:r}),await Vr(t,i)},r);return T.pendingMessageTimers.set(c,d),a}function Pn(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}function Wr(t,e){return e?.triggerEvent==="MANUAL"?t.output?.mode===At.POST_RESPONSE_API?Ht.MANUAL_POST_RESPONSE_API:Ht.MANUAL_COMPATIBILITY:Ht.AUTO_POST_RESPONSE_API}async function Vr(t,e){z(`${t}\u89E6\u53D1:`,e);let s=typeof e=="object"&&e?String(e?.confirmationSource||"").trim():"",n=typeof e=="object"&&e?String(e?.confirmationMode||"").trim():"",o=!!(typeof e=="object"&&e&&e?.sameSlotRevisionCandidate),i=!!(typeof e=="object"&&e&&e?.sameSlotRevisionConfirmed),a=typeof e=="object"&&e?String(e?.sameSlotRevisionSource||"").trim():"";N("info","\u5F00\u59CB\u5904\u7406\u81EA\u52A8\u89E6\u53D1",{eventType:t,incomingMessageId:at(e,t),confirmationSource:s});let r=Sd(I.GENERATION_ENDED),c=r.map(k=>k.id),l=td(),d=at(e,t),u=!!(typeof e=="object"&&e&&e?.eventBelongsToCurrentGeneration),p=!!(typeof e=="object"&&e&&e?.historicalReplayBlocked),y=typeof e=="object"&&e?String(e?.historicalReplayReason||"").trim():"",b=F((typeof e=="object"&&e?e?.confirmedAssistantMessageId:"")||d),h=ds(t,e,{eventType:t,messageId:d,confirmedAssistantMessageId:b,confirmationSource:s,confirmationMode:n,sameSlotRevisionCandidate:o,sameSlotRevisionConfirmed:i,sameSlotRevisionSource:a,eventBelongsToCurrentGeneration:u,historicalReplayBlocked:p,historicalReplayReason:y,candidateToolIds:c});if(he(h,{phase:U.HANDLING,handledAt:Date.now(),confirmedAssistantMessageId:b,confirmationSource:s,confirmationMode:n,sameSlotRevisionCandidate:o,sameSlotRevisionConfirmed:i,sameSlotRevisionSource:a,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:u,historicalReplayBlocked:p,historicalReplayReason:y,candidateToolIds:c}),fe(h,{phase:U.HANDLING,eventType:t,messageId:d,confirmedAssistantMessageId:b,confirmationSource:s,confirmationMode:n,sameSlotRevisionCandidate:o,sameSlotRevisionConfirmed:i,sameSlotRevisionSource:a,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:u,historicalReplayBlocked:p,historicalReplayReason:y,candidateToolIds:c}),Ee({stage:"handling",eventType:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:d,confirmedAssistantMessageId:b,confirmationSource:s,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:u,historicalReplayBlocked:p,historicalReplayReason:y,candidateToolIds:c,handledAt:Date.now()}),ei()&&!Zo()){N("warn","\u5F53\u524D\u5904\u4E8E\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B\u7A97\u53E3\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u5FFD\u7565",{eventType:t,candidateToolIds:c,uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil,lastUiTransitionSource:x.gateState.lastUiTransitionSource||""}),wt({triggerEvent:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:d,selectedToolIds:c,skipReason:M.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:b,confirmationSource:s,lockedAiMessageId:d||""}),ls(r,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:M.UNRELATED_UI_EVENT,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"ignored_ui_transition_guard",eventType:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:d,reason:M.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:b,confirmationSource:s,candidateToolIds:c,handledAt:Date.now()}),he(h,{phase:U.IGNORED,skipReason:M.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:b,confirmationSource:s,completedAt:Date.now(),candidateToolIds:c}),fe(h,{phase:U.IGNORED,eventType:t,messageId:d,skipReason:M.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:b,confirmationSource:s,candidateToolIds:c}),Ft(r,{traceId:h?.traceId||"",eventType:t,messageId:d,messageKey:"",skipReason:M.UNRELATED_UI_EVENT,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(x.gateState.lastGenerationDryRun){N("warn","\u5F53\u524D generation \u4E3A dryRun\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u963B\u65AD",{eventType:t,candidateToolIds:c,generationTraceId:x.gateState.lastGenerationTraceId||""}),wt({triggerEvent:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:d,selectedToolIds:c,skipReason:M.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:b,confirmationSource:s,lockedAiMessageId:d||""}),ls(r,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:M.DRY_RUN_GENERATION,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"skipped",eventType:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:d,reason:M.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:b,confirmationSource:s,candidateToolIds:c,handledAt:Date.now()}),he(h,{phase:U.SKIPPED,skipReason:M.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:b,confirmationSource:s,completedAt:Date.now(),candidateToolIds:c}),fe(h,{phase:U.SKIPPED,eventType:t,messageId:d,skipReason:M.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:b,confirmationSource:s,candidateToolIds:c}),Ft(r,{traceId:h?.traceId||"",eventType:t,messageId:d,messageKey:"",skipReason:M.DRY_RUN_GENERATION,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(l.skip){N("warn","\u6839\u636E\u76D1\u542C\u5668\u8BBE\u7F6E\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,reason:l.reason,listenerSettings:l.listenerSettings,candidateToolIds:c}),wt({triggerEvent:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:d,selectedToolIds:c,skipReason:l.reason,skipReasonDetailed:`listener_setting_${l.reason}`,confirmedAssistantMessageId:b,confirmationSource:s,lockedAiMessageId:d||""}),ls(r,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:l.reason,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"skipped",eventType:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:d,reason:l.reason,skipReasonDetailed:`listener_setting_${l.reason}`,confirmedAssistantMessageId:b,confirmationSource:s,candidateToolIds:c,handledAt:Date.now()}),he(h,{phase:U.SKIPPED,skipReason:l.reason,skipReasonDetailed:`listener_setting_${l.reason}`,confirmedAssistantMessageId:b,confirmationSource:s,completedAt:Date.now(),candidateToolIds:c}),fe(h,{phase:U.SKIPPED,eventType:t,messageId:d,skipReason:l.reason,skipReasonDetailed:`listener_setting_${l.reason}`,confirmedAssistantMessageId:b,confirmationSource:s,candidateToolIds:c}),Ft(r,{traceId:h?.traceId||"",eventType:t,messageId:d,messageKey:"",skipReason:l.reason,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(l.listenerSettings.ignoreQuietGeneration&&Mc(x.gateState.lastGenerationType,x.gateState.lastGenerationParams,x.gateState.lastGenerationDryRun)){z("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C"),N("warn","\u68C0\u6D4B\u5230 quiet/dryRun\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,candidateToolIds:c}),wt({triggerEvent:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",selectedToolIds:c,skipReason:M.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:b,confirmationSource:s}),ls(r,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:M.QUIET_GENERATION,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"skipped",eventType:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:d,reason:M.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:b,confirmationSource:s,candidateToolIds:c,handledAt:Date.now()}),he(h,{phase:U.SKIPPED,skipReason:M.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:b,confirmationSource:s,completedAt:Date.now(),candidateToolIds:c}),fe(h,{phase:U.SKIPPED,eventType:t,messageId:d,skipReason:M.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:b,confirmationSource:s,candidateToolIds:c}),Ft(r,{traceId:h?.traceId||"",eventType:t,messageId:d,messageKey:"",skipReason:M.QUIET_GENERATION,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}let m=await ri({...typeof e=="object"&&e?e:{},triggerEvent:t,...d?{messageId:d}:{},...b?{confirmedAssistantMessageId:b}:{},...s?{confirmationSource:s}:{},traceId:h?.traceId||"",sessionKey:h?.sessionKey||""});m.traceId=h?.traceId||m.traceId||ys("exec"),m.sessionKey=h?.sessionKey||m.sessionKey||"";let E=m?.executionKey||zr(m||{});m.executionKey=E;let J=oi(m.chatId,m.messageId,t,m.generationTraceId);if(ud(h,J),he(h,{messageId:m.messageId||d,messageKey:Pn(m),executionKey:E,confirmedAssistantMessageId:m.confirmedAssistantMessageId||b,confirmationSource:m.confirmationSource||s,confirmationMode:m?.confirmationMode||n,sameSlotRevisionCandidate:m?.sameSlotRevisionCandidate??o,sameSlotRevisionConfirmed:m?.sameSlotRevisionConfirmed??i,sameSlotRevisionSource:m?.sameSlotRevisionSource||a,sourceMessageLocked:!!m.messageId}),!m?.lastAiMessage){z(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`),N("warn","\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D\uFF0C\u81EA\u52A8\u89E6\u53D1\u4E2D\u6B62",{eventType:t,preferredMessageId:d,candidateToolIds:c});let k=Pn(m||{});wt({triggerEvent:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:m?.messageId||"",messageKey:k,executionKey:E,selectedToolIds:c,skipReason:M.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,lockedAiMessageId:m?.messageId||""}),ls(r,{lastTriggerEvent:t,lastMessageKey:k,lastExecutionKey:E,lastSkipReason:M.MISSING_AI_MESSAGE,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"skipped",eventType:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:m?.messageId||d,messageKey:k,executionKey:E,reason:M.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,candidateToolIds:c,handledAt:Date.now()}),he(h,{phase:U.SKIPPED,skipReason:M.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",messageKey:k,executionKey:E,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:c}),fe(h,{phase:U.SKIPPED,eventType:t,messageId:m?.messageId||d,messageKey:k,executionKey:E,skipReason:M.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,candidateToolIds:c}),Ft(r,{traceId:h?.traceId||"",eventType:t,messageId:m?.messageId||d,messageKey:k,skipReason:M.MISSING_AI_MESSAGE,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}let D=Pn(m);if(hd(E)){md(D,E)&&(z(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${D}`),N("warn","\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD\uFF0C\u8DF3\u8FC7\u6267\u884C",{eventType:t,messageKey:D,executionKey:E,candidateToolIds:c}),wt({triggerEvent:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:m?.messageId||"",messageKey:D,executionKey:E,selectedToolIds:c,skipReason:M.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,lockedAiMessageId:m?.messageId||""}),ls(r,{lastTriggerEvent:t,lastMessageKey:D,lastExecutionKey:E,lastSkipReason:M.DUPLICATE_MESSAGE,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"skipped",eventType:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:m?.messageId||d,messageKey:D,executionKey:E,reason:M.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,candidateToolIds:c,handledAt:Date.now()}),he(h,{phase:U.SKIPPED,skipReason:M.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",messageKey:D,executionKey:E,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:c}),fe(h,{phase:U.SKIPPED,eventType:t,messageId:m?.messageId||d,messageKey:D,executionKey:E,skipReason:M.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,candidateToolIds:c}),Ft(r,{traceId:h?.traceId||"",eventType:t,messageId:m?.messageId||d,messageKey:D,skipReason:M.DUPLICATE_MESSAGE,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""}));return}let Y=r;if(Y.length===0){z("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177"),N("warn","\u5F53\u524D\u4E8B\u4EF6\u672A\u547D\u4E2D\u4EFB\u4F55\u53EF\u6267\u884C\u5DE5\u5177",{eventType:t,messageKey:D,candidateToolIds:c}),wt({triggerEvent:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:m?.messageId||"",messageKey:D,selectedToolIds:[],skipReason:M.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,lockedAiMessageId:m?.messageId||""}),Ee({stage:"skipped",eventType:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:m?.messageId||d,messageKey:D,reason:M.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,candidateToolIds:[],handledAt:Date.now()}),he(h,{phase:U.SKIPPED,skipReason:M.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",messageKey:D,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:[]}),fe(h,{phase:U.SKIPPED,eventType:t,messageId:m?.messageId||d,messageKey:D,skipReason:M.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,candidateToolIds:[]});return}T.lastHandledMessageKey=D,T.lastHandledExecutionKey=E,bd(E,{messageKey:D,messageId:m?.messageId||d,generationTraceId:m?.generationTraceId||"",eventType:t,sessionKey:h?.sessionKey||""}),T.lastDuplicateMessageKey="",T.lastDuplicateExecutionKey="",T.lastDuplicateMessageAt=0,m.messageKey=D,wt({triggerEvent:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:m?.messageId||"",messageKey:D,executionKey:E,selectedToolIds:Y.map(k=>k.id),skipReason:"",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,lockedAiMessageId:m?.messageId||""}),z(`\u9700\u8981\u6267\u884C ${Y.length} \u4E2A\u5DE5\u5177:`,Y.map(k=>k.id)),N("info","\u81EA\u52A8\u89E6\u53D1\u547D\u4E2D\u5DE5\u5177",{eventType:t,messageKey:D,executionKey:E,toolIds:Y.map(k=>k.id)}),Ze("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${Y.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"}),he(h,{messageKey:D,executionKey:E,candidateToolIds:Y.map(k=>k.id),executionPathIds:[],confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,phase:U.DISPATCHING}),fe(h,{phase:U.DISPATCHING,eventType:t,messageId:m?.messageId||d,messageKey:D,executionKey:E,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,candidateToolIds:Y.map(k=>k.id)}),Ft(Y,{traceId:h?.traceId||"",eventType:t,messageId:m?.messageId||d,messageKey:D,executionKey:E,skipReason:"",executionPath:Ht.AUTO_POST_RESPONSE_API,writebackStatus:"",failureStage:""});for(let k of Y)try{let G=await Jr(k,m),R=Wr(k,m);h.executionPathIds.includes(R)||h.executionPathIds.push(R),pd(k.id,{traceId:h?.traceId||"",eventType:t,messageId:m?.messageId||d,messageKey:D,executionKey:E,executionPath:R,writebackStatus:G?.result?.meta?.writebackStatus||G?.meta?.writebackStatus||ne.NOT_APPLICABLE,failureStage:G?.result?.meta?.failureStage||G?.meta?.failureStage||"",contentCommitted:!!(G?.result?.meta?.writebackDetails?.contentCommitted||G?.meta?.writebackDetails?.contentCommitted),hostCommitApplied:!!(G?.result?.meta?.writebackDetails?.hostCommitApplied||G?.meta?.writebackDetails?.hostCommitApplied),refreshRequested:!!(G?.result?.meta?.writebackDetails?.refreshRequested||G?.meta?.writebackDetails?.refreshRequested),refreshConfirmed:!!(G?.result?.meta?.writebackDetails?.refreshConfirmed||G?.meta?.writebackDetails?.refreshConfirmed),preferredCommitMethod:G?.result?.meta?.writebackDetails?.commit?.preferredMethod||G?.meta?.writebackDetails?.commit?.preferredMethod||"",appliedCommitMethod:G?.result?.meta?.writebackDetails?.commit?.appliedMethod||G?.meta?.writebackDetails?.commit?.appliedMethod||"",refreshMethodCount:(G?.result?.meta?.writebackDetails?.refresh?.requestMethods||G?.meta?.writebackDetails?.refresh?.requestMethods||[]).length,refreshConfirmChecks:G?.result?.meta?.writebackDetails?.refresh?.confirmChecks||G?.meta?.writebackDetails?.refresh?.confirmChecks||0,success:!!G?.success}),G.success?(z(`\u5DE5\u5177 ${k.id} \u6267\u884C\u6210\u529F`),$.emit(P.TOOL_EXECUTED,{toolId:k.id,result:G.result||G.data||G})):z(`\u5DE5\u5177 ${k.id} \u6267\u884C\u5931\u8D25:`,G.error)}catch(G){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${k.id}`,G)}T.lastExecutionContext=m,Ee({stage:"completed",eventType:t,traceId:h?.traceId||"",sessionKey:h?.sessionKey||"",messageId:m?.messageId||d,messageKey:D,executionKey:E,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,candidateToolIds:Y.map(k=>k.id),handledAt:Date.now()}),he(h,{phase:U.COMPLETED,messageKey:D,executionKey:E,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:Y.map(k=>k.id)}),fe(h,{phase:U.COMPLETED,eventType:t,messageId:m?.messageId||d,messageKey:D,executionKey:E,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||b,confirmationSource:m?.confirmationSource||s,candidateToolIds:Y.map(k=>k.id),executionPathIds:[...h.executionPathIds||[]]})}async function xd(t,e,s){return s||t.output?.mode===At.POST_RESPONSE_API?rs.runToolPostResponse(t,e):(await Zc()).executeToolWithConfig(t.id,e)}function qr(){if(T.initialized){z("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}vd(),T.initialized=!0,z("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),$.emit(P.TOOL_TRIGGER_INITIALIZED)}function vd(){let t=rt(I.GENERATION_ENDED,async n=>{let o=at(n,I.GENERATION_ENDED),i=x.gateState.lastGenerationTraceId||"",a=ds(I.GENERATION_ENDED,n,{eventType:I.GENERATION_ENDED,messageId:o});Ee({stage:"received",eventType:I.GENERATION_ENDED,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:o,receivedAt:Date.now()}),fe(a,{phase:U.RECEIVED,eventType:I.GENERATION_ENDED,messageId:o});let r=await Yo({traceId:i,retries:6,retryDelayMs:80}),c=Ir(r);if(!c.eligible){mt(I.GENERATION_ENDED,n,{messageId:o,reason:c.reason,skipReasonDetailed:c.detail,confirmationSource:"none"});return}let l=await Dn(o,{retries:o?3:8,retryDelayMs:o?120:260,allowSameSlotRevision:!0,requireObservedSameSlotRevision:!1}),d=F(l?.sourceId);if(!d){mt(I.GENERATION_ENDED,n,{messageId:o,reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"missing_new_assistant_message_after_generation",confirmationSource:"none",eventBelongsToCurrentGeneration:!!r,historicalReplayBlocked:!1,historicalReplayReason:""});return}await Vr(I.GENERATION_ENDED,{...typeof n=="object"&&n?n:{},messageId:d,confirmedAssistantMessageId:d,confirmationSource:"generation_ended",confirmationMode:l?.confirmationMode||"",sameSlotRevisionCandidate:!!l?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!l?.sameSlotRevisionConfirmed,sameSlotRevisionSource:l?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})}),e=rt(I.GENERATION_AFTER_COMMANDS,async n=>{let o=at(n,I.GENERATION_AFTER_COMMANDS),i=x.gateState.lastGenerationTraceId||"",{debounceMs:a}=_e(),r=ds(I.GENERATION_AFTER_COMMANDS,n,{eventType:I.GENERATION_AFTER_COMMANDS,messageId:o});if(Ee({stage:"received",eventType:I.GENERATION_AFTER_COMMANDS,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:o,receivedAt:Date.now(),scheduledDelayMs:a}),fe(r,{phase:U.RECEIVED,eventType:I.GENERATION_AFTER_COMMANDS,messageId:o}),!_e().useGenerationAfterCommandsFallback){he(r,{phase:U.IGNORED,skipReason:"generation_after_commands_fallback_disabled",completedAt:Date.now()}),fe(r,{phase:U.IGNORED,eventType:I.GENERATION_AFTER_COMMANDS,messageId:o,skipReason:"generation_after_commands_fallback_disabled"});return}let c=await Yo({traceId:i,retries:6,retryDelayMs:80}),l=Ir(c);if(!o){mt(I.GENERATION_AFTER_COMMANDS,n,{reason:M.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:l.eligible?"generation_after_commands_without_message_identity":l.detail,confirmationSource:"none"});return}if(!l.eligible){mt(I.GENERATION_AFTER_COMMANDS,n,{messageId:o,reason:l.reason,skipReasonDetailed:l.detail,confirmationSource:"none"});return}let d=await Dn(o,{retries:2,retryDelayMs:120,allowSameSlotRevision:!0,requireObservedSameSlotRevision:!0}),u=F(d?.sourceId);if(!u){mt(I.GENERATION_AFTER_COMMANDS,n,{messageId:o,reason:M.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:"generation_after_commands_message_not_confirmed",confirmationSource:"none",eventBelongsToCurrentGeneration:!!c,historicalReplayBlocked:!1,historicalReplayReason:""});return}Dr(I.GENERATION_AFTER_COMMANDS,n,a,{messageId:o,confirmedAssistantMessageId:u,confirmationSource:"generation_after_commands",confirmationMode:d?.confirmationMode||"",sameSlotRevisionCandidate:!!d?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!d?.sameSlotRevisionConfirmed,sameSlotRevisionSource:d?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})}),s=rt(I.MESSAGE_RECEIVED,async n=>{let o=at(n,I.MESSAGE_RECEIVED),i=o?await Lc(o,{retries:3,retryDelayMs:120}):null,a=i?.message||null,r=a?Bn(a):"",c=i?F(On(a,i.index)):"",l=o||c,{debounceMs:d}=_e(),u=ds(I.MESSAGE_RECEIVED,n,{eventType:I.MESSAGE_RECEIVED,messageId:l,messageRole:r});if(!o){N("info","MESSAGE_RECEIVED \u7F3A\u5C11\u6D88\u606F\u8EAB\u4EFD\uFF0C\u5224\u5B9A\u4E3A\u5BBF\u4E3B UI \u5E72\u6270\u4E8B\u4EF6\uFF0C\u8DF3\u8FC7",{rawEventData:n??null}),Ee({stage:"ignored_ui_side_effect",eventType:I.MESSAGE_RECEIVED,traceId:u?.traceId||"",sessionKey:u?.sessionKey||"",messageId:"",messageRole:r,reason:M.UNRELATED_UI_EVENT,handledAt:Date.now()}),he(u,{phase:U.IGNORED,skipReason:M.UNRELATED_UI_EVENT,completedAt:Date.now(),messageRole:r}),fe(u,{phase:U.IGNORED,eventType:I.MESSAGE_RECEIVED,messageId:"",messageRole:r,skipReason:M.UNRELATED_UI_EVENT});return}if(Ee({stage:"received",eventType:I.MESSAGE_RECEIVED,traceId:u?.traceId||"",sessionKey:u?.sessionKey||"",messageId:l,messageRole:r,receivedAt:Date.now(),scheduledDelayMs:d}),fe(u,{phase:U.RECEIVED,eventType:I.MESSAGE_RECEIVED,messageId:l,messageRole:r}),!_e().useMessageReceivedFallback){he(u,{phase:U.IGNORED,skipReason:"message_received_fallback_disabled",completedAt:Date.now(),messageRole:r}),fe(u,{phase:U.IGNORED,eventType:I.MESSAGE_RECEIVED,messageId:l,messageRole:r,skipReason:"message_received_fallback_disabled"});return}if(!i){mt(I.MESSAGE_RECEIVED,n,{messageId:o,reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_identity_not_resolved",confirmationSource:"none"});return}if(a&&r!=="assistant"){N("info","MESSAGE_RECEIVED \u547D\u4E2D\u975E AI \u6D88\u606F\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1\u8C03\u5EA6",{messageId:l,messageRole:r}),Ee({stage:"ignored_non_assistant",eventType:I.MESSAGE_RECEIVED,traceId:u?.traceId||"",sessionKey:u?.sessionKey||"",messageId:l,messageRole:r,reason:M.NON_ASSISTANT_MESSAGE,handledAt:Date.now()}),he(u,{phase:U.IGNORED,skipReason:M.NON_ASSISTANT_MESSAGE,completedAt:Date.now(),messageRole:r}),fe(u,{phase:U.IGNORED,eventType:I.MESSAGE_RECEIVED,messageId:l,messageRole:r,skipReason:M.NON_ASSISTANT_MESSAGE});return}let p=await qc(i,{traceId:x.gateState.lastGenerationTraceId||""});if(!p.allowed){mt(I.MESSAGE_RECEIVED,n,{messageId:l,reason:p.reason,skipReasonDetailed:p.detail,confirmationSource:"none",confirmationMode:p.confirmationMode||"",sameSlotRevisionCandidate:!!p.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!p.sameSlotRevisionConfirmed,sameSlotRevisionSource:p.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:p.eventBelongsToCurrentGeneration,historicalReplayBlocked:p.historicalReplayBlocked,historicalReplayReason:p.historicalReplayReason});return}let y=await Dn(l,{retries:3,retryDelayMs:120,allowSameSlotRevision:!0,requireObservedSameSlotRevision:!0}),b=F(y?.sourceId);if(!b){mt(I.MESSAGE_RECEIVED,n,{messageId:l,reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_not_confirmed_as_new_assistant",confirmationSource:"none",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""});return}Dr(I.MESSAGE_RECEIVED,n,d,{messageId:l,confirmedAssistantMessageId:b,confirmationSource:"message_received",confirmationMode:y?.confirmationMode||p.confirmationMode||"",sameSlotRevisionCandidate:!!(y?.sameSlotRevisionCandidate??p.sameSlotRevisionCandidate),sameSlotRevisionConfirmed:!!(y?.sameSlotRevisionConfirmed??p.sameSlotRevisionConfirmed),sameSlotRevisionSource:y?.sameSlotRevisionSource||p.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})});T.listeners.set(I.GENERATION_ENDED,t),T.listeners.set(I.GENERATION_AFTER_COMMANDS,e),T.listeners.set(I.MESSAGE_RECEIVED,s)}async function ri(t){let e=await ni(),s=lt(),n=s?.getContext?.()||null,o=t?.triggerEvent||"GENERATION_ENDED",i=F(t?.confirmedAssistantMessageId||at(t,o)),a=String(t?.confirmationSource||"").trim(),r=o==="MANUAL"||o==="MANUAL_PREVIEW",c=null,l=F(i);r||(c=await Dn(l,{retries:l?3:8,retryDelayMs:l?120:260,allowSameSlotRevision:!0,requireObservedSameSlotRevision:!1}),c&&(l=F(c.sourceId)));let d=Uc(o,t,l)||!!l,u=await Ic({preferredMessageId:l||null,retries:r||l?2:0,retryDelayMs:120,lockToMessageId:d}),p=u.messages||[],y=u.lastUserMessage,b=u.lastAiMessage;r||(c?F(b?.sourceId)!==l&&(b=c):b=null);let h=l||F(b?.sourceId)||"",m=x.gateState.lastGenerationTraceId||"",E=us(b?.content||"");return{triggeredAt:Date.now(),triggerEvent:o,traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",confirmationSource:a,confirmedAssistantMessageId:h,chatId:Ds(s,n,e),messageId:h,generationTraceId:m,confirmationMode:String(t?.confirmationMode||c?.confirmationMode||"").trim(),sameSlotRevisionCandidate:!!(t?.sameSlotRevisionCandidate??c?.sameSlotRevisionCandidate),sameSlotRevisionConfirmed:!!(t?.sameSlotRevisionConfirmed??c?.sameSlotRevisionConfirmed),sameSlotRevisionSource:String(t?.sameSlotRevisionSource||c?.sameSlotRevisionSource||"").trim(),rawGenerationType:x.gateState.lastGenerationBaseline?.rawGenerationType||x.gateState.lastGenerationType||"",rawGenerationParams:x.gateState.lastGenerationBaseline?.rawGenerationParams??x.gateState.lastGenerationParams??null,normalizedGenerationType:x.gateState.lastGenerationBaseline?.normalizedGenerationType||x.gateState.lastNormalizedGenerationType||"",generationAction:x.gateState.lastGenerationBaseline?.generationAction||x.gateState.lastGenerationAction||"",generationActionSource:x.gateState.lastGenerationBaseline?.generationActionSource||x.gateState.lastGenerationActionSource||"",lastAiMessage:b?.content||"",assistantContentFingerprint:E,userMessage:y?.content||x.gateState.lastUserMessageText||"",chatMessages:p,input:{userMessage:y?.content||x.gateState.lastUserMessageText||"",lastAiMessage:b?.content||"",extractedContent:"",previousToolOutput:"",context:{character:e?.name||"",chatLength:p.length||0}},config:{},status:"pending",executionKey:zr({chatId:Ds(s,n,e),messageId:h,generationTraceId:m,assistantContentFingerprint:E,lastAiMessage:b?.content||""})}}function Sd(t){return ns().filter(s=>{let n=s?.trigger?.enabled&&s?.trigger?.event===t,o=Array.isArray(s?.triggerEvents)&&s.triggerEvents.includes(t);return(n||o)&&rs.shouldRunPostResponse(s)})}function kn(t,e){try{Go(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function Jr(t,e){let s=Date.now(),n=t.id,o=e?.triggerEvent==="MANUAL",i=`yyt-tool-run-${n}`,a=Wr(t,e),r=e?.messageKey||Pn(e||{}),c=e?.executionKey||"";kn(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:"",lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0}),$.emit(P.TOOL_EXECUTION_REQUESTED,{toolId:n,traceId:e?.traceId||"",triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),Ze("info",`${o?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:i}),N("info","\u5F00\u59CB\u6267\u884C\u5DE5\u5177",{toolId:n,toolName:t.name,triggerEvent:e?.triggerEvent,executionPath:a,messageKey:r});try{let l=await xd(t,e,o),d=Date.now()-s;if(l?.success){let b=de(n),h=l?.meta?.writebackDetails||{};kn(n,{lastStatus:"success",lastError:"",lastDurationMs:d,lastTraceId:e?.traceId||"",successCount:(b?.runtime?.successCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||"",lastContentCommitted:!!h.contentCommitted,lastHostCommitApplied:!!h.hostCommitApplied,lastRefreshRequested:!!h.refreshRequested,lastRefreshConfirmed:!!h.refreshConfirmed,lastPreferredCommitMethod:h?.commit?.preferredMethod||"",lastAppliedCommitMethod:h?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(h?.refresh?.requestMethods)?h.refresh.requestMethods.length:0,lastRefreshConfirmChecks:Number(h?.refresh?.confirmChecks)||0});let m=o?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return S("success",m),Ze("success",m,{duration:3200,noticeId:i}),N("info","\u5DE5\u5177\u6267\u884C\u6210\u529F",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:d,writebackStatus:l?.meta?.writebackStatus||ne.NOT_APPLICABLE}),{success:!0,duration:d,result:l}}let u=de(n),p=l?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",y=l?.meta?.writebackDetails||{};return kn(n,{lastStatus:"error",lastError:p,lastDurationMs:d,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||(a===Ht.MANUAL_COMPATIBILITY?We.COMPATIBILITY_EXECUTE:We.UNKNOWN),lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0}),S("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`),Ze("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`,{sticky:!0,noticeId:i}),N("error","\u5DE5\u5177\u6267\u884C\u5931\u8D25",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:d,error:p,failureStage:l?.meta?.failureStage||""}),{success:!1,duration:d,error:p,result:l}}catch(l){let d=Date.now()-s,u=de(n),p=l?.message||String(l);throw kn(n,{lastStatus:"error",lastError:p,lastDurationMs:d,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:a===Ht.MANUAL_COMPATIBILITY?We.COMPATIBILITY_EXECUTE:We.UNKNOWN,lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0}),S("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`),Ze("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`,{sticky:!0,noticeId:i}),N("error","\u5DE5\u5177\u6267\u884C\u629B\u51FA\u5F02\u5E38",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:d,error:p}),l}}async function ai(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=de(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return ss(t,{lastTriggerAt:Date.now(),lastTriggerEvent:"MANUAL",lastMessageKey:"",lastExecutionKey:"",lastSkipReason:M.TOOL_DISABLED,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0},{touchLastRunAt:!1,emitEvent:!1}),Ze("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await ri({triggerEvent:"MANUAL"});return N("info","\u624B\u52A8\u6267\u884C\u5DE5\u5177",{toolId:t}),Jr(e,s)}async function li(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=de(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await ri({triggerEvent:"MANUAL_PREVIEW"});return rs.previewExtraction(e,s)}function Td(){for(let t of T.pendingMessageTimers.values())clearTimeout(t);T.pendingMessageTimers.clear();for(let t of T.listeners.values())typeof t=="function"&&t();T.listeners.clear(),T.messageSessions.clear(),T.handledExecutionKeys.clear(),T.recentSessionHistory=[],T.recentEventTimeline=[],T.initialized=!1,T.lastExecutionContext=null,T.lastHandledMessageKey="",T.lastHandledExecutionKey="",T.lastAutoTriggerSnapshot=null,T.lastEventDebugSnapshot=null,T.lastDuplicateMessageKey="",T.lastDuplicateExecutionKey="",T.lastDuplicateMessageAt=0,z("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function Ed(){let t=Yr(8),e=Array.from(T.messageSessions.values()).map(cs).filter(Boolean).sort((o,i)=>(Number(o?.updatedAt)||0)-(Number(i?.updatedAt)||0)),s=[...T.recentSessionHistory].map(cs).filter(Boolean),n=[...T.recentEventTimeline].map(jr).filter(Boolean);return{initialized:T.initialized,listenersCount:T.listeners.size,activeSessionCount:T.messageSessions.size,activeSessions:e,recentSessionHistory:s,recentEventTimeline:n,lastExecutionContext:T.lastExecutionContext,lastAutoTriggerSnapshot:T.lastAutoTriggerSnapshot,lastEventDebugSnapshot:T.lastEventDebugSnapshot,registeredEvents:Array.from(T.listeners.keys()),pendingTimerCount:T.pendingMessageTimers.size,lastHandledMessageKey:T.lastHandledMessageKey,lastHandledExecutionKey:T.lastHandledExecutionKey,lastDuplicateExecutionKey:T.lastDuplicateExecutionKey,handledExecutionKeyCount:T.handledExecutionKeys.size,recentHandledExecutionKeys:t,listenerSettings:_e(),eventBridge:Kr(),gateState:Hr()}}function Os(t={}){let e=parseInt(t?.historyLimit,10),s=Number.isFinite(e)?Math.max(1,Math.min(50,e)):8,n=Yr(s),o=x.gateState.lastGenerationBaseline,i=Array.from(T.messageSessions.values()).map(cs).filter(Boolean).sort((u,p)=>(Number(u?.updatedAt)||0)-(Number(p?.updatedAt)||0)),a=Ps([...T.recentSessionHistory],s).map(cs),r=Ps([...T.recentEventTimeline],Math.max(s*3,s)).map(jr),c={activeSessions:Mr(i),recentSessionHistory:Mr(a)},l={activeSessions:kr(i),recentSessionHistory:kr(a)},d=fd({summary:{listenerSettings:_e()},activeSessions:i,recentSessionHistory:a,lastEventDebugSnapshot:T.lastEventDebugSnapshot,lastAutoTriggerSnapshot:T.lastAutoTriggerSnapshot});return{summary:{generationTraceId:x.gateState.lastGenerationTraceId||"",generationType:x.gateState.lastGenerationType||"",generationDryRun:!!x.gateState.lastGenerationDryRun,generationStartedAt:o?.startedAt||0,generationEndedAt:x.gateState.lastGenerationAt||0,isGenerating:!!x.gateState.isGenerating,baselineMessageCount:o?.messageCount||0,baselineAssistantId:o?.lastAssistantMessageId||"",uiTransitionGuardActive:ei(),uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:x.gateState.lastUiTransitionSource||"",activeSessionCount:T.messageSessions.size,pendingTimerCount:T.pendingMessageTimers.size,lastHandledMessageKey:T.lastHandledMessageKey||"",lastHandledExecutionKey:T.lastHandledExecutionKey||"",lastDuplicateMessageKey:T.lastDuplicateMessageKey||"",lastDuplicateExecutionKey:T.lastDuplicateExecutionKey||"",handledExecutionKeyCount:T.handledExecutionKeys.size,recentHandledExecutionKeys:n,registeredEvents:Array.from(T.listeners.keys()),listenerSettings:_e(),eventBridge:Kr(),gateState:Hr(),phaseCounts:c,consistency:l,verdictHints:d,...Rt()},activeSessions:i,recentSessionHistory:a,recentEventTimeline:r,recentHandledExecutionKeys:n,verdictHints:d,lastEventDebugSnapshot:cs(T.lastEventDebugSnapshot),lastAutoTriggerSnapshot:cs(T.lastAutoTriggerSnapshot)}}function zn(t={}){let e=Os(t);return JSON.parse(JSON.stringify({exportedAt:Date.now(),schemaVersion:"auto-trigger-diagnostics.v1",...e}))}function _d(t={}){return Os(t)}function Ad(t={}){return zn(t)}async function qo(){if(x.isInitialized){z("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316"),N("info","\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316\uFF0C\u8DF3\u8FC7\u91CD\u590D\u521D\u59CB\u5316");return}let t=lt();if(!t){z("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),N("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!1,hasEventTypes:!1}),setTimeout(qo,1e3);return}let e=await Gc(),s=e?.eventSource||Ln(),n=e?.eventTypes||Un();if(!s){z("\u65E0\u6CD5\u83B7\u53D6SillyTavern\u4E8B\u4EF6\u6E90\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),N("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,importError:ce.importError?.message||""}),setTimeout(qo,1e3);return}N("info","\u5F00\u59CB\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,listenerSettings:_e()}),N("info","\u4F7F\u7528\u4E8B\u4EF6\u6E90",{source:e?.source||ce.source||"unknown"}),Cc(),rt(I.MESSAGE_SENT,async o=>{let a=(await si({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(r=>r.role==="user").pop();It({lastUserSendIntentAt:Date.now(),lastUserIntentSource:"message_sent",lastUserMessageId:o,lastUserMessageAt:Date.now(),lastUserMessageText:a?.content||x.gateState.lastUserMessageText||""}),z(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${o}`),N("info","\u8BB0\u5F55\u7528\u6237\u53D1\u9001\u610F\u56FE",{messageId:o,lastUserMessage:a?.content||""}),Kt({kind:"gate_event",eventType:I.MESSAGE_SENT,messageId:o,phase:"user_intent_recorded",detail:"message_sent"})}),rt(I.GENERATION_STARTED,async(o,i,a)=>{let r=Date.now(),c=ys("generation"),l=Lr(o,i||null),d=Bc(o,i||null,r),u=d.startedByUserIntent,p=d.userIntentDetectedAt,y=d.userIntentSource,b=d.userIntentDetail,h=Fc({traceId:c,startedAt:r,type:o,params:i||null,rawGenerationType:l.rawGenerationType,rawGenerationParams:l.rawGenerationParams,normalizedGenerationType:l.normalizedGenerationType,generationAction:l.generationAction,generationActionSource:l.generationActionSource,explicitGenerationAction:l.explicitGenerationAction,dryRun:!!a,startedByUserIntent:u,userIntentDetectedAt:p,userIntentSource:y,userIntentDetail:b,baselineResolved:!1,provisional:!0,baselineSource:"generation_started_sync_provisional"});It({lastGenerationTraceId:c,lastGenerationType:l.rawGenerationType||o,lastGenerationParams:i||null,lastNormalizedGenerationType:l.normalizedGenerationType||"",lastGenerationAction:l.generationAction||"",lastGenerationActionSource:l.generationActionSource||"",lastGenerationDryRun:!!a,isGenerating:!0,lastGenerationBaseline:h}),z(`\u751F\u6210\u5F00\u59CB: ${o}`),N("info","\u6536\u5230\u751F\u6210\u5F00\u59CB\u4E8B\u4EF6",{type:o,dryRun:!!a,params:i||null,generationAction:l.generationAction,generationActionSource:l.generationActionSource,traceId:c,startedByUserIntent:u,userIntentSource:y,userIntentDetail:b,baseline:h}),Kt({kind:"generation_event",eventType:I.GENERATION_STARTED,traceId:c,phase:"generation_started",detail:l.generationAction||Qo(o,i||null),generationTraceId:c,baselineResolved:!1,generationStartedByUserIntent:u,generationUserIntentSource:y}),zc({traceId:c,startedAt:r,type:o,params:i||null,rawGenerationType:l.rawGenerationType,rawGenerationParams:l.rawGenerationParams,normalizedGenerationType:l.normalizedGenerationType,generationAction:l.generationAction,generationActionSource:l.generationActionSource,explicitGenerationAction:l.explicitGenerationAction,dryRun:!!a,startedByUserIntent:u,userIntentDetectedAt:p,userIntentSource:y,userIntentDetail:b,baselineResolved:!0,provisional:!1,baselineResolutionAt:Date.now(),baselineSource:"generation_started_async_resolved"}).then(m=>{let E=x.gateState.lastGenerationBaseline;if(!E||E.traceId!==c){N("info","generation baseline \u5DF2\u8FC7\u671F\uFF0C\u653E\u5F03\u56DE\u586B",{traceId:c,currentTraceId:E?.traceId||""});return}It({lastGenerationBaseline:m}),N("info","generation baseline \u5DF2\u5B8C\u6210\u89E3\u6790",{traceId:c,baseline:m}),Kt({kind:"generation_baseline",eventType:I.GENERATION_STARTED,traceId:c,phase:"baseline_resolved",detail:m?.baselineSource||"generation_started_async_resolved",generationTraceId:c,baselineResolved:!0,generationStartedByUserIntent:m?.startedByUserIntent,generationUserIntentSource:m?.userIntentSource||""})}).catch(m=>{let E=x.gateState.lastGenerationBaseline;if(!E||E.traceId!==c)return;let J={...E,baselineResolved:!0,baselineResolutionAt:Date.now(),provisional:!1,baselineSource:"generation_started_async_failed_fallback"};It({lastGenerationBaseline:J}),N("warn","generation baseline \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u56DE\u9000\u5230 provisional baseline",{traceId:c,error:m?.message||String(m),baseline:J}),Kt({kind:"generation_baseline",eventType:I.GENERATION_STARTED,traceId:c,phase:"baseline_fallback",reason:"generation_baseline_async_failed",detail:m?.message||String(m),generationTraceId:c,baselineResolved:!0,generationStartedByUserIntent:J?.startedByUserIntent,generationUserIntentSource:J?.userIntentSource||""})})}),rt(I.GENERATION_ENDED,()=>{It({lastGenerationAt:Date.now(),isGenerating:!1}),z("\u751F\u6210\u7ED3\u675F"),N("info","\u6536\u5230\u751F\u6210\u7ED3\u675F\u4E8B\u4EF6"),Kt({kind:"generation_event",eventType:I.GENERATION_ENDED,traceId:x.gateState.lastGenerationTraceId||"",phase:"generation_ended",generationTraceId:x.gateState.lastGenerationTraceId||"",detail:x.gateState.lastGenerationAction||x.gateState.lastNormalizedGenerationType||""})}),rt(I.CHAT_CHANGED,o=>{Rr(I.CHAT_CHANGED),Cr("chat_changed"),N("info","\u6536\u5230\u804A\u5929\u5207\u6362\u4E8B\u4EF6",{data:o??null}),Kt({kind:"ui_guard",eventType:I.CHAT_CHANGED,phase:"ui_transition_guard_entered",detail:"chat_changed"})}),rt(I.CHAT_CREATED,o=>{Rr(I.CHAT_CREATED),Cr("chat_created"),N("info","\u6536\u5230\u804A\u5929\u521B\u5EFA\u4E8B\u4EF6",{data:o??null}),Kt({kind:"ui_guard",eventType:I.CHAT_CREATED,phase:"ui_transition_guard_entered",detail:"chat_created"})}),qr(),x.isInitialized=!0,z("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210"),N("info","\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210",{listenerSettings:_e()})}function wd(t){x.debugMode=t}var I,x,vc,ce,M,Ht,U,Pr,Sc,Ar,Tc,Ec,wr,_c,Ac,Rn,T,ci=q(()=>{we();Cs();os();Ho();et();I={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},x={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastNormalizedGenerationType:"",lastGenerationAction:"",lastGenerationActionSource:"",lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""},isInitialized:!1,debugMode:!1},vc="/script.js",ce={eventSource:null,eventTypes:null,source:"",scriptModule:null,loadingPromise:null,importError:null},M={LISTENER_DISABLED:"listener_disabled",QUIET_GENERATION:"quiet_generation",DRY_RUN_GENERATION:"dry_run_generation",IGNORED_AUTO_TRIGGER:"ignored_auto_trigger",UNRELATED_UI_EVENT:"ui_side_effect_event",SPECULATIVE_FALLBACK_WITHOUT_MESSAGE:"speculative_generation_after_commands",NO_CONFIRMED_ASSISTANT_MESSAGE:"no_confirmed_assistant_message",HISTORICAL_REPLAY_MESSAGE_RECEIVED:"historical_replay_message_received",MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION:"message_received_outside_active_generation",NON_ASSISTANT_MESSAGE:"non_assistant_message",MISSING_AI_MESSAGE:"missing_ai_message",DUPLICATE_MESSAGE:"duplicate_message",NO_ELIGIBLE_TOOLS:"no_eligible_tools",TOOL_DISABLED:"tool_disabled"},Ht={AUTO_POST_RESPONSE_API:"auto_post_response_api",MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"},U={RECEIVED:"received",SCHEDULED:"scheduled",DISPATCHING:"dispatching",HANDLING:"handling",COMPLETED:"completed",SKIPPED:"skipped",IGNORED:"ignored"},Pr=15e3,Sc=1500,Ar=1800,Tc=5e3,Ec=6e4,wr=new Set(["reroll","regenerate","swipe"]),_c=new Set(["reroll","regenerate","swipe"]),Ac=["type","action","name","mode","source","reason","kind","command","operation","event","trigger","generationType","generation_type","regenType","regen_type"],Rn=null;T={initialized:!1,listeners:new Map,messageSessions:new Map,handledExecutionKeys:new Map,recentSessionHistory:[],recentEventTimeline:[],lastExecutionContext:null,lastHandledMessageKey:"",lastHandledExecutionKey:"",pendingMessageTimers:new Map,lastAutoTriggerSnapshot:null,lastEventDebugSnapshot:null,lastDuplicateMessageKey:"",lastDuplicateExecutionKey:"",lastDuplicateMessageAt:0}});var Zr={};ge(Zr,{TOOL_CONFIG_PANEL_STYLES:()=>Qr,createToolConfigPanel:()=>Ct,default:()=>Id});function Ct(t){let{id:e,toolId:s,postResponseHint:n,extractionPlaceholder:o,previewDialogId:i,previewTitle:a="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let r=de(this.toolId);if(!r)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let c=this._getApiPresets(),l=r.output?.apiPreset||r.apiPreset||"",d=this._getBypassPresets(),u=r.output?.mode||"follow_ai",p=r.bypass?.enabled||!1,y=r.bypass?.presetId||"",b=r.runtime?.lastStatus||"idle",h=r.runtime?.lastRunAt?new Date(r.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",m=r.runtime?.lastError||"",E=r.extraction||{},J=Array.isArray(E.selectors)?E.selectors.join(`
`):"",D=u==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",Y=Os({historyLimit:8}),k=this._buildDiagnosticsHtml(r.runtime||{},Y),G=u==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",R=l||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${_(r.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${_(r.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${_(G)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${_(R)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${_(b)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${f}-tool-save-top">
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
              <select class="yyt-select" id="${f}-tool-output-mode">
                <option value="follow_ai" ${u==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${u==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${D}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${f}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${c.map(O=>`
                  <option value="${_(O.name)}" ${O.name===l?"selected":""}>
                    ${_(O.name)}
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
                <input type="checkbox" id="${f}-tool-bypass-enabled" ${p?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${p?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${f}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${d.map(O=>`
                  <option value="${_(O.id)}" ${O.id===y?"selected":""}>
                    ${_(O.name)}${O.isDefault?" [\u9ED8\u8BA4]":""}
                  </option>
                `).join("")}
              </select>
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
                <input type="number" class="yyt-input" id="${f}-tool-max-messages" min="1" max="50" value="${Number(E.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${f}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${_(o)}">${_(J)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${f}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${f}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${_(r.promptTemplate||"")}</textarea>
              <div class="yyt-tool-compact-hint">\u8FD9\u91CC\u76F4\u63A5\u586B\u5199\u53D1\u9001\u7ED9\u989D\u5916\u89E3\u6790\u6A21\u578B\u7684\u5B8C\u6574\u6A21\u677F\uFF1B\u53EF\u5728\u6B63\u6587\u4E2D\u663E\u5F0F\u4F7F\u7528 <code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{userMessage}}</code> \u7B49\u5B8F\u3002</div>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${_(b)}">${_(b)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${_(h)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${r.runtime?.successCount||0} / ${r.runtime?.errorCount||0}</span>
                </div>
                ${m?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${_(m)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${f}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${f}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${f}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86\u7834\u9650\u8BCD\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>

          ${k}
        </div>
      `},_formatDiagnosticValue(r,c="\u672A\u8BB0\u5F55"){let l=String(r||"").trim();return _(l||c)},_formatDiagnosticTime(r){let c=Number(r)||0;return c>0?new Date(c).toLocaleString():"\u672A\u8BB0\u5F55"},_formatSkipReason(r){return{listener_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u81EA\u52A8\u76D1\u542C\u5DF2\u5173\u95ED",quiet_generation:"\u5DF2\u8DF3\u8FC7\uFF1Aquiet / dryRun \u751F\u6210",dry_run_generation:"\u5DF2\u8DF3\u8FC7\uFF1A\u5F53\u524D generation \u4E3A dryRun",ignored_auto_trigger:"\u5DF2\u8DF3\u8FC7\uFF1A\u76D1\u542C\u5668\u8BBE\u7F6E\u5FFD\u7565\u4E86\u975E\u7528\u6237\u610F\u56FE\u751F\u6210",ui_side_effect_event:"\u5DF2\u5FFD\u7565\uFF1A\u5BBF\u4E3B UI \u526F\u4F5C\u7528\u4E8B\u4EF6",speculative_generation_after_commands:"\u5DF2\u5FFD\u7565\uFF1A\u4EC5\u8BB0\u5F55 GENERATION_AFTER_COMMANDS \u89C2\u5BDF\u6001 session",no_confirmed_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u786E\u8BA4\u5230\u672C\u8F6E assistant \u65B0\u697C\u5C42\u6216\u540C\u697C\u5C42 revision",historical_replay_message_received:"\u5DF2\u62E6\u622A\uFF1A\u5386\u53F2 assistant \u6D88\u606F\u91CD\u653E\u4E8B\u4EF6",message_received_outside_active_generation:"\u5DF2\u62E6\u622A\uFF1AMESSAGE_RECEIVED \u4E0D\u5C5E\u4E8E\u5F53\u524D\u751F\u6210\u7A97\u53E3",non_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u7684\u5E76\u975E AI \u697C\u5C42",missing_ai_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D",duplicate_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD",no_eligible_tools:"\u5DF2\u8DF3\u8FC7\uFF1A\u6CA1\u6709\u547D\u4E2D\u53EF\u6267\u884C\u5DE5\u5177",tool_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u5DE5\u5177\u672A\u542F\u7528",generation_after_commands_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AGENERATION_AFTER_COMMANDS \u515C\u5E95\u5DF2\u5173\u95ED",message_received_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AMESSAGE_RECEIVED \u515C\u5E95\u5DF2\u5173\u95ED"}[r]||r||"\u65E0"},_formatExecutionPath(r){return{auto_post_response_api:"\u81EA\u52A8\u94FE\uFF1Apost_response_api",manual_post_response_api:"\u624B\u52A8\u94FE\uFF1Apost_response_api",manual_compatibility:"\u624B\u52A8\u94FE\uFF1Acompatibility \u56DE\u9000"}[r]||r||"\u672A\u8BB0\u5F55"},_formatCommitMethod(r){return{setChatMessages:"setChatMessages",setChatMessage:"setChatMessage",local_only:"local_only",none:"none"}[r]||r||"\u672A\u8BB0\u5F55"},_formatWritebackStatus(r){return{success:"\u5199\u56DE\u6210\u529F",failed:"\u5199\u56DE\u5931\u8D25",skipped_empty_output:"\u65E0\u8F93\u51FA\uFF0C\u8DF3\u8FC7\u5199\u56DE",not_applicable:"\u4E0D\u9002\u7528"}[r]||r||"\u672A\u8BB0\u5F55"},_formatFailureStage(r){return{build_messages:"\u6784\u9020\u8BF7\u6C42\u6D88\u606F",send_api_request:"\u53D1\u9001 API \u8BF7\u6C42",extract_output:"\u63D0\u53D6\u5DE5\u5177\u8F93\u51FA",inject_context:"\u5199\u56DE\u4E0A\u4E0B\u6587",compatibility_execute:"\u517C\u5BB9\u6267\u884C\u5165\u53E3",unknown:"\u672A\u77E5\u9636\u6BB5"}[r]||r||"\u65E0"},_formatBooleanState(r){return r?"\u662F":"\u5426"},_formatHandledExecutionKeysText(r=[]){let c=Array.isArray(r)?r.filter(Boolean):[];return c.length?c.slice(-3).map(l=>String(l?.executionKey||"").trim()||"\u672A\u8BB0\u5F55").join(" / "):"\u65E0"},_formatHistoryTime(r){return this._formatDiagnosticTime(r)},_formatPhaseCountsText(r={}){let c=Object.entries(r||{}).filter(([,l])=>Number(l)>0);return c.length?c.map(([l,d])=>`${l}:${d}`).join(" / "):"\u65E0"},_formatEventBridgeText(r={}){if(!r||r.ready!==!0)return"\u672A\u5C31\u7EEA";let c=String(r.source||"").trim();return c?`\u5DF2\u5C31\u7EEA\uFF08${c}\uFF09`:"\u5DF2\u5C31\u7EEA"},_formatVerdictHintLabel(r=""){return{a10BaselineRaceSuspicious:"A10 baseline",a11ReplaySuspicious:"A11 replay",a12UserIntentSuspicious:"A12 user intent",a13AutoTriggerLeakSuspicious:"A13 auto trigger"}[r]||r||"\u672A\u77E5\u9879"},_buildVerdictHintsHtml(r={}){let c=Object.entries(r||{});return c.length?`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">N1 \u5FEB\u901F\u5224\u8BFB</div>
          <div class="yyt-tool-debug-chip-list">
            ${c.map(([l,d])=>{let u=!!d?.flagged,p=Array.isArray(d?.reasons)?d.reasons.filter(Boolean):[],y=p.length?_(p.join(" | ")):"\u672A\u89C1\u660E\u663E\u53EF\u7591\u4FE1\u53F7";return`
                <span class="yyt-tool-debug-chip ${u?"yyt-tool-debug-chip-warning":"yyt-tool-debug-chip-ok"}" title="${y}">
                  ${_(this._formatVerdictHintLabel(l))}
                  <strong>${u?"\u53EF\u7591":"\u6B63\u5E38"}</strong>
                </span>
              `}).join("")}
          </div>
        </div>
      `:""},_buildTimelineSection(r,c=[]){let l=Array.isArray(c)?c.filter(Boolean).slice().reverse():[];if(!l.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${_(r)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let d=l.map(u=>{let p=this._formatDiagnosticValue(u.eventType||u.kind,"\u672A\u8BB0\u5F55"),y=this._formatDiagnosticValue(u.traceId,"\u65E0"),b=this._formatDiagnosticValue(u.sessionKey,"\u65E0"),h=[u.phase?`\u9636\u6BB5\uFF1A${u.phase}`:"",u.messageId?`\u6D88\u606F\uFF1A${u.messageId}`:"",u.executionKey?`execution\uFF1A${u.executionKey}`:"",u.confirmationSource?`\u786E\u8BA4\uFF1A${u.confirmationSource}`:"",u.reason?`\u539F\u56E0\uFF1A${this._formatSkipReason(u.reason)}`:"",u.detail?`\u8BE6\u60C5\uFF1A${u.detail}`:""].filter(Boolean);return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${_(this._formatHistoryTime(u.at))}</span>
              <span>${p}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              trace\uFF1A${y}<br>
              session\uFF1A${b}<br>
              ${_(h.join(" / ")||"\u65E0\u9644\u52A0\u8BE6\u60C5")}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${_(r)}</div>
          <div class="yyt-tool-debug-history-list">${d}</div>
        </div>
      `},_copyText(r){let c=String(r||"");if(!c)return!1;try{if(navigator?.clipboard?.writeText)return navigator.clipboard.writeText(c),!0}catch{}try{let l=document.createElement("textarea");l.value=c,l.setAttribute("readonly","readonly"),l.style.position="fixed",l.style.opacity="0",document.body.appendChild(l),l.select();let d=document.execCommand("copy");return document.body.removeChild(l),d}catch{return!1}},_copyAutoTriggerDiagnostics(){try{let r=zn({historyLimit:8});this._copyText(JSON.stringify(r,null,2))?S("success","\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u5DF2\u590D\u5236"):S("warning","\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u5728\u63A7\u5236\u53F0\u5BFC\u51FA")}catch(r){S("error",r?.message||"\u5BFC\u51FA\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u5931\u8D25")}},_buildHistorySection(r,c=[],l="trigger"){let d=Array.isArray(c)?c.filter(Boolean).slice().reverse():[];if(!d.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${_(r)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let u=d.map(p=>{let y=this._formatDiagnosticValue(p.eventType,"\u672A\u8BB0\u5F55"),b=this._formatDiagnosticValue(p.messageKey||p.messageId,"\u672A\u8BB0\u5F55"),h=this._formatDiagnosticValue(p.traceId,"\u65E0"),m=this._formatDiagnosticValue(p.executionKey,"\u65E0"),E=l==="writeback"?`\u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(p.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(p.writebackStatus)} / \u5185\u5BB9\u63D0\u4EA4\uFF1A${this._formatBooleanState(p.contentCommitted)} / \u5BBF\u4E3B\u63D0\u4EA4\uFF1A${this._formatBooleanState(p.hostCommitApplied)} / \u4E3B\u63D0\u4EA4\uFF1A${this._formatCommitMethod(p.preferredCommitMethod)} / \u5B9E\u9645\u63D0\u4EA4\uFF1A${this._formatCommitMethod(p.appliedCommitMethod)} / \u5237\u65B0\u8BF7\u6C42\uFF1A${this._formatBooleanState(p.refreshRequested)} / \u5237\u65B0\u786E\u8BA4\uFF1A${this._formatBooleanState(p.refreshConfirmed)} / \u5237\u65B0\u901A\u9053\uFF1A${p.refreshMethodCount??0} / \u786E\u8BA4\u8F6E\u6570\uFF1A${p.refreshConfirmChecks??0} / \u5931\u8D25\u9636\u6BB5\uFF1A${this._formatFailureStage(p.failureStage)}`:`\u8DF3\u8FC7\u539F\u56E0\uFF1A${this._formatSkipReason(p.skipReason)} / \u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(p.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(p.writebackStatus)}`;return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${_(this._formatHistoryTime(p.at))}</span>
              <span>trace ${h}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              \u4E8B\u4EF6\uFF1A${y}<br>
              \u6D88\u606F\uFF1A${b}<br>
              execution\uFF1A${m}<br>
              ${_(E)}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${_(r)}</div>
          <div class="yyt-tool-debug-history-list">${u}</div>
        </div>
      `},_buildDiagnosticsHtml(r,c=null){let l=r||{},d=c||null,u=d?.summary||{},p=d?.lastEventDebugSnapshot||{},y=d?.lastAutoTriggerSnapshot||{},b=!!(Array.isArray(d?.activeSessions)&&d.activeSessions.length>0||Array.isArray(d?.recentSessionHistory)&&d.recentSessionHistory.length>0||Array.isArray(d?.recentEventTimeline)&&d.recentEventTimeline.length>0||u?.activeSessionCount||u?.pendingTimerCount||u?.lastHandledMessageKey||u?.lastHandledExecutionKey||u?.handledExecutionKeyCount||u?.eventBridge?.ready);if(!!!(l.lastTriggerAt||l.lastTriggerEvent||l.lastMessageKey||l.lastExecutionKey||l.lastSkipReason||l.lastExecutionPath||l.lastWritebackStatus||l.lastFailureStage||l.lastContentCommitted||l.lastHostCommitApplied||l.lastRefreshRequested||l.lastRefreshConfirmed||l.lastTraceId||Array.isArray(l.recentTriggerHistory)&&l.recentTriggerHistory.length>0||Array.isArray(l.recentWritebackHistory)&&l.recentWritebackHistory.length>0||b))return"";let m=[["\u6700\u8FD1\u89E6\u53D1\u65F6\u95F4",this._formatDiagnosticTime(l.lastTriggerAt)],["\u6700\u8FD1\u89E6\u53D1\u4E8B\u4EF6",this._formatDiagnosticValue(l.lastTriggerEvent)],["\u6700\u8FD1 Trace",this._formatDiagnosticValue(l.lastTraceId,"\u65E0")],["\u6700\u8FD1\u6D88\u606F\u952E",this._formatDiagnosticValue(l.lastMessageKey)],["\u6700\u8FD1 execution key",this._formatDiagnosticValue(l.lastExecutionKey)],["\u6700\u8FD1\u8DF3\u8FC7\u539F\u56E0",this._formatDiagnosticValue(this._formatSkipReason(l.lastSkipReason),"\u65E0")],["\u6700\u8FD1\u6267\u884C\u8DEF\u5F84",this._formatDiagnosticValue(this._formatExecutionPath(l.lastExecutionPath))],["\u6700\u8FD1\u5199\u56DE\u72B6\u6001",this._formatDiagnosticValue(this._formatWritebackStatus(l.lastWritebackStatus))],["\u6700\u8FD1\u5931\u8D25\u9636\u6BB5",this._formatDiagnosticValue(this._formatFailureStage(l.lastFailureStage),"\u65E0")],["\u6700\u8FD1\u5185\u5BB9\u63D0\u4EA4",this._formatDiagnosticValue(this._formatBooleanState(l.lastContentCommitted),"\u5426")],["\u6700\u8FD1\u5BBF\u4E3B\u63D0\u4EA4",this._formatDiagnosticValue(this._formatBooleanState(l.lastHostCommitApplied),"\u5426")],["\u6700\u8FD1\u4E3B\u63D0\u4EA4\u7B56\u7565",this._formatDiagnosticValue(this._formatCommitMethod(l.lastPreferredCommitMethod),"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5B9E\u9645\u63D0\u4EA4\u7B56\u7565",this._formatDiagnosticValue(this._formatCommitMethod(l.lastAppliedCommitMethod),"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5237\u65B0\u8BF7\u6C42",this._formatDiagnosticValue(this._formatBooleanState(l.lastRefreshRequested),"\u5426")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4",this._formatDiagnosticValue(this._formatBooleanState(l.lastRefreshConfirmed),"\u5426")],["\u6700\u8FD1\u5237\u65B0\u901A\u9053\u6570",this._formatDiagnosticValue(String(l.lastRefreshMethodCount??0),"0")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4\u8F6E\u6570",this._formatDiagnosticValue(String(l.lastRefreshConfirmChecks??0),"0")]],E=this._buildHistorySection("\u6700\u8FD1\u89E6\u53D1\u5386\u53F2",l.recentTriggerHistory||[],"trigger"),J=this._buildHistorySection("\u6700\u8FD1\u5199\u56DE\u5386\u53F2",l.recentWritebackHistory||[],"writeback"),D=b?[["\u5F53\u524D active / timers",`${u.activeSessionCount||0} / ${u.pendingTimerCount||0}`],["\u4E8B\u4EF6\u6865\u63A5",this._formatEventBridgeText(u.eventBridge)],["\u5F53\u524D generation \u52A8\u4F5C",this._formatDiagnosticValue(u.generationAction,"\u672A\u8BB0\u5F55")],["\u5F53\u524D\u539F\u59CB generation type",this._formatDiagnosticValue(u.rawGenerationType,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u786E\u8BA4\u6A21\u5F0F",this._formatDiagnosticValue(p.confirmationMode||y.confirmationMode,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u540C\u697C\u5C42 revision",this._formatDiagnosticValue(p.sameSlotRevisionConfirmed?`\u5DF2\u786E\u8BA4 (${p.sameSlotRevisionSource||"same_slot_revision"})`:p.sameSlotRevisionCandidate?`\u5019\u9009 (${p.sameSlotRevisionSource||"\u5F85\u786E\u8BA4"})`:"\u5426","\u5426")],["\u6700\u8FD1\u5904\u7406\u6D88\u606F\u952E",this._formatDiagnosticValue(u.lastHandledMessageKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5904\u7406 execution key",this._formatDiagnosticValue(u.lastHandledExecutionKey,"\u672A\u8BB0\u5F55")],["\u5DF2\u5904\u7406 execution key \u6570",this._formatDiagnosticValue(String(u.handledExecutionKeyCount??0),"0")],["\u6700\u8FD1 execution key \u8F68\u8FF9",this._formatDiagnosticValue(this._formatHandledExecutionKeysText(u.recentHandledExecutionKeys),"\u65E0")],["Active phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(u.phaseCounts?.activeSessions),"\u65E0")],["History phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(u.phaseCounts?.recentSessionHistory),"\u65E0")]]:[],Y=b?this._buildVerdictHintsHtml(d?.verdictHints||u?.verdictHints||{}):"",k=b?this._buildTimelineSection("\u6700\u8FD1\u81EA\u52A8\u89E6\u53D1\u65F6\u95F4\u7EBF",(d?.recentEventTimeline||[]).slice(-6)):"";return`
        <details class="yyt-tool-debug-panel">
          <summary class="yyt-tool-debug-summary">\u6700\u8FD1\u89E6\u53D1\u8BCA\u65AD</summary>
          <div class="yyt-tool-debug-content">
            ${m.map(([G,R])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${G}</span>
                <span class="yyt-tool-runtime-value">${R}</span>
              </div>
            `).join("")}
            ${D.map(([G,R])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${G}</span>
                <span class="yyt-tool-runtime-value">${R}</span>
              </div>
            `).join("")}
            <div class="yyt-tool-debug-actions">
              <button class="yyt-btn yyt-btn-secondary yyt-btn-small" id="${f}-tool-copy-auto-trigger-diagnostics">
                <i class="fa-solid fa-copy"></i> \u590D\u5236\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD JSON
              </button>
            </div>
            ${Y}
            ${E}
            ${J}
            ${k}
          </div>
        </details>
      `},_getApiPresets(){try{return Jt()||[]}catch{return[]}},_getBypassPresets(){try{return Uo()||[]}catch{return[]}},_getFormData(r){let c=de(this.toolId),l=r.find(`#${f}-tool-output-mode`).val()||"follow_ai",d=r.find(`#${f}-tool-bypass-enabled`).is(":checked"),u=l==="post_response_api",p=(r.find(`#${f}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(y=>y.trim()).filter(Boolean);return{enabled:c?.enabled!==!1,promptTemplate:r.find(`#${f}-tool-prompt-template`).val()||"",apiPreset:r.find(`#${f}-tool-api-preset`).val()||"",extractTags:p,trigger:{event:"GENERATION_ENDED",enabled:u},output:{mode:l,apiPreset:r.find(`#${f}-tool-api-preset`).val()||"",overwrite:!0,enabled:u},bypass:{enabled:d,presetId:d&&r.find(`#${f}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(r.find(`#${f}-tool-max-messages`).val(),10)||5),selectors:p}}},_showExtractionPreview(r,c){if(!Q())return;let d=`${f}-${i}`,u=Array.isArray(c.messageEntries)?c.messageEntries:[],p=u.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${u.map(y=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${y.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${_(y.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${_(y.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${_(y.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";r.append(Zn({id:d,title:a,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${_((c.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${c.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${_(c.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${_(c.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${_(c.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${p}
        `})),eo(r,d,{onSave:y=>y()}),r.find(`#${d}-save`).text("\u5173\u95ED"),r.find(`#${d}-cancel`).remove()},bindEvents(r){let c=Q();!c||!te(r)||(r.find(`#${f}-tool-output-mode`).on("change",()=>{let d=(r.find(`#${f}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";r.find(".yyt-tool-mode-hint").text(d)}),r.find(`#${f}-tool-bypass-enabled`).on("change",l=>{let d=c(l.currentTarget).is(":checked");r.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!d)}),r.find(`#${f}-tool-save, #${f}-tool-save-top`).on("click",()=>{this._saveConfig(r,{silent:!1})}),r.find(`#${f}-tool-reset-template`).on("click",()=>{let l=yn(this.toolId);l?.promptTemplate&&(r.find(`#${f}-tool-prompt-template`).val(l.promptTemplate),S("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),r.find(`#${f}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(r,{silent:!0}))try{let d=await ai(this.toolId);!d?.success&&d?.error&&Ze("warning",d.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(d){S("error",d?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(r)}}),r.find(`#${f}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(r,{silent:!0}))try{let d=await li(this.toolId);if(!d?.success){S("error",d?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(r,d)}catch(d){S("error",d?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),r.find(`#${f}-tool-copy-auto-trigger-diagnostics`).on("click",()=>{this._copyAutoTriggerDiagnostics()}))},_saveConfig(r,c={}){let l=this._getFormData(r),{silent:d=!1}=c,u=it(this.toolId,l);return u?d||S("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):S("error","\u4FDD\u5B58\u5931\u8D25"),u},destroy(r){!Q()||!te(r)||r.find("*").off()},getStyles(){return Qr},renderTo(r){r.html(this.render({})),this.bindEvents(r,{})}}}var Qr,Id,Ns=q(()=>{et();os();Xs();Is();ci();Qr=`
  .yyt-tool-panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-tool-panel-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: stretch;
    padding: 12px 14px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
  }

  .yyt-tool-panel-hero-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .yyt-tool-panel-hero-title {
    font-size: 18px;
    font-weight: 800;
    line-height: 1.15;
    color: var(--yyt-text);
  }

  .yyt-tool-panel-hero-desc {
    font-size: 12px;
    line-height: 1.55;
    color: var(--yyt-text-secondary);
  }

  .yyt-tool-panel-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
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
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.08);
    letter-spacing: 0.3px;
    color: var(--yyt-text-secondary);
    background: rgba(255, 255, 255, 0.04);
  }

  .yyt-tool-compact-hint {
    font-size: 12px;
    color: var(--yyt-text-muted);
    line-height: 1.6;
  }

  .yyt-hidden {
    display: none !important;
  }

  .yyt-code-textarea {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.5;
    tab-size: 2;
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
    resize: vertical;
    min-height: 180px;
  }

  .yyt-code-textarea-small {
    min-height: 96px;
  }

  .yyt-code-textarea:focus {
    border-color: var(--yyt-accent);
    box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
  }

  .yyt-title-actions {
    margin-left: auto;
  }

  .yyt-btn-small {
    padding: 4px 10px;
    font-size: 12px;
  }

  .yyt-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }

  .yyt-checkbox-label input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .yyt-tool-manual-area {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.8fr);
    gap: 12px;
    align-items: start;
  }

  .yyt-tool-runtime-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .yyt-tool-runtime-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    font-size: 12px;
  }

  .yyt-tool-runtime-label {
    color: var(--yyt-text-muted);
    flex-shrink: 0;
  }

  .yyt-tool-runtime-value {
    color: var(--yyt-text);
    text-align: right;
    word-break: break-word;
  }

  .yyt-tool-runtime-badge {
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .yyt-status-idle {
    color: var(--yyt-text-secondary);
    background: rgba(255, 255, 255, 0.06);
  }

  .yyt-status-running {
    color: var(--yyt-accent);
    background: rgba(123, 183, 255, 0.12);
  }

  .yyt-status-success {
    color: var(--yyt-success);
    background: rgba(74, 222, 128, 0.12);
  }

  .yyt-status-error {
    color: var(--yyt-error);
    background: rgba(255, 107, 107, 0.12);
  }

  .yyt-tool-runtime-error .yyt-tool-runtime-value {
    color: var(--yyt-error);
  }

  .yyt-tool-manual-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
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
`;Id=Ct});var Ve,di=q(()=>{Ns();Ve=Ct({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var qe,ui=q(()=>{Ns();qe=Ct({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var Je,pi=q(()=>{Ns();Je=Ct({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var Yt,yi=q(()=>{we();Is();et();Yt={id:"bypassPanel",render(t){let e=j.getPresetList(),s=j.getDefaultPresetId();return`
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
            ${e.map(n=>this._renderPresetItem(n,n.id===s)).join("")}
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
    `},_renderPresetItem(t,e){let s=ft&&ft[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${_(t.name)}</span>
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
      `;let e=j.getDefaultPresetId()===t.id,s=ft&&ft[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${_(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${_(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(t.messages||[]).map(n=>this._renderMessageItem(n)).join("")}
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${_(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=Q();!s||!te(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(s.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let n=e(s.currentTarget).data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=j.deletePreset(n);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),S("success","\u9884\u8BBE\u5DF2\u5220\u9664")):S("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let n=e(s.currentTarget).closest(".yyt-bypass-message"),o=n.data("messageId");n.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let o=await pt(n),i=j.importPresets(o);S(i.success?"success":"error",i.message),i.success&&this.renderTo(t)}catch(o){S("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=j.exportPresets();ut(s,`bypass_presets_${Date.now()}.json`),S("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){S("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let n=j.getPreset(s);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(n)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,n=j.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,s),S("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):S("error",n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),n=s.data("presetId");if(!n)return;let o=s.find(".yyt-bypass-name-input").val().trim(),i=s.find("#yyt-bypass-description").val().trim();if(!o){S("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let a=[];s.find(".yyt-bypass-message").each(function(){let c=e(this);a.push({id:c.data("messageId"),role:c.find(".yyt-bypass-role-select").val(),content:c.find(".yyt-bypass-message-content").val(),enabled:c.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let r=j.updatePreset(n,{name:o,description:i,messages:a});r.success?(S("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):S("error",r?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=j.deletePreset(n);o.success?(this.renderTo(t),S("success","\u9884\u8BBE\u5DF2\u5220\u9664")):S("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let o=`bypass_${Date.now()}`,i=j.duplicatePreset(n,o);i.success?(this.renderTo(t),this._selectPreset(t,e,o),S("success","\u9884\u8BBE\u5DF2\u590D\u5236")):S("error",i?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");n&&(j.setDefaultPresetId(n),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),S("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(n))},_refreshPresetList(t,e){let s=j.getPresetList(),n=j.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(o=>this._renderPresetItem(o,o.id===n)).join(""))},destroy(t){!Q()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var sa={};ge(sa,{SettingsPanel:()=>ht,THEME_CONFIGS:()=>gi,applyTheme:()=>ta,applyUiPreferences:()=>fi,default:()=>Cd});function Ls(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function ea(t=Ls()){return t?.documentElement||document.documentElement}function ta(t,e=Ls()){let s=ea(e),n={...Rd,...gi[t]||gi["dark-blue"]};Object.entries(n).forEach(([o,i])=>{s.style.setProperty(o,i)}),s.setAttribute("data-yyt-theme",t)}function fi(t={},e=Ls()){let s=ea(e),{theme:n="dark-blue",compactMode:o=!1,animationEnabled:i=!0}=t||{};ta(n,e),s.classList.toggle("yyt-compact-mode",!!o),s.classList.toggle("yyt-no-animation",!i)}var Rd,gi,ht,Cd,Fn=q(()=>{we();Cs();et();Rd={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},gi={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};ht={id:"settingsPanel",render(t){let e=Ne.getSettings(),s=e.listener?.listenGenerationEnded!==!1,n=e.debug?.enableDebugLog===!0;return`
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">\u5168\u5C40\u504F\u597D\u4E0E\u8FD0\u884C\u7B56\u7565</div>
            <div class="yyt-settings-hero-desc">\u7EDF\u4E00\u7BA1\u7406\u6267\u884C\u5668\u3001\u76D1\u542C\u5668\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u8BBE\u7F6E\uFF0C\u8BA9\u5DE5\u5177\u94FE\u884C\u4E3A\u4E0E\u754C\u9762\u4F53\u9A8C\u4FDD\u6301\u4E00\u81F4\u3002</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${s?"is-on":"is-off"}">\u76D1\u542C ${s?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip ${n?"is-on":"is-off"}">\u8C03\u8BD5 ${n?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip is-neutral">\u4E3B\u9898 ${e.ui?.theme||"dark-blue"}</span>
          </div>
        </div>

        <!-- \u6807\u7B7E\u9875\u5BFC\u822A -->
        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> \u6267\u884C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="listener">
            <i class="fa-solid fa-ear-listen"></i> \u76D1\u542C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> \u8C03\u8BD5
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> \u5916\u89C2
          </button>
        </div>
        
        <!-- \u6807\u7B7E\u9875\u5185\u5BB9 -->
        <div class="yyt-settings-content">
          ${this._renderExecutorTab(e.executor)}
          ${this._renderListenerTab(e.listener)}
          ${this._renderDebugTab(e.debug)}
          ${this._renderUiTab(e.ui)}
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C -->
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
    `},_renderListenerTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="listener">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u4E8B\u4EF6\u76D1\u542C</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-listenGenerationEnded" 
                     ${t.listenGenerationEnded?"checked":""}>
              <span>\u542F\u7528\u81EA\u52A8\u5DE5\u5177\u76D1\u542C</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u4F1A\u76D1\u542C GENERATION_ENDED\uFF0C\u5E76\u7ED3\u5408 GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED \u4F5C\u4E3A\u515C\u5E95\u6765\u6E90\u81EA\u52A8\u89E6\u53D1\u5DE5\u5177\u3002</div>
          </div>

          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-useGenerationAfterCommandsFallback" 
                     ${t.useGenerationAfterCommandsFallback!==!1?"checked":""}>
              <span>\u542F\u7528 GENERATION_AFTER_COMMANDS \u515C\u5E95</span>
            </label>
            <div class="yyt-form-hint">\u5173\u95ED\u540E\uFF0C\u81EA\u52A8\u94FE\u4E0D\u518D\u628A GENERATION_AFTER_COMMANDS \u4F5C\u4E3A\u6D88\u606F\u7EA7 session \u7684\u8865\u5145\u4E8B\u4EF6\u6E90\u3002</div>
          </div>

          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-useMessageReceivedFallback" 
                     ${t.useMessageReceivedFallback!==!1?"checked":""}>
              <span>\u542F\u7528 MESSAGE_RECEIVED \u515C\u5E95</span>
            </label>
            <div class="yyt-form-hint">\u5173\u95ED\u540E\uFF0C\u81EA\u52A8\u94FE\u4E0D\u518D\u4F7F\u7528 MESSAGE_RECEIVED \u515C\u5E95\uFF1B\u542F\u7528\u65F6\u4E5F\u53EA\u4F1A\u5438\u6536 assistant \u697C\u5C42\u8FDB\u5165\u540C\u4E00\u6D88\u606F session\u3002</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u8FC7\u6EE4\u89C4\u5219</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreQuietGeneration" 
                     ${t.ignoreQuietGeneration?"checked":""}>
              <span>\u5FFD\u7565\u9759\u9ED8\u751F\u6210</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u4F1A\u8DF3\u8FC7 quiet / dryRun / \u540E\u53F0\u751F\u6210\uFF0C\u51CF\u5C11\u672A\u771F\u6B63\u4EA7\u751F\u56DE\u590D\u65F6\u7684\u8BEF\u89E6\u53D1\u3002</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreAutoTrigger" 
                     ${t.ignoreAutoTrigger?"checked":""}>
              <span>\u5FFD\u7565\u81EA\u52A8\u89E6\u53D1</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u4F1A\u5C3D\u91CF\u8DF3\u8FC7\u201C\u6CA1\u6709\u6700\u8FD1\u7528\u6237\u53D1\u9001\u610F\u56FE\u201D\u7684\u751F\u6210\uFF0C\u51CF\u5C11\u5176\u4ED6\u63D2\u4EF6/\u811A\u672C\u89E6\u53D1\u751F\u6210\u65F6\u7684\u8BEF\u6267\u884C\u3002</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">Session \u4E0E\u9632\u6296</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u9632\u6296\u65F6\u95F4 (ms)</label>
              <div class="yyt-form-hint">\u7528\u4E8E GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED \u7B49\u515C\u5E95\u4E8B\u4EF6\u7684\u5EF6\u8FDF\u8C03\u5EA6\u4E0E\u53BB\u6296\u3002</div>
              <input type="number" class="yyt-input" id="yyt-setting-debounceMs" 
                     value="${t.debounceMs}" min="0" max="5000" step="100">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6D88\u606F Session \u7A97\u53E3 (ms)</label>
              <div class="yyt-form-hint">\u540C\u4E00\u6761\u6D88\u606F\u5728\u8BE5\u7A97\u53E3\u5185\u547D\u4E2D\u7684\u591A\u79CD\u5BBF\u4E3B\u4E8B\u4EF6\u4F1A\u88AB\u805A\u5408\u8FDB\u540C\u4E00 session\u3002</div>
              <input type="number" class="yyt-input" id="yyt-setting-messageSessionWindowMs" 
                     value="${t.messageSessionWindowMs||1800}" min="300" max="10000" step="100">
            </div>
          </div>
          <div class="yyt-form-group">
            <label>\u8BCA\u65AD\u5386\u53F2\u4FDD\u7559\u6761\u6570</label>
            <div class="yyt-form-hint">\u63A7\u5236\u6D88\u606F\u7EA7 session \u5386\u53F2\u4E0E\u5355\u5DE5\u5177\u6700\u8FD1\u89E6\u53D1 / \u5199\u56DE\u5386\u53F2\u7684\u4FDD\u7559\u6570\u91CF\uFF0C\u907F\u514D\u8BCA\u65AD\u4FE1\u606F\u65E0\u9650\u81A8\u80C0\u3002</div>
            <input type="number" class="yyt-input" id="yyt-setting-historyRetentionLimit" 
                   value="${t.historyRetentionLimit||10}" min="1" max="50" step="1">
          </div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-enableDebugLog" 
                     ${t.enableDebugLog?"checked":""}>
              <span>\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7</span>
            </label>
            <div class="yyt-form-hint">\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-saveExecutionHistory" 
                     ${t.saveExecutionHistory?"checked":""}>
              <span>\u4FDD\u5B58\u6267\u884C\u5386\u53F2</span>
            </label>
            <div class="yyt-form-hint">\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI \u663E\u793A</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-showRuntimeBadge" 
                     ${t.showRuntimeBadge?"checked":""}>
              <span>\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0</span>
            </label>
            <div class="yyt-form-hint">\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668</div>
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
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-compactMode" 
                     ${t.compactMode?"checked":""}>
              <span>\u7D27\u51D1\u6A21\u5F0F</span>
            </label>
            <div class="yyt-form-hint">\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-animationEnabled" 
                     ${t.animationEnabled?"checked":""}>
              <span>\u542F\u7528\u52A8\u753B\u6548\u679C</span>
            </label>
            <div class="yyt-form-hint">\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B</div>
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=Q();!s||!te(t)||(t.find(".yyt-settings-tab").on("click",n=>{let o=s(n.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(n.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${o}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ne.resetSettings(),fi(Rs.ui,Ls()),this.renderTo(t),S("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300,useGenerationAfterCommandsFallback:t.find("#yyt-setting-useGenerationAfterCommandsFallback").is(":checked"),useMessageReceivedFallback:t.find("#yyt-setting-useMessageReceivedFallback").is(":checked"),messageSessionWindowMs:parseInt(t.find("#yyt-setting-messageSessionWindowMs").val())||1800,historyRetentionLimit:parseInt(t.find("#yyt-setting-historyRetentionLimit").val())||10},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ne.saveSettings(s),fi(s.ui,Ls()),S("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!Q()||!te(t)||t.find("*").off()},getStyles(){return`
      /* \u8BBE\u7F6E\u9762\u677F\u6837\u5F0F */
      .yyt-settings-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 10px;
      }

      .yyt-settings-hero {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
      }

      .yyt-settings-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .yyt-settings-hero-title {
        font-size: 18px;
        font-weight: 800;
        color: var(--yyt-text);
        line-height: 1.15;
      }

      .yyt-settings-hero-desc {
        font-size: 12px;
        color: var(--yyt-text-secondary);
        line-height: 1.55;
        max-width: 72ch;
      }

      .yyt-settings-hero-status {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .yyt-settings-status-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.3px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-settings-status-chip.is-on {
        color: var(--yyt-success);
        background: rgba(74, 222, 128, 0.1);
      }

      .yyt-settings-status-chip.is-off {
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.05);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-settings-tabs {
        display: flex;
        gap: 4px;
        padding: 6px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        flex-shrink: 0;
      }
      
      .yyt-settings-tab {
        padding: 8px 12px;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 8px;
        color: var(--yyt-text-muted);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-settings-tab:hover {
        background: rgba(255, 255, 255, 0.04);
        color: var(--yyt-text);
      }
      
      .yyt-settings-tab.yyt-active {
        background: rgba(123, 183, 255, 0.1);
        border-color: rgba(123, 183, 255, 0.3);
        color: var(--yyt-accent);
      }
      
      .yyt-settings-content {
        flex: 1;
        overflow-y: auto;
        padding: 4px;
      }
      
      .yyt-settings-tab-content {
        display: none;
      }
      
      .yyt-settings-tab-content.yyt-active {
        display: block;
      }
      
      .yyt-settings-section {
        margin-bottom: 14px;
        padding: 14px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
      }
      
      .yyt-settings-section-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .yyt-form-row {
        display: flex;
        gap: 16px;
      }
      
      .yyt-form-group {
        margin-bottom: 16px;
      }
      
      .yyt-form-group label {
        display: block;
        font-size: 12px;
        font-weight: 500;
        color: var(--yyt-text);
        margin-bottom: 6px;
      }
      
      .yyt-form-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
        margin-bottom: 8px;
      }
      
      .yyt-toggle-label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
      }
      
      .yyt-toggle-label span {
        font-size: 13px;
        color: var(--yyt-text);
      }
      
      .yyt-settings-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 10px 0 0;
        background: rgba(255, 255, 255, 0.02);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
      }

      @media screen and (max-width: 768px) {
        .yyt-settings-hero {
          flex-direction: column;
        }

        .yyt-settings-hero-status {
          justify-content: flex-start;
        }

        .yyt-form-row {
          flex-direction: column;
        }
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Cd=ht});var ca={};ge(ca,{ApiPresetPanel:()=>Ke,BypassPanel:()=>Yt,RegexExtractPanel:()=>He,SCRIPT_ID:()=>f,SettingsPanel:()=>ht,StatusBlockPanel:()=>qe,SummaryToolPanel:()=>Ve,ToolManagePanel:()=>je,UIManager:()=>hs,YouyouReviewPanel:()=>Je,bindDialogEvents:()=>eo,createDialogHtml:()=>Zn,default:()=>Md,downloadJson:()=>ut,escapeHtml:()=>_,fillFormWithConfig:()=>Dt,getAllStyles:()=>la,getFormApiConfig:()=>St,getJQuery:()=>Q,initUI:()=>Us,isContainerValid:()=>te,readFileContent:()=>pt,registerComponents:()=>gs,renderApiPanel:()=>Kn,renderBypassPanel:()=>ra,renderRegexPanel:()=>Hn,renderSettingsPanel:()=>aa,renderStatusBlockPanel:()=>oa,renderSummaryToolPanel:()=>na,renderToolPanel:()=>jn,renderYouyouReviewPanel:()=>ia,resetJQueryCache:()=>Ua,showToast:()=>S,showTopNotice:()=>Ze,uiManager:()=>ue});function gs(){ue.register(Ke.id,Ke),ue.register(He.id,He),ue.register(je.id,je),ue.register(Ve.id,Ve),ue.register(qe.id,qe),ue.register(Je.id,Je),ue.register(Yt.id,Yt),ue.register(ht.id,ht),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function Us(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...n}=t;ue.init(n),gs(),e&&ue.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Mt(t,e,s={}){ue.render(t,e,s)}function Kn(t){Mt(Ke.id,t)}function Hn(t){Mt(He.id,t)}function jn(t){Mt(je.id,t)}function na(t){Mt(Ve.id,t)}function oa(t){Mt(qe.id,t)}function ia(t){Mt(Je.id,t)}function ra(t){Mt(Yt.id,t)}function aa(t){Mt(ht.id,t)}function la(){return ue.getAllStyles()}var Md,mi=q(()=>{to();mo();Eo();No();di();ui();pi();yi();Fn();et();to();mo();Eo();No();di();ui();pi();yi();Fn();Md={uiManager:ue,ApiPresetPanel:Ke,RegexExtractPanel:He,ToolManagePanel:je,SummaryToolPanel:Ve,StatusBlockPanel:qe,YouyouReviewPanel:Je,BypassPanel:Yt,SettingsPanel:ht,registerComponents:gs,initUI:Us,renderApiPanel:Kn,renderRegexPanel:Hn,renderToolPanel:jn,renderSummaryToolPanel:na,renderStatusBlockPanel:oa,renderYouyouReviewPanel:ia,renderBypassPanel:ra,renderSettingsPanel:aa,getAllStyles:la}});var ba={};ge(ba,{ApiPresetPanel:()=>Ke,RegexExtractPanel:()=>He,SCRIPT_ID:()=>f,StatusBlockPanel:()=>qe,SummaryToolPanel:()=>Ve,ToolManagePanel:()=>je,YouyouReviewPanel:()=>Je,default:()=>kd,escapeHtml:()=>_,fillFormWithConfig:()=>Dt,getCurrentTab:()=>ma,getFormApiConfig:()=>St,getJQuery:()=>Q,getRegexStyles:()=>ga,getStyles:()=>ya,getToolStyles:()=>fa,initUI:()=>Us,isContainerValid:()=>te,registerComponents:()=>gs,render:()=>da,renderRegex:()=>ua,renderTool:()=>pa,setCurrentTab:()=>ha,showToast:()=>S,uiManager:()=>ue});function hi(t,e){let s=Q();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function da(t){if(Bs=hi(t,Bs),!Bs||!Bs.length){console.error("[YouYouToolkit] Container not found or invalid");return}Kn(Bs)}function ua(t){if(zs=hi(t,zs),!zs||!zs.length){console.error("[YouYouToolkit] Regex container not found");return}Hn(zs)}function pa(t){if(Fs=hi(t,Fs),!Fs||!Fs.length){console.error("[YouYouToolkit] Tool container not found");return}jn(Fs)}function ya(){return Ke.getStyles()}function ga(){return He.getStyles()}function fa(){return[je.getStyles(),Ve.getStyles(),qe.getStyles(),Je.getStyles()].join(`
`)}function ma(){return ue.getCurrentTab()}function ha(t){ue.switchTab(t)}var Bs,zs,Fs,kd,xa=q(()=>{mi();Bs=null,zs=null,Fs=null;kd={render:da,renderRegex:ua,renderTool:pa,getStyles:ya,getRegexStyles:ga,getToolStyles:fa,getCurrentTab:ma,setCurrentTab:ha,uiManager:ue,ApiPresetPanel:Ke,RegexExtractPanel:He,ToolManagePanel:je,SummaryToolPanel:Ve,StatusBlockPanel:qe,YouyouReviewPanel:Je,registerComponents:gs,initUI:Us,SCRIPT_ID:f,escapeHtml:_,showToast:S,getJQuery:Q,isContainerValid:te,getFormApiConfig:St,fillFormWithConfig:Dt}});var va={};ge(va,{DEFAULT_PROMPT_SEGMENTS:()=>Yn,PromptEditor:()=>Wn,default:()=>Ud,getPromptEditorStyles:()=>Gd,messagesToSegments:()=>Ld,segmentsToMessages:()=>Nd,validatePromptSegments:()=>Od});function Gd(){return`
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
  `}function Od(t){let e=[];return Array.isArray(t)?(t.forEach((s,n)=>{s.id||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${n+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function Nd(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Ld(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Yn]}var Dd,Pd,$d,Yn,Wn,Ud,Sa=q(()=>{Dd="youyou_toolkit_prompt_editor",Pd={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},$d={system:"fa-server",ai:"fa-robot",user:"fa-user"},Yn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Wn=class{constructor(e={}){this.containerId=e.containerId||Dd,this.segments=e.segments||[...Yn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Yn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=Pd[e.type]||e.type,n=$d[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,i=e.mainSlot==="B"||e.isMain2,a=o?"var(--yyt-accent, #7bb7ff)":i?"#ffb74d":"",r=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",c=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${o?"yyt-main-a":""} ${i?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${a?`border-left: 3px solid ${a};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${n}"></i>
            <span class="yyt-prompt-segment-title">${s}</span>
            <div class="yyt-prompt-segment-badges">
              ${c}
              ${r}
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:n})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:n})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,n=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=s),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(o=>o.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let n=this.segments.find(o=>o.id===e);n&&(Object.assign(n,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let n=s.target.files[0];if(!n)return;let o=new FileReader;o.onload=i=>{try{let a=JSON.parse(i.target.result);Array.isArray(a)?(this.setSegments(a),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",a)}},o.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),n=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(n),i=document.createElement("a");i.href=o,i.download=`prompt_group_${Date.now()}.json`,i.click(),URL.revokeObjectURL(o),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};Ud=Wn});var bi={};ge(bi,{WindowManager:()=>Vn,closeWindow:()=>Kd,createWindow:()=>Fd,windowManager:()=>Le});function zd(){if(Le.stylesInjected)return;Le.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=Bd+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function Fd(t){let{id:e,title:s="\u7A97\u53E3",content:n="",width:o=900,height:i=700,modal:a=!1,resizable:r=!0,maximizable:c=!0,startMaximized:l=!1,rememberState:d=!0,onClose:u,onReady:p}=t;zd();let y=window.jQuery||window.parent?.jQuery;if(!y)return console.error("[WindowManager] jQuery not available"),null;if(Le.isOpen(e))return Le.bringToFront(e),Le.getWindow(e);let b=window.innerWidth||1200,h=window.innerHeight||800,m=b<=1100,E=null,J=!1;d&&(E=Le.getState(e),E&&!m&&(J=!0));let D,Y;J&&E.width&&E.height?(D=Math.max(400,Math.min(E.width,b-40)),Y=Math.max(300,Math.min(E.height,h-40))):(D=Math.max(400,Math.min(o,b-40)),Y=Math.max(300,Math.min(i,h-40)));let k=Math.max(20,Math.min((b-D)/2,b-D-20)),G=Math.max(20,Math.min((h-Y)/2,h-Y-20)),R=c&&!m,O=`
    <div class="yyt-window" id="${e}" style="left:${k}px; top:${G}px; width:${D}px; height:${Y}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Hd(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${R?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${n}</div>
      ${r?`
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
  `,H=null;a&&(H=y(`<div class="yyt-window-overlay" data-for="${e}"></div>`),y(document.body).append(H));let B=y(O);y(document.body).append(B),Le.register(e,B),B.on("mousedown",()=>Le.bringToFront(e));let Z=!1,xe={left:k,top:G,width:D,height:Y},ve=()=>{xe={left:parseInt(B.css("left")),top:parseInt(B.css("top")),width:B.width(),height:B.height()},B.addClass("maximized"),B.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),Z=!0},Se=()=>{B.removeClass("maximized"),B.css({left:xe.left+"px",top:xe.top+"px",width:xe.width+"px",height:xe.height+"px"}),B.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),Z=!1};B.find(".yyt-window-btn.maximize").on("click",()=>{Z?Se():ve()}),(m&&c||J&&E.isMaximized&&c||l&&c)&&ve(),B.find(".yyt-window-btn.close").on("click",()=>{if(d&&c){let pe={width:Z?xe.width:B.width(),height:Z?xe.height:B.height(),isMaximized:Z};Le.saveState(e,pe)}u&&u(),H&&H.remove(),B.remove(),Le.unregister(e),y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),H&&H.on("click",pe=>{pe.target,H[0]});let Ue=!1,ze,Xe,$e,ct;if(B.find(".yyt-window-header").on("mousedown",pe=>{y(pe.target).closest(".yyt-window-controls").length||Z||(Ue=!0,ze=pe.clientX,Xe=pe.clientY,$e=parseInt(B.css("left")),ct=parseInt(B.css("top")),y(document.body).css("user-select","none"))}),y(document).on("mousemove.yytWindowDrag"+e,pe=>{if(!Ue)return;let ye=pe.clientX-ze,bt=pe.clientY-Xe;B.css({left:Math.max(0,$e+ye)+"px",top:Math.max(0,ct+bt)+"px"})}),y(document).on("mouseup.yytWindowDrag"+e,()=>{Ue&&(Ue=!1,y(document.body).css("user-select",""))}),r){let pe=!1,ye="",bt,Qe,se,g,v,C;B.find(".yyt-window-resize-handle").on("mousedown",function(w){Z||(pe=!0,ye="",y(this).hasClass("se")?ye="se":y(this).hasClass("e")?ye="e":y(this).hasClass("s")?ye="s":y(this).hasClass("w")?ye="w":y(this).hasClass("n")?ye="n":y(this).hasClass("nw")?ye="nw":y(this).hasClass("ne")?ye="ne":y(this).hasClass("sw")&&(ye="sw"),bt=w.clientX,Qe=w.clientY,se=B.width(),g=B.height(),v=parseInt(B.css("left")),C=parseInt(B.css("top")),y(document.body).css("user-select","none"),w.stopPropagation())}),y(document).on("mousemove.yytWindowResize"+e,w=>{if(!pe)return;let L=w.clientX-bt,W=w.clientY-Qe,re=400,K=300,X=se,me=g,Te=v,Me=C;if(ye.includes("e")&&(X=Math.max(re,se+L)),ye.includes("s")&&(me=Math.max(K,g+W)),ye.includes("w")){let ke=se-L;ke>=re&&(X=ke,Te=v+L)}if(ye.includes("n")){let ke=g-W;ke>=K&&(me=ke,Me=C+W)}B.css({width:X+"px",height:me+"px",left:Te+"px",top:Me+"px"})}),y(document).on("mouseup.yytWindowResize"+e,()=>{pe&&(pe=!1,y(document.body).css("user-select",""))})}return B.on("remove",()=>{y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),p&&setTimeout(()=>p(B),50),B}function Kd(t){let e=Le.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),Le.unregister(t)}}function Hd(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var Bd,Ta,Vn,Le,xi=q(()=>{Fe();Bd="youyou_toolkit_window_manager",Ta="window_states",Vn=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let n=this.loadStates();n[e]={...s,updatedAt:Date.now()},fs.set(Ta,n)}loadStates(){return fs.get(Ta)||{}}getState(e){return this.loadStates()[e]||null}},Le=new Vn});function Ea(t,e={}){let{constants:s,topLevelWindow:n,modules:o}=t,{SCRIPT_ID:i,SCRIPT_VERSION:a,MENU_ITEM_ID:r,MENU_CONTAINER_ID:c}=s,l=null,d=!1,u=new Map,p={storageModule:()=>Promise.resolve().then(()=>(Xn(),Jn)),uiComponentsModule:()=>Promise.resolve().then(()=>(xa(),ba)),promptEditorModule:()=>Promise.resolve().then(()=>(Sa(),va)),toolExecutorModule:()=>Promise.resolve().then(()=>(In(),wn)),windowManagerModule:()=>Promise.resolve().then(()=>(xi(),bi))};function y(...R){console.log(`[${i}]`,...R)}function b(...R){console.error(`[${i}]`,...R)}async function h(R){return!R||!p[R]?null:o[R]?o[R]:(u.has(R)||u.set(R,(async()=>{try{let O=await p[R]();return o[R]=O,O}catch(O){throw u.delete(R),O}})()),u.get(R))}async function m(){return l||(l=(async()=>{try{return o.storageModule=await Promise.resolve().then(()=>(Xn(),Jn)),o.apiConnectionModule=await Promise.resolve().then(()=>(js(),Mi)),o.presetManagerModule=await Promise.resolve().then(()=>(Xs(),$i)),o.uiModule=await Promise.resolve().then(()=>(mi(),ca)),o.regexExtractorModule=await Promise.resolve().then(()=>(cn(),Yi)),o.toolManagerModule=await Promise.resolve().then(()=>(pn(),Wi)),o.toolExecutorModule=await Promise.resolve().then(()=>(In(),wn)),o.toolTriggerModule=await Promise.resolve().then(()=>(ci(),Xr)),o.windowManagerModule=await Promise.resolve().then(()=>(xi(),bi)),o.toolRegistryModule=await Promise.resolve().then(()=>(os(),dr)),o.settingsServiceModule=await Promise.resolve().then(()=>(Cs(),pr)),o.bypassManagerModule=await Promise.resolve().then(()=>(Is(),ur)),o.variableResolverModule=await Promise.resolve().then(()=>(Fo(),mr)),o.contextInjectorModule=await Promise.resolve().then(()=>(zo(),gr)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(Ko(),br)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(Ho(),vr)),o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(R){return l=null,console.warn(`[${i}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,R),!1}})(),l)}function E(){return`
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
        --yyt-surface-hover: rgba(255, 255, 255, 0.06);
        --yyt-surface-active: rgba(255, 255, 255, 0.08);
        --yyt-border: rgba(255, 255, 255, 0.08);
        --yyt-border-strong: rgba(255, 255, 255, 0.15);
        --yyt-text: rgba(255, 255, 255, 0.95);
        --yyt-text-secondary: rgba(255, 255, 255, 0.7);
        --yyt-text-muted: rgba(255, 255, 255, 0.45);
        --yyt-radius: 12px;
        --yyt-radius-sm: 8px;
      }

      /* \u83DC\u5355\u9879 */
      #${c} { display: flex; align-items: center; }

      #${r} {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 14px; cursor: pointer;
        transition: all 0.2s ease; border-radius: 8px; margin: 2px;
      }

      #${r}:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
      }

      #${r} .fa-fw {
        font-size: 16px; color: var(--yyt-accent);
        filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      }

      #${r} span { font-weight: 500; letter-spacing: 0.3px; }

      /* \u4E3B\u5F39\u7A97\u906E\u7F69 */
      .yyt-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
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
        width: min(1500px, calc(100vw - 4px));
        max-width: calc(100vw - 4px);
        height: min(1120px, calc(100vh - 4px));
        max-height: calc(100vh - 4px);
        background:
          radial-gradient(1200px 600px at 10% -10%, var(--yyt-bg-gradient-1), transparent 60%),
          radial-gradient(900px 500px at 100% 0%, var(--yyt-bg-gradient-2), transparent 55%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
          var(--yyt-bg-base);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.65), 0 0 60px rgba(123, 183, 255, 0.1);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
        color: var(--yyt-text);
        z-index: 10000;
      }

      /* \u5F39\u7A97\u5934\u90E8 */
      .yyt-popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 20px;
        background: var(--yyt-surface-hover);
        border-bottom: 1px solid var(--yyt-border);
        border-radius: 16px 16px 0 0;
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
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 8px;
        background: var(--yyt-surface-hover);
        color: var(--yyt-text-secondary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      }

      .yyt-popup-close:hover {
        background: rgba(255, 107, 107, 0.25);
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
        gap: 14px;
      }

      .yyt-content-frame {
        flex: 1;
        min-height: 0;
        padding: 6px;
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      /* \u5F39\u7A97\u5E95\u90E8 */
      .yyt-popup-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        padding: 14px 20px;
        background: var(--yyt-surface);
        border-top: 1px solid var(--yyt-border);
        border-radius: 0 0 16px 16px;
        flex-shrink: 0;
      }

      .yyt-popup-footer-left,
      .yyt-popup-footer-right {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .yyt-popup-status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-popup-status i {
        color: var(--yyt-accent);
      }

      /* \u4E3B\u9876\u680F */
      .yyt-shell-topbar {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
        gap: 18px;
        padding: 18px 20px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.07);
        background:
          radial-gradient(600px 240px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 65%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.02) 100%);
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
        font-weight: 700;
        letter-spacing: 0.4px;
        text-transform: uppercase;
      }

      .yyt-shell-heading {
        font-size: 24px;
        font-weight: 800;
        line-height: 1.1;
        color: var(--yyt-text);
      }

      .yyt-shell-overview-text {
        font-size: 13px;
        line-height: 1.7;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-current-card {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
        padding: 14px 16px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-shell-current-label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: var(--yyt-text-muted);
      }

      .yyt-shell-current-page {
        font-size: 15px;
        font-weight: 800;
        line-height: 1.3;
        color: var(--yyt-text);
        word-break: break-word;
      }

      .yyt-shell-current-desc {
        font-size: 12px;
        line-height: 1.6;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(90px, 1fr));
        gap: 10px;
      }

      .yyt-shell-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        min-width: 92px;
        padding: 14px 14px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-shell-stat-label {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }

      .yyt-shell-stat-value {
        font-size: 22px;
        font-weight: 800;
        line-height: 1;
        color: var(--yyt-text);
      }

      .yyt-shell-workspace {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(220px, 248px) minmax(0, 1fr);
        gap: 14px;
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
        padding: 16px;
        border-radius: 18px;
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
        font-weight: 700;
        color: var(--yyt-text);
      }

      .yyt-shell-sidebar-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.4px;
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
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px dashed rgba(123, 183, 255, 0.18);
        background: rgba(123, 183, 255, 0.05);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.65;
      }

      .yyt-shell-main {
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .yyt-shell-main-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 16px 18px;
        border-radius: 18px;
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
        gap: 6px;
        min-width: 0;
      }

      .yyt-shell-main-label {
        font-size: 11px;
        font-weight: 700;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .yyt-shell-main-title {
        font-size: 20px;
        font-weight: 800;
        line-height: 1.15;
        color: var(--yyt-text);
      }

      .yyt-shell-main-description {
        font-size: 13px;
        line-height: 1.65;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-main-meta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.5;
      }

      .yyt-shell-main-save-btn {
        white-space: nowrap;
        flex-shrink: 0;
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
        gap: 6px;
        padding: 8px 16px;
        border: none;
        border-radius: var(--yyt-radius-sm);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s ease;
      }

      .yyt-btn-primary {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
        color: var(--yyt-on-accent);
      }

      .yyt-btn-primary:hover {
        transform: translateY(-1px);
      }

      .yyt-btn-secondary {
        background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
        color: var(--yyt-text);
        border: 1px solid var(--yyt-border);
      }

      .yyt-btn-secondary:hover {
        border-color: var(--yyt-border-strong);
      }

      .yyt-btn-danger {
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(248, 113, 113, 0.05) 100%);
        color: var(--yyt-error);
        border: 1px solid rgba(248, 113, 113, 0.25);
      }

      .yyt-btn-small {
        padding: 6px 10px;
        font-size: 11px;
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
        padding: 10px 14px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        background: rgba(255, 255, 255, 0.03);
        color: var(--yyt-text);
        font-size: 13px;
      }

      .yyt-input:focus,
      .yyt-select:focus,
      .yyt-textarea:focus {
        outline: none;
        border-color: var(--yyt-accent);
      }

      .yyt-input::placeholder,
      .yyt-textarea::placeholder {
        color: var(--yyt-text-muted);
      }

      .yyt-textarea {
        resize: vertical;
        min-height: 80px;
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
      }
    `}async function J(){let R=`${i}-styles`,O=n.document||document;if(O.getElementById(R))return;let H="",B=[];try{B.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{B.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}B.push("./styles/main.css");for(let xe of[...new Set(B.filter(Boolean))])try{let ve=await fetch(xe);if(ve.ok){H=await ve.text();break}}catch{}H||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),H=E());let Z=O.createElement("style");Z.id=R,Z.textContent=H,(O.head||O.documentElement).appendChild(Z),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function D(){let R=n.document||document;if(o.uiModule?.getAllStyles){let O=`${i}-ui-styles`;if(!R.getElementById(O)){let H=R.createElement("style");H.id=O,H.textContent=o.uiModule.getAllStyles(),(R.head||R.documentElement).appendChild(H)}}if(o.promptEditorModule&&o.promptEditorModule.getPromptEditorStyles){let O=`${i}-prompt-styles`;if(!R.getElementById(O)){let H=R.createElement("style");H.id=O,H.textContent=o.promptEditorModule.getPromptEditorStyles(),(R.head||R.documentElement).appendChild(H)}}}async function Y(){try{let{applyUiPreferences:R}=await Promise.resolve().then(()=>(Fn(),sa));if(o.settingsServiceModule?.settingsService){let O=o.settingsServiceModule.settingsService.getUiSettings();if(O&&O.theme){let H=n.document||document;R(O,H),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${O.theme}`)}}}catch(R){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",R)}}function k(){let R=n.jQuery||window.jQuery;if(!R){b("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(k,1e3);return}let O=n.document||document,H=R("#extensionsMenu",O);if(!H.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(k,2e3);return}if(R(`#${c}`,H).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let Z=R(`<div class="extension_container interactable" id="${c}" tabindex="0"></div>`),xe=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${r}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,ve=R(xe);ve.on("click",function(Ue){Ue.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let ze=R("#extensionsMenuButton",O);ze.length&&H.is(":visible")&&ze.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),Z.append(ve),H.append(Z),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function G(){if(y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await J(),await m()){if(y("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!d&&o.uiModule?.initUI)try{o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:n.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(H){console.error(`[${i}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,H)}if(o.toolTriggerModule?.initTriggerModule)try{o.toolTriggerModule.initTriggerModule(),y("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(H){console.error(`[${i}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,H)}D(),await Y()}else y("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let O=n.document||document;O.readyState==="loading"?O.addEventListener("DOMContentLoaded",()=>{setTimeout(k,1e3)}):setTimeout(k,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:m,injectStyles:J,addMenuItem:k,loadLegacyModule:h,init:G,log:y,logError:b}}function _a(t){let{constants:e,topLevelWindow:s,modules:n,caches:o,uiState:i}=t,{SCRIPT_ID:a,SCRIPT_VERSION:r,POPUP_ID:c}=e,l={cleanup:null},d={cleanups:[]};function u(...g){console.log(`[${a}]`,...g)}function p(...g){console.error(`[${a}]`,...g)}async function y(g){if(n[g])return n[g];let v=t?.services?.loadLegacyModule;if(typeof v!="function")return null;try{return await v(g)}catch(C){return p(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${g}`,C),null}}function b(g){return typeof g!="string"?"":g.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function h(){return s.jQuery||window.jQuery}function m(){return s.document||document}function E(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let v=n.toolRegistryModule?.getToolConfig(g);if(!v)return g;if(!v.hasSubTabs)return v.name||g;let C=i.currentSubTab[g]||v.subTabs?.[0]?.id||"",w=v.subTabs?.find(L=>L.id===C);return w?.name?`${v.name} / ${w.name}`:v.name||g}function J(g){if(!g)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let v=n.toolRegistryModule?.getToolConfig(g);if(!v)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!v.hasSubTabs)return v.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let C=i.currentSubTab[g]||v.subTabs?.[0]?.id||"";return v.subTabs?.find(L=>L.id===C)?.description||v.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function D(){let g=i.currentPopup;if(!g)return;let v=E(i.currentMainTab),C=J(i.currentMainTab),w=g.querySelector(".yyt-popup-active-label");w&&(w.textContent=`\u5F53\u524D\uFF1A${v}`);let L=g.querySelector(".yyt-shell-breadcrumb");L&&(L.textContent=v);let W=g.querySelector(".yyt-shell-main-title");W&&(W.textContent=v);let re=g.querySelector(".yyt-shell-main-description");re&&(re.textContent=C);let K=g.querySelector(".yyt-shell-current-page");K&&(K.textContent=v);let X=g.querySelector(".yyt-shell-current-desc");X&&(X.textContent=C)}function Y(){typeof l.cleanup=="function"&&(l.cleanup(),l.cleanup=null)}function k(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(g=>{typeof g=="function"&&g()}),d.cleanups=[])}function G(g){return!!g?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function R(g){let v=g?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body"].join(","));return v?v.scrollHeight>v.clientHeight+2||v.scrollWidth>v.clientWidth+2:!1}function O(g,v){return v?.closest?.(".yyt-scrollable-surface")===g}function H(g,v){return!g||!v?null:[v.closest?.(".yyt-tool-list"),v.closest?.(".yyt-settings-content"),v.closest?.(".yyt-sub-content"),v.closest?.(".yyt-tab-content.active"),g].filter(Boolean).find(w=>w!==g&&!g.contains(w)?!1:w.scrollHeight>w.clientHeight+2||w.scrollWidth>w.clientWidth+2)||g}function B(g){let v=m();if(!g||!v)return;g.classList.add("yyt-scrollable-surface");let C=!1,w=!1,L=0,W=0,re=0,K=0,X=!1,me=!1,Te=()=>{C=!1,w=!1,g.classList.remove("yyt-scroll-dragging")},Me=V=>{V.button===0&&(G(V.target)||O(g,V.target)&&(X=g.scrollWidth>g.clientWidth+2,me=g.scrollHeight>g.clientHeight+2,!(!X&&!me)&&(V.stopPropagation(),C=!0,w=!1,L=V.clientX,W=V.clientY,re=g.scrollLeft,K=g.scrollTop)))},ke=V=>{if(!C)return;let dt=V.clientX-L,Ge=V.clientY-W;!(Math.abs(dt)>4||Math.abs(Ge)>4)&&!w||(w=!0,g.classList.add("yyt-scroll-dragging"),X&&(g.scrollLeft=re-dt),me&&(g.scrollTop=K-Ge),V.preventDefault())},xt=()=>{Te()},oe=V=>{if(V.ctrlKey||R(V.target))return;let dt=g.classList.contains("yyt-content");if(!dt&&!O(g,V.target))return;let Ge=H(g,V.target);!Ge||!(Ge.scrollHeight>Ge.clientHeight+2||Ge.scrollWidth>Ge.clientWidth+2)||(Math.abs(V.deltaY)>0&&(Ge.scrollTop+=V.deltaY),Math.abs(V.deltaX)>0&&(Ge.scrollLeft+=V.deltaX),V.preventDefault(),(!dt||Ge!==g)&&V.stopPropagation())},Ae=V=>{w&&V.preventDefault()};g.addEventListener("mousedown",Me),g.addEventListener("wheel",oe,{passive:!1}),g.addEventListener("dragstart",Ae),v.addEventListener("mousemove",ke),v.addEventListener("mouseup",xt),d.cleanups.push(()=>{Te(),g.classList.remove("yyt-scrollable-surface"),g.removeEventListener("mousedown",Me),g.removeEventListener("wheel",oe),g.removeEventListener("dragstart",Ae),v.removeEventListener("mousemove",ke),v.removeEventListener("mouseup",xt)})}function Z(){let g=i.currentPopup;if(!g)return;k();let v=[...g.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...g.querySelectorAll(".yyt-sub-nav"),...g.querySelectorAll(".yyt-content"),...g.querySelectorAll(".yyt-tab-content.active"),...g.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...g.querySelectorAll(".yyt-settings-content"),...g.querySelectorAll(".yyt-tool-list")];[...new Set(v)].forEach(B)}function xe(){let g=m(),v=i.currentPopup,C=v?.querySelector(".yyt-popup-header");if(!v||!C||!g)return;let w=!1,L=0,W=0,re=0,K=0,X="",me=()=>({width:s.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),Te=(Ae,V,dt)=>Math.min(Math.max(Ae,V),dt),Me=()=>{w&&(w=!1,v.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=X)},ke=Ae=>{if(!w||!i.currentPopup)return;let V=Ae.clientX-L,dt=Ae.clientY-W,{width:Ge,height:qn}=me(),Ia=v.offsetWidth||0,Ra=v.offsetHeight||0,Ca=Math.max(0,Ge-Ia),Ma=Math.max(0,qn-Ra);v.style.left=`${Te(re+V,0,Ca)}px`,v.style.top=`${Te(K+dt,0,Ma)}px`,v.style.transform="none",v.style.right="auto",v.style.bottom="auto"},xt=()=>{Me()},oe=Ae=>{if(Ae.button!==0||Ae.target?.closest(".yyt-popup-close"))return;w=!0,L=Ae.clientX,W=Ae.clientY;let V=v.getBoundingClientRect();re=V.left,K=V.top,v.style.left=`${V.left}px`,v.style.top=`${V.top}px`,v.style.transform="none",v.style.right="auto",v.style.bottom="auto",v.classList.add("yyt-popup-dragging"),X=g.body.style.userSelect||"",g.body.style.userSelect="none",Ae.preventDefault()};C.addEventListener("mousedown",oe),g.addEventListener("mousemove",ke),g.addEventListener("mouseup",xt),l.cleanup=()=>{Me(),C.removeEventListener("mousedown",oe),g.removeEventListener("mousemove",ke),g.removeEventListener("mouseup",xt)}}function ve(){Y(),k(),i.currentPopup&&(i.currentPopup.remove(),i.currentPopup=null),i.currentOverlay&&(i.currentOverlay.remove(),i.currentOverlay=null),u("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Se(g){i.currentMainTab=g;let v=h();if(!v||!i.currentPopup)return;v(i.currentPopup).find(".yyt-main-nav-item").removeClass("active"),v(i.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let C=n.toolRegistryModule?.getToolConfig(g);C?.hasSubTabs?(v(i.currentPopup).find(".yyt-sub-nav").show(),ze(g,C.subTabs)):v(i.currentPopup).find(".yyt-sub-nav").hide(),v(i.currentPopup).find(".yyt-tab-content").removeClass("active"),v(i.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),Xe(g),D(),Z()}function Ue(g,v){i.currentSubTab[g]=v;let C=h();!C||!i.currentPopup||(C(i.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),C(i.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${v}"]`).addClass("active"),$e(g,v),D(),Z())}function ze(g,v){let C=h();if(!C||!i.currentPopup||!v)return;let w=i.currentSubTab[g]||v[0]?.id,L=v.map(W=>`
      <div class="yyt-sub-nav-item ${W.id===w?"active":""}" data-subtab="${W.id}">
        <i class="fa-solid ${W.icon||"fa-file"}"></i>
        <span>${W.name}</span>
      </div>
    `).join("");C(i.currentPopup).find(".yyt-sub-nav").html(L),C(i.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let re=C(this).data("subtab");Ue(g,re)}),Z()}async function Xe(g){let v=h();if(!v||!i.currentPopup)return;let C=v(i.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!C.length)return;let w=n.toolRegistryModule?.getToolConfig(g);switch(g){case"apiPresets":if(n.uiModule?.renderApiPanel)n.uiModule.renderApiPanel(C);else{let L=await y("uiComponentsModule");L?.render&&L.render(C)}break;case"toolManage":if(n.uiModule?.renderToolPanel)n.uiModule.renderToolPanel(C);else{let L=await y("uiComponentsModule");L?.renderTool&&L.renderTool(C)}break;case"regexExtract":if(n.uiModule?.renderRegexPanel)n.uiModule.renderRegexPanel(C);else{let L=await y("uiComponentsModule");L?.renderRegex&&L.renderRegex(C)}break;case"tools":if(w?.hasSubTabs&&w.subTabs?.length>0){let L=i.currentSubTab[g]||w.subTabs[0].id;await $e(g,L)}else C.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":n.uiModule?.renderBypassPanel?n.uiModule.renderBypassPanel(C):C.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":n.uiModule?.renderSettingsPanel?n.uiModule.renderSettingsPanel(C):C.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:pe(g,C);break}Z()}async function $e(g,v){let C=h();if(!C||!i.currentPopup)return;let w=C(i.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!w.length)return;let L=n.toolRegistryModule?.getToolConfig(g);if(L?.hasSubTabs){let re=L.subTabs?.find(K=>K.id===v);if(re){let K=w.find(".yyt-sub-content");switch(K.length||(w.html('<div class="yyt-sub-content"></div>'),K=w.find(".yyt-sub-content")),re.component){case"SummaryToolPanel":if(n.uiModule?.renderSummaryToolPanel)n.uiModule.renderSummaryToolPanel(K);else{let X=await y("uiComponentsModule");X?.SummaryToolPanel?X.SummaryToolPanel.renderTo(K):K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(n.uiModule?.renderStatusBlockPanel)n.uiModule.renderStatusBlockPanel(K);else{let X=await y("uiComponentsModule");X?.StatusBlockPanel?X.StatusBlockPanel.renderTo(K):K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(n.uiModule?.renderYouyouReviewPanel)n.uiModule.renderYouyouReviewPanel(K);else{let X=await y("uiComponentsModule");X?.YouyouReviewPanel?X.YouyouReviewPanel.renderTo(K):K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await ct(re,K);break;default:K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let W=w.find(".yyt-sub-content");if(W.length){switch(v){case"config":ye(g,W);break;case"prompts":await bt(g,W);break;case"presets":Qe(g,W);break;default:W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Z()}}async function ct(g,v){if(!(!h()||!v?.length||!g?.id))try{let w=o.dynamicToolPanelCache.get(g.id);if(!w){let W=(await Promise.resolve().then(()=>(Ns(),Zr)))?.createToolConfigPanel;if(typeof W!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");w=W({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(g.id,w)}w.renderTo(v),Z()}catch(w){console.error(`[${a}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,w),v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function pe(g,v){if(!h())return;let w=n.toolRegistryModule?.getToolConfig(g);if(!w){v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let L=i.currentSubTab[g]||w.subTabs?.[0]?.id||"config";v.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${L}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),$e(g,L)}function ye(g,v){if(!h())return;let w=n.toolManagerModule?.getTool(g),L=n.presetManagerModule?.getAllPresets()||[],W=n.toolRegistryModule?.getToolApiPreset(g)||"",re=L.map(K=>`<option value="${b(K.name)}" ${K.name===W?"selected":""}>${b(K.name)}</option>`).join("");v.html(`
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
              ${re}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${w?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${w?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),v.find("#yyt-save-tool-preset").on("click",function(){let X=v.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(g,X);let me=s.toastr;me&&me.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function bt(g,v){let C=h(),w=n.promptEditorModule||await y("promptEditorModule");if(!C||!w){v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let W=n.toolManagerModule?.getTool(g)?.config?.messages||[],re=w.messagesToSegments?w.messagesToSegments(W):w.DEFAULT_PROMPT_SEGMENTS,K=new w.PromptEditor({containerId:`yyt-prompt-editor-${g}`,segments:re,onChange:me=>{let Te=w.segmentsToMessages?w.segmentsToMessages(me):[];u("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",Te.length,"\u6761\u6D88\u606F")}});v.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),K.init(v.find(`#yyt-prompt-editor-${g}`));let X=w.getPromptEditorStyles?w.getPromptEditorStyles():"";if(X){let me="yyt-prompt-editor-styles",Te=s.document||document;if(!Te.getElementById(me)){let Me=Te.createElement("style");Me.id=me,Me.textContent=X,(Te.head||Te.documentElement).appendChild(Me)}}}function Qe(g,v){h()&&v.html(`
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
    `)}function se(){if(i.currentPopup){u("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=h(),v=m();if(!g){p("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let C=n.toolRegistryModule?.getToolList()||[];if(!C.length){p("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}C.some(oe=>oe.id===i.currentMainTab)||(i.currentMainTab=C[0].id);let w=n.toolRegistryModule?.getToolConfig("tools"),L=Array.isArray(w?.subTabs)?w.subTabs:[],W=L.filter(oe=>oe?.isCustom).length,re=L.filter(oe=>!oe?.isCustom).length,K=E(i.currentMainTab),X=J(i.currentMainTab);i.currentOverlay=v.createElement("div"),i.currentOverlay.className="yyt-popup-overlay",i.currentOverlay.addEventListener("click",oe=>{oe.target===i.currentOverlay&&ve()}),v.body.appendChild(i.currentOverlay);let me=C.map(oe=>`
      <div class="yyt-main-nav-item ${oe.id===i.currentMainTab?"active":""}" data-tab="${oe.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${b(oe.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${b(oe.name||oe.id)}</span>
          <span class="yyt-main-nav-desc">${b(oe.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),Te=C.map(oe=>`
      <div class="yyt-tab-content ${oe.id===i.currentMainTab?"active":""}" data-tab="${oe.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),Me=`
      <div class="yyt-popup" id="${c}">
        <div class="yyt-popup-header">
          <div class="yyt-popup-brand">
            <div class="yyt-popup-title-row">
              <div class="yyt-popup-title">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>YouYou \u5DE5\u5177\u7BB1</span>
              </div>
              <span class="yyt-popup-version">v${r}</span>
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
                <div class="yyt-shell-heading">\u7EDF\u4E00\u5DE5\u5177\u5DE5\u4F5C\u53F0</div>
                <div class="yyt-shell-overview-text">\u5C06 API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001\u7834\u9650\u8BCD\u4E0E\u6267\u884C\u8BCA\u65AD\u6536\u53E3\u5230\u4E00\u4E2A\u66F4\u7D27\u51D1\u7684\u5DE5\u4F5C\u533A\u91CC\uFF0C\u4F18\u5148\u4FDD\u8BC1\u53EF\u8BFB\u6027\u548C\u53EF\u64CD\u4F5C\u7A7A\u95F4\u3002</div>
              </div>
              <div class="yyt-shell-topbar-side">
                <div class="yyt-shell-current-card">
                  <span class="yyt-shell-current-label">\u5F53\u524D\u9875\u9762</span>
                  <strong class="yyt-shell-current-page">${b(K)}</strong>
                  <span class="yyt-shell-current-desc">${b(X)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${C.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${re}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${W}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${C.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${me}
                  </div>
                  <div class="yyt-shell-sidebar-note">
                    \u4FDD\u5B58\u540E\uFF0C\u81EA\u52A8\u76D1\u542C\u3001\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
                  </div>
                </div>
              </aside>

              <section class="yyt-shell-main">
                <div class="yyt-shell-main-header">
                  <div class="yyt-shell-main-heading-block">
                    <div class="yyt-shell-main-label">\u5F53\u524D\u9875\u9762</div>
                    <div class="yyt-shell-main-title">${b(K)}</div>
                    <div class="yyt-shell-main-description">${b(X)}</div>
                  </div>
                  <div class="yyt-shell-main-actions">
                    <div class="yyt-shell-main-meta">
                      <i class="fa-solid fa-circle-info"></i>
                      <span>\u4FDD\u5B58\u540E\u81EA\u52A8\u76D1\u542C\u4E0E\u5199\u56DE\u94FE\u4F1A\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
                    </div>
                  </div>
                </div>

                <div class="yyt-sub-nav" style="display: none;">
                  <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
                </div>

                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${Te}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div class="yyt-popup-footer">
          <div class="yyt-popup-footer-left">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${b(K)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${a}-close-btn">\u5173\u95ED</button>
          </div>
        </div>
      </div>
    `,ke=v.createElement("div");ke.innerHTML=Me,i.currentPopup=ke.firstElementChild,v.body.appendChild(i.currentPopup),g(i.currentPopup).find(".yyt-popup-close").on("click",ve),g(i.currentPopup).find(`#${a}-close-btn`).on("click",ve),g(i.currentPopup).find(".yyt-main-nav-item").on("click",function(){let Ae=g(this).data("tab");Ae&&Se(Ae)}),xe(),Xe(i.currentMainTab);let xt=n.toolRegistryModule?.getToolConfig(i.currentMainTab);xt?.hasSubTabs&&(g(i.currentPopup).find(".yyt-sub-nav").show(),ze(i.currentMainTab,xt.subTabs)),D(),Z(),u("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:se,closePopup:ve,switchMainTab:Se,switchSubTab:Ue,renderTabContent:Xe,renderSubTabContent:$e}}function Aa(t,e={}){let{constants:s,modules:n}=t,{SCRIPT_ID:o,SCRIPT_VERSION:i}=s,{init:a,loadModules:r,loadLegacyModule:c,addMenuItem:l,popupShell:d}=e;return{version:i,id:o,init:a,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:l,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getUiComponents:()=>n.uiComponentsModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getToolTrigger:()=>n.toolTriggerModule,getAutoTriggerDiagnostics:u=>n.toolTriggerModule?.getAutoTriggerDiagnostics?.(u)||null,exportAutoTriggerDiagnostics:u=>n.toolTriggerModule?.exportAutoTriggerDiagnostics?.(u)||null,getGenerationTransactionDiagnostics:u=>n.toolTriggerModule?.getGenerationTransactionDiagnostics?.(u)||null,exportGenerationTransactionDiagnostics:u=>n.toolTriggerModule?.exportGenerationTransactionDiagnostics?.(u)||null,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getPromptEditor:()=>n.promptEditorModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,async loadLegacyModule(u){return typeof c!="function"?null:c(u)},async getApiConfig(){return await r(),n.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(u){return await r(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(u),!0):!1},async getPresets(){return await r(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(u,p){if(await r(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(u,p);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await r(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(u,p){return n.toolRegistryModule?.registerTool(u,p)||!1},unregisterTool(u){return n.toolRegistryModule?.unregisterTool(u)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(u){return n.windowManagerModule?.createWindow(u)||null},closeWindow(u){n.windowManagerModule?.closeWindow(u)}}}var Ks="youyou_toolkit",jd="0.6.2",Yd=`${Ks}-menu-item`,Wd=`${Ks}-menu-container`,Vd=`${Ks}-popup`,qd=typeof window.parent<"u"?window.parent:window,Hs={constants:{SCRIPT_ID:Ks,SCRIPT_VERSION:jd,MENU_ITEM_ID:Yd,MENU_CONTAINER_ID:Wd,POPUP_ID:Vd},topLevelWindow:qd,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},wa=_a(Hs),Wt=Ea(Hs,{openPopup:wa.openPopup});Hs.services.loadModules=Wt.loadModules;Hs.services.loadLegacyModule=Wt.loadLegacyModule;var vi=Aa(Hs,{init:Wt.init,loadModules:Wt.loadModules,loadLegacyModule:Wt.loadLegacyModule,addMenuItem:Wt.addMenuItem,popupShell:wa});if(typeof window<"u"&&(window.YouYouToolkit=vi,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=vi}catch{}var qp=vi;Wt.init();console.log(`[${Ks}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{qp as default};
