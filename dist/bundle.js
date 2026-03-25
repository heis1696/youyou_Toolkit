var Oa=Object.defineProperty;var X=(t,e)=>()=>(t&&(e=t(t=0)),e);var fe=(t,e)=>{for(var s in e)Oa(t,s,{get:e[s],enumerable:!0})};function wo(){let t=R;return t._getStorage(),t._storage}function Io(){return R.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Ro(t){R.set("settings",t)}var vt,R,ee,Ao,fs,Fe=X(()=>{vt=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:n=>{let i=s.extensionSettings[this.namespace][n];return typeof i=="string"?i:i?JSON.stringify(i):null},setItem:(n,i)=>{s.extensionSettings[this.namespace][n]=i,this._saveSettings(s)},removeItem:n=>{delete s.extensionSettings[this.namespace][n],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(n){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let n=`${this.namespace}:${e}`;if(this._cache.has(n))return this._cache.get(n);let i=this._getStorage(),o=this._getFullKey(e),a=i.getItem(o);if(a===null)return s;try{let r=JSON.parse(a);return this._cache.set(n,r),r}catch{return a}}set(e,s){let n=this._getStorage(),i=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.set(o,s);try{n.setItem(i,JSON.stringify(s))}catch(a){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,a)}}remove(e){let s=this._getStorage(),n=this._getFullKey(e),i=`${this.namespace}:${e}`;this._cache.delete(i),s.removeItem(n)}has(e){let s=this._getStorage(),n=this._getFullKey(e);return s.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext();n?.extensionSettings?.[this.namespace]&&(n.extensionSettings[this.namespace]={},this._saveSettings(n))}}else{let s=`${this.namespace}_`,n=[];for(let i=0;i<localStorage.length;i++){let o=localStorage.key(i);o&&o.startsWith(s)&&n.push(o)}n.forEach(i=>localStorage.removeItem(i))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(n=>{s[n]=this.get(n)}),s}setMultiple(e){Object.entries(e).forEach(([s,n])=>{this.set(s,n)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([a,r])=>{s[a]=typeof r=="string"?JSON.parse(r):r})}}else{let n=`${this.namespace}_`;for(let i=0;i<localStorage.length;i++){let o=localStorage.key(i);if(o&&o.startsWith(n)){let a=o.slice(n.length);try{s[a]=JSON.parse(localStorage.getItem(o))}catch{s[a]=localStorage.getItem(o)}}}}return s}},R=new vt("youyou_toolkit"),ee=new vt("youyou_toolkit:tools"),Ao=new vt("youyou_toolkit:presets"),fs=new vt("youyou_toolkit:windows")});var Qn={};fe(Qn,{DEFAULT_API_PRESETS:()=>Ba,DEFAULT_SETTINGS:()=>Na,STORAGE_KEYS:()=>ms,StorageService:()=>vt,deepMerge:()=>Co,getCurrentPresetName:()=>za,getStorage:()=>wo,loadApiPresets:()=>La,loadSettings:()=>Io,presetStorage:()=>Ao,saveApiPresets:()=>Ua,saveSettings:()=>Ro,setCurrentPresetName:()=>Fa,storage:()=>R,toolStorage:()=>ee,windowStorage:()=>fs});function La(){return R.get(ms.API_PRESETS)||[]}function Ua(t){R.set(ms.API_PRESETS,t)}function za(){return R.get(ms.CURRENT_PRESET)||""}function Fa(t){R.set(ms.CURRENT_PRESET,t||"")}function Co(t,e){let s=i=>i&&typeof i=="object"&&!Array.isArray(i),n={...t};return s(t)&&s(e)&&Object.keys(e).forEach(i=>{s(e[i])?i in t?n[i]=Co(t[i],e[i]):Object.assign(n,{[i]:e[i]}):Object.assign(n,{[i]:e[i]})}),n}var ms,Na,Ba,Zn=X(()=>{Fe();Fe();ms={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},Na={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Ba=[]});var B,ei,L,we=X(()=>{B={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},ei=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,n={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:i=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:s,priority:i};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let n=this.listeners.get(e);if(n){for(let i of n)if(i.callback===s){n.delete(i);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let n=this.listeners.get(e);if(!n||n.size===0)return;let i=Array.from(n).sort((o,a)=>a.priority-o.priority);for(let{callback:o}of i)try{o(s)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,s){let n=i=>{this.off(e,n),s(i)};return this.on(e,n)}wait(e,s=0){return new Promise((n,i)=>{let o=null,a=this.once(e,r=>{o&&clearTimeout(o),n(r)});s>0&&(o=setTimeout(()=>{a(),i(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},L=new ei});function w(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function v(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Ka(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function Ze(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:i=!1,noticeId:o=""}=s,a=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!a?.body){v(t,e,n);return}let r="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(r);if(c||(c=a.createElement("div"),c.id=r,c.style.cssText=`
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
    `,a.body.appendChild(c)),!a.getElementById(l)){let P=a.createElement("style");P.id=l,P.textContent=`
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
    `,a.head.appendChild(P)}if(o){let P=c.querySelector(`[data-notice-id="${o}"]`);P&&P.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(u.dataset.noticeId=o);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=d[t]||d.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let S=a.createElement("button");S.className="yyt-top-notice__close",S.type="button",S.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),S.textContent="\xD7";let b=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};S.addEventListener("click",b),u.appendChild(y),u.appendChild(p),u.appendChild(S),c.appendChild(u),i||setTimeout(b,n)}function Ka(t,e,s){let n=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!n)return;let i=n.getElementById("yyt-fallback-toast");i&&i.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=o[t]||o.info,r=n.createElement("div");if(r.id="yyt-fallback-toast",r.style.cssText=`
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
  `,r.textContent=e,!n.getElementById("yyt-toast-styles")){let l=n.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,n.head.appendChild(l)}n.body.appendChild(r),setTimeout(()=>{r.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{r.remove()},300)},s)}function Z(){if(Dt)return Dt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Dt=window.parent.jQuery,Dt}catch{}return window.jQuery&&(Dt=window.jQuery),Dt}function Ha(){Dt=null}function te(t){return t&&t.length>0}function Tt(t,e=f){if(!Z()||!te(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",i=t.find(`#${e}-model-select`);return i.is(":visible")&&(n=i.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Pt(t,e,s=f){if(!Z()||!te(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let i=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",i);let a=t.find(`#${s}-custom-api-fields`);i?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function ti(t){let{id:e,title:s,body:n,width:i="380px",wide:o=!1}=t;return`
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
  `}function si(t,e,s={}){if(!Z())return()=>{};let i=t.find(`#${e}-overlay`),o=()=>{i.remove(),s.onClose&&s.onClose()};return i.find(`#${e}-close, #${e}-cancel`).on("click",o),i.on("click",function(a){a.target===this&&o()}),i.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(o)}),o}function ut(t,e){let s=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(s),i=document.createElement("a");i.href=n,i.download=e,i.click(),URL.revokeObjectURL(n)}function pt(t){return new Promise((e,s)=>{let n=new FileReader;n.onload=i=>e(i.target.result),n.onerror=i=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var f,Dt,et=X(()=>{f="youyou_toolkit";Dt=null});var hs,pe,ni=X(()=>{we();et();hs=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,L.emit(B.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,n={}){let i=Z();if(!i){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let a;if(typeof s=="string"?a=i(s):s&&s.jquery?a=s:s&&(a=i(s)),!te(a)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let r=o.render({...n,dependencies:this.dependencies});a.html(r),o.bindEvents(a,this.dependencies),this.activeInstances.set(e,{container:a,component:o,props:n}),L.emit(B.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,L.emit(B.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,L.emit(B.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,n)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let n=e.createElement("style");n.id=s,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){L.on(B.PRESET_UPDATED,()=>{}),L.on(B.TOOL_UPDATED,()=>{})}},pe=new hs});var Go={};fe(Go,{API_STATUS:()=>Ja,fetchAvailableModels:()=>ci,getApiConfig:()=>Et,getEffectiveApiConfig:()=>bs,hasEffectiveApiPreset:()=>ri,sendApiRequest:()=>li,sendWithPreset:()=>Qa,testApiConnection:()=>il,updateApiConfig:()=>qt,validateApiConfig:()=>Jt});function Wa(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function oi(){return R.get(Mo,Wa())}function Va(t){R.set(Mo,t)}function ko(){return R.get(ja,[])}function qa(){return R.get(Ya,"")}function ii(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function Do(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let n=null;try{n=new URL(s)}catch{return s}let i=n.pathname.replace(/\/+$/,""),o=i;return e==="chat_completions"?!/\/chat\/completions$/i.test(i)&&!/\/completions$/i.test(i)&&(o=`${i||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(i)?o=i.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(i)?o=i.replace(/\/completions$/i,"/models"):/\/models$/i.test(i)||(o=`${i||""}/models`)),n.pathname=o.replace(/\/+/g,"/"),n.toString()}function Xa(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Et(){return oi().apiConfig||{}}function qt(t){let e=oi();e.apiConfig={...e.apiConfig,...t},Va(e)}function Jt(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function bs(t=""){let e=oi(),s=t||qa()||"";if(s){let i=ko().find(o=>o.name===s);if(i&&i.apiConfig)return{...i.apiConfig,presetName:i.name}}return e.apiConfig||{}}function ri(t=""){return t?ko().some(s=>s?.name===t):!1}async function Qa(t,e,s={},n=null){let i=bs(t);return await li(e,{...s,apiConfig:i},n)}function Po(t,e={}){let s=e.apiConfig||Et();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function ai(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function li(t,e={},s=null){let n=e.apiConfig||Et(),i=n.useMainApi,o=Jt(n);if(!o.valid&&!i)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return i?await Za(t,e,s):await el(t,n,e,s)}async function Za(t,e,s){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let i=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof i!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return i.trim()}catch(i){throw i.name==="AbortError"?i:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${i.message}`)}}async function el(t,e,s,n){let i=typeof window.parent<"u"?window.parent:window;if(i.TavernHelper?.generateRaw)try{return await tl(t,e,s,n,i)}catch(o){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(i.SillyTavern?.getRequestHeaders)try{return await sl(t,e,s,n,i)}catch(o){if(!o?.allowDirectFallback)throw o}return await nl(t,e,s,n)}async function tl(t,e,s,n,i){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await i.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:Xa(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof o=="string"?o.trim():ai(o)}async function sl(t,e,s,n,i){let o=String(e.url||"").trim(),a={...Po(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},r={...typeof i.SillyTavern?.getRequestHeaders=="function"?i.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:r,body:JSON.stringify(a),signal:n})}catch(u){throw u?.name==="AbortError"?u:ii(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw ii(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let y=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw ii(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return ai(d)}async function nl(t,e,s,n){let i=Po(t,{apiConfig:e,...s}),o=Do(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let r=await fetch(o,{method:"POST",headers:a,body:JSON.stringify(i),signal:n}),l=await r.text().catch(()=>"");if(!r.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${r.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return ai(c)}async function il(t=null){let e=t||Et(),s=Date.now();try{await li([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let i=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${i}ms)`,latency:i}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-s}}}async function ci(t=null){let e=t||Et();return e.useMainApi?await ol():await rl(e)}async function ol(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function rl(t){if(!t.url||!t.apiKey)return[];try{let e=Do(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let n=await s.json();return n.data&&Array.isArray(n.data)?n.data.map(i=>i.id||i.name).filter(Boolean).sort():[]}catch{return[]}}var Mo,ja,Ya,Ja,Ys=X(()=>{Fe();Mo="settings",ja="api_presets",Ya="current_preset";Ja={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Bo={};fe(Bo,{createPreset:()=>qs,createPresetFromCurrentConfig:()=>pl,deletePreset:()=>Js,duplicatePreset:()=>ul,exportPresets:()=>gi,generateUniquePresetName:()=>mi,getActiveConfig:()=>yi,getActivePresetName:()=>Xs,getAllPresets:()=>Xt,getPreset:()=>$t,getPresetNames:()=>cl,getStarredPresets:()=>pi,importPresets:()=>fi,presetExists:()=>Ss,renamePreset:()=>dl,switchToPreset:()=>Ot,togglePresetStar:()=>ui,updatePreset:()=>di,validatePreset:()=>yl});function ll(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function No(){return R.get(al,ll())}function De(){return R.get($o,[])}function Gt(t){R.set($o,t)}function Vs(){return R.get(Oo,"")}function Ws(t){R.set(Oo,t||"")}function Xt(){return De()}function cl(){return De().map(e=>e.name)}function $t(t){return!t||typeof t!="string"?null:De().find(s=>s.name===t)||null}function Ss(t){return!t||typeof t!="string"?!1:De().some(s=>s.name===t)}function qs(t){let{name:e,description:s,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=e.trim();if(Ss(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let o={name:i,description:s||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=De();return a.push(o),Gt(a),{success:!0,message:`\u9884\u8BBE "${i}" \u521B\u5EFA\u6210\u529F`,preset:o}}function di(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=De(),n=s.findIndex(a=>a.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let i=s[n],o={...i,...e,name:i.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...i.apiConfig,...e.apiConfig}),s[n]=o,Gt(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function Js(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=De(),s=e.findIndex(n=>n.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Gt(e),Vs()===t&&Ws(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function dl(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!Ss(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Ss(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n=De(),i=n.find(o=>o.name===t);return i&&(i.name=s,i.updatedAt=Date.now(),Gt(n),Vs()===t&&Ws(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function ul(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),n=$t(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Ss(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let i={...JSON.parse(JSON.stringify(n)),name:s,createdAt:Date.now(),updatedAt:Date.now()},o=De();return o.push(i),Gt(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:i}}function ui(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=De(),s=e.find(n=>n.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Gt(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function pi(){return De().filter(e=>e.starred===!0)}function Ot(t){if(!t)return Ws(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=$t(t);return e?(Ws(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Xs(){return Vs()}function yi(){let t=Vs();if(t){let s=$t(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:No().apiConfig||{}}}function gi(t=null){if(t){let s=$t(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=De();return JSON.stringify(e,null,2)}function fi(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(s)?s:[s];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=De(),o=0;for(let a of n){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let r=i.findIndex(l=>l.name===a.name);r>=0?e.overwrite&&(a.updatedAt=Date.now(),i[r]=a,o++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),i.push(a),o++)}return o>0&&Gt(i),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function pl(t,e=""){let s=No();return qs({name:t,description:e,apiConfig:s.apiConfig})}function yl(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function mi(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=De(),s=new Set(e.map(i=>i.name));if(!s.has(t))return t;let n=1;for(;s.has(`${t} (${n})`);)n++;return`${t} (${n})`}var al,$o,Oo,Qs=X(()=>{Fe();al="settings",$o="api_presets",Oo="current_preset"});function Zs(t){return String(t||"").trim()}var tt,Ke,hi=X(()=>{we();et();Ys();Qs();tt=null;Ke={id:"apiPresetPanel",render(t){let e=yi(),s=e?.apiConfig||Et(),n=Zs(e?.presetName||Xs()),i=Xt(),r=pi().slice(0,8),l=r.length>0?r.map(u=>this._renderPresetItem(u)).join(""):"",c=tt===null?n||"":Zs(tt),d=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
                  <span class="yyt-select-value" data-value="${w(c)}">${w(d)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${c?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${i.length>0?i.map(u=>this._renderSelectOption(u,c)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${f}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
      <div class="yyt-preset-item" data-preset-name="${w(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${w(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${w(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${w(t.name)}">
        <button class="${n}" data-preset="${w(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${i}</button>
        <span class="yyt-option-text">${w(t.name)}</span>
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
                   value="${w(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${f}-api-key" 
                     value="${w(t.apiKey||"")}" 
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
                     value="${w(t.model||"")}" 
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
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${f}-preset-dropdown`),n=s.find(".yyt-select-trigger"),i=s.find(".yyt-select-value"),o=()=>{let a=String(i.data("value")||"").trim();if(!a){tt="",Ot(""),Pt(t,Et(),f),t.find(".yyt-preset-item").removeClass("yyt-loaded"),v("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let r=$t(a);if(!r){v("error",`\u9884\u8BBE "${a}" \u4E0D\u5B58\u5728`);return}tt=a,Ot(a),Pt(t,r.apiConfig,f),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),v("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${a}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};n.on("click",function(a){a.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",a=>{if(e(a.target).hasClass("yyt-option-star"))return;let r=e(a.currentTarget),l=r.data("value"),c=r.find(".yyt-option-text").text();tt=String(l||"").trim(),i.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),r.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${f}-load-preset`).on("click",()=>{o()}),s.find(".yyt-option-star").on("click",a=>{a.preventDefault(),a.stopPropagation();let r=e(a.currentTarget).data("preset");if(!r)return;let l=ui(r);if(l.success){v("success",l.message);let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else v("error",l.message)}),e(document).on("click.yyt-dropdown",a=>{e(a.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let i=e(s.currentTarget).data("preset-name"),o=e(s.target).closest("[data-action]").data("action");if(o)switch(s.stopPropagation(),o){case"load":t.find(".yyt-select-value").text(i).data("value",i),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${i.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${f}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${i}" \u5417\uFF1F`)){let a=Js(i);if(v(a.success?"info":"error",a.message),a.success){Zs(tt)===i&&(tt=null);let r=t.closest(".yyt-api-manager").parent();r.length&&this.renderTo(r)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${f}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),n=t.find(`#${f}-custom-api-fields`);s?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${f}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${f}-api-key`),n=s.attr("type");s.attr("type",n==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${f}-load-models`).on("click",async()=>{let s=t.find(`#${f}-load-models`),n=t.find(`#${f}-model`),i=t.find(`#${f}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=Tt(t,f),a=await ci(o);if(a.length>0){i.empty(),a.forEach(l=>{i.append(`<option value="${w(l)}">${w(l)}</option>`)}),n.hide(),i.show();let r=n.val();r&&a.includes(r)&&i.val(r),i.off("change").on("change",function(){n.val(e(this).val())}),v("success",`\u5DF2\u52A0\u8F7D ${a.length} \u4E2A\u6A21\u578B`)}else v("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){v("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${f}-model`).on("focus",function(){let s=t.find(`#${f}-model-select`);e(this).show(),s.hide()}),t.find(`#${f}-save-api-config`).on("click",()=>{let s=Tt(t,f),n=Zs(Xs()),i=Jt(s);if(!i.valid&&!s.useMainApi){v("error",i.errors.join(", "));return}if(n){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${n}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){qt(s),Ot(""),tt="",v("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a);return}qt(s);let o=di(n,{apiConfig:s});if(o.success){tt=n,v("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${n}"`),Ot(n),L.emit(B.PRESET_UPDATED,{name:n});let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}else v("error",o.message);return}qt(s),v("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${f}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Ot(""),tt="",qt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),v("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${f}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${f}-export-presets`).on("click",()=>{try{let s=gi();ut(s,`youyou_toolkit_presets_${Date.now()}.json`),v("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){v("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${f}-import-presets`).on("click",()=>{t.find(`#${f}-import-file`).click()}),t.find(`#${f}-import-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let i=await pt(n),o=fi(i,{overwrite:!0});if(v(o.success?"success":"error",o.message),o.imported>0){let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}catch(i){v("error",`\u5BFC\u5165\u5931\u8D25: ${i.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let n=Xt().map(d=>d.name),i=mi("\u65B0\u9884\u8BBE"),o=`
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
                     value="${w(i)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
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
    `;e(`#${f}-dialog-overlay`).remove(),t.append(o);let a=e(`#${f}-dialog-overlay`),r=e(`#${f}-dialog-preset-name`),l=e(`#${f}-dialog-preset-desc`);r.focus().select();let c=()=>a.remove();a.find(`#${f}-dialog-close, #${f}-dialog-cancel`).on("click",c),a.on("click",function(d){d.target===this&&c()}),a.find(`#${f}-dialog-save`).on("click",()=>{let d=r.val().trim(),u=l.val().trim();if(!d){v("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),r.focus();return}if(n.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Js(d)}let y=Tt(t,f),p=qs({name:d,description:u,apiConfig:y});if(p.success){v("success",p.message),c(),L.emit(B.PRESET_CREATED,{preset:p.preset});let S=t.closest(".yyt-api-manager").parent();S.length&&this.renderTo(S)}else v("error",p.message)}),r.on("keypress",function(d){d.which===13&&a.find(`#${f}-dialog-save`).click()})},destroy(t){let e=Z();!e||!te(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Jo={};fe(Jo,{MESSAGE_MACROS:()=>qo,addTagRule:()=>Qt,createRuleTemplate:()=>Ho,default:()=>ml,deleteRulePreset:()=>Wo,deleteRuleTemplate:()=>Yo,deleteTagRule:()=>xs,escapeRegex:()=>Nt,exportRulesConfig:()=>ln,extractComplexTag:()=>Uo,extractCurlyBraceTag:()=>Ti,extractHtmlFormatTag:()=>zo,extractSimpleTag:()=>vi,extractTagContent:()=>Bt,generateTagSuggestions:()=>sn,getAllRulePresets:()=>rn,getAllRuleTemplates:()=>Fo,getContentBlacklist:()=>Lt,getRuleTemplate:()=>Ko,getTagRules:()=>yt,importRulesConfig:()=>cn,isValidTagName:()=>xi,loadRulePreset:()=>an,saveRulesAsPreset:()=>on,scanTextForTags:()=>tn,setContentBlacklist:()=>vs,setTagRules:()=>nn,shouldSkipContent:()=>Si,testRegex:()=>Vo,updateRuleTemplate:()=>jo,updateTagRule:()=>Zt});function gl(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...bi],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Oe(){return R.get(Lo,gl())}function st(t){R.set(Lo,t)}function en(){let t=Oe();return Ie=t.ruleTemplates||[...bi],ae=t.tagRules||[],Pe=t.contentBlacklist||[],{ruleTemplates:Ie,tagRules:ae,contentBlacklist:Pe}}function Nt(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Si(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(n=>{let i=n.trim().toLowerCase();return i&&s.includes(i)})}function xi(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!fl.includes(t.toLowerCase())}function vi(t,e){if(!t||!e)return[];let s=[],n=Nt(e),i=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(i)].forEach(l=>{l[1]&&s.push(l[1].trim())});let a=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,r=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>r&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-r} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function Ti(t,e){if(!t||!e)return[];let s=[],n=Nt(e),i=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=i.exec(t))!==null;){let a=o.index,r=a+o[0].length,l=1,c=r;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(r,c-1);d.trim()&&s.push(d.trim())}i.lastIndex=a+1}return s}function Uo(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=s[0].trim(),i=s[1].trim(),o=i.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${i}`),[];let a=o[1],r=new RegExp(`${Nt(n)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(r)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function zo(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=s[1],i=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(c=>{c[1]&&i.push(c[1].trim())});let r=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return r>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${r-l} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),i}function Bt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(d=>d.type==="exclude"&&d.enabled),i=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),o=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of n)try{let u=new RegExp(`<${Nt(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Nt(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:u})}let r=[];if(i.length>0)for(let d of i){let u=[];try{if(d.type==="include")u.push(...vi(a,d.value)),u.push(...Ti(a,d.value));else if(d.type==="regex_include"){let y=new RegExp(d.value,"gi");[...a.matchAll(y)].forEach(S=>{S[1]&&u.push(S[1])})}}catch(y){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:y})}u.forEach(y=>r.push(y.trim()))}else r.push(a);let l=[];for(let d of r){for(let u of o)try{let y=new RegExp(u.value,"gi");d=d.replace(y,"")}catch(y){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:y})}Si(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function tn(t,e={}){let s=performance.now(),{chunkSize:n=5e4,maxTags:i=100,timeoutMs:o=5e3}=e,a=new Set,r=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=n){let y=t.slice(u,Math.min(u+n,t.length));if(c++,l+=y.length,performance.now()-s>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let p;for(;(p=r.exec(y))!==null&&a.size<i;){let S=(p[1]||p[2]).toLowerCase();xi(S)&&a.add(S)}if(a.size>=i)break;c%5===0&&await new Promise(S=>setTimeout(S,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function sn(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Fo(){return Ie.length===0&&en(),Ie}function Ko(t){return Ie.find(e=>e.id===t)}function Ho(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return Ie.push(e),Ei(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function jo(t,e){let s=Ie.findIndex(n=>n.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Ie[s]={...Ie[s],...e,updatedAt:new Date().toISOString()},Ei(),{success:!0,template:Ie[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Yo(t){let e=Ie.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Ie.splice(e,1),Ei(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Ei(){let t=Oe();t.ruleTemplates=Ie,st(t)}function yt(){return ae||en(),ae}function nn(t){ae=t||[];let e=Oe();e.tagRules=ae,st(e)}function Qt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};ae.push(e);let s=Oe();return s.tagRules=ae,st(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Zt(t,e){if(t<0||t>=ae.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ae[t]={...ae[t],...e};let s=Oe();return s.tagRules=ae,st(s),{success:!0,rule:ae[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function xs(t){if(t<0||t>=ae.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ae.splice(t,1);let e=Oe();return e.tagRules=ae,st(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Lt(){return Pe||en(),Pe}function vs(t){Pe=t||[];let e=Oe();e.contentBlacklist=Pe,st(e)}function on(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Oe();s.tagRulePresets||(s.tagRulePresets={});let n=`preset-${Date.now()}`;return s.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(ae)),blacklist:JSON.parse(JSON.stringify(Pe)),createdAt:new Date().toISOString()},st(s),{success:!0,preset:s.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function rn(){let e=Oe().tagRulePresets||{};return Object.values(e)}function an(t){let e=Oe(),n=(e.tagRulePresets||{})[t];return n?(ae=JSON.parse(JSON.stringify(n.rules||[])),Pe=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=ae,e.contentBlacklist=Pe,st(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Wo(t){let e=Oe(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,st(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function ln(){return JSON.stringify({tagRules:ae,contentBlacklist:Pe,ruleTemplates:Ie,tagRulePresets:Oe().tagRulePresets||{}},null,2)}function cn(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)ae=s.tagRules||[],Pe=s.contentBlacklist||[],Ie=s.ruleTemplates||bi;else if(s.tagRules&&ae.push(...s.tagRules),s.contentBlacklist){let i=new Set(Pe.map(o=>o.toLowerCase()));s.contentBlacklist.forEach(o=>{i.has(o.toLowerCase())||Pe.push(o)})}let n=Oe();return n.tagRules=ae,n.contentBlacklist=Pe,n.ruleTemplates=Ie,s.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...s.tagRulePresets}),st(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Vo(t,e,s="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let i=new RegExp(t,s),o=[];if(s.includes("g")){let a;for(;(a=i.exec(e))!==null;)a.length>1?o.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[n]||a[1]||a[0]}):o.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=i.exec(e);a&&o.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[n]||a[1]:a[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(a=>a.extracted)}}catch(i){return{success:!1,error:i.message,matches:[]}}}var Lo,fl,bi,Ie,ae,Pe,qo,ml,dn=X(()=>{Fe();Lo="settings";fl=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],bi=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],Ie=[],ae=[],Pe=[];qo={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};en();ml={extractTagContent:Bt,extractSimpleTag:vi,extractCurlyBraceTag:Ti,extractComplexTag:Uo,extractHtmlFormatTag:zo,escapeRegex:Nt,shouldSkipContent:Si,isValidTagName:xi,scanTextForTags:tn,generateTagSuggestions:sn,getAllRuleTemplates:Fo,getRuleTemplate:Ko,createRuleTemplate:Ho,updateRuleTemplate:jo,deleteRuleTemplate:Yo,getTagRules:yt,setTagRules:nn,addTagRule:Qt,updateTagRule:Zt,deleteTagRule:xs,getContentBlacklist:Lt,setContentBlacklist:vs,saveRulesAsPreset:on,getAllRulePresets:rn,loadRulePreset:an,deleteRulePreset:Wo,exportRulesConfig:ln,importRulesConfig:cn,testRegex:Vo,MESSAGE_MACROS:qo}});var He,_i=X(()=>{we();et();dn();He={id:"regexExtractPanel",render(t){let e=yt(),s=Lt(),n=rn();return`
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
    `},_renderRulesEditor(t,e,s){let n=t.length>0?t.map((o,a)=>this._renderRuleItem(o,a)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',i=s.length>0?s.map(o=>`<option value="${o.id}">${w(o.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${i?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${f}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${i}
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
                 value="${w(e.join(", "))}" 
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
               value="${w(t.value||"")}">
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
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),i=e(this).val();Zt(n,{type:i}),v("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),i=e(this).val().trim();Zt(n,{value:i})}),t.find(".yyt-rule-enabled").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),i=e(this).is(":checked");Zt(n,{enabled:i}),v("info",i?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let n=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(xs(n),this.renderTo(t),v("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let i=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(xs(i),this.renderTo(t),v("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${f}-add-rule`).on("click",()=>{Qt({type:"include",value:"",enabled:!0}),this.renderTo(t),v("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${f}-scan-tags`).on("click",async()=>{let s=t.find(`#${f}-scan-tags`),n=t.find(`#${f}-test-input`).val();if(!n||!n.trim()){v("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let i=await tn(n,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:a}=sn(i,25);if(o.length===0){v("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${f}-tag-suggestions-container`).hide();return}let r=t.find(`#${f}-tag-list`);t.find(`#${f}-tag-scan-stats`).text(`${a.finalCount}/${a.totalFound} \u4E2A\u6807\u7B7E, ${i.stats.processingTimeMs}ms`),r.empty(),o.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${w(c)}</button>`);d.on("click",()=>{if(yt().some(p=>p.type==="include"&&p.value===c)){v("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Qt({type:"include",value:c,enabled:!0}),this.renderTo(t),v("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),r.append(d)}),t.find(`#${f}-tag-suggestions-container`).show(),v("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(i){v("error",`\u626B\u63CF\u5931\u8D25: ${i.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${f}-add-exclude-cot`).on("click",()=>{let s=yt(),n="<!--[\\s\\S]*?-->";if(s.some(o=>o.type==="regex_exclude"&&o.value===n)){v("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Qt({type:"regex_exclude",value:n,enabled:!0}),this.renderTo(t),v("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${f}-content-blacklist`).on("change",function(){let n=e(this).val().split(",").map(i=>i.trim()).filter(i=>i);vs(n),v("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${n.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${f}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.find(`#${f}-load-rule-preset`).on("click",()=>{let s=t.find(`#${f}-rule-preset-select`).val();if(!s){v("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let n=an(s);n.success?(this.renderTo(t),v("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${n.preset.name}`),L.emit(B.REGEX_PRESET_LOADED,{preset:n.preset})):v("error",n.message)}),t.find(`#${f}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let n=on(s.trim());n.success?(this.renderTo(t),v("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):v("error",n.message)})},_bindTestEvents(t,e){t.find(`#${f}-test-extract`).on("click",()=>{let s=t.find(`#${f}-test-input`).val();if(!s||!s.trim()){v("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let n=yt(),i=Lt(),o=Bt(s,n,i),a=t.find(`#${f}-test-result-container`),r=t.find(`#${f}-test-result`);a.show(),!o||!o.trim()?(r.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),v("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(r.html(`<pre class="yyt-code-block">${w(o)}</pre>`),v("success","\u63D0\u53D6\u5B8C\u6210"),L.emit(B.REGEX_EXTRACTED,{result:o}))}),t.find(`#${f}-test-clear`).on("click",()=>{t.find(`#${f}-test-input`).val(""),t.find(`#${f}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${f}-import-rules`).on("click",()=>{t.find(`#${f}-import-rules-file`).click()}),t.find(`#${f}-import-rules-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let i=await pt(n),o=cn(i,{overwrite:!0});o.success?(this.renderTo(t),v("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):v("error",o.message)}catch(i){v("error",`\u5BFC\u5165\u5931\u8D25: ${i.message}`)}e(s.target).val("")}}),t.find(`#${f}-export-rules`).on("click",()=>{try{let s=ln();ut(s,`youyou_toolkit_rules_${Date.now()}.json`),v("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){v("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${f}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(nn([]),vs([]),this.renderTo(t),v("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Xo={};fe(Xo,{DEFAULT_TOOL_PRESETS:()=>nt,DEFAULT_TOOL_STRUCTURE:()=>Re,TOOL_STORAGE_KEYS:()=>oe,cloneTool:()=>Sl,createDefaultToolDefinition:()=>Ts,deleteTool:()=>wi,deleteToolPreset:()=>Tl,exportTools:()=>Ci,getAllToolPresets:()=>Ri,getAllTools:()=>Ut,getCurrentToolPresetId:()=>El,getTool:()=>ts,getToolPreset:()=>xl,importTools:()=>Mi,normalizeToolDefinitionToRuntimeConfig:()=>un,resetTools:()=>ki,saveTool:()=>pn,saveToolPreset:()=>vl,setCurrentToolPreset:()=>_l,setToolEnabled:()=>Ii,validateTool:()=>Al});function es(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Ai(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function hl(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function bl(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let n=hl(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Ts(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...Re,...t,id:t?.id||Re.id,icon:t?.icon||Re.icon,order:Number.isFinite(t?.order)?t.order:Re.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Re.promptTemplate,extractTags:es(t?.extractTags),config:{...Re.config,...s,trigger:{...Re.config.trigger,...s.trigger||{},events:es(s?.trigger?.events)},execution:{...Re.config.execution,...s.execution||{},timeout:Ai(s?.execution?.timeout,Re.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||Re.config.execution.retries)},api:{...Re.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...Re.config.context,...s.context||{},depth:Ai(s?.context?.depth,Re.config.context.depth),includeTags:es(s?.context?.includeTags),excludeTags:es(s?.context?.excludeTags)}},enabled:t?.enabled!==!1,metadata:{...Re.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function un(t,e={},s={}){let n=Ts({...e,id:t||e?.id||""}),i=es(n?.config?.trigger?.events),o=es(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),a=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),r=bl(t,n),l=i[0]||"GENERATION_ENDED",c=i.includes("GENERATION_ENDED"),d=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,trigger:{event:l,enabled:c},bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:d,apiPreset:a,overwrite:!0,enabled:d==="post_response_api"?c:!1},extraction:{enabled:!0,maxMessages:Ai(n?.config?.context?.depth,5),selectors:o},promptTemplate:r,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:a,extractTags:o,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function Ut(){let t=ee.get(oe.TOOLS),e=t&&typeof t=="object"?{...nt,...t}:{...nt};return Object.fromEntries(Object.entries(e).map(([s,n])=>[s,Ts({...n||{},id:s})]))}function ts(t){return Ut()[t]||null}function pn(t,e){if(!t||!e)return!1;let s=ee.get(oe.TOOLS)||{},n=!s[t]&&!nt[t],i=Ts({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=i,ee.set(oe.TOOLS,s),L.emit(n?B.TOOL_REGISTERED:B.TOOL_UPDATED,{toolId:t,tool:i}),!0}function wi(t){if(nt[t])return!1;let e=ee.get(oe.TOOLS)||{};return e[t]?(delete e[t],ee.set(oe.TOOLS,e),L.emit(B.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function Ii(t,e){let s=ts(t);if(!s)return!1;let n=ee.get(oe.TOOLS)||{};return n[t]||(n[t]={...s}),n[t].enabled=e,n[t].metadata={...n[t].metadata,updatedAt:new Date().toISOString()},ee.set(oe.TOOLS,n),L.emit(e?B.TOOL_ENABLED:B.TOOL_DISABLED,{toolId:t}),!0}function Sl(t,e,s){let n=ts(t);if(!n)return!1;let i=JSON.parse(JSON.stringify(n));return i.name=s||`${n.name} (\u526F\u672C)`,i.metadata={...i.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},pn(e,i)}function Ri(){let t=ee.get(oe.PRESETS);return t&&typeof t=="object"?{...nt,...t}:{...nt}}function xl(t){return Ri()[t]||null}function vl(t,e){if(!t||!e)return!1;let s=ee.get(oe.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},ee.set(oe.PRESETS,s),!0}function Tl(t){if(nt[t])return!1;let e=ee.get(oe.PRESETS)||{};return e[t]?(delete e[t],ee.set(oe.PRESETS,e),!0):!1}function El(){return ee.get(oe.CURRENT_PRESET)||null}function _l(t){return Ri()[t]?(ee.set(oe.CURRENT_PRESET,t),!0):!1}function Ci(){let t=ee.get(oe.TOOLS)||{},e=ee.get(oe.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Mi(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let i=s?{}:ee.get(oe.TOOLS)||{},o=s?{}:ee.get(oe.PRESETS)||{},a=0,r=0;if(n.tools&&typeof n.tools=="object"){for(let[l,c]of Object.entries(n.tools))nt[l]&&!s||c&&typeof c=="object"&&(i[l]=Ts({...c,id:l}),a++);ee.set(oe.TOOLS,i)}if(n.presets&&typeof n.presets=="object"){for(let[l,c]of Object.entries(n.presets))nt[l]&&!s||c&&typeof c=="object"&&(o[l]=c,r++);ee.set(oe.PRESETS,o)}return{success:!0,toolsImported:a,presetsImported:r,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${r} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function ki(){ee.remove(oe.TOOLS),ee.remove(oe.PRESETS),ee.remove(oe.CURRENT_PRESET)}function Al(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:n,api:i,context:o}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),n&&((typeof n.timeout!="number"||n.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof n.retries!="number"||n.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var Re,nt,oe,yn=X(()=>{Fe();we();Re={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},nt={},oe={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var gr={};fe(gr,{TOOL_CATEGORIES:()=>Qo,TOOL_REGISTRY:()=>ss,appendToolRuntimeHistory:()=>ws,clearToolApiPreset:()=>ar,default:()=>Pl,ensureToolRuntimeConfig:()=>fn,getAllDefaultToolConfigs:()=>ur,getAllToolApiBindings:()=>lr,getAllToolFullConfigs:()=>Ni,getEnabledTools:()=>is,getToolApiPreset:()=>$i,getToolBaseConfig:()=>gn,getToolConfig:()=>As,getToolFullConfig:()=>de,getToolList:()=>nr,getToolSubTabs:()=>ir,getToolWindowState:()=>yr,hasTool:()=>Gi,onPresetDeleted:()=>cr,patchToolRuntime:()=>ns,registerTool:()=>tr,resetToolConfig:()=>dr,resetToolRegistry:()=>or,saveToolConfig:()=>ot,saveToolWindowState:()=>pr,setToolApiPreset:()=>rr,setToolApiPresetConfig:()=>Ml,setToolBypassConfig:()=>kl,setToolOutputMode:()=>Cl,setToolPromptTemplate:()=>Dl,unregisterTool:()=>sr,updateToolRuntime:()=>Oi});function Es(t={}){let e=Array.isArray(t?.recentTriggerHistory)?t.recentTriggerHistory.filter(Boolean):[],s=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0,lastTriggerAt:0,lastTriggerEvent:"",lastMessageKey:"",lastExecutionKey:"",lastSkipReason:"",lastExecutionPath:"",lastWritebackStatus:"",lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0,lastTraceId:"",...t,recentTriggerHistory:e,recentWritebackHistory:s}}function wl(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Zo(){let t=Ut()||{};return Object.entries(t).filter(([e])=>!_s[e]).map(([e,s])=>[e,s||{}])}function er(){let t=Array.isArray(ss.tools?.subTabs)?[...ss.tools.subTabs]:[],e=Zo().map(([s,n],i)=>{let o=un(s,n);return{id:s,name:o.name||s,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+i,isCustom:!0,description:o.description||""}});return[...t,...e].sort((s,n)=>(s.order??0)-(n.order??0))}function Il(t,e={}){let s=un(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:Es(s.runtime)}}function Pi(t){let e=_s[t];if(e)return{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:Es(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=(Ut()||{})[t]||null;return n?Il(t,n):As(t)}function gn(t){let e=Pi(t);return e?{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Rl(t,e={},s=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.trigger={...t.trigger||{},...e.trigger||{}},n.output={...t.output||{},...e.output||{}},n.bypass={...t.bypass||{},...e.bypass||{}},n.runtime=Es({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}};let i=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||s||"";return n.output={...n.output||{},apiPreset:i},n.apiPreset=i,(!Array.isArray(n.extraction.selectors)||n.extraction.selectors.length===0)&&Array.isArray(n.extractTags)&&n.extractTags.length>0&&(n.extraction.selectors=[...n.extractTags]),(!Array.isArray(n.extractTags)||n.extractTags.length===0)&&(n.extractTags=Array.isArray(n.extraction.selectors)?[...n.extraction.selectors]:[]),t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function tr(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let n of s)if(!e[n])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return it[t]={id:t,...e,order:e.order??Object.keys(it).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function sr(t){return it[t]?(delete it[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function nr(t=!0){let e=Object.values(it).map(s=>s.id==="tools"?{...s,subTabs:er()}:s);return t?e.sort((s,n)=>(s.order??0)-(n.order??0)):e}function As(t){return t==="tools"&&it[t]?{...it[t],subTabs:er()}:it[t]||null}function Gi(t){return!!it[t]}function ir(t){let e=As(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function or(){it={...ss},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function rr(t,e){if(!Gi(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=R.get(Ue)||{};return s[t]=e||"",R.set(Ue,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function $i(t){return(R.get(Ue)||{})[t]||""}function ar(t){let e=R.get(Ue)||{};delete e[t],R.set(Ue,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function lr(){return R.get(Ue)||{}}function cr(t){let e=R.get(Ue)||{},s=!1;for(let n in e)e[n]===t&&(e[n]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&R.set(Ue,e)}function de(t){let e=Pi(t);if(!e)return As(t);let n=(R.get(zt)||{})[t]||{},i=$i(t);return Rl({...e,id:t},n,i)}function fn(t){if(!t)return!1;let e=Pi(t);if(!e)return!1;let s=R.get(zt)||{};if(s[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};s[t]=n,R.set(zt,s);let i=R.get(Ue)||{};return i[t]=n.output?.apiPreset||n.apiPreset||"",R.set(Ue,i),L.emit(B.TOOL_UPDATED,{toolId:t,config:n}),!0}function ot(t,e,s={}){if(!t||!de(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=s,i=R.get(zt)||{},o=R.get(Ue)||{},a=e?.output?.apiPreset??e?.apiPreset??"",r=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return i[t]={},r.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){i[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){i[t][l]=a;return}i[t][l]=e[l]}}),i[t].apiPreset===void 0&&(i[t].apiPreset=a),!i[t].output&&e.output!==void 0&&(i[t].output={...e.output||{},apiPreset:a}),R.set(zt,i),o[t]=a,R.set(Ue,o),n&&L.emit(B.TOOL_UPDATED,{toolId:t,config:i[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Cl(t,e){let s=de(t);return s?ot(t,{...s,output:{...s.output,mode:e}}):!1}function Ml(t,e){let s=de(t);return s?ot(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function kl(t,e){let s=de(t);return s?ot(t,{...s,bypass:{...s.bypass,...e}}):!1}function Dl(t,e){let s=de(t);return s?ot(t,{...s,promptTemplate:e}):!1}function ns(t,e,s={}){let n=de(t);if(!n)return!1;let{touchLastRunAt:i=!1,emitEvent:o=!1}=s,a=Es({...n.runtime||{},...e||{}});return i&&(a.lastRunAt=Date.now()),ot(t,{...n,runtime:a},{emitEvent:o})}function ws(t,e,s={},n={}){let i=de(t);if(!i)return!1;let{limit:o=10,emitEvent:a=!1}=n,r=Es(i.runtime||{}),l=e==="writeback"?"recentWritebackHistory":"recentTriggerHistory",c={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return r[l]=wl([...Array.isArray(r[l])?r[l]:[],c],o),c?.traceId&&(r.lastTraceId=c.traceId),ot(t,{...i,runtime:r},{emitEvent:a})}function Oi(t,e){return ns(t,e,{touchLastRunAt:!0,emitEvent:!0})}function dr(t){if(!t||!_s[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=R.get(zt)||{};return delete e[t],R.set(zt,e),L.emit(B.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function ur(){return{..._s}}function Ni(){let t=new Set([...Object.keys(_s),...Zo().map(([e])=>e)]);return Array.from(t).map(e=>de(e)).filter(Boolean)}function is(){return Ni().filter(t=>t&&t.enabled)}function pr(t,e){let s=R.get(Di)||{};s[t]={...e,updatedAt:Date.now()},R.set(Di,s)}function yr(t){return(R.get(Di)||{})[t]||null}var zt,Ue,Di,_s,ss,Qo,it,Pl,os=X(()=>{Fe();we();yn();zt="tool_configs",Ue="tool_api_bindings",Di="tool_window_states";_s={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},ss={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},Qo={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},it={...ss};Pl={TOOL_REGISTRY:ss,TOOL_CATEGORIES:Qo,registerTool:tr,unregisterTool:sr,getToolList:nr,getToolConfig:As,hasTool:Gi,getToolSubTabs:ir,resetToolRegistry:or,setToolApiPreset:rr,getToolApiPreset:$i,clearToolApiPreset:ar,getAllToolApiBindings:lr,onPresetDeleted:cr,saveToolWindowState:pr,getToolWindowState:yr,getToolBaseConfig:gn,ensureToolRuntimeConfig:fn,getToolFullConfig:de,patchToolRuntime:ns,appendToolRuntimeHistory:ws,saveToolConfig:ot,resetToolConfig:dr,getAllDefaultToolConfigs:ur,getAllToolFullConfigs:Ni,getEnabledTools:is}});var je,Bi=X(()=>{et();yn();os();je={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){v("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=Ut(),s=Object.entries(e),n=s.filter(([,i])=>i?.enabled!==!1).length;return`
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
            <span class="yyt-tool-name">${w(n.name)}</span>
            <span class="yyt-tool-category">${w(n.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${n.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${w(n.description)}</div>
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
      `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item"),i=n.data("tool-id"),o=e(s.currentTarget).is(":checked");Ii(i,o),n.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),v("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(n)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,n)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),i=ts(n);if(!n||!i||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${i.name}\u201D\u5417\uFF1F`))return;if(!wi(n)){v("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),v("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let i=await pt(n),o=Mi(i,{overwrite:!1});v(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(i){v("error",`\u5BFC\u5165\u5931\u8D25: ${i.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=Ci();ut(s,`youyou_toolkit_tools_${Date.now()}.json`),v("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){v("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(ki(),this.renderTo(t),v("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let n=s?ts(s):null,i=!!n,o=`
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
                       value="${n?w(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${n?w(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(o);let a=e("#yyt-tool-dialog-overlay"),r=()=>a.remove();a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",r),a.on("click",function(l){l.target===this&&r()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),u=parseInt(e("#yyt-tool-timeout").val())||6e4,y=parseInt(e("#yyt-tool-retries").val())||3;if(!l){v("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let p=s||`tool_${Date.now()}`;if(!pn(p,{name:l,category:c,description:d,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{trigger:n?.config?.trigger||{type:"manual",events:[]},execution:{timeout:u,retries:y},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]}},enabled:n?.enabled!==!1})){v("error",i?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}fn(p),r(),this.renderTo(t),v("success",i?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),i||this._openToolConfig(p)})},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var fr={};fe(fr,{BypassManager:()=>mn,DEFAULT_BYPASS_PRESETS:()=>ft,addMessage:()=>Hl,buildBypassMessages:()=>ql,bypassManager:()=>V,createPreset:()=>Nl,default:()=>Jl,deleteMessage:()=>Yl,deletePreset:()=>Ll,duplicatePreset:()=>Ul,exportPresets:()=>Wl,getAllPresets:()=>$l,getDefaultPresetId:()=>zl,getEnabledMessages:()=>Kl,getPreset:()=>Ol,getPresetList:()=>Ui,importPresets:()=>Vl,setDefaultPresetId:()=>Fl,updateMessage:()=>jl,updatePreset:()=>Bl});var gt,rs,Li,ft,Gl,mn,V,$l,Ui,Ol,Nl,Bl,Ll,Ul,zl,Fl,Kl,Hl,jl,Yl,Wl,Vl,ql,Jl,Is=X(()=>{Fe();we();gt="bypass_presets",rs="default_bypass_preset",Li="current_bypass_preset",ft={},Gl=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),mn=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=R.get(gt,{});return this._cache={...ft,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,n)=>(n.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:n,description:i,messages:o}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=s.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let r={id:a,name:n.trim(),description:i||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,r),L.emit(B.BYPASS_PRESET_CREATED,{presetId:a,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:r}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let i={...n,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,i),L.emit(B.BYPASS_PRESET_UPDATED,{presetId:e,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:i}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(ft[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=R.get(gt,{});return delete n[e],R.set(gt,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),L.emit(B.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,n){let i=this.getPreset(e);if(!i)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(i)),id:s.trim(),name:n||`${i.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),o),L.emit(B.BYPASS_PRESET_CREATED,{presetId:s,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let i={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},o=[...n.messages||[],i];return this.updatePreset(e,{messages:o})}updateMessage(e,s,n){let i=this.getPreset(e);if(!i)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=i.messages||[],a=o.findIndex(l=>l.id===s);if(a===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let r=[...o];return r[a]={...r[a],...n},this.updatePreset(e,{messages:r})}deleteMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let i=n.messages||[],o=i.find(r=>r.id===s);if(!o)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=i.filter(r=>r.id!==s);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=R.get(rs,null);return e==="undefined"||e==="null"||e===""?(R.remove(rs),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(R.set(rs,e),L.emit(B.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:n=!1}=s,i;try{i=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(i)?i:i.presets?i.presets:[i];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let a=R.get(gt,{}),r=0;for(let l of o)!l.id||typeof l.id!="string"||l.name&&(ft[l.id]&&!n||!n&&a[l.id]||(a[l.id]={...l,updatedAt:Date.now()},r++));return r>0&&(R.set(gt,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${r} \u4E2A\u9884\u8BBE`,imported:r}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let n=R.get(gt,{});n[e]=s,R.set(gt,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=R.get(gt,{}),s={},n=!1,i=Array.isArray(e)?e.map((o,a)=>[o?.id||o?.name||`legacy_${a}`,o]):Object.entries(e||{});for(let[o,a]of i){let r=this._normalizePreset(o,a,s);if(!r){n=!0;continue}s[r.id]=r,(!e?.[r.id]||e?.[r.id]?.id!==r.id)&&(n=!0)}n&&R.set(gt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,n={}){if(!s||typeof s!="object")return null;let i=typeof s.name=="string"?s.name.trim():"",o=typeof s.id=="string"?s.id.trim():"",a=typeof e=="string"?e.trim():"";if(!i&&a&&a!=="undefined"&&a!=="null"&&(i=a),this._isLegacySamplePreset(i,o)||(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),!o&&i&&i!=="undefined"&&i!=="null"&&(o=this._generatePresetId(i,n)),!i||!o||o==="undefined"||i==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${o}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:o,name:i,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=R.get(rs,null),n=R.get(Li,null),i=s??n;(i==="undefined"||i==="null"||i==="")&&(i=null),i&&!e[i]&&(i=Object.values(e).find(a=>a.name===i)?.id||null),i?R.set(rs,i):R.remove(rs),R.has(Li)&&R.remove(Li)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Gl.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,i=n,o=1;for(;s[i];)i=`${n}_${o++}`;return i}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},V=new mn,$l=()=>V.getAllPresets(),Ui=()=>V.getPresetList(),Ol=t=>V.getPreset(t),Nl=t=>V.createPreset(t),Bl=(t,e)=>V.updatePreset(t,e),Ll=t=>V.deletePreset(t),Ul=(t,e,s)=>V.duplicatePreset(t,e,s),zl=()=>V.getDefaultPresetId(),Fl=t=>V.setDefaultPresetId(t),Kl=t=>V.getEnabledMessages(t),Hl=(t,e)=>V.addMessage(t,e),jl=(t,e,s)=>V.updateMessage(t,e,s),Yl=(t,e)=>V.deleteMessage(t,e),Wl=t=>V.exportPresets(t),Vl=(t,e)=>V.importPresets(t,e),ql=t=>V.buildBypassMessages(t),Jl=V});var mr={};fe(mr,{DEFAULT_SETTINGS:()=>Rs,SettingsService:()=>hn,default:()=>Xl,settingsService:()=>Ne});var Rs,zi,hn,Ne,Xl,Cs=X(()=>{Fe();we();Rs={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!1,debounceMs:300,useMessageReceivedFallback:!0,useGenerationAfterCommandsFallback:!0,messageSessionWindowMs:1800,historyRetentionLimit:10},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},zi="settings_v2",hn=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=R.get(zi,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),R.set(zi,this._cache),L.emit(B.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),n=this._deepMerge(s,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Rs)),R.set(zi,this._cache),L.emit(B.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let n=this.getSettings(),i=e.split("."),o=n;for(let a of i)if(o&&typeof o=="object"&&a in o)o=o[a];else return s;return o}set(e,s){let n=JSON.parse(JSON.stringify(this.getSettings())),i=e.split("."),o=n;for(let a=0;a<i.length-1;a++){let r=i[a];r in o||(o[r]={}),o=o[r]}o[i[i.length-1]]=s,this.saveSettings(n)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Rs)),e)}_deepMerge(e,s){let n={...e};for(let i in s)s[i]&&typeof s[i]=="object"&&!Array.isArray(s[i])?n[i]=this._deepMerge(e[i]||{},s[i]):n[i]=s[i];return n}},Ne=new hn,Xl=Ne});var br={};fe(br,{ContextInjector:()=>xn,DEFAULT_INJECTION_OPTIONS:()=>hr,WRITEBACK_METHODS:()=>Se,WRITEBACK_RESULT_STATUS:()=>Sn,contextInjector:()=>vn,default:()=>ec});function _t(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}var Ye,bn,hr,Sn,Se,Ql,Zl,xn,vn,ec,Fi=X(()=>{we();Ye="YouYouToolkit_toolOutputs",bn="YouYouToolkit_injectedContext",hr={overwrite:!0,enabled:!0},Sn={SUCCESS:"success",FAILED:"failed"},Se={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Ql=60,Zl=3;xn=class{constructor(){this.debugMode=!1}async inject(e,s,n={}){return(await this.injectDetailed(e,s,n)).success}async injectDetailed(e,s,n={}){let i={...hr,...n},o=this._createWritebackResult(e,i);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;let a=o.chatId,r={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:n.sourceMessageId||null,options:i};L.emit(B.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:r.content,options:i});let l=await this._insertToolOutputToLatestAssistantMessage(e,r,i,o);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),n=this._findAssistantMessageIndex(s,e);if(n<0)return"";let i=s[n]||{},o=i[bn];if(typeof o=="string"&&o.trim())return o.trim();let a=i[Ye];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let i=(e[s]||{})[Ye];return i&&typeof i=="object"?i:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:n}=this._getChatRuntime(),i=this._findAssistantMessageIndex(n,null);return i<0?null:n[i]?.[Ye]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:n,context:i,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let r=o[a],l=r?.[Ye];if(!l||!l[s])return!1;delete l[s],r[Ye]=l,r[bn]=this._buildMessageInjectedContext(l);let c=i?.saveChat||n?.saveChat||null;return typeof c=="function"&&await c.call(i||n),L.emit(B.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(n){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",n),!1}}async clearAllContext(e){try{let{api:s,context:n,chat:i}=this._getChatRuntime(),o=this._findAssistantMessageIndex(i,null);if(o<0)return!1;let a=i[o];delete a[Ye],delete a[bn];let r=n?.saveChat||s?.saveChat||null;return typeof r=="function"&&await r.call(n||s),L.emit(B.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),n=Object.entries(s).map(([i,o])=>({toolId:i,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,n=s?.getContext?.()||null,i=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(s?.chat)?s.chat:[],a=i.length?i:o;return{topWindow:e,api:s,context:n,chat:a,contextChat:i,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let n=Se.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Se.NONE,commit:{preferredMethod:n,attemptedMethods:[],appliedMethod:Se.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:Sn.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,n,i,o,a=null){let r=e?.contextChat?.[n]||e?.apiChat?.[n]||s?.[n]||a||null,l=this._getWritableMessageField(r).text||"",c=r?.[Ye]?.[i],d=o?l.includes(o):!0,u=!!(c&&String(c.content||"").trim()===o);return{latestMessage:r,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,n,i,o,a=null){let r=1,l=this._collectWritebackVerification(e,s,n,i,o,a);for(let c=0;c<Zl;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:r,confirmedBy:"text_and_mirror_present"};await this._wait(Ql),r+=1,l=this._collectWritebackVerification(e,s,n,i,o,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:r,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let n=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,s){let n=String(e||""),i=String(s||"").trim();return i?n.includes(i)?{text:n.replace(i,"").trimEnd(),removed:!0}:{text:n,removed:!1}:{text:n,removed:!1}}_syncMessageToRuntimeChats(e,s,n){let{contextChat:i,apiChat:o}=e||{},a=r=>{!Array.isArray(r)||s<0||s>=r.length||r[s]!==n&&(r[s]={...r[s]||{},...n})};a(i),a(o)}_notifyMessageUpdated(e,s){try{let{api:n,topWindow:i}=e||{},o=n?.eventSource||null,r=(n?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";o&&typeof o.emit=="function"&&(o.emit(r,s),typeof i?.requestAnimationFrame=="function"?i.requestAnimationFrame(()=>{o.emit(r,s)}):typeof i?.setTimeout=="function"&&i.setTimeout(()=>{o.emit(r,s)},30))}catch(n){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",n)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let i=s!=null&&s!=="",o=(a,r)=>{if(!this._isAssistantMessage(a)||s==null||s==="")return!1;let l=String(s).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,r].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let a=n.length-1;a>=0;a-=1)if(o(n[a],a))return a;if(i)return-1;for(let a=n.length-1;a>=0;a-=1)if(this._isAssistantMessage(n[a]))return a;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).sort(([,o],[,a])=>(o?.updatedAt||0)-(a?.updatedAt||0));if(!n.length)return"";let i=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,a]of n)i.push(`[${o}]`),i.push(a?.content||""),i.push("");return i.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let n of s)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,s){let n=e&&typeof e=="object"?e:{},i=["mes","message","content","text"],o=!1;if(i.forEach(a=>{typeof n[a]=="string"&&(n[a]=s,o=!0)}),o||(n.mes=s,n.message=s),Array.isArray(n.swipes)){let a=Number.isInteger(n.swipe_id)?n.swipe_id:Number.isInteger(n.swipeId)?n.swipeId:0;a>=0&&a<n.swipes.length&&(n.swipes[a]=s)}return n}_stripExistingToolOutput(e,s=[]){let n=String(e||"");return(Array.isArray(s)?s:[]).forEach(o=>{let a=String(o||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");n=n.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",a,d)}return}let r=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${r}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${r}>\\s*`,"gi"),c=new RegExp(`\\{${r}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(l,""),n=n.replace(c,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,s){let n=String(e||""),i=String(s||"").trim();return i?n.replace(i,"").trimEnd():n.trimEnd()}async _insertToolOutputToLatestAssistantMessage(e,s,n={},i=null){let o=i||this._createWritebackResult(e,n);try{let a=this._getChatRuntime(),{api:r,context:l,chat:c}=a;if(!Array.isArray(c)||!c.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let d=this._findAssistantMessageIndex(c,n.sourceMessageId);if(d<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;o.messageIndex=d,o.steps.foundTargetMessage=!0;let u=c[d],{key:y,text:p}=this._getWritableMessageField(u);o.textField=y;let S=u[Ye]&&typeof u[Ye]=="object"?u[Ye]:{},b=S?.[e]||{},P=b?.content||"",$=b?.blockText||P||"",W=Object.entries(S).filter(([se])=>se!==e).map(([,se])=>se||{}),I=String(s.content||"").trim(),T=this._inferBlockType(I),m={toolId:e,messageId:n.sourceMessageId||u?.message_id||u?.messageId||d,blockType:T,insertedAt:s.updatedAt,replaceable:n.overwrite!==!1};o.blockIdentity=m;let z=n.overwrite===!1?{text:String(p||""),removed:!1}:this._stripExactStoredBlock(p,$),G=z.text,A="";n.overwrite!==!1&&$&&!z.removed&&(A="previous_block_not_found");let N=n.overwrite===!1?G:this._stripExistingToolOutput(G,n.extractionSelectors),_=N!==G;G=N;let O=n.overwrite===!1?G:this._stripPreviousStoredToolContent(G,P),ue=O!==G;G=O,o.replacedExistingBlock=z.removed||_||ue;let ve=[(n.overwrite===!1?String(p||""):G).trimEnd(),I].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!I;let Le=W.every(se=>{let g=String(se?.blockText||se?.content||"").trim();return g?ve.includes(g):!0});o.preservedOtherToolBlocks=Le,Le?A&&(o.conflictDetected=!0,o.conflictReason=A):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let ze={...S,[e]:{toolId:e,content:I,blockText:I,blockType:T,blockIdentity:m,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};u[y]=ve,this._applyMessageText(u,ve),u[Ye]=ze,u[bn]=this._buildMessageInjectedContext(ze),o.contentCommitted=!0,o.commit.contentCommitted=!0,o.steps.contentCommitted=!0,o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,d,u),o.steps.runtimeSynced=!0;let Xe=l?.setChatMessages||r?.setChatMessages||a?.topWindow?.setChatMessages||null,Ge=l?.setChatMessage||r?.setChatMessage||a?.topWindow?.setChatMessage||null;o.commit.preferredMethod=typeof Xe=="function"?Se.SET_CHAT_MESSAGES:typeof Ge=="function"?Se.SET_CHAT_MESSAGE:Se.LOCAL_ONLY;let ct=!1;if(typeof Xe=="function"){_t(o.commit.attemptedMethods,Se.SET_CHAT_MESSAGES);try{await Xe.call(l||r||a?.topWindow,[{message_id:d,message:ve,mes:ve,content:ve,text:ve}],{refresh:"affected"}),o.steps.hostSetChatMessages=!0,o.hostUpdateMethod=Se.SET_CHAT_MESSAGES,o.hostCommitApplied=!0,o.commit.appliedMethod=Se.SET_CHAT_MESSAGES,o.commit.hostCommitApplied=!0,ct=!0}catch(se){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",se),o.errors.push(`setChatMessages: ${se?.message||String(se)}`)}}if(!ct&&typeof Ge=="function"){_t(o.commit.attemptedMethods,Se.SET_CHAT_MESSAGE);try{await Ge.call(l||r||a?.topWindow,{message:ve,mes:ve,content:ve,text:ve},d),o.steps.hostSetChatMessage=!0,o.hostUpdateMethod=Se.SET_CHAT_MESSAGE,o.hostCommitApplied=!0,o.commit.appliedMethod=Se.SET_CHAT_MESSAGE,o.commit.hostCommitApplied=!0,o.commit.fallbackUsed=o.commit.preferredMethod!==Se.SET_CHAT_MESSAGE,ct=!0}catch(se){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",se),o.errors.push(`setChatMessage: ${se?.message||String(se)}`)}}if(ct||(o.hostUpdateMethod=Se.LOCAL_ONLY,_t(o.commit.attemptedMethods,Se.LOCAL_ONLY),o.commit.appliedMethod=Se.LOCAL_ONLY,o.commit.fallbackUsed=o.commit.preferredMethod!==Se.LOCAL_ONLY),typeof Ge=="function")try{await Ge.call(l||r||a?.topWindow,{},d),o.steps.refreshForceSetChatMessage=!0,o.refreshRequested=!0,_t(o.refresh.requestMethods,"setChatMessage(force_refresh)")}catch(se){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",se),o.errors.push(`setChatMessage(refresh): ${se?.message||String(se)}`)}let ye=l?.saveChat||r?.saveChat||null,ge=l?.saveChatDebounced||r?.saveChatDebounced||null;typeof ge=="function"&&(ge.call(l||r),o.steps.saveChatDebounced=!0,o.refreshRequested=!0,_t(o.refresh.requestMethods,"saveChatDebounced")),typeof ye=="function"&&(await ye.call(l||r),o.steps.saveChat=!0,o.refreshRequested=!0,_t(o.refresh.requestMethods,"saveChat")),this._notifyMessageUpdated(a,d),o.steps.notifiedMessageUpdated=!0;let St=String(s.content||"").trim();(o.steps.hostSetChatMessages||o.steps.hostSetChatMessage)&&(o.refreshRequested=!0,_t(o.refresh.requestMethods,o.hostUpdateMethod)),o.steps.notifiedMessageUpdated&&(o.refreshRequested=!0,_t(o.refresh.requestMethods,"MESSAGE_UPDATED")),o.steps.refreshRequested=o.refreshRequested,o.refresh.requested=o.refreshRequested;let Qe=await this._confirmRefresh(a,c,d,e,St,u);return o.verification.textIncludesContent=Qe.textIncludesContent,o.verification.mirrorStored=Qe.mirrorStored,o.verification.refreshConfirmed=Qe.refreshConfirmed,o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.refreshConfirmed=o.verification.refreshConfirmed&&o.refreshRequested,o.refresh.confirmChecks=Number(Qe.confirmChecks)||0,o.refresh.confirmedBy=Qe.confirmedBy||"",o.refresh.confirmed=o.refreshConfirmed,o.steps.refreshConfirmed=o.refreshConfirmed,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite&&o.refreshConfirmed,o.writebackStatus=o.success?Sn.SUCCESS:Sn.FAILED,!o.success&&!o.error&&(o.error=o.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587: ${e} -> #${d}`),o}catch(a){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",a),o.error=a?.message||String(a),o.errors.push(o.error),o}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),i=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(i)return i;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},vn=new xn,ec=vn});var xr={};fe(xr,{BUILTIN_VARIABLES:()=>Sr,VariableResolver:()=>Tn,default:()=>tc,variableResolver:()=>At});var Sr,Tn,At,tc,Ki=X(()=>{we();Sr={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Tn=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,s),n=this._resolveCustomVariables(n,s),n=this._resolveRegexVariables(n,s),n}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(i=>this.resolveObject(i,s));let n={};for(let[i,o]of Object.entries(e))typeof o=="string"?n[i]=this.resolveTemplate(o,s):typeof o=="object"&&o!==null?n[i]=this.resolveObject(o,s):n[i]=o;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(Sr))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,n]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let i of this.getAvailableVariables())n[i.category]||(n[i.category]=[]),n[i.category].push(i);for(let[i,o]of Object.entries(s))if(n[i]&&n[i].length>0){e.push(`\u3010${o}\u3011`);for(let a of n[i])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let i=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(i)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let i=s.characterCard||s.raw?.characterCard;return i?this._formatCharacterCard(i):""}),n=n.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),n=n.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,s){let n=e;for(let[i,o]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(i)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(a,()=>{try{return o(s)}catch(r){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${i}:`,r),""}}):n=n.replace(a,String(o))}return n}_resolveRegexVariables(e,s){let n=e;for(let[i,o]of this.variableHandlers){let a=new RegExp(`\\{\\{${i}\\.([^}]+)\\}\\}`,"gi");n=n.replace(a,(r,l)=>{try{return o(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${i}.${l}:`,c),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let n=s.role||"unknown",i=s.content||s.mes||"";return`[${n}]: ${i}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},At=new Tn,tc=At});var Tr={};fe(Tr,{DEFAULT_PROMPT_TEMPLATE:()=>vr,ToolPromptService:()=>En,default:()=>sc,toolPromptService:()=>_n});var vr,En,_n,sc,Hi=X(()=>{we();Is();Ki();vr="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",En=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let n=this._getPromptTemplate(e),i=At.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),o=At.resolveTemplate(n,i).trim(),a=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return At.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:o,toolContentMacro:a})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],i=this._buildVariableContext(e,s),o=this._getBypassMessages(e);if(o&&o.length>0)for(let r of o)r.enabled!==!1&&n.push({role:this._normalizeRole(r.role),content:At.resolveTemplate(r.content||"",i)});let a=this._buildUserContent(this._getPromptTemplate(e),i);return a&&n.push({role:"user",content:a}),this._log(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:vr}_getBypassMessages(e){return e.bypass?.enabled?V.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":At.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},_n=new En,sc=_n});var _r={};fe(_r,{LEGACY_OUTPUT_MODES:()=>nc,OUTPUT_MODES:()=>wt,TOOL_FAILURE_STAGES:()=>We,TOOL_RUNTIME_STATUS:()=>ic,TOOL_WRITEBACK_STATUS:()=>ne,ToolOutputService:()=>An,default:()=>oc,toolOutputService:()=>as});function Er(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var wt,nc,ic,We,ne,An,as,oc,ji=X(()=>{we();Cs();Fi();Hi();dn();Ys();wt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},nc={inline:"follow_ai"},ic={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},We={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ne={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};An=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===wt.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===wt.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let n=Date.now(),i=e.id,o=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",r=s?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=ne.NOT_APPLICABLE,y=null,p=[],S="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${i}`),L.emit(B.TOOL_EXECUTION_STARTED,{toolId:i,traceId:o,sessionKey:a,mode:wt.POST_RESPONSE_API});try{if(d=We.BUILD_MESSAGES,p=await this._buildToolMessages(e,s),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let b=await this._getRequestTimeout();d=We.SEND_API_REQUEST;let P=await this._sendApiRequest(c,p,{timeoutMs:b,signal:s.signal});if(d=We.EXTRACT_OUTPUT,S=this._extractOutputContent(P,e),S){if(d=We.INJECT_CONTEXT,y=await vn.injectDetailed(i,S,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.confirmedAssistantMessageId||s.messageId||"",extractionSelectors:l,traceId:o,sessionKey:a}),!y?.success)throw u=ne.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ne.SUCCESS}else u=ne.SKIPPED_EMPTY_OUTPUT;d="";let $=Date.now()-n;return L.emit(B.TOOL_EXECUTED,{toolId:i,traceId:o,sessionKey:a,success:!0,duration:$,mode:wt.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${i}, \u8017\u65F6 ${$}ms`),{success:!0,toolId:i,output:S,duration:$,meta:{traceId:o,sessionKey:a,executionKey:r,generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:y,phases:Er(p,S,y)}}}catch(b){let P=Date.now()-n,$=d||We.UNKNOWN,W=u||ne.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${i}`,b),L.emit(B.TOOL_EXECUTION_FAILED,{toolId:i,traceId:o,sessionKey:a,error:b.message||String(b),duration:P}),{success:!1,toolId:i,error:b.message||String(b),duration:P,meta:{traceId:o,sessionKey:a,executionKey:r,generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:W,failureStage:$,writebackDetails:y,phases:Er(p,S,y)}}}}async runToolInline(e,s){let n=Date.now(),i=e.id;try{let o=await this._buildToolMessages(e,s);return{success:!0,toolId:i,messages:o,duration:Date.now()-n}}catch(o){return{success:!1,toolId:i,error:o.message||String(o),duration:Date.now()-n}}}async previewExtraction(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),i=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:i,filteredSourceText:o,extractedText:a,messageEntries:n,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),i=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),r={...s,rawRecentMessagesText:i,recentMessagesText:o,extractedContent:a,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return _n.buildToolMessages(e,r)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:i=9e4,signal:o}=n,a=null;if(e){if(!ri(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=bs(e)}else a=bs();let r=Jt(a||{});if(!r.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${r.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:i,apiConfig:a},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ne.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let n=typeof e=="string"?e:String(e||""),i=this._getExtractionSelectors(s);if(!i.length)return n.trim();let o=[];for(let a of i){let r=String(a||"").trim();if(!r)continue;if(r.startsWith("regex:")){let c=r.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...n.matchAll(d)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&o.push(p)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:r,error:d})}continue}let l=r.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(n.match(c)||[]).forEach(u=>{let y=String(u||"").trim();y&&o.push(y)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:r,error:c})}}return o.length>0?o.join(`

`).trim():n.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(n=>String(n||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(n=>String(n||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,n={}){let i=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s),{strict:a=!1}=n;if(!o.length)return i.trim();let r=o.map((c,d)=>{let u=String(c||"").trim(),y=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:y?"regex_include":"include",value:y?u.slice(6).trim():u,enabled:!0}}).filter(c=>c.value),l=Bt(i,r,[]);return a?(l||"").trim():l||i.trim()}_extractToolContent(e,s){let n=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let n=yt()||[],i=Lt()||[];return!Array.isArray(n)||n.length===0?s.trim():Bt(s,n,i)||s.trim()}catch(n){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",n),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of s)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),i=Array.isArray(s?.chatMessages)?s.chatMessages:[],o=[];for(let r=i.length-1;r>=0&&o.length<n;r-=1){let l=i[r],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&o.unshift({text:u,message:l,chatIndex:r})}if(o.length>0)return o;let a=s?.lastAiMessage||s?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((i,o)=>{let a=i.text||"",r=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...i,order:o+1,rawText:a,filteredText:r,extractedText:l}})}_joinMessageBlocks(e,s,n={}){let i=Array.isArray(e)?e:[],{skipEmpty:o=!1}=n;return i.map(r=>{let l=String(r?.[s]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(i=>{let o=`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(i?.filteredText||"").trim()||"(\u7A7A)",r=String(i?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${r}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Ne.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},as=new An,oc=as});var In={};fe(In,{abortAllTasks:()=>dc,abortTask:()=>cc,buildToolMessages:()=>Ir,clearExecutionHistory:()=>fc,createExecutionContext:()=>Sc,createResult:()=>wn,enhanceMessagesWithBypass:()=>xc,executeBatch:()=>lc,executeTool:()=>wr,executeToolWithConfig:()=>Rr,executeToolsBatch:()=>Ec,executorState:()=>le,extractFailed:()=>bc,extractSuccessful:()=>hc,generateTaskId:()=>Ft,getExecutionHistory:()=>gc,getExecutorStatus:()=>yc,getScheduler:()=>ls,getToolsForEvent:()=>_c,mergeResults:()=>mc,pauseExecutor:()=>uc,resumeExecutor:()=>pc,setMaxConcurrent:()=>ac});function wn(t,e,s,n,i,o,a=0){return{success:s,taskId:t,toolId:e,data:n,error:i,duration:o,retries:a,timestamp:Date.now(),metadata:{}}}function Ft(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function rc(t,e={}){return{id:Ft(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function ls(){return Ms||(Ms=new Yi(le.maxConcurrent)),Ms}function ac(t){le.maxConcurrent=Math.max(1,Math.min(10,t)),Ms&&(Ms.maxConcurrent=le.maxConcurrent)}async function wr(t,e={},s){let n=ls(),i=rc(t,e);for(;le.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},i);return Ar(o),o}catch(o){let a=wn(i.id,t,!1,null,o,Date.now()-i.createdAt,i.retries);return Ar(a),a}}async function lc(t,e={}){let{failFast:s=!1,concurrency:n=le.maxConcurrent}=e,i=[],o=ls(),a=o.maxConcurrent;o.maxConcurrent=n;try{let r=t.map(({toolId:l,options:c,executor:d})=>wr(l,c,d));if(s)for(let l of r){let c=await l;if(i.push(c),!c.success){o.abortAll();break}}else{let l=await Promise.allSettled(r);for(let c of l)c.status==="fulfilled"?i.push(c.value):i.push(wn(Ft(),"unknown",!1,null,c.reason,0,0))}}finally{o.maxConcurrent=a}return i}function cc(t){return ls().abort(t)}function dc(){ls().abortAll(),le.executionQueue=[]}function uc(){le.isPaused=!0}function pc(){le.isPaused=!1}function yc(){return{...ls().getStatus(),isPaused:le.isPaused,activeControllers:le.activeControllers.size,historyCount:le.executionHistory.length}}function Ar(t){le.executionHistory.push(t),le.executionHistory.length>100&&le.executionHistory.shift()}function gc(t={}){let e=[...le.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function fc(){le.executionHistory=[]}function mc(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function hc(t){return t.filter(e=>e.success).map(e=>e.data)}function bc(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Sc(t={}){return{taskId:Ft(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function xc(t,e){return!e||e.length===0?t:[...e,...t]}function vc(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ir(t,e){let s=[],n=t.promptTemplate||"",i={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,a]of Object.entries(i))n=n.replace(new RegExp(vc(o),"g"),a);return s.push({role:"USER",content:n}),s}async function Rr(t,e,s={}){let n=de(t);if(!n)return{success:!1,taskId:Ft(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:Ft(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let i=Date.now(),o=Ft();try{L.emit(B.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let a=Ir(n,e);if(typeof s.callApi=="function"){let r=n.output?.apiPreset||n.apiPreset||"",l=r?{preset:r}:null,c=await s.callApi(a,l,s.signal),d=c;n.outputMode==="separate"&&n.extractTags?.length>0&&(d=Tc(c,n.extractTags));let u={success:!0,taskId:o,toolId:t,data:d,duration:Date.now()-i};return L.emit(B.TOOL_EXECUTED,{toolId:t,taskId:o,result:u}),u}else return{success:!0,taskId:o,toolId:t,data:{messages:a,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-i,needsExecution:!0}}catch(a){let r={success:!1,taskId:o,toolId:t,error:a.message||String(a),duration:Date.now()-i};return L.emit(B.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:a}),r}}function Tc(t,e){let s={};for(let n of e){let i=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=t.match(i);o&&(s[n]=o.map(a=>{let r=a.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return r?r[1].trim():""}))}return s}async function Ec(t,e,s={}){let n=[];for(let i of t){let o=de(i);if(o&&o.enabled){let a=await Rr(i,e,s);n.push(a)}}return n}function _c(t){let e=[],s=is();for(let n of s){let i=n?.trigger?.enabled&&n?.trigger?.event===t,o=Array.isArray(n?.triggerEvents)&&n.triggerEvents.includes(t);n&&n.enabled&&(i||o)&&e.push(n)}return e}var le,Yi,Ms,Rn=X(()=>{os();we();le={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Yi=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((n,i)=>{this.queue.push({executor:e,task:s,resolve:n,reject:i}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:n,resolve:i,reject:o}=e,a=new AbortController;n.abortController=a,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),le.activeControllers.set(n.id,a),this.executeTask(s,n,a.signal).then(r=>{n.status="completed",n.completedAt=Date.now(),i(r)}).catch(r=>{n.status=r.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(r)}).finally(()=>{this.running.delete(n.id),le.activeControllers.delete(n.id),le.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,n){let i=Date.now(),o=null;for(let a=0;a<=s.maxRetries;a++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let r=await e(n);return wn(s.id,s.toolId,!0,r,null,Date.now()-i,a)}catch(r){if(o=r,r.name==="AbortError")throw r;a<s.maxRetries&&(await this.delay(1e3*(a+1)),s.retries=a+1)}}throw o}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=le.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of le.activeControllers.values())e.abort();le.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Ms=null});var sa={};fe(sa,{AUTO_TRIGGER_SKIP_REASONS:()=>D,EVENT_TYPES:()=>M,TOOL_EXECUTION_PATHS:()=>jt,checkGate:()=>io,destroyToolTriggerManager:()=>Ad,exportAutoTriggerDiagnostics:()=>Kn,exportGenerationTransactionDiagnostics:()=>Rd,getAutoTriggerDiagnostics:()=>Ns,getChatContext:()=>oo,getCurrentCharacter:()=>ro,getFullContext:()=>ld,getGenerationTransactionDiagnostics:()=>Id,getToolTriggerManagerState:()=>wd,getWorldbookContent:()=>jr,initToolTriggerManager:()=>ea,initTriggerModule:()=>Xi,previewToolExtraction:()=>po,registerEventListener:()=>rt,registerTriggerHandler:()=>cd,removeAllListeners:()=>rd,removeAllTriggerHandlers:()=>ud,resetGateState:()=>ad,runToolManually:()=>uo,setDebugMode:()=>Cd,setTriggerHandlerEnabled:()=>dd,triggerState:()=>h,unregisterEventListener:()=>Ji,updateGateState:()=>Rt});function Yt(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function $n(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function U(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Nn(t){return new Promise(e=>setTimeout(e,t))}function Bn(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let n of s){if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"&&n.trim())return n.trim()}return e}function Qi(t=[]){return(Array.isArray(t)?t:[]).map((s,n)=>({role:Fn(s),content:$n(s),name:s?.name||"",timestamp:s?.send_date||s?.timestamp||"",isSystem:!!s?.is_system,isUser:!!s?.is_user,sourceId:Bn(s,n),swipeId:U(s?.swipe_id??s?.swipeId??s?.swipeID),swipeCount:Array.isArray(s?.swipes)&&s.swipes.length>0?s.swipes.length:1,chatIndex:n,originalMessage:s}))}function Ln(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function Mc(t,e=null,s={}){let{lockToMessageId:n=!1}=s,i=Qi(t),o=e==null||e===""?null:String(e).trim(),a=null,r=null;for(let l=i.length-1;l>=0;l-=1){let c=i[l],d=U(c.sourceId),u=o&&(d===o||String(c.chatIndex)===o);if(!a&&c.role==="assistant"&&Ln(c.content)&&(!o||!n||u)&&(a=c),!r&&c.role==="user"&&c.content&&(r=c),a&&r)break}return{messages:i,lastUserMessage:r,lastAiMessage:a}}async function kc(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:n=250,lockToMessageId:i=!1}=t,o={messages:[],lastUserMessage:null,lastAiMessage:null};for(let a=0;a<=s;a+=1){let r=await $s();if(o=Mc(r,e,{lockToMessageId:i}),o.lastAiMessage?.content)return o;a<s&&await Nn(n)}return o}function Dc(t="user_trigger_intent"){Rt({lastUserSendIntentAt:Date.now(),lastUserIntentSource:t||"user_trigger_intent"})}function Mn(){Dc("send_button_or_enter")}function Pc(){let t=Yt(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],n=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],i=(o,a,r)=>{o.forEach(l=>{let c=e.querySelector(l);c&&c.addEventListener(a,r,!0)})};return i(s,"click",()=>Mn()),i(s,"pointerup",()=>Mn()),i(s,"touchend",()=>Mn()),i(n,"keydown",o=>{let a=o?.key||"";(a==="Enter"||a==="NumpadEnter")&&!o.shiftKey&&Mn()}),t.__YYT_sendIntentHooksInstalled=!0,j("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function Gc(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function lt(){return Yt().SillyTavern||null}function $c(){return Yt().TavernHelper||null}function Oc(){let t=lt();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Nc(t=""){return t===M.MESSAGE_RECEIVED||t===M.MESSAGE_SENT||t===M.MESSAGE_UPDATED||t===M.MESSAGE_DELETED}function Zi(t){return!!t&&(typeof t.on=="function"||typeof t.addEventListener=="function")}function Ur(t,e,s){if(!t||typeof s!="function")return!1;try{if(typeof t.off=="function")return t.off(e,s),!0;if(typeof t.removeListener=="function")return t.removeListener(e,s),!0;if(typeof t.removeEventListener=="function")return t.removeEventListener(e,s),!0}catch(n){F("warn","\u79FB\u9664\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25",{eventName:e,error:n?.message||String(n)})}return!1}function Bc(t,e,s){Zi(t)&&(ce.eventSource=t,ce.eventTypes=e||ce.eventTypes||null,ce.source=s||ce.source||"unknown",F("info","\u7F13\u5B58\u4E8B\u4EF6\u6865\u63A5\u6210\u529F",{source:ce.source,hasOff:typeof t.off=="function",hasRemoveListener:typeof t.removeListener=="function",hasAddEventListener:typeof t.addEventListener=="function"}))}function ks(){let t=Yt(),e=t.SillyTavern||null,s=e?.getContext?.()||null,n=[{source:"SillyTavern.eventSource",eventSource:e?.eventSource,eventTypes:e?.eventTypes||e?.event_types||null},{source:"topWindow.eventSource",eventSource:t?.eventSource,eventTypes:t?.event_types||t?.eventTypes||null},{source:"SillyTavern.getContext()",eventSource:s?.eventSource||null,eventTypes:s?.eventTypes||s?.event_types||null},{source:"scriptModule exports",eventSource:ce.scriptModule?.eventSource||null,eventTypes:ce.scriptModule?.event_types||ce.scriptModule?.eventTypes||null}];for(let i of n)if(Zi(i.eventSource))return Bc(i.eventSource,i.eventTypes,i.source),i;return{source:"",eventSource:null,eventTypes:null}}async function Lc(){let t=ks();if(t.eventSource)return t;ce.loadingPromise||(ce.loadingPromise=(async()=>{try{let s=Ac;ce.scriptModule=await import(s)}catch(s){ce.importError=s,F("warn","\u52A0\u8F7D /script.js \u4E8B\u4EF6\u6865\u63A5\u5931\u8D25",s?.message||String(s))}finally{ce.loadingPromise=null}})()),await ce.loadingPromise;let e=ks();return e.eventSource?e:{source:"",eventSource:null,eventTypes:null}}function Un(){return ks().eventSource||ce.eventSource||null}function zn(){return ks().eventTypes||ce.eventTypes||M}function j(...t){(h.debugMode||Ne.getDebugSettings()?.enableDebugLog)&&console.log("[YouYouToolkit:Trigger]",...t)}function F(t="info",...e){(typeof console[t]=="function"?console[t]:console.log)("[youyou_trigger]",...e)}function _e(){let t=Ne.getListenerSettings?.()||Ne.getSettings?.()?.listener||{},e=parseInt(t?.debounceMs,10),s=parseInt(t?.messageSessionWindowMs,10),n=parseInt(t?.historyRetentionLimit,10);return{listenGenerationEnded:t?.listenGenerationEnded!==!1,ignoreQuietGeneration:t?.ignoreQuietGeneration!==!1,ignoreAutoTrigger:t?.ignoreAutoTrigger===!0,debounceMs:Number.isFinite(e)?Math.max(0,e):300,useMessageReceivedFallback:t?.useMessageReceivedFallback!==!1,useGenerationAfterCommandsFallback:t?.useGenerationAfterCommandsFallback!==!1,messageSessionWindowMs:Number.isFinite(s)?Math.max(300,s):1800,historyRetentionLimit:Number.isFinite(n)?Math.max(1,Math.min(50,n)):10}}function at(t,e=""){if(t&&typeof t=="object")return U(t?.messageId??t?.id??t?.message_id??t?.mes_id);if(e===M.GENERATION_ENDED){if(typeof t=="number"&&Number.isFinite(t))return String(t);if(typeof t=="string"&&/^\d+$/.test(t.trim()))return t.trim()}return Nc(e)?U(t):""}function Uc(t,e,s){let n=U(s);if(!n)return!1;let i=U(Bn(t,e));if(i&&i===n)return!0;let o=Number(n);return Number.isInteger(o)&&e===o}async function zc(t){let e=U(t);if(!e)return null;let s=await $s();for(let n=s.length-1;n>=0;n-=1){let i=s[n];if(Uc(i,n,e))return{message:i,index:n}}return null}async function Fc(t,e={}){let{retries:s=0,retryDelayMs:n=80}=e,i=null;for(let o=0;o<=s;o+=1){if(i=await zc(t),i)return i;o<s&&await Nn(n)}return null}function Kc(t,e,s){return U(s)?t===M.MESSAGE_RECEIVED||t===M.MESSAGE_UPDATED?!0:!!(e&&typeof e=="object"&&(e?.messageId!==void 0||e?.message_id!==void 0||e?.id!==void 0||e?.mes_id!==void 0)):!1}function zr(){let t=[h.gateState.lastUserSendIntentAt,h.gateState.lastUserMessageAt].filter(e=>Number(e)>0);return t.length>0?Math.max(...t):0}function Fr(t=Date.now()){let e=zr();return e>0&&t-e<=Br}function eo(t="",e=null){return String(t||e?.type||"").trim().toLowerCase()}function to(t){let e=String(t||"").trim().toLowerCase();return e?/re\s*-?\s*roll|reroll|重\s*roll/.test(e)?"reroll":/regenerat|\bregen\b|重新生成/.test(e)?"regenerate":/\bswipe\b|swipe[_-]?id/.test(e)?"swipe":/\bquiet\b/.test(e)?"quiet":"":""}function Kr(t="",e=null){let s=typeof t=="string"?t.trim():String(t||"").trim(),n=e??null,i=eo(t,e);if(e?.swipeId!==void 0||e?.swipe_id!==void 0||e?.swipe===!0||e?.isSwipe===!0)return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:i,generationAction:"swipe",generationActionSource:"params.swipe",explicitGenerationAction:"swipe"};let o=[{source:"type",value:s}];for(let a of Cc){let r=e?.[a];r==null||r===""||o.push({source:`params.${a}`,value:String(r)})}for(let a of o){let r=to(a.value);if(r)return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:i,generationAction:r,generationActionSource:a.source,explicitGenerationAction:Mr.has(r)?r:""}}return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:i,generationAction:i||"",generationActionSource:i?"normalized_generation_type":"",explicitGenerationAction:Mr.has(i)?i:""}}function ps(t=""){let e=String(t||"").trim();if(!e)return"";let s=0;for(let n=0;n<e.length;n+=1)s=(s<<5)-s+e.charCodeAt(n),s|=0;return Math.abs(s).toString(36)}function Hc(t,e=null,s=Date.now()){let n=zr(),i=Kr(t,e);return n>0&&s-n<=Br?{startedByUserIntent:!0,userIntentDetectedAt:n,userIntentSource:"recent_user_trigger_intent",userIntentDetail:"recent_user_send_or_message"}:i.explicitGenerationAction?{startedByUserIntent:!0,userIntentDetectedAt:s,userIntentSource:`explicit_generation_action:${i.explicitGenerationAction}`,userIntentDetail:`generation_action_${i.explicitGenerationAction}`}:{startedByUserIntent:!1,userIntentDetectedAt:n,userIntentSource:"none",userIntentDetail:"no_recent_user_intent_or_explicit_generation_action"}}function ht(t=Os()){let e=h.gateState.lastGenerationBaseline;return!e||t&&e.chatId&&e.chatId!==t?null:e}function so(t=Date.now()){return Fr(t)?!0:!!ht()?.startedByUserIntent}function kr(t=null){let e=t||ht();return e?(e?!!e.dryRun:!!h.gateState.lastGenerationDryRun)?{eligible:!1,baseline:e,reason:D.DRY_RUN_GENERATION,detail:"dry_run_generation"}:{eligible:!0,baseline:e,reason:"",detail:""}:{eligible:!1,baseline:null,reason:D.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"missing_generation_baseline"}}function no(t=Date.now()){return Number(h.gateState.uiTransitionGuardUntil)>t}function Dr(t=""){let e=Date.now();Rt({uiTransitionGuardUntil:e+Cr,lastUiTransitionAt:e,lastUiTransitionSource:t||""}),F("info","\u8FDB\u5165\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B",{source:t||"unknown",guardUntil:e+Cr})}function Pr(t=""){for(let e of E.pendingMessageTimers.values())clearTimeout(e);E.pendingMessageTimers.clear(),t&&F("info","\u5DF2\u6E05\u7406\u5F85\u6267\u884C\u81EA\u52A8\u89E6\u53D1\u5B9A\u65F6\u5668",{reason:t})}function Hr(t=[],e={}){let s=lt(),n=s?.getContext?.()||null,i=Qi(t),o=null;for(let a=i.length-1;a>=0;a-=1){let r=i[a];if(r.role==="assistant"&&Ln(r.content)){o=r;break}}return{traceId:e.traceId||ys("generation"),startedAt:Number(e.startedAt)||Date.now(),capturedAt:Date.now(),chatId:Ps(s,n,null),messageCount:i.length,lastAssistantIndex:o?.chatIndex??-1,lastAssistantMessageId:U(o?.sourceId),lastAssistantContentFingerprint:ps(o?.content||""),lastAssistantSwipeId:U(o?.swipeId),lastAssistantSwipeCount:Number.isFinite(o?.swipeCount)?Math.max(0,Number(o.swipeCount)):0,lastAssistantPreview:String(o?.content||"").slice(0,160),dryRun:!!e.dryRun,generationType:e.rawGenerationType||e.type||"",generationParams:e.rawGenerationParams||e.params||null,rawGenerationType:e.rawGenerationType||e.type||"",rawGenerationParams:e.rawGenerationParams||e.params||null,normalizedGenerationType:e.normalizedGenerationType||eo(e.type,e.params),generationAction:e.generationAction||"",generationActionSource:e.generationActionSource||"",explicitGenerationAction:e.explicitGenerationAction||"",startedByUserIntent:!!e.startedByUserIntent,userIntentDetectedAt:Number(e.userIntentDetectedAt)||0,userIntentSource:e.userIntentSource||"",userIntentDetail:e.userIntentDetail||"",baselineResolved:e.baselineResolved!==void 0?!!e.baselineResolved:!0,baselineResolutionAt:Number(e.baselineResolutionAt)||0,provisional:!!e.provisional,baselineSource:e.baselineSource||""}}async function jc(t={}){let e=await $s();return Hr(e,{...t,baselineResolved:t.baselineResolved!==void 0?t.baselineResolved:!0,baselineResolutionAt:Number(t.baselineResolutionAt)||Date.now(),provisional:t.provisional===!0,baselineSource:t.baselineSource||"captured_chat_snapshot"})}function Yc(t={}){return Hr(Oc(),{...t,baselineResolved:!1,baselineResolutionAt:0,provisional:!0,baselineSource:t.baselineSource||"provisional_immediate_snapshot"})}async function Ds(t={}){let{chatId:e=Os(),traceId:s="",retries:n=4,retryDelayMs:i=80}=t,o=null;for(let r=0;r<=n;r+=1){o=ht(e);let l=!s||!o?.traceId||o.traceId===s;if(o&&l&&o.baselineResolved!==!1)return o;r<n&&await Nn(i)}return o&&(!s||!o?.traceId||o.traceId===s)?o:null}function Wc(t=Date.now(),e=ht()){if(h.gateState.isGenerating)return!0;if(!e)return!1;let s=Number(h.gateState.lastGenerationAt)||0;return s<=0?!1:t-s<=Ic}function On(t=ht()){let e=[t?.explicitGenerationAction,t?.generationAction,h.gateState.lastGenerationAction];for(let s of e){let n=to(s)||String(s||"").trim().toLowerCase();if(Lr.has(n))return n}return""}function Wi(t=""){let e=to(t)||String(t||"").trim().toLowerCase();return Lr.has(e)}function Vc(t=null){let e=U(t?.lastAssistantMessageId);return e||(Number.isInteger(t?.lastAssistantIndex)&&t.lastAssistantIndex>=0?String(t.lastAssistantIndex):"")}function Vi(t="",e=null,s={}){let n=U(t);if(n)return{preferredMessageId:n,bindingSource:"event_message_id",forceSameSlotRevision:!0,forcedSameSlotSource:"message_id_bound_in_place"};if(s.allowBaselineAssistantSlot){let i=Vc(e);if(i)return{preferredMessageId:i,bindingSource:"baseline_assistant_slot",forceSameSlotRevision:!0,forcedSameSlotSource:"baseline_slot_in_place"}}return{preferredMessageId:"",bindingSource:"",forceSameSlotRevision:!1,forcedSameSlotSource:""}}function qc(t,e){if(!t||!e)return!1;let s=U(e.lastAssistantMessageId),n=U(t.sourceId),i=!!s&&!!n&&s===n,o=Number.isInteger(e.lastAssistantIndex)&&e.lastAssistantIndex>=0&&t.chatIndex===e.lastAssistantIndex;return i||!s&&o?!0:o}function Jc(t,e){let s=String(e?.lastAssistantContentFingerprint||"").trim(),n=ps(t?.content||""),i=U(e?.lastAssistantSwipeId),o=U(t?.swipeId),a=Number.isFinite(e?.lastAssistantSwipeCount)?Math.max(0,Number(e.lastAssistantSwipeCount)):0,r=Number.isFinite(t?.swipeCount)?Math.max(0,Number(t.swipeCount)):0,l=!!s&&!!n&&s!==n,c=!!i&&!!o&&i!==o,d=a>0&&r>0&&a!==r;return{baselineFingerprint:s,messageFingerprint:n,baselineSwipeId:i,currentSwipeId:o,baselineSwipeCount:a,currentSwipeCount:r,fingerprintChanged:l,swipeIdChanged:c,swipeCountChanged:d,observedRevision:l||c||d}}function Gr(t={},e="same_slot_revision"){let s=[];return t.fingerprintChanged&&s.push("content_fingerprint_changed"),t.swipeIdChanged&&s.push("swipe_id_changed"),t.swipeCountChanged&&s.push("swipe_count_changed"),s.length>0?s.join("+"):e}function qi(t,e,s={}){let{allowSameSlotRevision:n=!1,requireObservedSameSlotRevision:i=!0,forceSameSlotRevision:o=!1,forcedSameSlotSource:a=""}=s;if(!t||t.role!=="assistant"||!Ln(t.content))return{allowed:!1,confirmationMode:"none",reason:"invalid_assistant_message",sameSlotRevisionAction:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:"",confirmedAssistantContentFingerprint:"",baselineAssistantSwipeId:"",confirmedAssistantSwipeId:"",baselineAssistantSwipeCount:0,confirmedAssistantSwipeCount:0};if(!e)return{allowed:!0,confirmationMode:"no_baseline",reason:"",sameSlotRevisionAction:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:"",confirmedAssistantContentFingerprint:ps(t.content||""),baselineAssistantSwipeId:"",confirmedAssistantSwipeId:U(t.swipeId),baselineAssistantSwipeCount:0,confirmedAssistantSwipeCount:Number.isFinite(t?.swipeCount)?Math.max(0,Number(t.swipeCount)):0};if(Zc(t,e))return{allowed:!0,confirmationMode:"new_message",reason:"",sameSlotRevisionAction:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:String(e.lastAssistantContentFingerprint||"").trim(),confirmedAssistantContentFingerprint:ps(t.content||""),baselineAssistantSwipeId:U(e.lastAssistantSwipeId),confirmedAssistantSwipeId:U(t.swipeId),baselineAssistantSwipeCount:Number.isFinite(e.lastAssistantSwipeCount)?Math.max(0,Number(e.lastAssistantSwipeCount)):0,confirmedAssistantSwipeCount:Number.isFinite(t?.swipeCount)?Math.max(0,Number(t.swipeCount)):0};let r=On(e),l=o?r||"same_slot_in_place":r,c=qc(t,e),d=Jc(t,e);if(!n||!c||!o&&!l)return{allowed:!1,confirmationMode:"none",reason:c?"same_slot_revision_action_unavailable":"message_before_generation_baseline",sameSlotRevisionAction:l,sameSlotRevisionCandidate:c,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:d.observedRevision,baselineAssistantContentFingerprint:d.baselineFingerprint,confirmedAssistantContentFingerprint:d.messageFingerprint,baselineAssistantSwipeId:d.baselineSwipeId,confirmedAssistantSwipeId:d.currentSwipeId,baselineAssistantSwipeCount:d.baselineSwipeCount,confirmedAssistantSwipeCount:d.currentSwipeCount};if(!o&&i&&!d.observedRevision)return{allowed:!1,confirmationMode:"none",reason:"same_slot_revision_not_observed",sameSlotRevisionAction:l,sameSlotRevisionCandidate:!0,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",observedSameSlotRevision:!1,baselineAssistantContentFingerprint:d.baselineFingerprint,confirmedAssistantContentFingerprint:d.messageFingerprint,baselineAssistantSwipeId:d.baselineSwipeId,confirmedAssistantSwipeId:d.currentSwipeId,baselineAssistantSwipeCount:d.baselineSwipeCount,confirmedAssistantSwipeCount:d.currentSwipeCount};let u=o?Gr(d,a||"same_slot_in_place"):Gr(d,i?"same_slot_observed_revision":"same_slot_generation_confirmed");return{allowed:!0,confirmationMode:"same_slot_revision",reason:"",sameSlotRevisionAction:l,sameSlotRevisionCandidate:!0,sameSlotRevisionConfirmed:!0,sameSlotRevisionSource:u,observedSameSlotRevision:d.observedRevision,baselineAssistantContentFingerprint:d.baselineFingerprint,confirmedAssistantContentFingerprint:d.messageFingerprint,baselineAssistantSwipeId:d.baselineSwipeId,confirmedAssistantSwipeId:d.currentSwipeId,baselineAssistantSwipeCount:d.baselineSwipeCount,confirmedAssistantSwipeCount:d.currentSwipeCount}}function Xc(t){return t?.message?{role:Fn(t.message),content:$n(t.message),chatIndex:t.index,sourceId:U(Bn(t.message,t.index)),swipeId:U(t.message?.swipe_id??t.message?.swipeId??t.message?.swipeID),swipeCount:Array.isArray(t.message?.swipes)&&t.message.swipes.length>0?t.message.swipes.length:1}:null}async function Qc(t,e={}){let s=Date.now(),n=e?.traceId||h.gateState.lastGenerationTraceId||"",i=Xc(t),o=U(e?.messageId||i?.sourceId),a=await Ds({traceId:n,retries:4,retryDelayMs:80})||ht(),r=Wc(s,a),l=qi(i,a,{allowSameSlotRevision:!0,requireObservedSameSlotRevision:!o,forceSameSlotRevision:!!o,forcedSameSlotSource:o?"message_id_bound_in_place":""}),c=!!(i&&a&&l.allowed),d=!n||!a?.traceId||a.traceId===n;if(!i)return{allowed:!1,baseline:a,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",reason:D.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"message_received_identity_not_resolved",confirmationMode:"none",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:""};if(!a)return{allowed:!1,baseline:null,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_without_generation_baseline",reason:D.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,detail:"message_received_without_generation_baseline",confirmationMode:"none",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:""};if(a.baselineResolved===!1)return{allowed:!1,baseline:a,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",reason:D.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"generation_baseline_pending_resolution",confirmationMode:"none",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:""};if(!d)return{allowed:!1,baseline:a,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_trace_mismatch",reason:D.HISTORICAL_REPLAY_MESSAGE_RECEIVED,detail:"message_received_trace_mismatch",confirmationMode:"none",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:""};if(!h.gateState.isGenerating&&!r)return{allowed:!1,baseline:a,eventBelongsToCurrentGeneration:c,historicalReplayBlocked:!0,historicalReplayReason:"message_received_outside_active_generation",reason:D.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,detail:"message_received_outside_active_generation",confirmationMode:"none",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:""};if(!l.allowed){let u=l.sameSlotRevisionCandidate&&l.reason==="same_slot_revision_not_observed";return{allowed:!1,baseline:a,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!u,historicalReplayReason:u?"":l.sameSlotRevisionCandidate?"message_received_same_slot_without_confirmed_revision":"message_received_before_generation_baseline",reason:u?D.NO_CONFIRMED_ASSISTANT_MESSAGE:D.HISTORICAL_REPLAY_MESSAGE_RECEIVED,detail:u?"same_slot_revision_not_observed_yet":l.sameSlotRevisionCandidate?"message_received_same_slot_without_confirmed_revision":"message_received_before_generation_baseline",confirmationMode:l.confirmationMode,sameSlotRevisionCandidate:l.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:l.sameSlotRevisionSource,sameSlotRevisionAction:l.sameSlotRevisionAction,baselineAssistantContentFingerprint:l.baselineAssistantContentFingerprint,confirmedAssistantContentFingerprint:l.confirmedAssistantContentFingerprint,baselineAssistantSwipeId:l.baselineAssistantSwipeId,confirmedAssistantSwipeId:l.confirmedAssistantSwipeId,baselineAssistantSwipeCount:l.baselineAssistantSwipeCount,confirmedAssistantSwipeCount:l.confirmedAssistantSwipeCount}}return{allowed:!0,baseline:a,eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:"",reason:"",detail:"",messageEntry:i,confirmationMode:l.confirmationMode,sameSlotRevisionCandidate:l.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:l.sameSlotRevisionConfirmed,sameSlotRevisionSource:l.sameSlotRevisionSource,sameSlotRevisionAction:l.sameSlotRevisionAction,baselineAssistantContentFingerprint:l.baselineAssistantContentFingerprint,confirmedAssistantContentFingerprint:l.confirmedAssistantContentFingerprint,baselineAssistantSwipeId:l.baselineAssistantSwipeId,confirmedAssistantSwipeId:l.confirmedAssistantSwipeId,baselineAssistantSwipeCount:l.baselineAssistantSwipeCount,confirmedAssistantSwipeCount:l.confirmedAssistantSwipeCount}}function Zc(t,e){if(!t||t.role!=="assistant"||!Ln(t.content))return!1;if(!e)return!0;if(Number.isInteger(e.lastAssistantIndex)&&e.lastAssistantIndex>=0)return t.chatIndex>e.lastAssistantIndex;let s=Number.isFinite(e.messageCount)?e.messageCount:0;return t.chatIndex>=s}async function ed(t="",e={}){let{allowSameSlotRevision:s=!1,requireObservedSameSlotRevision:n=!0,forceSameSlotRevision:i=!1,forcedSameSlotSource:o=""}=e,a=U(t),r=lt(),l=r?.getContext?.()||null,c=Ps(r,l,null),d=await $s(),u=Qi(d),y=h.gateState.lastGenerationBaseline?.chatId===c?h.gateState.lastGenerationBaseline:null;if(a){let p=u.find(b=>U(b.sourceId)===a||String(b.chatIndex)===a);if(!p)return null;let S=qi(p,y,{allowSameSlotRevision:s,requireObservedSameSlotRevision:n,forceSameSlotRevision:s&&(i||!!a),forcedSameSlotSource:o||(a?"message_id_bound_in_place":"")});return S.allowed?{...p,confirmationMode:S.confirmationMode,sameSlotRevisionCandidate:S.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:S.sameSlotRevisionConfirmed,sameSlotRevisionSource:S.sameSlotRevisionSource,sameSlotRevisionAction:S.sameSlotRevisionAction,baselineAssistantContentFingerprint:S.baselineAssistantContentFingerprint,confirmedAssistantContentFingerprint:S.confirmedAssistantContentFingerprint,baselineAssistantSwipeId:S.baselineAssistantSwipeId,confirmedAssistantSwipeId:S.confirmedAssistantSwipeId,baselineAssistantSwipeCount:S.baselineAssistantSwipeCount,confirmedAssistantSwipeCount:S.confirmedAssistantSwipeCount}:null}if(!y)return null;for(let p=u.length-1;p>=0;p-=1){let S=u[p],b=qi(S,y,{allowSameSlotRevision:s,requireObservedSameSlotRevision:n});if(b.allowed)return{...S,confirmationMode:b.confirmationMode,sameSlotRevisionCandidate:b.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:b.sameSlotRevisionConfirmed,sameSlotRevisionSource:b.sameSlotRevisionSource,sameSlotRevisionAction:b.sameSlotRevisionAction,baselineAssistantContentFingerprint:b.baselineAssistantContentFingerprint,confirmedAssistantContentFingerprint:b.confirmedAssistantContentFingerprint,baselineAssistantSwipeId:b.baselineAssistantSwipeId,confirmedAssistantSwipeId:b.confirmedAssistantSwipeId,baselineAssistantSwipeCount:b.baselineAssistantSwipeCount,confirmedAssistantSwipeCount:b.confirmedAssistantSwipeCount}}return null}async function Pn(t="",e={}){let{retries:s=0,retryDelayMs:n=250,allowSameSlotRevision:i=!1,requireObservedSameSlotRevision:o=!0,forceSameSlotRevision:a=!1,forcedSameSlotSource:r=""}=e,l=null;for(let c=0;c<=s;c+=1){if(l=await ed(t,{allowSameSlotRevision:i,requireObservedSameSlotRevision:o,forceSameSlotRevision:a,forcedSameSlotSource:r}),l)return l;c<s&&await Nn(n)}return null}function Ct(){let t=h.gateState.lastGenerationBaseline;return{baselineResolved:t?.baselineResolved??!1,baselineResolutionAt:t?.baselineResolutionAt||0,provisionalBaseline:!!t?.provisional,generationStartedByUserIntent:!!t?.startedByUserIntent,generationUserIntentSource:t?.userIntentSource||"",generationUserIntentDetail:t?.userIntentDetail||"",rawGenerationType:t?.rawGenerationType||h.gateState.lastGenerationType||"",rawGenerationParams:t?.rawGenerationParams??h.gateState.lastGenerationParams??null,normalizedGenerationType:t?.normalizedGenerationType||h.gateState.lastNormalizedGenerationType||"",generationAction:t?.generationAction||h.gateState.lastGenerationAction||"",generationActionSource:t?.generationActionSource||h.gateState.lastGenerationActionSource||"",explicitGenerationAction:t?.explicitGenerationAction||"",baselineAssistantContentFingerprint:t?.lastAssistantContentFingerprint||"",baselineAssistantSwipeId:U(t?.lastAssistantSwipeId),baselineAssistantSwipeCount:Number.isFinite(t?.lastAssistantSwipeCount)?Math.max(0,Number(t.lastAssistantSwipeCount)):0,lastUserIntentSource:h.gateState.lastUserIntentSource||""}}function td(){let t=h.gateState.lastGenerationBaseline;return{sessionGenerationTraceId:h.gateState.lastGenerationTraceId||"",sessionGenerationStartedAt:t?.startedAt||0,sessionBaselineResolvedAtCreation:t?.baselineResolved??!1,sessionBaselineResolutionAtCreation:t?.baselineResolutionAt||0,sessionProvisionalBaselineAtCreation:!!t?.provisional,sessionGenerationStartedByUserIntent:!!t?.startedByUserIntent,sessionGenerationUserIntentSource:t?.userIntentSource||"",sessionGenerationUserIntentDetail:t?.userIntentDetail||"",sessionGenerationActionAtCreation:t?.generationAction||h.gateState.lastGenerationAction||"",sessionGenerationActionSourceAtCreation:t?.generationActionSource||h.gateState.lastGenerationActionSource||"",sessionExplicitGenerationActionAtCreation:t?.explicitGenerationAction||"",sessionNormalizedGenerationTypeAtCreation:t?.normalizedGenerationType||h.gateState.lastNormalizedGenerationType||"",sessionRawGenerationTypeAtCreation:t?.rawGenerationType||h.gateState.lastGenerationType||"",sessionLastUserIntentSourceAtCreation:h.gateState.lastUserIntentSource||"",sessionGenerationCapturedAt:Date.now()}}async function sd(){return Cn||(Cn=Promise.resolve().then(()=>(Rn(),In)).catch(t=>{throw Cn=null,t})),Cn}function nd(t={}){let e=Ct();return{stage:"",eventType:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",executionKey:"",messageRole:"",reason:"",skipReasonDetailed:"",confirmedAssistantMessageId:"",confirmationMode:"",generationMessageBindingSource:"",confirmedAssistantSwipeId:"",effectiveSwipeId:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",scheduledDelayMs:0,candidateToolIds:[],receivedAt:Date.now(),handledAt:0,generationTraceId:h.gateState.lastGenerationTraceId||"",generationDryRun:!!h.gateState.lastGenerationDryRun,generationStartedAt:h.gateState.lastGenerationBaseline?.startedAt||0,uiTransitionGuardActive:no(),uiTransitionGuardUntil:h.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:h.gateState.lastUiTransitionSource||"",baselineMessageCount:h.gateState.lastGenerationBaseline?.messageCount||0,baselineAssistantId:h.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",generationBaselineMessageCount:h.gateState.lastGenerationBaseline?.messageCount||0,generationBaselineAssistantId:h.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",confirmationSource:"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",registeredEvents:Array.from(E.listeners.keys()),listenerSettings:_e(),hasRecentUserTriggerIntent:Fr(),hasConfirmedUserTriggerIntent:so(),...e,...t}}function Ee(t={}){let e=nd(t);return E.lastEventDebugSnapshot=e,j("\u81EA\u52A8\u89E6\u53D1\u4E8B\u4EF6\u5FEB\u7167:",e),e}function id(){let t=_e();return t.listenGenerationEnded===!1?{skip:!0,reason:D.LISTENER_DISABLED,listenerSettings:t}:t.ignoreAutoTrigger&&!so()?{skip:!0,reason:D.IGNORED_AUTO_TRIGGER,listenerSettings:t}:{skip:!1,reason:"",listenerSettings:t}}function od(t={}){let e=Ct();return{triggerEvent:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",executionKey:"",confirmationMode:"",generationMessageBindingSource:"",confirmedAssistantSwipeId:"",effectiveSwipeId:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",selectedToolIds:[],skipReason:"",skipReasonDetailed:"",lockedAiMessageId:"",confirmedAssistantMessageId:"",confirmationSource:"",eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",generationTraceId:h.gateState.lastGenerationTraceId||"",...e,triggeredAt:Date.now(),...t}}function It(t={}){let e=od(t);return E.lastAutoTriggerSnapshot=e,j("\u81EA\u52A8\u89E6\u53D1\u5FEB\u7167:",e),e}function cs(t,e){(Array.isArray(t)?t:[]).forEach(n=>{n?.id&&ns(n.id,{lastTriggerAt:Date.now(),lastExecutionKey:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0,...e},{touchLastRunAt:!1,emitEvent:!1})})}function Ps(t,e,s){let i=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(o=>typeof o=="string"&&o.trim());return i||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function rt(t,e,s={}){if(!t||typeof e!="function")return j("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),F("warn","\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25\uFF1A\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u65E0\u6548",{eventType:t}),()=>{};let{once:n=!1,priority:i=0}=s,o=Un(),r=zn()[t]||t,l=async(...c)=>{try{if(F("info","\u6536\u5230\u4E8B\u4EF6",t,c[0]??null),s.gateCheck&&!await io(s.gateCheck)){j(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`),F("warn","\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6",t);return}await e(...c),n&&Ji(t,l)}catch(d){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",d)}};if(h.listeners.has(t)||h.listeners.set(t,new Set),h.listeners.get(t).add(l),o&&typeof o.on=="function")o.on(r,l),j(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),F("info","\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u6E90\u76D1\u542C",{eventType:t,stEventType:r});else if(o&&typeof o.addEventListener=="function")o.addEventListener(r,l),j(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),F("info","\u5DF2\u6CE8\u518C addEventListener \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:r});else{let c=Yt();c.addEventListener&&(c.addEventListener(r,l),j(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),F("warn","\u4E8B\u4EF6\u6E90\u4E0D\u53EF\u7528\uFF0C\u56DE\u9000\u4E3A DOM \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:r}))}return()=>Ji(t,l)}function Ji(t,e){let s=h.listeners.get(t);if(s&&s.has(e)){s.delete(e);let n=Un(),o=zn()[t]||t;if(Ur(n,o,e))j(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let a=Yt();a.removeEventListener&&a.removeEventListener(o,e)}}}function rd(){let t=Un(),e=zn();for(let[s,n]of h.listeners){let i=e[s]||s;for(let o of n)if(!Ur(t,i,o)){let a=Yt();a.removeEventListener&&a.removeEventListener(i,o)}}h.listeners.clear(),j("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function io(t){if(!t)return!0;let e=Date.now(),s=h.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return j("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return j("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return j("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return j("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return j("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(n){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",n),!1}return!0}function Rt(t){Object.assign(h.gateState,t)}function ad(){h.gateState={lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastNormalizedGenerationType:"",lastGenerationAction:"",lastGenerationActionSource:"",lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""}}async function oo(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:n=!0,includeSystem:i=!1,format:o="messages"}=t;if(!lt())return j("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let r=await $s(),l=[],c=Math.max(0,r.length-e);for(let d=c;d<r.length;d++){let u=r[d];if(!u)continue;let y=Fn(u);if(!(y==="user"&&!s)&&!(y==="system"&&!i)&&!(y==="assistant"&&!n))if(o==="messages"){let p=$n(u);l.push({role:y,content:p,name:u.name||"",timestamp:u.send_date||u.timestamp,isSystem:!!u.is_system,isUser:!!u.is_user})}else l.push($n(u))}return{messages:l,totalMessages:r.length,startIndex:c,endIndex:r.length-1}}catch(r){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",r),null}}function Fn(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function $s(){let t=$c(),e=lt();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let n=e?.getContext?.()||null,i=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(e?.chat)?e.chat:[];s=(i.length?i:o).length-1}if(Number.isFinite(s)&&s>=0){let n=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(n)&&n.length>0)return n}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function ro(){let t=lt();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let n=s[e];return{id:e,name:n.name||"",description:n.description||"",personality:n.personality||"",scenario:n.scenario||"",firstMes:n.first_mes||"",mesExample:n.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function jr(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,n=lt();if(!n)return"";try{let o=(n.lorebook||[]).entries||[],a=[],r=0;for(let l of o){if(e&&!l.enabled)continue;let c=l.content||"";c&&r+c.length<=s&&(a.push(c),r+=c.length)}return a.join(`

`)}catch(i){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",i),""}}async function ld(t={}){let[e,s,n]=await Promise.all([oo(t.chat||{}),ro(),jr(t.worldbook||{})]);return{chat:e,character:s,worldbook:n,timestamp:Date.now()}}function cd(t,e){if(!t||!e)return j("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:n,gateCondition:i,priority:o=0}=e;if(!s||typeof n!="function")return j("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};h.handlers.set(t,{eventType:s,handler:n,gateCondition:i,priority:o,enabled:!0});let a=rt(s,async(...r)=>{let l=h.handlers.get(t);!l||!l.enabled||l.gateCondition&&!await io(l.gateCondition)||await l.handler(...r)},{priority:o});return j(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{a(),h.handlers.delete(t),j(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function dd(t,e){let s=h.handlers.get(t);s&&(s.enabled=e,j(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function ud(){h.handlers.clear(),j("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function ys(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Gs(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Os(){let t=lt(),e=t?.getContext?.()||null;return Ps(t,e,null)}function ao(t,e,s="",n=""){let i=t||Os(),o=U(e),a=String(n||h.gateState.lastGenerationTraceId||"").trim();return`${i}::${o||`event:${s||"unknown"}:latest`}::${a||"trace:unknown"}`}function Yr(t={}){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId),n=String(t?.generationTraceId||t?.generation?.traceId||h.gateState.lastGenerationTraceId||"").trim()||"trace:unknown",i=String(t?.assistantContentFingerprint||ps(t?.lastAiMessage||t?.input?.lastAiMessage||"")||"").trim()||"content:na",o=U(t?.effectiveSwipeId||t?.confirmedAssistantSwipeId||t?.lastAiMessageSwipeId)||"swipe:current";return`${e}::${s}::${n}::${o}::${i}`}function pd(t,e,s={}){let n=U(s?.messageId||at(e,t)),i=s?.chatId||Os(),o=String(s?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),a=s?.sessionKey||ao(i,n,t,o),r=Date.now(),l=Ct(),c=td();return{sessionKey:a,traceId:s?.traceId||ys("session"),chatId:i,messageId:n,messageKey:s?.messageKey||"",executionKey:s?.executionKey||"",messageRole:s?.messageRole||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:!!s?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!s?.sameSlotRevisionConfirmed,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",isSpeculativeSession:!!s?.isSpeculativeSession,eventBelongsToCurrentGeneration:!!s?.eventBelongsToCurrentGeneration,historicalReplayBlocked:!!s?.historicalReplayBlocked,historicalReplayReason:s?.historicalReplayReason||"",skipReasonDetailed:s?.skipReasonDetailed||"",firstEventType:s?.eventType||t||"",receivedEvents:t?[t]:[],phase:s?.phase||H.RECEIVED,skipReason:s?.skipReason||"",scheduledAt:0,handledAt:0,completedAt:0,candidateToolIds:Array.isArray(s?.candidateToolIds)?[...s.candidateToolIds]:[],executionPathIds:Array.isArray(s?.executionPathIds)?[...s.executionPathIds]:[],sourceMessageLocked:!!n,baselineResolved:s?.baselineResolved??l.baselineResolved,baselineResolutionAt:s?.baselineResolutionAt??l.baselineResolutionAt,provisionalBaseline:s?.provisionalBaseline??l.provisionalBaseline,generationStartedByUserIntent:s?.generationStartedByUserIntent??l.generationStartedByUserIntent,generationUserIntentSource:s?.generationUserIntentSource||l.generationUserIntentSource,generationUserIntentDetail:s?.generationUserIntentDetail||l.generationUserIntentDetail,generationAction:s?.generationAction||l.generationAction,generationActionSource:s?.generationActionSource||l.generationActionSource,explicitGenerationAction:s?.explicitGenerationAction||l.explicitGenerationAction,lastUserIntentSource:s?.lastUserIntentSource||l.lastUserIntentSource,sessionGenerationTraceId:s?.sessionGenerationTraceId||c.sessionGenerationTraceId,sessionGenerationStartedAt:s?.sessionGenerationStartedAt??c.sessionGenerationStartedAt,sessionBaselineResolvedAtCreation:s?.sessionBaselineResolvedAtCreation??c.sessionBaselineResolvedAtCreation,sessionBaselineResolutionAtCreation:s?.sessionBaselineResolutionAtCreation??c.sessionBaselineResolutionAtCreation,sessionProvisionalBaselineAtCreation:s?.sessionProvisionalBaselineAtCreation??c.sessionProvisionalBaselineAtCreation,sessionGenerationStartedByUserIntent:s?.sessionGenerationStartedByUserIntent??c.sessionGenerationStartedByUserIntent,sessionGenerationUserIntentSource:s?.sessionGenerationUserIntentSource||c.sessionGenerationUserIntentSource,sessionGenerationUserIntentDetail:s?.sessionGenerationUserIntentDetail||c.sessionGenerationUserIntentDetail,sessionGenerationActionAtCreation:s?.sessionGenerationActionAtCreation||c.sessionGenerationActionAtCreation,sessionGenerationActionSourceAtCreation:s?.sessionGenerationActionSourceAtCreation||c.sessionGenerationActionSourceAtCreation,sessionExplicitGenerationActionAtCreation:s?.sessionExplicitGenerationActionAtCreation||c.sessionExplicitGenerationActionAtCreation,sessionNormalizedGenerationTypeAtCreation:s?.sessionNormalizedGenerationTypeAtCreation||c.sessionNormalizedGenerationTypeAtCreation,sessionRawGenerationTypeAtCreation:s?.sessionRawGenerationTypeAtCreation||c.sessionRawGenerationTypeAtCreation,sessionLastUserIntentSourceAtCreation:s?.sessionLastUserIntentSourceAtCreation||c.sessionLastUserIntentSourceAtCreation,sessionGenerationCapturedAt:s?.sessionGenerationCapturedAt??c.sessionGenerationCapturedAt,createdAt:r,updatedAt:r}}function yd(t=Date.now()){let{messageSessionWindowMs:e}=_e();for(let[s,n]of E.messageSessions.entries()){let i=n?.completedAt||n?.handledAt||n?.updatedAt||n?.createdAt||0;i>0&&t-i>e&&E.messageSessions.delete(s)}}function us(t,e,s={}){yd();let n=U(s?.messageId||at(e,t)),i=s?.chatId||Os(),o=String(s?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),a=s?.sessionKey||ao(i,n,t,o),r=E.messageSessions.get(a);return r?(t&&!r.receivedEvents.includes(t)&&r.receivedEvents.push(t),n&&!r.messageId&&(r.messageId=n,r.sourceMessageLocked=!0),s?.messageRole&&(r.messageRole=s.messageRole),s?.executionKey&&(r.executionKey=s.executionKey),s?.confirmedAssistantMessageId&&(r.confirmedAssistantMessageId=s.confirmedAssistantMessageId),s?.confirmationSource&&(r.confirmationSource=s.confirmationSource),s?.confirmationMode&&(r.confirmationMode=s.confirmationMode),s?.sameSlotRevisionCandidate!==void 0&&(r.sameSlotRevisionCandidate=!!s.sameSlotRevisionCandidate),s?.sameSlotRevisionConfirmed!==void 0&&(r.sameSlotRevisionConfirmed=!!s.sameSlotRevisionConfirmed),s?.sameSlotRevisionSource&&(r.sameSlotRevisionSource=s.sameSlotRevisionSource),s?.skipReasonDetailed&&(r.skipReasonDetailed=s.skipReasonDetailed),s?.eventBelongsToCurrentGeneration!==void 0&&(r.eventBelongsToCurrentGeneration=!!s.eventBelongsToCurrentGeneration),s?.historicalReplayBlocked!==void 0&&(r.historicalReplayBlocked=!!s.historicalReplayBlocked),s?.historicalReplayReason&&(r.historicalReplayReason=s.historicalReplayReason),s?.isSpeculativeSession!==void 0&&(r.isSpeculativeSession=!!s.isSpeculativeSession),s?.candidateToolIds&&(r.candidateToolIds=[...s.candidateToolIds]),be(r,{})):(r=pd(t,e,{...s,chatId:i,generationTraceId:o,sessionKey:a,messageId:n}),E.messageSessions.set(a,r),r)}function be(t,e={}){if(!t)return null;let s=Ct();return Object.assign(t,s,e,{updatedAt:Date.now()}),t}function gd(t,e){return!t||!e||t.sessionKey===e||(E.messageSessions.delete(t.sessionKey),t.sessionKey=e,t.updatedAt=Date.now(),E.messageSessions.set(e,t)),t}function me(t,e={}){if(!t)return null;let{historyRetentionLimit:s}=_e(),n=Ct(),i={id:e?.id||ys("session_hist"),at:e?.at||Date.now(),traceId:t.traceId,sessionKey:t.sessionKey,phase:e?.phase||t.phase,eventType:e?.eventType||t.firstEventType,messageId:e?.messageId||t.messageId,messageKey:e?.messageKey||t.messageKey,executionKey:e?.executionKey||t.executionKey||"",messageRole:e?.messageRole||t.messageRole,confirmedAssistantMessageId:e?.confirmedAssistantMessageId||t.confirmedAssistantMessageId||"",confirmationSource:e?.confirmationSource||t.confirmationSource||"",confirmationMode:e?.confirmationMode||t.confirmationMode||"",sameSlotRevisionCandidate:e?.sameSlotRevisionCandidate??t.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:e?.sameSlotRevisionConfirmed??t.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:e?.sameSlotRevisionSource||t.sameSlotRevisionSource||"",isSpeculativeSession:e?.isSpeculativeSession??t.isSpeculativeSession??!1,eventBelongsToCurrentGeneration:e?.eventBelongsToCurrentGeneration??t.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:e?.historicalReplayBlocked??t.historicalReplayBlocked??!1,historicalReplayReason:e?.historicalReplayReason||t.historicalReplayReason||"",generationTraceId:e?.generationTraceId||h.gateState.lastGenerationTraceId||"",generationStartedAt:e?.generationStartedAt||h.gateState.lastGenerationBaseline?.startedAt||0,generationDryRun:e?.generationDryRun??!!h.gateState.lastGenerationDryRun,baselineResolved:e?.baselineResolved??t.baselineResolved??n.baselineResolved,baselineResolutionAt:e?.baselineResolutionAt??t.baselineResolutionAt??n.baselineResolutionAt,provisionalBaseline:e?.provisionalBaseline??t.provisionalBaseline??n.provisionalBaseline,generationStartedByUserIntent:e?.generationStartedByUserIntent??t.generationStartedByUserIntent??n.generationStartedByUserIntent,generationUserIntentSource:e?.generationUserIntentSource||t.generationUserIntentSource||n.generationUserIntentSource,generationUserIntentDetail:e?.generationUserIntentDetail||t.generationUserIntentDetail||n.generationUserIntentDetail,generationAction:e?.generationAction||t.generationAction||n.generationAction,generationActionSource:e?.generationActionSource||t.generationActionSource||n.generationActionSource,explicitGenerationAction:e?.explicitGenerationAction||t.explicitGenerationAction||n.explicitGenerationAction,lastUserIntentSource:e?.lastUserIntentSource||t.lastUserIntentSource||n.lastUserIntentSource,sessionGenerationTraceId:e?.sessionGenerationTraceId||t.sessionGenerationTraceId||"",sessionGenerationStartedAt:e?.sessionGenerationStartedAt??t.sessionGenerationStartedAt??0,sessionBaselineResolvedAtCreation:e?.sessionBaselineResolvedAtCreation??t.sessionBaselineResolvedAtCreation??!1,sessionBaselineResolutionAtCreation:e?.sessionBaselineResolutionAtCreation??t.sessionBaselineResolutionAtCreation??0,sessionProvisionalBaselineAtCreation:e?.sessionProvisionalBaselineAtCreation??t.sessionProvisionalBaselineAtCreation??!1,sessionGenerationStartedByUserIntent:e?.sessionGenerationStartedByUserIntent??t.sessionGenerationStartedByUserIntent??!1,sessionGenerationUserIntentSource:e?.sessionGenerationUserIntentSource||t.sessionGenerationUserIntentSource||"",sessionGenerationUserIntentDetail:e?.sessionGenerationUserIntentDetail||t.sessionGenerationUserIntentDetail||"",sessionGenerationActionAtCreation:e?.sessionGenerationActionAtCreation||t.sessionGenerationActionAtCreation||"",sessionGenerationActionSourceAtCreation:e?.sessionGenerationActionSourceAtCreation||t.sessionGenerationActionSourceAtCreation||"",sessionExplicitGenerationActionAtCreation:e?.sessionExplicitGenerationActionAtCreation||t.sessionExplicitGenerationActionAtCreation||"",sessionNormalizedGenerationTypeAtCreation:e?.sessionNormalizedGenerationTypeAtCreation||t.sessionNormalizedGenerationTypeAtCreation||"",sessionRawGenerationTypeAtCreation:e?.sessionRawGenerationTypeAtCreation||t.sessionRawGenerationTypeAtCreation||"",sessionLastUserIntentSourceAtCreation:e?.sessionLastUserIntentSourceAtCreation||t.sessionLastUserIntentSourceAtCreation||"",sessionGenerationCapturedAt:e?.sessionGenerationCapturedAt??t.sessionGenerationCapturedAt??Date.now(),skipReason:e?.skipReason||t.skipReason||"",skipReasonDetailed:e?.skipReasonDetailed||t.skipReasonDetailed||"",candidateToolIds:Array.isArray(e?.candidateToolIds)?[...e.candidateToolIds]:[...t.candidateToolIds||[]],executionPathIds:Array.isArray(e?.executionPathIds)?[...e.executionPathIds]:[...t.executionPathIds||[]]};return E.recentSessionHistory=Gs([...E.recentSessionHistory,i],s),i}function Kt(t,e={}){let s=Array.isArray(t)?t:[],{historyRetentionLimit:n}=_e();s.forEach(i=>{i?.id&&ws(i.id,"trigger",e,{limit:n,emitEvent:!1})})}function fd(t,e={}){if(!t)return;let{historyRetentionLimit:s}=_e();ws(t,"writeback",e,{limit:s,emitEvent:!1})}function ds(t){if(!t||typeof t!="object")return t;let e=Wr(t);return{...t,...e,receivedEvents:Array.isArray(t.receivedEvents)?[...t.receivedEvents]:void 0,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:void 0,executionPathIds:Array.isArray(t.executionPathIds)?[...t.executionPathIds]:void 0,driftReasons:Array.isArray(e.driftReasons)?[...e.driftReasons]:[]}}function Ce(t){return String(t||"").trim()}function Wr(t){if(!t||typeof t!="object")return{driftDetected:!1,generationTraceDrifted:!1,generationActionDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};if(!(t.sessionGenerationCapturedAt!==void 0||t.sessionGenerationTraceId!==void 0||t.sessionBaselineResolvedAtCreation!==void 0||t.sessionGenerationStartedByUserIntent!==void 0||t.sessionGenerationUserIntentSource!==void 0||t.sessionGenerationUserIntentDetail!==void 0))return{driftDetected:!1,generationTraceDrifted:!1,generationActionDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};let s=Ce(t.sessionGenerationTraceId),n=Ce(t.generationTraceId),i=Ce(t.sessionGenerationUserIntentSource),o=Ce(t.generationUserIntentSource),a=Ce(t.sessionGenerationUserIntentDetail),r=Ce(t.generationUserIntentDetail),l=Ce(t.sessionGenerationActionAtCreation),c=Ce(t.generationAction),d=Ce(t.sessionGenerationActionSourceAtCreation),u=Ce(t.generationActionSource),y=Ce(t.sessionExplicitGenerationActionAtCreation),p=Ce(t.explicitGenerationAction),S=Ce(t.sessionNormalizedGenerationTypeAtCreation),b=Ce(t.normalizedGenerationType),P=!!s&&!!n&&s!==n,$=(l||c?l!==c:!1)||(d||u?d!==u:!1)||(y||p?y!==p:!1)||(S||b?S!==b:!1),W=!!t.sessionGenerationStartedByUserIntent!=!!t.generationStartedByUserIntent||(i||o?i!==o:!1)||(a||r?a!==r:!1),I=!!t.sessionBaselineResolvedAtCreation!=!!t.baselineResolved,T=(Number(t.baselineResolutionAt)||0)>(Number(t.sessionBaselineResolutionAtCreation)||0),m=[];return P&&m.push("generation_trace_changed"),$&&m.push("generation_action_changed"),W&&m.push("generation_user_intent_changed"),I&&m.push("baseline_resolved_state_changed"),T&&m.push("baseline_resolution_advanced"),{driftDetected:m.length>0,generationTraceDrifted:P,generationActionDrifted:$,generationUserIntentDrifted:W,baselineResolvedStateChanged:I,baselineResolutionAdvancedSinceSessionCreation:T,driftReasons:m}}function $r(t=[]){return(Array.isArray(t)?t:[]).reduce((e,s)=>{let n=Ce(s?.phase)||"unknown";return e[n]=(e[n]||0)+1,e},{})}function Or(t=[]){let e={entryCount:0,driftDetectedCount:0,generationTraceDriftCount:0,generationActionDriftCount:0,generationUserIntentDriftCount:0,baselineResolvedStateChangedCount:0,baselineResolutionAdvancedCount:0};for(let s of Array.isArray(t)?t:[]){let n=Wr(s);e.entryCount+=1,n.driftDetected&&(e.driftDetectedCount+=1),n.generationTraceDrifted&&(e.generationTraceDriftCount+=1),n.generationActionDrifted&&(e.generationActionDriftCount+=1),n.generationUserIntentDrifted&&(e.generationUserIntentDriftCount+=1),n.baselineResolvedStateChanged&&(e.baselineResolvedStateChangedCount+=1),n.baselineResolutionAdvancedSinceSessionCreation&&(e.baselineResolutionAdvancedCount+=1)}return e}function Vr(){let t=ks(),e=t.eventSource||ce.eventSource||null;return{source:t.source||ce.source||"",ready:Zi(e),hasImportedScriptModule:!!ce.scriptModule,importError:ce.importError?.message||""}}function qr(){let t=h.gateState.lastGenerationBaseline;return{lastUserSendIntentAt:h.gateState.lastUserSendIntentAt||0,lastUserIntentSource:h.gateState.lastUserIntentSource||"",lastUserMessageId:U(h.gateState.lastUserMessageId),lastUserMessageAt:h.gateState.lastUserMessageAt||0,lastGenerationTraceId:h.gateState.lastGenerationTraceId||"",lastGenerationType:h.gateState.lastGenerationType||"",lastGenerationDryRun:!!h.gateState.lastGenerationDryRun,lastGenerationAt:h.gateState.lastGenerationAt||0,isGenerating:!!h.gateState.isGenerating,uiTransitionGuardUntil:h.gateState.uiTransitionGuardUntil||0,lastUiTransitionAt:h.gateState.lastUiTransitionAt||0,lastUiTransitionSource:h.gateState.lastUiTransitionSource||"",baselineMessageCount:t?.messageCount||0,baselineAssistantId:t?.lastAssistantMessageId||"",...Ct()}}function md(){let{historyRetentionLimit:t}=_e();return Math.max(20,Math.min(200,Number(t||0)*4||40))}function hd(t={}){let e=Ct();return{id:t?.id||ys("timeline"),at:Number(t?.at)||Date.now(),kind:t?.kind||"event",eventType:t?.eventType||"",traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",messageId:U(t?.messageId),executionKey:t?.executionKey||"",phase:t?.phase||"",reason:t?.reason||"",detail:t?.detail||"",confirmationSource:t?.confirmationSource||"",candidateToolIds:Array.isArray(t?.candidateToolIds)?[...t.candidateToolIds]:[],generationTraceId:t?.generationTraceId||h.gateState.lastGenerationTraceId||"",baselineResolved:t?.baselineResolved??e.baselineResolved,generationStartedByUserIntent:t?.generationStartedByUserIntent??e.generationStartedByUserIntent,generationUserIntentSource:t?.generationUserIntentSource||e.generationUserIntentSource,historicalReplayBlocked:t?.historicalReplayBlocked??!1}}function Ht(t={}){let e=hd(t);return E.recentEventTimeline=Gs([...E.recentEventTimeline,e],md()),e}function Jr(t){return!t||typeof t!="object"?t:{...t,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:[]}}function kn(t=!1,e=[],s=[]){return{flagged:!!t,reasons:[...new Set((Array.isArray(e)?e:[]).filter(Boolean))],relatedSessionKeys:[...new Set((Array.isArray(s)?s:[]).filter(Boolean))]}}function bd(t={}){let e=t?.summary||{},s=[...Array.isArray(t?.activeSessions)?t.activeSessions:[],...Array.isArray(t?.recentSessionHistory)?t.recentSessionHistory:[],t?.lastEventDebugSnapshot,t?.lastAutoTriggerSnapshot].filter(Boolean),n=[],i=[],o=[],a=[],r=[],l=[],c=[],d=[];for(let u of s){let y=String(u?.reason||u?.skipReason||"").trim(),p=String(u?.detail||u?.skipReasonDetailed||"").trim(),S=String(u?.sessionKey||"").trim(),b=String(u?.phase||u?.stage||"").trim(),P=String(u?.confirmationSource||"").trim(),$=String(u?.generationUserIntentSource||"").trim(),W=!!u?.generationStartedByUserIntent;(p==="missing_generation_baseline"||p==="generation_baseline_pending_resolution")&&(n.push(p),i.push(S)),(y===D.HISTORICAL_REPLAY_MESSAGE_RECEIVED||y===D.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION||u?.historicalReplayBlocked)&&(o.push(u?.historicalReplayReason||y||p||"historical_replay_signal_detected"),a.push(S)),y===D.IGNORED_AUTO_TRIGGER&&(W||$.startsWith("explicit_generation_action:"))&&(r.push(`ignored_auto_trigger_with_${$||"user_intent"}`),l.push(S)),e?.listenerSettings?.ignoreAutoTrigger&&!W&&!u?.isSpeculativeSession&&(b===H.COMPLETED||b===H.HANDLING||b===H.DISPATCHING||P==="generation_ended"||P==="message_received"||P==="generation_after_commands")&&(c.push("non_user_intent_generation_reached_execution_path"),d.push(S))}return{a10BaselineRaceSuspicious:kn(n.length>0,n,i),a11ReplaySuspicious:kn(o.length>0,o,a),a12UserIntentSuspicious:kn(r.length>0,r,l),a13AutoTriggerLeakSuspicious:kn(c.length>0,c,d)}}function Sd(t,e=""){let s=Date.now();return E.lastDuplicateExecutionKey===(e||t)&&s-E.lastDuplicateMessageAt<wc?!1:(E.lastDuplicateMessageKey=t,E.lastDuplicateExecutionKey=e||t,E.lastDuplicateMessageAt=s,!0)}function lo(t=Date.now()){for(let[e,s]of E.handledExecutionKeys.entries()){let n=Number(s?.at)||0;(n<=0||t-n>Rc)&&E.handledExecutionKeys.delete(e)}}function xd(t,e=Date.now()){let s=String(t||"").trim();return s?(lo(e),E.handledExecutionKeys.has(s)):!1}function vd(t,e={}){let s=String(t||"").trim();if(!s)return null;let n={executionKey:s,at:Number(e?.at)||Date.now(),messageKey:String(e?.messageKey||"").trim(),messageId:U(e?.messageId),generationTraceId:String(e?.generationTraceId||"").trim(),eventType:String(e?.eventType||"").trim(),sessionKey:String(e?.sessionKey||"").trim()};return E.handledExecutionKeys.set(s,n),lo(n.at),n}function Xr(t=8){return lo(),Gs(Array.from(E.handledExecutionKeys.values()).sort((e,s)=>(Number(e?.at)||0)-(Number(s?.at)||0)),t).map(e=>({...e}))}function mt(t,e,s={}){let n=U(s?.messageId||at(e,t)),i=us(t,e,{eventType:t,messageId:n,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",generationTraceId:s?.generationTraceId||h.gateState.lastGenerationTraceId||"",skipReasonDetailed:s?.skipReasonDetailed||"speculative_session_only",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),o=s?.reason||D.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,a=s?.skipReasonDetailed||"speculative_session_only";return F("info","\u8BB0\u5F55 speculative session\uFF0C\u672A\u8FDB\u5165\u6267\u884C\u8C03\u5EA6",{eventType:t,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:n,reason:o,detail:a}),Ee({stage:"speculative_observed",eventType:t,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:n,reason:o,skipReasonDetailed:a,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",isSpeculativeSession:!0,eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",handledAt:Date.now()}),be(i,{phase:H.IGNORED,skipReason:o,skipReasonDetailed:a,confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0,completedAt:Date.now()}),me(i,{phase:H.IGNORED,eventType:t,messageId:n,skipReason:o,skipReasonDetailed:a,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),i}function Nr(t,e,s=0,n={}){let i=U(n?.confirmedAssistantMessageId||n?.messageId||at(e,t));if(!i)return mt(t,e,{...n,reason:n?.reason||D.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:n?.skipReasonDetailed||"missing_confirmed_message_identity",confirmationSource:n?.confirmationSource||"none"});let o=typeof e=="object"&&e?{...e,generationTraceId:n?.generationTraceId||e?.generationTraceId||h.gateState.lastGenerationTraceId||"",messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||e?.confirmationSource||"",confirmationMode:n?.confirmationMode||e?.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??e?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??e?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||e?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??e?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??e?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||e?.historicalReplayReason||""}:{generationTraceId:n?.generationTraceId||h.gateState.lastGenerationTraceId||"",messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||"",confirmationMode:n?.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||""},a=us(t,o,{...n,eventType:t,messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmationMode:n?.confirmationMode||o.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1}),r=Number.isFinite(s)?Math.max(0,s):_e().debounceMs,l=a?.sessionKey||`message::${i}`,c=E.pendingMessageTimers.get(l);c&&clearTimeout(c),be(a,{phase:H.SCHEDULED,messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmationMode:n?.confirmationMode||o.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1,scheduledAt:Date.now()}),me(a,{phase:H.SCHEDULED,eventType:t,messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1}),Ee({stage:"scheduled",eventType:t,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmationMode:n?.confirmationMode||o.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:r}),F("info","\u5DF2\u8C03\u5EA6\u786E\u8BA4\u540E\u7684\u81EA\u52A8\u89E6\u53D1",{eventType:t,messageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",delayMs:r});let d=setTimeout(async()=>{E.pendingMessageTimers.delete(l),be(a,{phase:H.DISPATCHING,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmationMode:n?.confirmationMode||o.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",confirmedAssistantMessageId:i,isSpeculativeSession:!1}),me(a,{phase:H.DISPATCHING,eventType:t,messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmationMode:n?.confirmationMode||o.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",isSpeculativeSession:!1}),Ee({stage:"dispatching",eventType:t,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:i,confirmedAssistantMessageId:i,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,confirmationMode:n?.confirmationMode||o.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??o.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??o.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||o.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:r}),await Zr(t,o)},r);return E.pendingMessageTimers.set(l,d),a}function Gn(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}function Qr(t,e){return e?.triggerEvent==="MANUAL"?t.output?.mode===wt.POST_RESPONSE_API?jt.MANUAL_POST_RESPONSE_API:jt.MANUAL_COMPATIBILITY:jt.AUTO_POST_RESPONSE_API}async function Zr(t,e){j(`${t}\u89E6\u53D1:`,e);let s=typeof e=="object"&&e?String(e?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim():String(h.gateState.lastGenerationTraceId||"").trim(),n=await Ds({traceId:s,retries:2,retryDelayMs:40})||ht(),i=n?.rawGenerationType||n?.generationType||h.gateState.lastGenerationType||"",o=n?.rawGenerationParams??n?.generationParams??h.gateState.lastGenerationParams??null,a=!!n?.dryRun,r=typeof e=="object"&&e?String(e?.confirmationSource||"").trim():"",l=typeof e=="object"&&e?String(e?.confirmationMode||"").trim():"",c=!!(typeof e=="object"&&e&&e?.sameSlotRevisionCandidate),d=!!(typeof e=="object"&&e&&e?.sameSlotRevisionConfirmed),u=typeof e=="object"&&e?String(e?.sameSlotRevisionSource||"").trim():"";F("info","\u5F00\u59CB\u5904\u7406\u81EA\u52A8\u89E6\u53D1",{eventType:t,incomingMessageId:at(e,t),confirmationSource:r});let y=_d(M.GENERATION_ENDED),p=y.map(_=>_.id),S=id(),b=at(e,t),P=!!(typeof e=="object"&&e&&e?.eventBelongsToCurrentGeneration),$=!!(typeof e=="object"&&e&&e?.historicalReplayBlocked),W=typeof e=="object"&&e?String(e?.historicalReplayReason||"").trim():"",I=U((typeof e=="object"&&e?e?.confirmedAssistantMessageId:"")||b),T=us(t,e,{eventType:t,messageId:b,confirmedAssistantMessageId:I,confirmationSource:r,confirmationMode:l,sameSlotRevisionCandidate:c,sameSlotRevisionConfirmed:d,sameSlotRevisionSource:u,eventBelongsToCurrentGeneration:P,historicalReplayBlocked:$,historicalReplayReason:W,candidateToolIds:p});if(be(T,{phase:H.HANDLING,handledAt:Date.now(),confirmedAssistantMessageId:I,confirmationSource:r,confirmationMode:l,sameSlotRevisionCandidate:c,sameSlotRevisionConfirmed:d,sameSlotRevisionSource:u,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:P,historicalReplayBlocked:$,historicalReplayReason:W,candidateToolIds:p}),me(T,{phase:H.HANDLING,eventType:t,messageId:b,confirmedAssistantMessageId:I,confirmationSource:r,confirmationMode:l,sameSlotRevisionCandidate:c,sameSlotRevisionConfirmed:d,sameSlotRevisionSource:u,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:P,historicalReplayBlocked:$,historicalReplayReason:W,candidateToolIds:p}),Ee({stage:"handling",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,confirmedAssistantMessageId:I,confirmationSource:r,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:P,historicalReplayBlocked:$,historicalReplayReason:W,candidateToolIds:p,handledAt:Date.now()}),no()&&!so()){F("warn","\u5F53\u524D\u5904\u4E8E\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B\u7A97\u53E3\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u5FFD\u7565",{eventType:t,candidateToolIds:p,uiTransitionGuardUntil:h.gateState.uiTransitionGuardUntil,lastUiTransitionSource:h.gateState.lastUiTransitionSource||""}),It({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,selectedToolIds:p,skipReason:D.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:I,confirmationSource:r,lockedAiMessageId:b||""}),cs(y,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:D.UNRELATED_UI_EVENT,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"ignored_ui_transition_guard",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,reason:D.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:I,confirmationSource:r,candidateToolIds:p,handledAt:Date.now()}),be(T,{phase:H.IGNORED,skipReason:D.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:I,confirmationSource:r,completedAt:Date.now(),candidateToolIds:p}),me(T,{phase:H.IGNORED,eventType:t,messageId:b,skipReason:D.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:I,confirmationSource:r,candidateToolIds:p}),Kt(y,{traceId:T?.traceId||"",eventType:t,messageId:b,messageKey:"",skipReason:D.UNRELATED_UI_EVENT,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(a){F("warn","\u5F53\u524D generation \u4E3A dryRun\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u963B\u65AD",{eventType:t,candidateToolIds:p,generationTraceId:s||""}),It({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,selectedToolIds:p,skipReason:D.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:I,confirmationSource:r,lockedAiMessageId:b||""}),cs(y,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:D.DRY_RUN_GENERATION,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,reason:D.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:I,confirmationSource:r,candidateToolIds:p,handledAt:Date.now()}),be(T,{phase:H.SKIPPED,skipReason:D.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:I,confirmationSource:r,completedAt:Date.now(),candidateToolIds:p}),me(T,{phase:H.SKIPPED,eventType:t,messageId:b,skipReason:D.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:I,confirmationSource:r,candidateToolIds:p}),Kt(y,{traceId:T?.traceId||"",eventType:t,messageId:b,messageKey:"",skipReason:D.DRY_RUN_GENERATION,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(S.skip){F("warn","\u6839\u636E\u76D1\u542C\u5668\u8BBE\u7F6E\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,reason:S.reason,listenerSettings:S.listenerSettings,candidateToolIds:p}),It({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,selectedToolIds:p,skipReason:S.reason,skipReasonDetailed:`listener_setting_${S.reason}`,confirmedAssistantMessageId:I,confirmationSource:r,lockedAiMessageId:b||""}),cs(y,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:S.reason,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,reason:S.reason,skipReasonDetailed:`listener_setting_${S.reason}`,confirmedAssistantMessageId:I,confirmationSource:r,candidateToolIds:p,handledAt:Date.now()}),be(T,{phase:H.SKIPPED,skipReason:S.reason,skipReasonDetailed:`listener_setting_${S.reason}`,confirmedAssistantMessageId:I,confirmationSource:r,completedAt:Date.now(),candidateToolIds:p}),me(T,{phase:H.SKIPPED,eventType:t,messageId:b,skipReason:S.reason,skipReasonDetailed:`listener_setting_${S.reason}`,confirmedAssistantMessageId:I,confirmationSource:r,candidateToolIds:p}),Kt(y,{traceId:T?.traceId||"",eventType:t,messageId:b,messageKey:"",skipReason:S.reason,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(S.listenerSettings.ignoreQuietGeneration&&Gc(i,o,a)){j("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C"),F("warn","\u68C0\u6D4B\u5230 quiet/dryRun\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,candidateToolIds:p}),It({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",selectedToolIds:p,skipReason:D.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:I,confirmationSource:r}),cs(y,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:D.QUIET_GENERATION,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:b,reason:D.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:I,confirmationSource:r,candidateToolIds:p,handledAt:Date.now()}),be(T,{phase:H.SKIPPED,skipReason:D.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:I,confirmationSource:r,completedAt:Date.now(),candidateToolIds:p}),me(T,{phase:H.SKIPPED,eventType:t,messageId:b,skipReason:D.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:I,confirmationSource:r,candidateToolIds:p}),Kt(y,{traceId:T?.traceId||"",eventType:t,messageId:b,messageKey:"",skipReason:D.QUIET_GENERATION,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}let m=await co({...typeof e=="object"&&e?e:{},triggerEvent:t,...b?{messageId:b}:{},...I?{confirmedAssistantMessageId:I}:{},...r?{confirmationSource:r}:{},traceId:T?.traceId||"",sessionKey:T?.sessionKey||""});m.traceId=T?.traceId||m.traceId||ys("exec"),m.sessionKey=T?.sessionKey||m.sessionKey||"";let z=m?.executionKey||Yr(m||{});m.executionKey=z;let G=ao(m.chatId,m.messageId,t,m.generationTraceId);if(gd(T,G),be(T,{messageId:m.messageId||b,messageKey:Gn(m),executionKey:z,confirmedAssistantMessageId:m.confirmedAssistantMessageId||I,confirmationSource:m.confirmationSource||r,confirmationMode:m?.confirmationMode||l,sameSlotRevisionCandidate:m?.sameSlotRevisionCandidate??c,sameSlotRevisionConfirmed:m?.sameSlotRevisionConfirmed??d,sameSlotRevisionSource:m?.sameSlotRevisionSource||u,sourceMessageLocked:!!m.messageId}),!m?.lastAiMessage){j(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`),F("warn","\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D\uFF0C\u81EA\u52A8\u89E6\u53D1\u4E2D\u6B62",{eventType:t,preferredMessageId:b,candidateToolIds:p});let _=Gn(m||{});It({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:m?.messageId||"",messageKey:_,executionKey:z,generationMessageBindingSource:m?.generationMessageBindingSource||"",confirmedAssistantSwipeId:m?.confirmedAssistantSwipeId||"",effectiveSwipeId:m?.effectiveSwipeId||"",selectedToolIds:p,skipReason:D.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,lockedAiMessageId:m?.messageId||""}),cs(y,{lastTriggerEvent:t,lastMessageKey:_,lastExecutionKey:z,lastSkipReason:D.MISSING_AI_MESSAGE,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:m?.messageId||b,messageKey:_,executionKey:z,generationMessageBindingSource:m?.generationMessageBindingSource||"",confirmedAssistantSwipeId:m?.confirmedAssistantSwipeId||"",effectiveSwipeId:m?.effectiveSwipeId||"",reason:D.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,candidateToolIds:p,handledAt:Date.now()}),be(T,{phase:H.SKIPPED,skipReason:D.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",messageKey:_,executionKey:z,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,completedAt:Date.now(),candidateToolIds:p}),me(T,{phase:H.SKIPPED,eventType:t,messageId:m?.messageId||b,messageKey:_,executionKey:z,skipReason:D.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,candidateToolIds:p}),Kt(y,{traceId:T?.traceId||"",eventType:t,messageId:m?.messageId||b,messageKey:_,skipReason:D.MISSING_AI_MESSAGE,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}let A=Gn(m);if(xd(z)){Sd(A,z)&&(j(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${A}`),F("warn","\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD\uFF0C\u8DF3\u8FC7\u6267\u884C",{eventType:t,messageKey:A,executionKey:z,candidateToolIds:p}),It({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:m?.messageId||"",messageKey:A,executionKey:z,generationMessageBindingSource:m?.generationMessageBindingSource||"",confirmedAssistantSwipeId:m?.confirmedAssistantSwipeId||"",effectiveSwipeId:m?.effectiveSwipeId||"",selectedToolIds:p,skipReason:D.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,lockedAiMessageId:m?.messageId||""}),cs(y,{lastTriggerEvent:t,lastMessageKey:A,lastExecutionKey:z,lastSkipReason:D.DUPLICATE_MESSAGE,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Ee({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:m?.messageId||b,messageKey:A,executionKey:z,generationMessageBindingSource:m?.generationMessageBindingSource||"",confirmedAssistantSwipeId:m?.confirmedAssistantSwipeId||"",effectiveSwipeId:m?.effectiveSwipeId||"",reason:D.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,candidateToolIds:p,handledAt:Date.now()}),be(T,{phase:H.SKIPPED,skipReason:D.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",messageKey:A,executionKey:z,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,completedAt:Date.now(),candidateToolIds:p}),me(T,{phase:H.SKIPPED,eventType:t,messageId:m?.messageId||b,messageKey:A,executionKey:z,skipReason:D.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,candidateToolIds:p}),Kt(y,{traceId:T?.traceId||"",eventType:t,messageId:m?.messageId||b,messageKey:A,skipReason:D.DUPLICATE_MESSAGE,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""}));return}let N=y;if(N.length===0){j("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177"),F("warn","\u5F53\u524D\u4E8B\u4EF6\u672A\u547D\u4E2D\u4EFB\u4F55\u53EF\u6267\u884C\u5DE5\u5177",{eventType:t,messageKey:A,candidateToolIds:p}),It({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:m?.messageId||"",messageKey:A,generationMessageBindingSource:m?.generationMessageBindingSource||"",confirmedAssistantSwipeId:m?.confirmedAssistantSwipeId||"",effectiveSwipeId:m?.effectiveSwipeId||"",selectedToolIds:[],skipReason:D.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,lockedAiMessageId:m?.messageId||""}),Ee({stage:"skipped",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:m?.messageId||b,messageKey:A,generationMessageBindingSource:m?.generationMessageBindingSource||"",confirmedAssistantSwipeId:m?.confirmedAssistantSwipeId||"",effectiveSwipeId:m?.effectiveSwipeId||"",reason:D.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,candidateToolIds:[],handledAt:Date.now()}),be(T,{phase:H.SKIPPED,skipReason:D.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",messageKey:A,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,completedAt:Date.now(),candidateToolIds:[]}),me(T,{phase:H.SKIPPED,eventType:t,messageId:m?.messageId||b,messageKey:A,skipReason:D.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,candidateToolIds:[]});return}E.lastHandledMessageKey=A,E.lastHandledExecutionKey=z,vd(z,{messageKey:A,messageId:m?.messageId||b,generationTraceId:m?.generationTraceId||"",eventType:t,sessionKey:T?.sessionKey||""}),E.lastDuplicateMessageKey="",E.lastDuplicateExecutionKey="",E.lastDuplicateMessageAt=0,m.messageKey=A,It({triggerEvent:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:m?.messageId||"",messageKey:A,executionKey:z,generationMessageBindingSource:m?.generationMessageBindingSource||"",confirmedAssistantSwipeId:m?.confirmedAssistantSwipeId||"",effectiveSwipeId:m?.effectiveSwipeId||"",selectedToolIds:N.map(_=>_.id),skipReason:"",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,lockedAiMessageId:m?.messageId||""}),j(`\u9700\u8981\u6267\u884C ${N.length} \u4E2A\u5DE5\u5177:`,N.map(_=>_.id)),F("info","\u81EA\u52A8\u89E6\u53D1\u547D\u4E2D\u5DE5\u5177",{eventType:t,messageKey:A,executionKey:z,toolIds:N.map(_=>_.id)}),Ze("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${N.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"}),be(T,{messageKey:A,executionKey:z,candidateToolIds:N.map(_=>_.id),executionPathIds:[],confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,phase:H.DISPATCHING}),me(T,{phase:H.DISPATCHING,eventType:t,messageId:m?.messageId||b,messageKey:A,executionKey:z,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,candidateToolIds:N.map(_=>_.id)}),Kt(N,{traceId:T?.traceId||"",eventType:t,messageId:m?.messageId||b,messageKey:A,executionKey:z,skipReason:"",executionPath:jt.AUTO_POST_RESPONSE_API,writebackStatus:"",failureStage:""});for(let _ of N)try{let O=await ta(_,m),ue=Qr(_,m);T.executionPathIds.includes(ue)||T.executionPathIds.push(ue),fd(_.id,{traceId:T?.traceId||"",eventType:t,messageId:m?.messageId||b,messageKey:A,executionKey:z,executionPath:ue,writebackStatus:O?.result?.meta?.writebackStatus||O?.meta?.writebackStatus||ne.NOT_APPLICABLE,failureStage:O?.result?.meta?.failureStage||O?.meta?.failureStage||"",contentCommitted:!!(O?.result?.meta?.writebackDetails?.contentCommitted||O?.meta?.writebackDetails?.contentCommitted),hostCommitApplied:!!(O?.result?.meta?.writebackDetails?.hostCommitApplied||O?.meta?.writebackDetails?.hostCommitApplied),refreshRequested:!!(O?.result?.meta?.writebackDetails?.refreshRequested||O?.meta?.writebackDetails?.refreshRequested),refreshConfirmed:!!(O?.result?.meta?.writebackDetails?.refreshConfirmed||O?.meta?.writebackDetails?.refreshConfirmed),preferredCommitMethod:O?.result?.meta?.writebackDetails?.commit?.preferredMethod||O?.meta?.writebackDetails?.commit?.preferredMethod||"",appliedCommitMethod:O?.result?.meta?.writebackDetails?.commit?.appliedMethod||O?.meta?.writebackDetails?.commit?.appliedMethod||"",refreshMethodCount:(O?.result?.meta?.writebackDetails?.refresh?.requestMethods||O?.meta?.writebackDetails?.refresh?.requestMethods||[]).length,refreshConfirmChecks:O?.result?.meta?.writebackDetails?.refresh?.confirmChecks||O?.meta?.writebackDetails?.refresh?.confirmChecks||0,success:!!O?.success}),O.success?(j(`\u5DE5\u5177 ${_.id} \u6267\u884C\u6210\u529F`),L.emit(B.TOOL_EXECUTED,{toolId:_.id,result:O.result||O.data||O})):j(`\u5DE5\u5177 ${_.id} \u6267\u884C\u5931\u8D25:`,O.error)}catch(O){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${_.id}`,O)}E.lastExecutionContext=m,Ee({stage:"completed",eventType:t,traceId:T?.traceId||"",sessionKey:T?.sessionKey||"",messageId:m?.messageId||b,messageKey:A,executionKey:z,generationMessageBindingSource:m?.generationMessageBindingSource||"",confirmedAssistantSwipeId:m?.confirmedAssistantSwipeId||"",effectiveSwipeId:m?.effectiveSwipeId||"",confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,candidateToolIds:N.map(_=>_.id),handledAt:Date.now()}),be(T,{phase:H.COMPLETED,messageKey:A,executionKey:z,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,completedAt:Date.now(),candidateToolIds:N.map(_=>_.id)}),me(T,{phase:H.COMPLETED,eventType:t,messageId:m?.messageId||b,messageKey:A,executionKey:z,confirmedAssistantMessageId:m?.confirmedAssistantMessageId||I,confirmationSource:m?.confirmationSource||r,candidateToolIds:N.map(_=>_.id),executionPathIds:[...T.executionPathIds||[]]})}async function Td(t,e,s){return s||t.output?.mode===wt.POST_RESPONSE_API?as.runToolPostResponse(t,e):(await sd()).executeToolWithConfig(t.id,e)}function ea(){if(E.initialized){j("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}Ed(),E.initialized=!0,j("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),L.emit(B.TOOL_TRIGGER_INITIALIZED)}function Ed(){let t=rt(M.GENERATION_ENDED,async n=>{let i=at(n,M.GENERATION_ENDED),o=h.gateState.lastGenerationTraceId||"",a=us(M.GENERATION_ENDED,n,{eventType:M.GENERATION_ENDED,messageId:i});Ee({stage:"received",eventType:M.GENERATION_ENDED,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:i,receivedAt:Date.now()}),me(a,{phase:H.RECEIVED,eventType:M.GENERATION_ENDED,messageId:i});let r=await Ds({traceId:o,retries:6,retryDelayMs:80}),l=kr(r);if(!l.eligible){mt(M.GENERATION_ENDED,n,{messageId:i,generationTraceId:r?.traceId||o,reason:l.reason,skipReasonDetailed:l.detail,confirmationSource:"none"});return}let c=Vi(i,r,{allowBaselineAssistantSlot:Wi(On(r))}),d=await Pn(c.preferredMessageId,{retries:c.preferredMessageId?3:8,retryDelayMs:c.preferredMessageId?120:260,allowSameSlotRevision:!0,requireObservedSameSlotRevision:!c.forceSameSlotRevision,forceSameSlotRevision:c.forceSameSlotRevision,forcedSameSlotSource:c.forcedSameSlotSource}),u=U(d?.sourceId);if(!u){mt(M.GENERATION_ENDED,n,{messageId:i,generationTraceId:r?.traceId||o,reason:D.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:c.preferredMessageId?"message_id_or_same_slot_not_confirmed_after_generation":"missing_new_assistant_message_after_generation",confirmationSource:"none",eventBelongsToCurrentGeneration:!!r,historicalReplayBlocked:!1,historicalReplayReason:""});return}await Zr(M.GENERATION_ENDED,{...typeof n=="object"&&n?n:{},generationTraceId:r?.traceId||o,messageId:u,confirmedAssistantMessageId:u,confirmationSource:"generation_ended",confirmationMode:d?.confirmationMode||"",sameSlotRevisionCandidate:!!d?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!d?.sameSlotRevisionConfirmed,sameSlotRevisionSource:d?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})}),e=rt(M.GENERATION_AFTER_COMMANDS,async n=>{let i=at(n,M.GENERATION_AFTER_COMMANDS),o=h.gateState.lastGenerationTraceId||"",{debounceMs:a}=_e(),r=us(M.GENERATION_AFTER_COMMANDS,n,{eventType:M.GENERATION_AFTER_COMMANDS,messageId:i});if(Ee({stage:"received",eventType:M.GENERATION_AFTER_COMMANDS,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:i,receivedAt:Date.now(),scheduledDelayMs:a}),me(r,{phase:H.RECEIVED,eventType:M.GENERATION_AFTER_COMMANDS,messageId:i}),!_e().useGenerationAfterCommandsFallback){be(r,{phase:H.IGNORED,skipReason:"generation_after_commands_fallback_disabled",completedAt:Date.now()}),me(r,{phase:H.IGNORED,eventType:M.GENERATION_AFTER_COMMANDS,messageId:i,skipReason:"generation_after_commands_fallback_disabled"});return}let l=await Ds({traceId:o,retries:6,retryDelayMs:80}),c=kr(l),d=Vi(i,l,{allowBaselineAssistantSlot:Wi(On(l))});if(!d.preferredMessageId){mt(M.GENERATION_AFTER_COMMANDS,n,{generationTraceId:l?.traceId||o,reason:D.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:c.eligible?"generation_after_commands_without_message_identity":c.detail,confirmationSource:"none"});return}if(!c.eligible){mt(M.GENERATION_AFTER_COMMANDS,n,{messageId:i,generationTraceId:l?.traceId||o,reason:c.reason,skipReasonDetailed:c.detail,confirmationSource:"none"});return}let u=await Pn(d.preferredMessageId,{retries:d.preferredMessageId?3:2,retryDelayMs:120,allowSameSlotRevision:!0,requireObservedSameSlotRevision:!d.forceSameSlotRevision,forceSameSlotRevision:d.forceSameSlotRevision,forcedSameSlotSource:d.forcedSameSlotSource}),y=U(u?.sourceId);if(!y){mt(M.GENERATION_AFTER_COMMANDS,n,{messageId:i,generationTraceId:l?.traceId||o,reason:D.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:d.preferredMessageId?"generation_after_commands_same_slot_not_confirmed":"generation_after_commands_message_not_confirmed",confirmationSource:"none",eventBelongsToCurrentGeneration:!!l,historicalReplayBlocked:!1,historicalReplayReason:""});return}Nr(M.GENERATION_AFTER_COMMANDS,n,a,{generationTraceId:l?.traceId||o,messageId:i,confirmedAssistantMessageId:y,confirmationSource:"generation_after_commands",confirmationMode:u?.confirmationMode||"",sameSlotRevisionCandidate:!!u?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!u?.sameSlotRevisionConfirmed,sameSlotRevisionSource:u?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})}),s=rt(M.MESSAGE_RECEIVED,async n=>{let i=at(n,M.MESSAGE_RECEIVED),o=i?await Fc(i,{retries:3,retryDelayMs:120}):null,a=o?.message||null,r=a?Fn(a):"",l=o?U(Bn(a,o.index)):"",c=i||l,{debounceMs:d}=_e(),u=us(M.MESSAGE_RECEIVED,n,{eventType:M.MESSAGE_RECEIVED,messageId:c,messageRole:r});if(!i){F("info","MESSAGE_RECEIVED \u7F3A\u5C11\u6D88\u606F\u8EAB\u4EFD\uFF0C\u5224\u5B9A\u4E3A\u5BBF\u4E3B UI \u5E72\u6270\u4E8B\u4EF6\uFF0C\u8DF3\u8FC7",{rawEventData:n??null}),Ee({stage:"ignored_ui_side_effect",eventType:M.MESSAGE_RECEIVED,traceId:u?.traceId||"",sessionKey:u?.sessionKey||"",messageId:"",messageRole:r,reason:D.UNRELATED_UI_EVENT,handledAt:Date.now()}),be(u,{phase:H.IGNORED,skipReason:D.UNRELATED_UI_EVENT,completedAt:Date.now(),messageRole:r}),me(u,{phase:H.IGNORED,eventType:M.MESSAGE_RECEIVED,messageId:"",messageRole:r,skipReason:D.UNRELATED_UI_EVENT});return}if(Ee({stage:"received",eventType:M.MESSAGE_RECEIVED,traceId:u?.traceId||"",sessionKey:u?.sessionKey||"",messageId:c,messageRole:r,receivedAt:Date.now(),scheduledDelayMs:d}),me(u,{phase:H.RECEIVED,eventType:M.MESSAGE_RECEIVED,messageId:c,messageRole:r}),!_e().useMessageReceivedFallback){be(u,{phase:H.IGNORED,skipReason:"message_received_fallback_disabled",completedAt:Date.now(),messageRole:r}),me(u,{phase:H.IGNORED,eventType:M.MESSAGE_RECEIVED,messageId:c,messageRole:r,skipReason:"message_received_fallback_disabled"});return}if(!o){mt(M.MESSAGE_RECEIVED,n,{messageId:i,generationTraceId:h.gateState.lastGenerationTraceId||"",reason:D.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_identity_not_resolved",confirmationSource:"none"});return}if(a&&r!=="assistant"){F("info","MESSAGE_RECEIVED \u547D\u4E2D\u975E AI \u6D88\u606F\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1\u8C03\u5EA6",{messageId:c,messageRole:r}),Ee({stage:"ignored_non_assistant",eventType:M.MESSAGE_RECEIVED,traceId:u?.traceId||"",sessionKey:u?.sessionKey||"",messageId:c,messageRole:r,reason:D.NON_ASSISTANT_MESSAGE,handledAt:Date.now()}),be(u,{phase:H.IGNORED,skipReason:D.NON_ASSISTANT_MESSAGE,completedAt:Date.now(),messageRole:r}),me(u,{phase:H.IGNORED,eventType:M.MESSAGE_RECEIVED,messageId:c,messageRole:r,skipReason:D.NON_ASSISTANT_MESSAGE});return}let y=await Qc(o,{traceId:h.gateState.lastGenerationTraceId||"",messageId:c});if(!y.allowed){mt(M.MESSAGE_RECEIVED,n,{messageId:c,generationTraceId:y?.baseline?.traceId||h.gateState.lastGenerationTraceId||"",reason:y.reason,skipReasonDetailed:y.detail,confirmationSource:"none",confirmationMode:y.confirmationMode||"",sameSlotRevisionCandidate:!!y.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!y.sameSlotRevisionConfirmed,sameSlotRevisionSource:y.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:y.eventBelongsToCurrentGeneration,historicalReplayBlocked:y.historicalReplayBlocked,historicalReplayReason:y.historicalReplayReason});return}let p=await Pn(c,{retries:3,retryDelayMs:120,allowSameSlotRevision:!0,requireObservedSameSlotRevision:!1,forceSameSlotRevision:!0,forcedSameSlotSource:"message_id_bound_in_place"}),S=U(p?.sourceId);if(!S){mt(M.MESSAGE_RECEIVED,n,{messageId:c,generationTraceId:y?.baseline?.traceId||h.gateState.lastGenerationTraceId||"",reason:D.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_not_confirmed_as_new_assistant",confirmationSource:"none",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""});return}Nr(M.MESSAGE_RECEIVED,n,d,{generationTraceId:y?.baseline?.traceId||h.gateState.lastGenerationTraceId||"",messageId:c,confirmedAssistantMessageId:S,confirmationSource:"message_received",confirmationMode:p?.confirmationMode||y.confirmationMode||"",sameSlotRevisionCandidate:!!(p?.sameSlotRevisionCandidate??y.sameSlotRevisionCandidate),sameSlotRevisionConfirmed:!!(p?.sameSlotRevisionConfirmed??y.sameSlotRevisionConfirmed),sameSlotRevisionSource:p?.sameSlotRevisionSource||y.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})});E.listeners.set(M.GENERATION_ENDED,t),E.listeners.set(M.GENERATION_AFTER_COMMANDS,e),E.listeners.set(M.MESSAGE_RECEIVED,s)}async function co(t){let e=await ro(),s=lt(),n=s?.getContext?.()||null,i=t?.triggerEvent||"GENERATION_ENDED",o=U(t?.confirmedAssistantMessageId||at(t,i)),a=String(t?.confirmationSource||"").trim(),r=i==="MANUAL"||i==="MANUAL_PREVIEW",l=String(t?.generationTraceId||h.gateState.lastGenerationTraceId||"").trim(),c=r?ht():await Ds({traceId:l,retries:2,retryDelayMs:40})||ht(),d=Vi(o,c,{allowBaselineAssistantSlot:!r&&Wi(On(c))}),u=null,y=U(d.preferredMessageId);r||(u=await Pn(y,{retries:y?3:8,retryDelayMs:y?120:260,allowSameSlotRevision:!0,requireObservedSameSlotRevision:!d.forceSameSlotRevision,forceSameSlotRevision:d.forceSameSlotRevision,forcedSameSlotSource:d.forcedSameSlotSource}),u&&(y=U(u.sourceId)));let p=Kc(i,t,y)||!!y,S=await kc({preferredMessageId:y||null,retries:r||y?2:0,retryDelayMs:120,lockToMessageId:p}),b=S.messages||[],P=S.lastUserMessage,$=S.lastAiMessage;r||(u?U($?.sourceId)!==y&&($=u):$=null);let W=y||U($?.sourceId)||"",I=ps($?.content||""),T=U(u?.swipeId||$?.swipeId);return{triggeredAt:Date.now(),triggerEvent:i,traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",confirmationSource:a,confirmedAssistantMessageId:W,chatId:Ps(s,n,e),messageId:W,generationTraceId:l,confirmationMode:String(t?.confirmationMode||u?.confirmationMode||"").trim(),sameSlotRevisionCandidate:!!(t?.sameSlotRevisionCandidate??u?.sameSlotRevisionCandidate),sameSlotRevisionConfirmed:!!(t?.sameSlotRevisionConfirmed??u?.sameSlotRevisionConfirmed),sameSlotRevisionSource:String(t?.sameSlotRevisionSource||u?.sameSlotRevisionSource||"").trim(),rawGenerationType:h.gateState.lastGenerationBaseline?.rawGenerationType||h.gateState.lastGenerationType||"",rawGenerationParams:h.gateState.lastGenerationBaseline?.rawGenerationParams??h.gateState.lastGenerationParams??null,normalizedGenerationType:h.gateState.lastGenerationBaseline?.normalizedGenerationType||h.gateState.lastNormalizedGenerationType||"",generationAction:h.gateState.lastGenerationBaseline?.generationAction||h.gateState.lastGenerationAction||"",generationActionSource:h.gateState.lastGenerationBaseline?.generationActionSource||h.gateState.lastGenerationActionSource||"",generationMessageBindingSource:d.bindingSource||"",lastAiMessage:$?.content||"",assistantContentFingerprint:I,confirmedAssistantSwipeId:T,effectiveSwipeId:T,userMessage:P?.content||h.gateState.lastUserMessageText||"",chatMessages:b,input:{userMessage:P?.content||h.gateState.lastUserMessageText||"",lastAiMessage:$?.content||"",extractedContent:"",previousToolOutput:"",context:{character:e?.name||"",chatLength:b.length||0}},config:{},status:"pending",executionKey:Yr({chatId:Ps(s,n,e),messageId:W,generationTraceId:l,assistantContentFingerprint:I,effectiveSwipeId:T,lastAiMessage:$?.content||""})}}function _d(t){return is().filter(s=>{let n=s?.trigger?.enabled&&s?.trigger?.event===t,i=Array.isArray(s?.triggerEvents)&&s.triggerEvents.includes(t);return(n||i)&&as.shouldRunPostResponse(s)})}function Dn(t,e){try{Oi(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function ta(t,e){let s=Date.now(),n=t.id,i=e?.triggerEvent==="MANUAL",o=`yyt-tool-run-${n}`,a=Qr(t,e),r=e?.messageKey||Gn(e||{}),l=e?.executionKey||"";Dn(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||M.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:l,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:"",lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0}),L.emit(B.TOOL_EXECUTION_REQUESTED,{toolId:n,traceId:e?.traceId||"",triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),Ze("info",`${i?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:o}),F("info","\u5F00\u59CB\u6267\u884C\u5DE5\u5177",{toolId:n,toolName:t.name,triggerEvent:e?.triggerEvent,executionPath:a,messageKey:r});try{let c=await Td(t,e,i),d=Date.now()-s;if(c?.success){let S=de(n),b=c?.meta?.writebackDetails||{};Dn(n,{lastStatus:"success",lastError:"",lastDurationMs:d,lastTraceId:e?.traceId||"",successCount:(S?.runtime?.successCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||M.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:l,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:c?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:c?.meta?.failureStage||"",lastContentCommitted:!!b.contentCommitted,lastHostCommitApplied:!!b.hostCommitApplied,lastRefreshRequested:!!b.refreshRequested,lastRefreshConfirmed:!!b.refreshConfirmed,lastPreferredCommitMethod:b?.commit?.preferredMethod||"",lastAppliedCommitMethod:b?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(b?.refresh?.requestMethods)?b.refresh.requestMethods.length:0,lastRefreshConfirmChecks:Number(b?.refresh?.confirmChecks)||0});let P=i?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return v("success",P),Ze("success",P,{duration:3200,noticeId:o}),F("info","\u5DE5\u5177\u6267\u884C\u6210\u529F",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:d,writebackStatus:c?.meta?.writebackStatus||ne.NOT_APPLICABLE}),{success:!0,duration:d,result:c}}let u=de(n),y=c?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",p=c?.meta?.writebackDetails||{};return Dn(n,{lastStatus:"error",lastError:y,lastDurationMs:d,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||M.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:l,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:c?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:c?.meta?.failureStage||(a===jt.MANUAL_COMPATIBILITY?We.COMPATIBILITY_EXECUTE:We.UNKNOWN),lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0}),v("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${y}`),Ze("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${y}`,{sticky:!0,noticeId:o}),F("error","\u5DE5\u5177\u6267\u884C\u5931\u8D25",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:d,error:y,failureStage:c?.meta?.failureStage||""}),{success:!1,duration:d,error:y,result:c}}catch(c){let d=Date.now()-s,u=de(n),y=c?.message||String(c);throw Dn(n,{lastStatus:"error",lastError:y,lastDurationMs:d,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||M.GENERATION_ENDED,lastMessageKey:r,lastExecutionKey:l,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:a===jt.MANUAL_COMPATIBILITY?We.COMPATIBILITY_EXECUTE:We.UNKNOWN,lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0}),v("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${y}`),Ze("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${y}`,{sticky:!0,noticeId:o}),F("error","\u5DE5\u5177\u6267\u884C\u629B\u51FA\u5F02\u5E38",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:d,error:y}),c}}async function uo(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=de(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return ns(t,{lastTriggerAt:Date.now(),lastTriggerEvent:"MANUAL",lastMessageKey:"",lastExecutionKey:"",lastSkipReason:D.TOOL_DISABLED,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0},{touchLastRunAt:!1,emitEvent:!1}),Ze("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await co({triggerEvent:"MANUAL"});return F("info","\u624B\u52A8\u6267\u884C\u5DE5\u5177",{toolId:t}),ta(e,s)}async function po(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=de(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await co({triggerEvent:"MANUAL_PREVIEW"});return as.previewExtraction(e,s)}function Ad(){for(let t of E.pendingMessageTimers.values())clearTimeout(t);E.pendingMessageTimers.clear();for(let t of E.listeners.values())typeof t=="function"&&t();E.listeners.clear(),E.messageSessions.clear(),E.handledExecutionKeys.clear(),E.recentSessionHistory=[],E.recentEventTimeline=[],E.initialized=!1,E.lastExecutionContext=null,E.lastHandledMessageKey="",E.lastHandledExecutionKey="",E.lastAutoTriggerSnapshot=null,E.lastEventDebugSnapshot=null,E.lastDuplicateMessageKey="",E.lastDuplicateExecutionKey="",E.lastDuplicateMessageAt=0,j("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function wd(){let t=Xr(8),e=Array.from(E.messageSessions.values()).map(ds).filter(Boolean).sort((i,o)=>(Number(i?.updatedAt)||0)-(Number(o?.updatedAt)||0)),s=[...E.recentSessionHistory].map(ds).filter(Boolean),n=[...E.recentEventTimeline].map(Jr).filter(Boolean);return{initialized:E.initialized,listenersCount:E.listeners.size,activeSessionCount:E.messageSessions.size,activeSessions:e,recentSessionHistory:s,recentEventTimeline:n,lastExecutionContext:E.lastExecutionContext,lastAutoTriggerSnapshot:E.lastAutoTriggerSnapshot,lastEventDebugSnapshot:E.lastEventDebugSnapshot,registeredEvents:Array.from(E.listeners.keys()),pendingTimerCount:E.pendingMessageTimers.size,lastHandledMessageKey:E.lastHandledMessageKey,lastHandledExecutionKey:E.lastHandledExecutionKey,lastDuplicateExecutionKey:E.lastDuplicateExecutionKey,handledExecutionKeyCount:E.handledExecutionKeys.size,recentHandledExecutionKeys:t,listenerSettings:_e(),eventBridge:Vr(),gateState:qr()}}function Ns(t={}){let e=parseInt(t?.historyLimit,10),s=Number.isFinite(e)?Math.max(1,Math.min(50,e)):8,n=Xr(s),i=h.gateState.lastGenerationBaseline,o=Array.from(E.messageSessions.values()).map(ds).filter(Boolean).sort((u,y)=>(Number(u?.updatedAt)||0)-(Number(y?.updatedAt)||0)),a=Gs([...E.recentSessionHistory],s).map(ds),r=Gs([...E.recentEventTimeline],Math.max(s*3,s)).map(Jr),l={activeSessions:$r(o),recentSessionHistory:$r(a)},c={activeSessions:Or(o),recentSessionHistory:Or(a)},d=bd({summary:{listenerSettings:_e()},activeSessions:o,recentSessionHistory:a,lastEventDebugSnapshot:E.lastEventDebugSnapshot,lastAutoTriggerSnapshot:E.lastAutoTriggerSnapshot});return{summary:{generationTraceId:h.gateState.lastGenerationTraceId||"",generationType:h.gateState.lastGenerationType||"",generationDryRun:!!h.gateState.lastGenerationDryRun,generationStartedAt:i?.startedAt||0,generationEndedAt:h.gateState.lastGenerationAt||0,isGenerating:!!h.gateState.isGenerating,baselineMessageCount:i?.messageCount||0,baselineAssistantId:i?.lastAssistantMessageId||"",uiTransitionGuardActive:no(),uiTransitionGuardUntil:h.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:h.gateState.lastUiTransitionSource||"",activeSessionCount:E.messageSessions.size,pendingTimerCount:E.pendingMessageTimers.size,lastHandledMessageKey:E.lastHandledMessageKey||"",lastHandledExecutionKey:E.lastHandledExecutionKey||"",lastDuplicateMessageKey:E.lastDuplicateMessageKey||"",lastDuplicateExecutionKey:E.lastDuplicateExecutionKey||"",handledExecutionKeyCount:E.handledExecutionKeys.size,recentHandledExecutionKeys:n,lastGenerationMessageBindingSource:E.lastExecutionContext?.generationMessageBindingSource||"",lastConfirmedAssistantSwipeId:E.lastExecutionContext?.confirmedAssistantSwipeId||"",lastEffectiveSwipeId:E.lastExecutionContext?.effectiveSwipeId||"",lastConfirmedAssistantMessageId:E.lastExecutionContext?.confirmedAssistantMessageId||"",registeredEvents:Array.from(E.listeners.keys()),listenerSettings:_e(),eventBridge:Vr(),gateState:qr(),phaseCounts:l,consistency:c,verdictHints:d,...Ct()},activeSessions:o,recentSessionHistory:a,recentEventTimeline:r,recentHandledExecutionKeys:n,verdictHints:d,lastEventDebugSnapshot:ds(E.lastEventDebugSnapshot),lastAutoTriggerSnapshot:ds(E.lastAutoTriggerSnapshot)}}function Kn(t={}){let e=Ns(t);return JSON.parse(JSON.stringify({exportedAt:Date.now(),schemaVersion:"auto-trigger-diagnostics.v1",...e}))}function Id(t={}){return Ns(t)}function Rd(t={}){return Kn(t)}async function Xi(){if(h.isInitialized){j("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316"),F("info","\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316\uFF0C\u8DF3\u8FC7\u91CD\u590D\u521D\u59CB\u5316");return}let t=lt();if(!t){j("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),F("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!1,hasEventTypes:!1}),setTimeout(Xi,1e3);return}let e=await Lc(),s=e?.eventSource||Un(),n=e?.eventTypes||zn();if(!s){j("\u65E0\u6CD5\u83B7\u53D6SillyTavern\u4E8B\u4EF6\u6E90\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),F("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,importError:ce.importError?.message||""}),setTimeout(Xi,1e3);return}F("info","\u5F00\u59CB\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,listenerSettings:_e()}),F("info","\u4F7F\u7528\u4E8B\u4EF6\u6E90",{source:e?.source||ce.source||"unknown"}),Pc(),rt(M.MESSAGE_SENT,async i=>{let a=(await oo({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(r=>r.role==="user").pop();Rt({lastUserSendIntentAt:Date.now(),lastUserIntentSource:"message_sent",lastUserMessageId:i,lastUserMessageAt:Date.now(),lastUserMessageText:a?.content||h.gateState.lastUserMessageText||""}),j(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${i}`),F("info","\u8BB0\u5F55\u7528\u6237\u53D1\u9001\u610F\u56FE",{messageId:i,lastUserMessage:a?.content||""}),Ht({kind:"gate_event",eventType:M.MESSAGE_SENT,messageId:i,phase:"user_intent_recorded",detail:"message_sent"})}),rt(M.GENERATION_STARTED,async(i,o,a)=>{let r=Date.now(),l=ys("generation"),c=Kr(i,o||null),d=Hc(i,o||null,r),u=d.startedByUserIntent,y=d.userIntentDetectedAt,p=d.userIntentSource,S=d.userIntentDetail,b=Yc({traceId:l,startedAt:r,type:i,params:o||null,rawGenerationType:c.rawGenerationType,rawGenerationParams:c.rawGenerationParams,normalizedGenerationType:c.normalizedGenerationType,generationAction:c.generationAction,generationActionSource:c.generationActionSource,explicitGenerationAction:c.explicitGenerationAction,dryRun:!!a,startedByUserIntent:u,userIntentDetectedAt:y,userIntentSource:p,userIntentDetail:S,baselineResolved:!1,provisional:!0,baselineSource:"generation_started_sync_provisional"});Rt({lastGenerationTraceId:l,lastGenerationType:c.rawGenerationType||i,lastGenerationParams:o||null,lastNormalizedGenerationType:c.normalizedGenerationType||"",lastGenerationAction:c.generationAction||"",lastGenerationActionSource:c.generationActionSource||"",lastGenerationDryRun:!!a,isGenerating:!0,lastGenerationBaseline:b}),j(`\u751F\u6210\u5F00\u59CB: ${i}`),F("info","\u6536\u5230\u751F\u6210\u5F00\u59CB\u4E8B\u4EF6",{type:i,dryRun:!!a,params:o||null,generationAction:c.generationAction,generationActionSource:c.generationActionSource,traceId:l,startedByUserIntent:u,userIntentSource:p,userIntentDetail:S,baseline:b}),Ht({kind:"generation_event",eventType:M.GENERATION_STARTED,traceId:l,phase:"generation_started",detail:c.generationAction||eo(i,o||null),generationTraceId:l,baselineResolved:!1,generationStartedByUserIntent:u,generationUserIntentSource:p}),jc({traceId:l,startedAt:r,type:i,params:o||null,rawGenerationType:c.rawGenerationType,rawGenerationParams:c.rawGenerationParams,normalizedGenerationType:c.normalizedGenerationType,generationAction:c.generationAction,generationActionSource:c.generationActionSource,explicitGenerationAction:c.explicitGenerationAction,dryRun:!!a,startedByUserIntent:u,userIntentDetectedAt:y,userIntentSource:p,userIntentDetail:S,baselineResolved:!0,provisional:!1,baselineResolutionAt:Date.now(),baselineSource:"generation_started_async_resolved"}).then(P=>{let $=h.gateState.lastGenerationBaseline;if(!$||$.traceId!==l){F("info","generation baseline \u5DF2\u8FC7\u671F\uFF0C\u653E\u5F03\u56DE\u586B",{traceId:l,currentTraceId:$?.traceId||""});return}Rt({lastGenerationBaseline:P}),F("info","generation baseline \u5DF2\u5B8C\u6210\u89E3\u6790",{traceId:l,baseline:P}),Ht({kind:"generation_baseline",eventType:M.GENERATION_STARTED,traceId:l,phase:"baseline_resolved",detail:P?.baselineSource||"generation_started_async_resolved",generationTraceId:l,baselineResolved:!0,generationStartedByUserIntent:P?.startedByUserIntent,generationUserIntentSource:P?.userIntentSource||""})}).catch(P=>{let $=h.gateState.lastGenerationBaseline;if(!$||$.traceId!==l)return;let W={...$,baselineResolved:!0,baselineResolutionAt:Date.now(),provisional:!1,baselineSource:"generation_started_async_failed_fallback"};Rt({lastGenerationBaseline:W}),F("warn","generation baseline \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u56DE\u9000\u5230 provisional baseline",{traceId:l,error:P?.message||String(P),baseline:W}),Ht({kind:"generation_baseline",eventType:M.GENERATION_STARTED,traceId:l,phase:"baseline_fallback",reason:"generation_baseline_async_failed",detail:P?.message||String(P),generationTraceId:l,baselineResolved:!0,generationStartedByUserIntent:W?.startedByUserIntent,generationUserIntentSource:W?.userIntentSource||""})})}),rt(M.GENERATION_ENDED,()=>{Rt({lastGenerationAt:Date.now(),isGenerating:!1}),j("\u751F\u6210\u7ED3\u675F"),F("info","\u6536\u5230\u751F\u6210\u7ED3\u675F\u4E8B\u4EF6"),Ht({kind:"generation_event",eventType:M.GENERATION_ENDED,traceId:h.gateState.lastGenerationTraceId||"",phase:"generation_ended",generationTraceId:h.gateState.lastGenerationTraceId||"",detail:h.gateState.lastGenerationAction||h.gateState.lastNormalizedGenerationType||""})}),rt(M.CHAT_CHANGED,i=>{Dr(M.CHAT_CHANGED),Pr("chat_changed"),F("info","\u6536\u5230\u804A\u5929\u5207\u6362\u4E8B\u4EF6",{data:i??null}),Ht({kind:"ui_guard",eventType:M.CHAT_CHANGED,phase:"ui_transition_guard_entered",detail:"chat_changed"})}),rt(M.CHAT_CREATED,i=>{Dr(M.CHAT_CREATED),Pr("chat_created"),F("info","\u6536\u5230\u804A\u5929\u521B\u5EFA\u4E8B\u4EF6",{data:i??null}),Ht({kind:"ui_guard",eventType:M.CHAT_CREATED,phase:"ui_transition_guard_entered",detail:"chat_created"})}),ea(),h.isInitialized=!0,j("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210"),F("info","\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210",{listenerSettings:_e()})}function Cd(t){h.debugMode=t}var M,h,Ac,ce,D,jt,H,Br,wc,Cr,Ic,Rc,Mr,Lr,Cc,Cn,E,yo=X(()=>{we();Cs();os();ji();et();M={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},h={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastNormalizedGenerationType:"",lastGenerationAction:"",lastGenerationActionSource:"",lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""},isInitialized:!1,debugMode:!1},Ac="/script.js",ce={eventSource:null,eventTypes:null,source:"",scriptModule:null,loadingPromise:null,importError:null},D={LISTENER_DISABLED:"listener_disabled",QUIET_GENERATION:"quiet_generation",DRY_RUN_GENERATION:"dry_run_generation",IGNORED_AUTO_TRIGGER:"ignored_auto_trigger",UNRELATED_UI_EVENT:"ui_side_effect_event",SPECULATIVE_FALLBACK_WITHOUT_MESSAGE:"speculative_generation_after_commands",NO_CONFIRMED_ASSISTANT_MESSAGE:"no_confirmed_assistant_message",HISTORICAL_REPLAY_MESSAGE_RECEIVED:"historical_replay_message_received",MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION:"message_received_outside_active_generation",NON_ASSISTANT_MESSAGE:"non_assistant_message",MISSING_AI_MESSAGE:"missing_ai_message",DUPLICATE_MESSAGE:"duplicate_message",NO_ELIGIBLE_TOOLS:"no_eligible_tools",TOOL_DISABLED:"tool_disabled"},jt={AUTO_POST_RESPONSE_API:"auto_post_response_api",MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"},H={RECEIVED:"received",SCHEDULED:"scheduled",DISPATCHING:"dispatching",HANDLING:"handling",COMPLETED:"completed",SKIPPED:"skipped",IGNORED:"ignored"},Br=15e3,wc=1500,Cr=1800,Ic=5e3,Rc=6e4,Mr=new Set(["reroll","regenerate","swipe"]),Lr=new Set(["reroll","regenerate","swipe"]),Cc=["type","action","name","mode","source","reason","kind","command","operation","event","trigger","generationType","generation_type","regenType","regen_type"],Cn=null;E={initialized:!1,listeners:new Map,messageSessions:new Map,handledExecutionKeys:new Map,recentSessionHistory:[],recentEventTimeline:[],lastExecutionContext:null,lastHandledMessageKey:"",lastHandledExecutionKey:"",pendingMessageTimers:new Map,lastAutoTriggerSnapshot:null,lastEventDebugSnapshot:null,lastDuplicateMessageKey:"",lastDuplicateExecutionKey:"",lastDuplicateMessageAt:0}});var ia={};fe(ia,{TOOL_CONFIG_PANEL_STYLES:()=>na,createToolConfigPanel:()=>Mt,default:()=>Md});function Mt(t){let{id:e,toolId:s,postResponseHint:n,extractionPlaceholder:i,previewDialogId:o,previewTitle:a="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let r=de(this.toolId);if(!r)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=r.output?.apiPreset||r.apiPreset||"",d=this._getBypassPresets(),u=r.output?.mode||"follow_ai",y=r.bypass?.enabled||!1,p=r.bypass?.presetId||"",S=r.runtime?.lastStatus||"idle",b=r.runtime?.lastRunAt?new Date(r.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",P=r.runtime?.lastError||"",$=r.extraction||{},W=Array.isArray($.selectors)?$.selectors.join(`
`):"",I=u==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",T=Ns({historyLimit:8}),m=this._buildDiagnosticsHtml(r.runtime||{},T),z=u==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",G=c||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${w(r.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${w(r.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${w(z)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${w(G)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${w(S)}</span>
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
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${I}</div>
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
                ${l.map(A=>`
                  <option value="${w(A.name)}" ${A.name===c?"selected":""}>
                    ${w(A.name)}
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
                <input type="checkbox" id="${f}-tool-bypass-enabled" ${y?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${y?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${f}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${d.map(A=>`
                  <option value="${w(A.id)}" ${A.id===p?"selected":""}>
                    ${w(A.name)}${A.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="number" class="yyt-input" id="${f}-tool-max-messages" min="1" max="50" value="${Number($.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${f}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${w(i)}">${w(W)}</textarea>
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
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${w(r.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${w(S)}">${w(S)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${w(b)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${r.runtime?.successCount||0} / ${r.runtime?.errorCount||0}</span>
                </div>
                ${P?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${w(P)}</span>
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

          ${m}
        </div>
      `},_formatDiagnosticValue(r,l="\u672A\u8BB0\u5F55"){let c=String(r||"").trim();return w(c||l)},_formatDiagnosticTime(r){let l=Number(r)||0;return l>0?new Date(l).toLocaleString():"\u672A\u8BB0\u5F55"},_formatSkipReason(r){return{listener_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u81EA\u52A8\u76D1\u542C\u5DF2\u5173\u95ED",quiet_generation:"\u5DF2\u8DF3\u8FC7\uFF1Aquiet / dryRun \u751F\u6210",dry_run_generation:"\u5DF2\u8DF3\u8FC7\uFF1A\u5F53\u524D generation \u4E3A dryRun",ignored_auto_trigger:"\u5DF2\u8DF3\u8FC7\uFF1A\u76D1\u542C\u5668\u8BBE\u7F6E\u5FFD\u7565\u4E86\u975E\u7528\u6237\u610F\u56FE\u751F\u6210",ui_side_effect_event:"\u5DF2\u5FFD\u7565\uFF1A\u5BBF\u4E3B UI \u526F\u4F5C\u7528\u4E8B\u4EF6",speculative_generation_after_commands:"\u5DF2\u5FFD\u7565\uFF1A\u4EC5\u8BB0\u5F55 GENERATION_AFTER_COMMANDS \u89C2\u5BDF\u6001 session",no_confirmed_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u786E\u8BA4\u5230\u5F53\u524D\u697C\u5C42 / \u5F53\u524D swipe \u7684\u53EF\u5904\u7406 assistant \u72B6\u6001",historical_replay_message_received:"\u5DF2\u62E6\u622A\uFF1A\u5386\u53F2 assistant \u6D88\u606F\u91CD\u653E\u4E8B\u4EF6",message_received_outside_active_generation:"\u5DF2\u62E6\u622A\uFF1AMESSAGE_RECEIVED \u4E0D\u5C5E\u4E8E\u5F53\u524D\u751F\u6210\u7A97\u53E3",non_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u7684\u5E76\u975E AI \u697C\u5C42",missing_ai_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D",duplicate_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD",no_eligible_tools:"\u5DF2\u8DF3\u8FC7\uFF1A\u6CA1\u6709\u547D\u4E2D\u53EF\u6267\u884C\u5DE5\u5177",tool_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u5DE5\u5177\u672A\u542F\u7528",generation_after_commands_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AGENERATION_AFTER_COMMANDS \u515C\u5E95\u5DF2\u5173\u95ED",message_received_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AMESSAGE_RECEIVED \u515C\u5E95\u5DF2\u5173\u95ED"}[r]||r||"\u65E0"},_formatExecutionPath(r){return{auto_post_response_api:"\u81EA\u52A8\u94FE\uFF1Apost_response_api",manual_post_response_api:"\u624B\u52A8\u94FE\uFF1Apost_response_api",manual_compatibility:"\u624B\u52A8\u94FE\uFF1Acompatibility \u56DE\u9000"}[r]||r||"\u672A\u8BB0\u5F55"},_formatCommitMethod(r){return{setChatMessages:"setChatMessages",setChatMessage:"setChatMessage",local_only:"local_only",none:"none"}[r]||r||"\u672A\u8BB0\u5F55"},_formatWritebackStatus(r){return{success:"\u5199\u56DE\u6210\u529F",failed:"\u5199\u56DE\u5931\u8D25",skipped_empty_output:"\u65E0\u8F93\u51FA\uFF0C\u8DF3\u8FC7\u5199\u56DE",not_applicable:"\u4E0D\u9002\u7528"}[r]||r||"\u672A\u8BB0\u5F55"},_formatFailureStage(r){return{build_messages:"\u6784\u9020\u8BF7\u6C42\u6D88\u606F",send_api_request:"\u53D1\u9001 API \u8BF7\u6C42",extract_output:"\u63D0\u53D6\u5DE5\u5177\u8F93\u51FA",inject_context:"\u5199\u56DE\u4E0A\u4E0B\u6587",compatibility_execute:"\u517C\u5BB9\u6267\u884C\u5165\u53E3",unknown:"\u672A\u77E5\u9636\u6BB5"}[r]||r||"\u65E0"},_formatBooleanState(r){return r?"\u662F":"\u5426"},_formatHandledExecutionKeysText(r=[]){let l=Array.isArray(r)?r.filter(Boolean):[];return l.length?l.slice(-3).map(c=>String(c?.executionKey||"").trim()||"\u672A\u8BB0\u5F55").join(" / "):"\u65E0"},_formatHistoryTime(r){return this._formatDiagnosticTime(r)},_formatPhaseCountsText(r={}){let l=Object.entries(r||{}).filter(([,c])=>Number(c)>0);return l.length?l.map(([c,d])=>`${c}:${d}`).join(" / "):"\u65E0"},_formatEventBridgeText(r={}){if(!r||r.ready!==!0)return"\u672A\u5C31\u7EEA";let l=String(r.source||"").trim();return l?`\u5DF2\u5C31\u7EEA\uFF08${l}\uFF09`:"\u5DF2\u5C31\u7EEA"},_formatVerdictHintLabel(r=""){return{a10BaselineRaceSuspicious:"A10 baseline",a11ReplaySuspicious:"A11 replay",a12UserIntentSuspicious:"A12 user intent",a13AutoTriggerLeakSuspicious:"A13 auto trigger"}[r]||r||"\u672A\u77E5\u9879"},_buildVerdictHintsHtml(r={}){let l=Object.entries(r||{});return l.length?`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">N1 \u5FEB\u901F\u5224\u8BFB</div>
          <div class="yyt-tool-debug-chip-list">
            ${l.map(([c,d])=>{let u=!!d?.flagged,y=Array.isArray(d?.reasons)?d.reasons.filter(Boolean):[],p=y.length?w(y.join(" | ")):"\u672A\u89C1\u660E\u663E\u53EF\u7591\u4FE1\u53F7";return`
                <span class="yyt-tool-debug-chip ${u?"yyt-tool-debug-chip-warning":"yyt-tool-debug-chip-ok"}" title="${p}">
                  ${w(this._formatVerdictHintLabel(c))}
                  <strong>${u?"\u53EF\u7591":"\u6B63\u5E38"}</strong>
                </span>
              `}).join("")}
          </div>
        </div>
      `:""},_buildTimelineSection(r,l=[]){let c=Array.isArray(l)?l.filter(Boolean).slice().reverse():[];if(!c.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${w(r)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let d=c.map(u=>{let y=this._formatDiagnosticValue(u.eventType||u.kind,"\u672A\u8BB0\u5F55"),p=this._formatDiagnosticValue(u.traceId,"\u65E0"),S=this._formatDiagnosticValue(u.sessionKey,"\u65E0"),b=[u.phase?`\u9636\u6BB5\uFF1A${u.phase}`:"",u.messageId?`\u6D88\u606F\uFF1A${u.messageId}`:"",u.executionKey?`execution\uFF1A${u.executionKey}`:"",u.confirmationSource?`\u786E\u8BA4\uFF1A${u.confirmationSource}`:"",u.reason?`\u539F\u56E0\uFF1A${this._formatSkipReason(u.reason)}`:"",u.detail?`\u8BE6\u60C5\uFF1A${u.detail}`:""].filter(Boolean);return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${w(this._formatHistoryTime(u.at))}</span>
              <span>${y}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              trace\uFF1A${p}<br>
              session\uFF1A${S}<br>
              ${w(b.join(" / ")||"\u65E0\u9644\u52A0\u8BE6\u60C5")}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${w(r)}</div>
          <div class="yyt-tool-debug-history-list">${d}</div>
        </div>
      `},_copyText(r){let l=String(r||"");if(!l)return!1;try{if(navigator?.clipboard?.writeText)return navigator.clipboard.writeText(l),!0}catch{}try{let c=document.createElement("textarea");c.value=l,c.setAttribute("readonly","readonly"),c.style.position="fixed",c.style.opacity="0",document.body.appendChild(c),c.select();let d=document.execCommand("copy");return document.body.removeChild(c),d}catch{return!1}},_copyAutoTriggerDiagnostics(){try{let r=Kn({historyLimit:8});this._copyText(JSON.stringify(r,null,2))?v("success","\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u5DF2\u590D\u5236"):v("warning","\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u5728\u63A7\u5236\u53F0\u5BFC\u51FA")}catch(r){v("error",r?.message||"\u5BFC\u51FA\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u5931\u8D25")}},_buildHistorySection(r,l=[],c="trigger"){let d=Array.isArray(l)?l.filter(Boolean).slice().reverse():[];if(!d.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${w(r)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let u=d.map(y=>{let p=this._formatDiagnosticValue(y.eventType,"\u672A\u8BB0\u5F55"),S=this._formatDiagnosticValue(y.messageKey||y.messageId,"\u672A\u8BB0\u5F55"),b=this._formatDiagnosticValue(y.traceId,"\u65E0"),P=this._formatDiagnosticValue(y.executionKey,"\u65E0"),$=c==="writeback"?`\u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(y.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(y.writebackStatus)} / \u5185\u5BB9\u63D0\u4EA4\uFF1A${this._formatBooleanState(y.contentCommitted)} / \u5BBF\u4E3B\u63D0\u4EA4\uFF1A${this._formatBooleanState(y.hostCommitApplied)} / \u4E3B\u63D0\u4EA4\uFF1A${this._formatCommitMethod(y.preferredCommitMethod)} / \u5B9E\u9645\u63D0\u4EA4\uFF1A${this._formatCommitMethod(y.appliedCommitMethod)} / \u5237\u65B0\u8BF7\u6C42\uFF1A${this._formatBooleanState(y.refreshRequested)} / \u5237\u65B0\u786E\u8BA4\uFF1A${this._formatBooleanState(y.refreshConfirmed)} / \u5237\u65B0\u901A\u9053\uFF1A${y.refreshMethodCount??0} / \u786E\u8BA4\u8F6E\u6570\uFF1A${y.refreshConfirmChecks??0} / \u5931\u8D25\u9636\u6BB5\uFF1A${this._formatFailureStage(y.failureStage)}`:`\u8DF3\u8FC7\u539F\u56E0\uFF1A${this._formatSkipReason(y.skipReason)} / \u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(y.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(y.writebackStatus)}`;return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${w(this._formatHistoryTime(y.at))}</span>
              <span>trace ${b}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              \u4E8B\u4EF6\uFF1A${p}<br>
              \u6D88\u606F\uFF1A${S}<br>
              execution\uFF1A${P}<br>
              ${w($)}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${w(r)}</div>
          <div class="yyt-tool-debug-history-list">${u}</div>
        </div>
      `},_buildDiagnosticsHtml(r,l=null){let c=r||{},d=l||null,u=d?.summary||{},y=d?.lastEventDebugSnapshot||{},p=d?.lastAutoTriggerSnapshot||{},S=!!(Array.isArray(d?.activeSessions)&&d.activeSessions.length>0||Array.isArray(d?.recentSessionHistory)&&d.recentSessionHistory.length>0||Array.isArray(d?.recentEventTimeline)&&d.recentEventTimeline.length>0||u?.activeSessionCount||u?.pendingTimerCount||u?.lastHandledMessageKey||u?.lastHandledExecutionKey||u?.handledExecutionKeyCount||u?.eventBridge?.ready);if(!!!(c.lastTriggerAt||c.lastTriggerEvent||c.lastMessageKey||c.lastExecutionKey||c.lastSkipReason||c.lastExecutionPath||c.lastWritebackStatus||c.lastFailureStage||c.lastContentCommitted||c.lastHostCommitApplied||c.lastRefreshRequested||c.lastRefreshConfirmed||c.lastTraceId||Array.isArray(c.recentTriggerHistory)&&c.recentTriggerHistory.length>0||Array.isArray(c.recentWritebackHistory)&&c.recentWritebackHistory.length>0||S))return"";let P=[["\u6700\u8FD1\u89E6\u53D1\u65F6\u95F4",this._formatDiagnosticTime(c.lastTriggerAt)],["\u6700\u8FD1\u89E6\u53D1\u4E8B\u4EF6",this._formatDiagnosticValue(c.lastTriggerEvent)],["\u6700\u8FD1 Trace",this._formatDiagnosticValue(c.lastTraceId,"\u65E0")],["\u6700\u8FD1\u6D88\u606F\u952E",this._formatDiagnosticValue(c.lastMessageKey)],["\u6700\u8FD1 execution key",this._formatDiagnosticValue(c.lastExecutionKey)],["\u6700\u8FD1\u8DF3\u8FC7\u539F\u56E0",this._formatDiagnosticValue(this._formatSkipReason(c.lastSkipReason),"\u65E0")],["\u6700\u8FD1\u6267\u884C\u8DEF\u5F84",this._formatDiagnosticValue(this._formatExecutionPath(c.lastExecutionPath))],["\u6700\u8FD1\u5199\u56DE\u72B6\u6001",this._formatDiagnosticValue(this._formatWritebackStatus(c.lastWritebackStatus))],["\u6700\u8FD1\u5931\u8D25\u9636\u6BB5",this._formatDiagnosticValue(this._formatFailureStage(c.lastFailureStage),"\u65E0")],["\u6700\u8FD1\u5185\u5BB9\u63D0\u4EA4",this._formatDiagnosticValue(this._formatBooleanState(c.lastContentCommitted),"\u5426")],["\u6700\u8FD1\u5BBF\u4E3B\u63D0\u4EA4",this._formatDiagnosticValue(this._formatBooleanState(c.lastHostCommitApplied),"\u5426")],["\u6700\u8FD1\u4E3B\u63D0\u4EA4\u7B56\u7565",this._formatDiagnosticValue(this._formatCommitMethod(c.lastPreferredCommitMethod),"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5B9E\u9645\u63D0\u4EA4\u7B56\u7565",this._formatDiagnosticValue(this._formatCommitMethod(c.lastAppliedCommitMethod),"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5237\u65B0\u8BF7\u6C42",this._formatDiagnosticValue(this._formatBooleanState(c.lastRefreshRequested),"\u5426")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4",this._formatDiagnosticValue(this._formatBooleanState(c.lastRefreshConfirmed),"\u5426")],["\u6700\u8FD1\u5237\u65B0\u901A\u9053\u6570",this._formatDiagnosticValue(String(c.lastRefreshMethodCount??0),"0")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4\u8F6E\u6570",this._formatDiagnosticValue(String(c.lastRefreshConfirmChecks??0),"0")]],$=this._buildHistorySection("\u6700\u8FD1\u89E6\u53D1\u5386\u53F2",c.recentTriggerHistory||[],"trigger"),W=this._buildHistorySection("\u6700\u8FD1\u5199\u56DE\u5386\u53F2",c.recentWritebackHistory||[],"writeback"),I=S?[["\u5F53\u524D active / timers",`${u.activeSessionCount||0} / ${u.pendingTimerCount||0}`],["\u4E8B\u4EF6\u6865\u63A5",this._formatEventBridgeText(u.eventBridge)],["\u5F53\u524D generation \u52A8\u4F5C",this._formatDiagnosticValue(u.generationAction,"\u672A\u8BB0\u5F55")],["\u5F53\u524D\u539F\u59CB generation type",this._formatDiagnosticValue(u.rawGenerationType,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u697C\u5C42\u7ED1\u5B9A\u6765\u6E90",this._formatDiagnosticValue(u.lastGenerationMessageBindingSource,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u786E\u8BA4\u697C\u5C42",this._formatDiagnosticValue(u.lastConfirmedAssistantMessageId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u786E\u8BA4 swipe",this._formatDiagnosticValue(u.lastConfirmedAssistantSwipeId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 effective swipe",this._formatDiagnosticValue(u.lastEffectiveSwipeId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u786E\u8BA4\u6A21\u5F0F",this._formatDiagnosticValue(y.confirmationMode||p.confirmationMode,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u540C\u697C\u5C42 revision",this._formatDiagnosticValue(y.sameSlotRevisionConfirmed?`\u5DF2\u786E\u8BA4 (${y.sameSlotRevisionSource||"same_slot_revision"})`:y.sameSlotRevisionCandidate?`\u5019\u9009 (${y.sameSlotRevisionSource||"\u5F85\u786E\u8BA4"})`:"\u5426","\u5426")],["\u6700\u8FD1\u5904\u7406\u6D88\u606F\u952E",this._formatDiagnosticValue(u.lastHandledMessageKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5904\u7406 execution key",this._formatDiagnosticValue(u.lastHandledExecutionKey,"\u672A\u8BB0\u5F55")],["\u5DF2\u5904\u7406 execution key \u6570",this._formatDiagnosticValue(String(u.handledExecutionKeyCount??0),"0")],["\u6700\u8FD1 execution key \u8F68\u8FF9",this._formatDiagnosticValue(this._formatHandledExecutionKeysText(u.recentHandledExecutionKeys),"\u65E0")],["Active phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(u.phaseCounts?.activeSessions),"\u65E0")],["History phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(u.phaseCounts?.recentSessionHistory),"\u65E0")]]:[],T=S?this._buildVerdictHintsHtml(d?.verdictHints||u?.verdictHints||{}):"",m=S?this._buildTimelineSection("\u6700\u8FD1\u81EA\u52A8\u89E6\u53D1\u65F6\u95F4\u7EBF",(d?.recentEventTimeline||[]).slice(-6)):"";return`
        <details class="yyt-tool-debug-panel">
          <summary class="yyt-tool-debug-summary">\u6700\u8FD1\u89E6\u53D1\u8BCA\u65AD</summary>
          <div class="yyt-tool-debug-content">
            ${P.map(([z,G])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${z}</span>
                <span class="yyt-tool-runtime-value">${G}</span>
              </div>
            `).join("")}
            ${I.map(([z,G])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${z}</span>
                <span class="yyt-tool-runtime-value">${G}</span>
              </div>
            `).join("")}
            <div class="yyt-tool-debug-actions">
              <button class="yyt-btn yyt-btn-secondary yyt-btn-small" id="${f}-tool-copy-auto-trigger-diagnostics">
                <i class="fa-solid fa-copy"></i> \u590D\u5236\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD JSON
              </button>
            </div>
            ${T}
            ${$}
            ${W}
            ${m}
          </div>
        </details>
      `},_getApiPresets(){try{return Xt()||[]}catch{return[]}},_getBypassPresets(){try{return Ui()||[]}catch{return[]}},_getFormData(r){let l=de(this.toolId),c=r.find(`#${f}-tool-output-mode`).val()||"follow_ai",d=r.find(`#${f}-tool-bypass-enabled`).is(":checked"),u=c==="post_response_api",y=(r.find(`#${f}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(p=>p.trim()).filter(Boolean);return{enabled:l?.enabled!==!1,promptTemplate:r.find(`#${f}-tool-prompt-template`).val()||"",apiPreset:r.find(`#${f}-tool-api-preset`).val()||"",extractTags:y,trigger:{event:"GENERATION_ENDED",enabled:u},output:{mode:c,apiPreset:r.find(`#${f}-tool-api-preset`).val()||"",overwrite:!0,enabled:u},bypass:{enabled:d,presetId:d&&r.find(`#${f}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(r.find(`#${f}-tool-max-messages`).val(),10)||5),selectors:y}}},_showExtractionPreview(r,l){if(!Z())return;let d=`${f}-${o}`,u=Array.isArray(l.messageEntries)?l.messageEntries:[],y=u.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${u.map(p=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${p.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${w(p.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${w(p.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${w(p.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";r.append(ti({id:d,title:a,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${w((l.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${l.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${w(l.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${w(l.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${w(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${y}
        `})),si(r,d,{onSave:p=>p()}),r.find(`#${d}-save`).text("\u5173\u95ED"),r.find(`#${d}-cancel`).remove()},bindEvents(r){let l=Z();!l||!te(r)||(r.find(`#${f}-tool-output-mode`).on("change",()=>{let d=(r.find(`#${f}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";r.find(".yyt-tool-mode-hint").text(d)}),r.find(`#${f}-tool-bypass-enabled`).on("change",c=>{let d=l(c.currentTarget).is(":checked");r.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!d)}),r.find(`#${f}-tool-save, #${f}-tool-save-top`).on("click",()=>{this._saveConfig(r,{silent:!1})}),r.find(`#${f}-tool-reset-template`).on("click",()=>{let c=gn(this.toolId);c?.promptTemplate&&(r.find(`#${f}-tool-prompt-template`).val(c.promptTemplate),v("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),r.find(`#${f}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(r,{silent:!0}))try{let d=await uo(this.toolId);!d?.success&&d?.error&&Ze("warning",d.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(d){v("error",d?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(r)}}),r.find(`#${f}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(r,{silent:!0}))try{let d=await po(this.toolId);if(!d?.success){v("error",d?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(r,d)}catch(d){v("error",d?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),r.find(`#${f}-tool-copy-auto-trigger-diagnostics`).on("click",()=>{this._copyAutoTriggerDiagnostics()}))},_saveConfig(r,l={}){let c=this._getFormData(r),{silent:d=!1}=l,u=ot(this.toolId,c);return u?d||v("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):v("error","\u4FDD\u5B58\u5931\u8D25"),u},destroy(r){!Z()||!te(r)||r.find("*").off()},getStyles(){return na},renderTo(r){r.html(this.render({})),this.bindEvents(r,{})}}}var na,Md,Bs=X(()=>{et();os();Qs();Is();yo();na=`
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
`;Md=Mt});var Ve,go=X(()=>{Bs();Ve=Mt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var qe,fo=X(()=>{Bs();qe=Mt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var Je,mo=X(()=>{Bs();Je=Mt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var Wt,ho=X(()=>{we();Is();et();Wt={id:"bypassPanel",render(t){let e=V.getPresetList(),s=V.getDefaultPresetId();return`
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
          <span class="yyt-bypass-preset-name">${w(t.name)}</span>
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
      `;let e=V.getDefaultPresetId()===t.id,s=ft&&ft[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${w(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${w(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${w(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(s.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let n=e(s.currentTarget).data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let i=V.deletePreset(n);i.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),v("success","\u9884\u8BBE\u5DF2\u5220\u9664")):v("error",i?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let n=e(s.currentTarget).closest(".yyt-bypass-message"),i=n.data("messageId");n.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let i=await pt(n),o=V.importPresets(i);v(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(i){v("error",`\u5BFC\u5165\u5931\u8D25: ${i.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=V.exportPresets();ut(s,`bypass_presets_${Date.now()}.json`),v("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){v("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let n=V.getPreset(s);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(n)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,n=V.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,s),v("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):v("error",n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),n=s.data("presetId");if(!n)return;let i=s.find(".yyt-bypass-name-input").val().trim(),o=s.find("#yyt-bypass-description").val().trim();if(!i){v("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let a=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let r=V.updatePreset(n,{name:i,description:o,messages:a});r.success?(v("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):v("error",r?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let i=V.deletePreset(n);i.success?(this.renderTo(t),v("success","\u9884\u8BBE\u5DF2\u5220\u9664")):v("error",i?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let i=`bypass_${Date.now()}`,o=V.duplicatePreset(n,i);o.success?(this.renderTo(t),this._selectPreset(t,e,i),v("success","\u9884\u8BBE\u5DF2\u590D\u5236")):v("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");n&&(V.setDefaultPresetId(n),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),v("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(n))},_refreshPresetList(t,e){let s=V.getPresetList(),n=V.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(i=>this._renderPresetItem(i,i.id===n)).join(""))},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var aa={};fe(aa,{SettingsPanel:()=>bt,THEME_CONFIGS:()=>bo,applyTheme:()=>ra,applyUiPreferences:()=>So,default:()=>Dd});function Ls(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function oa(t=Ls()){return t?.documentElement||document.documentElement}function ra(t,e=Ls()){let s=oa(e),n={...kd,...bo[t]||bo["dark-blue"]};Object.entries(n).forEach(([i,o])=>{s.style.setProperty(i,o)}),s.setAttribute("data-yyt-theme",t)}function So(t={},e=Ls()){let s=oa(e),{theme:n="dark-blue",compactMode:i=!1,animationEnabled:o=!0}=t||{};ra(n,e),s.classList.toggle("yyt-compact-mode",!!i),s.classList.toggle("yyt-no-animation",!o)}var kd,bo,bt,Dd,Hn=X(()=>{we();Cs();et();kd={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},bo={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};bt={id:"settingsPanel",render(t){let e=Ne.getSettings(),s=e.listener?.listenGenerationEnded!==!1,n=e.debug?.enableDebugLog===!0;return`
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
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(t.find(".yyt-settings-tab").on("click",n=>{let i=s(n.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(n.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${i}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ne.resetSettings(),So(Rs.ui,Ls()),this.renderTo(t),v("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300,useGenerationAfterCommandsFallback:t.find("#yyt-setting-useGenerationAfterCommandsFallback").is(":checked"),useMessageReceivedFallback:t.find("#yyt-setting-useMessageReceivedFallback").is(":checked"),messageSessionWindowMs:parseInt(t.find("#yyt-setting-messageSessionWindowMs").val())||1800,historyRetentionLimit:parseInt(t.find("#yyt-setting-historyRetentionLimit").val())||10},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ne.saveSettings(s),So(s.ui,Ls()),v("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Dd=bt});var ga={};fe(ga,{ApiPresetPanel:()=>Ke,BypassPanel:()=>Wt,RegexExtractPanel:()=>He,SCRIPT_ID:()=>f,SettingsPanel:()=>bt,StatusBlockPanel:()=>qe,SummaryToolPanel:()=>Ve,ToolManagePanel:()=>je,UIManager:()=>hs,YouyouReviewPanel:()=>Je,bindDialogEvents:()=>si,createDialogHtml:()=>ti,default:()=>Pd,downloadJson:()=>ut,escapeHtml:()=>w,fillFormWithConfig:()=>Pt,getAllStyles:()=>ya,getFormApiConfig:()=>Tt,getJQuery:()=>Z,initUI:()=>Us,isContainerValid:()=>te,readFileContent:()=>pt,registerComponents:()=>gs,renderApiPanel:()=>jn,renderBypassPanel:()=>ua,renderRegexPanel:()=>Yn,renderSettingsPanel:()=>pa,renderStatusBlockPanel:()=>ca,renderSummaryToolPanel:()=>la,renderToolPanel:()=>Wn,renderYouyouReviewPanel:()=>da,resetJQueryCache:()=>Ha,showToast:()=>v,showTopNotice:()=>Ze,uiManager:()=>pe});function gs(){pe.register(Ke.id,Ke),pe.register(He.id,He),pe.register(je.id,je),pe.register(Ve.id,Ve),pe.register(qe.id,qe),pe.register(Je.id,Je),pe.register(Wt.id,Wt),pe.register(bt.id,bt),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function Us(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...n}=t;pe.init(n),gs(),e&&pe.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function kt(t,e,s={}){pe.render(t,e,s)}function jn(t){kt(Ke.id,t)}function Yn(t){kt(He.id,t)}function Wn(t){kt(je.id,t)}function la(t){kt(Ve.id,t)}function ca(t){kt(qe.id,t)}function da(t){kt(Je.id,t)}function ua(t){kt(Wt.id,t)}function pa(t){kt(bt.id,t)}function ya(){return pe.getAllStyles()}var Pd,xo=X(()=>{ni();hi();_i();Bi();go();fo();mo();ho();Hn();et();ni();hi();_i();Bi();go();fo();mo();ho();Hn();Pd={uiManager:pe,ApiPresetPanel:Ke,RegexExtractPanel:He,ToolManagePanel:je,SummaryToolPanel:Ve,StatusBlockPanel:qe,YouyouReviewPanel:Je,BypassPanel:Wt,SettingsPanel:bt,registerComponents:gs,initUI:Us,renderApiPanel:jn,renderRegexPanel:Yn,renderToolPanel:Wn,renderSummaryToolPanel:la,renderStatusBlockPanel:ca,renderYouyouReviewPanel:da,renderBypassPanel:ua,renderSettingsPanel:pa,getAllStyles:ya}});var Ea={};fe(Ea,{ApiPresetPanel:()=>Ke,RegexExtractPanel:()=>He,SCRIPT_ID:()=>f,StatusBlockPanel:()=>qe,SummaryToolPanel:()=>Ve,ToolManagePanel:()=>je,YouyouReviewPanel:()=>Je,default:()=>Gd,escapeHtml:()=>w,fillFormWithConfig:()=>Pt,getCurrentTab:()=>va,getFormApiConfig:()=>Tt,getJQuery:()=>Z,getRegexStyles:()=>Sa,getStyles:()=>ba,getToolStyles:()=>xa,initUI:()=>Us,isContainerValid:()=>te,registerComponents:()=>gs,render:()=>fa,renderRegex:()=>ma,renderTool:()=>ha,setCurrentTab:()=>Ta,showToast:()=>v,uiManager:()=>pe});function vo(t,e){let s=Z();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function fa(t){if(zs=vo(t,zs),!zs||!zs.length){console.error("[YouYouToolkit] Container not found or invalid");return}jn(zs)}function ma(t){if(Fs=vo(t,Fs),!Fs||!Fs.length){console.error("[YouYouToolkit] Regex container not found");return}Yn(Fs)}function ha(t){if(Ks=vo(t,Ks),!Ks||!Ks.length){console.error("[YouYouToolkit] Tool container not found");return}Wn(Ks)}function ba(){return Ke.getStyles()}function Sa(){return He.getStyles()}function xa(){return[je.getStyles(),Ve.getStyles(),qe.getStyles(),Je.getStyles()].join(`
`)}function va(){return pe.getCurrentTab()}function Ta(t){pe.switchTab(t)}var zs,Fs,Ks,Gd,_a=X(()=>{xo();zs=null,Fs=null,Ks=null;Gd={render:fa,renderRegex:ma,renderTool:ha,getStyles:ba,getRegexStyles:Sa,getToolStyles:xa,getCurrentTab:va,setCurrentTab:Ta,uiManager:pe,ApiPresetPanel:Ke,RegexExtractPanel:He,ToolManagePanel:je,SummaryToolPanel:Ve,StatusBlockPanel:qe,YouyouReviewPanel:Je,registerComponents:gs,initUI:Us,SCRIPT_ID:f,escapeHtml:w,showToast:v,getJQuery:Z,isContainerValid:te,getFormApiConfig:Tt,fillFormWithConfig:Pt}});var Aa={};fe(Aa,{DEFAULT_PROMPT_SEGMENTS:()=>Vn,PromptEditor:()=>qn,default:()=>Fd,getPromptEditorStyles:()=>Bd,messagesToSegments:()=>zd,segmentsToMessages:()=>Ud,validatePromptSegments:()=>Ld});function Bd(){return`
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
  `}function Ld(t){let e=[];return Array.isArray(t)?(t.forEach((s,n)=>{s.id||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${n+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function Ud(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function zd(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Vn]}var $d,Od,Nd,Vn,qn,Fd,wa=X(()=>{$d="youyou_toolkit_prompt_editor",Od={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Nd={system:"fa-server",ai:"fa-robot",user:"fa-user"},Vn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],qn=class{constructor(e={}){this.containerId=e.containerId||$d,this.segments=e.segments||[...Vn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Vn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=Od[e.type]||e.type,n=Nd[e.type]||"fa-file",i=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,a=i?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",r=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${i?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${a?`border-left: 3px solid ${a};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${n}"></i>
            <span class="yyt-prompt-segment-title">${s}</span>
            <div class="yyt-prompt-segment-badges">
              ${l}
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:n})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:n})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,n=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=s),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(i=>i.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let n=this.segments.find(i=>i.id===e);n&&(Object.assign(n,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let n=s.target.files[0];if(!n)return;let i=new FileReader;i.onload=o=>{try{let a=JSON.parse(o.target.result);Array.isArray(a)?(this.setSegments(a),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",a)}},i.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};Fd=qn});var To={};fe(To,{WindowManager:()=>Jn,closeWindow:()=>Yd,createWindow:()=>jd,windowManager:()=>Be});function Hd(){if(Be.stylesInjected)return;Be.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=Kd+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function jd(t){let{id:e,title:s="\u7A97\u53E3",content:n="",width:i=900,height:o=700,modal:a=!1,resizable:r=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:y}=t;Hd();let p=window.jQuery||window.parent?.jQuery;if(!p)return console.error("[WindowManager] jQuery not available"),null;if(Be.isOpen(e))return Be.bringToFront(e),Be.getWindow(e);let S=window.innerWidth||1200,b=window.innerHeight||800,P=S<=1100,$=null,W=!1;d&&($=Be.getState(e),$&&!P&&(W=!0));let I,T;W&&$.width&&$.height?(I=Math.max(400,Math.min($.width,S-40)),T=Math.max(300,Math.min($.height,b-40))):(I=Math.max(400,Math.min(i,S-40)),T=Math.max(300,Math.min(o,b-40)));let m=Math.max(20,Math.min((S-I)/2,S-I-20)),z=Math.max(20,Math.min((b-T)/2,b-T-20)),G=l&&!P,A=`
    <div class="yyt-window" id="${e}" style="left:${m}px; top:${z}px; width:${I}px; height:${T}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Wd(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${G?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,N=null;a&&(N=p(`<div class="yyt-window-overlay" data-for="${e}"></div>`),p(document.body).append(N));let _=p(A);p(document.body).append(_),Be.register(e,_),_.on("mousedown",()=>Be.bringToFront(e));let O=!1,ue={left:m,top:z,width:I,height:T},xe=()=>{ue={left:parseInt(_.css("left")),top:parseInt(_.css("top")),width:_.width(),height:_.height()},_.addClass("maximized"),_.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),O=!0},ve=()=>{_.removeClass("maximized"),_.css({left:ue.left+"px",top:ue.top+"px",width:ue.width+"px",height:ue.height+"px"}),_.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),O=!1};_.find(".yyt-window-btn.maximize").on("click",()=>{O?ve():xe()}),(P&&l||W&&$.isMaximized&&l||c&&l)&&xe(),_.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let ye={width:O?ue.width:_.width(),height:O?ue.height:_.height(),isMaximized:O};Be.saveState(e,ye)}u&&u(),N&&N.remove(),_.remove(),Be.unregister(e),p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),N&&N.on("click",ye=>{ye.target,N[0]});let Le=!1,ze,Xe,Ge,ct;if(_.find(".yyt-window-header").on("mousedown",ye=>{p(ye.target).closest(".yyt-window-controls").length||O||(Le=!0,ze=ye.clientX,Xe=ye.clientY,Ge=parseInt(_.css("left")),ct=parseInt(_.css("top")),p(document.body).css("user-select","none"))}),p(document).on("mousemove.yytWindowDrag"+e,ye=>{if(!Le)return;let ge=ye.clientX-ze,St=ye.clientY-Xe;_.css({left:Math.max(0,Ge+ge)+"px",top:Math.max(0,ct+St)+"px"})}),p(document).on("mouseup.yytWindowDrag"+e,()=>{Le&&(Le=!1,p(document.body).css("user-select",""))}),r){let ye=!1,ge="",St,Qe,se,g,x,k;_.find(".yyt-window-resize-handle").on("mousedown",function(C){O||(ye=!0,ge="",p(this).hasClass("se")?ge="se":p(this).hasClass("e")?ge="e":p(this).hasClass("s")?ge="s":p(this).hasClass("w")?ge="w":p(this).hasClass("n")?ge="n":p(this).hasClass("nw")?ge="nw":p(this).hasClass("ne")?ge="ne":p(this).hasClass("sw")&&(ge="sw"),St=C.clientX,Qe=C.clientY,se=_.width(),g=_.height(),x=parseInt(_.css("left")),k=parseInt(_.css("top")),p(document.body).css("user-select","none"),C.stopPropagation())}),p(document).on("mousemove.yytWindowResize"+e,C=>{if(!ye)return;let K=C.clientX-St,q=C.clientY-Qe,re=400,Y=300,Q=se,he=g,Te=x,Me=k;if(ge.includes("e")&&(Q=Math.max(re,se+K)),ge.includes("s")&&(he=Math.max(Y,g+q)),ge.includes("w")){let ke=se-K;ke>=re&&(Q=ke,Te=x+K)}if(ge.includes("n")){let ke=g-q;ke>=Y&&(he=ke,Me=k+q)}_.css({width:Q+"px",height:he+"px",left:Te+"px",top:Me+"px"})}),p(document).on("mouseup.yytWindowResize"+e,()=>{ye&&(ye=!1,p(document.body).css("user-select",""))})}return _.on("remove",()=>{p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(_),50),_}function Yd(t){let e=Be.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),Be.unregister(t)}}function Wd(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var Kd,Ia,Jn,Be,Eo=X(()=>{Fe();Kd="youyou_toolkit_window_manager",Ia="window_states",Jn=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let n=this.loadStates();n[e]={...s,updatedAt:Date.now()},fs.set(Ia,n)}loadStates(){return fs.get(Ia)||{}}getState(e){return this.loadStates()[e]||null}},Be=new Jn});function Ra(t,e={}){let{constants:s,topLevelWindow:n,modules:i}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a,MENU_ITEM_ID:r,MENU_CONTAINER_ID:l}=s,c=null,d=!1,u=new Map,y={storageModule:()=>Promise.resolve().then(()=>(Zn(),Qn)),uiComponentsModule:()=>Promise.resolve().then(()=>(_a(),Ea)),promptEditorModule:()=>Promise.resolve().then(()=>(wa(),Aa)),toolExecutorModule:()=>Promise.resolve().then(()=>(Rn(),In)),windowManagerModule:()=>Promise.resolve().then(()=>(Eo(),To))};function p(...G){console.log(`[${o}]`,...G)}function S(...G){console.error(`[${o}]`,...G)}async function b(G){return!G||!y[G]?null:i[G]?i[G]:(u.has(G)||u.set(G,(async()=>{try{let A=await y[G]();return i[G]=A,A}catch(A){throw u.delete(G),A}})()),u.get(G))}async function P(){return c||(c=(async()=>{try{return i.storageModule=await Promise.resolve().then(()=>(Zn(),Qn)),i.apiConnectionModule=await Promise.resolve().then(()=>(Ys(),Go)),i.presetManagerModule=await Promise.resolve().then(()=>(Qs(),Bo)),i.uiModule=await Promise.resolve().then(()=>(xo(),ga)),i.regexExtractorModule=await Promise.resolve().then(()=>(dn(),Jo)),i.toolManagerModule=await Promise.resolve().then(()=>(yn(),Xo)),i.toolExecutorModule=await Promise.resolve().then(()=>(Rn(),In)),i.toolTriggerModule=await Promise.resolve().then(()=>(yo(),sa)),i.windowManagerModule=await Promise.resolve().then(()=>(Eo(),To)),i.toolRegistryModule=await Promise.resolve().then(()=>(os(),gr)),i.settingsServiceModule=await Promise.resolve().then(()=>(Cs(),mr)),i.bypassManagerModule=await Promise.resolve().then(()=>(Is(),fr)),i.variableResolverModule=await Promise.resolve().then(()=>(Ki(),xr)),i.contextInjectorModule=await Promise.resolve().then(()=>(Fi(),br)),i.toolPromptServiceModule=await Promise.resolve().then(()=>(Hi(),Tr)),i.toolOutputServiceModule=await Promise.resolve().then(()=>(ji(),_r)),i.toolOutputServiceModule?.toolOutputService&&i.apiConnectionModule&&i.toolOutputServiceModule.toolOutputService.setApiConnection(i.apiConnectionModule),!0}catch(G){return c=null,console.warn(`[${o}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,G),!1}})(),c)}function $(){return`
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
      #${l} { display: flex; align-items: center; }

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
    `}async function W(){let G=`${o}-styles`,A=n.document||document;if(A.getElementById(G))return;let N="",_=[];try{_.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{_.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}_.push("./styles/main.css");for(let ue of[...new Set(_.filter(Boolean))])try{let xe=await fetch(ue);if(xe.ok){N=await xe.text();break}}catch{}N||(p("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),N=$());let O=A.createElement("style");O.id=G,O.textContent=N,(A.head||A.documentElement).appendChild(O),p("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function I(){let G=n.document||document;if(i.uiModule?.getAllStyles){let A=`${o}-ui-styles`;if(!G.getElementById(A)){let N=G.createElement("style");N.id=A,N.textContent=i.uiModule.getAllStyles(),(G.head||G.documentElement).appendChild(N)}}if(i.promptEditorModule&&i.promptEditorModule.getPromptEditorStyles){let A=`${o}-prompt-styles`;if(!G.getElementById(A)){let N=G.createElement("style");N.id=A,N.textContent=i.promptEditorModule.getPromptEditorStyles(),(G.head||G.documentElement).appendChild(N)}}}async function T(){try{let{applyUiPreferences:G}=await Promise.resolve().then(()=>(Hn(),aa));if(i.settingsServiceModule?.settingsService){let A=i.settingsServiceModule.settingsService.getUiSettings();if(A&&A.theme){let N=n.document||document;G(A,N),p(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${A.theme}`)}}}catch(G){p("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",G)}}function m(){let G=n.jQuery||window.jQuery;if(!G){S("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(m,1e3);return}let A=n.document||document,N=G("#extensionsMenu",A);if(!N.length){p("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(m,2e3);return}if(G(`#${l}`,N).length>0){p("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let O=G(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),ue=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${r}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,xe=G(ue);xe.on("click",function(Le){Le.stopPropagation(),p("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let ze=G("#extensionsMenuButton",A);ze.length&&N.is(":visible")&&ze.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),O.append(xe),N.append(O),p("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function z(){if(p(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await W(),await P()){if(p("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!d&&i.uiModule?.initUI)try{i.uiModule.initUI({services:i,autoInjectStyles:!1,targetDocument:n.document||document}),d=!0,p("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(N){console.error(`[${o}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,N)}if(i.toolTriggerModule?.initTriggerModule)try{i.toolTriggerModule.initTriggerModule(),p("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(N){console.error(`[${o}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,N)}I(),await T()}else p("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let A=n.document||document;A.readyState==="loading"?A.addEventListener("DOMContentLoaded",()=>{setTimeout(m,1e3)}):setTimeout(m,1e3),p("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:P,injectStyles:W,addMenuItem:m,loadLegacyModule:b,init:z,log:p,logError:S}}function Ca(t){let{constants:e,topLevelWindow:s,modules:n,caches:i,uiState:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:r,POPUP_ID:l}=e,c={cleanup:null},d={cleanups:[]};function u(...g){console.log(`[${a}]`,...g)}function y(...g){console.error(`[${a}]`,...g)}async function p(g){if(n[g])return n[g];let x=t?.services?.loadLegacyModule;if(typeof x!="function")return null;try{return await x(g)}catch(k){return y(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${g}`,k),null}}function S(g){return typeof g!="string"?"":g.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function b(){return s.jQuery||window.jQuery}function P(){return s.document||document}function $(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let x=n.toolRegistryModule?.getToolConfig(g);if(!x)return g;if(!x.hasSubTabs)return x.name||g;let k=o.currentSubTab[g]||x.subTabs?.[0]?.id||"",C=x.subTabs?.find(K=>K.id===k);return C?.name?`${x.name} / ${C.name}`:x.name||g}function W(g){if(!g)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let x=n.toolRegistryModule?.getToolConfig(g);if(!x)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!x.hasSubTabs)return x.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let k=o.currentSubTab[g]||x.subTabs?.[0]?.id||"";return x.subTabs?.find(K=>K.id===k)?.description||x.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function I(){let g=o.currentPopup;if(!g)return;let x=$(o.currentMainTab),k=W(o.currentMainTab),C=g.querySelector(".yyt-popup-active-label");C&&(C.textContent=`\u5F53\u524D\uFF1A${x}`);let K=g.querySelector(".yyt-shell-breadcrumb");K&&(K.textContent=x);let q=g.querySelector(".yyt-shell-main-title");q&&(q.textContent=x);let re=g.querySelector(".yyt-shell-main-description");re&&(re.textContent=k);let Y=g.querySelector(".yyt-shell-current-page");Y&&(Y.textContent=x);let Q=g.querySelector(".yyt-shell-current-desc");Q&&(Q.textContent=k)}function T(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function m(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(g=>{typeof g=="function"&&g()}),d.cleanups=[])}function z(g){return!!g?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function G(g){let x=g?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body"].join(","));return x?x.scrollHeight>x.clientHeight+2||x.scrollWidth>x.clientWidth+2:!1}function A(g,x){return x?.closest?.(".yyt-scrollable-surface")===g}function N(g,x){return!g||!x?null:[x.closest?.(".yyt-tool-list"),x.closest?.(".yyt-settings-content"),x.closest?.(".yyt-sub-content"),x.closest?.(".yyt-tab-content.active"),g].filter(Boolean).find(C=>C!==g&&!g.contains(C)?!1:C.scrollHeight>C.clientHeight+2||C.scrollWidth>C.clientWidth+2)||g}function _(g){let x=P();if(!g||!x)return;g.classList.add("yyt-scrollable-surface");let k=!1,C=!1,K=0,q=0,re=0,Y=0,Q=!1,he=!1,Te=()=>{k=!1,C=!1,g.classList.remove("yyt-scroll-dragging")},Me=J=>{J.button===0&&(z(J.target)||A(g,J.target)&&(Q=g.scrollWidth>g.clientWidth+2,he=g.scrollHeight>g.clientHeight+2,!(!Q&&!he)&&(J.stopPropagation(),k=!0,C=!1,K=J.clientX,q=J.clientY,re=g.scrollLeft,Y=g.scrollTop)))},ke=J=>{if(!k)return;let dt=J.clientX-K,$e=J.clientY-q;!(Math.abs(dt)>4||Math.abs($e)>4)&&!C||(C=!0,g.classList.add("yyt-scroll-dragging"),Q&&(g.scrollLeft=re-dt),he&&(g.scrollTop=Y-$e),J.preventDefault())},xt=()=>{Te()},ie=J=>{if(J.ctrlKey||G(J.target))return;let dt=g.classList.contains("yyt-content");if(!dt&&!A(g,J.target))return;let $e=N(g,J.target);!$e||!($e.scrollHeight>$e.clientHeight+2||$e.scrollWidth>$e.clientWidth+2)||(Math.abs(J.deltaY)>0&&($e.scrollTop+=J.deltaY),Math.abs(J.deltaX)>0&&($e.scrollLeft+=J.deltaX),J.preventDefault(),(!dt||$e!==g)&&J.stopPropagation())},Ae=J=>{C&&J.preventDefault()};g.addEventListener("mousedown",Me),g.addEventListener("wheel",ie,{passive:!1}),g.addEventListener("dragstart",Ae),x.addEventListener("mousemove",ke),x.addEventListener("mouseup",xt),d.cleanups.push(()=>{Te(),g.classList.remove("yyt-scrollable-surface"),g.removeEventListener("mousedown",Me),g.removeEventListener("wheel",ie),g.removeEventListener("dragstart",Ae),x.removeEventListener("mousemove",ke),x.removeEventListener("mouseup",xt)})}function O(){let g=o.currentPopup;if(!g)return;m();let x=[...g.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...g.querySelectorAll(".yyt-sub-nav"),...g.querySelectorAll(".yyt-content"),...g.querySelectorAll(".yyt-tab-content.active"),...g.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...g.querySelectorAll(".yyt-settings-content"),...g.querySelectorAll(".yyt-tool-list")];[...new Set(x)].forEach(_)}function ue(){let g=P(),x=o.currentPopup,k=x?.querySelector(".yyt-popup-header");if(!x||!k||!g)return;let C=!1,K=0,q=0,re=0,Y=0,Q="",he=()=>({width:s.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),Te=(Ae,J,dt)=>Math.min(Math.max(Ae,J),dt),Me=()=>{C&&(C=!1,x.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=Q)},ke=Ae=>{if(!C||!o.currentPopup)return;let J=Ae.clientX-K,dt=Ae.clientY-q,{width:$e,height:Xn}=he(),Da=x.offsetWidth||0,Pa=x.offsetHeight||0,Ga=Math.max(0,$e-Da),$a=Math.max(0,Xn-Pa);x.style.left=`${Te(re+J,0,Ga)}px`,x.style.top=`${Te(Y+dt,0,$a)}px`,x.style.transform="none",x.style.right="auto",x.style.bottom="auto"},xt=()=>{Me()},ie=Ae=>{if(Ae.button!==0||Ae.target?.closest(".yyt-popup-close"))return;C=!0,K=Ae.clientX,q=Ae.clientY;let J=x.getBoundingClientRect();re=J.left,Y=J.top,x.style.left=`${J.left}px`,x.style.top=`${J.top}px`,x.style.transform="none",x.style.right="auto",x.style.bottom="auto",x.classList.add("yyt-popup-dragging"),Q=g.body.style.userSelect||"",g.body.style.userSelect="none",Ae.preventDefault()};k.addEventListener("mousedown",ie),g.addEventListener("mousemove",ke),g.addEventListener("mouseup",xt),c.cleanup=()=>{Me(),k.removeEventListener("mousedown",ie),g.removeEventListener("mousemove",ke),g.removeEventListener("mouseup",xt)}}function xe(){T(),m(),o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),u("\u5F39\u7A97\u5DF2\u5173\u95ED")}function ve(g){o.currentMainTab=g;let x=b();if(!x||!o.currentPopup)return;x(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),x(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let k=n.toolRegistryModule?.getToolConfig(g);k?.hasSubTabs?(x(o.currentPopup).find(".yyt-sub-nav").show(),ze(g,k.subTabs)):x(o.currentPopup).find(".yyt-sub-nav").hide(),x(o.currentPopup).find(".yyt-tab-content").removeClass("active"),x(o.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),Xe(g),I(),O()}function Le(g,x){o.currentSubTab[g]=x;let k=b();!k||!o.currentPopup||(k(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),k(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${x}"]`).addClass("active"),Ge(g,x),I(),O())}function ze(g,x){let k=b();if(!k||!o.currentPopup||!x)return;let C=o.currentSubTab[g]||x[0]?.id,K=x.map(q=>`
      <div class="yyt-sub-nav-item ${q.id===C?"active":""}" data-subtab="${q.id}">
        <i class="fa-solid ${q.icon||"fa-file"}"></i>
        <span>${q.name}</span>
      </div>
    `).join("");k(o.currentPopup).find(".yyt-sub-nav").html(K),k(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let re=k(this).data("subtab");Le(g,re)}),O()}async function Xe(g){let x=b();if(!x||!o.currentPopup)return;let k=x(o.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!k.length)return;let C=n.toolRegistryModule?.getToolConfig(g);switch(g){case"apiPresets":if(n.uiModule?.renderApiPanel)n.uiModule.renderApiPanel(k);else{let K=await p("uiComponentsModule");K?.render&&K.render(k)}break;case"toolManage":if(n.uiModule?.renderToolPanel)n.uiModule.renderToolPanel(k);else{let K=await p("uiComponentsModule");K?.renderTool&&K.renderTool(k)}break;case"regexExtract":if(n.uiModule?.renderRegexPanel)n.uiModule.renderRegexPanel(k);else{let K=await p("uiComponentsModule");K?.renderRegex&&K.renderRegex(k)}break;case"tools":if(C?.hasSubTabs&&C.subTabs?.length>0){let K=o.currentSubTab[g]||C.subTabs[0].id;await Ge(g,K)}else k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":n.uiModule?.renderBypassPanel?n.uiModule.renderBypassPanel(k):k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":n.uiModule?.renderSettingsPanel?n.uiModule.renderSettingsPanel(k):k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:ye(g,k);break}O()}async function Ge(g,x){let k=b();if(!k||!o.currentPopup)return;let C=k(o.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!C.length)return;let K=n.toolRegistryModule?.getToolConfig(g);if(K?.hasSubTabs){let re=K.subTabs?.find(Y=>Y.id===x);if(re){let Y=C.find(".yyt-sub-content");switch(Y.length||(C.html('<div class="yyt-sub-content"></div>'),Y=C.find(".yyt-sub-content")),re.component){case"SummaryToolPanel":if(n.uiModule?.renderSummaryToolPanel)n.uiModule.renderSummaryToolPanel(Y);else{let Q=await p("uiComponentsModule");Q?.SummaryToolPanel?Q.SummaryToolPanel.renderTo(Y):Y.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(n.uiModule?.renderStatusBlockPanel)n.uiModule.renderStatusBlockPanel(Y);else{let Q=await p("uiComponentsModule");Q?.StatusBlockPanel?Q.StatusBlockPanel.renderTo(Y):Y.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(n.uiModule?.renderYouyouReviewPanel)n.uiModule.renderYouyouReviewPanel(Y);else{let Q=await p("uiComponentsModule");Q?.YouyouReviewPanel?Q.YouyouReviewPanel.renderTo(Y):Y.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await ct(re,Y);break;default:Y.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let q=C.find(".yyt-sub-content");if(q.length){switch(x){case"config":ge(g,q);break;case"prompts":await St(g,q);break;case"presets":Qe(g,q);break;default:q.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}O()}}async function ct(g,x){if(!(!b()||!x?.length||!g?.id))try{let C=i.dynamicToolPanelCache.get(g.id);if(!C){let q=(await Promise.resolve().then(()=>(Bs(),ia)))?.createToolConfigPanel;if(typeof q!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");C=q({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),i.dynamicToolPanelCache.set(g.id,C)}C.renderTo(x),O()}catch(C){console.error(`[${a}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,C),x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function ye(g,x){if(!b())return;let C=n.toolRegistryModule?.getToolConfig(g);if(!C){x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let K=o.currentSubTab[g]||C.subTabs?.[0]?.id||"config";x.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${K}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Ge(g,K)}function ge(g,x){if(!b())return;let C=n.toolManagerModule?.getTool(g),K=n.presetManagerModule?.getAllPresets()||[],q=n.toolRegistryModule?.getToolApiPreset(g)||"",re=K.map(Y=>`<option value="${S(Y.name)}" ${Y.name===q?"selected":""}>${S(Y.name)}</option>`).join("");x.html(`
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${C?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${C?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),x.find("#yyt-save-tool-preset").on("click",function(){let Q=x.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(g,Q);let he=s.toastr;he&&he.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function St(g,x){let k=b(),C=n.promptEditorModule||await p("promptEditorModule");if(!k||!C){x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let q=n.toolManagerModule?.getTool(g)?.config?.messages||[],re=C.messagesToSegments?C.messagesToSegments(q):C.DEFAULT_PROMPT_SEGMENTS,Y=new C.PromptEditor({containerId:`yyt-prompt-editor-${g}`,segments:re,onChange:he=>{let Te=C.segmentsToMessages?C.segmentsToMessages(he):[];u("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",Te.length,"\u6761\u6D88\u606F")}});x.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),Y.init(x.find(`#yyt-prompt-editor-${g}`));let Q=C.getPromptEditorStyles?C.getPromptEditorStyles():"";if(Q){let he="yyt-prompt-editor-styles",Te=s.document||document;if(!Te.getElementById(he)){let Me=Te.createElement("style");Me.id=he,Me.textContent=Q,(Te.head||Te.documentElement).appendChild(Me)}}}function Qe(g,x){b()&&x.html(`
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
    `)}function se(){if(o.currentPopup){u("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=b(),x=P();if(!g){y("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let k=n.toolRegistryModule?.getToolList()||[];if(!k.length){y("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}k.some(ie=>ie.id===o.currentMainTab)||(o.currentMainTab=k[0].id);let C=n.toolRegistryModule?.getToolConfig("tools"),K=Array.isArray(C?.subTabs)?C.subTabs:[],q=K.filter(ie=>ie?.isCustom).length,re=K.filter(ie=>!ie?.isCustom).length,Y=$(o.currentMainTab),Q=W(o.currentMainTab);o.currentOverlay=x.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",ie=>{ie.target===o.currentOverlay&&xe()}),x.body.appendChild(o.currentOverlay);let he=k.map(ie=>`
      <div class="yyt-main-nav-item ${ie.id===o.currentMainTab?"active":""}" data-tab="${ie.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${S(ie.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${S(ie.name||ie.id)}</span>
          <span class="yyt-main-nav-desc">${S(ie.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),Te=k.map(ie=>`
      <div class="yyt-tab-content ${ie.id===o.currentMainTab?"active":""}" data-tab="${ie.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),Me=`
      <div class="yyt-popup" id="${l}">
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
                  <strong class="yyt-shell-current-page">${S(Y)}</strong>
                  <span class="yyt-shell-current-desc">${S(Q)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${k.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${re}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${q}</strong>
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
                    ${he}
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
                    <div class="yyt-shell-main-title">${S(Y)}</div>
                    <div class="yyt-shell-main-description">${S(Q)}</div>
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
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${S(Y)}</span>
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
    `,ke=x.createElement("div");ke.innerHTML=Me,o.currentPopup=ke.firstElementChild,x.body.appendChild(o.currentPopup),g(o.currentPopup).find(".yyt-popup-close").on("click",xe),g(o.currentPopup).find(`#${a}-close-btn`).on("click",xe),g(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let Ae=g(this).data("tab");Ae&&ve(Ae)}),ue(),Xe(o.currentMainTab);let xt=n.toolRegistryModule?.getToolConfig(o.currentMainTab);xt?.hasSubTabs&&(g(o.currentPopup).find(".yyt-sub-nav").show(),ze(o.currentMainTab,xt.subTabs)),I(),O(),u("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:se,closePopup:xe,switchMainTab:ve,switchSubTab:Le,renderTabContent:Xe,renderSubTabContent:Ge}}function Ma(t,e={}){let{constants:s,modules:n}=t,{SCRIPT_ID:i,SCRIPT_VERSION:o}=s,{init:a,loadModules:r,loadLegacyModule:l,addMenuItem:c,popupShell:d}=e;return{version:o,id:i,init:a,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:c,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getUiComponents:()=>n.uiComponentsModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getToolTrigger:()=>n.toolTriggerModule,getAutoTriggerDiagnostics:u=>n.toolTriggerModule?.getAutoTriggerDiagnostics?.(u)||null,exportAutoTriggerDiagnostics:u=>n.toolTriggerModule?.exportAutoTriggerDiagnostics?.(u)||null,getGenerationTransactionDiagnostics:u=>n.toolTriggerModule?.getGenerationTransactionDiagnostics?.(u)||null,exportGenerationTransactionDiagnostics:u=>n.toolTriggerModule?.exportGenerationTransactionDiagnostics?.(u)||null,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getPromptEditor:()=>n.promptEditorModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,async loadLegacyModule(u){return typeof l!="function"?null:l(u)},async getApiConfig(){return await r(),n.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(u){return await r(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(u),!0):!1},async getPresets(){return await r(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(u,y){if(await r(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(u,y);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await r(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(u,y){return n.toolRegistryModule?.registerTool(u,y)||!1},unregisterTool(u){return n.toolRegistryModule?.unregisterTool(u)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(u){return n.windowManagerModule?.createWindow(u)||null},closeWindow(u){n.windowManagerModule?.closeWindow(u)}}}var Hs="youyou_toolkit",Vd="0.6.2",qd=`${Hs}-menu-item`,Jd=`${Hs}-menu-container`,Xd=`${Hs}-popup`,Qd=typeof window.parent<"u"?window.parent:window,js={constants:{SCRIPT_ID:Hs,SCRIPT_VERSION:Vd,MENU_ITEM_ID:qd,MENU_CONTAINER_ID:Jd,POPUP_ID:Xd},topLevelWindow:Qd,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},ka=Ca(js),Vt=Ra(js,{openPopup:ka.openPopup});js.services.loadModules=Vt.loadModules;js.services.loadLegacyModule=Vt.loadLegacyModule;var _o=Ma(js,{init:Vt.init,loadModules:Vt.loadModules,loadLegacyModule:Vt.loadLegacyModule,addMenuItem:Vt.addMenuItem,popupShell:ka});if(typeof window<"u"&&(window.YouYouToolkit=_o,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=_o}catch{}var Qp=_o;Vt.init();console.log(`[${Hs}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{Qp as default};
