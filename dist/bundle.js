var Qi=Object.defineProperty;var O=(s,e)=>()=>(s&&(e=s(s=0)),e);var ie=(s,e)=>{for(var t in e)Qi(s,t,{get:e[t],enumerable:!0})};function Lr(){let s=v;return s._getStorage(),s._storage}function Nr(){return v.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Br(s){v.set("settings",s)}var dt,v,G,Dr,qt,Oe=O(()=>{dt=class s{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t?.extensionSettings)return t.extensionSettings[this.namespace]||(t.extensionSettings[this.namespace]={}),this._storage={_target:t.extensionSettings[this.namespace],getItem:o=>{let r=t.extensionSettings[this.namespace][o];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(o,r)=>{t.extensionSettings[this.namespace][o]=r,this._saveSettings(t)},removeItem:o=>{delete t.extensionSettings[this.namespace][o],this._saveSettings(t)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,t)=>{try{localStorage.setItem(e,t)}catch(o){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,o)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,t=null){let o=`${this.namespace}:${e}`;if(this._cache.has(o))return this._cache.get(o);let r=this._getStorage(),n=this._getFullKey(e),i=r.getItem(n);if(i===null)return t;try{let a=JSON.parse(i);return this._cache.set(o,a),a}catch{return i}}set(e,t){let o=this._getStorage(),r=this._getFullKey(e),n=`${this.namespace}:${e}`;this._cache.set(n,t);try{o.setItem(r,JSON.stringify(t))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(e){let t=this._getStorage(),o=this._getFullKey(e),r=`${this.namespace}:${e}`;this._cache.delete(r),t.removeItem(o)}has(e){let t=this._getStorage(),o=this._getFullKey(e);return t.getItem(o)!==null}clear(){if(this._getStorage()._isTavern){let t=typeof window.parent<"u"?window.parent:window;if(t.SillyTavern?.getContext){let o=t.SillyTavern.getContext();o?.extensionSettings?.[this.namespace]&&(o.extensionSettings[this.namespace]={},this._saveSettings(o))}}else{let t=`${this.namespace}_`,o=[];for(let r=0;r<localStorage.length;r++){let n=localStorage.key(r);n&&n.startsWith(t)&&o.push(n)}o.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new s(`${this.namespace}:${e}`)}getMultiple(e){let t={};return e.forEach(o=>{t[o]=this.get(o)}),t}setMultiple(e){Object.entries(e).forEach(([t,o])=>{this.set(t,o)})}exportAll(){let e=this._getStorage(),t={};if(e._isTavern){let o=typeof window.parent<"u"?window.parent:window;if(o.SillyTavern?.getContext){let n=o.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(n).forEach(([i,a])=>{t[i]=typeof a=="string"?JSON.parse(a):a})}}else{let o=`${this.namespace}_`;for(let r=0;r<localStorage.length;r++){let n=localStorage.key(r);if(n&&n.startsWith(o)){let i=n.slice(o.length);try{t[i]=JSON.parse(localStorage.getItem(n))}catch{t[i]=localStorage.getItem(n)}}}}return t}},v=new dt("youyou_toolkit"),G=new dt("youyou_toolkit:tools"),Dr=new dt("youyou_toolkit:presets"),qt=new dt("youyou_toolkit:windows")});var ko={};ie(ko,{DEFAULT_API_PRESETS:()=>ea,DEFAULT_SETTINGS:()=>Zi,STORAGE_KEYS:()=>Gt,StorageService:()=>dt,deepMerge:()=>Ur,getCurrentPresetName:()=>oa,getStorage:()=>Lr,loadApiPresets:()=>ta,loadSettings:()=>Nr,presetStorage:()=>Dr,saveApiPresets:()=>sa,saveSettings:()=>Br,setCurrentPresetName:()=>ra,storage:()=>v,toolStorage:()=>G,windowStorage:()=>qt});function ta(){return v.get(Gt.API_PRESETS)||[]}function sa(s){v.set(Gt.API_PRESETS,s)}function oa(){return v.get(Gt.CURRENT_PRESET)||""}function ra(s){v.set(Gt.CURRENT_PRESET,s||"")}function Ur(s,e){let t=r=>r&&typeof r=="object"&&!Array.isArray(r),o={...s};return t(s)&&t(e)&&Object.keys(e).forEach(r=>{t(e[r])?r in s?o[r]=Ur(s[r],e[r]):Object.assign(o,{[r]:e[r]}):Object.assign(o,{[r]:e[r]})}),o}var Gt,Zi,ea,Co=O(()=>{Oe();Oe();Gt={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},Zi={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},ea=[]});var E,Po,M,pe=O(()=>{E={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Po=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,t,o={}){if(!e||typeof t!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=o;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:t,priority:r};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,t)}off(e,t){let o=this.listeners.get(e);if(o){for(let r of o)if(r.callback===t){o.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,t){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,t),this._addToHistory(e,t);let o=this.listeners.get(e);if(!o||o.size===0)return;let r=Array.from(o).sort((n,i)=>i.priority-n.priority);for(let{callback:n}of r)try{n(t)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,i)}}once(e,t){let o=r=>{this.off(e,o),t(r)};return this.on(e,o)}wait(e,t=0){return new Promise((o,r)=>{let n=null,i=this.once(e,a=>{n&&clearTimeout(n),o(a)});t>0&&(n=setTimeout(()=>{i(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},t))})}hasListeners(e){let t=this.listeners.get(e);return t&&t.size>0}listenerCount(e){let t=this.listeners.get(e);return t?t.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,t){this.history.push({event:e,data:t,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(t=>t.event===e):[...this.history]}clearHistory(){this.history=[]}},M=new Po});function b(s){return typeof s!="string"?"":s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function h(s,e,t=3e3){e||(e=s==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let o=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(o.toastr){o.toastr[s](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:t,progressBar:!0});return}na(s,e,t),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${s.toUpperCase()}] ${e}`)}function De(s,e,t={}){e||(e=s==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:o=3500,sticky:r=!1,noticeId:n=""}=t,i=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!i?.body){h(s,e,o);return}let a="yyt-top-notice-container",l="yyt-top-notice-styles",c=i.getElementById(a);if(c||(c=i.createElement("div"),c.id=a,c.style.cssText=`
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
    `,i.body.appendChild(c)),!i.getElementById(l)){let P=i.createElement("style");P.id=l,P.textContent=`
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
    `,i.head.appendChild(P)}if(n){let P=c.querySelector(`[data-notice-id="${n}"]`);P&&P.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=i.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${s||"info"}`,n&&(u.dataset.noticeId=n);let f=i.createElement("span");f.className="yyt-top-notice__icon",f.textContent=d[s]||d.info;let y=i.createElement("div");y.className="yyt-top-notice__content",y.textContent=e;let x=i.createElement("button");x.className="yyt-top-notice__close",x.type="button",x.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),x.textContent="\xD7";let S=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};x.addEventListener("click",S),u.appendChild(f),u.appendChild(y),u.appendChild(x),c.appendChild(u),r||setTimeout(S,o)}function na(s,e,t){let o=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!o)return;let r=o.getElementById("yyt-fallback-toast");r&&r.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=n[s]||n.info,a=o.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
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
    `,o.head.appendChild(l)}o.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},t)}function j(){if(bt)return bt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return bt=window.parent.jQuery,bt}catch{}return window.jQuery&&(bt=window.jQuery),bt}function ia(){bt=null}function H(s){return s&&s.length>0}function pt(s,e=p){if(!j()||!H(s))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let o=s.find(`#${e}-model`).val()?.trim()||"",r=s.find(`#${e}-model-select`);return r.is(":visible")&&(o=r.val()||o),{url:s.find(`#${e}-api-url`).val()?.trim()||"",apiKey:s.find(`#${e}-api-key`).val()||"",model:o,useMainApi:s.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(s.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(s.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(s.find(`#${e}-top-p`).val())??.9}}function xt(s,e,t=p){if(!j()||!H(s)||!e)return;s.find(`#${t}-api-url`).val(e.url||""),s.find(`#${t}-api-key`).val(e.apiKey||""),s.find(`#${t}-model`).val(e.model||""),s.find(`#${t}-max-tokens`).val(e.max_tokens||4096),s.find(`#${t}-temperature`).val(e.temperature??.7),s.find(`#${t}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;s.find(`#${t}-use-main-api`).prop("checked",r);let i=s.find(`#${t}-custom-api-fields`);r?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),s.find(`#${t}-model`).show(),s.find(`#${t}-model-select`).hide()}function Vt(s){let{id:e,title:t,body:o,width:r="380px",wide:n=!1}=s;return`
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
  `}function Jt(s,e,t={}){if(!j())return()=>{};let r=s.find(`#${e}-overlay`),n=()=>{r.remove(),t.onClose&&t.onClose()};return r.find(`#${e}-close, #${e}-cancel`).on("click",n),r.on("click",function(i){i.target===this&&n()}),r.find(`#${e}-save`).on("click",function(){t.onSave&&t.onSave(n)}),n}function et(s,e){let t=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(t),r=document.createElement("a");r.href=o,r.download=e,r.click(),URL.revokeObjectURL(o)}function tt(s){return new Promise((e,t)=>{let o=new FileReader;o.onload=r=>e(r.target.result),o.onerror=r=>t(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),o.readAsText(s)})}var p,bt,Le=O(()=>{p="youyou_toolkit";bt=null});var Xt,Q,Io=O(()=>{pe();Le();Xt=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,M.emit(E.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,t){return!e||!t?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...t,render:t.render||(()=>""),bindEvents:t.bindEvents||(()=>{}),destroy:t.destroy||(()=>{}),getStyles:t.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,t,o={}){let r=j();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let i;if(typeof t=="string"?i=r(t):t&&t.jquery?i=t:t&&(i=r(t)),!H(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}if(this.destroyInstance(e),typeof n.renderTo=="function")n.renderTo(i,{...o,dependencies:this.dependencies});else{let a=n.render({...o,dependencies:this.dependencies});i.html(a),n.bindEvents(i,this.dependencies)}this.activeInstances.set(e,{container:i,component:n,props:o}),M.emit(E.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let t=this.activeInstances.get(e);t&&(t.component.destroy(t.container),this.activeInstances.delete(e))}switchTab(e){let t=this.currentTab;this.currentTab=e,M.emit(E.UI_TAB_CHANGED,{tabId:e,oldTab:t})}getCurrentTab(){return this.currentTab}switchSubTab(e,t){this.currentSubTab[e]=t,M.emit(E.UI_SUBTAB_CHANGED,{mainTab:e,subTab:t})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((t,o)=>{t.getStyles&&(e+=t.getStyles())}),e}injectStyles(e=document){let t="yyt-component-styles";if(e.getElementById(t))return;let o=e.createElement("style");o.id=t,o.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(o)}setDependency(e,t){this.dependencies[e]=t}getDependency(e){return this.dependencies[e]}_subscribeEvents(){M.on(E.PRESET_UPDATED,()=>{}),M.on(E.TOOL_UPDATED,()=>{})}},Q=new Xt});var Hr={};ie(Hr,{API_STATUS:()=>ua,fetchAvailableModels:()=>No,getApiConfig:()=>ut,getEffectiveApiConfig:()=>Qt,hasEffectiveApiPreset:()=>Oo,sendApiRequest:()=>Lo,sendWithPreset:()=>ga,testApiConnection:()=>va,updateApiConfig:()=>$t,validateApiConfig:()=>Rt});function ca(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Ro(){return v.get(zr,ca())}function da(s){v.set(zr,s)}function jr(){return v.get(aa,[])}function pa(){return v.get(la,"")}function $o(s,e={}){let t=new Error(s);return t.allowDirectFallback=e.allowDirectFallback===!0,t}function Wr(s,e="chat_completions"){let t=String(s||"").trim();if(!t)return"";let o=null;try{o=new URL(t)}catch{return t}let r=o.pathname.replace(/\/+$/,""),n=r;return e==="chat_completions"?!/\/chat\/completions$/i.test(r)&&!/\/completions$/i.test(r)&&(n=`${r||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(r)?n=r.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(r)?n=r.replace(/\/completions$/i,"/models"):/\/models$/i.test(r)||(n=`${r||""}/models`)),o.pathname=n.replace(/\/+/g,"/"),o.toString()}function ya(s){let e=String(s||"").trim();if(!e)return"";try{let t=new URL(e);return t.pathname=t.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",t.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function ut(){return Ro().apiConfig||{}}function $t(s){let e=Ro();e.apiConfig={...e.apiConfig,...s},da(e)}function Rt(s){let e=[];if(s.useMainApi)return{valid:!0,errors:[]};if(!s.url||!s.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(s.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!s.model||!s.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Qt(s=""){let e=Ro(),t=s||pa()||"";if(t){let r=jr().find(n=>n.name===t);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return e.apiConfig||{}}function Oo(s=""){return s?jr().some(t=>t?.name===s):!1}async function ga(s,e,t={},o=null){let r=Qt(s);return await Lo(e,{...t,apiConfig:r},o)}function Fr(s,e={}){let t=e.apiConfig||ut();return{messages:s,model:t.model||"gpt-3.5-turbo",max_tokens:t.max_tokens||4096,temperature:t.temperature??.7,top_p:t.top_p??.9,stream:!1,...e.extraParams}}function Do(s){let e="";if(s?.choices&&s.choices[0]?.message?.content)e=s.choices[0].message.content;else if(s?.content)e=s.content;else if(s?.text)e=s.text;else if(s?.response)e=s.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(s).slice(0,200)}`);return String(e||"").trim()}async function Lo(s,e={},t=null){let o=e.apiConfig||ut(),r=o.useMainApi,n=Rt(o);if(!n.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return r?await fa(s,e,t):await ma(s,o,e,t)}async function fa(s,e,t){let o=typeof window.parent<"u"?window.parent:window;if(!o.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await o.TavernHelper.generateRaw({ordered_prompts:s,should_stream:!1,...e.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function ma(s,e,t,o){let r=typeof window.parent<"u"?window.parent:window;if(r.TavernHelper?.generateRaw)try{return await ha(s,e,t,o,r)}catch(n){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(r.SillyTavern?.getRequestHeaders)try{return await ba(s,e,t,o,r)}catch(n){if(!n?.allowDirectFallback)throw n}return await xa(s,e,t,o)}async function ha(s,e,t,o,r){if(o?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await r.TavernHelper.generateRaw({ordered_prompts:s,should_stream:!1,max_chat_history:0,custom_api:{apiurl:ya(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...t.extraParams||{}});return typeof n=="string"?n.trim():Do(n)}async function ba(s,e,t,o,r){let n=String(e.url||"").trim(),i={...Fr(s,{apiConfig:e,...t}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},a={...typeof r.SillyTavern?.getRequestHeaders=="function"?r.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:a,body:JSON.stringify(i),signal:o})}catch(u){throw u?.name==="AbortError"?u:$o(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw $o(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let f=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw $o(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${f||"(\u7A7A\u54CD\u5E94)"}`)}return Do(d)}async function xa(s,e,t,o){let r=Fr(s,{apiConfig:e,...t}),n=Wr(e.url,"chat_completions"),i={"Content-Type":"application/json"};e.apiKey&&(i.Authorization=`Bearer ${e.apiKey}`);let a=await fetch(n,{method:"POST",headers:i,body:JSON.stringify(r),signal:o}),l=await a.text().catch(()=>"");if(!a.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${a.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return Do(c)}async function va(s=null){let e=s||ut(),t=Date.now();try{await Lo([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let r=Date.now()-t;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(o){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${o.message}`,latency:Date.now()-t}}}async function No(s=null){let e=s||ut();return e.useMainApi?await wa():await Ta(e)}async function wa(){let s=typeof window.parent<"u"?window.parent:window;try{if(s.SillyTavern?.getContext){let e=s.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Ta(s){if(!s.url||!s.apiKey)return[];try{let e=Wr(s.url,"models"),t=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${s.apiKey}`}});if(!t.ok)return[];let o=await t.json();return o.data&&Array.isArray(o.data)?o.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var zr,aa,la,ua,ws=O(()=>{Oe();zr="settings",aa="api_presets",la="current_preset";ua={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Gr={};ie(Gr,{createPreset:()=>_s,createPresetFromCurrentConfig:()=>ka,deletePreset:()=>Es,duplicatePreset:()=>Ma,exportPresets:()=>Wo,generateUniquePresetName:()=>Ho,getActiveConfig:()=>jo,getActivePresetName:()=>As,getAllPresets:()=>Ot,getPreset:()=>wt,getPresetNames:()=>Ea,getStarredPresets:()=>zo,importPresets:()=>Fo,presetExists:()=>Zt,renamePreset:()=>Aa,switchToPreset:()=>Tt,togglePresetStar:()=>Uo,updatePreset:()=>Bo,validatePreset:()=>Ca});function _a(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function qr(){return v.get(Sa,_a())}function me(){return v.get(Yr,[])}function vt(s){v.set(Yr,s)}function Ss(){return v.get(Kr,"")}function Ts(s){v.set(Kr,s||"")}function Ot(){return me()}function Ea(){return me().map(e=>e.name)}function wt(s){return!s||typeof s!="string"?null:me().find(t=>t.name===s)||null}function Zt(s){return!s||typeof s!="string"?!1:me().some(t=>t.name===s)}function _s(s){let{name:e,description:t,apiConfig:o}=s;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(Zt(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={name:r,description:t||"",apiConfig:{url:o?.url||"",apiKey:o?.apiKey||"",model:o?.model||"",useMainApi:o?.useMainApi??!0,max_tokens:o?.max_tokens||4096,temperature:o?.temperature??.7,top_p:o?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=me();return i.push(n),vt(i),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:n}}function Bo(s,e){if(!s||typeof s!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=me(),o=t.findIndex(i=>i.name===s);if(o===-1)return{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==s)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=t[o],n={...r,...e,name:r.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...r.apiConfig,...e.apiConfig}),t[o]=n,vt(t),{success:!0,message:`\u9884\u8BBE "${s}" \u66F4\u65B0\u6210\u529F`,preset:n}}function Es(s){if(!s||typeof s!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=me(),t=e.findIndex(o=>o.name===s);return t===-1?{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`}:(e.splice(t,1),vt(e),Ss()===s&&Ts(""),{success:!0,message:`\u9884\u8BBE "${s}" \u5DF2\u5220\u9664`})}function Aa(s,e){if(!s||typeof s!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=e.trim();if(!Zt(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`};if(Zt(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u5DF2\u5B58\u5728`};let o=me(),r=o.find(n=>n.name===s);return r&&(r.name=t,r.updatedAt=Date.now(),vt(o),Ss()===s&&Ts(t)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${t}"`}}function Ma(s,e){if(!s||typeof s!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=e.trim(),o=wt(s);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`};if(Zt(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(o)),name:t,createdAt:Date.now(),updatedAt:Date.now()},n=me();return n.push(r),vt(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${t}"`,preset:r}}function Uo(s){if(!s||typeof s!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=me(),t=e.find(o=>o.name===s);return t?(t.starred=!t.starred,t.updatedAt=Date.now(),vt(e),{success:!0,message:t.starred?`\u5DF2\u5C06 "${s}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${s}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:t.starred}):{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`}}function zo(){return me().filter(e=>e.starred===!0)}function Tt(s){if(!s)return Ts(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=wt(s);return e?(Ts(s),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${s}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`}}function As(){return Ss()}function jo(){let s=Ss();if(s){let t=wt(s);if(t)return{presetName:s,apiConfig:t.apiConfig}}return{presetName:"",apiConfig:qr().apiConfig||{}}}function Wo(s=null){if(s){let t=wt(s);if(!t)throw new Error(`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`);return JSON.stringify(t,null,2)}let e=me();return JSON.stringify(e,null,2)}function Fo(s,e={overwrite:!1}){let t;try{t=JSON.parse(s)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(t)?t:[t];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=me(),n=0;for(let i of o){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=r.findIndex(l=>l.name===i.name);a>=0?e.overwrite&&(i.updatedAt=Date.now(),r[a]=i,n++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),r.push(i),n++)}return n>0&&vt(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function ka(s,e=""){let t=qr();return _s({name:s,description:e,apiConfig:t.apiConfig})}function Ca(s){let e=[];return(!s.name||typeof s.name!="string"||!s.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!s.apiConfig||typeof s.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Ho(s){(!s||typeof s!="string")&&(s="\u65B0\u9884\u8BBE");let e=me(),t=new Set(e.map(r=>r.name));if(!t.has(s))return s;let o=1;for(;t.has(`${s} (${o})`);)o++;return`${s} (${o})`}var Sa,Yr,Kr,Ms=O(()=>{Oe();Sa="settings",Yr="api_presets",Kr="current_preset"});function ks(s){return String(s||"").trim()}var qe,Ne,Yo=O(()=>{pe();Le();ws();Ms();qe=null;Ne={id:"apiPresetPanel",render(s){let e=jo(),t=e?.apiConfig||ut(),o=ks(e?.presetName||As()),r=Ot(),a=zo().slice(0,8),l=a.length>0?a.map(u=>this._renderPresetItem(u)).join(""):"",c=qe===null?o||"":ks(qe),d=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${p}-preset-dropdown">
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
              <button class="yyt-btn yyt-btn-secondary" id="${p}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${p}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(t)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${p}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${p}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${p}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${p}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${p}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(s){return`
      <div class="yyt-preset-item" data-preset-name="${b(s.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${b(s.name)}</div>
          <div class="yyt-preset-meta">
            ${s.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${b(s.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      <div class="yyt-select-option ${s.name===e?"yyt-selected":""}" data-value="${b(s.name)}">
        <button class="${o}" data-preset="${b(s.name)}" title="${t?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${r}</button>
        <span class="yyt-option-text">${b(s.name)}</span>
      </div>
    `},_renderApiConfigForm(s){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${p}-use-main-api" ${s.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${p}-custom-api-fields" class="${s.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${p}-api-url" 
                   value="${b(s.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${p}-api-key" 
                     value="${b(s.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${p}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${p}-model" 
                     value="${b(s.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${p}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${p}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${p}-max-tokens" 
                   value="${s.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${p}-temperature" 
                   value="${s.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${p}-top-p" 
                   value="${s.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(s,e){let t=j();!t||!H(s)||(this._bindDropdownEvents(s,t),this._bindPresetListEvents(s,t),this._bindApiConfigEvents(s,t),this._bindFileEvents(s,t))},_bindDropdownEvents(s,e){let t=s.find(`#${p}-preset-dropdown`),o=t.find(".yyt-select-trigger"),r=t.find(".yyt-select-value"),n=()=>{let i=String(r.data("value")||"").trim();if(!i){qe="",Tt(""),xt(s,ut(),p),s.find(".yyt-preset-item").removeClass("yyt-loaded"),h("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let a=wt(i);if(!a){h("error",`\u9884\u8BBE "${i}" \u4E0D\u5B58\u5728`);return}qe=i,Tt(i),xt(s,a.apiConfig,p),s.find(".yyt-preset-item").removeClass("yyt-loaded"),s.find(`.yyt-preset-item[data-preset-name="${i.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),h("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${i}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};o.on("click",function(i){i.stopPropagation(),t.toggleClass("yyt-open")}),t.find(".yyt-select-option").on("click",i=>{if(e(i.target).hasClass("yyt-option-star"))return;let a=e(i.currentTarget),l=a.data("value"),c=a.find(".yyt-option-text").text();qe=String(l||"").trim(),r.text(c).data("value",l),t.find(".yyt-select-option").removeClass("yyt-selected"),a.addClass("yyt-selected"),t.removeClass("yyt-open")}),s.find(`#${p}-load-preset`).on("click",()=>{n()}),t.find(".yyt-option-star").on("click",i=>{i.preventDefault(),i.stopPropagation();let a=e(i.currentTarget).data("preset");if(!a)return;let l=Uo(a);if(l.success){h("success",l.message);let c=s.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else h("error",l.message)}),e(document).on("click.yyt-dropdown",i=>{e(i.target).closest(t).length||t.removeClass("yyt-open")})},_bindPresetListEvents(s,e){s.find(".yyt-preset-item").on("click",t=>{let r=e(t.currentTarget).data("preset-name"),n=e(t.target).closest("[data-action]").data("action");if(n)switch(t.stopPropagation(),n){case"load":s.find(".yyt-select-value").text(r).data("value",r),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find(`.yyt-select-option[data-value="${r.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),s.find(`#${p}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let i=Es(r);if(h(i.success?"info":"error",i.message),i.success){ks(qe)===r&&(qe=null);let a=s.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}break}})},_bindApiConfigEvents(s,e){s.find(`#${p}-use-main-api`).on("change",function(){let t=e(this).is(":checked"),o=s.find(`#${p}-custom-api-fields`);t?o.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):o.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),s.find(`#${p}-toggle-key-visibility`).on("click",function(){let t=s.find(`#${p}-api-key`),o=t.attr("type");t.attr("type",o==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),s.find(`#${p}-load-models`).on("click",async()=>{let t=s.find(`#${p}-load-models`),o=s.find(`#${p}-model`),r=s.find(`#${p}-model-select`);t.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=pt(s,p),i=await No(n);if(i.length>0){r.empty(),i.forEach(l=>{r.append(`<option value="${b(l)}">${b(l)}</option>`)}),o.hide(),r.show();let a=o.val();a&&i.includes(a)&&r.val(a),r.off("change").on("change",function(){o.val(e(this).val())}),h("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else h("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(n){h("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${n.message}`)}finally{t.prop("disabled",!1).find("i").removeClass("fa-spin")}}),s.find(`#${p}-model`).on("focus",function(){let t=s.find(`#${p}-model-select`);e(this).show(),t.hide()}),s.find(`#${p}-save-api-config`).on("click",()=>{let t=pt(s,p),o=ks(As()),r=Rt(t);if(!r.valid&&!t.useMainApi){h("error",r.errors.join(", "));return}if(o){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${o}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){$t(t),Tt(""),qe="",h("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let i=s.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i);return}$t(t);let n=Bo(o,{apiConfig:t});if(n.success){qe=o,h("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${o}"`),Tt(o),M.emit(E.PRESET_UPDATED,{name:o});let i=s.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else h("error",n.message);return}$t(t),h("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),s.find(`#${p}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Tt(""),qe="",$t({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let t=s.closest(".yyt-api-manager").parent();t.length&&this.renderTo(t),h("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),s.find(`#${p}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(s,e)})},_bindFileEvents(s,e){s.find(`#${p}-export-presets`).on("click",()=>{try{let t=Wo();et(t,`youyou_toolkit_presets_${Date.now()}.json`),h("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(t){h("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}}),s.find(`#${p}-import-presets`).on("click",()=>{s.find(`#${p}-import-file`).click()}),s.find(`#${p}-import-file`).on("change",async t=>{let o=t.target.files[0];if(o){try{let r=await tt(o),n=Fo(r,{overwrite:!0});if(h(n.success?"success":"error",n.message),n.imported>0){let i=s.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(r){h("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(t.target).val("")}})},_showSavePresetDialog(s,e){let o=Ot().map(d=>d.name),r=Ho("\u65B0\u9884\u8BBE"),n=`
      <div class="yyt-dialog-overlay" id="${p}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${p}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${p}-dialog-preset-name" 
                     value="${b(r)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${p}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${p}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${p}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e(`#${p}-dialog-overlay`).remove(),s.append(n);let i=e(`#${p}-dialog-overlay`),a=e(`#${p}-dialog-preset-name`),l=e(`#${p}-dialog-preset-desc`);a.focus().select();let c=()=>i.remove();i.find(`#${p}-dialog-close, #${p}-dialog-cancel`).on("click",c),i.on("click",function(d){d.target===this&&c()}),i.find(`#${p}-dialog-save`).on("click",()=>{let d=a.val().trim(),u=l.val().trim();if(!d){h("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(o.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Es(d)}let f=pt(s,p),y=_s({name:d,description:u,apiConfig:f});if(y.success){h("success",y.message),c(),M.emit(E.PRESET_CREATED,{preset:y.preset});let x=s.closest(".yyt-api-manager").parent();x.length&&this.renderTo(x)}else h("error",y.message)}),a.on("keypress",function(d){d.which===13&&i.find(`#${p}-dialog-save`).click()})},destroy(s){let e=j();!e||!H(s)||(s.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(s){let e=this.render({});s.html(e),this.bindEvents(s,{})}}});var an={};ie(an,{MESSAGE_MACROS:()=>nn,addTagRule:()=>Dt,createRuleTemplate:()=>en,default:()=>$a,deleteRulePreset:()=>on,deleteRuleTemplate:()=>sn,deleteTagRule:()=>es,escapeRegex:()=>St,exportRulesConfig:()=>Ls,extractComplexTag:()=>Jr,extractCurlyBraceTag:()=>Jo,extractHtmlFormatTag:()=>Xr,extractSimpleTag:()=>Vo,extractTagContent:()=>_t,generateTagSuggestions:()=>Is,getAllRulePresets:()=>Os,getAllRuleTemplates:()=>Qr,getContentBlacklist:()=>Et,getRuleTemplate:()=>Zr,getTagRules:()=>st,importRulesConfig:()=>Ns,isValidTagName:()=>Go,loadRulePreset:()=>Ds,saveRulesAsPreset:()=>Rs,scanTextForTags:()=>Ps,setContentBlacklist:()=>ts,setTagRules:()=>$s,shouldSkipContent:()=>qo,testRegex:()=>rn,updateRuleTemplate:()=>tn,updateTagRule:()=>Lt});function Pa(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Ko],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Se(){return v.get(Vr,Pa())}function Ge(s){v.set(Vr,s)}function Cs(){let s=Se();return ue=s.ruleTemplates||[...Ko],Z=s.tagRules||[],he=s.contentBlacklist||[],{ruleTemplates:ue,tagRules:Z,contentBlacklist:he}}function St(s){return typeof s!="string"?"":s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function qo(s,e){if(!e||e.length===0||!s||typeof s!="string")return!1;let t=s.toLowerCase();return e.some(o=>{let r=o.trim().toLowerCase();return r&&t.includes(r)})}function Go(s){return!s||typeof s!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(s)&&!Ia.includes(s.toLowerCase())}function Vo(s,e){if(!s||!e)return[];let t=[],o=St(e),r=new RegExp(`<${o}>([\\s\\S]*?)<\\/${o}>`,"gi");[...s.matchAll(r)].forEach(l=>{l[1]&&t.push(l[1].trim())});let i=(s.match(new RegExp(`<${o}>`,"gi"))||[]).length,a=(s.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return i>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),t}function Jo(s,e){if(!s||!e)return[];let t=[],o=St(e),r=new RegExp(`\\{${o}\\|`,"gi"),n;for(;(n=r.exec(s))!==null;){let i=n.index,a=i+n[0].length,l=1,c=a;for(;c<s.length&&l>0;)s[c]==="{"?l++:s[c]==="}"&&l--,c++;if(l===0){let d=s.substring(a,c-1);d.trim()&&t.push(d.trim())}r.lastIndex=i+1}return t}function Jr(s,e){if(!s||!e)return[];let t=e.split(",");if(t.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let o=t[0].trim(),r=t[1].trim(),n=r.match(/<\/(\w+)>/);if(!n)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let i=n[1],a=new RegExp(`${St(o)}([\\s\\S]*?)<\\/${i}>`,"gi"),l=[];return[...s.matchAll(a)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Xr(s,e){if(!s||!e)return[];let t=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!t)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let o=t[1],r=[],n=new RegExp(`<${o}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${o}>`,"gi");[...s.matchAll(n)].forEach(c=>{c[1]&&r.push(c[1].trim())});let a=(s.match(new RegExp(`<${o}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(s.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return a>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-l} \u4E2A\u672A\u95ED\u5408\u7684 <${o}> \u6807\u7B7E`),r}function _t(s,e,t=[]){if(!s)return"";if(!e||e.length===0)return s;let o=e.filter(d=>d.type==="exclude"&&d.enabled),r=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),n=e.filter(d=>d.type==="regex_exclude"&&d.enabled),i=s;for(let d of o)try{let u=new RegExp(`<${St(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${St(d.value)}>`,"gi");i=i.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:u})}let a=[];if(r.length>0)for(let d of r){let u=[];try{if(d.type==="include")u.push(...Vo(i,d.value)),u.push(...Jo(i,d.value));else if(d.type==="regex_include"){let f=new RegExp(d.value,"gi");[...i.matchAll(f)].forEach(x=>{x[1]&&u.push(x[1])})}}catch(f){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:f})}u.forEach(f=>a.push(f.trim()))}else a.push(i);let l=[];for(let d of a){for(let u of n)try{let f=new RegExp(u.value,"gi");d=d.replace(f,"")}catch(f){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:f})}qo(d,t)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Ps(s,e={}){let t=performance.now(),{chunkSize:o=5e4,maxTags:r=100,timeoutMs:n=5e3}=e,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<s.length;u+=o){let f=s.slice(u,Math.min(u+o,s.length));if(c++,l+=f.length,performance.now()-t>n){console.warn(`[YouYouToolkit] Tag scanning timed out after ${n}ms`);break}let y;for(;(y=a.exec(f))!==null&&i.size<r;){let x=(y[1]||y[2]).toLowerCase();Go(x)&&i.add(x)}if(i.size>=r)break;c%5===0&&await new Promise(x=>setTimeout(x,0))}let d=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(d-t),processedChars:l,totalChars:s.length,chunkCount:c,tagsFound:i.size}}}function Is(s,e=25){let t=s.tags.slice(0,e);return{suggestions:t,stats:{totalFound:s.stats.tagsFound,finalCount:t.length}}}function Qr(){return ue.length===0&&Cs(),ue}function Zr(s){return ue.find(e=>e.id===s)}function en(s){let e={id:`rule-${Date.now()}`,name:s.name||"\u65B0\u89C4\u5219",description:s.description||"",type:s.type||"include",value:s.value||"",enabled:s.enabled!==!1,createdAt:new Date().toISOString()};return ue.push(e),Xo(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function tn(s,e){let t=ue.findIndex(o=>o.id===s);return t===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ue[t]={...ue[t],...e,updatedAt:new Date().toISOString()},Xo(),{success:!0,template:ue[t],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function sn(s){let e=ue.findIndex(t=>t.id===s);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ue.splice(e,1),Xo(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Xo(){let s=Se();s.ruleTemplates=ue,Ge(s)}function st(){return Z||Cs(),Z}function $s(s){Z=s||[];let e=Se();e.tagRules=Z,Ge(e)}function Dt(s){let e={id:`tag-${Date.now()}`,type:s.type||"include",value:s.value||"",enabled:s.enabled!==!1};Z.push(e);let t=Se();return t.tagRules=Z,Ge(t),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Lt(s,e){if(s<0||s>=Z.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Z[s]={...Z[s],...e};let t=Se();return t.tagRules=Z,Ge(t),{success:!0,rule:Z[s],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function es(s){if(s<0||s>=Z.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Z.splice(s,1);let e=Se();return e.tagRules=Z,Ge(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Et(){return he||Cs(),he}function ts(s){he=s||[];let e=Se();e.contentBlacklist=he,Ge(e)}function Rs(s,e=""){if(!s||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=Se();t.tagRulePresets||(t.tagRulePresets={});let o=`preset-${Date.now()}`;return t.tagRulePresets[o]={id:o,name:s.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(Z)),blacklist:JSON.parse(JSON.stringify(he)),createdAt:new Date().toISOString()},Ge(t),{success:!0,preset:t.tagRulePresets[o],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Os(){let e=Se().tagRulePresets||{};return Object.values(e)}function Ds(s){let e=Se(),o=(e.tagRulePresets||{})[s];return o?(Z=JSON.parse(JSON.stringify(o.rules||[])),he=JSON.parse(JSON.stringify(o.blacklist||[])),e.tagRules=Z,e.contentBlacklist=he,Ge(e),{success:!0,preset:o,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function on(s){let e=Se(),t=e.tagRulePresets||{};return t[s]?(delete t[s],e.tagRulePresets=t,Ge(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ls(){return JSON.stringify({tagRules:Z,contentBlacklist:he,ruleTemplates:ue,tagRulePresets:Se().tagRulePresets||{}},null,2)}function Ns(s,e={overwrite:!0}){try{let t=JSON.parse(s);if(e.overwrite)Z=t.tagRules||[],he=t.contentBlacklist||[],ue=t.ruleTemplates||Ko;else if(t.tagRules&&Z.push(...t.tagRules),t.contentBlacklist){let r=new Set(he.map(n=>n.toLowerCase()));t.contentBlacklist.forEach(n=>{r.has(n.toLowerCase())||he.push(n)})}let o=Se();return o.tagRules=Z,o.contentBlacklist=he,o.ruleTemplates=ue,t.tagRulePresets&&(o.tagRulePresets={...o.tagRulePresets||{},...t.tagRulePresets}),Ge(o),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(t){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${t.message}`}}}function rn(s,e,t="g",o=0){try{if(!s||typeof s!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(s,t),n=[];if(t.includes("g")){let i;for(;(i=r.exec(e))!==null;)i.length>1?n.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[o]||i[1]||i[0]}):n.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=r.exec(e);i&&n.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[o]||i[1]:i[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(i=>i.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var Vr,Ia,Ko,ue,Z,he,nn,$a,Bs=O(()=>{Oe();Vr="settings";Ia=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Ko=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],ue=[],Z=[],he=[];nn={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Cs();$a={extractTagContent:_t,extractSimpleTag:Vo,extractCurlyBraceTag:Jo,extractComplexTag:Jr,extractHtmlFormatTag:Xr,escapeRegex:St,shouldSkipContent:qo,isValidTagName:Go,scanTextForTags:Ps,generateTagSuggestions:Is,getAllRuleTemplates:Qr,getRuleTemplate:Zr,createRuleTemplate:en,updateRuleTemplate:tn,deleteRuleTemplate:sn,getTagRules:st,setTagRules:$s,addTagRule:Dt,updateTagRule:Lt,deleteTagRule:es,getContentBlacklist:Et,setContentBlacklist:ts,saveRulesAsPreset:Rs,getAllRulePresets:Os,loadRulePreset:Ds,deleteRulePreset:on,exportRulesConfig:Ls,importRulesConfig:Ns,testRegex:rn,MESSAGE_MACROS:nn}});var Be,Qo=O(()=>{pe();Le();Bs();Be={id:"regexExtractPanel",render(s){let e=st(),t=Et(),o=Os();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${p}-show-examples" style="margin-left: auto;">
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
            <button class="yyt-btn yyt-btn-secondary" id="${p}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${p}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${p}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${p}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${p}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${p}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${p}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(s,e,t){let o=s.length>0?s.map((n,i)=>this._renderRuleItem(n,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=t.length>0?t.map(n=>`<option value="${n.id}">${b(n.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${r?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${p}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${r}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${p}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${p}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${p}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${o}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${p}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${p}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${p}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${p}-content-blacklist" 
                 value="${b(e.join(", "))}" 
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
               value="${b(s.value||"")}">
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
          <textarea class="yyt-textarea" id="${p}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${p}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${p}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${p}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${p}-test-result"></div>
        </div>
      </div>
    `},bindEvents(s,e){let t=j();!t||!H(s)||(this._bindRuleEditorEvents(s,t),this._bindPresetEvents(s,t),this._bindTestEvents(s,t),this._bindFileEvents(s,t))},_bindRuleEditorEvents(s,e){s.find(".yyt-rule-type").on("change",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val();Lt(o,{type:r}),h("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),s.find(".yyt-rule-value").on("change",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val().trim();Lt(o,{value:r})}),s.find(".yyt-rule-enabled").on("change",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).is(":checked");Lt(o,{enabled:r}),h("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),s.find(".yyt-rule-delete").on("click",()=>{let o=s.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(es(o),this.renderTo(s),h("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),s.on("click",".yyt-rule-delete",t=>{let r=e(t.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(es(r),this.renderTo(s),h("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),s.find(`#${p}-add-rule`).on("click",()=>{Dt({type:"include",value:"",enabled:!0}),this.renderTo(s),h("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),s.find(`#${p}-scan-tags`).on("click",async()=>{let t=s.find(`#${p}-scan-tags`),o=s.find(`#${p}-test-input`).val();if(!o||!o.trim()){h("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}t.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await Ps(o,{maxTags:50,timeoutMs:3e3}),{suggestions:n,stats:i}=Is(r,25);if(n.length===0){h("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),s.find(`#${p}-tag-suggestions-container`).hide();return}let a=s.find(`#${p}-tag-list`);s.find(`#${p}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),a.empty(),n.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${b(c)}</button>`);d.on("click",()=>{if(st().some(y=>y.type==="include"&&y.value===c)){h("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Dt({type:"include",value:c,enabled:!0}),this.renderTo(s),h("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),a.append(d)}),s.find(`#${p}-tag-suggestions-container`).show(),h("success",`\u53D1\u73B0 ${n.length} \u4E2A\u6807\u7B7E`)}catch(r){h("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{t.prop("disabled",!1).find("i").removeClass("fa-spin")}}),s.find(`#${p}-add-exclude-cot`).on("click",()=>{let t=st(),o="<!--[\\s\\S]*?-->";if(t.some(n=>n.type==="regex_exclude"&&n.value===o)){h("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Dt({type:"regex_exclude",value:o,enabled:!0}),this.renderTo(s),h("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),s.find(`#${p}-content-blacklist`).on("change",function(){let o=e(this).val().split(",").map(r=>r.trim()).filter(r=>r);ts(o),h("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${o.length} \u4E2A\u5173\u952E\u8BCD`)}),s.find(`#${p}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(s,e){s.find(`#${p}-load-rule-preset`).on("click",()=>{let t=s.find(`#${p}-rule-preset-select`).val();if(!t){h("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let o=Ds(t);o.success?(this.renderTo(s),h("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${o.preset.name}`),M.emit(E.REGEX_PRESET_LOADED,{preset:o.preset})):h("error",o.message)}),s.find(`#${p}-save-rule-preset`).on("click",()=>{let t=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!t||!t.trim())return;let o=Rs(t.trim());o.success?(this.renderTo(s),h("success",`\u9884\u8BBE "${t.trim()}" \u5DF2\u4FDD\u5B58`)):h("error",o.message)})},_bindTestEvents(s,e){s.find(`#${p}-test-extract`).on("click",()=>{let t=s.find(`#${p}-test-input`).val();if(!t||!t.trim()){h("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let o=st(),r=Et(),n=_t(t,o,r),i=s.find(`#${p}-test-result-container`),a=s.find(`#${p}-test-result`);i.show(),!n||!n.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),h("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${b(n)}</pre>`),h("success","\u63D0\u53D6\u5B8C\u6210"),M.emit(E.REGEX_EXTRACTED,{result:n}))}),s.find(`#${p}-test-clear`).on("click",()=>{s.find(`#${p}-test-input`).val(""),s.find(`#${p}-test-result-container`).hide()})},_bindFileEvents(s,e){s.find(`#${p}-import-rules`).on("click",()=>{s.find(`#${p}-import-rules-file`).click()}),s.find(`#${p}-import-rules-file`).on("change",async t=>{let o=t.target.files[0];if(o){try{let r=await tt(o),n=Ns(r,{overwrite:!0});n.success?(this.renderTo(s),h("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):h("error",n.message)}catch(r){h("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(t.target).val("")}}),s.find(`#${p}-export-rules`).on("click",()=>{try{let t=Ls();et(t,`youyou_toolkit_rules_${Date.now()}.json`),h("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(t){h("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}}),s.find(`#${p}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&($s([]),ts([]),this.renderTo(s),h("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(s){!j()||!H(s)||s.find("*").off()},getStyles(){return`
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
    `},renderTo(s){let e=this.render({});s.html(e),this.bindEvents(s,{})}}});var fn={};ie(fn,{createDefaultToolDefinition:()=>At,default:()=>La,deleteTool:()=>js,deleteToolPreset:()=>un,exportTools:()=>Hs,getAllTools:()=>yt,getCurrentToolPreset:()=>yn,getTool:()=>Nt,getToolPresets:()=>Ws,importTools:()=>Ys,normalizeToolDefinitionToRuntimeConfig:()=>os,resetTools:()=>Ks,saveTool:()=>zs,saveToolPreset:()=>pn,setCurrentToolPreset:()=>gn,setToolEnabled:()=>Fs});function Ra(s={}){return!s||typeof s!="object"?{}:Object.fromEntries(Object.entries(s).map(([e,t])=>[e,At({...t||{},id:e})]))}function ss(s){return Array.isArray(s)?s.map(e=>String(e||"").trim()).filter(Boolean):[]}function Zo(s,e){let t=parseInt(s,10);return Number.isFinite(t)&&t>0?t:e}function ln(s,e){let t=parseInt(s,10);return Number.isFinite(t)&&t>=0?t:e}function cn(s={}){return{enabled:s?.enabled===!0,settleMs:ln(s?.settleMs,1200),cooldownMs:ln(s?.cooldownMs,5e3)}}function dn(s={}){return{enabled:s?.enabled===!0,selected:ss(s?.selected)}}function Oa(s=[]){let e=Array.isArray(s)?s.map(t=>({role:String(t?.role||"user").trim().toUpperCase(),content:String(t?.content||"").trim()})).filter(t=>t.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(t=>`\u3010${t.role||"USER"}\u3011
${t.content}`).join(`

`)}function Da(s,e={}){let t=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(t)return t;let o=Oa(e?.config?.messages||[]);return o||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||s}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function At(s={}){let e=new Date().toISOString(),t=s?.config||{};return{...Ce,...s,id:s?.id||Ce.id,icon:s?.icon||Ce.icon,order:Number.isFinite(s?.order)?s.order:Ce.order,promptTemplate:typeof s?.promptTemplate=="string"?s.promptTemplate:Ce.promptTemplate,extractTags:ss(s?.extractTags),config:{execution:{...Ce.config.execution,...t.execution||{},timeout:Zo(t?.execution?.timeout,Ce.config.execution.timeout),retries:Math.max(0,parseInt(t?.execution?.retries,10)||Ce.config.execution.retries)},api:{...Ce.config.api,...t.api||{}},messages:Array.isArray(t?.messages)?t.messages:[],context:{...Ce.config.context,...t.context||{},depth:Zo(t?.context?.depth,Ce.config.context.depth),includeTags:ss(t?.context?.includeTags),excludeTags:ss(t?.context?.excludeTags)},automation:cn(t?.automation),worldbooks:dn(t?.worldbooks)},enabled:s?.enabled!==!1,metadata:{...Ce.metadata,...s?.metadata||{},createdAt:s?.metadata?.createdAt||e,updatedAt:s?.metadata?.updatedAt||e}}}function os(s,e={},t={}){let o=At({...e,id:s||e?.id||""}),r=ss(o?.extractTags?.length?o.extractTags:o?.config?.context?.includeTags),n=String(e?.output?.apiPreset||o?.config?.api?.preset||"").trim(),i=Da(s,o),a=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():t.defaultOutputMode||"follow_ai";return{id:o.id||s,name:o.name||s,icon:o.icon||"fa-screwdriver-wrench",description:o.description||"",enabled:o.enabled!==!1,order:Number.isFinite(o.order)?o.order:100,bypass:{enabled:o?.config?.api?.useBypass===!0&&!!o?.config?.api?.bypassPreset,presetId:o?.config?.api?.bypassPreset||""},output:{mode:a,apiPreset:n,overwrite:!0,enabled:!0},automation:cn(o?.config?.automation),worldbooks:dn(o?.config?.worldbooks),extraction:{enabled:!0,maxMessages:Zo(o?.config?.context?.depth,5),selectors:r},promptTemplate:i,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:r,isCustom:!0,category:o.category||"utility",metadata:{...o.metadata||{}}}}function yt(){let s=G.get(te.TOOLS),e=Ra(s);return s&&JSON.stringify(s)!==JSON.stringify(e)&&G.set(te.TOOLS,e),{...Us,...e}}function Nt(s){return yt()[s]||null}function zs(s,e){if(!s||!e)return!1;let t=G.get(te.TOOLS)||{},o=!t[s]&&!Us[s],r=At({...t[s]||{},...e,id:s,metadata:{...t[s]?.metadata||{},...e.metadata||{},createdAt:t[s]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return t[s]=r,G.set(te.TOOLS,t),M.emit(o?E.TOOL_REGISTERED:E.TOOL_UPDATED,{toolId:s,tool:r}),!0}function js(s){let e=G.get(te.TOOLS)||{};return!e[s]&&!Us[s]||Us[s]?!1:(delete e[s],G.set(te.TOOLS,e),M.emit(E.TOOL_UNREGISTERED,{toolId:s}),!0)}function Ws(){return G.get(te.PRESETS)||{}}function pn(s,e){if(!s||!e)return!1;let t=Ws(),o=!t[s];return t[s]={...e,name:s,updatedAt:new Date().toISOString()},G.set(te.PRESETS,t),M.emit(o?E.PRESET_CREATED:E.PRESET_UPDATED,{type:"tool",presetName:s,preset:t[s]}),!0}function un(s){let e=Ws();return e[s]?(delete e[s],G.set(te.PRESETS,e),M.emit(E.PRESET_DELETED,{type:"tool",presetName:s}),!0):!1}function yn(){return G.get(te.CURRENT_PRESET)||""}function gn(s){return G.set(te.CURRENT_PRESET,s||""),M.emit(E.PRESET_ACTIVATED,{type:"tool",presetName:s}),!0}function Fs(s,e){let t=Nt(s);if(!t)return!1;let o=G.get(te.TOOLS)||{};return o[s]=At({...t,id:s,enabled:e,metadata:{...t?.metadata||{},createdAt:t?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),G.set(te.TOOLS,o),M.emit(e?E.TOOL_ENABLED:E.TOOL_DISABLED,{toolId:s,enabled:e}),!0}function Hs(){let s=G.get(te.TOOLS)||{},e=G.get(te.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:s,presets:e},null,2)}function Ys(s,e=!1){try{let t=typeof e=="object"?!!e?.overwrite:!!e,o=JSON.parse(s);if(!o||typeof o!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=t?{}:G.get(te.TOOLS)||{},n=t?{}:G.get(te.PRESETS)||{},i=0,a=0;if(o.tools&&typeof o.tools=="object"){for(let[l,c]of Object.entries(o.tools))!c||typeof c!="object"||(r[l]=At({...c,id:l}),i+=1);G.set(te.TOOLS,r)}if(o.presets&&typeof o.presets=="object"){for(let[l,c]of Object.entries(o.presets))!c||typeof c!="object"||(n[l]={...c,name:l,updatedAt:new Date().toISOString()},a+=1);G.set(te.PRESETS,n)}return{success:!0,toolsImported:i,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(t){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${t.message}`}}}function Ks(){G.remove(te.TOOLS),G.remove(te.PRESETS),G.remove(te.CURRENT_PRESET)}var Ce,Us,te,La,qs=O(()=>{Oe();pe();Ce={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Us={},te={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};La={getAllTools:yt,getTool:Nt,saveTool:zs,deleteTool:js,setToolEnabled:Fs,exportTools:Hs,importTools:Ys,resetTools:Ks,getToolPresets:Ws,saveToolPreset:pn,deleteToolPreset:un,getCurrentToolPreset:yn,setCurrentToolPreset:gn,createDefaultToolDefinition:At,normalizeToolDefinitionToRuntimeConfig:os}});var On={};ie(On,{TOOL_CATEGORIES:()=>mn,TOOL_REGISTRY:()=>Bt,appendToolRuntimeHistory:()=>kn,clearToolApiPreset:()=>En,default:()=>Ha,ensureToolRuntimeConfig:()=>Gs,getAllDefaultToolConfigs:()=>Pn,getAllToolApiBindings:()=>An,getAllToolFullConfigs:()=>ls,getEnabledTools:()=>In,getToolApiPreset:()=>or,getToolBaseConfig:()=>Ut,getToolConfig:()=>is,getToolFullConfig:()=>K,getToolList:()=>wn,getToolSubTabs:()=>Tn,getToolWindowState:()=>Rn,hasTool:()=>sr,onPresetDeleted:()=>Mn,patchToolRuntime:()=>as,registerTool:()=>xn,resetToolConfig:()=>Cn,resetToolRegistry:()=>Sn,saveToolConfig:()=>Ie,saveToolWindowState:()=>$n,setToolApiPreset:()=>_n,setToolApiPresetConfig:()=>ja,setToolBypassConfig:()=>Wa,setToolOutputMode:()=>za,setToolPromptTemplate:()=>Fa,unregisterTool:()=>vn,updateToolRuntime:()=>rr});function rs(s={}){let e=Array.isArray(s?.recentWritebackHistory)?s.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(s?.lastRunAt)?s.lastRunAt:0,lastStatus:typeof s?.lastStatus=="string"?s.lastStatus:"idle",lastError:typeof s?.lastError=="string"?s.lastError:"",lastDurationMs:Number.isFinite(s?.lastDurationMs)?s.lastDurationMs:0,successCount:Number.isFinite(s?.successCount)?s.successCount:0,errorCount:Number.isFinite(s?.errorCount)?s.errorCount:0,lastMessageKey:typeof s?.lastMessageKey=="string"?s.lastMessageKey:"",lastExecutionKey:typeof s?.lastExecutionKey=="string"?s.lastExecutionKey:"",lastExecutionPath:typeof s?.lastExecutionPath=="string"?s.lastExecutionPath:"",lastWritebackStatus:typeof s?.lastWritebackStatus=="string"?s.lastWritebackStatus:"",lastFailureStage:typeof s?.lastFailureStage=="string"?s.lastFailureStage:"",lastSlotBindingKey:typeof s?.lastSlotBindingKey=="string"?s.lastSlotBindingKey:"",lastSlotRevisionKey:typeof s?.lastSlotRevisionKey=="string"?s.lastSlotRevisionKey:"",lastSlotTransactionId:typeof s?.lastSlotTransactionId=="string"?s.lastSlotTransactionId:"",lastSourceMessageId:typeof s?.lastSourceMessageId=="string"?s.lastSourceMessageId:"",lastSourceSwipeId:typeof s?.lastSourceSwipeId=="string"?s.lastSourceSwipeId:"",lastContentCommitted:s?.lastContentCommitted===!0,lastHostCommitApplied:s?.lastHostCommitApplied===!0,lastRefreshRequested:s?.lastRefreshRequested===!0,lastRefreshConfirmed:s?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof s?.lastPreferredCommitMethod=="string"?s.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof s?.lastAppliedCommitMethod=="string"?s.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(s?.lastRefreshMethodCount)?s.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(s?.lastRefreshMethods)?s.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(s?.lastRefreshConfirmChecks)?s.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof s?.lastRefreshConfirmedBy=="string"?s.lastRefreshConfirmedBy:"",lastTraceId:typeof s?.lastTraceId=="string"?s.lastTraceId:"",lastAutoRunAt:Number.isFinite(s?.lastAutoRunAt)?s.lastAutoRunAt:0,lastAutoStatus:typeof s?.lastAutoStatus=="string"?s.lastAutoStatus:"idle",lastAutoMessageId:typeof s?.lastAutoMessageId=="string"?s.lastAutoMessageId:"",lastAutoSwipeId:typeof s?.lastAutoSwipeId=="string"?s.lastAutoSwipeId:"",lastAutoRevisionKey:typeof s?.lastAutoRevisionKey=="string"?s.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof s?.lastAutoWritebackStatus=="string"?s.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:s?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof s?.lastAutoSkipReason=="string"?s.lastAutoSkipReason:"",recentWritebackHistory:e}}function Na(s,e=10){let t=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(s)?s.length<=t?s:s.slice(s.length-t):[]}function hn(){let s=yt()||{};return Object.entries(s).filter(([e])=>!ns[e]).map(([e,t])=>[e,t||{}])}function bn(){let s=Array.isArray(Bt.tools?.subTabs)?[...Bt.tools.subTabs]:[],e=hn().map(([t,o],r)=>{let n=os(t,o);return{id:t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+r,isCustom:!0,description:n.description||""}});return[...s,...e].sort((t,o)=>(t.order??0)-(o.order??0))}function Ba(s,e={}){let t=os(s,e,{defaultOutputMode:"follow_ai"});return{...t,runtime:rs(t.runtime)}}function tr(s){let e=ns[s];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:rs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let o=(yt()||{})[s]||null;return o?Ba(s,o):is(s)}function Ut(s){let e=tr(s);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Ua(s,e={},t=""){if(!s)return null;let o={...s,...e,id:s.id||e.id};o.output={...s.output||{},...e.output||{}},o.automation={enabled:s?.automation?.enabled===!0||e?.automation?.enabled===!0,settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(s?.automation?.settleMs)?s.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(s?.automation?.cooldownMs)?s.automation.cooldownMs:5e3},o.bypass={...s.bypass||{},...e.bypass||{}},o.worldbooks={...s.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(s?.worldbooks?.selected)?[...s.worldbooks.selected]:[]},o.runtime=rs({...s.runtime||{},...e.runtime||{}}),o.extraction={...s.extraction||{},...e.extraction||{}},o.processor={...s.processor||{},...e.processor||{},options:{...s?.processor?.options||{},...e?.processor?.options||{}}};let r=e?.output?.apiPreset||e?.apiPreset||o.output?.apiPreset||o.apiPreset||t||"";return o.output={...o.output||{},apiPreset:r},o.apiPreset=r,(!Array.isArray(o.extraction.selectors)||o.extraction.selectors.length===0)&&Array.isArray(o.extractTags)&&o.extractTags.length>0&&(o.extraction.selectors=[...o.extractTags]),(!Array.isArray(o.extractTags)||o.extractTags.length===0)&&(o.extractTags=Array.isArray(o.extraction.selectors)?[...o.extraction.selectors]:[]),s.isCustom?o.enabled=s.enabled!==!1:typeof e.enabled=="boolean"?o.enabled=e.enabled:o.enabled=s.enabled!==!1,o}function xn(s,e){if(!s||typeof s!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let t=["name","icon","component"];for(let o of t)if(!e[o])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${o}`),!1;return Ve[s]={id:s,...e,order:e.order??Object.keys(Ve).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${s}`),!0}function vn(s){return Ve[s]?(delete Ve[s],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${s}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${s}`),!1)}function wn(s=!0){let e=Object.values(Ve).map(t=>t.id==="tools"?{...t,subTabs:bn()}:t);return s?e.sort((t,o)=>(t.order??0)-(o.order??0)):e}function is(s){return s==="tools"&&Ve[s]?{...Ve[s],subTabs:bn()}:Ve[s]||null}function sr(s){return!!Ve[s]}function Tn(s){let e=is(s);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Sn(){Ve={...Bt},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function _n(s,e){if(!sr(s))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${s}`),!1;let t=v.get(Pe)||{};return t[s]=e||"",v.set(Pe,t),console.log(`[ToolRegistry] \u5DE5\u5177 "${s}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function or(s){return(v.get(Pe)||{})[s]||""}function En(s){let e=v.get(Pe)||{};delete e[s],v.set(Pe,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function An(){return v.get(Pe)||{}}function Mn(s){let e=v.get(Pe)||{},t=!1;for(let o in e)e[o]===s&&(e[o]="",t=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${o}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));t&&v.set(Pe,e)}function K(s){let e=tr(s);if(!e)return is(s);let o=(v.get(Mt)||{})[s]||{},r=or(s);return Ua({...e,id:s},o,r)}function Gs(s){if(!s)return!1;let e=tr(s);if(!e)return!1;let t=v.get(Mt)||{};if(t[s])return!0;let o={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};t[s]=o,v.set(Mt,t);let r=v.get(Pe)||{};return r[s]=o.output?.apiPreset||o.apiPreset||"",v.set(Pe,r),M.emit(E.TOOL_UPDATED,{toolId:s,config:o}),!0}function Ie(s,e,t={}){if(!s||!K(s))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",s),!1;let{emitEvent:o=!0}=t,r=v.get(Mt)||{},n=v.get(Pe)||{},i=e?.output?.apiPreset??e?.apiPreset??"",a=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return r[s]={},a.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){r[s][l]={...e.output,apiPreset:i};return}if(l==="apiPreset"){r[s][l]=i;return}r[s][l]=e[l]}}),r[s].apiPreset===void 0&&(r[s].apiPreset=i),!r[s].output&&e.output!==void 0&&(r[s].output={...e.output||{},apiPreset:i}),v.set(Mt,r),n[s]=i,v.set(Pe,n),o&&M.emit(E.TOOL_UPDATED,{toolId:s,config:r[s]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${s}`),!0}function za(s,e){let t=K(s);return t?Ie(s,{...t,output:{...t.output,mode:e}}):!1}function ja(s,e){let t=K(s);return t?Ie(s,{...t,apiPreset:e,output:{...t.output,apiPreset:e}}):!1}function Wa(s,e){let t=K(s);return t?Ie(s,{...t,bypass:{...t.bypass,...e}}):!1}function Fa(s,e){let t=K(s);return t?Ie(s,{...t,promptTemplate:e}):!1}function as(s,e,t={}){let o=K(s);if(!o)return!1;let{touchLastRunAt:r=!1,emitEvent:n=!1}=t,i=rs({...o.runtime||{},...e||{}});return r&&(i.lastRunAt=Date.now()),Ie(s,{...o,runtime:i},{emitEvent:n})}function kn(s,e,t={},o={}){let r=K(s);if(!r)return!1;let{limit:n=10,emitEvent:i=!1}=o,a=rs(r.runtime||{}),l="recentWritebackHistory",c={id:t?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:t?.at||Date.now(),...t};return a[l]=Na([...Array.isArray(a[l])?a[l]:[],c],n),c?.traceId&&(a.lastTraceId=c.traceId),Ie(s,{...r,runtime:a},{emitEvent:i})}function rr(s,e){return as(s,e,{touchLastRunAt:!0,emitEvent:!0})}function Cn(s){if(!s||!ns[s])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",s),!1;let e=v.get(Mt)||{};return delete e[s],v.set(Mt,e),M.emit(E.TOOL_UPDATED,{toolId:s,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${s}`),!0}function Pn(){return{...ns}}function ls(){let s=new Set([...Object.keys(ns),...hn().map(([e])=>e)]);return Array.from(s).map(e=>K(e)).filter(Boolean)}function In(){return ls().filter(s=>s&&s.enabled)}function $n(s,e){let t=v.get(er)||{};t[s]={...e,updatedAt:Date.now()},v.set(er,t)}function Rn(s){return(v.get(er)||{})[s]||null}var Mt,Pe,er,ns,Bt,mn,Ve,Ha,gt=O(()=>{Oe();pe();qs();Mt="tool_configs",Pe="tool_api_bindings",er="tool_window_states";ns={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},Bt={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},mn={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Ve={...Bt};Ha={TOOL_REGISTRY:Bt,TOOL_CATEGORIES:mn,registerTool:xn,unregisterTool:vn,getToolList:wn,getToolConfig:is,hasTool:sr,getToolSubTabs:Tn,resetToolRegistry:Sn,setToolApiPreset:_n,getToolApiPreset:or,clearToolApiPreset:En,getAllToolApiBindings:An,onPresetDeleted:Mn,saveToolWindowState:$n,getToolWindowState:Rn,getToolBaseConfig:Ut,ensureToolRuntimeConfig:Gs,getToolFullConfig:K,patchToolRuntime:as,appendToolRuntimeHistory:kn,saveToolConfig:Ie,resetToolConfig:Cn,getAllDefaultToolConfigs:Pn,getAllToolFullConfigs:ls,getEnabledTools:In}});var Ue,nr=O(()=>{Le();qs();gt();Ue={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(s){if(!s)return;let t=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!t){h("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}t.switchMainTab("tools"),t.switchSubTab("tools",s)},render(s){let e=yt(),t=Object.entries(e),o=t.filter(([,r])=>r?.enabled!==!1).length;return`
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
      `},bindEvents(s,e){let t=j();!t||!H(s)||(this._bindToolEvents(s,t),this._bindFileEvents(s,t))},_bindToolEvents(s,e){s.find(".yyt-tool-toggle input").on("change",t=>{let o=e(t.currentTarget).closest(".yyt-tool-item"),r=o.data("tool-id"),n=e(t.currentTarget).is(":checked");Fs(r,n),o.toggleClass("yyt-enabled",n).toggleClass("yyt-disabled",!n),h("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),s.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(s,e,null)}),s.find('.yyt-tool-item [data-action="config"]').on("click",t=>{let o=e(t.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(o)}),s.find('.yyt-tool-item [data-action="edit"]').on("click",t=>{let o=e(t.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(s,e,o)}),s.find('.yyt-tool-item [data-action="delete"]').on("click",t=>{let o=e(t.currentTarget).closest(".yyt-tool-item").data("tool-id"),r=Nt(o);if(!o||!r||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${r.name}\u201D\u5417\uFF1F`))return;if(!js(o)){h("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(s),h("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(s,e){s.find("#yyt-import-tools").on("click",()=>{s.find("#yyt-import-tools-file").click()}),s.find("#yyt-import-tools-file").on("change",async t=>{let o=t.target.files[0];if(o){try{let r=await tt(o),n=Ys(r,{overwrite:!1});h(n.success?"success":"error",n.message),n.success&&this.renderTo(s)}catch(r){h("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(t.target).val("")}}),s.find("#yyt-export-tools").on("click",()=>{try{let t=Hs();et(t,`youyou_toolkit_tools_${Date.now()}.json`),h("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(t){h("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}}),s.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Ks(),this.renderTo(s),h("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(s,e,t){let o=t?Nt(t):null,r=!!o,n=`
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
    `;e("#yyt-tool-dialog-overlay").remove(),s.append(n);let i=e("#yyt-tool-dialog-overlay"),a=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),i.on("click",function(l){l.target===this&&a()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),u=parseInt(e("#yyt-tool-timeout").val())||6e4,f=parseInt(e("#yyt-tool-retries").val())||3;if(!l){h("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let y=t||`tool_${Date.now()}`;if(!zs(y,{name:l,category:c,description:d,promptTemplate:o?.promptTemplate||"",extractTags:Array.isArray(o?.extractTags)?o.extractTags:[],config:{execution:{timeout:u,retries:f},api:o?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(o?.config?.messages)?o.config.messages:[],context:{depth:o?.config?.context?.depth||3,includeTags:Array.isArray(o?.config?.context?.includeTags)?o.config.context.includeTags:[],excludeTags:Array.isArray(o?.config?.context?.excludeTags)?o.config.context.excludeTags:[]},worldbooks:{enabled:o?.config?.worldbooks?.enabled===!0,selected:Array.isArray(o?.config?.worldbooks?.selected)?o.config.worldbooks.selected:[]}},enabled:o?.enabled!==!1})){h("error",r?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Gs(y),a(),this.renderTo(s),h("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),r||this._openToolConfig(y)})},destroy(s){!j()||!H(s)||s.find("*").off()},getStyles(){return`
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
    `},renderTo(s){let e=this.render({});s.html(e),this.bindEvents(s,{})}}});function zt(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Vs(){return zt()?.SillyTavern||null}function be(s){return s==null?"":String(s).trim()}function Ya(s){if(!s)return"";let e=[s.content,s.mes,s.message,s.text,s?.data?.content];for(let t of e)if(typeof t=="string"&&t.trim())return t.trim();return""}function Ka(s){let e=String(s?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||s?.is_user===!0?"user":s?.is_system===!0?"system":"assistant"}function Dn(s=""){let e=String(s||"").trim();if(!e)return"empty";let t=0;for(let o=0;o<e.length;o+=1)t=(t<<5)-t+e.charCodeAt(o),t|=0;return`fp_${Math.abs(t).toString(36)}`}function Ln(s={}){let e=be(s.chatId)||"chat_default",t=be(s.messageId)||"latest";return`${e}::${t}`}function Nn(s={}){let e=Ln(s),t=be(s.effectiveSwipeId)||"swipe:current",o=be(s.assistantContentFingerprint)||"empty";return`${e}::${t}::${o}`}function qa(s={}){let e=Nn(s),t=be(s.eventType)||"MANUAL",o=be(s.traceId)||Bn("manual");return`${e}::${t}::${o}`}function Bn(s="trace"){return`${s}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Un(){let s=Vs();try{let e=s?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(s?.chat)?s.chat:[]}function zn(s=[]){let e=[],t=null,o=null;return s.forEach((r,n)=>{let i=Ka(r),a=Ya(r);if(!a)return;let l=be(r?.messageId??r?.message_id??r?.id??r?.mid??r?.mesid??r?.chat_index??n),c=be(r?.swipe_id??r?.swipeId??r?.swipe??""),d={role:i,content:a,sourceId:l,swipeId:c,raw:r,index:n};e.push(d),i==="user"&&(t=d),i==="assistant"&&(o=d)}),{messages:e,lastUserMessage:t,lastAiMessage:o}}function Ga(s,e,t){return be(e?.chatId??e?.chat_id??s?.chatId??s?.chat_id??s?.this_chid??t?.id??"chat_default")||"chat_default"}async function ir(){let s=Vs();if(!s)return null;try{let e=s.this_chid,t=s.characters||[];if(e>=0&&e<t.length){let o=t[e];return{id:e,name:o?.name||"",description:o?.description||"",personality:o?.personality||"",scenario:o?.scenario||"",firstMes:o?.first_mes||"",mesExample:o?.mes_example||""}}}catch(e){console.error("[YouYouToolkit:ExecutionContext] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function Va(s="",e=null){let t=String(s||""),o=e?.YouYouToolkit_toolOutputs;return o&&typeof o=="object"&&Object.values(o).forEach(r=>{let n=String(r?.blockText||r?.content||"").trim();n&&t.includes(n)&&(t=t.replace(n,"").trimEnd())}),t.trim()}function Ja(s,e={}){let t=Array.isArray(s?.messages)?s.messages:[],o=be(e.messageId),r=be(e.swipeId);if(!o)return s?.lastAiMessage||null;let n=t.filter(a=>a.role==="assistant"),i=n.find(a=>a.sourceId!==o?!1:r?be(a.swipeId)===r:!0);return i||n.find(a=>a.sourceId===o)||null}function jn({api:s,stContext:e,character:t,conversation:o,targetAssistantMessage:r,runSource:n="MANUAL"}={}){let i=o?.messages||[],a=o?.lastUserMessage||null,l=be(r?.sourceId)||"",c=be(r?.swipeId)||"swipe:current",d=r?.content||"",u=Va(d,r?.raw||null),f=Dn(d),y=Dn(u),x=Ga(s,e,t),S=Bn(String(n||"manual").toLowerCase()),P=Ln({chatId:x,messageId:l}),I=Nn({chatId:x,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:y});return{startedAt:Date.now(),runSource:n,traceId:S,chatId:x,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:P,slotRevisionKey:I,slotTransactionId:qa({chatId:x,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:y,eventType:n,traceId:S}),executionKey:I,lastAiMessage:d,assistantContentFingerprint:f,assistantBaseText:u,assistantBaseFingerprint:y,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:a?.content||"",userMessage:a?.content||"",targetAssistantMessage:r,chatMessages:i,characterCard:t,chatHistory:i,input:{userMessage:a?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:t?.name||"",chatLength:i.length||0}},config:{},status:"pending"}}async function ar({runSource:s="MANUAL"}={}){let e=Vs(),t=e?.getContext?.()||null,o=await ir(),r=Un(),n=zn(r),i=n?.lastAiMessage||null;return jn({api:e,stContext:t,character:o,conversation:n,targetAssistantMessage:i,runSource:s})}async function lr({messageId:s,swipeId:e="",runSource:t="AUTO"}={}){let o=Vs(),r=o?.getContext?.()||null,n=await ir(),i=Un(),a=zn(i),l=Ja(a,{messageId:s,swipeId:e});return jn({api:o,stContext:r,character:n,conversation:a,targetAssistantMessage:l,runSource:t})}var Js=O(()=>{});function Wn(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return zt()?.TavernHelper||null}function Xa(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return zt()?.SillyTavern||null}function cs(s){return Array.isArray(s)?Array.from(new Set(s.map(e=>String(e||"").trim()).filter(Boolean))):[]}function cr(s){if(Array.isArray(s))return s.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(s&&typeof s=="object"){let e={};return Object.keys(s).forEach(t=>{let o=s[t];Array.isArray(o)?e[t]=o.map(r=>typeof r=="string"?r:r&&typeof r=="object"?r.name||r.id||r.title||"[object]":String(r??"")):o&&typeof o=="object"?e[t]="[object]":e[t]=o}),e}return s}function Qa(s={}){let e=typeof s.content=="string"?s.content.trim():"";if(!e)return"";let t=[s.comment,s.key,s.keysecondary,s.text].map(o=>String(o||"").trim()).find(Boolean);return t&&t!==e?`## ${t}
${e}`:e}function Xs(){return Array.isArray(dr)?[...dr]:[]}function Fn(){return pr?{...pr}:null}async function Za(s){if(!s||typeof s.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(s.getCharLorebooks({type:"all"}));return cs([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return console.warn("[ToolWorldbookService] \u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function el(s,e){if(s&&typeof s.getLorebooks=="function")try{let t=cs(await Promise.resolve(s.getLorebooks()));if(t.length>0)return t}catch(t){console.warn("[ToolWorldbookService] \u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",t)}if(e&&typeof e.getWorldBooks=="function")try{let t=await Promise.resolve(e.getWorldBooks()),o=cs(Array.isArray(t)?t.map(r=>r?.name??r):[]);if(o.length>0)return o}catch(t){console.warn("[ToolWorldbookService] \u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",t)}return[]}async function Hn(){let s=Wn(),e=Xa(),t={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!zt()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!zt()?.SillyTavern,helperKeys:s?Object.keys(s).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof s?.getLorebooks,getCharLorebooksType:typeof s?.getCharLorebooks,getLorebookEntriesType:typeof s?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{t.rawResults.getLorebooks=s&&typeof s.getLorebooks=="function"?cr(await Promise.resolve(s.getLorebooks())):"[unavailable]"}catch(i){t.errors.push(`getLorebooks: ${i?.message||i}`)}try{t.rawResults.getCharLorebooks=s&&typeof s.getCharLorebooks=="function"?cr(await Promise.resolve(s.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(i){t.errors.push(`getCharLorebooks: ${i?.message||i}`)}try{t.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?cr(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(i){t.errors.push(`getWorldBooks: ${i?.message||i}`)}let o=await Za(s),r=await el(s,e),n=cs([...o,...r]);return t.characterWorldbooks=[...o],t.allWorldbooks=[...r],t.combinedWorldbooks=[...n],pr=t,dr=n,[...n]}async function Yn(s){let e=cs(s?.worldbooks?.selected);if(s?.worldbooks?.enabled!==!0||e.length===0)return"";let t=Wn();if(!t||typeof t.getLorebookEntries!="function")return console.warn("[ToolWorldbookService] TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let o=[];for(let r of e)try{let n=await t.getLorebookEntries(r),a=(Array.isArray(n)?n.filter(l=>l?.enabled!==!1):[]).map(Qa).filter(Boolean).join(`

`);a&&o.push(`[\u4E16\u754C\u4E66\uFF1A${r}]
${a}`)}catch(n){console.warn(`[ToolWorldbookService] \u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${r}`,n)}return o.join(`

`)}var dr,pr,ur=O(()=>{Js();dr=[],pr=null});var Kn={};ie(Kn,{BypassManager:()=>Qs,DEFAULT_BYPASS_PRESETS:()=>rt,addMessage:()=>pl,buildBypassMessages:()=>ml,bypassManager:()=>U,createPreset:()=>rl,default:()=>hl,deleteMessage:()=>yl,deletePreset:()=>il,duplicatePreset:()=>al,exportPresets:()=>gl,getAllPresets:()=>sl,getDefaultPresetId:()=>ll,getEnabledMessages:()=>dl,getPreset:()=>ol,getPresetList:()=>gr,importPresets:()=>fl,setDefaultPresetId:()=>cl,updateMessage:()=>ul,updatePreset:()=>nl});var ot,jt,yr,rt,tl,Qs,U,sl,gr,ol,rl,nl,il,al,ll,cl,dl,pl,ul,yl,gl,fl,ml,hl,ds=O(()=>{Oe();pe();ot="bypass_presets",jt="default_bypass_preset",yr="current_bypass_preset",rt={},tl=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),Qs=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=v.get(ot,{});return this._cache={...rt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((t,o)=>(o.updatedAt||0)-(t.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:t,name:o,description:r,messages:n}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!o||typeof o!="string"||!o.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=t.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:o.trim(),description:r||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),M.emit(E.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(e,t){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.id&&t.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...o,...t,id:e,updatedAt:Date.now()};return this._savePreset(e,r),M.emit(E.BYPASS_PRESET_UPDATED,{presetId:e,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${o.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(rt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let t=this.getPreset(e);if(!t)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=v.get(ot,{});return delete o[e],v.set(ot,o),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),M.emit(E.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${t.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,t,o){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!t||!t.trim())&&(t=`${e}_copy_${Date.now()}`),this.presetExists(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(r)),id:t.trim(),name:o||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(t.trim(),n),M.emit(E.BYPASS_PRESET_CREATED,{presetId:t,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,t){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:t.role||"SYSTEM",content:t.content||"",enabled:t.enabled!==!1,deletable:t.deletable!==!1},n=[...o.messages||[],r];return this.updatePreset(e,{messages:n})}updateMessage(e,t,o){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=r.messages||[],i=n.findIndex(l=>l.id===t);if(i===-1)return{success:!1,message:`\u6D88\u606F "${t}" \u4E0D\u5B58\u5728`};let a=[...n];return a[i]={...a[i],...o},this.updatePreset(e,{messages:a})}deleteMessage(e,t){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=o.messages||[],n=r.find(a=>a.id===t);if(!n)return{success:!1,message:`\u6D88\u606F "${t}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=r.filter(a=>a.id!==t);return this.updatePreset(e,{messages:i})}getEnabledMessages(e){let t=this.getPreset(e);return!t||!t.enabled?[]:(t.messages||[]).filter(o=>o.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=v.get(jt,null);return e==="undefined"||e==="null"||e===""?(v.remove(jt),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(v.set(jt,e),M.emit(E.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let o=this.getPreset(e);if(!o)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(o,null,2)}let t=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(t)},null,2)}importPresets(e,t={}){let{overwrite:o=!1}=t,r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(r)?r:r.presets?r.presets:[r];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=v.get(ot,{}),a=0;for(let l of n)!l.id||typeof l.id!="string"||l.name&&(rt[l.id]&&!o||!o&&i[l.id]||(i[l.id]={...l,updatedAt:Date.now()},a++));return a>0&&(v.set(ot,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let t=e?.bypass?.presetId;return t?this.getPreset(t):this.getDefaultPreset()}buildBypassMessages(e){let t=this.getToolBypassPreset(e);return t?this.getEnabledMessages(t.id):[]}_savePreset(e,t){let o=v.get(ot,{});o[e]=t,v.set(ot,o),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=v.get(ot,{}),t={},o=!1,r=Array.isArray(e)?e.map((n,i)=>[n?.id||n?.name||`legacy_${i}`,n]):Object.entries(e||{});for(let[n,i]of r){let a=this._normalizePreset(n,i,t);if(!a){o=!0;continue}t[a.id]=a,(!e?.[a.id]||e?.[a.id]?.id!==a.id)&&(o=!0)}o&&v.set(ot,t),this._migrateDefaultPreset(t),this._cache=null,this._migrated=!0}_normalizePreset(e,t,o={}){if(!t||typeof t!="object")return null;let r=typeof t.name=="string"?t.name.trim():"",n=typeof t.id=="string"?t.id.trim():"",i=typeof e=="string"?e.trim():"";if(!r&&i&&i!=="undefined"&&i!=="null"&&(r=i),this._isLegacySamplePreset(r,n)||(!n&&i&&i!=="undefined"&&i!=="null"&&(n=i),!n&&r&&r!=="undefined"&&r!=="null"&&(n=this._generatePresetId(r,o)),!r||!n||n==="undefined"||r==="undefined"))return null;let l=Array.isArray(t.messages)?t.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${n}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...t,id:n,name:r,description:typeof t.description=="string"?t.description:"",enabled:t.enabled!==!1,messages:l,createdAt:t.createdAt||Date.now(),updatedAt:t.updatedAt||Date.now()}}_migrateDefaultPreset(e){let t=v.get(jt,null),o=v.get(yr,null),r=t??o;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!e[r]&&(r=Object.values(e).find(i=>i.name===r)?.id||null),r?v.set(jt,r):v.remove(jt),v.has(yr)&&v.remove(yr)}_isLegacySamplePreset(e,t=""){return e?t==="standard"||t==="enhanced"||t==="jailbreak"||tl.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,t={}){let o=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=o,n=1;for(;t[r];)r=`${o}_${n++}`;return r}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},U=new Qs,sl=()=>U.getAllPresets(),gr=()=>U.getPresetList(),ol=s=>U.getPreset(s),rl=s=>U.createPreset(s),nl=(s,e)=>U.updatePreset(s,e),il=s=>U.deletePreset(s),al=(s,e,t)=>U.duplicatePreset(s,e,t),ll=()=>U.getDefaultPresetId(),cl=s=>U.setDefaultPresetId(s),dl=s=>U.getEnabledMessages(s),pl=(s,e)=>U.addMessage(s,e),ul=(s,e,t)=>U.updateMessage(s,e,t),yl=(s,e)=>U.deleteMessage(s,e),gl=s=>U.exportPresets(s),fl=(s,e)=>U.importPresets(s,e),ml=s=>U.buildBypassMessages(s),hl=U});var qn={};ie(qn,{DEFAULT_SETTINGS:()=>ps,SettingsService:()=>Zs,default:()=>bl,settingsService:()=>_e});var ps,fr,Zs,_e,bl,us=O(()=>{Oe();pe();ps={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},fr="settings_v2",Zs=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=v.get(fr,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),v.set(fr,this._cache),M.emit(E.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let t=this.getSettings(),o=this._deepMerge(t,e);this.saveSettings(o)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(ps)),v.set(fr,this._cache),M.emit(E.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,t=null){let o=this.getSettings(),r=e.split("."),n=o;for(let i of r)if(n&&typeof n=="object"&&i in n)n=n[i];else return t;return n}set(e,t){let o=JSON.parse(JSON.stringify(this.getSettings())),r=e.split("."),n=o;for(let i=0;i<r.length-1;i+=1){let a=r[i];a in n||(n[a]={}),n=n[a]}n[r[r.length-1]]=t,this.saveSettings(o)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(ps)),e)}_deepMerge(e,t){let o={...e};for(let r in t)t[r]&&typeof t[r]=="object"&&!Array.isArray(t[r])?o[r]=this._deepMerge(e[r]||{},t[r]):o[r]=t[r];return o}},_e=new Zs,bl=_e});var Vn={};ie(Vn,{ContextInjector:()=>to,DEFAULT_INJECTION_OPTIONS:()=>Gn,WRITEBACK_METHODS:()=>ye,WRITEBACK_RESULT_STATUS:()=>eo,contextInjector:()=>Ft,default:()=>wl});function mr(s){return typeof s=="number"&&Number.isFinite(s)?String(s):typeof s=="string"&&s.trim()?s.trim():""}function ft(s,e){let t=String(e||"").trim();return t?Array.isArray(s)?(s.includes(t)||s.push(t),s):[t]:s}var xe,Wt,Gn,eo,ye,xl,vl,to,Ft,wl,so=O(()=>{pe();xe="YouYouToolkit_toolOutputs",Wt="YouYouToolkit_injectedContext",Gn={overwrite:!0,enabled:!0};eo={SUCCESS:"success",FAILED:"failed"},ye={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},xl=60,vl=3;to=class{constructor(){this.debugMode=!1}async inject(e,t,o={}){return(await this.injectDetailed(e,t,o)).success}async injectDetailed(e,t,o={}){let r={...Gn,...o},n=this._createWritebackResult(e,r);if(!e||t===void 0||t===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!mr(r.sourceMessageId))return this._log("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;let i=n.chatId,a={toolId:e,content:String(t),updatedAt:Date.now(),sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,options:r};M.emit(E.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:i,content:a.content,sourceMessageId:a.sourceMessageId,sourceSwipeId:a.sourceSwipeId,effectiveSwipeId:a.sourceSwipeId,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",traceId:r.traceId||"",sessionKey:r.sessionKey||"",options:r});let l=await this._insertToolOutputToBoundAssistantSlot(e,a,r,n);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${i}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:t}=this._getChatRuntime(),o=this._findAssistantMessageIndex(t,e);if(o<0)return"";let r=t[o]||{},n=r[Wt];if(typeof n=="string"&&n.trim())return n.trim();let i=r[xe];return i&&typeof i=="object"?this._buildMessageInjectedContext(i).trim():""}catch(t){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",t),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),t=this._findAssistantMessageIndex(e,null);if(t<0)return{};let r=(e[t]||{})[xe];return r&&typeof r=="object"?r:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,t){if(!t)return null;try{let{chat:o}=this._getChatRuntime(),r=this._findAssistantMessageIndex(o,null);return r<0?null:o[r]?.[xe]?.[t]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,t){if(!t)return!1;try{let{api:o,context:r,chat:n}=this._getChatRuntime(),i=this._findAssistantMessageIndex(n,null);if(i<0)return!1;let a=n[i],l=a?.[xe];if(!l||!l[t])return!1;delete l[t],a[xe]=l,a[Wt]=this._buildMessageInjectedContext(l);let c=r?.saveChat||o?.saveChat||null;return typeof c=="function"&&await c.call(r||o),M.emit(E.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:t}),!0}catch(o){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",o),!1}}async clearAllContext(e){try{let{api:t,context:o,chat:r}=this._getChatRuntime(),n=this._findAssistantMessageIndex(r,null);if(n<0)return!1;let i=r[n];delete i[xe],delete i[Wt];let a=o?.saveChat||t?.saveChat||null;return typeof a=="function"&&await a.call(o||t),M.emit(E.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(t){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",t),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,t){return!!this.getToolContext(e,t)}getContextSummary(e){let t=this._getLatestAssistantMessageOutputs(),o=Object.entries(t).map(([r,n])=>({toolId:r,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:o,totalCount:o.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,t={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,t=e.SillyTavern||null,o=t?.getContext?.()||null,r=Array.isArray(o?.chat)?o.chat:[],n=Array.isArray(t?.chat)?t.chat:[],i=r.length?r:n;return{topWindow:e,api:t,context:o,chat:i,contextChat:r,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,t={}){let o=ye.SET_CHAT_MESSAGE;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:t.traceId||"",sessionKey:t.sessionKey||"",sourceMessageId:t.sourceMessageId||null,sourceSwipeId:t.sourceSwipeId||t.effectiveSwipeId||null,effectiveSwipeId:t.effectiveSwipeId||t.sourceSwipeId||null,slotBindingKey:t.slotBindingKey||"",slotRevisionKey:t.slotRevisionKey||"",slotTransactionId:t.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:ye.NONE,commit:{preferredMethod:o,attemptedMethods:[],appliedMethod:ye.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:eo.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(t=>setTimeout(t,e))}_collectWritebackVerification(e,t,o,r,n,i=null){let a=e?.contextChat?.[o]||e?.apiChat?.[o]||t?.[o]||i||null,l=this._getWritableMessageField(a).text||"",c=a?.[xe]?.[r],d=n?l.includes(n):!0,u=!!(c&&String(c.content||"").trim()===n);return{latestMessage:a,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,t,o,r,n,i=null){let a=1,l=this._collectWritebackVerification(e,t,o,r,n,i);for(let c=0;c<vl;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:a,confirmedBy:"text_and_mirror_present"};await this._wait(xl),a+=1,l=this._collectWritebackVerification(e,t,o,r,n,i)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:a,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}_inferBlockType(e){let t=String(e||"").trim();if(!t)return"empty";let o=t.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return o?.[1]?o[1]:"plain_text"}_stripExactStoredBlock(e,t,o=""){let r=String(e||""),n=String(t||"").trim(),i=String(o||"").trim();return n?r.includes(n)?i?{text:r.replace(n,i).trimEnd(),removed:!0,replaced:!0}:{text:r.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:r,removed:!1,replaced:!1}:{text:r,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,t,o){let{contextChat:r,apiChat:n}=e||{},i=a=>{!Array.isArray(a)||t<0||t>=a.length||a[t]!==o&&(a[t]={...a[t]||{},...o})};i(r),i(n)}_notifyMessageUpdated(e,t){try{let{api:o,topWindow:r}=e||{},n=o?.eventSource||null,a=(o?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";n&&typeof n.emit=="function"&&(n.emit(a,t),typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(()=>{n.emit(a,t)}):typeof r?.setTimeout=="function"&&r.setTimeout(()=>{n.emit(a,t)},30))}catch(o){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",o)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let t=String(e.role||"").toLowerCase();return t==="assistant"||t==="ai"||!t}_findAssistantMessageIndex(e,t){let o=Array.isArray(e)?e:[];if(!o.length)return-1;let r=t!=null&&t!=="",n=(i,a)=>{if(!this._isAssistantMessage(i)||t==null||t==="")return!1;let l=String(t).trim();return l?[i.message_id,i.id,i.messageId,i.mes_id,a].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let i=o.length-1;i>=0;i-=1)if(n(o[i],i))return i;if(r)return-1;for(let i=o.length-1;i>=0;i-=1)if(this._isAssistantMessage(o[i]))return i;return-1}_buildMessageInjectedContext(e){let o=Object.entries(e&&typeof e=="object"?e:{}).sort(([,n],[,i])=>(n?.updatedAt||0)-(i?.updatedAt||0));if(!o.length)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,i]of o)r.push(`[${n}]`),r.push(i?.content||""),r.push("");return r.join(`
`)}_getWritableMessageField(e){let t=["mes","message","content","text"];for(let o of t)if(typeof e?.[o]=="string")return{key:o,text:e[o]};return{key:"mes",text:""}}_applyMessageText(e,t,o={}){let r=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],i=!1;if(n.forEach(a=>{typeof r[a]=="string"&&(r[a]=t,i=!0)}),i||(r.mes=t,r.message=t),Array.isArray(r.swipes)){let a=Number.parseInt(mr(o?.sourceSwipeId||o?.effectiveSwipeId),10),l=Number.isInteger(a)?a:Number.isInteger(r.swipe_id)?r.swipe_id:Number.isInteger(r.swipeId)?r.swipeId:0;l>=0&&l<r.swipes.length&&(r.swipes[l]=t,r.swipe_id=l,r.swipeId=l)}return r}_stripExistingToolOutput(e,t=[]){let o=String(e||"");return(Array.isArray(t)?t:[]).forEach(n=>{let i=String(n||"").trim();if(!i)return;if(i.startsWith("regex:")){try{let d=new RegExp(i.slice(6).trim(),"gis");o=o.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",i,d)}return}let a=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${a}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${a}>\\s*`,"gi"),c=new RegExp(`\\{${a}\\|[\\s\\S]*?\\}\\s*`,"gi");o=o.replace(l,""),o=o.replace(c,"")}),o.trimEnd()}_stripPreviousStoredToolContent(e,t){let o=String(e||""),r=String(t||"").trim();return r?o.replace(r,"").trimEnd():o.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,t,o={},r=null){let n=r||this._createWritebackResult(e,o);try{let i=this._getChatRuntime(),{api:a,context:l,chat:c}=i;if(!Array.isArray(c)||!c.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let d=this._findAssistantMessageIndex(c,o.sourceMessageId);if(d<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;n.messageIndex=d,n.steps.foundTargetMessage=!0;let u=c[d],{key:f,text:y}=this._getWritableMessageField(u);n.textField=f;let x=u[xe]&&typeof u[xe]=="object"?u[xe]:{},S=x?.[e]||{},P=S?.content||"",I=S?.blockText||P||"",V=Object.entries(x).filter(([q])=>q!==e).map(([,q])=>q||{}),R=String(t.content||"").trim(),J=this._inferBlockType(R),le={toolId:e,messageId:o.sourceMessageId||u?.message_id||u?.messageId||d,blockType:J,insertedAt:t.updatedAt,replaceable:o.overwrite!==!1};n.blockIdentity=le;let de=o.overwrite===!1?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,I,R),_=de.text,D="";o.overwrite!==!1&&I&&!de.removed&&(D="previous_block_not_found");let N=o.overwrite===!1||de.replaced?_:this._stripExistingToolOutput(_,o.extractionSelectors),k=N!==_;_=N;let Y=o.overwrite===!1||de.replaced?_:this._stripPreviousStoredToolContent(_,P),ae=Y!==_;_=Y,n.replacedExistingBlock=de.removed||k||ae;let se=o.overwrite===!1?String(y||""):_,W=de.replaced?_.trim():[se.trimEnd(),R].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!R;let ke=V.every(q=>{let g=String(q?.blockText||q?.content||"").trim();return g?W.includes(g):!0});n.preservedOtherToolBlocks=ke,ke?D&&(n.conflictDetected=!0,n.conflictReason=D):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let Re={...x,[e]:{toolId:e,content:R,blockText:R,blockType:J,blockIdentity:le,updatedAt:t.updatedAt,sourceMessageId:t.sourceMessageId||null}};u[f]=W,this._applyMessageText(u,W,o),u[xe]=Re,u[Wt]=this._buildMessageInjectedContext(Re),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(i,d,u),n.steps.runtimeSynced=!0;let Ye=l?.setChatMessages||a?.setChatMessages||i?.topWindow?.setChatMessages||null,ve=l?.setChatMessage||a?.setChatMessage||i?.topWindow?.setChatMessage||null;n.commit.preferredMethod=typeof ve=="function"?ye.SET_CHAT_MESSAGE:typeof Ye=="function"?ye.SET_CHAT_MESSAGES:ye.LOCAL_ONLY;let Qe=!1;if(typeof ve=="function"){ft(n.commit.attemptedMethods,ye.SET_CHAT_MESSAGE);try{await ve.call(l||a||i?.topWindow,{message:W,mes:W,content:W,text:W},d,{swipe_id:mr(o.sourceSwipeId||o.effectiveSwipeId)||"current",refresh:"display_and_render_current"}),n.steps.hostSetChatMessage=!0,n.hostUpdateMethod=ye.SET_CHAT_MESSAGE,n.hostCommitApplied=!0,n.commit.appliedMethod=ye.SET_CHAT_MESSAGE,n.commit.hostCommitApplied=!0,Qe=!0}catch(q){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",q),n.errors.push(`setChatMessage: ${q?.message||String(q)}`)}}if(!Qe&&typeof Ye=="function"){ft(n.commit.attemptedMethods,ye.SET_CHAT_MESSAGES);try{await Ye.call(l||a||i?.topWindow,[{message_id:d,message:W,mes:W,content:W,text:W}],{refresh:"affected"}),n.steps.hostSetChatMessages=!0,n.hostUpdateMethod=ye.SET_CHAT_MESSAGES,n.hostCommitApplied=!0,n.commit.appliedMethod=ye.SET_CHAT_MESSAGES,n.commit.hostCommitApplied=!0,n.commit.fallbackUsed=!0,Qe=!0}catch(q){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",q),n.errors.push(`setChatMessages: ${q?.message||String(q)}`)}}if(Qe||(ft(n.commit.attemptedMethods,ye.LOCAL_ONLY),n.commit.appliedMethod=ye.LOCAL_ONLY,n.commit.fallbackUsed=n.commit.preferredMethod!==ye.LOCAL_ONLY),n.hostUpdateMethod=n.commit.appliedMethod,typeof ve=="function")try{await ve.call(l||a||i?.topWindow,{},d),n.steps.refreshForceSetChatMessage=!0,n.refreshRequested=!0,ft(n.refresh.requestMethods,"setChatMessage(force_refresh)")}catch(q){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",q),n.errors.push(`setChatMessage(refresh): ${q?.message||String(q)}`)}let oe=l?.saveChat||a?.saveChat||null,re=l?.saveChatDebounced||a?.saveChatDebounced||null;typeof re=="function"&&(re.call(l||a),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,ft(n.refresh.requestMethods,"saveChatDebounced")),typeof oe=="function"&&(await oe.call(l||a),n.steps.saveChat=!0,n.refreshRequested=!0,ft(n.refresh.requestMethods,"saveChat")),this._notifyMessageUpdated(i,d),n.steps.notifiedMessageUpdated=!0;let at=String(t.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,ft(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,ft(n.refresh.requestMethods,"MESSAGE_UPDATED")),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let Ke=await this._confirmRefresh(i,c,d,e,at,u);return n.verification.textIncludesContent=Ke.textIncludesContent,n.verification.mirrorStored=Ke.mirrorStored,n.verification.refreshConfirmed=Ke.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(Ke.confirmChecks)||0,n.refresh.confirmedBy=Ke.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?eo.SUCCESS:eo.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),n}catch(i){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",i),n.error=i?.message||String(i),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let t=this._getChatRuntime(),{chat:o}=t,r=this._findAssistantMessageIndex(o,e);if(r<0)return null;let n=o[r]||null,i=this._getWritableMessageField(n).text||"",a=n?.[xe]&&typeof n[xe]=="object"?n[xe]:{},l=Object.values(a).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(i||"")).trim();return{messageIndex:r,message:n,messageText:i,baseText:l,toolOutputs:a,injectedContext:typeof n?.[Wt]=="string"?n[Wt]:this._buildMessageInjectedContext(a)}}catch(t){return this._log("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",t),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext(),r=[t?.chatId,t?.chat_id,t?.chat_filename,t?.chatMetadata?.chatId,t?.chatMetadata?.chat_id,t?.chatMetadata?.file_name,t?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(i=>typeof i=="string"&&i.trim());if(r)return r;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},Ft=new to,wl=Ft});var Xn={};ie(Xn,{BUILTIN_VARIABLES:()=>Jn,VariableResolver:()=>oo,default:()=>Tl,variableResolver:()=>Je});var Jn,oo,Je,Tl,ro=O(()=>{pe();Jn={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},oo=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,t){if(typeof e!="string")return e;let o=e;return o=this._resolveBuiltinVariables(o,t),o=this._resolveCustomVariables(o,t),o=this._resolveRegexVariables(o,t),o}resolveObject(e,t){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>this.resolveObject(r,t));let o={};for(let[r,n]of Object.entries(e))typeof n=="string"?o[r]=this.resolveTemplate(n,t):typeof n=="object"&&n!==null?o[r]=this.resolveObject(n,t):o[r]=n;return o}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,t){e&&(this.customVariables.set(e,t),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,t){!e||typeof t!="function"||(this.variableHandlers.set(e,t),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,t]of Object.entries(Jn))e.push({name:`{{${t.name}}}`,description:t.description,category:t.category,type:"builtin"});for(let[t,o]of this.customVariables)e.push({name:`{{${t}}}`,description:typeof o=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],t={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},o={};for(let r of this.getAvailableVariables())o[r.category]||(o[r.category]=[]),o[r.category].push(r);for(let[r,n]of Object.entries(t))if(o[r]&&o[r].length>0){e.push(`\u3010${n}\u3011`);for(let i of o[r])e.push(`  ${i.name} - ${i.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,t)=>(t.regexResults||t.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,t){let o=e;return o=o.replace(/\{\{lastUserMessage\}\}/gi,t.lastUserMessage||t.raw?.lastUserMessage||""),o=o.replace(/\{\{lastAiMessage\}\}/gi,t.lastAiMessage||t.raw?.lastAiMessage||""),o=o.replace(/\{\{chatHistory\}\}/gi,()=>{let r=t.chatHistory||t.raw?.chatHistory||[];return this._formatChatHistory(r)}),o=o.replace(/\{\{characterCard\}\}/gi,()=>{let r=t.characterCard||t.raw?.characterCard;return r?this._formatCharacterCard(r):""}),o=o.replace(/\{\{toolName\}\}/gi,t.toolName||t.raw?.toolName||""),o=o.replace(/\{\{toolId\}\}/gi,t.toolId||t.raw?.toolId||""),o=o.replace(/\{\{toolPromptMacro\}\}/gi,t.toolPromptMacro||t.raw?.toolPromptMacro||""),o=o.replace(/\{\{toolContentMacro\}\}/gi,t.toolContentMacro||t.raw?.toolContentMacro||""),o=o.replace(/\{\{toolWorldbookContent\}\}/gi,t.toolWorldbookContent||t.raw?.toolWorldbookContent||""),o=o.replace(/\{\{injectedContext\}\}/gi,t.injectedContext||t.raw?.injectedContext||""),o=o.replace(/\{\{extractedContent\}\}/gi,t.extractedContent||t.raw?.extractedContent||""),o=o.replace(/\{\{recentMessagesText\}\}/gi,t.recentMessagesText||t.raw?.recentMessagesText||""),o=o.replace(/\{\{rawRecentMessagesText\}\}/gi,t.rawRecentMessagesText||t.raw?.rawRecentMessagesText||""),o=o.replace(/\{\{userMessage\}\}/gi,t.userMessage||t.raw?.userMessage||""),o=o.replace(/\{\{previousToolOutput\}\}/gi,t.previousToolOutput||t.raw?.previousToolOutput||""),o}_resolveCustomVariables(e,t){let o=e;for(let[r,n]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof n=="function"?o=o.replace(i,()=>{try{return n(t)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,a),""}}):o=o.replace(i,String(n))}return o}_resolveRegexVariables(e,t){let o=e;for(let[r,n]of this.variableHandlers){let i=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");o=o.replace(i,(a,l)=>{try{return n(l,t)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${l}:`,c),""}})}return o}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(t=>{let o=t.role||"unknown",r=t.content||t.mes||"";return`[${o}]: ${r}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let t=[];return e.name&&t.push(`\u59D3\u540D: ${e.name}`),e.description&&t.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&t.push(`\u6027\u683C: ${e.personality}`),e.scenario&&t.push(`\u573A\u666F: ${e.scenario}`),t.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},Je=new oo,Tl=Je});var Zn={};ie(Zn,{DEFAULT_PROMPT_TEMPLATE:()=>Qn,ToolPromptService:()=>no,default:()=>Sl,toolPromptService:()=>io});var Qn,no,io,Sl,hr=O(()=>{pe();ds();ro();ur();Qn="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",no=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,t={}){let o=this._getPromptTemplate(e),r=String(t?.toolWorldbookContent||t?.input?.toolWorldbookContent||await Yn(e)).trim(),n=Je.buildToolContext({...t,toolName:e?.name||t?.toolName||"",toolId:e?.id||t?.toolId||"",toolWorldbookContent:r}),i=Je.resolveTemplate(o,n).trim(),a=String(t?.toolContentMacro||t?.input?.toolContentMacro||"").trim();return Je.buildToolContext({...t,toolName:e?.name||t?.toolName||"",toolId:e?.id||t?.toolId||"",toolPromptMacro:i,toolContentMacro:a,toolWorldbookContent:r})}async buildToolMessages(e,t){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let o=[],r=await this._buildVariableContext(e,t),n=this._getBypassMessages(e);if(n&&n.length>0)for(let a of n)a.enabled!==!1&&o.push({role:this._normalizeRole(a.role),content:Je.resolveTemplate(a.content||"",r)});let i=this._buildUserContent(this._getPromptTemplate(e),r);return i&&o.push({role:"user",content:i}),this._log(`\u6784\u5EFA\u6D88\u606F: ${o.length} \u6761`),o}async buildPromptText(e,t){return(await this._buildVariableContext(e,t)).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Qn}_getBypassMessages(e){return e.bypass?.enabled?U.buildBypassMessages(e):[]}_buildUserContent(e,t){return!e||!e.trim()?"":Je.resolveTemplate(e,t).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},io=new no,Sl=io});var ti={};ie(ti,{LEGACY_OUTPUT_MODES:()=>_l,OUTPUT_MODES:()=>mt,TOOL_FAILURE_STAGES:()=>Ee,TOOL_RUNTIME_STATUS:()=>El,TOOL_WRITEBACK_STATUS:()=>ge,ToolOutputService:()=>ao,default:()=>Al,toolOutputService:()=>nt});function ei(s=[],e="",t=null){return{request:{built:Array.isArray(s)&&s.length>0,messageCount:Array.isArray(s)?s.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!t,contentCommitted:!!t?.contentCommitted,hostCommitApplied:!!t?.hostCommitApplied,writebackStatus:t?.writebackStatus||"",preferredCommitMethod:t?.commit?.preferredMethod||"",appliedCommitMethod:t?.commit?.appliedMethod||"",fallbackUsed:!!t?.commit?.fallbackUsed},refresh:{requested:!!t?.refreshRequested,confirmed:!!t?.refreshConfirmed,requestMethods:Array.isArray(t?.refresh?.requestMethods)?[...t.refresh.requestMethods]:[],confirmChecks:Number(t?.refresh?.confirmChecks)||0,confirmedBy:t?.refresh?.confirmedBy||""}}}var mt,_l,El,Ee,ge,ao,nt,Al,lo=O(()=>{pe();us();so();hr();Bs();ws();mt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},_l={inline:"follow_ai"},El={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Ee={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ge={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};ao=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===mt.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let t=e.output?.mode;return t===mt.FOLLOW_AI||t==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,t){let o=Date.now(),r=e.id,n=t?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,i=t?.sessionKey||"",a=t?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=ge.NOT_APPLICABLE,f=null,y=[],x="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),M.emit(E.TOOL_EXECUTION_STARTED,{toolId:r,traceId:n,sessionKey:i,mode:mt.POST_RESPONSE_API});try{if(d=Ee.BUILD_MESSAGES,y=await this._buildToolMessages(e,t),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${y.length} \u6761\u6D88\u606F`);let S=await this._getRequestTimeout();d=Ee.SEND_API_REQUEST;let P=await this._sendApiRequest(c,y,{timeoutMs:S,signal:t.signal});if(d=Ee.EXTRACT_OUTPUT,x=this._extractOutputContent(P,e),x){if(d=Ee.INJECT_CONTEXT,f=await Ft.injectDetailed(r,x,{overwrite:e.output?.overwrite!==!1,sourceMessageId:t.sourceMessageId||t.confirmedAssistantMessageId||t.messageId||"",sourceSwipeId:t.sourceSwipeId||t.confirmedAssistantSwipeId||t.effectiveSwipeId||"",effectiveSwipeId:t.effectiveSwipeId||t.confirmedAssistantSwipeId||"",slotBindingKey:t.slotBindingKey||"",slotRevisionKey:t.slotRevisionKey||"",slotTransactionId:t.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:i}),!f?.success)throw u=ge.FAILED,new Error(f?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ge.SUCCESS}else u=ge.SKIPPED_EMPTY_OUTPUT;d="";let I=Date.now()-o;return M.emit(E.TOOL_EXECUTED,{toolId:r,traceId:n,sessionKey:i,success:!0,duration:I,mode:mt.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${I}ms`),{success:!0,toolId:r,output:x,duration:I,meta:{traceId:n,sessionKey:i,executionKey:a,slotBindingKey:t?.slotBindingKey||"",slotTransactionId:t?.slotTransactionId||"",generationAction:t?.generationAction||"",generationActionSource:t?.generationActionSource||"",rawGenerationType:t?.rawGenerationType||"",normalizedGenerationType:t?.normalizedGenerationType||"",generationMessageBindingSource:t?.generationMessageBindingSource||"",sourceMessageId:t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId||"",sourceSwipeId:t?.sourceSwipeId||t?.confirmedAssistantSwipeId||t?.effectiveSwipeId||"",confirmedAssistantSwipeId:t?.confirmedAssistantSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||"",slotRevisionKey:t?.slotRevisionKey||"",messageCount:y.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:f,phases:ei(y,x,f)}}}catch(S){let P=Date.now()-o,I=d||Ee.UNKNOWN,V=u||ge.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,S),M.emit(E.TOOL_EXECUTION_FAILED,{toolId:r,traceId:n,sessionKey:i,error:S.message||String(S),duration:P}),{success:!1,toolId:r,error:S.message||String(S),duration:P,meta:{traceId:n,sessionKey:i,executionKey:a,slotBindingKey:t?.slotBindingKey||"",slotTransactionId:t?.slotTransactionId||"",generationAction:t?.generationAction||"",generationActionSource:t?.generationActionSource||"",rawGenerationType:t?.rawGenerationType||"",normalizedGenerationType:t?.normalizedGenerationType||"",generationMessageBindingSource:t?.generationMessageBindingSource||"",sourceMessageId:t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId||"",sourceSwipeId:t?.sourceSwipeId||t?.confirmedAssistantSwipeId||t?.effectiveSwipeId||"",confirmedAssistantSwipeId:t?.confirmedAssistantSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||"",slotRevisionKey:t?.slotRevisionKey||"",messageCount:y.length,selectors:l,apiPreset:c,writebackStatus:V,failureStage:I,writebackDetails:f,phases:ei(y,x,f)}}}}async runToolInline(e,t){let o=Date.now(),r=e.id;try{let n=await this._buildToolMessages(e,t);return{success:!0,toolId:r,messages:n,duration:Date.now()-o}}catch(n){return{success:!1,toolId:r,error:n.message||String(n),duration:Date.now()-o}}}async previewExtraction(e,t){return{success:!0,...this.getExtractionSnapshot(e,t)}}getExtractionSnapshot(e,t){let o=this._buildRecentMessageExtractionEntries(e,t),r=this._joinMessageBlocks(o,"rawText"),n=this._joinMessageBlocks(o,"filteredText"),i=this._joinMessageBlocks(o,"extractedText",{skipEmpty:!0}),a=(Array.isArray(o)?o:[]).map(l=>String(l?.extractedText||"").trim()).filter(Boolean).join(`

`);return{sourceText:r,filteredSourceText:n,extractedText:i,extractedRawText:a,messageEntries:o,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,t){let o=this._buildRecentMessageExtractionEntries(e,t),r=this._joinMessageBlocks(o,"rawText"),n=this._joinMessageBlocks(o,"filteredText"),i=this._joinMessageBlocks(o,"extractedText",{skipEmpty:!0}),a={...t,rawRecentMessagesText:r,recentMessagesText:n,extractedContent:i,toolContentMacro:this._buildToolContentMacro(o),toolName:e.name,toolId:e.id};return io.buildToolMessages(e,a)}_normalizeRole(e){if(!e)return"user";let t=String(e).toLowerCase();return t==="system"?"system":t==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,t,o={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:n}=o,i=null;if(e){if(!Oo(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);i=Qt(e)}else i=Qt();let a=Rt(i||{});if(!a.valid&&!i?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${a.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(t,{timeoutMs:r,apiConfig:i},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return _e.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,t){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,t);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,t);if(e.content)return this._applyOutputExtractionSelectors(e.content,t);if(e.text)return this._applyOutputExtractionSelectors(e.text,t);if(e.message)return this._applyOutputExtractionSelectors(e.message,t);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),t)}catch{return this._applyOutputExtractionSelectors(String(e),t)}}return this._applyOutputExtractionSelectors(String(e),t)}_applyOutputExtractionSelectors(e,t){let o=typeof e=="string"?e:String(e||""),r=this._getExtractionSelectors(t);if(!r.length)return o.trim();let n=[];for(let i of r){let a=String(i||"").trim();if(!a)continue;if(a.startsWith("regex:")){let c=a.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...o.matchAll(d)].forEach(f=>{let y=String(f?.[0]||"").trim();y&&n.push(y)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:d})}continue}let l=a.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(o.match(c)||[]).forEach(u=>{let f=String(u||"").trim();f&&n.push(f)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:c})}}return n.length>0?n.join(`

`).trim():o.trim()}_getExtractionSelectors(e){let t=e?.extraction?.selectors;return Array.isArray(t)&&t.length>0?t.map(o=>String(o||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(o=>String(o||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,t){return this._applyExtractionSelectorsInternal(e,t,{strict:!1})}_applyExtractionSelectorsInternal(e,t,o={}){let r=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(t),{strict:i=!1}=o;if(!n.length)return r.trim();let a=n.map((c,d)=>{let u=String(c||"").trim(),f=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:f?"regex_include":"include",value:f?u.slice(6).trim():u,enabled:!0}}).filter(c=>c.value),l=_t(r,a,[]);return i?(l||"").trim():l||r.trim()}_extractToolContent(e,t){let o=typeof t=="string"?t:String(t||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(o,e,{strict:!0}):o.trim()}_applyGlobalContextRules(e){let t=typeof e=="string"?e:String(e||"");if(!t.trim())return"";try{let o=st()||[],r=Et()||[];return!Array.isArray(o)||o.length===0?t.trim():_t(t,o,r)||t.trim()}catch(o){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",o),t.trim()}}_getMessageText(e){if(!e)return"";let t=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let o of t)if(typeof o=="string"&&o.trim())return o.trim();return""}_collectRecentAssistantMessages(e,t){return this._collectRecentAssistantMessageEntries(e,t).map(o=>o.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,t){let o=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),r=Array.isArray(t?.chatMessages)?t.chatMessages:[],n=[];for(let a=r.length-1;a>=0&&n.length<o;a-=1){let l=r[a],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&n.unshift({text:u,message:l,chatIndex:a})}if(n.length>0)return n;let i=t?.lastAiMessage||t?.input?.lastAiMessage||"";return i?[{text:i,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,t){return this._collectRecentAssistantMessageEntries(e,t).map((r,n)=>{let i=r.text||"",a=this._applyGlobalContextRules(i),l=this._extractToolContent(e,i);return{...r,order:n+1,rawText:i,filteredText:a,extractedText:l}})}_joinMessageBlocks(e,t,o={}){let r=Array.isArray(e)?e:[],{skipEmpty:n=!1}=o;return r.map(a=>{let l=String(a?.[t]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${a?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(r=>{let n=`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`,i=String(r?.filteredText||"").trim()||"(\u7A7A)",a=String(r?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${i}

\u5DE5\u5177\uFF1A
${a}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(t=>this.shouldRunPostResponse(t)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(t=>this.shouldRunPostResponse(t)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(t=>this.shouldRunInline(t)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||_e.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},nt=new ao,Al=nt});function oi(s={}){return!s||typeof s!="object"?{}:Object.entries(s).reduce((e,[t,o])=>(e[t]=o===!0,e),{})}function Cl(s,e={}){let t=e?.direction==="unescape"?"unescape":"escape",o=oi(e?.options);return Ml.reduce((r,n)=>o[n.key]!==!0?r:t==="unescape"?r.replace(n.escaped,n.unescaped):r.replace(n.plain,n.replacement),String(s||""))}function Pl(s,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(s||"");let o=oi(e?.options);return kl.reduce((r,n)=>o[n.key]!==!0?r:r.replace(n.from,n.to),String(s||""))}function ri(s,e){let t=s?.processor||{},o=t?.type||"",r=String(e||"");switch(o){case si.ESCAPE_TRANSFORM:return Cl(r,t);case si.PUNCTUATION_TRANSFORM:return Pl(r,t);default:return r}}var Ml,kl,si,ni=O(()=>{Ml=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],kl=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],si={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var po={};ie(po,{abortAllTasks:()=>Dl,abortTask:()=>Ol,buildToolMessages:()=>li,clearExecutionHistory:()=>zl,createExecutionContext:()=>Hl,createResult:()=>co,enhanceMessagesWithBypass:()=>Yl,executeBatch:()=>Rl,executeTool:()=>ai,executeToolWithConfig:()=>ci,executeToolsBatch:()=>Gl,executorState:()=>ee,extractFailed:()=>Fl,extractSuccessful:()=>Wl,generateTaskId:()=>kt,getExecutionHistory:()=>Ul,getExecutorStatus:()=>Bl,getScheduler:()=>Ht,mergeResults:()=>jl,pauseExecutor:()=>Ll,resumeExecutor:()=>Nl,setMaxConcurrent:()=>$l});function co(s,e,t,o,r,n,i=0){return{success:t,taskId:s,toolId:e,data:o,error:r,duration:n,retries:i,timestamp:Date.now(),metadata:{}}}function kt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Il(s,e={}){return{id:kt(),toolId:s,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Ht(){return ys||(ys=new br(ee.maxConcurrent)),ys}function $l(s){ee.maxConcurrent=Math.max(1,Math.min(10,s)),ys&&(ys.maxConcurrent=ee.maxConcurrent)}async function ai(s,e={},t){let o=Ht(),r=Il(s,e);for(;ee.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await o.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof t=="function")return await t(i,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return ii(n),n}catch(n){let i=co(r.id,s,!1,null,n,Date.now()-r.createdAt,r.retries);return ii(i),i}}async function Rl(s,e={}){let{failFast:t=!1,concurrency:o=ee.maxConcurrent}=e,r=[],n=Ht(),i=n.maxConcurrent;n.maxConcurrent=o;try{let a=s.map(({toolId:l,options:c,executor:d})=>ai(l,c,d));if(t)for(let l of a){let c=await l;if(r.push(c),!c.success){n.abortAll();break}}else{let l=await Promise.allSettled(a);for(let c of l)c.status==="fulfilled"?r.push(c.value):r.push(co(kt(),"unknown",!1,null,c.reason,0,0))}}finally{n.maxConcurrent=i}return r}function Ol(s){return Ht().abort(s)}function Dl(){Ht().abortAll(),ee.executionQueue=[]}function Ll(){ee.isPaused=!0}function Nl(){ee.isPaused=!1}function Bl(){return{...Ht().getStatus(),isPaused:ee.isPaused,activeControllers:ee.activeControllers.size,historyCount:ee.executionHistory.length}}function ii(s){ee.executionHistory.push(s),ee.executionHistory.length>100&&ee.executionHistory.shift()}function Ul(s={}){let e=[...ee.executionHistory];return s.toolId&&(e=e.filter(t=>t.toolId===s.toolId)),s.success!==void 0&&(e=e.filter(t=>t.success===s.success)),s.limit&&(e=e.slice(-s.limit)),e}function zl(){ee.executionHistory=[]}function jl(s){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let t of s)e.totalDuration+=t.duration,t.success?(e.successCount++,t.data!==void 0&&t.data!==null&&e.data.push(t.data)):(e.success=!1,e.failureCount++,t.error&&e.errors.push({taskId:t.taskId,toolId:t.toolId,error:t.error.message||String(t.error)}));return e}function Wl(s){return s.filter(e=>e.success).map(e=>e.data)}function Fl(s){return s.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Hl(s={}){return{taskId:kt(),startTime:Date.now(),signal:s.signal||null,apiConfig:s.apiConfig||null,bypassMessages:s.bypassMessages||[],context:s.context||{},metadata:s.metadata||{}}}function Yl(s,e){return!e||e.length===0?s:[...e,...s]}function Kl(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function li(s,e){let t=[],o=s.promptTemplate||"",r={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,i]of Object.entries(r))o=o.replace(new RegExp(Kl(n),"g"),i);return t.push({role:"USER",content:o}),t}async function ci(s,e,t={}){let o=K(s);if(!o)return{success:!1,taskId:kt(),toolId:s,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!o.enabled)return{success:!1,taskId:kt(),toolId:s,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),n=kt();try{M.emit(E.TOOL_EXECUTION_STARTED,{toolId:s,taskId:n,context:e});let i=li(o,e);if(typeof t.callApi=="function"){let a=o.output?.apiPreset||o.apiPreset||"",l=a?{preset:a}:null,c=await t.callApi(i,l,t.signal),d=c;o.outputMode==="separate"&&o.extractTags?.length>0&&(d=ql(c,o.extractTags));let u={success:!0,taskId:n,toolId:s,data:d,duration:Date.now()-r};return M.emit(E.TOOL_EXECUTED,{toolId:s,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:s,data:{messages:i,config:{apiPreset:o.output?.apiPreset||o.apiPreset||"",outputMode:o.outputMode,extractTags:o.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(i){let a={success:!1,taskId:n,toolId:s,error:i.message||String(i),duration:Date.now()-r};return M.emit(E.TOOL_EXECUTION_FAILED,{toolId:s,taskId:n,error:i}),a}}function ql(s,e){let t={};for(let o of e){let r=new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"gi"),n=s.match(r);n&&(t[o]=n.map(i=>{let a=i.match(new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"i"));return a?a[1].trim():""}))}return t}async function Gl(s,e,t={}){let o=[];for(let r of s){let n=K(r);if(n&&n.enabled){let i=await ci(r,e,t);o.push(i)}}return o}var ee,br,ys,uo=O(()=>{gt();pe();ee={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};br=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,t){return new Promise((o,r)=>{this.queue.push({executor:e,task:t,resolve:o,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:t,task:o,resolve:r,reject:n}=e,i=new AbortController;o.abortController=i,o.status="running",o.startedAt=Date.now(),this.running.set(o.id,o),ee.activeControllers.set(o.id,i),this.executeTask(t,o,i.signal).then(a=>{o.status="completed",o.completedAt=Date.now(),r(a)}).catch(a=>{o.status=a.name==="AbortError"?"aborted":"failed",o.completedAt=Date.now(),n(a)}).finally(()=>{this.running.delete(o.id),ee.activeControllers.delete(o.id),ee.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,t,o){let r=Date.now(),n=null;for(let i=0;i<=t.maxRetries;i++){if(o.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await e(o);return co(t.id,t.toolId,!0,a,null,Date.now()-r,i)}catch(a){if(n=a,a.name==="AbortError")throw a;i<t.maxRetries&&(await this.delay(1e3*(i+1)),t.retries=i+1)}}throw n}delay(e){return new Promise(t=>setTimeout(t,e))}abort(e){let t=ee.activeControllers.get(e);return t?(t.abort(),!0):!1}abortAll(){for(let e of ee.activeControllers.values())e.abort();ee.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},ys=null});async function Vl(){return xr||(xr=Promise.resolve().then(()=>(uo(),po))),xr}async function Jl(s,e,t){return t&&s.output?.mode===mt.POST_RESPONSE_API?nt.runToolPostResponse(s,e):(await Vl()).executeToolWithConfig(s.id,e)}function Xl(s,e){return e?.runSource==="MANUAL"?s.output?.mode==="local_transform"||s.processor?.type?Ct.MANUAL_LOCAL_TRANSFORM:s.output?.mode===mt.POST_RESPONSE_API?Ct.MANUAL_POST_RESPONSE_API:Ct.MANUAL_COMPATIBILITY:Ct.MANUAL_POST_RESPONSE_API}function yo(s,e){try{rr(s,e)}catch(t){console.warn("[ManualTool] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",s,t)}}async function Ql(s,e){let t=nt.getExtractionSnapshot(s,e),o=String(t?.extractedRawText||t?.extractedText||"").trim(),r=Array.isArray(t?.selectors)?t.selectors:[],n=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,i=e?.sessionKey||"";if(!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:n,sessionKey:i,selectors:r,writebackStatus:ge.NOT_APPLICABLE,failureStage:Ee.EXTRACT_OUTPUT,extraction:t}};let a=String(ri(s,o)||"").trim(),l=null,c=ge.NOT_APPLICABLE;if(a){if(l=await Ft.injectDetailed(s.id,a,{overwrite:s.output?.overwrite!==!1,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:r,traceId:n,sessionKey:i}),!l?.success)return{success:!1,error:l?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:n,sessionKey:i,selectors:r,writebackStatus:ge.FAILED,failureStage:Ee.INJECT_CONTEXT,writebackDetails:l,extraction:t}};c=ge.SUCCESS}else c=ge.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:a,meta:{traceId:n,sessionKey:i,selectors:r,writebackStatus:c,failureStage:"",writebackDetails:l,extraction:t}}}async function Zl(s,e){let t=Date.now(),o=s.id,r=`yyt-tool-run-${o}`,n=Xl(s,e),i=e?.executionKey||"";yo(o,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),De("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${s.name}`,{sticky:!0,noticeId:r});try{let a=n===Ct.MANUAL_LOCAL_TRANSFORM?await Ql(s,e):await Jl(s,e,!0),l=Date.now()-t;if(a?.success){let f=K(o),y=a?.meta?.writebackDetails||{};return yo(o,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(f?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:a?.meta?.writebackStatus||ge.NOT_APPLICABLE,lastFailureStage:a?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(y?.refresh?.requestMethods)?[...y.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:y?.refresh?.confirmedBy||""}),h("success",`${s.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),De("success",`${s.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:r}),{success:!0,duration:l,result:a}}let c=K(o),d=a?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=a?.meta?.writebackDetails||{};return yo(o,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:a?.meta?.writebackStatus||ge.NOT_APPLICABLE,lastFailureStage:a?.meta?.failureStage||(n===Ct.MANUAL_COMPATIBILITY?Ee.COMPATIBILITY_EXECUTE:Ee.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),h("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),De("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:r}),{success:!1,duration:l,error:d,result:a}}catch(a){let l=Date.now()-t,c=K(o),d=a?.message||String(a);throw yo(o,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:ge.NOT_APPLICABLE,lastFailureStage:n===Ct.MANUAL_COMPATIBILITY?Ee.COMPATIBILITY_EXECUTE:Ee.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),h("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),De("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:r}),a}}async function go(s){if(!s)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=K(s);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return as(s,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:ge.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),De("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${s}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let t=await ar({runSource:"MANUAL"});return Zl(e,t)}async function fo(s){if(!s)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=K(s);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let t=await ar({runSource:"MANUAL_PREVIEW"});return nt.previewExtraction(e,t)}var Ct,xr,vr=O(()=>{gt();lo();Js();so();ni();Le();Ct={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},xr=null});var di={};ie(di,{TOOL_CONFIG_PANEL_STYLES:()=>mo,createToolConfigPanel:()=>ht,default:()=>ec});function ht(s){let{id:e,toolId:t,postResponseHint:o,extractionPlaceholder:r,previewDialogId:n,previewTitle:i="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=s;return{id:e,toolId:t,render(){let a=K(this.toolId);if(!a)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=a.output?.apiPreset||a.apiPreset||"",d=this._getBypassPresets(),u=a.output?.mode||"follow_ai",f=a.bypass?.enabled||!1,y=a.bypass?.presetId||"",x=a.runtime?.lastStatus||"idle",S=a.runtime?.lastRunAt?new Date(a.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",P=a.runtime?.lastError||"",I=a.extraction||{},V=a.automation||{},R=a.worldbooks||{},J=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:Array.isArray(R.selected)?R.selected:[],le=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],de=String(this.worldbookFilter||"").trim().toLowerCase(),_=de?le.filter(W=>String(W||"").toLowerCase().includes(de)):le,D=J.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":J.length<=2?J.join("\u3001"):`\u5DF2\u9009 ${J.length} \u9879\uFF1A${J.slice(0,2).join("\u3001")} \u7B49`,N=Array.isArray(I.selectors)?I.selectors.join(`
`):"",k=u==="post_response_api"?o:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",Y=u==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",ae=u==="post_response_api",se=c||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${b(a.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${b(a.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${b(Y)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${b(se)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${b(x)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${p}-tool-save-top">
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
              <select class="yyt-select" id="${p}-tool-output-mode">
                <option value="follow_ai" ${u==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${u==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${k}${ae?" \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u4ECD\u9700\u5728\u5168\u5C40\u8BBE\u7F6E\u4E2D\u5F00\u542F\u81EA\u52A8\u5316\u3002":""}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${p}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${l.map(W=>`
                  <option value="${b(W.name)}" ${W.name===c?"selected":""}>
                    ${b(W.name)}
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
                <input type="checkbox" id="${p}-tool-bypass-enabled" ${f?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${f?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${p}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${d.map(W=>`
                  <option value="${b(W.id)}" ${W.id===y?"selected":""}>
                    ${b(W.name)}${W.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="checkbox" id="${p}-tool-worldbooks-enabled" ${R.enabled?"checked":""}>
                <span>\u542F\u7528\u4E16\u754C\u4E66\u6CE8\u5165</span>
              </label>
            </div>
            <div class="yyt-form-group">
              <label>\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66\uFF08\u53EF\u591A\u9009\uFF09</label>
              <div class="yyt-worldbook-select" id="${p}-tool-worldbook-select">
                <div class="yyt-worldbook-summary">${b(D)}</div>
                <div class="yyt-worldbook-dropdown" id="${p}-tool-worldbook-dropdown">
                  <input type="text" class="yyt-input yyt-worldbook-search" id="${p}-tool-worldbook-search" placeholder="\u641C\u7D22\u4E16\u754C\u4E66..." value="${b(this.worldbookFilter||"")}">
                  <div class="yyt-worldbook-list" id="${p}-tool-worldbooks">
                    ${le.length>0?_.length>0?_.map(W=>`
                      <div class="yyt-worldbook-item">
                        <label class="yyt-checkbox-label">
                          <input type="checkbox" data-worldbook-name="${b(W)}" ${J.includes(W)?"checked":""}>
                          <span>${b(W)}</span>
                        </label>
                      </div>
                    `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>':`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`}
                  </div>
                  ${this.worldbookLoadState!=="ready"?`
                    <details class="yyt-worldbook-diagnostics">
                      <summary>\u67E5\u770B\u4E16\u754C\u4E66\u8BCA\u65AD</summary>
                      <pre class="yyt-preview-box yyt-preview-pre">${b(JSON.stringify(Fn()||{state:this.worldbookLoadState||"idle",message:"\u5C1A\u672A\u751F\u6210\u8BCA\u65AD\u4FE1\u606F"},null,2))}</pre>
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
                <input type="number" class="yyt-input" id="${p}-tool-max-messages" min="1" max="50" value="${Number(I.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${p}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${b(r)}">${b(N)}</textarea>
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
                <input type="number" class="yyt-input" id="${p}-tool-automation-settle-ms" min="0" max="10000" step="100" value="${Number(V.settleMs)||1200}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u51B7\u5374\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${p}-tool-automation-cooldown-ms" min="0" max="60000" step="100" value="${Number(V.cooldownMs)||5e3}">
              </div>
            </div>
            <div class="yyt-tool-compact-hint">\u4E0D\u518D\u5355\u72EC\u914D\u7F6E\u5DE5\u5177\u7EA7\u5F00\u5173\u3002\u53EA\u8981\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\uFF0C\u5E76\u4E14\u5168\u5C40\u81EA\u52A8\u5316\u5F00\u542F\uFF0C\u5C31\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${p}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${p}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${b(a.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${b(x)}">${b(x)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${b(S)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${a.runtime?.successCount||0} / ${a.runtime?.errorCount||0}</span>
                </div>
                ${P?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${b(P)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${p}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${p}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${p}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86\u7834\u9650\u8BCD\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{toolWorldbookContent}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>
        </div>
      `},_getApiPresets(){try{return Ot()||[]}catch{return[]}},_getBypassPresets(){try{return gr()||[]}catch{return[]}},async _loadWorldbooks(){this.worldbookLoadState="loading";for(let c=0;c<10;c+=1){try{let d=await Hn();if(Array.isArray(d)&&d.length>0)return this.availableWorldbooks=d,this.worldbookLoadState="ready",this.availableWorldbooks}catch{this.availableWorldbooks=Xs()}c<9&&await new Promise(d=>setTimeout(d,400))}return this.availableWorldbooks=Xs(),this.worldbookLoadState="empty",this.availableWorldbooks},_getFormData(a){let l=K(this.toolId),c=a.find(`#${p}-tool-output-mode`).val()||"follow_ai",d=a.find(`#${p}-tool-bypass-enabled`).is(":checked"),u=c==="post_response_api",f=(a.find(`#${p}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean),y=a.find("[data-worldbook-name]:checked").map((x,S)=>String($(S).data("worldbook-name")||"").trim()).get().filter(Boolean);return{enabled:l?.enabled!==!1,promptTemplate:a.find(`#${p}-tool-prompt-template`).val()||"",apiPreset:a.find(`#${p}-tool-api-preset`).val()||"",extractTags:f,output:{mode:c,apiPreset:a.find(`#${p}-tool-api-preset`).val()||"",overwrite:!0,enabled:u},automation:{enabled:u,settleMs:Math.max(0,parseInt(a.find(`#${p}-tool-automation-settle-ms`).val(),10)||1200),cooldownMs:Math.max(0,parseInt(a.find(`#${p}-tool-automation-cooldown-ms`).val(),10)||5e3)},bypass:{enabled:d,presetId:d&&a.find(`#${p}-tool-bypass-preset`).val()||""},worldbooks:{enabled:a.find(`#${p}-tool-worldbooks-enabled`).is(":checked"),selected:y},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(a.find(`#${p}-tool-max-messages`).val(),10)||5),selectors:f}}},_showExtractionPreview(a,l){if(!j())return;let d=`${p}-${n}`,u=Array.isArray(l.messageEntries)?l.messageEntries:[],f=u.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${u.map(y=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${y.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(y.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(y.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(y.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";a.append(Vt({id:d,title:i,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${b((l.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${l.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(l.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(l.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${f}
        `})),Jt(a,d,{onSave:y=>y()}),a.find(`#${d}-save`).text("\u5173\u95ED"),a.find(`#${d}-cancel`).remove()},bindEvents(a){let l=j();if(!l||!H(a))return;let c=()=>a.find("[data-worldbook-name]:checked").map((f,y)=>String(l(y).data("worldbook-name")||"").trim()).get().filter(Boolean),d=()=>{let f=c(),y=f.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":f.length<=2?f.join("\u3001"):`\u5DF2\u9009 ${f.length} \u9879\uFF1A${f.slice(0,2).join("\u3001")} \u7B49`;a.find(".yyt-worldbook-summary").text(y)},u=()=>{let f=String(this.worldbookFilter||"").trim().toLowerCase(),y=a.find(`#${p}-tool-worldbooks`),x=y.find(".yyt-worldbook-item"),S=0;x.each((P,I)=>{let V=l(I),R=String(V.find("[data-worldbook-name]").data("worldbook-name")||"").toLowerCase(),J=!f||R.includes(f);V.toggleClass("yyt-hidden",!J),J&&(S+=1)}),y.find(".yyt-worldbook-search-empty").remove(),x.length>0&&S===0&&y.append('<div class="yyt-tool-compact-hint yyt-worldbook-empty yyt-worldbook-search-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>')};a.find(`#${p}-tool-worldbook-search`).on("input",f=>{this.worldbookFilter=String(l(f.currentTarget).val()||""),u()}),u(),a.find("[data-worldbook-name]").on("change",()=>{this.draftSelectedWorldbooks=c(),d()}),a.find(`#${p}-tool-output-mode`).on("change",()=>{let y=(a.find(`#${p}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?`${o} \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u8BB0\u5F97\u540C\u65F6\u5F00\u542F\u5168\u5C40\u81EA\u52A8\u5316\u3002`:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";a.find(".yyt-tool-mode-hint").text(y)}),a.find(`#${p}-tool-bypass-enabled`).on("change",f=>{let y=l(f.currentTarget).is(":checked");a.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!y)}),a.find(`#${p}-tool-save, #${p}-tool-save-top`).on("click",()=>{this._saveConfig(a,{silent:!1})}),a.find(`#${p}-tool-reset-template`).on("click",()=>{let f=Ut(this.toolId);f?.promptTemplate&&(a.find(`#${p}-tool-prompt-template`).val(f.promptTemplate),h("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),a.find(`#${p}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let y=await go(this.toolId);!y?.success&&y?.error&&De("warning",y.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(y){h("error",y?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(a)}}),a.find(`#${p}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let y=await fo(this.toolId);if(!y?.success){h("error",y?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(a,y)}catch(y){h("error",y?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}})},_saveConfig(a,l={}){let c=this._getFormData(a),{silent:d=!1}=l,u=Ie(this.toolId,c);return u&&(this.draftSelectedWorldbooks=Array.isArray(c.worldbooks?.selected)?[...c.worldbooks.selected]:[]),u?d||h("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):h("error","\u4FDD\u5B58\u5931\u8D25"),u},destroy(a){!j()||!H(a)||a.find("*").off()},getStyles(){return mo},renderTo(a){if(this.worldbookFilter=this.worldbookFilter||"",!Array.isArray(this.draftSelectedWorldbooks)){let l=K(this.toolId);this.draftSelectedWorldbooks=Array.isArray(l?.worldbooks?.selected)?[...l.worldbooks.selected]:[]}this.worldbookLoadState="loading",a.html(this.render({})),this.bindEvents(a,{}),Promise.resolve(this._loadWorldbooks()).catch(()=>(this.worldbookLoadState="empty",Xs())).then(l=>{this.availableWorldbooks=Array.isArray(l)?l:[],a.html(this.render({})),this.bindEvents(a,{})})}}}var mo,ec,Yt=O(()=>{Le();gt();ur();Ms();ds();vr();mo=`
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

  .yyt-select-multiple {
    min-height: 120px;
  }

  .yyt-worldbook-select {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(18, 22, 30, 0.42);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .yyt-worldbook-summary {
    font-size: 12px;
    color: var(--yyt-text-secondary);
    line-height: 1.6;
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
    gap: 8px;
    max-height: 260px;
    overflow: auto;
    padding-right: 2px;
  }

  .yyt-worldbook-item {
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
  }

  .yyt-worldbook-empty {
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.02);
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
`;ec=ht});var ze,wr=O(()=>{Yt();ze=ht({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var je,Tr=O(()=>{Yt();je=ht({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var We,Sr=O(()=>{Yt();We=ht({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});function pi(s=[],e={}){return s.map(t=>({...t,checked:e?.[t.key]===!0}))}function ho(s){let{id:e,toolId:t,previewDialogId:o,previewTitle:r="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:i=[],heroHint:a="",extractionPlaceholder:l=""}=s;return{id:e,toolId:t,render(){let c=K(this.toolId);if(!c)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let d=c.processor||{},u=c.extraction||{},f=c.runtime?.lastStatus||"idle",y=c.runtime?.lastRunAt?new Date(c.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",x=c.runtime?.lastError||"",S=Array.isArray(u.selectors)?u.selectors.join(`
`):"",P=c.output?.overwrite!==!1,I=pi(n,{[d.direction||n[0]?.key||""]:!0}),V=pi(i,d.options||{});return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${b(c.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${b(c.description||"")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u672C\u5730\u811A\u672C\u5904\u7406</span>
              <span class="yyt-tool-hero-chip">\u5199\u56DE ${P?"\u8986\u76D6":"\u8FFD\u52A0"}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${b(f)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${p}-tool-save-top">
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
              <input type="checkbox" id="${p}-tool-enabled" ${c.enabled!==!1?"checked":""}>
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
                <input type="number" class="yyt-input" id="${p}-tool-max-messages" min="1" max="50" value="${Number(u.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${p}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${b(l)}">${b(S)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002\u624B\u52A8\u6267\u884C\u65F6\u4F1A\u76F4\u63A5\u4F7F\u7528\u8FD9\u91CC\u547D\u4E2D\u7684\u7EAF\u6587\u672C\uFF0C\u4E0D\u4F1A\u518D\u9644\u5E26\u697C\u5C42\u6807\u7B7E\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shuffle"></i>
              <span>\u6267\u884C\u79CD\u7C7B</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              ${I.map(R=>`
                <label class="yyt-local-choice-card">
                  <div class="yyt-checkbox-label">
                    <input type="radio" name="${p}-processor-direction-${this.toolId}" value="${b(R.key)}" ${R.checked?"checked":""}>
                    <span>${b(R.label)}</span>
                  </div>
                  <div class="yyt-local-choice-desc">${b(R.description||"")}</div>
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
              ${V.map(R=>`
                <div class="yyt-local-option-card">
                  <label class="yyt-checkbox-label">
                    <span>${b(R.label)}</span>
                    <input type="checkbox" data-option-key="${b(R.key)}" ${R.checked?"checked":""}>
                  </label>
                  <div class="yyt-tool-compact-hint">${b(R.description||"")}</div>
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
                  <input type="radio" name="${p}-output-mode-${this.toolId}" value="replace" ${P?"checked":""}>
                  <span>\u8986\u76D6\u539F\u5DE5\u5177\u5757</span>
                </div>
                <div class="yyt-local-choice-desc">\u4F18\u5148\u66FF\u6362\u8BE5\u5DE5\u5177\u6B64\u524D\u5199\u5165\u7684\u5185\u5BB9\u3002</div>
              </label>
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${p}-output-mode-${this.toolId}" value="append" ${P?"":"checked"}>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${b(f)}">${b(f)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${b(y)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${c.runtime?.successCount||0} / ${c.runtime?.errorCount||0}</span>
                </div>
                ${x?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${b(x)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${p}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${p}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">${b(a||"\u4FDD\u5B58\u540E\u53EF\u76F4\u63A5\u5BF9\u6700\u8FD1 AI \u6D88\u606F\u505A\u672C\u5730\u6587\u672C\u5904\u7406\u3002")}</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${p}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      `},_getFormData(c){let d=K(this.toolId)||{},u=(c.find(`#${p}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(S=>S.trim()).filter(Boolean),f=c.find(`input[name="${p}-processor-direction-${this.toolId}"]:checked`).val()||n[0]?.key||"",y=c.find(`input[name="${p}-output-mode-${this.toolId}"]:checked`).val()||"replace",x={};return c.find("[data-option-key]").each((S,P)=>{let I=$(P);x[I.data("option-key")]=I.is(":checked")}),{enabled:c.find(`#${p}-tool-enabled`).is(":checked"),extractTags:u,output:{...d.output||{},mode:"local_transform",overwrite:y!=="append",enabled:!0},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(c.find(`#${p}-tool-max-messages`).val(),10)||5),selectors:u},processor:{...d.processor||{},direction:f,options:x},runtime:{...d.runtime||{}}}},_showExtractionPreview(c,d){if(!j())return;let f=`${p}-${o}`,y=Array.isArray(d.messageEntries)?d.messageEntries:[],x=y.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${y.map(S=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${S.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(S.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(S.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(S.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";c.append(Vt({id:f,title:r,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${b((d.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${d.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
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
          ${x}
        `})),Jt(c,f,{onSave:S=>S()}),c.find(`#${f}-save`).text("\u5173\u95ED"),c.find(`#${f}-cancel`).remove()},bindEvents(c){!j()||!H(c)||(c.find(`#${p}-tool-save, #${p}-tool-save-top`).on("click",()=>{this._saveConfig(c,{silent:!1})}),c.find(`#${p}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(c,{silent:!0}))try{let f=await go(this.toolId);!f?.success&&f?.error&&De("warning",f.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(f){h("error",f?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(c)}}),c.find(`#${p}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(c,{silent:!0}))try{let f=await fo(this.toolId);if(!f?.success){h("error",f?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(c,f)}catch(f){h("error",f?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),c.find(`#${p}-tool-reset-template`).on("click",()=>{let u=Ut(this.toolId);u?.promptTemplate&&(c.find(`#${p}-tool-prompt-template`).val(u.promptTemplate),h("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}))},_saveConfig(c,d={}){let u=this._getFormData(c),{silent:f=!1}=d,y=Ie(this.toolId,u);return y?f||h("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):h("error","\u4FDD\u5B58\u5931\u8D25"),y},destroy(c){!j()||!H(c)||c.find("*").off()},getStyles(){return tc},renderTo(c){c.html(this.render({})),this.bindEvents(c,{})}}}var tc,_r=O(()=>{Le();gt();vr();Yt();tc=`${mo}
  .yyt-local-option-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 10px;
  }

  .yyt-local-option-card {
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
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
    padding: 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    display: flex;
    flex-direction: column;
    gap: 6px;
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
`});var Fe,Er=O(()=>{_r();Fe=ho({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]})});var He,Ar=O(()=>{_r();He=ho({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]})});var Pt,Mr=O(()=>{pe();ds();Le();Pt={id:"bypassPanel",render(s){let e=U.getPresetList(),t=U.getDefaultPresetId();return`
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
    `},_renderPresetItem(s,e){let t=rt&&rt[s.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${s.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${b(s.name)}</span>
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
      `;let e=U.getDefaultPresetId()===s.id,t=rt&&rt[s.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${s.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${b(s.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${b(s.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${b(s.content||"")}</textarea>
      </div>
    `},bindEvents(s,e){let t=j();!t||!H(s)||(this._bindPresetListEvents(s,t),this._bindEditorEvents(s,t),this._bindFileEvents(s,t))},_bindPresetListEvents(s,e){s.on("click",".yyt-bypass-preset-item",t=>{if(e(t.target).closest(".yyt-bypass-quick-delete").length)return;let o=e(t.currentTarget).data("presetId");this._selectPreset(s,e,o)}),s.on("click",".yyt-bypass-quick-delete",t=>{t.stopPropagation();let o=e(t.currentTarget).data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=U.deletePreset(o);r.success?(s.find(".yyt-bypass-editor-content").data("presetId")===o&&s.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(s,e),h("success","\u9884\u8BBE\u5DF2\u5220\u9664")):h("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),s.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(s,e)})},_bindEditorEvents(s,e){s.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(s,e)}),s.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(s,e)}),s.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(s,e)}),s.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(s,e)}),s.on("click","#yyt-bypass-add-message",()=>{this._addMessage(s,e)}),s.on("click",".yyt-bypass-delete-message",t=>{let o=e(t.currentTarget).closest(".yyt-bypass-message"),r=o.data("messageId");o.remove()}),s.on("change",".yyt-bypass-message-enabled",t=>{e(t.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(t.currentTarget).is(":checked"))})},_bindFileEvents(s,e){s.find("#yyt-bypass-import").on("click",()=>{s.find("#yyt-bypass-import-file").click()}),s.find("#yyt-bypass-import-file").on("change",async t=>{let o=t.target.files[0];if(o){try{let r=await tt(o),n=U.importPresets(r);h(n.success?"success":"error",n.message),n.success&&this.renderTo(s)}catch(r){h("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(t.target).val("")}}),s.find("#yyt-bypass-export").on("click",()=>{try{let t=U.exportPresets();et(t,`bypass_presets_${Date.now()}.json`),h("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(t){h("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}})},_selectPreset(s,e,t){let o=U.getPreset(t);o&&(s.find(".yyt-bypass-preset-item").removeClass("yyt-active"),s.find(`.yyt-bypass-preset-item[data-preset-id="${t}"]`).addClass("yyt-active"),s.find("#yyt-bypass-editor").html(this._renderEditor(o)))},_createNewPreset(s,e){let t=`bypass_${Date.now()}`,o=U.createPreset({id:t,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});o.success?(this.renderTo(s),this._selectPreset(s,e,t),h("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):h("error",o?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(s,e){let t=s.find(".yyt-bypass-editor-content"),o=t.data("presetId");if(!o)return;let r=t.find(".yyt-bypass-name-input").val().trim(),n=t.find("#yyt-bypass-description").val().trim();if(!r){h("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let i=[];t.find(".yyt-bypass-message").each(function(){let l=e(this);i.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=U.updatePreset(o,{name:r,description:n,messages:i});a.success?(h("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(s,e)):h("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(s,e){let o=s.find(".yyt-bypass-editor-content").data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=U.deletePreset(o);r.success?(this.renderTo(s),h("success","\u9884\u8BBE\u5DF2\u5220\u9664")):h("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(s,e){let o=s.find(".yyt-bypass-editor-content").data("presetId");if(!o)return;let r=`bypass_${Date.now()}`,n=U.duplicatePreset(o,r);n.success?(this.renderTo(s),this._selectPreset(s,e,r),h("success","\u9884\u8BBE\u5DF2\u590D\u5236")):h("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(s,e){let o=s.find(".yyt-bypass-editor-content").data("presetId");o&&(U.setDefaultPresetId(o),s.find(".yyt-bypass-preset-item").removeClass("yyt-default"),s.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-default"),s.find(".yyt-bypass-default-badge").remove(),s.find(`.yyt-bypass-preset-item[data-preset-id="${o}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),h("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(s,e){let t=s.find("#yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};t.append(this._renderMessageItem(o))},_refreshPresetList(s,e){let t=U.getPresetList(),o=U.getDefaultPresetId();s.find(".yyt-bypass-preset-list").html(t.map(r=>this._renderPresetItem(r,r.id===o)).join(""))},destroy(s){!j()||!H(s)||s.find("*").off()},getStyles(){return`
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
    `},renderTo(s){let e=this.render({});s.html(e),this.bindEvents(s,{})}}});var mi={};ie(mi,{SettingsPanel:()=>it,applyTheme:()=>fi,applyUiPreferences:()=>kr,default:()=>oc});function yi(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function gs(){return yi()?.document||document}function gi(s=gs()){return s?.documentElement||document.documentElement}function fi(s,e=gs()){let t=gi(e),o={...sc,...ui[s]||ui["dark-blue"]};Object.entries(o).forEach(([r,n])=>{t.style.setProperty(r,n)}),t.setAttribute("data-yyt-theme",s)}function kr(s={},e=gs()){let t=gi(e),{theme:o="dark-blue",compactMode:r=!1,animationEnabled:n=!0}=s||{};fi(o,e),t.classList.toggle("yyt-compact-mode",!!r),t.classList.toggle("yyt-no-animation",!n)}var sc,ui,it,oc,bo=O(()=>{pe();us();ro();Le();sc={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},ui={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};it={id:"settingsPanel",render(){let s=_e.getSettings(),e=s.debug?.enableDebugLog===!0,t=s.automation?.enabled===!0,o=this._getAutomationRuntime();return`
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">\u5168\u5C40\u504F\u597D\u4E0E\u8FD0\u884C\u7B56\u7565</div>
            <div class="yyt-settings-hero-desc">\u7EDF\u4E00\u7BA1\u7406\u6267\u884C\u5668\u3001\u81EA\u52A8\u5316\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u8BBE\u7F6E\uFF0C\u8BA9\u5DE5\u5177\u94FE\u884C\u4E3A\u4E0E\u754C\u9762\u4F53\u9A8C\u4FDD\u6301\u4E00\u81F4\u3002</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${t?"is-on":"is-off"}">\u81EA\u52A8\u5316 ${t?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip ${e?"is-on":"is-off"}">\u8C03\u8BD5 ${e?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip is-neutral">\u4E3B\u9898 ${s.ui?.theme||"dark-blue"}</span>
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
          ${this._renderExecutorTab(s.executor)}
          ${this._renderAutomationTab(s.automation,o)}
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
    `},_renderAutomationTab(s={},e=null){let t=s.enabled===!0,o=Array.isArray(e?.recentTransactions)?e.recentTransactions.slice().reverse():[],r=o.length>0?o.map(n=>`
          <div class="yyt-settings-runtime-item">
            <div class="yyt-settings-runtime-meta">
              <span>${n?.sourceEvent||"UNKNOWN_EVENT"}</span>
              <span>${n?.phase||"unknown"}</span>
              <span>${n?.messageId||"no_message_id"}</span>
            </div>
            <div class="yyt-settings-runtime-main">${n?.verdict||n?.error||n?.generationKey||"\u65E0\u989D\u5916\u4FE1\u606F"}</div>
          </div>
        `).join(""):'<div class="yyt-form-hint">\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002</div>';return`
      <div class="yyt-settings-tab-content" data-tab="automation">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u81EA\u52A8\u89E6\u53D1\u603B\u5F00\u5173</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-automationEnabled"
                     ${s.enabled?"checked":""}>
              <span>\u542F\u7528\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1</span>
            </label>
            <div class="yyt-form-hint">\u8FD9\u91CC\u53EA\u4FDD\u7559\u4E00\u4E2A\u5168\u5C40\u5F00\u5173\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u5904\u4E8E\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u7684\u5DE5\u5177\u90FD\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\u3002</div>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationSettleMs"
                     value="${s.settleMs||1200}" min="0" max="10000" step="100">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationCooldownMs"
                     value="${s.cooldownMs||5e3}" min="0" max="60000" step="100">
            </div>
          </div>
          <div class="yyt-form-hint">\u5F53\u524D\u72B6\u6001\uFF1A${t?"\u5DF2\u542F\u7528":"\u672A\u542F\u7528"}\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u5DE5\u5177\u90FD\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u81EA\u52A8\u5316\u8BCA\u65AD</div>
          <div class="yyt-settings-runtime-grid">
            <div class="yyt-settings-runtime-chip ${e?.enabled?"is-on":"is-off"}">\u670D\u52A1 ${e?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528"}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u5F85\u5904\u7406 ${e?.pendingTimerCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u6392\u961F\u69FD\u4F4D ${e?.queuedSlotCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u4E8B\u52A1 ${o.length}</div>
          </div>
          <div class="yyt-form-hint">\u82E5\u81EA\u52A8\u89E6\u53D1\u5931\u8D25\uFF0C\u4F18\u5148\u770B\u6700\u8FD1\u4E8B\u52A1\u7684 verdict\uFF0C\u4F8B\u5982 <code>automation_disabled</code>\u3001<code>no_auto_tools</code>\u3001<code>assistant_message_not_found</code>\u3002</div>
          <div class="yyt-settings-runtime-list">${r}</div>
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

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u6A21\u677F\u5B8F\u8BF4\u660E</div>
          <div class="yyt-form-hint">\u5DE5\u5177\u6A21\u677F\u91CC\u53EF\u76F4\u63A5\u4F7F\u7528\u4E0B\u9762\u8FD9\u4E9B\u5B8F\u3002\u4E16\u754C\u4E66\u5185\u5BB9\u53EA\u6709\u5728\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\u624D\u4F1A\u6CE8\u5165\u3002</div>
          <div class="yyt-settings-macro-list">
            ${this._renderMacroList()}
          </div>
        </div>
      </div>
    `},_renderMacroList(){return Je.getAvailableVariables().map(s=>`
        <div class="yyt-settings-macro-item">
          <code>${s.name}</code>
          <span>${s.description}</span>
        </div>
      `).join("")},bindEvents(s){let e=j();!e||!H(s)||(s.find(".yyt-settings-tab").on("click",t=>{let o=e(t.currentTarget).data("tab");s.find(".yyt-settings-tab").removeClass("yyt-active"),e(t.currentTarget).addClass("yyt-active"),s.find(".yyt-settings-tab-content").removeClass("yyt-active"),s.find(`.yyt-settings-tab-content[data-tab="${o}"]`).addClass("yyt-active")}),s.find("#yyt-settings-save").on("click",()=>{this._saveSettings(s)}),s.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(_e.resetSettings(),kr(ps.ui,gs()),this.renderTo(s),h("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(s){let e={executor:{maxConcurrent:parseInt(s.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(s.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(s.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(s.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:s.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{enabled:s.find("#yyt-setting-automationEnabled").is(":checked"),settleMs:parseInt(s.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(s.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:_e.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:s.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:s.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:s.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:s.find("#yyt-setting-theme").val()||"dark-blue",compactMode:s.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:s.find("#yyt-setting-animationEnabled").is(":checked")}};_e.saveSettings(e),kr(e.ui,gs()),h("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return yi()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(s){!j()||!H(s)||s.find("*").off()},getStyles(){return`
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

      .yyt-settings-macro-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 12px;
      }

      .yyt-settings-macro-item {
        display: grid;
        grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
        gap: 12px;
        align-items: start;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.02);
      }

      .yyt-settings-macro-item code {
        color: var(--yyt-accent);
        word-break: break-word;
      }

      .yyt-settings-macro-item span {
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.6;
      }

      .yyt-settings-runtime-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 12px;
      }

      .yyt-settings-runtime-chip {
        display: inline-flex;
        align-items: center;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.04);
        color: var(--yyt-text-secondary);
      }

      .yyt-settings-runtime-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.35);
        background: rgba(74, 222, 128, 0.08);
      }

      .yyt-settings-runtime-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.35);
        background: rgba(248, 113, 113, 0.08);
      }

      .yyt-settings-runtime-chip.is-neutral {
        color: var(--yyt-text-secondary);
      }

      .yyt-settings-runtime-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 12px;
      }

      .yyt-settings-runtime-item {
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.02);
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .yyt-settings-runtime-meta {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        font-size: 11px;
        color: var(--yyt-text-secondary);
      }

      .yyt-settings-runtime-main {
        font-size: 12px;
        color: var(--yyt-text);
        line-height: 1.6;
        word-break: break-word;
      }
    `},renderTo(s){s.html(this.render({})),this.bindEvents(s,{})}},oc=it});var Ei={};ie(Ei,{ApiPresetPanel:()=>Ne,BypassPanel:()=>Pt,EscapeTransformToolPanel:()=>Fe,PunctuationTransformToolPanel:()=>He,RegexExtractPanel:()=>Be,SCRIPT_ID:()=>p,SettingsPanel:()=>it,StatusBlockPanel:()=>je,SummaryToolPanel:()=>ze,ToolManagePanel:()=>Ue,UIManager:()=>Xt,YouyouReviewPanel:()=>We,bindDialogEvents:()=>Jt,createDialogHtml:()=>Vt,default:()=>rc,downloadJson:()=>et,escapeHtml:()=>b,fillFormWithConfig:()=>xt,getAllStyles:()=>_i,getFormApiConfig:()=>pt,getJQuery:()=>j,initUI:()=>fs,isContainerValid:()=>H,readFileContent:()=>tt,registerComponents:()=>Kt,renderApiPanel:()=>xo,renderBypassPanel:()=>Ti,renderEscapeTransformToolPanel:()=>vi,renderPunctuationTransformToolPanel:()=>wi,renderRegexPanel:()=>vo,renderSettingsPanel:()=>Si,renderStatusBlockPanel:()=>bi,renderSummaryToolPanel:()=>hi,renderToolPanel:()=>wo,renderYouyouReviewPanel:()=>xi,resetJQueryCache:()=>ia,showToast:()=>h,showTopNotice:()=>De,uiManager:()=>Q});function Kt(){Q.register(Ne.id,Ne),Q.register(Be.id,Be),Q.register(Ue.id,Ue),Q.register(ze.id,ze),Q.register(je.id,je),Q.register(We.id,We),Q.register(Fe.id,Fe),Q.register(He.id,He),Q.register(Pt.id,Pt),Q.register(it.id,it),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function fs(s={}){let{autoInjectStyles:e=!0,targetDocument:t,...o}=s;Q.init(o),Kt(),e&&Q.injectStyles(t),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Xe(s,e,t={}){Q.render(s,e,t)}function xo(s){Xe(Ne.id,s)}function vo(s){Xe(Be.id,s)}function wo(s){Xe(Ue.id,s)}function hi(s){Xe(ze.id,s)}function bi(s){Xe(je.id,s)}function xi(s){Xe(We.id,s)}function vi(s){Xe(Fe.id,s)}function wi(s){Xe(He.id,s)}function Ti(s){Xe(Pt.id,s)}function Si(s){Xe(it.id,s)}function _i(){return Q.getAllStyles()}var rc,Cr=O(()=>{Io();Yo();Qo();nr();wr();Tr();Sr();Er();Ar();Mr();bo();Le();Io();Yo();Qo();nr();wr();Tr();Sr();Er();Ar();Mr();bo();rc={uiManager:Q,ApiPresetPanel:Ne,RegexExtractPanel:Be,ToolManagePanel:Ue,SummaryToolPanel:ze,StatusBlockPanel:je,YouyouReviewPanel:We,EscapeTransformToolPanel:Fe,PunctuationTransformToolPanel:He,BypassPanel:Pt,SettingsPanel:it,registerComponents:Kt,initUI:fs,renderApiPanel:xo,renderRegexPanel:vo,renderToolPanel:wo,renderSummaryToolPanel:hi,renderStatusBlockPanel:bi,renderYouyouReviewPanel:xi,renderEscapeTransformToolPanel:vi,renderPunctuationTransformToolPanel:wi,renderBypassPanel:Ti,renderSettingsPanel:Si,getAllStyles:_i}});var Oi={};ie(Oi,{ApiPresetPanel:()=>Ne,EscapeTransformToolPanel:()=>Fe,PunctuationTransformToolPanel:()=>He,RegexExtractPanel:()=>Be,SCRIPT_ID:()=>p,StatusBlockPanel:()=>je,SummaryToolPanel:()=>ze,ToolManagePanel:()=>Ue,YouyouReviewPanel:()=>We,default:()=>nc,escapeHtml:()=>b,fillFormWithConfig:()=>xt,getCurrentTab:()=>$i,getFormApiConfig:()=>pt,getJQuery:()=>j,getRegexStyles:()=>Pi,getStyles:()=>Ci,getToolStyles:()=>Ii,initUI:()=>fs,isContainerValid:()=>H,registerComponents:()=>Kt,render:()=>Ai,renderRegex:()=>Mi,renderTool:()=>ki,setCurrentTab:()=>Ri,showToast:()=>h,uiManager:()=>Q});function Pr(s,e){let t=j();return t?s?typeof s=="string"?t(s):s?.jquery?s:t(s):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function Ai(s){if(ms=Pr(s,ms),!ms||!ms.length){console.error("[YouYouToolkit] Container not found or invalid");return}xo(ms)}function Mi(s){if(hs=Pr(s,hs),!hs||!hs.length){console.error("[YouYouToolkit] Regex container not found");return}vo(hs)}function ki(s){if(bs=Pr(s,bs),!bs||!bs.length){console.error("[YouYouToolkit] Tool container not found");return}wo(bs)}function Ci(){return Ne.getStyles()}function Pi(){return Be.getStyles()}function Ii(){return[Ue.getStyles(),ze.getStyles(),je.getStyles(),We.getStyles(),Fe.getStyles(),He.getStyles()].join(`
`)}function $i(){return Q.getCurrentTab()}function Ri(s){Q.switchTab(s)}var ms,hs,bs,nc,Di=O(()=>{Cr();ms=null,hs=null,bs=null;nc={render:Ai,renderRegex:Mi,renderTool:ki,getStyles:Ci,getRegexStyles:Pi,getToolStyles:Ii,getCurrentTab:$i,setCurrentTab:Ri,uiManager:Q,ApiPresetPanel:Ne,RegexExtractPanel:Be,ToolManagePanel:Ue,SummaryToolPanel:ze,StatusBlockPanel:je,YouyouReviewPanel:We,EscapeTransformToolPanel:Fe,PunctuationTransformToolPanel:He,registerComponents:Kt,initUI:fs,SCRIPT_ID:p,escapeHtml:b,showToast:h,getJQuery:j,isContainerValid:H,getFormApiConfig:pt,fillFormWithConfig:xt}});var Li={};ie(Li,{DEFAULT_PROMPT_SEGMENTS:()=>To,PromptEditor:()=>So,default:()=>yc,getPromptEditorStyles:()=>cc,messagesToSegments:()=>uc,segmentsToMessages:()=>pc,validatePromptSegments:()=>dc});function cc(){return`
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
  `}function dc(s){let e=[];return Array.isArray(s)?(s.forEach((t,o)=>{t.id||e.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11ID`),t.role||e.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(t.role)||e.push(`\u6BB5\u843D ${o+1} \u7684role\u503C\u65E0\u6548: ${t.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function pc(s){return s.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function uc(s){return Array.isArray(s)?s.map((e,t)=>({id:`segment_${t}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...To]}var ic,ac,lc,To,So,yc,Ni=O(()=>{ic="youyou_toolkit_prompt_editor",ac={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},lc={system:"fa-server",ai:"fa-robot",user:"fa-user"},To=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],So=class{constructor(e={}){this.containerId=e.containerId||ic,this.segments=e.segments||[...To],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...To],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let t=ac[e.type]||e.type,o=lc[e.type]||"fa-file",r=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,i=r?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",a=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let t=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(t)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let t=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(e.currentTarget).val();this.updateSegmentMeta(t,{role:o})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let t=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(e.currentTarget).val();this.updateSegmentMeta(t,{mainSlot:o})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let t=`segment_${Date.now()}`,o=e||{id:t,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};o.id||(o.id=t),this.segments.push(o),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let t=this.segments.findIndex(r=>r.id===e);if(t===-1)return;if(this.segments[t].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(t,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,t){let o=this.segments.find(r=>r.id===e);o&&(Object.assign(o,t),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=t=>{let o=t.target.files[0];if(!o)return;let r=new FileReader;r.onload=n=>{try{let i=JSON.parse(n.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},r.readAsText(o)},e.click()}exportPrompt(){let e=this.getSegments(),t=JSON.stringify(e,null,2),o=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(o),n=document.createElement("a");n.href=r,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};yc=So});var Ir={};ie(Ir,{WindowManager:()=>_o,closeWindow:()=>hc,createWindow:()=>mc,windowManager:()=>Ae});function fc(){if(Ae.stylesInjected)return;Ae.stylesInjected=!0;let s=`
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
  `,e=document.createElement("style");e.id=gc+"_styles",e.textContent=s,(document.head||document.documentElement).appendChild(e)}function mc(s){let{id:e,title:t="\u7A97\u53E3",content:o="",width:r=900,height:n=700,modal:i=!1,resizable:a=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:f}=s;fc();let y=window.jQuery||window.parent?.jQuery;if(!y)return console.error("[WindowManager] jQuery not available"),null;if(Ae.isOpen(e))return Ae.bringToFront(e),Ae.getWindow(e);let x=window.innerWidth||1200,S=window.innerHeight||800,P=x<=1100,I=null,V=!1;d&&(I=Ae.getState(e),I&&!P&&(V=!0));let R,J;V&&I.width&&I.height?(R=Math.max(400,Math.min(I.width,x-40)),J=Math.max(300,Math.min(I.height,S-40))):(R=Math.max(400,Math.min(r,x-40)),J=Math.max(300,Math.min(n,S-40)));let le=Math.max(20,Math.min((x-R)/2,x-R-20)),de=Math.max(20,Math.min((S-J)/2,S-J-20)),_=l&&!P,D=`
    <div class="yyt-window" id="${e}" style="left:${le}px; top:${de}px; width:${R}px; height:${J}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${bc(t)}</span>
        </div>
        <div class="yyt-window-controls">
          ${_?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,N=null;i&&(N=y(`<div class="yyt-window-overlay" data-for="${e}"></div>`),y(document.body).append(N));let k=y(D);y(document.body).append(k),Ae.register(e,k),k.on("mousedown",()=>Ae.bringToFront(e));let Y=!1,ae={left:le,top:de,width:R,height:J},se=()=>{ae={left:parseInt(k.css("left")),top:parseInt(k.css("top")),width:k.width(),height:k.height()},k.addClass("maximized"),k.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),Y=!0},W=()=>{k.removeClass("maximized"),k.css({left:ae.left+"px",top:ae.top+"px",width:ae.width+"px",height:ae.height+"px"}),k.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),Y=!1};k.find(".yyt-window-btn.maximize").on("click",()=>{Y?W():se()}),(P&&l||V&&I.isMaximized&&l||c&&l)&&se(),k.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let oe={width:Y?ae.width:k.width(),height:Y?ae.height:k.height(),isMaximized:Y};Ae.saveState(e,oe)}u&&u(),N&&N.remove(),k.remove(),Ae.unregister(e),y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),N&&N.on("click",oe=>{oe.target,N[0]});let ke=!1,Re,Ye,ve,Qe;if(k.find(".yyt-window-header").on("mousedown",oe=>{y(oe.target).closest(".yyt-window-controls").length||Y||(ke=!0,Re=oe.clientX,Ye=oe.clientY,ve=parseInt(k.css("left")),Qe=parseInt(k.css("top")),y(document.body).css("user-select","none"))}),y(document).on("mousemove.yytWindowDrag"+e,oe=>{if(!ke)return;let re=oe.clientX-Re,at=oe.clientY-Ye;k.css({left:Math.max(0,ve+re)+"px",top:Math.max(0,Qe+at)+"px"})}),y(document).on("mouseup.yytWindowDrag"+e,()=>{ke&&(ke=!1,y(document.body).css("user-select",""))}),a){let oe=!1,re="",at,Ke,q,g,m,w;k.find(".yyt-window-resize-handle").on("mousedown",function(T){Y||(oe=!0,re="",y(this).hasClass("se")?re="se":y(this).hasClass("e")?re="e":y(this).hasClass("s")?re="s":y(this).hasClass("w")?re="w":y(this).hasClass("n")?re="n":y(this).hasClass("nw")?re="nw":y(this).hasClass("ne")?re="ne":y(this).hasClass("sw")&&(re="sw"),at=T.clientX,Ke=T.clientY,q=k.width(),g=k.height(),m=parseInt(k.css("left")),w=parseInt(k.css("top")),y(document.body).css("user-select","none"),T.stopPropagation())}),y(document).on("mousemove.yytWindowResize"+e,T=>{if(!oe)return;let A=T.clientX-at,z=T.clientY-Ke,X=400,C=300,L=q,ne=g,ce=m,fe=w;if(re.includes("e")&&(L=Math.max(X,q+A)),re.includes("s")&&(ne=Math.max(C,g+z)),re.includes("w")){let we=q-A;we>=X&&(L=we,ce=m+A)}if(re.includes("n")){let we=g-z;we>=C&&(ne=we,fe=w+z)}k.css({width:L+"px",height:ne+"px",left:ce+"px",top:fe+"px"})}),y(document).on("mouseup.yytWindowResize"+e,()=>{oe&&(oe=!1,y(document.body).css("user-select",""))})}return k.on("remove",()=>{y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),f&&setTimeout(()=>f(k),50),k}function hc(s){let e=Ae.getWindow(s);if(e){let t=window.jQuery||window.parent?.jQuery;t&&(t(`.yyt-window-overlay[data-for="${s}"]`).remove(),t(document).off(".yytWindowDrag"+s),t(document).off(".yytWindowResize"+s)),e.remove(),Ae.unregister(s)}}function bc(s){return typeof s!="string"?"":s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var gc,Bi,_o,Ae,$r=O(()=>{Oe();gc="youyou_toolkit_window_manager",Bi="window_states",_o=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,t){this.topZIndex++,this.windows.set(e,{$el:t,zIndex:this.topZIndex}),t.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let t=this.windows.get(e);t&&(this.topZIndex++,t.zIndex=this.topZIndex,t.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,t)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,t){let o=this.loadStates();o[e]={...t,updatedAt:Date.now()},qt.set(Bi,o)}loadStates(){return qt.get(Bi)||{}}getState(e){return this.loadStates()[e]||null}},Ae=new _o});var Wi={};ie(Wi,{TX_PHASE:()=>$e,ToolAutomationService:()=>Ao,Transaction:()=>Eo,default:()=>Ac,toolAutomationService:()=>ji});function Me(s){return s==null?"":String(s).trim()}function xc(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Ui(){return xc()?.SillyTavern||null}function vc(s){return s?.eventSource||null}function wc(s){return s?.eventTypes||{}}function zi(s){let e=s?.getContext?.()||null;return Me(e?.chatId??e?.chat_id??s?.chatId??s?.chat_id??s?.chat_filename??s?.this_chid??"chat_default")||"chat_default"}function Rr(s){if(!s)return"";let e=String(s).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function Tc(s){let e=String(s||"");if(e.length===0)return"0";let t=5381,o=Math.min(e.length,2e3);for(let r=0;r<o;r++)t=(t<<5)+t+e.charCodeAt(r)|0;return(t>>>0).toString(36)}function Sc(){let s=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${s}_${e}`}function Ec(s){return _c.has(Rr(s))}var $e,_c,Eo,Ao,ji,Ac,Fi=O(()=>{us();pe();gt();lo();Js();$e=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),_c=new Set(["MESSAGE_UPDATED","MESSAGE_SWIPED","GENERATION_AFTER_COMMANDS","GENERATION_ENDED"]);Eo=class{constructor({chatId:e,messageId:t,swipeId:o,sourceEvent:r,generationKey:n}){this.traceId=Sc(),this.chatId=e||"",this.messageId=t||"",this.swipeId=o||"",this.sourceEvent=r||"",this.generationKey=n||"",this.phase=$e.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,t={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,t),this}toSnapshot(){return{...this}}},Ao=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._completedGenerationKeys=new Map,this._slotQueues=new Map,this._currentChatId="",this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30}setDebugMode(e){this.debugMode=e===!0}init(){this.stop();let e=Ui();if(!e)return this._log("\u521D\u59CB\u5316\u5931\u8D25: \u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)"),!1;this._currentChatId=zi(e);let t=vc(e),o=wc(e),r=typeof t?.on=="function"?t.on.bind(t):typeof t?.addListener=="function"?t.addListener.bind(t):null,n=typeof t?.off=="function"?t.off.bind(t):typeof t?.removeListener=="function"?t.removeListener.bind(t):null;if(!r||!n)return this._log("\u521D\u59CB\u5316\u5931\u8D25: \u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5"),!1;this._log("\u5BBF\u4E3B eventTypes \u6620\u5C04:",JSON.stringify(o,null,2));let i=(l,c)=>{if(!l||typeof c!="function")return;let d=l;r(d,c),this._stopCallbacks.push(()=>{try{n(d,c)}catch(u){this._log("\u53D6\u6D88\u4E8B\u4EF6\u5931\u8D25",d,u)}}),this._log(`\u5DF2\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${d}" (\u5F52\u4E00\u5316: ${Rr(d)})`)},a=(l,...c)=>{let d=Rr(l),{messageId:u,swipeId:f}=this._extractIdentitiesFromArgs(c);this._log(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${l}" \u2192 "${d}"`,{messageId:u,swipeId:f,argCount:c.length}),this._checkEnabled()&&(u?this._scheduleMessageProcessing(u,f,{settleMs:this._getSettleMs(),sourceEvent:d}):Ec(d)?this._scheduleCurrentAssistantProcessing({settleMs:this._getSettleMs(),sourceEvent:d}):this._log(`\u4E8B\u4EF6 "${d}" \u65E0 messageId \u4E14\u975E same-slot \u7C7B\u578B\uFF0C\u8DF3\u8FC7`))};return i(o.MESSAGE_SENT||"message_sent",()=>{this._log("MESSAGE_SENT \u2192 \u91CD\u7F6E extra analysis \u72B6\u6001"),this._isDuringExtraAnalysis=!1,this._pendingTimers.forEach(l=>clearTimeout(l)),this._pendingTimers.clear()}),i(o.MESSAGE_RECEIVED||"message_received",(...l)=>{a(o.MESSAGE_RECEIVED||"message_received",...l)}),i(o.MESSAGE_UPDATED||"message_updated",(...l)=>{a(o.MESSAGE_UPDATED||"message_updated",...l)}),i(o.MESSAGE_SWIPED||"message_swiped",(...l)=>{a(o.MESSAGE_SWIPED||"message_swiped",...l)}),i(o.GENERATION_AFTER_COMMANDS||"generation_after_commands",(...l)=>{a(o.GENERATION_AFTER_COMMANDS||"generation_after_commands",...l)}),i(o.GENERATION_ENDED||"generation_ended",(...l)=>{a(o.GENERATION_ENDED||"generation_ended",...l)}),i(o.CHAT_CHANGED||"chat_changed",()=>{this._resetForChatChange()}),i(o.MESSAGE_DELETED||"message_deleted",l=>{this._clearMessageState(Me(l))}),this._stopCallbacks.push(M.on(E.SETTINGS_UPDATED,()=>{let l=this._enabled;this._enabled=this._evaluateEnabled(),l!==this._enabled&&this._log(`\u81EA\u52A8\u5316\u72B6\u6001\u53D8\u66F4: ${l} \u2192 ${this._enabled}`)})),this._enabled=this._evaluateEnabled(),this._enabledCheckedOnce=!1,this._log("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{enabled:this._enabled,chatId:this._currentChatId}),!0}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(t){this._log("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",t)}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._enabled=!1,this._enabledCheckedOnce=!1}isEnabled(){return this._enabled}getRuntimeSnapshot(){return this._pruneCompletedKeys(),{currentChatId:this._currentChatId,enabled:this._enabled,isDuringExtraAnalysis:this._isDuringExtraAnalysis,isProcessingMessage:this._isProcessingMessage,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,completedGenerationKeyCount:this._completedGenerationKeys.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let t=await lr({messageId:"",swipeId:"",runSource:"AUTO"}),o=Me(t?.sourceMessageId||t?.messageId);return o?this.processAssistantMessage(o,{force:e.force===!0,swipeId:Me(t?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:t=!1,swipeId:o="",sourceEvent:r="AUTO"}={}){let n=new Eo({chatId:this._currentChatId,messageId:e,swipeId:o,sourceEvent:r});try{if(!e)return this._skipTransaction(n,"missing_message_id");if(!this._checkEnabled()&&!t)return this._skipTransaction(n,"automation_disabled");if(this._isDuringExtraAnalysis&&!t&&r!=="MESSAGE_SWIPED"&&!r.includes("GENERATION"))return this._skipTransaction(n,"during_extra_analysis");n.transition($e.CONFIRMED);let i=await lr({messageId:e,swipeId:o,runSource:"AUTO"}),a=i?.targetAssistantMessage||null;if(!a||!i?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(a.content||a.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition($e.CONTEXT_BUILT);let c=Tc(l),d=`${Me(i.sourceMessageId)}::${c}`;if(n.generationKey=d,!t&&this._hasCompletedGeneration(d))return this._skipTransaction(n,"duplicate_generation",{generationKey:d});let u=nt.filterAutoPostResponseTools(ls());if(!u.length)return this._skipTransaction(n,"no_auto_tools");let f=`${Me(i.sourceMessageId)}::${Me(i.sourceSwipeId||o)}`;return this._enqueueSlot(f,async()=>{if(this._hasCompletedGeneration(d)&&!t)return this._skipTransaction(n,"duplicate_generation_after_queue",{generationKey:d});this._isProcessingMessage=!0,this._isDuringExtraAnalysis=!0,n.transition($e.REQUEST_STARTED);try{let y=[],x=!1;for(let I of u){let V={...i,input:{...i.input||{},lastAiMessage:i.lastAiMessage,assistantBaseText:i.assistantBaseText}},R=await nt.runToolPostResponse(I,V);y.push(R),(R?.writebackState||R?.output)&&(x=!0)}n.transition($e.REQUEST_FINISHED,{toolResults:y}),x&&(n.transition($e.WRITEBACK_STARTED),n.writebackState={messageId:i.sourceMessageId,swipeId:i.sourceSwipeId,hasOutput:!0}),this._markGenerationCompleted(d);let S=y.every(I=>I?.success!==!1);S&&n.transition($e.WRITEBACK_COMMITTED);let P=S?$e.REFRESH_CONFIRMED:$e.FAILED;return n.transition(P,{verdict:S?"success":"partial_failure"}),this._recordTransaction(n),{success:S,traceId:n.traceId,generationKey:d,sourceEvent:r,messageId:i.sourceMessageId||e,phase:n.phase,results:y}}finally{this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1}})}catch(i){return n.transition($e.FAILED,{error:i?.message||String(i)}),this._recordTransaction(n),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._log("processAssistantMessage \u5F02\u5E38",i),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let t="",o="";for(let r of e)if(r!=null){if(typeof r=="number"&&Number.isFinite(r)&&!t){t=Me(r);continue}if(typeof r=="string"){let n=Me(r);!t&&/^\d+$/.test(n)&&(t=n);continue}typeof r=="object"&&(t||(t=Me(r.messageId??r.message_id??r.id??r.mesid??r.chat_index??r.message?.messageId??r.message?.message_id??r.message?.id??r.message?.mesid??r.message?.chat_index??r.data?.messageId??r.data?.message_id??r.data?.id??r.target?.messageId??r.target?.message_id??r.target?.id)),o||(o=Me(r.swipeId??r.swipe_id??r.swipe??r.swipeIndex??r.currentSwipe??r.message?.swipeId??r.message?.swipe_id??r.message?.swipe??r.data?.swipeId??r.data?.swipe_id??r.data?.swipe??r.target?.swipeId??r.target?.swipe_id??r.target?.swipe)))}return{messageId:t,swipeId:o}}_scheduleMessageProcessing(e,t="",o={}){let r=o.settleMs??this._getSettleMs(),n=`msg::${Me(e)}::${Me(t)}`,i=this._pendingTimers.get(n);i&&clearTimeout(i);let a=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:t,sourceEvent:o.sourceEvent||"AUTO"}).catch(l=>{this._log("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,r));this._pendingTimers.set(n,a),this._log("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:r,sourceEvent:o.sourceEvent})}_scheduleCurrentAssistantProcessing(e={}){let t=e.settleMs??this._getSettleMs(),o=e.sourceEvent||"CURRENT_ASSISTANT_FALLBACK",r=`current::${o}`,n=this._pendingTimers.get(r);n&&clearTimeout(n);let i=setTimeout(()=>{this._pendingTimers.delete(r),this.processCurrentAssistantMessage({sourceEvent:o}).catch(a=>{this._log("\u5F53\u524D assistant \u5904\u7406\u5931\u8D25",a)})},Math.max(0,t));this._pendingTimers.set(r,i),this._log("\u5DF2\u8C03\u5EA6\u5F53\u524D assistant \u5904\u7406",{timerKey:r,settleMs:t,sourceEvent:o})}_hasCompletedGeneration(e){if(!e)return!1;this._pruneCompletedKeys();let t=this._completedGenerationKeys.get(e);return t?Date.now()-t<this._getDedupeWindowMs():!1}_markGenerationCompleted(e){e&&(this._completedGenerationKeys.set(e,Date.now()),this._pruneCompletedKeys())}_pruneCompletedKeys(){let e=Date.now()-this._getDedupeWindowMs();for(let[t,o]of this._completedGenerationKeys)(!Number.isFinite(o)||o<e)&&this._completedGenerationKeys.delete(t)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),this._log(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,t,o={}){return e.transition($e.SKIPPED,{verdict:t,...o}),this._recordTransaction(e),{success:!1,skipped:!0,reason:t,traceId:e.traceId,...o}}_enqueueSlot(e,t){let r=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(t).finally(()=>{this._slotQueues.get(e)===r&&this._slotQueues.delete(e)});return this._slotQueues.set(e,r),r}_resetForChatChange(){let e=Ui(),t=zi(e);this._log("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:t}),this._currentChatId=t,this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1}_clearMessageState(e){if(e){for(let[t,o]of this._pendingTimers)(t.includes(`::${e}::`)||t.startsWith(`msg::${e}::`))&&(clearTimeout(o),this._pendingTimers.delete(t));for(let t of this._completedGenerationKeys.keys())t.startsWith(`${e}::`)&&this._completedGenerationKeys.delete(t)}}_evaluateEnabled(){return this._getAutomationSettings().enabled===!0}_checkEnabled(){if(this._enabled)return!0;if(!this._enabledCheckedOnce){this._enabledCheckedOnce=!0;let e=this._getAutomationSettings();this._log("\u26A0 \u81EA\u52A8\u5316\u672A\u542F\u7528\uFF0C\u9996\u6B21\u8BCA\u65AD:",{"automation.enabled":e.enabled,"\u5B8C\u6574 automation \u8BBE\u7F6E":e,\u63D0\u793A:"\u8BF7\u786E\u4FDD settings.automation.enabled === true"})}return!1}_getAutomationSettings(){let e=_e.getSettings()?.automation||{},t=Number.isFinite(e.settleMs)?e.settleMs:800;return{enabled:e.enabled===!0,settleMs:t,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(1200,t+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}_log(...e){(this.debugMode||_e.getDebugSettings?.()?.enableDebugLog)&&console.log("[ToolAutomation]",...e)}},ji=new Ao,Ac=ji});function Hi(s,e={}){let{constants:t,topLevelWindow:o,modules:r}=s,{SCRIPT_ID:n,SCRIPT_VERSION:i,MENU_ITEM_ID:a,MENU_CONTAINER_ID:l}=t,c=null,d=!1,u=new Map,f={storageModule:()=>Promise.resolve().then(()=>(Co(),ko)),uiComponentsModule:()=>Promise.resolve().then(()=>(Di(),Oi)),promptEditorModule:()=>Promise.resolve().then(()=>(Ni(),Li)),toolExecutorModule:()=>Promise.resolve().then(()=>(uo(),po)),windowManagerModule:()=>Promise.resolve().then(()=>($r(),Ir))};function y(..._){console.log(`[${n}]`,..._)}function x(..._){console.error(`[${n}]`,..._)}async function S(_){return!_||!f[_]?null:r[_]?r[_]:(u.has(_)||u.set(_,(async()=>{try{let D=await f[_]();return r[_]=D,D}catch(D){throw u.delete(_),D}})()),u.get(_))}async function P(){return c||(c=(async()=>{try{return r.storageModule=await Promise.resolve().then(()=>(Co(),ko)),r.apiConnectionModule=await Promise.resolve().then(()=>(ws(),Hr)),r.presetManagerModule=await Promise.resolve().then(()=>(Ms(),Gr)),r.uiModule=await Promise.resolve().then(()=>(Cr(),Ei)),r.regexExtractorModule=await Promise.resolve().then(()=>(Bs(),an)),r.toolManagerModule=await Promise.resolve().then(()=>(qs(),fn)),r.toolExecutorModule=await Promise.resolve().then(()=>(uo(),po)),r.windowManagerModule=await Promise.resolve().then(()=>($r(),Ir)),r.toolRegistryModule=await Promise.resolve().then(()=>(gt(),On)),r.settingsServiceModule=await Promise.resolve().then(()=>(us(),qn)),r.bypassManagerModule=await Promise.resolve().then(()=>(ds(),Kn)),r.variableResolverModule=await Promise.resolve().then(()=>(ro(),Xn)),r.contextInjectorModule=await Promise.resolve().then(()=>(so(),Vn)),r.toolPromptServiceModule=await Promise.resolve().then(()=>(hr(),Zn)),r.toolOutputServiceModule=await Promise.resolve().then(()=>(lo(),ti)),r.toolAutomationServiceModule=await Promise.resolve().then(()=>(Fi(),Wi)),r.toolOutputServiceModule?.toolOutputService&&r.apiConnectionModule&&r.toolOutputServiceModule.toolOutputService.setApiConnection(r.apiConnectionModule),!0}catch(_){return c=null,console.warn(`[${n}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,_),!1}})(),c)}function I(){return`
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
    `}async function V(){let _=`${n}-styles`,D=o.document||document;if(D.getElementById(_))return;let N="",k=[];try{k.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{k.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}k.push("./styles/main.css");for(let ae of[...new Set(k.filter(Boolean))])try{let se=await fetch(ae);if(se.ok){N=await se.text();break}}catch{}N||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),N=I());let Y=D.createElement("style");Y.id=_,Y.textContent=N,(D.head||D.documentElement).appendChild(Y),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function R(){let _=o.document||document;if(r.uiModule?.getAllStyles){let D=`${n}-ui-styles`;if(!_.getElementById(D)){let N=_.createElement("style");N.id=D,N.textContent=r.uiModule.getAllStyles(),(_.head||_.documentElement).appendChild(N)}}if(r.promptEditorModule&&r.promptEditorModule.getPromptEditorStyles){let D=`${n}-prompt-styles`;if(!_.getElementById(D)){let N=_.createElement("style");N.id=D,N.textContent=r.promptEditorModule.getPromptEditorStyles(),(_.head||_.documentElement).appendChild(N)}}}async function J(){try{let{applyUiPreferences:_}=await Promise.resolve().then(()=>(bo(),mi));if(r.settingsServiceModule?.settingsService){let D=r.settingsServiceModule.settingsService.getUiSettings();if(D&&D.theme){let N=o.document||document;_(D,N),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${D.theme}`)}}}catch(_){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",_)}}function le(){let _=o.jQuery||window.jQuery;if(!_){x("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(le,1e3);return}let D=o.document||document,N=_("#extensionsMenu",D);if(!N.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(le,2e3);return}if(_(`#${l}`,N).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let Y=_(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),ae=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${a}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,se=_(ae);se.on("click",function(ke){ke.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Re=_("#extensionsMenuButton",D);Re.length&&N.is(":visible")&&Re.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),Y.append(se),N.append(Y),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function de(){if(y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${i}`),await V(),await P()){if(y("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!d&&r.uiModule?.initUI)try{r.uiModule.initUI({services:r,autoInjectStyles:!1,targetDocument:o.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(N){console.error(`[${n}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,N)}R(),await J(),r.toolAutomationServiceModule?.toolAutomationService&&(r.toolAutomationServiceModule.toolAutomationService.init(),y("\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316"))}else y("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let D=o.document||document;D.readyState==="loading"?D.addEventListener("DOMContentLoaded",()=>{setTimeout(le,1e3)}):setTimeout(le,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:P,injectStyles:V,addMenuItem:le,loadLegacyModule:S,init:de,log:y,logError:x}}function Yi(s){let{constants:e,topLevelWindow:t,modules:o,caches:r,uiState:n}=s,{SCRIPT_ID:i,SCRIPT_VERSION:a,POPUP_ID:l}=e,c={cleanup:null},d={cleanups:[]};function u(...g){console.log(`[${i}]`,...g)}function f(...g){console.error(`[${i}]`,...g)}async function y(g){if(o[g])return o[g];let m=s?.services?.loadLegacyModule;if(typeof m!="function")return null;try{return await m(g)}catch(w){return f(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${g}`,w),null}}function x(g){return typeof g!="string"?"":g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function S(){return t.jQuery||window.jQuery}function P(){return t.document||document}function I(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let m=o.toolRegistryModule?.getToolConfig(g);if(!m)return g;if(!m.hasSubTabs)return m.name||g;let w=n.currentSubTab[g]||m.subTabs?.[0]?.id||"",T=m.subTabs?.find(A=>A.id===w);return T?.name?`${m.name} / ${T.name}`:m.name||g}function V(g){if(!g)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let m=o.toolRegistryModule?.getToolConfig(g);if(!m)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!m.hasSubTabs)return m.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let w=n.currentSubTab[g]||m.subTabs?.[0]?.id||"";return m.subTabs?.find(A=>A.id===w)?.description||m.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function R(){let g=n.currentPopup;if(!g)return;let m=I(n.currentMainTab),w=V(n.currentMainTab),T=g.querySelector(".yyt-popup-active-label");T&&(T.textContent=`\u5F53\u524D\uFF1A${m}`);let A=g.querySelector(".yyt-shell-breadcrumb");A&&(A.textContent=m);let z=g.querySelector(".yyt-shell-main-title");z&&(z.textContent=m);let X=g.querySelector(".yyt-shell-main-description");X&&(X.textContent=w);let C=g.querySelector(".yyt-shell-current-page");C&&(C.textContent=m);let L=g.querySelector(".yyt-shell-current-desc");L&&(L.textContent=w)}function J(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function le(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(g=>{typeof g=="function"&&g()}),d.cleanups=[])}function de(g){return!!g?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function _(g){let m=g?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return m?m.scrollHeight>m.clientHeight+2||m.scrollWidth>m.clientWidth+2:!1}function D(g,m){return m?.closest?.(".yyt-scrollable-surface")===g}function N(g,m){if(!g||!m)return null;let w=m.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return w&&g.contains(w)&&(w.scrollHeight>w.clientHeight+2||w.scrollWidth>w.clientWidth+2)?w:[m.closest?.(".yyt-tool-list"),m.closest?.(".yyt-settings-content"),m.closest?.(".yyt-sub-content"),m.closest?.(".yyt-tab-content.active"),g].filter(Boolean).find(A=>A!==g&&!g.contains(A)?!1:A.scrollHeight>A.clientHeight+2||A.scrollWidth>A.clientWidth+2)||g}function k(g){let m=P();if(!g||!m)return;g.classList.add("yyt-scrollable-surface");let w=!1,T=!1,A=0,z=0,X=0,C=0,L=!1,ne=!1,ce=()=>{w=!1,T=!1,g.classList.remove("yyt-scroll-dragging")},fe=B=>{B.button===0&&(de(B.target)||D(g,B.target)&&(L=g.scrollWidth>g.clientWidth+2,ne=g.scrollHeight>g.clientHeight+2,!(!L&&!ne)&&(B.stopPropagation(),w=!0,T=!1,A=B.clientX,z=B.clientY,X=g.scrollLeft,C=g.scrollTop)))},we=B=>{if(!w)return;let Ze=B.clientX-A,Te=B.clientY-z;!(Math.abs(Ze)>4||Math.abs(Te)>4)&&!T||(T=!0,g.classList.add("yyt-scroll-dragging"),L&&(g.scrollLeft=X-Ze),ne&&(g.scrollTop=C-Te),B.preventDefault())},lt=()=>{ce()},ct=B=>{if(B.ctrlKey||_(B.target))return;let Ze=g.classList.contains("yyt-content");if(!Ze&&!D(g,B.target))return;let Te=N(g,B.target);!Te||!(Te.scrollHeight>Te.clientHeight+2||Te.scrollWidth>Te.clientWidth+2)||(Math.abs(B.deltaY)>0&&(Te.scrollTop+=B.deltaY),Math.abs(B.deltaX)>0&&(Te.scrollLeft+=B.deltaX),B.preventDefault(),(!Ze||Te!==g)&&B.stopPropagation())},F=B=>{T&&B.preventDefault()};g.addEventListener("mousedown",fe),g.addEventListener("wheel",ct,{passive:!1}),g.addEventListener("dragstart",F),m.addEventListener("mousemove",we),m.addEventListener("mouseup",lt),d.cleanups.push(()=>{ce(),g.classList.remove("yyt-scrollable-surface"),g.removeEventListener("mousedown",fe),g.removeEventListener("wheel",ct),g.removeEventListener("dragstart",F),m.removeEventListener("mousemove",we),m.removeEventListener("mouseup",lt)})}function Y(){let g=n.currentPopup;if(!g)return;le();let m=[...g.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...g.querySelectorAll(".yyt-sub-nav"),...g.querySelectorAll(".yyt-content"),...g.querySelectorAll(".yyt-tab-content.active"),...g.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...g.querySelectorAll(".yyt-settings-content"),...g.querySelectorAll(".yyt-tool-list")];[...new Set(m)].forEach(k)}function ae(){let g=P(),m=n.currentPopup,w=m?.querySelector(".yyt-popup-header");if(!m||!w||!g)return;let T=!1,A=0,z=0,X=0,C=0,L="",ne=()=>({width:t.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:t.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),ce=(F,B,Ze)=>Math.min(Math.max(F,B),Ze),fe=()=>{T&&(T=!1,m.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=L)},we=F=>{if(!T||!n.currentPopup)return;let B=F.clientX-A,Ze=F.clientY-z,{width:Te,height:Mo}=ne(),Gi=m.offsetWidth||0,Vi=m.offsetHeight||0,Ji=Math.max(0,Te-Gi),Xi=Math.max(0,Mo-Vi);m.style.left=`${ce(X+B,0,Ji)}px`,m.style.top=`${ce(C+Ze,0,Xi)}px`,m.style.transform="none",m.style.right="auto",m.style.bottom="auto"},lt=()=>{fe()},ct=F=>{if(F.button!==0||F.target?.closest(".yyt-popup-close"))return;T=!0,A=F.clientX,z=F.clientY;let B=m.getBoundingClientRect();X=B.left,C=B.top,m.style.left=`${B.left}px`,m.style.top=`${B.top}px`,m.style.transform="none",m.style.right="auto",m.style.bottom="auto",m.classList.add("yyt-popup-dragging"),L=g.body.style.userSelect||"",g.body.style.userSelect="none",F.preventDefault()};w.addEventListener("mousedown",ct),g.addEventListener("mousemove",we),g.addEventListener("mouseup",lt),c.cleanup=()=>{fe(),w.removeEventListener("mousedown",ct),g.removeEventListener("mousemove",we),g.removeEventListener("mouseup",lt)}}function se(){J(),le(),n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),u("\u5F39\u7A97\u5DF2\u5173\u95ED")}function W(g){n.currentMainTab=g;let m=S();if(!m||!n.currentPopup)return;m(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),m(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let w=o.toolRegistryModule?.getToolConfig(g);w?.hasSubTabs?(m(n.currentPopup).find(".yyt-sub-nav").show(),Re(g,w.subTabs)):m(n.currentPopup).find(".yyt-sub-nav").hide(),m(n.currentPopup).find(".yyt-tab-content").removeClass("active"),m(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),Ye(g),R(),Y()}function ke(g,m){n.currentSubTab[g]=m;let w=S();!w||!n.currentPopup||(w(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),w(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${m}"]`).addClass("active"),ve(g,m),R(),Y())}function Re(g,m){let w=S();if(!w||!n.currentPopup||!m)return;let T=n.currentSubTab[g]||m[0]?.id,A=m.map(z=>`
      <div class="yyt-sub-nav-item ${z.id===T?"active":""}" data-subtab="${z.id}">
        <i class="fa-solid ${z.icon||"fa-file"}"></i>
        <span>${z.name}</span>
      </div>
    `).join("");w(n.currentPopup).find(".yyt-sub-nav").html(A),w(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let X=w(this).data("subtab");ke(g,X)}),Y()}async function Ye(g){let m=S();if(!m||!n.currentPopup)return;let w=m(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!w.length)return;let T=o.toolRegistryModule?.getToolConfig(g);switch(g){case"apiPresets":if(o.uiModule?.renderApiPanel)o.uiModule.renderApiPanel(w);else{let A=await y("uiComponentsModule");A?.render&&A.render(w)}break;case"toolManage":if(o.uiModule?.renderToolPanel)o.uiModule.renderToolPanel(w);else{let A=await y("uiComponentsModule");A?.renderTool&&A.renderTool(w)}break;case"regexExtract":if(o.uiModule?.renderRegexPanel)o.uiModule.renderRegexPanel(w);else{let A=await y("uiComponentsModule");A?.renderRegex&&A.renderRegex(w)}break;case"tools":if(T?.hasSubTabs&&T.subTabs?.length>0){let A=n.currentSubTab[g]||T.subTabs[0].id;await ve(g,A)}else w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":o.uiModule?.renderBypassPanel?o.uiModule.renderBypassPanel(w):w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":o.uiModule?.renderSettingsPanel?o.uiModule.renderSettingsPanel(w):w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:oe(g,w);break}Y()}async function ve(g,m){let w=S();if(!w||!n.currentPopup)return;let T=w(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!T.length)return;let A=o.toolRegistryModule?.getToolConfig(g);if(A?.hasSubTabs){let X=A.subTabs?.find(C=>C.id===m);if(X){let C=T.find(".yyt-sub-content");switch(C.length||(T.html('<div class="yyt-sub-content"></div>'),C=T.find(".yyt-sub-content")),X.component){case"SummaryToolPanel":if(o.uiModule?.renderSummaryToolPanel)o.uiModule.renderSummaryToolPanel(C);else{let L=await y("uiComponentsModule");L?.SummaryToolPanel?L.SummaryToolPanel.renderTo(C):C.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(o.uiModule?.renderStatusBlockPanel)o.uiModule.renderStatusBlockPanel(C);else{let L=await y("uiComponentsModule");L?.StatusBlockPanel?L.StatusBlockPanel.renderTo(C):C.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(o.uiModule?.renderYouyouReviewPanel)o.uiModule.renderYouyouReviewPanel(C);else{let L=await y("uiComponentsModule");L?.YouyouReviewPanel?L.YouyouReviewPanel.renderTo(C):C.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"EscapeTransformToolPanel":if(o.uiModule?.renderEscapeTransformToolPanel)o.uiModule.renderEscapeTransformToolPanel(C);else{let L=await y("uiComponentsModule");L?.EscapeTransformToolPanel?L.EscapeTransformToolPanel.renderTo(C):C.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"PunctuationTransformToolPanel":if(o.uiModule?.renderPunctuationTransformToolPanel)o.uiModule.renderPunctuationTransformToolPanel(C);else{let L=await y("uiComponentsModule");L?.PunctuationTransformToolPanel?L.PunctuationTransformToolPanel.renderTo(C):C.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await Qe(X,C);break;default:C.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let z=T.find(".yyt-sub-content");if(z.length){switch(m){case"config":re(g,z);break;case"prompts":await at(g,z);break;case"presets":Ke(g,z);break;default:z.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Y()}}async function Qe(g,m){if(!(!S()||!m?.length||!g?.id))try{let T=r.dynamicToolPanelCache.get(g.id);if(!T){let z=(await Promise.resolve().then(()=>(Yt(),di)))?.createToolConfigPanel;if(typeof z!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");T=z({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),r.dynamicToolPanelCache.set(g.id,T)}T.renderTo(m),Y()}catch(T){console.error(`[${i}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,T),m.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function oe(g,m){if(!S())return;let T=o.toolRegistryModule?.getToolConfig(g);if(!T){m.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let A=n.currentSubTab[g]||T.subTabs?.[0]?.id||"config";m.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${A}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),ve(g,A)}function re(g,m){if(!S())return;let T=o.toolManagerModule?.getTool(g),A=o.presetManagerModule?.getAllPresets()||[],z=o.toolRegistryModule?.getToolApiPreset(g)||"",X=A.map(C=>`<option value="${x(C.name)}" ${C.name===z?"selected":""}>${x(C.name)}</option>`).join("");m.html(`
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
              ${X}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${T?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${T?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),m.find("#yyt-save-tool-preset").on("click",function(){let L=m.find("#yyt-tool-api-preset").val();o.toolRegistryModule?.setToolApiPreset(g,L);let ne=t.toastr;ne&&ne.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function at(g,m){let w=S(),T=o.promptEditorModule||await y("promptEditorModule");if(!w||!T){m.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let z=o.toolManagerModule?.getTool(g)?.config?.messages||[],X=T.messagesToSegments?T.messagesToSegments(z):T.DEFAULT_PROMPT_SEGMENTS,C=new T.PromptEditor({containerId:`yyt-prompt-editor-${g}`,segments:X,onChange:ne=>{let ce=T.segmentsToMessages?T.segmentsToMessages(ne):[];u("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ce.length,"\u6761\u6D88\u606F")}});m.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),C.init(m.find(`#yyt-prompt-editor-${g}`));let L=T.getPromptEditorStyles?T.getPromptEditorStyles():"";if(L){let ne="yyt-prompt-editor-styles",ce=t.document||document;if(!ce.getElementById(ne)){let fe=ce.createElement("style");fe.id=ne,fe.textContent=L,(ce.head||ce.documentElement).appendChild(fe)}}}function Ke(g,m){S()&&m.html(`
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
    `)}async function q(){if(n.currentPopup){u("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=s?.services?.loadModules;typeof g=="function"&&await g();let m=S(),w=P();if(!m){f("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let T=o.toolRegistryModule?.getToolList()||[];if(!T.length){f("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}T.some(F=>F.id===n.currentMainTab)||(n.currentMainTab=T[0].id);let A=o.toolRegistryModule?.getToolConfig("tools"),z=Array.isArray(A?.subTabs)?A.subTabs:[],X=z.filter(F=>F?.isCustom).length,C=z.filter(F=>!F?.isCustom).length,L=I(n.currentMainTab),ne=V(n.currentMainTab);n.currentOverlay=w.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",F=>{F.target===n.currentOverlay&&se()}),w.body.appendChild(n.currentOverlay);let ce=T.map(F=>`
      <div class="yyt-main-nav-item ${F.id===n.currentMainTab?"active":""}" data-tab="${F.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${x(F.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${x(F.name||F.id)}</span>
          <span class="yyt-main-nav-desc">${x(F.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),fe=T.map(F=>`
      <div class="yyt-tab-content ${F.id===n.currentMainTab?"active":""}" data-tab="${F.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),we=`
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
                  <strong class="yyt-shell-current-page">${x(L)}</strong>
                  <span class="yyt-shell-current-desc">${x(ne)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${T.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${C}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${X}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${T.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${ce}
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
                    <div class="yyt-shell-main-title">${x(L)}</div>
                    <div class="yyt-shell-main-description">${x(ne)}</div>
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
                      ${fe}
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
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${x(L)}</span>
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
    `,lt=w.createElement("div");lt.innerHTML=we,n.currentPopup=lt.firstElementChild,w.body.appendChild(n.currentPopup),m(n.currentPopup).find(".yyt-popup-close").on("click",se),m(n.currentPopup).find(`#${i}-close-btn`).on("click",se),m(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let B=m(this).data("tab");B&&W(B)}),ae(),Ye(n.currentMainTab);let ct=o.toolRegistryModule?.getToolConfig(n.currentMainTab);ct?.hasSubTabs&&(m(n.currentPopup).find(".yyt-sub-nav").show(),Re(n.currentMainTab,ct.subTabs)),R(),Y(),u("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:q,closePopup:se,switchMainTab:W,switchSubTab:ke,renderTabContent:Ye,renderSubTabContent:ve}}function Ki(s,e={}){let{constants:t,modules:o}=s,{SCRIPT_ID:r,SCRIPT_VERSION:n}=t,{init:i,loadModules:a,loadLegacyModule:l,addMenuItem:c,popupShell:d}=e;return{version:n,id:r,init:i,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:c,getStorage:()=>o.storageModule,getApiConnection:()=>o.apiConnectionModule,getPresetManager:()=>o.presetManagerModule,getUi:()=>o.uiModule,getUiModule:()=>o.uiModule,getUiComponents:()=>o.uiComponentsModule,getRegexExtractor:()=>o.regexExtractorModule,getToolManager:()=>o.toolManagerModule,getToolExecutor:()=>o.toolExecutorModule,getWindowManager:()=>o.windowManagerModule,getToolRegistry:()=>o.toolRegistryModule,getPromptEditor:()=>o.promptEditorModule,getSettingsService:()=>o.settingsServiceModule,getBypassManager:()=>o.bypassManagerModule,getVariableResolver:()=>o.variableResolverModule,getContextInjector:()=>o.contextInjectorModule,getToolPromptService:()=>o.toolPromptServiceModule,getToolOutputService:()=>o.toolOutputServiceModule,getToolAutomationService:()=>o.toolAutomationServiceModule,async loadLegacyModule(u){return typeof l!="function"?null:l(u)},async getApiConfig(){return await a(),o.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(u){return await a(),o.apiConnectionModule?(o.apiConnectionModule.updateApiConfig(u),!0):!1},async getPresets(){return await a(),o.presetManagerModule?o.presetManagerModule.getAllPresets():[]},async sendApiRequest(u,f){if(await a(),o.apiConnectionModule)return o.apiConnectionModule.sendApiRequest(u,f);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await a(),o.apiConnectionModule?o.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(u,f){return o.toolRegistryModule?.registerTool(u,f)||!1},unregisterTool(u){return o.toolRegistryModule?.unregisterTool(u)||!1},getToolList(){return o.toolRegistryModule?.getToolList()||[]},createWindow(u){return o.windowManagerModule?.createWindow(u)||null},closeWindow(u){o.windowManagerModule?.closeWindow(u)},startAutomation(){return o.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){o.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return o.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},async processCurrentAssistantMessage(u={}){return o.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(u)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var xs="youyou_toolkit",Mc="1.0.14",kc=`${xs}-menu-item`,Cc=`${xs}-menu-container`,Pc=`${xs}-popup`,Ic=typeof window.parent<"u"?window.parent:window,vs={constants:{SCRIPT_ID:xs,SCRIPT_VERSION:Mc,MENU_ITEM_ID:kc,MENU_CONTAINER_ID:Cc,POPUP_ID:Pc},topLevelWindow:Ic,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},qi=Yi(vs),It=Hi(vs,{openPopup:qi.openPopup});vs.services.loadModules=It.loadModules;vs.services.loadLegacyModule=It.loadLegacyModule;var Or=Ki(vs,{init:It.init,loadModules:It.loadModules,loadLegacyModule:It.loadLegacyModule,addMenuItem:It.addMenuItem,popupShell:qi});if(typeof window<"u"&&(window.YouYouToolkit=Or,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Or}catch{}var ru=Or;It.init();console.log(`[${xs}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{ru as default};
