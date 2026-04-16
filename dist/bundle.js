var tc=Object.defineProperty;var D=(t,e)=>()=>(t&&(e=t(t=0)),e);var ie=(t,e)=>{for(var s in e)tc(t,s,{get:e[s],enumerable:!0})};function Za(){let t=_;return t._getStorage(),t._storage}function en(){return _.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function tn(t){_.set("settings",t)}var wt,_,Z,Qa,Cs,Oe=D(()=>{wt=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespaceKey]||(s.extensionSettings[this.namespaceKey]={}),this._storage={_target:s.extensionSettings[this.namespaceKey],getItem:o=>{let r=s.extensionSettings[this.namespaceKey][o];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(o,r)=>{s.extensionSettings[this.namespaceKey][o]=r,this._saveSettings(s)},removeItem:o=>{delete s.extensionSettings[this.namespaceKey][o],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespaceKey}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(o){console.error(`[${this.namespaceKey}] localStorage\u5199\u5165\u5931\u8D25:`,o)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let o=`${this.namespaceKey}:${e}`;if(this._cache.has(o))return this._cache.get(o);let r=this._getStorage(),a=this._getFullKey(e),n=r.getItem(a);if(n===null)return s;try{let l=JSON.parse(n);return this._cache.set(o,l),l}catch{return n}}set(e,s){let o=this._getStorage(),r=this._getFullKey(e),a=`${this.namespaceKey}:${e}`;this._cache.set(a,s);try{o.setItem(r,JSON.stringify(s))}catch(n){console.error(`[${this.namespaceKey}] \u5B58\u50A8\u5931\u8D25:`,n)}}remove(e){let s=this._getStorage(),o=this._getFullKey(e),r=`${this.namespaceKey}:${e}`;this._cache.delete(r),s.removeItem(o)}has(e){let s=this._getStorage(),o=this._getFullKey(e);return s.getItem(o)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let o=s.SillyTavern.getContext();o?.extensionSettings?.[this.namespaceKey]&&(o.extensionSettings[this.namespaceKey]={},this._saveSettings(o))}}else{let s=`${this.namespaceKey}_`,o=[];for(let r=0;r<localStorage.length;r++){let a=localStorage.key(r);a&&a.startsWith(s)&&o.push(a)}o.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let s={};return e.forEach(o=>{s[o]=this.get(o)}),s}setMultiple(e){Object.entries(e).forEach(([s,o])=>{this.set(s,o)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let o=typeof window.parent<"u"?window.parent:window;if(o.SillyTavern?.getContext){let a=o.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(a).forEach(([n,l])=>{s[n]=typeof l=="string"?JSON.parse(l):l})}}else{let o=`${this.namespaceKey}_`;for(let r=0;r<localStorage.length;r++){let a=localStorage.key(r);if(a&&a.startsWith(o)){let n=a.slice(o.length);try{s[n]=JSON.parse(localStorage.getItem(a))}catch{s[n]=localStorage.getItem(a)}}}}return s}},_=new wt("youyou_toolkit"),Z=new wt("youyou_toolkit:tools"),Qa=new wt("youyou_toolkit:presets"),Cs=new wt("youyou_toolkit:windows")});var Ir={};ie(Ir,{DEFAULT_API_PRESETS:()=>oc,DEFAULT_SETTINGS:()=>sc,STORAGE_KEYS:()=>Ps,StorageService:()=>wt,deepMerge:()=>sn,getCurrentPresetName:()=>nc,getStorage:()=>Za,loadApiPresets:()=>rc,loadSettings:()=>en,presetStorage:()=>Qa,saveApiPresets:()=>ac,saveSettings:()=>tn,setCurrentPresetName:()=>ic,storage:()=>_,toolStorage:()=>Z,windowStorage:()=>Cs});function rc(){return _.get(Ps.API_PRESETS)||[]}function ac(t){_.set(Ps.API_PRESETS,t)}function nc(){return _.get(Ps.CURRENT_PRESET)||""}function ic(t){_.set(Ps.CURRENT_PRESET,t||"")}function sn(t,e){let s=r=>r&&typeof r=="object"&&!Array.isArray(r),o={...t};return s(t)&&s(e)&&Object.keys(e).forEach(r=>{s(e[r])?r in t?o[r]=sn(t[r],e[r]):Object.assign(o,{[r]:e[r]}):Object.assign(o,{[r]:e[r]})}),o}var Ps,sc,oc,$r=D(()=>{Oe();Oe();Ps={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},sc={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},oc=[]});var M,Rr,I,me=D(()=>{M={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Rr=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,o={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=o;this.listeners.has(e)||this.listeners.set(e,new Set);let a={callback:s,priority:r};return this.listeners.get(e).add(a),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let o=this.listeners.get(e);if(o){for(let r of o)if(r.callback===s){o.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let o=this.listeners.get(e);if(!o||o.size===0)return;let r=Array.from(o).sort((a,n)=>n.priority-a.priority);for(let{callback:a}of r)try{a(s)}catch(n){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,n)}}once(e,s){let o=r=>{this.off(e,o),s(r)};return this.on(e,o)}wait(e,s=0){return new Promise((o,r)=>{let a=null,n=this.once(e,l=>{a&&clearTimeout(a),o(l)});s>0&&(a=setTimeout(()=>{n(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},I=new Rr});function ut(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function b(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function x(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let o=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(o.toastr){o.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}lc(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function ve(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:o=3500,sticky:r=!1,noticeId:a=""}=s,n=ut();if(!n?.body){x(t,e,o);return}let l="yyt-top-notice-container",i="yyt-top-notice-styles",c=n.getElementById(l);if(c||(c=n.createElement("div"),c.id=l,c.style.cssText=`
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
    `,n.body.appendChild(c)),!n.getElementById(i)){let w=n.createElement("style");w.id=i,w.textContent=`
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
    `,n.head.appendChild(w)}if(a){let w=c.querySelector(`[data-notice-id="${a}"]`);w&&w.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=n.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,a&&(u.dataset.noticeId=a);let f=n.createElement("span");f.className="yyt-top-notice__icon",f.textContent=d[t]||d.info;let y=n.createElement("div");y.className="yyt-top-notice__content",y.textContent=e;let m=n.createElement("button");m.className="yyt-top-notice__close",m.type="button",m.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),m.textContent="\xD7";let v=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};m.addEventListener("click",v),u.appendChild(f),u.appendChild(y),u.appendChild(m),c.appendChild(u),r||setTimeout(v,o)}function lc(t,e,s){let o=ut();if(!o)return;let r=o.getElementById("yyt-fallback-toast");r&&r.remove();let a={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},n=a[t]||a.info,l=o.createElement("div");if(l.id="yyt-fallback-toast",l.style.cssText=`
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
  `,l.textContent=e,!o.getElementById("yyt-toast-styles")){let i=o.createElement("style");i.id="yyt-toast-styles",i.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,o.head.appendChild(i)}o.body.appendChild(l),setTimeout(()=>{l.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{l.remove()},300)},s)}function $(){if(Dt)return Dt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Dt=window.parent.jQuery,Dt}catch{}return window.jQuery&&(Dt=window.jQuery),Dt}function cc(){Dt=null}function O(t){return t&&t.length>0}function Tt(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function is(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,s])=>s===!0?e:`${e}="${b(String(s))}"`).join(" ")}function rn(t=[],e="",s=""){let o=String(e??""),r=t.find(a=>a.value===o)||t.find(a=>a.disabled!==!0)||null;return r||{value:o,label:s||o||"\u8BF7\u9009\u62E9",disabled:!1}}function dc(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function on(t,e){let s=$();if(!s||!e?.length)return null;let o=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!o)return null;let a=t.find("[data-yyt-custom-select]").filter((n,l)=>String(s(l).attr("data-yyt-select-target")||"")===o);return a.length?a.first():null}function an(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function uc(t){if(!$()||!O(t))return null;let s=t.find("[data-yyt-custom-select]");return s.length?s:null}function nn(t,e){if(!$()||!e?.length)return null;let o=e.find("[data-yyt-select-native]").first();if(o.length)return o;let r=String(e.attr("data-yyt-select-target")||"").trim();if(!r)return null;let a=t.find(r).first();return a.length?a:null}function Or(t,e,s=null){let o=$();if(!o||!e?.length)return;let r=s||nn(t,e);if(!r?.length)return;let a=Array.isArray(r.data("yytCustomSelectOptions"))?r.data("yytCustomSelectOptions"):[],n=rn(a,r.val(),e.attr("data-yyt-select-placeholder")||""),l=String(n.value??""),i=String(n.label??""),c=r.is(":disabled");e.find(".yyt-select-value").text(i).attr("data-value",l).data("value",l),e.find("[data-yyt-select-option]").each((u,f)=>{let y=o(f),m=String(y.attr("data-value")||"")===l;y.toggleClass("yyt-selected",m).attr("aria-selected",String(m))});let d=e.find("[data-yyt-select-trigger]").first();d.prop("disabled",c),c&&(e.removeClass("yyt-open"),d.attr("aria-expanded","false"))}function bo(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let o=String(e.value??""),r=String(e.label??e.text??e.name??o);return{value:o,label:r,disabled:e.disabled===!0}}let s=String(e??"");return{value:s,label:s,disabled:!1}}):[]}function ho(t={}){let{selectedValue:e="",options:s=[],placeholder:o="\u8BF7\u9009\u62E9",disabled:r=!1,includeNative:a=!0,nativeTag:n="input",nativeType:l="hidden",rootAttributes:i={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:f={},optionClass:y="",optionTextClass:m=""}=t,v=bo(s),w=rn(v,e,o),A=r===!0||v.length===0,k=is({...i,class:Tt("yyt-custom-select",i.class),"data-yyt-custom-select":i["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":o}),C=is({type:"button",...d,class:Tt("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:A?!0:d.disabled}),F=is({...u,class:Tt("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),K=a?(()=>{let W={...c,class:Tt(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:A?!0:c.disabled};return n==="select"?`<select ${is(W)}>${v.map(N=>`
            <option value="${b(N.value)}" ${N.value===String(w.value??"")?"selected":""} ${N.disabled?"disabled":""}>${b(N.label)}</option>
          `).join("")}</select>`:`<input ${is({type:l,value:w.value,...W})}>`})():"";return`
    <div ${k}>
      ${K}
      <button ${C}>
        <span class="${b(Tt("yyt-select-value"))}" data-value="${b(w.value)}">${b(w.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${F}>
        ${v.map(W=>{let E=W.value===String(w.value??"");return`
            <button ${is({type:"button",...f,class:Tt("yyt-select-option",y,f.class,E?"yyt-selected":""),"data-yyt-select-option":f["data-yyt-select-option"]??"true","data-value":W.value,role:f.role??"option","aria-selected":E?"true":"false",disabled:W.disabled?!0:f.disabled})}>
              <span class="${b(Tt("yyt-option-text",m))}">${b(W.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function ye(t,e="yytCustomSelect"){let s=$();if(!s||!O(t))return;let o=an(t);t.off(`.${e}`),s(o).off(`click.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((r,a)=>{let n=s(a),l=n.attr("data-yyt-original-style");l!==void 0&&l?n.attr("style",l):n.removeAttr("style"),n.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function Te(t,e={}){let s=$();if(!s||!O(t))return;let{namespace:o="yytCustomSelect",selectors:r=[]}=e,a=Array.isArray(r)?r.filter(Boolean):[r].filter(Boolean);if(a.length===0)return;ye(t,o);let n=a.join(", "),l=an(t);t.find(n).each((i,c)=>{let d=s(c),u=String(d.attr("id")||"").trim(),f=u||`yyt-select-${Date.now()}-${i}`,y=u?`#${u}`:`[data-yyt-select-key="${f}"]`,m=`${f}-dropdown`,v=dc(d.attr("class")),w=d.attr("style"),A=d.find("option").map((F,K)=>{let W=s(K);return{value:String(W.attr("value")??W.val()??""),label:W.text(),disabled:W.is(":disabled")}}).get();d.attr("data-yyt-original-style",w??"").attr("data-yyt-select-key",f).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",A);let k=ho({includeNative:!1,selectedValue:d.val(),options:A,disabled:d.is(":disabled"),placeholder:A[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Tt(v),style:w||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":y},triggerAttributes:{id:`${f}-trigger`,"aria-controls":m},dropdownAttributes:{id:m}});d.after(k);let C=on(t,d);Or(t,C,d)}),t.on(`click.${o}`,"[data-yyt-select-trigger]",i=>{i.preventDefault(),i.stopPropagation();let c=s(i.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]"),u=d.hasClass("yyt-open");t.find("[data-yyt-custom-select].yyt-open").not(d).removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"),d.toggleClass("yyt-open",!u),c.attr("aria-expanded",String(!u))}),t.on(`click.${o}`,"[data-yyt-select-option]",i=>{i.preventDefault(),i.stopPropagation();let c=s(i.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]"),u=nn(t,d);if(!u?.length)return;let f=String(c.attr("data-value")||"");u.val(f).trigger("change"),Or(t,d,u),d.removeClass("yyt-open"),d.find("[data-yyt-select-trigger]").attr("aria-expanded","false")}),t.on(`change.${o}`,n,i=>{let c=s(i.currentTarget),d=c.find("option").map((f,y)=>{let m=s(y);return{value:String(m.attr("value")??m.val()??""),label:m.text(),disabled:m.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=on(t,c);Or(t,u,c)}),s(l).off(`click.${o}`).on(`click.${o}`,i=>{if(s(i.target).closest("[data-yyt-custom-select]").length)return;let c=uc(t);c?.length&&c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false")})}function St(t,e=g){if(!$()||!O(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let o=t.find(`#${e}-model`).val()?.trim()||"",r=t.find(`#${e}-model-select`);return r.is(":visible")&&(o=r.val()||o),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:o,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Lt(t,e,s=g){if(!$()||!O(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-stream`).prop("checked",e.stream===!0),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",r);let n=t.find(`#${s}-custom-api-fields`);r?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Nt(t){let{id:e,title:s,body:o,width:r="380px",wide:a=!1,dialogClass:n="",bodyClass:l="",footerClass:i=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${a?"yyt-dialog-wide":""} ${n}" style="${r!=="380px"?`width: ${r};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body ${l}" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${o}
        </div>
        <div class="yyt-dialog-footer ${i}">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function Bt(t,e,s={}){if(!$())return()=>{};let r=t.find(`#${e}-overlay`),a=()=>{r.remove(),s.onClose&&s.onClose()};return r.find(`#${e}-close, #${e}-cancel`).on("click",a),r.on("click",function(n){n.target===this&&a()}),r.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(a)}),a}function yt(t,e){let s=new Blob([t],{type:"application/json"}),o=URL.createObjectURL(s),r=document.createElement("a");r.href=o,r.download=e,r.click(),URL.revokeObjectURL(o)}function pt(t){return new Promise((e,s)=>{let o=new FileReader;o.onload=r=>e(r.target.result),o.onerror=r=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),o.readAsText(t)})}var g,Dt,Se=D(()=>{g="youyou_toolkit";Dt=null});var Is,ee,Dr=D(()=>{me();Se();Is=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,I.emit(M.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,o={}){let r=$();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let a=this.components.get(e);if(!a){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let n;if(typeof s=="string"?n=r(s):s&&s.jquery?n=s:s&&(n=r(s)),!O(n)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}if(this.destroyInstance(e),typeof a.renderTo=="function")a.renderTo(n,{...o,dependencies:this.dependencies});else{let l=a.render({...o,dependencies:this.dependencies});n.html(l),a.bindEvents(n,this.dependencies)}this.activeInstances.set(e,{container:n,component:a,props:o}),I.emit(M.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,I.emit(M.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,I.emit(M.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,o)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let o=e.createElement("style");o.id=s,o.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(o)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){I.on(M.PRESET_UPDATED,()=>{}),I.on(M.TOOL_UPDATED,()=>{})}},ee=new Is});var yn={};ie(yn,{API_STATUS:()=>bc,fetchAvailableModels:()=>zr,getApiConfig:()=>gt,getEffectiveApiConfig:()=>$s,hasEffectiveApiPreset:()=>Rs,sendApiRequest:()=>Os,sendWithPreset:()=>Br,testApiConnection:()=>_c,updateApiConfig:()=>ls,validateApiConfig:()=>cs});function gc(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Nr(){return _.get(ln,gc())}function fc(t){_.set(ln,t)}function cn(){return _.get(yc,[])}function mc(){return _.get(pc,"")}function Lr(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function dn(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let o=null;try{o=new URL(s)}catch{return s}let r=o.pathname.replace(/\/+$/,""),a=r;return e==="chat_completions"?!/\/chat\/completions$/i.test(r)&&!/\/completions$/i.test(r)&&(a=`${r||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(r)?a=r.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(r)?a=r.replace(/\/completions$/i,"/models"):/\/models$/i.test(r)||(a=`${r||""}/models`)),o.pathname=a.replace(/\/+/g,"/"),o.toString()}function hc(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function gt(){return Nr().apiConfig||{}}function ls(t){let e=Nr();e.apiConfig={...e.apiConfig,...t},fc(e)}function cs(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function $s(t=""){let e=Nr(),s=t||mc()||"";if(s){let r=cn().find(a=>a.name===s);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return e.apiConfig||{}}function Rs(t=""){return t?cn().some(s=>s?.name===t):!1}async function Br(t,e,s={},o=null){let r=$s(t);return await Os(e,{...s,apiConfig:r},o)}function un(t,e={}){let s=e.apiConfig||gt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:s.stream??!1,...e.extraParams}}function Ur(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Os(t,e={},s=null){let o=e.apiConfig||gt(),r=o.useMainApi,a=cs(o);if(!a.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${a.errors.join(", ")}`);return r?await vc(t,e,s):await xc(t,o,e,s)}async function vc(t,e,s){let o=typeof window.parent<"u"?window.parent:window;if(!o.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??gt().stream??!1,...e.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function xc(t,e,s,o){let r=typeof window.parent<"u"?window.parent:window;if(r.TavernHelper?.generateRaw)try{return await wc(t,e,s,o,r)}catch(a){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",a)}if(r.SillyTavern?.getRequestHeaders)try{return await Tc(t,e,s,o,r)}catch(a){if(!a?.allowDirectFallback)throw a}return await Sc(t,e,s,o)}async function wc(t,e,s,o,r){if(o?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let a=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:hc(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof a=="string"?a.trim():Ur(a)}async function Tc(t,e,s,o,r){let a=String(e.url||"").trim(),n={...un(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:a,proxy_password:"",custom_url:a,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},l={...typeof r.SillyTavern?.getRequestHeaders=="function"?r.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},i=null;try{i=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:l,body:JSON.stringify(n),signal:o})}catch(u){throw u?.name==="AbortError"?u:Lr(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await i.text().catch(()=>"");if(!i.ok){let u=[404,405,501,502].includes(i.status);throw Lr(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let f=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw Lr(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${f||"(\u7A7A\u54CD\u5E94)"}`)}return Ur(d)}async function Sc(t,e,s,o){let r=un(t,{apiConfig:e,...s}),a=dn(e.url,"chat_completions"),n={"Content-Type":"application/json"};e.apiKey&&(n.Authorization=`Bearer ${e.apiKey}`);let l=await fetch(a,{method:"POST",headers:n,body:JSON.stringify(r),signal:o}),i=await l.text().catch(()=>"");if(!l.ok){let d=i||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${d}`)}let c=null;try{c=i?JSON.parse(i):{}}catch{let u=String(i||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return Ur(c)}async function _c(t=null){let e=t||gt(),s=Date.now();try{await Os([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let r=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(o){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${o.message}`,latency:Date.now()-s}}}async function zr(t=null){let e=t||gt();return e.useMainApi?await Ec():await Ac(e)}async function Ec(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Ac(t){if(!t.url||!t.apiKey)return[];try{let e=dn(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let o=await s.json();return o.data&&Array.isArray(o.data)?o.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var ln,yc,pc,bc,Ds=D(()=>{Oe();ln="settings",yc="api_presets",pc="current_preset";bc={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var mn={};ie(mn,{createPreset:()=>wo,createPresetFromCurrentConfig:()=>$c,deletePreset:()=>Ns,duplicatePreset:()=>Ic,exportPresets:()=>Hr,generateUniquePresetName:()=>qr,getActiveConfig:()=>Kr,getActivePresetName:()=>To,getAllPresets:()=>_t,getPreset:()=>zt,getPresetNames:()=>Cc,getStarredPresets:()=>Fr,importPresets:()=>Yr,presetExists:()=>Ls,renamePreset:()=>Pc,switchToPreset:()=>jt,togglePresetStar:()=>Wr,updatePreset:()=>jr,validatePreset:()=>Rc});function Mc(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function fn(){return _.get(kc,Mc())}function ke(){return _.get(pn,[])}function Ut(t){_.set(pn,t)}function xo(){return _.get(gn,"")}function vo(t){_.set(gn,t||"")}function _t(){return ke()}function Cc(){return ke().map(e=>e.name)}function zt(t){return!t||typeof t!="string"?null:ke().find(s=>s.name===t)||null}function Ls(t){return!t||typeof t!="string"?!1:ke().some(s=>s.name===t)}function wo(t){let{name:e,description:s,apiConfig:o}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(Ls(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let a={name:r,description:s||"",apiConfig:{url:o?.url||"",apiKey:o?.apiKey||"",model:o?.model||"",useMainApi:o?.useMainApi??!0,stream:o?.stream??!1,max_tokens:o?.max_tokens||4096,temperature:o?.temperature??.7,top_p:o?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},n=ke();return n.push(a),Ut(n),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:a}}function jr(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ke(),o=s.findIndex(n=>n.name===t);if(o===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=s[o],a={...r,...e,name:r.name,updatedAt:Date.now()};return e.apiConfig&&(a.apiConfig={...r.apiConfig,...e.apiConfig}),s[o]=a,Ut(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:a}}function Ns(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ke(),s=e.findIndex(o=>o.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Ut(e),xo()===t&&vo(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Pc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!Ls(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Ls(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o=ke(),r=o.find(a=>a.name===t);return r&&(r.name=s,r.updatedAt=Date.now(),Ut(o),xo()===t&&vo(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Ic(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),o=zt(t);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Ls(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(o)),name:s,createdAt:Date.now(),updatedAt:Date.now()},a=ke();return a.push(r),Ut(a),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:r}}function Wr(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ke(),s=e.find(o=>o.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Ut(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Fr(){return ke().filter(e=>e.starred===!0)}function jt(t){if(!t)return vo(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=zt(t);return e?(vo(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function To(){return xo()}function Kr(){let t=xo();if(t){let s=zt(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:fn().apiConfig||{}}}function Hr(t=null){if(t){let s=zt(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=ke();return JSON.stringify(e,null,2)}function Yr(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(s)?s:[s];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=ke(),a=0;for(let n of o){if(!n.name||typeof n.name!="string"||!n.apiConfig||typeof n.apiConfig!="object")continue;let l=r.findIndex(i=>i.name===n.name);l>=0?e.overwrite&&(n.updatedAt=Date.now(),r[l]=n,a++):(n.createdAt=n.createdAt||Date.now(),n.updatedAt=Date.now(),r.push(n),a++)}return a>0&&Ut(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}function $c(t,e=""){let s=fn();return wo({name:t,description:e,apiConfig:s.apiConfig})}function Rc(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function qr(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=ke(),s=new Set(e.map(r=>r.name));if(!s.has(t))return t;let o=1;for(;s.has(`${t} (${o})`);)o++;return`${t} (${o})`}var kc,pn,gn,Bs=D(()=>{Oe();kc="settings",pn="api_presets",gn="current_preset"});function Wt(t){return String(t||"").trim()}var De,Ke,Gr=D(()=>{me();Se();Ds();Bs();De=null;Ke={id:"apiPresetPanel",render(t){let e=Kr(),s=e?.apiConfig||gt(),o=Wt(e?.presetName||To()),r=_t(),l=Fr().slice(0,8),i=l.length>0?l.map(u=>this._renderPresetItem(u)).join(""):"",c=De===null?o||"":Wt(De),d=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
                  <span class="yyt-select-value" data-value="${b(c)}">${b(d)}</span>
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
            
            ${i?`
            <div class="yyt-preset-list-compact">
              ${i}
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
        <button class="yyt-option-delete" data-action="delete" data-preset="${b(t.name)}" title="\u5220\u9664\u9884\u8BBE">
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
                   value="${b(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${g}-api-key" 
                     value="${b(t.apiKey||"")}" 
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
                     value="${b(t.model||"")}" 
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
    `},bindEvents(t,e){let s=$();!s||!O(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${g}-preset-dropdown`),o=s.find(".yyt-select-trigger"),r=s.find(".yyt-select-value"),a=()=>{let l=String(r.data("value")||"").trim();if(!l){De="",jt(""),Lt(t,gt(),g),t.find(".yyt-preset-item").removeClass("yyt-loaded"),x("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=zt(l);if(!i){x("error",`\u9884\u8BBE "${l}" \u4E0D\u5B58\u5728`);return}De=l,jt(l),Lt(t,i.apiConfig,g),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${l.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),x("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${l}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};o.on("click",function(l){l.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",l=>{if(e(l.target).closest(".yyt-option-star, .yyt-option-delete").length)return;let i=e(l.currentTarget),c=i.data("value"),d=i.find(".yyt-option-text").text();De=String(c||"").trim(),r.text(d).data("value",c),s.find(".yyt-select-option").removeClass("yyt-selected"),i.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${g}-load-preset`).on("click",()=>{a()}),s.find(".yyt-option-star").on("click",l=>{l.preventDefault(),l.stopPropagation();let i=e(l.currentTarget).data("preset");if(!i)return;let c=Wr(i);if(c.success){x("success",c.message);let d=t.closest(".yyt-api-manager").parent();d.length&&this.renderTo(d)}else x("error",c.message)}),s.find(".yyt-option-delete").on("click",l=>{l.preventDefault(),l.stopPropagation();let i=Wt(e(l.currentTarget).data("preset"));if(!i||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${i}" \u5417\uFF1F`))return;let c=Ns(i);if(x(c.success?"info":"error",c.message),!c.success)return;I.emit(M.PRESET_DELETED,{name:i}),Wt(De)===i&&(De=""),Wt(r.data("value"))===i&&r.text("-- \u5F53\u524D\u914D\u7F6E --").data("value","");let d=t.closest(".yyt-api-manager").parent();d.length&&this.renderTo(d)});let n=ut();e(n).on("click.yyt-dropdown",l=>{e(l.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let r=e(s.currentTarget).data("preset-name"),a=e(s.target).closest("[data-action]").data("action");if(a)switch(s.stopPropagation(),a){case"load":t.find(".yyt-select-value").text(r).data("value",r),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${r.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${g}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let n=Ns(r);if(x(n.success?"info":"error",n.message),n.success){I.emit(M.PRESET_DELETED,{name:r}),Wt(De)===r&&(De="");let l=t.closest(".yyt-api-manager").parent();l.length&&this.renderTo(l)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${g}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),o=t.find(`#${g}-custom-api-fields`);s?o.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):o.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${g}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${g}-api-key`),o=s.attr("type");s.attr("type",o==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${g}-load-models`).on("click",async()=>{let s=t.find(`#${g}-load-models`),o=t.find(`#${g}-model`),r=t.find(`#${g}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let a=St(t,g),n=await zr(a);if(n.length>0){r.empty(),n.forEach(i=>{r.append(`<option value="${b(i)}">${b(i)}</option>`)}),o.hide(),r.show();let l=o.val();l&&n.includes(l)&&r.val(l),r.off("change").on("change",function(){o.val(e(this).val())}),x("success",`\u5DF2\u52A0\u8F7D ${n.length} \u4E2A\u6A21\u578B`)}else x("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(a){x("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${a.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${g}-model`).on("focus",function(){let s=t.find(`#${g}-model-select`);e(this).show(),s.hide()}),t.find(`#${g}-save-api-config`).on("click",()=>{let s=St(t,g),o=Wt(To()),r=cs(s);if(!r.valid&&!s.useMainApi){x("error",r.errors.join(", "));return}if(o){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${o}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){ls(s),jt(""),De="",x("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let n=t.closest(".yyt-api-manager").parent();n.length&&this.renderTo(n);return}ls(s);let a=jr(o,{apiConfig:s});if(a.success){De=o,x("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${o}"`),jt(o),I.emit(M.PRESET_UPDATED,{name:o});let n=t.closest(".yyt-api-manager").parent();n.length&&this.renderTo(n)}else x("error",a.message);return}ls(s),x("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${g}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){jt(""),De="",ls({url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),x("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${g}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${g}-export-presets`).on("click",()=>{try{let s=Hr();yt(s,`youyou_toolkit_presets_${Date.now()}.json`),x("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){x("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${g}-import-presets`).on("click",()=>{t.find(`#${g}-import-file`).click()}),t.find(`#${g}-import-file`).on("change",async s=>{let o=s.target.files[0];if(o){try{let r=await pt(o),a=Yr(r,{overwrite:!0});if(x(a.success?"success":"error",a.message),a.imported>0){let n=t.closest(".yyt-api-manager").parent();n.length&&this.renderTo(n)}}catch(r){x("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let o=_t().map(d=>d.name),r=qr("\u65B0\u9884\u8BBE"),a=`
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
                     value="${b(r)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
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
    `;e(`#${g}-dialog-overlay`).remove(),t.append(a);let n=e(`#${g}-dialog-overlay`),l=e(`#${g}-dialog-preset-name`),i=e(`#${g}-dialog-preset-desc`);l.focus().select();let c=()=>n.remove();n.find(`#${g}-dialog-close, #${g}-dialog-cancel`).on("click",c),n.on("click",function(d){d.target===this&&c()}),n.find(`#${g}-dialog-save`).on("click",()=>{let d=l.val().trim(),u=i.val().trim();if(!d){x("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),l.focus();return}if(o.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Ns(d),I.emit(M.PRESET_DELETED,{name:d})}let f=St(t,g),y=wo({name:d,description:u,apiConfig:f});if(y.success){x("success",y.message),c(),I.emit(M.PRESET_CREATED,{preset:y.preset});let m=t.closest(".yyt-api-manager").parent();m.length&&this.renderTo(m)}else x("error",y.message)}),l.on("keypress",function(d){d.which===13&&n.find(`#${g}-dialog-save`).click()})},destroy(t){let e=$();!e||!O(t)||(t.off(),e(ut()).off("click.yyt-dropdown"))},getStyles(){return`
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
        background: rgba(251, 191, 36, 0.18);
        border-color: rgba(251, 191, 36, 0.26);
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Mn={};ie(Mn,{MESSAGE_MACROS:()=>kn,addTagRule:()=>ds,createRuleTemplate:()=>Tn,default:()=>Lc,deleteRulePreset:()=>En,deleteRuleTemplate:()=>_n,deleteTagRule:()=>ko,escapeRegex:()=>Ft,exportRulesConfig:()=>Io,extractComplexTag:()=>hn,extractCurlyBraceTag:()=>Zr,extractHtmlFormatTag:()=>vn,extractSimpleTag:()=>Qr,extractTagContent:()=>Kt,generateTagSuggestions:()=>Eo,getAllRulePresets:()=>Co,getAllRuleTemplates:()=>xn,getContentBlacklist:()=>Ht,getRuleTemplate:()=>wn,getTagRules:()=>ft,importRulesConfig:()=>$o,isValidTagName:()=>Xr,loadRulePreset:()=>Po,saveRulesAsPreset:()=>Mo,scanTextForTags:()=>_o,setContentBlacklist:()=>Us,setTagRules:()=>Ao,shouldSkipContent:()=>Jr,testRegex:()=>An,updateRuleTemplate:()=>Sn,updateTagRule:()=>us});function Oc(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Vr],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Pe(){return _.get(bn,Oc())}function rt(t){_.set(bn,t)}function So(){let t=Pe();return xe=t.ruleTemplates||[...Vr],se=t.tagRules||[],Me=t.contentBlacklist||[],{ruleTemplates:xe,tagRules:se,contentBlacklist:Me}}function Ft(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Jr(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(o=>{let r=o.trim().toLowerCase();return r&&s.includes(r)})}function Xr(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!Dc.includes(t.toLowerCase())}function Qr(t,e){if(!t||!e)return[];let s=[],o=Ft(e),r=new RegExp(`<${o}>([\\s\\S]*?)<\\/${o}>`,"gi");[...t.matchAll(r)].forEach(i=>{i[1]&&s.push(i[1].trim())});let n=(t.match(new RegExp(`<${o}>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return n>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${n-l} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function Zr(t,e){if(!t||!e)return[];let s=[],o=Ft(e),r=new RegExp(`\\{${o}\\|`,"gi"),a;for(;(a=r.exec(t))!==null;){let n=a.index,l=n+a[0].length,i=1,c=l;for(;c<t.length&&i>0;)t[c]==="{"?i++:t[c]==="}"&&i--,c++;if(i===0){let d=t.substring(l,c-1);d.trim()&&s.push(d.trim())}r.lastIndex=n+1}return s}function hn(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let o=s[0].trim(),r=s[1].trim(),a=r.match(/<\/(\w+)>/);if(!a)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let n=a[1],l=new RegExp(`${Ft(o)}([\\s\\S]*?)<\\/${n}>`,"gi"),i=[];return[...t.matchAll(l)].forEach(d=>{d[1]&&i.push(d[1].trim())}),i}function vn(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let o=s[1],r=[],a=new RegExp(`<${o}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${o}>`,"gi");[...t.matchAll(a)].forEach(c=>{c[1]&&r.push(c[1].trim())});let l=(t.match(new RegExp(`<${o}(?:\\s[^>]*)?>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return l>i&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${l-i} \u4E2A\u672A\u95ED\u5408\u7684 <${o}> \u6807\u7B7E`),r}function Kt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let o=e.filter(d=>d.type==="exclude"&&d.enabled),r=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),a=e.filter(d=>d.type==="regex_exclude"&&d.enabled),n=t;for(let d of o)try{let u=new RegExp(`<${Ft(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ft(d.value)}>`,"gi");n=n.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:u})}let l=[];if(r.length>0)for(let d of r){let u=[];try{if(d.type==="include")u.push(...Qr(n,d.value)),u.push(...Zr(n,d.value));else if(d.type==="regex_include"){let f=new RegExp(d.value,"gi");[...n.matchAll(f)].forEach(m=>{m[1]&&u.push(m[1])})}}catch(f){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:f})}u.forEach(f=>l.push(f.trim()))}else l.push(n);let i=[];for(let d of l){for(let u of a)try{let f=new RegExp(u.value,"gi");d=d.replace(f,"")}catch(f){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:f})}Jr(d,s)||i.push(d)}return i.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function _o(t,e={}){let s=performance.now(),{chunkSize:o=5e4,maxTags:r=100,timeoutMs:a=5e3}=e,n=new Set,l=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,i=0,c=0;for(let u=0;u<t.length;u+=o){let f=t.slice(u,Math.min(u+o,t.length));if(c++,i+=f.length,performance.now()-s>a){console.warn(`[YouYouToolkit] Tag scanning timed out after ${a}ms`);break}let y;for(;(y=l.exec(f))!==null&&n.size<r;){let m=(y[1]||y[2]).toLowerCase();Xr(m)&&n.add(m)}if(n.size>=r)break;c%5===0&&await new Promise(m=>setTimeout(m,0))}let d=performance.now();return{tags:Array.from(n).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:i,totalChars:t.length,chunkCount:c,tagsFound:n.size}}}function Eo(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function xn(){return xe.length===0&&So(),xe}function wn(t){return xe.find(e=>e.id===t)}function Tn(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return xe.push(e),ea(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Sn(t,e){let s=xe.findIndex(o=>o.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(xe[s]={...xe[s],...e,updatedAt:new Date().toISOString()},ea(),{success:!0,template:xe[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function _n(t){let e=xe.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(xe.splice(e,1),ea(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function ea(){let t=Pe();t.ruleTemplates=xe,rt(t)}function ft(){return se||So(),se}function Ao(t){se=t||[];let e=Pe();e.tagRules=se,rt(e)}function ds(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};se.push(e);let s=Pe();return s.tagRules=se,rt(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function us(t,e){if(t<0||t>=se.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};se[t]={...se[t],...e};let s=Pe();return s.tagRules=se,rt(s),{success:!0,rule:se[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function ko(t){if(t<0||t>=se.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};se.splice(t,1);let e=Pe();return e.tagRules=se,rt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Ht(){return Me||So(),Me}function Us(t){Me=t||[];let e=Pe();e.contentBlacklist=Me,rt(e)}function Mo(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Pe();s.tagRulePresets||(s.tagRulePresets={});let o=`preset-${Date.now()}`;return s.tagRulePresets[o]={id:o,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(se)),blacklist:JSON.parse(JSON.stringify(Me)),createdAt:new Date().toISOString()},rt(s),{success:!0,preset:s.tagRulePresets[o],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Co(){let e=Pe().tagRulePresets||{};return Object.values(e)}function Po(t){let e=Pe(),o=(e.tagRulePresets||{})[t];return o?(se=JSON.parse(JSON.stringify(o.rules||[])),Me=JSON.parse(JSON.stringify(o.blacklist||[])),e.tagRules=se,e.contentBlacklist=Me,rt(e),{success:!0,preset:o,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function En(t){let e=Pe(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,rt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Io(){return JSON.stringify({tagRules:se,contentBlacklist:Me,ruleTemplates:xe,tagRulePresets:Pe().tagRulePresets||{}},null,2)}function $o(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)se=s.tagRules||[],Me=s.contentBlacklist||[],xe=s.ruleTemplates||Vr;else if(s.tagRules&&se.push(...s.tagRules),s.contentBlacklist){let r=new Set(Me.map(a=>a.toLowerCase()));s.contentBlacklist.forEach(a=>{r.has(a.toLowerCase())||Me.push(a)})}let o=Pe();return o.tagRules=se,o.contentBlacklist=Me,o.ruleTemplates=xe,s.tagRulePresets&&(o.tagRulePresets={...o.tagRulePresets||{},...s.tagRulePresets}),rt(o),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function An(t,e,s="g",o=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(t,s),a=[];if(s.includes("g")){let n;for(;(n=r.exec(e))!==null;)n.length>1?a.push({fullMatch:n[0],groups:n.slice(1),index:n.index,extracted:n[o]||n[1]||n[0]}):a.push({fullMatch:n[0],groups:[],index:n.index,extracted:n[0]})}else{let n=r.exec(e);n&&a.push({fullMatch:n[0],groups:n.length>1?n.slice(1):[],index:n.index,extracted:n.length>1?n[o]||n[1]:n[0]})}return{success:!0,matches:a,count:a.length,extracted:a.map(n=>n.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var bn,Dc,Vr,xe,se,Me,kn,Lc,Ro=D(()=>{Oe();bn="settings";Dc=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Vr=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],xe=[],se=[],Me=[];kn={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};So();Lc={extractTagContent:Kt,extractSimpleTag:Qr,extractCurlyBraceTag:Zr,extractComplexTag:hn,extractHtmlFormatTag:vn,escapeRegex:Ft,shouldSkipContent:Jr,isValidTagName:Xr,scanTextForTags:_o,generateTagSuggestions:Eo,getAllRuleTemplates:xn,getRuleTemplate:wn,createRuleTemplate:Tn,updateRuleTemplate:Sn,deleteRuleTemplate:_n,getTagRules:ft,setTagRules:Ao,addTagRule:ds,updateTagRule:us,deleteTagRule:ko,getContentBlacklist:Ht,setContentBlacklist:Us,saveRulesAsPreset:Mo,getAllRulePresets:Co,loadRulePreset:Po,deleteRulePreset:En,exportRulesConfig:Io,importRulesConfig:$o,testRegex:An,MESSAGE_MACROS:kn}});var He,ta=D(()=>{me();Se();Ro();He={id:"regexExtractPanel",render(t){let e=ft(),s=Ht(),o=Co();return`
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
    `},_renderRulesEditor(t,e,s){let o=t.length>0?t.map((a,n)=>this._renderRuleItem(a,n)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=s.length>0?s.map(a=>`<option value="${a.id}">${b(a.name)}</option>`).join(""):"";return`
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
    `},bindEvents(t,e){let s=$();!s||!O(t)||(t.off(".yytRegex"),this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s),Te(t,{namespace:"yytRegexSelect",selectors:[`#${g}-rule-preset-select`]}))},_bindRuleEditorEvents(t,e){t.on("change.yytRegex",".yyt-rule-type",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val();us(o,{type:r}),x("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.on("change.yytRegex",".yyt-rule-value",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val().trim();us(o,{value:r})}),t.on("change.yytRegex",".yyt-rule-enabled",function(){let o=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).is(":checked");us(o,{enabled:r}),x("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.on("click.yytRegex",".yyt-rule-delete",s=>{let r=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(ko(r),this.renderTo(t),x("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click.yytRegex",`#${g}-add-rule`,()=>{ds({type:"include",value:"",enabled:!0}),this.renderTo(t),x("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.on("click.yytRegex",`#${g}-scan-tags`,async()=>{let s=t.find(`#${g}-scan-tags`),o=t.find(`#${g}-test-input`).val();if(!o||!o.trim()){x("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await _o(o,{maxTags:50,timeoutMs:3e3}),{suggestions:a,stats:n}=Eo(r,25);if(a.length===0){x("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${g}-tag-suggestions-container`).hide();return}let l=t.find(`#${g}-tag-list`);t.find(`#${g}-tag-scan-stats`).text(`${n.finalCount}/${n.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),l.empty(),a.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${b(c)}</button>`);d.on("click",()=>{if(ft().some(y=>y.type==="include"&&y.value===c)){x("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}ds({type:"include",value:c,enabled:!0}),this.renderTo(t),x("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),l.append(d)}),t.find(`#${g}-tag-suggestions-container`).show(),x("success",`\u53D1\u73B0 ${a.length} \u4E2A\u6807\u7B7E`)}catch(r){x("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.on("click.yytRegex",`#${g}-add-exclude-cot`,()=>{let s=ft(),o="<!--[\\s\\S]*?-->";if(s.some(a=>a.type==="regex_exclude"&&a.value===o)){x("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}ds({type:"regex_exclude",value:o,enabled:!0}),this.renderTo(t),x("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.on("change.yytRegex",`#${g}-content-blacklist`,function(){let o=e(this).val().split(",").map(r=>r.trim()).filter(r=>r);Us(o),x("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${o.length} \u4E2A\u5173\u952E\u8BCD`)}),t.on("click.yytRegex",`#${g}-show-examples`,()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.on("click.yytRegex",`#${g}-load-rule-preset`,()=>{let s=t.find(`#${g}-rule-preset-select`).val();if(!s){x("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let o=Po(s);o.success?(this.renderTo(t),x("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${o.preset.name}`),I.emit(M.REGEX_PRESET_LOADED,{preset:o.preset})):x("error",o.message)}),t.on("click.yytRegex",`#${g}-save-rule-preset`,()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let o=Mo(s.trim());o.success?(this.renderTo(t),x("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):x("error",o.message)})},_bindTestEvents(t,e){t.on("click.yytRegex",`#${g}-test-extract`,()=>{let s=t.find(`#${g}-test-input`).val();if(!s||!s.trim()){x("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let o=ft(),r=Ht(),a=Kt(s,o,r),n=t.find(`#${g}-test-result-container`),l=t.find(`#${g}-test-result`);n.show(),!a||!a.trim()?(l.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),x("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(l.html(`<pre class="yyt-code-block">${b(a)}</pre>`),x("success","\u63D0\u53D6\u5B8C\u6210"),I.emit(M.REGEX_EXTRACTED,{result:a}))}),t.on("click.yytRegex",`#${g}-test-clear`,()=>{t.find(`#${g}-test-input`).val(""),t.find(`#${g}-test-result-container`).hide()})},_bindFileEvents(t,e){t.on("click.yytRegex",`#${g}-import-rules`,()=>{t.find(`#${g}-import-rules-file`).click()}),t.on("change.yytRegex",`#${g}-import-rules-file`,async s=>{let o=s.target.files[0];if(o){try{let r=await pt(o),a=$o(r,{overwrite:!0});a.success?(this.renderTo(t),x("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):x("error",a.message)}catch(r){x("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.on("click.yytRegex",`#${g}-export-rules`,()=>{try{let s=Io();yt(s,`youyou_toolkit_rules_${Date.now()}.json`),x("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){x("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytRegex",`#${g}-reset-rules`,()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(Ao([]),Us([]),this.renderTo(t),x("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!$()||!O(t)||(ye(t,"yytRegexSelect"),t.off(".yytRegex"))},getStyles(){return`
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

      .yyt-regex-panel .yyt-input,
      .yyt-regex-panel .yyt-select,
      .yyt-regex-panel .yyt-textarea {
        color: var(--yyt-text);
      }

      .yyt-regex-panel .yyt-input,
      .yyt-regex-panel .yyt-select,
      .yyt-regex-panel .yyt-textarea:not(.yyt-code-textarea),
      .yyt-regex-panel #${g}-test-input {
        background: var(--yyt-control-bg);
        color: var(--yyt-text);
        border-color: var(--yyt-control-border);
        box-shadow: var(--yyt-control-shadow);
      }

      .yyt-regex-panel .yyt-input:hover,
      .yyt-regex-panel .yyt-select:hover,
      .yyt-regex-panel .yyt-textarea:not(.yyt-code-textarea):hover,
      .yyt-regex-panel #${g}-test-input:hover {
        background: var(--yyt-control-bg-hover);
        border-color: var(--yyt-control-border-hover);
        box-shadow: var(--yyt-control-shadow-hover);
      }

      .yyt-regex-panel .yyt-input:focus,
      .yyt-regex-panel .yyt-select:focus,
      .yyt-regex-panel .yyt-textarea:not(.yyt-code-textarea):focus,
      .yyt-regex-panel .yyt-input:focus-visible,
      .yyt-regex-panel .yyt-select:focus-visible,
      .yyt-regex-panel .yyt-textarea:not(.yyt-code-textarea):focus-visible,
      .yyt-regex-panel #${g}-test-input:focus,
      .yyt-regex-panel #${g}-test-input:focus-visible {
        background: var(--yyt-control-bg-focus);
        color: var(--yyt-text);
        border-color: var(--yyt-control-border-focus);
        box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Ln={};ie(Ln,{createDefaultToolDefinition:()=>Yt,default:()=>zc,deleteTool:()=>Lo,deleteToolPreset:()=>Rn,exportTools:()=>Uo,getAllTools:()=>Et,getCurrentToolPreset:()=>On,getTool:()=>ys,getToolPresets:()=>No,importTools:()=>zo,normalizeToolDefinitionToRuntimeConfig:()=>js,resetTools:()=>jo,saveTool:()=>Do,saveToolPreset:()=>$n,setCurrentToolPreset:()=>Dn,setToolEnabled:()=>Bo});function Nc(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,s])=>[e,Yt({...s||{},id:e})]))}function zs(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function sa(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function Cn(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>=0?s:e}function Pn(t={}){return{enabled:t?.enabled===!0,settleMs:Cn(t?.settleMs,1200),cooldownMs:Cn(t?.cooldownMs,5e3)}}function In(t={}){return{enabled:t?.enabled===!0,selected:zs(t?.selected)}}function Bc(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function Uc(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let o=Bc(e?.config?.messages||[]);return o||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Yt(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...Le,...t,id:t?.id||Le.id,icon:t?.icon||Le.icon,order:Number.isFinite(t?.order)?t.order:Le.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Le.promptTemplate,extractTags:zs(t?.extractTags),config:{execution:{...Le.config.execution,...s.execution||{},timeout:sa(s?.execution?.timeout,Le.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||Le.config.execution.retries)},api:{...Le.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...Le.config.context,...s.context||{},depth:sa(s?.context?.depth,Le.config.context.depth),includeTags:zs(s?.context?.includeTags),excludeTags:zs(s?.context?.excludeTags)},automation:Pn(s?.automation),worldbooks:In(s?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Le.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function js(t,e={},s={}){let o=Yt({...e,id:t||e?.id||""}),r=zs(o?.extractTags?.length?o.extractTags:o?.config?.context?.includeTags),a=String(e?.output?.apiPreset||o?.config?.api?.preset||"").trim(),n=Uc(t,o),l=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:o.id||t,name:o.name||t,icon:o.icon||"fa-screwdriver-wrench",description:o.description||"",enabled:o.enabled!==!1,order:Number.isFinite(o.order)?o.order:100,bypass:{enabled:o?.config?.api?.useBypass===!0&&!!o?.config?.api?.bypassPreset,presetId:o?.config?.api?.bypassPreset||""},output:{mode:l,apiPreset:a,overwrite:!0,enabled:!0},automation:Pn(o?.config?.automation),worldbooks:In(o?.config?.worldbooks),extraction:{enabled:!0,maxMessages:sa(o?.config?.context?.depth,5),selectors:r},promptTemplate:n,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:a,extractTags:r,isCustom:!0,category:o.category||"utility",metadata:{...o.metadata||{}}}}function Et(){let t=Z.get(ae.TOOLS),e=Nc(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&Z.set(ae.TOOLS,e),{...Oo,...e}}function ys(t){return Et()[t]||null}function Do(t,e){if(!t||!e)return!1;let s=Z.get(ae.TOOLS)||{},o=!s[t]&&!Oo[t],r=Yt({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=r,Z.set(ae.TOOLS,s),I.emit(o?M.TOOL_REGISTERED:M.TOOL_UPDATED,{toolId:t,tool:r}),!0}function Lo(t){let e=Z.get(ae.TOOLS)||{};return!e[t]&&!Oo[t]||Oo[t]?!1:(delete e[t],Z.set(ae.TOOLS,e),I.emit(M.TOOL_UNREGISTERED,{toolId:t}),!0)}function No(){return Z.get(ae.PRESETS)||{}}function $n(t,e){if(!t||!e)return!1;let s=No(),o=!s[t];return s[t]={...e,name:t,updatedAt:new Date().toISOString()},Z.set(ae.PRESETS,s),I.emit(o?M.PRESET_CREATED:M.PRESET_UPDATED,{type:"tool",presetName:t,preset:s[t]}),!0}function Rn(t){let e=No();return e[t]?(delete e[t],Z.set(ae.PRESETS,e),I.emit(M.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function On(){return Z.get(ae.CURRENT_PRESET)||""}function Dn(t){return Z.set(ae.CURRENT_PRESET,t||""),I.emit(M.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function Bo(t,e){let s=ys(t);if(!s)return!1;let o=Z.get(ae.TOOLS)||{};return o[t]=Yt({...s,id:t,enabled:e,metadata:{...s?.metadata||{},createdAt:s?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),Z.set(ae.TOOLS,o),I.emit(e?M.TOOL_ENABLED:M.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Uo(){let t=Z.get(ae.TOOLS)||{},e=Z.get(ae.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function zo(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,o=JSON.parse(t);if(!o||typeof o!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=s?{}:Z.get(ae.TOOLS)||{},a=s?{}:Z.get(ae.PRESETS)||{},n=0,l=0;if(o.tools&&typeof o.tools=="object"){for(let[i,c]of Object.entries(o.tools))!c||typeof c!="object"||(r[i]=Yt({...c,id:i}),n+=1);Z.set(ae.TOOLS,r)}if(o.presets&&typeof o.presets=="object"){for(let[i,c]of Object.entries(o.presets))!c||typeof c!="object"||(a[i]={...c,name:i,updatedAt:new Date().toISOString()},l+=1);Z.set(ae.PRESETS,a)}return{success:!0,toolsImported:n,presetsImported:l,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u5DE5\u5177\u548C ${l} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function jo(){Z.remove(ae.TOOLS),Z.remove(ae.PRESETS),Z.remove(ae.CURRENT_PRESET)}var Le,Oo,ae,zc,Wo=D(()=>{Oe();me();Le={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Oo={},ae={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};zc={getAllTools:Et,getTool:ys,saveTool:Do,deleteTool:Lo,setToolEnabled:Bo,exportTools:Uo,importTools:zo,resetTools:jo,getToolPresets:No,saveToolPreset:$n,deleteToolPreset:Rn,getCurrentToolPreset:On,setCurrentToolPreset:Dn,createDefaultToolDefinition:Yt,normalizeToolDefinitionToRuntimeConfig:js}});var ti={};ie(ti,{TOOL_CATEGORIES:()=>Nn,TOOL_REGISTRY:()=>ps,appendToolRuntimeHistory:()=>Vn,clearToolApiPreset:()=>Yn,default:()=>Gc,ensureToolRuntimeConfig:()=>Fo,getAllDefaultToolConfigs:()=>Xn,getAllToolApiBindings:()=>qn,getAllToolFullConfigs:()=>Ys,getEnabledTools:()=>Qn,getToolApiPreset:()=>ia,getToolBaseConfig:()=>gs,getToolConfig:()=>Ks,getToolFullConfig:()=>Q,getToolList:()=>Wn,getToolSubTabs:()=>Fn,getToolWindowState:()=>ei,hasTool:()=>na,onPresetDeleted:()=>Gn,patchToolRuntime:()=>Hs,registerTool:()=>zn,resetToolConfig:()=>Jn,resetToolRegistry:()=>Kn,saveToolConfig:()=>Be,saveToolWindowState:()=>Zn,setToolApiPreset:()=>Hn,setToolApiPresetConfig:()=>Hc,setToolBypassConfig:()=>Yc,setToolOutputMode:()=>Kc,setToolPromptTemplate:()=>qc,unregisterTool:()=>jn,updateToolRuntime:()=>la});function Ws(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function jc(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Bn(){let t=Et()||{};return Object.entries(t).filter(([e])=>!Fs[e]).map(([e,s])=>[e,s||{}])}function oa(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Un(){let t=Array.isArray(ps.tools?.subTabs)?ps.tools.subTabs.map((s,o)=>({...s,order:Number.isFinite(s?.order)?s.order:o,toolKind:oa(s),toolGroupLabel:oa(s)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Bn().map(([s,o],r)=>{let a=js(s,o),n=oa(a);return{id:s,name:a.name||s,icon:a.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(a.order)?a.order:100+r,isCustom:!0,description:a.description||"",toolKind:n,toolGroupLabel:n==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((s,o)=>(s.order??0)-(o.order??0))}function Wc(t,e={}){let s=js(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:Ws(s.runtime)}}function aa(t){let e=Fs[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:Ws(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let o=(Et()||{})[t]||null;return o?Wc(t,o):Ks(t)}function gs(t){let e=aa(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Fc(t,e={},s=""){if(!t)return null;let o={...t,...e,id:t.id||e.id};o.output={...t.output||{},...e.output||{}},o.automation={enabled:t?.automation?.enabled===!0||e?.automation?.enabled===!0,settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},o.bypass={...t.bypass||{},...e.bypass||{}},o.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},o.runtime=Ws({...t.runtime||{},...e.runtime||{}}),o.extraction={...t.extraction||{},...e.extraction||{}},o.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let r=e?.output?.apiPreset||e?.apiPreset||o.output?.apiPreset||o.apiPreset||s||"";return o.output={...o.output||{},apiPreset:r},o.apiPreset=r,(!Array.isArray(o.extraction.selectors)||o.extraction.selectors.length===0)&&Array.isArray(o.extractTags)&&o.extractTags.length>0&&(o.extraction.selectors=[...o.extractTags]),(!Array.isArray(o.extractTags)||o.extractTags.length===0)&&(o.extractTags=Array.isArray(o.extraction.selectors)?[...o.extraction.selectors]:[]),t.isCustom?o.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?o.enabled=e.enabled:o.enabled=t.enabled!==!1,o}function zn(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let o of s)if(!e[o])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${o}`),!1;return at[t]={id:t,...e,order:e.order??Object.keys(at).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function jn(t){return at[t]?(delete at[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Wn(t=!0){let e=Object.values(at).map(s=>s.id==="tools"?{...s,subTabs:Un()}:s);return t?e.sort((s,o)=>(s.order??0)-(o.order??0)):e}function Ks(t){return t==="tools"&&at[t]?{...at[t],subTabs:Un()}:at[t]||null}function na(t){return!!at[t]}function Fn(t){let e=Ks(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Kn(){at={...ps},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Hn(t,e){if(!na(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=_.get(Ne)||{};return s[t]=e||"",_.set(Ne,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function ia(t){return(_.get(Ne)||{})[t]||""}function Yn(t){let e=_.get(Ne)||{};delete e[t],_.set(Ne,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function qn(){return _.get(Ne)||{}}function Gn(t){let e=_.get(Ne)||{},s=!1;for(let o in e)e[o]===t&&(e[o]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${o}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&_.set(Ne,e)}function Q(t){let e=aa(t);if(!e)return Ks(t);let o=(_.get(qt)||{})[t]||{},r=ia(t);return Fc({...e,id:t},o,r)}function Fo(t){if(!t)return!1;let e=aa(t);if(!e)return!1;let s=_.get(qt)||{};if(s[t])return!0;let o={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};s[t]=o,_.set(qt,s);let r=_.get(Ne)||{};return r[t]=o.output?.apiPreset||o.apiPreset||"",_.set(Ne,r),I.emit(M.TOOL_UPDATED,{toolId:t,config:o}),!0}function Be(t,e,s={}){if(!t||!Q(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:o=!0}=s,r=_.get(qt)||{},a=_.get(Ne)||{},n=e?.output?.apiPreset??e?.apiPreset??"",l=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return r[t]={},l.forEach(i=>{if(e[i]!==void 0){if(i==="output"&&e.output){r[t][i]={...e.output,apiPreset:n};return}if(i==="apiPreset"){r[t][i]=n;return}r[t][i]=e[i]}}),r[t].apiPreset===void 0&&(r[t].apiPreset=n),!r[t].output&&e.output!==void 0&&(r[t].output={...e.output||{},apiPreset:n}),_.set(qt,r),a[t]=n,_.set(Ne,a),o&&I.emit(M.TOOL_UPDATED,{toolId:t,config:r[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Kc(t,e){let s=Q(t);return s?Be(t,{...s,output:{...s.output,mode:e}}):!1}function Hc(t,e){let s=Q(t);return s?Be(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function Yc(t,e){let s=Q(t);return s?Be(t,{...s,bypass:{...s.bypass,...e}}):!1}function qc(t,e){let s=Q(t);return s?Be(t,{...s,promptTemplate:e}):!1}function Hs(t,e,s={}){let o=Q(t);if(!o)return!1;let{touchLastRunAt:r=!1,emitEvent:a=!1}=s,n=Ws({...o.runtime||{},...e||{}});return r&&(n.lastRunAt=Date.now()),Be(t,{...o,runtime:n},{emitEvent:a})}function Vn(t,e,s={},o={}){let r=Q(t);if(!r)return!1;let{limit:a=10,emitEvent:n=!1}=o,l=Ws(r.runtime||{}),i="recentWritebackHistory",c={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return l[i]=jc([...Array.isArray(l[i])?l[i]:[],c],a),c?.traceId&&(l.lastTraceId=c.traceId),Be(t,{...r,runtime:l},{emitEvent:n})}function la(t,e){return Hs(t,e,{touchLastRunAt:!0,emitEvent:!0})}function Jn(t){if(!t||!Fs[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=_.get(qt)||{};return delete e[t],_.set(qt,e),I.emit(M.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Xn(){return{...Fs}}function Ys(){let t=new Set([...Object.keys(Fs),...Bn().map(([e])=>e)]);return Array.from(t).map(e=>Q(e)).filter(Boolean)}function Qn(){return Ys().filter(t=>t&&t.enabled)}function Zn(t,e){let s=_.get(ra)||{};s[t]={...e,updatedAt:Date.now()},_.set(ra,s)}function ei(t){return(_.get(ra)||{})[t]||null}var qt,Ne,ra,Fs,ps,Nn,at,Gc,At=D(()=>{Oe();me();Wo();qt="tool_configs",Ne="tool_api_bindings",ra="tool_window_states";Fs={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},ps={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7}},Nn={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},at={...ps};Gc={TOOL_REGISTRY:ps,TOOL_CATEGORIES:Nn,registerTool:zn,unregisterTool:jn,getToolList:Wn,getToolConfig:Ks,hasTool:na,getToolSubTabs:Fn,resetToolRegistry:Kn,setToolApiPreset:Hn,getToolApiPreset:ia,clearToolApiPreset:Yn,getAllToolApiBindings:qn,onPresetDeleted:Gn,saveToolWindowState:Zn,getToolWindowState:ei,getToolBaseConfig:gs,ensureToolRuntimeConfig:Fo,getToolFullConfig:Q,patchToolRuntime:Hs,appendToolRuntimeHistory:Vn,saveToolConfig:Be,resetToolConfig:Jn,getAllDefaultToolConfigs:Xn,getAllToolFullConfigs:Ys,getEnabledTools:Qn}});var Ye,ca=D(()=>{Se();Wo();At();Ye={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){x("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=Et(),s=Object.entries(e),o=s.filter(([,r])=>r?.enabled!==!1).length;return`
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
      `},bindEvents(t,e){let s=$();!s||!O(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",s=>{let o=e(s.currentTarget).closest(".yyt-tool-item"),r=o.data("tool-id"),a=e(s.currentTarget).is(":checked");Bo(r,a),o.toggleClass("yyt-enabled",a).toggleClass("yyt-disabled",!a),x("info",a?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="config"]',s=>{let o=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(o)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="edit"]',s=>{let o=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,o)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="delete"]',s=>{let o=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),r=ys(o);if(!o||!r||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${r.name}\u201D\u5417\uFF1F`))return;if(!Lo(o)){x("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),x("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async s=>{let o=s.target.files[0];if(o){try{let r=await pt(o),a=zo(r,{overwrite:!1});x(a.success?"success":"error",a.message),a.success&&this.renderTo(t)}catch(r){x("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let s=Uo();yt(s,`youyou_toolkit_tools_${Date.now()}.json`),x("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){x("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(jo(),this.renderTo(t),x("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let o=s?ys(s):null,r=!!o,a=`
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
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(a);let n=e("#yyt-tool-dialog-overlay");Te(n,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let l=()=>{ye(n,"yytToolManageDialogSelect"),n.remove()};n.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",l),n.on("click",function(i){i.target===this&&l()}),n.find("#yyt-tool-dialog-save").on("click",()=>{let i=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),u=parseInt(e("#yyt-tool-timeout").val())||6e4,f=parseInt(e("#yyt-tool-retries").val())||3;if(!i){x("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let y=s||`tool_${Date.now()}`;if(!Do(y,{name:i,category:c,description:d,promptTemplate:o?.promptTemplate||"",extractTags:Array.isArray(o?.extractTags)?o.extractTags:[],config:{execution:{timeout:u,retries:f},api:o?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(o?.config?.messages)?o.config.messages:[],context:{depth:o?.config?.context?.depth||3,includeTags:Array.isArray(o?.config?.context?.includeTags)?o.config.context.includeTags:[],excludeTags:Array.isArray(o?.config?.context?.excludeTags)?o.config.context.excludeTags:[]},worldbooks:{enabled:o?.config?.worldbooks?.enabled===!0,selected:Array.isArray(o?.config?.worldbooks?.selected)?o.config.worldbooks.selected:[]}},enabled:o?.enabled!==!1})){x("error",r?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Fo(y),l(),this.renderTo(t),x("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),r||this._openToolConfig(y)})},destroy(t){let e=$();!e||!O(t)||(ye(e("#yyt-tool-dialog-overlay"),"yytToolManageDialogSelect"),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});function fs(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Ko(){return fs()?.SillyTavern||null}function X(t){return t==null?"":String(t).trim()}function Vc(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s.trim();return""}function Jc(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function si(t=""){let e=String(t||"").trim();if(!e)return"empty";let s=0;for(let o=0;o<e.length;o+=1)s=(s<<5)-s+e.charCodeAt(o),s|=0;return`fp_${Math.abs(s).toString(36)}`}function oi(t={}){let e=X(t.chatId)||"chat_default",s=X(t.messageId)||"latest";return`${e}::${s}`}function ri(t={}){let e=oi(t),s=X(t.effectiveSwipeId)||"swipe:current",o=X(t.assistantContentFingerprint)||"empty";return`${e}::${s}::${o}`}function Xc(t={}){let e=ri(t),s=X(t.eventType)||"MANUAL",o=X(t.traceId)||ai("manual");return`${e}::${s}::${o}`}function ai(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function ni(){let t=Ko();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function ii(t=[]){let e=[],s=null,o=null;return t.forEach((r,a)=>{let n=Jc(r),l=Vc(r);if(!l)return;let i=X(r?.messageId??r?.message_id??r?.id??r?.mid??r?.mesid??r?.chat_index??a),c=X(r?.swipe_id??r?.swipeId??r?.swipe??""),d={role:n,content:l,sourceId:i,swipeId:c,raw:r,index:a};e.push(d),n==="user"&&(s=d),n==="assistant"&&(o=d)}),{messages:e,lastUserMessage:s,lastAiMessage:o}}function Qc(t,e,s){return X(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??s?.id??"chat_default")||"chat_default"}async function da(){let t=Ko();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let o=s[e];return{id:e,name:o?.name||"",description:o?.description||"",personality:o?.personality||"",scenario:o?.scenario||"",firstMes:o?.first_mes||"",mesExample:o?.mes_example||""}}}catch(e){console.error("[YouYouToolkit:ExecutionContext] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function Zc(t="",e=null){let s=String(t||""),o=e?.YouYouToolkit_toolOutputs;return o&&typeof o=="object"&&Object.values(o).forEach(r=>{let a=String(r?.blockText||r?.content||"").trim();a&&s.includes(a)&&(s=s.replace(a,"").trimEnd())}),s.trim()}function ed(t,e={}){let s=Array.isArray(t?.messages)?t.messages:[],o=X(e.messageId),r=X(e.swipeId);if(!o)return t?.lastAiMessage||null;let a=s.filter(l=>l.role==="assistant"),n=a.find(l=>l.sourceId!==o?!1:r?X(l.swipeId)===r:!0);return n||a.find(l=>l.sourceId===o)||null}function li({api:t,stContext:e,character:s,conversation:o,targetAssistantMessage:r,runSource:a="MANUAL"}={}){let n=o?.messages||[],l=o?.lastUserMessage||null,i=X(r?.sourceId)||"",c=X(r?.swipeId)||"swipe:current",d=r?.content||"",u=Zc(d,r?.raw||null),f=si(d),y=si(u),m=Qc(t,e,s),v=ai(String(a||"manual").toLowerCase()),w=oi({chatId:m,messageId:i}),A=ri({chatId:m,messageId:i,effectiveSwipeId:c,assistantContentFingerprint:y});return{startedAt:Date.now(),runSource:a,traceId:v,chatId:m,messageId:i,confirmedAssistantMessageId:i,slotBindingKey:w,slotRevisionKey:A,slotTransactionId:Xc({chatId:m,messageId:i,effectiveSwipeId:c,assistantContentFingerprint:y,eventType:a,traceId:v}),executionKey:A,lastAiMessage:d,assistantContentFingerprint:f,assistantBaseText:u,assistantBaseFingerprint:y,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:i,sourceSwipeId:c,lastUserMessage:l?.content||"",userMessage:l?.content||"",targetAssistantMessage:r,chatMessages:n,characterCard:s,chatHistory:n,input:{userMessage:l?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:n.length||0}},config:{},status:"pending"}}async function Gt({runSource:t="MANUAL"}={}){let e=Ko(),s=e?.getContext?.()||null,o=await da(),r=ni(),a=ii(r),n=a?.lastAiMessage||null;return li({api:e,stContext:s,character:o,conversation:a,targetAssistantMessage:n,runSource:t})}async function qs({messageId:t,swipeId:e="",runSource:s="AUTO"}={}){let o=Ko(),r=o?.getContext?.()||null,a=await da(),n=ni(),l=ii(n),i=ed(l,{messageId:t,swipeId:e});return li({api:o,stContext:r,character:a,conversation:l,targetAssistantMessage:i,runSource:s})}var ms=D(()=>{});function ci(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return fs()?.TavernHelper||null}function td(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return fs()?.SillyTavern||null}function Gs(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function ua(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(s=>{let o=t[s];Array.isArray(o)?e[s]=o.map(r=>typeof r=="string"?r:r&&typeof r=="object"?r.name||r.id||r.title||"[object]":String(r??"")):o&&typeof o=="object"?e[s]="[object]":e[s]=o}),e}return t}function sd(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let s=[t.comment,t.key,t.keysecondary,t.text].map(o=>String(o||"").trim()).find(Boolean);return s&&s!==e?`## ${s}
${e}`:e}function Vs(){return Array.isArray(ya)?[...ya]:[]}function di(){return pa?{...pa}:null}async function od(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Gs([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return console.warn("[ToolWorldbookService] \u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function rd(t,e){if(t&&typeof t.getLorebooks=="function")try{let s=Gs(await Promise.resolve(t.getLorebooks()));if(s.length>0)return s}catch(s){console.warn("[ToolWorldbookService] \u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}if(e&&typeof e.getWorldBooks=="function")try{let s=await Promise.resolve(e.getWorldBooks()),o=Gs(Array.isArray(s)?s.map(r=>r?.name??r):[]);if(o.length>0)return o}catch(s){console.warn("[ToolWorldbookService] \u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}return[]}async function ui(){let t=ci(),e=td(),s={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!fs()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!fs()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{s.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?ua(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(n){s.errors.push(`getLorebooks: ${n?.message||n}`)}try{s.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?ua(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(n){s.errors.push(`getCharLorebooks: ${n?.message||n}`)}try{s.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?ua(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(n){s.errors.push(`getWorldBooks: ${n?.message||n}`)}let o=await od(t),r=await rd(t,e),a=Gs([...o,...r]);return s.characterWorldbooks=[...o],s.allWorldbooks=[...r],s.combinedWorldbooks=[...a],pa=s,ya=a,[...a]}async function yi(t){let e=Gs(t?.worldbooks?.selected);if(t?.worldbooks?.enabled!==!0||e.length===0)return"";let s=ci();if(!s||typeof s.getLorebookEntries!="function")return console.warn("[ToolWorldbookService] TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let o=[];for(let r of e)try{let a=await s.getLorebookEntries(r),l=(Array.isArray(a)?a.filter(i=>i?.enabled!==!1):[]).map(sd).filter(Boolean).join(`

`);l&&o.push(`[\u4E16\u754C\u4E66\uFF1A${r}]
${l}`)}catch(a){console.warn(`[ToolWorldbookService] \u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${r}`,a)}return o.join(`

`)}var ya,pa,ga=D(()=>{ms();ya=[],pa=null});var pi={};ie(pi,{BypassManager:()=>Ho,DEFAULT_BYPASS_PRESETS:()=>bt,addMessage:()=>fd,buildBypassMessages:()=>xd,bypassManager:()=>Y,createPreset:()=>ld,default:()=>wd,deleteMessage:()=>bd,deletePreset:()=>dd,duplicatePreset:()=>ud,exportPresets:()=>hd,getAllPresets:()=>nd,getDefaultPresetId:()=>yd,getEnabledMessages:()=>gd,getPreset:()=>id,getPresetList:()=>ma,importPresets:()=>vd,setDefaultPresetId:()=>pd,updateMessage:()=>md,updatePreset:()=>cd});var mt,bs,fa,bt,ad,Ho,Y,nd,ma,id,ld,cd,dd,ud,yd,pd,gd,fd,md,bd,hd,vd,xd,wd,Js=D(()=>{Oe();me();mt="bypass_presets",bs="default_bypass_preset",fa="current_bypass_preset",bt={},ad=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),Ho=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=_.get(mt,{});return this._cache={...bt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,o)=>(o.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:o,description:r,messages:a}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!o||typeof o!="string"||!o.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=s.trim();if(this.presetExists(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let l={id:n,name:o.trim(),description:r||"",enabled:!0,messages:a||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(n,l),I.emit(M.BYPASS_PRESET_CREATED,{presetId:n,preset:l}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${n}`),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:l}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...o,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,r),I.emit(M.BYPASS_PRESET_UPDATED,{presetId:e,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${o.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(bt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=_.get(mt,{});return delete o[e],_.set(mt,o),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),I.emit(M.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,o){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let a={...JSON.parse(JSON.stringify(r)),id:s.trim(),name:o||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),a),I.emit(M.BYPASS_PRESET_CREATED,{presetId:s,preset:a}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${a.name}"`,preset:a}}addMessage(e,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},a=[...o.messages||[],r];return this.updatePreset(e,{messages:a})}updateMessage(e,s,o){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let a=r.messages||[],n=a.findIndex(i=>i.id===s);if(n===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let l=[...a];return l[n]={...l[n],...o},this.updatePreset(e,{messages:l})}deleteMessage(e,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=o.messages||[],a=r.find(l=>l.id===s);if(!a)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(a.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let n=r.filter(l=>l.id!==s);return this.updatePreset(e,{messages:n})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(o=>o.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=_.get(bs,null);return e==="undefined"||e==="null"||e===""?(_.remove(bs),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(_.set(bs,e),I.emit(M.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let o=this.getPreset(e);if(!o)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(o,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:o=!1}=s,r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=Array.isArray(r)?r:r.presets?r.presets:[r];if(a.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=_.get(mt,{}),l=0;for(let i of a)!i.id||typeof i.id!="string"||i.name&&(bt[i.id]&&!o||!o&&n[i.id]||(n[i.id]={...i,updatedAt:Date.now()},l++));return l>0&&(_.set(mt,n),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${l} \u4E2A\u9884\u8BBE`,imported:l}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let o=_.get(mt,{});o[e]=s,_.set(mt,o),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=_.get(mt,{}),s={},o=!1,r=Array.isArray(e)?e.map((a,n)=>[a?.id||a?.name||`legacy_${n}`,a]):Object.entries(e||{});for(let[a,n]of r){let l=this._normalizePreset(a,n,s);if(!l){o=!0;continue}s[l.id]=l,(!e?.[l.id]||e?.[l.id]?.id!==l.id)&&(o=!0)}o&&_.set(mt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,o={}){if(!s||typeof s!="object")return null;let r=typeof s.name=="string"?s.name.trim():"",a=typeof s.id=="string"?s.id.trim():"",n=typeof e=="string"?e.trim():"";if(!r&&n&&n!=="undefined"&&n!=="null"&&(r=n),this._isLegacySamplePreset(r,a)||(!a&&n&&n!=="undefined"&&n!=="null"&&(a=n),!a&&r&&r!=="undefined"&&r!=="null"&&(a=this._generatePresetId(r,o)),!r||!a||a==="undefined"||r==="undefined"))return null;let i=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${a}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:a,name:r,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:i,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=_.get(bs,null),o=_.get(fa,null),r=s??o;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!e[r]&&(r=Object.values(e).find(n=>n.name===r)?.id||null),r?_.set(bs,r):_.remove(bs),_.has(fa)&&_.remove(fa)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||ad.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let o=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=o,a=1;for(;s[r];)r=`${o}_${a++}`;return r}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},Y=new Ho,nd=()=>Y.getAllPresets(),ma=()=>Y.getPresetList(),id=t=>Y.getPreset(t),ld=t=>Y.createPreset(t),cd=(t,e)=>Y.updatePreset(t,e),dd=t=>Y.deletePreset(t),ud=(t,e,s)=>Y.duplicatePreset(t,e,s),yd=()=>Y.getDefaultPresetId(),pd=t=>Y.setDefaultPresetId(t),gd=t=>Y.getEnabledMessages(t),fd=(t,e)=>Y.addMessage(t,e),md=(t,e,s)=>Y.updateMessage(t,e,s),bd=(t,e)=>Y.deleteMessage(t,e),hd=t=>Y.exportPresets(t),vd=(t,e)=>Y.importPresets(t,e),xd=t=>Y.buildBypassMessages(t),wd=Y});var gi={};ie(gi,{DEFAULT_SETTINGS:()=>Xs,SettingsService:()=>Yo,default:()=>Td,settingsService:()=>Ie});var Xs,ba,Yo,Ie,Td,Qs=D(()=>{Oe();me();Xs={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},ba="settings_v2",Yo=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=_.get(ba,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),_.set(ba,this._cache),I.emit(M.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),o=this._deepMerge(s,e);this.saveSettings(o)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Xs)),_.set(ba,this._cache),I.emit(M.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let o=this.getSettings(),r=e.split("."),a=o;for(let n of r)if(a&&typeof a=="object"&&n in a)a=a[n];else return s;return a}set(e,s){let o=JSON.parse(JSON.stringify(this.getSettings())),r=e.split("."),a=o;for(let n=0;n<r.length-1;n+=1){let l=r[n];l in a||(a[l]={}),a=a[l]}a[r[r.length-1]]=s,this.saveSettings(o)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Xs)),e)}_deepMerge(e,s){let o={...e};for(let r in s)s[r]&&typeof s[r]=="object"&&!Array.isArray(s[r])?o[r]=this._deepMerge(e[r]||{},s[r]):o[r]=s[r];return o}},Ie=new Yo,Td=Ie});var mi={};ie(mi,{ContextInjector:()=>Go,DEFAULT_INJECTION_OPTIONS:()=>fi,WRITEBACK_METHODS:()=>we,WRITEBACK_RESULT_STATUS:()=>qo,contextInjector:()=>$e,default:()=>Md});function Zs(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Sd(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function _d(t){try{return t?.SillyTavern?.getContext?.()||null}catch{return null}}function Ed(){let t=Sd(),e=t?.SillyTavern||null,s=_d(t),o=e?.eventSource||t?.eventSource||s?.eventSource||null,r=e?.eventTypes||e?.event_types||s?.eventTypes||s?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:s,eventSource:o,eventTypes:r,source:e?.eventSource?"SillyTavern.eventSource":t?.eventSource?"topWindow.eventSource":s?.eventSource?"SillyTavern.getContext().eventSource":"unavailable"}}function nt(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}var Ce,hs,fi,qo,we,Ad,kd,Go,$e,Md,Vt=D(()=>{me();Ce="YouYouToolkit_toolOutputs",hs="YouYouToolkit_injectedContext",fi={overwrite:!0,enabled:!0};qo={SUCCESS:"success",FAILED:"failed"},we={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Ad=60,kd=3;Go=class{constructor(){this.debugMode=!1}async inject(e,s,o={}){return(await this.injectDetailed(e,s,o)).success}async injectDetailed(e,s,o={}){let r={...fi,...o},a=this._createWritebackResult(e,r);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),a.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",a;if(!Zs(r.sourceMessageId))return this._log("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),a.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",a;let n=a.chatId,l={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,options:r};I.emit(M.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:n,content:l.content,sourceMessageId:l.sourceMessageId,sourceSwipeId:l.sourceSwipeId,effectiveSwipeId:l.sourceSwipeId,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",traceId:r.traceId||"",sessionKey:r.sessionKey||"",options:r});let i=await this._insertToolOutputToBoundAssistantSlot(e,l,r,a);return i.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${n}`,i),i}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,e);if(o<0)return"";let r=s[o]||{},a=r[hs];if(typeof a=="string"&&a.trim())return a.trim();let n=r[Ce];return n&&typeof n=="object"?this._buildMessageInjectedContext(n).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let r=(e[s]||{})[Ce];return r&&typeof r=="object"?r:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:o}=this._getChatRuntime(),r=this._findAssistantMessageIndex(o,null);return r<0?null:o[r]?.[Ce]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:o,context:r,chat:a}=this._getChatRuntime(),n=this._findAssistantMessageIndex(a,null);if(n<0)return!1;let l=a[n],i=l?.[Ce];if(!i||!i[s])return!1;delete i[s],l[Ce]=i,l[hs]=this._buildMessageInjectedContext(i);let c=r?.saveChat||o?.saveChat||null;return typeof c=="function"&&await c.call(r||o),I.emit(M.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(o){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",o),!1}}async clearAllContext(e){try{let{api:s,context:o,chat:r}=this._getChatRuntime(),a=this._findAssistantMessageIndex(r,null);if(a<0)return!1;let n=r[a];delete n[Ce],delete n[hs];let l=o?.saveChat||s?.saveChat||null;return typeof l=="function"&&await l.call(o||s),I.emit(M.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),o=Object.entries(s).map(([r,a])=>({toolId:r,updatedAt:a.updatedAt,contentLength:a.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:o,totalCount:o.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,o=s?.getContext?.()||null,r=Array.isArray(o?.chat)?o.chat:[],a=Array.isArray(s?.chat)?s.chat:[],n=r.length?r:a;return{topWindow:e,api:s,context:o,chat:n,contextChat:r,apiChat:a}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let o=we.SET_CHAT_MESSAGE;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,effectiveSwipeId:s.effectiveSwipeId||s.sourceSwipeId||null,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:we.NONE,commit:{preferredMethod:o,attemptedMethods:[],appliedMethod:we.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:qo.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,o,r,a,n=null){let l=e?.contextChat?.[o]||e?.apiChat?.[o]||s?.[o]||n||null,i=this._getWritableMessageField(l).text||"",c=l?.[Ce]?.[r],d=a?i.includes(a):!0,u=!!(c&&String(c.content||"").trim()===a);return{latestMessage:l,latestText:i,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,o,r,a,n=null){let l=1,i=this._collectWritebackVerification(e,s,o,r,a,n);for(let c=0;c<kd;c+=1){if(i.textIncludesContent&&i.mirrorStored)return{...i,refreshConfirmed:!0,confirmChecks:l,confirmedBy:"text_and_mirror_present"};await this._wait(Ad),l+=1,i=this._collectWritebackVerification(e,s,o,r,a,n)}return{...i,refreshConfirmed:i.textIncludesContent&&i.mirrorStored,confirmChecks:l,confirmedBy:i.textIncludesContent&&i.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,s,o,r={},a=null){let n=a||this._createWritebackResult("",r),{api:l,context:i}=e||{},c=i?.setChatMessages||l?.setChatMessages||e?.topWindow?.setChatMessages||null,d=i?.setChatMessage||l?.setChatMessage||e?.topWindow?.setChatMessage||null,u=r.replaceFullMessage!==!0;n.commit.preferredMethod=typeof d=="function"?we.SET_CHAT_MESSAGE:typeof c=="function"?we.SET_CHAT_MESSAGES:we.LOCAL_ONLY;let f=!1;if(typeof d=="function"){nt(n.commit.attemptedMethods,we.SET_CHAT_MESSAGE);try{await d.call(i||l||e?.topWindow,{message:o,mes:o,content:o,text:o},s,{swipe_id:Zs(r.sourceSwipeId||r.effectiveSwipeId)||"current",refresh:"display_and_render_current"}),n.steps.hostSetChatMessage=!0,n.hostUpdateMethod=we.SET_CHAT_MESSAGE,n.hostCommitApplied=!0,n.commit.appliedMethod=we.SET_CHAT_MESSAGE,n.commit.hostCommitApplied=!0,f=!0}catch(y){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",y),n.errors.push(`setChatMessage: ${y?.message||String(y)}`)}}if(!f&&typeof c=="function"){nt(n.commit.attemptedMethods,we.SET_CHAT_MESSAGES);try{await c.call(i||l||e?.topWindow,[{message_id:Zs(r.sourceMessageId)||s,chat_index:s,message:o,mes:o,content:o,text:o}],{refresh:"affected"}),n.steps.hostSetChatMessages=!0,n.hostUpdateMethod=we.SET_CHAT_MESSAGES,n.hostCommitApplied=!0,n.commit.appliedMethod=we.SET_CHAT_MESSAGES,n.commit.hostCommitApplied=!0,n.commit.fallbackUsed=!0,f=!0}catch(y){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",y),n.errors.push(`setChatMessages: ${y?.message||String(y)}`)}}if(f&&(n.refreshRequested=!0,nt(n.refresh.requestMethods,n.hostUpdateMethod)),u&&typeof c=="function"){nt(n.commit.attemptedMethods,"setChatMessages_refresh_assist");try{await c.call(i||l||e?.topWindow,[{message_id:Zs(r.sourceMessageId)||s,chat_index:s,message:o,mes:o,content:o,text:o}],{refresh:"affected"}),n.refreshRequested=!0,nt(n.refresh.requestMethods,"setChatMessages_refresh_assist")}catch(y){this._log("append \u5199\u56DE\u8865\u5145\u5237\u65B0\u5931\u8D25",y),n.errors.push(`setChatMessages_refresh_assist: ${y?.message||String(y)}`)}}return f||(nt(n.commit.attemptedMethods,we.LOCAL_ONLY),n.commit.appliedMethod=we.LOCAL_ONLY,n.commit.fallbackUsed=n.commit.preferredMethod!==we.LOCAL_ONLY,n.hostUpdateMethod=n.commit.appliedMethod),n}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let o=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return o?.[1]?o[1]:"plain_text"}_stripExactStoredBlock(e,s,o=""){let r=String(e||""),a=String(s||"").trim(),n=String(o||"").trim();return a?r.includes(a)?n?{text:r.replace(a,n).trimEnd(),removed:!0,replaced:!0}:{text:r.replace(a,"").trimEnd(),removed:!0,replaced:!1}:{text:r,removed:!1,replaced:!1}:{text:r,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,s,o){let{contextChat:r,apiChat:a}=e||{},n=l=>{!Array.isArray(l)||s<0||s>=l.length||l[s]!==o&&(l[s]={...l[s]||{},...o})};n(r),n(a)}_notifyMessageUpdated(e,s){try{let o=Ed(),r=o?.topWindow||e?.topWindow,a=o?.eventSource||null,n=o?.eventTypes||{},l=n.MESSAGE_UPDATED||n.message_updated||"MESSAGE_UPDATED";return a&&typeof a.emit=="function"?(a.emit(l,s),typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(()=>{a.emit(l,s)}):typeof r?.setTimeout=="function"&&r.setTimeout(()=>{a.emit(l,s)},30),{emitted:!0,source:o?.source||"unavailable",eventName:l}):{emitted:!1,source:o?.source||"unavailable",eventName:l}}catch(o){return this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",o),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let o=Array.isArray(e)?e:[];if(!o.length)return-1;let r=s!=null&&s!=="",a=(n,l)=>{if(!this._isAssistantMessage(n)||s==null||s==="")return!1;let i=String(s).trim();return i?[n.message_id,n.id,n.messageId,n.mes_id,l].map(d=>d==null?"":String(d).trim()).includes(i):!1};for(let n=o.length-1;n>=0;n-=1)if(a(o[n],n))return n;if(r)return-1;for(let n=o.length-1;n>=0;n-=1)if(this._isAssistantMessage(o[n]))return n;return-1}_buildMessageInjectedContext(e){let o=Object.entries(e&&typeof e=="object"?e:{}).filter(([,a])=>a?.blockType!=="full_message").sort(([,a],[,n])=>(a?.updatedAt||0)-(n?.updatedAt||0));if(!o.length)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[a,n]of o)r.push(`[${a}]`),r.push(n?.content||""),r.push("");return r.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let o of s)if(typeof e?.[o]=="string")return{key:o,text:e[o]};return{key:"mes",text:""}}_applyMessageText(e,s,o={}){let r=e&&typeof e=="object"?e:{},a=["mes","message","content","text"],n=!1;if(a.forEach(l=>{typeof r[l]=="string"&&(r[l]=s,n=!0)}),n||(r.mes=s,r.message=s),Array.isArray(r.swipes)){let l=Number.parseInt(Zs(o?.sourceSwipeId||o?.effectiveSwipeId),10),i=Number.isInteger(l)?l:Number.isInteger(r.swipe_id)?r.swipe_id:Number.isInteger(r.swipeId)?r.swipeId:0;i>=0&&i<r.swipes.length&&(r.swipes[i]=s,r.swipe_id=i,r.swipeId=i)}return r}_stripExistingToolOutput(e,s=[]){let o=String(e||"");return(Array.isArray(s)?s:[]).forEach(a=>{let n=String(a||"").trim();if(!n)return;if(n.startsWith("regex:")){try{let d=new RegExp(n.slice(6).trim(),"gis");o=o.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",n,d)}return}let l=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),i=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>\\s*`,"gi"),c=new RegExp(`\\{${l}\\|[\\s\\S]*?\\}\\s*`,"gi");o=o.replace(i,""),o=o.replace(c,"")}),o.trimEnd()}_stripPreviousStoredToolContent(e,s){let o=String(e||""),r=String(s||"").trim();return r?o.replace(r,"").trimEnd():o.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,s,o={},r=null){let a=r||this._createWritebackResult(e,o);try{let n=this._getChatRuntime(),{context:l,chat:i}=n;if(!Array.isArray(i)||!i.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),a.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",a;let c=this._findAssistantMessageIndex(i,o.sourceMessageId);if(c<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),a.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",a;a.messageIndex=c,a.steps.foundTargetMessage=!0;let d=i[c],{key:u,text:f}=this._getWritableMessageField(d);a.textField=u;let y=d[Ce]&&typeof d[Ce]=="object"?d[Ce]:{},m=y?.[e]||{},v=m?.content||"",w=m?.blockText||v||"",A=Object.entries(y).filter(([Ee])=>Ee!==e).map(([,Ee])=>Ee||{}),k=String(s.content||"").trim(),C=o.replaceFullMessage===!0,F=C?"full_message":this._inferBlockType(k),K={toolId:e,messageId:o.sourceMessageId||d?.message_id||d?.messageId||c,blockType:F,insertedAt:s.updatedAt,replaceable:o.overwrite!==!1};a.blockIdentity=K;let W=o.overwrite===!1||C?{text:String(f||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(f,w,k),E=W.text,L="";!C&&o.overwrite!==!1&&w&&!W.removed&&(L="previous_block_not_found");let N=o.overwrite===!1||W.replaced||C?E:this._stripExistingToolOutput(E,o.extractionSelectors),B=N!==E;E=N;let te=o.overwrite===!1||W.replaced||C?E:this._stripPreviousStoredToolContent(E,v),ce=te!==E;E=te,a.replacedExistingBlock=C||W.removed||B||ce;let pe=o.overwrite===!1?String(f||""):E,We=C?k:W.replaced?E.trim():[pe.trimEnd(),k].filter(Boolean).join(`

`).trim();a.insertedNewBlock=!!k;let V=A.every(Ee=>{if(Ee?.blockType==="full_message")return!0;let fe=String(Ee?.blockText||Ee?.content||"").trim();return fe?We.includes(fe):!0});a.preservedOtherToolBlocks=V,V?L&&(a.conflictDetected=!0,a.conflictReason=L):(a.conflictDetected=!0,a.conflictReason="other_tool_block_removed");let tt={...y,[e]:{toolId:e,content:k,blockText:k,blockType:F,blockIdentity:K,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};d[u]=We,this._applyMessageText(d,We,o),d[Ce]=tt,d[hs]=this._buildMessageInjectedContext(tt),a.contentCommitted=!0,a.commit.contentCommitted=!0,a.steps.contentCommitted=!0,a.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(n,c,d),a.steps.runtimeSynced=!0,await this._requestAssistantMessageRefresh(n,c,We,o,a);let Mt=l?.saveChat||n?.api?.saveChat||null,Ct=l?.saveChatDebounced||n?.api?.saveChatDebounced||null;typeof Ct=="function"&&(Ct.call(l||api),a.steps.saveChatDebounced=!0,a.refreshRequested=!0,nt(a.refresh.requestMethods,"saveChatDebounced")),typeof Mt=="function"&&(await Mt.call(l||api),a.steps.saveChat=!0,a.refreshRequested=!0,nt(a.refresh.requestMethods,"saveChat"));let Fe=this._notifyMessageUpdated(n,c);a.steps.notifiedMessageUpdated=Fe?.emitted===!0,a.refresh.eventSource=Fe?.source||"",a.refresh.eventName=Fe?.eventName||"",Fe?.error&&a.errors.push(`MESSAGE_UPDATED: ${Fe.error}`);let de=String(s.content||"").trim();(a.steps.hostSetChatMessages||a.steps.hostSetChatMessage)&&(a.refreshRequested=!0,nt(a.refresh.requestMethods,a.hostUpdateMethod)),a.steps.notifiedMessageUpdated&&(a.refreshRequested=!0,nt(a.refresh.requestMethods,`MESSAGE_UPDATED:${a.refresh.eventName||"MESSAGE_UPDATED"}`)),a.steps.refreshRequested=a.refreshRequested,a.refresh.requested=a.refreshRequested;let J=await this._confirmRefresh(n,i,c,e,de,d);return a.verification.textIncludesContent=J.textIncludesContent,a.verification.mirrorStored=J.mirrorStored,a.verification.refreshConfirmed=J.refreshConfirmed,a.steps.verifiedAfterWrite=a.verification.textIncludesContent&&a.verification.mirrorStored,a.refreshConfirmed=a.verification.refreshConfirmed&&a.refreshRequested,a.refresh.confirmChecks=Number(J.confirmChecks)||0,a.refresh.confirmedBy=J.confirmedBy||"",a.refresh.confirmed=a.refreshConfirmed,a.steps.refreshConfirmed=a.refreshConfirmed,a.success=a.steps.localTextApplied&&a.steps.runtimeSynced&&a.steps.verifiedAfterWrite&&a.refreshConfirmed,a.writebackStatus=a.success?qo.SUCCESS:qo.FAILED,!a.success&&!a.error&&(a.error=a.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),a.conflictDetected&&!a.error&&(a.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${a.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),a}catch(n){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",n),a.error=n?.message||String(n),a.errors.push(a.error),a}}getAssistantMessageSnapshot(e=null){try{let s=this._getChatRuntime(),{chat:o}=s,r=this._findAssistantMessageIndex(o,e);if(r<0)return null;let a=o[r]||null,n=this._getWritableMessageField(a).text||"",l=a?.[Ce]&&typeof a[Ce]=="object"?a[Ce]:{},i=Object.values(l).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(n||"")).trim();return{messageIndex:r,message:a,messageText:n,baseText:i,toolOutputs:l,injectedContext:typeof a?.[hs]=="string"?a[hs]:this._buildMessageInjectedContext(l)}}catch(s){return this._log("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",s),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),r=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(n=>typeof n=="string"&&n.trim());if(r)return r;let a=e.SillyTavern?.this_chid;if(a!=null)return`chat_char_${a}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},$e=new Go,Md=$e});var hi={};ie(hi,{BUILTIN_VARIABLES:()=>bi,VariableResolver:()=>Vo,default:()=>Cd,variableResolver:()=>Ue});var bi,Vo,Ue,Cd,eo=D(()=>{me();bi={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Vo=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let o=e;return o=this._resolveBuiltinVariables(o,s),o=this._resolveCustomVariables(o,s),o=this._resolveRegexVariables(o,s),o}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>this.resolveObject(r,s));let o={};for(let[r,a]of Object.entries(e))typeof a=="string"?o[r]=this.resolveTemplate(a,s):typeof a=="object"&&a!==null?o[r]=this.resolveObject(a,s):o[r]=a;return o}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(bi))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,o]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof o=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},o={};for(let r of this.getAvailableVariables())o[r.category]||(o[r.category]=[]),o[r.category].push(r);for(let[r,a]of Object.entries(s))if(o[r]&&o[r].length>0){e.push(`\u3010${a}\u3011`);for(let n of o[r])e.push(`  ${n.name} - ${n.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let o=e;return o=o.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),o=o.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),o=o.replace(/\{\{chatHistory\}\}/gi,()=>{let r=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(r)}),o=o.replace(/\{\{characterCard\}\}/gi,()=>{let r=s.characterCard||s.raw?.characterCard;return r?this._formatCharacterCard(r):""}),o=o.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),o=o.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),o=o.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),o=o.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),o=o.replace(/\{\{toolWorldbookContent\}\}/gi,s.toolWorldbookContent||s.raw?.toolWorldbookContent||""),o=o.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),o=o.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),o=o.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),o=o.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),o=o.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),o=o.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),o}_resolveCustomVariables(e,s){let o=e;for(let[r,a]of this.customVariables){let n=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof a=="function"?o=o.replace(n,()=>{try{return a(s)}catch(l){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,l),""}}):o=o.replace(n,String(a))}return o}_resolveRegexVariables(e,s){let o=e;for(let[r,a]of this.variableHandlers){let n=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");o=o.replace(n,(l,i)=>{try{return a(i,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${i}:`,c),""}})}return o}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let o=s.role||"unknown",r=s.content||s.mes||"";return`[${o}]: ${r}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},Ue=new Vo,Cd=Ue});var xi={};ie(xi,{DEFAULT_PROMPT_TEMPLATE:()=>vi,ToolPromptService:()=>Jo,default:()=>Pd,toolPromptService:()=>Jt});var vi,Jo,Jt,Pd,Xo=D(()=>{me();Js();eo();ga();vi="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Jo=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,s={}){let o=this._getPromptTemplate(e),r=String(s?.toolWorldbookContent||s?.input?.toolWorldbookContent||await yi(e)).trim(),a=Ue.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolWorldbookContent:r}),n=Ue.resolveTemplate(o,a).trim(),l=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return Ue.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:n,toolContentMacro:l,toolWorldbookContent:r})}async buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let o=[],r=await this._buildVariableContext(e,s),a=this._getBypassMessages(e);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&o.push({role:this._normalizeRole(l.role),content:Ue.resolveTemplate(l.content||"",r)});let n=this._buildUserContent(this._getPromptTemplate(e),r);return n&&o.push({role:"user",content:n}),this._log(`\u6784\u5EFA\u6D88\u606F: ${o.length} \u6761`),o}async buildPromptText(e,s){return(await this._buildVariableContext(e,s)).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:vi}_getBypassMessages(e){return e.bypass?.enabled?Y.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":Ue.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},Jt=new Jo,Pd=Jt});var wi={};ie(wi,{LEGACY_OUTPUT_MODES:()=>Id,OUTPUT_MODES:()=>ze,TOOL_FAILURE_STAGES:()=>ge,TOOL_RUNTIME_STATUS:()=>$d,TOOL_WRITEBACK_STATUS:()=>ne,ToolOutputService:()=>Zo,default:()=>Rd,toolOutputService:()=>it});function Qo(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var ze,Id,$d,ge,ne,Zo,it,Rd,er=D(()=>{me();Qs();Vt();Xo();Ro();Ds();ze={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Id={inline:"follow_ai"},$d={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},ge={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ne={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Zo=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===ze.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===ze.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let o=Date.now(),r=e.id,a=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,n=s?.sessionKey||"",l=s?.executionKey||"",i=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=ne.NOT_APPLICABLE,f=null,y=[],m="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),I.emit(M.TOOL_EXECUTION_STARTED,{toolId:r,traceId:a,sessionKey:n,mode:ze.POST_RESPONSE_API});try{if(d=ge.BUILD_MESSAGES,y=await this._buildToolMessages(e,s),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${y.length} \u6761\u6D88\u606F`);let v=await this._getRequestTimeout();d=ge.SEND_API_REQUEST;let w=await this._sendApiRequest(c,y,{timeoutMs:v,signal:s.signal});if(d=ge.EXTRACT_OUTPUT,m=this._extractOutputContent(w,e),m){if(d=ge.INJECT_CONTEXT,f=await $e.injectDetailed(r,m,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:i,traceId:a,sessionKey:n}),!f?.success)throw u=ne.FAILED,new Error(f?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ne.SUCCESS}else u=ne.SKIPPED_EMPTY_OUTPUT;d="";let A=Date.now()-o;return I.emit(M.TOOL_EXECUTED,{toolId:r,traceId:a,sessionKey:n,success:!0,duration:A,mode:ze.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${A}ms`),{success:!0,toolId:r,output:m,duration:A,meta:{traceId:a,sessionKey:n,executionKey:l,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:i,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:f,phases:Qo(y,m,f)}}}catch(v){let w=Date.now()-o,A=d||ge.UNKNOWN,k=u||ne.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,v),I.emit(M.TOOL_EXECUTION_FAILED,{toolId:r,traceId:a,sessionKey:n,error:v.message||String(v),duration:w}),{success:!1,toolId:r,error:v.message||String(v),duration:w,meta:{traceId:a,sessionKey:n,executionKey:l,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:i,apiPreset:c,writebackStatus:k,failureStage:A,writebackDetails:f,phases:Qo(y,m,f)}}}}async runToolFollowAiManual(e,s){let o=Date.now(),r=e.id,a=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,n=s?.sessionKey||"",l=s?.executionKey||"",i=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=ne.NOT_APPLICABLE,f=null,y=[],m="";I.emit(M.TOOL_EXECUTION_STARTED,{toolId:r,traceId:a,sessionKey:n,mode:ze.FOLLOW_AI});try{if(d=ge.BUILD_MESSAGES,y=await this._buildToolMessages(e,s),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let v=await this._getRequestTimeout();d=ge.SEND_API_REQUEST;let w=await this._sendApiRequest(i,y,{timeoutMs:v,signal:s.signal});if(d=ge.EXTRACT_OUTPUT,m=this._extractOutputContent(w,e),m){if(d=ge.INJECT_CONTEXT,f=await $e.injectDetailed(r,m,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:c,traceId:a,sessionKey:n}),!f?.success)throw u=ne.FAILED,new Error(f?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ne.SUCCESS}else u=ne.SKIPPED_EMPTY_OUTPUT;d="";let A=Date.now()-o;return I.emit(M.TOOL_EXECUTED,{toolId:r,traceId:a,sessionKey:n,success:!0,duration:A,mode:ze.FOLLOW_AI}),{success:!0,toolId:r,output:m,duration:A,meta:{traceId:a,sessionKey:n,executionKey:l,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:c,apiPreset:i,writebackStatus:u,failureStage:"",writebackDetails:f,phases:Qo(y,m,f)}}}catch(v){let w=Date.now()-o,A=d||ge.UNKNOWN,k=u||ne.NOT_APPLICABLE;return I.emit(M.TOOL_EXECUTION_FAILED,{toolId:r,traceId:a,sessionKey:n,error:v.message||String(v),duration:w,mode:ze.FOLLOW_AI}),{success:!1,toolId:r,error:v.message||String(v),duration:w,meta:{traceId:a,sessionKey:n,executionKey:l,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:c,apiPreset:i,writebackStatus:k,failureStage:A,writebackDetails:f,phases:Qo(y,m,f)}}}}async runToolInline(e,s){return this.runToolFollowAiManual(e,s)}async previewExtraction(e,s){return{success:!0,...this.getExtractionSnapshot(e,s)}}getExtractionSnapshot(e,s){let o=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(o,"rawText"),a=this._joinMessageBlocks(o,"filteredText"),n=this._joinMessageBlocks(o,"extractedText",{skipEmpty:!0}),l=(Array.isArray(o)?o:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),i=Array.isArray(o)&&o.length>0?o[o.length-1]:null;return{sourceText:r,filteredSourceText:a,extractedText:n,extractedRawText:l,messageEntries:o,primaryEntry:i,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let o=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(o,"rawText"),a=this._joinMessageBlocks(o,"filteredText"),n=this._joinMessageBlocks(o,"extractedText",{skipEmpty:!0}),l={...s,rawRecentMessagesText:r,recentMessagesText:a,extractedContent:n,toolContentMacro:this._buildToolContentMacro(o),toolName:e.name,toolId:e.id};return Jt.buildToolMessages(e,l)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,o={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:a}=o,n=null;if(e){if(!Rs(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);n=$s(e)}else n=$s();let l=cs(n||{});if(!l.valid&&!n?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${l.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:r,apiConfig:n},a);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ie.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let o=typeof e=="string"?e:String(e||""),r=this._getExtractionSelectors(s);if(!r.length)return o.trim();let a=[];for(let n of r){let l=String(n||"").trim();if(!l)continue;if(l.startsWith("regex:")){let c=l.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...o.matchAll(d)].forEach(f=>{let y=String(f?.[0]||"").trim();y&&a.push(y)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:l,error:d})}continue}let i=l.replace(/^<|>$/g,"").trim();if(i)try{let c=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>`,"gi");(o.match(c)||[]).forEach(u=>{let f=String(u||"").trim();f&&a.push(f)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:l,error:c})}}return a.length>0?a.join(`

`).trim():o.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(o=>String(o||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(o=>String(o||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,o={}){let r=typeof e=="string"?e:String(e||""),a=this._getExtractionSelectors(s),{strict:n=!1}=o;if(!a.length)return r.trim();let l=a.map((c,d)=>{let u=String(c||"").trim(),f=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:f?"regex_include":"include",value:f?u.slice(6).trim():u,enabled:!0}}).filter(c=>c.value),i=Kt(r,l,[]);return n?(i||"").trim():i||r.trim()}_extractToolContent(e,s){let o=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(o,e,{strict:!0}):o.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let o=ft()||[],r=Ht()||[];return!Array.isArray(o)||o.length===0?s.trim():Kt(s,o,r)||s.trim()}catch(o){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",o),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let o of s)if(typeof o=="string"&&o.trim())return o.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(o=>o.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let o=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),r=Array.isArray(s?.chatMessages)?s.chatMessages:[],a=[];for(let l=r.length-1;l>=0&&a.length<o;l-=1){let i=r[l],c=String(i?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!i?.is_user&&!i?.is_system&&!c,u=this._getMessageText(i);d&&u&&a.unshift({text:u,message:i,chatIndex:l})}if(a.length>0)return a;let n=s?.lastAiMessage||s?.input?.lastAiMessage||"";return n?[{text:n,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((r,a)=>{let n=r.text||"",l=this._applyGlobalContextRules(n),i=this._extractToolContent(e,n);return{...r,order:a+1,rawText:n,filteredText:l,extractedText:i,fullMessageText:n}})}_joinMessageBlocks(e,s,o={}){let r=Array.isArray(e)?e:[],{skipEmpty:a=!1}=o;return r.map(l=>{let i=String(l?.[s]||"").trim();return a&&!i?"":`${`\u3010\u7B2C ${l?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${i||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(r=>{let a=`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`,n=String(r?.filteredText||"").trim()||"(\u7A7A)",l=String(r?.extractedText||"").trim()||"(\u7A7A)";return`${a}
\u6B63\u6587\uFF1A
${n}

\u5DE5\u5177\uFF1A
${l}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Ie.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},it=new Zo,Rd=it});function Si(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[s,o])=>(e[s]=o===!0,e),{})}function Ld(t,e={}){let s=e?.direction==="unescape"?"unescape":"escape",o=Si(e?.options);return Od.reduce((r,a)=>o[a.key]!==!0?r:s==="unescape"?r.replace(a.escaped,a.unescaped):r.replace(a.plain,a.replacement),String(t||""))}function Nd(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let o=Si(e?.options);return Dd.reduce((r,a)=>o[a.key]!==!0?r:r.replace(a.from,a.to),String(t||""))}function _i(t,e){let s=t?.processor||{},o=s?.type||"",r=String(e||"");switch(o){case Ti.ESCAPE_TRANSFORM:return Ld(r,s);case Ti.PUNCTUATION_TRANSFORM:return Nd(r,s);default:return r}}var Od,Dd,Ti,Ei=D(()=>{Od=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],Dd=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Ti={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var sr={};ie(sr,{abortAllTasks:()=>Wd,abortTask:()=>jd,buildToolMessages:()=>Mi,clearExecutionHistory:()=>qd,createExecutionContext:()=>Xd,createResult:()=>tr,enhanceMessagesWithBypass:()=>Qd,executeBatch:()=>zd,executeTool:()=>ki,executeToolWithConfig:()=>Ci,executeToolsBatch:()=>tu,executorState:()=>oe,extractFailed:()=>Jd,extractSuccessful:()=>Vd,generateTaskId:()=>Xt,getExecutionHistory:()=>Yd,getExecutorStatus:()=>Hd,getScheduler:()=>vs,mergeResults:()=>Gd,pauseExecutor:()=>Fd,resumeExecutor:()=>Kd,setMaxConcurrent:()=>Ud});function tr(t,e,s,o,r,a,n=0){return{success:s,taskId:t,toolId:e,data:o,error:r,duration:a,retries:n,timestamp:Date.now(),metadata:{}}}function Xt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Bd(t,e={}){return{id:Xt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function vs(){return to||(to=new ha(oe.maxConcurrent)),to}function Ud(t){oe.maxConcurrent=Math.max(1,Math.min(10,t)),to&&(to.maxConcurrent=oe.maxConcurrent)}async function ki(t,e={},s){let o=vs(),r=Bd(t,e);for(;oe.isPaused;)await new Promise(a=>setTimeout(a,100));try{let a=await o.enqueue(async n=>{if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(n,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return Ai(a),a}catch(a){let n=tr(r.id,t,!1,null,a,Date.now()-r.createdAt,r.retries);return Ai(n),n}}async function zd(t,e={}){let{failFast:s=!1,concurrency:o=oe.maxConcurrent}=e,r=[],a=vs(),n=a.maxConcurrent;a.maxConcurrent=o;try{let l=t.map(({toolId:i,options:c,executor:d})=>ki(i,c,d));if(s)for(let i of l){let c=await i;if(r.push(c),!c.success){a.abortAll();break}}else{let i=await Promise.allSettled(l);for(let c of i)c.status==="fulfilled"?r.push(c.value):r.push(tr(Xt(),"unknown",!1,null,c.reason,0,0))}}finally{a.maxConcurrent=n}return r}function jd(t){return vs().abort(t)}function Wd(){vs().abortAll(),oe.executionQueue=[]}function Fd(){oe.isPaused=!0}function Kd(){oe.isPaused=!1}function Hd(){return{...vs().getStatus(),isPaused:oe.isPaused,activeControllers:oe.activeControllers.size,historyCount:oe.executionHistory.length}}function Ai(t){oe.executionHistory.push(t),oe.executionHistory.length>100&&oe.executionHistory.shift()}function Yd(t={}){let e=[...oe.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function qd(){oe.executionHistory=[]}function Gd(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function Vd(t){return t.filter(e=>e.success).map(e=>e.data)}function Jd(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Xd(t={}){return{taskId:Xt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function Qd(t,e){return!e||e.length===0?t:[...e,...t]}function Zd(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Mi(t,e){let s=[],o=t.promptTemplate||"",r={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[a,n]of Object.entries(r))o=o.replace(new RegExp(Zd(a),"g"),n);return s.push({role:"USER",content:o}),s}async function Ci(t,e,s={}){let o=Q(t);if(!o)return{success:!1,taskId:Xt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!o.enabled)return{success:!1,taskId:Xt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),a=Xt();try{I.emit(M.TOOL_EXECUTION_STARTED,{toolId:t,taskId:a,context:e});let n=Mi(o,e);if(typeof s.callApi=="function"){let l=o.output?.apiPreset||o.apiPreset||"",i=l?{preset:l}:null,c=await s.callApi(n,i,s.signal),d=c;o.outputMode==="separate"&&o.extractTags?.length>0&&(d=eu(c,o.extractTags));let u={success:!0,taskId:a,toolId:t,data:d,duration:Date.now()-r};return I.emit(M.TOOL_EXECUTED,{toolId:t,taskId:a,result:u}),u}else return{success:!0,taskId:a,toolId:t,data:{messages:n,config:{apiPreset:o.output?.apiPreset||o.apiPreset||"",outputMode:o.outputMode,extractTags:o.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(n){let l={success:!1,taskId:a,toolId:t,error:n.message||String(n),duration:Date.now()-r};return I.emit(M.TOOL_EXECUTION_FAILED,{toolId:t,taskId:a,error:n}),l}}function eu(t,e){let s={};for(let o of e){let r=new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"gi"),a=t.match(r);a&&(s[o]=a.map(n=>{let l=n.match(new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"i"));return l?l[1].trim():""}))}return s}async function tu(t,e,s={}){let o=[];for(let r of t){let a=Q(r);if(a&&a.enabled){let n=await Ci(r,e,s);o.push(n)}}return o}var oe,ha,to,or=D(()=>{At();me();oe={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};ha=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((o,r)=>{this.queue.push({executor:e,task:s,resolve:o,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:o,resolve:r,reject:a}=e,n=new AbortController;o.abortController=n,o.status="running",o.startedAt=Date.now(),this.running.set(o.id,o),oe.activeControllers.set(o.id,n),this.executeTask(s,o,n.signal).then(l=>{o.status="completed",o.completedAt=Date.now(),r(l)}).catch(l=>{o.status=l.name==="AbortError"?"aborted":"failed",o.completedAt=Date.now(),a(l)}).finally(()=>{this.running.delete(o.id),oe.activeControllers.delete(o.id),oe.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,o){let r=Date.now(),a=null;for(let n=0;n<=s.maxRetries;n++){if(o.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let l=await e(o);return tr(s.id,s.toolId,!0,l,null,Date.now()-r,n)}catch(l){if(a=l,l.name==="AbortError")throw l;n<s.maxRetries&&(await this.delay(1e3*(n+1)),s.retries=n+1)}}throw a}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=oe.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of oe.activeControllers.values())e.abort();oe.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},to=null});async function su(){return va||(va=Promise.resolve().then(()=>(or(),sr))),va}async function ou(t,e,s){return s&&t.output?.mode===ze.POST_RESPONSE_API?it.runToolPostResponse(t,e):s&&t.output?.mode===ze.FOLLOW_AI?it.runToolFollowAiManual(t,e):(await su()).executeToolWithConfig(t.id,e)}function ru(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?Qt.MANUAL_LOCAL_TRANSFORM:t.output?.mode===ze.POST_RESPONSE_API?Qt.MANUAL_POST_RESPONSE_API:Qt.MANUAL_COMPATIBILITY:Qt.MANUAL_POST_RESPONSE_API}function rr(t,e){try{la(t,e)}catch(s){console.warn("[ManualTool] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}function au(t,e,s){let o=String(t||""),r=String(e||"").trim(),a=String(s||"").trim();return!o.trim()||!r?{nextMessageText:"",replaced:!1}:o.includes(r)?{nextMessageText:o.replace(r,a).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function nu(t,e){let s=it.getExtractionSnapshot(t,e),o=s?.primaryEntry||null,r=String(o?.fullMessageText||e?.lastAiMessage||"").trim(),a=String(o?.extractedText||s?.extractedRawText||s?.extractedText||"").trim(),n=Array.isArray(s?.selectors)?s.selectors:[],l=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,i=e?.sessionKey||"";if(!a||!r)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:l,sessionKey:i,selectors:n,writebackStatus:ne.NOT_APPLICABLE,failureStage:ge.EXTRACT_OUTPUT,extraction:s}};let c=String(_i(t,a)||"").trim(),d=au(r,a,c),u=d.replaced?d.nextMessageText:c,f=null,y=ne.NOT_APPLICABLE;if(u){if(f=await $e.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:l,sessionKey:i}),!f?.success)return{success:!1,error:f?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:l,sessionKey:i,selectors:n,writebackStatus:ne.FAILED,failureStage:ge.INJECT_CONTEXT,writebackDetails:f,extraction:s}};y=ne.SUCCESS}else y=ne.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,meta:{traceId:l,sessionKey:i,selectors:n,writebackStatus:y,failureStage:"",writebackDetails:f,extraction:s}}}async function iu(t,e){let s=Date.now(),o=t.id,r=`yyt-tool-run-${o}`,a=ru(t,e),n=e?.executionKey||"";rr(o,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),ve("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:r});try{let l=a===Qt.MANUAL_LOCAL_TRANSFORM?await nu(t,e):await ou(t,e,!0),i=Date.now()-s;if(l?.success){let f=Q(o),y=l?.meta?.writebackDetails||{};return rr(o,{lastStatus:"success",lastError:"",lastDurationMs:i,lastTraceId:e?.traceId||"",successCount:(f?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(y?.refresh?.requestMethods)?[...y.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:y?.refresh?.confirmedBy||""}),x("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),ve("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:r}),{success:!0,duration:i,result:l}}let c=Q(o),d=l?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=l?.meta?.writebackDetails||{};return rr(o,{lastStatus:"error",lastError:d,lastDurationMs:i,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||(a===Qt.MANUAL_COMPATIBILITY?ge.COMPATIBILITY_EXECUTE:ge.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),x("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),ve("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:r}),{success:!1,duration:i,error:d,result:l}}catch(l){let i=Date.now()-s,c=Q(o),d=l?.message||String(l);throw rr(o,{lastStatus:"error",lastError:d,lastDurationMs:i,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:a===Qt.MANUAL_COMPATIBILITY?ge.COMPATIBILITY_EXECUTE:ge.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),x("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),ve("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:r}),l}}async function ar(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=Q(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Hs(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),ve("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await Gt({runSource:"MANUAL"});return iu(e,s)}async function nr(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=Q(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await Gt({runSource:"MANUAL_PREVIEW"});return it.previewExtraction(e,s)}var Qt,va,xa=D(()=>{At();er();ms();Vt();Ei();Se();Qt={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},va=null});var Pi={};ie(Pi,{TOOL_CONFIG_PANEL_STYLES:()=>xs,createToolConfigPanel:()=>kt,default:()=>lu});function kt(t){let{id:e,toolId:s,postResponseHint:o,extractionPlaceholder:r,previewDialogId:a,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",toolKindLabel:l="AI \u5DE5\u5177"}=t;return{id:e,toolId:s,render(){let i=Q(this.toolId);if(!i)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let c=this._getApiPresets(),d=i.output?.apiPreset||i.apiPreset||"",u=this._getBypassPresets(),f=i.output?.mode||"follow_ai",y=i.bypass?.enabled||!1,m=i.bypass?.presetId||"",v=i.runtime?.lastStatus||"idle",w=i.runtime?.lastRunAt?new Date(i.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",A=i.runtime?.lastError||"",k=i.extraction||{},C=i.automation||{},F=i.worldbooks||{},K=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:Array.isArray(F.selected)?F.selected:[],W=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],E=String(this.worldbookFilter||"").trim().toLowerCase(),L=E?W.filter(V=>String(V||"").toLowerCase().includes(E)):W,N=K.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":K.length<=2?K.join("\u3001"):`\u5DF2\u9009 ${K.length} \u9879\uFF1A${K.slice(0,2).join("\u3001")} \u7B49`,B=Array.isArray(k.selectors)?k.selectors.join(`
`):"",te=f==="post_response_api"?o:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",ce=f==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",pe=f==="post_response_api",We=d||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${b(i.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${b(i.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${b(ce)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${b(We)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${b(v)}</span>
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
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${te}${pe?" \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u4ECD\u9700\u5728\u5168\u5C40\u8BBE\u7F6E\u4E2D\u5F00\u542F\u81EA\u52A8\u5316\u3002":""}</div>
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
                ${u.map(V=>`
                  <option value="${b(V.id)}" ${V.id===m?"selected":""}>
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
                <input type="checkbox" id="${g}-tool-worldbooks-enabled" ${F.enabled?"checked":""}>
                <span>\u542F\u7528\u4E16\u754C\u4E66\u6CE8\u5165</span>
              </label>
            </div>
            <div class="yyt-form-group">
              <label>\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66\uFF08\u53EF\u591A\u9009\uFF09</label>
              <div class="yyt-worldbook-select" id="${g}-tool-worldbook-select">
                <div class="yyt-worldbook-summary">${b(N)}</div>
                <div class="yyt-worldbook-dropdown" id="${g}-tool-worldbook-dropdown">
                  <input type="text" class="yyt-input yyt-worldbook-search" id="${g}-tool-worldbook-search" placeholder="\u641C\u7D22\u4E16\u754C\u4E66..." value="${b(this.worldbookFilter||"")}">
                  <div class="yyt-worldbook-list" id="${g}-tool-worldbooks">
                    ${W.length>0?L.length>0?L.map(V=>`
                      <div class="yyt-worldbook-item">
                        <label class="yyt-checkbox-label">
                          <input type="checkbox" data-worldbook-name="${b(V)}" ${K.includes(V)?"checked":""}>
                          <span>${b(V)}</span>
                        </label>
                      </div>
                    `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>':`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`}
                  </div>
                  ${this.worldbookLoadState!=="ready"?`
                    <details class="yyt-worldbook-diagnostics">
                      <summary>\u67E5\u770B\u4E16\u754C\u4E66\u8BCA\u65AD</summary>
                      <pre class="yyt-preview-box yyt-preview-pre">${b(JSON.stringify(di()||{state:this.worldbookLoadState||"idle",message:"\u5C1A\u672A\u751F\u6210\u8BCA\u65AD\u4FE1\u606F"},null,2))}</pre>
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
                <input type="number" class="yyt-input" id="${g}-tool-max-messages" min="1" max="50" value="${Number(k.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${g}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${b(r)}">${b(B)}</textarea>
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
                <input type="number" class="yyt-input" id="${g}-tool-automation-settle-ms" min="0" max="10000" step="100" value="${Number(C.settleMs)||1200}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u51B7\u5374\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${g}-tool-automation-cooldown-ms" min="0" max="60000" step="100" value="${Number(C.cooldownMs)||5e3}">
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
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${b(i.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-value">${i.runtime?.successCount||0} / ${i.runtime?.errorCount||0}</span>
                </div>
                ${A?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${b(A)}</span>
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
      `},_getApiPresets(){try{return _t()||[]}catch{return[]}},_getBypassPresets(){try{return ma()||[]}catch{return[]}},async _loadWorldbooks(){this.worldbookLoadState="loading";for(let d=0;d<10;d+=1){try{let u=await ui();if(Array.isArray(u)&&u.length>0)return this.availableWorldbooks=u,this.worldbookLoadState="ready",this.availableWorldbooks}catch{this.availableWorldbooks=Vs()}d<9&&await new Promise(u=>setTimeout(u,400))}return this.availableWorldbooks=Vs(),this.worldbookLoadState="empty",this.availableWorldbooks},_getFormData(i){let c=$(),d=Q(this.toolId)||{};if(!c||!O(i))return d;let u=i.find(`#${g}-tool-output-mode`).val()||"follow_ai",f=i.find(`#${g}-tool-bypass-enabled`).is(":checked"),y=u==="post_response_api",m=(i.find(`#${g}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(w=>w.trim()).filter(Boolean),v=i.find("[data-worldbook-name]:checked").map((w,A)=>String(c(A).data("worldbook-name")||"").trim()).get().filter(Boolean);return{enabled:d?.enabled!==!1,promptTemplate:i.find(`#${g}-tool-prompt-template`).val()||"",apiPreset:i.find(`#${g}-tool-api-preset`).val()||"",extractTags:m,output:{mode:u,apiPreset:i.find(`#${g}-tool-api-preset`).val()||"",overwrite:!0,enabled:y},automation:{enabled:y,settleMs:Math.max(0,parseInt(i.find(`#${g}-tool-automation-settle-ms`).val(),10)||1200),cooldownMs:Math.max(0,parseInt(i.find(`#${g}-tool-automation-cooldown-ms`).val(),10)||5e3)},bypass:{enabled:f,presetId:f&&i.find(`#${g}-tool-bypass-preset`).val()||""},worldbooks:{enabled:i.find(`#${g}-tool-worldbooks-enabled`).is(":checked"),selected:v},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(i.find(`#${g}-tool-max-messages`).val(),10)||5),selectors:m}}},_showExtractionPreview(i,c){if(!$())return;let u=`${g}-${a}`,f=Array.isArray(c.messageEntries)?c.messageEntries:[],y=f.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${f.map((m,v)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${v===f.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${f.length-v} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(m.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(m.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(m.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";i.append(Nt({id:u,title:n,width:"720px",wide:!0,body:`
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
          ${y}
        `})),Bt(i,u,{onSave:m=>m()}),i.find(`#${u}-save`).text("\u5173\u95ED"),i.find(`#${u}-cancel`).remove()},bindEvents(i){let c=$();if(!c||!O(i))return;let d=this,u=()=>i.find("[data-worldbook-name]:checked").map((m,v)=>String(c(v).data("worldbook-name")||"").trim()).get().filter(Boolean),f=()=>{let m=u(),v=m.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":m.length<=2?m.join("\u3001"):`\u5DF2\u9009 ${m.length} \u9879\uFF1A${m.slice(0,2).join("\u3001")} \u7B49`;i.find(".yyt-worldbook-summary").text(v)},y=()=>{let m=String(this.worldbookFilter||"").trim().toLowerCase(),v=i.find(`#${g}-tool-worldbooks`),w=v.find(".yyt-worldbook-item"),A=0;w.each((k,C)=>{let F=c(C),K=String(F.find("[data-worldbook-name]").data("worldbook-name")||"").toLowerCase(),W=!m||K.includes(m);F.toggleClass("yyt-hidden",!W),W&&(A+=1)}),v.find(".yyt-worldbook-search-empty").remove(),w.length>0&&A===0&&v.append('<div class="yyt-tool-compact-hint yyt-worldbook-empty yyt-worldbook-search-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>')};i.off(".yytToolPanel"),i.on("input.yytToolPanel",`#${g}-tool-worldbook-search`,m=>{this.worldbookFilter=String(c(m.currentTarget).val()||""),y()}),y(),i.on("change.yytToolPanel","[data-worldbook-name]",()=>{this.draftSelectedWorldbooks=u(),f()}),i.on("change.yytToolPanel",`#${g}-tool-output-mode`,()=>{let v=(i.find(`#${g}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?`${o} \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u8BB0\u5F97\u540C\u65F6\u5F00\u542F\u5168\u5C40\u81EA\u52A8\u5316\u3002`:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";i.find(".yyt-tool-mode-hint").text(v)}),i.on("change.yytToolPanel",`#${g}-tool-bypass-enabled`,m=>{let v=c(m.currentTarget).is(":checked");i.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!v)}),i.on("click.yytToolPanel",`#${g}-tool-save, #${g}-tool-save-top`,()=>{d._saveConfig(i,{silent:!1})}),i.on("click.yytToolPanel",`#${g}-tool-reset-template`,()=>{let m=gs(d.toolId);m?.promptTemplate&&(i.find(`#${g}-tool-prompt-template`).val(m.promptTemplate),x("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),i.on("click.yytToolPanel",`#${g}-tool-run-manual`,async()=>{if(d._saveConfig(i,{silent:!0}))try{let v=await ar(d.toolId);!v?.success&&v?.error&&ve("warning",v.error,{duration:3200,noticeId:`yyt-tool-run-${d.toolId}`})}catch(v){x("error",v?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{d.renderTo(i)}}),i.on("click.yytToolPanel",`#${g}-tool-preview-extraction`,async()=>{if(d._saveConfig(i,{silent:!0}))try{let v=await nr(d.toolId);if(!v?.success){x("error",v?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}d._showExtractionPreview(i,v)}catch(v){x("error",v?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),Te(i,{namespace:"yytToolPanelSelect",selectors:[`#${g}-tool-output-mode`,`#${g}-tool-api-preset`,`#${g}-tool-bypass-preset`]})},_saveConfig(i,c={}){let d=this._getFormData(i),{silent:u=!1}=c,f=Be(this.toolId,d);return f&&(this.draftSelectedWorldbooks=Array.isArray(d.worldbooks?.selected)?[...d.worldbooks.selected]:[]),f?u||x("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):x("error","\u4FDD\u5B58\u5931\u8D25"),f},destroy(i){!$()||!O(i)||(ye(i,"yytToolPanelSelect"),i.off(".yytToolPanel"))},getStyles(){return xs},renderTo(i){if(!$()||!O(i))return;if(this.worldbookFilter=this.worldbookFilter||"",!Array.isArray(this.draftSelectedWorldbooks)){let u=Q(this.toolId);this.draftSelectedWorldbooks=Array.isArray(u?.worldbooks?.selected)?[...u.worldbooks.selected]:[]}let d=Vs();Array.isArray(d)&&d.length>0?(this.availableWorldbooks=d,this.worldbookLoadState="ready"):this.worldbookLoadState="loading",i.html(this.render({})),this.bindEvents(i,{}),this.worldbookLoadState==="loading"&&Promise.resolve(this._loadWorldbooks()).catch(()=>(this.worldbookLoadState="empty",Vs())).then(u=>{O(i)&&(this.availableWorldbooks=Array.isArray(u)?u:[],this._updateWorldbookList(i))})},_updateWorldbookList(i){if(!$()||!O(i))return;let d=String(this.worldbookFilter||"").trim().toLowerCase(),u=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],f=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:[],y=d?u.filter(w=>String(w||"").toLowerCase().includes(d)):u,m=i.find(`#${g}-tool-worldbooks`);if(!m.length)return;if(u.length===0){m.html(`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`);return}m.html(y.length>0?y.map(w=>`
        <div class="yyt-worldbook-item">
          <label class="yyt-checkbox-label">
            <input type="checkbox" data-worldbook-name="${b(w)}" ${f.includes(w)?"checked":""}>
            <span>${b(w)}</span>
          </label>
        </div>
      `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>');let v=f.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":f.length<=2?f.join("\u3001"):`\u5DF2\u9009 ${f.length} \u9879\uFF1A${f.slice(0,2).join("\u3001")} \u7B49`;i.find(".yyt-worldbook-summary").text(v)}}}var xs,lu,Zt=D(()=>{Se();At();ga();Bs();Js();xa();xs=`
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
`;lu=kt});var qe,wa=D(()=>{Zt();qe=kt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Ge,Ta=D(()=>{Zt();Ge=kt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var Ve,Sa=D(()=>{Zt();Ve=kt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});function Ii(t=[],e={}){return t.map(s=>({...s,checked:e?.[s.key]===!0}))}function ir(t){let{id:e,toolId:s,previewDialogId:o,previewTitle:r="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:a=[],processorOptions:n=[],heroHint:l="",extractionPlaceholder:i=""}=t;return{id:e,toolId:s,render(){let c=Q(this.toolId);if(!c)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let d=c.processor||{},u=c.extraction||{},f=c.runtime?.lastStatus||"idle",y=c.runtime?.lastRunAt?new Date(c.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",m=c.runtime?.lastError||"",v=Array.isArray(u.selectors)?u.selectors.join(`
`):"",w=c.output?.overwrite!==!1,A=Ii(a,{[d.direction||a[0]?.key||""]:!0}),k=Ii(n,d.options||{});return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${b(c.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${b(c.description||"")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u672C\u5730\u811A\u672C\u5904\u7406</span>
              <span class="yyt-tool-hero-chip">\u5199\u56DE ${w?"\u8986\u76D6":"\u8FFD\u52A0"}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${b(f)}</span>
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
                        placeholder="${b(i)}">${b(v)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u5B9A\u4F4D\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u5B9A\u4F4D\u3002\u624B\u52A8\u6267\u884C\u4F1A\u57FA\u4E8E\u6700\u65B0 AI \u6D88\u606F\u5168\u6587\u539F\u4F4D\u66FF\u6362\uFF0C\u5C3D\u91CF\u4FDD\u7559\u5916\u5C42\u6807\u7B7E\u548C\u5176\u4F59\u539F\u6587\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shuffle"></i>
              <span>\u6267\u884C\u79CD\u7C7B</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              ${A.map(C=>`
                <label class="yyt-local-choice-card">
                  <div class="yyt-checkbox-label">
                    <input type="radio" name="${g}-processor-direction-${this.toolId}" value="${b(C.key)}" ${C.checked?"checked":""}>
                    <span>${b(C.label)}</span>
                  </div>
                  <div class="yyt-local-choice-desc">${b(C.description||"")}</div>
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
              ${k.map(C=>`
                <div class="yyt-local-option-card">
                  <label class="yyt-checkbox-label">
                    <span>${b(C.label)}</span>
                    <input type="checkbox" data-option-key="${b(C.key)}" ${C.checked?"checked":""}>
                  </label>
                  <div class="yyt-tool-compact-hint">${b(C.description||"")}</div>
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
                  <input type="radio" name="${g}-output-mode-${this.toolId}" value="replace" ${w?"checked":""}>
                  <span>\u8986\u76D6\u539F\u5DE5\u5177\u5757</span>
                </div>
                <div class="yyt-local-choice-desc">\u4F18\u5148\u66FF\u6362\u8BE5\u5DE5\u5177\u6B64\u524D\u5199\u5165\u7684\u5185\u5BB9\u3002</div>
              </label>
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${g}-output-mode-${this.toolId}" value="append" ${w?"":"checked"}>
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
                ${m?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${b(m)}</span>
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
                <div class="yyt-tool-compact-hint">${b(l||"\u4FDD\u5B58\u540E\u53EF\u76F4\u63A5\u5BF9\u6700\u8FD1 AI \u6D88\u606F\u505A\u672C\u5730\u6587\u672C\u5904\u7406\u3002")}</div>
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
      `},_getFormData(c){let d=$(),u=Q(this.toolId)||{};if(!d||!O(c))return u;let f=(c.find(`#${g}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(w=>w.trim()).filter(Boolean),y=c.find(`input[name="${g}-processor-direction-${this.toolId}"]:checked`).val()||a[0]?.key||"",m=c.find(`input[name="${g}-output-mode-${this.toolId}"]:checked`).val()||"replace",v={};return c.find("[data-option-key]").each((w,A)=>{let k=d(A);v[k.data("option-key")]=k.is(":checked")}),{enabled:c.find(`#${g}-tool-enabled`).is(":checked"),extractTags:f,output:{...u.output||{},mode:"local_transform",overwrite:m!=="append",enabled:!0},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(c.find(`#${g}-tool-max-messages`).val(),10)||5),selectors:f},processor:{...u.processor||{},direction:y,options:v},runtime:{...u.runtime||{}}}},_showExtractionPreview(c,d){if(!$())return;let f=`${g}-${o}`,y=Array.isArray(d.messageEntries)?d.messageEntries:[],m=y.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${y.map((v,w)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${w===y.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${y.length-w} \u6761\u6D88\u606F`}</div>
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
        `:"";c.append(Nt({id:f,title:r,width:"720px",wide:!0,body:`
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
          ${m}
        `})),Bt(c,f,{onSave:v=>v()}),c.find(`#${f}-save`).text("\u5173\u95ED"),c.find(`#${f}-cancel`).remove()},bindEvents(c){if(!$()||!O(c))return;let u=this;c.off(".yytLocalToolPanel"),c.on("click.yytLocalToolPanel",`#${g}-tool-save, #${g}-tool-save-top`,()=>{u._saveConfig(c,{silent:!1})}),c.on("click.yytLocalToolPanel",`#${g}-tool-run-manual`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let y=await ar(u.toolId);!y?.success&&y?.error&&ve("warning",y.error,{duration:3200,noticeId:`yyt-tool-run-${u.toolId}`})}catch(y){x("error",y?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{u.renderTo(c)}}),c.on("click.yytLocalToolPanel",`#${g}-tool-preview-extraction`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let y=await nr(u.toolId);if(!y?.success){x("error",y?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}u._showExtractionPreview(c,y)}catch(y){x("error",y?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),c.on("click.yytLocalToolPanel",`#${g}-tool-reset-template`,()=>{let f=gs(u.toolId);f?.promptTemplate&&(c.find(`#${g}-tool-prompt-template`).val(f.promptTemplate),x("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))})},_saveConfig(c,d={}){let u=this._getFormData(c),{silent:f=!1}=d,y=Be(this.toolId,u);return y?f||x("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):x("error","\u4FDD\u5B58\u5931\u8D25"),y},destroy(c){!$()||!O(c)||c.off(".yytLocalToolPanel")},getStyles(){return cu},renderTo(c){c.html(this.render({})),this.bindEvents(c,{})}}}var cu,_a=D(()=>{Se();At();xa();Zt();cu=`${xs}
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
`});var Je,Ea=D(()=>{_a();Je=ir({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]})});var Xe,Aa=D(()=>{_a();Xe=ir({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]})});var es,ka=D(()=>{me();Js();Se();es={id:"bypassPanel",render(t){let e=Y.getPresetList(),s=Y.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let s=bt&&bt[t.id];return`
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
          <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
        </div>
      `;let e=Y.getDefaultPresetId()===t.id,s=bt&&bt[t.id];return`
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
    `},bindEvents(t,e){let s=$();!s||!O(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s),Te(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let o=e(s.currentTarget).data("presetId");this._selectPreset(t,e,o)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let o=e(s.currentTarget).data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=Y.deletePreset(o);r.success?(t.find(".yyt-bypass-editor-content").data("presetId")===o&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),x("success","\u9884\u8BBE\u5DF2\u5220\u9664")):x("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-delete-message",s=>{let o=e(s.currentTarget).closest(".yyt-bypass-message"),r=o.data("messageId");o.remove()}),t.on("change.yytBypass",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async s=>{let o=s.target.files[0];if(o){try{let r=await pt(o),a=Y.importPresets(r);x(a.success?"success":"error",a.message),a.success&&this.renderTo(t)}catch(r){x("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let s=Y.exportPresets();yt(s,`bypass_presets_${Date.now()}.json`),x("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){x("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let o=Y.getPreset(s);o&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(o)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,o=Y.createPreset({id:s,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});o.success?(this.renderTo(t),this._selectPreset(t,e,s),x("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):x("error",o?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),o=s.data("presetId");if(!o)return;let r=s.find(".yyt-bypass-name-input").val().trim(),a=s.find("#yyt-bypass-description").val().trim();if(!r){x("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let n=[];s.find(".yyt-bypass-message").each(function(){let i=e(this);n.push({id:i.data("messageId"),role:i.find(".yyt-bypass-role-select").val(),content:i.find(".yyt-bypass-message-content").val(),enabled:i.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let l=Y.updatePreset(o,{name:r,description:a,messages:n});l.success?(x("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):x("error",l?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let o=t.find(".yyt-bypass-editor-content").data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=Y.deletePreset(o);r.success?(this.renderTo(t),x("success","\u9884\u8BBE\u5DF2\u5220\u9664")):x("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let o=t.find(".yyt-bypass-editor-content").data("presetId");if(!o)return;let r=`bypass_${Date.now()}`,a=Y.duplicatePreset(o,r);a.success?(this.renderTo(t),this._selectPreset(t,e,r),x("success","\u9884\u8BBE\u5DF2\u590D\u5236")):x("error",a?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let o=t.find(".yyt-bypass-editor-content").data("presetId");o&&(Y.setDefaultPresetId(o),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),x("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(o))},_refreshPresetList(t,e){let s=Y.getPresetList(),o=Y.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(r=>this._renderPresetItem(r,r.id===o)).join(""))},destroy(t){!$()||!O(t)||(ye(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Li={};ie(Li,{SettingsPanel:()=>ht,applyTheme:()=>Di,applyUiPreferences:()=>Ma,default:()=>uu});function ws({id:t,checked:e=!1,title:s="",hint:o=""}){return`
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
  `}function Ri(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function so(){return Ri()?.document||document}function Oi(t=so()){return t?.documentElement||document.documentElement}function Di(t,e=so()){let s=Oi(e),o={...du,...$i[t]||$i["dark-blue"]};Object.entries(o).forEach(([r,a])=>{s.style.setProperty(r,a)}),s.setAttribute("data-yyt-theme",t)}function Ma(t={},e=so()){let s=Oi(e),{theme:o="dark-blue",compactMode:r=!1,animationEnabled:a=!0}=t||{};Di(o,e),s.classList.toggle("yyt-compact-mode",!!r),s.classList.toggle("yyt-no-animation",!a)}var du,$i,ht,uu,lr=D(()=>{me();Qs();eo();Se();du={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-2":"rgba(255, 255, 255, 0.05)","--yyt-surface-3":"rgba(255, 255, 255, 0.075)","--yyt-surface-hover":"rgba(255, 255, 255, 0.08)","--yyt-surface-active":"rgba(255, 255, 255, 0.11)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-soft":"rgba(255, 255, 255, 0.05)","--yyt-border-strong":"rgba(255, 255, 255, 0.16)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.72)","--yyt-text-muted":"rgba(255, 255, 255, 0.5)","--yyt-focus-ring":"0 0 0 3px rgba(123, 183, 255, 0.18)","--yyt-on-accent":"#0b0f15"},$i={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.72)","--yyt-text-muted":"rgba(15, 23, 42, 0.52)","--yyt-surface":"rgba(255, 255, 255, 0.66)","--yyt-surface-2":"rgba(255, 255, 255, 0.86)","--yyt-surface-3":"rgba(255, 255, 255, 0.94)","--yyt-surface-hover":"rgba(255, 255, 255, 0.92)","--yyt-surface-active":"rgba(255, 255, 255, 0.98)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.05)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 3px rgba(59, 130, 246, 0.14)","--yyt-on-accent":"#0f172a"}};ht={id:"settingsPanel",render(){let t=Ie.getSettings(),e=t.debug?.enableDebugLog===!0,s=t.automation?.enabled===!0,o=this._getAutomationRuntime();return`
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
    `},_renderAutomationTab(t={},e=null){let s=t.enabled===!0,o=Array.isArray(e?.recentTransactions)?e.recentTransactions.slice().reverse():[],r=e?.hostBinding||{},a=Array.isArray(r.eventBindings)&&r.eventBindings.length>0?r.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",n=o.length>0?o.map(l=>{let i=l?.results?.[0]?.meta?.writebackDetails?.refresh||{},c=Array.isArray(i?.requestMethods)?i.requestMethods.join(" / "):"",d=i?.eventSource||i?.eventName||c||i?.confirmedBy;return`
          <div class="yyt-settings-runtime-item">
            <div class="yyt-settings-runtime-meta">
              <span>${l?.sourceEvent||"UNKNOWN_EVENT"}</span>
              <span>${l?.phase||"unknown"}</span>
              <span>${l?.messageId||"no_message_id"}</span>
            </div>
            <div class="yyt-settings-runtime-main">${l?.verdict||l?.error||l?.generationKey||"\u65E0\u989D\u5916\u4FE1\u606F"}</div>
            ${d?`<div class="yyt-form-hint">\u5237\u65B0\uFF1A<code>${i?.eventSource||"unavailable"}</code> / <code>${i?.eventName||"MESSAGE_UPDATED"}</code>\uFF1B\u8BF7\u6C42\uFF1A<code>${c||"none"}</code>\uFF1B\u786E\u8BA4\uFF1A<code>${i?.confirmed?i?.confirmedBy||"success":"pending_or_failed"}</code>\uFF1B\u68C0\u67E5\uFF1A<code>${i?.confirmChecks||0}</code></div>`:""}
          </div>
        `}).join(""):'<div class="yyt-form-hint">\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002</div>';return`
      <div class="yyt-settings-tab-content" data-tab="automation">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u81EA\u52A8\u89E6\u53D1\u603B\u5F00\u5173</div>
          <div class="yyt-form-group">
            ${ws({id:"yyt-setting-automationEnabled",checked:t.enabled,title:"\u542F\u7528\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1",hint:"\u8FD9\u91CC\u53EA\u4FDD\u7559\u4E00\u4E2A\u5168\u5C40\u5F00\u5173\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u5904\u4E8E\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u7684\u5DE5\u5177\u90FD\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\u3002"})}
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
            ${ws({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F"})}
          </div>

          <div class="yyt-form-group">
            ${ws({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${ws({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${ws({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${ws({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return Ue.getAvailableVariables().map(t=>`
        <div class="yyt-settings-macro-item">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=$();if(!e||!O(t))return;let s=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let r=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${r}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{s._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ie.resetSettings(),Ma(Xs.ui,so()),s.renderTo(t),x("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),Te(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]})},_saveSettings(t){let e={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{enabled:t.find("#yyt-setting-automationEnabled").is(":checked"),settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Ie.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ie.saveSettings(e),Ma(e.ui,so()),x("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return Ri()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!$()||!O(t)||(ye(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},uu=ht});function re(t){return t==null?"":String(t).trim()}function _e(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Ts(t={}){return{chatId:re(t.chatId),sourceMessageId:re(t.sourceMessageId||t.messageId),sourceSwipeId:re(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:re(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:re(t.slotBindingKey),slotRevisionKey:re(t.slotRevisionKey),slotTransactionId:re(t.slotTransactionId),traceId:re(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function Ca(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:re(t.runSource)||lt.MANUAL,traceId:re(t.traceId),chatId:re(t.chatId),sourceMessageId:re(t.sourceMessageId||t.messageId),sourceSwipeId:re(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:re(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:re(t.slotBindingKey),slotRevisionKey:re(t.slotRevisionKey),slotTransactionId:re(t.slotTransactionId),assistantContentFingerprint:re(t.assistantContentFingerprint),assistantBaseFingerprint:re(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function ro(t){return!t||typeof t!="object"?null:{slotBindingKey:re(t.slotBindingKey),slotRevisionKey:re(t.slotRevisionKey),sourceMessageId:re(t.sourceMessageId),sourceSwipeId:re(t.sourceSwipeId),tables:Array.isArray(t.tables)?_e(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?_e(t.meta):{}}}function dr(t={},e={}){let s=Ca(t);return{slotBindingKey:s.slotBindingKey,slotRevisionKey:s.slotRevisionKey,sourceMessageId:s.sourceMessageId,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId,tables:Array.isArray(e.tables)?_e(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:e.meta&&typeof e.meta=="object"?_e(e.meta):{}}}function ur(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?Ts(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?Ts(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}var cr,Ss,lt,oo,_s=D(()=>{cr="YouYouToolkit_tableState",Ss="YouYouToolkit_tableBindings",lt=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),oo=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",TEMPLATE:"template",EMPTY:"empty"})});function le(t,e=""){return t==null?e:String(t).trim()||e}function pu(t,e=!1){return t==null?e:t===!0}function gu(t){return Array.isArray(t)?_e(t):[]}function Ni(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function fu(t,e="col"){return le(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function Ui(t,e=new Set){let s=fu(t,"col"),o=s,r=2;for(;e.has(o);)o=`${s}_${r}`,r+=1;return e.add(o),o}function mu(t=[]){let e=[],s=0;return t.forEach(o=>{let r=o&&typeof o=="object"?o:{},a=r.cells&&typeof r.cells=="object"&&!Array.isArray(r.cells)?r.cells:null,n=Array.isArray(r.cells)?r.cells:Array.isArray(r.values)?r.values:null;a&&Object.keys(a).forEach(l=>{e.includes(l)||e.push(l)}),n&&n.length>s&&(s=n.length)}),e.length>0?e.map(o=>({key:o,title:String(o)})):s>0?Array.from({length:s},(o,r)=>({key:`col_${r+1}`,title:`\u5217${r+1}`})):[]}function bu(t={},e=0,s=new Set){let o=t&&typeof t=="object"?t:{},r=le(o.title||o.name||o.label,`\u5217${e+1}`),a=le(o.key||o.id,""),n=Ui(a||r||`col_${e+1}`,s),l=[a,le(o.title,""),le(o.name,""),le(o.label,"")].filter(Boolean);return{key:n,title:r,sourceKeys:l}}function hu(t={},e={},s=0){let o=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,r=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(o){let a=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let n of a)if(o[n]!==void 0)return Ni(o[n])}return r&&r[s]!==void 0?Ni(r[s]):""}function vu(t={},e=[],s=0){let o=t&&typeof t=="object"?t:{},r={};return e.forEach((a,n)=>{r[a.key]=hu(o,a,n)}),{name:le(o.name||o.title||o.label,`\u884C${s+1}`),cells:r}}function zi(t={},e=0){let s=t&&typeof t=="object"?t:{},o=new Set,a=(Array.isArray(s.columns)&&s.columns.length>0?s.columns:mu(Array.isArray(s.rows)?s.rows:[])).map((l,i)=>bu(l,i,o)),n=Array.isArray(s.rows)?s.rows.map((l,i)=>vu(l,a,i)):[];return{name:le(s.name||s.title,`\u8868${e+1}`),note:le(s.note||s.description,""),columns:a.map(l=>({key:l.key,title:l.title})),rows:n}}function ji(t={}){let e=t&&typeof t=="object"?t:{};return{lastStatus:le(e.lastStatus,ao.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:le(e.lastError,""),successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:le(e.lastSourceMessageId,""),lastSlotRevisionKey:le(e.lastSlotRevisionKey,""),lastLoadMode:le(e.lastLoadMode,""),lastMirrorApplied:e.lastMirrorApplied===!0}}function $a(t=1,e=[]){let s=new Set((Array.isArray(e)?e:[]).map(r=>le(r?.key,"")).filter(Boolean));return{key:Ui(`col_${t}`,s),title:`\u5217${t}`}}function xu(t=[],e=1){let s={};return(Array.isArray(t)?t:[]).forEach(o=>{let r=le(o?.key,"");r&&(s[r]="")}),{name:`\u884C${e}`,cells:s}}function Ra(t=1){let e=$a(1);return{name:`\u8868${t}`,note:"",columns:[e],rows:[xu([e],1)]}}function wu(){return{tables:[]}}function Wi(t=[]){return!Array.isArray(t)||t.length===0?wu():{tables:t.map((e,s)=>zi(e,s))}}function Oa(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((o,r)=>zi(o,r))}function Da(t={}){let e=[];(!t||typeof t!="object")&&e.push("\u8868\u5B9A\u4E49\u8349\u7A3F\u65E0\u6548\u3002"),t&&t.tables!==void 0&&!Array.isArray(t.tables)&&e.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u5305\u542B tables \u6570\u7EC4\u3002");let s=[];if(e.length===0)try{s=Oa(t)}catch(o){e.push(o?.message||"\u8868\u5B9A\u4E49\u7F16\u8BD1\u5931\u8D25\u3002")}return{valid:e.length===0,errors:e,tables:s}}function Fi(){return{tables:[],promptTemplate:Bi,apiPreset:"",mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",runtime:ji()}}function Qe(t={}){let e=Fi(),s=t&&typeof t=="object"?t:{};return{tables:gu(s.tables),promptTemplate:le(s.promptTemplate,e.promptTemplate),apiPreset:le(s.apiPreset,""),mirrorToMessage:pu(s.mirrorToMessage,e.mirrorToMessage),mirrorTag:le(s.mirrorTag,e.mirrorTag),runtime:ji({...e.runtime,...s.runtime||{}})}}function La(t={}){let e=Qe(t),s=[];return Array.isArray(e.tables)||s.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||s.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||s.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:s.length===0,errors:s,config:e}}function ts(){let t=Pa.get(Ia,Fi());return Qe(t)}function Ki(t={}){let e=ts(),s=Qe({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),o=La(s);return o.valid?(Pa.set(Ia,o.config),{success:!0,config:o.config}):{success:!1,error:o.errors.join(`
`),errors:o.errors,config:o.config}}function yr(t={}){let e=ts(),s=Qe({...e,runtime:{...e.runtime,...t||{}}});return Pa.set(Ia,s),s.runtime}function Tu(t={}){let e=Qe(t);return`${le(e.promptTemplate,Bi)}

${yu}`.trim()}function Hi(t={}){return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Tu(t),bypass:{enabled:!1}}}function Yi({apiPresets:t=[]}={}){let e=[{value:"",label:"\u5F53\u524D API \u914D\u7F6E"},...t.map(s=>({value:String(s?.name||""),label:String(s?.name||"")})).filter(s=>s.value)];return[{name:"tables",type:"tableDefinitions",label:"\u8868\u5B9A\u4E49",description:"\u901A\u8FC7\u7ED3\u6784\u5316\u7F16\u8F91\u5668\u7EF4\u62A4 tables\u3002\u9996\u6B21\u6267\u884C\u6216\u5F53\u524D\u6D88\u606F\u5C1A\u65E0\u7ED1\u5B9A state \u65F6\uFF0C\u4F1A\u4EE5\u7F16\u8BD1\u540E\u7684 tables \u4F5C\u4E3A merge base\u3002",emptyValue:[]},{name:"promptTemplate",type:"textarea",label:"\u586B\u8868 Prompt",rows:12,description:"\u53EF\u4F7F\u7528 {{lastUserMessage}}\u3001{{lastAiMessage}}\u3001{{chatHistory}}\u3001{{toolContentMacro}} \u7B49\u53D8\u91CF\u3002\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u8FFD\u52A0 JSON \u8F93\u51FA\u7EA6\u675F\u3002"},{name:"apiPreset",type:"select",label:"API \u9884\u8BBE",description:"\u4E3A\u7A7A\u65F6\u4F7F\u7528\u5F53\u524D\u5168\u5C40 API \u914D\u7F6E\u3002",options:e},{name:"mirrorToMessage",type:"checkbox",label:"\u955C\u50CF\u5199\u56DE\u6B63\u6587",description:"\u628A\u5F53\u524D tables \u7684 JSON \u9884\u89C8\u955C\u50CF\u5230\u76EE\u6807 assistant \u6D88\u606F\u6B63\u6587\u4E2D\u3002"}]}var Pa,Ia,ao,Bi,yu,no=D(()=>{Oe();_s();Pa=_.namespace("tableWorkbench"),Ia="config",ao=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"}),Bi=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u66F4\u65B0\u7ED3\u6784\u5316 tables \u6570\u636E\u3002

\u8981\u6C42\uFF1A
1. \u53EA\u4F9D\u636E\u5F53\u524D\u5BF9\u8BDD\u5185\u5BB9\u66F4\u65B0\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002
2. \u4FDD\u6301\u539F\u6709\u8868\u7ED3\u6784\uFF1B\u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\u3002
3. \u5982\u679C\u67D0\u5B57\u6BB5\u9700\u8981\u6E05\u7A7A\uFF0C\u8BF7\u663E\u5F0F\u8F93\u51FA\u7A7A\u5B57\u7B26\u4E32\u3001\u7A7A\u6570\u7EC4\u6216 null\u3002
4. \u4F18\u5148\u53C2\u8003\u5F53\u524D assistant \u56DE\u590D\uFF1A{{lastAiMessage}}
5. \u5F53\u524D\u8868\u683C\u57FA\u5E95 JSON\uFF1A
{{toolContentMacro}}`,yu=`\u8F93\u51FA\u8981\u6C42\uFF1A
- \u53EA\u8FD4\u56DE JSON
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown
- JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}`});function qi(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Su(t,e){if(t.type==="json"){let s=e===void 0?t.emptyValue:e;if(typeof s=="string")return s;try{return JSON.stringify(s??null,null,2)}catch{return String(s??"")}}return String(e??"")}function _u(t={},e=""){let s=String(t.name||"").trim(),o=`yyt-table-field-${s}`,r=`${o}-value`,a=`${o}-dropdown`,n=bo(t.options||[]);return ho({selectedValue:e,options:n,placeholder:n[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{"data-table-custom-select":"true"},nativeAttributes:{class:"yyt-table-select-native",id:r,"data-table-field":s,"data-field-type":"select"},triggerAttributes:{id:o,"data-table-select-trigger":"true","aria-controls":a},dropdownAttributes:{id:a,"data-table-select-dropdown":"true"},optionAttributes:{"data-table-select-option":"true"}})}function Eu(t={},e={},s=0){let o=t&&typeof t=="object"?t.cells:null;if(Array.isArray(o))return String(o[s]??"");if(o&&typeof o=="object"){if(o[e.key]!==void 0)return String(o[e.key]??"");if(o[e.title]!==void 0)return String(o[e.title]??"")}return""}function Vi(t={}){return Wi(Oa(t))}function Au(t={},e={},s=0,o=0){let r=Array.isArray(t.columns)?t.columns:[];return`
    <tr data-table-editor-row="${o}">
      <td>
        <input type="text" class="yyt-input" data-table-editor-row-name value="${b(String(e?.name||""))}" placeholder="\u884C\u540D">
      </td>
      ${r.map((a,n)=>`
        <td>
          <textarea class="yyt-textarea yyt-code-textarea-small"
                    data-table-editor-cell
                    data-column-index="${n}"
                    rows="2"
                    placeholder="${b(a.title||a.key||`\u5217${n+1}`)}">${b(Eu(e,a,n))}</textarea>
        </td>
      `).join("")}
      <td>
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-row" data-table-index="${s}" data-row-index="${o}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `}function Ji(t={},e=0,s={}){let o=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[],a=String(t?.name||"").trim(),n=String(t?.note||"").trim(),i=s.showDeleteTable!==!1?`
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-table" data-table-index="${e}">
          <i class="fa-solid fa-trash"></i> \u5220\u9664\u8868\u683C
        </button>
      `:"",c=[`\u8868\u683C ${e+1}`,`${o.length} \u5217`,`${r.length} \u884C`];return n&&c.push("\u5DF2\u586B\u5199\u8BF4\u660E"),`
    <div class="yyt-table-editor-card" data-table-editor-table="${e}">
      <div class="yyt-table-editor-card-head">
        <div>
          <div class="yyt-table-editor-card-title">${b(a||`\u8868\u683C ${e+1}`)}</div>
          <div class="yyt-table-editor-card-subtitle">${b(c.join(" \xB7 "))}</div>
        </div>
        ${i}
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
              ${r.length?r.map((d,u)=>Au(t,d,e,u)).join(""):`
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
  `}function ku(t={},e=0,s={}){let o=Array.isArray(t?.columns)?t.columns:[],r=Array.isArray(t?.rows)?t.rows:[],a=s.mode==="create"?"create":"edit";return`
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
      ${Ji(t,e,{showDeleteTable:!1})}
    </div>
  `}function Xi(t={}){let e=Array.isArray(t?.tables)?t.tables:[],s=e.reduce((r,a)=>r+(Array.isArray(a?.columns)?a.columns.length:0),0),o=e.reduce((r,a)=>r+(Array.isArray(a?.rows)?a.rows.length:0),0);return`
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
        ${e.length?e.map((r,a)=>Ji(r,a)).join(""):`
          <div class="yyt-table-editor-empty">
            <div class="yyt-table-editor-section-title">\u8FD8\u6CA1\u6709\u8868\u5B9A\u4E49</div>
            <div class="yyt-table-editor-muted">\u70B9\u51FB\u53F3\u4FA7\u201C\u65B0\u589E\u8868\u683C\u201D\u5F00\u59CB\u914D\u7F6E\u8868\u540D\u3001\u5217\u7ED3\u6784\u548C\u884C\u5185\u5BB9\u3002</div>
          </div>
        `}
      </div>
    </div>
  `}function Mu(t={},e={}){let s=String(t.name||"").trim(),o=b(t.label||s),r=t.description?`<div class="yyt-table-form-field-desc">${b(t.description)}</div>`:"",a=Vi({tables:Array.isArray(e[s])?e[s]:[]});return`
    <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
      <label>${o}</label>
      <div class="yyt-table-editor" data-table-field="${b(s)}" data-field-type="tableDefinitions" data-table-definition-root>
        ${Xi(a)}
      </div>
      ${r}
    </div>
  `}function Cu(t,e={},s={}){if(!$()||!O(t))return null;let r=s.mode==="create"?"create":"edit",a=`yyt-table-definition-dialog-${Date.now()}`,n=Nt({id:a,title:r==="create"?"\u65B0\u589E\u8868\u683C":"\u7F16\u8F91\u8868\u683C",body:ku(e,0,{mode:r}),wide:!0,width:"min(900px, calc(100vw - 32px))",dialogClass:"yyt-table-editor-dialog",bodyClass:"yyt-table-editor-dialog-body",footerClass:"yyt-table-editor-dialog-footer"});return t.append(n),t.find(`#${a}-save`).html(`<i class="fa-solid fa-check"></i> ${r==="create"?"\u6DFB\u52A0\u8868\u683C":"\u4FDD\u5B58\u8868\u683C"}`),t.find(`#${a}-cancel`).html('<i class="fa-solid fa-arrow-left"></i> \u8FD4\u56DE'),t.find(`#${a}-cancel`).before('<div class="yyt-table-editor-dialog-note">\u4FDD\u5B58\u540E\u4F1A\u628A\u5F53\u524D\u8868\u5199\u56DE\u8868\u5B9A\u4E49\u5217\u8868\uFF0C\u4E0D\u4F1A\u76F4\u63A5\u5F71\u54CD\u5176\u5B83\u8868\u3002</div>'),Bt(t,a,{onSave:l=>{let i=t.find(`#${a}-overlay [data-table-dialog-root]`),c=Da(io(i));if(!c.valid){x("error",c.errors.join(`
`));return}typeof s.onSave=="function"&&s.onSave(c.tables[0]||Ra(1)),l()},onClose:()=>{typeof s.onClose=="function"&&s.onClose()}}),a}function Pu(t={},e={}){let s=String(t.name||"").trim();if(!s)return"";if(t.type==="tableDefinitions")return Mu(t,e);let o=e[s],r=b(t.label||s),a=t.description?`<div class="yyt-table-form-field-desc">${b(t.description)}</div>`:"",n=Number.isFinite(t.rows)?t.rows:6;return t.type==="checkbox"?`
      <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
        <label class="yyt-table-form-inline-checkbox">
          <input type="checkbox" data-table-field="${b(s)}" data-field-type="checkbox" ${o===!0?"checked":""}>
          <span>${r}</span>
        </label>
        ${a}
      </div>
    `:t.type==="select"?`
      <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
        <label for="yyt-table-field-${b(s)}">${r}</label>
        ${_u(t,o)}
        ${a}
      </div>
    `:`
    <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
      <label for="yyt-table-field-${b(s)}">${r}</label>
      <textarea class="yyt-textarea yyt-code-textarea ${t.type==="json"?"":"yyt-code-textarea-small"}"
                id="yyt-table-field-${b(s)}"
                data-table-field="${b(s)}"
                data-field-type="${b(t.type||"textarea")}"
                rows="${n}">${b(Su(t,o))}</textarea>
      ${a}
    </div>
  `}function io(t){let e=$();return!e||!t?.length?{tables:[]}:{tables:t.find("[data-table-editor-table]").map((o,r)=>{let a=e(r),n=a.find("[data-table-editor-column]").map((i,c)=>{let d=e(c);return{title:String(d.find("[data-table-editor-column-title]").val()||""),key:String(d.find("[data-table-editor-column-key]").val()||"")}}).get(),l=a.find("[data-table-editor-row]").map((i,c)=>{let d=e(c);return{name:String(d.find("[data-table-editor-row-name]").val()||""),cells:d.find("[data-table-editor-cell]").map((u,f)=>String(e(f).val()||"")).get()}}).get();return{name:String(a.find("[data-table-editor-table-name]").val()||""),note:String(a.find("[data-table-editor-table-note]").val()||""),columns:n,rows:l}}).get()}}function Iu(t=[],e=1){return{name:`\u884C${e}`,cells:Array.from({length:Array.isArray(t)?t.length:0},()=>"")}}function Na(t,e={},s={}){t.html(Xi(Vi(s)))}function Qi(t,e=[],s={}){let o=$();if(!o||!O(t))return;let r=Array.isArray(e)?e:[],a=i=>{let c=String(i.attr("data-table-field")||"").trim();return r.find(d=>String(d?.name||"").trim()===c)||{name:c}},n=()=>{typeof s.onChange=="function"&&s.onChange()};t.off(".yytTableForm"),t.on("click.yytTableForm","[data-table-definition-root] [data-table-editor-action]",i=>{i.preventDefault();let c=o(i.currentTarget),d=String(c.attr("data-table-editor-action")||"").trim(),u=c.closest("[data-table-definition-root]");if(!u.length)return;let f=a(u),y=io(u),m=Array.isArray(y.tables)?y.tables:[],v=Number.parseInt(c.attr("data-table-index")||"",10),w=Number.parseInt(c.attr("data-column-index")||"",10),A=Number.parseInt(c.attr("data-row-index")||"",10);if(d==="add-table"){Cu(t,Ra(m.length+1),{mode:"create",onSave:k=>{let C=io(u),F=Array.isArray(C.tables)?C.tables:[];F.push(k),Na(u,f,{tables:F}),n()}});return}if(d==="delete-table"&&Number.isInteger(v)&&v>=0&&v<m.length&&m.splice(v,1),d==="add-column"&&Number.isInteger(v)&&v>=0&&v<m.length){let k=m[v]||{},C=Array.isArray(k.columns)?k.columns:[],F=$a(C.length+1,C);k.columns=[...C,{key:F.key,title:F.title}],k.rows=(Array.isArray(k.rows)?k.rows:[]).map((K,W)=>({name:String(K?.name||`\u884C${W+1}`),cells:[...Array.isArray(K?.cells)?K.cells:[],""]}))}if(d==="delete-column"&&Number.isInteger(v)&&v>=0&&v<m.length){let k=m[v]||{},C=Array.isArray(k.columns)?k.columns:[];Number.isInteger(w)&&w>=0&&w<C.length&&(k.columns=C.filter((F,K)=>K!==w),k.rows=(Array.isArray(k.rows)?k.rows:[]).map((F,K)=>{let W=Array.isArray(F?.cells)?[...F.cells]:[];return W.splice(w,1),{name:String(F?.name||`\u884C${K+1}`),cells:W}}))}if(d==="add-row"&&Number.isInteger(v)&&v>=0&&v<m.length){let k=m[v]||{},C=Array.isArray(k.columns)?k.columns:[],F=Array.isArray(k.rows)?k.rows:[];k.rows=[...F,Iu(C,F.length+1)]}if(d==="delete-row"&&Number.isInteger(v)&&v>=0&&v<m.length){let k=m[v]||{},C=Array.isArray(k.rows)?k.rows:[];Number.isInteger(A)&&A>=0&&A<C.length&&(k.rows=C.filter((F,K)=>K!==A))}Na(u,f,{tables:m}),n()}),t.on("input.yytTableForm","[data-table-definition-root] input, [data-table-definition-root] textarea",()=>{n()}),t.on("click.yytTableForm","[data-table-select-trigger]",i=>{i.preventDefault(),i.stopPropagation();let c=o(i.currentTarget),d=c.closest("[data-table-custom-select]"),u=d.hasClass("yyt-open");t.find("[data-table-custom-select].yyt-open").not(d).removeClass("yyt-open").find("[data-table-select-trigger]").attr("aria-expanded","false"),d.toggleClass("yyt-open",!u),c.attr("aria-expanded",String(!u))}),t.on("click.yytTableForm","[data-table-select-option]",i=>{i.preventDefault(),i.stopPropagation();let c=o(i.currentTarget),d=c.closest("[data-table-custom-select]"),u=String(c.attr("data-value")||""),f=c.find(".yyt-option-text").text();d.find(".yyt-table-select-native").val(u).trigger("change"),d.find(".yyt-select-value").text(f).attr("data-value",u).data("value",u),d.find("[data-table-select-option]").removeClass("yyt-selected").attr("aria-selected","false"),c.addClass("yyt-selected").attr("aria-selected","true"),d.removeClass("yyt-open"),d.find("[data-table-select-trigger]").attr("aria-expanded","false"),n()}),t.on("change.yytTableForm",'[data-table-field][data-field-type="select"]',()=>{n()}),t.on("change.yytTableForm","[data-table-definition-root] [data-table-editor-column-key], [data-table-definition-root] [data-table-editor-column-title]",i=>{let c=o(i.currentTarget).closest("[data-table-definition-root]");if(!c.length)return;let d=a(c);Na(c,d,io(c)),n()});let l=ut();o(l).off("click.yytTableFormSelect").on("click.yytTableFormSelect",i=>{o(i.target).closest(t).length||t.find("[data-table-custom-select].yyt-open").removeClass("yyt-open").find("[data-table-select-trigger]").attr("aria-expanded","false")})}function Zi(t){let e=$();!e||!O(t)||(t.off(".yytTableForm"),e(ut()).off("click.yytTableFormSelect"))}function el(t=[],e={}){return`
    <div class="yyt-table-form-grid">
      ${(Array.isArray(t)?t:[]).map(o=>Pu(o,e)).join("")}
    </div>
  `}function Ba(t,e=[]){let s=Array.isArray(e)?e:[],o={},r=[];return s.forEach(a=>{let n=String(a?.name||"").trim();if(!n)return;let l=t.find(`[data-table-field="${n}"]`);if(!l.length)return;if(a.type==="tableDefinitions"){let c=Da(io(l));if(!c.valid){c.errors.forEach(d=>{r.push(`${a.label||n}\uFF1A${d}`)});return}o[n]=qi(c.tables);return}if(a.type==="checkbox"){o[n]=l.is(":checked");return}let i=String(l.val()||"");if(a.type==="json"){let c=i.trim();if(!c){o[n]=qi(a.emptyValue);return}try{o[n]=JSON.parse(c)}catch(d){r.push(`${a.label||n} \u4E0D\u662F\u5408\u6CD5 JSON\uFF1A${d?.message||String(d)}`)}return}o[n]=i}),{values:o,errors:r}}var Gi,tl=D(()=>{Se();no();Gi=`
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
    background: transparent;
    color: inherit;
    text-align: left;
    font: inherit;
    appearance: none;
    -webkit-appearance: none;
  }

  .yyt-table-form-field button.yyt-select-option:hover {
    background: rgba(123, 183, 255, 0.1);
    border-color: rgba(123, 183, 255, 0.14);
    transform: translateY(-1px);
  }

  .yyt-table-form-field button.yyt-select-option.yyt-selected {
    background: linear-gradient(135deg, rgba(123, 183, 255, 0.18) 0%, rgba(123, 183, 255, 0.07) 100%);
    border-color: rgba(123, 183, 255, 0.28);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
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
`});function $u(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(s=>X(s))}function Ru(t=[],e=""){let s=X(e);if(!s||!Array.isArray(t))return-1;for(let o=t.length-1;o>=0;o-=1){let r=t[o];if($u(r,o).includes(s))return o}return-1}function pr(t={},e={}){let s=X(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!s)return null;let o=Ca({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||lt.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:s,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:Ru(t?.chatMessages||t?.chatHistory||[],s)});return!o.slotBindingKey||!o.slotRevisionKey?null:o}async function Ua({runSource:t=lt.MANUAL}={}){let e=await Gt({runSource:t});return pr(e,{runSource:t})}async function Ou({messageId:t,swipeId:e="",runSource:s=lt.AUTO}={}){let o=await qs({messageId:t,swipeId:e,runSource:s});return pr(o,{runSource:s})}async function sl(t=null,e={}){let s=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(s);let o=X(e.runSource||s?.runSource)||lt.MANUAL,r=X(e.messageId||s?.sourceMessageId),a=X(e.swipeId||s?.sourceSwipeId||s?.effectiveSwipeId);return e.useMessageTarget===!0||o===lt.AUTO?r?Ou({messageId:r,swipeId:a,runSource:o}):null:Ua({runSource:o})}function ol(t,e){let s=t||null,o=e||null;return!s||!o?{valid:!1,reason:"missing_target_snapshot"}:X(s.sourceMessageId)!==X(o.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:X(s.sourceSwipeId||s.effectiveSwipeId)!==X(o.sourceSwipeId||o.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:X(s.slotRevisionKey)!==X(o.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var gr=D(()=>{ms();_s()});function ct(t){return t==null?"":String(t).trim()}function Du(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Lu(){try{let t=Du(),e=t?.SillyTavern||null,s=e?.getContext?.()||null,o=Array.isArray(s?.chat)?s.chat:[],r=Array.isArray(e?.chat)?e.chat:[],a=o.length?o:r;return{topWindow:t,api:e,context:s,chat:a,contextChat:o,apiChat:r}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function Nu(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function Bu(t=[],e=""){let s=ct(e);if(!Array.isArray(t)||!s)return-1;for(let o=t.length-1;o>=0;o-=1){let r=t[o];if(!Nu(r))continue;if([r?.sourceId,r?.message_id,r?.messageId,r?.id,r?.mes_id,r?.mid,r?.mesid,r?.chat_index,r?.index,o].map(n=>ct(n)).includes(s))return o}return-1}function za(t){let e=Lu(),s=Bu(e.chat,t?.sourceMessageId);return s<0?{runtime:e,messageIndex:s,message:null}:{runtime:e,messageIndex:s,message:e.chat[s]||null}}function rl(t,e,s){let o=r=>{!Array.isArray(r)||e<0||e>=r.length||(r[e]={...r[e]||{},...s})};o(t?.contextChat),o(t?.apiChat)}async function al(t){let e=t?.context||null,s=t?.api||null,o=e?.saveChatDebounced||s?.saveChatDebounced||null,r=e?.saveChat||s?.saveChat||null;typeof o=="function"&&o.call(e||s),typeof r=="function"&&await r.call(e||s)}function Uu(t){let{message:e}=za(t);return ro(e?.[cr])}function fr(t,e={}){let s=Uu(t);return s&&ct(s.slotRevisionKey)===ct(t?.slotRevisionKey)?{loadMode:oo.EXACT,mergeBaseOnly:!1,state:s}:s&&ct(s.slotBindingKey)===ct(t?.slotBindingKey)?{loadMode:oo.BINDING_FALLBACK,mergeBaseOnly:!0,state:ro({...s,slotRevisionKey:ct(t?.slotRevisionKey)||s.slotRevisionKey,sourceSwipeId:ct(t?.sourceSwipeId||t?.effectiveSwipeId)||s.sourceSwipeId,meta:{...s.meta||{},mergeBaseOnly:!0,fallbackFromBinding:!0,fallbackFromRevisionKey:ct(s.slotRevisionKey),requestedRevisionKey:ct(t?.slotRevisionKey)}})}:Array.isArray(e.templateTables)?{loadMode:oo.TEMPLATE,mergeBaseOnly:!1,state:dr(t,{tables:_e(e.templateTables),meta:{fromTemplate:!0}})}:{loadMode:oo.EMPTY,mergeBaseOnly:!1,state:dr(t)}}async function nl(t){let{runtime:e,messageIndex:s,message:o}=za(t);if(!o||s<0)return{success:!1,error:"target_message_not_found"};let r={...ur(o[Ss]),lastResolvedTarget:Ts(t),updatedAt:Date.now()};return o[Ss]=r,rl(e,s,o),await al(e),{success:!0,bindings:r}}async function il(t,e,s={}){let o=s.skipFreshValidation===!0?t:await sl(t,s),r=s.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:ol(t,o);if(!r.valid)return{success:!1,error:"target_changed_before_commit",validation:r};let a=o||t,{runtime:n,messageIndex:l,message:i}=za(a);if(!i||l<0)return{success:!1,error:"target_message_not_found",validation:r};let c=ro({...dr(a),...e,slotBindingKey:a.slotBindingKey,slotRevisionKey:a.slotRevisionKey,sourceMessageId:a.sourceMessageId,sourceSwipeId:a.sourceSwipeId||a.effectiveSwipeId,updatedAt:Date.now()}),d={...ur(i[Ss]),lastResolvedTarget:Ts(a),lastCommittedTarget:Ts(a),updatedAt:Date.now()};return i[cr]=c,i[Ss]=d,rl(n,l,i),await al(n),{success:!0,state:c,bindings:d,validation:r,messageIndex:l,sourceMessageId:a.sourceMessageId,slotRevisionKey:a.slotRevisionKey}}function mr(t=null){let e=$e.getAssistantMessageSnapshot(t);return e?.message?{...e,tableState:ro(e.message[cr]),tableBindings:ur(e.message[Ss])}:null}var br=D(()=>{Vt();_s();gr()});function ja(t,e=""){return t==null?e:String(t).trim()||e}function ju(t={}){return{tables:Array.isArray(t?.tables)?_e(t.tables):[]}}function Wu(t={},e={}){let s=ja(e.mirrorTag,"yyt-table-workbench"),o=ju(t);return[`<${s}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(o,null,2),"```",`</${s}>`].join(`
`)}async function ll({targetSnapshot:t,nextTables:e,config:s,loadResult:o=null}={}){let r=Qe(s),a=await il(t,{tables:Array.isArray(e)?_e(e):[],meta:{lastLoadMode:ja(o?.loadMode,""),mergeBaseOnly:!1,updatedBy:ja(t?.runSource,"MANUAL_TABLE")}});if(!a?.success)return{success:!1,error:a?.error||"table_state_commit_failed",commitResult:a,mirrorResult:null,warning:""};let n=null,l="";if(r.mirrorToMessage){let i=Wu(a.state,{mirrorTag:r.mirrorTag});n=await $e.injectDetailed(zu,i,{overwrite:!0,extractionSelectors:[r.mirrorTag],sourceMessageId:a.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId}),n?.success||(l=n?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return{success:!0,state:a.state,bindings:a.bindings,commitResult:a,mirrorResult:n,warning:l}}var zu,cl=D(()=>{Vt();_s();br();no();zu="tableWorkbenchMirror"});function Ze(t,e=""){return t==null?e:String(t).trim()||e}function dl(t=[],e=8){return!Array.isArray(t)||t.length===0?"":t.slice(Math.max(t.length-e,0)).map(s=>`[${Ze(s?.role,"unknown")}] ${String(s?.content||"").trim()}`).filter(Boolean).join(`

`)}function Fu(t,e){return{target:{sourceMessageId:Ze(t?.sourceMessageId),sourceSwipeId:Ze(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:Ze(t?.slotBindingKey),slotRevisionKey:Ze(t?.slotRevisionKey),slotTransactionId:Ze(t?.slotTransactionId)},loadMode:Ze(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,tables:Array.isArray(e?.state?.tables)?_e(e.state.tables):[]}}function Ku(t=""){let e=String(t||"").trim();if(!e)return[];let s=[],o=c=>{let d=String(c||"").trim();d&&(s.includes(d)||s.push(d))};(e.match(/```(?:json)?\s*([\s\S]*?)```/gi)||[]).forEach(c=>{let d=c.replace(/^```(?:json)?\s*/i,"").replace(/```$/i,"").trim();o(d)}),o(e);let a=e.indexOf("{"),n=e.lastIndexOf("}");a>=0&&n>a&&o(e.slice(a,n+1));let l=e.indexOf("["),i=e.lastIndexOf("]");return l>=0&&i>l&&o(e.slice(l,i+1)),s}function Hu(t){if(Array.isArray(t))return t;if(t&&typeof t=="object"){if(Array.isArray(t.tables))return t.tables;if(t.data&&typeof t.data=="object"&&Array.isArray(t.data.tables))return t.data.tables}return null}function Yu(t=""){let e=Ku(t),s=[];for(let o of e)try{let r=JSON.parse(o),a=Hu(r);if(!Array.isArray(a)){s.push("JSON \u4E2D\u7F3A\u5C11 tables \u6570\u7EC4\u3002");continue}return{tables:_e(a),parsed:r}}catch(r){s.push(r?.message||String(r))}throw new Error(s[0]||"\u65E0\u6CD5\u4ECE\u6A21\u578B\u54CD\u5E94\u4E2D\u89E3\u6790 tables JSON\u3002")}async function qu({executionContext:t,targetSnapshot:e,loadResult:s,config:o,assistantSnapshot:r}={}){let a=Qe(o),n=Hi(a),l=Fu(e,s),i=Array.isArray(r?.tableState?.tables)?_e(r.tableState.tables):[],c={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:dl(t?.chatHistory||t?.chatMessages||[]),rawRecentMessagesText:dl(t?.chatHistory||t?.chatMessages||[],20),injectedContext:r?.injectedContext||$e.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(l,null,2),extractedContent:JSON.stringify(l,null,2),previousToolOutput:JSON.stringify(i,null,2)},d=await Jt.buildToolMessages(n,c),u=await Jt.buildPromptText(n,c);if(!Array.isArray(d)||d.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:n,context:c,requestPayload:l,promptText:u,messages:d}}async function Gu(t,e={},s=null){let o=Qe(e),r=Ze(o.apiPreset,"");if(r){if(!Rs(r))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${r}`);return Br(r,t,{},s)}return Os(t,{},s)}async function ul(t=null){let e=Qe(t||ts()),s=La(e);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors};let o=e.runtime||{},r=Date.now();yr({lastStatus:ao.RUNNING,lastError:""});try{let a=await Gt({runSource:lt.MANUAL}),n=pr(a,{runSource:lt.MANUAL});if(!n)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");let l=await nl(n);if(!l?.success)throw new Error(l?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");let i=mr(n.sourceMessageId),c=fr(n,{templateTables:e.tables}),d=await qu({executionContext:a,targetSnapshot:n,loadResult:c,config:e,assistantSnapshot:i}),u=await Gu(d.messages,e),f=Yu(u),y=await ll({targetSnapshot:n,nextTables:f.tables,config:e,loadResult:c});if(!y?.success)throw new Error(y?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let m=Date.now()-r;return yr({lastStatus:ao.SUCCESS,lastRunAt:Date.now(),lastDurationMs:m,lastError:"",successCount:(Number(o.successCount)||0)+1,errorCount:Number(o.errorCount)||0,lastSourceMessageId:Ze(n.sourceMessageId),lastSlotRevisionKey:Ze(n.slotRevisionKey),lastLoadMode:Ze(c.loadMode),lastMirrorApplied:y?.mirrorResult?.success===!0}),{success:!0,targetSnapshot:n,loadResult:c,request:d,responseText:u,parsed:f,state:y.state,bindings:y.bindings,mirrorResult:y.mirrorResult,warning:y.warning||""}}catch(a){let n=Date.now()-r;return yr({lastStatus:ao.ERROR,lastRunAt:Date.now(),lastDurationMs:n,lastError:a?.message||String(a),successCount:Number(o.successCount)||0,errorCount:(Number(o.errorCount)||0)+1}),{success:!1,error:a?.message||String(a)}}}var yl=D(()=>{ms();Vt();Ds();Xo();_s();gr();br();no();cl()});function vr(){return Yi({apiPresets:_t()})}function fl(t){return Number.isFinite(t)&&t>0?new Date(t).toLocaleString():"\u672A\u8BB0\u5F55"}function hr(t){try{return JSON.stringify(t,null,2)}catch{return String(t??"")}}function Wa(t){return Vu.includes(t)?t:"config"}function Fa(t){if(!$()||!O(t))return;let s=vr(),{values:o,errors:r}=Ba(t,s),a=t.find("[data-table-workbench-preview]");if(a.length){if(r.length>0){a.text(r.join(`
`));return}a.text(hr(o.tables||[]))}}function Xu(t={}){let e=t.runtime||{},s=Array.isArray(t.tables)?t.tables.length:0,o=t.mirrorToMessage===!0?"\u6B63\u6587\u955C\u50CF\u5F00\u542F":"\u6B63\u6587\u955C\u50CF\u5173\u95ED";return`
    <div class="yyt-table-workbench-header">
      <div class="yyt-table-workbench-header-main">
        <div class="yyt-table-workbench-header-copy">
          <div class="yyt-table-workbench-panel-kicker">Table Workbench</div>
          <div class="yyt-table-workbench-title">\u586B\u8868\u5DE5\u5177\u53F0</div>
          <div class="yyt-table-workbench-desc">\u628A\u914D\u7F6E\u3001\u6267\u884C\u8BCA\u65AD\u548C\u9884\u89C8\u53C2\u8003\u62C6\u5F00\u663E\u793A\uFF0C\u51CF\u5C11\u91CD\u590D\u8BF4\u660E\uFF0C\u8BA9\u6BCF\u4E2A\u754C\u9762\u53EA\u627F\u62C5\u4E00\u7C7B\u4EFB\u52A1\u3002</div>
        </div>
        <div class="yyt-table-workbench-header-actions">
          <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-table-workbench-action="refresh">
            <i class="fa-solid fa-rotate"></i> \u5237\u65B0\u8BCA\u65AD
          </button>
          <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-table-workbench-action="save-top">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
          </button>
        </div>
      </div>
      <div class="yyt-table-workbench-chip-row">
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-table"></i>${s} \u5F20\u8868</span>
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-hand-pointer"></i>\u624B\u52A8\u6267\u884C</span>
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-shield-halved"></i>revision-safe</span>
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-file-lines"></i>${b(o)}</span>
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-wave-square"></i>\u72B6\u6001 ${b(e.lastStatus||"idle")}</span>
      </div>
    </div>
  `}function Qu(t){return`
    <div class="yyt-table-workbench-view-nav" role="tablist" aria-label="\u586B\u8868\u5DE5\u4F5C\u53F0\u5206\u754C\u9762">
      <button class="yyt-table-workbench-view-button ${t==="config"?"active":""}" data-table-workbench-view-button="config" type="button">
        <i class="fa-solid fa-sliders"></i>
        <span>\u914D\u7F6E</span>
      </button>
      <button class="yyt-table-workbench-view-button ${t==="runtime"?"active":""}" data-table-workbench-view-button="runtime" type="button">
        <i class="fa-solid fa-stethoscope"></i>
        <span>\u6267\u884C\u4E0E\u8BCA\u65AD</span>
      </button>
      <button class="yyt-table-workbench-view-button ${t==="preview"?"active":""}" data-table-workbench-view-button="preview" type="button">
        <i class="fa-solid fa-code"></i>
        <span>\u9884\u89C8/\u53C2\u8003</span>
      </button>
    </div>
  `}function Zu(t={}){let e=t.runtime||{},s=String(e.lastStatus||"idle").toLowerCase(),o=e.lastError?`
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
        <span class="yyt-tool-runtime-value">${b(fl(e.lastRunAt))}</span>
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
  `}function ey(t={},e){return`
    <div class="yyt-table-workbench-grid-single">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-sliders"></i>
          <span>\u5DE5\u4F5C\u53F0\u914D\u7F6E</span>
        </div>
        <div class="yyt-table-workbench-panel-copy">
          <div class="yyt-table-workbench-panel-kicker">Setup</div>
          <div class="yyt-table-workbench-panel-title">\u8868\u5B9A\u4E49\u4E0E\u8BF7\u6C42\u6A21\u677F</div>
          <div class="yyt-table-workbench-panel-desc">\u8FD9\u91CC\u53EA\u4FDD\u7559\u914D\u7F6E\u672C\u8EAB\uFF1A\u7EF4\u62A4 tables \u8349\u7A3F\u3001promptTemplate \u4E0E\u5199\u56DE\u7B56\u7565\u3002\u4FDD\u5B58\u540E\u624D\u4F1A\u66F4\u65B0\u8FD0\u884C\u65F6\u914D\u7F6E\uFF0C\u5E76\u4F5C\u4E3A\u540E\u7EED\u6267\u884C\u7684 merge base\u3002</div>
        </div>
        ${el(e,t)}
      </div>

      <div class="yyt-table-workbench-card">
        <div class="yyt-table-workbench-panel-copy">
          <div class="yyt-table-workbench-panel-kicker">Flow</div>
          <div class="yyt-table-workbench-panel-title">\u63A8\u8350\u64CD\u4F5C\u987A\u5E8F</div>
          <div class="yyt-table-workbench-panel-desc">\u5148\u5728\u8FD9\u91CC\u6574\u7406\u914D\u7F6E\uFF0C\u518D\u5207\u5230\u201C\u6267\u884C\u4E0E\u8BCA\u65AD\u201D\u786E\u8BA4\u76EE\u6807\u4E0E\u72B6\u6001\uFF0C\u6700\u540E\u6267\u884C\u624B\u52A8\u586B\u8868\u3002</div>
        </div>
        <div class="yyt-table-workbench-flow">
          <span class="yyt-tool-hero-chip">1. \u7F16\u8F91 tables / promptTemplate</span>
          <span class="yyt-tool-hero-chip">2. \u4FDD\u5B58\u914D\u7F6E</span>
          <span class="yyt-tool-hero-chip">3. \u5237\u65B0\u76EE\u6807\u8BCA\u65AD</span>
          <span class="yyt-tool-hero-chip">4. \u624B\u52A8\u586B\u8868</span>
        </div>
      </div>
    </div>
  `}function ty(t={}){return`
    <div class="yyt-table-workbench-grid">
      <div class="yyt-table-workbench-stack">
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
              <div class="yyt-table-workbench-action-hint">\u6267\u884C\u524D\u5148\u5237\u65B0\u8BCA\u65AD\uFF0C\u786E\u8BA4 writeback \u5C06\u843D\u5230\u5F53\u524D assistant \u76EE\u6807\uFF1B\u5982\u521A\u4FEE\u6539\u8FC7\u914D\u7F6E\uFF0C\u5148\u4FDD\u5B58\u518D\u8FD0\u884C\u3002</div>
            </div>
          </div>
        </div>

        ${Zu(t)}
      </div>

      <div class="yyt-table-workbench-stack">
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
      </div>
    </div>
  `}function sy(t={},e){return`
    <div class="yyt-table-workbench-grid">
      <div class="yyt-table-workbench-stack">
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
          <pre class="yyt-table-workbench-pre" data-table-workbench-preview>${b(hr(t.tables||[]))}</pre>
        </div>
      </div>

      <div class="yyt-table-workbench-stack">
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
          <pre class="yyt-table-workbench-pre">${b(e)}</pre>
        </div>
      </div>
    </div>
  `}function oy(t={},e="config"){let s=vr(),o=Ue.getVariableHelp(),r=Wa(e);return`
    <div class="yyt-tool-panel yyt-table-workbench-shell" data-tool-id="tableWorkbench">
      ${Xu(t)}
      ${Qu(r)}
      <div class="yyt-table-workbench-view-pane ${r==="config"?"active":""}" data-table-workbench-view-pane="config">
        ${ey(t,s)}
      </div>
      <div class="yyt-table-workbench-view-pane ${r==="runtime"?"active":""}" data-table-workbench-view-pane="runtime">
        ${ty(t)}
      </div>
      <div class="yyt-table-workbench-view-pane ${r==="preview"?"active":""}" data-table-workbench-view-pane="preview">
        ${sy(t,o)}
      </div>
    </div>
  `}function pl(t=[]){return t.length?`
    <div class="yyt-table-workbench-detail-list">
      ${t.map(e=>`
        <div class="yyt-tool-runtime-line">
          <span class="yyt-tool-runtime-label">${b(e.label||"")}</span>
          <span class="yyt-tool-runtime-value">${b(e.value||"")}</span>
        </div>
      `).join("")}
    </div>
  `:'<div class="yyt-table-workbench-empty-state"><div class="yyt-table-workbench-muted">\u6682\u65E0\u53EF\u663E\u793A\u5185\u5BB9\u3002</div></div>'}async function ry(t){if(!$()||!O(t))return;let s=ts(),o=t.find("[data-table-workbench-target]"),r=t.find("[data-table-workbench-load]"),a=t.find("[data-table-workbench-preview]");try{let n=await Ua();if(!O(t))return;if(!n){o.html('<div class="yyt-table-workbench-muted">\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u3002</div>'),r.html('<div class="yyt-table-workbench-muted">\u5C1A\u672A\u89E3\u6790\u5230\u53EF\u6267\u884C\u76EE\u6807\uFF0C\u56E0\u6B64\u4E0D\u4F1A\u52A0\u8F7D bound state\u3002</div>'),a.text(hr(s.tables||[]));return}let l=mr(n.sourceMessageId),i=fr(n,{templateTables:s.tables}),c=l?.tableBindings||{},d=[{label:"sourceMessageId",value:n.sourceMessageId||"\u672A\u89E3\u6790"},{label:"sourceSwipeId",value:n.sourceSwipeId||n.effectiveSwipeId||"\u672A\u89E3\u6790"},{label:"slotBindingKey",value:n.slotBindingKey||"\u672A\u89E3\u6790"},{label:"slotRevisionKey",value:n.slotRevisionKey||"\u672A\u89E3\u6790"},{label:"slotTransactionId",value:n.slotTransactionId||"\u672A\u89E3\u6790"},{label:"lastResolvedTarget",value:c?.lastResolvedTarget?.slotRevisionKey||"\u672A\u8BB0\u5F55"},{label:"lastCommittedTarget",value:c?.lastCommittedTarget?.slotRevisionKey||"\u672A\u8BB0\u5F55"}],u=[{label:"loadMode",value:i.loadMode||"empty"},{label:"mergeBaseOnly",value:i.mergeBaseOnly===!0?"true":"false"},{label:"tables \u6570\u91CF",value:String(Array.isArray(i.state?.tables)?i.state.tables.length:0)},{label:"state updatedAt",value:fl(i.state?.updatedAt)}];o.html(pl(d)),r.html(pl(u)),a.text(hr(i.state?.tables||[]))}catch(n){if(!O(t))return;o.html(`<div class="yyt-table-workbench-muted">${b(n?.message||"\u76EE\u6807\u8BCA\u65AD\u5931\u8D25")}</div>`),r.html('<div class="yyt-table-workbench-muted">\u65E0\u6CD5\u751F\u6210\u52A0\u8F7D\u8BCA\u65AD\u3002</div>')}}function gl(t,{silent:e=!1}={}){let s=vr(),{values:o,errors:r}=Ba(t,s);if(Fa(t),r.length>0)return ve("warning",r.join(`
`),{duration:4e3,noticeId:"yyt-table-workbench-form-error"}),{success:!1,errors:r};let a=Ki(o);return a.success?(e||x("success","\u586B\u8868\u5DE5\u4F5C\u53F0\u914D\u7F6E\u5DF2\u4FDD\u5B58"),a):(x("error",a.error||"\u4FDD\u5B58\u5931\u8D25"),a)}var Vu,Ju,ss,Ka=D(()=>{Se();Zt();tl();eo();Bs();no();gr();br();yl();Vu=["config","runtime","preview"],Ju=`${xs}
${Gi}
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
`;ss={id:"tableWorkbenchPanel",currentView:"config",render(){return oy(ts(),this.currentView)},bindEvents(t){let e=$();if(!e||!O(t))return;let s=this;t.off(".yytTableWorkbench"),t.on("click.yytTableWorkbench","[data-table-workbench-view-button]",o=>{let r=e(o.currentTarget).data("tableWorkbenchViewButton");s.applyViewState(t,r)}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="save"], [data-table-workbench-action="save-top"]',()=>{gl(t,{silent:!1})?.success&&s.renderTo(t)}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="refresh"]',()=>{s.renderTo(t)}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="run"]',async()=>{if(s.currentView="runtime",!!gl(t,{silent:!0}).success)try{let r=await ul();r?.success?r.warning?ve("warning",`\u586B\u8868\u5DF2\u5B8C\u6210\uFF0C\u4F46\u6B63\u6587\u955C\u50CF\u5931\u8D25\uFF1A${r.warning}`,{duration:4200,noticeId:"yyt-table-workbench-run-result"}):ve("success","\u624B\u52A8\u586B\u8868\u5B8C\u6210",{duration:2800,noticeId:"yyt-table-workbench-run-result"}):ve("warning",r?.error||"\u624B\u52A8\u586B\u8868\u5931\u8D25",{duration:4e3,noticeId:"yyt-table-workbench-run-result"})}catch(r){x("error",r?.message||"\u624B\u52A8\u586B\u8868\u5931\u8D25")}finally{s.renderTo(t)}})},destroy(t){!$()||!O(t)||(Zi(t),t.off(".yytTableWorkbench"))},getStyles(){return Ju},applyViewState(t,e){if(!$()||!O(t))return;let o=Wa(e);this.currentView=o,t.find("[data-table-workbench-view-button]").removeClass("active"),t.find(`[data-table-workbench-view-button="${o}"]`).addClass("active"),t.find("[data-table-workbench-view-pane]").removeClass("active"),t.find(`[data-table-workbench-view-pane="${o}"]`).addClass("active")},renderTo(t){!$()||!O(t)||(this.currentView=Wa(this.currentView),t.html(this.render({})),Qi(t,vr(),{onChange:()=>Fa(t)}),this.bindEvents(t,{}),this.applyViewState(t,this.currentView),Fa(t),ry(t))}}});var El={};ie(El,{ApiPresetPanel:()=>Ke,BypassPanel:()=>es,EscapeTransformToolPanel:()=>Je,PunctuationTransformToolPanel:()=>Xe,RegexExtractPanel:()=>He,SCRIPT_ID:()=>g,SettingsPanel:()=>ht,StatusBlockPanel:()=>Ge,SummaryToolPanel:()=>qe,TableWorkbenchPanel:()=>ss,ToolManagePanel:()=>Ye,UIManager:()=>Is,YouyouReviewPanel:()=>Ve,bindDialogEvents:()=>Bt,createDialogHtml:()=>Nt,default:()=>ay,destroyEnhancedCustomSelects:()=>ye,downloadJson:()=>yt,enhanceNativeSelects:()=>Te,escapeHtml:()=>b,fillFormWithConfig:()=>Lt,getAllStyles:()=>_l,getFormApiConfig:()=>St,getJQuery:()=>$,getTargetDocument:()=>ut,initUI:()=>lo,isContainerValid:()=>O,normalizeCustomSelectOptions:()=>bo,readFileContent:()=>pt,registerComponents:()=>Es,renderApiPanel:()=>xr,renderBypassPanel:()=>wl,renderCustomSelectControl:()=>ho,renderEscapeTransformToolPanel:()=>vl,renderPunctuationTransformToolPanel:()=>xl,renderRegexPanel:()=>wr,renderSettingsPanel:()=>Tl,renderStatusBlockPanel:()=>bl,renderSummaryToolPanel:()=>ml,renderTableWorkbenchPanel:()=>Sl,renderToolPanel:()=>Tr,renderYouyouReviewPanel:()=>hl,resetJQueryCache:()=>cc,showToast:()=>x,showTopNotice:()=>ve,uiManager:()=>ee});function Es(){ee.register(Ke.id,Ke),ee.register(He.id,He),ee.register(Ye.id,Ye),ee.register(qe.id,qe),ee.register(Ge.id,Ge),ee.register(Ve.id,Ve),ee.register(Je.id,Je),ee.register(Xe.id,Xe),ee.register(es.id,es),ee.register(ht.id,ht),ee.register(ss.id,ss),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function lo(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...o}=t;ee.init(o),Es(),e&&ee.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function et(t,e,s={}){ee.render(t,e,s)}function xr(t){et(Ke.id,t)}function wr(t){et(He.id,t)}function Tr(t){et(Ye.id,t)}function ml(t){et(qe.id,t)}function bl(t){et(Ge.id,t)}function hl(t){et(Ve.id,t)}function vl(t){et(Je.id,t)}function xl(t){et(Xe.id,t)}function wl(t){et(es.id,t)}function Tl(t){et(ht.id,t)}function Sl(t){et(ss.id,t)}function _l(){return ee.getAllStyles()}var ay,Ha=D(()=>{Dr();Gr();ta();ca();wa();Ta();Sa();Ea();Aa();ka();lr();Ka();Se();Dr();Gr();ta();ca();wa();Ta();Sa();Ea();Aa();ka();lr();Ka();ay={uiManager:ee,ApiPresetPanel:Ke,RegexExtractPanel:He,ToolManagePanel:Ye,SummaryToolPanel:qe,StatusBlockPanel:Ge,YouyouReviewPanel:Ve,EscapeTransformToolPanel:Je,PunctuationTransformToolPanel:Xe,BypassPanel:es,SettingsPanel:ht,TableWorkbenchPanel:ss,registerComponents:Es,initUI:lo,renderApiPanel:xr,renderRegexPanel:wr,renderToolPanel:Tr,renderSummaryToolPanel:ml,renderStatusBlockPanel:bl,renderYouyouReviewPanel:hl,renderEscapeTransformToolPanel:vl,renderPunctuationTransformToolPanel:xl,renderBypassPanel:wl,renderSettingsPanel:Tl,renderTableWorkbenchPanel:Sl,getAllStyles:_l}});var Ol={};ie(Ol,{ApiPresetPanel:()=>Ke,EscapeTransformToolPanel:()=>Je,PunctuationTransformToolPanel:()=>Xe,RegexExtractPanel:()=>He,SCRIPT_ID:()=>g,StatusBlockPanel:()=>Ge,SummaryToolPanel:()=>qe,ToolManagePanel:()=>Ye,YouyouReviewPanel:()=>Ve,default:()=>ny,escapeHtml:()=>b,fillFormWithConfig:()=>Lt,getCurrentTab:()=>$l,getFormApiConfig:()=>St,getJQuery:()=>$,getRegexStyles:()=>Pl,getStyles:()=>Cl,getToolStyles:()=>Il,initUI:()=>lo,isContainerValid:()=>O,registerComponents:()=>Es,render:()=>Al,renderRegex:()=>kl,renderTool:()=>Ml,setCurrentTab:()=>Rl,showToast:()=>x,uiManager:()=>ee});function Ya(t,e){let s=$();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function Al(t){if(co=Ya(t,co),!co||!co.length){console.error("[YouYouToolkit] Container not found or invalid");return}xr(co)}function kl(t){if(uo=Ya(t,uo),!uo||!uo.length){console.error("[YouYouToolkit] Regex container not found");return}wr(uo)}function Ml(t){if(yo=Ya(t,yo),!yo||!yo.length){console.error("[YouYouToolkit] Tool container not found");return}Tr(yo)}function Cl(){return Ke.getStyles()}function Pl(){return He.getStyles()}function Il(){return[Ye.getStyles(),qe.getStyles(),Ge.getStyles(),Ve.getStyles(),Je.getStyles(),Xe.getStyles()].join(`
`)}function $l(){return ee.getCurrentTab()}function Rl(t){ee.switchTab(t)}var co,uo,yo,ny,Dl=D(()=>{Ha();co=null,uo=null,yo=null;ny={render:Al,renderRegex:kl,renderTool:Ml,getStyles:Cl,getRegexStyles:Pl,getToolStyles:Il,getCurrentTab:$l,setCurrentTab:Rl,uiManager:ee,ApiPresetPanel:Ke,RegexExtractPanel:He,ToolManagePanel:Ye,SummaryToolPanel:qe,StatusBlockPanel:Ge,YouyouReviewPanel:Ve,EscapeTransformToolPanel:Je,PunctuationTransformToolPanel:Xe,registerComponents:Es,initUI:lo,SCRIPT_ID:g,escapeHtml:b,showToast:x,getJQuery:$,isContainerValid:O,getFormApiConfig:St,fillFormWithConfig:Lt}});var Ll={};ie(Ll,{DEFAULT_PROMPT_SEGMENTS:()=>Sr,PromptEditor:()=>_r,default:()=>gy,getPromptEditorStyles:()=>dy,messagesToSegments:()=>py,segmentsToMessages:()=>yy,validatePromptSegments:()=>uy});function dy(){return`
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
  `}function uy(t){let e=[];return Array.isArray(t)?(t.forEach((s,o)=>{s.id||e.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${o+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function yy(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function py(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Sr]}var iy,ly,cy,Sr,_r,gy,Nl=D(()=>{Se();iy="youyou_toolkit_prompt_editor",ly={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},cy={system:"fa-server",ai:"fa-robot",user:"fa-user"},Sr=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],_r=class{constructor(e={}){this.containerId=e.containerId||iy,this.segments=e.segments||[...Sr],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Sr],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=ly[e.type]||e.type,o=cy[e.type]||"fa-file",r=e.mainSlot==="A"||e.isMain,a=e.mainSlot==="B"||e.isMain2,n=r?"var(--yyt-accent, #7bb7ff)":a?"#ffb74d":"",l=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",i=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${r?"yyt-main-a":""} ${a?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${n?`border-left: 3px solid ${n};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${o}"></i>
            <span class="yyt-prompt-segment-title">${s}</span>
            <div class="yyt-prompt-segment-badges">
              ${i}
              ${l}
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
    `}bindEvents(){this.$container&&(ye(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:o})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:o})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),Te(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let s=`segment_${Date.now()}`,o=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};o.id||(o.id=s),this.segments.push(o),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(r=>r.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let o=this.segments.find(r=>r.id===e);o&&(Object.assign(o,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let o=s.target.files[0];if(!o)return;let r=new FileReader;r.onload=a=>{try{let n=JSON.parse(a.target.result);Array.isArray(n)?(this.setSegments(n),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(n){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",n)}},r.readAsText(o)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),o=new Blob([s],{type:"application/json"}),r=URL.createObjectURL(o),a=document.createElement("a");a.href=r,a.download=`prompt_group_${Date.now()}.json`,a.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(ye(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};gy=_r});var qa={};ie(qa,{WindowManager:()=>Er,closeWindow:()=>hy,createWindow:()=>by,windowManager:()=>Re});function my(){if(Re.stylesInjected)return;Re.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=fy+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function by(t){let{id:e,title:s="\u7A97\u53E3",content:o="",width:r=900,height:a=700,modal:n=!1,resizable:l=!0,maximizable:i=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:f}=t;my();let y=window.jQuery||window.parent?.jQuery;if(!y)return console.error("[WindowManager] jQuery not available"),null;if(Re.isOpen(e))return Re.bringToFront(e),Re.getWindow(e);let m=window.innerWidth||1200,v=window.innerHeight||800,w=m<=1100,A=null,k=!1;d&&(A=Re.getState(e),A&&!w&&(k=!0));let C,F;k&&A.width&&A.height?(C=Math.max(400,Math.min(A.width,m-40)),F=Math.max(300,Math.min(A.height,v-40))):(C=Math.max(400,Math.min(r,m-40)),F=Math.max(300,Math.min(a,v-40)));let K=Math.max(20,Math.min((m-C)/2,m-C-20)),W=Math.max(20,Math.min((v-F)/2,v-F-20)),E=i&&!w,L=`
    <div class="yyt-window" id="${e}" style="left:${K}px; top:${W}px; width:${C}px; height:${F}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${vy(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${E?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${o}</div>
      ${l?`
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
  `,N=null;n&&(N=y(`<div class="yyt-window-overlay" data-for="${e}"></div>`),y(document.body).append(N));let B=y(L);y(document.body).append(B),Re.register(e,B),B.on("mousedown",()=>Re.bringToFront(e));let te=!1,ce={left:K,top:W,width:C,height:F},pe=()=>{ce={left:parseInt(B.css("left")),top:parseInt(B.css("top")),width:B.width(),height:B.height()},B.addClass("maximized"),B.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),te=!0},We=()=>{B.removeClass("maximized"),B.css({left:ce.left+"px",top:ce.top+"px",width:ce.width+"px",height:ce.height+"px"}),B.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),te=!1};B.find(".yyt-window-btn.maximize").on("click",()=>{te?We():pe()}),(w&&i||k&&A.isMaximized&&i||c&&i)&&pe(),B.find(".yyt-window-btn.close").on("click",()=>{if(d&&i){let de={width:te?ce.width:B.width(),height:te?ce.height:B.height(),isMaximized:te};Re.saveState(e,de)}u&&u(),N&&N.remove(),B.remove(),Re.unregister(e),y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),N&&N.on("click",de=>{de.target,N[0]});let V=!1,tt,Mt,Ct,Fe;if(B.find(".yyt-window-header").on("mousedown",de=>{y(de.target).closest(".yyt-window-controls").length||te||(V=!0,tt=de.clientX,Mt=de.clientY,Ct=parseInt(B.css("left")),Fe=parseInt(B.css("top")),y(document.body).css("user-select","none"))}),y(document).on("mousemove.yytWindowDrag"+e,de=>{if(!V)return;let J=de.clientX-tt,Ee=de.clientY-Mt;B.css({left:Math.max(0,Ct+J)+"px",top:Math.max(0,Fe+Ee)+"px"})}),y(document).on("mouseup.yytWindowDrag"+e,()=>{V&&(V=!1,y(document.body).css("user-select",""))}),l){let de=!1,J="",Ee,fe,rs,as,As,vt;B.find(".yyt-window-resize-handle").on("mousedown",function(st){te||(de=!0,J="",y(this).hasClass("se")?J="se":y(this).hasClass("e")?J="e":y(this).hasClass("s")?J="s":y(this).hasClass("w")?J="w":y(this).hasClass("n")?J="n":y(this).hasClass("nw")?J="nw":y(this).hasClass("ne")?J="ne":y(this).hasClass("sw")&&(J="sw"),Ee=st.clientX,fe=st.clientY,rs=B.width(),as=B.height(),As=parseInt(B.css("left")),vt=parseInt(B.css("top")),y(document.body).css("user-select","none"),st.stopPropagation())}),y(document).on("mousemove.yytWindowResize"+e,st=>{if(!de)return;let ns=st.clientX-Ee,Pt=st.clientY-fe,It=400,$t=300,ks=rs,Ms=as,fo=As,mo=vt;if(J.includes("e")&&(ks=Math.max(It,rs+ns)),J.includes("s")&&(Ms=Math.max($t,as+Pt)),J.includes("w")){let Rt=rs-ns;Rt>=It&&(ks=Rt,fo=As+ns)}if(J.includes("n")){let Rt=as-Pt;Rt>=$t&&(Ms=Rt,mo=vt+Pt)}B.css({width:ks+"px",height:Ms+"px",left:fo+"px",top:mo+"px"})}),y(document).on("mouseup.yytWindowResize"+e,()=>{de&&(de=!1,y(document.body).css("user-select",""))})}return B.on("remove",()=>{y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),f&&setTimeout(()=>f(B),50),B}function hy(t){let e=Re.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),Re.unregister(t)}}function vy(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var fy,Bl,Er,Re,Ga=D(()=>{Oe();fy="youyou_toolkit_window_manager",Bl="window_states",Er=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let o=this.loadStates();o[e]={...s,updatedAt:Date.now()},Cs.set(Bl,o)}loadStates(){return Cs.get(Bl)||{}}getState(e){return this.loadStates()[e]||null}},Re=new Er});var Kl={};ie(Kl,{TX_PHASE:()=>je,ToolAutomationService:()=>Mr,Transaction:()=>kr,default:()=>My,toolAutomationService:()=>Fl});function be(t){return t==null?"":String(t).trim()}function Ja(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Ul(){return Ja()?.SillyTavern||null}function Cr(t){try{return t?.getContext?.()||null}catch{return null}}function Va(t,e){if(!t)return null;let s=typeof t?.on=="function"||typeof t?.addListener=="function",o=typeof t?.off=="function"||typeof t?.removeListener=="function";return!s||!o?null:{eventSource:t,source:e,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function xy(t){let e=Ja(),s=Cr(t);return[Va(t?.eventSource,"SillyTavern.eventSource"),Va(e?.eventSource,"topWindow.eventSource"),Va(s?.eventSource,"SillyTavern.getContext().eventSource")].filter(Boolean)[0]||{eventSource:null,source:"unavailable",capabilities:{on:!1,off:!1,addListener:!1,removeListener:!1}}}function wy(t){let e=Cr(t);return t?.eventTypes||e?.eventTypes||Ja()?.event_types||{}}function zl(t){let e=Cr(t);return be(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function jl(t){let e=Cr(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function Wl(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function Ty(t,e){let s=be(e);if(!s)return null;let o=jl(t);for(let r=o.length-1;r>=0;r-=1){let a=o[r];if([a?.messageId,a?.message_id,a?.id,a?.mesid,a?.mid,a?.chat_index,r].map(l=>be(l)).includes(s))return a||null}return null}function Sy(t){let e=jl(t);if(!Array.isArray(e)||e.length===0)return null;let s=e.length-1,o=e[s]||null;if(!Wl(o))return null;let r=be(o?.messageId??o?.message_id??o?.id??o?.mesid??o?.mid??o?.chat_index??s);return r?{messageId:r,swipeId:be(o?.swipeId??o?.swipe_id??o?.swipe??o?.swipeIndex),message:o}:null}function Ar(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function _y(t){let e=String(t||"");if(e.length===0)return"0";let s=5381,o=Math.min(e.length,2e3);for(let r=0;r<o;r++)s=(s<<5)+s+e.charCodeAt(r)|0;return(s>>>0).toString(36)}function Ey(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}function ky(t){return Ay.has(Ar(t))}var je,Ay,kr,Mr,Fl,My,Hl=D(()=>{Qs();me();At();er();ms();je=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Ay=new Set(["MESSAGE_SWIPED","GENERATION_AFTER_COMMANDS","GENERATION_ENDED"]);kr=class{constructor({chatId:e,messageId:s,swipeId:o,sourceEvent:r,generationKey:a}){this.traceId=Ey(),this.chatId=e||"",this.messageId=s||"",this.swipeId=o||"",this.sourceEvent=r||"",this.generationKey=a||"",this.phase=je.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,s={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,s),this}toSnapshot(){return{...this}}},Mr=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._completedGenerationKeys=new Map,this._slotQueues=new Map,this._currentChatId="",this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._initRetryTimer=null}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop();let s=Ul(),o=e.retryOnFailure!==!1,r=Number.isFinite(e.retryDelayMs)?e.retryDelayMs:1500,a=Number.isFinite(e.attempt)?e.attempt:1;if(this._hostBindingStatus.initAttempts=a,this._hostBindingStatus.lastInitAt=Date.now(),!s)return this._hostBindingStatus={...this._hostBindingStatus,initialized:!1,lastInitResult:"missing_api",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],lastError:"\u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)",retryScheduled:!1,retryDelayMs:0},this._log("\u521D\u59CB\u5316\u5931\u8D25: \u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)"),!1;this._currentChatId=zl(s);let n=xy(s),l=n?.eventSource||null,i=wy(s),c=typeof l?.on=="function"?l.on.bind(l):typeof l?.addListener=="function"?l.addListener.bind(l):null,d=typeof l?.off=="function"?l.off.bind(l):typeof l?.removeListener=="function"?l.removeListener.bind(l):null,u=!!(i&&Object.keys(i).length>0);if(this._hostBindingStatus={...this._hostBindingStatus,source:n?.source||"unavailable",hasEventSource:!!l,hasEventTypes:u,eventBindings:[],lastError:"",retryScheduled:!1,retryDelayMs:0,initialized:!1,lastInitResult:"binding"},!c||!d){let m="\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5";return this._hostBindingStatus={...this._hostBindingStatus,lastInitResult:"missing_event_source",lastError:m},this._log(`\u521D\u59CB\u5316\u5931\u8D25: ${m}`,{source:this._hostBindingStatus.source}),o&&this._scheduleInitRetry(r,a+1),!1}this._log("\u5BBF\u4E3B eventTypes \u6620\u5C04:",JSON.stringify(i,null,2));let f=(m,v)=>{if(!m||typeof v!="function")return;let w=m;c(w,v),this._hostBindingStatus.eventBindings=[...this._hostBindingStatus.eventBindings,`${w} -> ${Ar(w)}`],this._stopCallbacks.push(()=>{try{d(w,v)}catch(A){this._log("\u53D6\u6D88\u4E8B\u4EF6\u5931\u8D25",w,A)}}),this._log(`\u5DF2\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${w}" (\u5F52\u4E00\u5316: ${Ar(w)})`)},y=(m,...v)=>{let w=Ar(m),{messageId:A,swipeId:k}=this._extractIdentitiesFromArgs(v);if(this._log(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${m}" \u2192 "${w}"`,{messageId:A,swipeId:k,argCount:v.length}),!!this._checkEnabled()){if(A){let C=Ty(s,A);if(C&&!Wl(C)){this._log(`\u4E8B\u4EF6 "${w}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:A});return}this._scheduleMessageProcessing(A,k,{settleMs:this._getSettleMs(),sourceEvent:w});return}if(ky(w)){let C=Sy(s);C?.messageId?this._scheduleMessageProcessing(C.messageId,C.swipeId,{settleMs:this._getSettleMs(),sourceEvent:w}):this._log(`\u4E8B\u4EF6 "${w}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7 fallback`);return}this._log(`\u4E8B\u4EF6 "${w}" \u65E0 messageId \u4E14\u975E same-slot \u7C7B\u578B\uFF0C\u8DF3\u8FC7`)}};return f(i.MESSAGE_SENT||"message_sent",()=>{this._log("MESSAGE_SENT \u2192 \u91CD\u7F6E extra analysis \u72B6\u6001"),this._isDuringExtraAnalysis=!1,this._pendingTimers.forEach(m=>clearTimeout(m)),this._pendingTimers.clear()}),f(i.MESSAGE_RECEIVED||"message_received",(...m)=>{y(i.MESSAGE_RECEIVED||"message_received",...m)}),f(i.MESSAGE_SWIPED||"message_swiped",(...m)=>{y(i.MESSAGE_SWIPED||"message_swiped",...m)}),f(i.GENERATION_AFTER_COMMANDS||"generation_after_commands",(...m)=>{y(i.GENERATION_AFTER_COMMANDS||"generation_after_commands",...m)}),f(i.GENERATION_ENDED||"generation_ended",(...m)=>{y(i.GENERATION_ENDED||"generation_ended",...m)}),f(i.CHAT_CHANGED||"chat_changed",()=>{this._resetForChatChange()}),f(i.MESSAGE_DELETED||"message_deleted",m=>{this._clearMessageState(be(m))}),this._stopCallbacks.push(I.on(M.SETTINGS_UPDATED,()=>{let m=this._enabled;this._enabled=this._evaluateEnabled(),m!==this._enabled&&this._log(`\u81EA\u52A8\u5316\u72B6\u6001\u53D8\u66F4: ${m} \u2192 ${this._enabled}`)})),this._enabled=this._evaluateEnabled(),this._enabledCheckedOnce=!1,this._hostBindingStatus={...this._hostBindingStatus,initialized:!0,lastInitResult:"ready",retryScheduled:!1,retryDelayMs:0,lastError:""},this._log("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{enabled:this._enabled,chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(s){this._log("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",s)}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this._initRetryTimer&&(clearTimeout(this._initRetryTimer),this._initRetryTimer=null),this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return this._enabled}getRuntimeSnapshot(){return this._pruneCompletedKeys(),{currentChatId:this._currentChatId,enabled:this._enabled,isDuringExtraAnalysis:this._isDuringExtraAnalysis,isProcessingMessage:this._isProcessingMessage,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,completedGenerationKeyCount:this._completedGenerationKeys.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let s=await qs({messageId:"",swipeId:"",runSource:"AUTO"}),o=be(s?.sourceMessageId||s?.messageId);return o?this.processAssistantMessage(o,{force:e.force===!0,swipeId:be(s?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:s=!1,swipeId:o="",sourceEvent:r="AUTO"}={}){let a=new kr({chatId:this._currentChatId,messageId:e,swipeId:o,sourceEvent:r});try{if(!e)return this._skipTransaction(a,"missing_message_id");if(!this._checkEnabled()&&!s)return this._skipTransaction(a,"automation_disabled");if(this._isDuringExtraAnalysis&&!s&&r!=="MESSAGE_SWIPED"&&!r.includes("GENERATION"))return this._skipTransaction(a,"during_extra_analysis");a.transition(je.CONFIRMED);let n=await qs({messageId:e,swipeId:o,runSource:"AUTO"}),l=n?.targetAssistantMessage||null;if(!l||!n?.sourceMessageId)return this._skipTransaction(a,"assistant_message_not_found");let i=String(l.content||l.mes||"").trim();if(!i||i.length<5)return this._skipTransaction(a,"assistant_message_too_short");a.transition(je.CONTEXT_BUILT);let c=_y(i),d=`${be(n.sourceMessageId)}::${c}`;if(a.generationKey=d,!s&&this._hasCompletedGeneration(d))return this._skipTransaction(a,"duplicate_generation",{generationKey:d});let u=it.filterAutoPostResponseTools(Ys());if(!u.length)return this._skipTransaction(a,"no_auto_tools");let f=`${be(n.sourceMessageId)}::${be(n.sourceSwipeId||o)}`;return this._enqueueSlot(f,async()=>{if(this._hasCompletedGeneration(d)&&!s)return this._skipTransaction(a,"duplicate_generation_after_queue",{generationKey:d});this._isProcessingMessage=!0,this._isDuringExtraAnalysis=!0,a.transition(je.REQUEST_STARTED);try{let y=[],m=!1;for(let A of u){let k={...n,input:{...n.input||{},lastAiMessage:n.lastAiMessage,assistantBaseText:n.assistantBaseText}},C=await it.runToolPostResponse(A,k);y.push(C),(C?.writebackState||C?.output)&&(m=!0)}a.transition(je.REQUEST_FINISHED,{toolResults:y}),m&&(a.transition(je.WRITEBACK_STARTED),a.writebackState={messageId:n.sourceMessageId,swipeId:n.sourceSwipeId,hasOutput:!0}),this._markGenerationCompleted(d);let v=y.every(A=>A?.success!==!1);v&&a.transition(je.WRITEBACK_COMMITTED);let w=v?je.REFRESH_CONFIRMED:je.FAILED;return a.transition(w,{verdict:v?"success":"partial_failure"}),this._recordTransaction(a),{success:v,traceId:a.traceId,generationKey:d,sourceEvent:r,messageId:n.sourceMessageId||e,phase:a.phase,results:y}}finally{this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1}})}catch(n){return a.transition(je.FAILED,{error:n?.message||String(n)}),this._recordTransaction(a),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1,this._log("processAssistantMessage \u5F02\u5E38",n),{success:!1,traceId:a.traceId,error:a.error,phase:a.phase}}}_extractIdentitiesFromArgs(e){let s="",o="";for(let r of e)if(r!=null){if(typeof r=="number"&&Number.isFinite(r)&&!s){s=be(r);continue}if(typeof r=="string"){let a=be(r);!s&&/^\d+$/.test(a)&&(s=a);continue}typeof r=="object"&&(s||(s=be(r.messageId??r.message_id??r.id??r.mesid??r.chat_index??r.message?.messageId??r.message?.message_id??r.message?.id??r.message?.mesid??r.message?.chat_index??r.data?.messageId??r.data?.message_id??r.data?.id??r.target?.messageId??r.target?.message_id??r.target?.id)),o||(o=be(r.swipeId??r.swipe_id??r.swipe??r.swipeIndex??r.currentSwipe??r.message?.swipeId??r.message?.swipe_id??r.message?.swipe??r.data?.swipeId??r.data?.swipe_id??r.data?.swipe??r.target?.swipeId??r.target?.swipe_id??r.target?.swipe)))}return{messageId:s,swipeId:o}}_scheduleMessageProcessing(e,s="",o={}){let r=o.settleMs??this._getSettleMs(),a=`msg::${be(e)}::${be(s)}`,n=this._pendingTimers.get(a);n&&clearTimeout(n);let l=setTimeout(()=>{this._pendingTimers.delete(a),this.processAssistantMessage(e,{swipeId:s,sourceEvent:o.sourceEvent||"AUTO"}).catch(i=>{this._log("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:i})})},Math.max(0,r));this._pendingTimers.set(a,l),this._log("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:a,settleMs:r,sourceEvent:o.sourceEvent})}_scheduleCurrentAssistantProcessing(e={}){let s=e.settleMs??this._getSettleMs(),o=e.sourceEvent||"CURRENT_ASSISTANT_FALLBACK",r=`current::${o}`,a=this._pendingTimers.get(r);a&&clearTimeout(a);let n=setTimeout(()=>{this._pendingTimers.delete(r),this.processCurrentAssistantMessage({sourceEvent:o}).catch(l=>{this._log("\u5F53\u524D assistant \u5904\u7406\u5931\u8D25",l)})},Math.max(0,s));this._pendingTimers.set(r,n),this._log("\u5DF2\u8C03\u5EA6\u5F53\u524D assistant \u5904\u7406",{timerKey:r,settleMs:s,sourceEvent:o})}_hasCompletedGeneration(e){if(!e)return!1;this._pruneCompletedKeys();let s=this._completedGenerationKeys.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_markGenerationCompleted(e){e&&(this._completedGenerationKeys.set(e,Date.now()),this._pruneCompletedKeys())}_pruneCompletedKeys(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,o]of this._completedGenerationKeys)(!Number.isFinite(o)||o<e)&&this._completedGenerationKeys.delete(s)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),this._log(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,s,o={}){return e.transition(je.SKIPPED,{verdict:s,...o}),this._recordTransaction(e),{success:!1,skipped:!0,reason:s,traceId:e.traceId,...o}}_enqueueSlot(e,s){let r=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(s).finally(()=>{this._slotQueues.get(e)===r&&this._slotQueues.delete(e)});return this._slotQueues.set(e,r),r}_resetForChatChange(){let e=Ul(),s=zl(e);this._log("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:s}),this._currentChatId=s,this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._isDuringExtraAnalysis=!1,this._isProcessingMessage=!1}_scheduleInitRetry(e,s){this._initRetryTimer&&clearTimeout(this._initRetryTimer),this._hostBindingStatus={...this._hostBindingStatus,retryScheduled:!0,retryDelayMs:e},this._initRetryTimer=setTimeout(()=>{this._initRetryTimer=null,this.init({retryOnFailure:!1,retryDelayMs:e,attempt:s})},Math.max(200,e))}_clearMessageState(e){if(e){for(let[s,o]of this._pendingTimers)(s.includes(`::${e}::`)||s.startsWith(`msg::${e}::`))&&(clearTimeout(o),this._pendingTimers.delete(s));for(let s of this._completedGenerationKeys.keys())s.startsWith(`${e}::`)&&this._completedGenerationKeys.delete(s)}}_evaluateEnabled(){return this._getAutomationSettings().enabled===!0}_checkEnabled(){if(this._enabled)return!0;if(!this._enabledCheckedOnce){this._enabledCheckedOnce=!0;let e=this._getAutomationSettings();this._log("\u26A0 \u81EA\u52A8\u5316\u672A\u542F\u7528\uFF0C\u9996\u6B21\u8BCA\u65AD:",{"automation.enabled":e.enabled,"\u5B8C\u6574 automation \u8BBE\u7F6E":e,\u63D0\u793A:"\u8BF7\u786E\u4FDD settings.automation.enabled === true"})}return!1}_getAutomationSettings(){let e=Ie.getSettings()?.automation||{},s=Number.isFinite(e.settleMs)?e.settleMs:800;return{enabled:e.enabled===!0,settleMs:s,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(1200,s+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}_log(...e){(this.debugMode||Ie.getDebugSettings?.()?.enableDebugLog)&&console.log("[ToolAutomation]",...e)}},Fl=new Mr,My=Fl});function Yl(t,e={}){let{constants:s,topLevelWindow:o,modules:r}=t,{SCRIPT_ID:a,SCRIPT_VERSION:n,MENU_ITEM_ID:l,MENU_CONTAINER_ID:i}=s,c=null,d=!1,u=new Map,f={storageModule:()=>Promise.resolve().then(()=>($r(),Ir)),uiComponentsModule:()=>Promise.resolve().then(()=>(Dl(),Ol)),promptEditorModule:()=>Promise.resolve().then(()=>(Nl(),Ll)),toolExecutorModule:()=>Promise.resolve().then(()=>(or(),sr)),windowManagerModule:()=>Promise.resolve().then(()=>(Ga(),qa))};function y(...E){console.log(`[${a}]`,...E)}function m(...E){console.error(`[${a}]`,...E)}async function v(E){return!E||!f[E]?null:r[E]?r[E]:(u.has(E)||u.set(E,(async()=>{try{let L=await f[E]();return r[E]=L,L}catch(L){throw u.delete(E),L}})()),u.get(E))}async function w(){return c||(c=(async()=>{try{return r.storageModule=await Promise.resolve().then(()=>($r(),Ir)),r.apiConnectionModule=await Promise.resolve().then(()=>(Ds(),yn)),r.presetManagerModule=await Promise.resolve().then(()=>(Bs(),mn)),r.uiModule=await Promise.resolve().then(()=>(Ha(),El)),r.regexExtractorModule=await Promise.resolve().then(()=>(Ro(),Mn)),r.toolManagerModule=await Promise.resolve().then(()=>(Wo(),Ln)),r.toolExecutorModule=await Promise.resolve().then(()=>(or(),sr)),r.windowManagerModule=await Promise.resolve().then(()=>(Ga(),qa)),r.toolRegistryModule=await Promise.resolve().then(()=>(At(),ti)),r.settingsServiceModule=await Promise.resolve().then(()=>(Qs(),gi)),r.bypassManagerModule=await Promise.resolve().then(()=>(Js(),pi)),r.variableResolverModule=await Promise.resolve().then(()=>(eo(),hi)),r.contextInjectorModule=await Promise.resolve().then(()=>(Vt(),mi)),r.toolPromptServiceModule=await Promise.resolve().then(()=>(Xo(),xi)),r.toolOutputServiceModule=await Promise.resolve().then(()=>(er(),wi)),r.toolAutomationServiceModule=await Promise.resolve().then(()=>(Hl(),Kl)),r.toolOutputServiceModule?.toolOutputService&&r.apiConnectionModule&&r.toolOutputServiceModule.toolOutputService.setApiConnection(r.apiConnectionModule),!0}catch(E){return c=null,console.warn(`[${a}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,E),console.warn(`[${a}] \u5DF2\u52A0\u8F7D\u6A21\u5757:`,Object.keys(r).filter(L=>r[L])),!1}})(),c)}function A(){return`
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
      #${i} { display: flex; align-items: center; }

      #${l} {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 14px; cursor: pointer;
        transition: all 0.2s ease; border-radius: 8px; margin: 2px;
      }

      #${l}:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
      }

      #${l} .fa-fw {
        font-size: 16px; color: var(--yyt-accent);
        filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      }

      #${l} span { font-weight: 500; letter-spacing: 0.3px; }

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
    `}async function k(){let E=`${a}-styles`,L=o.document||document;if(L.getElementById(E))return;let N="",B=[];try{B.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{B.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}B.push("./styles/main.css");for(let ce of[...new Set(B.filter(Boolean))])try{let pe=await fetch(ce);if(pe.ok){N=await pe.text();break}}catch{}N||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),N=A());let te=L.createElement("style");te.id=E,te.textContent=N,(L.head||L.documentElement).appendChild(te),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function C(){let E=o.document||document;if(r.uiModule?.getAllStyles){let L=`${a}-ui-styles`;if(!E.getElementById(L)){let N=E.createElement("style");N.id=L,N.textContent=r.uiModule.getAllStyles(),(E.head||E.documentElement).appendChild(N)}}if(r.promptEditorModule&&r.promptEditorModule.getPromptEditorStyles){let L=`${a}-prompt-styles`;if(!E.getElementById(L)){let N=E.createElement("style");N.id=L,N.textContent=r.promptEditorModule.getPromptEditorStyles(),(E.head||E.documentElement).appendChild(N)}}}async function F(){try{let{applyUiPreferences:E}=await Promise.resolve().then(()=>(lr(),Li));if(r.settingsServiceModule?.settingsService){let L=r.settingsServiceModule.settingsService.getUiSettings();if(L&&L.theme){let N=o.document||document;E(L,N),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${L.theme}`)}}}catch(E){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",E)}}function K(){let E=o.jQuery||window.jQuery;if(!E){m("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(K,1e3);return}let L=o.document||document,N=E("#extensionsMenu",L);if(!N.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(K,2e3);return}if(E(`#${i}`,N).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let te=E(`<div class="extension_container interactable" id="${i}" tabindex="0"></div>`),ce=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${l}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,pe=E(ce);pe.on("click",function(V){V.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let tt=E("#extensionsMenuButton",L);tt.length&&N.is(":visible")&&tt.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),te.append(pe),N.append(te),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function W(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${n}`),await k();let E=await w();if(y(E?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&r.uiModule?.initUI)try{r.uiModule.initUI({services:r,autoInjectStyles:!1,targetDocument:o.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(N){console.error(`[${a}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,N)}if(r.uiModule&&(C(),await F()),r.toolAutomationServiceModule?.toolAutomationService){let N=r.toolAutomationServiceModule.toolAutomationService.init();y(N?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let L=o.document||document;L.readyState==="loading"?L.addEventListener("DOMContentLoaded",()=>{setTimeout(K,1e3)}):setTimeout(K,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:w,injectStyles:k,addMenuItem:K,loadLegacyModule:v,init:W,log:y,logError:m}}me();Se();function ql(t){let{constants:e,topLevelWindow:s,modules:o,caches:r,uiState:a}=t,{SCRIPT_ID:n,SCRIPT_VERSION:l,POPUP_ID:i}=e,c={cleanup:null},d={cleanups:[]},u={cleanups:[]};function f(...p){console.log(`[${n}]`,...p)}function y(...p){console.error(`[${n}]`,...p)}async function m(p){if(o[p])return o[p];let h=t?.services?.loadLegacyModule;if(typeof h!="function")return null;try{return await h(p)}catch(T){return y(`\u517C\u5BB9\u6A21\u5757\u52A0\u8F7D\u5931\u8D25: ${p}`,T),null}}function v(p){return typeof p!="string"?"":p.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function w(){return s.jQuery||window.jQuery}function A(){return s.document||document}function k(){return o.settingsServiceModule?.settingsService||null}function C(){return k()?.getUiSettings?.()?.startupScreenDismissed===!0}function F(){let p=k();if(p){if(typeof p.set=="function"){p.set("ui.startupScreenDismissed",!0);return}if(typeof p.updateUiSettings=="function"){let h=p.getUiSettings?.()||{};p.updateUiSettings({...h,startupScreenDismissed:!0})}}}function K(p){if(!p)return"\u672A\u9009\u62E9\u9875\u9762";let h=o.toolRegistryModule?.getToolConfig(p);if(!h)return p;if(!h.hasSubTabs)return h.name||p;let T=E(p),S=h.subTabs?.find(P=>P.id===T);return S?.name?`${h.name} / ${S.name}`:h.name||p}function W(p){if(!p)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let h=o.toolRegistryModule?.getToolConfig(p);if(!h)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!h.hasSubTabs)return h.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let T=E(p);return h.subTabs?.find(P=>P.id===T)?.description||h.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function E(p,h=""){let T=o.toolRegistryModule?.getToolConfig(p);if(!T?.hasSubTabs||!Array.isArray(T.subTabs)||T.subTabs.length===0)return"";let S=String(h||a.currentSubTab[p]||"").trim(),R=S&&T.subTabs.some(z=>z?.id===S)?S:T.subTabs[0]?.id||"";return R&&a.currentSubTab[p]!==R&&(a.currentSubTab[p]=R),R}function L(){let p=a.currentPopup;if(!p)return;let h=K(a.currentMainTab),T=W(a.currentMainTab),S=p.querySelector(".yyt-popup-active-label");S&&(S.textContent=`\u5F53\u524D\uFF1A${h}`);let P=p.querySelector(".yyt-shell-breadcrumb");P&&(P.textContent=h);let R=p.querySelector(".yyt-shell-main-title");R&&(R.textContent=h);let z=p.querySelector(".yyt-shell-main-description");z&&(z.textContent=T)}function N(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function B(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(p=>{typeof p=="function"&&p()}),d.cleanups=[])}function te(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(p=>{typeof p=="function"&&p()}),u.cleanups=[])}function ce(){let p=w();if(!p||!a.currentPopup)return;let h=o.toolRegistryModule?.getToolList()||[],T=p(a.currentPopup).find(".yyt-main-nav");if(!T.length)return;let S=h.map(R=>`
      <div class="yyt-main-nav-item ${R.id===a.currentMainTab?"active":""}" data-tab="${R.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(R.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(R.name||R.id)}</span>
          <span class="yyt-main-nav-desc">${v(R.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");T.html(S),p(a.currentPopup).find(".yyt-main-nav-item").on("click",function(){let z=p(this).data("tab");z&&st(z)});let P=p(a.currentPopup).find(".yyt-shell-sidebar-hint");P.length&&P.text(`${h.length} tabs`)}function pe(){let p=w();if(!p||!a.currentPopup)return;let h=o.toolRegistryModule?.getToolList()||[],T=o.toolRegistryModule?.getToolConfig("tools"),S=Array.isArray(T?.subTabs)?T.subTabs:[],P=S.filter(q=>q?.isCustom).length,R=S.filter(q=>!q?.isCustom).length,z=p(a.currentPopup);z.find(".yyt-shell-topbar-meta").text(`\u4E3B\u9875\u9762 ${h.length} / \u9ED8\u8BA4\u5DE5\u5177 ${R} / \u81EA\u5B9A\u4E49\u5DE5\u5177 ${P}`),z.find(".yyt-shell-stat").eq(0).find(".yyt-shell-stat-value").text(String(h.length)),z.find(".yyt-shell-stat").eq(1).find(".yyt-shell-stat-value").text(String(R)),z.find(".yyt-shell-stat").eq(2).find(".yyt-shell-stat-value").text(String(P))}function We(){let p=o.toolRegistryModule?.getToolList()||[];return p.length?(p.some(h=>h.id===a.currentMainTab)||(a.currentMainTab=p[0].id),a.currentMainTab):null}async function V(p={}){let{rebuildNavigation:h=!1,reRenderSubNav:T=!1}=p,S=w();if(!S||!a.currentPopup)return;let P=We();if(!P)return;h&&(ce(),pe());let R=o.toolRegistryModule?.getToolConfig(P),z=!!R?.hasSubTabs,q=S(a.currentPopup).find(".yyt-sub-nav"),U=S(a.currentPopup).find(".yyt-content-inner");if(h&&U.length){let j=new Set(U.find(".yyt-tab-content").map((ue,he)=>S(he).data("tab")).get());(o.toolRegistryModule?.getToolList()||[]).forEach(ue=>{j.has(ue.id)||U.append(`<div class="yyt-tab-content" data-tab="${v(ue.id)}"></div>`)}),U.find(".yyt-tab-content").each((ue,he)=>{let dt=S(he).data("tab");(o.toolRegistryModule?.getToolList()||[]).some(ot=>ot.id===dt)||S(he).remove()})}S(a.currentPopup).find(".yyt-main-nav-item").removeClass("active"),S(a.currentPopup).find(`.yyt-main-nav-item[data-tab="${P}"]`).addClass("active"),S(a.currentPopup).find(".yyt-tab-content").removeClass("active"),S(a.currentPopup).find(`.yyt-tab-content[data-tab="${P}"]`).addClass("active"),z?(q.show(),(T||h)&&Pt(P,R.subTabs)):q.hide(),await It(P),L(),fe()}function tt(){if(!a.currentPopup)return;B();let p=()=>{if(a.currentMainTab==="apiPresets"){V();return}a.currentMainTab==="tools"&&V({reRenderSubNav:!0})},h=()=>{a.currentMainTab==="tools"?V({rebuildNavigation:!0,reRenderSubNav:!0}):pe()},T=()=>{(a.currentMainTab==="bypass"||a.currentMainTab==="tools")&&V({reRenderSubNav:a.currentMainTab==="tools"})};[M.PRESET_CREATED,M.PRESET_UPDATED,M.PRESET_DELETED].forEach(S=>{d.cleanups.push(I.on(S,p))}),[M.TOOL_REGISTERED,M.TOOL_UPDATED,M.TOOL_UNREGISTERED].forEach(S=>{d.cleanups.push(I.on(S,h))}),[M.BYPASS_PRESET_CREATED,M.BYPASS_PRESET_UPDATED,M.BYPASS_PRESET_DELETED].forEach(S=>{d.cleanups.push(I.on(S,T))})}function Mt(p){return!!p?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function Ct(p){let h=p?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return h?h.scrollHeight>h.clientHeight+2||h.scrollWidth>h.clientWidth+2:!1}function Fe(p,h){return h?.closest?.(".yyt-scrollable-surface")===p}function de(p,h){if(!p||!h)return null;let T=h.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return T&&p.contains(T)&&(T.scrollHeight>T.clientHeight+2||T.scrollWidth>T.clientWidth+2)?T:[h.closest?.(".yyt-tool-list"),h.closest?.(".yyt-settings-content"),h.closest?.(".yyt-sub-content"),h.closest?.(".yyt-tab-content.active"),p].filter(Boolean).find(P=>P!==p&&!p.contains(P)?!1:P.scrollHeight>P.clientHeight+2||P.scrollWidth>P.clientWidth+2)||p}function J({mainTab:p=null,includeSubContent:h=!1}={}){let T=a.currentPopup;if(!T)return;let S=T.querySelector(".yyt-content");S&&(S.scrollTop=0,S.scrollLeft=0);let P=p?`.yyt-tab-content[data-tab="${p}"]`:".yyt-tab-content.active",R=T.querySelector(P);if(R&&(R.scrollTop=0,R.scrollLeft=0),!h)return;(R?.querySelectorAll(".yyt-sub-content")||[]).forEach(q=>{q.scrollTop=0,q.scrollLeft=0})}function Ee(p){let h=A();if(!p||!h)return;p.classList.add("yyt-scrollable-surface");let T=!1,S=!1,P=0,R=0,z=0,q=0,U=!1,j=!1,ue=()=>{T=!1,S=!1,p.classList.remove("yyt-scroll-dragging")},he=H=>{H.button===0&&(Mt(H.target)||Fe(p,H.target)&&(U=p.scrollWidth>p.clientWidth+2,j=p.scrollHeight>p.clientHeight+2,!(!U&&!j)&&(H.stopPropagation(),T=!0,S=!1,P=H.clientX,R=H.clientY,z=p.scrollLeft,q=p.scrollTop)))},dt=H=>{if(!T)return;let Ot=H.clientX-P,Ae=H.clientY-R;!(Math.abs(Ot)>4||Math.abs(Ae)>4)&&!S||(S=!0,p.classList.add("yyt-scroll-dragging"),U&&(p.scrollLeft=z-Ot),j&&(p.scrollTop=q-Ae),H.preventDefault())},ot=()=>{ue()},xt=H=>{if(H.ctrlKey||Ct(H.target)||!p.classList.contains("yyt-content")&&!Fe(p,H.target))return;let Ae=de(p,H.target);!Ae||Ae!==p&&!p.contains(Ae)||!(Ae.scrollHeight>Ae.clientHeight+2||Ae.scrollWidth>Ae.clientWidth+2)||(Math.abs(H.deltaY)>0&&(Ae.scrollTop+=H.deltaY),Math.abs(H.deltaX)>0&&(Ae.scrollLeft+=H.deltaX),H.preventDefault(),H.stopPropagation())},G=H=>{S&&H.preventDefault()};p.addEventListener("mousedown",he),p.addEventListener("wheel",xt,{passive:!1}),p.addEventListener("dragstart",G),h.addEventListener("mousemove",dt),h.addEventListener("mouseup",ot),u.cleanups.push(()=>{ue(),p.classList.remove("yyt-scrollable-surface"),p.removeEventListener("mousedown",he),p.removeEventListener("wheel",xt),p.removeEventListener("dragstart",G),h.removeEventListener("mousemove",dt),h.removeEventListener("mouseup",ot)})}function fe(){let p=a.currentPopup;if(!p)return;te();let h=[...p.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...p.querySelectorAll(".yyt-sub-nav"),...p.querySelectorAll(".yyt-content"),...p.querySelectorAll(".yyt-settings-content"),...p.querySelectorAll(".yyt-tool-list")];[...new Set(h)].forEach(Ee)}function rs(p){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u9996\u6B21\u542F\u52A8\u754C\u9762\u53EA\u51FA\u73B0\u4E00\u6B21\uFF0C\u4E5F\u4E3A\u540E\u7EED\u5F02\u6B65\u51C6\u5907\u72B6\u6001\u9884\u7559\u4F4D\u7F6E\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(p||[]).slice(0,6).map(T=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${v(T.icon||"fa-file")}"></i>
        <span>${v(T.name||T.id)}</span>
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
    `}function as(p){let h=w();if(!h||!a.currentPopup||C())return;let T=h(a.currentPopup).find(".yyt-popup-body"),S=T.find(".yyt-popup-shell");!T.length||!S.length||T.find("[data-yyt-startup-screen]").length||(S.attr("data-yyt-startup-visible","true"),T.prepend(rs(p)),T.find(".yyt-startup-enter").on("click",()=>{F(),T.find("[data-yyt-startup-screen]").remove(),S.removeAttr("data-yyt-startup-visible"),fe()}))}function As(){let p=A(),h=a.currentPopup,T=h?.querySelector(".yyt-popup-header");if(!h||!T||!p)return;let S=!1,P=0,R=0,z=0,q=0,U="",j=()=>({width:s.innerWidth||p.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||p.documentElement?.clientHeight||window.innerHeight||0}),ue=(G,H,Ot)=>Math.min(Math.max(G,H),Ot),he=()=>{S&&(S=!1,h.classList.remove("yyt-popup-dragging"),p.body.style.userSelect=U)},dt=G=>{if(!S||!a.currentPopup)return;let H=G.clientX-P,Ot=G.clientY-R,{width:Ae,height:Pr}=j(),Xl=h.offsetWidth||0,Ql=h.offsetHeight||0,Zl=Math.max(0,Ae-Xl),ec=Math.max(0,Pr-Ql);h.style.left=`${ue(z+H,0,Zl)}px`,h.style.top=`${ue(q+Ot,0,ec)}px`,h.style.transform="none",h.style.right="auto",h.style.bottom="auto"},ot=()=>{he()},xt=G=>{if(G.button!==0||G.target?.closest(".yyt-popup-close"))return;S=!0,P=G.clientX,R=G.clientY;let H=h.getBoundingClientRect();z=H.left,q=H.top,h.style.left=`${H.left}px`,h.style.top=`${H.top}px`,h.style.transform="none",h.style.right="auto",h.style.bottom="auto",h.classList.add("yyt-popup-dragging"),U=p.body.style.userSelect||"",p.body.style.userSelect="none",G.preventDefault()};T.addEventListener("mousedown",xt),p.addEventListener("mousemove",dt),p.addEventListener("mouseup",ot),c.cleanup=()=>{he(),T.removeEventListener("mousedown",xt),p.removeEventListener("mousemove",dt),p.removeEventListener("mouseup",ot)}}function vt(){N(),B(),te();let p=w();if(p&&a.currentPopup){let h=p(a.currentPopup);ye(h,"yytPopupToolConfigSelect"),ye(h,"yytPromptEditorSelect")}a.currentPopup&&(a.currentPopup.remove(),a.currentPopup=null),a.currentOverlay&&(a.currentOverlay.remove(),a.currentOverlay=null),f("\u5F39\u7A97\u5DF2\u5173\u95ED")}function st(p){a.currentMainTab=p;let h=w();if(!h||!a.currentPopup)return;J({mainTab:p,includeSubContent:!0}),h(a.currentPopup).find(".yyt-main-nav-item").removeClass("active"),h(a.currentPopup).find(`.yyt-main-nav-item[data-tab="${p}"]`).addClass("active");let T=o.toolRegistryModule?.getToolConfig(p);T?.hasSubTabs?(h(a.currentPopup).find(".yyt-sub-nav").show(),Pt(p,T.subTabs)):h(a.currentPopup).find(".yyt-sub-nav").hide(),h(a.currentPopup).find(".yyt-tab-content").removeClass("active"),h(a.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`).addClass("active"),It(p),L(),fe()}function ns(p,h){a.currentSubTab[p]=h;let T=w();!T||!a.currentPopup||(J({mainTab:p,includeSubContent:!0}),T(a.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),T(a.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${h}"]`).addClass("active"),$t(p,h),L(),fe())}function Pt(p,h){let T=w();if(!T||!a.currentPopup||!h)return;let S=E(p,a.currentSubTab[p]||h[0]?.id),R=(p==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:h.filter(z=>(z?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:h.filter(z=>z?.toolKind==="script")}].filter(z=>z.items.length>0):[{key:"default",title:"",items:h}]).map(z=>{let q=z.title?`<div class="yyt-sub-nav-group-title">${v(z.title)}</div>`:"",U=z.items.map(j=>`
        <div class="yyt-sub-nav-item ${j.id===S?"active":""}" data-subtab="${j.id}">
          <i class="fa-solid ${j.icon||"fa-file"}"></i>
          <span>${v(j.name||j.id)}</span>
        </div>
      `).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${z.key}">
          ${q}
          <div class="yyt-sub-nav-group-items">
            ${U}
          </div>
        </div>
      `}).join("");T(a.currentPopup).find(".yyt-sub-nav").html(R),T(a.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let q=T(this).data("subtab");ns(p,q)}),fe()}async function It(p){let h=w();if(!h||!a.currentPopup)return;let T=h(a.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`);if(!T.length)return;let S=o.toolRegistryModule?.getToolConfig(p);switch(p){case"apiPresets":if(o.uiModule?.renderApiPanel)o.uiModule.renderApiPanel(T);else{let P=await m("uiComponentsModule");P?.render&&P.render(T)}break;case"toolManage":if(o.uiModule?.renderToolPanel)o.uiModule.renderToolPanel(T);else{let P=await m("uiComponentsModule");P?.renderTool&&P.renderTool(T)}break;case"regexExtract":if(o.uiModule?.renderRegexPanel)o.uiModule.renderRegexPanel(T);else{let P=await m("uiComponentsModule");P?.renderRegex&&P.renderRegex(T)}break;case"tools":{let P=E(p);S?.hasSubTabs&&P?await $t(p,P):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"tableWorkbench":o.uiModule?.renderTableWorkbenchPanel?o.uiModule.renderTableWorkbenchPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":o.uiModule?.renderBypassPanel?o.uiModule.renderBypassPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":o.uiModule?.renderSettingsPanel?o.uiModule.renderSettingsPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:Ms(p,T);break}fe()}async function $t(p,h){let T=w();if(!T||!a.currentPopup)return;let S=T(a.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`);if(!S.length)return;let P=o.toolRegistryModule?.getToolConfig(p);if(P?.hasSubTabs){let z=E(p,h),q=P.subTabs?.find(j=>j.id===z),U=S.find(".yyt-sub-content");if(U.length||(S.html('<div class="yyt-sub-content"></div>'),U=S.find(".yyt-sub-content")),!q){U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),J({mainTab:p,includeSubContent:!0}),fe();return}switch(q.component){case"SummaryToolPanel":if(o.uiModule?.renderSummaryToolPanel)o.uiModule.renderSummaryToolPanel(U);else{let j=await m("uiComponentsModule");j?.SummaryToolPanel?j.SummaryToolPanel.renderTo(U):U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"StatusBlockPanel":if(o.uiModule?.renderStatusBlockPanel)o.uiModule.renderStatusBlockPanel(U);else{let j=await m("uiComponentsModule");j?.StatusBlockPanel?j.StatusBlockPanel.renderTo(U):U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"YouyouReviewPanel":if(o.uiModule?.renderYouyouReviewPanel)o.uiModule.renderYouyouReviewPanel(U);else{let j=await m("uiComponentsModule");j?.YouyouReviewPanel?j.YouyouReviewPanel.renderTo(U):U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"EscapeTransformToolPanel":if(o.uiModule?.renderEscapeTransformToolPanel)o.uiModule.renderEscapeTransformToolPanel(U);else{let j=await m("uiComponentsModule");j?.EscapeTransformToolPanel?j.EscapeTransformToolPanel.renderTo(U):U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"PunctuationTransformToolPanel":if(o.uiModule?.renderPunctuationTransformToolPanel)o.uiModule.renderPunctuationTransformToolPanel(U);else{let j=await m("uiComponentsModule");j?.PunctuationTransformToolPanel?j.PunctuationTransformToolPanel.renderTo(U):U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>')}break;case"GenericToolConfigPanel":await ks(q,U);break;default:U.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}J({mainTab:p,includeSubContent:!0}),fe();return}let R=S.find(".yyt-sub-content");if(R.length){switch(h){case"config":fo(p,R);break;case"prompts":await mo(p,R);break;case"presets":Rt(p,R);break;default:R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}J({mainTab:p,includeSubContent:!0}),fe()}}async function ks(p,h){if(!(!w()||!h?.length||!p?.id))try{let S=r.dynamicToolPanelCache.get(p.id);if(!S){let R=(await Promise.resolve().then(()=>(Zt(),Pi)))?.createToolConfigPanel;if(typeof R!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");S=R({id:`${p.id}Panel`,toolId:p.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${p.name||p.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${p.id}-extraction-preview`,previewTitle:`${p.name||p.id} \u63D0\u53D6\u9884\u89C8`}),r.dynamicToolPanelCache.set(p.id,S)}S.renderTo(h),fe()}catch(S){console.error(`[${n}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,S),h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function Ms(p,h){if(!w())return;let S=o.toolRegistryModule?.getToolConfig(p);if(!S){h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let P=a.currentSubTab[p]||S.subTabs?.[0]?.id||"config";h.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${P}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),$t(p,P)}function fo(p,h){if(!w())return;let S=o.toolManagerModule?.getTool(p),P=o.presetManagerModule?.getAllPresets()||[],R=o.toolRegistryModule?.getToolApiPreset(p)||"",z=P.map(q=>`<option value="${v(q.name)}" ${q.name===R?"selected":""}>${v(q.name)}</option>`).join("");h.html(`
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
              ${z}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${S?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${S?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),Te(h,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),h.find("#yyt-save-tool-preset").on("click",function(){let U=h.find("#yyt-tool-api-preset").val();o.toolRegistryModule?.setToolApiPreset(p,U);let j=s.toastr;j&&j.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function mo(p,h){let T=w(),S=o.promptEditorModule||await m("promptEditorModule");if(!T||!S){h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let R=o.toolManagerModule?.getTool(p)?.config?.messages||[],z=S.messagesToSegments?S.messagesToSegments(R):S.DEFAULT_PROMPT_SEGMENTS,q=new S.PromptEditor({containerId:`yyt-prompt-editor-${p}`,segments:z,onChange:j=>{let ue=S.segmentsToMessages?S.segmentsToMessages(j):[];f("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ue.length,"\u6761\u6D88\u606F")}});h.html(`<div id="yyt-prompt-editor-${p}" class="yyt-prompt-editor-container"></div>`),q.init(h.find(`#yyt-prompt-editor-${p}`));let U=S.getPromptEditorStyles?S.getPromptEditorStyles():"";if(U){let j="yyt-prompt-editor-styles",ue=s.document||document;if(!ue.getElementById(j)){let he=ue.createElement("style");he.id=j,he.textContent=U,(ue.head||ue.documentElement).appendChild(he)}}}function Rt(p,h){w()&&h.html(`
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
    `)}async function Jl(){if(a.currentPopup){f("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let p=t?.services?.loadModules;typeof p=="function"&&await p();let h=w(),T=A();if(!h){y("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let S=o.toolRegistryModule?.getToolList()||[];if(!S.length){y("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}S.some(G=>G.id===a.currentMainTab)||(a.currentMainTab=S[0].id);let P=o.toolRegistryModule?.getToolConfig("tools"),R=Array.isArray(P?.subTabs)?P.subTabs:[],z=R.filter(G=>G?.isCustom).length,q=R.filter(G=>!G?.isCustom).length,U=K(a.currentMainTab),j=W(a.currentMainTab);a.currentOverlay=T.createElement("div"),a.currentOverlay.className="yyt-popup-overlay",a.currentOverlay.addEventListener("click",G=>{G.target===a.currentOverlay&&vt()}),T.body.appendChild(a.currentOverlay);let ue=S.map(G=>`
      <div class="yyt-main-nav-item ${G.id===a.currentMainTab?"active":""}" data-tab="${G.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(G.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(G.name||G.id)}</span>
          <span class="yyt-main-nav-desc">${v(G.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),he=S.map(G=>`
      <div class="yyt-tab-content ${G.id===a.currentMainTab?"active":""}" data-tab="${G.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),dt=`
      <div class="yyt-popup" id="${i}">
        <div class="yyt-popup-header">
          <div class="yyt-popup-brand">
            <div class="yyt-popup-title-row">
              <div class="yyt-popup-title">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>YouYou \u5DE5\u5177\u7BB1</span>
              </div>
              <span class="yyt-popup-version">v${l}</span>
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
                  <div class="yyt-shell-topbar-meta">\u4E3B\u9875\u9762 ${S.length} / \u9ED8\u8BA4\u5DE5\u5177 ${q} / \u81EA\u5B9A\u4E49\u5DE5\u5177 ${z}</div>
                </div>
              </div>
              <div class="yyt-shell-stats">
                <div class="yyt-shell-stat">
                  <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                  <strong class="yyt-shell-stat-value">${S.length}</strong>
                </div>
                <div class="yyt-shell-stat">
                  <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                  <strong class="yyt-shell-stat-value">${q}</strong>
                </div>
                <div class="yyt-shell-stat">
                  <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                  <strong class="yyt-shell-stat-value">${z}</strong>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${S.length} tabs</span>
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
                      <div class="yyt-shell-breadcrumb">${v(U)}</div>
                    </div>
                    <div class="yyt-shell-main-title">${v(U)}</div>
                    <div class="yyt-shell-main-description">${v(j)}</div>
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
                      ${he}
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
                <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${v(U)}</span>
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
    `,ot=T.createElement("div");ot.innerHTML=dt,a.currentPopup=ot.firstElementChild,T.body.appendChild(a.currentPopup),h(a.currentPopup).find(".yyt-popup-close").on("click",vt),h(a.currentPopup).find(`#${n}-close-btn`).on("click",vt),tt(),h(a.currentPopup).find(".yyt-main-nav-item").on("click",function(){let H=h(this).data("tab");H&&st(H)}),As(),It(a.currentMainTab);let xt=o.toolRegistryModule?.getToolConfig(a.currentMainTab);xt?.hasSubTabs&&(h(a.currentPopup).find(".yyt-sub-nav").show(),Pt(a.currentMainTab,xt.subTabs)),L(),as(S),fe(),f("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Jl,closePopup:vt,switchMainTab:st,switchSubTab:ns,renderTabContent:It,renderSubTabContent:$t}}function Gl(t,e={}){let{constants:s,modules:o}=t,{SCRIPT_ID:r,SCRIPT_VERSION:a}=s,{init:n,loadModules:l,loadLegacyModule:i,addMenuItem:c,popupShell:d}=e;return{version:a,id:r,init:n,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:c,getStorage:()=>o.storageModule,getApiConnection:()=>o.apiConnectionModule,getPresetManager:()=>o.presetManagerModule,getUi:()=>o.uiModule,getUiModule:()=>o.uiModule,getUiComponents:()=>o.uiComponentsModule,getRegexExtractor:()=>o.regexExtractorModule,getToolManager:()=>o.toolManagerModule,getToolExecutor:()=>o.toolExecutorModule,getWindowManager:()=>o.windowManagerModule,getToolRegistry:()=>o.toolRegistryModule,getPromptEditor:()=>o.promptEditorModule,getSettingsService:()=>o.settingsServiceModule,getBypassManager:()=>o.bypassManagerModule,getVariableResolver:()=>o.variableResolverModule,getContextInjector:()=>o.contextInjectorModule,getToolPromptService:()=>o.toolPromptServiceModule,getToolOutputService:()=>o.toolOutputServiceModule,getToolAutomationService:()=>o.toolAutomationServiceModule,async loadLegacyModule(u){return typeof i!="function"?null:i(u)},async getApiConfig(){return await l(),o.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(u){return await l(),o.apiConnectionModule?(o.apiConnectionModule.updateApiConfig(u),!0):!1},async getPresets(){return await l(),o.presetManagerModule?o.presetManagerModule.getAllPresets():[]},async sendApiRequest(u,f){if(await l(),o.apiConnectionModule)return o.apiConnectionModule.sendApiRequest(u,f);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await l(),o.apiConnectionModule?o.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(u,f){return o.toolRegistryModule?.registerTool(u,f)||!1},unregisterTool(u){return o.toolRegistryModule?.unregisterTool(u)||!1},getToolList(){return o.toolRegistryModule?.getToolList()||[]},createWindow(u){return o.windowManagerModule?.createWindow(u)||null},closeWindow(u){o.windowManagerModule?.closeWindow(u)},startAutomation(){return o.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){o.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return o.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},async processCurrentAssistantMessage(u={}){return o.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(u)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var po="youyou_toolkit",Cy="1.0.37",Py=`${po}-menu-item`,Iy=`${po}-menu-container`,$y=`${po}-popup`,Ry=typeof window.parent<"u"?window.parent:window,go={constants:{SCRIPT_ID:po,SCRIPT_VERSION:Cy,MENU_ITEM_ID:Py,MENU_CONTAINER_ID:Iy,POPUP_ID:$y},topLevelWindow:Ry,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null,loadLegacyModule:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},Vl=ql(go),os=Yl(go,{openPopup:Vl.openPopup});go.services.loadModules=os.loadModules;go.services.loadLegacyModule=os.loadLegacyModule;var Xa=Gl(go,{init:os.init,loadModules:os.loadModules,loadLegacyModule:os.loadLegacyModule,addMenuItem:os.addMenuItem,popupShell:Vl});if(typeof window<"u"&&(window.YouYouToolkit=Xa,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Xa}catch{}var Qf=Xa;os.init();console.log(`[${po}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{Qf as default};
