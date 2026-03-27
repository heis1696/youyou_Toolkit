var Da=Object.defineProperty;var J=(t,e)=>()=>(t&&(e=t(t=0)),e);var fe=(t,e)=>{for(var s in e)Da(t,s,{get:e[s],enumerable:!0})};function _o(){let t=A;return t._getStorage(),t._storage}function Eo(){return A.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Ao(t){A.set("settings",t)}var Tt,A,ee,wo,ms,We=J(()=>{Tt=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:n=>{let o=s.extensionSettings[this.namespace][n];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(n,o)=>{s.extensionSettings[this.namespace][n]=o,this._saveSettings(s)},removeItem:n=>{delete s.extensionSettings[this.namespace][n],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(n){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let n=`${this.namespace}:${e}`;if(this._cache.has(n))return this._cache.get(n);let o=this._getStorage(),i=this._getFullKey(e),r=o.getItem(i);if(r===null)return s;try{let a=JSON.parse(r);return this._cache.set(n,a),a}catch{return r}}set(e,s){let n=this._getStorage(),o=this._getFullKey(e),i=`${this.namespace}:${e}`;this._cache.set(i,s);try{n.setItem(o,JSON.stringify(s))}catch(r){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,r)}}remove(e){let s=this._getStorage(),n=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.delete(o),s.removeItem(n)}has(e){let s=this._getStorage(),n=this._getFullKey(e);return s.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext();n?.extensionSettings?.[this.namespace]&&(n.extensionSettings[this.namespace]={},this._saveSettings(n))}}else{let s=`${this.namespace}_`,n=[];for(let o=0;o<localStorage.length;o++){let i=localStorage.key(o);i&&i.startsWith(s)&&n.push(i)}n.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(n=>{s[n]=this.get(n)}),s}setMultiple(e){Object.entries(e).forEach(([s,n])=>{this.set(s,n)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let i=n.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(i).forEach(([r,a])=>{s[r]=typeof a=="string"?JSON.parse(a):a})}}else{let n=`${this.namespace}_`;for(let o=0;o<localStorage.length;o++){let i=localStorage.key(o);if(i&&i.startsWith(n)){let r=i.slice(n.length);try{s[r]=JSON.parse(localStorage.getItem(i))}catch{s[r]=localStorage.getItem(i)}}}}return s}},A=new Tt("youyou_toolkit"),ee=new Tt("youyou_toolkit:tools"),wo=new Tt("youyou_toolkit:presets"),ms=new Tt("youyou_toolkit:windows")});var Zn={};fe(Zn,{DEFAULT_API_PRESETS:()=>$a,DEFAULT_SETTINGS:()=>Ga,STORAGE_KEYS:()=>hs,StorageService:()=>Tt,deepMerge:()=>Ro,getCurrentPresetName:()=>Ba,getStorage:()=>_o,loadApiPresets:()=>Oa,loadSettings:()=>Eo,presetStorage:()=>wo,saveApiPresets:()=>Na,saveSettings:()=>Ao,setCurrentPresetName:()=>Ka,storage:()=>A,toolStorage:()=>ee,windowStorage:()=>ms});function Oa(){return A.get(hs.API_PRESETS)||[]}function Na(t){A.set(hs.API_PRESETS,t)}function Ba(){return A.get(hs.CURRENT_PRESET)||""}function Ka(t){A.set(hs.CURRENT_PRESET,t||"")}function Ro(t,e){let s=o=>o&&typeof o=="object"&&!Array.isArray(o),n={...t};return s(t)&&s(e)&&Object.keys(e).forEach(o=>{s(e[o])?o in t?n[o]=Ro(t[o],e[o]):Object.assign(n,{[o]:e[o]}):Object.assign(n,{[o]:e[o]})}),n}var hs,Ga,$a,ei=J(()=>{We();We();hs={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},Ga={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},$a=[]});var K,ti,U,we=J(()=>{K={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},ti=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,n={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let i={callback:s,priority:o};return this.listeners.get(e).add(i),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let n=this.listeners.get(e);if(n){for(let o of n)if(o.callback===s){n.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let n=this.listeners.get(e);if(!n||n.size===0)return;let o=Array.from(n).sort((i,r)=>r.priority-i.priority);for(let{callback:i}of o)try{i(s)}catch(r){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,r)}}once(e,s){let n=o=>{this.off(e,n),s(o)};return this.on(e,n)}wait(e,s=0){return new Promise((n,o)=>{let i=null,r=this.once(e,a=>{i&&clearTimeout(i),n(a)});s>0&&(i=setTimeout(()=>{r(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},U=new ti});function _(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function T(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Ua(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function nt(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:o=!1,noticeId:i=""}=s,r=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!r?.body){T(t,e,n);return}let a="yyt-top-notice-container",l="yyt-top-notice-styles",c=r.getElementById(a);if(c||(c=r.createElement("div"),c.id=a,c.style.cssText=`
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
    `,r.body.appendChild(c)),!r.getElementById(l)){let k=r.createElement("style");k.id=l,k.textContent=`
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
    `,r.head.appendChild(k)}if(i){let k=c.querySelector(`[data-notice-id="${i}"]`);k&&k.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=r.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,i&&(u.dataset.noticeId=i);let g=r.createElement("span");g.className="yyt-top-notice__icon",g.textContent=d[t]||d.info;let p=r.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let h=r.createElement("button");h.className="yyt-top-notice__close",h.type="button",h.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),h.textContent="\xD7";let v=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};h.addEventListener("click",v),u.appendChild(g),u.appendChild(p),u.appendChild(h),c.appendChild(u),o||setTimeout(v,n)}function Ua(t,e,s){let n=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!n)return;let o=n.getElementById("yyt-fallback-toast");o&&o.remove();let i={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},r=i[t]||i.info,a=n.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${r.bg};
    color: #0b0f15;
    border-radius: 8px;
    border: 2px solid ${r.border};
    font-size: 14px;
    font-weight: 500;
    z-index: 99999;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: yyt-toast-in 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  `,a.textContent=e,!n.getElementById("yyt-toast-styles")){let l=n.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,n.head.appendChild(l)}n.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},s)}function Z(){if(Pt)return Pt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Pt=window.parent.jQuery,Pt}catch{}return window.jQuery&&(Pt=window.jQuery),Pt}function La(){Pt=null}function te(t){return t&&t.length>0}function It(t,e=m){if(!Z()||!te(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(n=o.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Dt(t,e,s=m){if(!Z()||!te(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",o);let r=t.find(`#${s}-custom-api-fields`);o?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function si(t){let{id:e,title:s,body:n,width:o="380px",wide:i=!1}=t;return`
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
  `}function ni(t,e,s={}){if(!Z())return()=>{};let o=t.find(`#${e}-overlay`),i=()=>{o.remove(),s.onClose&&s.onClose()};return o.find(`#${e}-close, #${e}-cancel`).on("click",i),o.on("click",function(r){r.target===this&&i()}),o.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(i)}),i}function pt(t,e){let s=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(s),o=document.createElement("a");o.href=n,o.download=e,o.click(),URL.revokeObjectURL(n)}function yt(t){return new Promise((e,s)=>{let n=new FileReader;n.onload=o=>e(o.target.result),n.onerror=o=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var m,Pt,it=J(()=>{m="youyou_toolkit";Pt=null});var bs,pe,ii=J(()=>{we();it();bs=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,U.emit(K.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,n={}){let o=Z();if(!o){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let i=this.components.get(e);if(!i){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let r;if(typeof s=="string"?r=o(s):s&&s.jquery?r=s:s&&(r=o(s)),!te(r)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let a=i.render({...n,dependencies:this.dependencies});r.html(a),i.bindEvents(r,this.dependencies),this.activeInstances.set(e,{container:r,component:i,props:n}),U.emit(K.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,U.emit(K.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,U.emit(K.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,n)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let n=e.createElement("style");n.id=s,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){U.on(K.PRESET_UPDATED,()=>{}),U.on(K.TOOL_UPDATED,()=>{})}},pe=new bs});var Do={};fe(Do,{API_STATUS:()=>Ya,fetchAvailableModels:()=>di,getApiConfig:()=>wt,getEffectiveApiConfig:()=>Ss,hasEffectiveApiPreset:()=>ai,sendApiRequest:()=>ci,sendWithPreset:()=>qa,testApiConnection:()=>tl,updateApiConfig:()=>Jt,validateApiConfig:()=>Xt});function Fa(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function ri(){return A.get(Co,Fa())}function ja(t){A.set(Co,t)}function Mo(){return A.get(za,[])}function Wa(){return A.get(Ha,"")}function oi(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function ko(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let n=null;try{n=new URL(s)}catch{return s}let o=n.pathname.replace(/\/+$/,""),i=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(i=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?i=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?i=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(i=`${o||""}/models`)),n.pathname=i.replace(/\/+/g,"/"),n.toString()}function Va(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function wt(){return ri().apiConfig||{}}function Jt(t){let e=ri();e.apiConfig={...e.apiConfig,...t},ja(e)}function Xt(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Ss(t=""){let e=ri(),s=t||Wa()||"";if(s){let o=Mo().find(i=>i.name===s);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function ai(t=""){return t?Mo().some(s=>s?.name===t):!1}async function qa(t,e,s={},n=null){let o=Ss(t);return await ci(e,{...s,apiConfig:o},n)}function Po(t,e={}){let s=e.apiConfig||wt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function li(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function ci(t,e={},s=null){let n=e.apiConfig||wt(),o=n.useMainApi,i=Xt(n);if(!i.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${i.errors.join(", ")}`);return o?await Ja(t,e,s):await Xa(t,n,e,s)}async function Ja(t,e,s){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function Xa(t,e,s,n){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await Qa(t,e,s,n,o)}catch(i){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",i)}if(o.SillyTavern?.getRequestHeaders)try{return await Za(t,e,s,n,o)}catch(i){if(!i?.allowDirectFallback)throw i}return await el(t,e,s,n)}async function Qa(t,e,s,n,o){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let i=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:Va(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof i=="string"?i.trim():li(i)}async function Za(t,e,s,n,o){let i=String(e.url||"").trim(),r={...Po(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:i,proxy_password:"",custom_url:i,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},a={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:a,body:JSON.stringify(r),signal:n})}catch(u){throw u?.name==="AbortError"?u:oi(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw oi(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let g=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw oi(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${g||"(\u7A7A\u54CD\u5E94)"}`)}return li(d)}async function el(t,e,s,n){let o=Po(t,{apiConfig:e,...s}),i=ko(e.url,"chat_completions"),r={"Content-Type":"application/json"};e.apiKey&&(r.Authorization=`Bearer ${e.apiKey}`);let a=await fetch(i,{method:"POST",headers:r,body:JSON.stringify(o),signal:n}),l=await a.text().catch(()=>"");if(!a.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${a.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return li(c)}async function tl(t=null){let e=t||wt(),s=Date.now();try{await ci([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-s}}}async function di(t=null){let e=t||wt();return e.useMainApi?await sl():await nl(e)}async function sl(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function nl(t){if(!t.url||!t.apiKey)return[];try{let e=ko(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let n=await s.json();return n.data&&Array.isArray(n.data)?n.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var Co,za,Ha,Ya,Vs=J(()=>{We();Co="settings",za="api_presets",Ha="current_preset";Ya={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var No={};fe(No,{createPreset:()=>Xs,createPresetFromCurrentConfig:()=>cl,deletePreset:()=>Qs,duplicatePreset:()=>ll,exportPresets:()=>fi,generateUniquePresetName:()=>hi,getActiveConfig:()=>gi,getActivePresetName:()=>Zs,getAllPresets:()=>Qt,getPreset:()=>$t,getPresetNames:()=>rl,getStarredPresets:()=>yi,importPresets:()=>mi,presetExists:()=>vs,renamePreset:()=>al,switchToPreset:()=>Ot,togglePresetStar:()=>pi,updatePreset:()=>ui,validatePreset:()=>dl});function ol(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Oo(){return A.get(il,ol())}function De(){return A.get(Go,[])}function Gt(t){A.set(Go,t)}function Js(){return A.get($o,"")}function qs(t){A.set($o,t||"")}function Qt(){return De()}function rl(){return De().map(e=>e.name)}function $t(t){return!t||typeof t!="string"?null:De().find(s=>s.name===t)||null}function vs(t){return!t||typeof t!="string"?!1:De().some(s=>s.name===t)}function Xs(t){let{name:e,description:s,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(vs(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let i={name:o,description:s||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},r=De();return r.push(i),Gt(r),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:i}}function ui(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=De(),n=s.findIndex(r=>r.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=s[n],i={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(i.apiConfig={...o.apiConfig,...e.apiConfig}),s[n]=i,Gt(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:i}}function Qs(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=De(),s=e.findIndex(n=>n.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Gt(e),Js()===t&&qs(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function al(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!vs(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(vs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n=De(),o=n.find(i=>i.name===t);return o&&(o.name=s,o.updatedAt=Date.now(),Gt(n),Js()===t&&qs(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function ll(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),n=$t(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(vs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(n)),name:s,createdAt:Date.now(),updatedAt:Date.now()},i=De();return i.push(o),Gt(i),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:o}}function pi(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=De(),s=e.find(n=>n.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Gt(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function yi(){return De().filter(e=>e.starred===!0)}function Ot(t){if(!t)return qs(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=$t(t);return e?(qs(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Zs(){return Js()}function gi(){let t=Js();if(t){let s=$t(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:Oo().apiConfig||{}}}function fi(t=null){if(t){let s=$t(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=De();return JSON.stringify(e,null,2)}function mi(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(s)?s:[s];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=De(),i=0;for(let r of n){if(!r.name||typeof r.name!="string"||!r.apiConfig||typeof r.apiConfig!="object")continue;let a=o.findIndex(l=>l.name===r.name);a>=0?e.overwrite&&(r.updatedAt=Date.now(),o[a]=r,i++):(r.createdAt=r.createdAt||Date.now(),r.updatedAt=Date.now(),o.push(r),i++)}return i>0&&Gt(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}function cl(t,e=""){let s=Oo();return Xs({name:t,description:e,apiConfig:s.apiConfig})}function dl(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function hi(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=De(),s=new Set(e.map(o=>o.name));if(!s.has(t))return t;let n=1;for(;s.has(`${t} (${n})`);)n++;return`${t} (${n})`}var il,Go,$o,en=J(()=>{We();il="settings",Go="api_presets",$o="current_preset"});function tn(t){return String(t||"").trim()}var ot,Ye,bi=J(()=>{we();it();Vs();en();ot=null;Ye={id:"apiPresetPanel",render(t){let e=gi(),s=e?.apiConfig||wt(),n=tn(e?.presetName||Zs()),o=Qt(),a=yi().slice(0,8),l=a.length>0?a.map(u=>this._renderPresetItem(u)).join(""):"",c=ot===null?n||"":tn(ot),d=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
                  <span class="yyt-select-value" data-value="${_(c)}">${_(d)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${c?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${o.length>0?o.map(u=>this._renderSelectOption(u,c)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${m}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
                   value="${_(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${m}-api-key" 
                     value="${_(t.apiKey||"")}" 
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
                     value="${_(t.model||"")}" 
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
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${m}-preset-dropdown`),n=s.find(".yyt-select-trigger"),o=s.find(".yyt-select-value"),i=()=>{let r=String(o.data("value")||"").trim();if(!r){ot="",Ot(""),Dt(t,wt(),m),t.find(".yyt-preset-item").removeClass("yyt-loaded"),T("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let a=$t(r);if(!a){T("error",`\u9884\u8BBE "${r}" \u4E0D\u5B58\u5728`);return}ot=r,Ot(r),Dt(t,a.apiConfig,m),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${r.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),T("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${r}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};n.on("click",function(r){r.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",r=>{if(e(r.target).hasClass("yyt-option-star"))return;let a=e(r.currentTarget),l=a.data("value"),c=a.find(".yyt-option-text").text();ot=String(l||"").trim(),o.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),a.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${m}-load-preset`).on("click",()=>{i()}),s.find(".yyt-option-star").on("click",r=>{r.preventDefault(),r.stopPropagation();let a=e(r.currentTarget).data("preset");if(!a)return;let l=pi(a);if(l.success){T("success",l.message);let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else T("error",l.message)}),e(document).on("click.yyt-dropdown",r=>{e(r.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let o=e(s.currentTarget).data("preset-name"),i=e(s.target).closest("[data-action]").data("action");if(i)switch(s.stopPropagation(),i){case"load":t.find(".yyt-select-value").text(o).data("value",o),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${o.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${m}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${o}" \u5417\uFF1F`)){let r=Qs(o);if(T(r.success?"info":"error",r.message),r.success){tn(ot)===o&&(ot=null);let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${m}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),n=t.find(`#${m}-custom-api-fields`);s?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${m}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${m}-api-key`),n=s.attr("type");s.attr("type",n==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${m}-load-models`).on("click",async()=>{let s=t.find(`#${m}-load-models`),n=t.find(`#${m}-model`),o=t.find(`#${m}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let i=It(t,m),r=await di(i);if(r.length>0){o.empty(),r.forEach(l=>{o.append(`<option value="${_(l)}">${_(l)}</option>`)}),n.hide(),o.show();let a=n.val();a&&r.includes(a)&&o.val(a),o.off("change").on("change",function(){n.val(e(this).val())}),T("success",`\u5DF2\u52A0\u8F7D ${r.length} \u4E2A\u6A21\u578B`)}else T("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(i){T("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${i.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${m}-model`).on("focus",function(){let s=t.find(`#${m}-model-select`);e(this).show(),s.hide()}),t.find(`#${m}-save-api-config`).on("click",()=>{let s=It(t,m),n=tn(Zs()),o=Xt(s);if(!o.valid&&!s.useMainApi){T("error",o.errors.join(", "));return}if(n){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${n}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){Jt(s),Ot(""),ot="",T("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let r=t.closest(".yyt-api-manager").parent();r.length&&this.renderTo(r);return}Jt(s);let i=ui(n,{apiConfig:s});if(i.success){ot=n,T("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${n}"`),Ot(n),U.emit(K.PRESET_UPDATED,{name:n});let r=t.closest(".yyt-api-manager").parent();r.length&&this.renderTo(r)}else T("error",i.message);return}Jt(s),T("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${m}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Ot(""),ot="",Jt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),T("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${m}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${m}-export-presets`).on("click",()=>{try{let s=fi();pt(s,`youyou_toolkit_presets_${Date.now()}.json`),T("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){T("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${m}-import-presets`).on("click",()=>{t.find(`#${m}-import-file`).click()}),t.find(`#${m}-import-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let o=await yt(n),i=mi(o,{overwrite:!0});if(T(i.success?"success":"error",i.message),i.imported>0){let r=t.closest(".yyt-api-manager").parent();r.length&&this.renderTo(r)}}catch(o){T("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let n=Qt().map(d=>d.name),o=hi("\u65B0\u9884\u8BBE"),i=`
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
                     value="${_(o)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
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
    `;e(`#${m}-dialog-overlay`).remove(),t.append(i);let r=e(`#${m}-dialog-overlay`),a=e(`#${m}-dialog-preset-name`),l=e(`#${m}-dialog-preset-desc`);a.focus().select();let c=()=>r.remove();r.find(`#${m}-dialog-close, #${m}-dialog-cancel`).on("click",c),r.on("click",function(d){d.target===this&&c()}),r.find(`#${m}-dialog-save`).on("click",()=>{let d=a.val().trim(),u=l.val().trim();if(!d){T("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(n.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Qs(d)}let g=It(t,m),p=Xs({name:d,description:u,apiConfig:g});if(p.success){T("success",p.message),c(),U.emit(K.PRESET_CREATED,{preset:p.preset});let h=t.closest(".yyt-api-manager").parent();h.length&&this.renderTo(h)}else T("error",p.message)}),a.on("keypress",function(d){d.which===13&&r.find(`#${m}-dialog-save`).click()})},destroy(t){let e=Z();!e||!te(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var qo={};fe(qo,{MESSAGE_MACROS:()=>Vo,addTagRule:()=>Zt,createRuleTemplate:()=>Ho,default:()=>yl,deleteRulePreset:()=>Wo,deleteRuleTemplate:()=>jo,deleteTagRule:()=>xs,escapeRegex:()=>Nt,exportRulesConfig:()=>dn,extractComplexTag:()=>Ko,extractCurlyBraceTag:()=>Ii,extractHtmlFormatTag:()=>Uo,extractSimpleTag:()=>Ti,extractTagContent:()=>Bt,generateTagSuggestions:()=>on,getAllRulePresets:()=>ln,getAllRuleTemplates:()=>Lo,getContentBlacklist:()=>Kt,getRuleTemplate:()=>zo,getTagRules:()=>gt,importRulesConfig:()=>un,isValidTagName:()=>xi,loadRulePreset:()=>cn,saveRulesAsPreset:()=>an,scanTextForTags:()=>nn,setContentBlacklist:()=>Ts,setTagRules:()=>rn,shouldSkipContent:()=>vi,testRegex:()=>Yo,updateRuleTemplate:()=>Fo,updateTagRule:()=>es});function ul(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Si],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Ke(){return A.get(Bo,ul())}function rt(t){A.set(Bo,t)}function sn(){let t=Ke();return _e=t.ruleTemplates||[...Si],le=t.tagRules||[],Ge=t.contentBlacklist||[],{ruleTemplates:_e,tagRules:le,contentBlacklist:Ge}}function Nt(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function vi(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(n=>{let o=n.trim().toLowerCase();return o&&s.includes(o)})}function xi(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!pl.includes(t.toLowerCase())}function Ti(t,e){if(!t||!e)return[];let s=[],n=Nt(e),o=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&s.push(l[1].trim())});let r=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,a=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return r>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${r-a} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function Ii(t,e){if(!t||!e)return[];let s=[],n=Nt(e),o=new RegExp(`\\{${n}\\|`,"gi"),i;for(;(i=o.exec(t))!==null;){let r=i.index,a=r+i[0].length,l=1,c=a;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(a,c-1);d.trim()&&s.push(d.trim())}o.lastIndex=r+1}return s}function Ko(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=s[0].trim(),o=s[1].trim(),i=o.match(/<\/(\w+)>/);if(!i)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let r=i[1],a=new RegExp(`${Nt(n)}([\\s\\S]*?)<\\/${r}>`,"gi"),l=[];return[...t.matchAll(a)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Uo(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=s[1],o=[],i=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(i)].forEach(c=>{c[1]&&o.push(c[1].trim())});let a=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-l} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),o}function Bt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),i=e.filter(d=>d.type==="regex_exclude"&&d.enabled),r=t;for(let d of n)try{let u=new RegExp(`<${Nt(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Nt(d.value)}>`,"gi");r=r.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:u})}let a=[];if(o.length>0)for(let d of o){let u=[];try{if(d.type==="include")u.push(...Ti(r,d.value)),u.push(...Ii(r,d.value));else if(d.type==="regex_include"){let g=new RegExp(d.value,"gi");[...r.matchAll(g)].forEach(h=>{h[1]&&u.push(h[1])})}}catch(g){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:g})}u.forEach(g=>a.push(g.trim()))}else a.push(r);let l=[];for(let d of a){for(let u of i)try{let g=new RegExp(u.value,"gi");d=d.replace(g,"")}catch(g){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:g})}vi(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function nn(t,e={}){let s=performance.now(),{chunkSize:n=5e4,maxTags:o=100,timeoutMs:i=5e3}=e,r=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=n){let g=t.slice(u,Math.min(u+n,t.length));if(c++,l+=g.length,performance.now()-s>i){console.warn(`[YouYouToolkit] Tag scanning timed out after ${i}ms`);break}let p;for(;(p=a.exec(g))!==null&&r.size<o;){let h=(p[1]||p[2]).toLowerCase();xi(h)&&r.add(h)}if(r.size>=o)break;c%5===0&&await new Promise(h=>setTimeout(h,0))}let d=performance.now();return{tags:Array.from(r).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:r.size}}}function on(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Lo(){return _e.length===0&&sn(),_e}function zo(t){return _e.find(e=>e.id===t)}function Ho(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return _e.push(e),wi(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Fo(t,e){let s=_e.findIndex(n=>n.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(_e[s]={..._e[s],...e,updatedAt:new Date().toISOString()},wi(),{success:!0,template:_e[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function jo(t){let e=_e.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(_e.splice(e,1),wi(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function wi(){let t=Ke();t.ruleTemplates=_e,rt(t)}function gt(){return le||sn(),le}function rn(t){le=t||[];let e=Ke();e.tagRules=le,rt(e)}function Zt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};le.push(e);let s=Ke();return s.tagRules=le,rt(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function es(t,e){if(t<0||t>=le.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};le[t]={...le[t],...e};let s=Ke();return s.tagRules=le,rt(s),{success:!0,rule:le[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function xs(t){if(t<0||t>=le.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};le.splice(t,1);let e=Ke();return e.tagRules=le,rt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Kt(){return Ge||sn(),Ge}function Ts(t){Ge=t||[];let e=Ke();e.contentBlacklist=Ge,rt(e)}function an(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Ke();s.tagRulePresets||(s.tagRulePresets={});let n=`preset-${Date.now()}`;return s.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(le)),blacklist:JSON.parse(JSON.stringify(Ge)),createdAt:new Date().toISOString()},rt(s),{success:!0,preset:s.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function ln(){let e=Ke().tagRulePresets||{};return Object.values(e)}function cn(t){let e=Ke(),n=(e.tagRulePresets||{})[t];return n?(le=JSON.parse(JSON.stringify(n.rules||[])),Ge=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=le,e.contentBlacklist=Ge,rt(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Wo(t){let e=Ke(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,rt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function dn(){return JSON.stringify({tagRules:le,contentBlacklist:Ge,ruleTemplates:_e,tagRulePresets:Ke().tagRulePresets||{}},null,2)}function un(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)le=s.tagRules||[],Ge=s.contentBlacklist||[],_e=s.ruleTemplates||Si;else if(s.tagRules&&le.push(...s.tagRules),s.contentBlacklist){let o=new Set(Ge.map(i=>i.toLowerCase()));s.contentBlacklist.forEach(i=>{o.has(i.toLowerCase())||Ge.push(i)})}let n=Ke();return n.tagRules=le,n.contentBlacklist=Ge,n.ruleTemplates=_e,s.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...s.tagRulePresets}),rt(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Yo(t,e,s="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,s),i=[];if(s.includes("g")){let r;for(;(r=o.exec(e))!==null;)r.length>1?i.push({fullMatch:r[0],groups:r.slice(1),index:r.index,extracted:r[n]||r[1]||r[0]}):i.push({fullMatch:r[0],groups:[],index:r.index,extracted:r[0]})}else{let r=o.exec(e);r&&i.push({fullMatch:r[0],groups:r.length>1?r.slice(1):[],index:r.index,extracted:r.length>1?r[n]||r[1]:r[0]})}return{success:!0,matches:i,count:i.length,extracted:i.map(r=>r.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var Bo,pl,Si,_e,le,Ge,Vo,yl,pn=J(()=>{We();Bo="settings";pl=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Si=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],_e=[],le=[],Ge=[];Vo={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};sn();yl={extractTagContent:Bt,extractSimpleTag:Ti,extractCurlyBraceTag:Ii,extractComplexTag:Ko,extractHtmlFormatTag:Uo,escapeRegex:Nt,shouldSkipContent:vi,isValidTagName:xi,scanTextForTags:nn,generateTagSuggestions:on,getAllRuleTemplates:Lo,getRuleTemplate:zo,createRuleTemplate:Ho,updateRuleTemplate:Fo,deleteRuleTemplate:jo,getTagRules:gt,setTagRules:rn,addTagRule:Zt,updateTagRule:es,deleteTagRule:xs,getContentBlacklist:Kt,setContentBlacklist:Ts,saveRulesAsPreset:an,getAllRulePresets:ln,loadRulePreset:cn,deleteRulePreset:Wo,exportRulesConfig:dn,importRulesConfig:un,testRegex:Yo,MESSAGE_MACROS:Vo}});var Ve,_i=J(()=>{we();it();pn();Ve={id:"regexExtractPanel",render(t){let e=gt(),s=Kt(),n=ln();return`
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
    `},_renderRulesEditor(t,e,s){let n=t.length>0?t.map((i,r)=>this._renderRuleItem(i,r)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',o=s.length>0?s.map(i=>`<option value="${i.id}">${_(i.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${o?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${m}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${o}
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
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val();es(n,{type:o}),T("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val().trim();es(n,{value:o})}),t.find(".yyt-rule-enabled").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).is(":checked");es(n,{enabled:o}),T("info",o?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let n=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(xs(n),this.renderTo(t),T("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let o=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(xs(o),this.renderTo(t),T("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${m}-add-rule`).on("click",()=>{Zt({type:"include",value:"",enabled:!0}),this.renderTo(t),T("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${m}-scan-tags`).on("click",async()=>{let s=t.find(`#${m}-scan-tags`),n=t.find(`#${m}-test-input`).val();if(!n||!n.trim()){T("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=await nn(n,{maxTags:50,timeoutMs:3e3}),{suggestions:i,stats:r}=on(o,25);if(i.length===0){T("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${m}-tag-suggestions-container`).hide();return}let a=t.find(`#${m}-tag-list`);t.find(`#${m}-tag-scan-stats`).text(`${r.finalCount}/${r.totalFound} \u4E2A\u6807\u7B7E, ${o.stats.processingTimeMs}ms`),a.empty(),i.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${_(c)}</button>`);d.on("click",()=>{if(gt().some(p=>p.type==="include"&&p.value===c)){T("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Zt({type:"include",value:c,enabled:!0}),this.renderTo(t),T("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),a.append(d)}),t.find(`#${m}-tag-suggestions-container`).show(),T("success",`\u53D1\u73B0 ${i.length} \u4E2A\u6807\u7B7E`)}catch(o){T("error",`\u626B\u63CF\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${m}-add-exclude-cot`).on("click",()=>{let s=gt(),n="<!--[\\s\\S]*?-->";if(s.some(i=>i.type==="regex_exclude"&&i.value===n)){T("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Zt({type:"regex_exclude",value:n,enabled:!0}),this.renderTo(t),T("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${m}-content-blacklist`).on("change",function(){let n=e(this).val().split(",").map(o=>o.trim()).filter(o=>o);Ts(n),T("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${n.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${m}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.find(`#${m}-load-rule-preset`).on("click",()=>{let s=t.find(`#${m}-rule-preset-select`).val();if(!s){T("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let n=cn(s);n.success?(this.renderTo(t),T("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${n.preset.name}`),U.emit(K.REGEX_PRESET_LOADED,{preset:n.preset})):T("error",n.message)}),t.find(`#${m}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let n=an(s.trim());n.success?(this.renderTo(t),T("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):T("error",n.message)})},_bindTestEvents(t,e){t.find(`#${m}-test-extract`).on("click",()=>{let s=t.find(`#${m}-test-input`).val();if(!s||!s.trim()){T("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let n=gt(),o=Kt(),i=Bt(s,n,o),r=t.find(`#${m}-test-result-container`),a=t.find(`#${m}-test-result`);r.show(),!i||!i.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),T("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${_(i)}</pre>`),T("success","\u63D0\u53D6\u5B8C\u6210"),U.emit(K.REGEX_EXTRACTED,{result:i}))}),t.find(`#${m}-test-clear`).on("click",()=>{t.find(`#${m}-test-input`).val(""),t.find(`#${m}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${m}-import-rules`).on("click",()=>{t.find(`#${m}-import-rules-file`).click()}),t.find(`#${m}-import-rules-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let o=await yt(n),i=un(o,{overwrite:!0});i.success?(this.renderTo(t),T("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):T("error",i.message)}catch(o){T("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.find(`#${m}-export-rules`).on("click",()=>{try{let s=dn();pt(s,`youyou_toolkit_rules_${Date.now()}.json`),T("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){T("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${m}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(rn([]),Ts([]),this.renderTo(t),T("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Jo={};fe(Jo,{DEFAULT_TOOL_PRESETS:()=>at,DEFAULT_TOOL_STRUCTURE:()=>Ae,TOOL_STORAGE_KEYS:()=>oe,cloneTool:()=>ml,createDefaultToolDefinition:()=>Is,deleteTool:()=>Ai,deleteToolPreset:()=>Sl,exportTools:()=>Mi,getAllToolPresets:()=>Ci,getAllTools:()=>Ut,getCurrentToolPresetId:()=>vl,getTool:()=>ss,getToolPreset:()=>hl,importTools:()=>ki,normalizeToolDefinitionToRuntimeConfig:()=>yn,resetTools:()=>Pi,saveTool:()=>gn,saveToolPreset:()=>bl,setCurrentToolPreset:()=>xl,setToolEnabled:()=>Ri,validateTool:()=>Tl});function ts(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Ei(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function gl(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function fl(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let n=gl(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Is(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...Ae,...t,id:t?.id||Ae.id,icon:t?.icon||Ae.icon,order:Number.isFinite(t?.order)?t.order:Ae.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Ae.promptTemplate,extractTags:ts(t?.extractTags),config:{...Ae.config,...s,trigger:{...Ae.config.trigger,...s.trigger||{},events:ts(s?.trigger?.events)},execution:{...Ae.config.execution,...s.execution||{},timeout:Ei(s?.execution?.timeout,Ae.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||Ae.config.execution.retries)},api:{...Ae.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...Ae.config.context,...s.context||{},depth:Ei(s?.context?.depth,Ae.config.context.depth),includeTags:ts(s?.context?.includeTags),excludeTags:ts(s?.context?.excludeTags)}},enabled:t?.enabled!==!1,metadata:{...Ae.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function yn(t,e={},s={}){let n=Is({...e,id:t||e?.id||""}),o=ts(n?.config?.trigger?.events),i=ts(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),r=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),a=fl(t,n),l=o[0]||"GENERATION_ENDED",c=o.includes("GENERATION_ENDED"),d=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,trigger:{event:l,enabled:c},bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:d,apiPreset:r,overwrite:!0,enabled:d==="post_response_api"?c:!1},extraction:{enabled:!0,maxMessages:Ei(n?.config?.context?.depth,5),selectors:i},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:r,extractTags:i,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function Ut(){let t=ee.get(oe.TOOLS),e=t&&typeof t=="object"?{...at,...t}:{...at};return Object.fromEntries(Object.entries(e).map(([s,n])=>[s,Is({...n||{},id:s})]))}function ss(t){return Ut()[t]||null}function gn(t,e){if(!t||!e)return!1;let s=ee.get(oe.TOOLS)||{},n=!s[t]&&!at[t],o=Is({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=o,ee.set(oe.TOOLS,s),U.emit(n?K.TOOL_REGISTERED:K.TOOL_UPDATED,{toolId:t,tool:o}),!0}function Ai(t){if(at[t])return!1;let e=ee.get(oe.TOOLS)||{};return e[t]?(delete e[t],ee.set(oe.TOOLS,e),U.emit(K.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function Ri(t,e){let s=ss(t);if(!s)return!1;let n=ee.get(oe.TOOLS)||{};return n[t]||(n[t]={...s}),n[t].enabled=e,n[t].metadata={...n[t].metadata,updatedAt:new Date().toISOString()},ee.set(oe.TOOLS,n),U.emit(e?K.TOOL_ENABLED:K.TOOL_DISABLED,{toolId:t}),!0}function ml(t,e,s){let n=ss(t);if(!n)return!1;let o=JSON.parse(JSON.stringify(n));return o.name=s||`${n.name} (\u526F\u672C)`,o.metadata={...o.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},gn(e,o)}function Ci(){let t=ee.get(oe.PRESETS);return t&&typeof t=="object"?{...at,...t}:{...at}}function hl(t){return Ci()[t]||null}function bl(t,e){if(!t||!e)return!1;let s=ee.get(oe.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},ee.set(oe.PRESETS,s),!0}function Sl(t){if(at[t])return!1;let e=ee.get(oe.PRESETS)||{};return e[t]?(delete e[t],ee.set(oe.PRESETS,e),!0):!1}function vl(){return ee.get(oe.CURRENT_PRESET)||null}function xl(t){return Ci()[t]?(ee.set(oe.CURRENT_PRESET,t),!0):!1}function Mi(){let t=ee.get(oe.TOOLS)||{},e=ee.get(oe.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function ki(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=s?{}:ee.get(oe.TOOLS)||{},i=s?{}:ee.get(oe.PRESETS)||{},r=0,a=0;if(n.tools&&typeof n.tools=="object"){for(let[l,c]of Object.entries(n.tools))at[l]&&!s||c&&typeof c=="object"&&(o[l]=Is({...c,id:l}),r++);ee.set(oe.TOOLS,o)}if(n.presets&&typeof n.presets=="object"){for(let[l,c]of Object.entries(n.presets))at[l]&&!s||c&&typeof c=="object"&&(i[l]=c,a++);ee.set(oe.PRESETS,i)}return{success:!0,toolsImported:r,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${r} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Pi(){ee.remove(oe.TOOLS),ee.remove(oe.PRESETS),ee.remove(oe.CURRENT_PRESET)}function Tl(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:n,api:o,context:i}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),n&&((typeof n.timeout!="number"||n.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof n.retries!="number"||n.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),i&&typeof i.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var Ae,at,oe,fn=J(()=>{We();we();Ae={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},at={},oe={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var yr={};fe(yr,{TOOL_CATEGORIES:()=>Xo,TOOL_REGISTRY:()=>ns,appendToolRuntimeHistory:()=>As,clearToolApiPreset:()=>rr,default:()=>Ml,ensureToolRuntimeConfig:()=>hn,getAllDefaultToolConfigs:()=>dr,getAllToolApiBindings:()=>ar,getAllToolFullConfigs:()=>Bi,getEnabledTools:()=>os,getToolApiPreset:()=>Oi,getToolBaseConfig:()=>mn,getToolConfig:()=>Es,getToolFullConfig:()=>ue,getToolList:()=>sr,getToolSubTabs:()=>nr,getToolWindowState:()=>pr,hasTool:()=>$i,onPresetDeleted:()=>lr,patchToolRuntime:()=>is,registerTool:()=>er,resetToolConfig:()=>cr,resetToolRegistry:()=>ir,saveToolConfig:()=>ct,saveToolWindowState:()=>ur,setToolApiPreset:()=>or,setToolApiPresetConfig:()=>Al,setToolBypassConfig:()=>Rl,setToolOutputMode:()=>El,setToolPromptTemplate:()=>Cl,unregisterTool:()=>tr,updateToolRuntime:()=>Ni});function ws(t={}){let e=Array.isArray(t?.recentTriggerHistory)?t.recentTriggerHistory.filter(Boolean):[],s=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0,lastTriggerAt:0,lastTriggerEvent:"",lastMessageKey:"",lastExecutionKey:"",lastSkipReason:"",lastExecutionPath:"",lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:"",lastSlotRevisionKey:"",lastSlotTransactionId:"",lastSourceMessageId:"",lastSourceSwipeId:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0,lastTraceId:"",...t,recentTriggerHistory:e,recentWritebackHistory:s}}function Il(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Qo(){let t=Ut()||{};return Object.entries(t).filter(([e])=>!_s[e]).map(([e,s])=>[e,s||{}])}function Zo(){let t=Array.isArray(ns.tools?.subTabs)?[...ns.tools.subTabs]:[],e=Qo().map(([s,n],o)=>{let i=yn(s,n);return{id:s,name:i.name||s,icon:i.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(i.order)?i.order:100+o,isCustom:!0,description:i.description||""}});return[...t,...e].sort((s,n)=>(s.order??0)-(n.order??0))}function wl(t,e={}){let s=yn(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:ws(s.runtime)}}function Gi(t){let e=_s[t];if(e)return{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:ws(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=(Ut()||{})[t]||null;return n?wl(t,n):Es(t)}function mn(t){let e=Gi(t);return e?{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function _l(t,e={},s=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.trigger={...t.trigger||{},...e.trigger||{}},n.output={...t.output||{},...e.output||{}},n.bypass={...t.bypass||{},...e.bypass||{}},n.runtime=ws({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}};let o=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||s||"";return n.output={...n.output||{},apiPreset:o},n.apiPreset=o,(!Array.isArray(n.extraction.selectors)||n.extraction.selectors.length===0)&&Array.isArray(n.extractTags)&&n.extractTags.length>0&&(n.extraction.selectors=[...n.extractTags]),(!Array.isArray(n.extractTags)||n.extractTags.length===0)&&(n.extractTags=Array.isArray(n.extraction.selectors)?[...n.extraction.selectors]:[]),t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function er(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let n of s)if(!e[n])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return lt[t]={id:t,...e,order:e.order??Object.keys(lt).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function tr(t){return lt[t]?(delete lt[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function sr(t=!0){let e=Object.values(lt).map(s=>s.id==="tools"?{...s,subTabs:Zo()}:s);return t?e.sort((s,n)=>(s.order??0)-(n.order??0)):e}function Es(t){return t==="tools"&&lt[t]?{...lt[t],subTabs:Zo()}:lt[t]||null}function $i(t){return!!lt[t]}function nr(t){let e=Es(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function ir(){lt={...ns},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function or(t,e){if(!$i(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=A.get(He)||{};return s[t]=e||"",A.set(He,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Oi(t){return(A.get(He)||{})[t]||""}function rr(t){let e=A.get(He)||{};delete e[t],A.set(He,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function ar(){return A.get(He)||{}}function lr(t){let e=A.get(He)||{},s=!1;for(let n in e)e[n]===t&&(e[n]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&A.set(He,e)}function ue(t){let e=Gi(t);if(!e)return Es(t);let n=(A.get(Lt)||{})[t]||{},o=Oi(t);return _l({...e,id:t},n,o)}function hn(t){if(!t)return!1;let e=Gi(t);if(!e)return!1;let s=A.get(Lt)||{};if(s[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};s[t]=n,A.set(Lt,s);let o=A.get(He)||{};return o[t]=n.output?.apiPreset||n.apiPreset||"",A.set(He,o),U.emit(K.TOOL_UPDATED,{toolId:t,config:n}),!0}function ct(t,e,s={}){if(!t||!ue(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=s,o=A.get(Lt)||{},i=A.get(He)||{},r=e?.output?.apiPreset??e?.apiPreset??"",a=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return o[t]={},a.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:r};return}if(l==="apiPreset"){o[t][l]=r;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=r),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:r}),A.set(Lt,o),i[t]=r,A.set(He,i),n&&U.emit(K.TOOL_UPDATED,{toolId:t,config:o[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function El(t,e){let s=ue(t);return s?ct(t,{...s,output:{...s.output,mode:e}}):!1}function Al(t,e){let s=ue(t);return s?ct(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function Rl(t,e){let s=ue(t);return s?ct(t,{...s,bypass:{...s.bypass,...e}}):!1}function Cl(t,e){let s=ue(t);return s?ct(t,{...s,promptTemplate:e}):!1}function is(t,e,s={}){let n=ue(t);if(!n)return!1;let{touchLastRunAt:o=!1,emitEvent:i=!1}=s,r=ws({...n.runtime||{},...e||{}});return o&&(r.lastRunAt=Date.now()),ct(t,{...n,runtime:r},{emitEvent:i})}function As(t,e,s={},n={}){let o=ue(t);if(!o)return!1;let{limit:i=10,emitEvent:r=!1}=n,a=ws(o.runtime||{}),l=e==="writeback"?"recentWritebackHistory":"recentTriggerHistory",c={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return a[l]=Il([...Array.isArray(a[l])?a[l]:[],c],i),c?.traceId&&(a.lastTraceId=c.traceId),ct(t,{...o,runtime:a},{emitEvent:r})}function Ni(t,e){return is(t,e,{touchLastRunAt:!0,emitEvent:!0})}function cr(t){if(!t||!_s[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=A.get(Lt)||{};return delete e[t],A.set(Lt,e),U.emit(K.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function dr(){return{..._s}}function Bi(){let t=new Set([...Object.keys(_s),...Qo().map(([e])=>e)]);return Array.from(t).map(e=>ue(e)).filter(Boolean)}function os(){return Bi().filter(t=>t&&t.enabled)}function ur(t,e){let s=A.get(Di)||{};s[t]={...e,updatedAt:Date.now()},A.set(Di,s)}function pr(t){return(A.get(Di)||{})[t]||null}var Lt,He,Di,_s,ns,Xo,lt,Ml,rs=J(()=>{We();we();fn();Lt="tool_configs",He="tool_api_bindings",Di="tool_window_states";_s={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},ns={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},Xo={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},lt={...ns};Ml={TOOL_REGISTRY:ns,TOOL_CATEGORIES:Xo,registerTool:er,unregisterTool:tr,getToolList:sr,getToolConfig:Es,hasTool:$i,getToolSubTabs:nr,resetToolRegistry:ir,setToolApiPreset:or,getToolApiPreset:Oi,clearToolApiPreset:rr,getAllToolApiBindings:ar,onPresetDeleted:lr,saveToolWindowState:ur,getToolWindowState:pr,getToolBaseConfig:mn,ensureToolRuntimeConfig:hn,getToolFullConfig:ue,patchToolRuntime:is,appendToolRuntimeHistory:As,saveToolConfig:ct,resetToolConfig:cr,getAllDefaultToolConfigs:dr,getAllToolFullConfigs:Bi,getEnabledTools:os}});var qe,Ki=J(()=>{it();fn();rs();qe={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){T("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=Ut(),s=Object.entries(e),n=s.filter(([,o])=>o?.enabled!==!1).length;return`
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
      `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item"),o=n.data("tool-id"),i=e(s.currentTarget).is(":checked");Ri(o,i),n.toggleClass("yyt-enabled",i).toggleClass("yyt-disabled",!i),T("info",i?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(n)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,n)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),o=ss(n);if(!n||!o||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${o.name}\u201D\u5417\uFF1F`))return;if(!Ai(n)){T("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),T("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let o=await yt(n),i=ki(o,{overwrite:!1});T(i.success?"success":"error",i.message),i.success&&this.renderTo(t)}catch(o){T("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=Mi();pt(s,`youyou_toolkit_tools_${Date.now()}.json`),T("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){T("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Pi(),this.renderTo(t),T("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let n=s?ss(s):null,o=!!n,i=`
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
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(i);let r=e("#yyt-tool-dialog-overlay"),a=()=>r.remove();r.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),r.on("click",function(l){l.target===this&&a()}),r.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),u=parseInt(e("#yyt-tool-timeout").val())||6e4,g=parseInt(e("#yyt-tool-retries").val())||3;if(!l){T("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let p=s||`tool_${Date.now()}`;if(!gn(p,{name:l,category:c,description:d,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{trigger:n?.config?.trigger||{type:"manual",events:[]},execution:{timeout:u,retries:g},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]}},enabled:n?.enabled!==!1})){T("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}hn(p),a(),this.renderTo(t),T("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(p)})},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var gr={};fe(gr,{BypassManager:()=>bn,DEFAULT_BYPASS_PRESETS:()=>mt,addMessage:()=>Ll,buildBypassMessages:()=>Wl,bypassManager:()=>Y,createPreset:()=>Gl,default:()=>Yl,deleteMessage:()=>Hl,deletePreset:()=>Ol,duplicatePreset:()=>Nl,exportPresets:()=>Fl,getAllPresets:()=>Pl,getDefaultPresetId:()=>Bl,getEnabledMessages:()=>Ul,getPreset:()=>Dl,getPresetList:()=>Li,importPresets:()=>jl,setDefaultPresetId:()=>Kl,updateMessage:()=>zl,updatePreset:()=>$l});var ft,as,Ui,mt,kl,bn,Y,Pl,Li,Dl,Gl,$l,Ol,Nl,Bl,Kl,Ul,Ll,zl,Hl,Fl,jl,Wl,Yl,Rs=J(()=>{We();we();ft="bypass_presets",as="default_bypass_preset",Ui="current_bypass_preset",mt={},kl=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),bn=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=A.get(ft,{});return this._cache={...mt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,n)=>(n.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:n,description:o,messages:i}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=s.trim();if(this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let a={id:r,name:n.trim(),description:o||"",enabled:!0,messages:i||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r,a),U.emit(K.BYPASS_PRESET_CREATED,{presetId:r,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${r}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...n,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,o),U.emit(K.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(mt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=A.get(ft,{});return delete n[e],A.set(ft,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),U.emit(K.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,n){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let i={...JSON.parse(JSON.stringify(o)),id:s.trim(),name:n||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),i),U.emit(K.BYPASS_PRESET_CREATED,{presetId:s,preset:i}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${i.name}"`,preset:i}}addMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},i=[...n.messages||[],o];return this.updatePreset(e,{messages:i})}updateMessage(e,s,n){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let i=o.messages||[],r=i.findIndex(l=>l.id===s);if(r===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let a=[...i];return a[r]={...a[r],...n},this.updatePreset(e,{messages:a})}deleteMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=n.messages||[],i=o.find(a=>a.id===s);if(!i)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(i.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let r=o.filter(a=>a.id!==s);return this.updatePreset(e,{messages:r})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=A.get(as,null);return e==="undefined"||e==="null"||e===""?(A.remove(as),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(A.set(as,e),U.emit(K.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:n=!1}=s,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let i=Array.isArray(o)?o:o.presets?o.presets:[o];if(i.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=A.get(ft,{}),a=0;for(let l of i)!l.id||typeof l.id!="string"||l.name&&(mt[l.id]&&!n||!n&&r[l.id]||(r[l.id]={...l,updatedAt:Date.now()},a++));return a>0&&(A.set(ft,r),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let n=A.get(ft,{});n[e]=s,A.set(ft,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=A.get(ft,{}),s={},n=!1,o=Array.isArray(e)?e.map((i,r)=>[i?.id||i?.name||`legacy_${r}`,i]):Object.entries(e||{});for(let[i,r]of o){let a=this._normalizePreset(i,r,s);if(!a){n=!0;continue}s[a.id]=a,(!e?.[a.id]||e?.[a.id]?.id!==a.id)&&(n=!0)}n&&A.set(ft,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,n={}){if(!s||typeof s!="object")return null;let o=typeof s.name=="string"?s.name.trim():"",i=typeof s.id=="string"?s.id.trim():"",r=typeof e=="string"?e.trim():"";if(!o&&r&&r!=="undefined"&&r!=="null"&&(o=r),this._isLegacySamplePreset(o,i)||(!i&&r&&r!=="undefined"&&r!=="null"&&(i=r),!i&&o&&o!=="undefined"&&o!=="null"&&(i=this._generatePresetId(o,n)),!o||!i||i==="undefined"||o==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${i}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:i,name:o,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=A.get(as,null),n=A.get(Ui,null),o=s??n;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(r=>r.name===o)?.id||null),o?A.set(as,o):A.remove(as),A.has(Ui)&&A.remove(Ui)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||kl.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=n,i=1;for(;s[o];)o=`${n}_${i++}`;return o}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},Y=new bn,Pl=()=>Y.getAllPresets(),Li=()=>Y.getPresetList(),Dl=t=>Y.getPreset(t),Gl=t=>Y.createPreset(t),$l=(t,e)=>Y.updatePreset(t,e),Ol=t=>Y.deletePreset(t),Nl=(t,e,s)=>Y.duplicatePreset(t,e,s),Bl=()=>Y.getDefaultPresetId(),Kl=t=>Y.setDefaultPresetId(t),Ul=t=>Y.getEnabledMessages(t),Ll=(t,e)=>Y.addMessage(t,e),zl=(t,e,s)=>Y.updateMessage(t,e,s),Hl=(t,e)=>Y.deleteMessage(t,e),Fl=t=>Y.exportPresets(t),jl=(t,e)=>Y.importPresets(t,e),Wl=t=>Y.buildBypassMessages(t),Yl=Y});var fr={};fe(fr,{DEFAULT_SETTINGS:()=>Cs,SettingsService:()=>Sn,default:()=>Vl,settingsService:()=>Ue});var Cs,zi,Sn,Ue,Vl,Ms=J(()=>{We();we();Cs={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!1,debounceMs:300,useMessageReceivedFallback:!0,useGenerationAfterCommandsFallback:!0,messageSessionWindowMs:1800,historyRetentionLimit:10},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},zi="settings_v2",Sn=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=A.get(zi,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),A.set(zi,this._cache),U.emit(K.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),n=this._deepMerge(s,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Cs)),A.set(zi,this._cache),U.emit(K.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let n=this.getSettings(),o=e.split("."),i=n;for(let r of o)if(i&&typeof i=="object"&&r in i)i=i[r];else return s;return i}set(e,s){let n=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),i=n;for(let r=0;r<o.length-1;r++){let a=o[r];a in i||(i[a]={}),i=i[a]}i[o[o.length-1]]=s,this.saveSettings(n)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Cs)),e)}_deepMerge(e,s){let n={...e};for(let o in s)s[o]&&typeof s[o]=="object"&&!Array.isArray(s[o])?n[o]=this._deepMerge(e[o]||{},s[o]):n[o]=s[o];return n}},Ue=new Sn,Vl=Ue});var hr={};fe(hr,{ContextInjector:()=>Tn,DEFAULT_INJECTION_OPTIONS:()=>mr,WRITEBACK_METHODS:()=>Ee,WRITEBACK_RESULT_STATUS:()=>xn,contextInjector:()=>In,default:()=>Xl});function Hi(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function _t(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}var Je,vn,mr,xn,Ee,ql,Jl,Tn,In,Xl,Fi=J(()=>{we();Je="YouYouToolkit_toolOutputs",vn="YouYouToolkit_injectedContext",mr={overwrite:!0,enabled:!0};xn={SUCCESS:"success",FAILED:"failed"},Ee={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},ql=60,Jl=3;Tn=class{constructor(){this.debugMode=!1}async inject(e,s,n={}){return(await this.injectDetailed(e,s,n)).success}async injectDetailed(e,s,n={}){let o={...mr,...n},i=this._createWritebackResult(e,o);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),i.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",i;if(!Hi(o.sourceMessageId))return this._log("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),i.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",i;let r=i.chatId,a={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};U.emit(K.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:r,content:a.content,sourceMessageId:a.sourceMessageId,sourceSwipeId:a.sourceSwipeId,effectiveSwipeId:a.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,a,o,i);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${r}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),n=this._findAssistantMessageIndex(s,e);if(n<0)return"";let o=s[n]||{},i=o[vn];if(typeof i=="string"&&i.trim())return i.trim();let r=o[Je];return r&&typeof r=="object"?this._buildMessageInjectedContext(r).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let o=(e[s]||{})[Je];return o&&typeof o=="object"?o:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:n}=this._getChatRuntime(),o=this._findAssistantMessageIndex(n,null);return o<0?null:n[o]?.[Je]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:n,context:o,chat:i}=this._getChatRuntime(),r=this._findAssistantMessageIndex(i,null);if(r<0)return!1;let a=i[r],l=a?.[Je];if(!l||!l[s])return!1;delete l[s],a[Je]=l,a[vn]=this._buildMessageInjectedContext(l);let c=o?.saveChat||n?.saveChat||null;return typeof c=="function"&&await c.call(o||n),U.emit(K.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(n){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",n),!1}}async clearAllContext(e){try{let{api:s,context:n,chat:o}=this._getChatRuntime(),i=this._findAssistantMessageIndex(o,null);if(i<0)return!1;let r=o[i];delete r[Je],delete r[vn];let a=n?.saveChat||s?.saveChat||null;return typeof a=="function"&&await a.call(n||s),U.emit(K.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),n=Object.entries(s).map(([o,i])=>({toolId:o,updatedAt:i.updatedAt,contentLength:i.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,n=s?.getContext?.()||null,o=Array.isArray(n?.chat)?n.chat:[],i=Array.isArray(s?.chat)?s.chat:[],r=o.length?o:i;return{topWindow:e,api:s,context:n,chat:r,contextChat:o,apiChat:i}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let n=Ee.SET_CHAT_MESSAGE;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,effectiveSwipeId:s.effectiveSwipeId||s.sourceSwipeId||null,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Ee.NONE,commit:{preferredMethod:n,attemptedMethods:[],appliedMethod:Ee.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:xn.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,n,o,i,r=null){let a=e?.contextChat?.[n]||e?.apiChat?.[n]||s?.[n]||r||null,l=this._getWritableMessageField(a).text||"",c=a?.[Je]?.[o],d=i?l.includes(i):!0,u=!!(c&&String(c.content||"").trim()===i);return{latestMessage:a,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,n,o,i,r=null){let a=1,l=this._collectWritebackVerification(e,s,n,o,i,r);for(let c=0;c<Jl;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:a,confirmedBy:"text_and_mirror_present"};await this._wait(ql),a+=1,l=this._collectWritebackVerification(e,s,n,o,i,r)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:a,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let n=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,s){let n=String(e||""),o=String(s||"").trim();return o?n.includes(o)?{text:n.replace(o,"").trimEnd(),removed:!0}:{text:n,removed:!1}:{text:n,removed:!1}}_syncMessageToRuntimeChats(e,s,n){let{contextChat:o,apiChat:i}=e||{},r=a=>{!Array.isArray(a)||s<0||s>=a.length||a[s]!==n&&(a[s]={...a[s]||{},...n})};r(o),r(i)}_notifyMessageUpdated(e,s){try{let{api:n,topWindow:o}=e||{},i=n?.eventSource||null,a=(n?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";i&&typeof i.emit=="function"&&(i.emit(a,s),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{i.emit(a,s)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{i.emit(a,s)},30))}catch(n){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",n)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let o=s!=null&&s!=="",i=(r,a)=>{if(!this._isAssistantMessage(r)||s==null||s==="")return!1;let l=String(s).trim();return l?[r.message_id,r.id,r.messageId,r.mes_id,a].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let r=n.length-1;r>=0;r-=1)if(i(n[r],r))return r;if(o)return-1;for(let r=n.length-1;r>=0;r-=1)if(this._isAssistantMessage(n[r]))return r;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).sort(([,i],[,r])=>(i?.updatedAt||0)-(r?.updatedAt||0));if(!n.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[i,r]of n)o.push(`[${i}]`),o.push(r?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let n of s)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,s,n={}){let o=e&&typeof e=="object"?e:{},i=["mes","message","content","text"],r=!1;if(i.forEach(a=>{typeof o[a]=="string"&&(o[a]=s,r=!0)}),r||(o.mes=s,o.message=s),Array.isArray(o.swipes)){let a=Number.parseInt(Hi(n?.sourceSwipeId||n?.effectiveSwipeId),10),l=Number.isInteger(a)?a:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=s,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,s=[]){let n=String(e||"");return(Array.isArray(s)?s:[]).forEach(i=>{let r=String(i||"").trim();if(!r)return;if(r.startsWith("regex:")){try{let d=new RegExp(r.slice(6).trim(),"gis");n=n.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",r,d)}return}let a=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${a}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${a}>\\s*`,"gi"),c=new RegExp(`\\{${a}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(l,""),n=n.replace(c,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,s){let n=String(e||""),o=String(s||"").trim();return o?n.replace(o,"").trimEnd():n.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,s,n={},o=null){let i=o||this._createWritebackResult(e,n);try{let r=this._getChatRuntime(),{api:a,context:l,chat:c}=r;if(!Array.isArray(c)||!c.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),i.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",i;let d=this._findAssistantMessageIndex(c,n.sourceMessageId);if(d<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),i.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",i;i.messageIndex=d,i.steps.foundTargetMessage=!0;let u=c[d],{key:g,text:p}=this._getWritableMessageField(u);i.textField=g;let h=u[Je]&&typeof u[Je]=="object"?u[Je]:{},v=h?.[e]||{},k=v?.content||"",$=v?.blockText||k||"",L=Object.entries(h).filter(([se])=>se!==e).map(([,se])=>se||{}),E=String(s.content||"").trim(),I=this._inferBlockType(E),y={toolId:e,messageId:n.sourceMessageId||u?.message_id||u?.messageId||d,blockType:I,insertedAt:s.updatedAt,replaceable:n.overwrite!==!1};i.blockIdentity=y;let B=n.overwrite===!1?{text:String(p||""),removed:!1}:this._stripExactStoredBlock(p,$),M=B.text,C="";n.overwrite!==!1&&$&&!B.removed&&(C="previous_block_not_found");let P=n.overwrite===!1?M:this._stripExistingToolOutput(M,n.extractionSelectors),w=P!==M;M=P;let G=n.overwrite===!1?M:this._stripPreviousStoredToolContent(M,k),re=G!==M;M=G,i.replacedExistingBlock=B.removed||w||re;let he=[(n.overwrite===!1?String(p||""):M).trimEnd(),E].filter(Boolean).join(`

`).trim();i.insertedNewBlock=!!E;let Me=L.every(se=>{let f=String(se?.blockText||se?.content||"").trim();return f?he.includes(f):!0});i.preservedOtherToolBlocks=Me,Me?C&&(i.conflictDetected=!0,i.conflictReason=C):(i.conflictDetected=!0,i.conflictReason="other_tool_block_removed");let ve={...h,[e]:{toolId:e,content:E,blockText:E,blockType:I,blockIdentity:y,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};u[g]=he,this._applyMessageText(u,he,n),u[Je]=ve,u[vn]=this._buildMessageInjectedContext(ve),i.contentCommitted=!0,i.commit.contentCommitted=!0,i.steps.contentCommitted=!0,i.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(r,d,u),i.steps.runtimeSynced=!0;let Te=l?.setChatMessages||a?.setChatMessages||r?.topWindow?.setChatMessages||null,Ne=l?.setChatMessage||a?.setChatMessage||r?.topWindow?.setChatMessage||null;i.commit.preferredMethod=typeof Ne=="function"?Ee.SET_CHAT_MESSAGE:typeof Te=="function"?Ee.SET_CHAT_MESSAGES:Ee.LOCAL_ONLY;let dt=!1;if(typeof Ne=="function"){_t(i.commit.attemptedMethods,Ee.SET_CHAT_MESSAGE);try{await Ne.call(l||a||r?.topWindow,{message:he,mes:he,content:he,text:he},d,{swipe_id:Hi(n.sourceSwipeId||n.effectiveSwipeId)||"current",refresh:"display_and_render_current"}),i.steps.hostSetChatMessage=!0,i.hostUpdateMethod=Ee.SET_CHAT_MESSAGE,i.hostCommitApplied=!0,i.commit.appliedMethod=Ee.SET_CHAT_MESSAGE,i.commit.hostCommitApplied=!0,dt=!0}catch(se){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",se),i.errors.push(`setChatMessage: ${se?.message||String(se)}`)}}if(!dt&&typeof Te=="function"){_t(i.commit.attemptedMethods,Ee.SET_CHAT_MESSAGES);try{await Te.call(l||a||r?.topWindow,[{message_id:d,message:he,mes:he,content:he,text:he}],{refresh:"affected"}),i.steps.hostSetChatMessages=!0,i.hostUpdateMethod=Ee.SET_CHAT_MESSAGES,i.hostCommitApplied=!0,i.commit.appliedMethod=Ee.SET_CHAT_MESSAGES,i.commit.hostCommitApplied=!0,i.commit.fallbackUsed=!0,dt=!0}catch(se){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",se),i.errors.push(`setChatMessages: ${se?.message||String(se)}`)}}if(dt||(_t(i.commit.attemptedMethods,Ee.LOCAL_ONLY),i.commit.appliedMethod=Ee.LOCAL_ONLY,i.commit.fallbackUsed=i.commit.preferredMethod!==Ee.LOCAL_ONLY),i.hostUpdateMethod=i.commit.appliedMethod,typeof Ne=="function")try{await Ne.call(l||a||r?.topWindow,{},d),i.steps.refreshForceSetChatMessage=!0,i.refreshRequested=!0,_t(i.refresh.requestMethods,"setChatMessage(force_refresh)")}catch(se){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",se),i.errors.push(`setChatMessage(refresh): ${se?.message||String(se)}`)}let ye=l?.saveChat||a?.saveChat||null,ge=l?.saveChatDebounced||a?.saveChatDebounced||null;typeof ge=="function"&&(ge.call(l||a),i.steps.saveChatDebounced=!0,i.refreshRequested=!0,_t(i.refresh.requestMethods,"saveChatDebounced")),typeof ye=="function"&&(await ye.call(l||a),i.steps.saveChat=!0,i.refreshRequested=!0,_t(i.refresh.requestMethods,"saveChat")),this._notifyMessageUpdated(r,d),i.steps.notifiedMessageUpdated=!0;let vt=String(s.content||"").trim();(i.steps.hostSetChatMessages||i.steps.hostSetChatMessage)&&(i.refreshRequested=!0,_t(i.refresh.requestMethods,i.hostUpdateMethod)),i.steps.notifiedMessageUpdated&&(i.refreshRequested=!0,_t(i.refresh.requestMethods,"MESSAGE_UPDATED")),i.steps.refreshRequested=i.refreshRequested,i.refresh.requested=i.refreshRequested;let st=await this._confirmRefresh(r,c,d,e,vt,u);return i.verification.textIncludesContent=st.textIncludesContent,i.verification.mirrorStored=st.mirrorStored,i.verification.refreshConfirmed=st.refreshConfirmed,i.steps.verifiedAfterWrite=i.verification.textIncludesContent&&i.verification.mirrorStored,i.refreshConfirmed=i.verification.refreshConfirmed&&i.refreshRequested,i.refresh.confirmChecks=Number(st.confirmChecks)||0,i.refresh.confirmedBy=st.confirmedBy||"",i.refresh.confirmed=i.refreshConfirmed,i.steps.refreshConfirmed=i.refreshConfirmed,i.success=i.steps.localTextApplied&&i.steps.runtimeSynced&&i.steps.verifiedAfterWrite&&i.refreshConfirmed,i.writebackStatus=i.success?xn.SUCCESS:xn.FAILED,!i.success&&!i.error&&(i.error=i.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),i.conflictDetected&&!i.error&&(i.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${i.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),i}catch(r){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",r),i.error=r?.message||String(r),i.errors.push(i.error),i}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),o=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(r=>typeof r=="string"&&r.trim());if(o)return o;let i=e.SillyTavern?.this_chid;if(i!=null)return`chat_char_${i}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},In=new Tn,Xl=In});var Sr={};fe(Sr,{BUILTIN_VARIABLES:()=>br,VariableResolver:()=>wn,default:()=>Ql,variableResolver:()=>Et});var br,wn,Et,Ql,ji=J(()=>{we();br={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},wn=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,s),n=this._resolveCustomVariables(n,s),n=this._resolveRegexVariables(n,s),n}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,s));let n={};for(let[o,i]of Object.entries(e))typeof i=="string"?n[o]=this.resolveTemplate(i,s):typeof i=="object"&&i!==null?n[o]=this.resolveObject(i,s):n[o]=i;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(br))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,n]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let o of this.getAvailableVariables())n[o.category]||(n[o.category]=[]),n[o.category].push(o);for(let[o,i]of Object.entries(s))if(n[o]&&n[o].length>0){e.push(`\u3010${i}\u3011`);for(let r of n[o])e.push(`  ${r.name} - ${r.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let o=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(o)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let o=s.characterCard||s.raw?.characterCard;return o?this._formatCharacterCard(o):""}),n=n.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),n=n.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,s){let n=e;for(let[o,i]of this.customVariables){let r=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof i=="function"?n=n.replace(r,()=>{try{return i(s)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,a),""}}):n=n.replace(r,String(i))}return n}_resolveRegexVariables(e,s){let n=e;for(let[o,i]of this.variableHandlers){let r=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");n=n.replace(r,(a,l)=>{try{return i(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,c),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let n=s.role||"unknown",o=s.content||s.mes||"";return`[${n}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},Et=new wn,Ql=Et});var xr={};fe(xr,{DEFAULT_PROMPT_TEMPLATE:()=>vr,ToolPromptService:()=>_n,default:()=>Zl,toolPromptService:()=>En});var vr,_n,En,Zl,Wi=J(()=>{we();Rs();ji();vr="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",_n=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let n=this._getPromptTemplate(e),o=Et.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),i=Et.resolveTemplate(n,o).trim(),r=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return Et.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:i,toolContentMacro:r})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],o=this._buildVariableContext(e,s),i=this._getBypassMessages(e);if(i&&i.length>0)for(let a of i)a.enabled!==!1&&n.push({role:this._normalizeRole(a.role),content:Et.resolveTemplate(a.content||"",o)});let r=this._buildUserContent(this._getPromptTemplate(e),o);return r&&n.push({role:"user",content:r}),this._log(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:vr}_getBypassMessages(e){return e.bypass?.enabled?Y.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":Et.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},En=new _n,Zl=En});var Ir={};fe(Ir,{LEGACY_OUTPUT_MODES:()=>ec,OUTPUT_MODES:()=>At,TOOL_FAILURE_STAGES:()=>Xe,TOOL_RUNTIME_STATUS:()=>tc,TOOL_WRITEBACK_STATUS:()=>ne,ToolOutputService:()=>An,default:()=>sc,toolOutputService:()=>ls});function Tr(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var At,ec,tc,Xe,ne,An,ls,sc,Yi=J(()=>{we();Ms();Fi();Wi();pn();Vs();At={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},ec={inline:"follow_ai"},tc={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Xe={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ne={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};An=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===At.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===At.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let n=Date.now(),o=e.id,i=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,r=s?.sessionKey||"",a=s?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=ne.NOT_APPLICABLE,g=null,p=[],h="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),U.emit(K.TOOL_EXECUTION_STARTED,{toolId:o,traceId:i,sessionKey:r,mode:At.POST_RESPONSE_API});try{if(d=Xe.BUILD_MESSAGES,p=await this._buildToolMessages(e,s),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let v=await this._getRequestTimeout();d=Xe.SEND_API_REQUEST;let k=await this._sendApiRequest(c,p,{timeoutMs:v,signal:s.signal});if(d=Xe.EXTRACT_OUTPUT,h=this._extractOutputContent(k,e),h){if(d=Xe.INJECT_CONTEXT,g=await In.injectDetailed(o,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:l,traceId:i,sessionKey:r}),!g?.success)throw u=ne.FAILED,new Error(g?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ne.SUCCESS}else u=ne.SKIPPED_EMPTY_OUTPUT;d="";let $=Date.now()-n;return U.emit(K.TOOL_EXECUTED,{toolId:o,traceId:i,sessionKey:r,success:!0,duration:$,mode:At.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${$}ms`),{success:!0,toolId:o,output:h,duration:$,meta:{traceId:i,sessionKey:r,executionKey:a,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:g,phases:Tr(p,h,g)}}}catch(v){let k=Date.now()-n,$=d||Xe.UNKNOWN,L=u||ne.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,v),U.emit(K.TOOL_EXECUTION_FAILED,{toolId:o,traceId:i,sessionKey:r,error:v.message||String(v),duration:k}),{success:!1,toolId:o,error:v.message||String(v),duration:k,meta:{traceId:i,sessionKey:r,executionKey:a,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:L,failureStage:$,writebackDetails:g,phases:Tr(p,h,g)}}}}async runToolInline(e,s){let n=Date.now(),o=e.id;try{let i=await this._buildToolMessages(e,s);return{success:!0,toolId:o,messages:i,duration:Date.now()-n}}catch(i){return{success:!1,toolId:o,error:i.message||String(i),duration:Date.now()-n}}}async previewExtraction(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(n,"rawText"),i=this._joinMessageBlocks(n,"filteredText"),r=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:o,filteredSourceText:i,extractedText:r,messageEntries:n,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(n,"rawText"),i=this._joinMessageBlocks(n,"filteredText"),r=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),a={...s,rawRecentMessagesText:o,recentMessagesText:i,extractedContent:r,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return En.buildToolMessages(e,a)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:i}=n,r=null;if(e){if(!ai(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);r=Ss(e)}else r=Ss();let a=Xt(r||{});if(!a.valid&&!r?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${a.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:o,apiConfig:r},i);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ue.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let n=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s);if(!o.length)return n.trim();let i=[];for(let r of o){let a=String(r||"").trim();if(!a)continue;if(a.startsWith("regex:")){let c=a.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...n.matchAll(d)].forEach(g=>{let p=String(g?.[0]||"").trim();p&&i.push(p)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:d})}continue}let l=a.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(n.match(c)||[]).forEach(u=>{let g=String(u||"").trim();g&&i.push(g)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:c})}}return i.length>0?i.join(`

`).trim():n.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(n=>String(n||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(n=>String(n||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,n={}){let o=typeof e=="string"?e:String(e||""),i=this._getExtractionSelectors(s),{strict:r=!1}=n;if(!i.length)return o.trim();let a=i.map((c,d)=>{let u=String(c||"").trim(),g=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:g?"regex_include":"include",value:g?u.slice(6).trim():u,enabled:!0}}).filter(c=>c.value),l=Bt(o,a,[]);return r?(l||"").trim():l||o.trim()}_extractToolContent(e,s){let n=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let n=gt()||[],o=Kt()||[];return!Array.isArray(n)||n.length===0?s.trim():Bt(s,n,o)||s.trim()}catch(n){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",n),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of s)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(s?.chatMessages)?s.chatMessages:[],i=[];for(let a=o.length-1;a>=0&&i.length<n;a-=1){let l=o[a],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&i.unshift({text:u,message:l,chatIndex:a})}if(i.length>0)return i;let r=s?.lastAiMessage||s?.input?.lastAiMessage||"";return r?[{text:r,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((o,i)=>{let r=o.text||"",a=this._applyGlobalContextRules(r),l=this._extractToolContent(e,r);return{...o,order:i+1,rawText:r,filteredText:a,extractedText:l}})}_joinMessageBlocks(e,s,n={}){let o=Array.isArray(e)?e:[],{skipEmpty:i=!1}=n;return o.map(a=>{let l=String(a?.[s]||"").trim();return i&&!l?"":`${`\u3010\u7B2C ${a?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let i=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,r=String(o?.filteredText||"").trim()||"(\u7A7A)",a=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${i}
\u6B63\u6587\uFF1A
${r}

\u5DE5\u5177\uFF1A
${a}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Ue.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},ls=new An,sc=ls});var Cn={};fe(Cn,{abortAllTasks:()=>ac,abortTask:()=>rc,buildToolMessages:()=>Er,clearExecutionHistory:()=>pc,createExecutionContext:()=>mc,createResult:()=>Rn,enhanceMessagesWithBypass:()=>hc,executeBatch:()=>oc,executeTool:()=>_r,executeToolWithConfig:()=>Ar,executeToolsBatch:()=>vc,executorState:()=>ce,extractFailed:()=>fc,extractSuccessful:()=>gc,generateTaskId:()=>zt,getExecutionHistory:()=>uc,getExecutorStatus:()=>dc,getScheduler:()=>cs,getToolsForEvent:()=>xc,mergeResults:()=>yc,pauseExecutor:()=>lc,resumeExecutor:()=>cc,setMaxConcurrent:()=>ic});function Rn(t,e,s,n,o,i,r=0){return{success:s,taskId:t,toolId:e,data:n,error:o,duration:i,retries:r,timestamp:Date.now(),metadata:{}}}function zt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function nc(t,e={}){return{id:zt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function cs(){return ks||(ks=new Vi(ce.maxConcurrent)),ks}function ic(t){ce.maxConcurrent=Math.max(1,Math.min(10,t)),ks&&(ks.maxConcurrent=ce.maxConcurrent)}async function _r(t,e={},s){let n=cs(),o=nc(t,e);for(;ce.isPaused;)await new Promise(i=>setTimeout(i,100));try{let i=await n.enqueue(async r=>{if(r.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(r,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return wr(i),i}catch(i){let r=Rn(o.id,t,!1,null,i,Date.now()-o.createdAt,o.retries);return wr(r),r}}async function oc(t,e={}){let{failFast:s=!1,concurrency:n=ce.maxConcurrent}=e,o=[],i=cs(),r=i.maxConcurrent;i.maxConcurrent=n;try{let a=t.map(({toolId:l,options:c,executor:d})=>_r(l,c,d));if(s)for(let l of a){let c=await l;if(o.push(c),!c.success){i.abortAll();break}}else{let l=await Promise.allSettled(a);for(let c of l)c.status==="fulfilled"?o.push(c.value):o.push(Rn(zt(),"unknown",!1,null,c.reason,0,0))}}finally{i.maxConcurrent=r}return o}function rc(t){return cs().abort(t)}function ac(){cs().abortAll(),ce.executionQueue=[]}function lc(){ce.isPaused=!0}function cc(){ce.isPaused=!1}function dc(){return{...cs().getStatus(),isPaused:ce.isPaused,activeControllers:ce.activeControllers.size,historyCount:ce.executionHistory.length}}function wr(t){ce.executionHistory.push(t),ce.executionHistory.length>100&&ce.executionHistory.shift()}function uc(t={}){let e=[...ce.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function pc(){ce.executionHistory=[]}function yc(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function gc(t){return t.filter(e=>e.success).map(e=>e.data)}function fc(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function mc(t={}){return{taskId:zt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function hc(t,e){return!e||e.length===0?t:[...e,...t]}function bc(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Er(t,e){let s=[],n=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[i,r]of Object.entries(o))n=n.replace(new RegExp(bc(i),"g"),r);return s.push({role:"USER",content:n}),s}async function Ar(t,e,s={}){let n=ue(t);if(!n)return{success:!1,taskId:zt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:zt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),i=zt();try{U.emit(K.TOOL_EXECUTION_STARTED,{toolId:t,taskId:i,context:e});let r=Er(n,e);if(typeof s.callApi=="function"){let a=n.output?.apiPreset||n.apiPreset||"",l=a?{preset:a}:null,c=await s.callApi(r,l,s.signal),d=c;n.outputMode==="separate"&&n.extractTags?.length>0&&(d=Sc(c,n.extractTags));let u={success:!0,taskId:i,toolId:t,data:d,duration:Date.now()-o};return U.emit(K.TOOL_EXECUTED,{toolId:t,taskId:i,result:u}),u}else return{success:!0,taskId:i,toolId:t,data:{messages:r,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(r){let a={success:!1,taskId:i,toolId:t,error:r.message||String(r),duration:Date.now()-o};return U.emit(K.TOOL_EXECUTION_FAILED,{toolId:t,taskId:i,error:r}),a}}function Sc(t,e){let s={};for(let n of e){let o=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),i=t.match(o);i&&(s[n]=i.map(r=>{let a=r.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return a?a[1].trim():""}))}return s}async function vc(t,e,s={}){let n=[];for(let o of t){let i=ue(o);if(i&&i.enabled){let r=await Ar(o,e,s);n.push(r)}}return n}function xc(t){let e=[],s=os();for(let n of s){let o=n?.trigger?.enabled&&n?.trigger?.event===t,i=Array.isArray(n?.triggerEvents)&&n.triggerEvents.includes(t);n&&n.enabled&&(o||i)&&e.push(n)}return e}var ce,Vi,ks,Mn=J(()=>{rs();we();ce={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Vi=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((n,o)=>{this.queue.push({executor:e,task:s,resolve:n,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:n,resolve:o,reject:i}=e,r=new AbortController;n.abortController=r,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),ce.activeControllers.set(n.id,r),this.executeTask(s,n,r.signal).then(a=>{n.status="completed",n.completedAt=Date.now(),o(a)}).catch(a=>{n.status=a.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),i(a)}).finally(()=>{this.running.delete(n.id),ce.activeControllers.delete(n.id),ce.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,n){let o=Date.now(),i=null;for(let r=0;r<=s.maxRetries;r++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await e(n);return Rn(s.id,s.toolId,!0,a,null,Date.now()-o,r)}catch(a){if(i=a,a.name==="AbortError")throw a;r<s.maxRetries&&(await this.delay(1e3*(r+1)),s.retries=r+1)}}throw i}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=ce.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of ce.activeControllers.values())e.abort();ce.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},ks=null});var Zr={};fe(Zr,{AUTO_TRIGGER_SKIP_REASONS:()=>N,EVENT_TYPES:()=>O,TOOL_EXECUTION_PATHS:()=>jt,checkGate:()=>to,destroyToolTriggerManager:()=>Rd,exportAutoTriggerDiagnostics:()=>Md,exportGenerationTransactionDiagnostics:()=>uo,getAutoTriggerDiagnostics:()=>Ks,getChatContext:()=>so,getCurrentCharacter:()=>Gs,getFullContext:()=>Jc,getGenerationTransactionDiagnostics:()=>Fn,getToolTriggerManagerState:()=>Cd,getWorldbookContent:()=>zr,initToolTriggerManager:()=>Xr,initTriggerModule:()=>Ji,previewToolExtraction:()=>co,registerEventListener:()=>Fe,registerTriggerHandler:()=>Xc,removeAllListeners:()=>Vc,removeAllTriggerHandlers:()=>Zc,resetGateState:()=>qc,runToolManually:()=>lo,setDebugMode:()=>kd,setTriggerHandlerEnabled:()=>Qc,triggerState:()=>b,unregisterEventListener:()=>qi,updateGateState:()=>Rt});function Yt(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function us(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function j(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Xi(t){return new Promise(e=>setTimeout(e,t))}function On(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let n of s){if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"&&n.trim())return n.trim()}return e}function $r(t=[]){return(Array.isArray(t)?t:[]).map((s,n)=>({role:zn(s),content:us(s),name:s?.name||"",timestamp:s?.send_date||s?.timestamp||"",isSystem:!!s?.is_system,isUser:!!s?.is_user,sourceId:On(s,n),swipeId:j(s?.swipe_id??s?.swipeId??s?.swipeID),swipeCount:Array.isArray(s?.swipes)&&s.swipes.length>0?s.swipes.length:1,chatIndex:n,originalMessage:s}))}function Nn(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function Rc(t,e=null,s={}){let{lockToMessageId:n=!1}=s,o=$r(t),i=e==null||e===""?null:String(e).trim(),r=null,a=null;for(let l=o.length-1;l>=0;l-=1){let c=o[l],d=j(c.sourceId),u=i&&(d===i||String(c.chatIndex)===i);if(!r&&c.role==="assistant"&&Nn(c.content)&&(!i||!n||u)&&(r=c),!a&&c.role==="user"&&c.content&&(a=c),r&&a)break}return{messages:o,lastUserMessage:a,lastAiMessage:r}}async function Or(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:n=250,lockToMessageId:o=!1}=t,i={messages:[],lastUserMessage:null,lastAiMessage:null};for(let r=0;r<=s;r+=1){let a=await Hn();if(i=Rc(a,e,{lockToMessageId:o}),i.lastAiMessage?.content)return i;r<s&&await Xi(n)}return i}function Cc(t="user_trigger_intent"){Rt({lastUserSendIntentAt:Date.now(),lastUserIntentSource:t||"user_trigger_intent"})}function Pn(){Cc("send_button_or_enter")}function Mc(){let t=Yt(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],n=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],o=(i,r,a)=>{i.forEach(l=>{let c=e.querySelector(l);c&&c.addEventListener(r,a,!0)})};return o(s,"click",()=>Pn()),o(s,"pointerup",()=>Pn()),o(s,"touchend",()=>Pn()),o(n,"keydown",i=>{let r=i?.key||"";(r==="Enter"||r==="NumpadEnter")&&!i.shiftKey&&Pn()}),t.__YYT_sendIntentHooksInstalled=!0,F("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function kc(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function je(){return Yt().SillyTavern||null}function Pc(){return Yt().TavernHelper||null}function Dc(){let t=je();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Gc(t=""){return t===O.MESSAGE_RECEIVED||t===O.MESSAGE_SENT||t===O.MESSAGE_UPDATED||t===O.MESSAGE_SWIPED||t===O.MESSAGE_DELETED}function Qi(t){return!!t&&(typeof t.on=="function"||typeof t.addEventListener=="function")}function Nr(t,e,s){if(!t||typeof s!="function")return!1;try{if(typeof t.off=="function")return t.off(e,s),!0;if(typeof t.removeListener=="function")return t.removeListener(e,s),!0;if(typeof t.removeEventListener=="function")return t.removeEventListener(e,s),!0}catch(n){H("warn","\u79FB\u9664\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25",{eventName:e,error:n?.message||String(n)})}return!1}function $c(t,e,s){Qi(t)&&(de.eventSource=t,de.eventTypes=e||de.eventTypes||null,de.source=s||de.source||"unknown",H("info","\u7F13\u5B58\u4E8B\u4EF6\u6865\u63A5\u6210\u529F",{source:de.source,hasOff:typeof t.off=="function",hasRemoveListener:typeof t.removeListener=="function",hasAddEventListener:typeof t.addEventListener=="function"}))}function Ds(){let t=Yt(),e=t.SillyTavern||null,s=e?.getContext?.()||null,n=[{source:"SillyTavern.eventSource",eventSource:e?.eventSource,eventTypes:e?.eventTypes||e?.event_types||null},{source:"topWindow.eventSource",eventSource:t?.eventSource,eventTypes:t?.event_types||t?.eventTypes||null},{source:"SillyTavern.getContext()",eventSource:s?.eventSource||null,eventTypes:s?.eventTypes||s?.event_types||null},{source:"scriptModule exports",eventSource:de.scriptModule?.eventSource||null,eventTypes:de.scriptModule?.event_types||de.scriptModule?.eventTypes||null}];for(let o of n)if(Qi(o.eventSource))return $c(o.eventSource,o.eventTypes,o.source),o;return{source:"",eventSource:null,eventTypes:null}}async function Oc(){let t=Ds();if(t.eventSource)return t;de.loadingPromise||(de.loadingPromise=(async()=>{try{let s=Tc;de.scriptModule=await import(s)}catch(s){de.importError=s,H("warn","\u52A0\u8F7D /script.js \u4E8B\u4EF6\u6865\u63A5\u5931\u8D25",s?.message||String(s))}finally{de.loadingPromise=null}})()),await de.loadingPromise;let e=Ds();return e.eventSource?e:{source:"",eventSource:null,eventTypes:null}}function Bn(){return Ds().eventSource||de.eventSource||null}function Kn(){return Ds().eventTypes||de.eventTypes||O}function F(...t){(b.debugMode||Ue.getDebugSettings()?.enableDebugLog)&&console.log("[YouYouToolkit:Trigger]",...t)}function H(t="info",...e){(typeof console[t]=="function"?console[t]:console.log)("[youyou_trigger]",...e)}function Se(){let t=Ue.getListenerSettings?.()||Ue.getSettings?.()?.listener||{},e=parseInt(t?.debounceMs,10),s=parseInt(t?.messageSessionWindowMs,10),n=parseInt(t?.historyRetentionLimit,10);return{listenGenerationEnded:t?.listenGenerationEnded!==!1,ignoreQuietGeneration:t?.ignoreQuietGeneration!==!1,ignoreAutoTrigger:t?.ignoreAutoTrigger===!0,debounceMs:Number.isFinite(e)?Math.max(0,e):300,useMessageReceivedFallback:t?.useMessageReceivedFallback!==!1,useGenerationAfterCommandsFallback:t?.useGenerationAfterCommandsFallback!==!1,messageSessionWindowMs:Number.isFinite(s)?Math.max(300,s):1800,historyRetentionLimit:Number.isFinite(n)?Math.max(1,Math.min(50,n)):10}}function Le(t,e=""){if(t&&typeof t=="object")return j(t?.messageId??t?.id??t?.message_id??t?.mes_id);if(e===O.GENERATION_ENDED){if(typeof t=="number"&&Number.isFinite(t))return String(t);if(typeof t=="string"&&/^\d+$/.test(t.trim()))return t.trim()}return Gc(e)?j(t):""}function Nc(t,e,s){let n=j(s);if(!n)return!1;let o=j(On(t,e));if(o&&o===n)return!0;let i=Number(n);return Number.isInteger(i)&&e===i}async function Bc(t){let e=j(t);if(!e)return null;let s=await Hn();for(let n=s.length-1;n>=0;n-=1){let o=s[n];if(Nc(o,n,e))return{message:o,index:n}}return null}async function Br(t,e={}){let{retries:s=0,retryDelayMs:n=80}=e,o=null;for(let i=0;i<=s;i+=1){if(o=await Bc(t),o)return o;i<s&&await Xi(n)}return null}function Kr(){let t=[b.gateState.lastUserSendIntentAt,b.gateState.lastUserMessageAt].filter(e=>Number(e)>0);return t.length>0?Math.max(...t):0}function Un(t=Date.now()){let e=Kr();return e>0&&t-e<=Gr}function Zi(t="",e=null){return String(t||e?.type||"").trim().toLowerCase()}function Kc(t){let e=String(t||"").trim().toLowerCase();return e?/re\s*-?\s*roll|reroll|重\s*roll/.test(e)?"reroll":/regenerat|\bregen\b|重新生成/.test(e)?"regenerate":/\bswipe\b|swipe[_-]?id/.test(e)?"swipe":/\bquiet\b/.test(e)?"quiet":"":""}function Ur(t="",e=null){let s=typeof t=="string"?t.trim():String(t||"").trim(),n=e??null,o=Zi(t,e);if(e?.swipeId!==void 0||e?.swipe_id!==void 0||e?.swipe===!0||e?.isSwipe===!0)return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:o,generationAction:"swipe",generationActionSource:"params.swipe",explicitGenerationAction:"swipe"};let i=[{source:"type",value:s}];for(let r of Ac){let a=e?.[r];a==null||a===""||i.push({source:`params.${r}`,value:String(a)})}for(let r of i){let a=Kc(r.value);if(a)return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:o,generationAction:a,generationActionSource:r.source,explicitGenerationAction:Cr.has(a)?a:""}}return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:o,generationAction:o||"",generationActionSource:o?"normalized_generation_type":"",explicitGenerationAction:Cr.has(o)?o:""}}function Bs(t=""){let e=String(t||"").trim();if(!e)return"";let s=0;for(let n=0;n<e.length;n+=1)s=(s<<5)-s+e.charCodeAt(n),s|=0;return Math.abs(s).toString(36)}function Uc(t,e=null,s=Date.now()){let n=Kr(),o=Ur(t,e);return n>0&&s-n<=Gr?{startedByUserIntent:!0,userIntentDetectedAt:n,userIntentSource:"recent_user_trigger_intent",userIntentDetail:"recent_user_send_or_message"}:o.explicitGenerationAction?{startedByUserIntent:!0,userIntentDetectedAt:s,userIntentSource:`explicit_generation_action:${o.explicitGenerationAction}`,userIntentDetail:`generation_action_${o.explicitGenerationAction}`}:{startedByUserIntent:!1,userIntentDetectedAt:n,userIntentSource:"none",userIntentDetail:"no_recent_user_intent_or_explicit_generation_action"}}function eo(t=gs()){let e=b.gateState.lastGenerationBaseline;return!e||t&&e.chatId&&e.chatId!==t?null:e}function ps(t=Date.now()){return Un(t)?!0:!!eo()?.startedByUserIntent}function Ln(t=Date.now()){return Number(b.gateState.uiTransitionGuardUntil)>t}function Mr(t=""){let e=Date.now();Rt({uiTransitionGuardUntil:e+Rr,lastUiTransitionAt:e,lastUiTransitionSource:t||""}),H("info","\u8FDB\u5165\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B",{source:t||"unknown",guardUntil:e+Rr})}function kr(t=""){for(let e of S.pendingTransactionTimers.values())clearTimeout(e);S.pendingTransactionTimers.clear(),t&&H("info","\u5DF2\u6E05\u7406\u5F85\u6267\u884C\u81EA\u52A8\u89E6\u53D1\u5B9A\u65F6\u5668",{reason:t})}function Lr(t=[],e={}){let s=je(),n=s?.getContext?.()||null,o=$r(t),i=null;for(let r=o.length-1;r>=0;r-=1){let a=o[r];if(a.role==="assistant"&&Nn(a.content)){i=a;break}}return{traceId:e.traceId||Wt("generation"),startedAt:Number(e.startedAt)||Date.now(),capturedAt:Date.now(),chatId:ys(s,n,null),messageCount:o.length,lastAssistantIndex:i?.chatIndex??-1,lastAssistantMessageId:j(i?.sourceId),lastAssistantContentFingerprint:Bs(i?.content||""),lastAssistantSwipeId:j(i?.swipeId),lastAssistantSwipeCount:Number.isFinite(i?.swipeCount)?Math.max(0,Number(i.swipeCount)):0,lastAssistantPreview:String(i?.content||"").slice(0,160),dryRun:!!e.dryRun,generationType:e.rawGenerationType||e.type||"",generationParams:e.rawGenerationParams||e.params||null,rawGenerationType:e.rawGenerationType||e.type||"",rawGenerationParams:e.rawGenerationParams||e.params||null,normalizedGenerationType:e.normalizedGenerationType||Zi(e.type,e.params),generationAction:e.generationAction||"",generationActionSource:e.generationActionSource||"",explicitGenerationAction:e.explicitGenerationAction||"",startedByUserIntent:!!e.startedByUserIntent,userIntentDetectedAt:Number(e.userIntentDetectedAt)||0,userIntentSource:e.userIntentSource||"",userIntentDetail:e.userIntentDetail||"",baselineResolved:e.baselineResolved!==void 0?!!e.baselineResolved:!0,baselineResolutionAt:Number(e.baselineResolutionAt)||0,provisional:!!e.provisional,baselineSource:e.baselineSource||""}}async function Lc(t={}){let e=await Hn();return Lr(e,{...t,baselineResolved:t.baselineResolved!==void 0?t.baselineResolved:!0,baselineResolutionAt:Number(t.baselineResolutionAt)||Date.now(),provisional:t.provisional===!0,baselineSource:t.baselineSource||"captured_chat_snapshot"})}function zc(t={}){return Lr(Dc(),{...t,baselineResolved:!1,baselineResolutionAt:0,provisional:!0,baselineSource:t.baselineSource||"provisional_immediate_snapshot"})}async function Hc(t={}){let{chatId:e=gs(),traceId:s="",retries:n=4,retryDelayMs:o=80}=t,i=null;for(let a=0;a<=n;a+=1){i=eo(e);let l=!s||!i?.traceId||i.traceId===s;if(i&&l&&i.baselineResolved!==!1)return i;a<n&&await Xi(o)}return i&&(!s||!i?.traceId||i.traceId===s)?i:null}function Ct(){let t=b.gateState.lastGenerationBaseline;return{baselineResolved:t?.baselineResolved??!1,baselineResolutionAt:t?.baselineResolutionAt||0,provisionalBaseline:!!t?.provisional,generationStartedByUserIntent:!!t?.startedByUserIntent,generationUserIntentSource:t?.userIntentSource||"",generationUserIntentDetail:t?.userIntentDetail||"",rawGenerationType:t?.rawGenerationType||b.gateState.lastGenerationType||"",rawGenerationParams:t?.rawGenerationParams??b.gateState.lastGenerationParams??null,normalizedGenerationType:t?.normalizedGenerationType||b.gateState.lastNormalizedGenerationType||"",generationAction:t?.generationAction||b.gateState.lastGenerationAction||"",generationActionSource:t?.generationActionSource||b.gateState.lastGenerationActionSource||"",explicitGenerationAction:t?.explicitGenerationAction||"",baselineAssistantContentFingerprint:t?.lastAssistantContentFingerprint||"",baselineAssistantSwipeId:j(t?.lastAssistantSwipeId),baselineAssistantSwipeCount:Number.isFinite(t?.lastAssistantSwipeCount)?Math.max(0,Number(t.lastAssistantSwipeCount)):0,lastUserIntentSource:b.gateState.lastUserIntentSource||""}}async function Fc(){return kn||(kn=Promise.resolve().then(()=>(Mn(),Cn)).catch(t=>{throw kn=null,t})),kn}function jc(t={}){let e=Ct();return{stage:"",eventType:"",traceId:"",transactionKey:"",messageId:"",messageKey:"",executionKey:"",slotBindingKey:"",slotRevisionKey:"",slotTransactionId:"",messageRole:"",reason:"",skipReasonDetailed:"",confirmedAssistantMessageId:"",sourceMessageId:"",confirmationMode:"",generationMessageBindingSource:"",sourceSwipeId:"",confirmedAssistantSwipeId:"",effectiveSwipeId:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",scheduledDelayMs:0,candidateToolIds:[],receivedAt:Date.now(),handledAt:0,generationTraceId:b.gateState.lastGenerationTraceId||"",generationDryRun:!!b.gateState.lastGenerationDryRun,generationStartedAt:b.gateState.lastGenerationBaseline?.startedAt||0,uiTransitionGuardActive:Ln(),uiTransitionGuardUntil:b.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:b.gateState.lastUiTransitionSource||"",baselineMessageCount:b.gateState.lastGenerationBaseline?.messageCount||0,baselineAssistantId:b.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",generationBaselineMessageCount:b.gateState.lastGenerationBaseline?.messageCount||0,generationBaselineAssistantId:b.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",confirmationSource:"",isSpeculativeTransaction:!1,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",registeredEvents:Array.from(S.listeners.keys()),listenerSettings:Se(),hasRecentUserTriggerIntent:Un(),hasConfirmedUserTriggerIntent:ps(),...e,...t}}function Oe(t={}){let e=jc(t);return S.lastEventDebugSnapshot=e,F("\u81EA\u52A8\u89E6\u53D1\u4E8B\u4EF6\u5FEB\u7167:",e),e}function Wc(){let t=Se();return t.listenGenerationEnded===!1?{skip:!0,reason:N.LISTENER_DISABLED,listenerSettings:t}:t.ignoreAutoTrigger&&!ps()?{skip:!0,reason:N.IGNORED_AUTO_TRIGGER,listenerSettings:t}:{skip:!1,reason:"",listenerSettings:t}}function Yc(t={}){let e=Ct();return{triggerEvent:"",traceId:"",transactionKey:"",messageId:"",messageKey:"",executionKey:"",slotBindingKey:"",slotRevisionKey:"",slotTransactionId:"",confirmationMode:"",generationMessageBindingSource:"",sourceMessageId:"",sourceSwipeId:"",confirmedAssistantSwipeId:"",effectiveSwipeId:"",sameSlotRevisionCandidate:!1,sameSlotRevisionConfirmed:!1,sameSlotRevisionSource:"",selectedToolIds:[],skipReason:"",skipReasonDetailed:"",lockedAiMessageId:"",confirmedAssistantMessageId:"",confirmationSource:"",eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",generationTraceId:b.gateState.lastGenerationTraceId||"",...e,triggeredAt:Date.now(),...t}}function ht(t={}){let e=Yc(t);return S.lastAutoTriggerSnapshot=e,F("\u81EA\u52A8\u89E6\u53D1\u5FEB\u7167:",e),e}function ds(t,e){(Array.isArray(t)?t:[]).forEach(n=>{n?.id&&is(n.id,{lastTriggerAt:Date.now(),lastExecutionKey:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:"",...e},{touchLastRunAt:!1,emitEvent:!1})})}function ys(t,e,s){let o=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(i=>typeof i=="string"&&i.trim());return o||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function Fe(t,e,s={}){if(!t||typeof e!="function")return F("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),H("warn","\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25\uFF1A\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u65E0\u6548",{eventType:t}),()=>{};let{once:n=!1,priority:o=0}=s,i=Bn(),a=Kn()[t]||t,l=async(...c)=>{try{if(H("info","\u6536\u5230\u4E8B\u4EF6",t,c[0]??null),s.gateCheck&&!await to(s.gateCheck)){F(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`),H("warn","\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6",t);return}await e(...c),n&&qi(t,l)}catch(d){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",d)}};if(b.listeners.has(t)||b.listeners.set(t,new Set),b.listeners.get(t).add(l),i&&typeof i.on=="function")i.on(a,l),F(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),H("info","\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u6E90\u76D1\u542C",{eventType:t,stEventType:a});else if(i&&typeof i.addEventListener=="function")i.addEventListener(a,l),F(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),H("info","\u5DF2\u6CE8\u518C addEventListener \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:a});else{let c=Yt();c.addEventListener&&(c.addEventListener(a,l),F(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),H("warn","\u4E8B\u4EF6\u6E90\u4E0D\u53EF\u7528\uFF0C\u56DE\u9000\u4E3A DOM \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:a}))}return()=>qi(t,l)}function qi(t,e){let s=b.listeners.get(t);if(s&&s.has(e)){s.delete(e);let n=Bn(),i=Kn()[t]||t;if(Nr(n,i,e))F(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let r=Yt();r.removeEventListener&&r.removeEventListener(i,e)}}}function Vc(){let t=Bn(),e=Kn();for(let[s,n]of b.listeners){let o=e[s]||s;for(let i of n)if(!Nr(t,o,i)){let r=Yt();r.removeEventListener&&r.removeEventListener(o,i)}}b.listeners.clear(),F("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function to(t){if(!t)return!0;let e=Date.now(),s=b.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return F("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return F("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return F("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return F("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return F("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(n){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",n),!1}return!0}function Rt(t){Object.assign(b.gateState,t)}function qc(){b.gateState={lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastNormalizedGenerationType:"",lastGenerationAction:"",lastGenerationActionSource:"",lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""}}async function so(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:n=!0,includeSystem:o=!1,format:i="messages"}=t;if(!je())return F("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let a=await Hn(),l=[],c=Math.max(0,a.length-e);for(let d=c;d<a.length;d++){let u=a[d];if(!u)continue;let g=zn(u);if(!(g==="user"&&!s)&&!(g==="system"&&!o)&&!(g==="assistant"&&!n))if(i==="messages"){let p=us(u);l.push({role:g,content:p,name:u.name||"",timestamp:u.send_date||u.timestamp,isSystem:!!u.is_system,isUser:!!u.is_user})}else l.push(us(u))}return{messages:l,totalMessages:a.length,startIndex:c,endIndex:a.length-1}}catch(a){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",a),null}}function zn(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function Hn(){let t=Pc(),e=je();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let n=e?.getContext?.()||null,o=Array.isArray(n?.chat)?n.chat:[],i=Array.isArray(e?.chat)?e.chat:[];s=(o.length?o:i).length-1}if(Number.isFinite(s)&&s>=0){let n=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(n)&&n.length>0)return n}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function Gs(){let t=je();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let n=s[e];return{id:e,name:n.name||"",description:n.description||"",personality:n.personality||"",scenario:n.scenario||"",firstMes:n.first_mes||"",mesExample:n.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function zr(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,n=je();if(!n)return"";try{let i=(n.lorebook||[]).entries||[],r=[],a=0;for(let l of i){if(e&&!l.enabled)continue;let c=l.content||"";c&&a+c.length<=s&&(r.push(c),a+=c.length)}return r.join(`

`)}catch(o){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",o),""}}async function Jc(t={}){let[e,s,n]=await Promise.all([so(t.chat||{}),Gs(),zr(t.worldbook||{})]);return{chat:e,character:s,worldbook:n,timestamp:Date.now()}}function Xc(t,e){if(!t||!e)return F("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:n,gateCondition:o,priority:i=0}=e;if(!s||typeof n!="function")return F("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};b.handlers.set(t,{eventType:s,handler:n,gateCondition:o,priority:i,enabled:!0});let r=Fe(s,async(...a)=>{let l=b.handlers.get(t);!l||!l.enabled||l.gateCondition&&!await to(l.gateCondition)||await l.handler(...a)},{priority:i});return F(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{r(),b.handlers.delete(t),F(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function Qc(t,e){let s=b.handlers.get(t);s&&(s.enabled=e,F(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function Zc(){b.handlers.clear(),F("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function Wt(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function $s(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function gs(){let t=je(),e=t?.getContext?.()||null;return ys(t,e,null)}function Hr(t,e,s="",n="",o=""){let i=t||gs(),r=String(o||"").trim();if(r)return`slot::${r}`;let a=j(e),l=String(n||"").trim();return a?[i,a,l||"trace:pending","slot_revision:pending"].join("::"):[i,l||`event:${s||"unknown"}:trace_pending`,"message:no_message","slot_revision:pending"].join("::")}function ed(t,e,s="",n="",o=""){return Hr(t,e,s,n,o)}function td(t={}){let e=String(t?.slotRevisionKey||"").trim();return e||bt({chatId:t?.chatId,messageId:t?.messageId,effectiveSwipeId:t?.effectiveSwipeId||t?.confirmedAssistantSwipeId||t?.lastAiMessageSwipeId,assistantContentFingerprint:t?.assistantContentFingerprint||Bs(t?.lastAiMessage||t?.input?.lastAiMessage||"")})}function sd({chatId:t="",messageId:e="",eventType:s="",generationTraceId:n="",slotRevisionKey:o="",executionKey:i=""}={}){let r=String(i||o||"").trim();return r?`txn::${r}`:Hr(t,e,s,n,o)}function nd(t,e,s={}){let n=j(s?.messageId||Le(e,t)),o=s?.chatId||gs(),i=String(s?.generationTraceId||b.gateState.lastGenerationTraceId||"").trim(),r=String(s?.slotRevisionKey||"").trim(),a=String(s?.executionKey||r||"").trim(),l=s?.transactionKey||sd({chatId:o,messageId:n,eventType:t,generationTraceId:i,slotRevisionKey:r,executionKey:a});return{messageId:n,chatId:o,generationTraceId:i,slotRevisionKey:r,executionKey:a,transactionKey:l,transactionId:String(s?.slotTransactionId||"").trim()}}function id(t=[],e=[]){let s=Array.isArray(t)?t.map(Qe).filter(Boolean):[],n=Array.isArray(e)?e.map(Qe).filter(Boolean):[];return{activeTransactionCount:S.activeTransactions.size,activeTransactions:s,recentTransactionHistory:n,lastHandledExecutionKey:S.lastHandledExecutionKey||"",lastHandledSlotRevisionKey:S.lastHandledSlotRevisionKey||"",handledExecutionKeyCount:S.handledExecutionKeys.size,pendingTransactionCount:S.pendingTransactionTimers.size,lastExecutionContext:Qe(S.lastExecutionContext),lastEventDebugSnapshot:Qe(S.lastEventDebugSnapshot),lastAutoTriggerSnapshot:Qe(S.lastAutoTriggerSnapshot),recentHandledExecutionKeys:ro(8)}}function Ce(t,e={}){if(!t)return null;let s=Ct();return Object.assign(t,s,e,{updatedAt:Date.now()}),t.transactionId=t.transactionId||t.slotTransactionId||"",t.executionKey=String(t.executionKey||t.slotRevisionKey||"").trim(),t}function od(t,e){return!t||!e||t.transactionKey===e||(S.activeTransactions.delete(t.transactionKey),t.transactionKey=e,t.updatedAt=Date.now(),S.activeTransactions.set(e,t)),t}function $e(t,e={}){if(!t)return null;let{historyRetentionLimit:s}=Se(),n=Ct(),o={id:e?.id||Wt("txn_hist"),at:e?.at||Date.now(),traceId:t.traceId,transactionKey:e?.transactionKey||t.transactionKey,transactionId:e?.transactionId||t.transactionId||t.slotTransactionId||"",phase:e?.phase||t.phase,eventType:e?.eventType||t.firstEventType,messageId:e?.messageId||t.messageId,messageKey:e?.messageKey||t.messageKey,executionKey:e?.executionKey||t.executionKey||"",slotBindingKey:e?.slotBindingKey||t.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||t.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||t.slotTransactionId||"",messageRole:e?.messageRole||t.messageRole,confirmedAssistantMessageId:e?.confirmedAssistantMessageId||t.confirmedAssistantMessageId||"",sourceMessageId:e?.sourceMessageId||t.sourceMessageId||"",confirmationSource:e?.confirmationSource||t.confirmationSource||"",confirmationMode:e?.confirmationMode||t.confirmationMode||"",sourceSwipeId:e?.sourceSwipeId||t.sourceSwipeId||"",sameSlotRevisionCandidate:e?.sameSlotRevisionCandidate??t.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:e?.sameSlotRevisionConfirmed??t.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:e?.sameSlotRevisionSource||t.sameSlotRevisionSource||"",isSpeculativeTransaction:e?.isSpeculativeTransaction??t.isSpeculativeTransaction??!1,eventBelongsToCurrentGeneration:e?.eventBelongsToCurrentGeneration??t.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:e?.historicalReplayBlocked??t.historicalReplayBlocked??!1,historicalReplayReason:e?.historicalReplayReason||t.historicalReplayReason||"",generationTraceId:e?.generationTraceId||b.gateState.lastGenerationTraceId||"",generationStartedAt:e?.generationStartedAt||b.gateState.lastGenerationBaseline?.startedAt||0,generationDryRun:e?.generationDryRun??!!b.gateState.lastGenerationDryRun,baselineResolved:e?.baselineResolved??t.baselineResolved??n.baselineResolved,baselineResolutionAt:e?.baselineResolutionAt??t.baselineResolutionAt??n.baselineResolutionAt,provisionalBaseline:e?.provisionalBaseline??t.provisionalBaseline??n.provisionalBaseline,generationStartedByUserIntent:e?.generationStartedByUserIntent??t.generationStartedByUserIntent??n.generationStartedByUserIntent,generationUserIntentSource:e?.generationUserIntentSource||t.generationUserIntentSource||n.generationUserIntentSource,generationUserIntentDetail:e?.generationUserIntentDetail||t.generationUserIntentDetail||n.generationUserIntentDetail,generationAction:e?.generationAction||t.generationAction||n.generationAction,generationActionSource:e?.generationActionSource||t.generationActionSource||n.generationActionSource,explicitGenerationAction:e?.explicitGenerationAction||t.explicitGenerationAction||n.explicitGenerationAction,lastUserIntentSource:e?.lastUserIntentSource||t.lastUserIntentSource||n.lastUserIntentSource,frozenGenerationTraceId:e?.frozenGenerationTraceId||t.frozenGenerationTraceId||"",frozenGenerationStartedAt:e?.frozenGenerationStartedAt??t.frozenGenerationStartedAt??0,frozenBaselineResolvedAtCreation:e?.frozenBaselineResolvedAtCreation??t.frozenBaselineResolvedAtCreation??!1,frozenBaselineResolutionAtCreation:e?.frozenBaselineResolutionAtCreation??t.frozenBaselineResolutionAtCreation??0,frozenProvisionalBaselineAtCreation:e?.frozenProvisionalBaselineAtCreation??t.frozenProvisionalBaselineAtCreation??!1,frozenGenerationStartedByUserIntent:e?.frozenGenerationStartedByUserIntent??t.frozenGenerationStartedByUserIntent??!1,frozenGenerationUserIntentSource:e?.frozenGenerationUserIntentSource||t.frozenGenerationUserIntentSource||"",frozenGenerationUserIntentDetail:e?.frozenGenerationUserIntentDetail||t.frozenGenerationUserIntentDetail||"",frozenGenerationActionAtCreation:e?.frozenGenerationActionAtCreation||t.frozenGenerationActionAtCreation||"",frozenGenerationActionSourceAtCreation:e?.frozenGenerationActionSourceAtCreation||t.frozenGenerationActionSourceAtCreation||"",frozenExplicitGenerationActionAtCreation:e?.frozenExplicitGenerationActionAtCreation||t.frozenExplicitGenerationActionAtCreation||"",frozenNormalizedGenerationTypeAtCreation:e?.frozenNormalizedGenerationTypeAtCreation||t.frozenNormalizedGenerationTypeAtCreation||"",frozenRawGenerationTypeAtCreation:e?.frozenRawGenerationTypeAtCreation||t.frozenRawGenerationTypeAtCreation||"",frozenLastUserIntentSourceAtCreation:e?.frozenLastUserIntentSourceAtCreation||t.frozenLastUserIntentSourceAtCreation||"",frozenGenerationCapturedAt:e?.frozenGenerationCapturedAt??t.frozenGenerationCapturedAt??Date.now(),skipReason:e?.skipReason||t.skipReason||"",skipReasonDetailed:e?.skipReasonDetailed||t.skipReasonDetailed||"",candidateToolIds:Array.isArray(e?.candidateToolIds)?[...e.candidateToolIds]:[...t.candidateToolIds||[]],executionPathIds:Array.isArray(e?.executionPathIds)?[...e.executionPathIds]:[...t.executionPathIds||[]]};return S.recentTransactionHistory=$s([...S.recentTransactionHistory,o],s),o}function Ht(t,e={}){let s=Array.isArray(t)?t:[],{historyRetentionLimit:n}=Se();s.forEach(o=>{o?.id&&As(o.id,"trigger",e,{limit:n,emitEvent:!1})})}function rd(t,e={}){if(!t)return;let{historyRetentionLimit:s}=Se();As(t,"writeback",e,{limit:s,emitEvent:!1})}function Qe(t){if(!t||typeof t!="object")return t;let e=Fr(t);return{...t,...e,receivedEvents:Array.isArray(t.receivedEvents)?[...t.receivedEvents]:void 0,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:void 0,executionPathIds:Array.isArray(t.executionPathIds)?[...t.executionPathIds]:void 0,driftReasons:Array.isArray(e.driftReasons)?[...e.driftReasons]:[]}}function Re(t){return String(t||"").trim()}function Fr(t){if(!t||typeof t!="object")return{driftDetected:!1,generationTraceDrifted:!1,generationActionDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceTransactionCreation:!1,driftReasons:[]};if(!(t.frozenGenerationCapturedAt!==void 0||t.frozenGenerationTraceId!==void 0||t.frozenBaselineResolvedAtCreation!==void 0||t.frozenGenerationStartedByUserIntent!==void 0||t.frozenGenerationUserIntentSource!==void 0||t.frozenGenerationUserIntentDetail!==void 0))return{driftDetected:!1,generationTraceDrifted:!1,generationActionDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceTransactionCreation:!1,driftReasons:[]};let s=Re(t.frozenGenerationTraceId),n=Re(t.generationTraceId),o=Re(t.frozenGenerationUserIntentSource),i=Re(t.generationUserIntentSource),r=Re(t.frozenGenerationUserIntentDetail),a=Re(t.generationUserIntentDetail),l=Re(t.frozenGenerationActionAtCreation),c=Re(t.generationAction),d=Re(t.frozenGenerationActionSourceAtCreation),u=Re(t.generationActionSource),g=Re(t.frozenExplicitGenerationActionAtCreation),p=Re(t.explicitGenerationAction),h=Re(t.frozenNormalizedGenerationTypeAtCreation),v=Re(t.normalizedGenerationType),k=!!s&&!!n&&s!==n,$=(l||c?l!==c:!1)||(d||u?d!==u:!1)||(g||p?g!==p:!1)||(h||v?h!==v:!1),L=!!t.frozenGenerationStartedByUserIntent!=!!t.generationStartedByUserIntent||(o||i?o!==i:!1)||(r||a?r!==a:!1),E=!!t.frozenBaselineResolvedAtCreation!=!!t.baselineResolved,I=(Number(t.baselineResolutionAt)||0)>(Number(t.frozenBaselineResolutionAtCreation)||0),y=[];return k&&y.push("generation_trace_changed"),$&&y.push("generation_action_changed"),L&&y.push("generation_user_intent_changed"),E&&y.push("baseline_resolved_state_changed"),I&&y.push("baseline_resolution_advanced"),{driftDetected:y.length>0,generationTraceDrifted:k,generationActionDrifted:$,generationUserIntentDrifted:L,baselineResolvedStateChanged:E,baselineResolutionAdvancedSinceTransactionCreation:I,driftReasons:y}}function Pr(t=[]){return(Array.isArray(t)?t:[]).reduce((e,s)=>{let n=Re(s?.phase)||"unknown";return e[n]=(e[n]||0)+1,e},{})}function Dr(t=[]){let e={entryCount:0,driftDetectedCount:0,generationTraceDriftCount:0,generationActionDriftCount:0,generationUserIntentDriftCount:0,baselineResolvedStateChangedCount:0,baselineResolutionAdvancedCount:0};for(let s of Array.isArray(t)?t:[]){let n=Fr(s);e.entryCount+=1,n.driftDetected&&(e.driftDetectedCount+=1),n.generationTraceDrifted&&(e.generationTraceDriftCount+=1),n.generationActionDrifted&&(e.generationActionDriftCount+=1),n.generationUserIntentDrifted&&(e.generationUserIntentDriftCount+=1),n.baselineResolvedStateChanged&&(e.baselineResolvedStateChangedCount+=1),n.baselineResolutionAdvancedSinceTransactionCreation&&(e.baselineResolutionAdvancedCount+=1)}return e}function no(){let t=Ds(),e=t.eventSource||de.eventSource||null;return{source:t.source||de.source||"",ready:Qi(e),hasImportedScriptModule:!!de.scriptModule,importError:de.importError?.message||""}}function io(){let t=b.gateState.lastGenerationBaseline;return{lastUserSendIntentAt:b.gateState.lastUserSendIntentAt||0,lastUserIntentSource:b.gateState.lastUserIntentSource||"",lastUserMessageId:j(b.gateState.lastUserMessageId),lastUserMessageAt:b.gateState.lastUserMessageAt||0,lastGenerationTraceId:b.gateState.lastGenerationTraceId||"",lastGenerationType:b.gateState.lastGenerationType||"",lastGenerationDryRun:!!b.gateState.lastGenerationDryRun,lastGenerationAt:b.gateState.lastGenerationAt||0,isGenerating:!!b.gateState.isGenerating,uiTransitionGuardUntil:b.gateState.uiTransitionGuardUntil||0,lastUiTransitionAt:b.gateState.lastUiTransitionAt||0,lastUiTransitionSource:b.gateState.lastUiTransitionSource||"",baselineMessageCount:t?.messageCount||0,baselineAssistantId:t?.lastAssistantMessageId||"",...Ct()}}function ad(){let{historyRetentionLimit:t}=Se();return Math.max(20,Math.min(200,Number(t||0)*4||40))}function ld(t={}){let e=Ct();return{id:t?.id||Wt("timeline"),at:Number(t?.at)||Date.now(),kind:t?.kind||"event",eventType:t?.eventType||"",traceId:t?.traceId||"",transactionKey:t?.transactionKey||"",messageId:j(t?.messageId),executionKey:t?.executionKey||"",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",phase:t?.phase||"",reason:t?.reason||"",detail:t?.detail||"",sourceMessageId:j(t?.sourceMessageId),confirmationSource:t?.confirmationSource||"",sourceSwipeId:t?.sourceSwipeId||"",candidateToolIds:Array.isArray(t?.candidateToolIds)?[...t.candidateToolIds]:[],generationTraceId:t?.generationTraceId||b.gateState.lastGenerationTraceId||"",baselineResolved:t?.baselineResolved??e.baselineResolved,generationStartedByUserIntent:t?.generationStartedByUserIntent??e.generationStartedByUserIntent,generationUserIntentSource:t?.generationUserIntentSource||e.generationUserIntentSource,historicalReplayBlocked:t?.historicalReplayBlocked??!1}}function Ft(t={}){let e=ld(t);return S.recentEventTimeline=$s([...S.recentEventTimeline,e],ad()),e}function jr(t){return!t||typeof t!="object"?t:{...t,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:[]}}function Dn(t=!1,e=[],s=[]){return{flagged:!!t,reasons:[...new Set((Array.isArray(e)?e:[]).filter(Boolean))],relatedTransactionKeys:[...new Set((Array.isArray(s)?s:[]).filter(Boolean))]}}function cd(t={}){let e=t?.summary||{},s=[...Array.isArray(t?.activeTransactions)?t.activeTransactions:[],...Array.isArray(t?.recentTransactionHistory)?t.recentTransactionHistory:[],t?.lastEventDebugSnapshot,t?.lastAutoTriggerSnapshot].filter(Boolean),n=[],o=[],i=[],r=[],a=[],l=[],c=[],d=[];for(let u of s){let g=String(u?.reason||u?.skipReason||"").trim(),p=String(u?.detail||u?.skipReasonDetailed||"").trim(),h=String(u?.transactionKey||"").trim(),v=String(u?.phase||u?.stage||"").trim(),k=String(u?.confirmationSource||"").trim(),$=String(u?.generationUserIntentSource||"").trim(),L=!!u?.generationStartedByUserIntent;(p==="missing_generation_baseline"||p==="generation_baseline_pending_resolution")&&(n.push(p),o.push(h)),(g===N.HISTORICAL_REPLAY_MESSAGE_RECEIVED||g===N.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION||u?.historicalReplayBlocked)&&(i.push(u?.historicalReplayReason||g||p||"historical_replay_signal_detected"),r.push(h)),g===N.IGNORED_AUTO_TRIGGER&&(L||$.startsWith("explicit_generation_action:"))&&(a.push(`ignored_auto_trigger_with_${$||"user_intent"}`),l.push(h)),e?.listenerSettings?.ignoreAutoTrigger&&!L&&!u?.isSpeculativeTransaction&&(v===X.COMPLETED||v===X.HANDLING||v===X.DISPATCHING||k==="generation_ended"||k==="message_received"||k==="generation_after_commands")&&(c.push("non_user_intent_generation_reached_execution_path"),d.push(h))}return{a10BaselineRaceSuspicious:Dn(n.length>0,n,o),a11ReplaySuspicious:Dn(i.length>0,i,r),a12UserIntentSuspicious:Dn(a.length>0,a,l),a13AutoTriggerLeakSuspicious:Dn(c.length>0,c,d)}}function dd(t,e=""){let s=Date.now();return S.lastDuplicateExecutionKey===(e||t)&&s-S.lastDuplicateMessageAt<Ic?!1:(S.lastDuplicateMessageKey=t,S.lastDuplicateExecutionKey=e||t,S.lastDuplicateMessageAt=s,!0)}function oo(t=Date.now()){for(let[e,s]of S.handledExecutionKeys.entries()){let n=Number(s?.at)||0;(n<=0||t-n>wc)&&S.handledExecutionKeys.delete(e)}}function ud(t,e=Date.now()){let s=String(t||"").trim();return s?(oo(e),S.handledExecutionKeys.has(s)):!1}function pd(t,e={}){let s=String(t||"").trim();if(!s)return null;let n={executionKey:s,at:Number(e?.at)||Date.now(),messageKey:String(e?.messageKey||"").trim(),messageId:j(e?.messageId),generationTraceId:String(e?.generationTraceId||"").trim(),eventType:String(e?.eventType||"").trim(),transactionKey:String(e?.transactionKey||"").trim()};return S.handledExecutionKeys.set(s,n),oo(n.at),n}function ro(t=8){return oo(),$s(Array.from(S.handledExecutionKeys.values()).sort((e,s)=>(Number(e?.at)||0)-(Number(s?.at)||0)),t).map(e=>({...e}))}function Wr(t="",e="",s=""){return[String(t||"chat_default").trim()||"chat_default",j(e)||"message:unknown",j(s)||"swipe:current"].join("::")}function Yr(t=Date.now()){for(let[e,s]of S.writebackGuards.entries()){let n=Number(s?.at)||0;(n<=0||t-n>Ec)&&S.writebackGuards.delete(e)}}function yd(t={}){let e=Wr(t?.chatId,t?.messageId,t?.effectiveSwipeId||t?.swipeId),s={guardKey:e,at:Date.now(),chatId:String(t?.chatId||"").trim()||"chat_default",messageId:j(t?.messageId),effectiveSwipeId:j(t?.effectiveSwipeId||t?.swipeId),traceId:String(t?.traceId||"").trim(),toolId:String(t?.toolId||"").trim()};return S.writebackGuards.set(e,s),Yr(s.at),s}function gd(t="",e="",s="",n=Date.now()){return Yr(n),S.writebackGuards.has(Wr(t,e,s))}function Vr(t){return j(t?.swipe_id??t?.swipeId??t?.swipeID)}function fd(t){return Array.isArray(t?.swipes)&&t.swipes.length>0?t.swipes.length:1}function bt(t={}){return[String(t?.chatId||"chat_default").trim()||"chat_default",j(t?.messageId)||"message:unknown",j(t?.effectiveSwipeId||t?.swipeId)||"swipe:current",String(t?.assistantContentFingerprint||"").trim()||"content:na"].join("::")}function Os(t={}){return[String(t?.chatId||"chat_default").trim()||"chat_default",j(t?.messageId)||"message:unknown"].join("::")}function Ns(t={}){return[bt(t),String(t?.eventType||"slot_event").trim()||"slot_event",String(t?.traceId||t?.generationTraceId||Wt("slot_tx")).trim()||Wt("slot_tx")].join("::")}function md(t=Date.now()){if(b.gateState.isGenerating)return!0;let e=Number(b.gateState.lastGenerationAt)||0;return e>0&&t-e<=_c}function hd(t,e="",s={},n={}){if(!t?.message)return null;let o=je(),i=o?.getContext?.()||null,r=t.message,a=j(On(r,t.index)),l=us(r),c=j(n?.effectiveSwipeId||s?.effectiveSwipeId||s?.sourceSwipeId||s?.swipeId||s?.swipe_id||Vr(r)),d=String(n?.generationTraceId||s?.generationTraceId||b.gateState.lastGenerationTraceId||"").trim(),u=String(s?.generationAction||b.gateState.lastGenerationAction||"").trim(),g=String(s?.generationActionSource||b.gateState.lastGenerationActionSource||"").trim(),p={eventType:e,chatId:ys(o,i,null),messageId:a,messageIndex:t.index,role:zn(r),content:l,assistantContentFingerprint:Bs(l),swipeId:c,effectiveSwipeId:c,swipeCount:fd(r),generationTraceId:d,generationAction:u,generationActionSource:g,generationStartedByUserIntent:!!(s?.generationStartedByUserIntent??ps()??Un()),dryRun:!!(s?.dryRun||b.gateState.lastGenerationDryRun),bindingSource:n?.bindingSource||"",rawMessage:r};return{...p,slotBindingKey:Os(p),slotRevisionKey:bt(p),slotTransactionId:Ns({...p,traceId:n?.traceId||s?.traceId||""})}}async function bd(t,e,s={}){let n=j(s?.messageId||Le(e,t)),o=String(s?.generationTraceId||e?.generationTraceId||b.gateState.lastGenerationTraceId||"").trim();if(!n)return null;let i=await Br(n,{retries:3,retryDelayMs:80});return i?hd(i,t,e,{generationTraceId:o,bindingSource:"event_message_id",traceId:s?.traceId||e?.traceId||""}):null}function Sd(t,e="",s={}){let n=Date.now();return t?t.role!=="assistant"?{allowed:!1,reason:N.NON_ASSISTANT_MESSAGE,detail:"resolved_slot_not_assistant"}:Nn(t.content)?t.dryRun?{allowed:!1,reason:N.DRY_RUN_GENERATION,detail:"slot_event_dry_run_generation"}:Ln(n)&&!ps(n)?{allowed:!1,reason:N.UNRELATED_UI_EVENT,detail:"ui_transition_guard_active"}:(e===O.MESSAGE_UPDATED||e===O.MESSAGE_SWIPED)&&gd(t.chatId,t.messageId,t.effectiveSwipeId,n)?{allowed:!1,reason:N.WRITEBACK_ECHO_EVENT,detail:"message_update_caused_by_tool_writeback"}:!t.generationStartedByUserIntent&&!md(n)&&!ps(n)&&!Un(n)?{allowed:!1,reason:e===O.MESSAGE_RECEIVED?N.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION:N.SLOT_EVENT_OUTSIDE_WINDOW,detail:"historical_replay_message_received"}:{allowed:!0,reason:"",detail:""}:{allowed:!1,reason:N.MISSING_AI_MESSAGE,detail:"assistant_slot_content_not_meaningful"}:{allowed:!1,reason:N.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"assistant_slot_not_resolved"}}async function Ps(t,e,s={}){let n=await bd(t,e,s),o=Sd(n,t,e);if(!o.allowed)return ht({triggerEvent:t,traceId:String(e?.traceId||"").trim(),transactionKey:"",messageId:n?.messageId||j(s?.messageId||Le(e,t)),generationMessageBindingSource:n?.bindingSource||"",confirmedAssistantSwipeId:n?.swipeId||"",effectiveSwipeId:n?.effectiveSwipeId||"",skipReason:o.reason,skipReasonDetailed:o.detail,confirmedAssistantMessageId:n?.messageId||"",confirmationSource:"none",slotRevisionKey:n?bt(n):""}),Oe({stage:"slot_event_skipped",eventType:t,traceId:String(e?.traceId||"").trim(),messageId:n?.messageId||j(s?.messageId||Le(e,t)),reason:o.reason,skipReasonDetailed:o.detail,confirmedAssistantMessageId:n?.messageId||"",confirmationSource:"none",slotBindingKey:n?.slotBindingKey||"",slotRevisionKey:n?.slotRevisionKey||"",sourceSwipeId:n?.effectiveSwipeId||"",historicalReplayBlocked:o.detail==="historical_replay_message_received",historicalReplayReason:o.detail==="historical_replay_message_received"?"slot_event_without_recent_user_intent":"",handledAt:Date.now()}),!1;let i={generationTraceId:n.generationTraceId,messageId:n.messageId,confirmedAssistantMessageId:n.messageId,confirmationSource:n.bindingSource||t.toLowerCase(),confirmationMode:"slot_revision",generationMessageBindingSource:n.bindingSource||"event_message_id",slotBindingKey:n.slotBindingKey||Os(n),confirmedAssistantSwipeId:n.swipeId||"",effectiveSwipeId:n.effectiveSwipeId||"",sourceMessageId:n.messageId,sourceSwipeId:n.effectiveSwipeId||"",slotRevisionKey:n.slotRevisionKey||bt(n),slotTransactionId:n.slotTransactionId||Ns(n),sameSlotRevisionCandidate:!0,sameSlotRevisionConfirmed:!0,sameSlotRevisionSource:n.bindingSource||"slot_revision",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:"",generationStartedByUserIntent:!!n.generationStartedByUserIntent,generationAction:n.generationAction||"",generationActionSource:n.generationActionSource||"",dryRun:!!n.dryRun,executionKey:n.slotRevisionKey||bt(n)},r=t===O.GENERATION_ENDED?0:Se().debounceMs;return r>0?wd(t,e,r,i):await Jr(t,{...typeof e=="object"&&e?e:{},...i,messageId:n.messageId,confirmedAssistantMessageId:n.messageId}),!0}function vd(){if(S.internalSubscriptions.length>0)return;let t=U.on(K.TOOL_CONTEXT_INJECTED,(e={})=>{let s=j(e?.sourceMessageId||e?.options?.sourceMessageId);s&&yd({chatId:e?.chatId||gs(),messageId:s,effectiveSwipeId:e?.effectiveSwipeId||e?.sourceSwipeId||e?.options?.sourceSwipeId||"",traceId:e?.traceId||e?.options?.traceId||"",toolId:e?.toolId||""})});S.internalSubscriptions.push(t)}async function xd(t,e={}){let s=await Gs(),n=je(),o=n?.getContext?.()||null,i=t?.message||null,r=Number.isInteger(t?.index)?t.index:-1,a=j(On(i,r)),l=us(i),c=j(e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||Vr(i)),d=String(e?.generationTraceId||b.gateState.lastGenerationTraceId||"").trim(),u=ys(n,o,s),g=Bs(l),p=Os({chatId:u,messageId:a}),h=bt({chatId:u,messageId:a,effectiveSwipeId:c,assistantContentFingerprint:g}),v=Ns({chatId:u,messageId:a,effectiveSwipeId:c,assistantContentFingerprint:g,eventType:e?.triggerEvent||"",generationTraceId:d,traceId:e?.traceId||""}),k=await Or({preferredMessageId:a||null,retries:Number.isFinite(e?.retries)?e.retries:2,retryDelayMs:Number.isFinite(e?.retryDelayMs)?e.retryDelayMs:120,lockToMessageId:!0}),$=k.messages||[],L=k.lastUserMessage;return{triggeredAt:Date.now(),triggerEvent:e?.triggerEvent||"",traceId:e?.traceId||"",transactionKey:e?.transactionKey||"",confirmationSource:String(e?.confirmationSource||"").trim(),confirmedAssistantMessageId:a,chatId:u,messageId:a,generationTraceId:d,confirmationMode:String(e?.confirmationMode||"slot_revision").trim(),sameSlotRevisionCandidate:!!e?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!e?.sameSlotRevisionConfirmed,sameSlotRevisionSource:String(e?.sameSlotRevisionSource||"").trim(),rawGenerationType:b.gateState.lastGenerationBaseline?.rawGenerationType||b.gateState.lastGenerationType||"",rawGenerationParams:b.gateState.lastGenerationBaseline?.rawGenerationParams??b.gateState.lastGenerationParams??null,normalizedGenerationType:b.gateState.lastGenerationBaseline?.normalizedGenerationType||b.gateState.lastNormalizedGenerationType||"",generationAction:b.gateState.lastGenerationBaseline?.generationAction||b.gateState.lastGenerationAction||"",generationActionSource:b.gateState.lastGenerationBaseline?.generationActionSource||b.gateState.lastGenerationActionSource||"",generationMessageBindingSource:String(e?.generationMessageBindingSource||"").trim(),slotBindingKey:p,slotRevisionKey:h,slotTransactionId:v,lastAiMessage:l,assistantContentFingerprint:g,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:a,sourceSwipeId:c,userMessage:L?.content||b.gateState.lastUserMessageText||"",chatMessages:$,input:{userMessage:L?.content||b.gateState.lastUserMessageText||"",lastAiMessage:l,extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:$.length||0}},config:{},status:"pending",executionKey:h}}function Td(t,e,s={}){let n=j(s?.messageId||Le(e,t)),o=getOrCreateTransactionRecord(t,e,{eventType:t,messageId:n,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",generationTraceId:s?.generationTraceId||b.gateState.lastGenerationTraceId||"",skipReasonDetailed:s?.skipReasonDetailed||"speculative_transaction_only",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeTransaction:!0}),i=s?.reason||N.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,r=s?.skipReasonDetailed||"speculative_transaction_only";return H("info","\u8BB0\u5F55 speculative transaction\uFF0C\u672A\u8FDB\u5165\u6267\u884C\u8C03\u5EA6",{eventType:t,traceId:o?.traceId||"",transactionKey:o?.transactionKey||"",messageId:n,reason:i,detail:r}),Oe({stage:"speculative_observed",eventType:t,traceId:o?.traceId||"",transactionKey:o?.transactionKey||"",messageId:n,reason:i,skipReasonDetailed:r,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",isSpeculativeTransaction:!0,eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",handledAt:Date.now()}),Ce(o,{phase:X.IGNORED,skipReason:i,skipReasonDetailed:r,confirmationSource:s?.confirmationSource||"none",confirmationMode:s?.confirmationMode||"",sameSlotRevisionCandidate:s?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:s?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:s?.sameSlotRevisionSource||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeTransaction:!0,completedAt:Date.now()}),$e(o,{phase:X.IGNORED,eventType:t,messageId:n,skipReason:i,skipReasonDetailed:r,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeTransaction:!0}),o}function Id(t,e={},s=""){let n=String(e?.executionKey||e?.slotRevisionKey||t?.executionKey||t?.slotRevisionKey||"").trim();if(n)return`txn::${n}`;let o=String(e?.slotTransactionId||e?.transactionId||t?.slotTransactionId||t?.transactionId||"").trim();return o?`txn_id::${o}`:t?.transactionKey||`message::${s}`}function wd(t,e,s=0,n={}){let o=j(n?.confirmedAssistantMessageId||n?.messageId||Le(e,t));if(!o)return Td(t,e,{...n,reason:n?.reason||N.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:n?.skipReasonDetailed||"missing_confirmed_message_identity",confirmationSource:n?.confirmationSource||"none"});let i=typeof e=="object"&&e?{...e,generationTraceId:n?.generationTraceId||e?.generationTraceId||b.gateState.lastGenerationTraceId||"",messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||e?.confirmationSource||"",confirmationMode:n?.confirmationMode||e?.confirmationMode||"",slotBindingKey:n?.slotBindingKey||e?.slotBindingKey||"",slotRevisionKey:n?.slotRevisionKey||e?.slotRevisionKey||"",slotTransactionId:n?.slotTransactionId||e?.slotTransactionId||"",executionKey:n?.executionKey||e?.executionKey||n?.slotRevisionKey||e?.slotRevisionKey||"",sourceMessageId:n?.sourceMessageId||e?.sourceMessageId||o,sourceSwipeId:n?.sourceSwipeId||e?.sourceSwipeId||e?.effectiveSwipeId||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??e?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??e?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||e?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??e?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??e?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||e?.historicalReplayReason||""}:{generationTraceId:n?.generationTraceId||b.gateState.lastGenerationTraceId||"",messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||"",confirmationMode:n?.confirmationMode||"",slotBindingKey:n?.slotBindingKey||"",slotRevisionKey:n?.slotRevisionKey||"",slotTransactionId:n?.slotTransactionId||"",executionKey:n?.executionKey||n?.slotRevisionKey||"",sourceMessageId:n?.sourceMessageId||o,sourceSwipeId:n?.sourceSwipeId||n?.effectiveSwipeId||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||""},r=nd(t,i,{...n,chatId:n?.chatId||i.chatId||gs(),messageId:o,generationTraceId:n?.generationTraceId||i.generationTraceId||"",slotRevisionKey:n?.slotRevisionKey||i.slotRevisionKey||"",executionKey:n?.executionKey||i.executionKey||i.slotRevisionKey||"",slotTransactionId:n?.slotTransactionId||i.slotTransactionId||""}),a=getOrCreateTransactionRecord(t,i,{...n,...r,eventType:t,messageId:o,confirmedAssistantMessageId:o,executionKey:r.executionKey||i.executionKey||i.slotRevisionKey||"",slotRevisionKey:r.slotRevisionKey||i.slotRevisionKey||"",transactionKey:r.transactionKey,transactionId:r.transactionId||i.slotTransactionId||"",slotTransactionId:r.transactionId||i.slotTransactionId||"",confirmationSource:n?.confirmationSource||i.confirmationSource||"",confirmationMode:n?.confirmationMode||i.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??i.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??i.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||i.historicalReplayReason||"",isSpeculativeTransaction:!1}),l=Number.isFinite(s)?Math.max(0,s):Se().debounceMs,c=Id(a,{...n,executionKey:r.executionKey||i.executionKey||"",slotRevisionKey:r.slotRevisionKey||i.slotRevisionKey||"",slotTransactionId:r.transactionId||i.slotTransactionId||"",transactionId:r.transactionId||i.slotTransactionId||""},o),d=S.pendingTransactionTimers.get(c);d&&clearTimeout(d),Ce(a,{phase:X.SCHEDULED,transactionKey:r.transactionKey,transactionId:r.transactionId||i.slotTransactionId||"",executionKey:r.executionKey||i.executionKey||"",slotRevisionKey:r.slotRevisionKey||i.slotRevisionKey||"",slotTransactionId:r.transactionId||i.slotTransactionId||"",messageId:o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",confirmationMode:n?.confirmationMode||i.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??i.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??i.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||i.historicalReplayReason||"",isSpeculativeTransaction:!1,scheduledAt:Date.now()}),$e(a,{phase:X.SCHEDULED,eventType:t,messageId:o,transactionKey:r.transactionKey,transactionId:r.transactionId||i.slotTransactionId||"",executionKey:r.executionKey||i.executionKey||"",slotRevisionKey:r.slotRevisionKey||i.slotRevisionKey||"",confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??i.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??i.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||i.historicalReplayReason||"",isSpeculativeTransaction:!1}),Oe({stage:"scheduled",eventType:t,traceId:a?.traceId||"",transactionKey:r.transactionKey||a?.transactionKey||"",transactionId:r.transactionId||i.slotTransactionId||"",executionKey:r.executionKey||i.executionKey||"",messageId:o,slotBindingKey:n?.slotBindingKey||i.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||i.slotRevisionKey||"",slotTransactionId:r.transactionId||i.slotTransactionId||"",sourceMessageId:n?.sourceMessageId||i.sourceMessageId||o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",confirmationMode:n?.confirmationMode||i.confirmationMode||"",sourceSwipeId:n?.sourceSwipeId||i.sourceSwipeId||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",isSpeculativeTransaction:!1,eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:l}),H("info","\u5DF2\u8C03\u5EA6\u786E\u8BA4\u540E\u7684\u81EA\u52A8\u89E6\u53D1",{eventType:t,messageId:o,executionKey:r.executionKey||i.executionKey||"",transactionKey:r.transactionKey||a?.transactionKey||"",confirmationSource:n?.confirmationSource||i.confirmationSource||"",delayMs:l});let u=setTimeout(async()=>{S.pendingTransactionTimers.delete(c),Ce(a,{phase:X.DISPATCHING,transactionKey:r.transactionKey,transactionId:r.transactionId||i.slotTransactionId||"",executionKey:r.executionKey||i.executionKey||"",slotRevisionKey:r.slotRevisionKey||i.slotRevisionKey||"",slotTransactionId:r.transactionId||i.slotTransactionId||"",confirmationSource:n?.confirmationSource||i.confirmationSource||"",confirmationMode:n?.confirmationMode||i.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",confirmedAssistantMessageId:o,isSpeculativeTransaction:!1}),$e(a,{phase:X.DISPATCHING,eventType:t,messageId:o,transactionKey:r.transactionKey,transactionId:r.transactionId||i.slotTransactionId||"",executionKey:r.executionKey||i.executionKey||"",slotRevisionKey:r.slotRevisionKey||i.slotRevisionKey||"",confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",confirmationMode:n?.confirmationMode||i.confirmationMode||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",isSpeculativeTransaction:!1}),Oe({stage:"dispatching",eventType:t,traceId:a?.traceId||"",transactionKey:r.transactionKey||a?.transactionKey||"",transactionId:r.transactionId||i.slotTransactionId||"",executionKey:r.executionKey||i.executionKey||"",messageId:o,slotBindingKey:n?.slotBindingKey||i.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||i.slotRevisionKey||"",slotTransactionId:r.transactionId||i.slotTransactionId||"",sourceMessageId:n?.sourceMessageId||i.sourceMessageId||o,confirmedAssistantMessageId:o,confirmationSource:n?.confirmationSource||i.confirmationSource||"",isSpeculativeTransaction:!1,confirmationMode:n?.confirmationMode||i.confirmationMode||"",sourceSwipeId:n?.sourceSwipeId||i.sourceSwipeId||"",sameSlotRevisionCandidate:n?.sameSlotRevisionCandidate??i.sameSlotRevisionCandidate??!1,sameSlotRevisionConfirmed:n?.sameSlotRevisionConfirmed??i.sameSlotRevisionConfirmed??!1,sameSlotRevisionSource:n?.sameSlotRevisionSource||i.sameSlotRevisionSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:l}),await Jr(t,{...i,transactionKey:r.transactionKey,transactionId:r.transactionId||i.slotTransactionId||"",executionKey:r.executionKey||i.executionKey||"",slotRevisionKey:r.slotRevisionKey||i.slotRevisionKey||"",slotTransactionId:r.transactionId||i.slotTransactionId||""})},l);return S.pendingTransactionTimers.set(c,u),a}function $n(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}function qr(t,e){return e?.triggerEvent==="MANUAL"?t.output?.mode===At.POST_RESPONSE_API?jt.MANUAL_POST_RESPONSE_API:jt.MANUAL_COMPATIBILITY:jt.AUTO_POST_RESPONSE_API}async function Jr(t,e){F(`${t}\u89E6\u53D1:`,e);let s=typeof e=="object"&&e?String(e?.generationTraceId||b.gateState.lastGenerationTraceId||"").trim():String(b.gateState.lastGenerationTraceId||"").trim(),n=await Hc({traceId:s,retries:2,retryDelayMs:40})||eo(),o=n?.rawGenerationType||n?.generationType||b.gateState.lastGenerationType||"",i=n?.rawGenerationParams??n?.generationParams??b.gateState.lastGenerationParams??null,r=!!n?.dryRun,a=typeof e=="object"&&e?String(e?.confirmationSource||"").trim():"",l=typeof e=="object"&&e?String(e?.confirmationMode||"").trim():"",c=!!(typeof e=="object"&&e&&e?.sameSlotRevisionCandidate),d=!!(typeof e=="object"&&e&&e?.sameSlotRevisionConfirmed),u=typeof e=="object"&&e?String(e?.sameSlotRevisionSource||"").trim():"";H("info","\u5F00\u59CB\u5904\u7406\u81EA\u52A8\u89E6\u53D1",{eventType:t,incomingMessageId:Le(e,t),confirmationSource:a});let g=Ad(O.GENERATION_ENDED),p=g.map(w=>w.id),h=Wc(),v=Le(e,t),k=!!(typeof e=="object"&&e&&e?.eventBelongsToCurrentGeneration),$=!!(typeof e=="object"&&e&&e?.historicalReplayBlocked),L=typeof e=="object"&&e?String(e?.historicalReplayReason||"").trim():"",E=j((typeof e=="object"&&e?e?.confirmedAssistantMessageId:"")||v),I=getOrCreateTransactionRecord(t,e,{eventType:t,messageId:v,confirmedAssistantMessageId:E,confirmationSource:a,confirmationMode:l,sameSlotRevisionCandidate:c,sameSlotRevisionConfirmed:d,sameSlotRevisionSource:u,eventBelongsToCurrentGeneration:k,historicalReplayBlocked:$,historicalReplayReason:L,candidateToolIds:p});if(Ce(I,{phase:X.HANDLING,handledAt:Date.now(),confirmedAssistantMessageId:E,confirmationSource:a,confirmationMode:l,sameSlotRevisionCandidate:c,sameSlotRevisionConfirmed:d,sameSlotRevisionSource:u,isSpeculativeTransaction:!1,eventBelongsToCurrentGeneration:k,historicalReplayBlocked:$,historicalReplayReason:L,candidateToolIds:p}),$e(I,{phase:X.HANDLING,eventType:t,messageId:v,confirmedAssistantMessageId:E,confirmationSource:a,confirmationMode:l,sameSlotRevisionCandidate:c,sameSlotRevisionConfirmed:d,sameSlotRevisionSource:u,isSpeculativeTransaction:!1,eventBelongsToCurrentGeneration:k,historicalReplayBlocked:$,historicalReplayReason:L,candidateToolIds:p}),Oe({stage:"handling",eventType:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:v,confirmedAssistantMessageId:E,confirmationSource:a,isSpeculativeTransaction:!1,eventBelongsToCurrentGeneration:k,historicalReplayBlocked:$,historicalReplayReason:L,candidateToolIds:p,handledAt:Date.now()}),Ln()&&!ps()){H("warn","\u5F53\u524D\u5904\u4E8E\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B\u7A97\u53E3\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u5FFD\u7565",{eventType:t,candidateToolIds:p,uiTransitionGuardUntil:b.gateState.uiTransitionGuardUntil,lastUiTransitionSource:b.gateState.lastUiTransitionSource||""}),ht({triggerEvent:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:v,selectedToolIds:p,skipReason:N.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:E,confirmationSource:a,lockedAiMessageId:v||""}),ds(g,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:N.UNRELATED_UI_EVENT,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Oe({stage:"ignored_ui_transition_guard",eventType:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:v,reason:N.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:E,confirmationSource:a,candidateToolIds:p,handledAt:Date.now()}),Ce(I,{phase:X.IGNORED,skipReason:N.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:E,confirmationSource:a,completedAt:Date.now(),candidateToolIds:p}),$e(I,{phase:X.IGNORED,eventType:t,messageId:v,skipReason:N.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:E,confirmationSource:a,candidateToolIds:p}),Ht(g,{traceId:I?.traceId||"",eventType:t,messageId:v,messageKey:"",skipReason:N.UNRELATED_UI_EVENT,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(r){H("warn","\u5F53\u524D generation \u4E3A dryRun\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u963B\u65AD",{eventType:t,candidateToolIds:p,generationTraceId:s||""}),ht({triggerEvent:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:v,selectedToolIds:p,skipReason:N.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:E,confirmationSource:a,lockedAiMessageId:v||""}),ds(g,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:N.DRY_RUN_GENERATION,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Oe({stage:"skipped",eventType:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:v,reason:N.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:E,confirmationSource:a,candidateToolIds:p,handledAt:Date.now()}),Ce(I,{phase:X.SKIPPED,skipReason:N.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:E,confirmationSource:a,completedAt:Date.now(),candidateToolIds:p}),$e(I,{phase:X.SKIPPED,eventType:t,messageId:v,skipReason:N.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:E,confirmationSource:a,candidateToolIds:p}),Ht(g,{traceId:I?.traceId||"",eventType:t,messageId:v,messageKey:"",skipReason:N.DRY_RUN_GENERATION,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(h.skip){H("warn","\u6839\u636E\u76D1\u542C\u5668\u8BBE\u7F6E\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,reason:h.reason,listenerSettings:h.listenerSettings,candidateToolIds:p}),ht({triggerEvent:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:v,selectedToolIds:p,skipReason:h.reason,skipReasonDetailed:`listener_setting_${h.reason}`,confirmedAssistantMessageId:E,confirmationSource:a,lockedAiMessageId:v||""}),ds(g,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:h.reason,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Oe({stage:"skipped",eventType:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:v,reason:h.reason,skipReasonDetailed:`listener_setting_${h.reason}`,confirmedAssistantMessageId:E,confirmationSource:a,candidateToolIds:p,handledAt:Date.now()}),Ce(I,{phase:X.SKIPPED,skipReason:h.reason,skipReasonDetailed:`listener_setting_${h.reason}`,confirmedAssistantMessageId:E,confirmationSource:a,completedAt:Date.now(),candidateToolIds:p}),$e(I,{phase:X.SKIPPED,eventType:t,messageId:v,skipReason:h.reason,skipReasonDetailed:`listener_setting_${h.reason}`,confirmedAssistantMessageId:E,confirmationSource:a,candidateToolIds:p}),Ht(g,{traceId:I?.traceId||"",eventType:t,messageId:v,messageKey:"",skipReason:h.reason,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}if(h.listenerSettings.ignoreQuietGeneration&&kc(o,i,r)){F("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C"),H("warn","\u68C0\u6D4B\u5230 quiet/dryRun\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,candidateToolIds:p}),ht({triggerEvent:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",selectedToolIds:p,skipReason:N.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:E,confirmationSource:a}),ds(g,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:N.QUIET_GENERATION,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Oe({stage:"skipped",eventType:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:v,reason:N.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:E,confirmationSource:a,candidateToolIds:p,handledAt:Date.now()}),Ce(I,{phase:X.SKIPPED,skipReason:N.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:E,confirmationSource:a,completedAt:Date.now(),candidateToolIds:p}),$e(I,{phase:X.SKIPPED,eventType:t,messageId:v,skipReason:N.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:E,confirmationSource:a,candidateToolIds:p}),Ht(g,{traceId:I?.traceId||"",eventType:t,messageId:v,messageKey:"",skipReason:N.QUIET_GENERATION,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}let y=await ao({...typeof e=="object"&&e?e:{},triggerEvent:t,...v?{messageId:v}:{},...E?{confirmedAssistantMessageId:E}:{},...a?{confirmationSource:a}:{},traceId:I?.traceId||"",transactionKey:I?.transactionKey||""});y.traceId=I?.traceId||y.traceId||Wt("exec"),y.transactionKey=I?.transactionKey||y.transactionKey||"";let B=y?.executionKey||td(y||{});y.executionKey=B;let M=ed(y.chatId,y.messageId,t,y.generationTraceId);if(od(I,M),Ce(I,{messageId:y.messageId||v,messageKey:$n(y),executionKey:B,confirmedAssistantMessageId:y.confirmedAssistantMessageId||E,slotBindingKey:y.slotBindingKey||"",slotRevisionKey:y.slotRevisionKey||"",slotTransactionId:y.slotTransactionId||"",confirmationSource:y.confirmationSource||a,confirmationMode:y?.confirmationMode||l,sameSlotRevisionCandidate:y?.sameSlotRevisionCandidate??c,sameSlotRevisionConfirmed:y?.sameSlotRevisionConfirmed??d,sameSlotRevisionSource:y?.sameSlotRevisionSource||u,sourceMessageLocked:!!y.messageId}),!y?.lastAiMessage){F(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`),H("warn","\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D\uFF0C\u81EA\u52A8\u89E6\u53D1\u4E2D\u6B62",{eventType:t,preferredMessageId:v,candidateToolIds:p});let w=$n(y||{});ht({triggerEvent:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:y?.messageId||"",messageKey:w,executionKey:B,slotBindingKey:y?.slotBindingKey||"",generationMessageBindingSource:y?.generationMessageBindingSource||"",sourceMessageId:y?.sourceMessageId||y?.messageId||"",sourceSwipeId:y?.sourceSwipeId||y?.effectiveSwipeId||"",confirmedAssistantSwipeId:y?.confirmedAssistantSwipeId||"",effectiveSwipeId:y?.effectiveSwipeId||"",slotRevisionKey:y?.slotRevisionKey||"",slotTransactionId:y?.slotTransactionId||"",selectedToolIds:p,skipReason:N.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,lockedAiMessageId:y?.messageId||""}),ds(g,{lastTriggerEvent:t,lastMessageKey:w,lastExecutionKey:B,lastSkipReason:N.MISSING_AI_MESSAGE,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Oe({stage:"skipped",eventType:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:y?.messageId||v,messageKey:w,executionKey:B,slotBindingKey:y?.slotBindingKey||"",generationMessageBindingSource:y?.generationMessageBindingSource||"",sourceMessageId:y?.sourceMessageId||y?.messageId||"",sourceSwipeId:y?.sourceSwipeId||y?.effectiveSwipeId||"",confirmedAssistantSwipeId:y?.confirmedAssistantSwipeId||"",effectiveSwipeId:y?.effectiveSwipeId||"",slotRevisionKey:y?.slotRevisionKey||"",slotTransactionId:y?.slotTransactionId||"",reason:N.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,candidateToolIds:p,handledAt:Date.now()}),Ce(I,{phase:X.SKIPPED,skipReason:N.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",messageKey:w,executionKey:B,confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,completedAt:Date.now(),candidateToolIds:p}),$e(I,{phase:X.SKIPPED,eventType:t,messageId:y?.messageId||v,messageKey:w,executionKey:B,skipReason:N.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,candidateToolIds:p}),Ht(g,{traceId:I?.traceId||"",eventType:t,messageId:y?.messageId||v,messageKey:w,skipReason:N.MISSING_AI_MESSAGE,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""});return}let C=$n(y);if(ud(B)){dd(C,B)&&(F(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${C}`),H("warn","\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD\uFF0C\u8DF3\u8FC7\u6267\u884C",{eventType:t,messageKey:C,executionKey:B,candidateToolIds:p}),ht({triggerEvent:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:y?.messageId||"",messageKey:C,executionKey:B,slotBindingKey:y?.slotBindingKey||"",generationMessageBindingSource:y?.generationMessageBindingSource||"",sourceMessageId:y?.sourceMessageId||y?.messageId||"",sourceSwipeId:y?.sourceSwipeId||y?.effectiveSwipeId||"",confirmedAssistantSwipeId:y?.confirmedAssistantSwipeId||"",effectiveSwipeId:y?.effectiveSwipeId||"",slotRevisionKey:y?.slotRevisionKey||"",slotTransactionId:y?.slotTransactionId||"",selectedToolIds:p,skipReason:N.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,lockedAiMessageId:y?.messageId||""}),ds(g,{lastTriggerEvent:t,lastMessageKey:C,lastExecutionKey:B,lastSkipReason:N.DUPLICATE_MESSAGE,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:""}),Oe({stage:"skipped",eventType:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:y?.messageId||v,messageKey:C,executionKey:B,slotBindingKey:y?.slotBindingKey||"",generationMessageBindingSource:y?.generationMessageBindingSource||"",sourceMessageId:y?.sourceMessageId||y?.messageId||"",sourceSwipeId:y?.sourceSwipeId||y?.effectiveSwipeId||"",confirmedAssistantSwipeId:y?.confirmedAssistantSwipeId||"",effectiveSwipeId:y?.effectiveSwipeId||"",slotRevisionKey:y?.slotRevisionKey||"",slotTransactionId:y?.slotTransactionId||"",reason:N.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,candidateToolIds:p,handledAt:Date.now()}),Ce(I,{phase:X.SKIPPED,skipReason:N.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",messageKey:C,executionKey:B,confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,completedAt:Date.now(),candidateToolIds:p}),$e(I,{phase:X.SKIPPED,eventType:t,messageId:y?.messageId||v,messageKey:C,executionKey:B,skipReason:N.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,candidateToolIds:p}),Ht(g,{traceId:I?.traceId||"",eventType:t,messageId:y?.messageId||v,messageKey:C,skipReason:N.DUPLICATE_MESSAGE,executionPath:"",writebackStatus:ne.NOT_APPLICABLE,failureStage:""}));return}let P=g;if(P.length===0){F("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177"),H("warn","\u5F53\u524D\u4E8B\u4EF6\u672A\u547D\u4E2D\u4EFB\u4F55\u53EF\u6267\u884C\u5DE5\u5177",{eventType:t,messageKey:C,candidateToolIds:p}),ht({triggerEvent:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:y?.messageId||"",messageKey:C,generationMessageBindingSource:y?.generationMessageBindingSource||"",confirmedAssistantSwipeId:y?.confirmedAssistantSwipeId||"",effectiveSwipeId:y?.effectiveSwipeId||"",selectedToolIds:[],skipReason:N.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,lockedAiMessageId:y?.messageId||""}),Oe({stage:"skipped",eventType:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:y?.messageId||v,messageKey:C,generationMessageBindingSource:y?.generationMessageBindingSource||"",confirmedAssistantSwipeId:y?.confirmedAssistantSwipeId||"",effectiveSwipeId:y?.effectiveSwipeId||"",reason:N.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,candidateToolIds:[],handledAt:Date.now()}),Ce(I,{phase:X.SKIPPED,skipReason:N.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",messageKey:C,confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,completedAt:Date.now(),candidateToolIds:[]}),$e(I,{phase:X.SKIPPED,eventType:t,messageId:y?.messageId||v,messageKey:C,skipReason:N.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,candidateToolIds:[]});return}S.lastHandledMessageKey=C,S.lastHandledExecutionKey=B,S.lastHandledSlotRevisionKey=y?.slotRevisionKey||B,pd(B,{messageKey:C,messageId:y?.messageId||v,generationTraceId:y?.generationTraceId||"",eventType:t,transactionKey:I?.transactionKey||""}),S.lastDuplicateMessageKey="",S.lastDuplicateExecutionKey="",S.lastDuplicateMessageAt=0,y.messageKey=C,ht({triggerEvent:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:y?.messageId||"",messageKey:C,executionKey:B,slotBindingKey:y?.slotBindingKey||"",generationMessageBindingSource:y?.generationMessageBindingSource||"",sourceMessageId:y?.sourceMessageId||y?.messageId||"",sourceSwipeId:y?.sourceSwipeId||y?.effectiveSwipeId||"",confirmedAssistantSwipeId:y?.confirmedAssistantSwipeId||"",effectiveSwipeId:y?.effectiveSwipeId||"",slotRevisionKey:y?.slotRevisionKey||"",slotTransactionId:y?.slotTransactionId||"",selectedToolIds:P.map(w=>w.id),skipReason:"",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,lockedAiMessageId:y?.messageId||""}),F(`\u9700\u8981\u6267\u884C ${P.length} \u4E2A\u5DE5\u5177:`,P.map(w=>w.id)),H("info","\u81EA\u52A8\u89E6\u53D1\u547D\u4E2D\u5DE5\u5177",{eventType:t,messageKey:C,executionKey:B,toolIds:P.map(w=>w.id)}),nt("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${P.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"}),Ce(I,{messageKey:C,executionKey:B,candidateToolIds:P.map(w=>w.id),executionPathIds:[],confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,phase:X.DISPATCHING}),$e(I,{phase:X.DISPATCHING,eventType:t,messageId:y?.messageId||v,messageKey:C,executionKey:B,confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,candidateToolIds:P.map(w=>w.id)}),Ht(P,{traceId:I?.traceId||"",eventType:t,messageId:y?.messageId||v,messageKey:C,executionKey:B,skipReason:"",executionPath:jt.AUTO_POST_RESPONSE_API,writebackStatus:"",failureStage:""});for(let w of P)try{let G=await Qr(w,y),re=qr(w,y);I.executionPathIds.includes(re)||I.executionPathIds.push(re),rd(w.id,{traceId:I?.traceId||"",eventType:t,messageId:y?.messageId||v,messageKey:C,executionKey:B,executionPath:re,writebackStatus:G?.result?.meta?.writebackStatus||G?.meta?.writebackStatus||ne.NOT_APPLICABLE,failureStage:G?.result?.meta?.failureStage||G?.meta?.failureStage||"",contentCommitted:!!(G?.result?.meta?.writebackDetails?.contentCommitted||G?.meta?.writebackDetails?.contentCommitted),hostCommitApplied:!!(G?.result?.meta?.writebackDetails?.hostCommitApplied||G?.meta?.writebackDetails?.hostCommitApplied),refreshRequested:!!(G?.result?.meta?.writebackDetails?.refreshRequested||G?.meta?.writebackDetails?.refreshRequested),refreshConfirmed:!!(G?.result?.meta?.writebackDetails?.refreshConfirmed||G?.meta?.writebackDetails?.refreshConfirmed),preferredCommitMethod:G?.result?.meta?.writebackDetails?.commit?.preferredMethod||G?.meta?.writebackDetails?.commit?.preferredMethod||"",appliedCommitMethod:G?.result?.meta?.writebackDetails?.commit?.appliedMethod||G?.meta?.writebackDetails?.commit?.appliedMethod||"",refreshMethodCount:(G?.result?.meta?.writebackDetails?.refresh?.requestMethods||G?.meta?.writebackDetails?.refresh?.requestMethods||[]).length,refreshMethods:[...G?.result?.meta?.writebackDetails?.refresh?.requestMethods||G?.meta?.writebackDetails?.refresh?.requestMethods||[]],refreshConfirmChecks:G?.result?.meta?.writebackDetails?.refresh?.confirmChecks||G?.meta?.writebackDetails?.refresh?.confirmChecks||0,refreshConfirmedBy:G?.result?.meta?.writebackDetails?.refresh?.confirmedBy||G?.meta?.writebackDetails?.refresh?.confirmedBy||"",success:!!G?.success}),G.success?(F(`\u5DE5\u5177 ${w.id} \u6267\u884C\u6210\u529F`),U.emit(K.TOOL_EXECUTED,{toolId:w.id,result:G.result||G.data||G})):F(`\u5DE5\u5177 ${w.id} \u6267\u884C\u5931\u8D25:`,G.error)}catch(G){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${w.id}`,G)}S.lastExecutionContext=y,Oe({stage:"completed",eventType:t,traceId:I?.traceId||"",transactionKey:I?.transactionKey||"",messageId:y?.messageId||v,messageKey:C,executionKey:B,slotBindingKey:y?.slotBindingKey||"",generationMessageBindingSource:y?.generationMessageBindingSource||"",sourceMessageId:y?.sourceMessageId||y?.messageId||"",sourceSwipeId:y?.sourceSwipeId||y?.effectiveSwipeId||"",confirmedAssistantSwipeId:y?.confirmedAssistantSwipeId||"",effectiveSwipeId:y?.effectiveSwipeId||"",slotRevisionKey:y?.slotRevisionKey||"",slotTransactionId:y?.slotTransactionId||"",confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,candidateToolIds:P.map(w=>w.id),handledAt:Date.now()}),Ce(I,{phase:X.COMPLETED,messageKey:C,executionKey:B,confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,completedAt:Date.now(),candidateToolIds:P.map(w=>w.id)}),$e(I,{phase:X.COMPLETED,eventType:t,messageId:y?.messageId||v,messageKey:C,executionKey:B,confirmedAssistantMessageId:y?.confirmedAssistantMessageId||E,confirmationSource:y?.confirmationSource||a,candidateToolIds:P.map(w=>w.id),executionPathIds:[...I.executionPathIds||[]]})}async function _d(t,e,s){return s||t.output?.mode===At.POST_RESPONSE_API?ls.runToolPostResponse(t,e):(await Fc()).executeToolWithConfig(t.id,e)}function Xr(){if(S.initialized){F("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}Ed(),vd(),S.initialized=!0,F("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),U.emit(K.TOOL_TRIGGER_INITIALIZED)}function Ed(){let t=(r,a,l)=>{let c=getOrCreateTransactionRecord(r,{messageId:a},{eventType:r,messageId:a});Ce(c,{phase:X.IGNORED,skipReason:l,completedAt:Date.now()}),$e(c,{phase:X.IGNORED,eventType:r,messageId:a,skipReason:l}),Oe({stage:"ignored",eventType:r,traceId:c?.traceId||"",transactionKey:c?.transactionKey||"",messageId:a,reason:l,handledAt:Date.now()})},e=Fe(O.GENERATION_ENDED,async r=>{await Ps(O.GENERATION_ENDED,r)}),s=Fe(O.GENERATION_AFTER_COMMANDS,async r=>{let a=Le(r,O.GENERATION_AFTER_COMMANDS);if(!Se().useGenerationAfterCommandsFallback){t(O.GENERATION_AFTER_COMMANDS,a,"generation_after_commands_fallback_disabled");return}await Ps(O.GENERATION_AFTER_COMMANDS,r)}),n=Fe(O.MESSAGE_RECEIVED,async r=>{let a=Le(r,O.MESSAGE_RECEIVED);if(!Se().useMessageReceivedFallback){t(O.MESSAGE_RECEIVED,a,"message_received_fallback_disabled");return}await Ps(O.MESSAGE_RECEIVED,r)}),o=Fe(O.MESSAGE_UPDATED,async r=>{let a=Le(r,O.MESSAGE_UPDATED);if(!Se().useMessageReceivedFallback){t(O.MESSAGE_UPDATED,a,"message_received_fallback_disabled");return}await Ps(O.MESSAGE_UPDATED,r)}),i=Fe(O.MESSAGE_SWIPED,async r=>{let a=Le(r,O.MESSAGE_SWIPED);if(!Se().useMessageReceivedFallback){t(O.MESSAGE_SWIPED,a,"message_received_fallback_disabled");return}await Ps(O.MESSAGE_SWIPED,r)});S.listeners.set(O.GENERATION_ENDED,e),S.listeners.set(O.GENERATION_AFTER_COMMANDS,s),S.listeners.set(O.MESSAGE_RECEIVED,n),S.listeners.set(O.MESSAGE_UPDATED,o),S.listeners.set(O.MESSAGE_SWIPED,i)}async function ao(t){let e=t?.triggerEvent||"GENERATION_ENDED",s=j(t?.confirmedAssistantMessageId||t?.messageId||Le(t,e)),n=e==="MANUAL"||e==="MANUAL_PREVIEW";if(!n&&s){let L=await Br(s,{retries:3,retryDelayMs:80});if(L?.message&&zn(L.message)==="assistant"&&Nn(us(L.message)))return xd(L,{triggerEvent:e,traceId:t?.traceId||"",transactionKey:t?.transactionKey||"",confirmationSource:t?.confirmationSource||"event_message_id",confirmationMode:t?.confirmationMode||"slot_revision",generationTraceId:t?.generationTraceId||b.gateState.lastGenerationTraceId||"",sameSlotRevisionCandidate:!0,sameSlotRevisionConfirmed:!0,sameSlotRevisionSource:t?.sameSlotRevisionSource||t?.confirmationSource||"slot_revision",generationMessageBindingSource:t?.generationMessageBindingSource||t?.confirmationSource||"event_message_id",confirmedAssistantSwipeId:t?.confirmedAssistantSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.confirmedAssistantSwipeId||"",retries:2,retryDelayMs:120});let E=await Gs(),I=je(),y=I?.getContext?.()||null,B=ys(I,y,E),M=j(t?.effectiveSwipeId||t?.confirmedAssistantSwipeId||t?.sourceSwipeId)||"swipe:current",C=Os({chatId:B,messageId:s}),P=bt({chatId:B,messageId:s,effectiveSwipeId:M,assistantContentFingerprint:""});return{triggeredAt:Date.now(),triggerEvent:e,traceId:t?.traceId||"",transactionKey:t?.transactionKey||"",confirmationSource:String(t?.confirmationSource||"event_message_id").trim(),confirmedAssistantMessageId:s,chatId:B,messageId:s,generationTraceId:String(t?.generationTraceId||b.gateState.lastGenerationTraceId||"").trim(),confirmationMode:String(t?.confirmationMode||"slot_revision").trim(),sameSlotRevisionCandidate:!0,sameSlotRevisionConfirmed:!0,sameSlotRevisionSource:String(t?.sameSlotRevisionSource||t?.confirmationSource||"slot_revision").trim(),rawGenerationType:b.gateState.lastGenerationBaseline?.rawGenerationType||b.gateState.lastGenerationType||"",rawGenerationParams:b.gateState.lastGenerationBaseline?.rawGenerationParams??b.gateState.lastGenerationParams??null,normalizedGenerationType:b.gateState.lastGenerationBaseline?.normalizedGenerationType||b.gateState.lastNormalizedGenerationType||"",generationAction:String(t?.generationAction||b.gateState.lastGenerationAction||"").trim(),generationActionSource:String(t?.generationActionSource||b.gateState.lastGenerationActionSource||"").trim(),generationMessageBindingSource:String(t?.generationMessageBindingSource||t?.confirmationSource||"event_message_id").trim(),slotBindingKey:C,slotRevisionKey:P,slotTransactionId:Ns({chatId:B,messageId:s,effectiveSwipeId:M,assistantContentFingerprint:"",eventType:e,generationTraceId:String(t?.generationTraceId||b.gateState.lastGenerationTraceId||"").trim(),traceId:t?.traceId||""}),lastAiMessage:"",assistantContentFingerprint:"",lastAiMessageSwipeId:M,confirmedAssistantSwipeId:M,effectiveSwipeId:M,sourceMessageId:s,sourceSwipeId:M,userMessage:b.gateState.lastUserMessageText||"",chatMessages:[],input:{userMessage:b.gateState.lastUserMessageText||"",lastAiMessage:"",extractedContent:"",previousToolOutput:"",context:{character:E?.name||"",chatLength:0}},config:{},status:"pending",executionKey:P}}let o=await Gs(),i=je(),r=i?.getContext?.()||null,a=await Or({preferredMessageId:null,retries:n?2:0,retryDelayMs:120,lockToMessageId:!1}),l=a.messages||[],c=a.lastUserMessage,d=a.lastAiMessage,u=j(d?.sourceId)||"",g=j(d?.swipeId),p=Bs(d?.content||""),h=ys(i,r,o),v=Os({chatId:h,messageId:u}),k=bt({chatId:h,messageId:u,effectiveSwipeId:g,assistantContentFingerprint:p}),$=Ns({chatId:h,messageId:u,effectiveSwipeId:g,assistantContentFingerprint:p,eventType:e,generationTraceId:String(t?.generationTraceId||b.gateState.lastGenerationTraceId||"").trim(),traceId:t?.traceId||""});return{triggeredAt:Date.now(),triggerEvent:e,traceId:t?.traceId||"",transactionKey:t?.transactionKey||"",confirmationSource:String(t?.confirmationSource||"").trim(),confirmedAssistantMessageId:u,chatId:h,messageId:u,generationTraceId:String(t?.generationTraceId||b.gateState.lastGenerationTraceId||"").trim(),confirmationMode:String(t?.confirmationMode||"").trim(),sameSlotRevisionCandidate:!!t?.sameSlotRevisionCandidate,sameSlotRevisionConfirmed:!!t?.sameSlotRevisionConfirmed,sameSlotRevisionSource:String(t?.sameSlotRevisionSource||"").trim(),rawGenerationType:b.gateState.lastGenerationBaseline?.rawGenerationType||b.gateState.lastGenerationType||"",rawGenerationParams:b.gateState.lastGenerationBaseline?.rawGenerationParams??b.gateState.lastGenerationParams??null,normalizedGenerationType:b.gateState.lastGenerationBaseline?.normalizedGenerationType||b.gateState.lastNormalizedGenerationType||"",generationAction:String(t?.generationAction||b.gateState.lastGenerationAction||"").trim(),generationActionSource:String(t?.generationActionSource||b.gateState.lastGenerationActionSource||"").trim(),generationMessageBindingSource:String(t?.generationMessageBindingSource||"").trim(),slotBindingKey:v,slotRevisionKey:k,slotTransactionId:$,lastAiMessage:d?.content||"",assistantContentFingerprint:p,lastAiMessageSwipeId:g,confirmedAssistantSwipeId:g,effectiveSwipeId:g,sourceMessageId:u,sourceSwipeId:g,userMessage:c?.content||b.gateState.lastUserMessageText||"",chatMessages:l,input:{userMessage:c?.content||b.gateState.lastUserMessageText||"",lastAiMessage:d?.content||"",extractedContent:"",previousToolOutput:"",context:{character:o?.name||"",chatLength:l.length||0}},config:{},status:"pending",executionKey:k}}function Ad(t){return os().filter(s=>{let n=s?.trigger?.enabled&&s?.trigger?.event===t,o=Array.isArray(s?.triggerEvents)&&s.triggerEvents.includes(t);return(n||o)&&ls.shouldRunPostResponse(s)})}function Gn(t,e){try{Ni(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function Qr(t,e){let s=Date.now(),n=t.id,o=e?.triggerEvent==="MANUAL",i=`yyt-tool-run-${n}`,r=qr(t,e),a=e?.messageKey||$n(e||{}),l=e?.executionKey||"";Gn(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||O.GENERATION_ENDED,lastMessageKey:a,lastExecutionKey:l,lastSkipReason:"",lastExecutionPath:r,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),U.emit(K.TOOL_EXECUTION_REQUESTED,{toolId:n,traceId:e?.traceId||"",triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),nt("info",`${o?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:i}),H("info","\u5F00\u59CB\u6267\u884C\u5DE5\u5177",{toolId:n,toolName:t.name,triggerEvent:e?.triggerEvent,executionPath:r,messageKey:a});try{let c=await _d(t,e,o),d=Date.now()-s;if(c?.success){let h=ue(n),v=c?.meta?.writebackDetails||{};Gn(n,{lastStatus:"success",lastError:"",lastDurationMs:d,lastTraceId:e?.traceId||"",successCount:(h?.runtime?.successCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||O.GENERATION_ENDED,lastMessageKey:a,lastExecutionKey:l,lastSkipReason:"",lastExecutionPath:r,lastWritebackStatus:c?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:c?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!v.contentCommitted,lastHostCommitApplied:!!v.hostCommitApplied,lastRefreshRequested:!!v.refreshRequested,lastRefreshConfirmed:!!v.refreshConfirmed,lastPreferredCommitMethod:v?.commit?.preferredMethod||"",lastAppliedCommitMethod:v?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(v?.refresh?.requestMethods)?v.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(v?.refresh?.requestMethods)?[...v.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(v?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:v?.refresh?.confirmedBy||""});let k=o?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return T("success",k),nt("success",k,{duration:3200,noticeId:i}),H("info","\u5DE5\u5177\u6267\u884C\u6210\u529F",{toolId:n,traceId:e?.traceId||"",executionPath:r,duration:d,writebackStatus:c?.meta?.writebackStatus||ne.NOT_APPLICABLE}),{success:!0,duration:d,result:c}}let u=ue(n),g=c?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",p=c?.meta?.writebackDetails||{};return Gn(n,{lastStatus:"error",lastError:g,lastDurationMs:d,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||O.GENERATION_ENDED,lastMessageKey:a,lastExecutionKey:l,lastSkipReason:"",lastExecutionPath:r,lastWritebackStatus:c?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:c?.meta?.failureStage||(r===jt.MANUAL_COMPATIBILITY?Xe.COMPATIBILITY_EXECUTE:Xe.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),T("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${g}`),nt("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${g}`,{sticky:!0,noticeId:i}),H("error","\u5DE5\u5177\u6267\u884C\u5931\u8D25",{toolId:n,traceId:e?.traceId||"",executionPath:r,duration:d,error:g,failureStage:c?.meta?.failureStage||""}),{success:!1,duration:d,error:g,result:c}}catch(c){let d=Date.now()-s,u=ue(n),g=c?.message||String(c);throw Gn(n,{lastStatus:"error",lastError:g,lastDurationMs:d,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||O.GENERATION_ENDED,lastMessageKey:a,lastExecutionKey:l,lastSkipReason:"",lastExecutionPath:r,lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:r===jt.MANUAL_COMPATIBILITY?Xe.COMPATIBILITY_EXECUTE:Xe.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),T("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${g}`),nt("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${g}`,{sticky:!0,noticeId:i}),H("error","\u5DE5\u5177\u6267\u884C\u629B\u51FA\u5F02\u5E38",{toolId:n,traceId:e?.traceId||"",executionPath:r,duration:d,error:g}),c}}async function lo(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ue(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return is(t,{lastTriggerAt:Date.now(),lastTriggerEvent:"MANUAL",lastMessageKey:"",lastExecutionKey:"",lastSkipReason:N.TOOL_DISABLED,lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),nt("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await ao({triggerEvent:"MANUAL"});return H("info","\u624B\u52A8\u6267\u884C\u5DE5\u5177",{toolId:t}),Qr(e,s)}async function co(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ue(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await ao({triggerEvent:"MANUAL_PREVIEW"});return ls.previewExtraction(e,s)}function Rd(){for(let t of S.pendingTransactionTimers.values())clearTimeout(t);S.pendingTransactionTimers.clear();for(let t of S.listeners.values())typeof t=="function"&&t();S.listeners.clear();for(let t of S.internalSubscriptions)typeof t=="function"&&t();S.internalSubscriptions=[],S.activeTransactions.clear(),S.handledExecutionKeys.clear(),S.writebackGuards.clear(),S.recentTransactionHistory=[],S.recentEventTimeline=[],S.initialized=!1,S.lastExecutionContext=null,S.lastHandledMessageKey="",S.lastHandledExecutionKey="",S.lastHandledSlotRevisionKey="",S.lastAutoTriggerSnapshot=null,S.lastEventDebugSnapshot=null,S.lastDuplicateMessageKey="",S.lastDuplicateExecutionKey="",S.lastDuplicateMessageAt=0,F("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function Cd(){let t=ro(8),e=Array.from(S.activeTransactions.values()).map(Qe).filter(Boolean).sort((o,i)=>(Number(o?.updatedAt)||0)-(Number(i?.updatedAt)||0)),s=[...S.recentTransactionHistory].map(Qe).filter(Boolean),n=[...S.recentEventTimeline].map(jr).filter(Boolean);return{initialized:S.initialized,listenersCount:S.listeners.size,activeSessionCount:S.activeTransactions.size,activeSessions:e,activeTransactionCount:S.activeTransactions.size,activeTransactions:e,recentSessionHistory:s,recentTransactionHistory:s,recentEventTimeline:n,lastExecutionContext:S.lastExecutionContext,lastAutoTriggerSnapshot:S.lastAutoTriggerSnapshot,lastEventDebugSnapshot:S.lastEventDebugSnapshot,registeredEvents:Array.from(S.listeners.keys()),pendingTimerCount:S.pendingTransactionTimers.size,pendingTransactionCount:S.pendingTransactionTimers.size,lastHandledMessageKey:S.lastHandledMessageKey,lastHandledExecutionKey:S.lastHandledExecutionKey,lastHandledSlotRevisionKey:S.lastHandledSlotRevisionKey,lastDuplicateExecutionKey:S.lastDuplicateExecutionKey,writebackGuardCount:S.writebackGuards.size,handledExecutionKeyCount:S.handledExecutionKeys.size,recentHandledExecutionKeys:t,lastSlotBindingKey:S.lastExecutionContext?.slotBindingKey||"",lastSlotTransactionId:S.lastExecutionContext?.slotTransactionId||"",lastSourceMessageId:S.lastExecutionContext?.sourceMessageId||"",lastSourceSwipeId:S.lastExecutionContext?.sourceSwipeId||"",listenerSettings:Se(),eventBridge:no(),gateState:io()}}function Ks(t={}){let e=parseInt(t?.historyLimit,10),s=Number.isFinite(e)?Math.max(1,Math.min(50,e)):8,n=ro(s),o=b.gateState.lastGenerationBaseline,i=Array.from(S.activeTransactions.values()).map(Qe).filter(Boolean).sort((u,g)=>(Number(u?.updatedAt)||0)-(Number(g?.updatedAt)||0)),r=$s([...S.recentTransactionHistory],s).map(Qe),a=$s([...S.recentEventTimeline],Math.max(s*3,s)).map(jr),l={activeSessions:Pr(i),recentSessionHistory:Pr(r)},c={activeSessions:Dr(i),recentSessionHistory:Dr(r)},d=cd({summary:{listenerSettings:Se()},activeSessions:i,recentSessionHistory:r,lastEventDebugSnapshot:S.lastEventDebugSnapshot,lastAutoTriggerSnapshot:S.lastAutoTriggerSnapshot});return{summary:{generationTraceId:b.gateState.lastGenerationTraceId||"",generationType:b.gateState.lastGenerationType||"",generationDryRun:!!b.gateState.lastGenerationDryRun,generationStartedAt:o?.startedAt||0,generationEndedAt:b.gateState.lastGenerationAt||0,isGenerating:!!b.gateState.isGenerating,baselineMessageCount:o?.messageCount||0,baselineAssistantId:o?.lastAssistantMessageId||"",uiTransitionGuardActive:Ln(),uiTransitionGuardUntil:b.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:b.gateState.lastUiTransitionSource||"",activeSessionCount:S.activeTransactions.size,activeTransactionCount:S.activeTransactions.size,pendingTimerCount:S.pendingTransactionTimers.size,pendingTransactionCount:S.pendingTransactionTimers.size,lastHandledMessageKey:S.lastHandledMessageKey||"",lastHandledExecutionKey:S.lastHandledExecutionKey||"",lastHandledSlotRevisionKey:S.lastHandledSlotRevisionKey||"",lastDuplicateMessageKey:S.lastDuplicateMessageKey||"",lastDuplicateExecutionKey:S.lastDuplicateExecutionKey||"",handledExecutionKeyCount:S.handledExecutionKeys.size,recentHandledExecutionKeys:n,writebackGuardCount:S.writebackGuards.size,lastSlotBindingKey:S.lastExecutionContext?.slotBindingKey||"",lastSlotRevisionKey:S.lastExecutionContext?.slotRevisionKey||"",lastSlotTransactionId:S.lastExecutionContext?.slotTransactionId||"",lastGenerationMessageBindingSource:S.lastExecutionContext?.generationMessageBindingSource||"",lastSourceMessageId:S.lastExecutionContext?.sourceMessageId||"",lastSourceSwipeId:S.lastExecutionContext?.sourceSwipeId||"",lastConfirmedAssistantSwipeId:S.lastExecutionContext?.confirmedAssistantSwipeId||"",lastEffectiveSwipeId:S.lastExecutionContext?.effectiveSwipeId||"",lastConfirmedAssistantMessageId:S.lastExecutionContext?.confirmedAssistantMessageId||"",registeredEvents:Array.from(S.listeners.keys()),listenerSettings:Se(),eventBridge:no(),gateState:io(),phaseCounts:l,consistency:c,verdictHints:d,...Ct()},activeSessions:i,activeTransactions:i,recentSessionHistory:r,recentTransactionHistory:r,recentEventTimeline:a,recentHandledExecutionKeys:n,verdictHints:d,lastEventDebugSnapshot:Qe(S.lastEventDebugSnapshot),lastAutoTriggerSnapshot:Qe(S.lastAutoTriggerSnapshot)}}function Md(t={}){let e=Ks(t);return JSON.parse(JSON.stringify({exportedAt:Date.now(),schemaVersion:"auto-trigger-diagnostics.v1",...e}))}function Fn(t={}){let e=Ks(t),s=id(e.activeTransactions,e.recentTransactionHistory);return{summary:{generationTraceId:e.summary?.generationTraceId||"",generationType:e.summary?.generationType||"",generationDryRun:!!e.summary?.generationDryRun,isGenerating:!!e.summary?.isGenerating,activeTransactionCount:s.activeTransactionCount,pendingTransactionCount:s.pendingTransactionCount,lastHandledExecutionKey:s.lastHandledExecutionKey,lastHandledSlotRevisionKey:s.lastHandledSlotRevisionKey,handledExecutionKeyCount:s.handledExecutionKeyCount,recentHandledExecutionKeys:s.recentHandledExecutionKeys,lastExecutionContext:s.lastExecutionContext,lastEventDebugSnapshot:s.lastEventDebugSnapshot,lastAutoTriggerSnapshot:s.lastAutoTriggerSnapshot,listenerSettings:e.summary?.listenerSettings||Se(),eventBridge:e.summary?.eventBridge||no(),gateState:e.summary?.gateState||io(),phaseCounts:e.summary?.phaseCounts||{},consistency:e.summary?.consistency||{},verdictHints:e.verdictHints||e.summary?.verdictHints||[],...Ct()},activeTransactions:s.activeTransactions,recentTransactionHistory:s.recentTransactionHistory,recentEventTimeline:e.recentEventTimeline,recentHandledExecutionKeys:s.recentHandledExecutionKeys,verdictHints:e.verdictHints,lastExecutionContext:s.lastExecutionContext,lastEventDebugSnapshot:s.lastEventDebugSnapshot,lastAutoTriggerSnapshot:s.lastAutoTriggerSnapshot,compatibility:{activeSessions:e.activeSessions,recentSessionHistory:e.recentSessionHistory}}}function uo(t={}){let e=Fn(t);return JSON.parse(JSON.stringify({exportedAt:Date.now(),schemaVersion:"generation-transaction-diagnostics.v1",...e}))}async function Ji(){if(b.isInitialized){F("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316"),H("info","\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316\uFF0C\u8DF3\u8FC7\u91CD\u590D\u521D\u59CB\u5316");return}let t=je();if(!t){F("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),H("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!1,hasEventTypes:!1}),setTimeout(Ji,1e3);return}let e=await Oc(),s=e?.eventSource||Bn(),n=e?.eventTypes||Kn();if(!s){F("\u65E0\u6CD5\u83B7\u53D6SillyTavern\u4E8B\u4EF6\u6E90\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),H("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,importError:de.importError?.message||""}),setTimeout(Ji,1e3);return}H("info","\u5F00\u59CB\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,listenerSettings:Se()}),H("info","\u4F7F\u7528\u4E8B\u4EF6\u6E90",{source:e?.source||de.source||"unknown"}),Mc(),Fe(O.MESSAGE_SENT,async o=>{let r=(await so({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(a=>a.role==="user").pop();Rt({lastUserSendIntentAt:Date.now(),lastUserIntentSource:"message_sent",lastUserMessageId:o,lastUserMessageAt:Date.now(),lastUserMessageText:r?.content||b.gateState.lastUserMessageText||""}),F(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${o}`),H("info","\u8BB0\u5F55\u7528\u6237\u53D1\u9001\u610F\u56FE",{messageId:o,lastUserMessage:r?.content||""}),Ft({kind:"gate_event",eventType:O.MESSAGE_SENT,messageId:o,phase:"user_intent_recorded",detail:"message_sent"})}),Fe(O.GENERATION_STARTED,async(o,i,r)=>{let a=Date.now(),l=Wt("generation"),c=Ur(o,i||null),d=Uc(o,i||null,a),u=d.startedByUserIntent,g=d.userIntentDetectedAt,p=d.userIntentSource,h=d.userIntentDetail,v=zc({traceId:l,startedAt:a,type:o,params:i||null,rawGenerationType:c.rawGenerationType,rawGenerationParams:c.rawGenerationParams,normalizedGenerationType:c.normalizedGenerationType,generationAction:c.generationAction,generationActionSource:c.generationActionSource,explicitGenerationAction:c.explicitGenerationAction,dryRun:!!r,startedByUserIntent:u,userIntentDetectedAt:g,userIntentSource:p,userIntentDetail:h,baselineResolved:!1,provisional:!0,baselineSource:"generation_started_sync_provisional"});Rt({lastGenerationTraceId:l,lastGenerationType:c.rawGenerationType||o,lastGenerationParams:i||null,lastNormalizedGenerationType:c.normalizedGenerationType||"",lastGenerationAction:c.generationAction||"",lastGenerationActionSource:c.generationActionSource||"",lastGenerationDryRun:!!r,isGenerating:!0,lastGenerationBaseline:v}),F(`\u751F\u6210\u5F00\u59CB: ${o}`),H("info","\u6536\u5230\u751F\u6210\u5F00\u59CB\u4E8B\u4EF6",{type:o,dryRun:!!r,params:i||null,generationAction:c.generationAction,generationActionSource:c.generationActionSource,traceId:l,startedByUserIntent:u,userIntentSource:p,userIntentDetail:h,baseline:v}),Ft({kind:"generation_event",eventType:O.GENERATION_STARTED,traceId:l,phase:"generation_started",detail:c.generationAction||Zi(o,i||null),generationTraceId:l,baselineResolved:!1,generationStartedByUserIntent:u,generationUserIntentSource:p}),Lc({traceId:l,startedAt:a,type:o,params:i||null,rawGenerationType:c.rawGenerationType,rawGenerationParams:c.rawGenerationParams,normalizedGenerationType:c.normalizedGenerationType,generationAction:c.generationAction,generationActionSource:c.generationActionSource,explicitGenerationAction:c.explicitGenerationAction,dryRun:!!r,startedByUserIntent:u,userIntentDetectedAt:g,userIntentSource:p,userIntentDetail:h,baselineResolved:!0,provisional:!1,baselineResolutionAt:Date.now(),baselineSource:"generation_started_async_resolved"}).then(k=>{let $=b.gateState.lastGenerationBaseline;if(!$||$.traceId!==l){H("info","generation baseline \u5DF2\u8FC7\u671F\uFF0C\u653E\u5F03\u56DE\u586B",{traceId:l,currentTraceId:$?.traceId||""});return}Rt({lastGenerationBaseline:k}),H("info","generation baseline \u5DF2\u5B8C\u6210\u89E3\u6790",{traceId:l,baseline:k}),Ft({kind:"generation_baseline",eventType:O.GENERATION_STARTED,traceId:l,phase:"baseline_resolved",detail:k?.baselineSource||"generation_started_async_resolved",generationTraceId:l,baselineResolved:!0,generationStartedByUserIntent:k?.startedByUserIntent,generationUserIntentSource:k?.userIntentSource||""})}).catch(k=>{let $=b.gateState.lastGenerationBaseline;if(!$||$.traceId!==l)return;let L={...$,baselineResolved:!0,baselineResolutionAt:Date.now(),provisional:!1,baselineSource:"generation_started_async_failed_fallback"};Rt({lastGenerationBaseline:L}),H("warn","generation baseline \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u56DE\u9000\u5230 provisional baseline",{traceId:l,error:k?.message||String(k),baseline:L}),Ft({kind:"generation_baseline",eventType:O.GENERATION_STARTED,traceId:l,phase:"baseline_fallback",reason:"generation_baseline_async_failed",detail:k?.message||String(k),generationTraceId:l,baselineResolved:!0,generationStartedByUserIntent:L?.startedByUserIntent,generationUserIntentSource:L?.userIntentSource||""})})}),Fe(O.GENERATION_ENDED,()=>{Rt({lastGenerationAt:Date.now(),isGenerating:!1}),F("\u751F\u6210\u7ED3\u675F"),H("info","\u6536\u5230\u751F\u6210\u7ED3\u675F\u4E8B\u4EF6"),Ft({kind:"generation_event",eventType:O.GENERATION_ENDED,traceId:b.gateState.lastGenerationTraceId||"",phase:"generation_ended",generationTraceId:b.gateState.lastGenerationTraceId||"",detail:b.gateState.lastGenerationAction||b.gateState.lastNormalizedGenerationType||""})}),Fe(O.CHAT_CHANGED,o=>{Mr(O.CHAT_CHANGED),kr("chat_changed"),H("info","\u6536\u5230\u804A\u5929\u5207\u6362\u4E8B\u4EF6",{data:o??null}),Ft({kind:"ui_guard",eventType:O.CHAT_CHANGED,phase:"ui_transition_guard_entered",detail:"chat_changed"})}),Fe(O.CHAT_CREATED,o=>{Mr(O.CHAT_CREATED),kr("chat_created"),H("info","\u6536\u5230\u804A\u5929\u521B\u5EFA\u4E8B\u4EF6",{data:o??null}),Ft({kind:"ui_guard",eventType:O.CHAT_CREATED,phase:"ui_transition_guard_entered",detail:"chat_created"})}),Xr(),b.isInitialized=!0,F("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210"),H("info","\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210",{listenerSettings:Se()})}function kd(t){b.debugMode=t}var O,b,Tc,de,N,jt,X,Gr,Ic,Rr,wc,_c,Ec,Cr,Ac,kn,S,po=J(()=>{we();Ms();rs();Yi();it();O={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_SWIPED:"MESSAGE_SWIPED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},b={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastNormalizedGenerationType:"",lastGenerationAction:"",lastGenerationActionSource:"",lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""},isInitialized:!1,debugMode:!1},Tc="/script.js",de={eventSource:null,eventTypes:null,source:"",scriptModule:null,loadingPromise:null,importError:null},N={LISTENER_DISABLED:"listener_disabled",QUIET_GENERATION:"quiet_generation",DRY_RUN_GENERATION:"dry_run_generation",IGNORED_AUTO_TRIGGER:"ignored_auto_trigger",UNRELATED_UI_EVENT:"ui_side_effect_event",WRITEBACK_ECHO_EVENT:"writeback_echo_event",SLOT_EVENT_OUTSIDE_WINDOW:"slot_event_outside_window",SPECULATIVE_FALLBACK_WITHOUT_MESSAGE:"speculative_generation_after_commands",NO_CONFIRMED_ASSISTANT_MESSAGE:"no_confirmed_assistant_message",HISTORICAL_REPLAY_MESSAGE_RECEIVED:"historical_replay_message_received",MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION:"message_received_outside_active_generation",NON_ASSISTANT_MESSAGE:"non_assistant_message",MISSING_AI_MESSAGE:"missing_ai_message",DUPLICATE_MESSAGE:"duplicate_message",NO_ELIGIBLE_TOOLS:"no_eligible_tools",TOOL_DISABLED:"tool_disabled"},jt={AUTO_POST_RESPONSE_API:"auto_post_response_api",MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"},X={RECEIVED:"received",SCHEDULED:"scheduled",DISPATCHING:"dispatching",HANDLING:"handling",COMPLETED:"completed",SKIPPED:"skipped",IGNORED:"ignored"},Gr=15e3,Ic=1500,Rr=1800,wc=6e4,_c=12e3,Ec=2500,Cr=new Set(["reroll","regenerate","swipe"]),Ac=["type","action","name","mode","source","reason","kind","command","operation","event","trigger","generationType","generation_type","regenType","regen_type"],kn=null;S={initialized:!1,listeners:new Map,activeTransactions:new Map,handledExecutionKeys:new Map,writebackGuards:new Map,recentTransactionHistory:[],recentEventTimeline:[],lastExecutionContext:null,lastHandledMessageKey:"",lastHandledExecutionKey:"",lastHandledSlotRevisionKey:"",pendingTransactionTimers:new Map,lastAutoTriggerSnapshot:null,lastEventDebugSnapshot:null,lastDuplicateMessageKey:"",lastDuplicateExecutionKey:"",lastDuplicateMessageAt:0,internalSubscriptions:[]}});var ta={};fe(ta,{TOOL_CONFIG_PANEL_STYLES:()=>ea,createToolConfigPanel:()=>Mt,default:()=>Pd});function Mt(t){let{id:e,toolId:s,postResponseHint:n,extractionPlaceholder:o,previewDialogId:i,previewTitle:r="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let a=ue(this.toolId);if(!a)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=a.output?.apiPreset||a.apiPreset||"",d=this._getBypassPresets(),u=a.output?.mode||"follow_ai",g=a.bypass?.enabled||!1,p=a.bypass?.presetId||"",h=a.runtime?.lastStatus||"idle",v=a.runtime?.lastRunAt?new Date(a.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",k=a.runtime?.lastError||"",$=a.extraction||{},L=Array.isArray($.selectors)?$.selectors.join(`
`):"",E=u==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",I=Ks({historyLimit:8}),y=Fn({historyLimit:8}),B=this._buildDiagnosticsHtml(a.runtime||{},I,y),M=u==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",C=c||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${_(a.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${_(a.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${_(M)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${_(C)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${_(h)}</span>
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
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${E}</div>
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
                ${l.map(P=>`
                  <option value="${_(P.name)}" ${P.name===c?"selected":""}>
                    ${_(P.name)}
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
                ${d.map(P=>`
                  <option value="${_(P.id)}" ${P.id===p?"selected":""}>
                    ${_(P.name)}${P.isDefault?" [\u9ED8\u8BA4]":""}
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
                        placeholder="${_(o)}">${_(L)}</textarea>
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
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${_(a.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${_(h)}">${_(h)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${_(v)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${a.runtime?.successCount||0} / ${a.runtime?.errorCount||0}</span>
                </div>
                ${k?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${_(k)}</span>
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

          ${B}
        </div>
      `},_formatDiagnosticValue(a,l="\u672A\u8BB0\u5F55"){let c=String(a||"").trim();return _(c||l)},_formatDiagnosticTime(a){let l=Number(a)||0;return l>0?new Date(l).toLocaleString():"\u672A\u8BB0\u5F55"},_formatSkipReason(a){return{listener_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u81EA\u52A8\u76D1\u542C\u5DF2\u5173\u95ED",quiet_generation:"\u5DF2\u8DF3\u8FC7\uFF1Aquiet / dryRun \u751F\u6210",dry_run_generation:"\u5DF2\u8DF3\u8FC7\uFF1A\u5F53\u524D generation \u4E3A dryRun",ignored_auto_trigger:"\u5DF2\u8DF3\u8FC7\uFF1A\u76D1\u542C\u5668\u8BBE\u7F6E\u5FFD\u7565\u4E86\u975E\u7528\u6237\u610F\u56FE\u751F\u6210",ui_side_effect_event:"\u5DF2\u5FFD\u7565\uFF1A\u5BBF\u4E3B UI \u526F\u4F5C\u7528\u4E8B\u4EF6",writeback_echo_event:"\u5DF2\u5FFD\u7565\uFF1A\u672C\u6B21 MESSAGE_UPDATED \u6765\u81EA\u5DE5\u5177\u5199\u56DE\u56DE\u54CD",slot_event_outside_window:"\u5DF2\u5FFD\u7565\uFF1A\u697C\u5C42\u4E8B\u4EF6\u4E0D\u5728\u6700\u8FD1 generation / \u7528\u6237\u610F\u56FE\u7A97\u53E3\u5185",speculative_generation_after_commands:"\u5DF2\u5FFD\u7565\uFF1A\u4EC5\u8BB0\u5F55 GENERATION_AFTER_COMMANDS \u89C2\u5BDF\u6001 session",no_confirmed_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u786E\u8BA4\u5230\u5F53\u524D\u697C\u5C42 / \u5F53\u524D swipe \u7684\u53EF\u5904\u7406 assistant \u72B6\u6001",historical_replay_message_received:"\u5DF2\u62E6\u622A\uFF1A\u5386\u53F2 assistant \u6D88\u606F\u91CD\u653E\u4E8B\u4EF6",message_received_outside_active_generation:"\u5DF2\u62E6\u622A\uFF1AMESSAGE_RECEIVED \u4E0D\u5C5E\u4E8E\u5F53\u524D\u751F\u6210\u7A97\u53E3",non_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u7684\u5E76\u975E AI \u697C\u5C42",missing_ai_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D",duplicate_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD",no_eligible_tools:"\u5DF2\u8DF3\u8FC7\uFF1A\u6CA1\u6709\u547D\u4E2D\u53EF\u6267\u884C\u5DE5\u5177",tool_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u5DE5\u5177\u672A\u542F\u7528",generation_after_commands_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AGENERATION_AFTER_COMMANDS \u515C\u5E95\u5DF2\u5173\u95ED",message_received_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AMESSAGE_RECEIVED \u515C\u5E95\u5DF2\u5173\u95ED"}[a]||a||"\u65E0"},_formatExecutionPath(a){return{auto_post_response_api:"\u81EA\u52A8\u94FE\uFF1Apost_response_api",manual_post_response_api:"\u624B\u52A8\u94FE\uFF1Apost_response_api",manual_compatibility:"\u624B\u52A8\u94FE\uFF1Acompatibility \u56DE\u9000"}[a]||a||"\u672A\u8BB0\u5F55"},_formatCommitMethod(a){return{setChatMessages:"setChatMessages",setChatMessage:"setChatMessage",local_only:"local_only",none:"none"}[a]||a||"\u672A\u8BB0\u5F55"},_formatWritebackStatus(a){return{success:"\u5199\u56DE\u6210\u529F",failed:"\u5199\u56DE\u5931\u8D25",skipped_empty_output:"\u65E0\u8F93\u51FA\uFF0C\u8DF3\u8FC7\u5199\u56DE",not_applicable:"\u4E0D\u9002\u7528"}[a]||a||"\u672A\u8BB0\u5F55"},_formatFailureStage(a){return{build_messages:"\u6784\u9020\u8BF7\u6C42\u6D88\u606F",send_api_request:"\u53D1\u9001 API \u8BF7\u6C42",extract_output:"\u63D0\u53D6\u5DE5\u5177\u8F93\u51FA",inject_context:"\u5199\u56DE\u4E0A\u4E0B\u6587",compatibility_execute:"\u517C\u5BB9\u6267\u884C\u5165\u53E3",unknown:"\u672A\u77E5\u9636\u6BB5"}[a]||a||"\u65E0"},_formatBooleanState(a){return a?"\u662F":"\u5426"},_formatHandledExecutionKeysText(a=[]){let l=Array.isArray(a)?a.filter(Boolean):[];return l.length?l.slice(-3).map(c=>String(c?.executionKey||"").trim()||"\u672A\u8BB0\u5F55").join(" / "):"\u65E0"},_formatHistoryTime(a){return this._formatDiagnosticTime(a)},_formatPhaseCountsText(a={}){let l=Object.entries(a||{}).filter(([,c])=>Number(c)>0);return l.length?l.map(([c,d])=>`${c}:${d}`).join(" / "):"\u65E0"},_formatEventBridgeText(a={}){if(!a||a.ready!==!0)return"\u672A\u5C31\u7EEA";let l=String(a.source||"").trim();return l?`\u5DF2\u5C31\u7EEA\uFF08${l}\uFF09`:"\u5DF2\u5C31\u7EEA"},_formatVerdictHintLabel(a=""){return{a10BaselineRaceSuspicious:"A10 baseline",a11ReplaySuspicious:"A11 replay",a12UserIntentSuspicious:"A12 user intent",a13AutoTriggerLeakSuspicious:"A13 auto trigger"}[a]||a||"\u672A\u77E5\u9879"},_buildVerdictHintsHtml(a={}){let l=Object.entries(a||{});return l.length?`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">N1 \u5FEB\u901F\u5224\u8BFB</div>
          <div class="yyt-tool-debug-chip-list">
            ${l.map(([c,d])=>{let u=!!d?.flagged,g=Array.isArray(d?.reasons)?d.reasons.filter(Boolean):[],p=g.length?_(g.join(" | ")):"\u672A\u89C1\u660E\u663E\u53EF\u7591\u4FE1\u53F7";return`
                <span class="yyt-tool-debug-chip ${u?"yyt-tool-debug-chip-warning":"yyt-tool-debug-chip-ok"}" title="${p}">
                  ${_(this._formatVerdictHintLabel(c))}
                  <strong>${u?"\u53EF\u7591":"\u6B63\u5E38"}</strong>
                </span>
              `}).join("")}
          </div>
        </div>
      `:""},_buildTimelineSection(a,l=[]){let c=Array.isArray(l)?l.filter(Boolean).slice().reverse():[];if(!c.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${_(a)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let d=c.map(u=>{let g=this._formatDiagnosticValue(u.eventType||u.kind,"\u672A\u8BB0\u5F55"),p=this._formatDiagnosticValue(u.traceId,"\u65E0"),h=this._formatDiagnosticValue(u.sessionKey,"\u65E0"),v=[u.phase?`\u9636\u6BB5\uFF1A${u.phase}`:"",u.messageId?`\u6D88\u606F\uFF1A${u.messageId}`:"",u.executionKey?`execution\uFF1A${u.executionKey}`:"",u.confirmationSource?`\u786E\u8BA4\uFF1A${u.confirmationSource}`:"",u.reason?`\u539F\u56E0\uFF1A${this._formatSkipReason(u.reason)}`:"",u.detail?`\u8BE6\u60C5\uFF1A${u.detail}`:""].filter(Boolean);return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${_(this._formatHistoryTime(u.at))}</span>
              <span>${g}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              trace\uFF1A${p}<br>
              session\uFF1A${h}<br>
              ${_(v.join(" / ")||"\u65E0\u9644\u52A0\u8BE6\u60C5")}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${_(a)}</div>
          <div class="yyt-tool-debug-history-list">${d}</div>
        </div>
      `},_copyText(a){let l=String(a||"");if(!l)return!1;try{if(navigator?.clipboard?.writeText)return navigator.clipboard.writeText(l),!0}catch{}try{let c=document.createElement("textarea");c.value=l,c.setAttribute("readonly","readonly"),c.style.position="fixed",c.style.opacity="0",document.body.appendChild(c),c.select();let d=document.execCommand("copy");return document.body.removeChild(c),d}catch{return!1}},_copyGenerationTransactionDiagnostics(){try{let a=uo({historyLimit:8});this._copyText(JSON.stringify(a,null,2))?T("success","\u4E8B\u52A1\u8BCA\u65AD\u5DF2\u590D\u5236"):T("warning","\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u5728\u63A7\u5236\u53F0\u5BFC\u51FA")}catch(a){T("error",a?.message||"\u5BFC\u51FA\u4E8B\u52A1\u8BCA\u65AD\u5931\u8D25")}},_buildHistorySection(a,l=[],c="trigger"){let d=Array.isArray(l)?l.filter(Boolean).slice().reverse():[];if(!d.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${_(a)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let u=d.map(g=>{let p=this._formatDiagnosticValue(g.eventType,"\u672A\u8BB0\u5F55"),h=this._formatDiagnosticValue(g.messageKey||g.messageId,"\u672A\u8BB0\u5F55"),v=this._formatDiagnosticValue(g.traceId,"\u65E0"),k=this._formatDiagnosticValue(g.executionKey,"\u65E0"),$=c==="writeback"?`\u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(g.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(g.writebackStatus)} / \u5185\u5BB9\u63D0\u4EA4\uFF1A${this._formatBooleanState(g.contentCommitted)} / \u5BBF\u4E3B\u63D0\u4EA4\uFF1A${this._formatBooleanState(g.hostCommitApplied)} / \u4E3B\u63D0\u4EA4\uFF1A${this._formatCommitMethod(g.preferredCommitMethod)} / \u5B9E\u9645\u63D0\u4EA4\uFF1A${this._formatCommitMethod(g.appliedCommitMethod)} / \u5237\u65B0\u8BF7\u6C42\uFF1A${this._formatBooleanState(g.refreshRequested)} / \u5237\u65B0\u786E\u8BA4\uFF1A${this._formatBooleanState(g.refreshConfirmed)} / \u5237\u65B0\u901A\u9053\uFF1A${Array.isArray(g.refreshMethods)&&g.refreshMethods.length?g.refreshMethods.join(", "):g.refreshMethodCount??0} / \u786E\u8BA4\u8F6E\u6570\uFF1A${g.refreshConfirmChecks??0} / \u786E\u8BA4\u6765\u6E90\uFF1A${this._formatDiagnosticValue(g.refreshConfirmedBy,"\u65E0")} / \u5931\u8D25\u9636\u6BB5\uFF1A${this._formatFailureStage(g.failureStage)}`:`\u8DF3\u8FC7\u539F\u56E0\uFF1A${this._formatSkipReason(g.skipReason)} / \u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(g.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(g.writebackStatus)}`;return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${_(this._formatHistoryTime(g.at))}</span>
              <span>trace ${v}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              \u4E8B\u4EF6\uFF1A${p}<br>
              \u6D88\u606F\uFF1A${h}<br>
              execution\uFF1A${k}<br>
              ${_($)}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${_(a)}</div>
          <div class="yyt-tool-debug-history-list">${u}</div>
        </div>
      `},_buildDiagnosticsHtml(a,l=null,c=null){let d=a||{},u=l||null,g=c||null,p=g||u||null,h=p?.summary||{},v=p?.lastEventDebugSnapshot||{},k=p?.lastAutoTriggerSnapshot||{},$=Array.isArray(g?.activeTransactions)?g.activeTransactions:[],L=Array.isArray(g?.recentTransactionHistory)?g.recentTransactionHistory:[],E=Array.isArray(u?.activeSessions)?u.activeSessions:[],I=Array.isArray(u?.recentSessionHistory)?u.recentSessionHistory:[],y=Array.isArray(p?.recentEventTimeline)?p.recentEventTimeline:[],B=!!($.length>0||L.length>0||E.length>0||I.length>0||y.length>0||h?.activeTransactionCount||h?.pendingTransactionCount||h?.activeSessionCount||h?.pendingTimerCount||h?.lastHandledMessageKey||h?.lastHandledExecutionKey||h?.handledExecutionKeyCount||h?.eventBridge?.ready);if(!!!(d.lastTriggerAt||d.lastTriggerEvent||d.lastMessageKey||d.lastExecutionKey||d.lastSkipReason||d.lastExecutionPath||d.lastWritebackStatus||d.lastFailureStage||d.lastContentCommitted||d.lastHostCommitApplied||d.lastRefreshRequested||d.lastRefreshConfirmed||d.lastTraceId||Array.isArray(d.recentTriggerHistory)&&d.recentTriggerHistory.length>0||Array.isArray(d.recentWritebackHistory)&&d.recentWritebackHistory.length>0||B))return"";let C=[["\u6700\u8FD1\u89E6\u53D1\u65F6\u95F4",this._formatDiagnosticTime(d.lastTriggerAt)],["\u6700\u8FD1\u89E6\u53D1\u4E8B\u4EF6",this._formatDiagnosticValue(d.lastTriggerEvent)],["\u6700\u8FD1 Trace",this._formatDiagnosticValue(d.lastTraceId,"\u65E0")],["\u6700\u8FD1\u6D88\u606F\u952E",this._formatDiagnosticValue(d.lastMessageKey)],["\u6700\u8FD1 execution key",this._formatDiagnosticValue(d.lastExecutionKey)],["\u6700\u8FD1 slot binding",this._formatDiagnosticValue(d.lastSlotBindingKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 slot revision",this._formatDiagnosticValue(d.lastSlotRevisionKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 slot transaction",this._formatDiagnosticValue(d.lastSlotTransactionId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 sourceMessageId",this._formatDiagnosticValue(d.lastSourceMessageId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 sourceSwipeId",this._formatDiagnosticValue(d.lastSourceSwipeId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u8DF3\u8FC7\u539F\u56E0",this._formatDiagnosticValue(this._formatSkipReason(d.lastSkipReason),"\u65E0")],["\u6700\u8FD1\u6267\u884C\u8DEF\u5F84",this._formatDiagnosticValue(this._formatExecutionPath(d.lastExecutionPath))],["\u6700\u8FD1\u5199\u56DE\u72B6\u6001",this._formatDiagnosticValue(this._formatWritebackStatus(d.lastWritebackStatus))],["\u6700\u8FD1\u5931\u8D25\u9636\u6BB5",this._formatDiagnosticValue(this._formatFailureStage(d.lastFailureStage),"\u65E0")],["\u6700\u8FD1\u5185\u5BB9\u63D0\u4EA4",this._formatDiagnosticValue(this._formatBooleanState(d.lastContentCommitted),"\u5426")],["\u6700\u8FD1\u5BBF\u4E3B\u63D0\u4EA4",this._formatDiagnosticValue(this._formatBooleanState(d.lastHostCommitApplied),"\u5426")],["\u6700\u8FD1\u4E3B\u63D0\u4EA4\u7B56\u7565",this._formatDiagnosticValue(this._formatCommitMethod(d.lastPreferredCommitMethod),"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5B9E\u9645\u63D0\u4EA4\u7B56\u7565",this._formatDiagnosticValue(this._formatCommitMethod(d.lastAppliedCommitMethod),"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5237\u65B0\u8BF7\u6C42",this._formatDiagnosticValue(this._formatBooleanState(d.lastRefreshRequested),"\u5426")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4",this._formatDiagnosticValue(this._formatBooleanState(d.lastRefreshConfirmed),"\u5426")],["\u6700\u8FD1\u5237\u65B0\u901A\u9053",this._formatDiagnosticValue(Array.isArray(d.lastRefreshMethods)&&d.lastRefreshMethods.length?d.lastRefreshMethods.join(", "):String(d.lastRefreshMethodCount??0),"0")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4\u8F6E\u6570",this._formatDiagnosticValue(String(d.lastRefreshConfirmChecks??0),"0")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4\u6765\u6E90",this._formatDiagnosticValue(d.lastRefreshConfirmedBy,"\u65E0")]],P=this._buildHistorySection("\u6700\u8FD1\u89E6\u53D1\u5386\u53F2",d.recentTriggerHistory||[],"trigger"),w=this._buildHistorySection("\u6700\u8FD1\u5199\u56DE\u5386\u53F2",d.recentWritebackHistory||[],"writeback"),G=B?[["\u5F53\u524D active / timers",`${h.activeTransactionCount||h.activeSessionCount||0} / ${h.pendingTransactionCount||h.pendingTimerCount||0}`],["\u4E8B\u4EF6\u6865\u63A5",this._formatEventBridgeText(h.eventBridge)],["\u5F53\u524D generation \u52A8\u4F5C",this._formatDiagnosticValue(h.generationAction,"\u672A\u8BB0\u5F55")],["\u5F53\u524D\u539F\u59CB generation type",this._formatDiagnosticValue(h.rawGenerationType,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 slot binding",this._formatDiagnosticValue(h.lastSlotBindingKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 slot revision",this._formatDiagnosticValue(h.lastSlotRevisionKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 slot transaction",this._formatDiagnosticValue(h.lastSlotTransactionId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5DF2\u5904\u7406 slot revision",this._formatDiagnosticValue(h.lastHandledSlotRevisionKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u697C\u5C42\u7ED1\u5B9A\u6765\u6E90",this._formatDiagnosticValue(h.lastGenerationMessageBindingSource,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 sourceMessageId",this._formatDiagnosticValue(h.lastSourceMessageId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 sourceSwipeId",this._formatDiagnosticValue(h.lastSourceSwipeId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u786E\u8BA4\u697C\u5C42",this._formatDiagnosticValue(h.lastConfirmedAssistantMessageId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u786E\u8BA4 swipe",this._formatDiagnosticValue(h.lastConfirmedAssistantSwipeId,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1 effective swipe",this._formatDiagnosticValue(h.lastEffectiveSwipeId,"\u672A\u8BB0\u5F55")],["\u5199\u56DE\u5B88\u536B\u6570",this._formatDiagnosticValue(String(h.writebackGuardCount??0),"0")],["\u6700\u8FD1\u786E\u8BA4\u6A21\u5F0F",this._formatDiagnosticValue(v.confirmationMode||k.confirmationMode,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u540C\u697C\u5C42 revision",this._formatDiagnosticValue(v.sameSlotRevisionConfirmed?`\u5DF2\u786E\u8BA4 (${v.sameSlotRevisionSource||"same_slot_revision"})`:v.sameSlotRevisionCandidate?`\u5019\u9009 (${v.sameSlotRevisionSource||"\u5F85\u786E\u8BA4"})`:"\u5426","\u5426")],["\u6700\u8FD1\u5904\u7406\u6D88\u606F\u952E",this._formatDiagnosticValue(h.lastHandledMessageKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5904\u7406 execution key",this._formatDiagnosticValue(h.lastHandledExecutionKey,"\u672A\u8BB0\u5F55")],["\u5DF2\u5904\u7406 execution key \u6570",this._formatDiagnosticValue(String(h.handledExecutionKeyCount??0),"0")],["\u6700\u8FD1 execution key \u8F68\u8FF9",this._formatDiagnosticValue(this._formatHandledExecutionKeysText(h.recentHandledExecutionKeys),"\u65E0")],["Active phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(h.phaseCounts?.activeSessions),"\u65E0")],["History phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(h.phaseCounts?.recentSessionHistory),"\u65E0")]]:[],re=g?[["\u5F53\u524D transaction / pending",`${h.activeTransactionCount||0} / ${h.pendingTransactionCount||0}`],["\u6700\u8FD1\u4E8B\u52A1 execution key",this._formatDiagnosticValue(h.lastHandledExecutionKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u4E8B\u52A1 slot revision",this._formatDiagnosticValue(h.lastHandledSlotRevisionKey,"\u672A\u8BB0\u5F55")],["\u4E8B\u52A1\u89C6\u56FE active / history",`${$.length} / ${L.length}`]]:[],me=B?this._buildVerdictHintsHtml(p?.verdictHints||h?.verdictHints||{}):"",he=g?this._buildTimelineSection("\u6700\u8FD1\u4E8B\u52A1\u5386\u53F2",L.slice(-6)):"",Me=B?this._buildTimelineSection("\u6700\u8FD1\u81EA\u52A8\u89E6\u53D1\u65F6\u95F4\u7EBF",y.slice(-6)):"";return`
        <details class="yyt-tool-debug-panel">
          <summary class="yyt-tool-debug-summary">\u6700\u8FD1\u89E6\u53D1\u8BCA\u65AD</summary>
          <div class="yyt-tool-debug-content">
            ${C.map(([ve,Te])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${ve}</span>
                <span class="yyt-tool-runtime-value">${Te}</span>
              </div>
            `).join("")}
            ${G.map(([ve,Te])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${ve}</span>
                <span class="yyt-tool-runtime-value">${Te}</span>
              </div>
            `).join("")}
            ${re.map(([ve,Te])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${ve}</span>
                <span class="yyt-tool-runtime-value">${Te}</span>
              </div>
            `).join("")}
            <div class="yyt-tool-debug-actions">
              <button class="yyt-btn yyt-btn-secondary yyt-btn-small" id="${m}-tool-copy-auto-trigger-diagnostics">
                <i class="fa-solid fa-copy"></i> \u590D\u5236\u4E8B\u52A1\u8BCA\u65AD JSON
              </button>
            </div>
            ${me}
            ${P}
            ${w}
            ${he}
            ${Me}
          </div>
        </details>
      `},_getApiPresets(){try{return Qt()||[]}catch{return[]}},_getBypassPresets(){try{return Li()||[]}catch{return[]}},_getFormData(a){let l=ue(this.toolId),c=a.find(`#${m}-tool-output-mode`).val()||"follow_ai",d=a.find(`#${m}-tool-bypass-enabled`).is(":checked"),u=c==="post_response_api",g=(a.find(`#${m}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(p=>p.trim()).filter(Boolean);return{enabled:l?.enabled!==!1,promptTemplate:a.find(`#${m}-tool-prompt-template`).val()||"",apiPreset:a.find(`#${m}-tool-api-preset`).val()||"",extractTags:g,trigger:{event:"GENERATION_ENDED",enabled:u},output:{mode:c,apiPreset:a.find(`#${m}-tool-api-preset`).val()||"",overwrite:!0,enabled:u},bypass:{enabled:d,presetId:d&&a.find(`#${m}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(a.find(`#${m}-tool-max-messages`).val(),10)||5),selectors:g}}},_showExtractionPreview(a,l){if(!Z())return;let d=`${m}-${i}`,u=Array.isArray(l.messageEntries)?l.messageEntries:[],g=u.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${u.map(p=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${p.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${_(p.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${_(p.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${_(p.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";a.append(si({id:d,title:r,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${_((l.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${l.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${_(l.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${_(l.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${_(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${g}
        `})),ni(a,d,{onSave:p=>p()}),a.find(`#${d}-save`).text("\u5173\u95ED"),a.find(`#${d}-cancel`).remove()},bindEvents(a){let l=Z();!l||!te(a)||(a.find(`#${m}-tool-output-mode`).on("change",()=>{let d=(a.find(`#${m}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";a.find(".yyt-tool-mode-hint").text(d)}),a.find(`#${m}-tool-bypass-enabled`).on("change",c=>{let d=l(c.currentTarget).is(":checked");a.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!d)}),a.find(`#${m}-tool-save, #${m}-tool-save-top`).on("click",()=>{this._saveConfig(a,{silent:!1})}),a.find(`#${m}-tool-reset-template`).on("click",()=>{let c=mn(this.toolId);c?.promptTemplate&&(a.find(`#${m}-tool-prompt-template`).val(c.promptTemplate),T("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),a.find(`#${m}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let d=await lo(this.toolId);!d?.success&&d?.error&&nt("warning",d.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(d){T("error",d?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(a)}}),a.find(`#${m}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let d=await co(this.toolId);if(!d?.success){T("error",d?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(a,d)}catch(d){T("error",d?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),a.find(`#${m}-tool-copy-auto-trigger-diagnostics`).on("click",()=>{this._copyGenerationTransactionDiagnostics()}))},_saveConfig(a,l={}){let c=this._getFormData(a),{silent:d=!1}=l,u=ct(this.toolId,c);return u?d||T("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):T("error","\u4FDD\u5B58\u5931\u8D25"),u},destroy(a){!Z()||!te(a)||a.find("*").off()},getStyles(){return ea},renderTo(a){a.html(this.render({})),this.bindEvents(a,{})}}}var ea,Pd,Us=J(()=>{it();rs();en();Rs();po();ea=`
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
`;Pd=Mt});var Ze,yo=J(()=>{Us();Ze=Mt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var et,go=J(()=>{Us();et=Mt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var tt,fo=J(()=>{Us();tt=Mt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var Vt,mo=J(()=>{we();Rs();it();Vt={id:"bypassPanel",render(t){let e=Y.getPresetList(),s=Y.getDefaultPresetId();return`
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
      `;let e=Y.getDefaultPresetId()===t.id,s=mt&&mt[t.id];return`
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
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(s.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let n=e(s.currentTarget).data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=Y.deletePreset(n);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),T("success","\u9884\u8BBE\u5DF2\u5220\u9664")):T("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let n=e(s.currentTarget).closest(".yyt-bypass-message"),o=n.data("messageId");n.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let o=await yt(n),i=Y.importPresets(o);T(i.success?"success":"error",i.message),i.success&&this.renderTo(t)}catch(o){T("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=Y.exportPresets();pt(s,`bypass_presets_${Date.now()}.json`),T("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){T("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let n=Y.getPreset(s);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(n)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,n=Y.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,s),T("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):T("error",n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),n=s.data("presetId");if(!n)return;let o=s.find(".yyt-bypass-name-input").val().trim(),i=s.find("#yyt-bypass-description").val().trim();if(!o){T("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let r=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);r.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=Y.updatePreset(n,{name:o,description:i,messages:r});a.success?(T("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):T("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=Y.deletePreset(n);o.success?(this.renderTo(t),T("success","\u9884\u8BBE\u5DF2\u5220\u9664")):T("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let o=`bypass_${Date.now()}`,i=Y.duplicatePreset(n,o);i.success?(this.renderTo(t),this._selectPreset(t,e,o),T("success","\u9884\u8BBE\u5DF2\u590D\u5236")):T("error",i?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");n&&(Y.setDefaultPresetId(n),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),T("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(n))},_refreshPresetList(t,e){let s=Y.getPresetList(),n=Y.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(o=>this._renderPresetItem(o,o.id===n)).join(""))},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var ia={};fe(ia,{SettingsPanel:()=>St,THEME_CONFIGS:()=>ho,applyTheme:()=>na,applyUiPreferences:()=>bo,default:()=>Gd});function Ls(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function sa(t=Ls()){return t?.documentElement||document.documentElement}function na(t,e=Ls()){let s=sa(e),n={...Dd,...ho[t]||ho["dark-blue"]};Object.entries(n).forEach(([o,i])=>{s.style.setProperty(o,i)}),s.setAttribute("data-yyt-theme",t)}function bo(t={},e=Ls()){let s=sa(e),{theme:n="dark-blue",compactMode:o=!1,animationEnabled:i=!0}=t||{};na(n,e),s.classList.toggle("yyt-compact-mode",!!o),s.classList.toggle("yyt-no-animation",!i)}var Dd,ho,St,Gd,jn=J(()=>{we();Ms();it();Dd={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},ho={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};St={id:"settingsPanel",render(t){let e=Ue.getSettings(),s=e.listener?.listenGenerationEnded!==!1,n=e.debug?.enableDebugLog===!0;return`
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
    `},bindEvents(t,e){let s=Z();!s||!te(t)||(t.find(".yyt-settings-tab").on("click",n=>{let o=s(n.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(n.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${o}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ue.resetSettings(),bo(Cs.ui,Ls()),this.renderTo(t),T("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300,useGenerationAfterCommandsFallback:t.find("#yyt-setting-useGenerationAfterCommandsFallback").is(":checked"),useMessageReceivedFallback:t.find("#yyt-setting-useMessageReceivedFallback").is(":checked"),messageSessionWindowMs:parseInt(t.find("#yyt-setting-messageSessionWindowMs").val())||1800,historyRetentionLimit:parseInt(t.find("#yyt-setting-historyRetentionLimit").val())||10},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ue.saveSettings(s),bo(s.ui,Ls()),T("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!Z()||!te(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Gd=St});var ua={};fe(ua,{ApiPresetPanel:()=>Ye,BypassPanel:()=>Vt,RegexExtractPanel:()=>Ve,SCRIPT_ID:()=>m,SettingsPanel:()=>St,StatusBlockPanel:()=>et,SummaryToolPanel:()=>Ze,ToolManagePanel:()=>qe,UIManager:()=>bs,YouyouReviewPanel:()=>tt,bindDialogEvents:()=>ni,createDialogHtml:()=>si,default:()=>$d,downloadJson:()=>pt,escapeHtml:()=>_,fillFormWithConfig:()=>Dt,getAllStyles:()=>da,getFormApiConfig:()=>It,getJQuery:()=>Z,initUI:()=>zs,isContainerValid:()=>te,readFileContent:()=>yt,registerComponents:()=>fs,renderApiPanel:()=>Wn,renderBypassPanel:()=>la,renderRegexPanel:()=>Yn,renderSettingsPanel:()=>ca,renderStatusBlockPanel:()=>ra,renderSummaryToolPanel:()=>oa,renderToolPanel:()=>Vn,renderYouyouReviewPanel:()=>aa,resetJQueryCache:()=>La,showToast:()=>T,showTopNotice:()=>nt,uiManager:()=>pe});function fs(){pe.register(Ye.id,Ye),pe.register(Ve.id,Ve),pe.register(qe.id,qe),pe.register(Ze.id,Ze),pe.register(et.id,et),pe.register(tt.id,tt),pe.register(Vt.id,Vt),pe.register(St.id,St),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function zs(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...n}=t;pe.init(n),fs(),e&&pe.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function kt(t,e,s={}){pe.render(t,e,s)}function Wn(t){kt(Ye.id,t)}function Yn(t){kt(Ve.id,t)}function Vn(t){kt(qe.id,t)}function oa(t){kt(Ze.id,t)}function ra(t){kt(et.id,t)}function aa(t){kt(tt.id,t)}function la(t){kt(Vt.id,t)}function ca(t){kt(St.id,t)}function da(){return pe.getAllStyles()}var $d,So=J(()=>{ii();bi();_i();Ki();yo();go();fo();mo();jn();it();ii();bi();_i();Ki();yo();go();fo();mo();jn();$d={uiManager:pe,ApiPresetPanel:Ye,RegexExtractPanel:Ve,ToolManagePanel:qe,SummaryToolPanel:Ze,StatusBlockPanel:et,YouyouReviewPanel:tt,BypassPanel:Vt,SettingsPanel:St,registerComponents:fs,initUI:zs,renderApiPanel:Wn,renderRegexPanel:Yn,renderToolPanel:Vn,renderSummaryToolPanel:oa,renderStatusBlockPanel:ra,renderYouyouReviewPanel:aa,renderBypassPanel:la,renderSettingsPanel:ca,getAllStyles:da}});var va={};fe(va,{ApiPresetPanel:()=>Ye,RegexExtractPanel:()=>Ve,SCRIPT_ID:()=>m,StatusBlockPanel:()=>et,SummaryToolPanel:()=>Ze,ToolManagePanel:()=>qe,YouyouReviewPanel:()=>tt,default:()=>Od,escapeHtml:()=>_,fillFormWithConfig:()=>Dt,getCurrentTab:()=>ba,getFormApiConfig:()=>It,getJQuery:()=>Z,getRegexStyles:()=>ma,getStyles:()=>fa,getToolStyles:()=>ha,initUI:()=>zs,isContainerValid:()=>te,registerComponents:()=>fs,render:()=>pa,renderRegex:()=>ya,renderTool:()=>ga,setCurrentTab:()=>Sa,showToast:()=>T,uiManager:()=>pe});function vo(t,e){let s=Z();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function pa(t){if(Hs=vo(t,Hs),!Hs||!Hs.length){console.error("[YouYouToolkit] Container not found or invalid");return}Wn(Hs)}function ya(t){if(Fs=vo(t,Fs),!Fs||!Fs.length){console.error("[YouYouToolkit] Regex container not found");return}Yn(Fs)}function ga(t){if(js=vo(t,js),!js||!js.length){console.error("[YouYouToolkit] Tool container not found");return}Vn(js)}function fa(){return Ye.getStyles()}function ma(){return Ve.getStyles()}function ha(){return[qe.getStyles(),Ze.getStyles(),et.getStyles(),tt.getStyles()].join(`
`)}function ba(){return pe.getCurrentTab()}function Sa(t){pe.switchTab(t)}var Hs,Fs,js,Od,xa=J(()=>{So();Hs=null,Fs=null,js=null;Od={render:pa,renderRegex:ya,renderTool:ga,getStyles:fa,getRegexStyles:ma,getToolStyles:ha,getCurrentTab:ba,setCurrentTab:Sa,uiManager:pe,ApiPresetPanel:Ye,RegexExtractPanel:Ve,ToolManagePanel:qe,SummaryToolPanel:Ze,StatusBlockPanel:et,YouyouReviewPanel:tt,registerComponents:fs,initUI:zs,SCRIPT_ID:m,escapeHtml:_,showToast:T,getJQuery:Z,isContainerValid:te,getFormApiConfig:It,fillFormWithConfig:Dt}});var Ta={};fe(Ta,{DEFAULT_PROMPT_SEGMENTS:()=>qn,PromptEditor:()=>Jn,default:()=>Fd,getPromptEditorStyles:()=>Ud,messagesToSegments:()=>Hd,segmentsToMessages:()=>zd,validatePromptSegments:()=>Ld});function Ud(){return`
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
  `}function Ld(t){let e=[];return Array.isArray(t)?(t.forEach((s,n)=>{s.id||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${n+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function zd(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Hd(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...qn]}var Nd,Bd,Kd,qn,Jn,Fd,Ia=J(()=>{Nd="youyou_toolkit_prompt_editor",Bd={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Kd={system:"fa-server",ai:"fa-robot",user:"fa-user"},qn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Jn=class{constructor(e={}){this.containerId=e.containerId||Nd,this.segments=e.segments||[...qn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...qn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=Bd[e.type]||e.type,n=Kd[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,i=e.mainSlot==="B"||e.isMain2,r=o?"var(--yyt-accent, #7bb7ff)":i?"#ffb74d":"",a=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${o?"yyt-main-a":""} ${i?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${r?`border-left: 3px solid ${r};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${n}"></i>
            <span class="yyt-prompt-segment-title">${s}</span>
            <div class="yyt-prompt-segment-badges">
              ${l}
              ${a}
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:n})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:n})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,n=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=s),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(o=>o.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let n=this.segments.find(o=>o.id===e);n&&(Object.assign(n,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let n=s.target.files[0];if(!n)return;let o=new FileReader;o.onload=i=>{try{let r=JSON.parse(i.target.result);Array.isArray(r)?(this.setSegments(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(r){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",r)}},o.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),n=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(n),i=document.createElement("a");i.href=o,i.download=`prompt_group_${Date.now()}.json`,i.click(),URL.revokeObjectURL(o),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};Fd=Jn});var xo={};fe(xo,{WindowManager:()=>Xn,closeWindow:()=>Vd,createWindow:()=>Yd,windowManager:()=>ze});function Wd(){if(ze.stylesInjected)return;ze.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=jd+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function Yd(t){let{id:e,title:s="\u7A97\u53E3",content:n="",width:o=900,height:i=700,modal:r=!1,resizable:a=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:g}=t;Wd();let p=window.jQuery||window.parent?.jQuery;if(!p)return console.error("[WindowManager] jQuery not available"),null;if(ze.isOpen(e))return ze.bringToFront(e),ze.getWindow(e);let h=window.innerWidth||1200,v=window.innerHeight||800,k=h<=1100,$=null,L=!1;d&&($=ze.getState(e),$&&!k&&(L=!0));let E,I;L&&$.width&&$.height?(E=Math.max(400,Math.min($.width,h-40)),I=Math.max(300,Math.min($.height,v-40))):(E=Math.max(400,Math.min(o,h-40)),I=Math.max(300,Math.min(i,v-40)));let y=Math.max(20,Math.min((h-E)/2,h-E-20)),B=Math.max(20,Math.min((v-I)/2,v-I-20)),M=l&&!k,C=`
    <div class="yyt-window" id="${e}" style="left:${y}px; top:${B}px; width:${E}px; height:${I}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${qd(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${M?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${n}</div>
      ${a?`
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
  `,P=null;r&&(P=p(`<div class="yyt-window-overlay" data-for="${e}"></div>`),p(document.body).append(P));let w=p(C);p(document.body).append(w),ze.register(e,w),w.on("mousedown",()=>ze.bringToFront(e));let G=!1,re={left:y,top:B,width:E,height:I},me=()=>{re={left:parseInt(w.css("left")),top:parseInt(w.css("top")),width:w.width(),height:w.height()},w.addClass("maximized"),w.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),G=!0},he=()=>{w.removeClass("maximized"),w.css({left:re.left+"px",top:re.top+"px",width:re.width+"px",height:re.height+"px"}),w.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),G=!1};w.find(".yyt-window-btn.maximize").on("click",()=>{G?he():me()}),(k&&l||L&&$.isMaximized&&l||c&&l)&&me(),w.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let ye={width:G?re.width:w.width(),height:G?re.height:w.height(),isMaximized:G};ze.saveState(e,ye)}u&&u(),P&&P.remove(),w.remove(),ze.unregister(e),p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),P&&P.on("click",ye=>{ye.target,P[0]});let Me=!1,ve,Te,Ne,dt;if(w.find(".yyt-window-header").on("mousedown",ye=>{p(ye.target).closest(".yyt-window-controls").length||G||(Me=!0,ve=ye.clientX,Te=ye.clientY,Ne=parseInt(w.css("left")),dt=parseInt(w.css("top")),p(document.body).css("user-select","none"))}),p(document).on("mousemove.yytWindowDrag"+e,ye=>{if(!Me)return;let ge=ye.clientX-ve,vt=ye.clientY-Te;w.css({left:Math.max(0,Ne+ge)+"px",top:Math.max(0,dt+vt)+"px"})}),p(document).on("mouseup.yytWindowDrag"+e,()=>{Me&&(Me=!1,p(document.body).css("user-select",""))}),a){let ye=!1,ge="",vt,st,se,f,x,D;w.find(".yyt-window-resize-handle").on("mousedown",function(R){G||(ye=!0,ge="",p(this).hasClass("se")?ge="se":p(this).hasClass("e")?ge="e":p(this).hasClass("s")?ge="s":p(this).hasClass("w")?ge="w":p(this).hasClass("n")?ge="n":p(this).hasClass("nw")?ge="nw":p(this).hasClass("ne")?ge="ne":p(this).hasClass("sw")&&(ge="sw"),vt=R.clientX,st=R.clientY,se=w.width(),f=w.height(),x=parseInt(w.css("left")),D=parseInt(w.css("top")),p(document.body).css("user-select","none"),R.stopPropagation())}),p(document).on("mousemove.yytWindowResize"+e,R=>{if(!ye)return;let z=R.clientX-vt,V=R.clientY-st,ae=400,W=300,Q=se,be=f,xe=x,ke=D;if(ge.includes("e")&&(Q=Math.max(ae,se+z)),ge.includes("s")&&(be=Math.max(W,f+V)),ge.includes("w")){let Pe=se-z;Pe>=ae&&(Q=Pe,xe=x+z)}if(ge.includes("n")){let Pe=f-V;Pe>=W&&(be=Pe,ke=D+V)}w.css({width:Q+"px",height:be+"px",left:xe+"px",top:ke+"px"})}),p(document).on("mouseup.yytWindowResize"+e,()=>{ye&&(ye=!1,p(document.body).css("user-select",""))})}return w.on("remove",()=>{p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),g&&setTimeout(()=>g(w),50),w}function Vd(t){let e=ze.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),ze.unregister(t)}}function qd(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var jd,wa,Xn,ze,To=J(()=>{We();jd="youyou_toolkit_window_manager",wa="window_states",Xn=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let n=this.loadStates();n[e]={...s,updatedAt:Date.now()},ms.set(wa,n)}loadStates(){return ms.get(wa)||{}}getState(e){return this.loadStates()[e]||null}},ze=new Xn});function _a(t,e={}){let{constants:s,topLevelWindow:n,modules:o}=t,{SCRIPT_ID:i,SCRIPT_VERSION:r,MENU_ITEM_ID:a,MENU_CONTAINER_ID:l}=s,c=null,d=!1,u=new Map,g={storageModule:()=>Promise.resolve().then(()=>(ei(),Zn)),uiComponentsModule:()=>Promise.resolve().then(()=>(xa(),va)),promptEditorModule:()=>Promise.resolve().then(()=>(Ia(),Ta)),toolExecutorModule:()=>Promise.resolve().then(()=>(Mn(),Cn)),windowManagerModule:()=>Promise.resolve().then(()=>(To(),xo))};function p(...M){console.log(`[${i}]`,...M)}function h(...M){console.error(`[${i}]`,...M)}async function v(M){return!M||!g[M]?null:o[M]?o[M]:(u.has(M)||u.set(M,(async()=>{try{let C=await g[M]();return o[M]=C,C}catch(C){throw u.delete(M),C}})()),u.get(M))}async function k(){return c||(c=(async()=>{try{return o.storageModule=await Promise.resolve().then(()=>(ei(),Zn)),o.apiConnectionModule=await Promise.resolve().then(()=>(Vs(),Do)),o.presetManagerModule=await Promise.resolve().then(()=>(en(),No)),o.uiModule=await Promise.resolve().then(()=>(So(),ua)),o.regexExtractorModule=await Promise.resolve().then(()=>(pn(),qo)),o.toolManagerModule=await Promise.resolve().then(()=>(fn(),Jo)),o.toolExecutorModule=await Promise.resolve().then(()=>(Mn(),Cn)),o.toolTriggerModule=await Promise.resolve().then(()=>(po(),Zr)),o.windowManagerModule=await Promise.resolve().then(()=>(To(),xo)),o.toolRegistryModule=await Promise.resolve().then(()=>(rs(),yr)),o.settingsServiceModule=await Promise.resolve().then(()=>(Ms(),fr)),o.bypassManagerModule=await Promise.resolve().then(()=>(Rs(),gr)),o.variableResolverModule=await Promise.resolve().then(()=>(ji(),Sr)),o.contextInjectorModule=await Promise.resolve().then(()=>(Fi(),hr)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(Wi(),xr)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(Yi(),Ir)),o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(M){return c=null,console.warn(`[${i}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,M),!1}})(),c)}function $(){return`
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

      #${a} {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 14px; cursor: pointer;
        transition: all 0.2s ease; border-radius: 8px; margin: 2px;
      }

      #${a}:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
      }

      #${a} .fa-fw {
        font-size: 16px; color: var(--yyt-accent);
        filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      }

      #${a} span { font-weight: 500; letter-spacing: 0.3px; }

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
    `}async function L(){let M=`${i}-styles`,C=n.document||document;if(C.getElementById(M))return;let P="",w=[];try{w.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{w.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}w.push("./styles/main.css");for(let re of[...new Set(w.filter(Boolean))])try{let me=await fetch(re);if(me.ok){P=await me.text();break}}catch{}P||(p("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),P=$());let G=C.createElement("style");G.id=M,G.textContent=P,(C.head||C.documentElement).appendChild(G),p("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function E(){let M=n.document||document;if(o.uiModule?.getAllStyles){let C=`${i}-ui-styles`;if(!M.getElementById(C)){let P=M.createElement("style");P.id=C,P.textContent=o.uiModule.getAllStyles(),(M.head||M.documentElement).appendChild(P)}}if(o.promptEditorModule&&o.promptEditorModule.getPromptEditorStyles){let C=`${i}-prompt-styles`;if(!M.getElementById(C)){let P=M.createElement("style");P.id=C,P.textContent=o.promptEditorModule.getPromptEditorStyles(),(M.head||M.documentElement).appendChild(P)}}}async function I(){try{let{applyUiPreferences:M}=await Promise.resolve().then(()=>(jn(),ia));if(o.settingsServiceModule?.settingsService){let C=o.settingsServiceModule.settingsService.getUiSettings();if(C&&C.theme){let P=n.document||document;M(C,P),p(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${C.theme}`)}}}catch(M){p("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",M)}}function y(){let M=n.jQuery||window.jQuery;if(!M){h("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(y,1e3);return}let C=n.document||document,P=M("#extensionsMenu",C);if(!P.length){p("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(y,2e3);return}if(M(`#${l}`,P).length>0){p("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let G=M(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),re=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${a}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,me=M(re);me.on("click",function(Me){Me.stopPropagation(),p("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let ve=M("#extensionsMenuButton",C);ve.length&&P.is(":visible")&&ve.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),G.append(me),P.append(G),p("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function B(){if(p(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${r}`),await L(),await k()){if(p("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!d&&o.uiModule?.initUI)try{o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:n.document||document}),d=!0,p("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(P){console.error(`[${i}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,P)}if(o.toolTriggerModule?.initTriggerModule)try{o.toolTriggerModule.initTriggerModule(),p("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(P){console.error(`[${i}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,P)}E(),await I()}else p("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let C=n.document||document;C.readyState==="loading"?C.addEventListener("DOMContentLoaded",()=>{setTimeout(y,1e3)}):setTimeout(y,1e3),p("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:k,injectStyles:L,addMenuItem:y,loadLegacyModule:v,init:B,log:p,logError:h}}function Ea(t){let{constants:e,topLevelWindow:s,modules:n,caches:o,uiState:i}=t,{SCRIPT_ID:r,SCRIPT_VERSION:a,POPUP_ID:l}=e,c={cleanup:null},d={cleanups:[]};function u(...f){console.log(`[${r}]`,...f)}function g(...f){console.error(`[${r}]`,...f)}async function p(f){if(n[f])return n[f];let x=t?.services?.loadLegacyModule;if(typeof x!="function")return null;try{return await x(f)}catch(D){return g(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${f}`,D),null}}function h(f){return typeof f!="string"?"":f.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function v(){return s.jQuery||window.jQuery}function k(){return s.document||document}function $(f){if(!f)return"\u672A\u9009\u62E9\u9875\u9762";let x=n.toolRegistryModule?.getToolConfig(f);if(!x)return f;if(!x.hasSubTabs)return x.name||f;let D=i.currentSubTab[f]||x.subTabs?.[0]?.id||"",R=x.subTabs?.find(z=>z.id===D);return R?.name?`${x.name} / ${R.name}`:x.name||f}function L(f){if(!f)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let x=n.toolRegistryModule?.getToolConfig(f);if(!x)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!x.hasSubTabs)return x.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let D=i.currentSubTab[f]||x.subTabs?.[0]?.id||"";return x.subTabs?.find(z=>z.id===D)?.description||x.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function E(){let f=i.currentPopup;if(!f)return;let x=$(i.currentMainTab),D=L(i.currentMainTab),R=f.querySelector(".yyt-popup-active-label");R&&(R.textContent=`\u5F53\u524D\uFF1A${x}`);let z=f.querySelector(".yyt-shell-breadcrumb");z&&(z.textContent=x);let V=f.querySelector(".yyt-shell-main-title");V&&(V.textContent=x);let ae=f.querySelector(".yyt-shell-main-description");ae&&(ae.textContent=D);let W=f.querySelector(".yyt-shell-current-page");W&&(W.textContent=x);let Q=f.querySelector(".yyt-shell-current-desc");Q&&(Q.textContent=D)}function I(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function y(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(f=>{typeof f=="function"&&f()}),d.cleanups=[])}function B(f){return!!f?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function M(f){let x=f?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body"].join(","));return x?x.scrollHeight>x.clientHeight+2||x.scrollWidth>x.clientWidth+2:!1}function C(f,x){return x?.closest?.(".yyt-scrollable-surface")===f}function P(f,x){return!f||!x?null:[x.closest?.(".yyt-tool-list"),x.closest?.(".yyt-settings-content"),x.closest?.(".yyt-sub-content"),x.closest?.(".yyt-tab-content.active"),f].filter(Boolean).find(R=>R!==f&&!f.contains(R)?!1:R.scrollHeight>R.clientHeight+2||R.scrollWidth>R.clientWidth+2)||f}function w(f){let x=k();if(!f||!x)return;f.classList.add("yyt-scrollable-surface");let D=!1,R=!1,z=0,V=0,ae=0,W=0,Q=!1,be=!1,xe=()=>{D=!1,R=!1,f.classList.remove("yyt-scroll-dragging")},ke=q=>{q.button===0&&(B(q.target)||C(f,q.target)&&(Q=f.scrollWidth>f.clientWidth+2,be=f.scrollHeight>f.clientHeight+2,!(!Q&&!be)&&(q.stopPropagation(),D=!0,R=!1,z=q.clientX,V=q.clientY,ae=f.scrollLeft,W=f.scrollTop)))},Pe=q=>{if(!D)return;let ut=q.clientX-z,Be=q.clientY-V;!(Math.abs(ut)>4||Math.abs(Be)>4)&&!R||(R=!0,f.classList.add("yyt-scroll-dragging"),Q&&(f.scrollLeft=ae-ut),be&&(f.scrollTop=W-Be),q.preventDefault())},xt=()=>{xe()},ie=q=>{if(q.ctrlKey||M(q.target))return;let ut=f.classList.contains("yyt-content");if(!ut&&!C(f,q.target))return;let Be=P(f,q.target);!Be||!(Be.scrollHeight>Be.clientHeight+2||Be.scrollWidth>Be.clientWidth+2)||(Math.abs(q.deltaY)>0&&(Be.scrollTop+=q.deltaY),Math.abs(q.deltaX)>0&&(Be.scrollLeft+=q.deltaX),q.preventDefault(),(!ut||Be!==f)&&q.stopPropagation())},Ie=q=>{R&&q.preventDefault()};f.addEventListener("mousedown",ke),f.addEventListener("wheel",ie,{passive:!1}),f.addEventListener("dragstart",Ie),x.addEventListener("mousemove",Pe),x.addEventListener("mouseup",xt),d.cleanups.push(()=>{xe(),f.classList.remove("yyt-scrollable-surface"),f.removeEventListener("mousedown",ke),f.removeEventListener("wheel",ie),f.removeEventListener("dragstart",Ie),x.removeEventListener("mousemove",Pe),x.removeEventListener("mouseup",xt)})}function G(){let f=i.currentPopup;if(!f)return;y();let x=[...f.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...f.querySelectorAll(".yyt-sub-nav"),...f.querySelectorAll(".yyt-content"),...f.querySelectorAll(".yyt-tab-content.active"),...f.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...f.querySelectorAll(".yyt-settings-content"),...f.querySelectorAll(".yyt-tool-list")];[...new Set(x)].forEach(w)}function re(){let f=k(),x=i.currentPopup,D=x?.querySelector(".yyt-popup-header");if(!x||!D||!f)return;let R=!1,z=0,V=0,ae=0,W=0,Q="",be=()=>({width:s.innerWidth||f.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||f.documentElement?.clientHeight||window.innerHeight||0}),xe=(Ie,q,ut)=>Math.min(Math.max(Ie,q),ut),ke=()=>{R&&(R=!1,x.classList.remove("yyt-popup-dragging"),f.body.style.userSelect=Q)},Pe=Ie=>{if(!R||!i.currentPopup)return;let q=Ie.clientX-z,ut=Ie.clientY-V,{width:Be,height:Qn}=be(),Ca=x.offsetWidth||0,Ma=x.offsetHeight||0,ka=Math.max(0,Be-Ca),Pa=Math.max(0,Qn-Ma);x.style.left=`${xe(ae+q,0,ka)}px`,x.style.top=`${xe(W+ut,0,Pa)}px`,x.style.transform="none",x.style.right="auto",x.style.bottom="auto"},xt=()=>{ke()},ie=Ie=>{if(Ie.button!==0||Ie.target?.closest(".yyt-popup-close"))return;R=!0,z=Ie.clientX,V=Ie.clientY;let q=x.getBoundingClientRect();ae=q.left,W=q.top,x.style.left=`${q.left}px`,x.style.top=`${q.top}px`,x.style.transform="none",x.style.right="auto",x.style.bottom="auto",x.classList.add("yyt-popup-dragging"),Q=f.body.style.userSelect||"",f.body.style.userSelect="none",Ie.preventDefault()};D.addEventListener("mousedown",ie),f.addEventListener("mousemove",Pe),f.addEventListener("mouseup",xt),c.cleanup=()=>{ke(),D.removeEventListener("mousedown",ie),f.removeEventListener("mousemove",Pe),f.removeEventListener("mouseup",xt)}}function me(){I(),y(),i.currentPopup&&(i.currentPopup.remove(),i.currentPopup=null),i.currentOverlay&&(i.currentOverlay.remove(),i.currentOverlay=null),u("\u5F39\u7A97\u5DF2\u5173\u95ED")}function he(f){i.currentMainTab=f;let x=v();if(!x||!i.currentPopup)return;x(i.currentPopup).find(".yyt-main-nav-item").removeClass("active"),x(i.currentPopup).find(`.yyt-main-nav-item[data-tab="${f}"]`).addClass("active");let D=n.toolRegistryModule?.getToolConfig(f);D?.hasSubTabs?(x(i.currentPopup).find(".yyt-sub-nav").show(),ve(f,D.subTabs)):x(i.currentPopup).find(".yyt-sub-nav").hide(),x(i.currentPopup).find(".yyt-tab-content").removeClass("active"),x(i.currentPopup).find(`.yyt-tab-content[data-tab="${f}"]`).addClass("active"),Te(f),E(),G()}function Me(f,x){i.currentSubTab[f]=x;let D=v();!D||!i.currentPopup||(D(i.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),D(i.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${x}"]`).addClass("active"),Ne(f,x),E(),G())}function ve(f,x){let D=v();if(!D||!i.currentPopup||!x)return;let R=i.currentSubTab[f]||x[0]?.id,z=x.map(V=>`
      <div class="yyt-sub-nav-item ${V.id===R?"active":""}" data-subtab="${V.id}">
        <i class="fa-solid ${V.icon||"fa-file"}"></i>
        <span>${V.name}</span>
      </div>
    `).join("");D(i.currentPopup).find(".yyt-sub-nav").html(z),D(i.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let ae=D(this).data("subtab");Me(f,ae)}),G()}async function Te(f){let x=v();if(!x||!i.currentPopup)return;let D=x(i.currentPopup).find(`.yyt-tab-content[data-tab="${f}"]`);if(!D.length)return;let R=n.toolRegistryModule?.getToolConfig(f);switch(f){case"apiPresets":if(n.uiModule?.renderApiPanel)n.uiModule.renderApiPanel(D);else{let z=await p("uiComponentsModule");z?.render&&z.render(D)}break;case"toolManage":if(n.uiModule?.renderToolPanel)n.uiModule.renderToolPanel(D);else{let z=await p("uiComponentsModule");z?.renderTool&&z.renderTool(D)}break;case"regexExtract":if(n.uiModule?.renderRegexPanel)n.uiModule.renderRegexPanel(D);else{let z=await p("uiComponentsModule");z?.renderRegex&&z.renderRegex(D)}break;case"tools":if(R?.hasSubTabs&&R.subTabs?.length>0){let z=i.currentSubTab[f]||R.subTabs[0].id;await Ne(f,z)}else D.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":n.uiModule?.renderBypassPanel?n.uiModule.renderBypassPanel(D):D.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":n.uiModule?.renderSettingsPanel?n.uiModule.renderSettingsPanel(D):D.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:ye(f,D);break}G()}async function Ne(f,x){let D=v();if(!D||!i.currentPopup)return;let R=D(i.currentPopup).find(`.yyt-tab-content[data-tab="${f}"]`);if(!R.length)return;let z=n.toolRegistryModule?.getToolConfig(f);if(z?.hasSubTabs){let ae=z.subTabs?.find(W=>W.id===x);if(ae){let W=R.find(".yyt-sub-content");switch(W.length||(R.html('<div class="yyt-sub-content"></div>'),W=R.find(".yyt-sub-content")),ae.component){case"SummaryToolPanel":if(n.uiModule?.renderSummaryToolPanel)n.uiModule.renderSummaryToolPanel(W);else{let Q=await p("uiComponentsModule");Q?.SummaryToolPanel?Q.SummaryToolPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(n.uiModule?.renderStatusBlockPanel)n.uiModule.renderStatusBlockPanel(W);else{let Q=await p("uiComponentsModule");Q?.StatusBlockPanel?Q.StatusBlockPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(n.uiModule?.renderYouyouReviewPanel)n.uiModule.renderYouyouReviewPanel(W);else{let Q=await p("uiComponentsModule");Q?.YouyouReviewPanel?Q.YouyouReviewPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await dt(ae,W);break;default:W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let V=R.find(".yyt-sub-content");if(V.length){switch(x){case"config":ge(f,V);break;case"prompts":await vt(f,V);break;case"presets":st(f,V);break;default:V.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}G()}}async function dt(f,x){if(!(!v()||!x?.length||!f?.id))try{let R=o.dynamicToolPanelCache.get(f.id);if(!R){let V=(await Promise.resolve().then(()=>(Us(),ta)))?.createToolConfigPanel;if(typeof V!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");R=V({id:`${f.id}Panel`,toolId:f.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${f.name||f.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${f.id}-extraction-preview`,previewTitle:`${f.name||f.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(f.id,R)}R.renderTo(x),G()}catch(R){console.error(`[${r}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,R),x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function ye(f,x){if(!v())return;let R=n.toolRegistryModule?.getToolConfig(f);if(!R){x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let z=i.currentSubTab[f]||R.subTabs?.[0]?.id||"config";x.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${z}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Ne(f,z)}function ge(f,x){if(!v())return;let R=n.toolManagerModule?.getTool(f),z=n.presetManagerModule?.getAllPresets()||[],V=n.toolRegistryModule?.getToolApiPreset(f)||"",ae=z.map(W=>`<option value="${h(W.name)}" ${W.name===V?"selected":""}>${h(W.name)}</option>`).join("");x.html(`
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
              ${ae}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${R?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${R?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),x.find("#yyt-save-tool-preset").on("click",function(){let Q=x.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(f,Q);let be=s.toastr;be&&be.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function vt(f,x){let D=v(),R=n.promptEditorModule||await p("promptEditorModule");if(!D||!R){x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let V=n.toolManagerModule?.getTool(f)?.config?.messages||[],ae=R.messagesToSegments?R.messagesToSegments(V):R.DEFAULT_PROMPT_SEGMENTS,W=new R.PromptEditor({containerId:`yyt-prompt-editor-${f}`,segments:ae,onChange:be=>{let xe=R.segmentsToMessages?R.segmentsToMessages(be):[];u("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",xe.length,"\u6761\u6D88\u606F")}});x.html(`<div id="yyt-prompt-editor-${f}" class="yyt-prompt-editor-container"></div>`),W.init(x.find(`#yyt-prompt-editor-${f}`));let Q=R.getPromptEditorStyles?R.getPromptEditorStyles():"";if(Q){let be="yyt-prompt-editor-styles",xe=s.document||document;if(!xe.getElementById(be)){let ke=xe.createElement("style");ke.id=be,ke.textContent=Q,(xe.head||xe.documentElement).appendChild(ke)}}}function st(f,x){v()&&x.html(`
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
    `)}function se(){if(i.currentPopup){u("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let f=v(),x=k();if(!f){g("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let D=n.toolRegistryModule?.getToolList()||[];if(!D.length){g("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}D.some(ie=>ie.id===i.currentMainTab)||(i.currentMainTab=D[0].id);let R=n.toolRegistryModule?.getToolConfig("tools"),z=Array.isArray(R?.subTabs)?R.subTabs:[],V=z.filter(ie=>ie?.isCustom).length,ae=z.filter(ie=>!ie?.isCustom).length,W=$(i.currentMainTab),Q=L(i.currentMainTab);i.currentOverlay=x.createElement("div"),i.currentOverlay.className="yyt-popup-overlay",i.currentOverlay.addEventListener("click",ie=>{ie.target===i.currentOverlay&&me()}),x.body.appendChild(i.currentOverlay);let be=D.map(ie=>`
      <div class="yyt-main-nav-item ${ie.id===i.currentMainTab?"active":""}" data-tab="${ie.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${h(ie.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${h(ie.name||ie.id)}</span>
          <span class="yyt-main-nav-desc">${h(ie.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),xe=D.map(ie=>`
      <div class="yyt-tab-content ${ie.id===i.currentMainTab?"active":""}" data-tab="${ie.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),ke=`
      <div class="yyt-popup" id="${l}">
        <div class="yyt-popup-header">
          <div class="yyt-popup-brand">
            <div class="yyt-popup-title-row">
              <div class="yyt-popup-title">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>YouYou \u5DE5\u5177\u7BB1</span>
              </div>
              <span class="yyt-popup-version">v${a}</span>
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
                  <strong class="yyt-shell-current-page">${h(W)}</strong>
                  <span class="yyt-shell-current-desc">${h(Q)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${D.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${ae}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${V}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${D.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${be}
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
                    <div class="yyt-shell-main-title">${h(W)}</div>
                    <div class="yyt-shell-main-description">${h(Q)}</div>
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
                      ${xe}
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
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${h(W)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${r}-close-btn">\u5173\u95ED</button>
          </div>
        </div>
      </div>
    `,Pe=x.createElement("div");Pe.innerHTML=ke,i.currentPopup=Pe.firstElementChild,x.body.appendChild(i.currentPopup),f(i.currentPopup).find(".yyt-popup-close").on("click",me),f(i.currentPopup).find(`#${r}-close-btn`).on("click",me),f(i.currentPopup).find(".yyt-main-nav-item").on("click",function(){let Ie=f(this).data("tab");Ie&&he(Ie)}),re(),Te(i.currentMainTab);let xt=n.toolRegistryModule?.getToolConfig(i.currentMainTab);xt?.hasSubTabs&&(f(i.currentPopup).find(".yyt-sub-nav").show(),ve(i.currentMainTab,xt.subTabs)),E(),G(),u("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:se,closePopup:me,switchMainTab:he,switchSubTab:Me,renderTabContent:Te,renderSubTabContent:Ne}}function Aa(t,e={}){let{constants:s,modules:n}=t,{SCRIPT_ID:o,SCRIPT_VERSION:i}=s,{init:r,loadModules:a,loadLegacyModule:l,addMenuItem:c,popupShell:d}=e;return{version:i,id:o,init:r,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:c,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getUiComponents:()=>n.uiComponentsModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getToolTrigger:()=>n.toolTriggerModule,getAutoTriggerDiagnostics:u=>n.toolTriggerModule?.getAutoTriggerDiagnostics?.(u)||null,exportAutoTriggerDiagnostics:u=>n.toolTriggerModule?.exportAutoTriggerDiagnostics?.(u)||null,getGenerationTransactionDiagnostics:u=>n.toolTriggerModule?.getGenerationTransactionDiagnostics?.(u)||null,exportGenerationTransactionDiagnostics:u=>n.toolTriggerModule?.exportGenerationTransactionDiagnostics?.(u)||null,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getPromptEditor:()=>n.promptEditorModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,async loadLegacyModule(u){return typeof l!="function"?null:l(u)},async getApiConfig(){return await a(),n.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(u){return await a(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(u),!0):!1},async getPresets(){return await a(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(u,g){if(await a(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(u,g);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await a(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(u,g){return n.toolRegistryModule?.registerTool(u,g)||!1},unregisterTool(u){return n.toolRegistryModule?.unregisterTool(u)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(u){return n.windowManagerModule?.createWindow(u)||null},closeWindow(u){n.windowManagerModule?.closeWindow(u)}}}var Ws="youyou_toolkit",Jd="0.6.2",Xd=`${Ws}-menu-item`,Qd=`${Ws}-menu-container`,Zd=`${Ws}-popup`,eu=typeof window.parent<"u"?window.parent:window,Ys={constants:{SCRIPT_ID:Ws,SCRIPT_VERSION:Jd,MENU_ITEM_ID:Xd,MENU_CONTAINER_ID:Qd,POPUP_ID:Zd},topLevelWindow:eu,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},Ra=Ea(Ys),qt=_a(Ys,{openPopup:Ra.openPopup});Ys.services.loadModules=qt.loadModules;Ys.services.loadLegacyModule=qt.loadLegacyModule;var Io=Aa(Ys,{init:qt.init,loadModules:qt.loadModules,loadLegacyModule:qt.loadLegacyModule,addMenuItem:qt.addMenuItem,popupShell:Ra});if(typeof window<"u"&&(window.YouYouToolkit=Io,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Io}catch{}var ty=Io;qt.init();console.log(`[${Ws}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{ty as default};
