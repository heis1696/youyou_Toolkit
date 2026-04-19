var bc=Object.defineProperty;var z=(t,e)=>()=>(t&&(e=t(t=0)),e);var de=(t,e)=>{for(var s in e)bc(t,s,{get:e[s],enumerable:!0})};function ln(){let t=A;return t._getStorage(),t._storage}function cn(){return A.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function dn(t){A.set("settings",t)}var Et,A,ee,nn,Is,Re=z(()=>{Et=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespaceKey]||(s.extensionSettings[this.namespaceKey]={}),this._storage={_target:s.extensionSettings[this.namespaceKey],getItem:o=>{let r=s.extensionSettings[this.namespaceKey][o];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(o,r)=>{s.extensionSettings[this.namespaceKey][o]=r,this._saveSettings(s)},removeItem:o=>{delete s.extensionSettings[this.namespaceKey][o],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespaceKey}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(o){console.error(`[${this.namespaceKey}] localStorage\u5199\u5165\u5931\u8D25:`,o)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let o=`${this.namespaceKey}:${e}`;if(this._cache.has(o))return this._cache.get(o);let r=this._getStorage(),a=this._getFullKey(e),n=r.getItem(a);if(n===null)return s;try{let i=JSON.parse(n);return this._cache.set(o,i),i}catch{return n}}set(e,s){let o=this._getStorage(),r=this._getFullKey(e),a=`${this.namespaceKey}:${e}`;this._cache.set(a,s);try{o.setItem(r,JSON.stringify(s))}catch(n){console.error(`[${this.namespaceKey}] \u5B58\u50A8\u5931\u8D25:`,n)}}remove(e){let s=this._getStorage(),o=this._getFullKey(e),r=`${this.namespaceKey}:${e}`;this._cache.delete(r),s.removeItem(o)}has(e){let s=this._getStorage(),o=this._getFullKey(e);return s.getItem(o)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let o=s.SillyTavern.getContext();o?.extensionSettings?.[this.namespaceKey]&&(o.extensionSettings[this.namespaceKey]={},this._saveSettings(o))}}else{let s=`${this.namespaceKey}_`,o=[];for(let r=0;r<localStorage.length;r++){let a=localStorage.key(r);a&&a.startsWith(s)&&o.push(a)}o.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let s={};return e.forEach(o=>{s[o]=this.get(o)}),s}setMultiple(e){Object.entries(e).forEach(([s,o])=>{this.set(s,o)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let o=typeof window.parent<"u"?window.parent:window;if(o.SillyTavern?.getContext){let a=o.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(a).forEach(([n,i])=>{s[n]=typeof i=="string"?JSON.parse(i):i})}}else{let o=`${this.namespaceKey}_`;for(let r=0;r<localStorage.length;r++){let a=localStorage.key(r);if(a&&a.startsWith(o)){let n=a.slice(o.length);try{s[n]=JSON.parse(localStorage.getItem(a))}catch{s[n]=localStorage.getItem(a)}}}}return s}},A=new Et("youyou_toolkit"),ee=new Et("youyou_toolkit:tools"),nn=new Et("youyou_toolkit:presets"),Is=new Et("youyou_toolkit:windows")});var Nr={};de(Nr,{DEFAULT_API_PRESETS:()=>vc,DEFAULT_SETTINGS:()=>hc,STORAGE_KEYS:()=>$s,StorageService:()=>Et,deepMerge:()=>un,getCurrentPresetName:()=>Tc,getStorage:()=>ln,loadApiPresets:()=>xc,loadSettings:()=>cn,presetStorage:()=>nn,saveApiPresets:()=>wc,saveSettings:()=>dn,setCurrentPresetName:()=>Sc,storage:()=>A,toolStorage:()=>ee,windowStorage:()=>Is});function xc(){return A.get($s.API_PRESETS)||[]}function wc(t){A.set($s.API_PRESETS,t)}function Tc(){return A.get($s.CURRENT_PRESET)||""}function Sc(t){A.set($s.CURRENT_PRESET,t||"")}function un(t,e){let s=r=>r&&typeof r=="object"&&!Array.isArray(r),o={...t};return s(t)&&s(e)&&Object.keys(e).forEach(r=>{s(e[r])?r in t?o[r]=un(t[r],e[r]):Object.assign(o,{[r]:e[r]}):Object.assign(o,{[r]:e[r]})}),o}var $s,hc,vc,Br=z(()=>{Re();Re();$s={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},hc={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},vc=[]});var C,zr,$,fe=z(()=>{C={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},zr=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,o={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=o;this.listeners.has(e)||this.listeners.set(e,new Set);let a={callback:s,priority:r};return this.listeners.get(e).add(a),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let o=this.listeners.get(e);if(o){for(let r of o)if(r.callback===s){o.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let o=this.listeners.get(e);if(!o||o.size===0)return;let r=Array.from(o).sort((a,n)=>n.priority-a.priority);for(let{callback:a}of r)try{a(s)}catch(n){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,n)}}once(e,s){let o=r=>{this.off(e,o),s(r)};return this.on(e,o)}wait(e,s=0){return new Promise((o,r)=>{let a=null,n=this.once(e,i=>{a&&clearTimeout(a),o(i)});s>0&&(a=setTimeout(()=>{n(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},$=new zr});function Bt(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function h(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function w(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let o=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(o.toastr){o.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}_c(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function he(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:o=3500,sticky:r=!1,noticeId:a=""}=s,n=Bt();if(!n?.body){w(t,e,o);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=n.getElementById(i);if(c||(c=n.createElement("div"),c.id=i,c.style.cssText=`
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
    `,n.body.appendChild(c)),!n.getElementById(l)){let x=n.createElement("style");x.id=l,x.textContent=`
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
    `,n.head.appendChild(x)}if(a){let x=c.querySelector(`[data-notice-id="${a}"]`);x&&x.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=n.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,a&&(u.dataset.noticeId=a);let f=n.createElement("span");f.className="yyt-top-notice__icon",f.textContent=d[t]||d.info;let y=n.createElement("div");y.className="yyt-top-notice__content",y.textContent=e;let m=n.createElement("button");m.className="yyt-top-notice__close",m.type="button",m.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),m.textContent="\xD7";let b=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};m.addEventListener("click",b),u.appendChild(f),u.appendChild(y),u.appendChild(m),c.appendChild(u),r||setTimeout(b,o)}function _c(t,e,s){let o=Bt();if(!o)return;let r=o.getElementById("yyt-fallback-toast");r&&r.remove();let a={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},n=a[t]||a.info,i=o.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${n.bg};
    color: #0b0f15;
    border-radius: 8px;
    border: 2px solid ${n.border};
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
    `,o.head.appendChild(l)}o.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},s)}function P(){if(Nt)return Nt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Nt=window.parent.jQuery,Nt}catch{}return window.jQuery&&(Nt=window.jQuery),Nt}function Ec(){Nt=null}function O(t){return t&&t.length>0}function At(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function ls(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,s])=>s===!0?e:`${e}="${h(String(s))}"`).join(" ")}function fn(t=[],e="",s=""){let o=String(e??""),r=t.find(a=>a.value===o)||t.find(a=>a.disabled!==!0)||null;return r||{value:o,label:s||o||"\u8BF7\u9009\u62E9",disabled:!1}}function Ac(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function yn(t,e){let s=P();if(!s||!e?.length)return null;let o=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!o)return null;let a=t.find("[data-yyt-custom-select]").filter((n,i)=>String(s(i).attr("data-yyt-select-target")||"")===o);return a.length?a.first():null}function mn(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Mc(t){if(!P()||!O(t))return null;let s=t.find("[data-yyt-custom-select]");return s.length?s:null}function bn(t,e){if(!P()||!e?.length)return null;let o=e.find("[data-yyt-select-native]").first();if(o.length)return o;let r=String(e.attr("data-yyt-select-target")||"").trim();if(!r)return null;let a=t.find(r).first();return a.length?a:null}function hn(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:Bt()}function at(t=null){let e=hn(t),s=pn.get(e);return s||(s={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},pn.set(e,s)),s}function kc(t=null){let e=hn(t);if(!e?.body)return null;let s=at(e);if(s.layer&&s.layer.isConnected)return s.layer;let o=e.getElementById(gn);return o||(o=e.createElement("div"),o.id=gn,o.className="yyt-select-portal-layer",e.body.appendChild(o)),s.layer=o,o}function wo(t){if(!P()||!t?.length)return null;let s=t.find("[data-yyt-select-trigger]").first();return s.length?s:t.find(".yyt-select-trigger").first()}function vn(t){let e=P();if(!e||!t?.length)return null;let s=at(t);if(s.activeRoot===t[0]&&s.activeDropdown)return e(s.activeDropdown);let o=t.find("[data-yyt-select-dropdown]").first();return o.length?o:t.find(".yyt-select-dropdown").first()}function Cc(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function xn(t,e=null){if(!t)return!1;let s=at(e||t);return s.activeRoot?.contains?.(t)||s.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Pc(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,s=e.defaultView||window,o=i=>{!t.activeRoot||!t.activeDropdown||xn(i.target,e)||De(e)},r=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;De(e);let c=P();c&&l&&wo(c(l))?.trigger("focus")},a=()=>{jr(e)},n=()=>{jr(e)};e.addEventListener("mousedown",o,!0),e.addEventListener("keydown",r,!0),s.addEventListener("resize",a),e.addEventListener("scroll",n,!0),t.cleanup=()=>{e.removeEventListener("mousedown",o,!0),e.removeEventListener("keydown",r,!0),s.removeEventListener("resize",a),e.removeEventListener("scroll",n,!0)}}function Ic(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Wr(t){let e=P();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let s=t.targetDoc;if(!s?.body?.contains?.(t.activeRoot)){De(s);return}let o=e(t.activeRoot),r=wo(o),a=t.activeDropdown,n=s?.defaultView||window;if(!r?.length||!a?.isConnected||!o[0]?.isConnected){De(s);return}let i=r[0].getBoundingClientRect(),l=n.innerWidth||s.documentElement?.clientWidth||0,c=n.innerHeight||s.documentElement?.clientHeight||0,d=12,u=8,f=Math.max(0,c-i.bottom-d-u),y=Math.max(0,i.top-d-u),m=f<220&&y>f,x=Math.max(120,Math.floor((m?y:f)||0));a.setAttribute("data-yyt-floating","true"),a.setAttribute("data-yyt-floating-placement",m?"top":"bottom"),a.classList.add("yyt-floating-open");let E=Math.ceil(i.width),S=Math.max(E,Math.floor(l-d*2)),M=a.style.width,R=a.style.minWidth,U=a.style.maxWidth,F=a.style.visibility;a.style.width="max-content",a.style.minWidth=`${E}px`,a.style.maxWidth=`${S}px`,a.style.visibility="hidden";let k=Math.ceil(a.scrollWidth||a.getBoundingClientRect().width||E),N=Math.max(E,Math.min(S,k)),B=Math.min(a.scrollHeight||x,x);a.style.width=M,a.style.minWidth=R,a.style.maxWidth=U,a.style.visibility=F;let L=Math.round(i.left);L+N>l-d&&(L=Math.max(d,Math.round(l-d-N))),L=Math.max(d,L);let X=Math.round(m?i.top-u-B:i.bottom+u);X=Math.max(d,Math.min(X,Math.round(c-d-B))),a.style.position="fixed",a.style.top=`${X}px`,a.style.left=`${L}px`,a.style.right="auto",a.style.width=`${N}px`,a.style.minWidth=`${E}px`,a.style.maxWidth=`${S}px`,a.style.maxHeight=`${Math.floor(x)}px`,a.style.visibility="",a.style.zIndex="10050"}function De(t=null){let e=P(),s=at(t);if(!e||!s?.activeRoot)return;let o=s.activeRoot,r=s.activeDropdown,a=s.placeholder,n=e(o),i=wo(n);r&&(Cc(r),a?.parentNode?a.parentNode.insertBefore(r,a):o?.isConnected?o.appendChild(r):r.remove()),a?.parentNode?.removeChild(a),n.removeClass("yyt-open"),i?.attr("aria-expanded","false"),s.activeRoot=null,s.activeDropdown=null,s.placeholder=null,Ic(s)}function jr(t=null){let e=at(t);!e?.activeRoot||!e?.activeDropdown||Wr(e)}function wn(t){if(!P()||!t?.length)return;let s=t.first(),o=wo(s),r=vn(s);if(!o?.length||!r?.length||o.prop("disabled"))return;let a=at(s);if(a.activeRoot===s[0]){Wr(a);return}De(s);let n=kc(s);if(!n)return;let i=r[0],l=a.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),n.appendChild(i),a.activeRoot=s[0],a.activeDropdown=i,a.placeholder=l,s.addClass("yyt-open"),o.attr("aria-expanded","true"),Pc(a),Wr(a)}function $c(t,e){let s=P();if(!s||!e?.length)return null;let o=e.closest("[data-yyt-custom-select]");if(o.length)return o.first();let r=at(e);if(r.activeRoot&&r.activeDropdown?.contains?.(e[0])){let a=s(r.activeRoot);return t.has(r.activeRoot).length?a:null}return null}function Rs(t){let e=at(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||De(t)}function To(t){let e=at(t);if(t?.length&&e.activeRoot===t[0]){De(t);return}wn(t)}function Ur(t,e,s=null){let o=P();if(!o||!e?.length)return;let r=s||bn(t,e);if(!r?.length)return;let a=Array.isArray(r.data("yytCustomSelectOptions"))?r.data("yytCustomSelectOptions"):[],n=fn(a,r.val(),e.attr("data-yyt-select-placeholder")||""),i=String(n.value??""),l=String(n.label??""),c=r.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=vn(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((y,m)=>{let b=o(m),x=String(b.attr("data-value")||"")===i;b.toggleClass("yyt-selected",x).attr("aria-selected",String(x))});let f=e.find("[data-yyt-select-trigger]").first();f.prop("disabled",c),c&&(Rs(e),e.removeClass("yyt-open"),f.attr("aria-expanded","false"))}function So(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let o=String(e.value??""),r=String(e.label??e.text??e.name??o);return{value:o,label:r,disabled:e.disabled===!0}}let s=String(e??"");return{value:s,label:s,disabled:!1}}):[]}function _o(t={}){let{selectedValue:e="",options:s=[],placeholder:o="\u8BF7\u9009\u62E9",disabled:r=!1,includeNative:a=!0,nativeTag:n="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:f={},optionClass:y="",optionTextClass:m=""}=t,b=So(s),x=fn(b,e,o),E=r===!0||b.length===0,S=ls({...l,class:At("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":o}),M=ls({type:"button",...d,class:At("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:E?!0:d.disabled}),R=ls({...u,class:At("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),U=a?(()=>{let F={...c,class:At(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:E?!0:c.disabled};return n==="select"?`<select ${ls(F)}>${b.map(B=>`
            <option value="${h(B.value)}" ${B.value===String(x.value??"")?"selected":""} ${B.disabled?"disabled":""}>${h(B.label)}</option>
          `).join("")}</select>`:`<input ${ls({type:i,value:x.value,...F})}>`})():"";return`
    <div ${S}>
      ${U}
      <button ${M}>
        <span class="${h(At("yyt-select-value"))}" data-value="${h(x.value)}">${h(x.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${R}>
        ${b.map(F=>{let k=F.value===String(x.value??"");return`
            <button ${ls({type:"button",...f,class:At("yyt-select-option",y,f.class,k?"yyt-selected":""),"data-yyt-select-option":f["data-yyt-select-option"]??"true","data-value":F.value,role:f.role??"option","aria-selected":k?"true":"false",disabled:F.disabled?!0:f.disabled})}>
              <span class="${h(At("yyt-option-text",m))}">${h(F.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function ye(t,e="yytCustomSelect"){let s=P();if(!s||!O(t))return;let o=mn(t),r=at(o);r.activeRoot&&t.has(r.activeRoot).length&&De(o),t.off(`.${e}`),s(o).off(`click.${e}`),s(o).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((a,n)=>{let i=s(n),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function we(t,e={}){let s=P();if(!s||!O(t))return;let{namespace:o="yytCustomSelect",selectors:r=[]}=e,a=Array.isArray(r)?r.filter(Boolean):[r].filter(Boolean);if(a.length===0)return;ye(t,o);let n=a.join(", "),i=mn(t);t.find(n).each((l,c)=>{let d=s(c),u=String(d.attr("id")||"").trim(),f=u||`yyt-select-${Date.now()}-${l}`,y=u?`#${u}`:`[data-yyt-select-key="${f}"]`,m=`${f}-dropdown`,b=Ac(d.attr("class")),x=d.attr("style"),E=d.find("option").map((R,U)=>{let F=s(U);return{value:String(F.attr("value")??F.val()??""),label:F.text(),disabled:F.is(":disabled")}}).get();d.attr("data-yyt-original-style",x??"").attr("data-yyt-select-key",f).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",E);let S=_o({includeNative:!1,selectedValue:d.val(),options:E,disabled:d.is(":disabled"),placeholder:E[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:At(b),style:x||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":y},triggerAttributes:{id:`${f}-trigger`,"aria-controls":m},dropdownAttributes:{id:m}});d.after(S);let M=yn(t,d);Ur(t,M,d)}),t.on(`click.${o}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");To(d)}),t.on(`change.${o}`,n,l=>{let c=s(l.currentTarget),d=c.find("option").map((f,y)=>{let m=s(y);return{value:String(m.attr("value")??m.val()??""),label:m.text(),disabled:m.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=yn(t,c);Ur(t,u,c)}),s(i).off(`click.${o}`).on(`click.${o}`,l=>{if(xn(l.target,i))return;let c=Mc(t);c?.length&&(De(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),s(i).off(`mousedown.${o}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${o}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=$c(t,c);if(!d?.length)return;let u=bn(t,d);if(!u?.length)return;let f=String(c.attr("data-value")||"");u.val(f).trigger("change"),Ur(t,d,u),Rs(d)})}function Mt(t,e=g){if(!P()||!O(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let o=t.find(`#${e}-model`).val()?.trim()||"",r=t.find(`#${e}-model-select`);return r.is(":visible")&&(o=r.val()||o),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:o,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function zt(t,e,s=g){if(!P()||!O(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-stream`).prop("checked",e.stream===!0),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",r);let n=t.find(`#${s}-custom-api-fields`);r?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Ut(t){let{id:e,title:s,body:o,width:r="380px",wide:a=!1,dialogClass:n="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${a?"yyt-dialog-wide":""} ${n}" style="${r!=="380px"?`width: ${r};`:""} max-height: calc(100vh - 32px);">
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
  `}function Wt(t,e,s={}){if(!P())return()=>{};let r=t.find(`#${e}-overlay`),a=()=>{r.remove(),s.onClose&&s.onClose()};return r.find(`#${e}-close, #${e}-cancel`).on("click",a),r.on("click",function(n){n.target===this&&a()}),r.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(a)}),a}function gt(t,e){let s=new Blob([t],{type:"application/json"}),o=URL.createObjectURL(s),r=document.createElement("a");r.href=o,r.download=e,r.click(),URL.revokeObjectURL(o)}function ft(t){return new Promise((e,s)=>{let o=new FileReader;o.onload=r=>e(r.target.result),o.onerror=r=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),o.readAsText(t)})}var g,Nt,pn,gn,Te=z(()=>{g="youyou_toolkit";Nt=null;pn=new WeakMap,gn="yyt-select-portal-layer"});var Ds,te,Fr=z(()=>{fe();Te();Ds=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,$.emit(C.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,o={}){let r=P();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let a=this.components.get(e);if(!a){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let n;if(typeof s=="string"?n=r(s):s&&s.jquery?n=s:s&&(n=r(s)),!O(n)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}if(this.activeInstances.forEach((i,l)=>{i?.container?.length&&n.length&&i.container[0]===n[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e),typeof a.renderTo=="function")a.renderTo(n,{...o,dependencies:this.dependencies});else{let i=a.render({...o,dependencies:this.dependencies});n.html(i),a.bindEvents(n,this.dependencies)}this.activeInstances.set(e,{container:n,component:a,props:o}),$.emit(C.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,$.emit(C.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,$.emit(C.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,o)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let o=e.createElement("style");o.id=s,o.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(o)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){$.on(C.PRESET_UPDATED,()=>{}),$.on(C.TOOL_UPDATED,()=>{})}},te=new Ds});var An={};de(An,{API_STATUS:()=>Bc,fetchAvailableModels:()=>Gr,getApiConfig:()=>mt,getEffectiveApiConfig:()=>Os,hasEffectiveApiPreset:()=>Ls,sendApiRequest:()=>Ns,sendWithPreset:()=>Yr,testApiConnection:()=>Hc,updateApiConfig:()=>cs,validateApiConfig:()=>ds});function Oc(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Hr(){return A.get(Tn,Oc())}function Lc(t){A.set(Tn,t)}function Sn(){return A.get(Rc,[])}function Nc(){return A.get(Dc,"")}function Kr(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function _n(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let o=null;try{o=new URL(s)}catch{return s}let r=o.pathname.replace(/\/+$/,""),a=r;return e==="chat_completions"?!/\/chat\/completions$/i.test(r)&&!/\/completions$/i.test(r)&&(a=`${r||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(r)?a=r.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(r)?a=r.replace(/\/completions$/i,"/models"):/\/models$/i.test(r)||(a=`${r||""}/models`)),o.pathname=a.replace(/\/+/g,"/"),o.toString()}function zc(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function mt(){return Hr().apiConfig||{}}function cs(t){let e=Hr();e.apiConfig={...e.apiConfig,...t},Lc(e)}function ds(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Os(t=""){let e=Hr(),s=t||Nc()||"";if(s){let r=Sn().find(a=>a.name===s);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return e.apiConfig||{}}function Ls(t=""){return t?Sn().some(s=>s?.name===t):!1}async function Yr(t,e,s={},o=null){let r=Os(t);return await Ns(e,{...s,apiConfig:r},o)}function En(t,e={}){let s=e.apiConfig||mt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:s.stream??!1,...e.extraParams}}function qr(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Ns(t,e={},s=null){let o=e.apiConfig||mt(),r=o.useMainApi,a=ds(o);if(!a.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${a.errors.join(", ")}`);return r?await Uc(t,e,s):await Wc(t,o,e,s)}async function Uc(t,e,s){let o=typeof window.parent<"u"?window.parent:window;if(!o.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??mt().stream??!1,...e.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function Wc(t,e,s,o){let r=typeof window.parent<"u"?window.parent:window;if(r.TavernHelper?.generateRaw)try{return await jc(t,e,s,o,r)}catch(a){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",a)}if(r.SillyTavern?.getRequestHeaders)try{return await Fc(t,e,s,o,r)}catch(a){if(!a?.allowDirectFallback)throw a}return await Kc(t,e,s,o)}async function jc(t,e,s,o,r){if(o?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let a=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:zc(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof a=="string"?a.trim():qr(a)}async function Fc(t,e,s,o,r){let a=String(e.url||"").trim(),n={...En(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:a,proxy_password:"",custom_url:a,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof r.SillyTavern?.getRequestHeaders=="function"?r.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(n),signal:o})}catch(u){throw u?.name==="AbortError"?u:Kr(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw Kr(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let f=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw Kr(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${f||"(\u7A7A\u54CD\u5E94)"}`)}return qr(d)}async function Kc(t,e,s,o){let r=En(t,{apiConfig:e,...s}),a=_n(e.url,"chat_completions"),n={"Content-Type":"application/json"};e.apiKey&&(n.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(a,{method:"POST",headers:n,body:JSON.stringify(r),signal:o}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return qr(c)}async function Hc(t=null){let e=t||mt(),s=Date.now();try{await Ns([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let r=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(o){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${o.message}`,latency:Date.now()-s}}}async function Gr(t=null){let e=t||mt();return e.useMainApi?await Yc():await qc(e)}async function Yc(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function qc(t){if(!t.url||!t.apiKey)return[];try{let e=_n(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let o=await s.json();return o.data&&Array.isArray(o.data)?o.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var Tn,Rc,Dc,Bc,Bs=z(()=>{Re();Tn="settings",Rc="api_presets",Dc="current_preset";Bc={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Pn={};de(Pn,{createPreset:()=>Mo,createPresetFromCurrentConfig:()=>Zc,deletePreset:()=>Us,duplicatePreset:()=>Qc,exportPresets:()=>Zr,generateUniquePresetName:()=>ta,getActiveConfig:()=>Qr,getActivePresetName:()=>ko,getAllPresets:()=>kt,getPreset:()=>Ft,getPresetNames:()=>Jc,getStarredPresets:()=>Xr,importPresets:()=>ea,presetExists:()=>zs,renamePreset:()=>Xc,switchToPreset:()=>Kt,togglePresetStar:()=>Jr,updatePreset:()=>Vr,validatePreset:()=>ed});function Vc(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Cn(){return A.get(Gc,Vc())}function Ae(){return A.get(Mn,[])}function jt(t){A.set(Mn,t)}function Ao(){return A.get(kn,"")}function Eo(t){A.set(kn,t||"")}function kt(){return Ae()}function Jc(){return Ae().map(e=>e.name)}function Ft(t){return!t||typeof t!="string"?null:Ae().find(s=>s.name===t)||null}function zs(t){return!t||typeof t!="string"?!1:Ae().some(s=>s.name===t)}function Mo(t){let{name:e,description:s,apiConfig:o}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(zs(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let a={name:r,description:s||"",apiConfig:{url:o?.url||"",apiKey:o?.apiKey||"",model:o?.model||"",useMainApi:o?.useMainApi??!0,stream:o?.stream??!1,max_tokens:o?.max_tokens||4096,temperature:o?.temperature??.7,top_p:o?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},n=Ae();return n.push(a),jt(n),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:a}}function Vr(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Ae(),o=s.findIndex(n=>n.name===t);if(o===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=s[o],a={...r,...e,name:r.name,updatedAt:Date.now()};return e.apiConfig&&(a.apiConfig={...r.apiConfig,...e.apiConfig}),s[o]=a,jt(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:a}}function Us(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Ae(),s=e.findIndex(o=>o.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),jt(e),Ao()===t&&Eo(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Xc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!zs(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(zs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o=Ae(),r=o.find(a=>a.name===t);return r&&(r.name=s,r.updatedAt=Date.now(),jt(o),Ao()===t&&Eo(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Qc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),o=Ft(t);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(zs(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(o)),name:s,createdAt:Date.now(),updatedAt:Date.now()},a=Ae();return a.push(r),jt(a),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:r}}function Jr(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Ae(),s=e.find(o=>o.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),jt(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Xr(){return Ae().filter(e=>e.starred===!0)}function Kt(t){if(!t)return Eo(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Ft(t);return e?(Eo(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function ko(){return Ao()}function Qr(){let t=Ao();if(t){let s=Ft(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:Cn().apiConfig||{}}}function Zr(t=null){if(t){let s=Ft(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=Ae();return JSON.stringify(e,null,2)}function ea(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(s)?s:[s];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=Ae(),a=0;for(let n of o){if(!n.name||typeof n.name!="string"||!n.apiConfig||typeof n.apiConfig!="object")continue;let i=r.findIndex(l=>l.name===n.name);i>=0?e.overwrite&&(n.updatedAt=Date.now(),r[i]=n,a++):(n.createdAt=n.createdAt||Date.now(),n.updatedAt=Date.now(),r.push(n),a++)}return a>0&&jt(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}function Zc(t,e=""){let s=Cn();return Mo({name:t,description:e,apiConfig:s.apiConfig})}function ed(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function ta(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=Ae(),s=new Set(e.map(r=>r.name));if(!s.has(t))return t;let o=1;for(;s.has(`${t} (${o})`);)o++;return`${t} (${o})`}var Gc,Mn,kn,Ws=z(()=>{Re();Gc="settings",Mn="api_presets",kn="current_preset"});function Ht(t){return String(t||"").trim()}var Oe,Ye,sa=z(()=>{fe();Te();Bs();Ws();Oe=null;Ye={id:"apiPresetPanel",render(t){let e=Qr(),s=e?.apiConfig||mt(),o=Ht(e?.presetName||ko()),r=kt(),i=Xr().slice(0,8),l=i.length>0?i.map(u=>this._renderPresetItem(u)).join(""):"",c=Oe===null?o||"":Ht(Oe),d=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
                  <span class="yyt-select-value" data-value="${h(c)}">${h(d)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${c?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                    <span class="yyt-option-delete yyt-placeholder"></span>
                  </div>
                  ${r.length>0?r.map(u=>this._renderSelectOption(u,c)).join(""):""}
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
      <div class="yyt-preset-item" data-preset-name="${h(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${h(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${h(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${h(t.name)}">
        <button class="${o}" data-preset="${h(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${r}</button>
        <span class="yyt-option-text">${h(t.name)}</span>
        <button class="yyt-option-delete" data-action="delete" data-preset="${h(t.name)}" title="\u5220\u9664\u9884\u8BBE">
          <i class="fa-solid fa-trash"></i>
        </button>
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

      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u6D41\u5F0F\u54CD\u5E94</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u6309\u6D41\u5F0F\u65B9\u5F0F\u8BF7\u6C42\u6A21\u578B\uFF1B\u5173\u95ED\u5219\u7B49\u5F85\u5B8C\u6574\u7ED3\u679C\u540E\u4E00\u6B21\u6027\u8FD4\u56DE</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${g}-stream" ${t.stream===!0?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div id="${g}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${g}-api-url" 
                   value="${h(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${g}-api-key" 
                     value="${h(t.apiKey||"")}" 
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
                     value="${h(t.model||"")}" 
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
    `},bindEvents(t,e){let s=P();!s||!O(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${g}-preset-dropdown`),o=s.find(".yyt-select-trigger"),r=s.find(".yyt-select-value"),a=()=>{let n=String(r.data("value")||"").trim();if(!n){Oe="",Kt(""),zt(t,mt(),g),t.find(".yyt-preset-item").removeClass("yyt-loaded"),w("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=Ft(n);if(!i){w("error",`\u9884\u8BBE "${n}" \u4E0D\u5B58\u5728`);return}Oe=n,Kt(n),zt(t,i.apiConfig,g),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${n.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),w("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${n}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};o.on("click",n=>{n.preventDefault(),n.stopPropagation(),To(s)}),s.find(".yyt-select-option").on("click",n=>{if(e(n.target).closest(".yyt-option-star, .yyt-option-delete").length)return;let i=e(n.currentTarget),l=i.data("value"),c=i.find(".yyt-option-text").text();Oe=String(l||"").trim(),r.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),i.addClass("yyt-selected"),Rs(s)}),t.find(`#${g}-load-preset`).on("click",()=>{a()}),s.find(".yyt-option-star").on("click",n=>{n.preventDefault(),n.stopPropagation();let i=e(n.currentTarget).data("preset");if(!i)return;let l=Jr(i);if(l.success){w("success",l.message);let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else w("error",l.message)}),s.find(".yyt-option-delete").on("click",n=>{n.preventDefault(),n.stopPropagation();let i=Ht(e(n.currentTarget).data("preset"));if(!i||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${i}" \u5417\uFF1F`))return;let l=Us(i);if(w(l.success?"info":"error",l.message),!l.success)return;$.emit(C.PRESET_DELETED,{name:i}),Ht(Oe)===i&&(Oe=""),Ht(r.data("value"))===i&&r.text("-- \u5F53\u524D\u914D\u7F6E --").data("value","");let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let r=e(s.currentTarget).data("preset-name"),a=e(s.target).closest("[data-action]").data("action");if(a)switch(s.stopPropagation(),a){case"load":t.find(".yyt-select-value").text(r).data("value",r),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${r.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${g}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let n=Us(r);if(w(n.success?"info":"error",n.message),n.success){$.emit(C.PRESET_DELETED,{name:r}),Ht(Oe)===r&&(Oe="");let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${g}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),o=t.find(`#${g}-custom-api-fields`);s?o.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):o.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${g}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${g}-api-key`),o=s.attr("type");s.attr("type",o==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${g}-load-models`).on("click",async()=>{let s=t.find(`#${g}-load-models`),o=t.find(`#${g}-model`),r=t.find(`#${g}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let a=Mt(t,g),n=await Gr(a);if(n.length>0){r.empty(),n.forEach(l=>{r.append(`<option value="${h(l)}">${h(l)}</option>`)}),o.hide(),r.show();let i=o.val();i&&n.includes(i)&&r.val(i),r.off("change").on("change",function(){o.val(e(this).val())}),w("success",`\u5DF2\u52A0\u8F7D ${n.length} \u4E2A\u6A21\u578B`)}else w("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(a){w("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${a.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${g}-model`).on("focus",function(){let s=t.find(`#${g}-model-select`);e(this).show(),s.hide()}),t.find(`#${g}-save-api-config`).on("click",()=>{let s=Mt(t,g),o=Ht(ko()),r=ds(s);if(!r.valid&&!s.useMainApi){w("error",r.errors.join(", "));return}if(o){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${o}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){cs(s),Kt(""),Oe="",w("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let n=t.closest(".yyt-api-manager").parent();n.length&&this.renderTo(n);return}cs(s);let a=Vr(o,{apiConfig:s});if(a.success){Oe=o,w("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${o}"`),Kt(o),$.emit(C.PRESET_UPDATED,{name:o});let n=t.closest(".yyt-api-manager").parent();n.length&&this.renderTo(n)}else w("error",a.message);return}cs(s),w("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${g}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Kt(""),Oe="",cs({url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),w("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${g}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${g}-export-presets`).on("click",()=>{try{let s=Zr();gt(s,`youyou_toolkit_presets_${Date.now()}.json`),w("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){w("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${g}-import-presets`).on("click",()=>{t.find(`#${g}-import-file`).click()}),t.find(`#${g}-import-file`).on("change",async s=>{let o=s.target.files[0];if(o){try{let r=await ft(o),a=ea(r,{overwrite:!0});if(w(a.success?"success":"error",a.message),a.imported>0){let n=t.closest(".yyt-api-manager").parent();n.length&&this.renderTo(n)}}catch(r){w("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let o=kt().map(d=>d.name),r=ta("\u65B0\u9884\u8BBE"),a=`
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
                     value="${h(r)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
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
    `;e(`#${g}-dialog-overlay`).remove(),t.append(a);let n=e(`#${g}-dialog-overlay`),i=e(`#${g}-dialog-preset-name`),l=e(`#${g}-dialog-preset-desc`);i.focus().select();let c=()=>n.remove();n.find(`#${g}-dialog-close, #${g}-dialog-cancel`).on("click",c),n.on("click",function(d){d.target===this&&c()}),n.find(`#${g}-dialog-save`).on("click",()=>{let d=i.val().trim(),u=l.val().trim();if(!d){w("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),i.focus();return}if(o.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Us(d),$.emit(C.PRESET_DELETED,{name:d})}let f=Mt(t,g),y=Mo({name:d,description:u,apiConfig:f});if(y.success){w("success",y.message),c(),$.emit(C.PRESET_CREATED,{preset:y.preset});let m=t.closest(".yyt-api-manager").parent();m.length&&this.renderTo(m)}else w("error",y.message)}),i.on("keypress",function(d){d.which===13&&n.find(`#${g}-dialog-save`).click()})},destroy(t){!P()||!O(t)||(De(t),t.off())},getStyles(){return`
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

      .yyt-option-star.yyt-placeholder,
      .yyt-option-delete.yyt-placeholder {
        visibility: hidden;
      }

      .yyt-option-star.yyt-starred:hover {
        color: #fcd34d;
        background: #4a3c22;
        border-color: rgba(251, 191, 36, 0.26);
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var jn={};de(jn,{MESSAGE_MACROS:()=>Wn,addTagRule:()=>us,createRuleTemplate:()=>Ln,default:()=>od,deleteRulePreset:()=>zn,deleteRuleTemplate:()=>Bn,deleteTagRule:()=>Ro,escapeRegex:()=>Yt,exportRulesConfig:()=>No,extractComplexTag:()=>$n,extractCurlyBraceTag:()=>ia,extractHtmlFormatTag:()=>Rn,extractSimpleTag:()=>na,extractTagContent:()=>qt,generateTagSuggestions:()=>Io,getAllRulePresets:()=>Oo,getAllRuleTemplates:()=>Dn,getContentBlacklist:()=>Gt,getRuleTemplate:()=>On,getTagRules:()=>bt,importRulesConfig:()=>Bo,isValidTagName:()=>aa,loadRulePreset:()=>Lo,saveRulesAsPreset:()=>Do,scanTextForTags:()=>Po,setContentBlacklist:()=>js,setTagRules:()=>$o,shouldSkipContent:()=>ra,testRegex:()=>Un,updateRuleTemplate:()=>Nn,updateTagRule:()=>ys});function td(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...oa],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Ce(){return A.get(In,td())}function nt(t){A.set(In,t)}function Co(){let t=Ce();return ve=t.ruleTemplates||[...oa],oe=t.tagRules||[],Me=t.contentBlacklist||[],{ruleTemplates:ve,tagRules:oe,contentBlacklist:Me}}function Yt(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ra(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(o=>{let r=o.trim().toLowerCase();return r&&s.includes(r)})}function aa(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!sd.includes(t.toLowerCase())}function na(t,e){if(!t||!e)return[];let s=[],o=Yt(e),r=new RegExp(`<${o}>([\\s\\S]*?)<\\/${o}>`,"gi");[...t.matchAll(r)].forEach(l=>{l[1]&&s.push(l[1].trim())});let n=(t.match(new RegExp(`<${o}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return n>i&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${n-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function ia(t,e){if(!t||!e)return[];let s=[],o=Yt(e),r=new RegExp(`\\{${o}\\|`,"gi"),a;for(;(a=r.exec(t))!==null;){let n=a.index,i=n+a[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&s.push(d.trim())}r.lastIndex=n+1}return s}function $n(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let o=s[0].trim(),r=s[1].trim(),a=r.match(/<\/(\w+)>/);if(!a)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let n=a[1],i=new RegExp(`${Yt(o)}([\\s\\S]*?)<\\/${n}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Rn(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let o=s[1],r=[],a=new RegExp(`<${o}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${o}>`,"gi");[...t.matchAll(a)].forEach(c=>{c[1]&&r.push(c[1].trim())});let i=(t.match(new RegExp(`<${o}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return i>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${o}> \u6807\u7B7E`),r}function qt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let o=e.filter(d=>d.type==="exclude"&&d.enabled),r=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),a=e.filter(d=>d.type==="regex_exclude"&&d.enabled),n=t;for(let d of o)try{let u=new RegExp(`<${Yt(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Yt(d.value)}>`,"gi");n=n.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(r.length>0)for(let d of r){let u=[];try{if(d.type==="include")u.push(...na(n,d.value)),u.push(...ia(n,d.value));else if(d.type==="regex_include"){let f=new RegExp(d.value,"gi");[...n.matchAll(f)].forEach(m=>{m[1]&&u.push(m[1])})}}catch(f){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:f})}u.forEach(f=>i.push(f.trim()))}else i.push(n);let l=[];for(let d of i){for(let u of a)try{let f=new RegExp(u.value,"gi");d=d.replace(f,"")}catch(f){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:f})}ra(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Po(t,e={}){let s=performance.now(),{chunkSize:o=5e4,maxTags:r=100,timeoutMs:a=5e3}=e,n=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=o){let f=t.slice(u,Math.min(u+o,t.length));if(c++,l+=f.length,performance.now()-s>a){console.warn(`[YouYouToolkit] Tag scanning timed out after ${a}ms`);break}let y;for(;(y=i.exec(f))!==null&&n.size<r;){let m=(y[1]||y[2]).toLowerCase();aa(m)&&n.add(m)}if(n.size>=r)break;c%5===0&&await new Promise(m=>setTimeout(m,0))}let d=performance.now();return{tags:Array.from(n).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:n.size}}}function Io(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Dn(){return ve.length===0&&Co(),ve}function On(t){return ve.find(e=>e.id===t)}function Ln(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return ve.push(e),la(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Nn(t,e){let s=ve.findIndex(o=>o.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ve[s]={...ve[s],...e,updatedAt:new Date().toISOString()},la(),{success:!0,template:ve[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Bn(t){let e=ve.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ve.splice(e,1),la(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function la(){let t=Ce();t.ruleTemplates=ve,nt(t)}function bt(){return oe||Co(),oe}function $o(t){oe=t||[];let e=Ce();e.tagRules=oe,nt(e)}function us(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};oe.push(e);let s=Ce();return s.tagRules=oe,nt(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function ys(t,e){if(t<0||t>=oe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};oe[t]={...oe[t],...e};let s=Ce();return s.tagRules=oe,nt(s),{success:!0,rule:oe[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Ro(t){if(t<0||t>=oe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};oe.splice(t,1);let e=Ce();return e.tagRules=oe,nt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Gt(){return Me||Co(),Me}function js(t){Me=t||[];let e=Ce();e.contentBlacklist=Me,nt(e)}function Do(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Ce();s.tagRulePresets||(s.tagRulePresets={});let o=`preset-${Date.now()}`;return s.tagRulePresets[o]={id:o,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(oe)),blacklist:JSON.parse(JSON.stringify(Me)),createdAt:new Date().toISOString()},nt(s),{success:!0,preset:s.tagRulePresets[o],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Oo(){let e=Ce().tagRulePresets||{};return Object.values(e)}function Lo(t){let e=Ce(),o=(e.tagRulePresets||{})[t];return o?(oe=JSON.parse(JSON.stringify(o.rules||[])),Me=JSON.parse(JSON.stringify(o.blacklist||[])),e.tagRules=oe,e.contentBlacklist=Me,nt(e),{success:!0,preset:o,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function zn(t){let e=Ce(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,nt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function No(){return JSON.stringify({tagRules:oe,contentBlacklist:Me,ruleTemplates:ve,tagRulePresets:Ce().tagRulePresets||{}},null,2)}function Bo(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)oe=s.tagRules||[],Me=s.contentBlacklist||[],ve=s.ruleTemplates||oa;else if(s.tagRules&&oe.push(...s.tagRules),s.contentBlacklist){let r=new Set(Me.map(a=>a.toLowerCase()));s.contentBlacklist.forEach(a=>{r.has(a.toLowerCase())||Me.push(a)})}let o=Ce();return o.tagRules=oe,o.contentBlacklist=Me,o.ruleTemplates=ve,s.tagRulePresets&&(o.tagRulePresets={...o.tagRulePresets||{},...s.tagRulePresets}),nt(o),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Un(t,e,s="g",o=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(t,s),a=[];if(s.includes("g")){let n;for(;(n=r.exec(e))!==null;)n.length>1?a.push({fullMatch:n[0],groups:n.slice(1),index:n.index,extracted:n[o]||n[1]||n[0]}):a.push({fullMatch:n[0],groups:[],index:n.index,extracted:n[0]})}else{let n=r.exec(e);n&&a.push({fullMatch:n[0],groups:n.length>1?n.slice(1):[],index:n.index,extracted:n.length>1?n[o]||n[1]:n[0]})}return{success:!0,matches:a,count:a.length,extracted:a.map(n=>n.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var In,sd,oa,ve,oe,Me,Wn,od,zo=z(()=>{Re();In="settings";sd=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],oa=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],ve=[],oe=[],Me=[];Wn={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Co();od={extractTagContent:qt,extractSimpleTag:na,extractCurlyBraceTag:ia,extractComplexTag:$n,extractHtmlFormatTag:Rn,escapeRegex:Yt,shouldSkipContent:ra,isValidTagName:aa,scanTextForTags:Po,generateTagSuggestions:Io,getAllRuleTemplates:Dn,getRuleTemplate:On,createRuleTemplate:Ln,updateRuleTemplate:Nn,deleteRuleTemplate:Bn,getTagRules:bt,setTagRules:$o,addTagRule:us,updateTagRule:ys,deleteTagRule:Ro,getContentBlacklist:Gt,setContentBlacklist:js,saveRulesAsPreset:Do,getAllRulePresets:Oo,loadRulePreset:Lo,deleteRulePreset:zn,exportRulesConfig:No,importRulesConfig:Bo,testRegex:Un,MESSAGE_MACROS:Wn}});var qe,ca=z(()=>{fe();Te();zo();qe={id:"regexExtractPanel",render(t){let e=bt(),s=Gt(),o=Oo();return`
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
    `},_renderRulesEditor(t,e,s){let o=t.length>0?t.map((a,n)=>this._renderRuleItem(a,n)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=s.length>0?s.map(a=>`<option value="${a.id}">${h(a.name)}</option>`).join(""):"";return`
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
          ${o}
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
                 value="${h(e.join(", "))}" 
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
               value="${h(t.value||"")}">
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
    `},bindEvents(t,e){let s=P();!s||!O(t)||(t.off(".yytRegex"),this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s),we(t,{namespace:"yytRegexSelect",selectors:[`#${g}-rule-preset-select`]}))},_bindRuleEditorEvents(t,e){t.on("change.yytRegex",".yyt-rule-type",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val();ys(o,{type:r}),w("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.on("change.yytRegex",".yyt-rule-value",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val().trim();ys(o,{value:r})}),t.on("change.yytRegex",".yyt-rule-enabled",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).is(":checked");ys(o,{enabled:r}),w("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.on("click.yytRegex",".yyt-rule-delete",s=>{let r=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ro(r),this.renderTo(t),w("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click.yytRegex",`#${g}-add-rule`,()=>{us({type:"include",value:"",enabled:!0}),this.renderTo(t),w("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.on("click.yytRegex",`#${g}-scan-tags`,async()=>{let s=t.find(`#${g}-scan-tags`),o=t.find(`#${g}-test-input`).val();if(!o||!o.trim()){w("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await Po(o,{maxTags:50,timeoutMs:3e3}),{suggestions:a,stats:n}=Io(r,25);if(a.length===0){w("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${g}-tag-suggestions-container`).hide();return}let i=t.find(`#${g}-tag-list`);t.find(`#${g}-tag-scan-stats`).text(`${n.finalCount}/${n.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),i.empty(),a.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${h(c)}</button>`);d.on("click",()=>{if(bt().some(y=>y.type==="include"&&y.value===c)){w("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}us({type:"include",value:c,enabled:!0}),this.renderTo(t),w("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),i.append(d)}),t.find(`#${g}-tag-suggestions-container`).show(),w("success",`\u53D1\u73B0 ${a.length} \u4E2A\u6807\u7B7E`)}catch(r){w("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.on("click.yytRegex",`#${g}-add-exclude-cot`,()=>{let s=bt(),o="<!--[\\s\\S]*?-->";if(s.some(a=>a.type==="regex_exclude"&&a.value===o)){w("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}us({type:"regex_exclude",value:o,enabled:!0}),this.renderTo(t),w("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.on("change.yytRegex",`#${g}-content-blacklist`,function(){let o=e(this).val().split(",").map(r=>r.trim()).filter(r=>r);js(o),w("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${o.length} \u4E2A\u5173\u952E\u8BCD`)}),t.on("click.yytRegex",`#${g}-show-examples`,()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.on("click.yytRegex",`#${g}-load-rule-preset`,()=>{let s=t.find(`#${g}-rule-preset-select`).val();if(!s){w("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let o=Lo(s);o.success?(this.renderTo(t),w("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${o.preset.name}`),$.emit(C.REGEX_PRESET_LOADED,{preset:o.preset})):w("error",o.message)}),t.on("click.yytRegex",`#${g}-save-rule-preset`,()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let o=Do(s.trim());o.success?(this.renderTo(t),w("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):w("error",o.message)})},_bindTestEvents(t,e){t.on("click.yytRegex",`#${g}-test-extract`,()=>{let s=t.find(`#${g}-test-input`).val();if(!s||!s.trim()){w("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let o=bt(),r=Gt(),a=qt(s,o,r),n=t.find(`#${g}-test-result-container`),i=t.find(`#${g}-test-result`);n.show(),!a||!a.trim()?(i.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),w("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(i.html(`<pre class="yyt-code-block">${h(a)}</pre>`),w("success","\u63D0\u53D6\u5B8C\u6210"),$.emit(C.REGEX_EXTRACTED,{result:a}))}),t.on("click.yytRegex",`#${g}-test-clear`,()=>{t.find(`#${g}-test-input`).val(""),t.find(`#${g}-test-result-container`).hide()})},_bindFileEvents(t,e){t.on("click.yytRegex",`#${g}-import-rules`,()=>{t.find(`#${g}-import-rules-file`).click()}),t.on("change.yytRegex",`#${g}-import-rules-file`,async s=>{let o=s.target.files[0];if(o){try{let r=await ft(o),a=Bo(r,{overwrite:!0});a.success?(this.renderTo(t),w("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):w("error",a.message)}catch(r){w("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.on("click.yytRegex",`#${g}-export-rules`,()=>{try{let s=No();gt(s,`youyou_toolkit_rules_${Date.now()}.json`),w("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){w("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytRegex",`#${g}-reset-rules`,()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&($o([]),js([]),this.renderTo(t),w("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!P()||!O(t)||(ye(t,"yytRegexSelect"),t.off(".yytRegex"))},getStyles(){return`
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

      .yyt-rule-item > .yyt-select,
      .yyt-rule-item > .yyt-input {
        min-width: 0;
      }

      .yyt-rule-item > .yyt-rule-type {
        flex: 2 1 148px !important;
        min-width: 132px !important;
      }

      .yyt-rule-item > .yyt-rule-value {
        flex: 5 1 0 !important;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Jn={};de(Jn,{createDefaultToolDefinition:()=>Vt,default:()=>id,deleteTool:()=>jo,deleteToolPreset:()=>qn,exportTools:()=>Ho,getAllTools:()=>Ct,getCurrentToolPreset:()=>Gn,getTool:()=>ps,getToolPresets:()=>Fo,importTools:()=>Yo,normalizeToolDefinitionToRuntimeConfig:()=>Ks,resetTools:()=>qo,saveTool:()=>Wo,saveToolPreset:()=>Yn,setCurrentToolPreset:()=>Vn,setToolEnabled:()=>Ko});function rd(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,s])=>[e,Vt({...s||{},id:e})]))}function Fs(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function da(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function Fn(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>=0?s:e}function Kn(t={}){return{enabled:t?.enabled===!0,settleMs:Fn(t?.settleMs,1200),cooldownMs:Fn(t?.cooldownMs,5e3)}}function Hn(t={}){return{enabled:t?.enabled===!0,selected:Fs(t?.selected)}}function ad(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function nd(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let o=ad(e?.config?.messages||[]);return o||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Vt(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...Le,...t,id:t?.id||Le.id,icon:t?.icon||Le.icon,order:Number.isFinite(t?.order)?t.order:Le.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Le.promptTemplate,extractTags:Fs(t?.extractTags),config:{execution:{...Le.config.execution,...s.execution||{},timeout:da(s?.execution?.timeout,Le.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||Le.config.execution.retries)},api:{...Le.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...Le.config.context,...s.context||{},depth:da(s?.context?.depth,Le.config.context.depth),includeTags:Fs(s?.context?.includeTags),excludeTags:Fs(s?.context?.excludeTags)},automation:Kn(s?.automation),worldbooks:Hn(s?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Le.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Ks(t,e={},s={}){let o=Vt({...e,id:t||e?.id||""}),r=Fs(o?.extractTags?.length?o.extractTags:o?.config?.context?.includeTags),a=String(e?.output?.apiPreset||o?.config?.api?.preset||"").trim(),n=nd(t,o),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:o.id||t,name:o.name||t,icon:o.icon||"fa-screwdriver-wrench",description:o.description||"",enabled:o.enabled!==!1,order:Number.isFinite(o.order)?o.order:100,bypass:{enabled:o?.config?.api?.useBypass===!0&&!!o?.config?.api?.bypassPreset,presetId:o?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:a,overwrite:!0,enabled:!0},automation:Kn(o?.config?.automation),worldbooks:Hn(o?.config?.worldbooks),extraction:{enabled:!0,maxMessages:da(o?.config?.context?.depth,5),selectors:r},promptTemplate:n,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:a,extractTags:r,isCustom:!0,category:o.category||"utility",metadata:{...o.metadata||{}}}}function Ct(){let t=ee.get(le.TOOLS),e=rd(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&ee.set(le.TOOLS,e),{...Uo,...e}}function ps(t){return Ct()[t]||null}function Wo(t,e){if(!t||!e)return!1;let s=ee.get(le.TOOLS)||{},o=!s[t]&&!Uo[t],r=Vt({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=r,ee.set(le.TOOLS,s),$.emit(o?C.TOOL_REGISTERED:C.TOOL_UPDATED,{toolId:t,tool:r}),!0}function jo(t){let e=ee.get(le.TOOLS)||{};return!e[t]&&!Uo[t]||Uo[t]?!1:(delete e[t],ee.set(le.TOOLS,e),$.emit(C.TOOL_UNREGISTERED,{toolId:t}),!0)}function Fo(){return ee.get(le.PRESETS)||{}}function Yn(t,e){if(!t||!e)return!1;let s=Fo(),o=!s[t];return s[t]={...e,name:t,updatedAt:new Date().toISOString()},ee.set(le.PRESETS,s),$.emit(o?C.PRESET_CREATED:C.PRESET_UPDATED,{type:"tool",presetName:t,preset:s[t]}),!0}function qn(t){let e=Fo();return e[t]?(delete e[t],ee.set(le.PRESETS,e),$.emit(C.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Gn(){return ee.get(le.CURRENT_PRESET)||""}function Vn(t){return ee.set(le.CURRENT_PRESET,t||""),$.emit(C.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function Ko(t,e){let s=ps(t);if(!s)return!1;let o=ee.get(le.TOOLS)||{};return o[t]=Vt({...s,id:t,enabled:e,metadata:{...s?.metadata||{},createdAt:s?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),ee.set(le.TOOLS,o),$.emit(e?C.TOOL_ENABLED:C.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Ho(){let t=ee.get(le.TOOLS)||{},e=ee.get(le.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Yo(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,o=JSON.parse(t);if(!o||typeof o!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=s?{}:ee.get(le.TOOLS)||{},a=s?{}:ee.get(le.PRESETS)||{},n=0,i=0;if(o.tools&&typeof o.tools=="object"){for(let[l,c]of Object.entries(o.tools))!c||typeof c!="object"||(r[l]=Vt({...c,id:l}),n+=1);ee.set(le.TOOLS,r)}if(o.presets&&typeof o.presets=="object"){for(let[l,c]of Object.entries(o.presets))!c||typeof c!="object"||(a[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);ee.set(le.PRESETS,a)}return{success:!0,toolsImported:n,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function qo(){ee.remove(le.TOOLS),ee.remove(le.PRESETS),ee.remove(le.CURRENT_PRESET)}var Le,Uo,le,id,Go=z(()=>{Re();fe();Le={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Uo={},le={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};id={getAllTools:Ct,getTool:ps,saveTool:Wo,deleteTool:jo,setToolEnabled:Ko,exportTools:Ho,importTools:Yo,resetTools:qo,getToolPresets:Fo,saveToolPreset:Yn,deleteToolPreset:qn,getCurrentToolPreset:Gn,setCurrentToolPreset:Vn,createDefaultToolDefinition:Vt,normalizeToolDefinitionToRuntimeConfig:Ks}});var fi={};de(fi,{TOOL_CATEGORIES:()=>Xn,TOOL_REGISTRY:()=>gs,appendToolRuntimeHistory:()=>ci,clearToolApiPreset:()=>ni,default:()=>fd,ensureToolRuntimeConfig:()=>Vo,getAllDefaultToolConfigs:()=>ui,getAllToolApiBindings:()=>ii,getAllToolFullConfigs:()=>Vs,getEnabledTools:()=>yi,getToolApiPreset:()=>fa,getToolBaseConfig:()=>fs,getToolConfig:()=>qs,getToolFullConfig:()=>Z,getToolList:()=>si,getToolSubTabs:()=>oi,getToolWindowState:()=>gi,hasTool:()=>ga,onPresetDeleted:()=>li,patchToolRuntime:()=>Gs,registerTool:()=>ei,resetToolConfig:()=>di,resetToolRegistry:()=>ri,saveToolConfig:()=>Be,saveToolWindowState:()=>pi,setToolApiPreset:()=>ai,setToolApiPresetConfig:()=>yd,setToolBypassConfig:()=>pd,setToolOutputMode:()=>ud,setToolPromptTemplate:()=>gd,unregisterTool:()=>ti,updateToolRuntime:()=>ma});function Hs(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function ld(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Qn(){let t=Ct()||{};return Object.entries(t).filter(([e])=>!Ys[e]).map(([e,s])=>[e,s||{}])}function ua(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Zn(){let t=Array.isArray(gs.tools?.subTabs)?gs.tools.subTabs.map((s,o)=>({...s,order:Number.isFinite(s?.order)?s.order:o,toolKind:ua(s),toolGroupLabel:ua(s)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Qn().map(([s,o],r)=>{let a=Ks(s,o),n=ua(a);return{id:s,name:a.name||s,icon:a.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(a.order)?a.order:100+r,isCustom:!0,description:a.description||"",toolKind:n,toolGroupLabel:n==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((s,o)=>(s.order??0)-(o.order??0))}function cd(t,e={}){let s=Ks(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:Hs(s.runtime)}}function pa(t){let e=Ys[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:Hs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let o=(Ct()||{})[t]||null;return o?cd(t,o):qs(t)}function fs(t){let e=pa(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function dd(t,e={},s=""){if(!t)return null;let o={...t,...e,id:t.id||e.id};o.output={...t.output||{},...e.output||{}},o.automation={enabled:t?.automation?.enabled===!0||e?.automation?.enabled===!0,settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},o.bypass={...t.bypass||{},...e.bypass||{}},o.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},o.runtime=Hs({...t.runtime||{},...e.runtime||{}}),o.extraction={...t.extraction||{},...e.extraction||{}},o.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let r=e?.output?.apiPreset||e?.apiPreset||o.output?.apiPreset||o.apiPreset||s||"";return o.output={...o.output||{},apiPreset:r},o.apiPreset=r,(!Array.isArray(o.extraction.selectors)||o.extraction.selectors.length===0)&&Array.isArray(o.extractTags)&&o.extractTags.length>0&&(o.extraction.selectors=[...o.extractTags]),(!Array.isArray(o.extractTags)||o.extractTags.length===0)&&(o.extractTags=Array.isArray(o.extraction.selectors)?[...o.extraction.selectors]:[]),t.isCustom?o.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?o.enabled=e.enabled:o.enabled=t.enabled!==!1,o}function ei(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let o of s)if(!e[o])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${o}`),!1;return it[t]={id:t,...e,order:e.order??Object.keys(it).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function ti(t){return it[t]?(delete it[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function si(t=!0){let e=Object.values(it).map(s=>s.id==="tools"?{...s,subTabs:Zn()}:s);return t?e.sort((s,o)=>(s.order??0)-(o.order??0)):e}function qs(t){return t==="tools"&&it[t]?{...it[t],subTabs:Zn()}:it[t]||null}function ga(t){return!!it[t]}function oi(t){let e=qs(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function ri(){it={...gs},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function ai(t,e){if(!ga(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=A.get(Ne)||{};return s[t]=e||"",A.set(Ne,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function fa(t){return(A.get(Ne)||{})[t]||""}function ni(t){let e=A.get(Ne)||{};delete e[t],A.set(Ne,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function ii(){return A.get(Ne)||{}}function li(t){let e=A.get(Ne)||{},s=!1;for(let o in e)e[o]===t&&(e[o]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${o}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&A.set(Ne,e)}function Z(t){let e=pa(t);if(!e)return qs(t);let o=(A.get(Jt)||{})[t]||{},r=fa(t);return dd({...e,id:t},o,r)}function Vo(t){if(!t)return!1;let e=pa(t);if(!e)return!1;let s=A.get(Jt)||{};if(s[t])return!0;let o={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};s[t]=o,A.set(Jt,s);let r=A.get(Ne)||{};return r[t]=o.output?.apiPreset||o.apiPreset||"",A.set(Ne,r),$.emit(C.TOOL_UPDATED,{toolId:t,config:o}),!0}function Be(t,e,s={}){if(!t||!Z(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:o=!0}=s,r=A.get(Jt)||{},a=A.get(Ne)||{},n=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return r[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){r[t][l]={...e.output,apiPreset:n};return}if(l==="apiPreset"){r[t][l]=n;return}r[t][l]=e[l]}}),r[t].apiPreset===void 0&&(r[t].apiPreset=n),!r[t].output&&e.output!==void 0&&(r[t].output={...e.output||{},apiPreset:n}),A.set(Jt,r),a[t]=n,A.set(Ne,a),o&&$.emit(C.TOOL_UPDATED,{toolId:t,config:r[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function ud(t,e){let s=Z(t);return s?Be(t,{...s,output:{...s.output,mode:e}}):!1}function yd(t,e){let s=Z(t);return s?Be(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function pd(t,e){let s=Z(t);return s?Be(t,{...s,bypass:{...s.bypass,...e}}):!1}function gd(t,e){let s=Z(t);return s?Be(t,{...s,promptTemplate:e}):!1}function Gs(t,e,s={}){let o=Z(t);if(!o)return!1;let{touchLastRunAt:r=!1,emitEvent:a=!1}=s,n=Hs({...o.runtime||{},...e||{}});return r&&(n.lastRunAt=Date.now()),Be(t,{...o,runtime:n},{emitEvent:a})}function ci(t,e,s={},o={}){let r=Z(t);if(!r)return!1;let{limit:a=10,emitEvent:n=!1}=o,i=Hs(r.runtime||{}),l="recentWritebackHistory",c={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return i[l]=ld([...Array.isArray(i[l])?i[l]:[],c],a),c?.traceId&&(i.lastTraceId=c.traceId),Be(t,{...r,runtime:i},{emitEvent:n})}function ma(t,e){return Gs(t,e,{touchLastRunAt:!0,emitEvent:!0})}function di(t){if(!t||!Ys[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=A.get(Jt)||{};return delete e[t],A.set(Jt,e),$.emit(C.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function ui(){return{...Ys}}function Vs(){let t=new Set([...Object.keys(Ys),...Qn().map(([e])=>e)]);return Array.from(t).map(e=>Z(e)).filter(Boolean)}function yi(){return Vs().filter(t=>t&&t.enabled)}function pi(t,e){let s=A.get(ya)||{};s[t]={...e,updatedAt:Date.now()},A.set(ya,s)}function gi(t){return(A.get(ya)||{})[t]||null}var Jt,Ne,ya,Ys,gs,Xn,it,fd,Pt=z(()=>{Re();fe();Go();Jt="tool_configs",Ne="tool_api_bindings",ya="tool_window_states";Ys={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},gs={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7}},Xn={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},it={...gs};fd={TOOL_REGISTRY:gs,TOOL_CATEGORIES:Xn,registerTool:ei,unregisterTool:ti,getToolList:si,getToolConfig:qs,hasTool:ga,getToolSubTabs:oi,resetToolRegistry:ri,setToolApiPreset:ai,getToolApiPreset:fa,clearToolApiPreset:ni,getAllToolApiBindings:ii,onPresetDeleted:li,saveToolWindowState:pi,getToolWindowState:gi,getToolBaseConfig:fs,ensureToolRuntimeConfig:Vo,getToolFullConfig:Z,patchToolRuntime:Gs,appendToolRuntimeHistory:ci,saveToolConfig:Be,resetToolConfig:di,getAllDefaultToolConfigs:ui,getAllToolFullConfigs:Vs,getEnabledTools:yi}});var Ge,ba=z(()=>{Te();Go();Pt();Ge={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){w("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=Ct(),s=Object.entries(e),o=s.filter(([,r])=>r?.enabled!==!1).length;return`
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
            <span class="yyt-tool-name">${h(o.name)}</span>
            <span class="yyt-tool-category">${h(o.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${o.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${h(o.description)}</div>
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
      `},bindEvents(t,e){let s=P();!s||!O(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",s=>{let o=e(s.currentTarget).closest(".yyt-tool-item"),r=o.data("tool-id"),a=e(s.currentTarget).is(":checked");Ko(r,a),o.toggleClass("yyt-enabled",a).toggleClass("yyt-disabled",!a),w("info",a?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="config"]',s=>{let o=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(o)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="edit"]',s=>{let o=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,o)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="delete"]',s=>{let o=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),r=ps(o);if(!o||!r||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${r.name}\u201D\u5417\uFF1F`))return;if(!jo(o)){w("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),w("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async s=>{let o=s.target.files[0];if(o){try{let r=await ft(o),a=Yo(r,{overwrite:!1});w(a.success?"success":"error",a.message),a.success&&this.renderTo(t)}catch(r){w("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let s=Ho();gt(s,`youyou_toolkit_tools_${Date.now()}.json`),w("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){w("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(qo(),this.renderTo(t),w("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let o=s?ps(s):null,r=!!o,a=`
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
                       value="${o?h(o.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${o?h(o.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(a);let n=e("#yyt-tool-dialog-overlay");we(n,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let i=()=>{ye(n,"yytToolManageDialogSelect"),n.remove()};n.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",i),n.on("click",function(l){l.target===this&&i()}),n.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),u=parseInt(e("#yyt-tool-timeout").val())||6e4,f=parseInt(e("#yyt-tool-retries").val())||3;if(!l){w("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let y=s||`tool_${Date.now()}`;if(!Wo(y,{name:l,category:c,description:d,promptTemplate:o?.promptTemplate||"",extractTags:Array.isArray(o?.extractTags)?o.extractTags:[],config:{execution:{timeout:u,retries:f},api:o?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(o?.config?.messages)?o.config.messages:[],context:{depth:o?.config?.context?.depth||3,includeTags:Array.isArray(o?.config?.context?.includeTags)?o.config.context.includeTags:[],excludeTags:Array.isArray(o?.config?.context?.excludeTags)?o.config.context.excludeTags:[]},worldbooks:{enabled:o?.config?.worldbooks?.enabled===!0,selected:Array.isArray(o?.config?.worldbooks?.selected)?o.config.worldbooks.selected:[]}},enabled:o?.enabled!==!1})){w("error",r?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Vo(y),i(),this.renderTo(t),w("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),r||this._openToolConfig(y)})},destroy(t){let e=P();!e||!O(t)||(ye(e("#yyt-tool-dialog-overlay"),"yytToolManageDialogSelect"),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});function ms(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Jo(){return ms()?.SillyTavern||null}function J(t){return t==null?"":String(t).trim()}function md(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s.trim();return""}function bd(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function mi(t=""){let e=String(t||"").trim();if(!e)return"empty";let s=0;for(let o=0;o<e.length;o+=1)s=(s<<5)-s+e.charCodeAt(o),s|=0;return`fp_${Math.abs(s).toString(36)}`}function bi(t={}){let e=J(t.chatId)||"chat_default",s=J(t.messageId)||"latest";return`${e}::${s}`}function hi(t={}){let e=bi(t),s=J(t.effectiveSwipeId)||"swipe:current",o=J(t.assistantContentFingerprint)||"empty";return`${e}::${s}::${o}`}function hd(t={}){let e=hi(t),s=J(t.eventType)||"MANUAL",o=J(t.traceId)||vi("manual");return`${e}::${s}::${o}`}function vi(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function xi(){let t=Jo();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function wi(t=[]){let e=[],s=null,o=null;return t.forEach((r,a)=>{let n=bd(r),i=md(r);if(!i)return;let l=J(r?.messageId??r?.message_id??r?.id??r?.mid??r?.mesid??r?.chat_index??a),c=J(r?.swipe_id??r?.swipeId??r?.swipe??""),d={role:n,content:i,sourceId:l,swipeId:c,raw:r,index:a};e.push(d),n==="user"&&(s=d),n==="assistant"&&(o=d)}),{messages:e,lastUserMessage:s,lastAiMessage:o}}function vd(t,e,s){return J(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??s?.id??"chat_default")||"chat_default"}async function ha(){let t=Jo();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let o=s[e];return{id:e,name:o?.name||"",description:o?.description||"",personality:o?.personality||"",scenario:o?.scenario||"",firstMes:o?.first_mes||"",mesExample:o?.mes_example||""}}}catch(e){console.error("[YouYouToolkit:ExecutionContext] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function xd(t="",e=null){let s=String(t||""),o=e?.YouYouToolkit_toolOutputs;return o&&typeof o=="object"&&Object.values(o).forEach(r=>{let a=String(r?.blockText||r?.content||"").trim();a&&s.includes(a)&&(s=s.replace(a,"").trimEnd())}),s.trim()}function wd(t,e={}){let s=Array.isArray(t?.messages)?t.messages:[],o=J(e.messageId),r=J(e.swipeId);if(!o)return t?.lastAiMessage||null;let a=s.filter(i=>i.role==="assistant"),n=a.find(i=>i.sourceId!==o?!1:r?J(i.swipeId)===r:!0);return n||a.find(i=>i.sourceId===o)||null}function Ti({api:t,stContext:e,character:s,conversation:o,targetAssistantMessage:r,runSource:a="MANUAL"}={}){let n=o?.messages||[],i=o?.lastUserMessage||null,l=J(r?.sourceId)||"",c=J(r?.swipeId)||"swipe:current",d=r?.content||"",u=xd(d,r?.raw||null),f=mi(d),y=mi(u),m=vd(t,e,s),b=vi(String(a||"manual").toLowerCase()),x=bi({chatId:m,messageId:l}),E=hi({chatId:m,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:y});return{startedAt:Date.now(),runSource:a,traceId:b,chatId:m,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:x,slotRevisionKey:E,slotTransactionId:hd({chatId:m,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:y,eventType:a,traceId:b}),executionKey:E,lastAiMessage:d,assistantContentFingerprint:f,assistantBaseText:u,assistantBaseFingerprint:y,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:r,chatMessages:n,characterCard:s,chatHistory:n,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:n.length||0}},config:{},status:"pending"}}async function Xt({runSource:t="MANUAL"}={}){let e=Jo(),s=e?.getContext?.()||null,o=await ha(),r=xi(),a=wi(r),n=a?.lastAiMessage||null;return Ti({api:e,stContext:s,character:o,conversation:a,targetAssistantMessage:n,runSource:t})}async function Js({messageId:t,swipeId:e="",runSource:s="AUTO"}={}){let o=Jo(),r=o?.getContext?.()||null,a=await ha(),n=xi(),i=wi(n),l=wd(i,{messageId:t,swipeId:e});return Ti({api:o,stContext:r,character:a,conversation:i,targetAssistantMessage:l,runSource:s})}var bs=z(()=>{});function Si(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return ms()?.TavernHelper||null}function Td(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return ms()?.SillyTavern||null}function Xs(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function va(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(s=>{let o=t[s];Array.isArray(o)?e[s]=o.map(r=>typeof r=="string"?r:r&&typeof r=="object"?r.name||r.id||r.title||"[object]":String(r??"")):o&&typeof o=="object"?e[s]="[object]":e[s]=o}),e}return t}function Sd(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let s=[t.comment,t.key,t.keysecondary,t.text].map(o=>String(o||"").trim()).find(Boolean);return s&&s!==e?`## ${s}
${e}`:e}function Qs(){return Array.isArray(xa)?[...xa]:[]}function _i(){return wa?{...wa}:null}async function _d(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Xs([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return console.warn("[ToolWorldbookService] \u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function Ed(t,e){if(t&&typeof t.getLorebooks=="function")try{let s=Xs(await Promise.resolve(t.getLorebooks()));if(s.length>0)return s}catch(s){console.warn("[ToolWorldbookService] \u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}if(e&&typeof e.getWorldBooks=="function")try{let s=await Promise.resolve(e.getWorldBooks()),o=Xs(Array.isArray(s)?s.map(r=>r?.name??r):[]);if(o.length>0)return o}catch(s){console.warn("[ToolWorldbookService] \u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}return[]}async function Ei(){let t=Si(),e=Td(),s={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!ms()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!ms()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{s.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?va(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(n){s.errors.push(`getLorebooks: ${n?.message||n}`)}try{s.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?va(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(n){s.errors.push(`getCharLorebooks: ${n?.message||n}`)}try{s.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?va(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(n){s.errors.push(`getWorldBooks: ${n?.message||n}`)}let o=await _d(t),r=await Ed(t,e),a=Xs([...o,...r]);return s.characterWorldbooks=[...o],s.allWorldbooks=[...r],s.combinedWorldbooks=[...a],wa=s,xa=a,[...a]}async function Ai(t){let e=Xs(t?.worldbooks?.selected);if(t?.worldbooks?.enabled!==!0||e.length===0)return"";let s=Si();if(!s||typeof s.getLorebookEntries!="function")return console.warn("[ToolWorldbookService] TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let o=[];for(let r of e)try{let a=await s.getLorebookEntries(r),i=(Array.isArray(a)?a.filter(l=>l?.enabled!==!1):[]).map(Sd).filter(Boolean).join(`

`);i&&o.push(`[\u4E16\u754C\u4E66\uFF1A${r}]
${i}`)}catch(a){console.warn(`[ToolWorldbookService] \u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${r}`,a)}return o.join(`

`)}var xa,wa,Ta=z(()=>{bs();xa=[],wa=null});var Mi={};de(Mi,{BypassManager:()=>Xo,DEFAULT_BYPASS_PRESETS:()=>vt,addMessage:()=>Ld,buildBypassMessages:()=>Wd,bypassManager:()=>Y,createPreset:()=>Cd,default:()=>jd,deleteMessage:()=>Bd,deletePreset:()=>Id,duplicatePreset:()=>$d,exportPresets:()=>zd,getAllPresets:()=>Md,getDefaultPresetId:()=>Rd,getEnabledMessages:()=>Od,getPreset:()=>kd,getPresetList:()=>_a,importPresets:()=>Ud,setDefaultPresetId:()=>Dd,updateMessage:()=>Nd,updatePreset:()=>Pd});var ht,hs,Sa,vt,Ad,Xo,Y,Md,_a,kd,Cd,Pd,Id,$d,Rd,Dd,Od,Ld,Nd,Bd,zd,Ud,Wd,jd,Zs=z(()=>{Re();fe();ht="bypass_presets",hs="default_bypass_preset",Sa="current_bypass_preset",vt={},Ad=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),Xo=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=A.get(ht,{});return this._cache={...vt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,o)=>(o.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:o,description:r,messages:a}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!o||typeof o!="string"||!o.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=s.trim();if(this.presetExists(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let i={id:n,name:o.trim(),description:r||"",enabled:!0,messages:a||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(n,i),$.emit(C.BYPASS_PRESET_CREATED,{presetId:n,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${n}`),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...o,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,r),$.emit(C.BYPASS_PRESET_UPDATED,{presetId:e,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${o.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(vt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=A.get(ht,{});return delete o[e],A.set(ht,o),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),$.emit(C.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,o){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let a={...JSON.parse(JSON.stringify(r)),id:s.trim(),name:o||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),a),$.emit(C.BYPASS_PRESET_CREATED,{presetId:s,preset:a}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${a.name}"`,preset:a}}addMessage(e,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},a=[...o.messages||[],r];return this.updatePreset(e,{messages:a})}updateMessage(e,s,o){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let a=r.messages||[],n=a.findIndex(l=>l.id===s);if(n===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let i=[...a];return i[n]={...i[n],...o},this.updatePreset(e,{messages:i})}deleteMessage(e,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=o.messages||[],a=r.find(i=>i.id===s);if(!a)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(a.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let n=r.filter(i=>i.id!==s);return this.updatePreset(e,{messages:n})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(o=>o.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=A.get(hs,null);return e==="undefined"||e==="null"||e===""?(A.remove(hs),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(A.set(hs,e),$.emit(C.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let o=this.getPreset(e);if(!o)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(o,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:o=!1}=s,r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=Array.isArray(r)?r:r.presets?r.presets:[r];if(a.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=A.get(ht,{}),i=0;for(let l of a)!l.id||typeof l.id!="string"||l.name&&(vt[l.id]&&!o||!o&&n[l.id]||(n[l.id]={...l,updatedAt:Date.now()},i++));return i>0&&(A.set(ht,n),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let o=A.get(ht,{});o[e]=s,A.set(ht,o),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=A.get(ht,{}),s={},o=!1,r=Array.isArray(e)?e.map((a,n)=>[a?.id||a?.name||`legacy_${n}`,a]):Object.entries(e||{});for(let[a,n]of r){let i=this._normalizePreset(a,n,s);if(!i){o=!0;continue}s[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(o=!0)}o&&A.set(ht,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,o={}){if(!s||typeof s!="object")return null;let r=typeof s.name=="string"?s.name.trim():"",a=typeof s.id=="string"?s.id.trim():"",n=typeof e=="string"?e.trim():"";if(!r&&n&&n!=="undefined"&&n!=="null"&&(r=n),this._isLegacySamplePreset(r,a)||(!a&&n&&n!=="undefined"&&n!=="null"&&(a=n),!a&&r&&r!=="undefined"&&r!=="null"&&(a=this._generatePresetId(r,o)),!r||!a||a==="undefined"||r==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${a}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:a,name:r,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=A.get(hs,null),o=A.get(Sa,null),r=s??o;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!e[r]&&(r=Object.values(e).find(n=>n.name===r)?.id||null),r?A.set(hs,r):A.remove(hs),A.has(Sa)&&A.remove(Sa)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Ad.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let o=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=o,a=1;for(;s[r];)r=`${o}_${a++}`;return r}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},Y=new Xo,Md=()=>Y.getAllPresets(),_a=()=>Y.getPresetList(),kd=t=>Y.getPreset(t),Cd=t=>Y.createPreset(t),Pd=(t,e)=>Y.updatePreset(t,e),Id=t=>Y.deletePreset(t),$d=(t,e,s)=>Y.duplicatePreset(t,e,s),Rd=()=>Y.getDefaultPresetId(),Dd=t=>Y.setDefaultPresetId(t),Od=t=>Y.getEnabledMessages(t),Ld=(t,e)=>Y.addMessage(t,e),Nd=(t,e,s)=>Y.updateMessage(t,e,s),Bd=(t,e)=>Y.deleteMessage(t,e),zd=t=>Y.exportPresets(t),Ud=(t,e)=>Y.importPresets(t,e),Wd=t=>Y.buildBypassMessages(t),jd=Y});var ki={};de(ki,{DEFAULT_SETTINGS:()=>eo,SettingsService:()=>Qo,default:()=>Fd,settingsService:()=>Pe});var eo,Ea,Qo,Pe,Fd,to=z(()=>{Re();fe();eo={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Ea="settings_v2",Qo=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=A.get(Ea,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),A.set(Ea,this._cache),$.emit(C.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),o=this._deepMerge(s,e);this.saveSettings(o)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(eo)),A.set(Ea,this._cache),$.emit(C.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let o=this.getSettings(),r=e.split("."),a=o;for(let n of r)if(a&&typeof a=="object"&&n in a)a=a[n];else return s;return a}set(e,s){let o=JSON.parse(JSON.stringify(this.getSettings())),r=e.split("."),a=o;for(let n=0;n<r.length-1;n+=1){let i=r[n];i in a||(a[i]={}),a=a[i]}a[r[r.length-1]]=s,this.saveSettings(o)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(eo)),e)}_deepMerge(e,s){let o={...e};for(let r in s)s[r]&&typeof s[r]=="object"&&!Array.isArray(s[r])?o[r]=this._deepMerge(e[r]||{},s[r]):o[r]=s[r];return o}},Pe=new Qo,Fd=Pe});var Pi={};de(Pi,{ContextInjector:()=>er,DEFAULT_INJECTION_OPTIONS:()=>Ci,WRITEBACK_METHODS:()=>xe,WRITEBACK_RESULT_STATUS:()=>Zo,contextInjector:()=>Ie,default:()=>Vd});function so(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Kd(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Hd(t){try{return t?.SillyTavern?.getContext?.()||null}catch{return null}}function Yd(){let t=Kd(),e=t?.SillyTavern||null,s=Hd(t),o=e?.eventSource||t?.eventSource||s?.eventSource||null,r=e?.eventTypes||e?.event_types||s?.eventTypes||s?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:s,eventSource:o,eventTypes:r,source:e?.eventSource?"SillyTavern.eventSource":t?.eventSource?"topWindow.eventSource":s?.eventSource?"SillyTavern.getContext().eventSource":"unavailable"}}function lt(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}var ke,vs,Ci,Zo,xe,qd,Gd,er,Ie,Vd,Qt=z(()=>{fe();ke="YouYouToolkit_toolOutputs",vs="YouYouToolkit_injectedContext",Ci={overwrite:!0,enabled:!0};Zo={SUCCESS:"success",FAILED:"failed"},xe={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},qd=60,Gd=3;er=class{constructor(){this.debugMode=!1}async inject(e,s,o={}){return(await this.injectDetailed(e,s,o)).success}async injectDetailed(e,s,o={}){let r={...Ci,...o},a=this._createWritebackResult(e,r);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),a.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",a;if(!so(r.sourceMessageId))return this._log("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),a.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",a;let n=a.chatId,i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,options:r};$.emit(C.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:n,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",traceId:r.traceId||"",sessionKey:r.sessionKey||"",options:r});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,r,a);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${n}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,e);if(o<0)return"";let r=s[o]||{},a=r[vs];if(typeof a=="string"&&a.trim())return a.trim();let n=r[ke];return n&&typeof n=="object"?this._buildMessageInjectedContext(n).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let r=(e[s]||{})[ke];return r&&typeof r=="object"?r:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:o}=this._getChatRuntime(),r=this._findAssistantMessageIndex(o,null);return r<0?null:o[r]?.[ke]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:o,context:r,chat:a}=this._getChatRuntime(),n=this._findAssistantMessageIndex(a,null);if(n<0)return!1;let i=a[n],l=i?.[ke];if(!l||!l[s])return!1;delete l[s],i[ke]=l,i[vs]=this._buildMessageInjectedContext(l);let c=r?.saveChat||o?.saveChat||null;return typeof c=="function"&&await c.call(r||o),$.emit(C.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(o){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",o),!1}}async clearAllContext(e){try{let{api:s,context:o,chat:r}=this._getChatRuntime(),a=this._findAssistantMessageIndex(r,null);if(a<0)return!1;let n=r[a];delete n[ke],delete n[vs];let i=o?.saveChat||s?.saveChat||null;return typeof i=="function"&&await i.call(o||s),$.emit(C.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),o=Object.entries(s).map(([r,a])=>({toolId:r,updatedAt:a.updatedAt,contentLength:a.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:o,totalCount:o.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,o=s?.getContext?.()||null,r=Array.isArray(o?.chat)?o.chat:[],a=Array.isArray(s?.chat)?s.chat:[],n=r.length?r:a;return{topWindow:e,api:s,context:o,chat:n,contextChat:r,apiChat:a}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let o=xe.SET_CHAT_MESSAGE;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,effectiveSwipeId:s.effectiveSwipeId||s.sourceSwipeId||null,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:xe.NONE,commit:{preferredMethod:o,attemptedMethods:[],appliedMethod:xe.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:Zo.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,o,r,a,n=null){let i=e?.contextChat?.[o]||e?.apiChat?.[o]||s?.[o]||n||null,l=this._getWritableMessageField(i).text||"",c=i?.[ke]?.[r],d=a?l.includes(a):!0,u=!!(c&&String(c.content||"").trim()===a);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,o,r,a,n=null){let i=1,l=this._collectWritebackVerification(e,s,o,r,a,n);for(let c=0;c<Gd;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(qd),i+=1,l=this._collectWritebackVerification(e,s,o,r,a,n)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,s,o,r={},a=null){let n=a||this._createWritebackResult("",r),{api:i,context:l}=e||{},c=l?.setChatMessages||i?.setChatMessages||e?.topWindow?.setChatMessages||null,d=l?.setChatMessage||i?.setChatMessage||e?.topWindow?.setChatMessage||null,u=r.replaceFullMessage!==!0;n.commit.preferredMethod=typeof d=="function"?xe.SET_CHAT_MESSAGE:typeof c=="function"?xe.SET_CHAT_MESSAGES:xe.LOCAL_ONLY;let f=!1;if(typeof d=="function"){lt(n.commit.attemptedMethods,xe.SET_CHAT_MESSAGE);try{await d.call(l||i||e?.topWindow,{message:o,mes:o,content:o,text:o},s,{swipe_id:so(r.sourceSwipeId||r.effectiveSwipeId)||"current",refresh:"display_and_render_current"}),n.steps.hostSetChatMessage=!0,n.hostUpdateMethod=xe.SET_CHAT_MESSAGE,n.hostCommitApplied=!0,n.commit.appliedMethod=xe.SET_CHAT_MESSAGE,n.commit.hostCommitApplied=!0,f=!0}catch(y){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",y),n.errors.push(`setChatMessage: ${y?.message||String(y)}`)}}if(!f&&typeof c=="function"){lt(n.commit.attemptedMethods,xe.SET_CHAT_MESSAGES);try{await c.call(l||i||e?.topWindow,[{message_id:so(r.sourceMessageId)||s,chat_index:s,message:o,mes:o,content:o,text:o}],{refresh:"affected"}),n.steps.hostSetChatMessages=!0,n.hostUpdateMethod=xe.SET_CHAT_MESSAGES,n.hostCommitApplied=!0,n.commit.appliedMethod=xe.SET_CHAT_MESSAGES,n.commit.hostCommitApplied=!0,n.commit.fallbackUsed=!0,f=!0}catch(y){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",y),n.errors.push(`setChatMessages: ${y?.message||String(y)}`)}}if(f&&(n.refreshRequested=!0,lt(n.refresh.requestMethods,n.hostUpdateMethod)),u&&typeof c=="function"){lt(n.commit.attemptedMethods,"setChatMessages_refresh_assist");try{await c.call(l||i||e?.topWindow,[{message_id:so(r.sourceMessageId)||s,chat_index:s,message:o,mes:o,content:o,text:o}],{refresh:"affected"}),n.refreshRequested=!0,lt(n.refresh.requestMethods,"setChatMessages_refresh_assist")}catch(y){this._log("append \u5199\u56DE\u8865\u5145\u5237\u65B0\u5931\u8D25",y),n.errors.push(`setChatMessages_refresh_assist: ${y?.message||String(y)}`)}}return f||(lt(n.commit.attemptedMethods,xe.LOCAL_ONLY),n.commit.appliedMethod=xe.LOCAL_ONLY,n.commit.fallbackUsed=n.commit.preferredMethod!==xe.LOCAL_ONLY,n.hostUpdateMethod=n.commit.appliedMethod),n}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let o=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return o?.[1]?o[1]:"plain_text"}_stripExactStoredBlock(e,s,o=""){let r=String(e||""),a=String(s||"").trim(),n=String(o||"").trim();return a?r.includes(a)?n?{text:r.replace(a,n).trimEnd(),removed:!0,replaced:!0}:{text:r.replace(a,"").trimEnd(),removed:!0,replaced:!1}:{text:r,removed:!1,replaced:!1}:{text:r,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,s,o){let{contextChat:r,apiChat:a}=e||{},n=i=>{!Array.isArray(i)||s<0||s>=i.length||i[s]!==o&&(i[s]={...i[s]||{},...o})};n(r),n(a)}_notifyMessageUpdated(e,s){try{let o=Yd(),r=o?.topWindow||e?.topWindow,a=o?.eventSource||null,n=o?.eventTypes||{},i=n.MESSAGE_UPDATED||n.message_updated||"MESSAGE_UPDATED";return a&&typeof a.emit=="function"?(a.emit(i,s),typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(()=>{a.emit(i,s)}):typeof r?.setTimeout=="function"&&r.setTimeout(()=>{a.emit(i,s)},30),{emitted:!0,source:o?.source||"unavailable",eventName:i}):{emitted:!1,source:o?.source||"unavailable",eventName:i}}catch(o){return this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",o),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let o=Array.isArray(e)?e:[];if(!o.length)return-1;let r=s!=null&&s!=="",a=(n,i)=>{if(!this._isAssistantMessage(n)||s==null||s==="")return!1;let l=String(s).trim();return l?[n.message_id,n.id,n.messageId,n.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let n=o.length-1;n>=0;n-=1)if(a(o[n],n))return n;if(r)return-1;for(let n=o.length-1;n>=0;n-=1)if(this._isAssistantMessage(o[n]))return n;return-1}_buildMessageInjectedContext(e){let o=Object.entries(e&&typeof e=="object"?e:{}).filter(([,a])=>a?.blockType!=="full_message").sort(([,a],[,n])=>(a?.updatedAt||0)-(n?.updatedAt||0));if(!o.length)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[a,n]of o)r.push(`[${a}]`),r.push(n?.content||""),r.push("");return r.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let o of s)if(typeof e?.[o]=="string")return{key:o,text:e[o]};return{key:"mes",text:""}}_applyMessageText(e,s,o={}){let r=e&&typeof e=="object"?e:{},a=["mes","message","content","text"],n=!1;if(a.forEach(i=>{typeof r[i]=="string"&&(r[i]=s,n=!0)}),n||(r.mes=s,r.message=s),Array.isArray(r.swipes)){let i=Number.parseInt(so(o?.sourceSwipeId||o?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(r.swipe_id)?r.swipe_id:Number.isInteger(r.swipeId)?r.swipeId:0;l>=0&&l<r.swipes.length&&(r.swipes[l]=s,r.swipe_id=l,r.swipeId=l)}return r}_stripExistingToolOutput(e,s=[]){let o=String(e||"");return(Array.isArray(s)?s:[]).forEach(a=>{let n=String(a||"").trim();if(!n)return;if(n.startsWith("regex:")){try{let d=new RegExp(n.slice(6).trim(),"gis");o=o.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",n,d)}return}let i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");o=o.replace(l,""),o=o.replace(c,"")}),o.trimEnd()}_stripPreviousStoredToolContent(e,s){let o=String(e||""),r=String(s||"").trim();return r?o.replace(r,"").trimEnd():o.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,s,o={},r=null){let a=r||this._createWritebackResult(e,o);try{let n=this._getChatRuntime(),{context:i,chat:l}=n;if(!Array.isArray(l)||!l.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),a.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",a;let c=this._findAssistantMessageIndex(l,o.sourceMessageId);if(c<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),a.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",a;a.messageIndex=c,a.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:f}=this._getWritableMessageField(d);a.textField=u;let y=d[ke]&&typeof d[ke]=="object"?d[ke]:{},m=y?.[e]||{},b=m?.content||"",x=m?.blockText||b||"",E=Object.entries(y).filter(([_e])=>_e!==e).map(([,_e])=>_e||{}),S=String(s.content||"").trim(),M=o.replaceFullMessage===!0,R=M?"full_message":this._inferBlockType(S),U={toolId:e,messageId:o.sourceMessageId||d?.message_id||d?.messageId||c,blockType:R,insertedAt:s.updatedAt,replaceable:o.overwrite!==!1};a.blockIdentity=U;let F=o.overwrite===!1||M?{text:String(f||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(f,x,S),k=F.text,N="";!M&&o.overwrite!==!1&&x&&!F.removed&&(N="previous_block_not_found");let B=o.overwrite===!1||F.replaced||M?k:this._stripExistingToolOutput(k,o.extractionSelectors),L=B!==k;k=B;let X=o.overwrite===!1||F.replaced||M?k:this._stripPreviousStoredToolContent(k,b),ie=X!==k;k=X,a.replacedExistingBlock=M||F.removed||L||ie;let ge=o.overwrite===!1?String(f||""):k,je=M?S:F.replaced?k.trim():[ge.trimEnd(),S].filter(Boolean).join(`

`).trim();a.insertedNewBlock=!!S;let Q=E.every(_e=>{if(_e?.blockType==="full_message")return!0;let Dt=String(_e?.blockText||_e?.content||"").trim();return Dt?je.includes(Dt):!0});a.preservedOtherToolBlocks=Q,Q?N&&(a.conflictDetected=!0,a.conflictReason=N):(a.conflictDetected=!0,a.conflictReason="other_tool_block_removed");let Fe={...y,[e]:{toolId:e,content:S,blockText:S,blockType:R,blockIdentity:U,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};d[u]=je,this._applyMessageText(d,je,o),d[ke]=Fe,d[vs]=this._buildMessageInjectedContext(Fe),a.contentCommitted=!0,a.commit.contentCommitted=!0,a.steps.contentCommitted=!0,a.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(n,c,d),a.steps.runtimeSynced=!0,await this._requestAssistantMessageRefresh(n,c,je,o,a);let Rt=i?.saveChat||n?.api?.saveChat||null,Ke=i?.saveChatDebounced||n?.api?.saveChatDebounced||null;typeof Ke=="function"&&(Ke.call(i||api),a.steps.saveChatDebounced=!0,a.refreshRequested=!0,lt(a.refresh.requestMethods,"saveChatDebounced")),typeof Rt=="function"&&(await Rt.call(i||api),a.steps.saveChat=!0,a.refreshRequested=!0,lt(a.refresh.requestMethods,"saveChat"));let ot=this._notifyMessageUpdated(n,c);a.steps.notifiedMessageUpdated=ot?.emitted===!0,a.refresh.eventSource=ot?.source||"",a.refresh.eventName=ot?.eventName||"",ot?.error&&a.errors.push(`MESSAGE_UPDATED: ${ot.error}`);let V=String(s.content||"").trim();(a.steps.hostSetChatMessages||a.steps.hostSetChatMessage)&&(a.refreshRequested=!0,lt(a.refresh.requestMethods,a.hostUpdateMethod)),a.steps.notifiedMessageUpdated&&(a.refreshRequested=!0,lt(a.refresh.requestMethods,`MESSAGE_UPDATED:${a.refresh.eventName||"MESSAGE_UPDATED"}`)),a.steps.refreshRequested=a.refreshRequested,a.refresh.requested=a.refreshRequested;let se=await this._confirmRefresh(n,l,c,e,V,d);return a.verification.textIncludesContent=se.textIncludesContent,a.verification.mirrorStored=se.mirrorStored,a.verification.refreshConfirmed=se.refreshConfirmed,a.steps.verifiedAfterWrite=a.verification.textIncludesContent&&a.verification.mirrorStored,a.refreshConfirmed=a.verification.refreshConfirmed&&a.refreshRequested,a.refresh.confirmChecks=Number(se.confirmChecks)||0,a.refresh.confirmedBy=se.confirmedBy||"",a.refresh.confirmed=a.refreshConfirmed,a.steps.refreshConfirmed=a.refreshConfirmed,a.success=a.steps.localTextApplied&&a.steps.runtimeSynced&&a.steps.verifiedAfterWrite&&a.refreshConfirmed,a.writebackStatus=a.success?Zo.SUCCESS:Zo.FAILED,!a.success&&!a.error&&(a.error=a.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),a.conflictDetected&&!a.error&&(a.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${a.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),a}catch(n){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",n),a.error=n?.message||String(n),a.errors.push(a.error),a}}getAssistantMessageSnapshot(e=null){try{let s=this._getChatRuntime(),{chat:o}=s,r=this._findAssistantMessageIndex(o,e);if(r<0)return null;let a=o[r]||null,n=this._getWritableMessageField(a).text||"",i=a?.[ke]&&typeof a[ke]=="object"?a[ke]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(n||"")).trim();return{messageIndex:r,message:a,messageText:n,baseText:l,toolOutputs:i,injectedContext:typeof a?.[vs]=="string"?a[vs]:this._buildMessageInjectedContext(i)}}catch(s){return this._log("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",s),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),r=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(n=>typeof n=="string"&&n.trim());if(r)return r;let a=e.SillyTavern?.this_chid;if(a!=null)return`chat_char_${a}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},Ie=new er,Vd=Ie});var $i={};de($i,{BUILTIN_VARIABLES:()=>Ii,VariableResolver:()=>tr,default:()=>Jd,variableResolver:()=>ze});var Ii,tr,ze,Jd,oo=z(()=>{fe();Ii={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},tr=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let o=e;return o=this._resolveBuiltinVariables(o,s),o=this._resolveCustomVariables(o,s),o=this._resolveRegexVariables(o,s),o}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>this.resolveObject(r,s));let o={};for(let[r,a]of Object.entries(e))typeof a=="string"?o[r]=this.resolveTemplate(a,s):typeof a=="object"&&a!==null?o[r]=this.resolveObject(a,s):o[r]=a;return o}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(Ii))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,o]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof o=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},o={};for(let r of this.getAvailableVariables())o[r.category]||(o[r.category]=[]),o[r.category].push(r);for(let[r,a]of Object.entries(s))if(o[r]&&o[r].length>0){e.push(`\u3010${a}\u3011`);for(let n of o[r])e.push(`  ${n.name} - ${n.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let o=e;return o=o.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),o=o.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),o=o.replace(/\{\{chatHistory\}\}/gi,()=>{let r=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(r)}),o=o.replace(/\{\{characterCard\}\}/gi,()=>{let r=s.characterCard||s.raw?.characterCard;return r?this._formatCharacterCard(r):""}),o=o.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),o=o.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),o=o.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),o=o.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),o=o.replace(/\{\{toolWorldbookContent\}\}/gi,s.toolWorldbookContent||s.raw?.toolWorldbookContent||""),o=o.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),o=o.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),o=o.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),o=o.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),o=o.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),o=o.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),o}_resolveCustomVariables(e,s){let o=e;for(let[r,a]of this.customVariables){let n=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof a=="function"?o=o.replace(n,()=>{try{return a(s)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,i),""}}):o=o.replace(n,String(a))}return o}_resolveRegexVariables(e,s){let o=e;for(let[r,a]of this.variableHandlers){let n=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");o=o.replace(n,(i,l)=>{try{return a(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${l}:`,c),""}})}return o}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let o=s.role||"unknown",r=s.content||s.mes||"";return`[${o}]: ${r}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},ze=new tr,Jd=ze});var Di={};de(Di,{DEFAULT_PROMPT_TEMPLATE:()=>Ri,ToolPromptService:()=>sr,default:()=>Xd,toolPromptService:()=>Zt});var Ri,sr,Zt,Xd,or=z(()=>{fe();Zs();oo();Ta();Ri="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",sr=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,s={}){let o=this._getPromptTemplate(e),r=String(s?.toolWorldbookContent||s?.input?.toolWorldbookContent||await Ai(e)).trim(),a=ze.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolWorldbookContent:r}),n=ze.resolveTemplate(o,a).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return ze.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:n,toolContentMacro:i,toolWorldbookContent:r})}async buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let o=[],r=await this._buildVariableContext(e,s),a=this._getBypassMessages(e);if(a&&a.length>0)for(let i of a)i.enabled!==!1&&o.push({role:this._normalizeRole(i.role),content:ze.resolveTemplate(i.content||"",r)});let n=this._buildUserContent(this._getPromptTemplate(e),r);return n&&o.push({role:"user",content:n}),this._log(`\u6784\u5EFA\u6D88\u606F: ${o.length} \u6761`),o}async buildPromptText(e,s){return(await this._buildVariableContext(e,s)).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Ri}_getBypassMessages(e){return e.bypass?.enabled?Y.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":ze.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},Zt=new sr,Xd=Zt});var Oi={};de(Oi,{LEGACY_OUTPUT_MODES:()=>Qd,OUTPUT_MODES:()=>Ue,TOOL_FAILURE_STAGES:()=>pe,TOOL_RUNTIME_STATUS:()=>Zd,TOOL_WRITEBACK_STATUS:()=>ce,ToolOutputService:()=>ar,default:()=>eu,toolOutputService:()=>ct});function rr(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var Ue,Qd,Zd,pe,ce,ar,ct,eu,nr=z(()=>{fe();to();Qt();or();zo();Bs();Ue={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Qd={inline:"follow_ai"},Zd={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},pe={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ce={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};ar=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Ue.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===Ue.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let o=Date.now(),r=e.id,a=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,n=s?.sessionKey||"",i=s?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=ce.NOT_APPLICABLE,f=null,y=[],m="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),$.emit(C.TOOL_EXECUTION_STARTED,{toolId:r,traceId:a,sessionKey:n,mode:Ue.POST_RESPONSE_API});try{if(d=pe.BUILD_MESSAGES,y=await this._buildToolMessages(e,s),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${y.length} \u6761\u6D88\u606F`);let b=await this._getRequestTimeout();d=pe.SEND_API_REQUEST;let x=await this._sendApiRequest(c,y,{timeoutMs:b,signal:s.signal});if(d=pe.EXTRACT_OUTPUT,m=this._extractOutputContent(x,e),m){if(d=pe.INJECT_CONTEXT,f=await Ie.injectDetailed(r,m,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:l,traceId:a,sessionKey:n}),!f?.success)throw u=ce.FAILED,new Error(f?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ce.SUCCESS}else u=ce.SKIPPED_EMPTY_OUTPUT;d="";let E=Date.now()-o;return $.emit(C.TOOL_EXECUTED,{toolId:r,traceId:a,sessionKey:n,success:!0,duration:E,mode:Ue.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${E}ms`),{success:!0,toolId:r,output:m,duration:E,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:f,phases:rr(y,m,f)}}}catch(b){let x=Date.now()-o,E=d||pe.UNKNOWN,S=u||ce.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,b),$.emit(C.TOOL_EXECUTION_FAILED,{toolId:r,traceId:a,sessionKey:n,error:b.message||String(b),duration:x}),{success:!1,toolId:r,error:b.message||String(b),duration:x,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:l,apiPreset:c,writebackStatus:S,failureStage:E,writebackDetails:f,phases:rr(y,m,f)}}}}async runToolFollowAiManual(e,s){let o=Date.now(),r=e.id,a=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,n=s?.sessionKey||"",i=s?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=ce.NOT_APPLICABLE,f=null,y=[],m="";$.emit(C.TOOL_EXECUTION_STARTED,{toolId:r,traceId:a,sessionKey:n,mode:Ue.FOLLOW_AI});try{if(d=pe.BUILD_MESSAGES,y=await this._buildToolMessages(e,s),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let b=await this._getRequestTimeout();d=pe.SEND_API_REQUEST;let x=await this._sendApiRequest(l,y,{timeoutMs:b,signal:s.signal});if(d=pe.EXTRACT_OUTPUT,m=this._extractOutputContent(x,e),m){if(d=pe.INJECT_CONTEXT,f=await Ie.injectDetailed(r,m,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:c,traceId:a,sessionKey:n}),!f?.success)throw u=ce.FAILED,new Error(f?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ce.SUCCESS}else u=ce.SKIPPED_EMPTY_OUTPUT;d="";let E=Date.now()-o;return $.emit(C.TOOL_EXECUTED,{toolId:r,traceId:a,sessionKey:n,success:!0,duration:E,mode:Ue.FOLLOW_AI}),{success:!0,toolId:r,output:m,duration:E,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:f,phases:rr(y,m,f)}}}catch(b){let x=Date.now()-o,E=d||pe.UNKNOWN,S=u||ce.NOT_APPLICABLE;return $.emit(C.TOOL_EXECUTION_FAILED,{toolId:r,traceId:a,sessionKey:n,error:b.message||String(b),duration:x,mode:Ue.FOLLOW_AI}),{success:!1,toolId:r,error:b.message||String(b),duration:x,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:c,apiPreset:l,writebackStatus:S,failureStage:E,writebackDetails:f,phases:rr(y,m,f)}}}}async runToolInline(e,s){return this.runToolFollowAiManual(e,s)}async previewExtraction(e,s){return{success:!0,...this.getExtractionSnapshot(e,s)}}getExtractionSnapshot(e,s){let o=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(o,"rawText"),a=this._joinMessageBlocks(o,"filteredText"),n=this._joinMessageBlocks(o,"extractedText",{skipEmpty:!0}),i=(Array.isArray(o)?o:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(o)&&o.length>0?o[o.length-1]:null;return{sourceText:r,filteredSourceText:a,extractedText:n,extractedRawText:i,messageEntries:o,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let o=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(o,"rawText"),a=this._joinMessageBlocks(o,"filteredText"),n=this._joinMessageBlocks(o,"extractedText",{skipEmpty:!0}),i={...s,rawRecentMessagesText:r,recentMessagesText:a,extractedContent:n,toolContentMacro:this._buildToolContentMacro(o),toolName:e.name,toolId:e.id};return Zt.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,o={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:a}=o,n=null;if(e){if(!Ls(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);n=Os(e)}else n=Os();let i=ds(n||{});if(!i.valid&&!n?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:r,apiConfig:n},a);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Pe.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let o=typeof e=="string"?e:String(e||""),r=this._getExtractionSelectors(s);if(!r.length)return o.trim();let a=[];for(let n of r){let i=String(n||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...o.matchAll(d)].forEach(f=>{let y=String(f?.[0]||"").trim();y&&a.push(y)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(o.match(c)||[]).forEach(u=>{let f=String(u||"").trim();f&&a.push(f)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return a.length>0?a.join(`

`).trim():o.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(o=>String(o||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(o=>String(o||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,o={}){let r=typeof e=="string"?e:String(e||""),a=this._getExtractionSelectors(s),{strict:n=!1}=o;if(!a.length)return r.trim();let i=a.map((c,d)=>{let u=String(c||"").trim(),f=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:f?"regex_include":"include",value:f?u.slice(6).trim():u,enabled:!0}}).filter(c=>c.value),l=qt(r,i,[]);return n?(l||"").trim():l||r.trim()}_extractToolContent(e,s){let o=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(o,e,{strict:!0}):o.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let o=bt()||[],r=Gt()||[];return!Array.isArray(o)||o.length===0?s.trim():qt(s,o,r)||s.trim()}catch(o){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",o),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let o of s)if(typeof o=="string"&&o.trim())return o.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(o=>o.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let o=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),r=Array.isArray(s?.chatMessages)?s.chatMessages:[],a=[];for(let i=r.length-1;i>=0&&a.length<o;i-=1){let l=r[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&a.unshift({text:u,message:l,chatIndex:i})}if(a.length>0)return a;let n=s?.lastAiMessage||s?.input?.lastAiMessage||"";return n?[{text:n,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((r,a)=>{let n=r.text||"",i=this._applyGlobalContextRules(n),l=this._extractToolContent(e,n);return{...r,order:a+1,rawText:n,filteredText:i,extractedText:l,fullMessageText:n}})}_joinMessageBlocks(e,s,o={}){let r=Array.isArray(e)?e:[],{skipEmpty:a=!1}=o;return r.map(i=>{let l=String(i?.[s]||"").trim();return a&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(r=>{let a=`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`,n=String(r?.filteredText||"").trim()||"(\u7A7A)",i=String(r?.extractedText||"").trim()||"(\u7A7A)";return`${a}
\u6B63\u6587\uFF1A
${n}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Pe.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},ct=new ar,eu=ct});function Ni(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[s,o])=>(e[s]=o===!0,e),{})}function ou(t,e={}){let s=e?.direction==="unescape"?"unescape":"escape",o=Ni(e?.options);return tu.reduce((r,a)=>o[a.key]!==!0?r:s==="unescape"?r.replace(a.escaped,a.unescaped):r.replace(a.plain,a.replacement),String(t||""))}function ru(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let o=Ni(e?.options);return su.reduce((r,a)=>o[a.key]!==!0?r:r.replace(a.from,a.to),String(t||""))}function Bi(t,e){let s=t?.processor||{},o=s?.type||"",r=String(e||"");switch(o){case Li.ESCAPE_TRANSFORM:return ou(r,s);case Li.PUNCTUATION_TRANSFORM:return ru(r,s);default:return r}}var tu,su,Li,zi=z(()=>{tu=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],su=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Li={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var lr={};de(lr,{abortAllTasks:()=>cu,abortTask:()=>lu,buildToolMessages:()=>ji,clearExecutionHistory:()=>gu,createExecutionContext:()=>hu,createResult:()=>ir,enhanceMessagesWithBypass:()=>vu,executeBatch:()=>iu,executeTool:()=>Wi,executeToolWithConfig:()=>Fi,executeToolsBatch:()=>Tu,executorState:()=>re,extractFailed:()=>bu,extractSuccessful:()=>mu,generateTaskId:()=>es,getExecutionHistory:()=>pu,getExecutorStatus:()=>yu,getScheduler:()=>xs,mergeResults:()=>fu,pauseExecutor:()=>du,resumeExecutor:()=>uu,setMaxConcurrent:()=>nu});function ir(t,e,s,o,r,a,n=0){return{success:s,taskId:t,toolId:e,data:o,error:r,duration:a,retries:n,timestamp:Date.now(),metadata:{}}}function es(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function au(t,e={}){return{id:es(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function xs(){return ro||(ro=new Aa(re.maxConcurrent)),ro}function nu(t){re.maxConcurrent=Math.max(1,Math.min(10,t)),ro&&(ro.maxConcurrent=re.maxConcurrent)}async function Wi(t,e={},s){let o=xs(),r=au(t,e);for(;re.isPaused;)await new Promise(a=>setTimeout(a,100));try{let a=await o.enqueue(async n=>{if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(n,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return Ui(a),a}catch(a){let n=ir(r.id,t,!1,null,a,Date.now()-r.createdAt,r.retries);return Ui(n),n}}async function iu(t,e={}){let{failFast:s=!1,concurrency:o=re.maxConcurrent}=e,r=[],a=xs(),n=a.maxConcurrent;a.maxConcurrent=o;try{let i=t.map(({toolId:l,options:c,executor:d})=>Wi(l,c,d));if(s)for(let l of i){let c=await l;if(r.push(c),!c.success){a.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?r.push(c.value):r.push(ir(es(),"unknown",!1,null,c.reason,0,0))}}finally{a.maxConcurrent=n}return r}function lu(t){return xs().abort(t)}function cu(){xs().abortAll(),re.executionQueue=[]}function du(){re.isPaused=!0}function uu(){re.isPaused=!1}function yu(){return{...xs().getStatus(),isPaused:re.isPaused,activeControllers:re.activeControllers.size,historyCount:re.executionHistory.length}}function Ui(t){re.executionHistory.push(t),re.executionHistory.length>100&&re.executionHistory.shift()}function pu(t={}){let e=[...re.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function gu(){re.executionHistory=[]}function fu(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function mu(t){return t.filter(e=>e.success).map(e=>e.data)}function bu(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function hu(t={}){return{taskId:es(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function vu(t,e){return!e||e.length===0?t:[...e,...t]}function xu(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ji(t,e){let s=[],o=t.promptTemplate||"",r={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[a,n]of Object.entries(r))o=o.replace(new RegExp(xu(a),"g"),n);return s.push({role:"USER",content:o}),s}async function Fi(t,e,s={}){let o=Z(t);if(!o)return{success:!1,taskId:es(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!o.enabled)return{success:!1,taskId:es(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),a=es();try{$.emit(C.TOOL_EXECUTION_STARTED,{toolId:t,taskId:a,context:e});let n=ji(o,e);if(typeof s.callApi=="function"){let i=o.output?.apiPreset||o.apiPreset||"",l=i?{preset:i}:null,c=await s.callApi(n,l,s.signal),d=c;o.outputMode==="separate"&&o.extractTags?.length>0&&(d=wu(c,o.extractTags));let u={success:!0,taskId:a,toolId:t,data:d,duration:Date.now()-r};return $.emit(C.TOOL_EXECUTED,{toolId:t,taskId:a,result:u}),u}else return{success:!0,taskId:a,toolId:t,data:{messages:n,config:{apiPreset:o.output?.apiPreset||o.apiPreset||"",outputMode:o.outputMode,extractTags:o.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(n){let i={success:!1,taskId:a,toolId:t,error:n.message||String(n),duration:Date.now()-r};return $.emit(C.TOOL_EXECUTION_FAILED,{toolId:t,taskId:a,error:n}),i}}function wu(t,e){let s={};for(let o of e){let r=new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"gi"),a=t.match(r);a&&(s[o]=a.map(n=>{let i=n.match(new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"i"));return i?i[1].trim():""}))}return s}async function Tu(t,e,s={}){let o=[];for(let r of t){let a=Z(r);if(a&&a.enabled){let n=await Fi(r,e,s);o.push(n)}}return o}var re,Aa,ro,cr=z(()=>{Pt();fe();re={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Aa=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((o,r)=>{this.queue.push({executor:e,task:s,resolve:o,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:o,resolve:r,reject:a}=e,n=new AbortController;o.abortController=n,o.status="running",o.startedAt=Date.now(),this.running.set(o.id,o),re.activeControllers.set(o.id,n),this.executeTask(s,o,n.signal).then(i=>{o.status="completed",o.completedAt=Date.now(),r(i)}).catch(i=>{o.status=i.name==="AbortError"?"aborted":"failed",o.completedAt=Date.now(),a(i)}).finally(()=>{this.running.delete(o.id),re.activeControllers.delete(o.id),re.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,o){let r=Date.now(),a=null;for(let n=0;n<=s.maxRetries;n++){if(o.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(o);return ir(s.id,s.toolId,!0,i,null,Date.now()-r,n)}catch(i){if(a=i,i.name==="AbortError")throw i;n<s.maxRetries&&(await this.delay(1e3*(n+1)),s.retries=n+1)}}throw a}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=re.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of re.activeControllers.values())e.abort();re.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},ro=null});async function Su(){return Ma||(Ma=Promise.resolve().then(()=>(cr(),lr))),Ma}async function _u(t,e,s){return s&&t.output?.mode===Ue.POST_RESPONSE_API?ct.runToolPostResponse(t,e):s&&t.output?.mode===Ue.FOLLOW_AI?ct.runToolFollowAiManual(t,e):(await Su()).executeToolWithConfig(t.id,e)}function Eu(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?ts.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Ue.POST_RESPONSE_API?ts.MANUAL_POST_RESPONSE_API:ts.MANUAL_COMPATIBILITY:ts.MANUAL_POST_RESPONSE_API}function dr(t,e){try{ma(t,e)}catch(s){console.warn("[ManualTool] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}function Au(t,e,s){let o=String(t||""),r=String(e||"").trim(),a=String(s||"").trim();return!o.trim()||!r?{nextMessageText:"",replaced:!1}:o.includes(r)?{nextMessageText:o.replace(r,a).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function Mu(t,e){let s=ct.getExtractionSnapshot(t,e),o=s?.primaryEntry||null,r=String(o?.fullMessageText||e?.lastAiMessage||"").trim(),a=String(o?.extractedText||s?.extractedRawText||s?.extractedText||"").trim(),n=Array.isArray(s?.selectors)?s.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!a||!r)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:n,writebackStatus:ce.NOT_APPLICABLE,failureStage:pe.EXTRACT_OUTPUT,extraction:s}};let c=String(Bi(t,a)||"").trim(),d=Au(r,a,c),u=d.replaced?d.nextMessageText:c,f=null,y=ce.NOT_APPLICABLE;if(u){if(f=await Ie.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l}),!f?.success)return{success:!1,error:f?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:n,writebackStatus:ce.FAILED,failureStage:pe.INJECT_CONTEXT,writebackDetails:f,extraction:s}};y=ce.SUCCESS}else y=ce.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,meta:{traceId:i,sessionKey:l,selectors:n,writebackStatus:y,failureStage:"",writebackDetails:f,extraction:s}}}async function ku(t,e){let s=Date.now(),o=t.id,r=`yyt-tool-run-${o}`,a=Eu(t,e),n=e?.executionKey||"";dr(o,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),he("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:r});try{let i=a===ts.MANUAL_LOCAL_TRANSFORM?await Mu(t,e):await _u(t,e,!0),l=Date.now()-s;if(i?.success){let f=Z(o),y=i?.meta?.writebackDetails||{};return dr(o,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(f?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:i?.meta?.writebackStatus||ce.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(y?.refresh?.requestMethods)?[...y.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:y?.refresh?.confirmedBy||""}),w("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),he("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:r}),{success:!0,duration:l,result:i}}let c=Z(o),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return dr(o,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:i?.meta?.writebackStatus||ce.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(a===ts.MANUAL_COMPATIBILITY?pe.COMPATIBILITY_EXECUTE:pe.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),w("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),he("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:r}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-s,c=Z(o),d=i?.message||String(i);throw dr(o,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:ce.NOT_APPLICABLE,lastFailureStage:a===ts.MANUAL_COMPATIBILITY?pe.COMPATIBILITY_EXECUTE:pe.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),w("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),he("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:r}),i}}async function ur(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=Z(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Gs(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:ce.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),he("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await Xt({runSource:"MANUAL"});return ku(e,s)}async function yr(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=Z(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await Xt({runSource:"MANUAL_PREVIEW"});return ct.previewExtraction(e,s)}var ts,Ma,ka=z(()=>{Pt();nr();bs();Qt();zi();Te();ts={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},Ma=null});var Ki={};de(Ki,{TOOL_CONFIG_PANEL_STYLES:()=>ws,createToolConfigPanel:()=>It,default:()=>Cu});function It(t){let{id:e,toolId:s,postResponseHint:o,extractionPlaceholder:r,previewDialogId:a,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",toolKindLabel:i="AI \u5DE5\u5177"}=t;return{id:e,toolId:s,render(){let l=Z(this.toolId);if(!l)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let c=this._getApiPresets(),d=l.output?.apiPreset||l.apiPreset||"",u=this._getBypassPresets(),f=l.output?.mode||"follow_ai",y=l.bypass?.enabled||!1,m=l.bypass?.presetId||"",b=l.runtime?.lastStatus||"idle",x=l.runtime?.lastRunAt?new Date(l.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",E=l.runtime?.lastError||"",S=l.extraction||{},M=l.automation||{},R=l.worldbooks||{},U=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:Array.isArray(R.selected)?R.selected:[],F=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],k=String(this.worldbookFilter||"").trim().toLowerCase(),N=k?F.filter(Q=>String(Q||"").toLowerCase().includes(k)):F,B=U.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":U.length<=2?U.join("\u3001"):`\u5DF2\u9009 ${U.length} \u9879\uFF1A${U.slice(0,2).join("\u3001")} \u7B49`,L=Array.isArray(S.selectors)?S.selectors.join(`
`):"",X=f==="post_response_api"?o:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",ie=f==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",ge=f==="post_response_api",je=d||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${h(l.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${h(l.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${h(ie)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${h(je)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${h(b)}</span>
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
                <option value="follow_ai" ${f==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${f==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${X}${ge?" \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u4ECD\u9700\u5728\u5168\u5C40\u8BBE\u7F6E\u4E2D\u5F00\u542F\u81EA\u52A8\u5316\u3002":""}</div>
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
                ${c.map(Q=>`
                  <option value="${h(Q.name)}" ${Q.name===d?"selected":""}>
                    ${h(Q.name)}
                  </option>
                `).join("")}
              </select>
              <div class="yyt-tool-compact-hint">\u4EC5\u5728\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u4E0B\u751F\u6548\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shield-halved"></i>
              <span>Ai\u6307\u4EE4\u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${g}-tool-bypass-enabled" ${y?"checked":""}>
                <span>\u542F\u7528 Ai \u6307\u4EE4\u9884\u8BBE</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${y?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A Ai \u6307\u4EE4\u9884\u8BBE</label>
              <select class="yyt-select" id="${g}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${u.map(Q=>`
                  <option value="${h(Q.id)}" ${Q.id===m?"selected":""}>
                    ${h(Q.name)}${Q.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="checkbox" id="${g}-tool-worldbooks-enabled" ${R.enabled?"checked":""}>
                <span>\u542F\u7528\u4E16\u754C\u4E66\u6CE8\u5165</span>
              </label>
            </div>
            <div class="yyt-form-group">
              <label>\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66\uFF08\u53EF\u591A\u9009\uFF09</label>
              <div class="yyt-worldbook-select" id="${g}-tool-worldbook-select">
                <div class="yyt-worldbook-summary">${h(B)}</div>
                <div class="yyt-worldbook-dropdown" id="${g}-tool-worldbook-dropdown">
                  <input type="text" class="yyt-input yyt-worldbook-search" id="${g}-tool-worldbook-search" placeholder="\u641C\u7D22\u4E16\u754C\u4E66..." value="${h(this.worldbookFilter||"")}">
                  <div class="yyt-worldbook-list" id="${g}-tool-worldbooks">
                    ${F.length>0?N.length>0?N.map(Q=>`
                      <div class="yyt-worldbook-item">
                        <label class="yyt-checkbox-label">
                          <input type="checkbox" data-worldbook-name="${h(Q)}" ${U.includes(Q)?"checked":""}>
                          <span>${h(Q)}</span>
                        </label>
                      </div>
                    `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>':`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`}
                  </div>
                  ${this.worldbookLoadState!=="ready"?`
                    <details class="yyt-worldbook-diagnostics">
                      <summary>\u67E5\u770B\u4E16\u754C\u4E66\u8BCA\u65AD</summary>
                      <pre class="yyt-preview-box yyt-preview-pre">${h(JSON.stringify(_i()||{state:this.worldbookLoadState||"idle",message:"\u5C1A\u672A\u751F\u6210\u8BCA\u65AD\u4FE1\u606F"},null,2))}</pre>
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
                <input type="number" class="yyt-input" id="${g}-tool-max-messages" min="1" max="50" value="${Number(S.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${g}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${h(r)}">${h(L)}</textarea>
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
                <input type="number" class="yyt-input" id="${g}-tool-automation-settle-ms" min="0" max="10000" step="100" value="${Number(M.settleMs)||1200}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u51B7\u5374\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${g}-tool-automation-cooldown-ms" min="0" max="60000" step="100" value="${Number(M.cooldownMs)||5e3}">
              </div>
            </div>
            <div class="yyt-tool-compact-hint">\u4E0D\u518D\u5355\u72EC\u914D\u7F6E\u5DE5\u5177\u7EA7\u5F00\u5173\u3002\u53EA\u8981\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\uFF0C\u5E76\u4E14\u5168\u5C40\u81EA\u52A8\u5316\u5F00\u542F\uFF0C\u5C31\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
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
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${h(l.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${h(b)}">${h(b)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${h(x)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${l.runtime?.successCount||0} / ${l.runtime?.errorCount||0}</span>
                </div>
                ${E?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${h(E)}</span>
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
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C Ai \u6307\u4EE4\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
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
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86 Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{toolWorldbookContent}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>
        </div>
      `},_getApiPresets(){try{return kt()||[]}catch{return[]}},_getBypassPresets(){try{return _a()||[]}catch{return[]}},async _loadWorldbooks(){this.worldbookLoadState="loading";for(let d=0;d<10;d+=1){try{let u=await Ei();if(Array.isArray(u)&&u.length>0)return this.availableWorldbooks=u,this.worldbookLoadState="ready",this.availableWorldbooks}catch{this.availableWorldbooks=Qs()}d<9&&await new Promise(u=>setTimeout(u,400))}return this.availableWorldbooks=Qs(),this.worldbookLoadState="empty",this.availableWorldbooks},_getFormData(l){let c=P(),d=Z(this.toolId)||{};if(!c||!O(l))return d;let u=l.find(`#${g}-tool-output-mode`).val()||"follow_ai",f=l.find(`#${g}-tool-bypass-enabled`).is(":checked"),y=u==="post_response_api",m=(l.find(`#${g}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean),b=l.find("[data-worldbook-name]:checked").map((x,E)=>String(c(E).data("worldbook-name")||"").trim()).get().filter(Boolean);return{enabled:d?.enabled!==!1,promptTemplate:l.find(`#${g}-tool-prompt-template`).val()||"",apiPreset:l.find(`#${g}-tool-api-preset`).val()||"",extractTags:m,output:{mode:u,apiPreset:l.find(`#${g}-tool-api-preset`).val()||"",overwrite:!0,enabled:y},automation:{enabled:y,settleMs:Math.max(0,parseInt(l.find(`#${g}-tool-automation-settle-ms`).val(),10)||1200),cooldownMs:Math.max(0,parseInt(l.find(`#${g}-tool-automation-cooldown-ms`).val(),10)||5e3)},bypass:{enabled:f,presetId:f&&l.find(`#${g}-tool-bypass-preset`).val()||""},worldbooks:{enabled:l.find(`#${g}-tool-worldbooks-enabled`).is(":checked"),selected:b},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(l.find(`#${g}-tool-max-messages`).val(),10)||5),selectors:m}}},_showExtractionPreview(l,c){if(!P())return;let u=`${g}-${a}`,f=Array.isArray(c.messageEntries)?c.messageEntries:[],y=f.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${f.map((m,b)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${b===f.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${f.length-b} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${h(m.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${h(m.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${h(m.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";l.append(Ut({id:u,title:n,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${h((c.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${h(c.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${h(c.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${h(c.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${y}
        `})),Wt(l,u,{onSave:m=>m()}),l.find(`#${u}-save`).text("\u5173\u95ED"),l.find(`#${u}-cancel`).remove()},bindEvents(l){let c=P();if(!c||!O(l))return;let d=this,u=()=>l.find("[data-worldbook-name]:checked").map((m,b)=>String(c(b).data("worldbook-name")||"").trim()).get().filter(Boolean),f=()=>{let m=u(),b=m.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":m.length<=2?m.join("\u3001"):`\u5DF2\u9009 ${m.length} \u9879\uFF1A${m.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(b)},y=()=>{let m=String(this.worldbookFilter||"").trim().toLowerCase(),b=l.find(`#${g}-tool-worldbooks`),x=b.find(".yyt-worldbook-item"),E=0;x.each((S,M)=>{let R=c(M),U=String(R.find("[data-worldbook-name]").data("worldbook-name")||"").toLowerCase(),F=!m||U.includes(m);R.toggleClass("yyt-hidden",!F),F&&(E+=1)}),b.find(".yyt-worldbook-search-empty").remove(),x.length>0&&E===0&&b.append('<div class="yyt-tool-compact-hint yyt-worldbook-empty yyt-worldbook-search-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>')};l.off(".yytToolPanel"),l.on("input.yytToolPanel",`#${g}-tool-worldbook-search`,m=>{this.worldbookFilter=String(c(m.currentTarget).val()||""),y()}),y(),l.on("change.yytToolPanel","[data-worldbook-name]",()=>{this.draftSelectedWorldbooks=u(),f()}),l.on("change.yytToolPanel",`#${g}-tool-output-mode`,()=>{let b=(l.find(`#${g}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?`${o} \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u8BB0\u5F97\u540C\u65F6\u5F00\u542F\u5168\u5C40\u81EA\u52A8\u5316\u3002`:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";l.find(".yyt-tool-mode-hint").text(b)}),l.on("change.yytToolPanel",`#${g}-tool-bypass-enabled`,m=>{let b=c(m.currentTarget).is(":checked");l.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!b)}),l.on("click.yytToolPanel",`#${g}-tool-save, #${g}-tool-save-top`,()=>{d._saveConfig(l,{silent:!1})}),l.on("click.yytToolPanel",`#${g}-tool-reset-template`,()=>{let m=fs(d.toolId);m?.promptTemplate&&(l.find(`#${g}-tool-prompt-template`).val(m.promptTemplate),w("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),l.on("click.yytToolPanel",`#${g}-tool-run-manual`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let b=await ur(d.toolId);!b?.success&&b?.error&&he("warning",b.error,{duration:3200,noticeId:`yyt-tool-run-${d.toolId}`})}catch(b){w("error",b?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{d.renderTo(l)}}),l.on("click.yytToolPanel",`#${g}-tool-preview-extraction`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let b=await yr(d.toolId);if(!b?.success){w("error",b?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}d._showExtractionPreview(l,b)}catch(b){w("error",b?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),we(l,{namespace:"yytToolPanelSelect",selectors:[`#${g}-tool-output-mode`,`#${g}-tool-api-preset`,`#${g}-tool-bypass-preset`]})},_saveConfig(l,c={}){let d=this._getFormData(l),{silent:u=!1}=c,f=Be(this.toolId,d);return f&&(this.draftSelectedWorldbooks=Array.isArray(d.worldbooks?.selected)?[...d.worldbooks.selected]:[]),f?u||w("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):w("error","\u4FDD\u5B58\u5931\u8D25"),f},destroy(l){!P()||!O(l)||(ye(l,"yytToolPanelSelect"),l.off(".yytToolPanel"))},getStyles(){return ws},renderTo(l){if(!P()||!O(l))return;if(this.worldbookFilter=this.worldbookFilter||"",!Array.isArray(this.draftSelectedWorldbooks)){let u=Z(this.toolId);this.draftSelectedWorldbooks=Array.isArray(u?.worldbooks?.selected)?[...u.worldbooks.selected]:[]}let d=Qs();Array.isArray(d)&&d.length>0?(this.availableWorldbooks=d,this.worldbookLoadState="ready"):this.worldbookLoadState="loading",l.html(this.render({})),this.bindEvents(l,{}),this.worldbookLoadState==="loading"&&Promise.resolve(this._loadWorldbooks()).catch(()=>(this.worldbookLoadState="empty",Qs())).then(u=>{O(l)&&(this.availableWorldbooks=Array.isArray(u)?u:[],this._updateWorldbookList(l))})},_updateWorldbookList(l){if(!P()||!O(l))return;let d=String(this.worldbookFilter||"").trim().toLowerCase(),u=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],f=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:[],y=d?u.filter(x=>String(x||"").toLowerCase().includes(d)):u,m=l.find(`#${g}-tool-worldbooks`);if(!m.length)return;if(u.length===0){m.html(`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`);return}m.html(y.length>0?y.map(x=>`
        <div class="yyt-worldbook-item">
          <label class="yyt-checkbox-label">
            <input type="checkbox" data-worldbook-name="${h(x)}" ${f.includes(x)?"checked":""}>
            <span>${h(x)}</span>
          </label>
        </div>
      `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>');let b=f.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":f.length<=2?f.join("\u3001"):`\u5DF2\u9009 ${f.length} \u9879\uFF1A${f.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(b)}}}var ws,Cu,ss=z(()=>{Te();Pt();Ta();Ws();Zs();ka();ws=`
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
`;Cu=It});var Ve,Ca=z(()=>{ss();Ve=It({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Je,Pa=z(()=>{ss();Je=It({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var Xe,Ia=z(()=>{ss();Xe=It({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});function Hi(t=[],e={}){return t.map(s=>({...s,checked:e?.[s.key]===!0}))}function pr(t){let{id:e,toolId:s,previewDialogId:o,previewTitle:r="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:a=[],processorOptions:n=[],heroHint:i="",extractionPlaceholder:l=""}=t;return{id:e,toolId:s,render(){let c=Z(this.toolId);if(!c)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let d=c.processor||{},u=c.extraction||{},f=c.runtime?.lastStatus||"idle",y=c.runtime?.lastRunAt?new Date(c.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",m=c.runtime?.lastError||"",b=Array.isArray(u.selectors)?u.selectors.join(`
`):"",x=c.output?.overwrite!==!1,E=Hi(a,{[d.direction||a[0]?.key||""]:!0}),S=Hi(n,d.options||{});return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${h(c.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${h(c.description||"")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u672C\u5730\u811A\u672C\u5904\u7406</span>
              <span class="yyt-tool-hero-chip">\u5199\u56DE ${x?"\u8986\u76D6":"\u8FFD\u52A0"}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${h(f)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${g}-tool-save-top">
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
              <input type="checkbox" id="${g}-tool-enabled" ${c.enabled!==!1?"checked":""}>
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
                <input type="number" class="yyt-input" id="${g}-tool-max-messages" min="1" max="50" value="${Number(u.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${g}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${h(l)}">${h(b)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u5B9A\u4F4D\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u5B9A\u4F4D\u3002\u624B\u52A8\u6267\u884C\u4F1A\u57FA\u4E8E\u6700\u65B0 AI \u6D88\u606F\u5168\u6587\u539F\u4F4D\u66FF\u6362\uFF0C\u5C3D\u91CF\u4FDD\u7559\u5916\u5C42\u6807\u7B7E\u548C\u5176\u4F59\u539F\u6587\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shuffle"></i>
              <span>\u6267\u884C\u79CD\u7C7B</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              ${E.map(M=>`
                <label class="yyt-local-choice-card">
                  <div class="yyt-checkbox-label">
                    <input type="radio" name="${g}-processor-direction-${this.toolId}" value="${h(M.key)}" ${M.checked?"checked":""}>
                    <span>${h(M.label)}</span>
                  </div>
                  <div class="yyt-local-choice-desc">${h(M.description||"")}</div>
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
              ${S.map(M=>`
                <div class="yyt-local-option-card">
                  <label class="yyt-checkbox-label">
                    <span>${h(M.label)}</span>
                    <input type="checkbox" data-option-key="${h(M.key)}" ${M.checked?"checked":""}>
                  </label>
                  <div class="yyt-tool-compact-hint">${h(M.description||"")}</div>
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
                  <input type="radio" name="${g}-output-mode-${this.toolId}" value="replace" ${x?"checked":""}>
                  <span>\u8986\u76D6\u539F\u5DE5\u5177\u5757</span>
                </div>
                <div class="yyt-local-choice-desc">\u4F18\u5148\u66FF\u6362\u8BE5\u5DE5\u5177\u6B64\u524D\u5199\u5165\u7684\u5185\u5BB9\u3002</div>
              </label>
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${g}-output-mode-${this.toolId}" value="append" ${x?"":"checked"}>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${h(f)}">${h(f)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${h(y)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${c.runtime?.successCount||0} / ${c.runtime?.errorCount||0}</span>
                </div>
                ${m?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${h(m)}</span>
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
                <div class="yyt-tool-compact-hint">${h(i||"\u4FDD\u5B58\u540E\u53EF\u76F4\u63A5\u5BF9\u6700\u8FD1 AI \u6D88\u606F\u505A\u672C\u5730\u6587\u672C\u5904\u7406\u3002")}</div>
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
        </div>
      `},_getFormData(c){let d=P(),u=Z(this.toolId)||{};if(!d||!O(c))return u;let f=(c.find(`#${g}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean),y=c.find(`input[name="${g}-processor-direction-${this.toolId}"]:checked`).val()||a[0]?.key||"",m=c.find(`input[name="${g}-output-mode-${this.toolId}"]:checked`).val()||"replace",b={};return c.find("[data-option-key]").each((x,E)=>{let S=d(E);b[S.data("option-key")]=S.is(":checked")}),{enabled:c.find(`#${g}-tool-enabled`).is(":checked"),extractTags:f,output:{...u.output||{},mode:"local_transform",overwrite:m!=="append",enabled:!0},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(c.find(`#${g}-tool-max-messages`).val(),10)||5),selectors:f},processor:{...u.processor||{},direction:y,options:b},runtime:{...u.runtime||{}}}},_showExtractionPreview(c,d){if(!P())return;let f=`${g}-${o}`,y=Array.isArray(d.messageEntries)?d.messageEntries:[],m=y.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${y.map((b,x)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${x===y.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${y.length-x} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${h(b.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${h(b.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${h(b.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";c.append(Ut({id:f,title:r,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${h((d.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${h(d.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${h(d.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${h(d.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${m}
        `})),Wt(c,f,{onSave:b=>b()}),c.find(`#${f}-save`).text("\u5173\u95ED"),c.find(`#${f}-cancel`).remove()},bindEvents(c){if(!P()||!O(c))return;let u=this;c.off(".yytLocalToolPanel"),c.on("click.yytLocalToolPanel",`#${g}-tool-save, #${g}-tool-save-top`,()=>{u._saveConfig(c,{silent:!1})}),c.on("click.yytLocalToolPanel",`#${g}-tool-run-manual`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let y=await ur(u.toolId);!y?.success&&y?.error&&he("warning",y.error,{duration:3200,noticeId:`yyt-tool-run-${u.toolId}`})}catch(y){w("error",y?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{u.renderTo(c)}}),c.on("click.yytLocalToolPanel",`#${g}-tool-preview-extraction`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let y=await yr(u.toolId);if(!y?.success){w("error",y?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}u._showExtractionPreview(c,y)}catch(y){w("error",y?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),c.on("click.yytLocalToolPanel",`#${g}-tool-reset-template`,()=>{let f=fs(u.toolId);f?.promptTemplate&&(c.find(`#${g}-tool-prompt-template`).val(f.promptTemplate),w("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))})},_saveConfig(c,d={}){let u=this._getFormData(c),{silent:f=!1}=d,y=Be(this.toolId,u);return y?f||w("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):w("error","\u4FDD\u5B58\u5931\u8D25"),y},destroy(c){!P()||!O(c)||c.off(".yytLocalToolPanel")},getStyles(){return Pu},renderTo(c){c.html(this.render({})),this.bindEvents(c,{})}}}var Pu,$a=z(()=>{Te();Pt();ka();ss();Pu=`${ws}
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
`});var Qe,Ra=z(()=>{$a();Qe=pr({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]})});var Ze,Da=z(()=>{$a();Ze=pr({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]})});var os,Oa=z(()=>{fe();Zs();Te();os={id:"bypassPanel",render(t){let e=Y.getPresetList(),s=Y.getDefaultPresetId();return`
      <div class="yyt-bypass-panel">
        <!-- \u5DE6\u4FA7\u9884\u8BBE\u5217\u8868 -->
        <div class="yyt-bypass-sidebar">
          <div class="yyt-bypass-sidebar-header">
            <span class="yyt-bypass-sidebar-title">Ai\u6307\u4EE4\u9884\u8BBE</span>
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
            <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t,e){let s=vt&&vt[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${h(t.name)}</span>
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
          <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
        </div>
      `;let e=Y.getDefaultPresetId()===t.id,s=vt&&vt[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${h(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${h(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
            <select class="yyt-select yyt-bypass-role-select yyt-select-fixed-width">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${h(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=P();!s||!O(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s),we(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let o=e(s.currentTarget).data("presetId");this._selectPreset(t,e,o)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let o=e(s.currentTarget).data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=Y.deletePreset(o);r.success?(t.find(".yyt-bypass-editor-content").data("presetId")===o&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),w("success","\u9884\u8BBE\u5DF2\u5220\u9664")):w("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-delete-message",s=>{let o=e(s.currentTarget).closest(".yyt-bypass-message"),r=o.data("messageId");o.remove()}),t.on("change.yytBypass",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async s=>{let o=s.target.files[0];if(o){try{let r=await ft(o),a=Y.importPresets(r);w(a.success?"success":"error",a.message),a.success&&this.renderTo(t)}catch(r){w("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let s=Y.exportPresets();gt(s,`bypass_presets_${Date.now()}.json`),w("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){w("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let o=Y.getPreset(s);o&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(o)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,o=Y.createPreset({id:s,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});o.success?(this.renderTo(t),this._selectPreset(t,e,s),w("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):w("error",o?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),o=s.data("presetId");if(!o)return;let r=s.find(".yyt-bypass-name-input").val().trim(),a=s.find("#yyt-bypass-description").val().trim();if(!r){w("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let n=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);n.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let i=Y.updatePreset(o,{name:r,description:a,messages:n});i.success?(w("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):w("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let o=t.find(".yyt-bypass-editor-content").data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=Y.deletePreset(o);r.success?(this.renderTo(t),w("success","\u9884\u8BBE\u5DF2\u5220\u9664")):w("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let o=t.find(".yyt-bypass-editor-content").data("presetId");if(!o)return;let r=`bypass_${Date.now()}`,a=Y.duplicatePreset(o,r);a.success?(this.renderTo(t),this._selectPreset(t,e,r),w("success","\u9884\u8BBE\u5DF2\u590D\u5236")):w("error",a?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let o=t.find(".yyt-bypass-editor-content").data("presetId");o&&(Y.setDefaultPresetId(o),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),w("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(o))},_refreshPresetList(t,e){let s=Y.getPresetList(),o=Y.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(r=>this._renderPresetItem(r,r.id===o)).join(""))},destroy(t){!P()||!O(t)||(ye(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
        font-size: 12px;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Ji={};de(Ji,{SettingsPanel:()=>xt,applyTheme:()=>Vi,applyUiPreferences:()=>La,default:()=>$u});function Ts({id:t,checked:e=!1,title:s="",hint:o=""}){return`
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
  `}function qi(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function ao(){return qi()?.document||document}function Gi(t=ao()){return t?.documentElement||document.documentElement}function Vi(t,e=ao()){let s=Gi(e),o={...Iu,...Yi[t]||Yi["dark-blue"]};Object.entries(o).forEach(([r,a])=>{s.style.setProperty(r,a)}),s.setAttribute("data-yyt-theme",t)}function La(t={},e=ao()){let s=Gi(e),{theme:o="dark-blue",compactMode:r=!1,animationEnabled:a=!0}=t||{};Vi(o,e),s.classList.toggle("yyt-compact-mode",!!r),s.classList.toggle("yyt-no-animation",!a)}var Iu,Yi,xt,$u,gr=z(()=>{fe();to();oo();Te();Iu={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-2":"rgba(255, 255, 255, 0.05)","--yyt-surface-3":"rgba(255, 255, 255, 0.075)","--yyt-surface-hover":"rgba(255, 255, 255, 0.08)","--yyt-surface-active":"rgba(255, 255, 255, 0.11)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-soft":"rgba(255, 255, 255, 0.05)","--yyt-border-strong":"rgba(255, 255, 255, 0.16)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.72)","--yyt-text-muted":"rgba(255, 255, 255, 0.5)","--yyt-focus-ring":"0 0 0 3px rgba(123, 183, 255, 0.18)","--yyt-on-accent":"#0b0f15","--yyt-control-bg":"linear-gradient(180deg, #1d2737 0%, #151d2a 100%)","--yyt-control-bg-hover":"linear-gradient(180deg, #243247 0%, #1a2638 100%)","--yyt-control-bg-active":"linear-gradient(180deg, #2a3951 0%, #1d2b3f 100%)","--yyt-control-bg-strong":"linear-gradient(180deg, #243247 0%, #192435 100%)","--yyt-control-bg-focus":"linear-gradient(180deg, #243a57 0%, #1a2a3f 100%)","--yyt-control-border":"rgba(146, 173, 212, 0.24)","--yyt-control-border-hover":"rgba(146, 173, 212, 0.36)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.72)","--yyt-control-shadow":"0 12px 24px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.04)","--yyt-control-shadow-hover":"0 16px 28px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06)","--yyt-control-shadow-focus":"0 18px 30px rgba(8, 14, 24, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06)","--yyt-control-shadow-active":"0 10px 20px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.04)","--yyt-select-surface":"#121a26","--yyt-select-option-bg":"#192334","--yyt-select-option-hover-bg":"#233249","--yyt-select-option-selected-bg":"#2a3f60","--yyt-select-option-border":"rgba(123, 183, 255, 0.22)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.4)","--yyt-select-dropdown-shadow":"0 24px 44px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(8, 12, 18, 0.82)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.52)"},Yi={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.72)","--yyt-text-muted":"rgba(15, 23, 42, 0.52)","--yyt-surface":"rgba(255, 255, 255, 0.66)","--yyt-surface-2":"rgba(255, 255, 255, 0.86)","--yyt-surface-3":"rgba(255, 255, 255, 0.94)","--yyt-surface-hover":"rgba(255, 255, 255, 0.92)","--yyt-surface-active":"rgba(255, 255, 255, 0.98)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.05)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 3px rgba(59, 130, 246, 0.14)","--yyt-on-accent":"#0f172a","--yyt-control-bg":"linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.98) 100%)","--yyt-control-bg-hover":"linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(226, 232, 240, 0.98) 100%)","--yyt-control-bg-active":"linear-gradient(180deg, rgba(239, 246, 255, 1) 0%, rgba(219, 234, 254, 0.98) 100%)","--yyt-control-bg-strong":"linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(241, 245, 249, 0.98) 100%)","--yyt-control-bg-focus":"linear-gradient(180deg, rgba(239, 246, 255, 1) 0%, rgba(219, 234, 254, 0.98) 100%)","--yyt-control-border":"rgba(59, 130, 246, 0.18)","--yyt-control-border-hover":"rgba(59, 130, 246, 0.28)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.58)","--yyt-control-shadow":"0 10px 22px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.75)","--yyt-control-shadow-hover":"0 12px 24px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85)","--yyt-control-shadow-focus":"0 14px 26px rgba(59, 130, 246, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.9)","--yyt-control-shadow-active":"0 8px 18px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.85)","--yyt-select-surface":"#ffffff","--yyt-select-option-bg":"#f8fafc","--yyt-select-option-hover-bg":"#eff6ff","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.16)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.34)","--yyt-select-dropdown-shadow":"0 18px 32px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(148, 163, 184, 0.18)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.45)"}};xt={id:"settingsPanel",render(){let t=Pe.getSettings(),e=t.debug?.enableDebugLog===!0,s=t.automation?.enabled===!0,o=this._getAutomationRuntime();return`
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
    `},_renderAutomationTab(t={},e=null){let s=t.enabled===!0,o=Array.isArray(e?.recentTransactions)?e.recentTransactions.slice().reverse():[],r=e?.hostBinding||{},a=Array.isArray(r.eventBindings)&&r.eventBindings.length>0?r.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",n=o.length>0?o.map(i=>{let l=i?.results?.[0]?.meta?.writebackDetails?.refresh||{},c=Array.isArray(l?.requestMethods)?l.requestMethods.join(" / "):"",d=l?.eventSource||l?.eventName||c||l?.confirmedBy;return`
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
            ${Ts({id:"yyt-setting-automationEnabled",checked:t.enabled,title:"\u542F\u7528\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1",hint:"\u8FD9\u91CC\u53EA\u4FDD\u7559\u4E00\u4E2A\u5168\u5C40\u5F00\u5173\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u5904\u4E8E\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u7684\u5DE5\u5177\u90FD\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\u3002"})}
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
          <div class="yyt-form-hint">\u4E8B\u4EF6\u7ED1\u5B9A\uFF1A<code>${a}</code></div>
          ${r.lastError?`<div class="yyt-form-hint">\u6700\u8FD1\u9519\u8BEF\uFF1A<code>${r.lastError}</code></div>`:""}
          ${r.retryScheduled?`<div class="yyt-form-hint">\u5DF2\u5B89\u6392\u91CD\u8BD5\uFF1A<code>${r.retryDelayMs||0}ms</code></div>`:""}
          <div class="yyt-form-hint">\u82E5\u81EA\u52A8\u89E6\u53D1\u5931\u8D25\uFF0C\u4F18\u5148\u770B\u6700\u8FD1\u4E8B\u52A1\u7684 verdict\uFF0C\u4F8B\u5982 <code>automation_disabled</code>\u3001<code>no_auto_tools</code>\u3001<code>assistant_message_not_found</code>\u3002</div>
          <div class="yyt-settings-runtime-list">${n}</div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            ${Ts({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F"})}
          </div>

          <div class="yyt-form-group">
            ${Ts({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${Ts({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${Ts({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${Ts({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return ze.getAvailableVariables().map(t=>`
        <div class="yyt-settings-macro-item">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=P();if(!e||!O(t))return;let s=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let r=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${r}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{s._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Pe.resetSettings(),La(eo.ui,ao()),s.renderTo(t),w("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),we(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]})},_saveSettings(t){let e={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{enabled:t.find("#yyt-setting-automationEnabled").is(":checked"),settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Pe.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Pe.saveSettings(e),La(e.ui,ao()),w("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return qi()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!P()||!O(t)||(ye(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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

      .yyt-settings-content .yyt-form-group {
        gap: 12px;
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
        overflow: visible;
        display: flex;
        flex-direction: column;
        gap: 16px;
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
        margin-bottom: 0;
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},$u=xt});function ae(t){return t==null?"":String(t).trim()}function Se(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Ss(t={}){return{chatId:ae(t.chatId),sourceMessageId:ae(t.sourceMessageId||t.messageId),sourceSwipeId:ae(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ae(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:ae(t.slotBindingKey),slotRevisionKey:ae(t.slotRevisionKey),slotTransactionId:ae(t.slotTransactionId),traceId:ae(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function Na(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:ae(t.runSource)||dt.MANUAL,traceId:ae(t.traceId),chatId:ae(t.chatId),sourceMessageId:ae(t.sourceMessageId||t.messageId),sourceSwipeId:ae(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ae(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:ae(t.slotBindingKey),slotRevisionKey:ae(t.slotRevisionKey),slotTransactionId:ae(t.slotTransactionId),assistantContentFingerprint:ae(t.assistantContentFingerprint),assistantBaseFingerprint:ae(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function io(t){return!t||typeof t!="object"?null:{slotBindingKey:ae(t.slotBindingKey),slotRevisionKey:ae(t.slotRevisionKey),sourceMessageId:ae(t.sourceMessageId),sourceSwipeId:ae(t.sourceSwipeId),tables:Array.isArray(t.tables)?Se(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?Se(t.meta):{}}}function mr(t={},e={}){let s=Na(t);return{slotBindingKey:s.slotBindingKey,slotRevisionKey:s.slotRevisionKey,sourceMessageId:s.sourceMessageId,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId,tables:Array.isArray(e.tables)?Se(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:e.meta&&typeof e.meta=="object"?Se(e.meta):{}}}function br(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?Ss(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?Ss(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}var fr,_s,dt,no,Es=z(()=>{fr="YouYouToolkit_tableState",_s="YouYouToolkit_tableBindings",dt=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),no=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",TEMPLATE:"template",EMPTY:"empty"})});function ne(t,e=""){return t==null?e:String(t).trim()||e}function Du(t,e=!1){return t==null?e:t===!0}function Ou(t){return Array.isArray(t)?Se(t):[]}function Xi(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Lu(t,e="col"){return ne(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function tl(t,e=new Set){let s=Lu(t,"col"),o=s,r=2;for(;e.has(o);)o=`${s}_${r}`,r+=1;return e.add(o),o}function Nu(t=[]){let e=[],s=0;return t.forEach(o=>{let r=o&&typeof o=="object"?o:{},a=r.cells&&typeof r.cells=="object"&&!Array.isArray(r.cells)?r.cells:null,n=Array.isArray(r.cells)?r.cells:Array.isArray(r.values)?r.values:null;a&&Object.keys(a).forEach(i=>{e.includes(i)||e.push(i)}),n&&n.length>s&&(s=n.length)}),e.length>0?e.map(o=>({key:o,title:String(o)})):s>0?Array.from({length:s},(o,r)=>({key:`col_${r+1}`,title:`\u5217${r+1}`})):[]}function sl(t,e=As){let s=ne(t,e);return Zi.some(o=>o.value===s)?s:e}function Bu(t={},e=0,s=new Set){let o=t&&typeof t=="object"?t:{},r=ne(o.title||o.name||o.label,`\u5217${e+1}`),a=ne(o.key||o.id,""),n=tl(a||r||`col_${e+1}`,s),i=[a,ne(o.title,""),ne(o.name,""),ne(o.label,"")].filter(Boolean);return{key:n,title:r,description:ne(o.description||o.note,""),type:sl(o.type),required:o.required===!0,sourceKeys:i}}function zu(t={},e={},s=0){let o=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,r=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(o){let a=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let n of a)if(o[n]!==void 0)return Xi(o[n])}return r&&r[s]!==void 0?Xi(r[s]):""}function Uu(t={},e=[],s=0){let o=t&&typeof t=="object"?t:{},r={};return e.forEach((a,n)=>{r[a.key]=zu(o,a,n)}),{name:ne(o.name||o.title||o.label,`\u884C${s+1}`),cells:r}}function ol(t={},e=0){let s=t&&typeof t=="object"?t:{},o=new Set,a=(Array.isArray(s.columns)&&s.columns.length>0?s.columns:Nu(Array.isArray(s.rows)?s.rows:[])).map((i,l)=>Bu(i,l,o)),n=Array.isArray(s.rows)?s.rows.map((i,l)=>Uu(i,a,l)):[];return{name:ne(s.name||s.title,`\u8868${e+1}`),note:ne(s.note||s.description,""),columns:a.map(i=>({key:i.key,title:i.title,description:ne(i.description,""),type:sl(i.type),required:i.required===!0})),rows:n}}function rl(t={}){let e=t&&typeof t=="object"?t:{};return{lastStatus:ne(e.lastStatus,lo.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:ne(e.lastError,""),successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:ne(e.lastSourceMessageId,""),lastSlotRevisionKey:ne(e.lastSlotRevisionKey,""),lastLoadMode:ne(e.lastLoadMode,""),lastMirrorApplied:e.lastMirrorApplied===!0}}function Ua(t=1,e=[]){let s=new Set((Array.isArray(e)?e:[]).map(r=>ne(r?.key,"")).filter(Boolean));return{key:tl(`col_${t}`,s),title:`\u5217${t}`,description:"",type:As,required:!1}}function Wu(t=[],e=1){let s={};return(Array.isArray(t)?t:[]).forEach(o=>{let r=ne(o?.key,"");r&&(s[r]="")}),{name:`\u884C${e}`,cells:s}}function Wa(t=1){let e=Ua(1);return{name:`\u8868${t}`,note:"",columns:[e],rows:[Wu([e],1)]}}function ju(){return{tables:[]}}function al(t=[]){return!Array.isArray(t)||t.length===0?ju():{tables:t.map((e,s)=>ol(e,s))}}function ja(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((o,r)=>ol(o,r))}function Fa(t={}){let e=[];(!t||typeof t!="object")&&e.push("\u8868\u5B9A\u4E49\u8349\u7A3F\u65E0\u6548\u3002"),t&&t.tables!==void 0&&!Array.isArray(t.tables)&&e.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u5305\u542B tables \u6570\u7EC4\u3002");let s=[];if(e.length===0)try{s=ja(t)}catch(o){e.push(o?.message||"\u8868\u5B9A\u4E49\u7F16\u8BD1\u5931\u8D25\u3002")}return{valid:e.length===0,errors:e,tables:s}}function nl(){return{tables:[],promptTemplate:Qi,apiPreset:"",mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",runtime:rl()}}function et(t={}){let e=nl(),s=t&&typeof t=="object"?t:{};return{tables:Ou(s.tables),promptTemplate:ne(s.promptTemplate,e.promptTemplate),apiPreset:ne(s.apiPreset,""),mirrorToMessage:Du(s.mirrorToMessage,e.mirrorToMessage),mirrorTag:ne(s.mirrorTag,e.mirrorTag),runtime:rl({...e.runtime,...s.runtime||{}})}}function Ka(t={}){let e=et(t),s=[];return Array.isArray(e.tables)||s.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||s.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||s.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:s.length===0,errors:s,config:e}}function rs(){let t=Ba.get(za,nl());return et(t)}function il(t={}){let e=rs(),s=et({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),o=Ka(s);return o.valid?(Ba.set(za,o.config),{success:!0,config:o.config}):{success:!1,error:o.errors.join(`
`),errors:o.errors,config:o.config}}function hr(t={}){let e=rs(),s=et({...e,runtime:{...e.runtime,...t||{}}});return Ba.set(za,s),s.runtime}function Fu(t={}){let e=et(t);return`${ne(e.promptTemplate,Qi)}

${Ru}`.trim()}function ll(t={}){return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Fu(t),bypass:{enabled:!1}}}function cl({apiPresets:t=[]}={}){let e=[{value:"",label:"\u5F53\u524D API \u914D\u7F6E"},...t.map(s=>({value:String(s?.name||""),label:String(s?.name||"")})).filter(s=>s.value)];return[{name:"tables",type:"tableDefinitions",label:"\u8868\u5B9A\u4E49",description:"\u901A\u8FC7\u7ED3\u6784\u5316\u7F16\u8F91\u5668\u7EF4\u62A4 tables\u3002\u9996\u6B21\u6267\u884C\u6216\u5F53\u524D\u6D88\u606F\u5C1A\u65E0\u7ED1\u5B9A state \u65F6\uFF0C\u4F1A\u4EE5\u7F16\u8BD1\u540E\u7684 tables \u4F5C\u4E3A merge base\u3002",emptyValue:[]},{name:"promptTemplate",type:"textarea",label:"\u586B\u8868 Prompt",rows:12,description:"\u53EF\u4F7F\u7528 {{lastUserMessage}}\u3001{{lastAiMessage}}\u3001{{chatHistory}}\u3001{{toolContentMacro}} \u7B49\u53D8\u91CF\u3002\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u8FFD\u52A0 JSON \u8F93\u51FA\u7EA6\u675F\u3002"},{name:"apiPreset",type:"select",label:"API \u9884\u8BBE",description:"\u4E3A\u7A7A\u65F6\u4F7F\u7528\u5F53\u524D\u5168\u5C40 API \u914D\u7F6E\u3002",options:e},{name:"mirrorToMessage",type:"checkbox",label:"\u955C\u50CF\u5199\u56DE\u6B63\u6587",description:"\u628A\u5F53\u524D tables \u7684 JSON \u9884\u89C8\u955C\u50CF\u5230\u76EE\u6807 assistant \u6D88\u606F\u6B63\u6587\u4E2D\u3002"}]}var Ba,za,lo,Qi,Ru,Zi,As,el,co=z(()=>{Re();Es();Ba=A.namespace("tableWorkbench"),za="config",lo=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"}),Qi=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u66F4\u65B0\u7ED3\u6784\u5316 tables \u6570\u636E\u3002

\u8981\u6C42\uFF1A
1. \u53EA\u4F9D\u636E\u5F53\u524D\u5BF9\u8BDD\u5185\u5BB9\u66F4\u65B0\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002
2. \u4FDD\u6301\u539F\u6709\u8868\u7ED3\u6784\uFF1B\u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\u3002
3. \u5982\u679C\u67D0\u5B57\u6BB5\u9700\u8981\u6E05\u7A7A\uFF0C\u8BF7\u663E\u5F0F\u8F93\u51FA\u7A7A\u5B57\u7B26\u4E32\u3001\u7A7A\u6570\u7EC4\u6216 null\u3002
4. \u4F18\u5148\u53C2\u8003\u5F53\u524D assistant \u56DE\u590D\uFF1A{{lastAiMessage}}
5. \u5F53\u524D\u8868\u683C\u57FA\u5E95 JSON\uFF1A
{{toolContentMacro}}`,Ru=`\u8F93\u51FA\u8981\u6C42\uFF1A
- \u53EA\u8FD4\u56DE JSON
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown
- JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}`,Zi=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),As="text",el=Object.freeze(Zi.map(t=>Object.freeze({...t})))});function $t(t=[],e=-1,s=-1){if(!Array.isArray(t))return[];if(!Number.isInteger(e)||!Number.isInteger(s)||e<0||s<0||e>=t.length||s>=t.length||e===s)return[...t];let o=[...t],[r]=o.splice(e,1);return o.splice(s,0,r),o}function Ha(t,e={},s={}){let o=Number.isInteger(s.size)?s.size:0,r=Number.isInteger(s.currentIndex)?s.currentIndex:-1,a=r<=0,n=r<0||r>=o-1,i=Object.entries(e).filter(([,l])=>Number.isInteger(l)).map(([l,c])=>`data-${l}="${c}"`).join(" ");return`
    <div class="yyt-table-editor-move-controls">
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-up" ${i} ${a?"disabled":""}>
        <i class="fa-solid fa-arrow-up"></i>
      </button>
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-down" ${i} ${n?"disabled":""}>
        <i class="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  `}function Ku(t=As){return el.map(e=>`
    <option value="${h(e.value)}" ${e.value===t?"selected":""}>${h(e.label)}</option>
  `).join("")}function dl(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Hu(t,e){if(t.type==="json"){let s=e===void 0?t.emptyValue:e;if(typeof s=="string")return s;try{return JSON.stringify(s??null,null,2)}catch{return String(s??"")}}return String(e??"")}function Yu(t={},e=""){let s=String(t.name||"").trim(),o=`yyt-table-field-${s}`,r=`${o}-value`,a=`${o}-dropdown`,n=So(t.options||[]);return _o({selectedValue:e,options:n,placeholder:n[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{"data-table-custom-select":"true"},nativeAttributes:{class:"yyt-table-select-native",id:r,"data-table-field":s,"data-field-type":"select"},triggerAttributes:{id:o,"data-table-select-trigger":"true","aria-controls":a},dropdownAttributes:{id:a,"data-table-select-dropdown":"true"},optionAttributes:{"data-table-select-option":"true"}})}function qu(t={},e={},s=0){let o=t&&typeof t=="object"?t.cells:null;if(Array.isArray(o))return String(o[s]??"");if(o&&typeof o=="object"){if(o[e.key]!==void 0)return String(o[e.key]??"");if(o[e.title]!==void 0)return String(o[e.title]??"")}return""}function yl(t={}){return al(ja(t))}function Gu(t={},e={},s=0,o=0){let r=Array.isArray(t.columns)?t.columns:[],a=Ha("row",{"table-index":s,"row-index":o},{currentIndex:o,size:r.length>=0&&Array.isArray(t.rows)?t.rows.length:0});return`
    <tr data-table-editor-row="${o}">
      <td>
        <input type="text" class="yyt-input" data-table-editor-row-name value="${h(String(e?.name||""))}" placeholder="\u53EF\u7559\u7A7A\uFF0C\u9ED8\u8BA4\u4F1A\u81EA\u52A8\u547D\u540D">
      </td>
      ${r.map((n,i)=>`
        <td>
          <textarea class="yyt-textarea yyt-code-textarea-small"
                    data-table-editor-cell
                    data-column-index="${i}"
                    rows="2"
                    placeholder="${h(n.title||n.key||`\u5217${i+1}`)}">${h(qu(e,n,i))}</textarea>
        </td>
      `).join("")}
      <td>
        <div class="yyt-table-editor-row-actions">
          ${a}
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-row" data-table-index="${s}" data-row-index="${o}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `}function pl(t={},e=0,s={}){let o=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[],a=String(t?.name||"").trim(),n=s.showDeleteTable!==!1,i=Ha("table",{"table-index":e},{currentIndex:e,size:Number.isInteger(s.totalTables)?s.totalTables:0}),l=n?`
        <div class="yyt-table-editor-card-actions">
          ${i}
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-table" data-table-index="${e}">
            <i class="fa-solid fa-trash"></i> \u5220\u9664\u8868\u683C
          </button>
        </div>
      `:"";return`
    <div class="yyt-table-editor-card" data-table-editor-table="${e}">
      <div class="yyt-table-editor-card-head">
        <div class="yyt-table-editor-card-head-main">
          <div class="yyt-table-editor-card-title">${h(a||`\u8868\u683C ${e+1}`)}</div>
          <div class="yyt-table-editor-muted">\u76F4\u63A5\u628A\u8FD9\u5F20\u8868\u5F53\u666E\u901A\u8868\u683C\u7F16\u8F91\uFF1A\u5148\u5199\u8868\u5934\uFF0C\u518D\u586B\u6BCF\u4E00\u884C\u6570\u636E\u3002</div>
        </div>
        ${l}
      </div>

      <div class="yyt-table-editor-meta">
        <div class="yyt-table-editor-input-group">
          <span>\u8868\u683C\u540D\u79F0</span>
          <input type="text" class="yyt-input" data-table-editor-table-name value="${h(String(t?.name||""))}" placeholder="\u4F8B\u5982\uFF1A\u89D2\u8272\u72B6\u6001\u8868">
        </div>
        <div class="yyt-table-editor-input-group">
          <span>\u8FD9\u5F20\u8868\u662F\u505A\u4EC0\u4E48\u7684</span>
          <textarea class="yyt-textarea yyt-code-textarea-small" data-table-editor-table-note rows="2" placeholder="\u4F8B\u5982\uFF1A\u8BB0\u5F55\u89D2\u8272\u5F53\u524D\u72B6\u6001\u3001\u6570\u503C\u6216\u5907\u6CE8">${h(String(t?.note||""))}</textarea>
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <div>
            <div class="yyt-table-editor-section-title">\u8868\u5934\u8BBE\u7F6E</div>
            <div class="yyt-table-editor-section-desc">\u5217\u6807\u9898\u5C31\u662F\u4F60\u770B\u5230\u7684\u8868\u5934\u3002\u5185\u90E8\u540D\u4E00\u822C\u4E0D\u7528\u6539\uFF0C\u7559\u7A7A\u4E5F\u4F1A\u81EA\u52A8\u751F\u6210\u3002</div>
          </div>
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-column" data-table-index="${e}">
            <i class="fa-solid fa-plus"></i> \u65B0\u589E\u4E00\u5217
          </button>
        </div>
        <div class="yyt-table-editor-grid-wrap">
          <table class="yyt-table-editor-grid">
            <thead>
              <tr>
                <th>\u8868\u5934\u540D\u79F0</th>
                <th>\u5185\u90E8\u540D</th>
                <th>\u7C7B\u578B</th>
                <th>\u5FC5\u586B</th>
                <th>\u8BF4\u660E</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${o.length?o.map((c,d)=>`
                <tr class="yyt-table-editor-column" data-table-editor-column="${d}">
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-title value="${h(String(c?.title||""))}" placeholder="\u4F8B\u5982\uFF1A\u5C5E\u6027">
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-key value="${h(String(c?.key||""))}" placeholder="\u53EF\u7559\u7A7A\u81EA\u52A8\u751F\u6210">
                  </td>
                  <td>
                    <select class="yyt-select" data-table-editor-column-type>
                      ${Ku(String(c?.type||As))}
                    </select>
                  </td>
                  <td>
                    <label class="yyt-table-editor-column-required yyt-table-editor-column-required-inline">
                      <input type="checkbox" data-table-editor-column-required ${c?.required===!0?"checked":""}>
                      <span>\u5FC5\u586B</span>
                    </label>
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-description value="${h(String(c?.description||""))}" placeholder="\u53EF\u4E0D\u586B">
                  </td>
                  <td>
                    <div class="yyt-table-editor-column-actions">
                      ${Ha("column",{"table-index":e,"column-index":d},{currentIndex:d,size:o.length})}
                      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-column" data-table-index="${e}" data-column-index="${d}">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join(""):`
                <tr>
                  <td colspan="6">
                    <div class="yyt-table-editor-empty">
                      <div class="yyt-table-editor-section-title">\u8FD8\u6CA1\u6709\u8868\u5934</div>
                      <div class="yyt-table-editor-muted">\u5148\u65B0\u589E\u4E00\u5217\uFF0C\u586B\u4E0A\u4F60\u60F3\u5C55\u793A\u7684\u8868\u5934\u540D\u79F0\u3002</div>
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <div>
            <div class="yyt-table-editor-section-title">\u8868\u683C\u5185\u5BB9</div>
            <div class="yyt-table-editor-section-desc">\u4E0B\u9762\u6BCF\u4E00\u884C\u5C31\u662F\u4E00\u6761\u6570\u636E\u3002\u7B2C\u4E00\u5217\u53EA\u662F\u7ED9\u8FD9\u884C\u8D77\u4E2A\u540D\u5B57\uFF0C\u4E0D\u586B\u4E5F\u53EF\u4EE5\u3002</div>
          </div>
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-row" data-table-index="${e}">
            <i class="fa-solid fa-plus"></i> \u65B0\u589E\u4E00\u884C
          </button>
        </div>
        <div class="yyt-table-editor-grid-wrap">
          <table class="yyt-table-editor-grid">
            <thead>
              <tr>
                <th>\u8FD9\u4E00\u884C\u540D\u79F0</th>
                ${o.map((c,d)=>`<th>${h(c?.title||c?.key||`\u5217${d+1}`)}</th>`).join("")}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${r.length?r.map((c,d)=>Gu(t,c,e,d)).join(""):`
                <tr>
                  <td colspan="${Math.max(o.length+2,2)}">
                    <div class="yyt-table-editor-empty">
                      <div class="yyt-table-editor-section-title">\u8FD8\u6CA1\u6709\u6570\u636E\u884C</div>
                      <div class="yyt-table-editor-muted">\u5148\u65B0\u589E\u4E00\u884C\uFF0C\u518D\u6309\u8868\u683C\u65B9\u5F0F\u628A\u6BCF\u4E2A\u5355\u5143\u683C\u586B\u8FDB\u53BB\u3002</div>
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function Vu(t={},e=0,s={}){let o=Array.isArray(t?.columns)?t.columns:[],r=Array.isArray(t?.rows)?t.rows:[],a=s.mode==="create"?"create":"edit";return`
    <div class="yyt-table-editor yyt-table-editor-shell yyt-table-editor-shell-compact" data-table-dialog-root>
      <div class="yyt-table-editor-banner">
        <div class="yyt-table-editor-banner-copy">
          <div class="yyt-table-editor-banner-title">${a==="create"?"\u65B0\u589E\u8868\u683C":"\u7F16\u8F91\u5355\u5F20\u8868\u683C"}</div>
          <div class="yyt-table-editor-muted">${a==="create"?"\u5148\u5B8C\u6210\u8FD9\u5F20\u8868\u7684\u7ED3\u6784\u4E0E\u5185\u5BB9\uFF0C\u518D\u4FDD\u5B58\u56DE\u8868\u5B9A\u4E49\u5217\u8868\u3002\u521B\u5EFA\u5B8C\u6210\u540E\u53EF\u7EE7\u7EED\u8FFD\u52A0\u5176\u5B83\u8868\u3002":"\u5148\u5B8C\u6210\u5355\u5F20\u8868\u7684\u7ED3\u6784\u4E0E\u5185\u5BB9\uFF0C\u518D\u4FDD\u5B58\u56DE\u8868\u5B9A\u4E49\u5217\u8868\u3002\u8FD9\u91CC\u4E0D\u4F1A\u76F4\u63A5\u6539\u52A8\u5176\u5B83\u8868\u3002"}</div>
        </div>
        <div class="yyt-table-editor-banner-meta">
          <span class="yyt-table-editor-chip">${a==="create"?"\u521B\u5EFA\u6A21\u5F0F":"\u5355\u8868\u7F16\u8F91"}</span>
          <span class="yyt-table-editor-chip">${o.length} \u5217</span>
          <span class="yyt-table-editor-chip">${r.length} \u884C</span>
        </div>
      </div>
      ${pl(t,e,{showDeleteTable:!1})}
    </div>
  `}function gl(t={}){let e=Array.isArray(t?.tables)?t.tables:[],s=e.reduce((r,a)=>r+(Array.isArray(a?.columns)?a.columns.length:0),0),o=e.reduce((r,a)=>r+(Array.isArray(a?.rows)?a.rows.length:0),0);return`
    <div class="yyt-table-editor-shell">
      <div class="yyt-table-editor-banner">
        <div class="yyt-table-editor-banner-copy">
          <div class="yyt-table-editor-banner-title">\u8868\u683C\u7F16\u8F91\u5668</div>
          <div class="yyt-table-editor-muted">\u50CF\u6539\u666E\u901A\u8868\u683C\u4E00\u6837\u6539\u8FD9\u91CC\u3002\u4FDD\u5B58\u6216\u8FD0\u884C\u65F6\u4F1A\u81EA\u52A8\u6574\u7406\u6210\u7CFB\u7EDF\u8981\u7528\u7684\u683C\u5F0F\u3002</div>
        </div>
        <div class="yyt-table-editor-banner-meta">
          <span class="yyt-table-editor-chip">${e.length} \u5F20\u8868</span>
          <span class="yyt-table-editor-chip">${s} \u5217</span>
          <span class="yyt-table-editor-chip">${o} \u884C</span>
        </div>
      </div>
      <div class="yyt-table-editor-toolbar">
        <div class="yyt-table-editor-muted">\u5148\u5199\u8868\u5934\uFF0C\u518D\u586B\u5185\u5BB9\uFF1B\u987A\u5E8F\u4E0D\u5BF9\u5C31\u76F4\u63A5\u4E0A\u79FB\u4E0B\u79FB\u3002</div>
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-primary" data-table-editor-action="add-table">
          <i class="fa-solid fa-plus"></i> \u65B0\u589E\u8868\u683C
        </button>
      </div>
      <div class="yyt-table-editor-stack">
        ${e.length?e.map((r,a)=>pl(r,a,{totalTables:e.length})).join(""):`
          <div class="yyt-table-editor-empty">
            <div class="yyt-table-editor-section-title">\u8FD8\u6CA1\u6709\u8868\u683C</div>
            <div class="yyt-table-editor-muted">\u70B9\u201C\u65B0\u589E\u8868\u683C\u201D\uFF0C\u5148\u8D77\u540D\u5B57\uFF0C\u518D\u52A0\u8868\u5934\u548C\u5185\u5BB9\u3002</div>
          </div>
        `}
      </div>
    </div>
  `}function Ju(t={},e={}){let s=String(t.name||"").trim(),o=h(t.label||s),r=t.description?`<div class="yyt-table-form-field-desc">${h(t.description)}</div>`:"",a=yl({tables:Array.isArray(e[s])?e[s]:[]});return`
    <div class="yyt-table-form-field" data-table-form-item="${h(s)}">
      <label>${o}</label>
      <div class="yyt-table-editor" data-table-field="${h(s)}" data-field-type="tableDefinitions" data-table-definition-root>
        ${gl(a)}
      </div>
      ${r}
    </div>
  `}function Xu(t,e={},s={}){if(!P()||!O(t))return null;let r=s.mode==="create"?"create":"edit",a=`yyt-table-definition-dialog-${Date.now()}`,n=Ut({id:a,title:r==="create"?"\u65B0\u589E\u8868\u683C":"\u7F16\u8F91\u8868\u683C",body:Vu(e,0,{mode:r}),wide:!0,width:"min(900px, calc(100vw - 32px))",dialogClass:"yyt-table-editor-dialog",bodyClass:"yyt-table-editor-dialog-body",footerClass:"yyt-table-editor-dialog-footer"});return t.append(n),t.find(`#${a}-save`).html(`<i class="fa-solid fa-check"></i> ${r==="create"?"\u6DFB\u52A0\u8868\u683C":"\u4FDD\u5B58\u8868\u683C"}`),t.find(`#${a}-cancel`).html('<i class="fa-solid fa-arrow-left"></i> \u8FD4\u56DE'),t.find(`#${a}-cancel`).before('<div class="yyt-table-editor-dialog-note">\u4FDD\u5B58\u540E\u4F1A\u628A\u5F53\u524D\u8868\u5199\u56DE\u8868\u5B9A\u4E49\u5217\u8868\uFF0C\u4E0D\u4F1A\u76F4\u63A5\u5F71\u54CD\u5176\u5B83\u8868\u3002</div>'),Wt(t,a,{onSave:i=>{let l=t.find(`#${a}-overlay [data-table-dialog-root]`),c=Fa(uo(l));if(!c.valid){w("error",c.errors.join(`
`));return}typeof s.onSave=="function"&&s.onSave(c.tables[0]||Wa(1)),i()},onClose:()=>{typeof s.onClose=="function"&&s.onClose()}}),a}function Qu(t={},e={}){let s=String(t.name||"").trim();if(!s)return"";if(t.type==="tableDefinitions")return Ju(t,e);let o=e[s],r=h(t.label||s),a=t.description?`<div class="yyt-table-form-field-desc">${h(t.description)}</div>`:"",n=Number.isFinite(t.rows)?t.rows:6;return t.type==="checkbox"?`
      <div class="yyt-table-form-field" data-table-form-item="${h(s)}">
        <label class="yyt-table-form-inline-checkbox">
          <input type="checkbox" data-table-field="${h(s)}" data-field-type="checkbox" ${o===!0?"checked":""}>
          <span>${r}</span>
        </label>
        ${a}
      </div>
    `:t.type==="select"?`
      <div class="yyt-table-form-field" data-table-form-item="${h(s)}">
        <label for="yyt-table-field-${h(s)}">${r}</label>
        ${Yu(t,o)}
        ${a}
      </div>
    `:`
    <div class="yyt-table-form-field" data-table-form-item="${h(s)}">
      <label for="yyt-table-field-${h(s)}">${r}</label>
      <textarea class="yyt-textarea yyt-code-textarea ${t.type==="json"?"":"yyt-code-textarea-small"}"
                id="yyt-table-field-${h(s)}"
                data-table-field="${h(s)}"
                data-field-type="${h(t.type||"textarea")}"
                rows="${n}">${h(Hu(t,o))}</textarea>
      ${a}
    </div>
  `}function uo(t){let e=P();return!e||!t?.length?{tables:[]}:{tables:t.find("[data-table-editor-table]").map((o,r)=>{let a=e(r),n=a.find("[data-table-editor-column]").map((l,c)=>{let d=e(c);return{title:String(d.find("[data-table-editor-column-title]").val()||""),key:String(d.find("[data-table-editor-column-key]").val()||""),description:String(d.find("[data-table-editor-column-description]").val()||""),type:String(d.find("[data-table-editor-column-type]").val()||As),required:d.find("[data-table-editor-column-required]").is(":checked")}}).get(),i=a.find("[data-table-editor-row]").map((l,c)=>{let d=e(c);return{name:String(d.find("[data-table-editor-row-name]").val()||""),cells:d.find("[data-table-editor-cell]").map((u,f)=>String(e(f).val()||"")).get()}}).get();return{name:String(a.find("[data-table-editor-table-name]").val()||""),note:String(a.find("[data-table-editor-table-note]").val()||""),columns:n,rows:i}}).get()}}function Zu(t=[],e=1){return{name:`\u884C${e}`,cells:Array.from({length:Array.isArray(t)?t.length:0},()=>"")}}function wt(t,e={},s={}){t.html(gl(yl(s)))}function fl(t,e=[],s={}){let o=P();if(!o||!O(t))return;let r=Array.isArray(e)?e:[],a=l=>{let c=String(l.attr("data-table-field")||"").trim();return r.find(d=>String(d?.name||"").trim()===c)||{name:c}},n=()=>{typeof s.onChange=="function"&&s.onChange()};t.off(".yytTableForm"),t.on("click.yytTableForm","[data-table-definition-root] [data-table-editor-action]",l=>{l.preventDefault();let c=o(l.currentTarget),d=String(c.attr("data-table-editor-action")||"").trim(),u=c.closest("[data-table-definition-root]");if(!u.length)return;let f=a(u),y=uo(u),m=Array.isArray(y.tables)?y.tables:[],b=Number.parseInt(c.attr("data-table-index")||"",10),x=Number.parseInt(c.attr("data-column-index")||"",10),E=Number.parseInt(c.attr("data-row-index")||"",10);if(d==="add-table"){Xu(t,Wa(m.length+1),{mode:"create",onSave:S=>{let M=uo(u),R=Array.isArray(M.tables)?M.tables:[];R.push(S),wt(u,f,{tables:R}),n()}});return}if(d==="delete-table"&&Number.isInteger(b)&&b>=0&&b<m.length&&m.splice(b,1),d==="move-table-up"&&Number.isInteger(b)){let S=$t(m,b,b-1);wt(u,f,{tables:S}),n();return}if(d==="move-table-down"&&Number.isInteger(b)){let S=$t(m,b,b+1);wt(u,f,{tables:S}),n();return}if(d==="add-column"&&Number.isInteger(b)&&b>=0&&b<m.length){let S=m[b]||{},M=Array.isArray(S.columns)?S.columns:[],R=Ua(M.length+1,M);S.columns=[...M,R],S.rows=(Array.isArray(S.rows)?S.rows:[]).map((U,F)=>({name:String(U?.name||`\u884C${F+1}`),cells:[...Array.isArray(U?.cells)?U.cells:[],""]}))}if(d==="delete-column"&&Number.isInteger(b)&&b>=0&&b<m.length){let S=m[b]||{},M=Array.isArray(S.columns)?S.columns:[];Number.isInteger(x)&&x>=0&&x<M.length&&(S.columns=M.filter((R,U)=>U!==x),S.rows=(Array.isArray(S.rows)?S.rows:[]).map((R,U)=>{let F=Array.isArray(R?.cells)?[...R.cells]:[];return F.splice(x,1),{name:String(R?.name||`\u884C${U+1}`),cells:F}}))}if(d==="move-column-up"&&Number.isInteger(b)&&Number.isInteger(x)&&b>=0&&b<m.length){let S=m[b]||{},M=Array.isArray(S.columns)?S.columns:[];S.columns=$t(M,x,x-1),S.rows=(Array.isArray(S.rows)?S.rows:[]).map((R,U)=>({name:String(R?.name||`\u884C${U+1}`),cells:$t(Array.isArray(R?.cells)?R.cells:[],x,x-1)})),wt(u,f,{tables:m}),n();return}if(d==="move-column-down"&&Number.isInteger(b)&&Number.isInteger(x)&&b>=0&&b<m.length){let S=m[b]||{},M=Array.isArray(S.columns)?S.columns:[];S.columns=$t(M,x,x+1),S.rows=(Array.isArray(S.rows)?S.rows:[]).map((R,U)=>({name:String(R?.name||`\u884C${U+1}`),cells:$t(Array.isArray(R?.cells)?R.cells:[],x,x+1)})),wt(u,f,{tables:m}),n();return}if(d==="add-row"&&Number.isInteger(b)&&b>=0&&b<m.length){let S=m[b]||{},M=Array.isArray(S.columns)?S.columns:[],R=Array.isArray(S.rows)?S.rows:[];S.rows=[...R,Zu(M,R.length+1)]}if(d==="delete-row"&&Number.isInteger(b)&&b>=0&&b<m.length){let S=m[b]||{},M=Array.isArray(S.rows)?S.rows:[];Number.isInteger(E)&&E>=0&&E<M.length&&(S.rows=M.filter((R,U)=>U!==E))}if(d==="move-row-up"&&Number.isInteger(b)&&Number.isInteger(E)&&b>=0&&b<m.length){let S=m[b]||{};S.rows=$t(Array.isArray(S.rows)?S.rows:[],E,E-1),wt(u,f,{tables:m}),n();return}if(d==="move-row-down"&&Number.isInteger(b)&&Number.isInteger(E)&&b>=0&&b<m.length){let S=m[b]||{};S.rows=$t(Array.isArray(S.rows)?S.rows:[],E,E+1),wt(u,f,{tables:m}),n();return}wt(u,f,{tables:m}),n()}),t.on("input.yytTableForm","[data-table-definition-root] input, [data-table-definition-root] textarea",()=>{n()}),t.on("click.yytTableForm","[data-table-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=o(l.currentTarget),d=c.closest("[data-table-custom-select]"),u=d.hasClass("yyt-open");t.find("[data-table-custom-select].yyt-open").not(d).removeClass("yyt-open").find("[data-table-select-trigger]").attr("aria-expanded","false"),d.toggleClass("yyt-open",!u),c.attr("aria-expanded",String(!u))}),t.on("click.yytTableForm","[data-table-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=o(l.currentTarget),d=c.closest("[data-table-custom-select]"),u=String(c.attr("data-value")||""),f=c.find(".yyt-option-text").text();d.find(".yyt-table-select-native").val(u).trigger("change"),d.find(".yyt-select-value").text(f).attr("data-value",u).data("value",u),d.find("[data-table-select-option]").removeClass("yyt-selected").attr("aria-selected","false"),c.addClass("yyt-selected").attr("aria-selected","true"),d.removeClass("yyt-open"),d.find("[data-table-select-trigger]").attr("aria-expanded","false"),n()}),t.on("change.yytTableForm",'[data-table-field][data-field-type="select"]',()=>{n()}),t.on("change.yytTableForm","[data-table-definition-root] [data-table-editor-column-key], [data-table-definition-root] [data-table-editor-column-title]",l=>{let c=o(l.currentTarget).closest("[data-table-definition-root]");if(!c.length)return;let d=a(c);wt(c,d,uo(c)),n()});let i=Bt();o(i).off("click.yytTableFormSelect").on("click.yytTableFormSelect",l=>{o(l.target).closest(t).length||t.find("[data-table-custom-select].yyt-open").removeClass("yyt-open").find("[data-table-select-trigger]").attr("aria-expanded","false")})}function ml(t){let e=P();!e||!O(t)||(t.off(".yytTableForm"),e(Bt()).off("click.yytTableFormSelect"))}function bl(t=[],e={}){return`
    <div class="yyt-table-form-grid">
      ${(Array.isArray(t)?t:[]).map(o=>Qu(o,e)).join("")}
    </div>
  `}function Ya(t,e=[]){let s=Array.isArray(e)?e:[],o={},r=[];return s.forEach(a=>{let n=String(a?.name||"").trim();if(!n)return;let i=t.find(`[data-table-field="${n}"]`);if(!i.length)return;if(a.type==="tableDefinitions"){let c=Fa(uo(i));if(!c.valid){c.errors.forEach(d=>{r.push(`${a.label||n}\uFF1A${d}`)});return}o[n]=dl(c.tables);return}if(a.type==="checkbox"){o[n]=i.is(":checked");return}let l=String(i.val()||"");if(a.type==="json"){let c=l.trim();if(!c){o[n]=dl(a.emptyValue);return}try{o[n]=JSON.parse(c)}catch(d){r.push(`${a.label||n} \u4E0D\u662F\u5408\u6CD5 JSON\uFF1A${d?.message||String(d)}`)}return}o[n]=l}),{values:o,errors:r}}var ul,hl=z(()=>{Te();co();ul=`
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
  .yyt-table-form-field .yyt-select,
  .yyt-table-form-field .yyt-custom-select {
    width: 100%;
  }

  .yyt-table-form-field button.yyt-select-trigger {
    width: 100%;
    text-align: left;
    font: inherit;
    appearance: none;
    -webkit-appearance: none;
  }

  .yyt-table-form-field button.yyt-select-option {
    width: 100%;
    border: 1px solid transparent;
    background: linear-gradient(180deg, #1c2737 0%, #151e2c 100%);
    color: inherit;
    text-align: left;
    font: inherit;
    appearance: none;
    -webkit-appearance: none;
  }

  .yyt-table-form-field button.yyt-select-option:hover {
    background: linear-gradient(180deg, #243247 0%, #1a2638 100%);
    border-color: rgba(123, 183, 255, 0.22);
    transform: translateY(-1px);
  }

  .yyt-table-form-field button.yyt-select-option.yyt-selected {
    background: linear-gradient(135deg, rgba(123, 183, 255, 0.28) 0%, rgba(72, 119, 190, 0.22) 100%);
    border-color: rgba(123, 183, 255, 0.4);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .yyt-table-form-field .yyt-select-dropdown {
    z-index: 24;
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
  .yyt-table-editor-card-head,
  .yyt-table-editor-card-head-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .yyt-table-editor-card-head-main {
    align-items: flex-start;
  }

  .yyt-table-editor-card-actions,
  .yyt-table-editor-row-actions,
  .yyt-table-editor-column-actions,
  .yyt-table-editor-move-controls {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
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
`});function ey(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(s=>J(s))}function ty(t=[],e=""){let s=J(e);if(!s||!Array.isArray(t))return-1;for(let o=t.length-1;o>=0;o-=1){let r=t[o];if(ey(r,o).includes(s))return o}return-1}function vr(t={},e={}){let s=J(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!s)return null;let o=Na({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||dt.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:s,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:ty(t?.chatMessages||t?.chatHistory||[],s)});return!o.slotBindingKey||!o.slotRevisionKey?null:o}async function qa({runSource:t=dt.MANUAL}={}){let e=await Xt({runSource:t});return vr(e,{runSource:t})}async function sy({messageId:t,swipeId:e="",runSource:s=dt.AUTO}={}){let o=await Js({messageId:t,swipeId:e,runSource:s});return vr(o,{runSource:s})}async function vl(t=null,e={}){let s=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(s);let o=J(e.runSource||s?.runSource)||dt.MANUAL,r=J(e.messageId||s?.sourceMessageId),a=J(e.swipeId||s?.sourceSwipeId||s?.effectiveSwipeId);return e.useMessageTarget===!0||o===dt.AUTO?r?sy({messageId:r,swipeId:a,runSource:o}):null:qa({runSource:o})}function xl(t,e){let s=t||null,o=e||null;return!s||!o?{valid:!1,reason:"missing_target_snapshot"}:J(s.sourceMessageId)!==J(o.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:J(s.sourceSwipeId||s.effectiveSwipeId)!==J(o.sourceSwipeId||o.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:J(s.slotRevisionKey)!==J(o.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var xr=z(()=>{bs();Es()});function ut(t){return t==null?"":String(t).trim()}function oy(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function ry(){try{let t=oy(),e=t?.SillyTavern||null,s=e?.getContext?.()||null,o=Array.isArray(s?.chat)?s.chat:[],r=Array.isArray(e?.chat)?e.chat:[],a=o.length?o:r;return{topWindow:t,api:e,context:s,chat:a,contextChat:o,apiChat:r}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function ay(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function ny(t=[],e=""){let s=ut(e);if(!Array.isArray(t)||!s)return-1;for(let o=t.length-1;o>=0;o-=1){let r=t[o];if(!ay(r))continue;if([r?.sourceId,r?.message_id,r?.messageId,r?.id,r?.mes_id,r?.mid,r?.mesid,r?.chat_index,r?.index,o].map(n=>ut(n)).includes(s))return o}return-1}function Ga(t){let e=ry(),s=ny(e.chat,t?.sourceMessageId);return s<0?{runtime:e,messageIndex:s,message:null}:{runtime:e,messageIndex:s,message:e.chat[s]||null}}function wl(t,e,s){let o=r=>{!Array.isArray(r)||e<0||e>=r.length||(r[e]={...r[e]||{},...s})};o(t?.contextChat),o(t?.apiChat)}async function Tl(t){let e=t?.context||null,s=t?.api||null,o=e?.saveChatDebounced||s?.saveChatDebounced||null,r=e?.saveChat||s?.saveChat||null;typeof o=="function"&&o.call(e||s),typeof r=="function"&&await r.call(e||s)}function iy(t){let{message:e}=Ga(t);return io(e?.[fr])}function wr(t,e={}){let s=iy(t);return s&&ut(s.slotRevisionKey)===ut(t?.slotRevisionKey)?{loadMode:no.EXACT,mergeBaseOnly:!1,state:s}:s&&ut(s.slotBindingKey)===ut(t?.slotBindingKey)?{loadMode:no.BINDING_FALLBACK,mergeBaseOnly:!0,state:io({...s,slotRevisionKey:ut(t?.slotRevisionKey)||s.slotRevisionKey,sourceSwipeId:ut(t?.sourceSwipeId||t?.effectiveSwipeId)||s.sourceSwipeId,meta:{...s.meta||{},mergeBaseOnly:!0,fallbackFromBinding:!0,fallbackFromRevisionKey:ut(s.slotRevisionKey),requestedRevisionKey:ut(t?.slotRevisionKey)}})}:Array.isArray(e.templateTables)?{loadMode:no.TEMPLATE,mergeBaseOnly:!1,state:mr(t,{tables:Se(e.templateTables),meta:{fromTemplate:!0}})}:{loadMode:no.EMPTY,mergeBaseOnly:!1,state:mr(t)}}async function Sl(t){let{runtime:e,messageIndex:s,message:o}=Ga(t);if(!o||s<0)return{success:!1,error:"target_message_not_found"};let r={...br(o[_s]),lastResolvedTarget:Ss(t),updatedAt:Date.now()};return o[_s]=r,wl(e,s,o),await Tl(e),{success:!0,bindings:r}}async function _l(t,e,s={}){let o=s.skipFreshValidation===!0?t:await vl(t,s),r=s.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:xl(t,o);if(!r.valid)return{success:!1,error:"target_changed_before_commit",validation:r};let a=o||t,{runtime:n,messageIndex:i,message:l}=Ga(a);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:r};let c=io({...mr(a),...e,slotBindingKey:a.slotBindingKey,slotRevisionKey:a.slotRevisionKey,sourceMessageId:a.sourceMessageId,sourceSwipeId:a.sourceSwipeId||a.effectiveSwipeId,updatedAt:Date.now()}),d={...br(l[_s]),lastResolvedTarget:Ss(a),lastCommittedTarget:Ss(a),updatedAt:Date.now()};return l[fr]=c,l[_s]=d,wl(n,i,l),await Tl(n),{success:!0,state:c,bindings:d,validation:r,messageIndex:i,sourceMessageId:a.sourceMessageId,slotRevisionKey:a.slotRevisionKey}}function Tr(t=null){let e=Ie.getAssistantMessageSnapshot(t);return e?.message?{...e,tableState:io(e.message[fr]),tableBindings:br(e.message[_s])}:null}var Sr=z(()=>{Qt();Es();xr()});function Va(t,e=""){return t==null?e:String(t).trim()||e}function cy(t={}){return{tables:Array.isArray(t?.tables)?Se(t.tables):[]}}function dy(t={},e={}){let s=Va(e.mirrorTag,"yyt-table-workbench"),o=cy(t);return[`<${s}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(o,null,2),"```",`</${s}>`].join(`
`)}async function El({targetSnapshot:t,nextTables:e,config:s,loadResult:o=null}={}){let r=et(s),a=await _l(t,{tables:Array.isArray(e)?Se(e):[],meta:{lastLoadMode:Va(o?.loadMode,""),mergeBaseOnly:!1,updatedBy:Va(t?.runSource,"MANUAL_TABLE")}});if(!a?.success)return{success:!1,error:a?.error||"table_state_commit_failed",commitResult:a,mirrorResult:null,warning:""};let n=null,i="";if(r.mirrorToMessage){let l=dy(a.state,{mirrorTag:r.mirrorTag});n=await Ie.injectDetailed(ly,l,{overwrite:!0,extractionSelectors:[r.mirrorTag],sourceMessageId:a.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId}),n?.success||(i=n?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return{success:!0,state:a.state,bindings:a.bindings,commitResult:a,mirrorResult:n,warning:i}}var ly,Al=z(()=>{Qt();Es();Sr();co();ly="tableWorkbenchMirror"});function tt(t,e=""){return t==null?e:String(t).trim()||e}function Ml(t=[],e=8){return!Array.isArray(t)||t.length===0?"":t.slice(Math.max(t.length-e,0)).map(s=>`[${tt(s?.role,"unknown")}] ${String(s?.content||"").trim()}`).filter(Boolean).join(`

`)}function uy(t,e){return{target:{sourceMessageId:tt(t?.sourceMessageId),sourceSwipeId:tt(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:tt(t?.slotBindingKey),slotRevisionKey:tt(t?.slotRevisionKey),slotTransactionId:tt(t?.slotTransactionId)},loadMode:tt(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,tables:Array.isArray(e?.state?.tables)?Se(e.state.tables):[]}}function yy(t=""){let e=String(t||"").trim();if(!e)return[];let s=[],o=c=>{let d=String(c||"").trim();d&&(s.includes(d)||s.push(d))};(e.match(/```(?:json)?\s*([\s\S]*?)```/gi)||[]).forEach(c=>{let d=c.replace(/^```(?:json)?\s*/i,"").replace(/```$/i,"").trim();o(d)}),o(e);let a=e.indexOf("{"),n=e.lastIndexOf("}");a>=0&&n>a&&o(e.slice(a,n+1));let i=e.indexOf("["),l=e.lastIndexOf("]");return i>=0&&l>i&&o(e.slice(i,l+1)),s}function py(t){if(Array.isArray(t))return t;if(t&&typeof t=="object"){if(Array.isArray(t.tables))return t.tables;if(t.data&&typeof t.data=="object"&&Array.isArray(t.data.tables))return t.data.tables}return null}function gy(t=""){let e=yy(t),s=[];for(let o of e)try{let r=JSON.parse(o),a=py(r);if(!Array.isArray(a)){s.push("JSON \u4E2D\u7F3A\u5C11 tables \u6570\u7EC4\u3002");continue}return{tables:Se(a),parsed:r}}catch(r){s.push(r?.message||String(r))}throw new Error(s[0]||"\u65E0\u6CD5\u4ECE\u6A21\u578B\u54CD\u5E94\u4E2D\u89E3\u6790 tables JSON\u3002")}async function fy({executionContext:t,targetSnapshot:e,loadResult:s,config:o,assistantSnapshot:r}={}){let a=et(o),n=ll(a),i=uy(e,s),l=Array.isArray(r?.tableState?.tables)?Se(r.tableState.tables):[],c={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:Ml(t?.chatHistory||t?.chatMessages||[]),rawRecentMessagesText:Ml(t?.chatHistory||t?.chatMessages||[],20),injectedContext:r?.injectedContext||Ie.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(i,null,2),extractedContent:JSON.stringify(i,null,2),previousToolOutput:JSON.stringify(l,null,2)},d=await Zt.buildToolMessages(n,c),u=await Zt.buildPromptText(n,c);if(!Array.isArray(d)||d.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:n,context:c,requestPayload:i,promptText:u,messages:d}}async function my(t,e={},s=null){let o=et(e),r=tt(o.apiPreset,"");if(r){if(!Ls(r))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${r}`);return Yr(r,t,{},s)}return Ns(t,{},s)}async function kl(t=null){let e=et(t||rs()),s=Ka(e);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors};let o=e.runtime||{},r=Date.now();hr({lastStatus:lo.RUNNING,lastError:""});try{let a=await Xt({runSource:dt.MANUAL}),n=vr(a,{runSource:dt.MANUAL});if(!n)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");let i=await Sl(n);if(!i?.success)throw new Error(i?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");let l=Tr(n.sourceMessageId),c=wr(n,{templateTables:e.tables}),d=await fy({executionContext:a,targetSnapshot:n,loadResult:c,config:e,assistantSnapshot:l}),u=await my(d.messages,e),f=gy(u),y=await El({targetSnapshot:n,nextTables:f.tables,config:e,loadResult:c});if(!y?.success)throw new Error(y?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let m=Date.now()-r;return hr({lastStatus:lo.SUCCESS,lastRunAt:Date.now(),lastDurationMs:m,lastError:"",successCount:(Number(o.successCount)||0)+1,errorCount:Number(o.errorCount)||0,lastSourceMessageId:tt(n.sourceMessageId),lastSlotRevisionKey:tt(n.slotRevisionKey),lastLoadMode:tt(c.loadMode),lastMirrorApplied:y?.mirrorResult?.success===!0}),{success:!0,targetSnapshot:n,loadResult:c,request:d,responseText:u,parsed:f,state:y.state,bindings:y.bindings,mirrorResult:y.mirrorResult,warning:y.warning||""}}catch(a){let n=Date.now()-r;return hr({lastStatus:lo.ERROR,lastRunAt:Date.now(),lastDurationMs:n,lastError:a?.message||String(a),successCount:Number(o.successCount)||0,errorCount:(Number(o.errorCount)||0)+1}),{success:!1,error:a?.message||String(a)}}}var Cl=z(()=>{bs();Qt();Bs();or();Es();xr();Sr();co();Al()});function Er(){return cl({apiPresets:kt()})}function $l(t){return Number.isFinite(t)&&t>0?new Date(t).toLocaleString():"\u672A\u8BB0\u5F55"}function _r(t){try{return JSON.stringify(t,null,2)}catch{return String(t??"")}}function Ja(t){return by.includes(t)?t:"config"}function Xa(t){if(!P()||!O(t))return;let s=Er(),{values:o,errors:r}=Ya(t,s),a=t.find("[data-table-workbench-preview]");if(a.length){if(r.length>0){a.text(r.join(`
`));return}a.text(_r(o.tables||[]))}}function vy(t={}){let e=t.runtime||{},s=Array.isArray(t.tables)?t.tables.length:0,o=t.mirrorToMessage===!0?"\u4F1A\u540C\u6B65\u5199\u56DE\u6B63\u6587":"\u53EA\u4FDD\u5B58\u7ED3\u6784\u5316\u7ED3\u679C";return`
    <div class="yyt-table-workbench-header">
      <div class="yyt-table-workbench-header-main">
        <div class="yyt-table-workbench-header-copy">
          <div class="yyt-table-workbench-panel-kicker">Table Workbench</div>
          <div class="yyt-table-workbench-title">\u586B\u8868\u5DE5\u4F5C\u53F0</div>
          <div class="yyt-table-workbench-desc">\u5148\u628A\u8868\u683C\u6539\u597D\uFF0C\u518D\u53BB\u8FD0\u884C\u9875\u70B9\u4E00\u6B21\u586B\u8868\uFF1B\u76EE\u6807\u548C\u52A0\u8F7D\u7EC6\u8282\u653E\u5230\u540E\u9762\u5355\u72EC\u770B\uFF0C\u4E0D\u5835\u5728\u4E3B\u754C\u9762\u91CC\u3002</div>
        </div>
        <div class="yyt-table-workbench-header-actions">
          <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-table-workbench-action="refresh">
            <i class="fa-solid fa-rotate"></i> \u5237\u65B0\u72B6\u6001
          </button>
          <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-table-workbench-action="save-top">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
      <div class="yyt-table-workbench-chip-row">
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-table"></i>${s} \u5F20\u8868</span>
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-hand-pointer"></i>\u624B\u52A8\u586B\u8868</span>
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-file-lines"></i>${h(o)}</span>
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-wave-square"></i>\u72B6\u6001 ${h(e.lastStatus||"idle")}</span>
      </div>
    </div>
  `}function xy(t){return`
    <div class="yyt-table-workbench-view-nav" role="tablist" aria-label="\u586B\u8868\u5DE5\u4F5C\u53F0\u5206\u754C\u9762">
      <button class="yyt-table-workbench-view-button ${t==="config"?"active":""}" data-table-workbench-view-button="config" type="button">
        <i class="fa-solid fa-sliders"></i>
        <span>\u6539\u8868\u683C</span>
      </button>
      <button class="yyt-table-workbench-view-button ${t==="runtime"?"active":""}" data-table-workbench-view-button="runtime" type="button">
        <i class="fa-solid fa-stethoscope"></i>
        <span>\u8FD0\u884C</span>
      </button>
      <button class="yyt-table-workbench-view-button ${t==="preview"?"active":""}" data-table-workbench-view-button="preview" type="button">
        <i class="fa-solid fa-code"></i>
        <span>\u9884\u89C8</span>
      </button>
    </div>
  `}function wy(t={}){let e=t.runtime||{},s=String(e.lastStatus||"idle").toLowerCase(),o=e.lastError?`
    <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
      <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
      <span class="yyt-tool-runtime-value">${h(e.lastError)}</span>
    </div>
  `:"";return`
    <div class="yyt-tool-runtime-card">
      <div class="yyt-table-workbench-panel-copy">
        <div class="yyt-table-workbench-panel-kicker">Runtime</div>
        <div class="yyt-table-workbench-panel-title">\u6700\u8FD1\u4E00\u6B21\u8FD0\u884C\u7ED3\u679C</div>
        <div class="yyt-table-workbench-panel-desc">\u8FD9\u91CC\u53EA\u770B\u7ED3\u679C\u591F\u4E0D\u591F\u6B63\u5E38\uFF1B\u66F4\u7EC6\u7684\u76EE\u6807\u4FE1\u606F\u5728\u53F3\u8FB9\u3002</div>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">\u5F53\u524D\u72B6\u6001</span>
        <span class="yyt-tool-runtime-badge yyt-status-${h(s)}">${h(e.lastStatus||"idle")}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tool-runtime-value">${h($l(e.lastRunAt))}</span>
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
        <span class="yyt-tool-runtime-label">\u547D\u4E2D\u7684\u6D88\u606F</span>
        <span class="yyt-tool-runtime-value">${h(e.lastSourceMessageId||"\u672A\u8BB0\u5F55")}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">\u6B63\u6587\u540C\u6B65</span>
        <span class="yyt-tool-runtime-value">${e.lastMirrorApplied===!0?"\u5DF2\u540C\u6B65":"\u672A\u540C\u6B65"}</span>
      </div>
      ${o}
    </div>
  `}function Ty(t={},e){return`
    <div class="yyt-table-workbench-grid-single">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-sliders"></i>
          <span>\u6539\u8868\u683C</span>
        </div>
        <div class="yyt-table-workbench-panel-copy">
          <div class="yyt-table-workbench-panel-kicker">Setup</div>
          <div class="yyt-table-workbench-panel-title">\u5148\u628A\u8868\u683C\u548C\u63D0\u793A\u8BCD\u6539\u597D</div>
          <div class="yyt-table-workbench-panel-desc">\u4E3B\u5165\u53E3\u5728\u8FD9\u91CC\uFF1A\u6539\u8868\u683C\u3001\u6539\u63D0\u793A\u8BCD\u3001\u51B3\u5B9A\u8981\u4E0D\u8981\u540C\u6B65\u5199\u56DE\u6B63\u6587\u3002</div>
        </div>
        ${bl(e,t)}
      </div>

      <div class="yyt-table-workbench-card">
        <div class="yyt-table-workbench-panel-copy">
          <div class="yyt-table-workbench-panel-kicker">Flow</div>
          <div class="yyt-table-workbench-panel-title">\u600E\u4E48\u7528\u6700\u987A\u624B</div>
          <div class="yyt-table-workbench-panel-desc">\u5E73\u65F6\u5C31\u6309\u8FD9\u4E2A\u987A\u5E8F\u6765\uFF0C\u4E0D\u7528\u5148\u770B\u8BCA\u65AD\u7EC6\u8282\u3002</div>
        </div>
        <div class="yyt-table-workbench-flow">
          <span class="yyt-tool-hero-chip">1. \u6539\u8868\u683C</span>
          <span class="yyt-tool-hero-chip">2. \u4FDD\u5B58</span>
          <span class="yyt-tool-hero-chip">3. \u53BB\u8FD0\u884C\u9875\u70B9\u586B\u8868</span>
          <span class="yyt-tool-hero-chip">4. \u9700\u8981\u65F6\u518D\u770B\u72B6\u6001</span>
        </div>
      </div>
    </div>
  `}function Sy(t={}){return`
    <div class="yyt-table-workbench-grid">
      <div class="yyt-table-workbench-stack">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-hand-pointer"></i>
            <span>\u8FD0\u884C\u586B\u8868</span>
          </div>
          <div class="yyt-tool-manual-area">
            <div class="yyt-tool-runtime-card">
              <div class="yyt-table-workbench-panel-copy">
                <div class="yyt-table-workbench-panel-kicker">Run</div>
                <div class="yyt-table-workbench-panel-title">\u70B9\u8FD9\u91CC\u5C31\u4F1A\u6267\u884C\u4E00\u6B21</div>
                <div class="yyt-table-workbench-panel-desc">\u5B83\u4F1A\u81EA\u52A8\u627E\u5F53\u524D assistant \u697C\u5C42\uFF0C\u518D\u628A\u8FD9\u6B21\u7ED3\u679C\u5199\u56DE\u53BB\uFF1B\u4E00\u822C\u4E0D\u7528\u7406\u89E3\u5185\u90E8\u94FE\u8DEF\u3002</div>
              </div>
              <div class="yyt-table-workbench-flow">
                <span class="yyt-tool-hero-chip">\u627E\u5F53\u524D\u76EE\u6807</span>
                <span class="yyt-tool-hero-chip">\u8BFB\u53D6\u73B0\u6709\u8868\u683C</span>
                <span class="yyt-tool-hero-chip">\u8BF7\u6C42\u6A21\u578B</span>
                <span class="yyt-tool-hero-chip">\u5199\u56DE\u7ED3\u679C</span>
              </div>
            </div>
            <div class="yyt-tool-manual-actions">
              <div class="yyt-table-workbench-action-stack">
                <div class="yyt-table-workbench-action-primary">
                  <div class="yyt-table-workbench-action-title">\u4E3B\u64CD\u4F5C</div>
                  <div class="yyt-table-workbench-action-subtitle">\u8868\u683C\u6539\u597D\u540E\uFF0C\u76F4\u63A5\u70B9\u4E00\u6B21\u5C31\u884C\u3002</div>
                  <button class="yyt-btn yyt-btn-primary" data-table-workbench-action="run">
                    <i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868
                  </button>
                </div>
                <div class="yyt-table-workbench-action-secondary">
                  <button class="yyt-btn yyt-btn-secondary" data-table-workbench-action="save">
                    <i class="fa-solid fa-save"></i> \u5148\u4FDD\u5B58
                  </button>
                  <button class="yyt-btn yyt-btn-secondary" data-table-workbench-action="refresh">
                    <i class="fa-solid fa-rotate"></i> \u5237\u65B0\u72B6\u6001
                  </button>
                </div>
              </div>
              <div class="yyt-table-workbench-action-hint">\u5982\u679C\u4F60\u521A\u6539\u8FC7\u8868\u683C\uFF0C\u5148\u4FDD\u5B58\uFF1B\u60F3\u786E\u8BA4\u5199\u5230\u54EA\u6761\u6D88\u606F\uFF0C\u518D\u770B\u53F3\u8FB9\u3002</div>
            </div>
          </div>
        </div>

        ${wy(t)}
      </div>

      <div class="yyt-table-workbench-stack">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-crosshairs"></i>
            <span>\u4F1A\u5199\u5230\u54EA\u91CC</span>
          </div>
          <div class="yyt-table-workbench-panel-copy">
            <div class="yyt-table-workbench-panel-kicker">Target</div>
            <div class="yyt-table-workbench-panel-title">\u5F53\u524D\u76EE\u6807</div>
            <div class="yyt-table-workbench-panel-desc">\u53EA\u6709\u4F60\u60F3\u6838\u5BF9\u76EE\u6807\u65F6\u518D\u770B\u8FD9\u91CC\u3002</div>
          </div>
          <div data-table-workbench-target class="yyt-table-workbench-empty-state">\u6B63\u5728\u8BFB\u53D6\u5F53\u524D assistant \u76EE\u6807...</div>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-database"></i>
            <span>\u8FD9\u6B21\u4ECE\u54EA\u4EFD\u8868\u5F00\u59CB</span>
          </div>
          <div class="yyt-table-workbench-panel-copy">
            <div class="yyt-table-workbench-panel-kicker">State</div>
            <div class="yyt-table-workbench-panel-title">\u5F53\u524D\u8F7D\u5165\u5185\u5BB9</div>
            <div class="yyt-table-workbench-panel-desc">\u770B\u8FD9\u6B21\u662F\u63A5\u7740\u5DF2\u6709\u7ED3\u679C\u586B\uFF0C\u8FD8\u662F\u4ECE\u6A21\u677F\u5F00\u59CB\u3002</div>
          </div>
          <div data-table-workbench-load class="yyt-table-workbench-empty-state">\u7B49\u5F85\u8BCA\u65AD\u7ED3\u679C...</div>
        </div>
      </div>
    </div>
  `}function _y(t={},e){return`
    <div class="yyt-table-workbench-grid">
      <div class="yyt-table-workbench-stack">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-table"></i>
            <span>\u8868\u683C\u9884\u89C8</span>
          </div>
          <div class="yyt-table-workbench-panel-copy">
            <div class="yyt-table-workbench-panel-kicker">Preview</div>
            <div class="yyt-table-workbench-panel-title">\u7CFB\u7EDF\u5B9E\u9645\u4F1A\u7528\u8FD9\u4EFD\u8868\u683C</div>
            <div class="yyt-table-workbench-panel-desc">\u8FD9\u91CC\u53EA\u8BFB\uFF0C\u4E3B\u8981\u7528\u6765\u786E\u8BA4\u987A\u5E8F\u548C\u5185\u5BB9\u6709\u6CA1\u6709\u8DD1\u504F\u3002</div>
          </div>
          <pre class="yyt-table-workbench-pre" data-table-workbench-preview>${h(_r(t.tables||[]))}</pre>
        </div>
      </div>

      <div class="yyt-table-workbench-stack">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-code"></i>
            <span>\u63D0\u793A\u8BCD\u53D8\u91CF</span>
          </div>
          <div class="yyt-table-workbench-panel-copy">
            <div class="yyt-table-workbench-panel-kicker">Reference</div>
            <div class="yyt-table-workbench-panel-title">\u5199\u63D0\u793A\u8BCD\u65F6\u53EF\u7528</div>
            <div class="yyt-table-workbench-panel-desc">\u53EA\u6709\u4F60\u8981\u6539\u63D0\u793A\u8BCD\u65F6\uFF0C\u624D\u9700\u8981\u770B\u8FD9\u4EFD\u901F\u67E5\u3002</div>
          </div>
          <pre class="yyt-table-workbench-pre">${h(e)}</pre>
        </div>
      </div>
    </div>
  `}function Ey(t={},e="config"){let s=Er(),o=ze.getVariableHelp(),r=Ja(e);return`
    <div class="yyt-tool-panel yyt-table-workbench-shell" data-tool-id="tableWorkbench">
      ${vy(t)}
      ${xy(r)}
      <div class="yyt-table-workbench-view-pane ${r==="config"?"active":""}" data-table-workbench-view-pane="config">
        ${Ty(t,s)}
      </div>
      <div class="yyt-table-workbench-view-pane ${r==="runtime"?"active":""}" data-table-workbench-view-pane="runtime">
        ${Sy(t)}
      </div>
      <div class="yyt-table-workbench-view-pane ${r==="preview"?"active":""}" data-table-workbench-view-pane="preview">
        ${_y(t,o)}
      </div>
    </div>
  `}function Pl(t=[]){return t.length?`
    <div class="yyt-table-workbench-detail-list">
      ${t.map(e=>`
        <div class="yyt-tool-runtime-line">
          <span class="yyt-tool-runtime-label">${h(e.label||"")}</span>
          <span class="yyt-tool-runtime-value">${h(e.value||"")}</span>
        </div>
      `).join("")}
    </div>
  `:'<div class="yyt-table-workbench-empty-state"><div class="yyt-table-workbench-muted">\u6682\u65E0\u53EF\u663E\u793A\u5185\u5BB9\u3002</div></div>'}async function Ay(t){if(!P()||!O(t))return;let s=rs(),o=t.find("[data-table-workbench-target]"),r=t.find("[data-table-workbench-load]"),a=t.find("[data-table-workbench-preview]");try{let n=await qa();if(!O(t))return;if(!n){o.html('<div class="yyt-table-workbench-muted">\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u3002</div>'),r.html('<div class="yyt-table-workbench-muted">\u5C1A\u672A\u89E3\u6790\u5230\u53EF\u6267\u884C\u76EE\u6807\uFF0C\u56E0\u6B64\u4E0D\u4F1A\u52A0\u8F7D bound state\u3002</div>'),a.text(_r(s.tables||[]));return}let i=Tr(n.sourceMessageId),l=wr(n,{templateTables:s.tables}),c=i?.tableBindings||{},d=[{label:"sourceMessageId",value:n.sourceMessageId||"\u672A\u89E3\u6790"},{label:"sourceSwipeId",value:n.sourceSwipeId||n.effectiveSwipeId||"\u672A\u89E3\u6790"},{label:"slotBindingKey",value:n.slotBindingKey||"\u672A\u89E3\u6790"},{label:"slotRevisionKey",value:n.slotRevisionKey||"\u672A\u89E3\u6790"},{label:"slotTransactionId",value:n.slotTransactionId||"\u672A\u89E3\u6790"},{label:"lastResolvedTarget",value:c?.lastResolvedTarget?.slotRevisionKey||"\u672A\u8BB0\u5F55"},{label:"lastCommittedTarget",value:c?.lastCommittedTarget?.slotRevisionKey||"\u672A\u8BB0\u5F55"}],u=[{label:"loadMode",value:l.loadMode||"empty"},{label:"mergeBaseOnly",value:l.mergeBaseOnly===!0?"true":"false"},{label:"tables \u6570\u91CF",value:String(Array.isArray(l.state?.tables)?l.state.tables.length:0)},{label:"state updatedAt",value:$l(l.state?.updatedAt)}];o.html(Pl(d)),r.html(Pl(u)),a.text(_r(l.state?.tables||[]))}catch(n){if(!O(t))return;o.html(`<div class="yyt-table-workbench-muted">${h(n?.message||"\u76EE\u6807\u8BCA\u65AD\u5931\u8D25")}</div>`),r.html('<div class="yyt-table-workbench-muted">\u65E0\u6CD5\u751F\u6210\u52A0\u8F7D\u8BCA\u65AD\u3002</div>')}}function Il(t,{silent:e=!1}={}){let s=Er(),{values:o,errors:r}=Ya(t,s);if(Xa(t),r.length>0)return he("warning",r.join(`
`),{duration:4e3,noticeId:"yyt-table-workbench-form-error"}),{success:!1,errors:r};let a=il(o);return a.success?(e||w("success","\u586B\u8868\u5DE5\u4F5C\u53F0\u914D\u7F6E\u5DF2\u4FDD\u5B58"),a):(w("error",a.error||"\u4FDD\u5B58\u5931\u8D25"),a)}var by,hy,as,Qa=z(()=>{Te();ss();hl();oo();Ws();co();xr();Sr();Cl();by=["config","runtime","preview"],hy=`${ws}
${ul}
  .yyt-table-workbench-shell {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .yyt-table-workbench-header {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 18px 20px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.03) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 12px 30px rgba(0, 0, 0, 0.14);
  }

  .yyt-table-workbench-header-main {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
  }

  .yyt-table-workbench-header-copy {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }

  .yyt-table-workbench-title {
    font-size: 18px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-desc,
  .yyt-table-workbench-muted {
    font-size: 12px;
    line-height: 1.72;
    color: rgba(255, 255, 255, 0.7);
  }

  .yyt-table-workbench-header-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-end;
  }

  .yyt-table-workbench-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .yyt-table-workbench-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 11px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
    font-size: 11px;
    font-weight: 700;
  }

  .yyt-table-workbench-view-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .yyt-table-workbench-view-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.035);
    color: rgba(255, 255, 255, 0.72);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .yyt-table-workbench-view-button:hover {
    border-color: rgba(123, 183, 255, 0.18);
    color: rgba(255, 255, 255, 0.92);
    background: rgba(123, 183, 255, 0.08);
  }

  .yyt-table-workbench-view-button.active {
    border-color: rgba(123, 183, 255, 0.3);
    background: linear-gradient(180deg, rgba(123, 183, 255, 0.18) 0%, rgba(123, 183, 255, 0.08) 100%);
    color: #eef5ff;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(22, 32, 48, 0.2);
  }

  .yyt-table-workbench-view-pane {
    display: none;
  }

  .yyt-table-workbench-view-pane.active {
    display: block;
  }

  .yyt-table-workbench-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
    gap: 16px;
  }

  .yyt-table-workbench-grid-single {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
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

  .yyt-table-workbench-panel-desc {
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
    flex-wrap: wrap;
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
`;as={id:"tableWorkbenchPanel",currentView:"config",render(){return Ey(rs(),this.currentView)},bindEvents(t){let e=P();if(!e||!O(t))return;let s=this;t.off(".yytTableWorkbench"),t.on("click.yytTableWorkbench","[data-table-workbench-view-button]",o=>{let r=e(o.currentTarget).data("tableWorkbenchViewButton");s.applyViewState(t,r)}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="save"], [data-table-workbench-action="save-top"]',()=>{Il(t,{silent:!1})?.success&&s.renderTo(t)}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="refresh"]',()=>{s.renderTo(t)}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="run"]',async()=>{if(s.currentView="runtime",!!Il(t,{silent:!0}).success)try{let r=await kl();r?.success?r.warning?he("warning",`\u586B\u8868\u5DF2\u5B8C\u6210\uFF0C\u4F46\u6B63\u6587\u955C\u50CF\u5931\u8D25\uFF1A${r.warning}`,{duration:4200,noticeId:"yyt-table-workbench-run-result"}):he("success","\u624B\u52A8\u586B\u8868\u5B8C\u6210",{duration:2800,noticeId:"yyt-table-workbench-run-result"}):he("warning",r?.error||"\u624B\u52A8\u586B\u8868\u5931\u8D25",{duration:4e3,noticeId:"yyt-table-workbench-run-result"})}catch(r){w("error",r?.message||"\u624B\u52A8\u586B\u8868\u5931\u8D25")}finally{s.renderTo(t)}})},destroy(t){!P()||!O(t)||(ml(t),t.off(".yytTableWorkbench"))},getStyles(){return hy},applyViewState(t,e){if(!P()||!O(t))return;let o=Ja(e);this.currentView=o,t.find("[data-table-workbench-view-button]").removeClass("active"),t.find(`[data-table-workbench-view-button="${o}"]`).addClass("active"),t.find("[data-table-workbench-view-pane]").removeClass("active"),t.find(`[data-table-workbench-view-pane="${o}"]`).addClass("active")},renderTo(t){!P()||!O(t)||(this.currentView=Ja(this.currentView),t.html(this.render({})),fl(t,Er(),{onChange:()=>Xa(t)}),this.bindEvents(t,{}),this.applyViewState(t,this.currentView),Xa(t),Ay(t))}}});var jl={};de(jl,{ApiPresetPanel:()=>Ye,BypassPanel:()=>os,EscapeTransformToolPanel:()=>Qe,PunctuationTransformToolPanel:()=>Ze,RegexExtractPanel:()=>qe,SCRIPT_ID:()=>g,SettingsPanel:()=>xt,StatusBlockPanel:()=>Je,SummaryToolPanel:()=>Ve,TableWorkbenchPanel:()=>as,ToolManagePanel:()=>Ge,UIManager:()=>Ds,YouyouReviewPanel:()=>Xe,bindDialogEvents:()=>Wt,closeActiveCustomSelectDropdown:()=>De,closeCustomSelectDropdown:()=>Rs,createDialogHtml:()=>Ut,default:()=>My,destroyEnhancedCustomSelects:()=>ye,downloadJson:()=>gt,enhanceNativeSelects:()=>we,escapeHtml:()=>h,fillFormWithConfig:()=>zt,getAllStyles:()=>Wl,getFormApiConfig:()=>Mt,getJQuery:()=>P,getTargetDocument:()=>Bt,initUI:()=>yo,isContainerValid:()=>O,normalizeCustomSelectOptions:()=>So,openCustomSelectDropdown:()=>wn,readFileContent:()=>ft,registerComponents:()=>Ms,renderApiPanel:()=>Ar,renderBypassPanel:()=>Bl,renderCustomSelectControl:()=>_o,renderEscapeTransformToolPanel:()=>Ll,renderPunctuationTransformToolPanel:()=>Nl,renderRegexPanel:()=>Mr,renderSettingsPanel:()=>zl,renderStatusBlockPanel:()=>Dl,renderSummaryToolPanel:()=>Rl,renderTableWorkbenchPanel:()=>Ul,renderToolPanel:()=>kr,renderYouyouReviewPanel:()=>Ol,repositionActiveCustomSelectDropdown:()=>jr,resetJQueryCache:()=>Ec,showToast:()=>w,showTopNotice:()=>he,toggleCustomSelectDropdown:()=>To,uiManager:()=>te});function Ms(){te.register(Ye.id,Ye),te.register(qe.id,qe),te.register(Ge.id,Ge),te.register(Ve.id,Ve),te.register(Je.id,Je),te.register(Xe.id,Xe),te.register(Qe.id,Qe),te.register(Ze.id,Ze),te.register(os.id,os),te.register(xt.id,xt),te.register(as.id,as),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function yo(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...o}=t;te.init(o),Ms(),e&&te.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function st(t,e,s={}){te.render(t,e,s)}function Ar(t){st(Ye.id,t)}function Mr(t){st(qe.id,t)}function kr(t){st(Ge.id,t)}function Rl(t){st(Ve.id,t)}function Dl(t){st(Je.id,t)}function Ol(t){st(Xe.id,t)}function Ll(t){st(Qe.id,t)}function Nl(t){st(Ze.id,t)}function Bl(t){st(os.id,t)}function zl(t){st(xt.id,t)}function Ul(t){st(as.id,t)}function Wl(){return te.getAllStyles()}var My,Za=z(()=>{Fr();sa();ca();ba();Ca();Pa();Ia();Ra();Da();Oa();gr();Qa();Te();Fr();sa();ca();ba();Ca();Pa();Ia();Ra();Da();Oa();gr();Qa();My={uiManager:te,ApiPresetPanel:Ye,RegexExtractPanel:qe,ToolManagePanel:Ge,SummaryToolPanel:Ve,StatusBlockPanel:Je,YouyouReviewPanel:Xe,EscapeTransformToolPanel:Qe,PunctuationTransformToolPanel:Ze,BypassPanel:os,SettingsPanel:xt,TableWorkbenchPanel:as,registerComponents:Ms,initUI:yo,renderApiPanel:Ar,renderRegexPanel:Mr,renderToolPanel:kr,renderSummaryToolPanel:Rl,renderStatusBlockPanel:Dl,renderYouyouReviewPanel:Ol,renderEscapeTransformToolPanel:Ll,renderPunctuationTransformToolPanel:Nl,renderBypassPanel:Bl,renderSettingsPanel:zl,renderTableWorkbenchPanel:Ul,getAllStyles:Wl}});var Xl={};de(Xl,{ApiPresetPanel:()=>Ye,EscapeTransformToolPanel:()=>Qe,PunctuationTransformToolPanel:()=>Ze,RegexExtractPanel:()=>qe,SCRIPT_ID:()=>g,StatusBlockPanel:()=>Je,SummaryToolPanel:()=>Ve,ToolManagePanel:()=>Ge,YouyouReviewPanel:()=>Xe,default:()=>ky,escapeHtml:()=>h,fillFormWithConfig:()=>zt,getCurrentTab:()=>Vl,getFormApiConfig:()=>Mt,getJQuery:()=>P,getRegexStyles:()=>ql,getStyles:()=>Yl,getToolStyles:()=>Gl,initUI:()=>yo,isContainerValid:()=>O,registerComponents:()=>Ms,render:()=>Fl,renderRegex:()=>Kl,renderTool:()=>Hl,setCurrentTab:()=>Jl,showToast:()=>w,uiManager:()=>te});function en(t,e){let s=P();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function Fl(t){if(po=en(t,po),!po||!po.length){console.error("[YouYouToolkit] Container not found or invalid");return}Ar(po)}function Kl(t){if(go=en(t,go),!go||!go.length){console.error("[YouYouToolkit] Regex container not found");return}Mr(go)}function Hl(t){if(fo=en(t,fo),!fo||!fo.length){console.error("[YouYouToolkit] Tool container not found");return}kr(fo)}function Yl(){return Ye.getStyles()}function ql(){return qe.getStyles()}function Gl(){return[Ge.getStyles(),Ve.getStyles(),Je.getStyles(),Xe.getStyles(),Qe.getStyles(),Ze.getStyles()].join(`
`)}function Vl(){return te.getCurrentTab()}function Jl(t){te.switchTab(t)}var po,go,fo,ky,Ql=z(()=>{Za();po=null,go=null,fo=null;ky={render:Fl,renderRegex:Kl,renderTool:Hl,getStyles:Yl,getRegexStyles:ql,getToolStyles:Gl,getCurrentTab:Vl,setCurrentTab:Jl,uiManager:te,ApiPresetPanel:Ye,RegexExtractPanel:qe,ToolManagePanel:Ge,SummaryToolPanel:Ve,StatusBlockPanel:Je,YouyouReviewPanel:Xe,EscapeTransformToolPanel:Qe,PunctuationTransformToolPanel:Ze,registerComponents:Ms,initUI:yo,SCRIPT_ID:g,escapeHtml:h,showToast:w,getJQuery:P,isContainerValid:O,getFormApiConfig:Mt,fillFormWithConfig:zt}});var Zl={};de(Zl,{DEFAULT_PROMPT_SEGMENTS:()=>Cr,PromptEditor:()=>Pr,default:()=>Ly,getPromptEditorStyles:()=>$y,messagesToSegments:()=>Oy,segmentsToMessages:()=>Dy,validatePromptSegments:()=>Ry});function $y(){return`
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
  `}function Ry(t){let e=[];return Array.isArray(t)?(t.forEach((s,o)=>{s.id||e.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${o+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function Dy(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Oy(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Cr]}var Cy,Py,Iy,Cr,Pr,Ly,ec=z(()=>{Te();Cy="youyou_toolkit_prompt_editor",Py={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Iy={system:"fa-server",ai:"fa-robot",user:"fa-user"},Cr=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Pr=class{constructor(e={}){this.containerId=e.containerId||Cy,this.segments=e.segments||[...Cr],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Cr],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=Py[e.type]||e.type,o=Iy[e.type]||"fa-file",r=e.mainSlot==="A"||e.isMain,a=e.mainSlot==="B"||e.isMain2,n=r?"var(--yyt-accent, #7bb7ff)":a?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${r?"yyt-main-a":""} ${a?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${n?`border-left: 3px solid ${n};`:""}">
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
    `}bindEvents(){this.$container&&(ye(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:o})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:o})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),we(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let s=`segment_${Date.now()}`,o=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};o.id||(o.id=s),this.segments.push(o),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(r=>r.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let o=this.segments.find(r=>r.id===e);o&&(Object.assign(o,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let o=s.target.files[0];if(!o)return;let r=new FileReader;r.onload=a=>{try{let n=JSON.parse(a.target.result);Array.isArray(n)?(this.setSegments(n),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(n){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",n)}},r.readAsText(o)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),o=new Blob([s],{type:"application/json"}),r=URL.createObjectURL(o),a=document.createElement("a");a.href=r,a.download=`prompt_group_${Date.now()}.json`,a.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(ye(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};Ly=Pr});var tn={};de(tn,{WindowManager:()=>Ir,closeWindow:()=>Uy,createWindow:()=>zy,windowManager:()=>$e});function By(){if($e.stylesInjected)return;$e.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=Ny+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function zy(t){let{id:e,title:s="\u7A97\u53E3",content:o="",width:r=900,height:a=700,modal:n=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:f}=t;By();let y=window.jQuery||window.parent?.jQuery;if(!y)return console.error("[WindowManager] jQuery not available"),null;if($e.isOpen(e))return $e.bringToFront(e),$e.getWindow(e);let m=window.innerWidth||1200,b=window.innerHeight||800,x=m<=1100,E=null,S=!1;d&&(E=$e.getState(e),E&&!x&&(S=!0));let M,R;S&&E.width&&E.height?(M=Math.max(400,Math.min(E.width,m-40)),R=Math.max(300,Math.min(E.height,b-40))):(M=Math.max(400,Math.min(r,m-40)),R=Math.max(300,Math.min(a,b-40)));let U=Math.max(20,Math.min((m-M)/2,m-M-20)),F=Math.max(20,Math.min((b-R)/2,b-R-20)),k=l&&!x,N=`
    <div class="yyt-window" id="${e}" style="left:${U}px; top:${F}px; width:${M}px; height:${R}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Wy(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${k?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,B=null;n&&(B=y(`<div class="yyt-window-overlay" data-for="${e}"></div>`),y(document.body).append(B));let L=y(N);y(document.body).append(L),$e.register(e,L),L.on("mousedown",()=>$e.bringToFront(e));let X=!1,ie={left:U,top:F,width:M,height:R},ge=()=>{ie={left:parseInt(L.css("left")),top:parseInt(L.css("top")),width:L.width(),height:L.height()},L.addClass("maximized"),L.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),X=!0},je=()=>{L.removeClass("maximized"),L.css({left:ie.left+"px",top:ie.top+"px",width:ie.width+"px",height:ie.height+"px"}),L.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),X=!1};L.find(".yyt-window-btn.maximize").on("click",()=>{X?je():ge()}),(x&&l||S&&E.isMaximized&&l||c&&l)&&ge(),L.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let V={width:X?ie.width:L.width(),height:X?ie.height:L.height(),isMaximized:X};$e.saveState(e,V)}u&&u(),B&&B.remove(),L.remove(),$e.unregister(e),y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),B&&B.on("click",V=>{V.target,B[0]});let Q=!1,Fe,Rt,Ke,ot;if(L.find(".yyt-window-header").on("mousedown",V=>{y(V.target).closest(".yyt-window-controls").length||X||(Q=!0,Fe=V.clientX,Rt=V.clientY,Ke=parseInt(L.css("left")),ot=parseInt(L.css("top")),y(document.body).css("user-select","none"))}),y(document).on("mousemove.yytWindowDrag"+e,V=>{if(!Q)return;let se=V.clientX-Fe,_e=V.clientY-Rt;L.css({left:Math.max(0,Ke+se)+"px",top:Math.max(0,ot+_e)+"px"})}),y(document).on("mouseup.yytWindowDrag"+e,()=>{Q&&(Q=!1,y(document.body).css("user-select",""))}),i){let V=!1,se="",_e,Dt,yt,Tt,is,Ot;L.find(".yyt-window-resize-handle").on("mousedown",function(He){X||(V=!0,se="",y(this).hasClass("se")?se="se":y(this).hasClass("e")?se="e":y(this).hasClass("s")?se="s":y(this).hasClass("w")?se="w":y(this).hasClass("n")?se="n":y(this).hasClass("nw")?se="nw":y(this).hasClass("ne")?se="ne":y(this).hasClass("sw")&&(se="sw"),_e=He.clientX,Dt=He.clientY,yt=L.width(),Tt=L.height(),is=parseInt(L.css("left")),Ot=parseInt(L.css("top")),y(document.body).css("user-select","none"),He.stopPropagation())}),y(document).on("mousemove.yytWindowResize"+e,He=>{if(!V)return;let St=He.clientX-_e,ks=He.clientY-Dt,ho=400,vo=300,Cs=yt,Ps=Tt,xo=is,p=Ot;if(se.includes("e")&&(Cs=Math.max(ho,yt+St)),se.includes("s")&&(Ps=Math.max(vo,Tt+ks)),se.includes("w")){let v=yt-St;v>=ho&&(Cs=v,xo=is+St)}if(se.includes("n")){let v=Tt-ks;v>=vo&&(Ps=v,p=Ot+ks)}L.css({width:Cs+"px",height:Ps+"px",left:xo+"px",top:p+"px"})}),y(document).on("mouseup.yytWindowResize"+e,()=>{V&&(V=!1,y(document.body).css("user-select",""))})}return L.on("remove",()=>{y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),f&&setTimeout(()=>f(L),50),L}function Uy(t){let e=$e.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),$e.unregister(t)}}function Wy(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Ny,tc,Ir,$e,sn=z(()=>{Re();Ny="youyou_toolkit_window_manager",tc="window_states",Ir=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let o=this.loadStates();o[e]={...s,updatedAt:Date.now()},Is.set(tc,o)}loadStates(){return Is.get(tc)||{}}getState(e){return this.loadStates()[e]||null}},$e=new Ir});var ic={};de(ic,{TX_PHASE:()=>We,ToolAutomationService:()=>Dr,Transaction:()=>Rr,default:()=>Jy,toolAutomationService:()=>nc});function me(t){return t==null?"":String(t).trim()}function rn(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function sc(){return rn()?.SillyTavern||null}function Or(t){try{return t?.getContext?.()||null}catch{return null}}function on(t,e){if(!t)return null;let s=typeof t?.on=="function"||typeof t?.addListener=="function",o=typeof t?.off=="function"||typeof t?.removeListener=="function";return!s||!o?null:{eventSource:t,source:e,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function jy(t){let e=rn(),s=Or(t);return[on(t?.eventSource,"SillyTavern.eventSource"),on(e?.eventSource,"topWindow.eventSource"),on(s?.eventSource,"SillyTavern.getContext().eventSource")].filter(Boolean)[0]||{eventSource:null,source:"unavailable",capabilities:{on:!1,off:!1,addListener:!1,removeListener:!1}}}function Fy(t){let e=Or(t);return t?.eventTypes||e?.eventTypes||rn()?.event_types||{}}function oc(t){let e=Or(t);return me(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function rc(t){let e=Or(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function ac(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function Ky(t,e){let s=me(e);if(!s)return null;let o=rc(t);for(let r=o.length-1;r>=0;r-=1){let a=o[r];if([a?.messageId,a?.message_id,a?.id,a?.mesid,a?.mid,a?.chat_index,r].map(i=>me(i)).includes(s))return a||null}return null}function Hy(t){let e=rc(t);if(!Array.isArray(e)||e.length===0)return null;let s=e.length-1,o=e[s]||null;if(!ac(o))return null;let r=me(o?.messageId??o?.message_id??o?.id??o?.mesid??o?.mid??o?.chat_index??s);return r?{messageId:r,swipeId:me(o?.swipeId??o?.swipe_id??o?.swipe??o?.swipeIndex),message:o}:null}function $r(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function Yy(t){let e=String(t||"");if(e.length===0)return"0";let s=5381,o=Math.min(e.length,2e3);for(let r=0;r<o;r++)s=(s<<5)+s+e.charCodeAt(r)|0;return(s>>>0).toString(36)}function qy(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}function Vy(t){return Gy.has($r(t))}var We,Gy,Rr,Dr,nc,Jy,lc=z(()=>{to();fe();Pt();nr();bs();We=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Gy=new Set(["MESSAGE_SWIPED","GENERATION_AFTER_COMMANDS","GENERATION_ENDED"]);Rr=class{constructor({chatId:e,messageId:s,swipeId:o,sourceEvent:r,generationKey:a}){this.traceId=qy(),this.chatId=e||"",this.messageId=s||"",this.swipeId=o||"",this.sourceEvent=r||"",this.generationKey=a||"",this.phase=We.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,s={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,s),this}toSnapshot(){return{...this}}},Dr=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._completedGenerationKeys=new Map,this._slotQueues=new Map,this._currentChatId="",this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._initRetryTimer=null}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop();let s=sc(),o=e.retryOnFailure!==!1,r=Number.isFinite(e.retryDelayMs)?e.retryDelayMs:1500,a=Number.isFinite(e.attempt)?e.attempt:1;if(this._hostBindingStatus.initAttempts=a,this._hostBindingStatus.lastInitAt=Date.now(),!s)return this._hostBindingStatus={...this._hostBindingStatus,initialized:!1,lastInitResult:"missing_api",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],lastError:"\u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)",retryScheduled:!1,retryDelayMs:0},this._log("\u521D\u59CB\u5316\u5931\u8D25: \u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)"),!1;this._currentChatId=oc(s);let n=jy(s),i=n?.eventSource||null,l=Fy(s),c=typeof i?.on=="function"?i.on.bind(i):typeof i?.addListener=="function"?i.addListener.bind(i):null,d=typeof i?.off=="function"?i.off.bind(i):typeof i?.removeListener=="function"?i.removeListener.bind(i):null,u=!!(l&&Object.keys(l).length>0);if(this._hostBindingStatus={...this._hostBindingStatus,source:n?.source||"unavailable",hasEventSource:!!i,hasEventTypes:u,eventBindings:[],lastError:"",retryScheduled:!1,retryDelayMs:0,initialized:!1,lastInitResult:"binding"},!c||!d){let m="\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5";return this._hostBindingStatus={...this._hostBindingStatus,lastInitResult:"missing_event_source",lastError:m},this._log(`\u521D\u59CB\u5316\u5931\u8D25: ${m}`,{source:this._hostBindingStatus.source}),o&&this._scheduleInitRetry(r,a+1),!1}this._log("\u5BBF\u4E3B eventTypes \u6620\u5C04:",JSON.stringify(l,null,2));let f=(m,b)=>{if(!m||typeof b!="function")return;let x=m;c(x,b),this._hostBindingStatus.eventBindings=[...this._hostBindingStatus.eventBindings,`${x} -> ${$r(x)}`],this._stopCallbacks.push(()=>{try{d(x,b)}catch(E){this._log("\u53D6\u6D88\u4E8B\u4EF6\u5931\u8D25",x,E)}}),this._log(`\u5DF2\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${x}" (\u5F52\u4E00\u5316: ${$r(x)})`)},y=(m,...b)=>{let x=$r(m),{messageId:E,swipeId:S}=this._extractIdentitiesFromArgs(b);if(this._log(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${m}" \u2192 "${x}"`,{messageId:E,swipeId:S,argCount:b.length}),!!this._checkEnabled()){if(E){let M=Ky(s,E);if(M&&!ac(M)){this._log(`\u4E8B\u4EF6 "${x}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:E});return}this._scheduleMessageProcessing(E,S,{settleMs:this._getSettleMs(),sourceEvent:x});return}if(Vy(x)){let M=Hy(s);M?.messageId?this._scheduleMessageProcessing(M.messageId,M.swipeId,{settleMs:this._getSettleMs(),sourceEvent:x}):this._log(`\u4E8B\u4EF6 "${x}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7 fallback`);return}this._log(`\u4E8B\u4EF6 "${x}" \u65E0 messageId \u4E14\u975E same-slot \u7C7B\u578B\uFF0C\u8DF3\u8FC7`)}};return f(l.MESSAGE_SENT||"message_sent",()=>{this._log("MESSAGE_SENT \u2192 \u91CD\u7F6E extra analysis \u72B6\u6001"),this._isDuringExtraAnalysis=!1,this._pendingTimers.forEach(m=>clearTimeout(m)),this._pendingTimers.clear()}),f(l.MESSAGE_RECEIVED||"message_received",(...m)=>{y(l.MESSAGE_RECEIVED||"message_received",...m)}),f(l.MESSAGE_SWIPED||"message_swiped",(...m)=>{y(l.MESSAGE_SWIPED||"message_swiped",...m)}),f(l.GENERATION_AFTER_COMMANDS||"generation_after_commands",(...m)=>{y(l.GENERATION_AFTER_COMMANDS||"generation_after_commands",...m)}),f(l.GENERATION_ENDED||"generation_ended",(...m)=>{y(l.GENERATION_ENDED||"generation_ended",...m)}),f(l.CHAT_CHANGED||"chat_changed",()=>{this._resetForChatChange()}),f(l.MESSAGE_DELETED||"message_deleted",m=>{this._clearMessageState(me(m))}),this._stopCallbacks.push($.on(C.SETTINGS_UPDATED,()=>{let m=this._enabled;this._enabled=this._evaluateEnabled(),m!==this._enabled&&this._log(`\u81EA\u52A8\u5316\u72B6\u6001\u53D8\u66F4: ${m} \u2192 ${this._enabled}`)})),this._enabled=this._evaluateEnabled(),this._enabledCheckedOnce=!1,this._hostBindingStatus={...this._hostBindingStatus,initialized:!0,lastInitResult:"ready",retryScheduled:!1,retryDelayMs:0,lastError:""},this._log("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{enabled:this._enabled,chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(s){this._log("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",s)}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this._initRetryTimer&&(clearTimeout(this._initRetryTimer),this._initRetryTimer=null),this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return this._enabled}getRuntimeSnapshot(){return this._pruneCompletedKeys(),{currentChatId:this._currentChatId,enabled:this._enabled,isDuringExtraAnalysis:this._isDuringExtraAnalysis,isProcessingMessage:this._isProcessingMessage,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,completedGenerationKeyCount:this._completedGenerationKeys.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let s=await Js({messageId:"",swipeId:"",runSource:"AUTO"}),o=me(s?.sourceMessageId||s?.messageId);return o?this.processAssistantMessage(o,{force:e.force===!0,swipeId:me(s?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:s=!1,swipeId:o="",sourceEvent:r="AUTO"}={}){let a=new Rr({chatId:this._currentChatId,messageId:e,swipeId:o,sourceEvent:r});try{if(!e)return this._skipTransaction(a,"missing_message_id");if(!this._checkEnabled()&&!s)return this._skipTransaction(a,"automation_disabled");if(this._isDuringExtraAnalysis&&!s&&r!=="MESSAGE_SWIPED"&&!r.includes("GENERATION"))return this._skipTransaction(a,"during_extra_analysis");a.transition(We.CONFIRMED);let n=await Js({messageId:e,swipeId:o,runSource:"AUTO"}),i=n?.targetAssistantMessage||null;if(!i||!n?.sourceMessageId)return this._skipTransaction(a,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(a,"assistant_message_too_short");a.transition(We.CONTEXT_BUILT);let c=Yy(l),d=`${me(n.sourceMessageId)}::${c}`;if(a.generationKey=d,!s&&this._hasCompletedGeneration(d))return this._skipTransaction(a,"duplicate_generation",{generationKey:d});let u=ct.filterAutoPostResponseTools(Vs());if(!u.length)return this._skipTransaction(a,"no_auto_tools");let f=`${me(n.sourceMessageId)}::${me(n.sourceSwipeId||o)}`;return this._enqueueSlot(f,async()=>{if(this._hasCompletedGeneration(d)&&!s)return this._skipTransaction(a,"duplicate_generation_after_queue",{generationKey:d});this._isProcessingMessage=!0,this._isDuringExtraAnalysis=!0,a.transition(We.REQUEST_STARTED);try{let y=[],m=!1;for(let E of u){let S={...n,input:{...n.input||{},lastAiMessage:n.lastAiMessage,assistantBaseText:n.assistantBaseText}},M=await ct.runToolPostResponse(E,S);y.push(M),(M?.writebackState||M?.output)&&(m=!0)}a.transition(We.REQUEST_FINISHED,{toolResults:y}),m&&(a.transition(We.WRITEBACK_STARTED),a.writebackState={messageId:n.sourceMessageId,swipeId:n.sourceSwipeId,hasOutput:!0}),this._markGenerationCompleted(d);let b=y.every(E=>E?.success!==!1);b&&a.transition(We.WRITEBACK_COMMITTED);let x=b?We.REFRESH_CONFIRMED:We.FAILED;return a.transition(x,{verdict:b?"success":"partial_failure"}),this._recordTransaction(a),{success:b,traceId:a.traceId,generationKey:d,sourceEvent:r,messageId:n.sourceMessageId||e,phase:a.phase,results:y}}finally{this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1}})}catch(n){return a.transition(We.FAILED,{error:n?.message||String(n)}),this._recordTransaction(a),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._log("processAssistantMessage \u5F02\u5E38",n),{success:!1,traceId:a.traceId,error:a.error,phase:a.phase}}}_extractIdentitiesFromArgs(e){let s="",o="";for(let r of e)if(r!=null){if(typeof r=="number"&&Number.isFinite(r)&&!s){s=me(r);continue}if(typeof r=="string"){let a=me(r);!s&&/^\d+$/.test(a)&&(s=a);continue}typeof r=="object"&&(s||(s=me(r.messageId??r.message_id??r.id??r.mesid??r.chat_index??r.message?.messageId??r.message?.message_id??r.message?.id??r.message?.mesid??r.message?.chat_index??r.data?.messageId??r.data?.message_id??r.data?.id??r.target?.messageId??r.target?.message_id??r.target?.id)),o||(o=me(r.swipeId??r.swipe_id??r.swipe??r.swipeIndex??r.currentSwipe??r.message?.swipeId??r.message?.swipe_id??r.message?.swipe??r.data?.swipeId??r.data?.swipe_id??r.data?.swipe??r.target?.swipeId??r.target?.swipe_id??r.target?.swipe)))}return{messageId:s,swipeId:o}}_scheduleMessageProcessing(e,s="",o={}){let r=o.settleMs??this._getSettleMs(),a=`msg::${me(e)}::${me(s)}`,n=this._pendingTimers.get(a);n&&clearTimeout(n);let i=setTimeout(()=>{this._pendingTimers.delete(a),this.processAssistantMessage(e,{swipeId:s,sourceEvent:o.sourceEvent||"AUTO"}).catch(l=>{this._log("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,r));this._pendingTimers.set(a,i),this._log("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:a,settleMs:r,sourceEvent:o.sourceEvent})}_scheduleCurrentAssistantProcessing(e={}){let s=e.settleMs??this._getSettleMs(),o=e.sourceEvent||"CURRENT_ASSISTANT_FALLBACK",r=`current::${o}`,a=this._pendingTimers.get(r);a&&clearTimeout(a);let n=setTimeout(()=>{this._pendingTimers.delete(r),this.processCurrentAssistantMessage({sourceEvent:o}).catch(i=>{this._log("\u5F53\u524D assistant \u5904\u7406\u5931\u8D25",i)})},Math.max(0,s));this._pendingTimers.set(r,n),this._log("\u5DF2\u8C03\u5EA6\u5F53\u524D assistant \u5904\u7406",{timerKey:r,settleMs:s,sourceEvent:o})}_hasCompletedGeneration(e){if(!e)return!1;this._pruneCompletedKeys();let s=this._completedGenerationKeys.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_markGenerationCompleted(e){e&&(this._completedGenerationKeys.set(e,Date.now()),this._pruneCompletedKeys())}_pruneCompletedKeys(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,o]of this._completedGenerationKeys)(!Number.isFinite(o)||o<e)&&this._completedGenerationKeys.delete(s)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),this._log(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,s,o={}){return e.transition(We.SKIPPED,{verdict:s,...o}),this._recordTransaction(e),{success:!1,skipped:!0,reason:s,traceId:e.traceId,...o}}_enqueueSlot(e,s){let r=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(s).finally(()=>{this._slotQueues.get(e)===r&&this._slotQueues.delete(e)});return this._slotQueues.set(e,r),r}_resetForChatChange(){let e=sc(),s=oc(e);this._log("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:s}),this._currentChatId=s,this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1}_scheduleInitRetry(e,s){this._initRetryTimer&&clearTimeout(this._initRetryTimer),this._hostBindingStatus={...this._hostBindingStatus,retryScheduled:!0,retryDelayMs:e},this._initRetryTimer=setTimeout(()=>{this._initRetryTimer=null,this.init({retryOnFailure:!1,retryDelayMs:e,attempt:s})},Math.max(200,e))}_clearMessageState(e){if(e){for(let[s,o]of this._pendingTimers)(s.includes(`::${e}::`)||s.startsWith(`msg::${e}::`))&&(clearTimeout(o),this._pendingTimers.delete(s));for(let s of this._completedGenerationKeys.keys())s.startsWith(`${e}::`)&&this._completedGenerationKeys.delete(s)}}_evaluateEnabled(){return this._getAutomationSettings().enabled===!0}_checkEnabled(){if(this._enabled)return!0;if(!this._enabledCheckedOnce){this._enabledCheckedOnce=!0;let e=this._getAutomationSettings();this._log("\u26A0 \u81EA\u52A8\u5316\u672A\u542F\u7528\uFF0C\u9996\u6B21\u8BCA\u65AD:",{"automation.enabled":e.enabled,"\u5B8C\u6574 automation \u8BBE\u7F6E":e,\u63D0\u793A:"\u8BF7\u786E\u4FDD settings.automation.enabled === true"})}return!1}_getAutomationSettings(){let e=Pe.getSettings()?.automation||{},s=Number.isFinite(e.settleMs)?e.settleMs:800;return{enabled:e.enabled===!0,settleMs:s,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(1200,s+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}_log(...e){(this.debugMode||Pe.getDebugSettings?.()?.enableDebugLog)&&console.log("[ToolAutomation]",...e)}},nc=new Dr,Jy=nc});function cc(t,e={}){let{constants:s,topLevelWindow:o,modules:r}=t,{SCRIPT_ID:a,SCRIPT_VERSION:n,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=s,c=null,d=!1,u=new Map,f={storageModule:()=>Promise.resolve().then(()=>(Br(),Nr)),uiComponentsModule:()=>Promise.resolve().then(()=>(Ql(),Xl)),promptEditorModule:()=>Promise.resolve().then(()=>(ec(),Zl)),toolExecutorModule:()=>Promise.resolve().then(()=>(cr(),lr)),windowManagerModule:()=>Promise.resolve().then(()=>(sn(),tn))};function y(...k){console.log(`[${a}]`,...k)}function m(...k){console.error(`[${a}]`,...k)}async function b(k){return!k||!f[k]?null:r[k]?r[k]:(u.has(k)||u.set(k,(async()=>{try{let N=await f[k]();return r[k]=N,N}catch(N){throw u.delete(k),N}})()),u.get(k))}async function x(){return c||(c=(async()=>{try{return r.storageModule=await Promise.resolve().then(()=>(Br(),Nr)),r.apiConnectionModule=await Promise.resolve().then(()=>(Bs(),An)),r.presetManagerModule=await Promise.resolve().then(()=>(Ws(),Pn)),r.uiModule=await Promise.resolve().then(()=>(Za(),jl)),r.regexExtractorModule=await Promise.resolve().then(()=>(zo(),jn)),r.toolManagerModule=await Promise.resolve().then(()=>(Go(),Jn)),r.toolExecutorModule=await Promise.resolve().then(()=>(cr(),lr)),r.windowManagerModule=await Promise.resolve().then(()=>(sn(),tn)),r.toolRegistryModule=await Promise.resolve().then(()=>(Pt(),fi)),r.settingsServiceModule=await Promise.resolve().then(()=>(to(),ki)),r.bypassManagerModule=await Promise.resolve().then(()=>(Zs(),Mi)),r.variableResolverModule=await Promise.resolve().then(()=>(oo(),$i)),r.contextInjectorModule=await Promise.resolve().then(()=>(Qt(),Pi)),r.toolPromptServiceModule=await Promise.resolve().then(()=>(or(),Di)),r.toolOutputServiceModule=await Promise.resolve().then(()=>(nr(),Oi)),r.toolAutomationServiceModule=await Promise.resolve().then(()=>(lc(),ic)),r.toolOutputServiceModule?.toolOutputService&&r.apiConnectionModule&&r.toolOutputServiceModule.toolOutputService.setApiConnection(r.apiConnectionModule),!0}catch(k){return c=null,console.warn(`[${a}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,k),console.warn(`[${a}] \u5DF2\u52A0\u8F7D\u6A21\u5757:`,Object.keys(r).filter(N=>r[N])),!1}})(),c)}function E(){return`
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
        --yyt-control-radius: 14px;
        --yyt-control-radius-sm: 11px;
        --yyt-control-bg: linear-gradient(180deg, #1d2737 0%, #151d2a 100%);
        --yyt-control-bg-hover: linear-gradient(180deg, #243247 0%, #1a2638 100%);
        --yyt-control-bg-active: linear-gradient(180deg, #2a3951 0%, #1d2b3f 100%);
        --yyt-control-bg-strong: linear-gradient(180deg, #243247 0%, #192435 100%);
        --yyt-control-bg-focus: linear-gradient(180deg, #243a57 0%, #1a2a3f 100%);
        --yyt-control-border: rgba(146, 173, 212, 0.24);
        --yyt-control-border-hover: rgba(146, 173, 212, 0.36);
        --yyt-control-border-focus: rgba(123, 183, 255, 0.72);
        --yyt-control-shadow: 0 12px 24px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.04);
        --yyt-control-shadow-hover: 0 16px 28px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        --yyt-control-shadow-focus: 0 18px 30px rgba(8, 14, 24, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        --yyt-control-shadow-active: 0 10px 20px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.04);
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
        border: 1px solid var(--yyt-control-border);
        border-radius: var(--yyt-control-radius);
        background: var(--yyt-control-bg);
        color: var(--yyt-text);
        font-size: 13px;
        box-shadow: var(--yyt-control-shadow);
      }

      .yyt-input:focus,
      .yyt-select:focus,
      .yyt-textarea:focus,
      .yyt-input:focus-visible,
      .yyt-select:focus-visible,
      .yyt-textarea:focus-visible {
        outline: none;
        border-color: var(--yyt-control-border-focus);
        background: var(--yyt-control-bg-focus);
        box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
      }

      .yyt-input::placeholder,
      .yyt-textarea::placeholder {
        color: rgba(255, 255, 255, 0.42);
      }

      .yyt-custom-select {
        position: relative;
        isolation: isolate;
        flex: 1;
        min-width: 0;
      }

      .yyt-select-trigger,
      .yyt-select-dropdown,
      .yyt-select-option {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background-image: none !important;
      }

      .yyt-option-star,
      .yyt-option-delete {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 26px;
        border: 1px solid transparent;
        border-radius: 8px;
        background: #1b2535 !important;
        color: var(--yyt-text-muted);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .yyt-option-star:hover {
        color: var(--yyt-accent);
        background: #243249 !important;
        border-color: rgba(123, 183, 255, 0.18);
      }

      .yyt-option-delete:hover {
        color: #fca5a5;
        background: #3a2025 !important;
        border-color: rgba(239, 68, 68, 0.18);
      }

      .yyt-option-star.yyt-starred {
        color: #fbbf24;
        background: #3b3120 !important;
        border-color: rgba(251, 191, 36, 0.2);
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
    `}async function S(){let k=`${a}-styles`,N=o.document||document;if(N.getElementById(k))return;let B="",L=[];try{L.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{L.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}L.push("./styles/main.css");for(let ie of[...new Set(L.filter(Boolean))])try{let ge=await fetch(ie);if(ge.ok){B=await ge.text();break}}catch{}B||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),B=E());let X=N.createElement("style");X.id=k,X.textContent=B,(N.head||N.documentElement).appendChild(X),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function M(){let k=o.document||document;if(r.uiModule?.getAllStyles){let N=`${a}-ui-styles`;if(!k.getElementById(N)){let B=k.createElement("style");B.id=N,B.textContent=r.uiModule.getAllStyles(),(k.head||k.documentElement).appendChild(B)}}if(r.promptEditorModule&&r.promptEditorModule.getPromptEditorStyles){let N=`${a}-prompt-styles`;if(!k.getElementById(N)){let B=k.createElement("style");B.id=N,B.textContent=r.promptEditorModule.getPromptEditorStyles(),(k.head||k.documentElement).appendChild(B)}}}async function R(){try{let{applyUiPreferences:k}=await Promise.resolve().then(()=>(gr(),Ji));if(r.settingsServiceModule?.settingsService){let N=r.settingsServiceModule.settingsService.getUiSettings();if(N&&N.theme){let B=o.document||document;k(N,B),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${N.theme}`)}}}catch(k){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",k)}}function U(){let k=o.jQuery||window.jQuery;if(!k){m("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(U,1e3);return}let N=o.document||document,B=k("#extensionsMenu",N);if(!B.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(U,2e3);return}if(k(`#${l}`,B).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let X=k(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),ie=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,ge=k(ie);ge.on("click",function(Q){Q.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Fe=k("#extensionsMenuButton",N);Fe.length&&B.is(":visible")&&Fe.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),X.append(ge),B.append(X),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function F(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${n}`),await S();let k=await x();if(y(k?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&r.uiModule?.initUI)try{r.uiModule.initUI({services:r,autoInjectStyles:!1,targetDocument:o.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(B){console.error(`[${a}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,B)}if(r.uiModule&&(M(),await R()),r.toolAutomationServiceModule?.toolAutomationService){let B=r.toolAutomationServiceModule.toolAutomationService.init();y(B?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let N=o.document||document;N.readyState==="loading"?N.addEventListener("DOMContentLoaded",()=>{setTimeout(U,1e3)}):setTimeout(U,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:x,injectStyles:S,addMenuItem:U,loadLegacyModule:b,init:F,log:y,logError:m}}fe();Te();function dc(t){let{constants:e,topLevelWindow:s,modules:o,caches:r,uiState:a}=t,{SCRIPT_ID:n,SCRIPT_VERSION:i,POPUP_ID:l}=e,c={cleanup:null},d={cleanups:[]},u={cleanups:[]};function f(...p){console.log(`[${n}]`,...p)}function y(...p){console.error(`[${n}]`,...p)}async function m(p){if(o[p])return o[p];let v=t?.services?.loadLegacyModule;if(typeof v!="function")return null;try{return await v(p)}catch(T){return y(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${p}`,T),null}}function b(p){return typeof p!="string"?"":p.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function x(){return s.jQuery||window.jQuery}function E(){return s.document||document}function S(p){if(!p)return"\u672A\u9009\u62E9\u9875\u9762";let v=o.toolRegistryModule?.getToolConfig(p);if(!v)return p;if(!v.hasSubTabs)return v.name||p;let T=R(p),_=v.subTabs?.find(I=>I.id===T);return _?.name?`${v.name} / ${_.name}`:v.name||p}function M(p){if(!p)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let v=o.toolRegistryModule?.getToolConfig(p);if(!v)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!v.hasSubTabs)return v.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let T=R(p);return v.subTabs?.find(I=>I.id===T)?.description||v.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function R(p,v=""){let T=o.toolRegistryModule?.getToolConfig(p);if(!T?.hasSubTabs||!Array.isArray(T.subTabs)||T.subTabs.length===0)return"";let _=String(v||a.currentSubTab[p]||"").trim(),D=_&&T.subTabs.some(j=>j?.id===_)?_:T.subTabs[0]?.id||"";return D&&a.currentSubTab[p]!==D&&(a.currentSubTab[p]=D),D}function U(){let p=a.currentPopup;if(!p)return;let v=S(a.currentMainTab),T=M(a.currentMainTab),_=p.querySelector(".yyt-popup-active-label");_&&(_.textContent=`\u5F53\u524D\uFF1A${v}`);let I=p.querySelector(".yyt-shell-breadcrumb");I&&(I.textContent=v);let D=p.querySelector(".yyt-shell-main-title");D&&(D.textContent=v);let j=p.querySelector(".yyt-shell-main-description");j&&(j.textContent=T)}function F(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function k(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(p=>{typeof p=="function"&&p()}),d.cleanups=[])}function N(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(p=>{typeof p=="function"&&p()}),u.cleanups=[])}function B(){let p=x();if(!p||!a.currentPopup)return;let v=o.toolRegistryModule?.getToolList()||[],T=p(a.currentPopup).find(".yyt-main-nav");if(!T.length)return;let _=v.map(D=>`
      <div class="yyt-main-nav-item ${D.id===a.currentMainTab?"active":""}" data-tab="${D.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${b(D.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${b(D.name||D.id)}</span>
          <span class="yyt-main-nav-desc">${b(D.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");T.html(_),p(a.currentPopup).find(".yyt-main-nav-item").on("click",function(){let j=p(this).data("tab");j&&Tt(j)});let I=p(a.currentPopup).find(".yyt-shell-sidebar-hint");I.length&&I.text(`${v.length} tabs`)}function L(){let p=x();if(!p||!a.currentPopup)return;let v=o.toolRegistryModule?.getToolList()||[],T=o.toolRegistryModule?.getToolConfig("tools"),_=Array.isArray(T?.subTabs)?T.subTabs:[],I=_.filter(q=>q?.isCustom).length,D=_.filter(q=>!q?.isCustom).length,j=p(a.currentPopup);j.find(".yyt-shell-topbar-meta").text(`\u4E3B\u9875\u9762 ${v.length} / \u9ED8\u8BA4\u5DE5\u5177 ${D} / \u81EA\u5B9A\u4E49\u5DE5\u5177 ${I}`),j.find(".yyt-shell-stat").eq(0).find(".yyt-shell-stat-value").text(String(v.length)),j.find(".yyt-shell-stat").eq(1).find(".yyt-shell-stat-value").text(String(D)),j.find(".yyt-shell-stat").eq(2).find(".yyt-shell-stat-value").text(String(I))}function X(){let p=o.toolRegistryModule?.getToolList()||[];return p.length?(p.some(v=>v.id===a.currentMainTab)||(a.currentMainTab=p[0].id),a.currentMainTab):null}async function ie(p={}){let{rebuildNavigation:v=!1,reRenderSubNav:T=!1}=p,_=x();if(!_||!a.currentPopup)return;let I=X();if(!I)return;v&&(B(),L());let D=o.toolRegistryModule?.getToolConfig(I),j=!!D?.hasSubTabs,q=_(a.currentPopup).find(".yyt-sub-nav"),W=_(a.currentPopup).find(".yyt-content-inner");if(v&&W.length){let K=new Set(W.find(".yyt-tab-content").map((ue,be)=>_(be).data("tab")).get());(o.toolRegistryModule?.getToolList()||[]).forEach(ue=>{K.has(ue.id)||W.append(`<div class="yyt-tab-content" data-tab="${b(ue.id)}"></div>`)}),W.find(".yyt-tab-content").each((ue,be)=>{let pt=_(be).data("tab");(o.toolRegistryModule?.getToolList()||[]).some(rt=>rt.id===pt)||_(be).remove()})}_(a.currentPopup).find(".yyt-main-nav-item").removeClass("active"),_(a.currentPopup).find(`.yyt-main-nav-item[data-tab="${I}"]`).addClass("active"),_(a.currentPopup).find(".yyt-tab-content").removeClass("active"),_(a.currentPopup).find(`.yyt-tab-content[data-tab="${I}"]`).addClass("active"),j?(q.show(),(T||v)&&Ot(I,D.subTabs)):q.hide(),await He(I),U(),V()}function ge(){if(!a.currentPopup)return;k();let p=()=>{if(a.currentMainTab==="apiPresets"){ie();return}a.currentMainTab==="tools"&&ie({reRenderSubNav:!0})},v=()=>{a.currentMainTab==="tools"?ie({rebuildNavigation:!0,reRenderSubNav:!0}):L()},T=()=>{(a.currentMainTab==="bypass"||a.currentMainTab==="tools")&&ie({reRenderSubNav:a.currentMainTab==="tools"})};[C.PRESET_CREATED,C.PRESET_UPDATED,C.PRESET_DELETED].forEach(_=>{d.cleanups.push($.on(_,p))}),[C.TOOL_REGISTERED,C.TOOL_UPDATED,C.TOOL_UNREGISTERED].forEach(_=>{d.cleanups.push($.on(_,v))}),[C.BYPASS_PRESET_CREATED,C.BYPASS_PRESET_UPDATED,C.BYPASS_PRESET_DELETED].forEach(_=>{d.cleanups.push($.on(_,T))})}function je(p){return!!p?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function Q(p){let v=p?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return v?v.scrollHeight>v.clientHeight+2||v.scrollWidth>v.clientWidth+2:!1}function Fe(p,v){return v?.closest?.(".yyt-scrollable-surface")===p}function Rt(p,v){if(!p||!v)return null;let T=v.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return T&&(T.classList?.contains("yyt-select-portal-layer")||p.contains(T))&&(T.scrollHeight>T.clientHeight+2||T.scrollWidth>T.clientWidth+2)?T:[v.closest?.(".yyt-tool-list"),v.closest?.(".yyt-settings-content"),v.closest?.(".yyt-sub-content"),v.closest?.(".yyt-tab-content.active"),p].filter(Boolean).find(I=>I!==p&&!p.contains(I)?!1:I.scrollHeight>I.clientHeight+2||I.scrollWidth>I.clientWidth+2)||p}function Ke({mainTab:p=null,includeSubContent:v=!1}={}){let T=a.currentPopup;if(!T)return;let _=T.querySelector(".yyt-content");_&&(_.scrollTop=0,_.scrollLeft=0);let I=p?`.yyt-tab-content[data-tab="${p}"]`:".yyt-tab-content.active",D=T.querySelector(I);if(D&&(D.scrollTop=0,D.scrollLeft=0),!v)return;(D?.querySelectorAll(".yyt-sub-content")||[]).forEach(q=>{q.scrollTop=0,q.scrollLeft=0})}function ot(p){let v=E();if(!p||!v)return;p.classList.add("yyt-scrollable-surface");let T=!1,_=!1,I=0,D=0,j=0,q=0,W=!1,K=!1,ue=()=>{T=!1,_=!1,p.classList.remove("yyt-scroll-dragging")},be=H=>{H.button===0&&(je(H.target)||Fe(p,H.target)&&(W=p.scrollWidth>p.clientWidth+2,K=p.scrollHeight>p.clientHeight+2,!(!W&&!K)&&(H.stopPropagation(),T=!0,_=!1,I=H.clientX,D=H.clientY,j=p.scrollLeft,q=p.scrollTop)))},pt=H=>{if(!T)return;let Lt=H.clientX-I,Ee=H.clientY-D;!(Math.abs(Lt)>4||Math.abs(Ee)>4)&&!_||(_=!0,p.classList.add("yyt-scroll-dragging"),W&&(p.scrollLeft=j-Lt),K&&(p.scrollTop=q-Ee),H.preventDefault())},rt=()=>{ue()},_t=H=>{if(H.ctrlKey||Q(H.target)||!p.classList.contains("yyt-content")&&!Fe(p,H.target))return;let Ee=Rt(p,H.target);!Ee||Ee!==p&&!p.contains(Ee)||!(Ee.scrollHeight>Ee.clientHeight+2||Ee.scrollWidth>Ee.clientWidth+2)||(Math.abs(H.deltaY)>0&&(Ee.scrollTop+=H.deltaY),Math.abs(H.deltaX)>0&&(Ee.scrollLeft+=H.deltaX),H.preventDefault(),H.stopPropagation())},G=H=>{_&&H.preventDefault()};p.addEventListener("mousedown",be),p.addEventListener("wheel",_t,{passive:!1}),p.addEventListener("dragstart",G),v.addEventListener("mousemove",pt),v.addEventListener("mouseup",rt),u.cleanups.push(()=>{ue(),p.classList.remove("yyt-scrollable-surface"),p.removeEventListener("mousedown",be),p.removeEventListener("wheel",_t),p.removeEventListener("dragstart",G),v.removeEventListener("mousemove",pt),v.removeEventListener("mouseup",rt)})}function V(){let p=a.currentPopup;if(!p)return;N();let v=[...p.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...p.querySelectorAll(".yyt-sub-nav"),...p.querySelectorAll(".yyt-content"),...p.querySelectorAll(".yyt-settings-content"),...p.querySelectorAll(".yyt-tool-list")];[...new Set(v)].forEach(ot)}function se(p){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(p||[]).slice(0,6).map(T=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${b(T.icon||"fa-file")}"></i>
        <span>${b(T.name||T.id)}</span>
      </div>
    `).join("")}
          </div>
          <div class="yyt-startup-screen-status">
            <i class="fa-solid fa-sparkles"></i>
            <span>\u5DE5\u4F5C\u53F0\u5DF2\u51C6\u5907\u5C31\u7EEA\uFF0C\u540E\u7EED\u6253\u5F00\u5C06\u76F4\u63A5\u8FDB\u5165\u4E3B\u754C\u9762\u3002</span>
          </div>
          <button type="button" class="yyt-btn yyt-btn-primary yyt-startup-enter">
            <i class="fa-solid fa-arrow-right"></i>
            <span>\u8FDB\u5165\u5DE5\u5177\u7BB1</span>
          </button>
        </div>
      </div>
    `}function _e(p){let v=x();if(!v||!a.currentPopup||a.startupScreenDismissed)return;let T=v(a.currentPopup).find(".yyt-popup-body"),_=T.find(".yyt-popup-shell");!T.length||!_.length||T.find("[data-yyt-startup-screen]").length||(_.attr("data-yyt-startup-visible","true"),T.prepend(se(p)),T.find(".yyt-startup-enter").on("click",()=>{T.find("[data-yyt-startup-screen]").remove(),_.removeAttr("data-yyt-startup-visible"),a.startupScreenDismissed=!0,V()}))}function Dt(){let p=E(),v=a.currentPopup,T=v?.querySelector(".yyt-popup-header");if(!v||!T||!p)return;let _=!1,I=0,D=0,j=0,q=0,W="",K=()=>({width:s.innerWidth||p.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||p.documentElement?.clientHeight||window.innerHeight||0}),ue=(G,H,Lt)=>Math.min(Math.max(G,H),Lt),be=()=>{_&&(_=!1,v.classList.remove("yyt-popup-dragging"),p.body.style.userSelect=W)},pt=G=>{if(!_||!a.currentPopup)return;let H=G.clientX-I,Lt=G.clientY-D,{width:Ee,height:Lr}=K(),pc=v.offsetWidth||0,gc=v.offsetHeight||0,fc=Math.max(0,Ee-pc),mc=Math.max(0,Lr-gc);v.style.left=`${ue(j+H,0,fc)}px`,v.style.top=`${ue(q+Lt,0,mc)}px`,v.style.transform="none",v.style.right="auto",v.style.bottom="auto"},rt=()=>{be()},_t=G=>{if(G.button!==0||G.target?.closest(".yyt-popup-close"))return;_=!0,I=G.clientX,D=G.clientY;let H=v.getBoundingClientRect();j=H.left,q=H.top,v.style.left=`${H.left}px`,v.style.top=`${H.top}px`,v.style.transform="none",v.style.right="auto",v.style.bottom="auto",v.classList.add("yyt-popup-dragging"),W=p.body.style.userSelect||"",p.body.style.userSelect="none",G.preventDefault()};T.addEventListener("mousedown",_t),p.addEventListener("mousemove",pt),p.addEventListener("mouseup",rt),c.cleanup=()=>{be(),T.removeEventListener("mousedown",_t),p.removeEventListener("mousemove",pt),p.removeEventListener("mouseup",rt)}}function yt(){F(),k(),N();let p=x();if(p&&a.currentPopup){let v=p(a.currentPopup);ye(v,"yytPopupToolConfigSelect"),ye(v,"yytPromptEditorSelect")}a.currentPopup&&(a.currentPopup.remove(),a.currentPopup=null),a.currentOverlay&&(a.currentOverlay.remove(),a.currentOverlay=null),f("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Tt(p){a.currentMainTab=p;let v=x();if(!v||!a.currentPopup)return;Ke({mainTab:p,includeSubContent:!0}),v(a.currentPopup).find(".yyt-main-nav-item").removeClass("active"),v(a.currentPopup).find(`.yyt-main-nav-item[data-tab="${p}"]`).addClass("active");let T=o.toolRegistryModule?.getToolConfig(p);T?.hasSubTabs?(v(a.currentPopup).find(".yyt-sub-nav").show(),Ot(p,T.subTabs)):v(a.currentPopup).find(".yyt-sub-nav").hide(),v(a.currentPopup).find(".yyt-tab-content").removeClass("active"),v(a.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`).addClass("active"),He(p),U(),V()}function is(p,v){a.currentSubTab[p]=v;let T=x();!T||!a.currentPopup||(Ke({mainTab:p,includeSubContent:!0}),T(a.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),T(a.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${v}"]`).addClass("active"),St(p,v),U(),V())}function Ot(p,v){let T=x();if(!T||!a.currentPopup||!v)return;let _=R(p,a.currentSubTab[p]||v[0]?.id),D=(p==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:v.filter(j=>(j?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:v.filter(j=>j?.toolKind==="script")}].filter(j=>j.items.length>0):[{key:"default",title:"",items:v}]).map(j=>{let q=j.title?`<div class="yyt-sub-nav-group-title">${b(j.title)}</div>`:"",W=j.items.map(K=>`
        <div class="yyt-sub-nav-item ${K.id===_?"active":""}" data-subtab="${K.id}">
          <i class="fa-solid ${K.icon||"fa-file"}"></i>
          <span>${b(K.name||K.id)}</span>
        </div>
      `).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${j.key}">
          ${q}
          <div class="yyt-sub-nav-group-items">
            ${W}
          </div>
        </div>
      `}).join("");T(a.currentPopup).find(".yyt-sub-nav").html(D),T(a.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let q=T(this).data("subtab");is(p,q)}),V()}async function He(p){let v=x();if(!v||!a.currentPopup)return;let T=v(a.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`);if(!T.length)return;let _=o.toolRegistryModule?.getToolConfig(p);switch(p){case"apiPresets":if(o.uiModule?.renderApiPanel)o.uiModule.renderApiPanel(T);else{let I=await m("uiComponentsModule");I?.render&&I.render(T)}break;case"toolManage":if(o.uiModule?.renderToolPanel)o.uiModule.renderToolPanel(T);else{let I=await m("uiComponentsModule");I?.renderTool&&I.renderTool(T)}break;case"regexExtract":if(o.uiModule?.renderRegexPanel)o.uiModule.renderRegexPanel(T);else{let I=await m("uiComponentsModule");I?.renderRegex&&I.renderRegex(T)}break;case"tools":{let I=R(p);_?.hasSubTabs&&I?await St(p,I):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"tableWorkbench":o.uiModule?.renderTableWorkbenchPanel?o.uiModule.renderTableWorkbenchPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":o.uiModule?.renderBypassPanel?o.uiModule.renderBypassPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":o.uiModule?.renderSettingsPanel?o.uiModule.renderSettingsPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:ho(p,T);break}V()}async function St(p,v){let T=x();if(!T||!a.currentPopup)return;let _=T(a.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`);if(!_.length)return;let I=o.toolRegistryModule?.getToolConfig(p);if(I?.hasSubTabs){let j=R(p,v),q=I.subTabs?.find(K=>K.id===j),W=_.find(".yyt-sub-content");if(W.length||(_.html('<div class="yyt-sub-content"></div>'),W=_.find(".yyt-sub-content")),!q){W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Ke({mainTab:p,includeSubContent:!0}),V();return}switch(q.component){case"SummaryToolPanel":if(o.uiModule?.renderSummaryToolPanel)o.uiModule.renderSummaryToolPanel(W);else{let K=await m("uiComponentsModule");K?.SummaryToolPanel?K.SummaryToolPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(o.uiModule?.renderStatusBlockPanel)o.uiModule.renderStatusBlockPanel(W);else{let K=await m("uiComponentsModule");K?.StatusBlockPanel?K.StatusBlockPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(o.uiModule?.renderYouyouReviewPanel)o.uiModule.renderYouyouReviewPanel(W);else{let K=await m("uiComponentsModule");K?.YouyouReviewPanel?K.YouyouReviewPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"EscapeTransformToolPanel":if(o.uiModule?.renderEscapeTransformToolPanel)o.uiModule.renderEscapeTransformToolPanel(W);else{let K=await m("uiComponentsModule");K?.EscapeTransformToolPanel?K.EscapeTransformToolPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"PunctuationTransformToolPanel":if(o.uiModule?.renderPunctuationTransformToolPanel)o.uiModule.renderPunctuationTransformToolPanel(W);else{let K=await m("uiComponentsModule");K?.PunctuationTransformToolPanel?K.PunctuationTransformToolPanel.renderTo(W):W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await ks(q,W);break;default:W.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Ke({mainTab:p,includeSubContent:!0}),V();return}let D=_.find(".yyt-sub-content");if(D.length){switch(v){case"config":vo(p,D);break;case"prompts":await Cs(p,D);break;case"presets":Ps(p,D);break;default:D.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Ke({mainTab:p,includeSubContent:!0}),V()}}async function ks(p,v){if(!(!x()||!v?.length||!p?.id))try{let _=r.dynamicToolPanelCache.get(p.id);if(!_){let D=(await Promise.resolve().then(()=>(ss(),Ki)))?.createToolConfigPanel;if(typeof D!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");_=D({id:`${p.id}Panel`,toolId:p.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${p.name||p.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${p.id}-extraction-preview`,previewTitle:`${p.name||p.id} \u63D0\u53D6\u9884\u89C8`}),r.dynamicToolPanelCache.set(p.id,_)}_.renderTo(v),V()}catch(_){console.error(`[${n}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,_),v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function ho(p,v){if(!x())return;let _=o.toolRegistryModule?.getToolConfig(p);if(!_){v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let I=a.currentSubTab[p]||_.subTabs?.[0]?.id||"config";v.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${I}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),St(p,I)}function vo(p,v){if(!x())return;let _=o.toolManagerModule?.getTool(p),I=o.presetManagerModule?.getAllPresets()||[],D=o.toolRegistryModule?.getToolApiPreset(p)||"",j=I.map(q=>`<option value="${b(q.name)}" ${q.name===D?"selected":""}>${b(q.name)}</option>`).join("");v.html(`
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
              ${j}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${_?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${_?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),we(v,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),v.find("#yyt-save-tool-preset").on("click",function(){let W=v.find("#yyt-tool-api-preset").val();o.toolRegistryModule?.setToolApiPreset(p,W);let K=s.toastr;K&&K.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function Cs(p,v){let T=x(),_=o.promptEditorModule||await m("promptEditorModule");if(!T||!_){v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let D=o.toolManagerModule?.getTool(p)?.config?.messages||[],j=_.messagesToSegments?_.messagesToSegments(D):_.DEFAULT_PROMPT_SEGMENTS,q=new _.PromptEditor({containerId:`yyt-prompt-editor-${p}`,segments:j,onChange:K=>{let ue=_.segmentsToMessages?_.segmentsToMessages(K):[];f("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ue.length,"\u6761\u6D88\u606F")}});v.html(`<div id="yyt-prompt-editor-${p}" class="yyt-prompt-editor-container"></div>`),q.init(v.find(`#yyt-prompt-editor-${p}`));let W=_.getPromptEditorStyles?_.getPromptEditorStyles():"";if(W){let K="yyt-prompt-editor-styles",ue=s.document||document;if(!ue.getElementById(K)){let be=ue.createElement("style");be.id=K,be.textContent=W,(ue.head||ue.documentElement).appendChild(be)}}}function Ps(p,v){x()&&v.html(`
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
    `)}async function xo(){if(a.currentPopup){f("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let p=t?.services?.loadModules;typeof p=="function"&&await p();let v=x(),T=E();if(!v){y("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let _=o.toolRegistryModule?.getToolList()||[];if(!_.length){y("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}_.some(G=>G.id===a.currentMainTab)||(a.currentMainTab=_[0].id);let I=o.toolRegistryModule?.getToolConfig("tools"),D=Array.isArray(I?.subTabs)?I.subTabs:[],j=D.filter(G=>G?.isCustom).length,q=D.filter(G=>!G?.isCustom).length,W=S(a.currentMainTab),K=M(a.currentMainTab);a.currentOverlay=T.createElement("div"),a.currentOverlay.className="yyt-popup-overlay",a.currentOverlay.addEventListener("click",G=>{G.target===a.currentOverlay&&yt()}),T.body.appendChild(a.currentOverlay);let ue=_.map(G=>`
      <div class="yyt-main-nav-item ${G.id===a.currentMainTab?"active":""}" data-tab="${G.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${b(G.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${b(G.name||G.id)}</span>
          <span class="yyt-main-nav-desc">${b(G.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),be=_.map(G=>`
      <div class="yyt-tab-content ${G.id===a.currentMainTab?"active":""}" data-tab="${G.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),pt=`
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
                <div class="yyt-shell-topbar-summary">
                  <div class="yyt-shell-topbar-title">\u5DE5\u4F5C\u53F0\u6982\u89C8</div>
                  <div class="yyt-shell-topbar-meta">\u4E3B\u9875\u9762 ${_.length} / \u9ED8\u8BA4\u5DE5\u5177 ${q} / \u81EA\u5B9A\u4E49\u5DE5\u5177 ${j}</div>
                </div>
              </div>
              <div class="yyt-shell-stats">
                <div class="yyt-shell-stat">
                  <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                  <strong class="yyt-shell-stat-value">${_.length}</strong>
                </div>
                <div class="yyt-shell-stat">
                  <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                  <strong class="yyt-shell-stat-value">${q}</strong>
                </div>
                <div class="yyt-shell-stat">
                  <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                  <strong class="yyt-shell-stat-value">${j}</strong>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${_.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${ue}
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
                      <div class="yyt-shell-breadcrumb">${b(W)}</div>
                    </div>
                    <div class="yyt-shell-main-title">${b(W)}</div>
                    <div class="yyt-shell-main-description">${b(K)}</div>
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
                      ${be}
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
                <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${b(W)}</span>
              </div>
              <div class="yyt-popup-footer-note">
                API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
              </div>
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${n}-close-btn">\u5173\u95ED</button>
          </div>
        </div>
      </div>
    `,rt=T.createElement("div");rt.innerHTML=pt,a.currentPopup=rt.firstElementChild,T.body.appendChild(a.currentPopup),v(a.currentPopup).find(".yyt-popup-close").on("click",yt),v(a.currentPopup).find(`#${n}-close-btn`).on("click",yt),ge(),v(a.currentPopup).find(".yyt-main-nav-item").on("click",function(){let H=v(this).data("tab");H&&Tt(H)}),Dt(),He(a.currentMainTab);let _t=o.toolRegistryModule?.getToolConfig(a.currentMainTab);_t?.hasSubTabs&&(v(a.currentPopup).find(".yyt-sub-nav").show(),Ot(a.currentMainTab,_t.subTabs)),U(),_e(_),V(),f("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:xo,closePopup:yt,switchMainTab:Tt,switchSubTab:is,renderTabContent:He,renderSubTabContent:St}}function uc(t,e={}){let{constants:s,modules:o}=t,{SCRIPT_ID:r,SCRIPT_VERSION:a}=s,{init:n,loadModules:i,loadLegacyModule:l,addMenuItem:c,popupShell:d}=e;return{version:a,id:r,init:n,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:c,getStorage:()=>o.storageModule,getApiConnection:()=>o.apiConnectionModule,getPresetManager:()=>o.presetManagerModule,getUi:()=>o.uiModule,getUiModule:()=>o.uiModule,getUiComponents:()=>o.uiComponentsModule,getRegexExtractor:()=>o.regexExtractorModule,getToolManager:()=>o.toolManagerModule,getToolExecutor:()=>o.toolExecutorModule,getWindowManager:()=>o.windowManagerModule,getToolRegistry:()=>o.toolRegistryModule,getPromptEditor:()=>o.promptEditorModule,getSettingsService:()=>o.settingsServiceModule,getBypassManager:()=>o.bypassManagerModule,getVariableResolver:()=>o.variableResolverModule,getContextInjector:()=>o.contextInjectorModule,getToolPromptService:()=>o.toolPromptServiceModule,getToolOutputService:()=>o.toolOutputServiceModule,getToolAutomationService:()=>o.toolAutomationServiceModule,async loadLegacyModule(u){return typeof l!="function"?null:l(u)},async getApiConfig(){return await i(),o.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(u){return await i(),o.apiConnectionModule?(o.apiConnectionModule.updateApiConfig(u),!0):!1},async getPresets(){return await i(),o.presetManagerModule?o.presetManagerModule.getAllPresets():[]},async sendApiRequest(u,f){if(await i(),o.apiConnectionModule)return o.apiConnectionModule.sendApiRequest(u,f);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),o.apiConnectionModule?o.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(u,f){return o.toolRegistryModule?.registerTool(u,f)||!1},unregisterTool(u){return o.toolRegistryModule?.unregisterTool(u)||!1},getToolList(){return o.toolRegistryModule?.getToolList()||[]},createWindow(u){return o.windowManagerModule?.createWindow(u)||null},closeWindow(u){o.windowManagerModule?.closeWindow(u)},startAutomation(){return o.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){o.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return o.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},async processCurrentAssistantMessage(u={}){return o.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(u)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var mo="youyou_toolkit",Xy="1.0.49",Qy=`${mo}-menu-item`,Zy=`${mo}-menu-container`,ep=`${mo}-popup`,tp=typeof window.parent<"u"?window.parent:window,bo={constants:{SCRIPT_ID:mo,SCRIPT_VERSION:Xy,MENU_ITEM_ID:Qy,MENU_CONTAINER_ID:Zy,POPUP_ID:ep},topLevelWindow:tp,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{},startupScreenDismissed:!1}},yc=dc(bo),ns=cc(bo,{openPopup:yc.openPopup});bo.services.loadModules=ns.loadModules;bo.services.loadLegacyModule=ns.loadLegacyModule;var an=uc(bo,{init:ns.init,loadModules:ns.loadModules,loadLegacyModule:ns.loadLegacyModule,addMenuItem:ns.addMenuItem,popupShell:yc});if(typeof window<"u"&&(window.YouYouToolkit=an,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=an}catch{}var xm=an;ns.init();console.log(`[${mo}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{xm as default};
