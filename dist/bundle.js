var Ua=Object.defineProperty;var X=(t,e)=>()=>(t&&(e=t(t=0)),e);var he=(t,e)=>{for(var s in e)Ua(t,s,{get:e[s],enumerable:!0})};function Ao(){let t=R;return t._getStorage(),t._storage}function Ro(){return R.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Mo(t){R.set("settings",t)}var xt,R,ee,wo,Ss,je=X(()=>{xt=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:n=>{let i=s.extensionSettings[this.namespace][n];return typeof i=="string"?i:i?JSON.stringify(i):null},setItem:(n,i)=>{s.extensionSettings[this.namespace][n]=i,this._saveSettings(s)},removeItem:n=>{delete s.extensionSettings[this.namespace][n],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(n){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let n=`${this.namespace}:${e}`;if(this._cache.has(n))return this._cache.get(n);let i=this._getStorage(),o=this._getFullKey(e),a=i.getItem(o);if(a===null)return s;try{let r=JSON.parse(a);return this._cache.set(n,r),r}catch{return a}}set(e,s){let n=this._getStorage(),i=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.set(o,s);try{n.setItem(i,JSON.stringify(s))}catch(a){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,a)}}remove(e){let s=this._getStorage(),n=this._getFullKey(e),i=`${this.namespace}:${e}`;this._cache.delete(i),s.removeItem(n)}has(e){let s=this._getStorage(),n=this._getFullKey(e);return s.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext();n?.extensionSettings?.[this.namespace]&&(n.extensionSettings[this.namespace]={},this._saveSettings(n))}}else{let s=`${this.namespace}_`,n=[];for(let i=0;i<localStorage.length;i++){let o=localStorage.key(i);o&&o.startsWith(s)&&n.push(o)}n.forEach(i=>localStorage.removeItem(i))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(n=>{s[n]=this.get(n)}),s}setMultiple(e){Object.entries(e).forEach(([s,n])=>{this.set(s,n)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([a,r])=>{s[a]=typeof r=="string"?JSON.parse(r):r})}}else{let n=`${this.namespace}_`;for(let i=0;i<localStorage.length;i++){let o=localStorage.key(i);if(o&&o.startsWith(n)){let a=o.slice(n.length);try{s[a]=JSON.parse(localStorage.getItem(o))}catch{s[a]=localStorage.getItem(o)}}}}return s}},R=new xt("youyou_toolkit"),ee=new xt("youyou_toolkit:tools"),wo=new xt("youyou_toolkit:presets"),Ss=new xt("youyou_toolkit:windows")});var ti={};he(ti,{DEFAULT_API_PRESETS:()=>Ka,DEFAULT_SETTINGS:()=>La,STORAGE_KEYS:()=>bs,StorageService:()=>xt,deepMerge:()=>Co,getCurrentPresetName:()=>Ha,getStorage:()=>Ao,loadApiPresets:()=>za,loadSettings:()=>Ro,presetStorage:()=>wo,saveApiPresets:()=>Fa,saveSettings:()=>Mo,setCurrentPresetName:()=>ja,storage:()=>R,toolStorage:()=>ee,windowStorage:()=>Ss});function za(){return R.get(bs.API_PRESETS)||[]}function Fa(t){R.set(bs.API_PRESETS,t)}function Ha(){return R.get(bs.CURRENT_PRESET)||""}function ja(t){R.set(bs.CURRENT_PRESET,t||"")}function Co(t,e){let s=i=>i&&typeof i=="object"&&!Array.isArray(i),n={...t};return s(t)&&s(e)&&Object.keys(e).forEach(i=>{s(e[i])?i in t?n[i]=Co(t[i],e[i]):Object.assign(n,{[i]:e[i]}):Object.assign(n,{[i]:e[i]})}),n}var bs,La,Ka,si=X(()=>{je();je();bs={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},La={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Ka=[]});var U,ni,L,Ee=X(()=>{U={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},ni=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,n={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:i=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:s,priority:i};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let n=this.listeners.get(e);if(n){for(let i of n)if(i.callback===s){n.delete(i);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let n=this.listeners.get(e);if(!n||n.size===0)return;let i=Array.from(n).sort((o,a)=>a.priority-o.priority);for(let{callback:o}of i)try{o(s)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,s){let n=i=>{this.off(e,n),s(i)};return this.on(e,n)}wait(e,s=0){return new Promise((n,i)=>{let o=null,a=this.once(e,r=>{o&&clearTimeout(o),n(r)});s>0&&(o=setTimeout(()=>{a(),i(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},L=new ni});function A(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function E(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Wa(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function nt(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:i=!1,noticeId:o=""}=s,a=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!a?.body){E(t,e,n);return}let r="yyt-top-notice-container",c="yyt-top-notice-styles",l=a.getElementById(r);if(l||(l=a.createElement("div"),l.id=r,l.style.cssText=`
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
    `,a.body.appendChild(l)),!a.getElementById(c)){let C=a.createElement("style");C.id=c,C.textContent=`
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
    `,a.head.appendChild(C)}if(o){let C=l.querySelector(`[data-notice-id="${o}"]`);C&&C.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(u.dataset.noticeId=o);let g=a.createElement("span");g.className="yyt-top-notice__icon",g.textContent=d[t]||d.info;let y=a.createElement("div");y.className="yyt-top-notice__content",y.textContent=e;let x=a.createElement("button");x.className="yyt-top-notice__close",x.type="button",x.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),x.textContent="\xD7";let b=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};x.addEventListener("click",b),u.appendChild(g),u.appendChild(y),u.appendChild(x),l.appendChild(u),i||setTimeout(b,n)}function Wa(t,e,s){let n=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!n)return;let i=n.getElementById("yyt-fallback-toast");i&&i.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=o[t]||o.info,r=n.createElement("div");if(r.id="yyt-fallback-toast",r.style.cssText=`
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
    `,n.head.appendChild(c)}n.body.appendChild(r),setTimeout(()=>{r.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{r.remove()},300)},s)}function Z(){if(Nt)return Nt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Nt=window.parent.jQuery,Nt}catch{}return window.jQuery&&(Nt=window.jQuery),Nt}function Va(){Nt=null}function te(t){return t&&t.length>0}function Et(t,e=m){if(!Z()||!te(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",i=t.find(`#${e}-model-select`);return i.is(":visible")&&(n=i.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Ot(t,e,s=m){if(!Z()||!te(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let i=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",i);let a=t.find(`#${s}-custom-api-fields`);i?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function ii(t){let{id:e,title:s,body:n,width:i="380px",wide:o=!1}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""}" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
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
  `}function oi(t,e,s={}){if(!Z())return()=>{};let i=t.find(`#${e}-overlay`),o=()=>{i.remove(),s.onClose&&s.onClose()};return i.find(`#${e}-close, #${e}-cancel`).on("click",o),i.on("click",function(a){a.target===this&&o()}),i.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(o)}),o}function pt(t,e){let s=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(s),i=document.createElement("a");i.href=n,i.download=e,i.click(),URL.revokeObjectURL(n)}function yt(t){return new Promise((e,s)=>{let n=new FileReader;n.onload=i=>e(i.target.result),n.onerror=i=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var m,Nt,it=X(()=>{m="youyou_toolkit";Nt=null});var vs,ge,ri=X(()=>{Ee();it();vs=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,L.emit(U.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,n={}){let i=Z();if(!i){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let a;if(typeof s=="string"?a=i(s):s&&s.jquery?a=s:s&&(a=i(s)),!te(a)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let r=o.render({...n,dependencies:this.dependencies});a.html(r),o.bindEvents(a,this.dependencies),this.activeInstances.set(e,{container:a,component:o,props:n}),L.emit(U.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,L.emit(U.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,L.emit(U.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,n)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let n=e.createElement("style");n.id=s,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){L.on(U.PRESET_UPDATED,()=>{}),L.on(U.TOOL_UPDATED,()=>{})}},ge=new vs});var No={};he(No,{API_STATUS:()=>Za,fetchAvailableModels:()=>pi,getApiConfig:()=>Tt,getEffectiveApiConfig:()=>xs,hasEffectiveApiPreset:()=>ci,sendApiRequest:()=>ui,sendWithPreset:()=>tl,testApiConnection:()=>al,updateApiConfig:()=>Qt,validateApiConfig:()=>Zt});function Ja(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function li(){return R.get(Do,Ja())}function Xa(t){R.set(Do,t)}function ko(){return R.get(Ya,[])}function Qa(){return R.get(qa,"")}function ai(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function Po(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let n=null;try{n=new URL(s)}catch{return s}let i=n.pathname.replace(/\/+$/,""),o=i;return e==="chat_completions"?!/\/chat\/completions$/i.test(i)&&!/\/completions$/i.test(i)&&(o=`${i||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(i)?o=i.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(i)?o=i.replace(/\/completions$/i,"/models"):/\/models$/i.test(i)||(o=`${i||""}/models`)),n.pathname=o.replace(/\/+/g,"/"),n.toString()}function el(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Tt(){return li().apiConfig||{}}function Qt(t){let e=li();e.apiConfig={...e.apiConfig,...t},Xa(e)}function Zt(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function xs(t=""){let e=li(),s=t||Qa()||"";if(s){let i=ko().find(o=>o.name===s);if(i&&i.apiConfig)return{...i.apiConfig,presetName:i.name}}return e.apiConfig||{}}function ci(t=""){return t?ko().some(s=>s?.name===t):!1}async function tl(t,e,s={},n=null){let i=xs(t);return await ui(e,{...s,apiConfig:i},n)}function Go(t,e={}){let s=e.apiConfig||Tt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function di(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function ui(t,e={},s=null){let n=e.apiConfig||Tt(),i=n.useMainApi,o=Zt(n);if(!o.valid&&!i)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return i?await sl(t,e,s):await nl(t,n,e,s)}async function sl(t,e,s){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let i=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof i!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return i.trim()}catch(i){throw i.name==="AbortError"?i:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${i.message}`)}}async function nl(t,e,s,n){let i=typeof window.parent<"u"?window.parent:window;if(i.TavernHelper?.generateRaw)try{return await il(t,e,s,n,i)}catch(o){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(i.SillyTavern?.getRequestHeaders)try{return await ol(t,e,s,n,i)}catch(o){if(!o?.allowDirectFallback)throw o}return await rl(t,e,s,n)}async function il(t,e,s,n,i){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await i.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:el(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof o=="string"?o.trim():di(o)}async function ol(t,e,s,n,i){let o=String(e.url||"").trim(),a={...Go(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},r={...typeof i.SillyTavern?.getRequestHeaders=="function"?i.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},c=null;try{c=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:r,body:JSON.stringify(a),signal:n})}catch(u){throw u?.name==="AbortError"?u:ai(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let l=await c.text().catch(()=>"");if(!c.ok){let u=[404,405,501,502].includes(c.status);throw ai(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${c.status}): ${l||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=l?JSON.parse(l):{}}catch{let g=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw ai(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${g||"(\u7A7A\u54CD\u5E94)"}`)}return di(d)}async function rl(t,e,s,n){let i=Go(t,{apiConfig:e,...s}),o=Po(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let r=await fetch(o,{method:"POST",headers:a,body:JSON.stringify(i),signal:n}),c=await r.text().catch(()=>"");if(!r.ok){let d=c||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${r.status}): ${d}`)}let l=null;try{l=c?JSON.parse(c):{}}catch{let u=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return di(l)}async function al(t=null){let e=t||Tt(),s=Date.now();try{await ui([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let i=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${i}ms)`,latency:i}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-s}}}async function pi(t=null){let e=t||Tt();return e.useMainApi?await ll():await cl(e)}async function ll(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function cl(t){if(!t.url||!t.apiKey)return[];try{let e=Po(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let n=await s.json();return n.data&&Array.isArray(n.data)?n.data.map(i=>i.id||i.name).filter(Boolean).sort():[]}catch{return[]}}var Do,Ya,qa,Za,Xs=X(()=>{je();Do="settings",Ya="api_presets",qa="current_preset";Za={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Uo={};he(Uo,{createPreset:()=>en,createPresetFromCurrentConfig:()=>fl,deletePreset:()=>tn,duplicatePreset:()=>gl,exportPresets:()=>hi,generateUniquePresetName:()=>bi,getActiveConfig:()=>mi,getActivePresetName:()=>sn,getAllPresets:()=>es,getPreset:()=>Bt,getPresetNames:()=>pl,getStarredPresets:()=>fi,importPresets:()=>Si,presetExists:()=>Es,renamePreset:()=>yl,switchToPreset:()=>Ut,togglePresetStar:()=>gi,updatePreset:()=>yi,validatePreset:()=>ml});function ul(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Bo(){return R.get(dl,ul())}function ke(){return R.get(Oo,[])}function $t(t){R.set(Oo,t)}function Zs(){return R.get($o,"")}function Qs(t){R.set($o,t||"")}function es(){return ke()}function pl(){return ke().map(e=>e.name)}function Bt(t){return!t||typeof t!="string"?null:ke().find(s=>s.name===t)||null}function Es(t){return!t||typeof t!="string"?!1:ke().some(s=>s.name===t)}function en(t){let{name:e,description:s,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=e.trim();if(Es(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let o={name:i,description:s||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=ke();return a.push(o),$t(a),{success:!0,message:`\u9884\u8BBE "${i}" \u521B\u5EFA\u6210\u529F`,preset:o}}function yi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ke(),n=s.findIndex(a=>a.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let i=s[n],o={...i,...e,name:i.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...i.apiConfig,...e.apiConfig}),s[n]=o,$t(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function tn(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ke(),s=e.findIndex(n=>n.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),$t(e),Zs()===t&&Qs(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function yl(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!Es(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Es(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n=ke(),i=n.find(o=>o.name===t);return i&&(i.name=s,i.updatedAt=Date.now(),$t(n),Zs()===t&&Qs(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function gl(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),n=Bt(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Es(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let i={...JSON.parse(JSON.stringify(n)),name:s,createdAt:Date.now(),updatedAt:Date.now()},o=ke();return o.push(i),$t(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:i}}function gi(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ke(),s=e.find(n=>n.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),$t(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function fi(){return ke().filter(e=>e.starred===!0)}function Ut(t){if(!t)return Qs(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Bt(t);return e?(Qs(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function sn(){return Zs()}function mi(){let t=Zs();if(t){let s=Bt(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:Bo().apiConfig||{}}}function hi(t=null){if(t){let s=Bt(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=ke();return JSON.stringify(e,null,2)}function Si(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(s)?s:[s];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=ke(),o=0;for(let a of n){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let r=i.findIndex(c=>c.name===a.name);r>=0?e.overwrite&&(a.updatedAt=Date.now(),i[r]=a,o++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),i.push(a),o++)}return o>0&&$t(i),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function fl(t,e=""){let s=Bo();return en({name:t,description:e,apiConfig:s.apiConfig})}function ml(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function bi(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=ke(),s=new Set(e.map(i=>i.name));if(!s.has(t))return t;let n=1;for(;s.has(`${t} (${n})`);)n++;return`${t} (${n})`}var dl,Oo,$o,nn=X(()=>{je();dl="settings",Oo="api_presets",$o="current_preset"});function on(t){return String(t||"").trim()}var ot,We,vi=X(()=>{Ee();it();Xs();nn();ot=null;We={id:"apiPresetPanel",render(t){let e=mi(),s=e?.apiConfig||Tt(),n=on(e?.presetName||sn()),i=es(),r=fi().slice(0,8),c=r.length>0?r.map(u=>this._renderPresetItem(u)).join(""):"",l=ot===null?n||"":on(ot),d=l||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${m}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${A(l)}">${A(d)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${l?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${i.length>0?i.map(u=>this._renderSelectOption(u,l)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${m}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${m}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${m}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${m}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${m}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${m}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${m}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${A(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${A(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${A(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(t,e){let s=t.starred===!0,n=s?"yyt-option-star yyt-starred":"yyt-option-star",i=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${A(t.name)}">
        <button class="${n}" data-preset="${A(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${i}</button>
        <span class="yyt-option-text">${A(t.name)}</span>
      </div>
    `},_renderApiConfigForm(t){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${m}-use-main-api" ${t.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${m}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${m}-api-url" 
                   value="${A(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${m}-api-key" 
                     value="${A(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${m}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${m}-model" 
                     value="${A(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${m}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${m}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${m}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${m}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${m}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${m}-preset-dropdown`),n=s.find(".yyt-select-trigger"),i=s.find(".yyt-select-value"),o=()=>{let a=String(i.data("value")||"").trim();if(!a){ot="",Ut(""),Ot(t,Tt(),m),t.find(".yyt-preset-item").removeClass("yyt-loaded"),E("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let r=Bt(a);if(!r){E("error",`\u9884\u8BBE "${a}" \u4E0D\u5B58\u5728`);return}ot=a,Ut(a),Ot(t,r.apiConfig,m),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),E("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${a}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};n.on("click",function(a){a.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",a=>{if(e(a.target).hasClass("yyt-option-star"))return;let r=e(a.currentTarget),c=r.data("value"),l=r.find(".yyt-option-text").text();ot=String(c||"").trim(),i.text(l).data("value",c),s.find(".yyt-select-option").removeClass("yyt-selected"),r.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${m}-load-preset`).on("click",()=>{o()}),s.find(".yyt-option-star").on("click",a=>{a.preventDefault(),a.stopPropagation();let r=e(a.currentTarget).data("preset");if(!r)return;let c=gi(r);if(c.success){E("success",c.message);let l=t.closest(".yyt-api-manager").parent();l.length&&this.renderTo(l)}else E("error",c.message)}),e(document).on("click.yyt-dropdown",a=>{e(a.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let i=e(s.currentTarget).data("preset-name"),o=e(s.target).closest("[data-action]").data("action");if(o)switch(s.stopPropagation(),o){case"load":t.find(".yyt-select-value").text(i).data("value",i),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${i.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${m}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${i}" \u5417\uFF1F`)){let a=tn(i);if(E(a.success?"info":"error",a.message),a.success){on(ot)===i&&(ot=null);let r=t.closest(".yyt-api-manager").parent();r.length&&this.renderTo(r)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${m}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),n=t.find(`#${m}-custom-api-fields`);s?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${m}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${m}-api-key`),n=s.attr("type");s.attr("type",n==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${m}-load-models`).on("click",async()=>{let s=t.find(`#${m}-load-models`),n=t.find(`#${m}-model`),i=t.find(`#${m}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=Et(t,m),a=await pi(o);if(a.length>0){i.empty(),a.forEach(c=>{i.append(`<option value="${A(c)}">${A(c)}</option>`)}),n.hide(),i.show();let r=n.val();r&&a.includes(r)&&i.val(r),i.off("change").on("change",function(){n.val(e(this).val())}),E("success",`\u5DF2\u52A0\u8F7D ${a.length} \u4E2A\u6A21\u578B`)}else E("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){E("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${m}-model`).on("focus",function(){let s=t.find(`#${m}-model-select`);e(this).show(),s.hide()}),t.find(`#${m}-save-api-config`).on("click",()=>{let s=Et(t,m),n=on(sn()),i=Zt(s);if(!i.valid&&!s.useMainApi){E("error",i.errors.join(", "));return}if(n){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${n}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){Qt(s),Ut(""),ot="",E("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a);return}Qt(s);let o=yi(n,{apiConfig:s});if(o.success){ot=n,E("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${n}"`),Ut(n),L.emit(U.PRESET_UPDATED,{name:n});let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}else E("error",o.message);return}Qt(s),E("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${m}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Ut(""),ot="",Qt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),E("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${m}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${m}-export-presets`).on("click",()=>{try{let s=hi();pt(s,`youyou_toolkit_presets_${Date.now()}.json`),E("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){E("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${m}-import-presets`).on("click",()=>{t.find(`#${m}-import-file`).click()}),t.find(`#${m}-import-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let i=await yt(n),o=Si(i,{overwrite:!0});if(E(o.success?"success":"error",o.message),o.imported>0){let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}catch(i){E("error",`\u5BFC\u5165\u5931\u8D25: ${i.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let n=es().map(d=>d.name),i=bi("\u65B0\u9884\u8BBE"),o=`
      <div class="yyt-dialog-overlay" id="${m}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${m}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${m}-dialog-preset-name" 
                     value="${A(i)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${m}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${m}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${m}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e(`#${m}-dialog-overlay`).remove(),t.append(o);let a=e(`#${m}-dialog-overlay`),r=e(`#${m}-dialog-preset-name`),c=e(`#${m}-dialog-preset-desc`);r.focus().select();let l=()=>a.remove();a.find(`#${m}-dialog-close, #${m}-dialog-cancel`).on("click",l),a.on("click",function(d){d.target===this&&l()}),a.find(`#${m}-dialog-save`).on("click",()=>{let d=r.val().trim(),u=c.val().trim();if(!d){E("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),r.focus();return}if(n.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;tn(d)}let g=Et(t,m),y=en({name:d,description:u,apiConfig:g});if(y.success){E("success",y.message),l(),L.emit(U.PRESET_CREATED,{preset:y.preset});let x=t.closest(".yyt-api-manager").parent();x.length&&this.renderTo(x)}else E("error",y.message)}),r.on("keypress",function(d){d.which===13&&a.find(`#${m}-dialog-save`).click()})},destroy(t){let e=Z();!e||!te(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Xo={};he(Xo,{MESSAGE_MACROS:()=>Jo,addTagRule:()=>ts,createRuleTemplate:()=>jo,default:()=>bl,deleteRulePreset:()=>Yo,deleteRuleTemplate:()=>Vo,deleteTagRule:()=>Ts,escapeRegex:()=>Lt,exportRulesConfig:()=>yn,extractComplexTag:()=>Ko,extractCurlyBraceTag:()=>_i,extractHtmlFormatTag:()=>zo,extractSimpleTag:()=>Ii,extractTagContent:()=>Kt,generateTagSuggestions:()=>ln,getAllRulePresets:()=>un,getAllRuleTemplates:()=>Fo,getContentBlacklist:()=>zt,getRuleTemplate:()=>Ho,getTagRules:()=>gt,importRulesConfig:()=>gn,isValidTagName:()=>Ti,loadRulePreset:()=>pn,saveRulesAsPreset:()=>dn,scanTextForTags:()=>an,setContentBlacklist:()=>Is,setTagRules:()=>cn,shouldSkipContent:()=>Ei,testRegex:()=>qo,updateRuleTemplate:()=>Wo,updateTagRule:()=>ss});function hl(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...xi],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Be(){return R.get(Lo,hl())}function rt(t){R.set(Lo,t)}function rn(){let t=Be();return Te=t.ruleTemplates||[...xi],ce=t.tagRules||[],Pe=t.contentBlacklist||[],{ruleTemplates:Te,tagRules:ce,contentBlacklist:Pe}}function Lt(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ei(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(n=>{let i=n.trim().toLowerCase();return i&&s.includes(i)})}function Ti(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!Sl.includes(t.toLowerCase())}function Ii(t,e){if(!t||!e)return[];let s=[],n=Lt(e),i=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(i)].forEach(c=>{c[1]&&s.push(c[1].trim())});let a=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,r=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>r&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-r} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function _i(t,e){if(!t||!e)return[];let s=[],n=Lt(e),i=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=i.exec(t))!==null;){let a=o.index,r=a+o[0].length,c=1,l=r;for(;l<t.length&&c>0;)t[l]==="{"?c++:t[l]==="}"&&c--,l++;if(c===0){let d=t.substring(r,l-1);d.trim()&&s.push(d.trim())}i.lastIndex=a+1}return s}function Ko(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=s[0].trim(),i=s[1].trim(),o=i.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${i}`),[];let a=o[1],r=new RegExp(`${Lt(n)}([\\s\\S]*?)<\\/${a}>`,"gi"),c=[];return[...t.matchAll(r)].forEach(d=>{d[1]&&c.push(d[1].trim())}),c}function zo(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=s[1],i=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&i.push(l[1].trim())});let r=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,c=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return r>c&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${r-c} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),i}function Kt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(d=>d.type==="exclude"&&d.enabled),i=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),o=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of n)try{let u=new RegExp(`<${Lt(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Lt(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:u})}let r=[];if(i.length>0)for(let d of i){let u=[];try{if(d.type==="include")u.push(...Ii(a,d.value)),u.push(..._i(a,d.value));else if(d.type==="regex_include"){let g=new RegExp(d.value,"gi");[...a.matchAll(g)].forEach(x=>{x[1]&&u.push(x[1])})}}catch(g){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:g})}u.forEach(g=>r.push(g.trim()))}else r.push(a);let c=[];for(let d of r){for(let u of o)try{let g=new RegExp(u.value,"gi");d=d.replace(g,"")}catch(g){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:g})}Ei(d,s)||c.push(d)}return c.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function an(t,e={}){let s=performance.now(),{chunkSize:n=5e4,maxTags:i=100,timeoutMs:o=5e3}=e,a=new Set,r=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,c=0,l=0;for(let u=0;u<t.length;u+=n){let g=t.slice(u,Math.min(u+n,t.length));if(l++,c+=g.length,performance.now()-s>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let y;for(;(y=r.exec(g))!==null&&a.size<i;){let x=(y[1]||y[2]).toLowerCase();Ti(x)&&a.add(x)}if(a.size>=i)break;l%5===0&&await new Promise(x=>setTimeout(x,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:c,totalChars:t.length,chunkCount:l,tagsFound:a.size}}}function ln(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Fo(){return Te.length===0&&rn(),Te}function Ho(t){return Te.find(e=>e.id===t)}function jo(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return Te.push(e),wi(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Wo(t,e){let s=Te.findIndex(n=>n.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Te[s]={...Te[s],...e,updatedAt:new Date().toISOString()},wi(),{success:!0,template:Te[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Vo(t){let e=Te.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Te.splice(e,1),wi(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function wi(){let t=Be();t.ruleTemplates=Te,rt(t)}function gt(){return ce||rn(),ce}function cn(t){ce=t||[];let e=Be();e.tagRules=ce,rt(e)}function ts(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};ce.push(e);let s=Be();return s.tagRules=ce,rt(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function ss(t,e){if(t<0||t>=ce.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ce[t]={...ce[t],...e};let s=Be();return s.tagRules=ce,rt(s),{success:!0,rule:ce[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Ts(t){if(t<0||t>=ce.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ce.splice(t,1);let e=Be();return e.tagRules=ce,rt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function zt(){return Pe||rn(),Pe}function Is(t){Pe=t||[];let e=Be();e.contentBlacklist=Pe,rt(e)}function dn(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Be();s.tagRulePresets||(s.tagRulePresets={});let n=`preset-${Date.now()}`;return s.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(ce)),blacklist:JSON.parse(JSON.stringify(Pe)),createdAt:new Date().toISOString()},rt(s),{success:!0,preset:s.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function un(){let e=Be().tagRulePresets||{};return Object.values(e)}function pn(t){let e=Be(),n=(e.tagRulePresets||{})[t];return n?(ce=JSON.parse(JSON.stringify(n.rules||[])),Pe=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=ce,e.contentBlacklist=Pe,rt(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Yo(t){let e=Be(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,rt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function yn(){return JSON.stringify({tagRules:ce,contentBlacklist:Pe,ruleTemplates:Te,tagRulePresets:Be().tagRulePresets||{}},null,2)}function gn(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)ce=s.tagRules||[],Pe=s.contentBlacklist||[],Te=s.ruleTemplates||xi;else if(s.tagRules&&ce.push(...s.tagRules),s.contentBlacklist){let i=new Set(Pe.map(o=>o.toLowerCase()));s.contentBlacklist.forEach(o=>{i.has(o.toLowerCase())||Pe.push(o)})}let n=Be();return n.tagRules=ce,n.contentBlacklist=Pe,n.ruleTemplates=Te,s.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...s.tagRulePresets}),rt(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function qo(t,e,s="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let i=new RegExp(t,s),o=[];if(s.includes("g")){let a;for(;(a=i.exec(e))!==null;)a.length>1?o.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[n]||a[1]||a[0]}):o.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=i.exec(e);a&&o.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[n]||a[1]:a[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(a=>a.extracted)}}catch(i){return{success:!1,error:i.message,matches:[]}}}var Lo,Sl,xi,Te,ce,Pe,Jo,bl,fn=X(()=>{je();Lo="settings";Sl=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],xi=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],Te=[],ce=[],Pe=[];Jo={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};rn();bl={extractTagContent:Kt,extractSimpleTag:Ii,extractCurlyBraceTag:_i,extractComplexTag:Ko,extractHtmlFormatTag:zo,escapeRegex:Lt,shouldSkipContent:Ei,isValidTagName:Ti,scanTextForTags:an,generateTagSuggestions:ln,getAllRuleTemplates:Fo,getRuleTemplate:Ho,createRuleTemplate:jo,updateRuleTemplate:Wo,deleteRuleTemplate:Vo,getTagRules:gt,setTagRules:cn,addTagRule:ts,updateTagRule:ss,deleteTagRule:Ts,getContentBlacklist:zt,setContentBlacklist:Is,saveRulesAsPreset:dn,getAllRulePresets:un,loadRulePreset:pn,deleteRulePreset:Yo,exportRulesConfig:yn,importRulesConfig:gn,testRegex:qo,MESSAGE_MACROS:Jo}});var Ve,Ai=X(()=>{Ee();it();fn();Ve={id:"regexExtractPanel",render(t){let e=gt(),s=zt(),n=un();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${m}-show-examples" style="margin-left: auto;">
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
            <button class="yyt-btn yyt-btn-secondary" id="${m}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${m}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${m}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${m}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${m}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${m}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${m}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(t,e,s){let n=t.length>0?t.map((o,a)=>this._renderRuleItem(o,a)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',i=s.length>0?s.map(o=>`<option value="${o.id}">${A(o.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${i?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${m}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${i}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${m}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${m}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${m}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${n}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${m}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${m}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${m}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${m}-content-blacklist" 
                 value="${A(e.join(", "))}" 
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
               value="${A(t.value||"")}">
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
          <textarea class="yyt-textarea" id="${m}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${m}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${m}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${m}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${m}-test-result"></div>
        </div>
      </div>
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),i=e(this).val();ss(n,{type:i}),E("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),i=e(this).val().trim();ss(n,{value:i})}),t.find(".yyt-rule-enabled").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),i=e(this).is(":checked");ss(n,{enabled:i}),E("info",i?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let n=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ts(n),this.renderTo(t),E("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let i=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ts(i),this.renderTo(t),E("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${m}-add-rule`).on("click",()=>{ts({type:"include",value:"",enabled:!0}),this.renderTo(t),E("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${m}-scan-tags`).on("click",async()=>{let s=t.find(`#${m}-scan-tags`),n=t.find(`#${m}-test-input`).val();if(!n||!n.trim()){E("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let i=await an(n,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:a}=ln(i,25);if(o.length===0){E("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${m}-tag-suggestions-container`).hide();return}let r=t.find(`#${m}-tag-list`);t.find(`#${m}-tag-scan-stats`).text(`${a.finalCount}/${a.totalFound} \u4E2A\u6807\u7B7E, ${i.stats.processingTimeMs}ms`),r.empty(),o.forEach(l=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${A(l)}</button>`);d.on("click",()=>{if(gt().some(y=>y.type==="include"&&y.value===l)){E("warning",`\u89C4\u5219 "\u5305\u542B: ${l}" \u5DF2\u5B58\u5728`);return}ts({type:"include",value:l,enabled:!0}),this.renderTo(t),E("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${l}"`)}),r.append(d)}),t.find(`#${m}-tag-suggestions-container`).show(),E("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(i){E("error",`\u626B\u63CF\u5931\u8D25: ${i.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${m}-add-exclude-cot`).on("click",()=>{let s=gt(),n="<!--[\\s\\S]*?-->";if(s.some(o=>o.type==="regex_exclude"&&o.value===n)){E("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}ts({type:"regex_exclude",value:n,enabled:!0}),this.renderTo(t),E("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${m}-content-blacklist`).on("change",function(){let n=e(this).val().split(",").map(i=>i.trim()).filter(i=>i);Is(n),E("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${n.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${m}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.find(`#${m}-load-rule-preset`).on("click",()=>{let s=t.find(`#${m}-rule-preset-select`).val();if(!s){E("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let n=pn(s);n.success?(this.renderTo(t),E("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${n.preset.name}`),L.emit(U.REGEX_PRESET_LOADED,{preset:n.preset})):E("error",n.message)}),t.find(`#${m}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let n=dn(s.trim());n.success?(this.renderTo(t),E("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):E("error",n.message)})},_bindTestEvents(t,e){t.find(`#${m}-test-extract`).on("click",()=>{let s=t.find(`#${m}-test-input`).val();if(!s||!s.trim()){E("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let n=gt(),i=zt(),o=Kt(s,n,i),a=t.find(`#${m}-test-result-container`),r=t.find(`#${m}-test-result`);a.show(),!o||!o.trim()?(r.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),E("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(r.html(`<pre class="yyt-code-block">${A(o)}</pre>`),E("success","\u63D0\u53D6\u5B8C\u6210"),L.emit(U.REGEX_EXTRACTED,{result:o}))}),t.find(`#${m}-test-clear`).on("click",()=>{t.find(`#${m}-test-input`).val(""),t.find(`#${m}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${m}-import-rules`).on("click",()=>{t.find(`#${m}-import-rules-file`).click()}),t.find(`#${m}-import-rules-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let i=await yt(n),o=gn(i,{overwrite:!0});o.success?(this.renderTo(t),E("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):E("error",o.message)}catch(i){E("error",`\u5BFC\u5165\u5931\u8D25: ${i.message}`)}e(s.target).val("")}}),t.find(`#${m}-export-rules`).on("click",()=>{try{let s=yn();pt(s,`youyou_toolkit_rules_${Date.now()}.json`),E("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){E("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${m}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(cn([]),Is([]),this.renderTo(t),E("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Qo={};he(Qo,{DEFAULT_TOOL_PRESETS:()=>at,DEFAULT_TOOL_STRUCTURE:()=>we,TOOL_STORAGE_KEYS:()=>re,cloneTool:()=>El,createDefaultToolDefinition:()=>_s,deleteTool:()=>Mi,deleteToolPreset:()=>_l,exportTools:()=>ki,getAllToolPresets:()=>Di,getAllTools:()=>Ft,getCurrentToolPresetId:()=>wl,getTool:()=>is,getToolPreset:()=>Tl,importTools:()=>Pi,normalizeToolDefinitionToRuntimeConfig:()=>mn,resetTools:()=>Gi,saveTool:()=>hn,saveToolPreset:()=>Il,setCurrentToolPreset:()=>Al,setToolEnabled:()=>Ci,validateTool:()=>Rl});function ns(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Ri(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function vl(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function xl(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let n=vl(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function _s(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...we,...t,id:t?.id||we.id,icon:t?.icon||we.icon,order:Number.isFinite(t?.order)?t.order:we.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:we.promptTemplate,extractTags:ns(t?.extractTags),config:{...we.config,...s,trigger:{...we.config.trigger,...s.trigger||{},events:ns(s?.trigger?.events)},execution:{...we.config.execution,...s.execution||{},timeout:Ri(s?.execution?.timeout,we.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||we.config.execution.retries)},api:{...we.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...we.config.context,...s.context||{},depth:Ri(s?.context?.depth,we.config.context.depth),includeTags:ns(s?.context?.includeTags),excludeTags:ns(s?.context?.excludeTags)}},enabled:t?.enabled!==!1,metadata:{...we.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function mn(t,e={},s={}){let n=_s({...e,id:t||e?.id||""}),i=ns(n?.config?.trigger?.events),o=ns(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),a=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),r=xl(t,n),c=i[0]||"GENERATION_ENDED",l=i.includes("GENERATION_ENDED"),d=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,trigger:{event:c,enabled:l},bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:d,apiPreset:a,overwrite:!0,enabled:d==="post_response_api"?l:!1},extraction:{enabled:!0,maxMessages:Ri(n?.config?.context?.depth,5),selectors:o},promptTemplate:r,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:a,extractTags:o,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function Ft(){let t=ee.get(re.TOOLS),e=t&&typeof t=="object"?{...at,...t}:{...at};return Object.fromEntries(Object.entries(e).map(([s,n])=>[s,_s({...n||{},id:s})]))}function is(t){return Ft()[t]||null}function hn(t,e){if(!t||!e)return!1;let s=ee.get(re.TOOLS)||{},n=!s[t]&&!at[t],i=_s({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=i,ee.set(re.TOOLS,s),L.emit(n?U.TOOL_REGISTERED:U.TOOL_UPDATED,{toolId:t,tool:i}),!0}function Mi(t){if(at[t])return!1;let e=ee.get(re.TOOLS)||{};return e[t]?(delete e[t],ee.set(re.TOOLS,e),L.emit(U.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function Ci(t,e){let s=is(t);if(!s)return!1;let n=ee.get(re.TOOLS)||{};return n[t]||(n[t]={...s}),n[t].enabled=e,n[t].metadata={...n[t].metadata,updatedAt:new Date().toISOString()},ee.set(re.TOOLS,n),L.emit(e?U.TOOL_ENABLED:U.TOOL_DISABLED,{toolId:t}),!0}function El(t,e,s){let n=is(t);if(!n)return!1;let i=JSON.parse(JSON.stringify(n));return i.name=s||`${n.name} (\u526F\u672C)`,i.metadata={...i.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},hn(e,i)}function Di(){let t=ee.get(re.PRESETS);return t&&typeof t=="object"?{...at,...t}:{...at}}function Tl(t){return Di()[t]||null}function Il(t,e){if(!t||!e)return!1;let s=ee.get(re.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},ee.set(re.PRESETS,s),!0}function _l(t){if(at[t])return!1;let e=ee.get(re.PRESETS)||{};return e[t]?(delete e[t],ee.set(re.PRESETS,e),!0):!1}function wl(){return ee.get(re.CURRENT_PRESET)||null}function Al(t){return Di()[t]?(ee.set(re.CURRENT_PRESET,t),!0):!1}function ki(){let t=ee.get(re.TOOLS)||{},e=ee.get(re.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Pi(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let i=s?{}:ee.get(re.TOOLS)||{},o=s?{}:ee.get(re.PRESETS)||{},a=0,r=0;if(n.tools&&typeof n.tools=="object"){for(let[c,l]of Object.entries(n.tools))at[c]&&!s||l&&typeof l=="object"&&(i[c]=_s({...l,id:c}),a++);ee.set(re.TOOLS,i)}if(n.presets&&typeof n.presets=="object"){for(let[c,l]of Object.entries(n.presets))at[c]&&!s||l&&typeof l=="object"&&(o[c]=l,r++);ee.set(re.PRESETS,o)}return{success:!0,toolsImported:a,presetsImported:r,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${r} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Gi(){ee.remove(re.TOOLS),ee.remove(re.PRESETS),ee.remove(re.CURRENT_PRESET)}function Rl(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:n,api:i,context:o}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),n&&((typeof n.timeout!="number"||n.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof n.retries!="number"||n.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var we,at,re,Sn=X(()=>{je();Ee();we={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},at={},re={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var fr={};he(fr,{TOOL_CATEGORIES:()=>Zo,TOOL_REGISTRY:()=>os,appendToolRuntimeHistory:()=>Ms,clearToolApiPreset:()=>lr,default:()=>Ol,ensureToolRuntimeConfig:()=>vn,getAllDefaultToolConfigs:()=>pr,getAllToolApiBindings:()=>cr,getAllToolFullConfigs:()=>Li,getEnabledTools:()=>as,getToolApiPreset:()=>Bi,getToolBaseConfig:()=>bn,getToolConfig:()=>Rs,getToolFullConfig:()=>ye,getToolList:()=>ir,getToolSubTabs:()=>or,getToolWindowState:()=>gr,hasTool:()=>$i,onPresetDeleted:()=>dr,patchToolRuntime:()=>rs,registerTool:()=>sr,resetToolConfig:()=>ur,resetToolRegistry:()=>rr,saveToolConfig:()=>ct,saveToolWindowState:()=>yr,setToolApiPreset:()=>ar,setToolApiPresetConfig:()=>Pl,setToolBypassConfig:()=>Gl,setToolOutputMode:()=>kl,setToolPromptTemplate:()=>Nl,unregisterTool:()=>nr,updateToolRuntime:()=>Ui});function ws(t={}){let e=Array.isArray(t?.recentTriggerHistory)?t.recentTriggerHistory.filter(Boolean):[],s=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0,lastTriggerAt:0,lastTriggerEvent:"",lastMessageKey:"",lastExecutionKey:"",lastSkipReason:"",lastExecutionPath:"",lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:"",lastSlotRevisionKey:"",lastSlotTransactionId:"",lastSourceMessageId:"",lastSourceSwipeId:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0,lastTraceId:"",...t,recentTriggerHistory:e,recentWritebackHistory:s}}function Ml(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function er(){let t=Ft()||{};return Object.entries(t).filter(([e])=>!As[e]).map(([e,s])=>[e,s||{}])}function tr(){let t=Array.isArray(os.tools?.subTabs)?[...os.tools.subTabs]:[],e=er().map(([s,n],i)=>{let o=mn(s,n);return{id:s,name:o.name||s,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+i,isCustom:!0,description:o.description||""}});return[...t,...e].sort((s,n)=>(s.order??0)-(n.order??0))}function Cl(t,e={}){let s=mn(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:ws(s.runtime)}}function Oi(t){let e=As[t];if(e)return{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:ws(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=(Ft()||{})[t]||null;return n?Cl(t,n):Rs(t)}function bn(t){let e=Oi(t);return e?{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Dl(t,e={},s=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.trigger={...t.trigger||{},...e.trigger||{}},n.output={...t.output||{},...e.output||{}},n.bypass={...t.bypass||{},...e.bypass||{}},n.runtime=ws({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}};let i=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||s||"";return n.output={...n.output||{},apiPreset:i},n.apiPreset=i,(!Array.isArray(n.extraction.selectors)||n.extraction.selectors.length===0)&&Array.isArray(n.extractTags)&&n.extractTags.length>0&&(n.extraction.selectors=[...n.extractTags]),(!Array.isArray(n.extractTags)||n.extractTags.length===0)&&(n.extractTags=Array.isArray(n.extraction.selectors)?[...n.extraction.selectors]:[]),t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function sr(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let n of s)if(!e[n])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return lt[t]={id:t,...e,order:e.order??Object.keys(lt).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function nr(t){return lt[t]?(delete lt[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function ir(t=!0){let e=Object.values(lt).map(s=>s.id==="tools"?{...s,subTabs:tr()}:s);return t?e.sort((s,n)=>(s.order??0)-(n.order??0)):e}function Rs(t){return t==="tools"&&lt[t]?{...lt[t],subTabs:tr()}:lt[t]||null}function $i(t){return!!lt[t]}function or(t){let e=Rs(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function rr(){lt={...os},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function ar(t,e){if(!$i(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=R.get(Fe)||{};return s[t]=e||"",R.set(Fe,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Bi(t){return(R.get(Fe)||{})[t]||""}function lr(t){let e=R.get(Fe)||{};delete e[t],R.set(Fe,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function cr(){return R.get(Fe)||{}}function dr(t){let e=R.get(Fe)||{},s=!1;for(let n in e)e[n]===t&&(e[n]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&R.set(Fe,e)}function ye(t){let e=Oi(t);if(!e)return Rs(t);let n=(R.get(Ht)||{})[t]||{},i=Bi(t);return Dl({...e,id:t},n,i)}function vn(t){if(!t)return!1;let e=Oi(t);if(!e)return!1;let s=R.get(Ht)||{};if(s[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};s[t]=n,R.set(Ht,s);let i=R.get(Fe)||{};return i[t]=n.output?.apiPreset||n.apiPreset||"",R.set(Fe,i),L.emit(U.TOOL_UPDATED,{toolId:t,config:n}),!0}function ct(t,e,s={}){if(!t||!ye(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=s,i=R.get(Ht)||{},o=R.get(Fe)||{},a=e?.output?.apiPreset??e?.apiPreset??"",r=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return i[t]={},r.forEach(c=>{if(e[c]!==void 0){if(c==="output"&&e.output){i[t][c]={...e.output,apiPreset:a};return}if(c==="apiPreset"){i[t][c]=a;return}i[t][c]=e[c]}}),i[t].apiPreset===void 0&&(i[t].apiPreset=a),!i[t].output&&e.output!==void 0&&(i[t].output={...e.output||{},apiPreset:a}),R.set(Ht,i),o[t]=a,R.set(Fe,o),n&&L.emit(U.TOOL_UPDATED,{toolId:t,config:i[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function kl(t,e){let s=ye(t);return s?ct(t,{...s,output:{...s.output,mode:e}}):!1}function Pl(t,e){let s=ye(t);return s?ct(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function Gl(t,e){let s=ye(t);return s?ct(t,{...s,bypass:{...s.bypass,...e}}):!1}function Nl(t,e){let s=ye(t);return s?ct(t,{...s,promptTemplate:e}):!1}function rs(t,e,s={}){let n=ye(t);if(!n)return!1;let{touchLastRunAt:i=!1,emitEvent:o=!1}=s,a=ws({...n.runtime||{},...e||{}});return i&&(a.lastRunAt=Date.now()),ct(t,{...n,runtime:a},{emitEvent:o})}function Ms(t,e,s={},n={}){let i=ye(t);if(!i)return!1;let{limit:o=10,emitEvent:a=!1}=n,r=ws(i.runtime||{}),c=e==="writeback"?"recentWritebackHistory":"recentTriggerHistory",l={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return r[c]=Ml([...Array.isArray(r[c])?r[c]:[],l],o),l?.traceId&&(r.lastTraceId=l.traceId),ct(t,{...i,runtime:r},{emitEvent:a})}function Ui(t,e){return rs(t,e,{touchLastRunAt:!0,emitEvent:!0})}function ur(t){if(!t||!As[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=R.get(Ht)||{};return delete e[t],R.set(Ht,e),L.emit(U.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function pr(){return{...As}}function Li(){let t=new Set([...Object.keys(As),...er().map(([e])=>e)]);return Array.from(t).map(e=>ye(e)).filter(Boolean)}function as(){return Li().filter(t=>t&&t.enabled)}function yr(t,e){let s=R.get(Ni)||{};s[t]={...e,updatedAt:Date.now()},R.set(Ni,s)}function gr(t){return(R.get(Ni)||{})[t]||null}var Ht,Fe,Ni,As,os,Zo,lt,Ol,ls=X(()=>{je();Ee();Sn();Ht="tool_configs",Fe="tool_api_bindings",Ni="tool_window_states";As={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},os={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},Zo={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},lt={...os};Ol={TOOL_REGISTRY:os,TOOL_CATEGORIES:Zo,registerTool:sr,unregisterTool:nr,getToolList:ir,getToolConfig:Rs,hasTool:$i,getToolSubTabs:or,resetToolRegistry:rr,setToolApiPreset:ar,getToolApiPreset:Bi,clearToolApiPreset:lr,getAllToolApiBindings:cr,onPresetDeleted:dr,saveToolWindowState:yr,getToolWindowState:gr,getToolBaseConfig:bn,ensureToolRuntimeConfig:vn,getToolFullConfig:ye,patchToolRuntime:rs,appendToolRuntimeHistory:Ms,saveToolConfig:ct,resetToolConfig:ur,getAllDefaultToolConfigs:pr,getAllToolFullConfigs:Li,getEnabledTools:as}});var Ye,Ki=X(()=>{it();Sn();ls();Ye={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){E("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=Ft(),s=Object.entries(e),n=s.filter(([,i])=>i?.enabled!==!1).length;return`
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
            <span class="yyt-tool-name">${A(n.name)}</span>
            <span class="yyt-tool-category">${A(n.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${n.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${A(n.description)}</div>
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
      `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item"),i=n.data("tool-id"),o=e(s.currentTarget).is(":checked");Ci(i,o),n.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),E("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(n)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,n)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),i=is(n);if(!n||!i||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${i.name}\u201D\u5417\uFF1F`))return;if(!Mi(n)){E("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),E("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let i=await yt(n),o=Pi(i,{overwrite:!1});E(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(i){E("error",`\u5BFC\u5165\u5931\u8D25: ${i.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=ki();pt(s,`youyou_toolkit_tools_${Date.now()}.json`),E("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){E("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Gi(),this.renderTo(t),E("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let n=s?is(s):null,i=!!n,o=`
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${i?"\u7F16\u8F91\u5DE5\u5177":"\u65B0\u5EFA\u5DE5\u5177"}</span>
            <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5DE5\u5177\u540D\u79F0</label>
                <input type="text" class="yyt-input" id="yyt-tool-name" 
                       value="${n?A(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${n?A(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(o);let a=e("#yyt-tool-dialog-overlay"),r=()=>a.remove();a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",r),a.on("click",function(c){c.target===this&&r()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let c=e("#yyt-tool-name").val().trim(),l=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),u=parseInt(e("#yyt-tool-timeout").val())||6e4,g=parseInt(e("#yyt-tool-retries").val())||3;if(!c){E("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let y=s||`tool_${Date.now()}`;if(!hn(y,{name:c,category:l,description:d,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{trigger:n?.config?.trigger||{type:"manual",events:[]},execution:{timeout:u,retries:g},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]}},enabled:n?.enabled!==!1})){E("error",i?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}vn(y),r(),this.renderTo(t),E("success",i?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),i||this._openToolConfig(y)})},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var mr={};he(mr,{BypassManager:()=>xn,DEFAULT_BYPASS_PRESETS:()=>mt,addMessage:()=>Vl,buildBypassMessages:()=>Ql,bypassManager:()=>V,createPreset:()=>Ll,default:()=>Zl,deleteMessage:()=>ql,deletePreset:()=>zl,duplicatePreset:()=>Fl,exportPresets:()=>Jl,getAllPresets:()=>Bl,getDefaultPresetId:()=>Hl,getEnabledMessages:()=>Wl,getPreset:()=>Ul,getPresetList:()=>Fi,importPresets:()=>Xl,setDefaultPresetId:()=>jl,updateMessage:()=>Yl,updatePreset:()=>Kl});var ft,cs,zi,mt,$l,xn,V,Bl,Fi,Ul,Ll,Kl,zl,Fl,Hl,jl,Wl,Vl,Yl,ql,Jl,Xl,Ql,Zl,Cs=X(()=>{je();Ee();ft="bypass_presets",cs="default_bypass_preset",zi="current_bypass_preset",mt={},$l=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),xn=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=R.get(ft,{});return this._cache={...mt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,n)=>(n.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:n,description:i,messages:o}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=s.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let r={id:a,name:n.trim(),description:i||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,r),L.emit(U.BYPASS_PRESET_CREATED,{presetId:a,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:r}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let i={...n,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,i),L.emit(U.BYPASS_PRESET_UPDATED,{presetId:e,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:i}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(mt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=R.get(ft,{});return delete n[e],R.set(ft,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),L.emit(U.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,n){let i=this.getPreset(e);if(!i)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(i)),id:s.trim(),name:n||`${i.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),o),L.emit(U.BYPASS_PRESET_CREATED,{presetId:s,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let i={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},o=[...n.messages||[],i];return this.updatePreset(e,{messages:o})}updateMessage(e,s,n){let i=this.getPreset(e);if(!i)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=i.messages||[],a=o.findIndex(c=>c.id===s);if(a===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let r=[...o];return r[a]={...r[a],...n},this.updatePreset(e,{messages:r})}deleteMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let i=n.messages||[],o=i.find(r=>r.id===s);if(!o)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=i.filter(r=>r.id!==s);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=R.get(cs,null);return e==="undefined"||e==="null"||e===""?(R.remove(cs),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(R.set(cs,e),L.emit(U.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:n=!1}=s,i;try{i=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(i)?i:i.presets?i.presets:[i];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let a=R.get(ft,{}),r=0;for(let c of o)!c.id||typeof c.id!="string"||c.name&&(mt[c.id]&&!n||!n&&a[c.id]||(a[c.id]={...c,updatedAt:Date.now()},r++));return r>0&&(R.set(ft,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${r} \u4E2A\u9884\u8BBE`,imported:r}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let n=R.get(ft,{});n[e]=s,R.set(ft,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=R.get(ft,{}),s={},n=!1,i=Array.isArray(e)?e.map((o,a)=>[o?.id||o?.name||`legacy_${a}`,o]):Object.entries(e||{});for(let[o,a]of i){let r=this._normalizePreset(o,a,s);if(!r){n=!0;continue}s[r.id]=r,(!e?.[r.id]||e?.[r.id]?.id!==r.id)&&(n=!0)}n&&R.set(ft,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,n={}){if(!s||typeof s!="object")return null;let i=typeof s.name=="string"?s.name.trim():"",o=typeof s.id=="string"?s.id.trim():"",a=typeof e=="string"?e.trim():"";if(!i&&a&&a!=="undefined"&&a!=="null"&&(i=a),this._isLegacySamplePreset(i,o)||(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),!o&&i&&i!=="undefined"&&i!=="null"&&(o=this._generatePresetId(i,n)),!i||!o||o==="undefined"||i==="undefined"))return null;let c=Array.isArray(s.messages)?s.messages.filter(l=>l&&typeof l=="object").map((l,d)=>({id:typeof l.id=="string"&&l.id.trim()?l.id.trim():`${o}_msg_${d+1}`,role:l.role||"SYSTEM",content:typeof l.content=="string"?l.content:"",enabled:l.enabled!==!1,deletable:l.deletable!==!1})):[];return{...s,id:o,name:i,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:c,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=R.get(cs,null),n=R.get(zi,null),i=s??n;(i==="undefined"||i==="null"||i==="")&&(i=null),i&&!e[i]&&(i=Object.values(e).find(a=>a.name===i)?.id||null),i?R.set(cs,i):R.remove(cs),R.has(zi)&&R.remove(zi)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||$l.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,i=n,o=1;for(;s[i];)i=`${n}_${o++}`;return i}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},V=new xn,Bl=()=>V.getAllPresets(),Fi=()=>V.getPresetList(),Ul=t=>V.getPreset(t),Ll=t=>V.createPreset(t),Kl=(t,e)=>V.updatePreset(t,e),zl=t=>V.deletePreset(t),Fl=(t,e,s)=>V.duplicatePreset(t,e,s),Hl=()=>V.getDefaultPresetId(),jl=t=>V.setDefaultPresetId(t),Wl=t=>V.getEnabledMessages(t),Vl=(t,e)=>V.addMessage(t,e),Yl=(t,e,s)=>V.updateMessage(t,e,s),ql=(t,e)=>V.deleteMessage(t,e),Jl=t=>V.exportPresets(t),Xl=(t,e)=>V.importPresets(t,e),Ql=t=>V.buildBypassMessages(t),Zl=V});var hr={};he(hr,{DEFAULT_SETTINGS:()=>Ds,SettingsService:()=>En,default:()=>ec,settingsService:()=>Ue});var Ds,Hi,En,Ue,ec,ks=X(()=>{je();Ee();Ds={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!1,debounceMs:300,useMessageReceivedFallback:!0,useGenerationAfterCommandsFallback:!0,messageSessionWindowMs:1800,historyRetentionLimit:10},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},Hi="settings_v2",En=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=R.get(Hi,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),R.set(Hi,this._cache),L.emit(U.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),n=this._deepMerge(s,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Ds)),R.set(Hi,this._cache),L.emit(U.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let n=this.getSettings(),i=e.split("."),o=n;for(let a of i)if(o&&typeof o=="object"&&a in o)o=o[a];else return s;return o}set(e,s){let n=JSON.parse(JSON.stringify(this.getSettings())),i=e.split("."),o=n;for(let a=0;a<i.length-1;a++){let r=i[a];r in o||(o[r]={}),o=o[r]}o[i[i.length-1]]=s,this.saveSettings(n)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Ds)),e)}_deepMerge(e,s){let n={...e};for(let i in s)s[i]&&typeof s[i]=="object"&&!Array.isArray(s[i])?n[i]=this._deepMerge(e[i]||{},s[i]):n[i]=s[i];return n}},Ue=new En,ec=Ue});var br={};he(br,{ContextInjector:()=>_n,DEFAULT_INJECTION_OPTIONS:()=>Sr,WRITEBACK_METHODS:()=>Ie,WRITEBACK_RESULT_STATUS:()=>In,contextInjector:()=>wn,default:()=>nc});function ji(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function It(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}var qe,Tn,Sr,In,Ie,tc,sc,_n,wn,nc,Wi=X(()=>{Ee();qe="YouYouToolkit_toolOutputs",Tn="YouYouToolkit_injectedContext",Sr={overwrite:!0,enabled:!0};In={SUCCESS:"success",FAILED:"failed"},Ie={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},tc=60,sc=3;_n=class{constructor(){this.debugMode=!1}async inject(e,s,n={}){return(await this.injectDetailed(e,s,n)).success}async injectDetailed(e,s,n={}){let i={...Sr,...n},o=this._createWritebackResult(e,i);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;if(!ji(i.sourceMessageId))return this._log("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),o.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",o;let a=o.chatId,r={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:i.sourceMessageId||null,sourceSwipeId:i.sourceSwipeId||i.effectiveSwipeId||null,options:i};L.emit(U.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:r.content,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId,effectiveSwipeId:r.sourceSwipeId,slotBindingKey:i.slotBindingKey||"",slotRevisionKey:i.slotRevisionKey||"",slotTransactionId:i.slotTransactionId||"",traceId:i.traceId||"",sessionKey:i.sessionKey||"",options:i});let c=await this._insertToolOutputToBoundAssistantSlot(e,r,i,o);return c.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,c),c}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),n=this._findAssistantMessageIndex(s,e);if(n<0)return"";let i=s[n]||{},o=i[Tn];if(typeof o=="string"&&o.trim())return o.trim();let a=i[qe];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let i=(e[s]||{})[qe];return i&&typeof i=="object"?i:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:n}=this._getChatRuntime(),i=this._findAssistantMessageIndex(n,null);return i<0?null:n[i]?.[qe]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:n,context:i,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let r=o[a],c=r?.[qe];if(!c||!c[s])return!1;delete c[s],r[qe]=c,r[Tn]=this._buildMessageInjectedContext(c);let l=i?.saveChat||n?.saveChat||null;return typeof l=="function"&&await l.call(i||n),L.emit(U.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(n){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",n),!1}}async clearAllContext(e){try{let{api:s,context:n,chat:i}=this._getChatRuntime(),o=this._findAssistantMessageIndex(i,null);if(o<0)return!1;let a=i[o];delete a[qe],delete a[Tn];let r=n?.saveChat||s?.saveChat||null;return typeof r=="function"&&await r.call(n||s),L.emit(U.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),n=Object.entries(s).map(([i,o])=>({toolId:i,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,n=s?.getContext?.()||null,i=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(s?.chat)?s.chat:[],a=i.length?i:o;return{topWindow:e,api:s,context:n,chat:a,contextChat:i,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let n=Ie.SET_CHAT_MESSAGE;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,effectiveSwipeId:s.effectiveSwipeId||s.sourceSwipeId||null,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Ie.NONE,commit:{preferredMethod:n,attemptedMethods:[],appliedMethod:Ie.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:In.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,n,i,o,a=null){let r=e?.contextChat?.[n]||e?.apiChat?.[n]||s?.[n]||a||null,c=this._getWritableMessageField(r).text||"",l=r?.[qe]?.[i],d=o?c.includes(o):!0,u=!!(l&&String(l.content||"").trim()===o);return{latestMessage:r,latestText:c,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,n,i,o,a=null){let r=1,c=this._collectWritebackVerification(e,s,n,i,o,a);for(let l=0;l<sc;l+=1){if(c.textIncludesContent&&c.mirrorStored)return{...c,refreshConfirmed:!0,confirmChecks:r,confirmedBy:"text_and_mirror_present"};await this._wait(tc),r+=1,c=this._collectWritebackVerification(e,s,n,i,o,a)}return{...c,refreshConfirmed:c.textIncludesContent&&c.mirrorStored,confirmChecks:r,confirmedBy:c.textIncludesContent&&c.mirrorStored?"text_and_mirror_present":""}}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let n=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,s){let n=String(e||""),i=String(s||"").trim();return i?n.includes(i)?{text:n.replace(i,"").trimEnd(),removed:!0}:{text:n,removed:!1}:{text:n,removed:!1}}_syncMessageToRuntimeChats(e,s,n){let{contextChat:i,apiChat:o}=e||{},a=r=>{!Array.isArray(r)||s<0||s>=r.length||r[s]!==n&&(r[s]={...r[s]||{},...n})};a(i),a(o)}_notifyMessageUpdated(e,s){try{let{api:n,topWindow:i}=e||{},o=n?.eventSource||null,r=(n?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";o&&typeof o.emit=="function"&&(o.emit(r,s),typeof i?.requestAnimationFrame=="function"?i.requestAnimationFrame(()=>{o.emit(r,s)}):typeof i?.setTimeout=="function"&&i.setTimeout(()=>{o.emit(r,s)},30))}catch(n){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",n)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let i=s!=null&&s!=="",o=(a,r)=>{if(!this._isAssistantMessage(a)||s==null||s==="")return!1;let c=String(s).trim();return c?[a.message_id,a.id,a.messageId,a.mes_id,r].map(d=>d==null?"":String(d).trim()).includes(c):!1};for(let a=n.length-1;a>=0;a-=1)if(o(n[a],a))return a;if(i)return-1;for(let a=n.length-1;a>=0;a-=1)if(this._isAssistantMessage(n[a]))return a;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).sort(([,o],[,a])=>(o?.updatedAt||0)-(a?.updatedAt||0));if(!n.length)return"";let i=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,a]of n)i.push(`[${o}]`),i.push(a?.content||""),i.push("");return i.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let n of s)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,s,n={}){let i=e&&typeof e=="object"?e:{},o=["mes","message","content","text"],a=!1;if(o.forEach(r=>{typeof i[r]=="string"&&(i[r]=s,a=!0)}),a||(i.mes=s,i.message=s),Array.isArray(i.swipes)){let r=Number.parseInt(ji(n?.sourceSwipeId||n?.effectiveSwipeId),10),c=Number.isInteger(r)?r:Number.isInteger(i.swipe_id)?i.swipe_id:Number.isInteger(i.swipeId)?i.swipeId:0;c>=0&&c<i.swipes.length&&(i.swipes[c]=s,i.swipe_id=c,i.swipeId=c)}return i}_stripExistingToolOutput(e,s=[]){let n=String(e||"");return(Array.isArray(s)?s:[]).forEach(o=>{let a=String(o||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");n=n.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",a,d)}return}let r=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(`<${r}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${r}>\\s*`,"gi"),l=new RegExp(`\\{${r}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(c,""),n=n.replace(l,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,s){let n=String(e||""),i=String(s||"").trim();return i?n.replace(i,"").trimEnd():n.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,s,n={},i=null){let o=i||this._createWritebackResult(e,n);try{let a=this._getChatRuntime(),{api:r,context:c,chat:l}=a;if(!Array.isArray(l)||!l.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let d=this._findAssistantMessageIndex(l,n.sourceMessageId);if(d<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;o.messageIndex=d,o.steps.foundTargetMessage=!0;let u=l[d],{key:g,text:y}=this._getWritableMessageField(u);o.textField=g;let x=u[qe]&&typeof u[qe]=="object"?u[qe]:{},b=x?.[e]||{},C=b?.content||"",$=b?.blockText||C||"",z=Object.entries(x).filter(([se])=>se!==e).map(([,se])=>se||{}),_=String(s.content||"").trim(),T=this._inferBlockType(_),p={toolId:e,messageId:n.sourceMessageId||u?.message_id||u?.messageId||d,blockType:T,insertedAt:s.updatedAt,replaceable:n.overwrite!==!1};o.blockIdentity=p;let K=n.overwrite===!1?{text:String(y||""),removed:!1}:this._stripExactStoredBlock(y,$),D=K.text,w="";n.overwrite!==!1&&$&&!K.removed&&(w="previous_block_not_found");let O=n.overwrite===!1?D:this._stripExistingToolOutput(D,n.extractionSelectors),I=O!==D;D=O;let P=n.overwrite===!1?D:this._stripPreviousStoredToolContent(D,C),ae=P!==D;D=P,o.replacedExistingBlock=K.removed||I||ae;let ie=[(n.overwrite===!1?String(y||""):D).trimEnd(),_].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!_;let Re=z.every(se=>{let f=String(se?.blockText||se?.content||"").trim();return f?ie.includes(f):!0});o.preservedOtherToolBlocks=Re,Re?w&&(o.conflictDetected=!0,o.conflictReason=w):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let Me={...x,[e]:{toolId:e,content:_,blockText:_,blockType:T,blockIdentity:p,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};u[g]=ie,this._applyMessageText(u,ie,n),u[qe]=Me,u[Tn]=this._buildMessageInjectedContext(Me),o.contentCommitted=!0,o.commit.contentCommitted=!0,o.steps.contentCommitted=!0,o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,d,u),o.steps.runtimeSynced=!0;let tt=c?.setChatMessages||r?.setChatMessages||a?.topWindow?.setChatMessages||null,Oe=c?.setChatMessage||r?.setChatMessage||a?.topWindow?.setChatMessage||null;o.commit.preferredMethod=typeof Oe=="function"?Ie.SET_CHAT_MESSAGE:typeof tt=="function"?Ie.SET_CHAT_MESSAGES:Ie.LOCAL_ONLY;let dt=!1;if(typeof Oe=="function"){It(o.commit.attemptedMethods,Ie.SET_CHAT_MESSAGE);try{await Oe.call(c||r||a?.topWindow,{message:ie,mes:ie,content:ie,text:ie},d,{swipe_id:ji(n.sourceSwipeId||n.effectiveSwipeId)||"current",refresh:"display_and_render_current"}),o.steps.hostSetChatMessage=!0,o.hostUpdateMethod=Ie.SET_CHAT_MESSAGE,o.hostCommitApplied=!0,o.commit.appliedMethod=Ie.SET_CHAT_MESSAGE,o.commit.hostCommitApplied=!0,dt=!0}catch(se){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",se),o.errors.push(`setChatMessage: ${se?.message||String(se)}`)}}if(!dt&&typeof tt=="function"){It(o.commit.attemptedMethods,Ie.SET_CHAT_MESSAGES);try{await tt.call(c||r||a?.topWindow,[{message_id:d,message:ie,mes:ie,content:ie,text:ie}],{refresh:"affected"}),o.steps.hostSetChatMessages=!0,o.hostUpdateMethod=Ie.SET_CHAT_MESSAGES,o.hostCommitApplied=!0,o.commit.appliedMethod=Ie.SET_CHAT_MESSAGES,o.commit.hostCommitApplied=!0,o.commit.fallbackUsed=!0,dt=!0}catch(se){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",se),o.errors.push(`setChatMessages: ${se?.message||String(se)}`)}}if(dt||(It(o.commit.attemptedMethods,Ie.LOCAL_ONLY),o.commit.appliedMethod=Ie.LOCAL_ONLY,o.commit.fallbackUsed=o.commit.preferredMethod!==Ie.LOCAL_ONLY),o.hostUpdateMethod=o.commit.appliedMethod,typeof Oe=="function")try{await Oe.call(c||r||a?.topWindow,{},d),o.steps.refreshForceSetChatMessage=!0,o.refreshRequested=!0,It(o.refresh.requestMethods,"setChatMessage(force_refresh)")}catch(se){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",se),o.errors.push(`setChatMessage(refresh): ${se?.message||String(se)}`)}let fe=c?.saveChat||r?.saveChat||null,me=c?.saveChatDebounced||r?.saveChatDebounced||null;typeof me=="function"&&(me.call(c||r),o.steps.saveChatDebounced=!0,o.refreshRequested=!0,It(o.refresh.requestMethods,"saveChatDebounced")),typeof fe=="function"&&(await fe.call(c||r),o.steps.saveChat=!0,o.refreshRequested=!0,It(o.refresh.requestMethods,"saveChat")),this._notifyMessageUpdated(a,d),o.steps.notifiedMessageUpdated=!0;let bt=String(s.content||"").trim();(o.steps.hostSetChatMessages||o.steps.hostSetChatMessage)&&(o.refreshRequested=!0,It(o.refresh.requestMethods,o.hostUpdateMethod)),o.steps.notifiedMessageUpdated&&(o.refreshRequested=!0,It(o.refresh.requestMethods,"MESSAGE_UPDATED")),o.steps.refreshRequested=o.refreshRequested,o.refresh.requested=o.refreshRequested;let st=await this._confirmRefresh(a,l,d,e,bt,u);return o.verification.textIncludesContent=st.textIncludesContent,o.verification.mirrorStored=st.mirrorStored,o.verification.refreshConfirmed=st.refreshConfirmed,o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.refreshConfirmed=o.verification.refreshConfirmed&&o.refreshRequested,o.refresh.confirmChecks=Number(st.confirmChecks)||0,o.refresh.confirmedBy=st.confirmedBy||"",o.refresh.confirmed=o.refreshConfirmed,o.steps.refreshConfirmed=o.refreshConfirmed,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite&&o.refreshConfirmed,o.writebackStatus=o.success?In.SUCCESS:In.FAILED,!o.success&&!o.error&&(o.error=o.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),o}catch(a){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",a),o.error=a?.message||String(a),o.errors.push(o.error),o}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),i=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(i)return i;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},wn=new _n,nc=wn});var xr={};he(xr,{BUILTIN_VARIABLES:()=>vr,VariableResolver:()=>An,default:()=>ic,variableResolver:()=>_t});var vr,An,_t,ic,Vi=X(()=>{Ee();vr={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},An=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,s),n=this._resolveCustomVariables(n,s),n=this._resolveRegexVariables(n,s),n}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(i=>this.resolveObject(i,s));let n={};for(let[i,o]of Object.entries(e))typeof o=="string"?n[i]=this.resolveTemplate(o,s):typeof o=="object"&&o!==null?n[i]=this.resolveObject(o,s):n[i]=o;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(vr))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,n]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let i of this.getAvailableVariables())n[i.category]||(n[i.category]=[]),n[i.category].push(i);for(let[i,o]of Object.entries(s))if(n[i]&&n[i].length>0){e.push(`\u3010${o}\u3011`);for(let a of n[i])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let i=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(i)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let i=s.characterCard||s.raw?.characterCard;return i?this._formatCharacterCard(i):""}),n=n.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),n=n.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,s){let n=e;for(let[i,o]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(i)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(a,()=>{try{return o(s)}catch(r){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${i}:`,r),""}}):n=n.replace(a,String(o))}return n}_resolveRegexVariables(e,s){let n=e;for(let[i,o]of this.variableHandlers){let a=new RegExp(`\\{\\{${i}\\.([^}]+)\\}\\}`,"gi");n=n.replace(a,(r,c)=>{try{return o(c,s)}catch(l){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${i}.${c}:`,l),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let n=s.role||"unknown",i=s.content||s.mes||"";return`[${n}]: ${i}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},_t=new An,ic=_t});var Tr={};he(Tr,{DEFAULT_PROMPT_TEMPLATE:()=>Er,ToolPromptService:()=>Rn,default:()=>oc,toolPromptService:()=>Mn});var Er,Rn,Mn,oc,Yi=X(()=>{Ee();Cs();Vi();Er="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Rn=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let n=this._getPromptTemplate(e),i=_t.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),o=_t.resolveTemplate(n,i).trim(),a=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return _t.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:o,toolContentMacro:a})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],i=this._buildVariableContext(e,s),o=this._getBypassMessages(e);if(o&&o.length>0)for(let r of o)r.enabled!==!1&&n.push({role:this._normalizeRole(r.role),content:_t.resolveTemplate(r.content||"",i)});let a=this._buildUserContent(this._getPromptTemplate(e),i);return a&&n.push({role:"user",content:a}),this._log(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Er}_getBypassMessages(e){return e.bypass?.enabled?V.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":_t.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},Mn=new Rn,oc=Mn});var _r={};he(_r,{LEGACY_OUTPUT_MODES:()=>rc,OUTPUT_MODES:()=>wt,TOOL_FAILURE_STAGES:()=>Je,TOOL_RUNTIME_STATUS:()=>ac,TOOL_WRITEBACK_STATUS:()=>ne,ToolOutputService:()=>Cn,default:()=>lc,toolOutputService:()=>ds});function Ir(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var wt,rc,ac,Je,ne,Cn,ds,lc,qi=X(()=>{Ee();ks();Wi();Yi();fn();Xs();wt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},rc={inline:"follow_ai"},ac={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Je={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ne={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Cn=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===wt.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===wt.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let n=Date.now(),i=e.id,o=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",r=s?.executionKey||"",c=this._getExtractionSelectors(e),l=e.output?.apiPreset||e.apiPreset||"",d="",u=ne.NOT_APPLICABLE,g=null,y=[],x="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${i}`),L.emit(U.TOOL_EXECUTION_STARTED,{toolId:i,traceId:o,sessionKey:a,mode:wt.POST_RESPONSE_API});try{if(d=Je.BUILD_MESSAGES,y=await this._buildToolMessages(e,s),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${y.length} \u6761\u6D88\u606F`);let b=await this._getRequestTimeout();d=Je.SEND_API_REQUEST;let C=await this._sendApiRequest(l,y,{timeoutMs:b,signal:s.signal});if(d=Je.EXTRACT_OUTPUT,x=this._extractOutputContent(C,e),x){if(d=Je.INJECT_CONTEXT,g=await wn.injectDetailed(i,x,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:c,traceId:o,sessionKey:a}),!g?.success)throw u=ne.FAILED,new Error(g?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ne.SUCCESS}else u=ne.SKIPPED_EMPTY_OUTPUT;d="";let $=Date.now()-n;return L.emit(U.TOOL_EXECUTED,{toolId:i,traceId:o,sessionKey:a,success:!0,duration:$,mode:wt.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${i}, \u8017\u65F6 ${$}ms`),{success:!0,toolId:i,output:x,duration:$,meta:{traceId:o,sessionKey:a,executionKey:r,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:g,phases:Ir(y,x,g)}}}catch(b){let C=Date.now()-n,$=d||Je.UNKNOWN,z=u||ne.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${i}`,b),L.emit(U.TOOL_EXECUTION_FAILED,{toolId:i,traceId:o,sessionKey:a,error:b.message||String(b),duration:C}),{success:!1,toolId:i,error:b.message||String(b),duration:C,meta:{traceId:o,sessionKey:a,executionKey:r,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:c,apiPreset:l,writebackStatus:z,failureStage:$,writebackDetails:g,phases:Ir(y,x,g)}}}}async runToolInline(e,s){let n=Date.now(),i=e.id;try{let o=await this._buildToolMessages(e,s);return{success:!0,toolId:i,messages:o,duration:Date.now()-n}}catch(o){return{success:!1,toolId:i,error:o.message||String(o),duration:Date.now()-n}}}async previewExtraction(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),i=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:i,filteredSourceText:o,extractedText:a,messageEntries:n,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),i=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),r={...s,rawRecentMessagesText:i,recentMessagesText:o,extractedContent:a,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return Mn.buildToolMessages(e,r)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:i=9e4,signal:o}=n,a=null;if(e){if(!ci(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=xs(e)}else a=xs();let r=Zt(a||{});if(!r.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${r.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:i,apiConfig:a},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ue.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let n=typeof e=="string"?e:String(e||""),i=this._getExtractionSelectors(s);if(!i.length)return n.trim();let o=[];for(let a of i){let r=String(a||"").trim();if(!r)continue;if(r.startsWith("regex:")){let l=r.slice(6).trim();if(!l)continue;try{let d=new RegExp(l,"gi");[...n.matchAll(d)].forEach(g=>{let y=String(g?.[0]||"").trim();y&&o.push(y)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:r,error:d})}continue}let c=r.replace(/^<|>$/g,"").trim();if(c)try{let l=new RegExp(`<${c}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${c}>`,"gi");(n.match(l)||[]).forEach(u=>{let g=String(u||"").trim();g&&o.push(g)})}catch(l){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:r,error:l})}}return o.length>0?o.join(`

`).trim():n.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(n=>String(n||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(n=>String(n||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,n={}){let i=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s),{strict:a=!1}=n;if(!o.length)return i.trim();let r=o.map((l,d)=>{let u=String(l||"").trim(),g=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:g?"regex_include":"include",value:g?u.slice(6).trim():u,enabled:!0}}).filter(l=>l.value),c=Kt(i,r,[]);return a?(c||"").trim():c||i.trim()}_extractToolContent(e,s){let n=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let n=gt()||[],i=zt()||[];return!Array.isArray(n)||n.length===0?s.trim():Kt(s,n,i)||s.trim()}catch(n){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",n),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of s)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),i=Array.isArray(s?.chatMessages)?s.chatMessages:[],o=[];for(let r=i.length-1;r>=0&&o.length<n;r-=1){let c=i[r],l=String(c?.role||"").toLowerCase(),d=l==="assistant"||l==="ai"||!c?.is_user&&!c?.is_system&&!l,u=this._getMessageText(c);d&&u&&o.unshift({text:u,message:c,chatIndex:r})}if(o.length>0)return o;let a=s?.lastAiMessage||s?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((i,o)=>{let a=i.text||"",r=this._applyGlobalContextRules(a),c=this._extractToolContent(e,a);return{...i,order:o+1,rawText:a,filteredText:r,extractedText:c}})}_joinMessageBlocks(e,s,n={}){let i=Array.isArray(e)?e:[],{skipEmpty:o=!1}=n;return i.map(r=>{let c=String(r?.[s]||"").trim();return o&&!c?"":`${`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${c||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(i=>{let o=`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(i?.filteredText||"").trim()||"(\u7A7A)",r=String(i?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${r}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Ue.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},ds=new Cn,lc=ds});var kn={};he(kn,{abortAllTasks:()=>yc,abortTask:()=>pc,buildToolMessages:()=>Rr,clearExecutionHistory:()=>Sc,createExecutionContext:()=>Ec,createResult:()=>Dn,enhanceMessagesWithBypass:()=>Tc,executeBatch:()=>uc,executeTool:()=>Ar,executeToolWithConfig:()=>Mr,executeToolsBatch:()=>wc,executorState:()=>de,extractFailed:()=>xc,extractSuccessful:()=>vc,generateTaskId:()=>jt,getExecutionHistory:()=>hc,getExecutorStatus:()=>mc,getScheduler:()=>us,getToolsForEvent:()=>Ac,mergeResults:()=>bc,pauseExecutor:()=>gc,resumeExecutor:()=>fc,setMaxConcurrent:()=>dc});function Dn(t,e,s,n,i,o,a=0){return{success:s,taskId:t,toolId:e,data:n,error:i,duration:o,retries:a,timestamp:Date.now(),metadata:{}}}function jt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function cc(t,e={}){return{id:jt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function us(){return Ps||(Ps=new Ji(de.maxConcurrent)),Ps}function dc(t){de.maxConcurrent=Math.max(1,Math.min(10,t)),Ps&&(Ps.maxConcurrent=de.maxConcurrent)}async function Ar(t,e={},s){let n=us(),i=cc(t,e);for(;de.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},i);return wr(o),o}catch(o){let a=Dn(i.id,t,!1,null,o,Date.now()-i.createdAt,i.retries);return wr(a),a}}async function uc(t,e={}){let{failFast:s=!1,concurrency:n=de.maxConcurrent}=e,i=[],o=us(),a=o.maxConcurrent;o.maxConcurrent=n;try{let r=t.map(({toolId:c,options:l,executor:d})=>Ar(c,l,d));if(s)for(let c of r){let l=await c;if(i.push(l),!l.success){o.abortAll();break}}else{let c=await Promise.allSettled(r);for(let l of c)l.status==="fulfilled"?i.push(l.value):i.push(Dn(jt(),"unknown",!1,null,l.reason,0,0))}}finally{o.maxConcurrent=a}return i}function pc(t){return us().abort(t)}function yc(){us().abortAll(),de.executionQueue=[]}function gc(){de.isPaused=!0}function fc(){de.isPaused=!1}function mc(){return{...us().getStatus(),isPaused:de.isPaused,activeControllers:de.activeControllers.size,historyCount:de.executionHistory.length}}function wr(t){de.executionHistory.push(t),de.executionHistory.length>100&&de.executionHistory.shift()}function hc(t={}){let e=[...de.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function Sc(){de.executionHistory=[]}function bc(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function vc(t){return t.filter(e=>e.success).map(e=>e.data)}function xc(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Ec(t={}){return{taskId:jt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function Tc(t,e){return!e||e.length===0?t:[...e,...t]}function Ic(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Rr(t,e){let s=[],n=t.promptTemplate||"",i={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,a]of Object.entries(i))n=n.replace(new RegExp(Ic(o),"g"),a);return s.push({role:"USER",content:n}),s}async function Mr(t,e,s={}){let n=ye(t);if(!n)return{success:!1,taskId:jt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:jt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let i=Date.now(),o=jt();try{L.emit(U.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let a=Rr(n,e);if(typeof s.callApi=="function"){let r=n.output?.apiPreset||n.apiPreset||"",c=r?{preset:r}:null,l=await s.callApi(a,c,s.signal),d=l;n.outputMode==="separate"&&n.extractTags?.length>0&&(d=_c(l,n.extractTags));let u={success:!0,taskId:o,toolId:t,data:d,duration:Date.now()-i};return L.emit(U.TOOL_EXECUTED,{toolId:t,taskId:o,result:u}),u}else return{success:!0,taskId:o,toolId:t,data:{messages:a,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-i,needsExecution:!0}}catch(a){let r={success:!1,taskId:o,toolId:t,error:a.message||String(a),duration:Date.now()-i};return L.emit(U.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:a}),r}}function _c(t,e){let s={};for(let n of e){let i=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=t.match(i);o&&(s[n]=o.map(a=>{let r=a.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return r?r[1].trim():""}))}return s}async function wc(t,e,s={}){let n=[];for(let i of t){let o=ye(i);if(o&&o.enabled){let a=await Mr(i,e,s);n.push(a)}}return n}function Ac(t){let e=[],s=as();for(let n of s){let i=n?.trigger?.enabled&&n?.trigger?.event===t,o=Array.isArray(n?.triggerEvents)&&n.triggerEvents.includes(t);n&&n.enabled&&(i||o)&&e.push(n)}return e}var de,Ji,Ps,Pn=X(()=>{ls();Ee();de={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Ji=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((n,i)=>{this.queue.push({executor:e,task:s,resolve:n,reject:i}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:n,resolve:i,reject:o}=e,a=new AbortController;n.abortController=a,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),de.activeControllers.set(n.id,a),this.executeTask(s,n,a.signal).then(r=>{n.status="completed",n.completedAt=Date.now(),i(r)}).catch(r=>{n.status=r.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(r)}).finally(()=>{this.running.delete(n.id),de.activeControllers.delete(n.id),de.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,n){let i=Date.now(),o=null;for(let a=0;a<=s.maxRetries;a++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let r=await e(n);return Dn(s.id,s.toolId,!0,r,null,Date.now()-i,a)}catch(r){if(o=r,r.name==="AbortError")throw r;a<s.maxRetries&&(await this.delay(1e3*(a+1)),s.retries=a+1)}}throw o}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=de.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of de.activeControllers.values())e.abort();de.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Ps=null});var oa={};he(oa,{AUTO_TRIGGER_SKIP_REASONS:()=>B,EVENT_TYPES:()=>G,TOOL_EXECUTION_PATHS:()=>Yt,checkGate:()=>ro,destroyToolTriggerManager:()=>Bd,exportAutoTriggerDiagnostics:()=>Wn,exportGenerationTransactionDiagnostics:()=>Kd,getAutoTriggerDiagnostics:()=>zs,getChatContext:()=>ao,getCurrentCharacter:()=>$s,getFullContext:()=>dd,getGenerationTransactionDiagnostics:()=>Ld,getToolTriggerManagerState:()=>Ud,getWorldbookContent:()=>jr,initToolTriggerManager:()=>na,initTriggerModule:()=>Zi,previewToolExtraction:()=>yo,registerEventListener:()=>He,registerTriggerHandler:()=>ud,removeAllListeners:()=>ld,removeAllTriggerHandlers:()=>yd,resetGateState:()=>cd,runToolManually:()=>po,setDebugMode:()=>zd,setTriggerHandlerEnabled:()=>pd,triggerState:()=>h,unregisterEventListener:()=>Qi,updateGateState:()=>At});function qt(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function gs(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function N(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Un(t){return new Promise(e=>setTimeout(e,t))}function Ln(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let n of s){if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"&&n.trim())return n.trim()}return e}function eo(t=[]){return(Array.isArray(t)?t:[]).map((s,n)=>({role:Hn(s),content:gs(s),name:s?.name||"",timestamp:s?.send_date||s?.timestamp||"",isSystem:!!s?.is_system,isUser:!!s?.is_user,sourceId:Ln(s,n),swipeId:N(s?.swipe_id??s?.swipeId??s?.swipeID),swipeCount:Array.isArray(s?.swipes)&&s.swipes.length>0?s.swipes.length:1,chatIndex:n,originalMessage:s}))}function fs(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function Gc(t,e=null,s={}){let{lockToMessageId:n=!1}=s,i=eo(t),o=e==null||e===""?null:String(e).trim(),a=null,r=null;for(let c=i.length-1;c>=0;c-=1){let l=i[c],d=N(l.sourceId),u=o&&(d===o||String(l.chatIndex)===o);if(!a&&l.role==="assistant"&&fs(l.content)&&(!o||!n||u)&&(a=l),!r&&l.role==="user"&&l.content&&(r=l),a&&r)break}return{messages:i,lastUserMessage:r,lastAiMessage:a}}async function Ur(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:n=250,lockToMessageId:i=!1}=t,o={messages:[],lastUserMessage:null,lastAiMessage:null};for(let a=0;a<=s;a+=1){let r=await Ks();if(o=Gc(r,e,{lockToMessageId:i}),o.lastAiMessage?.content)return o;a<s&&await Un(n)}return o}function Nc(t="user_trigger_intent"){At({lastUserSendIntentAt:Date.now(),lastUserIntentSource:t||"user_trigger_intent"})}function Nn(){Nc("send_button_or_enter")}function Oc(){let t=qt(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],n=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],i=(o,a,r)=>{o.forEach(c=>{let l=e.querySelector(c);l&&l.addEventListener(a,r,!0)})};return i(s,"click",()=>Nn()),i(s,"pointerup",()=>Nn()),i(s,"touchend",()=>Nn()),i(n,"keydown",o=>{let a=o?.key||"";(a==="Enter"||a==="NumpadEnter")&&!o.shiftKey&&Nn()}),t.__YYT_sendIntentHooksInstalled=!0,j("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function $c(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function Ke(){return qt().SillyTavern||null}function Bc(){return qt().TavernHelper||null}function Uc(){let t=Ke();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Lc(t=""){return t===G.MESSAGE_RECEIVED||t===G.MESSAGE_SENT||t===G.MESSAGE_UPDATED||t===G.MESSAGE_SWIPED||t===G.MESSAGE_DELETED}function to(t){return!!t&&(typeof t.on=="function"||typeof t.addEventListener=="function")}function Lr(t,e,s){if(!t||typeof s!="function")return!1;try{if(typeof t.off=="function")return t.off(e,s),!0;if(typeof t.removeListener=="function")return t.removeListener(e,s),!0;if(typeof t.removeEventListener=="function")return t.removeEventListener(e,s),!0}catch(n){H("warn","\u79FB\u9664\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25",{eventName:e,error:n?.message||String(n)})}return!1}function Kc(t,e,s){to(t)&&(ue.eventSource=t,ue.eventTypes=e||ue.eventTypes||null,ue.source=s||ue.source||"unknown",H("info","\u7F13\u5B58\u4E8B\u4EF6\u6865\u63A5\u6210\u529F",{source:ue.source,hasOff:typeof t.off=="function",hasRemoveListener:typeof t.removeListener=="function",hasAddEventListener:typeof t.addEventListener=="function"}))}function Ns(){let t=qt(),e=t.SillyTavern||null,s=e?.getContext?.()||null,n=[{source:"SillyTavern.eventSource",eventSource:e?.eventSource,eventTypes:e?.eventTypes||e?.event_types||null},{source:"topWindow.eventSource",eventSource:t?.eventSource,eventTypes:t?.event_types||t?.eventTypes||null},{source:"SillyTavern.getContext()",eventSource:s?.eventSource||null,eventTypes:s?.eventTypes||s?.event_types||null},{source:"scriptModule exports",eventSource:ue.scriptModule?.eventSource||null,eventTypes:ue.scriptModule?.event_types||ue.scriptModule?.eventTypes||null}];for(let i of n)if(to(i.eventSource))return Kc(i.eventSource,i.eventTypes,i.source),i;return{source:"",eventSource:null,eventTypes:null}}async function zc(){let t=Ns();if(t.eventSource)return t;ue.loadingPromise||(ue.loadingPromise=(async()=>{try{let s=Rc;ue.scriptModule=await import(s)}catch(s){ue.importError=s,H("warn","\u52A0\u8F7D /script.js \u4E8B\u4EF6\u6865\u63A5\u5931\u8D25",s?.message||String(s))}finally{ue.loadingPromise=null}})()),await ue.loadingPromise;let e=Ns();return e.eventSource?e:{source:"",eventSource:null,eventTypes:null}}function Kn(){return Ns().eventSource||ue.eventSource||null}function zn(){return Ns().eventTypes||ue.eventTypes||G}function j(...t){(h.debugMode||Ue.getDebugSettings()?.enableDebugLog)&&console.log("[YouYouToolkit:Trigger]",...t)}function H(t="info",...e){(typeof console[t]=="function"?console[t]:console.log)("[youyou_trigger]",...e)}function be(){let t=Ue.getListenerSettings?.()||Ue.getSettings?.()?.listener||{},e=parseInt(t?.debounceMs,10),s=parseInt(t?.messageSessionWindowMs,10),n=parseInt(t?.historyRetentionLimit,10);return{listenGenerationEnded:t?.listenGenerationEnded!==!1,ignoreQuietGeneration:t?.ignoreQuietGeneration!==!1,ignoreAutoTrigger:t?.ignoreAutoTrigger===!0,debounceMs:Number.isFinite(e)?Math.max(0,e):300,useMessageReceivedFallback:t?.useMessageReceivedFallback!==!1,useGenerationAfterCommandsFallback:t?.useGenerationAfterCommandsFallback!==!1,messageSessionWindowMs:Number.isFinite(s)?Math.max(300,s):1800,historyRetentionLimit:Number.isFinite(n)?Math.max(1,Math.min(50,n)):10}}function Ne(t,e=""){if(t&&typeof t=="object")return N(t?.messageId??t?.id??t?.message_id??t?.mes_id);if(e===G.GENERATION_ENDED){if(typeof t=="number"&&Number.isFinite(t))return String(t);if(typeof t=="string"&&/^\d+$/.test(t.trim()))return t.trim()}return Lc(e)?N(t):""}function Fc(t,e,s){let n=N(s);if(!n)return!1;let i=N(Ln(t,e));if(i&&i===n)return!0;let o=Number(n);return Number.isInteger(o)&&e===o}async function Hc(t){let e=N(t);if(!e)return null;let s=await Ks();for(let n=s.length-1;n>=0;n-=1){let i=s[n];if(Fc(i,n,e))return{message:i,index:n}}return null}async function Kr(t,e={}){let{retries:s=0,retryDelayMs:n=80}=e,i=null;for(let o=0;o<=s;o+=1){if(i=await Hc(t),i)return i;o<s&&await Un(n)}return null}function jc(t,e,s){return N(s)?t===G.MESSAGE_RECEIVED||t===G.MESSAGE_UPDATED||t===G.MESSAGE_SWIPED?!0:!!(e&&typeof e=="object"&&(e?.messageId!==void 0||e?.message_id!==void 0||e?.id!==void 0||e?.mes_id!==void 0)):!1}function zr(){let t=[h.gateState.lastUserSendIntentAt,h.gateState.lastUserMessageAt].filter(e=>Number(e)>0);return t.length>0?Math.max(...t):0}function so(t=Date.now()){let e=zr();return e>0&&t-e<=$r}function no(t="",e=null){return String(t||e?.type||"").trim().toLowerCase()}function io(t){let e=String(t||"").trim().toLowerCase();return e?/re\s*-?\s*roll|reroll|重\s*roll/.test(e)?"reroll":/regenerat|\bregen\b|重新生成/.test(e)?"regenerate":/\bswipe\b|swipe[_-]?id/.test(e)?"swipe":/\bquiet\b/.test(e)?"quiet":"":""}function Fr(t="",e=null){let s=typeof t=="string"?t.trim():String(t||"").trim(),n=e??null,i=no(t,e);if(e?.swipeId!==void 0||e?.swipe_id!==void 0||e?.swipe===!0||e?.isSwipe===!0)return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:i,generationAction:"swipe",generationActionSource:"params.swipe",explicitGenerationAction:"swipe"};let o=[{source:"type",value:s}];for(let a of Pc){let r=e?.[a];r==null||r===""||o.push({source:`params.${a}`,value:String(r)})}for(let a of o){let r=io(a.value);if(r)return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:i,generationAction:r,generationActionSource:a.source,explicitGenerationAction:Dr.has(r)?r:""}}return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:i,generationAction:i||"",generationActionSource:i?"normalized_generation_type":"",explicitGenerationAction:Dr.has(i)?i:""}}function Rt(t=""){let e=String(t||"").trim();if(!e)return"";let s=0;for(let n=0;n<e.length;n+=1)s=(s<<5)-s+e.charCodeAt(n),s|=0;return Math.abs(s).toString(36)}function Wc(t,e=null,s=Date.now()){let n=zr(),i=Fr(t,e);return n>0&&s-n<=$r?{startedByUserIntent:!0,userIntentDetectedAt:n,userIntentSource:"recent_user_trigger_intent",userIntentDetail:"recent_user_send_or_message"}:i.explicitGenerationAction?{startedByUserIntent:!0,userIntentDetectedAt:s,userIntentSource:`explicit_generation_action:${i.explicitGenerationAction}`,userIntentDetail:`generation_action_${i.explicitGenerationAction}`}:{startedByUserIntent:!1,userIntentDetectedAt:n,userIntentSource:"none",userIntentDetail:"no_recent_user_intent_or_explicit_generation_action"}}function Mt(t=ms()){let e=h.gateState.lastGenerationBaseline;return!e||t&&e.chatId&&e.chatId!==t?null:e}function Os(t=Date.now()){return so(t)?!0:!!Mt()?.startedByUserIntent}function Fn(t=Date.now()){return Number(h.gateState.uiTransitionGuardUntil)>t}function kr(t=""){let e=Date.now();At({uiTransitionGuardUntil:e+Cr,lastUiTransitionAt:e,lastUiTransitionSource:t||""}),H("info","\u8FDB\u5165\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B",{source:t||"unknown",guardUntil:e+Cr})}function Pr(t=""){for(let e of S.pendingMessageTimers.values())clearTimeout(e);S.pendingMessageTimers.clear(),t&&H("info","\u5DF2\u6E05\u7406\u5F85\u6267\u884C\u81EA\u52A8\u89E6\u53D1\u5B9A\u65F6\u5668",{reason:t})}function Hr(t=[],e={}){let s=Ke(),n=s?.getContext?.()||null,i=eo(t),o=null;for(let a=i.length-1;a>=0;a-=1){let r=i[a];if(r.role==="assistant"&&fs(r.content)){o=r;break}}return{traceId:e.traceId||Ct("generation"),startedAt:Number(e.startedAt)||Date.now(),capturedAt:Date.now(),chatId:Xe(s,n,null),messageCount:i.length,lastAssistantIndex:o?.chatIndex??-1,lastAssistantMessageId:N(o?.sourceId),lastAssistantContentFingerprint:Rt(o?.content||""),lastAssistantSwipeId:N(o?.swipeId),lastAssistantSwipeCount:Number.isFinite(o?.swipeCount)?Math.max(0,Number(o.swipeCount)):0,lastAssistantPreview:String(o?.content||"").slice(0,160),dryRun:!!e.dryRun,generationType:e.rawGenerationType||e.type||"",generationParams:e.rawGenerationParams||e.params||null,rawGenerationType:e.rawGenerationType||e.type||"",rawGenerationParams:e.rawGenerationParams||e.params||null,normalizedGenerationType:e.normalizedGenerationType||no(e.type,e.params),generationAction:e.generationAction||"",generationActionSource:e.generationActionSource||"",explicitGenerationAction:e.explicitGenerationAction||"",startedByUserIntent:!!e.startedByUserIntent,userIntentDetectedAt:Number(e.userIntentDetectedAt)||0,userIntentSource:e.userIntentSource||"",userIntentDetail:e.userIntentDetail||"",baselineResolved:e.baselineResolved!==void 0?!!e.baselineResolved:!0,baselineResolutionAt:Number(e.baselineResolutionAt)||0,provisional:!!e.provisional,baselineSource:e.baselineSource||""}}async function Vc(t={}){let e=await Ks();return Hr(e,{...t,baselineResolved:t.baselineResolved!==void 0?t.baselineResolved:!0,baselineResolutionAt:Number(t.baselineResolutionAt)||Date.now(),provisional:t.provisional===!0,baselineSource:t.baselineSource||"captured_chat_snapshot"})}function Yc(t={}){return Hr(Uc(),{...t,baselineResolved:!1,baselineResolutionAt:0,provisional:!0,baselineSource:t.baselineSource||"provisional_immediate_snapshot"})}async function oo(t={}){let{chatId:e=ms(),traceId:s="",retries:n=4,retryDelayMs:i=80}=t,o=null;for(let r=0;r<=n;r+=1){o=Mt(e);let c=!s||!o?.traceId||o.traceId===s;if(o&&c&&o.baselineResolved!==!1)return o;r<n&&await Un(i)}return o&&(!s||!o?.traceId||o.traceId===s)?o:null}function qc(t=Mt()){let e=[t?.explicitGenerationAction,t?.generationAction,h.gateState.lastGenerationAction];for(let s of e){let n=io(s)||String(s||"").trim().toLowerCase();if(Br.has(n))return n}return""}function Xi(t=""){let e=io(t)||String(t||"").trim().toLowerCase();return Br.has(e)}function Jc(t=""){let e=N(t);return e?{preferredMessageId:e,bindingSource:"event_message_id",forceSameSlotRevision:!0,forcedSameSlotSource:"message_id_bound_in_place"}:{preferredMessageId:"",bindingSource:"",forceSameSlotRevision:!1,forcedSameSlotSource:""}}function Xc(t,e){if(!t||!e)return!1;let s=N(e.lastAssistantMessageId),n=N(t.sourceId),i=!!s&&!!n&&s===n,o=Number.isInteger(e.lastAssistantIndex)&&e.lastAssistantIndex>=0&&t.chatIndex===e.lastAssistantIndex;return i||!s&&o?!0:o}function Qc(t,e){let s=String(e?.lastAssistantContentFingerprint||"").trim(),n=Rt(t?.content||""),i=N(e?.lastAssistantSwipeId),o=N(t?.swipeId),a=Number.isFinite(e?.lastAssistantSwipeCount)?Math.max(0,Number(e.lastAssistantSwipeCount)):0,r=Number.isFinite(t?.swipeCount)?Math.max(0,Number(t.swipeCount)):0,c=!!s&&!!n&&s!==n,l=!!i&&!!o&&i!==o,d=a>0&&r>0&&a!==r;return{baselineFingerprint:s,messageFingerprint:n,baselineSwipeId:i,currentSwipeId:o,baselineSwipeCount:a,currentSwipeCount:r,fingerprintChanged:c,swipeIdChanged:l,swipeCountChanged:d,observedRevision:c||l||d}}function Gr(t={},e="same_slot_revision"){let s=[];return t.fingerprintChanged&&s.push("content_fingerprint_changed"),t.swipeIdChanged&&s.push("swipe_id_changed"),t.swipeCountChanged&&s.push("swipe_count_changed"),s.length>0?s.join("+"):e}function Zc(t,e,s={}){let{allowSameSlotRevision:n=!1,requireObservedSameSlotRevision:i=!0,forceSameSlotRevision:o=!1,forcedSameSlotSource:a=""}=s;if(!t||t.role!=="assistant"||!fs(t.content))return{allowed:!1,confirmationMode:"none",reason:"invalid_assistant_message",sameSlotRevisionAction:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:"",confirmedAssistantContentFingerprint:"",baselineAssistantSwipeId:"",confirmedAssistantSwipeId:"",baselineAssistantSwipeCount:0,confirmedAssistantSwipeCount:0};if(!e)return{allowed:!0,confirmationMode:"no_baseline",reason:"",sameSlotRevisionAction:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:"",confirmedAssistantContentFingerprint:Rt(t.content||""),baselineAssistantSwipeId:"",confirmedAssistantSwipeId:N(t.swipeId),baselineAssistantSwipeCount:0,confirmedAssistantSwipeCount:Number.isFinite(t?.swipeCount)?Math.max(0,Number(t.swipeCount)):0};if(ed(t,e))return{allowed:!0,confirmationMode:"slot_revision",reason:"",sameSlotRevisionAction:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:String(e.lastAssistantContentFingerprint||"").trim(),confirmedAssistantContentFingerprint:Rt(t.content||""),baselineAssistantSwipeId:N(e.lastAssistantSwipeId),confirmedAssistantSwipeId:N(t.swipeId),baselineAssistantSwipeCount:Number.isFinite(e.lastAssistantSwipeCount)?Math.max(0,Number(e.lastAssistantSwipeCount)):0,confirmedAssistantSwipeCount:Number.isFinite(t?.swipeCount)?Math.max(0,Number(t.swipeCount)):0};let r=qc(e),c=o?r||"same_slot_in_place":r,l=Xc(t,e),d=Qc(t,e);if(!n||!l||!o&&!c)return{allowed:!1,confirmationMode:"none",reason:l?"same_slot_revision_action_unavailable":"assistant_slot_not_confirmed_for_generation",sameSlotRevisionAction:c,sameSlotRevisionCandidate:l,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:d.observedRevision,baselineAssistantContentFingerprint:d.baselineFingerprint,confirmedAssistantContentFingerprint:d.messageFingerprint,baselineAssistantSwipeId:d.baselineSwipeId,confirmedAssistantSwipeId:d.currentSwipeId,baselineAssistantSwipeCount:d.baselineSwipeCount,confirmedAssistantSwipeCount:d.currentSwipeCount};if(!o&&i&&!d.observedRevision)return{allowed:!1,confirmationMode:"none",reason:"same_slot_revision_not_observed",sameSlotRevisionAction:c,sameSlotRevisionCandidate:!0,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:d.baselineFingerprint,confirmedAssistantContentFingerprint:d.messageFingerprint,baselineAssistantSwipeId:d.baselineSwipeId,confirmedAssistantSwipeId:d.currentSwipeId,baselineAssistantSwipeCount:d.baselineSwipeCount,confirmedAssistantSwipeCount:d.currentSwipeCount};let u=o?Gr(d,a||"same_slot_in_place"):Gr(d,i?"same_slot_observed_revision":"same_slot_generation_confirmed");return{allowed:!0,confirmationMode:"same_slot_revision",reason:"",sameSlotRevisionAction:c,sameSlotRevisionCandidate:!0,sameSlotRevisionConfirmed:!0,sameSlotRevisionSource:u,observedSameSlotRevision:d.observedRevision,baselineAssistantContentFingerprint:d.baselineFingerprint,confirmedAssistantContentFingerprint:d.messageFingerprint,baselineAssistantSwipeId:d.baselineSwipeId,confirmedAssistantSwipeId:d.currentSwipeId,baselineAssistantSwipeCount:d.baselineSwipeCount,confirmedAssistantSwipeCount:d.currentSwipeCount}}function ed(t,e){if(!t||t.role!=="assistant"||!fs(t.content))return!1;if(!e)return!0;let s=N(t.sourceId),n=N(e.lastAssistantMessageId);return s?!n||s!==n:!1}async function td(t="",e={}){let{allowSameSlotRevision:s=!1,requireObservedSameSlotRevision:n=!0,forceSameSlotRevision:i=!1,forcedSameSlotSource:o=""}=e,a=N(t),r=Ke(),c=r?.getContext?.()||null,l=Xe(r,c,null),d=await Ks(),u=eo(d),g=h.gateState.lastGenerationBaseline?.chatId===l?h.gateState.lastGenerationBaseline:null;if(!a)return null;let y=u.find(b=>N(b.sourceId)===a||String(b.chatIndex)===a);if(!y)return null;let x=Zc(y,g,{allowSameSlotRevision:s,requireObservedSameSlotRevision:n,forceSameSlotRevision:s&&(i||!!a),forcedSameSlotSource:o||(a?"message_id_bound_in_place":"")});return x.allowed?{...y,confirmationMode:x.confirmationMode,sameSlotRevisionCandidate:x.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:x.sameSlotRevisionConfirmed,sameSlotRevisionSource:x.sameSlotRevisionSource,sameSlotRevisionAction:x.sameSlotRevisionAction,baselineAssistantContentFingerprint:x.baselineAssistantContentFingerprint,confirmedAssistantContentFingerprint:x.confirmedAssistantContentFingerprint,baselineAssistantSwipeId:x.baselineAssistantSwipeId,confirmedAssistantSwipeId:x.confirmedAssistantSwipeId,baselineAssistantSwipeCount:x.baselineAssistantSwipeCount,confirmedAssistantSwipeCount:x.confirmedAssistantSwipeCount}:null}async function sd(t="",e={}){let{retries:s=0,retryDelayMs:n=250,allowSameSlotRevision:i=!1,requireObservedSameSlotRevision:o=!0,forceSameSlotRevision:a=!1,forcedSameSlotSource:r=""}=e,c=null;for(let l=0;l<=s;l+=1){if(c=await td(t,{allowSameSlotRevision:i,requireObservedSameSlotRevision:o,forceSameSlotRevision:a,forcedSameSlotSource:r}),c)return c;l<s&&await Un(n)}return null}function kt(){let t=h.gateState.lastGenerationBaseline;return{baselineResolved:t?.baselineResolved??!1,baselineResolutionAt:t?.baselineResolutionAt||0,provisionalBaseline:!!t?.provisional,generationStartedByUserIntent:!!t?.startedByUserIntent,generationUserIntentSource:t?.userIntentSource||"",generationUserIntentDetail:t?.userIntentDetail||"",rawGenerationType:t?.rawGenerationType||h.gateState.lastGenerationType||"",rawGenerationParams:t?.rawGenerationParams??h.gateState.lastGenerationParams??null,normalizedGenerationType:t?.normalizedGenerationType||h.gateState.lastNormalizedGenerationType||"",generationAction:t?.generationAction||h.gateState.lastGenerationAction||"",generationActionSource:t?.generationActionSource||h.gateState.lastGenerationActionSource||"",explicitGenerationAction:t?.explicitGenerationAction||"",baselineAssistantContentFingerprint:t?.lastAssistantContentFingerprint||"",baselineAssistantSwipeId:N(t?.lastAssistantSwipeId),baselineAssistantSwipeCount:Number.isFinite(t?.lastAssistantSwipeCount)?Math.max(0,Number(t.lastAssistantSwipeCount)):0,lastUserIntentSource:h.gateState.lastUserIntentSource||""}}function nd(){let t=h.gateState.lastGenerationBaseline;return{sessionGenerationTraceId:h.gateState.lastGenerationTraceId||"",sessionGenerationStartedAt:t?.startedAt||0,sessionBaselineResolvedAtCreation:t?.baselineResolved??!1,sessionBaselineResolutionAtCreation:t?.baselineResolutionAt||0,sessionProvisionalBaselineAtCreation:!!t?.provisional,sessionGenerationStartedByUserIntent:!!t?.startedByUserIntent,sessionGenerationUserIntentSource:t?.userIntentSource||"",sessionGenerationUserIntentDetail:t?.userIntentDetail||"",sessionGenerationActionAtCreation:t?.generationAction||h.gateState.lastGenerationAction||"",sessionGenerationActionSourceAtCreation:t?.generationActionSource||h.gateState.lastGenerationActionSource||"",sessionExplicitGenerationActionAtCreation:t?.explicitGenerationAction||"",sessionNormalizedGenerationTypeAtCreation:t?.normalizedGenerationType||h.gateState.lastNormalizedGenerationType||"",sessionRawGenerationTypeAtCreation:t?.rawGenerationType||h.gateState.lastGenerationType||"",sessionLastUserIntentSourceAtCreation:h.gateState.lastUserIntentSource||"",sessionGenerationCapturedAt:Date.now()}}async function id(){return Gn||(Gn=Promise.resolve().then(()=>(Pn(),kn)).catch(t=>{throw Gn=null,t})),Gn}function od(t={}){let e=kt();return{stage:"",eventType:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",executionKey:"",slotBindingKey:"",slotRevisionKey:"",slotTransactionId:"",messageRole:"",reason:"",skipReasonDetailed:"",confirmedAssistantMessageId:"",sourceMessageId:"",confirmationMode:"",generationMessageBindingSource:"",sourceSwipeId:"",confirmedAssistantSwipeId:"",effectiveSwipeId:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",scheduledDelayMs:0,candidateToolIds:[],receivedAt:Date.now(),handledAt:0,generationTraceId:h.gateState.lastGenerationTraceId||"",generationDryRun:!!h.gateState.lastGenerationDryRun,generationStartedAt:h.gateState.lastGenerationBaseline?.startedAt||0,uiTransitionGuardActive:Fn(),uiTransitionGuardUntil:h.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:h.gateState.lastUiTransitionSource||"",baselineMessageCount:h.gateState.lastGenerationBaseline?.messageCount||0,baselineAssistantId:h.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",generationBaselineMessageCount:h.gateState.lastGenerationBaseline?.messageCount||0,generationBaselineAssistantId:h.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",confirmationSource:"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",registeredEvents:Array.from(S.listeners.keys()),listenerSettings:be(),hasRecentUserTriggerIntent:so(),hasConfirmedUserTriggerIntent:Os(),...e,...t}}function Le(t={}){let e=od(t);return S.lastEventDebugSnapshot=e,j("\u81EA\u52A8\u89E6\u53D1\u4E8B\u4EF6\u5FEB\u7167:",e),e}function rd(){let t=be();return t.listenGenerationEnded===!1?{skip:!0,reason:B.LISTENER_DISABLED,listenerSettings:t}:t.ignoreAutoTrigger&&!Os()?{skip:!0,reason:B.IGNORED_AUTO_TRIGGER,listenerSettings:t}:{skip:!1,reason:"",listenerSettings:t}}function ad(t={}){let e=kt();return{triggerEvent:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",executionKey:"",slotBindingKey:"",slotRevisionKey:"",slotTransactionId:"",confirmationMode:"",generationMessageBindingSource:"",sourceMessageId:"",sourceSwipeId:"",confirmedAssistantSwipeId:"",effectiveSwipeId:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",selectedToolIds:[],skipReason:"",skipReasonDetailed:"",lockedAiMessageId:"",confirmedAssistantMessageId:"",confirmationSource:"",eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",generationTraceId:h.gateState.lastGenerationTraceId||"",...e,triggeredAt:Date.now(),...t}}function ht(t={}){let e=ad(t);return S.lastAutoTriggerSnapshot=e,j("\u81EA\u52A8\u89E6\u53D1\u5FEB\u7167:",e),e}function ps(t,e){(Array.isArray(t)?t:[]).forEach(n=>{n?.id&&rs(n.id,{lastTriggerAt:Date.now(),lastExecutionKey:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:"",...e},{touchLastRunAt:!1,emitEvent:!1})})}function Xe(t,e,s){let i=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(o=>typeof o=="string"&&o.trim());return i||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function He(t,e,s={}){if(!t||typeof e!="function")return j("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),H("warn","\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25\uFF1A\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u65E0\u6548",{eventType:t}),()=>{};let{once:n=!1,priority:i=0}=s,o=Kn(),r=zn()[t]||t,c=async(...l)=>{try{if(H("info","\u6536\u5230\u4E8B\u4EF6",t,l[0]??null),s.gateCheck&&!await ro(s.gateCheck)){j(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`),H("warn","\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6",t);return}await e(...l),n&&Qi(t,c)}catch(d){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",d)}};if(h.listeners.has(t)||h.listeners.set(t,new Set),h.listeners.get(t).add(c),o&&typeof o.on=="function")o.on(r,c),j(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),H("info","\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u6E90\u76D1\u542C",{eventType:t,stEventType:r});else if(o&&typeof o.addEventListener=="function")o.addEventListener(r,c),j(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),H("info","\u5DF2\u6CE8\u518C addEventListener \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:r});else{let l=qt();l.addEventListener&&(l.addEventListener(r,c),j(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),H("warn","\u4E8B\u4EF6\u6E90\u4E0D\u53EF\u7528\uFF0C\u56DE\u9000\u4E3A DOM \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:r}))}return()=>Qi(t,c)}function Qi(t,e){let s=h.listeners.get(t);if(s&&s.has(e)){s.delete(e);let n=Kn(),o=zn()[t]||t;if(Lr(n,o,e))j(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let a=qt();a.removeEventListener&&a.removeEventListener(o,e)}}}function ld(){let t=Kn(),e=zn();for(let[s,n]of h.listeners){let i=e[s]||s;for(let o of n)if(!Lr(t,i,o)){let a=qt();a.removeEventListener&&a.removeEventListener(i,o)}}h.listeners.clear(),j("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function ro(t){if(!t)return!0;let e=Date.now(),s=h.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return j("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return j("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return j("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return j("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return j("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(n){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",n),!1}return!0}function At(t){Object.assign(h.gateState,t)}function cd(){h.gateState={lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastNormalizedGenerationType:"",lastGenerationAction:"",lastGenerationActionSource:"",lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""}}async function ao(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:n=!0,includeSystem:i=!1,format:o="messages"}=t;if(!Ke())return j("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let r=await Ks(),c=[],l=Math.max(0,r.length-e);for(let d=l;d<r.length;d++){let u=r[d];if(!u)continue;let g=Hn(u);if(!(g==="user"&&!s)&&!(g==="system"&&!i)&&!(g==="assistant"&&!n))if(o==="messages"){let y=gs(u);c.push({role:g,content:y,name:u.name||"",timestamp:u.send_date||u.timestamp,isSystem:!!u.is_system,isUser:!!u.is_user})}else c.push(gs(u))}return{messages:c,totalMessages:r.length,startIndex:l,endIndex:r.length-1}}catch(r){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",r),null}}function Hn(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function Ks(){let t=Bc(),e=Ke();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let n=e?.getContext?.()||null,i=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(e?.chat)?e.chat:[];s=(i.length?i:o).length-1}if(Number.isFinite(s)&&s>=0){let n=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(n)&&n.length>0)return n}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function $s(){let t=Ke();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let n=s[e];return{id:e,name:n.name||"",description:n.description||"",personality:n.personality||"",scenario:n.scenario||"",firstMes:n.first_mes||"",mesExample:n.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function jr(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,n=Ke();if(!n)return"";try{let o=(n.lorebook||[]).entries||[],a=[],r=0;for(let c of o){if(e&&!c.enabled)continue;let l=c.content||"";l&&r+l.length<=s&&(a.push(l),r+=l.length)}return a.join(`

`)}catch(i){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",i),""}}async function dd(t={}){let[e,s,n]=await Promise.all([ao(t.chat||{}),$s(),jr(t.worldbook||{})]);return{chat:e,character:s,worldbook:n,timestamp:Date.now()}}function ud(t,e){if(!t||!e)return j("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:n,gateCondition:i,priority:o=0}=e;if(!s||typeof n!="function")return j("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};h.handlers.set(t,{eventType:s,handler:n,gateCondition:i,priority:o,enabled:!0});let a=He(s,async(...r)=>{let c=h.handlers.get(t);!c||!c.enabled||c.gateCondition&&!await ro(c.gateCondition)||await c.handler(...r)},{priority:o});return j(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{a(),h.handlers.delete(t),j(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function pd(t,e){let s=h.handlers.get(t);s&&(s.enabled=e,j(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function yd(){h.handlers.clear(),j("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function Ct(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Bs(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function ms(){let t=Ke(),e=t?.getContext?.()||null;return Xe(t,e,null)}function lo(t,e,s="",n="",i=""){let o=t||ms(),a=String(i||"").trim();if(a)return`slot::${a}`;let r=N(e),c=String(n||"").trim();return r?[o,r,c||"trace:pending","slot_revision:pending"].join("::"):[o,c||`event:${s||"unknown"}:trace_pending`,"message:no_message","slot_revision:pending"].join("::")}function gd(t={}){let e=String(t?.slotRevisionKey||"").trim();return e||Dt({chatId:t?.chatId,messageId:t?.messageId,effectiveSwipeId:t?.effectiveSwipeId||t?.confirmedAssistantSwipeId||t?.lastAiMessageSwipeId,assistantContentFingerprint:t?.assistantContentFingerprint||Rt(t?.lastAiMessage||t?.input?.lastAiMessage||"")})}function fd(t,e,s={}){let n=N(s?.messageId||Ne(e,t)),i=s?.chatId||ms(),o=String(s?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),a=s?.sessionKey||lo(i,n,t,o,s?.slotRevisionKey||s?.executionKey||""),r=Date.now(),c=kt(),l=nd();return{sessionKey:a,traceId:s?.traceId||Ct("session"),chatId:i,messageId:n,messageKey:s?.messageKey||"",executionKey:s?.executionKey||"",slotBindingKey:s?.slotBindingKey||"",slotRevisionKey:s?.slotRevisionKey||"",slotTransactionId:s?.slotTransactionId||"",messageRole:s?.messageRole||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",sourceMessageId:s?.sourceMessageId||"",confirmationSource:s?.confirmationSource||"",confirmationMode:s?.confirmationMode||"",sourceSwipeId:s?.sourceSwipeId||"",sameSlotRevisionCandidate:!!s?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!s?.sameSlotRevisionConfirmed,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",isSpeculativeSession:!!s?.isSpeculativeSession,eventBelongsToCurrentGeneration:!!s?.eventBelongsToCurrentGeneration,historicalReplayBlocked:!!s?.historicalReplayBlocked,historicalReplayReason:s?.historicalReplayReason||"",skipReasonDetailed:s?.skipReasonDetailed||"",firstEventType:s?.eventType||t||"",receivedEvents:t?[t]:[],phase:s?.phase||J.RECEIVED,skipReason:s?.skipReason||"",scheduledAt:0,handledAt:0,completedAt:0,candidateToolIds:Array.isArray(s?.candidateToolIds)?[...s.candidateToolIds]:[],executionPathIds:Array.isArray(s?.executionPathIds)?[...s.executionPathIds]:[],sourceMessageLocked:!!n,baselineResolved:s?.baselineResolved??c.baselineResolved,baselineResolutionAt:s?.baselineResolutionAt??c.baselineResolutionAt,provisionalBaseline:s?.provisionalBaseline??c.provisionalBaseline,generationStartedByUserIntent:s?.generationStartedByUserIntent??c.generationStartedByUserIntent,generationUserIntentSource:s?.generationUserIntentSource||c.generationUserIntentSource,generationUserIntentDetail:s?.generationUserIntentDetail||c.generationUserIntentDetail,generationAction:s?.generationAction||c.generationAction,generationActionSource:s?.generationActionSource||c.generationActionSource,explicitGenerationAction:s?.explicitGenerationAction||c.explicitGenerationAction,lastUserIntentSource:s?.lastUserIntentSource||c.lastUserIntentSource,sessionGenerationTraceId:s?.sessionGenerationTraceId||l.sessionGenerationTraceId,sessionGenerationStartedAt:s?.sessionGenerationStartedAt??l.sessionGenerationStartedAt,sessionBaselineResolvedAtCreation:s?.sessionBaselineResolvedAtCreation??l.sessionBaselineResolvedAtCreation,sessionBaselineResolutionAtCreation:s?.sessionBaselineResolutionAtCreation??l.sessionBaselineResolutionAtCreation,sessionProvisionalBaselineAtCreation:s?.sessionProvisionalBaselineAtCreation??l.sessionProvisionalBaselineAtCreation,sessionGenerationStartedByUserIntent:s?.sessionGenerationStartedByUserIntent??l.sessionGenerationStartedByUserIntent,sessionGenerationUserIntentSource:s?.sessionGenerationUserIntentSource||l.sessionGenerationUserIntentSource,sessionGenerationUserIntentDetail:s?.sessionGenerationUserIntentDetail||l.sessionGenerationUserIntentDetail,sessionGenerationActionAtCreation:s?.sessionGenerationActionAtCreation||l.sessionGenerationActionAtCreation,sessionGenerationActionSourceAtCreation:s?.sessionGenerationActionSourceAtCreation||l.sessionGenerationActionSourceAtCreation,sessionExplicitGenerationActionAtCreation:s?.sessionExplicitGenerationActionAtCreation||l.sessionExplicitGenerationActionAtCreation,sessionNormalizedGenerationTypeAtCreation:s?.sessionNormalizedGenerationTypeAtCreation||l.sessionNormalizedGenerationTypeAtCreation,sessionRawGenerationTypeAtCreation:s?.sessionRawGenerationTypeAtCreation||l.sessionRawGenerationTypeAtCreation,sessionLastUserIntentSourceAtCreation:s?.sessionLastUserIntentSourceAtCreation||l.sessionLastUserIntentSourceAtCreation,sessionGenerationCapturedAt:s?.sessionGenerationCapturedAt??l.sessionGenerationCapturedAt,createdAt:r,updatedAt:r}}function md(t=Date.now()){let{messageSessionWindowMs:e}=be();for(let[s,n]of S.messageSessions.entries()){let i=n?.completedAt||n?.handledAt||n?.updatedAt||n?.createdAt||0;i>0&&t-i>e&&S.messageSessions.delete(s)}}function jn(t,e,s={}){md();let n=N(s?.messageId||Ne(e,t)),i=s?.chatId||ms(),o=String(s?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),a=s?.sessionKey||lo(i,n,t,o,s?.slotRevisionKey||s?.executionKey||""),r=S.messageSessions.get(a);return r?(t&&!r.receivedEvents.includes(t)&&r.receivedEvents.push(t),n&&!r.messageId&&(r.messageId=n,r.sourceMessageLocked=!0),s?.messageRole&&(r.messageRole=s.messageRole),s?.executionKey&&(r.executionKey=s.executionKey),s?.slotBindingKey&&(r.slotBindingKey=s.slotBindingKey),s?.slotRevisionKey&&(r.slotRevisionKey=s.slotRevisionKey),s?.slotTransactionId&&(r.slotTransactionId=s.slotTransactionId),s?.confirmedAssistantMessageId&&(r.confirmedAssistantMessageId=s.confirmedAssistantMessageId),s?.sourceMessageId&&(r.sourceMessageId=s.sourceMessageId),s?.sourceSwipeId&&(r.sourceSwipeId=s.sourceSwipeId),s?.confirmationSource&&(r.confirmationSource=s.confirmationSource),s?.confirmationMode&&(r.confirmationMode=s.confirmationMode),s?.sameSlotRevisionCandidate!==void 0&&(r.sameSlotRevisionCandidate=!!s.sameSlotRevisionCandidate),s?.sameSlotRevisionConfirmed!==void 0&&(r.sameSlotRevisionConfirmed=!!s.sameSlotRevisionConfirmed),s?.sameSlotRevisionSource&&(r.sameSlotRevisionSource=s.sameSlotRevisionSource),s?.skipReasonDetailed&&(r.skipReasonDetailed=s.skipReasonDetailed),s?.eventBelongsToCurrentGeneration!==void 0&&(r.eventBelongsToCurrentGeneration=!!s.eventBelongsToCurrentGeneration),s?.historicalReplayBlocked!==void 0&&(r.historicalReplayBlocked=!!s.historicalReplayBlocked),s?.historicalReplayReason&&(r.historicalReplayReason=s.historicalReplayReason),s?.isSpeculativeSession!==void 0&&(r.isSpeculativeSession=!!s.isSpeculativeSession),s?.candidateToolIds&&(r.candidateToolIds=[...s.candidateToolIds]),_e(r,{})):(r=fd(t,e,{...s,chatId:i,generationTraceId:o,sessionKey:a,messageId:n}),S.messageSessions.set(a,r),r)}function _e(t,e={}){if(!t)return null;let s=kt();return Object.assign(t,s,e,{updatedAt:Date.now()}),t}function hd(t,e){return!t||!e||t.sessionKey===e||(S.messageSessions.delete(t.sessionKey),t.sessionKey=e,t.updatedAt=Date.now(),S.messageSessions.set(e,t)),t}function Ge(t,e={}){if(!t)return null;let{historyRetentionLimit:s}=be(),n=kt(),i={id:e?.id||Ct("session_hist"),at:e?.at||Date.now(),traceId:t.traceId,sessionKey:t.sessionKey,phase:e?.phase||t.phase,eventType:e?.eventType||t.firstEventType,messageId:e?.messageId||t.messageId,messageKey:e?.messageKey||t.messageKey,executionKey:e?.executionKey||t.executionKey||"",slotBindingKey:e?.slotBindingKey||t.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||t.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||t.slotTransactionId||"",messageRole:e?.messageRole||t.messageRole,confirmedAssistantMessageId:e?.confirmedAssistantMessageId||t.confirmedAssistantMessageId||"",sourceMessageId:e?.sourceMessageId||t.sourceMessageId||"",confirmationSource:e?.confirmationSource||t.confirmationSource||"",confirmationMode:e?.confirmationMode||t.confirmationMode||"",sourceSwipeId:e?.sourceSwipeId||t.sourceSwipeId||"",sameSlotRevisionCandidate:e?.sameSlotRevisionCandidate??t.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:e?.sameSlotRevisionConfirmed??t.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:e?.sameSlotRevisionSource||t.sameSlotRevisionSource||"",isSpeculativeSession:e?.isSpeculativeSession??t.isSpeculativeSession??!1,eventBelongsToCurrentGeneration:e?.eventBelongsToCurrentGeneration??t.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:e?.historicalReplayBlocked??t.historicalReplayBlocked??!1,historicalReplayReason:e?.historicalReplayReason||t.historicalReplayReason||"",generationTraceId:e?.generationTraceId||h.gateState.lastGenerationTraceId||"",generationStartedAt:e?.generationStartedAt||h.gateState.lastGenerationBaseline?.startedAt||0,generationDryRun:e?.generationDryRun??!!h.gateState.lastGenerationDryRun,baselineResolved:e?.baselineResolved??t.baselineResolved??n.baselineResolved,baselineResolutionAt:e?.baselineResolutionAt??t.baselineResolutionAt??n.baselineResolutionAt,provisionalBaseline:e?.provisionalBaseline??t.provisionalBaseline??n.provisionalBaseline,generationStartedByUserIntent:e?.generationStartedByUserIntent??t.generationStartedByUserIntent??n.generationStartedByUserIntent,generationUserIntentSource:e?.generationUserIntentSource||t.generationUserIntentSource||n.generationUserIntentSource,generationUserIntentDetail:e?.generationUserIntentDetail||t.generationUserIntentDetail||n.generationUserIntentDetail,generationAction:e?.generationAction||t.generationAction||n.generationAction,generationActionSource:e?.generationActionSource||t.generationActionSource||n.generationActionSource,explicitGenerationAction:e?.explicitGenerationAction||t.explicitGenerationAction||n.explicitGenerationAction,lastUserIntentSource:e?.lastUserIntentSource||t.lastUserIntentSource||n.lastUserIntentSource,sessionGenerationTraceId:e?.sessionGenerationTraceId||t.sessionGenerationTraceId||"",sessionGenerationStartedAt:e?.sessionGenerationStartedAt??t.sessionGenerationStartedAt??0,sessionBaselineResolvedAtCreation:e?.sessionBaselineResolvedAtCreation??t.sessionBaselineResolvedAtCreation??!1,sessionBaselineResolutionAtCreation:e?.sessionBaselineResolutionAtCreation??t.sessionBaselineResolutionAtCreation??0,sessionProvisionalBaselineAtCreation:e?.sessionProvisionalBaselineAtCreation??t.sessionProvisionalBaselineAtCreation??!1,sessionGenerationStartedByUserIntent:e?.sessionGenerationStartedByUserIntent??t.sessionGenerationStartedByUserIntent??!1,sessionGenerationUserIntentSource:e?.sessionGenerationUserIntentSource||t.sessionGenerationUserIntentSource||"",sessionGenerationUserIntentDetail:e?.sessionGenerationUserIntentDetail||t.sessionGenerationUserIntentDetail||"",sessionGenerationActionAtCreation:e?.sessionGenerationActionAtCreation||t.sessionGenerationActionAtCreation||"",sessionGenerationActionSourceAtCreation:e?.sessionGenerationActionSourceAtCreation||t.sessionGenerationActionSourceAtCreation||"",sessionExplicitGenerationActionAtCreation:e?.sessionExplicitGenerationActionAtCreation||t.sessionExplicitGenerationActionAtCreation||"",sessionNormalizedGenerationTypeAtCreation:e?.sessionNormalizedGenerationTypeAtCreation||t.sessionNormalizedGenerationTypeAtCreation||"",sessionRawGenerationTypeAtCreation:e?.sessionRawGenerationTypeAtCreation||t.sessionRawGenerationTypeAtCreation||"",sessionLastUserIntentSourceAtCreation:e?.sessionLastUserIntentSourceAtCreation||t.sessionLastUserIntentSourceAtCreation||"",sessionGenerationCapturedAt:e?.sessionGenerationCapturedAt??t.sessionGenerationCapturedAt??Date.now(),skipReason:e?.skipReason||t.skipReason||"",skipReasonDetailed:e?.skipReasonDetailed||t.skipReasonDetailed||"",candidateToolIds:Array.isArray(e?.candidateToolIds)?[...e.candidateToolIds]:[...t.candidateToolIds||[]],executionPathIds:Array.isArray(e?.executionPathIds)?[...e.executionPathIds]:[...t.executionPathIds||[]]};return S.recentSessionHistory=Bs([...S.recentSessionHistory,i],s),i}function Wt(t,e={}){let s=Array.isArray(t)?t:[],{historyRetentionLimit:n}=be();s.forEach(i=>{i?.id&&Ms(i.id,"trigger",e,{limit:n,emitEvent:!1})})}function Sd(t,e={}){if(!t)return;let{historyRetentionLimit:s}=be();Ms(t,"writeback",e,{limit:s,emitEvent:!1})}function ys(t){if(!t||typeof t!="object")return t;let e=Wr(t);return{...t,...e,receivedEvents:Array.isArray(t.receivedEvents)?[...t.receivedEvents]:void 0,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:void 0,executionPathIds:Array.isArray(t.executionPathIds)?[...t.executionPathIds]:void 0,driftReasons:Array.isArray(e.driftReasons)?[...e.driftReasons]:[]}}function Ae(t){return String(t||"").trim()}function Wr(t){if(!t||typeof t!="object")return{driftDetected:!1,generationTraceDrifted:!1,generationActionDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};if(!(t.sessionGenerationCapturedAt!==void 0||t.sessionGenerationTraceId!==void 0||t.sessionBaselineResolvedAtCreation!==void 0||t.sessionGenerationStartedByUserIntent!==void 0||t.sessionGenerationUserIntentSource!==void 0||t.sessionGenerationUserIntentDetail!==void 0))return{driftDetected:!1,generationTraceDrifted:!1,generationActionDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};let s=Ae(t.sessionGenerationTraceId),n=Ae(t.generationTraceId),i=Ae(t.sessionGenerationUserIntentSource),o=Ae(t.generationUserIntentSource),a=Ae(t.sessionGenerationUserIntentDetail),r=Ae(t.generationUserIntentDetail),c=Ae(t.sessionGenerationActionAtCreation),l=Ae(t.generationAction),d=Ae(t.sessionGenerationActionSourceAtCreation),u=Ae(t.generationActionSource),g=Ae(t.sessionExplicitGenerationActionAtCreation),y=Ae(t.explicitGenerationAction),x=Ae(t.sessionNormalizedGenerationTypeAtCreation),b=Ae(t.normalizedGenerationType),C=!!s&&!!n&&s!==n,$=(c||l?c!==l:!1)||(d||u?d!==u:!1)||(g||y?g!==y:!1)||(x||b?x!==b:!1),z=!!t.sessionGenerationStartedByUserIntent!=!!t.generationStartedByUserIntent||(i||o?i!==o:!1)||(a||r?a!==r:!1),_=!!t.sessionBaselineResolvedAtCreation!=!!t.baselineResolved,T=(Number(t.baselineResolutionAt)||0)>(Number(t.sessionBaselineResolutionAtCreation)||0),p=[];return C&&p.push("generation_trace_changed"),$&&p.push("generation_action_changed"),z&&p.push("generation_user_intent_changed"),_&&p.push("baseline_resolved_state_changed"),T&&p.push("baseline_resolution_advanced"),{driftDetected:p.length>0,generationTraceDrifted:C,generationActionDrifted:$,generationUserIntentDrifted:z,baselineResolvedStateChanged:_,baselineResolutionAdvancedSinceSessionCreation:T,driftReasons:p}}function Nr(t=[]){return(Array.isArray(t)?t:[]).reduce((e,s)=>{let n=Ae(s?.phase)||"unknown";return e[n]=(e[n]||0)+1,e},{})}function Or(t=[]){let e={entryCount:0,driftDetectedCount:0,generationTraceDriftCount:0,generationActionDriftCount:0,generationUserIntentDriftCount:0,baselineResolvedStateChangedCount:0,baselineResolutionAdvancedCount:0};for(let s of Array.isArray(t)?t:[]){let n=Wr(s);e.entryCount+=1,n.driftDetected&&(e.driftDetectedCount+=1),n.generationTraceDrifted&&(e.generationTraceDriftCount+=1),n.generationActionDrifted&&(e.generationActionDriftCount+=1),n.generationUserIntentDrifted&&(e.generationUserIntentDriftCount+=1),n.baselineResolvedStateChanged&&(e.baselineResolvedStateChangedCount+=1),n.baselineResolutionAdvancedSinceSessionCreation&&(e.baselineResolutionAdvancedCount+=1)}return e}function Vr(){let t=Ns(),e=t.eventSource||ue.eventSource||null;return{source:t.source||ue.source||"",ready:to(e),hasImportedScriptModule:!!ue.scriptModule,importError:ue.importError?.message||""}}function Yr(){let t=h.gateState.lastGenerationBaseline;return{lastUserSendIntentAt:h.gateState.lastUserSendIntentAt||0,lastUserIntentSource:h.gateState.lastUserIntentSource||"",lastUserMessageId:N(h.gateState.lastUserMessageId),lastUserMessageAt:h.gateState.lastUserMessageAt||0,lastGenerationTraceId:h.gateState.lastGenerationTraceId||"",lastGenerationType:h.gateState.lastGenerationType||"",lastGenerationDryRun:!!h.gateState.lastGenerationDryRun,lastGenerationAt:h.gateState.lastGenerationAt||0,isGenerating:!!h.gateState.isGenerating,uiTransitionGuardUntil:h.gateState.uiTransitionGuardUntil||0,lastUiTransitionAt:h.gateState.lastUiTransitionAt||0,lastUiTransitionSource:h.gateState.lastUiTransitionSource||"",baselineMessageCount:t?.messageCount||0,baselineAssistantId:t?.lastAssistantMessageId||"",...kt()}}function bd(){let{historyRetentionLimit:t}=be();return Math.max(20,Math.min(200,Number(t||0)*4||40))}function vd(t={}){let e=kt();return{id:t?.id||Ct("timeline"),at:Number(t?.at)||Date.now(),kind:t?.kind||"event",eventType:t?.eventType||"",traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",messageId:N(t?.messageId),executionKey:t?.executionKey||"",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",phase:t?.phase||"",reason:t?.reason||"",detail:t?.detail||"",sourceMessageId:N(t?.sourceMessageId),confirmationSource:t?.confirmationSource||"",sourceSwipeId:t?.sourceSwipeId||"",candidateToolIds:Array.isArray(t?.candidateToolIds)?[...t.candidateToolIds]:[],generationTraceId:t?.generationTraceId||h.gateState.lastGenerationTraceId||"",baselineResolved:t?.baselineResolved??e.baselineResolved,generationStartedByUserIntent:t?.generationStartedByUserIntent??e.generationStartedByUserIntent,generationUserIntentSource:t?.generationUserIntentSource||e.generationUserIntentSource,historicalReplayBlocked:t?.historicalReplayBlocked??!1}}function Vt(t={}){let e=vd(t);return S.recentEventTimeline=Bs([...S.recentEventTimeline,e],bd()),e}function qr(t){return!t||typeof t!="object"?t:{...t,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:[]}}function On(t=!1,e=[],s=[]){return{flagged:!!t,reasons:[...new Set((Array.isArray(e)?e:[]).filter(Boolean))],relatedSessionKeys:[...new Set((Array.isArray(s)?s:[]).filter(Boolean))]}}function xd(t={}){let e=t?.summary||{},s=[...Array.isArray(t?.activeSessions)?t.activeSessions:[],...Array.isArray(t?.recentSessionHistory)?t.recentSessionHistory:[],t?.lastEventDebugSnapshot,t?.lastAutoTriggerSnapshot].filter(Boolean),n=[],i=[],o=[],a=[],r=[],c=[],l=[],d=[];for(let u of s){let g=String(u?.reason||u?.skipReason||"").trim(),y=String(u?.detail||u?.skipReasonDetailed||"").trim(),x=String(u?.sessionKey||"").trim(),b=String(u?.phase||u?.stage||"").trim(),C=String(u?.confirmationSource||"").trim(),$=String(u?.generationUserIntentSource||"").trim(),z=!!u?.generationStartedByUserIntent;(y==="missing_generation_baseline"||y==="generation_baseline_pending_resolution")&&(n.push(y),i.push(x)),(g===B.HISTORICAL_REPLAY_MESSAGE_RECEIVED||g===B.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION||u?.historicalReplayBlocked)&&(o.push(u?.historicalReplayReason||g||y||"historical_replay_signal_detected"),a.push(x)),g===B.IGNORED_AUTO_TRIGGER&&(z||$.startsWith("explicit_generation_action:"))&&(r.push(`ignored_auto_trigger_with_${$||"user_intent"}`),c.push(x)),e?.listenerSettings?.ignoreAutoTrigger&&!z&&!u?.isSpeculativeSession&&(b===J.COMPLETED||b===J.HANDLING||b===J.DISPATCHING||C==="generation_ended"||C==="message_received"||C==="generation_after_commands")&&(l.push("non_user_intent_generation_reached_execution_path"),d.push(x))}return{a10BaselineRaceSuspicious:On(n.length>0,n,i),a11ReplaySuspicious:On(o.length>0,o,a),a12UserIntentSuspicious:On(r.length>0,r,c),a13AutoTriggerLeakSuspicious:On(l.length>0,l,d)}}function Ed(t,e=""){let s=Date.now();return S.lastDuplicateExecutionKey===(e||t)&&s-S.lastDuplicateMessageAt<Mc?!1:(S.lastDuplicateMessageKey=t,S.lastDuplicateExecutionKey=e||t,S.lastDuplicateMessageAt=s,!0)}function co(t=Date.now()){for(let[e,s]of S.handledExecutionKeys.entries()){let n=Number(s?.at)||0;(n<=0||t-n>Cc)&&S.handledExecutionKeys.delete(e)}}function Td(t,e=Date.now()){let s=String(t||"").trim();return s?(co(e),S.handledExecutionKeys.has(s)):!1}function Id(t,e={}){let s=String(t||"").trim();if(!s)return null;let n={executionKey:s,at:Number(e?.at)||Date.now(),messageKey:String(e?.messageKey||"").trim(),messageId:N(e?.messageId),generationTraceId:String(e?.generationTraceId||"").trim(),eventType:String(e?.eventType||"").trim(),sessionKey:String(e?.sessionKey||"").trim()};return S.handledExecutionKeys.set(s,n),co(n.at),n}function Jr(t=8){return co(),Bs(Array.from(S.handledExecutionKeys.values()).sort((e,s)=>(Number(e?.at)||0)-(Number(s?.at)||0)),t).map(e=>({...e}))}function Xr(t="",e="",s=""){return[String(t||"chat_default").trim()||"chat_default",N(e)||"message:unknown",N(s)||"swipe:current"].join("::")}function Qr(t=Date.now()){for(let[e,s]of S.writebackGuards.entries()){let n=Number(s?.at)||0;(n<=0||t-n>kc)&&S.writebackGuards.delete(e)}}function _d(t={}){let e=Xr(t?.chatId,t?.messageId,t?.effectiveSwipeId||t?.swipeId),s={guardKey:e,at:Date.now(),chatId:String(t?.chatId||"").trim()||"chat_default",messageId:N(t?.messageId),effectiveSwipeId:N(t?.effectiveSwipeId||t?.swipeId),traceId:String(t?.traceId||"").trim(),toolId:String(t?.toolId||"").trim()};return S.writebackGuards.set(e,s),Qr(s.at),s}function wd(t="",e="",s="",n=Date.now()){return Qr(n),S.writebackGuards.has(Xr(t,e,s))}function Zr(t){return N(t?.swipe_id??t?.swipeId??t?.swipeID)}function Ad(t){return Array.isArray(t?.swipes)&&t.swipes.length>0?t.swipes.length:1}function Dt(t={}){return[String(t?.chatId||"chat_default").trim()||"chat_default",N(t?.messageId)||"message:unknown",N(t?.effectiveSwipeId||t?.swipeId)||"swipe:current",String(t?.assistantContentFingerprint||"").trim()||"content:na"].join("::")}function Us(t={}){return[String(t?.chatId||"chat_default").trim()||"chat_default",N(t?.messageId)||"message:unknown"].join("::")}function Ls(t={}){return[Dt(t),String(t?.eventType||"slot_event").trim()||"slot_event",String(t?.traceId||t?.generationTraceId||Ct("slot_tx")).trim()||Ct("slot_tx")].join("::")}function Rd(t=Date.now()){if(h.gateState.isGenerating)return!0;let e=Number(h.gateState.lastGenerationAt)||0;return e>0&&t-e<=Dc}function Md(t,e="",s={},n={}){if(!t?.message)return null;let i=Ke(),o=i?.getContext?.()||null,a=t.message,r=N(Ln(a,t.index)),c=gs(a),l=N(n?.effectiveSwipeId||s?.effectiveSwipeId||s?.sourceSwipeId||s?.swipeId||s?.swipe_id||Zr(a)),d=String(n?.generationTraceId||s?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),u=Mt(Xe(i,o,null)),g={eventType:e,chatId:Xe(i,o,null),messageId:r,messageIndex:t.index,role:Hn(a),content:c,assistantContentFingerprint:Rt(c),swipeId:l,effectiveSwipeId:l,swipeCount:Ad(a),generationTraceId:d,generationAction:u?.generationAction||h.gateState.lastGenerationAction||"",generationActionSource:u?.generationActionSource||h.gateState.lastGenerationActionSource||"",generationStartedByUserIntent:!!(u?.startedByUserIntent||so()),dryRun:!!(u?.dryRun||h.gateState.lastGenerationDryRun),bindingSource:n?.bindingSource||"",baselineAssistantMessageId:N(u?.lastAssistantMessageId),baselineAssistantSwipeId:N(u?.lastAssistantSwipeId),rawMessage:a};return{...g,slotBindingKey:Us(g),slotRevisionKey:Dt(g),slotTransactionId:Ls({...g,traceId:n?.traceId||s?.traceId||""})}}async function Cd(t,e,s={}){let n=N(s?.messageId||Ne(e,t)),i=String(s?.generationTraceId||e?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),o=await oo({traceId:i,retries:2,retryDelayMs:50})||Mt();if(!n)return null;let a=await Kr(n,{retries:3,retryDelayMs:80});return a?Md(a,t,e,{generationTraceId:i,bindingSource:"event_message_id",traceId:s?.traceId||e?.traceId||""}):null}function Dd(t,e="",s={}){let n=Date.now();return t?t.role!=="assistant"?{allowed:!1,reason:B.NON_ASSISTANT_MESSAGE,detail:"resolved_slot_not_assistant"}:fs(t.content)?t.dryRun?{allowed:!1,reason:B.DRY_RUN_GENERATION,detail:"slot_event_dry_run_generation"}:Fn(n)&&!Os(n)?{allowed:!1,reason:B.UNRELATED_UI_EVENT,detail:"ui_transition_guard_active"}:(e===G.MESSAGE_UPDATED||e===G.MESSAGE_SWIPED)&&wd(t.chatId,t.messageId,t.effectiveSwipeId,n)?{allowed:!1,reason:B.WRITEBACK_ECHO_EVENT,detail:"message_update_caused_by_tool_writeback"}:e===G.MESSAGE_SWIPED?{allowed:!0,reason:"",detail:""}:(e===G.MESSAGE_RECEIVED||e===G.MESSAGE_UPDATED)&&!Rd(n)&&!Os(n)?{allowed:!1,reason:e===G.MESSAGE_RECEIVED?B.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION:B.SLOT_EVENT_OUTSIDE_WINDOW,detail:"slot_event_without_recent_generation_activity"}:{allowed:!0,reason:"",detail:""}:{allowed:!1,reason:B.MISSING_AI_MESSAGE,detail:"assistant_slot_content_not_meaningful"}:{allowed:!1,reason:B.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"assistant_slot_not_resolved"}}async function Gs(t,e,s={}){let n=await Cd(t,e,s),i=Dd(n,t,e);if(!i.allowed){let r=ea(t,e,{messageId:n?.messageId||s?.messageId||Ne(e,t),generationTraceId:n?.generationTraceId||s?.generationTraceId||h.gateState.lastGenerationTraceId||"",reason:i.reason,skipReasonDetailed:i.detail,confirmationSource:"none",confirmationMode:"none",eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:i.reason===B.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,historicalReplayReason:i.reason===B.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION?"slot_event_without_recent_generation_activity":""});return ht({triggerEvent:t,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:n?.messageId||"",generationMessageBindingSource:n?.bindingSource||"",confirmedAssistantSwipeId:n?.swipeId||"",effectiveSwipeId:n?.effectiveSwipeId||"",skipReason:i.reason,skipReasonDetailed:i.detail,confirmedAssistantMessageId:n?.messageId||"",confirmationSource:"none",slotRevisionKey:n?Dt(n):""}),!1}let o={generationTraceId:n.generationTraceId,messageId:n.messageId,confirmedAssistantMessageId:n.messageId,confirmationSource:n.bindingSource||t.toLowerCase(),confirmationMode:"slot_revision",generationMessageBindingSource:n.bindingSource||"",slotBindingKey:n.slotBindingKey||Us(n),confirmedAssistantSwipeId:n.swipeId||"",effectiveSwipeId:n.effectiveSwipeId||"",sourceMessageId:n.messageId,sourceSwipeId:n.effectiveSwipeId||"",slotRevisionKey:Dt(n),slotTransactionId:n.slotTransactionId||Ls(n),sameSlotRevisionCandidate:Xi(n.generationAction),sameSlotRevisionConfirmed:Xi(n.generationAction),sameSlotRevisionSource:Xi(n.generationAction)?n.bindingSource||"slot_revision":"",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""},a=t===G.GENERATION_ENDED?0:be().debounceMs;return a>0?Gd(t,e,a,o):await sa(t,{...typeof e=="object"&&e?e:{},...o,messageId:n.messageId,confirmedAssistantMessageId:n.messageId}),!0}function kd(){if(S.internalSubscriptions.length>0)return;let t=L.on(U.TOOL_CONTEXT_INJECTED,(e={})=>{let s=N(e?.sourceMessageId||e?.options?.sourceMessageId);s&&_d({chatId:e?.chatId||ms(),messageId:s,effectiveSwipeId:e?.effectiveSwipeId||e?.sourceSwipeId||e?.options?.sourceSwipeId||"",traceId:e?.traceId||e?.options?.traceId||"",toolId:e?.toolId||""})});S.internalSubscriptions.push(t)}async function Pd(t,e={}){let s=await $s(),n=Ke(),i=n?.getContext?.()||null,o=t?.message||null,a=Number.isInteger(t?.index)?t.index:-1,r=N(Ln(o,a)),c=gs(o),l=N(e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||Zr(o)),d=String(e?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),u=Xe(n,i,s),g=Rt(c),y=Us({chatId:u,messageId:r}),x=Dt({chatId:u,messageId:r,effectiveSwipeId:l,assistantContentFingerprint:g}),b=Ls({chatId:u,messageId:r,effectiveSwipeId:l,assistantContentFingerprint:g,eventType:e?.triggerEvent||"",generationTraceId:d,traceId:e?.traceId||""}),C=await Ur({preferredMessageId:r||null,retries:Number.isFinite(e?.retries)?e.retries:2,retryDelayMs:Number.isFinite(e?.retryDelayMs)?e.retryDelayMs:120,lockToMessageId:!0}),$=C.messages||[],z=C.lastUserMessage;return{triggeredAt:Date.now(),triggerEvent:e?.triggerEvent||"",traceId:e?.traceId||"",sessionKey:e?.sessionKey||"",confirmationSource:String(e?.confirmationSource||"").trim(),confirmedAssistantMessageId:r,chatId:u,messageId:r,generationTraceId:d,confirmationMode:String(e?.confirmationMode||"slot_revision").trim(),sameSlotRevisionCandidate:!!e?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!e?.sameSlotRevisionConfirmed,sameSlotRevisionSource:String(e?.sameSlotRevisionSource||"").trim(),rawGenerationType:h.gateState.lastGenerationBaseline?.rawGenerationType||h.gateState.lastGenerationType||"",rawGenerationParams:h.gateState.lastGenerationBaseline?.rawGenerationParams??h.gateState.lastGenerationParams??null,normalizedGenerationType:h.gateState.lastGenerationBaseline?.normalizedGenerationType||h.gateState.lastNormalizedGenerationType||"",generationAction:h.gateState.lastGenerationBaseline?.generationAction||h.gateState.lastGenerationAction||"",generationActionSource:h.gateState.lastGenerationBaseline?.generationActionSource||h.gateState.lastGenerationActionSource||"",generationMessageBindingSource:String(e?.generationMessageBindingSource||"").trim(),slotBindingKey:y,slotRevisionKey:x,slotTransactionId:b,lastAiMessage:c,assistantContentFingerprint:g,lastAiMessageSwipeId:l,confirmedAssistantSwipeId:l,effectiveSwipeId:l,sourceMessageId:r,sourceSwipeId:l,userMessage:z?.content||h.gateState.lastUserMessageText||"",chatMessages:$,input:{userMessage:z?.content||h.gateState.lastUserMessageText||"",lastAiMessage:c,extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:$.length||0}},config:{},status:"pending",executionKey:x}}function ea(t,e,s={}){let n=N(s?.messageId||Ne(e,t)),i=jn(t,e,{eventType:t,messageId:n,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",generationTraceId:s?.generationTraceId||h.gateState.lastGenerationTraceId||"",skipReasonDetailed:s?.skipReasonDetailed||"speculative_session_only",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),o=s?.reason||B.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,a=s?.skipReasonDetailed||"speculative_session_only";return H("info","\u8BB0\u5F55 speculative session\uFF0C\u672A\u8FDB\u5165\u6267\u884C\u8C03\u5EA6",{eventType:t,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:n,reason:o,detail:a}),Le({stage:"speculative_observed",eventType:t,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:n,reason:o,skipReasonDetailed:a,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",isSpeculativeSession:!0,eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",handledAt:Date.now()}),_e(i,{phase:J.IGNORED,skipReason:o,skipReasonDetailed:a,confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0,completedAt:Date.now()}),Ge(i,{phase:J.IGNORED,eventType:t,messageId:n,skipReason:o,skipReasonDetailed:a,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),i}function Gd(t,e,s=0,n={}){let i=N(n?.confirmedAssistantMessageId||n?.messageId||Ne(e,t));if(!i)return ea(t,e,{...n,reason:n?.reason||B.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:n?.skipReasonDetailed||"missing_confirmed_message_identity",confirmationSource:n?.confirmationSource||"none"});let o=typeof e=="object"&&e?{...e,generationTraceId:n?.generationTraceId||e?.generationTraceId||h.gateState.lastGenerationTraceId||"",messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||e?.confirmationSource||"",confirmationMode:n?.confirmationMode||e?.confirmationMode||"",slotBindingKey:n?.slotBindingKey||e?.slotBindingKey||"",slotRevisionKey:n?.slotRevisionKey||e?.slotRevisionKey||"",slotTransactionId:n?.slotTransactionId||e?.slotTransactionId||"",sourceMessageId:n?.sourceMessageId||e?.sourceMessageId||i,sourceSwipeId:n?.sourceSwipeId||e?.sourceSwipeId||e?.effectiveSwipeId||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??e?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??e?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||e?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??e?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??e?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||e?.historicalReplayReason||""}:{generationTraceId:n?.generationTraceId||h.gateState.lastGenerationTraceId||"",messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||"",confirmationMode:n?.confirmationMode||"",slotBindingKey:n?.slotBindingKey||"",slotRevisionKey:n?.slotRevisionKey||"",slotTransactionId:n?.slotTransactionId||"",sourceMessageId:n?.sourceMessageId||i,sourceSwipeId:n?.sourceSwipeId||n?.effectiveSwipeId||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||""},a=jn(t,o,{...n,eventType:t,messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmationMode:n?.confirmationMode||o.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1}),r=Number.isFinite(s)?Math.max(0,s):be().debounceMs,c=a?.sessionKey||`message::${i}`,l=S.pendingMessageTimers.get(c);l&&clearTimeout(l),_e(a,{phase:J.SCHEDULED,messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmationMode:n?.confirmationMode||o.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1,scheduledAt:Date.now()}),Ge(a,{phase:J.SCHEDULED,eventType:t,messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1}),Le({stage:"scheduled",eventType:t,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:i,slotBindingKey:n?.slotBindingKey||o.slotBindingKey||"",slotRevisionKey:n?.slotRevisionKey||o.slotRevisionKey||"",slotTransactionId:n?.slotTransactionId||o.slotTransactionId||"",sourceMessageId:n?.sourceMessageId||o.sourceMessageId||i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmationMode:n?.confirmationMode||o.confirmationMode||"",sourceSwipeId:n?.sourceSwipeId||o.sourceSwipeId||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:r}),H("info","\u5DF2\u8C03\u5EA6\u786E\u8BA4\u540E\u7684\u81EA\u52A8\u89E6\u53D1",{eventType:t,messageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",delayMs:r});let d=setTimeout(async()=>{S.pendingMessageTimers.delete(c),_e(a,{phase:J.DISPATCHING,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmationMode:n?.confirmationMode||o.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",confirmedAssistantMessageId:i,isSpeculativeSession:!1}),Ge(a,{phase:J.DISPATCHING,eventType:t,messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmationMode:n?.confirmationMode||o.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",isSpeculativeSession:!1}),Le({stage:"dispatching",eventType:t,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:i,slotBindingKey:n?.slotBindingKey||o.slotBindingKey||"",slotRevisionKey:n?.slotRevisionKey||o.slotRevisionKey||"",slotTransactionId:n?.slotTransactionId||o.slotTransactionId||"",sourceMessageId:n?.sourceMessageId||o.sourceMessageId||i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,confirmationMode:n?.confirmationMode||o.confirmationMode||"",sourceSwipeId:n?.sourceSwipeId||o.sourceSwipeId||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:r}),await sa(t,o)},r);return S.pendingMessageTimers.set(c,d),a}function Bn(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}function ta(t,e){return e?.triggerEvent==="MANUAL"?t.output?.mode===wt.POST_RESPONSE_API?Yt.MANUAL_POST_RESPONSE_API:Yt.MANUAL_COMPATIBILITY:Yt.AUTO_POST_RESPONSE_API}async function sa(t,e){j(`${t}\u89E6\u53D1:`,e);let s=typeof e=="object"&&e?String(e?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim():String(h.gateState.lastGenerationTraceId||"").trim(),n=await oo({traceId:s,retries:2,retryDelayMs:40})||Mt(),i=n?.rawGenerationType||n?.generationType||h.gateState.lastGenerationType||"",o=n?.rawGenerationParams??n?.generationParams??h.gateState.lastGenerationParams??null,a=!!n?.dryRun,r=typeof e=="object"&&e?String(e?.confirmationSource||"").trim():"",c=typeof e=="object"&&e?String(e?.confirmationMode||"").trim():"",l=!!(typeof e=="object"&&e&&e?.sameSlotRevisionCandidate),d=!!(typeof e=="object"&&e&&e?.sameSlotRevisionConfirmed),u=typeof e=="object"&&e?String(e?.sameSlotRevisionSource||"").trim():"";H("info","\u5F00\u59CB\u5904\u7406\u81EA\u52A8\u89E6\u53D1",{eventType:t,incomingMessageId:Ne(e,t),confirmationSource:r});let g=$d(G.GENERATION_ENDED),y=g.map(I=>I.id),x=rd(),b=Ne(e,t),C=!!(typeof e=="object"&&e&&e?.eventBelongsToCurrentGeneration),$=!!(typeof e=="object"&&e&&e?.historicalReplayBlocked),z=typeof e=="object"&&e?String(e?.historicalReplayReason||"").trim():"",_=N((typeof e=="object"&&e?e?.confirmedAssistantMessageId:"")||b),T=jn(t,e,{eventType:t,messageId:b,confirmedAssistantMessageId:_,confirmationSource:r,confirmationMode:c,sameSlotRevisionCandidate:l,sameSlotRevisionConfirmed:d,sameSlotRevisionSource:u,eventBelongsToCurrentGeneration:C,historicalReplayBlocked:$,historicalReplayReason:z,candidateToolIds:y});if(_e(T,{phase:J.HANDLING,handledAt:Date.now(),confirmedAssistantMessageId:_,confirmationSource:r,confirmationMode:c,sameSlotRevisionCandidate:l,sameSlotRevisionConfirmed:d,sameSlotRevisionSource:u,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:C,historicalReplayBlocked:$,historicalReplayReason:z,candidateToolIds:y}),Ge(T,{phase:J.HANDLING,eventType:t,messageId:b,confirmedAssistantMessageId:_,confirmationSource:r,confirmationMode:c,sameSlotRevisionCandidate:l,sameSlotRevisionConfirmed:d,sameSlotRevisionSource:u,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:C,historicalReplayBlocked:$,historicalReplayReason:z,candidateToolIds:y}),Le({stage:"handling",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,confirmedAssistantMessageId:_,confirmationSource:r,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:C,historicalReplayBlocked:$,historicalReplayReason:z,candidateToolIds:y,handledAt:Date.now()}),Fn()&&!Os()){H("warn","\u5F53\u524D\u5904\u4E8E\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B\u7A97\u53E3\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u5FFD\u7565",{eventType:t,candidateToolIds:y,uiTransitionGuardUntil:h.gateState.uiTransitionGuardUntil,lastUiTransitionSource:h.gateState.lastUiTransitionSource||""}),ht({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,selectedToolIds:y,skipReason:B.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:_,confirmationSource:r,lockedAiMessageId:b||""}),ps(g,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:B.UNRELATED_UI_EVENT,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Le({stage:"ignored_ui_transition_guard",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,reason:B.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:_,confirmationSource:r,candidateToolIds:y,handledAt:Date.now()}),_e(T,{phase:J.IGNORED,skipReason:B.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:_,confirmationSource:r,completedAt:Date.now(),candidateToolIds:y}),Ge(T,{phase:J.IGNORED,eventType:t,messageId:b,skipReason:B.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:_,confirmationSource:r,candidateToolIds:y}),Wt(g,{traceId:T?.traceId||"",eventType:t,messageId:b,messageKey:"",skipReason:B.UNRELATED_UI_EVENT,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(a){H("warn","\u5F53\u524D generation \u4E3A dryRun\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u963B\u65AD",{eventType:t,candidateToolIds:y,generationTraceId:s||""}),ht({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,selectedToolIds:y,skipReason:B.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:_,confirmationSource:r,lockedAiMessageId:b||""}),ps(g,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:B.DRY_RUN_GENERATION,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Le({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,reason:B.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:_,confirmationSource:r,candidateToolIds:y,handledAt:Date.now()}),_e(T,{phase:J.SKIPPED,skipReason:B.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:_,confirmationSource:r,completedAt:Date.now(),candidateToolIds:y}),Ge(T,{phase:J.SKIPPED,eventType:t,messageId:b,skipReason:B.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:_,confirmationSource:r,candidateToolIds:y}),Wt(g,{traceId:T?.traceId||"",eventType:t,messageId:b,messageKey:"",skipReason:B.DRY_RUN_GENERATION,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(x.skip){H("warn","\u6839\u636E\u76D1\u542C\u5668\u8BBE\u7F6E\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,reason:x.reason,listenerSettings:x.listenerSettings,candidateToolIds:y}),ht({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,selectedToolIds:y,skipReason:x.reason,skipReasonDetailed:`listener_setting_${x.reason}`,confirmedAssistantMessageId:_,confirmationSource:r,lockedAiMessageId:b||""}),ps(g,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:x.reason,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Le({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,reason:x.reason,skipReasonDetailed:`listener_setting_${x.reason}`,confirmedAssistantMessageId:_,confirmationSource:r,candidateToolIds:y,handledAt:Date.now()}),_e(T,{phase:J.SKIPPED,skipReason:x.reason,skipReasonDetailed:`listener_setting_${x.reason}`,confirmedAssistantMessageId:_,confirmationSource:r,completedAt:Date.now(),candidateToolIds:y}),Ge(T,{phase:J.SKIPPED,eventType:t,messageId:b,skipReason:x.reason,skipReasonDetailed:`listener_setting_${x.reason}`,confirmedAssistantMessageId:_,confirmationSource:r,candidateToolIds:y}),Wt(g,{traceId:T?.traceId||"",eventType:t,messageId:b,messageKey:"",skipReason:x.reason,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(x.listenerSettings.ignoreQuietGeneration&&$c(i,o,a)){j("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C"),H("warn","\u68C0\u6D4B\u5230 quiet/dryRun\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,candidateToolIds:y}),ht({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",selectedToolIds:y,skipReason:B.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:_,confirmationSource:r}),ps(g,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:B.QUIET_GENERATION,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Le({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,reason:B.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:_,confirmationSource:r,candidateToolIds:y,handledAt:Date.now()}),_e(T,{phase:J.SKIPPED,skipReason:B.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:_,confirmationSource:r,completedAt:Date.now(),candidateToolIds:y}),Ge(T,{phase:J.SKIPPED,eventType:t,messageId:b,skipReason:B.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:_,confirmationSource:r,candidateToolIds:y}),Wt(g,{traceId:T?.traceId||"",eventType:t,messageId:b,messageKey:"",skipReason:B.QUIET_GENERATION,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}let p=await uo({...typeof e=="object"&&e?e:{},triggerEvent:t,...b?{messageId:b}:{},..._?{confirmedAssistantMessageId:_}:{},...r?{confirmationSource:r}:{},traceId:T?.traceId||"",sessionKey:T?.sessionKey||""});p.traceId=T?.traceId||p.traceId||Ct("exec"),p.sessionKey=T?.sessionKey||p.sessionKey||"";let K=p?.executionKey||gd(p||{});p.executionKey=K;let D=lo(p.chatId,p.messageId,t,p.generationTraceId);if(hd(T,D),_e(T,{messageId:p.messageId||b,messageKey:Bn(p),executionKey:K,confirmedAssistantMessageId:p.confirmedAssistantMessageId||_,slotBindingKey:p.slotBindingKey||"",slotRevisionKey:p.slotRevisionKey||"",slotTransactionId:p.slotTransactionId||"",confirmationSource:p.confirmationSource||r,confirmationMode:p?.confirmationMode||c,sameSlotRevisionCandidate:p?.sameSlotRevisionCandidate??l,sameSlotRevisionConfirmed:p?.sameSlotRevisionConfirmed??d,sameSlotRevisionSource:p?.sameSlotRevisionSource||u,sourceMessageLocked:!!p.messageId}),!p?.lastAiMessage){j(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`),H("warn","\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D\uFF0C\u81EA\u52A8\u89E6\u53D1\u4E2D\u6B62",{eventType:t,preferredMessageId:b,candidateToolIds:y});let I=Bn(p||{});ht({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:p?.messageId||"",messageKey:I,executionKey:K,slotBindingKey:p?.slotBindingKey||"",generationMessageBindingSource:p?.generationMessageBindingSource||"",sourceMessageId:p?.sourceMessageId||p?.messageId||"",sourceSwipeId:p?.sourceSwipeId||p?.effectiveSwipeId||"",confirmedAssistantSwipeId:p?.confirmedAssistantSwipeId||"",effectiveSwipeId:p?.effectiveSwipeId||"",slotRevisionKey:p?.slotRevisionKey||"",slotTransactionId:p?.slotTransactionId||"",selectedToolIds:y,skipReason:B.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,lockedAiMessageId:p?.messageId||""}),ps(g,{lastTriggerEvent:t,lastMessageKey:I,lastExecutionKey:K,lastSkipReason:B.MISSING_AI_MESSAGE,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Le({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:p?.messageId||b,messageKey:I,executionKey:K,slotBindingKey:p?.slotBindingKey||"",generationMessageBindingSource:p?.generationMessageBindingSource||"",sourceMessageId:p?.sourceMessageId||p?.messageId||"",sourceSwipeId:p?.sourceSwipeId||p?.effectiveSwipeId||"",confirmedAssistantSwipeId:p?.confirmedAssistantSwipeId||"",effectiveSwipeId:p?.effectiveSwipeId||"",slotRevisionKey:p?.slotRevisionKey||"",slotTransactionId:p?.slotTransactionId||"",reason:B.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,candidateToolIds:y,handledAt:Date.now()}),_e(T,{phase:J.SKIPPED,skipReason:B.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",messageKey:I,executionKey:K,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,completedAt:Date.now(),candidateToolIds:y}),Ge(T,{phase:J.SKIPPED,eventType:t,messageId:p?.messageId||b,messageKey:I,executionKey:K,skipReason:B.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,candidateToolIds:y}),Wt(g,{traceId:T?.traceId||"",eventType:t,messageId:p?.messageId||b,messageKey:I,skipReason:B.MISSING_AI_MESSAGE,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}let w=Bn(p);if(Td(K)){Ed(w,K)&&(j(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${w}`),H("warn","\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD\uFF0C\u8DF3\u8FC7\u6267\u884C",{eventType:t,messageKey:w,executionKey:K,candidateToolIds:y}),ht({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:p?.messageId||"",messageKey:w,executionKey:K,slotBindingKey:p?.slotBindingKey||"",generationMessageBindingSource:p?.generationMessageBindingSource||"",sourceMessageId:p?.sourceMessageId||p?.messageId||"",sourceSwipeId:p?.sourceSwipeId||p?.effectiveSwipeId||"",confirmedAssistantSwipeId:p?.confirmedAssistantSwipeId||"",effectiveSwipeId:p?.effectiveSwipeId||"",slotRevisionKey:p?.slotRevisionKey||"",slotTransactionId:p?.slotTransactionId||"",selectedToolIds:y,skipReason:B.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,lockedAiMessageId:p?.messageId||""}),ps(g,{lastTriggerEvent:t,lastMessageKey:w,lastExecutionKey:K,lastSkipReason:B.DUPLICATE_MESSAGE,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Le({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:p?.messageId||b,messageKey:w,executionKey:K,slotBindingKey:p?.slotBindingKey||"",generationMessageBindingSource:p?.generationMessageBindingSource||"",sourceMessageId:p?.sourceMessageId||p?.messageId||"",sourceSwipeId:p?.sourceSwipeId||p?.effectiveSwipeId||"",confirmedAssistantSwipeId:p?.confirmedAssistantSwipeId||"",effectiveSwipeId:p?.effectiveSwipeId||"",slotRevisionKey:p?.slotRevisionKey||"",slotTransactionId:p?.slotTransactionId||"",reason:B.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,candidateToolIds:y,handledAt:Date.now()}),_e(T,{phase:J.SKIPPED,skipReason:B.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",messageKey:w,executionKey:K,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,completedAt:Date.now(),candidateToolIds:y}),Ge(T,{phase:J.SKIPPED,eventType:t,messageId:p?.messageId||b,messageKey:w,executionKey:K,skipReason:B.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,candidateToolIds:y}),Wt(g,{traceId:T?.traceId||"",eventType:t,messageId:p?.messageId||b,messageKey:w,skipReason:B.DUPLICATE_MESSAGE,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""}));return}let O=g;if(O.length===0){j("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177"),H("warn","\u5F53\u524D\u4E8B\u4EF6\u672A\u547D\u4E2D\u4EFB\u4F55\u53EF\u6267\u884C\u5DE5\u5177",{eventType:t,messageKey:w,candidateToolIds:y}),ht({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:p?.messageId||"",messageKey:w,generationMessageBindingSource:p?.generationMessageBindingSource||"",confirmedAssistantSwipeId:p?.confirmedAssistantSwipeId||"",effectiveSwipeId:p?.effectiveSwipeId||"",selectedToolIds:[],skipReason:B.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,lockedAiMessageId:p?.messageId||""}),Le({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:p?.messageId||b,messageKey:w,generationMessageBindingSource:p?.generationMessageBindingSource||"",confirmedAssistantSwipeId:p?.confirmedAssistantSwipeId||"",effectiveSwipeId:p?.effectiveSwipeId||"",reason:B.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,candidateToolIds:[],handledAt:Date.now()}),_e(T,{phase:J.SKIPPED,skipReason:B.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",messageKey:w,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,completedAt:Date.now(),candidateToolIds:[]}),Ge(T,{phase:J.SKIPPED,eventType:t,messageId:p?.messageId||b,messageKey:w,skipReason:B.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,candidateToolIds:[]});return}S.lastHandledMessageKey=w,S.lastHandledExecutionKey=K,S.lastHandledSlotRevisionKey=p?.slotRevisionKey||K,Id(K,{messageKey:w,messageId:p?.messageId||b,generationTraceId:p?.generationTraceId||"",eventType:t,sessionKey:T?.sessionKey||""}),S.lastDuplicateMessageKey="",S.lastDuplicateExecutionKey="",S.lastDuplicateMessageAt=0,p.messageKey=w,ht({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:p?.messageId||"",messageKey:w,executionKey:K,slotBindingKey:p?.slotBindingKey||"",generationMessageBindingSource:p?.generationMessageBindingSource||"",sourceMessageId:p?.sourceMessageId||p?.messageId||"",sourceSwipeId:p?.sourceSwipeId||p?.effectiveSwipeId||"",confirmedAssistantSwipeId:p?.confirmedAssistantSwipeId||"",effectiveSwipeId:p?.effectiveSwipeId||"",slotRevisionKey:p?.slotRevisionKey||"",slotTransactionId:p?.slotTransactionId||"",selectedToolIds:O.map(I=>I.id),skipReason:"",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,lockedAiMessageId:p?.messageId||""}),j(`\u9700\u8981\u6267\u884C ${O.length} \u4E2A\u5DE5\u5177:`,O.map(I=>I.id)),H("info","\u81EA\u52A8\u89E6\u53D1\u547D\u4E2D\u5DE5\u5177",{eventType:t,messageKey:w,executionKey:K,toolIds:O.map(I=>I.id)}),nt("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${O.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"}),_e(T,{messageKey:w,executionKey:K,candidateToolIds:O.map(I=>I.id),executionPathIds:[],confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,phase:J.DISPATCHING}),Ge(T,{phase:J.DISPATCHING,eventType:t,messageId:p?.messageId||b,messageKey:w,executionKey:K,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,candidateToolIds:O.map(I=>I.id)}),Wt(O,{traceId:T?.traceId||"",eventType:t,messageId:p?.messageId||b,messageKey:w,executionKey:K,skipReason:"",executionPath:Yt.AUTO_POST_RESPONSE_API,writebackStatus:"",failureStage:""});for(let I of O)try{let P=await ia(I,p),ae=ta(I,p);T.executionPathIds.includes(ae)||T.executionPathIds.push(ae),Sd(I.id,{traceId:T?.traceId||"",eventType:t,messageId:p?.messageId||b,messageKey:w,executionKey:K,executionPath:ae,writebackStatus:P?.result?.meta?.writebackStatus||P?.meta?.writebackStatus||ne.NOT_APPLICABLE,failureStage:P?.result?.meta?.failureStage||P?.meta?.failureStage||"",contentCommitted:!!(P?.result?.meta?.writebackDetails?.contentCommitted||P?.meta?.writebackDetails?.contentCommitted),hostCommitApplied:!!(P?.result?.meta?.writebackDetails?.hostCommitApplied||P?.meta?.writebackDetails?.hostCommitApplied),refreshRequested:!!(P?.result?.meta?.writebackDetails?.refreshRequested||P?.meta?.writebackDetails?.refreshRequested),refreshConfirmed:!!(P?.result?.meta?.writebackDetails?.refreshConfirmed||P?.meta?.writebackDetails?.refreshConfirmed),preferredCommitMethod:P?.result?.meta?.writebackDetails?.commit?.preferredMethod||P?.meta?.writebackDetails?.commit?.preferredMethod||"",appliedCommitMethod:P?.result?.meta?.writebackDetails?.commit?.appliedMethod||P?.meta?.writebackDetails?.commit?.appliedMethod||"",refreshMethodCount:(P?.result?.meta?.writebackDetails?.refresh?.requestMethods||P?.meta?.writebackDetails?.refresh?.requestMethods||[]).length,refreshMethods:[...P?.result?.meta?.writebackDetails?.refresh?.requestMethods||P?.meta?.writebackDetails?.refresh?.requestMethods||[]],refreshConfirmChecks:P?.result?.meta?.writebackDetails?.refresh?.confirmChecks||P?.meta?.writebackDetails?.refresh?.confirmChecks||0,refreshConfirmedBy:P?.result?.meta?.writebackDetails?.refresh?.confirmedBy||P?.meta?.writebackDetails?.refresh?.confirmedBy||"",success:!!P?.success}),P.success?(j(`\u5DE5\u5177 ${I.id} \u6267\u884C\u6210\u529F`),L.emit(U.TOOL_EXECUTED,{toolId:I.id,result:P.result||P.data||P})):j(`\u5DE5\u5177 ${I.id} \u6267\u884C\u5931\u8D25:`,P.error)}catch(P){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${I.id}`,P)}S.lastExecutionContext=p,Le({stage:"completed",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:p?.messageId||b,messageKey:w,executionKey:K,slotBindingKey:p?.slotBindingKey||"",generationMessageBindingSource:p?.generationMessageBindingSource||"",sourceMessageId:p?.sourceMessageId||p?.messageId||"",sourceSwipeId:p?.sourceSwipeId||p?.effectiveSwipeId||"",confirmedAssistantSwipeId:p?.confirmedAssistantSwipeId||"",effectiveSwipeId:p?.effectiveSwipeId||"",slotRevisionKey:p?.slotRevisionKey||"",slotTransactionId:p?.slotTransactionId||"",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,candidateToolIds:O.map(I=>I.id),handledAt:Date.now()}),_e(T,{phase:J.COMPLETED,messageKey:w,executionKey:K,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,completedAt:Date.now(),candidateToolIds:O.map(I=>I.id)}),Ge(T,{phase:J.COMPLETED,eventType:t,messageId:p?.messageId||b,messageKey:w,executionKey:K,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||_,confirmationSource:p?.confirmationSource||r,candidateToolIds:O.map(I=>I.id),executionPathIds:[...T.executionPathIds||[]]})}async function Nd(t,e,s){return s||t.output?.mode===wt.POST_RESPONSE_API?ds.runToolPostResponse(t,e):(await id()).executeToolWithConfig(t.id,e)}function na(){if(S.initialized){j("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}Od(),kd(),S.initialized=!0,j("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),L.emit(U.TOOL_TRIGGER_INITIALIZED)}function Od(){let t=(a,r,c)=>{let l=jn(a,{messageId:r},{eventType:a,messageId:r});_e(l,{phase:J.IGNORED,skipReason:c,completedAt:Date.now()}),Ge(l,{phase:J.IGNORED,eventType:a,messageId:r,skipReason:c}),Le({stage:"ignored",eventType:a,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:r,reason:c,handledAt:Date.now()})},e=He(G.GENERATION_ENDED,async a=>{await Gs(G.GENERATION_ENDED,a)}),s=He(G.GENERATION_AFTER_COMMANDS,async a=>{let r=Ne(a,G.GENERATION_AFTER_COMMANDS);if(!be().useGenerationAfterCommandsFallback){t(G.GENERATION_AFTER_COMMANDS,r,"generation_after_commands_fallback_disabled");return}await Gs(G.GENERATION_AFTER_COMMANDS,a)}),n=He(G.MESSAGE_RECEIVED,async a=>{let r=Ne(a,G.MESSAGE_RECEIVED);if(!be().useMessageReceivedFallback){t(G.MESSAGE_RECEIVED,r,"message_received_fallback_disabled");return}await Gs(G.MESSAGE_RECEIVED,a)}),i=He(G.MESSAGE_UPDATED,async a=>{let r=Ne(a,G.MESSAGE_UPDATED);if(!be().useMessageReceivedFallback){t(G.MESSAGE_UPDATED,r,"message_received_fallback_disabled");return}await Gs(G.MESSAGE_UPDATED,a)}),o=He(G.MESSAGE_SWIPED,async a=>{let r=Ne(a,G.MESSAGE_SWIPED);if(!be().useMessageReceivedFallback){t(G.MESSAGE_SWIPED,r,"message_received_fallback_disabled");return}await Gs(G.MESSAGE_SWIPED,a)});S.listeners.set(G.GENERATION_ENDED,e),S.listeners.set(G.GENERATION_AFTER_COMMANDS,s),S.listeners.set(G.MESSAGE_RECEIVED,n),S.listeners.set(G.MESSAGE_UPDATED,i),S.listeners.set(G.MESSAGE_SWIPED,o)}async function uo(t){let e=t?.triggerEvent||"GENERATION_ENDED",s=N(t?.confirmedAssistantMessageId||t?.messageId||Ne(t,e)),n=e==="MANUAL"||e==="MANUAL_PREVIEW";if(!n&&s){let O=await Kr(s,{retries:3,retryDelayMs:80});if(O?.message&&Hn(O.message)==="assistant"&&fs(gs(O.message)))return Pd(O,{triggerEvent:e,traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",confirmationSource:t?.confirmationSource||"",confirmationMode:t?.confirmationMode||"slot_revision",generationTraceId:t?.generationTraceId||h.gateState.lastGenerationTraceId||"",sameSlotRevisionCandidate:t?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:t?.sameSlotRevisionConfirmed,sameSlotRevisionSource:t?.sameSlotRevisionSource||"",generationMessageBindingSource:t?.generationMessageBindingSource||t?.confirmationSource||"",confirmedAssistantSwipeId:t?.confirmedAssistantSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.confirmedAssistantSwipeId||"",retries:2,retryDelayMs:120});let I=await $s(),P=Ke(),ae=P?.getContext?.()||null,pe=Xe(P,ae,I),ie=N(t?.effectiveSwipeId||t?.confirmedAssistantSwipeId||t?.sourceSwipeId)||"swipe:current",Re=Us({chatId:pe,messageId:s}),Me=Dt({chatId:pe,messageId:s,effectiveSwipeId:ie,assistantContentFingerprint:""});return{triggeredAt:Date.now(),triggerEvent:e,traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",confirmationSource:String(t?.confirmationSource||"").trim(),confirmedAssistantMessageId:s,chatId:pe,messageId:s,generationTraceId:String(t?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),confirmationMode:String(t?.confirmationMode||"slot_revision").trim(),sameSlotRevisionCandidate:!!t?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!t?.sameSlotRevisionConfirmed,sameSlotRevisionSource:String(t?.sameSlotRevisionSource||"").trim(),rawGenerationType:h.gateState.lastGenerationBaseline?.rawGenerationType||h.gateState.lastGenerationType||"",rawGenerationParams:h.gateState.lastGenerationBaseline?.rawGenerationParams??h.gateState.lastGenerationParams??null,normalizedGenerationType:h.gateState.lastGenerationBaseline?.normalizedGenerationType||h.gateState.lastNormalizedGenerationType||"",generationAction:h.gateState.lastGenerationBaseline?.generationAction||h.gateState.lastGenerationAction||"",generationActionSource:h.gateState.lastGenerationBaseline?.generationActionSource||h.gateState.lastGenerationActionSource||"",generationMessageBindingSource:String(t?.generationMessageBindingSource||t?.confirmationSource||"event_message_id").trim(),slotBindingKey:Re,slotRevisionKey:Me,slotTransactionId:Ls({chatId:pe,messageId:s,effectiveSwipeId:ie,assistantContentFingerprint:"",eventType:e,generationTraceId:String(t?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),traceId:t?.traceId||""}),lastAiMessage:"",assistantContentFingerprint:"",lastAiMessageSwipeId:ie,confirmedAssistantSwipeId:ie,effectiveSwipeId:ie,sourceMessageId:s,sourceSwipeId:ie,userMessage:h.gateState.lastUserMessageText||"",chatMessages:[],input:{userMessage:h.gateState.lastUserMessageText||"",lastAiMessage:"",extractedContent:"",previousToolOutput:"",context:{character:I?.name||"",chatLength:0}},config:{},status:"pending",executionKey:Me}}let i=await $s(),o=Ke(),a=o?.getContext?.()||null,r=N(t?.confirmedAssistantMessageId||Ne(t,e)),c=String(t?.confirmationSource||"").trim(),l=String(t?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),d=n?Mt():await oo({traceId:l,retries:2,retryDelayMs:40})||Mt(),u=Jc(r),g=null,y=N(u.preferredMessageId);n||(g=await sd(y,{retries:y?3:8,retryDelayMs:y?120:260,allowSameSlotRevision:!0,requireObservedSameSlotRevision:!u.forceSameSlotRevision,forceSameSlotRevision:u.forceSameSlotRevision,forcedSameSlotSource:u.forcedSameSlotSource}),g&&(y=N(g.sourceId)));let x=jc(e,t,y)||!!y,b=await Ur({preferredMessageId:y||null,retries:n||y?2:0,retryDelayMs:120,lockToMessageId:x}),C=b.messages||[],$=b.lastUserMessage,z=b.lastAiMessage;n||(g?N(z?.sourceId)!==y&&(z=g):z=null);let _=y||N(z?.sourceId)||"",T=Rt(z?.content||""),p=N(g?.swipeId||z?.swipeId),K=Us({chatId:Xe(o,a,i),messageId:_}),D=Dt({chatId:Xe(o,a,i),messageId:_,effectiveSwipeId:p,assistantContentFingerprint:T}),w=Ls({chatId:Xe(o,a,i),messageId:_,effectiveSwipeId:p,assistantContentFingerprint:T,eventType:e,generationTraceId:l,traceId:t?.traceId||""});return{triggeredAt:Date.now(),triggerEvent:e,traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",confirmationSource:c,confirmedAssistantMessageId:_,chatId:Xe(o,a,i),messageId:_,generationTraceId:l,confirmationMode:String(t?.confirmationMode||g?.confirmationMode||"").trim(),sameSlotRevisionCandidate:!!(t?.sameSlotRevisionCandidate??g?.sameSlotRevisionCandidate),sameSlotRevisionConfirmed:!!(t?.sameSlotRevisionConfirmed??g?.sameSlotRevisionConfirmed),sameSlotRevisionSource:String(t?.sameSlotRevisionSource||g?.sameSlotRevisionSource||"").trim(),rawGenerationType:h.gateState.lastGenerationBaseline?.rawGenerationType||h.gateState.lastGenerationType||"",rawGenerationParams:h.gateState.lastGenerationBaseline?.rawGenerationParams??h.gateState.lastGenerationParams??null,normalizedGenerationType:h.gateState.lastGenerationBaseline?.normalizedGenerationType||h.gateState.lastNormalizedGenerationType||"",generationAction:h.gateState.lastGenerationBaseline?.generationAction||h.gateState.lastGenerationAction||"",generationActionSource:h.gateState.lastGenerationBaseline?.generationActionSource||h.gateState.lastGenerationActionSource||"",generationMessageBindingSource:u.bindingSource||"",slotBindingKey:K,slotRevisionKey:D,slotTransactionId:w,lastAiMessage:z?.content||"",assistantContentFingerprint:T,lastAiMessageSwipeId:p,confirmedAssistantSwipeId:p,effectiveSwipeId:p,sourceMessageId:_,sourceSwipeId:p,userMessage:$?.content||h.gateState.lastUserMessageText||"",chatMessages:C,input:{userMessage:$?.content||h.gateState.lastUserMessageText||"",lastAiMessage:z?.content||"",extractedContent:"",previousToolOutput:"",context:{character:i?.name||"",chatLength:C.length||0}},config:{},status:"pending",executionKey:D}}function $d(t){return as().filter(s=>{let n=s?.trigger?.enabled&&s?.trigger?.event===t,i=Array.isArray(s?.triggerEvents)&&s.triggerEvents.includes(t);return(n||i)&&ds.shouldRunPostResponse(s)})}function $n(t,e){try{Ui(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function ia(t,e){let s=Date.now(),n=t.id,i=e?.triggerEvent==="MANUAL",o=`yyt-tool-run-${n}`,a=ta(t,e),r=e?.messageKey||Bn(e||{}),c=e?.executionKey||"";$n(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||G.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),L.emit(U.TOOL_EXECUTION_REQUESTED,{toolId:n,traceId:e?.traceId||"",triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),nt("info",`${i?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:o}),H("info","\u5F00\u59CB\u6267\u884C\u5DE5\u5177",{toolId:n,toolName:t.name,triggerEvent:e?.triggerEvent,executionPath:a,messageKey:r});try{let l=await Nd(t,e,i),d=Date.now()-s;if(l?.success){let x=ye(n),b=l?.meta?.writebackDetails||{};$n(n,{lastStatus:"success",lastError:"",lastDurationMs:d,lastTraceId:e?.traceId||"",successCount:(x?.runtime?.successCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||G.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!b.contentCommitted,lastHostCommitApplied:!!b.hostCommitApplied,lastRefreshRequested:!!b.refreshRequested,lastRefreshConfirmed:!!b.refreshConfirmed,lastPreferredCommitMethod:b?.commit?.preferredMethod||"",lastAppliedCommitMethod:b?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(b?.refresh?.requestMethods)?b.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(b?.refresh?.requestMethods)?[...b.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(b?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:b?.refresh?.confirmedBy||""});let C=i?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return E("success",C),nt("success",C,{duration:3200,noticeId:o}),H("info","\u5DE5\u5177\u6267\u884C\u6210\u529F",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:d,writebackStatus:l?.meta?.writebackStatus||ne.NOT_APPLICABLE}),{success:!0,duration:d,result:l}}let u=ye(n),g=l?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",y=l?.meta?.writebackDetails||{};return $n(n,{lastStatus:"error",lastError:g,lastDurationMs:d,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||G.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||(a===Yt.MANUAL_COMPATIBILITY?Je.COMPATIBILITY_EXECUTE:Je.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(y?.refresh?.requestMethods)?[...y.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:y?.refresh?.confirmedBy||""}),E("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${g}`),nt("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${g}`,{sticky:!0,noticeId:o}),H("error","\u5DE5\u5177\u6267\u884C\u5931\u8D25",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:d,error:g,failureStage:l?.meta?.failureStage||""}),{success:!1,duration:d,error:g,result:l}}catch(l){let d=Date.now()-s,u=ye(n),g=l?.message||String(l);throw $n(n,{lastStatus:"error",lastError:g,lastDurationMs:d,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||G.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:a===Yt.MANUAL_COMPATIBILITY?Je.COMPATIBILITY_EXECUTE:Je.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),E("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${g}`),nt("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${g}`,{sticky:!0,noticeId:o}),H("error","\u5DE5\u5177\u6267\u884C\u629B\u51FA\u5F02\u5E38",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:d,error:g}),l}}async function po(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ye(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return rs(t,{lastTriggerAt:Date.now(),lastTriggerEvent:"MANUAL",lastMessageKey:"",lastExecutionKey:"",lastSkipReason:B.TOOL_DISABLED,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),nt("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await uo({triggerEvent:"MANUAL"});return H("info","\u624B\u52A8\u6267\u884C\u5DE5\u5177",{toolId:t}),ia(e,s)}async function yo(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ye(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await uo({triggerEvent:"MANUAL_PREVIEW"});return ds.previewExtraction(e,s)}function Bd(){for(let t of S.pendingMessageTimers.values())clearTimeout(t);S.pendingMessageTimers.clear();for(let t of S.listeners.values())typeof t=="function"&&t();S.listeners.clear();for(let t of S.internalSubscriptions)typeof t=="function"&&t();S.internalSubscriptions=[],S.messageSessions.clear(),S.handledExecutionKeys.clear(),S.writebackGuards.clear(),S.recentSessionHistory=[],S.recentEventTimeline=[],S.initialized=!1,S.lastExecutionContext=null,S.lastHandledMessageKey="",S.lastHandledExecutionKey="",S.lastHandledSlotRevisionKey="",S.lastAutoTriggerSnapshot=null,S.lastEventDebugSnapshot=null,S.lastDuplicateMessageKey="",S.lastDuplicateExecutionKey="",S.lastDuplicateMessageAt=0,j("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function Ud(){let t=Jr(8),e=Array.from(S.messageSessions.values()).map(ys).filter(Boolean).sort((i,o)=>(Number(i?.updatedAt)||0)-(Number(o?.updatedAt)||0)),s=[...S.recentSessionHistory].map(ys).filter(Boolean),n=[...S.recentEventTimeline].map(qr).filter(Boolean);return{initialized:S.initialized,listenersCount:S.listeners.size,activeSessionCount:S.messageSessions.size,activeSessions:e,recentSessionHistory:s,recentEventTimeline:n,lastExecutionContext:S.lastExecutionContext,lastAutoTriggerSnapshot:S.lastAutoTriggerSnapshot,lastEventDebugSnapshot:S.lastEventDebugSnapshot,registeredEvents:Array.from(S.listeners.keys()),pendingTimerCount:S.pendingMessageTimers.size,lastHandledMessageKey:S.lastHandledMessageKey,lastHandledExecutionKey:S.lastHandledExecutionKey,lastHandledSlotRevisionKey:S.lastHandledSlotRevisionKey,lastDuplicateExecutionKey:S.lastDuplicateExecutionKey,writebackGuardCount:S.writebackGuards.size,handledExecutionKeyCount:S.handledExecutionKeys.size,recentHandledExecutionKeys:t,lastSlotBindingKey:S.lastExecutionContext?.slotBindingKey||"",lastSlotTransactionId:S.lastExecutionContext?.slotTransactionId||"",lastSourceMessageId:S.lastExecutionContext?.sourceMessageId||"",lastSourceSwipeId:S.lastExecutionContext?.sourceSwipeId||"",listenerSettings:be(),eventBridge:Vr(),gateState:Yr()}}function zs(t={}){let e=parseInt(t?.historyLimit,10),s=Number.isFinite(e)?Math.max(1,Math.min(50,e)):8,n=Jr(s),i=h.gateState.lastGenerationBaseline,o=Array.from(S.messageSessions.values()).map(ys).filter(Boolean).sort((u,g)=>(Number(u?.updatedAt)||0)-(Number(g?.updatedAt)||0)),a=Bs([...S.recentSessionHistory],s).map(ys),r=Bs([...S.recentEventTimeline],Math.max(s*3,s)).map(qr),c={activeSessions:Nr(o),recentSessionHistory:Nr(a)},l={activeSessions:Or(o),recentSessionHistory:Or(a)},d=xd({summary:{listenerSettings:be()},activeSessions:o,recentSessionHistory:a,lastEventDebugSnapshot:S.lastEventDebugSnapshot,lastAutoTriggerSnapshot:S.lastAutoTriggerSnapshot});return{summary:{generationTraceId:h.gateState.lastGenerationTraceId||"",generationType:h.gateState.lastGenerationType||"",generationDryRun:!!h.gateState.lastGenerationDryRun,generationStartedAt:i?.startedAt||0,generationEndedAt:h.gateState.lastGenerationAt||0,isGenerating:!!h.gateState.isGenerating,baselineMessageCount:i?.messageCount||0,baselineAssistantId:i?.lastAssistantMessageId||"",uiTransitionGuardActive:Fn(),uiTransitionGuardUntil:h.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:h.gateState.lastUiTransitionSource||"",activeSessionCount:S.messageSessions.size,pendingTimerCount:S.pendingMessageTimers.size,lastHandledMessageKey:S.lastHandledMessageKey||"",lastHandledExecutionKey:S.lastHandledExecutionKey||"",lastHandledSlotRevisionKey:S.lastHandledSlotRevisionKey||"",lastDuplicateMessageKey:S.lastDuplicateMessageKey||"",lastDuplicateExecutionKey:S.lastDuplicateExecutionKey||"",handledExecutionKeyCount:S.handledExecutionKeys.size,recentHandledExecutionKeys:n,writebackGuardCount:S.writebackGuards.size,lastSlotBindingKey:S.lastExecutionContext?.slotBindingKey||"",lastSlotRevisionKey:S.lastExecutionContext?.slotRevisionKey||"",lastSlotTransactionId:S.lastExecutionContext?.slotTransactionId||"",lastGenerationMessageBindingSource:S.lastExecutionContext?.generationMessageBindingSource||"",lastSourceMessageId:S.lastExecutionContext?.sourceMessageId||"",lastSourceSwipeId:S.lastExecutionContext?.sourceSwipeId||"",lastConfirmedAssistantSwipeId:S.lastExecutionContext?.confirmedAssistantSwipeId||"",lastEffectiveSwipeId:S.lastExecutionContext?.effectiveSwipeId||"",lastConfirmedAssistantMessageId:S.lastExecutionContext?.confirmedAssistantMessageId||"",registeredEvents:Array.from(S.listeners.keys()),listenerSettings:be(),eventBridge:Vr(),gateState:Yr(),phaseCounts:c,consistency:l,verdictHints:d,...kt()},activeSessions:o,recentSessionHistory:a,recentEventTimeline:r,recentHandledExecutionKeys:n,verdictHints:d,lastEventDebugSnapshot:ys(S.lastEventDebugSnapshot),lastAutoTriggerSnapshot:ys(S.lastAutoTriggerSnapshot)}}function Wn(t={}){let e=zs(t);return JSON.parse(JSON.stringify({exportedAt:Date.now(),schemaVersion:"auto-trigger-diagnostics.v1",...e}))}function Ld(t={}){return zs(t)}function Kd(t={}){return Wn(t)}async function Zi(){if(h.isInitialized){j("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316"),H("info","\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316\uFF0C\u8DF3\u8FC7\u91CD\u590D\u521D\u59CB\u5316");return}let t=Ke();if(!t){j("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),H("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!1,hasEventTypes:!1}),setTimeout(Zi,1e3);return}let e=await zc(),s=e?.eventSource||Kn(),n=e?.eventTypes||zn();if(!s){j("\u65E0\u6CD5\u83B7\u53D6SillyTavern\u4E8B\u4EF6\u6E90\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),H("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,importError:ue.importError?.message||""}),setTimeout(Zi,1e3);return}H("info","\u5F00\u59CB\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,listenerSettings:be()}),H("info","\u4F7F\u7528\u4E8B\u4EF6\u6E90",{source:e?.source||ue.source||"unknown"}),Oc(),He(G.MESSAGE_SENT,async i=>{let a=(await ao({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(r=>r.role==="user").pop();At({lastUserSendIntentAt:Date.now(),lastUserIntentSource:"message_sent",lastUserMessageId:i,lastUserMessageAt:Date.now(),lastUserMessageText:a?.content||h.gateState.lastUserMessageText||""}),j(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${i}`),H("info","\u8BB0\u5F55\u7528\u6237\u53D1\u9001\u610F\u56FE",{messageId:i,lastUserMessage:a?.content||""}),Vt({kind:"gate_event",eventType:G.MESSAGE_SENT,messageId:i,phase:"user_intent_recorded",detail:"message_sent"})}),He(G.GENERATION_STARTED,async(i,o,a)=>{let r=Date.now(),c=Ct("generation"),l=Fr(i,o||null),d=Wc(i,o||null,r),u=d.startedByUserIntent,g=d.userIntentDetectedAt,y=d.userIntentSource,x=d.userIntentDetail,b=Yc({traceId:c,startedAt:r,type:i,params:o||null,rawGenerationType:l.rawGenerationType,rawGenerationParams:l.rawGenerationParams,normalizedGenerationType:l.normalizedGenerationType,generationAction:l.generationAction,generationActionSource:l.generationActionSource,explicitGenerationAction:l.explicitGenerationAction,dryRun:!!a,startedByUserIntent:u,userIntentDetectedAt:g,userIntentSource:y,userIntentDetail:x,baselineResolved:!1,provisional:!0,baselineSource:"generation_started_sync_provisional"});At({lastGenerationTraceId:c,lastGenerationType:l.rawGenerationType||i,lastGenerationParams:o||null,lastNormalizedGenerationType:l.normalizedGenerationType||"",lastGenerationAction:l.generationAction||"",lastGenerationActionSource:l.generationActionSource||"",lastGenerationDryRun:!!a,isGenerating:!0,lastGenerationBaseline:b}),j(`\u751F\u6210\u5F00\u59CB: ${i}`),H("info","\u6536\u5230\u751F\u6210\u5F00\u59CB\u4E8B\u4EF6",{type:i,dryRun:!!a,params:o||null,generationAction:l.generationAction,generationActionSource:l.generationActionSource,traceId:c,startedByUserIntent:u,userIntentSource:y,userIntentDetail:x,baseline:b}),Vt({kind:"generation_event",eventType:G.GENERATION_STARTED,traceId:c,phase:"generation_started",detail:l.generationAction||no(i,o||null),generationTraceId:c,baselineResolved:!1,generationStartedByUserIntent:u,generationUserIntentSource:y}),Vc({traceId:c,startedAt:r,type:i,params:o||null,rawGenerationType:l.rawGenerationType,rawGenerationParams:l.rawGenerationParams,normalizedGenerationType:l.normalizedGenerationType,generationAction:l.generationAction,generationActionSource:l.generationActionSource,explicitGenerationAction:l.explicitGenerationAction,dryRun:!!a,startedByUserIntent:u,userIntentDetectedAt:g,userIntentSource:y,userIntentDetail:x,baselineResolved:!0,provisional:!1,baselineResolutionAt:Date.now(),baselineSource:"generation_started_async_resolved"}).then(C=>{let $=h.gateState.lastGenerationBaseline;if(!$||$.traceId!==c){H("info","generation baseline \u5DF2\u8FC7\u671F\uFF0C\u653E\u5F03\u56DE\u586B",{traceId:c,currentTraceId:$?.traceId||""});return}At({lastGenerationBaseline:C}),H("info","generation baseline \u5DF2\u5B8C\u6210\u89E3\u6790",{traceId:c,baseline:C}),Vt({kind:"generation_baseline",eventType:G.GENERATION_STARTED,traceId:c,phase:"baseline_resolved",detail:C?.baselineSource||"generation_started_async_resolved",generationTraceId:c,baselineResolved:!0,generationStartedByUserIntent:C?.startedByUserIntent,generationUserIntentSource:C?.userIntentSource||""})}).catch(C=>{let $=h.gateState.lastGenerationBaseline;if(!$||$.traceId!==c)return;let z={...$,baselineResolved:!0,baselineResolutionAt:Date.now(),provisional:!1,baselineSource:"generation_started_async_failed_fallback"};At({lastGenerationBaseline:z}),H("warn","generation baseline \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u56DE\u9000\u5230 provisional baseline",{traceId:c,error:C?.message||String(C),baseline:z}),Vt({kind:"generation_baseline",eventType:G.GENERATION_STARTED,traceId:c,phase:"baseline_fallback",reason:"generation_baseline_async_failed",detail:C?.message||String(C),generationTraceId:c,baselineResolved:!0,generationStartedByUserIntent:z?.startedByUserIntent,generationUserIntentSource:z?.userIntentSource||""})})}),He(G.GENERATION_ENDED,()=>{At({lastGenerationAt:Date.now(),isGenerating:!1}),j("\u751F\u6210\u7ED3\u675F"),H("info","\u6536\u5230\u751F\u6210\u7ED3\u675F\u4E8B\u4EF6"),Vt({kind:"generation_event",eventType:G.GENERATION_ENDED,traceId:h.gateState.lastGenerationTraceId||"",phase:"generation_ended",generationTraceId:h.gateState.lastGenerationTraceId||"",detail:h.gateState.lastGenerationAction||h.gateState.lastNormalizedGenerationType||""})}),He(G.CHAT_CHANGED,i=>{kr(G.CHAT_CHANGED),Pr("chat_changed"),H("info","\u6536\u5230\u804A\u5929\u5207\u6362\u4E8B\u4EF6",{data:i??null}),Vt({kind:"ui_guard",eventType:G.CHAT_CHANGED,phase:"ui_transition_guard_entered",detail:"chat_changed"})}),He(G.CHAT_CREATED,i=>{kr(G.CHAT_CREATED),Pr("chat_created"),H("info","\u6536\u5230\u804A\u5929\u521B\u5EFA\u4E8B\u4EF6",{data:i??null}),Vt({kind:"ui_guard",eventType:G.CHAT_CREATED,phase:"ui_transition_guard_entered",detail:"chat_created"})}),na(),h.isInitialized=!0,j("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210"),H("info","\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210",{listenerSettings:be()})}function zd(t){h.debugMode=t}var G,h,Rc,ue,B,Yt,J,$r,Mc,Cr,Cc,Dc,kc,Dr,Br,Pc,Gn,S,go=X(()=>{Ee();ks();ls();qi();it();G={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_SWIPED:"MESSAGE_SWIPED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},h={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastNormalizedGenerationType:"",lastGenerationAction:"",lastGenerationActionSource:"",lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""},isInitialized:!1,debugMode:!1},Rc="/script.js",ue={eventSource:null,eventTypes:null,source:"",scriptModule:null,loadingPromise:null,importError:null},B={LISTENER_DISABLED:"listener_disabled",QUIET_GENERATION:"quiet_generation",DRY_RUN_GENERATION:"dry_run_generation",IGNORED_AUTO_TRIGGER:"ignored_auto_trigger",UNRELATED_UI_EVENT:"ui_side_effect_event",WRITEBACK_ECHO_EVENT:"writeback_echo_event",SLOT_EVENT_OUTSIDE_WINDOW:"slot_event_outside_window",SPECULATIVE_FALLBACK_WITHOUT_MESSAGE:"speculative_generation_after_commands",NO_CONFIRMED_ASSISTANT_MESSAGE:"no_confirmed_assistant_message",HISTORICAL_REPLAY_MESSAGE_RECEIVED:"historical_replay_message_received",MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION:"message_received_outside_active_generation",NON_ASSISTANT_MESSAGE:"non_assistant_message",MISSING_AI_MESSAGE:"missing_ai_message",DUPLICATE_MESSAGE:"duplicate_message",NO_ELIGIBLE_TOOLS:"no_eligible_tools",TOOL_DISABLED:"tool_disabled"},Yt={AUTO_POST_RESPONSE_API:"auto_post_response_api",MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"},J={RECEIVED:"received",SCHEDULED:"scheduled",DISPATCHING:"dispatching",HANDLING:"handling",COMPLETED:"completed",SKIPPED:"skipped",IGNORED:"ignored"},$r=15e3,Mc=1500,Cr=1800,Cc=6e4,Dc=12e3,kc=2500,Dr=new Set(["reroll","regenerate","swipe"]),Br=new Set(["reroll","regenerate","swipe"]),Pc=["type","action","name","mode","source","reason","kind","command","operation","event","trigger","generationType","generation_type","regenType","regen_type"],Gn=null;S={initialized:!1,listeners:new Map,messageSessions:new Map,handledExecutionKeys:new Map,writebackGuards:new Map,recentSessionHistory:[],recentEventTimeline:[],lastExecutionContext:null,lastHandledMessageKey:"",lastHandledExecutionKey:"",lastHandledSlotRevisionKey:"",pendingMessageTimers:new Map,lastAutoTriggerSnapshot:null,lastEventDebugSnapshot:null,lastDuplicateMessageKey:"",lastDuplicateExecutionKey:"",lastDuplicateMessageAt:0,internalSubscriptions:[]}});var aa={};he(aa,{TOOL_CONFIG_PANEL_STYLES:()=>ra,createToolConfigPanel:()=>Pt,default:()=>Fd});function Pt(t){let{id:e,toolId:s,postResponseHint:n,extractionPlaceholder:i,previewDialogId:o,previewTitle:a="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let r=ye(this.toolId);if(!r)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let c=this._getApiPresets(),l=r.output?.apiPreset||r.apiPreset||"",d=this._getBypassPresets(),u=r.output?.mode||"follow_ai",g=r.bypass?.enabled||!1,y=r.bypass?.presetId||"",x=r.runtime?.lastStatus||"idle",b=r.runtime?.lastRunAt?new Date(r.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",C=r.runtime?.lastError||"",$=r.extraction||{},z=Array.isArray($.selectors)?$.selectors.join(`
`):"",_=u==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",T=zs({historyLimit:8}),p=this._buildDiagnosticsHtml(r.runtime||{},T),K=u==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",D=l||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${A(r.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${A(r.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${A(K)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${A(D)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${A(x)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${m}-tool-save-top">
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
              <select class="yyt-select" id="${m}-tool-output-mode">
                <option value="follow_ai" ${u==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${u==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${_}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${m}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${c.map(w=>`
                  <option value="${A(w.name)}" ${w.name===l?"selected":""}>
                    ${A(w.name)}
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
                <input type="checkbox" id="${m}-tool-bypass-enabled" ${g?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${g?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${m}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${d.map(w=>`
                  <option value="${A(w.id)}" ${w.id===y?"selected":""}>
                    ${A(w.name)}${w.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="number" class="yyt-input" id="${m}-tool-max-messages" min="1" max="50" value="${Number($.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${m}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${A(i)}">${A(z)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${m}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${m}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${A(r.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${A(x)}">${A(x)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${A(b)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${r.runtime?.successCount||0} / ${r.runtime?.errorCount||0}</span>
                </div>
                ${C?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${A(C)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${m}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${m}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${m}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86\u7834\u9650\u8BCD\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>

          ${p}
        </div>
      `},_formatDiagnosticValue(r,c="\u672A\u8BB0\u5F55"){let l=String(r||"").trim();return A(l||c)},_formatDiagnosticTime(r){let c=Number(r)||0;return c>0?new Date(c).toLocaleString():"\u672A\u8BB0\u5F55"},_formatSkipReason(r){return{listener_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u81EA\u52A8\u76D1\u542C\u5DF2\u5173\u95ED",quiet_generation:"\u5DF2\u8DF3\u8FC7\uFF1Aquiet / dryRun \u751F\u6210",dry_run_generation:"\u5DF2\u8DF3\u8FC7\uFF1A\u5F53\u524D generation \u4E3A dryRun",ignored_auto_trigger:"\u5DF2\u8DF3\u8FC7\uFF1A\u76D1\u542C\u5668\u8BBE\u7F6E\u5FFD\u7565\u4E86\u975E\u7528\u6237\u610F\u56FE\u751F\u6210",ui_side_effect_event:"\u5DF2\u5FFD\u7565\uFF1A\u5BBF\u4E3B UI \u526F\u4F5C\u7528\u4E8B\u4EF6",writeback_echo_event:"\u5DF2\u5FFD\u7565\uFF1A\u672C\u6B21 MESSAGE_UPDATED \u6765\u81EA\u5DE5\u5177\u5199\u56DE\u56DE\u54CD",slot_event_outside_window:"\u5DF2\u5FFD\u7565\uFF1A\u697C\u5C42\u4E8B\u4EF6\u4E0D\u5728\u6700\u8FD1 generation / \u7528\u6237\u610F\u56FE\u7A97\u53E3\u5185",speculative_generation_after_commands:"\u5DF2\u5FFD\u7565\uFF1A\u4EC5\u8BB0\u5F55 GENERATION_AFTER_COMMANDS \u89C2\u5BDF\u6001 session",no_confirmed_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u786E\u8BA4\u5230\u5F53\u524D\u697C\u5C42 / \u5F53\u524D swipe \u7684\u53EF\u5904\u7406 assistant \u72B6\u6001",historical_replay_message_received:"\u5DF2\u62E6\u622A\uFF1A\u5386\u53F2 assistant \u6D88\u606F\u91CD\u653E\u4E8B\u4EF6",message_received_outside_active_generation:"\u5DF2\u62E6\u622A\uFF1AMESSAGE_RECEIVED \u4E0D\u5C5E\u4E8E\u5F53\u524D\u751F\u6210\u7A97\u53E3",non_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u7684\u5E76\u975E AI \u697C\u5C42",missing_ai_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D",duplicate_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD",no_eligible_tools:"\u5DF2\u8DF3\u8FC7\uFF1A\u6CA1\u6709\u547D\u4E2D\u53EF\u6267\u884C\u5DE5\u5177",tool_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u5DE5\u5177\u672A\u542F\u7528",generation_after_commands_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AGENERATION_AFTER_COMMANDS \u515C\u5E95\u5DF2\u5173\u95ED",message_received_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AMESSAGE_RECEIVED \u515C\u5E95\u5DF2\u5173\u95ED"}[r]||r||"\u65E0"},_formatExecutionPath(r){return{auto_post_response_api:"\u81EA\u52A8\u94FE\uFF1Apost_response_api",manual_post_response_api:"\u624B\u52A8\u94FE\uFF1Apost_response_api",manual_compatibility:"\u624B\u52A8\u94FE\uFF1Acompatibility \u56DE\u9000"}[r]||r||"\u672A\u8BB0\u5F55"},_formatCommitMethod(r){return{setChatMessages:"setChatMessages",setChatMessage:"setChatMessage",local_only:"local_only",none:"none"}[r]||r||"\u672A\u8BB0\u5F55"},_formatWritebackStatus(r){return{success:"\u5199\u56DE\u6210\u529F",failed:"\u5199\u56DE\u5931\u8D25",skipped_empty_output:"\u65E0\u8F93\u51FA\uFF0C\u8DF3\u8FC7\u5199\u56DE",not_applicable:"\u4E0D\u9002\u7528"}[r]||r||"\u672A\u8BB0\u5F55"},_formatFailureStage(r){return{build_messages:"\u6784\u9020\u8BF7\u6C42\u6D88\u606F",send_api_request:"\u53D1\u9001 API \u8BF7\u6C42",extract_output:"\u63D0\u53D6\u5DE5\u5177\u8F93\u51FA",inject_context:"\u5199\u56DE\u4E0A\u4E0B\u6587",compatibility_execute:"\u517C\u5BB9\u6267\u884C\u5165\u53E3",unknown:"\u672A\u77E5\u9636\u6BB5"}[r]||r||"\u65E0"},_formatBooleanState(r){return r?"\u662F":"\u5426"},_formatHandledExecutionKeysText(r=[]){let c=Array.isArray(r)?r.filter(Boolean):[];return c.length?c.slice(-3).map(l=>String(l?.executionKey||"").trim()||"\u672A\u8BB0\u5F55").join(" / "):"\u65E0"},_formatHistoryTime(r){return this._formatDiagnosticTime(r)},_formatPhaseCountsText(r={}){let c=Object.entries(r||{}).filter(([,l])=>Number(l)>0);return c.length?c.map(([l,d])=>`${l}:${d}`).join(" / "):"\u65E0"},_formatEventBridgeText(r={}){if(!r||r.ready!==!0)return"\u672A\u5C31\u7EEA";let c=String(r.source||"").trim();return c?`\u5DF2\u5C31\u7EEA\uFF08${c}\uFF09`:"\u5DF2\u5C31\u7EEA"},_formatVerdictHintLabel(r=""){return{a10BaselineRaceSuspicious:"A10 baseline",a11ReplaySuspicious:"A11 replay",a12UserIntentSuspicious:"A12 user intent",a13AutoTriggerLeakSuspicious:"A13 auto trigger"}[r]||r||"\u672A\u77E5\u9879"},_buildVerdictHintsHtml(r={}){let c=Object.entries(r||{});return c.length?`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">N1 \u5FEB\u901F\u5224\u8BFB</div>
          <div class="yyt-tool-debug-chip-list">
            ${c.map(([l,d])=>{let u=!!d?.flagged,g=Array.isArray(d?.reasons)?d.reasons.filter(Boolean):[],y=g.length?A(g.join(" | ")):"\u672A\u89C1\u660E\u663E\u53EF\u7591\u4FE1\u53F7";return`
                <span class="yyt-tool-debug-chip ${u?"yyt-tool-debug-chip-warning":"yyt-tool-debug-chip-ok"}" title="${y}">
                  ${A(this._formatVerdictHintLabel(l))}
                  <strong>${u?"\u53EF\u7591":"\u6B63\u5E38"}</strong>
                </span>
              `}).join("")}
          </div>
        </div>
      `:""},_buildTimelineSection(r,c=[]){let l=Array.isArray(c)?c.filter(Boolean).slice().reverse():[];if(!l.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${A(r)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let d=l.map(u=>{let g=this._formatDiagnosticValue(u.eventType||u.kind,"\u672A\u8BB0\u5F55"),y=this._formatDiagnosticValue(u.traceId,"\u65E0"),x=this._formatDiagnosticValue(u.sessionKey,"\u65E0"),b=[u.phase?`\u9636\u6BB5\uFF1A${u.phase}`:"",u.messageId?`\u6D88\u606F\uFF1A${u.messageId}`:"",u.executionKey?`execution\uFF1A${u.executionKey}`:"",u.confirmationSource?`\u786E\u8BA4\uFF1A${u.confirmationSource}`:"",u.reason?`\u539F\u56E0\uFF1A${this._formatSkipReason(u.reason)}`:"",u.detail?`\u8BE6\u60C5\uFF1A${u.detail}`:""].filter(Boolean);return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${A(this._formatHistoryTime(u.at))}</span>
              <span>${g}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              trace\uFF1A${y}<br>
              session\uFF1A${x}<br>
              ${A(b.join(" / ")||"\u65E0\u9644\u52A0\u8BE6\u60C5")}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${A(r)}</div>
          <div class="yyt-tool-debug-history-list">${d}</div>
        </div>
      `},_copyText(r){let c=String(r||"");if(!c)return!1;try{if(navigator?.clipboard?.writeText)return navigator.clipboard.writeText(c),!0}catch{}try{let l=document.createElement("textarea");l.value=c,l.setAttribute("readonly","readonly"),l.style.position="fixed",l.style.opacity="0",document.body.appendChild(l),l.select();let d=document.execCommand("copy");return document.body.removeChild(l),d}catch{return!1}},_copyAutoTriggerDiagnostics(){try{let r=Wn({historyLimit:8});this._copyText(JSON.stringify(r,null,2))?E("success","\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u5DF2\u590D\u5236"):E("warning","\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u5728\u63A7\u5236\u53F0\u5BFC\u51FA")}catch(r){E("error",r?.message||"\u5BFC\u51FA\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u5931\u8D25")}},_buildHistorySection(r,c=[],l="trigger"){let d=Array.isArray(c)?c.filter(Boolean).slice().reverse():[];if(!d.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${A(r)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let u=d.map(g=>{let y=this._formatDiagnosticValue(g.eventType,"\u672A\u8BB0\u5F55"),x=this._formatDiagnosticValue(g.messageKey||g.messageId,"\u672A\u8BB0\u5F55"),b=this._formatDiagnosticValue(g.traceId,"\u65E0"),C=this._formatDiagnosticValue(g.executionKey,"\u65E0"),$=l==="writeback"?`\u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(g.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(g.writebackStatus)} / \u5185\u5BB9\u63D0\u4EA4\uFF1A${this._formatBooleanState(g.contentCommitted)} / \u5BBF\u4E3B\u63D0\u4EA4\uFF1A${this._formatBooleanState(g.hostCommitApplied)} / \u4E3B\u63D0\u4EA4\uFF1A${this._formatCommitMethod(g.preferredCommitMethod)} / \u5B9E\u9645\u63D0\u4EA4\uFF1A${this._formatCommitMethod(g.appliedCommitMethod)} / \u5237\u65B0\u8BF7\u6C42\uFF1A${this._formatBooleanState(g.refreshRequested)} / \u5237\u65B0\u786E\u8BA4\uFF1A${this._formatBooleanState(g.refreshConfirmed)} / \u5237\u65B0\u901A\u9053\uFF1A${Array.isArray(g.refreshMethods)&&g.refreshMethods.length?g.refreshMethods.join(", "):g.refreshMethodCount??0} / \u786E\u8BA4\u8F6E\u6570\uFF1A${g.refreshConfirmChecks??0} / \u786E\u8BA4\u6765\u6E90\uFF1A${this._formatDiagnosticValue(g.refreshConfirmedBy,"\u65E0")} / \u5931\u8D25\u9636\u6BB5\uFF1A${this._formatFailureStage(g.failureStage)}`:`\u8DF3\u8FC7\u539F\u56E0\uFF1A${this._formatSkipReason(g.skipReason)} / \u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(g.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(g.writebackStatus)}`;return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${A(this._formatHistoryTime(g.at))}</span>
              <span>trace ${b}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              \u4E8B\u4EF6\uFF1A${y}<br>
              \u6D88\u606F\uFF1A${x}<br>
              execution\uFF1A${C}<br>
              ${A($)}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${A(r)}</div>
          <div class="yyt-tool-debug-history-list">${u}</div>
        </div>
      `},_buildDiagnosticsHtml(r,c=null){let l=r||{},d=c||null,u=d?.summary||{},g=d?.lastEventDebugSnapshot||{},y=d?.lastAutoTriggerSnapshot||{},x=!!(Array.isArray(d?.activeSessions)&&d.activeSessions.length>0||Array.isArray(d?.recentSessionHistory)&&d.recentSessionHistory.length>0||Array.isArray(d?.recentEventTimeline)&&d.recentEventTimeline.length>0||u?.activeSessionCount||u?.pendingTimerCount||u?.lastHandledMessageKey||u?.lastHandledExecutionKey||u?.handledExecutionKeyCount||u?.eventBridge?.ready);if(!!!(l.lastTriggerAt||l.lastTriggerEvent||l.lastMessageKey||l.lastExecutionKey||l.lastSkipReason||l.lastExecutionPath||l.lastWritebackStatus||l.lastFailureStage||l.lastContentCommitted||l.lastHostCommitApplied||l.lastRefreshRequested||l.lastRefreshConfirmed||l.lastTraceId||Array.isArray(l.recentTriggerHistory)&&l.recentTriggerHistory.length>0||Array.isArray(l.recentWritebackHistory)&&l.recentWritebackHistory.length>0||x))return"";let C=[["\u6700\u8FD1\u89E6\u53D1\u65F6\u95F4",this._formatDiagnosticTime(l.lastTriggerAt)],["\u6700\u8FD1\u89E6\u53D1\u4E8B\u4EF6",this._formatDiagnosticValue(l.lastTriggerEvent)],["\u6700\u8FD1 Trace",this._formatDiagnosticValue(l.lastTraceId,"\u65E0")],["\u6700\u8FD1\u6D88\u606F\u952E",this._formatDiagnosticValue(l.lastMessageKey)],["\u6700\u8FD1 execution key",this._formatDiagnosticValue(l.lastExecutionKey)],["\u6700\u8FD1 slot binding",this._formatDiagnosticValue(l.lastSlotBindingKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 slot revision",this._formatDiagnosticValue(l.lastSlotRevisionKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 slot transaction",this._formatDiagnosticValue(l.lastSlotTransactionId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 sourceMessageId",this._formatDiagnosticValue(l.lastSourceMessageId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 sourceSwipeId",this._formatDiagnosticValue(l.lastSourceSwipeId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u8DF3\u8FC7\u539F\u56E0",this._formatDiagnosticValue(this._formatSkipReason(l.lastSkipReason),"\u65E0")],["\u6700\u8FD1\u6267\u884C\u8DEF\u5F84",this._formatDiagnosticValue(this._formatExecutionPath(l.lastExecutionPath))],["\u6700\u8FD1\u5199\u56DE\u72B6\u6001",this._formatDiagnosticValue(this._formatWritebackStatus(l.lastWritebackStatus))],["\u6700\u8FD1\u5931\u8D25\u9636\u6BB5",this._formatDiagnosticValue(this._formatFailureStage(l.lastFailureStage),"\u65E0")],["\u6700\u8FD1\u5185\u5BB9\u63D0\u4EA4",this._formatDiagnosticValue(this._formatBooleanState(l.lastContentCommitted),"\u5426")],["\u6700\u8FD1\u5BBF\u4E3B\u63D0\u4EA4",this._formatDiagnosticValue(this._formatBooleanState(l.lastHostCommitApplied),"\u5426")],["\u6700\u8FD1\u4E3B\u63D0\u4EA4\u7B56\u7565",this._formatDiagnosticValue(this._formatCommitMethod(l.lastPreferredCommitMethod),"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5B9E\u9645\u63D0\u4EA4\u7B56\u7565",this._formatDiagnosticValue(this._formatCommitMethod(l.lastAppliedCommitMethod),"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5237\u65B0\u8BF7\u6C42",this._formatDiagnosticValue(this._formatBooleanState(l.lastRefreshRequested),"\u5426")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4",this._formatDiagnosticValue(this._formatBooleanState(l.lastRefreshConfirmed),"\u5426")],["\u6700\u8FD1\u5237\u65B0\u901A\u9053",this._formatDiagnosticValue(Array.isArray(l.lastRefreshMethods)&&l.lastRefreshMethods.length?l.lastRefreshMethods.join(", "):String(l.lastRefreshMethodCount??0),"0")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4\u8F6E\u6570",this._formatDiagnosticValue(String(l.lastRefreshConfirmChecks??0),"0")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4\u6765\u6E90",this._formatDiagnosticValue(l.lastRefreshConfirmedBy,"\u65E0")]],$=this._buildHistorySection("\u6700\u8FD1\u89E6\u53D1\u5386\u53F2",l.recentTriggerHistory||[],"trigger"),z=this._buildHistorySection("\u6700\u8FD1\u5199\u56DE\u5386\u53F2",l.recentWritebackHistory||[],"writeback"),_=x?[["\u5F53\u524D active / timers",`${u.activeSessionCount||0} / ${u.pendingTimerCount||0}`],["\u4E8B\u4EF6\u6865\u63A5",this._formatEventBridgeText(u.eventBridge)],["\u5F53\u524D generation \u52A8\u4F5C",this._formatDiagnosticValue(u.generationAction,"\u672A\u8BB0\u5F55")],["\u5F53\u524D\u539F\u59CB generation type",this._formatDiagnosticValue(u.rawGenerationType,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 slot binding",this._formatDiagnosticValue(u.lastSlotBindingKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 slot revision",this._formatDiagnosticValue(u.lastSlotRevisionKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 slot transaction",this._formatDiagnosticValue(u.lastSlotTransactionId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5DF2\u5904\u7406 slot revision",this._formatDiagnosticValue(u.lastHandledSlotRevisionKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u697C\u5C42\u7ED1\u5B9A\u6765\u6E90",this._formatDiagnosticValue(u.lastGenerationMessageBindingSource,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 sourceMessageId",this._formatDiagnosticValue(u.lastSourceMessageId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 sourceSwipeId",this._formatDiagnosticValue(u.lastSourceSwipeId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u786E\u8BA4\u697C\u5C42",this._formatDiagnosticValue(u.lastConfirmedAssistantMessageId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u786E\u8BA4 swipe",this._formatDiagnosticValue(u.lastConfirmedAssistantSwipeId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 effective swipe",this._formatDiagnosticValue(u.lastEffectiveSwipeId,"\u672A\u8BB0\u5F55")],["\u5199\u56DE\u5B88\u536B\u6570",this._formatDiagnosticValue(String(u.writebackGuardCount??0),"0")],["\u6700\u8FD1\u786E\u8BA4\u6A21\u5F0F",this._formatDiagnosticValue(g.confirmationMode||y.confirmationMode,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u540C\u697C\u5C42 revision",this._formatDiagnosticValue(g.sameSlotRevisionConfirmed?`\u5DF2\u786E\u8BA4 (${g.sameSlotRevisionSource||"same_slot_revision"})`:g.sameSlotRevisionCandidate?`\u5019\u9009 (${g.sameSlotRevisionSource||"\u5F85\u786E\u8BA4"})`:"\u5426","\u5426")],["\u6700\u8FD1\u5904\u7406\u6D88\u606F\u952E",this._formatDiagnosticValue(u.lastHandledMessageKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5904\u7406 execution key",this._formatDiagnosticValue(u.lastHandledExecutionKey,"\u672A\u8BB0\u5F55")],["\u5DF2\u5904\u7406 execution key \u6570",this._formatDiagnosticValue(String(u.handledExecutionKeyCount??0),"0")],["\u6700\u8FD1 execution key \u8F68\u8FF9",this._formatDiagnosticValue(this._formatHandledExecutionKeysText(u.recentHandledExecutionKeys),"\u65E0")],["Active phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(u.phaseCounts?.activeSessions),"\u65E0")],["History phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(u.phaseCounts?.recentSessionHistory),"\u65E0")]]:[],T=x?this._buildVerdictHintsHtml(d?.verdictHints||u?.verdictHints||{}):"",p=x?this._buildTimelineSection("\u6700\u8FD1\u81EA\u52A8\u89E6\u53D1\u65F6\u95F4\u7EBF",(d?.recentEventTimeline||[]).slice(-6)):"";return`
        <details class="yyt-tool-debug-panel">
          <summary class="yyt-tool-debug-summary">\u6700\u8FD1\u89E6\u53D1\u8BCA\u65AD</summary>
          <div class="yyt-tool-debug-content">
            ${C.map(([K,D])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${K}</span>
                <span class="yyt-tool-runtime-value">${D}</span>
              </div>
            `).join("")}
            ${_.map(([K,D])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${K}</span>
                <span class="yyt-tool-runtime-value">${D}</span>
              </div>
            `).join("")}
            <div class="yyt-tool-debug-actions">
              <button class="yyt-btn yyt-btn-secondary yyt-btn-small" id="${m}-tool-copy-auto-trigger-diagnostics">
                <i class="fa-solid fa-copy"></i> \u590D\u5236\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD JSON
              </button>
            </div>
            ${T}
            ${$}
            ${z}
            ${p}
          </div>
        </details>
      `},_getApiPresets(){try{return es()||[]}catch{return[]}},_getBypassPresets(){try{return Fi()||[]}catch{return[]}},_getFormData(r){let c=ye(this.toolId),l=r.find(`#${m}-tool-output-mode`).val()||"follow_ai",d=r.find(`#${m}-tool-bypass-enabled`).is(":checked"),u=l==="post_response_api",g=(r.find(`#${m}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(y=>y.trim()).filter(Boolean);return{enabled:c?.enabled!==!1,promptTemplate:r.find(`#${m}-tool-prompt-template`).val()||"",apiPreset:r.find(`#${m}-tool-api-preset`).val()||"",extractTags:g,trigger:{event:"GENERATION_ENDED",enabled:u},output:{mode:l,apiPreset:r.find(`#${m}-tool-api-preset`).val()||"",overwrite:!0,enabled:u},bypass:{enabled:d,presetId:d&&r.find(`#${m}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(r.find(`#${m}-tool-max-messages`).val(),10)||5),selectors:g}}},_showExtractionPreview(r,c){if(!Z())return;let d=`${m}-${o}`,u=Array.isArray(c.messageEntries)?c.messageEntries:[],g=u.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${u.map(y=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${y.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${A(y.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${A(y.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${A(y.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";r.append(ii({id:d,title:a,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${A((c.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${c.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${A(c.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${A(c.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${A(c.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${g}
        `})),oi(r,d,{onSave:y=>y()}),r.find(`#${d}-save`).text("\u5173\u95ED"),r.find(`#${d}-cancel`).remove()},bindEvents(r){let c=Z();!c||!te(r)||(r.find(`#${m}-tool-output-mode`).on("change",()=>{let d=(r.find(`#${m}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";r.find(".yyt-tool-mode-hint").text(d)}),r.find(`#${m}-tool-bypass-enabled`).on("change",l=>{let d=c(l.currentTarget).is(":checked");r.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!d)}),r.find(`#${m}-tool-save, #${m}-tool-save-top`).on("click",()=>{this._saveConfig(r,{silent:!1})}),r.find(`#${m}-tool-reset-template`).on("click",()=>{let l=bn(this.toolId);l?.promptTemplate&&(r.find(`#${m}-tool-prompt-template`).val(l.promptTemplate),E("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),r.find(`#${m}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(r,{silent:!0}))try{let d=await po(this.toolId);!d?.success&&d?.error&&nt("warning",d.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(d){E("error",d?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(r)}}),r.find(`#${m}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(r,{silent:!0}))try{let d=await yo(this.toolId);if(!d?.success){E("error",d?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(r,d)}catch(d){E("error",d?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),r.find(`#${m}-tool-copy-auto-trigger-diagnostics`).on("click",()=>{this._copyAutoTriggerDiagnostics()}))},_saveConfig(r,c={}){let l=this._getFormData(r),{silent:d=!1}=c,u=ct(this.toolId,l);return u?d||E("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):E("error","\u4FDD\u5B58\u5931\u8D25"),u},destroy(r){!Z()||!te(r)||r.find("*").off()},getStyles(){return ra},renderTo(r){r.html(this.render({})),this.bindEvents(r,{})}}}var ra,Fd,Fs=X(()=>{it();ls();nn();Cs();go();ra=`
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
`;Fd=Pt});var Qe,fo=X(()=>{Fs();Qe=Pt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Ze,mo=X(()=>{Fs();Ze=Pt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var et,ho=X(()=>{Fs();et=Pt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var Jt,So=X(()=>{Ee();Cs();it();Jt={id:"bypassPanel",render(t){let e=V.getPresetList(),s=V.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let s=mt&&mt[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${A(t.name)}</span>
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
      `;let e=V.getDefaultPresetId()===t.id,s=mt&&mt[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${A(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${A(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${A(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(s.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let n=e(s.currentTarget).data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let i=V.deletePreset(n);i.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),E("success","\u9884\u8BBE\u5DF2\u5220\u9664")):E("error",i?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let n=e(s.currentTarget).closest(".yyt-bypass-message"),i=n.data("messageId");n.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let i=await yt(n),o=V.importPresets(i);E(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(i){E("error",`\u5BFC\u5165\u5931\u8D25: ${i.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=V.exportPresets();pt(s,`bypass_presets_${Date.now()}.json`),E("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){E("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let n=V.getPreset(s);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(n)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,n=V.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,s),E("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):E("error",n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),n=s.data("presetId");if(!n)return;let i=s.find(".yyt-bypass-name-input").val().trim(),o=s.find("#yyt-bypass-description").val().trim();if(!i){E("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let a=[];s.find(".yyt-bypass-message").each(function(){let c=e(this);a.push({id:c.data("messageId"),role:c.find(".yyt-bypass-role-select").val(),content:c.find(".yyt-bypass-message-content").val(),enabled:c.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let r=V.updatePreset(n,{name:i,description:o,messages:a});r.success?(E("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):E("error",r?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let i=V.deletePreset(n);i.success?(this.renderTo(t),E("success","\u9884\u8BBE\u5DF2\u5220\u9664")):E("error",i?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let i=`bypass_${Date.now()}`,o=V.duplicatePreset(n,i);o.success?(this.renderTo(t),this._selectPreset(t,e,i),E("success","\u9884\u8BBE\u5DF2\u590D\u5236")):E("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");n&&(V.setDefaultPresetId(n),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),E("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(n))},_refreshPresetList(t,e){let s=V.getPresetList(),n=V.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(i=>this._renderPresetItem(i,i.id===n)).join(""))},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var da={};he(da,{SettingsPanel:()=>St,THEME_CONFIGS:()=>bo,applyTheme:()=>ca,applyUiPreferences:()=>vo,default:()=>jd});function Hs(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function la(t=Hs()){return t?.documentElement||document.documentElement}function ca(t,e=Hs()){let s=la(e),n={...Hd,...bo[t]||bo["dark-blue"]};Object.entries(n).forEach(([i,o])=>{s.style.setProperty(i,o)}),s.setAttribute("data-yyt-theme",t)}function vo(t={},e=Hs()){let s=la(e),{theme:n="dark-blue",compactMode:i=!1,animationEnabled:o=!0}=t||{};ca(n,e),s.classList.toggle("yyt-compact-mode",!!i),s.classList.toggle("yyt-no-animation",!o)}var Hd,bo,St,jd,Vn=X(()=>{Ee();ks();it();Hd={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},bo={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};St={id:"settingsPanel",render(t){let e=Ue.getSettings(),s=e.listener?.listenGenerationEnded!==!1,n=e.debug?.enableDebugLog===!0;return`
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
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(t.find(".yyt-settings-tab").on("click",n=>{let i=s(n.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(n.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${i}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ue.resetSettings(),vo(Ds.ui,Hs()),this.renderTo(t),E("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300,useGenerationAfterCommandsFallback:t.find("#yyt-setting-useGenerationAfterCommandsFallback").is(":checked"),useMessageReceivedFallback:t.find("#yyt-setting-useMessageReceivedFallback").is(":checked"),messageSessionWindowMs:parseInt(t.find("#yyt-setting-messageSessionWindowMs").val())||1800,historyRetentionLimit:parseInt(t.find("#yyt-setting-historyRetentionLimit").val())||10},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ue.saveSettings(s),vo(s.ui,Hs()),E("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},jd=St});var ha={};he(ha,{ApiPresetPanel:()=>We,BypassPanel:()=>Jt,RegexExtractPanel:()=>Ve,SCRIPT_ID:()=>m,SettingsPanel:()=>St,StatusBlockPanel:()=>Ze,SummaryToolPanel:()=>Qe,ToolManagePanel:()=>Ye,UIManager:()=>vs,YouyouReviewPanel:()=>et,bindDialogEvents:()=>oi,createDialogHtml:()=>ii,default:()=>Wd,downloadJson:()=>pt,escapeHtml:()=>A,fillFormWithConfig:()=>Ot,getAllStyles:()=>ma,getFormApiConfig:()=>Et,getJQuery:()=>Z,initUI:()=>js,isContainerValid:()=>te,readFileContent:()=>yt,registerComponents:()=>hs,renderApiPanel:()=>Yn,renderBypassPanel:()=>ga,renderRegexPanel:()=>qn,renderSettingsPanel:()=>fa,renderStatusBlockPanel:()=>pa,renderSummaryToolPanel:()=>ua,renderToolPanel:()=>Jn,renderYouyouReviewPanel:()=>ya,resetJQueryCache:()=>Va,showToast:()=>E,showTopNotice:()=>nt,uiManager:()=>ge});function hs(){ge.register(We.id,We),ge.register(Ve.id,Ve),ge.register(Ye.id,Ye),ge.register(Qe.id,Qe),ge.register(Ze.id,Ze),ge.register(et.id,et),ge.register(Jt.id,Jt),ge.register(St.id,St),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function js(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...n}=t;ge.init(n),hs(),e&&ge.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Gt(t,e,s={}){ge.render(t,e,s)}function Yn(t){Gt(We.id,t)}function qn(t){Gt(Ve.id,t)}function Jn(t){Gt(Ye.id,t)}function ua(t){Gt(Qe.id,t)}function pa(t){Gt(Ze.id,t)}function ya(t){Gt(et.id,t)}function ga(t){Gt(Jt.id,t)}function fa(t){Gt(St.id,t)}function ma(){return ge.getAllStyles()}var Wd,xo=X(()=>{ri();vi();Ai();Ki();fo();mo();ho();So();Vn();it();ri();vi();Ai();Ki();fo();mo();ho();So();Vn();Wd={uiManager:ge,ApiPresetPanel:We,RegexExtractPanel:Ve,ToolManagePanel:Ye,SummaryToolPanel:Qe,StatusBlockPanel:Ze,YouyouReviewPanel:et,BypassPanel:Jt,SettingsPanel:St,registerComponents:hs,initUI:js,renderApiPanel:Yn,renderRegexPanel:qn,renderToolPanel:Jn,renderSummaryToolPanel:ua,renderStatusBlockPanel:pa,renderYouyouReviewPanel:ya,renderBypassPanel:ga,renderSettingsPanel:fa,getAllStyles:ma}});var wa={};he(wa,{ApiPresetPanel:()=>We,RegexExtractPanel:()=>Ve,SCRIPT_ID:()=>m,StatusBlockPanel:()=>Ze,SummaryToolPanel:()=>Qe,ToolManagePanel:()=>Ye,YouyouReviewPanel:()=>et,default:()=>Vd,escapeHtml:()=>A,fillFormWithConfig:()=>Ot,getCurrentTab:()=>Ia,getFormApiConfig:()=>Et,getJQuery:()=>Z,getRegexStyles:()=>Ea,getStyles:()=>xa,getToolStyles:()=>Ta,initUI:()=>js,isContainerValid:()=>te,registerComponents:()=>hs,render:()=>Sa,renderRegex:()=>ba,renderTool:()=>va,setCurrentTab:()=>_a,showToast:()=>E,uiManager:()=>ge});function Eo(t,e){let s=Z();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function Sa(t){if(Ws=Eo(t,Ws),!Ws||!Ws.length){console.error("[YouYouToolkit] Container not found or invalid");return}Yn(Ws)}function ba(t){if(Vs=Eo(t,Vs),!Vs||!Vs.length){console.error("[YouYouToolkit] Regex container not found");return}qn(Vs)}function va(t){if(Ys=Eo(t,Ys),!Ys||!Ys.length){console.error("[YouYouToolkit] Tool container not found");return}Jn(Ys)}function xa(){return We.getStyles()}function Ea(){return Ve.getStyles()}function Ta(){return[Ye.getStyles(),Qe.getStyles(),Ze.getStyles(),et.getStyles()].join(`
`)}function Ia(){return ge.getCurrentTab()}function _a(t){ge.switchTab(t)}var Ws,Vs,Ys,Vd,Aa=X(()=>{xo();Ws=null,Vs=null,Ys=null;Vd={render:Sa,renderRegex:ba,renderTool:va,getStyles:xa,getRegexStyles:Ea,getToolStyles:Ta,getCurrentTab:Ia,setCurrentTab:_a,uiManager:ge,ApiPresetPanel:We,RegexExtractPanel:Ve,ToolManagePanel:Ye,SummaryToolPanel:Qe,StatusBlockPanel:Ze,YouyouReviewPanel:et,registerComponents:hs,initUI:js,SCRIPT_ID:m,escapeHtml:A,showToast:E,getJQuery:Z,isContainerValid:te,getFormApiConfig:Et,fillFormWithConfig:Ot}});var Ra={};he(Ra,{DEFAULT_PROMPT_SEGMENTS:()=>Xn,PromptEditor:()=>Qn,default:()=>tu,getPromptEditorStyles:()=>Xd,messagesToSegments:()=>eu,segmentsToMessages:()=>Zd,validatePromptSegments:()=>Qd});function Xd(){return`
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
  `}function Qd(t){let e=[];return Array.isArray(t)?(t.forEach((s,n)=>{s.id||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${n+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function Zd(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function eu(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Xn]}var Yd,qd,Jd,Xn,Qn,tu,Ma=X(()=>{Yd="youyou_toolkit_prompt_editor",qd={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Jd={system:"fa-server",ai:"fa-robot",user:"fa-user"},Xn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Qn=class{constructor(e={}){this.containerId=e.containerId||Yd,this.segments=e.segments||[...Xn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Xn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=qd[e.type]||e.type,n=Jd[e.type]||"fa-file",i=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,a=i?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",r=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",c=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${i?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:n})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:n})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,n=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=s),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(i=>i.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let n=this.segments.find(i=>i.id===e);n&&(Object.assign(n,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let n=s.target.files[0];if(!n)return;let i=new FileReader;i.onload=o=>{try{let a=JSON.parse(o.target.result);Array.isArray(a)?(this.setSegments(a),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",a)}},i.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};tu=Qn});var To={};he(To,{WindowManager:()=>Zn,closeWindow:()=>ou,createWindow:()=>iu,windowManager:()=>ze});function nu(){if(ze.stylesInjected)return;ze.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=su+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function iu(t){let{id:e,title:s="\u7A97\u53E3",content:n="",width:i=900,height:o=700,modal:a=!1,resizable:r=!0,maximizable:c=!0,startMaximized:l=!1,rememberState:d=!0,onClose:u,onReady:g}=t;nu();let y=window.jQuery||window.parent?.jQuery;if(!y)return console.error("[WindowManager] jQuery not available"),null;if(ze.isOpen(e))return ze.bringToFront(e),ze.getWindow(e);let x=window.innerWidth||1200,b=window.innerHeight||800,C=x<=1100,$=null,z=!1;d&&($=ze.getState(e),$&&!C&&(z=!0));let _,T;z&&$.width&&$.height?(_=Math.max(400,Math.min($.width,x-40)),T=Math.max(300,Math.min($.height,b-40))):(_=Math.max(400,Math.min(i,x-40)),T=Math.max(300,Math.min(o,b-40)));let p=Math.max(20,Math.min((x-_)/2,x-_-20)),K=Math.max(20,Math.min((b-T)/2,b-T-20)),D=c&&!C,w=`
    <div class="yyt-window" id="${e}" style="left:${p}px; top:${K}px; width:${_}px; height:${T}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${ru(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${D?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,O=null;a&&(O=y(`<div class="yyt-window-overlay" data-for="${e}"></div>`),y(document.body).append(O));let I=y(w);y(document.body).append(I),ze.register(e,I),I.on("mousedown",()=>ze.bringToFront(e));let P=!1,ae={left:p,top:K,width:_,height:T},pe=()=>{ae={left:parseInt(I.css("left")),top:parseInt(I.css("top")),width:I.width(),height:I.height()},I.addClass("maximized"),I.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),P=!0},ie=()=>{I.removeClass("maximized"),I.css({left:ae.left+"px",top:ae.top+"px",width:ae.width+"px",height:ae.height+"px"}),I.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),P=!1};I.find(".yyt-window-btn.maximize").on("click",()=>{P?ie():pe()}),(C&&c||z&&$.isMaximized&&c||l&&c)&&pe(),I.find(".yyt-window-btn.close").on("click",()=>{if(d&&c){let fe={width:P?ae.width:I.width(),height:P?ae.height:I.height(),isMaximized:P};ze.saveState(e,fe)}u&&u(),O&&O.remove(),I.remove(),ze.unregister(e),y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),O&&O.on("click",fe=>{fe.target,O[0]});let Re=!1,Me,tt,Oe,dt;if(I.find(".yyt-window-header").on("mousedown",fe=>{y(fe.target).closest(".yyt-window-controls").length||P||(Re=!0,Me=fe.clientX,tt=fe.clientY,Oe=parseInt(I.css("left")),dt=parseInt(I.css("top")),y(document.body).css("user-select","none"))}),y(document).on("mousemove.yytWindowDrag"+e,fe=>{if(!Re)return;let me=fe.clientX-Me,bt=fe.clientY-tt;I.css({left:Math.max(0,Oe+me)+"px",top:Math.max(0,dt+bt)+"px"})}),y(document).on("mouseup.yytWindowDrag"+e,()=>{Re&&(Re=!1,y(document.body).css("user-select",""))}),r){let fe=!1,me="",bt,st,se,f,v,k;I.find(".yyt-window-resize-handle").on("mousedown",function(M){P||(fe=!0,me="",y(this).hasClass("se")?me="se":y(this).hasClass("e")?me="e":y(this).hasClass("s")?me="s":y(this).hasClass("w")?me="w":y(this).hasClass("n")?me="n":y(this).hasClass("nw")?me="nw":y(this).hasClass("ne")?me="ne":y(this).hasClass("sw")&&(me="sw"),bt=M.clientX,st=M.clientY,se=I.width(),f=I.height(),v=parseInt(I.css("left")),k=parseInt(I.css("top")),y(document.body).css("user-select","none"),M.stopPropagation())}),y(document).on("mousemove.yytWindowResize"+e,M=>{if(!fe)return;let F=M.clientX-bt,Y=M.clientY-st,le=400,W=300,Q=se,Se=f,ve=v,Ce=k;if(me.includes("e")&&(Q=Math.max(le,se+F)),me.includes("s")&&(Se=Math.max(W,f+Y)),me.includes("w")){let De=se-F;De>=le&&(Q=De,ve=v+F)}if(me.includes("n")){let De=f-Y;De>=W&&(Se=De,Ce=k+Y)}I.css({width:Q+"px",height:Se+"px",left:ve+"px",top:Ce+"px"})}),y(document).on("mouseup.yytWindowResize"+e,()=>{fe&&(fe=!1,y(document.body).css("user-select",""))})}return I.on("remove",()=>{y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),g&&setTimeout(()=>g(I),50),I}function ou(t){let e=ze.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),ze.unregister(t)}}function ru(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var su,Ca,Zn,ze,Io=X(()=>{je();su="youyou_toolkit_window_manager",Ca="window_states",Zn=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let n=this.loadStates();n[e]={...s,updatedAt:Date.now()},Ss.set(Ca,n)}loadStates(){return Ss.get(Ca)||{}}getState(e){return this.loadStates()[e]||null}},ze=new Zn});function Da(t,e={}){let{constants:s,topLevelWindow:n,modules:i}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a,MENU_ITEM_ID:r,MENU_CONTAINER_ID:c}=s,l=null,d=!1,u=new Map,g={storageModule:()=>Promise.resolve().then(()=>(si(),ti)),uiComponentsModule:()=>Promise.resolve().then(()=>(Aa(),wa)),promptEditorModule:()=>Promise.resolve().then(()=>(Ma(),Ra)),toolExecutorModule:()=>Promise.resolve().then(()=>(Pn(),kn)),windowManagerModule:()=>Promise.resolve().then(()=>(Io(),To))};function y(...D){console.log(`[${o}]`,...D)}function x(...D){console.error(`[${o}]`,...D)}async function b(D){return!D||!g[D]?null:i[D]?i[D]:(u.has(D)||u.set(D,(async()=>{try{let w=await g[D]();return i[D]=w,w}catch(w){throw u.delete(D),w}})()),u.get(D))}async function C(){return l||(l=(async()=>{try{return i.storageModule=await Promise.resolve().then(()=>(si(),ti)),i.apiConnectionModule=await Promise.resolve().then(()=>(Xs(),No)),i.presetManagerModule=await Promise.resolve().then(()=>(nn(),Uo)),i.uiModule=await Promise.resolve().then(()=>(xo(),ha)),i.regexExtractorModule=await Promise.resolve().then(()=>(fn(),Xo)),i.toolManagerModule=await Promise.resolve().then(()=>(Sn(),Qo)),i.toolExecutorModule=await Promise.resolve().then(()=>(Pn(),kn)),i.toolTriggerModule=await Promise.resolve().then(()=>(go(),oa)),i.windowManagerModule=await Promise.resolve().then(()=>(Io(),To)),i.toolRegistryModule=await Promise.resolve().then(()=>(ls(),fr)),i.settingsServiceModule=await Promise.resolve().then(()=>(ks(),hr)),i.bypassManagerModule=await Promise.resolve().then(()=>(Cs(),mr)),i.variableResolverModule=await Promise.resolve().then(()=>(Vi(),xr)),i.contextInjectorModule=await Promise.resolve().then(()=>(Wi(),br)),i.toolPromptServiceModule=await Promise.resolve().then(()=>(Yi(),Tr)),i.toolOutputServiceModule=await Promise.resolve().then(()=>(qi(),_r)),i.toolOutputServiceModule?.toolOutputService&&i.apiConnectionModule&&i.toolOutputServiceModule.toolOutputService.setApiConnection(i.apiConnectionModule),!0}catch(D){return l=null,console.warn(`[${o}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,D),!1}})(),l)}function $(){return`
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
    `}async function z(){let D=`${o}-styles`,w=n.document||document;if(w.getElementById(D))return;let O="",I=[];try{I.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{I.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}I.push("./styles/main.css");for(let ae of[...new Set(I.filter(Boolean))])try{let pe=await fetch(ae);if(pe.ok){O=await pe.text();break}}catch{}O||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),O=$());let P=w.createElement("style");P.id=D,P.textContent=O,(w.head||w.documentElement).appendChild(P),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function _(){let D=n.document||document;if(i.uiModule?.getAllStyles){let w=`${o}-ui-styles`;if(!D.getElementById(w)){let O=D.createElement("style");O.id=w,O.textContent=i.uiModule.getAllStyles(),(D.head||D.documentElement).appendChild(O)}}if(i.promptEditorModule&&i.promptEditorModule.getPromptEditorStyles){let w=`${o}-prompt-styles`;if(!D.getElementById(w)){let O=D.createElement("style");O.id=w,O.textContent=i.promptEditorModule.getPromptEditorStyles(),(D.head||D.documentElement).appendChild(O)}}}async function T(){try{let{applyUiPreferences:D}=await Promise.resolve().then(()=>(Vn(),da));if(i.settingsServiceModule?.settingsService){let w=i.settingsServiceModule.settingsService.getUiSettings();if(w&&w.theme){let O=n.document||document;D(w,O),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${w.theme}`)}}}catch(D){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",D)}}function p(){let D=n.jQuery||window.jQuery;if(!D){x("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(p,1e3);return}let w=n.document||document,O=D("#extensionsMenu",w);if(!O.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(p,2e3);return}if(D(`#${c}`,O).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let P=D(`<div class="extension_container interactable" id="${c}" tabindex="0"></div>`),ae=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${r}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,pe=D(ae);pe.on("click",function(Re){Re.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Me=D("#extensionsMenuButton",w);Me.length&&O.is(":visible")&&Me.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),P.append(pe),O.append(P),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function K(){if(y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await z(),await C()){if(y("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!d&&i.uiModule?.initUI)try{i.uiModule.initUI({services:i,autoInjectStyles:!1,targetDocument:n.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(O){console.error(`[${o}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,O)}if(i.toolTriggerModule?.initTriggerModule)try{i.toolTriggerModule.initTriggerModule(),y("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(O){console.error(`[${o}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,O)}_(),await T()}else y("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let w=n.document||document;w.readyState==="loading"?w.addEventListener("DOMContentLoaded",()=>{setTimeout(p,1e3)}):setTimeout(p,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:C,injectStyles:z,addMenuItem:p,loadLegacyModule:b,init:K,log:y,logError:x}}function ka(t){let{constants:e,topLevelWindow:s,modules:n,caches:i,uiState:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:r,POPUP_ID:c}=e,l={cleanup:null},d={cleanups:[]};function u(...f){console.log(`[${a}]`,...f)}function g(...f){console.error(`[${a}]`,...f)}async function y(f){if(n[f])return n[f];let v=t?.services?.loadLegacyModule;if(typeof v!="function")return null;try{return await v(f)}catch(k){return g(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${f}`,k),null}}function x(f){return typeof f!="string"?"":f.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function b(){return s.jQuery||window.jQuery}function C(){return s.document||document}function $(f){if(!f)return"\u672A\u9009\u62E9\u9875\u9762";let v=n.toolRegistryModule?.getToolConfig(f);if(!v)return f;if(!v.hasSubTabs)return v.name||f;let k=o.currentSubTab[f]||v.subTabs?.[0]?.id||"",M=v.subTabs?.find(F=>F.id===k);return M?.name?`${v.name} / ${M.name}`:v.name||f}function z(f){if(!f)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let v=n.toolRegistryModule?.getToolConfig(f);if(!v)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!v.hasSubTabs)return v.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let k=o.currentSubTab[f]||v.subTabs?.[0]?.id||"";return v.subTabs?.find(F=>F.id===k)?.description||v.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function _(){let f=o.currentPopup;if(!f)return;let v=$(o.currentMainTab),k=z(o.currentMainTab),M=f.querySelector(".yyt-popup-active-label");M&&(M.textContent=`\u5F53\u524D\uFF1A${v}`);let F=f.querySelector(".yyt-shell-breadcrumb");F&&(F.textContent=v);let Y=f.querySelector(".yyt-shell-main-title");Y&&(Y.textContent=v);let le=f.querySelector(".yyt-shell-main-description");le&&(le.textContent=k);let W=f.querySelector(".yyt-shell-current-page");W&&(W.textContent=v);let Q=f.querySelector(".yyt-shell-current-desc");Q&&(Q.textContent=k)}function T(){typeof l.cleanup=="function"&&(l.cleanup(),l.cleanup=null)}function p(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(f=>{typeof f=="function"&&f()}),d.cleanups=[])}function K(f){return!!f?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function D(f){let v=f?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body"].join(","));return v?v.scrollHeight>v.clientHeight+2||v.scrollWidth>v.clientWidth+2:!1}function w(f,v){return v?.closest?.(".yyt-scrollable-surface")===f}function O(f,v){return!f||!v?null:[v.closest?.(".yyt-tool-list"),v.closest?.(".yyt-settings-content"),v.closest?.(".yyt-sub-content"),v.closest?.(".yyt-tab-content.active"),f].filter(Boolean).find(M=>M!==f&&!f.contains(M)?!1:M.scrollHeight>M.clientHeight+2||M.scrollWidth>M.clientWidth+2)||f}function I(f){let v=C();if(!f||!v)return;f.classList.add("yyt-scrollable-surface");let k=!1,M=!1,F=0,Y=0,le=0,W=0,Q=!1,Se=!1,ve=()=>{k=!1,M=!1,f.classList.remove("yyt-scroll-dragging")},Ce=q=>{q.button===0&&(K(q.target)||w(f,q.target)&&(Q=f.scrollWidth>f.clientWidth+2,Se=f.scrollHeight>f.clientHeight+2,!(!Q&&!Se)&&(q.stopPropagation(),k=!0,M=!1,F=q.clientX,Y=q.clientY,le=f.scrollLeft,W=f.scrollTop)))},De=q=>{if(!k)return;let ut=q.clientX-F,$e=q.clientY-Y;!(Math.abs(ut)>4||Math.abs($e)>4)&&!M||(M=!0,f.classList.add("yyt-scroll-dragging"),Q&&(f.scrollLeft=le-ut),Se&&(f.scrollTop=W-$e),q.preventDefault())},vt=()=>{ve()},oe=q=>{if(q.ctrlKey||D(q.target))return;let ut=f.classList.contains("yyt-content");if(!ut&&!w(f,q.target))return;let $e=O(f,q.target);!$e||!($e.scrollHeight>$e.clientHeight+2||$e.scrollWidth>$e.clientWidth+2)||(Math.abs(q.deltaY)>0&&($e.scrollTop+=q.deltaY),Math.abs(q.deltaX)>0&&($e.scrollLeft+=q.deltaX),q.preventDefault(),(!ut||$e!==f)&&q.stopPropagation())},xe=q=>{M&&q.preventDefault()};f.addEventListener("mousedown",Ce),f.addEventListener("wheel",oe,{passive:!1}),f.addEventListener("dragstart",xe),v.addEventListener("mousemove",De),v.addEventListener("mouseup",vt),d.cleanups.push(()=>{ve(),f.classList.remove("yyt-scrollable-surface"),f.removeEventListener("mousedown",Ce),f.removeEventListener("wheel",oe),f.removeEventListener("dragstart",xe),v.removeEventListener("mousemove",De),v.removeEventListener("mouseup",vt)})}function P(){let f=o.currentPopup;if(!f)return;p();let v=[...f.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...f.querySelectorAll(".yyt-sub-nav"),...f.querySelectorAll(".yyt-content"),...f.querySelectorAll(".yyt-tab-content.active"),...f.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...f.querySelectorAll(".yyt-settings-content"),...f.querySelectorAll(".yyt-tool-list")];[...new Set(v)].forEach(I)}function ae(){let f=C(),v=o.currentPopup,k=v?.querySelector(".yyt-popup-header");if(!v||!k||!f)return;let M=!1,F=0,Y=0,le=0,W=0,Q="",Se=()=>({width:s.innerWidth||f.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||f.documentElement?.clientHeight||window.innerHeight||0}),ve=(xe,q,ut)=>Math.min(Math.max(xe,q),ut),Ce=()=>{M&&(M=!1,v.classList.remove("yyt-popup-dragging"),f.body.style.userSelect=Q)},De=xe=>{if(!M||!o.currentPopup)return;let q=xe.clientX-F,ut=xe.clientY-Y,{width:$e,height:ei}=Se(),Na=v.offsetWidth||0,Oa=v.offsetHeight||0,$a=Math.max(0,$e-Na),Ba=Math.max(0,ei-Oa);v.style.left=`${ve(le+q,0,$a)}px`,v.style.top=`${ve(W+ut,0,Ba)}px`,v.style.transform="none",v.style.right="auto",v.style.bottom="auto"},vt=()=>{Ce()},oe=xe=>{if(xe.button!==0||xe.target?.closest(".yyt-popup-close"))return;M=!0,F=xe.clientX,Y=xe.clientY;let q=v.getBoundingClientRect();le=q.left,W=q.top,v.style.left=`${q.left}px`,v.style.top=`${q.top}px`,v.style.transform="none",v.style.right="auto",v.style.bottom="auto",v.classList.add("yyt-popup-dragging"),Q=f.body.style.userSelect||"",f.body.style.userSelect="none",xe.preventDefault()};k.addEventListener("mousedown",oe),f.addEventListener("mousemove",De),f.addEventListener("mouseup",vt),l.cleanup=()=>{Ce(),k.removeEventListener("mousedown",oe),f.removeEventListener("mousemove",De),f.removeEventListener("mouseup",vt)}}function pe(){T(),p(),o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),u("\u5F39\u7A97\u5DF2\u5173\u95ED")}function ie(f){o.currentMainTab=f;let v=b();if(!v||!o.currentPopup)return;v(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),v(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${f}"]`).addClass("active");let k=n.toolRegistryModule?.getToolConfig(f);k?.hasSubTabs?(v(o.currentPopup).find(".yyt-sub-nav").show(),Me(f,k.subTabs)):v(o.currentPopup).find(".yyt-sub-nav").hide(),v(o.currentPopup).find(".yyt-tab-content").removeClass("active"),v(o.currentPopup).find(`.yyt-tab-content[data-tab="${f}"]`).addClass("active"),tt(f),_(),P()}function Re(f,v){o.currentSubTab[f]=v;let k=b();!k||!o.currentPopup||(k(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),k(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${v}"]`).addClass("active"),Oe(f,v),_(),P())}function Me(f,v){let k=b();if(!k||!o.currentPopup||!v)return;let M=o.currentSubTab[f]||v[0]?.id,F=v.map(Y=>`
      <div class="yyt-sub-nav-item ${Y.id===M?"active":""}" data-subtab="${Y.id}">
        <i class="fa-solid ${Y.icon||"fa-file"}"></i>
        <span>${Y.name}</span>
      </div>
    `).join("");k(o.currentPopup).find(".yyt-sub-nav").html(F),k(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let le=k(this).data("subtab");Re(f,le)}),P()}async function tt(f){let v=b();if(!v||!o.currentPopup)return;let k=v(o.currentPopup).find(`.yyt-tab-content[data-tab="${f}"]`);if(!k.length)return;let M=n.toolRegistryModule?.getToolConfig(f);switch(f){case"apiPresets":if(n.uiModule?.renderApiPanel)n.uiModule.renderApiPanel(k);else{let F=await y("uiComponentsModule");F?.render&&F.render(k)}break;case"toolManage":if(n.uiModule?.renderToolPanel)n.uiModule.renderToolPanel(k);else{let F=await y("uiComponentsModule");F?.renderTool&&F.renderTool(k)}break;case"regexExtract":if(n.uiModule?.renderRegexPanel)n.uiModule.renderRegexPanel(k);else{let F=await y("uiComponentsModule");F?.renderRegex&&F.renderRegex(k)}break;case"tools":if(M?.hasSubTabs&&M.subTabs?.length>0){let F=o.currentSubTab[f]||M.subTabs[0].id;await Oe(f,F)}else k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":n.uiModule?.renderBypassPanel?n.uiModule.renderBypassPanel(k):k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":n.uiModule?.renderSettingsPanel?n.uiModule.renderSettingsPanel(k):k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:fe(f,k);break}P()}async function Oe(f,v){let k=b();if(!k||!o.currentPopup)return;let M=k(o.currentPopup).find(`.yyt-tab-content[data-tab="${f}"]`);if(!M.length)return;let F=n.toolRegistryModule?.getToolConfig(f);if(F?.hasSubTabs){let le=F.subTabs?.find(W=>W.id===v);if(le){let W=M.find(".yyt-sub-content");switch(W.length||(M.html('<div class="yyt-sub-content"></div>'),W=M.find(".yyt-sub-content")),le.component){case"SummaryToolPanel":if(n.uiModule?.renderSummaryToolPanel)n.uiModule.renderSummaryToolPanel(W);else{let Q=await y("uiComponentsModule");Q?.SummaryToolPanel?Q.SummaryToolPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(n.uiModule?.renderStatusBlockPanel)n.uiModule.renderStatusBlockPanel(W);else{let Q=await y("uiComponentsModule");Q?.StatusBlockPanel?Q.StatusBlockPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(n.uiModule?.renderYouyouReviewPanel)n.uiModule.renderYouyouReviewPanel(W);else{let Q=await y("uiComponentsModule");Q?.YouyouReviewPanel?Q.YouyouReviewPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await dt(le,W);break;default:W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let Y=M.find(".yyt-sub-content");if(Y.length){switch(v){case"config":me(f,Y);break;case"prompts":await bt(f,Y);break;case"presets":st(f,Y);break;default:Y.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}P()}}async function dt(f,v){if(!(!b()||!v?.length||!f?.id))try{let M=i.dynamicToolPanelCache.get(f.id);if(!M){let Y=(await Promise.resolve().then(()=>(Fs(),aa)))?.createToolConfigPanel;if(typeof Y!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");M=Y({id:`${f.id}Panel`,toolId:f.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${f.name||f.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${f.id}-extraction-preview`,previewTitle:`${f.name||f.id} \u63D0\u53D6\u9884\u89C8`}),i.dynamicToolPanelCache.set(f.id,M)}M.renderTo(v),P()}catch(M){console.error(`[${a}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,M),v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function fe(f,v){if(!b())return;let M=n.toolRegistryModule?.getToolConfig(f);if(!M){v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let F=o.currentSubTab[f]||M.subTabs?.[0]?.id||"config";v.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${F}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Oe(f,F)}function me(f,v){if(!b())return;let M=n.toolManagerModule?.getTool(f),F=n.presetManagerModule?.getAllPresets()||[],Y=n.toolRegistryModule?.getToolApiPreset(f)||"",le=F.map(W=>`<option value="${x(W.name)}" ${W.name===Y?"selected":""}>${x(W.name)}</option>`).join("");v.html(`
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
              ${le}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${M?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${M?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),v.find("#yyt-save-tool-preset").on("click",function(){let Q=v.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(f,Q);let Se=s.toastr;Se&&Se.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function bt(f,v){let k=b(),M=n.promptEditorModule||await y("promptEditorModule");if(!k||!M){v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let Y=n.toolManagerModule?.getTool(f)?.config?.messages||[],le=M.messagesToSegments?M.messagesToSegments(Y):M.DEFAULT_PROMPT_SEGMENTS,W=new M.PromptEditor({containerId:`yyt-prompt-editor-${f}`,segments:le,onChange:Se=>{let ve=M.segmentsToMessages?M.segmentsToMessages(Se):[];u("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ve.length,"\u6761\u6D88\u606F")}});v.html(`<div id="yyt-prompt-editor-${f}" class="yyt-prompt-editor-container"></div>`),W.init(v.find(`#yyt-prompt-editor-${f}`));let Q=M.getPromptEditorStyles?M.getPromptEditorStyles():"";if(Q){let Se="yyt-prompt-editor-styles",ve=s.document||document;if(!ve.getElementById(Se)){let Ce=ve.createElement("style");Ce.id=Se,Ce.textContent=Q,(ve.head||ve.documentElement).appendChild(Ce)}}}function st(f,v){b()&&v.html(`
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
    `)}function se(){if(o.currentPopup){u("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let f=b(),v=C();if(!f){g("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let k=n.toolRegistryModule?.getToolList()||[];if(!k.length){g("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}k.some(oe=>oe.id===o.currentMainTab)||(o.currentMainTab=k[0].id);let M=n.toolRegistryModule?.getToolConfig("tools"),F=Array.isArray(M?.subTabs)?M.subTabs:[],Y=F.filter(oe=>oe?.isCustom).length,le=F.filter(oe=>!oe?.isCustom).length,W=$(o.currentMainTab),Q=z(o.currentMainTab);o.currentOverlay=v.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",oe=>{oe.target===o.currentOverlay&&pe()}),v.body.appendChild(o.currentOverlay);let Se=k.map(oe=>`
      <div class="yyt-main-nav-item ${oe.id===o.currentMainTab?"active":""}" data-tab="${oe.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${x(oe.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${x(oe.name||oe.id)}</span>
          <span class="yyt-main-nav-desc">${x(oe.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),ve=k.map(oe=>`
      <div class="yyt-tab-content ${oe.id===o.currentMainTab?"active":""}" data-tab="${oe.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),Ce=`
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
                  <strong class="yyt-shell-current-page">${x(W)}</strong>
                  <span class="yyt-shell-current-desc">${x(Q)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${k.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${le}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${Y}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${k.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${Se}
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
                    <div class="yyt-shell-main-title">${x(W)}</div>
                    <div class="yyt-shell-main-description">${x(Q)}</div>
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
                      ${ve}
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
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${x(W)}</span>
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
    `,De=v.createElement("div");De.innerHTML=Ce,o.currentPopup=De.firstElementChild,v.body.appendChild(o.currentPopup),f(o.currentPopup).find(".yyt-popup-close").on("click",pe),f(o.currentPopup).find(`#${a}-close-btn`).on("click",pe),f(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let xe=f(this).data("tab");xe&&ie(xe)}),ae(),tt(o.currentMainTab);let vt=n.toolRegistryModule?.getToolConfig(o.currentMainTab);vt?.hasSubTabs&&(f(o.currentPopup).find(".yyt-sub-nav").show(),Me(o.currentMainTab,vt.subTabs)),_(),P(),u("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:se,closePopup:pe,switchMainTab:ie,switchSubTab:Re,renderTabContent:tt,renderSubTabContent:Oe}}function Pa(t,e={}){let{constants:s,modules:n}=t,{SCRIPT_ID:i,SCRIPT_VERSION:o}=s,{init:a,loadModules:r,loadLegacyModule:c,addMenuItem:l,popupShell:d}=e;return{version:o,id:i,init:a,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:l,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getUiComponents:()=>n.uiComponentsModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getToolTrigger:()=>n.toolTriggerModule,getAutoTriggerDiagnostics:u=>n.toolTriggerModule?.getAutoTriggerDiagnostics?.(u)||null,exportAutoTriggerDiagnostics:u=>n.toolTriggerModule?.exportAutoTriggerDiagnostics?.(u)||null,getGenerationTransactionDiagnostics:u=>n.toolTriggerModule?.getGenerationTransactionDiagnostics?.(u)||null,exportGenerationTransactionDiagnostics:u=>n.toolTriggerModule?.exportGenerationTransactionDiagnostics?.(u)||null,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getPromptEditor:()=>n.promptEditorModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,async loadLegacyModule(u){return typeof c!="function"?null:c(u)},async getApiConfig(){return await r(),n.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(u){return await r(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(u),!0):!1},async getPresets(){return await r(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(u,g){if(await r(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(u,g);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await r(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(u,g){return n.toolRegistryModule?.registerTool(u,g)||!1},unregisterTool(u){return n.toolRegistryModule?.unregisterTool(u)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(u){return n.windowManagerModule?.createWindow(u)||null},closeWindow(u){n.windowManagerModule?.closeWindow(u)}}}var qs="youyou_toolkit",au="0.6.2",lu=`${qs}-menu-item`,cu=`${qs}-menu-container`,du=`${qs}-popup`,uu=typeof window.parent<"u"?window.parent:window,Js={constants:{SCRIPT_ID:qs,SCRIPT_VERSION:au,MENU_ITEM_ID:lu,MENU_CONTAINER_ID:cu,POPUP_ID:du},topLevelWindow:uu,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},Ga=ka(Js),Xt=Da(Js,{openPopup:Ga.openPopup});Js.services.loadModules=Xt.loadModules;Js.services.loadLegacyModule=Xt.loadLegacyModule;var _o=Pa(Js,{init:Xt.init,loadModules:Xt.loadModules,loadLegacyModule:Xt.loadLegacyModule,addMenuItem:Xt.addMenuItem,popupShell:Ga});if(typeof window<"u"&&(window.YouYouToolkit=_o,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=_o}catch{}var uy=_o;Xt.init();console.log(`[${qs}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{uy as default};
