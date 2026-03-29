var _i=Object.defineProperty;var D=(s,e)=>()=>(s&&(e=s(s=0)),e);var te=(s,e)=>{for(var t in e)_i(s,t,{get:e[t],enumerable:!0})};function mr(){let s=x;return s._getStorage(),s._storage}function hr(){return x.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function br(s){x.set("settings",s)}var st,x,H,fr,Ut,Pe=D(()=>{st=class s{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t?.extensionSettings)return t.extensionSettings[this.namespace]||(t.extensionSettings[this.namespace]={}),this._storage={_target:t.extensionSettings[this.namespace],getItem:o=>{let r=t.extensionSettings[this.namespace][o];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(o,r)=>{t.extensionSettings[this.namespace][o]=r,this._saveSettings(t)},removeItem:o=>{delete t.extensionSettings[this.namespace][o],this._saveSettings(t)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,t)=>{try{localStorage.setItem(e,t)}catch(o){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,o)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,t=null){let o=`${this.namespace}:${e}`;if(this._cache.has(o))return this._cache.get(o);let r=this._getStorage(),n=this._getFullKey(e),i=r.getItem(n);if(i===null)return t;try{let a=JSON.parse(i);return this._cache.set(o,a),a}catch{return i}}set(e,t){let o=this._getStorage(),r=this._getFullKey(e),n=`${this.namespace}:${e}`;this._cache.set(n,t);try{o.setItem(r,JSON.stringify(t))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(e){let t=this._getStorage(),o=this._getFullKey(e),r=`${this.namespace}:${e}`;this._cache.delete(r),t.removeItem(o)}has(e){let t=this._getStorage(),o=this._getFullKey(e);return t.getItem(o)!==null}clear(){if(this._getStorage()._isTavern){let t=typeof window.parent<"u"?window.parent:window;if(t.SillyTavern?.getContext){let o=t.SillyTavern.getContext();o?.extensionSettings?.[this.namespace]&&(o.extensionSettings[this.namespace]={},this._saveSettings(o))}}else{let t=`${this.namespace}_`,o=[];for(let r=0;r<localStorage.length;r++){let n=localStorage.key(r);n&&n.startsWith(t)&&o.push(n)}o.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new s(`${this.namespace}:${e}`)}getMultiple(e){let t={};return e.forEach(o=>{t[o]=this.get(o)}),t}setMultiple(e){Object.entries(e).forEach(([t,o])=>{this.set(t,o)})}exportAll(){let e=this._getStorage(),t={};if(e._isTavern){let o=typeof window.parent<"u"?window.parent:window;if(o.SillyTavern?.getContext){let n=o.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(n).forEach(([i,a])=>{t[i]=typeof a=="string"?JSON.parse(a):a})}}else{let o=`${this.namespace}_`;for(let r=0;r<localStorage.length;r++){let n=localStorage.key(r);if(n&&n.startsWith(o)){let i=n.slice(o.length);try{t[i]=JSON.parse(localStorage.getItem(n))}catch{t[i]=localStorage.getItem(n)}}}}return t}},x=new st("youyou_toolkit"),H=new st("youyou_toolkit:tools"),fr=new st("youyou_toolkit:presets"),Ut=new st("youyou_toolkit:windows")});var po={};te(po,{DEFAULT_API_PRESETS:()=>Mi,DEFAULT_SETTINGS:()=>Ei,STORAGE_KEYS:()=>zt,StorageService:()=>st,deepMerge:()=>xr,getCurrentPresetName:()=>Pi,getStorage:()=>mr,loadApiPresets:()=>Ai,loadSettings:()=>hr,presetStorage:()=>fr,saveApiPresets:()=>Ci,saveSettings:()=>br,setCurrentPresetName:()=>Ii,storage:()=>x,toolStorage:()=>H,windowStorage:()=>Ut});function Ai(){return x.get(zt.API_PRESETS)||[]}function Ci(s){x.set(zt.API_PRESETS,s)}function Pi(){return x.get(zt.CURRENT_PRESET)||""}function Ii(s){x.set(zt.CURRENT_PRESET,s||"")}function xr(s,e){let t=r=>r&&typeof r=="object"&&!Array.isArray(r),o={...s};return t(s)&&t(e)&&Object.keys(e).forEach(r=>{t(e[r])?r in s?o[r]=xr(s[r],e[r]):Object.assign(o,{[r]:e[r]}):Object.assign(o,{[r]:e[r]})}),o}var zt,Ei,Mi,yo=D(()=>{Pe();Pe();zt={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},Ei={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Mi=[]});var _,go,E,le=D(()=>{_={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},go=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,t,o={}){if(!e||typeof t!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=o;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:t,priority:r};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,t)}off(e,t){let o=this.listeners.get(e);if(o){for(let r of o)if(r.callback===t){o.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,t){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,t),this._addToHistory(e,t);let o=this.listeners.get(e);if(!o||o.size===0)return;let r=Array.from(o).sort((n,i)=>i.priority-n.priority);for(let{callback:n}of r)try{n(t)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,i)}}once(e,t){let o=r=>{this.off(e,o),t(r)};return this.on(e,o)}wait(e,t=0){return new Promise((o,r)=>{let n=null,i=this.once(e,a=>{n&&clearTimeout(n),o(a)});t>0&&(n=setTimeout(()=>{i(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},t))})}hasListeners(e){let t=this.listeners.get(e);return t&&t.size>0}listenerCount(e){let t=this.listeners.get(e);return t?t.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,t){this.history.push({event:e,data:t,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(t=>t.event===e):[...this.history]}clearHistory(){this.history=[]}},E=new go});function S(s){return typeof s!="string"?"":s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function m(s,e,t=3e3){e||(e=s==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let o=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(o.toastr){o.toastr[s](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:t,progressBar:!0});return}Ri(s,e,t),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${s.toUpperCase()}] ${e}`)}function Ke(s,e,t={}){e||(e=s==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:o=3500,sticky:r=!1,noticeId:n=""}=t,i=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!i?.body){m(s,e,o);return}let a="yyt-top-notice-container",l="yyt-top-notice-styles",c=i.getElementById(a);if(c||(c=i.createElement("div"),c.id=a,c.style.cssText=`
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
    `,i.body.appendChild(c)),!i.getElementById(l)){let B=i.createElement("style");B.id=l,B.textContent=`
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
    `,i.head.appendChild(B)}if(n){let B=c.querySelector(`[data-notice-id="${n}"]`);B&&B.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},p=i.createElement("div");p.className=`yyt-top-notice yyt-top-notice--${s||"info"}`,n&&(p.dataset.noticeId=n);let h=i.createElement("span");h.className="yyt-top-notice__icon",h.textContent=d[s]||d.info;let g=i.createElement("div");g.className="yyt-top-notice__content",g.textContent=e;let v=i.createElement("button");v.className="yyt-top-notice__close",v.type="button",v.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),v.textContent="\xD7";let A=()=>{p.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>p.remove(),180)};v.addEventListener("click",A),p.appendChild(h),p.appendChild(g),p.appendChild(v),c.appendChild(p),r||setTimeout(A,o)}function Ri(s,e,t){let o=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!o)return;let r=o.getElementById("yyt-fallback-toast");r&&r.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=n[s]||n.info,a=o.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
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
  `,a.textContent=e,!o.getElementById("yyt-toast-styles")){let l=o.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,o.head.appendChild(l)}o.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},t)}function U(){if(pt)return pt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return pt=window.parent.jQuery,pt}catch{}return window.jQuery&&(pt=window.jQuery),pt}function ki(){pt=null}function F(s){return s&&s.length>0}function ot(s,e=y){if(!U()||!F(s))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let o=s.find(`#${e}-model`).val()?.trim()||"",r=s.find(`#${e}-model-select`);return r.is(":visible")&&(o=r.val()||o),{url:s.find(`#${e}-api-url`).val()?.trim()||"",apiKey:s.find(`#${e}-api-key`).val()||"",model:o,useMainApi:s.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(s.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(s.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(s.find(`#${e}-top-p`).val())??.9}}function yt(s,e,t=y){if(!U()||!F(s)||!e)return;s.find(`#${t}-api-url`).val(e.url||""),s.find(`#${t}-api-key`).val(e.apiKey||""),s.find(`#${t}-model`).val(e.model||""),s.find(`#${t}-max-tokens`).val(e.max_tokens||4096),s.find(`#${t}-temperature`).val(e.temperature??.7),s.find(`#${t}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;s.find(`#${t}-use-main-api`).prop("checked",r);let i=s.find(`#${t}-custom-api-fields`);r?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),s.find(`#${t}-model`).show(),s.find(`#${t}-model-select`).hide()}function fo(s){let{id:e,title:t,body:o,width:r="380px",wide:n=!1}=s;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${n?"yyt-dialog-wide":""}" style="${r!=="380px"?`width: ${r};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${t}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${o}
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function mo(s,e,t={}){if(!U())return()=>{};let r=s.find(`#${e}-overlay`),n=()=>{r.remove(),t.onClose&&t.onClose()};return r.find(`#${e}-close, #${e}-cancel`).on("click",n),r.on("click",function(i){i.target===this&&n()}),r.find(`#${e}-save`).on("click",function(){t.onSave&&t.onSave(n)}),n}function qe(s,e){let t=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(t),r=document.createElement("a");r.href=o,r.download=e,r.click(),URL.revokeObjectURL(o)}function Ge(s){return new Promise((e,t)=>{let o=new FileReader;o.onload=r=>e(r.target.result),o.onerror=r=>t(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),o.readAsText(s)})}var y,pt,Ue=D(()=>{y="youyou_toolkit";pt=null});var jt,J,ho=D(()=>{le();Ue();jt=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,E.emit(_.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,t){return!e||!t?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...t,render:t.render||(()=>""),bindEvents:t.bindEvents||(()=>{}),destroy:t.destroy||(()=>{}),getStyles:t.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,t,o={}){let r=U();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let i;if(typeof t=="string"?i=r(t):t&&t.jquery?i=t:t&&(i=r(t)),!F(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let a=n.render({...o,dependencies:this.dependencies});i.html(a),n.bindEvents(i,this.dependencies),this.activeInstances.set(e,{container:i,component:n,props:o}),E.emit(_.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let t=this.activeInstances.get(e);t&&(t.component.destroy(t.container),this.activeInstances.delete(e))}switchTab(e){let t=this.currentTab;this.currentTab=e,E.emit(_.UI_TAB_CHANGED,{tabId:e,oldTab:t})}getCurrentTab(){return this.currentTab}switchSubTab(e,t){this.currentSubTab[e]=t,E.emit(_.UI_SUBTAB_CHANGED,{mainTab:e,subTab:t})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((t,o)=>{t.getStyles&&(e+=t.getStyles())}),e}injectStyles(e=document){let t="yyt-component-styles";if(e.getElementById(t))return;let o=e.createElement("style");o.id=t,o.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(o)}setDependency(e,t){this.dependencies[e]=t}getDependency(e){return this.dependencies[e]}_subscribeEvents(){E.on(_.PRESET_UPDATED,()=>{}),E.on(_.TOOL_UPDATED,()=>{})}},J=new jt});var _r={};te(_r,{API_STATUS:()=>Bi,fetchAvailableModels:()=>To,getApiConfig:()=>rt,getEffectiveApiConfig:()=>Ft,hasEffectiveApiPreset:()=>vo,sendApiRequest:()=>So,sendWithPreset:()=>zi,testApiConnection:()=>Ki,updateApiConfig:()=>Ct,validateApiConfig:()=>Pt});function Di(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function xo(){return x.get(vr,Di())}function Li(s){x.set(vr,s)}function wr(){return x.get($i,[])}function Ni(){return x.get(Oi,"")}function bo(s,e={}){let t=new Error(s);return t.allowDirectFallback=e.allowDirectFallback===!0,t}function Sr(s,e="chat_completions"){let t=String(s||"").trim();if(!t)return"";let o=null;try{o=new URL(t)}catch{return t}let r=o.pathname.replace(/\/+$/,""),n=r;return e==="chat_completions"?!/\/chat\/completions$/i.test(r)&&!/\/completions$/i.test(r)&&(n=`${r||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(r)?n=r.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(r)?n=r.replace(/\/completions$/i,"/models"):/\/models$/i.test(r)||(n=`${r||""}/models`)),o.pathname=n.replace(/\/+/g,"/"),o.toString()}function Ui(s){let e=String(s||"").trim();if(!e)return"";try{let t=new URL(e);return t.pathname=t.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",t.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function rt(){return xo().apiConfig||{}}function Ct(s){let e=xo();e.apiConfig={...e.apiConfig,...s},Li(e)}function Pt(s){let e=[];if(s.useMainApi)return{valid:!0,errors:[]};if(!s.url||!s.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(s.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!s.model||!s.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Ft(s=""){let e=xo(),t=s||Ni()||"";if(t){let r=wr().find(n=>n.name===t);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return e.apiConfig||{}}function vo(s=""){return s?wr().some(t=>t?.name===s):!1}async function zi(s,e,t={},o=null){let r=Ft(s);return await So(e,{...t,apiConfig:r},o)}function Tr(s,e={}){let t=e.apiConfig||rt();return{messages:s,model:t.model||"gpt-3.5-turbo",max_tokens:t.max_tokens||4096,temperature:t.temperature??.7,top_p:t.top_p??.9,stream:!1,...e.extraParams}}function wo(s){let e="";if(s?.choices&&s.choices[0]?.message?.content)e=s.choices[0].message.content;else if(s?.content)e=s.content;else if(s?.text)e=s.text;else if(s?.response)e=s.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(s).slice(0,200)}`);return String(e||"").trim()}async function So(s,e={},t=null){let o=e.apiConfig||rt(),r=o.useMainApi,n=Pt(o);if(!n.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return r?await ji(s,e,t):await Fi(s,o,e,t)}async function ji(s,e,t){let o=typeof window.parent<"u"?window.parent:window;if(!o.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await o.TavernHelper.generateRaw({ordered_prompts:s,should_stream:!1,...e.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function Fi(s,e,t,o){let r=typeof window.parent<"u"?window.parent:window;if(r.TavernHelper?.generateRaw)try{return await Yi(s,e,t,o,r)}catch(n){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(r.SillyTavern?.getRequestHeaders)try{return await Hi(s,e,t,o,r)}catch(n){if(!n?.allowDirectFallback)throw n}return await Wi(s,e,t,o)}async function Yi(s,e,t,o,r){if(o?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await r.TavernHelper.generateRaw({ordered_prompts:s,should_stream:!1,max_chat_history:0,custom_api:{apiurl:Ui(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...t.extraParams||{}});return typeof n=="string"?n.trim():wo(n)}async function Hi(s,e,t,o,r){let n=String(e.url||"").trim(),i={...Tr(s,{apiConfig:e,...t}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},a={...typeof r.SillyTavern?.getRequestHeaders=="function"?r.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:a,body:JSON.stringify(i),signal:o})}catch(p){throw p?.name==="AbortError"?p:bo(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${p.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let p=[404,405,501,502].includes(l.status);throw bo(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:p})}let d=null;try{d=c?JSON.parse(c):{}}catch{let h=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw bo(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${h||"(\u7A7A\u54CD\u5E94)"}`)}return wo(d)}async function Wi(s,e,t,o){let r=Tr(s,{apiConfig:e,...t}),n=Sr(e.url,"chat_completions"),i={"Content-Type":"application/json"};e.apiKey&&(i.Authorization=`Bearer ${e.apiKey}`);let a=await fetch(n,{method:"POST",headers:i,body:JSON.stringify(r),signal:o}),l=await a.text().catch(()=>"");if(!a.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${a.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let p=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return wo(c)}async function Ki(s=null){let e=s||rt(),t=Date.now();try{await So([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let r=Date.now()-t;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(o){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${o.message}`,latency:Date.now()-t}}}async function To(s=null){let e=s||rt();return e.useMainApi?await qi():await Gi(e)}async function qi(){let s=typeof window.parent<"u"?window.parent:window;try{if(s.SillyTavern?.getContext){let e=s.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Gi(s){if(!s.url||!s.apiKey)return[];try{let e=Sr(s.url,"models"),t=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${s.apiKey}`}});if(!t.ok)return[];let o=await t.json();return o.data&&Array.isArray(o.data)?o.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var vr,$i,Oi,Bi,ds=D(()=>{Pe();vr="settings",$i="api_presets",Oi="current_preset";Bi={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Cr={};te(Cr,{createPreset:()=>ys,createPresetFromCurrentConfig:()=>ea,deletePreset:()=>gs,duplicatePreset:()=>Zi,exportPresets:()=>Co,generateUniquePresetName:()=>Io,getActiveConfig:()=>Ao,getActivePresetName:()=>fs,getAllPresets:()=>It,getPreset:()=>ft,getPresetNames:()=>Xi,getStarredPresets:()=>Mo,importPresets:()=>Po,presetExists:()=>Yt,renamePreset:()=>Qi,switchToPreset:()=>mt,togglePresetStar:()=>Eo,updatePreset:()=>_o,validatePreset:()=>ta});function Ji(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Ar(){return x.get(Vi,Ji())}function ge(){return x.get(Er,[])}function gt(s){x.set(Er,s)}function ps(){return x.get(Mr,"")}function us(s){x.set(Mr,s||"")}function It(){return ge()}function Xi(){return ge().map(e=>e.name)}function ft(s){return!s||typeof s!="string"?null:ge().find(t=>t.name===s)||null}function Yt(s){return!s||typeof s!="string"?!1:ge().some(t=>t.name===s)}function ys(s){let{name:e,description:t,apiConfig:o}=s;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(Yt(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={name:r,description:t||"",apiConfig:{url:o?.url||"",apiKey:o?.apiKey||"",model:o?.model||"",useMainApi:o?.useMainApi??!0,max_tokens:o?.max_tokens||4096,temperature:o?.temperature??.7,top_p:o?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=ge();return i.push(n),gt(i),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:n}}function _o(s,e){if(!s||typeof s!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=ge(),o=t.findIndex(i=>i.name===s);if(o===-1)return{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==s)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=t[o],n={...r,...e,name:r.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...r.apiConfig,...e.apiConfig}),t[o]=n,gt(t),{success:!0,message:`\u9884\u8BBE "${s}" \u66F4\u65B0\u6210\u529F`,preset:n}}function gs(s){if(!s||typeof s!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ge(),t=e.findIndex(o=>o.name===s);return t===-1?{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`}:(e.splice(t,1),gt(e),ps()===s&&us(""),{success:!0,message:`\u9884\u8BBE "${s}" \u5DF2\u5220\u9664`})}function Qi(s,e){if(!s||typeof s!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=e.trim();if(!Yt(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`};if(Yt(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u5DF2\u5B58\u5728`};let o=ge(),r=o.find(n=>n.name===s);return r&&(r.name=t,r.updatedAt=Date.now(),gt(o),ps()===s&&us(t)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${t}"`}}function Zi(s,e){if(!s||typeof s!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=e.trim(),o=ft(s);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`};if(Yt(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(o)),name:t,createdAt:Date.now(),updatedAt:Date.now()},n=ge();return n.push(r),gt(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${t}"`,preset:r}}function Eo(s){if(!s||typeof s!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ge(),t=e.find(o=>o.name===s);return t?(t.starred=!t.starred,t.updatedAt=Date.now(),gt(e),{success:!0,message:t.starred?`\u5DF2\u5C06 "${s}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${s}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:t.starred}):{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`}}function Mo(){return ge().filter(e=>e.starred===!0)}function mt(s){if(!s)return us(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=ft(s);return e?(us(s),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${s}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`}}function fs(){return ps()}function Ao(){let s=ps();if(s){let t=ft(s);if(t)return{presetName:s,apiConfig:t.apiConfig}}return{presetName:"",apiConfig:Ar().apiConfig||{}}}function Co(s=null){if(s){let t=ft(s);if(!t)throw new Error(`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`);return JSON.stringify(t,null,2)}let e=ge();return JSON.stringify(e,null,2)}function Po(s,e={overwrite:!1}){let t;try{t=JSON.parse(s)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(t)?t:[t];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=ge(),n=0;for(let i of o){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=r.findIndex(l=>l.name===i.name);a>=0?e.overwrite&&(i.updatedAt=Date.now(),r[a]=i,n++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),r.push(i),n++)}return n>0&&gt(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function ea(s,e=""){let t=Ar();return ys({name:s,description:e,apiConfig:t.apiConfig})}function ta(s){let e=[];return(!s.name||typeof s.name!="string"||!s.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!s.apiConfig||typeof s.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Io(s){(!s||typeof s!="string")&&(s="\u65B0\u9884\u8BBE");let e=ge(),t=new Set(e.map(r=>r.name));if(!t.has(s))return s;let o=1;for(;t.has(`${s} (${o})`);)o++;return`${s} (${o})`}var Vi,Er,Mr,ms=D(()=>{Pe();Vi="settings",Er="api_presets",Mr="current_preset"});function hs(s){return String(s||"").trim()}var ze,Ie,Ro=D(()=>{le();Ue();ds();ms();ze=null;Ie={id:"apiPresetPanel",render(s){let e=Ao(),t=e?.apiConfig||rt(),o=hs(e?.presetName||fs()),r=It(),a=Mo().slice(0,8),l=a.length>0?a.map(p=>this._renderPresetItem(p)).join(""):"",c=ze===null?o||"":hs(ze),d=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
                  <span class="yyt-select-value" data-value="${S(c)}">${S(d)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${c?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${r.length>0?r.map(p=>this._renderSelectOption(p,c)).join(""):""}
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
            
            ${this._renderApiConfigForm(t)}
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
    `},_renderPresetItem(s){return`
      <div class="yyt-preset-item" data-preset-name="${S(s.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${S(s.name)}</div>
          <div class="yyt-preset-meta">
            ${s.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${S(s.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(s,e){let t=s.starred===!0,o=t?"yyt-option-star yyt-starred":"yyt-option-star",r=t?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${s.name===e?"yyt-selected":""}" data-value="${S(s.name)}">
        <button class="${o}" data-preset="${S(s.name)}" title="${t?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${r}</button>
        <span class="yyt-option-text">${S(s.name)}</span>
      </div>
    `},_renderApiConfigForm(s){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${y}-use-main-api" ${s.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${y}-custom-api-fields" class="${s.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${y}-api-url" 
                   value="${S(s.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${y}-api-key" 
                     value="${S(s.apiKey||"")}" 
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
                     value="${S(s.model||"")}" 
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
                   value="${s.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${y}-temperature" 
                   value="${s.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${y}-top-p" 
                   value="${s.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(s,e){let t=U();!t||!F(s)||(this._bindDropdownEvents(s,t),this._bindPresetListEvents(s,t),this._bindApiConfigEvents(s,t),this._bindFileEvents(s,t))},_bindDropdownEvents(s,e){let t=s.find(`#${y}-preset-dropdown`),o=t.find(".yyt-select-trigger"),r=t.find(".yyt-select-value"),n=()=>{let i=String(r.data("value")||"").trim();if(!i){ze="",mt(""),yt(s,rt(),y),s.find(".yyt-preset-item").removeClass("yyt-loaded"),m("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let a=ft(i);if(!a){m("error",`\u9884\u8BBE "${i}" \u4E0D\u5B58\u5728`);return}ze=i,mt(i),yt(s,a.apiConfig,y),s.find(".yyt-preset-item").removeClass("yyt-loaded"),s.find(`.yyt-preset-item[data-preset-name="${i.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),m("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${i}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};o.on("click",function(i){i.stopPropagation(),t.toggleClass("yyt-open")}),t.find(".yyt-select-option").on("click",i=>{if(e(i.target).hasClass("yyt-option-star"))return;let a=e(i.currentTarget),l=a.data("value"),c=a.find(".yyt-option-text").text();ze=String(l||"").trim(),r.text(c).data("value",l),t.find(".yyt-select-option").removeClass("yyt-selected"),a.addClass("yyt-selected"),t.removeClass("yyt-open")}),s.find(`#${y}-load-preset`).on("click",()=>{n()}),t.find(".yyt-option-star").on("click",i=>{i.preventDefault(),i.stopPropagation();let a=e(i.currentTarget).data("preset");if(!a)return;let l=Eo(a);if(l.success){m("success",l.message);let c=s.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else m("error",l.message)}),e(document).on("click.yyt-dropdown",i=>{e(i.target).closest(t).length||t.removeClass("yyt-open")})},_bindPresetListEvents(s,e){s.find(".yyt-preset-item").on("click",t=>{let r=e(t.currentTarget).data("preset-name"),n=e(t.target).closest("[data-action]").data("action");if(n)switch(t.stopPropagation(),n){case"load":s.find(".yyt-select-value").text(r).data("value",r),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find(`.yyt-select-option[data-value="${r.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),s.find(`#${y}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let i=gs(r);if(m(i.success?"info":"error",i.message),i.success){hs(ze)===r&&(ze=null);let a=s.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}break}})},_bindApiConfigEvents(s,e){s.find(`#${y}-use-main-api`).on("change",function(){let t=e(this).is(":checked"),o=s.find(`#${y}-custom-api-fields`);t?o.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):o.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),s.find(`#${y}-toggle-key-visibility`).on("click",function(){let t=s.find(`#${y}-api-key`),o=t.attr("type");t.attr("type",o==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),s.find(`#${y}-load-models`).on("click",async()=>{let t=s.find(`#${y}-load-models`),o=s.find(`#${y}-model`),r=s.find(`#${y}-model-select`);t.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=ot(s,y),i=await To(n);if(i.length>0){r.empty(),i.forEach(l=>{r.append(`<option value="${S(l)}">${S(l)}</option>`)}),o.hide(),r.show();let a=o.val();a&&i.includes(a)&&r.val(a),r.off("change").on("change",function(){o.val(e(this).val())}),m("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else m("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(n){m("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${n.message}`)}finally{t.prop("disabled",!1).find("i").removeClass("fa-spin")}}),s.find(`#${y}-model`).on("focus",function(){let t=s.find(`#${y}-model-select`);e(this).show(),t.hide()}),s.find(`#${y}-save-api-config`).on("click",()=>{let t=ot(s,y),o=hs(fs()),r=Pt(t);if(!r.valid&&!t.useMainApi){m("error",r.errors.join(", "));return}if(o){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${o}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){Ct(t),mt(""),ze="",m("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let i=s.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i);return}Ct(t);let n=_o(o,{apiConfig:t});if(n.success){ze=o,m("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${o}"`),mt(o),E.emit(_.PRESET_UPDATED,{name:o});let i=s.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else m("error",n.message);return}Ct(t),m("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),s.find(`#${y}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){mt(""),ze="",Ct({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let t=s.closest(".yyt-api-manager").parent();t.length&&this.renderTo(t),m("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),s.find(`#${y}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(s,e)})},_bindFileEvents(s,e){s.find(`#${y}-export-presets`).on("click",()=>{try{let t=Co();qe(t,`youyou_toolkit_presets_${Date.now()}.json`),m("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(t){m("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}}),s.find(`#${y}-import-presets`).on("click",()=>{s.find(`#${y}-import-file`).click()}),s.find(`#${y}-import-file`).on("change",async t=>{let o=t.target.files[0];if(o){try{let r=await Ge(o),n=Po(r,{overwrite:!0});if(m(n.success?"success":"error",n.message),n.imported>0){let i=s.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(r){m("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(t.target).val("")}})},_showSavePresetDialog(s,e){let o=It().map(d=>d.name),r=Io("\u65B0\u9884\u8BBE"),n=`
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
                     value="${S(r)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
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
    `;e(`#${y}-dialog-overlay`).remove(),s.append(n);let i=e(`#${y}-dialog-overlay`),a=e(`#${y}-dialog-preset-name`),l=e(`#${y}-dialog-preset-desc`);a.focus().select();let c=()=>i.remove();i.find(`#${y}-dialog-close, #${y}-dialog-cancel`).on("click",c),i.on("click",function(d){d.target===this&&c()}),i.find(`#${y}-dialog-save`).on("click",()=>{let d=a.val().trim(),p=l.val().trim();if(!d){m("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(o.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;gs(d)}let h=ot(s,y),g=ys({name:d,description:p,apiConfig:h});if(g.success){m("success",g.message),c(),E.emit(_.PRESET_CREATED,{preset:g.preset});let v=s.closest(".yyt-api-manager").parent();v.length&&this.renderTo(v)}else m("error",g.message)}),a.on("keypress",function(d){d.which===13&&i.find(`#${y}-dialog-save`).click()})},destroy(s){let e=U();!e||!F(s)||(s.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(s){let e=this.render({});s.html(e),this.bindEvents(s,{})}}});var zr={};te(zr,{MESSAGE_MACROS:()=>Ur,addTagRule:()=>Rt,createRuleTemplate:()=>Or,default:()=>ra,deleteRulePreset:()=>Nr,deleteRuleTemplate:()=>Lr,deleteTagRule:()=>Ht,escapeRegex:()=>ht,exportRulesConfig:()=>Es,extractComplexTag:()=>Ir,extractCurlyBraceTag:()=>Lo,extractHtmlFormatTag:()=>Rr,extractSimpleTag:()=>Do,extractTagContent:()=>bt,generateTagSuggestions:()=>vs,getAllRulePresets:()=>Ts,getAllRuleTemplates:()=>kr,getContentBlacklist:()=>xt,getRuleTemplate:()=>$r,getTagRules:()=>Ve,importRulesConfig:()=>Ms,isValidTagName:()=>Oo,loadRulePreset:()=>_s,saveRulesAsPreset:()=>Ss,scanTextForTags:()=>xs,setContentBlacklist:()=>Wt,setTagRules:()=>ws,shouldSkipContent:()=>$o,testRegex:()=>Br,updateRuleTemplate:()=>Dr,updateTagRule:()=>kt});function sa(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...ko],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function we(){return x.get(Pr,sa())}function je(s){x.set(Pr,s)}function bs(){let s=we();return ce=s.ruleTemplates||[...ko],K=s.tagRules||[],fe=s.contentBlacklist||[],{ruleTemplates:ce,tagRules:K,contentBlacklist:fe}}function ht(s){return typeof s!="string"?"":s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function $o(s,e){if(!e||e.length===0||!s||typeof s!="string")return!1;let t=s.toLowerCase();return e.some(o=>{let r=o.trim().toLowerCase();return r&&t.includes(r)})}function Oo(s){return!s||typeof s!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(s)&&!oa.includes(s.toLowerCase())}function Do(s,e){if(!s||!e)return[];let t=[],o=ht(e),r=new RegExp(`<${o}>([\\s\\S]*?)<\\/${o}>`,"gi");[...s.matchAll(r)].forEach(l=>{l[1]&&t.push(l[1].trim())});let i=(s.match(new RegExp(`<${o}>`,"gi"))||[]).length,a=(s.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return i>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),t}function Lo(s,e){if(!s||!e)return[];let t=[],o=ht(e),r=new RegExp(`\\{${o}\\|`,"gi"),n;for(;(n=r.exec(s))!==null;){let i=n.index,a=i+n[0].length,l=1,c=a;for(;c<s.length&&l>0;)s[c]==="{"?l++:s[c]==="}"&&l--,c++;if(l===0){let d=s.substring(a,c-1);d.trim()&&t.push(d.trim())}r.lastIndex=i+1}return t}function Ir(s,e){if(!s||!e)return[];let t=e.split(",");if(t.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let o=t[0].trim(),r=t[1].trim(),n=r.match(/<\/(\w+)>/);if(!n)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let i=n[1],a=new RegExp(`${ht(o)}([\\s\\S]*?)<\\/${i}>`,"gi"),l=[];return[...s.matchAll(a)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Rr(s,e){if(!s||!e)return[];let t=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!t)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let o=t[1],r=[],n=new RegExp(`<${o}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${o}>`,"gi");[...s.matchAll(n)].forEach(c=>{c[1]&&r.push(c[1].trim())});let a=(s.match(new RegExp(`<${o}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(s.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return a>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-l} \u4E2A\u672A\u95ED\u5408\u7684 <${o}> \u6807\u7B7E`),r}function bt(s,e,t=[]){if(!s)return"";if(!e||e.length===0)return s;let o=e.filter(d=>d.type==="exclude"&&d.enabled),r=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),n=e.filter(d=>d.type==="regex_exclude"&&d.enabled),i=s;for(let d of o)try{let p=new RegExp(`<${ht(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${ht(d.value)}>`,"gi");i=i.replace(p,"")}catch(p){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:p})}let a=[];if(r.length>0)for(let d of r){let p=[];try{if(d.type==="include")p.push(...Do(i,d.value)),p.push(...Lo(i,d.value));else if(d.type==="regex_include"){let h=new RegExp(d.value,"gi");[...i.matchAll(h)].forEach(v=>{v[1]&&p.push(v[1])})}}catch(h){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:h})}p.forEach(h=>a.push(h.trim()))}else a.push(i);let l=[];for(let d of a){for(let p of n)try{let h=new RegExp(p.value,"gi");d=d.replace(h,"")}catch(h){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:p,error:h})}$o(d,t)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function xs(s,e={}){let t=performance.now(),{chunkSize:o=5e4,maxTags:r=100,timeoutMs:n=5e3}=e,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let p=0;p<s.length;p+=o){let h=s.slice(p,Math.min(p+o,s.length));if(c++,l+=h.length,performance.now()-t>n){console.warn(`[YouYouToolkit] Tag scanning timed out after ${n}ms`);break}let g;for(;(g=a.exec(h))!==null&&i.size<r;){let v=(g[1]||g[2]).toLowerCase();Oo(v)&&i.add(v)}if(i.size>=r)break;c%5===0&&await new Promise(v=>setTimeout(v,0))}let d=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(d-t),processedChars:l,totalChars:s.length,chunkCount:c,tagsFound:i.size}}}function vs(s,e=25){let t=s.tags.slice(0,e);return{suggestions:t,stats:{totalFound:s.stats.tagsFound,finalCount:t.length}}}function kr(){return ce.length===0&&bs(),ce}function $r(s){return ce.find(e=>e.id===s)}function Or(s){let e={id:`rule-${Date.now()}`,name:s.name||"\u65B0\u89C4\u5219",description:s.description||"",type:s.type||"include",value:s.value||"",enabled:s.enabled!==!1,createdAt:new Date().toISOString()};return ce.push(e),No(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Dr(s,e){let t=ce.findIndex(o=>o.id===s);return t===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ce[t]={...ce[t],...e,updatedAt:new Date().toISOString()},No(),{success:!0,template:ce[t],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Lr(s){let e=ce.findIndex(t=>t.id===s);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ce.splice(e,1),No(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function No(){let s=we();s.ruleTemplates=ce,je(s)}function Ve(){return K||bs(),K}function ws(s){K=s||[];let e=we();e.tagRules=K,je(e)}function Rt(s){let e={id:`tag-${Date.now()}`,type:s.type||"include",value:s.value||"",enabled:s.enabled!==!1};K.push(e);let t=we();return t.tagRules=K,je(t),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function kt(s,e){if(s<0||s>=K.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};K[s]={...K[s],...e};let t=we();return t.tagRules=K,je(t),{success:!0,rule:K[s],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Ht(s){if(s<0||s>=K.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};K.splice(s,1);let e=we();return e.tagRules=K,je(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function xt(){return fe||bs(),fe}function Wt(s){fe=s||[];let e=we();e.contentBlacklist=fe,je(e)}function Ss(s,e=""){if(!s||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=we();t.tagRulePresets||(t.tagRulePresets={});let o=`preset-${Date.now()}`;return t.tagRulePresets[o]={id:o,name:s.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(K)),blacklist:JSON.parse(JSON.stringify(fe)),createdAt:new Date().toISOString()},je(t),{success:!0,preset:t.tagRulePresets[o],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Ts(){let e=we().tagRulePresets||{};return Object.values(e)}function _s(s){let e=we(),o=(e.tagRulePresets||{})[s];return o?(K=JSON.parse(JSON.stringify(o.rules||[])),fe=JSON.parse(JSON.stringify(o.blacklist||[])),e.tagRules=K,e.contentBlacklist=fe,je(e),{success:!0,preset:o,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Nr(s){let e=we(),t=e.tagRulePresets||{};return t[s]?(delete t[s],e.tagRulePresets=t,je(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Es(){return JSON.stringify({tagRules:K,contentBlacklist:fe,ruleTemplates:ce,tagRulePresets:we().tagRulePresets||{}},null,2)}function Ms(s,e={overwrite:!0}){try{let t=JSON.parse(s);if(e.overwrite)K=t.tagRules||[],fe=t.contentBlacklist||[],ce=t.ruleTemplates||ko;else if(t.tagRules&&K.push(...t.tagRules),t.contentBlacklist){let r=new Set(fe.map(n=>n.toLowerCase()));t.contentBlacklist.forEach(n=>{r.has(n.toLowerCase())||fe.push(n)})}let o=we();return o.tagRules=K,o.contentBlacklist=fe,o.ruleTemplates=ce,t.tagRulePresets&&(o.tagRulePresets={...o.tagRulePresets||{},...t.tagRulePresets}),je(o),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(t){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${t.message}`}}}function Br(s,e,t="g",o=0){try{if(!s||typeof s!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(s,t),n=[];if(t.includes("g")){let i;for(;(i=r.exec(e))!==null;)i.length>1?n.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[o]||i[1]||i[0]}):n.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=r.exec(e);i&&n.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[o]||i[1]:i[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(i=>i.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var Pr,oa,ko,ce,K,fe,Ur,ra,As=D(()=>{Pe();Pr="settings";oa=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],ko=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],ce=[],K=[],fe=[];Ur={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};bs();ra={extractTagContent:bt,extractSimpleTag:Do,extractCurlyBraceTag:Lo,extractComplexTag:Ir,extractHtmlFormatTag:Rr,escapeRegex:ht,shouldSkipContent:$o,isValidTagName:Oo,scanTextForTags:xs,generateTagSuggestions:vs,getAllRuleTemplates:kr,getRuleTemplate:$r,createRuleTemplate:Or,updateRuleTemplate:Dr,deleteRuleTemplate:Lr,getTagRules:Ve,setTagRules:ws,addTagRule:Rt,updateTagRule:kt,deleteTagRule:Ht,getContentBlacklist:xt,setContentBlacklist:Wt,saveRulesAsPreset:Ss,getAllRulePresets:Ts,loadRulePreset:_s,deleteRulePreset:Nr,exportRulesConfig:Es,importRulesConfig:Ms,testRegex:Br,MESSAGE_MACROS:Ur}});var Re,Bo=D(()=>{le();Ue();As();Re={id:"regexExtractPanel",render(s){let e=Ve(),t=xt(),o=Ts();return`
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
          
          ${this._renderRulesEditor(e,t,o)}
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
    `},_renderRulesEditor(s,e,t){let o=s.length>0?s.map((n,i)=>this._renderRuleItem(n,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=t.length>0?t.map(n=>`<option value="${n.id}">${S(n.name)}</option>`).join(""):"";return`
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
                 value="${S(e.join(", "))}" 
                 placeholder="\u5173\u952E\u8BCD1, \u5173\u952E\u8BCD2, ...">
        </div>
      </div>
    `},_renderRuleItem(s,e){return`
      <div class="yyt-rule-item" data-rule-index="${e}">
        <select class="yyt-select yyt-rule-type" style="flex: 2; min-width: 100px;">
          <option value="include" ${s.type==="include"?"selected":""}>\u5305\u542B</option>
          <option value="regex_include" ${s.type==="regex_include"?"selected":""}>\u6B63\u5219\u5305\u542B</option>
          <option value="exclude" ${s.type==="exclude"?"selected":""}>\u6392\u9664</option>
          <option value="regex_exclude" ${s.type==="regex_exclude"?"selected":""}>\u6B63\u5219\u6392\u9664</option>
        </select>
        <input type="text" class="yyt-input yyt-rule-value" style="flex: 5;" 
               placeholder="\u6807\u7B7E\u540D\u6216\u6B63\u5219\u8868\u8FBE\u5F0F" 
               value="${S(s.value||"")}">
        <label class="yyt-checkbox-label yyt-rule-enabled-label">
          <input type="checkbox" class="yyt-rule-enabled" ${s.enabled?"checked":""}>
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
    `},bindEvents(s,e){let t=U();!t||!F(s)||(this._bindRuleEditorEvents(s,t),this._bindPresetEvents(s,t),this._bindTestEvents(s,t),this._bindFileEvents(s,t))},_bindRuleEditorEvents(s,e){s.find(".yyt-rule-type").on("change",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val();kt(o,{type:r}),m("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),s.find(".yyt-rule-value").on("change",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val().trim();kt(o,{value:r})}),s.find(".yyt-rule-enabled").on("change",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).is(":checked");kt(o,{enabled:r}),m("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),s.find(".yyt-rule-delete").on("click",()=>{let o=s.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ht(o),this.renderTo(s),m("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),s.on("click",".yyt-rule-delete",t=>{let r=e(t.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ht(r),this.renderTo(s),m("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),s.find(`#${y}-add-rule`).on("click",()=>{Rt({type:"include",value:"",enabled:!0}),this.renderTo(s),m("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),s.find(`#${y}-scan-tags`).on("click",async()=>{let t=s.find(`#${y}-scan-tags`),o=s.find(`#${y}-test-input`).val();if(!o||!o.trim()){m("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}t.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await xs(o,{maxTags:50,timeoutMs:3e3}),{suggestions:n,stats:i}=vs(r,25);if(n.length===0){m("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),s.find(`#${y}-tag-suggestions-container`).hide();return}let a=s.find(`#${y}-tag-list`);s.find(`#${y}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),a.empty(),n.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${S(c)}</button>`);d.on("click",()=>{if(Ve().some(g=>g.type==="include"&&g.value===c)){m("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Rt({type:"include",value:c,enabled:!0}),this.renderTo(s),m("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),a.append(d)}),s.find(`#${y}-tag-suggestions-container`).show(),m("success",`\u53D1\u73B0 ${n.length} \u4E2A\u6807\u7B7E`)}catch(r){m("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{t.prop("disabled",!1).find("i").removeClass("fa-spin")}}),s.find(`#${y}-add-exclude-cot`).on("click",()=>{let t=Ve(),o="<!--[\\s\\S]*?-->";if(t.some(n=>n.type==="regex_exclude"&&n.value===o)){m("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Rt({type:"regex_exclude",value:o,enabled:!0}),this.renderTo(s),m("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),s.find(`#${y}-content-blacklist`).on("change",function(){let o=e(this).val().split(",").map(r=>r.trim()).filter(r=>r);Wt(o),m("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${o.length} \u4E2A\u5173\u952E\u8BCD`)}),s.find(`#${y}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(s,e){s.find(`#${y}-load-rule-preset`).on("click",()=>{let t=s.find(`#${y}-rule-preset-select`).val();if(!t){m("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let o=_s(t);o.success?(this.renderTo(s),m("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${o.preset.name}`),E.emit(_.REGEX_PRESET_LOADED,{preset:o.preset})):m("error",o.message)}),s.find(`#${y}-save-rule-preset`).on("click",()=>{let t=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!t||!t.trim())return;let o=Ss(t.trim());o.success?(this.renderTo(s),m("success",`\u9884\u8BBE "${t.trim()}" \u5DF2\u4FDD\u5B58`)):m("error",o.message)})},_bindTestEvents(s,e){s.find(`#${y}-test-extract`).on("click",()=>{let t=s.find(`#${y}-test-input`).val();if(!t||!t.trim()){m("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let o=Ve(),r=xt(),n=bt(t,o,r),i=s.find(`#${y}-test-result-container`),a=s.find(`#${y}-test-result`);i.show(),!n||!n.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),m("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${S(n)}</pre>`),m("success","\u63D0\u53D6\u5B8C\u6210"),E.emit(_.REGEX_EXTRACTED,{result:n}))}),s.find(`#${y}-test-clear`).on("click",()=>{s.find(`#${y}-test-input`).val(""),s.find(`#${y}-test-result-container`).hide()})},_bindFileEvents(s,e){s.find(`#${y}-import-rules`).on("click",()=>{s.find(`#${y}-import-rules-file`).click()}),s.find(`#${y}-import-rules-file`).on("change",async t=>{let o=t.target.files[0];if(o){try{let r=await Ge(o),n=Ms(r,{overwrite:!0});n.success?(this.renderTo(s),m("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):m("error",n.message)}catch(r){m("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(t.target).val("")}}),s.find(`#${y}-export-rules`).on("click",()=>{try{let t=Es();qe(t,`youyou_toolkit_rules_${Date.now()}.json`),m("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(t){m("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}}),s.find(`#${y}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(ws([]),Wt([]),this.renderTo(s),m("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(s){!U()||!F(s)||s.find("*").off()},getStyles(){return`
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
    `},renderTo(s){let e=this.render({});s.html(e),this.bindEvents(s,{})}}});var qr={};te(qr,{createDefaultToolDefinition:()=>vt,default:()=>la,deleteTool:()=>Rs,deleteToolPreset:()=>Hr,exportTools:()=>Os,getAllTools:()=>nt,getCurrentToolPreset:()=>Wr,getTool:()=>$t,getToolPresets:()=>ks,importTools:()=>Ds,normalizeToolDefinitionToRuntimeConfig:()=>Kt,resetTools:()=>Ls,saveTool:()=>Is,saveToolPreset:()=>Yr,setCurrentToolPreset:()=>Kr,setToolEnabled:()=>$s});function na(s={}){return!s||typeof s!="object"?{}:Object.fromEntries(Object.entries(s).map(([e,t])=>[e,vt({...t||{},id:e})]))}function Cs(s){return Array.isArray(s)?s.map(e=>String(e||"").trim()).filter(Boolean):[]}function Uo(s,e){let t=parseInt(s,10);return Number.isFinite(t)&&t>0?t:e}function jr(s,e){let t=parseInt(s,10);return Number.isFinite(t)&&t>=0?t:e}function Fr(s={}){return{enabled:s?.enabled===!0,settleMs:jr(s?.settleMs,1200),cooldownMs:jr(s?.cooldownMs,5e3)}}function ia(s=[]){let e=Array.isArray(s)?s.map(t=>({role:String(t?.role||"user").trim().toUpperCase(),content:String(t?.content||"").trim()})).filter(t=>t.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(t=>`\u3010${t.role||"USER"}\u3011
${t.content}`).join(`

`)}function aa(s,e={}){let t=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(t)return t;let o=ia(e?.config?.messages||[]);return o||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||s}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function vt(s={}){let e=new Date().toISOString(),t=s?.config||{};return{...Ee,...s,id:s?.id||Ee.id,icon:s?.icon||Ee.icon,order:Number.isFinite(s?.order)?s.order:Ee.order,promptTemplate:typeof s?.promptTemplate=="string"?s.promptTemplate:Ee.promptTemplate,extractTags:Cs(s?.extractTags),config:{execution:{...Ee.config.execution,...t.execution||{},timeout:Uo(t?.execution?.timeout,Ee.config.execution.timeout),retries:Math.max(0,parseInt(t?.execution?.retries,10)||Ee.config.execution.retries)},api:{...Ee.config.api,...t.api||{}},messages:Array.isArray(t?.messages)?t.messages:[],context:{...Ee.config.context,...t.context||{},depth:Uo(t?.context?.depth,Ee.config.context.depth),includeTags:Cs(t?.context?.includeTags),excludeTags:Cs(t?.context?.excludeTags)},automation:Fr(t?.automation)},enabled:s?.enabled!==!1,metadata:{...Ee.metadata,...s?.metadata||{},createdAt:s?.metadata?.createdAt||e,updatedAt:s?.metadata?.updatedAt||e}}}function Kt(s,e={},t={}){let o=vt({...e,id:s||e?.id||""}),r=Cs(o?.extractTags?.length?o.extractTags:o?.config?.context?.includeTags),n=String(e?.output?.apiPreset||o?.config?.api?.preset||"").trim(),i=aa(s,o),a=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():t.defaultOutputMode||"follow_ai";return{id:o.id||s,name:o.name||s,icon:o.icon||"fa-screwdriver-wrench",description:o.description||"",enabled:o.enabled!==!1,order:Number.isFinite(o.order)?o.order:100,bypass:{enabled:o?.config?.api?.useBypass===!0&&!!o?.config?.api?.bypassPreset,presetId:o?.config?.api?.bypassPreset||""},output:{mode:a,apiPreset:n,overwrite:!0,enabled:!0},automation:Fr(o?.config?.automation),extraction:{enabled:!0,maxMessages:Uo(o?.config?.context?.depth,5),selectors:r},promptTemplate:i,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:r,isCustom:!0,category:o.category||"utility",metadata:{...o.metadata||{}}}}function nt(){let s=H.get(G.TOOLS),e=na(s);return s&&JSON.stringify(s)!==JSON.stringify(e)&&H.set(G.TOOLS,e),{...Ps,...e}}function $t(s){return nt()[s]||null}function Is(s,e){if(!s||!e)return!1;let t=H.get(G.TOOLS)||{},o=!t[s]&&!Ps[s],r=vt({...t[s]||{},...e,id:s,metadata:{...t[s]?.metadata||{},...e.metadata||{},createdAt:t[s]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return t[s]=r,H.set(G.TOOLS,t),E.emit(o?_.TOOL_REGISTERED:_.TOOL_UPDATED,{toolId:s,tool:r}),!0}function Rs(s){let e=H.get(G.TOOLS)||{};return!e[s]&&!Ps[s]||Ps[s]?!1:(delete e[s],H.set(G.TOOLS,e),E.emit(_.TOOL_UNREGISTERED,{toolId:s}),!0)}function ks(){return H.get(G.PRESETS)||{}}function Yr(s,e){if(!s||!e)return!1;let t=ks(),o=!t[s];return t[s]={...e,name:s,updatedAt:new Date().toISOString()},H.set(G.PRESETS,t),E.emit(o?_.PRESET_CREATED:_.PRESET_UPDATED,{type:"tool",presetName:s,preset:t[s]}),!0}function Hr(s){let e=ks();return e[s]?(delete e[s],H.set(G.PRESETS,e),E.emit(_.PRESET_DELETED,{type:"tool",presetName:s}),!0):!1}function Wr(){return H.get(G.CURRENT_PRESET)||""}function Kr(s){return H.set(G.CURRENT_PRESET,s||""),E.emit(_.PRESET_ACTIVATED,{type:"tool",presetName:s}),!0}function $s(s,e){let t=$t(s);if(!t)return!1;let o=H.get(G.TOOLS)||{};return o[s]=vt({...t,id:s,enabled:e,metadata:{...t?.metadata||{},createdAt:t?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),H.set(G.TOOLS,o),E.emit(e?_.TOOL_ENABLED:_.TOOL_DISABLED,{toolId:s,enabled:e}),!0}function Os(){let s=H.get(G.TOOLS)||{},e=H.get(G.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:s,presets:e},null,2)}function Ds(s,e=!1){try{let t=typeof e=="object"?!!e?.overwrite:!!e,o=JSON.parse(s);if(!o||typeof o!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=t?{}:H.get(G.TOOLS)||{},n=t?{}:H.get(G.PRESETS)||{},i=0,a=0;if(o.tools&&typeof o.tools=="object"){for(let[l,c]of Object.entries(o.tools))!c||typeof c!="object"||(r[l]=vt({...c,id:l}),i+=1);H.set(G.TOOLS,r)}if(o.presets&&typeof o.presets=="object"){for(let[l,c]of Object.entries(o.presets))!c||typeof c!="object"||(n[l]={...c,name:l,updatedAt:new Date().toISOString()},a+=1);H.set(G.PRESETS,n)}return{success:!0,toolsImported:i,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(t){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${t.message}`}}}function Ls(){H.remove(G.TOOLS),H.remove(G.PRESETS),H.remove(G.CURRENT_PRESET)}var Ee,Ps,G,la,Ns=D(()=>{Pe();le();Ee={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Ps={},G={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};la={getAllTools:nt,getTool:$t,saveTool:Is,deleteTool:Rs,setToolEnabled:$s,exportTools:Os,importTools:Ds,resetTools:Ls,getToolPresets:ks,saveToolPreset:Yr,deleteToolPreset:Hr,getCurrentToolPreset:Wr,setCurrentToolPreset:Kr,createDefaultToolDefinition:vt,normalizeToolDefinitionToRuntimeConfig:Kt}});var yn={};te(yn,{TOOL_CATEGORIES:()=>Gr,TOOL_REGISTRY:()=>Ot,appendToolRuntimeHistory:()=>an,clearToolApiPreset:()=>on,default:()=>ma,ensureToolRuntimeConfig:()=>Us,getAllDefaultToolConfigs:()=>cn,getAllToolApiBindings:()=>rn,getAllToolFullConfigs:()=>Jt,getEnabledTools:()=>dn,getToolApiPreset:()=>Yo,getToolBaseConfig:()=>Bs,getToolConfig:()=>Vt,getToolFullConfig:()=>V,getToolList:()=>Zr,getToolSubTabs:()=>en,getToolWindowState:()=>pn,hasTool:()=>Fo,onPresetDeleted:()=>nn,patchToolRuntime:()=>St,registerTool:()=>Xr,resetToolConfig:()=>ln,resetToolRegistry:()=>tn,saveToolConfig:()=>Ye,saveToolWindowState:()=>un,setToolApiPreset:()=>sn,setToolApiPresetConfig:()=>ya,setToolBypassConfig:()=>ga,setToolOutputMode:()=>pa,setToolPromptTemplate:()=>fa,unregisterTool:()=>Qr,updateToolRuntime:()=>Ho});function qt(s={}){let e=Array.isArray(s?.recentWritebackHistory)?s.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(s?.lastRunAt)?s.lastRunAt:0,lastStatus:typeof s?.lastStatus=="string"?s.lastStatus:"idle",lastError:typeof s?.lastError=="string"?s.lastError:"",lastDurationMs:Number.isFinite(s?.lastDurationMs)?s.lastDurationMs:0,successCount:Number.isFinite(s?.successCount)?s.successCount:0,errorCount:Number.isFinite(s?.errorCount)?s.errorCount:0,lastMessageKey:typeof s?.lastMessageKey=="string"?s.lastMessageKey:"",lastExecutionKey:typeof s?.lastExecutionKey=="string"?s.lastExecutionKey:"",lastExecutionPath:typeof s?.lastExecutionPath=="string"?s.lastExecutionPath:"",lastWritebackStatus:typeof s?.lastWritebackStatus=="string"?s.lastWritebackStatus:"",lastFailureStage:typeof s?.lastFailureStage=="string"?s.lastFailureStage:"",lastSlotBindingKey:typeof s?.lastSlotBindingKey=="string"?s.lastSlotBindingKey:"",lastSlotRevisionKey:typeof s?.lastSlotRevisionKey=="string"?s.lastSlotRevisionKey:"",lastSlotTransactionId:typeof s?.lastSlotTransactionId=="string"?s.lastSlotTransactionId:"",lastSourceMessageId:typeof s?.lastSourceMessageId=="string"?s.lastSourceMessageId:"",lastSourceSwipeId:typeof s?.lastSourceSwipeId=="string"?s.lastSourceSwipeId:"",lastContentCommitted:s?.lastContentCommitted===!0,lastHostCommitApplied:s?.lastHostCommitApplied===!0,lastRefreshRequested:s?.lastRefreshRequested===!0,lastRefreshConfirmed:s?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof s?.lastPreferredCommitMethod=="string"?s.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof s?.lastAppliedCommitMethod=="string"?s.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(s?.lastRefreshMethodCount)?s.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(s?.lastRefreshMethods)?s.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(s?.lastRefreshConfirmChecks)?s.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof s?.lastRefreshConfirmedBy=="string"?s.lastRefreshConfirmedBy:"",lastTraceId:typeof s?.lastTraceId=="string"?s.lastTraceId:"",lastAutoRunAt:Number.isFinite(s?.lastAutoRunAt)?s.lastAutoRunAt:0,lastAutoStatus:typeof s?.lastAutoStatus=="string"?s.lastAutoStatus:"idle",lastAutoMessageId:typeof s?.lastAutoMessageId=="string"?s.lastAutoMessageId:"",lastAutoSwipeId:typeof s?.lastAutoSwipeId=="string"?s.lastAutoSwipeId:"",lastAutoRevisionKey:typeof s?.lastAutoRevisionKey=="string"?s.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof s?.lastAutoWritebackStatus=="string"?s.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:s?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof s?.lastAutoSkipReason=="string"?s.lastAutoSkipReason:"",recentWritebackHistory:e}}function ca(s,e=10){let t=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(s)?s.length<=t?s:s.slice(s.length-t):[]}function Vr(){let s=nt()||{};return Object.entries(s).filter(([e])=>!Gt[e]).map(([e,t])=>[e,t||{}])}function Jr(){let s=Array.isArray(Ot.tools?.subTabs)?[...Ot.tools.subTabs]:[],e=Vr().map(([t,o],r)=>{let n=Kt(t,o);return{id:t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+r,isCustom:!0,description:n.description||""}});return[...s,...e].sort((t,o)=>(t.order??0)-(o.order??0))}function da(s,e={}){let t=Kt(s,e,{defaultOutputMode:"follow_ai"});return{...t,runtime:qt(t.runtime)}}function jo(s){let e=Gt[s];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:qt(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let o=(nt()||{})[s]||null;return o?da(s,o):Vt(s)}function Bs(s){let e=jo(s);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function ua(s,e={},t=""){if(!s)return null;let o={...s,...e,id:s.id||e.id};o.output={...s.output||{},...e.output||{}},o.automation={enabled:s?.automation?.enabled===!0||e?.automation?.enabled===!0,settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(s?.automation?.settleMs)?s.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(s?.automation?.cooldownMs)?s.automation.cooldownMs:5e3},o.bypass={...s.bypass||{},...e.bypass||{}},o.runtime=qt({...s.runtime||{},...e.runtime||{}}),o.extraction={...s.extraction||{},...e.extraction||{}};let r=e?.output?.apiPreset||e?.apiPreset||o.output?.apiPreset||o.apiPreset||t||"";return o.output={...o.output||{},apiPreset:r},o.apiPreset=r,(!Array.isArray(o.extraction.selectors)||o.extraction.selectors.length===0)&&Array.isArray(o.extractTags)&&o.extractTags.length>0&&(o.extraction.selectors=[...o.extractTags]),(!Array.isArray(o.extractTags)||o.extractTags.length===0)&&(o.extractTags=Array.isArray(o.extraction.selectors)?[...o.extraction.selectors]:[]),s.isCustom?o.enabled=s.enabled!==!1:typeof e.enabled=="boolean"?o.enabled=e.enabled:o.enabled=s.enabled!==!1,o}function Xr(s,e){if(!s||typeof s!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let t=["name","icon","component"];for(let o of t)if(!e[o])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${o}`),!1;return Fe[s]={id:s,...e,order:e.order??Object.keys(Fe).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${s}`),!0}function Qr(s){return Fe[s]?(delete Fe[s],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${s}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${s}`),!1)}function Zr(s=!0){let e=Object.values(Fe).map(t=>t.id==="tools"?{...t,subTabs:Jr()}:t);return s?e.sort((t,o)=>(t.order??0)-(o.order??0)):e}function Vt(s){return s==="tools"&&Fe[s]?{...Fe[s],subTabs:Jr()}:Fe[s]||null}function Fo(s){return!!Fe[s]}function en(s){let e=Vt(s);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function tn(){Fe={...Ot},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function sn(s,e){if(!Fo(s))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${s}`),!1;let t=x.get(Me)||{};return t[s]=e||"",x.set(Me,t),console.log(`[ToolRegistry] \u5DE5\u5177 "${s}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Yo(s){return(x.get(Me)||{})[s]||""}function on(s){let e=x.get(Me)||{};delete e[s],x.set(Me,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function rn(){return x.get(Me)||{}}function nn(s){let e=x.get(Me)||{},t=!1;for(let o in e)e[o]===s&&(e[o]="",t=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${o}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));t&&x.set(Me,e)}function V(s){let e=jo(s);if(!e)return Vt(s);let o=(x.get(wt)||{})[s]||{},r=Yo(s);return ua({...e,id:s},o,r)}function Us(s){if(!s)return!1;let e=jo(s);if(!e)return!1;let t=x.get(wt)||{};if(t[s])return!0;let o={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};t[s]=o,x.set(wt,t);let r=x.get(Me)||{};return r[s]=o.output?.apiPreset||o.apiPreset||"",x.set(Me,r),E.emit(_.TOOL_UPDATED,{toolId:s,config:o}),!0}function Ye(s,e,t={}){if(!s||!V(s))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",s),!1;let{emitEvent:o=!0}=t,r=x.get(wt)||{},n=x.get(Me)||{},i=e?.output?.apiPreset??e?.apiPreset??"",a=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","extraction","runtime"];return r[s]={},a.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){r[s][l]={...e.output,apiPreset:i};return}if(l==="apiPreset"){r[s][l]=i;return}r[s][l]=e[l]}}),r[s].apiPreset===void 0&&(r[s].apiPreset=i),!r[s].output&&e.output!==void 0&&(r[s].output={...e.output||{},apiPreset:i}),x.set(wt,r),n[s]=i,x.set(Me,n),o&&E.emit(_.TOOL_UPDATED,{toolId:s,config:r[s]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${s}`),!0}function pa(s,e){let t=V(s);return t?Ye(s,{...t,output:{...t.output,mode:e}}):!1}function ya(s,e){let t=V(s);return t?Ye(s,{...t,apiPreset:e,output:{...t.output,apiPreset:e}}):!1}function ga(s,e){let t=V(s);return t?Ye(s,{...t,bypass:{...t.bypass,...e}}):!1}function fa(s,e){let t=V(s);return t?Ye(s,{...t,promptTemplate:e}):!1}function St(s,e,t={}){let o=V(s);if(!o)return!1;let{touchLastRunAt:r=!1,emitEvent:n=!1}=t,i=qt({...o.runtime||{},...e||{}});return r&&(i.lastRunAt=Date.now()),Ye(s,{...o,runtime:i},{emitEvent:n})}function an(s,e,t={},o={}){let r=V(s);if(!r)return!1;let{limit:n=10,emitEvent:i=!1}=o,a=qt(r.runtime||{}),l="recentWritebackHistory",c={id:t?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:t?.at||Date.now(),...t};return a[l]=ca([...Array.isArray(a[l])?a[l]:[],c],n),c?.traceId&&(a.lastTraceId=c.traceId),Ye(s,{...r,runtime:a},{emitEvent:i})}function Ho(s,e){return St(s,e,{touchLastRunAt:!0,emitEvent:!0})}function ln(s){if(!s||!Gt[s])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",s),!1;let e=x.get(wt)||{};return delete e[s],x.set(wt,e),E.emit(_.TOOL_UPDATED,{toolId:s,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${s}`),!0}function cn(){return{...Gt}}function Jt(){let s=new Set([...Object.keys(Gt),...Vr().map(([e])=>e)]);return Array.from(s).map(e=>V(e)).filter(Boolean)}function dn(){return Jt().filter(s=>s&&s.enabled)}function un(s,e){let t=x.get(zo)||{};t[s]={...e,updatedAt:Date.now()},x.set(zo,t)}function pn(s){return(x.get(zo)||{})[s]||null}var wt,Me,zo,Gt,Ot,Gr,Fe,ma,Tt=D(()=>{Pe();le();Ns();wt="tool_configs",Me="tool_api_bindings",zo="tool_window_states";Gt={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["boo_FM"]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},extraction:{enabled:!0,maxMessages:5,selectors:["status_block"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]},youyouReview:{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",description:"\u5728\u56DE\u590D\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50",enabled:!0,order:5,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},extraction:{enabled:!0,maxMessages:5,selectors:["youyou"]},promptTemplate:`\u8BF7\u57FA\u4E8E\u4EE5\u4E0B\u6700\u65B0\u5267\u60C5\u56DE\u590D\uFF0C\u751F\u6210\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u3002

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},Ot={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},Gr={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Fe={...Ot};ma={TOOL_REGISTRY:Ot,TOOL_CATEGORIES:Gr,registerTool:Xr,unregisterTool:Qr,getToolList:Zr,getToolConfig:Vt,hasTool:Fo,getToolSubTabs:en,resetToolRegistry:tn,setToolApiPreset:sn,getToolApiPreset:Yo,clearToolApiPreset:on,getAllToolApiBindings:rn,onPresetDeleted:nn,saveToolWindowState:un,getToolWindowState:pn,getToolBaseConfig:Bs,ensureToolRuntimeConfig:Us,getToolFullConfig:V,patchToolRuntime:St,appendToolRuntimeHistory:an,saveToolConfig:Ye,resetToolConfig:ln,getAllDefaultToolConfigs:cn,getAllToolFullConfigs:Jt,getEnabledTools:dn}});var ke,Wo=D(()=>{Ue();Ns();Tt();ke={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(s){if(!s)return;let t=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!t){m("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}t.switchMainTab("tools"),t.switchSubTab("tools",s)},render(s){let e=nt(),t=Object.entries(e),o=t.filter(([,r])=>r?.enabled!==!1).length;return`
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
                <strong class="yyt-tool-manage-stat-value">${t.length}</strong>
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
    `},_renderToolList(s){let e=Object.entries(s);return e.length?e.map(([t,o])=>`
      <div class="yyt-tool-item ${o.enabled?"yyt-enabled":"yyt-disabled"}" data-tool-id="${t}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${S(o.name)}</span>
            <span class="yyt-tool-category">${S(o.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${o.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${S(o.description)}</div>
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
      `},bindEvents(s,e){let t=U();!t||!F(s)||(this._bindToolEvents(s,t),this._bindFileEvents(s,t))},_bindToolEvents(s,e){s.find(".yyt-tool-toggle input").on("change",t=>{let o=e(t.currentTarget).closest(".yyt-tool-item"),r=o.data("tool-id"),n=e(t.currentTarget).is(":checked");$s(r,n),o.toggleClass("yyt-enabled",n).toggleClass("yyt-disabled",!n),m("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),s.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(s,e,null)}),s.find('.yyt-tool-item [data-action="config"]').on("click",t=>{let o=e(t.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(o)}),s.find('.yyt-tool-item [data-action="edit"]').on("click",t=>{let o=e(t.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(s,e,o)}),s.find('.yyt-tool-item [data-action="delete"]').on("click",t=>{let o=e(t.currentTarget).closest(".yyt-tool-item").data("tool-id"),r=$t(o);if(!o||!r||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${r.name}\u201D\u5417\uFF1F`))return;if(!Rs(o)){m("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(s),m("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(s,e){s.find("#yyt-import-tools").on("click",()=>{s.find("#yyt-import-tools-file").click()}),s.find("#yyt-import-tools-file").on("change",async t=>{let o=t.target.files[0];if(o){try{let r=await Ge(o),n=Ds(r,{overwrite:!1});m(n.success?"success":"error",n.message),n.success&&this.renderTo(s)}catch(r){m("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(t.target).val("")}}),s.find("#yyt-export-tools").on("click",()=>{try{let t=Os();qe(t,`youyou_toolkit_tools_${Date.now()}.json`),m("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(t){m("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}}),s.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Ls(),this.renderTo(s),m("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(s,e,t){let o=t?$t(t):null,r=!!o,n=`
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
                       value="${o?S(o.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${o?S(o.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;e("#yyt-tool-dialog-overlay").remove(),s.append(n);let i=e("#yyt-tool-dialog-overlay"),a=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),i.on("click",function(l){l.target===this&&a()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),p=parseInt(e("#yyt-tool-timeout").val())||6e4,h=parseInt(e("#yyt-tool-retries").val())||3;if(!l){m("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let g=t||`tool_${Date.now()}`;if(!Is(g,{name:l,category:c,description:d,promptTemplate:o?.promptTemplate||"",extractTags:Array.isArray(o?.extractTags)?o.extractTags:[],config:{execution:{timeout:p,retries:h},api:o?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(o?.config?.messages)?o.config.messages:[],context:{depth:o?.config?.context?.depth||3,includeTags:Array.isArray(o?.config?.context?.includeTags)?o.config.context.includeTags:[],excludeTags:Array.isArray(o?.config?.context?.excludeTags)?o.config.context.excludeTags:[]}},enabled:o?.enabled!==!1})){m("error",r?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Us(g),a(),this.renderTo(s),m("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),r||this._openToolConfig(g)})},destroy(s){!U()||!F(s)||s.find("*").off()},getStyles(){return`
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
    `},renderTo(s){let e=this.render({});s.html(e),this.bindEvents(s,{})}}});var gn={};te(gn,{BypassManager:()=>zs,DEFAULT_BYPASS_PRESETS:()=>Xe,addMessage:()=>Aa,buildBypassMessages:()=>ka,bypassManager:()=>k,createPreset:()=>va,default:()=>$a,deleteMessage:()=>Pa,deletePreset:()=>Sa,duplicatePreset:()=>Ta,exportPresets:()=>Ia,getAllPresets:()=>ba,getDefaultPresetId:()=>_a,getEnabledMessages:()=>Ma,getPreset:()=>xa,getPresetList:()=>qo,importPresets:()=>Ra,setDefaultPresetId:()=>Ea,updateMessage:()=>Ca,updatePreset:()=>wa});var Je,Dt,Ko,Xe,ha,zs,k,ba,qo,xa,va,wa,Sa,Ta,_a,Ea,Ma,Aa,Ca,Pa,Ia,Ra,ka,$a,Xt=D(()=>{Pe();le();Je="bypass_presets",Dt="default_bypass_preset",Ko="current_bypass_preset",Xe={},ha=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),zs=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=x.get(Je,{});return this._cache={...Xe,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((t,o)=>(o.updatedAt||0)-(t.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:t,name:o,description:r,messages:n}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!o||typeof o!="string"||!o.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=t.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:o.trim(),description:r||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),E.emit(_.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(e,t){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.id&&t.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...o,...t,id:e,updatedAt:Date.now()};return this._savePreset(e,r),E.emit(_.BYPASS_PRESET_UPDATED,{presetId:e,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${o.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Xe[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let t=this.getPreset(e);if(!t)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=x.get(Je,{});return delete o[e],x.set(Je,o),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),E.emit(_.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${t.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,t,o){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!t||!t.trim())&&(t=`${e}_copy_${Date.now()}`),this.presetExists(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(r)),id:t.trim(),name:o||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(t.trim(),n),E.emit(_.BYPASS_PRESET_CREATED,{presetId:t,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,t){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:t.role||"SYSTEM",content:t.content||"",enabled:t.enabled!==!1,deletable:t.deletable!==!1},n=[...o.messages||[],r];return this.updatePreset(e,{messages:n})}updateMessage(e,t,o){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=r.messages||[],i=n.findIndex(l=>l.id===t);if(i===-1)return{success:!1,message:`\u6D88\u606F "${t}" \u4E0D\u5B58\u5728`};let a=[...n];return a[i]={...a[i],...o},this.updatePreset(e,{messages:a})}deleteMessage(e,t){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=o.messages||[],n=r.find(a=>a.id===t);if(!n)return{success:!1,message:`\u6D88\u606F "${t}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=r.filter(a=>a.id!==t);return this.updatePreset(e,{messages:i})}getEnabledMessages(e){let t=this.getPreset(e);return!t||!t.enabled?[]:(t.messages||[]).filter(o=>o.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=x.get(Dt,null);return e==="undefined"||e==="null"||e===""?(x.remove(Dt),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(x.set(Dt,e),E.emit(_.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let o=this.getPreset(e);if(!o)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(o,null,2)}let t=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(t)},null,2)}importPresets(e,t={}){let{overwrite:o=!1}=t,r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(r)?r:r.presets?r.presets:[r];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=x.get(Je,{}),a=0;for(let l of n)!l.id||typeof l.id!="string"||l.name&&(Xe[l.id]&&!o||!o&&i[l.id]||(i[l.id]={...l,updatedAt:Date.now()},a++));return a>0&&(x.set(Je,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let t=e?.bypass?.presetId;return t?this.getPreset(t):this.getDefaultPreset()}buildBypassMessages(e){let t=this.getToolBypassPreset(e);return t?this.getEnabledMessages(t.id):[]}_savePreset(e,t){let o=x.get(Je,{});o[e]=t,x.set(Je,o),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=x.get(Je,{}),t={},o=!1,r=Array.isArray(e)?e.map((n,i)=>[n?.id||n?.name||`legacy_${i}`,n]):Object.entries(e||{});for(let[n,i]of r){let a=this._normalizePreset(n,i,t);if(!a){o=!0;continue}t[a.id]=a,(!e?.[a.id]||e?.[a.id]?.id!==a.id)&&(o=!0)}o&&x.set(Je,t),this._migrateDefaultPreset(t),this._cache=null,this._migrated=!0}_normalizePreset(e,t,o={}){if(!t||typeof t!="object")return null;let r=typeof t.name=="string"?t.name.trim():"",n=typeof t.id=="string"?t.id.trim():"",i=typeof e=="string"?e.trim():"";if(!r&&i&&i!=="undefined"&&i!=="null"&&(r=i),this._isLegacySamplePreset(r,n)||(!n&&i&&i!=="undefined"&&i!=="null"&&(n=i),!n&&r&&r!=="undefined"&&r!=="null"&&(n=this._generatePresetId(r,o)),!r||!n||n==="undefined"||r==="undefined"))return null;let l=Array.isArray(t.messages)?t.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${n}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...t,id:n,name:r,description:typeof t.description=="string"?t.description:"",enabled:t.enabled!==!1,messages:l,createdAt:t.createdAt||Date.now(),updatedAt:t.updatedAt||Date.now()}}_migrateDefaultPreset(e){let t=x.get(Dt,null),o=x.get(Ko,null),r=t??o;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!e[r]&&(r=Object.values(e).find(i=>i.name===r)?.id||null),r?x.set(Dt,r):x.remove(Dt),x.has(Ko)&&x.remove(Ko)}_isLegacySamplePreset(e,t=""){return e?t==="standard"||t==="enhanced"||t==="jailbreak"||ha.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,t={}){let o=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=o,n=1;for(;t[r];)r=`${o}_${n++}`;return r}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},k=new zs,ba=()=>k.getAllPresets(),qo=()=>k.getPresetList(),xa=s=>k.getPreset(s),va=s=>k.createPreset(s),wa=(s,e)=>k.updatePreset(s,e),Sa=s=>k.deletePreset(s),Ta=(s,e,t)=>k.duplicatePreset(s,e,t),_a=()=>k.getDefaultPresetId(),Ea=s=>k.setDefaultPresetId(s),Ma=s=>k.getEnabledMessages(s),Aa=(s,e)=>k.addMessage(s,e),Ca=(s,e,t)=>k.updateMessage(s,e,t),Pa=(s,e)=>k.deleteMessage(s,e),Ia=s=>k.exportPresets(s),Ra=(s,e)=>k.importPresets(s,e),ka=s=>k.buildBypassMessages(s),$a=k});var fn={};te(fn,{DEFAULT_SETTINGS:()=>Qt,SettingsService:()=>js,default:()=>Oa,settingsService:()=>Ae});var Qt,Go,js,Ae,Oa,Zt=D(()=>{Pe();le();Qt={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{enabled:!1,autoRequestEnabled:!0,settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},Go="settings_v2",js=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=x.get(Go,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),x.set(Go,this._cache),E.emit(_.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let t=this.getSettings(),o=this._deepMerge(t,e);this.saveSettings(o)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Qt)),x.set(Go,this._cache),E.emit(_.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,t=null){let o=this.getSettings(),r=e.split("."),n=o;for(let i of r)if(n&&typeof n=="object"&&i in n)n=n[i];else return t;return n}set(e,t){let o=JSON.parse(JSON.stringify(this.getSettings())),r=e.split("."),n=o;for(let i=0;i<r.length-1;i+=1){let a=r[i];a in n||(n[a]={}),n=n[a]}n[r[r.length-1]]=t,this.saveSettings(o)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Qt)),e)}_deepMerge(e,t){let o={...e};for(let r in t)t[r]&&typeof t[r]=="object"&&!Array.isArray(t[r])?o[r]=this._deepMerge(e[r]||{},t[r]):o[r]=t[r];return o}},Ae=new js,Oa=Ae});var hn={};te(hn,{ContextInjector:()=>Ys,DEFAULT_INJECTION_OPTIONS:()=>mn,WRITEBACK_METHODS:()=>de,WRITEBACK_RESULT_STATUS:()=>Fs,contextInjector:()=>Hs,default:()=>Na});function Vo(s){return typeof s=="number"&&Number.isFinite(s)?String(s):typeof s=="string"&&s.trim()?s.trim():""}function it(s,e){let t=String(e||"").trim();return t?Array.isArray(s)?(s.includes(t)||s.push(t),s):[t]:s}var me,Lt,mn,Fs,de,Da,La,Ys,Hs,Na,Jo=D(()=>{le();me="YouYouToolkit_toolOutputs",Lt="YouYouToolkit_injectedContext",mn={overwrite:!0,enabled:!0};Fs={SUCCESS:"success",FAILED:"failed"},de={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Da=60,La=3;Ys=class{constructor(){this.debugMode=!1}async inject(e,t,o={}){return(await this.injectDetailed(e,t,o)).success}async injectDetailed(e,t,o={}){let r={...mn,...o},n=this._createWritebackResult(e,r);if(!e||t===void 0||t===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!Vo(r.sourceMessageId))return this._log("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;let i=n.chatId,a={toolId:e,content:String(t),updatedAt:Date.now(),sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,options:r};E.emit(_.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:i,content:a.content,sourceMessageId:a.sourceMessageId,sourceSwipeId:a.sourceSwipeId,effectiveSwipeId:a.sourceSwipeId,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",traceId:r.traceId||"",sessionKey:r.sessionKey||"",options:r});let l=await this._insertToolOutputToBoundAssistantSlot(e,a,r,n);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${i}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:t}=this._getChatRuntime(),o=this._findAssistantMessageIndex(t,e);if(o<0)return"";let r=t[o]||{},n=r[Lt];if(typeof n=="string"&&n.trim())return n.trim();let i=r[me];return i&&typeof i=="object"?this._buildMessageInjectedContext(i).trim():""}catch(t){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",t),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),t=this._findAssistantMessageIndex(e,null);if(t<0)return{};let r=(e[t]||{})[me];return r&&typeof r=="object"?r:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,t){if(!t)return null;try{let{chat:o}=this._getChatRuntime(),r=this._findAssistantMessageIndex(o,null);return r<0?null:o[r]?.[me]?.[t]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,t){if(!t)return!1;try{let{api:o,context:r,chat:n}=this._getChatRuntime(),i=this._findAssistantMessageIndex(n,null);if(i<0)return!1;let a=n[i],l=a?.[me];if(!l||!l[t])return!1;delete l[t],a[me]=l,a[Lt]=this._buildMessageInjectedContext(l);let c=r?.saveChat||o?.saveChat||null;return typeof c=="function"&&await c.call(r||o),E.emit(_.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:t}),!0}catch(o){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",o),!1}}async clearAllContext(e){try{let{api:t,context:o,chat:r}=this._getChatRuntime(),n=this._findAssistantMessageIndex(r,null);if(n<0)return!1;let i=r[n];delete i[me],delete i[Lt];let a=o?.saveChat||t?.saveChat||null;return typeof a=="function"&&await a.call(o||t),E.emit(_.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(t){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",t),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,t){return!!this.getToolContext(e,t)}getContextSummary(e){let t=this._getLatestAssistantMessageOutputs(),o=Object.entries(t).map(([r,n])=>({toolId:r,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:o,totalCount:o.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,t={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,t=e.SillyTavern||null,o=t?.getContext?.()||null,r=Array.isArray(o?.chat)?o.chat:[],n=Array.isArray(t?.chat)?t.chat:[],i=r.length?r:n;return{topWindow:e,api:t,context:o,chat:i,contextChat:r,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,t={}){let o=de.SET_CHAT_MESSAGE;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:t.traceId||"",sessionKey:t.sessionKey||"",sourceMessageId:t.sourceMessageId||null,sourceSwipeId:t.sourceSwipeId||t.effectiveSwipeId||null,effectiveSwipeId:t.effectiveSwipeId||t.sourceSwipeId||null,slotBindingKey:t.slotBindingKey||"",slotRevisionKey:t.slotRevisionKey||"",slotTransactionId:t.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:de.NONE,commit:{preferredMethod:o,attemptedMethods:[],appliedMethod:de.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:Fs.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(t=>setTimeout(t,e))}_collectWritebackVerification(e,t,o,r,n,i=null){let a=e?.contextChat?.[o]||e?.apiChat?.[o]||t?.[o]||i||null,l=this._getWritableMessageField(a).text||"",c=a?.[me]?.[r],d=n?l.includes(n):!0,p=!!(c&&String(c.content||"").trim()===n);return{latestMessage:a,latestText:l,textIncludesContent:d,mirrorStored:p}}async _confirmRefresh(e,t,o,r,n,i=null){let a=1,l=this._collectWritebackVerification(e,t,o,r,n,i);for(let c=0;c<La;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:a,confirmedBy:"text_and_mirror_present"};await this._wait(Da),a+=1,l=this._collectWritebackVerification(e,t,o,r,n,i)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:a,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}_inferBlockType(e){let t=String(e||"").trim();if(!t)return"empty";let o=t.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return o?.[1]?o[1]:"plain_text"}_stripExactStoredBlock(e,t){let o=String(e||""),r=String(t||"").trim();return r?o.includes(r)?{text:o.replace(r,"").trimEnd(),removed:!0}:{text:o,removed:!1}:{text:o,removed:!1}}_syncMessageToRuntimeChats(e,t,o){let{contextChat:r,apiChat:n}=e||{},i=a=>{!Array.isArray(a)||t<0||t>=a.length||a[t]!==o&&(a[t]={...a[t]||{},...o})};i(r),i(n)}_notifyMessageUpdated(e,t){try{let{api:o,topWindow:r}=e||{},n=o?.eventSource||null,a=(o?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";n&&typeof n.emit=="function"&&(n.emit(a,t),typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(()=>{n.emit(a,t)}):typeof r?.setTimeout=="function"&&r.setTimeout(()=>{n.emit(a,t)},30))}catch(o){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",o)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let t=String(e.role||"").toLowerCase();return t==="assistant"||t==="ai"||!t}_findAssistantMessageIndex(e,t){let o=Array.isArray(e)?e:[];if(!o.length)return-1;let r=t!=null&&t!=="",n=(i,a)=>{if(!this._isAssistantMessage(i)||t==null||t==="")return!1;let l=String(t).trim();return l?[i.message_id,i.id,i.messageId,i.mes_id,a].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let i=o.length-1;i>=0;i-=1)if(n(o[i],i))return i;if(r)return-1;for(let i=o.length-1;i>=0;i-=1)if(this._isAssistantMessage(o[i]))return i;return-1}_buildMessageInjectedContext(e){let o=Object.entries(e&&typeof e=="object"?e:{}).sort(([,n],[,i])=>(n?.updatedAt||0)-(i?.updatedAt||0));if(!o.length)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,i]of o)r.push(`[${n}]`),r.push(i?.content||""),r.push("");return r.join(`
`)}_getWritableMessageField(e){let t=["mes","message","content","text"];for(let o of t)if(typeof e?.[o]=="string")return{key:o,text:e[o]};return{key:"mes",text:""}}_applyMessageText(e,t,o={}){let r=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],i=!1;if(n.forEach(a=>{typeof r[a]=="string"&&(r[a]=t,i=!0)}),i||(r.mes=t,r.message=t),Array.isArray(r.swipes)){let a=Number.parseInt(Vo(o?.sourceSwipeId||o?.effectiveSwipeId),10),l=Number.isInteger(a)?a:Number.isInteger(r.swipe_id)?r.swipe_id:Number.isInteger(r.swipeId)?r.swipeId:0;l>=0&&l<r.swipes.length&&(r.swipes[l]=t,r.swipe_id=l,r.swipeId=l)}return r}_stripExistingToolOutput(e,t=[]){let o=String(e||"");return(Array.isArray(t)?t:[]).forEach(n=>{let i=String(n||"").trim();if(!i)return;if(i.startsWith("regex:")){try{let d=new RegExp(i.slice(6).trim(),"gis");o=o.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",i,d)}return}let a=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${a}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${a}>\\s*`,"gi"),c=new RegExp(`\\{${a}\\|[\\s\\S]*?\\}\\s*`,"gi");o=o.replace(l,""),o=o.replace(c,"")}),o.trimEnd()}_stripPreviousStoredToolContent(e,t){let o=String(e||""),r=String(t||"").trim();return r?o.replace(r,"").trimEnd():o.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,t,o={},r=null){let n=r||this._createWritebackResult(e,o);try{let i=this._getChatRuntime(),{api:a,context:l,chat:c}=i;if(!Array.isArray(c)||!c.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let d=this._findAssistantMessageIndex(c,o.sourceMessageId);if(d<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;n.messageIndex=d,n.steps.foundTargetMessage=!0;let p=c[d],{key:h,text:g}=this._getWritableMessageField(p);n.textField=h;let v=p[me]&&typeof p[me]=="object"?p[me]:{},A=v?.[e]||{},B=A?.content||"",z=A?.blockText||B||"",ue=Object.entries(v).filter(([Y])=>Y!==e).map(([,Y])=>Y||{}),X=String(t.content||"").trim(),pe=this._inferBlockType(X),ae={toolId:e,messageId:o.sourceMessageId||p?.message_id||p?.messageId||d,blockType:pe,insertedAt:t.updatedAt,replaceable:o.overwrite!==!1};n.blockIdentity=ae;let se=o.overwrite===!1?{text:String(g||""),removed:!1}:this._stripExactStoredBlock(g,z),T=se.text,I="";o.overwrite!==!1&&z&&!se.removed&&(I="previous_block_not_found");let $=o.overwrite===!1?T:this._stripExistingToolOutput(T,o.extractionSelectors),C=$!==T;T=$;let j=o.overwrite===!1?T:this._stripPreviousStoredToolContent(T,B),oe=j!==T;T=j,n.replacedExistingBlock=se.removed||C||oe;let ne=[(o.overwrite===!1?String(g||""):T).trimEnd(),X].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!X;let _e=ue.every(Y=>{let u=String(Y?.blockText||Y?.content||"").trim();return u?ne.includes(u):!0});n.preservedOtherToolBlocks=_e,_e?I&&(n.conflictDetected=!0,n.conflictReason=I):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let Ce={...v,[e]:{toolId:e,content:X,blockText:X,blockType:pe,blockIdentity:ae,updatedAt:t.updatedAt,sourceMessageId:t.sourceMessageId||null}};p[h]=ne,this._applyMessageText(p,ne,o),p[me]=Ce,p[Lt]=this._buildMessageInjectedContext(Ce),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(i,d,p),n.steps.runtimeSynced=!0;let Ne=l?.setChatMessages||a?.setChatMessages||i?.topWindow?.setChatMessages||null,be=l?.setChatMessage||a?.setChatMessage||i?.topWindow?.setChatMessage||null;n.commit.preferredMethod=typeof be=="function"?de.SET_CHAT_MESSAGE:typeof Ne=="function"?de.SET_CHAT_MESSAGES:de.LOCAL_ONLY;let He=!1;if(typeof be=="function"){it(n.commit.attemptedMethods,de.SET_CHAT_MESSAGE);try{await be.call(l||a||i?.topWindow,{message:ne,mes:ne,content:ne,text:ne},d,{swipe_id:Vo(o.sourceSwipeId||o.effectiveSwipeId)||"current",refresh:"display_and_render_current"}),n.steps.hostSetChatMessage=!0,n.hostUpdateMethod=de.SET_CHAT_MESSAGE,n.hostCommitApplied=!0,n.commit.appliedMethod=de.SET_CHAT_MESSAGE,n.commit.hostCommitApplied=!0,He=!0}catch(Y){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",Y),n.errors.push(`setChatMessage: ${Y?.message||String(Y)}`)}}if(!He&&typeof Ne=="function"){it(n.commit.attemptedMethods,de.SET_CHAT_MESSAGES);try{await Ne.call(l||a||i?.topWindow,[{message_id:d,message:ne,mes:ne,content:ne,text:ne}],{refresh:"affected"}),n.steps.hostSetChatMessages=!0,n.hostUpdateMethod=de.SET_CHAT_MESSAGES,n.hostCommitApplied=!0,n.commit.appliedMethod=de.SET_CHAT_MESSAGES,n.commit.hostCommitApplied=!0,n.commit.fallbackUsed=!0,He=!0}catch(Y){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",Y),n.errors.push(`setChatMessages: ${Y?.message||String(Y)}`)}}if(He||(it(n.commit.attemptedMethods,de.LOCAL_ONLY),n.commit.appliedMethod=de.LOCAL_ONLY,n.commit.fallbackUsed=n.commit.preferredMethod!==de.LOCAL_ONLY),n.hostUpdateMethod=n.commit.appliedMethod,typeof be=="function")try{await be.call(l||a||i?.topWindow,{},d),n.steps.refreshForceSetChatMessage=!0,n.refreshRequested=!0,it(n.refresh.requestMethods,"setChatMessage(force_refresh)")}catch(Y){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",Y),n.errors.push(`setChatMessage(refresh): ${Y?.message||String(Y)}`)}let Q=l?.saveChat||a?.saveChat||null,Z=l?.saveChatDebounced||a?.saveChatDebounced||null;typeof Z=="function"&&(Z.call(l||a),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,it(n.refresh.requestMethods,"saveChatDebounced")),typeof Q=="function"&&(await Q.call(l||a),n.steps.saveChat=!0,n.refreshRequested=!0,it(n.refresh.requestMethods,"saveChat")),this._notifyMessageUpdated(i,d),n.steps.notifiedMessageUpdated=!0;let Ze=String(t.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,it(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,it(n.refresh.requestMethods,"MESSAGE_UPDATED")),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let Be=await this._confirmRefresh(i,c,d,e,Ze,p);return n.verification.textIncludesContent=Be.textIncludesContent,n.verification.mirrorStored=Be.mirrorStored,n.verification.refreshConfirmed=Be.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(Be.confirmChecks)||0,n.refresh.confirmedBy=Be.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?Fs.SUCCESS:Fs.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),n}catch(i){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",i),n.error=i?.message||String(i),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let t=this._getChatRuntime(),{chat:o}=t,r=this._findAssistantMessageIndex(o,e);if(r<0)return null;let n=o[r]||null,i=this._getWritableMessageField(n).text||"",a=n?.[me]&&typeof n[me]=="object"?n[me]:{},l=Object.values(a).reduce((c,d)=>{let p=String(d?.blockText||d?.content||"").trim();return!p||!c.includes(p)?c:c.replace(p,"").trimEnd()},String(i||"")).trim();return{messageIndex:r,message:n,messageText:i,baseText:l,toolOutputs:a,injectedContext:typeof n?.[Lt]=="string"?n[Lt]:this._buildMessageInjectedContext(a)}}catch(t){return this._log("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",t),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext(),r=[t?.chatId,t?.chat_id,t?.chat_filename,t?.chatMetadata?.chatId,t?.chatMetadata?.chat_id,t?.chatMetadata?.file_name,t?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(i=>typeof i=="string"&&i.trim());if(r)return r;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},Hs=new Ys,Na=Hs});var xn={};te(xn,{BUILTIN_VARIABLES:()=>bn,VariableResolver:()=>Ws,default:()=>Ba,variableResolver:()=>at});var bn,Ws,at,Ba,Xo=D(()=>{le();bn={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Ws=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,t){if(typeof e!="string")return e;let o=e;return o=this._resolveBuiltinVariables(o,t),o=this._resolveCustomVariables(o,t),o=this._resolveRegexVariables(o,t),o}resolveObject(e,t){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>this.resolveObject(r,t));let o={};for(let[r,n]of Object.entries(e))typeof n=="string"?o[r]=this.resolveTemplate(n,t):typeof n=="object"&&n!==null?o[r]=this.resolveObject(n,t):o[r]=n;return o}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,t){e&&(this.customVariables.set(e,t),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,t){!e||typeof t!="function"||(this.variableHandlers.set(e,t),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,t]of Object.entries(bn))e.push({name:`{{${t.name}}}`,description:t.description,category:t.category,type:"builtin"});for(let[t,o]of this.customVariables)e.push({name:`{{${t}}}`,description:typeof o=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],t={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},o={};for(let r of this.getAvailableVariables())o[r.category]||(o[r.category]=[]),o[r.category].push(r);for(let[r,n]of Object.entries(t))if(o[r]&&o[r].length>0){e.push(`\u3010${n}\u3011`);for(let i of o[r])e.push(`  ${i.name} - ${i.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,t)=>(t.regexResults||t.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,t){let o=e;return o=o.replace(/\{\{lastUserMessage\}\}/gi,t.lastUserMessage||t.raw?.lastUserMessage||""),o=o.replace(/\{\{lastAiMessage\}\}/gi,t.lastAiMessage||t.raw?.lastAiMessage||""),o=o.replace(/\{\{chatHistory\}\}/gi,()=>{let r=t.chatHistory||t.raw?.chatHistory||[];return this._formatChatHistory(r)}),o=o.replace(/\{\{characterCard\}\}/gi,()=>{let r=t.characterCard||t.raw?.characterCard;return r?this._formatCharacterCard(r):""}),o=o.replace(/\{\{toolName\}\}/gi,t.toolName||t.raw?.toolName||""),o=o.replace(/\{\{toolId\}\}/gi,t.toolId||t.raw?.toolId||""),o=o.replace(/\{\{toolPromptMacro\}\}/gi,t.toolPromptMacro||t.raw?.toolPromptMacro||""),o=o.replace(/\{\{toolContentMacro\}\}/gi,t.toolContentMacro||t.raw?.toolContentMacro||""),o=o.replace(/\{\{injectedContext\}\}/gi,t.injectedContext||t.raw?.injectedContext||""),o=o.replace(/\{\{extractedContent\}\}/gi,t.extractedContent||t.raw?.extractedContent||""),o=o.replace(/\{\{recentMessagesText\}\}/gi,t.recentMessagesText||t.raw?.recentMessagesText||""),o=o.replace(/\{\{rawRecentMessagesText\}\}/gi,t.rawRecentMessagesText||t.raw?.rawRecentMessagesText||""),o=o.replace(/\{\{userMessage\}\}/gi,t.userMessage||t.raw?.userMessage||""),o=o.replace(/\{\{previousToolOutput\}\}/gi,t.previousToolOutput||t.raw?.previousToolOutput||""),o}_resolveCustomVariables(e,t){let o=e;for(let[r,n]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof n=="function"?o=o.replace(i,()=>{try{return n(t)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,a),""}}):o=o.replace(i,String(n))}return o}_resolveRegexVariables(e,t){let o=e;for(let[r,n]of this.variableHandlers){let i=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");o=o.replace(i,(a,l)=>{try{return n(l,t)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${l}:`,c),""}})}return o}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(t=>{let o=t.role||"unknown",r=t.content||t.mes||"";return`[${o}]: ${r}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let t=[];return e.name&&t.push(`\u59D3\u540D: ${e.name}`),e.description&&t.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&t.push(`\u6027\u683C: ${e.personality}`),e.scenario&&t.push(`\u573A\u666F: ${e.scenario}`),t.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},at=new Ws,Ba=at});var wn={};te(wn,{DEFAULT_PROMPT_TEMPLATE:()=>vn,ToolPromptService:()=>Ks,default:()=>Ua,toolPromptService:()=>qs});var vn,Ks,qs,Ua,Qo=D(()=>{le();Xt();Xo();vn="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Ks=class{constructor(){this.debugMode=!1}_buildVariableContext(e,t={}){let o=this._getPromptTemplate(e),r=at.buildToolContext({...t,toolName:e?.name||t?.toolName||"",toolId:e?.id||t?.toolId||""}),n=at.resolveTemplate(o,r).trim(),i=String(t?.toolContentMacro||t?.input?.toolContentMacro||"").trim();return at.buildToolContext({...t,toolName:e?.name||t?.toolName||"",toolId:e?.id||t?.toolId||"",toolPromptMacro:n,toolContentMacro:i})}buildToolMessages(e,t){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let o=[],r=this._buildVariableContext(e,t),n=this._getBypassMessages(e);if(n&&n.length>0)for(let a of n)a.enabled!==!1&&o.push({role:this._normalizeRole(a.role),content:at.resolveTemplate(a.content||"",r)});let i=this._buildUserContent(this._getPromptTemplate(e),r);return i&&o.push({role:"user",content:i}),this._log(`\u6784\u5EFA\u6D88\u606F: ${o.length} \u6761`),o}buildPromptText(e,t){return this._buildVariableContext(e,t).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:vn}_getBypassMessages(e){return e.bypass?.enabled?k.buildBypassMessages(e):[]}_buildUserContent(e,t){return!e||!e.trim()?"":at.resolveTemplate(e,t).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},qs=new Ks,Ua=qs});var Tn={};te(Tn,{LEGACY_OUTPUT_MODES:()=>za,OUTPUT_MODES:()=>lt,TOOL_FAILURE_STAGES:()=>$e,TOOL_RUNTIME_STATUS:()=>ja,TOOL_WRITEBACK_STATUS:()=>Se,ToolOutputService:()=>Gs,default:()=>Fa,toolOutputService:()=>ct});function Sn(s=[],e="",t=null){return{request:{built:Array.isArray(s)&&s.length>0,messageCount:Array.isArray(s)?s.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!t,contentCommitted:!!t?.contentCommitted,hostCommitApplied:!!t?.hostCommitApplied,writebackStatus:t?.writebackStatus||"",preferredCommitMethod:t?.commit?.preferredMethod||"",appliedCommitMethod:t?.commit?.appliedMethod||"",fallbackUsed:!!t?.commit?.fallbackUsed},refresh:{requested:!!t?.refreshRequested,confirmed:!!t?.refreshConfirmed,requestMethods:Array.isArray(t?.refresh?.requestMethods)?[...t.refresh.requestMethods]:[],confirmChecks:Number(t?.refresh?.confirmChecks)||0,confirmedBy:t?.refresh?.confirmedBy||""}}}var lt,za,ja,$e,Se,Gs,ct,Fa,Vs=D(()=>{le();Zt();Jo();Qo();As();ds();lt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},za={inline:"follow_ai"},ja={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},$e={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},Se={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Gs=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===lt.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let t=e.output?.mode;return t===lt.FOLLOW_AI||t==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,t){let o=Date.now(),r=e.id,n=t?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,i=t?.sessionKey||"",a=t?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",p=Se.NOT_APPLICABLE,h=null,g=[],v="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),E.emit(_.TOOL_EXECUTION_STARTED,{toolId:r,traceId:n,sessionKey:i,mode:lt.POST_RESPONSE_API});try{if(d=$e.BUILD_MESSAGES,g=await this._buildToolMessages(e,t),!g||g.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${g.length} \u6761\u6D88\u606F`);let A=await this._getRequestTimeout();d=$e.SEND_API_REQUEST;let B=await this._sendApiRequest(c,g,{timeoutMs:A,signal:t.signal});if(d=$e.EXTRACT_OUTPUT,v=this._extractOutputContent(B,e),v){if(d=$e.INJECT_CONTEXT,h=await Hs.injectDetailed(r,v,{overwrite:e.output?.overwrite!==!1,sourceMessageId:t.sourceMessageId||t.confirmedAssistantMessageId||t.messageId||"",sourceSwipeId:t.sourceSwipeId||t.confirmedAssistantSwipeId||t.effectiveSwipeId||"",effectiveSwipeId:t.effectiveSwipeId||t.confirmedAssistantSwipeId||"",slotBindingKey:t.slotBindingKey||"",slotRevisionKey:t.slotRevisionKey||"",slotTransactionId:t.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:i}),!h?.success)throw p=Se.FAILED,new Error(h?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Se.SUCCESS}else p=Se.SKIPPED_EMPTY_OUTPUT;d="";let z=Date.now()-o;return E.emit(_.TOOL_EXECUTED,{toolId:r,traceId:n,sessionKey:i,success:!0,duration:z,mode:lt.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${z}ms`),{success:!0,toolId:r,output:v,duration:z,meta:{traceId:n,sessionKey:i,executionKey:a,slotBindingKey:t?.slotBindingKey||"",slotTransactionId:t?.slotTransactionId||"",generationAction:t?.generationAction||"",generationActionSource:t?.generationActionSource||"",rawGenerationType:t?.rawGenerationType||"",normalizedGenerationType:t?.normalizedGenerationType||"",generationMessageBindingSource:t?.generationMessageBindingSource||"",sourceMessageId:t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId||"",sourceSwipeId:t?.sourceSwipeId||t?.confirmedAssistantSwipeId||t?.effectiveSwipeId||"",confirmedAssistantSwipeId:t?.confirmedAssistantSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||"",slotRevisionKey:t?.slotRevisionKey||"",messageCount:g.length,selectors:l,apiPreset:c,writebackStatus:p,failureStage:"",writebackDetails:h,phases:Sn(g,v,h)}}}catch(A){let B=Date.now()-o,z=d||$e.UNKNOWN,ue=p||Se.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,A),E.emit(_.TOOL_EXECUTION_FAILED,{toolId:r,traceId:n,sessionKey:i,error:A.message||String(A),duration:B}),{success:!1,toolId:r,error:A.message||String(A),duration:B,meta:{traceId:n,sessionKey:i,executionKey:a,slotBindingKey:t?.slotBindingKey||"",slotTransactionId:t?.slotTransactionId||"",generationAction:t?.generationAction||"",generationActionSource:t?.generationActionSource||"",rawGenerationType:t?.rawGenerationType||"",normalizedGenerationType:t?.normalizedGenerationType||"",generationMessageBindingSource:t?.generationMessageBindingSource||"",sourceMessageId:t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId||"",sourceSwipeId:t?.sourceSwipeId||t?.confirmedAssistantSwipeId||t?.effectiveSwipeId||"",confirmedAssistantSwipeId:t?.confirmedAssistantSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||"",slotRevisionKey:t?.slotRevisionKey||"",messageCount:g.length,selectors:l,apiPreset:c,writebackStatus:ue,failureStage:z,writebackDetails:h,phases:Sn(g,v,h)}}}}async runToolInline(e,t){let o=Date.now(),r=e.id;try{let n=await this._buildToolMessages(e,t);return{success:!0,toolId:r,messages:n,duration:Date.now()-o}}catch(n){return{success:!1,toolId:r,error:n.message||String(n),duration:Date.now()-o}}}async previewExtraction(e,t){let o=this._buildRecentMessageExtractionEntries(e,t),r=this._joinMessageBlocks(o,"rawText"),n=this._joinMessageBlocks(o,"filteredText"),i=this._joinMessageBlocks(o,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:r,filteredSourceText:n,extractedText:i,messageEntries:o,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,t){let o=this._buildRecentMessageExtractionEntries(e,t),r=this._joinMessageBlocks(o,"rawText"),n=this._joinMessageBlocks(o,"filteredText"),i=this._joinMessageBlocks(o,"extractedText",{skipEmpty:!0}),a={...t,rawRecentMessagesText:r,recentMessagesText:n,extractedContent:i,toolContentMacro:this._buildToolContentMacro(o),toolName:e.name,toolId:e.id};return qs.buildToolMessages(e,a)}_normalizeRole(e){if(!e)return"user";let t=String(e).toLowerCase();return t==="system"?"system":t==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,t,o={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:n}=o,i=null;if(e){if(!vo(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);i=Ft(e)}else i=Ft();let a=Pt(i||{});if(!a.valid&&!i?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${a.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(t,{timeoutMs:r,apiConfig:i},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ae.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,t){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,t);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,t);if(e.content)return this._applyOutputExtractionSelectors(e.content,t);if(e.text)return this._applyOutputExtractionSelectors(e.text,t);if(e.message)return this._applyOutputExtractionSelectors(e.message,t);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),t)}catch{return this._applyOutputExtractionSelectors(String(e),t)}}return this._applyOutputExtractionSelectors(String(e),t)}_applyOutputExtractionSelectors(e,t){let o=typeof e=="string"?e:String(e||""),r=this._getExtractionSelectors(t);if(!r.length)return o.trim();let n=[];for(let i of r){let a=String(i||"").trim();if(!a)continue;if(a.startsWith("regex:")){let c=a.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...o.matchAll(d)].forEach(h=>{let g=String(h?.[0]||"").trim();g&&n.push(g)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:d})}continue}let l=a.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(o.match(c)||[]).forEach(p=>{let h=String(p||"").trim();h&&n.push(h)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:c})}}return n.length>0?n.join(`

`).trim():o.trim()}_getExtractionSelectors(e){let t=e?.extraction?.selectors;return Array.isArray(t)&&t.length>0?t.map(o=>String(o||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(o=>String(o||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,t){return this._applyExtractionSelectorsInternal(e,t,{strict:!1})}_applyExtractionSelectorsInternal(e,t,o={}){let r=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(t),{strict:i=!1}=o;if(!n.length)return r.trim();let a=n.map((c,d)=>{let p=String(c||"").trim(),h=p.startsWith("regex:");return{id:`tool-extract-${d}`,type:h?"regex_include":"include",value:h?p.slice(6).trim():p,enabled:!0}}).filter(c=>c.value),l=bt(r,a,[]);return i?(l||"").trim():l||r.trim()}_extractToolContent(e,t){let o=typeof t=="string"?t:String(t||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(o,e,{strict:!0}):o.trim()}_applyGlobalContextRules(e){let t=typeof e=="string"?e:String(e||"");if(!t.trim())return"";try{let o=Ve()||[],r=xt()||[];return!Array.isArray(o)||o.length===0?t.trim():bt(t,o,r)||t.trim()}catch(o){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",o),t.trim()}}_getMessageText(e){if(!e)return"";let t=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let o of t)if(typeof o=="string"&&o.trim())return o.trim();return""}_collectRecentAssistantMessages(e,t){return this._collectRecentAssistantMessageEntries(e,t).map(o=>o.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,t){let o=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),r=Array.isArray(t?.chatMessages)?t.chatMessages:[],n=[];for(let a=r.length-1;a>=0&&n.length<o;a-=1){let l=r[a],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,p=this._getMessageText(l);d&&p&&n.unshift({text:p,message:l,chatIndex:a})}if(n.length>0)return n;let i=t?.lastAiMessage||t?.input?.lastAiMessage||"";return i?[{text:i,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,t){return this._collectRecentAssistantMessageEntries(e,t).map((r,n)=>{let i=r.text||"",a=this._applyGlobalContextRules(i),l=this._extractToolContent(e,i);return{...r,order:n+1,rawText:i,filteredText:a,extractedText:l}})}_joinMessageBlocks(e,t,o={}){let r=Array.isArray(e)?e:[],{skipEmpty:n=!1}=o;return r.map(a=>{let l=String(a?.[t]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${a?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(r=>{let n=`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`,i=String(r?.filteredText||"").trim()||"(\u7A7A)",a=String(r?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${i}

\u5DE5\u5177\uFF1A
${a}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(t=>this.shouldRunPostResponse(t)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(t=>this.shouldRunPostResponse(t)?t?.automation?.enabled===!0:!1):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(t=>this.shouldRunInline(t)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Ae.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},ct=new Gs,Fa=ct});function Ya(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Js(){return Ya()?.SillyTavern||null}function he(s){return s==null?"":String(s).trim()}function Ha(s){if(!s)return"";let e=[s.content,s.mes,s.message,s.text,s?.data?.content];for(let t of e)if(typeof t=="string"&&t.trim())return t.trim();return""}function Wa(s){let e=String(s?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||s?.is_user===!0?"user":s?.is_system===!0?"system":"assistant"}function _n(s=""){let e=String(s||"").trim();if(!e)return"empty";let t=0;for(let o=0;o<e.length;o+=1)t=(t<<5)-t+e.charCodeAt(o),t|=0;return`fp_${Math.abs(t).toString(36)}`}function En(s={}){let e=he(s.chatId)||"chat_default",t=he(s.messageId)||"latest";return`${e}::${t}`}function Mn(s={}){let e=En(s),t=he(s.effectiveSwipeId)||"swipe:current",o=he(s.assistantContentFingerprint)||"empty";return`${e}::${t}::${o}`}function Ka(s={}){let e=Mn(s),t=he(s.eventType)||"MANUAL",o=he(s.traceId)||An("manual");return`${e}::${t}::${o}`}function An(s="trace"){return`${s}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Cn(){let s=Js();try{let e=s?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(s?.chat)?s.chat:[]}function Pn(s=[]){let e=[],t=null,o=null;return s.forEach((r,n)=>{let i=Wa(r),a=Ha(r);if(!a)return;let l=he(r?.messageId??r?.message_id??r?.id??r?.mid??r?.mesid??r?.chat_index??n),c=he(r?.swipe_id??r?.swipeId??r?.swipe??""),d={role:i,content:a,sourceId:l,swipeId:c,raw:r,index:n};e.push(d),i==="user"&&(t=d),i==="assistant"&&(o=d)}),{messages:e,lastUserMessage:t,lastAiMessage:o}}function qa(s,e,t){return he(e?.chatId??e?.chat_id??s?.chatId??s?.chat_id??s?.this_chid??t?.id??"chat_default")||"chat_default"}async function Zo(){let s=Js();if(!s)return null;try{let e=s.this_chid,t=s.characters||[];if(e>=0&&e<t.length){let o=t[e];return{id:e,name:o?.name||"",description:o?.description||"",personality:o?.personality||"",scenario:o?.scenario||"",firstMes:o?.first_mes||"",mesExample:o?.mes_example||""}}}catch(e){console.error("[YouYouToolkit:ExecutionContext] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function Ga(s="",e=null){let t=String(s||""),o=e?.YouYouToolkit_toolOutputs;return o&&typeof o=="object"&&Object.values(o).forEach(r=>{let n=String(r?.blockText||r?.content||"").trim();n&&t.includes(n)&&(t=t.replace(n,"").trimEnd())}),t.trim()}function Va(s,e={}){let t=Array.isArray(s?.messages)?s.messages:[],o=he(e.messageId),r=he(e.swipeId);if(!o)return s?.lastAiMessage||null;let n=t.filter(a=>a.role==="assistant"),i=n.find(a=>a.sourceId!==o?!1:r?he(a.swipeId)===r:!0);return i||n.find(a=>a.sourceId===o)||null}function In({api:s,stContext:e,character:t,conversation:o,targetAssistantMessage:r,runSource:n="MANUAL"}={}){let i=o?.messages||[],a=o?.lastUserMessage||null,l=he(r?.sourceId)||"",c=he(r?.swipeId)||"swipe:current",d=r?.content||"",p=Ga(d,r?.raw||null),h=_n(d),g=_n(p),v=qa(s,e,t),A=An(String(n||"manual").toLowerCase()),B=En({chatId:v,messageId:l}),z=Mn({chatId:v,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:g});return{startedAt:Date.now(),runSource:n,traceId:A,chatId:v,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:B,slotRevisionKey:z,slotTransactionId:Ka({chatId:v,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:g,eventType:n,traceId:A}),executionKey:z,lastAiMessage:d,assistantContentFingerprint:h,assistantBaseText:p,assistantBaseFingerprint:g,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:a?.content||"",userMessage:a?.content||"",targetAssistantMessage:r,chatMessages:i,characterCard:t,chatHistory:i,input:{userMessage:a?.content||"",lastAiMessage:d,assistantBaseText:p,extractedContent:"",previousToolOutput:"",context:{character:t?.name||"",chatLength:i.length||0}},config:{},status:"pending"}}async function er({runSource:s="MANUAL"}={}){let e=Js(),t=e?.getContext?.()||null,o=await Zo(),r=Cn(),n=Pn(r),i=n?.lastAiMessage||null;return In({api:e,stContext:t,character:o,conversation:n,targetAssistantMessage:i,runSource:s})}async function tr({messageId:s,swipeId:e="",runSource:t="AUTO"}={}){let o=Js(),r=o?.getContext?.()||null,n=await Zo(),i=Cn(),a=Pn(i),l=Va(a,{messageId:s,swipeId:e});return In({api:o,stContext:r,character:n,conversation:a,targetAssistantMessage:l,runSource:t})}var sr=D(()=>{});var Qs={};te(Qs,{abortAllTasks:()=>el,abortTask:()=>Za,buildToolMessages:()=>$n,clearExecutionHistory:()=>nl,createExecutionContext:()=>cl,createResult:()=>Xs,enhanceMessagesWithBypass:()=>dl,executeBatch:()=>Qa,executeTool:()=>kn,executeToolWithConfig:()=>On,executeToolsBatch:()=>yl,executorState:()=>q,extractFailed:()=>ll,extractSuccessful:()=>al,generateTaskId:()=>_t,getExecutionHistory:()=>rl,getExecutorStatus:()=>ol,getScheduler:()=>Nt,mergeResults:()=>il,pauseExecutor:()=>tl,resumeExecutor:()=>sl,setMaxConcurrent:()=>Xa});function Xs(s,e,t,o,r,n,i=0){return{success:t,taskId:s,toolId:e,data:o,error:r,duration:n,retries:i,timestamp:Date.now(),metadata:{}}}function _t(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Ja(s,e={}){return{id:_t(),toolId:s,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Nt(){return es||(es=new or(q.maxConcurrent)),es}function Xa(s){q.maxConcurrent=Math.max(1,Math.min(10,s)),es&&(es.maxConcurrent=q.maxConcurrent)}async function kn(s,e={},t){let o=Nt(),r=Ja(s,e);for(;q.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await o.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof t=="function")return await t(i,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return Rn(n),n}catch(n){let i=Xs(r.id,s,!1,null,n,Date.now()-r.createdAt,r.retries);return Rn(i),i}}async function Qa(s,e={}){let{failFast:t=!1,concurrency:o=q.maxConcurrent}=e,r=[],n=Nt(),i=n.maxConcurrent;n.maxConcurrent=o;try{let a=s.map(({toolId:l,options:c,executor:d})=>kn(l,c,d));if(t)for(let l of a){let c=await l;if(r.push(c),!c.success){n.abortAll();break}}else{let l=await Promise.allSettled(a);for(let c of l)c.status==="fulfilled"?r.push(c.value):r.push(Xs(_t(),"unknown",!1,null,c.reason,0,0))}}finally{n.maxConcurrent=i}return r}function Za(s){return Nt().abort(s)}function el(){Nt().abortAll(),q.executionQueue=[]}function tl(){q.isPaused=!0}function sl(){q.isPaused=!1}function ol(){return{...Nt().getStatus(),isPaused:q.isPaused,activeControllers:q.activeControllers.size,historyCount:q.executionHistory.length}}function Rn(s){q.executionHistory.push(s),q.executionHistory.length>100&&q.executionHistory.shift()}function rl(s={}){let e=[...q.executionHistory];return s.toolId&&(e=e.filter(t=>t.toolId===s.toolId)),s.success!==void 0&&(e=e.filter(t=>t.success===s.success)),s.limit&&(e=e.slice(-s.limit)),e}function nl(){q.executionHistory=[]}function il(s){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let t of s)e.totalDuration+=t.duration,t.success?(e.successCount++,t.data!==void 0&&t.data!==null&&e.data.push(t.data)):(e.success=!1,e.failureCount++,t.error&&e.errors.push({taskId:t.taskId,toolId:t.toolId,error:t.error.message||String(t.error)}));return e}function al(s){return s.filter(e=>e.success).map(e=>e.data)}function ll(s){return s.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function cl(s={}){return{taskId:_t(),startTime:Date.now(),signal:s.signal||null,apiConfig:s.apiConfig||null,bypassMessages:s.bypassMessages||[],context:s.context||{},metadata:s.metadata||{}}}function dl(s,e){return!e||e.length===0?s:[...e,...s]}function ul(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function $n(s,e){let t=[],o=s.promptTemplate||"",r={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,i]of Object.entries(r))o=o.replace(new RegExp(ul(n),"g"),i);return t.push({role:"USER",content:o}),t}async function On(s,e,t={}){let o=V(s);if(!o)return{success:!1,taskId:_t(),toolId:s,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!o.enabled)return{success:!1,taskId:_t(),toolId:s,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),n=_t();try{E.emit(_.TOOL_EXECUTION_STARTED,{toolId:s,taskId:n,context:e});let i=$n(o,e);if(typeof t.callApi=="function"){let a=o.output?.apiPreset||o.apiPreset||"",l=a?{preset:a}:null,c=await t.callApi(i,l,t.signal),d=c;o.outputMode==="separate"&&o.extractTags?.length>0&&(d=pl(c,o.extractTags));let p={success:!0,taskId:n,toolId:s,data:d,duration:Date.now()-r};return E.emit(_.TOOL_EXECUTED,{toolId:s,taskId:n,result:p}),p}else return{success:!0,taskId:n,toolId:s,data:{messages:i,config:{apiPreset:o.output?.apiPreset||o.apiPreset||"",outputMode:o.outputMode,extractTags:o.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(i){let a={success:!1,taskId:n,toolId:s,error:i.message||String(i),duration:Date.now()-r};return E.emit(_.TOOL_EXECUTION_FAILED,{toolId:s,taskId:n,error:i}),a}}function pl(s,e){let t={};for(let o of e){let r=new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"gi"),n=s.match(r);n&&(t[o]=n.map(i=>{let a=i.match(new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"i"));return a?a[1].trim():""}))}return t}async function yl(s,e,t={}){let o=[];for(let r of s){let n=V(r);if(n&&n.enabled){let i=await On(r,e,t);o.push(i)}}return o}var q,or,es,Zs=D(()=>{Tt();le();q={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};or=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,t){return new Promise((o,r)=>{this.queue.push({executor:e,task:t,resolve:o,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:t,task:o,resolve:r,reject:n}=e,i=new AbortController;o.abortController=i,o.status="running",o.startedAt=Date.now(),this.running.set(o.id,o),q.activeControllers.set(o.id,i),this.executeTask(t,o,i.signal).then(a=>{o.status="completed",o.completedAt=Date.now(),r(a)}).catch(a=>{o.status=a.name==="AbortError"?"aborted":"failed",o.completedAt=Date.now(),n(a)}).finally(()=>{this.running.delete(o.id),q.activeControllers.delete(o.id),q.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,t,o){let r=Date.now(),n=null;for(let i=0;i<=t.maxRetries;i++){if(o.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await e(o);return Xs(t.id,t.toolId,!0,a,null,Date.now()-r,i)}catch(a){if(n=a,a.name==="AbortError")throw a;i<t.maxRetries&&(await this.delay(1e3*(i+1)),t.retries=i+1)}}throw n}delay(e){return new Promise(t=>setTimeout(t,e))}abort(e){let t=q.activeControllers.get(e);return t?(t.abort(),!0):!1}abortAll(){for(let e of q.activeControllers.values())e.abort();q.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},es=null});async function gl(){return rr||(rr=Promise.resolve().then(()=>(Zs(),Qs))),rr}async function fl(s,e,t){return t&&s.output?.mode===lt.POST_RESPONSE_API?ct.runToolPostResponse(s,e):(await gl()).executeToolWithConfig(s.id,e)}function ml(s,e){return e?.runSource==="MANUAL"?s.output?.mode===lt.POST_RESPONSE_API?ts.MANUAL_POST_RESPONSE_API:ts.MANUAL_COMPATIBILITY:ts.MANUAL_POST_RESPONSE_API}function eo(s,e){try{Ho(s,e)}catch(t){console.warn("[ManualTool] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",s,t)}}async function hl(s,e){let t=Date.now(),o=s.id,r=`yyt-tool-run-${o}`,n=ml(s,e),i=e?.executionKey||"";eo(o,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),Ke("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${s.name}`,{sticky:!0,noticeId:r});try{let a=await fl(s,e,!0),l=Date.now()-t;if(a?.success){let h=V(o),g=a?.meta?.writebackDetails||{};return eo(o,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(h?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:a?.meta?.writebackStatus||Se.NOT_APPLICABLE,lastFailureStage:a?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!g.contentCommitted,lastHostCommitApplied:!!g.hostCommitApplied,lastRefreshRequested:!!g.refreshRequested,lastRefreshConfirmed:!!g.refreshConfirmed,lastPreferredCommitMethod:g?.commit?.preferredMethod||"",lastAppliedCommitMethod:g?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(g?.refresh?.requestMethods)?g.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(g?.refresh?.requestMethods)?[...g.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(g?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:g?.refresh?.confirmedBy||""}),m("success",`${s.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),Ke("success",`${s.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:r}),{success:!0,duration:l,result:a}}let c=V(o),d=a?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",p=a?.meta?.writebackDetails||{};return eo(o,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:a?.meta?.writebackStatus||Se.NOT_APPLICABLE,lastFailureStage:a?.meta?.failureStage||(n===ts.MANUAL_COMPATIBILITY?$e.COMPATIBILITY_EXECUTE:$e.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),m("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),Ke("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:r}),{success:!1,duration:l,error:d,result:a}}catch(a){let l=Date.now()-t,c=V(o),d=a?.message||String(a);throw eo(o,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:Se.NOT_APPLICABLE,lastFailureStage:n===ts.MANUAL_COMPATIBILITY?$e.COMPATIBILITY_EXECUTE:$e.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),m("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),Ke("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:r}),a}}async function Dn(s){if(!s)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=V(s);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return St(s,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:Se.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),Ke("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${s}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let t=await er({runSource:"MANUAL"});return hl(e,t)}async function Ln(s){if(!s)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=V(s);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let t=await er({runSource:"MANUAL_PREVIEW"});return ct.previewExtraction(e,t)}var ts,rr,Nn=D(()=>{Tt();Vs();sr();Ue();ts={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"},rr=null});var Un={};te(Un,{TOOL_CONFIG_PANEL_STYLES:()=>Bn,createToolConfigPanel:()=>dt,default:()=>bl});function dt(s){let{id:e,toolId:t,postResponseHint:o,extractionPlaceholder:r,previewDialogId:n,previewTitle:i="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=s;return{id:e,toolId:t,render(){let a=V(this.toolId);if(!a)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=a.output?.apiPreset||a.apiPreset||"",d=this._getBypassPresets(),p=a.output?.mode||"follow_ai",h=a.bypass?.enabled||!1,g=a.bypass?.presetId||"",v=a.runtime?.lastStatus||"idle",A=a.runtime?.lastRunAt?new Date(a.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",B=a.runtime?.lastError||"",z=a.extraction||{},ue=Array.isArray(z.selectors)?z.selectors.join(`
`):"",X=p==="post_response_api"?o:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",pe=p==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",ae=c||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${S(a.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${S(a.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${S(pe)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${S(ae)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${S(v)}</span>
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
                <option value="follow_ai" ${p==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${p==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${X}</div>
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
                ${l.map(se=>`
                  <option value="${S(se.name)}" ${se.name===c?"selected":""}>
                    ${S(se.name)}
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
                <input type="checkbox" id="${y}-tool-bypass-enabled" ${h?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${h?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${y}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${d.map(se=>`
                  <option value="${S(se.id)}" ${se.id===g?"selected":""}>
                    ${S(se.name)}${se.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="number" class="yyt-input" id="${y}-tool-max-messages" min="1" max="50" value="${Number(z.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${y}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${S(r)}">${S(ue)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${S(v)}">${S(v)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${S(A)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${a.runtime?.successCount||0} / ${a.runtime?.errorCount||0}</span>
                </div>
                ${B?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${S(B)}</span>
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
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86\u7834\u9650\u8BCD\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>
        </div>
      `},_getApiPresets(){try{return It()||[]}catch{return[]}},_getBypassPresets(){try{return qo()||[]}catch{return[]}},_getFormData(a){let l=V(this.toolId),c=a.find(`#${y}-tool-output-mode`).val()||"follow_ai",d=a.find(`#${y}-tool-bypass-enabled`).is(":checked"),p=c==="post_response_api",h=(a.find(`#${y}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(g=>g.trim()).filter(Boolean);return{enabled:l?.enabled!==!1,promptTemplate:a.find(`#${y}-tool-prompt-template`).val()||"",apiPreset:a.find(`#${y}-tool-api-preset`).val()||"",extractTags:h,output:{mode:c,apiPreset:a.find(`#${y}-tool-api-preset`).val()||"",overwrite:!0,enabled:p},bypass:{enabled:d,presetId:d&&a.find(`#${y}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(a.find(`#${y}-tool-max-messages`).val(),10)||5),selectors:h}}},_showExtractionPreview(a,l){if(!U())return;let d=`${y}-${n}`,p=Array.isArray(l.messageEntries)?l.messageEntries:[],h=p.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${p.map(g=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${g.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${S(g.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${S(g.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${S(g.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";a.append(fo({id:d,title:i,width:"720px",wide:!0,body:`
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
          ${h}
        `})),mo(a,d,{onSave:g=>g()}),a.find(`#${d}-save`).text("\u5173\u95ED"),a.find(`#${d}-cancel`).remove()},bindEvents(a){let l=U();!l||!F(a)||(a.find(`#${y}-tool-output-mode`).on("change",()=>{let d=(a.find(`#${y}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?o:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";a.find(".yyt-tool-mode-hint").text(d)}),a.find(`#${y}-tool-bypass-enabled`).on("change",c=>{let d=l(c.currentTarget).is(":checked");a.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!d)}),a.find(`#${y}-tool-save, #${y}-tool-save-top`).on("click",()=>{this._saveConfig(a,{silent:!1})}),a.find(`#${y}-tool-reset-template`).on("click",()=>{let c=Bs(this.toolId);c?.promptTemplate&&(a.find(`#${y}-tool-prompt-template`).val(c.promptTemplate),m("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),a.find(`#${y}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let d=await Dn(this.toolId);!d?.success&&d?.error&&Ke("warning",d.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(d){m("error",d?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(a)}}),a.find(`#${y}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let d=await Ln(this.toolId);if(!d?.success){m("error",d?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(a,d)}catch(d){m("error",d?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}))},_saveConfig(a,l={}){let c=this._getFormData(a),{silent:d=!1}=l,p=Ye(this.toolId,c);return p?d||m("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):m("error","\u4FDD\u5B58\u5931\u8D25"),p},destroy(a){!U()||!F(a)||a.find("*").off()},getStyles(){return Bn},renderTo(a){a.html(this.render({})),this.bindEvents(a,{})}}}var Bn,bl,ss=D(()=>{Ue();Tt();ms();Xt();Nn();Bn=`
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
`;bl=dt});var Oe,nr=D(()=>{ss();Oe=dt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var De,ir=D(()=>{ss();De=dt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var Le,ar=D(()=>{ss();Le=dt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var Et,lr=D(()=>{le();Xt();Ue();Et={id:"bypassPanel",render(s){let e=k.getPresetList(),t=k.getDefaultPresetId();return`
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
            ${e.map(o=>this._renderPresetItem(o,o.id===t)).join("")}
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
    `},_renderPresetItem(s,e){let t=Xe&&Xe[s.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${s.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${S(s.name)}</span>
          <span class="yyt-bypass-preset-count">${s.messages?.length||0} \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-bypass-preset-actions">
          ${e?'<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>':""}
          ${t?"":`
            <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-quick-delete" title="\u5220\u9664\u9884\u8BBE" data-preset-id="${s.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          `}
        </div>
      </div>
    `},_renderEditor(s){if(!s)return`
        <div class="yyt-bypass-empty">
          <i class="fa-solid fa-shield-halved"></i>
          <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
        </div>
      `;let e=k.getDefaultPresetId()===s.id,t=Xe&&Xe[s.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${s.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${S(s.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-bypass-editor-actions">
            ${t?"":`
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
                 value="${S(s.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(s.messages||[]).map(o=>this._renderMessageItem(o)).join("")}
        </div>
        
        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
    `},_renderMessageItem(s){let e={SYSTEM:"fa-server",USER:"fa-user",assistant:"fa-robot"};return`
      <div class="yyt-bypass-message ${s.enabled===!1?"yyt-disabled":""}" data-message-id="${s.id}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${e[s.role]||"fa-comment"}"></i>
            <select class="yyt-select yyt-bypass-role-select">
              <option value="SYSTEM" ${s.role==="SYSTEM"?"selected":""}>SYSTEM</option>
              <option value="USER" ${s.role==="USER"?"selected":""}>USER</option>
              <option value="assistant" ${s.role==="assistant"?"selected":""}>assistant</option>
            </select>
          </div>
          <div class="yyt-bypass-message-controls">
            <label class="yyt-toggle yyt-small">
              <input type="checkbox" class="yyt-bypass-message-enabled" ${s.enabled!==!1?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
            ${s.deletable!==!1?`
              <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-delete-message" title="\u5220\u9664">
                <i class="fa-solid fa-times"></i>
              </button>
            `:""}
          </div>
        </div>
        <textarea class="yyt-textarea yyt-bypass-message-content" rows="3" 
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${S(s.content||"")}</textarea>
      </div>
    `},bindEvents(s,e){let t=U();!t||!F(s)||(this._bindPresetListEvents(s,t),this._bindEditorEvents(s,t),this._bindFileEvents(s,t))},_bindPresetListEvents(s,e){s.on("click",".yyt-bypass-preset-item",t=>{if(e(t.target).closest(".yyt-bypass-quick-delete").length)return;let o=e(t.currentTarget).data("presetId");this._selectPreset(s,e,o)}),s.on("click",".yyt-bypass-quick-delete",t=>{t.stopPropagation();let o=e(t.currentTarget).data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=k.deletePreset(o);r.success?(s.find(".yyt-bypass-editor-content").data("presetId")===o&&s.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(s,e),m("success","\u9884\u8BBE\u5DF2\u5220\u9664")):m("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),s.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(s,e)})},_bindEditorEvents(s,e){s.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(s,e)}),s.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(s,e)}),s.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(s,e)}),s.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(s,e)}),s.on("click","#yyt-bypass-add-message",()=>{this._addMessage(s,e)}),s.on("click",".yyt-bypass-delete-message",t=>{let o=e(t.currentTarget).closest(".yyt-bypass-message"),r=o.data("messageId");o.remove()}),s.on("change",".yyt-bypass-message-enabled",t=>{e(t.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(t.currentTarget).is(":checked"))})},_bindFileEvents(s,e){s.find("#yyt-bypass-import").on("click",()=>{s.find("#yyt-bypass-import-file").click()}),s.find("#yyt-bypass-import-file").on("change",async t=>{let o=t.target.files[0];if(o){try{let r=await Ge(o),n=k.importPresets(r);m(n.success?"success":"error",n.message),n.success&&this.renderTo(s)}catch(r){m("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(t.target).val("")}}),s.find("#yyt-bypass-export").on("click",()=>{try{let t=k.exportPresets();qe(t,`bypass_presets_${Date.now()}.json`),m("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(t){m("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}})},_selectPreset(s,e,t){let o=k.getPreset(t);o&&(s.find(".yyt-bypass-preset-item").removeClass("yyt-active"),s.find(`.yyt-bypass-preset-item[data-preset-id="${t}"]`).addClass("yyt-active"),s.find("#yyt-bypass-editor").html(this._renderEditor(o)))},_createNewPreset(s,e){let t=`bypass_${Date.now()}`,o=k.createPreset({id:t,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});o.success?(this.renderTo(s),this._selectPreset(s,e,t),m("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):m("error",o?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(s,e){let t=s.find(".yyt-bypass-editor-content"),o=t.data("presetId");if(!o)return;let r=t.find(".yyt-bypass-name-input").val().trim(),n=t.find("#yyt-bypass-description").val().trim();if(!r){m("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let i=[];t.find(".yyt-bypass-message").each(function(){let l=e(this);i.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=k.updatePreset(o,{name:r,description:n,messages:i});a.success?(m("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(s,e)):m("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(s,e){let o=s.find(".yyt-bypass-editor-content").data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=k.deletePreset(o);r.success?(this.renderTo(s),m("success","\u9884\u8BBE\u5DF2\u5220\u9664")):m("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(s,e){let o=s.find(".yyt-bypass-editor-content").data("presetId");if(!o)return;let r=`bypass_${Date.now()}`,n=k.duplicatePreset(o,r);n.success?(this.renderTo(s),this._selectPreset(s,e,r),m("success","\u9884\u8BBE\u5DF2\u590D\u5236")):m("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(s,e){let o=s.find(".yyt-bypass-editor-content").data("presetId");o&&(k.setDefaultPresetId(o),s.find(".yyt-bypass-preset-item").removeClass("yyt-default"),s.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-default"),s.find(".yyt-bypass-default-badge").remove(),s.find(`.yyt-bypass-preset-item[data-preset-id="${o}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),m("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(s,e){let t=s.find("#yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};t.append(this._renderMessageItem(o))},_refreshPresetList(s,e){let t=k.getPresetList(),o=k.getDefaultPresetId();s.find(".yyt-bypass-preset-list").html(t.map(r=>this._renderPresetItem(r,r.id===o)).join(""))},destroy(s){!U()||!F(s)||s.find("*").off()},getStyles(){return`
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
    `},renderTo(s){let e=this.render({});s.html(e),this.bindEvents(s,{})}}});var Yn={};te(Yn,{SettingsPanel:()=>Qe,applyTheme:()=>Fn,applyUiPreferences:()=>cr,default:()=>vl});function os(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function jn(s=os()){return s?.documentElement||document.documentElement}function Fn(s,e=os()){let t=jn(e),o={...xl,...zn[s]||zn["dark-blue"]};Object.entries(o).forEach(([r,n])=>{t.style.setProperty(r,n)}),t.setAttribute("data-yyt-theme",s)}function cr(s={},e=os()){let t=jn(e),{theme:o="dark-blue",compactMode:r=!1,animationEnabled:n=!0}=s||{};Fn(o,e),t.classList.toggle("yyt-compact-mode",!!r),t.classList.toggle("yyt-no-animation",!n)}var xl,zn,Qe,vl,to=D(()=>{le();Zt();Ue();xl={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},zn={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};Qe={id:"settingsPanel",render(){let s=Ae.getSettings(),e=s.debug?.enableDebugLog===!0;return`
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">\u5168\u5C40\u504F\u597D\u4E0E\u8FD0\u884C\u7B56\u7565</div>
            <div class="yyt-settings-hero-desc">\u7EDF\u4E00\u7BA1\u7406\u6267\u884C\u5668\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u8BBE\u7F6E\uFF0C\u8BA9\u5DE5\u5177\u94FE\u884C\u4E3A\u4E0E\u754C\u9762\u4F53\u9A8C\u4FDD\u6301\u4E00\u81F4\u3002</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${e?"is-on":"is-off"}">\u8C03\u8BD5 ${e?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip is-neutral">\u4E3B\u9898 ${s.ui?.theme||"dark-blue"}</span>
          </div>
        </div>

        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> \u6267\u884C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> \u8C03\u8BD5
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> \u5916\u89C2
          </button>
        </div>

        <div class="yyt-settings-content">
          ${this._renderExecutorTab(s.executor)}
          ${this._renderDebugTab(s.debug)}
          ${this._renderUiTab(s.ui)}
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
    `},_renderExecutorTab(s){return`
      <div class="yyt-settings-tab-content yyt-active" data-tab="executor">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5E76\u53D1\u63A7\u5236</div>
          <div class="yyt-form-group">
            <label>\u6700\u5927\u5E76\u53D1\u6570</label>
            <div class="yyt-form-hint">\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650</div>
            <input type="number" class="yyt-input" id="yyt-setting-maxConcurrent"
                   value="${s.maxConcurrent}" min="1" max="10">
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u91CD\u8BD5\u7B56\u7565</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6700\u5927\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-setting-maxRetries"
                     value="${s.maxRetries}" min="0" max="10">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u95F4\u9694 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-retryDelayMs"
                     value="${s.retryDelayMs}" min="1000" max="60000" step="1000">
            </div>
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u8D85\u65F6\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u5355\u4E2A\u8BF7\u6C42\u7684\u8D85\u65F6\u65F6\u95F4\uFF0C\u8D85\u8FC7\u5C06\u81EA\u52A8\u4E2D\u65AD</div>
            <input type="number" class="yyt-input" id="yyt-setting-requestTimeoutMs"
                   value="${s.requestTimeoutMs}" min="10000" max="300000" step="10000">
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u961F\u5217\u7B56\u7565</div>
          <div class="yyt-form-group">
            <label>\u961F\u5217\u5904\u7406\u65B9\u5F0F</label>
            <select class="yyt-select" id="yyt-setting-queueStrategy">
              <option value="fifo" ${s.queueStrategy==="fifo"?"selected":""}>FIFO (\u5148\u8FDB\u5148\u51FA)</option>
              <option value="lifo" ${s.queueStrategy==="lifo"?"selected":""}>LIFO (\u540E\u8FDB\u5148\u51FA)</option>
              <option value="priority" ${s.queueStrategy==="priority"?"selected":""}>\u4F18\u5148\u7EA7\u6392\u5E8F</option>
            </select>
          </div>
        </div>
      </div>
    `},_renderDebugTab(s){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-enableDebugLog"
                     ${s.enableDebugLog?"checked":""}>
              <span>\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7</span>
            </label>
            <div class="yyt-form-hint">\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F</div>
          </div>

          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-saveExecutionHistory"
                     ${s.saveExecutionHistory?"checked":""}>
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
                     ${s.showRuntimeBadge?"checked":""}>
              <span>\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0</span>
            </label>
            <div class="yyt-form-hint">\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668</div>
          </div>
        </div>
      </div>
    `},_renderUiTab(s){return`
      <div class="yyt-settings-tab-content" data-tab="ui">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5916\u89C2\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u4E3B\u9898</label>
            <select class="yyt-select" id="yyt-setting-theme">
              <option value="dark-blue" ${s.theme==="dark-blue"?"selected":""}>\u6DF1\u84DD</option>
              <option value="dark-purple" ${s.theme==="dark-purple"?"selected":""}>\u6DF1\u7D2B</option>
              <option value="dark-green" ${s.theme==="dark-green"?"selected":""}>\u6DF1\u7EFF</option>
              <option value="light" ${s.theme==="light"?"selected":""}>\u6D45\u8272</option>
            </select>
          </div>

          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-compactMode"
                     ${s.compactMode?"checked":""}>
              <span>\u7D27\u51D1\u6A21\u5F0F</span>
            </label>
            <div class="yyt-form-hint">\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9</div>
          </div>

          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-animationEnabled"
                     ${s.animationEnabled?"checked":""}>
              <span>\u542F\u7528\u52A8\u753B\u6548\u679C</span>
            </label>
            <div class="yyt-form-hint">\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B</div>
          </div>
        </div>
      </div>
    `},bindEvents(s){let e=U();!e||!F(s)||(s.find(".yyt-settings-tab").on("click",t=>{let o=e(t.currentTarget).data("tab");s.find(".yyt-settings-tab").removeClass("yyt-active"),e(t.currentTarget).addClass("yyt-active"),s.find(".yyt-settings-tab-content").removeClass("yyt-active"),s.find(`.yyt-settings-tab-content[data-tab="${o}"]`).addClass("yyt-active")}),s.find("#yyt-settings-save").on("click",()=>{this._saveSettings(s)}),s.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ae.resetSettings(),cr(Qt.ui,os()),this.renderTo(s),m("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(s){let e={executor:{maxConcurrent:parseInt(s.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(s.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(s.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(s.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:s.find("#yyt-setting-queueStrategy").val()||"fifo"},debug:{enableDebugLog:s.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:s.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:s.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:s.find("#yyt-setting-theme").val()||"dark-blue",compactMode:s.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:s.find("#yyt-setting-animationEnabled").is(":checked")}};Ae.saveSettings(e),cr(e.ui,os()),m("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(s){!U()||!F(s)||s.find("*").off()},getStyles(){return`
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
        line-height: 1.15;
        color: var(--yyt-text);
      }

      .yyt-settings-hero-desc {
        font-size: 12px;
        line-height: 1.55;
        color: var(--yyt-text-secondary);
      }

      .yyt-settings-hero-status {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
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
        border: 1px solid rgba(255, 255, 255, 0.08);
        letter-spacing: 0.3px;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.04);
      }

      .yyt-settings-status-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.35);
        background: rgba(74, 222, 128, 0.08);
      }

      .yyt-settings-status-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.35);
        background: rgba(248, 113, 113, 0.08);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-text-secondary);
      }

      .yyt-settings-tabs {
        display: flex;
        gap: 8px;
        padding: 0 2px;
      }

      .yyt-settings-tab {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
        color: var(--yyt-text-secondary);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .yyt-settings-tab:hover {
        color: var(--yyt-text);
        background: rgba(255, 255, 255, 0.05);
      }

      .yyt-settings-tab.yyt-active {
        color: var(--yyt-on-accent);
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
        border-color: transparent;
        box-shadow: 0 10px 24px var(--yyt-accent-glow);
      }

      .yyt-settings-content {
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-settings-tab-content {
        display: none;
        flex-direction: column;
        gap: 12px;
      }

      .yyt-settings-tab-content.yyt-active {
        display: flex;
      }

      .yyt-settings-section {
        padding: 14px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
      }

      .yyt-settings-section-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--yyt-text);
        margin-bottom: 12px;
      }

      .yyt-settings-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 4px;
      }
    `},renderTo(s){s.html(this.render({})),this.bindEvents(s,{})}},vl=Qe});var Jn={};te(Jn,{ApiPresetPanel:()=>Ie,BypassPanel:()=>Et,RegexExtractPanel:()=>Re,SCRIPT_ID:()=>y,SettingsPanel:()=>Qe,StatusBlockPanel:()=>De,SummaryToolPanel:()=>Oe,ToolManagePanel:()=>ke,UIManager:()=>jt,YouyouReviewPanel:()=>Le,bindDialogEvents:()=>mo,createDialogHtml:()=>fo,default:()=>wl,downloadJson:()=>qe,escapeHtml:()=>S,fillFormWithConfig:()=>yt,getAllStyles:()=>Vn,getFormApiConfig:()=>ot,getJQuery:()=>U,initUI:()=>rs,isContainerValid:()=>F,readFileContent:()=>Ge,registerComponents:()=>Bt,renderApiPanel:()=>so,renderBypassPanel:()=>qn,renderRegexPanel:()=>oo,renderSettingsPanel:()=>Gn,renderStatusBlockPanel:()=>Wn,renderSummaryToolPanel:()=>Hn,renderToolPanel:()=>ro,renderYouyouReviewPanel:()=>Kn,resetJQueryCache:()=>ki,showToast:()=>m,showTopNotice:()=>Ke,uiManager:()=>J});function Bt(){J.register(Ie.id,Ie),J.register(Re.id,Re),J.register(ke.id,ke),J.register(Oe.id,Oe),J.register(De.id,De),J.register(Le.id,Le),J.register(Et.id,Et),J.register(Qe.id,Qe),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function rs(s={}){let{autoInjectStyles:e=!0,targetDocument:t,...o}=s;J.init(o),Bt(),e&&J.injectStyles(t),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function ut(s,e,t={}){J.render(s,e,t)}function so(s){ut(Ie.id,s)}function oo(s){ut(Re.id,s)}function ro(s){ut(ke.id,s)}function Hn(s){ut(Oe.id,s)}function Wn(s){ut(De.id,s)}function Kn(s){ut(Le.id,s)}function qn(s){ut(Et.id,s)}function Gn(s){ut(Qe.id,s)}function Vn(){return J.getAllStyles()}var wl,dr=D(()=>{ho();Ro();Bo();Wo();nr();ir();ar();lr();to();Ue();ho();Ro();Bo();Wo();nr();ir();ar();lr();to();wl={uiManager:J,ApiPresetPanel:Ie,RegexExtractPanel:Re,ToolManagePanel:ke,SummaryToolPanel:Oe,StatusBlockPanel:De,YouyouReviewPanel:Le,BypassPanel:Et,SettingsPanel:Qe,registerComponents:Bt,initUI:rs,renderApiPanel:so,renderRegexPanel:oo,renderToolPanel:ro,renderSummaryToolPanel:Hn,renderStatusBlockPanel:Wn,renderYouyouReviewPanel:Kn,renderBypassPanel:qn,renderSettingsPanel:Gn,getAllStyles:Vn}});var ni={};te(ni,{ApiPresetPanel:()=>Ie,RegexExtractPanel:()=>Re,SCRIPT_ID:()=>y,StatusBlockPanel:()=>De,SummaryToolPanel:()=>Oe,ToolManagePanel:()=>ke,YouyouReviewPanel:()=>Le,default:()=>Sl,escapeHtml:()=>S,fillFormWithConfig:()=>yt,getCurrentTab:()=>oi,getFormApiConfig:()=>ot,getJQuery:()=>U,getRegexStyles:()=>ti,getStyles:()=>ei,getToolStyles:()=>si,initUI:()=>rs,isContainerValid:()=>F,registerComponents:()=>Bt,render:()=>Xn,renderRegex:()=>Qn,renderTool:()=>Zn,setCurrentTab:()=>ri,showToast:()=>m,uiManager:()=>J});function ur(s,e){let t=U();return t?s?typeof s=="string"?t(s):s?.jquery?s:t(s):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function Xn(s){if(ns=ur(s,ns),!ns||!ns.length){console.error("[YouYouToolkit] Container not found or invalid");return}so(ns)}function Qn(s){if(is=ur(s,is),!is||!is.length){console.error("[YouYouToolkit] Regex container not found");return}oo(is)}function Zn(s){if(as=ur(s,as),!as||!as.length){console.error("[YouYouToolkit] Tool container not found");return}ro(as)}function ei(){return Ie.getStyles()}function ti(){return Re.getStyles()}function si(){return[ke.getStyles(),Oe.getStyles(),De.getStyles(),Le.getStyles()].join(`
`)}function oi(){return J.getCurrentTab()}function ri(s){J.switchTab(s)}var ns,is,as,Sl,ii=D(()=>{dr();ns=null,is=null,as=null;Sl={render:Xn,renderRegex:Qn,renderTool:Zn,getStyles:ei,getRegexStyles:ti,getToolStyles:si,getCurrentTab:oi,setCurrentTab:ri,uiManager:J,ApiPresetPanel:Ie,RegexExtractPanel:Re,ToolManagePanel:ke,SummaryToolPanel:Oe,StatusBlockPanel:De,YouyouReviewPanel:Le,registerComponents:Bt,initUI:rs,SCRIPT_ID:y,escapeHtml:S,showToast:m,getJQuery:U,isContainerValid:F,getFormApiConfig:ot,fillFormWithConfig:yt}});var ai={};te(ai,{DEFAULT_PROMPT_SEGMENTS:()=>no,PromptEditor:()=>io,default:()=>Il,getPromptEditorStyles:()=>Ml,messagesToSegments:()=>Pl,segmentsToMessages:()=>Cl,validatePromptSegments:()=>Al});function Ml(){return`
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
  `}function Al(s){let e=[];return Array.isArray(s)?(s.forEach((t,o)=>{t.id||e.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11ID`),t.role||e.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(t.role)||e.push(`\u6BB5\u843D ${o+1} \u7684role\u503C\u65E0\u6548: ${t.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function Cl(s){return s.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Pl(s){return Array.isArray(s)?s.map((e,t)=>({id:`segment_${t}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...no]}var Tl,_l,El,no,io,Il,li=D(()=>{Tl="youyou_toolkit_prompt_editor",_l={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},El={system:"fa-server",ai:"fa-robot",user:"fa-user"},no=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],io=class{constructor(e={}){this.containerId=e.containerId||Tl,this.segments=e.segments||[...no],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...no],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
          ${this.segments.map(t=>this.renderSegment(t)).join("")}
        </div>
      </div>
    `;this.$container.html(e)}renderSegment(e){let t=_l[e.type]||e.type,o=El[e.type]||"fa-file",r=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,i=r?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",a=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${r?"yyt-main-a":""} ${n?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${i?`border-left: 3px solid ${i};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${o}"></i>
            <span class="yyt-prompt-segment-title">${t}</span>
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let t=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(t)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let t=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(e.currentTarget).val();this.updateSegmentMeta(t,{role:o})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let t=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(e.currentTarget).val();this.updateSegmentMeta(t,{mainSlot:o})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let t=`segment_${Date.now()}`,o=e||{id:t,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};o.id||(o.id=t),this.segments.push(o),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let t=this.segments.findIndex(r=>r.id===e);if(t===-1)return;if(this.segments[t].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(t,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,t){let o=this.segments.find(r=>r.id===e);o&&(Object.assign(o,t),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=t=>{let o=t.target.files[0];if(!o)return;let r=new FileReader;r.onload=n=>{try{let i=JSON.parse(n.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},r.readAsText(o)},e.click()}exportPrompt(){let e=this.getSegments(),t=JSON.stringify(e,null,2),o=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(o),n=document.createElement("a");n.href=r,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};Il=io});var pr={};te(pr,{WindowManager:()=>ao,closeWindow:()=>Ol,createWindow:()=>$l,windowManager:()=>Te});function kl(){if(Te.stylesInjected)return;Te.stylesInjected=!0;let s=`
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
  `,e=document.createElement("style");e.id=Rl+"_styles",e.textContent=s,(document.head||document.documentElement).appendChild(e)}function $l(s){let{id:e,title:t="\u7A97\u53E3",content:o="",width:r=900,height:n=700,modal:i=!1,resizable:a=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:p,onReady:h}=s;kl();let g=window.jQuery||window.parent?.jQuery;if(!g)return console.error("[WindowManager] jQuery not available"),null;if(Te.isOpen(e))return Te.bringToFront(e),Te.getWindow(e);let v=window.innerWidth||1200,A=window.innerHeight||800,B=v<=1100,z=null,ue=!1;d&&(z=Te.getState(e),z&&!B&&(ue=!0));let X,pe;ue&&z.width&&z.height?(X=Math.max(400,Math.min(z.width,v-40)),pe=Math.max(300,Math.min(z.height,A-40))):(X=Math.max(400,Math.min(r,v-40)),pe=Math.max(300,Math.min(n,A-40)));let ae=Math.max(20,Math.min((v-X)/2,v-X-20)),se=Math.max(20,Math.min((A-pe)/2,A-pe-20)),T=l&&!B,I=`
    <div class="yyt-window" id="${e}" style="left:${ae}px; top:${se}px; width:${X}px; height:${pe}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Dl(t)}</span>
        </div>
        <div class="yyt-window-controls">
          ${T?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${o}</div>
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
  `,$=null;i&&($=g(`<div class="yyt-window-overlay" data-for="${e}"></div>`),g(document.body).append($));let C=g(I);g(document.body).append(C),Te.register(e,C),C.on("mousedown",()=>Te.bringToFront(e));let j=!1,oe={left:ae,top:se,width:X,height:pe},re=()=>{oe={left:parseInt(C.css("left")),top:parseInt(C.css("top")),width:C.width(),height:C.height()},C.addClass("maximized"),C.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),j=!0},ne=()=>{C.removeClass("maximized"),C.css({left:oe.left+"px",top:oe.top+"px",width:oe.width+"px",height:oe.height+"px"}),C.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),j=!1};C.find(".yyt-window-btn.maximize").on("click",()=>{j?ne():re()}),(B&&l||ue&&z.isMaximized&&l||c&&l)&&re(),C.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let Q={width:j?oe.width:C.width(),height:j?oe.height:C.height(),isMaximized:j};Te.saveState(e,Q)}p&&p(),$&&$.remove(),C.remove(),Te.unregister(e),g(document).off(".yytWindowDrag"+e),g(document).off(".yytWindowResize"+e)}),$&&$.on("click",Q=>{Q.target,$[0]});let _e=!1,Ce,Ne,be,He;if(C.find(".yyt-window-header").on("mousedown",Q=>{g(Q.target).closest(".yyt-window-controls").length||j||(_e=!0,Ce=Q.clientX,Ne=Q.clientY,be=parseInt(C.css("left")),He=parseInt(C.css("top")),g(document.body).css("user-select","none"))}),g(document).on("mousemove.yytWindowDrag"+e,Q=>{if(!_e)return;let Z=Q.clientX-Ce,Ze=Q.clientY-Ne;C.css({left:Math.max(0,be+Z)+"px",top:Math.max(0,He+Ze)+"px"})}),g(document).on("mouseup.yytWindowDrag"+e,()=>{_e&&(_e=!1,g(document.body).css("user-select",""))}),a){let Q=!1,Z="",Ze,Be,Y,u,f,w;C.find(".yyt-window-resize-handle").on("mousedown",function(b){j||(Q=!0,Z="",g(this).hasClass("se")?Z="se":g(this).hasClass("e")?Z="e":g(this).hasClass("s")?Z="s":g(this).hasClass("w")?Z="w":g(this).hasClass("n")?Z="n":g(this).hasClass("nw")?Z="nw":g(this).hasClass("ne")?Z="ne":g(this).hasClass("sw")&&(Z="sw"),Ze=b.clientX,Be=b.clientY,Y=C.width(),u=C.height(),f=parseInt(C.css("left")),w=parseInt(C.css("top")),g(document.body).css("user-select","none"),b.stopPropagation())}),g(document).on("mousemove.yytWindowResize"+e,b=>{if(!Q)return;let M=b.clientX-Ze,O=b.clientY-Be,W=400,P=300,N=Y,ee=u,ie=f,ye=w;if(Z.includes("e")&&(N=Math.max(W,Y+M)),Z.includes("s")&&(ee=Math.max(P,u+O)),Z.includes("w")){let xe=Y-M;xe>=W&&(N=xe,ie=f+M)}if(Z.includes("n")){let xe=u-O;xe>=P&&(ee=xe,ye=w+O)}C.css({width:N+"px",height:ee+"px",left:ie+"px",top:ye+"px"})}),g(document).on("mouseup.yytWindowResize"+e,()=>{Q&&(Q=!1,g(document.body).css("user-select",""))})}return C.on("remove",()=>{g(document).off(".yytWindowDrag"+e),g(document).off(".yytWindowResize"+e)}),h&&setTimeout(()=>h(C),50),C}function Ol(s){let e=Te.getWindow(s);if(e){let t=window.jQuery||window.parent?.jQuery;t&&(t(`.yyt-window-overlay[data-for="${s}"]`).remove(),t(document).off(".yytWindowDrag"+s),t(document).off(".yytWindowResize"+s)),e.remove(),Te.unregister(s)}}function Dl(s){return typeof s!="string"?"":s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Rl,ci,ao,Te,yr=D(()=>{Pe();Rl="youyou_toolkit_window_manager",ci="window_states",ao=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,t){this.topZIndex++,this.windows.set(e,{$el:t,zIndex:this.topZIndex}),t.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let t=this.windows.get(e);t&&(this.topZIndex++,t.zIndex=this.topZIndex,t.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,t)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,t){let o=this.loadStates();o[e]={...t,updatedAt:Date.now()},Ut.set(ci,o)}loadStates(){return Ut.get(ci)||{}}getState(e){return this.loadStates()[e]||null}},Te=new ao});var gi={};te(gi,{AUTO_RUNTIME_STATUS:()=>lo,ToolAutomationService:()=>co,default:()=>Ul,toolAutomationService:()=>yi});function Mt(s){return s==null?"":String(s).trim()}function Ll(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function di(){return Ll()?.SillyTavern||null}function Nl(s){return s?.eventSource||null}function Bl(s){return s?.eventTypes||{}}function ui(s){let e=s?.getContext?.()||null;return Mt(e?.chatId??e?.chat_id??s?.chatId??s?.chat_id??s?.chat_filename??s?.this_chid??"chat_default")||"chat_default"}function pi(s,e=""){return`${Mt(s)||"latest"}::${Mt(e)||"swipe:current"}`}var lo,co,yi,Ul,fi=D(()=>{Zt();le();Tt();Vs();sr();lo={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",SKIPPED:"skipped"};co=class{constructor(){this._stopCallbacks=[],this._pendingMessageTimers=new Map,this._handledMessageRevisions=new Set,this._slotQueues=new Map,this._currentChatId="",this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._enabled=!1,this.debugMode=!1}setDebugMode(e){this.debugMode=e===!0}init(){this.stop();let e=di();if(!e)return!1;this._currentChatId=ui(e);let t=Nl(e),o=Bl(e),r=typeof t?.on=="function"?t.on.bind(t):typeof t?.addListener=="function"?t.addListener.bind(t):null,n=typeof t?.off=="function"?t.off.bind(t):typeof t?.removeListener=="function"?t.removeListener.bind(t):null;if(!r||!n)return!1;let i=(l,c)=>{!l||typeof c!="function"||(r(l,c),this._stopCallbacks.push(()=>{try{n(l,c)}catch(d){this._log("\u53D6\u6D88\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25",l,d)}}))},a=(l,c,d,p={})=>{let h=this._resolveIncomingMessageId(c,d),g=this._resolveIncomingSwipeId(d),v=Number.isFinite(p?.settleMs)?p.settleMs:this._getAutomationSettings().settleMs;this._log(l,{messageId:h,swipeId:g,payload:d}),h&&this._scheduleMessageProcessing(h,g,{settleMs:v})};return i(o.MESSAGE_SENT||"MESSAGE_SENT",(...l)=>{this._log("MESSAGE_SENT",l)}),i(o.MESSAGE_RECEIVED||"MESSAGE_RECEIVED",(l,c)=>{a(o.MESSAGE_RECEIVED||"MESSAGE_RECEIVED",l,c)}),i(o.MESSAGE_UPDATED||"MESSAGE_UPDATED",(l,c)=>{a(o.MESSAGE_UPDATED||"MESSAGE_UPDATED",l,c,{settleMs:Math.max(0,this._getAutomationSettings().settleMs)})}),i(o.MESSAGE_SWIPED||"MESSAGE_SWIPED",(l,c)=>{a(o.MESSAGE_SWIPED||"MESSAGE_SWIPED",l,c)}),i(o.GENERATION_AFTER_COMMANDS||"GENERATION_AFTER_COMMANDS",(l,c)=>{a(o.GENERATION_AFTER_COMMANDS||"GENERATION_AFTER_COMMANDS",l,c)}),i(o.GENERATION_ENDED||"GENERATION_ENDED",(l,c)=>{a(o.GENERATION_ENDED||"GENERATION_ENDED",l,c)}),i(o.CHAT_CHANGED||"CHAT_CHANGED",()=>{this._resetForChatChange()}),i(o.MESSAGE_DELETED||"MESSAGE_DELETED",l=>{this._clearMessageState(l)}),this._stopCallbacks.push(E.on(_.SETTINGS_UPDATED,()=>{this._enabled=this.isEnabled()})),this._enabled=this.isEnabled(),!0}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(t){this._log("\u505C\u6B62\u81EA\u52A8\u670D\u52A1\u56DE\u8C03\u5931\u8D25",t)}}),this._stopCallbacks=[],this._pendingMessageTimers.forEach(e=>clearTimeout(e)),this._pendingMessageTimers.clear(),this._slotQueues.clear(),this._handledMessageRevisions.clear(),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._enabled=!1}isEnabled(){let e=this._getAutomationSettings();return e.enabled===!0&&e.autoRequestEnabled===!0}getRuntimeSnapshot(){return{currentChatId:this._currentChatId,isDuringExtraAnalysis:this._isDuringExtraAnalysis,isProcessingMessage:this._isProcessingMessage,pendingMessageCount:this._pendingMessageTimers.size,handledRevisionCount:this._handledMessageRevisions.size,queuedSlotCount:this._slotQueues.size,enabled:this._enabled}}async processCurrentAssistantMessage(e={}){let t=await tr({messageId:"",swipeId:"",runSource:"AUTO"}),o=Mt(t?.sourceMessageId||t?.messageId);return o?this.processAssistantMessage(o,{force:e.force===!0}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:t=!1,swipeId:o=""}={}){if(!e)return{success:!1,error:"\u7F3A\u5C11 messageId"};if(!this.isEnabled()&&!t)return{success:!1,skipped:!0,reason:"automation_disabled"};let r=await tr({messageId:e,swipeId:o,runSource:"AUTO"}),n=r?.targetAssistantMessage||null;if(!n||!r?.sourceMessageId)return{success:!1,skipped:!0,reason:"assistant_message_not_found"};let i=String(n.content||"").trim();if(!i||i.length<8)return{success:!1,skipped:!0,reason:"assistant_message_too_short"};let a=r.slotRevisionKey||"";if(!t&&a&&this._handledMessageRevisions.has(a))return{success:!1,skipped:!0,reason:"revision_already_handled"};let l=ct.filterAutoPostResponseTools(Jt());if(!l.length)return{success:!1,skipped:!0,reason:"no_auto_tools"};let c=r.slotBindingKey||pi(r.sourceMessageId,r.sourceSwipeId);return this._enqueueSlot(c,async()=>{this._isProcessingMessage=!0,this._isDuringExtraAnalysis=!0;let d=!0,p=[];try{for(let h of l){let g={...r,input:{...r.input||{},lastAiMessage:r.lastAiMessage,assistantBaseText:r.assistantBaseText}};this._markToolAutoRuntime(h.id,{lastAutoStatus:lo.RUNNING,lastAutoMessageId:r.sourceMessageId||"",lastAutoSwipeId:r.sourceSwipeId||"",lastAutoRevisionKey:r.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:""},{touchLastRunAt:!0});let v=await ct.runToolPostResponse(h,g);p.push(v);let A=v?.success===!0&&v?.meta?.writebackStatus===Se.SUCCESS&&v?.meta?.writebackDetails?.refreshConfirmed===!0;this._markToolAutoRuntime(h.id,{lastAutoStatus:A?lo.SUCCESS:lo.ERROR,lastAutoMessageId:r.sourceMessageId||"",lastAutoSwipeId:r.sourceSwipeId||"",lastAutoRevisionKey:r.slotRevisionKey||"",lastAutoWritebackStatus:v?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:v?.meta?.writebackDetails?.refreshConfirmed===!0,lastAutoSkipReason:A?"":v?.error||v?.meta?.failureStage||"auto_execution_failed"},{touchLastRunAt:!0}),A||(d=!1)}return d&&a&&this._handledMessageRevisions.add(a),{success:d,results:p,revisionKey:a,messageId:r.sourceMessageId||""}}finally{this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1}})}_markToolAutoRuntime(e,t={},o={}){let r={...t||{}};o.touchLastRunAt===!0&&(r.lastAutoRunAt=Date.now()),St(e,r,{touchLastRunAt:!1,emitEvent:!0})}_resolveIncomingMessageId(e,t){return Mt(e??t?.messageId??t?.message_id??t?.id??"")}_resolveIncomingSwipeId(e){return Mt(e?.swipeId??e?.swipe_id??e?.swipe??"")}_scheduleMessageProcessing(e,t="",o={}){if(!this.isEnabled())return;let r=Number.isFinite(o?.settleMs)?o.settleMs:this._getAutomationSettings().settleMs,n=pi(e,t),i=this._pendingMessageTimers.get(n);i&&clearTimeout(i);let a=setTimeout(()=>{this._pendingMessageTimers.delete(n),this.processAssistantMessage(e,{swipeId:t}).catch(l=>{this._log("\u81EA\u52A8\u5904\u7406 assistant \u6D88\u606F\u5931\u8D25",l)})},Math.max(0,r));this._pendingMessageTimers.set(n,a)}_resetForChatChange(){let e=di();this._currentChatId=ui(e),this._pendingMessageTimers.forEach(t=>clearTimeout(t)),this._pendingMessageTimers.clear(),this._slotQueues.clear(),this._handledMessageRevisions.clear(),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1}_clearMessageState(e){let t=Mt(e);t&&(Array.from(this._pendingMessageTimers.entries()).forEach(([o,r])=>{o.startsWith(`${t}::`)&&(clearTimeout(r),this._pendingMessageTimers.delete(o))}),Array.from(this._handledMessageRevisions).forEach(o=>{(o.includes(`::${t}::`)||o.includes(`${t}::`))&&this._handledMessageRevisions.delete(o)}))}_enqueueSlot(e,t){let r=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(t).finally(()=>{this._slotQueues.get(e)===r&&this._slotQueues.delete(e)});return this._slotQueues.set(e,r),r}_getAutomationSettings(){let e=Ae.getSettings()?.automation||{};return{enabled:e.enabled===!0,autoRequestEnabled:e.autoRequestEnabled!==!1,settleMs:Number.isFinite(e.settleMs)?e.settleMs:1200,cooldownMs:Number.isFinite(e.cooldownMs)?e.cooldownMs:5e3,maxConcurrentSlots:Number.isFinite(e.maxConcurrentSlots)?e.maxConcurrentSlots:1}}_log(...e){(this.debugMode||Ae.getDebugSettings()?.enableDebugLog)&&console.log("[ToolAutomationService]",...e)}},yi=new co,Ul=yi});function mi(s,e={}){let{constants:t,topLevelWindow:o,modules:r}=s,{SCRIPT_ID:n,SCRIPT_VERSION:i,MENU_ITEM_ID:a,MENU_CONTAINER_ID:l}=t,c=null,d=!1,p=new Map,h={storageModule:()=>Promise.resolve().then(()=>(yo(),po)),uiComponentsModule:()=>Promise.resolve().then(()=>(ii(),ni)),promptEditorModule:()=>Promise.resolve().then(()=>(li(),ai)),toolExecutorModule:()=>Promise.resolve().then(()=>(Zs(),Qs)),windowManagerModule:()=>Promise.resolve().then(()=>(yr(),pr))};function g(...T){console.log(`[${n}]`,...T)}function v(...T){console.error(`[${n}]`,...T)}async function A(T){return!T||!h[T]?null:r[T]?r[T]:(p.has(T)||p.set(T,(async()=>{try{let I=await h[T]();return r[T]=I,I}catch(I){throw p.delete(T),I}})()),p.get(T))}async function B(){return c||(c=(async()=>{try{return r.storageModule=await Promise.resolve().then(()=>(yo(),po)),r.apiConnectionModule=await Promise.resolve().then(()=>(ds(),_r)),r.presetManagerModule=await Promise.resolve().then(()=>(ms(),Cr)),r.uiModule=await Promise.resolve().then(()=>(dr(),Jn)),r.regexExtractorModule=await Promise.resolve().then(()=>(As(),zr)),r.toolManagerModule=await Promise.resolve().then(()=>(Ns(),qr)),r.toolExecutorModule=await Promise.resolve().then(()=>(Zs(),Qs)),r.windowManagerModule=await Promise.resolve().then(()=>(yr(),pr)),r.toolRegistryModule=await Promise.resolve().then(()=>(Tt(),yn)),r.settingsServiceModule=await Promise.resolve().then(()=>(Zt(),fn)),r.bypassManagerModule=await Promise.resolve().then(()=>(Xt(),gn)),r.variableResolverModule=await Promise.resolve().then(()=>(Xo(),xn)),r.contextInjectorModule=await Promise.resolve().then(()=>(Jo(),hn)),r.toolPromptServiceModule=await Promise.resolve().then(()=>(Qo(),wn)),r.toolOutputServiceModule=await Promise.resolve().then(()=>(Vs(),Tn)),r.toolAutomationServiceModule=await Promise.resolve().then(()=>(fi(),gi)),r.toolOutputServiceModule?.toolOutputService&&r.apiConnectionModule&&r.toolOutputServiceModule.toolOutputService.setApiConnection(r.apiConnectionModule),!0}catch(T){return c=null,console.warn(`[${n}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,T),!1}})(),c)}function z(){return`
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
    `}async function ue(){let T=`${n}-styles`,I=o.document||document;if(I.getElementById(T))return;let $="",C=[];try{C.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{C.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}C.push("./styles/main.css");for(let oe of[...new Set(C.filter(Boolean))])try{let re=await fetch(oe);if(re.ok){$=await re.text();break}}catch{}$||(g("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),$=z());let j=I.createElement("style");j.id=T,j.textContent=$,(I.head||I.documentElement).appendChild(j),g("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function X(){let T=o.document||document;if(r.uiModule?.getAllStyles){let I=`${n}-ui-styles`;if(!T.getElementById(I)){let $=T.createElement("style");$.id=I,$.textContent=r.uiModule.getAllStyles(),(T.head||T.documentElement).appendChild($)}}if(r.promptEditorModule&&r.promptEditorModule.getPromptEditorStyles){let I=`${n}-prompt-styles`;if(!T.getElementById(I)){let $=T.createElement("style");$.id=I,$.textContent=r.promptEditorModule.getPromptEditorStyles(),(T.head||T.documentElement).appendChild($)}}}async function pe(){try{let{applyUiPreferences:T}=await Promise.resolve().then(()=>(to(),Yn));if(r.settingsServiceModule?.settingsService){let I=r.settingsServiceModule.settingsService.getUiSettings();if(I&&I.theme){let $=o.document||document;T(I,$),g(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${I.theme}`)}}}catch(T){g("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",T)}}function ae(){let T=o.jQuery||window.jQuery;if(!T){v("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(ae,1e3);return}let I=o.document||document,$=T("#extensionsMenu",I);if(!$.length){g("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(ae,2e3);return}if(T(`#${l}`,$).length>0){g("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let j=T(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),oe=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${a}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,re=T(oe);re.on("click",function(_e){_e.stopPropagation(),g("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Ce=T("#extensionsMenuButton",I);Ce.length&&$.is(":visible")&&Ce.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),j.append(re),$.append(j),g("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function se(){if(g(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${i}`),await ue(),await B()){if(g("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!d&&r.uiModule?.initUI)try{r.uiModule.initUI({services:r,autoInjectStyles:!1,targetDocument:o.document||document}),d=!0,g("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch($){console.error(`[${n}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,$)}X(),await pe(),r.toolAutomationServiceModule?.toolAutomationService&&(r.toolAutomationServiceModule.toolAutomationService.init(),g("\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316"))}else g("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let I=o.document||document;I.readyState==="loading"?I.addEventListener("DOMContentLoaded",()=>{setTimeout(ae,1e3)}):setTimeout(ae,1e3),g("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:B,injectStyles:ue,addMenuItem:ae,loadLegacyModule:A,init:se,log:g,logError:v}}function hi(s){let{constants:e,topLevelWindow:t,modules:o,caches:r,uiState:n}=s,{SCRIPT_ID:i,SCRIPT_VERSION:a,POPUP_ID:l}=e,c={cleanup:null},d={cleanups:[]};function p(...u){console.log(`[${i}]`,...u)}function h(...u){console.error(`[${i}]`,...u)}async function g(u){if(o[u])return o[u];let f=s?.services?.loadLegacyModule;if(typeof f!="function")return null;try{return await f(u)}catch(w){return h(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${u}`,w),null}}function v(u){return typeof u!="string"?"":u.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function A(){return t.jQuery||window.jQuery}function B(){return t.document||document}function z(u){if(!u)return"\u672A\u9009\u62E9\u9875\u9762";let f=o.toolRegistryModule?.getToolConfig(u);if(!f)return u;if(!f.hasSubTabs)return f.name||u;let w=n.currentSubTab[u]||f.subTabs?.[0]?.id||"",b=f.subTabs?.find(M=>M.id===w);return b?.name?`${f.name} / ${b.name}`:f.name||u}function ue(u){if(!u)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let f=o.toolRegistryModule?.getToolConfig(u);if(!f)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!f.hasSubTabs)return f.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let w=n.currentSubTab[u]||f.subTabs?.[0]?.id||"";return f.subTabs?.find(M=>M.id===w)?.description||f.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function X(){let u=n.currentPopup;if(!u)return;let f=z(n.currentMainTab),w=ue(n.currentMainTab),b=u.querySelector(".yyt-popup-active-label");b&&(b.textContent=`\u5F53\u524D\uFF1A${f}`);let M=u.querySelector(".yyt-shell-breadcrumb");M&&(M.textContent=f);let O=u.querySelector(".yyt-shell-main-title");O&&(O.textContent=f);let W=u.querySelector(".yyt-shell-main-description");W&&(W.textContent=w);let P=u.querySelector(".yyt-shell-current-page");P&&(P.textContent=f);let N=u.querySelector(".yyt-shell-current-desc");N&&(N.textContent=w)}function pe(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function ae(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(u=>{typeof u=="function"&&u()}),d.cleanups=[])}function se(u){return!!u?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function T(u){let f=u?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body"].join(","));return f?f.scrollHeight>f.clientHeight+2||f.scrollWidth>f.clientWidth+2:!1}function I(u,f){return f?.closest?.(".yyt-scrollable-surface")===u}function $(u,f){return!u||!f?null:[f.closest?.(".yyt-tool-list"),f.closest?.(".yyt-settings-content"),f.closest?.(".yyt-sub-content"),f.closest?.(".yyt-tab-content.active"),u].filter(Boolean).find(b=>b!==u&&!u.contains(b)?!1:b.scrollHeight>b.clientHeight+2||b.scrollWidth>b.clientWidth+2)||u}function C(u){let f=B();if(!u||!f)return;u.classList.add("yyt-scrollable-surface");let w=!1,b=!1,M=0,O=0,W=0,P=0,N=!1,ee=!1,ie=()=>{w=!1,b=!1,u.classList.remove("yyt-scroll-dragging")},ye=R=>{R.button===0&&(se(R.target)||I(u,R.target)&&(N=u.scrollWidth>u.clientWidth+2,ee=u.scrollHeight>u.clientHeight+2,!(!N&&!ee)&&(R.stopPropagation(),w=!0,b=!1,M=R.clientX,O=R.clientY,W=u.scrollLeft,P=u.scrollTop)))},xe=R=>{if(!w)return;let We=R.clientX-M,ve=R.clientY-O;!(Math.abs(We)>4||Math.abs(ve)>4)&&!b||(b=!0,u.classList.add("yyt-scroll-dragging"),N&&(u.scrollLeft=W-We),ee&&(u.scrollTop=P-ve),R.preventDefault())},et=()=>{ie()},tt=R=>{if(R.ctrlKey||T(R.target))return;let We=u.classList.contains("yyt-content");if(!We&&!I(u,R.target))return;let ve=$(u,R.target);!ve||!(ve.scrollHeight>ve.clientHeight+2||ve.scrollWidth>ve.clientWidth+2)||(Math.abs(R.deltaY)>0&&(ve.scrollTop+=R.deltaY),Math.abs(R.deltaX)>0&&(ve.scrollLeft+=R.deltaX),R.preventDefault(),(!We||ve!==u)&&R.stopPropagation())},L=R=>{b&&R.preventDefault()};u.addEventListener("mousedown",ye),u.addEventListener("wheel",tt,{passive:!1}),u.addEventListener("dragstart",L),f.addEventListener("mousemove",xe),f.addEventListener("mouseup",et),d.cleanups.push(()=>{ie(),u.classList.remove("yyt-scrollable-surface"),u.removeEventListener("mousedown",ye),u.removeEventListener("wheel",tt),u.removeEventListener("dragstart",L),f.removeEventListener("mousemove",xe),f.removeEventListener("mouseup",et)})}function j(){let u=n.currentPopup;if(!u)return;ae();let f=[...u.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...u.querySelectorAll(".yyt-sub-nav"),...u.querySelectorAll(".yyt-content"),...u.querySelectorAll(".yyt-tab-content.active"),...u.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...u.querySelectorAll(".yyt-settings-content"),...u.querySelectorAll(".yyt-tool-list")];[...new Set(f)].forEach(C)}function oe(){let u=B(),f=n.currentPopup,w=f?.querySelector(".yyt-popup-header");if(!f||!w||!u)return;let b=!1,M=0,O=0,W=0,P=0,N="",ee=()=>({width:t.innerWidth||u.documentElement?.clientWidth||window.innerWidth||0,height:t.innerHeight||u.documentElement?.clientHeight||window.innerHeight||0}),ie=(L,R,We)=>Math.min(Math.max(L,R),We),ye=()=>{b&&(b=!1,f.classList.remove("yyt-popup-dragging"),u.body.style.userSelect=N)},xe=L=>{if(!b||!n.currentPopup)return;let R=L.clientX-M,We=L.clientY-O,{width:ve,height:uo}=ee(),vi=f.offsetWidth||0,wi=f.offsetHeight||0,Si=Math.max(0,ve-vi),Ti=Math.max(0,uo-wi);f.style.left=`${ie(W+R,0,Si)}px`,f.style.top=`${ie(P+We,0,Ti)}px`,f.style.transform="none",f.style.right="auto",f.style.bottom="auto"},et=()=>{ye()},tt=L=>{if(L.button!==0||L.target?.closest(".yyt-popup-close"))return;b=!0,M=L.clientX,O=L.clientY;let R=f.getBoundingClientRect();W=R.left,P=R.top,f.style.left=`${R.left}px`,f.style.top=`${R.top}px`,f.style.transform="none",f.style.right="auto",f.style.bottom="auto",f.classList.add("yyt-popup-dragging"),N=u.body.style.userSelect||"",u.body.style.userSelect="none",L.preventDefault()};w.addEventListener("mousedown",tt),u.addEventListener("mousemove",xe),u.addEventListener("mouseup",et),c.cleanup=()=>{ye(),w.removeEventListener("mousedown",tt),u.removeEventListener("mousemove",xe),u.removeEventListener("mouseup",et)}}function re(){pe(),ae(),n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),p("\u5F39\u7A97\u5DF2\u5173\u95ED")}function ne(u){n.currentMainTab=u;let f=A();if(!f||!n.currentPopup)return;f(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),f(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${u}"]`).addClass("active");let w=o.toolRegistryModule?.getToolConfig(u);w?.hasSubTabs?(f(n.currentPopup).find(".yyt-sub-nav").show(),Ce(u,w.subTabs)):f(n.currentPopup).find(".yyt-sub-nav").hide(),f(n.currentPopup).find(".yyt-tab-content").removeClass("active"),f(n.currentPopup).find(`.yyt-tab-content[data-tab="${u}"]`).addClass("active"),Ne(u),X(),j()}function _e(u,f){n.currentSubTab[u]=f;let w=A();!w||!n.currentPopup||(w(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),w(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${f}"]`).addClass("active"),be(u,f),X(),j())}function Ce(u,f){let w=A();if(!w||!n.currentPopup||!f)return;let b=n.currentSubTab[u]||f[0]?.id,M=f.map(O=>`
      <div class="yyt-sub-nav-item ${O.id===b?"active":""}" data-subtab="${O.id}">
        <i class="fa-solid ${O.icon||"fa-file"}"></i>
        <span>${O.name}</span>
      </div>
    `).join("");w(n.currentPopup).find(".yyt-sub-nav").html(M),w(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let W=w(this).data("subtab");_e(u,W)}),j()}async function Ne(u){let f=A();if(!f||!n.currentPopup)return;let w=f(n.currentPopup).find(`.yyt-tab-content[data-tab="${u}"]`);if(!w.length)return;let b=o.toolRegistryModule?.getToolConfig(u);switch(u){case"apiPresets":if(o.uiModule?.renderApiPanel)o.uiModule.renderApiPanel(w);else{let M=await g("uiComponentsModule");M?.render&&M.render(w)}break;case"toolManage":if(o.uiModule?.renderToolPanel)o.uiModule.renderToolPanel(w);else{let M=await g("uiComponentsModule");M?.renderTool&&M.renderTool(w)}break;case"regexExtract":if(o.uiModule?.renderRegexPanel)o.uiModule.renderRegexPanel(w);else{let M=await g("uiComponentsModule");M?.renderRegex&&M.renderRegex(w)}break;case"tools":if(b?.hasSubTabs&&b.subTabs?.length>0){let M=n.currentSubTab[u]||b.subTabs[0].id;await be(u,M)}else w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":o.uiModule?.renderBypassPanel?o.uiModule.renderBypassPanel(w):w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":o.uiModule?.renderSettingsPanel?o.uiModule.renderSettingsPanel(w):w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:Q(u,w);break}j()}async function be(u,f){let w=A();if(!w||!n.currentPopup)return;let b=w(n.currentPopup).find(`.yyt-tab-content[data-tab="${u}"]`);if(!b.length)return;let M=o.toolRegistryModule?.getToolConfig(u);if(M?.hasSubTabs){let W=M.subTabs?.find(P=>P.id===f);if(W){let P=b.find(".yyt-sub-content");switch(P.length||(b.html('<div class="yyt-sub-content"></div>'),P=b.find(".yyt-sub-content")),W.component){case"SummaryToolPanel":if(o.uiModule?.renderSummaryToolPanel)o.uiModule.renderSummaryToolPanel(P);else{let N=await g("uiComponentsModule");N?.SummaryToolPanel?N.SummaryToolPanel.renderTo(P):P.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(o.uiModule?.renderStatusBlockPanel)o.uiModule.renderStatusBlockPanel(P);else{let N=await g("uiComponentsModule");N?.StatusBlockPanel?N.StatusBlockPanel.renderTo(P):P.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(o.uiModule?.renderYouyouReviewPanel)o.uiModule.renderYouyouReviewPanel(P);else{let N=await g("uiComponentsModule");N?.YouyouReviewPanel?N.YouyouReviewPanel.renderTo(P):P.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await He(W,P);break;default:P.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let O=b.find(".yyt-sub-content");if(O.length){switch(f){case"config":Z(u,O);break;case"prompts":await Ze(u,O);break;case"presets":Be(u,O);break;default:O.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}j()}}async function He(u,f){if(!(!A()||!f?.length||!u?.id))try{let b=r.dynamicToolPanelCache.get(u.id);if(!b){let O=(await Promise.resolve().then(()=>(ss(),Un)))?.createToolConfigPanel;if(typeof O!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");b=O({id:`${u.id}Panel`,toolId:u.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${u.name||u.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${u.id}-extraction-preview`,previewTitle:`${u.name||u.id} \u63D0\u53D6\u9884\u89C8`}),r.dynamicToolPanelCache.set(u.id,b)}b.renderTo(f),j()}catch(b){console.error(`[${i}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,b),f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function Q(u,f){if(!A())return;let b=o.toolRegistryModule?.getToolConfig(u);if(!b){f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let M=n.currentSubTab[u]||b.subTabs?.[0]?.id||"config";f.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${M}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),be(u,M)}function Z(u,f){if(!A())return;let b=o.toolManagerModule?.getTool(u),M=o.presetManagerModule?.getAllPresets()||[],O=o.toolRegistryModule?.getToolApiPreset(u)||"",W=M.map(P=>`<option value="${v(P.name)}" ${P.name===O?"selected":""}>${v(P.name)}</option>`).join("");f.html(`
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
              ${W}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${b?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${b?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),f.find("#yyt-save-tool-preset").on("click",function(){let N=f.find("#yyt-tool-api-preset").val();o.toolRegistryModule?.setToolApiPreset(u,N);let ee=t.toastr;ee&&ee.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function Ze(u,f){let w=A(),b=o.promptEditorModule||await g("promptEditorModule");if(!w||!b){f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let O=o.toolManagerModule?.getTool(u)?.config?.messages||[],W=b.messagesToSegments?b.messagesToSegments(O):b.DEFAULT_PROMPT_SEGMENTS,P=new b.PromptEditor({containerId:`yyt-prompt-editor-${u}`,segments:W,onChange:ee=>{let ie=b.segmentsToMessages?b.segmentsToMessages(ee):[];p("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ie.length,"\u6761\u6D88\u606F")}});f.html(`<div id="yyt-prompt-editor-${u}" class="yyt-prompt-editor-container"></div>`),P.init(f.find(`#yyt-prompt-editor-${u}`));let N=b.getPromptEditorStyles?b.getPromptEditorStyles():"";if(N){let ee="yyt-prompt-editor-styles",ie=t.document||document;if(!ie.getElementById(ee)){let ye=ie.createElement("style");ye.id=ee,ye.textContent=N,(ie.head||ie.documentElement).appendChild(ye)}}}function Be(u,f){A()&&f.html(`
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
    `)}async function Y(){if(n.currentPopup){p("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let u=s?.services?.loadModules;typeof u=="function"&&await u();let f=A(),w=B();if(!f){h("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let b=o.toolRegistryModule?.getToolList()||[];if(!b.length){h("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}b.some(L=>L.id===n.currentMainTab)||(n.currentMainTab=b[0].id);let M=o.toolRegistryModule?.getToolConfig("tools"),O=Array.isArray(M?.subTabs)?M.subTabs:[],W=O.filter(L=>L?.isCustom).length,P=O.filter(L=>!L?.isCustom).length,N=z(n.currentMainTab),ee=ue(n.currentMainTab);n.currentOverlay=w.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",L=>{L.target===n.currentOverlay&&re()}),w.body.appendChild(n.currentOverlay);let ie=b.map(L=>`
      <div class="yyt-main-nav-item ${L.id===n.currentMainTab?"active":""}" data-tab="${L.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(L.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(L.name||L.id)}</span>
          <span class="yyt-main-nav-desc">${v(L.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),ye=b.map(L=>`
      <div class="yyt-tab-content ${L.id===n.currentMainTab?"active":""}" data-tab="${L.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),xe=`
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
                  <strong class="yyt-shell-current-page">${v(N)}</strong>
                  <span class="yyt-shell-current-desc">${v(ee)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${b.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${P}</strong>
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
                    <span class="yyt-shell-sidebar-hint">${b.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${ie}
                  </div>
                  <div class="yyt-shell-sidebar-note">
                    \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
                  </div>
                </div>
              </aside>

              <section class="yyt-shell-main">
                <div class="yyt-shell-main-header">
                  <div class="yyt-shell-main-heading-block">
                    <div class="yyt-shell-main-label">\u5F53\u524D\u9875\u9762</div>
                    <div class="yyt-shell-main-title">${v(N)}</div>
                    <div class="yyt-shell-main-description">${v(ee)}</div>
                  </div>
                  <div class="yyt-shell-main-actions">
                    <div class="yyt-shell-main-meta">
                      <i class="fa-solid fa-circle-info"></i>
                      <span>\u4FDD\u5B58\u540E\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u4F1A\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
                    </div>
                  </div>
                </div>

                <div class="yyt-sub-nav" style="display: none;">
                  <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
                </div>

                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${ye}
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
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${v(N)}</span>
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
    `,et=w.createElement("div");et.innerHTML=xe,n.currentPopup=et.firstElementChild,w.body.appendChild(n.currentPopup),f(n.currentPopup).find(".yyt-popup-close").on("click",re),f(n.currentPopup).find(`#${i}-close-btn`).on("click",re),f(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let R=f(this).data("tab");R&&ne(R)}),oe(),Ne(n.currentMainTab);let tt=o.toolRegistryModule?.getToolConfig(n.currentMainTab);tt?.hasSubTabs&&(f(n.currentPopup).find(".yyt-sub-nav").show(),Ce(n.currentMainTab,tt.subTabs)),X(),j(),p("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Y,closePopup:re,switchMainTab:ne,switchSubTab:_e,renderTabContent:Ne,renderSubTabContent:be}}function bi(s,e={}){let{constants:t,modules:o}=s,{SCRIPT_ID:r,SCRIPT_VERSION:n}=t,{init:i,loadModules:a,loadLegacyModule:l,addMenuItem:c,popupShell:d}=e;return{version:n,id:r,init:i,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:c,getStorage:()=>o.storageModule,getApiConnection:()=>o.apiConnectionModule,getPresetManager:()=>o.presetManagerModule,getUi:()=>o.uiModule,getUiModule:()=>o.uiModule,getUiComponents:()=>o.uiComponentsModule,getRegexExtractor:()=>o.regexExtractorModule,getToolManager:()=>o.toolManagerModule,getToolExecutor:()=>o.toolExecutorModule,getWindowManager:()=>o.windowManagerModule,getToolRegistry:()=>o.toolRegistryModule,getPromptEditor:()=>o.promptEditorModule,getSettingsService:()=>o.settingsServiceModule,getBypassManager:()=>o.bypassManagerModule,getVariableResolver:()=>o.variableResolverModule,getContextInjector:()=>o.contextInjectorModule,getToolPromptService:()=>o.toolPromptServiceModule,getToolOutputService:()=>o.toolOutputServiceModule,getToolAutomationService:()=>o.toolAutomationServiceModule,async loadLegacyModule(p){return typeof l!="function"?null:l(p)},async getApiConfig(){return await a(),o.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(p){return await a(),o.apiConnectionModule?(o.apiConnectionModule.updateApiConfig(p),!0):!1},async getPresets(){return await a(),o.presetManagerModule?o.presetManagerModule.getAllPresets():[]},async sendApiRequest(p,h){if(await a(),o.apiConnectionModule)return o.apiConnectionModule.sendApiRequest(p,h);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await a(),o.apiConnectionModule?o.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(p,h){return o.toolRegistryModule?.registerTool(p,h)||!1},unregisterTool(p){return o.toolRegistryModule?.unregisterTool(p)||!1},getToolList(){return o.toolRegistryModule?.getToolList()||[]},createWindow(p){return o.windowManagerModule?.createWindow(p)||null},closeWindow(p){o.windowManagerModule?.closeWindow(p)},startAutomation(){return o.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){o.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return o.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},async processCurrentAssistantMessage(p={}){return o.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(p)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var ls="youyou_toolkit",zl="0.6.2",jl=`${ls}-menu-item`,Fl=`${ls}-menu-container`,Yl=`${ls}-popup`,Hl=typeof window.parent<"u"?window.parent:window,cs={constants:{SCRIPT_ID:ls,SCRIPT_VERSION:zl,MENU_ITEM_ID:jl,MENU_CONTAINER_ID:Fl,POPUP_ID:Yl},topLevelWindow:Hl,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},xi=hi(cs),At=mi(cs,{openPopup:xi.openPopup});cs.services.loadModules=At.loadModules;cs.services.loadLegacyModule=At.loadLegacyModule;var gr=bi(cs,{init:At.init,loadModules:At.loadModules,loadLegacyModule:At.loadLegacyModule,addMenuItem:At.addMenuItem,popupShell:xi});if(typeof window<"u"&&(window.YouYouToolkit=gr,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=gr}catch{}var Jd=gr;At.init();console.log(`[${ls}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{Jd as default};
