var YouYouToolkit=(()=>{var Ri=Object.defineProperty;var Eh=Object.getOwnPropertyDescriptor;var Ah=Object.getOwnPropertyNames;var Ch=Object.prototype.hasOwnProperty;var P=(t,e)=>()=>(t&&(e=t(t=0)),e);var ie=(t,e)=>{for(var r in e)Ri(t,r,{get:e[r],enumerable:!0})},kh=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Ah(e))!Ch.call(t,o)&&o!==r&&Ri(t,o,{get:()=>e[o],enumerable:!(s=Eh(e,o))||s.enumerable});return t};var Ih=t=>kh(Ri({},"__esModule",{value:!0}),t);var U,Mi,W,Qe=P(()=>{U={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Mi=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,s={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=s;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:r,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let s=this.listeners.get(e);if(s){for(let o of s)if(o.callback===r){s.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let s=this.listeners.get(e);if(!s||s.size===0)return;let o=Array.from(s).sort((n,a)=>a.priority-n.priority);for(let{callback:n}of o)try{n(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let s=o=>{this.off(e,s),r(o)};return this.on(e,s)}wait(e,r=0){return new Promise((s,o)=>{let n=null,a=this.once(e,i=>{n&&clearTimeout(n),s(i)});r>0&&(n=setTimeout(()=>{a(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},W=new Mi});var $d={};ie($d,{LOG_LEVEL:()=>ge,LoggerService:()=>Wn,default:()=>Rh,logger:()=>C});var ge,Od,Wn,C,Rh,H=P(()=>{Qe();ge=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),Od=Object.freeze({[ge.DEBUG]:"DEBUG",[ge.INFO]:"INFO",[ge.WARN]:"WARN",[ge.ERROR]:"ERROR"}),Wn=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=ge.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1,this._toastHandler=null}_write(e,r,s,o,n){let a={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:s,data:o};if(this._entries.push(a),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(a),this._toastHandler&&n)try{this._toastHandler(this.levelToToastType(e),s,n)}catch{}this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(a)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case ge.DEBUG:console.debug(r,e.message,e.data??"");break;case ge.INFO:console.log(r,e.message,e.data??"");break;case ge.WARN:console.warn(r,e.message,e.data??"");break;case ge.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{W?.emit(this._eventKey,e)}catch{}}debug(e,r,s,o){ge.DEBUG<this._minLevel||this._write(ge.DEBUG,e,r,s,o)}info(e,r,s,o){ge.INFO<this._minLevel||this._write(ge.INFO,e,r,s,o)}log(e,r,s,o){this.info(e,r,s,o)}warn(e,r,s,o){ge.WARN<this._minLevel||this._write(ge.WARN,e,r,s,o)}error(e,r,s,o){ge.ERROR<this._minLevel||this._write(ge.ERROR,e,r,s,o)}createScope(e){return{debug:(r,s,o)=>this.debug(e,r,s,o),info:(r,s,o)=>this.info(e,r,s,o),log:(r,s,o)=>this.log(e,r,s,o),warn:(r,s,o)=>this.warn(e,r,s,o),error:(r,s,o)=>this.error(e,r,s,o)}}setToastHandler(e){this._toastHandler=e}levelToToastType(e){switch(e){case ge.WARN:return"warning";case ge.ERROR:return"error";default:return"info"}}getEntries(e={}){let{level:r,scope:s,search:o,limit:n=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(d=>d.level>=r)),s&&(i=i.filter(d=>d.scope===s)),o){let d=o.toLowerCase();i=i.filter(c=>c.scope.toLowerCase().includes(d)||c.message.toLowerCase().includes(d))}let l=i.length;return i=i.slice(a,a+n),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let s=Od[r.level]||"UNKNOWN";e.byLevel[s]=(e.byLevel[s]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return Od[e]||"UNKNOWN"}},C=new Wn,Rh=C});function hr(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function le(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Hn(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let s=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(s.toastr){s.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}Ph(t,e,r),Mh.log(`[${t.toUpperCase()}] ${e}`)}function Oi(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:s=3500,sticky:o=!1,noticeId:n=""}=r,a=hr();if(!a?.body){Hn(t,e,s);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",d=a.getElementById(i);if(d||(d=a.createElement("div"),d.id=i,d.style.cssText=`
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
    `,a.body.appendChild(d)),!a.getElementById(l)){let h=a.createElement("style");h.id=l,h.textContent=`
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
    `,a.head.appendChild(h)}if(n){let h=d.querySelector(`[data-notice-id="${n}"]`);h&&h.remove()}let c={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(u.dataset.noticeId=n);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=c[t]||c.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let g=a.createElement("button");g.className="yyt-top-notice__close",g.type="button",g.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),g.textContent="\xD7";let m=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};g.addEventListener("click",m),u.appendChild(y),u.appendChild(p),u.appendChild(g),d.appendChild(u),o||setTimeout(m,s)}function Ph(t,e,r){let s=hr();if(!s)return;let o=s.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=n[t]||n.info,i=s.createElement("div");i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,s.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function te(){if(ds)return ds;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return ds=window.parent.jQuery,ds}catch{}return window.jQuery&&(ds=window.jQuery),ds}function Nh(){ds=null}function ve(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Pr(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function Hs(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${le(String(r))}"`).join(" ")}function Ud(t=[],e="",r=""){let s=String(e??""),o=t.find(n=>n.value===s)||t.find(n=>n.disabled!==!0)||null;return o||{value:s,label:r||s||"\u8BF7\u9009\u62E9",disabled:!1}}function Dh(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function Bd(t,e){let r=te();if(!r||!e?.length)return null;let s=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!s)return null;let n=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===s);return n.length?n.first():null}function Fd(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Lh(t){if(!te()||!ve(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function jd(t,e){if(!te()||!e?.length)return null;let s=e.find("[data-yyt-select-native]").first();if(s.length)return s;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let n=t.find(o).first();return n.length?n:null}function Wd(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:hr()}function Qt(t=null){let e=Wd(t),r=zd.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},zd.set(e,r)),r}function Oh(t=null){let e=Wd(t);if(!e?.body)return null;let r=Qt(e);if(r.layer&&r.layer.isConnected)return r.layer;let s=e.getElementById(Kd);return s||(s=e.createElement("div"),s.id=Kd,s.className="yyt-select-portal-layer",e.body.appendChild(s)),r.layer=s,s}function Gn(t){if(!te()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function Hd(t){let e=te();if(!e||!t?.length)return null;let r=Qt(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let s=t.find("[data-yyt-select-dropdown]").first();return s.length?s:t.find(".yyt-select-dropdown").first()}function $h(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function Gd(t,e=null){if(!t)return!1;let r=Qt(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Bh(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,s=i=>{!t.activeRoot||!t.activeDropdown||Gd(i.target,e)||Xt(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;Xt(e);let d=te();d&&l&&Gn(d(l))?.trigger("focus")},n=()=>{Li(e)},a=()=>{Li(e)};e.addEventListener("mousedown",s,!0),e.addEventListener("keydown",o,!0),r.addEventListener("resize",n),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",s,!0),e.removeEventListener("keydown",o,!0),r.removeEventListener("resize",n),e.removeEventListener("scroll",a,!0)}}function zh(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Di(t){let e=te();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){Xt(r);return}let s=e(t.activeRoot),o=Gn(s),n=t.activeDropdown,a=r?.defaultView||window;if(!o?.length||!n?.isConnected||!s[0]?.isConnected){Xt(r);return}let i=o[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,d=a.innerHeight||r.documentElement?.clientHeight||0,c=12,u=8,y=Math.max(0,d-i.bottom-c-u),p=Math.max(0,i.top-c-u),g=y<220&&p>y,h=Math.max(120,Math.floor((g?p:y)||0));n.setAttribute("data-yyt-floating","true"),n.setAttribute("data-yyt-floating-placement",g?"top":"bottom"),n.classList.add("yyt-floating-open");let x=Math.ceil(i.width),_=Math.max(x,Math.floor(l-c*2)),w=n.style.width,B=n.style.minWidth,A=n.style.maxWidth,T=n.style.visibility;n.style.width="max-content",n.style.minWidth=`${x}px`,n.style.maxWidth=`${_}px`,n.style.visibility="hidden";let E=Math.ceil(n.scrollWidth||n.getBoundingClientRect().width||x),L=Math.max(x,Math.min(_,E)),O=Math.min(n.scrollHeight||h,h);n.style.width=w,n.style.minWidth=B,n.style.maxWidth=A,n.style.visibility=T;let k=Math.round(i.left);k+L>l-c&&(k=Math.max(c,Math.round(l-c-L))),k=Math.max(c,k);let v=Math.round(g?i.top-u-O:i.bottom+u);v=Math.max(c,Math.min(v,Math.round(d-c-O))),n.style.position="fixed",n.style.top=`${v}px`,n.style.left=`${k}px`,n.style.right="auto",n.style.width=`${L}px`,n.style.minWidth=`${x}px`,n.style.maxWidth=`${_}px`,n.style.maxHeight=`${Math.floor(h)}px`,n.style.visibility="",n.style.zIndex="10050"}function Xt(t=null){let e=te(),r=Qt(t);if(!e||!r?.activeRoot)return;let s=r.activeRoot,o=r.activeDropdown,n=r.placeholder,a=e(s),i=Gn(a);o&&($h(o),n?.parentNode?n.parentNode.insertBefore(o,n):s?.isConnected?s.appendChild(o):o.remove()),n?.parentNode?.removeChild(n),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,zh(r)}function Li(t=null){let e=Qt(t);!e?.activeRoot||!e?.activeDropdown||Di(e)}function qd(t){if(!te()||!t?.length)return;let r=t.first(),s=Gn(r),o=Hd(r);if(!s?.length||!o?.length||s.prop("disabled"))return;let n=Qt(r);if(n.activeRoot===r[0]){Di(n);return}Xt(r);let a=Oh(r);if(!a)return;let i=o[0],l=n.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),n.activeRoot=r[0],n.activeDropdown=i,n.placeholder=l,r.addClass("yyt-open"),s.attr("aria-expanded","true"),Bh(n),Di(n)}function Kh(t,e){let r=te();if(!r||!e?.length)return null;let s=e.closest("[data-yyt-custom-select]");if(s.length)return s.first();let o=Qt(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let n=r(o.activeRoot);return t.has(o.activeRoot).length?n:null}return null}function $i(t){let e=Qt(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||Xt(t)}function Yd(t){let e=Qt(t);if(t?.length&&e.activeRoot===t[0]){Xt(t);return}qd(t)}function Pi(t,e,r=null){let s=te();if(!s||!e?.length)return;let o=r||jd(t,e);if(!o?.length)return;let n=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],a=Ud(n,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),d=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let c=Hd(e);(c?.length?c.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,g)=>{let m=s(g),h=String(m.attr("data-value")||"")===i;m.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",d),d&&($i(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function Vd(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let s=String(e.value??""),o=String(e.label??e.text??e.name??s);return{value:s,label:o,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function Jd(t={}){let{selectedValue:e="",options:r=[],placeholder:s="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:n=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:d={},triggerAttributes:c={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:g=""}=t,m=Vd(r),h=Ud(m,e,s),x=o===!0||m.length===0,_=Hs({...l,class:Pr("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":s}),w=Hs({type:"button",...c,class:Pr("yyt-select-trigger",c.class),"data-yyt-select-trigger":c["data-yyt-select-trigger"]??"true","aria-haspopup":c["aria-haspopup"]??"listbox","aria-expanded":c["aria-expanded"]??"false",disabled:x?!0:c.disabled}),B=Hs({...u,class:Pr("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),A=n?(()=>{let T={...d,class:Pr(d.class),"data-yyt-select-native":d["data-yyt-select-native"]??"true",disabled:x?!0:d.disabled};return a==="select"?`<select ${Hs(T)}>${m.map(O=>`
            <option value="${le(O.value)}" ${O.value===String(h.value??"")?"selected":""} ${O.disabled?"disabled":""}>${le(O.label)}</option>
          `).join("")}</select>`:`<input ${Hs({type:i,value:h.value,...T})}>`})():"";return`
    <div ${_}>
      ${A}
      <button ${w}>
        <span class="${le(Pr("yyt-select-value"))}" data-value="${le(h.value)}">${le(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${B}>
        ${m.map(T=>{let E=T.value===String(h.value??"");return`
            <button ${Hs({type:"button",...y,class:Pr("yyt-select-option",p,y.class,E?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":T.value,role:y.role??"option","aria-selected":E?"true":"false",disabled:T.disabled?!0:y.disabled})}>
              <span class="${le(Pr("yyt-option-text",g))}">${le(T.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function ft(t,e="yytCustomSelect"){let r=te();if(!r||!ve(t))return;let s=Fd(t),o=Qt(s);o.activeRoot&&t.has(o.activeRoot).length&&Xt(s),t.off(`.${e}`),r(s).off(`click.${e}`),r(s).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((n,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function Bt(t,e={}){let r=te();if(!r||!ve(t))return;let{namespace:s="yytCustomSelect",selectors:o=[]}=e,n=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(n.length===0)return;ft(t,s);let a=n.join(", "),i=Fd(t);t.find(a).each((l,d)=>{let c=r(d),u=String(c.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,g=`${y}-dropdown`,m=Dh(c.attr("class")),h=c.attr("style"),x=c.find("option").map((B,A)=>{let T=r(A);return{value:String(T.attr("value")??T.val()??""),label:T.text(),disabled:T.is(":disabled")}}).get();c.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",x);let _=Jd({includeNative:!1,selectedValue:c.val(),options:x,disabled:c.is(":disabled"),placeholder:x[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Pr(m),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":g},dropdownAttributes:{id:g}});c.after(_);let w=Bd(t,c);Pi(t,w,c)}),t.on(`click.${s}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=d.closest("[data-yyt-custom-select]");Yd(c)}),t.on(`change.${s}`,a,l=>{let d=r(l.currentTarget),c=d.find("option").map((y,p)=>{let g=r(p);return{value:String(g.attr("value")??g.val()??""),label:g.text(),disabled:g.is(":disabled")}}).get();d.data("yytCustomSelectOptions",c);let u=Bd(t,d);Pi(t,u,d)}),r(i).off(`click.${s}`).on(`click.${s}`,l=>{if(Gd(l.target,i))return;let d=Lh(t);d?.length&&(Xt(i),d.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=Kh(t,d);if(!c?.length)return;let u=jd(t,c);if(!u?.length)return;let y=String(d.attr("data-value")||"");u.val(y).trigger("change"),Pi(t,c,u),$i(c)})}function Uh(t,e=us){if(!te()||!ve(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let s=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(s=o.val()||s),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:s,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Fh(t,e,r=us){if(!te()||!ve(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",o);let a=t.find(`#${r}-custom-api-fields`);o?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function zo(t){let{id:e,title:r,body:s,width:o="380px",wide:n=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${n?"yyt-dialog-wide":""} ${a}" style="${o!=="380px"?`width: ${o};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${r}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body ${i}" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${s}
        </div>
        <div class="yyt-dialog-footer ${l}">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function Ko(t,e,r={}){if(!te())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(l){l.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(n)});let a=o[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),n())};return a.addEventListener("keydown",i),n}function br(t,e,r={}){let{confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=r,i=te(),l=hr();if(!i||!l?.body)return Promise.resolve(!1);let d=`yyt-confirm-${++Xd}`;return new Promise(c=>{let u=!1,y=h=>{u||(u=!0,m.remove(),p?.focus(),c(h))},p=l.activeElement,g=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${le(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${le(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${le(o)}</button>
            <button class="yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}" id="${d}-confirm">${le(s)}</button>
          </div>
        </div>
      </div>`,m=i(g).appendTo(l.body);m.find(`#${d}-confirm`).on("click",()=>y(!0)),m.find(`#${d}-cancel, #${d}-close`).on("click",()=>y(!1)),m.on("click",function(h){h.target===this&&y(!1)}),m.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),y(!1)),h.key==="Enter"&&(h.stopPropagation(),y(!0))}),m.find(`#${d}-${n?"cancel":"confirm"}`).trigger("focus")})}function jh(t,e,r={}){let{defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=te(),d=hr();if(!l||!d?.body)return Promise.resolve(null);let c=`yyt-prompt-${++Xd}`;return new Promise(u=>{let y=!1,p=w=>{y||(y=!0,h.remove(),g?.focus(),u(w))},g=d.activeElement,m=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${le(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${le(e)}</div>`:""}
            <input class="yyt-input" id="${c}-input" type="text" value="${le(s)}" placeholder="${le(o)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${le(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${c}-confirm">${le(n)}</button>
          </div>
        </div>
      </div>`,h=l(m).appendTo(d.body),x=h.find(`#${c}-input`),_=()=>{let w=x.val().trim();p(w||null)};h.find(`#${c}-confirm`).on("click",_),h.find(`#${c}-cancel, #${c}-close`).on("click",()=>p(null)),h.on("click",function(w){w.target===this&&p(null)}),x.on("keydown",w=>{w.key==="Enter"&&(w.stopPropagation(),_())}),h.on("keydown",w=>{w.key==="Escape"&&(w.stopPropagation(),p(null))}),x.trigger("focus").trigger("select")})}function Wh(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let s=t.html(),o=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",o+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${le(r)}`);else{let n=t.find("i.fa-solid, i.fa-regular").first();n.length?(n.data("yytOriginalClass",n.attr("class")),n.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${s}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(s);else{let n=t.find("i.fa-spinner"),a=n.data("yytOriginalClass");a?n.attr("class",a).removeData("yytOriginalClass"):t.html(s)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function Uo(t,e){let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=document.createElement("a");o.href=s,o.download=e,o.click(),URL.revokeObjectURL(s)}function Fo(t){return new Promise((e,r)=>{let s=new FileReader;s.onload=o=>e(o.target.result),s.onerror=o=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),s.readAsText(t)})}var Mh,us,Ni,ds,zd,Kd,Xd,it=P(()=>{H();Mh=C.createScope("UIUtils"),us="youyou_toolkit",Ni=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};ds=null;zd=new WeakMap,Kd="yyt-select-portal-layer";Xd=0});var Qd={};ie(Qd,{StorageService:()=>ps,default:()=>Yh,getStorage:()=>Hh,loadSettings:()=>Gh,presetStorage:()=>Ie,saveSettings:()=>qh,storage:()=>$,toolStorage:()=>_e,windowStorage:()=>qn});function Hh(){let t=$;return t._getStorage(),t._storage}function Gh(){return $.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function qh(t){$.set("settings",t)}var Bi,ps,$,_e,Ie,qn,Yh,Fe=P(()=>{H();Bi=C.createScope("StorageService"),ps=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:s=>{let o=r.extensionSettings[this.namespaceKey][s];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(s,o)=>{r.extensionSettings[this.namespaceKey][s]=o,this._saveSettings(r)},removeItem:s=>{delete r.extensionSettings[this.namespaceKey][s],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{Bi.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(s){Bi.error("localStorage\u5199\u5165\u5931\u8D25:",s)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let s=`${this.namespaceKey}:${e}`;if(this._cache.has(s))return this._cache.get(s);let o=this._getStorage(),n=this._getFullKey(e),a=o.getItem(n);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(s,i),i}catch{return a}}set(e,r){let s=this._getStorage(),o=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,r);try{s.setItem(o,JSON.stringify(r))}catch(a){Bi.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),s=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),r.removeItem(s)}has(e){let r=this._getStorage(),s=this._getFullKey(e);return r.getItem(s)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let s=r.SillyTavern.getContext();s?.extensionSettings?.[this.namespaceKey]&&(s.extensionSettings[this.namespaceKey]={},this._saveSettings(s))}}else{let r=`${this.namespaceKey}_`,s=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(r)&&s.push(n)}s.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(s=>{r[s]=this.get(s)}),r}setMultiple(e){Object.entries(e).forEach(([r,s])=>{this.set(r,s)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let s=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(s)){let a=n.slice(s.length);try{r[a]=JSON.parse(localStorage.getItem(n))}catch{r[a]=localStorage.getItem(n)}}}}return r}},$=new ps("youyou_toolkit"),_e=new ps("youyou_toolkit:tools"),Ie=new ps("youyou_toolkit:presets"),qn=new ps("youyou_toolkit:windows");Yh=$});var su={};ie(su,{API_STATUS:()=>tb,fetchAvailableModels:()=>db,getApiConfig:()=>Gs,getEffectiveApiConfig:()=>jo,hasEffectiveApiPreset:()=>Wo,sendApiRequest:()=>Ho,sendWithPreset:()=>Ui,testApiConnection:()=>cb,updateApiConfig:()=>sb,validateApiConfig:()=>Yn});function Qh(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Ki(){return $.get(Zd,Qh())}function Zh(t){$.set(Zd,t)}function eu(){return $.get(Jh,[])}function eb(){return $.get(Xh,"")}function zi(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function tu(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let s=null;try{s=new URL(r)}catch{return r}let o=s.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),s.pathname=n.replace(/\/+/g,"/"),s.toString()}function rb(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Gs(){return Ki().apiConfig||{}}function sb(t){let e=Ki();e.apiConfig={...e.apiConfig,...t},Zh(e)}function Yn(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function jo(t=""){let e=Ki(),r=t||eb()||"";if(r){let o=eu().find(n=>n.name===r);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function Wo(t=""){return t?eu().some(r=>r?.name===t):!1}async function Ui(t,e,r={},s=null){let o=jo(t);return await Ho(e,{...r,apiConfig:o},s)}function ru(t,e={}){let r=e.apiConfig||Gs();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function Fi(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Ho(t,e={},r=null){let s=e.apiConfig||Gs(),o=s.useMainApi,n=Yn(s);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await ob(t,e,r):await nb(t,s,e,r)}async function ob(t,e,r){let s=typeof window.parent<"u"?window.parent:window;if(!s.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??Gs().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function nb(t,e,r,s){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await ab(t,e,r,s,o)}catch(n){let a=String(n?.message||n||"");if(n?.name==="AbortError"||s?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw n;Vh.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await ib(t,e,r,s,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await lb(t,e,r,s)}async function ab(t,e,r,s,o){if(s?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:rb(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof n=="string"?n.trim():Fi(n)}async function ib(t,e,r,s,o){let n=String(e.url||"").trim(),a={...ru(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:s})}catch(u){throw u?.name==="AbortError"?u:zi(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let d=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw zi(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${d||"Unknown error"}`,{allowDirectFallback:u})}let c=null;try{c=d?JSON.parse(d):{}}catch{let y=String(d||"").replace(/\s+/g," ").trim().slice(0,120);throw zi(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return Fi(c)}async function lb(t,e,r,s){let o=ru(t,{apiConfig:e,...r}),n=tu(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(n,{method:"POST",headers:a,body:JSON.stringify(o),signal:s}),l=await i.text().catch(()=>"");if(!i.ok){let c=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${c}`)}let d=null;try{d=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return Fi(d)}async function cb(t=null){let e=t||Gs(),r=Date.now();try{await Ho([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(s){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${s.message}`,latency:Date.now()-r}}}async function db(t=null){let e=t||Gs();return e.useMainApi?await ub():await pb(e)}async function ub(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function pb(t){if(!t.url||!t.apiKey)return[];try{let e=tu(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let s=await r.json();return s.data&&Array.isArray(s.data)?s.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var Vh,Zd,Jh,Xh,tb,Vn=P(()=>{Fe();H();Vh=C.createScope("ApiConnection"),Zd="settings",Jh="api_presets",Xh="current_preset";tb={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var iu={};ie(iu,{createPreset:()=>Qn,createPresetFromCurrentConfig:()=>wb,deletePreset:()=>Zn,duplicatePreset:()=>Hi,exportPresets:()=>qi,generateUniquePresetName:()=>Sb,getActiveConfig:()=>xb,getActivePresetName:()=>Gi,getAllPresets:()=>Nr,getPreset:()=>fs,getPresetNames:()=>mb,getStarredPresets:()=>bb,importPresets:()=>Yi,presetExists:()=>Go,renamePreset:()=>Wi,switchToPreset:()=>ea,togglePresetStar:()=>hb,updatePreset:()=>ji,validatePreset:()=>vb});function gb(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function au(){return $.get(fb,gb())}function bt(){return $.get(ou,[])}function ys(t){$.set(ou,t)}function Xn(){return $.get(nu,"")}function Jn(t){$.set(nu,t||"")}function Nr(){return bt()}function mb(){return bt().map(e=>e.name)}function fs(t){return!t||typeof t!="string"?null:bt().find(r=>r.name===t)||null}function Go(t){return!t||typeof t!="string"?!1:bt().some(r=>r.name===t)}function Qn(t){let{name:e,description:r,apiConfig:s}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(Go(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:r||"",apiConfig:{url:s?.url||"",apiKey:s?.apiKey||"",model:s?.model||"",useMainApi:s?.useMainApi??!0,stream:s?.stream??!1,max_tokens:s?.max_tokens||4096,temperature:s?.temperature??.7,top_p:s?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=bt();return a.push(n),ys(a),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function ji(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=bt(),s=r.findIndex(a=>a.name===t);if(s===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=r[s],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),r[s]=n,ys(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function Zn(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=bt(),r=e.findIndex(s=>s.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),ys(e),Xn()===t&&Jn(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Wi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!Go(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Go(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s=bt(),o=s.find(n=>n.name===t);return o&&(o.name=r,o.updatedAt=Date.now(),ys(s),Xn()===t&&Jn(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function Hi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),s=fs(t);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Go(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(s)),name:r,createdAt:Date.now(),updatedAt:Date.now()},n=bt();return n.push(o),ys(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:o}}function hb(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=bt(),r=e.find(s=>s.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),ys(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function bb(){return bt().filter(e=>e.starred===!0)}function ea(t){if(!t)return Jn(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=fs(t);return e?(Jn(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Gi(){return Xn()}function xb(){let t=Xn();if(t){let r=fs(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:au().apiConfig||{}}}function qi(t=null){if(t){let r=fs(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=bt();return JSON.stringify(e,null,2)}function Yi(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch(a){return yb.error("\u9884\u8BBE\u5BFC\u5165\u5931\u8D25: JSON\u89E3\u6790\u9519\u8BEF",{error:a}),{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let s=Array.isArray(r)?r:[r];if(s.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=bt(),n=0;for(let a of s){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),o[i]=a,n++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),o.push(a),n++)}return n>0&&ys(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function wb(t,e=""){let r=au();return Qn({name:t,description:e,apiConfig:r.apiConfig})}function vb(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Sb(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=bt(),r=new Set(e.map(o=>o.name));if(!r.has(t))return t;let s=1;for(;r.has(`${t} (${s})`);)s++;return`${t} (${s})`}var yb,fb,ou,nu,qo=P(()=>{Fe();H();yb=C.createScope("PresetManager"),fb="settings",ou="api_presets",nu="current_preset"});var qs,Yo,Ht,Vi=P(()=>{Qe();it();H();qs=C.createScope("UIManager"),Yo=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,W.emit(U.UI_INITIALIZED),qs.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(qs.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,s={}){let o=te();if(!o){qs.error("jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){qs.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=o(r):r&&r.jquery?i=r:r&&(i=o(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=o(r):r&&r.jquery?a=r:r&&(a=o(r)),!ve(a)){qs.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof n.renderTo=="function")n.renderTo(a,{...s,dependencies:this.dependencies});else{let i=n.render({...s,dependencies:this.dependencies});a.html(i),n.bindEvents(a,this.dependencies)}}catch(i){qs.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:n,props:s}),W.emit(U.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=te();if(!r||!e)return;let s;if(typeof e=="string"?s=r(e):e?.jquery?s=e:s=r(e),!s?.length)return;let o=[];this.activeInstances.forEach((n,a)=>{n?.container?.length&&n.container[0]===s[0]&&o.push(a)}),o.forEach(n=>this.destroyInstance(n))}switchTab(e){let r=this.currentTab;this.currentTab=e,W.emit(U.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,W.emit(U.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,s)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let s=e.createElement("style");s.id=r,s.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(s)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){W.on(U.PRESET_UPDATED,()=>{}),W.on(U.TOOL_UPDATED,()=>{})}},Ht=new Yo});function f(t,e={},...r){let s=document.createElement(t);if(e.className&&(s.className=e.className),e.text!==void 0&&e.text!==null&&(s.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(s.innerHTML=String(e.html)),e.attrs)for(let[o,n]of Object.entries(e.attrs))n==null||n===!1||s.setAttribute(o,n===!0?"":String(n));if(e.style&&Object.assign(s.style,e.style),e.dataset)for(let[o,n]of Object.entries(e.dataset))s.dataset[o]=String(n);for(let o of r)G(s,o);return s}function G(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)G(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function lu(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let s=t.get(e);s&&s.delete(r)},emit(e,...r){let s=t.get(e);if(s)for(let o of[...s])try{o(...r)}catch{}},clear(){t.clear()}}}function Ji(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let s=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let o of s){let n=Ji(o,e);if(n)return n}return null}function Le({id:t=null,kind:e="control",el:r=null,style:s=null,className:o=null,attrs:n=null}={}){if(r){if(s&&Object.assign(r.style,s),o){let i=String(o).trim().split(/\s+/).filter(Boolean);i.length&&r.classList.add(...i)}if(n)for(let[i,l]of Object.entries(n))l===!1||l==null||r.setAttribute(i,l===!0?"":String(l))}let a=lu();return{_id:t||null,_kind:e,_children:null,_emitter:a,on(i,l){return a.on(i,l)},off(i,l){a.off(i,l)},getControl(i){return Ji(this,i)},get(){},set(i){},destroy(){if(a.clear(),this._children){let i=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let l of i)try{l?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var gt=P(()=>{});function X(t={}){let{id:e=null,label:r="",icon:s=null,variant:o="default",size:n="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,d=["yyt-btn"];o==="primary"?d.push("yyt-btn-primary"):o==="danger"?d.push("yyt-btn-danger"):o==="ghost"&&d.push("yyt-btn-secondary"),n==="small"&&d.push("yyt-btn-small");let c=f("button",{className:d.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;s&&(u=f("span",{className:"yyt-btn-icon-glyph",text:s}),c.appendChild(u));let y=f("span",{text:r});c.appendChild(y);let p={...Le({id:e,kind:"button",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,setLabel(g){y.textContent=String(g||"")},setIcon(g){u&&(u.textContent=String(g||""))},setDisabled(g){g?c.setAttribute("disabled","disabled"):c.removeAttribute("disabled")},isDisabled(){return c.hasAttribute("disabled")},get(){return y.textContent},set(g){this.setLabel(g)}};return c.addEventListener("click",g=>{if(!c.hasAttribute("disabled")){if(typeof l=="function")try{l(g,p)}catch(m){console.error("[button] onClick \u5F02\u5E38",m)}p._emitter.emit("click",g)}}),p}var cu=P(()=>{gt()});function be(t={}){let{id:e=null,placeholder:r="",value:s="",type:o="text",disabled:n=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,d=f("input",{className:"yyt-input",attrs:{type:o,placeholder:r,disabled:n?"disabled":null,maxlength:a!=null?String(a):null}});d.value=s==null?"":String(s);let c={...Le({id:e,kind:"textInput",el:d,style:t.style,className:t.className,attrs:t.attrs}),el:d,get(){return d.value},set(u,{silent:y=!1}={}){d.value=u==null?"":String(u),y||c._emitter.emit("change",d.value)},setPlaceholder(u){d.placeholder=u==null?"":String(u)},setDisabled(u){d.disabled=!!u},focus(){d.focus()},select(){d.select()}};return d.addEventListener("input",()=>{if(typeof i=="function")try{i(d.value,c)}catch(u){console.error("[textInput] onInput \u5F02\u5E38",u)}c._emitter.emit("input",d.value)}),d.addEventListener("change",()=>{if(typeof l=="function")try{l(d.value,c)}catch(u){console.error("[textInput] onChange \u5F02\u5E38",u)}c._emitter.emit("change",d.value)}),d.addEventListener("blur",()=>c._emitter.emit("blur",d.value)),c}var du=P(()=>{gt()});function Me(t={}){let{id:e=null,options:r=[],value:s="",placeholder:o=null,disabled:n=!1,onChange:a=null}=t,i=f("select",{className:"yyt-select",attrs:{disabled:n?"disabled":null}});function l(c,u){if(i.innerHTML="",o!==null){let y=f("option",{text:o,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(y)}for(let y of c){let p=f("option",{text:y.label??String(y.value),attrs:{value:String(y.value),selected:String(y.value)===String(u)?"selected":null,disabled:y.disabled?"disabled":null}});i.appendChild(p)}}l(r,s);let d={...Le({id:e,kind:"select",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,get(){return i.value},set(c,{silent:u=!1}={}){i.value=c==null?"":String(c),u||d._emitter.emit("change",i.value)},setOptions(c,u){l(c||[],u??i.value)},setDisabled(c){i.disabled=!!c}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,d)}catch(c){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",c)}d._emitter.emit("change",i.value)}),d}var uu=P(()=>{gt()});function xt(t={}){let{id:e=null,label:r="",hint:s="",checked:o=!1,disabled:n=!1,onChange:a=null}=t,i=f("label",{className:"yyt-toggle-label"});r&&i.appendChild(f("span",{text:r})),s&&i.appendChild(f("span",{className:"yyt-toggle-hint",text:s}));let l=f("input",{attrs:{type:"checkbox",disabled:n?"disabled":null}});l.checked=!!o;let d=f("span",{className:"yyt-toggle-slider"}),c=f("label",{className:"yyt-toggle"});c.appendChild(l),c.appendChild(d);let u=f("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(c),i.addEventListener("click",p=>{p.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let y={...Le({id:e,kind:"toggle",el:u,style:t.style,className:t.className,attrs:t.attrs}),el:u,get(){return!!l.checked},set(p,{silent:g=!1}={}){l.checked=!!p,g||y._emitter.emit("change",!!p)},setDisabled(p){l.disabled=!!p}};return l.addEventListener("change",()=>{let p=!!l.checked;if(typeof a=="function")try{a(p,y)}catch(g){console.error("[toggle] onChange \u5F02\u5E38",g)}y._emitter.emit("change",p)}),y}var pu=P(()=>{gt()});var yu=P(()=>{gt()});var fu=P(()=>{gt()});function Ct(t={}){let{id:e=null,label:r="",hint:s="",control:o=null,inline:n=!1}=t,a=f("div",{className:"yyt-form-group",style:n?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(f("label",{text:r,style:n?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=f("div",{style:n?{flex:"1",minWidth:"0"}:null});o&&G(i,o),a.appendChild(i),s&&a.appendChild(f("div",{className:"yyt-form-hint",text:s}));let l=o?[o]:[];return{...Le({id:e,kind:"formRow",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:l,get(){return o?.get?.()},set(d,c){o?.set?.(d,c)},setControl(d){i.innerHTML="",l.length=0,d&&(G(i,d),l.push(d))}}}var gu=P(()=>{gt()});function Xi(t={}){let{id:e=null,icon:r=null,name:s="",desc:o="",active:n=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,d=["yyt-list-row"];n&&d.push("yyt-list-row-active"),a&&d.push("yyt-list-row-disabled");let c=f("div",{className:d.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&c.appendChild(f("div",{className:"yyt-list-row-icon",text:r}));let u=f("div",{className:"yyt-list-row-main"}),y=f("div",{className:"yyt-list-row-name",text:s});u.appendChild(y);let p=null;o&&(p=f("div",{className:"yyt-list-row-desc",text:o}),u.appendChild(p)),c.appendChild(u);let g=null;if(i&&i.length){g=f("div",{className:"yyt-list-row-actions"});for(let h of i)G(g,h);c.appendChild(g)}typeof l=="function"&&(c.style.cursor="pointer",c.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,m),m._emitter.emit("click",h))}));let m={...Le({id:e,kind:"listRow",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,_children:i||[],setName(h){y.textContent=h==null?"":String(h)},setDesc(h){if(p)p.textContent=h==null?"":String(h);else{if(!h)return;p=f("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(p)}},setActive(h){h?c.classList.add("yyt-list-row-active"):c.classList.remove("yyt-list-row-active")},setDisabled(h){h?(c.classList.add("yyt-list-row-disabled"),c.style.opacity="0.5",c.style.pointerEvents="none"):(c.classList.remove("yyt-list-row-disabled"),c.style.opacity="",c.style.pointerEvents="")}};return m}var mu=P(()=>{gt()});function Gt(t={}){let{id:e=null,heading:r="",icon:s=null,actions:o=[],content:n=[]}=t,a=f("div",{className:"yyt-flow-section"}),i=null,l=null,d=null;if(r||s||o&&o.length){if(i=f("div",{className:"yyt-flow-heading"}),s&&(l=f("span",{className:"yyt-flow-heading-icon",text:s}),i.appendChild(l)),r&&i.appendChild(f("span",{text:r})),o&&o.length){d=f("div",{className:"yyt-flow-heading-action"});for(let p of o)G(d,p);i.appendChild(d)}a.appendChild(i)}let c=f("div",{className:"yyt-flow-content"}),u=[];for(let p of n||[])p&&(G(c,p),u.push(p));for(let p of o||[])p&&typeof p=="object"&&p.el&&u.push(p);return a.appendChild(c),{...Le({id:e,kind:"flowSection",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:u,appendContent(p){p&&(G(c,p),p&&typeof p=="object"&&p.el&&u.push(p))},clearContent(){c.innerHTML="";let p=u.filter(g=>(o||[]).includes(g));u.length=0;for(let g of p)u.push(g)},setHeading(p){if(!i)return;let g=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");g&&(g.textContent=p==null?"":String(p))},setIcon(p){l&&(l.textContent=p==null?"":String(p))}}}var hu=P(()=>{gt()});function ta(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function Qi({title:t,width:e,wide:r}){let s=`yyt-ctrl-dialog-${++_b}`,o=f("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":s}}),n={};e&&e!=="380px"&&(n.width=e),n.maxHeight="calc(100vh - 32px)";let a=f("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:n}),i=f("div",{className:"yyt-dialog-header"});i.appendChild(f("span",{className:"yyt-dialog-title",text:t||""}));let l=f("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let d=f("div",{className:"yyt-dialog-body"});a.appendChild(d);let c=f("div",{className:"yyt-dialog-footer"});return a.appendChild(c),o.appendChild(a),{overlay:o,body:d,footer:c,closeBtn:l,id:s}}function Zi(t){let e=ta();return e?.body?(e.body.appendChild(t),!0):!1}function el(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function Eb(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:d,footer:c,closeBtn:u}=Qi({title:e,width:a,wide:!1}),y=(ta()||document).activeElement,p=f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});d.appendChild(p);let g=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:o}),m=f("button",{className:`yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:s});c.appendChild(g),c.appendChild(m);let h=!1,x=_=>{if(!h){h=!0,el(l);try{y?.focus()}catch{}i(_)}};if(m.addEventListener("click",()=>x(!0)),g.addEventListener("click",()=>x(!1)),u.addEventListener("click",()=>x(!1)),l.addEventListener("click",_=>{_.target===l&&x(!1)}),l.addEventListener("keydown",_=>{_.key==="Escape"?(_.stopPropagation(),x(!1)):_.key==="Enter"&&(_.stopPropagation(),x(!0))}),!Zi(l)){i(!1);return}(n?g:m).focus()})}function Ab(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(d=>{let{overlay:c,body:u,footer:y,closeBtn:p}=Qi({title:e,width:l,wide:!1}),g=(ta()||document).activeElement;r&&u.appendChild(f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let m=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:o}});m.value=String(s||""),u.appendChild(m);let h=f("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(h);let x=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),_=f("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:n});y.appendChild(x),y.appendChild(_);let w=!1,B=T=>{if(!w){w=!0,el(c);try{g?.focus()}catch{}d(T)}},A=()=>{let T=m.value.trim();if(typeof i=="function"){let E=i(T);if(E){h.textContent=E,m.focus();return}}B(T||null)};if(_.addEventListener("click",A),x.addEventListener("click",()=>B(null)),p.addEventListener("click",()=>B(null)),c.addEventListener("click",T=>{T.target===c&&B(null)}),m.addEventListener("keydown",T=>{T.key==="Enter"&&(T.stopPropagation(),A())}),c.addEventListener("keydown",T=>{T.key==="Escape"&&(T.stopPropagation(),B(null))}),!Zi(c)){d(null);return}m.focus(),m.select()})}function Cb(t={}){let{title:e="",body:r=null,buttons:s=[],width:o="480px",wide:n=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:d,closeBtn:c}=Qi({title:e,width:o,wide:n}),u=(ta()||document).activeElement;r&&G(l,r);let y=!1,p,g=new Promise(h=>{p=h}),m=h=>{if(!y){y=!0,el(i);try{u?.focus()}catch{}p(h)}};for(let h of s){let x=h.variant==="primary"?"yyt-btn-primary":h.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",_=f("button",{className:`yyt-btn ${x}`,attrs:{type:"button"},text:h.label||""});_.addEventListener("click",()=>{try{h.onClick?.(m,l)}catch(w){Tb.error("button onClick error",w),m(null)}}),d.appendChild(_)}if(c.addEventListener("click",()=>m(null)),i.addEventListener("click",h=>{h.target===i&&m(null)}),i.addEventListener("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),m(null))}),!Zi(i))p(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:m})}catch{}return{el:i,body:l,close:m,result:g}}var Tb,_b,Pe,ra=P(()=>{gt();H();Tb=C.createScope("Dialog"),_b=0;Pe={confirm:Eb,prompt:Ab,custom:Cb}});function tl(t={}){let{id:e=null,items:r=[],align:s="start",gap:o="8px",wrap:n=!0}=t,i=f("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[s]||"flex-start",gap:o,flexWrap:n?"wrap":"nowrap"}}),l=[];for(let d of r)d&&(G(i,d),l.push(d));return{...Le({id:e,kind:"toolbar",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,_children:l,addItem(d){d&&(G(i,d),l.push(d))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let d of l)try{d?.destroy?.()}catch{}l.length=0}}}var bu=P(()=>{gt()});function rl(t={}){let{id:e=null,name:r="",desc:s="",active:o=!1,disabled:n=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:d=[],onClick:c=null}=t,u=a||i,y=["yyt-list-row","yyt-preset-list-item"];o&&y.push("yyt-list-row-active"),n&&y.push("yyt-list-row-disabled"),u&&y.push("yyt-preset-list-item-readonly");let p=f("div",{className:y.join(" "),style:n?{opacity:"0.5",pointerEvents:"none"}:null}),g=f("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:o?"var(--yyt-accent, #7bb7ff)":"transparent",border:o?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});p.appendChild(g);let m=f("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),h=f("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),x=f("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});h.appendChild(x),a&&h.appendChild(f("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),m.appendChild(h);let _=null;s&&(_=f("div",{className:"yyt-list-row-desc",text:s}),m.appendChild(_)),p.appendChild(m);let w=null;if(Array.isArray(l)&&l.length){w=f("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let E of l)E&&w.appendChild(f("span",{className:"yyt-preset-meta-chip",text:String(E),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));p.appendChild(w)}let B=null,A=u?d.filter(E=>E?._kind!=="button"||!E._destructive):d;if(A&&A.length){B=f("div",{className:"yyt-list-row-actions"});for(let E of A)G(B,E);p.appendChild(B)}typeof c=="function"&&(p.style.cursor="pointer",p.addEventListener("click",E=>{E.target.closest(".yyt-list-row-actions")||(c(E,T),T._emitter.emit("click",E))}));let T={...Le({id:e,kind:"presetListItem",el:p,style:t.style,className:t.className,attrs:t.attrs}),el:p,_children:d||[],setActive(E){E?p.classList.add("yyt-list-row-active"):p.classList.remove("yyt-list-row-active"),g.style.background=E?"var(--yyt-accent, #7bb7ff)":"transparent",g.style.border=E?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(E){x.textContent=E==null?"":String(E)},setDesc(E){if(_)_.textContent=E==null?"":String(E);else{if(!E)return;_=f("div",{className:"yyt-list-row-desc",text:E}),m.appendChild(_)}},setDisabled(E){E?(p.classList.add("yyt-list-row-disabled"),p.style.opacity="0.5",p.style.pointerEvents="none"):(p.classList.remove("yyt-list-row-disabled"),p.style.opacity="",p.style.pointerEvents="")}};return T}var xu=P(()=>{gt()});function sl(t={}){let{id:e=null,values:r=[],placeholder:s="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:o=null,allowDuplicates:n=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:d=null,onRemove:c=null}=t,u=o&&o.length?`yyt-chip-dl-${++kb}`:null,y=f("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),p=[],g={type:"text",placeholder:s,autocomplete:"off"};u&&(g.list=u);let m=f("input",{className:"yyt-chip-input",attrs:g,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),h=null;if(u){h=f("datalist",{attrs:{id:u}});for(let k of o)h.appendChild(f("option",{attrs:{value:String(k)}}));y.appendChild(h)}function x(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function _(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function w(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function B(k){let v=f("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:x(),border:`1px solid ${_()}`,color:w(),fontSize:"11px",fontWeight:"500"}});v.appendChild(f("span",{text:k,style:{lineHeight:"1"}}));let z=f("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return z.addEventListener("click",j=>{j.stopPropagation(),E(k)}),z.addEventListener("mouseenter",()=>{z.style.opacity="1"}),z.addEventListener("mouseleave",()=>{z.style.opacity="0.7"}),v.appendChild(z),v}function A(){let k=[];for(let v of y.children)v===m||v===h||k.push(v);for(let v of k)y.removeChild(v);for(let v of p)y.insertBefore(B(v),m)}function T(k){let v=String(k||"").trim();if(!v||!n&&p.includes(v)||a>0&&p.length>=a)return!1;p.push(v),A();try{d?.(v,p.slice())}catch(z){console.error("[chipGroup] onAdd \u5F02\u5E38",z)}try{l?.(p.slice())}catch(z){console.error("[chipGroup] onChange \u5F02\u5E38",z)}return O._emitter.emit("change",p.slice()),!0}function E(k){let v=p.indexOf(k);if(v<0)return!1;p.splice(v,1),A();try{c?.(k,p.slice())}catch(z){console.error("[chipGroup] onRemove \u5F02\u5E38",z)}try{l?.(p.slice())}catch(z){console.error("[chipGroup] onChange \u5F02\u5E38",z)}return O._emitter.emit("change",p.slice()),!0}function L(){if(p.length!==0){p=[],A();try{l?.([])}catch(k){console.error("[chipGroup] onChange \u5F02\u5E38",k)}O._emitter.emit("change",[])}}for(let k of r){let v=String(k||"").trim();v&&(!n&&p.includes(v)||p.push(v))}y.appendChild(m),A(),m.addEventListener("keydown",k=>{if(k.key==="Enter"||k.key===","){k.preventDefault();let v=m.value.trim();v&&T(v)&&(m.value="")}else k.key==="Backspace"&&!m.value&&p.length&&E(p[p.length-1])}),m.addEventListener("blur",()=>{let k=m.value.trim();k&&T(k)&&(m.value="")}),y.addEventListener("click",k=>{k.target===y&&m.focus()});let O={...Le({id:e,kind:"chipGroup",el:y,style:t.style,className:t.className,attrs:t.attrs}),el:y,get(){return p.slice()},set(k){p=[];for(let v of Array.isArray(k)?k:[]){let z=String(v||"").trim();z&&(!n&&p.includes(z)||p.push(z))}A();try{l?.(p.slice())}catch(v){console.error("[chipGroup] onChange \u5F02\u5E38",v)}O._emitter.emit("change",p.slice())},addChip:T,removeChip:E,clear:L,setSuggestions(k){if(h){for(;h.firstChild;)h.removeChild(h.firstChild);for(let v of k||[])h.appendChild(f("option",{attrs:{value:String(v)}}))}}};return O}var kb,wu=P(()=>{gt();kb=0});var Zt=P(()=>{cu();du();uu();pu();yu();fu();gu();mu();hu();ra();bu();xu();wu();gt()});function vu(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Ib(t){return typeof t=="string"&&t.startsWith("builtin_")}function Dr(t={}){let{id:e,kind:r="generic",panelTitle:s="\u9884\u8BBE\u7BA1\u7406",panelHint:o="",store:n,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:d=!1,onSwitchTo:c=null}=t;if(!n||typeof n.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let y=vu(u);if(!y)return;if(y._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}let p=()=>this.renderTo(u),g=n.listPresets(),m=typeof n.getCurrentPresetId=="function"?n.getCurrentPresetId():"",h=f("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(s||o){let k=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});s&&k.appendChild(f("div",{text:s,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),o&&k.appendChild(f("div",{text:o,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),h.appendChild(k)}let x=[],_=f("div",{style:{display:"flex",flexDirection:"column"}});if(g.length===0)_.appendChild(f("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let k of g){let v=k.id===m,z=Ib(k.id),j=typeof l=="function"?l(k)||[]:[],q=[];d&&typeof c=="function"&&q.push(X({label:v?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:v?"ghost":"primary",disabled:v,onClick:se=>{se.stopPropagation();try{c(k.id)}catch(oe){gs.warn("onSwitchTo \u5F02\u5E38",{err:oe})}p()}})),q.push(X({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async se=>{se.stopPropagation();try{let oe=n.duplicatePreset(k.id);oe?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(oe.id),p()}catch(oe){gs.warn("duplicate \u5F02\u5E38",{err:oe})}}})),z||(q.push(X({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async se=>{se.stopPropagation();let oe=await Pe.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:k.name,placeholder:"\u9884\u8BBE\u540D",validate:Te=>Te?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});oe&&oe!==k.name&&(n.renamePreset(k.id,oe),p())}})),q.push(X({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async se=>{se.stopPropagation(),await Pe.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${k.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(n.deletePreset(k.id),p())}})));let ye=rl({id:k.id,name:k.name,desc:k.description,active:v,builtin:z,metaChips:j,actions:q,onClick:()=>{typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(k.id),p()}});_.appendChild(ye.el)}let w=X({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let k=await Pe.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:v=>v?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(k)try{let v=n.createPreset({name:k});v?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(v.id),p()}catch(v){gs.warn("createPreset \u5931\u8D25",{err:v}),await Pe.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(v?.message||v),confirmText:"\u786E\u5B9A"})}}}),B=Gt({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[w.el],content:[_]});x.push(B),h.appendChild(B.el);let A=m?g.find(k=>k.id===m):null;if(A){let k=null;try{k=a(A,{readonly:!1,onChange:z=>{if(!(!z||typeof z!="object"))try{n.updatePreset(A.id,z)}catch(j){gs.warn("updatePreset \u5931\u8D25",{err:j})}},refresh:p})}catch(z){gs.error("renderEditor \u5F02\u5E38",{err:z}),k=f("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${z?.message||z}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let v=Gt({heading:`\u7F16\u8F91\u300C${A.name}\u300D`,icon:"\u270E",content:[k].filter(Boolean)});if(x.push(v),h.appendChild(v.el),typeof i=="function"){let z=null;try{z=i(A,{refresh:p})}catch(j){gs.warn("renderExtras \u5F02\u5E38",{err:j})}if(z){let j=Gt({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[z]});x.push(j),h.appendChild(j.el)}}}else g.length>0&&h.appendChild(f("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let T=X({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await Rb(n,p)}}),E=X({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{Mb(n,r)}}),L=X({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await Pe.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof n.resetAll=="function"&&(n.resetAll(),p())}}),O=tl({items:[T,E,L],align:"end",gap:"8px"});h.appendChild(O.el),y.innerHTML="",y.appendChild(h),y._yytPresetPanelCleanup=()=>{for(let k of x)try{k.destroy()}catch{}delete y._yytPresetPanelCleanup}},destroy(u){let y=vu(u);if(y?._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function Rb(t,e){if(typeof t.importPresets!="function"){await Pe.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),s=Pe.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let n=f("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),n.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=r.value.trim();if(!a){n(null);return}let i;try{i=JSON.parse(a)}catch(l){await Pe.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);n(l)}catch(l){await Pe.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let o=await s.result;o&&(o.added>0||o.imported>0)&&e()}function Mb(t,e){if(typeof t.exportAll!="function"){Pe.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),s=JSON.stringify(r,null,2),o=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});o.value=s,o.readOnly=!0,Pe.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:o,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:n=>n(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(s)}catch{o.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let n=new Blob([s],{type:"application/json"}),a=URL.createObjectURL(n),i=f("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(n){gs.warn("\u4E0B\u8F7D\u5931\u8D25",{err:n})}}}]})}var gs,Vo=P(()=>{Zt();H();gs=C.createScope("PresetManagerBase")});var Tu={};ie(Tu,{ApiPresetPanel:()=>Su,default:()=>Lb});function Nb(t,{onChange:e,readonly:r}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),o=t.apiConfig||{};G(s,Ct({label:"\u63CF\u8FF0",control:be({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),G(s,xt({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:o.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...o,useMainApi:i}})})),G(s,xt({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:o.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...o,stream:i}})})),G(s,Ct({label:"API URL",control:be({value:o.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...o,url:i}})})})),G(s,Ct({label:"API Key",control:(()=>{let i=be({value:o.apiKey||"",placeholder:"sk-...",disabled:r,onChange:l=>e({apiConfig:{...o,apiKey:l}})});try{i.el.setAttribute("type","password")}catch{}return i})()})),G(s,Ct({label:"\u6A21\u578B",control:be({value:o.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...o,model:i}})})}));let n=f("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,d,c="1"){let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(f("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let y=f("input",{className:"yyt-input",attrs:{type:"number",step:c,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return y.value=String(o[l]??d),y.addEventListener("change",()=>{let p=Number(y.value);Number.isFinite(p)&&e({apiConfig:{...o,[l]:p}})}),u.appendChild(y),u}return n.appendChild(a("max_tokens","max_tokens",4096,"1")),n.appendChild(a("temperature","temperature",.7,"0.05")),n.appendChild(a("top_p","top_p",.9,"0.05")),G(s,n),s}function Db(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var Lr,Pb,Su,Lb,_u=P(()=>{Zt();qo();H();Vo();Lr=C.createScope("ApiPresetPanel"),Pb={listPresets(){return Nr().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=fs(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return Gi()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!ea(t)}catch(e){return Lr.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return Lr.warn("createPreset: name \u7F3A\u5931"),null;let r=Qn({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Lr.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=ji(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Lr.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=Zn(t);return!!(e?.success??e===!0)}catch(e){return Lr.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",s=`${t}${r}`;try{let o=Hi(t,s);return o?.success?{id:o.preset.name,...o.preset,description:o.preset.description||""}:null}catch(o){return Lr.warn("duplicatePreset \u5931\u8D25",{err:o}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=Wi(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return Lr.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=qi();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:Yi(r,{overwrite:!1})?.imported||0}},resetAll(){let t=Nr();for(let e of t)try{Zn(e.name)}catch{}}};Su=Dr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:Pb,renderEditor:Nb,renderListItemMeta:Db,hasSwitchToButton:!0,onSwitchTo:t=>{try{ea(t)}catch(e){Lr.warn("switchToPreset",{err:e})}}}),Lb=Su});function nl(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function $r(){let t=Ie.get(ol);return!t||typeof t!="object"?{}:t}function oa(t){Ie.set(ol,t)}function hs(t){return typeof t=="string"&&t.startsWith(Ob)}function Eu(t){return hs(t)&&sa.find(e=>e.id===t)||null}function al(t){if(!Array.isArray(t)){sa=[];return}sa=t.map(e=>Or({...e,id:String(e?.id||"")})).filter(e=>hs(e.id))}function Or(t={}){let e=String(t.id||nl()),r=Array.isArray(t.bookList)?t.bookList.map(s=>({bookName:String(s?.bookName||""),enabled:s?.enabled!==!1,entryOverrides:s?.entryOverrides&&typeof s.entryOverrides=="object"?s.entryOverrides:{}})).filter(s=>s.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===er.CUSTOM?er.CUSTOM:er.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function $b(){let t=$r(),e=new Set,r=[];for(let o of sa){let n=t[o.id];n?(r.push(Or(n)),e.add(o.id)):r.push(o)}let s=Object.values(t).map(Or).filter(o=>!e.has(o.id)).sort((o,n)=>n.updatedAt-o.updatedAt);return r.push(...s),r}function Xo(t){if(!t)return null;let e=$r();return e[t]?Or(e[t]):hs(t)?Eu(t):null}function il(){let t=Ie.get(Jo);return typeof t=="string"&&t?t:""}function Bb(){let t=il();return t?Xo(t):null}function zb(t){if(t&&hs(t))return Ie.set(Jo,t),W.emit(U.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=$r();return t&&!e[t]?(ms.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Ie.set(Jo,t||""),W.emit(U.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function na(t={}){let e=Or({...t,id:nl(),createdAt:Date.now(),updatedAt:Date.now()}),r=$r();return r[e.id]=e,oa(r),W.emit(U.PRESET_CREATED,{kind:"worldbook",id:e.id}),ms.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Au(t,e={},{silent:r=!1}={}){if(!t)return null;let s=$r(),o=s[t];if(!o&&hs(t)&&(o=Eu(t)),!o)return ms.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let n=Or({...o,...e,id:t,createdAt:o.createdAt,updatedAt:Date.now()});return s[t]=n,oa(s),r||W.emit(U.PRESET_UPDATED,{kind:"worldbook",id:t}),n}function Kb(t){if(!t)return!1;if(hs(t))return ms.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=$r();return e[t]?(delete e[t],oa(e),il()===t&&Ie.set(Jo,""),W.emit(U.PRESET_DELETED,{kind:"worldbook",id:t}),ms.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Ub(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Xo(t);return r?na({...r,id:void 0,name:`${r.name}${e}`}):null}function Fb(t,e){return hs(t)?(ms.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Au(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function jb(){return{version:1,exportedAt:Date.now(),presets:Object.values($r()).map(Or)}}function Wb(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=$r(),s=0,o=0;for(let n of e){let a=Or({...n,id:nl(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,s+=1}return oa(r),s>0&&W.emit(U.PRESET_IMPORTED,{kind:"worldbook",count:s}),{added:s,skipped:o}}function Hb(){Ie.set(ol,{}),Ie.set(Jo,""),ms.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var ms,ol,Jo,er,Ob,sa,lt,Ys=P(()=>{Fe();Qe();H();ms=C.createScope("WorldbookPresetStore"),ol="worldbook_presets",Jo="worldbook_current_preset",er=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});Ob="builtin_worldbook_",sa=[];lt={listPresets:$b,getPreset:Xo,getCurrentPresetId:il,getCurrentPreset:Bb,setCurrentPresetId:zb,createPreset:na,updatePreset:Au,deletePreset:Kb,duplicatePreset:Ub,renamePreset:Fb,exportAll:jb,importPresets:Wb,resetAll:Hb,BINDING_MODES:er}});function Br(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function aa(){return Br()?.SillyTavern||null}function Ee(t){return t==null?"":String(t).trim()}function qb(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function Yb(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function ku(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let s=0;s<e.length;s+=1)r=(r<<5)-r+e.charCodeAt(s),r|=0;return`fp_${Math.abs(r).toString(36)}`}function Iu(t={}){let e=Ee(t.chatId)||"chat_default",r=Ee(t.messageId)||"latest";return`${e}::${r}`}function Ru(t={}){let e=Iu(t),r=Ee(t.effectiveSwipeId)||"swipe:current",s=Ee(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${s}`}function Vb(t={}){let e=Ru(t),r=Ee(t.eventType)||"MANUAL",s=Ee(t.traceId)||Mu("manual");return`${e}::${r}::${s}`}function Mu(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Pu(){let t=aa();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Nu(t=[]){let e=[],r=null,s=null;return t.forEach((o,n)=>{let a=Yb(o),i=qb(o);if(!i)return;let l=Ee(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??n),d=Ee(o?.swipe_id??o?.swipeId??o?.swipe??""),c={role:a,content:i,sourceId:l,swipeId:d,raw:o,index:n};e.push(c),a==="user"&&(r=c),a==="assistant"&&(s=c)}),{messages:e,lastUserMessage:r,lastAiMessage:s}}function Jb(t,e,r){return Ee(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function ll(){let t=aa();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let s=r[e];return{id:e,name:s?.name||"",description:s?.description||"",personality:s?.personality||"",scenario:s?.scenario||"",firstMes:s?.first_mes||"",mesExample:s?.mes_example||""}}}catch(e){Gb.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function Xb(t="",e=null){let r=String(t||""),s=e?.YouYouToolkit_toolOutputs;return s&&typeof s=="object"&&Object.values(s).forEach(o=>{let n=String(o?.blockText||o?.content||"").trim();n&&r.includes(n)&&(r=r.replace(n,"").trimEnd())}),r.trim()}function Qb(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],s=Ee(e.messageId),o=Ee(e.swipeId);if(!s)return t?.lastAiMessage||null;let n=r.filter(i=>i.role==="assistant"),a=n.find(i=>i.sourceId!==s?!1:o?Ee(i.swipeId)===o:!0);return a||n.find(i=>i.sourceId===s)||null}function Du({api:t,stContext:e,character:r,conversation:s,targetAssistantMessage:o,runSource:n="MANUAL"}={}){let a=s?.messages||[],i=s?.lastUserMessage||null,l=Ee(o?.sourceId)||"",d=Ee(o?.swipeId)||"swipe:current",c=o?.content||"",u=Xb(c,o?.raw||null),y=ku(c),p=ku(u),g=Jb(t,e,r),m=Mu(String(n||"manual").toLowerCase()),h=Iu({chatId:g,messageId:l}),x=Ru({chatId:g,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:n,traceId:m,chatId:g,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:x,slotTransactionId:Vb({chatId:g,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:p,eventType:n,traceId:m}),executionKey:x,lastAiMessage:c,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:d,confirmedAssistantSwipeId:d,effectiveSwipeId:d,sourceMessageId:l,sourceSwipeId:d,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:c,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function bs({runSource:t="MANUAL"}={}){let e=aa(),r=e?.getContext?.()||null,s=await ll(),o=Pu(),n=Nu(o),a=n?.lastAiMessage||null;return Du({api:e,stContext:r,character:s,conversation:n,targetAssistantMessage:a,runSource:t})}async function xs({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let s=aa(),o=s?.getContext?.()||null,n=await ll(),a=Pu(),i=Nu(a),l=Qb(i,{messageId:t,swipeId:e});return Du({api:s,stContext:o,character:n,conversation:i,targetAssistantMessage:l,runSource:r})}var Gb,ws=P(()=>{H();Gb=C.createScope("ExecutionContext")});function Qo(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Br()?.TavernHelper||null}function Lu(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return Br()?.SillyTavern||null}function Vs(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function cl(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let s=t[r];Array.isArray(s)?e[r]=s.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):s&&typeof s=="object"?e[r]="[object]":e[r]=s}),e}return t}function ex(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(s=>String(s||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function Ou(){return Array.isArray(dl)?[...dl]:[]}async function ia(t){if(t||(t=Qo()),!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Vs([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return vs.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function tx(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=Vs(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){vs.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),s=Vs(Array.isArray(r)?r.map(o=>o?.name??o):[]);if(s.length>0)return s}catch(r){vs.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function ul(){let t=Qo(),e=Lu(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!Br()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!Br()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?cl(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?cl(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?cl(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let s=await ia(t),o=await tx(t,e),n=Vs([...s,...o]);return r.characterWorldbooks=[...s],r.allWorldbooks=[...o],r.combinedWorldbooks=[...n],Zb=r,dl=n,[...n]}async function la(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=Xo(e);if(!r)return vs.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let s=r.includeDisabled===!0,o=[];if(r.bindingMode==="character_card"){let l=Qo(),d=Lu(),c=await ia(l),u=new Map((r.bookList||[]).map(y=>[String(y.bookName||""),y]));for(let y of Vs(c)){let p=u.get(y);p&&p.enabled===!1||o.push(y)}}else o=(r.bookList||[]).filter(l=>l&&l.bookName&&l.enabled!==!1).map(l=>l.bookName);if(o=Vs(o),o.length===0)return"";let n=Qo();if(!n||typeof n.getLorebookEntries!="function")return vs.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=new Map((r.bookList||[]).map(l=>[l.bookName,l.entryOverrides||{}])),i=[];for(let l of o)try{let d=await n.getLorebookEntries(l),c=Array.isArray(d)?d:[],u=a.get(l)||{},p=c.filter(g=>s||g?.enabled!==!1&&!g?.disable).filter(g=>{let m=u[String(g?.uid??"")];return m&&typeof m.enabled=="boolean"?m.enabled:!0}).map(ex).filter(Boolean).join(`

`);p&&i.push(`[\u4E16\u754C\u4E66\uFF1A${l}]
${p}`)}catch(d){vs.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${l}`,d)}return i.join(`

---

`)}async function $u(t){if(!t)return[];let e=Qo();if(!e||typeof e.getLorebookEntries!="function")return[];try{let r=await e.getLorebookEntries(t);return Array.isArray(r)?r:[]}catch(r){return vs.warn(`getEntriesForBook \u5931\u8D25: ${t}`,r),[]}}var vs,dl,Zb,ca=P(()=>{ws();H();Ys();vs=C.createScope("ToolWorldbookService"),dl=[],Zb=null});function Bu(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function da(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function zr(){try{return da()?.SillyTavern||null}catch{return null}}function ua(t){try{return(t||zr())?.getContext?.()||null}catch{return null}}function pl(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",s=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!s?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function rx(){let t=da(),e=zr(),r=ua(e),o=[pl(e?.eventSource,"SillyTavern.eventSource"),pl(r?.eventSource,"SillyTavern.getContext().eventSource"),pl(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,n=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:o?.eventSource||null,eventTypes:n,source:o?.source||"unavailable",capabilities:o?.capabilities||null,hasBridge:!!o?.eventSource}}var kt,je,sx,zu,yl,wt,pa=P(()=>{H();kt=C.createScope("HostEvents"),je=Object.freeze({APP_READY:"APP_READY",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",MESSAGE_SWIPED:"MESSAGE_SWIPED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",CHARACTER_MESSAGE_RENDERED:"CHARACTER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",CHAT_DELETED:"CHAT_DELETED",CHARACTER_PAGE_LOADED:"CHARACTER_PAGE_LOADED",CHARACTER_EDITOR_OPENED:"CHARACTER_EDITOR_OPENED",CHARACTER_EDITED:"CHARACTER_EDITED",WORLDINFO_UPDATED:"WORLDINFO_UPDATED"});sx=1500,zu=20,yl=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,s={}){if(!e||typeof r!="function")return kt.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return kt.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let o={key:Bu(e),rawKey:e,handler:r,options:s,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(o),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(o),()=>{if(o._disposed)return;o._disposed=!0;let n=this._pending.indexOf(o);if(n>=0&&this._pending.splice(n,1),o.attached&&typeof o._hostUnsubscribe=="function")try{o._hostUnsubscribe()}catch(a){kt.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:o._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return kt.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let s=this._resolveHostEventName(e);if(!s)return!1;let{eventSource:o}=this._bridge;try{if(typeof o?.emit=="function")return await o.emit(s,...r),!0;if(typeof o?.dispatch=="function")return await o.dispatch(s,...r),!0}catch(n){kt.warn("emit \u629B\u9519",{eventKey:e,hostName:s,error:n})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let s=!1,o=a=>{s||(s=!0,r(a))},n=e>0?setTimeout(()=>o(!1),e):null;this._readyResolvers.push(a=>{n&&clearTimeout(n),o(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=rx();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return kt.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;kt.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let s of this._pending)!s.attached&&!s._disposed&&this._attachEntry(s);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let s of r)try{s(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=zu){kt.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${zu})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},sx)}}_resolveHostEventName(e){let r=Bu(e),s=this._bridge?.eventTypes||{};if(s[r])return s[r];let o=r.toLowerCase();if(s[o])return s[o];let n=String(e).trim();return n&&n===n.toLowerCase()?n:o}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){kt.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:s}=this._bridge,o=typeof s?.on=="function"?s.on.bind(s):typeof s?.addListener=="function"?s.addListener.bind(s):null,n=typeof s?.off=="function"?s.off.bind(s):typeof s?.removeListener=="function"?s.removeListener.bind(s):null;if(!o||!n){kt.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{o(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{n(r,e.handler)}catch(a){kt.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},kt.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){kt.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},wt=new yl});var Uu={};ie(Uu,{WorldbookPresetPanel:()=>Zo,default:()=>ux});function ox(t){return t===er.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function nx(t,e,r){let s=[...t.bookList],o=s.findIndex(n=>n.bookName===e);o>=0?s[o]={...s[o],enabled:r}:s.push({bookName:e,enabled:r,entryOverrides:{}}),lt.updatePreset(t.id,{bookList:s})}function ax(t,e){let r=t.bookList.filter(s=>s.bookName!==e);lt.updatePreset(t.id,{bookList:r})}async function ix(t,e){let r=Ou();if(!r.length)try{r=await ul()}catch{}let s=new Set(t.bookList.map(c=>c.bookName)),o=r.filter(c=>!s.has(c));if(!o.length){await Pe.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let n=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${o.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});n.appendChild(a);let i=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,d=[];for(let c of o){let u=f("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),y=f("input",{attrs:{type:"checkbox",value:c}});y.addEventListener("change",()=>{y.checked?l.add(c):l.delete(c)}),u.appendChild(y),u.appendChild(f("span",{text:c,style:{color:"var(--yyt-text)"}})),i.appendChild(u),d.push({el:u,search:c.toLowerCase()})}n.appendChild(i),a.addEventListener("input",()=>{let c=a.value.trim().toLowerCase();for(let u of d)u.el.style.display=!c||u.search.includes(c)?"":"none"}),Pe.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${o.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:n,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:c=>c(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let c of i.querySelectorAll("input[type=checkbox]")){let u=c.closest("label");(!u||u.style.display!=="none")&&(c.checked=!0,l.add(c.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:c=>{let u=Array.from(l);if(!u.length){c(null);return}let y=u.map(g=>({bookName:g,enabled:!0,entryOverrides:{}})),p=[...t.bookList,...y];lt.updatePreset(t.id,{bookList:p}),c(u.length)}}]}).result.then(c=>{c&&e&&e()})}function lx(t,{onChange:e,readonly:r,refresh:s}){let o=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});G(o,Ct({label:"\u63CF\u8FF0",control:be({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:c=>e({description:c})})})),G(o,Ct({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:Me({value:t.bindingMode,disabled:r,options:[{value:er.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:er.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:c=>{e({bindingMode:c}),s&&s()}})})),G(o,xt({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:c=>e({includeDisabled:c})}));let n=t.bindingMode===er.CHARACTER_CARD,a=f("div",{style:{display:"flex",flexDirection:"column"}}),i=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});i.appendChild(f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},f("div",{text:n?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:n?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u81EA\u52A8\u6CE8\u5165\uFF0C\u5217\u8868\u968F\u89D2\u8272\u5361\u53D8\u52A8\u81EA\u52A8\u66F4\u65B0":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let l=f("div",{style:{display:"flex",gap:"6px"}});!n&&!r&&l.appendChild(X({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>ix(t,s)}).el),n||l.appendChild(X({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await ul()}catch(c){fl.warn("\u5237\u65B0\u5931\u8D25",{e:c})}s&&s()}}).el),i.appendChild(l),G(a,i);let d=[];if(n){let c=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});c.appendChild(f("div",{text:"\u6B63\u5728\u83B7\u53D6\u89D2\u8272\u5361\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\u2026",style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"}})),ia().then(u=>{if(c.innerHTML="",!u.length)c.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'}));else for(let y of u)c.appendChild(f("div",{style:{padding:"8px 10px",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px",display:"flex",alignItems:"center",gap:"8px",opacity:"0.7"}},f("span",{text:"\u{1F4D6}",style:{fontSize:"11px"}}),f("span",{text:y,style:{flex:"1",color:"var(--yyt-text)"}}),f("span",{text:"\u968F\u89D2\u8272\u5361\u6CE8\u5165",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}})))}).catch(u=>{fl.warn("\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25",u),c.innerHTML="",c.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-danger, #f87171)",fontSize:"12px"},text:"\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25"}))}),d=[c]}else t.bookList.length?d=t.bookList.map(c=>{let u=Object.keys(c.entryOverrides||{}).filter(g=>{let m=c.entryOverrides[g];return m&&typeof m.enabled=="boolean"}).length,y=f("div",{style:{display:"flex",flexDirection:"column"}}),p=Xi({name:c.bookName,desc:c.enabled===!1?"\u5DF2\u7981\u7528":`\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165${u?` \xB7 ${u} \u6761 override`:""}`,actions:[X({label:"\u25B8 \u8BCD\u6761",size:"small",variant:"ghost",title:"\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override",onClick:()=>cx(y,t,c,r,s)}),xt({checked:c.enabled!==!1,disabled:r,onChange:g=>nx(t,c.bookName,g)}),...r?[]:[X({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{ax(t,c.bookName),s&&s()}})]]});return p?.el&&G(y,p.el),y}):d=[f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let c of d)c?.el?G(a,c.el):c instanceof Node&&G(a,c);return G(o,a),o}function cx(t,e,r,s,o){let n=t.querySelector(".yyt-wb-entry-panel");if(n){n.remove();let l=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');l&&(l.textContent="\u25B8 \u8BCD\u6761");return}let a=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');a&&(a.textContent="\u25BE \u8BCD\u6761");let i=f("div",{className:"yyt-wb-entry-panel",style:{marginLeft:"18px",marginTop:"4px",padding:"8px 10px",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-border, rgba(255,255,255,0.06))",fontSize:"12px",display:"flex",flexDirection:"column",gap:"4px"}});i.appendChild(f("div",{text:"\u52A0\u8F7D\u4E2D\u2026",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}})),t.appendChild(i),$u(r.bookName).then(l=>{if(!l.length){i.innerHTML="",i.appendChild(f("div",{text:"\u8BE5\u4E16\u754C\u4E66\u65E0\u8BCD\u6761",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}}));return}let d=r.entryOverrides||{};i.innerHTML="";let c=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${l.length} \u4E2A\u8BCD\u6761\u2026`,autocomplete:"off"},style:{padding:"5px 8px",fontSize:"11px",marginBottom:"4px",flexShrink:"0"}});i.appendChild(c);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",height:"260px",overflowY:"scroll",overscrollBehavior:"contain",WebkitOverflowScrolling:"touch"}});u.addEventListener("wheel",g=>{let m=g.deltaY;if(m===0)return;let h=u.scrollTop+u.clientHeight<u.scrollHeight-.5,x=u.scrollTop>.5;(m>0&&h||m<0&&x)&&(g.preventDefault(),g.stopPropagation(),u.scrollTop+=m)},{passive:!1});let y=e.includeDisabled===!0,p=[];for(let g of l){let m=String(g.uid??""),h=g.comment||g.key||g.name||"",x=String(Array.isArray(h)?h[0]:h).trim()||`\u6761\u76EE ${g.uid}`,_=g.enabled===!1||g.disable===!0,w=d[m],B=w&&typeof w.enabled=="boolean",A=_&&!B&&!y,T=f("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"5px 8px",borderRadius:"4px",background:B?"rgba(123,183,255,0.08)":"transparent",opacity:A?"0.4":"1"}}),E=v=>{T.style.background=v?"rgba(123,183,255,0.08)":"transparent",k.style.color=v?"var(--yyt-accent)":"var(--yyt-text)",v?L||(L=O(),T.appendChild(L)):(L&&(L.remove(),L=null),T.style.opacity=_?"0.4":"1")},L=null,O=()=>{let v=f("span",{text:"\u2715",style:{cursor:"pointer",color:"var(--yyt-text-muted)",fontSize:"10px",flexShrink:"0"},attrs:{title:"\u6E05\u9664 override"}});return v.addEventListener("click",z=>{if(z.stopPropagation(),s)return;let j=lt.getPreset(e.id);if(!j)return;let q=j.bookList.find(ye=>ye.bookName===r.bookName);q&&(q.entryOverrides=q.entryOverrides||{},delete q.entryOverrides[m],lt.updatePreset(e.id,{bookList:[...j.bookList]},{silent:!0}),L=null,E(!1))}),v};T.appendChild(xt({checked:B?w.enabled:!_,disabled:s||A,onChange:v=>{let z=lt.getPreset(e.id);if(!z)return;let j=z.bookList.find(se=>se.bookName===r.bookName);if(!j)return;j.entryOverrides=j.entryOverrides||{};let q=!_;v===q?delete j.entryOverrides[m]:j.entryOverrides[m]={enabled:v};let ye=v!==q;lt.updatePreset(e.id,{bookList:[...z.bookList]},{silent:!0}),E(ye),T.style.opacity=A?"0.4":"1"}}).el);let k=f("span",{style:{flex:"1",minWidth:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:B?"var(--yyt-accent)":"var(--yyt-text)",fontSize:"11px"},text:x+(A?" (\u6E90\u7981\u7528)":"")});T.appendChild(k),B&&(L=O(),T.appendChild(L)),u.appendChild(T),p.push({el:T,search:x.toLowerCase()})}i.appendChild(u),c.addEventListener("input",()=>{let g=c.value.trim().toLowerCase();for(let m of p)m.el.style.display=!g||m.search.includes(g)?"":"none"})}).catch(l=>{fl.warn("\u52A0\u8F7D\u8BCD\u6761\u5931\u8D25",l),i.innerHTML="",i.appendChild(f("div",{text:`\u52A0\u8F7D\u5931\u8D25\uFF1A${l?.message||l}`,style:{color:"var(--yyt-danger, #f87171)",padding:"4px 0"}}))})}function dx(t){let e=[`${ox(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var fl,Zo,gl,Ku,ux,Fu=P(()=>{Zt();Ys();ca();pa();ra();H();Vo();fl=C.createScope("WorldbookPresetPanel");Zo=Dr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:lt,renderEditor:lx,renderListItemMeta:dx}),gl=null,Ku=Zo.renderTo;Zo.renderTo=function(t){gl=t,Ku.call(this,t)};wt.subscribe(je.CHAT_CHANGED,()=>{if(!gl)return;let t=lt.getCurrentPreset();!t||t.bindingMode!==er.CHARACTER_CARD||Ku.call(Zo,gl)});ux=Zo});var Sl={};ie(Sl,{MESSAGE_MACROS:()=>up,addTagRule:()=>ep,createRuleTemplate:()=>Ju,default:()=>fx,deleteRulePreset:()=>ip,deleteRuleTemplate:()=>Qu,deleteTagRule:()=>rp,escapeRegex:()=>Ss,exportRulesConfig:()=>lp,extractComplexTag:()=>Wu,extractCurlyBraceTag:()=>wl,extractHtmlFormatTag:()=>Hu,extractSimpleTag:()=>xl,extractTagContent:()=>xr,generateTagSuggestions:()=>qu,getAllRulePresets:()=>np,getAllRuleTemplates:()=>Yu,getContentBlacklist:()=>Xs,getRuleTemplate:()=>Vu,getTagRules:()=>Js,importRulesConfig:()=>cp,isValidTagName:()=>bl,loadRulePreset:()=>ap,saveRulesAsPreset:()=>op,scanTextForTags:()=>Gu,setContentBlacklist:()=>sp,setTagRules:()=>Zu,shouldSkipContent:()=>hl,testRegex:()=>dp,updateRuleTemplate:()=>Xu,updateTagRule:()=>tp});function px(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...ml],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function It(){return $.get(ju,px())}function rr(t){$.set(ju,t)}function ya(){let t=It();return ct=t.ruleTemplates||[...ml],Oe=t.tagRules||[],vt=t.contentBlacklist||[],{ruleTemplates:ct,tagRules:Oe,contentBlacklist:vt}}function Ss(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function hl(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(s=>{let o=s.trim().toLowerCase();return o&&r.includes(o)})}function bl(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!yx.includes(t.toLowerCase())}function xl(t,e){if(!t||!e)return[];let r=[],s=Ss(e),o=new RegExp(`<${s}>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${s}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return a>i&&tr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function wl(t,e){if(!t||!e)return[];let r=[],s=Ss(e),o=new RegExp(`\\{${s}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let a=n.index,i=a+n[0].length,l=1,d=i;for(;d<t.length&&l>0;)t[d]==="{"?l++:t[d]==="}"&&l--,d++;if(l===0){let c=t.substring(i,d-1);c.trim()&&r.push(c.trim())}o.lastIndex=a+1}return r}function Wu(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return tr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let s=r[0].trim(),o=r[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return tr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let a=n[1],i=new RegExp(`${Ss(s)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(c=>{c[1]&&l.push(c[1].trim())}),l}function Hu(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return tr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let s=r[1],o=[],n=new RegExp(`<${s}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(n)].forEach(d=>{d[1]&&o.push(d[1].trim())});let i=(t.match(new RegExp(`<${s}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return i>l&&tr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${s}> \u6807\u7B7E`),o}function xr(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let s=e.filter(c=>c.type==="exclude"&&c.enabled),o=e.filter(c=>(c.type==="include"||c.type==="regex_include")&&c.enabled),n=e.filter(c=>c.type==="regex_exclude"&&c.enabled),a=t;for(let c of s)try{let u=new RegExp(`<${Ss(c.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ss(c.value)}>`,"gi");a=a.replace(u,"")}catch(u){tr.error("Error applying block exclusion rule:",{rule:c,error:u})}let i=[];if(o.length>0)for(let c of o){let u=[];try{if(c.type==="include")u.push(...xl(a,c.value)),u.push(...wl(a,c.value));else if(c.type==="regex_include"){let y=new RegExp(c.value,"gi");[...a.matchAll(y)].forEach(g=>{g[1]&&u.push(g[1])})}}catch(y){tr.error("Error applying inclusion rule:",{rule:c,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(a);let l=[];for(let c of i){for(let u of n)try{let y=new RegExp(u.value,"gi");c=c.replace(y,"")}catch(y){tr.error("Error applying cleanup rule:",{rule:u,error:y})}hl(c,r)||l.push(c)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Gu(t,e={}){let r=performance.now(),{chunkSize:s=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,d=0;for(let u=0;u<t.length;u+=s){let y=t.slice(u,Math.min(u+s,t.length));if(d++,l+=y.length,performance.now()-r>n){tr.warn(`Tag scanning timed out after ${n}ms`);break}let p;for(;(p=i.exec(y))!==null&&a.size<o;){let g=(p[1]||p[2]).toLowerCase();bl(g)&&a.add(g)}if(a.size>=o)break;d%5===0&&await new Promise(g=>setTimeout(g,0))}let c=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(c-r),processedChars:l,totalChars:t.length,chunkCount:d,tagsFound:a.size}}}function qu(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function Yu(){return ct.length===0&&ya(),ct}function Vu(t){return ct.find(e=>e.id===t)}function Ju(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return ct.push(e),vl(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Xu(t,e){let r=ct.findIndex(s=>s.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ct[r]={...ct[r],...e,updatedAt:new Date().toISOString()},vl(),{success:!0,template:ct[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Qu(t){let e=ct.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ct.splice(e,1),vl(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function vl(){let t=It();t.ruleTemplates=ct,rr(t)}function Js(){return Oe||ya(),Oe}function Zu(t){Oe=t||[];let e=It();e.tagRules=Oe,rr(e)}function ep(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};Oe.push(e);let r=It();return r.tagRules=Oe,rr(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function tp(t,e){if(t<0||t>=Oe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Oe[t]={...Oe[t],...e};let r=It();return r.tagRules=Oe,rr(r),{success:!0,rule:Oe[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function rp(t){if(t<0||t>=Oe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Oe.splice(t,1);let e=It();return e.tagRules=Oe,rr(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Xs(){return vt||ya(),vt}function sp(t){vt=t||[];let e=It();e.contentBlacklist=vt,rr(e)}function op(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=It();r.tagRulePresets||(r.tagRulePresets={});let s=`preset-${Date.now()}`;return r.tagRulePresets[s]={id:s,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(Oe)),blacklist:JSON.parse(JSON.stringify(vt)),createdAt:new Date().toISOString()},rr(r),{success:!0,preset:r.tagRulePresets[s],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function np(){let e=It().tagRulePresets||{};return Object.values(e)}function ap(t){let e=It(),s=(e.tagRulePresets||{})[t];return s?(Oe=JSON.parse(JSON.stringify(s.rules||[])),vt=JSON.parse(JSON.stringify(s.blacklist||[])),e.tagRules=Oe,e.contentBlacklist=vt,rr(e),{success:!0,preset:s,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function ip(t){let e=It(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,rr(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function lp(){return JSON.stringify({tagRules:Oe,contentBlacklist:vt,ruleTemplates:ct,tagRulePresets:It().tagRulePresets||{}},null,2)}function cp(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)Oe=r.tagRules||[],vt=r.contentBlacklist||[],ct=r.ruleTemplates||ml;else if(r.tagRules&&Oe.push(...r.tagRules),r.contentBlacklist){let o=new Set(vt.map(n=>n.toLowerCase()));r.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||vt.push(n)})}let s=It();return s.tagRules=Oe,s.contentBlacklist=vt,s.ruleTemplates=ct,r.tagRulePresets&&(s.tagRulePresets={...s.tagRulePresets||{},...r.tagRulePresets}),rr(s),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return tr.error("\u89C4\u5219\u914D\u7F6E\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function dp(t,e,r="g",s=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,r),n=[];if(r.includes("g")){let a;for(;(a=o.exec(e))!==null;)a.length>1?n.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[s]||a[1]||a[0]}):n.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=o.exec(e);a&&n.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[s]||a[1]:a[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(a=>a.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var tr,ju,yx,ml,ct,Oe,vt,up,fx,Qs=P(()=>{Fe();H();tr=C.createScope("RegexExtractor"),ju="settings";yx=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],ml=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],ct=[],Oe=[],vt=[];up={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};ya();fx={extractTagContent:xr,extractSimpleTag:xl,extractCurlyBraceTag:wl,extractComplexTag:Wu,extractHtmlFormatTag:Hu,escapeRegex:Ss,shouldSkipContent:hl,isValidTagName:bl,scanTextForTags:Gu,generateTagSuggestions:qu,getAllRuleTemplates:Yu,getRuleTemplate:Vu,createRuleTemplate:Ju,updateRuleTemplate:Xu,deleteRuleTemplate:Qu,getTagRules:Js,setTagRules:Zu,addTagRule:ep,updateTagRule:tp,deleteTagRule:rp,getContentBlacklist:Xs,setContentBlacklist:sp,saveRulesAsPreset:op,getAllRulePresets:np,loadRulePreset:ap,deleteRulePreset:ip,exportRulesConfig:lp,importRulesConfig:cp,testRegex:dp,MESSAGE_MACROS:up}});var xp={};ie(xp,{createDefaultToolDefinition:()=>Ts,default:()=>bx,deleteTool:()=>eo,deleteToolPreset:()=>mp,exportTools:()=>to,getAllTools:()=>sr,getCurrentToolPreset:()=>hp,getTool:()=>or,getToolPresets:()=>ga,importTools:()=>ro,normalizeToolDefinitionToRuntimeConfig:()=>tn,resetTools:()=>so,saveTool:()=>Zs,saveToolPreset:()=>gp,setCurrentToolPreset:()=>bp,setToolEnabled:()=>ma});function gx(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,Ts({...r||{},id:e})]))}function en(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Tl(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function pp(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function yp(t={}){return{settleMs:pp(t?.settleMs,1200),cooldownMs:pp(t?.cooldownMs,5e3)}}function fp(t={}){return{enabled:t?.enabled===!0,selected:en(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function mx(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function hx(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let s=mx(e?.config?.messages||[]);return s||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Ts(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...zt,...t,id:t?.id||zt.id,icon:t?.icon||zt.icon,order:Number.isFinite(t?.order)?t.order:zt.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:zt.promptTemplate,extractTags:en(t?.extractTags),config:{execution:{...zt.config.execution,...r.execution||{},timeout:Tl(r?.execution?.timeout,zt.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||zt.config.execution.retries)},api:{...zt.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...zt.config.context,...r.context||{},depth:Tl(r?.context?.depth,zt.config.context.depth),includeTags:en(r?.context?.includeTags),excludeTags:en(r?.context?.excludeTags)},automation:yp(r?.automation),worldbooks:fp(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...zt.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function tn(t,e={},r={}){let s=Ts({...e,id:t||e?.id||""}),o=en(s?.extractTags?.length?s.extractTags:s?.config?.context?.includeTags),n=String(e?.output?.apiPreset||s?.config?.api?.preset||"").trim(),a=hx(t,s),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:s.id||t,name:s.name||t,icon:s.icon||"fa-screwdriver-wrench",description:s.description||"",enabled:s.enabled!==!1,order:Number.isFinite(s.order)?s.order:100,bypass:{enabled:s?.config?.api?.useBypass===!0&&!!s?.config?.api?.bypassPreset,presetId:s?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:n,overwrite:!0,enabled:!0},automation:yp(s?.config?.automation),worldbooks:fp(s?.config?.worldbooks),extraction:{enabled:!0,maxMessages:Tl(s?.config?.context?.depth,5),selectors:o,regexPresetId:typeof s?.config?.extraction?.regexPresetId=="string"?s.config.extraction.regexPresetId:"",writebackTag:typeof s?.config?.extraction?.writebackTag=="string"?s.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:o,isCustom:!0,category:s.category||"utility",metadata:{...s.metadata||{}}}}function sr(){let t=_e.get(ze.TOOLS),e=gx(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&_e.set(ze.TOOLS,e),{...fa,...e}}function or(t){return sr()[t]||null}function Zs(t,e){if(!t||!e)return!1;let r=_e.get(ze.TOOLS)||{},s=!r[t]&&!fa[t],o=Ts({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=o,_e.set(ze.TOOLS,r),W.emit(s?U.TOOL_REGISTERED:U.TOOL_UPDATED,{toolId:t,tool:o}),!0}function eo(t){let e=_e.get(ze.TOOLS)||{};return!e[t]&&!fa[t]||fa[t]?!1:(delete e[t],_e.set(ze.TOOLS,e),W.emit(U.TOOL_UNREGISTERED,{toolId:t}),!0)}function ga(){return _e.get(ze.PRESETS)||{}}function gp(t,e){if(!t||!e)return!1;let r=ga(),s=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},_e.set(ze.PRESETS,r),W.emit(s?U.PRESET_CREATED:U.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function mp(t){let e=ga();return e[t]?(delete e[t],_e.set(ze.PRESETS,e),W.emit(U.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function hp(){return _e.get(ze.CURRENT_PRESET)||""}function bp(t){return _e.set(ze.CURRENT_PRESET,t||""),W.emit(U.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function ma(t,e){let r=or(t);if(!r)return!1;let s=_e.get(ze.TOOLS)||{};return s[t]=Ts({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),_e.set(ze.TOOLS,s),W.emit(e?U.TOOL_ENABLED:U.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function to(){let t=_e.get(ze.TOOLS)||{},e=_e.get(ze.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function ro(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,s=JSON.parse(t);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=r?{}:_e.get(ze.TOOLS)||{},n=r?{}:_e.get(ze.PRESETS)||{},a=0,i=0;if(s.tools&&typeof s.tools=="object"){for(let[l,d]of Object.entries(s.tools))!d||typeof d!="object"||(o[l]=Ts({...d,id:l}),a+=1);_e.set(ze.TOOLS,o)}if(s.presets&&typeof s.presets=="object"){for(let[l,d]of Object.entries(s.presets))!d||typeof d!="object"||(n[l]={...d,name:l,updatedAt:new Date().toISOString()},i+=1);_e.set(ze.PRESETS,n)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return log.error("\u5DE5\u5177\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function so(){_e.remove(ze.TOOLS),_e.remove(ze.PRESETS),_e.remove(ze.CURRENT_PRESET)}var zt,fa,ze,bx,rn=P(()=>{Fe();Qe();zt={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},fa={},ze={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};bx={getAllTools:sr,getTool:or,saveTool:Zs,deleteTool:eo,setToolEnabled:ma,exportTools:to,importTools:ro,resetTools:so,getToolPresets:ga,saveToolPreset:gp,deleteToolPreset:mp,getCurrentToolPreset:hp,setCurrentToolPreset:bp,createDefaultToolDefinition:Ts,normalizeToolDefinitionToRuntimeConfig:tn}});var Rl={};ie(Rl,{TOOL_CATEGORIES:()=>wp,TOOL_REGISTRY:()=>oo,appendToolRuntimeHistory:()=>Pp,clearToolApiPreset:()=>Ip,default:()=>Ax,ensureToolRuntimeConfig:()=>no,getAllDefaultToolConfigs:()=>Dp,getAllToolApiBindings:()=>Rp,getAllToolFullConfigs:()=>nn,getEnabledTools:()=>Lp,getToolApiPreset:()=>kl,getToolBaseConfig:()=>ha,getToolConfig:()=>on,getToolFullConfig:()=>ce,getToolList:()=>Ep,getToolSubTabs:()=>Ap,getToolWindowState:()=>$p,hasTool:()=>Cl,onPresetDeleted:()=>Mp,patchToolRuntime:()=>Ur,registerTool:()=>Tp,resetToolConfig:()=>Np,resetToolRegistry:()=>Cp,saveToolConfig:()=>Re,saveToolWindowState:()=>Op,setToolApiPreset:()=>kp,setToolApiPresetConfig:()=>Tx,setToolBypassConfig:()=>_x,setToolOutputMode:()=>Sx,setToolPromptTemplate:()=>Ex,unregisterTool:()=>_p,updateToolRuntime:()=>Il});function _s(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function xx(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function vp(){let t=sr()||{};return Object.entries(t).filter(([e])=>!sn[e]).map(([e,r])=>[e,r||{}])}function _l(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Sp(){let t=Array.isArray(oo.tools?.subTabs)?oo.tools.subTabs.map((r,s)=>({...r,order:Number.isFinite(r?.order)?r.order:s,toolKind:_l(r),toolGroupLabel:_l(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=vp().map(([r,s],o)=>{let n=tn(r,s),a=_l(n);return{id:r,name:n.name||r,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,s)=>(r.order??0)-(s.order??0))}function wx(t,e={}){let r=tn(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:_s(r.runtime)}}function Al(t){let e=sn[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:_s(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let s=(sr()||{})[t]||null;return s?wx(t,s):on(t)}function ha(t){let e=Al(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function vx(t,e={},r=""){if(!t)return null;let s={...t,...e,id:t.id||e.id};s.output={...t.output||{},...e.output||{}},s.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},s.bypass={...t.bypass||{},...e.bypass||{}},s.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},s.runtime=_s({...t.runtime||{},...e.runtime||{}}),s.extraction={...t.extraction||{},...e.extraction||{}},s.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||s.output?.apiPreset||s.apiPreset||r||"";return s.output={...s.output||{},apiPreset:o},s.apiPreset=o,t.isCustom?s.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?s.enabled=e.enabled:s.enabled=t.enabled!==!1,s}function Tp(t,e){if(!t||typeof t!="string")return et.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return et.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let s of r)if(!e[s])return et.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${s}`),!1;return nr[t]={id:t,...e,order:e.order??Object.keys(nr).length},et.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function _p(t){return nr[t]?(delete nr[t],et.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(et.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Ep(t=!0){let e=Object.values(nr).map(r=>r.id==="tools"?{...r,subTabs:Sp()}:r);return t?e.sort((r,s)=>(r.order??0)-(s.order??0)):e}function on(t){return t==="tools"&&nr[t]?{...nr[t],subTabs:Sp()}:nr[t]||null}function Cl(t){return!!nr[t]}function Ap(t){let e=on(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Cp(){nr={...oo},et.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function kp(t,e){if(!Cl(t))return et.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=$.get(Kt)||{};return r[t]=e||"",$.set(Kt,r),et.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function kl(t){return($.get(Kt)||{})[t]||""}function Ip(t){let e=$.get(Kt)||{};delete e[t],$.set(Kt,e),et.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Rp(){return $.get(Kt)||{}}function Mp(t){let e=$.get(Kt)||{},r=!1;for(let s in e)e[s]===t&&(e[s]="",r=!0,et.log(` \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&$.set(Kt,e)}function ce(t){let e=Al(t);if(!e)return on(t);let s=($.get(Kr)||{})[t]||{},o=kl(t),n=vx({...e,id:t},s,o);return et.debug(`[PRESET] getToolFullConfig ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(s.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(s.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(n.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(n.worldbooks||{}))}),n}function no(t){if(!t)return!1;let e=Al(t);if(!e)return!1;let r=$.get(Kr)||{};if(r[t])return!0;let s={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=s,$.set(Kr,r);let o=$.get(Kt)||{};return o[t]=s.output?.apiPreset||s.apiPreset||"",$.set(Kt,o),W.emit(U.TOOL_UPDATED,{toolId:t,config:s}),!0}function Re(t,e,r={}){if(!t||!ce(t))return et.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:s=!0}=r,o=$.get(Kr)||{},n=$.get(Kt)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){o[t][l]=a;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=a),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:a}),$.set(Kr,o),n[t]=a,$.set(Kt,n),et.debug(`[PRESET] saveToolConfig ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(o[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(o[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify(($.get(Kr)||{})[t]?.extraction||{}))}),s&&W.emit(U.TOOL_UPDATED,{toolId:t,config:o[t]}),et.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Sx(t,e){let r=ce(t);return r?Re(t,{...r,output:{...r.output,mode:e}}):!1}function Tx(t,e){let r=ce(t);return r?Re(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function _x(t,e){let r=ce(t);return r?Re(t,{...r,bypass:{...r.bypass,...e}}):!1}function Ex(t,e){let r=ce(t);return r?Re(t,{...r,promptTemplate:e}):!1}function Ur(t,e,r={}){let s=ce(t);if(!s)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1,emitRuntimeEvent:a=!0}=r,i=_s({...s.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=Re(t,{...s,runtime:i},{emitEvent:n});return l&&a&&W.emit(U.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:_s(s.runtime||{})}),l}function Pp(t,e,r={},s={}){let o=ce(t);if(!o)return!1;let{limit:n=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=s,l=_s(o.runtime||{}),d=_s(o.runtime||{}),c="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[c]=xx([...Array.isArray(l[c])?l[c]:[],u],n),u?.traceId&&(l.lastTraceId=u.traceId);let y=Re(t,{...o,runtime:l},{emitEvent:a});return y&&i&&W.emit(U.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:d,historyType:e,historyEntry:u}),y}function Il(t,e,r={}){let{touchLastRunAt:s=!0,emitEvent:o=!1,emitRuntimeEvent:n=!0}=r;return Ur(t,e,{touchLastRunAt:s,emitEvent:o,emitRuntimeEvent:n})}function Np(t){if(!t||!sn[t])return et.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=$.get(Kr)||{};return delete e[t],$.set(Kr,e),W.emit(U.TOOL_UPDATED,{toolId:t,config:null}),et.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Dp(){return{...sn}}function nn(){let t=new Set([...Object.keys(sn),...vp().map(([e])=>e)]);return Array.from(t).map(e=>ce(e)).filter(Boolean)}function Lp(){return nn().filter(t=>t&&t.enabled)}function Op(t,e){let r=$.get(El)||{};r[t]={...e,updatedAt:Date.now()},$.set(El,r)}function $p(t){return($.get(El)||{})[t]||null}var et,Kr,Kt,El,sn,oo,wp,nr,Ax,ar=P(()=>{Fe();Qe();H();rn();et=C.createScope("ToolRegistry"),Kr="tool_configs",Kt="tool_api_bindings",El="tool_window_states";sn={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_status_block"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},youyouReview:{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",description:"\u5728\u56DE\u590D\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50",enabled:!0,order:5,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_youyou"},promptTemplate:`\u8BF7\u57FA\u4E8E\u4EE5\u4E0B\u6700\u65B0\u5267\u60C5\u56DE\u590D\uFF0C\u751F\u6210\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u3002

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},oo={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},wp={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},nr={...oo};Ax={TOOL_REGISTRY:oo,TOOL_CATEGORIES:wp,registerTool:Tp,unregisterTool:_p,getToolList:Ep,getToolConfig:on,hasTool:Cl,getToolSubTabs:Ap,resetToolRegistry:Cp,setToolApiPreset:kp,getToolApiPreset:kl,clearToolApiPreset:Ip,getAllToolApiBindings:Rp,onPresetDeleted:Mp,saveToolWindowState:Op,getToolWindowState:$p,getToolBaseConfig:ha,ensureToolRuntimeConfig:no,getToolFullConfig:ce,patchToolRuntime:Ur,appendToolRuntimeHistory:Pp,saveToolConfig:Re,resetToolConfig:Np,getAllDefaultToolConfigs:Dp,getAllToolFullConfigs:nn,getEnabledTools:Lp}});function wa(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Up(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function Nl(t={}){let e=Object.values(qt).includes(t.type)?t.type:qt.INCLUDE;return{id:String(t.id||Up()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function ir(t={}){return{id:String(t.id||wa()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(Nl):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function wr(){let t=Ie.get(Pl);return!t||typeof t!="object"?{}:t}function an(t){Ie.set(Pl,t)}function Es(t){return typeof t=="string"&&t.startsWith(Cx)}function Fp(t){return Es(t)&&ba.find(e=>e.id===t)||null}function Dl(t){if(!Array.isArray(t)){ba=[];return}ba=t.map(e=>ir({...e,id:String(e?.id||"")})).filter(e=>Es(e.id))}function io(){if(Kp)return;Kp=!0;let t=$.get(Bp)||{};if(t[zp]===!0)return;let e=wr(),r=Object.keys(e).length>0,s=0,o={...e},n=t.tagRulePresets||{};for(let a of Object.values(n)){let i=ir({id:wa(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});o[i.id]=i,s+=1}if(!r&&s===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=ir({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});o[l.id]=l,Ie.set(ao,l.id),s+=1}}s>0&&(an(o),Fr.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${s} \u4E2A\u6B63\u5219\u9884\u8BBE`)),$.set(Bp,{...t,[zp]:!0})}function kx(){io();let t=wr(),e=new Set,r=[];for(let o of ba){let n=t[o.id];n?(r.push(ir(n)),e.add(o.id)):r.push(o)}let s=Object.values(t).map(ir).filter(o=>!e.has(o.id)).sort((o,n)=>n.updatedAt-o.updatedAt);return r.push(...s),r}function vr(t){if(!t)return null;io();let e=wr();return e[t]?ir(e[t]):Es(t)?Fp(t):null}function va(){io();let t=Ie.get(ao);return typeof t=="string"&&t?t:""}function jp(){let t=va();return t?vr(t):null}function Ix(t){if(t&&Es(t))return Ie.set(ao,t),xa(),W.emit(U.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=wr();return t&&!e[t]?(Fr.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Ie.set(ao,t||""),xa(),W.emit(U.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function Sa(t={}){io();let e=ir({...t,id:wa(),createdAt:Date.now(),updatedAt:Date.now()}),r=wr();return r[e.id]=e,an(r),W.emit(U.PRESET_CREATED,{kind:"regex",id:e.id}),Fr.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function As(t,e={}){if(!t)return null;let r=wr(),s=r[t];if(!s&&Es(t)&&(s=Fp(t)),!s)return null;let o=ir({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=o,an(r),va()===t&&Ml(o),W.emit(U.PRESET_UPDATED,{kind:"regex",id:t}),o}function Rx(t){if(!t)return!1;if(Es(t))return Fr.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=wr();return e[t]?(delete e[t],an(e),va()===t&&(Ie.set(ao,""),xa()),W.emit(U.PRESET_DELETED,{kind:"regex",id:t}),Fr.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Mx(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=vr(t);return r?Sa({...r,id:void 0,name:`${r.name}${e}`}):null}function Px(t,e){return Es(t)?(Fr.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):As(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Nx(t,e={}){let r=vr(t);if(!r)return null;let s=Nl({...e,id:Up()}),o=[...r.rules,s];return As(t,{rules:o})}function Dx(t,e,r={}){let s=vr(t);if(!s)return null;let o=s.rules.map(n=>n.id===e?Nl({...n,...r,id:n.id}):n);return As(t,{rules:o})}function Lx(t,e){let r=vr(t);if(!r)return null;let s=r.rules.filter(o=>o.id!==e);return As(t,{rules:s})}function Ox(t,e,r){let s=vr(t);if(!s)return null;let o=s.rules.findIndex(i=>i.id===e);if(o<0)return null;let n=r==="up"?o-1:o+1;if(n<0||n>=s.rules.length)return null;let a=[...s.rules];return[a[o],a[n]]=[a[n],a[o]],As(t,{rules:a})}function $x(t,e){let r=Array.isArray(e)?e.map(s=>String(s||"").trim()).filter(Boolean):[];return As(t,{blacklist:Array.from(new Set(r))})}function Bx(){return io(),{version:1,exportedAt:Date.now(),presets:Object.values(wr()).map(ir)}}function zx(t){if(io(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=wr(),s=0;for(let o of e){let n=ir({...o,id:wa(),createdAt:Date.now(),updatedAt:Date.now()});r[n.id]=n,s+=1}return s>0&&(an(r),W.emit(U.PRESET_IMPORTED,{kind:"regex",count:s})),{added:s}}function Kx(){Ie.set(Pl,{}),Ie.set(ao,""),xa(),Fr.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function Ml(t){if(t)try{let e=await Promise.resolve().then(()=>(Qs(),Sl));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){Fr.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function xa(){let t=jp();return Ml(t||{rules:[],blacklist:[]})}async function Ux(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(ar(),Rl));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(s=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(s.id):null)?.extraction?.regexPresetId===t).map(s=>s.id)}catch{return[]}}var Fr,Pl,ao,Bp,zp,qt,Cx,ba,Kp,Ae,jr=P(()=>{Fe();Qe();H();Fr=C.createScope("RegexPresetStore"),Pl="regex_presets",ao="regex_current_preset",Bp="settings",zp="regex_presets_migrated",qt=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});Cx="builtin_regex_",ba=[];Kp=!1;Ae={listPresets:kx,getPreset:vr,getCurrentPresetId:va,getCurrentPreset:jp,setCurrentPresetId:Ix,createPreset:Sa,updatePreset:As,deletePreset:Rx,duplicatePreset:Mx,renamePreset:Px,addRule:Nx,updateRule:Dx,deleteRule:Lx,moveRule:Ox,setBlacklist:$x,exportAll:Bx,importPresets:zx,resetAll:Kx,findLinkedTools:Ux,RULE_TYPES:qt}});var qp={};ie(qp,{RegexExtractPanel:()=>Gp,default:()=>Yx});function jx(t,e,r,s,o,n){let a=f("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:n?null:"true","data-rule-id":e.id}}),i=f("div",{style:{cursor:n?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:n?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),d=X({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:n||r===0,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Ae.moveRule(t.id,e.id,"up"),o()}}),c=X({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:n||r===s-1,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Ae.moveRule(t.id,e.id,"down"),o()}});l.appendChild(d.el),l.appendChild(c.el),a.appendChild(l);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),y=be({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:n,style:{fontSize:"12px",padding:"6px 10px"},onChange:_=>Ae.updateRule(t.id,e.id,{name:_})});u.appendChild(y.el),e.description&&u.appendChild(f("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let p=Me({value:e.type,disabled:n,options:Fx,style:{fontSize:"11px",padding:"6px 10px"},onChange:_=>{Ae.updateRule(t.id,e.id,{type:_}),o()}});a.appendChild(p.el);let g=e.type===qt.REGEX_INCLUDE||e.type===qt.REGEX_EXCLUDE,m=be({value:e.value||"",placeholder:g?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:n,style:{fontSize:"12px",padding:"6px 10px",fontFamily:"ui-monospace, monospace"},onChange:_=>Ae.updateRule(t.id,e.id,{value:_})});a.appendChild(m.el);let h=f("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),x=xt({checked:e.enabled!==!1,disabled:n,style:{padding:"0",border:"none",background:"transparent"},onChange:_=>{Ae.updateRule(t.id,e.id,{enabled:_}),o()}});return h.appendChild(x.el),n||h.appendChild(X({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{Ae.deleteRule(t.id,e.id),o()}}).el),a.appendChild(h),a}function Wx(t,e,r){let s=null;t.addEventListener("dragstart",o=>{let n=o.target;if(!(n instanceof HTMLElement))return;let a=n.closest("[data-rule-id]");if(a){s=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",s)}catch{}}}),t.addEventListener("dragend",o=>{let n=o.target;n instanceof HTMLElement&&(n.style.opacity=""),s=null}),t.addEventListener("dragover",o=>{if(s){o.preventDefault();try{o.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",o=>{if(o.preventDefault(),!s)return;let n=o.target instanceof HTMLElement?o.target.closest("[data-rule-id]"):null;if(!n)return;let a=n.getAttribute("data-rule-id");if(!a||a===s)return;let i=Ae.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(y=>y.id===s),d=i.rules.findIndex(y=>y.id===a);if(l<0||d<0)return;let c=[...i.rules],[u]=c.splice(l,1);c.splice(d,0,u),Ae.updatePreset(e.id,{rules:c}),r()})}function Hx(t,{onChange:e,readonly:r,refresh:s}){let o=f("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});G(o,Ct({label:"\u63CF\u8FF0",control:be({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let n=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},f("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?f("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):X({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{Ae.addRule(t.id,{type:qt.INCLUDE,value:"",enabled:!0}),s&&s()}}).el);G(o,n);let a=f("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(jx(t,t.rules[i],i,t.rules.length,s,r));r||Wx(a,t,s)}else a.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(G(o,a),G(o,f("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),G(o,f("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)G(o,f("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=sl({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>Ae.setBlacklist(t.id,l)});G(o,i.el)}return o}function Gx(t){if(!t)return null;let e=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});G(e,f("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=Hp.get(t.id)||{input:"",output:""};Hp.set(t.id,r);let s=f("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=r.input,s.addEventListener("input",()=>{r.input=s.value}),G(e,s);let o=f("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});o.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let n=X({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=s.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",o.textContent=r.output,o.style.color="var(--yyt-text-muted)";return}try{let i=xr(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",o.textContent=r.output,o.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,o.textContent=r.output,o.style.color="var(--yyt-danger, #f87171)"}}});return G(e,n.el),G(e,o),e}function qx(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var FE,Fx,Hp,Gp,Yx,Yp=P(()=>{Zt();jr();Qs();H();Vo();FE=C.createScope("RegexExtractPanel"),Fx=[{value:qt.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:qt.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:qt.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:qt.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],Hp=new Map;Gp=Dr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:Ae,renderEditor:Hx,renderExtras:Gx,renderListItemMeta:qx}),Yx=Gp});function Se(t){return t==null?"":String(t).trim()}function Jx(t="table"){let e=Se(t)||"table",r=Date.now().toString(36),s=Math.random().toString(36).slice(2,8);return`${e}_${r}_${s}`}function ln(t="row"){return Jx(t)}function Yt(t,e=0){return Se(t)||`table_${Number.isFinite(e)?e+1:1}`}function cn(t,e=0){return Se(t)||`row_${Number.isFinite(e)?e+1:1}`}function de(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function lo(t={}){return{chatId:Se(t.chatId),sourceMessageId:Se(t.sourceMessageId||t.messageId),sourceSwipeId:Se(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:Se(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:Se(t.slotBindingKey),slotRevisionKey:Se(t.slotRevisionKey),slotTransactionId:Se(t.slotTransactionId),traceId:Se(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function Ll(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:Se(t.runSource)||tt.MANUAL,traceId:Se(t.traceId),chatId:Se(t.chatId),sourceMessageId:Se(t.sourceMessageId||t.messageId),sourceSwipeId:Se(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:Se(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:Se(t.slotBindingKey),slotRevisionKey:Se(t.slotRevisionKey),slotTransactionId:Se(t.slotTransactionId),assistantContentFingerprint:Se(t.assistantContentFingerprint),assistantBaseFingerprint:Se(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function Sr(t){return!t||typeof t!="object"?null:{chatId:Se(t.chatId),slotBindingKey:Se(t.slotBindingKey),slotRevisionKey:Se(t.slotRevisionKey),sourceMessageId:Se(t.sourceMessageId),sourceSwipeId:Se(t.sourceSwipeId),tables:Array.isArray(t.tables)?de(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?de(t.meta):{}}}function dn(t={},e={}){let r=Ll(t),s=e.meta&&typeof e.meta=="object"?de(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?de(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:s.sourceKind||Rt.EMPTY,...s}}}function Ta(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?lo(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?lo(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function Ce(t){if(t==null)return St;let e=String(t).trim();return e===""?St:e}function un(t,e){let r=Se(t),s=Ce(e);return`${r}::${s}`}function Jp(){return{rows:[],cols:[],cells:[],indexColumn:!1}}function Xp(t,e){return`${Number.isFinite(t)?t:-1}:${Number.isFinite(e)?e:-1}`}var Cs,Wr,tt,mt,ks,Rt,co,Vx,St,He,Vp,jE,WE,We=P(()=>{Cs="YouYouToolkit_tableState",Wr="YouYouToolkit_tableBindings",tt=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),mt=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),ks=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Rt=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),co=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),Vx=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});St="";He=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),Vp=8,jE=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),WE=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function _a(t,e=""){return t==null?e:String(t).trim()||e}function Xx(t,e=!1){return t==null?e:t===!0}function Ea(t={},e=0){return Yt(t?.id||t?.key,e)}function pn(t={},e={}){let r=t&&typeof t=="object"?t:{},s=e&&typeof e=="object"?e:{},o=_a(r.mode||r.runScope||s.mode||s.runScope,mt.ENABLED),n=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>_a(i,"")).filter(Boolean):Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(i=>_a(i,"")).filter(Boolean):[],a=_a(r.activeTableId||s.activeTableId,"");return{mode:Object.values(mt).includes(o)?o:mt.ENABLED,selectedTableIds:n,activeTableId:a}}function Qp(t={},e=[]){let r=pn(t,t?.scope||{}),s=Array.isArray(e)?e:[],o=s.map((c,u)=>Ea(c,u)),n=new Set(o),a=r.mode,i=!1;a===mt.CURRENT?(!r.activeTableId||!n.has(r.activeTableId))&&(a=mt.ENABLED,i=!0):a===mt.SELECTED&&r.selectedTableIds.filter(u=>n.has(u)).length===0&&(a=mt.ENABLED,i=!0);let l=[];a===mt.CURRENT?l=r.activeTableId?[r.activeTableId]:[]:a===mt.SELECTED?l=r.selectedTableIds.filter(c=>n.has(c)):l=s.map((c,u)=>({table:c,id:Ea(c,u)})).filter(({table:c})=>Xx(c?.enabled,!0)).map(({id:c})=>c);let d=new Set(l);return{...r,mode:a,requestedMode:r.mode,staleScope:i,allTableIds:o,allowedTableIds:l,allowedIdSet:d,includes(c={},u=-1){return d.has(Ea(c,u))},filterTables(c=[]){return(Array.isArray(c)?c:[]).filter((y,p)=>d.has(Ea(y,p)))},toJSON(){return{mode:a,requestedMode:r.mode,staleScope:i,selectedTableIds:de(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...l]}}}}var Aa=P(()=>{We()});function Mt(t,e=""){return t==null?e:String(t).trim()||e}function Ol(){let t=globalThis.window||globalThis;return Mt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Qx(t,e=!1){return t===!0}function Zx(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:Qx(e.enabled,!1),targetBook:Mt(e.targetBook,""),entryComment:Mt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function $l(t={},e={}){let r=t&&typeof t=="object"?t:{},s=pn(r.scope,{mode:r.runScope||e.runScope||mt.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:Mt(r.chatId,Mt(e.chatId,Ol())),templateId:Mt(r.templateId,Mt(e.templateId,ht)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(o=>Mt(o,"")).filter(Boolean):[],focusedTableId:Mt(r.focusedTableId,s.activeTableId),scope:s,worldbookSync:Zx(r.worldbookSync),seedNote:Mt(r.seedNote,""),updatedAt:Mt(r.updatedAt,new Date().toISOString())}}function ty(){let t=Zp.get(ey,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Bl(t=Ol()){let e=Mt(t,"default_chat"),r=ty();return $l(r[e],{chatId:e})}function ry(t={},e=Ol()){let r=Mt(e,"default_chat"),s=ty(),o=$l({...s[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return Zp.set(ey,{...s,[r]:o}),{success:!0,guide:o}}function sy(t={},e=null){let r=$l(e||Bl(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),s={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(s.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),s}var Zp,ey,oy=P(()=>{Fe();lr();We();Aa();Zp=$.namespace("tableWorkbenchGuides"),ey="guides"});function re(t,e,r="",s=ka){return{key:t,title:e,description:r,type:s,required:!1}}function Hr({id:t,name:e,note:r,aiInstructions:s,columns:o}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:s?.init||"",create:s?.create||"",update:s?.update||"",delete:s?.delete||""},columns:o,rows:[]}}var ke,Ca,zl,ny,ew,ka,ay,ht,Kl,uo,iy=P(()=>{ke=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),Ca=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),zl=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

\u8981\u6C42\uFF1A
1. \u53EA\u4F9D\u636E\u5F53\u524D\u5BF9\u8BDD\u5185\u5BB9\u66F4\u65B0\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002
2. \u4FDD\u6301\u539F\u6709\u8868\u7ED3\u6784\uFF1B\u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\u3002
3. \u4F18\u5148\u7528 <tableEdit> \u589E\u91CF DSL\uFF08\u7CBE\u786E\u4E0D\u7834\u574F\u9501\u5B9A\u5B57\u6BB5\uFF09\u3002
4. \u8868\u683C\u7EA7 AI \u64CD\u4F5C\u8BF4\u660E\uFF1A
{{tableGuidance}}
5. \u672C\u6B21\u8FD0\u884C scope\uFF1A
{{tableScopeGuidance}}
6. \u4F18\u5148\u53C2\u8003\u5F53\u524D assistant \u56DE\u590D\uFF1A{{lastAiMessage}}

\u5F53\u524D\u8868\u683C\u57FA\u5E95 JSON\uFF1A
{{toolContentMacro}}`,ny=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

  insertRow(tableIndex, {"0": "\u503C1", "1": "\u503C2"})     # \u65B0\u589E\u884C\uFF1BtableIndex \u662F\u8868\u7684 0 \u57FA\u7D22\u5F15
  updateRow(tableIndex, rowIndex, {"1": "\u65B0\u503C"})      # \u53EA\u5217\u51FA\u8981\u6539\u7684\u5217\uFF0C\u672A\u63D0\u53CA\u7684\u5217\u4FDD\u7559\u539F\u503C
  deleteRow(tableIndex, rowIndex)                     # \u5220\u9664\u884C\uFF1BrowIndex 0 \u57FA\u4E0D\u542B\u8868\u5934

\u7EA6\u5B9A\uFF1A
- tableIndex / rowIndex \u90FD\u662F 0 \u57FA\u6574\u6570\uFF08rowIndex \u4E0D\u542B\u8868\u5934\u884C\uFF09
- data \u5BF9\u8C61\u7684\u952E\u662F\u5217\u7D22\u5F15\u5B57\u7B26\u4E32\uFF08"0"\u3001"1"\u3001"2" \u2026\uFF09\uFF0C\u4E0D\u662F\u5217\u540D
- \u591A\u6761\u6307\u4EE4\u653E\u5728\u540C\u4E00\u4E2A <tableEdit> \u5757\u5185\uFF0C\u6309\u987A\u5E8F\u6267\u884C
- \u6CA1\u6709\u53D8\u66F4\u65F6\u8F93\u51FA\u7A7A\u5757 <tableEdit></tableEdit>
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001Markdown \u4EE3\u7801\u5757\u6807\u8BB0\u6216\u989D\u5916 JSON

\u793A\u4F8B\uFF1A
<tableEdit>
insertRow(0, {"0": "\u5357\u5BAB\u59EC\u601C", "1": "\u5973/17", "2": "\u767D\u53D1\u5F02\u77B3"})
updateRow(0, 1, {"3": "\u597D\u5947\u4E0A\u8FDB", "5": "\u7A7F\u8D8A\u8005"})
deleteRow(1, 0)
</tableEdit>

\u5982\u786E\u5B9E\u9700\u8981\u5168\u91CF\u66FF\u6362\u6574\u5F20\u8868\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u8FD4\u56DE JSON\uFF1A
  {"tables": [{...}, {...}]}
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,ew=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),ka="text",ay=Object.freeze(ew.map(t=>Object.freeze({...t}))),ht="default_story_state",Kl="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";uo=Object.freeze([Hr({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[re("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),re("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),re("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),re("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),Hr({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[re("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),re("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),re("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),re("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),re("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),re("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),Hr({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:'\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0"\u662F\u5426\u79BB\u573A"\u3002'},columns:[re("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),re("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),re("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),re("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),re("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),re("offstage","\u662F\u5426\u79BB\u573A",'\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199"\u662F"\u6216"\u5426"\u3002',"boolean"),re("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),Hr({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[re("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),re("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),re("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),re("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),Hr({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[re("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),re("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),re("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),re("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),Hr({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[re("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),re("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),re("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),re("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),re("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),re("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),re("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),re("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),Hr({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[re("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),re("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),re("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),re("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),re("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),Hr({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[re("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),re("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),re("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),re("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function tw(t,e=""){return t==null?e:String(t).trim()||e}function Gr(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function ly(t,e="col"){return tw(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function yn(t,e=new Set){let r=ly(t,"col"),s=r,o=2;for(;e.has(s);)s=`${r}_${o}`,o+=1;return e.add(s),s}var cy=P(()=>{});function N(t,e=""){return t==null?e:String(t).trim()||e}function cr(t,e=!1){return t==null?e:t===!0}function rw(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=N(e.name||e.title,""),s=N(e.note||e.description,""),o=Array.isArray(e.columns)?e.columns:[],n=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||s||o.length!==1||n.length>1)return!1;let a=o[0]&&typeof o[0]=="object"?o[0]:{},i=N(a.key||a.id,""),l=N(a.title||a.name||a.label,"");if(N(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(n.length===0)return!0;let c=n[0]&&typeof n[0]=="object"?n[0]:{},u=N(c.name||c.title||c.label,""),y=c.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{},p=Array.isArray(c.values)?c.values:[],g=Object.values(y).some(m=>N(m,""))||p.some(m=>N(m,""));return(!u||u==="\u884C1")&&!g}function sw(t,{seedDefaultWhenMissing:e=!1}={}){return rw(t)?de(uo):Array.isArray(t)?de(t):t&&typeof t=="object"?ow(t):e?de(uo):[]}function jl(t=""){let e=[],r=N(t,""),s=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,o;for(;o=s.exec(r);)e.push({title:N(o[1],""),description:N(o[2],"")});return e}function ow(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(s=>s.startsWith("sheet_")&&e[s]&&typeof e[s]=="object").map((s,o)=>({key:s,table:e[s],fallbackOrder:o})).sort((s,o)=>{let n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder,a=Number.isFinite(o.table.orderNo)?o.table.orderNo:o.fallbackOrder;return n-a}).map(({key:s,table:o},n)=>{let a=o.sourceData&&typeof o.sourceData=="object"?o.sourceData:{},i=Array.isArray(o.content)?o.content:[],l=Array.isArray(i[0])?i[0]:[],d=jl(a.note),c=new Set,u=l.slice(1).map((p,g)=>{let m=d[g]||{},h=N(p||m.title,`\u5217${g+1}`);return{key:yn(h||`col_${g+1}`,c),title:h,description:N(m.description,""),type:ka,required:!1}}),y=i.slice(1).map((p,g)=>{let m=Array.isArray(p)?p:[],h={};return u.forEach((x,_)=>{h[x.key]=Gr(m[_+1])}),{name:N(m[0],`\u884C${g+1}`),cells:h}});return{id:N(o.uid||s,`sheet_${n+1}`),name:N(o.name,`\u8868${n+1}`),note:N(a.note,""),enabled:o.enabled!==!1,aiInstructions:{init:N(a.initNode,""),create:N(a.insertNode,""),update:N(a.updateNode,""),delete:N(a.deleteNode,"")},columns:u,rows:y}})}function nw(t=[]){let e=[],r=0;return t.forEach(s=>{let o=s&&typeof s=="object"?s:{},n=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,a=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;n&&Object.keys(n).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(s=>({key:s,title:String(s)})):r>0?Array.from({length:r},(s,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function Wl(t,e=ka){let r=N(t,e);return ay.some(s=>s.value===r)?r:e}function aw(t={},e=0,r=new Set){let s=t&&typeof t=="object"?t:{},o=N(s.title||s.name||s.label,`\u5217${e+1}`),n=N(s.key||s.id,""),a=yn(n||o||`col_${e+1}`,r),i=[n,N(s.title,""),N(s.name,""),N(s.label,"")].filter(Boolean);return{key:a,title:o,description:N(s.description||s.note,""),type:Wl(s.type),required:s.required===!0,sourceKeys:i}}function iw(t={},e={},r=0){let s=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(s){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of n)if(s[a]!==void 0)return Gr(s[a])}return o&&o[r]!==void 0?Gr(o[r]):""}function lw(t={},e=[],r=0){let s=t&&typeof t=="object"?t:{},o={};return e.forEach((n,a)=>{o[n.key]=iw(s,n,a)}),{id:cn(s.id||s.rowId,r),name:N(s.name||s.title||s.label,`\u884C${r+1}`),cells:o}}function cw(t={}){let e=t&&typeof t=="object"?t:{};return{init:N(e.init,""),create:N(e.create,""),update:N(e.update,""),delete:N(e.delete,"")}}function dw(t={},e=""){let r=t&&typeof t=="object"?t:{},s=N(r.presetId,N(e,""));return{enabled:r.enabled===!0,presetId:s}}function uw(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:cr(r.enabled,!1),entryName:N(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:cr(r.splitByRow,!1),keywords:N(r.keywords,""),injectionTemplate:N(r.injectionTemplate,""),preventRecursion:cr(r.preventRecursion,!0),entryPlacement:{position:N(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0}}}function pw(t={},e=0){let r=t&&typeof t=="object"?t:{},s=new Set,n=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:nw(Array.isArray(r.rows)?r.rows:[])).map((l,d)=>aw(l,d,s)),a=Array.isArray(r.rows)?r.rows.map((l,d)=>lw(l,n,d)):[],i=N(r.name||r.title,`\u8868${e+1}`);return{id:Yt(r.id||r.key,e),name:i,note:N(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:cw(r.aiInstructions),exportConfig:uw(r.exportConfig,i),columns:n.map(l=>({key:l.key,title:l.title,description:N(l.description,""),type:Wl(l.type),required:l.required===!0})),rows:a}}function dy(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>N(o,"")).filter(Boolean):[],s=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:N(e.lastStatus,ke.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:N(e.lastError,""),lastErrorDetails:r,lastValidationSummary:s,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:N(e.lastSourceMessageId,""),lastSlotRevisionKey:N(e.lastSlotRevisionKey,""),lastLoadMode:N(e.lastLoadMode,""),lastFillMode:N(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:N(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:N(e.lastResolvedFromRevisionKey,""),lastSourceKind:N(e.lastSourceKind,""),lastScopeMode:N(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:N(e.lastAutoStatus,ke.IDLE),lastAutoMessageId:N(e.lastAutoMessageId,""),lastAutoRevisionKey:N(e.lastAutoRevisionKey,""),lastAutoSkipReason:N(e.lastAutoSkipReason,"")}}function yw(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((s,o)=>pw(s,o))}function uy(t="",e={},r={}){let s=Wl(e?.type),o=String(t??"").trim(),n=N(r?.label,`${N(r?.tableName,"\u8868\u683C")} / ${N(r?.rowName,"\u884C")} / ${N(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!o&&a.push(`${n} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:a.length===0,errors:a,warnings:i};if(s==="number"&&!Number.isFinite(Number(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),s==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&a.push(`${n} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),s==="date"&&Number.isNaN(Date.parse(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),s==="json")try{JSON.parse(o)}catch(l){a.push(`${n} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function fw(t={}){let r=yw(t&&typeof t=="object"?t:{}),s=[];return r.forEach((o,n)=>{let a=N(o?.name,`\u8868${n+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];a||s.push(`\u8868 ${n+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&s.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let d=new Set;i.forEach((c,u)=>{let y=N(c?.key,""),p=N(c?.title,`\u5217${u+1}`);if(!y){s.push(`${a} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(d.has(y)){s.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}d.add(y)}),l.forEach((c,u)=>{let y=N(c?.name,`\u884C${u+1}`),p=c?.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{};i.forEach((g,m)=>{let h=N(g?.key,""),x=N(g?.title||h,`\u5217${m+1}`),_=h?Gr(p[h]):"",w=uy(_,g,{label:`${a} / ${y} / ${x}`,tableName:a,rowName:y});s.push(...w.errors)})})}),{valid:s.length===0,errors:s,tables:r}}function po({severity:t="error",message:e="",tableIndex:r=-1,tableName:s="",columnIndex:o=-1,columnKey:n="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:N(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:N(s,""),columnIndex:o,columnKey:N(n,""),rowIndex:a,rowName:N(i,""),cellKey:N(l,"")}}function Ia(t={}){let e=fw(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let s=Array.isArray(e.tables)?e.tables:[];s.forEach((a,i)=>{let l=N(a?.name,`\u8868${i+1}`),d=Array.isArray(a?.columns)?a.columns:[],c=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(po({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),d.forEach((y,p)=>{let g=N(y?.key,""),m=N(y?.title,`\u5217${p+1}`);g||r.push(po({severity:"error",message:`${l} / ${m} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:g,cellKey:g})),g&&(u.has(g)&&r.push(po({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${g}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:g,cellKey:g})),u.add(g))}),c.forEach((y,p)=>{let g=N(y?.name,`\u884C${p+1}`),m=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(m).forEach(x=>{d.some(_=>N(_?.key,"")===x)||r.push(po({severity:"warning",message:`${l} / ${g} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${x}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:g,cellKey:x}))}),d.forEach((x,_)=>{let w=N(x?.key,""),B=N(x?.title||w,`\u5217${_+1}`),A=w?Gr(m[w]):"",T=uy(A,x,{label:`${l} / ${g} / ${B}`,tableName:l,rowName:g});T.errors.forEach(E=>{r.push(po({severity:"error",message:E,tableIndex:i,tableName:l,columnIndex:_,columnKey:w,rowIndex:p,rowName:g,cellKey:w}))}),T.warnings.forEach(E=>{r.push(po({severity:"warning",message:E,tableIndex:i,tableName:l,columnIndex:_,columnKey:w,rowIndex:p,rowName:g,cellKey:w}))})})})});let o=r.filter(a=>a.severity!=="warning").map(a=>a.message),n=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:o.length===0,errors:o,warnings:n,issues:r,tables:s,summary:{errorCount:o.length,warningCount:n.length}}}function py(){return{tables:de(uo),promptTemplate:zl,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:ht,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:mt.ENABLED,scope:{mode:mt.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:Ca.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},tableEnabledOverrides:{},runtime:dy()}}function Ut(t={}){let e=py(),r=t&&typeof t=="object"?t:{},s=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,o=dw(s,r.promptPreset),n=sw(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=r.scope&&typeof r.scope=="object"?r.scope:{},i=typeof r.runScope=="string"&&r.runScope?{...a,mode:r.runScope}:a,l=pn(i,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),d=cr(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:n,promptTemplate:N(r.promptTemplate,e.promptTemplate),apiPreset:N(r.apiPreset,""),promptPreset:o.presetId,bypass:o,activeTemplate:N(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:d,autoUpdateTrigger:N(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:l.mode,scope:l,fillMode:r.fillMode===Ca.FULL?Ca.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(c=>typeof c=="string"&&c.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(c=>c.trim()).filter(Boolean):[],contextUseGlobalRules:cr(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:N(r.extraction?.regexPresetId,"")},worldbooks:{enabled:cr(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(c=>typeof c=="string"&&c.trim()):[],presetId:N(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:cr(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:N(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:cr(r.worldbookSync?.enabled,!1),targetBook:N(r.worldbookSync?.targetBook,""),entryComment:N(r.worldbookSync?.entryComment,e.worldbookSync.entryComment),wrapperConfig:r.worldbookSync?.wrapperConfig?{enabled:cr(r.worldbookSync.wrapperConfig?.enabled,!0),wrapperTag:N(r.worldbookSync.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:N(r.worldbookSync.wrapperConfig?.wrapperHint,""),wrapperPlacement:{position:N(r.worldbookSync.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}:void 0},wrapperConfig:{enabled:cr(r.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:N(r.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:N(r.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:N(r.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},tableEnabledOverrides:r.tableEnabledOverrides&&typeof r.tableEnabledOverrides=="object"&&!Array.isArray(r.tableEnabledOverrides)?Object.fromEntries(Object.entries(r.tableEnabledOverrides).filter(([c,u])=>typeof c=="string"&&c&&typeof u=="boolean")):{},runtime:dy({...e.runtime,...r.runtime||{}})}}function Hl(t={}){let e=Ut(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function Ne(){let t=Ul.get(Fl,py()),e=Ut(t),r=Bl();return{...sy(e,r),guide:r}}function gw(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(s=>({...s,rows:[]}));return{...t,tables:r}}function dt(t={}){let e=Ne(),r=Ut({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),s=Hl(r);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors,config:s.config};let o=gw(s.config);return Ul.set(Fl,o),ry({templateId:s.config.activeTemplate,scope:s.config.scope,worldbookSync:s.config.worldbookSync}),{success:!0,config:s.config}}function yy(t={}){let e=Ne(),r=Ut({...e,runtime:{...e.runtime,...t||{}}});return Ul.set(Fl,r),r.runtime}function mw(t={},e={}){let r=Ut(t),s=N(r.promptTemplate,zl);return e.skipResponseContract?s.trim():`${s}

${ny}`.trim()}function fy(t={},e={}){let r=Ut(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:mw(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var Ul,Fl,lr=P(()=>{Fe();We();yo();Aa();oy();iy();cy();Ul=$.namespace("tableWorkbench"),Fl="config"});function ql(){return Gl||(Gl=C.createScope("TableIsolation")),Gl}var gy,my,Gl,Yl,ue,Yr=P(()=>{Fe();H();We();gy="tableEngine.isolation",my=Object.freeze({enabled:!1,key:St});Yl=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=$.get(gy,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||St:St}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),s=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(s,{reason:"patch"})}reset(){this._commit({...my},{reason:"reset"})}getScopeKey(e){return un(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...my}:{enabled:e.enabled===!0,key:Ce(e.key)}}_commit(e,r={}){let s=this.getState();if(s.enabled===e.enabled&&s.key===e.key)return;this._cache=e;try{$.set(gy,e)}catch(n){ql().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",n)}ql().info("isolation \u72B6\u6001\u53D8\u5316",{prev:s,next:e,reason:r.reason||""});let o={...e,prev:s,reason:r.reason||""};for(let n of this._subscribers)try{n(o)}catch(a){ql().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},ue=new Yl});var hy={};ie(hy,{AuthorityProvider:()=>Ra,default:()=>bw});var fo,Vl,hw,Vr,Ra,bw,by=P(()=>{H();mo();fo=C.createScope("AuthorityProvider"),Vl="third-party/youyou-toolkit",hw="YouYou Toolkit",Vr="main",Ra=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=go.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=Ma();if(!e)return fo.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:Vl,displayName:hw,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,fo.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:Vl}),!0}catch(r){return fo.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=Vr,tableName:s}={}){this._ensureReady();let o={database:r,migrations:e};s&&(o.tableName=s);let n=await this._client.sql.migrate(o);return{applied:n?.applied||[],skipped:n?.skipped||[],tableName:n?.tableName,latestId:n?.latestId}}async query({statement:e,params:r=[],database:s=Vr,page:o=void 0}={}){this._ensureReady();let n={database:s,statement:e,params:r};o&&(n.page=o);let a=await this._client.sql.query(n);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:s=Vr}={}){this._ensureReady();let o=await this._client.sql.exec({database:s,statement:e,params:r});return{rowsAffected:o.rowsAffected??0,lastInsertRowid:o.lastInsertRowid??null}}async batch({statements:e,database:r=Vr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:s}))?.results||[]}}async transaction({statements:e,database:r=Vr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]})),o=await this._client.sql.transaction({database:r,statements:s});return{committed:!!o?.committed,results:o?.results||[]}}async paginate({statement:e,params:r=[],database:s=Vr,page:o={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:s,page:o})}async pageAll({statement:e,params:r=[],database:s=Vr,pageSize:o=200,maxPages:n}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:s,statement:e,params:r},{pageSize:o,maxPages:n});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return fo.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return fo.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){fo.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:Vl,database:Vr,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},bw=Ra});var wy={};ie(wy,{FallbackProvider:()=>Pa,default:()=>Aw});function xw(t){let e=[],r=0,s="";for(let o of t)o==="("?r+=1:o===")"&&(r-=1),o===","&&r===0?(s.trim()&&e.push(s),s=""):s+=o;return s.trim()&&e.push(s),e}function ww(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=xw(s),n=[],a=[];for(let i of o){let l=i.trim(),d=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(d){a=d[1].split(",").map(u=>u.trim());continue}let c=l.match(/^(\w+)\s+(\w+)/);c&&(n.push({name:c[1],type:c[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[c[1]]))}return{name:r,columns:n,pkCols:a}}function vw(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2]?e[2].split(",").map(n=>n.trim()):null,o=(e[3].match(/\?/g)||[]).length;return{name:r,cols:s,paramCount:o}}function Ql(t){let e=t.split(/\s+AND\s+/i),r=[];for(let s of e){let o=s.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(o){let a=o[2]==="<>"?"!=":o[2];r.push({col:o[1],op:a,placeholder:!0});continue}let n=s.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(n){r.push({col:n[1],op:n[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${s}"`)}return r}function Sw(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),s=e[2],o=e[3],n=o.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=o.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=o.match(/\bLIMIT\s+(\d+)/i),l=o.match(/\bOFFSET\s+(\d+)/i);return{name:s,cols:r==="*"?null:r.split(",").map(d=>d.trim()),where:n?Ql(n[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function Tw(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:n,where:o?Ql(o.trim()):null}}function _w(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?Ql(e[2].trim()):null}:null}function Xl(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function fn(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function Ew(t,e,r){let s=t[e.col];if(e.op==="IS NULL")return s==null;if(e.op==="IS NOT NULL")return s!=null;let o=r.shift();switch(e.op){case"=":return Xl(s,o);case"!=":return!Xl(s,o);case">":return fn(s,o)>0;case"<":return fn(s,o)<0;case">=":return fn(s,o)>=0;case"<=":return fn(s,o)<=0;default:return!1}}function Jl(t,e,r){if(!e||!e.length)return!0;let s=Array.isArray(r)?[...r]:[];for(let o of e)if(!Ew(t,o,s))return!1;return!0}var ho,xy,Pa,Aw,vy=P(()=>{H();Fe();mo();ho=C.createScope("FallbackProvider"),xy="provider_fallback_v1";Pa=class{constructor(){this.kind=go.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=_e.get(xy)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]});return this._initialized=!0,ho.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return ho.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],s=[];for(let o of e||[]){if(!o?.id||!o?.statement)continue;if(this._migrations.has(o.id)){s.push(o.id);continue}let n=o.statement.trim();if(/^CREATE\s+TABLE/i.test(n)){let a=ww(n);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${n}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(n))if(/^DROP\s+TABLE/i.test(n)){let a=n.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(n)?ho.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:o.id}):ho.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:o.id,statement:n});this._migrations.add(o.id),r.push(o.id)}return this._markDirty(),{applied:r,skipped:s}}async query({statement:e,params:r=[]}={}){this._ensureReady();let s=Sw(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let o=this._tables.get(s.name);if(!o)return{columns:s.cols||[],rows:[],rowCount:0};let n=o.rows.filter(l=>Jl(l,s.where,r));if(s.orderBy){let l=s.orderBy.dir==="DESC"?-1:1;n=[...n].sort((d,c)=>fn(d[s.orderBy.col],c[s.orderBy.col])*l)}s.offset&&(n=n.slice(s.offset)),Number.isFinite(s.limit)&&(n=n.slice(0,s.limit));let a,i=n;return s.cols?(i=n.map(l=>{let d={};for(let c of s.cols)d[c]=l[c]===void 0?null:l[c];return d}),a=s.cols):a=o.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let s=String(e||"").trim(),o=s.split(/\s+/)[0].toUpperCase(),n;if(o==="INSERT")n=this._doInsert(s,r);else if(o==="UPDATE")n=this._doUpdate(s,r);else if(o==="DELETE")n=this._doDelete(s,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return n}_doInsert(e,r){let s=vw(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let o=this._tables.get(s.name);if(!o)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${s.name}`);let n=s.cols||(o.schema.columns||[]).map(d=>d.name);if(!n.length)throw new Error(`\u8868 ${s.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==n.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${n.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let d=0;d<n.length;d+=1)a[n[d]]=r[d];let i=o.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let d=o.rows.findIndex(c=>i.every(u=>Xl(c[u],a[u])));if(d>=0){if(l)return o.rows[d]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:d+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return o.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:o.rows.length}}_doUpdate(e,r){let s=Tw(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=s.setCols.length;if(r.length<n)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${n}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,n),i=r.slice(n),l=0;for(let d of o.rows)if(Jl(d,s.where,i)){for(let c=0;c<n;c+=1)d[s.setCols[c]]=a[c];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let s=_w(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=o.rows.length;o.rows=o.rows.filter(i=>!Jl(i,s.where,r));let a=n-o.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let s of e||[])if(String(s.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let n=await this.query(s);r.push({kind:"query",...n})}else{let n=await this.execute(s);r.push({kind:"exec",...n})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:s}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:s}}catch(s){throw this._restore(r),ho.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:s?.message||s}),s}}async paginate({statement:e,params:r=[],page:s={}}={}){this._ensureReady();let o=Number.isFinite(s?.limit)?s.limit:50,n=Number.isFinite(s?.offset)?s.offset:0,a=`${e} LIMIT ${o} OFFSET ${n}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,s]of this._tables)e[r]={schema:s.schema,rows:JSON.parse(JSON.stringify(s.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{_e.set(xy,this._snapshot()),this._dirty=!1}catch(r){ho.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},Aw=Pa});var Sy={};ie(Sy,{PROVIDER_KIND:()=>go,createProvider:()=>Cw,detectAuthoritySdk:()=>Ma,disposeToolDataProvider:()=>kw,getCurrentProvider:()=>bo,getToolDataProvider:()=>mn});function Ma(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function ec({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&Ma()){let{AuthorityProvider:s}=await Promise.resolve().then(()=>(by(),hy));return new s({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(vy(),wy));return new r}async function mn(t={}){return Rs||gn||(gn=(async()=>{let e=await ec({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===go.AUTHORITY){Zl.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await ec({preferAuthority:!1}),r=await e.init()}return r?Zl.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):Zl.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),Rs=e,e})(),gn)}function bo(){return Rs}async function Cw(t={}){let e=await ec(t);return await e.init(),e}async function kw(){if(Rs){try{await Rs.dispose()}catch{}Rs=null}gn=null}var Zl,go,Rs,gn,mo=P(()=>{H();Zl=C.createScope("ToolDataProvider"),go=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),Rs=null,gn=null});var ic={};ie(ic,{clearChatScopeConfig:()=>Oy,clearLockEntry:()=>My,clearScopeLocks:()=>Ny,clearSheetLocks:()=>Py,clearSlot:()=>ky,commitSlotTables:()=>Oa,default:()=>Rw,deleteRowsBySheet:()=>Ay,deleteSheetsBySlot:()=>La,ensureTableDataReady:()=>Ge,getChatScopeConfig:()=>Dy,getCurrentTableDataProvider:()=>_y,getLocksForSheet:()=>Iy,getRowsBySheet:()=>ac,getSheetsBySlot:()=>oc,loadSlotTables:()=>Cy,setChatScopeConfig:()=>Ly,setLockEntry:()=>Ry,upsertSheetMeta:()=>sc,upsertSheetRows:()=>nc});function rc(){return tc||(tc=C.createScope("TableDataService")),tc}async function Ge(){return Ty?bo():hn||(hn=(async()=>{try{let t=await mn();if(!t)return rc().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...Iw]});return Ty=!0,rc().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return rc().error("table-data-service migration \u5931\u8D25",t),null}finally{hn=null}})(),hn)}function _y(){return bo()}function Ey(){return Date.now()}function Na(t){try{return JSON.stringify(t)}catch{return"{}"}}function Da(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function Jr(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:Ce(t.isolationKey)}}function Xr(t){return t&&t.chatId&&t.messageId}async function sc(t,e){let r=await Ge();if(!r)return!1;let s=Jr(t);return!Xr(s)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e.uid),String(e.name??e.uid),Na(Array.isArray(e.columns)?e.columns:[]),Na(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,Ey()]}),!0)}async function oc(t){let e=await Ge();if(!e)return[];let r=Jr(t);return Xr(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(o=>({uid:o.sheet_uid,name:o.name,columns:Da(o.columns_json,[]),meta:Da(o.meta_json,{}),orderNo:o.order_no||0,updatedAt:o.updated_at||0})):[]}async function La(t){let e=await Ge();if(!e)return 0;let r=Jr(t);return Xr(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function nc(t,e,r){let s=await Ge();if(!s)return!1;let o=Jr(t);if(!Xr(o)||!e||!Array.isArray(r))return!1;if(await s.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e)]}),r.length===0)return!0;let n=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),Na(a?.cells||{})]}));return typeof s.transaction=="function"?await s.transaction({statements:n}):await s.batch({statements:n}),!0}async function ac(t,e){let r=await Ge();if(!r)return[];let s=Jr(t);return!Xr(s)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rows||[]).map(n=>({id:n.row_id||"",name:n.row_name||"",cells:Da(n.cells_json,{}),rowIndex:n.row_index}))}async function Ay(t,e){let r=await Ge();if(!r)return 0;let s=Jr(t);return!Xr(s)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rowsAffected||0}async function Cy(t){let e=await oc(t);if(e.length===0)return[];let r=[];for(let s of e){let o=await ac(t,s.uid);r.push({id:s.uid,uid:s.uid,name:s.name,columns:s.columns,rows:o,meta:s.meta,orderNo:s.orderNo,updatedAt:s.updatedAt})}return r}async function Oa(t,e){let r=await Ge();if(!r)return!1;let s=Jr(t);if(!Xr(s)||!Array.isArray(e))return!1;await La(s),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey]});for(let o=0;o<e.length;o++){let n=e[o],a=String(n?.uid||n?.id||`sheet_${o+1}`);await sc(s,{uid:a,name:n?.name||a,columns:n?.columns||[],meta:n?.meta||{},orderNo:Number.isFinite(n?.orderNo)?n.orderNo:o}),await nc(s,a,Array.isArray(n?.rows)?n.rows:[])}return!0}async function ky(t){let e=await Ge();if(!e)return!1;let r=Jr(t);return Xr(r)?(await La(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function Iy(t,e){let r=await Ge();if(!r)return[];let s=String(t?.chatId??"").trim(),o=Ce(t?.isolationKey);return!s||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function Ry(t,e,r,s=""){let o=await Ge();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=Ce(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[n,a,String(e),String(r),String(s)]}),!0)}async function My(t,e,r,s=""){let o=await Ge();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=Ce(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[n,a,String(e),String(r),String(s)]}),!0)}async function Py(t,e){let r=await Ge();if(!r)return!1;let s=String(t?.chatId??"").trim(),o=Ce(t?.isolationKey);return!s||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}),!0)}async function Ny(t){let e=await Ge();if(!e)return!1;let r=String(t?.chatId??"").trim(),s=Ce(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,s]}),!0):!1}async function Dy(t){let e=await Ge();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let o=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return o?Da(o.scoped_config_json,null):null}async function Ly(t,e){let r=await Ge();if(!r)return!1;let s=String(t??"").trim();return s?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[s,Na(e||{}),Ey()]}),!0):!1}async function Oy(t){let e=await Ge();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var tc,Iw,Ty,hn,Rw,$a=P(()=>{H();mo();We();Iw=Object.freeze([{id:"table_engine_v1__sheets",statement:`
      CREATE TABLE IF NOT EXISTS table_sheets (
        chat_id TEXT NOT NULL,
        message_id TEXT NOT NULL,
        swipe_id TEXT NOT NULL DEFAULT '0',
        isolation_key TEXT NOT NULL DEFAULT '',
        sheet_uid TEXT NOT NULL,
        name TEXT NOT NULL,
        columns_json TEXT NOT NULL,
        meta_json TEXT,
        order_no INTEGER DEFAULT 0,
        updated_at INTEGER,
        PRIMARY KEY (chat_id, message_id, swipe_id, isolation_key, sheet_uid)
      )
    `.replace(/\s+/g," ").trim()},{id:"table_engine_v1__rows",statement:`
      CREATE TABLE IF NOT EXISTS table_rows (
        chat_id TEXT NOT NULL,
        message_id TEXT NOT NULL,
        swipe_id TEXT NOT NULL DEFAULT '0',
        isolation_key TEXT NOT NULL DEFAULT '',
        sheet_uid TEXT NOT NULL,
        row_index INTEGER NOT NULL,
        row_id TEXT,
        row_name TEXT,
        cells_json TEXT NOT NULL,
        PRIMARY KEY (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index)
      )
    `.replace(/\s+/g," ").trim()},{id:"table_engine_v1__locks",statement:`
      CREATE TABLE IF NOT EXISTS table_locks (
        chat_id TEXT NOT NULL,
        isolation_key TEXT NOT NULL DEFAULT '',
        sheet_uid TEXT NOT NULL,
        lock_type TEXT NOT NULL,
        target TEXT NOT NULL DEFAULT '',
        PRIMARY KEY (chat_id, isolation_key, sheet_uid, lock_type, target)
      )
    `.replace(/\s+/g," ").trim()},{id:"table_engine_v1__chat_scope",statement:`
      CREATE TABLE IF NOT EXISTS table_chat_scope (
        chat_id TEXT NOT NULL,
        scoped_config_json TEXT NOT NULL,
        updated_at INTEGER,
        PRIMARY KEY (chat_id)
      )
    `.replace(/\s+/g," ").trim()}]),Ty=!1,hn=null;Rw={ensureTableDataReady:Ge,getCurrentTableDataProvider:_y,upsertSheetMeta:sc,getSheetsBySlot:oc,deleteSheetsBySlot:La,upsertSheetRows:nc,getRowsBySheet:ac,deleteRowsBySheet:Ay,loadSlotTables:Cy,commitSlotTables:Oa,clearSlot:ky,getLocksForSheet:Iy,setLockEntry:Ry,clearLockEntry:My,clearSheetLocks:Py,clearScopeLocks:Ny,getChatScopeConfig:Dy,setChatScopeConfig:Ly,clearChatScopeConfig:Oy}});function _r(){return lc||(lc=C.createScope("TableChatScope")),lc}function dr(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function za(){return new Date().toISOString()}function xo(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Tr(t){let e=dc.get(cc,{}),s=(xo(e)?e:{})[t];return By(s)}function Ms(t,e){let r=dc.get(cc,{}),s=xo(r)?r:{};s[t]=e,dc.set(cc,s),Pw(t,e).catch(()=>{})}async function Pw(t,e){try{let r=await Promise.resolve().then(()=>($a(),ic));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){_r().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function $y(){return{template:{},templateArchives:{}}}function By(t){return xo(t)?{template:xo(t.template)?t.template:{},templateArchives:xo(t.templateArchives)?t.templateArchives:{}}:$y()}function Ba(t){return xo(t)?{mode:Nw.has(t.mode)?t.mode:He.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?de(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:za(),source:typeof t.source=="string"?t.source:"ui"}:null}function Dw(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,s=e.join("||");for(let o=0;o<s.length;o++)r=(r<<5)+r+s.charCodeAt(o),r|=0;return String(r)}var Mw,cc,lc,dc,Nw,uc,ur,zy=P(()=>{Fe();H();We();Yr();Mw="tableChatScope",cc="chats";dc=$.namespace(Mw);Nw=new Set(Object.values(He));uc=class{getScopedConfig(e=dr()){return Tr(e)}setScopedConfig(e,r=dr()){let s=By(e);return Ms(r,s),s}getTemplateScope(e,r=dr()){let s=Ce(e===void 0?ue.getKey():e),o=Tr(r);return Ba(o.template[s])||null}setTemplateScope(e,r,s=dr()){let o=Ce(r===void 0?ue.getKey():r),n=Ba({...e,updatedAt:za()});if(!n)return _r().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=Tr(s);return a.template[o]=n,Ms(s,a),_r().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:s,isolationKey:o,mode:n.mode}),n}clearTemplateScope(e,r=dr()){let s=Ce(e===void 0?ue.getKey():e),o=Tr(r);o.template[s]!==void 0&&(delete o.template[s],Ms(r,o),_r().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:s}))}archiveCurrentTemplate(e,r=dr()){let s=Ce(e===void 0?ue.getKey():e),o=Tr(r),n=Ba(o.template[s]);if(!n)return null;let a=Dw(n),i=Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:de(n),archivedAt:za()},d=[l,...i].slice(0,Vp);return o.templateArchives[s]=d,Ms(r,o),_r().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:s,archiveCount:d.length}),l}listTemplateArchives(e,r=dr()){let s=Ce(e===void 0?ue.getKey():e),o=Tr(r);return(Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[]).map(a=>de(a))}restoreTemplateArchive(e,r,s=dr()){let o=Ce(r===void 0?ue.getKey():r),n=Tr(s),a=Array.isArray(n.templateArchives[o])?n.templateArchives[o]:[],i=a[e];if(!i)return _r().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(o,s);let l=Ba({...i.state,source:"restore",updatedAt:za()});if(!l)return null;let d=Tr(s);return d.template[o]=l,Ms(s,d),_r().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:s,isolationKey:o,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=dr()){let s=Ce(e===void 0?ue.getKey():e),o=Tr(r);Array.isArray(o.templateArchives[s])&&(delete o.templateArchives[s],Ms(r,o),_r().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:s}))}resetChat(e=dr()){Ms(e,$y()),_r().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},ur=new uc});var Ky,Uy=P(()=>{We();Ky=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (tables \u6570\u7EC4)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Array.isArray(t.tables)},parse(t){if(!t||typeof t!="object")throw new Error("youyou-importer: raw \u4E0D\u662F\u5BF9\u8C61");return{tables:Array.isArray(t.tables)?de(t.tables):[],name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",promptTemplate:typeof t.promptTemplate=="string"?t.promptTemplate:""}}})});function pr(t,e=""){return t==null?e:String(t).trim()||e}function Fy(t){return t&&typeof t=="object"&&Array.isArray(t.content)}function jy(t){return!t||typeof t!="object"?null:t.tables&&typeof t.tables=="object"&&!Array.isArray(t.tables)&&Object.keys(t.tables).filter(s=>s.startsWith("sheet_")&&Fy(t.tables[s])).length>0?t.tables:Object.keys(t).filter(r=>r.startsWith("sheet_")&&Fy(t[r])).length>0?t:null}function Lw(t){return!t||typeof t!="object"?[]:Object.keys(t).filter(r=>r.startsWith("sheet_")&&t[r]&&typeof t[r]=="object").map((r,s)=>({key:r,table:t[r],fallbackOrder:s})).sort((r,s)=>{let o=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder;return o-n}).map(({key:r,table:s},o)=>{let n=s.sourceData&&typeof s.sourceData=="object"?s.sourceData:{},a=Array.isArray(s.content)?s.content:[],i=Array.isArray(a[0])?a[0]:[],l=jl(n.note),d=new Set,c=i.slice(1).map((y,p)=>{let g=l[p]||{},m=pr(y||g.title,`\u5217${p+1}`);return{key:yn(m||`col_${p+1}`,d),title:m,description:pr(g.description,""),type:"text",required:!1}}),u=a.slice(1).map((y,p)=>{let g=Array.isArray(y)?y:[],m={};return c.forEach((h,x)=>{m[h.key]=Gr(g[x+1])}),{name:pr(g[0],`\u884C${p+1}`),cells:m}});return{id:pr(s.uid||r,`sheet_${o+1}`),name:pr(s.name,`\u8868${o+1}`),note:pr(n.note,""),enabled:s.enabled!==!1,aiInstructions:{init:pr(n.initNode,""),create:pr(n.insertNode,""),update:pr(n.updateNode,""),delete:pr(n.deleteNode,"")},columns:c,rows:u}})}var Wy,Hy=P(()=>{We();lr();Wy=Object.freeze({formatId:"shujuku",displayName:"shujuku \u6570\u636E\u5E93\u683C\u5F0F (sheet_x)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:jy(t)!==null},parse(t){let e=jy(t);if(!e)throw new Error("shujuku-importer: \u672A\u627E\u5230 sheet_xxx \u5165\u53E3");return{tables:Lw(e),name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:""}}})});var Gy,qy=P(()=>{Gy=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (.json)",fileExtension:".json",mimeType:"application/json",serialize(t){return{version:1,exportedAt:new Date().toISOString(),templates:Array.isArray(t)?t:[]}}})});function bn(){return pc||(pc=C.createScope("TemplateAdapter")),pc}function Yy(t){if(t==null)return null;for(let e of Ow){let r=!1;try{r=e.detect(t)}catch(s){bn().warn(`importer ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&Array.isArray(s.tables))return bn().debug("\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,displayName:e.displayName,tableCount:s.tables.length,firstTableName:s.tables[0]?.name||""}),{...s,formatId:e.formatId};bn().warn(`importer ${e.formatId} parse \u8FD4\u56DE\u65E0\u6548\u7ED3\u6784`,{hasResult:!!s,hasTablesArray:Array.isArray(s?.tables)})}catch(s){bn().warn(`importer ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return bn().warn("importTemplateAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{isObject:t&&typeof t=="object",isArray:Array.isArray(t),keys:t&&typeof t=="object"?Object.keys(t).slice(0,10):[]}),null}var pc,Ow,HA,Vy=P(()=>{H();Uy();Hy();qy();Ow=Object.freeze([Ky,Wy]),HA=Object.freeze([Gy])});function Tt(){return yc||(yc=C.createScope("TableTemplate")),yc}function rt(t,e=""){return t==null?e:String(t).trim()||e}function Jy(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function vo(t={}){let e=Yy(t),r=[],s="",o="",n="",a="";e?(r=e.tables,s=e.formatId||"",o=e.name||"",n=e.description||"",a=e.promptTemplate||""):t&&typeof t=="object"&&Tt().warn("normalizeTemplate: \u65E0\u9002\u914D\u5668\u547D\u4E2D\uFF0C\u6309\u7A7A\u6A21\u677F\u5904\u7406",{keys:Object.keys(t).slice(0,10)});let i=Ia({tables:r});return{id:rt(t?.id,Jy()),name:rt(t?.name||o,"\u672A\u547D\u540D\u6A21\u677F"),description:rt(t?.description||n,""),tables:i.tables||r,promptTemplate:rt(t?.promptTemplate||a,""),sourceFormat:s,createdAt:rt(t?.createdAt,new Date().toISOString()),updatedAt:rt(t?.updatedAt,new Date().toISOString())}}function Xy(){xn=null}function Qy(){return[vo({id:ht,name:Kl,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:de(uo)})]}function Ps(){let t=wo.get(fc,[]);return Array.isArray(t)?t.map(vo):[]}function Zr(){if(xn)return xn;let t=Qy(),e=Ps(),r=new Map(e.map(n=>[n.id,n])),s=t.map(n=>r.has(n.id)?r.get(n.id):n),o=new Set(t.map(n=>n.id));for(let n of e)o.has(n.id)||s.push(n);return xn=Object.freeze(s),xn}function Is(t){let e=rt(t,"");return Zr().find(r=>r.id===e)||null}function qr(t={}){let e=new Date().toISOString(),r=vo({...t,id:rt(t.id,Jy()),updatedAt:e,createdAt:rt(t.createdAt,e)}),o=Ps().filter(n=>n.id!==r.id);return o.push(r),wo.set(fc,o),Xy(),{success:!0,template:r}}function mc(t){let e=rt(t,"");if(!e||e===ht)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=Ps().filter(s=>s.id!==e);return wo.set(fc,r),Xy(),$w()===e&&hc(ht),{success:!0}}function Zy(t,e){let r=rt(t,"");if(!r||r===ht)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let s=rt(e,"");if(!s)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let o=Is(r);return o?qr({...o,name:s}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function Ka(){return{version:1,exportedAt:new Date().toISOString(),templates:Ps()}}function ef(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};Tt().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let s=new Set(Ps().map(i=>i.id)),o=0,n=0,a=[];for(let i of r)try{let l=vo(i);if(Tt().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&s.has(l.id)){n++;continue}qr(l),s.add(l.id),o++}catch(l){a.push(rt(l?.message,"\u672A\u77E5\u9519\u8BEF")),Tt().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return Tt().info("importTemplates \u5B8C\u6210",{imported:o,skipped:n,errorCount:a.length}),{success:!0,imported:o,skipped:n,errors:a}}function $w(){let t=wo.get(gc,""),e=rt(t,ht);return Is(e)?e:ht}function hc(t){let e=rt(t,ht);return wo.set(gc,e),Tt().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function Qr(){let t=wo.get(gc,""),e=rt(t,ht),r=Is(e);return r||Qy()[0]}function Bw(t){try{return JSON.stringify(t)}catch(e){return Tt().error("templateToString \u5931\u8D25",e),""}}function zw(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return vo(e)}catch(e){return Tt().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function So({chatId:t,isolationKey:e}={}){let r=e===void 0?ue.getKey():e,s=ur.getTemplateScope(r,t);if(!s||s.mode===He.INHERIT_GLOBAL){let n=Qr();return Tt().debug("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:n?.id||"",templateName:n?.name||"",tableCount:Array.isArray(n?.tables)?n.tables.length:0,firstTableName:n?.tables?.[0]?.name||""}),{template:n,mode:He.INHERIT_GLOBAL,source:{templateId:n?.id||""}}}if(s.mode===He.CHAT_OVERRIDE){let n=zw(s.templateStr);if(n)return{template:n,mode:He.CHAT_OVERRIDE,source:{}};Tt().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=Qr();return{template:a,mode:He.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(s.mode===He.PRESET_LINK){let n=s.presetName||"",a=Zr(),i=a.find(d=>d.name===n)||a.find(d=>d.id===n);if(i)return{template:i,mode:He.PRESET_LINK,source:{presetName:n,templateId:i.id}};Tt().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:n});let l=Qr();return{template:l,mode:He.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:n,fallback:!0}}}let o=Qr();return{template:o,mode:He.INHERIT_GLOBAL,source:{templateId:o?.id||"",unknownMode:s.mode}}}function tf(t,e={}){if(!t||typeof t!="object")return{success:!1,error:"\u6A21\u677F\u4E0D\u80FD\u4E3A\u7A7A"};let r=vo(t),s=e.isolationKey===void 0?ue.getKey():e.isolationKey;ur.archiveCurrentTemplate(s,e.chatId);let o=ur.setTemplateScope({mode:He.CHAT_OVERRIDE,templateStr:Bw(r),source:e.source||"ui"},s,e.chatId);return Tt().info("applyTemplateAsChatOverride",{chatId:e.chatId,isolationKey:s,templateName:r.name}),{success:!0,scopeState:o}}function rf(t,e={}){let r=rt(t,"");if(!r)return{success:!1,error:"presetName \u4E0D\u80FD\u4E3A\u7A7A"};let s=Zr(),o=s.find(i=>i.name===r)||s.find(i=>i.id===r);if(!o)return{success:!1,error:"\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u5168\u5C40\u9884\u8BBE"};let n=e.isolationKey===void 0?ue.getKey():e.isolationKey;ur.archiveCurrentTemplate(n,e.chatId);let a=ur.setTemplateScope({mode:He.PRESET_LINK,presetName:o.name,source:e.source||"ui"},n,e.chatId);return Tt().info("linkPresetToChat",{chatId:e.chatId,isolationKey:n,presetName:o.name}),{success:!0,scopeState:a}}function sf(t={}){let e=t.isolationKey===void 0?ue.getKey():t.isolationKey;return t.archive!==!1&&ur.archiveCurrentTemplate(e,t.chatId),ur.clearTemplateScope(e,t.chatId),Tt().info("resetChatTemplateScope",{chatId:t.chatId,isolationKey:e}),{success:!0}}function of(t={}){let e=t.isolationKey===void 0?ue.getKey():t.isolationKey;return ur.listTemplateArchives(e,t.chatId)}function nf(t,e={}){let r=e.isolationKey===void 0?ue.getKey():e.isolationKey,s=ur.restoreTemplateArchive(t,r,e.chatId);return s?{success:!0,scopeState:s}:{success:!1,error:"\u5F52\u6863\u4E0D\u5B58\u5728"}}var wo,fc,gc,yc,xn,yo=P(()=>{Fe();H();lr();We();zy();Yr();Vy();wo=$.namespace("tableWorkbenchTemplates"),fc="templates",gc="activeId";xn=null});var cf={};ie(cf,{TableTemplatePanel:()=>lf,default:()=>Ww});function bc(t){return t===ht}function Fw(t,{onChange:e,readonly:r}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});G(s,Ct({label:"\u63CF\u8FF0",control:be({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),G(s,f("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),G(s,f("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=f("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});o.value=t.promptTemplate||"",o.addEventListener("change",()=>{r||e({promptTemplate:o.value})}),G(s,o),G(s,f("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),G(s,f("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let n=f("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{n.textContent=JSON.stringify(t.tables||[],null,2)}catch{n.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return G(s,n),s}function jw(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var Kw,af,Uw,lf,Ww,df=P(()=>{Zt();yo();lr();H();Vo();Kw=C.createScope("TableTemplatePanel"),af="";Uw={listPresets(){return Zr().map(t=>({id:bc(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=Is(e);return r?{id:bc(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return af||""},setCurrentPresetId(t){return af=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=qr({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(bc(r))return Kw.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let s=Is(r);if(!s)return null;let o=qr({...s,...e,id:r});return o?.success?{id:o.template.id,...o.template,_rawId:o.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!mc(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let s=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${s}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,s=Zy(r,e);return s?.success?this.getPreset(s.template?.id||r):null},exportAll(){return Ka()},importPresets(t){let e=ef(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=Ps();for(let e of t)try{mc(e.id)}catch{}}};lf=Dr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:Uw,renderEditor:Fw,renderListItemMeta:jw}),Ww=lf});var pf={};ie(pf,{ToolManagePanel:()=>uf,default:()=>Hw});var Pt,uf,Hw,yf=P(()=>{it();H();rn();ar();Pt=C.createScope("ToolManagePanel"),uf={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");ft(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){Pt.warn("\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E",null,{toast:!0});return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=sr(),r=Object.entries(e),s=r.filter(([,o])=>o?.enabled!==!1).length;return`
      <div class="yyt-tool-manager">
        <!-- Stats -->
        <div class="yyt-flow-section">
          <div class="yyt-stat-row" style="grid-template-columns: 1fr 1fr;">
            <div class="yyt-stat-cell">
              <div class="yyt-stat-label">\u5DE5\u5177\u603B\u6570</div>
              <div class="yyt-stat-value">${r.length}</div>
            </div>
            <div class="yyt-stat-cell">
              <div class="yyt-stat-label">\u5DF2\u542F\u7528</div>
              <div class="yyt-stat-value" style="color: var(--yyt-success);">${s}</div>
            </div>
          </div>
        </div>

        <!-- \u5DE5\u5177\u5217\u8868 -->
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading">
            <span class="yyt-flow-heading-icon"><i class="fa-solid fa-tools"></i></span>
            \u5DE5\u5177\u5217\u8868
            <span class="yyt-flow-heading-action">
              <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="yyt-add-tool">
                <i class="fa-solid fa-plus"></i> \u65B0\u5EFA\u5DE5\u5177
              </button>
            </span>
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?`<div class="yyt-list-table">${e.map(([s,o])=>`
      <div class="yyt-list-row ${o.enabled?"yyt-tool-item-enabled":"yyt-tool-item-disabled"}" data-tool-id="${s}">
        <div class="yyt-list-row-icon" style="background: var(--yyt-accent-soft); color: var(--yyt-accent);">
          <i class="fa-solid fa-wrench"></i>
        </div>
        <div class="yyt-list-row-main">
          <div class="yyt-list-row-name">
            ${le(o.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${le(o.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${le(o.description)}</div>
        </div>
        <span class="yyt-status-dot ${o.enabled?"yyt-status-dot-on":"yyt-status-dot-off"}"></span>
        <label class="yyt-toggle yyt-small yyt-tool-toggle">
          <input type="checkbox" ${o.enabled?"checked":""}>
          <span class="yyt-toggle-slider"></span>
        </label>
        <div class="yyt-list-row-actions">
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="config">
            <i class="fa-solid fa-sliders"></i>
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-danger" data-action="delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join("")}</div>`:`
        <div class="yyt-empty-state-small">
          <i class="fa-solid fa-toolbox"></i>
          <span>\u8FD8\u6CA1\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2"\u65B0\u5EFA\u5DE5\u5177"\u5F00\u59CB\u521B\u5EFA</span>
        </div>
      `},bindEvents(t,e){let r=te();!r||!ve(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let s=e(r.currentTarget).closest(".yyt-list-row"),o=s.data("tool-id"),n=e(r.currentTarget).is(":checked");ma(o,n),s.toggleClass("yyt-tool-item-enabled",n).toggleClass("yyt-tool-item-disabled",!n),s.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",n).toggleClass("yyt-status-dot-off",!n),Pt.info(n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528",null,{toast:!0})}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),o=or(s);if(!s||!o||!await br("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${o.name}"\u5417\uFF1F`,{danger:!0}))return;if(!eo(s)){Pt.error("\u5220\u9664\u5931\u8D25",null,{toast:!0});return}this.renderTo(t),Pt.info("\u5DE5\u5177\u5DF2\u5220\u9664",null,{toast:"success"})})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let s=r.target.files[0];if(s){try{let o=await Fo(s),n=ro(o,{overwrite:!1});n.success?Pt.info(n.message,null,{toast:"success"}):Pt.error(n.message,null,{toast:!0}),n.success&&this.renderTo(t)}catch(o){Pt.error(`\u5BFC\u5165\u5931\u8D25: ${o.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=to();Uo(r,`youyou_toolkit_tools_${Date.now()}.json`),Pt.info("\u5DE5\u5177\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){Pt.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await br("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(so(),this.renderTo(t),Pt.info("\u5DE5\u5177\u5DF2\u91CD\u7F6E",null,{toast:!0}))})},_showToolEditDialog(t,e,r){let s=r?or(r):null,o=!!s,n=`
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
                       value="${s?le(s.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5206\u7C7B</label>
                <select class="yyt-select" id="yyt-tool-category">
                  <option value="api" ${s?.category==="api"?"selected":""}>API</option>
                  <option value="prompt" ${s?.category==="prompt"?"selected":""}>Prompt</option>
                  <option value="utility" ${s?.category==="utility"?"selected":""}>Utility</option>
                </select>
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0</label>
              <input type="text" class="yyt-input" id="yyt-tool-desc"
                     value="${s?le(s.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u8D85\u65F6\u65F6\u95F4(ms)</label>
                <input type="number" class="yyt-input" id="yyt-tool-timeout"
                       value="${s?.config?.execution?.timeout||6e4}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u91CD\u8BD5\u6B21\u6570</label>
                <input type="number" class="yyt-input" id="yyt-tool-retries"
                       value="${s?.config?.execution?.retries||3}">
              </div>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;this._removeDialog(t),t.append(n);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),d=a.find("#yyt-tool-desc"),c=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");Bt(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{ft(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),a.on("click",function(p){p.target===this&&y()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),g=l.val(),m=d.val().trim(),h=parseInt(c.val())||6e4,x=parseInt(u.val())||3;if(!p){Pt.warn("\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0",null,{toast:!0}),i.trigger("focus").trigger("select");return}let _=r||`tool_${Date.now()}`;if(!Zs(_,{name:p,category:g,description:m,promptTemplate:s?.promptTemplate||"",extractTags:Array.isArray(s?.extractTags)?s.extractTags:[],config:{execution:{timeout:h,retries:x},api:s?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(s?.config?.messages)?s.config.messages:[],context:{depth:s?.config?.context?.depth||3,includeTags:Array.isArray(s?.config?.context?.includeTags)?s.config.context.includeTags:[],excludeTags:Array.isArray(s?.config?.context?.excludeTags)?s.config.context.excludeTags:[]},worldbooks:{enabled:s?.config?.worldbooks?.enabled===!0,selected:Array.isArray(s?.config?.worldbooks?.selected)?s.config.worldbooks.selected:[]}},enabled:s?.enabled!==!1})){Pt.error(o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25",null,{toast:!0});return}no(_),y(),this.renderTo(t),Pt.info(o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA",null,{toast:"success"}),o||this._openToolConfig(_)})},destroy(t){!te()||!ve(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
      /* \u5DE5\u5177\u7BA1\u7406\u9762\u677F\u6837\u5F0F */
      .yyt-tool-manager {
        display: flex;
        flex-direction: column;
        gap: 0;
        min-height: 100%;
      }

      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 0;
        min-height: 0;
        overflow-y: auto;
      }

      .yyt-tool-item-disabled {
        opacity: 0.6;
        filter: saturate(0.8);
      }

      @media screen and (max-width: 768px) {
        .yyt-list-row {
          flex-wrap: wrap;
        }
        .yyt-list-row-actions {
          width: 100%;
          justify-content: flex-end;
        }
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Hw=uf});var gf={};ie(gf,{BypassManager:()=>Fa,DEFAULT_BYPASS_PRESETS:()=>Ar,addMessage:()=>av,buildBypassMessages:()=>uv,bypassManager:()=>pe,createPreset:()=>Zw,default:()=>pv,deleteMessage:()=>lv,deletePreset:()=>tv,duplicatePreset:()=>rv,exportPresets:()=>cv,getAllPresets:()=>Xw,getDefaultPresetId:()=>sv,getEnabledMessages:()=>nv,getPreset:()=>Qw,getPresetList:()=>wn,importPresets:()=>dv,setDefaultPresetId:()=>ov,updateMessage:()=>iv,updatePreset:()=>ev});function ff(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function Yw(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function Vw(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function Jw(t,e,r){let s=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:ff(t.role),content:Vw(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...s?{mainSlot:s,isMain:s==="A",isMain2:s==="B"}:{}}}var Ua,Er,To,xc,Gw,Ar,qw,Fa,pe,Xw,wn,Qw,Zw,ev,tv,rv,sv,ov,nv,av,iv,lv,cv,dv,uv,pv,_o=P(()=>{Fe();Qe();H();Ua=C.createScope("BypassManager"),Er="bypass_presets",To="default_bypass_preset",xc="current_bypass_preset",Gw=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
<\u80CC\u666F\u8BBE\u5B9A>
{{characterCard}}
{{toolWorldbookContent}}
</\u80CC\u666F\u8BBE\u5B9A>

<\u6B63\u6587\u6570\u636E>
{{rawRecentMessagesText}}
</\u6B63\u6587\u6570\u636E>

`,enabled:!0,deletable:!0},{id:"table_fill_default_msg_4",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u6309\u7167\u8981\u6C42\u8BA4\u771F\u9605\u8BFB\u80CC\u666F\u8BBE\u5B9A\uFF0C\u5E76\u5C06\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\u8FD0\u7528\u5230\u540E\u7EED\u601D\u8003\u5F53\u4E2D\u3002",enabled:!0,deletable:!0},{id:"table_fill_default_msg_5",role:"USER",content:`\u4F60\u662F\u3010\u586B\u8868AI\u3011\uFF0C\u8D1F\u8D23\u6839\u636E\u7528\u6237\u63D0\u4F9B\u7684\u8D44\u6599\u5BF9\u8868\u683C\u6570\u636E\u6267\u884C\u589E\u5220\u6539\u64CD\u4F5C\u3002

## \u6838\u5FC3\u4EFB\u52A1
\u4F9D\u636E\u4E09\u7C7B\u8D44\u6599\u6765\u6E90\u6267\u884C\u8868\u683C\u7F16\u8F91\uFF1A
- <\u80CC\u666F\u8BBE\u5B9A>\uFF1A\u6545\u4E8B\u53CA\u4EBA\u7269\u8BBE\u5B9A
- <\u6B63\u6587\u6570\u636E>\uFF1A\u4E0A\u8F6E\u53D1\u751F\u7684\u6545\u4E8B
- <\u5F53\u524D\u8868\u683C\u6570\u636E>\uFF1A\u4E4B\u524D\u7684\u6570\u636E\u4F5C\u4E3A\u586B\u8868\u57FA\u7840

## \u8F93\u51FA\u683C\u5F0F\uFF08\u4E25\u683C\u6267\u884C\uFF09
\u53EA\u8FD4\u56DE JSON\uFF0C\u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown\u3002JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}

## \u5173\u952E\u89C4\u5219
1. \u5FC5\u987B\u9010\u8868\u9605\u8BFB\u6BCF\u4E2A\u8868\u683C\u7684 note \u90E8\u5206\uFF0C\u4E25\u683C\u9075\u5B88\u5176\u4E2D\u7684\u7EA6\u675F\u3002
2. note \u7684\u7EA6\u675F\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u9AD8\u4E8E\u901A\u7528\u586B\u8868\u7ECF\u9A8C\u3002
3. \u82E5 note \u8981\u6C42\u7981\u6B62\u4FEE\u6539\u3001\u683C\u5F0F\u56FA\u5B9A\u6216\u7F16\u7801\u89C4\u5219\uFF0C\u5FC5\u987B\u4E25\u683C\u6267\u884C\u3002
4. \u9664\u4E86 note \u5916\uFF0C\u53EF\u80FD\u8FD8\u5B58\u5728\u67D0\u4E9B\u5B58\u653E\u7279\u6B8A\u586B\u8868\u89C4\u5219\u7684\u8868\u683C\uFF0C\u586B\u8868\u524D\u9700\u5148\u8FDB\u884C\u9605\u8BFB\uFF0C\u5E76\u4E25\u683C\u9075\u5B88\u5176\u4E2D\u7684\u7EA6\u675F\u3002
5. \u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002

\u73B0\u5728\u5F00\u59CB\u6309\u6B64\u683C\u5F0F\u6267\u884C\u586B\u8868\u4EFB\u52A1\u3002`,enabled:!0,deletable:!1,mainSlot:"A",isMain:!0},{id:"table_fill_default_msg_6",role:"assistant",content:"\u6536\u5230\u547D\u4EE4\uFF0C\u6211\u5C06\u4E25\u683C\u6309\u7167\u7528\u6237\u8981\u6C42\u6267\u884C\u586B\u8868\u4EFB\u52A1\uFF0C\u5E76\u4EC5\u8F93\u51FA\u7B26\u5408\u683C\u5F0F\u7EA6\u675F\u7684\u5185\u5BB9\u3002",enabled:!0,deletable:!0},{id:"table_fill_default_msg_7",role:"USER",content:`\u73B0\u5728\u8BF7\u6309\u7167\u6211\u7684\u8981\u6C42\u7ACB\u523B\u5F00\u59CB\u4F60\u7684\u5DE5\u4F5C
========================

\u4EE5\u4E0B\u662F\u5F53\u524D\u7684<\u5F53\u524D\u8868\u683C\u6570\u636E>\uFF0C\u8BB0\u5F55\u6709\u672C\u8F6E\u4E4B\u524D\u7684\u6570\u636E\uFF0C\u4F60\u7684\u4E00\u5207\u64CD\u4F5C\u6307\u4EE4\u90FD\u5FC5\u987B\u5728\u8FD9\u4E2A<\u5F53\u524D\u8868\u683C\u6570\u636E>\u7684\u57FA\u7840\u4E0E\u6307\u5BFC\u4E0A\u8FDB\u884C\uFF1A
<\u5F53\u524D\u8868\u683C\u6570\u636E>
{{toolContentMacro}}
</\u5F53\u524D\u8868\u683C\u6570\u636E>

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),Ar={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:Gw.map(t=>({...t})),createdAt:0,updatedAt:0}},qw=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);Fa=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=$.get(Er,{});return this._cache={...Ar,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,s)=>(s.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:s,description:o,messages:n}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:s.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),W.emit(U.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),Ua.info(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...s,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,o),W.emit(U.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),Ua.info(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Ar[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=$.get(Er,{});return delete s[e],$.set(Er,s),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),W.emit(U.BYPASS_PRESET_DELETED,{presetId:e}),Ua.info(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:r.trim(),name:s||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),n),W.emit(U.BYPASS_PRESET_CREATED,{presetId:r,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:ff(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},n=[...s.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],a=n.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...n];return i[a]={...i[a],...s},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=s.messages||[],n=o.find(i=>i.id===r);if(!n)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=o.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(s=>s.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=$.get(To,null);return e==="undefined"||e==="null"||e===""?($.remove(To),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:($.set(To,e),W.emit(U.BYPASS_PRESET_ACTIVATED,{presetId:e}),Ua.info(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let s=this.getPreset(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:s=!1,name:o=""}=r,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=$.get(Er,{}),l=Array.isArray(n)&&n.every(Yw)?[{id:this._generatePresetId(o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:n}]:Array.isArray(n)?n:n.presets?n.presets:[n];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let d=0;for(let c of l){let u=this._normalizePreset(c?.id,c,a);u&&(Ar[u.id]&&!s||!s&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},d++))}return d>0&&($.set(Er,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${d} \u4E2A\u9884\u8BBE`,imported:d}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let s=$.get(Er,{});s[e]=r,$.set(Er,s),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=$.get(Er,{}),r={},s=!1,o=Array.isArray(e)?e.map((n,a)=>[n?.id||n?.name||`legacy_${a}`,n]):Object.entries(e||{});for(let[n,a]of o){let i=this._normalizePreset(n,a,r);if(!i){s=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(s=!0)}s&&$.set(Er,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,s={}){if(!r||typeof r!="object")return null;let o=typeof r.name=="string"?r.name.trim():"",n=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),this._isLegacySamplePreset(o,n)||(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,s)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(d=>d&&typeof d=="object").map((d,c)=>Jw(d,c,n)):[];return{...r,id:n,name:o,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=$.get(To,null),s=$.get(xc,null),o=r??s;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(a=>a.name===o)?.id||null),o?$.set(To,o):$.remove(To),$.has(xc)&&$.remove(xc)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||qw.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let s=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=s,n=1;for(;r[o];)o=`${s}_${n++}`;return o}},pe=new Fa,Xw=()=>pe.getAllPresets(),wn=()=>pe.getPresetList(),Qw=t=>pe.getPreset(t),Zw=t=>pe.createPreset(t),ev=(t,e)=>pe.updatePreset(t,e),tv=t=>pe.deletePreset(t),rv=(t,e,r)=>pe.duplicatePreset(t,e,r),sv=()=>pe.getDefaultPresetId(),ov=t=>pe.setDefaultPresetId(t),nv=t=>pe.getEnabledMessages(t),av=(t,e)=>pe.addMessage(t,e),iv=(t,e,r)=>pe.updateMessage(t,e,r),lv=(t,e)=>pe.deleteMessage(t,e),cv=t=>pe.exportPresets(t),dv=(t,e)=>pe.importPresets(t,e),uv=t=>pe.buildBypassMessages(t),pv=pe});var mf={};ie(mf,{DEFAULT_SETTINGS:()=>vn,SettingsService:()=>Wa,default:()=>yv,settingsService:()=>Ft});var vn,ja,Wa,Ft,yv,Sn=P(()=>{Fe();Qe();vn={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},ja="settings_v2",Wa=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=$.get(ja,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&$.set(ja,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),$.set(ja,this._cache),W.emit(U.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),s=this._deepMerge(r,e);this.saveSettings(s)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(vn)),$.set(ja,this._cache),W.emit(U.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let s=this.getSettings(),o=e.split("."),n=s;for(let a of o)if(n&&typeof n=="object"&&a in n)n=n[a];else return r;return n}set(e,r){let s=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=s;for(let a=0;a<o.length-1;a+=1){let i=o[a];i in n||(n[i]={}),n=n[i]}n[o[o.length-1]]=r,this.saveSettings(s)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,s=JSON.parse(JSON.stringify(e));return s.automation&&Object.prototype.hasOwnProperty.call(s.automation,"enabled")&&(delete s.automation.enabled,r=!0),{settings:s,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(vn)),e)}_deepMerge(e,r){let s={...e};for(let o in r)r[o]&&typeof r[o]=="object"&&!Array.isArray(r[o])?s[o]=this._deepMerge(e[o]||{},r[o]):s[o]=r[o];return s}},Ft=new Wa,yv=Ft});var bf={};ie(bf,{ContextInjector:()=>qa,DEFAULT_INJECTION_OPTIONS:()=>hf,WRITEBACK_METHODS:()=>Vt,WRITEBACK_RESULT_STATUS:()=>Ga,contextInjector:()=>Nt,default:()=>mv});function wc(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Ns(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function Ha(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var ut,_t,Eo,hf,Ga,Vt,fv,gv,qa,Nt,mv,Ds=P(()=>{Qe();H();pa();ut=C.createScope("ContextInjector"),_t="YouYouToolkit_toolOutputs",Eo="YouYouToolkit_injectedContext",hf={overwrite:!0,enabled:!0};Ga={SUCCESS:"success",FAILED:"failed"},Vt={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},fv=60,gv=3;qa=class{constructor(){this.debugMode=!1}async inject(e,r,s={}){return(await this.injectDetailed(e,r,s)).success}async injectDetailed(e,r,s={}){let o={...hf,...s},n=this._createWritebackResult(e,o);if(!e||r===void 0||r===null)return ut.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!wc(o.sourceMessageId))return ut.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;if(o?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}let a=n.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};W.emit(U.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,n);return l.success&&ut.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),s=this._findAssistantMessageIndex(r,e);if(s<0)return"";let o=r[s]||{},n=o[Eo];if(typeof n=="string"&&n.trim())return n.trim();let a=o[_t];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return ut.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let o=(e[r]||{})[_t];return o&&typeof o=="object"?o:{}}catch(e){return ut.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,null);return o<0?null:s[o]?.[_t]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:s,context:o,chat:n}=this._getChatRuntime(),a=this._findAssistantMessageIndex(n,null);if(a<0)return!1;let i=n[a],l=i?.[_t];if(!l||!l[r])return!1;delete l[r],i[_t]=l,i[Eo]=this._buildMessageInjectedContext(l);let d=o?.saveChat||s?.saveChat||null;return typeof d=="function"&&await d.call(o||s),W.emit(U.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(s){return ut.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}async clearAllContext(e){try{let{api:r,context:s,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let a=o[n];delete a[_t],delete a[Eo];let i=s?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(s||r),W.emit(U.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return ut.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){ut.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),s=Object.entries(r).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:s,totalCount:s.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,s=r?.getContext?.()||null,o=Array.isArray(s?.chat)?s.chat:[],n=Array.isArray(r?.chat)?r.chat:[],a=o.length?o:n;return{topWindow:e,api:r,context:s,chat:a,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let s=Vt.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Vt.NONE,commit:{preferredMethod:s,attemptedMethods:[],appliedMethod:Vt.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:Ga.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,s,o,n,a=null){let i=e?.contextChat?.[s]||e?.apiChat?.[s]||r?.[s]||a||null,l=this._getWritableMessageField(i).text||"",d=i?.[_t]?.[o],c=n?l.includes(n):!0,u=!!(d&&String(d.content||"").trim()===n);return{latestMessage:i,latestText:l,textIncludesContent:c,mirrorStored:u}}async _confirmRefresh(e,r,s,o,n,a=null){let i=1,l=this._collectWritebackVerification(e,r,s,o,n,a);for(let d=0;d<gv;d+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(fv),i+=1,l=this._collectWritebackVerification(e,r,s,o,n,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,s,o={},n=null){let a=n||this._createWritebackResult("",o),{api:i,context:l}=e||{},d=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),c=d?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||d?.setChatMessages||null;a.commit.preferredMethod=typeof c=="function"?Vt.SET_CHAT_MESSAGES:Vt.LOCAL_ONLY;let u=!1,y=Ha(o);if(y)return a.error=y,a;if(typeof c=="function"){Ns(a.commit.attemptedMethods,Vt.SET_CHAT_MESSAGES);try{let p=Ha(o);if(p)return a.error=p,a;let g=wc(o.sourceMessageId)||r;await c([{message_id:g,message:s}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=Vt.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=Vt.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(p){ut.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:p}),a.errors.push(`setChatMessages: ${p?.message||String(p)}`)}}return u&&(a.refreshRequested=!0,Ns(a.refresh.requestMethods,a.hostUpdateMethod)),u||(Ns(a.commit.attemptedMethods,Vt.LOCAL_ONLY),a.commit.appliedMethod=Vt.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let s=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return s?.[1]?s[1]:"plain_text"}_stripExactStoredBlock(e,r,s=""){let o=String(e||""),n=String(r||"").trim(),a=String(s||"").trim();return n?o.includes(n)?a?{text:o.replace(n,a).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,s){let{contextChat:o,apiChat:n}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==s&&(i[r]={...i[r]||{},...s})};a(o),a(n)}_notifyMessageUpdated(e,r,s={}){if(s.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let o=wt.describe(),n=e?.topWindow||da();return o.hasBridge?(wt.emit(je.MESSAGE_UPDATED,r),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{wt.emit(je.MESSAGE_UPDATED,r)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{wt.emit(je.MESSAGE_UPDATED,r)},30),{emitted:!0,source:o.source||"unavailable",eventName:je.MESSAGE_UPDATED}):{emitted:!1,source:o.source||"unavailable",eventName:je.MESSAGE_UPDATED}}catch(o){return ut.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:o}),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let s=Array.isArray(e)?e:[];if(!s.length)return-1;let o=r!=null&&r!=="",n=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(c=>c==null?"":String(c).trim()).includes(l):!1};for(let a=s.length-1;a>=0;a-=1)if(n(s[a],a))return a;if(o)return-1;for(let a=s.length-1;a>=0;a-=1)if(this._isAssistantMessage(s[a]))return a;return-1}_buildMessageInjectedContext(e){let s=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,a])=>(n?.updatedAt||0)-(a?.updatedAt||0));if(!s.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,a]of s)o.push(`[${n}]`),o.push(a?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let s of r)if(typeof e?.[s]=="string")return{key:s,text:e[s]};return{key:"mes",text:""}}_applyMessageText(e,r,s={}){let o=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],a=!1;if(n.forEach(i=>{typeof o[i]=="string"&&(o[i]=r,a=!0)}),a||(o.mes=r,o.message=r),Array.isArray(o.swipes)){let i=Number.parseInt(wc(s?.sourceSwipeId||s?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=r,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,r=[]){let s=String(e||"");return(Array.isArray(r)?r:[]).forEach(n=>{let a=String(n||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let c=new RegExp(a.slice(6).trim(),"gis");s=s.replace(c,"")}catch(c){ut.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:c})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),d=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");s=s.replace(l,""),s=s.replace(d,"")}),s.trimEnd()}_stripPreviousStoredToolContent(e,r){let s=String(e||""),o=String(r||"").trim();return o?s.replace(o,"").trimEnd():s.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,s={},o=null){let n=o||this._createWritebackResult(e,s);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return ut.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let d=this._findAssistantMessageIndex(l,s.sourceMessageId);if(d<0)return ut.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;if(s?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}n.messageIndex=d,n.steps.foundTargetMessage=!0;let c=l[d],{key:u,text:y}=this._getWritableMessageField(c);n.textField=u;let p=c[_t]&&typeof c[_t]=="object"?c[_t]:{},g=p?.[e]||{},m=g?.content||"",h=g?.blockText||m||"",x=Object.entries(p).filter(([Xe])=>Xe!==e).map(([,Xe])=>Xe||{}),_=String(r.content||"").trim(),w=s.replaceFullMessage===!0,B=w?"full_message":this._inferBlockType(_),A={toolId:e,messageId:s.sourceMessageId||c?.message_id||c?.messageId||d,blockType:B,insertedAt:r.updatedAt,replaceable:s.overwrite!==!1};n.blockIdentity=A;let T=s.overwrite===!1||w?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,h,_),E=T.text,L="";!w&&s.overwrite!==!1&&h&&!T.removed&&(L="previous_block_not_found");let O=s.overwrite===!1||T.replaced||w?E:this._stripExistingToolOutput(E,s.extractionSelectors),k=O!==E;E=O;let v=s.overwrite===!1||T.replaced||w?E:this._stripPreviousStoredToolContent(E,m),z=v!==E;E=v,n.replacedExistingBlock=w||T.removed||k||z;let j=s.overwrite===!1?String(y||""):E,q=w?_:T.replaced?E.trim():[j.trimEnd(),_].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!_;let ye=x.every(Xe=>{if(Xe?.blockType==="full_message")return!0;let mr=String(Xe?.blockText||Xe?.content||"").trim();return mr?q.includes(mr):!0});n.preservedOtherToolBlocks=ye,ye?L&&(n.conflictDetected=!0,n.conflictReason=L):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let se={...p,[e]:{toolId:e,content:_,blockText:_,blockType:B,blockIdentity:A,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},oe=Ha(s);if(oe)return n.error=oe,n;c[u]=q,this._applyMessageText(c,q,s),c[_t]=se,c[Eo]=this._buildMessageInjectedContext(se),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,d,c),n.steps.runtimeSynced=!0;let Te=Ha(s);if(Te)return n.error=Te,n;await this._requestAssistantMessageRefresh(a,d,q,s,n);let Ue=i?.saveChat||a?.api?.saveChat||null,Y=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof Y=="function"&&(Y.call(i||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,Ns(n.refresh.requestMethods,"saveChatDebounced")),typeof Ue=="function"&&(await Ue.call(i||api),n.steps.saveChat=!0,n.refreshRequested=!0,Ns(n.refresh.requestMethods,"saveChat"));let fe=this._notifyMessageUpdated(a,d,s);n.steps.notifiedMessageUpdated=fe?.emitted===!0,n.refresh.eventSource=fe?.source||"",n.refresh.eventName=fe?.eventName||"",fe?.error&&n.errors.push(`MESSAGE_UPDATED: ${fe.error}`);let we=String(r.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,Ns(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,Ns(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let Ot=await this._confirmRefresh(a,l,d,e,we,c);return n.verification.textIncludesContent=Ot.textIncludesContent,n.verification.mirrorStored=Ot.mirrorStored,n.verification.refreshConfirmed=Ot.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(Ot.confirmChecks)||0,n.refresh.confirmedBy=Ot.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?Ga.SUCCESS:Ga.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),ut.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),n}catch(a){return ut.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),n.error=a?.message||String(a),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:s}=r,o=this._findAssistantMessageIndex(s,e);if(o<0)return null;let n=s[o]||null,a=this._getWritableMessageField(n).text||"",i=n?.[_t]&&typeof n[_t]=="object"?n[_t]:{},l=Object.values(i).reduce((d,c)=>{let u=String(c?.blockText||c?.content||"").trim();return!u||!d.includes(u)?d:d.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:o,message:n,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof n?.[Eo]=="string"?n[Eo]:this._buildMessageInjectedContext(i)}}catch(r){return ut.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),o=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}},Nt=new qa,mv=Nt});var wf={};ie(wf,{BUILTIN_VARIABLES:()=>xf,VariableResolver:()=>Ya,default:()=>hv,variableResolver:()=>jt});var Tn,xf,Ya,jt,hv,Va=P(()=>{Qe();H();Tn=C.createScope("VariableResolver"),xf={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Ya=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let s=e;return s=this._resolveBuiltinVariables(s,r),s=this._resolveCustomVariables(s,r),s=this._resolveRegexVariables(s,r),s}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,r));let s={};for(let[o,n]of Object.entries(e))typeof n=="string"?s[o]=this.resolveTemplate(n,r):typeof n=="object"&&n!==null?s[o]=this.resolveObject(n,r):s[o]=n;return s}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),Tn.info(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),Tn.info(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),Tn.info(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(xf))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,s]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof s=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},s={};for(let o of this.getAvailableVariables())s[o.category]||(s[o.category]=[]),s[o.category].push(o);for(let[o,n]of Object.entries(r))if(s[o]&&s[o].length>0){e.push(`\u3010${n}\u3011`);for(let a of s[o])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let s=e;return s=s.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),s=s.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),s=s.replace(/\{\{chatHistory\}\}/gi,()=>{let o=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(o)}),s=s.replace(/\{\{characterCard\}\}/gi,()=>{let o=r.characterCard||r.raw?.characterCard;return o?this._formatCharacterCard(o):""}),s=s.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),s=s.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),s=s.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),s=s.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),s=s.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),s=s.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),s=s.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),s=s.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),s=s.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),s=s.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),s=s.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),s}_resolveCustomVariables(e,r){let s=e;for(let[o,n]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?s=s.replace(a,()=>{try{return n(r)}catch(i){return Tn.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):s=s.replace(a,String(n))}return s}_resolveRegexVariables(e,r){let s=e;for(let[o,n]of this.variableHandlers){let a=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");s=s.replace(a,(i,l)=>{try{return n(l,r)}catch(d){return Tn.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,d),""}})}return s}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let s=r.role||"unknown",o=r.content||r.mes||"";return`[${s}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}},jt=new Ya,hv=jt});var Tf={};ie(Tf,{DEFAULT_PROMPT_TEMPLATE:()=>Sf,ToolPromptService:()=>Ja,default:()=>bv,toolPromptService:()=>Ls});var vf,Sf,Ja,Ls,bv,Xa=P(()=>{Qe();_o();Va();ca();H();vf=C.createScope("ToolPromptService"),Sf="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Ja=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let s=this._getPromptTemplate(e),o=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await la(e)).trim(),n=jt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:o}),a=jt.resolveTemplate(s,n).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return jt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,r){if(!e)return vf.error("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let s=[],o=await this._buildVariableContext(e,r),n=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&s.push({role:this._normalizeRole(l.role),content:jt.resolveTemplate(l.content||"",o)});if(!i&&n.length>0)for(let l of n){let d=jt.resolveTemplate(l?.content||"",o).trim();d&&s.push({role:this._normalizeRole(l?.role),content:d})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),o);l&&s.push({role:"user",content:l})}return vf.debug(`\u6784\u5EFA\u6D88\u606F: ${s.length} \u6761`),s}async buildPromptText(e,r){let s=await this._buildVariableContext(e,r),o=Array.isArray(e?.promptMessages)?e.promptMessages:[];return o.length>0?o.map(n=>jt.resolveTemplate(n?.content||"",s).trim()).filter(Boolean).join(`

`):s.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Sf}_getBypassMessages(e){return e.bypass?.enabled?pe.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":jt.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}setDebugMode(e){this.debugMode=e}},Ls=new Ja,bv=Ls});var Ef={};ie(Ef,{LEGACY_OUTPUT_MODES:()=>xv,OUTPUT_MODES:()=>Dt,TOOL_FAILURE_STAGES:()=>Ve,TOOL_RUNTIME_STATUS:()=>wv,TOOL_WRITEBACK_STATUS:()=>Ke,ToolOutputService:()=>Qa,default:()=>vv,toolOutputService:()=>Lt});function _f(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function Ao(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var es,Dt,xv,wv,Ve,Ke,Qa,Lt,vv,_n=P(()=>{Qe();Sn();H();Ds();Xa();Qs();jr();Vn();es=C.createScope("ToolOutputService"),Dt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},xv={inline:"follow_ai"},wv={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Ve={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},Ke={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Qa=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Dt.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Dt.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===Dt.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),d=e?.extraction?.writebackTag?.trim(),c=d?[d]:l,u=e.output?.apiPreset||e.apiPreset||"",y="",p=Ke.NOT_APPLICABLE,g=null,m=[],h="";es.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),W.emit(U.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Dt.POST_RESPONSE_API});try{if(y=Ve.BUILD_MESSAGES,m=await this._buildToolMessages(e,r),!m||m.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");es.debug(`\u6784\u5EFA\u4E86 ${m.length} \u6761\u6D88\u606F`);let x=_f(r);if(x){let T=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:T,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:p,failureStage:y,writebackDetails:g,aborted:x.aborted===!0,stale:x.stale===!0,abortReason:x.reason||"",phases:Ao(m,h,g)}}}let _=await this._getRequestTimeout();y=Ve.SEND_API_REQUEST;let w=await this._sendApiRequest(u,m,{timeoutMs:_,signal:r.signal});y=Ve.EXTRACT_OUTPUT,h=this._extractOutputContent(w,e);let B=_f(r);if(B){let T=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:T,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:p,failureStage:y,writebackDetails:g,aborted:B.aborted===!0,stale:B.stale===!0,abortReason:B.reason||"",phases:Ao(m,h,g)}}}if(h){if(y=Ve.INJECT_CONTEXT,g=await Nt.injectDetailed(o,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:c,traceId:n,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!g?.success)throw p=Ke.FAILED,new Error(g?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Ke.SUCCESS}else p=Ke.SKIPPED_EMPTY_OUTPUT;y="";let A=Date.now()-s;return W.emit(U.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:A,mode:Dt.POST_RESPONSE_API}),es.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${A}ms`),{success:!0,toolId:o,output:h,duration:A,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:l,apiPreset:u,writebackStatus:p,failureStage:"",writebackDetails:g,phases:Ao(m,h,g)}}}catch(x){let _=Date.now()-s,w=y||Ve.UNKNOWN,B=p||Ke.NOT_APPLICABLE;return es.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,{error:x}),W.emit(U.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:x.message||String(x),duration:_}),{success:!1,toolId:o,error:x.message||String(x),duration:_,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:l,apiPreset:u,writebackStatus:B,failureStage:w,writebackDetails:g,phases:Ao(m,h,g)}}}}async runToolFollowAiManual(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",d=this._getExtractionSelectors(e),c=e?.extraction?.writebackTag?.trim(),u=c?[c]:d,y="",p=Ke.NOT_APPLICABLE,g=null,m=[],h="";W.emit(U.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Dt.FOLLOW_AI});try{if(y=Ve.BUILD_MESSAGES,m=await this._buildToolMessages(e,r),!m||m.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let x=await this._getRequestTimeout();y=Ve.SEND_API_REQUEST;let _=await this._sendApiRequest(l,m,{timeoutMs:x,signal:r.signal});if(y=Ve.EXTRACT_OUTPUT,h=this._extractOutputContent(_,e),h){if(y=Ve.INJECT_CONTEXT,g=await Nt.injectDetailed(o,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:u,traceId:n,sessionKey:a}),!g?.success)throw p=Ke.FAILED,new Error(g?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Ke.SUCCESS}else p=Ke.SKIPPED_EMPTY_OUTPUT;y="";let w=Date.now()-s;return W.emit(U.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:w,mode:Dt.FOLLOW_AI}),{success:!0,toolId:o,output:h,duration:w,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:d,apiPreset:l,writebackStatus:p,failureStage:"",writebackDetails:g,phases:Ao(m,h,g)}}}catch(x){let _=Date.now()-s,w=y||Ve.UNKNOWN,B=p||Ke.NOT_APPLICABLE;return W.emit(U.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:x.message||String(x),duration:_,mode:Dt.FOLLOW_AI}),{success:!1,toolId:o,error:x.message||String(x),duration:_,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:d,apiPreset:l,writebackStatus:B,failureStage:w,writebackDetails:g,phases:Ao(m,h,g)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i=(Array.isArray(s)?s:[]).map(d=>String(d?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(s)&&s.length>0?s[s.length-1]:null;return{sourceText:o,filteredSourceText:n,extractedText:a,extractedRawText:i,messageEntries:s,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:a,toolContentMacro:this._buildToolContentMacro(s),toolName:e.name,toolId:e.id};return Ls.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,s={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=s,a=null;if(e){if(!Wo(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=jo(e)}else a=jo();let i=Yn(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:o,apiConfig:a},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ft.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let s=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(r);if(!o.length)return s.trim();let n=[];for(let a of o){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let d=i.slice(6).trim();if(!d)continue;try{let c=new RegExp(d,"gi");[...s.matchAll(c)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&n.push(p)})}catch(c){es.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let d=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(s.match(d)||[]).forEach(u=>{let y=String(u||"").trim();y&&n.push(y)})}catch(d){es.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}}return n.length>0?n.join(`

`).trim():s.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let s=vr(r);if(!s)return{rules:[],blacklist:[]};let o=Array.isArray(s.rules)?s.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],n=Array.isArray(s.blacklist)?s.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:o,blacklist:n}}catch(s){return es.warn("_resolveExtractionContext \u5F02\u5E38",{error:s}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),s=[];for(let o of r){let n=String(o.value||"").trim();n&&(o.type==="include"?s.push(n):o.type==="regex_include"&&s.push(`regex:${n}`))}return s}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,s={}){let o=typeof e=="string"?e:String(e||""),{rules:n,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=s;if(!n.length)return o.trim();let l=xr(o,n,a||[]);return i?(l||"").trim():l||o.trim()}_extractToolContent(e,r){let s=typeof r=="string"?r:String(r||""),{rules:o}=this._resolveExtractionContext(e);return o.length?this._applyExtractionSelectorsInternal(s,e,{strict:!0}):s.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let s=Js()||[],o=Xs()||[];return!Array.isArray(s)||s.length===0?r.trim():xr(r,s,o)||r.trim()}catch(s){return es.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:s}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let s of r)if(typeof s=="string"&&s.trim())return s.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(s=>s.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let s=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(r?.chatMessages)?r.chatMessages:[],n=[];for(let i=o.length-1;i>=0&&n.length<s;i-=1){let l=o[i],d=String(l?.role||"").toLowerCase(),c=d==="assistant"||d==="ai"||!l?.is_user&&!l?.is_system&&!d,u=this._getMessageText(l);c&&u&&n.unshift({text:u,message:l,chatIndex:i})}if(n.length>0)return n;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((o,n)=>{let a=o.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...o,order:n+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,s={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=s;return o.map(i=>{let l=String(i?.[r]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},Lt=new Qa,vv=Lt});function Cf(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,s])=>(e[r]=s===!0,e),{})}function _v(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",s=Cf(e?.options);return Sv.reduce((o,n)=>s[n.key]!==!0?o:r==="unescape"?o.replace(n.escaped,n.unescaped):o.replace(n.plain,n.replacement),String(t||""))}function Ev(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let s=Cf(e?.options);return Tv.reduce((o,n)=>s[n.key]!==!0?o:o.replace(n.from,n.to),String(t||""))}function Av(t,e){let r=t?.processor||{},s=r?.type||"",o=String(e||"");switch(s){case Af.ESCAPE_TRANSFORM:return _v(o,r);case Af.PUNCTUATION_TRANSFORM:return Ev(o,r);default:return o}}function Cv(t,e,r){let s=String(t||""),o=String(e||"").trim(),n=String(r||"").trim();return!s.trim()||!o?{nextMessageText:"",replaced:!1}:s.includes(o)?{nextMessageText:s.replace(o,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function Za(t,e={}){let r=Lt.getExtractionSnapshot(t,e),s=r?.primaryEntry||null,o=String(s?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(s?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Ke.NOT_APPLICABLE,failureStage:Ve.EXTRACT_OUTPUT,extraction:r}};let d=String(Av(t,n)||"").trim(),c=Cv(o,n,d),u=c.replaced?c.nextMessageText:d,y=null,p=Ke.NOT_APPLICABLE;if(u){if(y=await Nt.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:c.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Ke.FAILED,failureStage:Ve.INJECT_CONTEXT,writebackDetails:y,extraction:r}};p=Ke.SUCCESS}else p=Ke.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:d,writebackState:u?{committed:y?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:r}}}var Sv,Tv,Af,vc=P(()=>{_n();Ds();Sv=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],Tv=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Af={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var _c={};ie(_c,{abortAllTasks:()=>Pv,abortTask:()=>Mv,buildToolMessages:()=>Rf,clearExecutionHistory:()=>$v,createExecutionContext:()=>Uv,createResult:()=>ei,enhanceMessagesWithBypass:()=>Fv,executeBatch:()=>Rv,executeTool:()=>If,executeToolWithConfig:()=>Mf,executeToolsBatch:()=>Hv,executorState:()=>$e,extractFailed:()=>Kv,extractSuccessful:()=>zv,generateTaskId:()=>Os,getExecutionHistory:()=>Ov,getExecutorStatus:()=>Lv,getScheduler:()=>Co,mergeResults:()=>Bv,pauseExecutor:()=>Nv,resumeExecutor:()=>Dv,setMaxConcurrent:()=>Iv});function ei(t,e,r,s,o,n,a=0){return{success:r,taskId:t,toolId:e,data:s,error:o,duration:n,retries:a,timestamp:Date.now(),metadata:{}}}function Os(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function kv(t,e={}){return{id:Os(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Co(){return En||(En=new Sc($e.maxConcurrent)),En}function Iv(t){$e.maxConcurrent=Math.max(1,Math.min(10,t)),En&&(En.maxConcurrent=$e.maxConcurrent)}async function If(t,e={},r){let s=Co(),o=kv(t,e);for(;$e.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await s.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return kf(n),n}catch(n){Tc.error(`executeTool \u5F02\u5E38 (toolId=${t})`,{error:n});let a=ei(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return kf(a),a}}async function Rv(t,e={}){let{failFast:r=!1,concurrency:s=$e.maxConcurrent}=e,o=[],n=Co(),a=n.maxConcurrent;n.maxConcurrent=s;try{let i=t.map(({toolId:l,options:d,executor:c})=>If(l,d,c));if(r)for(let l of i){let d=await l;if(o.push(d),!d.success){n.abortAll();break}}else{let l=await Promise.allSettled(i);for(let d of l)d.status==="fulfilled"?o.push(d.value):o.push(ei(Os(),"unknown",!1,null,d.reason,0,0))}}finally{n.maxConcurrent=a}return o}function Mv(t){return Co().abort(t)}function Pv(){Co().abortAll(),$e.executionQueue=[]}function Nv(){$e.isPaused=!0}function Dv(){$e.isPaused=!1}function Lv(){return{...Co().getStatus(),isPaused:$e.isPaused,activeControllers:$e.activeControllers.size,historyCount:$e.executionHistory.length}}function kf(t){$e.executionHistory.push(t),$e.executionHistory.length>100&&$e.executionHistory.shift()}function Ov(t={}){let e=[...$e.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function $v(){$e.executionHistory=[]}function Bv(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function zv(t){return t.filter(e=>e.success).map(e=>e.data)}function Kv(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Uv(t={}){return{taskId:Os(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function Fv(t,e){return!e||e.length===0?t:[...e,...t]}function jv(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Rf(t,e){let r=[],s=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,a]of Object.entries(o))s=s.replace(new RegExp(jv(n),"g"),a);return r.push({role:"USER",content:s}),r}async function Mf(t,e,r={}){let s=ce(t);if(!s)return{success:!1,taskId:Os(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!s.enabled)return{success:!1,taskId:Os(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=Os();try{W.emit(U.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let a=Rf(s,e);if(typeof r.callApi=="function"){let i=s.output?.apiPreset||s.apiPreset||"",l=i?{preset:i}:null,d=await r.callApi(a,l,r.signal),c=d;s.outputMode==="separate"&&s.extractTags?.length>0&&(c=Wv(d,s.extractTags));let u={success:!0,taskId:n,toolId:t,data:c,duration:Date.now()-o};return W.emit(U.TOOL_EXECUTED,{toolId:t,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:t,data:{messages:a,config:{apiPreset:s.output?.apiPreset||s.apiPreset||"",outputMode:s.outputMode,extractTags:s.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(a){Tc.error(`executeToolWithConfig \u5F02\u5E38 (toolId=${t})`,{error:a});let i={success:!1,taskId:n,toolId:t,error:a.message||String(a),duration:Date.now()-o};return W.emit(U.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:a}),i}}function Wv(t,e){let r={};for(let s of e){let o=new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"gi"),n=t.match(o);n&&(r[s]=n.map(a=>{let i=a.match(new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"i"));return i?i[1].trim():""}))}return r}async function Hv(t,e,r={}){let s=[];for(let o of t){let n=ce(o);if(n&&n.enabled){let a=await Mf(o,e,r);s.push(a)}}return s}var Tc,$e,Sc,En,Ec=P(()=>{ar();Qe();H();Tc=C.createScope("ToolExecutor"),$e={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Sc=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((s,o)=>{this.queue.push({executor:e,task:r,resolve:s,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:s,resolve:o,reject:n}=e,a=new AbortController;s.abortController=a,s.status="running",s.startedAt=Date.now(),this.running.set(s.id,s),$e.activeControllers.set(s.id,a),this.executeTask(r,s,a.signal).then(i=>{s.status="completed",s.completedAt=Date.now(),o(i)}).catch(i=>{s.status=i.name==="AbortError"?"aborted":"failed",s.completedAt=Date.now(),n(i)}).finally(()=>{this.running.delete(s.id),$e.activeControllers.delete(s.id),$e.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,s){let o=Date.now(),n=null;for(let a=0;a<=r.maxRetries;a++){if(s.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(s);return ei(r.id,r.toolId,!0,i,null,Date.now()-o,a)}catch(i){if(n=i,i.name==="AbortError")throw i;a===r.maxRetries&&Tc.error(`\u4EFB\u52A1\u6267\u884C\u5931\u8D25 (toolId=${r.toolId}, ${a+1}\u6B21\u91CD\u8BD5)`,{error:i}),a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw n}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=$e.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of $e.activeControllers.values())e.abort();$e.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},En=null});async function Gv(){return Ac||(Ac=Promise.resolve().then(()=>(Ec(),_c))),Ac}async function qv(t,e,r){return r&&t.output?.mode===Dt.POST_RESPONSE_API?Lt.runToolPostResponse(t,e):r&&t.output?.mode===Dt.FOLLOW_AI?Lt.runToolFollowAiManual(t,e):(await Gv()).executeToolWithConfig(t.id,e)}function Yv(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?$s.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Dt.POST_RESPONSE_API?$s.MANUAL_POST_RESPONSE_API:$s.MANUAL_COMPATIBILITY:$s.MANUAL_POST_RESPONSE_API}function ti(t,e){try{Il(t,e)}catch(r){ko.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function Vv(t,e){let r=Date.now(),s=t.id,o=`yyt-tool-run-${s}`,n=Yv(t,e),a=e?.executionKey||"";ti(s,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),ko.info(`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,null,{topNotice:{sticky:!0,noticeId:o}});try{let i=n===$s.MANUAL_LOCAL_TRANSFORM?await Za(t,e):await qv(t,e,!0),l=Date.now()-r;if(i?.success){let y=ce(s),p=i?.meta?.writebackDetails||{};return ti(s,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||Ke.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),ko.info(`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,null,{toast:"success",topNotice:{duration:3200,noticeId:o}}),{success:!0,duration:l,result:i}}let d=ce(s),c=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return ti(s,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||Ke.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(n===$s.MANUAL_COMPATIBILITY?Ve.COMPATIBILITY_EXECUTE:Ve.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),ko.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:o}}),{success:!1,duration:l,error:c,result:i}}catch(i){let l=Date.now()-r,d=ce(s),c=i?.message||String(i);throw ti(s,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:Ke.NOT_APPLICABLE,lastFailureStage:n===$s.MANUAL_COMPATIBILITY?Ve.COMPATIBILITY_EXECUTE:Ve.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),ko.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:o}}),i}}async function ri(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ce(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Ur(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:Ke.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),ko.warn(`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,null,{topNotice:{duration:2800,noticeId:`yyt-tool-run-${t}`}}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await bs({runSource:"MANUAL"});return Vv(e,r)}async function si(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ce(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await bs({runSource:"MANUAL_PREVIEW"});return Lt.previewExtraction(e,r)}var ko,$s,Ac,Cc=P(()=>{ar();_n();ws();vc();H();ko=C.createScope("ToolTrigger"),$s={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},Ac=null});var Nf={};ie(Nf,{TOOL_CONFIG_PANEL_STYLES:()=>kc,createToolConfigPanel:()=>rs,default:()=>oS});function Pf(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Jv(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Xv(t){if(!t)return null;let e=t.closest(".yyt-popup-body");if(!e)return yr.warn("pinToolPanelHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148"),null;let r=()=>{let o=t.querySelector(".yyt-tool-panel");if(!o)return;let n=e.getBoundingClientRect(),a=o.getBoundingClientRect(),i=n.bottom-a.top-8;i>100?o.style.height=`${i}px`:yr.warn(`pinToolPanelHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${i}`)};if(r(),requestAnimationFrame(()=>requestAnimationFrame(r)),typeof ResizeObserver>"u")return null;let s=new ResizeObserver(()=>r());return s.observe(e),()=>{try{s.disconnect()}catch{}}}function Qv(t){if(!t)return;let e=t.querySelector(".yyt-tool-panel-hero"),r=t.querySelector(".yyt-tool-panel-scroll");if(!e||!r)return;let s=()=>{r.scrollTop>0?e.classList.add("yyt-tool-panel-hero--compact"):e.classList.remove("yyt-tool-panel-hero--compact")};s(),r.addEventListener("scroll",s,{passive:!0})}function rs(t={}){let{id:e,toolId:r,postResponseHint:s,previewDialogId:o,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=Pf(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),d=ce(r);if(!d){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let c=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];c.appendChild(Zv(d,r,l,s));let y=f("div",{className:"yyt-tool-panel-scroll"});y.appendChild(eS(d));let p=tS(d,r,l);u.push(p),y.appendChild(p.el);let g=rS(d,r,l,a,o,n);u.push(g),y.appendChild(g.el),c.appendChild(y),i.innerHTML="",i.appendChild(c);let m=Xv(i);Qv(i),i._yytToolPanelCleanup=()=>{for(let h of u)try{h.destroy()}catch{}if(typeof m=="function")try{m()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=Pf(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return kc}}}function Zv(t,e,r,s){let o=f("div",{className:"yyt-tool-panel-hero"}),n=f("div",{className:"yyt-tool-panel-hero-row1"});n.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),n.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=f("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(X({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await ri(e),yr.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(g){yr.error(`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`,null,{toast:!0})}}}).el),a.appendChild(X({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{yr.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),n.appendChild(a),o.appendChild(n),t.description&&o.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=f("div",{className:"yyt-tool-panel-hero-chips"}),d=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:d}));let c=t.output?.apiPreset||t.apiPreset||"";c&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`API: ${c}`}));let u=t.extraction?.regexPresetId||"";if(u){let g=Ae.getPreset(u);i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g?g.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(f("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let y=t.worldbooks?.presetId||"";if(y){let g=lt.getPreset(y);g&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${g.name}`}))}let p=t.runtime?.lastStatus;if(p){let g=p==="success"?"status-success":p==="failed"?"status-failed":"";i.appendChild(f("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${p}`}))}return o.appendChild(i),o}function eS(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let d=f("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",Jv(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function tS(t,e,r){let s=f("div",{style:{display:"flex",flexDirection:"column"}});s.appendChild(An({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:Me({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let d=ce(e)||{};Re(e,{...d,output:{...d.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let o=(()=>{try{return Nr()||[]}catch{return[]}})();s.appendChild(An({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:Me({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...o.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let d=ce(e)||{};Re(e,{...d,apiPreset:l,output:{...d.output||{},apiPreset:l}}),r()}})}));let n=(()=>{try{return wn()||[]}catch{return[]}})();s.appendChild(An({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:Me({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...n.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let d=ce(e)||{};Re(e,{...d,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=Ae.listPresets();s.appendChild(An({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:Me({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=ce(e)||{},c={...d.extraction||{},regexPresetId:l};if(l){let u=Ae.getPreset(l);yr.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else yr.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});Re(e,{...d,extraction:c}),r()}})}));let i=lt.listPresets();return s.appendChild(An({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:Me({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=ce(e)||{},c={...d.worldbooks||{},presetId:l};if(l){let u=lt.getPreset(l);yr.info(`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else yr.info("\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9",null,{toast:"success"});Re(e,{...d,worldbooks:c}),r()}})})),Gt({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function An({label:t,hint:e,control:r}){let s=f("div",{className:"yyt-tool-binding-row"}),o=f("div",{className:"yyt-tool-binding-label"});return o.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.classList.add("small"),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),s.appendChild(r.el),s.appendChild(f("div",{className:"yyt-tool-binding-meta"})),s}function rS(t,e,r,s,o,n){let a=f("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(f("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},f("div",{style:{flex:"1"}},f("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),X({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let x=ha(e)||{},_=ce(e)||{};Re(e,{..._,promptTemplate:x.promptTemplate||""}),r()}}).el));let i=f("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let x=ce(e)||{};Re(e,{...x,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(f("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(f("hr",{className:"yyt-zone-divider"})),a.appendChild(f("div",{style:{marginBottom:"8px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),d=f("div",{className:"yyt-form-group",style:{margin:0}});d.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let c=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});c.value=String(Number(t.extraction?.maxMessages)||5),c.addEventListener("change",()=>{let x=ce(e)||{};Re(e,{...x,extraction:{...x.extraction||{},maxMessages:Math.max(1,parseInt(c.value,10)||5)}})}),d.appendChild(c),l.appendChild(d);let u=f("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(X({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let x=await si(e);sS(s,x,o,n)}catch(x){yr.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${x?.message||x}`,null,{toast:!0})}}}).el),l.appendChild(u),a.appendChild(l);let y=f("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(f("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,g=f("datalist",{attrs:{id:p}}),m=(()=>{let x=new Set,_=[];function w(A){if(A)for(let T of A.rules||[]){if(T?.enabled===!1||T?.type!=="include")continue;let E=String(T.value||"").trim();!E||x.has(E)||(x.add(E),_.push(E))}}let B=t.extraction?.regexPresetId;if(B)w(Ae.getPreset(B));else for(let A of Ae.listPresets())w(A);return _})();for(let x of m)g.appendChild(f("option",{attrs:{value:x}}));let h=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:p,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return h.value=t.extraction?.writebackTag||"",h.addEventListener("change",()=>{let x=ce(e)||{};Re(e,{...x,extraction:{...x.extraction||{},writebackTag:h.value.trim()}})}),y.appendChild(h),y.appendChild(g),a.appendChild(y),Gt({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function sS(t,e,r,s){if(!te()||!ve(t))return;let n=`${us}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${ts(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${ts(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${ts(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${ts(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(zo({id:n,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${ts((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${ts(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${ts(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${ts(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),Ko(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}function ts(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var yr,kc,oS,Io=P(()=>{Zt();it();it();ar();qo();_o();Cc();H();jr();Ys();yr=C.createScope("ToolConfigPanel"),kc=`
  /* v1.0.211 #3 \u4FEE\u590D\uFF1Ahero \u63D0\u5230 .yyt-tool-panel-scroll \u5916\u9762\uFF0Chero \u7269\u7406\u4E0A\u4E0D\u5728\u6EDA\u52A8\u533A\u5185 \u2192
     \u4E0D\u4F1A\u88AB\u6EDA\u8D70\u3002.yyt-tool-panel \u81EA\u8EAB overflow:hidden \u9632\u6574\u4F53\u6EA2\u51FA\uFF0CJS pinHeight \u7528
     .yyt-popup-body \u6D4B\u9AD8\u5F3A\u5236\u5199\u5230 .yyt-tool-panel.style.height \u4E0A\u3002*/
  .yyt-tool-panel {
    display: flex; flex-direction: column;
    height: 100%;
    overflow: hidden;
    gap: 0;
  }
  .yyt-tool-panel-hero {
    flex-shrink: 0;
    padding: 16px 20px;
    border-bottom: 1px solid var(--yyt-border);
    display: flex; flex-direction: column; gap: 8px;
    transition: padding 0.18s ease, gap 0.18s ease;
  }
  .yyt-tool-panel-hero.yyt-tool-panel-hero--compact {
    padding-top: 10px; padding-bottom: 10px;
    gap: 0;
  }
  .yyt-tool-panel-hero.yyt-tool-panel-hero--compact .yyt-tool-panel-hero-desc,
  .yyt-tool-panel-hero.yyt-tool-panel-hero--compact .yyt-tool-panel-hero-chips {
    display: none;
  }
  .yyt-tool-panel-scroll {
    flex: 1; min-height: 0;
    overflow-y: auto;
  }
  .yyt-tool-panel-hero-row1 { display: flex; align-items: center; gap: 12px; }
  .yyt-tool-panel-hero-icon {
    width: 30px; height: 30px; border-radius: var(--yyt-radius-sm);
    background: var(--yyt-accent-soft); color: var(--yyt-accent);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
  }
  .yyt-tool-panel-hero-name { flex: 1; font-size: 15px; font-weight: 700; color: var(--yyt-text); min-width: 0; }
  .yyt-tool-panel-hero-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .yyt-tool-panel-hero-desc { font-size: 12px; color: var(--yyt-text-muted); line-height: 1.7; padding-left: 42px; }
  .yyt-tool-panel-hero-chips { display: flex; gap: 6px; flex-wrap: wrap; padding-left: 42px; }
  .yyt-tool-hero-chip {
    display: inline-flex; align-items: center;
    padding: 2px 8px; border-radius: 999px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.3px;
    background: var(--yyt-surface-2); color: var(--yyt-text-muted);
  }
  .yyt-tool-hero-chip.mode { background: rgba(167,139,250,0.12); color: #a78bfa; }
  .yyt-tool-hero-chip.preset { background: var(--yyt-accent-soft); color: var(--yyt-accent); }
  .yyt-tool-hero-chip.status-success { background: rgba(74,222,128,0.12); color: #4ade80; }
  .yyt-tool-hero-chip.status-failed { background: rgba(239,68,68,0.12); color: #ef4444; }
  .yyt-tool-runtime-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
    padding: 12px 20px; border-bottom: 1px solid var(--yyt-border);
  }
  .yyt-tool-runtime-stat {
    display: flex; flex-direction: column; gap: 2px;
    border-left: 1px solid var(--yyt-border);
    padding-left: 14px;
  }
  .yyt-tool-runtime-stat:first-child { border-left: none; padding-left: 0; }
  .yyt-tool-runtime-stat-label {
    font-size: 10px; font-weight: 700; color: var(--yyt-text-muted);
    text-transform: uppercase; letter-spacing: 0.4px;
  }
  .yyt-tool-runtime-stat-value {
    font-size: 12px; font-weight: 600; color: var(--yyt-text);
    font-variant-numeric: tabular-nums;
  }
  .yyt-tool-runtime-stat-value.success { color: #4ade80; }
  .yyt-tool-runtime-stat-value.error { color: #ef4444; }
  .yyt-tool-runtime-stat-value.muted { color: var(--yyt-text-muted); }
  .yyt-tool-binding-row {
    display: grid; grid-template-columns: 130px 1fr auto;
    gap: 12px; align-items: center; padding: 10px 0;
  }
  .yyt-tool-binding-row + .yyt-tool-binding-row {
    border-top: 1px dashed rgba(255,255,255,0.08);
  }
  .yyt-tool-binding-label { display: flex; flex-direction: column; gap: 2px; }
  .yyt-tool-binding-label-text { font-size: 12px; font-weight: 600; color: var(--yyt-text-secondary, rgba(255,255,255,0.55)); }
  .yyt-tool-binding-label-hint { font-size: 10px; color: var(--yyt-text-muted); }
  .yyt-tool-binding-meta a { color: var(--yyt-accent); text-decoration: none; font-weight: 600; font-size: 11px; }
  .yyt-tool-binding-meta a:hover { text-decoration: underline; }
  .yyt-zone-divider { border: none; margin: 18px 0; height: 0; border-top: 1px dashed rgba(255,255,255,0.10); }
  .yyt-macro-inline {
    font-size: 11px; color: var(--yyt-text-muted);
    line-height: 1.7; margin-top: 6px;
    font-family: ui-monospace, monospace;
  }
  .yyt-macro-inline code {
    color: var(--yyt-accent); background: var(--yyt-surface-2);
    padding: 1px 5px; border-radius: 3px; font-size: 10px;
  }
`;oS=rs});var Lf={};ie(Lf,{SummaryToolPanel:()=>Df,default:()=>nS});var Df,nS,Of=P(()=>{Io();Df=rs({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),nS=Df});var Bf={};ie(Bf,{StatusBlockPanel:()=>$f,default:()=>aS});var $f,aS,zf=P(()=>{Io();$f=rs({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),aS=$f});var Uf={};ie(Uf,{YouyouReviewPanel:()=>Kf,default:()=>iS});var Kf,iS,Ff=P(()=>{Io();Kf=rs({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),iS=Kf});function jf(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function lS(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function ss(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function oi(t={}){let{id:e,toolId:r,previewDialogId:s,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let d=jf(l);if(!d)return;if(d._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}let c=()=>this.renderTo(l),u=ce(r);if(!u){d.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let y=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),p=[];y.appendChild(cS(u,r,c,n,i)),y.appendChild(dS(u));let g=uS(u,r,c);p.push(g),y.appendChild(g.el);let m=pS(u,r,c,l,n,a,s,o);p.push(m),y.appendChild(m.el),d.innerHTML="",d.appendChild(y),d._yytLocalToolPanelCleanup=()=>{for(let h of p)try{h.destroy()}catch{}delete d._yytLocalToolPanelCleanup}},destroy(l){let d=jf(l);if(d?._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function cS(t,e,r,s,o){let n=f("div",{className:"yyt-tool-panel-hero"}),a=f("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=f("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(X({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await ri(e),Ro.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(m){Ro.error(`\u6267\u884C\u5931\u8D25\uFF1A${m?.message||m}`,null,{toast:!0})}}}).el),i.appendChild(X({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{Ro.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),a.appendChild(i),n.appendChild(a),t.description&&n.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),o&&n.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:o}));let l=f("div",{className:"yyt-tool-panel-hero-chips"}),d=t.output?.autoTrigger!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${d?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let c=t.processor?.direction||s[0]?.key||"",u=s.find(m=>m.key===c)?.label||c;u&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let y=t.output?.overwrite!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${y?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let p=t.extraction?.regexPresetId||"";if(p){let m=Ae.getPreset(p);m&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${m.name}`}))}let g=t.runtime?.lastStatus;if(g){let m=g==="success"?"status-success":g==="failed"?"status-failed":"";l.appendChild(f("span",{className:`yyt-tool-hero-chip ${m}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${g}`}))}return n.appendChild(l),n}function dS(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let d=f("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",lS(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function uS(t,e,r){let s=f("div",{style:{display:"flex",flexDirection:"column"}}),o=Ae.listPresets();return s.appendChild(Ic({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:Me({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...o.map(n=>({value:n.id,label:n.name}))],onChange:n=>{let a=ce(e)||{},i={...a.extraction||{},regexPresetId:n};if(n){let l=Ae.getPreset(n);Ro.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||n}`,null,{toast:"success"})}else Ro.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});Re(e,{...a,extraction:i}),r()}})})),s.appendChild(Ic({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:Me({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:n=>{let a=ce(e)||{};Re(e,{...a,output:{...a.output||{},overwrite:n==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),s.appendChild(Ic({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:Me({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:n=>{let a=ce(e)||{};Re(e,{...a,output:{...a.output||{},autoTrigger:n==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),Gt({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function Ic({label:t,hint:e,control:r}){let s=f("div",{className:"yyt-tool-binding-row"}),o=f("div",{className:"yyt-tool-binding-label"});return o.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),s.appendChild(r.el),s.appendChild(f("div",{className:"yyt-tool-binding-meta"})),s}function pS(t,e,r,s,o,n,a,i){let l=f("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let d=t.processor?.direction||o[0]?.key||"",c=Me({value:d,options:o.map(m=>({value:m.key,label:m.description?`${m.label} \u2014 ${m.description}`:m.label})),style:{padding:"7px 10px",fontSize:"12px"},onChange:m=>{let h=ce(e)||{};Re(e,{...h,processor:{...h.processor||{},direction:m}}),r()}});if(l.appendChild(c.el),l.appendChild(f("hr",{className:"yyt-zone-divider"})),n.length>0){l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let m=f("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let x of n){let _=xt({label:x.label,hint:x.description||"",checked:h[x.key]===!0,onChange:w=>{let B=ce(e)||{};Re(e,{...B,processor:{...B.processor||{},options:{...B.processor?.options||{},[x.key]:w}}})}});m.appendChild(_.el)}l.appendChild(m),l.appendChild(f("hr",{className:"yyt-zone-divider"}))}l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),y=f("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});p.value=String(Number(t.extraction?.maxMessages)||5),p.addEventListener("change",()=>{let m=ce(e)||{};Re(e,{...m,extraction:{...m.extraction||{},maxMessages:Math.max(1,parseInt(p.value,10)||5)}})}),y.appendChild(p),u.appendChild(y);let g=f("div",{className:"yyt-form-group",style:{margin:0}});return g.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),g.appendChild(X({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let m=await si(e);yS(s,m,a,i)}catch(m){Ro.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${m?.message||m}`,null,{toast:!0})}}}).el),u.appendChild(g),l.appendChild(u),Gt({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function yS(t,e,r,s){if(!te()||!ve(t))return;let n=`${us}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${ss(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${ss(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${ss(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${ss(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(zo({id:n,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${ss((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${ss(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${ss(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${ss(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),Ko(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}var Ro,Rc=P(()=>{Zt();it();ar();Cc();H();Io();jr();Ro=C.createScope("LocalTransformToolPanel")});var Hf={};ie(Hf,{EscapeTransformToolPanel:()=>Wf,default:()=>fS});var Wf,fS,Gf=P(()=>{Rc();Wf=oi({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),fS=Wf});var Yf={};ie(Yf,{PunctuationTransformToolPanel:()=>qf,default:()=>gS});var qf,gS,Vf=P(()=>{Rc();qf=oi({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),gS=qf});var Xf={};ie(Xf,{BypassPanel:()=>Jf,default:()=>mS});var st,Jf,mS,Qf=P(()=>{Qe();_o();it();H();st=C.createScope("BypassPanel"),Jf={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=pe.getPresetList(),r=pe.getDefaultPresetId();return`
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
            ${e.map(s=>this._renderPresetItem(s,s.id===r)).join("")}
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
        <div class="yyt-bypass-editor">
          <div class="yyt-bypass-empty">
            <i class="fa-solid fa-shield-halved"></i>
            <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t,e){let r=Ar&&Ar[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${le(t.name)}</span>
          <span class="yyt-bypass-preset-count">${t.messages?.length||0} \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-bypass-preset-actions">
          ${e?'<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>':""}
          ${r?"":`
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
      `;let e=pe.getDefaultPresetId()===t.id,r=Ar&&Ar[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${le(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-bypass-editor-actions">
            ${r?"":`
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
          <input type="text" class="yyt-input yyt-bypass-description-input"
                 value="${le(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>

        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>

        <div class="yyt-bypass-messages">
          ${(t.messages||[]).map((s,o)=>this._renderMessageItem(s,o)).join("")}
        </div>

        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
    `},_renderMessageItem(t,e=0){let r={SYSTEM:"fa-server",USER:"fa-user",assistant:"fa-robot"};return`
      <div class="yyt-bypass-message ${t.enabled===!1?"yyt-disabled":""}"
           data-message-id="${t.id}" data-message-index="${e}"
           data-deletable="${t.deletable!==!1}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${r[t.role]||"fa-comment"}"></i>
            <select class="yyt-select yyt-bypass-role-select yyt-select-fixed-width">
              <option value="SYSTEM" ${t.role==="SYSTEM"?"selected":""}>SYSTEM</option>
              <option value="USER" ${t.role==="USER"?"selected":""}>USER</option>
              <option value="assistant" ${t.role==="assistant"?"selected":""}>assistant</option>
            </select>
          </div>
          <div class="yyt-bypass-message-controls">
            <button class="yyt-btn yyt-btn-icon yyt-btn-secondary yyt-bypass-move-up" title="\u4E0A\u79FB">
              <i class="fa-solid fa-chevron-up"></i>
            </button>
            <button class="yyt-btn yyt-btn-icon yyt-btn-secondary yyt-bypass-move-down" title="\u4E0B\u79FB">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
            <button class="yyt-btn yyt-btn-icon yyt-btn-secondary yyt-bypass-insert-message" title="\u5728\u6B64\u4E0B\u65B9\u63D2\u5165">
              <i class="fa-solid fa-plus"></i>
            </button>
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${le(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let r=te();!r||!ve(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),Bt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let s=e(r.currentTarget).data("presetId");this._selectPreset(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let s=e(r.currentTarget).data("presetId");if(!s||!await br("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=pe.deletePreset(s);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===s&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),st.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):st.error(n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.prev(".yyt-bypass-message");o.length&&(o.before(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.next(".yyt-bypass-message");o.length&&(o.after(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let s=r.target.files[0];if(s){try{let o=await Fo(s),n=pe.importPresets(o);n.success?st.info(n.message,null,{toast:"success"}):st.error(n.message,null,{toast:!0}),n.success&&this.renderTo(t)}catch(o){st.error(`\u5BFC\u5165\u5931\u8D25: ${o.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=pe.exportPresets();Uo(r,`bypass_presets_${Date.now()}.json`),st.info("\u9884\u8BBE\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){st.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}})},_selectPreset(t,e,r){let s=pe.getPreset(r);s&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(s)),Bt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,s=pe.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});s.success?(this.renderTo(t),this._selectPreset(t,e,r),st.info("\u9884\u8BBE\u5DF2\u521B\u5EFA",null,{toast:"success"})):st.error(s?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),s=r.data("presetId");if(!s)return;let o=r.find(".yyt-bypass-name-input").val().trim(),n=r.find(".yyt-bypass-description-input").val().trim();if(!o){st.warn("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0",null,{toast:!0}),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=pe.updatePreset(s,{name:o,description:n,messages:a});i.success?(st.info("\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"}),this._refreshPresetList(t,e)):st.error(i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},async _deleteCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s||!await br("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=pe.deletePreset(s);n.success?(this.renderTo(t),st.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):st.error(n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_duplicateCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;let o=`bypass_${Date.now()}`,n=pe.duplicatePreset(s,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),st.info("\u9884\u8BBE\u5DF2\u590D\u5236",null,{toast:"success"})):st.error(n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_setAsDefault(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;pe.setDefaultPresetId(s),this._refreshPresetList(t,e);let o=pe.getPreset(s);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),st.info("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE",null,{toast:"success"})},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(s,o))},_insertMessageAfter(t,e,r){let s=t.find(".yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=this._renderMessageItem(o,0),a=e(n);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=pe.getPresetList(),s=pe.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(n=>this._renderPresetItem(n,n.id===s)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!te()||!ve(t)||(ft(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
      /* \u7834\u9650\u8BCD\u9762\u677F\u6837\u5F0F */
      .yyt-bypass-panel {
        display: flex;
        height: 100%;
        gap: 0;
      }

      .yyt-bypass-sidebar {
        width: 220px;
        display: flex;
        flex-direction: column;
        background: var(--yyt-surface-2);
        border-radius: 0;
        border-right: 1px solid var(--yyt-border);
        flex-shrink: 0;
      }
      
      .yyt-bypass-sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid var(--yyt-border);
      }

      .yyt-bypass-sidebar-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-preset-list {
        flex: 1;
        overflow-y: auto;
        padding: 0;
      }

      .yyt-bypass-preset-item {
        padding: 12px 16px;
        border-radius: 0;
        border-top: 1px solid var(--yyt-border);
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .yyt-bypass-preset-item:first-child {
        border-top: none;
      }
      
      .yyt-bypass-preset-item:hover {
        background: var(--yyt-surface-hover);
      }
      
      .yyt-bypass-preset-item.yyt-active {
        background: var(--yyt-accent-soft);
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
        background: var(--yyt-accent-soft);
        color: var(--yyt-accent);
        border-radius: 4px;
        margin-top: 4px;
        display: inline-block;
      }
      
      .yyt-bypass-sidebar-footer {
        display: flex;
        gap: 8px;
        padding: 12px;
        border-top: 1px solid var(--yyt-border);
      }

      .yyt-bypass-sidebar-footer .yyt-btn {
        flex: 1;
      }
      
      .yyt-bypass-editor {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: transparent;
        border-radius: 0;
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
        border-bottom: 1px solid var(--yyt-border);
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
        border-bottom: 1px solid var(--yyt-border);
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
        background: transparent;
        border-top: 1px solid var(--yyt-border);
        padding: 14px;
      }

      .yyt-bypass-message:first-child {
        border-top: none;
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
        gap: 4px;
      }

      .yyt-bypass-insert-message {
        opacity: 0;
        transition: opacity 0.15s ease;
        font-size: 11px !important;
        padding: 2px 6px !important;
      }

      .yyt-bypass-message:hover .yyt-bypass-insert-message {
        opacity: 0.7;
      }

      .yyt-bypass-insert-message:hover {
        opacity: 1 !important;
      }
      
      .yyt-bypass-message-content {
        min-height: 80px;
      }
      
      .yyt-bypass-editor-footer {
        padding: 16px;
        border-top: 1px solid var(--yyt-border);
        display: flex;
        justify-content: flex-end;
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},mS=Jf});var Nc={};ie(Nc,{SettingsPanel:()=>sg,applyTheme:()=>rg,applyUiPreferences:()=>Pc,default:()=>bS});function Cn({id:t,checked:e=!1,title:r="",hint:s=""}){return`
    <div class="yyt-toggle-row">
      <div class="yyt-toggle-label">
        <span>${r}</span>
        ${s?`<span class="yyt-toggle-hint">${s}</span>`:""}
      </div>
      <label class="yyt-toggle">
        <input type="checkbox" id="${t}" ${e?"checked":""}>
        <span class="yyt-toggle-slider"></span>
      </label>
    </div>
  `}function eg(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function kn(){return eg()?.document||document}function tg(t=kn()){return t?.documentElement||document.documentElement}function rg(t,e=kn()){let r=tg(e),s={...hS,...Zf[t]||Zf["dark-blue"]};Object.entries(s).forEach(([o,n])=>{r.style.setProperty(o,n)}),r.setAttribute("data-yyt-theme",t)}function Pc(t={},e=kn()){let r=tg(e),{theme:s="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};rg(s,e),r.classList.toggle("yyt-compact-mode",!!o),r.classList.toggle("yyt-no-animation",!n)}var Mc,hS,Zf,sg,bS,Dc=P(()=>{Qe();Sn();H();Va();it();Mc=C.createScope("SettingsPanel"),hS={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},Zf={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};sg={id:"settingsPanel",render(){let t=Ft.getSettings(),e=t.debug?.enableDebugLog===!0,r=this._getAutomationRuntime();return`
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">\u5168\u5C40\u504F\u597D\u4E0E\u8FD0\u884C\u7B56\u7565</div>
            <div class="yyt-settings-hero-desc">\u7EDF\u4E00\u7BA1\u7406\u6267\u884C\u5668\u3001\u81EA\u52A8\u5316\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u8BBE\u7F6E\uFF0C\u8BA9\u5DE5\u5177\u94FE\u884C\u4E3A\u4E0E\u754C\u9762\u4F53\u9A8C\u4FDD\u6301\u4E00\u81F4\u3002</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${e?"is-on":"is-off"}">\u8C03\u8BD5 ${e?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip is-neutral">\u4E3B\u9898 ${t.ui?.theme||"dark-blue"}</span>
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
          ${this._renderExecutorTab(t.executor,t.automation,r)}
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
    `},_renderExecutorTab(t,e={},r=null){let s=Array.isArray(r?.recentTransactions)?r.recentTransactions.slice().reverse():[],o=r?.hostBinding||{},n=Array.isArray(o.eventBindings)&&o.eventBindings.length>0?o.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",a=s.length>0?s.slice(0,5).map(i=>{let l=i?.results?.[0]?.meta?.writebackDetails?.refresh||{};return`
          <div class="yyt-list-row">
            <div class="yyt-settings-runtime-meta">
              <span>${i?.sourceEvent||"UNKNOWN_EVENT"}</span>
              <span>${i?.phase||"unknown"}</span>
              <span>${i?.messageId||"no_message_id"}</span>
            </div>
            <div class="yyt-settings-runtime-main">${i?.verdict||i?.error||i?.generationKey||"\u65E0\u989D\u5916\u4FE1\u606F"}</div>
          </div>
        `}).join(""):'<div class="yyt-form-hint">\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002</div>';return`
      <div class="yyt-settings-tab-content yyt-active" data-tab="executor">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-layer-group"></i></span>\u5E76\u53D1\u63A7\u5236</div>
          <div class="yyt-form-group">
            <label>\u6700\u5927\u5E76\u53D1\u6570</label>
            <div class="yyt-form-hint">\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650</div>
            <input type="number" class="yyt-input" id="yyt-setting-maxConcurrent"
                   value="${t.maxConcurrent}" min="1" max="10">
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-rotate-right"></i></span>\u91CD\u8BD5\u7B56\u7565</div>
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

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock"></i></span>\u8D85\u65F6\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u5355\u4E2A\u8BF7\u6C42\u7684\u8D85\u65F6\u65F6\u95F4,\u8D85\u8FC7\u5C06\u81EA\u52A8\u4E2D\u65AD</div>
            <input type="number" class="yyt-input" id="yyt-setting-requestTimeoutMs"
                   value="${t.requestTimeoutMs}" min="10000" max="300000" step="10000">
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-list-ol"></i></span>\u961F\u5217\u7B56\u7565</div>
          <div class="yyt-form-group">
            <label>\u961F\u5217\u5904\u7406\u65B9\u5F0F</label>
            <select class="yyt-select" id="yyt-setting-queueStrategy">
              <option value="fifo" ${t.queueStrategy==="fifo"?"selected":""}>FIFO (\u5148\u8FDB\u5148\u51FA)</option>
              <option value="lifo" ${t.queueStrategy==="lifo"?"selected":""}>LIFO (\u540E\u8FDB\u5148\u51FA)</option>
              <option value="priority" ${t.queueStrategy==="priority"?"selected":""}>\u4F18\u5148\u7EA7\u6392\u5E8F</option>
            </select>
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-bolt"></i></span>\u81EA\u52A8\u89E6\u53D1\u8282\u6D41</div>
          <div class="yyt-form-hint">\u7531 output_mode \u51B3\u5B9A\u54EA\u4E9B\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1(post_response_api / local_transform \u81EA\u52A8,follow_ai \u624B\u52A8)\u3002\u8FD9\u91CC\u53EA\u63A7\u5236\u8282\u6D41\u65F6\u95F4\u3002</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationSettleMs"
                     value="${e.settleMs??1200}" min="0" max="10000" step="100">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationCooldownMs"
                     value="${e.cooldownMs??5e3}" min="0" max="60000" step="100">
            </div>
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-stethoscope"></i></span>\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD</div>
          <div class="yyt-settings-runtime-grid">
            <div class="yyt-settings-runtime-chip ${r?.enabled?"is-on":"is-off"}">\u670D\u52A1 ${r?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528"}</div>
            <div class="yyt-settings-runtime-chip ${o.initialized?"is-on":"is-off"}">\u76D1\u542C ${o.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A"}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u5F85\u5904\u7406 ${r?.pendingTimerCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u6392\u961F\u69FD\u4F4D ${r?.queuedSlotCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u4E8B\u52A1 ${s.length}</div>
          </div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u6E90:<code>${o.source||"unavailable"}</code>;\u4E8B\u4EF6:<code>${n}</code></div>
          ${o.lastError?`<div class="yyt-form-hint">\u6700\u8FD1\u9519\u8BEF:<code>${o.lastError}</code></div>`:""}
          <div class="yyt-list-table">${a}</div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-file-lines"></i></span>\u65E5\u5FD7\u7EA7\u522B</div>
          <div class="yyt-form-group">
            ${Cn({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${Cn({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${Cn({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
          </div>
        </div>
      </div>
    `},_renderUiTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="ui">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-palette"></i></span>\u5916\u89C2\u8BBE\u7F6E</div>
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
            ${Cn({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${Cn({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-code"></i></span>\u6A21\u677F\u5B8F\u8BF4\u660E</div>
          <div class="yyt-form-hint">\u5DE5\u5177\u6A21\u677F\u91CC\u53EF\u76F4\u63A5\u4F7F\u7528\u4E0B\u9762\u8FD9\u4E9B\u5B8F\u3002\u4E16\u754C\u4E66\u5185\u5BB9\u53EA\u6709\u5728\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\u624D\u4F1A\u6CE8\u5165\u3002</div>
          <div class="yyt-list-table">
            ${this._renderMacroList()}
          </div>
        </div>
      </div>
    `},_renderMacroList(){return jt.getAvailableVariables().map(t=>`
        <div class="yyt-list-row">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=te();if(!e||!ve(t))return;let r=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let n=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{r._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",async()=>{await br("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(Ft.resetSettings(),Pc(vn.ui,kn()),r.renderTo(t),Mc.info("\u8BBE\u7F6E\u5DF2\u91CD\u7F6E",null,{toast:"success"}))}),Bt(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let s=Ft.getDebugSettings();C.setLevel(s.enableDebugLog?ge.DEBUG:ge.INFO)},_saveSettings(t){let e=te(),r=[{id:"yyt-setting-maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"yyt-setting-maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"yyt-setting-retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"yyt-setting-requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"yyt-setting-automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"yyt-setting-automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of r){let n=t.find(`#${o.id}`),a=n.val(),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){Mc.warn(`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`,null,{toast:!0}),n.trigger("focus").trigger("select");return}}let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Ft.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ft.saveSettings(s),C.setLevel(s.debug.enableDebugLog?ge.DEBUG:ge.INFO),Pc(s.ui,kn()),Mc.info("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"})},_getAutomationRuntime(){try{return eg()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!te()||!ve(t)||(ft(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
        padding: 0;
        border-radius: 0;
        border: none;
        background: transparent;
        box-shadow: none;
      }

      .yyt-settings-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }

      .yyt-settings-hero-title {
        font-size: 18px;
        font-weight: 700;
        line-height: 1.15;
        color: var(--yyt-text);
      }

      .yyt-settings-hero-desc {
        font-size: 13px;
        line-height: 1.75;
        color: var(--yyt-text-secondary);
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
        border: 1px solid var(--yyt-border-strong);
        letter-spacing: 0.4px;
        color: var(--yyt-text);
        background: var(--yyt-surface-3);
        box-shadow: none;
      }

      .yyt-settings-status-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.25);
        background: rgba(74, 222, 128, 0.12);
      }

      .yyt-settings-status-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.25);
        background: rgba(248, 113, 113, 0.12);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-tabs {
        display: flex;
        gap: 6px;
        padding: 5px;
        border-radius: var(--yyt-radius);
        background: var(--yyt-surface-2);
        border: 1px solid var(--yyt-border);
        width: fit-content;
        max-width: 100%;
        flex-wrap: wrap;
        box-shadow: none;
      }

      .yyt-settings-tab {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: var(--yyt-radius-sm);
        border: 1px solid transparent;
        background: transparent;
        color: var(--yyt-text-secondary);
        cursor: pointer;
        transition: all 0.18s ease;
        font-weight: 600;
        box-shadow: none;
      }

      .yyt-settings-tab:hover {
        color: var(--yyt-text);
        background: var(--yyt-surface-3);
        border-color: transparent;
      }

      .yyt-settings-tab.yyt-active {
        color: var(--yyt-on-accent);
        background: var(--yyt-accent);
        border-color: transparent;
        box-shadow: none;
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

      .yyt-settings-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 2px;
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
        border: 1px solid var(--yyt-border-strong);
        background: var(--yyt-surface-3);
        color: var(--yyt-text);
        box-shadow: none;
      }

      .yyt-settings-runtime-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.25);
        background: rgba(74, 222, 128, 0.12);
      }

      .yyt-settings-runtime-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.25);
        background: rgba(248, 113, 113, 0.12);
      }

      .yyt-settings-runtime-chip.is-neutral {
        color: var(--yyt-text);
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
        line-height: 1.7;
        word-break: break-word;
      }

      /* settings-specific macro/runtime row layout (2-column grid) */
      .yyt-settings-panel .yyt-list-table {
        display: flex;
        flex-direction: column;
        border: none;
        border-radius: 0;
        overflow: visible;
      }

      .yyt-settings-panel .yyt-list-row {
        display: grid;
        grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
        gap: 14px;
        align-items: start;
        padding: 14px 0;
        background: transparent;
        border-bottom: 1px solid var(--yyt-border);
      }

      .yyt-settings-panel .yyt-list-row:last-child {
        border-bottom: none;
      }

      .yyt-settings-panel .yyt-list-row:hover {
        background: transparent;
      }

      .yyt-settings-panel .yyt-list-row code {
        color: var(--yyt-accent-strong);
        word-break: break-word;
        font-weight: 800;
      }

      .yyt-settings-panel .yyt-list-row span {
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.7;
      }

      .yyt-settings-panel .yyt-list-row:has(.yyt-settings-runtime-meta) {
        grid-template-columns: 1fr;
      }
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},bS=sg});function xS(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>Ee(r))}function wS(t=[],e=""){let r=Ee(e);if(!r||!Array.isArray(t))return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(xS(o,s).includes(r))return s}return-1}function In(t={},e={}){let r=Ee(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let s=Ll({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||tt.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:wS(t?.chatMessages||t?.chatHistory||[],r)});return!s.slotBindingKey||!s.slotRevisionKey?null:s}async function Lc({runSource:t=tt.MANUAL}={}){let e=await bs({runSource:t});return In(e,{runSource:t})}async function vS({messageId:t,swipeId:e="",runSource:r=tt.AUTO}={}){let s=await xs({messageId:t,swipeId:e,runSource:r});return In(s,{runSource:r})}async function og(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let s=Ee(e.runSource||r?.runSource)||tt.MANUAL,o=Ee(e.messageId||r?.sourceMessageId),n=Ee(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||s===tt.AUTO?o?vS({messageId:o,swipeId:n,runSource:s}):null:Lc({runSource:s})}function ng(t,e){let r=t||null,s=e||null;return!r||!s?{valid:!1,reason:"missing_target_snapshot"}:Ee(r.sourceMessageId)!==Ee(s.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:Ee(r.sourceSwipeId||r.effectiveSwipeId)!==Ee(s.sourceSwipeId||s.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:Ee(r.slotRevisionKey)!==Ee(s.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var ni=P(()=>{ws();We()});function Cr(t,e=""){return t==null?e:String(t).trim()||e}function SS(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function TS(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function ag(t,e){if(!t)return null;let r=t[Cs];if(!r)return null;let s=Ce(e);return TS(r)?s===St?r:null:r[s]||null}function Rn({loadMode:t=ks.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:s=Rt.EMPTY,resolvedFromMessageId:o="",resolvedFromRevisionKey:n=""}={}){let a=Sr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:s,resolvedFromMessageId:Cr(o,a?.sourceMessageId||""),resolvedFromRevisionKey:Cr(n,a?.slotRevisionKey||"")}}function Oc(t,e={}){let r=Sr(t);return r?Sr({...r,meta:{...r.meta||{},...e||{}}}):null}function ig({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:s=[],isolationKey:o}={}){let n=Array.isArray(t?.chat)?t.chat:[],a=Cr(e?.slotRevisionKey,""),i=Cr(e?.slotBindingKey,""),l=Ce(o===void 0?"":o);if(r>=0&&r<n.length){let d=ag(n[r],l),c=Sr(d);if(c&&Cr(c.slotRevisionKey,"")===a)return Rn({loadMode:ks.EXACT,mergeBaseOnly:!1,state:Oc(c,{sourceKind:Rt.EXACT,isolationKey:l,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}),sourceKind:Rt.EXACT,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey});if(c&&Cr(c.slotBindingKey,"")===i){let u=Oc({...c,slotRevisionKey:a||c.slotRevisionKey,sourceSwipeId:Cr(e?.sourceSwipeId||e?.effectiveSwipeId,c.sourceSwipeId),meta:{...c.meta||{},sourceKind:Rt.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:Cr(c.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}});return Rn({loadMode:ks.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:Rt.BINDING,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey})}}if(r>0)for(let d=r-1;d>=0;d-=1){let c=n[d];if(!SS(c))continue;let u=ag(c,l),y=Sr(u);if(!y||!Array.isArray(y.tables)||y.tables.length===0)continue;let p=Oc({...y,slotBindingKey:i||y.slotBindingKey,slotRevisionKey:a||y.slotRevisionKey,sourceSwipeId:Cr(e?.sourceSwipeId||e?.effectiveSwipeId,y.sourceSwipeId),meta:{...y.meta||{},sourceKind:Rt.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey}});return Rn({loadMode:ks.HISTORY,mergeBaseOnly:!0,state:p,sourceKind:Rt.HISTORY,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey})}return Array.isArray(s)&&s.length>0?Rn({loadMode:ks.TEMPLATE,mergeBaseOnly:!1,state:dn(e,{tables:de(s),meta:{fromTemplate:!0,isolationKey:l,sourceKind:Rt.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Rt.TEMPLATE}):Rn({loadMode:ks.EMPTY,mergeBaseOnly:!1,state:dn(e,{meta:{isolationKey:l,sourceKind:Rt.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Rt.EMPTY})}var lg=P(()=>{We()});function cg(){return $c||($c=C.createScope("TableStateMirror")),$c}async function _S(t,e,r){try{await Ge(),await Oa({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),cg().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(s){cg().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:s?.message||String(s)})}}function dg(t){return t==null?"":String(t).trim()}function ES(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function zc(){try{let t=ES(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,s=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(e?.chat)?e.chat:[],n=s.length?s:o;return{topWindow:t,api:e,context:r,chat:n,contextChat:s,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function AS(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function CS(t=[],e=""){let r=dg(e);if(!Array.isArray(t)||!r)return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(!AS(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,s].map(a=>dg(a)).includes(r))return s}return-1}function Kc(t){let e=zc(),r=CS(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function li(t,e,r){let s=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...r})};s(t?.contextChat),s(t?.apiChat)}async function ci(t){let e=t?.context||null,r=t?.api||null,s=e?.saveChatDebounced||r?.saveChatDebounced||null,o=e?.saveChat||r?.saveChat||null;typeof s=="function"&&s.call(e||r),typeof o=="function"&&await o.call(e||r)}function di(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Bs(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function ai(t,e,r,s){if(!t)return null;let o=t[e];if(!o)return null;let n=Ce(r);return typeof s=="function"&&s(o)?n===St?o:null:o[n]||null}function Bc(t,e,r,s,o){if(!t)return;let n=Ce(r),a=t[e];if(typeof o=="function"&&o(a)){let i={[St]:a};i[n]=s,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[n]:s}:t[e]={[n]:s}}function ii(t,e,r,s){if(!t)return!1;let o=Ce(r),n=t[e];if(!n)return!1;if(typeof s=="function"&&s(n))return o===St?(delete t[e],!0):!1;if(n&&typeof n=="object"&&!Array.isArray(n)){if(n[o]===void 0)return!1;let a={...n};return delete a[o],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function ug(t,e={}){let{runtime:r,messageIndex:s}=Kc(t);return ig({runtime:r,targetSnapshot:t,currentMessageIndex:s,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?ue.getKey():e.isolationKey})}async function pg(t,e={}){let{runtime:r,messageIndex:s,message:o}=Kc(t);if(!o||s<0)return{success:!1,error:"target_message_not_found"};let n=e.isolationKey===void 0?ue.getKey():e.isolationKey,a=ai(o,Wr,n,Bs),i={...Ta(a),lastResolvedTarget:lo(t),updatedAt:Date.now()};return Bc(o,Wr,n,i,Bs),li(r,s,o),await ci(r),{success:!0,bindings:i}}async function ui(t,e,r={}){let s=r.skipFreshValidation===!0?t:await og(t,r),o=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:ng(t,s);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let n=s||t,{runtime:a,messageIndex:i,message:l}=Kc(n);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let d=r.isolationKey===void 0?ue.getKey():r.isolationKey,c=dn(n),u={...c.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:d},y=Sr({...c,...e,meta:u,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),p=ai(l,Wr,d,Bs),g={...Ta(p),lastResolvedTarget:lo(n),lastCommittedTarget:lo(n),updatedAt:Date.now()};return Bc(l,Cs,d,y,di),Bc(l,Wr,d,g,Bs),li(a,i,l),await ci(a),_S(n,d,y?.tables||[]).catch(()=>{}),{success:!0,state:y,bindings:g,validation:o,messageIndex:i,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function zs(t=null,e={}){let r=Nt.getAssistantMessageSnapshot(t);if(!r?.message)return null;let s=e.isolationKey===void 0?ue.getKey():e.isolationKey;return{...r,tableState:Sr(ai(r.message,Cs,s,di)),tableBindings:Ta(ai(r.message,Wr,s,Bs))}}async function yg(t,e={}){let r=zc();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let s=r.chat[t];if(!s)return{success:!1,error:"message_not_found",messageIndex:t};let o=e.isolationKey===void 0?ue.getKey():e.isolationKey,n=ii(s,Cs,o,di),a=e.clearBindings===!1?!1:ii(s,Wr,o,Bs);return(n||a)&&(li(r,t,s),await ci(r)),{success:!0,cleared:n||a,messageIndex:t,isolationKey:o}}async function fg(t={}){let e=zc(),r=Number.isFinite(t.fromMessageIndex)?t.fromMessageIndex:0,s=Number.isFinite(t.toMessageIndex)?t.toMessageIndex:(e.chat?.length||0)-1,o=t.isolationKey===void 0?ue.getKey():t.isolationKey,n=0;for(let a=r;a<=s;a++){let i=e.chat[a];if(!i)continue;let l=ii(i,Cs,o,di),d=ii(i,Wr,o,Bs);(l||d)&&(li(e,a,i),n++)}return n>0&&await ci(e),{success:!0,touched:n,from:r,to:s,isolationKey:o}}var $c,Mn=P(()=>{Ds();We();Yr();lg();ni();$a();H()});function mg(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let s=r?.order;Number.isFinite(s)&&e.add(Math.floor(s))}return e}function Uc(t,e=5e4,r=1,s=99999){for(let o=e;o<=s;o++)if(!t.has(o))return t.add(o),o;for(let o=r;o<e;o++)if(!t.has(o))return t.add(o),o;return gg.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function hg(t,e,r=5e4,s=1,o=99999){let n=o-e+1;for(let a=r;a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=s;a<r&&a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}gg.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var gg,bg=P(()=>{H();gg=C.createScope("TableWBOrder")});function Fc(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function Pn(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var Q1,Z1,xg=P(()=>{Q1=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);Z1=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function jc(t,e=""){return t==null?e:String(t).trim()||e}function RS(t){return jc(t,"default_chat").replace(/[\[\]=]/g,"_")}function MS(){let t=globalThis.window||globalThis;return jc(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function PS(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Br()?.TavernHelper||null}function NS(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function wg(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let s=e.map(l=>l.key),o=e.map(l=>l.title||l.key),n=`| ${o.join(" | ")} |`,a=`| ${o.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let d=l.cells||{};return`| ${s.map(c=>NS(d[c])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${n}
${a}
${i.join(`
`)}`}function DS(t,e){if(!Array.isArray(t)||t.length===0)return[];let r=new Map;if(Array.isArray(e))for(let s of e){let o=s?.id||s?.key;o&&r.set(o,s)}return t.map(s=>{let o=s?.id?r.get(s.id):null;return{...s,exportConfig:s?.exportConfig||o?.exportConfig||{enabled:!1},enabled:s?.enabled!==!1}})}function pi(t){return`${Sg}${kS}${RS(t)}${IS}-`}function LS(t){return`${Sg}[${jc(t,"default_chat")}]-`}function Tg(t,e){if(!t||typeof t!="string")return!1;let r=pi(e);if(t.startsWith(r))return!0;let s=LS(e);return!!t.startsWith(s)}function OS(t,e){let r=pi(t),s=String(e||"").trim();return s?`${r}${s}`:`${r}\u586B\u8868\u6570\u636E`}function vg(t,e,r){return`${pi(t)}Wrapper-${r}`}function $S(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function Nn(t,e,r,s,o,n,a){let i=r.find(l=>l.comment===s);return i&&a&&!Tg(i.comment,a)?(Mo.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${s}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:s,reason:"cross_chat_collision"}):i&&i.uid?$S(i,o)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...o}])),Mo.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${s}`),{action:"updated",comment:s}):(n.add(i.order||0),{action:"skipped",comment:s}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:s,keys:[],...o}])),Mo.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${s}`),{action:"created",comment:s}):{action:"failed",comment:s,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function _g(t,e){let r=e?.worldbookSync;if(!r?.enabled)return{skipped:!0,reason:"disabled"};let s=String(r.targetBook||"").trim();if(!s)return{skipped:!0,reason:"no_target_book"};let o=PS();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let n=MS(),a=pi(n),i=Array.isArray(e?.tables)?e.tables:[],d=DS(t,i).filter(y=>y&&y.enabled!==!1&&Array.isArray(y.rows)&&y.rows.length>0);if(d.length===0)return{skipped:!0,reason:"empty_tables"};let c=e?.wrapperConfig||{},u=c.enabled!==!1;try{let y=await Promise.resolve(o.getLorebookEntries(s));Array.isArray(y)||(y=[]);let p=mg(y),g=[],m=d.filter(T=>T.exportConfig?.enabled===!0),h=d.filter(T=>T.exportConfig?.enabled!==!0),x="";if(h.length>0&&(x=h.map(T=>wg(T)).join(`

`)),u&&(x||m.length>0)){let T=c.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",E=c.wrapperHint||"",L=c.wrapperPlacement||{},O=L.order||5e4,k=hg(p,3,O,1,99999),v=Fc(L.position,"before_character_definition"),z=Number.isFinite(L.depth)?L.depth:2,j=`<${T}>
${E}`;g.push(await Nn(o,s,y,vg(n,T,"Start"),Pn({content:j,enabled:!0,type:"constant",order:k,prevent_recursion:!0},{position:v,depth:z}),p,n)),x&&g.push(await Nn(o,s,y,`${a}\u5168\u5C40\u6570\u636E`,Pn({content:x,enabled:!0,type:"constant",order:k+1,prevent_recursion:!0},{position:v,depth:z}),p,n)),g.push(await Nn(o,s,y,vg(n,T,"End"),Pn({content:`</${T}>`,enabled:!0,type:"constant",order:k+2,prevent_recursion:!0},{position:v,depth:z}),p,n))}else if(x){let T=Uc(p,5e4,1,99999);g.push(await Nn(o,s,y,`${a}\u5168\u5C40\u6570\u636E`,{content:x,enabled:!0,type:"constant",position:"before_character_definition",order:T,prevent_recursion:!0},p,n))}for(let T of m){let E=T.exportConfig||{},L=E.entryName||T.name||"\u672A\u547D\u540D\u8868",O=OS(n,L),k=wg(T);if(!k)continue;let v=E.entryPlacement||{},z=Fc(v.position,"before_character_definition"),j=Uc(p,v.order||5e4,1,99999),q=E.entryType==="keyword"?"keyword":"constant";g.push(await Nn(o,s,y,O,Pn({content:k,enabled:!0,type:q,order:j,prevent_recursion:E.preventRecursion!==!1},{position:z,depth:v.depth||2}),p,n))}let _=new Set(g.map(T=>T.comment).filter(Boolean)),w=y.filter(T=>!T.comment||!Tg(T.comment,n)?!1:!_.has(T.comment));if(w.length>0){let T=w.map(E=>E.uid).filter(Boolean);T.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(s,T)),Mo.info(`\u5DF2\u6E05\u7406 ${T.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${n}]`))}let B=g.filter(T=>T.action==="created").length,A=g.filter(T=>T.action==="updated").length;return Mo.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${n}]\uFF1A${B} \u521B\u5EFA, ${A} \u66F4\u65B0, ${w.length} \u6E05\u7406`),{success:!0,results:g,stats:{created:B,updated:A,cleaned:w.length},targetBook:s,chatId:n}}catch(y){return Mo.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",y),{success:!1,error:y?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var Mo,Sg,kS,IS,Eg=P(()=>{ws();H();bg();xg();Mo=C.createScope("TableWorldbookSync"),Sg="YYT-",kS="[YY:chatId=",IS="]"});function yi(t,e=""){return t==null?e:String(t).trim()||e}function zS(t={}){return{tables:Array.isArray(t?.tables)?de(t.tables):[]}}function KS(t={},e={}){let r=yi(e.mirrorTag,"yyt-table-workbench"),s=zS(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(s,null,2),"```",`</${r}>`].join(`
`)}async function Ag({targetSnapshot:t,nextTables:e,config:r,loadResult:s=null,diff:o=null,fillMode:n="",skipNotify:a=!1}={}){let i=Ut(r),l=await ui(t,{tables:Array.isArray(e)?de(e):[],meta:{lastLoadMode:yi(s?.loadMode,""),lastFillMode:yi(n),mergeBaseOnly:!1,updatedBy:yi(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let d=null,c=null,u="";if(i.mirrorToMessage){let y=KS(l.state,{mirrorTag:i.mirrorTag});d=await Nt.injectDetailed(BS,y,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),d?.success||(u=d?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(c=await _g(Array.isArray(e)?e:[],i),c&&!c.success&&!c.skipped&&(u=u?`${u}; ${c.error}`:c.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:o,fillMode:n,commitResult:l,mirrorResult:d,worldbookSyncResult:c,warning:u}}var BS,Cg=P(()=>{Ds();We();Mn();lr();Eg();BS="tableWorkbenchMirror"});function US(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function Wc(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function Rg(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function FS(t,e,r,s){let o=Wc(t,e+1),n=o.char;if(!n)return r!=="key";if(r==="key")return n===":";if(n==="}"||n==="]")return!0;if(n!==",")return!1;let a=Wc(t,o.index+1).char;return a?s==="object"?a==='"'||a==="}":s==="array"?a==="]"||Rg(a):Rg(a)||a==="}"||a==="]":!0}function jS(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,s=!1,o=null,n=[],a=()=>n.length?n[n.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let d=t[l];if(s){e+=d,s=!1;continue}if(r){if(d==="\\"){e+=d,s=!0;continue}if(d==='"'){let c=a();FS(t,l,o,c?.type||null)?(e+=d,r=!1,o==="key"&&c?.type==="object"?c.expecting="colon":i(),o=null):e+='\\"';continue}e+=d;continue}if(d==='"'){e+=d,r=!0;let c=a();o=c&&c.type==="object"&&(c.expecting==="key"||c.expecting==="keyOrEnd")?"key":"value";continue}if(d==="{"){e+=d,n.push({type:"object",expecting:"keyOrEnd"});continue}if(d==="["){e+=d,n.push({type:"array",expecting:"valueOrEnd"});continue}if(d===":"){e+=d;let c=a();c?.type==="object"&&(c.expecting="value");continue}if(d===","){e+=d;let c=a();c?.type==="object"&&(c.expecting="key"),c?.type==="array"&&(c.expecting="value");continue}if(d==="}"||d==="]"){e+=d,n.pop(),i();continue}e+=d}return{success:!0,result:e,error:null}}function WS(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(r){if(n===`
`){e+="\\n";continue}if(n==="\r"){e+="\\r";continue}if(n==="	"){e+="\\t";continue}if(n==="\0"){e+="\\u0000";continue}}e+=n}return e}function HS(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(!r&&n===","){let a=Wc(t,o+1).char;if(a==="}"||a==="]")continue}e+=n}return e}function GS(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function Dn(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,s=US(r);s!==r&&e.push("normalizeQuotes"),r=s;let o=jS(r);if(!o.success)return{success:!1,result:r,layersApplied:e,error:o.error};o.result!==r&&e.push("escapeUnescapedQuotes"),r=o.result;let n=WS(r);n!==r&&e.push("sanitizeControlChars"),r=n;let a=HS(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=GS(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function qS(t,e=","){if(typeof t!="string"||!t)return[];let r=[],s="",o=!1,n=!1,a=0,i=0,l=0;for(let d=0;d<t.length;d++){let c=t[d];if(n){s+=c,n=!1;continue}if(c==="\\"){s+=c,o&&(n=!0);continue}if(c==='"'){s+=c,o=!o;continue}if(!o){if(c==="{")a++;else if(c==="}")a=Math.max(0,a-1);else if(c==="[")i++;else if(c==="]")i=Math.max(0,i-1);else if(c==="(")l++;else if(c===")")l=Math.max(0,l-1);else if(c===e&&a===0&&i===0&&l===0){s.trim()&&r.push(s.trim()),s="";continue}}s+=c}return s.trim()&&r.push(s.trim()),r}function YS(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,s=!1,o=0,n=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(s){s=!1;continue}if(l==="\\"){r&&(s=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")o++;else if(l==="}")o=Math.max(0,o-1);else if(l==="[")n++;else if(l==="]")n=Math.max(0,n-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&o===0&&n===0&&a===0)return i}}return-1}function Hc(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let s=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(s)[0],error:null}}catch(o){let n=Dn(s);if(n.success)try{return{success:!0,value:JSON.parse(n.result)[0],error:null}}catch{}return{success:!1,value:null,error:o?.message||"Failed to parse loose value"}}}function VS(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=Hc(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function Mg(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let s=qS(r,",").filter(Boolean);if(!s.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let o={},n=0;for(let i of s){let l=YS(i,":");if(l!==-1){let c=VS(i.slice(0,l)),u=Hc(i.slice(l+1));if(!c||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed segment: ${i}`};o[c]=u.value;let y=parseInt(c,10);!isNaN(y)&&String(y)===c&&(n=Math.max(n,y+1));continue}let d=Hc(i);if(!d.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(o,String(n));)n++;o[String(n)]=d.value,n++}let a=Object.keys(o).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:o,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function JS(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function XS(t){let e=JS(t);if(!e)return[];let r=[];kg.lastIndex=0;let s;for(;(s=kg.exec(e))!==null;){let i=s[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let o=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),n=/<!--([\s\S]*?)-->/g,a=[];for(;(s=n.exec(e))!==null;)o(s[1])&&a.push(s[1]);return a}function QS(t){let e=t.split(/\r?\n/),r=[],s="",o=!1;for(let a of e){let i=a.trim();if(!i||(!o&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!o?(s&&r.push(s),s=i):s+=(s?" ":"")+i,s){let d=(s.match(/\{/g)||[]).length,c=(s.match(/\}/g)||[]).length;o=d>c}}s&&r.push(s);let n=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],d;for(;(d=i.exec(a))!==null;)l.push(d.index+(d[0].length-d[1].length));if(l.length<=1)n.push(a.replace(/;\s*$/,""));else for(let c=0;c<l.length;c++){let u=l[c],y=c+1<l.length?l[c+1]:a.length,p=a.substring(u,y).replace(/;\s*$/,"").trim();p&&n.push(p)}}return n}function ZS(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let s=r[1],o=r[2],n=o.indexOf("{");if(n===-1)return{command:s,args:JSON.parse(`[${o}]`),line:e};let a=o.substring(0,n).trim(),i=o.substring(n),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:s,args:[...l,JSON.parse(i)],line:e}}catch{}let d=Mg(i);if(d.success)return{command:s,args:[...l,d.result],line:e};let c=Dn(i);if(!c.success)return null;try{return{command:s,args:[...l,JSON.parse(c.result)],line:e}}catch{}let u=Mg(c.result);return u.success?{command:s,args:[...l,u.result],line:e}:null}catch{return null}}function eT(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:s,data:o}}if(e==="deleteRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:s,rowIndex:o}}if(e==="updateRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0,n=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:s,rowIndex:o,data:n}}return null}function Gc(t){let e=XS(t);if(!e.length)return null;let r=[],s=[];for(let o of e){let n=o.replace(/<!--|-->/g,"").trim();if(!n)continue;let a=QS(n);for(let i of a){let l=ZS(i),d=eT(l);d?r.push(d):i&&/^(insertRow|updateRow|deleteRow)/.test(i)&&s.push(i.slice(0,200))}}if(s.length>0)try{console.warn("[TableJsonSanitizer] parseIncrementalEdits: %d \u6761\u6307\u4EE4\u89E3\u6790\u5931\u8D25",s.length,s)}catch{}return r.length?r:null}function qc(t){Ig.lastIndex=0;let e;for(;(e=Ig.exec(t))!==null;){let g=e[1].trim();if(g)try{return JSON.parse(g)}catch{let h=Dn(g);if(h.success)try{return JSON.parse(h.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let s=Dn(r);if(s.success)try{return JSON.parse(s.result)}catch{}let o=r.indexOf("{"),n=r.indexOf("["),a=-1,i="",l="";if(o!==-1&&(n===-1||o<n)?(a=o,i="{",l="}"):n!==-1&&(a=n,i="[",l="]"),a===-1)return null;let d=0,c=-1,u=!1,y=!1;for(let g=a;g<r.length;g++){let m=r[g];if(y){y=!1;continue}if(m==="\\"&&u){y=!0;continue}if(m==='"'){u=!u;continue}if(!u){if(m===i)d++;else if(m===l&&(d--,d===0)){c=g;break}}}if(c===-1)return null;let p=r.substring(a,c+1);try{return JSON.parse(p)}catch{let m=Dn(p);if(m.success)try{return JSON.parse(m.result)}catch{}}return null}function Pg(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=Gc(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=qc(t);if(r){let s=null;if(Array.isArray(r))s=r;else if(r&&Array.isArray(r.tables))s=r.tables;else if(r&&typeof r=="object"){for(let o of Object.values(r))if(Array.isArray(o)){s=o;break}}if(Array.isArray(s))return{mode:"full",edits:null,tables:s}}return{mode:"empty",edits:null,tables:null}}var kg,Ig,fi=P(()=>{kg=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,Ig=/```(?:json)?\s*([\s\S]*?)```/gi});var tT,rT,Ng,Dg=P(()=>{fi();tT=/<tableEdit>[\s\S]*?<\/tableEdit>/i,rT=/(insertRow|updateRow|deleteRow)\s*\(/,Ng=Object.freeze({formatId:"dsl",displayName:"<tableEdit> DSL \u589E\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:tT.test(t)||rT.test(t)},parse(t){let e=Gc(t);return!Array.isArray(e)||e.length===0?null:{mode:"incremental",edits:e,tables:null}}})});function Og(t){if(typeof t!="string")return t;let e=t.trim();return e.startsWith("'")&&e.endsWith("'")||e.startsWith('"')&&e.endsWith('"')?e.slice(1,-1).replace(/''/g,"'").replace(/\\'/g,"'"):e}function Yc(t){let e=String(t||"").match(/(\d+)$/);return e?parseInt(e[1],10):0}function $g(t){let e=String(t||"").match(/row_id\s*=\s*(\d+)/i);return e?parseInt(e[1],10):-1}function sT(t){let e=t.match(/INSERT\s+INTO\s+(\S+)\s*\(([^)]*)\)\s*VALUES\s*\(([^)]*)\)/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(l=>l.trim()),a=o.split(",").map(l=>Og(l.trim())),i={};return n.forEach((l,d)=>{l!=="row_id"&&a[d]!==void 0&&(i[l]=a[d])}),{op:"insertRow",tableIndex:Yc(r),data:i}}function oT(t){let e=t.match(/UPDATE\s+(\S+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+?);?$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n={},a=s.split(/,(?![^()]*\))/);for(let i of a){let l=i.indexOf("=");if(l<0)continue;let d=i.slice(0,l).trim(),c=Og(i.slice(l+1).trim());d&&d!=="row_id"&&(n[d]=c)}return{op:"updateRow",tableIndex:Yc(r),rowIndex:$g(o),data:n}}function nT(t){let e=t.match(/DELETE\s+FROM\s+(\S+)\s+WHERE\s+([\s\S]+?);?$/i);return e?{op:"deleteRow",tableIndex:Yc(e[1]),rowIndex:$g(e[2])}:null}function aT(t){let e=[];Lg.lastIndex=0;let r;for(;(r=Lg.exec(t))!==null;){let s=r[0].trim(),o=null;/^INSERT/i.test(s)?o=sT(s):/^UPDATE/i.test(s)?o=oT(s):/^DELETE/i.test(s)&&(o=nT(s)),o&&e.push(o)}return e}var Ln,Lg,Bg,zg=P(()=>{Ln=/<sql>([\s\S]*?)<\/sql>/gi,Lg=/(INSERT\s+INTO\s+\S+[\s\S]*?;)|(UPDATE\s+\S+\s+SET[\s\S]*?;)|(DELETE\s+FROM\s+\S+[\s\S]*?;)/gi;Bg=Object.freeze({formatId:"sql",displayName:"SQL \u534F\u8BAE\uFF08INSERT/UPDATE/DELETE\uFF09",detect(t){return!t||typeof t!="string"?!1:Ln.test(t)?(Ln.lastIndex=0,!0):(Ln.lastIndex=0,/\b(INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM)\b/i.test(t))},parse(t){let e="";Ln.lastIndex=0;let r,s=[];for(;(r=Ln.exec(t))!==null;)s.push(r[1]);s.length>0?e=s.join(`
`):e=t;let o=aT(e);return!Array.isArray(o)||o.length===0?null:{mode:"incremental",edits:o,tables:null}}})});var Kg,Ug=P(()=>{fi();Kg=Object.freeze({formatId:"full-json",displayName:"JSON envelope \u5168\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:/```json/i.test(t)||/\{[\s\S]*?"tables"\s*:/i.test(t)},parse(t){let e=qc(t);if(!e)return null;let r=null;if(Array.isArray(e))r=e;else if(e&&Array.isArray(e.tables))r=e.tables;else if(e&&typeof e=="object"){for(let s of Object.values(e))if(Array.isArray(s)){r=s;break}}return!Array.isArray(r)||r.length===0?null:{mode:"full",edits:null,tables:r}}})});function gi(){return Vc||(Vc=C.createScope("AiProtocolAdapter")),Vc}function Fg(t){if(!t||typeof t!="string")return null;for(let e of iT){let r=!1;try{r=e.detect(t)}catch(s){gi().warn(`adapter ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&(s.mode==="incremental"||s.mode==="full")&&(s.mode==="incremental"&&Array.isArray(s.edits)&&s.edits.length>0||s.mode==="full"&&Array.isArray(s.tables)&&s.tables.length>0))return gi().info("AI \u534F\u8BAE\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,mode:s.mode,editsCount:s.edits?.length,tablesCount:s.tables?.length}),{...s,rawFormat:e.formatId}}catch(s){gi().warn(`adapter ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return gi().warn("parseAiResponseAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{responseLength:t.length}),null}var Vc,iT,jg=P(()=>{H();Dg();zg();Ug();iT=Object.freeze([Ng,Bg,Kg])});function lT(t,e){let r=new Map;Array.isArray(t)&&t.forEach((n,a)=>{n&&typeof n=="object"&&r.set(n.name||`__row_${a}`,n)});let s=new Map;Array.isArray(e)&&e.forEach((n,a)=>{n&&typeof n=="object"&&s.set(n.name||`__row_${a}`,n)});let o={};for(let[n,a]of s){let i=r.get(n);if(i){o[n]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let d of l){let c=String((i.cells&&i.cells[d])??""),u=String((a.cells&&a.cells[d])??"");o[n][d]=c===u?"unchanged":"updated"}o[n].__rowStatus="kept"}else{if(o[n]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))o[n][l]="new";o[n].__rowStatus="new"}}for(let[n]of r)s.has(n)||(o[n]={__rowStatus:"deleted"});return o}function Wg(t,e){let r=Array.isArray(t)?de(t):[],s=Array.isArray(e)?de(e):[],o={},n=Math.max(r.length,s.length);for(let a=0;a<n;a++){let i=r[a],l=s[a];!i&&l?(o[a]={},Array.isArray(l.rows)&&l.rows.forEach(d=>{let c=d.name||`__row_${l.rows.indexOf(d)}`;o[a][c]={__rowStatus:"new"}})):i&&!l?(o[a]={},Array.isArray(i.rows)&&i.rows.forEach(d=>{let c=d.name||`__row_${i.rows.indexOf(d)}`;o[a][c]={__rowStatus:"deleted"}})):i&&l&&(o[a]=lT(i.rows,l.rows))}return o}var Hg=P(()=>{We()});function cT(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function Gg(){return cT()}var qg=P(()=>{});function uT(){return Jc||(Jc=C.createScope("TableLock")),Jc}function Ks(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Jg(){let t=Vg.get(Yg,{});return Ks(t)?t:{}}function pT(t){Vg.set(Yg,t)}function On(t){let e=Jg();return Ks(e[t])?e[t]:{}}function Xc(t,e){let r=Jg();r[t]=e,pT(r),yT(t,e).catch(()=>{})}async function yT(t,e){try{let{chatKey:r,isolationKey:s}=(()=>{let n=String(t||"").indexOf("::");return n===-1?{chatKey:String(t||""),isolationKey:""}:{chatKey:t.slice(0,n),isolationKey:t.slice(n+2)}})();if(!r)return;let o=await Promise.resolve().then(()=>($a(),ic));await o.ensureTableDataReady(),await o.clearScopeLocks({chatId:r,isolationKey:s});for(let[n,a]of Object.entries(e||{})){if(!Ks(a))continue;let i={chatId:r,isolationKey:s};if(Array.isArray(a.rows))for(let l of a.rows)Number.isFinite(l)&&await o.setLockEntry(i,n,"row",String(l));if(Array.isArray(a.cols))for(let l of a.cols)typeof l=="string"&&l&&await o.setLockEntry(i,n,"column",l);if(Array.isArray(a.cells))for(let l of a.cells)typeof l=="string"&&l.includes(":")&&await o.setLockEntry(i,n,"cell",l);a.indexColumn===!0&&await o.setLockEntry(i,n,"index_column","")}}catch(r){uT().warn("lock-service SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function $n(t){let e=Jp();return Ks(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,s)=>r-s)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function Bn(t){if(typeof t=="string")return t;if(Ks(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:ue.getKey();return un(t.chatId,e)}}return un("",ue.getKey())}function fT(t,e){let r=On(t),s={};if(!Array.isArray(e))return s;for(let o=0;o<e.length;o++){let n=e[o];if(!n)continue;let a=n.uid||n.id||"";a&&r[a]&&(s[o]=$n(r[a]))}return s}function Po(t,e){let r=Bn(t),s=On(r);return $n(s[e])}function Xg(t,e,r,s=!0){if(!e||!Number.isFinite(r))return!1;let o=Bn(t),n=On(o),a=$n(n[e]),i=Math.floor(r),l=a.rows.includes(i);if(s&&!l)a.rows.push(i),a.rows.sort((d,c)=>d-c);else if(!s&&l)a.rows=a.rows.filter(d=>d!==i);else return!1;return n[e]=a,Xc(o,n),!0}function Qg(t,e,r,s=!0){if(!e||!r)return!1;let o=Bn(t),n=On(o),a=$n(n[e]),i=a.cols.includes(r);if(s&&!i)a.cols.push(r);else if(!s&&i)a.cols=a.cols.filter(l=>l!==r);else return!1;return n[e]=a,Xc(o,n),!0}function Zg(t,e,r,s,o=!0){if(!e||!s||!Number.isFinite(r))return!1;let n=Bn(t),a=On(n),i=$n(a[e]),l=Xp(r,-1)==="-1:-1"?`${r}:${s}`:`${r}:${s}`,d=`${Math.floor(r)}:${s}`,c=i.cells.includes(d);if(o&&!c)i.cells.push(d);else if(!o&&c)i.cells=i.cells.filter(u=>u!==d);else return!1;return a[e]=i,Xc(n,a),!0}function em(t,e=[]){let r=Bn(t);return fT(r,e)}function tm(t,e,r,s){if(!Ks(t))return!1;let o=t[e];if(!o)return!1;if(Number.isFinite(r)&&o.rows.includes(r)||typeof s=="string"&&s.length>0&&o.cols.includes(s))return!0;if(Number.isFinite(r)&&typeof s=="string"&&s.length>0){let n=`${r}:${s}`;if(o.cells.includes(n))return!0}return!1}function Qc(t,e,r){if(!Ks(t))return!1;let s=t[e];return s?Number.isFinite(r)&&s.rows.includes(r):!1}var dT,Yg,Jc,Vg,Zc=P(()=>{Fe();H();We();Yr();dT="tableLocks",Yg="scopes";Vg=$.namespace(dT)});function gT(){return ed||(ed=C.createScope("TableAutoSchedule")),ed}function sm(t,e,r){let s=Ce(e||St);return`${String(t||"")}::${s}::${String(r||"")}`}function mT(t,e,r){if(!r)return null;let s=rm.get(sm(t,e,r),null);return s&&typeof s=="object"?s:null}function hT(t,e,r,s){if(!r)return;let o=Number.isFinite(s)?s:-1;rm.set(sm(t,e,r),{lastMessageIndex:o,lastUpdatedAt:new Date().toISOString()})}function om(t,e,r=[],s){for(let o of r)hT(t,e,o,s)}function nm({chatId:t,isolationKey:e,currentMessageIndex:r,scopeTables:s=[]}){let o=new Set,n={};for(let a of s){let i=a?.id||a?.uid||"";if(!i)continue;if(a?.enabled===!1){n[i]="disabled";continue}let l=a?.updateConfig?.updateFrequency;if(!Number.isFinite(l)||l===-1){o.add(i);continue}if(l===0){n[i]="frequency_zero";continue}if(l>=1){let d=mT(t,e,i);if(!d||!Number.isFinite(d.lastMessageIndex)){o.add(i);continue}let c=r-d.lastMessageIndex;c>=l?o.add(i):n[i]=`frequency_not_met (${c}/${l})`}else o.add(i)}return gT().info("buildAutoSchedulePlan",{chatId:t,isolationKey:e,currentMessageIndex:r,shouldUpdateCount:o.size,skipReasonsCount:Object.keys(n).length,shouldUpdateTables:[...o],skipReasons:n}),{shouldUpdate:o,skipReasons:n}}var rm,ed,am=P(()=>{Fe();H();We();rm=$.namespace("tableAutoSchedule")});function bT(t){let e=Fg(t);return e&&(e.mode==="incremental"||e.mode==="full")?e:Pg(t)}function xe(){return C.createScope("TableUpdate")}function wT(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let s,o=()=>{clearTimeout(s);try{e?.removeEventListener?.("abort",o)}catch{}r(!1)};s=setTimeout(()=>{try{e?.removeEventListener?.("abort",o)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",o)}catch{}})}function V(t,e=""){return t==null?e:String(t).trim()||e}function im(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let s=r==="assistant_only"?t.filter(o=>o?.role==="assistant"):t;return s.slice(Math.max(s.length-e,0)).map(o=>`[${V(o?.role,"unknown")}] ${String(o?.content||"").trim()}`).filter(Boolean).join(`

`)}function lm(t,{extractTags:e=[],useGlobalRules:r=!1,regexPresetId:s=""}={}){if(!t)return t;let o=Array.isArray(e)&&e.length>0,n=typeof s=="string"&&s.trim().length>0;if(!o&&!r&&!n)return t;try{let a=[],i=[];if(n)try{let l=Ae.getPreset(s);if(l){let d=Array.isArray(l.rules)?l.rules.filter(c=>c&&c.enabled!==!1&&c.value):[];a.push(...d),Array.isArray(l.blacklist)&&i.push(...l.blacklist.map(c=>String(c||"").trim()).filter(Boolean))}else xe().warn("applyContextExtractionRules: \u627E\u4E0D\u5230\u6B63\u5219\u9884\u8BBE",{regexPresetId:s})}catch(l){xe().warn("applyContextExtractionRules: \u52A0\u8F7D\u6B63\u5219\u9884\u8BBE\u5931\u8D25",l)}if(o&&a.push(...e.map(l=>{let d=String(l||"").trim();return d.startsWith("regex:")?{type:"regex_include",value:d.slice(6).trim(),enabled:!0}:{type:"include",value:d,enabled:!0}}).filter(l=>l.value)),r){let l=Js()||[];a=[...a,...l.filter(d=>d?.enabled)],i=[...i,...Xs()||[]]}return a.length===0&&i.length===0?t:xr(t,a,i)||t}catch(a){return xe().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",a),t}}function vT(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let s=Array.isArray(r?.rows)?r.rows:[];return e===0||s.length<=e?r:{...r,rows:s.slice(s.length-e)}})}function ST(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let s=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},o=Array.isArray(e?.columns)?e.columns:[],n=[`\u8868 ${r}: ${V(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${V(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${V(s.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${V(s.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${V(s.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${V(s.delete,"\u65E0")}`,"\u5B57\u6BB5\uFF08\u8BF7\u7528\u5217\u7D22\u5F15\u4F5C\u4E3A data key\uFF09:"];return o.forEach((a,i)=>{n.push(`- [${i}]: ${V(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} \u2014 ${V(a?.description,"\u65E0")}`)}),n.join(`
`)}).join(`

`)}function TT(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((o,n)=>{let a=V(o?.name,`\u8868${n+1}`),i=t.includes(o,n);return`\u8868 ${n}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((o,n)=>!t.includes(o,n))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function um(t={},e=0,r=[]){let s=t&&typeof t=="object"?t:{},o=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:{},n={},a=Array.isArray(r)?r.map(l=>V(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(o),...a]).forEach(l=>{n[l]=V(o[l],"")}),{...s,id:cn(s.id||s.rowId,e),name:V(s.name,""),cells:n}}function Fs(t={},e=0){let r=t&&typeof t=="object"?t:{},s=Array.isArray(r.columns)?de(r.columns):[],o=Array.isArray(r.rows)?r.rows.map((n,a)=>um(n,a,s)):[];return{...r,id:Yt(r.id||r.key,e),rows:o}}function gr(t=[]){return Array.isArray(t)?t.map((e,r)=>Fs(e,r)):[]}function _T(t=[],e=[],r){let s=gr(t),o=gr(e);if(!r)return o;let n=new Map(o.map((u,y)=>[Yt(u?.id||u?.key,y),u])),a=s.map((u,y)=>({table:u,tableIndex:y,id:Yt(u?.id||u?.key,y)})).filter(({table:u,tableIndex:y})=>r.includes(u,y)),i=new Set,l=new Map;for(let u=0;u<o.length;u++){let y=o[u],p=Yt(y?.id||y?.key,u);n.has(p)&&(l.set(p,y),i.add(p))}let d=0,c=o.filter((u,y)=>{let p=Yt(u?.id||u?.key,y);return!i.has(p)});return s.map((u,y)=>{let p=Yt(u?.id||u?.key,y);if(!r.includes(u,y))return Fs(u,y);let g=l.get(p);if(g)return Fs(g,y);let m=c[d];return m?(d++,Fs({...m,id:u.id||m.id},y)):Fs(u,y)})}function ET(t=[],e=[],r,s={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let o=gr(e),n=[],a=0,i=0;for(let l of t){let d=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(d<0||d>=o.length){a++;continue}let c=o[d];if(!r.includes(c,d)){a++;continue}if(l.op===co.INSERT_ROW){n.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(c?.rows)?c.rows.length:0)){a++;continue}if(l.op===co.DELETE_ROW){if(Qc(s,d,u)){i++;continue}n.push(l);continue}n.push(l)}return{edits:n,stats:{total:t.length,passed:n.length,droppedByScope:a,droppedByLock:i}}}function AT(t=[],e){let r=gr(t);return e?r.map((s,o)=>{let n=Array.isArray(s?.columns)?s.columns:[];return e.includes(s,o)?{...Fs(s,o),scopeEditable:!0,scopeStatus:"editable"}:{...Fs(s,o),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(s?.rows)?s.rows.map((a,i)=>um(a,i,n)):[]}}):r}function CT(t,e,r){return{target:{sourceMessageId:V(t?.sourceMessageId),sourceSwipeId:V(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:V(t?.slotBindingKey),slotRevisionKey:V(t?.slotRevisionKey),slotTransactionId:V(t?.slotTransactionId)},loadMode:V(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:V(e?.resolvedFromMessageId),resolvedFromRevisionKey:V(e?.resolvedFromRevisionKey),sourceKind:V(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:AT(e?.state?.tables,r)}}function cm(){return kT}function dm(t,e){if(!t||typeof t!="string")return{key:t,source:"fallback"};if(!Array.isArray(e)||e.length===0)return{key:t,source:"fallback"};for(let s of e)if(s?.key===t)return{key:t,source:"direct"};if(/^\d+$/.test(t)){let s=parseInt(t,10);if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"index"}}let r=t.match(/^col(?:_(\d+))?$/i);if(r){let s=r[1]?parseInt(r[1],10)-1:0;if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"col_n"}}return{key:t,source:"fallback"}}function IT(t,e,r,s=null){let o=gr(t||[]),n=r||{},a={direct:0,index:0,col_n:0,fallback:0},i={},l={};if(Array.isArray(e))for(let d of e){let c=Number.isFinite(d?.tableIndex)?d.tableIndex:-1;i[c]=(i[c]||0)+1,l[d?.op||"unknown"]=(l[d?.op||"unknown"]||0)+1}xe().info("applyIncrementalEdits \u603B\u89C8",{totalEdits:e?.length||0,tableCount:o.length,editsByTable:i,editsByOp:l});for(let d of e){let c=d.tableIndex;if(c<0||c>=o.length)continue;let u=o[c];if(!u||!Array.isArray(u.rows)||s&&!s.includes(u,c))continue;if(d.op===co.INSERT_ROW){let p={id:ln("row"),name:"",cells:{}};if(d.data&&typeof d.data=="object"){p.name=V(d.data.name,"");let m=Array.isArray(u.columns)?u.columns:[];for(let[h,x]of Object.entries(d.data)){if(h==="name")continue;let{key:_,source:w}=dm(h,m);p.cells[_]=V(x),a[w]=(a[w]||0)+1}}Object.keys(p.cells).length===0&&!p.name&&xe().warn("applyIncrementalEdits: \u63D2\u5165\u7A7A\u884C\uFF08data \u89E3\u6790\u4E3A\u7A7A\uFF09",{tableIndex:c,tableName:u.name,editDataKeys:d.data?Object.keys(d.data):[],editDataPreview:JSON.stringify(d.data||{}).slice(0,200)}),u.rows.push(p);continue}let y=d.rowIndex;if(!(y<0||y>=u.rows.length)){if(d.op===co.DELETE_ROW){if(Qc(n,c,y))continue;u.rows.splice(y,1);continue}if(d.op===co.UPDATE_ROW){let p=u.rows[y];if(!p)continue;if(p.id=cn(p.id||p.rowId,y),p.cells=p.cells||{},d.data&&typeof d.data=="object"){let g=Array.isArray(u.columns)?u.columns:[];for(let[m,h]of Object.entries(d.data)){if(m==="name")continue;let{key:x,source:_}=dm(m,g);tm(n,c,y,x)||(p.cells[x]=V(h),a[_]=(a[_]||0)+1)}d.data.name!==void 0&&(p.name=V(d.data.name,p.name))}}}}return Object.values(a).some(d=>d>0)&&xe().info("\u5217 key \u89E3\u6790\u7EDF\u8BA1",a),gr(o)}async function RT({executionContext:t,targetSnapshot:e,loadResult:r,config:s,assistantSnapshot:o,fillMode:n,runScope:a}={}){let i=Ut(s),l=n==="incremental"||!n&&i.fillMode!=="full",d=fy(i,{skipResponseContract:l}),c=CT(e,r,a),u=Array.isArray(o?.tableState?.tables)?gr(o.tableState.tables):[],y=t?.chatHistory||t?.chatMessages||[],{contextDepth:p,contextRoles:g,contextExtractTags:m,contextUseGlobalRules:h,sendLatestRows:x}=i,_=i?.extraction?.regexPresetId||"",w=im(y,p,g),B=im(y,p,"all"),A=lm(w,{extractTags:m,useGlobalRules:h,regexPresetId:_}),T=lm(B,{extractTags:m,useGlobalRules:h,regexPresetId:_}),E=await la({worldbooks:i.worldbooks}),L=vT(c.tables,x),O={...c,tables:L},k={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:A,rawRecentMessagesText:T,toolWorldbookContent:E,tableGuidance:ST(i.tables),tableScopeGuidance:TT(a,c.tables),injectedContext:o?.injectedContext||Nt.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(O,null,2),extractedContent:JSON.stringify(O,null,2),previousToolOutput:JSON.stringify(u,null,2)},v=await Ls.buildToolMessages(d,k),z=await Ls.buildPromptText(d,k);if(l&&(z+=cm(),Array.isArray(v)&&v.length>0)){let q=v[v.length-1];q&&typeof q.content=="string"&&(q.content+=cm())}if(!Array.isArray(v)||v.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");let j=i.apiPreset||"";try{let q=Array.isArray(c?.tables)?c.tables:[],ye=q.filter(se=>se?.scopeEditable!==!1).map(se=>V(se?.updateConfig?.apiPreset,"")).filter(Boolean);ye.length>0&&ye.every(se=>se===ye[0])&&(j=ye[0],xe().info("L3: \u8868\u7EA7 API \u9884\u8BBE\u751F\u6548",{preset:j,affectedTables:q.filter(se=>se?.scopeEditable!==!1).map(se=>se?.name||se?.id)}))}catch(q){xe().warn("L3 \u8868\u7EA7 API \u9884\u8BBE\u89E3\u6790\u5931\u8D25\uFF0C\u7528\u5168\u5C40",q)}return{toolConfig:d,context:k,requestPayload:c,promptText:z,messages:v,fillMode:l?"incremental":"full",effectiveApiPreset:j,runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function MT(t,e={},r=null){let s=Ut(e),o=V(e?._effectiveApiPreset||s.apiPreset,"");if(o){if(!Wo(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return Ui(o,t,{},r)}return Ho(t,{},r)}function kr({status:t=ke.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:s=Date.now(),error:o=""}={}){return{lastAutoRunAt:s,lastAutoStatus:V(t,ke.IDLE),lastAutoMessageId:V(e?.sourceMessageId,""),lastAutoRevisionKey:V(e?.slotRevisionKey,""),lastAutoSkipReason:V(r,""),...o?{lastError:o,lastErrorDetails:[o]}:{}}}function fr(t={},e=tt.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?yy(r):null}function Us({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:s="",warning:o="",writeback:n=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:d=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:V(t?.sourceMessageId,""),sourceSwipeId:V(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:V(t?.slotRevisionKey,""),writebackStatus:n?.success===!0?"success":o?"warning":"",refreshConfirmed:n?.mirrorResult?.refreshConfirmed===!0,warning:V(o,""),skipReason:V(s,""),aborted:a===!0,stale:i===!0,abortReason:V(l,""),error:V(d,"")}}function hi(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function zn(t=null,e={}){return ym({configInput:t,runSource:tt.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>bs({runSource:tt.MANUAL}),targetResolver:r=>In(r,{runSource:tt.MANUAL})})}async function pm({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:s=null,signal:o=null,shouldAbortWriteback:n=null}={}){return ym({configInput:s,runSource:tt.AUTO,autoMeta:{sourceEvent:r,messageId:V(t,""),swipeId:V(e,""),signal:o,shouldAbortWriteback:n},executionContextBuilder:()=>xs({messageId:t,swipeId:e,runSource:tt.AUTO}),targetResolver:a=>In(a,{runSource:tt.AUTO})})}async function ym({configInput:t=null,runSource:e=tt.MANUAL,executionContextBuilder:r,targetResolver:s,autoMeta:o=null,clearBeforeUpdate:n=!1}={}){let a=Ut(t||Ne()),i=Hl(a),l=Ia({tables:Array.isArray(a.tables)?a.tables:[]}),d=e===tt.AUTO,c=Date.now();if(xe().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:d,fillMode:a.fillMode}),!i.valid||!l.valid){let m=[...i.errors,...l.errors];return xe().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:m}),fr({lastStatus:ke.ERROR,lastRunAt:c,lastDurationMs:0,lastError:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:m,lastValidationSummary:l.summary||{errorCount:m.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...d?kr({status:ke.ERROR,startedAt:c,skipReason:"invalid_config",error:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:m.join(`
`),errors:m,...d?{meta:Us({startedAt:c,status:ke.ERROR,skipReason:"invalid_config",error:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},y=Array.isArray(a.tables)?a.tables:[];try{let h=So({})?.template?.tables;if(Array.isArray(h)&&h.length>0){let x=a.tableEnabledOverrides&&typeof a.tableEnabledOverrides=="object"?a.tableEnabledOverrides:{};if(y=h.map(w=>{let B=w?.id,A=B&&Object.prototype.hasOwnProperty.call(x,B)?x[B]:void 0,T=A!==void 0?A:w.enabled!==!1;return{...w,enabled:T}}),d){let w=Number.isFinite(targetSnapshot?.targetMessageIndex)?targetSnapshot.targetMessageIndex:-1,B=nm({chatId:targetSnapshot?.chatId||"",isolationKey:ue.getKey?ue.getKey():"",currentMessageIndex:w,scopeTables:y});y=y.map(A=>{let T=A?.id||A?.uid||"";return T&&!B.shouldUpdate.has(T)?{...A,enabled:!1}:A})}let _=y.filter(w=>w.enabled===!1).map(w=>w?.name||w?.id);_.length>0&&xe().info("scopeTables: \u7528\u6237\u7981\u7528\u4E86\u90E8\u5206\u8868",{disabledCount:_.length,disabledNames:_})}}catch{}let p=Qp(a.scope||a,y);if(xe().info("runScope \u5DF2\u89E3\u6790",{mode:p.mode,requestedMode:p.requestedMode,staleScope:p.staleScope,scopeTablesCount:Array.isArray(y)?y.length:0,allowedTableIds:p.allowedTableIds,allTableIds:p.allTableIds,scopeTablesEnabled:Array.isArray(y)?y.map(m=>({id:m?.id,name:m?.name,enabled:m?.enabled})):[]}),p.staleScope&&xe().warn("runScope: \u68C0\u6D4B\u5230 stale scope\uFF08activeTableId/selectedTableIds \u4E0D\u5728\u5F53\u524D tables \u8303\u56F4\u5185\uFF09\uFF0C\u5DF2\u81EA\u52A8 fallback \u5230 enabled",{requestedMode:p.requestedMode,requestedActiveTableId:p.activeTableId,requestedSelectedTableIds:p.selectedTableIds}),(p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let m=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return xe().warn(m,{mode:p.mode}),fr({lastStatus:ke.ERROR,lastRunAt:c,lastDurationMs:0,lastError:m,lastErrorDetails:[m]},e),{success:!1,error:m,errors:[m]}}let g=null;fr({lastStatus:ke.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:V(p.mode,""),...d?kr({status:ke.RUNNING,startedAt:c,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof s!="function")throw new Error("table_update_missing_target_resolver");let m=await r();xe().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let h=s(m);if(!h)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");g=h,xe().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:h.sourceMessageId,slotRevisionKey:h.slotRevisionKey}),d&&fr(kr({status:ke.RUNNING,targetSnapshot:h,startedAt:c,skipReason:""}),e);let x=V(a.autoUpdateTrigger,"assistantMessage");if(d&&(!a.autoUpdateEnabled||x!=="assistantMessage")){let Y=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return fr(kr({status:ke.SKIPPED,targetSnapshot:h,startedAt:c,skipReason:Y}),e),{success:!1,skipped:!0,reason:Y,targetSnapshot:h,meta:Us({targetSnapshot:h,startedAt:c,status:ke.SKIPPED,skipReason:Y})}}if(d){let Y=hi(o);if(Y)return fr(kr({status:ke.ABORTED,targetSnapshot:h,startedAt:c,skipReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:Us({targetSnapshot:h,startedAt:c,status:ke.ABORTED,skipReason:Y.reason,aborted:Y.aborted===!0,stale:Y.stale===!0,abortReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let _=await pg(h);if(!_?.success)throw new Error(_?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(n&&Number.isFinite(h?.targetMessageIndex)&&h.targetMessageIndex>=0){xe().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:h.targetMessageIndex});try{let Y=await yg(h.targetMessageIndex);xe().info("clearBeforeUpdate \u5B8C\u6210",Y)}catch(Y){xe().error("clearBeforeUpdate \u5931\u8D25",Y)}}let w=zs(h.sourceMessageId),B=Array.isArray(y)&&y.length>0?y:a.tables;xe().info("templateTables \u6765\u6E90",{usingActiveTemplate:y!==(Array.isArray(a.tables)?a.tables:[]),tableCount:Array.isArray(B)?B.length:0,firstTableName:B?.[0]?.name||"",firstTableId:B?.[0]?.id||""});let A=ug(h,{templateTables:B}),T=gr(A?.state?.tables||[]),E=Gg(),L=o?.signal||m?.signal||null;xe().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:A?.loadMode,sourceKind:A?.sourceKind,tableCount:T.length});let O=await E.buildRequest({buildRequest:RT},{executionContext:m,targetSnapshot:h,loadResult:A,config:a,assistantSnapshot:w,runScope:p});xe().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:O?.messages?.length,fillMode:O?.fillMode});let k="",v=null,z=null;for(let Y=1;Y<=mi;Y++){if(L?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(k=await E.sendRequest({sendRequest:MT},O,{config:{...a,_effectiveApiPreset:O?.effectiveApiPreset||""},abortSignal:L}),xe().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:Y,responseLength:k?.length||0}),v=E.parseResponse({parseResponse:bT},k),xe().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:Y,mode:v?.mode,hasEdits:!!v?.edits,hasTables:!!v?.tables,rawFormat:v?.rawFormat}),!(v?.mode==="incremental"&&Array.isArray(v.edits)&&v.edits.length>0||v?.mode==="full"&&v?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");z=null;break}catch(fe){if(z=fe,xe().warn(`\u586B\u8868 attempt ${Y}/${mi} \u5931\u8D25`,{error:fe?.message||String(fe)}),Y<mi&&!await wT(xT,L))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(z)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${mi} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${z?.message||String(z)}`);let j,q=null,ye=O.fillMode||"full",se=null;if(v.mode==="incremental"&&v.edits){let Y=em(A?.state,T),fe=ET(v.edits,T,p,Y);se=fe.stats,j=IT(T,fe.edits,Y,p),ye="incremental",(se.droppedByScope>0||se.droppedByLock>0)&&xe().info("scope \u8FC7\u6EE4",se)}else if(v.mode==="full"&&v.tables){let Y=gr(v.tables);j=_T(T,Y,p),ye="full"}else j=gr(T);if(q=Wg(T,j),xe().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:ye}),d){let Y=hi(o);if(Y)return fr(kr({status:ke.ABORTED,targetSnapshot:h,startedAt:c,skipReason:Y.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:Us({targetSnapshot:h,startedAt:c,status:ke.ABORTED,aborted:Y.aborted===!0,stale:Y.stale===!0,abortReason:Y.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let oe=await Ag({targetSnapshot:h,nextTables:j,config:a,loadResult:A,diff:q,fillMode:ye,skipNotify:d});if(d){let Y=hi(o);if(Y)return fr(kr({status:ke.ABORTED,targetSnapshot:h,startedAt:c,skipReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,loadResult:A,request:O,responseText:k,parsed:v,fillMode:ye,diff:q,previousTables:T,nextTables:j,runScope:p,state:oe?.state,bindings:oe?.bindings,mirrorResult:oe?.mirrorResult,warning:oe?.warning||"",meta:Us({targetSnapshot:h,startedAt:c,status:ke.ABORTED,warning:oe?.warning||"",writeback:oe,aborted:Y.aborted===!0,stale:Y.stale===!0,abortReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!oe?.success)throw new Error(oe?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");if(d)try{let Y=Number.isFinite(h?.targetMessageIndex)?h.targetMessageIndex:-1,fe=y.filter(we=>we?.enabled!==!1&&(we?.id||we?.uid)).map(we=>we.id||we.uid);fe.length>0&&Y>=0&&om(h?.chatId||"",ue.getKey?ue.getKey():"",fe,Y)}catch(Y){xe().warn("recordTablesUpdated \u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",Y)}let Te=Date.now()-c;xe().info(`\u586B\u8868\u5B8C\u6210 [${ye}] ${Te}ms`,{success:!0,writebackSuccess:oe?.success,mirrorSuccess:oe?.mirrorResult?.success});let Ue={lastStatus:ke.SUCCESS,lastRunAt:Date.now(),lastDurationMs:Te,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:V(h.sourceMessageId),lastSlotRevisionKey:V(h.slotRevisionKey),lastLoadMode:V(A.loadMode),lastMirrorApplied:oe?.mirrorResult?.success===!0,lastResolvedFromMessageId:V(A?.resolvedFromMessageId),lastResolvedFromRevisionKey:V(A?.resolvedFromRevisionKey),lastSourceKind:V(A?.sourceKind||A?.state?.meta?.sourceKind),lastScopeMode:V(p.mode,""),lastFillMode:ye,...d?kr({status:ke.SUCCESS,targetSnapshot:h,startedAt:c,skipReason:""}):{}};return fr(Ue,e),{success:!0,targetSnapshot:h,loadResult:A,request:O,responseText:k,parsed:v,fillMode:ye,diff:q,previousTables:T,nextTables:j,runScope:p,scopeStats:se,state:oe.state,bindings:oe.bindings,mirrorResult:oe.mirrorResult,warning:oe.warning||"",...d?{meta:Us({targetSnapshot:h,startedAt:c,status:ke.SUCCESS,warning:oe.warning||"",writeback:oe})}:{}}}catch(m){let h=Date.now()-c;xe().error(`\u586B\u8868\u5931\u8D25 ${h}ms: ${m?.message||m}`,{stack:m?.stack});let x=d?hi(o):!1,_=m?.name==="AbortError"||m?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||x?.aborted===!0||x?.stale===!0,w=_?ke.ABORTED:ke.ERROR,B={lastStatus:w,lastRunAt:Date.now(),lastDurationMs:h,lastError:m?.message||String(m),lastErrorDetails:[m?.message||String(m)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:_?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:V(p.mode,""),...d?kr({status:w,targetSnapshot:g,startedAt:c,skipReason:_?x?.reason||"cancelled_before_host_commit":"",error:m?.message||String(m)}):{}};return fr(B,e),{success:!1,error:m?.message||String(m),errors:[m?.message||String(m)],...d?{meta:Us({targetSnapshot:g,startedAt:c,status:w,skipReason:_?x?.reason||"cancelled_before_host_commit":"",aborted:_,stale:x?.stale===!0,abortReason:_?x?.reason||"cancelled_before_host_commit":"",error:m?.message||String(m)})}:{}}}}var mi,xT,kT,bi=P(()=>{ws();Ds();Vn();Xa();H();We();ni();Mn();lr();Cg();fi();jg();Hg();Aa();qg();Zc();yo();ca();Qs();jr();am();Yr();mi=3,xT=5e3;kT=`

\u3010\u8868\u683C\u7F16\u8F91\u6307\u4EE4\u683C\u5F0F\u3011
\u8BF7\u4F7F\u7528 <tableEdit> \u6807\u7B7E\u8FD4\u56DE\u5BF9\u8868\u683C\u7684\u4FEE\u6539\uFF0C\u652F\u6301\u4E09\u79CD\u64CD\u4F5C\uFF1A

1. \u63D2\u5165\u65B0\u884C\uFF1AinsertRow(\u8868\u7D22\u5F15, {"\u5217\u7D22\u5F15": "\u503C", ...})
2. \u66F4\u65B0\u73B0\u6709\u884C\uFF1AupdateRow(\u8868\u7D22\u5F15, \u884C\u7D22\u5F15, {"\u5217\u7D22\u5F15": "\u65B0\u503C", ...})
3. \u5220\u9664\u884C\uFF1AdeleteRow(\u8868\u7D22\u5F15, \u884C\u7D22\u5F15)

\u7EA6\u5B9A\uFF1A
- \u8868\u7D22\u5F15\u3001\u884C\u7D22\u5F15\u3001\u5217\u7D22\u5F15\u90FD\u4ECE 0 \u5F00\u59CB\uFF08\u884C\u7D22\u5F15\u4E0D\u542B\u8868\u5934\u884C\uFF09
- data \u5BF9\u8C61\u7684\u952E\u7EDF\u4E00\u7528\u5217\u7D22\u5F15\u5B57\u7B26\u4E32\uFF08"0"\u3001"1"\u3001"2" ...\uFF09\uFF0C\u4E0D\u8981\u7528\u5217\u540D
- updateRow \u53EA\u5217\u8981\u6539\u7684\u5217\uFF0C\u672A\u63D0\u53CA\u7684\u5217\u4FDD\u7559\u539F\u503C
- \u4E00\u6B21\u53EF\u4EE5\u5305\u542B\u591A\u4E2A\u64CD\u4F5C\uFF0C\u6BCF\u4E2A\u64CD\u4F5C\u4E00\u884C
- \u5982\u679C\u4E0D\u9700\u8981\u4FEE\u6539\u8868\u683C\uFF0C\u8FD4\u56DE\u7A7A\u7684 <tableEdit></tableEdit>

\u793A\u4F8B\uFF08\u5047\u8BBE\u7B2C 0 \u5F20\u8868\u6709 3 \u5217\uFF09\uFF1A
<tableEdit>
insertRow(0, {"0": "\u65B0\u89D2\u8272", "1": "25", "2": "\u6218\u58EB"})
updateRow(0, 1, {"1": "26"})
deleteRow(1, 0)
</tableEdit>

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var mm={};ie(mm,{WindowManager:()=>xi,closeWindow:()=>gm,createWindow:()=>td,windowManager:()=>pt});function DT(){if(pt.stylesInjected)return;pt.stylesInjected=!0;let t=`
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
  `,e=hr(),r=e.createElement("style");r.id=NT+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function td(t){let{id:e,title:r="\u7A97\u53E3",content:s="",width:o=900,height:n=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:d=!1,rememberState:c=!0,onClose:u,onReady:y}=t;DT();let p=window.jQuery||window.parent?.jQuery;if(!p)return PT.error("jQuery not available"),null;if(pt.isOpen(e))return pt.bringToFront(e),pt.getWindow(e);let g=window.innerWidth||1200,m=window.innerHeight||800,h=g<=1100,x=null,_=!1;c&&(x=pt.getState(e),x&&!h&&(_=!0));let w,B;_&&x.width&&x.height?(w=Math.max(400,Math.min(x.width,g-40)),B=Math.max(300,Math.min(x.height,m-40))):(w=Math.max(400,Math.min(o,g-40)),B=Math.max(300,Math.min(n,m-40)));let A=Math.max(20,Math.min((g-w)/2,g-w-20)),T=Math.max(20,Math.min((m-B)/2,m-B-20)),E=l&&!h,L=`
    <div class="yyt-window" id="${e}" style="left:${A}px; top:${T}px; width:${w}px; height:${B}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${LT(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${E?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${s}</div>
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
  `,O=hr(),k=null;a&&(k=p(`<div class="yyt-window-overlay" data-for="${e}"></div>`),p(O.body).append(k));let v=p(L);p(O.body).append(v),pt.register(e,v),v.on("mousedown",()=>pt.bringToFront(e));let z=!1,j={left:A,top:T,width:w,height:B},q=()=>{j={left:parseInt(v.css("left")),top:parseInt(v.css("top")),width:v.width(),height:v.height()},v.addClass("maximized"),v.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),z=!0},ye=()=>{v.removeClass("maximized"),v.css({left:j.left+"px",top:j.top+"px",width:j.width+"px",height:j.height+"px"}),v.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),z=!1};v.find(".yyt-window-btn.maximize").on("click",()=>{z?ye():q()}),(h&&l||_&&x.isMaximized&&l||d&&l)&&q(),v.find(".yyt-window-btn.close").on("click",()=>{if(c&&l){let fe={width:z?j.width:v.width(),height:z?j.height:v.height(),isMaximized:z};pt.saveState(e,fe)}u&&u(),k&&k.remove(),v.remove(),pt.unregister(e),p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),k&&k.on("click",fe=>{fe.target,k[0]});let se=!1,oe,Te,Ue,Y;if(v.find(".yyt-window-header").on("mousedown",fe=>{p(fe.target).closest(".yyt-window-controls").length||z||(se=!0,oe=fe.clientX,Te=fe.clientY,Ue=parseInt(v.css("left")),Y=parseInt(v.css("top")),p(document.body).css("user-select","none"))}),p(document).on("mousemove.yytWindowDrag"+e,fe=>{if(!se)return;let we=fe.clientX-oe,Ot=fe.clientY-Te;v.css({left:Math.max(0,Ue+we)+"px",top:Math.max(0,Y+Ot)+"px"})}),p(document).on("mouseup.yytWindowDrag"+e,()=>{se&&(se=!1,p(document.body).css("user-select",""))}),i){let fe=!1,we="",Ot,Xe,mr,Ye,Lo,Oo;v.find(".yyt-window-resize-handle").on("mousedown",function(Ir){z||(fe=!0,we="",p(this).hasClass("se")?we="se":p(this).hasClass("e")?we="e":p(this).hasClass("s")?we="s":p(this).hasClass("w")?we="w":p(this).hasClass("n")?we="n":p(this).hasClass("nw")?we="nw":p(this).hasClass("ne")?we="ne":p(this).hasClass("sw")&&(we="sw"),Ot=Ir.clientX,Xe=Ir.clientY,mr=v.width(),Ye=v.height(),Lo=parseInt(v.css("left")),Oo=parseInt(v.css("top")),p(document.body).css("user-select","none"),Ir.stopPropagation())}),p(document).on("mousemove.yytWindowResize"+e,Ir=>{if(!fe)return;let Rr=Ir.clientX-Ot,as=Ir.clientY-Xe,js=400,Ws=300,$o=mr,Bo=Ye,is=Lo,ls=Oo;if(we.includes("e")&&($o=Math.max(js,mr+Rr)),we.includes("s")&&(Bo=Math.max(Ws,Ye+as)),we.includes("w")){let cs=mr-Rr;cs>=js&&($o=cs,is=Lo+Rr)}if(we.includes("n")){let cs=Ye-as;cs>=Ws&&(Bo=cs,ls=Oo+as)}v.css({width:$o+"px",height:Bo+"px",left:is+"px",top:ls+"px"})}),p(document).on("mouseup.yytWindowResize"+e,()=>{fe&&(fe=!1,p(document.body).css("user-select",""))})}return v.on("remove",()=>{p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(v),50),v}function gm(t){let e=pt.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;r&&(r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(document).off(".yytWindowDrag"+t),r(document).off(".yytWindowResize"+t)),e.remove(),pt.unregister(t)}}function LT(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var PT,NT,fm,xi,pt,rd=P(()=>{Fe();H();it();PT=C.createScope("WindowManager"),NT="youyou_toolkit_window_manager",fm="window_states",xi=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let s=this.loadStates();s[e]={...r,updatedAt:Date.now()},qn.set(fm,s)}loadStates(){return qn.get(fm)||{}}getState(e){return this.loadStates()[e]||null}},pt=new xi});function Z(){return od||(od=C.createScope("TableDataEditor")),od}function Be(){I.isDirty=!0;try{I._refs.saveBtn?.setDisabled(!1),I._refs.dirtyBadge&&(I._refs.dirtyBadge.style.display="inline-flex")}catch{}}function xm(){I.isDirty=!1;try{I._refs.saveBtn?.setDisabled(!0),I._refs.dirtyBadge&&(I._refs.dirtyBadge.style.display="none")}catch{}}function ot(){let t=Array.isArray(I.tempData)?I.tempData:[],e=I.currentTableIndex;return e>=0&&e<t.length?t[e]:null}function $T(){if(!nd)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){nd=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=OT,e.appendChild(r),nd=!0}catch(t){Z().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function id(){let t=[],e=null,r=!1,s=I._afterSaveGlobalAt&&Date.now()-I._afterSaveGlobalAt<5*60*1e3;try{let o=zs(null);Z().info("loadEditorData snapshot",{hasSnapshot:!!o,messageId:o?.message?.message_id??o?.sourceMessageId,chatId:o?.chatId,isolationKey:o?.tableState?.meta?.isolationKey,hasTableState:!!o?.tableState,tableStateTablesLen:Array.isArray(o?.tableState?.tables)?o.tableState.tables.length:null,firstTableNameInSlot:o?.tableState?.tables?.[0]?.name,afterSaveGlobalRecent:s}),!s&&Array.isArray(o?.tableState?.tables)&&o.tableState.tables.length>0&&(t=o.tableState.tables),e=o?{chatId:o.chatId||"",sourceMessageId:o.sourceMessageId||o.message?.message_id||"",sourceSwipeId:o.sourceSwipeId||"",effectiveSwipeId:o.effectiveSwipeId||"",slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",targetMessageIndex:o.targetMessageIndex??-1}:null}catch(o){Z().warn("loadEditorData \u5F02\u5E38",o)}if(t.length===0)try{let n=So({})?.template?.tables;Array.isArray(n)&&n.length>0&&(t=de(n),r=!0)}catch(o){Z().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",o)}I.tempData=de(t)||[],I.targetSnapshot=e,I.isDirty=!1,I.isFromTemplate=r,I._pendingMirrorTag=null,I.currentTableIndex>=I.tempData.length?I.currentTableIndex=I.tempData.length>0?0:-1:I.currentTableIndex<0&&I.tempData.length>0&&(I.currentTableIndex=0)}function BT(){let t=f("div",{className:"yyt-tde-toolbar"}),e=f("div",{className:"yyt-tde-toolbar-left"}),r=f("div",{className:"yyt-tde-mode-switch"}),s=[{key:"data",label:"\u6570\u636E\u7F16\u8F91"},{key:"schema",label:"\u7ED3\u6784\u914D\u7F6E"},{key:"global",label:"\u5168\u5C40\u6CE8\u5165"}];for(let c of s){let u=X({label:c.label,variant:I.mode===c.key?"primary":"ghost",size:"small",onClick:()=>{I.mode!==c.key&&(I.mode=c.key,Je())}});r.appendChild(u.el)}e.appendChild(r);let o=f("span",{className:"yyt-tde-dirty-badge",text:"\u672A\u4FDD\u5B58"});I.isDirty&&(o.style.display="inline-flex"),e.appendChild(o),I._refs.dirtyBadge=o;let n=f("div",{className:"yyt-tde-actions"}),a=X({label:"\u91CD\u65B0\u52A0\u8F7D",icon:"\u21BB",size:"small",onClick:GT}),i=X({label:"\u4FDD\u5B58\u5230 chat",icon:"\u{1F4BE}",size:"small",disabled:!I.isDirty,title:"\u4FDD\u5B58\u5230\u5F53\u524D\u6D88\u606F\u7684 slot",onClick:qT});I._refs.saveBtn=i;let l=X({label:"\u4FDD\u5B58\u5230\u5168\u5C40",icon:"\u{1F310}",size:"small",title:"\u4FDD\u5B58\u5230\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\uFF08\u5F71\u54CD\u6240\u6709 chat \u540E\u7EED\u586B\u8868\uFF09",onClick:YT});I._refs.saveGlobalBtn=l;let d=X({label:"\u7ACB\u5373\u586B\u8868",icon:"\u25B6",variant:"primary",size:"small",onClick:VT});return n.appendChild(a.el),n.appendChild(i.el),n.appendChild(l.el),n.appendChild(d.el),t.appendChild(e),t.appendChild(n),t}function zT(){let t=f("div",{className:"yyt-tde-sidebar"}),e=I.tempData||[];t.appendChild(f("div",{className:"yyt-tde-sidebar-label",text:`\u8868\u683C\u5217\u8868 (${e.length})`}));let r=f("div",{className:"yyt-tde-sheet-list"});return e.length===0?r.appendChild(f("div",{text:"\u6682\u65E0\u8868",style:{padding:"8px 10px",fontSize:"11px",color:"var(--tde-text-muted)"}})):e.forEach((s,o)=>{let n=o===I.currentTableIndex,a=s?.name||`\u8868 ${o+1}`,i=Array.isArray(s?.rows)?s.rows.length:0,l=f("div",{className:`yyt-tde-sheet-row${n?" active":""}`}),d=f("div",{className:"yyt-tde-sheet-pick"});d.appendChild(f("span",{className:"yyt-tde-sheet-idx",text:`[${o}]`})),d.appendChild(f("span",{className:"yyt-tde-sheet-name",text:a})),d.appendChild(f("span",{className:"yyt-tde-sheet-count",text:String(i)})),d.addEventListener("click",()=>{I.currentTableIndex!==o&&(I.currentTableIndex=o,Je())}),l.appendChild(d);let c=f("div",{className:"yyt-tde-sheet-actions"});c.appendChild(X({label:"\u2191",size:"small",variant:"ghost",disabled:o===0,title:"\u4E0A\u79FB",onClick:()=>bm(o,-1)}).el),c.appendChild(X({label:"\u2193",size:"small",variant:"ghost",disabled:o===e.length-1,title:"\u4E0B\u79FB",onClick:()=>bm(o,1)}).el),c.appendChild(X({label:"\xD7",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u8868",onClick:()=>JT(o)}).el),l.appendChild(c),r.appendChild(l)}),t.appendChild(r),t.appendChild(X({label:"+ \u6DFB\u52A0\u65B0\u8868",size:"small",variant:"ghost",onClick:XT}).el),t}function KT(){let t=f("main",{className:"yyt-tde-main"}),e=I.tempData||[];if(I.mode==="global")return t.appendChild(jT()),t;if(e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",html:'\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002'})),t;let r=ot();return r?(I.mode==="data"?t.appendChild(UT(r)):I.mode==="schema"&&t.appendChild(FT(r)),t):(t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002"})),t)}function UT(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],s=Array.isArray(t?.rows)?t.rows:[],o=I.targetSnapshot?.chatId||"",n=t?.uid||t?.id||"",a={cols:{},rows:{},cells:{},indexCol:!1};try{a=Po({chatId:o,isolationKey:ue.getKey()},n)||a}catch{}let i=a?.rows||{},l=a?.cells||{};I.isFromTemplate&&e.appendChild(f("div",{className:"yyt-tde-schema-hint",html:'\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002'}));let d=f("div",{className:"yyt-tde-card-grid"});s.forEach((u,y)=>{let p=u?.cells||{},g=!!i[y],m=f("article",{className:`yyt-tde-card${g?" yyt-tde-row-locked":""}`}),h=f("header",{className:"yyt-tde-card-header"});h.appendChild(f("span",{className:"yyt-tde-card-index",text:`#${y+1}`}));let x=f("div",{className:"yyt-tde-card-name-slot"}),_=be({value:u?.name||"",placeholder:"\u884C\u540D",disabled:g,onInput:A=>{let T=ot();T?.rows?.[y]&&(T.rows[y].name=A,Be())}});x.appendChild(_.el),h.appendChild(x);let w=f("div",{className:"yyt-tde-card-actions"});w.appendChild(X({label:g?"\u{1F512}":"\u{1F513}",size:"small",variant:g?"danger":"ghost",title:g?"\u5DF2\u9501\u5B9A\u6B64\u884C\uFF08\u70B9\u51FB\u89E3\u9501\uFF09":"\u9501\u5B9A\u6B64\u884C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>QT(n,y)}).el),w.appendChild(X({label:"\u{1F5D1}",size:"small",variant:"danger",disabled:g,title:"\u5220\u9664\u884C",onClick:()=>e0(y)}).el),h.appendChild(w),m.appendChild(h);let B=f("div",{className:"yyt-tde-card-body"});r.length===0?B.appendChild(f("div",{text:"\u8BE5\u8868\u6CA1\u6709\u5217\u5B9A\u4E49",style:{padding:"8px",color:"var(--tde-text-muted)",fontSize:"12px"}})):r.forEach(A=>{let T=A?.key||"",E=A?.title||T,L=p[T],O=L==null||L==="",k=O?"\uFF08\u7A7A\uFF09":String(L),v=!!l[`${y}::${T}`],z=f("div",{className:`yyt-tde-field${v?" yyt-tde-cell-locked":""}`}),j=f("div",{className:"yyt-tde-field-label"});j.appendChild(f("span",{text:E})),j.appendChild(X({label:v?"\u{1F512}":"\u{1F513}",size:"small",variant:v?"danger":"ghost",title:v?"\u5DF2\u9501\u5B9A\u6B64\u5355\u5143\u683C":"\u9501\u5B9A\u6B64\u5355\u5143\u683C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>ZT(n,y,T)}).el),z.appendChild(j);let q=f("div",{className:`yyt-tde-field-cell${O?" yyt-tde-field-cell--empty":""}${v?" yyt-tde-cell-locked-bg":""}`,text:k,attrs:{contenteditable:v?"false":"true"}});q.addEventListener("input",()=>{let ye=ot();ye?.rows?.[y]&&(ye.rows[y].cells||(ye.rows[y].cells={}),ye.rows[y].cells[T]=q.textContent,Be())}),z.appendChild(q),B.appendChild(z)}),m.appendChild(B),d.appendChild(m)});let c=f("div",{className:"yyt-tde-card-add"});return c.appendChild(X({label:"+ \u6DFB\u52A0\u884C",variant:"ghost",onClick:t0}).el),d.appendChild(c),e.appendChild(d),e}function FT(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],s=t?.sourceData||{},o=t?.aiInstructions||{},n=t?.updateConfig||{},a=I.targetSnapshot?.chatId||"",i=t?.uid||t?.id||"",l={cols:{},rows:{},cells:{},indexCol:!1};try{l=Po({chatId:a,isolationKey:ue.getKey()},i)||l}catch{}let d=l?.cols||{},c=f("div",{className:"yyt-tde-schema-section"});c.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u57FA\u7840\u4FE1\u606F"}));let u=f("div",{className:"yyt-tde-schema-row"});u.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u540D"}));let y=f("div",{className:"yyt-tde-schema-value"});y.appendChild(be({value:t?.name||"",onInput:L=>{let O=ot();O&&(O.name=L,Be())}}).el),u.appendChild(y),c.appendChild(u);let p=f("div",{className:"yyt-tde-schema-row"});p.appendChild(f("div",{className:"yyt-tde-schema-key",text:"UID"})),p.appendChild(f("code",{text:t?.uid||t?.id||"",style:{fontSize:"11px",color:"var(--tde-accent)"}})),c.appendChild(p);let g=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});g.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u8BF4\u660E"}));let m=f("div",{className:"yyt-tde-schema-value"});m.appendChild(wi({value:t?.note||s?.note||"",placeholder:"\u8868\u7528\u9014\u8BF4\u660E + \u5217\u6CE8\u91CA",onInput:L=>{let O=ot();O&&(O.note=L,Be())}})),g.appendChild(m),c.appendChild(g),e.appendChild(c);let h=f("div",{className:"yyt-tde-schema-section"});h.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"AI \u64CD\u4F5C\u8BF4\u660E (sourceData)"}));let x=[{key:"init",label:"\u521D\u59CB\u5316 (init)",placeholder:"\u8868\u4E3A\u7A7A\u65F6 AI \u5E94\u8BE5\u63D2\u5165\u4EC0\u4E48",legacy:"initNode"},{key:"create",label:"\u65B0\u589E (insert)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u65B0\u589E\u884C",legacy:"insertNode"},{key:"update",label:"\u66F4\u65B0 (update)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u66F4\u65B0\u884C",legacy:"updateNode"},{key:"delete",label:"\u5220\u9664 (delete)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u5220\u9664\u884C",legacy:"deleteNode"}];for(let L of x){let O=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});O.appendChild(f("div",{className:"yyt-tde-schema-key",text:L.label}));let k=f("div",{className:"yyt-tde-schema-value"});k.appendChild(wi({value:o?.[L.key]||s?.[L.legacy]||"",placeholder:L.placeholder,onInput:v=>{let z=ot();z&&(z.aiInstructions=z.aiInstructions||{},z.aiInstructions[L.key]=v,Be())}})),O.appendChild(k),h.appendChild(O)}e.appendChild(h);let _=f("div",{className:"yyt-tde-schema-section"});_.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u66F4\u65B0\u914D\u7F6E (updateConfig)"})),_.appendChild(f("div",{className:"yyt-tde-hint",style:{marginBottom:"8px",fontSize:"11px",color:"var(--tde-text-muted)"},html:"<strong>\u8BF4\u660E</strong>\uFF1A\u8FD9\u91CC\u914D\u7F6E AI \u586B\u8868\u65F6\u8FD9\u5F20\u8868\u7684\u884C\u4E3A\uFF08\u9891\u7387\u3001\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u3001token \u8282\u7701\uFF09\u3002\u8DDF\u300C\u4E16\u754C\u4E66\u6CE8\u5165\u300D\u662F\u4E24\u4EF6\u4E8B\uFF1A\u4E16\u754C\u4E66\u662F\u628A\u8868\u6570\u636E\u585E\u8FDB prompt \u7ED9\u4E3B AI \u770B\uFF08\u5408\u5E76\u6761\u76EE / \u72EC\u7ACB\u6761\u76EE\u5728<strong>\u5168\u5C40\u6CE8\u5165</strong> tab \u914D\uFF09\uFF0C\u8FD9\u91CC\u662F\u63A7\u5236<strong>\u586B\u8868\u65F6\u673A</strong>\uFF08\u591A\u4E45\u586B\u4E00\u6B21\u3001\u8DF3\u8FC7\u51E0\u5C42\u7B49\uFF09\u3002-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u5355\u8868\u3002"}));let w=f("div",{className:"yyt-tde-uc-grid"}),B=[{key:"contextDepth",label:"\u4E0A\u4E0B\u6587\u6DF1\u5EA6 (contextDepth)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\uFF0CN = \u6700\u8FD1 N \u6761\u6D88\u606F"},{key:"updateFrequency",label:"\u66F4\u65B0\u9891\u7387 (updateFrequency)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u81EA\u52A8\u586B\u8868\uFF0CN = \u6BCF N \u6761\u6D88\u606F\u89E6\u53D1\u4E00\u6B21"},{key:"batchSize",label:"\u6279\u6B21\u5927\u5C0F (batchSize)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u5355\u6B21\u6700\u591A\u5904\u7406 N \u5F20\u8868"},{key:"skipFloors",label:"\u8DF3\u8FC7\u697C\u5C42 (skipFloors)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u8DF3\u8FC7\u6700\u8FD1 N \u5C42"},{key:"sendLatestRows",label:"\u53D1\u9001\u6700\u65B0 N \u884C (sendLatestRows)",hint:"-1 = \u5168\u90E8\u53D1\u9001\uFF0C0 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u4EC5\u53D1\u9001\u6700\u65B0 N \u884C\uFF08\u5927\u8868 token \u8282\u7701\uFF09"}];for(let L of B){let O=f("div",{className:"yyt-tde-uc-cell"});O.appendChild(f("label",{text:L.label})),O.appendChild(be({type:"number",value:Number.isFinite(n?.[L.key])?String(n[L.key]):"-1",onInput:k=>{let v=ot();if(!v)return;v.updateConfig=v.updateConfig||{};let z=Number(k);v.updateConfig[L.key]=Number.isFinite(z)?z:-1,Be()}}).el),O.appendChild(f("span",{className:"yyt-tde-hint",text:L.hint})),w.appendChild(O)}let A=f("div",{className:"yyt-tde-uc-cell"});A.appendChild(f("label",{text:"\u5206\u7EC4 ID (groupId)"})),A.appendChild(be({value:n?.groupId||"",placeholder:"\u540C\u7EC4 ID \u7684\u8868\u4F1A\u5408\u5E76\u89E6\u53D1",onInput:L=>{let O=ot();O&&(O.updateConfig=O.updateConfig||{},O.updateConfig.groupId=L,Be())}}).el),A.appendChild(f("span",{className:"yyt-tde-hint",text:"\u540C\u7EC4\u540C\u65F6\u89E6\u53D1\uFF0C\u8DE8\u7EC4\u5E76\u884C\uFF08\u7559\u7A7A = \u72EC\u7ACB\u89E6\u53D1\uFF09"})),w.appendChild(A);let T=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});T.appendChild(f("label",{text:"\u8868\u7EA7 API \u9884\u8BBE\u8986\u76D6"})),T.appendChild(be({value:n?.apiPreset||"",placeholder:"\u7559\u7A7A = \u6CBF\u7528\u5168\u5C40\uFF0C\u586B\u9884\u8BBE\u540D = \u8FD9\u5F20\u8868\u7528\u8FD9\u4E2A",onInput:L=>{let O=ot();O&&(O.updateConfig=O.updateConfig||{},O.updateConfig.apiPreset=L,Be())}}).el),T.appendChild(f("span",{className:"yyt-tde-hint",text:"\u4F8B\uFF1A\u89D2\u8272\u8868\u7528 Claude\u3001\u7EAA\u8981\u8868\u7528 GPT"})),w.appendChild(T),_.appendChild(w),e.appendChild(_);let E=f("div",{className:"yyt-tde-schema-section"});return E.appendChild(f("div",{className:"yyt-tde-schema-heading",text:`\u5B57\u6BB5\u5B9A\u4E49 (${r.length})`})),r.length===0?E.appendChild(f("div",{text:"\u65E0\u5B57\u6BB5",style:{color:"var(--tde-text-muted)",fontSize:"12px",padding:"8px 0"}})):r.forEach((L,O)=>{let k=L?.key||"",v=k?!!d[k]:!1,z=f("div",{className:`yyt-tde-schema-field${v?" locked":""}`}),j=f("div",{className:"yyt-tde-schema-field-head"});j.appendChild(f("span",{className:"yyt-tde-schema-idx",text:`[${O}]`}));let q=f("div",{className:"yyt-tde-field-input-title"});q.appendChild(be({value:L?.title||L?.key||"",placeholder:"\u5B57\u6BB5\u6807\u9898",onInput:Te=>{let Ue=ot();Ue?.columns?.[O]&&(Ue.columns[O].title=Te,Be())}}).el),j.appendChild(q);let ye=f("div",{className:"yyt-tde-field-input-key"}),se=be({value:L?.key||"",placeholder:"key",onInput:Te=>{let Ue=ot();Ue?.columns?.[O]&&(Ue.columns[O].key=Te,Be())}});se.el.style.fontFamily="monospace",ye.appendChild(se.el),j.appendChild(ye);let oe=f("div",{className:"yyt-tde-field-input-type"});oe.appendChild(Me({value:L?.type||"text",options:["text","number","boolean","date","json"].map(Te=>({value:Te,label:Te})),onChange:Te=>{let Ue=ot();Ue?.columns?.[O]&&(Ue.columns[O].type=Te,Be())}}).el),j.appendChild(oe),j.appendChild(X({label:v?"\u{1F512}":"\u{1F513}",size:"small",variant:v?"danger":"ghost",title:v?"\u5DF2\u9501\u5B9A\uFF1AAI \u4E0D\u4F1A\u6539\u8FD9\u5217\u3002\u70B9\u51FB\u89E3\u9501":"\u9501\u5B9A\u6B64\u5217\uFF1AAI \u6C38\u4E0D\u4FEE\u6539",onClick:()=>r0(i,k)}).el),j.appendChild(X({label:"\u{1F5D1}",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u5B57\u6BB5",onClick:()=>s0(O)}).el),z.appendChild(j),z.appendChild(wi({value:L?.description||"",placeholder:"\u5B57\u6BB5\u63CF\u8FF0",minHeight:"32px",onInput:Te=>{let Ue=ot();Ue?.columns?.[O]&&(Ue.columns[O].description=Te,Be())}})),E.appendChild(z)}),E.appendChild(X({label:"+ \u6DFB\u52A0\u5B57\u6BB5",variant:"ghost",onClick:o0}).el),e.appendChild(E),e}function jT(){let t=f("div"),e=Array.isArray(I.tempData)?I.tempData:[];if(t.appendChild(f("div",{className:"yyt-tde-schema-hint",style:{background:"rgba(74,158,255,0.08)",borderColor:"rgba(74,158,255,0.3)"},html:"<strong>\u5168\u5C40\u6CE8\u5165\u914D\u7F6E</strong> \u2014 \u6BCF\u5F20\u8868\u7684 exportConfig\uFF08\u72EC\u7ACB\u4E16\u754C\u4E66\u6761\u76EE\uFF09+ placement\uFF08\u6CE8\u5165\u4F4D\u7F6E/\u6DF1\u5EA6/\u987A\u5E8F\uFF09\u3002\u672A\u542F\u7528\u300C\u72EC\u7ACB\u6CE8\u5165\u300D\u7684\u8868\u4F1A\u8D70\u5168\u5C40 wrapper\uFF08\u5DE5\u4F5C\u53F0\u300C\u540C\u6B65\u5230\u4E16\u754C\u4E66\u300D\u5F00\u5173\uFF09\u3002"})),e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u65E0\u8868\u683C\u53EF\u914D\u7F6E\u3002\u8BF7\u5148\u6DFB\u52A0\u8868\u683C\u3002"})),t;let r="yyt-table-workbench";try{r=Ne()?.mirrorTag||r}catch{}let s=f("div",{className:"yyt-tde-schema-section"});s.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u5199\u56DE\u6B63\u6587\u6807\u7B7E"}));let o=f("div",{className:"yyt-tde-uc-grid"}),n=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});return n.appendChild(f("label",{text:"mirrorTag"})),n.appendChild(be({value:r,placeholder:"\u9ED8\u8BA4: yyt-table-workbench",onInput:a=>{I._pendingMirrorTag=a,Be()}}).el),n.appendChild(f("span",{className:"yyt-tde-hint",text:"\u5F00\u542F\u5199\u56DE\u6B63\u6587\u65F6\uFF0C\u7528\u6B64 XML \u6807\u7B7E\u5305\u88F9\u8868\u683C\u6570\u636E\u6CE8\u5165\u5230 assistant \u6D88\u606F"})),o.appendChild(n),s.appendChild(o),t.appendChild(s),e.forEach((a,i)=>{t.appendChild(WT(a,i))}),t}function WT(t,e){let r=t?.exportConfig||{},s=r.entryPlacement||{},o=r.extraIndexPlacement||{},n=r.enabled===!0,a=f("div",{className:"yyt-tde-global-card"}),i=f("div",{className:"yyt-tde-global-card-head"});i.appendChild(f("span",{className:"yyt-tde-global-card-name",text:t?.name||`\u8868 ${e+1}`}));let l=xt({label:"\u542F\u7528\u72EC\u7ACB\u6CE8\u5165",checked:n,onChange:y=>{let p=I.tempData?.[e];p&&(p.exportConfig=p.exportConfig||{},p.exportConfig.enabled=y,Be(),Je())}});i.appendChild(l.el),a.appendChild(i);let d=f("div",{className:`yyt-tde-global-card-body${n?"":" yyt-tde-disabled-section"}`}),c=f("div",{className:"yyt-tde-uc-grid"});c.appendChild(os({label:"\u6761\u76EE\u540D (entryName)",control:be({value:r.entryName||t?.name||"",onInput:y=>No(e,"entryName",y)})})),c.appendChild(os({label:"\u6761\u76EE\u7C7B\u578B (entryType)",control:Me({value:r.entryType||"constant",options:[{value:"constant",label:"constant (\u5E38\u9A7B)"},{value:"keyword",label:"keyword (\u5173\u952E\u8BCD\u89E6\u53D1)"}],onChange:y=>No(e,"entryType",y)})})),c.appendChild(os({label:"\u89E6\u53D1\u5173\u952E\u8BCD (keywords)",wide:!0,control:be({value:r.keywords||"",placeholder:"\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694",onInput:y=>No(e,"keywords",y)})})),c.appendChild(os({label:"\u6309\u884C\u62C6\u5206 (splitByRow)",control:Me({value:r.splitByRow?"true":"false",options:[{value:"false",label:"\u5426\uFF08\u6574\u5F20\u8868\u4E00\u4E2A\u6761\u76EE\uFF09"},{value:"true",label:"\u662F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6761\u76EE\uFF09"}],onChange:y=>No(e,"splitByRow",y==="true")})})),c.appendChild(os({label:"\u9632\u9012\u5F52 (preventRecursion)",control:Me({value:r.preventRecursion===!1?"false":"true",options:[{value:"true",label:"\u662F"},{value:"false",label:"\u5426"}],onChange:y=>No(e,"preventRecursion",y!=="false")})}));let u=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});return u.appendChild(f("label",{text:"\u6CE8\u5165\u6A21\u677F (injectionTemplate)"})),u.appendChild(wi({value:r.injectionTemplate||"",placeholder:"\u4F8B\uFF1A\u4EE5\u4E0B\u662F {{tableName}} \u7684\u6700\u65B0\u6570\u636E\uFF1A{{tableContent}}",onInput:y=>No(e,"injectionTemplate",y)})),c.appendChild(u),d.appendChild(c),d.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u6761\u76EE\u4F4D\u7F6E (entryPlacement)"})),d.appendChild(hm(e,"entryPlacement",s)),d.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u989D\u5916\u7D22\u5F15\u4F4D\u7F6E (extraIndexPlacement\uFF0C\u53EF\u9009)"})),d.appendChild(hm(e,"extraIndexPlacement",o)),a.appendChild(d),a}function hm(t,e,r){let s=f("div",{className:"yyt-tde-uc-grid"}),o=["before_character_definition","after_character_definition","before_authors_note","after_authors_note"];return s.appendChild(os({label:"position",control:Me({value:r.position||"before_character_definition",options:o.map(n=>({value:n,label:n})),onChange:n=>ad(t,e,"position",n)})})),s.appendChild(os({label:"depth",control:be({type:"number",value:Number.isFinite(r.depth)?String(r.depth):"2",onInput:n=>ad(t,e,"depth",Number(n)||0)})})),s.appendChild(os({label:"order",control:be({type:"number",value:Number.isFinite(r.order)?String(r.order):"0",onInput:n=>ad(t,e,"order",Number(n)||0)})})),s}function os({label:t,control:e,wide:r=!1,hint:s=null}){let o=f("div",{className:`yyt-tde-uc-cell${r?" yyt-tde-uc-cell-wide":""}`});return o.appendChild(f("label",{text:t})),o.appendChild(e.el),s&&o.appendChild(f("span",{className:"yyt-tde-hint",text:s})),o}function wi({value:t="",placeholder:e="",minHeight:r="60px",onInput:s=null}={}){let o=f("textarea",{className:"yyt-textarea",attrs:{placeholder:e},style:{minHeight:r}});return o.value=t,typeof s=="function"&&o.addEventListener("input",()=>s(o.value)),o}function No(t,e,r){let s=I.tempData?.[t];s&&(s.exportConfig=s.exportConfig||{},s.exportConfig[e]=r,Be())}function ad(t,e,r,s){let o=I.tempData?.[t];o&&(o.exportConfig=o.exportConfig||{},o.exportConfig[e]=o.exportConfig[e]||{},o.exportConfig[e][r]=s,Be())}function HT(){let t=f("div",{className:"yyt-tde"});t.appendChild(BT());let e=f("div",{className:"yyt-tde-content"});return e.appendChild(zT()),e.appendChild(KT()),t.appendChild(e),t}function Je(){if(!I.$window)return;let t=I.$window.find(".yyt-window-body");if(!t||!t.length)return;let e=t[0];e.innerHTML="",e.appendChild(HT())}function GT(){if(I.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F"))return;let t=I.tempData?.[0];Z().info("reload \u89E6\u53D1",{before:{tableCount:I.tempData?.length,firstName:t?.name,firstAiInit:t?.aiInstructions?.init?.slice(0,50),firstUcFreq:t?.updateConfig?.updateFrequency},targetSnapshot:{messageId:I.targetSnapshot?.sourceMessageId,isFromTemplate:I.isFromTemplate}}),id();let e=I.tempData?.[0];Z().info("reload \u5B8C\u6210",{after:{tableCount:I.tempData?.length,firstName:e?.name,firstAiInit:e?.aiInstructions?.init?.slice(0,50),firstUcFreq:e?.updateConfig?.updateFrequency,isFromTemplate:I.isFromTemplate}}),Je(),Z().info("\u5DF2\u91CD\u65B0\u52A0\u8F7D",null,{toast:"success"})}async function qT(){if(!I.isDirty){Z().info("\u6CA1\u6709\u4FEE\u6539",null,{toast:!0});return}try{let t=I.targetSnapshot;if(t?.sourceMessageId||(t=await Lc()),!t?.sourceMessageId){Z().error("\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09",null,{toast:!0});return}let e=await ui(t,{tables:de(I.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});Z().info("save-chat commitBoundState \u7ED3\u679C",{success:e?.success,error:e?.error,commitMessageId:e?.sourceMessageId,commitSlotRevisionKey:e?.slotRevisionKey,stateTablesLen:Array.isArray(e?.state?.tables)?e.state.tables.length:null,firstTableInState:e?.state?.tables?.[0]?.name,firstAiInitInState:e?.state?.tables?.[0]?.aiInstructions?.init?.slice(0,50)}),e?.success?(xm(),I.targetSnapshot={chatId:e.state?.chatId||t.chatId,sourceMessageId:e.sourceMessageId,sourceSwipeId:e.state?.sourceSwipeId||t.sourceSwipeId,effectiveSwipeId:t.effectiveSwipeId,slotBindingKey:e.state?.slotBindingKey||t.slotBindingKey,slotRevisionKey:e.slotRevisionKey,slotTransactionId:t.slotTransactionId,traceId:t.traceId,targetMessageIndex:e.messageIndex??t.targetMessageIndex},Array.isArray(e?.state?.tables)&&(I.tempData=de(e.state.tables)||[],I.isFromTemplate=!1),I._afterSaveGlobalAt=0,Z().info("\u5DF2\u4FDD\u5B58\u5230 chat",null,{toast:"success"}),Je()):Z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${e?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){Z().error("\u4FDD\u5B58\u5F02\u5E38",t),Z().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function YT(){if(!Array.isArray(I.tempData)||I.tempData.length===0){Z().info("\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u6570\u636E",null,{toast:!0});return}if(window.confirm("\u4FDD\u5B58\u5230\u300C\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u300D\u4F1A\u5F71\u54CD\u540E\u7EED\u6240\u6709 chat \u7684\u65B0\u586B\u8868\uFF08\u5DF2\u6709 slot \u6570\u636E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002\u7EE7\u7EED\uFF1F"))try{let t=Qr();if(!t?.id){Z().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let e=(I.tempData||[]).map(s=>({id:s?.id||s?.uid,name:s?.name||"",note:s?.note||"",enabled:s?.enabled!==!1,aiInstructions:s?.aiInstructions||{},updateConfig:s?.updateConfig||{},exportConfig:s?.exportConfig||{},columns:Array.isArray(s?.columns)?de(s.columns):[],rows:[]})),r=qr({...t,tables:e});if(r?.success){if(typeof I._pendingMirrorTag=="string"&&I._pendingMirrorTag.trim())try{let s=Ne();dt({...s,mirrorTag:I._pendingMirrorTag.trim()})}catch(s){Z().warn("\u4FDD\u5B58 mirrorTag \u5230 workbench config \u5931\u8D25",s)}I._pendingMirrorTag=null,xm(),Array.isArray(r?.template?.tables)&&(I.tempData=de(r.template.tables)||[],I.isFromTemplate=!0,I._afterSaveGlobalAt=Date.now()),Z().info(`\u5DF2\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u300C${t.name}\u300D`,null,{toast:"success"}),Z().info("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u6210\u529F",{templateId:t.id,name:t.name,tableCount:e.length}),Je()}else Z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${r?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){Z().error("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u5F02\u5E38",t),Z().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function VT(){if(!(I.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let t=await zn();t?.success?(Z().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}),id(),Je()):Z().error(`\u586B\u8868\u5931\u8D25\uFF1A${t?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){Z().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",t),Z().error(`\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}function bm(t,e){if(!Array.isArray(I.tempData))return;let r=I.tempData,s=t+e;s<0||s>=r.length||([r[t],r[s]]=[r[s],r[t]],I.currentTableIndex===t?I.currentTableIndex=s:I.currentTableIndex===s&&(I.currentTableIndex=t),Be(),Je())}function JT(t){if(!Array.isArray(I.tempData)||!I.tempData[t])return;let e=I.tempData[t];window.confirm(`\u5220\u9664\u8868\u300C${e.name||`\u8868 ${t+1}`}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`)&&(I.tempData.splice(t,1),I.currentTableIndex>=I.tempData.length&&(I.currentTableIndex=Math.max(0,I.tempData.length-1)),Be(),Je())}function XT(){let t=window.prompt("\u65B0\u8868\u540D\uFF1A",`\u8868 ${(I.tempData?.length||0)+1}`);if(!t||!t.trim())return;I.tempData=Array.isArray(I.tempData)?I.tempData:[];let e=new Set(I.tempData.map(o=>o?.id).filter(Boolean)),r=I.tempData.length+1,s=`sheet_${Date.now().toString(36)}_${r}`;for(;e.has(s);)r++,s=`sheet_${Date.now().toString(36)}_${r}`;I.tempData.push({id:s,name:t.trim(),enabled:!0,note:"",aiInstructions:{init:"",create:"",update:"",delete:""},updateConfig:{},exportConfig:{enabled:!1},columns:[{key:"col_1",title:"\u5B57\u6BB51",description:"",type:"text",required:!1}],rows:[]}),I.currentTableIndex=I.tempData.length-1,Be(),Je()}function QT(t,e){if(!(!t||!Number.isFinite(e)))try{let r={chatId:I.targetSnapshot?.chatId||"",isolationKey:ue.getKey()},s=Po(r,t)||{rows:{}},o=!!(s.rows&&s.rows[e]);Xg(r,t,e,!o),Z().info(o?`\u5DF2\u89E3\u9501\u884C #${e+1}`:`\u5DF2\u9501\u5B9A\u884C #${e+1}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u884C\uFF09`,null,{toast:"success"}),Z().info("row-lock toggled",{sheetUid:t,rowIndex:e,locked:!o}),Je()}catch(r){Z().error("row-lock \u5F02\u5E38",r),Z().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function ZT(t,e,r){if(!(!t||!Number.isFinite(e)||!r))try{let s={chatId:I.targetSnapshot?.chatId||"",isolationKey:ue.getKey()},o=Po(s,t)||{cells:{}},n=`${e}::${r}`,a=!!(o.cells&&o.cells[n]);Zg(s,t,e,r,!a),Z().info(a?`\u5DF2\u89E3\u9501 [${e}][${r}]`:`\u5DF2\u9501\u5B9A [${e}][${r}]`,null,{toast:"success"}),Z().info("cell-lock toggled",{sheetUid:t,rowIndex:e,colKey:r,locked:!a}),Je()}catch(s){Z().error("cell-lock \u5F02\u5E38",s),Z().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}}function e0(t){if(!Number.isFinite(t)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${t+1} \u884C\uFF1F`))return;let e=ot();e?.rows&&(e.rows.splice(t,1),Be(),Je())}function t0(){let t=ot();t&&(Array.isArray(t.rows)||(t.rows=[]),t.rows.push({id:ln("row"),name:"",cells:{}}),Be(),Je())}function r0(t,e){if(!t||!e){Z().error("\u5217\u9501\u5B9A\u5931\u8D25\uFF1A\u7F3A\u5C11 sheetUid \u6216 colKey",null,{toast:!0});return}try{let s={chatId:I.targetSnapshot?.chatId||"",isolationKey:ue.getKey()},o=Po(s,t)||{cols:{}},n=!!(o.cols&&o.cols[e]);Qg(s,t,e,!n),Z().info(n?`\u5DF2\u89E3\u9501 ${e}`:`\u5DF2\u9501\u5B9A ${e}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u5217\uFF09`,null,{toast:"success"}),Z().info("field-lock toggled",{sheetUid:t,colKey:e,locked:!n}),Je()}catch(r){Z().error("field-lock \u5F02\u5E38",r),Z().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function s0(t){let e=ot();e?.columns?.[t]&&window.confirm(`\u5220\u9664\u5B57\u6BB5\u300C${e.columns[t].title||e.columns[t].key}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u6E05\u7406\u884C\u6570\u636E\u3002`)&&(e.columns.splice(t,1),Be(),Je())}function o0(){let t=ot();if(!t)return;t.columns=Array.isArray(t.columns)?t.columns:[];let e=new Set(t.columns.map(s=>s?.key).filter(Boolean)),r=t.columns.length+1;for(;e.has(`col_${r}`);)r++;t.columns.push({key:`col_${r}`,title:`\u5B57\u6BB5${r}`,description:"",type:"text",required:!1}),Be(),Je()}function ld(t={}){if(Z().info("openTableDataEditor \u8C03\u7528",{options:t}),$T(),!(window.jQuery||window.parent?.jQuery)){let s="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";Z().error(s);try{Z().error(`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${s}`,null,{toast:!0})}catch{}return null}try{let s=pt.getState(sd);if(s){let o=Number(s.width),n=Number(s.height),a=Number.isFinite(o)&&o<800||Number.isFinite(n)&&n<500;(s.isMaximized||a)&&(Z().info("\u68C0\u6D4B\u5230\u4E0D\u5408\u7406 saved state\uFF0C\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\u5C3A\u5BF8",{isMaximized:s.isMaximized,savedW:o,savedH:n}),pt.saveState(sd,{width:1200,height:800,isMaximized:!1,x:void 0,y:void 0}))}}catch(s){Z().warn("saved state sanity check \u5F02\u5E38",s)}if(I.$window&&I.$window.length&&document.body.contains(I.$window[0])){if(t.focusTableUid){let o=(I.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(I.currentTableIndex=o)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(I.mode=t.focusMode),Je(),I.$window}if(id(),t.focusTableUid){let o=(I.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(I.currentTableIndex=o)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(I.mode=t.focusMode);let r;try{r=td({id:sd,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:'<div class="yyt-tde-placeholder"></div>',width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:s=>{I.$window=s,Je()},onClose:()=>{I.isDirty&&Z().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),I.$window=null,I._refs={saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}}})}catch(s){Z().error("createWindow \u629B\u9519",s);try{Z().error(`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}catch{}return null}return r}var sd,od,I,OT,nd,wm=P(()=>{rd();H();Mn();ni();bi();yo();lr();We();Yr();Zc();Zt();sd="yyt-table-data-editor";I={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,_pendingMirrorTag:null,targetSnapshot:null,_afterSaveGlobalAt:0,_refs:{saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}};OT=`
.yyt-tde {
  --tde-canvas: var(--yyt-bg-base, #0a0d13);
  --tde-surface-1: var(--yyt-surface, #0f1219);
  --tde-surface-2: var(--yyt-surface-2, #151a24);
  --tde-surface-3: var(--yyt-surface-3, #1c2231);
  --tde-hairline: var(--yyt-border, rgba(255,255,255,0.06));
  --tde-hairline-strong: var(--yyt-border-strong, rgba(255,255,255,0.12));
  --tde-text: var(--yyt-text, rgba(255,255,255,0.92));
  --tde-text-secondary: var(--yyt-text-secondary, rgba(255,255,255,0.55));
  --tde-text-muted: var(--yyt-text-muted, rgba(255,255,255,0.35));
  --tde-accent: var(--yyt-accent, #7bb7ff);
  --tde-accent-soft: var(--yyt-accent-soft, rgba(123,183,255,0.15));
  --tde-accent-strong: var(--yyt-accent-strong, #a5d4ff);
  --tde-on-accent: var(--yyt-on-accent, #0a0d13);
  --tde-success: #4ade80;
  --tde-warning: #fbbf24;
  --tde-error: #ef4444;
  --tde-warning-soft: rgba(251,191,36,0.14);

  display: flex; flex-direction: column;
  height: 100%;
  background: transparent;
  color: var(--tde-text);
  font-size: 13px; line-height: 1.5;
}

/* toolbar */
.yyt-tde-toolbar {
  flex: 0 0 52px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--tde-hairline);
  background: var(--tde-surface-1);
  gap: 12px;
}
.yyt-tde-toolbar-left { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.yyt-tde-mode-switch {
  display: inline-flex; gap: 4px;
}
.yyt-tde-dirty-badge {
  display: none;
  align-items: center; gap: 6px;
  padding: 3px 9px; border-radius: 999px;
  font-size: 11px; font-weight: 700;
  color: var(--tde-warning); background: var(--tde-warning-soft);
  border: 1px solid rgba(251,191,36,0.2);
}
.yyt-tde-dirty-badge::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--tde-warning);
}
.yyt-tde-actions { display: flex; gap: 8px; flex-shrink: 0; }

/* content */
.yyt-tde-content { flex: 1; min-height: 0; display: flex; overflow: hidden; }

/* sidebar */
.yyt-tde-sidebar {
  flex: 0 0 240px;
  background: var(--tde-surface-1);
  border-right: 1px solid var(--tde-hairline);
  padding: 14px 10px 12px;
  display: flex; flex-direction: column; gap: 8px;
  overflow-y: auto;
}
.yyt-tde-sidebar-label {
  font-size: 10px; font-weight: 700; color: var(--tde-text-muted);
  text-transform: uppercase; letter-spacing: 0.5px;
  padding: 0 4px 4px;
}
.yyt-tde-sheet-list { display: flex; flex-direction: column; gap: 4px; }

.yyt-tde-sheet-row {
  display: flex; align-items: center; gap: 4px;
  padding: 4px;
  border-radius: 6px;
  border: 1px solid transparent;
}
.yyt-tde-sheet-row.active {
  background: var(--tde-accent-soft);
  border-color: rgba(123,183,255,0.18);
}
.yyt-tde-sheet-row .yyt-tde-sheet-pick {
  flex: 1; min-width: 0;
  display: flex; align-items: center; gap: 8px;
  cursor: pointer;
  padding: 4px 6px;
  color: var(--tde-text-secondary);
  font-size: 13px; font-weight: 600;
  border-radius: 4px;
}
.yyt-tde-sheet-row .yyt-tde-sheet-pick:hover { background: var(--tde-surface-2); color: var(--tde-text); }
.yyt-tde-sheet-row.active .yyt-tde-sheet-pick { color: var(--tde-accent-strong); }
.yyt-tde-sheet-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.yyt-tde-sheet-count {
  flex-shrink: 0; font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 999px;
  color: var(--tde-text-muted); background: rgba(255,255,255,0.04);
}
.yyt-tde-sheet-row.active .yyt-tde-sheet-count { color: var(--tde-accent); background: rgba(123,183,255,0.12); }
.yyt-tde-sheet-idx { font-size: 10px; color: var(--tde-text-muted); font-weight: 700; }
.yyt-tde-sheet-actions {
  display: none; gap: 2px; flex-shrink: 0;
}
.yyt-tde-sheet-row:hover .yyt-tde-sheet-actions,
.yyt-tde-sheet-row.active .yyt-tde-sheet-actions { display: inline-flex; }

/* main */
.yyt-tde-main {
  flex: 1; min-width: 0;
  overflow-y: auto;
  padding: 16px 18px;
  background: var(--tde-canvas);
}

/* card grid (data mode) */
.yyt-tde-card-grid {
  display: flex; flex-wrap: wrap; gap: 12px;
  align-content: flex-start;
}
.yyt-tde-card {
  width: 300px;
  display: flex; flex-direction: column;
  background: var(--tde-surface-1);
  border: 1px solid var(--tde-hairline-strong);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.12s ease;
}
.yyt-tde-card:hover { border-color: var(--tde-accent); }
.yyt-tde-card-header {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px;
  background: var(--tde-surface-2);
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-card-index {
  flex-shrink: 0; min-width: 26px;
  padding: 2px 8px; border-radius: 999px;
  background: rgba(255,255,255,0.05);
  color: var(--tde-text-muted);
  font-size: 10px; font-weight: 700;
  text-align: center;
}
.yyt-tde-card-name-slot { flex: 1; min-width: 0; }
.yyt-tde-card-actions { display: flex; gap: 4px; flex-shrink: 0; }
.yyt-tde-card-body { padding: 4px 12px 10px; display: flex; flex-direction: column; }
.yyt-tde-field {
  padding: 6px 0;
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-field:last-child { border-bottom: none; }
.yyt-tde-field-label {
  display: flex; align-items: center; justify-content: space-between; gap: 4px;
  font-size: 10px; font-weight: 700; color: var(--tde-text-muted);
  text-transform: uppercase; letter-spacing: 0.3px;
  margin-bottom: 3px;
}
.yyt-tde-field-cell {
  padding: 4px 8px; margin: 0 -8px;
  border: 1px solid transparent; border-radius: 4px;
  color: var(--tde-text); font-size: 13px; line-height: 1.5;
  min-height: 22px;
  word-break: break-word;
  outline: none;
  cursor: text;
  transition: all 0.12s ease;
}
.yyt-tde-field-cell:hover { background: var(--tde-surface-2); border-color: var(--tde-hairline); }
.yyt-tde-field-cell:focus {
  background: var(--tde-surface-2); border-color: var(--tde-accent);
  box-shadow: 0 0 0 2px var(--tde-accent-soft);
}
.yyt-tde-field-cell--empty { color: var(--tde-text-muted); font-style: italic; }
.yyt-tde-card-add {
  width: 300px;
  min-height: 84px;
  display: flex; align-items: center; justify-content: center;
}
.yyt-tde-empty {
  padding: 24px;
  text-align: center;
  color: var(--tde-text-muted);
  font-size: 13px;
  border: 1px dashed var(--tde-hairline-strong);
  border-radius: 8px;
}

/* schema mode */
.yyt-tde-schema-section {
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-schema-section:last-child { border-bottom: none; }
.yyt-tde-schema-heading {
  font-size: 12px; font-weight: 700; color: var(--tde-text);
  text-transform: uppercase; letter-spacing: 0.3px;
  margin-bottom: 10px;
}
.yyt-tde-schema-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
  padding: 8px 0;
  border-top: 1px dashed rgba(255,255,255,0.08);
  font-size: 12px;
  align-items: center;
}
.yyt-tde-schema-row:first-child { border-top: none; }
.yyt-tde-schema-key { color: var(--tde-text-secondary); font-weight: 600; }
.yyt-tde-schema-value { color: var(--tde-text); word-break: break-word; }

.yyt-tde-schema-field {
  display: flex; flex-direction: column; gap: 6px;
  padding: 10px 12px;
  background: var(--tde-surface-2);
  border-radius: 6px;
  margin-bottom: 6px;
}
.yyt-tde-schema-field.locked {
  border-left: 2px solid var(--tde-warning);
  background: var(--tde-warning-soft);
}
.yyt-tde-schema-field-head {
  display: flex; align-items: center; gap: 8px;
}
.yyt-tde-schema-idx { font-size: 11px; color: var(--tde-accent); font-weight: 700; min-width: 24px; }
.yyt-tde-field-input-title { flex: 2; }
.yyt-tde-field-input-key { flex: 1; }
.yyt-tde-field-input-key input { font-family: monospace; }
.yyt-tde-field-input-type { flex: 0 0 110px; }

.yyt-tde-uc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px 14px;
  padding: 8px 0;
}
.yyt-tde-uc-cell { display: flex; flex-direction: column; gap: 4px; }
.yyt-tde-uc-cell-wide { grid-column: span 2; }
.yyt-tde-uc-cell label { font-size: 11px; font-weight: 600; color: var(--tde-text-secondary); }
.yyt-tde-uc-cell .yyt-tde-hint { font-size: 10px; color: var(--tde-text-muted); }
.yyt-tde-schema-hint {
  font-size: 11px;
  color: var(--tde-text-muted);
  padding: 10px 14px;
  background: var(--tde-surface-2);
  border-left: 3px solid var(--tde-accent);
  border-radius: 4px;
  margin-bottom: 12px;
}

/* data mode: \u884C/\u5355\u5143\u683C\u9501\u89C6\u89C9 */
.yyt-tde-row-locked {
  border-color: var(--tde-warning) !important;
  box-shadow: 0 0 0 1px rgba(251,191,36,0.2) inset;
}
.yyt-tde-cell-locked-bg {
  background: var(--tde-warning-soft);
  color: var(--tde-text-muted);
}

/* global mode: exportConfig \u5361\u7247 */
.yyt-tde-global-card {
  background: var(--tde-surface-2);
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 12px 14px;
  border: 1px solid var(--tde-hairline);
}
.yyt-tde-global-card-head {
  display: flex; align-items: center; justify-content: space-between;
  padding-bottom: 8px; border-bottom: 1px solid var(--tde-hairline);
  margin-bottom: 8px;
}
.yyt-tde-global-card-name { font-weight: 700; color: var(--tde-text); }
.yyt-tde-disabled-section { opacity: 0.5; pointer-events: none; }
`,nd=!1});function n0(t){return de(t)}function a0(t,e,r){if(!t||typeof t!="object")return;let s=String(e||"").split(".").filter(Boolean);if(s.length===0)return;let o=t;for(let n=0;n<s.length-1;n++){let a=s[n];(o[a]===null||o[a]===void 0||typeof o[a]!="object")&&(o[a]={}),o=o[a]}o[s[s.length-1]]=r}function D(){return cd||(cd=C.createScope("TableWorkbenchView")),cd}async function i0(){try{let t=await mn();if(!t)return Et.kind=null,Et.lastError="Provider \u4E0D\u53EF\u7528",Et;if(Et.kind=t.kind,typeof t.query=="function"){let e=await t.query({statement:"SELECT COUNT(*) as c FROM table_sheets"}),r=await t.query({statement:"SELECT COUNT(*) as c FROM table_rows"});Et.sheetCount=e?.rows?.[0]?.c??0,Et.rowCount=r?.rows?.[0]?.c??0}Et.lastError=null,Et.lastRefreshAt=Date.now(),D().info("Provider stats \u5DF2\u5237\u65B0",{...Et})}catch(t){Et.lastError=t?.message||String(t),D().warn("Provider stats \u5237\u65B0\u5931\u8D25",t)}return Et}function l0(){if(!Et.kind){let t=bo();t?.kind&&(Et.kind=t.kind)}return Et}function ee(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Sm(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function _m(t){let{config:e,activeTemplate:r,isolationKey:s,tablesPreview:o,templateArchives:n=[],providerStats:a={}}=t,i=e?.runtime||{},l=i.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":i.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":i.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",d=i.lastStatus==="success"?"success":i.lastStatus==="failed"?"error":"muted",c=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",u=e?.apiPreset||"\u8DDF\u968F\u4E3B API",y=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0",p=Array.isArray(n)?n.length:0;return`
  <div class="yyt-tww">
    <!-- Hero -->
    <div class="yyt-tww-hero">
      <div class="yyt-tww-hero-row1">
        <div class="yyt-tww-hero-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
        <div class="yyt-tww-hero-name">\u586B\u8868\u5DE5\u4F5C\u53F0</div>
        <div class="yyt-tww-hero-actions">
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-now"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-clear"><i class="fa-solid fa-rotate-left"></i> \u91CD\u586B</button>
          ${p>0?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="toggle-archives" title="\u6A21\u677F\u5F52\u6863\u5386\u53F2\uFF08chat \xD7 isolationKey \u7EF4\u5EA6\uFF0C\u6700\u591A 8 \u4EFD\uFF09"><i class="fa-solid fa-clock-rotate-left"></i> \u5F52\u6863 (${p})</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="export-templates" title="\u5BFC\u51FA\u6240\u6709\u7528\u6237\u6A21\u677F\u4E3A JSON\uFF08\u542B\u5168\u5C40\u6A21\u677F\u7684\u4FEE\u6539\u526F\u672C\uFF09"><i class="fa-solid fa-download"></i> \u5BFC\u51FA\u6A21\u677F</button>
          ${r?.mode&&r.mode!==He.INHERIT_GLOBAL?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="reset-template-scope" title="\u672C chat \u5F53\u524D\u662F\u300C${r.mode===He.CHAT_OVERRIDE?"chat \u4E13\u5C5E":"\u94FE\u63A5\u9884\u8BBE"}\u300D\u6A21\u5F0F\uFF0C\u70B9\u51FB\u6062\u590D\u4E3A\u300C\u7EE7\u627F\u5168\u5C40\u300D"><i class="fa-solid fa-rotate-right"></i> \u6062\u590D\u7EE7\u627F</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small yyt-tww-btn-danger" data-action="reset-chat-data" title="\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF0C\u8BA9\u6A21\u677F\u5207\u6362\u540E\u4ECE\u5934\u5F00\u59CB"><i class="fa-solid fa-trash-can"></i> \u6E05\u7A7A chat \u6570\u636E</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${ee(c)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${ee(r?.template?.name||"\u9ED8\u8BA4")}</span>
        ${(()=>{let g=r?.mode;if(g===He.CHAT_OVERRIDE)return'<span class="yyt-tww-chip preset" title="\u672C chat \u7528\u4E86\u72EC\u7ACB\u6A21\u677F\u526F\u672C\uFF08\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\uFF09\u3002\u53EF\u5728\u300C\u91CD\u7F6E\u8303\u56F4\u300D\u6309\u94AE\u65C1\u7684\u83DC\u5355\u6062\u590D\u7EE7\u627F\u5168\u5C40\u3002">\u4F5C\u7528\u57DF: chat \u4E13\u5C5E</span>';if(g===He.PRESET_LINK){let m=r?.source?.presetName||"";return`<span class="yyt-tww-chip preset" title="\u672C chat \u94FE\u63A5\u5230\u5168\u5C40\u9884\u8BBE ${ee(m)}\uFF0C\u8DDF\u968F\u8BE5\u9884\u8BBE\u53D8\u5316\u3002">\u4F5C\u7528\u57DF: \u94FE\u63A5 ${ee(m)}</span>`}return'<span class="yyt-tww-chip preset" title="\u672C chat \u8DDF\u968F\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u3002">\u4F5C\u7528\u57DF: \u7EE7\u627F\u5168\u5C40</span>'})()}
        <span class="yyt-tww-chip preset">API: ${ee(u)}</span>
        <span class="yyt-tww-chip preset">\u6307\u4EE4: ${ee(y)}</span>
        ${(()=>{let g=e?.runScope||e?.scope?.mode||"enabled";return g==="enabled"?'<span class="yyt-tww-chip preset">\u8303\u56F4: \u6240\u6709\u542F\u7528\u8868</span>':`<button class="yyt-tww-chip status-failed" data-action="reset-run-scope" title="\u5F53\u524D AI \u53EA\u4F1A\u586B\u90E8\u5206\u8868\uFF0C\u70B9\u51FB\u91CD\u7F6E\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D" style="border:0;cursor:pointer;">\u8303\u56F4: ${ee(g==="current"?"\u26A0\uFE0F \u4EC5\u5F53\u524D\u8868":"\u4EC5\u9009\u4E2D\u8868")} \u2014 \u70B9\u6B64\u91CD\u7F6E</button>`})()}
        ${(()=>{let g=a?.kind,m=a?.sheetCount,h=a?.rowCount,x=m!==null&&h!==null?` \u2014 ${m} \u8868 ${h} \u884C`:"";return g==="authority"?`<span class="yyt-tww-chip status-success" title="\u6570\u636E\u6301\u4E45\u5316\u5230\u771F\u540E\u7AEF SQLite\uFF08ST-Delegation-of-authority \u63D0\u4F9B\uFF09">\u2713 \u771F\u540E\u7AEF SQLite${ee(x)}</span>`:g==="fallback"?`<span class="yyt-tww-chip preset" title="\u6570\u636E\u6301\u4E45\u5316\u5230 localStorage\uFF08\u672A\u88C5 ST-Delegation-of-authority\uFF09">\u2139 Fallback (localStorage)${ee(x)}</span>`:'<span class="yyt-tww-chip" title="Provider \u8FD8\u672A\u521D\u59CB\u5316\uFF08\u61D2\u52A0\u8F7D\uFF09">Provider \u52A0\u8F7D\u4E2D...</span>'})()}
        ${s?`<span class="yyt-tww-chip">\u9694\u79BB: ${ee(s)}</span>`:""}
        <span class="yyt-tww-chip status-${d==="success"?"success":d==="error"?"failed":""}">${ee(l)}</span>
        <span class="yyt-tww-chip yyt-tww-chip-toggle" data-action="toggle-chips" title="\u5C55\u5F00/\u6536\u8D77">\u25B8</span>
      </div>
    </div>

    <!-- v1.0.209 #3 \u4FEE\u590D\uFF1Ahero \u63D0\u5230\u6EDA\u52A8\u533A\u5916\u9762\uFF08\u540C .yyt-tww \u76F4\u63A5\u5B50\uFF09\uFF0C\u4E0B\u9762\u6240\u6709\u5185\u5BB9\u5305\u8FDB .yyt-tww-scroll \u5355\u4E00\u6EDA\u52A8\u5BB9\u5668\u3002
         hero \u7269\u7406\u4E0A\u5C31\u4E0D\u5728\u6EDA\u52A8\u533A\u5185 \u2192 \u4E0D\u4F1A\u88AB\u6EDA\u8D70\u3002JS \u76D1\u542C scrollTop > 0 \u5207\u6362 compact \u6001\u538B\u7F29 hero\u3002 -->
    <div class="yyt-tww-scroll">

    <!-- \u6A21\u677F\u5F52\u6863\u5217\u8868\uFF08\u9ED8\u8BA4\u9690\u85CF\uFF0Chero \u6309\u94AE toggle\uFF09 -->
    <div class="yyt-tww-archives" data-archives-panel style="display:none;">
      ${p0(n)}
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${d}">${ee(l)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${ee(Sm(i.lastRunAt))}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6210\u529F</span>
        <span class="yyt-tww-stat-value success">${ee(i.successCount||0)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u5931\u8D25</span>
        <span class="yyt-tww-stat-value ${i.errorCount?"error":"muted"}">${ee(i.errorCount||0)}</span>
      </div>
    </div>

    <!-- Body sections -->
    <div class="yyt-tww-body">

      <section class="yyt-tww-section" data-section="bindings">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-link"></i></span>
          \u7ED1\u5B9A
        </div>
        ${c0(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${d0(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${y0(t.tablesPreview)}
      </section>

    </div>

    </div>
  </div>
  `}function c0(t){let{config:e,allTemplates:r,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,activeTemplate:i}=t,l=r.map(w=>`<option value="${ee(w.id)}" ${i?.source?.templateId===w.id?"selected":""}>${ee(w.name)}</option>`).join(""),d=e?.autoUpdateEnabled===!0?"auto":"manual",c=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+s.map(w=>`<option value="${ee(w.name)}" ${w.name===c?"selected":""}>${ee(w.name)}</option>`).join(""),y=e?.bypass?.presetId||"",p='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+o.map(w=>`<option value="${ee(w.id)}" ${w.id===y?"selected":""}>${ee(w.name)}${w.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),g=e?.extraction?.regexPresetId||"",m='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+n.map(w=>`<option value="${ee(w.id)}" ${w.id===g?"selected":""}>${ee(w.name)}</option>`).join(""),h=e?.worldbooks?.presetId||"",x='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(w=>`<option value="${ee(w.id)}" ${w.id===h?"selected":""}>${ee(w.name)}</option>`).join(""),_=e?.runScope||"enabled";return`
    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u586B\u8868\u6A21\u677F</span>
        <span class="yyt-tww-row-label-hint">\u8868\u7ED3\u6784 + \u586B\u8868\u63D0\u793A\u8BCD</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="template">${l}</select>
      <div class="yyt-tww-row-meta">
        <span>${i?.mode==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":i?.mode==="chat_override"?"chat \u8986\u76D6":i?.mode==="preset_link"?"\u94FE\u63A5\u9884\u8BBE":""}</span>
      </div>
    </div>
    <!-- v1.0.205 chat-template-UI: chat \u7EA7\u6A21\u677F\u64CD\u4F5C\u5165\u53E3 -->
    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">chat \u7EA7\u6A21\u677F</span>
        <span class="yyt-tww-row-label-hint">\u672C\u804A\u5929\u72EC\u7ACB\u7684\u6A21\u677F\u72B6\u6001\uFF08\u72EC\u7ACB / \u94FE\u63A5 / \u7EE7\u627F\uFF09</span>
      </div>
      <div class="yyt-tww-ctrl" style="display:flex; gap:6px; flex-wrap:wrap;">
        <button class="yyt-tww-btn yyt-tww-btn-small" data-action="chat-template-override" title="\u628A\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u6DF1\u62F7\u8D1D\u4E00\u4EFD\u505A chat \u72EC\u7ACB\u526F\u672C\u3002\u540E\u7EED\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\uFF0C\u64CD\u4F5C\u524D\u81EA\u52A8\u5F52\u6863\u3002"><i class="fa-solid fa-clone"></i> \u8BBE\u4E3A chat \u4E13\u5C5E</button>
        <button class="yyt-tww-btn yyt-tww-btn-small" data-action="chat-template-link" title="\u628A\u672C chat \u94FE\u63A5\u5230\u4E00\u4E2A\u5168\u5C40\u9884\u8BBE\uFF0C\u8DDF\u968F\u8BE5\u9884\u8BBE\u66F4\u65B0\u3002"><i class="fa-solid fa-link"></i> \u94FE\u63A5\u5230\u9884\u8BBE</button>
      </div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u89E6\u53D1\u6A21\u5F0F</span>
        <span class="yyt-tww-row-label-hint">\u81EA\u52A8\u968F AI \u56DE\u590D / \u4EC5\u624B\u52A8</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="triggerMode">
        <option value="auto" ${d==="auto"?"selected":""}>\u81EA\u52A8 \u2014 \u56DE\u590D\u5B8C\u6210\u540E\u586B\u8868</option>
        <option value="manual" ${d==="manual"?"selected":""}>\u624B\u52A8 \u2014 \u4EC5\u5728\u70B9"\u7ACB\u5373\u586B\u8868"\u65F6</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">API \u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u586B\u8868\u8BF7\u6C42\u8D70\u54EA\u4E2A API</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="apiPreset">${u}</select>
      <div class="yyt-tww-row-meta"><a data-link="api-presets">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">Ai \u6307\u4EE4\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="bypassPreset">${p}</select>
      <div class="yyt-tww-row-meta"><a data-link="bypass">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u6B63\u5219\u63D0\u53D6\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="regexPreset">${m}</select>
      <div class="yyt-tww-row-meta"><a data-link="regex">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4E16\u754C\u4E66\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookPreset">${x}</select>
      <div class="yyt-tww-row-meta"><a data-link="worldbook">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4F5C\u7528\u57DF</span>
        <span class="yyt-tww-row-label-hint">\u6570\u636E\u72B6\u6001\u7ED1\u5B9A\u7684\u8303\u56F4</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="runScope">
        <option value="current" ${_==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${_==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${_==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function d0(t){let{config:e}=t,r=e?.fillMode||"incremental",s=Number(e?.contextDepth)||3,o=e?.worldbookSync?.enabled===!0,n=e?.mirrorToMessage===!0;return`
    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u586B\u5145\u6A21\u5F0F</span>
        <span class="yyt-tww-row-label-hint">\u589E\u91CF\u66F4\u65B0 / \u5168\u8868\u91CD\u586B</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="fillMode">
        <option value="incremental" ${r==="incremental"?"selected":""}>\u589E\u91CF \u2014 \u4EC5\u4FEE\u6539\u53D8\u5316\u5B57\u6BB5</option>
        <option value="full" ${r==="full"?"selected":""}>\u5168\u91CF \u2014 \u6574\u5F20\u8868\u91CD\u65B0\u751F\u6210</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4E0A\u4E0B\u6587\u6D88\u606F\u6570</span>
        <span class="yyt-tww-row-label-hint">\u4ECE\u6700\u65B0\u4E00\u6761\u5F80\u524D\u53D6\u7684\u6761\u6570</span>
      </div>
      <input class="yyt-input yyt-tww-ctrl" type="number" min="1" max="50" data-binding="contextDepth" value="${ee(s)}">
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u540C\u6B65\u5230\u4E16\u754C\u4E66</div>
        <div class="yyt-tww-toggle-desc">\u628A\u8868\u683C\u5E8F\u5217\u5316\u4E3A\u4E16\u754C\u4E66\u6761\u76EE\u8BA9\u4E3B\u6A21\u578B\u5728\u751F\u6210\u65F6\u770B\u5230\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${o?"on":""}" data-toggle="worldbookSync"></div>
    </div>

    ${u0(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${n?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function u0(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let s=String(e.targetBook||""),o=String(t?.boundLorebook||""),n=t?.chatOpen===!0,a=s||o,i=Array.isArray(t.availableWorldbooks)?t.availableWorldbooks:[],l=e.wrapperConfig||{},d=l.enabled!==!1,c=String(l.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55"),u=String(l.wrapperHint||""),y=l.wrapperPlacement||{},p=String(y.position||"before_character_definition"),g=Number.isFinite(y.depth)?y.depth:2,m=Number.isFinite(y.order)?y.order:5e4,h;if(!n)h='<option value="">\u2014\u2014 \u8BF7\u5148\u6253\u5F00\u804A\u5929 \u2014\u2014</option>';else if(i.length===0)h=`<option value="${ee(a)}">${a?ee(a):"\u2014\u2014 \u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014\u2014"}</option>`;else{let w=i.map(A=>{let T=typeof A=="string"?A:A?.name||"";return`<option value="${ee(T)}" ${T===a?"selected":""}>${ee(T)}${T===o?"\uFF08\u89D2\u8272\u5361\u7ED1\u5B9A\uFF09":""}</option>`}).join("");h=(o?`<option value="">\u2014\u2014 \u89D2\u8272\u5361\u7ED1\u5B9A\uFF1A${ee(o)} \u2014\u2014</option>`:'<option value="">\u2014\u2014 \u9009\u62E9 \u2014\u2014</option>')+w}return`
    <div class="yyt-tww-sub-zone" data-sub-zone="worldbookSync">
      <div class="yyt-tww-sub-row">
        <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookTargetBook" ${n?"":"disabled"}>${h}</select>
        <div class="yyt-tww-sub-meta">${n?'<a data-action="refresh-worldbooks">\u5237\u65B0\u5217\u8868</a>':'<span style="color:var(--tww-warning);">\u672A\u6253\u5F00\u804A\u5929</span>'}</div>
      </div>

      <div class="yyt-tww-sub-row-toggle">
        <label>Wrapper \u5305\u88F9</label>
        <div class="yyt-tww-toggle-desc">\u7528 <code style="font-size:10px;">&lt;${ee(c)}&gt;...&lt;/${ee(c)}&gt;</code> \u5305\u4F4F\u6240\u6709\u5168\u5C40\u8868\u6570\u636E</div>
        <div class="yyt-tww-toggle ${d?"on":""}" data-toggle="worldbookWrapperEnabled"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper \u6807\u7B7E</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperTag" value="${ee(c)}" placeholder="\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55">
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper \u63D0\u793A\u6587</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperHint" value="${ee(u)}" placeholder="\u53EF\u9009\uFF0C\u8BF4\u660E wrapper \u5185\u5BB9\u7528\u9014">
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>\u6CE8\u5165\u4F4D\u7F6E</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookWrapperPosition">
          <option value="before_character_definition" ${p==="before_character_definition"?"selected":""}>\u89D2\u8272\u5B9A\u4E49\u4E4B\u524D</option>
          <option value="after_character_definition" ${p==="after_character_definition"?"selected":""}>\u89D2\u8272\u5B9A\u4E49\u4E4B\u540E</option>
          <option value="before_history" ${p==="before_history"?"selected":""}>\u5386\u53F2\u8BB0\u5F55\u4E4B\u524D</option>
          <option value="after_history" ${p==="after_history"?"selected":""}>\u5386\u53F2\u8BB0\u5F55\u4E4B\u540E</option>
          <option value="at_depth" ${p==="at_depth"?"selected":""}>\u6307\u5B9A\u6DF1\u5EA6</option>
        </select>
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row-double">
        <label>\u6DF1\u5EA6 / \u987A\u5E8F</label>
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperDepth" value="${ee(g)}" min="0">
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperOrder" value="${ee(m)}" min="0">
      </div>
    </div>
  `}function p0(t=[]){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D chat \xD7 isolationKey \u6682\u65E0\u5F52\u6863\uFF08\u4EC5\u5728\u5207\u6362\u6A21\u677F\u65F6\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09</div>':`
    <div class="yyt-tww-archives-header">\u6A21\u677F\u5F52\u6863\u5386\u53F2 (${t.length}/8)</div>
    <div class="yyt-tww-archives-list">
      ${t.map((e,r)=>{let s=e?.state||{},o=s.mode||"unknown",n=e?.archivedAt?new Date(e.archivedAt).toLocaleString():"\u672A\u77E5\u65F6\u95F4",a=s.presetName||"",i=o==="preset_link"?`\u9884\u8BBE\u94FE\u63A5: ${ee(a)}`:o==="chat_override"?"chat \u7EA7\u8986\u76D6\u6A21\u677F":o==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":ee(o);return`
          <div class="yyt-tww-archive-item" data-archive-index="${r}">
            <div class="yyt-tww-archive-meta">
              <span class="yyt-tww-archive-time">${ee(n)}</span>
              <span class="yyt-tww-archive-mode">${i}</span>
            </div>
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="restore-archive" data-archive-index="${r}" title="\u6062\u590D\u6B64\u5F52\u6863\uFF08\u6062\u590D\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09">\u6062\u590D</button>
          </div>
        `}).join("")}
    </div>
  `}function y0(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
    <div class="yyt-tww-table-grid">
      ${t.map((e,r)=>`
        <div class="yyt-tww-table-card${e.enabled===!1?" yyt-tww-table-card-disabled":""}" data-table-index="${r}" data-table-id="${ee(e.id||"")}">
          <div class="yyt-tww-table-card-header">
            <label class="yyt-tww-table-card-toggle" title="${e.enabled===!1?"\u5DF2\u7981\u7528 \u2014 AI \u4E0D\u4F1A\u586B\u8FD9\u5F20\u8868":"\u5DF2\u542F\u7528 \u2014 AI \u4F1A\u586B\u8FD9\u5F20\u8868"}">
              <input type="checkbox" data-action="toggle-table-enabled" data-table-id="${ee(e.id||"")}" ${e.enabled===!1?"":"checked"} />
              <span class="yyt-tww-table-card-toggle-slider"></span>
            </label>
            <span class="yyt-tww-table-card-name">${ee(e.name||`\u8868 ${r+1}`)}</span>
            <i class="fa-solid fa-arrow-right yyt-tww-table-card-arrow"></i>
          </div>
          <div class="yyt-tww-table-card-stats">
            <span><b>${ee(e.rowCount||0)}</b> \u884C</span>
            <span><b>${ee(e.colCount||0)}</b> \u5B57\u6BB5</span>
            ${e.updatedHint?`<span>${ee(e.updatedHint)}</span>`:""}
          </div>
        </div>
      `).join("")}
    </div>
  `}function Em(){let t=(()=>{try{return Ne()}catch{return{}}})(),e=(()=>{try{return Zr()||[]}catch{return[]}})(),r=(()=>{try{return So({})}catch{return null}})(),s=(()=>{try{return Nr()||[]}catch{return[]}})(),o=(()=>{try{return wn()||[]}catch{return[]}})(),n=(()=>{try{return Ae.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return lt.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return ue.getKey()}catch{return""}})(),l=f0(),d=g0(),c=m0(),u=null,y=0;try{let x=zs(null);Array.isArray(x?.tableState?.tables)&&x.tableState.tables.length>0&&(u=x.tableState.tables,y=Number(x.tableState.updatedAt)||0)}catch{}let p=u||r?.template?.tables||t?.tables||[],g=t?.tableEnabledOverrides&&typeof t.tableEnabledOverrides=="object"?t.tableEnabledOverrides:{},m=p.map(x=>{let _=x?.id||"",w=_&&Object.prototype.hasOwnProperty.call(g,_)?g[_]:void 0;return{id:_,name:x?.name||"",enabled:w!==void 0?w:x?.enabled!==!1,rowCount:Array.isArray(x?.rows)?x.rows.length:0,colCount:Array.isArray(x?.columns)?x.columns.length:0,updatedHint:u&&y>0?Sm(y):""}}),h=(()=>{try{return of()||[]}catch{return[]}})();return{config:t,activeTemplate:r,allTemplates:e,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,availableWorldbooks:l,boundLorebook:d,chatOpen:c,isolationKey:i,tablesPreview:m,templateArchives:h,providerStats:l0()}}function f0(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){D().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function g0(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let s=e.getCurrentCharPrimaryLorebook();if(typeof s=="string"&&s)return s}if(typeof e.getCharLorebooks=="function")try{let s=e.getCharLorebooks();if(s?.primary)return String(s.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let s=e.getChatLorebook();if(typeof s=="string"&&s)return s}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.characters?.[r.characterId],o=s?.data?.character_book?.name||s?.data?.extensions?.world||s?.world;if(typeof o=="string"&&o)return o}}catch(t){D().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function m0(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let s=e.getCurrentChatId();return!!(s&&String(s).trim()&&String(s).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.chat;if(Array.isArray(s)&&s.length>0||r.chatId)return!0}}catch{}return!1}function dd(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){D().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),vm||(vm=!0,i0().then(()=>{typeof e=="function"&&e()}).catch(()=>{})),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let n=await zn();n?.success?D().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}):D().error(`\u586B\u8868\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(n){D().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",n),D().error(`\u5F02\u5E38\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let n=await zn(null,{clearBeforeUpdate:!0});n?.success?D().info("\u91CD\u586B\u5B8C\u6210",null,{toast:"success"}):D().error(`\u91CD\u586B\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(n){D().error("\u91CD\u586B\u5F02\u5E38",n),D().error(`\u5F02\u5E38\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-run-scope"]',()=>{try{let n=Ne();dt({...n,runScope:"enabled",scope:{...n.scope||{},mode:"enabled",activeTableId:"",selectedTableIds:[]}}),D().info("\u5DF2\u91CD\u7F6E\u8303\u56F4\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D",null,{toast:"success"}),D().info("\u7528\u6237\u91CD\u7F6E runScope \u4E3A enabled"),typeof e=="function"&&e()}catch(n){D().error("\u91CD\u7F6E\u8303\u56F4\u5F02\u5E38",n),D().error(`\u91CD\u7F6E\u5931\u8D25\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-chips"]',function(){let n=t.find(".yyt-tww-hero-chips")[0];if(!n)return;let a=n.classList.toggle("yyt-tww-hero-chips-expanded");this.textContent=a?"\u25BE":"\u25B8"}),t.on("click.tww",'[data-action="export-templates"]',()=>{try{let n=Ka(),a=JSON.stringify(n,null,2),i=new Blob([a],{type:"application/json"}),l=URL.createObjectURL(i),d=document.createElement("a");d.href=l,d.download=`youyou-table-templates-${Date.now()}.json`,document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(l);let c=Array.isArray(n?.templates)?n.templates.length:0;D().info(`\u5DF2\u5BFC\u51FA ${c} \u4E2A\u6A21\u677F\u5230\u4E0B\u8F7D\u6587\u4EF6\u5939`,null,{toast:"success"}),D().info("export-templates \u5B8C\u6210",{count:c})}catch(n){D().error("export-templates \u5F02\u5E38",n),D().error(`\u5BFC\u51FA\u5931\u8D25\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-template-scope"]',()=>{if(window.confirm("\u6062\u590D\u672C chat \u7684\u6A21\u677F\u4F5C\u7528\u57DF\u5230\u300C\u7EE7\u627F\u5168\u5C40\u300D\uFF1F\u5F53\u524D\u72B6\u6001\u4F1A\u5148\u81EA\u52A8\u5F52\u6863\uFF0C\u53EF\u5728\u300C\u5F52\u6863\u300D\u4E2D\u6062\u590D\u3002"))try{let n=sf({archive:!0});n?.success?(D().info("\u5DF2\u6062\u590D\u4E3A\u7EE7\u627F\u5168\u5C40",null,{toast:"success"}),D().info("reset-template-scope \u5B8C\u6210"),typeof e=="function"&&e()):D().error(`\u6062\u590D\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(n){D().error("reset-template-scope \u5F02\u5E38",n),D().error(`\u5F02\u5E38\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-override"]',()=>{if(window.confirm(`\u628A\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u6DF1\u62F7\u8D1D\u4E3A\u672C chat \u7684\u72EC\u7ACB\u526F\u672C\uFF1F
\u4E4B\u540E\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\u6A21\u677F\u3002\u64CD\u4F5C\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\u3002`))try{let n=Qr();if(!n){D().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let a=tf(n,{source:"workbench-chat-override"});a?.success?(D().info(`\u5DF2\u8BBE\u4E3A chat \u4E13\u5C5E\uFF1A${n.name}`,null,{toast:"success"}),D().info("chat-template-override \u5B8C\u6210",{templateId:n.id,name:n.name}),typeof e=="function"&&e()):D().error(`\u8BBE\u7F6E\u5931\u8D25\uFF1A${a?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(n){D().error("chat-template-override \u5F02\u5E38",n),D().error(`\u5F02\u5E38\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-link"]',()=>{let n=(()=>{try{return Zr()||[]}catch{return[]}})();if(n.length===0){D().info("\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u677F",null,{toast:!0});return}let a=n.map((c,u)=>`${u+1}. ${c.name}`).join(`
`),i=window.prompt(`\u94FE\u63A5\u5230\u54EA\u4E2A\u5168\u5C40\u9884\u8BBE\uFF1F\u8F93\u5165\u7F16\u53F7\uFF081-${n.length}\uFF09\uFF1A

${a}`,"1");if(!i)return;let l=parseInt(i,10)-1;if(!Number.isFinite(l)||l<0||l>=n.length){D().error("\u7F16\u53F7\u65E0\u6548",null,{toast:!0});return}let d=n[l];try{let c=rf(d.name,{source:"workbench-link-preset"});c?.success?(D().info(`\u5DF2\u94FE\u63A5\u5230\u9884\u8BBE\uFF1A${d.name}`,null,{toast:"success"}),D().info("chat-template-link \u5B8C\u6210",{presetName:d.name}),typeof e=="function"&&e()):D().error(`\u94FE\u63A5\u5931\u8D25\uFF1A${c?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(c){D().error("chat-template-link \u5F02\u5E38",c),D().error(`\u5F02\u5E38\uFF1A${c?.message||c}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-chat-data"]',async()=>{if(window.confirm("\u5C06\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF08\u4E0D\u5F71\u54CD\u6A21\u677F/\u914D\u7F6E\uFF09\u3002\u4E0B\u6B21\u586B\u8868\u4F1A\u6309\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u4ECE\u5934\u5F00\u59CB\u3002\u786E\u5B9A\uFF1F"))try{let n=await fg();n?.success?(D().info(`\u5DF2\u6E05\u7A7A ${n.touched||0} \u6761\u6D88\u606F\u7684\u8868\u683C\u6570\u636E`,null,{toast:"success"}),D().info("\u6E05\u7A7A chat \u6570\u636E\u5B8C\u6210",n)):D().error("\u6E05\u7A7A\u5931\u8D25",null,{toast:!0}),typeof e=="function"&&e()}catch(n){D().error("\u6E05\u7A7A chat \u6570\u636E\u5F02\u5E38",n),D().error(`\u5F02\u5E38\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="open-editor"]',n=>{n.preventDefault(),D().info("open-editor button clicked");try{let a=ld();D().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!a})}catch(a){D().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),D().error(`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("click.tww","[data-table-index]",function(n){if(r(n.target).closest('[data-action="toggle-table-enabled"]').length>0||r(n.target).is("label, label *"))return;n.preventDefault();let a=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(a)||a<0))try{let l=zs(null)?.tableState?.tables?.[a],d=ld({focusTableUid:l?.uid||l?.id||""})}catch(i){D().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",i),D().error(`\u6253\u5F00\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-archives"]',function(n){n.preventDefault();let a=t.find("[data-archives-panel]").first();a.length&&(a.css("display")==="none"?a.css("display","block"):a.css("display","none"))}),t.on("click.tww",'[data-action="restore-archive"]',async function(n){n.stopPropagation();let a=Number(r(this).attr("data-archive-index"));if(!(!Number.isFinite(a)||a<0)&&window.confirm(`\u6062\u590D\u5F52\u6863 #${a}\uFF1F\u6062\u590D\u524D\u4F1A\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF0C\u53EF\u518D\u6B21\u6062\u590D\u56DE\u6765\u3002`))try{let i=nf(a);i?.success?(D().info("\u5DF2\u6062\u590D\u5F52\u6863",null,{toast:"success"}),D().info("restoreChatTemplateArchive \u6210\u529F",{index:a,scopeState:i.scopeState})):D().error(`\u6062\u590D\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(i){D().error("\u6062\u590D\u5F52\u6863\u5F02\u5E38",i),D().error(`\u5F02\u5E38\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("change.tww",'[data-action="toggle-table-enabled"]',function(n){n.stopPropagation();let a=r(this).attr("data-table-id"),i=r(this).is(":checked");if(a)try{let l=Ne(),d={...l.tableEnabledOverrides||{}};d[a]=i,dt({...l,tableEnabledOverrides:d}),D().info(i?`\u5DF2\u542F\u7528 ${a}`:`\u5DF2\u7981\u7528 ${a}`,null,{toast:"success"}),D().info("toggle \u5355\u8868\u6FC0\u6D3B",{tableId:a,enabled:i}),typeof e=="function"&&e()}catch(l){D().error("toggle \u5355\u8868\u6FC0\u6D3B\u5F02\u5E38",l),D().error(`\u5207\u6362\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="template"]',function(){let n=r(this).val();try{hc(n);let a=Ne();dt({...a,activeTemplate:n}),D().info("\u6A21\u677F\u5DF2\u5207\u6362",null,{toast:"success"}),typeof e=="function"&&e()}catch(a){D().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",a),D().error(`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let n=r(this).val();try{let a=Ne();dt({...a,autoUpdateEnabled:n==="auto"}),D().info(n==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F",null,{toast:"success"}),typeof e=="function"&&e()}catch(a){D().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",a),D().error(`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}});let s=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:n,key:a}of s)t.on("change.tww",n,function(){let i=r(this).val();try{let l=Ne(),d={...l,[a]:i};a==="runScope"&&(d.scope={...l.scope||{},mode:i,...i==="enabled"?{activeTableId:"",selectedTableIds:[]}:{}}),dt(d),D().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(l){D().error(`\u4FDD\u5B58 ${a} \u5F02\u5E38`,l),D().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let n=r(this).val();try{let a=Ne();dt({...a,bypass:{...a.bypass||{},presetId:n,enabled:!!n}}),D().info("Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(a){D().error("\u4FDD\u5B58 bypass \u5F02\u5E38",a),D().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let n=r(this).val();try{let a=Ne();dt({...a,extraction:{...a.extraction||{},regexPresetId:n}}),D().info("\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(a){D().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",a),D().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let n=r(this).val();try{let a=Ne();dt({...a,worldbooks:{...a.worldbooks||{},presetId:n}}),D().info("\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(a){D().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",a),D().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let n=Math.max(1,parseInt(r(this).val(),10)||3);try{let a=Ne();dt({...a,contextDepth:n}),D().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(a){D().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",a),D().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Ne();dt({...l,worldbookSync:{...l.worldbookSync||{},enabled:i}}),D().info(i?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65",null,{toast:"success"}),typeof e=="function"&&e()}catch(l){n.toggleClass("on",a),D().error("toggle worldbookSync \u5F02\u5E38",l),D().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="worldbookWrapperEnabled"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Ne(),d=l.worldbookSync||{};dt({...l,worldbookSync:{...d,wrapperConfig:{...d.wrapperConfig||{},enabled:i}}}),D().info(i?"\u5DF2\u542F\u7528 Wrapper \u5305\u88F9":"\u5DF2\u505C\u7528 Wrapper",null,{toast:"success"})}catch(l){n.toggleClass("on",a),D().error("toggle worldbookWrapperEnabled \u5F02\u5E38",l)}});let o=[{sel:'[data-binding="worldbookTargetBook"]',path:"targetBook",type:"string"},{sel:'[data-binding="worldbookWrapperTag"]',path:"wrapperConfig.wrapperTag",type:"string"},{sel:'[data-binding="worldbookWrapperHint"]',path:"wrapperConfig.wrapperHint",type:"string"},{sel:'[data-binding="worldbookWrapperPosition"]',path:"wrapperConfig.wrapperPlacement.position",type:"string"},{sel:'[data-binding="worldbookWrapperDepth"]',path:"wrapperConfig.wrapperPlacement.depth",type:"number"},{sel:'[data-binding="worldbookWrapperOrder"]',path:"wrapperConfig.wrapperPlacement.order",type:"number"}];for(let{sel:n,path:a,type:i}of o)t.on("change.tww",n,function(){let l=r(this).val();i==="number"&&(l=Number.parseInt(l,10));try{let d=Ne(),c=n0(d.worldbookSync||{});a0(c,a,l),dt({...d,worldbookSync:c}),D().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(d){D().error(`\u4FDD\u5B58 worldbookSync.${a} \u5F02\u5E38`,d),D().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${d?.message||d}`,null,{toast:!0})}});t.on("click.tww",'[data-action="refresh-worldbooks"]',function(n){n.preventDefault(),typeof e=="function"&&e(),D().info("\u5DF2\u5237\u65B0\u4E16\u754C\u4E66\u5217\u8868",null,{toast:"success"})}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Ne();dt({...l,mirrorToMessage:i}),D().info(i?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF",null,{toast:"success"})}catch(l){n.toggleClass("on",a),D().error("toggle mirrorToMessage \u5F02\u5E38",l),D().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}}),t.on("click.tww","[data-link]",function(n){n.preventDefault(),D().info("\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09",null,{toast:!0})})}var cd,Et,vm,Tm,Am=P(()=>{H();mo();lr();yo();We();Yr();bi();Mn();wm();We();qo();_o();jr();Ys();Et={kind:null,sheetCount:null,rowCount:null,lastError:null,lastRefreshAt:0},vm=!1;Tm=`
.yyt-tww {
  --tww-canvas: var(--yyt-bg-base, #0a0d13);
  --tww-surface-1: var(--yyt-surface, #0f1219);
  --tww-surface-2: var(--yyt-surface-2, #151a24);
  --tww-surface-3: var(--yyt-surface-3, #1c2231);
  --tww-hairline: var(--yyt-border, rgba(255,255,255,0.06));
  --tww-hairline-strong: var(--yyt-border-strong, rgba(255,255,255,0.12));
  --tww-hairline-dashed: rgba(255,255,255,0.08);
  --tww-text: var(--yyt-text, rgba(255,255,255,0.92));
  --tww-text-secondary: var(--yyt-text-secondary, rgba(255,255,255,0.55));
  --tww-text-muted: var(--yyt-text-muted, rgba(255,255,255,0.35));
  --tww-accent: var(--yyt-accent, #7bb7ff);
  --tww-accent-soft: var(--yyt-accent-soft, rgba(123,183,255,0.15));
  --tww-accent-strong: var(--yyt-accent-strong, #a5d4ff);
  --tww-on-accent: var(--yyt-on-accent, #0a0d13);
  --tww-success: var(--yyt-success, #4ade80);
  --tww-success-soft: rgba(74,222,128,0.12);
  --tww-warning: var(--yyt-warning, #fbbf24);
  --tww-warning-soft: rgba(251,191,36,0.14);
  --tww-error: var(--yyt-error, #ef4444);
  --tww-error-soft: rgba(239,68,68,0.12);
  --tww-purple: #a78bfa;
  --tww-purple-soft: rgba(167,139,250,0.12);

  display: flex; flex-direction: column;
  /* \u8BAE\u9898 #15 hotfix v1.0.173\uFF1A\u7236\u5BB9\u5668\uFF08popup yyt-content\uFF09\u5DF2\u662F\u6DF1\u8272\uFF0C\u672C\u5BB9\u5668\u900F\u660E\u7EE7\u627F\u907F\u514D\u8FB9\u754C\u9519\u4F4D
     v1.0.209 #3 \u4FEE\u590D\uFF1Ahero \u72EC\u7ACB\u63D0\u5230 .yyt-tww \u76F4\u63A5\u5B50\u5C42\u7EA7\uFF0C\u4E0E .yyt-tww-scroll \u6EDA\u52A8\u533A\u540C\u7EA7\uFF1B
     hero \u7269\u7406\u4E0A\u4E0D\u5728\u6EDA\u52A8\u533A\u5185 \u2192 \u4E0D\u4F1A\u88AB\u6EDA\u8D70\u3002.yyt-tww \u81EA\u8EAB overflow:hidden \u9632\u6574\u4F53\u6EA2\u51FA\uFF0C
     \u6EDA\u52A8\u7531 .yyt-tww-scroll \u63A5\u7BA1\uFF0C\u914D\u5408 pinWorkbenchHeight \u56FA\u5B9A .yyt-tww \u603B\u9AD8\u5EA6\u3002*/
  overflow: hidden;
  background: transparent; color: var(--tww-text);
  font-size: 13px; line-height: 1.5;
}
.yyt-tww-hero {
  flex-shrink: 0;
  padding: 14px 18px;
  border-bottom: 1px solid var(--tww-hairline);
  background: var(--tww-surface-1);
  display: flex; flex-direction: column; gap: 8px;
  transition: padding 0.18s ease, gap 0.18s ease;
}
.yyt-tww-hero.yyt-tww-hero--compact {
  padding-top: 8px;
  padding-bottom: 8px;
  gap: 0;
}
.yyt-tww-hero.yyt-tww-hero--compact .yyt-tww-hero-desc,
.yyt-tww-hero.yyt-tww-hero--compact .yyt-tww-hero-chips {
  display: none;
}
.yyt-tww-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
.yyt-tww-hero-row1 { display: flex; align-items: center; gap: 12px; }
.yyt-tww-hero-icon {
  width: 30px; height: 30px; border-radius: 6px;
  background: var(--tww-accent-soft); color: var(--tww-accent);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 14px; flex-shrink: 0;
}
.yyt-tww-hero-name { flex: 1; font-size: 15px; font-weight: 700; min-width: 0; }
.yyt-tww-hero-actions { display: flex; gap: 8px; flex-shrink: 0; }
.yyt-tww-hero-desc { font-size: 12px; color: var(--tww-text-muted); padding-left: 42px; }
.yyt-tww-hero-chips { display: flex; gap: 6px; flex-wrap: wrap; padding-left: 42px; max-height: 24px; overflow: hidden; transition: max-height 0.2s ease; }
.yyt-tww-hero-chips.yyt-tww-hero-chips-expanded { max-height: 200px; }
.yyt-tww-chip-toggle { cursor: pointer; user-select: none; }
.yyt-tww-chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 2px 8px; border-radius: 999px;
  font-size: 10px; font-weight: 600; letter-spacing: 0.3px;
  background: var(--tww-surface-2); color: var(--tww-text-muted);
}
.yyt-tww-chip.mode { background: var(--tww-purple-soft); color: var(--tww-purple); }
.yyt-tww-chip.preset { background: var(--tww-accent-soft); color: var(--tww-accent); }
.yyt-tww-chip.status-success { background: var(--tww-success-soft); color: var(--tww-success); }
.yyt-tww-chip.status-failed { background: var(--tww-error-soft); color: #ffb4b4; }

.yyt-tww-stat-row {
  display: grid; grid-template-columns: repeat(4, 1fr);
  padding: 12px 18px;
  border-bottom: 1px solid var(--tww-hairline);
  flex-shrink: 0;
}
.yyt-tww-stat {
  display: flex; flex-direction: column; gap: 2px;
  border-left: 1px solid var(--tww-hairline);
  padding-left: 14px;
}
.yyt-tww-stat:first-child { border-left: none; padding-left: 0; }
.yyt-tww-stat-label {
  font-size: 10px; font-weight: 700; color: var(--tww-text-muted);
  text-transform: uppercase; letter-spacing: 0.4px;
}
.yyt-tww-stat-value { font-size: 12px; font-weight: 600; color: var(--tww-text); font-variant-numeric: tabular-nums; }
.yyt-tww-stat-value.success { color: var(--tww-success); }
.yyt-tww-stat-value.error { color: var(--tww-error); }
.yyt-tww-stat-value.muted { color: var(--tww-text-muted); }

.yyt-tww-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px;
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 6px;
  background: var(--tww-surface-2);
  color: var(--tww-text-secondary);
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: all 0.12s ease; white-space: nowrap;
  font-family: inherit;
}
.yyt-tww-btn:hover { background: var(--tww-surface-3); color: var(--tww-text); }
.yyt-tww-btn-primary {
  background: var(--tww-accent); color: var(--tww-on-accent);
  border-color: transparent; font-weight: 700;
}
.yyt-tww-btn-primary:hover { background: var(--tww-accent-strong); color: var(--tww-on-accent); }
.yyt-tww-btn-small { padding: 5px 10px; font-size: 11px; }

.yyt-tww-body {
  padding: 0 18px 22px;
}
.yyt-tww-section { padding-top: 22px; }
.yyt-tww-section:first-child { padding-top: 18px; }
.yyt-tww-section + .yyt-tww-section {
  margin-top: 22px;
  border-top: 1px solid var(--tww-hairline);
}
.yyt-tww-section-heading {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 12px;
  font-size: 12px; font-weight: 700; color: var(--tww-text);
  text-transform: uppercase; letter-spacing: 0.3px;
}
.yyt-tww-section-icon {
  width: 22px; height: 22px; border-radius: 6px;
  background: var(--tww-accent-soft); color: var(--tww-accent);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 11px;
}
.yyt-tww-section-action { margin-left: auto; display: flex; gap: 6px; }

.yyt-tww-row {
  display: grid; grid-template-columns: 130px 1fr auto;
  gap: 12px; align-items: center;
  padding: 10px 0;
}
.yyt-tww-row + .yyt-tww-row { border-top: 1px dashed var(--tww-hairline-dashed); }
.yyt-tww-row-label { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.yyt-tww-row-label-text { font-size: 12px; font-weight: 600; color: var(--tww-text-secondary); }
.yyt-tww-row-label-hint { font-size: 10px; color: var(--tww-text-muted); }
.yyt-tww-row-meta {
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; color: var(--tww-text-muted);
}
.yyt-tww-row-meta a { color: var(--tww-accent); text-decoration: none; font-weight: 600; cursor: pointer; }
.yyt-tww-row-meta a:hover { text-decoration: underline; }

/* \u8BAE\u9898 #15 hotfix v1.0.173\uFF1A
   \u5DE5\u4F5C\u53F0 select/input \u76F4\u63A5\u501F\u7528 toolkit \u7684 yyt-select / yyt-input \u9884\u5236\u4F53\uFF08\u5E26 !important \u9632\u5FA1\u6837\u5F0F reset\uFF09\uFF0C
   \u5728\u6B64\u7528 .yyt-tww-ctrl override \u7F29\u5C0F\u5230 binding-row \u7528\u7684\u7D27\u51D1\u5C3A\u5BF8 */
.yyt-tww-ctrl {
  min-height: 32px !important;
  padding: 6px 10px !important;
  font-size: 12px !important;
  width: 100%;
}
select.yyt-tww-ctrl {
  padding-right: 28px !important;
  background-size: 10px !important;
  background-position: right 10px center !important;
}

.yyt-tww-toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 0; gap: 16px;
}
.yyt-tww-toggle-row + .yyt-tww-toggle-row { border-top: 1px dashed var(--tww-hairline-dashed); }
.yyt-tww-toggle-info { flex: 1; min-width: 0; }
.yyt-tww-toggle-title { font-size: 12px; font-weight: 600; color: var(--tww-text-secondary); }
.yyt-tww-toggle-desc { font-size: 10px; color: var(--tww-text-muted); margin-top: 2px; }
.yyt-tww-toggle {
  position: relative; width: 34px; height: 18px;
  background: var(--tww-surface-3); border-radius: 999px;
  border: 1px solid var(--tww-hairline-strong);
  cursor: pointer; flex-shrink: 0;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.yyt-tww-toggle::after {
  content: ''; position: absolute; top: 1px; left: 1px;
  width: 14px; height: 14px; border-radius: 50%;
  background: rgba(255,255,255,0.85);
  transition: transform 0.15s ease;
}
.yyt-tww-toggle.on { background: var(--tww-accent); border-color: transparent; }
.yyt-tww-toggle.on::after { transform: translateX(16px); background: var(--tww-on-accent); }

/* sub-zone\uFF08\u8BAE\u9898 #15 #30 \u5199\u56DE\u4E16\u754C\u4E66\u5C55\u5F00\u914D\u7F6E\uFF09*/
.yyt-tww-sub-zone {
  margin-top: 8px; margin-left: 0;
  padding: 12px 14px;
  background: var(--tww-surface-1);
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 6px;
  display: flex; flex-direction: column; gap: 10px;
}
.yyt-tww-sub-zone.collapsed { display: none; }
.yyt-tww-sub-row {
  display: grid; grid-template-columns: 110px 1fr auto;
  gap: 10px; align-items: center;
}
.yyt-tww-sub-row + .yyt-tww-sub-row {
  padding-top: 10px;
  border-top: 1px dashed var(--tww-hairline-dashed);
}
.yyt-tww-sub-row > label {
  font-size: 11px; font-weight: 600; color: var(--tww-text-secondary);
}
.yyt-tww-sub-row > .yyt-tww-sub-meta {
  font-size: 11px; color: var(--tww-text-muted); white-space: nowrap;
}
.yyt-tww-sub-row > .yyt-tww-sub-meta a {
  color: var(--tww-accent); text-decoration: none; font-weight: 600; cursor: pointer;
}
.yyt-tww-sub-row > .yyt-tww-sub-meta a:hover { text-decoration: underline; }
.yyt-tww-sub-row-toggle {
  display: grid; grid-template-columns: 110px 1fr auto;
  gap: 10px; align-items: center;
}
.yyt-tww-sub-row-toggle > label {
  font-size: 11px; font-weight: 600; color: var(--tww-text-secondary);
}
.yyt-tww-sub-row-toggle .yyt-tww-toggle-desc {
  font-size: 10px; color: var(--tww-text-muted);
}
.yyt-tww-sub-row-double {
  display: grid; grid-template-columns: 110px 1fr 1fr;
  gap: 10px; align-items: center;
}

.yyt-tww-table-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
}
.yyt-tww-table-card {
  padding: 10px 12px;
  background: var(--tww-surface-1);
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.12s ease, background 0.12s ease;
  display: flex; flex-direction: column; gap: 6px;
}
.yyt-tww-table-card:hover { border-color: var(--tww-accent); background: var(--tww-surface-2); }
.yyt-tww-table-card-disabled { opacity: 0.55; }
.yyt-tww-table-card-disabled .yyt-tww-table-card-name { text-decoration: line-through; color: var(--tww-text-muted); }
.yyt-tww-table-card-header { display: flex; align-items: center; gap: 8px; }
.yyt-tww-table-card-toggle {
  position: relative; display: inline-flex; width: 32px; height: 18px;
  cursor: pointer; flex-shrink: 0;
}
.yyt-tww-table-card-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
.yyt-tww-table-card-toggle-slider {
  position: absolute; inset: 0; background: #555; border-radius: 18px;
  transition: background 0.15s; cursor: pointer;
}
.yyt-tww-table-card-toggle-slider::before {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 14px; height: 14px; background: #fff; border-radius: 50%;
  transition: transform 0.15s;
}
.yyt-tww-table-card-toggle input:checked + .yyt-tww-table-card-toggle-slider { background: var(--tww-accent, #4caf50); }
.yyt-tww-table-card-toggle input:checked + .yyt-tww-table-card-toggle-slider::before { transform: translateX(14px); }
.yyt-tww-table-card-name { flex: 1; font-size: 13px; font-weight: 700; color: var(--tww-text); }

/* \u6A21\u677F\u5F52\u6863\u5217\u8868\uFF08\u8BAE\u9898 #15 \u76F2\u533A 4\uFF0Cv1.0.193+\uFF09 */
.yyt-tww-archives {
  margin: 8px 0; padding: 12px; border-radius: 8px;
  background: var(--tww-surface-2, rgba(255,255,255,0.04));
  border: 1px solid var(--tww-border, rgba(255,255,255,0.08));
}
.yyt-tww-archives-header {
  font-size: 12px; font-weight: 600; color: var(--tww-text-muted);
  margin-bottom: 8px;
}
.yyt-tww-archives-list {
  display: flex; flex-direction: column; gap: 6px;
}
.yyt-tww-archive-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 10px; border-radius: 6px;
  background: var(--tww-surface, rgba(255,255,255,0.02));
  border: 1px solid var(--tww-border, rgba(255,255,255,0.06));
}
.yyt-tww-archive-meta {
  display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0;
}
.yyt-tww-archive-time { font-size: 12px; color: var(--tww-text); }
.yyt-tww-archive-mode { font-size: 11px; color: var(--tww-text-muted); }
.yyt-tww-table-card-arrow {
  color: var(--tww-text-muted); font-size: 10px;
  transition: color 0.12s ease, transform 0.12s ease;
}
.yyt-tww-table-card:hover .yyt-tww-table-card-arrow {
  color: var(--tww-accent); transform: translateX(2px);
}
.yyt-tww-table-card-stats { display: flex; gap: 12px; font-size: 11px; color: var(--tww-text-muted); }
.yyt-tww-table-card-stats b { color: var(--tww-text-secondary); font-weight: 700; }
.yyt-tww-empty {
  padding: 20px;
  text-align: center;
  color: var(--tww-text-muted);
  font-size: 12px;
  border: 1px dashed var(--tww-hairline-strong);
  border-radius: 8px;
}
`});var Rm={};ie(Rm,{TableWorkbenchPanel:()=>Im,default:()=>b0});function h0(){if(!ud)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){ud=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=Tm,e.appendChild(r),ud=!0}catch(t){Kn.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}function Cm(t){let e=t?.[0];if(!e)return;let r=e.closest(".yyt-popup-body");if(!r){Kn.warn("pinWorkbenchHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148");return}let s=()=>{let n=e.querySelector(".yyt-tww");if(!n)return;let a=r.getBoundingClientRect(),i=e.getBoundingClientRect(),l=a.bottom-i.top-8;l>100?n.style.height=`${l}px`:Kn.warn(`pinWorkbenchHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${l}, popupBottom=${a.bottom}, tabTop=${i.top}`)};if(s(),requestAnimationFrame(()=>requestAnimationFrame(s)),typeof ResizeObserver>"u"||e.__yytwwROTarget===r&&e.__yytwwRO)return;if(e.__yytwwRO)try{e.__yytwwRO.disconnect()}catch{}let o=new ResizeObserver(()=>s());o.observe(r),e.__yytwwRO=o,e.__yytwwROTarget=r}function km(t){let e=t?.[0];if(!e)return;let r=e.querySelector(".yyt-tww-hero"),s=e.querySelector(".yyt-tww-scroll");if(!r||!s)return;let o=()=>{s.scrollTop>0?r.classList.add("yyt-tww-hero--compact"):r.classList.remove("yyt-tww-hero--compact")};o(),s.addEventListener("scroll",o,{passive:!0})}var Kn,ud,Im,b0,Mm=P(()=>{it();H();Am();Kn=C.createScope("TableWorkbenchPanel"),ud=!1;Im={id:"tableWorkbenchPanel",render(){h0();try{let t=Em();return _m(t)}catch(t){return Kn.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!te()||!ve(t))return;let r=this,s=()=>{try{t.html(r.render()),dd(t,s),Cm(t),km(t)}catch(o){Kn.error("refresh \u5F02\u5E38",o)}};dd(t,s),Cm(t),km(t)},renderTo(t){!te()||!ve(t)||(t.html(this.render()),this.bindEvents(t))}},b0=Im});var Nm={};ie(Nm,{LoggerPanel:()=>Pm,default:()=>T0});function v0(t){switch(t){case ge.DEBUG:return"yyt-log-debug";case ge.INFO:return"yyt-log-info";case ge.WARN:return"yyt-log-warn";case ge.ERROR:return"yyt-log-error";default:return""}}function S0(t){let e=new Date(t),r=s=>String(s).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var x0,w0,Pm,T0,Dm=P(()=>{H();Qe();it();x0="yyt-logger-panel",w0=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:ge.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:ge.INFO,label:"INFO",icon:"fa-circle-info"},{level:ge.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:ge.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];Pm={id:"loggerPanel",render(){let t=C.getStats();return`
      <div class="yyt-logger-panel" id="${x0}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${w0.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
                <i class="fa-solid ${e.icon}"></i> ${e.label}
              </button>`).join("")}
          </div>
          <div class="yyt-logger-search-bar">
            <input class="yyt-input yyt-logger-search-input" type="text"
                   placeholder="\u641C\u7D22 scope \u6216\u6D88\u606F\u2026" data-yyt-log-search>
          </div>
          <div class="yyt-logger-actions">
            <label class="yyt-logger-autoscroll-label" title="\u5207\u6362\u81EA\u52A8\u6EDA\u52A8">
              <input type="checkbox" data-yyt-log-autoscroll checked> \u81EA\u52A8\u6EDA\u52A8
            </label>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-yyt-log-pause>
              <i class="fa-solid fa-pause"></i> \u6682\u505C
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-yyt-log-clear>
              <i class="fa-solid fa-eraser"></i> \u6E05\u9664
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-yyt-log-export>
              <i class="fa-solid fa-download"></i> \u5BFC\u51FA
            </button>
          </div>
        </div>

        <div class="yyt-logger-stats">
          <span class="yyt-logger-stat">\u5171 <strong>${t.total}</strong> \u6761</span>
          ${["ERROR","WARN","INFO","DEBUG"].map(e=>`<span class="yyt-logger-stat yyt-log-${e.toLowerCase()}">${e}: <strong>${t.byLevel[e]||0}</strong></span>`).join("")}
        </div>

        <div class="yyt-logger-list" data-yyt-log-list>
          <div class="yyt-logger-empty">\u6682\u65E0\u65E5\u5FD7\u8BB0\u5F55</div>
        </div>
      </div>
    `},bindEvents(t){let e=te();if(!e||!ve(t))return;let r=this,s=null,o=!1,n=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),d=t.find("[data-yyt-log-pause]");function c(p){if(!p.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(p.map(g=>`
        <div class="yyt-log-entry ${v0(g.level)}" data-log-id="${g.id}">
          <span class="yyt-log-time">${S0(g.timestamp)}</span>
          <span class="yyt-log-level">${C.levelLabel(g.level)}</span>
          <span class="yyt-log-scope">${le(g.scope)}</span>
          <span class="yyt-log-msg">${le(g.message)}</span>
          ${g.data!==void 0?`<span class="yyt-log-data">${le(typeof g.data=="object"?JSON.stringify(g.data):String(g.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let p=i.val()?.trim()||"",{entries:g}=C.getEntries({level:s,search:p||void 0,limit:500});c(g),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function y(){if(o||!n.length)return;let p=n;n=[],u()}this._onLogEntry=p=>{if(o||s!==null&&p.level<s)return;let g=i.val()?.trim().toLowerCase()||"";if(g){let m=p.scope.toLowerCase().includes(g),h=p.message.toLowerCase().includes(g);if(!m&&!h)return}n.push(p),n.length>=50?y():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,y(),r._updateStats(t)},250))},W.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",p=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(p.currentTarget).addClass("yyt-active");let g=e(p.currentTarget).data("level");s=g===""?null:g,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{o=!o,d.toggleClass("yyt-active",o),d.html(o?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),o||(n=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{C.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:p}=C.getEntries({limit:1e4}),g=JSON.stringify(p.map(_=>({time:new Date(_.timestamp).toISOString(),level:C.levelLabel(_.level),scope:_.scope,message:_.message,data:_.data})),null,2),m=new Blob([g],{type:"application/json"}),h=URL.createObjectURL(m),x=document.createElement("a");x.href=h,x.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,x.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!te()||!ve(t))return;let r=C.getStats(),s=t.find(".yyt-logger-stats");s.length&&s.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(o=>`<span class="yyt-logger-stat yyt-log-${o.toLowerCase()}">${o}: <strong>${r.byLevel[o]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=te();this._onLogEntry&&(W.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!ve(t))&&t.off(".yytLogger")},getStyles(){return`
      .yyt-logger-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 0;
      }

      .yyt-logger-toolbar {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        padding: 10px 12px;
        background: transparent;
        border-bottom: 1px solid var(--yyt-border);
      }

      .yyt-logger-filter-btns {
        display: flex;
        gap: 4px;
      }

      .yyt-log-filter-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius);
        background: var(--yyt-surface);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .yyt-log-filter-btn:hover {
        background: var(--yyt-surface-hover);
        color: var(--yyt-text);
      }

      .yyt-log-filter-btn.yyt-active {
        background: var(--yyt-accent-soft);
        border-color: var(--yyt-accent);
        color: var(--yyt-accent);
      }

      .yyt-logger-search-bar {
        flex: 1;
        min-width: 140px;
      }

      .yyt-logger-search-input {
        min-height: 34px !important;
        font-size: 12px !important;
      }

      .yyt-logger-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .yyt-logger-autoscroll-label {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        color: var(--yyt-text-muted);
        cursor: pointer;
      }

      .yyt-logger-stats {
        display: flex;
        gap: 14px;
        padding: 6px 12px;
        font-size: 11px;
        color: var(--yyt-text-muted);
      }

      .yyt-logger-stat strong {
        color: var(--yyt-text);
      }

      .yyt-logger-stat.yyt-log-error strong { color: var(--yyt-error); }
      .yyt-logger-stat.yyt-log-warn strong { color: var(--yyt-warning); }
      .yyt-logger-stat.yyt-log-info strong { color: var(--yyt-accent); }
      .yyt-logger-stat.yyt-log-debug strong { color: var(--yyt-text-muted); }

      .yyt-logger-list {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        border-radius: 0;
        background: transparent;
        border: none;
        border-top: 1px solid var(--yyt-border);
        font-family: "Cascadia Code", "Fira Code", "Consolas", monospace;
        font-size: 12px;
        line-height: 1.55;
      }

      .yyt-logger-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--yyt-text-muted);
        font-size: 13px;
      }

      .yyt-log-entry {
        display: grid;
        grid-template-columns: 90px 52px 140px 1fr;
        gap: 8px;
        align-items: baseline;
        padding: 4px 11px;
        border-bottom: 1px solid var(--yyt-border-soft);
        min-width: 0;
      }

      .yyt-log-entry:hover {
        background: var(--yyt-surface-hover);
      }

      .yyt-log-time {
        color: var(--yyt-text-muted);
        flex-shrink: 0;
      }

      .yyt-log-level {
        font-weight: 700;
        font-size: 10px;
        text-transform: uppercase;
        flex-shrink: 0;
      }

      .yyt-log-scope {
        color: var(--yyt-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .yyt-log-msg {
        color: var(--yyt-text);
        word-break: break-word;
        min-width: 0;
      }

      .yyt-log-data {
        grid-column: 1 / -1;
        padding: 4px 8px;
        margin-top: 2px;
        border-radius: var(--yyt-radius-sm);
        background: var(--yyt-surface);
        color: var(--yyt-text-muted);
        font-size: 11px;
        white-space: pre-wrap;
        word-break: break-all;
        max-height: 120px;
        overflow-y: auto;
      }

      .yyt-log-debug .yyt-log-level { color: var(--yyt-text-muted); }
      .yyt-log-info .yyt-log-level { color: var(--yyt-accent); }
      .yyt-log-warn .yyt-log-level { color: var(--yyt-warning); }
      .yyt-log-error .yyt-log-level { color: var(--yyt-error); }

      .yyt-log-error {
        background: rgba(248, 113, 113, 0.06);
      }

      .yyt-log-warn {
        background: rgba(251, 191, 36, 0.04);
      }

      @media screen and (max-width: 768px) {
        .yyt-log-entry {
          grid-template-columns: 70px 44px 100px 1fr;
          gap: 4px;
          padding: 4px 8px;
          font-size: 11px;
        }
        .yyt-logger-toolbar {
          gap: 6px;
        }
      }
    `}},T0=Pm});var jm={};ie(jm,{MAIN_TAB_RENDERERS:()=>Ad,PanelState:()=>Ni,SCRIPT_ID:()=>us,SUB_TAB_RENDERERS:()=>Cd,UIManager:()=>Yo,bindDialogEvents:()=>Ko,closeActiveCustomSelectDropdown:()=>Xt,closeCustomSelectDropdown:()=>$i,createDialogHtml:()=>zo,default:()=>E0,destroyEnhancedCustomSelects:()=>ft,downloadJson:()=>Uo,enhanceNativeSelects:()=>Bt,escapeHtml:()=>le,fillFormWithConfig:()=>Fh,getAllStyles:()=>Fm,getFormApiConfig:()=>Uh,getJQuery:()=>te,getTargetDocument:()=>hr,initUI:()=>Bm,isContainerValid:()=>ve,normalizeCustomSelectOptions:()=>Vd,openCustomSelectDropdown:()=>qd,readFileContent:()=>Fo,registerComponents:()=>pd,renderApiPanel:()=>yd,renderBypassPanel:()=>Sd,renderCustomSelectControl:()=>Jd,renderEscapeTransformToolPanel:()=>wd,renderLoggerPanel:()=>Ed,renderMainTab:()=>Km,renderPunctuationTransformToolPanel:()=>vd,renderRegexPanel:()=>gd,renderSettingsPanel:()=>Td,renderStatusBlockPanel:()=>bd,renderSubTabComponent:()=>Um,renderSummaryToolPanel:()=>hd,renderTableTemplatePanel:()=>md,renderTableWorkbenchPanel:()=>_d,renderToolPanel:()=>zm,renderWorldbookPresetPanel:()=>fd,renderYouyouReviewPanel:()=>xd,repositionActiveCustomSelectDropdown:()=>Li,resetJQueryCache:()=>Nh,showConfirm:()=>br,showPrompt:()=>jh,showToast:()=>Hn,showTopNotice:()=>Oi,toggleCustomSelectDropdown:()=>Yd,uiManager:()=>Ht,withButtonLoading:()=>Wh});async function Om(t){if(!vi.has(t)){let e=Lm[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);vi.set(t,e().then(r=>{let s=r?.[t]||r?.default;if(!s?.id)throw new Error(`invalid_panel:${t}`);return s}).catch(r=>{throw vi.delete(t),r}))}return vi.get(t)}function $m(t,e=null){let r=e?.message?`\uFF1A${le(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${le(t)}${r}</span></div>`}async function pd(){let t=await Promise.allSettled(Object.keys(Lm).map(async r=>{let s=await Om(r);return Ht.register(s.id,s),s.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>Un.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),Un.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function Bm(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...s}=t;Ht.init(s),await pd(),e&&Ht.injectStyles(r),Un.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function _0(t){let e=await Om(t);return Ht.getComponent(e.id)||Ht.register(e.id,e),e}async function At(t,e,r={}){let s=await _0(t);Ht.render(s.id,e,r)}function yd(t){return At("ApiPresetPanel",t)}function fd(t){return At("WorldbookPresetPanel",t)}function gd(t){return At("RegexExtractPanel",t)}function md(t){return At("TableTemplatePanel",t)}function zm(t){return At("ToolManagePanel",t)}function hd(t){return At("SummaryToolPanel",t)}function bd(t){return At("StatusBlockPanel",t)}function xd(t){return At("YouyouReviewPanel",t)}function wd(t){return At("EscapeTransformToolPanel",t)}function vd(t){return At("PunctuationTransformToolPanel",t)}function Sd(t){return At("BypassPanel",t)}function Td(t){return At("SettingsPanel",t)}function _d(t){return At("TableWorkbenchPanel",t)}function Ed(t){return At("LoggerPanel",t)}async function Km(t,e){let r=Ad[t];if(!r)return!1;try{await r.render(e)}catch(s){Un.error(r.failMessage,s),e.html($m(r.failMessage,s))}return!0}async function Um(t,e){let r=Cd[t];if(!r)return null;try{await r.render(e)}catch(s){Un.error(r.failMessage,s),e.html($m(r.failMessage,s))}return t}function Fm(){return Ht.getAllStyles()}var Un,Lm,vi,Ad,Cd,E0,Wm=P(()=>{H();Vi();it();it();Vi();Un=C.createScope("UI"),Lm=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(_u(),Tu)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(Fu(),Uu)),RegexExtractPanel:()=>Promise.resolve().then(()=>(Yp(),qp)),TableTemplatePanel:()=>Promise.resolve().then(()=>(df(),cf)),ToolManagePanel:()=>Promise.resolve().then(()=>(yf(),pf)),SummaryToolPanel:()=>Promise.resolve().then(()=>(Of(),Lf)),StatusBlockPanel:()=>Promise.resolve().then(()=>(zf(),Bf)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(Ff(),Uf)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(Gf(),Hf)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(Vf(),Yf)),BypassPanel:()=>Promise.resolve().then(()=>(Qf(),Xf)),SettingsPanel:()=>Promise.resolve().then(()=>(Dc(),Nc)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(Mm(),Rm)),LoggerPanel:()=>Promise.resolve().then(()=>(Dm(),Nm))}),vi=new Map;Ad=Object.freeze({tableWorkbench:{render:t=>_d(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>Sd(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>Td(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>Ed(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),Cd=Object.freeze({ApiPresetPanel:{render:t=>yd(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>gd(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>fd(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>md(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>hd(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>bd(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>xd(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>wd(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>vd(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});E0={uiManager:Ht,registerComponents:pd,initUI:Bm,renderApiPanel:yd,renderWorldbookPresetPanel:fd,renderRegexPanel:gd,renderTableTemplatePanel:md,renderToolPanel:zm,renderSummaryToolPanel:hd,renderStatusBlockPanel:bd,renderYouyouReviewPanel:xd,renderEscapeTransformToolPanel:wd,renderPunctuationTransformToolPanel:vd,renderBypassPanel:Sd,renderSettingsPanel:Td,renderTableWorkbenchPanel:_d,renderLoggerPanel:Ed,MAIN_TAB_RENDERERS:Ad,SUB_TAB_RENDERERS:Cd,renderMainTab:Km,renderSubTabComponent:Um,getAllStyles:Fm}});var Jm={};ie(Jm,{TX_PHASE:()=>Wt,ToolAutomationService:()=>Ti,Transaction:()=>Si,default:()=>R0,toolAutomationService:()=>Vm});function me(t){return t==null?"":String(t).trim()}function Hm(t){let e=ua(t);return me(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function kd(t){let e=ua(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function Ym(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function A0(t,e){let r=me(e);if(!r)return null;let s=kd(t);for(let o=s.length-1;o>=0;o-=1){let n=s[o];if([n?.messageId,n?.message_id,n?.id,n?.mid,n?.mesid,n?.chat_index,o].map(i=>me(i)).includes(r))return n||null}return null}function Gm(t){let e=kd(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,s=e[r]||null;if(!Ym(s))return null;let o=me(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??r);return o?{messageId:o,swipeId:me(s?.swipeId??s?.swipe_id??s?.swipe??s?.swipeIndex),message:s}:null}function I0(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var qe,qm,C0,k0,Wt,Si,Ti,Vm,R0,Xm=P(()=>{Sn();H();pa();ar();_n();vc();ws();bi();lr();qe=C.createScope("ToolAutomation");qm=1e4,C0=15e3,k0=800;Wt=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Si=class{constructor({chatId:e,messageId:r,swipeId:s,sourceEvent:o,generationKey:n}){this.traceId=I0(),this.chatId=e||"",this.messageId=r||"",this.swipeId=s||"",this.sourceEvent=o||"",this.generationKey=n||"",this.phase=Wt.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},Ti=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=zr();this._currentChatId=Hm(r);let s=(o,...n)=>{let a=zr(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(n);if(qe.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${o}"`,{messageId:i,swipeId:l,argCount:n.length}),o===je.MESSAGE_RECEIVED){let m=Date.now();if(m<this._messageReceivedThrottleUntil){qe.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-m}ms\uFF09`);return}this._messageReceivedThrottleUntil=m+this._getSettleMs()+5e3}let d=null,c=i,u=l;if(c&&(d=A0(a,c)),!d){let m=Gm(a);m?.messageId&&(d=m.message,c=m.messageId,u=m.swipeId||u)}if(!c||!d){qe.debug(`\u4E8B\u4EF6 "${o}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!Ym(d)){qe.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let y=String(d.content||d.mes||"").trim();if(!y||y.length<5){qe.debug(`\u4E8B\u4EF6 "${o}" \u6D88\u606F\u8FC7\u77ED\uFF08${y.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){qe.debug(`\u4E8B\u4EF6 "${o}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(c)){qe.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let p=me(d?.swipeId??d?.swipe_id??d?.swipe??d?.swipeIndex);p&&(u=p);let g=`${c}::${u}`;if(this._isRecentlyProcessed(g)){qe.debug(`\u4E8B\u4EF6 "${o}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:g});return}this._scheduleMessageProcessing(c,u,{settleMs:this._getSettleMs(),sourceEvent:o}),qe.info(`\u4E8B\u4EF6 "${o}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:c,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(wt.subscribe(je.MESSAGE_SENT,()=>{qe.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear()})),this._stopCallbacks.push(wt.subscribe(je.MESSAGE_RECEIVED,(...o)=>{s(je.MESSAGE_RECEIVED,...o)})),this._stopCallbacks.push(wt.subscribe(je.GENERATION_STOPPED,()=>{qe.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(wt.subscribe(je.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(wt.subscribe(je.MESSAGE_DELETED,o=>{this._clearMessageState(me(o))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),qe.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=zr(),r=Gm(e);if(!r?.messageId)return;let s=`${me(r.messageId)}::${me(r.swipeId)}`;this._recentlyProcessedSlots.set(s,Number.MAX_SAFE_INTEGER),qe.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${s}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){qe.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=wt.describe(),r=[je.MESSAGE_SENT,je.MESSAGE_RECEIVED,je.GENERATION_STOPPED,je.CHAT_CHANGED,je.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(s=>`subscribed: ${s}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){qe.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await xs({messageId:"",swipeId:"",runSource:"AUTO"}),s=me(r?.sourceMessageId||r?.messageId);return s?this.processAssistantMessage(s,{force:e.force===!0,swipeId:me(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:s="",sourceEvent:o="AUTO"}={}){let n=new Si({chatId:this._currentChatId,messageId:e,swipeId:s,sourceEvent:o});try{if(!e)return this._skipTransaction(n,"missing_message_id");n.transition(Wt.CONFIRMED);let a=await xs({messageId:e,swipeId:s,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition(Wt.CONTEXT_BUILT);let d=`${me(a.sourceMessageId)}::${me(a.sourceSwipeId||s)}`;if(n.generationKey=d,!r&&this._isRecentlyProcessed(d))return this._skipTransaction(n,"duplicate_slot",{slotKey:d});let c=nn(),u=Lt.filterAutoPostResponseTools(c),p=[...c.filter(h=>Lt.shouldRunLocalTransform(h)&&h.output?.autoTrigger!==!1),...u],g=Ne(),m=g?.autoUpdateEnabled===!0&&me(g?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!p.length&&!m?this._skipTransaction(n,"no_auto_tools",{tools:p}):(n.slotKey=d,n.slotRevisionKey=a.slotRevisionKey||"",n.sourceMessageId=a.sourceMessageId||e,n.sourceSwipeId=a.sourceSwipeId||s||"",this._enqueueSlot(d,async()=>{if(!r&&this._isRecentlyProcessed(d))return this._skipTransaction(n,"duplicate_slot_after_queue",{slotKey:d});this._isProcessing=!0,this._markSlotProcessed(d),n.transition(Wt.REQUEST_STARTED);let h=new AbortController;this._registerActiveTransaction(n,{controller:h,slotKey:d,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||s||""});try{let{results:x,hasWriteback:_}=await this._executeAutoTools(p,a,h,n,{slotKey:d,messageId:e,swipeId:s}),{tableResult:w,hasWriteback:B}=await this._executeAutoTableUpdate(a,h,n,{shouldRunTableAuto:m,tableWorkbenchConfig:g,messageId:e,swipeId:s,sourceEvent:o}),A=_||B;n.transition(Wt.REQUEST_FINISHED,{toolResults:x,tableResult:w}),A&&(n.transition(Wt.WRITEBACK_STARTED),n.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+C0),this._markSlotProcessed(d);let T=x.every(v=>v?.success!==!1),E=!m||!!w?.success||w?.skipped===!0||w?.meta?.aborted===!0||w?.meta?.stale===!0,L=T&&E,O=x.some(v=>v?.meta?.aborted===!0||v?.meta?.stale===!0||v?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||w?.meta?.aborted===!0||w?.meta?.stale===!0;L&&n.transition(Wt.WRITEBACK_COMMITTED);let k=L?Wt.REFRESH_CONFIRMED:Wt.FAILED;return n.transition(k,{verdict:O?"aborted":L?"success":"partial_failure"}),this._recordTransaction(n),this._updateAutoRuntimeForResults(p,a,n,x),{success:L,traceId:n.traceId,slotKey:d,sourceEvent:o,messageId:a.sourceMessageId||e,phase:n.phase,results:x,tableResult:w}}finally{this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1}}))}catch(a){return n.transition(Wt.FAILED,{error:a?.message||String(a)}),this._recordTransaction(n),this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1,qe.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let r="",s="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!r){r=me(o);continue}if(typeof o=="string"){let n=me(o);!r&&/^\d+$/.test(n)&&(r=n);continue}typeof o=="object"&&(r||(r=me(o.messageId??o.message_id??o.id??o.mid??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mid??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.data?.mid??o.data?.mesid??o.data?.chat_index??o.target?.messageId??o.target?.message_id??o.target?.id??o.target?.mid??o.target?.mesid??o.target?.chat_index)),s||(s=me(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:r,swipeId:s}}_scheduleMessageProcessing(e,r="",s={}){let o=s.settleMs??this._getSettleMs(),n=`msg::${me(e)}::${me(r)}`,a=this._pendingTimers.get(n);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:r,sourceEvent:s.sourceEvent||"AUTO"}).catch(l=>{qe.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(n,i),qe.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:o,sourceEvent:s.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",s=me(e.messageId),o=me(e.slotKey),n=me(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let d=s&&i.includes(`::${s}::`),c=o&&i.includes(o);(d||c||!s&&!o&&!n)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:s,slotKey:o,traceId:n}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,s]of this._recentlyProcessedSlots)(!Number.isFinite(s)||s<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,s,o,{slotKey:n,messageId:a,swipeId:i}){let l=[],d=!1,c=r.lastAiMessage,u=r.assistantBaseText;for(let y of e){let p={...r,signal:s.signal,isAutoRun:!0,abortMeta:{traceId:o.traceId,slotKey:n,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:o.traceId}),skipNotify:!0,lastAiMessage:c,assistantBaseText:u,input:{...r.input||{},lastAiMessage:c,assistantBaseText:u}},m=Lt.shouldRunLocalTransform(y)?await Za(y,p):await Lt.runToolPostResponse(y,p);if(l.push(m),m?.writebackState||m?.output){d=!0,this._markOwnWrite(r.sourceMessageId||a);let h=this._readCurrentMessageText(r.sourceMessageId||a);if(h){c=h,u=h;let x=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[x]&&(r.chatMessages[x].content=h,r.chatMessages[x].mes=h)}}}return{results:l,hasWriteback:d}}async _executeAutoTableUpdate(e,r,s,{shouldRunTableAuto:o,tableWorkbenchConfig:n,messageId:a,swipeId:i,sourceEvent:l}){if(!o)return{tableResult:null,hasWriteback:!1};let d=await pm({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:n,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId})}),c=!!(d?.state||d?.mirrorResult?.success===!0);return c&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:d,hasWriteback:c}}_readCurrentMessageText(e){let r=zr(),s=kd(r),o=Number(e);if(!Number.isFinite(o)||o<0||o>=s.length)return"";let n=s[o];return String(n?.mes||n?.content||"").trim()}_markOwnWrite(e){let r=me(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=me(e);if(!r)return!1;this._pruneOwnWrites();let s=this._ownWriteMessageIds.get(r);return s?Date.now()-s<qm:!1}_pruneOwnWrites(){let e=Date.now()-qm;for(let[r,s]of this._ownWriteMessageIds)(!Number.isFinite(s)||s<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),qe.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,s={}){return e.transition(Wt.SKIPPED,{verdict:r,...s}),this._recordTransaction(e),Array.isArray(s?.tools)&&s.tools.length>0&&this._updateAutoRuntimeForSkip(s.tools,e,r,s),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...s}}_enqueueSlot(e,r){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let s=me(r.messageId),o=me(r.slotKey),n=me(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let d=n&&i===n,c=s&&me(l?.sourceMessageId)===s,u=o&&me(l?.slotKey)===o;if(!(!d&&!c&&!u&&!(!n&&!s&&!o))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=me(e.traceId);if(r){let s=this._activeTransactions.get(r);if(!s||s.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,s,o={}){e.forEach(n=>{n?.id&&Ur(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:s||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,s,o=[]){e.forEach((n,a)=>{if(!n?.id)return;let i=o[a]||{},l=i?.meta?.writebackDetails||{},d=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",c=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";Ur(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:d,lastAutoMessageId:r?.sourceMessageId||s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:c},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=zr(),r=Hm(e);qe.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,s]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(s),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(me(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=Ft.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:k0;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},Vm=new Ti,R0=Vm});var th={};ie(th,{BUILTIN_REGEX_PRESETS:()=>Ei,BUILTIN_WORLDBOOK_PRESETS:()=>Id,MIGRATION_BACKUP_KEY:()=>Zm,MIGRATION_DONE_KEY:()=>_i,default:()=>D0,ensurePresetSystem:()=>eh,registerBuiltinPresets:()=>Rd,runMigrationOnce:()=>Md});function M0(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of Ei)if(r.rules.filter(o=>o.type==="include"&&o.enabled!==!1).map(o=>o.value).sort().join("|")===e)return r.id;return null}function Rd(){try{typeof Dl=="function"&&Dl(Ei),typeof al=="function"&&al(Id),ns.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:Ei.length,worldbook:Id.length})}catch(t){ns.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function P0(t){let e=new Set,r=[];for(let s of Array.isArray(t)?t:[]){let o=String(s||"").trim();if(!(!o||e.has(o)))if(e.add(o),o.startsWith("regex:")){let n=o.slice(6).trim();n&&r.push({type:"regex_include",value:n,enabled:!0,name:"",description:""})}else r.push({type:"include",value:o,enabled:!0,name:"",description:""})}return r}function N0(t,e,r){let s=JSON.parse(JSON.stringify(r||{})),o=!1,n=s.extraction||{};if(!n.regexPresetId){let i=Array.isArray(n.selectors)?n.selectors:[];if(i.length>0){let l=M0(i);if(l)n.regexPresetId=l,o=!0,ns.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let d=Sa({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:P0(i),blacklist:[]});d?.id&&(n.regexPresetId=d.id,o=!0,ns.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${d.id}`))}s.extraction=n}}let a=s.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=na({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,o=!0,ns.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),s.worldbooks=a}return o?s:null}function Md(){try{if(Ie.get(_i)===!0)return{skipped:!0,reason:"already_done"};let t=$.get(Qm)||{};if(!t||typeof t!="object")return ns.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),Ie.set(_i,!0),{skipped:!0,reason:"no_configs"};Ie.set(Zm,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[s,o]of Object.entries(t)){if(!o||typeof o!="object")continue;let n=N0(s,o.name,o);n&&(r[s]=n,e+=1)}return e>0&&$.set(Qm,r),Ie.set(_i,!0),ns.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return ns.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function eh(){return Rd(),Md()}var ns,_i,Zm,Qm,Ei,Id,D0,rh=P(()=>{Fe();H();jr();Ys();ns=C.createScope("PresetBootstrap"),_i="migration_v45_done",Zm="migration_v45_backup",Qm="tool_configs",Ei=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],Id=[];D0={registerBuiltinPresets:Rd,runMigrationOnce:Md,ensurePresetSystem:eh}});var Nd={};ie(Nd,{confirmDeleteTool:()=>K0,confirmResetTools:()=>j0,getAllTools:()=>sr,getTool:()=>or,showExportToolsDialog:()=>U0,showImportToolsDialog:()=>F0,showToolEditDialog:()=>z0});async function z0(t=null){let e=t?or(t):null,r=!!e,s=be({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),o=Me({value:e?.category||"utility",options:B0}),n=be({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=f("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=f("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(p,g,m=""){let h=f("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return h.appendChild(f("label",{text:p,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),h.appendChild(g),m&&h.appendChild(f("div",{text:m,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),h}let d=f("div",{style:{display:"flex",flexDirection:"column"}}),c=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});c.appendChild(l("\u5DE5\u5177\u540D\u79F0",s.el)),c.appendChild(l("\u5206\u7C7B",o.el)),d.appendChild(c),d.appendChild(l("\u63CF\u8FF0",n.el));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),d.appendChild(u);let y=Pe.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:d,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:p=>{let g=String(s.get()||"").trim();if(!g){s.el.focus();return}let m=t||`tool_${Date.now()}`;if(!Zs(m,{name:g,category:o.get(),description:String(n.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){Pd.warn("saveTool \u5931\u8D25",{id:m});return}try{no(m)}catch(x){Pd.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:x})}p(m)}}]});return setTimeout(()=>s.el.focus(),0),y.result}async function K0(t){let e=or(t);return!e||!await Pe.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:eo(t)}function U0(){let t;try{t=to()}catch(r){Pe.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,Pe.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=f("a",{attrs:{href:s,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(o),o.click(),setTimeout(()=>{try{document.body.removeChild(o)}catch{}try{URL.revokeObjectURL(s)}catch{}},100)}catch(r){Pd.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function F0(){let t=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=f("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=f("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(f("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let s=f("div");s.appendChild(t),s.appendChild(e),s.appendChild(f("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},X({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let n=f("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),n.click()}}).el));let o=Pe.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:s,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=t.value.trim();if(!a){n(null);return}try{let i=ro(a,{overwrite:r.checked});n(i)}catch(i){await Pe.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),o.result}async function j0(){return await Pe.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(so(),!0):!1}var Pd,B0,Dd=P(()=>{ra();Zt();rn();ar();H();Pd=C.createScope("ToolActions"),B0=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});var J0={};ie(J0,{default:()=>V0});H();it();var sh={};function oh(t,e={}){let{constants:r,topLevelWindow:s,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,d=null,c=!1,u=C.createScope("Bootstrap");C.setToastHandler((A,T,E)=>{if(E.toast&&Hn(E.toast===!0?A:E.toast,T,E.duration),E.topNotice){let L=typeof E.topNotice=="object"?E.topNotice:{};Oi(A,T,L)}});function y(...A){u.log(A.join(" "))}function p(...A){u.error(A.join(" "))}async function g(){return d||(d=(async()=>{try{o.storageModule=await Promise.resolve().then(()=>(Fe(),Qd)),o.apiConnectionModule=await Promise.resolve().then(()=>(Vn(),su)),o.presetManagerModule=await Promise.resolve().then(()=>(qo(),iu)),o.uiModule=await Promise.resolve().then(()=>(Wm(),jm)),o.regexExtractorModule=await Promise.resolve().then(()=>(Qs(),Sl)),o.toolManagerModule=await Promise.resolve().then(()=>(rn(),xp)),o.toolExecutorModule=await Promise.resolve().then(()=>(Ec(),_c)),o.windowManagerModule=await Promise.resolve().then(()=>(rd(),mm)),o.toolRegistryModule=await Promise.resolve().then(()=>(ar(),Rl)),o.settingsServiceModule=await Promise.resolve().then(()=>(Sn(),mf)),o.bypassManagerModule=await Promise.resolve().then(()=>(_o(),gf)),o.variableResolverModule=await Promise.resolve().then(()=>(Va(),wf)),o.contextInjectorModule=await Promise.resolve().then(()=>(Ds(),bf)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(Xa(),Tf)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(_n(),Ef)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(Xm(),Jm)),o.toolDataProviderModule=await Promise.resolve().then(()=>(mo(),Sy)),o.presetBootstrapModule=await Promise.resolve().then(()=>(rh(),th));try{o.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(A=>{u.log(`Provider \u5C31\u7EEA: ${A.kind}`)}).catch(A=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${A?.message||A}`)})}catch(A){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${A?.message||A}`)}return o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(A){return d=null,p("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",A),p("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(o).filter(T=>o[T])),!1}})(),d)}function m(){return`
/**
 * YouYou Toolkit - \u4E3B\u6837\u5F0F\u6587\u4EF6
 * @description \u62BD\u79BB\u6837\u5F0F\uFF0C\u5305\u542B\u4E3B\u9876\u680F\u3001\u6B21\u7EA7\u9876\u680F\u3001\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u548C\u7A97\u53E3\u6837\u5F0F
 */

/* ============================================================
   CSS\u53D8\u91CF
   ============================================================ */

:root {
  /* \u2014\u2014 Accent & semantic \u2014\u2014 */
  --yyt-accent: #7bb7ff;
  --yyt-accent-glow: rgba(123, 183, 255, 0.4);
  --yyt-accent-soft: rgba(123, 183, 255, 0.15);
  --yyt-accent-strong: #a5d4ff;
  --yyt-on-accent: #0a0d13;
  --yyt-success: #4ade80;
  --yyt-success-glow: rgba(74, 222, 128, 0.3);
  --yyt-error: #ef4444;
  --yyt-danger: var(--yyt-error);
  --yyt-danger-soft: rgba(239, 68, 68, 0.16);
  --yyt-error-glow: rgba(239, 68, 68, 0.3);
  --yyt-warning: #fbbf24;

  /* \u2014\u2014 Surface ladder (solid, no gradients) \u2014\u2014 */
  --yyt-bg-base: #0a0d13;
  --yyt-surface: #0f1219;
  --yyt-surface-2: #151a24;
  --yyt-surface-3: #1c2231;
  --yyt-surface-hover: #1c2231;
  --yyt-surface-active: #232b3e;
  --yyt-surface-raised: var(--yyt-surface-2);
  --yyt-surface-overlay: var(--yyt-surface-3);
  --yyt-surface-elevated: var(--yyt-surface-active);

  /* \u2014\u2014 Borders (two-level hairline) \u2014\u2014 */
  --yyt-border: rgba(255, 255, 255, 0.06);
  --yyt-border-soft: rgba(255, 255, 255, 0.04);
  --yyt-border-strong: rgba(255, 255, 255, 0.12);
  --yyt-border-subtle: var(--yyt-border-soft);
  --yyt-border-default: var(--yyt-border);
  --yyt-border-emphasis: var(--yyt-border-strong);
  --yyt-border-focus: rgba(123, 183, 255, 0.5);

  /* \u2014\u2014 Text \u2014\u2014 */
  --yyt-text: rgba(255, 255, 255, 0.92);
  --yyt-text-secondary: rgba(255, 255, 255, 0.55);
  --yyt-text-muted: rgba(255, 255, 255, 0.35);
  --yyt-color-text-primary: var(--yyt-text);
  --yyt-color-text-secondary: var(--yyt-text-secondary);
  --yyt-color-text-muted: var(--yyt-text-muted);
  --yyt-color-accent: var(--yyt-accent);

  /* \u2014\u2014 Focus (double-ring) \u2014\u2014 */
  --yyt-focus-ring: 0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15);

  /* \u2014\u2014 Radii (strict outer > inner) \u2014\u2014 */
  --yyt-radius-xs: 4px;
  --yyt-radius-sm: 6px;
  --yyt-radius: 8px;
  --yyt-radius-lg: 12px;
  --yyt-radius-xl: 16px;
  --yyt-control-radius: 6px;
  --yyt-control-radius-sm: 4px;

  /* \u2014\u2014 Shadows (floating elements only) \u2014\u2014 */
  --yyt-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  --yyt-shadow-soft: 0 4px 16px rgba(0, 0, 0, 0.3);
  --yyt-shadow-glow: 0 0 16px var(--yyt-accent-glow);

  /* \u2014\u2014 Controls (solid, no gradients) \u2014\u2014 */
  --yyt-control-bg: #0f1219;
  --yyt-control-bg-hover: #151a24;
  --yyt-control-bg-active: #1c2231;
  --yyt-control-bg-strong: #151a24;
  --yyt-control-bg-focus: #151a24;
  --yyt-control-border: rgba(255, 255, 255, 0.08);
  --yyt-control-border-hover: rgba(255, 255, 255, 0.14);
  --yyt-control-border-focus: rgba(123, 183, 255, 0.5);
  --yyt-control-shadow: none;
  --yyt-control-shadow-hover: none;
  --yyt-control-shadow-focus: none;
  --yyt-control-shadow-active: none;

  /* \u2014\u2014 Select/Dropdown \u2014\u2014 */
  --yyt-select-surface: #151a24;
  --yyt-select-option-bg: #1c2231;
  --yyt-select-option-hover-bg: #232b3e;
  --yyt-select-option-selected-bg: #2a3450;
  --yyt-select-option-border: rgba(123, 183, 255, 0.15);
  --yyt-select-option-selected-border: rgba(123, 183, 255, 0.3);
  --yyt-select-dropdown-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  --yyt-select-arrow-color: rgba(255, 255, 255, 0.4);

  /* \u2014\u2014 Startup (one decorative accent allowed) \u2014\u2014 */
  --yyt-startup-overlay: rgba(6, 8, 16, 0.8);
  --yyt-startup-panel-border: rgba(255, 255, 255, 0.08);
  --yyt-startup-panel-bg:
    radial-gradient(500px 200px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 60%),
    #0f1219;
  --yyt-startup-panel-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  --yyt-startup-chip-bg: rgba(255, 255, 255, 0.05);
  --yyt-startup-chip-border: rgba(255, 255, 255, 0.08);
  --yyt-startup-status-bg: rgba(255, 255, 255, 0.05);
  --yyt-startup-status-border: rgba(255, 255, 255, 0.08);
  --yyt-startup-status-text: rgba(255, 255, 255, 0.8);
  --yyt-startup-kicker-bg: rgba(123, 183, 255, 0.1);
  --yyt-startup-kicker-border: rgba(123, 183, 255, 0.2);

  /* \u2014\u2014 Motion \u2014\u2014 */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --yyt-ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --yyt-duration-fast: 150ms;
  --yyt-duration-normal: 250ms;

  /* \u2014\u2014 Typography scale \u2014\u2014 */
  --yyt-text-xs: 10px;
  --yyt-text-sm: 11px;
  --yyt-text-base: 13px;
  --yyt-text-md: 14px;
  --yyt-text-lg: 16px;
  --yyt-text-xl: 20px;
  --yyt-text-2xl: 24px;

  /* \u2014\u2014 Layout \u2014\u2014 */
  --yyt-shell-sidebar-width: 220px;
  --yyt-shell-topbar-gap: 12px;
  --yyt-shell-gap: 0px;
  --yyt-panel-gap: 0px;
  --yyt-backdrop: rgba(6, 8, 16, 0.75);
}

/* ============================================================
   \u57FA\u7840\u5E03\u5C40
   ============================================================ */

.yyt-app {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  color: var(--yyt-text);
}

/* ============================================================
   \u4E3B\u9876\u680F\u6837\u5F0F
   ============================================================ */

.yyt-main-nav {
  display: flex;
  gap: 6px;
  padding: 6px;
  background: transparent;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid var(--yyt-border-soft);
  flex-shrink: 0;
}

.yyt-main-nav-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
  color: var(--yyt-text-secondary);
  font-weight: 600;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  min-width: 0;
  border: 1px solid transparent;
}

.yyt-main-nav-item:hover {
  color: var(--yyt-text);
  background: rgba(255, 255, 255, 0.045);
  border-color: var(--yyt-border-soft);
}

.yyt-main-nav-item:focus-visible {
  outline: none;
  box-shadow: var(--yyt-focus-ring);
}

.yyt-main-nav-item.active {
  color: var(--yyt-on-accent);
  background: var(--yyt-accent);
  box-shadow: none;
}

.yyt-main-nav-icon {
  width: 38px;
  height: 38px;
  border-radius: var(--yyt-radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--yyt-accent-soft);
  border: none;
  flex-shrink: 0;
}

.yyt-main-nav-item.active .yyt-main-nav-icon {
  background: var(--yyt-accent-soft);
  border-color: transparent;
}

.yyt-main-nav-item i {
  font-size: 15px;
  transition: transform 0.22s ease;
}

.yyt-main-nav-item:hover i {
  transform: scale(1.08);
}

.yyt-main-nav-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1;
}

.yyt-main-nav-name {
  font-size: var(--yyt-text-base);
  font-weight: 700;
  color: inherit;
}

.yyt-main-nav-desc {
  font-size: var(--yyt-text-sm);
  line-height: 1.5;
  color: inherit;
  opacity: 0.74;
}

/* ============================================================
   \u6B21\u7EA7\u9876\u680F\u6837\u5F0F
   ============================================================ */

.yyt-sub-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px;
  background: transparent;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid var(--yyt-border-soft);
  flex-shrink: 0;
}

.yyt-sub-nav-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  flex: 1 1 260px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: transparent;
  box-shadow: none;
}

.yyt-sub-nav-group-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 26px;
  padding: 0 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.42px;
  text-transform: uppercase;
  color: var(--yyt-text-muted);
}

.yyt-sub-nav-group-title::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.03);
}

.yyt-sub-nav-group-ai .yyt-sub-nav-group-title::before {
  background: var(--yyt-accent);
  box-shadow: 0 0 0 3px var(--yyt-accent-soft);
}

.yyt-sub-nav-group-script .yyt-sub-nav-group-title::before {
  background: rgba(251, 191, 36, 0.92);
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.12);
}

.yyt-sub-nav-group-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.yyt-sub-nav-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  color: var(--yyt-text-secondary);
  font-weight: 700;
  font-size: var(--yyt-text-sm);
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.015);
}

.yyt-sub-nav-item:hover {
  color: var(--yyt-text);
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--yyt-border-soft);
  transform: translateY(-1px);
}

.yyt-sub-nav-item.active {
  color: var(--yyt-accent);
  background: var(--yyt-accent-soft);
  border-color: var(--yyt-accent-soft);
  box-shadow: none;
}

.yyt-sub-nav-item i {
  font-size: 12px;
}

/* ============================================================
   \u5185\u5BB9\u533A\u57DF
   ============================================================ */

.yyt-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 12px;
  border-radius: 0;
  background: transparent;
  border: none;
}

.yyt-page {
  display: none;
  animation: yytSlideUp 0.3s var(--ease-out);
}

.yyt-page.active {
  display: block;
}

/* \u2014\u2014 Phase E2: \u7EDF\u4E00\u52A8\u753B keyframes \u2014\u2014 */
@keyframes yytFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes yytSlideUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes yytScaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes yytScaleInCentered {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

/* \u2014\u2014 Window manager animations \u2014\u2014 */
@keyframes yytWindowFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

/* \u2014\u2014 Notice & Toast animations \u2014\u2014 */
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

@keyframes yyt-toast-in {
  from { opacity: 0; transform: translateX(100px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes yyt-toast-out {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(100px); }
}

/* ============================================================
   \u9762\u677F\u6837\u5F0F
   ============================================================ */

.yyt-panel {
  display: flex;
  flex-direction: column;
  gap: var(--yyt-panel-gap);
}

.yyt-panel-section {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.yyt-panel-section > .yyt-section-title + * {
  min-width: 0;
}

/* Flat Flow Layout Primitives */
.yyt-flow-section + .yyt-flow-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--yyt-border);
}

.yyt-flow-heading {
  font-size: 12px;
  font-weight: 700;
  color: var(--yyt-text);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.yyt-flow-heading-icon {
  width: 22px;
  height: 22px;
  border-radius: var(--yyt-radius-sm);
  background: var(--yyt-accent-soft);
  color: var(--yyt-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

.yyt-flow-heading-action {
  margin-left: auto;
}

.yyt-stat-row {
  display: grid;
  gap: 0;
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius);
  overflow: hidden;
}

.yyt-stat-cell {
  padding: 16px 18px;
  background: var(--yyt-surface-2);
  transition: background 0.12s ease;
}

.yyt-stat-cell:hover {
  background: var(--yyt-surface-3);
}

.yyt-stat-cell + .yyt-stat-cell {
  border-left: 1px solid var(--yyt-border);
}

.yyt-stat-label {
  font-size: 10px;
  color: var(--yyt-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 700;
}

.yyt-stat-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--yyt-text);
  margin-top: 6px;
}

.yyt-list-table {
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius);
  overflow: hidden;
}

.yyt-list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--yyt-surface-2);
  transition: background 0.1s ease;
}

.yyt-list-row:hover {
  background: var(--yyt-surface-3);
}

.yyt-list-row + .yyt-list-row {
  border-top: 1px solid var(--yyt-border);
}

.yyt-list-row-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--yyt-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.yyt-list-row-main {
  flex: 1;
  min-width: 0;
}

.yyt-list-row-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--yyt-text);
}

.yyt-list-row-desc {
  font-size: 11px;
  color: var(--yyt-text-muted);
  margin-top: 2px;
}

.yyt-list-row-actions {
  display: flex;
  gap: 6px;
}

.yyt-form-inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--yyt-border);
}

.yyt-form-inline:last-child {
  border-bottom: none;
}

.yyt-form-inline-label {
  flex: 1;
}

.yyt-form-inline-control {
  flex-shrink: 0;
}

.yyt-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.yyt-status-dot-on {
  background: var(--yyt-success);
  box-shadow: 0 0 6px var(--yyt-success);
}

.yyt-status-dot-off {
  background: var(--yyt-text-muted);
}

.yyt-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
  letter-spacing: 0.3px;
}

.yyt-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: var(--yyt-text-sm);
  color: var(--yyt-color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.yyt-section-title i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 10px;
  color: var(--yyt-accent);
  font-size: 14px;
  background: var(--yyt-accent-soft);
  border: 1px solid var(--yyt-accent-soft);
  
}

/* ============================================================
   \u6309\u94AE\u6837\u5F0F
   ============================================================ */

.yyt-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 10px 16px;
  border: 1px solid var(--yyt-control-border);
  border-radius: var(--yyt-control-radius);
  background: var(--yyt-control-bg-strong);
  color: var(--yyt-text);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease, color 0.18s ease, filter 0.18s ease;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.2px;
  box-shadow: var(--yyt-control-shadow);
}

.yyt-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  display: none;
  pointer-events: none;
}

.yyt-btn::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.025);
  pointer-events: none;
}

.yyt-btn:hover {
  transform: translateY(-1px);
  border-color: var(--yyt-control-border-hover);
  background: var(--yyt-control-bg-hover);
  box-shadow: var(--yyt-control-shadow-hover);
}

.yyt-btn:active {
  transform: translateY(0) scale(0.98);
  background: var(--yyt-control-bg-active);
  box-shadow: var(--yyt-control-shadow-active);
  filter: saturate(0.98);
}

.yyt-btn:focus-visible {
  outline: none;
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
}

.yyt-btn-primary {
  background: var(--yyt-accent);
  color: var(--yyt-on-accent);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: none;
}

.yyt-btn-primary:hover {
  background: var(--yyt-accent-strong);
  box-shadow: none;
}

.yyt-btn-primary:active {
  background: var(--yyt-accent);
}

.yyt-btn-secondary {
  background: var(--yyt-surface-2);
  color: var(--yyt-text);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: none;
}

.yyt-btn-secondary:hover {
  background: var(--yyt-surface-3);
  border-color: rgba(255, 255, 255, 0.18);
}

.yyt-btn-danger {
  background: var(--yyt-danger-soft);
  color: #ffb4b4;
  border-color: rgba(248, 113, 113, 0.32);
  box-shadow: 0 12px 24px rgba(248, 113, 113, 0.12);
}

.yyt-btn-danger:hover {
  background: rgba(248, 113, 113, 0.2);
  border-color: rgba(248, 113, 113, 0.42);
  box-shadow: 0 16px 30px rgba(248, 113, 113, 0.16);
}

.yyt-btn-icon {
  padding: 0;
  width: 40px;
  min-width: 40px;
}

.yyt-btn-small {
  min-height: 34px;
  padding: 7px 12px;
  font-size: 12px;
  border-radius: var(--yyt-control-radius-sm);
}

.yyt-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
  filter: none !important;
}

/* ============================================================
   \u8868\u5355\u6837\u5F0F
   ============================================================ */

.yyt-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.yyt-form-group label {
  font-size: var(--yyt-text-sm);
  font-weight: 600;
  color: var(--yyt-color-text-secondary);
  letter-spacing: 0.3px;
}

.yyt-form-hint {
  font-size: 11px;
  color: var(--yyt-text-muted);
  line-height: 1.6;
}

.yyt-form-hint code {
  font-size: 11px;
  color: var(--yyt-accent);
  background: var(--yyt-accent-soft);
  padding: 1px 5px;
  border-radius: 3px;
  font-weight: 600;
}

.yyt-settings-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--yyt-text-secondary);
  line-height: 1.6;
}

.yyt-settings-hint i {
  color: var(--yyt-accent);
}

.yyt-form-row {
  display: flex;
  gap: 12px;
}

.yyt-flex-1 {
  flex: 1;
}

.yyt-checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  min-width: 0;
}

.yyt-checkbox-label > span {
  color: var(--yyt-text);
  font-weight: 700;
  line-height: 1.5;
}

.yyt-checkbox-label > span:last-child {
  flex: 1;
  min-width: 0;
}

.yyt-checkbox-label input[type="checkbox"],
.yyt-checkbox-label input[type="radio"] {
  width: 18px;
  height: 18px;
  margin: 0;
  flex-shrink: 0;
  cursor: pointer;
  accent-color: var(--yyt-accent);
}

.yyt-checkbox-label input[type="checkbox"]:focus-visible,
.yyt-checkbox-label input[type="radio"]:focus-visible {
  outline: none;
  box-shadow: var(--yyt-focus-ring);
  border-radius: 6px;
}

.yyt-worldbook-item .yyt-checkbox-label,
.yyt-form-group > .yyt-checkbox-label {
  padding: 0;
  border-radius: 0;
  border: none;
  background: transparent;
}

.yyt-worldbook-item .yyt-checkbox-label:hover,
.yyt-form-group > .yyt-checkbox-label:hover {
  background: transparent;
}

/* \u8F93\u5165\u6846 */
.yyt-input,
.yyt-select,
.yyt-textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 42px;
  padding: 11px 15px;
  border: 1px solid var(--yyt-control-border);
  border-radius: var(--yyt-control-radius);
  background: var(--yyt-control-bg);
  color: var(--yyt-text);
  font-size: 13px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, transform 0.18s ease;
  box-shadow: var(--yyt-control-shadow);
}

.yyt-select {
  --yyt-select-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a8b7ca' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg);
  padding-right: 36px;
}

.yyt-input:hover,
.yyt-select:hover,
.yyt-textarea:not(.yyt-code-textarea):hover {
  border-color: var(--yyt-control-border-hover);
  background: var(--yyt-control-bg-hover);
  box-shadow: var(--yyt-control-shadow-hover);
}

.yyt-select:hover {
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg-hover);
}

.yyt-input:focus,
.yyt-select:focus,
.yyt-textarea:not(.yyt-code-textarea):focus,
.yyt-input:focus-visible,
.yyt-select:focus-visible,
.yyt-textarea:not(.yyt-code-textarea):focus-visible {
  outline: none;
  border-color: var(--yyt-control-border-focus);
  background: var(--yyt-control-bg-focus);
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
}

.yyt-select:focus,
.yyt-select:focus-visible {
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg-focus);
}

.yyt-select:disabled {
  color: var(--yyt-text-muted);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-surface);
  cursor: not-allowed;
}

.yyt-select option,
.yyt-select optgroup {
  background: var(--yyt-surface) !important;
  color: var(--yyt-text) !important;
}

.yyt-select option:checked,
.yyt-select option[selected] {
  background: var(--yyt-surface-3);
  color: #f5fbff;
}

.yyt-select option:disabled {
  color: rgba(255, 255, 255, 0.42);
}

.yyt-select optgroup {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.78);
}

.yyt-textarea.yyt-code-textarea {
  color: var(--yyt-text);
  caret-color: var(--yyt-accent-strong);
  background: #080a10;
}

.yyt-textarea.yyt-code-textarea:hover,
.yyt-textarea.yyt-code-textarea:focus,
.yyt-textarea.yyt-code-textarea:focus-visible {
  color: var(--yyt-text);
  caret-color: var(--yyt-accent-strong);
  border-color: var(--yyt-border-focus);
  background: #080a10;
}

.yyt-input::placeholder,
.yyt-textarea::placeholder {
  color: rgba(255, 255, 255, 0.42);
}

.yyt-textarea {
  resize: vertical;
  min-height: 112px;
  line-height: 1.65;
}

/* Toggle\u5F00\u5173 */
.yyt-toggle-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: none;
}

.yyt-toggle-row:hover {
  background: var(--yyt-surface);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: none;
}

.yyt-toggle-label {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
}

.yyt-toggle-label > span:first-child {
  font-weight: 700;
  font-size: 14px;
  color: var(--yyt-text);
  line-height: 1.45;
}

.yyt-toggle-hint {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.56);
  line-height: 1.55;
}

.yyt-toggle {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 30px;
  flex-shrink: 0;
  align-self: center;
}

.yyt-toggle.yyt-small {
  width: 46px;
  height: 26px;
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
  background: var(--yyt-surface-3);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  transition: all 0.28s var(--ease-in-out);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12), 0 6px 14px rgba(0, 0, 0, 0.12);
}

.yyt-toggle-slider::before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background: #ffffff;
  border-radius: 50%;
  transition: all 0.28s var(--ease-in-out);
  box-shadow: none;
}

.yyt-toggle.yyt-small .yyt-toggle-slider::before {
  width: 18px;
  height: 18px;
  left: 3px;
  bottom: 3px;
}

.yyt-toggle input:focus-visible + .yyt-toggle-slider {
  box-shadow: var(--yyt-focus-ring), inset 0 -1px 0 rgba(0, 0, 0, 0.12), 0 6px 14px rgba(0, 0, 0, 0.12);
}

.yyt-toggle input:checked + .yyt-toggle-slider {
  background: var(--yyt-accent);
  border-color: var(--yyt-accent);
  box-shadow: none;
}

.yyt-toggle input:checked + .yyt-toggle-slider::before {
  transform: translateX(22px);
}

.yyt-toggle.yyt-small input:checked + .yyt-toggle-slider::before {
  transform: translateX(20px);
}

/* ============================================================
   \u9884\u8BBE\u9009\u62E9\u5668\u6837\u5F0F
   ============================================================ */

.yyt-preset-selector {
  display: flex;
  gap: 12px;
  align-items: center;
}

.yyt-custom-select {
  position: relative;
  isolation: isolate;
  flex: 1;
  min-width: 0;
}

.yyt-select-fixed-width {
  flex: 0 0 auto;
  width: 176px;
  min-width: 176px;
}

.yyt-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 42px;
  padding: 11px 15px;
  border: 1px solid var(--yyt-control-border);
  border-radius: var(--yyt-control-radius);
  background: var(--yyt-control-bg);
  color: var(--yyt-text);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease, transform 0.22s ease;
  box-shadow: var(--yyt-control-shadow);
}

.yyt-select-trigger:hover {
  border-color: var(--yyt-control-border-hover);
  background: var(--yyt-control-bg-hover);
  box-shadow: var(--yyt-control-shadow-hover);
}

.yyt-custom-select.yyt-open .yyt-select-trigger {
  border-color: var(--yyt-control-border-focus);
  background: var(--yyt-control-bg-focus);
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
}

.yyt-select-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yyt-select-arrow {
  color: var(--yyt-select-arrow-color);
  transition: transform 0.2s ease, color 0.2s ease;
  margin-left: 8px;
}

.yyt-custom-select.yyt-open .yyt-select-arrow {
  transform: rotate(180deg);
  color: var(--yyt-accent-strong);
}

.yyt-select-portal-layer {
  position: fixed;
  inset: 0;
  z-index: 10040;
  pointer-events: none;
}

.yyt-select-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 0;
  overflow: hidden;
  box-sizing: border-box;
  min-width: 100%;
  padding: 0;
  background: var(--yyt-select-surface) !important;
  background-image: none !important;
  border: 1px solid var(--yyt-control-border-hover);
  border-radius: 6px;
  box-shadow: var(--yyt-select-dropdown-shadow);
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  z-index: 3200;
  opacity: 0;
  pointer-events: none;
  transition: max-height 0.25s var(--ease-in-out), opacity 0.2s ease, border-color 0.2s ease, padding 0.2s ease;
}

.yyt-custom-select.yyt-open .yyt-select-dropdown,
.yyt-select-dropdown.yyt-floating-open {
  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 1;
  padding: 8px;
  pointer-events: auto;
}

.yyt-select-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 11px 14px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
  border: 1px solid transparent;
  border-radius: 6px;
  margin: 0;
  background: var(--yyt-select-option-bg) !important;
  background-image: none !important;
  color: var(--yyt-text);
}

.yyt-select-option:hover {
  background: var(--yyt-select-option-hover-bg) !important;
  background-image: none !important;
  border-color: var(--yyt-select-option-border);
  transform: translateY(-1px);
}

.yyt-select-option.yyt-selected {
  background: var(--yyt-select-option-selected-bg) !important;
  background-image: none !important;
  border-color: var(--yyt-select-option-selected-border);
  box-shadow: none;
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
  background: rgba(255, 255, 255, 0.03);
  color: var(--yyt-text-muted);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.yyt-option-star:hover {
  color: var(--yyt-accent);
  background: var(--yyt-accent-soft);
  border-color: var(--yyt-accent-soft);
}

.yyt-option-delete:hover {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.18);
}

.yyt-option-star.yyt-starred {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.12);
  border-color: rgba(251, 191, 36, 0.2);
}

.yyt-option-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--yyt-text);
  font-size: 13px;
}

/* \u9884\u8BBE\u5217\u8868 */
.yyt-preset-list-compact {
  display: flex;
  flex-direction: column;
  max-height: 150px;
  overflow-y: auto;
}

.yyt-preset-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 11px 14px;
  background: transparent;
  border: none;
  border-top: 1px solid var(--yyt-border);
  border-radius: 0;
  transition: background 0.2s ease;
}

.yyt-preset-item:first-child {
  border-top: none;
}

.yyt-preset-item:hover {
  background: var(--yyt-surface-3);
}

.yyt-preset-item.active {
  background: var(--yyt-accent-soft);
}

.yyt-preset-item.yyt-loaded {
  background: rgba(74, 222, 128, 0.12);
}

.yyt-preset-info {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.yyt-preset-name {
  font-weight: 600;
  font-size: 13px;
  color: var(--yyt-text);
}

.yyt-preset-meta {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.yyt-preset-actions {
  display: flex;
  gap: 6px;
  opacity: 0.58;
  transition: opacity 0.2s ease;
}

.yyt-preset-item:hover .yyt-preset-actions {
  opacity: 1;
}

/* \u5FBD\u7AE0 */
.yyt-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: var(--yyt-text-sm);
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--yyt-surface-2);
  color: var(--yyt-color-text-secondary);
}

.yyt-badge-small {
  padding: 3px 8px;
  font-size: 10px;
  background: var(--yyt-accent-soft);
  color: var(--yyt-accent-strong);
  border: 1px solid var(--yyt-accent-soft);
}

/* ============================================================
   \u5BF9\u8BDD\u6846\u6837\u5F0F
   ============================================================ */

.yyt-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.62);
  backdrop-filter: blur(12px) saturate(1.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 10001;
  animation: yytFadeIn 0.2s var(--ease-out);
}

.yyt-dialog {
  background: var(--yyt-bg-base);
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
  width: 380px;
  max-width: 90vw;
  max-height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: yytScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.yyt-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid var(--yyt-border);
}

.yyt-dialog-wide {
  width: min(720px, calc(100vw - 32px));
}

.yyt-dialog-body::-webkit-scrollbar {
  width: 8px;
}

.yyt-dialog-body::-webkit-scrollbar-track {
  background: transparent;
}

.yyt-dialog-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.14);
  border-radius: 4px;
}

.yyt-dialog-body::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.24);
}

/* ============================================================
   \u9762\u677F\u5E95\u90E8
   ============================================================ */

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

/* ============================================================
   \u7A7A\u72B6\u6001
   ============================================================ */

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

/* ============================================================
   \u7981\u7528\u72B6\u6001
   ============================================================ */

.yyt-disabled {
  opacity: 0.4;
  pointer-events: none;
  filter: grayscale(0.5);
}

/* ============================================================
   \u6EDA\u52A8\u6761\u6837\u5F0F
   ============================================================ */

.yyt-panel::-webkit-scrollbar,
.yyt-content::-webkit-scrollbar,
.yyt-select-dropdown::-webkit-scrollbar {
  width: 6px;
}

.yyt-panel::-webkit-scrollbar-track,
.yyt-content::-webkit-scrollbar-track,
.yyt-select-dropdown::-webkit-scrollbar-track {
  background: transparent;
}

.yyt-panel::-webkit-scrollbar-thumb,
.yyt-content::-webkit-scrollbar-thumb,
.yyt-select-dropdown::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 3px;
}

.yyt-panel::-webkit-scrollbar-thumb:hover,
.yyt-content::-webkit-scrollbar-thumb:hover,
.yyt-select-dropdown::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ============================================================
   \u52A8\u753B
   ============================================================ */

.yyt-panel-section {
  animation: yytSlideUp 0.25s var(--ease-out) backwards;
}

.yyt-panel-section:nth-child(1) { animation-delay: 0s; }
.yyt-panel-section:nth-child(2) { animation-delay: 0.05s; }
.yyt-panel-section:nth-child(3) { animation-delay: 0.1s; }

/* ============================================================
   \u4E3B\u5F39\u7A97\u6837\u5F0F
   ============================================================ */

.yyt-popup-overlay {
  position: fixed;
  inset: 0;
  background: var(--yyt-backdrop);
  backdrop-filter: blur(16px) saturate(1.15);
  -webkit-backdrop-filter: blur(16px) saturate(1.15);
  z-index: 9999;
  animation: yytFadeIn 0.2s var(--ease-out);
}

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
  background: var(--yyt-bg-base);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 28px 84px rgba(0, 0, 0, 0.58),
    0 0 80px var(--yyt-accent-soft);
  animation: yytScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  color: var(--yyt-text);
  z-index: 10000;
}

.yyt-popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 20px;
  background: var(--yyt-surface);
  border-bottom: 1px solid var(--yyt-border);
  border-radius: 12px 12px 0 0;
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
  font-size: 16px;
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
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: var(--yyt-accent);
  background: var(--yyt-accent-soft);
  border: 1px solid var(--yyt-accent-soft);
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
  border: 1px solid var(--yyt-border);
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
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  font-size: 14px;
}

.yyt-popup-close:hover {
  background: rgba(248, 113, 113, 0.14);
  border-color: rgba(248, 113, 113, 0.2);
  color: #ff6b6b;
}

.yyt-popup-body {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 12px 16px;
  overflow: hidden;
}

.yyt-popup-shell {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.yyt-content-frame {
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  padding: 0;
  border-radius: 0;
  background: transparent;
}

.yyt-content-frame .yyt-content {
  height: 100%;
}

.yyt-content-inner {
  min-height: 100%;
  height: 100%;
}

.yyt-startup-screen {
  position: absolute;
  inset: 16px 18px;
  z-index: 3;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 18px;
  border-radius: 8px;
  background: var(--yyt-startup-overlay);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.38);
}

.yyt-startup-screen-inner {
  width: min(760px, 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  padding: 30px 32px;
  border-radius: 12px;
  border: 1px solid var(--yyt-startup-panel-border);
  background: var(--yyt-startup-panel-bg);
  box-shadow: var(--yyt-startup-panel-shadow);
}

.yyt-startup-screen-kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.52px;
  text-transform: uppercase;
  color: var(--yyt-accent-strong);
  background: var(--yyt-startup-kicker-bg);
  border: 1px solid var(--yyt-startup-kicker-border);
}

.yyt-startup-screen-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.5px;
  color: var(--yyt-text);
}

.yyt-startup-screen-desc {
  max-width: 62ch;
  font-size: 14px;
  line-height: 1.8;
  color: var(--yyt-text-secondary);
}

.yyt-startup-screen-modules {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.yyt-startup-module-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 13px;
  border-radius: 6px;
  background: var(--yyt-startup-chip-bg);
  border: 1px solid var(--yyt-startup-chip-border);
  color: var(--yyt-text);
  font-size: 12px;
  font-weight: 700;
}

.yyt-startup-module-chip i {
  color: var(--yyt-accent-strong);
}

.yyt-startup-screen-status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  max-width: 100%;
  padding: 11px 14px;
  border-radius: 8px;
  background: var(--yyt-startup-status-bg);
  border: 1px solid var(--yyt-startup-status-border);
  color: var(--yyt-startup-status-text);
  font-size: 12px;
  line-height: 1.6;
}

.yyt-startup-screen-status i {
  color: var(--yyt-accent-strong);
}

.yyt-startup-enter {
  align-self: flex-start;
  min-width: 148px;
}

.yyt-popup-shell[data-yyt-startup-visible="true"] .yyt-shell-workspace {
  filter: blur(1px);
  pointer-events: none;
  user-select: none;
}

.yyt-shell-topbar {
  position: relative;
  isolation: isolate;
  flex-shrink: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 300px);
  gap: 12px;
  padding: 16px 18px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--yyt-surface);
}

.yyt-shell-topbar::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  display: none;
  pointer-events: none;
  opacity: 0.82;
}

.yyt-shell-topbar-main {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.yyt-shell-kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 7px 12px;
  border-radius: 999px;
  background: var(--yyt-accent-soft);
  border: 1px solid var(--yyt-accent-soft);
  color: var(--yyt-accent-strong);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: none;
  flex-shrink: 0;
}

.yyt-shell-topbar-summary {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.yyt-shell-topbar-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.15;
  color: var(--yyt-text);
}

.yyt-shell-topbar-meta {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
}

.yyt-shell-current-desc {
  font-size: 12px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.76);
}

.yyt-shell-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(84px, 1fr));
  gap: 10px;
  align-self: stretch;
}

.yyt-shell-stat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  min-width: 84px;
  padding: 16px 14px 14px;
  border-radius: 0;
  background: transparent;
  border: none;
  border-left: 1px solid var(--yyt-border);
}

.yyt-shell-stat:first-child {
  border-left: none;
}

.yyt-shell-stat-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.54);
  letter-spacing: 0.48px;
  text-transform: uppercase;
}

.yyt-shell-stat-value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  color: var(--yyt-text);
}

.yyt-shell-workspace {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(230px, var(--yyt-shell-sidebar-width)) minmax(0, 1fr);
  gap: 16px;
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
  gap: 14px;
  overflow: hidden;
  padding: 0;
  border-radius: 0;
  border: none;
  background: transparent;
  box-shadow: none;
}

.yyt-shell-sidebar-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.yyt-shell-sidebar-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--yyt-text);
}

.yyt-shell-sidebar-hint {
  font-size: 10px;
  color: var(--yyt-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.yyt-shell-sidebar .yyt-main-nav {
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin-bottom: 0;
  background: transparent;
  border: none;
  min-height: 0;
  overflow-y: auto;
}

.yyt-shell-sidebar .yyt-main-nav-item {
  position: relative;
  width: 100%;
  min-width: 0;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: none;
  background: transparent;
}

.yyt-shell-sidebar .yyt-main-nav-item::before {
  content: '';
  position: absolute;
  inset: 10px auto 10px 0;
  width: 4px;
  border-radius: 999px;
  background: transparent;
  transition: background 0.18s ease, box-shadow 0.18s ease;
}

.yyt-shell-sidebar .yyt-main-nav-item:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: none;
}

.yyt-shell-sidebar .yyt-main-nav-item.active {
  color: var(--yyt-text);
  border-color: var(--yyt-accent-soft);
  background: var(--yyt-accent-soft);
}

.yyt-shell-sidebar .yyt-main-nav-item.active::before {
  background: var(--yyt-accent);
}

.yyt-shell-sidebar .yyt-main-nav-icon {
  width: 42px;
  height: 42px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.yyt-shell-sidebar .yyt-main-nav-item.active .yyt-main-nav-icon {
  background: var(--yyt-accent-soft);
  border-color: var(--yyt-accent-soft);
}

.yyt-shell-sidebar-note {
  padding: 10px 14px;
  border-radius: 0;
  border: none;
  background: transparent;
  color: var(--yyt-text-muted);
  font-size: 11px;
  line-height: 1.65;
}

.yyt-shell-main {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.yyt-shell-main-header {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: transparent;
  box-shadow: none;
}

.yyt-shell-main-header::after {
  content: '';
  position: absolute;
  inset: 0;
  display: none;
  pointer-events: none;
}

.yyt-shell-main-actions {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  margin-left: auto;
}

.yyt-shell-main-heading-block {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 9px;
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
  font-weight: 700;
  color: rgba(255, 255, 255, 0.58);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.yyt-shell-breadcrumb {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: var(--yyt-text);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  max-width: 100%;
}

.yyt-shell-main-title {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.06;
  letter-spacing: -0.3px;
  color: var(--yyt-text);
}

.yyt-shell-main-description {
  font-size: 13px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  max-width: 68ch;
}

.yyt-shell-main-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--yyt-border);
  color: var(--yyt-text);
  font-size: 12px;
  line-height: 1.5;
  box-shadow: none;
}

.yyt-shell-main-save-btn {
  white-space: nowrap;
  flex-shrink: 0;
}

.yyt-shell-main-meta i {
  color: var(--yyt-accent-strong);
}

.yyt-popup-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 22px;
  background: var(--yyt-surface);
  border-top: 1px solid var(--yyt-border);
  border-radius: 0 0 12px 12px;
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
  gap: 12px;
  min-width: 0;
  flex-wrap: wrap;
}

.yyt-popup-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--yyt-text);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.yyt-popup-status i {
  color: var(--yyt-accent-strong);
}

.yyt-popup-footer-note {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
}

.yyt-shell-sidebar .yyt-main-nav,
.yyt-sub-nav,
.yyt-content,
.yyt-tab-content,
.yyt-sub-content {
  overscroll-behavior: contain;
}

.yyt-scrollable-surface {
  cursor: grab;
}

.yyt-scrollable-surface.yyt-scroll-dragging {
  cursor: grabbing;
  user-select: none;
}

/* \u6807\u7B7E\u5185\u5BB9 */
.yyt-tab-content {
  display: none;
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  height: 100%;
}

.yyt-tab-content.active {
  display: flex;
  flex-direction: column;
}

/* \u5B50\u5185\u5BB9\u533A\u57DF */
.yyt-sub-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
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

/* \u54CD\u5E94\u5F0F\u8C03\u6574 */
@media screen and (max-width: 980px) {
  .yyt-shell-topbar {
    grid-template-columns: 1fr;
  }

  .yyt-shell-topbar-main {
    align-items: flex-start;
  }

  .yyt-shell-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .yyt-popup-header {
    padding: 12px 16px;
  }

  .yyt-popup-body {
    padding: 12px 14px;
  }

  .yyt-startup-screen {
    inset: 12px 14px;
    padding: 14px;
  }

  .yyt-startup-screen-inner {
    padding: 24px 22px;
  }

  .yyt-popup-header-actions {
    gap: 8px;
  }

  .yyt-popup-drag-hint {
    padding: 6px 10px;
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

  .yyt-shell-topbar-title,
  .yyt-shell-main-description {
    font-size: 11px;
    line-height: 1.4;
  }

  .yyt-shell-stat {
    padding: 8px 10px;
  }

  .yyt-shell-stat-value {
    font-size: 16px;
  }

  .yyt-startup-screen {
    inset: 10px 12px;
    padding: 12px;
  }

  .yyt-startup-screen-inner {
    gap: 14px;
    padding: 22px 20px;
  }

  .yyt-startup-screen-desc {
    font-size: 12px;
    line-height: 1.6;
  }
}

@media screen and (max-width: 860px) {
  .yyt-shell-workspace {
    grid-template-columns: 1fr;
  }

  .yyt-shell-sidebar .yyt-main-nav {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 4px;
  }

  .yyt-shell-sidebar .yyt-main-nav-item {
    min-width: 220px;
  }

  .yyt-startup-screen {
    inset: 12px;
    padding: 12px;
  }

  .yyt-startup-screen-inner {
    padding: 22px 18px;
  }
}

@media screen and (max-width: 768px) {
  .yyt-dialog-overlay {
    align-items: flex-start;
    padding: 10px;
  }

  .yyt-dialog {
    width: 100%;
    max-width: 100%;
    max-height: calc(100vh - 20px);
  }

  .yyt-dialog-body {
    padding: 16px;
  }

  .yyt-dialog-footer,
  .yyt-dialog-header {
    padding-left: 16px;
    padding-right: 16px;
  }

  .yyt-popup {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    border: none;
  }

  .yyt-popup-header {
    border-radius: 0;
    padding: 10px 14px;
    align-items: flex-start;
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
    border-radius: 8px;
  }

  .yyt-shell-topbar-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .yyt-shell-topbar-title {
    font-size: 16px;
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

  .yyt-shell-sidebar .yyt-main-nav {
    flex-direction: column;
    overflow: visible;
  }

  .yyt-shell-sidebar .yyt-main-nav-item {
    min-width: 0;
  }

  .yyt-main-nav-item {
    padding: 12px 14px;
  }

  .yyt-main-nav-desc {
    font-size: 10px;
  }

  .yyt-startup-screen {
    inset: 10px 14px;
    padding: 10px;
    border-radius: 6px;
  }

  .yyt-startup-screen-inner {
    padding: 20px 16px;
    border-radius: 8px;
  }

  .yyt-startup-screen-status {
    width: 100%;
  }

  .yyt-startup-enter {
    align-self: stretch;
  }

  .yyt-popup-footer {
    border-radius: 0;
    padding: 10px 14px;
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

/* ============================================================
   Shell polish: tab transitions, sidebar collapse, micro-interactions
   ============================================================ */

/* ---- Tab content enter animation ---- */
.yyt-tab-content.active {
  animation: yytSlideUp 0.22s var(--ease-out);
}

/* ---- Sidebar collapse system ---- */
.yyt-shell-sidebar {
  transition: width 0.28s var(--ease-in-out);
  width: var(--yyt-shell-sidebar-width);
}

.yyt-shell-sidebar.yyt-collapsed {
  width: 56px;
}

.yyt-shell-workspace {
  transition: grid-template-columns 0.28s var(--ease-in-out);
}

.yyt-shell-workspace.yyt-sidebar-collapsed {
  grid-template-columns: 56px minmax(0, 1fr);
}

/* Collapsed sidebar: hide all text, keep icons only */
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-name,
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-desc,
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-note,
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-title,
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-hint,
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-stats {
  display: none;
}

.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-item {
  padding: 14px 10px;
  justify-content: center;
}

.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-icon {
  width: 36px;
  height: 36px;
}

.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-copy {
  display: none;
}

.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-card {
  padding: 12px 8px;
}

.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-item::before {
  display: none;
}

/* ---- Sidebar collapse toggle button ---- */
.yyt-sidebar-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--yyt-text-muted);
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
  font-size: 12px;
  flex-shrink: 0;
}

.yyt-sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--yyt-text);
  border-color: rgba(255, 255, 255, 0.18);
}

.yyt-sidebar-toggle:focus-visible {
  outline: none;
  box-shadow: var(--yyt-focus-ring);
}

/* ---- Compact sidebar stats ---- */
.yyt-shell-sidebar-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  padding-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.yyt-shell-sidebar-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border-radius: 0;
  background: transparent;
  border: none;
}

.yyt-shell-sidebar-stat-value {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  color: var(--yyt-text);
}

.yyt-shell-sidebar-stat-label {
  font-size: 9px;
  font-weight: 700;
  color: var(--yyt-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

/* ---- Shell main heading block ---- */
.yyt-shell-main-heading-block {
  gap: 6px;
}

.yyt-shell-breadcrumb {
  /* breadcrumb removed from main header \u2014 now only sidebar active state shows location */
}

/* ---- Footer compact ---- */
.yyt-popup-footer {
  padding: 8px 20px;
}

.yyt-popup-footer-left {
  gap: 8px;
}

/* ---- Sub-content enter animation ---- */
.yyt-sub-content {
  animation: yytSlideUp 0.2s var(--ease-out);
}

/* ---- Nav item micro-interactions ---- */
.yyt-shell-sidebar .yyt-main-nav-item {
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease, padding 0.28s var(--ease-in-out);
}

.yyt-shell-sidebar .yyt-main-nav-item::before {
  transition: background 0.18s ease, box-shadow 0.18s ease;
}

.yyt-shell-sidebar .yyt-main-nav-item:hover {
  transform: translateX(2px);
}

.yyt-shell-sidebar .yyt-main-nav-item:focus-visible {
  outline: none;
  box-shadow: var(--yyt-focus-ring);
}

/* ---- Shell workspace gap ---- */
.yyt-shell-workspace {
  gap: 12px;
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ---- Responsive: collapsed sidebar on narrow screens ---- */
@media screen and (max-width: 860px) {
  .yyt-shell-sidebar.yyt-collapsed {
    width: 100%;
  }

  .yyt-shell-workspace.yyt-sidebar-collapsed {
    grid-template-columns: 1fr;
  }

  .yyt-sidebar-toggle {
    display: none;
  }
}

/* ============================================================
   Form Controls (input / select / textarea)
   ============================================================ */

.yyt-input,
.yyt-select,
.yyt-textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 42px;
  padding: 11px 15px;
  border: 1px solid var(--yyt-control-border) !important;
  border-radius: var(--yyt-control-radius) !important;
  background: var(--yyt-control-bg) !important;
  color: var(--yyt-text) !important;
  font-size: 13px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  box-shadow: var(--yyt-control-shadow);
}

.yyt-select {
  --yyt-select-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a8b7ca' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg);
  padding-right: 36px;
}

.yyt-input:hover,
.yyt-select:hover,
.yyt-textarea:not(.yyt-code-textarea):hover {
  border-color: var(--yyt-control-border-hover);
  background: var(--yyt-control-bg-hover);
  box-shadow: var(--yyt-control-shadow-hover);
}

.yyt-select:hover {
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg-hover);
}

.yyt-input:focus,
.yyt-select:focus,
.yyt-textarea:not(.yyt-code-textarea):focus,
.yyt-input:focus-visible,
.yyt-select:focus-visible,
.yyt-textarea:not(.yyt-code-textarea):focus-visible {
  outline: none;
  border-color: var(--yyt-control-border-focus);
  background: var(--yyt-control-bg-focus);
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
}

.yyt-select:focus,
.yyt-select:focus-visible {
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg-focus);
}

.yyt-select:disabled {
  color: var(--yyt-text-muted);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-surface);
  cursor: not-allowed;
}

.yyt-select option,
.yyt-select optgroup {
  background: var(--yyt-surface) !important;
  color: var(--yyt-text) !important;
}

.yyt-select option:checked,
.yyt-select option[selected] {
  background: var(--yyt-surface-3);
  color: #f5fbff;
}

.yyt-select option:disabled {
  color: rgba(255, 255, 255, 0.42);
}

.yyt-textarea.yyt-code-textarea {
  color: var(--yyt-text);
  caret-color: var(--yyt-accent-strong);
  background: #080a10;
}

.yyt-textarea.yyt-code-textarea:hover,
.yyt-textarea.yyt-code-textarea:focus,
.yyt-textarea.yyt-code-textarea:focus-visible {
  color: var(--yyt-text);
  caret-color: var(--yyt-accent-strong);
  border-color: var(--yyt-border-focus);
  background: #080a10;
}

.yyt-input::placeholder,
.yyt-textarea::placeholder {
  color: rgba(255, 255, 255, 0.42);
}

.yyt-textarea {
  resize: vertical;
  min-height: 112px;
  line-height: 1.65;
}

/* ============================================================
   Custom Select Portal
   ============================================================ */

.yyt-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 42px;
  padding: 11px 15px;
  border: 1px solid var(--yyt-control-border);
  border-radius: var(--yyt-control-radius);
  background: var(--yyt-control-bg);
  color: var(--yyt-text);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.18s ease, background 0.18s ease;
}

.yyt-select-trigger:hover {
  border-color: var(--yyt-control-border-hover);
  background: var(--yyt-control-bg-hover);
}

.yyt-select-dropdown {
  background: var(--yyt-select-surface) !important;
  background-image: none !important;
  backdrop-filter: none !important;
  border: 1px solid var(--yyt-control-border-hover);
  border-radius: 6px;
  box-shadow: var(--yyt-select-dropdown-shadow);
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 280px;
  overflow-y: auto;
}

.yyt-select-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--yyt-text);
  background: var(--yyt-select-option-bg) !important;
  border: 1px solid transparent;
  transition: background 0.12s ease, border-color 0.12s ease;
}

.yyt-select-option:hover {
  background: var(--yyt-select-option-hover-bg) !important;
  border-color: var(--yyt-select-option-border);
}

.yyt-select-option.yyt-selected {
  background: var(--yyt-select-option-selected-bg) !important;
  border-color: var(--yyt-select-option-selected-border);
  color: var(--yyt-accent-strong);
  font-weight: 600;
}
    `}async function h(){let A=`${n}-styles`,T=s.document||document;if(T.getElementById(A))return;let E="",L=[];try{L.push(new URL("../styles/main.css",sh.url).href)}catch{}try{L.push(new URL("../../styles/main.css",sh.url).href)}catch{}L.push("./styles/main.css");for(let k of[...new Set(L.filter(Boolean))])try{let v=await fetch(k);if(v.ok){E=await v.text();break}}catch{}E||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),E=m());let O=T.createElement("style");O.id=A,O.textContent=E,(T.head||T.documentElement).appendChild(O),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function x(){let A=s.document||document;if(o.uiModule?.getAllStyles){let T=`${n}-ui-styles`;if(!A.getElementById(T)){let E=A.createElement("style");E.id=T,E.textContent=o.uiModule.getAllStyles(),(A.head||A.documentElement).appendChild(E)}}}async function _(){try{let{applyUiPreferences:A}=await Promise.resolve().then(()=>(Dc(),Nc));if(o.settingsServiceModule?.settingsService){let T=o.settingsServiceModule.settingsService.getUiSettings();if(T&&T.theme){let E=s.document||document;A(T,E),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${T.theme}`)}}}catch(A){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",A)}}function w(){let A=s.jQuery||window.jQuery;if(!A){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(w,1e3);return}let T=s.document||document,E=A("#extensionsMenu",T);if(!E.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(w,2e3);return}if(A(`#${l}`,E).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let O=A(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),k=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,v=A(k);v.on("click",function(j){j.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let q=A("#extensionsMenuButton",T);q.length&&E.is(":visible")&&q.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),O.append(v),E.append(O),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function B(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await h();let A=await g();if(y(A?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!c&&o.uiModule?.initUI)try{await o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:s.document||document}),c=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(E){p("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",E)}if(o.uiModule&&(x(),await _()),o.presetBootstrapModule?.ensurePresetSystem)try{let E=o.presetBootstrapModule.ensurePresetSystem();E?.aborted?y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${E.error}`):E?.skipped?y(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${E.reason}\uFF09`):y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${E.migratedCount}/${E.total} \u5DE5\u5177\uFF09`)}catch(E){p("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",E)}if(o.toolAutomationServiceModule?.toolAutomationService){let E=o.toolAutomationServiceModule.toolAutomationService.init();y(E?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let T=s.document||document;T.readyState==="loading"?T.addEventListener("DOMContentLoaded",()=>{setTimeout(w,1e3)}):setTimeout(w,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:g,injectStyles:h,addMenuItem:w,init:B,log:y,logError:p}}Qe();it();it();H();var Do=C.createScope("PromptEditor"),L0="youyou_toolkit_prompt_editor",O0={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},$0={system:"fa-server",ai:"fa-robot",user:"fa-user"},Fn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Ai=class{constructor(e={}){this.containerId=e.containerId||L0,this.segments=e.segments||[...Fn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){Do.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Fn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
          ${this.segments.map(r=>this.renderSegment(r)).join("")}
        </div>
      </div>
    `;this.$container.html(e)}renderSegment(e){let r=O0[e.type]||e.type,s=$0[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,a=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${o?"yyt-main-a":""} ${n?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${a?`border-left: 3px solid ${a};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${s}"></i>
            <span class="yyt-prompt-segment-title">${r}</span>
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
    `}bindEvents(){this.$container&&(ft(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:s})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:s})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),Bt(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,s=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};s.id||(s.id=r),this.segments.push(s),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(o=>o.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){Do.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let s=this.segments.find(o=>o.id===e);s&&(Object.assign(s,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let s=r.target.files[0];if(!s)return;let o=new FileReader;o.onload=n=>{try{let a=JSON.parse(n.target.result);Array.isArray(a)?(this.setSegments(a),Do.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):Do.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){Do.error("\u5BFC\u5165\u5931\u8D25:",a)}},o.readAsText(s)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),s=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(s),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),Do.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(ft(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function nh(){return`
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
  `}function ah(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function ih(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Fn]}H();function lh(t){let{constants:e,topLevelWindow:r,modules:s,caches:o,uiState:n}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,d=C.createScope("PopupShell"),c={cleanup:null},u={cleanups:[]},y={cleanups:[]},p={current:null};function g(){return!!n.sidebarCollapsed}function m(){n.sidebarCollapsed=!n.sidebarCollapsed;let b=n.currentPopup;if(!b)return;let S=b.querySelector(".yyt-shell-sidebar"),R=b.querySelector(".yyt-shell-workspace"),M=b.querySelector(".yyt-sidebar-toggle i");S&&S.classList.toggle("yyt-collapsed",n.sidebarCollapsed),R&&R.classList.toggle("yyt-sidebar-collapsed",n.sidebarCollapsed),M&&(M.className=n.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),Ye()}function h(...b){d.log(b.join(" "))}function x(...b){d.error(b.join(" "))}function _(b){return typeof b!="string"?"":b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function w(){return r.jQuery||window.jQuery}function B(){return r.document||document}function A(b){if(!b)return"\u672A\u9009\u62E9\u9875\u9762";let S=s.toolRegistryModule?.getToolConfig(b);if(!S)return b;if(!S.hasSubTabs)return S.name||b;let R=E(b),M=S.subTabs?.find(K=>K.id===R);return M?.name?`${S.name} / ${M.name}`:S.name||b}function T(b){if(!b)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let S=s.toolRegistryModule?.getToolConfig(b);if(!S)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!S.hasSubTabs)return S.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let R=E(b);return S.subTabs?.find(K=>K.id===R)?.description||S.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function E(b,S=""){let R=s.toolRegistryModule?.getToolConfig(b);if(!R?.hasSubTabs||!Array.isArray(R.subTabs)||R.subTabs.length===0)return"";let M=String(S||n.currentSubTab[b]||"").trim(),F=M&&R.subTabs.some(ne=>ne?.id===M)?M:R.subTabs[0]?.id||"";return F&&n.currentSubTab[b]!==F&&(n.currentSubTab[b]=F),F}function L(){let b=n.currentPopup;if(!b)return;let S=A(n.currentMainTab),R=T(n.currentMainTab),M=b.querySelector(".yyt-popup-active-label");M&&(M.textContent=`\u5F53\u524D\uFF1A${S}`);let K=b.querySelector(".yyt-shell-breadcrumb");K&&(K.textContent=S);let F=b.querySelector(".yyt-shell-main-title");F&&(F.textContent=S);let ne=b.querySelector(".yyt-shell-main-description");ne&&(ne.textContent=R)}function O(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function k(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(b=>{typeof b=="function"&&b()}),u.cleanups=[])}function v(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(b=>{typeof b=="function"&&b()}),y.cleanups=[])}function z(b,S){if(!b||!S)return!1;let R=b.jquery?b[0]:b,M=S.jquery?S[0]:S;return!!(R&&M&&R===M)}function j(b={}){let{container:S=null}=b,R=p.current;if(R&&!(S&&!z(R.container,S))){try{typeof R.destroy=="function"&&R.destroy(R.container)}catch(M){x("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",M)}s.uiModule?.uiManager?.destroyContainerInstance&&s.uiModule.uiManager.destroyContainerInstance(R.container),p.current=null}}function q(b,S={}){p.current={key:S.key||"",container:b,destroy:typeof S.destroy=="function"?S.destroy:null}}function ye(){let b=w();if(!b||!n.currentPopup)return;let S=s.toolRegistryModule?.getToolList()||[],R=b(n.currentPopup).find(".yyt-main-nav");if(!R.length)return;let M=S.map(F=>`
      <div class="yyt-main-nav-item ${F.id===n.currentMainTab?"active":""}" data-tab="${F.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${_(F.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${_(F.name||F.id)}</span>
          <span class="yyt-main-nav-desc">${_(F.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");R.html(M),b(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ne=b(this).data("tab");ne&&as(ne)});let K=b(n.currentPopup).find(".yyt-shell-sidebar-hint");K.length&&K.text(`${S.length} tabs`)}function se(){let b=w();if(!b||!n.currentPopup)return;let S=s.toolRegistryModule?.getToolList()||[],R=s.toolRegistryModule?.getToolConfig("tools"),M=Array.isArray(R?.subTabs)?R.subTabs:[],K=M.filter(ae=>ae?.isCustom).length,F=M.filter(ae=>!ae?.isCustom).length,Q=b(n.currentPopup).find(".yyt-shell-sidebar-stats");Q.length&&(Q.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(S.length)),Q.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(F)),Q.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(K)))}function oe(){let b=s.toolRegistryModule?.getToolList()||[];return b.length?(b.some(S=>S.id===n.currentMainTab)||(n.currentMainTab=b[0].id),n.currentMainTab):null}async function Te(b={}){let{rebuildNavigation:S=!1,reRenderSubNav:R=!1}=b,M=w();if(!M||!n.currentPopup)return;j();let K=oe();if(!K)return;S&&(ye(),se());let F=s.toolRegistryModule?.getToolConfig(K),ne=!!F?.hasSubTabs,Q=M(n.currentPopup).find(".yyt-sub-nav"),ae=M(n.currentPopup).find(".yyt-content-inner");if(S&&ae.length){let De=new Set(ae.find(".yyt-tab-content").map((he,nt)=>M(nt).data("tab")).get());(s.toolRegistryModule?.getToolList()||[]).forEach(he=>{De.has(he.id)||ae.append(`<div class="yyt-tab-content" data-tab="${_(he.id)}"></div>`)}),ae.find(".yyt-tab-content").each((he,nt)=>{let $t=M(nt).data("tab");(s.toolRegistryModule?.getToolList()||[]).some(Jt=>Jt.id===$t)||M(nt).remove()})}M(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),M(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${K}"]`).addClass("active"),M(n.currentPopup).find(".yyt-tab-content").removeClass("active"),M(n.currentPopup).find(`.yyt-tab-content[data-tab="${K}"]`).addClass("active"),ne?(Q.show(),(R||S)&&Ws(K,F.subTabs)):Q.hide(),await is(K),L(),Ye()}function Ue(){if(!n.currentPopup)return;k();let b=()=>{if(n.currentMainTab==="presetManagement"){Te();return}n.currentMainTab==="tools"&&Te({reRenderSubNav:!0})},S=()=>{n.currentMainTab==="tools"?Te({rebuildNavigation:!0,reRenderSubNav:!0}):se()},R=()=>{n.currentMainTab==="tools"&&Te({rebuildNavigation:!1,reRenderSubNav:!1})},M=()=>{(n.currentMainTab==="bypass"||n.currentMainTab==="tools")&&Te({reRenderSubNav:n.currentMainTab==="tools"})};[U.PRESET_CREATED,U.PRESET_UPDATED,U.PRESET_DELETED].forEach(K=>{u.cleanups.push(W.on(K,b))}),[U.TOOL_REGISTERED,U.TOOL_UPDATED,U.TOOL_UNREGISTERED].forEach(K=>{u.cleanups.push(W.on(K,S))}),u.cleanups.push(W.on(U.TOOL_RUNTIME_UPDATED,R)),[U.BYPASS_PRESET_CREATED,U.BYPASS_PRESET_UPDATED,U.BYPASS_PRESET_DELETED].forEach(K=>{u.cleanups.push(W.on(K,M))})}function Y(b){return!!b?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function fe(b){let S=b?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return S?S.scrollHeight>S.clientHeight+2||S.scrollWidth>S.clientWidth+2:!1}function we(b,S){return S?.closest?.(".yyt-scrollable-surface")===b}function Ot(b,S){if(!b||!S)return null;let R=S.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return R&&(R.classList?.contains("yyt-select-portal-layer")||b.contains(R))&&(R.scrollHeight>R.clientHeight+2||R.scrollWidth>R.clientWidth+2)?R:[S.closest?.(".yyt-tool-list"),S.closest?.(".yyt-settings-content"),S.closest?.(".yyt-sub-content"),S.closest?.(".yyt-tab-content.active"),b].filter(Boolean).find(K=>K!==b&&!b.contains(K)?!1:K.scrollHeight>K.clientHeight+2||K.scrollWidth>K.clientWidth+2)||b}function Xe({mainTab:b=null,includeSubContent:S=!1}={}){let R=n.currentPopup;if(!R)return;let M=R.querySelector(".yyt-content");M&&(M.scrollTop=0,M.scrollLeft=0);let K=b?`.yyt-tab-content[data-tab="${b}"]`:".yyt-tab-content.active",F=R.querySelector(K);if(F&&(F.scrollTop=0,F.scrollLeft=0),!S)return;(F?.querySelectorAll(".yyt-sub-content")||[]).forEach(Q=>{Q.scrollTop=0,Q.scrollLeft=0})}function mr(b){let S=B();if(!b||!S)return;b.classList.add("yyt-scrollable-surface");let R=!1,M=!1,K=0,F=0,ne=0,Q=0,ae=!1,De=!1,he=()=>{R=!1,M=!1,b.classList.remove("yyt-scroll-dragging")},nt=J=>{J.button===0&&(Y(J.target)||we(b,J.target)&&(ae=b.scrollWidth>b.clientWidth+2,De=b.scrollHeight>b.clientHeight+2,!(!ae&&!De)&&(J.stopPropagation(),R=!0,M=!1,K=J.clientX,F=J.clientY,ne=b.scrollLeft,Q=b.scrollTop)))},$t=J=>{if(!R)return;let yt=J.clientX-K,Ze=J.clientY-F;!(Math.abs(yt)>4||Math.abs(Ze)>4)&&!M||(M=!0,b.classList.add("yyt-scroll-dragging"),ae&&(b.scrollLeft=ne-yt),De&&(b.scrollTop=Q-Ze),J.preventDefault())},Jt=()=>{he()},Mr=J=>{if(J.ctrlKey||fe(J.target)||!b.classList.contains("yyt-content")&&!we(b,J.target))return;let Ze=Ot(b,J.target);!Ze||Ze!==b&&!b.contains(Ze)||!(Ze.scrollHeight>Ze.clientHeight+2||Ze.scrollWidth>Ze.clientWidth+2)||(Math.abs(J.deltaY)>0&&(Ze.scrollTop+=J.deltaY),Math.abs(J.deltaX)>0&&(Ze.scrollLeft+=J.deltaX),J.preventDefault(),J.stopPropagation())},at=J=>{M&&J.preventDefault()};b.addEventListener("mousedown",nt),b.addEventListener("wheel",Mr,{passive:!1}),b.addEventListener("dragstart",at),S.addEventListener("mousemove",$t),S.addEventListener("mouseup",Jt),y.cleanups.push(()=>{he(),b.classList.remove("yyt-scrollable-surface"),b.removeEventListener("mousedown",nt),b.removeEventListener("wheel",Mr),b.removeEventListener("dragstart",at),S.removeEventListener("mousemove",$t),S.removeEventListener("mouseup",Jt)})}function Ye(){let b=n.currentPopup;if(!b)return;v();let S=[...b.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...b.querySelectorAll(".yyt-sub-nav"),...b.querySelectorAll(".yyt-content"),...b.querySelectorAll(".yyt-settings-content"),...b.querySelectorAll(".yyt-tool-list")];[...new Set(S)].forEach(mr)}function Lo(b){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(b||[]).slice(0,6).map(R=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${_(R.icon||"fa-file")}"></i>
        <span>${_(R.name||R.id)}</span>
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
    `}function Oo(b){let S=w();if(!S||!n.currentPopup||n.startupScreenDismissed)return;let R=S(n.currentPopup).find(".yyt-popup-body"),M=R.find(".yyt-popup-shell");!R.length||!M.length||R.find("[data-yyt-startup-screen]").length||(M.attr("data-yyt-startup-visible","true"),R.prepend(Lo(b)),R.find(".yyt-startup-enter").on("click",()=>{R.find("[data-yyt-startup-screen]").remove(),M.removeAttr("data-yyt-startup-visible"),n.startupScreenDismissed=!0,Ye()}))}function Ir(){let b=B(),S=n.currentPopup,R=S?.querySelector(".yyt-popup-header");if(!S||!R||!b)return;let M=!1,K=0,F=0,ne=0,Q=0,ae="",De=()=>({width:r.innerWidth||b.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||b.documentElement?.clientHeight||window.innerHeight||0}),he=(at,J,yt)=>Math.min(Math.max(at,J),yt),nt=()=>{M&&(M=!1,S.classList.remove("yyt-popup-dragging"),b.body.style.userSelect=ae)},$t=at=>{if(!M||!n.currentPopup)return;let J=at.clientX-K,yt=at.clientY-F,{width:Ze,height:Ii}=De(),vh=S.offsetWidth||0,Sh=S.offsetHeight||0,Th=Math.max(0,Ze-vh),_h=Math.max(0,Ii-Sh);S.style.left=`${he(ne+J,0,Th)}px`,S.style.top=`${he(Q+yt,0,_h)}px`,S.style.transform="none",S.style.right="auto",S.style.bottom="auto"},Jt=()=>{nt()},Mr=at=>{if(at.button!==0||at.target?.closest(".yyt-popup-close"))return;M=!0,K=at.clientX,F=at.clientY;let J=S.getBoundingClientRect();ne=J.left,Q=J.top,S.style.left=`${J.left}px`,S.style.top=`${J.top}px`,S.style.transform="none",S.style.right="auto",S.style.bottom="auto",S.classList.add("yyt-popup-dragging"),ae=b.body.style.userSelect||"",b.body.style.userSelect="none",at.preventDefault()};R.addEventListener("mousedown",Mr),b.addEventListener("mousemove",$t),b.addEventListener("mouseup",Jt),c.cleanup=()=>{nt(),R.removeEventListener("mousedown",Mr),b.removeEventListener("mousemove",$t),b.removeEventListener("mouseup",Jt)}}function Rr(){j(),O(),k(),v();let b=w();if(b&&n.currentPopup){let S=b(n.currentPopup);ft(S,"yytPopupToolConfigSelect"),ft(S,"yytPromptEditorSelect")}n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function as(b){j(),n.currentMainTab=b;let S=w();if(!S||!n.currentPopup)return;Xe({mainTab:b,includeSubContent:!0}),S(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),S(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${b}"]`).addClass("active");let R=s.toolRegistryModule?.getToolConfig(b);R?.hasSubTabs?(S(n.currentPopup).find(".yyt-sub-nav").show(),Ws(b,R.subTabs)):S(n.currentPopup).find(".yyt-sub-nav").hide(),S(n.currentPopup).find(".yyt-tab-content").removeClass("active"),S(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`).addClass("active"),is(b),L(),Ye()}function js(b,S){j(),n.currentSubTab[b]=S;let R=w();!R||!n.currentPopup||(Xe({mainTab:b,includeSubContent:!0}),R(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),R(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${S}"]`).addClass("active"),ls(b,S),L(),Ye())}function Ws(b,S){let R=w();if(!R||!n.currentPopup||!S)return;let M=E(b,n.currentSubTab[b]||S[0]?.id),F=(b==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:S.filter(Q=>!Q?.isCustom&&(Q?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:S.filter(Q=>!Q?.isCustom&&Q?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:S.filter(Q=>Q?.isCustom===!0)}].filter(Q=>Q.items.length>0):[{key:"default",title:"",items:S}]).map(Q=>{let ae=Q.title?`<div class="yyt-sub-nav-group-title">${_(Q.title)}</div>`:"",De=Q.items.map(he=>{let nt=he?.isCustom===!0,$t=b==="tools"&&nt?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${he.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${he.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${he.id===M?"active":""}" data-subtab="${he.id}" data-tool-name="${_((he.name||he.id).toLowerCase())}">
          <i class="fa-solid ${he.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${_(he.name||he.id)}</span>
          ${$t}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${Q.key}">
          ${ae}
          <div class="yyt-sub-nav-group-items">
            ${De}
          </div>
        </div>
      `}).join(""),ne=b==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";R(n.currentPopup).find(".yyt-sub-nav").html(ne+F),R(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(ae){if(ae.target.closest&&ae.target.closest(".yyt-sub-nav-item-action"))return;let De=R(this).data("subtab");js(b,De)}),b==="tools"&&Bo(b),Ye()}function $o(b){if(!n.currentPopup)return;let S=w();if(!S)return;let R=String(b||"").trim().toLowerCase();S(n.currentPopup).find(".yyt-sub-nav-item").each(function(){let K=String(S(this).data("tool-name")||"");S(this).toggle(!R||K.includes(R))}),S(n.currentPopup).find(".yyt-sub-nav-group").each(function(){let K=S(this).find(".yyt-sub-nav-item:visible").length>0;S(this).toggle(K)})}function Bo(b){let S=w();if(!S||!n.currentPopup)return;let R=S(n.currentPopup).find(".yyt-sub-nav");R.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){$o(this.value)}),R.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(M){M.preventDefault(),M.stopPropagation();let K=S(this).data("tool-action");try{let F=await Promise.resolve().then(()=>(Dd(),Nd));if(K==="add"){let ne=await F.showToolEditDialog(null);ne&&(n.currentSubTab[b]=ne,js(b,ne))}else K==="import"?await F.showImportToolsDialog():K==="export"&&F.showExportToolsDialog()}catch(F){x("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",F)}}),R.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(M){M.preventDefault(),M.stopPropagation();let K=S(this).data("action"),F=String(S(this).data("subtab")||"");if(F)try{let ne=await Promise.resolve().then(()=>(Dd(),Nd));K==="edit"?await ne.showToolEditDialog(F):K==="delete"&&await ne.confirmDeleteTool(F)&&n.currentSubTab[b]===F&&(n.currentSubTab[b]="")}catch(ne){x("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",ne)}})}async function is(b){let S=w();if(!S||!n.currentPopup)return;let R=S(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!R.length)return;if(s.toolRegistryModule?.getToolConfig(b)?.hasSubTabs){let F=E(b);F?await ls(b,F):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),Ye();return}await s.uiModule?.renderMainTab?.(b,R)||uh(b,R),Ye()}async function ls(b,S){let R=w();if(!R||!n.currentPopup)return;let M=R(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!M.length)return;let K=s.toolRegistryModule?.getToolConfig(b);if(K?.hasSubTabs){let ne=E(b,S),Q=K.subTabs?.find(nt=>nt.id===ne),ae=M.find(".yyt-sub-content");if(ae.length||(M.html('<div class="yyt-sub-content"></div>'),ae=M.find(".yyt-sub-content")),!Q){ae.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Xe({mainTab:b,includeSubContent:!0}),Ye();return}let De=Q.component;if(De==="GenericToolConfigPanel"){await cs(Q,ae),Xe({mainTab:b,includeSubContent:!0}),Ye();return}j({container:ae});let he=await s.uiModule?.renderSubTabComponent?.(De,ae);he?q(ae,{key:he}):ae.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),Xe({mainTab:b,includeSubContent:!0}),Ye();return}let F=M.find(".yyt-sub-content");if(F.length){switch(j({container:F}),S){case"config":ph(b,F);break;case"prompts":await yh(b,F);break;case"presets":fh(b,F);break;default:F.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Xe({mainTab:b,includeSubContent:!0}),Ye()}}async function cs(b,S){if(!(!w()||!S?.length||!b?.id)){j({container:S});try{let M=o.dynamicToolPanelCache.get(b.id);if(!M){let ne=(await Promise.resolve().then(()=>(Io(),Nf)))?.createToolConfigPanel;if(typeof ne!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");M=()=>ne({id:`${b.id}Panel`,toolId:b.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${b.name||b.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${b.id}-extraction-preview`,previewTitle:`${b.name||b.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(b.id,M)}let K=M();K.renderTo(S),q(S,{key:b.id,destroy:typeof K?.destroy=="function"?F=>K.destroy(F):null}),Ye()}catch(M){p.current=null,x("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",M),S.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function uh(b,S){if(!w())return;let M=s.toolRegistryModule?.getToolConfig(b);if(!M){S.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let K=n.currentSubTab[b]||M.subTabs?.[0]?.id||"config";S.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${K}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),ls(b,K)}function ph(b,S){if(!w())return;let M=s.toolManagerModule?.getTool(b),K=s.presetManagerModule?.getAllPresets()||[],F=s.toolRegistryModule?.getToolApiPreset(b)||"",ne=K.map(Q=>`<option value="${_(Q.name)}" ${Q.name===F?"selected":""}>${_(Q.name)}</option>`).join("");S.html(`
      <div class="yyt-panel">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading">
            <span class="yyt-flow-heading-icon"><i class="fa-solid fa-plug"></i></span>
            <span>API\u9884\u8BBE\u7ED1\u5B9A</span>
          </div>
          <div class="yyt-form-group">
            <label>\u9009\u62E9API\u9884\u8BBE</label>
            <select class="yyt-select" id="yyt-tool-api-preset">
              <option value="">\u4F7F\u7528\u5F53\u524D\u914D\u7F6E</option>
              ${ne}
            </select>
          </div>
          <button class="yyt-btn yyt-btn-primary" id="yyt-save-tool-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u7ED1\u5B9A
          </button>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading">
            <span class="yyt-flow-heading-icon"><i class="fa-solid fa-cog"></i></span>
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
    `),Bt(S,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),S.find("#yyt-save-tool-preset").on("click",function(){let ae=S.find("#yyt-tool-api-preset").val();s.toolRegistryModule?.setToolApiPreset(b,ae),d.info("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58",null,{toast:"success"})})}async function yh(b,S){if(!w()){S.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let K=s.toolManagerModule?.getTool(b)?.config?.messages||[],F=ih(K)||Fn,ne=new Ai({containerId:`yyt-prompt-editor-${b}`,segments:F,onChange:ae=>{let De=ah(ae);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",De.length,"\u6761\u6D88\u606F")}});S.html(`<div id="yyt-prompt-editor-${b}" class="yyt-prompt-editor-container"></div>`),ne.init(S.find(`#yyt-prompt-editor-${b}`));let Q=nh();if(Q){let ae="yyt-prompt-editor-styles",De=r.document||document;if(!De.getElementById(ae)){let he=De.createElement("style");he.id=ae,he.textContent=Q,(De.head||De.documentElement).appendChild(he)}}}function fh(b,S){w()&&S.html(`
      <div class="yyt-panel">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading">
            <span class="yyt-flow-heading-icon"><i class="fa-solid fa-bookmark"></i></span>
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
    `)}function gh(){return`
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
      </div>`}function mh(b,S,R){let M=g(),K=b.map(F=>`
      <div class="yyt-main-nav-item ${F.id===n.currentMainTab?"active":""}" data-tab="${F.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${_(F.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${_(F.name||F.id)}</span>
          <span class="yyt-main-nav-desc">${_(F.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${M?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${b.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${M?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${M?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${K}
          </div>
          <div class="yyt-shell-sidebar-note">
            \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${b.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${S}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${R}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function hh(b,S){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${_(b)}</div>
          <div class="yyt-shell-main-description">${_(S)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function bh(b,S){return b.map(R=>`
      <div class="yyt-tab-content ${R.id===S?"active":""}" data-tab="${R.id}">
      </div>
    `).join("")}function xh(b){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${_(b)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function wh(){if(n.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let b=t?.services?.loadModules;typeof b=="function"&&await b();let S=w(),R=B();if(!S){x("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let M=s.toolRegistryModule?.getToolList()||[];if(!M.length){x("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}M.some(J=>J.id===n.currentMainTab)||(n.currentMainTab=M[0].id);let K=s.toolRegistryModule?.getToolConfig("tools"),F=Array.isArray(K?.subTabs)?K.subTabs:[],ne=F.filter(J=>J?.isCustom).length,Q=F.filter(J=>!J?.isCustom).length,ae=A(n.currentMainTab),De=T(n.currentMainTab);n.currentOverlay=R.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",J=>{J.target===n.currentOverlay&&Rr()}),R.body.appendChild(n.currentOverlay);let he=g(),nt=`
      <div class="yyt-popup" id="${l}">
        ${gh()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${he?" yyt-sidebar-collapsed":""}">
              ${mh(M,Q,ne)}
              <section class="yyt-shell-main">
                ${hh(ae,De)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${bh(M,n.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${xh(ae)}
      </div>
    `,$t=R.createElement("div");$t.innerHTML=nt,n.currentPopup=$t.firstElementChild,R.body.appendChild(n.currentPopup),S(n.currentPopup).find(".yyt-popup-close").on("click",Rr),S(n.currentPopup).find(".yyt-sidebar-toggle").on("click",m);let Jt=J=>{J.key==="Escape"&&(R.querySelector(".yyt-dialog-overlay")||R.querySelector(".yyt-twb-editor-drawer.is-open")||(J.stopPropagation(),Rr()))},Mr=J=>{if(!(J.ctrlKey||J.metaKey)||J.key!=="s"||!n.currentPopup)return;J.preventDefault(),J.stopPropagation();let yt=S(n.currentPopup),Ze=yt.find("#yyt-bypass-save:visible").first()||yt.find(`#${a}-save-api-config:visible`).first()||yt.find("#yyt-save-tool-preset:visible").first()||yt.find('[data-twb-action="save"]:visible').first();Ze?.length&&Ze.trigger("click")};R.addEventListener("keydown",Jt),R.addEventListener("keydown",Mr),u.cleanups.push(()=>{R.removeEventListener("keydown",Jt),R.removeEventListener("keydown",Mr)}),Ue(),S(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let yt=S(this).data("tab");yt&&as(yt)}),Ir(),is(n.currentMainTab);let at=s.toolRegistryModule?.getToolConfig(n.currentMainTab);at?.hasSubTabs&&(S(n.currentPopup).find(".yyt-sub-nav").show(),Ws(n.currentMainTab,at.subTabs)),L(),Oo(M),Ye(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:wh,closePopup:Rr,switchMainTab:as,switchSubTab:js,renderTabContent:is,renderSubTabContent:ls}}function ch(t,e={}){let{constants:r,modules:s}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:d}=e;return{version:n,id:o,init:a,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:l,getStorage:()=>s.storageModule,getApiConnection:()=>s.apiConnectionModule,getPresetManager:()=>s.presetManagerModule,getUi:()=>s.uiModule,getUiModule:()=>s.uiModule,getRegexExtractor:()=>s.regexExtractorModule,getToolManager:()=>s.toolManagerModule,getToolExecutor:()=>s.toolExecutorModule,getWindowManager:()=>s.windowManagerModule,getToolRegistry:()=>s.toolRegistryModule,getSettingsService:()=>s.settingsServiceModule,getBypassManager:()=>s.bypassManagerModule,getVariableResolver:()=>s.variableResolverModule,getContextInjector:()=>s.contextInjectorModule,getToolPromptService:()=>s.toolPromptServiceModule,getToolOutputService:()=>s.toolOutputServiceModule,getToolAutomationService:()=>s.toolAutomationServiceModule,getDataProvider:()=>s.toolDataProviderModule?.getCurrentProvider?.()||null,async getDataProviderAsync(){return await i(),s.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),s.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(c){return await i(),s.apiConnectionModule?(s.apiConnectionModule.updateApiConfig(c),!0):!1},async getPresets(){return await i(),s.presetManagerModule?s.presetManagerModule.getAllPresets():[]},async sendApiRequest(c,u){if(await i(),s.apiConnectionModule)return s.apiConnectionModule.sendApiRequest(c,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),s.apiConnectionModule?s.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(c,u){return s.toolRegistryModule?.registerTool(c,u)||!1},unregisterTool(c){return s.toolRegistryModule?.unregisterTool(c)||!1},getToolList(){return s.toolRegistryModule?.getToolList()||[]},createWindow(c){return s.windowManagerModule?.createWindow(c)||null},closeWindow(c){s.windowManagerModule?.closeWindow(c)},startAutomation(){return s.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){s.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return s.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(c={}){return s.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(c={}){return s.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var Ci="youyou_toolkit",W0="1.0.215",H0=`${Ci}-menu-item`,G0=`${Ci}-menu-container`,q0=`${Ci}-popup`,Y0=typeof window.parent<"u"?window.parent:window,ki={constants:{SCRIPT_ID:Ci,SCRIPT_VERSION:W0,MENU_ITEM_ID:H0,MENU_CONTAINER_ID:G0,POPUP_ID:q0},topLevelWindow:Y0,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},dh=lh(ki),jn=oh(ki,{openPopup:dh.openPopup});ki.services.loadModules=jn.loadModules;var Ld=ch(ki,{init:jn.init,loadModules:jn.loadModules,addMenuItem:jn.addMenuItem,popupShell:dh});if(typeof window<"u"&&(window.YouYouToolkit=Ld,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Ld}catch{}var V0=Ld;jn.init();Promise.resolve().then(()=>(H(),$d)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});return Ih(J0);})();
