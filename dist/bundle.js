var Ca=Object.defineProperty;var F=(t,e)=>()=>(t&&(e=t(t=0)),e);var ye=(t,e)=>{for(var s in e)Ca(t,s,{get:e[s],enumerable:!0})};function So(){let t=A;return t._getStorage(),t._storage}function To(){return A.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Eo(t){A.set("settings",t)}var vt,A,Q,vo,ys,Ke=F(()=>{vt=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:n=>{let r=s.extensionSettings[this.namespace][n];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(n,r)=>{s.extensionSettings[this.namespace][n]=r,this._saveSettings(s)},removeItem:n=>{delete s.extensionSettings[this.namespace][n],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(n){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let n=`${this.namespace}:${e}`;if(this._cache.has(n))return this._cache.get(n);let r=this._getStorage(),o=this._getFullKey(e),i=r.getItem(o);if(i===null)return s;try{let a=JSON.parse(i);return this._cache.set(n,a),a}catch{return i}}set(e,s){let n=this._getStorage(),r=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.set(o,s);try{n.setItem(r,JSON.stringify(s))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(e){let s=this._getStorage(),n=this._getFullKey(e),r=`${this.namespace}:${e}`;this._cache.delete(r),s.removeItem(n)}has(e){let s=this._getStorage(),n=this._getFullKey(e);return s.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext();n?.extensionSettings?.[this.namespace]&&(n.extensionSettings[this.namespace]={},this._saveSettings(n))}}else{let s=`${this.namespace}_`,n=[];for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);o&&o.startsWith(s)&&n.push(o)}n.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(n=>{s[n]=this.get(n)}),s}setMultiple(e){Object.entries(e).forEach(([s,n])=>{this.set(s,n)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([i,a])=>{s[i]=typeof a=="string"?JSON.parse(a):a})}}else{let n=`${this.namespace}_`;for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);if(o&&o.startsWith(n)){let i=o.slice(n.length);try{s[i]=JSON.parse(localStorage.getItem(o))}catch{s[i]=localStorage.getItem(o)}}}}return s}},A=new vt("youyou_toolkit"),Q=new vt("youyou_toolkit:tools"),vo=new vt("youyou_toolkit:presets"),ys=new vt("youyou_toolkit:windows")});var qn={};ye(qn,{DEFAULT_API_PRESETS:()=>Da,DEFAULT_SETTINGS:()=>ka,STORAGE_KEYS:()=>gs,StorageService:()=>vt,deepMerge:()=>_o,getCurrentPresetName:()=>Ga,getStorage:()=>So,loadApiPresets:()=>Pa,loadSettings:()=>To,presetStorage:()=>vo,saveApiPresets:()=>$a,saveSettings:()=>Eo,setCurrentPresetName:()=>Oa,storage:()=>A,toolStorage:()=>Q,windowStorage:()=>ys});function Pa(){return A.get(gs.API_PRESETS)||[]}function $a(t){A.set(gs.API_PRESETS,t)}function Ga(){return A.get(gs.CURRENT_PRESET)||""}function Oa(t){A.set(gs.CURRENT_PRESET,t||"")}function _o(t,e){let s=r=>r&&typeof r=="object"&&!Array.isArray(r),n={...t};return s(t)&&s(e)&&Object.keys(e).forEach(r=>{s(e[r])?r in t?n[r]=_o(t[r],e[r]):Object.assign(n,{[r]:e[r]}):Object.assign(n,{[r]:e[r]})}),n}var gs,ka,Da,Jn=F(()=>{Ke();Ke();gs={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},ka={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Da=[]});var D,Xn,P,Ae=F(()=>{D={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Xn=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,n={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:s,priority:r};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let n=this.listeners.get(e);if(n){for(let r of n)if(r.callback===s){n.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let n=this.listeners.get(e);if(!n||n.size===0)return;let r=Array.from(n).sort((o,i)=>i.priority-o.priority);for(let{callback:o}of r)try{o(s)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,i)}}once(e,s){let n=r=>{this.off(e,n),s(r)};return this.on(e,n)}wait(e,s=0){return new Promise((n,r)=>{let o=null,i=this.once(e,a=>{o&&clearTimeout(o),n(a)});s>0&&(o=setTimeout(()=>{i(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},P=new Xn});function E(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function b(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Na(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function Ze(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:r=!1,noticeId:o=""}=s,i=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!i?.body){b(t,e,n);return}let a="yyt-top-notice-container",c="yyt-top-notice-styles",l=i.getElementById(a);if(l||(l=i.createElement("div"),l.id=a,l.style.cssText=`
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
    `,i.body.appendChild(l)),!i.getElementById(c)){let _=i.createElement("style");_.id=c,_.textContent=`
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
    `,i.head.appendChild(_)}if(o){let _=l.querySelector(`[data-notice-id="${o}"]`);_&&_.remove()}let u={success:"\u2713",error:"!",warning:"\u2022",info:"i"},d=i.createElement("div");d.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(d.dataset.noticeId=o);let p=i.createElement("span");p.className="yyt-top-notice__icon",p.textContent=u[t]||u.info;let y=i.createElement("div");y.className="yyt-top-notice__content",y.textContent=e;let v=i.createElement("button");v.className="yyt-top-notice__close",v.type="button",v.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),v.textContent="\xD7";let x=()=>{d.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>d.remove(),180)};v.addEventListener("click",x),d.appendChild(p),d.appendChild(y),d.appendChild(v),l.appendChild(d),r||setTimeout(x,n)}function Na(t,e,s){let n=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!n)return;let r=n.getElementById("yyt-fallback-toast");r&&r.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=o[t]||o.info,a=n.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
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
  `,a.textContent=e,!n.getElementById("yyt-toast-styles")){let c=n.createElement("style");c.id="yyt-toast-styles",c.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,n.head.appendChild(c)}n.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},s)}function V(){if(kt)return kt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return kt=window.parent.jQuery,kt}catch{}return window.jQuery&&(kt=window.jQuery),kt}function La(){kt=null}function Z(t){return t&&t.length>0}function St(t,e=f){if(!V()||!Z(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",r=t.find(`#${e}-model-select`);return r.is(":visible")&&(n=r.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Dt(t,e,s=f){if(!V()||!Z(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",r);let i=t.find(`#${s}-custom-api-fields`);r?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Qn(t){let{id:e,title:s,body:n,width:r="380px",wide:o=!1}=t;return`
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
  `}function Zn(t,e,s={}){if(!V())return()=>{};let r=t.find(`#${e}-overlay`),o=()=>{r.remove(),s.onClose&&s.onClose()};return r.find(`#${e}-close, #${e}-cancel`).on("click",o),r.on("click",function(i){i.target===this&&o()}),r.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(o)}),o}function ut(t,e){let s=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(s),r=document.createElement("a");r.href=n,r.download=e,r.click(),URL.revokeObjectURL(n)}function pt(t){return new Promise((e,s)=>{let n=new FileReader;n.onload=r=>e(r.target.result),n.onerror=r=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var f,kt,et=F(()=>{f="youyou_toolkit";kt=null});var fs,de,er=F(()=>{Ae();et();fs=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,P.emit(D.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,n={}){let r=V();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let i;if(typeof s=="string"?i=r(s):s&&s.jquery?i=s:s&&(i=r(s)),!Z(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let a=o.render({...n,dependencies:this.dependencies});i.html(a),o.bindEvents(i,this.dependencies),this.activeInstances.set(e,{container:i,component:o,props:n}),P.emit(D.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,P.emit(D.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,P.emit(D.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,n)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let n=e.createElement("style");n.id=s,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){P.on(D.PRESET_UPDATED,()=>{}),P.on(D.TOOL_UPDATED,()=>{})}},de=new fs});var Mo={};ye(Mo,{API_STATUS:()=>ja,fetchAvailableModels:()=>ir,getApiConfig:()=>Tt,getEffectiveApiConfig:()=>ms,hasEffectiveApiPreset:()=>nr,sendApiRequest:()=>or,sendWithPreset:()=>Ya,testApiConnection:()=>Qa,updateApiConfig:()=>Vt,validateApiConfig:()=>qt});function za(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function sr(){return A.get(Ao,za())}function Ka(t){A.set(Ao,t)}function wo(){return A.get(Ua,[])}function Ha(){return A.get(Ba,"")}function tr(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function Io(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let n=null;try{n=new URL(s)}catch{return s}let r=n.pathname.replace(/\/+$/,""),o=r;return e==="chat_completions"?!/\/chat\/completions$/i.test(r)&&!/\/completions$/i.test(r)&&(o=`${r||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(r)?o=r.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(r)?o=r.replace(/\/completions$/i,"/models"):/\/models$/i.test(r)||(o=`${r||""}/models`)),n.pathname=o.replace(/\/+/g,"/"),n.toString()}function Fa(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Tt(){return sr().apiConfig||{}}function Vt(t){let e=sr();e.apiConfig={...e.apiConfig,...t},Ka(e)}function qt(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function ms(t=""){let e=sr(),s=t||Ha()||"";if(s){let r=wo().find(o=>o.name===s);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return e.apiConfig||{}}function nr(t=""){return t?wo().some(s=>s?.name===t):!1}async function Ya(t,e,s={},n=null){let r=ms(t);return await or(e,{...s,apiConfig:r},n)}function Ro(t,e={}){let s=e.apiConfig||Tt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function rr(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function or(t,e={},s=null){let n=e.apiConfig||Tt(),r=n.useMainApi,o=qt(n);if(!o.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return r?await Wa(t,e,s):await Va(t,n,e,s)}async function Wa(t,e,s){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function Va(t,e,s,n){let r=typeof window.parent<"u"?window.parent:window;if(r.TavernHelper?.generateRaw)try{return await qa(t,e,s,n,r)}catch(o){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(r.SillyTavern?.getRequestHeaders)try{return await Ja(t,e,s,n,r)}catch(o){if(!o?.allowDirectFallback)throw o}return await Xa(t,e,s,n)}async function qa(t,e,s,n,r){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:Fa(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof o=="string"?o.trim():rr(o)}async function Ja(t,e,s,n,r){let o=String(e.url||"").trim(),i={...Ro(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},a={...typeof r.SillyTavern?.getRequestHeaders=="function"?r.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},c=null;try{c=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:a,body:JSON.stringify(i),signal:n})}catch(d){throw d?.name==="AbortError"?d:tr(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${d.message}`,{allowDirectFallback:!0})}let l=await c.text().catch(()=>"");if(!c.ok){let d=[404,405,501,502].includes(c.status);throw tr(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${c.status}): ${l||"Unknown error"}`,{allowDirectFallback:d})}let u=null;try{u=l?JSON.parse(l):{}}catch{let p=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw tr(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return rr(u)}async function Xa(t,e,s,n){let r=Ro(t,{apiConfig:e,...s}),o=Io(e.url,"chat_completions"),i={"Content-Type":"application/json"};e.apiKey&&(i.Authorization=`Bearer ${e.apiKey}`);let a=await fetch(o,{method:"POST",headers:i,body:JSON.stringify(r),signal:n}),c=await a.text().catch(()=>"");if(!a.ok){let u=c||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${a.status}): ${u}`)}let l=null;try{l=c?JSON.parse(c):{}}catch{let d=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${d||"(\u7A7A\u54CD\u5E94)"}`)}return rr(l)}async function Qa(t=null){let e=t||Tt(),s=Date.now();try{await or([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let r=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-s}}}async function ir(t=null){let e=t||Tt();return e.useMainApi?await Za():await el(e)}async function Za(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function el(t){if(!t.url||!t.apiKey)return[];try{let e=Io(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let n=await s.json();return n.data&&Array.isArray(n.data)?n.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var Ao,Ua,Ba,ja,js=F(()=>{Ke();Ao="settings",Ua="api_presets",Ba="current_preset";ja={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Po={};ye(Po,{createPreset:()=>Ws,createPresetFromCurrentConfig:()=>il,deletePreset:()=>Vs,duplicatePreset:()=>ol,exportPresets:()=>ur,generateUniquePresetName:()=>yr,getActiveConfig:()=>dr,getActivePresetName:()=>qs,getAllPresets:()=>Jt,getPreset:()=>$t,getPresetNames:()=>nl,getStarredPresets:()=>cr,importPresets:()=>pr,presetExists:()=>hs,renamePreset:()=>rl,switchToPreset:()=>Gt,togglePresetStar:()=>lr,updatePreset:()=>ar,validatePreset:()=>al});function sl(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Do(){return A.get(tl,sl())}function ke(){return A.get(Co,[])}function Pt(t){A.set(Co,t)}function Ys(){return A.get(ko,"")}function Fs(t){A.set(ko,t||"")}function Jt(){return ke()}function nl(){return ke().map(e=>e.name)}function $t(t){return!t||typeof t!="string"?null:ke().find(s=>s.name===t)||null}function hs(t){return!t||typeof t!="string"?!1:ke().some(s=>s.name===t)}function Ws(t){let{name:e,description:s,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(hs(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={name:r,description:s||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=ke();return i.push(o),Pt(i),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:o}}function ar(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ke(),n=s.findIndex(i=>i.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=s[n],o={...r,...e,name:r.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...r.apiConfig,...e.apiConfig}),s[n]=o,Pt(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function Vs(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ke(),s=e.findIndex(n=>n.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Pt(e),Ys()===t&&Fs(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function rl(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!hs(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(hs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n=ke(),r=n.find(o=>o.name===t);return r&&(r.name=s,r.updatedAt=Date.now(),Pt(n),Ys()===t&&Fs(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function ol(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),n=$t(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(hs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(n)),name:s,createdAt:Date.now(),updatedAt:Date.now()},o=ke();return o.push(r),Pt(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:r}}function lr(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ke(),s=e.find(n=>n.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Pt(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function cr(){return ke().filter(e=>e.starred===!0)}function Gt(t){if(!t)return Fs(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=$t(t);return e?(Fs(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function qs(){return Ys()}function dr(){let t=Ys();if(t){let s=$t(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:Do().apiConfig||{}}}function ur(t=null){if(t){let s=$t(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=ke();return JSON.stringify(e,null,2)}function pr(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(s)?s:[s];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=ke(),o=0;for(let i of n){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=r.findIndex(c=>c.name===i.name);a>=0?e.overwrite&&(i.updatedAt=Date.now(),r[a]=i,o++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),r.push(i),o++)}return o>0&&Pt(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function il(t,e=""){let s=Do();return Ws({name:t,description:e,apiConfig:s.apiConfig})}function al(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function yr(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=ke(),s=new Set(e.map(r=>r.name));if(!s.has(t))return t;let n=1;for(;s.has(`${t} (${n})`);)n++;return`${t} (${n})`}var tl,Co,ko,Js=F(()=>{Ke();tl="settings",Co="api_presets",ko="current_preset"});function Xs(t){return String(t||"").trim()}var tt,He,gr=F(()=>{Ae();et();js();Js();tt=null;He={id:"apiPresetPanel",render(t){let e=dr(),s=e?.apiConfig||Tt(),n=Xs(e?.presetName||qs()),r=Jt(),a=cr().slice(0,8),c=a.length>0?a.map(d=>this._renderPresetItem(d)).join(""):"",l=tt===null?n||"":Xs(tt),u=l||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
                  <span class="yyt-select-value" data-value="${E(l)}">${E(u)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${l?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${r.length>0?r.map(d=>this._renderSelectOption(d,l)).join(""):""}
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
      <div class="yyt-preset-item" data-preset-name="${E(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${E(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${E(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${E(t.name)}">
        <button class="${n}" data-preset="${E(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${r}</button>
        <span class="yyt-option-text">${E(t.name)}</span>
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
                   value="${E(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${f}-api-key" 
                     value="${E(t.apiKey||"")}" 
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
                     value="${E(t.model||"")}" 
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
    `},bindEvents(t,e){let s=V();!s||!Z(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${f}-preset-dropdown`),n=s.find(".yyt-select-trigger"),r=s.find(".yyt-select-value"),o=()=>{let i=String(r.data("value")||"").trim();if(!i){tt="",Gt(""),Dt(t,Tt(),f),t.find(".yyt-preset-item").removeClass("yyt-loaded"),b("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let a=$t(i);if(!a){b("error",`\u9884\u8BBE "${i}" \u4E0D\u5B58\u5728`);return}tt=i,Gt(i),Dt(t,a.apiConfig,f),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${i.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),b("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${i}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};n.on("click",function(i){i.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",i=>{if(e(i.target).hasClass("yyt-option-star"))return;let a=e(i.currentTarget),c=a.data("value"),l=a.find(".yyt-option-text").text();tt=String(c||"").trim(),r.text(l).data("value",c),s.find(".yyt-select-option").removeClass("yyt-selected"),a.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${f}-load-preset`).on("click",()=>{o()}),s.find(".yyt-option-star").on("click",i=>{i.preventDefault(),i.stopPropagation();let a=e(i.currentTarget).data("preset");if(!a)return;let c=lr(a);if(c.success){b("success",c.message);let l=t.closest(".yyt-api-manager").parent();l.length&&this.renderTo(l)}else b("error",c.message)}),e(document).on("click.yyt-dropdown",i=>{e(i.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let r=e(s.currentTarget).data("preset-name"),o=e(s.target).closest("[data-action]").data("action");if(o)switch(s.stopPropagation(),o){case"load":t.find(".yyt-select-value").text(r).data("value",r),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${r.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${f}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let i=Vs(r);if(b(i.success?"info":"error",i.message),i.success){Xs(tt)===r&&(tt=null);let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${f}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),n=t.find(`#${f}-custom-api-fields`);s?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${f}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${f}-api-key`),n=s.attr("type");s.attr("type",n==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${f}-load-models`).on("click",async()=>{let s=t.find(`#${f}-load-models`),n=t.find(`#${f}-model`),r=t.find(`#${f}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=St(t,f),i=await ir(o);if(i.length>0){r.empty(),i.forEach(c=>{r.append(`<option value="${E(c)}">${E(c)}</option>`)}),n.hide(),r.show();let a=n.val();a&&i.includes(a)&&r.val(a),r.off("change").on("change",function(){n.val(e(this).val())}),b("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else b("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){b("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${f}-model`).on("focus",function(){let s=t.find(`#${f}-model-select`);e(this).show(),s.hide()}),t.find(`#${f}-save-api-config`).on("click",()=>{let s=St(t,f),n=Xs(qs()),r=qt(s);if(!r.valid&&!s.useMainApi){b("error",r.errors.join(", "));return}if(n){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${n}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){Vt(s),Gt(""),tt="",b("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i);return}Vt(s);let o=ar(n,{apiConfig:s});if(o.success){tt=n,b("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${n}"`),Gt(n),P.emit(D.PRESET_UPDATED,{name:n});let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else b("error",o.message);return}Vt(s),b("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${f}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Gt(""),tt="",Vt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),b("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${f}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${f}-export-presets`).on("click",()=>{try{let s=ur();ut(s,`youyou_toolkit_presets_${Date.now()}.json`),b("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){b("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${f}-import-presets`).on("click",()=>{t.find(`#${f}-import-file`).click()}),t.find(`#${f}-import-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await pt(n),o=pr(r,{overwrite:!0});if(b(o.success?"success":"error",o.message),o.imported>0){let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(r){b("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let n=Jt().map(u=>u.name),r=yr("\u65B0\u9884\u8BBE"),o=`
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
                     value="${E(r)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
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
    `;e(`#${f}-dialog-overlay`).remove(),t.append(o);let i=e(`#${f}-dialog-overlay`),a=e(`#${f}-dialog-preset-name`),c=e(`#${f}-dialog-preset-desc`);a.focus().select();let l=()=>i.remove();i.find(`#${f}-dialog-close, #${f}-dialog-cancel`).on("click",l),i.on("click",function(u){u.target===this&&l()}),i.find(`#${f}-dialog-save`).on("click",()=>{let u=a.val().trim(),d=c.val().trim();if(!u){b("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(n.includes(u)){if(!confirm(`\u9884\u8BBE "${u}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Vs(u)}let p=St(t,f),y=Ws({name:u,description:d,apiConfig:p});if(y.success){b("success",y.message),l(),P.emit(D.PRESET_CREATED,{preset:y.preset});let v=t.closest(".yyt-api-manager").parent();v.length&&this.renderTo(v)}else b("error",y.message)}),a.on("keypress",function(u){u.which===13&&i.find(`#${f}-dialog-save`).click()})},destroy(t){let e=V();!e||!Z(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Fo={};ye(Fo,{MESSAGE_MACROS:()=>jo,addTagRule:()=>Xt,createRuleTemplate:()=>Uo,default:()=>dl,deleteRulePreset:()=>Ko,deleteRuleTemplate:()=>zo,deleteTagRule:()=>bs,escapeRegex:()=>Ot,exportRulesConfig:()=>on,extractComplexTag:()=>Go,extractCurlyBraceTag:()=>xr,extractHtmlFormatTag:()=>Oo,extractSimpleTag:()=>br,extractTagContent:()=>Nt,generateTagSuggestions:()=>en,getAllRulePresets:()=>nn,getAllRuleTemplates:()=>No,getContentBlacklist:()=>Lt,getRuleTemplate:()=>Lo,getTagRules:()=>yt,importRulesConfig:()=>an,isValidTagName:()=>hr,loadRulePreset:()=>rn,saveRulesAsPreset:()=>sn,scanTextForTags:()=>Zs,setContentBlacklist:()=>xs,setTagRules:()=>tn,shouldSkipContent:()=>mr,testRegex:()=>Ho,updateRuleTemplate:()=>Bo,updateTagRule:()=>Qt});function ll(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...fr],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Ge(){return A.get($o,ll())}function st(t){A.set($o,t)}function Qs(){let t=Ge();return we=t.ruleTemplates||[...fr],oe=t.tagRules||[],De=t.contentBlacklist||[],{ruleTemplates:we,tagRules:oe,contentBlacklist:De}}function Ot(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function mr(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(n=>{let r=n.trim().toLowerCase();return r&&s.includes(r)})}function hr(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!cl.includes(t.toLowerCase())}function br(t,e){if(!t||!e)return[];let s=[],n=Ot(e),r=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(r)].forEach(c=>{c[1]&&s.push(c[1].trim())});let i=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,a=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return i>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function xr(t,e){if(!t||!e)return[];let s=[],n=Ot(e),r=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=r.exec(t))!==null;){let i=o.index,a=i+o[0].length,c=1,l=a;for(;l<t.length&&c>0;)t[l]==="{"?c++:t[l]==="}"&&c--,l++;if(c===0){let u=t.substring(a,l-1);u.trim()&&s.push(u.trim())}r.lastIndex=i+1}return s}function Go(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=s[0].trim(),r=s[1].trim(),o=r.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let i=o[1],a=new RegExp(`${Ot(n)}([\\s\\S]*?)<\\/${i}>`,"gi"),c=[];return[...t.matchAll(a)].forEach(u=>{u[1]&&c.push(u[1].trim())}),c}function Oo(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=s[1],r=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,c=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>c&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-c} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),r}function Nt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(u=>u.type==="exclude"&&u.enabled),r=e.filter(u=>(u.type==="include"||u.type==="regex_include")&&u.enabled),o=e.filter(u=>u.type==="regex_exclude"&&u.enabled),i=t;for(let u of n)try{let d=new RegExp(`<${Ot(u.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ot(u.value)}>`,"gi");i=i.replace(d,"")}catch(d){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:u,error:d})}let a=[];if(r.length>0)for(let u of r){let d=[];try{if(u.type==="include")d.push(...br(i,u.value)),d.push(...xr(i,u.value));else if(u.type==="regex_include"){let p=new RegExp(u.value,"gi");[...i.matchAll(p)].forEach(v=>{v[1]&&d.push(v[1])})}}catch(p){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:u,error:p})}d.forEach(p=>a.push(p.trim()))}else a.push(i);let c=[];for(let u of a){for(let d of o)try{let p=new RegExp(d.value,"gi");u=u.replace(p,"")}catch(p){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:d,error:p})}mr(u,s)||c.push(u)}return c.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Zs(t,e={}){let s=performance.now(),{chunkSize:n=5e4,maxTags:r=100,timeoutMs:o=5e3}=e,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,c=0,l=0;for(let d=0;d<t.length;d+=n){let p=t.slice(d,Math.min(d+n,t.length));if(l++,c+=p.length,performance.now()-s>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let y;for(;(y=a.exec(p))!==null&&i.size<r;){let v=(y[1]||y[2]).toLowerCase();hr(v)&&i.add(v)}if(i.size>=r)break;l%5===0&&await new Promise(v=>setTimeout(v,0))}let u=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(u-s),processedChars:c,totalChars:t.length,chunkCount:l,tagsFound:i.size}}}function en(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function No(){return we.length===0&&Qs(),we}function Lo(t){return we.find(e=>e.id===t)}function Uo(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return we.push(e),vr(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Bo(t,e){let s=we.findIndex(n=>n.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(we[s]={...we[s],...e,updatedAt:new Date().toISOString()},vr(),{success:!0,template:we[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function zo(t){let e=we.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(we.splice(e,1),vr(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function vr(){let t=Ge();t.ruleTemplates=we,st(t)}function yt(){return oe||Qs(),oe}function tn(t){oe=t||[];let e=Ge();e.tagRules=oe,st(e)}function Xt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};oe.push(e);let s=Ge();return s.tagRules=oe,st(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Qt(t,e){if(t<0||t>=oe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};oe[t]={...oe[t],...e};let s=Ge();return s.tagRules=oe,st(s),{success:!0,rule:oe[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function bs(t){if(t<0||t>=oe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};oe.splice(t,1);let e=Ge();return e.tagRules=oe,st(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Lt(){return De||Qs(),De}function xs(t){De=t||[];let e=Ge();e.contentBlacklist=De,st(e)}function sn(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Ge();s.tagRulePresets||(s.tagRulePresets={});let n=`preset-${Date.now()}`;return s.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(oe)),blacklist:JSON.parse(JSON.stringify(De)),createdAt:new Date().toISOString()},st(s),{success:!0,preset:s.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function nn(){let e=Ge().tagRulePresets||{};return Object.values(e)}function rn(t){let e=Ge(),n=(e.tagRulePresets||{})[t];return n?(oe=JSON.parse(JSON.stringify(n.rules||[])),De=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=oe,e.contentBlacklist=De,st(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ko(t){let e=Ge(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,st(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function on(){return JSON.stringify({tagRules:oe,contentBlacklist:De,ruleTemplates:we,tagRulePresets:Ge().tagRulePresets||{}},null,2)}function an(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)oe=s.tagRules||[],De=s.contentBlacklist||[],we=s.ruleTemplates||fr;else if(s.tagRules&&oe.push(...s.tagRules),s.contentBlacklist){let r=new Set(De.map(o=>o.toLowerCase()));s.contentBlacklist.forEach(o=>{r.has(o.toLowerCase())||De.push(o)})}let n=Ge();return n.tagRules=oe,n.contentBlacklist=De,n.ruleTemplates=we,s.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...s.tagRulePresets}),st(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Ho(t,e,s="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(t,s),o=[];if(s.includes("g")){let i;for(;(i=r.exec(e))!==null;)i.length>1?o.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[n]||i[1]||i[0]}):o.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=r.exec(e);i&&o.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[n]||i[1]:i[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(i=>i.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var $o,cl,fr,we,oe,De,jo,dl,ln=F(()=>{Ke();$o="settings";cl=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],fr=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],we=[],oe=[],De=[];jo={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Qs();dl={extractTagContent:Nt,extractSimpleTag:br,extractCurlyBraceTag:xr,extractComplexTag:Go,extractHtmlFormatTag:Oo,escapeRegex:Ot,shouldSkipContent:mr,isValidTagName:hr,scanTextForTags:Zs,generateTagSuggestions:en,getAllRuleTemplates:No,getRuleTemplate:Lo,createRuleTemplate:Uo,updateRuleTemplate:Bo,deleteRuleTemplate:zo,getTagRules:yt,setTagRules:tn,addTagRule:Xt,updateTagRule:Qt,deleteTagRule:bs,getContentBlacklist:Lt,setContentBlacklist:xs,saveRulesAsPreset:sn,getAllRulePresets:nn,loadRulePreset:rn,deleteRulePreset:Ko,exportRulesConfig:on,importRulesConfig:an,testRegex:Ho,MESSAGE_MACROS:jo}});var je,Sr=F(()=>{Ae();et();ln();je={id:"regexExtractPanel",render(t){let e=yt(),s=Lt(),n=nn();return`
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
    `},_renderRulesEditor(t,e,s){let n=t.length>0?t.map((o,i)=>this._renderRuleItem(o,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=s.length>0?s.map(o=>`<option value="${o.id}">${E(o.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${r?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${f}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${r}
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
                 value="${E(e.join(", "))}" 
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
               value="${E(t.value||"")}">
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
    `},bindEvents(t,e){let s=V();!s||!Z(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val();Qt(n,{type:r}),b("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val().trim();Qt(n,{value:r})}),t.find(".yyt-rule-enabled").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).is(":checked");Qt(n,{enabled:r}),b("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let n=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(bs(n),this.renderTo(t),b("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let r=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(bs(r),this.renderTo(t),b("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${f}-add-rule`).on("click",()=>{Xt({type:"include",value:"",enabled:!0}),this.renderTo(t),b("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${f}-scan-tags`).on("click",async()=>{let s=t.find(`#${f}-scan-tags`),n=t.find(`#${f}-test-input`).val();if(!n||!n.trim()){b("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await Zs(n,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:i}=en(r,25);if(o.length===0){b("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${f}-tag-suggestions-container`).hide();return}let a=t.find(`#${f}-tag-list`);t.find(`#${f}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),a.empty(),o.forEach(l=>{let u=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${E(l)}</button>`);u.on("click",()=>{if(yt().some(y=>y.type==="include"&&y.value===l)){b("warning",`\u89C4\u5219 "\u5305\u542B: ${l}" \u5DF2\u5B58\u5728`);return}Xt({type:"include",value:l,enabled:!0}),this.renderTo(t),b("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${l}"`)}),a.append(u)}),t.find(`#${f}-tag-suggestions-container`).show(),b("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(r){b("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${f}-add-exclude-cot`).on("click",()=>{let s=yt(),n="<!--[\\s\\S]*?-->";if(s.some(o=>o.type==="regex_exclude"&&o.value===n)){b("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Xt({type:"regex_exclude",value:n,enabled:!0}),this.renderTo(t),b("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${f}-content-blacklist`).on("change",function(){let n=e(this).val().split(",").map(r=>r.trim()).filter(r=>r);xs(n),b("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${n.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${f}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.find(`#${f}-load-rule-preset`).on("click",()=>{let s=t.find(`#${f}-rule-preset-select`).val();if(!s){b("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let n=rn(s);n.success?(this.renderTo(t),b("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${n.preset.name}`),P.emit(D.REGEX_PRESET_LOADED,{preset:n.preset})):b("error",n.message)}),t.find(`#${f}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let n=sn(s.trim());n.success?(this.renderTo(t),b("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):b("error",n.message)})},_bindTestEvents(t,e){t.find(`#${f}-test-extract`).on("click",()=>{let s=t.find(`#${f}-test-input`).val();if(!s||!s.trim()){b("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let n=yt(),r=Lt(),o=Nt(s,n,r),i=t.find(`#${f}-test-result-container`),a=t.find(`#${f}-test-result`);i.show(),!o||!o.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),b("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${E(o)}</pre>`),b("success","\u63D0\u53D6\u5B8C\u6210"),P.emit(D.REGEX_EXTRACTED,{result:o}))}),t.find(`#${f}-test-clear`).on("click",()=>{t.find(`#${f}-test-input`).val(""),t.find(`#${f}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${f}-import-rules`).on("click",()=>{t.find(`#${f}-import-rules-file`).click()}),t.find(`#${f}-import-rules-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await pt(n),o=an(r,{overwrite:!0});o.success?(this.renderTo(t),b("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):b("error",o.message)}catch(r){b("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find(`#${f}-export-rules`).on("click",()=>{try{let s=on();ut(s,`youyou_toolkit_rules_${Date.now()}.json`),b("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){b("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${f}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(tn([]),xs([]),this.renderTo(t),b("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!V()||!Z(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Yo={};ye(Yo,{DEFAULT_TOOL_PRESETS:()=>nt,DEFAULT_TOOL_STRUCTURE:()=>Ie,TOOL_STORAGE_KEYS:()=>ne,cloneTool:()=>yl,createDefaultToolDefinition:()=>vs,deleteTool:()=>Er,deleteToolPreset:()=>ml,exportTools:()=>wr,getAllToolPresets:()=>Ar,getAllTools:()=>Ut,getCurrentToolPresetId:()=>hl,getTool:()=>es,getToolPreset:()=>gl,importTools:()=>Ir,normalizeToolDefinitionToRuntimeConfig:()=>cn,resetTools:()=>Rr,saveTool:()=>dn,saveToolPreset:()=>fl,setCurrentToolPreset:()=>bl,setToolEnabled:()=>_r,validateTool:()=>xl});function Zt(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Tr(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function ul(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function pl(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let n=ul(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function vs(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...Ie,...t,id:t?.id||Ie.id,icon:t?.icon||Ie.icon,order:Number.isFinite(t?.order)?t.order:Ie.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Ie.promptTemplate,extractTags:Zt(t?.extractTags),config:{...Ie.config,...s,trigger:{...Ie.config.trigger,...s.trigger||{},events:Zt(s?.trigger?.events)},execution:{...Ie.config.execution,...s.execution||{},timeout:Tr(s?.execution?.timeout,Ie.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||Ie.config.execution.retries)},api:{...Ie.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...Ie.config.context,...s.context||{},depth:Tr(s?.context?.depth,Ie.config.context.depth),includeTags:Zt(s?.context?.includeTags),excludeTags:Zt(s?.context?.excludeTags)}},enabled:t?.enabled!==!1,metadata:{...Ie.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function cn(t,e={},s={}){let n=vs({...e,id:t||e?.id||""}),r=Zt(n?.config?.trigger?.events),o=Zt(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),i=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),a=pl(t,n),c=r[0]||"GENERATION_ENDED",l=r.includes("GENERATION_ENDED"),u=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,trigger:{event:c,enabled:l},bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:u,apiPreset:i,overwrite:!0,enabled:u==="post_response_api"?l:!1},extraction:{enabled:!0,maxMessages:Tr(n?.config?.context?.depth,5),selectors:o},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:i,extractTags:o,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function Ut(){let t=Q.get(ne.TOOLS),e=t&&typeof t=="object"?{...nt,...t}:{...nt};return Object.fromEntries(Object.entries(e).map(([s,n])=>[s,vs({...n||{},id:s})]))}function es(t){return Ut()[t]||null}function dn(t,e){if(!t||!e)return!1;let s=Q.get(ne.TOOLS)||{},n=!s[t]&&!nt[t],r=vs({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=r,Q.set(ne.TOOLS,s),P.emit(n?D.TOOL_REGISTERED:D.TOOL_UPDATED,{toolId:t,tool:r}),!0}function Er(t){if(nt[t])return!1;let e=Q.get(ne.TOOLS)||{};return e[t]?(delete e[t],Q.set(ne.TOOLS,e),P.emit(D.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function _r(t,e){let s=es(t);if(!s)return!1;let n=Q.get(ne.TOOLS)||{};return n[t]||(n[t]={...s}),n[t].enabled=e,n[t].metadata={...n[t].metadata,updatedAt:new Date().toISOString()},Q.set(ne.TOOLS,n),P.emit(e?D.TOOL_ENABLED:D.TOOL_DISABLED,{toolId:t}),!0}function yl(t,e,s){let n=es(t);if(!n)return!1;let r=JSON.parse(JSON.stringify(n));return r.name=s||`${n.name} (\u526F\u672C)`,r.metadata={...r.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},dn(e,r)}function Ar(){let t=Q.get(ne.PRESETS);return t&&typeof t=="object"?{...nt,...t}:{...nt}}function gl(t){return Ar()[t]||null}function fl(t,e){if(!t||!e)return!1;let s=Q.get(ne.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},Q.set(ne.PRESETS,s),!0}function ml(t){if(nt[t])return!1;let e=Q.get(ne.PRESETS)||{};return e[t]?(delete e[t],Q.set(ne.PRESETS,e),!0):!1}function hl(){return Q.get(ne.CURRENT_PRESET)||null}function bl(t){return Ar()[t]?(Q.set(ne.CURRENT_PRESET,t),!0):!1}function wr(){let t=Q.get(ne.TOOLS)||{},e=Q.get(ne.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Ir(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=s?{}:Q.get(ne.TOOLS)||{},o=s?{}:Q.get(ne.PRESETS)||{},i=0,a=0;if(n.tools&&typeof n.tools=="object"){for(let[c,l]of Object.entries(n.tools))nt[c]&&!s||l&&typeof l=="object"&&(r[c]=vs({...l,id:c}),i++);Q.set(ne.TOOLS,r)}if(n.presets&&typeof n.presets=="object"){for(let[c,l]of Object.entries(n.presets))nt[c]&&!s||l&&typeof l=="object"&&(o[c]=l,a++);Q.set(ne.PRESETS,o)}return{success:!0,toolsImported:i,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Rr(){Q.remove(ne.TOOLS),Q.remove(ne.PRESETS),Q.remove(ne.CURRENT_PRESET)}function xl(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:n,api:r,context:o}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),n&&((typeof n.timeout!="number"||n.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof n.retries!="number"||n.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var Ie,nt,ne,un=F(()=>{Ke();Ae();Ie={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},nt={},ne={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var ci={};ye(ci,{TOOL_CATEGORIES:()=>Wo,TOOL_REGISTRY:()=>ts,appendToolRuntimeHistory:()=>_s,clearToolApiPreset:()=>si,default:()=>Il,ensureToolRuntimeConfig:()=>yn,getAllDefaultToolConfigs:()=>ii,getAllToolApiBindings:()=>ni,getAllToolFullConfigs:()=>$r,getEnabledTools:()=>ns,getToolApiPreset:()=>Dr,getToolBaseConfig:()=>pn,getToolConfig:()=>Es,getToolFullConfig:()=>ce,getToolList:()=>Qo,getToolSubTabs:()=>Zo,getToolWindowState:()=>li,hasTool:()=>kr,onPresetDeleted:()=>ri,patchToolRuntime:()=>ss,registerTool:()=>Jo,resetToolConfig:()=>oi,resetToolRegistry:()=>ei,saveToolConfig:()=>ot,saveToolWindowState:()=>ai,setToolApiPreset:()=>ti,setToolApiPresetConfig:()=>_l,setToolBypassConfig:()=>Al,setToolOutputMode:()=>El,setToolPromptTemplate:()=>wl,unregisterTool:()=>Xo,updateToolRuntime:()=>Pr});function Ss(t={}){let e=Array.isArray(t?.recentTriggerHistory)?t.recentTriggerHistory.filter(Boolean):[],s=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0,lastTriggerAt:0,lastTriggerEvent:"",lastMessageKey:"",lastExecutionKey:"",lastSkipReason:"",lastExecutionPath:"",lastWritebackStatus:"",lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0,lastTraceId:"",...t,recentTriggerHistory:e,recentWritebackHistory:s}}function vl(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Vo(){let t=Ut()||{};return Object.entries(t).filter(([e])=>!Ts[e]).map(([e,s])=>[e,s||{}])}function qo(){let t=Array.isArray(ts.tools?.subTabs)?[...ts.tools.subTabs]:[],e=Vo().map(([s,n],r)=>{let o=cn(s,n);return{id:s,name:o.name||s,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+r,isCustom:!0,description:o.description||""}});return[...t,...e].sort((s,n)=>(s.order??0)-(n.order??0))}function Sl(t,e={}){let s=cn(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:Ss(s.runtime)}}function Cr(t){let e=Ts[t];if(e)return{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:Ss(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=(Ut()||{})[t]||null;return n?Sl(t,n):Es(t)}function pn(t){let e=Cr(t);return e?{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Tl(t,e={},s=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.trigger={...t.trigger||{},...e.trigger||{}},n.output={...t.output||{},...e.output||{}},n.bypass={...t.bypass||{},...e.bypass||{}},n.runtime=Ss({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}};let r=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||s||"";return n.output={...n.output||{},apiPreset:r},n.apiPreset=r,(!Array.isArray(n.extraction.selectors)||n.extraction.selectors.length===0)&&Array.isArray(n.extractTags)&&n.extractTags.length>0&&(n.extraction.selectors=[...n.extractTags]),(!Array.isArray(n.extractTags)||n.extractTags.length===0)&&(n.extractTags=Array.isArray(n.extraction.selectors)?[...n.extraction.selectors]:[]),t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function Jo(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let n of s)if(!e[n])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return rt[t]={id:t,...e,order:e.order??Object.keys(rt).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Xo(t){return rt[t]?(delete rt[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Qo(t=!0){let e=Object.values(rt).map(s=>s.id==="tools"?{...s,subTabs:qo()}:s);return t?e.sort((s,n)=>(s.order??0)-(n.order??0)):e}function Es(t){return t==="tools"&&rt[t]?{...rt[t],subTabs:qo()}:rt[t]||null}function kr(t){return!!rt[t]}function Zo(t){let e=Es(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function ei(){rt={...ts},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function ti(t,e){if(!kr(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=A.get(Be)||{};return s[t]=e||"",A.set(Be,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Dr(t){return(A.get(Be)||{})[t]||""}function si(t){let e=A.get(Be)||{};delete e[t],A.set(Be,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function ni(){return A.get(Be)||{}}function ri(t){let e=A.get(Be)||{},s=!1;for(let n in e)e[n]===t&&(e[n]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&A.set(Be,e)}function ce(t){let e=Cr(t);if(!e)return Es(t);let n=(A.get(Bt)||{})[t]||{},r=Dr(t);return Tl({...e,id:t},n,r)}function yn(t){if(!t)return!1;let e=Cr(t);if(!e)return!1;let s=A.get(Bt)||{};if(s[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};s[t]=n,A.set(Bt,s);let r=A.get(Be)||{};return r[t]=n.output?.apiPreset||n.apiPreset||"",A.set(Be,r),P.emit(D.TOOL_UPDATED,{toolId:t,config:n}),!0}function ot(t,e,s={}){if(!t||!ce(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=s,r=A.get(Bt)||{},o=A.get(Be)||{},i=e?.output?.apiPreset??e?.apiPreset??"",a=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return r[t]={},a.forEach(c=>{if(e[c]!==void 0){if(c==="output"&&e.output){r[t][c]={...e.output,apiPreset:i};return}if(c==="apiPreset"){r[t][c]=i;return}r[t][c]=e[c]}}),r[t].apiPreset===void 0&&(r[t].apiPreset=i),!r[t].output&&e.output!==void 0&&(r[t].output={...e.output||{},apiPreset:i}),A.set(Bt,r),o[t]=i,A.set(Be,o),n&&P.emit(D.TOOL_UPDATED,{toolId:t,config:r[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function El(t,e){let s=ce(t);return s?ot(t,{...s,output:{...s.output,mode:e}}):!1}function _l(t,e){let s=ce(t);return s?ot(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function Al(t,e){let s=ce(t);return s?ot(t,{...s,bypass:{...s.bypass,...e}}):!1}function wl(t,e){let s=ce(t);return s?ot(t,{...s,promptTemplate:e}):!1}function ss(t,e,s={}){let n=ce(t);if(!n)return!1;let{touchLastRunAt:r=!1,emitEvent:o=!1}=s,i=Ss({...n.runtime||{},...e||{}});return r&&(i.lastRunAt=Date.now()),ot(t,{...n,runtime:i},{emitEvent:o})}function _s(t,e,s={},n={}){let r=ce(t);if(!r)return!1;let{limit:o=10,emitEvent:i=!1}=n,a=Ss(r.runtime||{}),c=e==="writeback"?"recentWritebackHistory":"recentTriggerHistory",l={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return a[c]=vl([...Array.isArray(a[c])?a[c]:[],l],o),l?.traceId&&(a.lastTraceId=l.traceId),ot(t,{...r,runtime:a},{emitEvent:i})}function Pr(t,e){return ss(t,e,{touchLastRunAt:!0,emitEvent:!0})}function oi(t){if(!t||!Ts[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=A.get(Bt)||{};return delete e[t],A.set(Bt,e),P.emit(D.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function ii(){return{...Ts}}function $r(){let t=new Set([...Object.keys(Ts),...Vo().map(([e])=>e)]);return Array.from(t).map(e=>ce(e)).filter(Boolean)}function ns(){return $r().filter(t=>t&&t.enabled)}function ai(t,e){let s=A.get(Mr)||{};s[t]={...e,updatedAt:Date.now()},A.set(Mr,s)}function li(t){return(A.get(Mr)||{})[t]||null}var Bt,Be,Mr,Ts,ts,Wo,rt,Il,rs=F(()=>{Ke();Ae();un();Bt="tool_configs",Be="tool_api_bindings",Mr="tool_window_states";Ts={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},ts={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},Wo={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},rt={...ts};Il={TOOL_REGISTRY:ts,TOOL_CATEGORIES:Wo,registerTool:Jo,unregisterTool:Xo,getToolList:Qo,getToolConfig:Es,hasTool:kr,getToolSubTabs:Zo,resetToolRegistry:ei,setToolApiPreset:ti,getToolApiPreset:Dr,clearToolApiPreset:si,getAllToolApiBindings:ni,onPresetDeleted:ri,saveToolWindowState:ai,getToolWindowState:li,getToolBaseConfig:pn,ensureToolRuntimeConfig:yn,getToolFullConfig:ce,patchToolRuntime:ss,appendToolRuntimeHistory:_s,saveToolConfig:ot,resetToolConfig:oi,getAllDefaultToolConfigs:ii,getAllToolFullConfigs:$r,getEnabledTools:ns}});var Fe,Gr=F(()=>{et();un();rs();Fe={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){b("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=Ut(),s=Object.entries(e),n=s.filter(([,r])=>r?.enabled!==!1).length;return`
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
            <span class="yyt-tool-name">${E(n.name)}</span>
            <span class="yyt-tool-category">${E(n.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${n.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${E(n.description)}</div>
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
      `},bindEvents(t,e){let s=V();!s||!Z(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item"),r=n.data("tool-id"),o=e(s.currentTarget).is(":checked");_r(r,o),n.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),b("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(n)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,n)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),r=es(n);if(!n||!r||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${r.name}\u201D\u5417\uFF1F`))return;if(!Er(n)){b("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),b("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await pt(n),o=Ir(r,{overwrite:!1});b(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(r){b("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=wr();ut(s,`youyou_toolkit_tools_${Date.now()}.json`),b("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){b("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Rr(),this.renderTo(t),b("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let n=s?es(s):null,r=!!n,o=`
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
                       value="${n?E(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${n?E(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(o);let i=e("#yyt-tool-dialog-overlay"),a=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),i.on("click",function(c){c.target===this&&a()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let c=e("#yyt-tool-name").val().trim(),l=e("#yyt-tool-category").val(),u=e("#yyt-tool-desc").val().trim(),d=parseInt(e("#yyt-tool-timeout").val())||6e4,p=parseInt(e("#yyt-tool-retries").val())||3;if(!c){b("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let y=s||`tool_${Date.now()}`;if(!dn(y,{name:c,category:l,description:u,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{trigger:n?.config?.trigger||{type:"manual",events:[]},execution:{timeout:d,retries:p},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]}},enabled:n?.enabled!==!1})){b("error",r?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}yn(y),a(),this.renderTo(t),b("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),r||this._openToolConfig(y)})},destroy(t){!V()||!Z(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var di={};ye(di,{BypassManager:()=>gn,DEFAULT_BYPASS_PRESETS:()=>ft,addMessage:()=>Ll,buildBypassMessages:()=>Hl,bypassManager:()=>K,createPreset:()=>kl,default:()=>jl,deleteMessage:()=>Bl,deletePreset:()=>Pl,duplicatePreset:()=>$l,exportPresets:()=>zl,getAllPresets:()=>Ml,getDefaultPresetId:()=>Gl,getEnabledMessages:()=>Nl,getPreset:()=>Cl,getPresetList:()=>Nr,importPresets:()=>Kl,setDefaultPresetId:()=>Ol,updateMessage:()=>Ul,updatePreset:()=>Dl});var gt,os,Or,ft,Rl,gn,K,Ml,Nr,Cl,kl,Dl,Pl,$l,Gl,Ol,Nl,Ll,Ul,Bl,zl,Kl,Hl,jl,As=F(()=>{Ke();Ae();gt="bypass_presets",os="default_bypass_preset",Or="current_bypass_preset",ft={},Rl=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),gn=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=A.get(gt,{});return this._cache={...ft,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,n)=>(n.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:n,description:r,messages:o}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=s.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:n.trim(),description:r||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),P.emit(D.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...n,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,r),P.emit(D.BYPASS_PRESET_UPDATED,{presetId:e,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(ft[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=A.get(gt,{});return delete n[e],A.set(gt,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),P.emit(D.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,n){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),id:s.trim(),name:n||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),o),P.emit(D.BYPASS_PRESET_CREATED,{presetId:s,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},o=[...n.messages||[],r];return this.updatePreset(e,{messages:o})}updateMessage(e,s,n){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=r.messages||[],i=o.findIndex(c=>c.id===s);if(i===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let a=[...o];return a[i]={...a[i],...n},this.updatePreset(e,{messages:a})}deleteMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=n.messages||[],o=r.find(a=>a.id===s);if(!o)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=r.filter(a=>a.id!==s);return this.updatePreset(e,{messages:i})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=A.get(os,null);return e==="undefined"||e==="null"||e===""?(A.remove(os),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(A.set(os,e),P.emit(D.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:n=!1}=s,r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(r)?r:r.presets?r.presets:[r];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=A.get(gt,{}),a=0;for(let c of o)!c.id||typeof c.id!="string"||c.name&&(ft[c.id]&&!n||!n&&i[c.id]||(i[c.id]={...c,updatedAt:Date.now()},a++));return a>0&&(A.set(gt,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let n=A.get(gt,{});n[e]=s,A.set(gt,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=A.get(gt,{}),s={},n=!1,r=Array.isArray(e)?e.map((o,i)=>[o?.id||o?.name||`legacy_${i}`,o]):Object.entries(e||{});for(let[o,i]of r){let a=this._normalizePreset(o,i,s);if(!a){n=!0;continue}s[a.id]=a,(!e?.[a.id]||e?.[a.id]?.id!==a.id)&&(n=!0)}n&&A.set(gt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,n={}){if(!s||typeof s!="object")return null;let r=typeof s.name=="string"?s.name.trim():"",o=typeof s.id=="string"?s.id.trim():"",i=typeof e=="string"?e.trim():"";if(!r&&i&&i!=="undefined"&&i!=="null"&&(r=i),this._isLegacySamplePreset(r,o)||(!o&&i&&i!=="undefined"&&i!=="null"&&(o=i),!o&&r&&r!=="undefined"&&r!=="null"&&(o=this._generatePresetId(r,n)),!r||!o||o==="undefined"||r==="undefined"))return null;let c=Array.isArray(s.messages)?s.messages.filter(l=>l&&typeof l=="object").map((l,u)=>({id:typeof l.id=="string"&&l.id.trim()?l.id.trim():`${o}_msg_${u+1}`,role:l.role||"SYSTEM",content:typeof l.content=="string"?l.content:"",enabled:l.enabled!==!1,deletable:l.deletable!==!1})):[];return{...s,id:o,name:r,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:c,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=A.get(os,null),n=A.get(Or,null),r=s??n;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!e[r]&&(r=Object.values(e).find(i=>i.name===r)?.id||null),r?A.set(os,r):A.remove(os),A.has(Or)&&A.remove(Or)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Rl.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=n,o=1;for(;s[r];)r=`${n}_${o++}`;return r}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},K=new gn,Ml=()=>K.getAllPresets(),Nr=()=>K.getPresetList(),Cl=t=>K.getPreset(t),kl=t=>K.createPreset(t),Dl=(t,e)=>K.updatePreset(t,e),Pl=t=>K.deletePreset(t),$l=(t,e,s)=>K.duplicatePreset(t,e,s),Gl=()=>K.getDefaultPresetId(),Ol=t=>K.setDefaultPresetId(t),Nl=t=>K.getEnabledMessages(t),Ll=(t,e)=>K.addMessage(t,e),Ul=(t,e,s)=>K.updateMessage(t,e,s),Bl=(t,e)=>K.deleteMessage(t,e),zl=t=>K.exportPresets(t),Kl=(t,e)=>K.importPresets(t,e),Hl=t=>K.buildBypassMessages(t),jl=K});var ui={};ye(ui,{DEFAULT_SETTINGS:()=>ws,SettingsService:()=>fn,default:()=>Fl,settingsService:()=>Oe});var ws,Lr,fn,Oe,Fl,Is=F(()=>{Ke();Ae();ws={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!1,debounceMs:300,useMessageReceivedFallback:!0,useGenerationAfterCommandsFallback:!0,messageSessionWindowMs:1800,historyRetentionLimit:10},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},Lr="settings_v2",fn=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=A.get(Lr,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),A.set(Lr,this._cache),P.emit(D.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),n=this._deepMerge(s,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(ws)),A.set(Lr,this._cache),P.emit(D.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let n=this.getSettings(),r=e.split("."),o=n;for(let i of r)if(o&&typeof o=="object"&&i in o)o=o[i];else return s;return o}set(e,s){let n=JSON.parse(JSON.stringify(this.getSettings())),r=e.split("."),o=n;for(let i=0;i<r.length-1;i++){let a=r[i];a in o||(o[a]={}),o=o[a]}o[r[r.length-1]]=s,this.saveSettings(n)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(ws)),e)}_deepMerge(e,s){let n={...e};for(let r in s)s[r]&&typeof s[r]=="object"&&!Array.isArray(s[r])?n[r]=this._deepMerge(e[r]||{},s[r]):n[r]=s[r];return n}},Oe=new fn,Fl=Oe});var yi={};ye(yi,{ContextInjector:()=>bn,DEFAULT_INJECTION_OPTIONS:()=>pi,WRITEBACK_METHODS:()=>he,WRITEBACK_RESULT_STATUS:()=>hn,contextInjector:()=>xn,default:()=>Vl});function Et(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}var Ye,mn,pi,hn,he,Yl,Wl,bn,xn,Vl,Ur=F(()=>{Ae();Ye="YouYouToolkit_toolOutputs",mn="YouYouToolkit_injectedContext",pi={overwrite:!0,enabled:!0},hn={SUCCESS:"success",FAILED:"failed"},he={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Yl=60,Wl=3;bn=class{constructor(){this.debugMode=!1}async inject(e,s,n={}){return(await this.injectDetailed(e,s,n)).success}async injectDetailed(e,s,n={}){let r={...pi,...n},o=this._createWritebackResult(e,r);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;let i=o.chatId,a={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:n.sourceMessageId||null,options:r};P.emit(D.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:i,content:a.content,options:r});let c=await this._insertToolOutputToLatestAssistantMessage(e,a,r,o);return c.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${i}`,c),c}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),n=this._findAssistantMessageIndex(s,e);if(n<0)return"";let r=s[n]||{},o=r[mn];if(typeof o=="string"&&o.trim())return o.trim();let i=r[Ye];return i&&typeof i=="object"?this._buildMessageInjectedContext(i).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let r=(e[s]||{})[Ye];return r&&typeof r=="object"?r:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:n}=this._getChatRuntime(),r=this._findAssistantMessageIndex(n,null);return r<0?null:n[r]?.[Ye]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:n,context:r,chat:o}=this._getChatRuntime(),i=this._findAssistantMessageIndex(o,null);if(i<0)return!1;let a=o[i],c=a?.[Ye];if(!c||!c[s])return!1;delete c[s],a[Ye]=c,a[mn]=this._buildMessageInjectedContext(c);let l=r?.saveChat||n?.saveChat||null;return typeof l=="function"&&await l.call(r||n),P.emit(D.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(n){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",n),!1}}async clearAllContext(e){try{let{api:s,context:n,chat:r}=this._getChatRuntime(),o=this._findAssistantMessageIndex(r,null);if(o<0)return!1;let i=r[o];delete i[Ye],delete i[mn];let a=n?.saveChat||s?.saveChat||null;return typeof a=="function"&&await a.call(n||s),P.emit(D.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),n=Object.entries(s).map(([r,o])=>({toolId:r,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,n=s?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(s?.chat)?s.chat:[],i=r.length?r:o;return{topWindow:e,api:s,context:n,chat:i,contextChat:r,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let n=he.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:he.NONE,commit:{preferredMethod:n,attemptedMethods:[],appliedMethod:he.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:hn.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,n,r,o,i=null){let a=e?.contextChat?.[n]||e?.apiChat?.[n]||s?.[n]||i||null,c=this._getWritableMessageField(a).text||"",l=a?.[Ye]?.[r],u=o?c.includes(o):!0,d=!!(l&&String(l.content||"").trim()===o);return{latestMessage:a,latestText:c,textIncludesContent:u,mirrorStored:d}}async _confirmRefresh(e,s,n,r,o,i=null){let a=1,c=this._collectWritebackVerification(e,s,n,r,o,i);for(let l=0;l<Wl;l+=1){if(c.textIncludesContent&&c.mirrorStored)return{...c,refreshConfirmed:!0,confirmChecks:a,confirmedBy:"text_and_mirror_present"};await this._wait(Yl),a+=1,c=this._collectWritebackVerification(e,s,n,r,o,i)}return{...c,refreshConfirmed:c.textIncludesContent&&c.mirrorStored,confirmChecks:a,confirmedBy:c.textIncludesContent&&c.mirrorStored?"text_and_mirror_present":""}}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let n=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,s){let n=String(e||""),r=String(s||"").trim();return r?n.includes(r)?{text:n.replace(r,"").trimEnd(),removed:!0}:{text:n,removed:!1}:{text:n,removed:!1}}_syncMessageToRuntimeChats(e,s,n){let{contextChat:r,apiChat:o}=e||{},i=a=>{!Array.isArray(a)||s<0||s>=a.length||a[s]!==n&&(a[s]={...a[s]||{},...n})};i(r),i(o)}_notifyMessageUpdated(e,s){try{let{api:n,topWindow:r}=e||{},o=n?.eventSource||null,a=(n?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";o&&typeof o.emit=="function"&&(o.emit(a,s),typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(()=>{o.emit(a,s)}):typeof r?.setTimeout=="function"&&r.setTimeout(()=>{o.emit(a,s)},30))}catch(n){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",n)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let r=(o,i)=>{if(!this._isAssistantMessage(o)||s==null||s==="")return!1;let a=String(s).trim();return a?[o.message_id,o.id,o.messageId,o.mes_id,o.swipe_id,i].map(l=>l==null?"":String(l).trim()).includes(a):!1};for(let o=n.length-1;o>=0;o-=1)if(r(n[o],o))return o;for(let o=n.length-1;o>=0;o-=1)if(this._isAssistantMessage(n[o]))return o;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).sort(([,o],[,i])=>(o?.updatedAt||0)-(i?.updatedAt||0));if(!n.length)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,i]of n)r.push(`[${o}]`),r.push(i?.content||""),r.push("");return r.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let n of s)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,s){let n=e&&typeof e=="object"?e:{},r=["mes","message","content","text"],o=!1;return r.forEach(i=>{typeof n[i]=="string"&&(n[i]=s,o=!0)}),o||(n.mes=s,n.message=s),n}_stripExistingToolOutput(e,s=[]){let n=String(e||"");return(Array.isArray(s)?s:[]).forEach(o=>{let i=String(o||"").trim();if(!i)return;if(i.startsWith("regex:")){try{let u=new RegExp(i.slice(6).trim(),"gis");n=n.replace(u,"")}catch(u){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",i,u)}return}let a=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(`<${a}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${a}>\\s*`,"gi"),l=new RegExp(`\\{${a}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(c,""),n=n.replace(l,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,s){let n=String(e||""),r=String(s||"").trim();return r?n.replace(r,"").trimEnd():n.trimEnd()}async _insertToolOutputToLatestAssistantMessage(e,s,n={},r=null){let o=r||this._createWritebackResult(e,n);try{let i=this._getChatRuntime(),{api:a,context:c,chat:l}=i;if(!Array.isArray(l)||!l.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let u=this._findAssistantMessageIndex(l,n.sourceMessageId);if(u<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;o.messageIndex=u,o.steps.foundTargetMessage=!0;let d=l[u],{key:p,text:y}=this._getWritableMessageField(d);o.textField=p;let v=d[Ye]&&typeof d[Ye]=="object"?d[Ye]:{},x=v?.[e]||{},_=x?.content||"",T=x?.blockText||_||"",C=Object.entries(v).filter(([ee])=>ee!==e).map(([,ee])=>ee||{}),W=String(s.content||"").trim(),le=this._inferBlockType(W),J={toolId:e,messageId:n.sourceMessageId||d?.message_id||d?.messageId||u,blockType:le,insertedAt:s.updatedAt,replaceable:n.overwrite!==!1};o.blockIdentity=J;let Le=n.overwrite===!1?{text:String(y||""),removed:!1}:this._stripExactStoredBlock(y,T),k=Le.text,$="";n.overwrite!==!1&&T&&!Le.removed&&($="previous_block_not_found");let z=n.overwrite===!1?k:this._stripExistingToolOutput(k,n.extractionSelectors),L=z!==k;k=z;let X=n.overwrite===!1?k:this._stripPreviousStoredToolContent(k,_),be=X!==k;k=X,o.replacedExistingBlock=Le.removed||L||be;let ve=[(n.overwrite===!1?String(y||""):k).trimEnd(),W].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!W;let Ue=C.every(ee=>{let g=String(ee?.blockText||ee?.content||"").trim();return g?ve.includes(g):!0});o.preservedOtherToolBlocks=Ue,Ue?$&&(o.conflictDetected=!0,o.conflictReason=$):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let ze={...v,[e]:{toolId:e,content:W,blockText:W,blockType:le,blockIdentity:J,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};d[p]=ve,this._applyMessageText(d,ve),d[Ye]=ze,d[mn]=this._buildMessageInjectedContext(ze),o.contentCommitted=!0,o.commit.contentCommitted=!0,o.steps.contentCommitted=!0,o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(i,u,d),o.steps.runtimeSynced=!0;let Xe=c?.setChatMessages||a?.setChatMessages||i?.topWindow?.setChatMessages||null,Pe=c?.setChatMessage||a?.setChatMessage||i?.topWindow?.setChatMessage||null;o.commit.preferredMethod=typeof Xe=="function"?he.SET_CHAT_MESSAGES:typeof Pe=="function"?he.SET_CHAT_MESSAGE:he.LOCAL_ONLY;let ct=!1;if(typeof Xe=="function"){Et(o.commit.attemptedMethods,he.SET_CHAT_MESSAGES);try{await Xe.call(c||a||i?.topWindow,[{message_id:u,message:ve,mes:ve,content:ve,text:ve}],{refresh:"affected"}),o.steps.hostSetChatMessages=!0,o.hostUpdateMethod=he.SET_CHAT_MESSAGES,o.hostCommitApplied=!0,o.commit.appliedMethod=he.SET_CHAT_MESSAGES,o.commit.hostCommitApplied=!0,ct=!0}catch(ee){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",ee),o.errors.push(`setChatMessages: ${ee?.message||String(ee)}`)}}if(!ct&&typeof Pe=="function"){Et(o.commit.attemptedMethods,he.SET_CHAT_MESSAGE);try{await Pe.call(c||a||i?.topWindow,{message:ve,mes:ve,content:ve,text:ve},u),o.steps.hostSetChatMessage=!0,o.hostUpdateMethod=he.SET_CHAT_MESSAGE,o.hostCommitApplied=!0,o.commit.appliedMethod=he.SET_CHAT_MESSAGE,o.commit.hostCommitApplied=!0,o.commit.fallbackUsed=o.commit.preferredMethod!==he.SET_CHAT_MESSAGE,ct=!0}catch(ee){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",ee),o.errors.push(`setChatMessage: ${ee?.message||String(ee)}`)}}if(ct||(o.hostUpdateMethod=he.LOCAL_ONLY,Et(o.commit.attemptedMethods,he.LOCAL_ONLY),o.commit.appliedMethod=he.LOCAL_ONLY,o.commit.fallbackUsed=o.commit.preferredMethod!==he.LOCAL_ONLY),typeof Pe=="function")try{await Pe.call(c||a||i?.topWindow,{},u),o.steps.refreshForceSetChatMessage=!0,o.refreshRequested=!0,Et(o.refresh.requestMethods,"setChatMessage(force_refresh)")}catch(ee){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",ee),o.errors.push(`setChatMessage(refresh): ${ee?.message||String(ee)}`)}let ue=c?.saveChat||a?.saveChat||null,pe=c?.saveChatDebounced||a?.saveChatDebounced||null;typeof pe=="function"&&(pe.call(c||a),o.steps.saveChatDebounced=!0,o.refreshRequested=!0,Et(o.refresh.requestMethods,"saveChatDebounced")),typeof ue=="function"&&(await ue.call(c||a),o.steps.saveChat=!0,o.refreshRequested=!0,Et(o.refresh.requestMethods,"saveChat")),this._notifyMessageUpdated(i,u),o.steps.notifiedMessageUpdated=!0;let bt=String(s.content||"").trim();(o.steps.hostSetChatMessages||o.steps.hostSetChatMessage)&&(o.refreshRequested=!0,Et(o.refresh.requestMethods,o.hostUpdateMethod)),o.steps.notifiedMessageUpdated&&(o.refreshRequested=!0,Et(o.refresh.requestMethods,"MESSAGE_UPDATED")),o.steps.refreshRequested=o.refreshRequested,o.refresh.requested=o.refreshRequested;let Qe=await this._confirmRefresh(i,l,u,e,bt,d);return o.verification.textIncludesContent=Qe.textIncludesContent,o.verification.mirrorStored=Qe.mirrorStored,o.verification.refreshConfirmed=Qe.refreshConfirmed,o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.refreshConfirmed=o.verification.refreshConfirmed&&o.refreshRequested,o.refresh.confirmChecks=Number(Qe.confirmChecks)||0,o.refresh.confirmedBy=Qe.confirmedBy||"",o.refresh.confirmed=o.refreshConfirmed,o.steps.refreshConfirmed=o.refreshConfirmed,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite&&o.refreshConfirmed,o.writebackStatus=o.success?hn.SUCCESS:hn.FAILED,!o.success&&!o.error&&(o.error=o.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587: ${e} -> #${u}`),o}catch(i){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",i),o.error=i?.message||String(i),o.errors.push(o.error),o}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),r=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(i=>typeof i=="string"&&i.trim());if(r)return r;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},xn=new bn,Vl=xn});var fi={};ye(fi,{BUILTIN_VARIABLES:()=>gi,VariableResolver:()=>vn,default:()=>ql,variableResolver:()=>_t});var gi,vn,_t,ql,Br=F(()=>{Ae();gi={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},vn=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,s),n=this._resolveCustomVariables(n,s),n=this._resolveRegexVariables(n,s),n}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>this.resolveObject(r,s));let n={};for(let[r,o]of Object.entries(e))typeof o=="string"?n[r]=this.resolveTemplate(o,s):typeof o=="object"&&o!==null?n[r]=this.resolveObject(o,s):n[r]=o;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(gi))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,n]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let r of this.getAvailableVariables())n[r.category]||(n[r.category]=[]),n[r.category].push(r);for(let[r,o]of Object.entries(s))if(n[r]&&n[r].length>0){e.push(`\u3010${o}\u3011`);for(let i of n[r])e.push(`  ${i.name} - ${i.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let r=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(r)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let r=s.characterCard||s.raw?.characterCard;return r?this._formatCharacterCard(r):""}),n=n.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),n=n.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,s){let n=e;for(let[r,o]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(i,()=>{try{return o(s)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,a),""}}):n=n.replace(i,String(o))}return n}_resolveRegexVariables(e,s){let n=e;for(let[r,o]of this.variableHandlers){let i=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");n=n.replace(i,(a,c)=>{try{return o(c,s)}catch(l){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${c}:`,l),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let n=s.role||"unknown",r=s.content||s.mes||"";return`[${n}]: ${r}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},_t=new vn,ql=_t});var hi={};ye(hi,{DEFAULT_PROMPT_TEMPLATE:()=>mi,ToolPromptService:()=>Sn,default:()=>Jl,toolPromptService:()=>Tn});var mi,Sn,Tn,Jl,zr=F(()=>{Ae();As();Br();mi="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Sn=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let n=this._getPromptTemplate(e),r=_t.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),o=_t.resolveTemplate(n,r).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return _t.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:o,toolContentMacro:i})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],r=this._buildVariableContext(e,s),o=this._getBypassMessages(e);if(o&&o.length>0)for(let a of o)a.enabled!==!1&&n.push({role:this._normalizeRole(a.role),content:_t.resolveTemplate(a.content||"",r)});let i=this._buildUserContent(this._getPromptTemplate(e),r);return i&&n.push({role:"user",content:i}),this._log(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:mi}_getBypassMessages(e){return e.bypass?.enabled?K.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":_t.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},Tn=new Sn,Jl=Tn});var xi={};ye(xi,{LEGACY_OUTPUT_MODES:()=>Xl,OUTPUT_MODES:()=>At,TOOL_FAILURE_STAGES:()=>We,TOOL_RUNTIME_STATUS:()=>Ql,TOOL_WRITEBACK_STATUS:()=>te,ToolOutputService:()=>En,default:()=>Zl,toolOutputService:()=>is});function bi(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var At,Xl,Ql,We,te,En,is,Zl,Kr=F(()=>{Ae();Is();Ur();zr();ln();js();At={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Xl={inline:"follow_ai"},Ql={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},We={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},te={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};En=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===At.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===At.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let n=Date.now(),r=e.id,o=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,i=s?.sessionKey||"",a=s?.executionKey||"",c=this._getExtractionSelectors(e),l=e.output?.apiPreset||e.apiPreset||"",u="",d=te.NOT_APPLICABLE,p=null,y=[],v="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),P.emit(D.TOOL_EXECUTION_STARTED,{toolId:r,traceId:o,sessionKey:i,mode:At.POST_RESPONSE_API});try{if(u=We.BUILD_MESSAGES,y=await this._buildToolMessages(e,s),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${y.length} \u6761\u6D88\u606F`);let x=await this._getRequestTimeout();u=We.SEND_API_REQUEST;let _=await this._sendApiRequest(l,y,{timeoutMs:x,signal:s.signal});if(u=We.EXTRACT_OUTPUT,v=this._extractOutputContent(_,e),v){if(u=We.INJECT_CONTEXT,p=await xn.injectDetailed(r,v,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.messageId||"",extractionSelectors:c,traceId:o,sessionKey:i}),!p?.success)throw d=te.FAILED,new Error(p?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");d=te.SUCCESS}else d=te.SKIPPED_EMPTY_OUTPUT;u="";let T=Date.now()-n;return P.emit(D.TOOL_EXECUTED,{toolId:r,traceId:o,sessionKey:i,success:!0,duration:T,mode:At.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${T}ms`),{success:!0,toolId:r,output:v,duration:T,meta:{traceId:o,sessionKey:i,executionKey:a,generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",messageCount:y.length,selectors:c,apiPreset:l,writebackStatus:d,failureStage:"",writebackDetails:p,phases:bi(y,v,p)}}}catch(x){let _=Date.now()-n,T=u||We.UNKNOWN,C=d||te.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,x),P.emit(D.TOOL_EXECUTION_FAILED,{toolId:r,traceId:o,sessionKey:i,error:x.message||String(x),duration:_}),{success:!1,toolId:r,error:x.message||String(x),duration:_,meta:{traceId:o,sessionKey:i,executionKey:a,generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",messageCount:y.length,selectors:c,apiPreset:l,writebackStatus:C,failureStage:T,writebackDetails:p,phases:bi(y,v,p)}}}}async runToolInline(e,s){let n=Date.now(),r=e.id;try{let o=await this._buildToolMessages(e,s);return{success:!0,toolId:r,messages:o,duration:Date.now()-n}}catch(o){return{success:!1,toolId:r,error:o.message||String(o),duration:Date.now()-n}}}async previewExtraction(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),i=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:r,filteredSourceText:o,extractedText:i,messageEntries:n,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),i=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),a={...s,rawRecentMessagesText:r,recentMessagesText:o,extractedContent:i,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return Tn.buildToolMessages(e,a)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:o}=n,i=null;if(e){if(!nr(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);i=ms(e)}else i=ms();let a=qt(i||{});if(!a.valid&&!i?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${a.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:r,apiConfig:i},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Oe.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let n=typeof e=="string"?e:String(e||""),r=this._getExtractionSelectors(s);if(!r.length)return n.trim();let o=[];for(let i of r){let a=String(i||"").trim();if(!a)continue;if(a.startsWith("regex:")){let l=a.slice(6).trim();if(!l)continue;try{let u=new RegExp(l,"gi");[...n.matchAll(u)].forEach(p=>{let y=String(p?.[0]||"").trim();y&&o.push(y)})}catch(u){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:u})}continue}let c=a.replace(/^<|>$/g,"").trim();if(c)try{let l=new RegExp(`<${c}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${c}>`,"gi");(n.match(l)||[]).forEach(d=>{let p=String(d||"").trim();p&&o.push(p)})}catch(l){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:l})}}return o.length>0?o.join(`

`).trim():n.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(n=>String(n||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(n=>String(n||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,n={}){let r=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s),{strict:i=!1}=n;if(!o.length)return r.trim();let a=o.map((l,u)=>{let d=String(l||"").trim(),p=d.startsWith("regex:");return{id:`tool-extract-${u}`,type:p?"regex_include":"include",value:p?d.slice(6).trim():d,enabled:!0}}).filter(l=>l.value),c=Nt(r,a,[]);return i?(c||"").trim():c||r.trim()}_extractToolContent(e,s){let n=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let n=yt()||[],r=Lt()||[];return!Array.isArray(n)||n.length===0?s.trim():Nt(s,n,r)||s.trim()}catch(n){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",n),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of s)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),r=Array.isArray(s?.chatMessages)?s.chatMessages:[],o=[];for(let a=r.length-1;a>=0&&o.length<n;a-=1){let c=r[a],l=String(c?.role||"").toLowerCase(),u=l==="assistant"||l==="ai"||!c?.is_user&&!c?.is_system&&!l,d=this._getMessageText(c);u&&d&&o.unshift({text:d,message:c,chatIndex:a})}if(o.length>0)return o;let i=s?.lastAiMessage||s?.input?.lastAiMessage||"";return i?[{text:i,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((r,o)=>{let i=r.text||"",a=this._applyGlobalContextRules(i),c=this._extractToolContent(e,i);return{...r,order:o+1,rawText:i,filteredText:a,extractedText:c}})}_joinMessageBlocks(e,s,n={}){let r=Array.isArray(e)?e:[],{skipEmpty:o=!1}=n;return r.map(a=>{let c=String(a?.[s]||"").trim();return o&&!c?"":`${`\u3010\u7B2C ${a?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${c||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(r=>{let o=`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`,i=String(r?.filteredText||"").trim()||"(\u7A7A)",a=String(r?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${i}

\u5DE5\u5177\uFF1A
${a}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Oe.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},is=new En,Zl=is});var An={};ye(An,{abortAllTasks:()=>rc,abortTask:()=>nc,buildToolMessages:()=>Ti,clearExecutionHistory:()=>cc,createExecutionContext:()=>yc,createResult:()=>_n,enhanceMessagesWithBypass:()=>gc,executeBatch:()=>sc,executeTool:()=>Si,executeToolWithConfig:()=>Ei,executeToolsBatch:()=>hc,executorState:()=>ie,extractFailed:()=>pc,extractSuccessful:()=>uc,generateTaskId:()=>zt,getExecutionHistory:()=>lc,getExecutorStatus:()=>ac,getScheduler:()=>as,getToolsForEvent:()=>bc,mergeResults:()=>dc,pauseExecutor:()=>oc,resumeExecutor:()=>ic,setMaxConcurrent:()=>tc});function _n(t,e,s,n,r,o,i=0){return{success:s,taskId:t,toolId:e,data:n,error:r,duration:o,retries:i,timestamp:Date.now(),metadata:{}}}function zt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function ec(t,e={}){return{id:zt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function as(){return Rs||(Rs=new Hr(ie.maxConcurrent)),Rs}function tc(t){ie.maxConcurrent=Math.max(1,Math.min(10,t)),Rs&&(Rs.maxConcurrent=ie.maxConcurrent)}async function Si(t,e={},s){let n=as(),r=ec(t,e);for(;ie.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(i,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return vi(o),o}catch(o){let i=_n(r.id,t,!1,null,o,Date.now()-r.createdAt,r.retries);return vi(i),i}}async function sc(t,e={}){let{failFast:s=!1,concurrency:n=ie.maxConcurrent}=e,r=[],o=as(),i=o.maxConcurrent;o.maxConcurrent=n;try{let a=t.map(({toolId:c,options:l,executor:u})=>Si(c,l,u));if(s)for(let c of a){let l=await c;if(r.push(l),!l.success){o.abortAll();break}}else{let c=await Promise.allSettled(a);for(let l of c)l.status==="fulfilled"?r.push(l.value):r.push(_n(zt(),"unknown",!1,null,l.reason,0,0))}}finally{o.maxConcurrent=i}return r}function nc(t){return as().abort(t)}function rc(){as().abortAll(),ie.executionQueue=[]}function oc(){ie.isPaused=!0}function ic(){ie.isPaused=!1}function ac(){return{...as().getStatus(),isPaused:ie.isPaused,activeControllers:ie.activeControllers.size,historyCount:ie.executionHistory.length}}function vi(t){ie.executionHistory.push(t),ie.executionHistory.length>100&&ie.executionHistory.shift()}function lc(t={}){let e=[...ie.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function cc(){ie.executionHistory=[]}function dc(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function uc(t){return t.filter(e=>e.success).map(e=>e.data)}function pc(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function yc(t={}){return{taskId:zt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function gc(t,e){return!e||e.length===0?t:[...e,...t]}function fc(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ti(t,e){let s=[],n=t.promptTemplate||"",r={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,i]of Object.entries(r))n=n.replace(new RegExp(fc(o),"g"),i);return s.push({role:"USER",content:n}),s}async function Ei(t,e,s={}){let n=ce(t);if(!n)return{success:!1,taskId:zt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:zt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),o=zt();try{P.emit(D.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let i=Ti(n,e);if(typeof s.callApi=="function"){let a=n.output?.apiPreset||n.apiPreset||"",c=a?{preset:a}:null,l=await s.callApi(i,c,s.signal),u=l;n.outputMode==="separate"&&n.extractTags?.length>0&&(u=mc(l,n.extractTags));let d={success:!0,taskId:o,toolId:t,data:u,duration:Date.now()-r};return P.emit(D.TOOL_EXECUTED,{toolId:t,taskId:o,result:d}),d}else return{success:!0,taskId:o,toolId:t,data:{messages:i,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(i){let a={success:!1,taskId:o,toolId:t,error:i.message||String(i),duration:Date.now()-r};return P.emit(D.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:i}),a}}function mc(t,e){let s={};for(let n of e){let r=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=t.match(r);o&&(s[n]=o.map(i=>{let a=i.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return a?a[1].trim():""}))}return s}async function hc(t,e,s={}){let n=[];for(let r of t){let o=ce(r);if(o&&o.enabled){let i=await Ei(r,e,s);n.push(i)}}return n}function bc(t){let e=[],s=ns();for(let n of s){let r=n?.trigger?.enabled&&n?.trigger?.event===t,o=Array.isArray(n?.triggerEvents)&&n.triggerEvents.includes(t);n&&n.enabled&&(r||o)&&e.push(n)}return e}var ie,Hr,Rs,wn=F(()=>{rs();Ae();ie={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Hr=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((n,r)=>{this.queue.push({executor:e,task:s,resolve:n,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:n,resolve:r,reject:o}=e,i=new AbortController;n.abortController=i,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),ie.activeControllers.set(n.id,i),this.executeTask(s,n,i.signal).then(a=>{n.status="completed",n.completedAt=Date.now(),r(a)}).catch(a=>{n.status=a.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(a)}).finally(()=>{this.running.delete(n.id),ie.activeControllers.delete(n.id),ie.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,n){let r=Date.now(),o=null;for(let i=0;i<=s.maxRetries;i++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await e(n);return _n(s.id,s.toolId,!0,a,null,Date.now()-r,i)}catch(a){if(o=a,a.name==="AbortError")throw a;i<s.maxRetries&&(await this.delay(1e3*(i+1)),s.retries=i+1)}}throw o}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=ie.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of ie.activeControllers.values())e.abort();ie.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Rs=null});var Ji={};ye(Ji,{AUTO_TRIGGER_SKIP_REASONS:()=>M,EVENT_TYPES:()=>I,TOOL_EXECUTION_PATHS:()=>jt,checkGate:()=>Zr,destroyToolTriggerManager:()=>md,exportAutoTriggerDiagnostics:()=>Bn,exportGenerationTransactionDiagnostics:()=>xd,getAutoTriggerDiagnostics:()=>Gs,getChatContext:()=>eo,getCurrentCharacter:()=>to,getFullContext:()=>Zc,getGenerationTransactionDiagnostics:()=>bd,getToolTriggerManagerState:()=>hd,getWorldbookContent:()=>Ui,initToolTriggerManager:()=>Vi,initTriggerModule:()=>Wr,previewToolExtraction:()=>io,registerEventListener:()=>it,registerTriggerHandler:()=>ed,removeAllListeners:()=>Xc,removeAllTriggerHandlers:()=>sd,resetGateState:()=>Qc,runToolManually:()=>oo,setDebugMode:()=>vd,setTriggerHandlerEnabled:()=>td,triggerState:()=>m,unregisterEventListener:()=>Yr,updateGateState:()=>It});function Ft(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Pn(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function q(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function $n(t){return new Promise(e=>setTimeout(e,t))}function Gn(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let n of s){if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"&&n.trim())return n.trim()}return e}function Vr(t=[]){return(Array.isArray(t)?t:[]).map((s,n)=>({role:Un(s),content:Pn(s),name:s?.name||"",timestamp:s?.send_date||s?.timestamp||"",isSystem:!!s?.is_system,isUser:!!s?.is_user,sourceId:Gn(s,n),chatIndex:n,originalMessage:s}))}function On(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function _c(t,e=null,s={}){let{lockToMessageId:n=!1}=s,r=Vr(t),o=e==null||e===""?null:String(e).trim(),i=null,a=null;for(let c=r.length-1;c>=0;c-=1){let l=r[c],u=q(l.sourceId),d=o&&(u===o||String(l.chatIndex)===o);if(!i&&l.role==="assistant"&&On(l.content)&&(!o||!n||d)&&(i=l),!a&&l.role==="user"&&l.content&&(a=l),i&&a)break}return{messages:r,lastUserMessage:a,lastAiMessage:i}}async function Ac(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:n=250,lockToMessageId:r=!1}=t,o={messages:[],lastUserMessage:null,lastAiMessage:null};for(let i=0;i<=s;i+=1){let a=await Ps();if(o=_c(a,e,{lockToMessageId:r}),o.lastAiMessage?.content)return o;i<s&&await $n(n)}return o}function wc(t="user_trigger_intent"){It({lastUserSendIntentAt:Date.now(),lastUserIntentSource:t||"user_trigger_intent"})}function Rn(){wc("send_button_or_enter")}function Ic(){let t=Ft(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],n=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],r=(o,i,a)=>{o.forEach(c=>{let l=e.querySelector(c);l&&l.addEventListener(i,a,!0)})};return r(s,"click",()=>Rn()),r(s,"pointerup",()=>Rn()),r(s,"touchend",()=>Rn()),r(n,"keydown",o=>{let i=o?.key||"";(i==="Enter"||i==="NumpadEnter")&&!o.shiftKey&&Rn()}),t.__YYT_sendIntentHooksInstalled=!0,U("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function Rc(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function lt(){return Ft().SillyTavern||null}function Mc(){return Ft().TavernHelper||null}function Cc(){let t=lt();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function kc(t=""){return t===I.MESSAGE_RECEIVED||t===I.MESSAGE_SENT||t===I.MESSAGE_UPDATED||t===I.MESSAGE_DELETED}function qr(t){return!!t&&(typeof t.on=="function"||typeof t.addEventListener=="function")}function Pi(t,e,s){if(!t||typeof s!="function")return!1;try{if(typeof t.off=="function")return t.off(e,s),!0;if(typeof t.removeListener=="function")return t.removeListener(e,s),!0;if(typeof t.removeEventListener=="function")return t.removeEventListener(e,s),!0}catch(n){G("warn","\u79FB\u9664\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25",{eventName:e,error:n?.message||String(n)})}return!1}function Dc(t,e,s){qr(t)&&(ae.eventSource=t,ae.eventTypes=e||ae.eventTypes||null,ae.source=s||ae.source||"unknown",G("info","\u7F13\u5B58\u4E8B\u4EF6\u6865\u63A5\u6210\u529F",{source:ae.source,hasOff:typeof t.off=="function",hasRemoveListener:typeof t.removeListener=="function",hasAddEventListener:typeof t.addEventListener=="function"}))}function Ms(){let t=Ft(),e=t.SillyTavern||null,s=e?.getContext?.()||null,n=[{source:"SillyTavern.eventSource",eventSource:e?.eventSource,eventTypes:e?.eventTypes||e?.event_types||null},{source:"topWindow.eventSource",eventSource:t?.eventSource,eventTypes:t?.event_types||t?.eventTypes||null},{source:"SillyTavern.getContext()",eventSource:s?.eventSource||null,eventTypes:s?.eventTypes||s?.event_types||null},{source:"scriptModule exports",eventSource:ae.scriptModule?.eventSource||null,eventTypes:ae.scriptModule?.event_types||ae.scriptModule?.eventTypes||null}];for(let r of n)if(qr(r.eventSource))return Dc(r.eventSource,r.eventTypes,r.source),r;return{source:"",eventSource:null,eventTypes:null}}async function Pc(){let t=Ms();if(t.eventSource)return t;ae.loadingPromise||(ae.loadingPromise=(async()=>{try{let s=xc;ae.scriptModule=await import(s)}catch(s){ae.importError=s,G("warn","\u52A0\u8F7D /script.js \u4E8B\u4EF6\u6865\u63A5\u5931\u8D25",s?.message||String(s))}finally{ae.loadingPromise=null}})()),await ae.loadingPromise;let e=Ms();return e.eventSource?e:{source:"",eventSource:null,eventTypes:null}}function Nn(){return Ms().eventSource||ae.eventSource||null}function Ln(){return Ms().eventTypes||ae.eventTypes||I}function U(...t){(m.debugMode||Oe.getDebugSettings()?.enableDebugLog)&&console.log("[YouYouToolkit:Trigger]",...t)}function G(t="info",...e){(typeof console[t]=="function"?console[t]:console.log)("[youyou_trigger]",...e)}function Ee(){let t=Oe.getListenerSettings?.()||Oe.getSettings?.()?.listener||{},e=parseInt(t?.debounceMs,10),s=parseInt(t?.messageSessionWindowMs,10),n=parseInt(t?.historyRetentionLimit,10);return{listenGenerationEnded:t?.listenGenerationEnded!==!1,ignoreQuietGeneration:t?.ignoreQuietGeneration!==!1,ignoreAutoTrigger:t?.ignoreAutoTrigger===!0,debounceMs:Number.isFinite(e)?Math.max(0,e):300,useMessageReceivedFallback:t?.useMessageReceivedFallback!==!1,useGenerationAfterCommandsFallback:t?.useGenerationAfterCommandsFallback!==!1,messageSessionWindowMs:Number.isFinite(s)?Math.max(300,s):1800,historyRetentionLimit:Number.isFinite(n)?Math.max(1,Math.min(50,n)):10}}function at(t,e=""){if(t&&typeof t=="object")return q(t?.messageId??t?.id??t?.message_id??t?.mes_id);if(e===I.GENERATION_ENDED){if(typeof t=="number"&&Number.isFinite(t))return String(t);if(typeof t=="string"&&/^\d+$/.test(t.trim()))return t.trim()}return kc(e)?q(t):""}function $c(t,e,s){let n=q(s);if(!n)return!1;let r=q(Gn(t,e));if(r&&r===n)return!0;let o=Number(n);return Number.isInteger(o)&&e===o}async function Gc(t){let e=q(t);if(!e)return null;let s=await Ps();for(let n=s.length-1;n>=0;n-=1){let r=s[n];if($c(r,n,e))return{message:r,index:n}}return null}async function Oc(t,e={}){let{retries:s=0,retryDelayMs:n=80}=e,r=null;for(let o=0;o<=s;o+=1){if(r=await Gc(t),r)return r;o<s&&await $n(n)}return null}function Nc(t,e,s){return q(s)?t===I.MESSAGE_RECEIVED||t===I.MESSAGE_UPDATED?!0:!!(e&&typeof e=="object"&&(e?.messageId!==void 0||e?.message_id!==void 0||e?.id!==void 0||e?.mes_id!==void 0)):!1}function $i(){let t=[m.gateState.lastUserSendIntentAt,m.gateState.lastUserMessageAt].filter(e=>Number(e)>0);return t.length>0?Math.max(...t):0}function Gi(t=Date.now()){let e=$i();return e>0&&t-e<=Di}function Jr(t="",e=null){return String(t||e?.type||"").trim().toLowerCase()}function Lc(t){let e=String(t||"").trim().toLowerCase();return e?/re\s*-?\s*roll|reroll|重\s*roll/.test(e)?"reroll":/regenerat|\bregen\b|重新生成/.test(e)?"regenerate":/\bswipe\b|swipe[_-]?id/.test(e)?"swipe":/\bquiet\b/.test(e)?"quiet":"":""}function Oi(t="",e=null){let s=typeof t=="string"?t.trim():String(t||"").trim(),n=e??null,r=Jr(t,e);if(e?.swipeId!==void 0||e?.swipe_id!==void 0||e?.swipe===!0||e?.isSwipe===!0)return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:r,generationAction:"swipe",generationActionSource:"params.swipe",explicitGenerationAction:"swipe"};let o=[{source:"type",value:s}];for(let i of Ec){let a=e?.[i];a==null||a===""||o.push({source:`params.${i}`,value:String(a)})}for(let i of o){let a=Lc(i.value);if(a)return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:r,generationAction:a,generationActionSource:i.source,explicitGenerationAction:Ai.has(a)?a:""}}return{rawGenerationType:s,rawGenerationParams:n,normalizedGenerationType:r,generationAction:r||"",generationActionSource:r?"normalized_generation_type":"",explicitGenerationAction:Ai.has(r)?r:""}}function Ni(t=""){let e=String(t||"").trim();if(!e)return"";let s=0;for(let n=0;n<e.length;n+=1)s=(s<<5)-s+e.charCodeAt(n),s|=0;return Math.abs(s).toString(36)}function Uc(t,e=null,s=Date.now()){let n=$i(),r=Oi(t,e);return n>0&&s-n<=Di?{startedByUserIntent:!0,userIntentDetectedAt:n,userIntentSource:"recent_user_trigger_intent",userIntentDetail:"recent_user_send_or_message"}:r.explicitGenerationAction?{startedByUserIntent:!0,userIntentDetectedAt:s,userIntentSource:`explicit_generation_action:${r.explicitGenerationAction}`,userIntentDetail:`generation_action_${r.explicitGenerationAction}`}:{startedByUserIntent:!1,userIntentDetectedAt:n,userIntentSource:"none",userIntentDetail:"no_recent_user_intent_or_explicit_generation_action"}}function Ds(t=$s()){let e=m.gateState.lastGenerationBaseline;return!e||t&&e.chatId&&e.chatId!==t?null:e}function Xr(t=Date.now()){return Gi(t)?!0:!!Ds()?.startedByUserIntent}function wi(t=null){let e=t||Ds();return e?m.gateState.lastGenerationDryRun||e.dryRun?{eligible:!1,baseline:e,reason:M.DRY_RUN_GENERATION,detail:"dry_run_generation"}:{eligible:!0,baseline:e,reason:"",detail:""}:{eligible:!1,baseline:null,reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"missing_generation_baseline"}}function Qr(t=Date.now()){return Number(m.gateState.uiTransitionGuardUntil)>t}function Ii(t=""){let e=Date.now();It({uiTransitionGuardUntil:e+_i,lastUiTransitionAt:e,lastUiTransitionSource:t||""}),G("info","\u8FDB\u5165\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B",{source:t||"unknown",guardUntil:e+_i})}function Ri(t=""){for(let e of S.pendingMessageTimers.values())clearTimeout(e);S.pendingMessageTimers.clear(),t&&G("info","\u5DF2\u6E05\u7406\u5F85\u6267\u884C\u81EA\u52A8\u89E6\u53D1\u5B9A\u65F6\u5668",{reason:t})}function Li(t=[],e={}){let s=lt(),n=s?.getContext?.()||null,r=Vr(t),o=null;for(let i=r.length-1;i>=0;i-=1){let a=r[i];if(a.role==="assistant"&&On(a.content)){o=a;break}}return{traceId:e.traceId||us("generation"),startedAt:Number(e.startedAt)||Date.now(),capturedAt:Date.now(),chatId:Cs(s,n,null),messageCount:r.length,lastAssistantIndex:o?.chatIndex??-1,lastAssistantMessageId:q(o?.sourceId),lastAssistantPreview:String(o?.content||"").slice(0,160),dryRun:!!e.dryRun,generationType:e.rawGenerationType||e.type||"",generationParams:e.rawGenerationParams||e.params||null,rawGenerationType:e.rawGenerationType||e.type||"",rawGenerationParams:e.rawGenerationParams||e.params||null,normalizedGenerationType:e.normalizedGenerationType||Jr(e.type,e.params),generationAction:e.generationAction||"",generationActionSource:e.generationActionSource||"",explicitGenerationAction:e.explicitGenerationAction||"",startedByUserIntent:!!e.startedByUserIntent,userIntentDetectedAt:Number(e.userIntentDetectedAt)||0,userIntentSource:e.userIntentSource||"",userIntentDetail:e.userIntentDetail||"",baselineResolved:e.baselineResolved!==void 0?!!e.baselineResolved:!0,baselineResolutionAt:Number(e.baselineResolutionAt)||0,provisional:!!e.provisional,baselineSource:e.baselineSource||""}}async function Bc(t={}){let e=await Ps();return Li(e,{...t,baselineResolved:t.baselineResolved!==void 0?t.baselineResolved:!0,baselineResolutionAt:Number(t.baselineResolutionAt)||Date.now(),provisional:t.provisional===!0,baselineSource:t.baselineSource||"captured_chat_snapshot"})}function zc(t={}){return Li(Cc(),{...t,baselineResolved:!1,baselineResolutionAt:0,provisional:!0,baselineSource:t.baselineSource||"provisional_immediate_snapshot"})}async function jr(t={}){let{chatId:e=$s(),traceId:s="",retries:n=4,retryDelayMs:r=80}=t,o=null;for(let a=0;a<=n;a+=1){o=Ds(e);let c=!s||!o?.traceId||o.traceId===s;if(o&&c&&o.baselineResolved!==!1)return o;a<n&&await $n(r)}return o&&(!s||!o?.traceId||o.traceId===s)?o:null}function Kc(t=Date.now(),e=Ds()){if(m.gateState.isGenerating)return!0;if(!e)return!1;let s=Number(m.gateState.lastGenerationAt)||0;return s<=0?!1:t-s<=Sc}function Hc(t){return t?.message?{role:Un(t.message),content:Pn(t.message),chatIndex:t.index,sourceId:q(Gn(t.message,t.index))}:null}async function jc(t,e={}){let s=Date.now(),n=e?.traceId||m.gateState.lastGenerationTraceId||"",r=Hc(t),o=await jr({traceId:n,retries:4,retryDelayMs:80})||Ds(),i=Kc(s,o),a=!!(r&&o&&Fr(r,o)),c=!n||!o?.traceId||o.traceId===n;return r?o?o.baselineResolved===!1?{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"generation_baseline_pending_resolution"}:c?!m.gateState.isGenerating&&!i?{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:a,historicalReplayBlocked:!0,historicalReplayReason:"message_received_outside_active_generation",reason:M.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,detail:"message_received_outside_active_generation"}:a?{allowed:!0,baseline:o,eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:"",reason:"",detail:"",messageEntry:r}:{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_before_generation_baseline",reason:M.HISTORICAL_REPLAY_MESSAGE_RECEIVED,detail:"message_received_before_generation_baseline"}:{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_trace_mismatch",reason:M.HISTORICAL_REPLAY_MESSAGE_RECEIVED,detail:"message_received_trace_mismatch"}:{allowed:!1,baseline:null,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_without_generation_baseline",reason:M.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,detail:"message_received_without_generation_baseline"}:{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"message_received_identity_not_resolved"}}function Fr(t,e){if(!t||t.role!=="assistant"||!On(t.content))return!1;if(!e)return!0;if(Number.isInteger(e.lastAssistantIndex)&&e.lastAssistantIndex>=0)return t.chatIndex>e.lastAssistantIndex;let s=Number.isFinite(e.messageCount)?e.messageCount:0;return t.chatIndex>=s}async function Fc(t=""){let e=q(t),s=lt(),n=s?.getContext?.()||null,r=Cs(s,n,null),o=await Ps(),i=Vr(o),a=m.gateState.lastGenerationBaseline?.chatId===r?m.gateState.lastGenerationBaseline:null;if(e){let c=i.find(l=>q(l.sourceId)===e||String(l.chatIndex)===e);return c&&On(c.content)&&c.role==="assistant"&&(!a||Fr(c,a))?c:null}if(!a)return null;for(let c=i.length-1;c>=0;c-=1){let l=i[c];if(Fr(l,a))return l}return null}async function kn(t="",e={}){let{retries:s=0,retryDelayMs:n=250}=e,r=null;for(let o=0;o<=s;o+=1){if(r=await Fc(t),r)return r;o<s&&await $n(n)}return null}function Rt(){let t=m.gateState.lastGenerationBaseline;return{baselineResolved:t?.baselineResolved??!1,baselineResolutionAt:t?.baselineResolutionAt||0,provisionalBaseline:!!t?.provisional,generationStartedByUserIntent:!!t?.startedByUserIntent,generationUserIntentSource:t?.userIntentSource||"",generationUserIntentDetail:t?.userIntentDetail||"",rawGenerationType:t?.rawGenerationType||m.gateState.lastGenerationType||"",rawGenerationParams:t?.rawGenerationParams??m.gateState.lastGenerationParams??null,normalizedGenerationType:t?.normalizedGenerationType||m.gateState.lastNormalizedGenerationType||"",generationAction:t?.generationAction||m.gateState.lastGenerationAction||"",generationActionSource:t?.generationActionSource||m.gateState.lastGenerationActionSource||"",explicitGenerationAction:t?.explicitGenerationAction||"",lastUserIntentSource:m.gateState.lastUserIntentSource||""}}function Yc(){let t=m.gateState.lastGenerationBaseline;return{sessionGenerationTraceId:m.gateState.lastGenerationTraceId||"",sessionGenerationStartedAt:t?.startedAt||0,sessionBaselineResolvedAtCreation:t?.baselineResolved??!1,sessionBaselineResolutionAtCreation:t?.baselineResolutionAt||0,sessionProvisionalBaselineAtCreation:!!t?.provisional,sessionGenerationStartedByUserIntent:!!t?.startedByUserIntent,sessionGenerationUserIntentSource:t?.userIntentSource||"",sessionGenerationUserIntentDetail:t?.userIntentDetail||"",sessionGenerationActionAtCreation:t?.generationAction||m.gateState.lastGenerationAction||"",sessionGenerationActionSourceAtCreation:t?.generationActionSource||m.gateState.lastGenerationActionSource||"",sessionExplicitGenerationActionAtCreation:t?.explicitGenerationAction||"",sessionNormalizedGenerationTypeAtCreation:t?.normalizedGenerationType||m.gateState.lastNormalizedGenerationType||"",sessionRawGenerationTypeAtCreation:t?.rawGenerationType||m.gateState.lastGenerationType||"",sessionLastUserIntentSourceAtCreation:m.gateState.lastUserIntentSource||"",sessionGenerationCapturedAt:Date.now()}}async function Wc(){return In||(In=Promise.resolve().then(()=>(wn(),An)).catch(t=>{throw In=null,t})),In}function Vc(t={}){let e=Rt();return{stage:"",eventType:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",executionKey:"",messageRole:"",reason:"",skipReasonDetailed:"",confirmedAssistantMessageId:"",scheduledDelayMs:0,candidateToolIds:[],receivedAt:Date.now(),handledAt:0,generationTraceId:m.gateState.lastGenerationTraceId||"",generationDryRun:!!m.gateState.lastGenerationDryRun,generationStartedAt:m.gateState.lastGenerationBaseline?.startedAt||0,uiTransitionGuardActive:Qr(),uiTransitionGuardUntil:m.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:m.gateState.lastUiTransitionSource||"",baselineMessageCount:m.gateState.lastGenerationBaseline?.messageCount||0,baselineAssistantId:m.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",generationBaselineMessageCount:m.gateState.lastGenerationBaseline?.messageCount||0,generationBaselineAssistantId:m.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",confirmationSource:"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",registeredEvents:Array.from(S.listeners.keys()),listenerSettings:Ee(),hasRecentUserTriggerIntent:Gi(),hasConfirmedUserTriggerIntent:Xr(),...e,...t}}function Te(t={}){let e=Vc(t);return S.lastEventDebugSnapshot=e,U("\u81EA\u52A8\u89E6\u53D1\u4E8B\u4EF6\u5FEB\u7167:",e),e}function qc(){let t=Ee();return t.listenGenerationEnded===!1?{skip:!0,reason:M.LISTENER_DISABLED,listenerSettings:t}:t.ignoreAutoTrigger&&!Xr()?{skip:!0,reason:M.IGNORED_AUTO_TRIGGER,listenerSettings:t}:{skip:!1,reason:"",listenerSettings:t}}function Jc(t={}){let e=Rt();return{triggerEvent:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",executionKey:"",selectedToolIds:[],skipReason:"",skipReasonDetailed:"",lockedAiMessageId:"",confirmedAssistantMessageId:"",confirmationSource:"",eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",generationTraceId:m.gateState.lastGenerationTraceId||"",...e,triggeredAt:Date.now(),...t}}function wt(t={}){let e=Jc(t);return S.lastAutoTriggerSnapshot=e,U("\u81EA\u52A8\u89E6\u53D1\u5FEB\u7167:",e),e}function ls(t,e){(Array.isArray(t)?t:[]).forEach(n=>{n?.id&&ss(n.id,{lastTriggerAt:Date.now(),lastExecutionKey:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0,...e},{touchLastRunAt:!1,emitEvent:!1})})}function Cs(t,e,s){let r=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(o=>typeof o=="string"&&o.trim());return r||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function it(t,e,s={}){if(!t||typeof e!="function")return U("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),G("warn","\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25\uFF1A\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u65E0\u6548",{eventType:t}),()=>{};let{once:n=!1,priority:r=0}=s,o=Nn(),a=Ln()[t]||t,c=async(...l)=>{try{if(G("info","\u6536\u5230\u4E8B\u4EF6",t,l[0]??null),s.gateCheck&&!await Zr(s.gateCheck)){U(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`),G("warn","\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6",t);return}await e(...l),n&&Yr(t,c)}catch(u){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",u)}};if(m.listeners.has(t)||m.listeners.set(t,new Set),m.listeners.get(t).add(c),o&&typeof o.on=="function")o.on(a,c),U(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),G("info","\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u6E90\u76D1\u542C",{eventType:t,stEventType:a});else if(o&&typeof o.addEventListener=="function")o.addEventListener(a,c),U(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),G("info","\u5DF2\u6CE8\u518C addEventListener \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:a});else{let l=Ft();l.addEventListener&&(l.addEventListener(a,c),U(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),G("warn","\u4E8B\u4EF6\u6E90\u4E0D\u53EF\u7528\uFF0C\u56DE\u9000\u4E3A DOM \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:a}))}return()=>Yr(t,c)}function Yr(t,e){let s=m.listeners.get(t);if(s&&s.has(e)){s.delete(e);let n=Nn(),o=Ln()[t]||t;if(Pi(n,o,e))U(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let i=Ft();i.removeEventListener&&i.removeEventListener(o,e)}}}function Xc(){let t=Nn(),e=Ln();for(let[s,n]of m.listeners){let r=e[s]||s;for(let o of n)if(!Pi(t,r,o)){let i=Ft();i.removeEventListener&&i.removeEventListener(r,o)}}m.listeners.clear(),U("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function Zr(t){if(!t)return!0;let e=Date.now(),s=m.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return U("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return U("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return U("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return U("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return U("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(n){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",n),!1}return!0}function It(t){Object.assign(m.gateState,t)}function Qc(){m.gateState={lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastNormalizedGenerationType:"",lastGenerationAction:"",lastGenerationActionSource:"",lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""}}async function eo(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:n=!0,includeSystem:r=!1,format:o="messages"}=t;if(!lt())return U("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let a=await Ps(),c=[],l=Math.max(0,a.length-e);for(let u=l;u<a.length;u++){let d=a[u];if(!d)continue;let p=Un(d);if(!(p==="user"&&!s)&&!(p==="system"&&!r)&&!(p==="assistant"&&!n))if(o==="messages"){let y=Pn(d);c.push({role:p,content:y,name:d.name||"",timestamp:d.send_date||d.timestamp,isSystem:!!d.is_system,isUser:!!d.is_user})}else c.push(Pn(d))}return{messages:c,totalMessages:a.length,startIndex:l,endIndex:a.length-1}}catch(a){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",a),null}}function Un(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function Ps(){let t=Mc(),e=lt();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let n=e?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(e?.chat)?e.chat:[];s=(r.length?r:o).length-1}if(Number.isFinite(s)&&s>=0){let n=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(n)&&n.length>0)return n}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function to(){let t=lt();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let n=s[e];return{id:e,name:n.name||"",description:n.description||"",personality:n.personality||"",scenario:n.scenario||"",firstMes:n.first_mes||"",mesExample:n.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function Ui(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,n=lt();if(!n)return"";try{let o=(n.lorebook||[]).entries||[],i=[],a=0;for(let c of o){if(e&&!c.enabled)continue;let l=c.content||"";l&&a+l.length<=s&&(i.push(l),a+=l.length)}return i.join(`

`)}catch(r){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",r),""}}async function Zc(t={}){let[e,s,n]=await Promise.all([eo(t.chat||{}),to(),Ui(t.worldbook||{})]);return{chat:e,character:s,worldbook:n,timestamp:Date.now()}}function ed(t,e){if(!t||!e)return U("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:n,gateCondition:r,priority:o=0}=e;if(!s||typeof n!="function")return U("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};m.handlers.set(t,{eventType:s,handler:n,gateCondition:r,priority:o,enabled:!0});let i=it(s,async(...a)=>{let c=m.handlers.get(t);!c||!c.enabled||c.gateCondition&&!await Zr(c.gateCondition)||await c.handler(...a)},{priority:o});return U(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{i(),m.handlers.delete(t),U(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function td(t,e){let s=m.handlers.get(t);s&&(s.enabled=e,U(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function sd(){m.handlers.clear(),U("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function us(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function ks(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function $s(){let t=lt(),e=t?.getContext?.()||null;return Cs(t,e,null)}function so(t,e,s="",n=""){let r=t||$s(),o=q(e),i=String(n||m.gateState.lastGenerationTraceId||"").trim();return`${r}::${o||`event:${s||"unknown"}:latest`}::${i||"trace:unknown"}`}function Bi(t={}){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId),n=String(t?.generationTraceId||t?.generation?.traceId||m.gateState.lastGenerationTraceId||"").trim()||"trace:unknown",r=String(t?.assistantContentFingerprint||Ni(t?.lastAiMessage||t?.input?.lastAiMessage||"")||"").trim()||"content:na";return`${e}::${s}::${n}::${r}`}function nd(t,e,s={}){let n=q(s?.messageId||at(e,t)),r=s?.chatId||$s(),o=String(s?.generationTraceId||m.gateState.lastGenerationTraceId||"").trim(),i=s?.sessionKey||so(r,n,t,o),a=Date.now(),c=Rt(),l=Yc();return{sessionKey:i,traceId:s?.traceId||us("session"),chatId:r,messageId:n,messageKey:s?.messageKey||"",executionKey:s?.executionKey||"",messageRole:s?.messageRole||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"",isSpeculativeSession:!!s?.isSpeculativeSession,eventBelongsToCurrentGeneration:!!s?.eventBelongsToCurrentGeneration,historicalReplayBlocked:!!s?.historicalReplayBlocked,historicalReplayReason:s?.historicalReplayReason||"",skipReasonDetailed:s?.skipReasonDetailed||"",firstEventType:s?.eventType||t||"",receivedEvents:t?[t]:[],phase:s?.phase||N.RECEIVED,skipReason:s?.skipReason||"",scheduledAt:0,handledAt:0,completedAt:0,candidateToolIds:Array.isArray(s?.candidateToolIds)?[...s.candidateToolIds]:[],executionPathIds:Array.isArray(s?.executionPathIds)?[...s.executionPathIds]:[],sourceMessageLocked:!!n,baselineResolved:s?.baselineResolved??c.baselineResolved,baselineResolutionAt:s?.baselineResolutionAt??c.baselineResolutionAt,provisionalBaseline:s?.provisionalBaseline??c.provisionalBaseline,generationStartedByUserIntent:s?.generationStartedByUserIntent??c.generationStartedByUserIntent,generationUserIntentSource:s?.generationUserIntentSource||c.generationUserIntentSource,generationUserIntentDetail:s?.generationUserIntentDetail||c.generationUserIntentDetail,generationAction:s?.generationAction||c.generationAction,generationActionSource:s?.generationActionSource||c.generationActionSource,explicitGenerationAction:s?.explicitGenerationAction||c.explicitGenerationAction,lastUserIntentSource:s?.lastUserIntentSource||c.lastUserIntentSource,sessionGenerationTraceId:s?.sessionGenerationTraceId||l.sessionGenerationTraceId,sessionGenerationStartedAt:s?.sessionGenerationStartedAt??l.sessionGenerationStartedAt,sessionBaselineResolvedAtCreation:s?.sessionBaselineResolvedAtCreation??l.sessionBaselineResolvedAtCreation,sessionBaselineResolutionAtCreation:s?.sessionBaselineResolutionAtCreation??l.sessionBaselineResolutionAtCreation,sessionProvisionalBaselineAtCreation:s?.sessionProvisionalBaselineAtCreation??l.sessionProvisionalBaselineAtCreation,sessionGenerationStartedByUserIntent:s?.sessionGenerationStartedByUserIntent??l.sessionGenerationStartedByUserIntent,sessionGenerationUserIntentSource:s?.sessionGenerationUserIntentSource||l.sessionGenerationUserIntentSource,sessionGenerationUserIntentDetail:s?.sessionGenerationUserIntentDetail||l.sessionGenerationUserIntentDetail,sessionGenerationActionAtCreation:s?.sessionGenerationActionAtCreation||l.sessionGenerationActionAtCreation,sessionGenerationActionSourceAtCreation:s?.sessionGenerationActionSourceAtCreation||l.sessionGenerationActionSourceAtCreation,sessionExplicitGenerationActionAtCreation:s?.sessionExplicitGenerationActionAtCreation||l.sessionExplicitGenerationActionAtCreation,sessionNormalizedGenerationTypeAtCreation:s?.sessionNormalizedGenerationTypeAtCreation||l.sessionNormalizedGenerationTypeAtCreation,sessionRawGenerationTypeAtCreation:s?.sessionRawGenerationTypeAtCreation||l.sessionRawGenerationTypeAtCreation,sessionLastUserIntentSourceAtCreation:s?.sessionLastUserIntentSourceAtCreation||l.sessionLastUserIntentSourceAtCreation,sessionGenerationCapturedAt:s?.sessionGenerationCapturedAt??l.sessionGenerationCapturedAt,createdAt:a,updatedAt:a}}function rd(t=Date.now()){let{messageSessionWindowMs:e}=Ee();for(let[s,n]of S.messageSessions.entries()){let r=n?.completedAt||n?.handledAt||n?.updatedAt||n?.createdAt||0;r>0&&t-r>e&&S.messageSessions.delete(s)}}function ds(t,e,s={}){rd();let n=q(s?.messageId||at(e,t)),r=s?.chatId||$s(),o=String(s?.generationTraceId||m.gateState.lastGenerationTraceId||"").trim(),i=s?.sessionKey||so(r,n,t,o),a=S.messageSessions.get(i);return a?(t&&!a.receivedEvents.includes(t)&&a.receivedEvents.push(t),n&&!a.messageId&&(a.messageId=n,a.sourceMessageLocked=!0),s?.messageRole&&(a.messageRole=s.messageRole),s?.executionKey&&(a.executionKey=s.executionKey),s?.confirmedAssistantMessageId&&(a.confirmedAssistantMessageId=s.confirmedAssistantMessageId),s?.confirmationSource&&(a.confirmationSource=s.confirmationSource),s?.skipReasonDetailed&&(a.skipReasonDetailed=s.skipReasonDetailed),s?.eventBelongsToCurrentGeneration!==void 0&&(a.eventBelongsToCurrentGeneration=!!s.eventBelongsToCurrentGeneration),s?.historicalReplayBlocked!==void 0&&(a.historicalReplayBlocked=!!s.historicalReplayBlocked),s?.historicalReplayReason&&(a.historicalReplayReason=s.historicalReplayReason),s?.isSpeculativeSession!==void 0&&(a.isSpeculativeSession=!!s.isSpeculativeSession),s?.candidateToolIds&&(a.candidateToolIds=[...s.candidateToolIds]),me(a,{})):(a=nd(t,e,{...s,chatId:r,generationTraceId:o,sessionKey:i,messageId:n}),S.messageSessions.set(i,a),a)}function me(t,e={}){if(!t)return null;let s=Rt();return Object.assign(t,s,e,{updatedAt:Date.now()}),t}function od(t,e){return!t||!e||t.sessionKey===e||(S.messageSessions.delete(t.sessionKey),t.sessionKey=e,t.updatedAt=Date.now(),S.messageSessions.set(e,t)),t}function ge(t,e={}){if(!t)return null;let{historyRetentionLimit:s}=Ee(),n=Rt(),r={id:e?.id||us("session_hist"),at:e?.at||Date.now(),traceId:t.traceId,sessionKey:t.sessionKey,phase:e?.phase||t.phase,eventType:e?.eventType||t.firstEventType,messageId:e?.messageId||t.messageId,messageKey:e?.messageKey||t.messageKey,executionKey:e?.executionKey||t.executionKey||"",messageRole:e?.messageRole||t.messageRole,confirmedAssistantMessageId:e?.confirmedAssistantMessageId||t.confirmedAssistantMessageId||"",confirmationSource:e?.confirmationSource||t.confirmationSource||"",isSpeculativeSession:e?.isSpeculativeSession??t.isSpeculativeSession??!1,eventBelongsToCurrentGeneration:e?.eventBelongsToCurrentGeneration??t.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:e?.historicalReplayBlocked??t.historicalReplayBlocked??!1,historicalReplayReason:e?.historicalReplayReason||t.historicalReplayReason||"",generationTraceId:e?.generationTraceId||m.gateState.lastGenerationTraceId||"",generationStartedAt:e?.generationStartedAt||m.gateState.lastGenerationBaseline?.startedAt||0,generationDryRun:e?.generationDryRun??!!m.gateState.lastGenerationDryRun,baselineResolved:e?.baselineResolved??t.baselineResolved??n.baselineResolved,baselineResolutionAt:e?.baselineResolutionAt??t.baselineResolutionAt??n.baselineResolutionAt,provisionalBaseline:e?.provisionalBaseline??t.provisionalBaseline??n.provisionalBaseline,generationStartedByUserIntent:e?.generationStartedByUserIntent??t.generationStartedByUserIntent??n.generationStartedByUserIntent,generationUserIntentSource:e?.generationUserIntentSource||t.generationUserIntentSource||n.generationUserIntentSource,generationUserIntentDetail:e?.generationUserIntentDetail||t.generationUserIntentDetail||n.generationUserIntentDetail,generationAction:e?.generationAction||t.generationAction||n.generationAction,generationActionSource:e?.generationActionSource||t.generationActionSource||n.generationActionSource,explicitGenerationAction:e?.explicitGenerationAction||t.explicitGenerationAction||n.explicitGenerationAction,lastUserIntentSource:e?.lastUserIntentSource||t.lastUserIntentSource||n.lastUserIntentSource,sessionGenerationTraceId:e?.sessionGenerationTraceId||t.sessionGenerationTraceId||"",sessionGenerationStartedAt:e?.sessionGenerationStartedAt??t.sessionGenerationStartedAt??0,sessionBaselineResolvedAtCreation:e?.sessionBaselineResolvedAtCreation??t.sessionBaselineResolvedAtCreation??!1,sessionBaselineResolutionAtCreation:e?.sessionBaselineResolutionAtCreation??t.sessionBaselineResolutionAtCreation??0,sessionProvisionalBaselineAtCreation:e?.sessionProvisionalBaselineAtCreation??t.sessionProvisionalBaselineAtCreation??!1,sessionGenerationStartedByUserIntent:e?.sessionGenerationStartedByUserIntent??t.sessionGenerationStartedByUserIntent??!1,sessionGenerationUserIntentSource:e?.sessionGenerationUserIntentSource||t.sessionGenerationUserIntentSource||"",sessionGenerationUserIntentDetail:e?.sessionGenerationUserIntentDetail||t.sessionGenerationUserIntentDetail||"",sessionGenerationActionAtCreation:e?.sessionGenerationActionAtCreation||t.sessionGenerationActionAtCreation||"",sessionGenerationActionSourceAtCreation:e?.sessionGenerationActionSourceAtCreation||t.sessionGenerationActionSourceAtCreation||"",sessionExplicitGenerationActionAtCreation:e?.sessionExplicitGenerationActionAtCreation||t.sessionExplicitGenerationActionAtCreation||"",sessionNormalizedGenerationTypeAtCreation:e?.sessionNormalizedGenerationTypeAtCreation||t.sessionNormalizedGenerationTypeAtCreation||"",sessionRawGenerationTypeAtCreation:e?.sessionRawGenerationTypeAtCreation||t.sessionRawGenerationTypeAtCreation||"",sessionLastUserIntentSourceAtCreation:e?.sessionLastUserIntentSourceAtCreation||t.sessionLastUserIntentSourceAtCreation||"",sessionGenerationCapturedAt:e?.sessionGenerationCapturedAt??t.sessionGenerationCapturedAt??Date.now(),skipReason:e?.skipReason||t.skipReason||"",skipReasonDetailed:e?.skipReasonDetailed||t.skipReasonDetailed||"",candidateToolIds:Array.isArray(e?.candidateToolIds)?[...e.candidateToolIds]:[...t.candidateToolIds||[]],executionPathIds:Array.isArray(e?.executionPathIds)?[...e.executionPathIds]:[...t.executionPathIds||[]]};return S.recentSessionHistory=ks([...S.recentSessionHistory,r],s),r}function Kt(t,e={}){let s=Array.isArray(t)?t:[],{historyRetentionLimit:n}=Ee();s.forEach(r=>{r?.id&&_s(r.id,"trigger",e,{limit:n,emitEvent:!1})})}function id(t,e={}){if(!t)return;let{historyRetentionLimit:s}=Ee();_s(t,"writeback",e,{limit:s,emitEvent:!1})}function cs(t){if(!t||typeof t!="object")return t;let e=zi(t);return{...t,...e,receivedEvents:Array.isArray(t.receivedEvents)?[...t.receivedEvents]:void 0,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:void 0,executionPathIds:Array.isArray(t.executionPathIds)?[...t.executionPathIds]:void 0,driftReasons:Array.isArray(e.driftReasons)?[...e.driftReasons]:[]}}function Re(t){return String(t||"").trim()}function zi(t){if(!t||typeof t!="object")return{driftDetected:!1,generationTraceDrifted:!1,generationActionDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};if(!(t.sessionGenerationCapturedAt!==void 0||t.sessionGenerationTraceId!==void 0||t.sessionBaselineResolvedAtCreation!==void 0||t.sessionGenerationStartedByUserIntent!==void 0||t.sessionGenerationUserIntentSource!==void 0||t.sessionGenerationUserIntentDetail!==void 0))return{driftDetected:!1,generationTraceDrifted:!1,generationActionDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};let s=Re(t.sessionGenerationTraceId),n=Re(t.generationTraceId),r=Re(t.sessionGenerationUserIntentSource),o=Re(t.generationUserIntentSource),i=Re(t.sessionGenerationUserIntentDetail),a=Re(t.generationUserIntentDetail),c=Re(t.sessionGenerationActionAtCreation),l=Re(t.generationAction),u=Re(t.sessionGenerationActionSourceAtCreation),d=Re(t.generationActionSource),p=Re(t.sessionExplicitGenerationActionAtCreation),y=Re(t.explicitGenerationAction),v=Re(t.sessionNormalizedGenerationTypeAtCreation),x=Re(t.normalizedGenerationType),_=!!s&&!!n&&s!==n,T=(c||l?c!==l:!1)||(u||d?u!==d:!1)||(p||y?p!==y:!1)||(v||x?v!==x:!1),C=!!t.sessionGenerationStartedByUserIntent!=!!t.generationStartedByUserIntent||(r||o?r!==o:!1)||(i||a?i!==a:!1),W=!!t.sessionBaselineResolvedAtCreation!=!!t.baselineResolved,le=(Number(t.baselineResolutionAt)||0)>(Number(t.sessionBaselineResolutionAtCreation)||0),J=[];return _&&J.push("generation_trace_changed"),T&&J.push("generation_action_changed"),C&&J.push("generation_user_intent_changed"),W&&J.push("baseline_resolved_state_changed"),le&&J.push("baseline_resolution_advanced"),{driftDetected:J.length>0,generationTraceDrifted:_,generationActionDrifted:T,generationUserIntentDrifted:C,baselineResolvedStateChanged:W,baselineResolutionAdvancedSinceSessionCreation:le,driftReasons:J}}function Mi(t=[]){return(Array.isArray(t)?t:[]).reduce((e,s)=>{let n=Re(s?.phase)||"unknown";return e[n]=(e[n]||0)+1,e},{})}function Ci(t=[]){let e={entryCount:0,driftDetectedCount:0,generationTraceDriftCount:0,generationActionDriftCount:0,generationUserIntentDriftCount:0,baselineResolvedStateChangedCount:0,baselineResolutionAdvancedCount:0};for(let s of Array.isArray(t)?t:[]){let n=zi(s);e.entryCount+=1,n.driftDetected&&(e.driftDetectedCount+=1),n.generationTraceDrifted&&(e.generationTraceDriftCount+=1),n.generationActionDrifted&&(e.generationActionDriftCount+=1),n.generationUserIntentDrifted&&(e.generationUserIntentDriftCount+=1),n.baselineResolvedStateChanged&&(e.baselineResolvedStateChangedCount+=1),n.baselineResolutionAdvancedSinceSessionCreation&&(e.baselineResolutionAdvancedCount+=1)}return e}function Ki(){let t=Ms(),e=t.eventSource||ae.eventSource||null;return{source:t.source||ae.source||"",ready:qr(e),hasImportedScriptModule:!!ae.scriptModule,importError:ae.importError?.message||""}}function Hi(){let t=m.gateState.lastGenerationBaseline;return{lastUserSendIntentAt:m.gateState.lastUserSendIntentAt||0,lastUserIntentSource:m.gateState.lastUserIntentSource||"",lastUserMessageId:q(m.gateState.lastUserMessageId),lastUserMessageAt:m.gateState.lastUserMessageAt||0,lastGenerationTraceId:m.gateState.lastGenerationTraceId||"",lastGenerationType:m.gateState.lastGenerationType||"",lastGenerationDryRun:!!m.gateState.lastGenerationDryRun,lastGenerationAt:m.gateState.lastGenerationAt||0,isGenerating:!!m.gateState.isGenerating,uiTransitionGuardUntil:m.gateState.uiTransitionGuardUntil||0,lastUiTransitionAt:m.gateState.lastUiTransitionAt||0,lastUiTransitionSource:m.gateState.lastUiTransitionSource||"",baselineMessageCount:t?.messageCount||0,baselineAssistantId:t?.lastAssistantMessageId||"",...Rt()}}function ad(){let{historyRetentionLimit:t}=Ee();return Math.max(20,Math.min(200,Number(t||0)*4||40))}function ld(t={}){let e=Rt();return{id:t?.id||us("timeline"),at:Number(t?.at)||Date.now(),kind:t?.kind||"event",eventType:t?.eventType||"",traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",messageId:q(t?.messageId),executionKey:t?.executionKey||"",phase:t?.phase||"",reason:t?.reason||"",detail:t?.detail||"",confirmationSource:t?.confirmationSource||"",candidateToolIds:Array.isArray(t?.candidateToolIds)?[...t.candidateToolIds]:[],generationTraceId:t?.generationTraceId||m.gateState.lastGenerationTraceId||"",baselineResolved:t?.baselineResolved??e.baselineResolved,generationStartedByUserIntent:t?.generationStartedByUserIntent??e.generationStartedByUserIntent,generationUserIntentSource:t?.generationUserIntentSource||e.generationUserIntentSource,historicalReplayBlocked:t?.historicalReplayBlocked??!1}}function Ht(t={}){let e=ld(t);return S.recentEventTimeline=ks([...S.recentEventTimeline,e],ad()),e}function ji(t){return!t||typeof t!="object"?t:{...t,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:[]}}function Mn(t=!1,e=[],s=[]){return{flagged:!!t,reasons:[...new Set((Array.isArray(e)?e:[]).filter(Boolean))],relatedSessionKeys:[...new Set((Array.isArray(s)?s:[]).filter(Boolean))]}}function cd(t={}){let e=t?.summary||{},s=[...Array.isArray(t?.activeSessions)?t.activeSessions:[],...Array.isArray(t?.recentSessionHistory)?t.recentSessionHistory:[],t?.lastEventDebugSnapshot,t?.lastAutoTriggerSnapshot].filter(Boolean),n=[],r=[],o=[],i=[],a=[],c=[],l=[],u=[];for(let d of s){let p=String(d?.reason||d?.skipReason||"").trim(),y=String(d?.detail||d?.skipReasonDetailed||"").trim(),v=String(d?.sessionKey||"").trim(),x=String(d?.phase||d?.stage||"").trim(),_=String(d?.confirmationSource||"").trim(),T=String(d?.generationUserIntentSource||"").trim(),C=!!d?.generationStartedByUserIntent;(y==="missing_generation_baseline"||y==="generation_baseline_pending_resolution")&&(n.push(y),r.push(v)),(p===M.HISTORICAL_REPLAY_MESSAGE_RECEIVED||p===M.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION||d?.historicalReplayBlocked)&&(o.push(d?.historicalReplayReason||p||y||"historical_replay_signal_detected"),i.push(v)),p===M.IGNORED_AUTO_TRIGGER&&(C||T.startsWith("explicit_generation_action:"))&&(a.push(`ignored_auto_trigger_with_${T||"user_intent"}`),c.push(v)),e?.listenerSettings?.ignoreAutoTrigger&&!C&&!d?.isSpeculativeSession&&(x===N.COMPLETED||x===N.HANDLING||x===N.DISPATCHING||_==="generation_ended"||_==="message_received"||_==="generation_after_commands")&&(l.push("non_user_intent_generation_reached_execution_path"),u.push(v))}return{a10BaselineRaceSuspicious:Mn(n.length>0,n,r),a11ReplaySuspicious:Mn(o.length>0,o,i),a12UserIntentSuspicious:Mn(a.length>0,a,c),a13AutoTriggerLeakSuspicious:Mn(l.length>0,l,u)}}function dd(t,e=""){let s=Date.now();return S.lastDuplicateExecutionKey===(e||t)&&s-S.lastDuplicateMessageAt<vc?!1:(S.lastDuplicateMessageKey=t,S.lastDuplicateExecutionKey=e||t,S.lastDuplicateMessageAt=s,!0)}function no(t=Date.now()){for(let[e,s]of S.handledExecutionKeys.entries()){let n=Number(s?.at)||0;(n<=0||t-n>Tc)&&S.handledExecutionKeys.delete(e)}}function ud(t,e=Date.now()){let s=String(t||"").trim();return s?(no(e),S.handledExecutionKeys.has(s)):!1}function pd(t,e={}){let s=String(t||"").trim();if(!s)return null;let n={executionKey:s,at:Number(e?.at)||Date.now(),messageKey:String(e?.messageKey||"").trim(),messageId:q(e?.messageId),generationTraceId:String(e?.generationTraceId||"").trim(),eventType:String(e?.eventType||"").trim(),sessionKey:String(e?.sessionKey||"").trim()};return S.handledExecutionKeys.set(s,n),no(n.at),n}function Fi(t=8){return no(),ks(Array.from(S.handledExecutionKeys.values()).sort((e,s)=>(Number(e?.at)||0)-(Number(s?.at)||0)),t).map(e=>({...e}))}function mt(t,e,s={}){let n=q(s?.messageId||at(e,t)),r=ds(t,e,{eventType:t,messageId:n,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",skipReasonDetailed:s?.skipReasonDetailed||"speculative_session_only",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),o=s?.reason||M.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,i=s?.skipReasonDetailed||"speculative_session_only";return G("info","\u8BB0\u5F55 speculative session\uFF0C\u672A\u8FDB\u5165\u6267\u884C\u8C03\u5EA6",{eventType:t,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:n,reason:o,detail:i}),Te({stage:"speculative_observed",eventType:t,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:n,reason:o,skipReasonDetailed:i,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",isSpeculativeSession:!0,eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",handledAt:Date.now()}),me(r,{phase:N.IGNORED,skipReason:o,skipReasonDetailed:i,confirmationSource:s?.confirmationSource||"none",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0,completedAt:Date.now()}),ge(r,{phase:N.IGNORED,eventType:t,messageId:n,skipReason:o,skipReasonDetailed:i,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),r}function ki(t,e,s=0,n={}){let r=q(n?.confirmedAssistantMessageId||n?.messageId||at(e,t));if(!r)return mt(t,e,{...n,reason:n?.reason||M.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:n?.skipReasonDetailed||"missing_confirmed_message_identity",confirmationSource:n?.confirmationSource||"none"});let o=typeof e=="object"&&e?{...e,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||e?.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??e?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??e?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||e?.historicalReplayReason||""}:{messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||""},i=ds(t,o,{...n,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1}),a=Number.isFinite(s)?Math.max(0,s):Ee().debounceMs,c=i?.sessionKey||`message::${r}`,l=S.pendingMessageTimers.get(c);l&&clearTimeout(l),me(i,{phase:N.SCHEDULED,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1,scheduledAt:Date.now()}),ge(i,{phase:N.SCHEDULED,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1}),Te({stage:"scheduled",eventType:t,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:a}),G("info","\u5DF2\u8C03\u5EA6\u786E\u8BA4\u540E\u7684\u81EA\u52A8\u89E6\u53D1",{eventType:t,messageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",delayMs:a});let u=setTimeout(async()=>{S.pendingMessageTimers.delete(c),me(i,{phase:N.DISPATCHING,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmedAssistantMessageId:r,isSpeculativeSession:!1}),ge(i,{phase:N.DISPATCHING,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1}),Te({stage:"dispatching",eventType:t,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:a}),await Wi(t,o)},a);return S.pendingMessageTimers.set(c,u),i}function Dn(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}function Yi(t,e){return e?.triggerEvent==="MANUAL"?t.output?.mode===At.POST_RESPONSE_API?jt.MANUAL_POST_RESPONSE_API:jt.MANUAL_COMPATIBILITY:jt.AUTO_POST_RESPONSE_API}async function Wi(t,e){U(`${t}\u89E6\u53D1:`,e);let s=typeof e=="object"&&e?String(e?.confirmationSource||"").trim():"";G("info","\u5F00\u59CB\u5904\u7406\u81EA\u52A8\u89E6\u53D1",{eventType:t,incomingMessageId:at(e,t),confirmationSource:s});let n=fd(I.GENERATION_ENDED),r=n.map(T=>T.id),o=qc(),i=at(e,t),a=!!(typeof e=="object"&&e&&e?.eventBelongsToCurrentGeneration),c=!!(typeof e=="object"&&e&&e?.historicalReplayBlocked),l=typeof e=="object"&&e?String(e?.historicalReplayReason||"").trim():"",u=q((typeof e=="object"&&e?e?.confirmedAssistantMessageId:"")||i),d=ds(t,e,{eventType:t,messageId:i,confirmedAssistantMessageId:u,confirmationSource:s,eventBelongsToCurrentGeneration:a,historicalReplayBlocked:c,historicalReplayReason:l,candidateToolIds:r});if(me(d,{phase:N.HANDLING,handledAt:Date.now(),confirmedAssistantMessageId:u,confirmationSource:s,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:a,historicalReplayBlocked:c,historicalReplayReason:l,candidateToolIds:r}),ge(d,{phase:N.HANDLING,eventType:t,messageId:i,confirmedAssistantMessageId:u,confirmationSource:s,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:a,historicalReplayBlocked:c,historicalReplayReason:l,candidateToolIds:r}),Te({stage:"handling",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,confirmedAssistantMessageId:u,confirmationSource:s,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:a,historicalReplayBlocked:c,historicalReplayReason:l,candidateToolIds:r,handledAt:Date.now()}),Qr()&&!Xr()){G("warn","\u5F53\u524D\u5904\u4E8E\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B\u7A97\u53E3\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u5FFD\u7565",{eventType:t,candidateToolIds:r,uiTransitionGuardUntil:m.gateState.uiTransitionGuardUntil,lastUiTransitionSource:m.gateState.lastUiTransitionSource||""}),wt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,selectedToolIds:r,skipReason:M.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,lockedAiMessageId:i||""}),ls(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:M.UNRELATED_UI_EVENT,lastExecutionPath:"",lastWritebackStatus:te.NOT_APPLICABLE,lastFailureStage:""}),Te({stage:"ignored_ui_transition_guard",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,reason:M.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),me(d,{phase:N.IGNORED,skipReason:M.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),ge(d,{phase:N.IGNORED,eventType:t,messageId:i,skipReason:M.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Kt(n,{traceId:d?.traceId||"",eventType:t,messageId:i,messageKey:"",skipReason:M.UNRELATED_UI_EVENT,executionPath:"",writebackStatus:te.NOT_APPLICABLE,failureStage:""});return}if(m.gateState.lastGenerationDryRun){G("warn","\u5F53\u524D generation \u4E3A dryRun\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u963B\u65AD",{eventType:t,candidateToolIds:r,generationTraceId:m.gateState.lastGenerationTraceId||""}),wt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,selectedToolIds:r,skipReason:M.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,lockedAiMessageId:i||""}),ls(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:M.DRY_RUN_GENERATION,lastExecutionPath:"",lastWritebackStatus:te.NOT_APPLICABLE,lastFailureStage:""}),Te({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,reason:M.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),me(d,{phase:N.SKIPPED,skipReason:M.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),ge(d,{phase:N.SKIPPED,eventType:t,messageId:i,skipReason:M.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Kt(n,{traceId:d?.traceId||"",eventType:t,messageId:i,messageKey:"",skipReason:M.DRY_RUN_GENERATION,executionPath:"",writebackStatus:te.NOT_APPLICABLE,failureStage:""});return}if(o.skip){G("warn","\u6839\u636E\u76D1\u542C\u5668\u8BBE\u7F6E\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,reason:o.reason,listenerSettings:o.listenerSettings,candidateToolIds:r}),wt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,selectedToolIds:r,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,lockedAiMessageId:i||""}),ls(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:o.reason,lastExecutionPath:"",lastWritebackStatus:te.NOT_APPLICABLE,lastFailureStage:""}),Te({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,reason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),me(d,{phase:N.SKIPPED,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),ge(d,{phase:N.SKIPPED,eventType:t,messageId:i,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Kt(n,{traceId:d?.traceId||"",eventType:t,messageId:i,messageKey:"",skipReason:o.reason,executionPath:"",writebackStatus:te.NOT_APPLICABLE,failureStage:""});return}if(o.listenerSettings.ignoreQuietGeneration&&Rc(m.gateState.lastGenerationType,m.gateState.lastGenerationParams,m.gateState.lastGenerationDryRun)){U("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C"),G("warn","\u68C0\u6D4B\u5230 quiet/dryRun\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,candidateToolIds:r}),wt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",selectedToolIds:r,skipReason:M.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s}),ls(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:M.QUIET_GENERATION,lastExecutionPath:"",lastWritebackStatus:te.NOT_APPLICABLE,lastFailureStage:""}),Te({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:i,reason:M.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),me(d,{phase:N.SKIPPED,skipReason:M.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),ge(d,{phase:N.SKIPPED,eventType:t,messageId:i,skipReason:M.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Kt(n,{traceId:d?.traceId||"",eventType:t,messageId:i,messageKey:"",skipReason:M.QUIET_GENERATION,executionPath:"",writebackStatus:te.NOT_APPLICABLE,failureStage:""});return}let p=await ro({...typeof e=="object"&&e?e:{},triggerEvent:t,...i?{messageId:i}:{},...u?{confirmedAssistantMessageId:u}:{},...s?{confirmationSource:s}:{},traceId:d?.traceId||"",sessionKey:d?.sessionKey||""});p.traceId=d?.traceId||p.traceId||us("exec"),p.sessionKey=d?.sessionKey||p.sessionKey||"";let y=p?.executionKey||Bi(p||{});p.executionKey=y;let v=so(p.chatId,p.messageId,t,p.generationTraceId);if(od(d,v),me(d,{messageId:p.messageId||i,messageKey:Dn(p),executionKey:y,confirmedAssistantMessageId:p.confirmedAssistantMessageId||u,confirmationSource:p.confirmationSource||s,sourceMessageLocked:!!p.messageId}),!p?.lastAiMessage){U(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`),G("warn","\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D\uFF0C\u81EA\u52A8\u89E6\u53D1\u4E2D\u6B62",{eventType:t,preferredMessageId:i,candidateToolIds:r});let T=Dn(p||{});wt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:T,executionKey:y,selectedToolIds:r,skipReason:M.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),ls(n,{lastTriggerEvent:t,lastMessageKey:T,lastExecutionKey:y,lastSkipReason:M.MISSING_AI_MESSAGE,lastExecutionPath:"",lastWritebackStatus:te.NOT_APPLICABLE,lastFailureStage:""}),Te({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||i,messageKey:T,executionKey:y,reason:M.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r,handledAt:Date.now()}),me(d,{phase:N.SKIPPED,skipReason:M.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",messageKey:T,executionKey:y,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:r}),ge(d,{phase:N.SKIPPED,eventType:t,messageId:p?.messageId||i,messageKey:T,executionKey:y,skipReason:M.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r}),Kt(n,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||i,messageKey:T,skipReason:M.MISSING_AI_MESSAGE,executionPath:"",writebackStatus:te.NOT_APPLICABLE,failureStage:""});return}let x=Dn(p);if(ud(y)){dd(x,y)&&(U(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${x}`),G("warn","\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD\uFF0C\u8DF3\u8FC7\u6267\u884C",{eventType:t,messageKey:x,executionKey:y,candidateToolIds:r}),wt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:x,executionKey:y,selectedToolIds:r,skipReason:M.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),ls(n,{lastTriggerEvent:t,lastMessageKey:x,lastExecutionKey:y,lastSkipReason:M.DUPLICATE_MESSAGE,lastExecutionPath:"",lastWritebackStatus:te.NOT_APPLICABLE,lastFailureStage:""}),Te({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||i,messageKey:x,executionKey:y,reason:M.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r,handledAt:Date.now()}),me(d,{phase:N.SKIPPED,skipReason:M.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",messageKey:x,executionKey:y,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:r}),ge(d,{phase:N.SKIPPED,eventType:t,messageId:p?.messageId||i,messageKey:x,executionKey:y,skipReason:M.DUPLICATE_MESSAGE,skipReasonDetailed:"execution_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r}),Kt(n,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||i,messageKey:x,skipReason:M.DUPLICATE_MESSAGE,executionPath:"",writebackStatus:te.NOT_APPLICABLE,failureStage:""}));return}let _=n;if(_.length===0){U("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177"),G("warn","\u5F53\u524D\u4E8B\u4EF6\u672A\u547D\u4E2D\u4EFB\u4F55\u53EF\u6267\u884C\u5DE5\u5177",{eventType:t,messageKey:x,candidateToolIds:r}),wt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:x,selectedToolIds:[],skipReason:M.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),Te({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||i,messageKey:x,reason:M.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:[],handledAt:Date.now()}),me(d,{phase:N.SKIPPED,skipReason:M.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",messageKey:x,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:[]}),ge(d,{phase:N.SKIPPED,eventType:t,messageId:p?.messageId||i,messageKey:x,skipReason:M.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:[]});return}S.lastHandledMessageKey=x,S.lastHandledExecutionKey=y,pd(y,{messageKey:x,messageId:p?.messageId||i,generationTraceId:p?.generationTraceId||"",eventType:t,sessionKey:d?.sessionKey||""}),S.lastDuplicateMessageKey="",S.lastDuplicateExecutionKey="",S.lastDuplicateMessageAt=0,p.messageKey=x,wt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:x,executionKey:y,selectedToolIds:_.map(T=>T.id),skipReason:"",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),U(`\u9700\u8981\u6267\u884C ${_.length} \u4E2A\u5DE5\u5177:`,_.map(T=>T.id)),G("info","\u81EA\u52A8\u89E6\u53D1\u547D\u4E2D\u5DE5\u5177",{eventType:t,messageKey:x,executionKey:y,toolIds:_.map(T=>T.id)}),Ze("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${_.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"}),me(d,{messageKey:x,executionKey:y,candidateToolIds:_.map(T=>T.id),executionPathIds:[],confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,phase:N.DISPATCHING}),ge(d,{phase:N.DISPATCHING,eventType:t,messageId:p?.messageId||i,messageKey:x,executionKey:y,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:_.map(T=>T.id)}),Kt(_,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||i,messageKey:x,executionKey:y,skipReason:"",executionPath:jt.AUTO_POST_RESPONSE_API,writebackStatus:"",failureStage:""});for(let T of _)try{let C=await qi(T,p),W=Yi(T,p);d.executionPathIds.includes(W)||d.executionPathIds.push(W),id(T.id,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||i,messageKey:x,executionKey:y,executionPath:W,writebackStatus:C?.result?.meta?.writebackStatus||C?.meta?.writebackStatus||te.NOT_APPLICABLE,failureStage:C?.result?.meta?.failureStage||C?.meta?.failureStage||"",contentCommitted:!!(C?.result?.meta?.writebackDetails?.contentCommitted||C?.meta?.writebackDetails?.contentCommitted),hostCommitApplied:!!(C?.result?.meta?.writebackDetails?.hostCommitApplied||C?.meta?.writebackDetails?.hostCommitApplied),refreshRequested:!!(C?.result?.meta?.writebackDetails?.refreshRequested||C?.meta?.writebackDetails?.refreshRequested),refreshConfirmed:!!(C?.result?.meta?.writebackDetails?.refreshConfirmed||C?.meta?.writebackDetails?.refreshConfirmed),preferredCommitMethod:C?.result?.meta?.writebackDetails?.commit?.preferredMethod||C?.meta?.writebackDetails?.commit?.preferredMethod||"",appliedCommitMethod:C?.result?.meta?.writebackDetails?.commit?.appliedMethod||C?.meta?.writebackDetails?.commit?.appliedMethod||"",refreshMethodCount:(C?.result?.meta?.writebackDetails?.refresh?.requestMethods||C?.meta?.writebackDetails?.refresh?.requestMethods||[]).length,refreshConfirmChecks:C?.result?.meta?.writebackDetails?.refresh?.confirmChecks||C?.meta?.writebackDetails?.refresh?.confirmChecks||0,success:!!C?.success}),C.success?(U(`\u5DE5\u5177 ${T.id} \u6267\u884C\u6210\u529F`),P.emit(D.TOOL_EXECUTED,{toolId:T.id,result:C.result||C.data||C})):U(`\u5DE5\u5177 ${T.id} \u6267\u884C\u5931\u8D25:`,C.error)}catch(C){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${T.id}`,C)}S.lastExecutionContext=p,Te({stage:"completed",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||i,messageKey:x,executionKey:y,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:_.map(T=>T.id),handledAt:Date.now()}),me(d,{phase:N.COMPLETED,messageKey:x,executionKey:y,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:_.map(T=>T.id)}),ge(d,{phase:N.COMPLETED,eventType:t,messageId:p?.messageId||i,messageKey:x,executionKey:y,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:_.map(T=>T.id),executionPathIds:[...d.executionPathIds||[]]})}async function yd(t,e,s){return s||t.output?.mode===At.POST_RESPONSE_API?is.runToolPostResponse(t,e):(await Wc()).executeToolWithConfig(t.id,e)}function Vi(){if(S.initialized){U("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}gd(),S.initialized=!0,U("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),P.emit(D.TOOL_TRIGGER_INITIALIZED)}function gd(){let t=it(I.GENERATION_ENDED,async n=>{let r=at(n,I.GENERATION_ENDED),o=m.gateState.lastGenerationTraceId||"",i=ds(I.GENERATION_ENDED,n,{eventType:I.GENERATION_ENDED,messageId:r});Te({stage:"received",eventType:I.GENERATION_ENDED,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:r,receivedAt:Date.now()}),ge(i,{phase:N.RECEIVED,eventType:I.GENERATION_ENDED,messageId:r});let a=await jr({traceId:o,retries:6,retryDelayMs:80}),c=wi(a);if(!c.eligible){mt(I.GENERATION_ENDED,n,{messageId:r,reason:c.reason,skipReasonDetailed:c.detail,confirmationSource:"none"});return}let l=await kn(r,{retries:r?3:8,retryDelayMs:r?120:260}),u=q(l?.sourceId);if(!u){mt(I.GENERATION_ENDED,n,{messageId:r,reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"missing_new_assistant_message_after_generation",confirmationSource:"none",eventBelongsToCurrentGeneration:!!a,historicalReplayBlocked:!1,historicalReplayReason:""});return}await Wi(I.GENERATION_ENDED,{...typeof n=="object"&&n?n:{},messageId:u,confirmedAssistantMessageId:u,confirmationSource:"generation_ended",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})}),e=it(I.GENERATION_AFTER_COMMANDS,async n=>{let r=at(n,I.GENERATION_AFTER_COMMANDS),o=m.gateState.lastGenerationTraceId||"",{debounceMs:i}=Ee(),a=ds(I.GENERATION_AFTER_COMMANDS,n,{eventType:I.GENERATION_AFTER_COMMANDS,messageId:r});if(Te({stage:"received",eventType:I.GENERATION_AFTER_COMMANDS,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:r,receivedAt:Date.now(),scheduledDelayMs:i}),ge(a,{phase:N.RECEIVED,eventType:I.GENERATION_AFTER_COMMANDS,messageId:r}),!Ee().useGenerationAfterCommandsFallback){me(a,{phase:N.IGNORED,skipReason:"generation_after_commands_fallback_disabled",completedAt:Date.now()}),ge(a,{phase:N.IGNORED,eventType:I.GENERATION_AFTER_COMMANDS,messageId:r,skipReason:"generation_after_commands_fallback_disabled"});return}let c=await jr({traceId:o,retries:6,retryDelayMs:80}),l=wi(c);if(!r){mt(I.GENERATION_AFTER_COMMANDS,n,{reason:M.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:l.eligible?"generation_after_commands_without_message_identity":l.detail,confirmationSource:"none"});return}if(!l.eligible){mt(I.GENERATION_AFTER_COMMANDS,n,{messageId:r,reason:l.reason,skipReasonDetailed:l.detail,confirmationSource:"none"});return}let u=await kn(r,{retries:2,retryDelayMs:120}),d=q(u?.sourceId);if(!d){mt(I.GENERATION_AFTER_COMMANDS,n,{messageId:r,reason:M.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:"generation_after_commands_message_not_confirmed",confirmationSource:"none",eventBelongsToCurrentGeneration:!!c,historicalReplayBlocked:!1,historicalReplayReason:""});return}ki(I.GENERATION_AFTER_COMMANDS,n,i,{messageId:r,confirmedAssistantMessageId:d,confirmationSource:"generation_after_commands",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})}),s=it(I.MESSAGE_RECEIVED,async n=>{let r=at(n,I.MESSAGE_RECEIVED),o=r?await Oc(r,{retries:3,retryDelayMs:120}):null,i=o?.message||null,a=i?Un(i):"",c=o?q(Gn(i,o.index)):"",l=r||c,{debounceMs:u}=Ee(),d=ds(I.MESSAGE_RECEIVED,n,{eventType:I.MESSAGE_RECEIVED,messageId:l,messageRole:a});if(!r){G("info","MESSAGE_RECEIVED \u7F3A\u5C11\u6D88\u606F\u8EAB\u4EFD\uFF0C\u5224\u5B9A\u4E3A\u5BBF\u4E3B UI \u5E72\u6270\u4E8B\u4EF6\uFF0C\u8DF3\u8FC7",{rawEventData:n??null}),Te({stage:"ignored_ui_side_effect",eventType:I.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:"",messageRole:a,reason:M.UNRELATED_UI_EVENT,handledAt:Date.now()}),me(d,{phase:N.IGNORED,skipReason:M.UNRELATED_UI_EVENT,completedAt:Date.now(),messageRole:a}),ge(d,{phase:N.IGNORED,eventType:I.MESSAGE_RECEIVED,messageId:"",messageRole:a,skipReason:M.UNRELATED_UI_EVENT});return}if(Te({stage:"received",eventType:I.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:l,messageRole:a,receivedAt:Date.now(),scheduledDelayMs:u}),ge(d,{phase:N.RECEIVED,eventType:I.MESSAGE_RECEIVED,messageId:l,messageRole:a}),!Ee().useMessageReceivedFallback){me(d,{phase:N.IGNORED,skipReason:"message_received_fallback_disabled",completedAt:Date.now(),messageRole:a}),ge(d,{phase:N.IGNORED,eventType:I.MESSAGE_RECEIVED,messageId:l,messageRole:a,skipReason:"message_received_fallback_disabled"});return}if(!o){mt(I.MESSAGE_RECEIVED,n,{messageId:r,reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_identity_not_resolved",confirmationSource:"none"});return}if(i&&a!=="assistant"){G("info","MESSAGE_RECEIVED \u547D\u4E2D\u975E AI \u6D88\u606F\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1\u8C03\u5EA6",{messageId:l,messageRole:a}),Te({stage:"ignored_non_assistant",eventType:I.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:l,messageRole:a,reason:M.NON_ASSISTANT_MESSAGE,handledAt:Date.now()}),me(d,{phase:N.IGNORED,skipReason:M.NON_ASSISTANT_MESSAGE,completedAt:Date.now(),messageRole:a}),ge(d,{phase:N.IGNORED,eventType:I.MESSAGE_RECEIVED,messageId:l,messageRole:a,skipReason:M.NON_ASSISTANT_MESSAGE});return}let p=await jc(o,{traceId:m.gateState.lastGenerationTraceId||""});if(!p.allowed){mt(I.MESSAGE_RECEIVED,n,{messageId:l,reason:p.reason,skipReasonDetailed:p.detail,confirmationSource:"none",eventBelongsToCurrentGeneration:p.eventBelongsToCurrentGeneration,historicalReplayBlocked:p.historicalReplayBlocked,historicalReplayReason:p.historicalReplayReason});return}let y=await kn(l,{retries:3,retryDelayMs:120}),v=q(y?.sourceId);if(!v){mt(I.MESSAGE_RECEIVED,n,{messageId:l,reason:M.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_not_confirmed_as_new_assistant",confirmationSource:"none",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""});return}ki(I.MESSAGE_RECEIVED,n,u,{messageId:l,confirmedAssistantMessageId:v,confirmationSource:"message_received",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})});S.listeners.set(I.GENERATION_ENDED,t),S.listeners.set(I.GENERATION_AFTER_COMMANDS,e),S.listeners.set(I.MESSAGE_RECEIVED,s)}async function ro(t){let e=await to(),s=lt(),n=s?.getContext?.()||null,r=t?.triggerEvent||"GENERATION_ENDED",o=q(t?.confirmedAssistantMessageId||at(t,r)),i=String(t?.confirmationSource||"").trim(),a=r==="MANUAL"||r==="MANUAL_PREVIEW",c=null,l=q(o);a||(c=await kn(l,{retries:l?3:8,retryDelayMs:l?120:260}),c&&(l=q(c.sourceId)));let u=Nc(r,t,l)||!!l,d=await Ac({preferredMessageId:l||null,retries:a||l?2:0,retryDelayMs:120,lockToMessageId:u}),p=d.messages||[],y=d.lastUserMessage,v=d.lastAiMessage;a||(c?q(v?.sourceId)!==l&&(v=c):v=null);let x=l||q(v?.sourceId)||"",_=m.gateState.lastGenerationTraceId||"",T=Ni(v?.content||"");return{triggeredAt:Date.now(),triggerEvent:r,traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",confirmationSource:i,confirmedAssistantMessageId:x,chatId:Cs(s,n,e),messageId:x,generationTraceId:_,rawGenerationType:m.gateState.lastGenerationBaseline?.rawGenerationType||m.gateState.lastGenerationType||"",rawGenerationParams:m.gateState.lastGenerationBaseline?.rawGenerationParams??m.gateState.lastGenerationParams??null,normalizedGenerationType:m.gateState.lastGenerationBaseline?.normalizedGenerationType||m.gateState.lastNormalizedGenerationType||"",generationAction:m.gateState.lastGenerationBaseline?.generationAction||m.gateState.lastGenerationAction||"",generationActionSource:m.gateState.lastGenerationBaseline?.generationActionSource||m.gateState.lastGenerationActionSource||"",lastAiMessage:v?.content||"",assistantContentFingerprint:T,userMessage:y?.content||m.gateState.lastUserMessageText||"",chatMessages:p,input:{userMessage:y?.content||m.gateState.lastUserMessageText||"",lastAiMessage:v?.content||"",extractedContent:"",previousToolOutput:"",context:{character:e?.name||"",chatLength:p.length||0}},config:{},status:"pending",executionKey:Bi({chatId:Cs(s,n,e),messageId:x,generationTraceId:_,assistantContentFingerprint:T,lastAiMessage:v?.content||""})}}function fd(t){return ns().filter(s=>{let n=s?.trigger?.enabled&&s?.trigger?.event===t,r=Array.isArray(s?.triggerEvents)&&s.triggerEvents.includes(t);return(n||r)&&is.shouldRunPostResponse(s)})}function Cn(t,e){try{Pr(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function qi(t,e){let s=Date.now(),n=t.id,r=e?.triggerEvent==="MANUAL",o=`yyt-tool-run-${n}`,i=Yi(t,e),a=e?.messageKey||Dn(e||{}),c=e?.executionKey||"";Cn(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:a,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:"",lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0}),P.emit(D.TOOL_EXECUTION_REQUESTED,{toolId:n,traceId:e?.traceId||"",triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),Ze("info",`${r?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:o}),G("info","\u5F00\u59CB\u6267\u884C\u5DE5\u5177",{toolId:n,toolName:t.name,triggerEvent:e?.triggerEvent,executionPath:i,messageKey:a});try{let l=await yd(t,e,r),u=Date.now()-s;if(l?.success){let v=ce(n),x=l?.meta?.writebackDetails||{};Cn(n,{lastStatus:"success",lastError:"",lastDurationMs:u,lastTraceId:e?.traceId||"",successCount:(v?.runtime?.successCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:a,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:l?.meta?.writebackStatus||te.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||"",lastContentCommitted:!!x.contentCommitted,lastHostCommitApplied:!!x.hostCommitApplied,lastRefreshRequested:!!x.refreshRequested,lastRefreshConfirmed:!!x.refreshConfirmed,lastPreferredCommitMethod:x?.commit?.preferredMethod||"",lastAppliedCommitMethod:x?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(x?.refresh?.requestMethods)?x.refresh.requestMethods.length:0,lastRefreshConfirmChecks:Number(x?.refresh?.confirmChecks)||0});let _=r?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return b("success",_),Ze("success",_,{duration:3200,noticeId:o}),G("info","\u5DE5\u5177\u6267\u884C\u6210\u529F",{toolId:n,traceId:e?.traceId||"",executionPath:i,duration:u,writebackStatus:l?.meta?.writebackStatus||te.NOT_APPLICABLE}),{success:!0,duration:u,result:l}}let d=ce(n),p=l?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",y=l?.meta?.writebackDetails||{};return Cn(n,{lastStatus:"error",lastError:p,lastDurationMs:u,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:a,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:l?.meta?.writebackStatus||te.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||(i===jt.MANUAL_COMPATIBILITY?We.COMPATIBILITY_EXECUTE:We.UNKNOWN),lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0}),b("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`),Ze("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`,{sticky:!0,noticeId:o}),G("error","\u5DE5\u5177\u6267\u884C\u5931\u8D25",{toolId:n,traceId:e?.traceId||"",executionPath:i,duration:u,error:p,failureStage:l?.meta?.failureStage||""}),{success:!1,duration:u,error:p,result:l}}catch(l){let u=Date.now()-s,d=ce(n),p=l?.message||String(l);throw Cn(n,{lastStatus:"error",lastError:p,lastDurationMs:u,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||I.GENERATION_ENDED,lastMessageKey:a,lastExecutionKey:c,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:te.NOT_APPLICABLE,lastFailureStage:i===jt.MANUAL_COMPATIBILITY?We.COMPATIBILITY_EXECUTE:We.UNKNOWN,lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0}),b("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`),Ze("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`,{sticky:!0,noticeId:o}),G("error","\u5DE5\u5177\u6267\u884C\u629B\u51FA\u5F02\u5E38",{toolId:n,traceId:e?.traceId||"",executionPath:i,duration:u,error:p}),l}}async function oo(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ce(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return ss(t,{lastTriggerAt:Date.now(),lastTriggerEvent:"MANUAL",lastMessageKey:"",lastExecutionKey:"",lastSkipReason:M.TOOL_DISABLED,lastExecutionPath:"",lastWritebackStatus:te.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshConfirmChecks:0},{touchLastRunAt:!1,emitEvent:!1}),Ze("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await ro({triggerEvent:"MANUAL"});return G("info","\u624B\u52A8\u6267\u884C\u5DE5\u5177",{toolId:t}),qi(e,s)}async function io(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ce(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await ro({triggerEvent:"MANUAL_PREVIEW"});return is.previewExtraction(e,s)}function md(){for(let t of S.pendingMessageTimers.values())clearTimeout(t);S.pendingMessageTimers.clear();for(let t of S.listeners.values())typeof t=="function"&&t();S.listeners.clear(),S.messageSessions.clear(),S.handledExecutionKeys.clear(),S.recentSessionHistory=[],S.recentEventTimeline=[],S.initialized=!1,S.lastExecutionContext=null,S.lastHandledMessageKey="",S.lastHandledExecutionKey="",S.lastAutoTriggerSnapshot=null,S.lastEventDebugSnapshot=null,S.lastDuplicateMessageKey="",S.lastDuplicateExecutionKey="",S.lastDuplicateMessageAt=0,U("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function hd(){let t=Fi(8),e=Array.from(S.messageSessions.values()).map(cs).filter(Boolean).sort((r,o)=>(Number(r?.updatedAt)||0)-(Number(o?.updatedAt)||0)),s=[...S.recentSessionHistory].map(cs).filter(Boolean),n=[...S.recentEventTimeline].map(ji).filter(Boolean);return{initialized:S.initialized,listenersCount:S.listeners.size,activeSessionCount:S.messageSessions.size,activeSessions:e,recentSessionHistory:s,recentEventTimeline:n,lastExecutionContext:S.lastExecutionContext,lastAutoTriggerSnapshot:S.lastAutoTriggerSnapshot,lastEventDebugSnapshot:S.lastEventDebugSnapshot,registeredEvents:Array.from(S.listeners.keys()),pendingTimerCount:S.pendingMessageTimers.size,lastHandledMessageKey:S.lastHandledMessageKey,lastHandledExecutionKey:S.lastHandledExecutionKey,lastDuplicateExecutionKey:S.lastDuplicateExecutionKey,handledExecutionKeyCount:S.handledExecutionKeys.size,recentHandledExecutionKeys:t,listenerSettings:Ee(),eventBridge:Ki(),gateState:Hi()}}function Gs(t={}){let e=parseInt(t?.historyLimit,10),s=Number.isFinite(e)?Math.max(1,Math.min(50,e)):8,n=Fi(s),r=m.gateState.lastGenerationBaseline,o=Array.from(S.messageSessions.values()).map(cs).filter(Boolean).sort((d,p)=>(Number(d?.updatedAt)||0)-(Number(p?.updatedAt)||0)),i=ks([...S.recentSessionHistory],s).map(cs),a=ks([...S.recentEventTimeline],Math.max(s*3,s)).map(ji),c={activeSessions:Mi(o),recentSessionHistory:Mi(i)},l={activeSessions:Ci(o),recentSessionHistory:Ci(i)},u=cd({summary:{listenerSettings:Ee()},activeSessions:o,recentSessionHistory:i,lastEventDebugSnapshot:S.lastEventDebugSnapshot,lastAutoTriggerSnapshot:S.lastAutoTriggerSnapshot});return{summary:{generationTraceId:m.gateState.lastGenerationTraceId||"",generationType:m.gateState.lastGenerationType||"",generationDryRun:!!m.gateState.lastGenerationDryRun,generationStartedAt:r?.startedAt||0,generationEndedAt:m.gateState.lastGenerationAt||0,isGenerating:!!m.gateState.isGenerating,baselineMessageCount:r?.messageCount||0,baselineAssistantId:r?.lastAssistantMessageId||"",uiTransitionGuardActive:Qr(),uiTransitionGuardUntil:m.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:m.gateState.lastUiTransitionSource||"",activeSessionCount:S.messageSessions.size,pendingTimerCount:S.pendingMessageTimers.size,lastHandledMessageKey:S.lastHandledMessageKey||"",lastHandledExecutionKey:S.lastHandledExecutionKey||"",lastDuplicateMessageKey:S.lastDuplicateMessageKey||"",lastDuplicateExecutionKey:S.lastDuplicateExecutionKey||"",handledExecutionKeyCount:S.handledExecutionKeys.size,recentHandledExecutionKeys:n,registeredEvents:Array.from(S.listeners.keys()),listenerSettings:Ee(),eventBridge:Ki(),gateState:Hi(),phaseCounts:c,consistency:l,verdictHints:u,...Rt()},activeSessions:o,recentSessionHistory:i,recentEventTimeline:a,recentHandledExecutionKeys:n,verdictHints:u,lastEventDebugSnapshot:cs(S.lastEventDebugSnapshot),lastAutoTriggerSnapshot:cs(S.lastAutoTriggerSnapshot)}}function Bn(t={}){let e=Gs(t);return JSON.parse(JSON.stringify({exportedAt:Date.now(),schemaVersion:"auto-trigger-diagnostics.v1",...e}))}function bd(t={}){return Gs(t)}function xd(t={}){return Bn(t)}async function Wr(){if(m.isInitialized){U("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316"),G("info","\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316\uFF0C\u8DF3\u8FC7\u91CD\u590D\u521D\u59CB\u5316");return}let t=lt();if(!t){U("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),G("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!1,hasEventTypes:!1}),setTimeout(Wr,1e3);return}let e=await Pc(),s=e?.eventSource||Nn(),n=e?.eventTypes||Ln();if(!s){U("\u65E0\u6CD5\u83B7\u53D6SillyTavern\u4E8B\u4EF6\u6E90\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),G("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,importError:ae.importError?.message||""}),setTimeout(Wr,1e3);return}G("info","\u5F00\u59CB\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,listenerSettings:Ee()}),G("info","\u4F7F\u7528\u4E8B\u4EF6\u6E90",{source:e?.source||ae.source||"unknown"}),Ic(),it(I.MESSAGE_SENT,async r=>{let i=(await eo({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(a=>a.role==="user").pop();It({lastUserSendIntentAt:Date.now(),lastUserIntentSource:"message_sent",lastUserMessageId:r,lastUserMessageAt:Date.now(),lastUserMessageText:i?.content||m.gateState.lastUserMessageText||""}),U(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${r}`),G("info","\u8BB0\u5F55\u7528\u6237\u53D1\u9001\u610F\u56FE",{messageId:r,lastUserMessage:i?.content||""}),Ht({kind:"gate_event",eventType:I.MESSAGE_SENT,messageId:r,phase:"user_intent_recorded",detail:"message_sent"})}),it(I.GENERATION_STARTED,async(r,o,i)=>{let a=Date.now(),c=us("generation"),l=Oi(r,o||null),u=Uc(r,o||null,a),d=u.startedByUserIntent,p=u.userIntentDetectedAt,y=u.userIntentSource,v=u.userIntentDetail,x=zc({traceId:c,startedAt:a,type:r,params:o||null,rawGenerationType:l.rawGenerationType,rawGenerationParams:l.rawGenerationParams,normalizedGenerationType:l.normalizedGenerationType,generationAction:l.generationAction,generationActionSource:l.generationActionSource,explicitGenerationAction:l.explicitGenerationAction,dryRun:!!i,startedByUserIntent:d,userIntentDetectedAt:p,userIntentSource:y,userIntentDetail:v,baselineResolved:!1,provisional:!0,baselineSource:"generation_started_sync_provisional"});It({lastGenerationTraceId:c,lastGenerationType:l.rawGenerationType||r,lastGenerationParams:o||null,lastNormalizedGenerationType:l.normalizedGenerationType||"",lastGenerationAction:l.generationAction||"",lastGenerationActionSource:l.generationActionSource||"",lastGenerationDryRun:!!i,isGenerating:!0,lastGenerationBaseline:x}),U(`\u751F\u6210\u5F00\u59CB: ${r}`),G("info","\u6536\u5230\u751F\u6210\u5F00\u59CB\u4E8B\u4EF6",{type:r,dryRun:!!i,params:o||null,generationAction:l.generationAction,generationActionSource:l.generationActionSource,traceId:c,startedByUserIntent:d,userIntentSource:y,userIntentDetail:v,baseline:x}),Ht({kind:"generation_event",eventType:I.GENERATION_STARTED,traceId:c,phase:"generation_started",detail:l.generationAction||Jr(r,o||null),generationTraceId:c,baselineResolved:!1,generationStartedByUserIntent:d,generationUserIntentSource:y}),Bc({traceId:c,startedAt:a,type:r,params:o||null,rawGenerationType:l.rawGenerationType,rawGenerationParams:l.rawGenerationParams,normalizedGenerationType:l.normalizedGenerationType,generationAction:l.generationAction,generationActionSource:l.generationActionSource,explicitGenerationAction:l.explicitGenerationAction,dryRun:!!i,startedByUserIntent:d,userIntentDetectedAt:p,userIntentSource:y,userIntentDetail:v,baselineResolved:!0,provisional:!1,baselineResolutionAt:Date.now(),baselineSource:"generation_started_async_resolved"}).then(_=>{let T=m.gateState.lastGenerationBaseline;if(!T||T.traceId!==c){G("info","generation baseline \u5DF2\u8FC7\u671F\uFF0C\u653E\u5F03\u56DE\u586B",{traceId:c,currentTraceId:T?.traceId||""});return}It({lastGenerationBaseline:_}),G("info","generation baseline \u5DF2\u5B8C\u6210\u89E3\u6790",{traceId:c,baseline:_}),Ht({kind:"generation_baseline",eventType:I.GENERATION_STARTED,traceId:c,phase:"baseline_resolved",detail:_?.baselineSource||"generation_started_async_resolved",generationTraceId:c,baselineResolved:!0,generationStartedByUserIntent:_?.startedByUserIntent,generationUserIntentSource:_?.userIntentSource||""})}).catch(_=>{let T=m.gateState.lastGenerationBaseline;if(!T||T.traceId!==c)return;let C={...T,baselineResolved:!0,baselineResolutionAt:Date.now(),provisional:!1,baselineSource:"generation_started_async_failed_fallback"};It({lastGenerationBaseline:C}),G("warn","generation baseline \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u56DE\u9000\u5230 provisional baseline",{traceId:c,error:_?.message||String(_),baseline:C}),Ht({kind:"generation_baseline",eventType:I.GENERATION_STARTED,traceId:c,phase:"baseline_fallback",reason:"generation_baseline_async_failed",detail:_?.message||String(_),generationTraceId:c,baselineResolved:!0,generationStartedByUserIntent:C?.startedByUserIntent,generationUserIntentSource:C?.userIntentSource||""})})}),it(I.GENERATION_ENDED,()=>{It({lastGenerationAt:Date.now(),isGenerating:!1}),U("\u751F\u6210\u7ED3\u675F"),G("info","\u6536\u5230\u751F\u6210\u7ED3\u675F\u4E8B\u4EF6"),Ht({kind:"generation_event",eventType:I.GENERATION_ENDED,traceId:m.gateState.lastGenerationTraceId||"",phase:"generation_ended",generationTraceId:m.gateState.lastGenerationTraceId||"",detail:m.gateState.lastGenerationAction||m.gateState.lastNormalizedGenerationType||""})}),it(I.CHAT_CHANGED,r=>{Ii(I.CHAT_CHANGED),Ri("chat_changed"),G("info","\u6536\u5230\u804A\u5929\u5207\u6362\u4E8B\u4EF6",{data:r??null}),Ht({kind:"ui_guard",eventType:I.CHAT_CHANGED,phase:"ui_transition_guard_entered",detail:"chat_changed"})}),it(I.CHAT_CREATED,r=>{Ii(I.CHAT_CREATED),Ri("chat_created"),G("info","\u6536\u5230\u804A\u5929\u521B\u5EFA\u4E8B\u4EF6",{data:r??null}),Ht({kind:"ui_guard",eventType:I.CHAT_CREATED,phase:"ui_transition_guard_entered",detail:"chat_created"})}),Vi(),m.isInitialized=!0,U("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210"),G("info","\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210",{listenerSettings:Ee()})}function vd(t){m.debugMode=t}var I,m,xc,ae,M,jt,N,Di,vc,_i,Sc,Tc,Ai,Ec,In,S,ao=F(()=>{Ae();Is();rs();Kr();et();I={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},m={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastNormalizedGenerationType:"",lastGenerationAction:"",lastGenerationActionSource:"",lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""},isInitialized:!1,debugMode:!1},xc="/script.js",ae={eventSource:null,eventTypes:null,source:"",scriptModule:null,loadingPromise:null,importError:null},M={LISTENER_DISABLED:"listener_disabled",QUIET_GENERATION:"quiet_generation",DRY_RUN_GENERATION:"dry_run_generation",IGNORED_AUTO_TRIGGER:"ignored_auto_trigger",UNRELATED_UI_EVENT:"ui_side_effect_event",SPECULATIVE_FALLBACK_WITHOUT_MESSAGE:"speculative_generation_after_commands",NO_CONFIRMED_ASSISTANT_MESSAGE:"no_confirmed_assistant_message",HISTORICAL_REPLAY_MESSAGE_RECEIVED:"historical_replay_message_received",MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION:"message_received_outside_active_generation",NON_ASSISTANT_MESSAGE:"non_assistant_message",MISSING_AI_MESSAGE:"missing_ai_message",DUPLICATE_MESSAGE:"duplicate_message",NO_ELIGIBLE_TOOLS:"no_eligible_tools",TOOL_DISABLED:"tool_disabled"},jt={AUTO_POST_RESPONSE_API:"auto_post_response_api",MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"},N={RECEIVED:"received",SCHEDULED:"scheduled",DISPATCHING:"dispatching",HANDLING:"handling",COMPLETED:"completed",SKIPPED:"skipped",IGNORED:"ignored"},Di=15e3,vc=1500,_i=1800,Sc=5e3,Tc=6e4,Ai=new Set(["reroll","regenerate","swipe"]),Ec=["type","action","name","mode","source","reason","kind","command","operation","event","trigger","generationType","generation_type","regenType","regen_type"],In=null;S={initialized:!1,listeners:new Map,messageSessions:new Map,handledExecutionKeys:new Map,recentSessionHistory:[],recentEventTimeline:[],lastExecutionContext:null,lastHandledMessageKey:"",lastHandledExecutionKey:"",pendingMessageTimers:new Map,lastAutoTriggerSnapshot:null,lastEventDebugSnapshot:null,lastDuplicateMessageKey:"",lastDuplicateExecutionKey:"",lastDuplicateMessageAt:0}});var Qi={};ye(Qi,{TOOL_CONFIG_PANEL_STYLES:()=>Xi,createToolConfigPanel:()=>Mt,default:()=>Sd});function Mt(t){let{id:e,toolId:s,postResponseHint:n,extractionPlaceholder:r,previewDialogId:o,previewTitle:i="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let a=ce(this.toolId);if(!a)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let c=this._getApiPresets(),l=a.output?.apiPreset||a.apiPreset||"",u=this._getBypassPresets(),d=a.output?.mode||"follow_ai",p=a.bypass?.enabled||!1,y=a.bypass?.presetId||"",v=a.runtime?.lastStatus||"idle",x=a.runtime?.lastRunAt?new Date(a.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",_=a.runtime?.lastError||"",T=a.extraction||{},C=Array.isArray(T.selectors)?T.selectors.join(`
`):"",W=d==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",le=Gs({historyLimit:8}),J=this._buildDiagnosticsHtml(a.runtime||{},le),Le=d==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",k=l||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${E(a.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${E(a.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${E(Le)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${E(k)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${E(v)}</span>
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
                <option value="follow_ai" ${d==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${d==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${W}</div>
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
                ${c.map($=>`
                  <option value="${E($.name)}" ${$.name===l?"selected":""}>
                    ${E($.name)}
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
                ${u.map($=>`
                  <option value="${E($.id)}" ${$.id===y?"selected":""}>
                    ${E($.name)}${$.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="number" class="yyt-input" id="${f}-tool-max-messages" min="1" max="50" value="${Number(T.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${f}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${E(r)}">${E(C)}</textarea>
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
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${E(a.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${E(v)}">${E(v)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${E(x)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${a.runtime?.successCount||0} / ${a.runtime?.errorCount||0}</span>
                </div>
                ${_?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${E(_)}</span>
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

          ${J}
        </div>
      `},_formatDiagnosticValue(a,c="\u672A\u8BB0\u5F55"){let l=String(a||"").trim();return E(l||c)},_formatDiagnosticTime(a){let c=Number(a)||0;return c>0?new Date(c).toLocaleString():"\u672A\u8BB0\u5F55"},_formatSkipReason(a){return{listener_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u81EA\u52A8\u76D1\u542C\u5DF2\u5173\u95ED",quiet_generation:"\u5DF2\u8DF3\u8FC7\uFF1Aquiet / dryRun \u751F\u6210",dry_run_generation:"\u5DF2\u8DF3\u8FC7\uFF1A\u5F53\u524D generation \u4E3A dryRun",ignored_auto_trigger:"\u5DF2\u8DF3\u8FC7\uFF1A\u76D1\u542C\u5668\u8BBE\u7F6E\u5FFD\u7565\u4E86\u975E\u7528\u6237\u610F\u56FE\u751F\u6210",ui_side_effect_event:"\u5DF2\u5FFD\u7565\uFF1A\u5BBF\u4E3B UI \u526F\u4F5C\u7528\u4E8B\u4EF6",speculative_generation_after_commands:"\u5DF2\u5FFD\u7565\uFF1A\u4EC5\u8BB0\u5F55 GENERATION_AFTER_COMMANDS \u89C2\u5BDF\u6001 session",no_confirmed_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u786E\u8BA4\u5230\u672C\u8F6E assistant \u65B0\u697C\u5C42",historical_replay_message_received:"\u5DF2\u62E6\u622A\uFF1A\u5386\u53F2 assistant \u6D88\u606F\u91CD\u653E\u4E8B\u4EF6",message_received_outside_active_generation:"\u5DF2\u62E6\u622A\uFF1AMESSAGE_RECEIVED \u4E0D\u5C5E\u4E8E\u5F53\u524D\u751F\u6210\u7A97\u53E3",non_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u7684\u5E76\u975E AI \u697C\u5C42",missing_ai_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D",duplicate_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD",no_eligible_tools:"\u5DF2\u8DF3\u8FC7\uFF1A\u6CA1\u6709\u547D\u4E2D\u53EF\u6267\u884C\u5DE5\u5177",tool_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u5DE5\u5177\u672A\u542F\u7528",generation_after_commands_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AGENERATION_AFTER_COMMANDS \u515C\u5E95\u5DF2\u5173\u95ED",message_received_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AMESSAGE_RECEIVED \u515C\u5E95\u5DF2\u5173\u95ED"}[a]||a||"\u65E0"},_formatExecutionPath(a){return{auto_post_response_api:"\u81EA\u52A8\u94FE\uFF1Apost_response_api",manual_post_response_api:"\u624B\u52A8\u94FE\uFF1Apost_response_api",manual_compatibility:"\u624B\u52A8\u94FE\uFF1Acompatibility \u56DE\u9000"}[a]||a||"\u672A\u8BB0\u5F55"},_formatCommitMethod(a){return{setChatMessages:"setChatMessages",setChatMessage:"setChatMessage",local_only:"local_only",none:"none"}[a]||a||"\u672A\u8BB0\u5F55"},_formatWritebackStatus(a){return{success:"\u5199\u56DE\u6210\u529F",failed:"\u5199\u56DE\u5931\u8D25",skipped_empty_output:"\u65E0\u8F93\u51FA\uFF0C\u8DF3\u8FC7\u5199\u56DE",not_applicable:"\u4E0D\u9002\u7528"}[a]||a||"\u672A\u8BB0\u5F55"},_formatFailureStage(a){return{build_messages:"\u6784\u9020\u8BF7\u6C42\u6D88\u606F",send_api_request:"\u53D1\u9001 API \u8BF7\u6C42",extract_output:"\u63D0\u53D6\u5DE5\u5177\u8F93\u51FA",inject_context:"\u5199\u56DE\u4E0A\u4E0B\u6587",compatibility_execute:"\u517C\u5BB9\u6267\u884C\u5165\u53E3",unknown:"\u672A\u77E5\u9636\u6BB5"}[a]||a||"\u65E0"},_formatBooleanState(a){return a?"\u662F":"\u5426"},_formatHandledExecutionKeysText(a=[]){let c=Array.isArray(a)?a.filter(Boolean):[];return c.length?c.slice(-3).map(l=>String(l?.executionKey||"").trim()||"\u672A\u8BB0\u5F55").join(" / "):"\u65E0"},_formatHistoryTime(a){return this._formatDiagnosticTime(a)},_formatPhaseCountsText(a={}){let c=Object.entries(a||{}).filter(([,l])=>Number(l)>0);return c.length?c.map(([l,u])=>`${l}:${u}`).join(" / "):"\u65E0"},_formatEventBridgeText(a={}){if(!a||a.ready!==!0)return"\u672A\u5C31\u7EEA";let c=String(a.source||"").trim();return c?`\u5DF2\u5C31\u7EEA\uFF08${c}\uFF09`:"\u5DF2\u5C31\u7EEA"},_formatVerdictHintLabel(a=""){return{a10BaselineRaceSuspicious:"A10 baseline",a11ReplaySuspicious:"A11 replay",a12UserIntentSuspicious:"A12 user intent",a13AutoTriggerLeakSuspicious:"A13 auto trigger"}[a]||a||"\u672A\u77E5\u9879"},_buildVerdictHintsHtml(a={}){let c=Object.entries(a||{});return c.length?`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">N1 \u5FEB\u901F\u5224\u8BFB</div>
          <div class="yyt-tool-debug-chip-list">
            ${c.map(([l,u])=>{let d=!!u?.flagged,p=Array.isArray(u?.reasons)?u.reasons.filter(Boolean):[],y=p.length?E(p.join(" | ")):"\u672A\u89C1\u660E\u663E\u53EF\u7591\u4FE1\u53F7";return`
                <span class="yyt-tool-debug-chip ${d?"yyt-tool-debug-chip-warning":"yyt-tool-debug-chip-ok"}" title="${y}">
                  ${E(this._formatVerdictHintLabel(l))}
                  <strong>${d?"\u53EF\u7591":"\u6B63\u5E38"}</strong>
                </span>
              `}).join("")}
          </div>
        </div>
      `:""},_buildTimelineSection(a,c=[]){let l=Array.isArray(c)?c.filter(Boolean).slice().reverse():[];if(!l.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${E(a)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let u=l.map(d=>{let p=this._formatDiagnosticValue(d.eventType||d.kind,"\u672A\u8BB0\u5F55"),y=this._formatDiagnosticValue(d.traceId,"\u65E0"),v=this._formatDiagnosticValue(d.sessionKey,"\u65E0"),x=[d.phase?`\u9636\u6BB5\uFF1A${d.phase}`:"",d.messageId?`\u6D88\u606F\uFF1A${d.messageId}`:"",d.executionKey?`execution\uFF1A${d.executionKey}`:"",d.confirmationSource?`\u786E\u8BA4\uFF1A${d.confirmationSource}`:"",d.reason?`\u539F\u56E0\uFF1A${this._formatSkipReason(d.reason)}`:"",d.detail?`\u8BE6\u60C5\uFF1A${d.detail}`:""].filter(Boolean);return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${E(this._formatHistoryTime(d.at))}</span>
              <span>${p}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              trace\uFF1A${y}<br>
              session\uFF1A${v}<br>
              ${E(x.join(" / ")||"\u65E0\u9644\u52A0\u8BE6\u60C5")}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${E(a)}</div>
          <div class="yyt-tool-debug-history-list">${u}</div>
        </div>
      `},_copyText(a){let c=String(a||"");if(!c)return!1;try{if(navigator?.clipboard?.writeText)return navigator.clipboard.writeText(c),!0}catch{}try{let l=document.createElement("textarea");l.value=c,l.setAttribute("readonly","readonly"),l.style.position="fixed",l.style.opacity="0",document.body.appendChild(l),l.select();let u=document.execCommand("copy");return document.body.removeChild(l),u}catch{return!1}},_copyAutoTriggerDiagnostics(){try{let a=Bn({historyLimit:8});this._copyText(JSON.stringify(a,null,2))?b("success","\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u5DF2\u590D\u5236"):b("warning","\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u5728\u63A7\u5236\u53F0\u5BFC\u51FA")}catch(a){b("error",a?.message||"\u5BFC\u51FA\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u5931\u8D25")}},_buildHistorySection(a,c=[],l="trigger"){let u=Array.isArray(c)?c.filter(Boolean).slice().reverse():[];if(!u.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${E(a)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let d=u.map(p=>{let y=this._formatDiagnosticValue(p.eventType,"\u672A\u8BB0\u5F55"),v=this._formatDiagnosticValue(p.messageKey||p.messageId,"\u672A\u8BB0\u5F55"),x=this._formatDiagnosticValue(p.traceId,"\u65E0"),_=this._formatDiagnosticValue(p.executionKey,"\u65E0"),T=l==="writeback"?`\u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(p.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(p.writebackStatus)} / \u5185\u5BB9\u63D0\u4EA4\uFF1A${this._formatBooleanState(p.contentCommitted)} / \u5BBF\u4E3B\u63D0\u4EA4\uFF1A${this._formatBooleanState(p.hostCommitApplied)} / \u4E3B\u63D0\u4EA4\uFF1A${this._formatCommitMethod(p.preferredCommitMethod)} / \u5B9E\u9645\u63D0\u4EA4\uFF1A${this._formatCommitMethod(p.appliedCommitMethod)} / \u5237\u65B0\u8BF7\u6C42\uFF1A${this._formatBooleanState(p.refreshRequested)} / \u5237\u65B0\u786E\u8BA4\uFF1A${this._formatBooleanState(p.refreshConfirmed)} / \u5237\u65B0\u901A\u9053\uFF1A${p.refreshMethodCount??0} / \u786E\u8BA4\u8F6E\u6570\uFF1A${p.refreshConfirmChecks??0} / \u5931\u8D25\u9636\u6BB5\uFF1A${this._formatFailureStage(p.failureStage)}`:`\u8DF3\u8FC7\u539F\u56E0\uFF1A${this._formatSkipReason(p.skipReason)} / \u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(p.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(p.writebackStatus)}`;return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${E(this._formatHistoryTime(p.at))}</span>
              <span>trace ${x}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              \u4E8B\u4EF6\uFF1A${y}<br>
              \u6D88\u606F\uFF1A${v}<br>
              execution\uFF1A${_}<br>
              ${E(T)}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${E(a)}</div>
          <div class="yyt-tool-debug-history-list">${d}</div>
        </div>
      `},_buildDiagnosticsHtml(a,c=null){let l=a||{},u=c||null,d=u?.summary||{},p=!!(Array.isArray(u?.activeSessions)&&u.activeSessions.length>0||Array.isArray(u?.recentSessionHistory)&&u.recentSessionHistory.length>0||Array.isArray(u?.recentEventTimeline)&&u.recentEventTimeline.length>0||d?.activeSessionCount||d?.pendingTimerCount||d?.lastHandledMessageKey||d?.lastHandledExecutionKey||d?.handledExecutionKeyCount||d?.eventBridge?.ready);if(!!!(l.lastTriggerAt||l.lastTriggerEvent||l.lastMessageKey||l.lastExecutionKey||l.lastSkipReason||l.lastExecutionPath||l.lastWritebackStatus||l.lastFailureStage||l.lastContentCommitted||l.lastHostCommitApplied||l.lastRefreshRequested||l.lastRefreshConfirmed||l.lastTraceId||Array.isArray(l.recentTriggerHistory)&&l.recentTriggerHistory.length>0||Array.isArray(l.recentWritebackHistory)&&l.recentWritebackHistory.length>0||p))return"";let v=[["\u6700\u8FD1\u89E6\u53D1\u65F6\u95F4",this._formatDiagnosticTime(l.lastTriggerAt)],["\u6700\u8FD1\u89E6\u53D1\u4E8B\u4EF6",this._formatDiagnosticValue(l.lastTriggerEvent)],["\u6700\u8FD1 Trace",this._formatDiagnosticValue(l.lastTraceId,"\u65E0")],["\u6700\u8FD1\u6D88\u606F\u952E",this._formatDiagnosticValue(l.lastMessageKey)],["\u6700\u8FD1 execution key",this._formatDiagnosticValue(l.lastExecutionKey)],["\u6700\u8FD1\u8DF3\u8FC7\u539F\u56E0",this._formatDiagnosticValue(this._formatSkipReason(l.lastSkipReason),"\u65E0")],["\u6700\u8FD1\u6267\u884C\u8DEF\u5F84",this._formatDiagnosticValue(this._formatExecutionPath(l.lastExecutionPath))],["\u6700\u8FD1\u5199\u56DE\u72B6\u6001",this._formatDiagnosticValue(this._formatWritebackStatus(l.lastWritebackStatus))],["\u6700\u8FD1\u5931\u8D25\u9636\u6BB5",this._formatDiagnosticValue(this._formatFailureStage(l.lastFailureStage),"\u65E0")],["\u6700\u8FD1\u5185\u5BB9\u63D0\u4EA4",this._formatDiagnosticValue(this._formatBooleanState(l.lastContentCommitted),"\u5426")],["\u6700\u8FD1\u5BBF\u4E3B\u63D0\u4EA4",this._formatDiagnosticValue(this._formatBooleanState(l.lastHostCommitApplied),"\u5426")],["\u6700\u8FD1\u4E3B\u63D0\u4EA4\u7B56\u7565",this._formatDiagnosticValue(this._formatCommitMethod(l.lastPreferredCommitMethod),"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5B9E\u9645\u63D0\u4EA4\u7B56\u7565",this._formatDiagnosticValue(this._formatCommitMethod(l.lastAppliedCommitMethod),"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5237\u65B0\u8BF7\u6C42",this._formatDiagnosticValue(this._formatBooleanState(l.lastRefreshRequested),"\u5426")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4",this._formatDiagnosticValue(this._formatBooleanState(l.lastRefreshConfirmed),"\u5426")],["\u6700\u8FD1\u5237\u65B0\u901A\u9053\u6570",this._formatDiagnosticValue(String(l.lastRefreshMethodCount??0),"0")],["\u6700\u8FD1\u5237\u65B0\u786E\u8BA4\u8F6E\u6570",this._formatDiagnosticValue(String(l.lastRefreshConfirmChecks??0),"0")]],x=this._buildHistorySection("\u6700\u8FD1\u89E6\u53D1\u5386\u53F2",l.recentTriggerHistory||[],"trigger"),_=this._buildHistorySection("\u6700\u8FD1\u5199\u56DE\u5386\u53F2",l.recentWritebackHistory||[],"writeback"),T=p?[["\u5F53\u524D active / timers",`${d.activeSessionCount||0} / ${d.pendingTimerCount||0}`],["\u4E8B\u4EF6\u6865\u63A5",this._formatEventBridgeText(d.eventBridge)],["\u5F53\u524D generation \u52A8\u4F5C",this._formatDiagnosticValue(d.generationAction,"\u672A\u8BB0\u5F55")],["\u5F53\u524D\u539F\u59CB generation type",this._formatDiagnosticValue(d.rawGenerationType,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5904\u7406\u6D88\u606F\u952E",this._formatDiagnosticValue(d.lastHandledMessageKey,"\u672A\u8BB0\u5F55")],["\u6700\u8FD1\u5904\u7406 execution key",this._formatDiagnosticValue(d.lastHandledExecutionKey,"\u672A\u8BB0\u5F55")],["\u5DF2\u5904\u7406 execution key \u6570",this._formatDiagnosticValue(String(d.handledExecutionKeyCount??0),"0")],["\u6700\u8FD1 execution key \u8F68\u8FF9",this._formatDiagnosticValue(this._formatHandledExecutionKeysText(d.recentHandledExecutionKeys),"\u65E0")],["Active phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(d.phaseCounts?.activeSessions),"\u65E0")],["History phase \u7EDF\u8BA1",this._formatDiagnosticValue(this._formatPhaseCountsText(d.phaseCounts?.recentSessionHistory),"\u65E0")]]:[],C=p?this._buildVerdictHintsHtml(u?.verdictHints||d?.verdictHints||{}):"",W=p?this._buildTimelineSection("\u6700\u8FD1\u81EA\u52A8\u89E6\u53D1\u65F6\u95F4\u7EBF",(u?.recentEventTimeline||[]).slice(-6)):"";return`
        <details class="yyt-tool-debug-panel">
          <summary class="yyt-tool-debug-summary">\u6700\u8FD1\u89E6\u53D1\u8BCA\u65AD</summary>
          <div class="yyt-tool-debug-content">
            ${v.map(([le,J])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${le}</span>
                <span class="yyt-tool-runtime-value">${J}</span>
              </div>
            `).join("")}
            ${T.map(([le,J])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${le}</span>
                <span class="yyt-tool-runtime-value">${J}</span>
              </div>
            `).join("")}
            <div class="yyt-tool-debug-actions">
              <button class="yyt-btn yyt-btn-secondary yyt-btn-small" id="${f}-tool-copy-auto-trigger-diagnostics">
                <i class="fa-solid fa-copy"></i> \u590D\u5236\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD JSON
              </button>
            </div>
            ${C}
            ${x}
            ${_}
            ${W}
          </div>
        </details>
      `},_getApiPresets(){try{return Jt()||[]}catch{return[]}},_getBypassPresets(){try{return Nr()||[]}catch{return[]}},_getFormData(a){let c=ce(this.toolId),l=a.find(`#${f}-tool-output-mode`).val()||"follow_ai",u=a.find(`#${f}-tool-bypass-enabled`).is(":checked"),d=l==="post_response_api",p=(a.find(`#${f}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(y=>y.trim()).filter(Boolean);return{enabled:c?.enabled!==!1,promptTemplate:a.find(`#${f}-tool-prompt-template`).val()||"",apiPreset:a.find(`#${f}-tool-api-preset`).val()||"",extractTags:p,trigger:{event:"GENERATION_ENDED",enabled:d},output:{mode:l,apiPreset:a.find(`#${f}-tool-api-preset`).val()||"",overwrite:!0,enabled:d},bypass:{enabled:u,presetId:u&&a.find(`#${f}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(a.find(`#${f}-tool-max-messages`).val(),10)||5),selectors:p}}},_showExtractionPreview(a,c){if(!V())return;let u=`${f}-${o}`,d=Array.isArray(c.messageEntries)?c.messageEntries:[],p=d.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${d.map(y=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${y.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${E(y.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${E(y.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${E(y.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";a.append(Qn({id:u,title:i,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${E((c.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${c.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${E(c.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${E(c.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${E(c.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${p}
        `})),Zn(a,u,{onSave:y=>y()}),a.find(`#${u}-save`).text("\u5173\u95ED"),a.find(`#${u}-cancel`).remove()},bindEvents(a){let c=V();!c||!Z(a)||(a.find(`#${f}-tool-output-mode`).on("change",()=>{let u=(a.find(`#${f}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";a.find(".yyt-tool-mode-hint").text(u)}),a.find(`#${f}-tool-bypass-enabled`).on("change",l=>{let u=c(l.currentTarget).is(":checked");a.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!u)}),a.find(`#${f}-tool-save, #${f}-tool-save-top`).on("click",()=>{this._saveConfig(a,{silent:!1})}),a.find(`#${f}-tool-reset-template`).on("click",()=>{let l=pn(this.toolId);l?.promptTemplate&&(a.find(`#${f}-tool-prompt-template`).val(l.promptTemplate),b("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),a.find(`#${f}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let u=await oo(this.toolId);!u?.success&&u?.error&&Ze("warning",u.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(u){b("error",u?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(a)}}),a.find(`#${f}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let u=await io(this.toolId);if(!u?.success){b("error",u?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(a,u)}catch(u){b("error",u?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),a.find(`#${f}-tool-copy-auto-trigger-diagnostics`).on("click",()=>{this._copyAutoTriggerDiagnostics()}))},_saveConfig(a,c={}){let l=this._getFormData(a),{silent:u=!1}=c,d=ot(this.toolId,l);return d?u||b("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):b("error","\u4FDD\u5B58\u5931\u8D25"),d},destroy(a){!V()||!Z(a)||a.find("*").off()},getStyles(){return Xi},renderTo(a){a.html(this.render({})),this.bindEvents(a,{})}}}var Xi,Sd,Os=F(()=>{et();rs();Js();As();ao();Xi=`
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
`;Sd=Mt});var Ve,lo=F(()=>{Os();Ve=Mt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var qe,co=F(()=>{Os();qe=Mt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var Je,uo=F(()=>{Os();Je=Mt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var Yt,po=F(()=>{Ae();As();et();Yt={id:"bypassPanel",render(t){let e=K.getPresetList(),s=K.getDefaultPresetId();return`
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
          <span class="yyt-bypass-preset-name">${E(t.name)}</span>
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
      `;let e=K.getDefaultPresetId()===t.id,s=ft&&ft[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${E(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${E(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${E(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=V();!s||!Z(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(s.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let n=e(s.currentTarget).data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=K.deletePreset(n);r.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),b("success","\u9884\u8BBE\u5DF2\u5220\u9664")):b("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let n=e(s.currentTarget).closest(".yyt-bypass-message"),r=n.data("messageId");n.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await pt(n),o=K.importPresets(r);b(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(r){b("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=K.exportPresets();ut(s,`bypass_presets_${Date.now()}.json`),b("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){b("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let n=K.getPreset(s);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(n)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,n=K.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,s),b("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):b("error",n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),n=s.data("presetId");if(!n)return;let r=s.find(".yyt-bypass-name-input").val().trim(),o=s.find("#yyt-bypass-description").val().trim();if(!r){b("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let i=[];s.find(".yyt-bypass-message").each(function(){let c=e(this);i.push({id:c.data("messageId"),role:c.find(".yyt-bypass-role-select").val(),content:c.find(".yyt-bypass-message-content").val(),enabled:c.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=K.updatePreset(n,{name:r,description:o,messages:i});a.success?(b("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):b("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=K.deletePreset(n);r.success?(this.renderTo(t),b("success","\u9884\u8BBE\u5DF2\u5220\u9664")):b("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let r=`bypass_${Date.now()}`,o=K.duplicatePreset(n,r);o.success?(this.renderTo(t),this._selectPreset(t,e,r),b("success","\u9884\u8BBE\u5DF2\u590D\u5236")):b("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");n&&(K.setDefaultPresetId(n),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),b("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(n))},_refreshPresetList(t,e){let s=K.getPresetList(),n=K.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(r=>this._renderPresetItem(r,r.id===n)).join(""))},destroy(t){!V()||!Z(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var ta={};ye(ta,{SettingsPanel:()=>ht,THEME_CONFIGS:()=>yo,applyTheme:()=>ea,applyUiPreferences:()=>go,default:()=>Ed});function Ns(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function Zi(t=Ns()){return t?.documentElement||document.documentElement}function ea(t,e=Ns()){let s=Zi(e),n={...Td,...yo[t]||yo["dark-blue"]};Object.entries(n).forEach(([r,o])=>{s.style.setProperty(r,o)}),s.setAttribute("data-yyt-theme",t)}function go(t={},e=Ns()){let s=Zi(e),{theme:n="dark-blue",compactMode:r=!1,animationEnabled:o=!0}=t||{};ea(n,e),s.classList.toggle("yyt-compact-mode",!!r),s.classList.toggle("yyt-no-animation",!o)}var Td,yo,ht,Ed,zn=F(()=>{Ae();Is();et();Td={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},yo={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};ht={id:"settingsPanel",render(t){let e=Oe.getSettings(),s=e.listener?.listenGenerationEnded!==!1,n=e.debug?.enableDebugLog===!0;return`
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
    `},bindEvents(t,e){let s=V();!s||!Z(t)||(t.find(".yyt-settings-tab").on("click",n=>{let r=s(n.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(n.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${r}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Oe.resetSettings(),go(ws.ui,Ns()),this.renderTo(t),b("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300,useGenerationAfterCommandsFallback:t.find("#yyt-setting-useGenerationAfterCommandsFallback").is(":checked"),useMessageReceivedFallback:t.find("#yyt-setting-useMessageReceivedFallback").is(":checked"),messageSessionWindowMs:parseInt(t.find("#yyt-setting-messageSessionWindowMs").val())||1800,historyRetentionLimit:parseInt(t.find("#yyt-setting-historyRetentionLimit").val())||10},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Oe.saveSettings(s),go(s.ui,Ns()),b("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!V()||!Z(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Ed=ht});var la={};ye(la,{ApiPresetPanel:()=>He,BypassPanel:()=>Yt,RegexExtractPanel:()=>je,SCRIPT_ID:()=>f,SettingsPanel:()=>ht,StatusBlockPanel:()=>qe,SummaryToolPanel:()=>Ve,ToolManagePanel:()=>Fe,UIManager:()=>fs,YouyouReviewPanel:()=>Je,bindDialogEvents:()=>Zn,createDialogHtml:()=>Qn,default:()=>_d,downloadJson:()=>ut,escapeHtml:()=>E,fillFormWithConfig:()=>Dt,getAllStyles:()=>aa,getFormApiConfig:()=>St,getJQuery:()=>V,initUI:()=>Ls,isContainerValid:()=>Z,readFileContent:()=>pt,registerComponents:()=>ps,renderApiPanel:()=>Kn,renderBypassPanel:()=>oa,renderRegexPanel:()=>Hn,renderSettingsPanel:()=>ia,renderStatusBlockPanel:()=>na,renderSummaryToolPanel:()=>sa,renderToolPanel:()=>jn,renderYouyouReviewPanel:()=>ra,resetJQueryCache:()=>La,showToast:()=>b,showTopNotice:()=>Ze,uiManager:()=>de});function ps(){de.register(He.id,He),de.register(je.id,je),de.register(Fe.id,Fe),de.register(Ve.id,Ve),de.register(qe.id,qe),de.register(Je.id,Je),de.register(Yt.id,Yt),de.register(ht.id,ht),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function Ls(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...n}=t;de.init(n),ps(),e&&de.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Ct(t,e,s={}){de.render(t,e,s)}function Kn(t){Ct(He.id,t)}function Hn(t){Ct(je.id,t)}function jn(t){Ct(Fe.id,t)}function sa(t){Ct(Ve.id,t)}function na(t){Ct(qe.id,t)}function ra(t){Ct(Je.id,t)}function oa(t){Ct(Yt.id,t)}function ia(t){Ct(ht.id,t)}function aa(){return de.getAllStyles()}var _d,fo=F(()=>{er();gr();Sr();Gr();lo();co();uo();po();zn();et();er();gr();Sr();Gr();lo();co();uo();po();zn();_d={uiManager:de,ApiPresetPanel:He,RegexExtractPanel:je,ToolManagePanel:Fe,SummaryToolPanel:Ve,StatusBlockPanel:qe,YouyouReviewPanel:Je,BypassPanel:Yt,SettingsPanel:ht,registerComponents:ps,initUI:Ls,renderApiPanel:Kn,renderRegexPanel:Hn,renderToolPanel:jn,renderSummaryToolPanel:sa,renderStatusBlockPanel:na,renderYouyouReviewPanel:ra,renderBypassPanel:oa,renderSettingsPanel:ia,getAllStyles:aa}});var ha={};ye(ha,{ApiPresetPanel:()=>He,RegexExtractPanel:()=>je,SCRIPT_ID:()=>f,StatusBlockPanel:()=>qe,SummaryToolPanel:()=>Ve,ToolManagePanel:()=>Fe,YouyouReviewPanel:()=>Je,default:()=>Ad,escapeHtml:()=>E,fillFormWithConfig:()=>Dt,getCurrentTab:()=>fa,getFormApiConfig:()=>St,getJQuery:()=>V,getRegexStyles:()=>ya,getStyles:()=>pa,getToolStyles:()=>ga,initUI:()=>Ls,isContainerValid:()=>Z,registerComponents:()=>ps,render:()=>ca,renderRegex:()=>da,renderTool:()=>ua,setCurrentTab:()=>ma,showToast:()=>b,uiManager:()=>de});function mo(t,e){let s=V();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function ca(t){if(Us=mo(t,Us),!Us||!Us.length){console.error("[YouYouToolkit] Container not found or invalid");return}Kn(Us)}function da(t){if(Bs=mo(t,Bs),!Bs||!Bs.length){console.error("[YouYouToolkit] Regex container not found");return}Hn(Bs)}function ua(t){if(zs=mo(t,zs),!zs||!zs.length){console.error("[YouYouToolkit] Tool container not found");return}jn(zs)}function pa(){return He.getStyles()}function ya(){return je.getStyles()}function ga(){return[Fe.getStyles(),Ve.getStyles(),qe.getStyles(),Je.getStyles()].join(`
`)}function fa(){return de.getCurrentTab()}function ma(t){de.switchTab(t)}var Us,Bs,zs,Ad,ba=F(()=>{fo();Us=null,Bs=null,zs=null;Ad={render:ca,renderRegex:da,renderTool:ua,getStyles:pa,getRegexStyles:ya,getToolStyles:ga,getCurrentTab:fa,setCurrentTab:ma,uiManager:de,ApiPresetPanel:He,RegexExtractPanel:je,ToolManagePanel:Fe,SummaryToolPanel:Ve,StatusBlockPanel:qe,YouyouReviewPanel:Je,registerComponents:ps,initUI:Ls,SCRIPT_ID:f,escapeHtml:E,showToast:b,getJQuery:V,isContainerValid:Z,getFormApiConfig:St,fillFormWithConfig:Dt}});var xa={};ye(xa,{DEFAULT_PROMPT_SEGMENTS:()=>Fn,PromptEditor:()=>Yn,default:()=>Pd,getPromptEditorStyles:()=>Md,messagesToSegments:()=>Dd,segmentsToMessages:()=>kd,validatePromptSegments:()=>Cd});function Md(){return`
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
  `}function Cd(t){let e=[];return Array.isArray(t)?(t.forEach((s,n)=>{s.id||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${n+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function kd(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Dd(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Fn]}var wd,Id,Rd,Fn,Yn,Pd,va=F(()=>{wd="youyou_toolkit_prompt_editor",Id={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Rd={system:"fa-server",ai:"fa-robot",user:"fa-user"},Fn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Yn=class{constructor(e={}){this.containerId=e.containerId||wd,this.segments=e.segments||[...Fn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Fn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=Id[e.type]||e.type,n=Rd[e.type]||"fa-file",r=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,i=r?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",a=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",c=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${r?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${i?`border-left: 3px solid ${i};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${n}"></i>
            <span class="yyt-prompt-segment-title">${s}</span>
            <div class="yyt-prompt-segment-badges">
              ${c}
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:n})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:n})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,n=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=s),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(r=>r.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let n=this.segments.find(r=>r.id===e);n&&(Object.assign(n,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let n=s.target.files[0];if(!n)return;let r=new FileReader;r.onload=o=>{try{let i=JSON.parse(o.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},r.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),n=new Blob([s],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};Pd=Yn});var ho={};ye(ho,{WindowManager:()=>Wn,closeWindow:()=>Nd,createWindow:()=>Od,windowManager:()=>Ne});function Gd(){if(Ne.stylesInjected)return;Ne.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=$d+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function Od(t){let{id:e,title:s="\u7A97\u53E3",content:n="",width:r=900,height:o=700,modal:i=!1,resizable:a=!0,maximizable:c=!0,startMaximized:l=!1,rememberState:u=!0,onClose:d,onReady:p}=t;Gd();let y=window.jQuery||window.parent?.jQuery;if(!y)return console.error("[WindowManager] jQuery not available"),null;if(Ne.isOpen(e))return Ne.bringToFront(e),Ne.getWindow(e);let v=window.innerWidth||1200,x=window.innerHeight||800,_=v<=1100,T=null,C=!1;u&&(T=Ne.getState(e),T&&!_&&(C=!0));let W,le;C&&T.width&&T.height?(W=Math.max(400,Math.min(T.width,v-40)),le=Math.max(300,Math.min(T.height,x-40))):(W=Math.max(400,Math.min(r,v-40)),le=Math.max(300,Math.min(o,x-40)));let J=Math.max(20,Math.min((v-W)/2,v-W-20)),Le=Math.max(20,Math.min((x-le)/2,x-le-20)),k=c&&!_,$=`
    <div class="yyt-window" id="${e}" style="left:${J}px; top:${Le}px; width:${W}px; height:${le}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Ld(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${k?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,z=null;i&&(z=y(`<div class="yyt-window-overlay" data-for="${e}"></div>`),y(document.body).append(z));let L=y($);y(document.body).append(L),Ne.register(e,L),L.on("mousedown",()=>Ne.bringToFront(e));let X=!1,be={left:J,top:Le,width:W,height:le},xe=()=>{be={left:parseInt(L.css("left")),top:parseInt(L.css("top")),width:L.width(),height:L.height()},L.addClass("maximized"),L.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),X=!0},ve=()=>{L.removeClass("maximized"),L.css({left:be.left+"px",top:be.top+"px",width:be.width+"px",height:be.height+"px"}),L.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),X=!1};L.find(".yyt-window-btn.maximize").on("click",()=>{X?ve():xe()}),(_&&c||C&&T.isMaximized&&c||l&&c)&&xe(),L.find(".yyt-window-btn.close").on("click",()=>{if(u&&c){let ue={width:X?be.width:L.width(),height:X?be.height:L.height(),isMaximized:X};Ne.saveState(e,ue)}d&&d(),z&&z.remove(),L.remove(),Ne.unregister(e),y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),z&&z.on("click",ue=>{ue.target,z[0]});let Ue=!1,ze,Xe,Pe,ct;if(L.find(".yyt-window-header").on("mousedown",ue=>{y(ue.target).closest(".yyt-window-controls").length||X||(Ue=!0,ze=ue.clientX,Xe=ue.clientY,Pe=parseInt(L.css("left")),ct=parseInt(L.css("top")),y(document.body).css("user-select","none"))}),y(document).on("mousemove.yytWindowDrag"+e,ue=>{if(!Ue)return;let pe=ue.clientX-ze,bt=ue.clientY-Xe;L.css({left:Math.max(0,Pe+pe)+"px",top:Math.max(0,ct+bt)+"px"})}),y(document).on("mouseup.yytWindowDrag"+e,()=>{Ue&&(Ue=!1,y(document.body).css("user-select",""))}),a){let ue=!1,pe="",bt,Qe,ee,g,h,R;L.find(".yyt-window-resize-handle").on("mousedown",function(w){X||(ue=!0,pe="",y(this).hasClass("se")?pe="se":y(this).hasClass("e")?pe="e":y(this).hasClass("s")?pe="s":y(this).hasClass("w")?pe="w":y(this).hasClass("n")?pe="n":y(this).hasClass("nw")?pe="nw":y(this).hasClass("ne")?pe="ne":y(this).hasClass("sw")&&(pe="sw"),bt=w.clientX,Qe=w.clientY,ee=L.width(),g=L.height(),h=parseInt(L.css("left")),R=parseInt(L.css("top")),y(document.body).css("user-select","none"),w.stopPropagation())}),y(document).on("mousemove.yytWindowResize"+e,w=>{if(!ue)return;let O=w.clientX-bt,H=w.clientY-Qe,re=400,B=300,Y=ee,fe=g,Se=h,Me=R;if(pe.includes("e")&&(Y=Math.max(re,ee+O)),pe.includes("s")&&(fe=Math.max(B,g+H)),pe.includes("w")){let Ce=ee-O;Ce>=re&&(Y=Ce,Se=h+O)}if(pe.includes("n")){let Ce=g-H;Ce>=B&&(fe=Ce,Me=R+H)}L.css({width:Y+"px",height:fe+"px",left:Se+"px",top:Me+"px"})}),y(document).on("mouseup.yytWindowResize"+e,()=>{ue&&(ue=!1,y(document.body).css("user-select",""))})}return L.on("remove",()=>{y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),p&&setTimeout(()=>p(L),50),L}function Nd(t){let e=Ne.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),Ne.unregister(t)}}function Ld(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var $d,Sa,Wn,Ne,bo=F(()=>{Ke();$d="youyou_toolkit_window_manager",Sa="window_states",Wn=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let n=this.loadStates();n[e]={...s,updatedAt:Date.now()},ys.set(Sa,n)}loadStates(){return ys.get(Sa)||{}}getState(e){return this.loadStates()[e]||null}},Ne=new Wn});function Ta(t,e={}){let{constants:s,topLevelWindow:n,modules:r}=t,{SCRIPT_ID:o,SCRIPT_VERSION:i,MENU_ITEM_ID:a,MENU_CONTAINER_ID:c}=s,l=null,u=!1,d=new Map,p={storageModule:()=>Promise.resolve().then(()=>(Jn(),qn)),uiComponentsModule:()=>Promise.resolve().then(()=>(ba(),ha)),promptEditorModule:()=>Promise.resolve().then(()=>(va(),xa)),toolExecutorModule:()=>Promise.resolve().then(()=>(wn(),An)),windowManagerModule:()=>Promise.resolve().then(()=>(bo(),ho))};function y(...k){console.log(`[${o}]`,...k)}function v(...k){console.error(`[${o}]`,...k)}async function x(k){return!k||!p[k]?null:r[k]?r[k]:(d.has(k)||d.set(k,(async()=>{try{let $=await p[k]();return r[k]=$,$}catch($){throw d.delete(k),$}})()),d.get(k))}async function _(){return l||(l=(async()=>{try{return r.storageModule=await Promise.resolve().then(()=>(Jn(),qn)),r.apiConnectionModule=await Promise.resolve().then(()=>(js(),Mo)),r.presetManagerModule=await Promise.resolve().then(()=>(Js(),Po)),r.uiModule=await Promise.resolve().then(()=>(fo(),la)),r.regexExtractorModule=await Promise.resolve().then(()=>(ln(),Fo)),r.toolManagerModule=await Promise.resolve().then(()=>(un(),Yo)),r.toolExecutorModule=await Promise.resolve().then(()=>(wn(),An)),r.toolTriggerModule=await Promise.resolve().then(()=>(ao(),Ji)),r.windowManagerModule=await Promise.resolve().then(()=>(bo(),ho)),r.toolRegistryModule=await Promise.resolve().then(()=>(rs(),ci)),r.settingsServiceModule=await Promise.resolve().then(()=>(Is(),ui)),r.bypassManagerModule=await Promise.resolve().then(()=>(As(),di)),r.variableResolverModule=await Promise.resolve().then(()=>(Br(),fi)),r.contextInjectorModule=await Promise.resolve().then(()=>(Ur(),yi)),r.toolPromptServiceModule=await Promise.resolve().then(()=>(zr(),hi)),r.toolOutputServiceModule=await Promise.resolve().then(()=>(Kr(),xi)),r.toolOutputServiceModule?.toolOutputService&&r.apiConnectionModule&&r.toolOutputServiceModule.toolOutputService.setApiConnection(r.apiConnectionModule),!0}catch(k){return l=null,console.warn(`[${o}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,k),!1}})(),l)}function T(){return`
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
    `}async function C(){let k=`${o}-styles`,$=n.document||document;if($.getElementById(k))return;let z="",L=[];try{L.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{L.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}L.push("./styles/main.css");for(let be of[...new Set(L.filter(Boolean))])try{let xe=await fetch(be);if(xe.ok){z=await xe.text();break}}catch{}z||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),z=T());let X=$.createElement("style");X.id=k,X.textContent=z,($.head||$.documentElement).appendChild(X),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function W(){let k=n.document||document;if(r.uiModule?.getAllStyles){let $=`${o}-ui-styles`;if(!k.getElementById($)){let z=k.createElement("style");z.id=$,z.textContent=r.uiModule.getAllStyles(),(k.head||k.documentElement).appendChild(z)}}if(r.promptEditorModule&&r.promptEditorModule.getPromptEditorStyles){let $=`${o}-prompt-styles`;if(!k.getElementById($)){let z=k.createElement("style");z.id=$,z.textContent=r.promptEditorModule.getPromptEditorStyles(),(k.head||k.documentElement).appendChild(z)}}}async function le(){try{let{applyUiPreferences:k}=await Promise.resolve().then(()=>(zn(),ta));if(r.settingsServiceModule?.settingsService){let $=r.settingsServiceModule.settingsService.getUiSettings();if($&&$.theme){let z=n.document||document;k($,z),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${$.theme}`)}}}catch(k){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",k)}}function J(){let k=n.jQuery||window.jQuery;if(!k){v("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(J,1e3);return}let $=n.document||document,z=k("#extensionsMenu",$);if(!z.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(J,2e3);return}if(k(`#${c}`,z).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let X=k(`<div class="extension_container interactable" id="${c}" tabindex="0"></div>`),be=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${a}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,xe=k(be);xe.on("click",function(Ue){Ue.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let ze=k("#extensionsMenuButton",$);ze.length&&z.is(":visible")&&ze.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),X.append(xe),z.append(X),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function Le(){if(y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${i}`),await C(),await _()){if(y("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!u&&r.uiModule?.initUI)try{r.uiModule.initUI({services:r,autoInjectStyles:!1,targetDocument:n.document||document}),u=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(z){console.error(`[${o}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,z)}if(r.toolTriggerModule?.initTriggerModule)try{r.toolTriggerModule.initTriggerModule(),y("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(z){console.error(`[${o}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,z)}W(),await le()}else y("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let $=n.document||document;$.readyState==="loading"?$.addEventListener("DOMContentLoaded",()=>{setTimeout(J,1e3)}):setTimeout(J,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:_,injectStyles:C,addMenuItem:J,loadLegacyModule:x,init:Le,log:y,logError:v}}function Ea(t){let{constants:e,topLevelWindow:s,modules:n,caches:r,uiState:o}=t,{SCRIPT_ID:i,SCRIPT_VERSION:a,POPUP_ID:c}=e,l={cleanup:null},u={cleanups:[]};function d(...g){console.log(`[${i}]`,...g)}function p(...g){console.error(`[${i}]`,...g)}async function y(g){if(n[g])return n[g];let h=t?.services?.loadLegacyModule;if(typeof h!="function")return null;try{return await h(g)}catch(R){return p(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${g}`,R),null}}function v(g){return typeof g!="string"?"":g.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function x(){return s.jQuery||window.jQuery}function _(){return s.document||document}function T(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let h=n.toolRegistryModule?.getToolConfig(g);if(!h)return g;if(!h.hasSubTabs)return h.name||g;let R=o.currentSubTab[g]||h.subTabs?.[0]?.id||"",w=h.subTabs?.find(O=>O.id===R);return w?.name?`${h.name} / ${w.name}`:h.name||g}function C(g){if(!g)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let h=n.toolRegistryModule?.getToolConfig(g);if(!h)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!h.hasSubTabs)return h.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let R=o.currentSubTab[g]||h.subTabs?.[0]?.id||"";return h.subTabs?.find(O=>O.id===R)?.description||h.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function W(){let g=o.currentPopup;if(!g)return;let h=T(o.currentMainTab),R=C(o.currentMainTab),w=g.querySelector(".yyt-popup-active-label");w&&(w.textContent=`\u5F53\u524D\uFF1A${h}`);let O=g.querySelector(".yyt-shell-breadcrumb");O&&(O.textContent=h);let H=g.querySelector(".yyt-shell-main-title");H&&(H.textContent=h);let re=g.querySelector(".yyt-shell-main-description");re&&(re.textContent=R);let B=g.querySelector(".yyt-shell-current-page");B&&(B.textContent=h);let Y=g.querySelector(".yyt-shell-current-desc");Y&&(Y.textContent=R)}function le(){typeof l.cleanup=="function"&&(l.cleanup(),l.cleanup=null)}function J(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(g=>{typeof g=="function"&&g()}),u.cleanups=[])}function Le(g){return!!g?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function k(g){let h=g?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body"].join(","));return h?h.scrollHeight>h.clientHeight+2||h.scrollWidth>h.clientWidth+2:!1}function $(g,h){return h?.closest?.(".yyt-scrollable-surface")===g}function z(g,h){return!g||!h?null:[h.closest?.(".yyt-tool-list"),h.closest?.(".yyt-settings-content"),h.closest?.(".yyt-sub-content"),h.closest?.(".yyt-tab-content.active"),g].filter(Boolean).find(w=>w!==g&&!g.contains(w)?!1:w.scrollHeight>w.clientHeight+2||w.scrollWidth>w.clientWidth+2)||g}function L(g){let h=_();if(!g||!h)return;g.classList.add("yyt-scrollable-surface");let R=!1,w=!1,O=0,H=0,re=0,B=0,Y=!1,fe=!1,Se=()=>{R=!1,w=!1,g.classList.remove("yyt-scroll-dragging")},Me=j=>{j.button===0&&(Le(j.target)||$(g,j.target)&&(Y=g.scrollWidth>g.clientWidth+2,fe=g.scrollHeight>g.clientHeight+2,!(!Y&&!fe)&&(j.stopPropagation(),R=!0,w=!1,O=j.clientX,H=j.clientY,re=g.scrollLeft,B=g.scrollTop)))},Ce=j=>{if(!R)return;let dt=j.clientX-O,$e=j.clientY-H;!(Math.abs(dt)>4||Math.abs($e)>4)&&!w||(w=!0,g.classList.add("yyt-scroll-dragging"),Y&&(g.scrollLeft=re-dt),fe&&(g.scrollTop=B-$e),j.preventDefault())},xt=()=>{Se()},se=j=>{if(j.ctrlKey||k(j.target))return;let dt=g.classList.contains("yyt-content");if(!dt&&!$(g,j.target))return;let $e=z(g,j.target);!$e||!($e.scrollHeight>$e.clientHeight+2||$e.scrollWidth>$e.clientWidth+2)||(Math.abs(j.deltaY)>0&&($e.scrollTop+=j.deltaY),Math.abs(j.deltaX)>0&&($e.scrollLeft+=j.deltaX),j.preventDefault(),(!dt||$e!==g)&&j.stopPropagation())},_e=j=>{w&&j.preventDefault()};g.addEventListener("mousedown",Me),g.addEventListener("wheel",se,{passive:!1}),g.addEventListener("dragstart",_e),h.addEventListener("mousemove",Ce),h.addEventListener("mouseup",xt),u.cleanups.push(()=>{Se(),g.classList.remove("yyt-scrollable-surface"),g.removeEventListener("mousedown",Me),g.removeEventListener("wheel",se),g.removeEventListener("dragstart",_e),h.removeEventListener("mousemove",Ce),h.removeEventListener("mouseup",xt)})}function X(){let g=o.currentPopup;if(!g)return;J();let h=[...g.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...g.querySelectorAll(".yyt-sub-nav"),...g.querySelectorAll(".yyt-content"),...g.querySelectorAll(".yyt-tab-content.active"),...g.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...g.querySelectorAll(".yyt-settings-content"),...g.querySelectorAll(".yyt-tool-list")];[...new Set(h)].forEach(L)}function be(){let g=_(),h=o.currentPopup,R=h?.querySelector(".yyt-popup-header");if(!h||!R||!g)return;let w=!1,O=0,H=0,re=0,B=0,Y="",fe=()=>({width:s.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),Se=(_e,j,dt)=>Math.min(Math.max(_e,j),dt),Me=()=>{w&&(w=!1,h.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=Y)},Ce=_e=>{if(!w||!o.currentPopup)return;let j=_e.clientX-O,dt=_e.clientY-H,{width:$e,height:Vn}=fe(),wa=h.offsetWidth||0,Ia=h.offsetHeight||0,Ra=Math.max(0,$e-wa),Ma=Math.max(0,Vn-Ia);h.style.left=`${Se(re+j,0,Ra)}px`,h.style.top=`${Se(B+dt,0,Ma)}px`,h.style.transform="none",h.style.right="auto",h.style.bottom="auto"},xt=()=>{Me()},se=_e=>{if(_e.button!==0||_e.target?.closest(".yyt-popup-close"))return;w=!0,O=_e.clientX,H=_e.clientY;let j=h.getBoundingClientRect();re=j.left,B=j.top,h.style.left=`${j.left}px`,h.style.top=`${j.top}px`,h.style.transform="none",h.style.right="auto",h.style.bottom="auto",h.classList.add("yyt-popup-dragging"),Y=g.body.style.userSelect||"",g.body.style.userSelect="none",_e.preventDefault()};R.addEventListener("mousedown",se),g.addEventListener("mousemove",Ce),g.addEventListener("mouseup",xt),l.cleanup=()=>{Me(),R.removeEventListener("mousedown",se),g.removeEventListener("mousemove",Ce),g.removeEventListener("mouseup",xt)}}function xe(){le(),J(),o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),d("\u5F39\u7A97\u5DF2\u5173\u95ED")}function ve(g){o.currentMainTab=g;let h=x();if(!h||!o.currentPopup)return;h(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),h(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let R=n.toolRegistryModule?.getToolConfig(g);R?.hasSubTabs?(h(o.currentPopup).find(".yyt-sub-nav").show(),ze(g,R.subTabs)):h(o.currentPopup).find(".yyt-sub-nav").hide(),h(o.currentPopup).find(".yyt-tab-content").removeClass("active"),h(o.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),Xe(g),W(),X()}function Ue(g,h){o.currentSubTab[g]=h;let R=x();!R||!o.currentPopup||(R(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),R(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${h}"]`).addClass("active"),Pe(g,h),W(),X())}function ze(g,h){let R=x();if(!R||!o.currentPopup||!h)return;let w=o.currentSubTab[g]||h[0]?.id,O=h.map(H=>`
      <div class="yyt-sub-nav-item ${H.id===w?"active":""}" data-subtab="${H.id}">
        <i class="fa-solid ${H.icon||"fa-file"}"></i>
        <span>${H.name}</span>
      </div>
    `).join("");R(o.currentPopup).find(".yyt-sub-nav").html(O),R(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let re=R(this).data("subtab");Ue(g,re)}),X()}async function Xe(g){let h=x();if(!h||!o.currentPopup)return;let R=h(o.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!R.length)return;let w=n.toolRegistryModule?.getToolConfig(g);switch(g){case"apiPresets":if(n.uiModule?.renderApiPanel)n.uiModule.renderApiPanel(R);else{let O=await y("uiComponentsModule");O?.render&&O.render(R)}break;case"toolManage":if(n.uiModule?.renderToolPanel)n.uiModule.renderToolPanel(R);else{let O=await y("uiComponentsModule");O?.renderTool&&O.renderTool(R)}break;case"regexExtract":if(n.uiModule?.renderRegexPanel)n.uiModule.renderRegexPanel(R);else{let O=await y("uiComponentsModule");O?.renderRegex&&O.renderRegex(R)}break;case"tools":if(w?.hasSubTabs&&w.subTabs?.length>0){let O=o.currentSubTab[g]||w.subTabs[0].id;await Pe(g,O)}else R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":n.uiModule?.renderBypassPanel?n.uiModule.renderBypassPanel(R):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":n.uiModule?.renderSettingsPanel?n.uiModule.renderSettingsPanel(R):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:ue(g,R);break}X()}async function Pe(g,h){let R=x();if(!R||!o.currentPopup)return;let w=R(o.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!w.length)return;let O=n.toolRegistryModule?.getToolConfig(g);if(O?.hasSubTabs){let re=O.subTabs?.find(B=>B.id===h);if(re){let B=w.find(".yyt-sub-content");switch(B.length||(w.html('<div class="yyt-sub-content"></div>'),B=w.find(".yyt-sub-content")),re.component){case"SummaryToolPanel":if(n.uiModule?.renderSummaryToolPanel)n.uiModule.renderSummaryToolPanel(B);else{let Y=await y("uiComponentsModule");Y?.SummaryToolPanel?Y.SummaryToolPanel.renderTo(B):B.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(n.uiModule?.renderStatusBlockPanel)n.uiModule.renderStatusBlockPanel(B);else{let Y=await y("uiComponentsModule");Y?.StatusBlockPanel?Y.StatusBlockPanel.renderTo(B):B.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(n.uiModule?.renderYouyouReviewPanel)n.uiModule.renderYouyouReviewPanel(B);else{let Y=await y("uiComponentsModule");Y?.YouyouReviewPanel?Y.YouyouReviewPanel.renderTo(B):B.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await ct(re,B);break;default:B.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let H=w.find(".yyt-sub-content");if(H.length){switch(h){case"config":pe(g,H);break;case"prompts":await bt(g,H);break;case"presets":Qe(g,H);break;default:H.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}X()}}async function ct(g,h){if(!(!x()||!h?.length||!g?.id))try{let w=r.dynamicToolPanelCache.get(g.id);if(!w){let H=(await Promise.resolve().then(()=>(Os(),Qi)))?.createToolConfigPanel;if(typeof H!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");w=H({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),r.dynamicToolPanelCache.set(g.id,w)}w.renderTo(h),X()}catch(w){console.error(`[${i}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,w),h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function ue(g,h){if(!x())return;let w=n.toolRegistryModule?.getToolConfig(g);if(!w){h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let O=o.currentSubTab[g]||w.subTabs?.[0]?.id||"config";h.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${O}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Pe(g,O)}function pe(g,h){if(!x())return;let w=n.toolManagerModule?.getTool(g),O=n.presetManagerModule?.getAllPresets()||[],H=n.toolRegistryModule?.getToolApiPreset(g)||"",re=O.map(B=>`<option value="${v(B.name)}" ${B.name===H?"selected":""}>${v(B.name)}</option>`).join("");h.html(`
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
    `),h.find("#yyt-save-tool-preset").on("click",function(){let Y=h.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(g,Y);let fe=s.toastr;fe&&fe.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function bt(g,h){let R=x(),w=n.promptEditorModule||await y("promptEditorModule");if(!R||!w){h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let H=n.toolManagerModule?.getTool(g)?.config?.messages||[],re=w.messagesToSegments?w.messagesToSegments(H):w.DEFAULT_PROMPT_SEGMENTS,B=new w.PromptEditor({containerId:`yyt-prompt-editor-${g}`,segments:re,onChange:fe=>{let Se=w.segmentsToMessages?w.segmentsToMessages(fe):[];d("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",Se.length,"\u6761\u6D88\u606F")}});h.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),B.init(h.find(`#yyt-prompt-editor-${g}`));let Y=w.getPromptEditorStyles?w.getPromptEditorStyles():"";if(Y){let fe="yyt-prompt-editor-styles",Se=s.document||document;if(!Se.getElementById(fe)){let Me=Se.createElement("style");Me.id=fe,Me.textContent=Y,(Se.head||Se.documentElement).appendChild(Me)}}}function Qe(g,h){x()&&h.html(`
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
    `)}function ee(){if(o.currentPopup){d("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=x(),h=_();if(!g){p("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let R=n.toolRegistryModule?.getToolList()||[];if(!R.length){p("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}R.some(se=>se.id===o.currentMainTab)||(o.currentMainTab=R[0].id);let w=n.toolRegistryModule?.getToolConfig("tools"),O=Array.isArray(w?.subTabs)?w.subTabs:[],H=O.filter(se=>se?.isCustom).length,re=O.filter(se=>!se?.isCustom).length,B=T(o.currentMainTab),Y=C(o.currentMainTab);o.currentOverlay=h.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",se=>{se.target===o.currentOverlay&&xe()}),h.body.appendChild(o.currentOverlay);let fe=R.map(se=>`
      <div class="yyt-main-nav-item ${se.id===o.currentMainTab?"active":""}" data-tab="${se.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(se.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(se.name||se.id)}</span>
          <span class="yyt-main-nav-desc">${v(se.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),Se=R.map(se=>`
      <div class="yyt-tab-content ${se.id===o.currentMainTab?"active":""}" data-tab="${se.id}">
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
                  <strong class="yyt-shell-current-page">${v(B)}</strong>
                  <span class="yyt-shell-current-desc">${v(Y)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${R.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${re}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${H}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${R.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${fe}
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
                    <div class="yyt-shell-main-title">${v(B)}</div>
                    <div class="yyt-shell-main-description">${v(Y)}</div>
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
                      ${Se}
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
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${v(B)}</span>
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
    `,Ce=h.createElement("div");Ce.innerHTML=Me,o.currentPopup=Ce.firstElementChild,h.body.appendChild(o.currentPopup),g(o.currentPopup).find(".yyt-popup-close").on("click",xe),g(o.currentPopup).find(`#${i}-close-btn`).on("click",xe),g(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let _e=g(this).data("tab");_e&&ve(_e)}),be(),Xe(o.currentMainTab);let xt=n.toolRegistryModule?.getToolConfig(o.currentMainTab);xt?.hasSubTabs&&(g(o.currentPopup).find(".yyt-sub-nav").show(),ze(o.currentMainTab,xt.subTabs)),W(),X(),d("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:ee,closePopup:xe,switchMainTab:ve,switchSubTab:Ue,renderTabContent:Xe,renderSubTabContent:Pe}}function _a(t,e={}){let{constants:s,modules:n}=t,{SCRIPT_ID:r,SCRIPT_VERSION:o}=s,{init:i,loadModules:a,loadLegacyModule:c,addMenuItem:l,popupShell:u}=e;return{version:o,id:r,init:i,openPopup:u?.openPopup,closePopup:u?.closePopup,switchMainTab:u?.switchMainTab,switchSubTab:u?.switchSubTab,addMenuItem:l,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getUiComponents:()=>n.uiComponentsModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getToolTrigger:()=>n.toolTriggerModule,getAutoTriggerDiagnostics:d=>n.toolTriggerModule?.getAutoTriggerDiagnostics?.(d)||null,exportAutoTriggerDiagnostics:d=>n.toolTriggerModule?.exportAutoTriggerDiagnostics?.(d)||null,getGenerationTransactionDiagnostics:d=>n.toolTriggerModule?.getGenerationTransactionDiagnostics?.(d)||null,exportGenerationTransactionDiagnostics:d=>n.toolTriggerModule?.exportGenerationTransactionDiagnostics?.(d)||null,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getPromptEditor:()=>n.promptEditorModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,async loadLegacyModule(d){return typeof c!="function"?null:c(d)},async getApiConfig(){return await a(),n.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await a(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await a(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,p){if(await a(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(d,p);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await a(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,p){return n.toolRegistryModule?.registerTool(d,p)||!1},unregisterTool(d){return n.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(d){return n.windowManagerModule?.createWindow(d)||null},closeWindow(d){n.windowManagerModule?.closeWindow(d)}}}var Ks="youyou_toolkit",Ud="0.6.2",Bd=`${Ks}-menu-item`,zd=`${Ks}-menu-container`,Kd=`${Ks}-popup`,Hd=typeof window.parent<"u"?window.parent:window,Hs={constants:{SCRIPT_ID:Ks,SCRIPT_VERSION:Ud,MENU_ITEM_ID:Bd,MENU_CONTAINER_ID:zd,POPUP_ID:Kd},topLevelWindow:Hd,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},Aa=Ea(Hs),Wt=Ta(Hs,{openPopup:Aa.openPopup});Hs.services.loadModules=Wt.loadModules;Hs.services.loadLegacyModule=Wt.loadLegacyModule;var xo=_a(Hs,{init:Wt.init,loadModules:Wt.loadModules,loadLegacyModule:Wt.loadLegacyModule,addMenuItem:Wt.addMenuItem,popupShell:Aa});if(typeof window<"u"&&(window.YouYouToolkit=xo,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=xo}catch{}var Hp=xo;Wt.init();console.log(`[${Ks}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{Hp as default};
