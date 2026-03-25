var Ta=Object.defineProperty;var F=(t,e)=>()=>(t&&(e=t(t=0)),e);var ue=(t,e)=>{for(var s in e)Ta(t,s,{get:e[s],enumerable:!0})};function bo(){let t=T;return t._getStorage(),t._storage}function xo(){return T.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function vo(t){T.set("settings",t)}var ht,T,q,ho,us,Ue=F(()=>{ht=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:n=>{let r=s.extensionSettings[this.namespace][n];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(n,r)=>{s.extensionSettings[this.namespace][n]=r,this._saveSettings(s)},removeItem:n=>{delete s.extensionSettings[this.namespace][n],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(n){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let n=`${this.namespace}:${e}`;if(this._cache.has(n))return this._cache.get(n);let r=this._getStorage(),o=this._getFullKey(e),i=r.getItem(o);if(i===null)return s;try{let a=JSON.parse(i);return this._cache.set(n,a),a}catch{return i}}set(e,s){let n=this._getStorage(),r=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.set(o,s);try{n.setItem(r,JSON.stringify(s))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(e){let s=this._getStorage(),n=this._getFullKey(e),r=`${this.namespace}:${e}`;this._cache.delete(r),s.removeItem(n)}has(e){let s=this._getStorage(),n=this._getFullKey(e);return s.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext();n?.extensionSettings?.[this.namespace]&&(n.extensionSettings[this.namespace]={},this._saveSettings(n))}}else{let s=`${this.namespace}_`,n=[];for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);o&&o.startsWith(s)&&n.push(o)}n.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(n=>{s[n]=this.get(n)}),s}setMultiple(e){Object.entries(e).forEach(([s,n])=>{this.set(s,n)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([i,a])=>{s[i]=typeof a=="string"?JSON.parse(a):a})}}else{let n=`${this.namespace}_`;for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);if(o&&o.startsWith(n)){let i=o.slice(n.length);try{s[i]=JSON.parse(localStorage.getItem(o))}catch{s[i]=localStorage.getItem(o)}}}}return s}},T=new ht("youyou_toolkit"),q=new ht("youyou_toolkit:tools"),ho=new ht("youyou_toolkit:presets"),us=new ht("youyou_toolkit:windows")});var Wn={};ue(Wn,{DEFAULT_API_PRESETS:()=>_a,DEFAULT_SETTINGS:()=>Ea,STORAGE_KEYS:()=>ps,StorageService:()=>ht,deepMerge:()=>So,getCurrentPresetName:()=>Ia,getStorage:()=>bo,loadApiPresets:()=>wa,loadSettings:()=>xo,presetStorage:()=>ho,saveApiPresets:()=>Aa,saveSettings:()=>vo,setCurrentPresetName:()=>Ra,storage:()=>T,toolStorage:()=>q,windowStorage:()=>us});function wa(){return T.get(ps.API_PRESETS)||[]}function Aa(t){T.set(ps.API_PRESETS,t)}function Ia(){return T.get(ps.CURRENT_PRESET)||""}function Ra(t){T.set(ps.CURRENT_PRESET,t||"")}function So(t,e){let s=r=>r&&typeof r=="object"&&!Array.isArray(r),n={...t};return s(t)&&s(e)&&Object.keys(e).forEach(r=>{s(e[r])?r in t?n[r]=So(t[r],e[r]):Object.assign(n,{[r]:e[r]}):Object.assign(n,{[r]:e[r]})}),n}var ps,Ea,_a,Vn=F(()=>{Ue();Ue();ps={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},Ea={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},_a=[]});var C,qn,k,Ee=F(()=>{C={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},qn=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,n={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:s,priority:r};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let n=this.listeners.get(e);if(n){for(let r of n)if(r.callback===s){n.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let n=this.listeners.get(e);if(!n||n.size===0)return;let r=Array.from(n).sort((o,i)=>i.priority-o.priority);for(let{callback:o}of r)try{o(s)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,i)}}once(e,s){let n=r=>{this.off(e,n),s(r)};return this.on(e,n)}wait(e,s=0){return new Promise((n,r)=>{let o=null,i=this.once(e,a=>{o&&clearTimeout(o),n(a)});s>0&&(o=setTimeout(()=>{i(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},k=new qn});function S(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function b(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Ma(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function qe(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:r=!1,noticeId:o=""}=s,i=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!i?.body){b(t,e,n);return}let a="yyt-top-notice-container",l="yyt-top-notice-styles",c=i.getElementById(a);if(c||(c=i.createElement("div"),c.id=a,c.style.cssText=`
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
    `,i.body.appendChild(c)),!i.getElementById(l)){let v=i.createElement("style");v.id=l,v.textContent=`
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
    `,i.head.appendChild(v)}if(o){let v=c.querySelector(`[data-notice-id="${o}"]`);v&&v.remove()}let u={success:"\u2713",error:"!",warning:"\u2022",info:"i"},d=i.createElement("div");d.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(d.dataset.noticeId=o);let p=i.createElement("span");p.className="yyt-top-notice__icon",p.textContent=u[t]||u.info;let m=i.createElement("div");m.className="yyt-top-notice__content",m.textContent=e;let h=i.createElement("button");h.className="yyt-top-notice__close",h.type="button",h.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),h.textContent="\xD7";let _=()=>{d.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>d.remove(),180)};h.addEventListener("click",_),d.appendChild(p),d.appendChild(m),d.appendChild(h),c.appendChild(d),r||setTimeout(_,n)}function Ma(t,e,s){let n=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!n)return;let r=n.getElementById("yyt-fallback-toast");r&&r.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=o[t]||o.info,a=n.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${i.bg};
    color: #0b0f15;
    border-radius: 8px;
    border: 2px solid ${i.border};
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
    `,n.head.appendChild(l)}n.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},s)}function Y(){if(It)return It;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return It=window.parent.jQuery,It}catch{}return window.jQuery&&(It=window.jQuery),It}function Ca(){It=null}function J(t){return t&&t.length>0}function bt(t,e=g){if(!Y()||!J(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",r=t.find(`#${e}-model-select`);return r.is(":visible")&&(n=r.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Rt(t,e,s=g){if(!Y()||!J(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",r);let i=t.find(`#${s}-custom-api-fields`);r?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Jn(t){let{id:e,title:s,body:n,width:r="380px",wide:o=!1}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""}" style="${r!=="380px"?`width: ${r};`:""} max-height: calc(100vh - 32px);">
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
  `}function Xn(t,e,s={}){if(!Y())return()=>{};let r=t.find(`#${e}-overlay`),o=()=>{r.remove(),s.onClose&&s.onClose()};return r.find(`#${e}-close, #${e}-cancel`).on("click",o),r.on("click",function(i){i.target===this&&o()}),r.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(o)}),o}function ct(t,e){let s=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(s),r=document.createElement("a");r.href=n,r.download=e,r.click(),URL.revokeObjectURL(n)}function dt(t){return new Promise((e,s)=>{let n=new FileReader;n.onload=r=>e(r.target.result),n.onerror=r=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var g,It,Je=F(()=>{g="youyou_toolkit";It=null});var ys,ae,Qn=F(()=>{Ee();Je();ys=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,k.emit(C.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,n={}){let r=Y();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let i;if(typeof s=="string"?i=r(s):s&&s.jquery?i=s:s&&(i=r(s)),!J(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let a=o.render({...n,dependencies:this.dependencies});i.html(a),o.bindEvents(i,this.dependencies),this.activeInstances.set(e,{container:i,component:o,props:n}),k.emit(C.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,k.emit(C.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,k.emit(C.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,n)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let n=e.createElement("style");n.id=s,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){k.on(C.PRESET_UPDATED,()=>{}),k.on(C.TOOL_UPDATED,()=>{})}},ae=new ys});var Ao={};ue(Ao,{API_STATUS:()=>Na,fetchAvailableModels:()=>rr,getApiConfig:()=>xt,getEffectiveApiConfig:()=>gs,hasEffectiveApiPreset:()=>tr,sendApiRequest:()=>nr,sendWithPreset:()=>La,testApiConnection:()=>Fa,updateApiConfig:()=>Yt,validateApiConfig:()=>Wt});function Da(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function er(){return T.get(To,Da())}function $a(t){T.set(To,t)}function Eo(){return T.get(ka,[])}function Oa(){return T.get(Pa,"")}function Zn(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function _o(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let n=null;try{n=new URL(s)}catch{return s}let r=n.pathname.replace(/\/+$/,""),o=r;return e==="chat_completions"?!/\/chat\/completions$/i.test(r)&&!/\/completions$/i.test(r)&&(o=`${r||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(r)?o=r.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(r)?o=r.replace(/\/completions$/i,"/models"):/\/models$/i.test(r)||(o=`${r||""}/models`)),n.pathname=o.replace(/\/+/g,"/"),n.toString()}function Ga(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function xt(){return er().apiConfig||{}}function Yt(t){let e=er();e.apiConfig={...e.apiConfig,...t},$a(e)}function Wt(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function gs(t=""){let e=er(),s=t||Oa()||"";if(s){let r=Eo().find(o=>o.name===s);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return e.apiConfig||{}}function tr(t=""){return t?Eo().some(s=>s?.name===t):!1}async function La(t,e,s={},n=null){let r=gs(t);return await nr(e,{...s,apiConfig:r},n)}function wo(t,e={}){let s=e.apiConfig||xt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function sr(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function nr(t,e={},s=null){let n=e.apiConfig||xt(),r=n.useMainApi,o=Wt(n);if(!o.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return r?await Ua(t,e,s):await Ba(t,n,e,s)}async function Ua(t,e,s){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function Ba(t,e,s,n){let r=typeof window.parent<"u"?window.parent:window;if(r.TavernHelper?.generateRaw)try{return await za(t,e,s,n,r)}catch(o){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(r.SillyTavern?.getRequestHeaders)try{return await ja(t,e,s,n,r)}catch(o){if(!o?.allowDirectFallback)throw o}return await Ha(t,e,s,n)}async function za(t,e,s,n,r){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:Ga(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof o=="string"?o.trim():sr(o)}async function ja(t,e,s,n,r){let o=String(e.url||"").trim(),i={...wo(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},a={...typeof r.SillyTavern?.getRequestHeaders=="function"?r.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:a,body:JSON.stringify(i),signal:n})}catch(d){throw d?.name==="AbortError"?d:Zn(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${d.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let d=[404,405,501,502].includes(l.status);throw Zn(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:d})}let u=null;try{u=c?JSON.parse(c):{}}catch{let p=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw Zn(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return sr(u)}async function Ha(t,e,s,n){let r=wo(t,{apiConfig:e,...s}),o=_o(e.url,"chat_completions"),i={"Content-Type":"application/json"};e.apiKey&&(i.Authorization=`Bearer ${e.apiKey}`);let a=await fetch(o,{method:"POST",headers:i,body:JSON.stringify(r),signal:n}),l=await a.text().catch(()=>"");if(!a.ok){let u=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${a.status}): ${u}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let d=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${d||"(\u7A7A\u54CD\u5E94)"}`)}return sr(c)}async function Fa(t=null){let e=t||xt(),s=Date.now();try{await nr([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let r=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-s}}}async function rr(t=null){let e=t||xt();return e.useMainApi?await Ka():await Ya(e)}async function Ka(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Ya(t){if(!t.url||!t.apiKey)return[];try{let e=_o(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let n=await s.json();return n.data&&Array.isArray(n.data)?n.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var To,ka,Pa,Na,Bs=F(()=>{Ue();To="settings",ka="api_presets",Pa="current_preset";Na={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Co={};ue(Co,{createPreset:()=>Hs,createPresetFromCurrentConfig:()=>Qa,deletePreset:()=>Fs,duplicatePreset:()=>Xa,exportPresets:()=>cr,generateUniquePresetName:()=>ur,getActiveConfig:()=>lr,getActivePresetName:()=>Ks,getAllPresets:()=>Vt,getPreset:()=>Ct,getPresetNames:()=>qa,getStarredPresets:()=>ar,importPresets:()=>dr,presetExists:()=>fs,renamePreset:()=>Ja,switchToPreset:()=>kt,togglePresetStar:()=>ir,updatePreset:()=>or,validatePreset:()=>Za});function Va(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Mo(){return T.get(Wa,Va())}function Re(){return T.get(Io,[])}function Mt(t){T.set(Io,t)}function js(){return T.get(Ro,"")}function zs(t){T.set(Ro,t||"")}function Vt(){return Re()}function qa(){return Re().map(e=>e.name)}function Ct(t){return!t||typeof t!="string"?null:Re().find(s=>s.name===t)||null}function fs(t){return!t||typeof t!="string"?!1:Re().some(s=>s.name===t)}function Hs(t){let{name:e,description:s,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(fs(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={name:r,description:s||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=Re();return i.push(o),Mt(i),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:o}}function or(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Re(),n=s.findIndex(i=>i.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=s[n],o={...r,...e,name:r.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...r.apiConfig,...e.apiConfig}),s[n]=o,Mt(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function Fs(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Re(),s=e.findIndex(n=>n.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Mt(e),js()===t&&zs(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Ja(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!fs(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(fs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n=Re(),r=n.find(o=>o.name===t);return r&&(r.name=s,r.updatedAt=Date.now(),Mt(n),js()===t&&zs(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Xa(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),n=Ct(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(fs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(n)),name:s,createdAt:Date.now(),updatedAt:Date.now()},o=Re();return o.push(r),Mt(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:r}}function ir(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Re(),s=e.find(n=>n.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Mt(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function ar(){return Re().filter(e=>e.starred===!0)}function kt(t){if(!t)return zs(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Ct(t);return e?(zs(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Ks(){return js()}function lr(){let t=js();if(t){let s=Ct(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:Mo().apiConfig||{}}}function cr(t=null){if(t){let s=Ct(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=Re();return JSON.stringify(e,null,2)}function dr(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(s)?s:[s];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=Re(),o=0;for(let i of n){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=r.findIndex(l=>l.name===i.name);a>=0?e.overwrite&&(i.updatedAt=Date.now(),r[a]=i,o++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),r.push(i),o++)}return o>0&&Mt(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function Qa(t,e=""){let s=Mo();return Hs({name:t,description:e,apiConfig:s.apiConfig})}function Za(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function ur(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=Re(),s=new Set(e.map(r=>r.name));if(!s.has(t))return t;let n=1;for(;s.has(`${t} (${n})`);)n++;return`${t} (${n})`}var Wa,Io,Ro,Ys=F(()=>{Ue();Wa="settings",Io="api_presets",Ro="current_preset"});function Ws(t){return String(t||"").trim()}var Xe,Be,pr=F(()=>{Ee();Je();Bs();Ys();Xe=null;Be={id:"apiPresetPanel",render(t){let e=lr(),s=e?.apiConfig||xt(),n=Ws(e?.presetName||Ks()),r=Vt(),a=ar().slice(0,8),l=a.length>0?a.map(d=>this._renderPresetItem(d)).join(""):"",c=Xe===null?n||"":Ws(Xe),u=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${g}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${S(c)}">${S(u)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${c?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${r.length>0?r.map(d=>this._renderSelectOption(d,c)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${g}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${g}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${g}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${g}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${g}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${g}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${g}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${S(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${S(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${S(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(t,e){let s=t.starred===!0,n=s?"yyt-option-star yyt-starred":"yyt-option-star",r=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${S(t.name)}">
        <button class="${n}" data-preset="${S(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${r}</button>
        <span class="yyt-option-text">${S(t.name)}</span>
      </div>
    `},_renderApiConfigForm(t){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${g}-use-main-api" ${t.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${g}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${g}-api-url" 
                   value="${S(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${g}-api-key" 
                     value="${S(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${g}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${g}-model" 
                     value="${S(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${g}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${g}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${g}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${g}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${g}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=Y();!s||!J(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${g}-preset-dropdown`),n=s.find(".yyt-select-trigger"),r=s.find(".yyt-select-value"),o=()=>{let i=String(r.data("value")||"").trim();if(!i){Xe="",kt(""),Rt(t,xt(),g),t.find(".yyt-preset-item").removeClass("yyt-loaded"),b("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let a=Ct(i);if(!a){b("error",`\u9884\u8BBE "${i}" \u4E0D\u5B58\u5728`);return}Xe=i,kt(i),Rt(t,a.apiConfig,g),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${i.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),b("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${i}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};n.on("click",function(i){i.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",i=>{if(e(i.target).hasClass("yyt-option-star"))return;let a=e(i.currentTarget),l=a.data("value"),c=a.find(".yyt-option-text").text();Xe=String(l||"").trim(),r.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),a.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${g}-load-preset`).on("click",()=>{o()}),s.find(".yyt-option-star").on("click",i=>{i.preventDefault(),i.stopPropagation();let a=e(i.currentTarget).data("preset");if(!a)return;let l=ir(a);if(l.success){b("success",l.message);let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else b("error",l.message)}),e(document).on("click.yyt-dropdown",i=>{e(i.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let r=e(s.currentTarget).data("preset-name"),o=e(s.target).closest("[data-action]").data("action");if(o)switch(s.stopPropagation(),o){case"load":t.find(".yyt-select-value").text(r).data("value",r),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${r.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${g}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let i=Fs(r);if(b(i.success?"info":"error",i.message),i.success){Ws(Xe)===r&&(Xe=null);let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${g}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),n=t.find(`#${g}-custom-api-fields`);s?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${g}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${g}-api-key`),n=s.attr("type");s.attr("type",n==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${g}-load-models`).on("click",async()=>{let s=t.find(`#${g}-load-models`),n=t.find(`#${g}-model`),r=t.find(`#${g}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=bt(t,g),i=await rr(o);if(i.length>0){r.empty(),i.forEach(l=>{r.append(`<option value="${S(l)}">${S(l)}</option>`)}),n.hide(),r.show();let a=n.val();a&&i.includes(a)&&r.val(a),r.off("change").on("change",function(){n.val(e(this).val())}),b("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else b("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){b("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${g}-model`).on("focus",function(){let s=t.find(`#${g}-model-select`);e(this).show(),s.hide()}),t.find(`#${g}-save-api-config`).on("click",()=>{let s=bt(t,g),n=Ws(Ks()),r=Wt(s);if(!r.valid&&!s.useMainApi){b("error",r.errors.join(", "));return}if(n){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${n}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){Yt(s),kt(""),Xe="",b("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i);return}Yt(s);let o=or(n,{apiConfig:s});if(o.success){Xe=n,b("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${n}"`),kt(n),k.emit(C.PRESET_UPDATED,{name:n});let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else b("error",o.message);return}Yt(s),b("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${g}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){kt(""),Xe="",Yt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),b("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${g}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${g}-export-presets`).on("click",()=>{try{let s=cr();ct(s,`youyou_toolkit_presets_${Date.now()}.json`),b("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){b("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${g}-import-presets`).on("click",()=>{t.find(`#${g}-import-file`).click()}),t.find(`#${g}-import-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await dt(n),o=dr(r,{overwrite:!0});if(b(o.success?"success":"error",o.message),o.imported>0){let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(r){b("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let n=Vt().map(u=>u.name),r=ur("\u65B0\u9884\u8BBE"),o=`
      <div class="yyt-dialog-overlay" id="${g}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${g}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${g}-dialog-preset-name" 
                     value="${S(r)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${g}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${g}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${g}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e(`#${g}-dialog-overlay`).remove(),t.append(o);let i=e(`#${g}-dialog-overlay`),a=e(`#${g}-dialog-preset-name`),l=e(`#${g}-dialog-preset-desc`);a.focus().select();let c=()=>i.remove();i.find(`#${g}-dialog-close, #${g}-dialog-cancel`).on("click",c),i.on("click",function(u){u.target===this&&c()}),i.find(`#${g}-dialog-save`).on("click",()=>{let u=a.val().trim(),d=l.val().trim();if(!u){b("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(n.includes(u)){if(!confirm(`\u9884\u8BBE "${u}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Fs(u)}let p=bt(t,g),m=Hs({name:u,description:d,apiConfig:p});if(m.success){b("success",m.message),c(),k.emit(C.PRESET_CREATED,{preset:m.preset});let h=t.closest(".yyt-api-manager").parent();h.length&&this.renderTo(h)}else b("error",m.message)}),a.on("keypress",function(u){u.which===13&&i.find(`#${g}-dialog-save`).click()})},destroy(t){let e=Y();!e||!J(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var jo={};ue(jo,{MESSAGE_MACROS:()=>zo,addTagRule:()=>qt,createRuleTemplate:()=>No,default:()=>sl,deleteRulePreset:()=>Uo,deleteRuleTemplate:()=>Lo,deleteTagRule:()=>ms,escapeRegex:()=>Pt,exportRulesConfig:()=>tn,extractComplexTag:()=>Po,extractCurlyBraceTag:()=>hr,extractHtmlFormatTag:()=>Do,extractSimpleTag:()=>mr,extractTagContent:()=>Dt,generateTagSuggestions:()=>Js,getAllRulePresets:()=>Zs,getAllRuleTemplates:()=>$o,getContentBlacklist:()=>$t,getRuleTemplate:()=>Oo,getTagRules:()=>ut,importRulesConfig:()=>sn,isValidTagName:()=>fr,loadRulePreset:()=>en,saveRulesAsPreset:()=>Qs,scanTextForTags:()=>qs,setContentBlacklist:()=>hs,setTagRules:()=>Xs,shouldSkipContent:()=>gr,testRegex:()=>Bo,updateRuleTemplate:()=>Go,updateTagRule:()=>Jt});function el(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...yr],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function ke(){return T.get(ko,el())}function Qe(t){T.set(ko,t)}function Vs(){let t=ke();return _e=t.ruleTemplates||[...yr],te=t.tagRules||[],Me=t.contentBlacklist||[],{ruleTemplates:_e,tagRules:te,contentBlacklist:Me}}function Pt(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function gr(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(n=>{let r=n.trim().toLowerCase();return r&&s.includes(r)})}function fr(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!tl.includes(t.toLowerCase())}function mr(t,e){if(!t||!e)return[];let s=[],n=Pt(e),r=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(r)].forEach(l=>{l[1]&&s.push(l[1].trim())});let i=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,a=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return i>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function hr(t,e){if(!t||!e)return[];let s=[],n=Pt(e),r=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=r.exec(t))!==null;){let i=o.index,a=i+o[0].length,l=1,c=a;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let u=t.substring(a,c-1);u.trim()&&s.push(u.trim())}r.lastIndex=i+1}return s}function Po(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=s[0].trim(),r=s[1].trim(),o=r.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let i=o[1],a=new RegExp(`${Pt(n)}([\\s\\S]*?)<\\/${i}>`,"gi"),l=[];return[...t.matchAll(a)].forEach(u=>{u[1]&&l.push(u[1].trim())}),l}function Do(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=s[1],r=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(c=>{c[1]&&r.push(c[1].trim())});let a=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-l} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),r}function Dt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(u=>u.type==="exclude"&&u.enabled),r=e.filter(u=>(u.type==="include"||u.type==="regex_include")&&u.enabled),o=e.filter(u=>u.type==="regex_exclude"&&u.enabled),i=t;for(let u of n)try{let d=new RegExp(`<${Pt(u.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Pt(u.value)}>`,"gi");i=i.replace(d,"")}catch(d){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:u,error:d})}let a=[];if(r.length>0)for(let u of r){let d=[];try{if(u.type==="include")d.push(...mr(i,u.value)),d.push(...hr(i,u.value));else if(u.type==="regex_include"){let p=new RegExp(u.value,"gi");[...i.matchAll(p)].forEach(h=>{h[1]&&d.push(h[1])})}}catch(p){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:u,error:p})}d.forEach(p=>a.push(p.trim()))}else a.push(i);let l=[];for(let u of a){for(let d of o)try{let p=new RegExp(d.value,"gi");u=u.replace(p,"")}catch(p){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:d,error:p})}gr(u,s)||l.push(u)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function qs(t,e={}){let s=performance.now(),{chunkSize:n=5e4,maxTags:r=100,timeoutMs:o=5e3}=e,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let d=0;d<t.length;d+=n){let p=t.slice(d,Math.min(d+n,t.length));if(c++,l+=p.length,performance.now()-s>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let m;for(;(m=a.exec(p))!==null&&i.size<r;){let h=(m[1]||m[2]).toLowerCase();fr(h)&&i.add(h)}if(i.size>=r)break;c%5===0&&await new Promise(h=>setTimeout(h,0))}let u=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(u-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:i.size}}}function Js(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function $o(){return _e.length===0&&Vs(),_e}function Oo(t){return _e.find(e=>e.id===t)}function No(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return _e.push(e),br(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Go(t,e){let s=_e.findIndex(n=>n.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(_e[s]={..._e[s],...e,updatedAt:new Date().toISOString()},br(),{success:!0,template:_e[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Lo(t){let e=_e.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(_e.splice(e,1),br(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function br(){let t=ke();t.ruleTemplates=_e,Qe(t)}function ut(){return te||Vs(),te}function Xs(t){te=t||[];let e=ke();e.tagRules=te,Qe(e)}function qt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};te.push(e);let s=ke();return s.tagRules=te,Qe(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Jt(t,e){if(t<0||t>=te.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};te[t]={...te[t],...e};let s=ke();return s.tagRules=te,Qe(s),{success:!0,rule:te[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function ms(t){if(t<0||t>=te.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};te.splice(t,1);let e=ke();return e.tagRules=te,Qe(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function $t(){return Me||Vs(),Me}function hs(t){Me=t||[];let e=ke();e.contentBlacklist=Me,Qe(e)}function Qs(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ke();s.tagRulePresets||(s.tagRulePresets={});let n=`preset-${Date.now()}`;return s.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(te)),blacklist:JSON.parse(JSON.stringify(Me)),createdAt:new Date().toISOString()},Qe(s),{success:!0,preset:s.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Zs(){let e=ke().tagRulePresets||{};return Object.values(e)}function en(t){let e=ke(),n=(e.tagRulePresets||{})[t];return n?(te=JSON.parse(JSON.stringify(n.rules||[])),Me=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=te,e.contentBlacklist=Me,Qe(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Uo(t){let e=ke(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,Qe(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function tn(){return JSON.stringify({tagRules:te,contentBlacklist:Me,ruleTemplates:_e,tagRulePresets:ke().tagRulePresets||{}},null,2)}function sn(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)te=s.tagRules||[],Me=s.contentBlacklist||[],_e=s.ruleTemplates||yr;else if(s.tagRules&&te.push(...s.tagRules),s.contentBlacklist){let r=new Set(Me.map(o=>o.toLowerCase()));s.contentBlacklist.forEach(o=>{r.has(o.toLowerCase())||Me.push(o)})}let n=ke();return n.tagRules=te,n.contentBlacklist=Me,n.ruleTemplates=_e,s.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...s.tagRulePresets}),Qe(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Bo(t,e,s="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(t,s),o=[];if(s.includes("g")){let i;for(;(i=r.exec(e))!==null;)i.length>1?o.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[n]||i[1]||i[0]}):o.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=r.exec(e);i&&o.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[n]||i[1]:i[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(i=>i.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var ko,tl,yr,_e,te,Me,zo,sl,nn=F(()=>{Ue();ko="settings";tl=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],yr=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],_e=[],te=[],Me=[];zo={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Vs();sl={extractTagContent:Dt,extractSimpleTag:mr,extractCurlyBraceTag:hr,extractComplexTag:Po,extractHtmlFormatTag:Do,escapeRegex:Pt,shouldSkipContent:gr,isValidTagName:fr,scanTextForTags:qs,generateTagSuggestions:Js,getAllRuleTemplates:$o,getRuleTemplate:Oo,createRuleTemplate:No,updateRuleTemplate:Go,deleteRuleTemplate:Lo,getTagRules:ut,setTagRules:Xs,addTagRule:qt,updateTagRule:Jt,deleteTagRule:ms,getContentBlacklist:$t,setContentBlacklist:hs,saveRulesAsPreset:Qs,getAllRulePresets:Zs,loadRulePreset:en,deleteRulePreset:Uo,exportRulesConfig:tn,importRulesConfig:sn,testRegex:Bo,MESSAGE_MACROS:zo}});var ze,xr=F(()=>{Ee();Je();nn();ze={id:"regexExtractPanel",render(t){let e=ut(),s=$t(),n=Zs();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${g}-show-examples" style="margin-left: auto;">
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
            <button class="yyt-btn yyt-btn-secondary" id="${g}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${g}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${g}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${g}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${g}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${g}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${g}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(t,e,s){let n=t.length>0?t.map((o,i)=>this._renderRuleItem(o,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=s.length>0?s.map(o=>`<option value="${o.id}">${S(o.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${r?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${g}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${r}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${g}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${g}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${g}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${n}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${g}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${g}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${g}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${g}-content-blacklist" 
                 value="${S(e.join(", "))}" 
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
               value="${S(t.value||"")}">
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
          <textarea class="yyt-textarea" id="${g}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${g}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${g}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${g}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${g}-test-result"></div>
        </div>
      </div>
    `},bindEvents(t,e){let s=Y();!s||!J(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val();Jt(n,{type:r}),b("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val().trim();Jt(n,{value:r})}),t.find(".yyt-rule-enabled").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).is(":checked");Jt(n,{enabled:r}),b("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let n=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(ms(n),this.renderTo(t),b("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let r=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(ms(r),this.renderTo(t),b("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${g}-add-rule`).on("click",()=>{qt({type:"include",value:"",enabled:!0}),this.renderTo(t),b("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${g}-scan-tags`).on("click",async()=>{let s=t.find(`#${g}-scan-tags`),n=t.find(`#${g}-test-input`).val();if(!n||!n.trim()){b("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await qs(n,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:i}=Js(r,25);if(o.length===0){b("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${g}-tag-suggestions-container`).hide();return}let a=t.find(`#${g}-tag-list`);t.find(`#${g}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),a.empty(),o.forEach(c=>{let u=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${S(c)}</button>`);u.on("click",()=>{if(ut().some(m=>m.type==="include"&&m.value===c)){b("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}qt({type:"include",value:c,enabled:!0}),this.renderTo(t),b("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),a.append(u)}),t.find(`#${g}-tag-suggestions-container`).show(),b("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(r){b("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${g}-add-exclude-cot`).on("click",()=>{let s=ut(),n="<!--[\\s\\S]*?-->";if(s.some(o=>o.type==="regex_exclude"&&o.value===n)){b("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}qt({type:"regex_exclude",value:n,enabled:!0}),this.renderTo(t),b("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${g}-content-blacklist`).on("change",function(){let n=e(this).val().split(",").map(r=>r.trim()).filter(r=>r);hs(n),b("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${n.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${g}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.find(`#${g}-load-rule-preset`).on("click",()=>{let s=t.find(`#${g}-rule-preset-select`).val();if(!s){b("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let n=en(s);n.success?(this.renderTo(t),b("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${n.preset.name}`),k.emit(C.REGEX_PRESET_LOADED,{preset:n.preset})):b("error",n.message)}),t.find(`#${g}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let n=Qs(s.trim());n.success?(this.renderTo(t),b("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):b("error",n.message)})},_bindTestEvents(t,e){t.find(`#${g}-test-extract`).on("click",()=>{let s=t.find(`#${g}-test-input`).val();if(!s||!s.trim()){b("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let n=ut(),r=$t(),o=Dt(s,n,r),i=t.find(`#${g}-test-result-container`),a=t.find(`#${g}-test-result`);i.show(),!o||!o.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),b("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${S(o)}</pre>`),b("success","\u63D0\u53D6\u5B8C\u6210"),k.emit(C.REGEX_EXTRACTED,{result:o}))}),t.find(`#${g}-test-clear`).on("click",()=>{t.find(`#${g}-test-input`).val(""),t.find(`#${g}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${g}-import-rules`).on("click",()=>{t.find(`#${g}-import-rules-file`).click()}),t.find(`#${g}-import-rules-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await dt(n),o=sn(r,{overwrite:!0});o.success?(this.renderTo(t),b("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):b("error",o.message)}catch(r){b("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find(`#${g}-export-rules`).on("click",()=>{try{let s=tn();ct(s,`youyou_toolkit_rules_${Date.now()}.json`),b("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){b("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${g}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(Xs([]),hs([]),this.renderTo(t),b("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!Y()||!J(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Ho={};ue(Ho,{DEFAULT_TOOL_PRESETS:()=>Ze,DEFAULT_TOOL_STRUCTURE:()=>we,TOOL_STORAGE_KEYS:()=>Z,cloneTool:()=>ol,createDefaultToolDefinition:()=>bs,deleteTool:()=>Sr,deleteToolPreset:()=>ll,exportTools:()=>_r,getAllToolPresets:()=>Er,getAllTools:()=>Ot,getCurrentToolPresetId:()=>cl,getTool:()=>Qt,getToolPreset:()=>il,importTools:()=>wr,normalizeToolDefinitionToRuntimeConfig:()=>rn,resetTools:()=>Ar,saveTool:()=>on,saveToolPreset:()=>al,setCurrentToolPreset:()=>dl,setToolEnabled:()=>Tr,validateTool:()=>ul});function Xt(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function vr(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function nl(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function rl(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let n=nl(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function bs(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...we,...t,id:t?.id||we.id,icon:t?.icon||we.icon,order:Number.isFinite(t?.order)?t.order:we.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:we.promptTemplate,extractTags:Xt(t?.extractTags),config:{...we.config,...s,trigger:{...we.config.trigger,...s.trigger||{},events:Xt(s?.trigger?.events)},execution:{...we.config.execution,...s.execution||{},timeout:vr(s?.execution?.timeout,we.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||we.config.execution.retries)},api:{...we.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...we.config.context,...s.context||{},depth:vr(s?.context?.depth,we.config.context.depth),includeTags:Xt(s?.context?.includeTags),excludeTags:Xt(s?.context?.excludeTags)}},enabled:t?.enabled!==!1,metadata:{...we.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function rn(t,e={},s={}){let n=bs({...e,id:t||e?.id||""}),r=Xt(n?.config?.trigger?.events),o=Xt(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),i=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),a=rl(t,n),l=r[0]||"GENERATION_ENDED",c=r.includes("GENERATION_ENDED"),u=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,trigger:{event:l,enabled:c},bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:u,apiPreset:i,overwrite:!0,enabled:u==="post_response_api"?c:!1},extraction:{enabled:!0,maxMessages:vr(n?.config?.context?.depth,5),selectors:o},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:i,extractTags:o,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function Ot(){let t=q.get(Z.TOOLS),e=t&&typeof t=="object"?{...Ze,...t}:{...Ze};return Object.fromEntries(Object.entries(e).map(([s,n])=>[s,bs({...n||{},id:s})]))}function Qt(t){return Ot()[t]||null}function on(t,e){if(!t||!e)return!1;let s=q.get(Z.TOOLS)||{},n=!s[t]&&!Ze[t],r=bs({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=r,q.set(Z.TOOLS,s),k.emit(n?C.TOOL_REGISTERED:C.TOOL_UPDATED,{toolId:t,tool:r}),!0}function Sr(t){if(Ze[t])return!1;let e=q.get(Z.TOOLS)||{};return e[t]?(delete e[t],q.set(Z.TOOLS,e),k.emit(C.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function Tr(t,e){let s=Qt(t);if(!s)return!1;let n=q.get(Z.TOOLS)||{};return n[t]||(n[t]={...s}),n[t].enabled=e,n[t].metadata={...n[t].metadata,updatedAt:new Date().toISOString()},q.set(Z.TOOLS,n),k.emit(e?C.TOOL_ENABLED:C.TOOL_DISABLED,{toolId:t}),!0}function ol(t,e,s){let n=Qt(t);if(!n)return!1;let r=JSON.parse(JSON.stringify(n));return r.name=s||`${n.name} (\u526F\u672C)`,r.metadata={...r.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},on(e,r)}function Er(){let t=q.get(Z.PRESETS);return t&&typeof t=="object"?{...Ze,...t}:{...Ze}}function il(t){return Er()[t]||null}function al(t,e){if(!t||!e)return!1;let s=q.get(Z.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},q.set(Z.PRESETS,s),!0}function ll(t){if(Ze[t])return!1;let e=q.get(Z.PRESETS)||{};return e[t]?(delete e[t],q.set(Z.PRESETS,e),!0):!1}function cl(){return q.get(Z.CURRENT_PRESET)||null}function dl(t){return Er()[t]?(q.set(Z.CURRENT_PRESET,t),!0):!1}function _r(){let t=q.get(Z.TOOLS)||{},e=q.get(Z.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function wr(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=s?{}:q.get(Z.TOOLS)||{},o=s?{}:q.get(Z.PRESETS)||{},i=0,a=0;if(n.tools&&typeof n.tools=="object"){for(let[l,c]of Object.entries(n.tools))Ze[l]&&!s||c&&typeof c=="object"&&(r[l]=bs({...c,id:l}),i++);q.set(Z.TOOLS,r)}if(n.presets&&typeof n.presets=="object"){for(let[l,c]of Object.entries(n.presets))Ze[l]&&!s||c&&typeof c=="object"&&(o[l]=c,a++);q.set(Z.PRESETS,o)}return{success:!0,toolsImported:i,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Ar(){q.remove(Z.TOOLS),q.remove(Z.PRESETS),q.remove(Z.CURRENT_PRESET)}function ul(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:n,api:r,context:o}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),n&&((typeof n.timeout!="number"||n.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof n.retries!="number"||n.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var we,Ze,Z,an=F(()=>{Ue();Ee();we={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Ze={},Z={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var ii={};ue(ii,{TOOL_CATEGORIES:()=>Fo,TOOL_REGISTRY:()=>Zt,appendToolRuntimeHistory:()=>Ts,clearToolApiPreset:()=>Zo,default:()=>xl,ensureToolRuntimeConfig:()=>cn,getAllDefaultToolConfigs:()=>ni,getAllToolApiBindings:()=>ei,getAllToolFullConfigs:()=>Pr,getEnabledTools:()=>ts,getToolApiPreset:()=>Cr,getToolBaseConfig:()=>ln,getToolConfig:()=>Ss,getToolFullConfig:()=>ie,getToolList:()=>qo,getToolSubTabs:()=>Jo,getToolWindowState:()=>oi,hasTool:()=>Mr,onPresetDeleted:()=>ti,patchToolRuntime:()=>es,registerTool:()=>Wo,resetToolConfig:()=>si,resetToolRegistry:()=>Xo,saveToolConfig:()=>tt,saveToolWindowState:()=>ri,setToolApiPreset:()=>Qo,setToolApiPresetConfig:()=>ml,setToolBypassConfig:()=>hl,setToolOutputMode:()=>fl,setToolPromptTemplate:()=>bl,unregisterTool:()=>Vo,updateToolRuntime:()=>kr});function xs(t={}){let e=Array.isArray(t?.recentTriggerHistory)?t.recentTriggerHistory.filter(Boolean):[],s=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0,lastTriggerAt:0,lastTriggerEvent:"",lastMessageKey:"",lastSkipReason:"",lastExecutionPath:"",lastWritebackStatus:"",lastFailureStage:"",lastTraceId:"",...t,recentTriggerHistory:e,recentWritebackHistory:s}}function pl(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Ko(){let t=Ot()||{};return Object.entries(t).filter(([e])=>!vs[e]).map(([e,s])=>[e,s||{}])}function Yo(){let t=Array.isArray(Zt.tools?.subTabs)?[...Zt.tools.subTabs]:[],e=Ko().map(([s,n],r)=>{let o=rn(s,n);return{id:s,name:o.name||s,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+r,isCustom:!0,description:o.description||""}});return[...t,...e].sort((s,n)=>(s.order??0)-(n.order??0))}function yl(t,e={}){let s=rn(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:xs(s.runtime)}}function Rr(t){let e=vs[t];if(e)return{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:xs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=(Ot()||{})[t]||null;return n?yl(t,n):Ss(t)}function ln(t){let e=Rr(t);return e?{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function gl(t,e={},s=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.trigger={...t.trigger||{},...e.trigger||{}},n.output={...t.output||{},...e.output||{}},n.bypass={...t.bypass||{},...e.bypass||{}},n.runtime=xs({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}};let r=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||s||"";return n.output={...n.output||{},apiPreset:r},n.apiPreset=r,(!Array.isArray(n.extraction.selectors)||n.extraction.selectors.length===0)&&Array.isArray(n.extractTags)&&n.extractTags.length>0&&(n.extraction.selectors=[...n.extractTags]),(!Array.isArray(n.extractTags)||n.extractTags.length===0)&&(n.extractTags=Array.isArray(n.extraction.selectors)?[...n.extraction.selectors]:[]),t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function Wo(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let n of s)if(!e[n])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return et[t]={id:t,...e,order:e.order??Object.keys(et).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Vo(t){return et[t]?(delete et[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function qo(t=!0){let e=Object.values(et).map(s=>s.id==="tools"?{...s,subTabs:Yo()}:s);return t?e.sort((s,n)=>(s.order??0)-(n.order??0)):e}function Ss(t){return t==="tools"&&et[t]?{...et[t],subTabs:Yo()}:et[t]||null}function Mr(t){return!!et[t]}function Jo(t){let e=Ss(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Xo(){et={...Zt},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Qo(t,e){if(!Mr(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=T.get(Ge)||{};return s[t]=e||"",T.set(Ge,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Cr(t){return(T.get(Ge)||{})[t]||""}function Zo(t){let e=T.get(Ge)||{};delete e[t],T.set(Ge,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function ei(){return T.get(Ge)||{}}function ti(t){let e=T.get(Ge)||{},s=!1;for(let n in e)e[n]===t&&(e[n]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&T.set(Ge,e)}function ie(t){let e=Rr(t);if(!e)return Ss(t);let n=(T.get(Nt)||{})[t]||{},r=Cr(t);return gl({...e,id:t},n,r)}function cn(t){if(!t)return!1;let e=Rr(t);if(!e)return!1;let s=T.get(Nt)||{};if(s[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};s[t]=n,T.set(Nt,s);let r=T.get(Ge)||{};return r[t]=n.output?.apiPreset||n.apiPreset||"",T.set(Ge,r),k.emit(C.TOOL_UPDATED,{toolId:t,config:n}),!0}function tt(t,e,s={}){if(!t||!ie(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=s,r=T.get(Nt)||{},o=T.get(Ge)||{},i=e?.output?.apiPreset??e?.apiPreset??"",a=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return r[t]={},a.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){r[t][l]={...e.output,apiPreset:i};return}if(l==="apiPreset"){r[t][l]=i;return}r[t][l]=e[l]}}),r[t].apiPreset===void 0&&(r[t].apiPreset=i),!r[t].output&&e.output!==void 0&&(r[t].output={...e.output||{},apiPreset:i}),T.set(Nt,r),o[t]=i,T.set(Ge,o),n&&k.emit(C.TOOL_UPDATED,{toolId:t,config:r[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function fl(t,e){let s=ie(t);return s?tt(t,{...s,output:{...s.output,mode:e}}):!1}function ml(t,e){let s=ie(t);return s?tt(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function hl(t,e){let s=ie(t);return s?tt(t,{...s,bypass:{...s.bypass,...e}}):!1}function bl(t,e){let s=ie(t);return s?tt(t,{...s,promptTemplate:e}):!1}function es(t,e,s={}){let n=ie(t);if(!n)return!1;let{touchLastRunAt:r=!1,emitEvent:o=!1}=s,i=xs({...n.runtime||{},...e||{}});return r&&(i.lastRunAt=Date.now()),tt(t,{...n,runtime:i},{emitEvent:o})}function Ts(t,e,s={},n={}){let r=ie(t);if(!r)return!1;let{limit:o=10,emitEvent:i=!1}=n,a=xs(r.runtime||{}),l=e==="writeback"?"recentWritebackHistory":"recentTriggerHistory",c={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return a[l]=pl([...Array.isArray(a[l])?a[l]:[],c],o),c?.traceId&&(a.lastTraceId=c.traceId),tt(t,{...r,runtime:a},{emitEvent:i})}function kr(t,e){return es(t,e,{touchLastRunAt:!0,emitEvent:!0})}function si(t){if(!t||!vs[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=T.get(Nt)||{};return delete e[t],T.set(Nt,e),k.emit(C.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function ni(){return{...vs}}function Pr(){let t=new Set([...Object.keys(vs),...Ko().map(([e])=>e)]);return Array.from(t).map(e=>ie(e)).filter(Boolean)}function ts(){return Pr().filter(t=>t&&t.enabled)}function ri(t,e){let s=T.get(Ir)||{};s[t]={...e,updatedAt:Date.now()},T.set(Ir,s)}function oi(t){return(T.get(Ir)||{})[t]||null}var Nt,Ge,Ir,vs,Zt,Fo,et,xl,ss=F(()=>{Ue();Ee();an();Nt="tool_configs",Ge="tool_api_bindings",Ir="tool_window_states";vs={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},Zt={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},Fo={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},et={...Zt};xl={TOOL_REGISTRY:Zt,TOOL_CATEGORIES:Fo,registerTool:Wo,unregisterTool:Vo,getToolList:qo,getToolConfig:Ss,hasTool:Mr,getToolSubTabs:Jo,resetToolRegistry:Xo,setToolApiPreset:Qo,getToolApiPreset:Cr,clearToolApiPreset:Zo,getAllToolApiBindings:ei,onPresetDeleted:ti,saveToolWindowState:ri,getToolWindowState:oi,getToolBaseConfig:ln,ensureToolRuntimeConfig:cn,getToolFullConfig:ie,patchToolRuntime:es,appendToolRuntimeHistory:Ts,saveToolConfig:tt,resetToolConfig:si,getAllDefaultToolConfigs:ni,getAllToolFullConfigs:Pr,getEnabledTools:ts}});var je,Dr=F(()=>{Je();an();ss();je={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){b("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=Ot(),s=Object.entries(e),n=s.filter(([,r])=>r?.enabled!==!1).length;return`
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
            <span class="yyt-tool-name">${S(n.name)}</span>
            <span class="yyt-tool-category">${S(n.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${n.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${S(n.description)}</div>
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
      `},bindEvents(t,e){let s=Y();!s||!J(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item"),r=n.data("tool-id"),o=e(s.currentTarget).is(":checked");Tr(r,o),n.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),b("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(n)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,n)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),r=Qt(n);if(!n||!r||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${r.name}\u201D\u5417\uFF1F`))return;if(!Sr(n)){b("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),b("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await dt(n),o=wr(r,{overwrite:!1});b(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(r){b("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=_r();ct(s,`youyou_toolkit_tools_${Date.now()}.json`),b("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){b("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Ar(),this.renderTo(t),b("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let n=s?Qt(s):null,r=!!n,o=`
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
                       value="${n?S(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${n?S(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(o);let i=e("#yyt-tool-dialog-overlay"),a=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),i.on("click",function(l){l.target===this&&a()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),u=e("#yyt-tool-desc").val().trim(),d=parseInt(e("#yyt-tool-timeout").val())||6e4,p=parseInt(e("#yyt-tool-retries").val())||3;if(!l){b("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let m=s||`tool_${Date.now()}`;if(!on(m,{name:l,category:c,description:u,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{trigger:n?.config?.trigger||{type:"manual",events:[]},execution:{timeout:d,retries:p},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]}},enabled:n?.enabled!==!1})){b("error",r?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}cn(m),a(),this.renderTo(t),b("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),r||this._openToolConfig(m)})},destroy(t){!Y()||!J(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var ai={};ue(ai,{BypassManager:()=>dn,DEFAULT_BYPASS_PRESETS:()=>yt,addMessage:()=>Cl,buildBypassMessages:()=>Ol,bypassManager:()=>z,createPreset:()=>El,default:()=>Nl,deleteMessage:()=>Pl,deletePreset:()=>wl,duplicatePreset:()=>Al,exportPresets:()=>Dl,getAllPresets:()=>Sl,getDefaultPresetId:()=>Il,getEnabledMessages:()=>Ml,getPreset:()=>Tl,getPresetList:()=>Or,importPresets:()=>$l,setDefaultPresetId:()=>Rl,updateMessage:()=>kl,updatePreset:()=>_l});var pt,ns,$r,yt,vl,dn,z,Sl,Or,Tl,El,_l,wl,Al,Il,Rl,Ml,Cl,kl,Pl,Dl,$l,Ol,Nl,Es=F(()=>{Ue();Ee();pt="bypass_presets",ns="default_bypass_preset",$r="current_bypass_preset",yt={},vl=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),dn=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=T.get(pt,{});return this._cache={...yt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,n)=>(n.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:n,description:r,messages:o}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=s.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:n.trim(),description:r||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),k.emit(C.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...n,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,r),k.emit(C.BYPASS_PRESET_UPDATED,{presetId:e,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(yt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=T.get(pt,{});return delete n[e],T.set(pt,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),k.emit(C.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,n){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),id:s.trim(),name:n||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),o),k.emit(C.BYPASS_PRESET_CREATED,{presetId:s,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},o=[...n.messages||[],r];return this.updatePreset(e,{messages:o})}updateMessage(e,s,n){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=r.messages||[],i=o.findIndex(l=>l.id===s);if(i===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let a=[...o];return a[i]={...a[i],...n},this.updatePreset(e,{messages:a})}deleteMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=n.messages||[],o=r.find(a=>a.id===s);if(!o)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=r.filter(a=>a.id!==s);return this.updatePreset(e,{messages:i})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=T.get(ns,null);return e==="undefined"||e==="null"||e===""?(T.remove(ns),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(T.set(ns,e),k.emit(C.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:n=!1}=s,r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(r)?r:r.presets?r.presets:[r];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=T.get(pt,{}),a=0;for(let l of o)!l.id||typeof l.id!="string"||l.name&&(yt[l.id]&&!n||!n&&i[l.id]||(i[l.id]={...l,updatedAt:Date.now()},a++));return a>0&&(T.set(pt,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let n=T.get(pt,{});n[e]=s,T.set(pt,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=T.get(pt,{}),s={},n=!1,r=Array.isArray(e)?e.map((o,i)=>[o?.id||o?.name||`legacy_${i}`,o]):Object.entries(e||{});for(let[o,i]of r){let a=this._normalizePreset(o,i,s);if(!a){n=!0;continue}s[a.id]=a,(!e?.[a.id]||e?.[a.id]?.id!==a.id)&&(n=!0)}n&&T.set(pt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,n={}){if(!s||typeof s!="object")return null;let r=typeof s.name=="string"?s.name.trim():"",o=typeof s.id=="string"?s.id.trim():"",i=typeof e=="string"?e.trim():"";if(!r&&i&&i!=="undefined"&&i!=="null"&&(r=i),this._isLegacySamplePreset(r,o)||(!o&&i&&i!=="undefined"&&i!=="null"&&(o=i),!o&&r&&r!=="undefined"&&r!=="null"&&(o=this._generatePresetId(r,n)),!r||!o||o==="undefined"||r==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,u)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${o}_msg_${u+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:o,name:r,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=T.get(ns,null),n=T.get($r,null),r=s??n;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!e[r]&&(r=Object.values(e).find(i=>i.name===r)?.id||null),r?T.set(ns,r):T.remove(ns),T.has($r)&&T.remove($r)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||vl.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=n,o=1;for(;s[r];)r=`${n}_${o++}`;return r}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},z=new dn,Sl=()=>z.getAllPresets(),Or=()=>z.getPresetList(),Tl=t=>z.getPreset(t),El=t=>z.createPreset(t),_l=(t,e)=>z.updatePreset(t,e),wl=t=>z.deletePreset(t),Al=(t,e,s)=>z.duplicatePreset(t,e,s),Il=()=>z.getDefaultPresetId(),Rl=t=>z.setDefaultPresetId(t),Ml=t=>z.getEnabledMessages(t),Cl=(t,e)=>z.addMessage(t,e),kl=(t,e,s)=>z.updateMessage(t,e,s),Pl=(t,e)=>z.deleteMessage(t,e),Dl=t=>z.exportPresets(t),$l=(t,e)=>z.importPresets(t,e),Ol=t=>z.buildBypassMessages(t),Nl=z});var li={};ue(li,{DEFAULT_SETTINGS:()=>_s,SettingsService:()=>un,default:()=>Gl,settingsService:()=>Pe});var _s,Nr,un,Pe,Gl,ws=F(()=>{Ue();Ee();_s={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!1,debounceMs:300,useMessageReceivedFallback:!0,useGenerationAfterCommandsFallback:!0,messageSessionWindowMs:1800,historyRetentionLimit:10},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},Nr="settings_v2",un=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=T.get(Nr,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),T.set(Nr,this._cache),k.emit(C.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),n=this._deepMerge(s,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(_s)),T.set(Nr,this._cache),k.emit(C.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let n=this.getSettings(),r=e.split("."),o=n;for(let i of r)if(o&&typeof o=="object"&&i in o)o=o[i];else return s;return o}set(e,s){let n=JSON.parse(JSON.stringify(this.getSettings())),r=e.split("."),o=n;for(let i=0;i<r.length-1;i++){let a=r[i];a in o||(o[a]={}),o=o[a]}o[r[r.length-1]]=s,this.saveSettings(n)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(_s)),e)}_deepMerge(e,s){let n={...e};for(let r in s)s[r]&&typeof s[r]=="object"&&!Array.isArray(s[r])?n[r]=this._deepMerge(e[r]||{},s[r]):n[r]=s[r];return n}},Pe=new un,Gl=Pe});var di={};ue(di,{ContextInjector:()=>gn,DEFAULT_INJECTION_OPTIONS:()=>ci,WRITEBACK_METHODS:()=>As,WRITEBACK_RESULT_STATUS:()=>yn,contextInjector:()=>fn,default:()=>Ll});var He,pn,ci,yn,As,gn,fn,Ll,Gr=F(()=>{Ee();He="YouYouToolkit_toolOutputs",pn="YouYouToolkit_injectedContext",ci={overwrite:!0,enabled:!0},yn={SUCCESS:"success",FAILED:"failed"},As={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},gn=class{constructor(){this.debugMode=!1}async inject(e,s,n={}){return(await this.injectDetailed(e,s,n)).success}async injectDetailed(e,s,n={}){let r={...ci,...n},o=this._createWritebackResult(e,r);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;let i=o.chatId,a={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:n.sourceMessageId||null,options:r};k.emit(C.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:i,content:a.content,options:r});let l=await this._insertToolOutputToLatestAssistantMessage(e,a,r,o);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${i}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),n=this._findAssistantMessageIndex(s,e);if(n<0)return"";let r=s[n]||{},o=r[pn];if(typeof o=="string"&&o.trim())return o.trim();let i=r[He];return i&&typeof i=="object"?this._buildMessageInjectedContext(i).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let r=(e[s]||{})[He];return r&&typeof r=="object"?r:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:n}=this._getChatRuntime(),r=this._findAssistantMessageIndex(n,null);return r<0?null:n[r]?.[He]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:n,context:r,chat:o}=this._getChatRuntime(),i=this._findAssistantMessageIndex(o,null);if(i<0)return!1;let a=o[i],l=a?.[He];if(!l||!l[s])return!1;delete l[s],a[He]=l,a[pn]=this._buildMessageInjectedContext(l);let c=r?.saveChat||n?.saveChat||null;return typeof c=="function"&&await c.call(r||n),k.emit(C.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(n){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",n),!1}}async clearAllContext(e){try{let{api:s,context:n,chat:r}=this._getChatRuntime(),o=this._findAssistantMessageIndex(r,null);if(o<0)return!1;let i=r[o];delete i[He],delete i[pn];let a=n?.saveChat||s?.saveChat||null;return typeof a=="function"&&await a.call(n||s),k.emit(C.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),n=Object.entries(s).map(([r,o])=>({toolId:r,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,n=s?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(s?.chat)?s.chat:[],i=r.length?r:o;return{topWindow:e,api:s,context:n,chat:i,contextChat:r,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:As.NONE,writebackStatus:yn.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1},verification:{textIncludesContent:!1,mirrorStored:!1}}}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let n=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,s){let n=String(e||""),r=String(s||"").trim();return r?n.includes(r)?{text:n.replace(r,"").trimEnd(),removed:!0}:{text:n,removed:!1}:{text:n,removed:!1}}_syncMessageToRuntimeChats(e,s,n){let{contextChat:r,apiChat:o}=e||{},i=a=>{!Array.isArray(a)||s<0||s>=a.length||a[s]!==n&&(a[s]={...a[s]||{},...n})};i(r),i(o)}_notifyMessageUpdated(e,s){try{let{api:n,topWindow:r}=e||{},o=n?.eventSource||null,a=(n?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";o&&typeof o.emit=="function"&&(o.emit(a,s),typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(()=>{o.emit(a,s)}):typeof r?.setTimeout=="function"&&r.setTimeout(()=>{o.emit(a,s)},30))}catch(n){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",n)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let r=(o,i)=>{if(!this._isAssistantMessage(o)||s==null||s==="")return!1;let a=String(s).trim();return a?[o.message_id,o.id,o.messageId,o.mes_id,o.swipe_id,i].map(c=>c==null?"":String(c).trim()).includes(a):!1};for(let o=n.length-1;o>=0;o-=1)if(r(n[o],o))return o;for(let o=n.length-1;o>=0;o-=1)if(this._isAssistantMessage(n[o]))return o;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).sort(([,o],[,i])=>(o?.updatedAt||0)-(i?.updatedAt||0));if(!n.length)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,i]of n)r.push(`[${o}]`),r.push(i?.content||""),r.push("");return r.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let n of s)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,s){let n=e&&typeof e=="object"?e:{},r=["mes","message","content","text"],o=!1;return r.forEach(i=>{typeof n[i]=="string"&&(n[i]=s,o=!0)}),o||(n.mes=s,n.message=s),n}_stripExistingToolOutput(e,s=[]){let n=String(e||"");return(Array.isArray(s)?s:[]).forEach(o=>{let i=String(o||"").trim();if(!i)return;if(i.startsWith("regex:")){try{let u=new RegExp(i.slice(6).trim(),"gis");n=n.replace(u,"")}catch(u){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",i,u)}return}let a=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${a}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${a}>\\s*`,"gi"),c=new RegExp(`\\{${a}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(l,""),n=n.replace(c,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,s){let n=String(e||""),r=String(s||"").trim();return r?n.replace(r,"").trimEnd():n.trimEnd()}async _insertToolOutputToLatestAssistantMessage(e,s,n={},r=null){let o=r||this._createWritebackResult(e,n);try{let i=this._getChatRuntime(),{api:a,context:l,chat:c}=i;if(!Array.isArray(c)||!c.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let u=this._findAssistantMessageIndex(c,n.sourceMessageId);if(u<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;o.messageIndex=u,o.steps.foundTargetMessage=!0;let d=c[u],{key:p,text:m}=this._getWritableMessageField(d);o.textField=p;let h=d[He]&&typeof d[He]=="object"?d[He]:{},_=h?.[e]||{},v=_?.content||"",P=_?.blockText||v||"",re=Object.entries(h).filter(([f])=>f!==e).map(([,f])=>f||{}),oe=String(s.content||"").trim(),ye=this._inferBlockType(oe),le={toolId:e,messageId:n.sourceMessageId||d?.message_id||d?.messageId||u,blockType:ye,insertedAt:s.updatedAt,replaceable:n.overwrite!==!1};o.blockIdentity=le;let $e=n.overwrite===!1?{text:String(m||""),removed:!1}:this._stripExactStoredBlock(m,P),M=$e.text,D="";n.overwrite!==!1&&P&&!$e.removed&&(D="previous_block_not_found");let B=n.overwrite===!1?M:this._stripExistingToolOutput(M,n.extractionSelectors),G=B!==M;M=B;let V=n.overwrite===!1?M:this._stripPreviousStoredToolContent(M,v),me=V!==M;M=V,o.replacedExistingBlock=$e.removed||G||me;let be=[(n.overwrite===!1?String(m||""):M).trimEnd(),oe].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!oe;let Oe=re.every(f=>{let A=String(f?.blockText||f?.content||"").trim();return A?be.includes(A):!0});o.preservedOtherToolBlocks=Oe,Oe?D&&(o.conflictDetected=!0,o.conflictReason=D):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let Le={...h,[e]:{toolId:e,content:oe,blockText:oe,blockType:ye,blockIdentity:le,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};d[p]=be,this._applyMessageText(d,be),d[He]=Le,d[pn]=this._buildMessageInjectedContext(Le),o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(i,u,d),o.steps.runtimeSynced=!0;let ot=l?.setChatMessages||a?.setChatMessages||i?.topWindow?.setChatMessages||null,Ne=l?.setChatMessage||a?.setChatMessage||i?.topWindow?.setChatMessage||null,it=!1;if(typeof ot=="function")try{await ot.call(l||a||i?.topWindow,[{message_id:u,message:be,mes:be,content:be,text:be}],{refresh:"affected"}),o.steps.hostSetChatMessages=!0,o.hostUpdateMethod=As.SET_CHAT_MESSAGES,it=!0}catch(f){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",f),o.errors.push(`setChatMessages: ${f?.message||String(f)}`)}if(!it&&typeof Ne=="function")try{await Ne.call(l||a||i?.topWindow,{message:be,mes:be,content:be,text:be},u),o.steps.hostSetChatMessage=!0,o.hostUpdateMethod=As.SET_CHAT_MESSAGE,it=!0}catch(f){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",f),o.errors.push(`setChatMessage: ${f?.message||String(f)}`)}if(it||(o.hostUpdateMethod=As.LOCAL_ONLY),typeof Ne=="function")try{await Ne.call(l||a||i?.topWindow,{},u)}catch(f){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",f),o.errors.push(`setChatMessage(refresh): ${f?.message||String(f)}`)}let ce=l?.saveChat||a?.saveChat||null,de=l?.saveChatDebounced||a?.saveChatDebounced||null;typeof de=="function"&&(de.call(l||a),o.steps.saveChatDebounced=!0),typeof ce=="function"&&(await ce.call(l||a),o.steps.saveChat=!0),this._notifyMessageUpdated(i,u),o.steps.notifiedMessageUpdated=!0;let at=i?.contextChat?.[u]||i?.apiChat?.[u]||c[u]||d,Kt=this._getWritableMessageField(at).text||"",Ve=String(s.content||"").trim(),y=at?.[He]?.[e];return o.verification.textIncludesContent=Ve?Kt.includes(Ve):!0,o.verification.mirrorStored=!!(y&&String(y.content||"").trim()===Ve),o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite,o.writebackStatus=o.success?yn.SUCCESS:yn.FAILED,!o.success&&!o.error&&(o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587: ${e} -> #${u}`),o}catch(i){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",i),o.error=i?.message||String(i),o.errors.push(o.error),o}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),r=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(i=>typeof i=="string"&&i.trim());if(r)return r;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},fn=new gn,Ll=fn});var pi={};ue(pi,{BUILTIN_VARIABLES:()=>ui,VariableResolver:()=>mn,default:()=>Ul,variableResolver:()=>vt});var ui,mn,vt,Ul,Lr=F(()=>{Ee();ui={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},mn=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,s),n=this._resolveCustomVariables(n,s),n=this._resolveRegexVariables(n,s),n}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>this.resolveObject(r,s));let n={};for(let[r,o]of Object.entries(e))typeof o=="string"?n[r]=this.resolveTemplate(o,s):typeof o=="object"&&o!==null?n[r]=this.resolveObject(o,s):n[r]=o;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(ui))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,n]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let r of this.getAvailableVariables())n[r.category]||(n[r.category]=[]),n[r.category].push(r);for(let[r,o]of Object.entries(s))if(n[r]&&n[r].length>0){e.push(`\u3010${o}\u3011`);for(let i of n[r])e.push(`  ${i.name} - ${i.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let r=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(r)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let r=s.characterCard||s.raw?.characterCard;return r?this._formatCharacterCard(r):""}),n=n.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),n=n.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,s){let n=e;for(let[r,o]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(i,()=>{try{return o(s)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,a),""}}):n=n.replace(i,String(o))}return n}_resolveRegexVariables(e,s){let n=e;for(let[r,o]of this.variableHandlers){let i=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");n=n.replace(i,(a,l)=>{try{return o(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${l}:`,c),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let n=s.role||"unknown",r=s.content||s.mes||"";return`[${n}]: ${r}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},vt=new mn,Ul=vt});var gi={};ue(gi,{DEFAULT_PROMPT_TEMPLATE:()=>yi,ToolPromptService:()=>hn,default:()=>Bl,toolPromptService:()=>bn});var yi,hn,bn,Bl,Ur=F(()=>{Ee();Es();Lr();yi="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",hn=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let n=this._getPromptTemplate(e),r=vt.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),o=vt.resolveTemplate(n,r).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return vt.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:o,toolContentMacro:i})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],r=this._buildVariableContext(e,s),o=this._getBypassMessages(e);if(o&&o.length>0)for(let a of o)a.enabled!==!1&&n.push({role:this._normalizeRole(a.role),content:vt.resolveTemplate(a.content||"",r)});let i=this._buildUserContent(this._getPromptTemplate(e),r);return i&&n.push({role:"user",content:i}),this._log(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:yi}_getBypassMessages(e){return e.bypass?.enabled?z.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":vt.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},bn=new hn,Bl=bn});var fi={};ue(fi,{LEGACY_OUTPUT_MODES:()=>zl,OUTPUT_MODES:()=>St,TOOL_FAILURE_STAGES:()=>Fe,TOOL_RUNTIME_STATUS:()=>jl,TOOL_WRITEBACK_STATUS:()=>X,ToolOutputService:()=>xn,default:()=>Hl,toolOutputService:()=>rs});var St,zl,jl,Fe,X,xn,rs,Hl,Br=F(()=>{Ee();ws();Gr();Ur();nn();Bs();St={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},zl={inline:"follow_ai"},jl={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Fe={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},X={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"},xn=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===St.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===St.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let n=Date.now(),r=e.id,o=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,i=s?.sessionKey||"",a=this._getExtractionSelectors(e),l=e.output?.apiPreset||e.apiPreset||"",c="",u=X.NOT_APPLICABLE,d=null,p=[],m="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),k.emit(C.TOOL_EXECUTION_STARTED,{toolId:r,traceId:o,sessionKey:i,mode:St.POST_RESPONSE_API});try{if(c=Fe.BUILD_MESSAGES,p=await this._buildToolMessages(e,s),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let h=await this._getRequestTimeout();c=Fe.SEND_API_REQUEST;let _=await this._sendApiRequest(l,p,{timeoutMs:h,signal:s.signal});if(c=Fe.EXTRACT_OUTPUT,m=this._extractOutputContent(_,e),m){if(c=Fe.INJECT_CONTEXT,d=await fn.injectDetailed(r,m,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.messageId||"",extractionSelectors:a,traceId:o,sessionKey:i}),!d?.success)throw u=X.FAILED,new Error(d?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=X.SUCCESS}else u=X.SKIPPED_EMPTY_OUTPUT;c="";let v=Date.now()-n;return k.emit(C.TOOL_EXECUTED,{toolId:r,traceId:o,sessionKey:i,success:!0,duration:v,mode:St.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${v}ms`),{success:!0,toolId:r,output:m,duration:v,meta:{traceId:o,sessionKey:i,messageCount:p.length,selectors:a,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:d}}}catch(h){let _=Date.now()-n,v=c||Fe.UNKNOWN,P=u||X.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,h),k.emit(C.TOOL_EXECUTION_FAILED,{toolId:r,traceId:o,sessionKey:i,error:h.message||String(h),duration:_}),{success:!1,toolId:r,error:h.message||String(h),duration:_,meta:{traceId:o,sessionKey:i,messageCount:p.length,selectors:a,apiPreset:l,writebackStatus:P,failureStage:v,writebackDetails:d}}}}async runToolInline(e,s){let n=Date.now(),r=e.id;try{let o=await this._buildToolMessages(e,s);return{success:!0,toolId:r,messages:o,duration:Date.now()-n}}catch(o){return{success:!1,toolId:r,error:o.message||String(o),duration:Date.now()-n}}}async previewExtraction(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),i=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:r,filteredSourceText:o,extractedText:i,messageEntries:n,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),i=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),a={...s,rawRecentMessagesText:r,recentMessagesText:o,extractedContent:i,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return bn.buildToolMessages(e,a)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:o}=n,i=null;if(e){if(!tr(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);i=gs(e)}else i=gs();let a=Wt(i||{});if(!a.valid&&!i?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${a.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:r,apiConfig:i},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Pe.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let n=typeof e=="string"?e:String(e||""),r=this._getExtractionSelectors(s);if(!r.length)return n.trim();let o=[];for(let i of r){let a=String(i||"").trim();if(!a)continue;if(a.startsWith("regex:")){let c=a.slice(6).trim();if(!c)continue;try{let u=new RegExp(c,"gi");[...n.matchAll(u)].forEach(p=>{let m=String(p?.[0]||"").trim();m&&o.push(m)})}catch(u){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:u})}continue}let l=a.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(n.match(c)||[]).forEach(d=>{let p=String(d||"").trim();p&&o.push(p)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:c})}}return o.length>0?o.join(`

`).trim():n.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(n=>String(n||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(n=>String(n||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,n={}){let r=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s),{strict:i=!1}=n;if(!o.length)return r.trim();let a=o.map((c,u)=>{let d=String(c||"").trim(),p=d.startsWith("regex:");return{id:`tool-extract-${u}`,type:p?"regex_include":"include",value:p?d.slice(6).trim():d,enabled:!0}}).filter(c=>c.value),l=Dt(r,a,[]);return i?(l||"").trim():l||r.trim()}_extractToolContent(e,s){let n=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let n=ut()||[],r=$t()||[];return!Array.isArray(n)||n.length===0?s.trim():Dt(s,n,r)||s.trim()}catch(n){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",n),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of s)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),r=Array.isArray(s?.chatMessages)?s.chatMessages:[],o=[];for(let a=r.length-1;a>=0&&o.length<n;a-=1){let l=r[a],c=String(l?.role||"").toLowerCase(),u=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,d=this._getMessageText(l);u&&d&&o.unshift({text:d,message:l,chatIndex:a})}if(o.length>0)return o;let i=s?.lastAiMessage||s?.input?.lastAiMessage||"";return i?[{text:i,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((r,o)=>{let i=r.text||"",a=this._applyGlobalContextRules(i),l=this._extractToolContent(e,i);return{...r,order:o+1,rawText:i,filteredText:a,extractedText:l}})}_joinMessageBlocks(e,s,n={}){let r=Array.isArray(e)?e:[],{skipEmpty:o=!1}=n;return r.map(a=>{let l=String(a?.[s]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${a?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(r=>{let o=`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`,i=String(r?.filteredText||"").trim()||"(\u7A7A)",a=String(r?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${i}

\u5DE5\u5177\uFF1A
${a}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Pe.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},rs=new xn,Hl=rs});var Sn={};ue(Sn,{abortAllTasks:()=>Vl,abortTask:()=>Wl,buildToolMessages:()=>bi,clearExecutionHistory:()=>Zl,createExecutionContext:()=>nc,createResult:()=>vn,enhanceMessagesWithBypass:()=>rc,executeBatch:()=>Yl,executeTool:()=>hi,executeToolWithConfig:()=>xi,executeToolsBatch:()=>ac,executorState:()=>se,extractFailed:()=>sc,extractSuccessful:()=>tc,generateTaskId:()=>Gt,getExecutionHistory:()=>Ql,getExecutorStatus:()=>Xl,getScheduler:()=>os,getToolsForEvent:()=>lc,mergeResults:()=>ec,pauseExecutor:()=>ql,resumeExecutor:()=>Jl,setMaxConcurrent:()=>Kl});function vn(t,e,s,n,r,o,i=0){return{success:s,taskId:t,toolId:e,data:n,error:r,duration:o,retries:i,timestamp:Date.now(),metadata:{}}}function Gt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Fl(t,e={}){return{id:Gt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function os(){return Is||(Is=new zr(se.maxConcurrent)),Is}function Kl(t){se.maxConcurrent=Math.max(1,Math.min(10,t)),Is&&(Is.maxConcurrent=se.maxConcurrent)}async function hi(t,e={},s){let n=os(),r=Fl(t,e);for(;se.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(i,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return mi(o),o}catch(o){let i=vn(r.id,t,!1,null,o,Date.now()-r.createdAt,r.retries);return mi(i),i}}async function Yl(t,e={}){let{failFast:s=!1,concurrency:n=se.maxConcurrent}=e,r=[],o=os(),i=o.maxConcurrent;o.maxConcurrent=n;try{let a=t.map(({toolId:l,options:c,executor:u})=>hi(l,c,u));if(s)for(let l of a){let c=await l;if(r.push(c),!c.success){o.abortAll();break}}else{let l=await Promise.allSettled(a);for(let c of l)c.status==="fulfilled"?r.push(c.value):r.push(vn(Gt(),"unknown",!1,null,c.reason,0,0))}}finally{o.maxConcurrent=i}return r}function Wl(t){return os().abort(t)}function Vl(){os().abortAll(),se.executionQueue=[]}function ql(){se.isPaused=!0}function Jl(){se.isPaused=!1}function Xl(){return{...os().getStatus(),isPaused:se.isPaused,activeControllers:se.activeControllers.size,historyCount:se.executionHistory.length}}function mi(t){se.executionHistory.push(t),se.executionHistory.length>100&&se.executionHistory.shift()}function Ql(t={}){let e=[...se.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function Zl(){se.executionHistory=[]}function ec(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function tc(t){return t.filter(e=>e.success).map(e=>e.data)}function sc(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function nc(t={}){return{taskId:Gt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function rc(t,e){return!e||e.length===0?t:[...e,...t]}function oc(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function bi(t,e){let s=[],n=t.promptTemplate||"",r={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,i]of Object.entries(r))n=n.replace(new RegExp(oc(o),"g"),i);return s.push({role:"USER",content:n}),s}async function xi(t,e,s={}){let n=ie(t);if(!n)return{success:!1,taskId:Gt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:Gt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),o=Gt();try{k.emit(C.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let i=bi(n,e);if(typeof s.callApi=="function"){let a=n.output?.apiPreset||n.apiPreset||"",l=a?{preset:a}:null,c=await s.callApi(i,l,s.signal),u=c;n.outputMode==="separate"&&n.extractTags?.length>0&&(u=ic(c,n.extractTags));let d={success:!0,taskId:o,toolId:t,data:u,duration:Date.now()-r};return k.emit(C.TOOL_EXECUTED,{toolId:t,taskId:o,result:d}),d}else return{success:!0,taskId:o,toolId:t,data:{messages:i,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(i){let a={success:!1,taskId:o,toolId:t,error:i.message||String(i),duration:Date.now()-r};return k.emit(C.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:i}),a}}function ic(t,e){let s={};for(let n of e){let r=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=t.match(r);o&&(s[n]=o.map(i=>{let a=i.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return a?a[1].trim():""}))}return s}async function ac(t,e,s={}){let n=[];for(let r of t){let o=ie(r);if(o&&o.enabled){let i=await xi(r,e,s);n.push(i)}}return n}function lc(t){let e=[],s=ts();for(let n of s){let r=n?.trigger?.enabled&&n?.trigger?.event===t,o=Array.isArray(n?.triggerEvents)&&n.triggerEvents.includes(t);n&&n.enabled&&(r||o)&&e.push(n)}return e}var se,zr,Is,Tn=F(()=>{ss();Ee();se={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};zr=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((n,r)=>{this.queue.push({executor:e,task:s,resolve:n,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:n,resolve:r,reject:o}=e,i=new AbortController;n.abortController=i,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),se.activeControllers.set(n.id,i),this.executeTask(s,n,i.signal).then(a=>{n.status="completed",n.completedAt=Date.now(),r(a)}).catch(a=>{n.status=a.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(a)}).finally(()=>{this.running.delete(n.id),se.activeControllers.delete(n.id),se.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,n){let r=Date.now(),o=null;for(let i=0;i<=s.maxRetries;i++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await e(n);return vn(s.id,s.toolId,!0,a,null,Date.now()-r,i)}catch(a){if(o=a,a.name==="AbortError")throw a;i<s.maxRetries&&(await this.delay(1e3*(i+1)),s.retries=i+1)}}throw o}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=se.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of se.activeControllers.values())e.abort();se.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Is=null});var ji={};ue(ji,{AUTO_TRIGGER_SKIP_REASONS:()=>R,EVENT_TYPES:()=>I,TOOL_EXECUTION_PATHS:()=>zt,checkGate:()=>Jr,destroyToolTriggerManager:()=>sd,exportAutoTriggerDiagnostics:()=>no,getAutoTriggerDiagnostics:()=>Ln,getChatContext:()=>Xr,getCurrentCharacter:()=>Qr,getFullContext:()=>zc,getToolTriggerManagerState:()=>nd,getWorldbookContent:()=>Di,initToolTriggerManager:()=>Bi,initTriggerModule:()=>Kr,previewToolExtraction:()=>so,registerEventListener:()=>st,registerTriggerHandler:()=>jc,removeAllListeners:()=>Uc,removeAllTriggerHandlers:()=>Fc,resetGateState:()=>Bc,runToolManually:()=>to,setDebugMode:()=>rd,setTriggerHandlerEnabled:()=>Hc,triggerState:()=>x,unregisterEventListener:()=>Fr,updateGateState:()=>Et});function jt(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Mn(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function W(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function kn(t){return new Promise(e=>setTimeout(e,t))}function Pn(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let n of s){if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"&&n.trim())return n.trim()}return e}function Yr(t=[]){return(Array.isArray(t)?t:[]).map((s,n)=>({role:Gn(s),content:Mn(s),name:s?.name||"",timestamp:s?.send_date||s?.timestamp||"",isSystem:!!s?.is_system,isUser:!!s?.is_user,sourceId:Pn(s,n),chatIndex:n,originalMessage:s}))}function Dn(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function yc(t,e=null,s={}){let{lockToMessageId:n=!1}=s,r=Yr(t),o=e==null||e===""?null:String(e).trim(),i=null,a=null;for(let l=r.length-1;l>=0;l-=1){let c=r[l],u=W(c.sourceId),d=o&&(u===o||String(c.chatIndex)===o);if(!i&&c.role==="assistant"&&Dn(c.content)&&(!o||!n||d)&&(i=c),!a&&c.role==="user"&&c.content&&(a=c),i&&a)break}return{messages:r,lastUserMessage:a,lastAiMessage:i}}async function gc(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:n=250,lockToMessageId:r=!1}=t,o={messages:[],lastUserMessage:null,lastAiMessage:null};for(let i=0;i<=s;i+=1){let a=await Cs();if(o=yc(a,e,{lockToMessageId:r}),o.lastAiMessage?.content)return o;i<s&&await kn(n)}return o}function fc(t="user_trigger_intent"){Et({lastUserSendIntentAt:Date.now(),lastUserIntentSource:t||"user_trigger_intent"})}function _n(){fc("send_button_or_enter")}function mc(){let t=jt(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],n=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],r=(o,i,a)=>{o.forEach(l=>{let c=e.querySelector(l);c&&c.addEventListener(i,a,!0)})};return r(s,"click",()=>_n()),r(s,"pointerup",()=>_n()),r(s,"touchend",()=>_n()),r(n,"keydown",o=>{let i=o?.key||"";(i==="Enter"||i==="NumpadEnter")&&!o.shiftKey&&_n()}),t.__YYT_sendIntentHooksInstalled=!0,L("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function hc(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function rt(){return jt().SillyTavern||null}function bc(){return jt().TavernHelper||null}function xc(){let t=rt();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function vc(t=""){return t===I.MESSAGE_RECEIVED||t===I.MESSAGE_SENT||t===I.MESSAGE_UPDATED||t===I.MESSAGE_DELETED}function Wr(t){return!!t&&(typeof t.on=="function"||typeof t.addEventListener=="function")}function Ri(t,e,s){if(!t||typeof s!="function")return!1;try{if(typeof t.off=="function")return t.off(e,s),!0;if(typeof t.removeListener=="function")return t.removeListener(e,s),!0;if(typeof t.removeEventListener=="function")return t.removeEventListener(e,s),!0}catch(n){$("warn","\u79FB\u9664\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25",{eventName:e,error:n?.message||String(n)})}return!1}function Sc(t,e,s){Wr(t)&&(ne.eventSource=t,ne.eventTypes=e||ne.eventTypes||null,ne.source=s||ne.source||"unknown",$("info","\u7F13\u5B58\u4E8B\u4EF6\u6865\u63A5\u6210\u529F",{source:ne.source,hasOff:typeof t.off=="function",hasRemoveListener:typeof t.removeListener=="function",hasAddEventListener:typeof t.addEventListener=="function"}))}function Rs(){let t=jt(),e=t.SillyTavern||null,s=e?.getContext?.()||null,n=[{source:"SillyTavern.eventSource",eventSource:e?.eventSource,eventTypes:e?.eventTypes||e?.event_types||null},{source:"topWindow.eventSource",eventSource:t?.eventSource,eventTypes:t?.event_types||t?.eventTypes||null},{source:"SillyTavern.getContext()",eventSource:s?.eventSource||null,eventTypes:s?.eventTypes||s?.event_types||null},{source:"scriptModule exports",eventSource:ne.scriptModule?.eventSource||null,eventTypes:ne.scriptModule?.event_types||ne.scriptModule?.eventTypes||null}];for(let r of n)if(Wr(r.eventSource))return Sc(r.eventSource,r.eventTypes,r.source),r;return{source:"",eventSource:null,eventTypes:null}}async function Tc(){let t=Rs();if(t.eventSource)return t;ne.loadingPromise||(ne.loadingPromise=(async()=>{try{let s=cc;ne.scriptModule=await import(s)}catch(s){ne.importError=s,$("warn","\u52A0\u8F7D /script.js \u4E8B\u4EF6\u6865\u63A5\u5931\u8D25",s?.message||String(s))}finally{ne.loadingPromise=null}})()),await ne.loadingPromise;let e=Rs();return e.eventSource?e:{source:"",eventSource:null,eventTypes:null}}function $n(){return Rs().eventSource||ne.eventSource||null}function On(){return Rs().eventTypes||ne.eventTypes||I}function L(...t){(x.debugMode||Pe.getDebugSettings()?.enableDebugLog)&&console.log("[YouYouToolkit:Trigger]",...t)}function $(t="info",...e){(typeof console[t]=="function"?console[t]:console.log)("[youyou_trigger]",...e)}function Se(){let t=Pe.getListenerSettings?.()||Pe.getSettings?.()?.listener||{},e=parseInt(t?.debounceMs,10),s=parseInt(t?.messageSessionWindowMs,10),n=parseInt(t?.historyRetentionLimit,10);return{listenGenerationEnded:t?.listenGenerationEnded!==!1,ignoreQuietGeneration:t?.ignoreQuietGeneration!==!1,ignoreAutoTrigger:t?.ignoreAutoTrigger===!0,debounceMs:Number.isFinite(e)?Math.max(0,e):300,useMessageReceivedFallback:t?.useMessageReceivedFallback!==!1,useGenerationAfterCommandsFallback:t?.useGenerationAfterCommandsFallback!==!1,messageSessionWindowMs:Number.isFinite(s)?Math.max(300,s):1800,historyRetentionLimit:Number.isFinite(n)?Math.max(1,Math.min(50,n)):10}}function nt(t,e=""){if(t&&typeof t=="object")return W(t?.messageId??t?.id??t?.message_id??t?.mes_id);if(e===I.GENERATION_ENDED){if(typeof t=="number"&&Number.isFinite(t))return String(t);if(typeof t=="string"&&/^\d+$/.test(t.trim()))return t.trim()}return vc(e)?W(t):""}function Ec(t,e,s){let n=W(s);if(!n)return!1;let r=W(Pn(t,e));if(r&&r===n)return!0;let o=Number(n);return Number.isInteger(o)&&e===o}async function _c(t){let e=W(t);if(!e)return null;let s=await Cs();for(let n=s.length-1;n>=0;n-=1){let r=s[n];if(Ec(r,n,e))return{message:r,index:n}}return null}async function wc(t,e={}){let{retries:s=0,retryDelayMs:n=80}=e,r=null;for(let o=0;o<=s;o+=1){if(r=await _c(t),r)return r;o<s&&await kn(n)}return null}function Ac(t,e,s){return W(s)?t===I.MESSAGE_RECEIVED||t===I.MESSAGE_UPDATED?!0:!!(e&&typeof e=="object"&&(e?.messageId!==void 0||e?.message_id!==void 0||e?.id!==void 0||e?.mes_id!==void 0)):!1}function Mi(){let t=[x.gateState.lastUserSendIntentAt,x.gateState.lastUserMessageAt].filter(e=>Number(e)>0);return t.length>0?Math.max(...t):0}function Ci(t=Date.now()){let e=Mi();return e>0&&t-e<=Ii}function ki(t="",e=null){return String(t||e?.type||"").trim().toLowerCase()}function Ic(t,e=null,s=Date.now()){let n=Mi(),r=ki(t,e);return n>0&&s-n<=Ii?{startedByUserIntent:!0,userIntentDetectedAt:n,userIntentSource:"recent_user_trigger_intent",userIntentDetail:"recent_user_send_or_message"}:pc.has(r)?{startedByUserIntent:!0,userIntentDetectedAt:s,userIntentSource:`explicit_generation_action:${r}`,userIntentDetail:`generation_type_${r}`}:{startedByUserIntent:!1,userIntentDetectedAt:n,userIntentSource:"none",userIntentDetail:"no_recent_user_intent_or_explicit_generation_action"}}function Ms(t=ks()){let e=x.gateState.lastGenerationBaseline;return!e||t&&e.chatId&&e.chatId!==t?null:e}function Vr(t=Date.now()){return Ci(t)?!0:!!Ms()?.startedByUserIntent}function Si(t=null){let e=t||Ms();return e?x.gateState.lastGenerationDryRun||e.dryRun?{eligible:!1,baseline:e,reason:R.DRY_RUN_GENERATION,detail:"dry_run_generation"}:{eligible:!0,baseline:e,reason:"",detail:""}:{eligible:!1,baseline:null,reason:R.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"missing_generation_baseline"}}function qr(t=Date.now()){return Number(x.gateState.uiTransitionGuardUntil)>t}function Ti(t=""){let e=Date.now();Et({uiTransitionGuardUntil:e+vi,lastUiTransitionAt:e,lastUiTransitionSource:t||""}),$("info","\u8FDB\u5165\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B",{source:t||"unknown",guardUntil:e+vi})}function Ei(t=""){for(let e of E.pendingMessageTimers.values())clearTimeout(e);E.pendingMessageTimers.clear(),t&&$("info","\u5DF2\u6E05\u7406\u5F85\u6267\u884C\u81EA\u52A8\u89E6\u53D1\u5B9A\u65F6\u5668",{reason:t})}function Pi(t=[],e={}){let s=rt(),n=s?.getContext?.()||null,r=Yr(t),o=null;for(let i=r.length-1;i>=0;i-=1){let a=r[i];if(a.role==="assistant"&&Dn(a.content)){o=a;break}}return{traceId:e.traceId||cs("generation"),startedAt:Number(e.startedAt)||Date.now(),capturedAt:Date.now(),chatId:Nn(s,n,null),messageCount:r.length,lastAssistantIndex:o?.chatIndex??-1,lastAssistantMessageId:W(o?.sourceId),lastAssistantPreview:String(o?.content||"").slice(0,160),dryRun:!!e.dryRun,generationType:e.type||"",generationParams:e.params||null,startedByUserIntent:!!e.startedByUserIntent,userIntentDetectedAt:Number(e.userIntentDetectedAt)||0,userIntentSource:e.userIntentSource||"",userIntentDetail:e.userIntentDetail||"",baselineResolved:e.baselineResolved!==void 0?!!e.baselineResolved:!0,baselineResolutionAt:Number(e.baselineResolutionAt)||0,provisional:!!e.provisional,baselineSource:e.baselineSource||""}}async function Rc(t={}){let e=await Cs();return Pi(e,{...t,baselineResolved:t.baselineResolved!==void 0?t.baselineResolved:!0,baselineResolutionAt:Number(t.baselineResolutionAt)||Date.now(),provisional:t.provisional===!0,baselineSource:t.baselineSource||"captured_chat_snapshot"})}function Mc(t={}){return Pi(xc(),{...t,baselineResolved:!1,baselineResolutionAt:0,provisional:!0,baselineSource:t.baselineSource||"provisional_immediate_snapshot"})}async function jr(t={}){let{chatId:e=ks(),traceId:s="",retries:n=4,retryDelayMs:r=80}=t,o=null;for(let a=0;a<=n;a+=1){o=Ms(e);let l=!s||!o?.traceId||o.traceId===s;if(o&&l&&o.baselineResolved!==!1)return o;a<n&&await kn(r)}return o&&(!s||!o?.traceId||o.traceId===s)?o:null}function Cc(t=Date.now(),e=Ms()){if(x.gateState.isGenerating)return!0;if(!e)return!1;let s=Number(x.gateState.lastGenerationAt)||0;return s<=0?!1:t-s<=uc}function kc(t){return t?.message?{role:Gn(t.message),content:Mn(t.message),chatIndex:t.index,sourceId:W(Pn(t.message,t.index))}:null}async function Pc(t,e={}){let s=Date.now(),n=e?.traceId||x.gateState.lastGenerationTraceId||"",r=kc(t),o=await jr({traceId:n,retries:4,retryDelayMs:80})||Ms(),i=Cc(s,o),a=!!(r&&o&&Hr(r,o)),l=!n||!o?.traceId||o.traceId===n;return r?o?o.baselineResolved===!1?{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",reason:R.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"generation_baseline_pending_resolution"}:l?!x.gateState.isGenerating&&!i?{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:a,historicalReplayBlocked:!0,historicalReplayReason:"message_received_outside_active_generation",reason:R.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,detail:"message_received_outside_active_generation"}:a?{allowed:!0,baseline:o,eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:"",reason:"",detail:"",messageEntry:r}:{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_before_generation_baseline",reason:R.HISTORICAL_REPLAY_MESSAGE_RECEIVED,detail:"message_received_before_generation_baseline"}:{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_trace_mismatch",reason:R.HISTORICAL_REPLAY_MESSAGE_RECEIVED,detail:"message_received_trace_mismatch"}:{allowed:!1,baseline:null,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_without_generation_baseline",reason:R.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,detail:"message_received_without_generation_baseline"}:{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",reason:R.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"message_received_identity_not_resolved"}}function Hr(t,e){if(!t||t.role!=="assistant"||!Dn(t.content))return!1;if(!e)return!0;if(Number.isInteger(e.lastAssistantIndex)&&e.lastAssistantIndex>=0)return t.chatIndex>e.lastAssistantIndex;let s=Number.isFinite(e.messageCount)?e.messageCount:0;return t.chatIndex>=s}async function Dc(t=""){let e=W(t),s=rt(),n=s?.getContext?.()||null,r=Nn(s,n,null),o=await Cs(),i=Yr(o),a=x.gateState.lastGenerationBaseline?.chatId===r?x.gateState.lastGenerationBaseline:null;if(e){let l=i.find(c=>W(c.sourceId)===e||String(c.chatIndex)===e);return l&&Dn(l.content)&&l.role==="assistant"&&(!a||Hr(l,a))?l:null}if(!a)return null;for(let l=i.length-1;l>=0;l-=1){let c=i[l];if(Hr(c,a))return c}return null}async function In(t="",e={}){let{retries:s=0,retryDelayMs:n=250}=e,r=null;for(let o=0;o<=s;o+=1){if(r=await Dc(t),r)return r;o<s&&await kn(n)}return null}function _t(){let t=x.gateState.lastGenerationBaseline;return{baselineResolved:t?.baselineResolved??!1,baselineResolutionAt:t?.baselineResolutionAt||0,provisionalBaseline:!!t?.provisional,generationStartedByUserIntent:!!t?.startedByUserIntent,generationUserIntentSource:t?.userIntentSource||"",generationUserIntentDetail:t?.userIntentDetail||"",lastUserIntentSource:x.gateState.lastUserIntentSource||""}}function $c(){let t=x.gateState.lastGenerationBaseline;return{sessionGenerationTraceId:x.gateState.lastGenerationTraceId||"",sessionGenerationStartedAt:t?.startedAt||0,sessionBaselineResolvedAtCreation:t?.baselineResolved??!1,sessionBaselineResolutionAtCreation:t?.baselineResolutionAt||0,sessionProvisionalBaselineAtCreation:!!t?.provisional,sessionGenerationStartedByUserIntent:!!t?.startedByUserIntent,sessionGenerationUserIntentSource:t?.userIntentSource||"",sessionGenerationUserIntentDetail:t?.userIntentDetail||"",sessionLastUserIntentSourceAtCreation:x.gateState.lastUserIntentSource||"",sessionGenerationCapturedAt:Date.now()}}async function Oc(){return En||(En=Promise.resolve().then(()=>(Tn(),Sn)).catch(t=>{throw En=null,t})),En}function Nc(t={}){let e=_t();return{stage:"",eventType:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",messageRole:"",reason:"",skipReasonDetailed:"",confirmedAssistantMessageId:"",scheduledDelayMs:0,candidateToolIds:[],receivedAt:Date.now(),handledAt:0,generationTraceId:x.gateState.lastGenerationTraceId||"",generationDryRun:!!x.gateState.lastGenerationDryRun,generationStartedAt:x.gateState.lastGenerationBaseline?.startedAt||0,uiTransitionGuardActive:qr(),uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:x.gateState.lastUiTransitionSource||"",baselineMessageCount:x.gateState.lastGenerationBaseline?.messageCount||0,baselineAssistantId:x.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",generationBaselineMessageCount:x.gateState.lastGenerationBaseline?.messageCount||0,generationBaselineAssistantId:x.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",confirmationSource:"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",registeredEvents:Array.from(E.listeners.keys()),listenerSettings:Se(),hasRecentUserTriggerIntent:Ci(),hasConfirmedUserTriggerIntent:Vr(),...e,...t}}function ve(t={}){let e=Nc(t);return E.lastEventDebugSnapshot=e,L("\u81EA\u52A8\u89E6\u53D1\u4E8B\u4EF6\u5FEB\u7167:",e),e}function Gc(){let t=Se();return t.listenGenerationEnded===!1?{skip:!0,reason:R.LISTENER_DISABLED,listenerSettings:t}:t.ignoreAutoTrigger&&!Vr()?{skip:!0,reason:R.IGNORED_AUTO_TRIGGER,listenerSettings:t}:{skip:!1,reason:"",listenerSettings:t}}function Lc(t={}){let e=_t();return{triggerEvent:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",selectedToolIds:[],skipReason:"",skipReasonDetailed:"",lockedAiMessageId:"",confirmedAssistantMessageId:"",confirmationSource:"",eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",generationTraceId:x.gateState.lastGenerationTraceId||"",...e,triggeredAt:Date.now(),...t}}function Tt(t={}){let e=Lc(t);return E.lastAutoTriggerSnapshot=e,L("\u81EA\u52A8\u89E6\u53D1\u5FEB\u7167:",e),e}function is(t,e){(Array.isArray(t)?t:[]).forEach(n=>{n?.id&&es(n.id,{lastTriggerAt:Date.now(),...e},{touchLastRunAt:!1,emitEvent:!1})})}function Nn(t,e,s){let r=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(o=>typeof o=="string"&&o.trim());return r||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function st(t,e,s={}){if(!t||typeof e!="function")return L("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),$("warn","\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25\uFF1A\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u65E0\u6548",{eventType:t}),()=>{};let{once:n=!1,priority:r=0}=s,o=$n(),a=On()[t]||t,l=async(...c)=>{try{if($("info","\u6536\u5230\u4E8B\u4EF6",t,c[0]??null),s.gateCheck&&!await Jr(s.gateCheck)){L(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`),$("warn","\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6",t);return}await e(...c),n&&Fr(t,l)}catch(u){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",u)}};if(x.listeners.has(t)||x.listeners.set(t,new Set),x.listeners.get(t).add(l),o&&typeof o.on=="function")o.on(a,l),L(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),$("info","\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u6E90\u76D1\u542C",{eventType:t,stEventType:a});else if(o&&typeof o.addEventListener=="function")o.addEventListener(a,l),L(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),$("info","\u5DF2\u6CE8\u518C addEventListener \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:a});else{let c=jt();c.addEventListener&&(c.addEventListener(a,l),L(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),$("warn","\u4E8B\u4EF6\u6E90\u4E0D\u53EF\u7528\uFF0C\u56DE\u9000\u4E3A DOM \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:a}))}return()=>Fr(t,l)}function Fr(t,e){let s=x.listeners.get(t);if(s&&s.has(e)){s.delete(e);let n=$n(),o=On()[t]||t;if(Ri(n,o,e))L(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let i=jt();i.removeEventListener&&i.removeEventListener(o,e)}}}function Uc(){let t=$n(),e=On();for(let[s,n]of x.listeners){let r=e[s]||s;for(let o of n)if(!Ri(t,r,o)){let i=jt();i.removeEventListener&&i.removeEventListener(r,o)}}x.listeners.clear(),L("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function Jr(t){if(!t)return!0;let e=Date.now(),s=x.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return L("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return L("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return L("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return L("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return L("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(n){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",n),!1}return!0}function Et(t){Object.assign(x.gateState,t)}function Bc(){x.gateState={lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""}}async function Xr(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:n=!0,includeSystem:r=!1,format:o="messages"}=t;if(!rt())return L("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let a=await Cs(),l=[],c=Math.max(0,a.length-e);for(let u=c;u<a.length;u++){let d=a[u];if(!d)continue;let p=Gn(d);if(!(p==="user"&&!s)&&!(p==="system"&&!r)&&!(p==="assistant"&&!n))if(o==="messages"){let m=Mn(d);l.push({role:p,content:m,name:d.name||"",timestamp:d.send_date||d.timestamp,isSystem:!!d.is_system,isUser:!!d.is_user})}else l.push(Mn(d))}return{messages:l,totalMessages:a.length,startIndex:c,endIndex:a.length-1}}catch(a){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",a),null}}function Gn(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function Cs(){let t=bc(),e=rt();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let n=e?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(e?.chat)?e.chat:[];s=(r.length?r:o).length-1}if(Number.isFinite(s)&&s>=0){let n=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(n)&&n.length>0)return n}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function Qr(){let t=rt();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let n=s[e];return{id:e,name:n.name||"",description:n.description||"",personality:n.personality||"",scenario:n.scenario||"",firstMes:n.first_mes||"",mesExample:n.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function Di(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,n=rt();if(!n)return"";try{let o=(n.lorebook||[]).entries||[],i=[],a=0;for(let l of o){if(e&&!l.enabled)continue;let c=l.content||"";c&&a+c.length<=s&&(i.push(c),a+=c.length)}return i.join(`

`)}catch(r){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",r),""}}async function zc(t={}){let[e,s,n]=await Promise.all([Xr(t.chat||{}),Qr(),Di(t.worldbook||{})]);return{chat:e,character:s,worldbook:n,timestamp:Date.now()}}function jc(t,e){if(!t||!e)return L("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:n,gateCondition:r,priority:o=0}=e;if(!s||typeof n!="function")return L("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};x.handlers.set(t,{eventType:s,handler:n,gateCondition:r,priority:o,enabled:!0});let i=st(s,async(...a)=>{let l=x.handlers.get(t);!l||!l.enabled||l.gateCondition&&!await Jr(l.gateCondition)||await l.handler(...a)},{priority:o});return L(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{i(),x.handlers.delete(t),L(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function Hc(t,e){let s=x.handlers.get(t);s&&(s.enabled=e,L(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function Fc(){x.handlers.clear(),L("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function cs(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Cn(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function ks(){let t=rt(),e=t?.getContext?.()||null;return Nn(t,e,null)}function Zr(t,e,s=""){let n=t||ks(),r=W(e);return`${n}::${r||`event:${s||"unknown"}:latest`}`}function Kc(t,e,s={}){let n=W(s?.messageId||nt(e,t)),r=s?.chatId||ks(),o=s?.sessionKey||Zr(r,n,t),i=Date.now(),a=_t(),l=$c();return{sessionKey:o,traceId:s?.traceId||cs("session"),chatId:r,messageId:n,messageKey:s?.messageKey||"",messageRole:s?.messageRole||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"",isSpeculativeSession:!!s?.isSpeculativeSession,eventBelongsToCurrentGeneration:!!s?.eventBelongsToCurrentGeneration,historicalReplayBlocked:!!s?.historicalReplayBlocked,historicalReplayReason:s?.historicalReplayReason||"",skipReasonDetailed:s?.skipReasonDetailed||"",firstEventType:s?.eventType||t||"",receivedEvents:t?[t]:[],phase:s?.phase||N.RECEIVED,skipReason:s?.skipReason||"",scheduledAt:0,handledAt:0,completedAt:0,candidateToolIds:Array.isArray(s?.candidateToolIds)?[...s.candidateToolIds]:[],executionPathIds:Array.isArray(s?.executionPathIds)?[...s.executionPathIds]:[],sourceMessageLocked:!!n,baselineResolved:s?.baselineResolved??a.baselineResolved,baselineResolutionAt:s?.baselineResolutionAt??a.baselineResolutionAt,provisionalBaseline:s?.provisionalBaseline??a.provisionalBaseline,generationStartedByUserIntent:s?.generationStartedByUserIntent??a.generationStartedByUserIntent,generationUserIntentSource:s?.generationUserIntentSource||a.generationUserIntentSource,generationUserIntentDetail:s?.generationUserIntentDetail||a.generationUserIntentDetail,lastUserIntentSource:s?.lastUserIntentSource||a.lastUserIntentSource,sessionGenerationTraceId:s?.sessionGenerationTraceId||l.sessionGenerationTraceId,sessionGenerationStartedAt:s?.sessionGenerationStartedAt??l.sessionGenerationStartedAt,sessionBaselineResolvedAtCreation:s?.sessionBaselineResolvedAtCreation??l.sessionBaselineResolvedAtCreation,sessionBaselineResolutionAtCreation:s?.sessionBaselineResolutionAtCreation??l.sessionBaselineResolutionAtCreation,sessionProvisionalBaselineAtCreation:s?.sessionProvisionalBaselineAtCreation??l.sessionProvisionalBaselineAtCreation,sessionGenerationStartedByUserIntent:s?.sessionGenerationStartedByUserIntent??l.sessionGenerationStartedByUserIntent,sessionGenerationUserIntentSource:s?.sessionGenerationUserIntentSource||l.sessionGenerationUserIntentSource,sessionGenerationUserIntentDetail:s?.sessionGenerationUserIntentDetail||l.sessionGenerationUserIntentDetail,sessionLastUserIntentSourceAtCreation:s?.sessionLastUserIntentSourceAtCreation||l.sessionLastUserIntentSourceAtCreation,sessionGenerationCapturedAt:s?.sessionGenerationCapturedAt??l.sessionGenerationCapturedAt,createdAt:i,updatedAt:i}}function Yc(t=Date.now()){let{messageSessionWindowMs:e}=Se();for(let[s,n]of E.messageSessions.entries()){let r=n?.completedAt||n?.handledAt||n?.updatedAt||n?.createdAt||0;r>0&&t-r>e&&E.messageSessions.delete(s)}}function ls(t,e,s={}){Yc();let n=W(s?.messageId||nt(e,t)),r=s?.chatId||ks(),o=s?.sessionKey||Zr(r,n,t),i=E.messageSessions.get(o);return i?(t&&!i.receivedEvents.includes(t)&&i.receivedEvents.push(t),n&&!i.messageId&&(i.messageId=n,i.sourceMessageLocked=!0),s?.messageRole&&(i.messageRole=s.messageRole),s?.confirmedAssistantMessageId&&(i.confirmedAssistantMessageId=s.confirmedAssistantMessageId),s?.confirmationSource&&(i.confirmationSource=s.confirmationSource),s?.skipReasonDetailed&&(i.skipReasonDetailed=s.skipReasonDetailed),s?.eventBelongsToCurrentGeneration!==void 0&&(i.eventBelongsToCurrentGeneration=!!s.eventBelongsToCurrentGeneration),s?.historicalReplayBlocked!==void 0&&(i.historicalReplayBlocked=!!s.historicalReplayBlocked),s?.historicalReplayReason&&(i.historicalReplayReason=s.historicalReplayReason),s?.isSpeculativeSession!==void 0&&(i.isSpeculativeSession=!!s.isSpeculativeSession),s?.candidateToolIds&&(i.candidateToolIds=[...s.candidateToolIds]),fe(i,{})):(i=Kc(t,e,{...s,chatId:r,sessionKey:o,messageId:n}),E.messageSessions.set(o,i),i)}function fe(t,e={}){if(!t)return null;let s=_t();return Object.assign(t,s,e,{updatedAt:Date.now()}),t}function Wc(t,e){return!t||!e||t.sessionKey===e||(E.messageSessions.delete(t.sessionKey),t.sessionKey=e,t.updatedAt=Date.now(),E.messageSessions.set(e,t)),t}function pe(t,e={}){if(!t)return null;let{historyRetentionLimit:s}=Se(),n=_t(),r={id:e?.id||cs("session_hist"),at:e?.at||Date.now(),traceId:t.traceId,sessionKey:t.sessionKey,phase:e?.phase||t.phase,eventType:e?.eventType||t.firstEventType,messageId:e?.messageId||t.messageId,messageKey:e?.messageKey||t.messageKey,messageRole:e?.messageRole||t.messageRole,confirmedAssistantMessageId:e?.confirmedAssistantMessageId||t.confirmedAssistantMessageId||"",confirmationSource:e?.confirmationSource||t.confirmationSource||"",isSpeculativeSession:e?.isSpeculativeSession??t.isSpeculativeSession??!1,eventBelongsToCurrentGeneration:e?.eventBelongsToCurrentGeneration??t.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:e?.historicalReplayBlocked??t.historicalReplayBlocked??!1,historicalReplayReason:e?.historicalReplayReason||t.historicalReplayReason||"",generationTraceId:e?.generationTraceId||x.gateState.lastGenerationTraceId||"",generationStartedAt:e?.generationStartedAt||x.gateState.lastGenerationBaseline?.startedAt||0,generationDryRun:e?.generationDryRun??!!x.gateState.lastGenerationDryRun,baselineResolved:e?.baselineResolved??t.baselineResolved??n.baselineResolved,baselineResolutionAt:e?.baselineResolutionAt??t.baselineResolutionAt??n.baselineResolutionAt,provisionalBaseline:e?.provisionalBaseline??t.provisionalBaseline??n.provisionalBaseline,generationStartedByUserIntent:e?.generationStartedByUserIntent??t.generationStartedByUserIntent??n.generationStartedByUserIntent,generationUserIntentSource:e?.generationUserIntentSource||t.generationUserIntentSource||n.generationUserIntentSource,generationUserIntentDetail:e?.generationUserIntentDetail||t.generationUserIntentDetail||n.generationUserIntentDetail,lastUserIntentSource:e?.lastUserIntentSource||t.lastUserIntentSource||n.lastUserIntentSource,sessionGenerationTraceId:e?.sessionGenerationTraceId||t.sessionGenerationTraceId||"",sessionGenerationStartedAt:e?.sessionGenerationStartedAt??t.sessionGenerationStartedAt??0,sessionBaselineResolvedAtCreation:e?.sessionBaselineResolvedAtCreation??t.sessionBaselineResolvedAtCreation??!1,sessionBaselineResolutionAtCreation:e?.sessionBaselineResolutionAtCreation??t.sessionBaselineResolutionAtCreation??0,sessionProvisionalBaselineAtCreation:e?.sessionProvisionalBaselineAtCreation??t.sessionProvisionalBaselineAtCreation??!1,sessionGenerationStartedByUserIntent:e?.sessionGenerationStartedByUserIntent??t.sessionGenerationStartedByUserIntent??!1,sessionGenerationUserIntentSource:e?.sessionGenerationUserIntentSource||t.sessionGenerationUserIntentSource||"",sessionGenerationUserIntentDetail:e?.sessionGenerationUserIntentDetail||t.sessionGenerationUserIntentDetail||"",sessionLastUserIntentSourceAtCreation:e?.sessionLastUserIntentSourceAtCreation||t.sessionLastUserIntentSourceAtCreation||"",sessionGenerationCapturedAt:e?.sessionGenerationCapturedAt??t.sessionGenerationCapturedAt??Date.now(),skipReason:e?.skipReason||t.skipReason||"",skipReasonDetailed:e?.skipReasonDetailed||t.skipReasonDetailed||"",candidateToolIds:Array.isArray(e?.candidateToolIds)?[...e.candidateToolIds]:[...t.candidateToolIds||[]],executionPathIds:Array.isArray(e?.executionPathIds)?[...e.executionPathIds]:[...t.executionPathIds||[]]};return E.recentSessionHistory=Cn([...E.recentSessionHistory,r],s),r}function Lt(t,e={}){let s=Array.isArray(t)?t:[],{historyRetentionLimit:n}=Se();s.forEach(r=>{r?.id&&Ts(r.id,"trigger",e,{limit:n,emitEvent:!1})})}function Vc(t,e={}){if(!t)return;let{historyRetentionLimit:s}=Se();Ts(t,"writeback",e,{limit:s,emitEvent:!1})}function as(t){if(!t||typeof t!="object")return t;let e=$i(t);return{...t,...e,receivedEvents:Array.isArray(t.receivedEvents)?[...t.receivedEvents]:void 0,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:void 0,executionPathIds:Array.isArray(t.executionPathIds)?[...t.executionPathIds]:void 0,driftReasons:Array.isArray(e.driftReasons)?[...e.driftReasons]:[]}}function Bt(t){return String(t||"").trim()}function $i(t){if(!t||typeof t!="object")return{driftDetected:!1,generationTraceDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};if(!(t.sessionGenerationCapturedAt!==void 0||t.sessionGenerationTraceId!==void 0||t.sessionBaselineResolvedAtCreation!==void 0||t.sessionGenerationStartedByUserIntent!==void 0||t.sessionGenerationUserIntentSource!==void 0||t.sessionGenerationUserIntentDetail!==void 0))return{driftDetected:!1,generationTraceDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};let s=Bt(t.sessionGenerationTraceId),n=Bt(t.generationTraceId),r=Bt(t.sessionGenerationUserIntentSource),o=Bt(t.generationUserIntentSource),i=Bt(t.sessionGenerationUserIntentDetail),a=Bt(t.generationUserIntentDetail),l=!!s&&!!n&&s!==n,c=!!t.sessionGenerationStartedByUserIntent!=!!t.generationStartedByUserIntent||(r||o?r!==o:!1)||(i||a?i!==a:!1),u=!!t.sessionBaselineResolvedAtCreation!=!!t.baselineResolved,d=(Number(t.baselineResolutionAt)||0)>(Number(t.sessionBaselineResolutionAtCreation)||0),p=[];return l&&p.push("generation_trace_changed"),c&&p.push("generation_user_intent_changed"),u&&p.push("baseline_resolved_state_changed"),d&&p.push("baseline_resolution_advanced"),{driftDetected:p.length>0,generationTraceDrifted:l,generationUserIntentDrifted:c,baselineResolvedStateChanged:u,baselineResolutionAdvancedSinceSessionCreation:d,driftReasons:p}}function _i(t=[]){return(Array.isArray(t)?t:[]).reduce((e,s)=>{let n=Bt(s?.phase)||"unknown";return e[n]=(e[n]||0)+1,e},{})}function wi(t=[]){let e={entryCount:0,driftDetectedCount:0,generationTraceDriftCount:0,generationUserIntentDriftCount:0,baselineResolvedStateChangedCount:0,baselineResolutionAdvancedCount:0};for(let s of Array.isArray(t)?t:[]){let n=$i(s);e.entryCount+=1,n.driftDetected&&(e.driftDetectedCount+=1),n.generationTraceDrifted&&(e.generationTraceDriftCount+=1),n.generationUserIntentDrifted&&(e.generationUserIntentDriftCount+=1),n.baselineResolvedStateChanged&&(e.baselineResolvedStateChangedCount+=1),n.baselineResolutionAdvancedSinceSessionCreation&&(e.baselineResolutionAdvancedCount+=1)}return e}function Oi(){let t=Rs(),e=t.eventSource||ne.eventSource||null;return{source:t.source||ne.source||"",ready:Wr(e),hasImportedScriptModule:!!ne.scriptModule,importError:ne.importError?.message||""}}function Ni(){let t=x.gateState.lastGenerationBaseline;return{lastUserSendIntentAt:x.gateState.lastUserSendIntentAt||0,lastUserIntentSource:x.gateState.lastUserIntentSource||"",lastUserMessageId:W(x.gateState.lastUserMessageId),lastUserMessageAt:x.gateState.lastUserMessageAt||0,lastGenerationTraceId:x.gateState.lastGenerationTraceId||"",lastGenerationType:x.gateState.lastGenerationType||"",lastGenerationDryRun:!!x.gateState.lastGenerationDryRun,lastGenerationAt:x.gateState.lastGenerationAt||0,isGenerating:!!x.gateState.isGenerating,uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil||0,lastUiTransitionAt:x.gateState.lastUiTransitionAt||0,lastUiTransitionSource:x.gateState.lastUiTransitionSource||"",baselineMessageCount:t?.messageCount||0,baselineAssistantId:t?.lastAssistantMessageId||"",..._t()}}function qc(){let{historyRetentionLimit:t}=Se();return Math.max(20,Math.min(200,Number(t||0)*4||40))}function Jc(t={}){let e=_t();return{id:t?.id||cs("timeline"),at:Number(t?.at)||Date.now(),kind:t?.kind||"event",eventType:t?.eventType||"",traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",messageId:W(t?.messageId),phase:t?.phase||"",reason:t?.reason||"",detail:t?.detail||"",confirmationSource:t?.confirmationSource||"",candidateToolIds:Array.isArray(t?.candidateToolIds)?[...t.candidateToolIds]:[],generationTraceId:t?.generationTraceId||x.gateState.lastGenerationTraceId||"",baselineResolved:t?.baselineResolved??e.baselineResolved,generationStartedByUserIntent:t?.generationStartedByUserIntent??e.generationStartedByUserIntent,generationUserIntentSource:t?.generationUserIntentSource||e.generationUserIntentSource,historicalReplayBlocked:t?.historicalReplayBlocked??!1}}function Ut(t={}){let e=Jc(t);return E.recentEventTimeline=Cn([...E.recentEventTimeline,e],qc()),e}function Gi(t){return!t||typeof t!="object"?t:{...t,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:[]}}function wn(t=!1,e=[],s=[]){return{flagged:!!t,reasons:[...new Set((Array.isArray(e)?e:[]).filter(Boolean))],relatedSessionKeys:[...new Set((Array.isArray(s)?s:[]).filter(Boolean))]}}function Xc(t={}){let e=t?.summary||{},s=[...Array.isArray(t?.activeSessions)?t.activeSessions:[],...Array.isArray(t?.recentSessionHistory)?t.recentSessionHistory:[],t?.lastEventDebugSnapshot,t?.lastAutoTriggerSnapshot].filter(Boolean),n=[],r=[],o=[],i=[],a=[],l=[],c=[],u=[];for(let d of s){let p=String(d?.reason||d?.skipReason||"").trim(),m=String(d?.detail||d?.skipReasonDetailed||"").trim(),h=String(d?.sessionKey||"").trim(),_=String(d?.phase||d?.stage||"").trim(),v=String(d?.confirmationSource||"").trim(),P=String(d?.generationUserIntentSource||"").trim(),re=!!d?.generationStartedByUserIntent;(m==="missing_generation_baseline"||m==="generation_baseline_pending_resolution")&&(n.push(m),r.push(h)),(p===R.HISTORICAL_REPLAY_MESSAGE_RECEIVED||p===R.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION||d?.historicalReplayBlocked)&&(o.push(d?.historicalReplayReason||p||m||"historical_replay_signal_detected"),i.push(h)),p===R.IGNORED_AUTO_TRIGGER&&(re||P.startsWith("explicit_generation_action:"))&&(a.push(`ignored_auto_trigger_with_${P||"user_intent"}`),l.push(h)),e?.listenerSettings?.ignoreAutoTrigger&&!re&&!d?.isSpeculativeSession&&(_===N.COMPLETED||_===N.HANDLING||_===N.DISPATCHING||v==="generation_ended"||v==="message_received"||v==="generation_after_commands")&&(c.push("non_user_intent_generation_reached_execution_path"),u.push(h))}return{a10BaselineRaceSuspicious:wn(n.length>0,n,r),a11ReplaySuspicious:wn(o.length>0,o,i),a12UserIntentSuspicious:wn(a.length>0,a,l),a13AutoTriggerLeakSuspicious:wn(c.length>0,c,u)}}function Qc(t){let e=Date.now();return E.lastDuplicateMessageKey===t&&e-E.lastDuplicateMessageAt<dc?!1:(E.lastDuplicateMessageKey=t,E.lastDuplicateMessageAt=e,!0)}function gt(t,e,s={}){let n=W(s?.messageId||nt(e,t)),r=ls(t,e,{eventType:t,messageId:n,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",skipReasonDetailed:s?.skipReasonDetailed||"speculative_session_only",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),o=s?.reason||R.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,i=s?.skipReasonDetailed||"speculative_session_only";return $("info","\u8BB0\u5F55 speculative session\uFF0C\u672A\u8FDB\u5165\u6267\u884C\u8C03\u5EA6",{eventType:t,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:n,reason:o,detail:i}),ve({stage:"speculative_observed",eventType:t,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:n,reason:o,skipReasonDetailed:i,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",isSpeculativeSession:!0,eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",handledAt:Date.now()}),fe(r,{phase:N.IGNORED,skipReason:o,skipReasonDetailed:i,confirmationSource:s?.confirmationSource||"none",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0,completedAt:Date.now()}),pe(r,{phase:N.IGNORED,eventType:t,messageId:n,skipReason:o,skipReasonDetailed:i,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),r}function Ai(t,e,s=0,n={}){let r=W(n?.confirmedAssistantMessageId||n?.messageId||nt(e,t));if(!r)return gt(t,e,{...n,reason:n?.reason||R.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:n?.skipReasonDetailed||"missing_confirmed_message_identity",confirmationSource:n?.confirmationSource||"none"});let o=typeof e=="object"&&e?{...e,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||e?.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??e?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??e?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||e?.historicalReplayReason||""}:{messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||""},i=ls(t,o,{...n,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1}),a=Number.isFinite(s)?Math.max(0,s):Se().debounceMs,l=i?.sessionKey||`message::${r}`,c=E.pendingMessageTimers.get(l);c&&clearTimeout(c),fe(i,{phase:N.SCHEDULED,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1,scheduledAt:Date.now()}),pe(i,{phase:N.SCHEDULED,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1}),ve({stage:"scheduled",eventType:t,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:a}),$("info","\u5DF2\u8C03\u5EA6\u786E\u8BA4\u540E\u7684\u81EA\u52A8\u89E6\u53D1",{eventType:t,messageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",delayMs:a});let u=setTimeout(async()=>{E.pendingMessageTimers.delete(l),fe(i,{phase:N.DISPATCHING,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmedAssistantMessageId:r,isSpeculativeSession:!1}),pe(i,{phase:N.DISPATCHING,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1}),ve({stage:"dispatching",eventType:t,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:a}),await Ui(t,o)},a);return E.pendingMessageTimers.set(l,u),i}function Rn(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}function Li(t,e){return e?.triggerEvent==="MANUAL"?t.output?.mode===St.POST_RESPONSE_API?zt.MANUAL_POST_RESPONSE_API:zt.MANUAL_COMPATIBILITY:zt.AUTO_POST_RESPONSE_API}async function Ui(t,e){L(`${t}\u89E6\u53D1:`,e);let s=typeof e=="object"&&e?String(e?.confirmationSource||"").trim():"";$("info","\u5F00\u59CB\u5904\u7406\u81EA\u52A8\u89E6\u53D1",{eventType:t,incomingMessageId:nt(e,t),confirmationSource:s});let n=td(I.GENERATION_ENDED),r=n.map(v=>v.id),o=Gc(),i=nt(e,t),a=!!(typeof e=="object"&&e&&e?.eventBelongsToCurrentGeneration),l=!!(typeof e=="object"&&e&&e?.historicalReplayBlocked),c=typeof e=="object"&&e?String(e?.historicalReplayReason||"").trim():"",u=W((typeof e=="object"&&e?e?.confirmedAssistantMessageId:"")||i),d=ls(t,e,{eventType:t,messageId:i,confirmedAssistantMessageId:u,confirmationSource:s,eventBelongsToCurrentGeneration:a,historicalReplayBlocked:l,historicalReplayReason:c,candidateToolIds:r});if(fe(d,{phase:N.HANDLING,handledAt:Date.now(),confirmedAssistantMessageId:u,confirmationSource:s,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:a,historicalReplayBlocked:l,historicalReplayReason:c,candidateToolIds:r}),pe(d,{phase:N.HANDLING,eventType:t,messageId:i,confirmedAssistantMessageId:u,confirmationSource:s,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:a,historicalReplayBlocked:l,historicalReplayReason:c,candidateToolIds:r}),ve({stage:"handling",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,confirmedAssistantMessageId:u,confirmationSource:s,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:a,historicalReplayBlocked:l,historicalReplayReason:c,candidateToolIds:r,handledAt:Date.now()}),qr()&&!Vr()){$("warn","\u5F53\u524D\u5904\u4E8E\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B\u7A97\u53E3\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u5FFD\u7565",{eventType:t,candidateToolIds:r,uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil,lastUiTransitionSource:x.gateState.lastUiTransitionSource||""}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,selectedToolIds:r,skipReason:R.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,lockedAiMessageId:i||""}),is(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:R.UNRELATED_UI_EVENT,lastExecutionPath:"",lastWritebackStatus:X.NOT_APPLICABLE,lastFailureStage:""}),ve({stage:"ignored_ui_transition_guard",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,reason:R.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),fe(d,{phase:N.IGNORED,skipReason:R.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:N.IGNORED,eventType:t,messageId:i,skipReason:R.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Lt(n,{traceId:d?.traceId||"",eventType:t,messageId:i,messageKey:"",skipReason:R.UNRELATED_UI_EVENT,executionPath:"",writebackStatus:X.NOT_APPLICABLE,failureStage:""});return}if(x.gateState.lastGenerationDryRun){$("warn","\u5F53\u524D generation \u4E3A dryRun\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u963B\u65AD",{eventType:t,candidateToolIds:r,generationTraceId:x.gateState.lastGenerationTraceId||""}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,selectedToolIds:r,skipReason:R.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,lockedAiMessageId:i||""}),is(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:R.DRY_RUN_GENERATION,lastExecutionPath:"",lastWritebackStatus:X.NOT_APPLICABLE,lastFailureStage:""}),ve({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,reason:R.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),fe(d,{phase:N.SKIPPED,skipReason:R.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:N.SKIPPED,eventType:t,messageId:i,skipReason:R.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Lt(n,{traceId:d?.traceId||"",eventType:t,messageId:i,messageKey:"",skipReason:R.DRY_RUN_GENERATION,executionPath:"",writebackStatus:X.NOT_APPLICABLE,failureStage:""});return}if(o.skip){$("warn","\u6839\u636E\u76D1\u542C\u5668\u8BBE\u7F6E\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,reason:o.reason,listenerSettings:o.listenerSettings,candidateToolIds:r}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,selectedToolIds:r,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,lockedAiMessageId:i||""}),is(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:o.reason,lastExecutionPath:"",lastWritebackStatus:X.NOT_APPLICABLE,lastFailureStage:""}),ve({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,reason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),fe(d,{phase:N.SKIPPED,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:N.SKIPPED,eventType:t,messageId:i,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Lt(n,{traceId:d?.traceId||"",eventType:t,messageId:i,messageKey:"",skipReason:o.reason,executionPath:"",writebackStatus:X.NOT_APPLICABLE,failureStage:""});return}if(o.listenerSettings.ignoreQuietGeneration&&hc(x.gateState.lastGenerationType,x.gateState.lastGenerationParams,x.gateState.lastGenerationDryRun)){L("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C"),$("warn","\u68C0\u6D4B\u5230 quiet/dryRun\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,candidateToolIds:r}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",selectedToolIds:r,skipReason:R.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s}),is(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:R.QUIET_GENERATION,lastExecutionPath:"",lastWritebackStatus:X.NOT_APPLICABLE,lastFailureStage:""}),ve({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,reason:R.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),fe(d,{phase:N.SKIPPED,skipReason:R.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:N.SKIPPED,eventType:t,messageId:i,skipReason:R.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Lt(n,{traceId:d?.traceId||"",eventType:t,messageId:i,messageKey:"",skipReason:R.QUIET_GENERATION,executionPath:"",writebackStatus:X.NOT_APPLICABLE,failureStage:""});return}let p=await eo({...typeof e=="object"&&e?e:{},triggerEvent:t,...i?{messageId:i}:{},...u?{confirmedAssistantMessageId:u}:{},...s?{confirmationSource:s}:{},traceId:d?.traceId||"",sessionKey:d?.sessionKey||""});p.traceId=d?.traceId||p.traceId||cs("exec"),p.sessionKey=d?.sessionKey||p.sessionKey||"";let m=Zr(p.chatId,p.messageId,t);if(Wc(d,m),fe(d,{messageId:p.messageId||i,messageKey:Rn(p),confirmedAssistantMessageId:p.confirmedAssistantMessageId||u,confirmationSource:p.confirmationSource||s,sourceMessageLocked:!!p.messageId}),!p?.lastAiMessage){L(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`),$("warn","\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D\uFF0C\u81EA\u52A8\u89E6\u53D1\u4E2D\u6B62",{eventType:t,preferredMessageId:i,candidateToolIds:r});let v=Rn(p||{});Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:v,selectedToolIds:r,skipReason:R.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),is(n,{lastTriggerEvent:t,lastMessageKey:v,lastSkipReason:R.MISSING_AI_MESSAGE,lastExecutionPath:"",lastWritebackStatus:X.NOT_APPLICABLE,lastFailureStage:""}),ve({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||i,messageKey:v,reason:R.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r,handledAt:Date.now()}),fe(d,{phase:N.SKIPPED,skipReason:R.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",messageKey:v,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:N.SKIPPED,eventType:t,messageId:p?.messageId||i,messageKey:v,skipReason:R.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r}),Lt(n,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||i,messageKey:v,skipReason:R.MISSING_AI_MESSAGE,executionPath:"",writebackStatus:X.NOT_APPLICABLE,failureStage:""});return}let h=Rn(p);if(E.lastHandledMessageKey===h){Qc(h)&&(L(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${h}`),$("warn","\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD\uFF0C\u8DF3\u8FC7\u6267\u884C",{eventType:t,messageKey:h,candidateToolIds:r}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:h,selectedToolIds:r,skipReason:R.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),is(n,{lastTriggerEvent:t,lastMessageKey:h,lastSkipReason:R.DUPLICATE_MESSAGE,lastExecutionPath:"",lastWritebackStatus:X.NOT_APPLICABLE,lastFailureStage:""}),ve({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||i,messageKey:h,reason:R.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r,handledAt:Date.now()}),fe(d,{phase:N.SKIPPED,skipReason:R.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",messageKey:h,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:N.SKIPPED,eventType:t,messageId:p?.messageId||i,messageKey:h,skipReason:R.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r}),Lt(n,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||i,messageKey:h,skipReason:R.DUPLICATE_MESSAGE,executionPath:"",writebackStatus:X.NOT_APPLICABLE,failureStage:""}));return}let _=n;if(_.length===0){L("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177"),$("warn","\u5F53\u524D\u4E8B\u4EF6\u672A\u547D\u4E2D\u4EFB\u4F55\u53EF\u6267\u884C\u5DE5\u5177",{eventType:t,messageKey:h,candidateToolIds:r}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:h,selectedToolIds:[],skipReason:R.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),ve({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||i,messageKey:h,reason:R.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:[],handledAt:Date.now()}),fe(d,{phase:N.SKIPPED,skipReason:R.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",messageKey:h,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:[]}),pe(d,{phase:N.SKIPPED,eventType:t,messageId:p?.messageId||i,messageKey:h,skipReason:R.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:[]});return}E.lastHandledMessageKey=h,E.lastDuplicateMessageKey="",E.lastDuplicateMessageAt=0,p.messageKey=h,Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:h,selectedToolIds:_.map(v=>v.id),skipReason:"",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),L(`\u9700\u8981\u6267\u884C ${_.length} \u4E2A\u5DE5\u5177:`,_.map(v=>v.id)),$("info","\u81EA\u52A8\u89E6\u53D1\u547D\u4E2D\u5DE5\u5177",{eventType:t,messageKey:h,toolIds:_.map(v=>v.id)}),qe("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${_.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"}),fe(d,{messageKey:h,candidateToolIds:_.map(v=>v.id),executionPathIds:[],confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,phase:N.DISPATCHING}),pe(d,{phase:N.DISPATCHING,eventType:t,messageId:p?.messageId||i,messageKey:h,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:_.map(v=>v.id)}),Lt(_,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||i,messageKey:h,skipReason:"",executionPath:zt.AUTO_POST_RESPONSE_API,writebackStatus:"",failureStage:""});for(let v of _)try{let P=await zi(v,p),re=Li(v,p);d.executionPathIds.includes(re)||d.executionPathIds.push(re),Vc(v.id,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||i,messageKey:h,executionPath:re,writebackStatus:P?.result?.meta?.writebackStatus||P?.meta?.writebackStatus||X.NOT_APPLICABLE,failureStage:P?.result?.meta?.failureStage||P?.meta?.failureStage||"",success:!!P?.success}),P.success?(L(`\u5DE5\u5177 ${v.id} \u6267\u884C\u6210\u529F`),k.emit(C.TOOL_EXECUTED,{toolId:v.id,result:P.result||P.data||P})):L(`\u5DE5\u5177 ${v.id} \u6267\u884C\u5931\u8D25:`,P.error)}catch(P){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${v.id}`,P)}E.lastExecutionContext=p,ve({stage:"completed",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||i,messageKey:h,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:_.map(v=>v.id),handledAt:Date.now()}),fe(d,{phase:N.COMPLETED,messageKey:h,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:_.map(v=>v.id)}),pe(d,{phase:N.COMPLETED,eventType:t,messageId:p?.messageId||i,messageKey:h,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:_.map(v=>v.id),executionPathIds:[...d.executionPathIds||[]]})}async function Zc(t,e,s){return s||t.output?.mode===St.POST_RESPONSE_API?rs.runToolPostResponse(t,e):(await Oc()).executeToolWithConfig(t.id,e)}function Bi(){if(E.initialized){L("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}ed(),E.initialized=!0,L("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),k.emit(C.TOOL_TRIGGER_INITIALIZED)}function ed(){let t=st(I.GENERATION_ENDED,async n=>{let r=nt(n,I.GENERATION_ENDED),o=x.gateState.lastGenerationTraceId||"",i=ls(I.GENERATION_ENDED,n,{eventType:I.GENERATION_ENDED,messageId:r});ve({stage:"received",eventType:I.GENERATION_ENDED,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:r,receivedAt:Date.now()}),pe(i,{phase:N.RECEIVED,eventType:I.GENERATION_ENDED,messageId:r});let a=await jr({traceId:o,retries:6,retryDelayMs:80}),l=Si(a);if(!l.eligible){gt(I.GENERATION_ENDED,n,{messageId:r,reason:l.reason,skipReasonDetailed:l.detail,confirmationSource:"none"});return}let c=await In(r,{retries:r?3:8,retryDelayMs:r?120:260}),u=W(c?.sourceId);if(!u){gt(I.GENERATION_ENDED,n,{messageId:r,reason:R.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"missing_new_assistant_message_after_generation",confirmationSource:"none",eventBelongsToCurrentGeneration:!!a,historicalReplayBlocked:!1,historicalReplayReason:""});return}await Ui(I.GENERATION_ENDED,{...typeof n=="object"&&n?n:{},messageId:u,confirmedAssistantMessageId:u,confirmationSource:"generation_ended",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})}),e=st(I.GENERATION_AFTER_COMMANDS,async n=>{let r=nt(n,I.GENERATION_AFTER_COMMANDS),o=x.gateState.lastGenerationTraceId||"",{debounceMs:i}=Se(),a=ls(I.GENERATION_AFTER_COMMANDS,n,{eventType:I.GENERATION_AFTER_COMMANDS,messageId:r});if(ve({stage:"received",eventType:I.GENERATION_AFTER_COMMANDS,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:r,receivedAt:Date.now(),scheduledDelayMs:i}),pe(a,{phase:N.RECEIVED,eventType:I.GENERATION_AFTER_COMMANDS,messageId:r}),!Se().useGenerationAfterCommandsFallback){fe(a,{phase:N.IGNORED,skipReason:"generation_after_commands_fallback_disabled",completedAt:Date.now()}),pe(a,{phase:N.IGNORED,eventType:I.GENERATION_AFTER_COMMANDS,messageId:r,skipReason:"generation_after_commands_fallback_disabled"});return}let l=await jr({traceId:o,retries:6,retryDelayMs:80}),c=Si(l);if(!r){gt(I.GENERATION_AFTER_COMMANDS,n,{reason:R.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:c.eligible?"generation_after_commands_without_message_identity":c.detail,confirmationSource:"none"});return}if(!c.eligible){gt(I.GENERATION_AFTER_COMMANDS,n,{messageId:r,reason:c.reason,skipReasonDetailed:c.detail,confirmationSource:"none"});return}let u=await In(r,{retries:2,retryDelayMs:120}),d=W(u?.sourceId);if(!d){gt(I.GENERATION_AFTER_COMMANDS,n,{messageId:r,reason:R.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:"generation_after_commands_message_not_confirmed",confirmationSource:"none",eventBelongsToCurrentGeneration:!!l,historicalReplayBlocked:!1,historicalReplayReason:""});return}Ai(I.GENERATION_AFTER_COMMANDS,n,i,{messageId:r,confirmedAssistantMessageId:d,confirmationSource:"generation_after_commands",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})}),s=st(I.MESSAGE_RECEIVED,async n=>{let r=nt(n,I.MESSAGE_RECEIVED),o=r?await wc(r,{retries:3,retryDelayMs:120}):null,i=o?.message||null,a=i?Gn(i):"",l=o?W(Pn(i,o.index)):"",c=r||l,{debounceMs:u}=Se(),d=ls(I.MESSAGE_RECEIVED,n,{eventType:I.MESSAGE_RECEIVED,messageId:c,messageRole:a});if(!r){$("info","MESSAGE_RECEIVED \u7F3A\u5C11\u6D88\u606F\u8EAB\u4EFD\uFF0C\u5224\u5B9A\u4E3A\u5BBF\u4E3B UI \u5E72\u6270\u4E8B\u4EF6\uFF0C\u8DF3\u8FC7",{rawEventData:n??null}),ve({stage:"ignored_ui_side_effect",eventType:I.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:"",messageRole:a,reason:R.UNRELATED_UI_EVENT,handledAt:Date.now()}),fe(d,{phase:N.IGNORED,skipReason:R.UNRELATED_UI_EVENT,completedAt:Date.now(),messageRole:a}),pe(d,{phase:N.IGNORED,eventType:I.MESSAGE_RECEIVED,messageId:"",messageRole:a,skipReason:R.UNRELATED_UI_EVENT});return}if(ve({stage:"received",eventType:I.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:c,messageRole:a,receivedAt:Date.now(),scheduledDelayMs:u}),pe(d,{phase:N.RECEIVED,eventType:I.MESSAGE_RECEIVED,messageId:c,messageRole:a}),!Se().useMessageReceivedFallback){fe(d,{phase:N.IGNORED,skipReason:"message_received_fallback_disabled",completedAt:Date.now(),messageRole:a}),pe(d,{phase:N.IGNORED,eventType:I.MESSAGE_RECEIVED,messageId:c,messageRole:a,skipReason:"message_received_fallback_disabled"});return}if(!o){gt(I.MESSAGE_RECEIVED,n,{messageId:r,reason:R.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_identity_not_resolved",confirmationSource:"none"});return}if(i&&a!=="assistant"){$("info","MESSAGE_RECEIVED \u547D\u4E2D\u975E AI \u6D88\u606F\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1\u8C03\u5EA6",{messageId:c,messageRole:a}),ve({stage:"ignored_non_assistant",eventType:I.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:c,messageRole:a,reason:R.NON_ASSISTANT_MESSAGE,handledAt:Date.now()}),fe(d,{phase:N.IGNORED,skipReason:R.NON_ASSISTANT_MESSAGE,completedAt:Date.now(),messageRole:a}),pe(d,{phase:N.IGNORED,eventType:I.MESSAGE_RECEIVED,messageId:c,messageRole:a,skipReason:R.NON_ASSISTANT_MESSAGE});return}let p=await Pc(o,{traceId:x.gateState.lastGenerationTraceId||""});if(!p.allowed){gt(I.MESSAGE_RECEIVED,n,{messageId:c,reason:p.reason,skipReasonDetailed:p.detail,confirmationSource:"none",eventBelongsToCurrentGeneration:p.eventBelongsToCurrentGeneration,historicalReplayBlocked:p.historicalReplayBlocked,historicalReplayReason:p.historicalReplayReason});return}let m=await In(c,{retries:3,retryDelayMs:120}),h=W(m?.sourceId);if(!h){gt(I.MESSAGE_RECEIVED,n,{messageId:c,reason:R.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_not_confirmed_as_new_assistant",confirmationSource:"none",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""});return}Ai(I.MESSAGE_RECEIVED,n,u,{messageId:c,confirmedAssistantMessageId:h,confirmationSource:"message_received",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})});E.listeners.set(I.GENERATION_ENDED,t),E.listeners.set(I.GENERATION_AFTER_COMMANDS,e),E.listeners.set(I.MESSAGE_RECEIVED,s)}async function eo(t){let e=await Qr(),s=rt(),n=s?.getContext?.()||null,r=t?.triggerEvent||"GENERATION_ENDED",o=W(t?.confirmedAssistantMessageId||nt(t,r)),i=String(t?.confirmationSource||"").trim(),a=r==="MANUAL"||r==="MANUAL_PREVIEW",l=null,c=W(o);a||(l=await In(c,{retries:c?3:8,retryDelayMs:c?120:260}),l&&(c=W(l.sourceId)));let u=Ac(r,t,c)||!!c,d=await gc({preferredMessageId:c||null,retries:a||c?2:0,retryDelayMs:120,lockToMessageId:u}),p=d.messages||[],m=d.lastUserMessage,h=d.lastAiMessage;a||(l?W(h?.sourceId)!==c&&(h=l):h=null);let _=c||W(h?.sourceId)||"";return{triggeredAt:Date.now(),triggerEvent:r,traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",confirmationSource:i,confirmedAssistantMessageId:_,chatId:Nn(s,n,e),messageId:_,lastAiMessage:h?.content||"",userMessage:m?.content||x.gateState.lastUserMessageText||"",chatMessages:p,input:{userMessage:m?.content||x.gateState.lastUserMessageText||"",lastAiMessage:h?.content||"",extractedContent:"",previousToolOutput:"",context:{character:e?.name||"",chatLength:p.length||0}},config:{},status:"pending"}}function td(t){return ts().filter(s=>{let n=s?.trigger?.enabled&&s?.trigger?.event===t,r=Array.isArray(s?.triggerEvents)&&s.triggerEvents.includes(t);return(n||r)&&rs.shouldRunPostResponse(s)})}function An(t,e){try{kr(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function zi(t,e){let s=Date.now(),n=t.id,r=e?.triggerEvent==="MANUAL",o=`yyt-tool-run-${n}`,i=Li(t,e),a=e?.messageKey||Rn(e||{});An(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:a,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:"",lastFailureStage:""}),k.emit(C.TOOL_EXECUTION_REQUESTED,{toolId:n,traceId:e?.traceId||"",triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),qe("info",`${r?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:o}),$("info","\u5F00\u59CB\u6267\u884C\u5DE5\u5177",{toolId:n,toolName:t.name,triggerEvent:e?.triggerEvent,executionPath:i,messageKey:a});try{let l=await Zc(t,e,r),c=Date.now()-s;if(l?.success){let p=ie(n);An(n,{lastStatus:"success",lastError:"",lastDurationMs:c,lastTraceId:e?.traceId||"",successCount:(p?.runtime?.successCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:a,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:l?.meta?.writebackStatus||X.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||""});let m=r?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return b("success",m),qe("success",m,{duration:3200,noticeId:o}),$("info","\u5DE5\u5177\u6267\u884C\u6210\u529F",{toolId:n,traceId:e?.traceId||"",executionPath:i,duration:c,writebackStatus:l?.meta?.writebackStatus||X.NOT_APPLICABLE}),{success:!0,duration:c,result:l}}let u=ie(n),d=l?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25";return An(n,{lastStatus:"error",lastError:d,lastDurationMs:c,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:a,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:l?.meta?.writebackStatus||X.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||(i===zt.MANUAL_COMPATIBILITY?Fe.COMPATIBILITY_EXECUTE:Fe.UNKNOWN)}),b("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),qe("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),$("error","\u5DE5\u5177\u6267\u884C\u5931\u8D25",{toolId:n,traceId:e?.traceId||"",executionPath:i,duration:c,error:d,failureStage:l?.meta?.failureStage||""}),{success:!1,duration:c,error:d,result:l}}catch(l){let c=Date.now()-s,u=ie(n),d=l?.message||String(l);throw An(n,{lastStatus:"error",lastError:d,lastDurationMs:c,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:a,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:X.NOT_APPLICABLE,lastFailureStage:i===zt.MANUAL_COMPATIBILITY?Fe.COMPATIBILITY_EXECUTE:Fe.UNKNOWN}),b("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),qe("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),$("error","\u5DE5\u5177\u6267\u884C\u629B\u51FA\u5F02\u5E38",{toolId:n,traceId:e?.traceId||"",executionPath:i,duration:c,error:d}),l}}async function to(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ie(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return es(t,{lastTriggerAt:Date.now(),lastTriggerEvent:"MANUAL",lastMessageKey:"",lastSkipReason:R.TOOL_DISABLED,lastExecutionPath:"",lastWritebackStatus:X.NOT_APPLICABLE,lastFailureStage:""},{touchLastRunAt:!1,emitEvent:!1}),qe("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await eo({triggerEvent:"MANUAL"});return $("info","\u624B\u52A8\u6267\u884C\u5DE5\u5177",{toolId:t}),zi(e,s)}async function so(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ie(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await eo({triggerEvent:"MANUAL_PREVIEW"});return rs.previewExtraction(e,s)}function sd(){for(let t of E.pendingMessageTimers.values())clearTimeout(t);E.pendingMessageTimers.clear();for(let t of E.listeners.values())typeof t=="function"&&t();E.listeners.clear(),E.messageSessions.clear(),E.recentSessionHistory=[],E.recentEventTimeline=[],E.initialized=!1,E.lastExecutionContext=null,E.lastHandledMessageKey="",E.lastAutoTriggerSnapshot=null,E.lastEventDebugSnapshot=null,E.lastDuplicateMessageKey="",E.lastDuplicateMessageAt=0,L("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function nd(){let t=Array.from(E.messageSessions.values()).map(as).filter(Boolean).sort((n,r)=>(Number(n?.updatedAt)||0)-(Number(r?.updatedAt)||0)),e=[...E.recentSessionHistory].map(as).filter(Boolean),s=[...E.recentEventTimeline].map(Gi).filter(Boolean);return{initialized:E.initialized,listenersCount:E.listeners.size,activeSessionCount:E.messageSessions.size,activeSessions:t,recentSessionHistory:e,recentEventTimeline:s,lastExecutionContext:E.lastExecutionContext,lastAutoTriggerSnapshot:E.lastAutoTriggerSnapshot,lastEventDebugSnapshot:E.lastEventDebugSnapshot,registeredEvents:Array.from(E.listeners.keys()),pendingTimerCount:E.pendingMessageTimers.size,lastHandledMessageKey:E.lastHandledMessageKey,listenerSettings:Se(),eventBridge:Oi(),gateState:Ni()}}function Ln(t={}){let e=parseInt(t?.historyLimit,10),s=Number.isFinite(e)?Math.max(1,Math.min(50,e)):8,n=x.gateState.lastGenerationBaseline,r=Array.from(E.messageSessions.values()).map(as).filter(Boolean).sort((u,d)=>(Number(u?.updatedAt)||0)-(Number(d?.updatedAt)||0)),o=Cn([...E.recentSessionHistory],s).map(as),i=Cn([...E.recentEventTimeline],Math.max(s*3,s)).map(Gi),a={activeSessions:_i(r),recentSessionHistory:_i(o)},l={activeSessions:wi(r),recentSessionHistory:wi(o)},c=Xc({summary:{listenerSettings:Se()},activeSessions:r,recentSessionHistory:o,lastEventDebugSnapshot:E.lastEventDebugSnapshot,lastAutoTriggerSnapshot:E.lastAutoTriggerSnapshot});return{summary:{generationTraceId:x.gateState.lastGenerationTraceId||"",generationType:x.gateState.lastGenerationType||"",generationDryRun:!!x.gateState.lastGenerationDryRun,generationStartedAt:n?.startedAt||0,generationEndedAt:x.gateState.lastGenerationAt||0,isGenerating:!!x.gateState.isGenerating,baselineMessageCount:n?.messageCount||0,baselineAssistantId:n?.lastAssistantMessageId||"",uiTransitionGuardActive:qr(),uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:x.gateState.lastUiTransitionSource||"",activeSessionCount:E.messageSessions.size,pendingTimerCount:E.pendingMessageTimers.size,lastHandledMessageKey:E.lastHandledMessageKey||"",lastDuplicateMessageKey:E.lastDuplicateMessageKey||"",registeredEvents:Array.from(E.listeners.keys()),listenerSettings:Se(),eventBridge:Oi(),gateState:Ni(),phaseCounts:a,consistency:l,verdictHints:c,..._t()},activeSessions:r,recentSessionHistory:o,recentEventTimeline:i,verdictHints:c,lastEventDebugSnapshot:as(E.lastEventDebugSnapshot),lastAutoTriggerSnapshot:as(E.lastAutoTriggerSnapshot)}}function no(t={}){let e=Ln(t);return JSON.parse(JSON.stringify({exportedAt:Date.now(),schemaVersion:"auto-trigger-diagnostics.v1",...e}))}async function Kr(){if(x.isInitialized){L("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316"),$("info","\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316\uFF0C\u8DF3\u8FC7\u91CD\u590D\u521D\u59CB\u5316");return}let t=rt();if(!t){L("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),$("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!1,hasEventTypes:!1}),setTimeout(Kr,1e3);return}let e=await Tc(),s=e?.eventSource||$n(),n=e?.eventTypes||On();if(!s){L("\u65E0\u6CD5\u83B7\u53D6SillyTavern\u4E8B\u4EF6\u6E90\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),$("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,importError:ne.importError?.message||""}),setTimeout(Kr,1e3);return}$("info","\u5F00\u59CB\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,listenerSettings:Se()}),$("info","\u4F7F\u7528\u4E8B\u4EF6\u6E90",{source:e?.source||ne.source||"unknown"}),mc(),st(I.MESSAGE_SENT,async r=>{let i=(await Xr({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(a=>a.role==="user").pop();Et({lastUserSendIntentAt:Date.now(),lastUserIntentSource:"message_sent",lastUserMessageId:r,lastUserMessageAt:Date.now(),lastUserMessageText:i?.content||x.gateState.lastUserMessageText||""}),L(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${r}`),$("info","\u8BB0\u5F55\u7528\u6237\u53D1\u9001\u610F\u56FE",{messageId:r,lastUserMessage:i?.content||""}),Ut({kind:"gate_event",eventType:I.MESSAGE_SENT,messageId:r,phase:"user_intent_recorded",detail:"message_sent"})}),st(I.GENERATION_STARTED,async(r,o,i)=>{let a=Date.now(),l=cs("generation"),c=Ic(r,o||null,a),u=c.startedByUserIntent,d=c.userIntentDetectedAt,p=c.userIntentSource,m=c.userIntentDetail,h=Mc({traceId:l,startedAt:a,type:r,params:o||null,dryRun:!!i,startedByUserIntent:u,userIntentDetectedAt:d,userIntentSource:p,userIntentDetail:m,baselineResolved:!1,provisional:!0,baselineSource:"generation_started_sync_provisional"});Et({lastGenerationTraceId:l,lastGenerationType:r,lastGenerationParams:o||null,lastGenerationDryRun:!!i,isGenerating:!0,lastGenerationBaseline:h}),L(`\u751F\u6210\u5F00\u59CB: ${r}`),$("info","\u6536\u5230\u751F\u6210\u5F00\u59CB\u4E8B\u4EF6",{type:r,dryRun:!!i,params:o||null,traceId:l,startedByUserIntent:u,userIntentSource:p,userIntentDetail:m,baseline:h}),Ut({kind:"generation_event",eventType:I.GENERATION_STARTED,traceId:l,phase:"generation_started",detail:ki(r,o||null),generationTraceId:l,baselineResolved:!1,generationStartedByUserIntent:u,generationUserIntentSource:p}),Rc({traceId:l,startedAt:a,type:r,params:o||null,dryRun:!!i,startedByUserIntent:u,userIntentDetectedAt:d,userIntentSource:p,userIntentDetail:m,baselineResolved:!0,provisional:!1,baselineResolutionAt:Date.now(),baselineSource:"generation_started_async_resolved"}).then(_=>{let v=x.gateState.lastGenerationBaseline;if(!v||v.traceId!==l){$("info","generation baseline \u5DF2\u8FC7\u671F\uFF0C\u653E\u5F03\u56DE\u586B",{traceId:l,currentTraceId:v?.traceId||""});return}Et({lastGenerationBaseline:_}),$("info","generation baseline \u5DF2\u5B8C\u6210\u89E3\u6790",{traceId:l,baseline:_}),Ut({kind:"generation_baseline",eventType:I.GENERATION_STARTED,traceId:l,phase:"baseline_resolved",detail:_?.baselineSource||"generation_started_async_resolved",generationTraceId:l,baselineResolved:!0,generationStartedByUserIntent:_?.startedByUserIntent,generationUserIntentSource:_?.userIntentSource||""})}).catch(_=>{let v=x.gateState.lastGenerationBaseline;if(!v||v.traceId!==l)return;let P={...v,baselineResolved:!0,baselineResolutionAt:Date.now(),provisional:!1,baselineSource:"generation_started_async_failed_fallback"};Et({lastGenerationBaseline:P}),$("warn","generation baseline \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u56DE\u9000\u5230 provisional baseline",{traceId:l,error:_?.message||String(_),baseline:P}),Ut({kind:"generation_baseline",eventType:I.GENERATION_STARTED,traceId:l,phase:"baseline_fallback",reason:"generation_baseline_async_failed",detail:_?.message||String(_),generationTraceId:l,baselineResolved:!0,generationStartedByUserIntent:P?.startedByUserIntent,generationUserIntentSource:P?.userIntentSource||""})})}),st(I.GENERATION_ENDED,()=>{Et({lastGenerationAt:Date.now(),isGenerating:!1}),L("\u751F\u6210\u7ED3\u675F"),$("info","\u6536\u5230\u751F\u6210\u7ED3\u675F\u4E8B\u4EF6"),Ut({kind:"generation_event",eventType:I.GENERATION_ENDED,traceId:x.gateState.lastGenerationTraceId||"",phase:"generation_ended",generationTraceId:x.gateState.lastGenerationTraceId||""})}),st(I.CHAT_CHANGED,r=>{Ti(I.CHAT_CHANGED),Ei("chat_changed"),$("info","\u6536\u5230\u804A\u5929\u5207\u6362\u4E8B\u4EF6",{data:r??null}),Ut({kind:"ui_guard",eventType:I.CHAT_CHANGED,phase:"ui_transition_guard_entered",detail:"chat_changed"})}),st(I.CHAT_CREATED,r=>{Ti(I.CHAT_CREATED),Ei("chat_created"),$("info","\u6536\u5230\u804A\u5929\u521B\u5EFA\u4E8B\u4EF6",{data:r??null}),Ut({kind:"ui_guard",eventType:I.CHAT_CREATED,phase:"ui_transition_guard_entered",detail:"chat_created"})}),Bi(),x.isInitialized=!0,L("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210"),$("info","\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210",{listenerSettings:Se()})}function rd(t){x.debugMode=t}var I,x,cc,ne,R,zt,N,Ii,dc,vi,uc,pc,En,E,ro=F(()=>{Ee();ws();ss();Br();Je();I={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},x={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""},isInitialized:!1,debugMode:!1},cc="/script.js",ne={eventSource:null,eventTypes:null,source:"",scriptModule:null,loadingPromise:null,importError:null},R={LISTENER_DISABLED:"listener_disabled",QUIET_GENERATION:"quiet_generation",DRY_RUN_GENERATION:"dry_run_generation",IGNORED_AUTO_TRIGGER:"ignored_auto_trigger",UNRELATED_UI_EVENT:"ui_side_effect_event",SPECULATIVE_FALLBACK_WITHOUT_MESSAGE:"speculative_generation_after_commands",NO_CONFIRMED_ASSISTANT_MESSAGE:"no_confirmed_assistant_message",HISTORICAL_REPLAY_MESSAGE_RECEIVED:"historical_replay_message_received",MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION:"message_received_outside_active_generation",NON_ASSISTANT_MESSAGE:"non_assistant_message",MISSING_AI_MESSAGE:"missing_ai_message",DUPLICATE_MESSAGE:"duplicate_message",NO_ELIGIBLE_TOOLS:"no_eligible_tools",TOOL_DISABLED:"tool_disabled"},zt={AUTO_POST_RESPONSE_API:"auto_post_response_api",MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"},N={RECEIVED:"received",SCHEDULED:"scheduled",DISPATCHING:"dispatching",HANDLING:"handling",COMPLETED:"completed",SKIPPED:"skipped",IGNORED:"ignored"},Ii=15e3,dc=1500,vi=1800,uc=5e3,pc=new Set(["regenerate","swipe"]),En=null;E={initialized:!1,listeners:new Map,messageSessions:new Map,recentSessionHistory:[],recentEventTimeline:[],lastExecutionContext:null,lastHandledMessageKey:"",pendingMessageTimers:new Map,lastAutoTriggerSnapshot:null,lastEventDebugSnapshot:null,lastDuplicateMessageKey:"",lastDuplicateMessageAt:0}});var Fi={};ue(Fi,{TOOL_CONFIG_PANEL_STYLES:()=>Hi,createToolConfigPanel:()=>wt,default:()=>od});function wt(t){let{id:e,toolId:s,postResponseHint:n,extractionPlaceholder:r,previewDialogId:o,previewTitle:i="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let a=ie(this.toolId);if(!a)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=a.output?.apiPreset||a.apiPreset||"",u=this._getBypassPresets(),d=a.output?.mode||"follow_ai",p=a.bypass?.enabled||!1,m=a.bypass?.presetId||"",h=a.runtime?.lastStatus||"idle",_=a.runtime?.lastRunAt?new Date(a.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",v=a.runtime?.lastError||"",P=a.extraction||{},re=Array.isArray(P.selectors)?P.selectors.join(`
`):"",oe=d==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",ye=Ln({historyLimit:8}),le=this._buildDiagnosticsHtml(a.runtime||{},ye),$e=d==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",M=c||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${S(a.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${S(a.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${S($e)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${S(M)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${S(h)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${g}-tool-save-top">
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
              <select class="yyt-select" id="${g}-tool-output-mode">
                <option value="follow_ai" ${d==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${d==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${oe}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${g}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${l.map(D=>`
                  <option value="${S(D.name)}" ${D.name===c?"selected":""}>
                    ${S(D.name)}
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
                <input type="checkbox" id="${g}-tool-bypass-enabled" ${p?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${p?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${g}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${u.map(D=>`
                  <option value="${S(D.id)}" ${D.id===m?"selected":""}>
                    ${S(D.name)}${D.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="number" class="yyt-input" id="${g}-tool-max-messages" min="1" max="50" value="${Number(P.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${g}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${S(r)}">${S(re)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${g}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${g}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${S(a.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${S(h)}">${S(h)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${S(_)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${a.runtime?.successCount||0} / ${a.runtime?.errorCount||0}</span>
                </div>
                ${v?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${S(v)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${g}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${g}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${g}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86\u7834\u9650\u8BCD\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>

          ${le}
        </div>
      `},_formatDiagnosticValue(a,l="\u672A\u8BB0\u5F55"){let c=String(a||"").trim();return S(c||l)},_formatDiagnosticTime(a){let l=Number(a)||0;return l>0?new Date(l).toLocaleString():"\u672A\u8BB0\u5F55"},_formatSkipReason(a){return{listener_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u81EA\u52A8\u76D1\u542C\u5DF2\u5173\u95ED",quiet_generation:"\u5DF2\u8DF3\u8FC7\uFF1Aquiet / dryRun \u751F\u6210",dry_run_generation:"\u5DF2\u8DF3\u8FC7\uFF1A\u5F53\u524D generation \u4E3A dryRun",ignored_auto_trigger:"\u5DF2\u8DF3\u8FC7\uFF1A\u76D1\u542C\u5668\u8BBE\u7F6E\u5FFD\u7565\u4E86\u975E\u7528\u6237\u610F\u56FE\u751F\u6210",ui_side_effect_event:"\u5DF2\u5FFD\u7565\uFF1A\u5BBF\u4E3B UI \u526F\u4F5C\u7528\u4E8B\u4EF6",speculative_generation_after_commands:"\u5DF2\u5FFD\u7565\uFF1A\u4EC5\u8BB0\u5F55 GENERATION_AFTER_COMMANDS \u89C2\u5BDF\u6001 session",no_confirmed_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u786E\u8BA4\u5230\u672C\u8F6E assistant \u65B0\u697C\u5C42",historical_replay_message_received:"\u5DF2\u62E6\u622A\uFF1A\u5386\u53F2 assistant \u6D88\u606F\u91CD\u653E\u4E8B\u4EF6",message_received_outside_active_generation:"\u5DF2\u62E6\u622A\uFF1AMESSAGE_RECEIVED \u4E0D\u5C5E\u4E8E\u5F53\u524D\u751F\u6210\u7A97\u53E3",non_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u7684\u5E76\u975E AI \u697C\u5C42",missing_ai_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D",duplicate_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD",no_eligible_tools:"\u5DF2\u8DF3\u8FC7\uFF1A\u6CA1\u6709\u547D\u4E2D\u53EF\u6267\u884C\u5DE5\u5177",tool_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u5DE5\u5177\u672A\u542F\u7528",generation_after_commands_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AGENERATION_AFTER_COMMANDS \u515C\u5E95\u5DF2\u5173\u95ED",message_received_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AMESSAGE_RECEIVED \u515C\u5E95\u5DF2\u5173\u95ED"}[a]||a||"\u65E0"},_formatExecutionPath(a){return{auto_post_response_api:"\u81EA\u52A8\u94FE\uFF1Apost_response_api",manual_post_response_api:"\u624B\u52A8\u94FE\uFF1Apost_response_api",manual_compatibility:"\u624B\u52A8\u94FE\uFF1Acompatibility \u56DE\u9000"}[a]||a||"\u672A\u8BB0\u5F55"},_formatWritebackStatus(a){return{success:"\u5199\u56DE\u6210\u529F",failed:"\u5199\u56DE\u5931\u8D25",skipped_empty_output:"\u65E0\u8F93\u51FA\uFF0C\u8DF3\u8FC7\u5199\u56DE",not_applicable:"\u4E0D\u9002\u7528"}[a]||a||"\u672A\u8BB0\u5F55"},_formatFailureStage(a){return{build_messages:"\u6784\u9020\u8BF7\u6C42\u6D88\u606F",send_api_request:"\u53D1\u9001 API \u8BF7\u6C42",extract_output:"\u63D0\u53D6\u5DE5\u5177\u8F93\u51FA",inject_context:"\u5199\u56DE\u4E0A\u4E0B\u6587",compatibility_execute:"\u517C\u5BB9\u6267\u884C\u5165\u53E3",unknown:"\u672A\u77E5\u9636\u6BB5"}[a]||a||"\u65E0"},_formatHistoryTime(a){return this._formatDiagnosticTime(a)},_formatPhaseCountsText(a={}){let l=Object.entries(a||{}).filter(([,c])=>Number(c)>0);return l.length?l.map(([c,u])=>`${c}:${u}`).join(" / "):"\u65E0"},_formatEventBridgeText(a={}){if(!a||a.ready!==!0)return"\u672A\u5C31\u7EEA";let l=String(a.source||"").trim();return l?`\u5DF2\u5C31\u7EEA\uFF08${l}\uFF09`:"\u5DF2\u5C31\u7EEA"},_formatVerdictHintLabel(a=""){return{a10BaselineRaceSuspicious:"A10 baseline",a11ReplaySuspicious:"A11 replay",a12UserIntentSuspicious:"A12 user intent",a13AutoTriggerLeakSuspicious:"A13 auto trigger"}[a]||a||"\u672A\u77E5\u9879"},_buildVerdictHintsHtml(a={}){let l=Object.entries(a||{});return l.length?`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">N1 \u5FEB\u901F\u5224\u8BFB</div>
          <div class="yyt-tool-debug-chip-list">
            ${l.map(([c,u])=>{let d=!!u?.flagged,p=Array.isArray(u?.reasons)?u.reasons.filter(Boolean):[],m=p.length?S(p.join(" | ")):"\u672A\u89C1\u660E\u663E\u53EF\u7591\u4FE1\u53F7";return`
                <span class="yyt-tool-debug-chip ${d?"yyt-tool-debug-chip-warning":"yyt-tool-debug-chip-ok"}" title="${m}">
                  ${S(this._formatVerdictHintLabel(c))}
                  <strong>${d?"\u53EF\u7591":"\u6B63\u5E38"}</strong>
                </span>
              `}).join("")}
          </div>
        </div>
      `:""},_buildTimelineSection(a,l=[]){let c=Array.isArray(l)?l.filter(Boolean).slice().reverse():[];if(!c.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${S(a)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let u=c.map(d=>{let p=this._formatDiagnosticValue(d.eventType||d.kind,"\u672A\u8BB0\u5F55"),m=this._formatDiagnosticValue(d.traceId,"\u65E0"),h=this._formatDiagnosticValue(d.sessionKey,"\u65E0"),_=[d.phase?`\u9636\u6BB5\uFF1A${d.phase}`:"",d.messageId?`\u6D88\u606F\uFF1A${d.messageId}`:"",d.confirmationSource?`\u786E\u8BA4\uFF1A${d.confirmationSource}`:"",d.reason?`\u539F\u56E0\uFF1A${this._formatSkipReason(d.reason)}`:"",d.detail?`\u8BE6\u60C5\uFF1A${d.detail}`:""].filter(Boolean);return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${S(this._formatHistoryTime(d.at))}</span>
              <span>${p}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              trace\uFF1A${m}<br>
              session\uFF1A${h}<br>
              ${S(_.join(" / ")||"\u65E0\u9644\u52A0\u8BE6\u60C5")}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${S(a)}</div>
          <div class="yyt-tool-debug-history-list">${u}</div>
        </div>
      `},_copyText(a){let l=String(a||"");if(!l)return!1;try{if(navigator?.clipboard?.writeText)return navigator.clipboard.writeText(l),!0}catch{}try{let c=document.createElement("textarea");c.value=l,c.setAttribute("readonly","readonly"),c.style.position="fixed",c.style.opacity="0",document.body.appendChild(c),c.select();let u=document.execCommand("copy");return document.body.removeChild(c),u}catch{return!1}},_copyAutoTriggerDiagnostics(){try{let a=no({historyLimit:8});this._copyText(JSON.stringify(a,null,2))?b("success","\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u5DF2\u590D\u5236"):b("warning","\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u5728\u63A7\u5236\u53F0\u5BFC\u51FA")}catch(a){b("error",a?.message||"\u5BFC\u51FA\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u5931\u8D25")}},_buildHistorySection(a,l=[],c="trigger"){let u=Array.isArray(l)?l.filter(Boolean).slice().reverse():[];if(!u.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${S(a)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let d=u.map(p=>{let m=this._formatDiagnosticValue(p.eventType,"\u672A\u8BB0\u5F55"),h=this._formatDiagnosticValue(p.messageKey||p.messageId,"\u672A\u8BB0\u5F55"),_=this._formatDiagnosticValue(p.traceId,"\u65E0"),v=c==="writeback"?`\u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(p.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(p.writebackStatus)} / \u5931\u8D25\u9636\u6BB5\uFF1A${this._formatFailureStage(p.failureStage)}`:`\u8DF3\u8FC7\u539F\u56E0\uFF1A${this._formatSkipReason(p.skipReason)} / \u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(p.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(p.writebackStatus)}`;return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${S(this._formatHistoryTime(p.at))}</span>
              <span>trace ${_}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              \u4E8B\u4EF6\uFF1A${m}<br>
              \u6D88\u606F\uFF1A${h}<br>
              ${S(v)}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${S(a)}</div>
          <div class="yyt-tool-debug-history-list">${d}</div>
        </div>
      `},_buildDiagnosticsHtml(a,l=null){let c=a||{},u=l||null,d=u?.summary||{},p=!!(Array.isArray(u?.activeSessions)&&u.activeSessions.length>0||Array.isArray(u?.recentSessionHistory)&&u.recentSessionHistory.length>0||Array.isArray(u?.recentEventTimeline)&&u.recentEventTimeline.length>0||d?.activeSessionCount||d?.pendingTimerCount||d?.lastHandledMessageKey||d?.eventBridge?.ready);if(!!!(c.lastTriggerAt||c.lastTriggerEvent||c.lastMessageKey||c.lastSkipReason||c.lastExecutionPath||c.lastWritebackStatus||c.lastFailureStage||c.lastTraceId||Array.isArray(c.recentTriggerHistory)&&c.recentTriggerHistory.length>0||Array.isArray(c.recentWritebackHistory)&&c.recentWritebackHistory.length>0||p))return"";let h=[["\u6700\u8FD1\u89E6\u53D1\u65F6\u95F4",this._formatDiagnosticTime(c.lastTriggerAt)],["\u6700\u8FD1\u89E6\u53D1\u4E8B\u4EF6",this._formatDiagnosticValue(c.lastTriggerEvent)],["\u6700\u8FD1 Trace",this._formatDiagnosticValue(c.lastTraceId,"\u65E0")],["\u6700\u8FD1\u6D88\u606F\u952E",this._formatDiagnosticValue(c.lastMessageKey)],["\u6700\u8FD1\u8DF3\u8FC7\u539F\u56E0",this._formatDiagnosticValue(this._formatSkipReason(c.lastSkipReason),"\u65E0")],["\u6700\u8FD1\u6267\u884C\u8DEF\u5F84",this._formatDiagnosticValue(this._formatExecutionPath(c.lastExecutionPath))],["\u6700\u8FD1\u5199\u56DE\u72B6\u6001",this._formatDiagnosticValue(this._formatWritebackStatus(c.lastWritebackStatus))],["\u6700\u8FD1\u5931\u8D25\u9636\u6BB5",this._formatDiagnosticValue(this._formatFailureStage(c.lastFailureStage),"\u65E0")]],_=this._buildHistorySection("\u6700\u8FD1\u89E6\u53D1\u5386\u53F2",c.recentTriggerHistory||[],"trigger"),v=this._buildHistorySection("\u6700\u8FD1\u5199\u56DE\u5386\u53F2",c.recentWritebackHistory||[],"writeback"),P=p?[["\u5F53\u524D active / timers",`${d.activeSessionCount||0} / ${d.pendingTimerCount||0}`],["\u4E8B\u4EF6\u6865\u63A5",this._formatEventBridgeText(d.eventBridge)],["\u6700\u8FD1\u5904\u7406\u6D88\u606F\u952E",this._formatDiagnosticValue(d.lastHandledMessageKey,"\u672A\u8BB0\u5F55")],["Active phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(d.phaseCounts?.activeSessions),"\u65E0")],["History phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(d.phaseCounts?.recentSessionHistory),"\u65E0")]]:[],re=p?this._buildVerdictHintsHtml(u?.verdictHints||d?.verdictHints||{}):"",oe=p?this._buildTimelineSection("\u6700\u8FD1\u81EA\u52A8\u89E6\u53D1\u65F6\u95F4\u7EBF",(u?.recentEventTimeline||[]).slice(-6)):"";return`
        <details class="yyt-tool-debug-panel">
          <summary class="yyt-tool-debug-summary">\u6700\u8FD1\u89E6\u53D1\u8BCA\u65AD</summary>
          <div class="yyt-tool-debug-content">
            ${h.map(([ye,le])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${ye}</span>
                <span class="yyt-tool-runtime-value">${le}</span>
              </div>
            `).join("")}
            ${P.map(([ye,le])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${ye}</span>
                <span class="yyt-tool-runtime-value">${le}</span>
              </div>
            `).join("")}
            <div class="yyt-tool-debug-actions">
              <button class="yyt-btn yyt-btn-secondary yyt-btn-small" id="${g}-tool-copy-auto-trigger-diagnostics">
                <i class="fa-solid fa-copy"></i> \u590D\u5236\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD JSON
              </button>
            </div>
            ${re}
            ${_}
            ${v}
            ${oe}
          </div>
        </details>
      `},_getApiPresets(){try{return Vt()||[]}catch{return[]}},_getBypassPresets(){try{return Or()||[]}catch{return[]}},_getFormData(a){let l=ie(this.toolId),c=a.find(`#${g}-tool-output-mode`).val()||"follow_ai",u=a.find(`#${g}-tool-bypass-enabled`).is(":checked"),d=c==="post_response_api",p=(a.find(`#${g}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(m=>m.trim()).filter(Boolean);return{enabled:l?.enabled!==!1,promptTemplate:a.find(`#${g}-tool-prompt-template`).val()||"",apiPreset:a.find(`#${g}-tool-api-preset`).val()||"",extractTags:p,trigger:{event:"GENERATION_ENDED",enabled:d},output:{mode:c,apiPreset:a.find(`#${g}-tool-api-preset`).val()||"",overwrite:!0,enabled:d},bypass:{enabled:u,presetId:u&&a.find(`#${g}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(a.find(`#${g}-tool-max-messages`).val(),10)||5),selectors:p}}},_showExtractionPreview(a,l){if(!Y())return;let u=`${g}-${o}`,d=Array.isArray(l.messageEntries)?l.messageEntries:[],p=d.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${d.map(m=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${m.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${S(m.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${S(m.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${S(m.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";a.append(Jn({id:u,title:i,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${S((l.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${l.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${S(l.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${S(l.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${S(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${p}
        `})),Xn(a,u,{onSave:m=>m()}),a.find(`#${u}-save`).text("\u5173\u95ED"),a.find(`#${u}-cancel`).remove()},bindEvents(a){let l=Y();!l||!J(a)||(a.find(`#${g}-tool-output-mode`).on("change",()=>{let u=(a.find(`#${g}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";a.find(".yyt-tool-mode-hint").text(u)}),a.find(`#${g}-tool-bypass-enabled`).on("change",c=>{let u=l(c.currentTarget).is(":checked");a.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!u)}),a.find(`#${g}-tool-save, #${g}-tool-save-top`).on("click",()=>{this._saveConfig(a,{silent:!1})}),a.find(`#${g}-tool-reset-template`).on("click",()=>{let c=ln(this.toolId);c?.promptTemplate&&(a.find(`#${g}-tool-prompt-template`).val(c.promptTemplate),b("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),a.find(`#${g}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let u=await to(this.toolId);!u?.success&&u?.error&&qe("warning",u.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(u){b("error",u?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(a)}}),a.find(`#${g}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let u=await so(this.toolId);if(!u?.success){b("error",u?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(a,u)}catch(u){b("error",u?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),a.find(`#${g}-tool-copy-auto-trigger-diagnostics`).on("click",()=>{this._copyAutoTriggerDiagnostics()}))},_saveConfig(a,l={}){let c=this._getFormData(a),{silent:u=!1}=l,d=tt(this.toolId,c);return d?u||b("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):b("error","\u4FDD\u5B58\u5931\u8D25"),d},destroy(a){!Y()||!J(a)||a.find("*").off()},getStyles(){return Hi},renderTo(a){a.html(this.render({})),this.bindEvents(a,{})}}}var Hi,od,Ps=F(()=>{Je();ss();Ys();Es();ro();Hi=`
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
`;od=wt});var Ke,oo=F(()=>{Ps();Ke=wt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Ye,io=F(()=>{Ps();Ye=wt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var We,ao=F(()=>{Ps();We=wt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var Ht,lo=F(()=>{Ee();Es();Je();Ht={id:"bypassPanel",render(t){let e=z.getPresetList(),s=z.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let s=yt&&yt[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${S(t.name)}</span>
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
      `;let e=z.getDefaultPresetId()===t.id,s=yt&&yt[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${S(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${S(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${S(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=Y();!s||!J(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(s.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let n=e(s.currentTarget).data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=z.deletePreset(n);r.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),b("success","\u9884\u8BBE\u5DF2\u5220\u9664")):b("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let n=e(s.currentTarget).closest(".yyt-bypass-message"),r=n.data("messageId");n.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await dt(n),o=z.importPresets(r);b(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(r){b("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=z.exportPresets();ct(s,`bypass_presets_${Date.now()}.json`),b("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){b("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let n=z.getPreset(s);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(n)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,n=z.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,s),b("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):b("error",n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),n=s.data("presetId");if(!n)return;let r=s.find(".yyt-bypass-name-input").val().trim(),o=s.find("#yyt-bypass-description").val().trim();if(!r){b("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let i=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);i.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=z.updatePreset(n,{name:r,description:o,messages:i});a.success?(b("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):b("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=z.deletePreset(n);r.success?(this.renderTo(t),b("success","\u9884\u8BBE\u5DF2\u5220\u9664")):b("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let r=`bypass_${Date.now()}`,o=z.duplicatePreset(n,r);o.success?(this.renderTo(t),this._selectPreset(t,e,r),b("success","\u9884\u8BBE\u5DF2\u590D\u5236")):b("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");n&&(z.setDefaultPresetId(n),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),b("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(n))},_refreshPresetList(t,e){let s=z.getPresetList(),n=z.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(r=>this._renderPresetItem(r,r.id===n)).join(""))},destroy(t){!Y()||!J(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Wi={};ue(Wi,{SettingsPanel:()=>ft,THEME_CONFIGS:()=>co,applyTheme:()=>Yi,applyUiPreferences:()=>uo,default:()=>ad});function Ds(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function Ki(t=Ds()){return t?.documentElement||document.documentElement}function Yi(t,e=Ds()){let s=Ki(e),n={...id,...co[t]||co["dark-blue"]};Object.entries(n).forEach(([r,o])=>{s.style.setProperty(r,o)}),s.setAttribute("data-yyt-theme",t)}function uo(t={},e=Ds()){let s=Ki(e),{theme:n="dark-blue",compactMode:r=!1,animationEnabled:o=!0}=t||{};Yi(n,e),s.classList.toggle("yyt-compact-mode",!!r),s.classList.toggle("yyt-no-animation",!o)}var id,co,ft,ad,Un=F(()=>{Ee();ws();Je();id={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},co={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};ft={id:"settingsPanel",render(t){let e=Pe.getSettings(),s=e.listener?.listenGenerationEnded!==!1,n=e.debug?.enableDebugLog===!0;return`
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
    `},bindEvents(t,e){let s=Y();!s||!J(t)||(t.find(".yyt-settings-tab").on("click",n=>{let r=s(n.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(n.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${r}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Pe.resetSettings(),uo(_s.ui,Ds()),this.renderTo(t),b("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300,useGenerationAfterCommandsFallback:t.find("#yyt-setting-useGenerationAfterCommandsFallback").is(":checked"),useMessageReceivedFallback:t.find("#yyt-setting-useMessageReceivedFallback").is(":checked"),messageSessionWindowMs:parseInt(t.find("#yyt-setting-messageSessionWindowMs").val())||1800,historyRetentionLimit:parseInt(t.find("#yyt-setting-historyRetentionLimit").val())||10},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Pe.saveSettings(s),uo(s.ui,Ds()),b("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!Y()||!J(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},ad=ft});var ea={};ue(ea,{ApiPresetPanel:()=>Be,BypassPanel:()=>Ht,RegexExtractPanel:()=>ze,SCRIPT_ID:()=>g,SettingsPanel:()=>ft,StatusBlockPanel:()=>Ye,SummaryToolPanel:()=>Ke,ToolManagePanel:()=>je,UIManager:()=>ys,YouyouReviewPanel:()=>We,bindDialogEvents:()=>Xn,createDialogHtml:()=>Jn,default:()=>ld,downloadJson:()=>ct,escapeHtml:()=>S,fillFormWithConfig:()=>Rt,getAllStyles:()=>Zi,getFormApiConfig:()=>bt,getJQuery:()=>Y,initUI:()=>$s,isContainerValid:()=>J,readFileContent:()=>dt,registerComponents:()=>ds,renderApiPanel:()=>Bn,renderBypassPanel:()=>Xi,renderRegexPanel:()=>zn,renderSettingsPanel:()=>Qi,renderStatusBlockPanel:()=>qi,renderSummaryToolPanel:()=>Vi,renderToolPanel:()=>jn,renderYouyouReviewPanel:()=>Ji,resetJQueryCache:()=>Ca,showToast:()=>b,showTopNotice:()=>qe,uiManager:()=>ae});function ds(){ae.register(Be.id,Be),ae.register(ze.id,ze),ae.register(je.id,je),ae.register(Ke.id,Ke),ae.register(Ye.id,Ye),ae.register(We.id,We),ae.register(Ht.id,Ht),ae.register(ft.id,ft),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function $s(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...n}=t;ae.init(n),ds(),e&&ae.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function At(t,e,s={}){ae.render(t,e,s)}function Bn(t){At(Be.id,t)}function zn(t){At(ze.id,t)}function jn(t){At(je.id,t)}function Vi(t){At(Ke.id,t)}function qi(t){At(Ye.id,t)}function Ji(t){At(We.id,t)}function Xi(t){At(Ht.id,t)}function Qi(t){At(ft.id,t)}function Zi(){return ae.getAllStyles()}var ld,po=F(()=>{Qn();pr();xr();Dr();oo();io();ao();lo();Un();Je();Qn();pr();xr();Dr();oo();io();ao();lo();Un();ld={uiManager:ae,ApiPresetPanel:Be,RegexExtractPanel:ze,ToolManagePanel:je,SummaryToolPanel:Ke,StatusBlockPanel:Ye,YouyouReviewPanel:We,BypassPanel:Ht,SettingsPanel:ft,registerComponents:ds,initUI:$s,renderApiPanel:Bn,renderRegexPanel:zn,renderToolPanel:jn,renderSummaryToolPanel:Vi,renderStatusBlockPanel:qi,renderYouyouReviewPanel:Ji,renderBypassPanel:Xi,renderSettingsPanel:Qi,getAllStyles:Zi}});var ca={};ue(ca,{ApiPresetPanel:()=>Be,RegexExtractPanel:()=>ze,SCRIPT_ID:()=>g,StatusBlockPanel:()=>Ye,SummaryToolPanel:()=>Ke,ToolManagePanel:()=>je,YouyouReviewPanel:()=>We,default:()=>cd,escapeHtml:()=>S,fillFormWithConfig:()=>Rt,getCurrentTab:()=>aa,getFormApiConfig:()=>bt,getJQuery:()=>Y,getRegexStyles:()=>oa,getStyles:()=>ra,getToolStyles:()=>ia,initUI:()=>$s,isContainerValid:()=>J,registerComponents:()=>ds,render:()=>ta,renderRegex:()=>sa,renderTool:()=>na,setCurrentTab:()=>la,showToast:()=>b,uiManager:()=>ae});function yo(t,e){let s=Y();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function ta(t){if(Os=yo(t,Os),!Os||!Os.length){console.error("[YouYouToolkit] Container not found or invalid");return}Bn(Os)}function sa(t){if(Ns=yo(t,Ns),!Ns||!Ns.length){console.error("[YouYouToolkit] Regex container not found");return}zn(Ns)}function na(t){if(Gs=yo(t,Gs),!Gs||!Gs.length){console.error("[YouYouToolkit] Tool container not found");return}jn(Gs)}function ra(){return Be.getStyles()}function oa(){return ze.getStyles()}function ia(){return[je.getStyles(),Ke.getStyles(),Ye.getStyles(),We.getStyles()].join(`
`)}function aa(){return ae.getCurrentTab()}function la(t){ae.switchTab(t)}var Os,Ns,Gs,cd,da=F(()=>{po();Os=null,Ns=null,Gs=null;cd={render:ta,renderRegex:sa,renderTool:na,getStyles:ra,getRegexStyles:oa,getToolStyles:ia,getCurrentTab:aa,setCurrentTab:la,uiManager:ae,ApiPresetPanel:Be,RegexExtractPanel:ze,ToolManagePanel:je,SummaryToolPanel:Ke,StatusBlockPanel:Ye,YouyouReviewPanel:We,registerComponents:ds,initUI:$s,SCRIPT_ID:g,escapeHtml:S,showToast:b,getJQuery:Y,isContainerValid:J,getFormApiConfig:bt,fillFormWithConfig:Rt}});var ua={};ue(ua,{DEFAULT_PROMPT_SEGMENTS:()=>Hn,PromptEditor:()=>Fn,default:()=>hd,getPromptEditorStyles:()=>yd,messagesToSegments:()=>md,segmentsToMessages:()=>fd,validatePromptSegments:()=>gd});function yd(){return`
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
  `}function gd(t){let e=[];return Array.isArray(t)?(t.forEach((s,n)=>{s.id||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${n+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function fd(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function md(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Hn]}var dd,ud,pd,Hn,Fn,hd,pa=F(()=>{dd="youyou_toolkit_prompt_editor",ud={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},pd={system:"fa-server",ai:"fa-robot",user:"fa-user"},Hn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Fn=class{constructor(e={}){this.containerId=e.containerId||dd,this.segments=e.segments||[...Hn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Hn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=ud[e.type]||e.type,n=pd[e.type]||"fa-file",r=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,i=r?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",a=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${r?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${i?`border-left: 3px solid ${i};`:""}">
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:n})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:n})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,n=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=s),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(r=>r.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let n=this.segments.find(r=>r.id===e);n&&(Object.assign(n,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let n=s.target.files[0];if(!n)return;let r=new FileReader;r.onload=o=>{try{let i=JSON.parse(o.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},r.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),n=new Blob([s],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};hd=Fn});var go={};ue(go,{WindowManager:()=>Kn,closeWindow:()=>Sd,createWindow:()=>vd,windowManager:()=>De});function xd(){if(De.stylesInjected)return;De.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=bd+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function vd(t){let{id:e,title:s="\u7A97\u53E3",content:n="",width:r=900,height:o=700,modal:i=!1,resizable:a=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:u=!0,onClose:d,onReady:p}=t;xd();let m=window.jQuery||window.parent?.jQuery;if(!m)return console.error("[WindowManager] jQuery not available"),null;if(De.isOpen(e))return De.bringToFront(e),De.getWindow(e);let h=window.innerWidth||1200,_=window.innerHeight||800,v=h<=1100,P=null,re=!1;u&&(P=De.getState(e),P&&!v&&(re=!0));let oe,ye;re&&P.width&&P.height?(oe=Math.max(400,Math.min(P.width,h-40)),ye=Math.max(300,Math.min(P.height,_-40))):(oe=Math.max(400,Math.min(r,h-40)),ye=Math.max(300,Math.min(o,_-40)));let le=Math.max(20,Math.min((h-oe)/2,h-oe-20)),$e=Math.max(20,Math.min((_-ye)/2,_-ye-20)),M=l&&!v,D=`
    <div class="yyt-window" id="${e}" style="left:${le}px; top:${$e}px; width:${oe}px; height:${ye}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Td(s)}</span>
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
  `,B=null;i&&(B=m(`<div class="yyt-window-overlay" data-for="${e}"></div>`),m(document.body).append(B));let G=m(D);m(document.body).append(G),De.register(e,G),G.on("mousedown",()=>De.bringToFront(e));let V=!1,me={left:le,top:$e,width:oe,height:ye},he=()=>{me={left:parseInt(G.css("left")),top:parseInt(G.css("top")),width:G.width(),height:G.height()},G.addClass("maximized"),G.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),V=!0},be=()=>{G.removeClass("maximized"),G.css({left:me.left+"px",top:me.top+"px",width:me.width+"px",height:me.height+"px"}),G.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),V=!1};G.find(".yyt-window-btn.maximize").on("click",()=>{V?be():he()}),(v&&l||re&&P.isMaximized&&l||c&&l)&&he(),G.find(".yyt-window-btn.close").on("click",()=>{if(u&&l){let ce={width:V?me.width:G.width(),height:V?me.height:G.height(),isMaximized:V};De.saveState(e,ce)}d&&d(),B&&B.remove(),G.remove(),De.unregister(e),m(document).off(".yytWindowDrag"+e),m(document).off(".yytWindowResize"+e)}),B&&B.on("click",ce=>{ce.target,B[0]});let Oe=!1,Le,ot,Ne,it;if(G.find(".yyt-window-header").on("mousedown",ce=>{m(ce.target).closest(".yyt-window-controls").length||V||(Oe=!0,Le=ce.clientX,ot=ce.clientY,Ne=parseInt(G.css("left")),it=parseInt(G.css("top")),m(document.body).css("user-select","none"))}),m(document).on("mousemove.yytWindowDrag"+e,ce=>{if(!Oe)return;let de=ce.clientX-Le,at=ce.clientY-ot;G.css({left:Math.max(0,Ne+de)+"px",top:Math.max(0,it+at)+"px"})}),m(document).on("mouseup.yytWindowDrag"+e,()=>{Oe&&(Oe=!1,m(document.body).css("user-select",""))}),a){let ce=!1,de="",at,Kt,Ve,y,f,A;G.find(".yyt-window-resize-handle").on("mousedown",function(w){V||(ce=!0,de="",m(this).hasClass("se")?de="se":m(this).hasClass("e")?de="e":m(this).hasClass("s")?de="s":m(this).hasClass("w")?de="w":m(this).hasClass("n")?de="n":m(this).hasClass("nw")?de="nw":m(this).hasClass("ne")?de="ne":m(this).hasClass("sw")&&(de="sw"),at=w.clientX,Kt=w.clientY,Ve=G.width(),y=G.height(),f=parseInt(G.css("left")),A=parseInt(G.css("top")),m(document.body).css("user-select","none"),w.stopPropagation())}),m(document).on("mousemove.yytWindowResize"+e,w=>{if(!ce)return;let O=w.clientX-at,j=w.clientY-Kt,ee=400,U=300,K=Ve,ge=y,xe=f,Ae=A;if(de.includes("e")&&(K=Math.max(ee,Ve+O)),de.includes("s")&&(ge=Math.max(U,y+j)),de.includes("w")){let Ie=Ve-O;Ie>=ee&&(K=Ie,xe=f+O)}if(de.includes("n")){let Ie=y-j;Ie>=U&&(ge=Ie,Ae=A+j)}G.css({width:K+"px",height:ge+"px",left:xe+"px",top:Ae+"px"})}),m(document).on("mouseup.yytWindowResize"+e,()=>{ce&&(ce=!1,m(document.body).css("user-select",""))})}return G.on("remove",()=>{m(document).off(".yytWindowDrag"+e),m(document).off(".yytWindowResize"+e)}),p&&setTimeout(()=>p(G),50),G}function Sd(t){let e=De.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),De.unregister(t)}}function Td(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var bd,ya,Kn,De,fo=F(()=>{Ue();bd="youyou_toolkit_window_manager",ya="window_states",Kn=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let n=this.loadStates();n[e]={...s,updatedAt:Date.now()},us.set(ya,n)}loadStates(){return us.get(ya)||{}}getState(e){return this.loadStates()[e]||null}},De=new Kn});function ga(t,e={}){let{constants:s,topLevelWindow:n,modules:r}=t,{SCRIPT_ID:o,SCRIPT_VERSION:i,MENU_ITEM_ID:a,MENU_CONTAINER_ID:l}=s,c=null,u=!1,d=new Map,p={storageModule:()=>Promise.resolve().then(()=>(Vn(),Wn)),uiComponentsModule:()=>Promise.resolve().then(()=>(da(),ca)),promptEditorModule:()=>Promise.resolve().then(()=>(pa(),ua)),toolExecutorModule:()=>Promise.resolve().then(()=>(Tn(),Sn)),windowManagerModule:()=>Promise.resolve().then(()=>(fo(),go))};function m(...M){console.log(`[${o}]`,...M)}function h(...M){console.error(`[${o}]`,...M)}async function _(M){return!M||!p[M]?null:r[M]?r[M]:(d.has(M)||d.set(M,(async()=>{try{let D=await p[M]();return r[M]=D,D}catch(D){throw d.delete(M),D}})()),d.get(M))}async function v(){return c||(c=(async()=>{try{return r.storageModule=await Promise.resolve().then(()=>(Vn(),Wn)),r.apiConnectionModule=await Promise.resolve().then(()=>(Bs(),Ao)),r.presetManagerModule=await Promise.resolve().then(()=>(Ys(),Co)),r.uiModule=await Promise.resolve().then(()=>(po(),ea)),r.regexExtractorModule=await Promise.resolve().then(()=>(nn(),jo)),r.toolManagerModule=await Promise.resolve().then(()=>(an(),Ho)),r.toolExecutorModule=await Promise.resolve().then(()=>(Tn(),Sn)),r.toolTriggerModule=await Promise.resolve().then(()=>(ro(),ji)),r.windowManagerModule=await Promise.resolve().then(()=>(fo(),go)),r.toolRegistryModule=await Promise.resolve().then(()=>(ss(),ii)),r.settingsServiceModule=await Promise.resolve().then(()=>(ws(),li)),r.bypassManagerModule=await Promise.resolve().then(()=>(Es(),ai)),r.variableResolverModule=await Promise.resolve().then(()=>(Lr(),pi)),r.contextInjectorModule=await Promise.resolve().then(()=>(Gr(),di)),r.toolPromptServiceModule=await Promise.resolve().then(()=>(Ur(),gi)),r.toolOutputServiceModule=await Promise.resolve().then(()=>(Br(),fi)),r.toolOutputServiceModule?.toolOutputService&&r.apiConnectionModule&&r.toolOutputServiceModule.toolOutputService.setApiConnection(r.apiConnectionModule),!0}catch(M){return c=null,console.warn(`[${o}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,M),!1}})(),c)}function P(){return`
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
    `}async function re(){let M=`${o}-styles`,D=n.document||document;if(D.getElementById(M))return;let B="",G=[];try{G.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{G.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}G.push("./styles/main.css");for(let me of[...new Set(G.filter(Boolean))])try{let he=await fetch(me);if(he.ok){B=await he.text();break}}catch{}B||(m("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),B=P());let V=D.createElement("style");V.id=M,V.textContent=B,(D.head||D.documentElement).appendChild(V),m("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function oe(){let M=n.document||document;if(r.uiModule?.getAllStyles){let D=`${o}-ui-styles`;if(!M.getElementById(D)){let B=M.createElement("style");B.id=D,B.textContent=r.uiModule.getAllStyles(),(M.head||M.documentElement).appendChild(B)}}if(r.promptEditorModule&&r.promptEditorModule.getPromptEditorStyles){let D=`${o}-prompt-styles`;if(!M.getElementById(D)){let B=M.createElement("style");B.id=D,B.textContent=r.promptEditorModule.getPromptEditorStyles(),(M.head||M.documentElement).appendChild(B)}}}async function ye(){try{let{applyUiPreferences:M}=await Promise.resolve().then(()=>(Un(),Wi));if(r.settingsServiceModule?.settingsService){let D=r.settingsServiceModule.settingsService.getUiSettings();if(D&&D.theme){let B=n.document||document;M(D,B),m(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${D.theme}`)}}}catch(M){m("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",M)}}function le(){let M=n.jQuery||window.jQuery;if(!M){h("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(le,1e3);return}let D=n.document||document,B=M("#extensionsMenu",D);if(!B.length){m("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(le,2e3);return}if(M(`#${l}`,B).length>0){m("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let V=M(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),me=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${a}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,he=M(me);he.on("click",function(Oe){Oe.stopPropagation(),m("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Le=M("#extensionsMenuButton",D);Le.length&&B.is(":visible")&&Le.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),V.append(he),B.append(V),m("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function $e(){if(m(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${i}`),await re(),await v()){if(m("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!u&&r.uiModule?.initUI)try{r.uiModule.initUI({services:r,autoInjectStyles:!1,targetDocument:n.document||document}),u=!0,m("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(B){console.error(`[${o}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,B)}if(r.toolTriggerModule?.initTriggerModule)try{r.toolTriggerModule.initTriggerModule(),m("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(B){console.error(`[${o}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,B)}oe(),await ye()}else m("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let D=n.document||document;D.readyState==="loading"?D.addEventListener("DOMContentLoaded",()=>{setTimeout(le,1e3)}):setTimeout(le,1e3),m("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:v,injectStyles:re,addMenuItem:le,loadLegacyModule:_,init:$e,log:m,logError:h}}function fa(t){let{constants:e,topLevelWindow:s,modules:n,caches:r,uiState:o}=t,{SCRIPT_ID:i,SCRIPT_VERSION:a,POPUP_ID:l}=e,c={cleanup:null},u={cleanups:[]};function d(...y){console.log(`[${i}]`,...y)}function p(...y){console.error(`[${i}]`,...y)}async function m(y){if(n[y])return n[y];let f=t?.services?.loadLegacyModule;if(typeof f!="function")return null;try{return await f(y)}catch(A){return p(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${y}`,A),null}}function h(y){return typeof y!="string"?"":y.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function _(){return s.jQuery||window.jQuery}function v(){return s.document||document}function P(y){if(!y)return"\u672A\u9009\u62E9\u9875\u9762";let f=n.toolRegistryModule?.getToolConfig(y);if(!f)return y;if(!f.hasSubTabs)return f.name||y;let A=o.currentSubTab[y]||f.subTabs?.[0]?.id||"",w=f.subTabs?.find(O=>O.id===A);return w?.name?`${f.name} / ${w.name}`:f.name||y}function re(y){if(!y)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let f=n.toolRegistryModule?.getToolConfig(y);if(!f)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!f.hasSubTabs)return f.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let A=o.currentSubTab[y]||f.subTabs?.[0]?.id||"";return f.subTabs?.find(O=>O.id===A)?.description||f.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function oe(){let y=o.currentPopup;if(!y)return;let f=P(o.currentMainTab),A=re(o.currentMainTab),w=y.querySelector(".yyt-popup-active-label");w&&(w.textContent=`\u5F53\u524D\uFF1A${f}`);let O=y.querySelector(".yyt-shell-breadcrumb");O&&(O.textContent=f);let j=y.querySelector(".yyt-shell-main-title");j&&(j.textContent=f);let ee=y.querySelector(".yyt-shell-main-description");ee&&(ee.textContent=A);let U=y.querySelector(".yyt-shell-current-page");U&&(U.textContent=f);let K=y.querySelector(".yyt-shell-current-desc");K&&(K.textContent=A)}function ye(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function le(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(y=>{typeof y=="function"&&y()}),u.cleanups=[])}function $e(y){return!!y?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function M(y){let f=y?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body"].join(","));return f?f.scrollHeight>f.clientHeight+2||f.scrollWidth>f.clientWidth+2:!1}function D(y,f){return f?.closest?.(".yyt-scrollable-surface")===y}function B(y,f){return!y||!f?null:[f.closest?.(".yyt-tool-list"),f.closest?.(".yyt-settings-content"),f.closest?.(".yyt-sub-content"),f.closest?.(".yyt-tab-content.active"),y].filter(Boolean).find(w=>w!==y&&!y.contains(w)?!1:w.scrollHeight>w.clientHeight+2||w.scrollWidth>w.clientWidth+2)||y}function G(y){let f=v();if(!y||!f)return;y.classList.add("yyt-scrollable-surface");let A=!1,w=!1,O=0,j=0,ee=0,U=0,K=!1,ge=!1,xe=()=>{A=!1,w=!1,y.classList.remove("yyt-scroll-dragging")},Ae=H=>{H.button===0&&($e(H.target)||D(y,H.target)&&(K=y.scrollWidth>y.clientWidth+2,ge=y.scrollHeight>y.clientHeight+2,!(!K&&!ge)&&(H.stopPropagation(),A=!0,w=!1,O=H.clientX,j=H.clientY,ee=y.scrollLeft,U=y.scrollTop)))},Ie=H=>{if(!A)return;let lt=H.clientX-O,Ce=H.clientY-j;!(Math.abs(lt)>4||Math.abs(Ce)>4)&&!w||(w=!0,y.classList.add("yyt-scroll-dragging"),K&&(y.scrollLeft=ee-lt),ge&&(y.scrollTop=U-Ce),H.preventDefault())},mt=()=>{xe()},Q=H=>{if(H.ctrlKey||M(H.target))return;let lt=y.classList.contains("yyt-content");if(!lt&&!D(y,H.target))return;let Ce=B(y,H.target);!Ce||!(Ce.scrollHeight>Ce.clientHeight+2||Ce.scrollWidth>Ce.clientWidth+2)||(Math.abs(H.deltaY)>0&&(Ce.scrollTop+=H.deltaY),Math.abs(H.deltaX)>0&&(Ce.scrollLeft+=H.deltaX),H.preventDefault(),(!lt||Ce!==y)&&H.stopPropagation())},Te=H=>{w&&H.preventDefault()};y.addEventListener("mousedown",Ae),y.addEventListener("wheel",Q,{passive:!1}),y.addEventListener("dragstart",Te),f.addEventListener("mousemove",Ie),f.addEventListener("mouseup",mt),u.cleanups.push(()=>{xe(),y.classList.remove("yyt-scrollable-surface"),y.removeEventListener("mousedown",Ae),y.removeEventListener("wheel",Q),y.removeEventListener("dragstart",Te),f.removeEventListener("mousemove",Ie),f.removeEventListener("mouseup",mt)})}function V(){let y=o.currentPopup;if(!y)return;le();let f=[...y.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...y.querySelectorAll(".yyt-sub-nav"),...y.querySelectorAll(".yyt-content"),...y.querySelectorAll(".yyt-tab-content.active"),...y.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...y.querySelectorAll(".yyt-settings-content"),...y.querySelectorAll(".yyt-tool-list")];[...new Set(f)].forEach(G)}function me(){let y=v(),f=o.currentPopup,A=f?.querySelector(".yyt-popup-header");if(!f||!A||!y)return;let w=!1,O=0,j=0,ee=0,U=0,K="",ge=()=>({width:s.innerWidth||y.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||y.documentElement?.clientHeight||window.innerHeight||0}),xe=(Te,H,lt)=>Math.min(Math.max(Te,H),lt),Ae=()=>{w&&(w=!1,f.classList.remove("yyt-popup-dragging"),y.body.style.userSelect=K)},Ie=Te=>{if(!w||!o.currentPopup)return;let H=Te.clientX-O,lt=Te.clientY-j,{width:Ce,height:Yn}=ge(),ba=f.offsetWidth||0,xa=f.offsetHeight||0,va=Math.max(0,Ce-ba),Sa=Math.max(0,Yn-xa);f.style.left=`${xe(ee+H,0,va)}px`,f.style.top=`${xe(U+lt,0,Sa)}px`,f.style.transform="none",f.style.right="auto",f.style.bottom="auto"},mt=()=>{Ae()},Q=Te=>{if(Te.button!==0||Te.target?.closest(".yyt-popup-close"))return;w=!0,O=Te.clientX,j=Te.clientY;let H=f.getBoundingClientRect();ee=H.left,U=H.top,f.style.left=`${H.left}px`,f.style.top=`${H.top}px`,f.style.transform="none",f.style.right="auto",f.style.bottom="auto",f.classList.add("yyt-popup-dragging"),K=y.body.style.userSelect||"",y.body.style.userSelect="none",Te.preventDefault()};A.addEventListener("mousedown",Q),y.addEventListener("mousemove",Ie),y.addEventListener("mouseup",mt),c.cleanup=()=>{Ae(),A.removeEventListener("mousedown",Q),y.removeEventListener("mousemove",Ie),y.removeEventListener("mouseup",mt)}}function he(){ye(),le(),o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),d("\u5F39\u7A97\u5DF2\u5173\u95ED")}function be(y){o.currentMainTab=y;let f=_();if(!f||!o.currentPopup)return;f(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),f(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${y}"]`).addClass("active");let A=n.toolRegistryModule?.getToolConfig(y);A?.hasSubTabs?(f(o.currentPopup).find(".yyt-sub-nav").show(),Le(y,A.subTabs)):f(o.currentPopup).find(".yyt-sub-nav").hide(),f(o.currentPopup).find(".yyt-tab-content").removeClass("active"),f(o.currentPopup).find(`.yyt-tab-content[data-tab="${y}"]`).addClass("active"),ot(y),oe(),V()}function Oe(y,f){o.currentSubTab[y]=f;let A=_();!A||!o.currentPopup||(A(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),A(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${f}"]`).addClass("active"),Ne(y,f),oe(),V())}function Le(y,f){let A=_();if(!A||!o.currentPopup||!f)return;let w=o.currentSubTab[y]||f[0]?.id,O=f.map(j=>`
      <div class="yyt-sub-nav-item ${j.id===w?"active":""}" data-subtab="${j.id}">
        <i class="fa-solid ${j.icon||"fa-file"}"></i>
        <span>${j.name}</span>
      </div>
    `).join("");A(o.currentPopup).find(".yyt-sub-nav").html(O),A(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let ee=A(this).data("subtab");Oe(y,ee)}),V()}async function ot(y){let f=_();if(!f||!o.currentPopup)return;let A=f(o.currentPopup).find(`.yyt-tab-content[data-tab="${y}"]`);if(!A.length)return;let w=n.toolRegistryModule?.getToolConfig(y);switch(y){case"apiPresets":if(n.uiModule?.renderApiPanel)n.uiModule.renderApiPanel(A);else{let O=await m("uiComponentsModule");O?.render&&O.render(A)}break;case"toolManage":if(n.uiModule?.renderToolPanel)n.uiModule.renderToolPanel(A);else{let O=await m("uiComponentsModule");O?.renderTool&&O.renderTool(A)}break;case"regexExtract":if(n.uiModule?.renderRegexPanel)n.uiModule.renderRegexPanel(A);else{let O=await m("uiComponentsModule");O?.renderRegex&&O.renderRegex(A)}break;case"tools":if(w?.hasSubTabs&&w.subTabs?.length>0){let O=o.currentSubTab[y]||w.subTabs[0].id;await Ne(y,O)}else A.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":n.uiModule?.renderBypassPanel?n.uiModule.renderBypassPanel(A):A.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":n.uiModule?.renderSettingsPanel?n.uiModule.renderSettingsPanel(A):A.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:ce(y,A);break}V()}async function Ne(y,f){let A=_();if(!A||!o.currentPopup)return;let w=A(o.currentPopup).find(`.yyt-tab-content[data-tab="${y}"]`);if(!w.length)return;let O=n.toolRegistryModule?.getToolConfig(y);if(O?.hasSubTabs){let ee=O.subTabs?.find(U=>U.id===f);if(ee){let U=w.find(".yyt-sub-content");switch(U.length||(w.html('<div class="yyt-sub-content"></div>'),U=w.find(".yyt-sub-content")),ee.component){case"SummaryToolPanel":if(n.uiModule?.renderSummaryToolPanel)n.uiModule.renderSummaryToolPanel(U);else{let K=await m("uiComponentsModule");K?.SummaryToolPanel?K.SummaryToolPanel.renderTo(U):U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(n.uiModule?.renderStatusBlockPanel)n.uiModule.renderStatusBlockPanel(U);else{let K=await m("uiComponentsModule");K?.StatusBlockPanel?K.StatusBlockPanel.renderTo(U):U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(n.uiModule?.renderYouyouReviewPanel)n.uiModule.renderYouyouReviewPanel(U);else{let K=await m("uiComponentsModule");K?.YouyouReviewPanel?K.YouyouReviewPanel.renderTo(U):U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await it(ee,U);break;default:U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let j=w.find(".yyt-sub-content");if(j.length){switch(f){case"config":de(y,j);break;case"prompts":await at(y,j);break;case"presets":Kt(y,j);break;default:j.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}V()}}async function it(y,f){if(!(!_()||!f?.length||!y?.id))try{let w=r.dynamicToolPanelCache.get(y.id);if(!w){let j=(await Promise.resolve().then(()=>(Ps(),Fi)))?.createToolConfigPanel;if(typeof j!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");w=j({id:`${y.id}Panel`,toolId:y.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${y.name||y.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${y.id}-extraction-preview`,previewTitle:`${y.name||y.id} \u63D0\u53D6\u9884\u89C8`}),r.dynamicToolPanelCache.set(y.id,w)}w.renderTo(f),V()}catch(w){console.error(`[${i}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,w),f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function ce(y,f){if(!_())return;let w=n.toolRegistryModule?.getToolConfig(y);if(!w){f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let O=o.currentSubTab[y]||w.subTabs?.[0]?.id||"config";f.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${O}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Ne(y,O)}function de(y,f){if(!_())return;let w=n.toolManagerModule?.getTool(y),O=n.presetManagerModule?.getAllPresets()||[],j=n.toolRegistryModule?.getToolApiPreset(y)||"",ee=O.map(U=>`<option value="${h(U.name)}" ${U.name===j?"selected":""}>${h(U.name)}</option>`).join("");f.html(`
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
              ${ee}
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
    `),f.find("#yyt-save-tool-preset").on("click",function(){let K=f.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(y,K);let ge=s.toastr;ge&&ge.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function at(y,f){let A=_(),w=n.promptEditorModule||await m("promptEditorModule");if(!A||!w){f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let j=n.toolManagerModule?.getTool(y)?.config?.messages||[],ee=w.messagesToSegments?w.messagesToSegments(j):w.DEFAULT_PROMPT_SEGMENTS,U=new w.PromptEditor({containerId:`yyt-prompt-editor-${y}`,segments:ee,onChange:ge=>{let xe=w.segmentsToMessages?w.segmentsToMessages(ge):[];d("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",xe.length,"\u6761\u6D88\u606F")}});f.html(`<div id="yyt-prompt-editor-${y}" class="yyt-prompt-editor-container"></div>`),U.init(f.find(`#yyt-prompt-editor-${y}`));let K=w.getPromptEditorStyles?w.getPromptEditorStyles():"";if(K){let ge="yyt-prompt-editor-styles",xe=s.document||document;if(!xe.getElementById(ge)){let Ae=xe.createElement("style");Ae.id=ge,Ae.textContent=K,(xe.head||xe.documentElement).appendChild(Ae)}}}function Kt(y,f){_()&&f.html(`
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
    `)}function Ve(){if(o.currentPopup){d("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let y=_(),f=v();if(!y){p("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let A=n.toolRegistryModule?.getToolList()||[];if(!A.length){p("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}A.some(Q=>Q.id===o.currentMainTab)||(o.currentMainTab=A[0].id);let w=n.toolRegistryModule?.getToolConfig("tools"),O=Array.isArray(w?.subTabs)?w.subTabs:[],j=O.filter(Q=>Q?.isCustom).length,ee=O.filter(Q=>!Q?.isCustom).length,U=P(o.currentMainTab),K=re(o.currentMainTab);o.currentOverlay=f.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",Q=>{Q.target===o.currentOverlay&&he()}),f.body.appendChild(o.currentOverlay);let ge=A.map(Q=>`
      <div class="yyt-main-nav-item ${Q.id===o.currentMainTab?"active":""}" data-tab="${Q.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${h(Q.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${h(Q.name||Q.id)}</span>
          <span class="yyt-main-nav-desc">${h(Q.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),xe=A.map(Q=>`
      <div class="yyt-tab-content ${Q.id===o.currentMainTab?"active":""}" data-tab="${Q.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),Ae=`
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
                  <strong class="yyt-shell-current-page">${h(U)}</strong>
                  <span class="yyt-shell-current-desc">${h(K)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${A.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${ee}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${j}</strong>
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
                    ${ge}
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
                    <div class="yyt-shell-main-title">${h(U)}</div>
                    <div class="yyt-shell-main-description">${h(K)}</div>
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
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${h(U)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${i}-close-btn">\u5173\u95ED</button>
          </div>
        </div>
      </div>
    `,Ie=f.createElement("div");Ie.innerHTML=Ae,o.currentPopup=Ie.firstElementChild,f.body.appendChild(o.currentPopup),y(o.currentPopup).find(".yyt-popup-close").on("click",he),y(o.currentPopup).find(`#${i}-close-btn`).on("click",he),y(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let Te=y(this).data("tab");Te&&be(Te)}),me(),ot(o.currentMainTab);let mt=n.toolRegistryModule?.getToolConfig(o.currentMainTab);mt?.hasSubTabs&&(y(o.currentPopup).find(".yyt-sub-nav").show(),Le(o.currentMainTab,mt.subTabs)),oe(),V(),d("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Ve,closePopup:he,switchMainTab:be,switchSubTab:Oe,renderTabContent:ot,renderSubTabContent:Ne}}function ma(t,e={}){let{constants:s,modules:n}=t,{SCRIPT_ID:r,SCRIPT_VERSION:o}=s,{init:i,loadModules:a,loadLegacyModule:l,addMenuItem:c,popupShell:u}=e;return{version:o,id:r,init:i,openPopup:u?.openPopup,closePopup:u?.closePopup,switchMainTab:u?.switchMainTab,switchSubTab:u?.switchSubTab,addMenuItem:c,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getUiComponents:()=>n.uiComponentsModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getToolTrigger:()=>n.toolTriggerModule,getAutoTriggerDiagnostics:d=>n.toolTriggerModule?.getAutoTriggerDiagnostics?.(d)||null,exportAutoTriggerDiagnostics:d=>n.toolTriggerModule?.exportAutoTriggerDiagnostics?.(d)||null,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getPromptEditor:()=>n.promptEditorModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,async loadLegacyModule(d){return typeof l!="function"?null:l(d)},async getApiConfig(){return await a(),n.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await a(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await a(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,p){if(await a(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(d,p);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await a(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,p){return n.toolRegistryModule?.registerTool(d,p)||!1},unregisterTool(d){return n.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(d){return n.windowManagerModule?.createWindow(d)||null},closeWindow(d){n.windowManagerModule?.closeWindow(d)}}}var Ls="youyou_toolkit",Ed="0.6.2",_d=`${Ls}-menu-item`,wd=`${Ls}-menu-container`,Ad=`${Ls}-popup`,Id=typeof window.parent<"u"?window.parent:window,Us={constants:{SCRIPT_ID:Ls,SCRIPT_VERSION:Ed,MENU_ITEM_ID:_d,MENU_CONTAINER_ID:wd,POPUP_ID:Ad},topLevelWindow:Id,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},ha=fa(Us),Ft=ga(Us,{openPopup:ha.openPopup});Us.services.loadModules=Ft.loadModules;Us.services.loadLegacyModule=Ft.loadLegacyModule;var mo=ma(Us,{init:Ft.init,loadModules:Ft.loadModules,loadLegacyModule:Ft.loadLegacyModule,addMenuItem:Ft.addMenuItem,popupShell:ha});if(typeof window<"u"&&(window.YouYouToolkit=mo,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=mo}catch{}var Ip=mo;Ft.init();console.log(`[${Ls}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{Ip as default};
